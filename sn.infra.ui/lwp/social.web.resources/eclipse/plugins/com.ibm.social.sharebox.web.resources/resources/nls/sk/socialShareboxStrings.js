/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
   submit: {label: "Uložiť", a11y: "Uložiť", tooltip: "Uložiť"}, 
   cancel: {label: "Zrušiť", a11y: "Zrušiť", tooltip: "Zrušiť"},
   close: {label: "Zatvoriť", a11y: "Zatvoriť", tooltip: "Zatvoriť"},
   title: {global: "Zdieľať niečo", community: "Zdieľať s komunitou"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "Akcie zdieľania nie sú k dispozícii pre tento scenár.",
	   ACTIONS_LOAD_ERROR: "Nastala chyba pri načítavaní akcií pre zdieľanie.",
	   CONTENT_LOAD_ERROR: "Obsah nemožno načítať. Skúste to znova alebo kontaktujte svojho administrátora systému."},
   MESSAGE: {
	      SUCCESS: "Potvrdenie",
	      ERROR: "Chyba",
	      ERROR_ALT_TEXT: "Chyba:",
	      INFO: "Informácie",
	      WARNING: "Upozornenie",
	      DISMISS: "Skryť túto správu",
	      MORE_DETAILS: "Viac podrobností",
	      HIDE_DETAILS: "Skryť podrobnosti"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "Zdieľať",
	   UPLOAD: "Odoslať",
	   CANCEL: "Zrušiť",
	   VISIBILITY_WARNING: "Súbory, ktoré sa zdieľajú s touto komunitou, sa stanú verejnými.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "Úspešne zdieľate ${0} s ${1}.",
		   SUCCESS_PLURAL: "Úspešne zdieľate ${0} súborov s ${1}.",
		   ERROR: "Nebolo možné zdieľať súbor.  Skúste to znova neskôr.",
		   ERROR_X: "Nebolo možné zdieľať tento súbor.  Skúste to znova neskôr.",
           MAX_SHARES_ERROR: "Prekročil sa maximálny počet zdieľaní.",
           EXTERNAL_SHARES_ERROR: "Súbor sa dá zdieľať iba vnútri vašej organizácie.",
           EXTERNAL_SHARES_ERROR_X: "Súbory sa dajú zdieľať iba vnútri vašej organizácie.",
           NOT_LOGGED_IN_ERROR: "Súbor sa nezdieľa, pretože ste neboli prihlásený.  Ak chcete zdieľať súbor, kliknite na položku Zdieľať.",
           NOT_LOGGED_IN_ERROR_X: "Súbory neboli zdieľané, pretože ste neboli prihlásený.  Ak chcete zdieľať súbory, kliknite na položku Zdieľať.",
           TIMEOUT_ERROR: "Súbor sa nezdieľa, pretože nebolo možné kontaktovať server.  Skúste to znova kliknutím na položku Zdieľať",
           TIMEOUT_ERROR_X: "Súbory neboli zdieľané, pretože nebolo možné kontaktovať server.  Skúste to znova kliknutím na položku Zdieľať",
           CANCEL_ERROR: "Súbor sa nezdieľa, pretože požiadavka bola zrušená.  Skúste to znova kliknutím na položku Zdieľať",
           CANCEL_ERROR_X: "Súbory neboli zdieľané, pretože požiadavka bola zrušená.  Skúste to znova kliknutím na položku Zdieľať",
           NOT_FOUND_ERROR: "Súbor bol vymazaný alebo ho už nevidíte a nedá sa zdieľať.",
           NOT_FOUND_ERROR_X: "Súbory boli vymazané alebo už pre vás nie sú viditeľné a nedajú sa zdieľať.",
           ACCESS_DENIED_ERROR: "Už nemáte oprávnenie zdieľať tento súbor.",
           ACCESS_DENIED_ERROR_X: "Už nemáte oprávnenie na zdieľanie týchto súborov.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "Súbor, ktorý je obmedzený, nemožno spraviť verejným.",
        	   ERROR_SHARE_X: "Súbory, ktoré obmedzené, nemožno spraviť verejnými."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "Úspešne ste odoslali ${0} do ${1}.",
		   SUCCESS_PLURAL: "Úspešne ste odoslali ${0} súborov do ${1}.",
		   ERROR: "Nebolo možné odoslať súbor.  Skúste to znova neskôr.",
		   ERROR_X: "Nebolo možné odoslať ${0}.  Skúste to znova neskôr.",
		   INFO_SUCCESS_PRE_MODERATION: "Súbor ${0} bol odoslaný na posúdenie a bude k dispozícii po schválení.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} súborov bolo odoslaných na posúdenie a bude k dispozícii po schválení."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Odoslať a zdieľať súbory"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Zrušiť",
	   CONFIRM_OTHER_TAB: "Informácie, ktoré ste zadali na ostatných záložkách, sa stratia, ak budete pokračovať v aktuálnej akcii.  Ak chcete pokračovať, kliknite na položku OK. Ak sa chcete vrátiť, kliknite na položku Zrušiť.",
	   CONFIRM_CURRENT_TAB: "Informácie, ktoré ste zadali na záložke ${0}, sa stratia, ak budete pokračovať v aktuálnej akcii.  Ak chcete pokračovať, kliknite na položku OK. Ak sa chcete vrátiť, kliknite na položku Zrušiť.",
	   DIALOG_TITLE: "Potvrdiť",
	   OK: "OK"
   }
})



