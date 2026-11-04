import { useLayoutEffect, useRef, useState } from 'react'

const ready = (el) => (el.tagName === 'VIDEO' ? el.readyState >= 2 : el.complete && el.naturalWidth > 0)

export default function FadeIn({ as: Tag = 'img', className = '', ...props }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  useLayoutEffect(() => {
    setLoaded(ready(ref.current))
  }, [props.src])
  const show = () => setLoaded(true)
  const done = Tag === 'video' ? { onLoadedData: show } : { onLoad: show }
  const classes = `${className} ${loaded ? '' : 'loading'}`.trim()
  return <Tag ref={ref} className={classes || undefined} {...props} {...done} onError={show} />
}
