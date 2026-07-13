<script setup>
import { useHead } from '#imports'
import { useLanguage } from '~/composables/useLanguage'

const { t } = useLanguage()

useHead({
  title: 'Projects | Rizky Mochamad Sidik',
})
</script>

<template>
  <div>
    <!-- Projects Section -->
    <section id="projects" class="section">
      <div class="section-header" v-reveal="'slide-left'">
        <h2>{{ t('projects_header') }}</h2>
      </div>
      <div class="projects-grid">
         <!-- Project 1 -->
        <div class="project-card" v-reveal="'pop'">
          <img src="/images/comprofile.webp" alt="company profile cover" style="width: 100%; height: auto; display: block; border-bottom: var(--border-width) solid var(--border-color);">
          <div class="project-info">
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('proj_1_title') }}</h3>
            <p>{{ t('proj_1_desc') }}</p>
            <NuxtLink to="https://sidiktsq-companyprofilesekolah.vercel.app/" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('visit_web') }}</NuxtLink>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <img src="/images/porto.webp" alt="porto cover" style="width: 100%; height: auto; display: block; border-bottom: var(--border-width) solid var(--border-color);">
          <div class="project-info">
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('proj_2_title') }}</h3>
            <p>{{ t('proj_2_desc') }}</p>
            <NuxtLink to="https://sidiktsq.nlfts.dev/" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('visit_web') }}</NuxtLink>
          </div>
        </div>

        <!-- Project 3 -->
       <div class="project-card" v-reveal="{ type: 'pop', delay: 200 }">
          <img src="/images/vhgallery.webp" alt="porto cover" style="width: 100%; height: auto; display: block; border-bottom: var(--border-width) solid var(--border-color);">
          <div class="project-info">
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('proj_3_title') }}</h3>
            <p>{{ t('proj_3_desc') }}</p>
            <NuxtLink to="https://gallery-of-villhaze.vercel.app/" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('visit_web') }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
