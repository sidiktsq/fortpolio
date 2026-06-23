<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isLoaded = ref(false)
const isHidden = ref(false)

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    // Check if script is already injected
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve()
      } else {
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', (err) => reject(err))
      }
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })
}

// Function to bring the widget back
const showWidget = () => {
  if (window.jQuery) {
    window.jQuery('.takagi').show()
  }
  sessionStorage.removeItem('takagi-dsiplay')
  isHidden.value = false
}

// Function to handle the close action matching the script timeout
const handleClose = () => {
  setTimeout(() => {
    isHidden.value = true
  }, 1300)
}

onMounted(async () => {
  if (typeof window === 'undefined') return

  // Check if closed in previous session
  if (sessionStorage.getItem('takagi-dsiplay') === 'none') {
    isHidden.value = true
  }

  try {
    // 1. Load JQuery (required by takagi-tips)
    if (!window.$ || !window.jQuery) {
      await loadScript('https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js')
    }

    // 2. Load JQuery UI (optional for dragging support)
    if (window.$ && !window.$.fn.draggable) {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/jquery-ui-dist@1.12.1/jquery-ui.min.js')
      } catch (err) {
        console.warn('Failed to load JQuery UI. Dragging will fallback to standard behavior.', err)
      }
    }

    // 3. Load Live2D Core Renderer
    if (typeof window.loadlive2d !== 'function') {
      await loadScript('/live2d/js/live2d.min.js')
    }

    // 4. Load Takagi Tips controller (defines initModel)
    if (typeof window.initModel !== 'function') {
      await loadScript('/live2d/js/takagi-tips.min.js')
    }

    // Initialize the widget
    if (window.initModel) {
      window.initModel('/live2d/json/takagi-tips.json', {
        modelAPI: 'https://live2d.fghrsh.net/api/',
        tipsMessage: '/live2d/json/takagi-tips.json',
        hitokotoAPI: 'hitokoto.cn',
        modelId: 1,
        modelTexturesId: 1,
        showToolMenu: true,
        canCloseLive2d: true,
        canSwitchModel: true,
        canSwitchTextures: true,
        canSwitchHitokoto: true,
        canTakeScreenshot: true,
        canTurnToHomePage: false,
        canTurnToAboutPage: true,
        modelStorage: true,
        modelRandMode: 'switch',
        modelTexturesRandMode: 'rand',
        showHitokoto: true,
        showF12Status: false,
        showF12Message: false,
        showF12OpenMsg: false,
        showCopyMessage: true,
        showWelcomeMessage: true,
        takagiSize: '280x250',
        takagiTipsSize: '250x70',
        takagiFontSize: '12px',
        takagiToolFont: '14px',
        takagiToolLine: '20px',
        takagiToolTop: '0px',
        takagiMinWidth: 'disable', // Set to disable so it can load on mobile
        takagiEdgeSide: 'left:20', // Align to left margin nicely
        takagiDraggable: 'unlimited', // Draggable option: 'disable', 'axis-x', 'unlimited'
        takagiDraggableRevert: true,
        aboutPageUrl: 'https://github.com/LIlGG/halo-live2d'
      })
      isLoaded.value = true
    }
  } catch (error) {
    console.error('Failed to initialize Live2D widget:', error)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    // Clear global hitokoto timers
    if (window.hitokotoTimer) {
      window.clearInterval(window.hitokotoTimer)
    }
    // Remove widget styling/elements if dynamically loaded
    if (window.jQuery) {
      window.jQuery('.takagi').remove()
    }
  }
})
</script>

<template>
  <div class="live2d-widget-wrapper">
    <!-- Load custom styles from public/live2d/css/takagi.min.css -->
    <link rel="stylesheet" type="text/css" href="/live2d/css/takagi.min.css" />
    <div class="takagi" :class="{ 'hidden-widget': isHidden }">
      <div class="takagi-tips"></div>
      <canvas id="live2d" class="live2d"></canvas>
      <div class="takagi-tool">
        <span class="fui-home"></span>
        <span class="fui-chat"></span>
        <span class="fui-eye"></span>
        <span class="fui-user"></span>
        <span class="fui-photo"></span>
        <span class="fui-info-circle"></span>
        <span class="fui-cross" @click="handleClose"></span>
      </div>
    </div>

    <!-- Floating button to restore the widget -->
    <div 
      v-if="isHidden" 
      class="restore-widget-btn" 
      @click="showWidget"
      title="Tampilkan Maskot"
    >
      <span class="fui-chat"></span>
    </div>
  </div>
</template>

<style scoped>
/* Override default styling rules to look polished and sit correctly on top */
.live2d-widget-wrapper :deep(.takagi) {
  z-index: 9999 !important;
  pointer-events: none; /* Let clicks pass through empty spaces of the 280x250 container */
}

/* Allow pointer events only on interactive parts */
.live2d-widget-wrapper :deep(.takagi #live2d) {
  pointer-events: auto;
}

.live2d-widget-wrapper :deep(.takagi-tool) {
  z-index: 10001 !important;
  pointer-events: auto;
}

.live2d-widget-wrapper :deep(.takagi-tips) {
  z-index: 10000 !important;
  pointer-events: none;
}

/* Hides the widget when closed or if closed in previous sessions */
.live2d-widget-wrapper :deep(.takagi.hidden-widget) {
  display: none !important;
}

/* Restore button styling with premium feel */
.restore-widget-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 45px;
  height: 45px;
  background-color: var(--tertiary-color, #ffffff);
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0 #1a1a1a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  font-size: 1.1rem;
  color: #1a1a1a;
  transition: all 0.2s ease-in-out;
}

.restore-widget-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #1a1a1a;
  background-color: var(--primary-color, #e0e0e0);
}

.restore-widget-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 #1a1a1a;
}

/* Custom responsiveness for Live2D on Mobile */
@media (max-width: 768px) {
  .live2d-widget-wrapper :deep(.takagi) {
    transform: scale(0.55) translateY(3px) !important; /* Scale mascot down */
    transform-origin: left bottom !important;
    left: 10px !important;
    bottom: 0px !important;
  }
  
  /* Hide the speech bubble entirely on mobile so it doesn't block the screen */
  .live2d-widget-wrapper :deep(.takagi-tips) {
    display: none !important;
  }
  
  /* Adjust restore button size for smaller screens */
  .restore-widget-btn {
    width: 38px;
    height: 38px;
    font-size: 0.9rem;
    bottom: 15px;
    left: 15px;
    border: 2px solid #1a1a1a;
    box-shadow: 2px 2px 0 #1a1a1a;
  }
  
  .restore-widget-btn:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 #1a1a1a;
  }
  
  .restore-widget-btn:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #1a1a1a;
  }
}
</style>
