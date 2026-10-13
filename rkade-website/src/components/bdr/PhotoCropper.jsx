import React, { useEffect, useMemo, useRef, useState } from 'react';
import { renderCrop } from './photo';

// Hand-rolled square crop with a circle overlay. Drag to move, slider or
// keys to zoom and move. No library. Runs only in the browser after a photo
// has been picked, never during the build prerender.
const VIEW = 280; // css pixels, the visible square
const MAX_ZOOM = 4;

const btn =
  'inline-flex min-h-[44px] items-center justify-center rounded px-5 text-button uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

export default function PhotoCropper({ file, source, width, height, onDone, onCancel }) {
  const [zoom, setZoom] = useState(1);
  // Centre of the visible square, in source pixels.
  const [centre, setCentre] = useState({ x: width / 2, y: height / 2 });
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const drag = useRef(null);
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);

  // Scale at zoom 1: the shorter side exactly fills the square.
  const base = VIEW / Math.min(width, height);
  const scale = base * zoom;
  const regionSize = VIEW / scale; // source pixels shown across the square

  const clamp = (c, z = zoom) => {
    const half = VIEW / (base * z) / 2;
    return {
      x: Math.min(width - half, Math.max(half, c.x)),
      y: Math.min(height - half, Math.max(half, c.y)),
    };
  };

  const changeZoom = (z) => {
    const next = Math.min(MAX_ZOOM, Math.max(1, z));
    setZoom(next);
    setCentre((c) => clamp(c, next));
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { px: e.clientX, py: e.clientY, c: centre };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const { px, py, c } = drag.current;
    setCentre(clamp({ x: c.x - (e.clientX - px) / scale, y: c.y - (e.clientY - py) / scale }));
  };
  const onPointerUp = () => {
    drag.current = null;
  };
  const onKeyDown = (e) => {
    const step = 20 / scale;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) {
      e.preventDefault();
      setCentre((c) => clamp({ x: c.x + moves[e.key][0], y: c.y + moves[e.key][1] }));
    } else if (e.key === '+' || e.key === '=') changeZoom(zoom + 0.25);
    else if (e.key === '-') changeZoom(zoom - 0.25);
  };

  const confirm = async () => {
    setBusy(true);
    setFailed(false);
    const blob = await renderCrop(source, {
      x: centre.x - regionSize / 2,
      y: centre.y - regionSize / 2,
      size: regionSize,
    });
    setBusy(false);
    if (!blob) {
      setFailed(true);
      return;
    }
    onDone(blob);
  };

  const left = VIEW / 2 - centre.x * scale;
  const top = VIEW / 2 - centre.y * scale;

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-on-ink">
        Drag the photo to line your face up inside the circle. Use the zoom slider to come closer.
      </p>
      {/* A drag surface with its own key handling, so it has to take focus. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="application"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Photo crop area. Arrow keys move the photo, plus and minus zoom."
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ width: VIEW, height: VIEW, maxWidth: '100%', touchAction: 'none' }}
        className="relative cursor-grab select-none overflow-hidden rounded border border-cream/25 bg-ink-deep outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:cursor-grabbing"
      >
        <img
          src={url}
          alt=""
          draggable={false}
          style={{ position: 'absolute', left, top, width: width * scale, height: height * scale, maxWidth: 'none' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-gold shadow-[0_0_0_999px] shadow-ink/70"
        />
      </div>
      <div className="max-w-[280px]">
        <label htmlFor="crop-zoom" className="mb-1 block text-label uppercase text-muted-on-ink">
          Zoom
        </label>
        <input
          id="crop-zoom"
          type="range"
          min={1}
          max={MAX_ZOOM}
          step={0.05}
          value={zoom}
          onChange={(e) => changeZoom(Number(e.target.value))}
          className="min-h-[44px] w-full accent-gold"
        />
      </div>
      {failed && (
        <p role="alert" className="text-xs text-gold">
          We could not make that photo small enough. Try another photo, or send your application without one.
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={confirm} disabled={busy} className={`${btn} bg-gold text-ink disabled:opacity-60`}>
          {busy ? 'Saving...' : 'Use this photo'}
        </button>
        <button type="button" onClick={onCancel} disabled={busy} className={`${btn} border border-cream/25 text-cream hover:border-gold`}>
          Choose a different photo
        </button>
      </div>
    </div>
  );
}
