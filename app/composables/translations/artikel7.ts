export const artikel7Translations = {
  id: {
    tag: 'Framework',
    title: 'Cara Menggunakan Resend di Nuxt.js untuk Mengirim Email dengan Mudah',
    sections: [
      {
        p: [
          'Di era aplikasi web modern, fitur pengiriman email menjadi salah satu kebutuhan yang hampir selalu ada. Mulai dari formulir kontak, notifikasi akun, email verifikasi, reset password, hingga newsletter. Jika dulu kita harus mengatur SMTP yang cukup rumit, sekarang tersedia layanan yang jauh lebih sederhana, salah satunya adalah Resend.',
          'Resend adalah layanan Email API modern yang dirancang khusus untuk developer. Dengan API yang sederhana, dokumentasi yang lengkap, dan performa yang cepat, Resend menjadi pilihan populer bagi pengembang React, Next.js, maupun Nuxt.js.',
          'Pada artikel ini kita akan membahas bagaimana cara mengintegrasikan Resend ke dalam proyek Nuxt.js dari awal hingga berhasil mengirim email.'
        ]
      },
      {
        h2: 'Apa Itu Resend?',
        p: [
          'Resend adalah layanan Email API yang memungkinkan aplikasi mengirim email menggunakan REST API atau SDK resmi.',
          'Beberapa kelebihan Resend antara lain: API sangat sederhana, dokumentasi lengkap, mendukung React Email, mudah digunakan bersama Nuxt.js, keamanan API Key yang baik, dashboard email history, dan dukungan domain sendiri agar email terlihat profesional.',
          'Karena kemudahan tersebut, banyak developer memilih Resend dibanding harus mengatur SMTP secara manual.'
        ]
      },
      {
        h2: 'Persiapan',
        p: [
          'Sebelum memulai, pastikan Anda memiliki Node.js versi terbaru, proyek Nuxt.js, akun Resend, dan API Key dari dashboard Resend.',
          'Jika belum memiliki proyek Nuxt, buat terlebih dahulu, install dependency, lalu jalankan aplikasinya di local server.'
        ]
      },
      {
        h2: 'Menginstal SDK Resend',
        p: [
          'Install package Resend menggunakan perintah npm install resend. Setelah selesai, dependency baru akan muncul di package.json.'
        ]
      },
      {
        h2: 'Menyimpan API Key',
        p: [
          'Simpan API Key di file .env dan config di nuxt.config.ts menggunakan runtimeConfig. Menggunakan Runtime Config jauh lebih aman dibanding menuliskan API Key langsung pada source code.'
        ]
      },
      {
        h2: 'Membuat API Server',
        p: [
          'Nuxt memiliki Nitro Server sehingga kita tidak memerlukan Express atau server tambahan. Buat file server/api/send-email.post.ts untuk menerima request POST lalu meneruskannya ke layanan Resend.'
        ]
      },
      {
        h2: 'Membuat Halaman Form',
        p: [
          'Buat form sederhana di halaman Vue Anda untuk mengikat data email, subject, dan message menggunakan v-model, lalu kirim ke endpoint server.'
        ]
      },
      {
        h2: 'Menambahkan Validasi',
        p: [
          'Jangan langsung mengirim email tanpa memeriksa input pengguna. Anda bisa menerapkan validasi sederhana atau memakai library seperti Zod untuk mencegah request yang tidak valid.'
        ]
      },
      {
        h2: 'Menggunakan Domain Sendiri',
        p: [
          'Saat pertama kali menggunakan Resend, Anda bisa memakai alamat bawaan onboarding@resend.dev. Namun untuk aplikasi produksi sebaiknya gunakan domain sendiri dengan memverifikasi DNS di dashboard Resend agar email terlihat profesional dan tidak masuk folder spam.'
        ]
      },
      {
        h2: 'Menangani Error',
        p: [
          'Jangan lupa menangani kemungkinan gagal mengirim email dengan blok try-catch agar aplikasi tidak crash ketika terjadi kesalahan.'
        ]
      },
      {
        h2: 'Tips Keamanan',
        p: [
          'Pastikan untuk selalu menggunakan Runtime Config dan menyimpan API Key di file .env, serta menerapkan rate limiting jika formulir dapat diakses oleh publik.'
        ]
      },
      {
        h2: 'Kesimpulan',
        p: [
          'Resend merupakan solusi modern untuk pengiriman email yang sangat cocok dipadukan dengan Nuxt.js. Proses integrasinya relatif sederhana, mulai dari instalasi SDK hingga pemanggilan API dari komponen Vue. Dengan domain sendiri, email Anda akan terlihat lebih profesional dan andal.',
          'Bagi developer Nuxt.js, Resend menawarkan keseimbangan antara kemudahan penggunaan dan fitur yang lengkap.'
        ]
      }
    ]
  },
  en: {
    tag: 'Framework',
    title: 'How to Use Resend in Nuxt.js to Send Emails Easily',
    sections: [
      {
        p: [
          'In the modern web app era, email sending features are almost always required. From contact forms, account notifications, verification emails, password resets, to newsletters. Instead of setting up complex SMTP configurations, there is a much simpler service available: Resend.',
          'Resend is a modern Email API service designed specifically for developers. With its simple API, rich documentation, and fast performance, Resend has become a popular choice for developers using React, Next.js, and Nuxt.js.',
          'In this article, we will discuss how to integrate Resend into a Nuxt.js project from scratch and successfully send an email.'
        ]
      },
      {
        h2: 'What is Resend?',
        p: [
          'Resend is an Email API service that allows applications to send emails via a REST API or an official SDK.',
          'Key benefits of Resend include: simple API structure, clear documentation, React Email compatibility, seamless integration with Nuxt.js, robust API Key security, email history dashboard, and custom domain verification.',
          'Due to this convenience, many developers prefer Resend over configuring manual SMTP connections.'
        ]
      },
      {
        h2: 'Setup & Prerequisites',
        p: [
          'Before starting, make sure you have: Node.js installed, a Nuxt.js project, a Resend account, and a Resend API Key.',
          'If you don\'t have a Nuxt project yet, initialize one first, install dependencies, and launch it on your local server.'
        ]
      },
      {
        h2: 'Installing the Resend SDK',
        p: [
          'Install the Resend package using the command npm install resend. Once done, the new dependency will be listed in your package.json.'
        ]
      },
      {
        h2: 'Storing the API Key',
        p: [
          'Save your API Key in the .env file and define it in nuxt.config.ts under runtimeConfig. Storing the key here is much safer than hardcoding it into your app source code.'
        ]
      },
      {
        h2: 'Creating the Server API Endpoint',
        p: [
          'Nuxt includes Nitro Server, so you do not need Express. Create a server/api/send-email.post.ts file to handle POST requests and relay them to Resend.'
        ]
      },
      {
        h2: 'Building the Form Page',
        p: [
          'Build a basic form in your Vue component, binding email, subject, and message fields with v-model, and fetch the API server endpoint.'
        ]
      },
      {
        h2: 'Adding Validation',
        p: [
          'Always validate user inputs before sending emails. Implement simple check rules or use validation libraries like Zod to block invalid payloads.'
        ]
      },
      {
        h2: 'Using Your Custom Domain',
        p: [
          'At start, you can use onboarding@resend.dev. For production environments, configure your own domain in the Resend dashboard and verify DNS settings to ensure professional delivery and avoid spam folders.'
        ]
      },
      {
        h2: 'Error Handling',
        p: [
          'Ensure you wrap calls in try-catch blocks to catch network errors, preventing the frontend app from crashing.'
        ]
      },
      {
        h2: 'Security Best Practices',
        p: [
          'Never expose your API Key to client-side code. Use Nuxt Runtime Config, keep settings in .env, and apply server-side rate limits.'
        ]
      },
      {
        h2: 'Conclusion',
        p: [
          'Resend is a modern, developer-friendly email solution that pairs perfectly with Nuxt.js. Integration is simple, covering SDK setup, runtime configuration, and api fetching from Vue component buttons.',
          'For Nuxt.js developers, Resend offers an excellent balance between simplicity and powerful features.'
        ]
      }
    ]
  },
  zh: {
    tag: '框架',
    title: '如何在 Nuxt.js 中轻松使用 Resend 发送电子邮件',
    sections: [
      {
        p: [
          '在现代 Web 应用开发中，电子邮件发送功能几乎必不可少。包含联系表单、账户通知、验证电子邮件、密码重置到新闻通讯。相较于配置复杂的传统 SMTP，Resend 提供了一种极其简便的现代化邮件 API 接口。',
          'Resend 是专为开发者设计的现代邮件 API 服务。它以简单的 API 结构、详尽的文档以及极速的发送效率，深受 React, Next.js 和 Nuxt.js 社区的青睐。',
          '在本文中，我们将一步步介绍如何将 Resend 整合到 Nuxt.js 项目中，并成功实现邮件发送。'
        ]
      },
      {
        h2: '什么是 Resend？',
        p: [
          'Resend 是一项邮件发送服务，支持应用程序通过 REST API 或官方提供的 SDK 来触发电子邮件。',
          '它的主要优势包括：极其精简的 API、卓越的文档、支持 React Email、与 Nuxt.js 配合默契、安全的密钥管理、直观的发送历史面板，以及支持配置自定义发件域名。',
          '因此，许多开发者选择 Resend 来代替繁琐的传统 SMTP 服务器搭建。'
        ]
      },
      {
        h2: '前期准备',
        p: [
          '开始前，请确保您准备好最新的 Node.js 环境、一个 Nuxt.js 项目、一个 Resend 账号，以及从控制台获取的 API 密钥。',
          '如果没有现成项目，可以使用命令行初始化一个新的 Nuxt 实例，并运行本地开发服务器。'
        ]
      },
      {
        h2: '安装 Resend SDK',
        p: [
          '在终端运行 npm install resend 安装依赖包。安装完成后，您可以在 package.json 的 dependencies 中看到它。'
        ]
      },
      {
        h2: '保存 API 密钥',
        p: [
          '将 API 密钥安全地保存在 .env 文件中，并在 nuxt.config.ts 的 runtimeConfig 中进行声明。这种处理方式比直接把密钥写在代码中要安全得多。'
        ]
      },
      {
        h2: '编写服务端 API 接口',
        p: [
          'Nuxt 内置了 Nitro 服务器，所以我们无需配置 Express 等框架。创建 server/api/send-email.post.ts 文件，用于接收客户端 POST 请求并转发给 Resend 服务。'
        ]
      },
      {
        h2: '创建表单页面',
        p: [
          '在 Vue 页面中构建简单的输入表单，使用 v-model 绑定收件人地址、主题和内容，并在按钮点击时异步请求我们的服务端接口。'
        ]
      },
      {
        h2: '添加数据校验',
        p: [
          '不要信任任何用户输入。在发信前做基本的判空校验，或结合 Zod 等类库进行格式验证，防止异常的请求浪费发信配额。'
        ]
      },
      {
        h2: '使用自定义发信域名',
        p: [
          '开发阶段，您可使用默认的 onboarding@resend.dev 测试。但在生产环境中，应当在 Resend 控制台添加并绑定自己的域名（配置域名 DNS 解析），以提升发信信誉，规避垃圾邮件风险。'
        ]
      },
      {
        h2: '异常与错误处理',
        p: [
          '务必在发送逻辑中包裹 try-catch 块，以便在网络异常或配额超出时友好提示用户，而不是让网页页面发生白屏崩溃。'
        ]
      },
      {
        h2: '安全建议',
        p: [
          '切勿将 Resend 的 API 密钥暴露给浏览器端代码。应始终保存在服务器环境变量中，且在公开表单中应当做好防刷限制。'
        ]
      },
      {
        h2: '结语',
        p: [
          'Resend 是一款与 Nuxt.js 结合极佳的现代化发信方案。它的整合过程平滑，支持开发者在很短的时间内上线安全且功能齐全的邮件发送机制。',
          '对于 Nuxt.js 开发团队而言，Resend 完美地平衡了使用易用度与底层的发送性能。'
        ]
      }
    ]
  },
  ja: {
    tag: 'フレームワーク',
    title: 'Nuxt.js で Resend を使用して簡単に電子メールを送信する方法',
    sections: [
      {
        p: [
          '最新の Web アプリケーションにおいて、メール送信機能はほぼ必須の要件です。問い合わせフォーム、アカウント作成通知、パスワードリセット、ニュースレターまで、設定が面倒な SMTP サーバーを用意する代わりに、API で手軽に送信できる Resend というサービスが注目を集めています。',
          'Resend は、開発者向けに設計されたモダンなメール配信用 API サービスです。シンプルな API と直感的でわかりやすいドキュメント、そして優れた配信速度により、React や Next.js、Nuxt.js ユーザーの間で広く採用されています。',
          'この記事では、Nuxt.js プロジェクトに Resend を初期状態から導入し、メール送信を成功させるまでの手順を詳しく解説します。'
        ]
      },
      {
        h2: 'Resend とは？',
        p: [
          'Resend は、REST API または公式提供の SDK を介してプログラムから電子メールを送信できるクラウドサービスです。',
          'シンプルな API 設計、整った公式ドキュメント、React Email のサポート、優れたセキュリティ管理、送信ログのダッシュボード表示、独自ドメインの検証などの利点があります。',
          'これらの利便性から、多くの開発者が従来の SMTP 設定よりも Resend を選んでいます。'
        ]
      },
      {
        h2: '事前準備',
        p: [
          '開始する前に、Node.js 環境、動作する Nuxt.js プロジェクト、Resend のアカウント、および管理画面から取得した API キーが必要です。',
          'プロジェクトがない場合は、コマンドで新規作成し、依存関係をインストールしてローカル開発環境で起動します。'
        ]
      },
      {
        h2: 'Resend SDK のインストール',
        p: [
          'プロジェクトディレクトリで npm install resend コマンドを実行します。インストール完了後、package.json の dependencies にパッケージ名が追加されます。'
        ]
      },
      {
        h2: 'API キーの保存と設定',
        p: [
          'API キーを .env ファイルに保存し、nuxt.config.ts の runtimeConfig を通じて読み込みます。この設定により、コード内に直接パスワードやキーを書き込むのを避けることができ、安全です。'
        ]
      },
      {
        h2: 'サーバー側 API エンドポイントの作成',
        p: [
          'Nuxt は Nitro サーバーを内蔵しているため、別途 Express などのサーバーを用意する必要はありません。server/api/send-email.post.ts を作成し、POST リクエストを受け取って Resend に転送する処理を記述します。'
        ]
      },
      {
        h2: 'フォーム画面の実装',
        p: [
          'Vue テンプレート上に送信フォームを作成し、v-model で宛先、件名、内容をバインドして、ボタンクリック時にサーバーエンドポイントへ fetch 送信を行います。'
        ]
      },
      {
        h2: '入力バリデーションの追加',
        p: [
          '悪意のある空送信などを防ぐため、送信前には必ず簡単な入力チェックを行うか、Zod などのバリデーションライブラリを組み込んで異常なリクエストを遮断してください。'
        ]
      },
      {
        h2: '独自ドメインの使用',
        p: [
          '初期状態では onboarding@resend.dev を送信元として利用できますが、本番環境では Resend ダッシュボードにドメインを登録し、DNS 設定（MX や TXT レコード）を検証して独自ドメインの送信元を使用することを強く推奨します。'
        ]
      },
      {
        h2: 'エラー処理の実装',
        p: [
          'ネットワークエラーや配信エラーでアプリがクラッシュしないよう、送信処理は必ず try-catch ブロックで囲んで例外を処理できるようにします。'
        ]
      },
      {
        h2: 'セキュリティ上の注意点',
        p: [
          'Resend の API キーをフロントエンド（ブラウザ）に公開してはいけません。必ず Nuxt の Runtime Config やサーバーエンドポイントを介して処理するように設計してください。'
        ]
      },
      {
        h2: '結論',
        p: [
          'Resend は、Nuxt.js と非常に親和性が高い最新のメール送信サービスです。SDK の導入から、サーバーサイド設定、Vue コンポーネントからの呼び出しまで、シンプルで洗練された開発体験を提供します。',
          '面倒な SMTP 構成に悩まされることなく、本来のアプリケーション機能の開発に集中することができます。'
        ]
      }
    ]
  }
}
