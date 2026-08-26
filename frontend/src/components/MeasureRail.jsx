// Fixed ratti measuring rail down the left edge. Deterministic irregularity so
// SSG and hydration match. Longer major tick every fifth mark.
const TICKS = 56
const ticks = Array.from({ length: TICKS }, (_, i) => {
  const major = i % 5 === 0
  const jitter = (i * 37) % 11
  const base = i % 2 === 0 ? 34 : 22
  const w = major ? 74 : base + jitter
  return { major, w }
})

export const MeasureRail = () => (
  <div className="measure-rail" aria-hidden="true">
    {ticks.map((t, i) => (
      <div key={i} className="measure-tick" style={{ width: `${t.w}%` }} />
    ))}
  </div>
)
