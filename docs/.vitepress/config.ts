import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitepress'
import { shared } from './shared'
import { en } from './en'
import { zh } from './zh'

// Derive a per-page meta description from the first prose paragraph,
// so search engines and link previews show page-specific summaries
// instead of the site-wide default.
function extractDescription(filePath: string): string | undefined {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    let text = raw.replace(/^---[\s\S]*?---/, '')
    text = text.replace(/<!--[\s\S]*?-->/g, '')
    text = text.replace(/```[\s\S]*?```/g, '')
    text = text.replace(/\$\$[\s\S]*?\$\$/g, '')
    text = text.replace(/<[^>]+>/g, '')
    for (const block of text.split(/\n\s*\n/)) {
      const line = block.trim()
      if (!line) continue
      if (/^(#|\||>|!\[|\*\s|-\s|\d+\.\s|:::)/.test(line)) continue
      let s = line.replace(/\s+/g, ' ')
      s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      s = s.replace(/[*_`$]/g, '')
      if (s.length < 40) continue
      return s.length > 158 ? s.slice(0, 155).trimEnd() + '…' : s
    }
  } catch {
    // fall through to the site-wide default description
  }
  return undefined
}

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      ...en
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      ...zh
    }
  },
  markdown: {
    math: true
  },
  transformPageData(pageData, { siteConfig }) {
    const isEnglishPage = pageData.filePath.startsWith('en/')
    if (!isEnglishPage) return

    if (pageData.frontmatter.layout !== 'home' && !pageData.frontmatter.description) {
      const file = path.join(siteConfig.srcDir, pageData.filePath)
      const desc = extractDescription(file)
      if (desc) pageData.description = desc
    }
    // Per-page Open Graph tags so shared links preview with the page's own
    // title and summary instead of the site-wide defaults.
    const head = (pageData.frontmatter.head ??= [])
    const ogTitle = pageData.title || 'Sequenzo'
    head.push(['meta', { property: 'og:title', content: ogTitle }])
    if (pageData.description) {
      head.push(['meta', { property: 'og:description', content: pageData.description }])
    }
  }
})
