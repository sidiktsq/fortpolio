import fs from 'node:fs'
import path from 'node:path'

// Copy optimized images from artifacts directory to public folder
try {
  const artifactsDir = 'C:\\Users\\Hype\\.gemini\\antigravity-ide\\brain\\67e61e7a-7a66-4850-9daa-f48b6a74556f'
  const chibiSrc = path.join(artifactsDir, 'chibi_custom_1780791247183.png')
  const chibiDest = 'c:\\Users\\Hype\\Documents\\portofolio\\public\\gallery\\chibi_custom.png'
  
  if (fs.existsSync(chibiSrc)) {
    fs.copyFileSync(chibiSrc, chibiDest)
  }

  const profileSrc = path.join(artifactsDir, 'profile_custom_1780791275706.png')
  const profileDest = 'c:\\Users\\Hype\\Documents\\portofolio\\public\\images\\profile_custom.png'
  
  if (fs.existsSync(profileSrc)) {
    fs.copyFileSync(profileSrc, profileDest)
  }
} catch (err) {
  console.error('Error copying optimized images:', err)
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
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

