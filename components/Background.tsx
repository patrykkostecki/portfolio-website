/** Flat ambient: hairline grid fading from the top, one soft glow, film grain. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="topglow" />
      <div className="gridlines" />
      <div className="grain" />
    </div>
  );
}
