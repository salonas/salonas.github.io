const PARTS = { data: 'application/octet-stream', 'framework.js': 'text/javascript', wasm: 'application/wasm' }
const DOWNLOAD_SHARE = 0.8

const scripts = new Map()

function loadScript(src) {
  if (!scripts.has(src)) {
    scripts.set(
      src,
      new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = () => {
          scripts.delete(src)
          reject(new Error('Could not load ' + src))
        }
        document.head.appendChild(script)
      }),
    )
  }
  return scripts.get(src)
}

// The build ships gzipped. Some hosts hand the files over as they are and others unpack them on the way,
// so the first bytes decide whether there is anything left to unpack.
async function unpack(response, type, onBytes) {
  const reader = response.body.getReader()
  const first = await reader.read()
  const gzipped = !first.done && first.value[0] === 0x1f && first.value[1] === 0x8b
  const pass = (controller, { done, value }) => {
    if (done) return controller.close()
    onBytes(value.byteLength)
    controller.enqueue(value)
  }
  const raw = new ReadableStream({
    start: (controller) => pass(controller, first),
    pull: async (controller) => pass(controller, await reader.read()),
    cancel: () => reader.cancel(),
  })
  const plain = gzipped ? raw.pipeThrough(new DecompressionStream('gzip')) : raw
  const blob = await new Response(plain).blob()
  return URL.createObjectURL(new Blob([blob], { type }))
}

// The player wires every sound straight to the speakers. Handing it a gain node instead gives the page a volume control.
function quietAudio(volume) {
  const Real = window.AudioContext ?? window.webkitAudioContext
  if (!Real) return { restore() {}, setVolume() {} }
  const masters = []
  let level = volume
  class GameAudio extends Real {
    constructor(options) {
      super(options)
      const master = this.createGain()
      master.gain.value = level
      master.connect(super.destination)
      masters.push(master)
      this.master = master
    }
    get destination() {
      return this.master ?? super.destination
    }
  }
  window.AudioContext = GameAudio
  return {
    restore: () => (window.AudioContext = Real),
    setVolume: (value) => {
      level = value
      for (const master of masters) master.gain.value = value
    },
  }
}

const STALLED_AFTER = 90

// Once the game quits by itself it stops asking for frames while the page keeps drawing.
// Counting page frames instead of seconds keeps a slow or hidden tab from looking like a quit.
function watchFrames(onStall) {
  const real = window.requestAnimationFrame
  let missed = 0
  let watching = true
  window.requestAnimationFrame = (callback) => {
    if (callback?.name === 'Browser_mainLoop_runner') missed = 0
    return real.call(window, callback)
  }
  const stop = () => {
    watching = false
    window.requestAnimationFrame = real
  }
  const beat = () => {
    if (!watching) return
    if (++missed > STALLED_AFTER) {
      stop()
      onStall()
      return
    }
    real.call(window, beat)
  }
  real.call(window, beat)
  return stop
}

export async function startGame(build, canvas, onProgress, volume = 1) {
  const base = `/games/${build}/${build}`
  const responses = await Promise.all(
    Object.keys(PARTS).map(async (part) => {
      const response = await fetch(`${base}.${part}.gz`)
      if (!response.ok) throw new Error('Could not load ' + response.url)
      return response
    }),
  )
  const total = responses.reduce((sum, r) => sum + Number(r.headers.get('Content-Length') ?? 0), 0)
  let loaded = 0
  const count = (bytes) => {
    loaded += bytes
    if (total) onProgress(Math.min(1, loaded / total) * DOWNLOAD_SHARE)
  }
  const [dataUrl, frameworkUrl, codeUrl] = await Promise.all(
    responses.map((response, i) => unpack(response, Object.values(PARTS)[i], count)),
  )
  await loadScript(`${base}.loader.js`)
  const audio = quietAudio(volume)
  try {
    const instance = await window.createUnityInstance(
      canvas,
      {
        dataUrl,
        frameworkUrl,
        codeUrl,
        companyName: 'Salonas',
        productName: build,
        productVersion: '1.0',
        // The addresses above are new on every visit, so the loader cache would only pile up copies.
        cacheControl: () => 'no-store',
      },
      (progress) => onProgress(DOWNLOAD_SHARE + progress * (1 - DOWNLOAD_SHARE)),
    )
    instance.setVolume = audio.setVolume
    let open = true
    const closed = () => {
      if (!open) return
      open = false
      unwatch()
      instance.onClosed?.()
    }
    const unwatch = watchFrames(closed)
    instance.Module.onQuit = closed
    const quit = instance.Quit.bind(instance)
    instance.Quit = () => {
      open = false
      unwatch()
      return quit()
    }
    return instance
  } finally {
    audio.restore()
    for (const url of [dataUrl, frameworkUrl, codeUrl]) URL.revokeObjectURL(url)
  }
}
