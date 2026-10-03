import { copyFileSync } from 'node:fs'

// GitHub Pages serves 404.html for unknown paths; shipping the app there lets React Router resolve them.
copyFileSync('dist/index.html', 'dist/404.html')
