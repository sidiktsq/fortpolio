<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '#imports'

const route = useRoute()
const isMenuOpen = ref(false)
const isDark = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Dynamic logo based on the active path
const logoText = computed(() => {
  if (route.path === '/project') return 'PROJECTS'
  if (route.path === '/gallery') return 'GALLERY'
  if (route.path.startsWith('/blog')) return 'BLOG'
  return 'MY PORTOFOLIO'
})

// Persistent dark mode matching original theme.js
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark'
  if (isDark.value) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.body.classList.add('dark-mode')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <div class="layout-wrapper">
    <nav class="navbar">
      <div class="logo">{{ logoText }}</div>
      <div style="position: relative; display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
        <!-- Theme Toggle Button -->
        <div 
          class="btn"
          style="padding: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
          @click="toggleTheme"
        >
          <svg class="theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <!-- Render Moon path or Sun path based on isDark state -->
            <template v-if="isDark">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </template>
            <template v-else>
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </template>
          </svg>
        </div>

        <!-- Menu Toggle Button -->
        <div 
          class="btn"
          style="padding: 8px 12px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
          @click="toggleMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>

        <!-- Pop-up Navigation Menu -->
        <ul 
          v-if="isMenuOpen"
          id="proj-menu"
          style="display: flex; position: absolute; top: 50px; right: 0; flex-direction: column; gap: 15px; background-color: var(--tertiary-color); border: 4px solid #1a1a1a; box-shadow: 4px 4px 0 #1a1a1a; padding: 20px; z-index: 100; list-style: none; min-width: 150px;"
        >
          <li>
            <NuxtLink 
              to="/" 
              style="display: flex; align-items: center; gap: 10px; color: #1a1a1a; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 0.9rem;"
              @click="closeMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg> Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/project" 
              style="display: flex; align-items: center; gap: 10px; color: #1a1a1a; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 0.9rem;"
              @click="closeMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg> Projects
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/blog" 
              style="display: flex; align-items: center; gap: 10px; color: #1a1a1a; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 0.9rem;"
              @click="closeMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg> Blog
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/gallery" 
              style="display: flex; align-items: center; gap: 10px; color: #1a1a1a; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 0.9rem;"
              @click="closeMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg> Gallery
            </NuxtLink>
          </li>
          <li>
            <NuxtLink 
              to="/teman" 
              style="display: flex; align-items: center; gap: 10px; color: #1a1a1a; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 0.9rem;"
              @click="closeMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg> Teman
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content Slot -->
    <main class="layout-main">
      <slot />
    </main>

    <!-- Live2D Widget (Takagi) -->
    <Live2DWidget />

    <!-- 3D VRM Widget (Elaina) - .client.vue handles client-only rendering -->
    <ThreeDWidget />

    <!-- Unified Footer -->
    <footer>
      <p>&copy; 2026 Rizky Mochamad Sidik. Built with Nuxt.js</p>
    </footer>
  </div>
</template>
