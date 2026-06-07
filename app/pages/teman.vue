<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Lingkaran Koneksi | Portofolio'
})
</script>

<template>
  <div>
    <section class="section" style="padding-top: 120px; min-height: 80vh;">
      <div class="section-header">
        <h2>LINGKARAN KONEKSI</h2>
      </div>
      <p class="section-desc">Membangun ekosistem melalui interaksi. Daftar entitas luar biasa yang membentuk orbit digital saya.</p>

      <!-- Category 1: Digital Nodes -->
      <h3 class="category-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        01 — Digital Nodes
      </h3>
      <div class="friends-grid">
        <a href="https://www.davingm.com" target="_blank" class="friend-card">
          <img class="friend-avatar" src="https://avatars.githubusercontent.com/u/204519754?v=4" alt="davingm">
          <div class="friend-info">
            <h3 class="friend-name">davingm</h3>
            <p class="friend-quote">"我來過，我見過，我掌握了"</p>
          </div>
        </a>
        
        <a href="https://tokita.nlfts.dev" target="_blank" class="friend-card">
          <img class="friend-avatar" src="https://avatars.githubusercontent.com/u/182593937?v=4" alt="Tokita">
          <div class="friend-info">
            <h3 class="friend-name">Nafeez</h3>
            <p class="friend-quote">"I use this GitHub to record my development journey and projects. Always learning, always growing."</p>
          </div>
        </a>
      </div>

      <!-- Category 2: Active Entities -->
      <h3 class="category-title" style="margin-top: 60px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        02 — Active Entities
      </h3>
      <div class="friends-grid">
        <a href="https://vahllzzzz.nlfts.dev" target="_blank" class="friend-card">
          <img class="friend-avatar" src="https://avatars.githubusercontent.com/u/202130049?v=4" alt="Vahllzzzz">
          <div class="friend-info">
            <h3 class="friend-name">Vahllzzzz</h3>
            <p class="friend-quote">"Life Is But A Dream."</p>
          </div>
        </a>
        
        <a href="https://game-devbr0.nlfts.dev/" target="_blank" class="friend-card">
          <img class="friend-avatar" src="https://avatars.githubusercontent.com/u/228843429?v=4" alt="Bara">
          <div class="friend-info">
            <h3 class="friend-name">Bara</h3>
            <p class="friend-quote">"My daily life it's usually."</p>
          </div>
        </a>

        <a href="https://destkaa.nlfts.dev/" target="_blank" class="friend-card">
          <img class="friend-avatar" src="https://avatars.githubusercontent.com/u/228332586?v=4" alt="Destkaa">
          <div class="friend-info">
            <h3 class="friend-name">Destkaa</h3>
            <p class="friend-quote">"Exploring the digital frontier."</p>
          </div>
        </a>

        <a href="https://ryn-delta.vercel.app" target="_blank" class="friend-card">
          <img class="friend-avatar" src="https://avatars.githubusercontent.com/u/226198461?v=4" alt="KakaViangi">
          <div class="friend-info">
            <h3 class="friend-name">KakaViangi</h3>
            <p class="friend-quote">"Hanya orang biasa yang menyukai alam @NFLTs."</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 40px;
}
.friend-card {
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}
.friend-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 var(--border-color);
  background: var(--tertiary-color);
}
.friend-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid var(--border-color);
  object-fit: cover;
  background: #fff;
}
.friend-info {
  flex: 1;
}
.friend-name {
  font-size: 1.2rem;
  font-weight: 900;
  margin: 0 0 5px 0;
  text-transform: uppercase;
}
.friend-quote {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-style: italic;
}
.section-desc {
  font-size: 1.2rem;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 50px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.category-title {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 40px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
}
</style>
