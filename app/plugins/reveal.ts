import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Define the directive for both SSR (server) and CSR (client)
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client) return

      // Add general reveal class
      el.classList.add('reveal')

      // Determine animation type (default: slide-up)
      let animType = 'slide-up'
      let delay = 0
      let duration = 800

      if (typeof binding.value === 'string') {
        animType = binding.value
      } else if (binding.value && typeof binding.value === 'object') {
        if (binding.value.type) animType = binding.value.type
        if (binding.value.delay) delay = binding.value.delay
        if (binding.value.duration) duration = binding.value.duration
      } else if (binding.arg) {
        animType = binding.arg
      }

      el.classList.add(`reveal-${animType}`)

      // Apply dynamic transitions styles if specified
      if (delay > 0) {
        el.style.transitionDelay = `${delay}ms`
      }
      if (duration !== 800) {
        el.style.transitionDuration = `${duration}ms`
      }

      // Create an observer for this element or use a shared observer
      // Let's use a single, shared observer on the window object/global space or construct one
      if (!window.__revealObserver) {
        const observerOptions = {
          root: null,
          rootMargin: '0px 0px -8% 0px',
          threshold: 0.05,
        }
        window.__revealObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement
              target.classList.add('reveal-visible')
              window.__revealObserver?.unobserve(target)
            }
          })
        }, observerOptions)
      }

      const observer = window.__revealObserver

      // Cleanup listener to run after transition ends
      // This completely preserves original :hover and active transitions
      const handleTransitionEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
          el.classList.remove('reveal', 'reveal-visible')
          const classesToRemove = Array.from(el.classList).filter(c => c.startsWith('reveal-'))
          classesToRemove.forEach(c => el.classList.remove(c))
          
          el.style.transitionDelay = ''
          el.style.transitionDuration = ''
          el.removeEventListener('transitionend', handleTransitionEnd)
        }
      }
      el.addEventListener('transitionend', handleTransitionEnd)

      // Start observing
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      if (!import.meta.client) return
      if (window.__revealObserver) {
        window.__revealObserver.unobserve(el)
      }
    },
    getSSRProps(binding) {
      let animType = 'slide-up'
      let style = ''

      if (typeof binding.value === 'string') {
        animType = binding.value
      } else if (binding.value && typeof binding.value === 'object') {
        if (binding.value.type) animType = binding.value.type
        if (binding.value.delay) {
          style += `transition-delay: ${binding.value.delay}ms;`
        }
        if (binding.value.duration) {
          style += `transition-duration: ${binding.value.duration}ms;`
        }
      } else if (binding.arg) {
        animType = binding.arg
      }

      return {
        class: `reveal reveal-${animType}`,
        ...(style ? { style } : {})
      }
    }
  })
})

// Declare global type for the window observer
declare global {
  interface Window {
    __revealObserver?: IntersectionObserver
  }
}
