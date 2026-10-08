// Browser-side photo preparation for the BDR form. Runs only in event
// handlers, never at module scope (the build prerenders in Node).
import { PHOTO_TARGET_BYTES, PHOTO_MAX_SIDE, PHOTO_PICK_MAX_BYTES } from './limits';

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
 * Returns { ok: true, blob } with a JPEG at most PHOTO_TARGET_BYTES, or
 * { ok: false, reason: 'type' | 'big' | 'shrink' }.
 */
export async function preparePhoto(file) {
  if (file.size > PHOTO_PICK_MAX_BYTES) return { ok: false, reason: 'big' };
  const type = await sniffImageType(file);
  if (!type) return { ok: false, reason: 'type' };

  let source;
  try {
    source = await decode(file);
  } catch {
    return { ok: false, reason: 'type' };
  }

  try {
    const srcW = source.width;
    const srcH = source.height;
    if (!srcW || !srcH) return { ok: false, reason: 'type' };

    let side = Math.min(PHOTO_MAX_SIDE, Math.max(srcW, srcH));
    // Step quality down first, then step the size down, until it fits.
    for (let round = 0; round < 6; round += 1) {
      const scale = side / Math.max(srcW, srcH);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(srcW * scale));
      canvas.height = Math.max(1, Math.round(srcH * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) return { ok: false, reason: 'shrink' };
      // JPEG has no transparency. Paint white so a transparent PNG is not black.
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

      for (let q = 0.9; q >= 0.4; q -= 0.1) {
        const blob = await toBlob(canvas, q);
        if (!blob) return { ok: false, reason: 'shrink' };
        if (blob.size <= PHOTO_TARGET_BYTES) return { ok: true, blob };
      }
      side = Math.round(side * 0.8);
    }
    return { ok: false, reason: 'shrink' };
  } catch {
    return { ok: false, reason: 'shrink' };
  } finally {
    if (typeof source.close === 'function') source.close();
  }
}
