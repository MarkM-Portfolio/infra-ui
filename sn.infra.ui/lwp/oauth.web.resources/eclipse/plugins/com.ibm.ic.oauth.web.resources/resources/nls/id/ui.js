/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
define({
      "authorize" : {
         "legal" : "Materi-materi yang dilisensikan - Milik IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, logo IBM, ibm.com, dan Lotus adalah merek dagang dari IBM Corporation di Amerika Serikat, negara-negara lain, atau keduanya. Pembatasan Hak Pengguna oleh Pemerintah Negara A.S. : Penggunaan, penggandaan, atau pengungkapan dibatasi oleh Kontrak Skedul GSA ADP dengan IBM Corp. Harap lihat halaman di atas untuk informasi lebih lanjut.",
         "error" : "Kesalahan terjadi. Harap coba lagi.",
         "granted" : {
            "title" : "Akses Diberikan",
            "blurb" : "Anda telah memberikan akses ${0} untuk berinteraksi dengan akun HCL Connections Anda."
         },
         "denied" : {
            "title" : "Akses Ditolak",
            "blurb" : "Abda telah menolak akses ${0} untuk berinteraksi dengan akun HCL Connections Anda."
         },
         "blurb" : "{0} meminta akses ke informasi HCL Connections Anda, termasuk semua konten Anda di Connections.",
         "revoke" : {
            "description" : "Anda dapat mencabut akses setiap saat melalui Pengaturan Koneksi > {0}. Koneksi dapat secara berkala meminta Anda untuk mengotorisasi kembali.",
            "link" : "Akses Aplikasi"
         },
         "authorize" : {
            "label" : "Beri Akses"
         },
         "windowtitle" : "Otorisasi akses ke HCL Connections",
         "title" : "Permintaan Akses",
         "deny" : {
            "label" : "Tolak Akses"
         },
         "action_tooltip" : "Berikan akses ke aplikasi ${0}",
         "action" : "Beri Akses",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Mengarahkan Anda kembali ke ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Aktifkan JavaScript",
            "p2" : "Segarkan halaman untuk melanjutkan.",
            "p1" : "JavaScript telah dimatikan di web browser Anda.  HCL Connections memerlukan JavaScript agar dapat berfungsi.  Setelah Anda mengaktifkannya, harap muat kembali halaman tersebut."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Kami tidak dapat memproses permintaan Anda",
            "description" : "Permintaan yang dikeluarkan oleh aplikasi yang meminta akses ke akun HCL Connections Anda tidak lengkap.  Klik tombol kembali pada browser untuk kembali ke situs atau aplikasi yang mengarahkan Anda ke sini dan coba lagi.  Jika masalah berlanjut, laporkan pada administrator Anda."
         },
         "invalid_token" : {
            "title" : "Kami tidak dapat memproses permintaan Anda",
            "description" : "Permintaan yang dikeluarkan oleh aplikasi yang meminta akses ke akun HCL Connections Anda tidak valid.  Klik tombol kembali pada browser untuk kembali ke situs atau aplikasi yang mengarahkan Anda ke sini dan coba lagi.  Jika masalah berlanjut, laporkan pada administrator Anda."
         },
         "default_action" : {
            "label" : "Kembali ke Halaman Beranda"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Kesalahan:",
            "icon_alt" : "Terjadi Kesalahan"
         },
         "success" : {
            "a11y_label" : "Berhasil:",
            "icon_alt" : "Berhasil"
         },
         "warning" : {
            "a11y_label" : "Peringatan:",
            "icon_alt" : "Peringatan"
         },
         "info" : {
            "a11y_label" : "Informasi:",
            "icon_alt" : "Informasi"
         }
      },
      "loading" : "Memuat...",
      "deny" : {
         "error" : "Kesalahan terjadi. Harap coba lagi.",
         "action_tooltip" : "Tolak akses ke aplikasi ${0}",
         "action" : "Tolak Akses",
         "success" : "Akses ditolak."
      },
      "grid" : {
         "applications" : {
            "summary" : "Daftar aplikasi dengan akses ke informasi HCL Connections Anda.",
            "loading" : "Memuat...",
            "empty" : "Tidak ada aplikasi yang ditemukan.",
            "reverse_sort" : "Urutkan Terbalik"
         }
      },
      "applications" : {
         "windowtitle" : "Akses Aplikasi",
         "details" : "Aplikasi dengan akses ke informasi HCL Connections Anda.",
         "error" : "Daftar tidak diperoleh karena terjadi kesalahan.",
         "titlebar" : {
            "tab2" : "Akses Aplikasi",
            "tab1" : "Notifikasi Email",
            "tab3" : "Globalisasi"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Menekan tombol ini menyegarkan halaman terkini, dengan konten baru.  Untuk kembali ke menu ini, navigasi kembali ke:"
         },
         "a11y" : {
            "titlebar_label" : "Pengaturan HCL Connections"
         },
         "heading" : "Akses Aplikasi"
      },
      "sorts" : {
         "application_name" : "Nama Aplikasi",
         "authorization_date" : "Tanggal Otorisasi",
         "expiration_date" : "Tanggal Kedaluwarsa",
         "action" : "Tindakan"
      },
      "revoke_token" : {
         "error" : "Kesalahan terjadi. Harap coba lagi.",
         "dialog_title" : "Batalkan Akses",
         "action_tooltip" : "Batalkan akses ke aplikasi ${0}",
         "action" : "Batal",
         "ok" : "OK",
         "cancel" : "Batal",
         "confirm" : "Batalkan akses aplikasi ke informasi HCL Connections Anda? ",
         "success" : "Aplikasi telah dihapus."
      }
});
