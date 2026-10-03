import ProjectCard from '../components/ProjectCard'
import { useLanguage } from '../i18n/LanguageProvider'
import { projects } from '../projects'

const LEGEND = { done: 'state-done', paused: 'state-paused', failed: 'state-failed' }

export default function Projects() {
  const { t } = useLanguage()
  return (
    <section className="page">
      <div className="stack">
        <h2 className="label">{t('nav-projects')}</h2>
        <p>{t('proj-hint')}</p>
        <p className="tags legend">
          <span>{t('state-legend')}</span>
          {Object.entries(LEGEND).map(([status, key]) => (
            <span key={status} className={`state ${status}`}>
              {t(key)}
            </span>
          ))}
        </p>
        <div className="row">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} tilt={i % 2 ? 'r' : 'l'} />
          ))}
        </div>
      </div>
    </section>
  )
}
