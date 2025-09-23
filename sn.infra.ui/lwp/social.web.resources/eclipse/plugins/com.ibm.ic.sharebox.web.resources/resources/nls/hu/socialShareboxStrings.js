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
	   submit: {label: "Mentés", a11y: "Mentés", tooltip: "Mentés"}, 
	   cancel: {label: "Mégse", a11y: "Mégse", tooltip: "Mégse"},
	   close: {label: "Bezárás", a11y: "Bezárás", tooltip: "Bezárás"},
	   title: {global: "Valami megosztása", community: "Megosztás közösséggel"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Ebben a helyzetben a műveltek megosztása nem érhető el.",
		   ACTIONS_LOAD_ERROR: "Hiba történt a műveletek megosztásának betöltésekor.",
		   CONTENT_LOAD_ERROR: "A tartalom nem tölthető be. Próbálkozzon újra később, vagy forduljon a rendszeradminisztrátorhoz."},
	   MESSAGE: {
		      SUCCESS: "Megerősítés",
		      ERROR: "Hiba",
		      ERROR_ALT_TEXT: "Hiba:",
		      INFO: "Információk",
		      WARNING: "Figyelmeztetés",
		      DISMISS: "Üzenet elrejtése",
		      MORE_DETAILS: "További részletek",
		      HIDE_DETAILS: "Részletek elrejtése"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Megosztás",
		   UPLOAD: "Feltöltés",
		   CANCEL: "Mégse",
		   VISIBILITY_WARNING: "A közösséggel megosztott fájlok nyilvánossá válnak.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "${0} megosztása sikerült a következővel: ${1}.",
			   SUCCESS_PLURAL: "Sikeresen megosztott ${0} fájlt a következővel: ${1}.",
			   ERROR: "A fájl sikerült megosztani.  Próbálkozzon újra később.",
			   ERROR_X: "A fájlokat nem lehetett megosztani.  Próbálkozzon újra később.",
	           MAX_SHARES_ERROR: "Túllépte a megosztások maximális számát.",
	           EXTERNAL_SHARES_ERROR: "A fájlt csak a szervezetén belül lehet megosztani.",
	           EXTERNAL_SHARES_ERROR_X: "A fájlokat csak a szervezetén belül lehet megosztani.",
	           NOT_LOGGED_IN_ERROR: "A fájl nem került megosztásra, mivel nincs bejelentkezve.  A fájl megosztásához kattintson a 'Megosztás' gombra.",
	           NOT_LOGGED_IN_ERROR_X: "A fájlok megosztására nem került sor, mivel nincs bejelentkezve.  A fájlok megosztásához kattintson a 'Megosztás' gombra.",
	           TIMEOUT_ERROR: "A fájl nem került megosztásra, mivel a kiszolgálóhoz nem sikerült csatlakozni.  A 'Megosztás' gombra kattintva próbálkozzon újra.",
	           TIMEOUT_ERROR_X: "A fájlok megosztására nem került sor, mert a szerverrel nem sikerült felvenni a kapcsolatot.  A 'Megosztás' gombra kattintva próbálkozzon újra.",
	           CANCEL_ERROR: "A fájl nem került megosztásra, mivel a kérelmet visszavonták.  A 'Megosztás' gombra kattintva próbálkozzon újra.",
	           CANCEL_ERROR_X: "A fájlok megosztására nem került sor, mivel a kérelmet visszavonták.  A 'Megosztás' gombra kattintva próbálkozzon újra.",
	           NOT_FOUND_ERROR: "A fájl nem osztható meg, mivel már törlésre került, vagy már nem látható az Ön számára.",
	           NOT_FOUND_ERROR_X: "A fájlokat törölték vagy már nem láthatja azt, így nem oszthatja meg azokat.",
	           ACCESS_DENIED_ERROR: "Már nincs engedélye megosztani a fájlt.",
	           ACCESS_DENIED_ERROR_X: "Már nincs engedélye a fájlok megosztására.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "A zárt fájlt nem lehet nyilvánossá tenni.",
	        	   ERROR_SHARE_X: "A zárt fájlok nem tehetők nyilvánossá."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "${0} feltöltése sikeres volt a(z) ${1} közösségbe.",
			   SUCCESS_PLURAL: "${0} fájl feltöltése sikeres volt a(z) ${1} közösségbe.",
			   ERROR: "A fájlt nem lehetett feltölteni.  Próbálkozzon újra később.",
			   ERROR_X: "${0} nem lehetett feltölteni.  Próbálkozzon újra később.",
			   INFO_SUCCESS_PRE_MODERATION: "A(z) ${0} fájl el lett küldve áttekintésre és a jóváhagyás után elérhető lesz.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} fájl el lett küldve áttekintésre, és jóváhagyás után elérhető lesz."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Fájlok feltöltése és megosztása"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Mégse",
		   CONFIRM_OTHER_TAB: "A többi lapon megadott információk el fognak veszni, ha folytatja a jelenlegi műveletet.  Kattintson az OK gombra a folytatáshoz vagy a Mégse gombra a visszalépéshez.",
		   CONFIRM_CURRENT_TAB: "A(z) ${0} lapon megadott információk elvesznek, ha folytatja az aktuális műveletet.  Kattintson az OK gombra a folytatáshoz vagy a Mégse gombra a visszalépéshez.",
		   DIALOG_TITLE: "Megerősítés",
		   OK: "OK"
	   }
	})
	
	
);