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
         "legal" : "Licensed Materials - Property of IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, IBM logosu, ibm.com ve Lotus, IBM Corporation'ın ABD ve/veya diğer ülkelerdeki ticari markalarıdır. ABD Kamu Kullanıcıları İçin Sınırlı Haklar - Kullanımı, çoğaltılması ya da açıklanması, IBM Corp. ile yapılan GSA ADP Schedule Contract adlı sözleşmeyle sınırlandırılmıştır.",
         "error" : "Bir hata oluştu. Lütfen daha sonra yeniden deneyin.",
         "granted" : {
            "title" : "Erişim Verildi",
            "blurb" : "HCL Connections hesabınızla etkileşimli çalışma için ${0} erişimi verdiniz."
         },
         "denied" : {
            "title" : "Erişim Reddedildi",
            "blurb" : "HCL Connections hesabınızla etkileşimli çalışma için ${0} erişimini reddettiniz."
         },
         "blurb" : "{0} hizmeti, HCL Connections içindeki tüm içeriğiniz dahil, Connections bilgilerinize erişmek istiyor.",
         "revoke" : {
            "description" : "Connections Ayarları > {0} seçeneklerini kullanarak istediğiniz zaman erişimi iptal edebilirsiniz. Connections belirli aralıklarla sizden yeniden yetki vermenizi isteyebilir.",
            "link" : "Uygulama Erişimi"
         },
         "authorize" : {
            "label" : "Erişim Ver"
         },
         "windowtitle" : "HCL Connections'a erişime izin ver",
         "title" : "Erişim İsteği",
         "deny" : {
            "label" : "Erişimi Reddet"
         },
         "action_tooltip" : "${0} uygulamasına erişim verin",
         "action" : "Erişim Ver",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "${0} uygulamasına yeniden yönlendiriliyorsunuz."
      },
      "javascript" : {
         "disabled" : {
            "title" : "JavaScript'i Aç",
            "p2" : "Devam etmek için sayfayı yenileyin.",
            "p1" : "Web tarayıcınızda JavaScript devre dışı bırakılmıştır.  HCL Connections olanağının çalışabilmesi için JavaScript gereklidir.  JavaScript'i açtıktan sonra, lütfen sayfayı yenileyin."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "İsteğinizi işleyemiyoruz",
            "description" : "HCL Connections hesabınıza erişim isteğinde bulunan uygulama tarafından yayınlanan istek eksikti.  Sizi buraya gönderen site veya uygulamaya geri dönmek için tarayıcının geri düğmesini tıklatın ve yeniden deneyin.  Sorun devam ederse, sorunu yöneticinize bildirin."
         },
         "invalid_token" : {
            "title" : "İsteğinizi işleyemiyoruz",
            "description" : "HCL Connections hesabınıza erişim isteğinde bulunan uygulama tarafından yayınlanan istek geçersizdi.  Sizi buraya gönderen site veya uygulamaya geri dönmek için tarayıcının geri düğmesini tıklatın ve yeniden deneyin.  Sorun devam ederse, sorunu yöneticinize bildirin."
         },
         "default_action" : {
            "label" : "Giriş Sayfasına Dön"
         }
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
      "loading" : "Yükleniyor...",
      "deny" : {
         "error" : "Bir hata oluştu. Lütfen daha sonra yeniden deneyin.",
         "action_tooltip" : "${0} uygulamasına erişimi reddet",
         "action" : "Erişimi Reddet",
         "success" : "Erişim reddedildi."
      },
      "grid" : {
         "applications" : {
            "summary" : "HCL Connections bilgilerinize erişime sahip uygulamaların listesi.",
            "loading" : "Yükleniyor...",
            "empty" : "Uygulama bulunamadı.",
            "reverse_sort" : "Ters Sırala"
         }
      },
      "applications" : {
         "windowtitle" : "Uygulama Erişimi",
         "details" : "HCL Connections bilgilerinize erişime sahip uygulamalar.",
         "error" : "Liste bir hata nedeniyle alınamadı.",
         "titlebar" : {
            "tab2" : "Uygulama Erişimi",
            "tab1" : "E-posta Bildirimleri",
            "tab3" : "Küreselleşme"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Bu düğmeye basıldığında, güncel  sayfa yeni içerikle yenilenir.  Bu menüye geri dönmek için şuraya geri gidin:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections ayarları"
         },
         "heading" : "Uygulama Erişimi"
      },
      "sorts" : {
         "application_name" : "Uygulama Adı",
         "authorization_date" : "Yetkilendirme Tarihi",
         "expiration_date" : "Son Kullanma Tarihi",
         "action" : "Eylem"
      },
      "revoke_token" : {
         "error" : "Bir hata oluştu. Lütfen daha sonra yeniden deneyin.",
         "dialog_title" : "Erişimi İptal Et",
         "action_tooltip" : "${0} uygulamasına erişimi reddet",
         "action" : "İptal Et",
         "ok" : "Tamam",
         "cancel" : "İptal",
         "confirm" : "Bu uygulamanın HCL Connections bilgilerinize erişimi iptal edilsin mi? ",
         "success" : "Uygulama kaldırıldı."
      }
});
