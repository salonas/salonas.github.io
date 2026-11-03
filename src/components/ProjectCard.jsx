import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageProvider'
import { mediaUrl } from '../projects'
import Paper from './Paper'

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
  return <CoverImage className={`${className} ${project.pixel ? 'px' : ''}`} src={poster} alt={L(project.coverAlt)} />
}

function CoverImage({ className, src, alt }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  useLayoutEffect(() => {
    if (ref.current.complete && ref.current.naturalWidth) setLoaded(true)
  }, [])
  const show = () => setLoaded(true)
  return <img ref={ref} className={`${className} ${loaded ? '' : 'loading'}`} src={src} alt={alt} onLoad={show} onError={show} />
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
    <Paper as={Link} sheet="notebook" tilt={tilt === 'r' ? 'r' : 'l'} className="card" to={`/projects/${project.slug}`}>
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
    </Paper>
  )
}
