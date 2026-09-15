<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useHead, useNuxtApp } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { useSiteStore } from '~/stores/site'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js'

const { t, currentLang } = useLanguage()
const store = useSiteStore()

useHead({
  title: `3D Experience | Rizky Mochamad Sidik`,
  meta: [
    { name: 'description', content: 'Explore 3D Littlest Tokyo and dynamic Spotlight Studio with Three.js, PLY meshes, and WebGL.' }
  ]
})

// DOM Elements
const canvasContainer = ref(null)
const canvasRef = ref(null)

// Scene Selection State ('spotlight' | 'tokyo')
const activeScene = ref('spotlight')

// Loading States
const isLoading = ref(true)
const loadingProgress = ref(0)
const loadingStatus = ref('Initializing 3D Engine...')

// Common Interactive State
const isAutoRotate = ref(false)
const autoRotateSpeed = ref(1.5)
const isWireframe = ref(false)
const isGridVisible = ref(false)
const fpsCount = ref(60)

// Tokyo Scene State
const isPlaying = ref(true)
const playbackSpeed = ref(1)
const activeCameraView = ref('isometric')
const activeTheme = ref('day')

// Spotlight Scene State
const spotMapKey = ref('disturb.jpg')
const spotColor = ref('#ffffff')
const spotIntensity = ref(100)
const spotDistance = ref(0)
const spotAngle = ref(0.52) // Math.PI / 6 ~ 0.523 rad
const spotPenumbra = ref(1.0)
const spotDecay = ref(2.0)
const spotFocus = ref(1.0)
const spotShadowIntensity = ref(1.0)
const isSpotHelper = ref(false)
const isSpotSwing = ref(true)
const statueMaterialKey = ref('marble')

// Statue Material Presets
const statueMaterials = {
  marble: { name: 'threed_mat_marble', color: 0xefede8, roughness: 0.3, metalness: 0.05 },
  bronze: { name: 'threed_mat_bronze', color: 0xa67c52, roughness: 0.4, metalness: 0.7 },
  gold: { name: 'threed_mat_gold', color: 0xffd152, roughness: 0.25, metalness: 0.85 },
  obsidian: { name: 'threed_mat_obsidian', color: 0x1e2029, roughness: 0.15, metalness: 0.6 }
}

// Light Color Quick Presets
const colorPresets = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Warm Gold', hex: '#ffeaa7' },
  { name: 'Cyber Cyan', hex: '#00f2fe' },
  { name: 'Neon Pink', hex: '#ff2a85' },
  { name: 'Emerald', hex: '#55efc4' },
  { name: 'Deep Purple', hex: '#a29bfe' }
]

// Three.js instances
let renderer = null
let scene = null
let camera = null
let controls = null
let clock = null
let resizeObserver = null
let animationFrameId = null
let pmremGenerator = null
let gridHelper = null

// Tokyo scene objects
let tokyoGroup = null
let mixer = null
let action = null
let model = null
let dirLight = null
let hemiLight = null
let tokyoEnvTexture = null

// Spotlight scene objects
let spotlightGroup = null
let spotLight = null
let spotLightHelper = null
let spotAmbientLight = null
let lucyMesh = null
let floorMesh = null
let loadedTextures = {}

// Frame counter for FPS HUD
let frameCount = 0
let lastFpsTime = performance.now()

// Camera view presets for Tokyo
const cameraPresets = {
  isometric: { pos: [5, 2, 8], target: [0, 0.5, 0] },
  street: { pos: [0.5, 0.8, 3.2], target: [0, 0.6, 0] },
  roof: { pos: [-1.8, 2.5, 2.5], target: [-0.2, 1.2, 0] },
  top: { pos: [0.1, 7.5, 1.5], target: [0, 0.5, 0] }
}

// Camera presets for Spotlight Studio
const spotlightCamPresets = {
  hero: { pos: [3.6, 1.6, 3.6], target: [0, 0.2, 0] },
  front: { pos: [0, 1.2, 4.2], target: [0, 0.2, 0] },
  dramatic: { pos: [-2.8, 0.3, 2.8], target: [0, 0.3, 0] },
  topdown: { pos: [0.1, 5.2, 1.2], target: [0, 0.1, 0] }
}
const activeSpotCameraView = ref('hero')

// Lighting Presets for Tokyo
const themePresets = {
  day: {
    bg: 0xbfe3dd,
    envIntensity: 0.04,
    hemiSky: 0xffffff,
    hemiGround: 0x444444,
    dirColor: 0xffffff,
    dirIntensity: 1.2
  },
  sunset: {
    bg: 0xf5a25d,
    envIntensity: 0.06,
    hemiSky: 0xffa07a,
    hemiGround: 0x331a00,
    dirColor: 0xff7043,
    dirIntensity: 1.5
  },
  night: {
    bg: 0x0d1117,
    envIntensity: 0.02,
    hemiSky: 0x38ef7d,
    hemiGround: 0x11998e,
    dirColor: 0x00f2fe,
    dirIntensity: 1.8
  },
  studio: {
    bg: 0x222222,
    envIntensity: 0.05,
    hemiSky: 0xcccccc,
    hemiGround: 0x111111,
    dirColor: 0xffffff,
    dirIntensity: 1.0
  }
}

// Initialize Three.js Scene
const initThree = () => {
  if (!canvasContainer.value || !canvasRef.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight || 580

  // 1. Clock
  clock = new THREE.Clock()

  // 2. Renderer with Shadow Map support
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // 3. Scene & Groups
  scene = new THREE.Scene()
  tokyoGroup = new THREE.Group()
  spotlightGroup = new THREE.Group()
  scene.add(tokyoGroup)
  scene.add(spotlightGroup)

  pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()
  tokyoEnvTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

  // 4. Camera & OrbitControls
  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.maxPolarAngle = Math.PI / 2 + 0.05
  controls.minDistance = 1.2
  controls.maxDistance = 25
  controls.enableZoom = false // Scroll naturally
  controls.autoRotate = false
  controls.autoRotateSpeed = autoRotateSpeed.value

  // 5. Grid Helper
  gridHelper = new THREE.GridHelper(12, 24, 0xff5252, 0x444444)
  gridHelper.position.y = -1.0
  gridHelper.visible = false
  scene.add(gridHelper)

  // 6. Setup Tokyo Group
  setupTokyoScene()

  // 7. Setup Spotlight Group & Textures
  setupSpotlightScene()

  // 8. Apply Initial Scene State
  applySceneConfiguration(activeScene.value, true)

  // 9. Resize Observer
  resizeObserver = new ResizeObserver(() => {
    handleResize()
  })
  resizeObserver.observe(canvasContainer.value)

  // 10. Start Animation Loop
  animate()
}

// Setup Tokyo Scene Components
const setupTokyoScene = () => {
  hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0)
  hemiLight.position.set(0, 20, 0)
  tokyoGroup.add(hemiLight)

  dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(5, 10, 7)
  tokyoGroup.add(dirLight)

  // Load Draco Tokyo model
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/gltf/')

  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)

  loadingStatus.value = 'Downloading Littlest Tokyo GLB...'
  gltfLoader.load(
    '/models/LittlestTokyo.glb',
    (gltf) => {
      model = gltf.scene
      model.position.set(1, 0, 0)
      model.scale.set(0.01, 0.01, 0.01)
      tokyoGroup.add(model)

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model)
        action = mixer.clipAction(gltf.animations[0])
        action.play()
      }

      dracoLoader.dispose()
      checkAllLoaded()
    },
    (xhr) => {
      if (xhr.total > 0) {
        const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 99)
        loadingProgress.value = percent
      }
    },
    (err) => {
      console.warn('Error loading LittlestTokyo.glb:', err)
      checkAllLoaded()
    }
  )
}

// Setup Spotlight Scene Components (Three.js spotlight example with Lucy100k)
const setupSpotlightScene = () => {
  // Load Projector Textures
  const textureLoader = new THREE.TextureLoader()
  
  const disturbTex = textureLoader.load('/textures/disturb.jpg')
  disturbTex.minFilter = THREE.LinearFilter
  disturbTex.magFilter = THREE.LinearFilter
  disturbTex.colorSpace = THREE.SRGBColorSpace
  loadedTextures['disturb.jpg'] = disturbTex

  const colorsTex = textureLoader.load('/textures/colors.png')
  colorsTex.minFilter = THREE.LinearFilter
  colorsTex.magFilter = THREE.LinearFilter
  colorsTex.colorSpace = THREE.SRGBColorSpace
  loadedTextures['colors.png'] = colorsTex

  const gridTex = textureLoader.load('/textures/uv_grid_opengl.jpg')
  gridTex.minFilter = THREE.LinearFilter
  gridTex.magFilter = THREE.LinearFilter
  gridTex.colorSpace = THREE.SRGBColorSpace
  loadedTextures['uv_grid_opengl.jpg'] = gridTex

  // Subtle Ambient Light for dramatic studio contrast
  spotAmbientLight = new THREE.AmbientLight(0x1a1a24, 0.25)
  spotlightGroup.add(spotAmbientLight)

  // Spotlight Projector Light
  spotLight = new THREE.SpotLight(0xffffff, spotIntensity.value)
  spotLight.position.set(2.5, 5.0, 2.5)
  spotLight.angle = spotAngle.value
  spotLight.penumbra = spotPenumbra.value
  spotLight.decay = spotDecay.value
  spotLight.distance = spotDistance.value
  spotLight.map = loadedTextures['disturb.jpg']
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 2048
  spotLight.shadow.mapSize.height = 2048
  spotLight.shadow.camera.near = 1
  spotLight.shadow.camera.far = 12
  spotLight.shadow.focus = spotFocus.value
  spotLight.shadow.bias = -0.002
  spotLight.shadow.intensity = spotShadowIntensity.value
  spotlightGroup.add(spotLight)

  // Target for Spotlight
  const lightTarget = new THREE.Object3D()
  lightTarget.position.set(0, 0.2, 0)
  spotlightGroup.add(lightTarget)
  spotLight.target = lightTarget

  // Spotlight Helper Visualizer Cone
  spotLightHelper = new THREE.SpotLightHelper(spotLight, 0x00f2fe)
  spotLightHelper.visible = isSpotHelper.value
  spotlightGroup.add(spotLightHelper)

  // Studio Ground Floor Plane
  const floorGeo = new THREE.PlaneGeometry(16, 16)
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x3a3d45,
    roughness: 0.7,
    metalness: 0.2
  })
  floorMesh = new THREE.Mesh(floorGeo, floorMat)
  floorMesh.rotation.x = -Math.PI * 0.5
  floorMesh.position.y = -1.0
  floorMesh.receiveShadow = true
  spotlightGroup.add(floorMesh)

  // Load Lucy100k PLY Model
  loadingStatus.value = 'Loading Lucy Angel 3D Statue...'
  const plyLoader = new PLYLoader()
  plyLoader.load(
    '/models/ply/Lucy100k.ply',
    (geometry) => {
      geometry.scale(0.0024, 0.0024, 0.0024)
      geometry.center()
      geometry.computeVertexNormals()
      geometry.computeBoundingBox()

      const statueHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y
      const floorY = floorMesh ? floorMesh.position.y : -1.0

      const matConfig = statueMaterials[statueMaterialKey.value]
      const material = new THREE.MeshStandardMaterial({
        color: matConfig.color,
        roughness: matConfig.roughness,
        metalness: matConfig.metalness
      })

      lucyMesh = new THREE.Mesh(geometry, material)
      // Exactly align bottom of statue with the top of the floor plane so it never clips or sinks
      lucyMesh.position.set(0, floorY + statueHeight / 2, 0)
      lucyMesh.castShadow = true
      lucyMesh.receiveShadow = true
      spotlightGroup.add(lucyMesh)

      // Aim spotlight target and camera focus directly at statue's chest
      lightTarget.position.set(0, floorY + statueHeight * 0.45, 0)
      if (controls && activeScene.value === 'spotlight') {
        controls.target.set(0, floorY + statueHeight * 0.45, 0)
        controls.update()
      }

      checkAllLoaded()
    },
    (xhr) => {
      if (xhr.total > 0) {
        const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 99)
        loadingProgress.value = percent
      }
    },
    (err) => {
      console.warn('Error loading Lucy100k.ply:', err)
      checkAllLoaded()
    }
  )
}

const checkAllLoaded = () => {
  isLoading.value = false
  loadingProgress.value = 100
}

// Scene State Switching Engine
const applySceneConfiguration = (sceneKey, isInitial = false) => {
  if (!scene || !camera || !controls) return

  if (sceneKey === 'spotlight') {
    tokyoGroup.visible = false
    spotlightGroup.visible = true
    scene.environment = null
    scene.background = new THREE.Color(0x0a0a0e)

    if (gridHelper) gridHelper.position.y = -1.0

    const camPreset = spotlightCamPresets[activeSpotCameraView.value] || spotlightCamPresets.hero
    if (isInitial) {
      camera.position.set(...camPreset.pos)
      controls.target.set(...camPreset.target)
      controls.update()
    } else {
      transitionCameraTo(camPreset.pos, camPreset.target)
    }
  } else {
    tokyoGroup.visible = true
    spotlightGroup.visible = false
    scene.background = new THREE.Color(themePresets[activeTheme.value].bg)
    if (pmremGenerator && tokyoEnvTexture) {
      scene.environment = tokyoEnvTexture
    }

    if (gridHelper) gridHelper.position.y = -0.01

    const camPreset = cameraPresets[activeCameraView.value] || cameraPresets.isometric
    if (isInitial) {
      camera.position.set(...camPreset.pos)
      controls.target.set(...camPreset.target)
      controls.update()
    } else {
      transitionCameraTo(camPreset.pos, camPreset.target)
    }
  }
}

const switchScene = (sceneKey) => {
  if (activeScene.value === sceneKey) return
  activeScene.value = sceneKey
  applySceneConfiguration(sceneKey)
}

// Smooth Camera Transition Helper
const transitionCameraTo = (targetPosArr, targetLookAtArr) => {
  if (!camera || !controls) return

  const startPos = camera.position.clone()
  const targetPos = new THREE.Vector3(...targetPosArr)
  const startTarget = controls.target.clone()
  const endTarget = new THREE.Vector3(...targetLookAtArr)

  let startTime = null
  const duration = 650

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 0.5 - Math.cos(progress * Math.PI) / 2

    camera.position.lerpVectors(startPos, targetPos, ease)
    controls.target.lerpVectors(startTarget, endTarget, ease)
    controls.update()

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}

// Spotlight Interactive Handlers
const setSpotMap = (key) => {
  spotMapKey.value = key
  if (!spotLight) return

  if (key === 'none') {
    spotLight.map = null
  } else if (loadedTextures[key]) {
    spotLight.map = loadedTextures[key]
  }
  spotLight.needsUpdate = true
}

const setSpotColor = (hex) => {
  spotColor.value = hex
  if (spotLight) {
    spotLight.color.set(hex)
  }
}

const updateSpotlightValues = () => {
  if (!spotLight) return
  spotLight.intensity = Number(spotIntensity.value)
  spotLight.angle = Number(spotAngle.value)
  spotLight.penumbra = Number(spotPenumbra.value)
  spotLight.decay = Number(spotDecay.value)
  spotLight.distance = Number(spotDistance.value)
  spotLight.shadow.focus = Number(spotFocus.value)
  spotLight.shadow.intensity = Number(spotShadowIntensity.value)
}

const toggleSpotHelper = () => {
  isSpotHelper.value = !isSpotHelper.value
  if (spotLightHelper) {
    spotLightHelper.visible = isSpotHelper.value
  }
}

const toggleSpotSwing = () => {
  isSpotSwing.value = !isSpotSwing.value
  if (!isSpotSwing.value && spotLight) {
    // Reset to static dynamic angle
    spotLight.position.set(2.5, 5.0, 2.5)
  }
}

const setStatueMaterial = (matKey) => {
  statueMaterialKey.value = matKey
  if (!lucyMesh || !statueMaterials[matKey]) return

  const config = statueMaterials[matKey]
  lucyMesh.material.color.setHex(config.color)
  lucyMesh.material.roughness = config.roughness
  lucyMesh.material.metalness = config.metalness
  lucyMesh.material.needsUpdate = true
}

const setSpotCameraView = (viewKey) => {
  activeSpotCameraView.value = viewKey
  const preset = spotlightCamPresets[viewKey]
  if (preset) {
    transitionCameraTo(preset.pos, preset.target)
  }
}

// Tokyo Scene Handlers
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const setSpeed = (speed) => {
  playbackSpeed.value = speed
}

const setTokyoCameraView = (viewKey) => {
  activeCameraView.value = viewKey
  const preset = cameraPresets[viewKey]
  if (preset) {
    transitionCameraTo(preset.pos, preset.target)
  }
}

const setTheme = (themeKey) => {
  activeTheme.value = themeKey
  const theme = themePresets[themeKey]
  if (!theme || !scene || activeScene.value !== 'tokyo') return

  scene.background = new THREE.Color(theme.bg)

  if (pmremGenerator) {
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), theme.envIntensity).texture
  }

  if (hemiLight) {
    hemiLight.color.setHex(theme.hemiSky)
    hemiLight.groundColor.setHex(theme.hemiGround)
  }

  if (dirLight) {
    dirLight.color.setHex(theme.dirColor)
    dirLight.intensity = theme.dirIntensity
  }
}

// Global Controls
const toggleAutoRotate = () => {
  isAutoRotate.value = !isAutoRotate.value
  if (controls) {
    controls.autoRotate = isAutoRotate.value
    controls.autoRotateSpeed = autoRotateSpeed.value
  }
}

const toggleWireframe = () => {
  isWireframe.value = !isWireframe.value
  
  if (activeScene.value === 'spotlight' && lucyMesh) {
    lucyMesh.material.wireframe = isWireframe.value
  } else if (model) {
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => (mat.wireframe = isWireframe.value))
        } else {
          child.material.wireframe = isWireframe.value
        }
      }
    })
  }
}

const toggleGrid = () => {
  isGridVisible.value = !isGridVisible.value
  if (gridHelper) {
    gridHelper.visible = isGridVisible.value
  }
}

const resetCamera = () => {
  if (activeScene.value === 'spotlight') {
    setSpotCameraView('hero')
  } else {
    setTokyoCameraView('isometric')
  }
}

const toggleFullscreen = () => {
  if (!canvasContainer.value) return
  if (!document.fullscreenElement) {
    canvasContainer.value.requestFullscreen().catch((err) => {
      console.error('Error attempting fullscreen:', err)
    })
  } else {
    document.exitFullscreen()
  }
}

const captureScreenshot = () => {
  if (!renderer || !canvasRef.value) return
  const dataURL = canvasRef.value.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = `3d-${activeScene.value}-${Date.now()}.png`
  link.href = dataURL
  link.click()
}

// Zoom Helpers
const zoomByFactor = (factor) => {
  if (!camera || !controls) return
  const offset = new THREE.Vector3().subVectors(camera.position, controls.target)
  const dist = offset.length()
  const newDist = Math.max(controls.minDistance, Math.min(controls.maxDistance, dist * factor))
  offset.setLength(newDist)
  camera.position.copy(controls.target).add(offset)
  controls.update()
}

const zoomIn = () => zoomByFactor(0.82)
const zoomOut = () => zoomByFactor(1.22)

const nuxtApp = useNuxtApp()
const handleWheel = (e) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 1.08 : 0.92
    zoomByFactor(factor)
  } else {
    if (nuxtApp?.$lenis) {
      const currentScroll = window.scrollY || window.pageYOffset || 0
      nuxtApp.$lenis.scrollTo(currentScroll + e.deltaY * 1.5, { immediate: false })
    } else {
      window.scrollBy({ top: e.deltaY, behavior: 'auto' })
    }
  }
}

// Animation Loop
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  const delta = clock ? clock.getDelta() : 0.016

  // Tokyo Animation
  if (activeScene.value === 'tokyo' && mixer && isPlaying.value) {
    mixer.update(delta * playbackSpeed.value)
  }

  // Spotlight Motion & Helper Update
  if (activeScene.value === 'spotlight') {
    if (isSpotSwing.value && spotLight) {
      const time = clock ? clock.getElapsedTime() * 0.75 : 0
      spotLight.position.x = Math.cos(time) * 3.0
      spotLight.position.z = Math.sin(time) * 3.0
    }
    if (spotLightHelper && isSpotHelper.value) {
      spotLightHelper.update()
    }
  }

  if (controls) {
    controls.update()
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }

  // Calculate FPS
  frameCount++
  const now = performance.now()
  if (now - lastFpsTime >= 500) {
    fpsCount.value = Math.round((frameCount * 1000) / (now - lastFpsTime))
    frameCount = 0
    lastFpsTime = now
  }
}

// Handle Window Resize
const handleResize = () => {
  if (!canvasContainer.value || !renderer || !camera) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight || 580

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

onMounted(() => {
  initThree()
  if (canvasContainer.value) {
    canvasContainer.value.addEventListener('wheel', handleWheel, { passive: false })
  }
})

onUnmounted(() => {
  if (canvasContainer.value) {
    canvasContainer.value.removeEventListener('wheel', handleWheel)
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (renderer) {
    renderer.dispose()
  }
  if (controls) {
    controls.dispose()
  }
  if (pmremGenerator) {
    pmremGenerator.dispose()
  }
})
</script>

<template>
  <div class="threed-page-wrapper">
    <!-- Hero Header Section -->
    <section class="threed-hero" v-reveal="'slide-up'">
      <div class="hero-badge">
        <span class="badge-dot"></span> THREE.JS &amp; WEBGL ENGINE
      </div>
      <h1 class="threed-title">
        <template v-if="currentLang === 'id'">
          DUNIA <span class="highlight">3D INTERAKTIF</span>
        </template>
        <template v-else-if="currentLang === 'zh'">
          3D <span class="highlight">关键帧与聚光灯</span>
        </template>
        <template v-else-if="currentLang === 'ja'">
          3D <span class="highlight">キーフレーム＆スポットライト</span>
        </template>
        <template v-else>
          3D <span class="highlight">KEYFRAME &amp; SPOTLIGHT</span>
        </template>
      </h1>
      <p class="threed-subtitle">{{ t('threed_desc') }}</p>

      <!-- Tech Feature Badges -->
      <div class="tags-container">
        <span class="neo-tag">⚡ Three.js v0.184</span>
        <span class="neo-tag">💡 Textured SpotLight</span>
        <span class="neo-tag">🌑 PCF Soft Shadows</span>
        <span class="neo-tag">🗿 PLY Mesh (Lucy)</span>
        <span class="neo-tag">🎮 Draco Compressed GLB</span>
        <span class="neo-tag">🕹️ OrbitControls</span>
      </div>
    </section>

    <!-- Main 3D Showcase Container -->
    <section class="showcase-section" v-reveal="'slide-up'">
      <!-- Scene Selection Switcher Tabs -->
      <div class="scene-switcher-bar">
        <div class="scene-switcher-label">
          <span class="scene-icon">🧭</span>
          <strong>{{ t('threed_scene_select') }}:</strong>
        </div>
        <div class="scene-tabs">
          <button 
            class="scene-tab-btn" 
            :class="{ active: activeScene === 'spotlight' }"
            @click="switchScene('spotlight')"
          >
            <span class="tab-dot"></span>
            💡 {{ t('threed_scene_spotlight') }}
          </button>
          <button 
            class="scene-tab-btn" 
            :class="{ active: activeScene === 'tokyo' }"
            @click="switchScene('tokyo')"
          >
            <span class="tab-dot"></span>
            🏙️ {{ t('threed_scene_tokyo') }}
          </button>
        </div>
      </div>

      <!-- Canvas Box with Neo-Brutalist Frame -->
      <div class="canvas-card" ref="canvasContainer">
        <!-- Floating HUD Overlay -->
        <div class="hud-bar top-hud">
          <div class="hud-chip">
            <span class="hud-dot"></span>
            <strong>FPS:</strong> {{ fpsCount }}
          </div>
          <div class="hud-chip hide-mobile">
            <strong>Scene:</strong> {{ activeScene === 'spotlight' ? 'Spotlight Studio 💡' : 'Littlest Tokyo 🏙️' }}
          </div>
          <div class="hud-chip hide-mobile" v-if="activeScene === 'spotlight'">
            <strong>Map:</strong> {{ spotMapKey }}
          </div>
          <div class="hud-chip hide-mobile" v-else>
            <strong>Speed:</strong> {{ playbackSpeed }}x
          </div>

          <div class="hud-actions">
            <!-- Zoom In Button -->
            <button class="hud-btn" @click="zoomIn" title="Zoom In (+)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <!-- Zoom Out Button -->
            <button class="hud-btn" @click="zoomOut" title="Zoom Out (-)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <!-- Screenshot Button -->
            <button class="hud-btn" @click="captureScreenshot" :title="t('threed_screenshot')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </button>
            <!-- Fullscreen Button -->
            <button class="hud-btn" @click="toggleFullscreen" :title="t('threed_fullscreen')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Gesture Guide Overlay on Bottom-Left -->
        <div class="hud-bar bottom-hud hide-mobile">
          <div class="hud-hint">
            <span>🖱️ {{ t('threed_guide_rotate') }}</span>
            <span>•</span>
            <span>🔍 {{ t('threed_guide_zoom') }}</span>
            <span>•</span>
            <span>🖐️ {{ t('threed_guide_pan') }}</span>
          </div>
        </div>

        <!-- Loading Screen -->
        <div v-if="isLoading" class="loading-overlay">
          <div class="loading-modal">
            <div class="loading-spinner"></div>
            <h3 class="loading-title">{{ t('threed_loading') }}</h3>
            <p class="loading-status-text">{{ loadingStatus }}</p>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: `${loadingProgress}%` }"></div>
            </div>
            <span class="progress-num">{{ loadingProgress }}%</span>
          </div>
        </div>

        <!-- Three.js Canvas Element -->
        <canvas ref="canvasRef" class="webgl-canvas"></canvas>
      </div>

      <!-- SPOTLIGHT STUDIO CONTROLS (Active when Scene === 'spotlight') -->
      <div v-if="activeScene === 'spotlight'" class="controls-container">
        <!-- 1. Texture Map Projector Group -->
        <div class="control-group-card">
          <div class="group-header">
            <span class="group-icon">🖼️</span>
            <h3>{{ t('threed_spot_map') }}</h3>
          </div>
          <div class="group-body">
            <div class="map-grid">
              <button 
                class="map-chip" 
                :class="{ active: spotMapKey === 'disturb.jpg' }"
                @click="setSpotMap('disturb.jpg')"
              >
                <span class="map-preview disturb-preview"></span>
                <span>{{ t('threed_spot_map_disturb') }}</span>
              </button>
              <button 
                class="map-chip" 
                :class="{ active: spotMapKey === 'colors.png' }"
                @click="setSpotMap('colors.png')"
              >
                <span class="map-preview colors-preview"></span>
                <span>{{ t('threed_spot_map_colors') }}</span>
              </button>
              <button 
                class="map-chip" 
                :class="{ active: spotMapKey === 'uv_grid_opengl.jpg' }"
                @click="setSpotMap('uv_grid_opengl.jpg')"
              >
                <span class="map-preview grid-preview"></span>
                <span>{{ t('threed_spot_map_grid') }}</span>
              </button>
              <button 
                class="map-chip" 
                :class="{ active: spotMapKey === 'none' }"
                @click="setSpotMap('none')"
              >
                <span class="map-preview none-preview"></span>
                <span>{{ t('threed_spot_map_none') }}</span>
              </button>
            </div>

            <!-- Statue Material Preset -->
            <div class="statue-mat-section">
              <label class="control-label">{{ t('threed_statue_mat') }}:</label>
              <div class="mat-chips-grid">
                <button 
                  v-for="(config, key) in statueMaterials" 
                  :key="key"
                  class="chip-btn"
                  :class="{ active: statueMaterialKey === key }"
                  @click="setStatueMaterial(key)"
                >
                  {{ t(config.name) }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Spotlight Color & Beam Adjustments Group -->
        <div class="control-group-card">
          <div class="group-header">
            <span class="group-icon">💡</span>
            <h3>{{ t('threed_spot_controls') }}</h3>
          </div>
          <div class="group-body">
            <!-- Color Presets -->
            <div class="color-preset-section">
              <div class="color-label-row">
                <label class="control-label">{{ t('threed_spot_color') }}:</label>
                <div class="color-picker-wrapper">
                  <input 
                    type="color" 
                    v-model="spotColor" 
                    @input="setSpotColor(spotColor)" 
                    class="neo-color-input"
                    title="Choose custom color"
                  />
                  <span class="color-hex-badge">{{ spotColor }}</span>
                </div>
              </div>
              <div class="color-chips-grid">
                <button 
                  v-for="preset in colorPresets" 
                  :key="preset.hex"
                  class="color-dot-btn"
                  :style="{ backgroundColor: preset.hex }"
                  :class="{ active: spotColor.toLowerCase() === preset.hex.toLowerCase() }"
                  @click="setSpotColor(preset.hex)"
                  :title="preset.name"
                ></button>
              </div>
            </div>

            <!-- Sliders for Angle, Penumbra, Intensity -->
            <div class="slider-group">
              <div class="slider-row">
                <div class="slider-header">
                  <span>{{ t('threed_spot_intensity') }}</span>
                  <span class="slider-val">{{ spotIntensity }}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="300" 
                  step="5" 
                  v-model.number="spotIntensity" 
                  @input="updateSpotlightValues"
                  class="neo-slider" 
                />
              </div>

              <div class="slider-row">
                <div class="slider-header">
                  <span>{{ t('threed_spot_angle') }}</span>
                  <span class="slider-val">{{ (spotAngle * 180 / Math.PI).toFixed(0) }}°</span>
                </div>
                <input 
                  type="range" 
                  min="0.15" 
                  max="1.05" 
                  step="0.01" 
                  v-model.number="spotAngle" 
                  @input="updateSpotlightValues"
                  class="neo-slider" 
                />
              </div>

              <div class="slider-row">
                <div class="slider-header">
                  <span>{{ t('threed_spot_penumbra') }}</span>
                  <span class="slider-val">{{ spotPenumbra.toFixed(2) }}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  v-model.number="spotPenumbra" 
                  @input="updateSpotlightValues"
                  class="neo-slider" 
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Spotlight Camera & Motion Group -->
        <div class="control-group-card">
          <div class="group-header">
            <span class="group-icon">🎬</span>
            <h3>{{ t('threed_camera') }} &amp; FX</h3>
          </div>
          <div class="group-body">
            <div class="camera-btn-grid">
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeSpotCameraView === 'hero' }"
                @click="setSpotCameraView('hero')"
              >
                📐 Hero Angle
              </button>
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeSpotCameraView === 'front' }"
                @click="setSpotCameraView('front')"
              >
                🗿 Front View
              </button>
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeSpotCameraView === 'dramatic' }"
                @click="setSpotCameraView('dramatic')"
              >
                ⚡ Low Dramatic
              </button>
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeSpotCameraView === 'topdown' }"
                @click="setSpotCameraView('topdown')"
              >
                🦅 Top Down
              </button>
            </div>

            <div class="toggles-row">
              <button 
                class="toggle-chip" 
                :class="{ active: isSpotSwing }"
                @click="toggleSpotSwing"
              >
                💫 {{ t('threed_spot_swing') }}
              </button>
              <button 
                class="toggle-chip" 
                :class="{ active: isSpotHelper }"
                @click="toggleSpotHelper"
              >
                🔦 {{ t('threed_spot_helper') }}
              </button>
              <button 
                class="toggle-chip" 
                :class="{ active: isAutoRotate }"
                @click="toggleAutoRotate"
              >
                🔄 {{ t('threed_auto_rotate') }}
              </button>
              <button 
                class="toggle-chip" 
                :class="{ active: isWireframe }"
                @click="toggleWireframe"
              >
                🕸️ {{ t('threed_wireframe') }}
              </button>
              <button 
                class="toggle-chip" 
                :class="{ active: isGridVisible }"
                @click="toggleGrid"
              >
                📏 {{ t('threed_grid') }}
              </button>
            </div>

            <div class="btn-grid-row">
              <button class="neo-btn btn-sm btn-outline" @click="resetCamera">
                🔄 {{ t('threed_reset') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- LITTLEST TOKYO CONTROLS (Active when Scene === 'tokyo') -->
      <div v-else class="controls-container">
        <!-- Animation & Playback Control Group -->
        <div class="control-group-card">
          <div class="group-header">
            <span class="group-icon">🎬</span>
            <h3>{{ t('threed_anim') }}</h3>
          </div>
          <div class="group-body">
            <div class="btn-grid-row">
              <button 
                class="neo-btn" 
                :class="{ 'btn-active-green': isPlaying, 'btn-idle': !isPlaying }" 
                @click="togglePlay"
              >
                <span v-if="isPlaying">⏸️ {{ t('threed_pause') }}</span>
                <span v-else>▶️ {{ t('threed_play') }}</span>
              </button>
            </div>

            <div class="speed-selector">
              <label class="control-label">{{ t('threed_speed') }}:</label>
              <div class="speed-chips">
                <button 
                  v-for="s in [0.5, 1.0, 1.5, 2.0]" 
                  :key="s" 
                  class="chip-btn" 
                  :class="{ active: playbackSpeed === s }"
                  @click="setSpeed(s)"
                >
                  {{ s }}x
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Camera Views Control Group -->
        <div class="control-group-card">
          <div class="group-header">
            <span class="group-icon">📷</span>
            <h3>{{ t('threed_camera') }}</h3>
          </div>
          <div class="group-body">
            <div class="camera-btn-grid">
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeCameraView === 'isometric' }"
                @click="setTokyoCameraView('isometric')"
              >
                📐 {{ t('threed_cam_iso') }}
              </button>
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeCameraView === 'street' }"
                @click="setTokyoCameraView('street')"
              >
                🚎 {{ t('threed_cam_street') }}
              </button>
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeCameraView === 'roof' }"
                @click="setTokyoCameraView('roof')"
              >
                ☕ {{ t('threed_cam_roof') }}
              </button>
              <button 
                class="neo-btn btn-sm" 
                :class="{ 'btn-active-yellow': activeCameraView === 'top' }"
                @click="setTokyoCameraView('top')"
              >
                🦅 {{ t('threed_cam_top') }}
              </button>
            </div>

            <div class="btn-grid-row" style="margin-top: 10px;">
              <button class="neo-btn btn-sm btn-outline" @click="resetCamera">
                🔄 {{ t('threed_reset') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Lighting & Atmosphere Themes Control Group -->
        <div class="control-group-card">
          <div class="group-header">
            <span class="group-icon">🎨</span>
            <h3>{{ t('threed_theme') }}</h3>
          </div>
          <div class="group-body">
            <div class="theme-btn-grid">
              <button 
                class="theme-chip" 
                :class="{ active: activeTheme === 'day' }"
                @click="setTheme('day')"
              >
                <span class="theme-color-dot" style="background: #bfe3dd;"></span>
                {{ t('threed_theme_day') }}
              </button>
              <button 
                class="theme-chip" 
                :class="{ active: activeTheme === 'sunset' }"
                @click="setTheme('sunset')"
              >
                <span class="theme-color-dot" style="background: #f5a25d;"></span>
                {{ t('threed_theme_sunset') }}
              </button>
              <button 
                class="theme-chip" 
                :class="{ active: activeTheme === 'night' }"
                @click="setTheme('night')"
              >
                <span class="theme-color-dot" style="background: #0d1117;"></span>
                {{ t('threed_theme_night') }}
              </button>
              <button 
                class="theme-chip" 
                :class="{ active: activeTheme === 'studio' }"
                @click="setTheme('studio')"
              >
                <span class="theme-color-dot" style="background: #222222;"></span>
                {{ t('threed_theme_studio') }}
              </button>
            </div>

            <div class="toggles-row">
              <button 
                class="toggle-chip" 
                :class="{ active: isAutoRotate }"
                @click="toggleAutoRotate"
              >
                🔄 {{ t('threed_auto_rotate') }}
              </button>
              <button 
                class="toggle-chip" 
                :class="{ active: isWireframe }"
                @click="toggleWireframe"
              >
                🕸️ {{ t('threed_wireframe') }}
              </button>
              <button 
                class="toggle-chip" 
                :class="{ active: isGridVisible }"
                @click="toggleGrid"
              >
                📏 {{ t('threed_grid') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Information & Credits Card -->
      <div class="info-credits-card" v-reveal="'slide-up'">
        <div class="info-header">
          <div class="info-title">
            <span class="info-icon">ℹ️</span>
            <h4>Model &amp; Tech Attribution</h4>
          </div>
          <div class="badge-license">Open Source &amp; CC License</div>
        </div>
        
        <div v-if="activeScene === 'spotlight'" class="info-desc">
          <p>
            <strong>Scene:</strong> Three.js Spotlight Projector &amp; Dynamic Shadow Mapping (<code>webgl_lights_spotlight</code>).
          </p>
          <p style="margin-top: 6px;">
            <strong>3D Model:</strong> <em>Lucy Angel Statue (100k polygon PLY mesh)</em> courtesy of the 
            <a href="https://graphics.stanford.edu/data/3Dscanrep/" target="_blank" rel="noopener" class="info-link">Stanford 3D Scanning Repository</a>.
            Demonstrates real-time textured spotlights, penumbra attenuation, and soft shadow mapping with Three.js.
          </p>
        </div>
        <div v-else class="info-desc">
          <p>
            3D Scene: <strong>Littlest Tokyo</strong> by 
            <a href="https://artstation.com/glenatron" target="_blank" rel="noopener" class="info-link">Glen Fox</a> 
            (available on ArtStation &amp; Sketchfab). 
            Demonstrates WebGL Keyframe Animation with Three.js engine, Draco 3D mesh compression, and RoomEnvironment IBL.
          </p>
        </div>

        <div class="credits-footer">
          <a 
            v-if="activeScene === 'spotlight'"
            href="https://threejs.org/examples/#webgl_lights_spotlight" 
            target="_blank" 
            rel="noopener" 
            class="neo-btn btn-sm btn-outline"
          >
            🌐 Three.js Official Spotlight Example &rarr;
          </a>
          <a 
            v-else
            href="https://threejs.org/examples/#webgl_animation_keyframes" 
            target="_blank" 
            rel="noopener" 
            class="neo-btn btn-sm btn-outline"
          >
            🌐 Three.js Official Tokyo Example &rarr;
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.threed-page-wrapper {
  min-height: 100vh;
  padding: 40px 5% 80px 5%;
  background-color: var(--bg-color);
  background-image: linear-gradient(var(--border-color) 2px, transparent 2px), linear-gradient(90deg, var(--border-color) 2px, transparent 2px);
  background-size: 50px 50px;
}

/* Hero Header */
.threed-hero {
  max-width: 900px;
  margin: 20px auto 35px auto;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--tertiary-color);
  color: #1a1a1a;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  padding: 6px 14px;
  font-size: 0.85rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff5252;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.9); opacity: 0.7; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.7; }
}

.threed-title {
  font-size: 3.2rem;
  font-weight: 900;
  background: var(--card-bg);
  color: var(--text-color);
  padding: 16px 28px;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  display: inline-block;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.threed-subtitle {
  font-size: 1.15rem;
  font-weight: 700;
  background: var(--card-bg);
  color: var(--text-color);
  padding: 12px 24px;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  display: inline-block;
  margin-bottom: 25px;
  max-width: 800px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.neo-tag {
  background: var(--card-bg);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  box-shadow: 3px 3px 0 var(--border-color);
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 800;
}

/* Showcase Section */
.showcase-section {
  max-width: 1280px;
  margin: 0 auto;
}

/* Scene Switcher Bar */
.scene-switcher-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 6px 6px 0 var(--border-color);
  padding: 12px 18px;
  margin-bottom: 20px;
}

.scene-switcher-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--text-color);
}

.scene-icon {
  font-size: 1.2rem;
}

.scene-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.scene-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-color);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  box-shadow: 3px 3px 0 var(--border-color);
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.scene-tab-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--border-color);
}

.scene-tab-btn.active {
  background: var(--secondary-color);
  color: #fff;
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
}

.tab-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #888;
}

.scene-tab-btn.active .tab-dot {
  background: #00e676;
  box-shadow: 0 0 6px #00e676;
}

/* Canvas Card */
.canvas-card {
  position: relative;
  width: 100%;
  height: 620px;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 12px 12px 0 var(--border-color);
  background: #0a0a0e;
  overflow: hidden;
  margin-bottom: 25px;
}

.webgl-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
}

.webgl-canvas:active {
  cursor: grabbing;
}

/* HUD Overlay Elements */
.hud-bar {
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
}

.top-hud {
  top: 15px;
  left: 15px;
  right: 15px;
  justify-content: space-between;
}

.bottom-hud {
  bottom: 15px;
  left: 15px;
}

.hud-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(26, 26, 26, 0.85);
  color: #fff;
  border: 2px solid #fff;
  box-shadow: 3px 3px 0 #000;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 800;
  backdrop-filter: blur(4px);
  pointer-events: auto;
}

.hud-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00e676;
}

.hud-actions {
  display: flex;
  gap: 8px;
  pointer-events: auto;
}

.hud-btn {
  background: var(--tertiary-color);
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  box-shadow: 3px 3px 0 #1a1a1a;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  transition: transform 0.1s, box-shadow 0.1s;
}

.hud-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #1a1a1a;
}

.hud-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #1a1a1a;
}

.hud-hint {
  display: flex;
  gap: 8px;
  background: rgba(26, 26, 26, 0.85);
  color: #fff;
  border: 2px solid #fff;
  box-shadow: 3px 3px 0 #000;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

/* Loading Overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(20, 20, 26, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(6px);
}

.loading-modal {
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  padding: 30px 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.loading-spinner {
  width: 45px;
  height: 45px;
  border: 5px solid #ddd;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 15px auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-title {
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--text-color);
  margin-bottom: 8px;
}

.loading-status-text {
  font-size: 0.9rem;
  font-weight: 700;
  color: #666;
  margin-bottom: 15px;
}

.progress-track {
  width: 100%;
  height: 16px;
  background: #eee;
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0 var(--border-color);
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.2s ease-out;
}

.progress-num {
  font-weight: 900;
  font-size: 1rem;
  color: var(--text-color);
}

/* Controls Grid */
.controls-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

@media (max-width: 992px) {
  .controls-container {
    grid-template-columns: 1fr;
  }
}

.control-group-card {
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  padding: 20px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 2px solid var(--border-color);
}

.group-header h3 {
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  color: var(--text-color);
}

.group-icon {
  font-size: 1.3rem;
}

.group-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn-grid-row {
  display: flex;
  gap: 10px;
}

.neo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  font-size: 0.95rem;
  font-weight: 900;
  text-transform: uppercase;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.neo-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color);
}

.neo-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--border-color);
}

.btn-sm {
  padding: 8px 12px;
  font-size: 0.85rem;
}

.btn-active-green {
  background: #00e676;
  color: #1a1a1a;
}

.btn-idle {
  background: var(--primary-color);
  color: #fff;
}

.btn-active-yellow {
  background: var(--tertiary-color);
  color: #1a1a1a;
}

.btn-outline {
  background: var(--card-bg);
  color: var(--text-color);
}

/* Spotlight Texture Map Grid */
.map-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.map-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--card-bg);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0 var(--border-color);
  padding: 8px 10px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}

.map-chip:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--border-color);
}

.map-chip.active {
  background: var(--tertiary-color);
  color: #1a1a1a;
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
}

.map-preview {
  width: 22px;
  height: 22px;
  border-radius: 3px;
  border: 1px solid var(--border-color);
  flex-shrink: 0;
}

.disturb-preview {
  background: linear-gradient(135deg, #2b5876, #4e4376, #ff9900);
}

.colors-preview {
  background: linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta);
}

.grid-preview {
  background: repeating-linear-gradient(0deg, #333, #333 3px, #fff 3px, #fff 6px);
}

.none-preview {
  background: #ffffff;
}

/* Statue Material Chips */
.statue-mat-section {
  margin-top: 5px;
}

.mat-chips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-top: 6px;
}

/* Color Presets & Color Picker */
.color-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.neo-color-input {
  width: 32px;
  height: 32px;
  padding: 0;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  background: none;
}

.color-hex-badge {
  font-size: 0.8rem;
  font-weight: 900;
  background: #eee;
  padding: 2px 6px;
  border: 1px solid var(--border-color);
  color: #111;
}

.color-chips-grid {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.color-dot-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0 var(--border-color);
  cursor: pointer;
  transition: transform 0.15s;
}

.color-dot-btn:hover {
  transform: scale(1.15);
}

.color-dot-btn.active {
  transform: scale(1.2);
  border-width: 3px;
  box-shadow: 0 0 8px rgba(0,0,0,0.5);
}

/* Sliders */
.slider-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slider-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--text-color);
}

.slider-val {
  color: var(--primary-color);
  font-weight: 900;
}

.neo-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: #ddd;
  border: 1px solid var(--border-color);
  outline: none;
  cursor: pointer;
}

.neo-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--tertiary-color);
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0 var(--border-color);
  cursor: pointer;
}

/* Common Control Styles */
.control-label {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-color);
}

.speed-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.speed-chips {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.chip-btn {
  background: var(--card-bg);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0 var(--border-color);
  padding: 6px 4px;
  font-size: 0.82rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
}

.chip-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--border-color);
}

.chip-btn.active {
  background: var(--secondary-color);
  color: #fff;
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 var(--border-color);
}

.camera-btn-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.theme-btn-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.theme-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--card-bg);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  box-shadow: 3px 3px 0 var(--border-color);
  padding: 8px 10px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s;
}

.theme-chip.active {
  background: var(--tertiary-color);
  color: #1a1a1a;
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
}

.theme-color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #1a1a1a;
  display: inline-block;
  flex-shrink: 0;
}

.toggles-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toggle-chip {
  flex: 1;
  min-width: 80px;
  background: var(--card-bg);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0 var(--border-color);
  padding: 6px 8px;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
}

.toggle-chip.active {
  background: var(--primary-color);
  color: #fff;
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 var(--border-color);
}

/* Info & Credits Card */
.info-credits-card {
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  padding: 24px 28px;
  margin-top: 10px;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.info-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-title h4 {
  font-size: 1.15rem;
  font-weight: 900;
  color: var(--text-color);
}

.badge-license {
  background: var(--secondary-color);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 900;
  padding: 4px 10px;
  border: 2px solid var(--border-color);
  box-shadow: 2px 2px 0 var(--border-color);
}

.info-desc {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 16px;
}

.info-link {
  color: var(--primary-color);
  font-weight: 800;
  text-decoration: underline;
}

.credits-footer {
  display: flex;
  justify-content: flex-start;
}

@media (max-width: 768px) {
  .threed-page-wrapper {
    padding: 20px 4% 60px 4%;
  }
  .threed-title {
    font-size: 1.8rem;
    padding: 10px 16px;
    box-shadow: 4px 4px 0 var(--border-color);
  }
  .threed-subtitle {
    font-size: 0.9rem;
    padding: 8px 14px;
  }
  .canvas-card {
    height: 420px;
    box-shadow: 6px 6px 0 var(--border-color);
  }
  .hide-mobile {
    display: none !important;
  }
  .camera-btn-grid, .theme-btn-grid, .map-grid, .mat-chips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
