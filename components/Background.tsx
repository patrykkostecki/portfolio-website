// Deterministic pseudo-random so server and client render identical stars.
const STARS = Array.from({ length: 16 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12543.123;
  const c = Math.sin(i * 4.137) * 9821.77;
  const frac = (n: number) => n - Math.floor(n);
  return {
    top: `${(frac(a) * 100).toFixed(2)}%`,
    left: `${(frac(b) * 100).toFixed(2)}%`,
    size: `${(1 + frac(c) * 2).toFixed(2)}px`,
    delay: `${(frac(a) * 4).toFixed(2)}s`,
    dur: `${(3 + frac(b) * 4).toFixed(2)}s`,
  };
});

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora" />
      <div className="dotgrid absolute inset-0" />
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.dur }}
        />
      ))}
      <div className="blob animate-floaty left-[-12%] top-[-8%] h-[38rem] w-[38rem] bg-[rgba(28,97,214,0.12)]" />
      <div className="blob animate-floaty-slow right-[-14%] top-[12%] h-[42rem] w-[42rem] bg-[rgba(136,33,153,0.1)]" />
      <div className="blob animate-floaty bottom-[-18%] left-[18%] h-[36rem] w-[36rem] bg-[rgba(56,182,255,0.07)]" />
      <div className="blob animate-floaty-slow right-[22%] bottom-[-10%] h-[28rem] w-[28rem] bg-[rgba(99,100,199,0.07)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,12,24,0.6)_100%)]" />
    </div>
  );
}
