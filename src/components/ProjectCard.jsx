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
      <span className={`state ${project.status}`}>{L(project.state)}</span>
    </div>
  )
}

export default function ProjectCard({ project, variant = 'full', tilt }) {
  const { t, L } = useLanguage()
  return (
    <Link className={`paper ${tilt === 'r' ? 'tr' : 'tl'} card`} to={`/projects/${project.slug}`}>
      <Cover project={project} />
      {variant === 'full' && <Tags project={project} />}
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
