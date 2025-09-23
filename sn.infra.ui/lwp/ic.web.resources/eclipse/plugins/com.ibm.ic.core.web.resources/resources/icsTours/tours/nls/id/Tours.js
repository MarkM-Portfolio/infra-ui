/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2017, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
    // Connections Home Page tour; for d61, runs as JIT tour on first visit to Communities app
    // Note - would like to include username in the title - 'Welcome, {username}!'
    homepageWelcomeTitle : "Selamat datang!",
    homepageWelcomeContent : "Halaman beranda Anda adalah pusat perintah Anda, di mana Anda dapat fokus pada pembaruan penting dan melihat item yang memerlukan perhatian Anda.",
    easyKeepUpTitle : "Mudah untuk diikuti!",
    easyKeepUpContent : "Pindai halaman beranda Anda untuk tetap mendapatkan pembaruan teratas tentang hal-hal yang Anda minati. Lihat postingan blog dan aktivitas terbaru serta pembaruan komunitas.",
    whatNeedsAttentionTitle : "Apa yang memerlukan perhatian Anda?",
    whatNeedsAttentionContent : "Gunakan filter untuk melihat siapa yang menyebutkan nama Anda, melihat pemberitahuan yang lain, dan melihat item yang memerlukan tindakan.",
    whatsImportantTitle : "Apa yang penting bagi Anda?",
    whatsImportantContent : "Pindahkan atau hapus aplikasi dari halaman Anda untuk mendapatkan tampilan dan konten yang Anda inginkan.",
    customizePageTitle : "Sesuaikan halaman Anda",
    customizePageContent : "Tambahkan aplikasi ke halaman beranda Anda sehingga Anda dapat melacak yang Anda inginkan dari satu tempat.",
    thanksForWatchingTitle : "Terima kasih sudah menonton",
    thanksForWatchingContent : "Lihat tur ini lagi dari menu Bantuan.",
    thanksExploreContent : "Saat Anda menjelajahi area lain, seperti File atau Komunitas, periksa tur terpandu untuk membantu Anda menjadi produktif.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Coba jelajahi",
    haveLookAroundContent : "Gunakan tautan <b>Berbagi</b> dan <b>Jelajah</b> untuk memahami Connections. Temukan cara Anda dapat berkolaborasi dengan kolega dan menjadi produktif.",
    whatsImportantGSContent : "Klik <b>Halaman Saya</b> untuk melihat dasbor kustom Anda. Tambahkan, pindahkan, atau hapus aplikasi sehingga Anda dapat fokus pada hal-hal yang penting bagi Anda. Lacak yang Anda inginkan dari satu tempat.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Apa itu Komunitas?",
    whatsACommunityContent : "Komunitas adalah suatu pusat tempat Anda dapat berbagi konten dan ide. Anda dapat berkolaborasi dengan tim Anda atau dengan orang-orang yang memiliki minat yang sama.",
    whatCanIJoinTitle : "Di mana saya dapat bergabung?",
    whatCanIJoinContent : "Komunitas yang direkomendasikan menunjukkan komunitas di mana kolega Anda telah bergabung. Jika Anda menemukan komunitas yang Anda sukai, klik komunitas tersebut. Anda juga dapat mencari komunitas di mana Anda ingin bergabung.",
    whatColleaguesUpToTitle : "Apa yang sedang dilakukan kolega saya?",
    whatColleaguesUpToContent : "Tampilan organisasi Anda mencantumkan daftar semua komunitas publik tempat Anda dapat bergabung. Jelajahi komunitas yang menarik minat Anda.",
    startOwnCommTitle : "Buat komunitas Anda sendiri!",
    startOwnCommContent : "Tidak menemukan yang Anda butuhkan? Buat komunitas sehingga Anda dapat berbagi dan berkolaborasi dengan yang lain.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Jadikan lebih tertata!",
    getOrganizedContent : "File memungkinkan Anda untuk menyimpan dokumen dan foto Anda pada lokasi terpusat sehingga Anda dapat mengakses dan membagikannya dari mana saja.",
    findCreateFileTitle : "Tambahkan atau buat file",
    findCreateFileContent : "Unggah file yang sudah ada, atau buat dokumen baru jika HCL Docs tersedia untuk Anda. Apa pun pilihan Anda, file Anda tersedia hanya untuk Anda atau dapat Anda bagikan dengan orang lain.",
    takeActionTitle : "Lakukan Sesuatu!",
    takeActionContent : "File milik Anda muncul di tampilan File Saya, di mana Anda dapat menandai dan menyematkan file, menambahkan file ke folder, dan membagikannya dengan orang lain.<br/><br/>Klik file untuk menampilkan dan memberi komentar pada file.",
    getLatestTitle : "Jadikan lebih tertata dengan Drive Saya",
    getLatestContent : "Tata file dan folder utama dalam satu tempat. Jika organisasi Anda mendukung fitur sinkronisasi, pasang plug-in Desktop untuk menyinkronkan perubahan secara otomatis ke file.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Bergabunglah dengan Komunitas!",
    teamUpContent : "Bergabunglah atau ikuti komunitas untuk bekerja sama dengan tim. Komunitas yang Anda miliki, di mana Anda tergabung, atau Anda ikuti dicantumkan bersama-sama sehingga Anda dapat fokus pada hub Anda yang paling penting.",
    getBackTitle : "Kembali ke komunitas favorit Anda dengan cepat!",
    getBackContent : "Tampilkan komunitas yang terakhir Anda kunjungi sehingga Anda dapat mempelajari aktivitas terakhir Anda dengan mudah. Anda juga dapat mengubah tampilan atau menggunakan pencarian untuk menemukan komunitas.",
    createUniqueTitle : "Buat komunitas yang unik!",
    createUniqueContent : "Gunakan aplikasi Connections yang Anda ketahui untuk membuat hub tim.  Atau, gunakan aplikasi Highlights untuk membuat pengalaman kustom dengan konten dari berbagai sumber, yang disesuaikan untuk pengguna Anda.  Lihat aplikasi!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Lihat Anda sudah di mana saja",
    seeWhereContent : "Kembali ke file atau folder yang Anda buat atau kerjakan bersama... dengan cepat!",
    filterFilesTitle : "Filter file sesuai dengan cara Anda",
    filterFilesContent : "Gunakan panel navigasi untuk menemukan file. Jelajahi menurut tampilan, atau persempit tampilan saat ini menurut tanda, tanggal, orang, dan lebih banyak lagi.<br/><br/>Lihat lebih banyak konten! Klik ikon aktif untuk menyembunyikan panel samping.",
    metricsThemeTreeTitle : "Pilih fokus Anda",
    metricsThemeTreeContent : "Tampilkan metrik di seluruh komunitas Anda melalui lense yang berbeda.",
    metricsDateRangeTitle : "Lihat perubahan seiring waktu",
    metricsDateRangeContent : "Analisis data untuk rentang periode waktu dari mimggu lalu hingga sejak komunitas dimulai, atau untuk periode yang Anda tentukan.",
    metricsSwitchTitle : "Dapatkan dengan kedua cara",
    metricsSwitchContent : "Alihkan di antara ikon untuk menampilkan total sebagai bagan atau tabel.",
    metricsGroupByTitle : "Filter berdasarkan kelompok",
    metricsGroupByContent : "Lihat data untuk semua orang, atau bagi berdasarkan geografi, peran, atau departemen."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
