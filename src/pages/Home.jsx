import { Link } from 'react-router-dom'
import Paper, { cornerOf } from '../components/Paper'
import ProjectCard from '../components/ProjectCard'
import { useLanguage } from '../i18n/LanguageProvider'
import { projects } from '../projects'

export default function Home() {
  const { t, lang } = useLanguage()
  const featured = projects.filter((p) => p.featured)

  return (
    <section className="page">
      <div className="row hero">
        <Paper as="figure" tilt="l" className="photo">
          <img
            className="px"
            src="/img/cat.png"
            alt={lang === 'es' ? 'Gato en pixel art dibujado por Salonas' : 'Pixel art cat drawn by Salonas'}
          />
        </Paper>
        <div className="txt">
          <h2>{t('hero-title')}</h2>
          <p className="lead">{t('hero-lead')}</p>
          <div className="cta">
            <Link className="btn dark" to="/projects">
              {t('cta-projects')}
            </Link>
            <Link className="btn" to="/contact">
              {t('nav-contact')}
            </Link>
          </div>
        </div>
      </div>

      <div className="stack">
        <h2 className="label">{t('featured')}</h2>
        <div className="row">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} variant="tile" tilt={i % 2 ? 'r' : 'l'} />
          ))}
        </div>
      </div>

      <div className="stack">
        <h2 className="label">{t('about')}</h2>
        <Paper sheet="text" className="big">
          <h3>{t('journey-title')}</h3>
          <div className="prose">
            <p>{t('journey-1')}</p>
            <p>{t('journey-2')}</p>
            <p>{t('journey-3')}</p>
          </div>
          <p className="quote">{t('journey-quote')}</p>
        </Paper>
        <div className="row">
          <Paper sheet="text" corner={cornerOf(0)} tilt="l" className="card">
            <h3>{t('interests-title')}</h3>
            <div className="prose">
              <p>{t('interests-1')}</p>
              <p>{t('interests-2')}</p>
            </div>
          </Paper>
          <Paper sheet="text" corner={cornerOf(1)} tilt="r" className="card">
            <h3>{t('community-title')}</h3>
            <div className="prose">
              <p>{t('community-1')}</p>
              <p>{t('community-2')}</p>
            </div>
          </Paper>
        </div>
      </div>
    </section>
  )
}
