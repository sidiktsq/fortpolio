<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isLoaded = ref(false)
let widgetInstance = null

onMounted(() => {
  // SSR safety: check window
  if (typeof window === 'undefined') return

  if (window.SakanaWidget) {
    initWidget()
  } else {
    // Load CDN Script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/sakana-widget@3.0.0/lib/index.umd.min.js'
    script.async = true
    script.onload = () => {
      initWidget()
    }
    script.onerror = (err) => {
      console.error('Failed to load Sakana Widget script from CDN', err)
    }
    document.body.appendChild(script)
  }
})

const initWidget = () => {
  if (!window.SakanaWidget) return
  
  try {
    // Get default chisato character data
    const chisatoCharacter = window.SakanaWidget.getCharacter('chisato');
    if (chisatoCharacter) {
      // Override the image with custom chibi_custom.png (optimized)
      chisatoCharacter.image = '/gallery/chibi1.png';
      window.SakanaWidget.registerCharacter('chisato-custom', chisatoCharacter);
    }

    // Initialize Sakana Widget with custom Chisato
    widgetInstance = new window.SakanaWidget({
      character: 'chisato-custom',
      size: 200, // Large base size (fixes canvas clipping)
      autoFit: true,
      saveState: true,
      stateKey: 'sakana-widget-chisato'
    });
    
    widgetInstance.mount('#sakana-widget')
    isLoaded.value = true
  } catch (error) {
    console.error('Error initializing Sakana Widget:', error)
  }
}

onUnmounted(() => {
  if (widgetInstance) {
    try {
      widgetInstance.unmount()
    } catch (e) {
      console.error('Error unmounting Sakana Widget:', e)
    }
  }
})
</script>

<template>
  <div class="sakana-widget-container">
    <div id="sakana-widget"></div>
  </div>
</template>

<style scoped>
.sakana-widget-container {
  position: fixed;
  left: -65px; /* Push container left so character's body sits in the corner */
  bottom: -105px; /* Push container down so character's feet stand on the bottom edge */
  width: 280px; /* Large width */
  height: 380px; /* Taller height to prevent clipping */
  z-index: 9999;
  pointer-events: auto;
}

#sakana-widget {
  width: 100%;
  height: 100%;
}

/* Force all sub-elements of the widget to allow overflow, preventing any clipping */
.sakana-widget-container :deep(*) {
  overflow: visible !important;
}

/* Ensure the background image container contains the character completely without clipping */
.sakana-widget-container :deep(.sakana-widget-img),
.sakana-widget-container :deep(.sakana-widget-image),
.sakana-widget-container :deep(.sakana-widget-char),
.sakana-widget-container :deep(div[style*="background-image"]) {
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center bottom !important;
  overflow: visible !important;
}

/* Adjust sizes for mobile viewports cleanly using CSS scale */
@media (max-width: 768px) {
  .sakana-widget-container {
    left: -45px; /* Push left on mobile */
    bottom: -75px; /* Push down on mobile */
    width: 200px;
    height: 270px;
  }
}
</style>
