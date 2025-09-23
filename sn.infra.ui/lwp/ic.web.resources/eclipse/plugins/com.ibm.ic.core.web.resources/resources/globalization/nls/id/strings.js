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
      "globalization" : {
         "windowtitle" : "Globalisasi",
         "unavailable" : "Pengaturan Globalisasi tidak tersedia",
         "details" : "Tentukan bahasa pilihan Anda, kalender mana yang Anda pilih, dan arah di mana teks user-generated mengalir.",
         "error" : "Pengaturan Globalisasi tidak diterima karena terjadi kesalahan.",
         "titlebar" : {
            "tab2" : "Akses Aplikasi",
            "tab1" : "Notifikasi Email",
            "tab3" : "Globalisasi"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Menekan tombol ini menyegarkan halaman terkini, dengan konten baru.  Untuk kembali ke menu ini, navigasi kembali ke:"
         },
         "details_nolanguage" : "Tentukan kalender mana yang Anda pilih, dan arah di mana teks user-generated mengalir.",
         "a11y" : {
            "titlebar_label" : "Pengaturan HCL Connections",
            "body_label" : "Pengaturan Globalisasi"
         },
         "heading" : "Pengaturan Globalisasi"
      },
      "restore_defaults" : {
         "error" : "Terjadi kesalahan. Harap coba lagi.",
         "action_tooltip" : "Pulihkan pengaturan globalisasi ke nilai standar awal",
         "action" : "Pulihkan Standar",
         "success" : "Pengaturan globalisasi Anda telah dipulihkan ke nilai standar awal."
      },
      "help" : {
         "help" : "Bantuan",
         "close" : "Tutup"
      },
      "save" : {
         "error" : "Terjadi kesalahan. Harap coba lagi.",
         "action_tooltip" : "Simpan pengaturan globalisasi",
         "action" : "Simpan",
         "success" : "Pengaturan globalisasi Anda telah diperbarui."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Pulihkan Standar"
         },
         "bidi" : {
            "help" : "Bantuan Aktifkan teks dua arah",
            "label" : "Aktifkan teks dua arah",
            "tooltip" : "Memunculkan tampilan tertentu bahasa dari teks gabungan dan teks terstruktur, seperti jalur file.  Kemudian juga memungkinkan Anda untuk menentukan independen arah teks dari pilihan bahasa Anda."
         },
         "error" : "Terjadi Kesalahan",
         "save" : {
            "label" : "Simpan"
         },
         "direction" : {
            "label" : "Arah teks yang dibuat oleh pengguna:",
            "tooltip" : "Arah teks yang berasal dari input pengguna, seperti nama dari konten dan navigasi breadcrumbs.  Secara standar, ini ditentukan oleh pilihan bahasa Anda (kiri ke kanan sebagian besar).  Memilih kontekstual memungkinkan sistem untuk menentukan arah berdasarkan analisis karakter (mendukung teks arah-campuran).",
            "options" : {
               "contextual" : "Kontekstual (berdasarkan karakter)",
               "rtl" : "Kanan ke kiri",
               "ltr" : "Kiri ke kanan",
               "default_ltr" : "Gunakan bahasa standar (kiri ke kanan)",
               "default_rtl" : "Gunakan bahasa standar (kanan ke kiri)"
            }
         },
         "cancel" : {
            "label" : "Batal"
         },
         "language" : {
            "selected" : "${0} (saat ini)",
            "label" : "Bahasa:",
            "tooltip" : "Tentukan bahasa di mana teks aplikasi akan ditampilkan.  Pengaturan ini tidak akan mempengaruhi teks yang dibuat oleh pengguna."
         },
         "calendar" : {
            "label" : "Kalender:",
            "options" : {
               "hebrew" : "Ibrani",
               "gregorian" : "Gregorian",
               "hijri" : "Hijriah"
            }
         }
      }
});
