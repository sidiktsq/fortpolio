<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Integrasi Resend & Nuxt.js | Rizky Mochamad Sidik'
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
        <h1 class="article-title">Cara Menggunakan Resend di Nuxt.js untuk Mengirim Email dengan Mudah</h1>
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

        <div class="article-content" v-reveal="'pop'">
          <p>Di era aplikasi web modern, fitur pengiriman email menjadi salah satu kebutuhan yang hampir selalu ada. Mulai dari formulir kontak, notifikasi akun, email verifikasi, reset password, hingga newsletter. Jika dulu kita harus mengatur SMTP yang cukup rumit, sekarang tersedia layanan yang jauh lebih sederhana, salah satunya adalah <strong>Resend</strong>.</p>
          <p>Resend adalah layanan Email API modern yang dirancang khusus for developer. Dengan API yang sederhana, dokumentasi yang lengkap, dan performa yang cepat, Resend menjadi pilihan populer bagi pengembang React, Next.js, maupun Nuxt.js.</p>
          <p>Pada artikel ini kita akan membahas bagaimana cara mengintegrasikan Resend ke dalam proyek Nuxt.js dari awal hingga berhasil mengirim email.</p>

          <h2>Apa Itu Resend?</h2>
          <p>Resend adalah layanan Email API yang memungkinkan aplikasi mengirim email menggunakan REST API atau SDK resmi.</p>
          <p>Beberapa kelebihan Resend antara lain:</p>
          <ul>
            <li>API sangat sederhana.</li>
            <li>Dokumentasi lengkap.</li>
            <li>Mendukung React Email.</li>
            <li>Mudah digunakan bersama Nuxt.js.</li>
            <li>Keamanan API Key yang baik.</li>
            <li>Dashboard untuk melihat riwayat email.</li>
            <li>Mendukung domain sendiri agar email terlihat profesional.</li>
          </ul>
          <p>Karena kemudahan tersebut, banyak developer memilih Resend dibanding harus mengatur SMTP secara manual.</p>

          <h2>Persiapan</h2>
          <p>Sebelum memulai, pastikan Anda memiliki:</p>
          <ul>
            <li>Node.js versi terbaru.</li>
            <li>Proyek Nuxt.js.</li>
            <li>Akun Resend.</li>
            <li>API Key dari dashboard Resend.</li>
          </ul>
          <p>Jika belum memiliki proyek Nuxt, buat terlebih dahulu.</p>
          <div class="code-block">
            npx nuxi@latest init nuxt-resend
          </div>
          <p>Masuk ke folder proyek.</p>
          <div class="code-block">
            cd nuxt-resend
          </div>
          <p>Install dependency.</p>
          <div class="code-block">
            npm install
          </div>
          <p>Jalankan aplikasi.</p>
          <div class="code-block">
            npm run dev
          </div>

          <h2>Menginstal SDK Resend</h2>
          <p>Install package Resend.</p>
          <div class="code-block">
            npm install resend
          </div>
          <p>Setelah selesai, dependency baru akan muncul di <code>package.json</code>.</p>

          <h2>Menyimpan API Key</h2>
          <p>Buat file <code>.env</code></p>
          <div class="code-block">
            RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
          </div>
          <p>Lalu buka <code>nuxt.config.ts</code></p>
          <div class="code-block">
            export default defineNuxtConfig({<br>
            &nbsp;&nbsp;runtimeConfig: {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;resendApiKey: process.env.RESEND_API_KEY<br>
            &nbsp;&nbsp;}<br>
            })
          </div>
          <p>Menggunakan Runtime Config jauh lebih aman dibanding menuliskan API Key langsung pada source code.</p>

          <h2>Membuat API Server</h2>
          <p>Nuxt memiliki Nitro Server sehingga kita tidak memerlukan Express atau server tambahan.</p>
          <p>Buat file <code>server/api/send-email.post.ts</code> dan isi dengan kode berikut.</p>
          <div class="code-block">
            import { Resend } from "resend"<br><br>
            export default defineEventHandler(async (event) => {<br>
            &nbsp;&nbsp;const config = useRuntimeConfig()<br>
            &nbsp;&nbsp;const resend = new Resend(config.resendApiKey)<br>
            &nbsp;&nbsp;const body = await readBody(event)<br><br>
            &nbsp;&nbsp;const data = await resend.emails.send({<br>
            &nbsp;&nbsp;&nbsp;&nbsp;from: "onboarding@resend.dev",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;to: body.email,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;subject: body.subject,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;html: `&lt;h2&gt;${body.message}&lt;/h2&gt;`<br>
            &nbsp;&nbsp;})<br><br>
            &nbsp;&nbsp;return data<br>
            })
          </div>
          <p>API di atas akan menerima request POST lalu meneruskannya ke layanan Resend.</p>

          <h2>Membuat Halaman Form</h2>
          <p>Misalnya buat halaman <code>pages/index.vue</code>.</p>
          <div class="code-block">
            &lt;script setup lang="ts"&gt;<br>
            const email = ref("")<br>
            const subject = ref("")<br>
            const message = ref("")<br><br>
            const sendEmail = async () => {<br>
            &nbsp;&nbsp;await $fetch("/api/send-email",{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;method:"POST",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;body:{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:email.value,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subject:subject.value,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:message.value<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;})<br><br>
            &nbsp;&nbsp;alert("Email berhasil dikirim")<br>
            }<br>
            &lt;/script&gt;<br><br>
            &lt;template&gt;<br>
            &lt;div&gt;<br>
            &nbsp;&nbsp;&lt;input v-model="email" placeholder="Email"&gt;<br>
            &nbsp;&nbsp;&lt;input v-model="subject" placeholder="Subject"&gt;<br>
            &nbsp;&nbsp;&lt;textarea v-model="message"&gt;&lt;/textarea&gt;<br>
            &nbsp;&nbsp;&lt;button @click="sendEmail"&gt;Kirim Email&lt;/button&gt;<br>
            &lt;/div&gt;<br>
            &lt;/template&gt;
          </div>
          <p>Sekarang aplikasi sudah dapat mengirim email melalui endpoint server.</p>

          <h2>Menambahkan Validasi</h2>
          <p>Jangan langsung mengirim email tanpa memeriksa input pengguna. Contoh sederhana:</p>
          <div class="code-block">
            if (!email.value) {<br>
            &nbsp;&nbsp;alert("Email wajib diisi")<br>
            &nbsp;&nbsp;return<br>
            }
          </div>
          <p>Atau gunakan library validasi seperti Zod, Yup, atau Vee Validate. Validasi membantu mencegah request yang tidak valid dan meningkatkan pengalaman pengguna.</p>

          <h2>Menggunakan Domain Sendiri</h2>
          <p>Saat pertama kali menggunakan Resend, Anda bisa memakai alamat bawaan seperti <code>onboarding@resend.dev</code>. Namun untuk aplikasi produksi sebaiknya gunakan domain sendiri, misalnya <code>noreply@websiteanda.com</code>.</p>
          <p>Caranya:</p>
          <ol style="margin-left: 20px; margin-bottom: 20px;">
            <li style="margin-bottom: 8px;">Tambahkan domain di dashboard Resend.</li>
            <li style="margin-bottom: 8px;">Verifikasi DNS.</li>
            <li style="margin-bottom: 8px;">Tunggu hingga status menjadi Verified.</li>
            <li style="margin-bottom: 8px;">Ganti alamat pengirim pada kode.</li>
          </ol>
          <p>Dengan domain sendiri, email lebih profesional dan peluang masuk ke folder spam menjadi lebih kecil.</p>

          <h2>Menangani Error</h2>
          <p>Jangan lupa menangani kemungkinan gagal mengirim email. Contoh:</p>
          <div class="code-block">
            try {<br>
            &nbsp;&nbsp;await $fetch("/api/send-email",{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;method:"POST",<br>
            &nbsp;&nbsp;&nbsp;&nbsp;body:{<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:email.value,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subject:subject.value,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message:message.value<br>
            &nbsp;&nbsp;&nbsp;&nbsp;}<br>
            &nbsp;&nbsp;})<br>
            } catch(err) {<br>
            &nbsp;&nbsp;console.log(err)<br>
            }
          </div>
          <p>Dengan begitu aplikasi tidak akan langsung crash ketika terjadi kesalahan.</p>

          <h2>Mengirim ke Banyak Penerima</h2>
          <p>Resend mendukung beberapa alamat email sekaligus:</p>
          <div class="code-block">
            to: [<br>
            &nbsp;&nbsp;"admin@example.com",<br>
            &nbsp;&nbsp;"owner@example.com"<br>
            ]
          </div>
          <p>Ini sangat berguna untuk notifikasi tim atau laporan otomatis.</p>

          <h2>Mengirim HTML yang Lebih Menarik</h2>
          <p>Selain HTML sederhana, Anda dapat membuat email yang lebih menarik. Bahkan Resend mendukung React Email sehingga template email dapat dibuat menggunakan komponen React.</p>

          <h2>Tips Keamanan</h2>
          <ul>
            <li>Jangan pernah mengekspos API Key ke browser.</li>
            <li>Gunakan Runtime Config.</li>
            <li>Simpan API Key di file <code>.env</code>.</li>
            <li>Gunakan endpoint server untuk mengirim email.</li>
            <li>Terapkan rate limiting jika formulir dapat diakses publik.</li>
            <li>Validasi semua input pengguna.</li>
          </ul>

          <h2>Kelebihan Menggunakan Resend Bersama Nuxt.js</h2>
          <ul>
            <li>Integrasi sangat mudah.</li>
            <li>Tidak perlu SMTP manual.</li>
            <li>API sederhana.</li>
            <li>Performa cepat.</li>
            <li>Dokumentasi lengkap.</li>
            <li>Mendukung TypeScript.</li>
            <li>Mudah diintegrasikan dengan Nitro Server.</li>
            <li>Cocok untuk aplikasi kecil maupun besar.</li>
          </ul>

          <h2>Kapan Sebaiknya Menggunakan Resend?</h2>
          <ul>
            <li>Formulir kontak.</li>
            <li>Reset password.</li>
            <li>Email verifikasi akun.</li>
            <li>Newsletter.</li>
            <li>Invoice.</li>
            <li>Notifikasi transaksi.</li>
            <li>Laporan otomatis.</li>
            <li>Konfirmasi pemesanan.</li>
            <li>Email selamat datang untuk pengguna baru.</li>
          </ul>

          <h2>Kesimpulan</h2>
          <p>Resend merupakan solusi modern untuk pengiriman email yang sangat cocok dipadukan dengan Nuxt.js. Proses integrasinya relatif sederhana, mulai dari instalasi SDK, penyimpanan API Key menggunakan Runtime Config, pembuatan endpoint di Nitro Server, hingga pemanggilan API dari komponen Vue. Dengan menambahkan validasi input, penanganan error, dan menggunakan domain yang telah diverifikasi, Anda dapat membangun sistem email yang aman, profesional, dan andal.</p>
          <p>Bagi developer Nuxt.js, Resend menawarkan keseimbangan antara kemudahan penggunaan dan fitur yang lengkap. Anda tidak perlu lagi bergantung pada konfigurasi SMTP yang rumit, sehingga dapat lebih fokus mengembangkan fitur utama aplikasi. Jika proyek Anda membutuhkan pengiriman email yang cepat, mudah diintegrasikan, dan skalabel, maka Resend adalah salah satu pilihan yang sangat layak untuk dipertimbangkan.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.article-content {
  max-width: 900px;
  margin: 40px auto 80px auto;
  padding: 40px;
  background: var(--card-bg);
  border: var(--border-width) solid var(--border-color);
  box-shadow: 8px 8px 0 var(--border-color);
  font-size: 1.15rem;
  line-height: 1.8;
}

.article-content h2 {
  font-size: 1.8rem;
  font-weight: 900;
  margin-top: 40px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.article-content h3 {
  font-size: 1.4rem;
  font-weight: 900;
  margin-top: 30px;
  margin-bottom: 15px;
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

  .tag {
    font-size: 0.8rem;
    padding: 6px 15px;
    border: 2px solid var(--border-color);
  }
}
</style>
