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
   submit: {label: "Uložit", a11y: "Uložit", tooltip: "Uložit"}, 
   cancel: {label: "Storno", a11y: "Storno", tooltip: "Storno"},
   close: {label: "Zavřít", a11y: "Zavřít", tooltip: "Zavřít"},
   title: {global: "Sdílejte něco... ", community: "Sdílejte něco s komunitou... "},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "Akce sdílení nejsou v tomto scénáři k dispozici.",
	   ACTIONS_LOAD_ERROR: "Při načítání akcí sdílení došlo k chybě.",
	   CONTENT_LOAD_ERROR: "Obsah nelze načíst. Zkuste akci zopakovat nebo se obraťte na administrátora."},
   MESSAGE: {
	      SUCCESS: "Potvrzení",
	      ERROR: "Chyba",
	      ERROR_ALT_TEXT: "Chyba:",
	      INFO: "Informace",
	      WARNING: "Varování",
	      DISMISS: "Skrýt tuto zprávu",
	      MORE_DETAILS: "Další podrobnosti",
	      HIDE_DETAILS: "Skrýt podrobnosti"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "Sdílet",
	   UPLOAD: "Odeslat",
	   CANCEL: "Storno",
	   VISIBILITY_WARNING: "Sdílením s touto komunitou se soubory stávají veřejnými.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "Úspěšně sdílíte soubor ${0} s uživatelem ${1}.",
		   SUCCESS_PLURAL: "Úspěšně sdílíte soubory (${0}) s uživatelem ${1}.",
		   ERROR: "Soubor nelze sdílet. Zopakujte akci později.",
		   ERROR_X: "Soubory nelze sdílet. Zopakujte akci později.",
           MAX_SHARES_ERROR: "Byl překročen maximální povolený počet sdílení.",
           EXTERNAL_SHARES_ERROR: "Soubor lze sdílet pouze v rámci vaší organizace.",
           EXTERNAL_SHARES_ERROR_X: "Soubory lze sdílet pouze v rámci vaší organizace.",
           NOT_LOGGED_IN_ERROR: "Soubor nebyl sdílen, protože jste nebyli přihlášeni. Chcete-li soubor sdílet, klepněte na volbu Sdílet.",
           NOT_LOGGED_IN_ERROR_X: "Soubory nebyly sdíleny, protože jste nebyli přihlášeni. Chcete-li soubory sdílet, klepněte na volbu Sdílet.",
           TIMEOUT_ERROR: "Soubor nebyl sdílen, protože nebylo možné kontaktovat server. Chcete-li operaci zopakovat, klepněte na volbu Sdílet.",
           TIMEOUT_ERROR_X: "Soubory nebyly sdíleny, protože nebylo možné kontaktovat server. Chcete-li operaci zopakovat, klepněte na volbu Sdílet.",
           CANCEL_ERROR: "Soubor nebyl sdílen, protože požadavek byl zrušen. Chcete-li operaci zopakovat, klepněte na volbu Sdílet.",
           CANCEL_ERROR_X: "Soubory nebyly sdíleny protože požadavek byl zrušen. Chcete-li operaci zopakovat, klepněte na volbu Sdílet.",
           NOT_FOUND_ERROR: "Soubor byl odstraněn nebo již pro vás není viditelný a nelze jej sdílet.",
           NOT_FOUND_ERROR_X: "Soubory byly odstraněny nebo již pro vás nejsou viditelné a nelze je sdílet.",
           ACCESS_DENIED_ERROR: "Již nemáte oprávnění ke sdílení tohoto souboru.",
           ACCESS_DENIED_ERROR_X: "Již nemáte oprávnění ke sdílení těchto souborů.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "Omezený soubor nelze zveřejnit.",
        	   ERROR_SHARE_X: "Omezené soubory nelze zveřejnit."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "Úspěšně jste odeslali soubor ${0} do umístění ${1}.",
		   SUCCESS_PLURAL: "Úspěšně jste odeslali soubory (${0}) do umístění ${1}.",
		   ERROR: "Soubor se nepodařilo odeslat. Zopakujte akci později.",
		   ERROR_X: "Soubory ${0} se nepodařilo odeslat. Zopakujte akci později.",
		   INFO_SUCCESS_PRE_MODERATION: "Soubor ${0} byl odeslán k revizi, bude k dispozici po schválení.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "Soubory v počtu ${0} byly odeslány k revizi a po schválení budou k dispozici."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Odesílejte a sdílejte soubory"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Storno",
	   CONFIRM_OTHER_TAB: "Budete-li pokračovat v aktuální akci, informace zadané na jiných kartách budou ztraceny. Můžete pokračovat klepnutím na tlačítko OK nebo klepnout na volbu Storno a vrátit se.",
	   CONFIRM_CURRENT_TAB: "Budete-li pokračovat v aktuální akci, informace zadané na kartě ${0} budou ztraceny. Můžete pokračovat klepnutím na tlačítko OK nebo klepnout na volbu Storno a vrátit se.",
	   DIALOG_TITLE: "Potvrdit",
	   OK: "OK"
   }
})



