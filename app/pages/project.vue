<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Projects | Rizky Mochamad Sidik'
})
</script>

<template>
  <div>
    <!-- Projects Section -->
    <section id="projects" class="section">
      <div class="section-header">
        <h2>PROJECTS-RIZKY MOCHAMAD SIDIK</h2>
      </div>
      <div class="projects-grid">
         <!-- Article 1 -->
        <div class="project-card">
          <img src="/images/comprofile.png" alt="company profile cover" style="width: 100%; height: auto; display: block; border-bottom: var(--border-width) solid var(--border-color);">
          <div class="project-info">
            <h3 style="font-size: 1.3rem; line-height: 1.3;">COMPANY PROFILE</h3>
            <p>A comprehensive company profile built with Laravel and PHP, designed to deliver a modern and seamless user experience.</p>
            <NuxtLink to="https://sidiktsq-companyprofilesekolah.vercel.app/" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Visit Website</NuxtLink>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card">
          <img src="/images/porto.png" alt="porto cover" style="width: 100%; height: auto; display: block; border-bottom: var(--border-width) solid var(--border-color);">
          <div class="project-info">
            <h3 style="font-size: 1.3rem; line-height: 1.3;">PORTFOLIO WEBSITE</h3>
            <p>A striking portfolio template inspired by nuxt.js, crafted to highlight creative work with bold aesthetics</p>
            <NuxtLink to="https://sidiktsq.nlfts.dev/" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Visit Website</NuxtLink>
          </div>
        </div>

        <!-- Project 3 -->
       <div class="project-card">
          <img src="/images/vhgallery.png" alt="porto cover" style="width: 100%; height: auto; display: block; border-bottom: var(--border-width) solid var(--border-color);">
          <div class="project-info">
            <h3 style="font-size: 1.3rem; line-height: 1.3;">VILLHAZE</h3>
            <p>Gallery of Villhaze is a modern online gallery that showcases a curated collection of visuals, artwork, and creative moments in a clean, immersive, and responsive experience.</p>
            <NuxtLink to="https://gallery-of-villhaze.vercel.app/" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Visit Website</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
