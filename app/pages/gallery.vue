<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '#imports'

useHead({
  title: 'Gallery | Rizky Mochamad Sidik'
})

const galleryImages = ref([])
const activeLightboxImg = ref(null)
const isLightboxActive = ref(false)

const baseImages = [
  '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg',
  '11.jpeg', '12.jpeg', '13.jpeg', '14.jpeg', '15.jpeg', '16.jpeg', '17.jpeg', '18.jpeg',
  '19.jpeg', '20.jpeg', '21.jpeg', '22.jpeg', '23.jpeg', '24.jpeg', '25.jpeg', '26.jpeg',
  '27.jpeg', '28.jpeg', '29.jpeg', '1.1.jpeg', '1.2.jpeg', '1.3.jpeg', '1.4.jpeg', '1.5.jpeg', '1.6.jpeg',
  '1.7.jpeg', '1.8.jpeg', '1.9.jpeg', '1.10.jpeg', '1.11.jpeg', '1.12.jpeg', '1.13.jpeg', '1.14.jpeg',
  '1.15.jpeg', '1.16.jpeg', '1.17.jpeg', '1.18.jpeg', '1.19.jpeg', '1.20.jpeg', '1.21.jpeg', '1.22.jpeg',
  '1.23.jpeg', '1.24.jpeg', '1.25.jpeg', '1.26.jpeg', '1.27.jpeg', '1.28.jpeg', '1.29.jpeg', '1.30.jpeg',
  '1.31.jpeg', '1.32.jpeg', '1.33.jpeg', '1.34.jpeg', '1.35.jpeg', '1.36.jpeg', '1.37.jpeg', '1.38.jpeg',
  '1.39.jpeg', '1.40.jpeg', '1.41.jpeg', '1.42.jpeg', '1.43.jpeg', '1.44.jpeg', '1.45.jpeg', '1.46.jpeg'
]

onMounted(() => {
  // Randomize array to make masonry look more dynamic
  galleryImages.value = [...baseImages].sort(() => 0.5 - Math.random())
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const openLightbox = (src) => {
  activeLightboxImg.value = src
  isLightboxActive.value = true
}

const closeLightbox = () => {
  isLightboxActive.value = false
  activeLightboxImg.value = null
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeLightbox()
  }
}
</script>

<template>
  <div>
    <!-- Hero Header -->
    <section class="hero" style="min-height: 30vh; padding: 60px 5%; background-color: var(--secondary-color); background-image: linear-gradient(var(--border-color) 2px, transparent 2px), linear-gradient(90deg, var(--border-color) 2px, transparent 2px); background-size: 50px 50px;">
      <div class="hero-content" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h1 class="gallery-title">MY <span class="highlight">GALLERY</span></h1>
        <p class="gallery-desc">Kumpulan momen, seni, dan karya visual.</p>
      </div>
    </section>

    <!-- The Lightbox Modal -->
    <div 
      id="lightbox" 
      class="lightbox" 
      :class="{ active: isLightboxActive }"
      @click="closeLightbox"
    >
      <span class="close-btn" @click.stop="closeLightbox">&times;</span>
      <img 
        v-if="activeLightboxImg" 
        class="lightbox-content" 
        :src="`/gallery/${activeLightboxImg}`" 
        alt="Enlarged gallery view"
        @click.stop
      />
    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid">
      <div 
        v-for="img in galleryImages" 
        :key="img" 
        class="gallery-item"
        @click="openLightbox(img)"
      >
        <img :src="`/gallery/${img}`" alt="Gallery image" loading="lazy">
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-grid {
  column-count: 4;
  column-gap: 20px;
  padding: 40px 2%;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
@media (min-width: 1600px) {
  .gallery-grid {
    column-count: 5;
  }
}
@media (max-width: 1200px) {
  .gallery-grid {
    column-count: 3;
  }
}
.gallery-item {
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  background: var(--card-bg);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  margin-bottom: 20px;
  break-inside: avoid;
  display: inline-block; /* Helps prevent breaking across columns */
  width: 100%;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  display: block;
}
.gallery-item:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 var(--border-color);
}
.gallery-item:active {
  transform: translate(4px, 4px);
  box-shadow: 4px 4px 0 var(--border-color);
}
.gallery-item:hover img {
  transform: scale(1.05);
}

/* Lightbox Modal Styles */
.lightbox {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 26, 26, 0.95);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  backdrop-filter: blur(5px);
}
.lightbox.active {
  display: flex;
}
.lightbox-content {
  max-width: 90%;
  max-height: 85%;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 15px 15px 0 var(--primary-color);
  object-fit: contain;
  background: var(--card-bg);
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  color: #fff;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;
  text-shadow: 2px 2px 0 #000;
}
.close-btn:hover {
  color: var(--primary-color);
}

.gallery-title {
  font-size: 3rem;
  font-weight: 900;
  background: var(--card-bg);
  color: var(--text-color);
  padding: 20px;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  display: inline-block;
}
.gallery-desc {
  margin-top: 20px;
  background: var(--card-bg);
  display: inline-block;
  padding: 10px 20px;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  font-weight: bold;
}

@media (max-width: 768px) {
  .gallery-grid {
    column-count: 2;
    column-gap: 10px;
    padding: 20px 3%;
  }
  .gallery-item {
    margin-bottom: 10px;
  }
  .gallery-title {
    font-size: 1.8rem;
    padding: 12px;
    box-shadow: 4px 4px 0 var(--border-color);
  }
  .gallery-desc {
    font-size: 0.9rem;
    padding: 8px 15px;
    box-shadow: 3px 3px 0 var(--border-color);
  }
  .lightbox-content {
    max-width: 95%;
    max-height: 80%;
    box-shadow: 8px 8px 0 var(--primary-color);
  }
  .close-btn {
    top: 10px;
    right: 20px;
    font-size: 40px;
  }
}
</style>
