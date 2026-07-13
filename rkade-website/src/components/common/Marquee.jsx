export default function Marquee({ children, className = '', durationSeconds = 30 }) {
  return (
    <div className={`group overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex flex-none">{children}</div>
        <div className="flex flex-none" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
