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
	   submit: {label: "Lagre", a11y: "Lagre", tooltip: "Lagre"}, 
	   cancel: {label: "Avbryt", a11y: "Avbryt", tooltip: "Avbryt"},
	   close: {label: "Lukk", a11y: "Lukk", tooltip: "Lukk"},
	   title: {global: "Del noe", community: "Del med et fellesskap"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Delingshandlinger er ikke tilgjengelige for dette scenariet.",
		   ACTIONS_LOAD_ERROR: "Det oppstod en feil ved innlasting av delingshandlinger.",
		   CONTENT_LOAD_ERROR: "Innholdet kan ikke lastes inn. Prøv igjen senere eller kontakt systemadministratoren."},
	   MESSAGE: {
		      SUCCESS: "Bekreftelse",
		      ERROR: "Feil",
		      ERROR_ALT_TEXT: "Feil:",
		      INFO: "Informasjon",
		      WARNING: "Advarsel",
		      DISMISS: "Skjul denne meldingen",
		      MORE_DETAILS: "Flere detaljer",
		      HIDE_DETAILS: "Skjul detaljer"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Del",
		   UPLOAD: "Last opp",
		   CANCEL: "Avbryt",
		   VISIBILITY_WARNING: "Filer som deles med dette fellesskapet, vil bli felles.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Du har delt ${0} med ${1}.",
			   SUCCESS_PLURAL: "Du har delt ${0} filer med ${1}.",
			   ERROR: "Filen kunne ikke deles. Prøv igjen senere.",
			   ERROR_X: "Filene kunne ikke deles. Prøv igjen senere.",
	           MAX_SHARES_ERROR: "Maksimalt antall delinger er overskredet.",
	           EXTERNAL_SHARES_ERROR: "Filen kan bare deles innenfor organisasjonen.",
	           EXTERNAL_SHARES_ERROR_X: "Filene kan bare deles innenfor organisasjonen.",
	           NOT_LOGGED_IN_ERROR: "Filen ble ikke delt fordi du ikke var logget på. Klikk på Del for å dele filen.",
	           NOT_LOGGED_IN_ERROR_X: "Filene ble ikke delt fordi du ikke var logget på. Klikk på Del for å dele filene.",
	           TIMEOUT_ERROR: "Filen ble ikke delt fordi det ikke var mulig å kontakte serveren. Klikk på Del for å prøve igjen.",
	           TIMEOUT_ERROR_X: "Filene ble ikke delt fordi det ikke var mulig å kontakte serveren. Klikk på Del for å prøve igjen.",
	           CANCEL_ERROR: "Filen ble ikke delt fordi forespørselen ble avbrutt. Klikk på Del for å prøve igjen.",
	           CANCEL_ERROR_X: "Filene ble ikke delt fordi forespørselen ble avbrutt. Klikk på Del for å prøve igjen.",
	           NOT_FOUND_ERROR: "Filen kan ikke deles fordi den er slettet eller ikke lenger er synlig for deg.",
	           NOT_FOUND_ERROR_X: "Filene kan ikke deles fordi de er slettet eller ikke lenger er synlige for deg.",
	           ACCESS_DENIED_ERROR: "Du har ikke lenger tillatelse til å dele denne filen.",
	           ACCESS_DENIED_ERROR_X: "Du har ikke lenger tillatelse til å dele disse filene.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "En fil som er begrenset, kan ikke gjøres felles.",
	        	   ERROR_SHARE_X: "Filer som er begrenset, kan ikke gjøres felles."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Du har lastet opp ${0} til ${1}.",
			   SUCCESS_PLURAL: "Du har lastet opp ${0} filer til ${1}.",
			   ERROR: "Filen kunne ikke lastes opp. Prøv igjen senere.",
			   ERROR_X: "${0} kunne ikke lastes opp. Prøv igjen senere.",
			   INFO_SUCCESS_PRE_MODERATION: "Filen ${0} er sendt til gjennomsyn og vil bli tilgjengelig når den er godkjent.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} filer er sendt til gjennomsyn og vil bli tilgjengelige når de er godkjent."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Last opp og del filer"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Avbryt",
		   CONFIRM_OTHER_TAB: "Informasjonen du har angitt i de andre kategoriene, vil gå tapt hvis du fortsetter med denne handlingen. Klikk på OK for å fortsette eller på Avbryt for å gå tilbake.",
		   CONFIRM_CURRENT_TAB: "Informasjonen du har skrevet inn i kategorien ${0}, går tapt hvis du fortsetter med denne handlingen. Klikk på OK for å fortsette eller på Avbryt for å gå tilbake.",
		   DIALOG_TITLE: "Bekreft",
		   OK: "OK"
	   }
	})
	
	
);