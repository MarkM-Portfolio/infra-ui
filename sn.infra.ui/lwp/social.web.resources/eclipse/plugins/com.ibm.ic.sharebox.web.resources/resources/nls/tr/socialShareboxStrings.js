define(
	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2008, 2012                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	// NLS_CHARSET=UTF-8
	({
	   submit: {label: "Kaydet", a11y: "Kaydet", tooltip: "Kaydet"}, 
	   cancel: {label: "İptal", a11y: "İptal", tooltip: "İptal"},
	   close: {label: "Kapat", a11y: "Kapat", tooltip: "Kapat"},
	   title: {global: "Paylaşımda Bulunun", community: "Bir Toplulukla Paylaş"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Bu senaryo için paylaşım eylemleri kullanılamaz.",
		   ACTIONS_LOAD_ERROR: "Paylaşım eylemleri yüklenirken bir hata oluştu.",
		   CONTENT_LOAD_ERROR: "İçerik yüklenemiyor. Daha sonra yeniden deneyin ya da yöneticinize başvurun."},
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
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Paylaş",
		   UPLOAD: "Karşıya Yükle",
		   CANCEL: "İptal",
		   VISIBILITY_WARNING: "Bu topluluk ile paylaşılan dosyalar genel olacak.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "${0} öğesini ${1} ile başarıyla paylaştınız.",
			   SUCCESS_PLURAL: "${0} dosyayı ${1} ile başarıyla paylaştınız.",
			   ERROR: "Dosya paylaşılamadı.  Lütfen daha sonra yeniden deneyin.",
			   ERROR_X: "Dosyalar paylaşılamadı.  Lütfen daha sonra yeniden deneyin.",
	           MAX_SHARES_ERROR: "Paylaşım sayısı üst sınırı aşıldı.",
	           EXTERNAL_SHARES_ERROR: "Dosya yalnızca kuruluşunuzun içinde paylaşılabilir.",
	           EXTERNAL_SHARES_ERROR_X: "Dosyalar yalnızca kuruluşunuzun içinde paylaşılabilir.",
	           NOT_LOGGED_IN_ERROR: "Oturum açmadığınız için dosya paylaşılmadı.  Dosyayı paylaşmak için 'Paylaş' düğmesini tıklatın.",
	           NOT_LOGGED_IN_ERROR_X: "Oturum açmadığınız için dosyalar paylaşılmadı.  Dosyaları paylaşmak için 'Paylaş' düğmesini tıklatın.",
	           TIMEOUT_ERROR: "Sunucuyla iletişim kurulamadığı için dosya paylaşılmadı.  Yeniden denemek için 'Paylaş' düğmesini tıklatın.",
	           TIMEOUT_ERROR_X: "Sunucuyla iletişim kurulamadığı için dosyalar paylaşılamadı.  Yeniden denemek için 'Paylaş' düğmesini tıklatın.",
	           CANCEL_ERROR: "İstek iptal edildiği için dosya paylaşılmadı.  Yeniden denemek için 'Paylaş' düğmesini tıklatın.",
	           CANCEL_ERROR_X: "İstek iptal edildiği için dosyalar paylaşılamadı.  Yeniden denemek için 'Paylaş' düğmesini tıklatın.",
	           NOT_FOUND_ERROR: "Dosya silindi ya da artık sizin tarafınızdan görülemiyor ve paylaşılamaz.",
	           NOT_FOUND_ERROR_X: "Dosyalar silindi ya da artık sizin tarafınızdan görülemiyor ve paylaşılamıyor.",
	           ACCESS_DENIED_ERROR: "Artık bu dosyayı paylaşmak için izniniz yok.",
	           ACCESS_DENIED_ERROR_X: "Artık bu dosyaları paylaşma izniniz yok.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Sınırlanan bir dosya genel yapılamaz.",
	        	   ERROR_SHARE_X: "Sınırlanan dosyalar genel yapılamayabilir."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "${0} dosyasını ${1} topluluğuna başarıyla yüklediniz.",
			   SUCCESS_PLURAL: "${0} dosyayı ${1} topluluğuna başarıyla yüklediniz.",
			   ERROR: "Dosya karşıya yüklenemedi.  Lütfen daha sonra yeniden deneyin.",
			   ERROR_X: "${0} karşıya yüklenemedi.  Lütfen daha sonra yeniden deneyin.",
			   INFO_SUCCESS_PRE_MODERATION: "${0} dosyası, inceleme için gönderildi ve onaylandığında, kullanılabilir duruma gelecek.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} dosya, inceleme için gönderildi ve onaylandığında kullanılabilir duruma gelecek."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Dosyaları karşıya yükleyin ve paylaşın"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "İptal",
		   CONFIRM_OTHER_TAB: "Geçerli eyleme devam ederseniz, diğer sekmelere girdiğiniz bilgiler kaybedilecek.  Devam etmek için Tamam ya da geri dönmek için İptal düğmesini tıklatın.",
		   CONFIRM_CURRENT_TAB: "Geçerli eyleme devam ederseniz, ${0} sekmesinde girdiğiniz bilgiler kaybedilecek.  Devam etmek için Tamam ya da geri dönmek için İptal düğmesini tıklatın.",
		   DIALOG_TITLE: "Onayla",
		   OK: "Tamam"
	   }
	})
	
	
);