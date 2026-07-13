<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Blog | Rizky Mochamad Sidik'
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero" style="min-height: 40vh; padding: 60px 5%;">
      <div class="hero-content" v-reveal="'slide-up'" style="max-width: 800px; margin: 0 auto; text-align: center;">
        <h1>DEV <span class="highlight">NOTES</span></h1>
        <p style="margin-top: 20px;">Tulisan santai seputar dunia programming, web development, dan teknologi terbaru.</p>
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
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Design</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Neo-Brutalism UI: Tren Desain Antarmuka Modern yang Berani, Unik, dan Berkarakter</h3>
            <p>Tren desain web terus berkembang. Mengapa nuxt.js dengan garis tegas dan warna kontras tetap relevan hingga saat ini? Mari kita bedah alasannya.</p>
            <NuxtLink to="/blog/artikel1" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>

        <!-- Article 2 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/sql.webp" alt="MySQL cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Database</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Optimasi Database MySQL untuk Skala Besar</h3>
            <p>Saat aplikasi mulai ramai pengguna, query yang lambat menjadi musuh utama. Berikut adalah 5 teknik indexing yang sering dilupakan developer pemula.</p>
            <NuxtLink to="/blog/artikel2" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>

        <!-- Article 3 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 200 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/react.webp" alt="React cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Frontend</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Masa Depan React & Server Components</h3>
            <p>RSC (React Server Components) mengubah cara kita berpikir tentang state dan fetching data. Apakah ini merupakan akhir dari dominasi Redux?</p>
            <NuxtLink to="/blog/artikel3" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>

        <!-- Article 4 -->
        <div class="project-card" v-reveal="'pop'">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/vs.webp" alt="VS Code cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">VSCODE</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Visual Studio Code (VS Code): Editor Kode Modern yang Mengubah Cara Programmer Bekerja</h3>
            <p>Di dunia pengembangan perangkat lunak yang terus berkembang, pemilihan alat kerja menjadi salah satu faktor penting yang memengaruhi produktivitas seorang programmer</p>
            <NuxtLink to="/blog/artikel4" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>

        <!-- Article 5 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/nut.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Framework</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Nuxt.js: Framework Modern untuk Membangun Aplikasi Web yang Cepat dan SEO-Friendly</h3>
            <p>Nuxt adalah framework open-source yang dibangun di atas Vue.js untuk mempermudah pengembangan aplikasi web modern. Nuxt dirancang agar developer dapat membangun website dan aplikasi dengan performa tinggi, struktur proyek yang rapi, serta optimasi SEO yang lebih baik dibandingkan aplikasi Vue biasa.</p>
            <NuxtLink to="/blog/artikel5" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>

        <!-- Article 6 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 200 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/laravel.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Framework</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Laravel: Framework PHP Modern untuk Pengembangan Aplikasi Web</h3>
            <p>Laravel adalah salah satu framework PHP paling populer di dunia yang digunakan untuk membangun aplikasi web modern. Framework ini pertama kali dikembangkan oleh Taylor Otwell dan dirilis pada tahun 2011 sebagai alternatif yang lebih elegan dan mudah digunakan dibandingkan banyak framework PHP lain pada masanya.</p>
            <NuxtLink to="/blog/artikel6" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>
        <!-- Article 7 -->
         <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/nut.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Framework</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Cara Menggunakan Resend di Nuxt.js untuk Mengirim Email dengan Mudah</h3>
            <p>Di era aplikasi web modern, fitur pengiriman email menjadi salah satu kebutuhan yang hampir selalu ada. Mulai dari formulir kontak, notifikasi akun, email verifikasi, reset password, hingga newsletter</p>
            <NuxtLink to="/blog/artikel7" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>
        <!-- artikel 8 -->
        <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/framework.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Framework</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Framework Paling Populer untuk Web Development: Panduan Lengkap Memilih Framework Terbaik</h3>
            <p>Dalam dunia pengembangan perangkat lunak, khususnya web development, penggunaan framework telah menjadi standar bagi para developer.</p>
            <NuxtLink to="/blog/artikel8" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>
        <!-- artikel 9 -->
         <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/pinia.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">Framework</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Alasan Harus Menggunakan Pinia pada Proyek Vue.js dan Nuxt</h3>
            <p>Ketika membangun aplikasi menggunakan Vue.js atau Nuxt, mengelola data yang digunakan oleh banyak komponen sering kali menjadi tantangan.</p>
            <NuxtLink to="/blog/artikel9" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>
        <!-- artikel 10  -->
         <div class="project-card" v-reveal="{ type: 'pop', delay: 100 }">
          <div style="height: 200px; background-color: var(--secondary-color); border-bottom: var(--border-width) solid var(--border-color); display: flex; align-items: center; justify-content: center;">
            <img src="/images/ui.webp" alt="Nuxt cover" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="project-info">
            <span class="tag" style="display: inline-block; width: max-content; margin-bottom: 15px; font-size: 0.8rem;">UI</span>
            <h3 style="font-size: 1.3rem; line-height: 1.3;">Macam-Macam UI Website: Mengenal Berbagai Jenis Antarmuka yang Digunakan pada Website Modern.</h3>
            <p>Dalam dunia pengembangan website, tampilan antarmuka atau **User Interface (UI)** memiliki peran yang sangat penting.</p>
            <NuxtLink to="/blog/artikel10" class="btn btn-small" style="align-self: flex-start; margin-top: auto;">Baca Artikel</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
