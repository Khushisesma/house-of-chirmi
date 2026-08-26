import http from 'http'
import { readFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DIST = path.resolve('dist')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
}

const send = (res, code, body, type) => {
  res.writeHead(code, { 'Content-Type': type || 'text/plain' })
  res.end(body)
}

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split('?')[0])
    if (urlPath === '/') urlPath = '/index.html'
    const filePath = path.join(DIST, urlPath)
    if (existsSync(filePath) && (await stat(filePath)).isFile()) {
      return send(res, 200, await readFile(filePath), types[path.extname(filePath)] || 'application/octet-stream')
    }
    const htmlPath = path.join(DIST, urlPath.replace(/\/$/, '') + '.html')
    if (existsSync(htmlPath)) {
      return send(res, 200, await readFile(htmlPath), types['.html'])
    }
    // SPA fallback (deep links survive)
    return send(res, 200, await readFile(path.join(DIST, 'index.html')), types['.html'])
  } catch (e) {
    return send(res, 500, 'Server error')
  }
})

server.listen(3000, '0.0.0.0', () => console.log('Serving prerendered dist on http://0.0.0.0:3000'))
