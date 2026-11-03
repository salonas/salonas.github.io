import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeRoutePages } from './scripts/route-pages.js'

function routePages() {
  let outDir
  return {
    name: 'route-pages',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      writeRoutePages(outDir)
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), routePages()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/test/setup.js',
    css: false,
  },
})
