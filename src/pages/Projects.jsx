import { useState } from 'react'
import Paper from '../components/Paper'
import ProjectCard from '../components/ProjectCard'
import { useLanguage } from '../i18n/LanguageProvider'
import { projects } from '../projects'

const types = projects.map((p) => p.type).filter((type, i, all) => all.findIndex((x) => x.es === type.es) === i)
const SOON_FACE = '≽(•⩊ •)≼'
const tiltOf = (i) => (i % 2 ? 'r' : 'l')

export default function Projects() {
  const { t, L } = useLanguage()
  const [type, setType] = useState(null)
  const shown = type ? projects.filter((p) => p.type.es === type || p.alsoIn?.includes(type)) : projects
  return (
    <section className="page">
      <div className="stack">
        <h2 className="label">{t('nav-projects')}</h2>
        <p>{t('proj-hint')}</p>
        <div className="filters" role="group" aria-label={t('filter-label')}>
          <button type="button" className={`btn ${type ? '' : 'dark'}`} aria-pressed={!type} onClick={() => setType(null)}>
            {t('filter-all')}
          </button>
          {types.map((x) => (
            <button
              key={x.es}
              type="button"
              className={`btn ${type === x.es ? 'dark' : ''}`}
              aria-pressed={type === x.es}
              onClick={() => setType(x.es)}
            >
              {L(x)}
            </button>
          ))}
        </div>
        <div className="row">
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} tilt={tiltOf(i)} />
          ))}
          {type && shown.length % 2 === 1 && <div className="card" aria-hidden="true" />}
          {!type && shown.length % 2 === 1 && (
            <Paper tilt={tiltOf(shown.length)} className="card soon">
              <span aria-hidden="true">{SOON_FACE}</span>
              <p>{t('proj-soon')}</p>
            </Paper>
          )}
        </div>
      </div>
    </section>
  )
}
