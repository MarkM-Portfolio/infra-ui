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
     FILE_VIEWER_TITLE: "Dosya önizleme",
     FILENAME_TOOLTIP: "Dosya adını düzenle",
     ICON_TOOLTIP: "Dosyayı karşıdan yükle",
     ERROR: "Bir hata oluştu.",
     SHARED_EXTERNALLY: "Dışarıda paylaşıldı",
     FILE_SYNCED: "Eşitlemeye eklendi",
     MORE_ACTIONS: {
       TITLE: "Diğer Eylemler",
       A11Y: "Dosyada gerçekleştirilecek diğer eylemlerin listesinin olduğu açılır bir pencere açılır."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Diğer seçenekler",
         A11Y: "Bu düğme, daha fazla seçenek için bir menü açar."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Düzenle"
         },
         UPLOAD: {
           TITLE: "Karşıya Yükle"
         }
       }
     },
     WELCOME: {
       TITLE: "Dosya Görünümü ve Ayrıntıları Birleştirdik",
       SUBTITLE: "Artık bir dosyayı ve açıklamalarını yan yana görüntüleyebilirsiniz.",
       LINES: {
          LINE_1: "Eski sayfada bulabileceğiniz tüm bilgiler ve yapabileceğiniz tüm işlemler artık buradadır.",
          LINE_2: "Açıklamalar, paylaşım, sürümler ve temel bilgiler dosyanın yanında bulunur."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Bu düğme, sonraki dosyaya geçmenizi sağlar.",
      PREVIOUS_A11Y: "Bu düğme, önceki dosyaya geçmenizi sağlar."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Kapat",
         A11Y: "Bu düğme, dosya görüntüleyiciyi kapatır."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Dosyadan Yeni",
         ACTION_NAME:"Dosya Oluştur",
         A11Y: {
           TEXT: "Şablon dosyasından bir belge (DOC, DOCX ya da ODT dosyası) oluşturun. Bu belgeleri Docs içinde çevrimiçi olarak düzenleyebilirsiniz.",
           PRES: "Şablon dosyasından bir sunum (PPT, PPTX ya da ODP dosyası) oluşturun. Bu sunumları Docs içinde çevrimiçi olarak düzenleyebilirsiniz.",
           SHEET: "Şablon dosyasından bir elektronik sayfa (XLS, XLSX ya da ODS dosyası) oluşturun. Bu elektronik sayfaları Docs içinde çevrimiçi olarak düzenleyebilirsiniz."
         },
         PROMPT: {
           TEXT: "Şablon dosyasından bir belge (DOC, DOCX ya da ODT dosyası) oluşturun. Bu belgeleri Docs içinde çevrimiçi olarak düzenleyebilirsiniz.",
           PRES: "Şablon dosyasından bir sunum (PPT, PPTX ya da ODP dosyası) oluşturun. Bu sunumları Docs içinde çevrimiçi olarak düzenleyebilirsiniz.",
           SHEET: "Şablon dosyasından bir elektronik sayfa (XLS, XLSX ya da ODS dosyası) oluşturun. Bu elektronik sayfaları Docs içinde çevrimiçi olarak düzenleyebilirsiniz."
         },
         NAME_FIELD: "Ad:",
         EXTERNAL_FIELD: "Dosyalar, kuruluşum dışındaki kişilerle paylaşılabilir",
         EXTERNAL_DESC: "Dış erişim, dosyaların dış kullanıcılarla paylaşılmasını (kuruluşunuz ya da şirketinizden olmayan kişiler), klasörlerin dış kullanıcılarla paylaşılmasını ve toplulukların üyeler olarak dış kişilerle paylaşılmasını sağlar. Bir dosyayı karşıya yüklerken dış erişim ayarlamalısınız; daha sonra bu işlev açılamaz.",
         CREATE_BUTTON: "Oluştur",
         CANCEL: "İptal",
         PRE_FILL_NAMES: {
           OTT: "Başlıksız Belge",
           OTS: "Başlıksız Elektronik Sayfa",
           OTP: "Başlıksız Sunum",
           DOT: "Başlıksız Belge",
           XLT: "Başlıksız Elektronik Sayfa",
           POT: "Başlıksız Sunum",
           DOTX: "Başlıksız Belge",
           XLTX: "Başlıksız Elektronik Sayfa",
           POTX: "Başlıksız Sunum"
         },
         ERRORS: {
           NAME_REQUIRED: "Belge adı gerekli.",
           ILLEGAL_NAME:"Bu, geçersiz bir belge başlığı, lütfen başka bir tane belirtin.",
           WARN_LONG_NAME: "Belge adı çok uzun.",
           TRIM_NAME: "Belge adı kısaltılsın mı?",
           SESSION_TIMEOUT: "Oturumunuzun süresi doldu, lütfen oturum açın ve yeniden deneyin.",
           DUPLICATE_NAME: "Yinelenen bir dosya adı bulundu. Yeni bir ad girin.",
           SERVER_ERROR: "Connections sunucusu kullanılamıyor. Sunucu yöneticisine başvurun ve daha sonra yeniden deneyin."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Dosyayı karşıdan yükle",
         A11Y: "Bu düğme, dosyayı karşıdan yükler."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "PDF Olarak Karşıdan Yükle",
         TOOLTIP: "Bu dosyayı PDF olarak karşıdan yükleyin",
         A11Y: "Bu düğme, dosyayı PDF olarak karşıdan yükler.",
         SUCCESS: "Dosyayı PDF olarak başarıyla karşıdan yüklediniz.",
         ERROR: {
           DEFAULT: "Dosyayı PDF olarak karşıdan yükleyemediniz.  Lütfen daha sonra yeniden deneyin.",
           UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Dosyayı PDF olarak karşıdan yükleyebilmeniz için önce yeniden oturum açmanız gerekir.",
           NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığından dosya PDF olarak karşıdan yüklenemedi.",
           ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığından dosya PDF olarak karşıdan yüklenemedi."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Bu dosyanın karşıdan yüklenebilecek yayınlanmış bir sürümü yok.  Sürümler Docs düzenleyicisinden yayınlanabilir."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Dosya Karşıdan Yüklenemiyor",
           CANCEL: "Kapat",
           PROMPT: "Bu dosyanın karşıdan yüklenebilecek yayınlanmış bir sürümü yok.",
           PROMPT2: "Sürümler Docs düzenleyicisinden yayınlanabilir."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Dosya Karşıdan Yüklenemiyor",
           CANCEL: "Kapat",
           PROMPT: "Bu dosyanın karşıdan yüklenebilecek yayınlanmış bir sürümü yok.",
           PROMPT2: "Dosya sahibinden bu dosyanın bir sürümünü yayınlamasını isteyin."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Sürümü Karşıdan Yükle",
           OK: "Sürümü Karşıdan Yükle",
           PROMPT: {
             TODAY: "En son bugün (${time}) düzenlenen daha yeni bir taslak algılandı.",
             YESTERDAY: "En son dün (${time}) düzenlenen daha yeni bir taslak algılandı.",
             DAY: "En son ${date} tarihinde düzenlenen daha yeni bir taslak algılandı.",
             MONTH: "En son ${date} tarihinde düzenlenen daha yeni bir taslak algılandı.",
             YEAR: "En son ${date_long} tarihinde düzenlenen daha yeni bir taslak algılandı."
           },
           PROMPT2: {
             TODAY: "Bugün (${time}) yayınlanan sürümü karşıdan yüklemeye devam etmek istediğinizden emin misiniz?",
             YESTERDAY: "Dün (${time}) yayınlanan sürümü karşıdan yüklemeye devam etmek istediğinizden emin misiniz?",
             DAY: "${date} tarihinde yayınlanan sürümü karşıdan yüklemeye devam etmek istediğinizden emin misiniz?",
             MONTH: "${date} tarihinde yayınlanan sürümü karşıdan yüklemeye devam etmek istediğinizden emin misiniz?",
             YEAR: "${date_long} tarihinde yayınlanan sürümü karşıdan yüklemeye devam etmek istediğinizden emin misiniz?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Ayrıntılar panosunu göster",
         HIDE: "Ayrıntılar panosunu gizle",
         SHOW_A11Y: "Bu düğme, kenar panosunu açar ve kapatır. Kenar panosu şu anda kapalı.",
         HIDE_A11Y: "Bu düğme, kenar panosunu açar ve kapatır. Kenar panosu şu anda açık."
       },
       VIEW_DOC: {
         NAME: "Docs Viewer'da Aç",
         TOOLTIP: "Docs Viewer uygulamasında aç",
         A11Y: "Bu düğme, görüntülenmesi için dosyayı yeni bir tarayıcı penceresinde açar."
       },
       EDIT_DOC: {
         NAME: "Belgelerde Düzenle",
         TOOLTIP: "Dosyayı Docs içinde düzenleyin",
         A11Y: "Bu düğme, düzenlenmesi için dosyayı Belgeler uygulamasındaki yeni bir pencerede açar."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Masaüstünde Düzenle",
         DIALOG_TITLE: "Masaüstünde Düzenle",
         TOOLTIP: "Bu belgeyi düzenlemenizi sağlar",
         A11Y: "Bu düğme yerel olarak düzenleme için dosyayı açar.",
         PROMPT: "Bu özellik dosyayı yerel olarak düzenlemenizi sağlar.",
         IMPORTANT: "Önemli:",
         REMINDER: "Düzenlemeyi tamamladığınızda masaüstü dosya bağlaçlarını kullanarak bir taslak yayınlamalısınız. Dosya açılmazsa, masaüstü eklentilerini kurmanız gerekebilir.",
         SKIP_DIALOG: "Bu iletiyi tekrar gösterme!",
         OK: "Tamam",
         CANCEL: "İptal"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Onayla",
         DELETE_VERSION: "${version} sürümünü sil",
         DELETE_VERSION_AND_PRIOR: "${version} ve önceki tüm sürümleri sil",
         PROMPT: "${version} sürümünü silmek üzeresiniz. Devam etmek istiyor musunuz?",
         DELETE_PRIOR: "Ayrıca önceki tüm sürümleri de sil",
         ERROR: "Sürüm silinirken bir hata oluştu. Daha sonra yeniden deneyin.",
         TOOLTIP: "Bu sürümü sil",
         OK: "Tamam",
         CANCEL: "İptal"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Bağlantıları Al",
         LINK_FILE: "Dosyaya bağlantı:",
         LINK_PREVIEW: "Önizleme dosyasına bağlantı:",
         LINK_DOWNLOAD: "Karşıdan yükleme dosyasına bağlantı:",
         TOOLTIP: "Dosyaya bağlantı",
         OK: "Kapat"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Bu sürümü karşıdan yükle"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Onayla",
         PROMPT: "Bu dosyanın geçerli sürümünü, ${version} sürümüyle değiştirmek üzeresiniz. Devam etmek istiyor musunuz?",
         ERROR: "Sürüm geri yüklenirken bir hata oluştu. Daha sonra yeniden deneyin.",
         TOOLTIP: "Bu sürümü geri yükle",
         CHANGE_SUMMARY: "${version} sürümünden geri yüklendi",
         OK: "Tamam",
         CANCEL: "İptal"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Onayla",
         REMOVE_EVERYONE: "Kuruluşunuzun bu dosyaya erişimini kaldırmak istediğinizden emin misiniz? Erişim kaldırılırsa, dosya, kuruluş düzeyi erişimine izin veren klasör ve topluluklardan kaldırılır ve yalnızca dosyanın sahibi ve paylaşıldığı kişiler dosyayı görüntüleyip dosyayla çalışabilirler.",
         REMOVE_USER: "${user} ile paylaşımı durdurmak istediğinizden emin misiniz? Paylaşımı durdurursanız, ${user} bu dosyaya yalnızca klasörler aracılığıyla ya da kuruluşunuzdaki herkesle paylaşılıyorsa erişebilecek.",
         REMOVE_COMMUNITY: "Bu dosyayı ${communityName} topluluğundan kaldırmak istediğinizden emin misiniz?",
         REMOVE_FOLDER: "Bu dosyayı ${folderName} klasöründen kaldırmak istediğinizden emin misiniz?",
         REMOVE_EVERYONE_TOOLTIP: "Kuruluşunuzun erişimini kaldırın",
         REMOVE_USER_TOOLTIP: "${user} ile tüm paylaşımları kaldır",
         REMOVE_COMMUNITY_TOOLTIP: "${communityName} topluluğundan kaldır",
         REMOVE_FOLDER_TOOLTIP: "${folderName} klasöründen kaldır",
         OK: "Tamam",
         CANCEL: "İptal"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Bu yorumu düzenle"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Onayla",
         PROMPT: "Bu yorumu silmek istediğinizden emin misiniz?",
         ERROR: "Yorum silinirken bir hata oluştu. Daha sonra yeniden deneyin.",
         TOOLTIP: "Bu yorumu sil",
         OK: "Tamam",
         CANCEL: "İptal"
       },
       LIKE: {
         LIKE: "Dosyayı beğen",
         UNLIKE: "Dosyayı beğenmekten vazgeç",
         LIKE_A11Y: "Bu düğme, dosyayı beğenmenizi sağlar.",
         UNLIKE_A11Y: "Bu düğme, dosyayı beğenmekten vazgeçmenizi sağlar.",
         LIKED_SUCCESS: "Bu dosyayı beğendiniz",
         UNLIKE_SUCCESS: "Bu dosyayı beğenmekten vazgeçtiniz"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Açıklamayı düzenle",
         ERROR: {
           DEFAULT: "Açıklama kaydedilemedi. Daha sonra yeniden deneyin.",
           UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Açıklamayı güncelleştirebilmeniz için önce yeniden oturum açmanız gerekir.",
           NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığı için açıklama kaydedilemedi.",
           ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığı için açıklama kaydedilemedi."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Dosya adı kaydedilirken hata oluştu",
           CONFLICT: "Dosya adı zaten var"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Bu dosya izlenirken bir hata oluştu. Daha sonra yeniden deneyin.",
             UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Bu dosyayı izleyebilmek için yeniden oturum açmanız gerekir.",
             NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı izleyemezsiniz.",
             ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı izleyemezsiniz."
           },
           UNFOLLOW: {
             DEFAULT: "Bu dosyanın izlenmesi durdurulurken bir hata oluştu. Daha sonra yeniden deneyin.",
             UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Bu dosyayı izlemeyi durdurmak için yeniden oturum açmanız gerekir.",
             NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı izlemeyi durduramazsınız.",
             ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı izlemeyi durduramazsınız."
           }
         },
         FOLLOW_NAME: "İzle",
         FOLLOW_TOOLTIP: "Bu dosyayı izle",
         FOLLOW_A11Y: "Bu düğme, dosyayı izlemenizi sağlar.",
         FOLLOW_SUCCESS: "Artık bu dosyayı izliyorsunuz.",
         STOP_FOLLOWING_NAME: "İzlemeyi Durdur",
         STOP_FOLLOWING_TOOLTIP: "Bu dosyayı izlemeyi durdur",
         STOP_FOLLOWING_A11Y: "Bu düğme, dosyayı izlemeyi durdurmanızı sağlar.",
         STOP_FOLLOWING_SUCCESS: "Bu dosyayı izlemeyi durdurdunuz."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Eşitlemeye Ekle",
           TOOLTIP: "Bu dosyayı eşitlemeye ekle",
           A11Y: "Bu düğme, dosyayı eşitlemeye ekler.",
           SUCCESS: "Bu dosyayı eşitlemeye eklediniz.",
           ERROR: {
             DEFAULT: "Dosya eşitlemeye eklenirken bir hata oluştu. Daha sonra yeniden deneyin.",
             UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Bu dosyayı eşitlemeye ekleyebilmek için oturum açmanız gerekir.",
             NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı eşitlemeye ekleyemezsiniz.",
             ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı eşitlemeye ekleyemezsiniz."
           }
         },
         STOP_SYNC: {
           NAME: "Eşitlemeden Kaldır",
           TOOLTIP: "Bu dosyayı eşitlemeden kaldır",
           A11Y: "Bu düğme dosyayı eşitlemeden kaldırır.",
           SUCCESS: "Bu dosyayı eşitlemeden kaldırdınız.",
           ERROR: {
             DEFAULT: "Dosya eşitlemeden kaldırılırken bir hata oluştu. Daha sonra yeniden deneyin.",
             UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Bu dosyayı eşitlemeden kaldırabilmek için oturum açmanız gerekir.",
             NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı eşitlemeden kaldıramazsınız.",
             ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığı için bu dosyayı eşitlemeden kaldıramazsınız."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Ekle",
          FAVORITE_TOOLTIP: "Bu dosyayı sabitle",
          FAVORITE_A11Y: "Bu düğme dosyayı sabitler.",
          FAVORITE_SUCCESS: "Bu dosyayı sabitlediniz.",
          STOP_FAVORITEING_NAME: "Serbest Bırak",
          STOP_FAVORITEING_TOOLTIP: "Bu dosyayı serbest bırak",
          STOP_FAVORITEING_A11Y: "Bu düğme dosyayı serbest bırakır.",
          STOP_FAVORITEING_SUCCESS: "Bu dosyayı serbest bıraktınız."
       },
       TRASH: {
         NAME: "Çöp Kutusuna Taşı",
         DIALOG_TITLE: "Onayla",
         PROMPT: "Bu dosyayı çöp kutusuna taşımak istediğinizden emin misiniz? Bu dosya çöp kutusuna taşındığında, artık şu anda paylaşıldığı hiç kimse tarafından kullanılamaz.",
         ERROR: "Dosya silinirken bir hata oluştu. Daha sonra yeniden deneyin.",
         TOOLTIP: "Bu dosyayı sil",
         OK: "Tamam",
         CANCEL: "İptal",
         A11Y: "Bu düğme, dosyayı çöp kutusuna taşımanızı sağlar.",
         SUCCESS_MSG: "${file} çöp kutusuna taşındı."
       },
       REFRESH: {
         NAME: "Yenile",
         ERROR: "File Viewer yenilenirken hata oluştu. Daha sonra yeniden deneyin.",
         TOOLTIP: "File Viewer'ı yenile",
         INFO_MSG: "En yeni içeriği almak için yenileyin. ${link}",
         A11Y: "Bu düğme, dosyayı çöp kutusuna taşımanızı sağlar.",
         SUCCESS_MSG: "İçerik başarıyla yenilendi."
       },
       COPY_FILE: {
         NAME: "Topluluğa Kopyasını Ver",
         DIALOG_TITLE: "Onayla",
         ERROR: "Dosya kopyalanırken hata oluştu. Daha sonra yeniden deneyin.",
         TOOLTIP: "Bu dosyanın bir kopyasını topluluğa ver",
         OK: "Tamam",
         CANCEL: "İptal",
         A11Y: "Bu düğme, bu dosyanın bir kopyasını bir topluluğa vermenizi sağlayan bir iletişim kutusu açar.",
         SUCCESS_MSG: "${file} ${community} topluluğuna taşındı."
       },
       UPLOAD_VERSION: {
         NAME: "Yeni Sürümü Karşıya Yükle",
         NAME_SHORT: "Karşıya Yükle",
         CHANGE_SUMMARY: "İsteğe bağlı değişiklik özeti...",
         TOOLTIP: "Bu dosyanın yeni bir sürümünü karşıya yükle",
         A11Y: "Bu düğme, bu dosyanın yeni bir sürümünü karşıya yüklemenizi sağlayan bir iletişim kutusu açar."
       },
       LOG_IN: {
    	   NAME: "Oturum Aç",
    	   TOOLTIP: "Dosyaları karşıya yüklemek ve paylaşmak, yorum yapmak ve klasörler oluşturmak için oturum açın"
       },
       LOCK: {
          NAME: "Dosyayı Kilitle",
          TITLE: "Bu dosyayı kilitle",
          A11Y: "Bu dosyayı kilitle",
          SUCCESS: "Dosya kilitlendi."
       },
       UNLOCK: {
          NAME: "Dosya Kilidini Aç",
          TITLE: "Bu dosyanın kilidini aç",
          A11Y: "Bu dosyanın kilidini aç",
          SUCCESS: "Dosyanın kilidi açıldı."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Masaüstünde düzenle",
          TITLE: "Masaüstünde düzenle",
          A11Y: "Masaüstünde düzenle"
       },
       FLAG: {
         FILE: {
           NAME: "Uygunsuz olarak işaretle",
           TITLE: "Dosyayı İşaretle",
           A11Y: "Bu dosyayı uygunsuz olarak işaretle",
           PROMPT: "Bu dosyayı işaretlemek için bir neden sağla (isteğe bağlı):",
           OK: "İşaretle",
           CANCEL: "İptal",
           SUCCESS: "Dosya, işaretlendi ve inceleme için gönderildi.",
           ERROR: "Bu dosya işaretlenirken hata oluştu, lütfen daha sonra yeniden deneyin."
         },
         COMMENT: {
           NAME: "Uygunsuz olarak işaretle",
           TITLE: "Yorumu İşaretle",
           A11Y: "Bu yorumu uygunsuz olarak işaretle",
           PROMPT: "Bu yorumun işaretlenme nedenini girin (isteğe bağlı):",
           OK: "İşaretle",
           CANCEL: "İptal",
           SUCCESS: "Yorum, işaretlendi ve inceleme için gönderildi.",
           ERROR: "Bu içerik işaretlenirken hata oluştu, lütfen daha sonra yeniden deneyin."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Bu Dosya Hakkında",
       VIEW_FILE_DETAILS: "Dosya Ayrıntılarını Görüntüle",
       A11Y: "Bu bağlantı etkinleştirildiğinde, dosya görüntüleyici kapanır ve bu dosyaya ilişkin dosya ayrıntıları sayfasına yönlendirilirsiniz."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Bu dosya için önizleme kullanılamıyor."
      },
      IMAGE: {
       ZOOM_IN: "Yakınlaştır",
       ZOOM_OUT: "Uzaklaştır",
       RESET: "Sıfırla",
       ZOOM_IN_A11Y: "Bu düğme, resmi yakınlaştırır.",
       ZOOM_OUT_A11Y: "Bu düğme, resmi uzaklaştırır.",
       RESET_ZOOM_A11Y: "Bu düğme, yaklaştırma düzeyini sınıflar."
      },
      VIEWER: {
       LOADING: "Yükleniyor...",
       NO_PUBLISHED_VERSION: "Bu dosyanın görüntüleme için uygun yayınlanmış bir sürümü yok.",
       IFRAME_TITLE: "Bu dosyanın önizlemesi"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "En son ${user} tarafından bugün şu saatte güncelleştirildi: ${time}",
       YESTERDAY: "En son ${user} tarafından dün şu saatte güncelleştirildi: ${time}",
       DAY: "En son ${user} tarafından ${EEee} tarihinde ${time} saatinde güncelleştirildi.",
       MONTH: "En son ${user} tarafından şu tarih/saatte güncelleştirildi: ${date_long}",
       YEAR: "En son ${user} tarafından şu tarih/saatte güncelleştirildi: ${date_long}"
      },
      CREATED: {
       TODAY: "${user} tarafından bugün şu saatte oluşturuldu: ${time}",
       YESTERDAY: "${user} tarafından dün şu saatte oluşturuldu: ${time}",
       DAY: "${user} tarafından şu gün ve saatte oluşturuldu: ${EEee} ${time}",
       MONTH: "${user} tarafından şu tarihte oluşturuldu: ${date_long}",
       YEAR: "${user} tarafından şu tarihte oluşturuldu: ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - Bugün",
       YESTERDAY: "${time} - Dün",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Bugün",
       YESTERDAY: "Dün",
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
       TITLE: "Yorum metni alanı",
       SHADOW_TEXT: "Yorum ekle...",
       CANNOT_ACCESS_CONTENT: "Sözünü ettiğiniz aşağıdaki kişiler içeriğe erişemediklerinden yorumu görüntüleyemez:",
       ERROR: "Söz etmeye çalıştığınız kullanıcı doğrulanırken bir hata oluştu.",
       POST: "Gönder",
       SAVE: "Kaydet",
       CANCEL: "İptal",
       EXTERNAL_WARNING: "Yorumlar kuruluşunuz dışındaki kişiler tarafından görülebilir."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "İptal",
         A11Y: "Bu düğme, dosya adının düzenlenmesi işlemini iptal eder."
       },
       INVALID_CHARACTERS: "Geçersiz karakter",
       INVALID_CHARACTERS_REMOVED: "Geçersiz karakterler kaldırıldı"
     },
     COMMENT_WIDGET: {
       EDITED: "(Düzenlendi)",
       EDITED_DATE: {
         TODAY: "Düzenlenme zamanı: bugün, ${time}",
         YESTERDAY: "Düzenlenme zamanı: dün, ${time}",
         DAY: "Düzenlendiği gün ve saat: ${EEee} ${time}",
         MONTH: "Düzenlenme zamanı: ${date_long}",
         YEAR: "Düzenlenme zamanı: ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Kaydet",
       CANCEL: "İptal",
       USER: "Kullanıcı",
       COMMUNITY: "Topluluk",
       SHARE: "Paylaş",
       SHARE_ALT: "Bu kullanıcıyla paylaş",
       MEMBER_TYPE: "Üye Türü",
       PERSON_SHADOW: "Bulmak istediğiniz kişiyi yazın",
       COMMUNITY_SHADOW: "Bulmak istediğiniz topluluğu yazın",
       PERSON_FULL_SEARCH: "Kişi listede yok mu? Tam aramayı kullanın...",
       COMMUNITY_FULL_SEARCH: "Topluluk listede yok mu? Tam aramayı kullanın...",
       ADD_OPTIONAL_MESSAGE: "İsteğe Bağlı İleti Ekle",
       ROLE_LABEL: "Rol",
       ROLE_EDIT: "Düzenleyici",
       ROLE_VIEW: "Okuyucu"
     },
     FILE_STATE: {
       DOCS_FILE: "Bu bir Docs dosyasıdır. Tüm düzenlemelerin çevrimiçi olarak yapılması gerekir.",
       LOCKED_BY_YOU: {
         TODAY: "Şu saatte sizin tarafınızdan kilitlendi: ${time}",
         YESTERDAY: "Dün ${time} saatinde sizin tarafınızdan kilitlendi.",
         DAY: "${date} tarihinde sizin tarafınızdan kilitlendi.",
         MONTH: "${date} tarihinde sizin tarafınızdan kilitlendi.",
         YEAR: "${date_long} tarihinde sizin tarafınızdan kilitlendi."
       },
       LOCKED_BY_OTHER: {
         TODAY: "${time} saatinde ${user} adlı kullanıcı tarafından kilitlendi.",
         YESTERDAY: "Dün ${time} saatinde ${user} adlı kullanıcı tarafından kilitlendi.",
         DAY: "${date} tarihinde ${user} tarafından kilitlendi.",
         MONTH: "${date} tarihinde ${user} tarafından kilitlendi.",
         YEAR: "${date_long} tarihinde ${user} tarafından kilitlendi."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Yorum çok uzun.",
         TRIM: "Yorumunuz kısaltılsın mı?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Açıklama çok uzun.",
         TRIM: "Açıklama kısaltılsın mı?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "İleti çok uzun.",
         TRIM: "İleti kısaltılsın mı?"
       },
       TAG: {
         WARN_TOO_LONG: "Etiket çok uzun.",
         TRIM: "Etiket kısaltılsın mı?"
       },
       TAGS: {
         WARN_TOO_LONG: "Bir ya da daha fazla etiket çok uzun.",
         TRIM: "Etiketler kısaltılsın mı?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Dosya adı çok uzun"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Docs yetkisini satın aldıysanız bu dosya yalnızca çevrimiçi düzenleme için kullanılabilir.",
       CURRENT_EDITORS: "Bu dosya, şu anda ${users} adlı kullanıcı tarafından web üzerinde düzenlenmektedir.",
       UNPUBLISHED_CHANGES: "Bu taslakta bir sürüm olarak yayınlanmayan düzenlemeler var.",
       PUBLISH_A_VERSION: "Bir sürüm yayınla",
       PUBLISH_SUCCESS: "Bu dosyanın bir sürümünü başarıyla yayınladınız",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Erişim reddedildiğinden sürüm yayınlanamadı",
         NOT_FOUND: "Belge bulunamadığından sürüm yayınlanamadı.",
         CANNOT_REACH_REPOSITORY: "Docs sunucusu dosya havuzuna bağlanamadığından sürüm yayınlamadı.",
         QUOTA_VIOLATION: "Alan kısıtlamaları nedeniyle sürüm yayınlanamadı. Bu sürümü yayınlamak için yeterli alanı sağlamak üzere diğer dosyaları kaldırın.",
         CONVERSION_UNAVAILABLE: "Belgeler uygulamasının dönüştürme hizmeti kullanılamadığından sürüm yayınlanamadı. Daha sonra yeniden deneyin.",
         TOO_LARGE: "Belge çok büyük olduğundan sürüm yayınlanamadı.",
         CONVERSION_TIMEOUT: "Docs dönüştürme hizmetinin belgeyi dönüştürmesi çok uzun sürdüğünden sürüm yayınlanamadı. Daha sonra yeniden deneyin.",
         SERVER_BUSY: "Docs sunucusu meşgul olduğundan sürüm yayınlanamadı. Daha sonra yeniden deneyin.",
         DEFAULT: "Docs hizmeti kullanılamadığından sürüm yayınlanamadı. Daha sonra yeniden deneyin."
       }
     },
     COMMENTS: {
       EMPTY: "Yorum yok.",
       MODERATED: "Yorum, inceleme için gönderildi ve onaylandığında kullanılabilir duruma gelecek.",
       ERROR: {
         SAVE: {
           DEFAULT: "Yorumunuz kaydedilemedi. Daha sonra yeniden deneyin.",
           UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Yorumunuzu kaydedebilmeniz için önce yeniden oturum açmanız gerekir.",
           NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığı için yorumunuz kaydedilemedi.",
           ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığı için yorumunuz kaydedilemedi."
         },
         DELETE: {
           DEFAULT: "Yorumunuz silinemedi. Daha sonra yeniden deneyin.",
           UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Yorumunuzu silebilmeniz için önce yeniden oturum açmanız gerekir.",
           NOT_FOUND: "Dosya silindiği ya da artık sizinle paylaşılmadığı için yorumunuz silinemedi.",
           ACCESS_DENIED: "Dosya silindiği ya da artık sizinle paylaşılmadığı için yorumunuz silinemedi."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Kaydet",
       EDIT_TAGS: "Etiketleri düzenle",
       ERROR: {
         SAVE: {
           DEFAULT: "Etiket oluşturulamadı. Daha sonra yeniden deneyin."
         },
         DELETE: {
           DEFAULT: "Etiket silinemedi. Daha sonra yeniden deneyin."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Ek Bilgi...",
       READ_LESS: "Özet Bilgi..."
     },
     SHARE: {
	     EVERYONE: "Kuruluşumdaki herkes",
	     ADD_TOOLTIP: "Kaydet",
	     ROLES: {
	       OWNER: "Sahip",
	       EDIT: "Düzenleyiciler",
	       VIEW: "Okuyucular",
	       FOLDER: "Klasörlerle Paylaşılan"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Sahip"
	       },
	       EDIT: {
	         ROLE: "Düzenle",
           ADD: "Düzenleyici Ekle"
	       },
	       VIEW: {
	         ROLE: "Okuyucu",
           ADD: "Okuyucu Ekle"
	       },
	       FOLDER: {
           ADD: "Klasör Ekle",
           COMMUNITY_ADD: "Klasöre Ekle",
           MOVE: "Klasöre Taşı"
	       },
	       MULTI: {
	         ADD: "Kişiler ya da Topluluklar Ekle",
	         ADD_PEOPLE: "Kişi Ekle"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Kuruluşumdaki herkes",
	        LONG: {
	           GENERIC: "Kuruluşunuzdaki herkes.",
	           ORG: "${org} adlı kuruluştaki herkes."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Bu dosya zaten ${user} adlı kullanıcıyla paylaşılıyor.",
	       ERROR: "Şu anda ${user} adlı kullanıcıyla paylaşılamıyor.",
	       SELF: "Kendinizle paylaşamazsınız."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user}, daha yüksek bir paylaşım rolüne yükseltildi."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "${user} ile başarıyla paylaşıldı"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "İsteğe bağlı ileti..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Dış Kullanıcıyı Yetkilendir",
            ACTION: "Dış kullanıcıyı yetkilendir...",
            TOOLTIP: "Dış kullanıcıyı yetkilendirin",
            DIALOG_TITLE: "İçerik Paylaşılmadı",
            PROMPT: {
              NO_ACCOUNT: "Şu kullanıcının bir hesabı yok ve bu kişiyle içerik paylaşılmadı.",
              INVITE: "İçeriği paylaşmak için bu kullanıcıyı konuk olarak davet edin."
            },
            SUBMIT: "Davete devam et",
            CANCEL: "İptal",
            ERROR: "Hesap yetkilendirilirken hata oluştu. Daha sonra yeniden deneyin.",
            SUCCESS: "Kullanıcı hesabı başarıyla yetkilendirildi."
	       },
	       PLURAL: {
	         NAME: "Dış Kullanıcıları Yetkilendir",
	         ACTION: "Dış kullanıcıları yetkilendir...",
	         TOOLTIP: "Dış kullanıcıları yetkilendirin",
	         DIALOG_TITLE: "İçerik Paylaşılmadı",
	         PROMPT: {
	           NO_ACCOUNT: "Şu kullanıcıların bir hesabı yok ve bu kişilerle içerik paylaşılmadı.",
	           INVITE: "İçeriği paylaşmak için bu kullanıcıları konuk olarak davet edin."
	         },
	         SUBMIT: "Davetlere devam et",
	         CANCEL: "İptal",
	         ERROR: "Hesaplar yetkilendirilirken hata oluştu. Daha sonra yeniden deneyin.",
	         SUCCESS: "Kullanıcı hesapları başarıyla yetkilendirildi."
	       },
	       ABSTRACT: {
	         NAME: "Dış Kullanıcıları Yetkilendir",
            ACTION: "Dış kullanıcıları yetkilendir...",
            TOOLTIP: "Dış kullanıcıları yetkilendirin",
            DIALOG_TITLE: "İçerik Paylaşılmadı",
            PROMPT: {
              NO_ACCOUNT: "Bazı kullanıcıların hesabı yok ve bu kişilerle içerik paylaşılmadı.",
              INVITE: "İçeriği paylaşmak için bu kullanıcıları konuk olarak davet edin."
            },
            SUBMIT: "Davetlere devam et",
            CANCEL: "İptal",
            ERROR: "Hesaplar yetkilendirilirken hata oluştu. Daha sonra yeniden deneyin.",
            SUCCESS: "Kullanıcı hesapları başarıyla yetkilendirildi."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Paylaşım Seçenekleri",
         PROPAGATION: "Başkalarının bu dosyayı paylaşmasına izin ver",
         EVERYONE: "Herkes bu dosyayı paylaşabilir.",
         OWNER_ONLY: "Bu dosyayı yalnızca sahibi paylaşabilir.",
         STOP_SHARE: "Paylaşımı Durdur",
         MAKE_INTERNAL: "Dışarıdan Paylaşımı Durdur",
         MAKE_INTERNAL_SUCCESS: "Bu dosya artık kuruluşunuz dışındaki kişilerle paylaşılamıyor.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Dahili Yapılsın Mı?",
           PROMPT: "Bu dosyanın dahili yapılması, bu dosyayı artık kuruluşunuz dışındakilerle paylaşamayacağınız anlamına gelir. ${br}${br}" +
             "Kuruluş dışındaki kişilerle, topluluklarla ya da klasörlerle paylaşımlar kaldırılacak.${br}${br}Bir dosyanın dahili olarak ayarlanması kalıcı bir değişikliktir ve bu işlem geri alınamaz."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Dosyanın Paylaşımını Durdur",
           PROMPT: "Bu dosyanın paylaşımını durdurmak istediğinizden emin misiniz?",
           QUESTION_PUBLIC: "Bu dosya artık kuruluşunuzdaki herkes tarafından görülemeyecek ya da kişilerle, klasörlerle ya da topluluklarla paylaşılmayacak. Bu işlem geri alınamaz.",
           QUESTION_PUBLIC_E: "Bu dosya artık kuruluşunuzdaki herkes tarafından görülemeyecek ya da kişilerle veya klasörlerle paylaşılmayacak. Bu işlem geri alınamaz.",
           QUESTION: "Dosya artık kişilerle ya da topluluklarla paylaşılmayacak ve özel klasörleriniz dışında tüm klasörlerden kaldırılacak. Bu işlem geri alınamaz.",
           QUESTION_E: "Bu dosya artık kişilerle paylaşılmayacak ve özel klasörleriniz dışında tüm klasörlerden kaldırılacak. Bu işlem geri alınamaz."
         },
         MAKE_PRIVATE_SUCCESS: "Bu dosya artık özel.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Dosya paylaşımı durdurulamadı. Daha sonra yeniden deneyin."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Paylaşımlarım"
	   },
	   STREAM: {
	     LOADING: "Yükleniyor...",
	     LOAD_MORE: "Daha fazla yükle..."
	   },
	   ENTRY: {
	     REMOVE: "Kaldır",
	     RESTORE: "Geri Yükle",
	     EDIT: "Düzenle",
	     DELETE: "Sil",
	     OK: "Tamam",
	     CANCEL: "İptal",
	     USER_PICTURE: "${0} Adlı Kişinin Resmi",
	     FLAG: "Uygunsuz Olarak İşaretle"
	   },
	   PANEL: {
	     LOAD_ERROR: "Bu dosyanın meta verilerine erişilirken hata oluştu.",
	     ABOUT: {
	       TITLE: "Hakkında",
	       EXPAND_BUTTON: "Daha fazla bilgi görmek için bu düğmeyi genişletin",
	       CURRENT_VERSION_HEADER: "Geçerli Sürüm ${versionNumber}",
	       FILE_SIZE_HEADER: "Dosya Boyutu",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - Geçerli Sürüm",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - Tüm Sürümler",
	       DOCS_DRAFT_UPDATED_HEADER: "Taslak Düzenlendi",
	       DOCS_DRAFT_CREATED_HEADER: "Taslak Oluşturuldu",
	       DOCS_UPDATED_HEADER: "Yayınlandı",
	       DOCS_CREATED_HEADER: "Oluşturuldu",
	       UPDATED_HEADER: "Güncelleştirildiği Tarih",
	       CREATED_HEADER: "Oluşturuldu",
	       LIKES_HEADER: "Beğeniler",
	       LIKES_EXPAND_ICON: "Dosyayı beğenenleri görmek için bu simgeyi genişletin",
	       DOWNLOADS_HEADER: "Karşıdan yüklemeler",
	       DOWNLOADS_HEADER_MORE: "Karşıdan yüklemeler (${0})",
	       DOWNLOADS_EXPAND_ICON: "Dosyayı karşıdan yükleyenleri görmek için bu simgeyi genişletin",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "Anonim ${downloads} - ${anonymousDownloads}",
	       DOWNLOADS_LATEST_VERSION: "Bu dosyanın en son sürümüne sahipsiniz",
	       DOWNLOADS_LAST_VERSION: "Son olarak bu dosyanın ${0} sürümünü karşıdan yüklediniz",
	       TAGS_HEADER: "Etiketler",
	       DESCRIPTION_HEADER: "Açıklama",
	       DESCRIPTION_READ_MORE: "Ek Bilgi...",
	       LINKS_HEADER: "Bağlantılar",
	       SECURITY: "Güvenlik",
	       FILE_ENCRYPTED: "Dosya içeriği şifreli. Şifrelenmiş dosya içeriğinde arama yapılamaz. Dosya içeriği görüntülenemiyor ve HCL Docs uygulamasıyla düzenlenemiyor.",
	       GET_LINKS: "Bağlantıları Al...",
	       ADD_DESCRIPTION: "Açıklama ekle",
	       NO_DESCRIPTION: "Açıklama yok",
	       ADD_TAGS: "Etiket ekle",
	       NO_TAGS: "Etiket yok"
	     },
	     COMMENTS: {
	       TITLE: "Yorumlar",
	       TITLE_WITH_COUNT: "Yorumlar (${0})",
	       VERSION: "Sürüm ${0}",
	       FEED_LINK: "Bu yorumlar için özet akışı",
	       FEED_TITLE: "Özet akışı okuyucunuz aracılığıyla bu yorumlardaki değişiklikleri izleyin"
	     },
	     SHARING: {
	       TITLE: "Paylaşım",
	       TITLE_WITH_COUNT: "Paylaşılan (${0})",
	       SHARED_WITH_FOLDERS: "Klasörlerle Paylaşılan - ${count}",
	       SEE_WHO_HAS_SHARED: "Kimin paylaştığını görüntüle",
           COMMUNITY_FILE: "Bir topluluğa ait dosyalar, diğer topluluklarla ya da kişilerle paylaşılamaz.",
           SHARED_WITH_COMMUNITY: "'${0}' topluluğunun üyeleriyle paylaşıldı",
           LOGIN: "Oturum Aç",
           NO_SHARE: "Bu dosya henüz bir klasöre eklenmedi.",
           ONE_SHARE: "Bu dosya, erişiminizin olmadığı 1 klasörde ya da toplulukta yer alıyor.",
           MULTIPLE_SHARE: "Bu dosya, erişiminizin olmadığı ${fileNumber} klasörde ya da toplulukta yer alıyor."
	     },
	     VERSIONS: {
	       TITLE: "Sürümler",
	       TITLE_WITH_COUNT: "Sürümler (${0})",
	       FEED_LINK: "Bu sürümlere ilişkin özet akışı",
	       FEED_TITLE: "Özet akışı okuyucunuz aracılığıyla bu dosyadaki değişiklikleri izleyin"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Eylem Onayı",
       DIALOG_TITLE: "Onayla",
       PROMPT: "Bu eylemi gerçekleştirmek için istediğinizden emin misiniz?",
       ERROR: "Eylem gerçekleştirilirken bir hata oluştu. Daha sonra yeniden deneyin.",
       TOOLTIP: "Eylemi gerçekleştir",
       OK: "Tamam",
       CANCEL: "İptal",
       A11Y: "Bu düğme, geçerli eylemi gerçekleştirmenizi sağlar."
     },
     THUMBNAIL: {
       TITLE: "Küçük Resim",
       CHANGE_LINK: "Küçük Resmi Değiştir...",
       ERROR: "Küçük resim kaydedilemedi. Daha sonra yeniden deneyin.",
       EXT_ERROR: "Aşağıdaki desteklenen uzantılara sahip bir dosya seçin: ${0}",
       SUCCESS: "Küçük resim değiştirildi",
       UPLOAD: "Kaydet",
       CANCEL: "İptal"
     },
     UPLOAD_VERSION: {
       LINK: "Yeni Sürümü Karşıya Yükle...",
       CHANGE_SUMMARY: "İsteğe bağlı değişiklik özeti...",
       ERROR: "Yeni sürüm kaydedilemedi. Daha sonra yeniden deneyin.",
       SUCCESS: "Yeni sürüm kaydedildi",
       UPLOAD: "Karşıya Yükle",
       UPLOAD_AND_CHANGE_EXTENSION: "Uzantıyı Karşıya Yükle ve Değiştir",
       CANCEL: "İptal"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Dosyaya erişilirken bir hata oluştu. Daha sonra yeniden deneyin.",
       UNAUTHENTICATED: "Oturumunuz zaman aşımına uğradı. Dosyayı görüntüleyebilmeniz için önce yeniden oturum açmanız gerekir.",
       NOT_FOUND: "İstediğiniz dosya silindi ya da taşındı. Bu bağlantıyı size birisi gönderdiyse, doğru olup olmadığını denetleyin.",
       ACCESS_DENIED: "Bu dosyayı görüntülemek için izniniz yok. Dosya sizinle paylaşılmıyor.",
       ACCESS_DENIED_ANON: "Bu dosyayı görüntülemek için izniniz yok. Bu dosya sizinse ya da sizinle paylaşılmışsa, öncelikle oturum açmanız gerekir."
     },
     LOAD_ERROR: {
       DEFAULT: "Üzgünüz. Bağlantıya erişilirken bir hata oluştu.",
       ACCESS_DENIED: "Bu dosya görüntüleme izni istemek için dosya sahibiyle iletişim kurun."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Dosya",
       LOAD_ERROR: "Dosyaya erişilirken hata oluştu"
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
