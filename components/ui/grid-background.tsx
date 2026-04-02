export function GridBackground() {
  return (
    <>
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="hero-glow pointer-events-none absolute left-1/2 top-[-220px] h-[480px] w-[780px] -translate-x-1/2" />
      <div className="hero-noise pointer-events-none absolute inset-0" />
      <div className="hero-scanlines pointer-events-none absolute inset-0" />
    </>
  );
}
