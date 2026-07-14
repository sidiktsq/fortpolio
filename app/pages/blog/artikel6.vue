<script setup>
import { useHead, computed } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import { artikel6Translations } from '~/composables/translations/artikel6'

const { t, currentLang } = useLanguage()

const trans = computed(() => {
  return artikel6Translations[currentLang.value] || artikel6Translations.id
})

useHead({
  title: () => `${trans.value.title} | Rizky Mochamad Sidik`
})
</script>

<template>
  <div>
    <!-- Hero Header -->
    <section class="hero"
        style="min-height: 30vh; padding: 60px 5%; background-image: linear-gradient(var(--border-color) 2px, transparent 2px), linear-gradient(90deg, var(--border-color) 2px, transparent 2px); background-size: 50px 50px; background-color: var(--primary-color);">
      <div class="hero-content" style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span class="tag"
            style="display: inline-block; background: var(--tertiary-color); color: #1a1a1a; padding: 8px 20px; border: var(--border-width) solid var(--border-color); font-weight: 900; margin-bottom: 20px; font-size: 1rem;">
          {{ trans.tag }}
        </span>
        <h1 class="article-title">{{ trans.title }}</h1>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section" style="padding-top: 40px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <NuxtLink to="/blog" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>{{ t('back_to_blog') }}</span>
        </NuxtLink>

        <div class="article-content" v-reveal="'pop'">
          <!-- Table of Contents (for articles that support it) -->
          <div v-if="trans.tocTitle && trans.toc" class="toc-box">
            <h3>{{ trans.tocTitle }}</h3>
            <ul>
              <li v-for="(item, idx) in trans.toc" :key="idx">{{ item }}</li>
            </ul>
          </div>

          <template v-for="(sec, idx) in trans.sections" :key="idx">
            <h2 v-if="sec.h2">{{ sec.h2 }}</h2>
            
            <template v-if="sec.p">
              <template v-if="Array.isArray(sec.p)">
                <p v-for="(pText, pIdx) in sec.p" :key="pIdx">{{ pText }}</p>
              </template>
              <template v-else>
                <p>{{ sec.p }}</p>
              </template>
            </template>

            <template v-if="sec.subsections">
              <div v-for="(sub, subIdx) in sec.subsections" :key="subIdx">
                <h3>{{ sub.h3 }}</h3>
                <p>{{ sub.p }}</p>
              </div>
            </template>

            <template v-if="sec.pros && sec.cons">
              <div class="pros-cons-grid">
                <div style="background: var(--tertiary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #1a1a1a;">
                  <h4 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">{{ sec.pros.title }}</h4>
                  <ul style="margin-top: 15px;">
                    <li v-for="(item, itemIdx) in sec.pros.items" :key="itemIdx">{{ item }}</li>
                  </ul>
                </div>
                <div style="background: var(--primary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #1a1a1a;">
                  <h4 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">{{ sec.cons.title }}</h4>
                  <ul style="margin-top: 15px;">
                    <li v-for="(item, itemIdx) in sec.cons.items" :key="itemIdx">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.article-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-color);
}

.article-content h2 {
  font-size: 2rem;
  margin-top: 50px;
  margin-bottom: 20px;
  border-bottom: 4px solid var(--primary-color);
  display: inline-block;
}

.article-content h3 {
  font-size: 1.5rem;
  margin-top: 30px;
  margin-bottom: 15px;
  color: var(--text-color);
  background-color: var(--tertiary-color);
  padding: 5px 15px;
  border: var(--border-width) solid var(--border-color);
  display: inline-block;
}

.article-content p {
  margin-bottom: 20px;
}

.article-content ul {
  margin-left: 20px;
  margin-bottom: 20px;
}

.article-content li {
  margin-bottom: 10px;
}

.article-content code {
  background: var(--secondary-color);
  border: 2px solid var(--border-color);
  padding: 2px 8px;
  font-family: monospace;
  font-size: 1rem;
}

.code-block {
  background: var(--secondary-color);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  padding: 20px 25px;
  margin: 15px 0 25px 0;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.7;
  overflow-x: auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #1a1a1a;
  background: var(--tertiary-color);
  padding: 10px 20px;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  transition: transform 0.2s;
}

.back-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color);
}

.article-content h4 {
  font-size: 1.3rem;
  margin-top: 25px;
  margin-bottom: 10px;
}

.article-title {
  font-size: 3rem;
  background: var(--card-bg);
  color: var(--text-color);
  padding: 20px;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  line-height: 1.2;
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem;
    padding: 15px;
    box-shadow: 4px 4px 0 var(--border-color);
  }

  .article-content {
    padding: 20px;
    font-size: 1.05rem;
    box-shadow: 4px 4px 0 var(--border-color);
  }

  .article-content h2 {
    font-size: 1.6rem;
    margin-top: 30px;
  }

  .article-content h3 {
    font-size: 1.3rem;
  }

  .pros-cons-grid {
    grid-template-columns: 1fr;
  }

  .back-link {
    padding: 8px 16px;
    font-size: 0.9rem;
    box-shadow: 3px 3px 0 var(--border-color);
  }
}

@media (max-width: 480px) {
  .article-title {
    font-size: 1.4rem;
    padding: 12px;
    box-shadow: 3px 3px 0 var(--border-color);
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .article-content {
    padding: 15px;
    font-size: 0.95rem;
    border: 2px solid var(--border-color);
    box-shadow: 3px 3px 0 var(--border-color);
  }

  .article-content h2 {
    font-size: 1.3rem;
    margin-top: 20px;
    margin-bottom: 15px;
  }

  .article-content h3 {
    font-size: 1.1rem;
    padding: 4px 12px;
    border: 2px solid var(--border-color);
  }

  .article-content h4 {
    font-size: 1.1rem;
    margin-top: 15px;
    margin-bottom: 8px;
  }

  .article-content p {
    margin-bottom: 15px;
    line-height: 1.6;
  }

  .article-content ul {
    margin-left: 15px;
    margin-bottom: 15px;
  }

  .article-content li {
    margin-bottom: 8px;
  }

  .back-link {
    padding: 8px 12px;
    font-size: 0.85rem;
    gap: 6px;
    box-shadow: 2px 2px 0 var(--border-color);
    border: 2px solid var(--border-color);
  }

  .back-link:hover {
    box-shadow: 3px 3px 0 var(--border-color);
    transform: translate(-1px, -1px);
  }

  .back-link svg {
    width: 18px;
    height: 18px;
  }

  .pros-cons-grid {
    gap: 12px;
  }

  .tag {
    font-size: 0.8rem;
    padding: 6px 15px;
    border: 2px solid var(--border-color);
  }
}
</style>
