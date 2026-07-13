import { useState } from '#imports'

export const useLanguage = () => {
  const currentLang = useState('lang', () => 'id')

  const setLanguage = (code) => {
    currentLang.value = code
    if (import.meta.client) {
      localStorage.setItem('lang', code)
    }
  }

  const languages = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: 'ZH' },
    { code: 'ja', label: 'JA' }
  ]

  const translations = {
    id: {
      // Navbar / Header
      home: 'Beranda',
      projects: 'Proyek',
      blog: 'Blog',
      gallery: 'Galeri',
      friends: 'Teman',

      // Hero Section
      hero_title: "HI, SAYA RIZKY MOCHAMAD SIDIK",
      hero_subtitle: "FULL STACK DEVELOPER",
      hero_desc: "Membangun pengalaman web yang brutal, fungsional, dan indah.",
      hero_see_work: "Lihat Proyek Saya",
      
      // About Section
      about_title: "TENTANG SAYA",
      about_p1: "Halo! Saya Rizky Mochamad Sidik, seorang Full-Stack Web Developer dan Software Engineer yang berfokus pada pembangunan aplikasi web modern, efisien, dan berskala besar.",
      about_p2: "Saya memiliki passion kuat dalam mentransformasikan ide kompleks menjadi solusi digital yang nyata dan berorientasi pada pengalaman pengguna. Anda dapat mengeksplorasi portofolio kerja saya melalui daftar proyek saya di sini.",
      about_p3: "Selain menulis kode, saya aktif membagikan catatan teknis dan tutorial seputar dunia coding di artikel blog.",
      about_p4: "Saya selalu tertantang untuk mempelajari arsitektur teknologi baru, bereksperimen dengan desain antarmuka yang elegan, serta terus meningkatkan standar kemampuan rekayasa perangkat lunak saya.",
      social_platform: "Platform Sosial",

      // Skills & Experience
      skills: "Keahlian",
      experience: "Pengalaman Kerja",
      exp_1_title: "Full Stack Developer - Freelance",
      exp_1_desc: "Mendesain dan membangun aplikasi web kustom untuk klien menggunakan Laravel, Vue, dan React.",
      exp_2_title: "Frontend Engineer Intern",
      exp_2_desc: "Berkolaborasi dalam pengembangan sistem desain UI internal dan mengintegrasikan API RESTful.",

      // Projects Section
      projects_header: "PROYEK - RIZKY MOCHAMAD SIDIK",
      proj_1_title: "PROFIL PERUSAHAAN",
      proj_1_desc: "Profil perusahaan komprehensif yang dibangun dengan Laravel dan PHP, dirancang untuk memberikan pengalaman pengguna yang modern dan mulus.",
      proj_2_title: "WEBSITE PORTOFOLIO",
      proj_2_desc: "Template portofolio mencolok yang terinspirasi oleh nuxt.js, dibuat untuk menyoroti karya kreatif dengan estetika berani.",
      proj_3_title: "VILLHAZE",
      proj_3_desc: "Gallery of Villhaze adalah galeri online modern yang menampilkan koleksi visual terkurasi, karya seni, dan momen kreatif dalam pengalaman yang bersih, imersif, dan responsif.",
      visit_web: "Kunjungi Website",

      // Friends Section
      friends_header: "LINGKARAN KONEKSI",
      friends_desc: "Membangun ekosistem melalui interaksi. Daftar entitas yang terhubung dalam jaringan kami.",
      friends_cat_edu: "Lembaga Pendidikan & Sekolah",
      friends_cat_com: "Komunitas & Partner Teknologi",
      friends_cat_ind: "Kreator & Profesional Independen",

      // Gallery Section
      gallery_header: "GALERI VISUAL",
      gallery_desc: "Kumpulan momen, visualisasi estetika, dan proyek desain.",

      // Blog Section
      blog_header: "CATATAN DEV",
      blog_desc: "Berbagi wawasan seputar dunia rekayasa perangkat lunak, tutorial coding, dan tips web development.",
      read_article: "Baca Artikel",

      // Articles
      art_1_title: "Neo-Brutalism UI: Tren Desain Antarmuka Modern yang Berani, Unik, dan Berkarakter",
      art_1_desc: "Tren desain web terus berkembang. Mengapa nuxt.js dengan garis tegas dan warna kontras tetap relevan hingga saat ini? Mari kita bedah alasannya.",
      art_2_title: "Optimasi Database MySQL untuk Skala Besar",
      art_2_desc: "Saat aplikasi mulai ramai pengguna, query yang lambat menjadi musuh utama. Berikut adalah 5 teknik indexing yang sering dilupakan developer pemula.",
      art_3_title: "Masa Depan React & Server Components",
      art_3_desc: "RSC (React Server Components) mengubah cara kita berpikir tentang state dan fetching data. Apakah ini merupakan akhir dari dominasi Redux?",
      art_4_title: "Visual Studio Code (VS Code): Editor Kode Modern yang Mengubah Cara Programmer Bekerja",
      art_4_desc: "Di dunia pengembangan perangkat lunak yang terus berkembang, pemilihan alat kerja menjadi salah satu faktor penting yang memengaruhi produktivitas seorang programmer",
      art_5_title: "Nuxt.js: Framework Modern untuk Membangun Aplikasi Web yang Cepat dan SEO-Friendly",
      art_5_desc: "Nuxt adalah framework open-source yang dibangun di atas Vue.js untuk mempermudah pengembangan aplikasi web modern. Nuxt dirancang agar developer dapat membangun website dan aplikasi dengan performa tinggi, struktur proyek yang rapi, serta optimasi SEO yang lebih baik dibandingkan aplikasi Vue biasa.",
      art_6_title: "Laravel: Framework PHP Modern untuk Pengembangan Aplikasi Web",
      art_6_desc: "Laravel adalah salah satu framework PHP paling populer di dunia yang digunakan untuk membangun aplikasi web modern. Framework ini pertama kali dikembangkan oleh Taylor Otwell dan dirilis pada tahun 2011 sebagai alternatif yang lebih elegan dan mudah digunakan dibandingkan banyak framework PHP lain pada masanya.",
      art_7_title: "Cara Menggunakan Resend di Nuxt.js untuk Mengirim Email dengan Mudah",
      art_7_desc: "Di era aplikasi web modern, fitur pengiriman email menjadi salah satu kebutuhan yang hampir selalu ada. Mulai dari formulir kontak, notifikasi akun, email verifikasi, reset password, hingga newsletter",
      art_8_title: "Framework Paling Populer untuk Web Development: Panduan Lengkap Memilih Framework Terbaik",
      art_8_desc: "Dalam dunia pengembangan perangkat lunak, khususnya web development, penggunaan framework telah menjadi standar bagi para developer.",
      art_9_title: "Alasan Harus Menggunakan Pinia pada Proyek Vue.js dan Nuxt",
      art_9_desc: "Ketika membangun aplikasi menggunakan Vue.js atau Nuxt, mengelola data yang digunakan oleh banyak komponen sering kali menjadi tantangan.",
      art_10_title: "Macam-Macam UI Website: Mengenal Berbagai Jenis Antarmuka yang Digunakan pada Website Modern.",
      art_10_desc: "Dalam dunia pengembangan website, tampilan antarmuka atau User Interface (UI) memiliki peran yang sangat penting."
    },
    en: {
      home: 'Home',
      projects: 'Projects',
      blog: 'Blog',
      gallery: 'Gallery',
      friends: 'Friends',

      hero_title: "HI, SAYA RIZKY MOCHAMAD SIDIK",
      hero_subtitle: "FULL STACK DEVELOPER",
      hero_desc: "Building brutal, functional, and beautiful web experiences.",
      hero_see_work: "See My Work",

      about_title: "ABOUT ME",
      about_p1: "Hello! I'm Rizky Mochamad Sidik, a Full-Stack Web Developer and Software Engineer focused on building modern, efficient, and large-scale web applications.",
      about_p2: "I have a strong passion for transforming complex ideas into tangible, user-centric digital solutions. You can explore my work portfolio through my project list here.",
      about_p3: "Apart from writing code, I actively share technical notes and tutorials about the coding world in blog articles.",
      about_p4: "I am always challenged to learn new technology architectures, experiment with elegant interface designs, and continue to raise the standard of my software engineering capabilities.",
      social_platform: "Social Platforms",

      skills: "Skills",
      experience: "Work Experience",
      exp_1_title: "Full Stack Developer - Freelance",
      exp_1_desc: "Designing and building custom web applications for clients using Laravel, Vue, and React.",
      exp_2_title: "Frontend Engineer Intern",
      exp_2_desc: "Collaborated in developing internal UI design systems and integrating RESTful APIs.",

      projects_header: "PROJECTS - RIZKY MOCHAMAD SIDIK",
      proj_1_title: "COMPANY PROFILE",
      proj_1_desc: "A comprehensive company profile built with Laravel and PHP, designed to deliver a modern and seamless user experience.",
      proj_2_title: "PORTFOLIO WEBSITE",
      proj_2_desc: "A striking portfolio template inspired by nuxt.js, crafted to highlight creative work with bold aesthetics.",
      proj_3_title: "VILLHAZE",
      proj_3_desc: "Gallery of Villhaze is a modern online gallery that showcases a curated collection of visuals, artwork, and creative moments in a clean, immersive, and responsive experience.",
      visit_web: "Visit Website",

      friends_header: "CONNECTION CIRCLE",
      friends_desc: "Building ecosystems through interaction. List of entities connected in our network.",
      friends_cat_edu: "Educational Institutions & Schools",
      friends_cat_com: "Communities & Tech Partners",
      friends_cat_ind: "Independent Creators & Professionals",

      gallery_header: "VISUAL GALLERY",
      gallery_desc: "Collection of moments, aesthetic visualizations, and design projects.",

      blog_header: "DEV NOTES",
      blog_desc: "Sharing insights about software engineering, coding tutorials, and web development tips.",
      read_article: "Read Article",

      art_1_title: "Neo-Brutalism UI: A Bold, Unique, and Characterful Modern Interface Design Trend",
      art_1_desc: "Web design trends keep evolving. Why does neo-brutalism with sharp lines and high contrast remain relevant today? Let's dissect the reasons.",
      art_2_title: "Optimizing MySQL Database for Large Scale",
      art_2_desc: "As applications grow, slow queries become the main enemy. Here are 5 indexing techniques often forgotten by junior developers.",
      art_3_title: "The Future of React & Server Components",
      art_3_desc: "RSC (React Server Components) changes how we think about state and data fetching. Is this the end of Redux dominance?",
      art_4_title: "Visual Studio Code (VS Code): The Modern Code Editor that Transformed Developer Workflows",
      art_4_desc: "In the ever-evolving world of software development, choosing the right tool is a key factor affecting programmer productivity.",
      art_5_title: "Nuxt.js: A Modern Framework for Building Fast and SEO-Friendly Web Applications",
      art_5_desc: "Nuxt is an open-source framework built on top of Vue.js to simplify modern web development. It is designed to build high-performance, well-structured, and search-optimized sites.",
      art_6_title: "Laravel: A Modern PHP Framework for Web Application Development",
      art_6_desc: "Laravel is one of the most popular PHP frameworks in the world used for building modern web applications.",
      art_7_title: "How to Use Resend in Nuxt.js to Send Emails Easily",
      art_7_desc: "In the modern web app era, email sending features are almost always required. From contact forms, account notifications, verification emails, password resets, to newsletters.",
      art_8_title: "Most Popular Frameworks for Web Development: Complete Guide to Choosing the Best Framework",
      art_8_desc: "In the software development world, especially web development, the use of frameworks has become standard for developers.",
      art_9_title: "Reasons Why You Should Use Pinia in Vue.js and Nuxt Projects",
      art_9_desc: "When building applications using Vue.js or Nuxt, managing data used by multiple components is often a challenge.",
      art_10_title: "Types of Website UI: Getting to Know Various Interface Types Used on Modern Websites",
      art_10_desc: "In the website development world, the user interface (UI) plays a very important role."
    },
    zh: {
      home: '首页',
      projects: '项目',
      blog: '博客',
      gallery: '画廊',
      friends: '朋友',

      hero_title: "你好，我是 RIZKY MOCHAMAD SIDIK",
      hero_subtitle: "全栈开发人员",
      hero_desc: "构建野兽派、功能齐全且美观的网页体验。",
      hero_see_work: "查看我的工作",

      about_title: "关于我",
      about_p1: "你好！我是 Rizky Mochamad Sidik，一名全栈 Web 开发人员 and 软件工程师，专注于构建现代、高效和大规模的 Web 应用程序。",
      about_p2: "我热衷于将复杂的想法转化为切实的、以用户为中心的数字解决方案。您可以通过我在这里的项目列表探索我的工作组合。",
      about_p3: "除了编写代码，我还积极在博客文章中分享有关编码世界的规范技术笔记和教程。",
      about_p4: "我总是挑战自己去学习新的技术架构，尝试优雅的界面设计，并继续提高我的软件工程能力标准。",
      social_platform: "社交平台",

      skills: "技能",
      experience: "工作经验",
      exp_1_title: "全栈开发人员 - 自由职业",
      exp_1_desc: "使用 Laravel、Vue 和 React 为客户设计和构建定制的 Web 应用程序。",
      exp_2_title: "前端工程师实习生",
      exp_2_desc: "合作开发内部 UI 设计系统并集成 RESTful API。",

      projects_header: "项目 - RIZKY MOCHAMAD SIDIK",
      proj_1_title: "公司简介",
      proj_1_desc: "使用 Laravel 和 PHP 构建的综合公司简介，旨在提供现代且无缝的用户体验。",
      proj_2_title: "个人作品集网站",
      proj_2_desc: "一个受 nuxt.js 启发的醒目作品集模板，旨在以大胆的美学突出创意作品。",
      proj_3_title: "VILLHAZE",
      proj_3_desc: "Gallery of Villhaze 是一个现代在线画廊，以干净、沉浸式和响应式的体验展示精选的视觉效果、艺术品和创意瞬间。",
      visit_web: "访问网站",

      friends_header: "人脉圈",
      friends_desc: "通过互动构建生态系统。我们网络中连接的实体列表。",
      friends_cat_edu: "教育机构和学校",
      friends_cat_com: "社区和技术合作伙伴",
      friends_cat_ind: "独立创作者和专业人士",

      gallery_header: "视觉画廊",
      gallery_desc: "瞬间、审美可视化和设计项目的集合。",

      blog_header: "开发笔记",
      blog_desc: "分享有关软件工程、编码教程和网页开发技巧的见解。",
      read_article: "阅读文章",

      art_1_title: "野兽派 UI：大胆、独特且极具个性的现代界面设计趋势",
      art_1_desc: "网页设计趋势不断演变。为什么具有清晰线条和对比色的野兽派今天依然流行？让我们来分析一下原因。",
      art_2_title: "针对大规模的 MySQL 数据库优化",
      art_2_desc: "随着应用用户增多，慢查询成为主要敌人。以下是初级开发人员经常忘记的 5 种索引技术。",
      art_3_title: "React 和 Server Components 的未来",
      art_3_desc: "RSC（React Server Components）改变了我们对状态和数据获取的看法。这会是 Redux 统治地位的终结吗？",
      art_4_title: "Visual Studio Code (VS Code): 改变程序员工作方式的现代代码编辑器",
      art_4_desc: "在不断发展的软件开发世界中，选择合适的工具是影响程序员生产力的关键因素。",
      art_5_title: "Nuxt.js: 构建快速且对 SEO 友好的现代 Web 应用程序框架",
      art_5_desc: "Nuxt 是一个构建在 Vue.js 之上的开源框架，旨在简化现代 Web 开发。它旨在构建高性能、结构良好且针对搜索进行优化的网站。",
      art_6_title: "Laravel：用于 Web 应用程序开发的现代 PHP 框架",
      art_6_desc: "Laravel 是世界上最受欢迎的 PHP 框架之一，用于构建现代 Web 应用程序。",
      art_7_title: "如何在 Nuxt.js 中轻松使用 Resend 发送电子邮件",
      art_7_desc: "在现代 Web 应用时代，电子邮件发送功能几乎必不可少。包含联系表单、账户通知、验证电子邮件、密码重置到新闻通讯。",
      art_8_title: "最受欢迎的 Web 开发框架：选择最佳框架的完整指南",
      art_8_desc: "在软件开发领域（特别是 Web 开发），框架的使用已成为开发人员的标准。",
      art_9_title: "在 Vue.js 和 Nuxt 项目中使用 Pinia 的理由",
      art_9_desc: "当使用 Vue.js 或 Nuxt 构建应用程序时，管理由多个组件使用的数据通常是一项挑战。",
      art_10_title: "网站 UI 类型：了解现代网站上使用的各种界面类型",
      art_10_desc: "在网站开发领域，用户界面 (UI) 发挥着非常重要的作用。"
    },
    ja: {
      home: 'ホーム',
      projects: 'プロジェクト',
      blog: 'ブログ',
      gallery: 'ギャラリー',
      friends: '友達',

      hero_title: "こんにちは、リズキー・モチャマド・シディクです",
      hero_subtitle: "フルスタックデベロッパー",
      hero_desc: "野性的で機能的、そして美しいWeb体験を構築します。",
      hero_see_work: "私の実績を見る",

      about_title: "私について",
      about_p1: "こんにちは！私はリズキー・モチャマド・シディクです。モダンで効率的、かつ大規模なWebアプリケーションの構築に注力しているフルスタックWeb開発者兼ソフトウェアエンジニアです。",
      about_p2: "複雑なアイデアを、具体的でユーザー中心のデジタルソリューションに変えることに強い情熱を持っています。こちらのプロジェクトリストから私の実績をご覧ください。",
      about_p3: "コードを書くこと以外にも、ブログ記事でコーディングの世界に関する技術的なメモやチュートリアルを積極的に共有しています。",
      about_p4: "常に新しい技術アーキテクチャの学習、エレガントなインターフェース設計の実験、そしてソフトウェアエンジニアリング能力の標準を向上させることに挑戦しています。",
      social_platform: "ソーシャルプラットフォーム",

      skills: "スキル",
      experience: "職歴",
      exp_1_title: "フルスタックデベロッパー - Freelance",
      exp_1_desc: "Laravel、Vue、Reactを使用して、クライアント向けのカスタムWebアプリケーションを設計・構築。",
      exp_2_title: "フロントエンドエンジニア インターン",
      exp_2_desc: "社内UIデザインシステムの開発やRESTful APIの統合で共同作業。",

      projects_header: "プロジェクト - リズキー・モチャマド・シディク",
      proj_1_title: "会社案内",
      proj_1_desc: "LaravelとPHPで構築された包括的な会社案内で、モダンでシームレスなユーザー体験を提供するように設計されています。",
      proj_2_title: "ポートフォリオサイト",
      proj_2_desc: "nuxt.jsにインスパイアされた、大胆な美学で創造的な作品を際立たせる印象的なポートフォリオテンプレート。",
      proj_3_title: "VILLHAZE",
      proj_3_desc: "Gallery of Villhazeは、クリーンで没入感のあるレスポンシブな体験の中で、厳選されたビジュアル、アートワーク、クリエイティブな瞬間を展示するモダンなオンラインギャラリーです。",
      visit_web: "ウェブサイトを見る",

      friends_header: "接続サークル",
      friends_desc: "相互作用を通じてエコシステムを構築する。私たちのネットワークに接続されているエンティティのリスト。",
      friends_cat_edu: "教育機関・学校",
      friends_cat_com: "コミュニティ・テックパートナー",
      friends_cat_ind: "独立したクリエイター・専門家",

      gallery_header: "ビジュアルギャラリー",
      gallery_desc: "瞬間、美的可視化、デザインプロジェクトのコレクション。",

      blog_header: "開発者ノート",
      blog_desc: "ソフトウェアエンジニアリング、コーディングチュートリアル、Web開発のヒントに関する洞察を共有します。",
      read_article: "記事を読む",

      art_1_title: "ネオ・ブルータリズムUI：大胆でユニーク、 arena 個性的なモダンUIデザインのトレンド",
      art_1_desc: "ウェブデザインのトレンドは進化し続けています。なぜはっきりとした境界線と高コントラストのネオ・ブルータリズムが今日でも受け入れられるのでしょうか？その理由を解説します。",
      art_2_title: "大規模向け MySQL データベースの最適化",
      art_2_desc: "アプリケーションが拡大すると、遅いクエリが最大の敵になります。ここでは、初心者開発者が忘れがちな5つのインデックス作成手法を紹介します。",
      art_3_title: "React & Server Components の未来",
      art_3_desc: "RSC (React Server Components) は、状態とデータ取得に関する考え方を変えます。これは Redux の支配の終わりを意味するのでしょうか？",
      art_4_title: "Visual Studio Code (VS Code)：プログラマーの働き方を変えたモダンなコードエディター",
      art_4_desc: "進化し続けるソフトウェア開発の世界において、適切なツールの選択はプログラマーの生産性に影響を与える重要な要因です。",
      art_5_title: "Nuxt.js：高速でSEOに優れたモダンWebアプリケーション構築のためのフレームワーク",
      art_5_desc: "Nuxtは、モダンなWeb開発を簡素化するためにVue.jsの上に構築されたオープンソースのフレームワークです。高性能で整理されたSEO対策済みのサイトを構築するように設計されています。",
      art_6_title: "Laravel：Webアプリケーション開発用の最新のPHPフレームワーク",
      art_6_desc: "Laravelは、最新のWebアプリケーションを構築するために使用される、世界で最も人気のあるPHPフレームワークの1つです。",
      art_7_title: "Nuxt.js で Resend を使用して簡単に電子メールを送信する方法",
      art_7_desc: "最新の Web アプリの時代では、電子メール送信機能がほぼ常に必要になります。問い合わせフォーム、アカウント通知、確認メール、パスワード再設定、ニュースレターまで幅広く対応します。",
      art_8_title: "Web開発で最も人気のあるフレームワーク：最適なフレームワークを選択するための完全ガイド",
      art_8_desc: "ソフトウェア開発（特に Web 開発）の世界では、開発者にとってフレームワークの使用が標準となっています。",
      art_9_title: "Vue.js および Nuxt プロジェクトで Pinia を使用すべき理由",
      art_9_desc: "Vue.js または Nuxt を使用してアプリケーションを構築する場合、複数のコンポーネントで使用されるデータの管理が課題になることがよくあります。",
      art_10_title: "ウェブサイト UI の種類：最新のウェブサイトで使用されるさまざまなインターフェイスの種類について学びます",
      art_10_desc: "ウェブサイト開発の世界では、ユーザーインターフェイス（UI）が非常に重要な役割を果たします。"
    }
  }

  const t = (key) => {
    return translations[currentLang.value]?.[key] || key
  }

  return {
    currentLang,
    languages,
    setLanguage,
    t
  }
}
