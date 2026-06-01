<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Neo-Brutalism UI | Rizky Mochamad Sidik'
})
</script>

<template>
  <div>
    <!-- Hero Header -->
    <section class="hero"
        style="min-height: 30vh; padding: 60px 5%; background-image: linear-gradient(var(--border-color) 2px, transparent 2px), linear-gradient(90deg, var(--border-color) 2px, transparent 2px); background-size: 50px 50px; background-color: var(--secondary-color);">
      <div class="hero-content" style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span class="tag"
            style="display: inline-block; background: var(--tertiary-color); color: #1a1a1a; padding: 8px 20px; border: var(--border-width) solid var(--border-color); font-weight: 900; margin-bottom: 20px; font-size: 1rem;">Design</span>
        <h1 class="article-title">Neo-Brutalism UI: Tren Desain Antarmuka Modern yang Berani, Unik, dan Berkarakter</h1>
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
          <h2>Pengertian Neo-Brutalism UI</h2>
          <p>Neo-Brutalism UI merupakan salah satu tren desain antarmuka pengguna (User Interface/UI) yang semakin populer dalam beberapa tahun terakhir. Gaya desain ini terinspirasi dari aliran arsitektur Brutalisme yang muncul pada pertengahan abad ke-20, kemudian dikembangkan kembali dengan sentuhan modern sehingga menghasilkan tampilan yang lebih segar, menarik, dan relevan untuk kebutuhan digital saat ini.</p>
          <p>Berbeda dengan desain minimalis yang berfokus pada kesederhanaan dan elemen yang halus, Neo-Brutalism justru menonjolkan tampilan yang tegas, kontras tinggi, warna-warna cerah, serta penggunaan garis dan bayangan yang kuat. Tujuan utamanya adalah menciptakan identitas visual yang unik dan mudah diingat oleh pengguna.</p>

          <h2>Sejarah dan Perkembangannya</h2>
          <p>Konsep Brutalisme awalnya berasal dari dunia arsitektur yang mengedepankan fungsi dibandingkan estetika. Bangunan brutalis biasanya memiliki bentuk yang tegas, material yang terlihat apa adanya, dan minim dekorasi. Filosofi tersebut kemudian memengaruhi dunia desain digital.</p>
          <p>Pada awal perkembangan web, banyak situs memiliki tampilan sederhana dan terkadang terkesan "kasar" karena keterbatasan teknologi. Seiring waktu, tren desain bergeser ke arah skeuomorphism, flat design, hingga minimalism. Namun, banyak desainer mulai merasa bahwa desain modern menjadi terlalu seragam dan kehilangan karakter.</p>
          <p>Dari kondisi tersebut lahirlah Neo-Brutalism, sebuah pendekatan yang mencoba mengembalikan keberanian visual dengan menggabungkan elemen brutalis dan teknologi desain modern. Hasilnya adalah antarmuka yang tampil berbeda, mencolok, dan mampu menarik perhatian pengguna dalam waktu singkat.</p>

          <h2>Karakteristik Utama Neo-Brutalism</h2>
          <p>Neo-Brutalism memiliki beberapa ciri khas yang membuatnya mudah dikenali:</p>

          <h3>1. Warna Cerah dan Kontras Tinggi</h3>
          <p>Neo-Brutalism sering menggunakan warna-warna mencolok seperti kuning terang, merah, biru elektrik, hijau neon, atau kombinasi warna yang berani. Pemilihan warna ini bertujuan untuk menciptakan kesan energik dan menarik perhatian pengguna.</p>

          <h3>2. Border Tebal</h3>
          <p>Salah satu elemen paling khas adalah penggunaan garis tepi (border) yang tebal pada tombol, kartu, formulir, dan komponen lainnya. Border ini membantu menciptakan struktur visual yang kuat.</p>

          <h3>3. Bayangan Keras (Hard Shadow)</h3>
          <p>Tidak seperti desain modern yang menggunakan bayangan lembut, Neo-Brutalism mengandalkan bayangan tegas dan jelas. Efek ini memberikan kesan tiga dimensi yang unik sekaligus memperkuat identitas visual.</p>

          <h3>4. Tipografi Besar dan Berani</h3>
          <p>Penggunaan font dengan ukuran besar serta ketebalan tinggi menjadi salah satu daya tarik utama. Tipografi tidak hanya berfungsi sebagai media informasi tetapi juga menjadi elemen desain yang dominan.</p>

          <h3>5. Bentuk Geometris Sederhana</h3>
          <p>Komponen antarmuka biasanya menggunakan bentuk dasar seperti persegi, lingkaran, atau persegi panjang tanpa banyak efek dekoratif. Kesederhanaan bentuk ini membantu menjaga fokus pengguna terhadap konten.</p>

          <h2>Kelebihan dan Kekurangan</h2>

          <div class="pros-cons-grid">
            <div style="background: var(--tertiary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #1a1a1a;">
              <h4 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">Kelebihan</h4>
              <ul style="margin-top: 15px;">
                <li><strong>Mudah dikenali dan diingat:</strong> Tampilan yang unik membuat sebuah produk digital lebih mudah membangun identitas merek.</li>
                <li><strong>Menarik perhatian pengguna:</strong> Warna cerah dan elemen visual yang kuat mampu meningkatkan daya tarik visual dalam waktu singkat.</li>
                <li><strong>Memberikan kesan modern dan kreatif:</strong> Neo-Brutalism sering digunakan oleh startup, portofolio kreatif, dan produk digital yang ingin tampil berbeda dari kompetitor.</li>
                <li><strong>Meningkatkan fokus pada elemen penting:</strong> Penggunaan kontras yang tinggi membantu pengguna menemukan tombol atau informasi penting dengan lebih cepat.</li>
              </ul>
            </div>
            <div style="background: var(--primary-color); padding: 20px; border: var(--border-width) solid var(--border-color); color: #fff;">
              <h4 style="border-bottom: 2px solid #fff; padding-bottom: 10px;">Kekurangan</h4>
              <ul style="margin-top: 15px;">
                <li><strong>Tidak cocok untuk semua jenis aplikasi:</strong> Aplikasi perbankan, kesehatan, atau sistem formal terkadang memerlukan tampilan yang lebih profesional dan konservatif.</li>
                <li><strong>Berpotensi melelahkan mata:</strong> Penggunaan warna yang terlalu mencolok dapat membuat pengguna merasa tidak nyaman jika digunakan secara berlebihan.</li>
                <li><strong>Membutuhkan keseimbangan desain yang baik:</strong> Jika tidak dirancang dengan tepat, tampilan Neo-Brutalism dapat terlihat berantakan dan mengurangi kenyamanan pengguna.</li>
              </ul>
            </div>
          </div>

          <h2>Penerapan Neo-Brutalism dalam Desain Website dan Aplikasi</h2>
          <p>Saat ini, banyak website startup, platform kreatif, hingga portofolio pribadi yang mengadopsi gaya Neo-Brutalism. Desainer biasanya menerapkan elemen seperti tombol berwarna cerah dengan border hitam tebal, kartu informasi dengan bayangan keras, serta tipografi besar yang langsung menarik perhatian.</p>
          <p>Dalam aplikasi mobile, Neo-Brutalism sering digunakan pada halaman landing page, onboarding screen, dashboard sederhana, dan fitur-fitur promosi. Pendekatan ini membantu meningkatkan engagement pengguna karena tampilannya yang berbeda dari desain aplikasi pada umumnya.</p>
          <p>Namun, penerapan Neo-Brutalism tetap harus memperhatikan prinsip usability dan accessibility. Desain yang menarik tidak boleh mengorbankan kemudahan penggunaan maupun keterbacaan informasi.</p>

          <h2>Dampak terhadap Pengalaman Pengguna (User Experience)</h2>
          <p>Dari sisi User Experience (UX), Neo-Brutalism mampu menciptakan kesan pertama yang kuat. Pengguna cenderung lebih mudah mengingat sebuah produk digital yang memiliki identitas visual unik dibandingkan produk dengan desain yang terlalu generik.</p>
          <p>Selain itu, kontras yang tinggi dapat membantu navigasi dan meningkatkan visibilitas elemen penting. Namun, penggunaan warna dan efek visual yang berlebihan dapat mengganggu kenyamanan pengguna dalam jangka panjang. Oleh karena itu, desainer perlu menemukan keseimbangan antara estetika dan fungsionalitas.</p>
          <p>Neo-Brutalism yang berhasil bukan hanya terlihat menarik, tetapi juga tetap mampu memberikan pengalaman penggunaan yang efisien, intuitif, dan menyenangkan.</p>

          <h2>Kesimpulan</h2>
          <p>Neo-Brutalism UI merupakan tren desain antarmuka modern yang menggabungkan keberanian visual, warna kontras tinggi, tipografi besar, border tebal, dan bayangan keras untuk menciptakan identitas yang kuat. Gaya desain ini hadir sebagai alternatif dari desain minimalis yang semakin umum digunakan, sehingga mampu memberikan kesan unik dan mudah diingat.</p>
          <p>Meskipun memiliki berbagai kelebihan seperti daya tarik visual yang tinggi dan kemampuan membangun branding yang kuat, Neo-Brutalism tetap harus diterapkan secara bijak agar tidak mengurangi kenyamanan pengguna. Dengan keseimbangan yang tepat antara estetika dan fungsionalitas, Neo-Brutalism dapat menjadi pilihan efektif untuk menciptakan pengalaman digital yang modern, kreatif, dan berkarakter.</p>
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
