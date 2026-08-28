// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/style.css'],
  app: {
    head: {
      title: 'Rizky Mochamad Sidik | Portofolio',
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/images/waifu.jpeg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700;900&display=swap' }
      ]
    }
  }
})

