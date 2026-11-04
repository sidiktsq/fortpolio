import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  const lenis = new Lenis({
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    syncTouch: false, // Use native touch momentum on mobile for 120Hz smooth scrolling
    touchMultiplier: 1,
    wheelMultiplier: 1,
    autoRaf: true, // Built-in optimized RAF in Lenis v1.3
  })

  // Expose on window for easy access
  if (typeof window !== 'undefined') {
    window.__lenis = lenis
  }

  // Recalculate scroll dimensions and reset position on route transition
  const router = useRouter()
  router.afterEach(() => {
    setTimeout(() => {
      lenis.resize()
      lenis.scrollTo(0, { immediate: true })
    }, 60)
  })

  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      lenis.resize()
    }, 100)
  })

  return {
    provide: {
      lenis,
    },
  }
})
