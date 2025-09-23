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
	   submit: {label: "Gem", a11y: "Gem", tooltip: "Gem"}, 
	   cancel: {label: "Annullér", a11y: "Annullér", tooltip: "Annullér"},
	   close: {label: "Luk", a11y: "Luk", tooltip: "Luk"},
	   title: {global: "Del noget", community: "Del med et fællesskab"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Der er ingen tilgængelige delingshandlinger for dette scenarie.",
		   ACTIONS_LOAD_ERROR: "Der er opstået en fejl under indlæsning af delingshandlinger.",
		   CONTENT_LOAD_ERROR: "Indholdet kan ikke indlæses. Prøv igen senere, eller kontakt systemadministratoren."},
	   MESSAGE: {
		      SUCCESS: "Bekræftelse",
		      ERROR: "Fejl",
		      ERROR_ALT_TEXT: "Fejl:",
		      INFO: "Information",
		      WARNING: "Advarsel",
		      DISMISS: "Skjul denne meddelelse",
		      MORE_DETAILS: "Flere detaljer",
		      HIDE_DETAILS: "Skjul detaljer"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Del",
		   UPLOAD: "Upload",
		   CANCEL: "Annullér",
		   VISIBILITY_WARNING: "Filer, som er delt med dette fællesskab, bliver offentlige.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Du har delt ${0} med ${1}.",
			   SUCCESS_PLURAL: "Du har delt ${0} filer med ${1}.",
			   ERROR: "Filen kan ikke deles. Prøv igen senere.",
			   ERROR_X: "Filerne kan ikke deles. Prøv igen senere.",
	           MAX_SHARES_ERROR: "Det maksimale antal delinger er overskredet.",
	           EXTERNAL_SHARES_ERROR: "Filen kan kun deles inden for din organisation.",
	           EXTERNAL_SHARES_ERROR_X: "Filerne kan kun deles inden for din organisation.",
	           NOT_LOGGED_IN_ERROR: "Filen er ikke delt, fordi du ikke er logget på. Klik på Del for at dele filen.",
	           NOT_LOGGED_IN_ERROR_X: "Filerne er ikke delt, fordi du ikke er logget på. Klik på Del for at dele filerne.",
	           TIMEOUT_ERROR: "Filen er ikke delt, fordi serveren ikke kan kontaktes. Klik på Del for at prøve igen.",
	           TIMEOUT_ERROR_X: "Filerne er ikke delt, fordi serveren ikke kan kontaktes. Klik på Del for at prøve igen.",
	           CANCEL_ERROR: "Filen er ikke delt, fordi anmodningen er annulleret. Klik på Del for at prøve igen.",
	           CANCEL_ERROR_X: "Filerne er ikke delt, fordi anmodningen er annulleret. Klik på Del for at prøve igen.",
	           NOT_FOUND_ERROR: "Filen er slettet eller er ikke længere synlig for dig og kan ikke deles.",
	           NOT_FOUND_ERROR_X: "Filerne er slettet eller er ikke længere synlige for dig og kan ikke deles.",
	           ACCESS_DENIED_ERROR: "Du har ikke længere tilladelse til at dele denne fil.",
	           ACCESS_DENIED_ERROR_X: "Du har ikke længere tilladelse til at dele disse filer.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "En begrænset fil kan ikke gøres offentlig.",
	        	   ERROR_SHARE_X: "Begrænsede filer kan ikke gøres offentlige."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Du har uploadet ${0} til ${1}.",
			   SUCCESS_PLURAL: "Du har uploadet ${0} filer til ${1}.",
			   ERROR: "Filen kan ikke uploades. Prøv igen senere.",
			   ERROR_X: "${0} kan ikke uploades. Prøv igen senere.",
			   INFO_SUCCESS_PRE_MODERATION: "Filen ${0} er sendt til gennemgang og vil blive gjort tilgængelig, når den er godkendt.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} filer er sendt til gennemgang og vil blive gjort tilgængelige, når de er godkendt."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Upload og del filer"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Annullér",
		   CONFIRM_OTHER_TAB: "De oplysninger, du har indtastet på de andre skilleblade, vil gå tabt, hvis du fortsætter med den nuværende handling. Klik på OK for at fortsætte eller Annullér for at returnere.",
		   CONFIRM_CURRENT_TAB: "De oplysninger, du har indtastet på skillebladet ${0}, vil gå tabt, hvis du fortsætter med den nuværende handling. Klik på OK for at fortsætte eller Annullér for at returnere.",
		   DIALOG_TITLE: "Bekræft",
		   OK: "OK"
	   }
	})
	
	
);