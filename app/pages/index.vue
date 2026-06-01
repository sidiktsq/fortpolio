<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Rizky Mochamad Sidik | Portofolio'
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-content">
        <h1>HI, I'M RIZKY MOCHAMAD SIDIK<br><span class="highlight">FULL STACK</span><br> DEVELOPER.</h1>
        <p>Building brutal, functional, and beautiful web experiences.</p>
        <div class="hero-buttons">
          <NuxtLink to="/project" class="btn btn-primary">See My Work</NuxtLink>
          <a href="https://github.com/sidiktsq" target="_blank" class="btn btn-secondary">GitHub</a>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-placeholder">
          <img src="/images/viil2.png" alt="Developer Profile">
        </div>
      </div>
    </header>

    <!-- About Section -->
    <section id="about" class="section">
      <div class="section-header">
        <h2>ABOUT ME</h2>
      </div>

      <div class="about-text"
          style="font-size: 1.3rem; line-height: 1.8; margin-bottom: 50px; width: 100%; padding: 40px; background: var(--card-bg); border: var(--border-width) solid var(--border-color); box-shadow: 8px 8px 0 var(--border-color);">
        <p style="margin-bottom: 20px;">
          Halo! Saya <strong>Rizky Mochamad Sidik</strong>, seorang Full-Stack Web Developer dan Software Engineer yang berfokus pada pembangunan aplikasi web modern, efisien, dan berskala besar.
        </p>
        <p style="margin-bottom: 20px;">
          Saya memiliki passion kuat dalam mentransformasikan ide kompleks menjadi solusi digital yang nyata dan berorientasi pada pengalaman pengguna. Anda dapat mengeksplorasi portofolio kerja saya melalui 
          <strong>
            <NuxtLink to="/project" style="color: inherit; text-decoration: underline; text-underline-offset: 4px;">daftar proyek saya di sini</NuxtLink>
          </strong>.
        </p>
        <p style="margin-bottom: 20px;">
          Selain menulis kode, saya aktif membagikan catatan teknis dan tutorial seputar dunia coding 
          <strong>
            <NuxtLink to="/blog" style="color: inherit; text-decoration: underline; text-underline-offset: 4px;">di artikel blog</NuxtLink>
          </strong>.
        </p>
        <p style="margin-bottom: 20px;">
          Saya selalu tertantang untuk mempelajari arsitektur teknologi baru, bereksperimen dengan desain antarmuka yang elegan, serta terus meningkatkan standar kemampuan rekayasa perangkat lunak saya.
        </p>

        <h3 style="font-size: 1.5rem; margin-bottom: 20px;">Platform Sosial</h3>
        <div class="social-links" style="display: flex; gap: 25px; flex-wrap: wrap; font-weight: bold;">
          <a href="https://github.com/sidiktsq" target="_blank"
              style="color: inherit; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: transform 0.2s;"
              onmouseover="this.style.transform='translateY(-2px)'"
              onmouseout="this.style.transform='translateY(0)'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
              </path>
            </svg> GitHub
          </a>
          <a href="https://www.tiktok.com/@inimsss3" target="_blank"
              style="color: inherit; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: transform 0.2s;"
              onmouseover="this.style.transform='translateY(-2px)'"
              onmouseout="this.style.transform='translateY(0)'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="currentColor">
              <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5.64 5.64 0 0 1-1.04-.1z" />
            </svg> TikTok
          </a>
          <a href="https://www.instagram.com/inimsss/" target="_blank"
              style="color: inherit; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: transform 0.2s;"
              onmouseover="this.style.transform='translateY(-2px)'"
              onmouseout="this.style.transform='translateY(0)'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg> Instagram
          </a>
        </div>
      </div>

      <!-- Skills and Experience Grid -->
      <div class="about-grid">
        <div class="card">
          <h3>Skills</h3>
          <div class="skills-tags">
            <span class="tag">HTML5</span>
            <span class="tag">CSS3</span>
            <span class="tag">JavaScript</span>
            <span class="tag">Java</span>
            <span class="tag">Laravel</span>
            <span class="tag">PHP</span>
            <span class="tag">MySQL</span>
            <span class="tag">PostgreSQL</span>
            <span class="tag">API</span>
            <span class="tag">Node.js</span>
            <span class="tag">VUE</span>
            <span class="tag">Bootstrap</span>
            <span class="tag">Tailwind</span>
            <span class="tag">Laragon</span>
          </div>
        </div>
        <div class="card">
          <h3>Experience</h3>
          <p>3+ years of experience building scalable web applications. Passionate about clean code and bold designs.</p>
        </div>
      </div>
    </section>
  </div>
</template>
