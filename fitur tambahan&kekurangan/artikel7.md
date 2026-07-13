# Cara Menggunakan Resend di Nuxt.js untuk Mengirim Email dengan Mudah

Di era aplikasi web modern, fitur pengiriman email menjadi salah satu kebutuhan yang hampir selalu ada. Mulai dari formulir kontak, notifikasi akun, email verifikasi, reset password, hingga newsletter. Jika dulu kita harus mengatur SMTP yang cukup rumit, sekarang tersedia layanan yang jauh lebih sederhana, salah satunya adalah **Resend**.

Resend adalah layanan Email API modern yang dirancang khusus untuk developer. Dengan API yang sederhana, dokumentasi yang lengkap, dan performa yang cepat, Resend menjadi pilihan populer bagi pengembang React, Next.js, maupun Nuxt.js.

Pada artikel ini kita akan membahas bagaimana cara mengintegrasikan Resend ke dalam proyek Nuxt.js dari awal hingga berhasil mengirim email.

---

# Apa Itu Resend?

Resend adalah layanan Email API yang memungkinkan aplikasi mengirim email menggunakan REST API atau SDK resmi.

Beberapa kelebihan Resend antara lain:

* API sangat sederhana.
* Dokumentasi lengkap.
* Mendukung React Email.
* Mudah digunakan bersama Nuxt.js.
* Keamanan API Key yang baik.
* Dashboard untuk melihat riwayat email.
* Mendukung domain sendiri agar email terlihat profesional.

Karena kemudahan tersebut, banyak developer memilih Resend dibanding harus mengatur SMTP secara manual.

---

# Persiapan

Sebelum memulai, pastikan Anda memiliki:

* Node.js versi terbaru.
* Proyek Nuxt.js.
* Akun Resend.
* API Key dari dashboard Resend.

Jika belum memiliki proyek Nuxt, buat terlebih dahulu.

```bash
npx nuxi@latest init nuxt-resend
```

Masuk ke folder proyek.

```bash
cd nuxt-resend
```

Install dependency.

```bash
npm install
```

Jalankan aplikasi.

```bash
npm run dev
```

---

# Menginstal SDK Resend

Install package Resend.

```bash
npm install resend
```

Setelah selesai, dependency baru akan muncul di `package.json`.

---

# Menyimpan API Key

Buat file `.env`

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
```

Lalu buka `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY
  }
})
```

Menggunakan Runtime Config jauh lebih aman dibanding menuliskan API Key langsung pada source code.

---

# Membuat API Server

Nuxt memiliki Nitro Server sehingga kita tidak memerlukan Express atau server tambahan.

Buat file berikut.

```
server/api/send-email.post.ts
```

Isi dengan kode berikut.

```ts
import { Resend } from "resend"

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()

  const resend = new Resend(config.resendApiKey)

  const body = await readBody(event)

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: body.email,
    subject: body.subject,
    html: `<h2>${body.message}</h2>`
  })

  return data
})
```

API di atas akan menerima request POST lalu meneruskannya ke layanan Resend.

---

# Membuat Halaman Form

Misalnya buat halaman.

```
pages/index.vue
```

```vue
<script setup lang="ts">
const email = ref("")
const subject = ref("")
const message = ref("")

const sendEmail = async () => {
  await $fetch("/api/send-email",{
    method:"POST",
    body:{
      email:email.value,
      subject:subject.value,
      message:message.value
    }
  })

  alert("Email berhasil dikirim")
}
</script>

<template>

<div>

<input v-model="email" placeholder="Email">

<input v-model="subject" placeholder="Subject">

<textarea
v-model="message">
</textarea>

<button @click="sendEmail">
Kirim Email
</button>

</div>

</template>
```

Sekarang aplikasi sudah dapat mengirim email melalui endpoint server.

---

# Menambahkan Validasi

Jangan langsung mengirim email tanpa memeriksa input pengguna.

Contoh sederhana.

```ts
if (!email.value) {
  alert("Email wajib diisi")
  return
}
```

Atau gunakan library validasi seperti:

* Zod
* Yup
* Vee Validate

Validasi membantu mencegah request yang tidak valid dan meningkatkan pengalaman pengguna.

---

# Menggunakan Domain Sendiri

Saat pertama kali menggunakan Resend, Anda bisa memakai alamat bawaan seperti:

```
onboarding@resend.dev
```

Namun untuk aplikasi produksi sebaiknya gunakan domain sendiri, misalnya:

```
noreply@websiteanda.com
```

Caranya:

1. Tambahkan domain di dashboard Resend.
2. Verifikasi DNS.
3. Tunggu hingga status menjadi Verified.
4. Ganti alamat pengirim pada kode.

Dengan domain sendiri, email lebih profesional dan peluang masuk ke folder spam menjadi lebih kecil.

---

# Menangani Error

Jangan lupa menangani kemungkinan gagal mengirim email.

Contoh:

```ts
try {

  await $fetch("/api/send-email",{
    method:"POST",
    body:{
      email:email.value,
      subject:subject.value,
      message:message.value
    }
  })

}catch(err){

  console.log(err)

}
```

Dengan begitu aplikasi tidak akan langsung crash ketika terjadi kesalahan.

---

# Mengirim ke Banyak Penerima

Resend mendukung beberapa alamat email sekaligus.

```ts
to: [
  "admin@example.com",
  "owner@example.com"
]
```

Ini sangat berguna untuk notifikasi tim atau laporan otomatis.

---

# Mengirim HTML yang Lebih Menarik

Selain HTML sederhana, Anda dapat membuat email yang lebih menarik.

Misalnya:

```html
<div style="padding:40px">

<h1>Halo!</h1>

<p>Terima kasih sudah mendaftar.</p>

</div>
```

Bahkan Resend mendukung React Email sehingga template email dapat dibuat menggunakan komponen React.

---

# Tips Keamanan

Beberapa hal yang wajib diperhatikan:

* Jangan pernah mengekspos API Key ke browser.
* Gunakan Runtime Config.
* Simpan API Key di file `.env`.
* Gunakan endpoint server untuk mengirim email.
* Terapkan rate limiting jika formulir dapat diakses publik.
* Validasi semua input pengguna.

Dengan mengikuti praktik tersebut, aplikasi menjadi lebih aman dari penyalahgunaan.

---

# Kelebihan Menggunakan Resend Bersama Nuxt.js

Menggabungkan Nuxt.js dan Resend memberikan banyak keuntungan:

* Integrasi sangat mudah.
* Tidak perlu SMTP manual.
* API sederhana.
* Performa cepat.
* Dokumentasi lengkap.
* Mendukung TypeScript.
* Mudah diintegrasikan dengan Nitro Server.
* Cocok untuk aplikasi kecil maupun besar.

---

# Kapan Sebaiknya Menggunakan Resend?

Resend cocok digunakan untuk berbagai kebutuhan seperti:

* Formulir kontak.
* Reset password.
* Email verifikasi akun.
* Newsletter.
* Invoice.
* Notifikasi transaksi.
* Laporan otomatis.
* Konfirmasi pemesanan.
* Email selamat datang untuk pengguna baru.

---

# Kesimpulan

Resend merupakan solusi modern untuk pengiriman email yang sangat cocok dipadukan dengan Nuxt.js. Proses integrasinya relatif sederhana, mulai dari instalasi SDK, penyimpanan API Key menggunakan Runtime Config, pembuatan endpoint di Nitro Server, hingga pemanggilan API dari komponen Vue. Dengan menambahkan validasi input, penanganan error, dan menggunakan domain yang telah diverifikasi, Anda dapat membangun sistem email yang aman, profesional, dan andal.

Bagi developer Nuxt.js, Resend menawarkan keseimbangan antara kemudahan penggunaan dan fitur yang lengkap. Anda tidak perlu lagi bergantung pada konfigurasi SMTP yang rumit, sehingga dapat lebih fokus mengembangkan fitur utama aplikasi. Jika proyek Anda membutuhkan pengiriman email yang cepat, mudah diintegrasikan, dan skalabel, maka Resend adalah salah satu pilihan yang sangat layak untuk dipertimbangkan.
