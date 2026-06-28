<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin } from '@pixiv/three-vrm'

const isLoaded = ref(false)
const isLoading = ref(true)
const loadingProgress = ref(0)
const isHidden = ref(false)
const hasError = ref(false)

const bubbleText = ref('')
const bubbleActive = ref(false)
const errorMessage = ref('')

// Canvas reference
const canvasRef = ref(null)
const containerRef = ref(null)

// Interaction States
const isDragging = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

let dragRotationY = Math.PI // Faces forward initially
let previousPointerX = 0

// References to Three.js elements
let scene = null
let camera = null
let renderer = null
let clock = null
let animationFrameId = null
let resizeObserver = null
let bubbleTimer = null

// VRM/GLTF instances and groups
let modelGroup = null
let currentVRM = null
let currentGLTF = null
let headBone = null
let neckBone = null
let hipsBone = null

// Debug Information Ref
const debugInfo = ref({
  head: 'Loading...',
  hips: 'Loading...',
  camera: 'Loading...',
  bounds: 'Loading...',
  center: 'Loading...'
})

// ── Model Registry ──────────────────────────────────────────────────
const modelRegistry = [
  {
    id: 'elaina',
    name: 'Elaina',
    file: 'elaina.glb',
    icon: '🧹',
    greeting: 'Halo! Aku Elaina, Sang Penyihir Pengembara. Selamat datang di portofolio ini! 🔮',
    quotes: [
      "Siapa gadis cantik berambut abu-abu ini? Ya, benar, aku! Elaina. ✨",
      "Perjalanan melintasi berbagai negeri sangat melelahkan, tapi melihat portofoliomu membuatku bersemangat!",
      "Wah, portofoliomu rapi sekali! Desain neo-brutalism yang unik, aku suka warnanya.",
      "Hei! Kamu bisa memutar tubuhku dengan mengklik dan mengeret mouse-mu. Seru juga!",
      "Di pojok kiri ada Takagi-san, di pojok kanan ada aku. Lengkap sekali portofolio ini!",
      "Sebagai penyihir pengembara, aku telah melihat banyak hal hebat, tapi karya-karyamu sungguh menakjubkan!",
      "Apakah kamu tertarik dengan sihir? Aku bisa mengajarimu beberapa mantra dasar jika kamu mau."
    ]
  },
  {
    id: 'mita',
    name: 'Mita',
    file: 'mita.glb',
    icon: '🎀',
    greeting: 'Haii~ Aku Mita! Senang bertemu denganmu di portofolio ini! 💕',
    quotes: [
      "Kamu tidak akan meninggalkanku, kan? Aku akan selalu di sini untukmu~ 💗",
      "Portofolio ini keren banget! Aku suka desainnya~ Tapi aku lebih suka kamu. 😊",
      "Hei, kamu tahu? Aku bisa melihat semua yang kamu lakukan di sini~ 👀",
      "Jangan klik yang lain, cukup klik aku saja ya~ 💕",
      "Aku sudah menunggu kamu dari tadi lho~ Akhirnya kamu datang juga! ✨",
      "Kalau kamu butuh teman, aku selalu ada di sini. Selamanya~ 🌸",
      "Wah, project-projectnya keren! Tapi yang paling keren itu kamu~ 💗"
    ]
  }
]

const currentModelIndex = ref(0)
const isSwitching = ref(false)

const currentModel = () => modelRegistry[currentModelIndex.value]

// ── Speech Bubble ───────────────────────────────────────────────────
const showBubble = (text) => {
  bubbleText.value = text
  bubbleActive.value = true
  
  if (bubbleTimer) clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => {
    bubbleActive.value = false
  }, 6000)
}

const triggerGreeting = () => {
  showBubble(currentModel().greeting)
}

const triggerRandomQuote = () => {
  const quotes = currentModel().quotes
  const idx = Math.floor(Math.random() * quotes.length)
  showBubble(quotes[idx])
}

// Function to handle close/minimize
const handleClose = () => {
  sessionStorage.setItem('elaina-widget-display', 'none')
  isHidden.value = true
}

// Function to restore widget
const showWidget = () => {
  sessionStorage.removeItem('elaina-widget-display')
  isHidden.value = false
  
  nextTick(() => {
    triggerGreeting()
    window.dispatchEvent(new Event('resize'))
  })
}

// Pointer event handlers for drag-to-rotate
let pointerDownTime = 0
let pointerDownPos = { x: 0, y: 0 }

const handlePointerDown = (event) => {
  isDragging.value = true
  previousPointerX = event.clientX
  pointerDownTime = Date.now()
  pointerDownPos = { x: event.clientX, y: event.clientY }
}

const handlePointerMove = (event) => {
  if (isDragging.value) {
    const deltaX = event.clientX - previousPointerX
    dragRotationY += deltaX * 0.01
    previousPointerX = event.clientX
  }
}

const handlePointerUp = (event) => {
  isDragging.value = false
  
  const clickDuration = Date.now() - pointerDownTime
  const dist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y)
  
  // Quick click triggers quote
  if (clickDuration < 250 && dist < 5) {
    triggerRandomQuote()
  }
}

// Track mouse position relative to window for look-at tracking
const handleMouseMoveGlobal = (event) => {
  if (isHidden.value) return
  mouseX.value = (event.clientX / window.innerWidth) * 2 - 1
  mouseY.value = -(event.clientY / window.innerHeight) * 2 + 1
}

// ── Core Model Loader ───────────────────────────────────────────────
function disposeCurrentModel() {
  if (currentVRM) {
    if (currentVRM.scene) {
      modelGroup.remove(currentVRM.scene)
      currentVRM.scene.traverse((object) => {
        if (!object.isMesh) return
        object.geometry?.dispose()
        if (Array.isArray(object.material)) {
          object.material.forEach((m) => m.dispose())
        } else {
          object.material?.dispose()
        }
      })
    }
    currentVRM = null
  }
  if (currentGLTF) {
    modelGroup.remove(currentGLTF)
    currentGLTF.traverse((object) => {
      if (!object.isMesh) return
      object.geometry?.dispose()
      if (Array.isArray(object.material)) {
        object.material.forEach((m) => m.dispose())
      } else {
        object.material?.dispose()
      }
    })
    currentGLTF = null
  }
  headBone = null
  neckBone = null
  hipsBone = null
}

function loadModel(modelInfo) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.register((parser) => new VRMLoaderPlugin(parser))

    const config = useRuntimeConfig()
    const baseURL = config.app.baseURL || '/'
    const modelUrl = baseURL.endsWith('/')
      ? `${baseURL}models/${modelInfo.file}`
      : `${baseURL}/models/${modelInfo.file}`

    isLoading.value = true
    loadingProgress.value = 0
    hasError.value = false
    errorMessage.value = ''

    loader.load(
      modelUrl,
      (gltf) => {
        isLoading.value = false
        isLoaded.value = true

        const vrm = gltf.userData.vrm
        let activeModel = null

        if (vrm) {
          currentVRM = vrm
          activeModel = vrm.scene
          modelGroup.add(activeModel)

          // Face forward
          activeModel.rotation.y = Math.PI

          // Locate bones
          headBone = vrm.humanoid?.getNormalizedBoneNode('head')
          neckBone = vrm.humanoid?.getNormalizedBoneNode('neck')
          hipsBone = vrm.humanoid?.getNormalizedBoneNode('hips')

          if (vrm.lookAt) {
            vrm.lookAt.autoUpdate = false
          }
        } else {
          currentGLTF = gltf.scene
          activeModel = gltf.scene
          modelGroup.add(activeModel)

          // Face forward
          activeModel.rotation.y = Math.PI

          // Traverse to search bones manually
          activeModel.traverse((node) => {
            if (node.isBone) {
              const name = node.name.toLowerCase()
              if (name.includes('head') && !headBone) {
                headBone = node
              } else if (name.includes('neck') && !neckBone) {
                neckBone = node
              } else if ((name.includes('hip') || name.includes('pelvis')) && !hipsBone) {
                hipsBone = node
              }
            }
          })
        }

        // Force matrix update to compute world coordinates
        modelGroup.updateMatrixWorld(true)

        // Auto-detect if character bones are oriented horizontally along the Z-axis
        if (headBone && hipsBone) {
          const headLoc = new THREE.Vector3()
          const hipsLoc = new THREE.Vector3()
          headBone.getWorldPosition(headLoc)
          hipsBone.getWorldPosition(hipsLoc)

          const deltaY = headLoc.y - hipsLoc.y
          const deltaZ = headLoc.z - hipsLoc.z

          if (Math.abs(deltaZ) > Math.abs(deltaY)) {
            console.log('Detected model lying horizontally along Z-axis. Rotating model upright.')
            if (deltaZ > 0) {
              activeModel.rotation.x = -Math.PI / 2
            } else {
              activeModel.rotation.x = Math.PI / 2
            }
            modelGroup.updateMatrixWorld(true)
          }
        }

        // Scale model dynamically to match a standard height (1.45 units to head bone)
        let initialHeadHeight = 1.35
        if (headBone) {
          const headWorldPos = new THREE.Vector3()
          headBone.getWorldPosition(headWorldPos)
          initialHeadHeight = headWorldPos.y
        } else {
          const box = new THREE.Box3().setFromObject(activeModel)
          initialHeadHeight = box.getSize(new THREE.Vector3()).y
        }

        // Scale factor: we want the head to be at Y = 1.45
        const targetHeadHeight = 1.45
        const scaleFactor = targetHeadHeight / initialHeadHeight
        activeModel.scale.setScalar(scaleFactor)
        
        // Force update world matrix after scaling
        modelGroup.updateMatrixWorld(true)

        // Center model on X and Z axis relative to hips
        if (hipsBone) {
          const hipsWorldPos = new THREE.Vector3()
          hipsBone.getWorldPosition(hipsWorldPos)
          activeModel.position.x = -hipsWorldPos.x
          activeModel.position.z = -hipsWorldPos.z
          
          debugInfo.value.hips = `${hipsWorldPos.x.toFixed(3)}, ${hipsWorldPos.y.toFixed(3)}, ${hipsWorldPos.z.toFixed(3)}`
        } else {
          debugInfo.value.hips = 'Not Found'
        }
        activeModel.position.y = 0
        modelGroup.updateMatrixWorld(true)

        // Get final head bone world position to place the camera
        let headHeight = targetHeadHeight
        let headZ = 0
        let headX = 0

        if (headBone) {
          const headWorldPos = new THREE.Vector3()
          headBone.getWorldPosition(headWorldPos)
          headHeight = headWorldPos.y
          headZ = headWorldPos.z
          headX = headWorldPos.x
          
          debugInfo.value.head = `${headX.toFixed(3)}, ${headHeight.toFixed(3)}, ${headZ.toFixed(3)}`
        } else {
          debugInfo.value.head = `Scale fallback Y: ${headHeight.toFixed(3)}`
        }

        // Turn off frustum culling
        activeModel.traverse((node) => {
          if (node.isMesh) {
            node.frustumCulled = false
          }
        })

        // Adjust camera position & lookAt target (full body view)
        const targetHeight = headHeight * 0.55
        camera.position.set(headX, targetHeight, headZ + 4.5)
        camera.lookAt(new THREE.Vector3(headX, targetHeight, headZ))

        debugInfo.value.camera = `${camera.position.x.toFixed(3)}, ${camera.position.y.toFixed(3)}, ${camera.position.z.toFixed(3)}`

        // Check overall model bounds for debug overlay
        const groupBounds = new THREE.Box3().setFromObject(modelGroup)
        const sizeBounds = groupBounds.getSize(new THREE.Vector3())
        const centerBounds = groupBounds.getCenter(new THREE.Vector3())
        debugInfo.value.bounds = `${sizeBounds.x.toFixed(2)} x ${sizeBounds.y.toFixed(2)} x ${sizeBounds.z.toFixed(2)}`
        debugInfo.value.center = `${centerBounds.x.toFixed(2)}, ${centerBounds.y.toFixed(2)}, ${centerBounds.z.toFixed(2)}`

        console.log('DEBUG INFO:', debugInfo.value)
        resolve()
      },
      (progressEvent) => {
        if (progressEvent.total > 0) {
          loadingProgress.value = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        }
      },
      (error) => {
        console.error('Failed to load 3D GLB model:', error)
        errorMessage.value = error?.message || (error?.target?.status ? `Status: ${error.target.status} (File not found at ${modelUrl})` : 'Model failed to load/parse')
        isLoading.value = false
        hasError.value = true
        reject(error)
      }
    )
  })
}

// ── Switch Model ────────────────────────────────────────────────────
const switchModel = async () => {
  if (isSwitching.value || !modelGroup) return
  
  isSwitching.value = true
  bubbleActive.value = false

  // Determine next model
  const nextIndex = (currentModelIndex.value + 1) % modelRegistry.length
  
  // Dispose current model
  disposeCurrentModel()
  
  // Reset rotation
  dragRotationY = Math.PI
  if (modelGroup) {
    modelGroup.rotation.y = Math.PI
  }

  // Update index
  currentModelIndex.value = nextIndex

  // Save preference
  sessionStorage.setItem('3d-model-index', String(nextIndex))
  
  try {
    await loadModel(modelRegistry[nextIndex])
    triggerGreeting()
  } catch (e) {
    console.error('Model switch failed:', e)
  } finally {
    isSwitching.value = false
  }
}

onMounted(async () => {
  if (typeof window === 'undefined') return

  if (sessionStorage.getItem('elaina-widget-display') === 'none') {
    isHidden.value = true
  }

  // Restore saved model preference
  const savedIndex = sessionStorage.getItem('3d-model-index')
  if (savedIndex !== null) {
    const parsed = parseInt(savedIndex, 10)
    if (!isNaN(parsed) && parsed >= 0 && parsed < modelRegistry.length) {
      currentModelIndex.value = parsed
    }
  }

  window.addEventListener('mousemove', handleMouseMoveGlobal)

  // Wait for Vue to finish rendering the template so canvas ref is available
  await nextTick()

  if (!canvasRef.value) {
    console.error('Canvas ref is null')
    errorMessage.value = 'Canvas element not found in DOM'
    isLoading.value = false
    hasError.value = true
    return
  }

  try {
    scene = new THREE.Scene()

    // Create a group to handle centering & global widget rotations
    modelGroup = new THREE.Group()
    scene.add(modelGroup)

    const width = 300
    const height = 500

    camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 50.0)
    // Standby position
    camera.position.set(0.0, 0.85, 3.0)

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Lights Setup (Soft Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5)
    mainLight.position.set(2, 4, 3)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 1024
    mainLight.shadow.mapSize.height = 1024
    mainLight.shadow.bias = -0.0001
    scene.add(mainLight)

    const fillLight = new THREE.DirectionalLight(0xffedd5, 1.2)
    fillLight.position.set(-2, 1, 2)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(0xffe4e6, 3.5, 4)
    rimLight.position.set(-1, 2.5, -2)
    scene.add(rimLight)

    clock = new THREE.Clock()

    // Load the initial model
    try {
      await loadModel(currentModel())
      triggerGreeting()
    } catch (e) {
      console.error('Initial model load failed:', e)
    }

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (isHidden.value) return // Don't do any WebGL rendering or updates when hidden

      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      if (currentVRM) {
        currentVRM.update(delta)
      }

      // Rotate the global modelGroup (handles drag-to-rotate & mouse tracking Y offset)
      if (modelGroup) {
        const targetRotY = isDragging.value
          ? dragRotationY
          : Math.PI + (mouseX.value * 0.4)

        modelGroup.rotation.y = THREE.MathUtils.lerp(modelGroup.rotation.y, targetRotY, 0.1)
      }

      const activeModel = currentVRM ? currentVRM.scene : currentGLTF
      
      if (activeModel) {
        // Idle floating/breathing applied to local Y translation
        if (!isDragging.value) {
          const breatheY = Math.sin(elapsed * 1.8) * 0.012
          activeModel.position.y = THREE.MathUtils.lerp(activeModel.position.y, breatheY, 0.1)

          // Smoothly rotate skeleton neck and head bones to track cursor
          if (headBone) {
            headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouseX.value * 0.35, 0.1)
            headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -mouseY.value * 0.18, 0.1)
          }
          if (neckBone) {
            neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, mouseX.value * 0.15, 0.1)
          }

          if (currentVRM && currentVRM.expressionManager) {
            const blinkVal = Math.sin(elapsed * 0.5) > 0.98 ? 1.0 : 0.0
            currentVRM.expressionManager.setValue('blink', THREE.MathUtils.lerp(currentVRM.expressionManager.getValue('blink') || 0, blinkVal, 0.25))
          }
        }
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    }

    animate()

    if (containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        if (!renderer || !camera || !containerRef.value) return
        const width = containerRef.value.clientWidth
        const height = containerRef.value.clientHeight
        
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      })
      resizeObserver.observe(containerRef.value)
    }

  } catch (err) {
    console.error('Initialization of Three.js failed:', err)
    errorMessage.value = err.message || String(err)
    isLoading.value = false
    hasError.value = true
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMoveGlobal)
  }
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  if (bubbleTimer) {
    clearTimeout(bubbleTimer)
  }

  if (renderer) {
    renderer.dispose()
  }
  if (scene) {
    scene.traverse((object) => {
      if (!object.isMesh) return
      object.geometry.dispose()
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose())
      } else {
        object.material.dispose()
      }
    })
  }
})
</script>

<template>
  <div class="vrm-widget-wrapper">
    <!-- Transparent Widget Container -->
    <div 
      v-show="!isHidden" 
      class="vrm-container"
      ref="containerRef"
    >
      <!-- Top Action Buttons -->
      <div class="vrm-action-bar">
        <!-- Switch Model Button -->
        <button 
          class="vrm-switch-btn"
          :class="{ 'switching': isSwitching }"
          @click="switchModel" 
          :disabled="isSwitching"
          :title="`Ganti ke ${modelRegistry[(currentModelIndex + 1) % modelRegistry.length].name}`"
        >
          <span class="vrm-switch-icon">🔄</span>
          <span class="vrm-switch-label">{{ modelRegistry[(currentModelIndex + 1) % modelRegistry.length].name }}</span>
        </button>

        <!-- Close Button -->
        <button 
          class="vrm-close-btn" 
          @click="handleClose" 
          :title="`Sembunyikan ${currentModel().name}`"
        >
          &#x2715;
        </button>
      </div>

      <!-- Speech Bubble -->
      <div 
        class="vrm-bubble" 
        :class="{ 'active': bubbleActive }"
      >
        <div class="vrm-bubble-text">{{ bubbleText }}</div>
      </div>

      <!-- Transparent Canvas (only interactive element) -->
      <canvas 
        ref="canvasRef" 
        class="vrm-canvas"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointerleave="isDragging = false"
      ></canvas>

      <!-- Character Name Badge -->
      <div class="vrm-name-badge" v-if="isLoaded && !isLoading">
        <span class="vrm-name-icon">{{ currentModel().icon }}</span>
        <span class="vrm-name-text">{{ currentModel().name }}</span>
      </div>

      <!-- Loader (Centred Card Overlay) -->
      <div v-if="isLoading" class="vrm-loader">
        <div class="vrm-loader-inner">
          <span class="vrm-loader-icon">🪄</span>
          <div class="vrm-loader-text">Loading {{ currentModel().name }}...</div>
          <div class="vrm-progressbar-border">
            <div class="vrm-progressbar-fill" :style="{ width: `${loadingProgress}%` }"></div>
          </div>
          <div class="vrm-loader-percentage">{{ loadingProgress }}%</div>
        </div>
      </div>

      <!-- Loading Error Message -->
      <div v-if="hasError" class="vrm-loader vrm-error">
        <div class="vrm-loader-inner">
          <span class="vrm-loader-icon">❌</span>
          <div class="vrm-loader-text" style="color: var(--primary-color);">Gagal Memuat 3D!</div>
          <div v-if="errorMessage" style="font-size: 0.65rem; color: #555; margin-top: 6px; word-break: break-all; text-transform: none; font-weight: normal; line-height: 1.3;">
            {{ errorMessage }}
          </div>
          <button class="vrm-retry-btn" @click="window.location.reload()">Retry</button>
        </div>
      </div>
    </div>

    <!-- Floating button to restore the widget in Neo-Brutalism style -->
    <div 
      v-if="isHidden" 
      class="vrm-restore-btn" 
      @click="showWidget"
      :title="`Tampilkan ${currentModel().name} 3D`"
    >
      <span class="vrm-restore-icon">🔮</span>
    </div>
  </div>
</template>

<style scoped>
.vrm-widget-wrapper {
  position: fixed;
  bottom: 0;
  right: 20px;
  z-index: 9999;
  font-family: 'Public Sans', sans-serif;
  user-select: none;
  pointer-events: none; /* Let clicks pass through to the website */
}

/* Transparent Canvas Container - no blocking */
.vrm-container {
  position: relative;
  width: 300px;
  height: 500px;
  bottom: -80px; /* Shift down to align feet at bottom of viewport */
  background-color: transparent;
  display: flex;
  flex-direction: column;
  overflow: visible;
  pointer-events: none; /* Let clicks pass through */
}

.vrm-canvas {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent;
  pointer-events: auto; /* Only the canvas captures mouse for drag-to-rotate */
  cursor: grab;
}

.vrm-canvas:active {
  cursor: grabbing;
}

/* ── Top Action Bar ────────────────────────────────────────────────── */
.vrm-action-bar {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10006;
  pointer-events: auto;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.vrm-container:hover .vrm-action-bar {
  opacity: 1;
}

/* ── Switch Model Button ─────────────────────────────────────────── */
.vrm-switch-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: var(--tertiary-color, #f9d423);
  border: 3px solid var(--border-color, #1a1a1a);
  box-shadow: 3px 3px 0 var(--border-color, #1a1a1a);
  color: #1a1a1a;
  font-weight: 800;
  font-size: 0.65rem;
  text-transform: uppercase;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  white-space: nowrap;
  letter-spacing: 0.03em;
}

.vrm-switch-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--border-color, #1a1a1a);
  background-color: var(--secondary-color, #4facfe);
}

.vrm-switch-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--border-color, #1a1a1a);
}

.vrm-switch-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.vrm-switch-icon {
  font-size: 0.85rem;
  display: inline-block;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.vrm-switch-btn.switching .vrm-switch-icon {
  animation: spin-icon 0.7s ease-in-out;
}

@keyframes spin-icon {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.vrm-switch-label {
  line-height: 1;
}

/* ── Character Name Badge ────────────────────────────────────────── */
.vrm-name-badge {
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: var(--card-bg, #fff);
  border: 3px solid var(--border-color, #1a1a1a);
  box-shadow: 3px 3px 0 var(--border-color, #1a1a1a);
  padding: 4px 12px;
  pointer-events: none;
  z-index: 10002;
  animation: badge-appear 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes badge-appear {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(8px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

.vrm-name-icon {
  font-size: 0.9rem;
}

.vrm-name-text {
  font-weight: 800;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #1a1a1a;
}

/* ── Close Button ────────────────────────────────────────────────── */
.vrm-close-btn {
  background-color: var(--card-bg, #fff);
  border: 3px solid var(--border-color, #1a1a1a);
  box-shadow: 3px 3px 0 var(--border-color, #1a1a1a);
  color: #1a1a1a;
  font-weight: bold;
  font-size: 0.7rem;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.vrm-close-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--border-color, #1a1a1a);
  background-color: var(--primary-color, #ff5252);
}

.vrm-close-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--border-color, #1a1a1a);
}

/* Loading Box Overlay (Floating Card) */
.vrm-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 210px;
  background-color: var(--card-bg, #fff);
  border: 4px solid var(--border-color, #1a1a1a);
  box-shadow: 6px 6px 0 var(--border-color, #1a1a1a);
  padding: 16px;
  text-align: center;
  z-index: 10001;
}

.vrm-loader-icon {
  font-size: 1.8rem;
  display: inline-block;
  margin-bottom: 8px;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(15deg); }
}

.vrm-loader-text {
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #1a1a1a;
  text-transform: uppercase;
}

/* Progress bar inside loader */
.vrm-progressbar-border {
  width: 100%;
  height: 12px;
  border: 3px solid var(--border-color, #1a1a1a);
  background-color: #fff;
  margin: 0 auto 6px auto;
  position: relative;
  overflow: hidden;
}

.vrm-progressbar-fill {
  height: 100%;
  background-color: var(--secondary-color, #4facfe);
  transition: width 0.2s ease-out;
}

.vrm-loader-percentage {
  font-weight: 900;
  font-size: 0.75rem;
  color: #1a1a1a;
}

/* Error button styling */
.vrm-retry-btn {
  background-color: var(--tertiary-color, #f9d423);
  border: 3px solid var(--border-color, #1a1a1a);
  padding: 4px 8px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  box-shadow: 2px 2px 0 var(--border-color);
  cursor: pointer;
  margin-top: 8px;
}

.vrm-retry-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--border-color);
}

.vrm-retry-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--border-color);
}

/* Neo-Brutalism Speech Bubble */
.vrm-bubble {
  position: absolute;
  bottom: 100%;
  right: 0px;
  width: 260px;
  background-color: #fff;
  border: 4px solid var(--border-color, #1a1a1a);
  box-shadow: 6px 6px 0 var(--border-color, #1a1a1a);
  padding: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.9) translateY(10px);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
  z-index: 10005;
}

.vrm-bubble.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1) translateY(0);
}

/* Bubble Tail */
.vrm-bubble::after {
  content: '';
  position: absolute;
  bottom: -16px;
  right: 20px;
  border-width: 16px 16px 0 0;
  border-style: solid;
  border-color: var(--border-color, #1a1a1a) transparent;
  display: block;
  width: 0;
}

.vrm-bubble::before {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 22px;
  border-width: 12px 12px 0 0;
  border-style: solid;
  border-color: #fff transparent;
  display: block;
  width: 0;
  z-index: 1;
}

.vrm-bubble-text {
  word-break: break-word;
}

/* Floating Restore Button */
.vrm-restore-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background-color: var(--tertiary-color, #f9d423);
  border: 3px solid var(--border-color, #1a1a1a);
  box-shadow: 4px 4px 0 var(--border-color, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  pointer-events: auto; /* Restore button must be clickable */
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.vrm-restore-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color, #1a1a1a);
  background-color: var(--primary-color, #ff5252);
}

.vrm-restore-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--border-color, #1a1a1a);
}

.vrm-restore-icon {
  font-size: 1.4rem;
}

/* Fully Hide on Mobile Devices <= 768px */
@media (max-width: 768px) {
  .vrm-container {
    display: none !important;
  }
  .vrm-restore-btn {
    display: none !important;
  }
}
</style>
