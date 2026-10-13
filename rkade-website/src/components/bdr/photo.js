// Browser-side photo preparation for the BDR form. Runs only in event
// handlers, never at module scope (the build prerenders in Node).
import {
  PHOTO_SERVER_MAX_BYTES,
  PHOTO_OUTPUT_PX,
  PHOTO_MIN_SOURCE_PX,
  PHOTO_PICK_MAX_BYTES,
} from './limits';

// The declared type comes from the file extension, so a PDF renamed .jpg
// claims to be an image. Read the first bytes instead, as the server does.
export async function sniffImageType(file) {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const is = (...sig) => sig.every((b, i) => bytes[i] === b);
  if (is(0xff, 0xd8, 0xff)) return 'image/jpeg';
  if (is(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return 'image/png';
  if (is(0x52, 0x49, 0x46, 0x46) && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return 'image/webp';
  }
  return null;
}

async function decode(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file);
    } catch {
      // fall through to the <img> route
    }
  }
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('decode'));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

const toBlob = (canvas, quality) =>
  new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));

/**
 * Opens a picked file for cropping. Returns { ok: true, source, width, height }
 * or { ok: false, reason: 'type' | 'big' | 'small' }. The caller owns
 * source and must call release(source) when done.
 */
export async function openPhoto(file) {
  if (file.size > PHOTO_PICK_MAX_BYTES) return { ok: false, reason: 'big' };
  const type = await sniffImageType(file);
  if (!type) return { ok: false, reason: 'type' };
  let source;
  try {
    source = await decode(file);
  } catch {
    return { ok: false, reason: 'type' };
  }
  const width = source.width;
  const height = source.height;
  if (!width || !height) {
    release(source);
    return { ok: false, reason: 'type' };
  }
  if (width < PHOTO_MIN_SOURCE_PX || height < PHOTO_MIN_SOURCE_PX) {
    release(source);
    return { ok: false, reason: 'small' };
  }
  return { ok: true, source, width, height };
}

export function release(source) {
  if (source && typeof source.close === 'function') source.close();
}

/**
 * Draws the square region { x, y, size } (in source pixels) to an
 * 800x800 canvas and returns a JPEG blob under the server limit, or null.
 * Quality steps down until it fits.
 */
export async function renderCrop(source, { x, y, size }) {
  const canvas = document.createElement('canvas');
  canvas.width = PHOTO_OUTPUT_PX;
  canvas.height = PHOTO_OUTPUT_PX;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, PHOTO_OUTPUT_PX, PHOTO_OUTPUT_PX);
  ctx.drawImage(source, x, y, size, size, 0, 0, PHOTO_OUTPUT_PX, PHOTO_OUTPUT_PX);
  for (let q = 0.9; q >= 0.3; q -= 0.1) {
    const blob = await toBlob(canvas, q);
    if (!blob) return null;
    if (blob.size < PHOTO_SERVER_MAX_BYTES) return blob;
  }
  return null;
}
