<script setup>
import { useHead } from '#imports'
import { useLanguage } from '~/composables/useLanguage'

const { t, currentLang } = useLanguage()

useHead({
  title: 'Blog | Rizky Mochamad Sidik'
})

const translateTag = (tag) => {
  const lowercaseTag = tag.toLowerCase()
  if (currentLang.value === 'id') {
    if (lowercaseTag === 'design') return 'Desain'
    if (lowercaseTag === 'database') return 'Basis Data'
    if (lowercaseTag === 'frontend') return 'Frontend'
    if (lowercaseTag === 'vscode') return 'VS Code'
    if (lowercaseTag === 'framework') return 'Framework'
    if (lowercaseTag === 'ui') return 'Antarmuka'
  } else if (currentLang.value === 'zh') {
    if (lowercaseTag === 'design') return '设计'
    if (lowercaseTag === 'database') return '数据库'
    if (lowercaseTag === 'frontend') return '前端'
    if (lowercaseTag === 'vscode') return 'VS Code'
    if (lowercaseTag === 'framework') return '框架'
    if (lowercaseTag === 'ui') return '界面'
  } else if (currentLang.value === 'ja') {
    if (lowercaseTag === 'design') return 'デザイン'
    if (lowercaseTag === 'database') return 'データベース'
    if (lowercaseTag === 'frontend') return 'フロントエンド'
    if (lowercaseTag === 'vscode') return 'VS Code'
    if (lowercaseTag === 'framework') return 'フレームワーク'
    if (lowercaseTag === 'ui') return 'UI'
  }
  return tag
}

</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero" style="min-height: 40vh; padding: 60px 5%;">
      <div class="hero-content" v-reveal="'slide-up'" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h1>
          <template v-if="currentLang === 'id'">CATATAN <span class="highlight">DEV</span></template>
          <template v-else-if="currentLang === 'zh'">开发 <span class="highlight">笔记</span></template>
          <template v-else-if="currentLang === 'ja'">開発者 <span class="highlight">ノート</span></template>
          <template v-else>DEV <span class="highlight">NOTES</span></template>
        </h1>
        <p style="margin-top: 20px;">{{ t('blog_desc') }}</p>
      </div>
    </section>

    <!-- Articles Grid Section -->
    <section class="section">
      <div class="projects-grid">
        <!-- Article 1 -->
        <div class="project-card" v-reveal="'pop'">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/neo2.webp" alt="Neo-Brutalism cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Design') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_1_title') }}</h3>
            <p>{{ t('art_1_desc') }}</p>
            <NuxtLink to="/blog/artikel1" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 2 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/sql.webp" alt="MySQL cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Database') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_2_title') }}</h3>
            <p>{{ t('art_2_desc') }}</p>
            <NuxtLink to="/blog/artikel2" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 3 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 200 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/react.webp" alt="React cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Frontend') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_3_title') }}</h3>
            <p>{{ t('art_3_desc') }}</p>
            <NuxtLink to="/blog/artikel3" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 4 -->
        <div class="project-card" v-reveal="'pop'">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/vs.webp" alt="VS Code cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('VSCODE') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_4_title') }}</h3>
            <p>{{ t('art_4_desc') }}</p>
            <NuxtLink to="/blog/artikel4" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 5 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/nut.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Framework') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_5_title') }}</h3>
            <p>{{ t('art_5_desc') }}</p>
            <NuxtLink to="/blog/artikel5" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 6 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 200 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/laravel.webp" alt="Laravel cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Framework') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_6_title') }}</h3>
            <p>{{ t('art_6_desc') }}</p>
            <NuxtLink to="/blog/artikel6" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 7 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/nut.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Framework') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_7_title') }}</h3>
            <p>{{ t('art_7_desc') }}</p>
            <NuxtLink to="/blog/artikel7" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 8 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/framework.webp" alt="Framework cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Framework') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_8_title') }}</h3>
            <p>{{ t('art_8_desc') }}</p>
            <NuxtLink to="/blog/artikel8" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 9 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/pinia.webp" alt="Pinia cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('Framework') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_9_title') }}</h3>
            <p>{{ t('art_9_desc') }}</p>
            <NuxtLink to="/blog/artikel9" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>

        <!-- Article 10 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/UI.webp" alt="UI cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">{{ translateTag('UI') }}</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">{{ t('art_10_title') }}</h3>
            <p>{{ t('art_10_desc') }}</p>
            <NuxtLink to="/blog/artikel10" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">{{ t('read_article') }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
