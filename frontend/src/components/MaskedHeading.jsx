// Pure-CSS masked line reveal on load. No JS dependency, so it can never get
// stuck by a hydration race; resting state is fully visible (see global.css).
export const MaskedHeading = ({ lines, className = '', id }) => (
  <h1 className={className} id={id}>
    {lines.map((line, i) => (
      <span className="mask-line" key={i}>
        <span className="mask-inner" style={{ animationDelay: `${(i * 0.12).toFixed(2)}s` }}>
          {line}
        </span>
      </span>
    ))}
  </h1>
)
