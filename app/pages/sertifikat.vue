<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useHead, useNuxtApp } from '#imports'
import { useLanguage } from '~/composables/useLanguage'

const { t, currentLang } = useLanguage()
const nuxtApp = useNuxtApp()

useHead({
  title: computed(() => `${t('certificates')} | Rizky Mochamad Sidik`),
  meta: [
    { 
      name: 'description', 
      content: computed(() => t('certificates_desc')) 
    }
  ]
})

// Categories
const activeCategory = ref('all')
const searchQuery = ref('')
const selectedCert = ref(null)
const isModalOpen = ref(false)
const copyToast = ref('')
let toastTimer = null

const certificates = []

// Filter categories
const categories = [
  { id: 'all', labelKey: 'cert_filter_all' },
  { id: 'web', labelKey: 'cert_filter_web' },
  { id: 'backend', labelKey: 'cert_filter_backend' },
  { id: 'frontend', labelKey: 'cert_filter_frontend' },
  { id: 'other', labelKey: 'cert_filter_other' }
]

// Filtered Certificates
const filteredCertificates = computed(() => {
  return certificates.filter((cert) => {
    // Category check
    const matchesCategory = activeCategory.value === 'all' || cert.category === activeCategory.value
    if (!matchesCategory) return false

    // Search query check
    if (!searchQuery.value.trim()) return true
    const q = searchQuery.value.toLowerCase().trim()
    const titleText = (cert.title[currentLang.value] || cert.title.id || '').toLowerCase()
    const issuerText = cert.issuer.toLowerCase()
    const credId = cert.credentialId.toLowerCase()
    const skillsMatch = cert.skills.some((s) => s.toLowerCase().includes(q))
    const descText = (cert.description[currentLang.value] || cert.description.id || '').toLowerCase()

    return titleText.includes(q) || issuerText.includes(q) || credId.includes(q) || skillsMatch || descText.includes(q)
  })
})

// Modal controls
const openModal = (cert) => {
  selectedCert.value = cert
  isModalOpen.value = true
  if (nuxtApp?.$lenis) {
    nuxtApp.$lenis.stop()
  }
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCert.value = null
  if (nuxtApp?.$lenis) {
    nuxtApp.$lenis.start()
  }
}

// Copy to Clipboard
const copyCredentialId = async (id) => {
  try {
    await navigator.clipboard.writeText(id)
    copyToast.value = (t('cert_copy_success_msg') || 'ID "{id}" berhasil disalin!').replace('{id}', id)
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      copyToast.value = ''
    }, 3000)
  } catch (err) {
    console.error('Failed to copy ID:', err)
  }
}

// Keyboard listener for Escape key
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="cert-page-wrapper">
    <!-- Hero Header -->
    <section class="cert-hero" v-reveal="'slide-up'">
      <div class="cert-hero-inner">
        <div class="cert-badge">
          <span class="badge-icon">🎖️</span>
          <span>{{ t('cert_badge_text') }}</span>
        </div>

        <h1 class="cert-title">
          <template v-if="currentLang === 'id'">
            SERTIFIKAT &amp; <span class="highlight">PENGHARGAAN</span>
          </template>
          <template v-else-if="currentLang === 'zh'">
            专业证书与 <span class="highlight">荣誉成就</span>
          </template>
          <template v-else-if="currentLang === 'ja'">
            資格・認定 <span class="highlight">修了証書</span>
          </template>
          <template v-else>
            CERTIFICATES &amp; <span class="highlight">AWARDS</span>
          </template>
        </h1>

        <p class="cert-subtitle">{{ t('certificates_desc') }}</p>

        <!-- Neo-brutalist Stat Badges -->
        <div class="cert-stats-row">
          <div class="stat-pill">
            <span class="stat-num">{{ certificates.length }}+</span>
            <span class="stat-text">{{ t('cert_stat_verified') }}</span>
          </div>
          <div class="stat-pill">
            <span class="stat-num">100%</span>
            <span class="stat-text">{{ t('cert_stat_valid') }}</span>
          </div>
          <div class="stat-pill">
            <span class="stat-num">Full-Stack</span>
            <span class="stat-text">Web &amp; UI/UX</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="cert-content-section">
      <!-- Search & Category Filters Bar -->
      <div class="filter-controls-card" v-reveal="'slide-left'">
        <!-- Filter Tabs -->
        <div class="category-tabs">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="cat-btn"
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            {{ t(cat.labelKey) }}
            <span class="count-bubble" v-if="cat.id === 'all'">{{ certificates.length }}</span>
            <span class="count-bubble" v-else>
              {{ certificates.filter(c => c.category === cat.id).length }}
            </span>
          </button>
        </div>

        <!-- Search Input -->
        <div class="search-box">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            :placeholder="t('cert_search_placeholder')"
          />
          <button 
            v-if="searchQuery" 
            class="search-clear-btn" 
            @click="searchQuery = ''"
            :title="t('cert_reset_search')"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Result Counter -->
      <div class="cert-results-meta" v-reveal="'slide-up'">
        <span class="meta-label">
          <template v-if="currentLang === 'id'">
            Menampilkan <strong>{{ filteredCertificates.length }}</strong> dari {{ certificates.length }} sertifikat
          </template>
          <template v-else-if="currentLang === 'zh'">
            显示 <strong>{{ filteredCertificates.length }}</strong> / {{ certificates.length }} 个证书
          </template>
          <template v-else-if="currentLang === 'ja'">
            {{ certificates.length }} 件中 <strong>{{ filteredCertificates.length }}</strong> 件の証明書を表示
          </template>
          <template v-else>
            Showing <strong>{{ filteredCertificates.length }}</strong> of {{ certificates.length }} certificates
          </template>
        </span>
        <span v-if="searchQuery" class="meta-query-badge">
          {{ t('cert_keyword') }}: "{{ searchQuery }}"
        </span>
      </div>

      <!-- Empty State -->
      <div
        v-if="certificates.length === 0"
        class="cert-empty-state"
        v-reveal="'pop'"
      >
        <div class="empty-icon">📜</div>
        <h3>{{ t('cert_empty_title') }}</h3>
        <p>{{ t('cert_empty_desc') }}</p>
      </div>

      <!-- No search results state -->
      <div
        v-else-if="filteredCertificates.length === 0"
        class="cert-empty-state"
        v-reveal="'pop'"
      >
        <div class="empty-icon">🔍</div>
        <h3>{{ t('cert_no_results_title') }}</h3>
        <p>{{ t('cert_no_results') }}</p>
      </div>

      <!-- Certificate Cards Grid -->
      <div v-else class="cert-grid">
        <article
          v-for="(cert, idx) in filteredCertificates"
          :key="cert.id"
          class="cert-card"
          v-reveal="{ type: 'pop', delay: (idx % 3) * 100 }"
        >
          <!-- Card Header Banner -->
          <div class="cert-card-header" :style="{ borderTopColor: cert.accentColor }">
            <div class="issuer-info">
              <span class="issuer-badge" :style="{ backgroundColor: cert.issuerLogoBg }">
                {{ cert.issuerBadge }}
              </span>
              <span class="issuer-name">{{ cert.issuer }}</span>
            </div>
            <div class="cert-year-tag">
              <span>📅 {{ cert.date }}</span>
            </div>
          </div>

          <!-- Decorative Certificate Visual Area -->
          <div class="cert-preview-frame" @click="openModal(cert)">
            <!-- Certificate Diploma Mock Background -->
            <div class="diploma-pattern">
              <div class="diploma-watermark">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>

              <div class="diploma-icon-wrap">
                <img :src="cert.iconImg" :alt="cert.issuer" class="diploma-tech-logo" />
              </div>

              <div class="diploma-stamp">
                <span class="stamp-star">★</span>
                <span class="stamp-text">VERIFIED</span>
              </div>
            </div>

            <!-- Hover overlay -->
            <div class="frame-hover-overlay">
              <span class="btn btn-small btn-primary">
                🔍 {{ t('cert_view') }}
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="cert-card-body">
            <h3 class="cert-item-title" @click="openModal(cert)">
              {{ cert.title[currentLang] || cert.title.id }}
            </h3>

            <p class="cert-item-desc">
              {{ cert.description[currentLang] || cert.description.id }}
            </p>

            <!-- Credential ID Box with Copy Button -->
            <div class="credential-box">
              <div class="cred-left">
                <span class="cred-label">{{ t('cert_credential_id') }}:</span>
                <code class="cred-id">{{ cert.credentialId }}</code>
              </div>
              <button 
                class="copy-id-btn" 
                :title="t('cert_copy_id')" 
                @click="copyCredentialId(cert.credentialId)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>

            <!-- Skills Pills -->
            <div class="cert-skills-tags">
              <span v-for="skill in cert.skills" :key="skill" class="skill-tag">
                #{{ skill }}
              </span>
            </div>
          </div>

          <!-- Card Footer Actions -->
          <div class="cert-card-footer">
            <button class="btn btn-secondary btn-small action-detail-btn" @click="openModal(cert)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {{ t('cert_view') }}
            </button>

            <a
              :href="cert.verifyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary btn-small action-verify-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              {{ t('cert_verify') }}
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- Certificate Detail Modal (Neo-brutalist Lightbox) -->
    <div 
      v-if="isModalOpen && selectedCert" 
      class="cert-modal-backdrop" 
      data-lenis-prevent
      @click.self="closeModal"
    >
      <div class="cert-modal-dialog" data-lenis-prevent v-reveal="'pop'">
        <!-- Modal Close Button -->
        <button class="modal-close-btn" @click="closeModal" :title="t('cert_close_modal')">
          ✕
        </button>

        <div class="modal-inner-content">
          <!-- Diploma Graphic Container -->
          <div class="modal-diploma-wrapper">
            <div class="modal-diploma-card">
              <!-- Diploma Header -->
              <div class="diploma-head">
                <div class="diploma-seal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <div class="diploma-org-block">
                  <span class="diploma-org-badge" :style="{ backgroundColor: selectedCert.issuerLogoBg }">
                    {{ selectedCert.issuerBadge }}
                  </span>
                  <span class="diploma-org-name">{{ selectedCert.issuer }}</span>
                </div>
              </div>

              <!-- Certificate Title & Recipient -->
              <div class="diploma-center-body">
                <p class="diploma-subtitle">{{ t('cert_diploma_subtitle') }}</p>
                <h2 class="diploma-main-title">
                  {{ selectedCert.title[currentLang] || selectedCert.title.id }}
                </h2>

                <p class="diploma-awarded-text">{{ t('cert_diploma_awarded') }}</p>
                <h3 class="diploma-recipient-name">RIZKY MOCHAMAD SIDIK</h3>
                <p class="diploma-role-tag">{{ t('cert_diploma_role') }}</p>
              </div>

              <!-- Tech Icon In Center -->
              <div class="diploma-badge-preview">
                <img :src="selectedCert.iconImg" :alt="selectedCert.issuer" class="modal-tech-img" />
              </div>

              <!-- Diploma Footer -->
              <div class="diploma-foot">
                <div class="foot-col">
                  <span class="foot-label">{{ t('cert_issue_date') }}</span>
                  <span class="foot-val">{{ selectedCert.issueDateFull }}</span>
                </div>
                <div class="foot-col">
                  <span class="foot-label">{{ t('cert_credential_id') }}</span>
                  <span class="foot-val-id">{{ selectedCert.credentialId }}</span>
                </div>
                <div class="foot-col">
                  <span class="foot-label">{{ t('cert_diploma_status') }}</span>
                  <span class="foot-status-badge">✅ {{ t('cert_status_verified') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Details Sidebar -->
          <div class="modal-info-panel">
            <h3 class="info-title">
              {{ selectedCert.title[currentLang] || selectedCert.title.id }}
            </h3>

            <p class="info-desc">
              {{ selectedCert.description[currentLang] || selectedCert.description.id }}
            </p>

            <div class="info-meta-list">
              <div class="meta-item">
                <span class="meta-k">{{ t('cert_issuer') }}:</span>
                <span class="meta-v"><strong>{{ selectedCert.issuer }}</strong></span>
              </div>
              <div class="meta-item">
                <span class="meta-k">{{ t('cert_issue_date') }}:</span>
                <span class="meta-v">{{ selectedCert.issueDateFull }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-k">{{ t('cert_credential_id') }}:</span>
                <div class="meta-v cred-row">
                  <code>{{ selectedCert.credentialId }}</code>
                  <button 
                    class="btn btn-small copy-mini-btn" 
                    @click="copyCredentialId(selectedCert.credentialId)"
                    :title="t('cert_copy_id')"
                  >
                    {{ t('cert_copy') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Skills Box -->
            <div class="modal-skills-box">
              <h4 class="skills-heading">{{ t('cert_skills') }}:</h4>
              <div class="modal-skills-tags">
                <span v-for="skill in selectedCert.skills" :key="skill" class="modal-skill-tag">
                  ✓ {{ skill }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="modal-action-row">
              <a
                :href="selectedCert.verifyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary btn-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {{ t('cert_verify') }}
              </a>

              <button class="btn btn-secondary" @click="closeModal">
                {{ t('cert_close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copy Toast Notification -->
    <transition name="toast-fade">
      <div v-if="copyToast" class="neo-toast">
        <span class="toast-icon">📋</span>
        <span class="toast-message">{{ copyToast }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.cert-page-wrapper {
  min-height: 90vh;
  padding-bottom: 80px;
}

/* ==================== HERO SECTION ==================== */
.cert-hero {
  padding: 80px 5% 60px;
  background-color: var(--secondary-color);
  background-image: 
    linear-gradient(var(--border-color) 2px, transparent 2px), 
    linear-gradient(90deg, var(--border-color) 2px, transparent 2px);
  background-size: 50px 50px;
  border-bottom: var(--border-width) solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.cert-hero-inner {
  max-width: 900px;
  margin: 0 auto;
}

.cert-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  padding: 6px 16px;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.cert-title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 18px;
  text-transform: uppercase;
  color: var(--text-color);
}

.highlight {
  background-color: var(--tertiary-color);
  padding: 0 10px;
  border: var(--border-width) solid var(--border-color);
  display: inline-block;
  box-shadow: 4px 4px 0 var(--border-color);
}

.cert-subtitle {
  font-size: 1.2rem;
  font-weight: 500;
  max-width: 760px;
  margin: 0 auto 30px;
  line-height: 1.6;
  color: var(--text-color);
}

/* Hero Stat Badges */
.cert-stats-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-pill {
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  padding: 10px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--primary-color);
  line-height: 1.2;
}

.stat-text {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-color);
}

/* ==================== CONTENT SECTION ==================== */
.cert-content-section {
  max-width: 1300px;
  margin: 0 auto;
  padding: 50px 4% 30px;
}

/* Filter Controls Bar */
.filter-controls-card {
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  padding: 24px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 900px) {
  .filter-controls-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.category-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.cat-btn {
  background: var(--bg-color);
  color: var(--text-color);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 3px 3px 0 var(--border-color);
  padding: 8px 16px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;
}

.cat-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
  background: var(--tertiary-color);
}

.cat-btn.active {
  background: var(--primary-color);
  color: #fff;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--border-color);
}

.count-bubble {
  background: var(--border-color);
  color: var(--bg-color);
  font-size: 0.75rem;
  padding: 2px 7px;
  font-weight: 800;
}

.cat-btn.active .count-bubble {
  background: #fff;
  color: #1a1a1a;
}

/* Search Box */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-color);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 38px 10px 42px;
  font-size: 0.95rem;
  font-weight: 600;
  background: var(--bg-color);
  color: var(--text-color);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  outline: none;
}

.search-input:focus {
  background: var(--card-bg);
  box-shadow: 2px 2px 0 var(--border-color);
}

.search-clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 900;
  color: var(--text-color);
  cursor: pointer;
}

/* Result meta */
.cert-results-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  font-size: 0.95rem;
  font-weight: 600;
}

.meta-query-badge {
  background: var(--tertiary-color);
  border: 2px solid var(--border-color);
  padding: 4px 10px;
  font-weight: 700;
}

/* Empty State */
.cert-empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
}

/* ==================== CERTIFICATE GRID ==================== */
.cert-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

@media (min-width: 680px) {
  .cert-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .cert-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ==================== CERTIFICATE CARD ==================== */
.cert-card {
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.cert-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 12px 12px 0 var(--border-color);
}

/* Card Header Banner */
.cert-card-header {
  padding: 12px 16px;
  background: var(--bg-color);
  border-bottom: var(--border-width) solid var(--border-color);
  border-top: 6px solid var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.issuer-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.issuer-badge {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 900;
  padding: 3px 8px;
  border: 2px solid var(--border-color);
  text-transform: uppercase;
}

.issuer-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--text-color);
}

.cert-year-tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-color);
}

/* Certificate Preview Frame */
.cert-preview-frame {
  position: relative;
  height: 180px;
  background: #fdfbf7;
  border-bottom: var(--border-width) solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.diploma-pattern {
  position: relative;
  width: 90%;
  height: 84%;
  border: 2px dashed #999;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.05);
}

.diploma-watermark {
  position: absolute;
  opacity: 0.08;
  color: #000;
  pointer-events: none;
}

.diploma-icon-wrap {
  z-index: 2;
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 4px 4px 0 var(--border-color);
  background: var(--card-bg);
  padding: 8px;
}

.diploma-tech-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.diploma-stamp {
  position: absolute;
  bottom: 8px;
  right: 10px;
  background: var(--tertiary-color);
  border: 2px solid var(--border-color);
  padding: 2px 7px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.stamp-star {
  color: var(--primary-color);
}

.frame-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  backdrop-filter: blur(2px);
}

.cert-preview-frame:hover .frame-hover-overlay {
  opacity: 1;
}

/* Card Body */
.cert-card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cert-item-title {
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 12px;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.15s ease;
}

.cert-item-title:hover {
  color: var(--primary-color);
}

.cert-item-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color);
  margin-bottom: 16px;
  opacity: 0.9;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Credential Box */
.credential-box {
  background: var(--bg-color);
  border: 2px solid var(--border-color);
  padding: 8px 12px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.cred-left {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.cred-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-color);
  white-space: nowrap;
}

.cred-id {
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--primary-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-id-btn {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all 0.15s ease;
}

.copy-id-btn:hover {
  background: var(--tertiary-color);
  transform: translate(1px, 1px);
}

/* Skills tags */
.cert-skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 10px;
}

.skill-tag {
  background: var(--bg-color);
  border: 1.5px solid var(--border-color);
  padding: 3px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-color);
}

/* Card Footer */
.cert-card-footer {
  padding: 14px 20px;
  background: var(--bg-color);
  border-top: var(--border-width) solid var(--border-color);
  display: flex;
  gap: 10px;
}

.action-detail-btn,
.action-verify-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* ==================== CERTIFICATE MODAL ==================== */
.cert-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.cert-modal-dialog {
  position: relative;
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 12px 12px 0 var(--border-color);
  max-width: 950px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: var(--primary-color);
  color: #fff;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 3px 3px 0 var(--border-color);
  font-size: 1.1rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: transform 0.15s ease;
}

.modal-close-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
}

.modal-inner-content {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 820px) {
  .modal-inner-content {
    grid-template-columns: 1.2fr 1fr;
  }
}

/* Modal Diploma Card Visual */
.modal-diploma-wrapper {
  background: #252830;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: var(--border-width) solid var(--border-color);
}

@media (min-width: 820px) {
  .modal-diploma-wrapper {
    border-bottom: none;
    border-right: var(--border-width) solid var(--border-color);
  }
}

.modal-diploma-card {
  width: 100%;
  background: #fdfcf7;
  color: #1a1a1a;
  border: 4px double #1a1a1a;
  padding: 24px;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.diploma-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #1a1a1a;
  padding-bottom: 12px;
}

.diploma-seal {
  color: var(--primary-color);
}

.diploma-org-block {
  display: flex;
  align-items: center;
  gap: 8px;
}

.diploma-org-badge {
  color: #fff;
  padding: 3px 8px;
  font-weight: 900;
  font-size: 0.8rem;
  border: 2px solid #1a1a1a;
}

.diploma-org-name {
  font-size: 0.9rem;
  font-weight: 800;
}

.diploma-center-body {
  text-align: center;
}

.diploma-subtitle {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #666;
  margin-bottom: 8px;
}

.diploma-main-title {
  font-size: 1.3rem;
  font-weight: 900;
  line-height: 1.25;
  margin-bottom: 14px;
  color: #1a1a1a;
}

.diploma-awarded-text {
  font-size: 0.8rem;
  font-style: italic;
  color: #444;
}

.diploma-recipient-name {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--primary-color);
  letter-spacing: 1px;
  margin: 4px 0 2px;
}

.diploma-role-tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: #333;
}

.diploma-badge-preview {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.modal-tech-img {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0 #1a1a1a;
  background: #fff;
  padding: 6px;
}

.diploma-foot {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 2px solid #1a1a1a;
  padding-top: 12px;
  font-size: 0.75rem;
}

.foot-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.foot-label {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #666;
}

.foot-val {
  font-weight: 700;
}

.foot-val-id {
  font-family: monospace;
  font-weight: 800;
  color: var(--primary-color);
}

.foot-status-badge {
  font-weight: 800;
  color: #00875a;
}

/* Modal Info Panel */
.modal-info-panel {
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.info-title {
  font-size: 1.4rem;
  font-weight: 900;
  line-height: 1.25;
  margin-bottom: 12px;
  color: var(--text-color);
}

.info-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 20px;
}

.info-meta-list {
  background: var(--bg-color);
  border: var(--border-width) solid var(--border-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.meta-k {
  font-weight: 700;
  color: var(--text-color);
}

.meta-v {
  color: var(--text-color);
}

.cred-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cred-row code {
  font-weight: 800;
  color: var(--primary-color);
}

.copy-mini-btn {
  padding: 3px 8px;
  font-size: 0.75rem;
}

/* Modal Skills */
.modal-skills-box {
  margin-bottom: 24px;
}

.skills-heading {
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.modal-skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.modal-skill-tag {
  background: var(--tertiary-color);
  border: 2px solid var(--border-color);
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 800;
  color: #1a1a1a;
}

.modal-action-row {
  margin-top: auto;
  display: flex;
  gap: 12px;
}

/* ==================== TOAST NOTIFICATION ==================== */
.neo-toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: var(--tertiary-color);
  color: #1a1a1a;
  border: var(--border-width) solid var(--border-color);
  box-shadow: 6px 6px 0 var(--border-color);
  padding: 12px 20px;
  font-weight: 800;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10000;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>

