import { defineConfig } from 'vitepress'
import { shared } from './shared'
import { en } from './en'
import { zh } from './zh'

export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en',
      ...en
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh',
      ...zh
    }
  },
  // ✅ 在这里添加 head，用于加载 MathJax
  head: [
      [
          'script',
        {
          id: 'mathjax',
          async: 'async',
          src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
        }
      ]
  ]
})
