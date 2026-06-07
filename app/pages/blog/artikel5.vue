<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Nuxt.js Framework | Rizky Mochamad Sidik'
})
</script>

<template>
  <div>
    <!-- Hero Header -->
    <section class="hero"
        style="min-height: 30vh; padding: 60px 5%; background-image: linear-gradient(var(--border-color) 2px, transparent 2px), linear-gradient(90deg, var(--border-color) 2px, transparent 2px); background-size: 50px 50px; background-color: var(--secondary-color);">
      <div class="hero-content" style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span class="tag"
            style="display: inline-block; background: var(--tertiary-color); color: #1a1a1a; padding: 8px 20px; border: var(--border-width) solid var(--border-color); font-weight: 900; margin-bottom: 20px; font-size: 1rem;">Frontend</span>
        <h1 class="article-title">Nuxt.js: Framework Modern untuk Membangun Aplikasi Web yang Cepat dan SEO-Friendly</h1>
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
          <span>Kembali ke Daftar Blog</span>
        </NuxtLink>

        <div class="article-content">
          <p>Nuxt adalah framework open-source yang dibangun di atas Vue.js untuk mempermudah pengembangan aplikasi web modern. Nuxt dirancang agar developer dapat membangun website dan aplikasi dengan performa tinggi, struktur proyek yang rapi, serta optimasi SEO yang lebih baik dibandingkan aplikasi Vue biasa.</p>
          <p>Sejar sejak pertama kali diperkenalkan, Nuxt menjadi salah satu framework favorit di ekosistem Vue karena mampu mengurangi kompleksitas konfigurasi dan menyediakan banyak fitur bawaan yang siap digunakan. Dengan Nuxt, pengembang tidak perlu mengatur banyak konfigurasi secara manual karena sebagian besar kebutuhan dasar sudah tersedia secara otomatis.</p>

          <h2>Apa Itu Nuxt?</h2>
          <p>Secara sederhana, Nuxt adalah framework yang membantu developer membangun aplikasi berbasis Vue dengan lebih cepat dan efisien. Jika Vue dapat diibaratkan sebagai mesin utama sebuah kendaraan, maka Nuxt adalah kendaraan lengkap yang sudah memiliki berbagai fitur penting sehingga siap digunakan untuk perjalanan jauh.</p>
          <p>Nuxt mendukung berbagai metode rendering, seperti:</p>
          <ul>
            <li>Server-Side Rendering (SSR)</li>
            <li>Client-Side Rendering (CSR)</li>
            <li>Static Site Generation (SSG)</li>
            <li>Hybrid Rendering</li>
          </ul>
          <p>Fleksibilitas ini memungkinkan developer memilih pendekatan yang paling sesuai dengan kebutuhan proyek.</p>

          <h2>Mengapa Nuxt Populer?</h2>
          <p>Popularitas Nuxt terus meningkat karena menawarkan berbagai keuntungan yang sangat dibutuhkan dalam pengembangan web modern.</p>

          <h3>1. SEO yang Lebih Baik</h3>
          <p>Salah satu kelemahan aplikasi Single Page Application (SPA) tradisional adalah optimasi mesin pencari yang kurang maksimal. Nuxt mengatasi masalah ini dengan Server-Side Rendering sehingga halaman dapat dirender terlebih dahulu di server sebelum dikirim ke browser.</p>
          <p>Hasilnya:</p>
          <ul>
            <li>Konten lebih mudah diindeks mesin pencari.</li>
            <li>Ranking SEO dapat meningkat.</li>
            <li>Waktu tampil halaman pertama lebih cepat.</li>
          </ul>

          <h3>2. Struktur Proyek yang Terorganisir</h3>
          <p>Nuxt memiliki struktur folder yang jelas dan konsisten. Beberapa folder penting antara lain:</p>
          <div class="code-block">
            pages/<br>
            components/<br>
            layouts/<br>
            middleware/<br>
            server/<br>
            assets/<br>
            public/
          </div>
          <p>Dengan struktur tersebut, proyek menjadi lebih mudah dipelajari dan dipelihara, terutama ketika dikerjakan oleh banyak developer.</p>

          <h3>3. Routing Otomatis</h3>
          <p>Dalam Vue biasa, developer perlu mengatur router secara manual. Nuxt secara otomatis membuat routing berdasarkan file yang ada di folder <code>pages</code>.</p>
          <p>Contoh: file <code>pages/index.vue</code> akan menjadi route <code>/</code>, sedangkan <code>pages/about.vue</code> akan menjadi route <code>/about</code>. Fitur ini menghemat waktu dan mengurangi jumlah kode yang harus ditulis.</p>

          <h2>Fitur-Fitur Unggulan Nuxt</h2>

          <h3>Auto Import</h3>
          <p>Nuxt dapat mengimpor komponen, composable, dan utility secara otomatis tanpa perlu menulis banyak perintah import.</p>
          <div class="code-block">
            &lt;template&gt;<br>
            &nbsp;&nbsp;&lt;Navbar /&gt;<br>
            &lt;/template&gt;
          </div>
          <p>Komponen dapat langsung digunakan tanpa import manual.</p>

          <h3>Data Fetching Modern</h3>
          <p>Nuxt menyediakan berbagai cara mengambil data dari API dengan pendekatan yang sederhana.</p>
          <div class="code-block">
            const { data } = await useFetch('/api/products')
          </div>
          <p>Kode tersebut jauh lebih ringkas dibandingkan konfigurasi manual pada banyak framework lain.</p>

          <h3>TypeScript Support</h3>
          <p>Nuxt memiliki dukungan bawaan untuk TypeScript sehingga developer dapat membangun aplikasi yang lebih aman dan mudah dipelihara.</p>

          <h3>Server API</h3>
          <p>Nuxt memungkinkan pembuatan endpoint backend langsung di dalam proyek menggunakan folder <code>server</code>.</p>
          <div class="code-block">
            export default defineEventHandler(() => {<br>
            &nbsp;&nbsp;return {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;message: "Hello Nuxt"<br>
            &nbsp;&nbsp;}<br>
            })
          </div>
          <p>Pendekatan ini membuat Nuxt mampu berfungsi sebagai full-stack framework.</p>

          <h2>Nuxt 3: Generasi Baru yang Lebih Cepat</h2>
          <p>Versi terbaru Nuxt menghadirkan banyak peningkatan signifikan, termasuk:</p>
          <ul>
            <li>Performa yang lebih tinggi</li>
            <li>Dukungan penuh Vue 3</li>
            <li>Integrasi Nitro Server Engine</li>
            <li>Hybrid Rendering</li>
            <li>Auto Imports yang lebih cerdas</li>
            <li>Dukungan TypeScript yang lebih baik</li>
          </ul>
          <p>Dengan teknologi baru tersebut, aplikasi dapat berjalan lebih cepat dan lebih hemat sumber daya.</p>

          <h2>Kapan Sebaiknya Menggunakan Nuxt?</h2>
          <p>Nuxt sangat cocok untuk berbagai jenis proyek:</p>

          <h3>Website Perusahaan</h3>
          <p>Website profil perusahaan membutuhkan SEO yang baik agar mudah ditemukan di mesin pencari.</p>

          <h3>Blog dan Portal Berita</h3>
          <p>Rendering di server membantu artikel lebih cepat terindeks oleh mesin pencari.</p>

          <h3>E-Commerce</h3>
          <p>Performa cepat dan SEO yang kuat sangat penting untuk meningkatkan penjualan dan pengalaman pengguna.</p>

          <h3>Dashboard Modern</h3>
          <p>Dengan fitur Vue yang lengkap, Nuxt juga mampu membangun dashboard administratif yang kompleks.</p>

          <h2>Kelebihan dan Kekurangan Nuxt</h2>
          <div class="pros-cons-grid">
            <div style="background: var(--tertiary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #1a1a1a;">
              <h4 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">Kelebihan</h4>
              <ul style="margin-top: 15px;">
                <li>SEO-friendly</li>
                <li>Struktur proyek rapi</li>
                <li>Routing otomatis</li>
                <li>Dukungan Vue 3</li>
                <li>Performa tinggi</li>
                <li>Auto import</li>
                <li>Mendukung SSR dan SSG</li>
                <li>Cocok untuk aplikasi skala kecil hingga besar</li>
              </ul>
            </div>
            <div style="background: var(--primary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #1a1a1a;">
              <h4 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">Kekurangan</h4>
              <ul style="margin-top: 15px;">
                <li>Kurva belajar sedikit lebih tinggi dibanding Vue dasar.</li>
                <li>Beberapa konsep SSR memerlukan pemahaman tambahan.</li>
                <li>Ukuran proyek dapat menjadi kompleks pada aplikasi yang sangat besar.</li>
              </ul>
            </div>
          </div>

          <h2>Masa Depan Nuxt</h2>
          <p>Dengan semakin tingginya kebutuhan akan aplikasi web yang cepat, responsif, dan ramah mesin pencari, Nuxt diperkirakan akan terus menjadi salah satu framework terdepan dalam ekosistem Vue. Dukungan komunitas yang besar, pembaruan rutin, dan inovasi berkelanjutan menjadikan Nuxt sebagai pilihan yang sangat menarik bagi developer modern.</p>

          <h2>Kesimpulan</h2>
          <p>Nuxt adalah framework yang membawa pengalaman pengembangan Vue ke level yang lebih tinggi. Dengan fitur seperti Server-Side Rendering, Static Site Generation, routing otomatis, dan dukungan penuh untuk teknologi modern, Nuxt membantu developer membangun aplikasi web yang cepat, terstruktur, dan mudah ditemukan di mesin pencari.</p>
          <p>Bagi siapa pun yang ingin mengembangkan website profesional menggunakan Vue, Nuxt merupakan salah satu pilihan terbaik yang tersedia saat ini.</p>
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
