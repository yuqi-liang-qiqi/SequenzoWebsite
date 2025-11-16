// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (typeof window === 'undefined') return

    let overlay: HTMLElement | null = null
    let overlayImage: HTMLImageElement | null = null
    let overlayCaption: HTMLElement | null = null
    let prevBtn: HTMLButtonElement | null = null
    let nextBtn: HTMLButtonElement | null = null
    let closeBtn: HTMLButtonElement | null = null
    let currentImages: HTMLImageElement[] = []
    let currentIndex = 0
    let keyListenerAttached = false

    function createOverlayIfNeeded() {
      if (overlay) return
      overlay = document.createElement('div')
      overlay.className = 'spx-lightbox-overlay'
      overlay.innerHTML = `
        <div class="spx-lightbox-stage" role="dialog" aria-modal="true">
          <div class="spx-lightbox-zone spx-lightbox-zone-left" aria-hidden="true"></div>
          <div class="spx-lightbox-zone spx-lightbox-zone-right" aria-hidden="true"></div>
          <img class="spx-lightbox-image" alt="" />
          <div class="spx-lightbox-caption" aria-live="polite"></div>
          <button class="spx-lightbox-btn spx-lightbox-close" aria-label="Close">✕</button>
        </div>
        <button class="spx-lightbox-btn spx-lightbox-prev" aria-label="Previous image">❮</button>
        <button class="spx-lightbox-btn spx-lightbox-next" aria-label="Next image">❯</button>
      `
      document.body.appendChild(overlay)
      overlayImage = overlay.querySelector('.spx-lightbox-image')
      overlayCaption = overlay.querySelector('.spx-lightbox-caption')
      prevBtn = overlay.querySelector('.spx-lightbox-prev')
      nextBtn = overlay.querySelector('.spx-lightbox-next')
      closeBtn = overlay.querySelector('.spx-lightbox-close')
      const leftZone = overlay.querySelector('.spx-lightbox-zone-left') as HTMLElement | null
      const rightZone = overlay.querySelector('.spx-lightbox-zone-right') as HTMLElement | null

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeLightbox()
        }
      })
      prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation()
        showByIndex(currentIndex - 1)
      })
      nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation()
        showByIndex(currentIndex + 1)
      })
      closeBtn?.addEventListener('click', (e) => {
        e.stopPropagation()
        closeLightbox()
      })
      leftZone?.addEventListener('click', (e) => {
        e.stopPropagation()
        showByIndex(currentIndex - 1)
      })
      rightZone?.addEventListener('click', (e) => {
        e.stopPropagation()
        showByIndex(currentIndex + 1)
      })
    }

    function attachKeyListener() {
      if (keyListenerAttached) return
      keyListenerAttached = true
      window.addEventListener('keydown', (e) => {
        if (!overlay || !overlay.classList.contains('active')) return
        if (e.key === 'Escape') {
          e.preventDefault()
          closeLightbox()
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          showByIndex(currentIndex - 1)
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          showByIndex(currentIndex + 1)
        }
      })
    }

    function openLightbox(images: HTMLImageElement[], index: number) {
      createOverlayIfNeeded()
      attachKeyListener()
      currentImages = images
      showByIndex(index)
      requestAnimationFrame(() => {
        overlay?.classList.add('active')
        document.documentElement.style.overflow = 'hidden'
      })
    }

    function closeLightbox() {
      if (!overlay) return
      overlay.classList.remove('active')
      document.documentElement.style.overflow = ''
    }

    function showByIndex(index: number) {
      if (!overlay || !overlayImage) return
      if (currentImages.length === 0) return
      if (index < 0) index = currentImages.length - 1
      if (index >= currentImages.length) index = 0
      currentIndex = index
      const img = currentImages[currentIndex]
      const src = (img as HTMLImageElement).getAttribute('data-large') || img.src
      const alt = img.alt || ''
      overlayImage.src = src
      overlayImage.alt = alt
      if (overlayCaption) {
        overlayCaption.textContent = alt
        overlayCaption.style.display = alt ? 'block' : 'none'
      }
      // enable/disable arrows visually if single image
      if (prevBtn && nextBtn) {
        const single = currentImages.length <= 1
        prevBtn.style.display = single ? 'none' : ''
        nextBtn.style.display = single ? 'none' : ''
      }
    }

    function setupPageImages() {
      // Select images inside documentation content
      const container =
        document.querySelector('.vp-doc') ||
        document.querySelector('.VPDoc') ||
        document.querySelector('main') ||
        document.body

      if (!container) return
      const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[]
      const gallery = imgs.filter((img) => {
        // ignore icons, badges, nav, logos
        const w = img.width
        const h = img.height
        const isSmall = w && h ? Math.max(w, h) < 24 : false
        const role = img.getAttribute('role')
        const ariaHidden = img.getAttribute('aria-hidden') === 'true'
        return !isSmall && role !== 'presentation' && !ariaHidden
      })

      gallery.forEach((img, idx) => {
        if (img.getAttribute('data-lightbox-bound') === '1') return
        img.setAttribute('data-lightbox-bound', '1')
        img.classList.add('spx-lightbox-thumb')
        img.style.cursor = 'zoom-in'
        img.addEventListener('click', (e) => {
          e.preventDefault()
          const indexInGallery = gallery.indexOf(img)
          openLightbox(gallery, indexInGallery >= 0 ? indexInGallery : idx)
        })
      })
    }

    // Run on initial load and every route change
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupPageImages, { once: true })
    } else {
      setupPageImages()
    }
    router.onAfterRouteChanged = () => {
      // slight delay to ensure content is rendered
      setTimeout(setupPageImages, 0)
    }
  }
} satisfies Theme
