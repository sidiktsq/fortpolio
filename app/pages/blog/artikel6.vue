<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Laravel Framework | Rizky Mochamad Sidik'
})
</script>

<template>
  <div>
    <!-- Hero Header -->
    <section class="hero"
        style="min-height: 30vh; padding: 60px 5%; background-image: linear-gradient(var(--border-color) 2px, transparent 2px), linear-gradient(90deg, var(--border-color) 2px, transparent 2px); background-size: 50px 50px; background-color: var(--primary-color);">
      <div class="hero-content" style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span class="tag"
            style="display: inline-block; background: var(--tertiary-color); color: #1a1a1a; padding: 8px 20px; border: var(--border-width) solid var(--border-color); font-weight: 900; margin-bottom: 20px; font-size: 1rem;">Framework</span>
        <h1 class="article-title">Laravel: Framework PHP Modern untuk Pengembangan Aplikasi Web</h1>
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
          <p>Laravel adalah salah satu framework PHP paling populer di dunia yang digunakan untuk membangun aplikasi web modern. Framework ini pertama kali dikembangkan oleh Taylor Otwell dan dirilis pada tahun 2011 sebagai alternatif yang lebih elegan dan mudah digunakan dibandingkan banyak framework PHP lain pada masanya.</p>
          <p>Sejak awal kemunculannya, Laravel telah berkembang pesat dan menjadi standar de facto bagi pengembang PHP yang ingin membangun aplikasi web dengan kode yang bersih, terstruktur, dan mudah dipelihara.</p>

          <h2>Apa Itu Laravel?</h2>
          <p>Laravel adalah framework PHP open-source yang mengikuti pola arsitektur MVC (Model-View-Controller). Framework ini menyediakan berbagai alat dan pustaka bawaan yang mempermudah tugas-tugas umum dalam pengembangan web seperti routing, autentikasi, session management, dan caching.</p>
          <p>Jika PHP adalah bahasa dasar untuk membangun aplikasi web, maka Laravel adalah kerangka kerja yang menyederhanakan dan mempercepat proses pengembangan secara signifikan.</p>

          <h2>Mengapa Laravel Populer?</h2>
          <p>Laravel terus mendominasi ekosistem PHP karena menawarkan banyak keunggulan yang sangat dibutuhkan oleh developer modern.</p>

          <h3>1. Sintaks yang Elegan</h3>
          <p>Laravel dikenal dengan sintaks yang bersih dan ekspresif. Kode yang ditulis dengan Laravel mudah dibaca dan dipahami, bahkan oleh developer yang baru pertama kali menggunakannya.</p>
          <div class="code-block">
            Route::get('/hello', function () {<br>
            &nbsp;&nbsp;return 'Hello, World!';<br>
            });
          </div>

          <h3>2. Eloquent ORM</h3>
          <p>Laravel menyediakan Eloquent, sebuah Object-Relational Mapping (ORM) yang memudahkan interaksi dengan database menggunakan sintaks PHP yang intuitif.</p>
          <div class="code-block">
            $users = User::where('active', true)->get();<br>
            $post = Post::find(1);<br>
            $post->title = 'Judul Baru';<br>
            $post->save();
          </div>
          <p>Dengan Eloquent, developer tidak perlu menulis query SQL secara manual untuk operasi database yang umum.</p>

          <h3>3. Blade Templating Engine</h3>
          <p>Laravel memiliki Blade, sebuah template engine yang ringan namun powerful. Blade memungkinkan developer membuat layout yang dinamis dan reusable.</p>
          <div class="code-block">
            @extends('layouts.app')<br><br>
            @section('content')<br>
            &nbsp;&nbsp;&lt;h1&gt;{{ $title }}&lt;/h1&gt;<br>
            &nbsp;&nbsp;&lt;p&gt;{{ $content }}&lt;/p&gt;<br>
            @endsection
          </div>

          <h2>Fitur-Fitur Unggulan Laravel</h2>

          <h3>Artisan CLI</h3>
          <p>Laravel dilengkapi dengan Artisan, sebuah command-line interface yang menyediakan berbagai perintah untuk mempercepat pengembangan.</p>
          <div class="code-block">
            php artisan make:model Product -m<br>
            php artisan make:controller ProductController<br>
            php artisan migrate
          </div>
          <p>Artisan mengotomatisasi banyak tugas repetitif sehingga developer dapat fokus pada logika bisnis.</p>

          <h3>Sistem Autentikasi</h3>
          <p>Laravel menyediakan sistem autentikasi yang siap pakai, termasuk login, registrasi, reset password, dan verifikasi email. Dengan Laravel Breeze atau Jetstream, autentikasi dapat diimplementasikan dalam hitungan menit.</p>

          <h3>Migration & Seeder</h3>
          <p>Laravel menggunakan migration untuk mengelola skema database secara terversi. Seeder memungkinkan pengisian data awal untuk keperluan pengujian.</p>
          <div class="code-block">
            Schema::create('products', function (Blueprint $table) {<br>
            &nbsp;&nbsp;$table->id();<br>
            &nbsp;&nbsp;$table->string('name');<br>
            &nbsp;&nbsp;$table->decimal('price', 8, 2);<br>
            &nbsp;&nbsp;$table->timestamps();<br>
            });
          </div>

          <h3>Queue & Job Processing</h3>
          <p>Laravel menyediakan sistem antrian (queue) yang memungkinkan pemrosesan tugas berat secara asinkron, seperti pengiriman email atau pemrosesan gambar.</p>

          <h3>Laravel Ecosystem</h3>
          <p>Laravel memiliki ekosistem yang sangat kaya, termasuk:</p>
          <ul>
            <li><strong>Laravel Forge</strong> — deployment dan manajemen server</li>
            <li><strong>Laravel Vapor</strong> — serverless deployment di AWS</li>
            <li><strong>Laravel Nova</strong> — admin panel</li>
            <li><strong>Laravel Sanctum</strong> — API authentication</li>
            <li><strong>Laravel Livewire</strong> — frontend interaktif tanpa JavaScript</li>
          </ul>

          <h2>Struktur Proyek Laravel</h2>
          <p>Laravel memiliki struktur folder yang terorganisir dengan baik:</p>
          <div class="code-block">
            app/<br>
            &nbsp;&nbsp;Models/<br>
            &nbsp;&nbsp;Http/Controllers/<br>
            config/<br>
            database/<br>
            &nbsp;&nbsp;migrations/<br>
            &nbsp;&nbsp;seeders/<br>
            resources/views/<br>
            routes/<br>
            public/
          </div>
          <p>Struktur ini membantu developer menjaga kode tetap terorganisir dan mudah ditemukan.</p>

          <h2>Kelebihan dan Kekurangan Laravel</h2>
          <div class="pros-cons-grid">
            <div style="background: var(--tertiary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #1a1a1a;">
              <h4 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">Kelebihan</h4>
              <ul style="margin-top: 15px;">
                <li>Sintaks elegan dan mudah dibaca</li>
                <li>Eloquent ORM yang powerful</li>
                <li>Ekosistem yang sangat lengkap</li>
                <li>Komunitas besar dan aktif</li>
                <li>Dokumentasi yang sangat baik</li>
                <li>Sistem autentikasi bawaan</li>
                <li>Artisan CLI yang membantu produktivitas</li>
                <li>Dukungan testing yang kuat</li>
              </ul>
            </div>
            <div style="background: var(--primary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #1a1a1a;">
              <h4 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">Kekurangan</h4>
              <ul style="margin-top: 15px;">
                <li>Performa lebih lambat dibanding framework minimalis</li>
                <li>Membutuhkan pemahaman PHP yang cukup baik</li>
                <li>Ukuran framework relatif besar</li>
                <li>Upgrade antar versi major kadang memerlukan perubahan signifikan</li>
              </ul>
            </div>
          </div>

          <h2>Masa Depan Laravel</h2>
          <p>Laravel terus berevolusi dengan setiap rilis baru. Dengan fitur-fitur terbaru seperti Laravel Livewire untuk interaktivitas frontend, Laravel Octane untuk performa tinggi, dan integrasi AI yang semakin berkembang, Laravel tetap menjadi pilihan utama bagi developer PHP di seluruh dunia.</p>

          <h2>Kesimpulan</h2>
          <p>Laravel adalah framework PHP yang mengutamakan keeleganan kode, produktivitas developer, dan kelengkapan fitur. Dengan ekosistem yang kaya, komunitas yang besar, dan dokumentasi yang sangat baik, Laravel menjadi pilihan ideal untuk membangun aplikasi web modern dari skala kecil hingga enterprise.</p>
          <p>Bagi developer yang ingin membangun aplikasi web dengan PHP secara profesional, Laravel adalah salah satu framework terbaik yang tersedia saat ini.</p>
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
