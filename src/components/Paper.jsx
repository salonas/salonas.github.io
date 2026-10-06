const CORNERS = ['flat', 'right', 'left', 'flat', 'right', 'cut', 'flat', 'right', 'flat', 'left']
const CORNER_CLASS = { right: 'fold-r', left: 'fold-l', cut: 'cut' }
const SHEET_CLASS = { notebook: 'nb', text: 'ts', photo: 'foto' }

export const cornerOf = (i) => CORNERS[i % CORNERS.length]

const marks = Array.from({ length: 64 }, (_, i) => <b key={i} />)

export function Rules() {
  return (
    <span className="lines" aria-hidden="true">
      {marks}
    </span>
  )
}

export function Sprockets() {
  return <span className="sprk" aria-hidden="true" />
}

export function LoopStamp({ label }) {
  return (
    <span className="stamp">
      <svg viewBox="0 0 9 8" shapeRendering="crispEdges" aria-hidden="true">
        <path d="M2 0h5v1h1v2H7V2H3v1H2v1H1V1h1zM7 4h1v3H7v1H2V7H1V5h1v1h4V5h1z" />
      </svg>
      {label}
    </span>
  )
}

export function Holes() {
  return (
    <>
      <span className="holes" aria-hidden="true" />
      <span className="perf" aria-hidden="true" />
    </>
  )
}

export default function Paper({ as: Tag = 'div', tilt, sheet, corner, className = '', children, ...rest }) {
  const classes = [
    'paper',
    tilt === 'l' && 'tl',
    tilt === 'r' && 'tr',
    SHEET_CLASS[sheet],
    sheet === 'text' && CORNER_CLASS[corner],
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <Tag className={classes} {...rest}>
      {sheet === 'notebook' && <Holes />}
      {sheet === 'text' && (
        <>
          <span className="bg" aria-hidden="true">
            <i>
              <Rules />
            </i>
          </span>
          <span className="fr" aria-hidden="true" />
          {(corner === 'right' || corner === 'left') && <span className="ear" aria-hidden="true" />}
        </>
      )}
      {children}
    </Tag>
  )
}
