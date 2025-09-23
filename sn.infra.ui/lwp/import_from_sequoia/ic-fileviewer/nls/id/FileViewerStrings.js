/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

//NLS_CHARSET=UTF-8

define ({
  root: {
     FILE_VIEWER_TITLE: "Pratinjau file",
     FILENAME_TOOLTIP: "Edit nama file",
     ICON_TOOLTIP: "Unduh file",
     ERROR: "Terjadi kesalahan.",
     SHARED_EXTERNALLY: "Dibagi secara eksternal",
     FILE_SYNCED: "Tambahkan ke sinkronisasi",
     MORE_ACTIONS: {
       TITLE: "Tindakan Lain",
       A11Y: "Buka menu drop-down dengan daftar tindakan lainnya untuk dijalankan pada file."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Opsi lebih banyak",
         A11Y: "Tombol ini membuka menu untuk opsi lebih banyak."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Edit"
         },
         UPLOAD: {
           TITLE: "Unggah"
         }
       }
     },
     WELCOME: {
       TITLE: "Kami telah mengombinasikan Tampilan File dan Detail",
       SUBTITLE: "Sekarang Anda dapat melihat file beserta komentar-komentarnya secara berdampingan.",
       LINES: {
          LINE_1: "Semua informasi dan hal-hal yang dapat Anda lakukan di halaman lama dapat ditemukan di sini.",
          LINE_2: "Komentar, berbagi, versi, dan informasi dasar tersedia di bagian samping file."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Tombol ini akan mengarahkan ke file berikutnya.",
      PREVIOUS_A11Y: "Tombol ini akan mengarahkan ke file sebelumnya."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Tutup",
         A11Y: "Tombol ini akan menutup penampil file."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Baru dari File",
         ACTION_NAME:"Buat File",
         A11Y: {
           TEXT: "Membuat dokumen (file DOC,DOCX atau ODT) dari file templat. Anda dapat mengedit dokumen-dokumen online ini di Docs.",
           PRES: "Membuat presentasi (file PPT, PPTX atau ODP) dari file templat. Anda dapat mengedit presentasi online ini di Docs.",
           SHEET: "Membuat spreasheet (file XLS, XLSX atau ODS file) dari file templat. Anda dapat mengedit spreadsheet online ini di Docs."
         },
         PROMPT: {
           TEXT: "Membuat dokumen (file DOC,DOCX atau ODT) dari file templat. Anda dapat mengedit dokumen-dokumen online ini di Docs.",
           PRES: "Membuat presentasi (file PPT, PPTX atau ODP) dari file templat. Anda dapat mengedit presentasi online ini di Docs.",
           SHEET: "Membuat spreasheet (file XLS, XLSX atau ODS file) dari file templat. Anda dapat mengedit spreadsheet online ini di Docs."
         },
         NAME_FIELD: "Nama:",
         EXTERNAL_FIELD: "File tidak dapat dibagikan dengan orang di luar organisasi saya",
         EXTERNAL_DESC: "Akses eksternal memungkinkan file dibagikan dengan pengguna eksternal (orang di luar perusahaan atau organisasi Anda), folder dibagikan dengan pengguna eksternal, dan komunitas dengan anggota orang luar. Anda harus mengatur akses eksternal saat mengunggah suatu file; akses eksternal tidak dapat diaktifkan kemudian.",
         CREATE_BUTTON: "Buat",
         CANCEL: "Batal",
         PRE_FILL_NAMES: {
           OTT: "Dokumen Tanpa Judul",
           OTS: "Spreadsheet Tanpa Judul",
           OTP: "Presentasi Tanpa Judul",
           DOT: "Dokumen Tanpa Judul",
           XLT: "Spreadsheet Tanpa Judul",
           POT: "Presentasi Tanpa Judul",
           DOTX: "Dokumen Tanpa Judul",
           XLTX: "Spreadsheet Tanpa Judul",
           POTX: "Presentasi Tanpa Judul"
         },
         ERRORS: {
           NAME_REQUIRED: "Nama dokumen wajiib diisi.",
           ILLEGAL_NAME:"Ini adalah judul dokumen yang tidak sah, harap tentukan yang lain.",
           WARN_LONG_NAME: "Nama dokumen terlalu panjang.",
           TRIM_NAME: "Persingkat nama dokumen?",
           SESSION_TIMEOUT: "Sesi Anda telah berakhir, harap login dan coba kembali.",
           DUPLICATE_NAME: "Nama file duplikat tidak ditemukan. Masukkan nama baru.",
           SERVER_ERROR: "Server Connections tidak tersedia. Hubungi administrator server dan coba lagi nanti."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Unduh file",
         A11Y: "Tombol ini akan mengunduh file."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Unduh sebagai PDF",
         TOOLTIP: "Unduh file ini sebagai file PDF",
         A11Y: "Tombol ini mengunduh file sebagai PDF.",
         SUCCESS: "Anda telah berhasil mengunduh file sebagai PDF.",
         ERROR: {
           DEFAULT: "Anda tidak dapat mengunduh file sebagai PDF.  Harap coba lagi.",
           UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login kembali sebelum Anda dapat mengunduh file PDF.",
           NOT_FOUND: "File tidak dapat diunduh sebagai PDF karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
           ACCESS_DENIED: "File tidak dapat diunduh sebagai PDF karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Tidak ada versi yang dipublikasikan dari file ini untuk diunduh.  Versi dapat dipublikasikan dari editor Docs."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Tidak Dapat Mengunduh File",
           CANCEL: "Tutup",
           PROMPT: "Tidak ada versi file ini yang dipublikasikan untuk diunduh.",
           PROMPT2: "Versi dapat dipublikasikan dari editor Docs."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Tidak Dapat Mengunduh File",
           CANCEL: "Tutup",
           PROMPT: "Tidak ada versi file ini yang dipublikasikan untuk diunduh.",
           PROMPT2: "Mintalah pemilik file untuk mempublikasikan versi file ini."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Mengunduh Versi",
           OK: "Mengunduh Versi",
           PROMPT: {
             TODAY: "Draf terbaru, terakhir diedit hari ini pukul ${time}, telah ditemukan.",
             YESTERDAY: "Draf terbaru, terakhir diedit kemarin pukul ${time}, telah ditemukan.",
             DAY: "Draf terbaru, terakhir diedit pada ${date}, telah ditemukan.",
             MONTH: "Draf terbaru, terakhir diedit pada ${date}, telah ditemukan.",
             YEAR: "Draf terbaru, terakhir diedit pada ${date_long}, telah ditemukan."
           },
           PROMPT2: {
             TODAY: "Apakah Anda yakin ingin melanjutkan mengunduh versi yang dipublikasikan hari ini pukul ${time}?",
             YESTERDAY: "Apakah Anda yakin untuk melanjutkan mengunduh versi yang dipublikasikan kemarin pukul ${time}?",
             DAY: "Apakah Anda yakin untuk melanjutkan mengunduh versi yang dipublikasikan pada ${date}?",
             MONTH: "Apakah Anda yakin untuk melanjutkan mengunduh versi yang dipublikasikan pada ${date}?",
             YEAR: "Apakah Anda yakin untuk melanjutkan mengunduh versi yang dipublikasikan pada ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Tampilkan panel detail",
         HIDE: "Sembunyikan panel detail",
         SHOW_A11Y: "Tombol ini akan membuka dan menutup panel samping. Panel samping saat ini ditutup.",
         HIDE_A11Y: "Tombol ini akan membuka dan menutup panel samping. Panel samping saat ini dibuka."
       },
       VIEW_DOC: {
         NAME: "Buka di Docs Viewer",
         TOOLTIP: "Buka di Docs Viewer",
         A11Y: "Tombol ini membuka file untuk dilihat di dalam jendela browser baru."
       },
       EDIT_DOC: {
         NAME: "Edit di Docs",
         TOOLTIP: "Edit file di Docs",
         A11Y: "Tombol ini akan membuka file untuk diedit di Docs di dalam jendela baru."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Edit di Desktop",
         DIALOG_TITLE: "Edit di Desktop",
         TOOLTIP: "Edit dokumen ini",
         A11Y: "Tombol ini membuka file untuk mengedit secara lokal.",
         PROMPT: "Fitur ini memperbolehkan Anda untuk mengedit file secara lokal.",
         IMPORTANT: "Penting:",
         REMINDER: "Setelah Anda menyelesaikan pengeditan, Anda harus mempublikasikan draf menggunakan konektor file desktop. Jika file gagal dibuka, Anda mungkin perlu memasang plugin desktop.",
         SKIP_DIALOG: "Jangan tampilkan pesan ini kembali.",
         OK: "Ya",
         CANCEL: "Batal"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Konfirmasikan",
         DELETE_VERSION: "Hapus versi ${version}",
         DELETE_VERSION_AND_PRIOR: "Hapus versi ${version} dan semua versi sebelumnya",
         PROMPT: "Anda akan menghapus versi ${version}. Apakah Anda ingin melanjutkan?",
         DELETE_PRIOR: "Juga menghapus semua versi sebelumnya",
         ERROR: "Terjadi kesalahan ketika menghapus versi. Ulangi kembali nanti.",
         TOOLTIP: "Hapus versi ini",
         OK: "Ya",
         CANCEL: "Batal"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Dapatkan Tautan",
         LINK_FILE: "Tautkan ke file:",
         LINK_PREVIEW: "Tautkan ke file pratinjau:",
         LINK_DOWNLOAD: "Tautan ke file unduhan:",
         TOOLTIP: "Tautkan ke file",
         OK: "Tutup"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Unduh versi ini"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Konfirmasikan",
         PROMPT: "Anda akan mengganti versi file saat ini dengan versi ${version}. Apakah Anda ingin melanjutkan?",
         ERROR: "Terjadi kesalahan saat memulihkan versi. Ulangi kembali nanti.",
         TOOLTIP: "Pulihkan versi ini",
         CHANGE_SUMMARY: "Pulihkan dari versi ${version}",
         OK: "Ya",
         CANCEL: "Batal"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Konfirmasikan",
         REMOVE_EVERYONE: "Anda yakin ingin menghapus akses organisasi Anda ke file ini? Jika akses dihapus, maka file akan dihapus dari folder dan komunitas yang mengizinkan akses level organisasi, dan hanya pemilik dan orang yang diberi akses yang dapat melihat dan bekerja dengannya.",
         REMOVE_USER: "Anda yakin ingin menghentikan pembagian dengan ${user}? Jika Anda berhenti berbagi, ${user} hanya dapat mengakses file ini melalui folder atau jika file ini dibagikan dengan setiap orang dalam organisasi Anda.",
         REMOVE_COMMUNITY: "Anda yakin ingin menghapus file ini dari komunitas ${communityName}?",
         REMOVE_FOLDER: "Anda yakin ingin menghapus file ini dari folder ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Hapus akses organisasi Anda",
         REMOVE_USER_TOOLTIP: "Hapus semua pembagian dengan ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Hapus dari komunitas ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Hapus dari folder ${folderName}",
         OK: "OK",
         CANCEL: "Batal"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Edit komentar ini"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Konfirmasikan",
         PROMPT: "Apakah Anda yakin ingin menghapus komentar ini?",
         ERROR: "Terjadi kesalahan saat menghapus komentar. Ulangi kembali nanti.",
         TOOLTIP: "Hapus komentar berikut",
         OK: "Ya",
         CANCEL: "Batal"
       },
       LIKE: {
         LIKE: "Sukai file",
         UNLIKE: "Batal menyukai file",
         LIKE_A11Y: "Tombol ini menyukai file.",
         UNLIKE_A11Y: "Tombol ini tidak menyukai file.",
         LIKED_SUCCESS: "Anda menyukai file ini",
         UNLIKE_SUCCESS: "Anda batal menyukai file ini"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Edit deskripsi",
         ERROR: {
           DEFAULT: "Deskripsi tidak dapat disimpan. Ulangi kembali nanti.",
           UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login kembali sebelum Anda dapat memperbarui deskripsi.",
           NOT_FOUND: "Deskripsi tidak dapat disimpan karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
           ACCESS_DENIED: "Deskripsi tidak dapat disimpan karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Kesalahan dalam menyimpan nama file",
           CONFLICT: "Nama file sudah ada"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Terjadi kesalahan saat mengikuti file ini. Ulangi kembali nanti.",
             UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login kembali sebelum Anda dapat mengikuti file ini.",
             NOT_FOUND: "Anda tidak dapat mengikuti file ini karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
             ACCESS_DENIED: "Anda tidak dapat mengikuti file ini karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
           },
           UNFOLLOW: {
             DEFAULT: "Terjadi kesalahan saat berhenti mengikuti file ini. Ulangi kembali nanti.",
             UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login kembali sebelum Anda dapat berhenti mengikuti file ini.",
             NOT_FOUND: "Anda tidak dapat berhenti mengikuti file ini karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
             ACCESS_DENIED: "Anda tidak dapat berhenti mengikuti file ini karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
           }
         },
         FOLLOW_NAME: "Ikuti",
         FOLLOW_TOOLTIP: "Ikuti file ini",
         FOLLOW_A11Y: "Tombol ini mengikuti file.",
         FOLLOW_SUCCESS: "Anda sekarang mengikuti file ini.",
         STOP_FOLLOWING_NAME: "Berhenti Mengikuti",
         STOP_FOLLOWING_TOOLTIP: "Berhenti mengikuti file ini",
         STOP_FOLLOWING_A11Y: "Tombol ini berhenti menyukai file.",
         STOP_FOLLOWING_SUCCESS: "Anda telah berhenti mengikuti file ini."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Tambah ke Sinkronisasi",
           TOOLTIP: "Tambahkan file ini ke sinkronisasi",
           A11Y: "Tombol ini menambahkan file ke sinkronisasi.",
           SUCCESS: "Anda telah menambahkan file ini ke sinkronisasi.",
           ERROR: {
             DEFAULT: "Terjadi kesalahan saat menambahkan file ini ke sinkronisasi. Ulangi kembali nanti.",
             UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login kembali sebelum Anda dapat menambah file ke sinkronisasi.",
             NOT_FOUND: "Anda tidak dapat menambah file ini ini ke sinkronisasi karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
             ACCESS_DENIED: "Anda tidak dapat menambah file ini ini ke sinkronisasi karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
           }
         },
         STOP_SYNC: {
           NAME: "Hapus dari Sinkronisasi",
           TOOLTIP: "Hapus file ini dari sinkronisasi",
           A11Y: "Tombol ini menghapus file dari sinkronisasi.",
           SUCCESS: "Anda telah menghapus file ini dari sinkronisasi.",
           ERROR: {
             DEFAULT: "Terjadi kesalahan saat menghapus file ini dari sinkronisasi. Ulangi kembali nanti.",
             UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login kembali sebelum Anda dapat menghapus file ini dari sinkronisasi.",
             NOT_FOUND: "Anda tidak dapat menghapus file ini ke sinkronisasi karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
             ACCESS_DENIED: "Anda tidak dapat menghapus file ini ke sinkronisasi karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Sematkan",
          FAVORITE_TOOLTIP: "Sematkan file ini",
          FAVORITE_A11Y: "Tombol ini menyematkan file.",
          FAVORITE_SUCCESS: "Anda menyematkan file ini.",
          STOP_FAVORITEING_NAME: "Buka sematan",
          STOP_FAVORITEING_TOOLTIP: "Buka sematan file ini",
          STOP_FAVORITEING_A11Y: "Tombol ini membuka sematan file.",
          STOP_FAVORITEING_SUCCESS: "Anda telah membuka sematan file ini."
       },
       TRASH: {
         NAME: "Pindahkan ke Folder Sampah",
         DIALOG_TITLE: "Konfirmasikan",
         PROMPT: "Anda yakin ingin memindahkan file ini ke folder sampah? Memindahkan file ini ke folder sampah menjadikannya tidak tersedia untuk setiap orang yang saat ini sedang dibagi.",
         ERROR: "Terjadi kesalahan ketika sedang menghapus file. Ulangi kembali nanti.",
         TOOLTIP: "Hapus file ini",
         OK: "Ya",
         CANCEL: "Batal",
         A11Y: "Tombol ini memindahkan file ke folder sampah.",
         SUCCESS_MSG: "${file} telah dipindahken ke folder sampah."
       },
       REFRESH: {
         NAME: "Segarkan",
         ERROR: "Terjadi kesalahan ketika sedang menyegarkan Penampil File. Ulangi kembali nanti.",
         TOOLTIP: "Segarkan Penampil File",
         INFO_MSG: "Segarkan untuk mendapatkan konten terbaru. ${link}",
         A11Y: "Tombol ini memindahkan file ke folder sampah.",
         SUCCESS_MSG: "Konten berhasil disegarkan."
       },
       COPY_FILE: {
         NAME: "Berikan Salinan ke Komunitas",
         DIALOG_TITLE: "Konfirmasikan",
         ERROR: "Terjadi kesalahan ketika sedang menyalin file. Ulangi kembali nanti.",
         TOOLTIP: "Berikan salinan file ini ke sebuah komunitas",
         OK: "Ya",
         CANCEL: "Batal",
         A11Y: "Tombol ini membuka dialog yang mengizinkan Anda untuk memberikan salinan file ini ke sebuah komunitas.",
         SUCCESS_MSG: "${file} telah disalin ke ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Unggah Versi Baru",
         NAME_SHORT: "Unggah",
         CHANGE_SUMMARY: "Ringkasan perubahan opsional...",
         TOOLTIP: "Unggah versi baru dari file ini",
         A11Y: "Tombol ini membuka dialog yang mengizinkan Andauntuk mengunggah versi baru dari file ini."
       },
       LOG_IN: {
    	   NAME: "Login",
    	   TOOLTIP: "Login untuk mengunggah dan berbagi file, komentar, dan membuat folder."
       },
       LOCK: {
          NAME: "Kunci File",
          TITLE: "Kunci File ini",
          A11Y: "Kunci File ini",
          SUCCESS: "File sekarang dikunci."
       },
       UNLOCK: {
          NAME: "Buka Kunci File",
          TITLE: "Buka Kunci File ini",
          A11Y: "Buka Kunci File ini",
          SUCCESS: "File sekarang tidak dikunci."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Edit pada desktop",
          TITLE: "Edit pada desktop",
          A11Y: "Edit pada desktop"
       },
       FLAG: {
         FILE: {
           NAME: "Diberi label sebagai publikasi yang tidak layak",
           TITLE: "Beri Tanda File",
           A11Y: "Beri tanda file ini sebagai tidak sesuai",
           PROMPT: "Berikan alasan untuk memberi tanda file ini (opsional):",
           OK: "Label",
           CANCEL: "Batal",
           SUCCESS: "File ini telah diberi tanda dan dikirim untuk ditinjau.",
           ERROR: "Terjadi kesalahan saat melabeli file ini, harap coba lagi nanti."
         },
         COMMENT: {
           NAME: "Diberi label sebagai publikasi yang tidak layak",
           TITLE: "Labeli Komentar",
           A11Y: "Labeli komentar yang tidak pantas berikut",
           PROMPT: "Berikan alasan untuk panandaan komnetar berikut (pilihan):",
           OK: "Label",
           CANCEL: "Batal",
           SUCCESS: "Komentar telah diberi label dan dikirim untuk ditinjau.",
           ERROR: "Terjadi kesalahan saat melabeli komentar ini, harap coba lagi nanti."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Tentang File Ini",
       VIEW_FILE_DETAILS: "Lihat Detail File",
       A11Y: "Mengaktifkan tautan ini akan menutup penampil file dan mengarahkan Anda ke halaman detail file untuk file ini."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Tidak ada pratinjau yang tersedia untuk file ini."
      },
      IMAGE: {
       ZOOM_IN: "Perbesar",
       ZOOM_OUT: "Perkecil",
       RESET: "Atur ulang",
       ZOOM_IN_A11Y: "Tombol ini akan memperbesar gambar.",
       ZOOM_OUT_A11Y: "Tombol ini akan memperkecil gambar.",
       RESET_ZOOM_A11Y: "Tombol ini akan mengatur ulang tingkat perbesaran."
      },
      VIEWER: {
       LOADING: "Memuat...",
       NO_PUBLISHED_VERSION: "Versi yang dipublikasikan dari file ini tidak tersedia untuk ditampilkan.",
       IFRAME_TITLE: "Pratinjau dari file ini"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Pembaruan terakhir oleh ${user} hari ini pada pukul ${time}",
       YESTERDAY: "Pembaruan terakhir oleh ${user} kemarin pada pukul ${time}",
       DAY: "Pembaruan terakhir oleh ${user} hari ${EEee} pada pukul ${time}",
       MONTH: "Pembaruan terakhir oleh ${user} pada ${date_long}",
       YEAR: "Pembaruan terakhir oleh ${user} pada ${date_long}"
      },
      CREATED: {
       TODAY: "Dibuat oleh ${user} hari ini pada pukul ${time}",
       YESTERDAY: "Dibuat oleh ${user} kemarin pada pukul ${time}",
       DAY: "Dibuat oleh ${user} pada ${EEee} pada pukul ${time}",
       MONTH: "Dibuat oleh ${user} pada ${date_long}",
       YEAR: "Dibuat oleh ${user} pada ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - Hari Ini",
       YESTERDAY: "${time} - Kemarin",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Hari ini",
       YESTERDAY: "Kemarin",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Area teks komentar",
       SHADOW_TEXT: "Tambahkan komentar...",
       CANNOT_ACCESS_CONTENT: "Orang-orang yang Anda sebutkan berikut tidak dapat melihat komentar karena mereka tidak memiliki akses ke konten:",
       ERROR: "Terjadi kesalahan dalam memvalidasi pengguna yang Anda coba sebutkan.",
       POST: "Kirim",
       SAVE: "Simpan",
       CANCEL: "Batal",
       EXTERNAL_WARNING: "Komentar dapat dilihat oleh orang di luar organisasi Anda."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Batal",
         A11Y: "Tombol ini akan membatalkan tindakan pengeditan nama file."
       },
       INVALID_CHARACTERS: "Karakter yang tidak valid",
       INVALID_CHARACTERS_REMOVED: "Karakter yang tidak valid dihapus"
     },
     COMMENT_WIDGET: {
       EDITED: "(Diedit)",
       EDITED_DATE: {
         TODAY: "Diedit hari ini pada pukul ${time}",
         YESTERDAY: "Diedit kemarin pada pukul ${time}",
         DAY: "Diedit pada ${EEee} pada pukul ${time}",
         MONTH: "Diedit pada ${date_long}",
         YEAR: "Diedit pada ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Simpan",
       CANCEL: "Batal",
       USER: "Pengguna",
       COMMUNITY: "Komunitas",
       SHARE: "Bagi",
       SHARE_ALT: "Berbagi dengan pengguna ini",
       MEMBER_TYPE: "Jenis Anggota",
       PERSON_SHADOW: "Ketik untuk menemukan orang",
       COMMUNITY_SHADOW: "Ketik untuk menemukan komunitas",
       PERSON_FULL_SEARCH: "Orang tidak terdaftar? Gunakan pencarian penuh...",
       COMMUNITY_FULL_SEARCH: "Komunitas tidak terdaftar? Gunakan pencarian penuh...",
       ADD_OPTIONAL_MESSAGE: "Tambahkan Pesan Opsional",
       ROLE_LABEL: "Peran",
       ROLE_EDIT: "Editor",
       ROLE_VIEW: "Pembaca"
     },
     FILE_STATE: {
       DOCS_FILE: "Ini adalah file Docs. Semua pengeditan harus dilakukan secara online.",
       LOCKED_BY_YOU: {
         TODAY: "Dikunci oleh Anda pukul ${time}.",
         YESTERDAY: "Dikunci oleh Anda kemarin pukul ${time}.",
         DAY: "Dikunci oleh Anda pada ${date}.",
         MONTH: "Dikunci oleh Anda pada ${date}.",
         YEAR: "Dikunci oleh Anda pada ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Dikunci pukul ${time} oleh ${user}.",
         YESTERDAY: "Dikunci kemaren pukul ${time} oleh ${user}.",
         DAY: "Dikunci pada ${date} oleh ${user}.",
         MONTH: "Dikunci pada ${date} oleh ${user}.",
         YEAR: "Dikunci pada ${date_long} oleh ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Komentar terlalu panjang.",
         TRIM: "Persingkat komentar?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Deskripsi terlalu panjang.",
         TRIM: "Persingkat deskripsi?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Pesan terlalu panjang.",
         TRIM: "Persingkat pesan?"
       },
       TAG: {
         WARN_TOO_LONG: "Tanda terlalu panjang",
         TRIM: "Persingkat tanda?"
       },
       TAGS: {
         WARN_TOO_LONG: "Satu atau beberapa tanda terlalu panjang.",
         TRIM: "Persingkat tanda?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Nama file terlalu panjang"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "File ini tersedia hanya untuk diedit secara online jika Anda membeli kepemilikan Docs.",
       CURRENT_EDITORS: "File ini sedang diedit di web oleh ${users}.",
       UNPUBLISHED_CHANGES: "Terdapat pengeditan untuk draf ini yang belum dipublikasikan sebagai versi.",
       PUBLISH_A_VERSION: "Publikasikan versi",
       PUBLISH_SUCCESS: "Anda telah berhasil mempublikasikan versi file ini",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Versi tidak dapat dipublikasikan karena akses ditolak.",
         NOT_FOUND: "Versi tidak dapat dipublikasikan karena dokumen tidak ditemukan.",
         CANNOT_REACH_REPOSITORY: "Versi tidak dapat dipublikasikan karena server Docs tidak dapat tersambung dengan repositori file.",
         QUOTA_VIOLATION: "Versi tidak dapat dipublikasikan karena ada batasan ruang. Hapus file-file lain untuk memberikan ruang yang cukup untuk mempublikasikan versi ini.",
         CONVERSION_UNAVAILABLE: "Versi tidak dapat dipublikasikan karena layanan konversi Docs tidak tersedia. Ulangi kembali nanti.",
         TOO_LARGE: "Versi tidak dapat dipublikasikan karena dokumen berukuran terlalu besar.",
         CONVERSION_TIMEOUT: "Versi tidak dapat dipublikasikan karena layanan konversi Docs memerlukan waktu terlalu lama untuk mengonversi dokumen. Ulangi kembali nanti.",
         SERVER_BUSY: "Versi tidak dapat dipublikasikan karena server Docs sedang sibuk. Ulangi kembali nanti.",
         DEFAULT: "Versi tidak dapat dipublikasikan karena layanan Docs tidak tersedia. Ulangi kembali nanti."
       }
     },
     COMMENTS: {
       EMPTY: "Tidak ada komentar.",
       MODERATED: "Komentar telah dikirim untuk ditinjau dan akan tersedia jika disetujui.",
       ERROR: {
         SAVE: {
           DEFAULT: "Komentar Anda tidak dapat disimpan. Ulangi kembali nanti.",
           UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login lagi sebelum Anda dapat menyimpan komentar Anda.",
           NOT_FOUND: "Komentar Anda tidak dapat disimpan karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
           ACCESS_DENIED: "Komentar Anda tidak dapat disimpan karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
         },
         DELETE: {
           DEFAULT: "Komentar Anda tidak dapat dihapus. Ulangi kembali nanti.",
           UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login lagi sebelum Anda dapat menghapus komentar Anda.",
           NOT_FOUND: "Komentar Anda tidak dapat dihapus karena file telah dihapus atau tidak lagi dibagikan dengan Anda.",
           ACCESS_DENIED: "Komentar Anda tidak dapat dihapus karena file telah dihapus atau tidak lagi dibagikan dengan Anda."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Simpan",
       EDIT_TAGS: "Edit tanda",
       ERROR: {
         SAVE: {
           DEFAULT: "Tanda tidak dapat dibuat. Ulangi kembali nanti."
         },
         DELETE: {
           DEFAULT: "Tanda tidak dapat dihapus. Ulangi kembali nanti."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Baca Lebih Lanjut...",
       READ_LESS: "Baca lebih singkat..."
     },
     SHARE: {
	     EVERYONE: "Semua orang dalam organisasi saya",
	     ADD_TOOLTIP: "Simpan",
	     ROLES: {
	       OWNER: "Pemilik",
	       EDIT: "Editor-editor",
	       VIEW: "Pembaca-pembaca",
	       FOLDER: "Dibagi dengan Folder"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Pemilik"
	       },
	       EDIT: {
	         ROLE: "Edit",
           ADD: "Tambahkan Editor"
	       },
	       VIEW: {
	         ROLE: "Pembaca",
           ADD: "Tambahkan Pembaca"
	       },
	       FOLDER: {
           ADD: "Tambahkan Folder",
           COMMUNITY_ADD: "Tambahkan ke Folder",
           MOVE: "Pindahkan ke Folder"
	       },
	       MULTI: {
	         ADD: "Tambahkan Orang atau Komunitas",
	         ADD_PEOPLE: "Tambahkan Orang"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Semua orang dalam organisasi saya",
	        LONG: {
	           GENERIC: "Semua orang di organisasi Anda.",
	           ORG: "Semua orang di ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "File telah dibagikan dengan ${user}.",
	       ERROR: "Tidak dapat berbagi dengan ${user} saat ini.",
	       SELF: "Anda tidak dapat berbagi dengan diri Anda sendiri."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} telah dipromosikan ke peran berbagi yang lebih tinggi."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Berhasil dibagikan dengan ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Pesan opsional..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Penyediaan untuk Pengguna Eksternal",
            ACTION: "Penyediaan untuk pengguna eksternal...",
            TOOLTIP: "Penyediaan untuk pengguna eksternal",
            DIALOG_TITLE: "Konten Tidak Dibagi",
            PROMPT: {
              NO_ACCOUNT: "Pengguna berikut tidak memiliki akun dan tidak ada konten yang dibagikan dengan mereka.",
              INVITE: "Undang pengguna ini sebagai tamu untuk berbagi konten dengan mereka."
            },
            SUBMIT: "Proses undangan",
            CANCEL: "Batal",
            ERROR: "Terjadi kesalahan saat menyediakan akun ini. Ulangi kembali nanti.",
            SUCCESS: "Berhasil menyediakan akun pengguna."
	       },
	       PLURAL: {
	         NAME: "Penyediaan untuk Pengguna Eksternal",
	         ACTION: "Penyediaan untuk pengguna eksternal...",
	         TOOLTIP: "Penyediaan untuk pengguna eksternal",
	         DIALOG_TITLE: "Konten Tidak Dibagi",
	         PROMPT: {
	           NO_ACCOUNT: "Pengguna berikut tidak memiliki akun dan tidak ada konten yang dibagikan dengan mereka.",
	           INVITE: "Undang pengguna ini sebagai tamu untuk berbagi konten dengan mereka."
	         },
	         SUBMIT: "Proses undangan",
	         CANCEL: "Batal",
	         ERROR: "Terjadi kesalahan saat menyediakan akun ini. Ulangi kembali nanti.",
	         SUCCESS: "Berhasil menyediakan akun pengguna."
	       },
	       ABSTRACT: {
	         NAME: "Penyediaan untuk Pengguna Eksternal",
            ACTION: "Penyediaan untuk pengguna eksternal...",
            TOOLTIP: "Penyediaan untuk pengguna eksternal",
            DIALOG_TITLE: "Konten Tidak Dibagi",
            PROMPT: {
              NO_ACCOUNT: "Beberapa pengguna tidak memiliki akun dan tidak ada konten yang dibagikan dengan mereka.",
              INVITE: "Undang pengguna ini sebagai tamu untuk berbagi konten dengan mereka."
            },
            SUBMIT: "Proses undangan",
            CANCEL: "Batal",
            ERROR: "Terjadi kesalahan saat menyediakan akun ini. Ulangi kembali nanti.",
            SUCCESS: "Berhasil menyediakan akun pengguna."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Opsi Berbagi",
         PROPAGATION: "Izinkan yang lain untuk membagi file ini",
         EVERYONE: "Semua orang dapat berbagi file ini.",
         OWNER_ONLY: "Hanya pemilik yang dapat membagi file ini.",
         STOP_SHARE: "Berhenti Berbagi",
         MAKE_INTERNAL: "Berhenti Berbagi Secara Eksternal",
         MAKE_INTERNAL_SUCCESS: "File ini tidak lagi dapat dibagikan dengan orang di luar organisasi Anda.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Menjadikan Internal?",
           PROMPT: "Menjadikan ini file internal akan berarti ini tidak lagi dibagikan dengan orang di luar organisasi Anda. ${br}${br}" +
             "Setiap pembagian dengan orang, komunitas, atau folder akan dihapus.${br}${br}Menjadikan file sebagai file internal akan bersifat permanen dan tidak dapat dibatalkan."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Berhenti Berbagi File",
           PROMPT: "Anda yakin ingin berhenti berbagi file ini?",
           QUESTION_PUBLIC: "File ini tidak lagi dapat dilihat oleh setiap orang dalam organisasi Anda, atau dibagikan dengan orang, folder, atau komunitas. Pengoperasian ini tidak dapat dibatalkan.",
           QUESTION_PUBLIC_E: "File ini tidak lagi dapat dilihat oleh setiap orang dalam organisasi Anda, atau dibagikan dengan orang atau folder. Pengoperasian ini tidak dapat dibatalkan.",
           QUESTION: "File akan tidak lagi dibagikan dengan orang atau komunitas, dan akan dihapus dari semua folder kecuali folder pribadi Anda. Tindakan ini tidak dapat dibatalkan.",
           QUESTION_E: "File akan tidak lagi dibagikan dengan orang, dan akan dihapus dari semua folder kecuali folder pribadi Anda. Tindakan ini tidak dapat dibatalkan."
         },
         MAKE_PRIVATE_SUCCESS: "File kini bersifat pribadi.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Tidak dapat menghentikan berbagi file. Ulangi kembali nanti."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Pembagian Saya"
	   },
	   STREAM: {
	     LOADING: "Memuat...",
	     LOAD_MORE: "Muat lainnya..."
	   },
	   ENTRY: {
	     REMOVE: "Hapus",
	     RESTORE: "Pulihkan",
	     EDIT: "Edit",
	     DELETE: "Hapus",
	     OK: "Ya",
	     CANCEL: "Batal",
	     USER_PICTURE: "Gambar ${0}",
	     FLAG: "Beri Tanda Sebagai Tidak Sesuai"
	   },
	   PANEL: {
	     LOAD_ERROR: "Terjadi kesalahan saat mengakses metadata file ini.",
	     ABOUT: {
	       TITLE: "Tentang",
	       EXPAND_BUTTON: "Perluas tombol ini untuk melihat lebih banyak informasi",
	       CURRENT_VERSION_HEADER: "Versi Saat Ini ${versionNumber}",
	       FILE_SIZE_HEADER: "Ukuran File",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versi Saat ini",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - Semua Versi",
	       DOCS_DRAFT_UPDATED_HEADER: "Draf Diedit",
	       DOCS_DRAFT_CREATED_HEADER: "Draf Dibuat",
	       DOCS_UPDATED_HEADER: "Dipublikasikan",
	       DOCS_CREATED_HEADER: "Dibuat",
	       UPDATED_HEADER: "Terbarui",
	       CREATED_HEADER: "Dibuat",
	       LIKES_HEADER: "Suka",
	       LIKES_EXPAND_ICON: "Perluas ikon untuk melihat orang yang telah menyukai file",
	       DOWNLOADS_HEADER: "Unduhan",
	       DOWNLOADS_HEADER_MORE: "Unduhan (${0})",
	       DOWNLOADS_EXPAND_ICON: "Perluas ikon untuk melihat orang yang telah mengunduh file",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonim",
	       DOWNLOADS_LATEST_VERSION: "Anda memiliki versi terbaru dari file ini",
	       DOWNLOADS_LAST_VERSION: "Versi ${0} terakhir yang Anda unduh dari file ini",
	       TAGS_HEADER: "Tanda",
	       DESCRIPTION_HEADER: "Deskripsi",
	       DESCRIPTION_READ_MORE: "Baca Lebih Lanjut...",
	       LINKS_HEADER: "Tautan",
	       SECURITY: "Keamanan",
	       FILE_ENCRYPTED: "Konten file dienkripsi. Konten file yang dienkripsi tidak dapat dicari. Konten file tidak dapat dilihat dan tidak dapat diedit dengan HCL Docs.",
	       GET_LINKS: "Memperoleh Tautan...",
	       ADD_DESCRIPTION: "Tambahkan deskripsi",
	       NO_DESCRIPTION: "Tidak ada Deskripsi",
	       ADD_TAGS: "Tambahkan tanda",
	       NO_TAGS: "Tidak ada tanda"
	     },
	     COMMENTS: {
	       TITLE: "Komentar",
	       TITLE_WITH_COUNT: "Komentar (${0})",
	       VERSION: "Versi ${0}",
	       FEED_LINK: "Umpan untuk komentar ini",
	       FEED_TITLE: "Ikuti perubahan pada komentar ini melalui pembaca umpan"
	     },
	     SHARING: {
	       TITLE: "Berbagi",
	       TITLE_WITH_COUNT: "Dibagi dengan (${0})",
	       SHARED_WITH_FOLDERS: "Dibagi dengan Folder - ${count}",
	       SEE_WHO_HAS_SHARED: "Lihat siapa yang telah berbagi",
           COMMUNITY_FILE: "File yang dimiliki komunitas tidak dapat dibagikan dengan orang atau komunitas lain.",
           SHARED_WITH_COMMUNITY: "Dibagi dengan anggota komunitas '${0}'",
           LOGIN: "Login",
           NO_SHARE: "File ini belum ditambahkan ke folder apa pun.",
           ONE_SHARE: "File ini berada di 1 folder atau komunitas yang Anda tidak memiliki akses ke sana.",
           MULTIPLE_SHARE: "File ini berada dalam ${fileNumber} folder atau komunitas yang Anda tidak memiliki akses ke sana."
	     },
	     VERSIONS: {
	       TITLE: "Versi",
	       TITLE_WITH_COUNT: "Versi (${0})",
	       FEED_LINK: "Umpan untuk versi ini",
	       FEED_TITLE: "Ikuti perubahan pada file ini melalui pembaca umpan Anda"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Konfirmasi Tindakan",
       DIALOG_TITLE: "Konfirmasikan",
       PROMPT: "Apakah Anda yakin ingin melakukan tindakan ini?",
       ERROR: "Terjadi kesalahan ketika sedang melakukan tindakan. Ulangi kembali nanti.",
       TOOLTIP: "Lakukan tindakan",
       OK: "Ya",
       CANCEL: "Batal",
       A11Y: "Tombol ini melakukan tindakan saat ini."
     },
     THUMBNAIL: {
       TITLE: "Thumbnail",
       CHANGE_LINK: "Ubah Thumbnail...",
       ERROR: "Thumbnail tidak dapat disimpan. Ulangi kembali nanti.",
       EXT_ERROR: "Pilih file dengan salah satu dari ekstensi yang didukung berikut: ${0}",
       SUCCESS: "Thumbnail telah diubah",
       UPLOAD: "Simpan",
       CANCEL: "Batal"
     },
     UPLOAD_VERSION: {
       LINK: "Unggah Versi Baru...",
       CHANGE_SUMMARY: "Ringkasan perubahan opsional...",
       ERROR: "Versi baru tidak dapat disimpan. Ulangi kembali nanti.",
       SUCCESS: "Versi baru telah disimpan",
       UPLOAD: "Unggah",
       UPLOAD_AND_CHANGE_EXTENSION: "Ubah dan Ganti Ekstensi",
       CANCEL: "Batal"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Terjadi kesalahan saat mengakses file. Ulangi kembali nanti.",
       UNAUTHENTICATED: "Waktu sesi Anda telah habis. Anda harus login kembali sebelum Anda dapat melihat file ini.",
       NOT_FOUND: "File yang Anda minta sudah dihapus atau dipindah. Jika seseorang mengirimi Anda tautan ini, periksa bahwa tautan tersebut benar.",
       ACCESS_DENIED: "Anda tidak memiliki izin untuk melihat file ini. File ini tidak dibagikan dengan Anda.",
       ACCESS_DENIED_ANON: "Anda tidak memiliki izin untuk melihat file ini. Jika ini adalah file Anda atau telah dibagikan dengan Anda, Anda harus login terlebih dahulu."
     },
     LOAD_ERROR: {
       DEFAULT: "Oops. Terjadi kesalahan saat mengakses tautan.",
       ACCESS_DENIED: "Hubungi pemilik file untuk meminta izin melihat file ini."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - File",
       LOAD_ERROR: "Terjadi kesalahan saat mengakses file"
     }
  },

   "pt-br": true,
    "ca": true,
    "cs": true,
    "da": true,
    "nl": true,
    "fi": true,
    "fr": true,
    "de": true,
    "el": true,
    "hu": true,
    "pt": true,
    "it": true,
    "ja": true,
    "ko": true,
    "no": true,
    "pl": true,
    "ru": true,
    "zh": true,
    "sl": true,
    "es": true,
    "sv": true,
    "th": true,
    "zh-tw": true,
    "tr": true
});
