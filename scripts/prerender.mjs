import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const { render } = await import(path.resolve(root, 'dist-ssr/entry-server.js'))
const appHtml = render()

const indexPath = path.resolve(root, 'dist/index.html')
const html = fs.readFileSync(indexPath, 'utf-8')

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html')
}

fs.writeFileSync(indexPath, html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`))
fs.rmSync(path.resolve(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`Prerendered dist/index.html (${appHtml.length.toLocaleString()} chars of markup injected)`)
