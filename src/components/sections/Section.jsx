import MediaPlayer from '../MediaPlayer'
import Paper from '../Paper'
import { useLanguage } from '../../i18n/LanguageProvider'
import { mediaUrl } from '../../projects'
import { outside } from '../outside'

// Project texts may carry links written as [[label|url]].
function RichText({ text }) {
  const parts = text.split(/\[\[([^|\]]+)\|([^\]]+)\]\]/)
  return parts.map((part, i) => {
    if (i % 3 === 0) return part
    if (i % 3 === 2) return null
    return (
      <a key={i} href={parts[i + 1]} {...outside}>
        {part}
      </a>
    )
  })
}

const tiltOf = (i) => (i % 2 ? 'r' : 'l')

export default function Section({ project, section, onZoom }) {
  const { t, L } = useLanguage()
  const url = (file) => mediaUrl(project.slug, file)

  const body = {
    video: () => (
      <Paper className="media">
        <MediaPlayer kind="video" src={url(section.src)} label={L(section.title)} />
      </Paper>
    ),
    loops: () => (
      <div className="loops">
        {section.items.map((file, i) => (
          <Paper key={file} tilt={tiltOf(i)}>
            <video autoPlay muted loop playsInline src={url(file)} />
          </Paper>
        ))}
      </div>
    ),
    shots: () => (
      <div className="shots">
        {section.items.map((item, i) => (
          <Paper key={item.src} tilt={tiltOf(i)} className={section.sketch ? 'sketch' : ''}>
            <button type="button" className="zbtn" aria-label={`${t('zoom')}: ${L(item.alt)}`} onClick={() => onZoom(item.src)}>
              <img loading="lazy" src={url(item.src)} alt={L(item.alt)} />
            </button>
          </Paper>
        ))}
      </div>
    ),
    text: () => (
      <Paper>
        <p className="prose">
          <RichText text={L(section.body)} />
        </p>
      </Paper>
    ),
    list: () => (
      <Paper>
        <ul className="plain">
          {L(section.items).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Paper>
    ),
    items: () => (
      <div className="items">
        {section.items.map((item, i) => (
          <Paper key={L(item.name)} tilt={tiltOf(i)}>
            <h4>{L(item.name)}</h4>
            <p>{L(item.text)}</p>
          </Paper>
        ))}
      </div>
    ),
    audio: () =>
      section.tracks.map((track) => (
        <Paper key={track.src} className="track media">
          <span>{L(track.title)}</span>
          <MediaPlayer kind="audio" src={url(track.src)} label={L(track.title)} />
        </Paper>
      )),
  }[section.kind]

  return (
    <div className="stack">
      <h3 className="label sub">{L(section.title)}</h3>
      {body?.()}
    </div>
  )
}
