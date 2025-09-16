---
layout: home
hero:
  name: "Sequenzo"
  text: "Documentation"
  tagline: "Redirecting to English..."
  actions:
    - theme: brand
      text: Go to English Docs
      link: /en/
---

<script setup>
if (typeof window !== 'undefined') {
  const preferred = (navigator.language || '').toLowerCase().startsWith('zh') ? '/zh/' : '/en/'
  window.location.replace(preferred)
}
</script>
