import Parallax from '@/components/common/Parallax';

const VIEW_W = 800;
const VIEW_H = 600;
const BASELINE = 600;
const CENTER_X = 400;

function archPath(width, height) {
  const halfW = width / 2;
  const top = BASELINE - height;
  const curveTop = top + height * 0.35;
  return `M ${CENTER_X - halfW} ${BASELINE} L ${CENTER_X - halfW} ${curveTop} Q ${CENTER_X - halfW} ${top} ${CENTER_X} ${top} Q ${CENTER_X + halfW} ${top} ${CENTER_X + halfW} ${curveTop} L ${CENTER_X + halfW} ${BASELINE}`;
}

export default function HeroArt() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-line-strong bg-ink">
      {/* Background layer: deepest arches + vanishing-point glow, moves least */}
      <Parallax speed={0.05} className="absolute inset-0">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full" preserveAspectRatio="xMidYMax slice">
          <defs>
            <radialGradient id="heroGlow" cx="50%" cy="38%" r="35%" className="text-gold">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} className="fill-ink" />
          <circle cx={CENTER_X} cy={BASELINE - 180} r="180" fill="url(#heroGlow)" />
          <path d={archPath(140, 170)} fill="none" className="stroke-gold" strokeOpacity="0.35" strokeWidth="2" />
          <path d={archPath(220, 250)} fill="none" className="stroke-gold" strokeOpacity="0.22" strokeWidth="2" />
        </svg>
      </Parallax>

      {/* Mid layer: two intermediate arches, hidden on small screens for perf/clarity */}
      <Parallax speed={0.15} className="absolute inset-0 hidden md:block">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full" preserveAspectRatio="xMidYMax slice">
          <path d={archPath(340, 360)} fill="none" className="stroke-line" strokeOpacity="0.3" strokeWidth="2.5" />
          <path d={archPath(460, 460)} fill="none" className="stroke-line" strokeOpacity="0.4" strokeWidth="2.5" />
        </svg>
      </Parallax>

      {/* Foreground layer: nearest, boldest arch, frames the composition, moves most */}
      <Parallax speed={0.3} className="absolute inset-0">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full" preserveAspectRatio="xMidYMax slice">
          <path d={archPath(640, 600)} fill="none" className="stroke-gold" strokeOpacity="0.9" strokeWidth="3" />
        </svg>
      </Parallax>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
    </div>
  );
}
