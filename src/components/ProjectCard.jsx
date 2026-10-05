import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageProvider'
import { mediaUrl } from '../projects'

export function Cover({ project, className = '' }) {
  const { t, L } = useLanguage()
  if (!project.cover) return <div className={`ph ${className}`}>[{t('shot')}]</div>
  const poster = mediaUrl(project.slug, project.cover)
  if (project.coverVideo) {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        src={mediaUrl(project.slug, project.coverVideo)}
        aria-label={L(project.coverAlt)}
      />
    )
  }
  return <img className={`${className} ${project.pixel ? 'px' : ''}`} src={poster} alt={L(project.coverAlt)} />
}

export function Tags({ project }) {
  const { L } = useLanguage()
  return (
    <div className="tags">
      <span className="tag">{L(project.type)}</span>
      {project.alsoIn?.map((type) => (
        <span key={type.es} className="tag">
          {L(type)}
        </span>
      ))}
      <span className="state">{L(project.state)}</span>
    </div>
  )
}

export default function ProjectCard({ project, variant = 'full', tilt }) {
  const { t, L } = useLanguage()
  return (
    <Link className={`paper ${tilt === 'r' ? 'tr' : 'tl'} card`} to={`/projects/${project.slug}`}>
      <Cover project={project} />
      {project.sections.some((s) => s.kind === 'game') && (
        <span className="stamp">
          <svg viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
            <path d="M1 0h2v1h2v1h2v1h1v2H7v1H5v1H3v1H1z" />
          </svg>
          {t('demo-badge')}
        </span>
      )}
      <Tags project={project} />
      <h3>{project.title}</h3>
      {variant === 'full' && (
        <>
          <p className="lead">{L(project.summary)}</p>
          <span className="more">{t('see')}</span>
        </>
      )}
    </Link>
  )
}
