import ProjectCard from '../components/ProjectCard'
import { useLanguage } from '../i18n/LanguageProvider'
import { projects } from '../projects'

export default function Projects() {
  const { t } = useLanguage()
  return (
    <section className="page">
      <div className="stack">
        <h2 className="label">{t('nav-projects')}</h2>
        <p>{t('proj-hint')}</p>
        <div className="row">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} tilt={i % 2 ? 'r' : 'l'} />
          ))}
        </div>
      </div>
    </section>
  )
}
