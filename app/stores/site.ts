import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSiteStore = defineStore('site', () => {
  const currentLang = ref<'id' | 'en' | 'zh' | 'ja'>('id')
  const isDark = ref(false)

  const languages = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: 'ZH' },
    { code: 'ja', label: 'JA' }
  ] as const

  const setLanguage = (code: 'id' | 'en' | 'zh' | 'ja') => {
    currentLang.value = code

    if (import.meta.client) {
      localStorage.setItem('lang', code)
    }
  }

  const applyPersistedState = () => {
    if (!import.meta.client) return

    const savedLang = localStorage.getItem('lang') as 'id' | 'en' | 'zh' | 'ja' | null
    if (savedLang && ['id', 'en', 'zh', 'ja'].includes(savedLang)) {
      currentLang.value = savedLang
    }

    const savedTheme = localStorage.getItem('theme')
    isDark.value = savedTheme === 'dark'

    if (isDark.value) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value

    if (import.meta.client) {
      if (isDark.value) {
        document.body.classList.add('dark-mode')
        localStorage.setItem('theme', 'dark')
      } else {
        document.body.classList.remove('dark-mode')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  return {
    currentLang,
    isDark,
    languages,
    setLanguage,
    applyPersistedState,
    toggleTheme
  }
})
