import { Link } from 'react-router-dom'
import { outside } from '../components/outside'
import Paper from '../components/Paper'
import { toolbox } from '../data/toolbox'
import { useLanguage } from '../i18n/LanguageProvider'
import { findProject } from '../projects'

function Tool({ tool }) {
  const { t, L } = useLanguage()
  const project = tool.to && findProject(tool.to)
  return (
    <div className="tool">
      <span>{L(tool.name)}</span>
      {project && (
        <Link to={`/projects/${tool.to}`}>
          {t('used-in')} {project.shortTitle ?? project.title}
        </Link>
      )}
      {tool.href && (
        <a href={tool.href} {...outside}>
          {L(tool.label)}
        </a>
      )}
    </div>
  )
}

export default function Toolbox() {
  const { t, L } = useLanguage()
  return (
    <section className="page">
      <div className="stack">
        <h2 className="label">{t('tools-title')}</h2>
        <p className="prose">{t('tools-lead')}</p>
        <div className="row">
          {toolbox.map((group, i) => (
            <Paper key={L(group.title)} tilt={i % 2 ? 'r' : 'l'} className="card" style={{ flexBasis: 260 }}>
              <h3 className="rule">{L(group.title)}</h3>
              {group.image && <img className="px doodle" src={group.image.src} alt={L(group.image.alt)} />}
              {group.tools.map((tool) => (
                <Tool key={L(tool.name)} tool={tool} />
              ))}
            </Paper>
          ))}
        </div>
      </div>
    </section>
  )
}
