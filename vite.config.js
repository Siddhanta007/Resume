import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const structuredData = readFileSync(new URL('./public/profile.jsonld', import.meta.url), 'utf8')

const structuredDataPlugin = {
  name: 'portfolio-structured-data',
  transformIndexHtml() {
    return [{
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: structuredData,
      injectTo: 'head',
    }]
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), structuredDataPlugin],
})
