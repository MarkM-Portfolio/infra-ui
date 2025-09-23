define({
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
  /* The placeholders for date formatting strings are as follows:
		   ${EEEE} is day of the week (e.g. Monday)
		   ${MMM} is the month in short notation (e.g. Jan, Feb)
		   ${time} is time (e.g. 6:00 PM)
		   ${d} is numerical day of the month (e.g 15)
		   ${YYYY} is year (e.g. 2012)
		*/
		   common: {
		      more: {
		         label: "Lebih Banyak",
		         tooltip: "Tindakan Lebih Lanjut"
		       },
		       tags_more: "dan ${0} lainnya",
		       ERROR_ALT: "Terjadi kesalahan",
		       PERSON_TITLE: "Buka profil dari ${user}.",
		       inactiveUser: "${user} (tidak aktif)",
		       inactiveIndicator: "(tidak aktif)",
		       like_error: "Tanda suka yang Anda berikan tidak dapat disimpan. Harap coba lagi.",
		       vote_error: "Voting Anda tidak dapat tersimpan. Harap coba lagi."
		   },
		   generic: {
		      untitled: "(Tanpa Judul)",
		      tags: "Label:",
		      tags_more: "dan ${0} lebih",
		      likes: "Suka",
		      comments: "Komentar",
		      titleTooltip: "Navigasikan ke ${app}",
		      error: "Tidak dapat mendapatkan data.",
		      timestamp: {
		         created: {
		            DAY: "Dibuat ${EEEE} pada ${time}",
		            MONTH: "Dibuat ${MMM} ${d}",
		            TODAY: "Dibuat hari ini pada ${time}",
		            YEAR: "Dibuat ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Dibuat kemarin pada ${time}",
		            TOMORROW: "Dibuat ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Diperbarui ${EEEE} pukul ${time}",
		            MONTH: "Diperbarui hari ini pukul ${MMM} ${d}",
		            TODAY: "Diperbarui hari ini pada pukul ${time}",
		            YEAR: "Diperbarui ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Diperbarui kemarin pada pukul ${time}",
		            TOMORROW: "Diperbarui ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Publik",
		         priv: "Pribadi"
		      },
		      action: {
		         created: "Dibuat",
		         updated: "Diperbarui"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Menerima pembaruan mengenai orang-orang yang Anda ikuti pada halaman Beranda dan ringkasan email.",
		      profile_title: "Buka profil dari ${user}.",
		      profile_a11y: "Mengaktifkan tautan akan membuka profil dari ${user} di jendela baru.",
		      error: "Kesalahan terjadi.  ${again}.",
		      error_again: "Silakan coba lagi",
		      error_404: "Permintaan jaringan tidak lagi tersedia.",
		      warning: "Peringatan",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Anda sekarang adalah kontak jaringan.",
		            	follow: "Anda sekarang adalah kontak jaringan dan mengikuti ${user}."
		            },
		            ignore: {
		            	nofollow: "Anda sudah menolak undangan.",
		            	follow: "Anda sudah menolak undangan namun sekarang mengikuti ${user}."
		            }
		         },
		         error: {
		            accept: "Terdapat kesalahan menerima permintaan.",
		            ignore: "Terdapat kesalahan mengabaikan permintaan."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} pukul ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Hari ini pukul ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Kemarin pukul ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Mengaktifkan tautan ini akan membuka ${name} pada jendela baru.",
		      tooltip: "Buka ${name} dalam aplikasi file",
		      profile_title: "Buka profil dari ${user}.",
		      profile_a11y: "Mengaktifkan tautan akan membuka profil dari ${user} di jendela baru.",
		      download_tooltip: "Unduh file ini (${0})",
		      following: {
		         add: "Ikuti File",
		         remove: "Berhenti Ikut",
		         title: "Alihkan jika Anda akan menerima informasi terbaru mengenai file ini"
		      },
		      share: {
		         label: "Bagikan",
		         title: "Berikan orang lain akses untuk file ini"
		      },
		      timestamp: {
		         created: {
		            DAY: "Dibuat ${EEEE} pada ${time}",
		            MONTH: "Dibuat ${MMM} ${d}",
		            TODAY: "Dibuat hari ini pada ${time}",
		            YEAR: "Dibuat ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Dibuat kemarin pada ${time}",
		            TOMORROW: "Dibuat ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} dibuat di ${EEEE} pukul ${time}",
		            MONTH: "${user}dibuat pada ${MMM} ${d}",
		            TODAY: "${user} dibuat hari ini pukul ${time}",
		            YEAR: "${user} dibuat pada ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} dibuat kemarin pukul ${time}",
		            TOMORROW: "${user} dibuat pada ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Diperbarui ${EEEE} pukul ${time}",
		            MONTH: "Diperbarui hari ini pukul ${MMM} ${d}",
		            TODAY: "Diperbarui hari ini pada pukul ${time}",
		            YEAR: "Diperbarui ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Diperbarui kemarin pada pukul ${time}",
		            TOMORROW: "Diperbarui ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} memperbarui pada ${EEEE} pukul ${time}",
		            MONTH: "${user} memperbarui pada ${MMM} ${d}",
		            TODAY: "${user} memperbarui hari ini pukul ${time}",
		            YEAR: "${user} memperbarui pada ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} memperbarui kemarin pukul ${time}",
		            TOMORROW: "${user} memperbarui pada ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Dibuat: ${EEEE} pukul ${time}",
		            MONTH: "Dibuat: ${MMM} ${d}",
		            TODAY: "Dibuat: Hari ini pukul ${time}",
		            YEAR: "Dibuat: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Dibuat: Kemarin pukul ${time}",
		            TOMORROW: "Dibuat: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Diperbarui: ${EEEE} pukul ${time}",
		            MONTH: "Diperbarui: ${MMM} ${d}",
		            TODAY: "Diperbarui: Hari ini pukul ${time}",
		            YEAR: "Diperbarui: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Diperbarui: Kemarin pukul ${time}",
		            TOMORROW: "Diperbarui: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} oleh ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} oleh ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Unduh file ini (${size})",
		      	 DOWNLOAD_ALT: "Unduh"
		      },
		      PREVIEW: {
		         LINK: "Pratinjau",
		         TITLE: "Pratinjau file ini pada jendela baru."
		      },
		      TAGS: "Label:",
		      error: "Kesalahan terjadi.  ${again}.",
		      error_again: "Silakan coba lagi",
		      error_404: "File tidak lagi tersedia atau Anda tidak memiliki cukup izin untuk mengaksesnya.",
		      error_403: "Anda tidak memiliki izin untuk melihat file ini. File ini tidak ditujukan untuk publik dan tidak dibagikan dengan Anda.",
		      notifications: {
		         USER_SHARED: "${user} menulis:",
		         CHANGE_SUMMARY: "${user} Perubahan ringkasan tersedia",
		         NO_CHANGE_SUMMARY: "${user} Tidak menyediakan perubahan ringkasan",
		         COMMENTED: "${user} berkomentar"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Check out oleh Anda",
		      checkedout_other: "Dikunci oleh ${user}",
		      tooltip: "Buka ${name} file pada pustaka",
		      draft_404_info: "Konsep sudah dihapus atau tidak lagi dibagi dengan Anda. Versi yang sudah diterbitkan sekarang menjadi versi terakhir dari file ini.",
		      error_404: "File sudah dihapus atau tidak lagi dibagikan dengan Anda.",
		      error_403: "File sudah dihapus atau tidak lagi dibagikan dengan Anda.",
		      error_preview: "File tidak lagi tersedia untuk pratinjau.",
		      draft_review_canceled: "Pratinjau dibatalkan dan konsep tidak lagi dibagi dengan Anda. Pratinjau Anda tidak lagi diminta.",
		      switch_ee: "Tampilkan konsep",
		      switch_ee_tooltip: "Tampilkan konsep terakhir untuk file ini"
		   },
		   ecm_draft: {
		      tooltip: "Buka ${name} konsep di pustaka",
		      community_owners: "Pemilik Komunitas",
		      draft: "Konsep",
		      draft_tooltip: "Menampilkan konsep",
		      draft_general_info: "Konsep sebelumnya tidak lagi ada dan konsep yang lebih baru sekarang menjadi versi terkini.",
		      draft_review_404_general_info: "Salah satu peninjau sudah memberi suara. Anda tidak lagi diminta untuk meninjau konsep ini.",
		      draft_review_404_request_info: "Konsep sebelumnya tidak lagi tersedia dan konsep terbaru sudah dikirim untuk ditinjau. Tinjauan Anda diminta.",
		      draft_review_404_require_info: "Konsep sebelumnya tidak lagi tersedia dan konsep terbaru sudah dikirim untuk ditinjau. Tinjauan Anda dibutuhkan.",
		      draft_review_request_info: "Tinjauan Anda diminta.",
		      draft_review_require_info: "Tinjauan Anda dibutuhkan.",
		      error_404: "Konsep sudah dihapus atau tidak lagi dibagi dengan Anda.",
		      error_403: "Anda tidak dapat menampilkan konsep karena ini tidak lagi dibagi dengan Anda.",
		      error_preview: "Konsep tidak lagi tersedia untuk pratinjau.",
		      switch_ee: "Lihat versi yang sudah diterbitkan",
		      switch_ee_tooltip: "Lihat versi yang sudah diterbitkan dari file ini",
		      review: "Tinjauan",
		      reviewers: "Peninjau",
		      reviwers_addtl: "Peninjau Tambahan",
		      in_review: "Konsep dalam peninjauan",
		      in_review_tooltip: "Menampilkan konsep dalam tinjauan",
		      review_required_any: "Pemilik komunitas memerlukan satu peninjau untuk meninjau konsep ini.",
		      review_required_all: "Pemilik komunitas memerlukan semua peninjau untuk meninjau konsep ini.",
		      review_required_generic: "Pemilik komunitas membutuhkan peninjau ini untuk meninjau konsep ini.",
		      review_additional_required: "Semua peninjau ditambahkan oleh pengirim konsep dibutuhkan untuk meninjau konsep ini.",
		      reivew_submitted_date: {
		         DAY: "${user} mengirimkan konsep untuk ditinjau di ${EEEE} pukul ${time}.",
		         MONTH: "${user} mengirimkan konsep untuk ditinjau pada ${MMM} ${d}.",
		         TODAY: "${user} mengirimkan konsep untuk ditinjau hari ini pukul ${time}.",
		         YEAR: "${user} mengirimkan konsep untuk ditinjau pada ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} mengirimkan konsep untuk ditinjau kemarin pukul ${time}.",
		         TOMORROW: "${user} mengirimkan konsep untuk ditinjau pada ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Ditunda",
		      pending_rejected: "Tinjauan tidak lagi diperlukan karena konsep ditolak",
		      approve: "Setujui",
		      approved: "Disetujui",
		      approve_tooltip: "Terima konsep ini",
		      accept_success: "Anda sudah menerima konsep ini.",
		      accept_error: "Terdapat kesalahan menerima konsep ini. Coba lagi.",
		      accept_info: "Anda menerima konsep ini.",
		      reject: "Tolak",
		      rejected: "Ditolak",
		      reject_tooltip: "Tolak konsep ini",
		      reject_success: "Anda sudah menolak konsep ini.",
		      reject_error: "Terdapat kesalahan menolak konsep ini. Coba lagi.",
		      reject_info: "Anda menolak konsep ini."
		   },
		   authUser: {
		      error: "Terjadi kesalahan menarik penggunaa sekarang.  ${again}.",
		      error_again: "Silakan coba lagi",
		      error_404: "Tidak dapat menemukan pengguna yang dikonfirmasi.",
		      error_403: "Anda tidak memiliki izin untuk menarik informasi pengguna."
		   },
		   forum: {
		      error: "Kesalahan terjadi.  ${again}.",
		      error_again: "Silakan coba lagi",
		      error_404: "Forum tidak lagi ada atau Anda tidak memiliki izin yang cukup untuk mengaksesnya.",
		      error_403: "Anda tidak memiliki izin untuk menampilkan forum ini. Forum bukan untuk publik dan tidak dibagi dengan Anda.",
		      readMore: "Tampilkan topik sepenuhnya...",
		      readMore_tooltip: "Buka topik forum ${name}.",
		      readMore_a11y: "Mengaktifkan tautan ini akan membuka topik forum ${name} di jendela baru.",
		      QUESTION_ANSWERED: "Pertanyaan ini sudah dijawab.",
		      QUESTION_NOT_ANSWERED: "Pertanyaan ini belum dijawab.",
		      attachments: "${count} Lampiran",
		      attachments_one: "${count} Lampiran"
		   },
		   blog: {
		      error: "Kesalahan terjadi.  ${again}.",
		      error_again: "Silakan coba lagi",
		      error_404: "Blog tidak lagi tersedia atau Anda tidak memiliki izin yang cukup untuk mengaksesnya.",
		      error_403: "Anda tidak memiliki izin untuk menampilkan blog ini. Blog ini bukan untuk publik dan tidak dibagi dengan Anda.",
		      readMore: " Baca lebih lanjut ...",
		      readMore_tooltip: "Buka entri blog ${name}.",
		      readMore_a11y: "Mengaktifkan tautan ini akan membuka entri blog ${name} di jendela baru.",
		      graduated: "Lulus",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Beri Suara</a>",
		  					TOOLTIP: 	"Beri suara untuk ini"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Sudah memberi suara</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Sudah memberi suara</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Undo</a>",
		  					TOOLTIP: 	"Hapus pemberian suara Anda dari ini"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 orang memberi suara untuk ini"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 orang memberi suara untuk ini"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} beri suara untuk ini"
		  				}
		  			},
		  			LOADING: "Memuat...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Beri Suara"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Kami tidak dapat menyimpan suara Anda karena Anda mungkin sudah mencapai batas pemberian suara Anda atau ide tidak lagi tersedia untuk Anda.",
		      readMore_tooltip: "Buka idea ${name}.",
		      readMore_a11y: "Mengaktifkan tautan ini akan membuka ide ${name} di jendela baru."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Balasan",
		      THIS_ARIA_LABEL: "Balasan ini",
		      THIS_TAB_TITLE: "Balasan ini",
		      TAB_TITLE: "Balasan (${0})",
		      REPLY_TO_REPLY: "Sebagai respons untuk ${thisReply}",
		      REPLY_TO_TOPIC: "Sebagai respons untuk ${thisTopic}",
		      THIS_TOPIC: "Topik ini",
		      THIS_REPLY: "Balasan ini",
		      NAVIGATE_TO_REPLY: "Navigasikan pada balasan orang tua",
		      NAVIGATE_TO_TOPIC: "Navigasikan pada topik orang tua",
		      ADD_COMMENT: "Balas untuk topik ini",
		      ADD_COMMENT_TOOLTIP: "Balas pada topik forum ini",
		      SHOWING_RECENT_REPLIES: "Tampilkan ${0} balasan yang paling baru",
		      PREV_COMMENTS: "Tampilkan folder lainnya",
		      PLACEHOLDER_TXT: "Balas untuk topik ini",
		      EMPTY: "Tidak ada balasan.",
		      TRIM_LONG_COMMENT: "Persingkat balasan?",
		      WARN_LONG_COMMENT: "Balasan terlalu panjang.  ${shorten}",
		      ERROR: "Kesalahan terjadi pada saat mendapatkan balasan. ${again}",
		      ERROR_CREATE: "Balasan Anda tidak dapat disimpan.  Coba lagi nanti.",
		      ERROR_CREATE_NOT_FOUND: "Balasan Anda tidak dapat disimpan karena topik sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_CREATE_ACCESS_DENIED: "Balasan Anda tidak dapat disimpan karena topik sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_CREATE_TIMEOUT: "Balasan Anda tidak dapat disimpan karena server tidak dapat dihubungi.  Klik 'Simpan' untuk mencoba lagi.",
		      ERROR_CREATE_CANCEL: "Balasan Anda tidak dapat disimpan karena permintaan dibatalkan.  Klik 'Simpan' untuk mencoba lagi.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Anda harus login untuk membuat balasan ini.  Klik 'Simpan' agar diizinkan untuk masuk.",
		      ERROR_NO_CONTENT: "Masukkan balasan Anda dan klik 'Simpan.'  Jika Anda tidak lagi ingin untuk meninggalkan balasan klik 'Batal.'",
		      ERROR_UNAUTHORIZED: "Balasan Anda tidak dapat disimpan karena Anda tidak berwenang untuk meninggalkan balasan.",
		      COMMENT_DELETED: {
		         DAY: "Balasan dihapus oleh ${user} pada ${EEEE} pukul ${time}",
		         MONTH: "Balasan dihapus oleh ${user} pada ${MMM} ${d}",
		         TODAY: "Balasan dihapus oleh ${user} hari ini pukul ${time}",
		         YEAR: "Balasan dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Balasan dihapus oleh ${user} kemarin pukul ${time}",
		         TOMORROW: "Balasan dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Alasan untuk menghapus: ${reason}",
		      REPLY_TITLE: "Perihal: ${0}",
		      SHOW_FULL_REPLY: "Tampilkan balasan sepenuhnya",
		      SHOW_FULL_REPLY_TOOLTIP: "Navigasikan pada balasan asli dalam topik forum",
		      REPLY_ACTION: "Jawaban",
		      REPLY_ACTION_TOOLTIP: "Balasan untuk berita ini",
		      MODERATION_PENDING: "Balasan ini adalah tinjauan ditunda.",
		      MODERATION_QUARANTINED: "Berita sudah dikarantina oleh moderator.",
		      MODERATION_REMOVED: {
		         DAY: "Balasan ini sudah dihapus oleh ${user} pada ${EEEE} pukul ${time}.",
		         MONTH: "Balasan ini sudah dihapus oleh ${user} pada ${MMM} ${d}.",
		         TODAY: "Balasan ini sudah dihapus oleh ${user} hari ini pukul ${time}.",
		         YEAR: "Balasan ini sudah dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Balasan ini sudah dihapus oleh ${user} kemarin pukul ${time}.",
		         TOMORROW: "Balasan ini sudah dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Balasan ini sudah ditolak oleh ${user} pada ${EEEE} pukul ${time}.",
		         MONTH: "Balasan ini sudah ditolak oleh ${user} pada ${MMM} ${d}.",
		         TODAY: "Balasan ini sudah ditolak oleh ${user} hari ini pukul ${time}.",
		         YEAR: "Balasan ini sudah ditolak oleh ${user} pada ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Balasan ini sudah ditolak oleh ${user} kemarin pukul ${time}.",
		         TOMORROW: "Balasan ini sudah ditolak oleh ${user} pada ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Balasan Anda sudah dikirimkan untuk ditinjau dan akan tersedia saat diterima."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Komentar",
		      PLACEHOLDER_TXT: "Tambah satu komentar",
		      TAB_TITLE: "Komentar (${0})",
		      ACTION_NOT_SUPPORTED: "Tindakan yang Tidak Didukung",
		      ADD_COMMENT: "Tambah Komentar",
		      ADD_COMMENT_TOOLTIP: "Tambahkan komentar pada item ini",
		      CANCEL: "Batal",
		      COMMENT_COUNT_ONE: "${0} Komentar",
		      COMMENT_COUNT_MANY: "${0} Komentar",
		      COMMENT_LABEL: "Komentar:",
		      DELETE: "Hapus",
		      DELETE_TOOLTIP: "Hapus komentar",
		      DELETEREASON: "Alasan untuk menghapus komentar ini:",
		      DIALOG_TITLE: "Persingkat Komentar",
		      TOOLTIP: "Persingkat Komentar",
		      NAME: "Persingkat Komentar",
		      EDIT: "Ubah",
		      EDIT_TOOLTIP: "Mengubah komentar",
		      ERROR_CREATE: "Komentar Anda tidak dapat disimpan.  Coba lagi nanti.",
		      ERROR_CREATE_NOT_FOUND: "Komentar Anda tidak dapat disimpan karena item sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_CREATE_ACCESS_DENIED: "Komentar Anda tidak dapat disimpan karena item sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_CREATE_TIMEOUT: "Komentar Anda tidak dapat disimpan karena server tidak dapat dihubungi.  Klik 'Publikasikan' untuk mencoba lagi.",
		      ERROR_CREATE_CANCEL: "Komentar Anda tidak dapat disimpan karena permintaan dibatalkan.  Klik 'Publikasikan' untuk mencoba lagi.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Anda harus login untuk membuat komentar ini.  Klik 'Publikasikan' untuk diizinkan masuk.",
		      ERROR_DELETE: "Komentar Anda tidak dapat dihapus.  Coba lagi nanti.",
		      ERROR_DELETE_TIMEOUT: "Komentar Anda tidak dapat dihapus karena server tidak dapat dihubungi.  Klik 'Hapus' untuk mencoba lagi.",
		      ERROR_DELETE_NOT_FOUND: "Komentar Anda tidak dapat dihapus karena komentar atau item sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_DELETE_ACCESS_DENIED: "Komentar Anda tidak dapat dihapus karena item sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_DELETE_CANCEL: "Komentar Anda tidak dapat dihapus karena permintaan dibatalkan.  Klik 'Hapus' untuk mencoba lagi.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Anda harus login untuk menghapus komentar ini.  Klik 'Hapus' untuk diizinkan masuk.",
		      ERROR_EDIT: "Komentar Anda tidak dapat diperbarui.  Coba lagi nanti.",
		      ERROR_EDIT_ACCESS_DENIED: "Komentar Anda tidak dapat diperbarui karena item sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_EDIT_NOT_FOUND: "Komentar Anda tidak dapat diperbarui karena item sudah dihapus atau tidak lagi terlihat untuk Anda.",
		      ERROR_EDIT_TIMEOUT: "Komentar Anda tidak dapat diperbarui karena server tidak dapat dihubungi.  Klik 'Publikasikan' untuk mencoba lagi.",
		      ERROR_EDIT_CANCEL: "Komentar Anda tidak dapat diperbarui karena permintaan dibatalkan.  Klik 'Publikasikan' untuk mencoba lagi.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Anda harus login untuk mengedit komentar ini.  Klik 'Publikasikan' untuk diizinkan masuk.",
		      ERROR_NO_CONTENT: "Masukkan komentar Anda dan klik 'Kirim.'  Jika Anda tidak lagi ingin meninggalkan komentar klik 'Batal.'",
		      ERROR_NO_CONTENT_EDIT: "Masukkan komentar Anda dan klik 'Kirim.'  Jika Anda tidak lagi ingin mengubah komentar Anda klik 'Batal.'",
		      ERROR_UNAUTHORIZED: "Komentar Anda tidak dapat disimpan karena Anda tidak berwenang untuk meninggalkan komentar.",
		      ERROR_GENERAL: "Terjadi kesalahan.",
		      OK: "Ya",
		      YES: "Tidak",
		      TRIM_LONG_COMMENT: "Persingkat komentar?",
		      WARN_LONG_COMMENT: "Komentar terlalu panjang.  ${shorten}",
		      LINK: "Tautan",
		      SAVE: "Simpan",
		      POST: "Kirim",
		      SHOWMORE: "Baca lebih lanjut...",
		      VIEW_COMMENTS_FILE: "Tampilkan komentar pada file ini",
		      SUBSCRIBE_TO_COMMENTS: "Berlangganan komentar ini",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Ikuti perubahan pada komentar ini melalui pembaca umpan",
		      PROFILE_TITLE: "Buka profil dari ${user}.",
		      PROFILE_A11Y: "Mengaktifkan tautan akan membuka profil dari ${user} di jendela baru.",
		      MODERATION_PENDING: "Komentar ini merupakan tinjauan yang ditunda.",
		      MODERATION_REMOVED: {
		         DAY: "Komentar ini sudah dihapus oleh ${user} pada ${EEEE} pukul ${time}.",
		         MONTH: "Komentar ini sudah dihapus oleh ${user} pada ${MMM} ${d}.",
		         TODAY: "Komentar ini sudah dihapus oleh ${user} hari ini pukul ${time}.",
		         YEAR: "Komentar ini sudah dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Komentar ini sudah dihapus oleh ${user} kemarin pukul ${time}.",
		         TOMORROW: "Komentar ini sudah dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Komentar ini sudah ditolak oleh ${user} pada ${EEEE} pukul ${time}.",
		         MONTH: "Komentar ini sudah ditolak oleh ${user} pada ${MMM} ${d}.",
		         TODAY: "Komentar ini sudah ditolak oleh ${user} hari ini pukul ${time}.",
		         YEAR: "Komentar ini sudah ditolak oleh ${user} pada ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Komentar ini sudah ditolak oleh ${user} kemarin pukul ${time}.",
		         TOMORROW: "Komentar ini sudah ditolak oleh ${user} pada ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Perlihatkan Komentar Sebelumny",
		      EMPTY: "Tidak ada komentar.",
		      ERROR_ALT: "Terjadi kesalahan",
		      ERROR: "Kesalahan terjadi saat menarik komentar. ${again}",
		      ERROR_ADDTL: "Kesalahan terjadi saat menarik komentar tambahan. ${again}",
		      ERROR_AGAIN: "Coba lagi.",
		      ERROR_AGAIN_TITLE: "Cobalah permintaan untuk komentar lebih sekali lagi.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} pukul ${time} (versi ${version})",
		         MONTH: "${user} ${MMM} ${d} (versi ${version})",
		         TODAY: "${user} hari ini pukul ${time} (versi ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (versi ${version})",
		         YESTERDAY: "${user} kemarin pukul ${time} (versi ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (versi ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} di ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} hari ini pukul ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} kemarin pukul ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} pukul ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Hari ini pukul ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Kemarin pukul ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Komentar dihapus oleh ${user} pada ${EEEE} pukul ${time}",
		         MONTH: "Komentar dihapus oleh ${user} pada ${MMM} ${d}",
		         TODAY: "Komentar dihapus oleh ${user} hari ini pukul ${time}",
		         YEAR: "Komentar dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Komentar dihapus oleh ${user} kemarin pukul ${time}",
		         TOMORROW: "Komentar dihapus oleh ${user} pada ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} Diubah ${EEEE} pukul ${time} (versi ${version})",
		         MONTH: "${user} Diubah ${MMM} ${d} (versi ${version})",
		         TODAY: "${user} Diubah hari ini pukul ${time} (versi ${version})",
		         YEAR: "${user} Diubah ${MMM} ${d}, ${YYYY} (versi ${version})",
		         YESTERDAY: "${user} Diubah kemarin pukul ${time} (versi ${version})",
		         TOMORROW: "${user} Diubah ${MMM} ${d}, ${YYYY} (versi ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} Diubah ${EEEE} pukul ${time}",
		         MONTH: "${user} Diubah ${MMM} ${d}",
		         TODAY: "${user} Diubah hari ini pukul ${time}",
		         YEAR: "${user} Diubah ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} Diubah kemarin pukul ${time}",
		         TOMORROW: "${user} Diubah ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Apakah Anda yakin ingin menghapus komentar ini?",
		      FLAG_ITEM: {
		         BUSY: "Menyimpan...",
		         CANCEL: "Batal",
		         ACTION: "Diberi label sebagai publikasi yang tidak layak",
		         DESCRIPTION_LABEL: "Sediakan alasan untuk menandai item ini (opsional)",
		         EDITERROR: "File metadata tidak diubah karena sebuah kesalahan",
		         OK: "Simpan",
		         ERROR_SAVING: "Terdapat kesalahan dengan proses permintaan. Coba lagi nanti.",
		         SUCCESS_SAVING: "Tanda Anda sudah dikirim. Seorang moderator akan menginvestigasi secepatnya.",
		         TITLE: "Tandai item ini sebagai hal yang tidak pantas",
		         COMMENT: {
		            TITLE: "Tandai komentar yang tidak pantas berikut",
		            A11Y: "Tombol ini membuka dialog yang mengizinkan pengguna untuk menandai komentar ini sebagai hal yang tidak pantas."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Batal",
		      DIALOG_TITLE: "Hapus Komentar",
		      NAME: "Hapus Komentar",
		      OK: "Ya",
		      TOOLTIP: "Hapus Komentar"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Batal",
		      CONFIRM: "Mempersingkat komentar akan menghapus teks yang melampaui batas pesan.  Klik 'OK' untuk mempersingkat atau 'Batal' untuk mengubah sendiri komentar.",
		      DIALOG_TITLE: "Persingkat Komentar",
		      NAME: "Persingkat Komentar",
		      OK: "Ya",
		      TOOLTIP: "Persingkat Komentar"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Konfirmasi Pengiriman",
		      CONFIRM: "Komentar Anda sudah dikirim untuk ditinjau dan akan tersedia saat diterima.",
		      OK: "Ya"
		   },
		   DATE: {
		      AM: "PAGI-SIANG",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "SORE-MALAM",
		      TODAY: "hari ini",
		      TODAY_U: "Hari ini",
		      YESTERDAY: "kemarin",
		      YESTERDAY_U: "Kemarin",
		      ADDED: { DAY: "Ditambahkan ${EEee} pukul ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Ditambahkan ${date_long}",
		         TODAY: "Ditambahkan hari ini pukul ${time}",
		         YEAR: "Ditambahkan ${date_long}",
		         YESTERDAY: "Ditambahkan kemarin pukul ${time}"
		      },
		      LAST_UPDATED: { DAY: "Pembaruan terakhir ${EEee} pukul ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Pembaruan terakhir ${date_long}",
		         TODAY: "Pembaruan terakhir hari ini ${time}",
		         YEAR: "Pembaruan terakhir ${date_long}",
		         YESTERDAY: "Pembaruan terakhir kemarin pukul ${time}"
		      },
		      MONTHS_ABBR: { 0: "JAN",
		         10: "NOV",
		         11: "DES",
		         1: "FEB",
		         2: "MAR",
		         3: "APR",
		         4: "MEI",
		         5: "JUN",
		         6: "JUL",
		         7: "AGS",
		         8: "SEP",
		         9: "OKT"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Hari ini",
		         YEAR: "${date_short}",
		         YESTERDAY: "Kemarin",
		         TOMORROW: "Besok"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} pukul ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Hari ini pukul ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Kemarin pukul ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} pukul ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Hari ini pukul ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Kemarin pukul ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} pukul ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} pukul ${time}",
		         TODAY: "${date_short} pukul ${time}",
		         YEAR: "${date_short} pukul ${time}",
		         YESTERDAY: "${date_short} pukul ${time}",
		         TOMORROW: "${date_short} pukul ${time}"
		      },
		      DATE_ONLY: { DAY: "${date_short}",
		         FULL: "${EEEE}, ${date_long}",
		         MONTH: "${date_short}",
		         TODAY: "${date_short}",
		         YEAR: "${date_short}",
		         YESTERDAY: "${date_short}",
		         TOMORROW: "${date_short}"
		      },
		      TIME_ONLY: { DAY: "${time}",
		         FULL: "${time_long}",
		         MONTH: "${time}",
		         TODAY: "${time}",
		         YEAR: "${time}",
		         YESTERDAY: "${time}",
		         TOMORROW: "${time}"
		      },
		      UPDATED: { DAY: "Diperbarui ${EEee} pukul ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Diperbarui ${date_long}",
		         TODAY: "Diperbarui hari ini pada pukul ${time}",
		         YEAR: "Diperbarui ${date_long}",
		         YESTERDAY: "Diperbarui kemarin pada pukul ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Tidak dapat memuat informasi versi.",
		      ERROR_REQUEST_CANCELLED: "Permintaan sudah dibatalkan.",
		      ERROR_REQUEST_TIMEOUT: "Server tidak dapat dihubungi.",
		      ERROR_REQUEST_UNKNOWN: "Terjadi kesalahan yang tidak diketahui.",
		      LOADING: "Memuat ..",
		      NO_VERSIONS: "Tidak ada versi",
		      INFO: "Versi ${0} dibuat ${1} oleh ",
		      VERSION_NUMBER: "Versi ${0}",
		      DELETED: "Dihapus",
		      DELETE_ALL: "Hapus semua versi sebelum versi",
		      DELETE_VERSION_SINGLE: "Hapus versi ${0}",
		      DELETEERROR: "Versi tidak dihapus karena sebuah kesalahan.",
		      CREATE_VERSION: "Buat versi baru",
		      CREATE_VERSION_TOOLTIP: "Buat sebuah versi dari file ini",
		      REVERT_VERSION: "Pulihkan versi ${0}",
		      REVERT_DESCRIPTION: "Dipulihkan dari versi ${0}",
		      PREVIOUS: "Sebelumnya",
		      PREVIOUS_TOOLTIP: "Halaman Sebelumnya",
		      ELLIPSIS: "...",
		      NEXT: "Berikutnya",
		      NEXT_TOOLTIP: "Halaman Berikutnya",
		      COUNT: "${0} - ${1} of ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Halaman",
		      SHOW: "Tampilkan",
		      ITEMS_PER_PAGE: " item tiap halaman.",
		      DATE: {
		        AM: "PAGI-SIANG",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Hari ini pukul ${time}",
		            YESTERDAY: "Kemarin pukul ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} pukul ${time}",
		            YEAR: "${date_short} pukul ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} pukul ${time}",
		            TODAY: "Hari ini pukul ${time}",
		            YESTERDAY: "Kemarin pukul ${time}"
		        },
		        UPDATED: { DAY: "Diperbarui ${EEee} pukul ${time}",
		            YEAR: "Diperbarui ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Diperbarui ${date_short}",
		            TODAY: "Diperbarui hari ini pada pukul ${time}",
		            YESTERDAY: "Diperbarui kemarin pada pukul ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Hapus versi ${0}",
		         DOWNLOAD: "Unduh",
		         DOWNLOAD_TOOLTIP: "Unduh versi ini (${0})",
		         VIEW: "Lihat",
		         VIEW_TOOLTIP: "Lihat versi ${0}",
		         REVERT: {
		            A11Y: "Tombol ini akan membuka dialog yang memungkinkan pengguna untuk mengonfirmasi pemulihan file dari versi sebelumnya. Mengkonfirmasi bagian ini akan mengakibatkan penyegaran konten pada halaman.",
		            FULL: "Pulihkan",
		            WIDGET: "Pulihkan versi ini"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Versi ini tidak dapat dihapus karena sudah dihapus sebelumnya atau tidak lagi terlihat untuk Anda.",
		         ERROR_ACCESS_DENIED: "Versi ini tidak dihapus karena Anda bukan editor.",
		         ERROR_TIMEOUT: "Versi tidak dihapus karena server tidak dapat dihubungi.  Klik 'Hapus' sekali lagi untuk mencoba permintaan Anda lagi.",
		         ERROR_CANCEL: "Versi ini tidak dihapus karena permintaan dibatalkan.  Klik 'Hapus' sekali lagi untuk mencoba permintaan Anda lagi.",
		         ERROR_NOT_LOGGED_IN: "Anda harus login untuk menghapus versi ini.  Klik 'Hapus' untuk diizinkan masuk.",
		         GENERIC_ERROR: "Versi tidak dapat dihapus karena terjadi kesalahan yang tidak diketahui.  Klik 'Hapus' sekali lagi untuk mencoba permintaan Anda lagi.",
		         FULL: "Hapus",
		         A11Y: "Tombol ini akan membuka dialog yang memungkinkan pengguna untuk mengonfirmasi penghapusan versi ini. Mengkonfirmasi bagian ini akan mengakibatkan penyegaran konten pada halaman."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Versi ini tidak dapat dikembalikan karena udah dihapus atau tidak lagi terlihat untuk Anda.",
		         ERROR_ACCESS_DENIED: "Versi tidak dapat dikembalikan karena Anda bukan editor.",
		         ERROR_NAME_EXISTS: "Versi tidak dapat dikembalikan karena terdapat file lain dengan nama yang sama.",
		         ERROR_TIMEOUT: "Versi tidak dipulihkan karena server tidak dapat dihubungi.  Klik 'Kembalikan' lagi untuk mencoba permintaan Anda lagi.",
		         ERROR_CANCEL: "Versi tidak dipulihkan karena permintaan dibatalkan.  Klik 'Kembalikan' lagi untuk mencoba permintaan Anda lagi.",
		         ERROR_QUOTA_VIOLATION: "Versi tidak dapat dikembalikan karena pembatasan jarak.",
		         ERROR_MAX_CONTENT_SIZE: "Versi tidak dapat dikembalikan karena berukuran lebih besar daripada ukuran file yang diizinkan sebesar ${0}",
		         GENERIC_ERROR: "Versi tidak dapat dipulihkan karena ada kesalahan tak dikenal.  Klik 'Kembalikan' lagi untuk mencoba permintaan Anda lagi."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Melihat siapa yang sudah mengunduh...",
		      PREVIOUS: "Sebelumnya",
		      PREVIOUS_TOOLTIP: "Halaman Sebelumnya",
		      ELLIPSIS: "...",
		      NEXT: "Berikutnya",
		      NEXT_TOOLTIP: "Halaman Berikutnya",
		      COUNT: "${0} - ${1} of ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Halaman",
		      SHOW: "Tampilkan",
		      ITEMS_PER_PAGE: " item tiap halaman.",
		      VERSION: {
		         DAY: "Versi ${version} pada ${date}",
		         MONTH: "Versi ${version} pada ${date}",
		         TODAY: "Versi ${version} pukul ${time}",
		         YEAR: "Versi ${version} pada ${date}",
		         YESTERDAY: "Versi ${version} kemarin"
		      },
		      FILE: {
		         V_LATEST: "Anda sudah mengunduh versi terakhir dari file ini",
		         V_OLDER: "Versi terakhir yang Anda unduh ${0} dari file ini",
		         LOADING: "Memuat...",
		         EMPTY: "Hanya pengguna anonim",
		         ERROR: "Tidak dapat memuat informasi pengunduhan"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Terjadi kesalahan",
		      ERROR_ALT_TEXT: "Kesalahan:",
		      ERROR_MSG_GENERIC: "Terdapat sesuatu yang salah.  Harap coba lagi.",
		      ERROR_MSG_NOT_AVAILABLE: "Item ini sudah dihapus atau tidak lagi tersedia.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Konten untuk item ini tidak tersedia.",
		      ERROR_MSG_NO_ACCESS: "Anda tidak lagi memiliki akses untuk item ini.",
		      LOADING: "Memuat...",
		      TITLE_SU: "${author} kirimkan pesan.",
		      TITLE_NI: "${author} mengundang Anda untuk bergabung dalam jaringan mereka.",
		      AUTHOR_TITLE: "Tampilkan profil untuk ${author}",
		      OPEN_LINK: "Buka ${title}",
		      CONFIRM_CLOSE_TITLE: "Konfirmasi",
		      CONFIRM_CLOSE_MESSAGE: "Apakah Anda yakin Anda ingin membatalkan perubahan yang Anda buat? Tekan OK untuk melanjutkan atau Batal untuk kembali",
		      OK: "Ya",
		      CANCEL: "Batal"
		   },
		   MESSAGE: {
		      SUCCESS: "Konfirmasi",
		      ERROR: "Terjadi kesalahan",
		      ERROR_ALT_TEXT: "Kesalahan:",
		      INFO: "Informasi",
		      WARNING: "Peringatan",
		      DISMISS: "Sembunyikan pesan",
		      MORE_DETAILS: "Detail lebih lanjut",
		      HIDE_DETAILS: "Sembunyikan detail"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Dibuat: ${EEEE} pukul ${time}",
		           MONTH: "Dibuat: ${MMM} ${d}",
		           TODAY: "Dibuat: Hari ini pukul ${time}",
		           YEAR: "Dibuat: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Dibuat: Kemarin pukul ${time}",
		           TOMORROW: "Dibuat: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Kesalahan terjadi.  ${again}.",
		      error_again: "Silakan coba lagi",
		      error_404: "Pembaruan status tidak lagi tersedia.",
		      notifications: {
		         STATUS_UPDATE: "${user} Mengirim pesan",
		         USER_BOARD_POST: "${user} Tulis pada papan Anda",
		         POST_COMMENT: "${user} menulis:"
		      }
		   },
		   login: {
		      error: "Nama pengguna Anda dan/atau kata sandi tidak cocok dengan akun yang ada. Harap coba lagi.",
		      logIn: "Login",
		      password: "Kata Sandi:",
		      user: "Nama Pengguna:",
		      welcome: "Login ke HCL Connections"
		   },
		   repost: {
		      name: "Publikasikan ulang",
		      title: "Publikasikan ulang informasi terbaru ini untuk pengikut atau komunitas saya",
		      msg_success: "Informasi terbaru sudah berhsail dikirim kembali untuk pengikut Anda.",
		      msg_generic: "Terdapat sesuatu yang salah.  Harap coba lagi."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Tambah",
		      ADD_TXT: "Menambahkan orang atau komunitas sebagai pembaca",
		      SHOW_MORE: "Tampilkan lebih banyak...",
		      READER_IF_PUBLIC: "Semua Orang (publik)",
		      READER_IF_PUBLIC_TOOLTIP: "File ini ditujukan bagi publik dan dapat dilihat setiap orang",
		      EMPTY_READERS: "Tidak Ada",
		      READERS_LABEL: "Pembaca:\u00a0",
		      EDITORS_LABEL: "Editor:\u00a0",
		      OWNER_LABEL: "Pemilik:\u00a0",
		      ERROR: "Tidak dapat memuat informasi yang dibagikan",
		      ERROR_NOT_FOUND: "File yang Anda minta sudah dihapus atau dipindah. Jika seseorang mengirimi Anda tautan ini, periksa kebenarannya.",
		      ERROR_ACCESS_DENIED: "Anda tidak memiliki izin untuk melihat file ini.  File ini tidak ditujukan untuk publik dan tidak dibagikan dengan Anda.",
		      SHARE: "Bagikan",
		      CANCEL: "Batal",
		      SHARE_WITH: "Bagikan dengan:",
		      PERSON: "Seseorang",
		      COMMUNITY: "Komunitas",
		      PLACEHOLDER: "Nama orang atau email...",
		      MESSAGE: "Pesan:",
		      MESSAGE_TXT: "Tambahkan pesan opsional",
		      REMOVE_ITEM_ALT: "Hapus ${0}",
		      NO_MEMBERS: "Tidak Ada",
		      A11Y_READER_ADDED: "Dipilih ${0} sebagai pembaca",
		      A11Y_READER_REMOVED: "Dihapus ${0} sebagai pembaca",
		      SELF_REFERENCE_ERROR: "Anda tidak dapat membagi dengan diri Anda sendiri.",
		      OWNER_REFERENCE_ERROR: "Anda tidak dapat membagi dengan pemilik file.",
		      SHARE_COMMUNITY_WARN: "Berbagi dengan komunitas publik '${0}' akan membuat file ini dapat didapatkan oleh publik.",
		      SELECT_USER_ERROR: "Anda harus memilih sedikitnya satu orang atau komunitas untuk berbagi",
		      WARN_LONG_MESSAGE: "Pesan terlalu panjang.",
		      TRIM_LONG_MESSAGE: "Persingkat pesan?",
		      ERROR_SHARING: "File tidak dapat dibagi.  Harap coba lagi.",
		      INFO_SUCCESS: "File sudah berhasil dibagikan.",
		      MAX_SHARES_ERROR: "Jumlah pembagian maksimum sudah terlampaui.",
		      NOT_LOGGED_IN_ERROR: "File tidak dibagi karena Anda tidak login.  Klik 'Bagikan' untuk membagikan file.",
		      TIMEOUT_ERROR: "File tidak dibagi karena server tidak dapat dihubungi.  Klik 'Berbagi' untuk mencoba lagi.",
		      CANCEL_ERROR: "File tidak dibagi karena permintaan dibatalkan.  Klik 'Berbagi' untuk mencoba lagi.",
		      NOT_FOUND_ERROR: "File sudah dihapus atau tidak lagi terlihat untuk Anda dan tidak dapat dibagikan.",
		      ACCESS_DENIED_ERROR: "Anda tidak lagi memiliki izin untuk membagikan file ini.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Sebuah file yang dibatasi tidak boleh dipublikasikan.",
		      TOOLTIP: "Berikan orang lain akses untuk file ini"
		   },
		   HISTORY: {
		      TAB_TITLE: "Update Terkini",
		      NO_HISTORY: "Tidak ada pembaruan terkini.",
		      EMPTY: "Tidak dapat mendapatkan pembaruan terkini untuk item ini. Ini sudah dihapus atau Anda tidak lagi memiliki akses untuknya.",
		      MORE: "Tampilkan Pembaruan Sebelumnya",
		      ERROR_ALT: "Terjadi kesalahan",
		      ERROR: "Terjadi kesalahan saat mendapatkan pembaruan. ${again}",
		      ERROR_ADDTL: "Terjadi kesalahan saat mendapatkan pembaruan tambahan. ${again}",
		      ERROR_AGAIN: "Coba lagi.",
		      ERROR_AGAIN_TITLE: "Coba permintaan untuk pembaruan lebih sekali lagi.",
		      PROFILE_TITLE: "Buka profil dari ${user}.",
		      SORT_BY: "Urutkan berdasarkan\\:",
		      SORTS: {
		         DATE: "Tanggal",
		         DATE_TOOLTIP: "Urutkan dari sejarah terkini hingga pembaruan terkini yang paling lama",
		         DATE_TOOLTIP_REVERSE: "Urutkan dari sejarah terkini yang paling sedikit hingga pembaruan terkini yang paling banyak"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} pukul ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Hari ini pukul ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Kemarin pukul ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Komentar ini",
			   REPLY_ACTION: "Jawaban",
		       REPLY_ACTION_TOOLTIP: "Balas komentar berikut"
		   },
		   OAUTH: {
		      welcomeHeader: "Selamat Datang pada Koneksi",
		      continueBtnLabel: "Lanjutkan",
		      continueBtnA11y: "Mengaktifkan tautan ini akan membuka jendela baru yang akan mengizinkan Anda untuk mengotorisasi akses koneksi.",
		      clickHere: "Klik di sini",
		      infoMsg: "Koneksi memerlukan otorisasi Anda untuk mengakses data.",
		      authorizeGadget: "${clickHere} untuk mengotorisasi aplikasi ini untuk mengakses informasi koneksi Anda.",
		      confirmAuthorization: "${clickHere} untuk mengkonfirmasi bahwa Anda sudah mengotorisasi aplikasi ini untuk mengakses informasi koneksi Anda."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Mengaktifkan tautan ini akan membuka jendela baru yang akan mengizinkan Anda untuk mengotorisasi akses pada repositori Pustaka Koneksi.",
		      infoMsg: "Repositori Pustaka Koneksi memerlukan otorisasi Anda untuk mengakses data Anda.",
		      authorizeGadget: "${clickHere} Untuk mengotorisasi aplikasi ini untuk mengakses informasi repositori Pustaka Koneksi Anda.",
		      confirmAuthorization: "${clickHere} Untuk mengkonfirmasi bahwa Anda sudah mengotorisasi aplikasi ini untuk mengakses informasi repositori Pustaka Koneksi."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Batal",
		      CONFIRM: "Anda yakin ingin menghapus perubahan Anda?  Tekan OK untuk melanjutkan atau Batal untuk kembali.",
		      DIALOG_TITLE: "Konfirmasi",
		      NAME: "Konfirmasi",
		      OK: "Ya",
		      TOOLTIP: "Konfirmasi"
		   }
});
