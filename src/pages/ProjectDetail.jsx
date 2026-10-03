import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImageViewer from '../components/ImageViewer'
import Paper from '../components/Paper'
import { Cover, Tags } from '../components/ProjectCard'
import Section from '../components/sections/Section'
import { useLanguage } from '../i18n/LanguageProvider'
import { findProject, mediaUrl } from '../projects'

function viewerImages(project, L) {
  return project.sections
    .filter((s) => s.kind === 'shots')
    .flatMap((s) => s.items.map((x) => ({ key: x.src, src: mediaUrl(project.slug, x.src), alt: L(x.alt), sketch: !!s.sketch })))
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, L } = useLanguage()
  const [zoom, setZoom] = useState(null)
  const project = findProject(slug)

  if (!project) {
    return (
      <section className="page">
        <Paper>
          <h2>{t('proj-missing')}</h2>
          <Link to="/projects" style={{ alignSelf: 'flex-start' }}>
            {t('back')}
          </Link>
        </Paper>
      </section>
    )
  }

  const images = viewerImages(project, L)

  return (
    <section className="page">
      <div className="stack" style={{ gap: '2.6rem' }}>
        <Link to="/projects" style={{ alignSelf: 'flex-start' }}>
          {t('back')}
        </Link>

        <div className="row" style={{ alignItems: 'center' }}>
          <Cover project={project} className="cover" />
          <div className="phead">
            <Tags project={project} />
            <h2>{project.title}</h2>
            <p style={{ fontSize: 'var(--t3)' }}>{L(project.summary)}</p>
          </div>
        </div>

        <Paper className="facts">
          <div>
            <small>{t('role')}</small>
            {L(project.roles)}
          </div>
          <div>
            <small>{t('tools')}</small>
            {project.tools}
          </div>
          {project.year && (
            <div>
              <small>{t('year')}</small>
              {project.year}
            </div>
          )}
          <div>
            <small>{t('code')}</small>
            {project.repo ? <a href={project.repo}>{t('repo')}</a> : L(project.code)}
          </div>
        </Paper>

        {project.sections.map((section, i) => (
          <Section
            key={i}
            project={project}
            section={section}
            onZoom={(file) => setZoom(images.findIndex((x) => x.key === file))}
          />
        ))}
      </div>

      {zoom !== null && <ImageViewer images={images} index={zoom} onIndex={setZoom} onClose={() => setZoom(null)} />}
    </section>
  )
}
