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
		         label: "Diğer",
		         tooltip: "Diğer Eylemler"
		       },
		       tags_more: "ve diğer ${0}",
		       ERROR_ALT: "Hata",
		       PERSON_TITLE: "${user} kişisinin profilini açın.",
		       inactiveUser: "${user} (etkinlik dışı)",
		       inactiveIndicator: "(etkinlik dışı)",
		       like_error: "Beğeniniz kaydedilemedi. Lütfen daha sonra yeniden deneyin.",
		       vote_error: "Oyunuz kaydedilemedi. Lütfen daha sonra yeniden deneyin."
		   },
		   generic: {
		      untitled: "(Başlıksız)",
		      tags: "Etiketler:",
		      tags_more: "ve diğer ${0}",
		      likes: "Beğenmeler",
		      comments: "Yorumlar",
		      titleTooltip: "${app} Uygulamasına Git",
		      error: "Veriler alınamıyor.",
		      timestamp: {
		         created: {
		            DAY: "Oluşturma zamanı: ${EEEE}, ${time}",
		            MONTH: "Oluşturma zamanı: ${MMM} ${d}",
		            TODAY: "Oluşturma zamanı: Bugün, ${time}",
		            YEAR: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Oluşturma zamanı: Dün, ${time}",
		            TOMORROW: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Güncelleştirme zamanı: ${EEEE}, ${time}",
		            MONTH: "Güncelleştirme zamanı: ${MMM} ${d}",
		            TODAY: "Güncelleştirme zamanı: Bugün, ${time}",
		            YEAR: "Güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Güncelleştirme: Dün, ${time}",
		            TOMORROW: "Güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Genel",
		         priv: "Özel"
		      },
		      action: {
		         created: "Oluşturuldu",
		         updated: "Güncelleştirme Zamanı"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Giriş sayfasında ve e-posta özetinde izlediğiniz kişilere ilişkin güncelleştirmeleri alın.",
		      profile_title: "${user} kişisinin profilini açın.",
		      profile_a11y: "Bu bağlantı etkinleştirildiğinde ${user} kullanıcısının profili yeni bir pencerede açılır.",
		      error: "Bir hata oluştu.  ${again}.",
		      error_again: "Lütfen yeniden deneyin",
		      error_404: "Ağ isteği artık yok.",
		      warning: "Uyarı",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Artık ağ kişilerisiniz.",
		            	follow: "Artık ağ kişilerisiniz ve ${user} adlı kullanıcıyı izliyorsunuz."
		            },
		            ignore: {
		            	nofollow: "Daveti yoksaydınız.",
		            	follow: "Daveti yoksaydınız, ancak şimdi ${user} adlı kullanıcıyı izliyorsunuz."
		            }
		         },
		         error: {
		            accept: "İstek kabul edilirken bir hata oluştu.",
		            ignore: "İstek yoksayılırken bir hata oluştu."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE}, ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Bugün, ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Dün, ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Bu bağlantı etkinleştirildiğinde ${name} öğesi yeni bir pencerede açılır.",
		      tooltip: "${name} öğesini Dosyalar uygulamasında aç",
		      profile_title: "${user} kişisinin profilini açın.",
		      profile_a11y: "Bu bağlantı etkinleştirildiğinde ${user} kullanıcısının profili yeni bir pencerede açılır.",
		      download_tooltip: "Bu dosyayı karşıdan yükle (${0})",
		      following: {
		         add: "Dosyayı İzle",
		         remove: "İzlemeyi Durdur",
		         title: "Bu dosyaya ilişkin güncelleştirmeler alıp almayacağınızı belirtmek için etkinleştirin ya da devre dışı bırakın"
		      },
		      share: {
		         label: "Paylaş",
		         title: "Bu dosyaya başkalarının erişimini ver"
		      },
		      timestamp: {
		         created: {
		            DAY: "Oluşturma zamanı: ${EEEE}, ${time}",
		            MONTH: "Oluşturma zamanı: ${MMM} ${d}",
		            TODAY: "Oluşturma zamanı: Bugün, ${time}",
		            YEAR: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Oluşturma zamanı: Dün, ${time}",
		            TOMORROW: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} oluşturma zamanı: ${EEEE}, ${time}",
		            MONTH: "${user} oluşturma zamanı: ${MMM} ${d}",
		            TODAY: "${user} oluşturma zamanı: Bugün, ${time}",
		            YEAR: "${user} oluşturma zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} oluşturma zamanı: Dün, ${time}",
		            TOMORROW: "${user} oluşturma zamanı: ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Güncelleştirme zamanı: ${EEEE}, ${time}",
		            MONTH: "Güncelleştirme zamanı: ${MMM} ${d}",
		            TODAY: "Güncelleştirme zamanı: Bugün, ${time}",
		            YEAR: "Güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Güncelleştirme: Dün, ${time}",
		            TOMORROW: "Güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} güncelleştirme zamanı: ${EEEE}, ${time}",
		            MONTH: "${user} güncelleştirme zamanı: ${MMM} ${d}",
		            TODAY: "${user} güncelleştirme zamanı: Bugün, ${time}",
		            YEAR: "${user} güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} güncelleştirme zamanı: Dün, ${time}",
		            TOMORROW: "${user} güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Oluşturma zamanı: ${EEEE}, ${time}",
		            MONTH: "Oluşturma zamanı: ${MMM} ${d}",
		            TODAY: "Oluşturma zamanı: Bugün, ${time}",
		            YEAR: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Oluşturma zamanı: Dün, ${time}",
		            TOMORROW: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Güncelleştirme zamanı: ${EEEE}, ${time}",
		            MONTH: "Güncelleştirme zamanı: ${MMM} ${d}",
		            TODAY: "Güncelleştirme zamanı: Bugün, ${time}",
		            YEAR: "Güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Güncelleştirme zamanı: Dün, ${time}",
		            TOMORROW: "Güncelleştirme zamanı: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long}, kullanıcı: ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long}, kullanıcı: ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Bu dosyayı karşıdan yükle (${size})",
		      	 DOWNLOAD_ALT: "Karşıdan Yükle"
		      },
		      PREVIEW: {
		         LINK: "Önizleme",
		         TITLE: "Bu dosyayı yeni pencerede önizleyin."
		      },
		      TAGS: "Etiketler:",
		      error: "Bir hata oluştu.  ${again}.",
		      error_again: "Lütfen yeniden deneyin",
		      error_404: "Dosya artık yok ya da dosyaya erişmek için yeterli izniniz yok.",
		      error_403: "Bu dosyayı görüntülemek için izniniz yok. Dosya genel değil ve sizinle paylaşılmıyor.",
		      notifications: {
		         USER_SHARED: "${user} şunu yazdı:",
		         CHANGE_SUMMARY: "${user} değişiklik özeti sağladı",
		         NO_CHANGE_SUMMARY: "${user} bir değişiklik özeti sağlamadı",
		         COMMENTED: "${user} yorum yaptı"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Sizin tarafınızdan dışarı alındı",
		      checkedout_other: "${user} tarafından dışarı alındı",
		      tooltip: "${name} dosyasını kitaplıkta aç",
		      draft_404_info: "Taslak silindi ya da artık sizinle paylaşılmıyor. Yayınlanan sürüm, şu anda bu dosyanın en son sürümüdür.",
		      error_404: "Dosya silindi ya da artık sizinle paylaşılmıyor.",
		      error_403: "Dosya silindi ya da artık sizinle paylaşılmıyor.",
		      error_preview: "Dosya artık önizleme için kullanılamıyor.",
		      draft_review_canceled: "İnceleme iptal edilmiş ve taslak artık sizinle paylaşılmıyor. Artık inceleme gerekmiyor.",
		      switch_ee: "Taslağı görüntüle",
		      switch_ee_tooltip: "Bu dosyaya ilişkin en son taslağı görüntüle"
		   },
		   ecm_draft: {
		      tooltip: "${name} taslağını kitaplıkta aç",
		      community_owners: "Topluluk Sahipleri",
		      draft: "Taslak",
		      draft_tooltip: "Taslak görüntüleniyor",
		      draft_general_info: "Önceki taslak artık yok ve daha yeni bir taslak şu anda en son sürüm.",
		      draft_review_404_general_info: "İnceleyicilerden biri zaten oy verdi. Artık bu taslağı incelemeniz istenmiyor.",
		      draft_review_404_request_info: "Önceki taslak artık yok ve en son taslak inceleme için gönderildi. İncelemeniz isteniyor.",
		      draft_review_404_require_info: "Önceki taslak artık yok ve en son taslak inceleme için gönderildi. İncelemeniz gerekiyor.",
		      draft_review_request_info: "İncelemeniz isteniyor.",
		      draft_review_require_info: "İncelemeniz gerekiyor.",
		      error_404: "Taslak silindi ya da artık sizinle paylaşılmıyor.",
		      error_403: "Sizinle paylaşılmadığı için bu taslağı görüntüleyemezsiniz.",
		      error_preview: "Taslak artık önizleme için kullanılamıyor.",
		      switch_ee: "Yayınlanan sürümü görüntüle",
		      switch_ee_tooltip: "Bu dosyanın yayınlanan sürümünü görüntüle",
		      review: "İncele",
		      reviewers: "İnceleyenler",
		      reviwers_addtl: "Ek İnceleyenler",
		      in_review: "Taslak İncelemede",
		      in_review_tooltip: "Taslak İnceleme modunda görüntüleniyor",
		      review_required_any: "Topluluk Sahipleri, bir inceleyenin bu taslağı incelemesini istiyor.",
		      review_required_all: "Topluluk Sahipleri, tüm inceleyenlerin bu taslağı incelemesini istiyor.",
		      review_required_generic: "Topluluk Sahipleri, bu inceleyenlerin bu taslağı incelemesini istiyor.",
		      review_additional_required: "Taslağı gönderen tarafından eklenen tüm inceleyenlerin bu taslağı görüntülemesi gerekir.",
		      reivew_submitted_date: {
		         DAY: "${user} tarafından taslağın inceleme için gönderilme zamanı: ${EEEE}, ${time}.",
		         MONTH: "${user} tarafından taslağın inceleme için gönderilme zamanı: ${MMM}, ${d}.",
		         TODAY: "${user} tarafından taslağın inceleme için gönderilme zamanı: bugün, ${time}.",
		         YEAR: "${user} tarafından taslağın inceleme için gönderilme zamanı: ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} tarafından taslağın inceleme için gönderilme zamanı: dün, ${time}.",
		         TOMORROW: "${user} tarafından taslağın inceleme için gönderilme zamanı: ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Beklemede",
		      pending_rejected: "Taslak reddedildiği için artık inceleme gerekmiyor",
		      approve: "Onayla",
		      approved: "Onaylanma Zamanı",
		      approve_tooltip: "Bu taslağı onayla",
		      accept_success: "Bu taslağı onayladınız.",
		      accept_error: "Bu taslak onaylanırken bir hata oluştu. Yeniden deneyin.",
		      accept_info: "Bu taslağı onayladınız.",
		      reject: "Reddet",
		      rejected: "Reddedildi",
		      reject_tooltip: "Bu taslağı reddet",
		      reject_success: "Bu taslağı reddettiniz.",
		      reject_error: "Bu taslak reddedilirken bir hata oluştu. Yeniden deneyin.",
		      reject_info: "Bu taslağı reddettiniz."
		   },
		   authUser: {
		      error: "Geçerli kullanıcı alınırken bir hata oluştu.  ${again}.",
		      error_again: "Lütfen yeniden deneyin",
		      error_404: "Kimliği doğrulanmış kullanıcı bulunamıyor.",
		      error_403: "Kullanıcı bilgilerini almak için izniniz yok."
		   },
		   forum: {
		      error: "Bir hata oluştu.  ${again}.",
		      error_again: "Lütfen yeniden deneyin",
		      error_404: "Forum artık yok ya da dosyaya erişmek için yeterli izniniz yok.",
		      error_403: "Bu forumu görüntülemek için izniniz yok. Forum genel değil ve sizinle paylaşılmıyor.",
		      readMore: "Tam konuyu görüntüle...",
		      readMore_tooltip: "${name} adlı forum konusunu açın.",
		      readMore_a11y: "Bu bağlantı etkinleştirildiğinde ${name} adlı forum konusu yeni bir pencerede açılır.",
		      QUESTION_ANSWERED: "Bu soru yanıtlandı.",
		      QUESTION_NOT_ANSWERED: "Bu soru henüz yanıtlanmadı.",
		      attachments: "${count} Ek",
		      attachments_one: "${count} Ek"
		   },
		   blog: {
		      error: "Bir hata oluştu.  ${again}.",
		      error_again: "Lütfen yeniden deneyin",
		      error_404: "Web günlüğü artık yok ya da dosyaya erişmek için yeterli izniniz yok.",
		      error_403: "Bu web günlüğünü görüntülemek için izniniz yok. Web günlüğü genel değil ve sizinle paylaşılmıyor.",
		      readMore: " Ek bilgi ...",
		      readMore_tooltip: "${name} web günlüğü girdisini açın.",
		      readMore_a11y: "Bu bağlantı etkinleştirildiğinde ${name} adlı web günlüğü girdisi yeni bir pencerede açılır.",
		      graduated: "Olgunlaştırılmış",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Oy ver</a>",
		  					TOOLTIP: 	"Buna oy ver"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Oy verildi</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Oy Verildi</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Geri Al</a>",
		  					TOOLTIP: 	"Bundan oyunuzu kaldırın"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"Buna 0 kişi oy verdi"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"Buna 1 kişi oy verdi"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"Buna ${recommendCount} kişi oy verdi"
		  				}
		  			},
		  			LOADING: "Yükleniyor...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Oy verildi"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Oylama sınırınıza ulaştığınızdan ya da fikir artık sizin için kullanılabilir olmadığından oyunuzu kaydedemedik.",
		      readMore_tooltip: "${name} fikrini açın.",
		      readMore_a11y: "Bu bağlantı etkinleştirildiğinde ${name} fikri yeni bir pencerede açılır."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Yanıtlar",
		      THIS_ARIA_LABEL: "Bu Yanıt",
		      THIS_TAB_TITLE: "Bu Yanıt",
		      TAB_TITLE: "Yanıtlar (${0})",
		      REPLY_TO_REPLY: "${thisReply} yanıt olarak",
		      REPLY_TO_TOPIC: "${thisTopic} yanıt olarak",
		      THIS_TOPIC: "Bu konuya",
		      THIS_REPLY: "Bu yanıta",
		      NAVIGATE_TO_REPLY: "Üst yanıta git",
		      NAVIGATE_TO_TOPIC: "Üst konuya git",
		      ADD_COMMENT: "Bu konuyu yanıtla",
		      ADD_COMMENT_TOOLTIP: "Bu forum konusunu yanıtla",
		      SHOWING_RECENT_REPLIES: "${0} en yeni yanıt gösteriliyor",
		      PREV_COMMENTS: "Daha Fazla Yanıt Göster",
		      PLACEHOLDER_TXT: "Bu konuyu yanıtla",
		      EMPTY: "Yanıt yok.",
		      TRIM_LONG_COMMENT: "Yanıt kısaltılsın mı?",
		      WARN_LONG_COMMENT: "Yanıt çok uzun.  ${shorten}",
		      ERROR: "Yanıtlar alınırken bir hata oluştu. ${again}",
		      ERROR_CREATE: "Yanıtınız kaydedilemedi.  Daha sonra yeniden deneyin.",
		      ERROR_CREATE_NOT_FOUND: "Konu silindiği ya da artık sizin tarafınızdan görülemediği için yanıtınız kaydedilemedi.",
		      ERROR_CREATE_ACCESS_DENIED: "Konu silindiği ya da artık sizin tarafınızdan görülemediği için yanıtınız kaydedilemedi.",
		      ERROR_CREATE_TIMEOUT: "Sunucuyla iletişim kurulamadığı için yanıtınız kaydedilemedi.  Yeniden denemek için 'Kaydet' düğmesini tıklatın.",
		      ERROR_CREATE_CANCEL: "İstek iptal edildiği için yanıtınız kaydedilemedi.  Yeniden denemek için 'Kaydet' düğmesini tıklatın.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Bu yanıtı oluşturmak için oturum açmış olmanız gerekir.  Oturum açma girişiminde bulunmak için 'Kaydet' düğmesini tıklatın.",
		      ERROR_NO_CONTENT: "Yanıtınızı girin ve 'Kaydet'i tıklatın.  Artık yorum bırakmak istemiyorsanız, 'İptal' düğmesini tıklatın.",
		      ERROR_UNAUTHORIZED: "Yanıt bırakma yetkiniz olmadığı için yanıtınız kaydedilemedi.",
		      COMMENT_DELETED: {
		         DAY: "Yanıtın ${user} tarafından silinme zamanı: ${EEEE}, ${time}",
		         MONTH: "Yanıtın ${user} tarafından silinme zamanı: ${MMM} ${d}",
		         TODAY: "Yanıtın ${user} tarafından silinme zamanı: Bugün, ${time}",
		         YEAR: "Yanıtın ${user} tarafından silinme zamanı: ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Yanıtın ${user} tarafından silinme zamanı: Dün, ${time}",
		         TOMORROW: "Yanıtın ${user} tarafından silinme zamanı: ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Silinme nedeni: ${reason}",
		      REPLY_TITLE: "Ynt: ${0}",
		      SHOW_FULL_REPLY: "Tam yanıtı görüntüle",
		      SHOW_FULL_REPLY_TOOLTIP: "Forum konusundaki asıl yanıta git",
		      REPLY_ACTION: "Yanıtla",
		      REPLY_ACTION_TOOLTIP: "Bu gönderiyi yanıtla",
		      MODERATION_PENDING: "Bu yanıt incelenmek üzere bekliyor.",
		      MODERATION_QUARANTINED: "Gönderi, başkan tarafından karantinaya alındı.",
		      MODERATION_REMOVED: {
		         DAY: "Bu yanıtın ${user} tarafından kaldırılma zamanı: ${EEEE}, ${time}.",
		         MONTH: "Bu yanıtın ${user} tarafından kaldırılma zamanı :${MMM} ${d}",
		         TODAY: "Bu yanıtın ${user} tarafından kaldırılma zamanı: Bugün, ${time}.",
		         YEAR: "Bu yanıtın ${user} tarafından kaldırılma zamanı: ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Bu yanıtın ${user} tarafından kaldırılma zamanı: Dün, ${time}.",
		         TOMORROW: "Bu yanıtın ${user} tarafından kaldırılma zamanı: ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Bu yanıtın ${user} tarafından reddedilme zamanı: ${EEEE}, ${time}.",
		         MONTH: "Bu yanıtın ${user} tarafından reddedilme zamanı :${MMM} ${d}.",
		         TODAY: "Bu yanıtın ${user} tarafından reddedilme zamanı: Bugün, ${time}.",
		         YEAR: "Bu yanıtın ${user} tarafından reddedilme zamanı: ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Bu yanıtın ${user} tarafından reddedilme zamanı: Dün, ${time}.",
		         TOMORROW: "Bu yanıtın ${user} tarafından reddedilme zamanı: ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Yanıtınız incelenmek üzere gönderildi ve onaylandığında kullanılabilecek."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Yorumlar",
		      PLACEHOLDER_TXT: "Yorum ekle",
		      TAB_TITLE: "Yorumlar (${0})",
		      ACTION_NOT_SUPPORTED: "Desteklenmeyen Eylem",
		      ADD_COMMENT: "Yorum Ekle",
		      ADD_COMMENT_TOOLTIP: "Bu öğeye bir yorum ekle",
		      CANCEL: "İptal",
		      COMMENT_COUNT_ONE: "${0} yorum",
		      COMMENT_COUNT_MANY: "${0} yorum",
		      COMMENT_LABEL: "Yorum:",
		      DELETE: "Delete",
		      DELETE_TOOLTIP: "Yorumu sil",
		      DELETEREASON: "Bu yorumun silinme nedeni:",
		      DIALOG_TITLE: "Yorumu Kısalt",
		      TOOLTIP: "Yorumu Kısalt",
		      NAME: "Yorumu Kısalt",
		      EDIT: "Düzenle",
		      EDIT_TOOLTIP: "Yorumu düzenle",
		      ERROR_CREATE: "Yorumunuz kaydedilemedi.  Daha sonra yeniden deneyin.",
		      ERROR_CREATE_NOT_FOUND: "Öğe silindiği ya da artık sizin tarafınızdan görülemediği için yorumunuz kaydedilemedi.",
		      ERROR_CREATE_ACCESS_DENIED: "Öğe silindiği ya da artık sizin tarafınızdan görülemediği için yorumunuz kaydedilemedi.",
		      ERROR_CREATE_TIMEOUT: "Sunucuyla iletişim kurulamadığı için yorumunuz kaydedilemedi.  Yeniden denemek için 'Gönder' düğmesini tıklatın.",
		      ERROR_CREATE_CANCEL: "İstek iptal edildiği için yorumunuz kaydedilemedi.  Yeniden denemek için 'Gönder' düğmesini tıklatın.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Bu yorumu oluşturmak için oturum açmış olmanız gerekir.  Oturum açma girişiminde bulunmak için 'Gönder' düğmesini tıklatın.",
		      ERROR_DELETE: "Yorumunuz silinemedi.  Daha sonra yeniden deneyin.",
		      ERROR_DELETE_TIMEOUT: "Sunucuyla iletişim kurulamadığı için yorumunuz silinemedi.  Yeniden denemek için 'Sil' düğmesini tıklatın.",
		      ERROR_DELETE_NOT_FOUND: "Yorum veya öğe silindiği ya da artık sizin tarafınızdan görülemediği için yorumunuz silinemedi.",
		      ERROR_DELETE_ACCESS_DENIED: "Öğe silindiği ya da artık sizin tarafınızdan görülemediği için yorumunuz silinemedi.",
		      ERROR_DELETE_CANCEL: "İstek iptal edildiği için yorumunuz silinemedi.  Yeniden denemek için 'Sil' düğmesini tıklatın.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Bu yorumu silmek için oturum açmış olmanız gerekir.  Oturum açma girişiminde bulunmak için 'Sil' düğmesini tıklatın.",
		      ERROR_EDIT: "Yorumunuz güncelleştirilemedi.  Daha sonra yeniden deneyin.",
		      ERROR_EDIT_ACCESS_DENIED: "Öğe silindiği ya da artık sizin tarafınızdan görülemediği için yorumunuz güncelleştirilemedi.",
		      ERROR_EDIT_NOT_FOUND: "Öğe silindiği ya da artık sizin tarafınızdan görülemediği için yorumunuz güncelleştirilemedi.",
		      ERROR_EDIT_TIMEOUT: "Sunucuyla iletişim kurulamadığı için yorumunuz güncelleştirilemedi.  Yeniden denemek için 'Gönder' düğmesini tıklatın.",
		      ERROR_EDIT_CANCEL: "İstek iptal edildiği için yorumunuz güncelleştirilemedi.  Yeniden denemek için 'Gönder' düğmesini tıklatın.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Bu yorumu düzenlemek için oturum açmış olmanız gerekir.  Oturum açma girişiminde bulunmak için 'Gönder' düğmesini tıklatın.",
		      ERROR_NO_CONTENT: "Yorumunuzu girin ve 'Gönder' düğmesini tıklatın.  Artık yorum bırakmak istemiyorsanız 'İptal' düğmesini tıklatın.",
		      ERROR_NO_CONTENT_EDIT: "Yorumunuzu girin ve 'Gönder' düğmesini tıklatın.  Artık yorumunuzu düzenlemek istemiyorsanız 'İptal' düğmesini tıklatın.",
		      ERROR_UNAUTHORIZED: "Yorum bırakma yetkiniz olmadığı için yorumunuz kaydedilemedi.",
		      ERROR_GENERAL: "Bir hata oluştu.",
		      OK: "Tamam",
		      YES: "Evet",
		      TRIM_LONG_COMMENT: "Yorumunuz kısaltılsın mı?",
		      WARN_LONG_COMMENT: "Yorum çok uzun.  ${shorten}",
		      LINK: "Bağlantı",
		      SAVE: "Kaydet",
		      POST: "Gönder",
		      SHOWMORE: "Ek bilgi...",
		      VIEW_COMMENTS_FILE: "Bu dosyadaki yorumları görüntüle",
		      SUBSCRIBE_TO_COMMENTS: "Bu yorumlara abone ol",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Özet akışı okuyucunuz aracılığıyla bu yorumlardaki değişiklikleri izleyin",
		      PROFILE_TITLE: "${user} kişisinin profilini açın.",
		      PROFILE_A11Y: "Bu bağlantı etkinleştirildiğinde ${user} kullanıcısının profili yeni bir pencerede açılır.",
		      MODERATION_PENDING: "Bu yorum incelenmek üzere bekliyor.",
		      MODERATION_REMOVED: {
		         DAY: "Bu yorumun ${user} tarafından kaldırılma zamanı: ${EEEE}, ${time}.",
		         MONTH: "Bu yorumun ${user} tarafından kaldırılma zamanı: ${MMM} ${d}.",
		         TODAY: "Bu yorumun ${user} tarafından kaldırılma zamanı: Bugün, ${time}.",
		         YEAR: "Bu yorumun ${user} tarafından kaldırılma zamanı: ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Bu yorumun ${user} tarafından kaldırılma zamanı: Dün, ${time}.",
		         TOMORROW: "Bu yorumun ${user} tarafından kaldırılma zamanı: ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Bu yorumun ${user} tarafından reddedilme zamanı: ${EEEE}, ${time}.",
		         MONTH: "Bu yorumun ${user} tarafından reddedilme zamanı :${MMM} ${d}.",
		         TODAY: "Bu yorumun ${user} tarafından reddedilme zamanı: Bugün, ${time}.",
		         YEAR: "Bu yorumun ${user} tarafından reddedilme zamanı: ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Bu yorumun ${user} tarafından reddedilme zamanı: Dün, ${time}.",
		         TOMORROW: "Bu yorumun ${user} tarafından reddedilme zamanı: ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Önceki Yorumları Göster",
		      EMPTY: "Yorum yok.",
		      ERROR_ALT: "Hata",
		      ERROR: "Yorumlar alınırken bir hata oluştu. ${again}",
		      ERROR_ADDTL: "Ek yorumlar alınırken bir hata oluştu. ${again}",
		      ERROR_AGAIN: "Yeniden deneyin.",
		      ERROR_AGAIN_TITLE: "Daha fazla yorum için isteği yeniden deneyin.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE}, ${time} (sürüm ${version})",
		         MONTH: "${user} ${MMM} ${d} (sürüm ${version})",
		         TODAY: "${user} bugün, ${time} (sürüm ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (sürüm ${version})",
		         YESTERDAY: "${user} dün, ${time} (sürüm ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (sürüm ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE}, ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} bugün, ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} dün, ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE}, ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Bugün, ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Dün, ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Yorumun ${user} tarafından silinme zamanı: ${EEEE}, ${time}",
		         MONTH: "Yorumun ${user} tarafından silinme zamanı: ${MMM} ${d}",
		         TODAY: "Yorumun ${user} tarafından silinme zamanı: Bugün, ${time}",
		         YEAR: "Yorumun ${user} tarafından silinme zamanı: ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Yorumun ${user} tarafından silinme zamanı: Dün, ${time}",
		         TOMORROW: "Yorumun ${user} tarafından silinme zamanı: ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} tarafından düzenlenme zamanı: ${EEEE}, ${time} (sürüm ${version})",
		         MONTH: "${user} tarafından düzenlenme zamanı: ${MMM} ${d} (sürüm ${version})",
		         TODAY: "${user} tarafından düzenlenme zamanı: Bugün, ${time} (sürüm ${version})",
		         YEAR: "${user} tarafından düzenlenme zamanı: ${MMM} ${d}, ${YYYY} (sürüm ${version})",
		         YESTERDAY: "${user} tarafından düzenlenme zamanı: Dün, ${time} (sürüm ${version})",
		         TOMORROW: "${user} tarafından düzenlenme zamanı: ${MMM} ${d}, ${YYYY} (sürüm ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} tarafından düzenlenme zamanı: ${EEEE}, ${time}",
		         MONTH: "${user} tarafından düzenlenme zamanı: ${MMM} ${d}",
		         TODAY: "${user} tarafından düzenlenme zamanı: Bugün, ${time}",
		         YEAR: "${user} tarafından düzenlenme zamanı: ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} tarafından düzenlenme zamanı: Dün, ${time}",
		         TOMORROW: "${user} tarafından düzenlenme zamanı: ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Bu yorumu silmek istediğinizden emin misiniz?",
		      FLAG_ITEM: {
		         BUSY: "Kaydediliyor...",
		         CANCEL: "İptal",
		         ACTION: "Uygunsuz olarak işaretle",
		         DESCRIPTION_LABEL: "Bu öğenin işaretlenme nedenini girin (isteğe bağlı)",
		         EDITERROR: "Bir hata nedeniyle dosyanın meta verileri düzenlenmedi.",
		         OK: "Kaydet",
		         ERROR_SAVING: "İsteğin işlenmesiyle ilgili bir hata vardı. Daha sonra yeniden deneyin.",
		         SUCCESS_SAVING: "İşaretiniz gönderildi. Bir başkan tarafından kısa zamanda incelenecek.",
		         TITLE: "Bu öğeyi uygunsuz olarak işaretle",
		         COMMENT: {
		            TITLE: "Bu yorumu uygunsuz olarak işaretle",
		            A11Y: "Bu düğme, kullanıcının bu yorumu uygunsuz olarak işaretlemesini sağlayan bir iletişim kutusunu açar."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "İptal",
		      DIALOG_TITLE: "Yorumu Sil",
		      NAME: "Yorumu Sil",
		      OK: "Tamam",
		      TOOLTIP: "Yorumu Sil"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "İptal",
		      CONFIRM: "Kısaltma işlemi sonucunda, yorum sınırını geçen metin kaldırılır.  Kısaltmak için 'Tamam' ya da yorumu düzenlemek için 'İptal' düğmesini tıklatın.",
		      DIALOG_TITLE: "Yorumu Kısalt",
		      NAME: "Yorumu Kısalt",
		      OK: "Tamam",
		      TOOLTIP: "Yorumu Kısalt"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Gönderme Onayı",
		      CONFIRM: "Yorumunuz incelenmek üzere gönderildi ve onaylandığında kullanılabilecek.",
		      OK: "Tamam"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "bugün",
		      TODAY_U: "Bugün",
		      YESTERDAY: "dün",
		      YESTERDAY_U: "Dün",
		      ADDED: { DAY: "Eklenme zamanı: ${EEee}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Eklenme zamanı: ${date_long}",
		         TODAY: "Eklenme zamanı: Bugün, ${time}",
		         YEAR: "Eklenme zamanı: ${date_long}",
		         YESTERDAY: "Eklenme zamanı: Dün, ${time}"
		      },
		      LAST_UPDATED: { DAY: "Son güncelleştirme zamanı: ${EEee}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Son güncelleştirme zamanı: ${date_long}",
		         TODAY: "Son güncelleştirme zamanı: Bugün, ${time}",
		         YEAR: "Son güncelleştirme zamanı: ${date_long}",
		         YESTERDAY: "Son güncelleştirme zamanı: Dün, ${time}"
		      },
		      MONTHS_ABBR: { 0: "OCA",
		         10: "KAS",
		         11: "ARA",
		         1: "ŞUB",
		         2: "MAR",
		         3: "NİS",
		         4: "MAY",
		         5: "HAZ",
		         6: "TEM",
		         7: "AĞU",
		         8: "EYL",
		         9: "EKİ"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Bugün",
		         YEAR: "${date_short}",
		         YESTERDAY: "Dün",
		         TOMORROW: "Yarın"
		      },
		      RELATIVE_TIME: { DAY: "${EEee}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Bugün, ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Dün, ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Bugün, ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Dün, ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}, ${time}",
		         TODAY: "${date_short}, ${time}",
		         YEAR: "${date_short}, ${time}",
		         YESTERDAY: "${date_short}, ${time}",
		         TOMORROW: "${date_short}, ${time}"
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
		      UPDATED: { DAY: "Güncelleştirme zamanı: ${EEee}, ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Güncelleştirme zamanı: ${date_long}",
		         TODAY: "Güncelleştirme zamanı: Bugün, ${time}",
		         YEAR: "Güncelleştirme zamanı: ${date_long}",
		         YESTERDAY: "Güncelleştirme: Dün, ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Sürüm bilgileri yüklenemiyor.",
		      ERROR_REQUEST_CANCELLED: "İstek iptal edildi.",
		      ERROR_REQUEST_TIMEOUT: "Sunucuyla iletişim kurulamadı.",
		      ERROR_REQUEST_UNKNOWN: "Bilinmeyen bir hata oluştu.",
		      LOADING: "Yükleniyor ..",
		      NO_VERSIONS: "Sürüm yok",
		      INFO: "Sürüm ${0}, oluşturulma zamanı: ${1} oluşturan: ",
		      VERSION_NUMBER: "Sürüm ${0}",
		      DELETED: "Silindi",
		      DELETE_ALL: "Bu sürümden önceki tüm sürümleri sil",
		      DELETE_VERSION_SINGLE: "${0} sürümünü sil",
		      DELETEERROR: "Bir hata nedeniyle sürüm silinmedi.",
		      CREATE_VERSION: "Yeni sürüm oluştur",
		      CREATE_VERSION_TOOLTIP: "Bu dosyanın bir sürümünü oluşturur",
		      REVERT_VERSION: "${0} sürümünü geri yükle",
		      REVERT_DESCRIPTION: "${0} sürümünden geri yüklendi",
		      PREVIOUS: "Önceki",
		      PREVIOUS_TOOLTIP: "Önceki sayfa",
		      ELLIPSIS: "...",
		      NEXT: "Sonraki",
		      NEXT_TOOLTIP: "Sonraki sayfa",
		      COUNT: "${0}-${1} / ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Sayfa",
		      SHOW: "Göster",
		      ITEMS_PER_PAGE: " öğe / sayfa.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Bugün, ${time}",
		            YESTERDAY: "Dün, ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee}, ${time}",
		            YEAR: "${date_short}, ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short}, ${time}",
		            TODAY: "bugün, ${time}",
		            YESTERDAY: "dün, ${time}"
		        },
		        UPDATED: { DAY: "Güncelleştirme zamanı: ${EEee}, ${time}",
		            YEAR: "Güncelleştirme zamanı: ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Güncelleştirme zamanı: ${date_short}",
		            TODAY: "Güncelleştirme zamanı: Bugün, ${time}",
		            YESTERDAY: "Güncelleştirme: Dün, ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "${0} sürümünü sil",
		         DOWNLOAD: "Karşıdan Yükle",
		         DOWNLOAD_TOOLTIP: "Bu sürümü karşıdan yükle (${0})",
		         VIEW: "Görüntüle",
		         VIEW_TOOLTIP: "${0} sürümünü görüntüle",
		         REVERT: {
		            A11Y: "Bu düğme, kullanıcının dosyayı bir önceki sürümden geri yükleme işlemini doğrulamasını sağlayan bir iletişim kutusunu açar. Bu işlem doğrulandığında sayfanın içeriği yenilenir.",
		            FULL: "Geri Yükle",
		            WIDGET: "Bu sürümü geri yükle"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Önceden silindiği ya da artık sizin tarafınızdan görülemediği için sürüm silinemedi.",
		         ERROR_ACCESS_DENIED: "Düzenleyici olmadığınız için sürüm silinemedi.",
		         ERROR_TIMEOUT: "Sunucuyla iletişim kurulamadığı için sürüm silinmedi.  İsteğinizi yeniden denemek için 'Sil' düğmesini yeniden tıklatın.",
		         ERROR_CANCEL: "İstek iptal edildiği için sürüm silinmedi.  İsteğinizi yeniden denemek için 'Sil' düğmesini yeniden tıklatın.",
		         ERROR_NOT_LOGGED_IN: "Bu sürümü silmek için oturum açmış olmanız gerekir.  Oturum açma girişiminde bulunmak için 'Sil' düğmesini tıklatın.",
		         GENERIC_ERROR: "Bilinmeyen bir hata nedeniyle sürüm silinemedi.  İsteğinizi yeniden denemek için 'Sil' düğmesini yeniden tıklatın.",
		         FULL: "Delete",
		         A11Y: "Bu düğme, kullanıcının bu sürümü silmeyi doğrulamasını sağlayan bir iletişim kutusunu açar. Bu işlem doğrulandığında sayfanın içeriği yenilenir."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Silindiği ya da artık sizin tarafınızdan görülemediği için sürüm geri yüklenemedi.",
		         ERROR_ACCESS_DENIED: "Düzenleyici olmadığınız için sürüm geri yüklenemedi.",
		         ERROR_NAME_EXISTS: "Aynı adı taşıyan başka bir dosya olduğu için sürüm geri yüklenemedi.",
		         ERROR_TIMEOUT: "Sunucuyla iletişim kurulamadığı için sürüm geri yüklenmedi.  İsteğinizi yeniden denemek için 'Geri Yükle' düğmesini yeniden tıklatın.",
		         ERROR_CANCEL: "İstek iptal edildiği için sürüm geri yüklenmedi.  İsteğinizi yeniden denemek için 'Geri Yükle' düğmesini yeniden tıklatın.",
		         ERROR_QUOTA_VIOLATION: "Alan kısıtlamaları nedeniyle sürüm geri yüklenemedi.",
		         ERROR_MAX_CONTENT_SIZE: "İzin verilen dosya boyutu üst sınırı olan ${0} değerinden daha büyük olduğu için sürüm geri yüklenemedi.",
		         GENERIC_ERROR: "Bilinmeyen bir hata nedeniyle sürüm geri yüklenemedi.  İsteğinizi yeniden denemek için 'Geri Yükle' düğmesini yeniden tıklatın."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Karşıdan yükleyeni görüntüle...",
		      PREVIOUS: "Önceki",
		      PREVIOUS_TOOLTIP: "Önceki sayfa",
		      ELLIPSIS: "...",
		      NEXT: "Sonraki",
		      NEXT_TOOLTIP: "Sonraki sayfa",
		      COUNT: "${0}-${1} / ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Sayfa",
		      SHOW: "Göster",
		      ITEMS_PER_PAGE: " öğe / sayfa.",
		      VERSION: {
		         DAY: "Sürüm ${version}, ${date}",
		         MONTH: "Sürüm ${version}, ${date}",
		         TODAY: "Sürüm ${version}, ${time}",
		         YEAR: "Sürüm ${version}, ${date}",
		         YESTERDAY: "Sürüm ${version}, dün"
		      },
		      FILE: {
		         V_LATEST: "Bu dosyanın en son sürümünü karşıdan yüklediniz",
		         V_OLDER: "Son olarak bu dosyanın ${0} sürümünü karşıdan yüklediniz",
		         LOADING: "Yükleniyor...",
		         EMPTY: "Yalnızca anonim kullanıcılar",
		         ERROR: "Karşıdan yükleme bilgileri yüklenemiyor"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Hata",
		      ERROR_ALT_TEXT: "Hata:",
		      ERROR_MSG_GENERIC: "Bir sorun oluştu.  Lütfen yeniden deneyin.",
		      ERROR_MSG_NOT_AVAILABLE: "Bu öğe silindi ya da artık kullanılamıyor.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Bu öğeye ilişkin içerik kullanılamıyor.",
		      ERROR_MSG_NO_ACCESS: "Bu öğeye artık erişim izniniz yok.",
		      LOADING: "Yükleniyor...",
		      TITLE_SU: "${author} bir ileti gönderdi.",
		      TITLE_NI: "${author}, sizi ağına katılmanız için davet etti.",
		      AUTHOR_TITLE: "${author} için profili görüntüle",
		      OPEN_LINK: "${title} Öğesini Aç",
		      CONFIRM_CLOSE_TITLE: "Onayla",
		      CONFIRM_CLOSE_MESSAGE: "Değişikliklerinizden vazgeçmek istediğinizden emin misiniz? Devam etmek için Tamam ya da geri dönmek için İptal düğmesini tıklatın.",
		      OK: "Tamam",
		      CANCEL: "İptal"
		   },
		   MESSAGE: {
		      SUCCESS: "Onay",
		      ERROR: "Hata",
		      ERROR_ALT_TEXT: "Hata:",
		      INFO: "Bilgi",
		      WARNING: "Uyarı",
		      DISMISS: "Bu iletiyi gizle",
		      MORE_DETAILS: "Daha fazla ayrıntı",
		      HIDE_DETAILS: "Ayrıntıları gizle"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Oluşturma zamanı: ${EEEE}, ${time}",
		           MONTH: "Oluşturma zamanı: ${MMM} ${d}",
		           TODAY: "Oluşturma zamanı: Bugün, ${time}",
		           YEAR: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Oluşturma zamanı: Dün, ${time}",
		           TOMORROW: "Oluşturma zamanı: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Bir hata oluştu.  ${again}.",
		      error_again: "Lütfen yeniden deneyin",
		      error_404: "Durum güncelleştirme artık yok.",
		      notifications: {
		         STATUS_UPDATE: "${user} bir ileti gönderdi",
		         USER_BOARD_POST: "${user}, panonuza yazı yazdı",
		         POST_COMMENT: "${user} şunu yazdı:"
		      }
		   },
		   login: {
		      error: "Kullanıcı adınız ve/veya parolanız, var olan hesaplarla eşleşmiyor. Lütfen yeniden deneyin.",
		      logIn: "Oturum Aç",
		      password: "Parola:",
		      user: "Kullanıcı adı:",
		      welcome: "HCL Connections'ta oturum açın"
		   },
		   repost: {
		      name: "Yeniden Gönder",
		      title: "Bu güncelleştirmeyi izleyenlerime ya da topluluklara yeniden gönder",
		      msg_success: "Güncelleştirme, izleyenlerinize başarıyla yeniden gönderildi.",
		      msg_generic: "Bir sorun oluştu.  Lütfen yeniden deneyin."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Ekle",
		      ADD_TXT: "Kişi ya da toplulukları okuyucu olarak ekle",
		      SHOW_MORE: "Daha fazlasını göster...",
		      READER_IF_PUBLIC: "Herkes (genel)",
		      READER_IF_PUBLIC_TOOLTIP: "Bu dosya genel ve herkes tarafından görülebilir",
		      EMPTY_READERS: "Yok",
		      READERS_LABEL: "Okuyucular:\u00a0",
		      EDITORS_LABEL: "Düzenleyiciler:\u00a0",
		      OWNER_LABEL: "Sahibi:\u00a0",
		      ERROR: "Paylaşım bilgileri yüklenemiyor",
		      ERROR_NOT_FOUND: "İstediğiniz dosya silindi ya da taşındı. Bu bağlantıyı size birisi gönderdiyse, doğru olup olmadığını denetleyin.",
		      ERROR_ACCESS_DENIED: "Bu dosyayı görüntülemek için izniniz yok.  Dosya genel değil ve sizinle paylaşılmıyor.",
		      SHARE: "Paylaş",
		      CANCEL: "İptal",
		      SHARE_WITH: "Paylaş:",
		      PERSON: "Kişi",
		      COMMUNITY: "Topluluk",
		      PLACEHOLDER: "Kişi adı ya da e-postası...",
		      MESSAGE: "İleti:",
		      MESSAGE_TXT: "Bir isteğe bağlı ileti ekle",
		      REMOVE_ITEM_ALT: "Kaldır: ${0}",
		      NO_MEMBERS: "Yok",
		      A11Y_READER_ADDED: "${0} Okuyucu olarak seçildi",
		      A11Y_READER_REMOVED: "${0} Okuyucu olarak kaldırıldı",
		      SELF_REFERENCE_ERROR: "Kendinizle paylaşamazsınız.",
		      OWNER_REFERENCE_ERROR: "Dosyayı sahibi ile paylaşamazsınız.",
		      SHARE_COMMUNITY_WARN: "'${0}' genel topluluğu ile paylaşma bu dosyayı genel yapacaktır.",
		      SELECT_USER_ERROR: "Paylaşacağınız en az bir kişi ya da topluluk seçmelisiniz",
		      WARN_LONG_MESSAGE: "İleti çok uzun.",
		      TRIM_LONG_MESSAGE: "İleti kısaltılsın mı?",
		      ERROR_SHARING: "Dosya paylaşılamadı.  Lütfen daha sonra yeniden deneyin.",
		      INFO_SUCCESS: "Dosya başarıyla paylaşıldı.",
		      MAX_SHARES_ERROR: "Paylaşım sayısı üst sınırı aşıldı.",
		      NOT_LOGGED_IN_ERROR: "Oturum açmadığınız için dosya paylaşılmadı.  Dosyayı paylaşmak için 'Paylaş' düğmesini tıklatın.",
		      TIMEOUT_ERROR: "Sunucuyla iletişim kurulamadığı için dosya paylaşılmadı.  Yeniden denemek için 'Paylaş' düğmesini tıklatın.",
		      CANCEL_ERROR: "İstek iptal edildiği için dosya paylaşılmadı.  Yeniden denemek için 'Paylaş' düğmesini tıklatın.",
		      NOT_FOUND_ERROR: "Dosya silindi ya da artık sizin tarafınızdan görülemiyor ve paylaşılamaz.",
		      ACCESS_DENIED_ERROR: "Artık bu dosyayı paylaşmak için izniniz yok.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Sınırlanan bir dosya genel yapılamaz.",
		      TOOLTIP: "Bu dosyaya başkalarının erişimini ver"
		   },
		   HISTORY: {
		      TAB_TITLE: "En Son Güncelleştirmeler",
		      NO_HISTORY: "Yeni güncelleştirme yok.",
		      EMPTY: "Bu öğe için yeni güncelleştirmeler alınamadı. Öğe silindi veya artık bu öğeye erişim izniniz yok.",
		      MORE: "Önceki Güncelleştirmeleri Göster",
		      ERROR_ALT: "Hata",
		      ERROR: "Güncelleştirmeler alınırken bir hata oluştu. ${again}",
		      ERROR_ADDTL: "Ek güncelleştirmeler alınırken bir hata oluştu. ${again}",
		      ERROR_AGAIN: "Yeniden deneyin.",
		      ERROR_AGAIN_TITLE: "Daha fazla güncelleştirme için isteği yeniden deneyin.",
		      PROFILE_TITLE: "${user} kişisinin profilini açın.",
		      SORT_BY: "Sıralama temeli\\:",
		      SORTS: {
		         DATE: "Tarih",
		         DATE_TOOLTIP: "En son geçmişten en önce güncelleştirmeye doğru sırala",
		         DATE_TOOLTIP_REVERSE: "En önce geçmişten en son güncelleştirmeye doğru sırala"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE}, ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Bugün, ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Dün, ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Bu Yorum",
			   REPLY_ACTION: "Yanıtla",
		       REPLY_ACTION_TOOLTIP: "Bu yoruma yanıt yaz"
		   },
		   OAUTH: {
		      welcomeHeader: "Connections'a Hoş Geldiniz",
		      continueBtnLabel: "Devam",
		      continueBtnA11y: "Bu bağlantı etkinleştirildiğinde, Connections uygulamasına erişim yetkisi vermenizi sağlayacak yeni bir pencere açılır.",
		      clickHere: "Burayı tıklatın",
		      infoMsg: "Connections uygulamasının verilerinize erişebilmesi için yetki vermeniz gerekiyor.",
		      authorizeGadget: "Bu uygulamaya Connections bilgilerinize erişme yetkisi vermek için ${clickHere}.",
		      confirmAuthorization: "Bu uygulamaya Connections bilgilerinize erişme yetkisi verdiğinizi onaylamak için ${clickHere}."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Bu bağlantı etkinleştirildiğinde, Connections Library havuzuna erişim yetkisi vermenizi sağlayacak yeni bir pencere açılır.",
		      infoMsg: "Connections Library havuzunun verilerinize erişebilmesi için yetki vermeniz gerekiyor.",
		      authorizeGadget: "Bu uygulamaya Connections Library havuz bilgilerinize erişme yetkisi vermek için ${clickHere}.",
		      confirmAuthorization: "Bu uygulamaya Connections Library havuz bilgilerinize erişme yetkisi verdiğinizi onaylamak için ${clickHere}."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "İptal",
		      CONFIRM: "Değişikliklerinizden vazgeçmek istediğinizden emin misiniz?  Devam etmek için Tamam ya da geri dönmek için İptal düğmesini tıklatın.",
		      DIALOG_TITLE: "Onayla",
		      NAME: "Onayla",
		      OK: "Tamam",
		      TOOLTIP: "Onayla"
		   }
});
