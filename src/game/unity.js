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

export async function startGame(build, canvas, onProgress) {
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
  try {
    return await window.createUnityInstance(
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
  } finally {
    for (const url of [dataUrl, frameworkUrl, codeUrl]) URL.revokeObjectURL(url)
  }
}
