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
	   submit: {label: "Salvare", a11y: "Salvare", tooltip: "Salvare"}, 
	   cancel: {label: "Anulare", a11y: "Anulare", tooltip: "Anulare"},
	   close: {label: "Închidere", a11y: "Închidere", tooltip: "Închidere"},
	   title: {global: "Partajaţi ceva", community: "Partajaţi cu o comunitate"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Nu sunt disponibile acţiuni de partajare pentru acest scenariu.",
		   ACTIONS_LOAD_ERROR: "A apărut o eroare la încărcarea acţiunilor de partajare.",
		   CONTENT_LOAD_ERROR: "Conţinutul nu poate fi încărcat. Încercaţi din nou mai târziu sau contactaţi administratorul de sistem."},
	   MESSAGE: {
		      SUCCESS: "Confirmare",
		      ERROR: "Eroare",
		      ERROR_ALT_TEXT: "Eroare:",
		      INFO: "Informaţii",
		      WARNING: "Avertisment",
		      DISMISS: "Ascundeţi acest mesaj",
		      MORE_DETAILS: "Detalii suplimentare",
		      HIDE_DETAILS: "Ascundere detalii"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Partajare",
		   UPLOAD: "Încărcare",
		   CANCEL: "Anulare",
		   VISIBILITY_WARNING: "Fişierele partajate cu această comunitate vor deveni publice.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Aţi partajat cu succes ${0} cu ${1}.",
			   SUCCESS_PLURAL: "Aţi partajat cu succes ${0} fişiere cu ${1}.",
			   ERROR: "Fişierul nu a putut fi partajat.  Vă rugăm să încercaţi din nou mai târziu.",
			   ERROR_X: "Fişierele nu au putut fi partajate.  Vă rugăm să încercaţi din nou mai târziu.",
	           MAX_SHARES_ERROR: "Numărul maxim de partajări a fost depăşit.",
	           EXTERNAL_SHARES_ERROR: "Fişierul poate fi partajat numai în organizaţia dumneavoastră.",
	           EXTERNAL_SHARES_ERROR_X: "Fişierele pot fi partajate numai în organizaţia dumneavoastră.",
	           NOT_LOGGED_IN_ERROR: "Fişierul nu a fost partajat deoarece nu eraţi logat.  Faceţi clic pe 'Partajare' pentru a partaja fişierul.",
	           NOT_LOGGED_IN_ERROR_X: "Fişierele nu au fost partajate deoarece nu eraţi logat.  Faceţi clic pe 'Partajare' pentru a partaja fişierele.",
	           TIMEOUT_ERROR: "Fişierul nu a fost partajat deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Partajare' pentru a încerca din nou.",
	           TIMEOUT_ERROR_X: "Fişierele nu au fost partajat deoarece serverul nu a putut fi contactat.  Faceţi clic pe 'Partajare' pentru a încerca din nou.",
	           CANCEL_ERROR: "Fişierul nu a fost partajat deoarece cererea a fost anulată.  Faceţi clic pe 'Partajare' pentru a încerca din nou.",
	           CANCEL_ERROR_X: "Fişierele nu au fost partajate deoarece cererea a fost anulată.  Faceţi clic pe 'Partajare' pentru a încerca din nou.",
	           NOT_FOUND_ERROR: "Fişierul a fost şters sau nu mai este vizibil pentru dumneavoastră şi nu poate fi partajat.",
	           NOT_FOUND_ERROR_X: "Fişierele au fost şterse sau nu mai sunt vizibile pentru dumneavoastră şi nu pot fi partajate.",
	           ACCESS_DENIED_ERROR: "Nu mai aveţi permisiune să partajaţi acest fişier.",
	           ACCESS_DENIED_ERROR_X: "Nu mai aveţi permisiunea să partajaţi aceste fişiere.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Un fişier care este restricţionat nu poate fi făcut public.",
	        	   ERROR_SHARE_X: "Fişierele care sunt restricţionate nu pot fi făcute publice."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Aţi încărcat cu succes ${0} la ${1}.",
			   SUCCESS_PLURAL: "Aţi încărcat cu succes ${0} fişiere la ${1}.",
			   ERROR: "Fişierul nu a putut fi încărcat.  Vă rugăm să încercaţi din nou mai târziu.",
			   ERROR_X: "${0} nu a putut fi încărcat.  Vă rugăm să încercaţi din nou mai târziu.",
			   INFO_SUCCESS_PRE_MODERATION: "Fişierul ${0} a fost trimis pentru examinare şi va fi disponibil când este aprobat.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} fişiere au fost trimise pentru examinare şi vor fi disponibile când sunt aprobate."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Încărcaţi şi partajaţi fişiere"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Anulare",
		   CONFIRM_OTHER_TAB: "Informaţiile pe care le-aţi introdus în celelalte file se vor pierde dacă continuaţi cu acţiunea curentă.  Apăsaţi OK pentru a continua sau Anulare pentru a vă întoarce.",
		   CONFIRM_CURRENT_TAB: "Informaţiile pe care le-aţi introdus în fila ${0} se vor pierde dacă continuaţi cu acţiunea curentă.  Apăsaţi OK pentru a continua sau Anulare pentru a vă întoarce.",
		   DIALOG_TITLE: "Confirmare",
		   OK: "OK"
	   }
	})
	
	
);