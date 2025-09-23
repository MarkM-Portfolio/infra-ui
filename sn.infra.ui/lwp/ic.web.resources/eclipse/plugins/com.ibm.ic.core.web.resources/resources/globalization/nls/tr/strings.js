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
         "windowtitle" : "Küreselleşme",
         "unavailable" : "Küreselleşme ayarları kullanılamıyor",
         "details" : "Tercih ettiğiniz dili, takvimi ve kullanıcı tarafından oluşturulan metin akışının yönünü belirleyin.",
         "error" : "Bir hata nedeniyle küreselleşme ayarları alınamadı.",
         "titlebar" : {
            "tab2" : "Uygulama Erişimi",
            "tab1" : "E-posta Bildirimleri",
            "tab3" : "Küreselleşme"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Bu düğmeye basıldığında, güncel  sayfa yeni içerikle yenilenir.  Bu menüye geri dönmek için şuraya geri gidin:"
         },
         "details_nolanguage" : "Tercih ettiğiniz takvimi ve kullanıcı tarafından oluşturulan metin akışının yönünü belirleyin.",
         "a11y" : {
            "titlebar_label" : "HCL Connections ayarları",
            "body_label" : "Küreselleşme ayarları"
         },
         "heading" : "Küreselleşme Ayarları"
      },
      "restore_defaults" : {
         "error" : "Bir hata oluştu. Lütfen daha sonra yeniden deneyin.",
         "action_tooltip" : "Küreselleşme ayarlarını varsayılan orijinal değerlerine geri yükle",
         "action" : "Varsayılanları Geri Yükle",
         "success" : "Küreselleşme ayarlarınız özgün varsayılan değerlerine geri yüklendi."
      },
      "help" : {
         "help" : "Yardım",
         "close" : "Kapat"
      },
      "save" : {
         "error" : "Bir hata oluştu. Lütfen daha sonra yeniden deneyin.",
         "action_tooltip" : "Küreselleşme ayarlarını kaydet",
         "action" : "Kaydet",
         "success" : "Küreselleşme ayarlarınız güncelleştirildi."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Hata:",
            "icon_alt" : "Hata"
         },
         "success" : {
            "a11y_label" : "Başarılı:",
            "icon_alt" : "Başarılı"
         },
         "warning" : {
            "a11y_label" : "Uyarı:",
            "icon_alt" : "Uyarı"
         },
         "info" : {
            "a11y_label" : "Bilgi:",
            "icon_alt" : "Bilgi"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Varsayılanları Geri Yükle"
         },
         "bidi" : {
            "help" : "Çift yönlü metin yardımını etkinleştir",
            "label" : "Çift yönlü metni etkinleştir",
            "tooltip" : "Dosya yolları gibi, birleştirilmiş ve yapılandırılmış metinlerin dile özgü görüntülenmesini sağlar.  Ayrıca, dil seçiminizden bağımsız bir metin yönü belirlemenize de olanak verir."
         },
         "error" : "Hata",
         "save" : {
            "label" : "Kaydet"
         },
         "direction" : {
            "label" : "Kullanıcı tarafından oluşturulan metin yönü:",
            "tooltip" : "İçerik adları ve gezinme ipuçları gibi kullanıcı girdilerinden türetilen metin yönü.  Varsayılan olarak bu yön, dil seçiminizle (genellikle soldan sağa doğru) belirlenir.  Bağlamsal seçeneğinin belirlenmesi, sistemin yönü karakter analizine (karışık yönlü metinleri destekler) göre belirlemesini sağlar.",
            "options" : {
               "contextual" : "Bağlamsal (karakter temeline göre)",
               "rtl" : "Sağdan sola doğru",
               "ltr" : "Soldan sağa doğru",
               "default_ltr" : "Varsayılan dili kullan (soldan sağa doğru)",
               "default_rtl" : "Varsayılan dili kullan (sağdan sola doğru)"
            }
         },
         "cancel" : {
            "label" : "İptal"
         },
         "language" : {
            "selected" : "${0} (güncel)",
            "label" : "Dil:",
            "tooltip" : "Uygulama metninin görüntüleneceği dili belirtin.  Bu ayar, kullanıcı tarafından oluşturulan metni etkilemeyecektir."
         },
         "calendar" : {
            "label" : "Takvim:",
            "options" : {
               "hebrew" : "İbrani",
               "gregorian" : "Gregoryen",
               "hijri" : "Hicri"
            }
         }
      }
});
