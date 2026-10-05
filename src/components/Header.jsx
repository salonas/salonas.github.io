import { NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageProvider'

function titleKey(pathname) {
  if (pathname.startsWith('/toolbox')) return 'title-tools'
  if (pathname.startsWith('/projects')) return 'title-projects'
  if (pathname.startsWith('/contact')) return 'title-contact'
  return 'title-home'
}

const PIXEL = 3
const BRAID = ['ILLI', 'ILDI', 'IDDI', 'IDLI']
const ROWS = 32
const LEAN = 3

// One pixel sideways every LEAN rows, so the braid stays on the grid while it leans.
const strands = { I: '', L: '', D: '' }
for (let row = 0; row < ROWS; row++) {
  const x = Math.floor(row / LEAN)
  const y = ROWS - 1 - row
  ;[...BRAID[row % BRAID.length]].forEach((strand, i) => {
    strands[strand] += `M${(x + i) * PIXEL} ${y * PIXEL}h${PIXEL}v${PIXEL}h-${PIXEL}z`
  })
}
const ROPE_WIDTH = (Math.ceil(ROWS / LEAN) + BRAID[0].length) * PIXEL

function Rope({ side }) {
  return (
    <svg className={`rope ${side}`} width={ROPE_WIDTH} height={ROWS * PIXEL} shapeRendering="crispEdges" aria-hidden="true">
      <path className="edge" d={strands.I} />
      <path className="light" d={strands.L} />
      <path className="dark" d={strands.D} />
    </svg>
  )
}

export default function Header() {
  const { t } = useLanguage()
  const { pathname } = useLocation()

  return (
    <header className="banner">
      <div className="sign">
        <Rope side="left" />
        <Rope side="right" />
        <h1 className="plaque">{t(titleKey(pathname))}</h1>
      </div>
      <nav className="nav" aria-label={t('nav-label')}>
        <NavLink className="btn" to="/" end>
          {t('nav-home')}
        </NavLink>
        <NavLink className="btn" to="/toolbox">
          {t('nav-tools')}
        </NavLink>
        <NavLink className="btn" to="/projects">
          {t('nav-projects')}
        </NavLink>
        <NavLink className="btn" to="/contact">
          {t('nav-contact')}
        </NavLink>
      </nav>
    </header>
  )
}
