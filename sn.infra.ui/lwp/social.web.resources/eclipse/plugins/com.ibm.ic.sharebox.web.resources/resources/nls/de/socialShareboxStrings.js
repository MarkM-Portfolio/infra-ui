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
	   submit: {label: "Speichern", a11y: "Speichern", tooltip: "Speichern"}, 
	   cancel: {label: "Abbrechen", a11y: "Abbrechen", tooltip: "Abbrechen"},
	   close: {label: "Schließen", a11y: "Schließen", tooltip: "Schließen"},
	   title: {global: "Teilen", community: "Mit einer Community teilen"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Aktionen zum Teilen sind in diesem Szenario nicht verfügbar.",
		   ACTIONS_LOAD_ERROR: "Beim Laden der Aktionen zum Teilen ist ein Fehler aufgetreten.",
		   CONTENT_LOAD_ERROR: "Der Inhalt kann nicht geladen werden. Versuchen Sie es später erneut oder wenden Sie sich an den zuständigen Systemadministrator."},
	   MESSAGE: {
		      SUCCESS: "Bestätigung",
		      ERROR: "Fehler",
		      ERROR_ALT_TEXT: "Fehler:",
		      INFO: "Information",
		      WARNING: "Warnung ",
		      DISMISS: "Diese Nachricht ausblenden",
		      MORE_DETAILS: "Mehr Details",
		      HIDE_DETAILS: "Details ausblenden"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Teilen ",
		   UPLOAD: "Hochladen",
		   CANCEL: "Abbrechen",
		   VISIBILITY_WARNING: "Mit dieser Community geteilte Dateien werden öffentlich.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Sie haben ${0} erfolgreich mit ${1} geteilt.",
			   SUCCESS_PLURAL: "Sie haben ${0} Dateien erfolgreich mit ${1} geteilt.",
			   ERROR: "Die Datei konnte nicht geteilt werden.  Versuchen Sie es später erneut.",
			   ERROR_X: "Die Dateien konnten nicht geteilt werden. Versuchen Sie es später erneut.",
	           MAX_SHARES_ERROR: "Die maximale Anzahl an geteilten Dateien wurde überschritten.",
	           EXTERNAL_SHARES_ERROR: "Die Datei kann nur innerhalb Ihres Unternehmens geteilt werden.",
	           EXTERNAL_SHARES_ERROR_X: "Die Dateien können nur innerhalb Ihres Unternehmens geteilt werden.",
	           NOT_LOGGED_IN_ERROR: "Die Datei wurde nicht geteilt, weil Sie nicht angemeldet waren. Klicken Sie auf 'Teilen', um die Datei zu teilen. ",
	           NOT_LOGGED_IN_ERROR_X: "Die Dateien wurden nicht geteilt, da Sie nicht angemeldet waren. Klicken Sie auf 'Teilen', um die Dateien zu teilen.",
	           TIMEOUT_ERROR: "Die Datei wurde nicht geteilt, weil keine Verbindung zum Server hergestellt werden konnte.  Klicken Sie auf 'Teilen', um es erneut zu versuchen.",
	           TIMEOUT_ERROR_X: "Die Dateien wurden nicht geteilt, da keine Verbindung zum Server hergestellt werden konnte. Klicken Sie auf 'Teilen', um es erneut zu versuchen.",
	           CANCEL_ERROR: "Die Datei wurde nicht geteilt, da die Anforderung abgebrochen wurde. Klicken Sie auf 'Teilen', um es erneut zu versuchen.",
	           CANCEL_ERROR_X: "Die Dateien wurden nicht geteilt, da die Anforderung abgebrochen wurde. Klicken Sie auf 'Teilen', um es erneut zu versuchen.",
	           NOT_FOUND_ERROR: "Die Datei wurde gelöscht oder wird Ihnen nicht mehr angezeigt und kann daher nicht geteilt werden.",
	           NOT_FOUND_ERROR_X: "Die Dateien wurden gelöscht oder werden Ihnen nicht mehr angezeigt. Sie können nicht geteilt werden.",
	           ACCESS_DENIED_ERROR: "Sie sind zum Teilen dieser Datei nicht mehr berechtigt.",
	           ACCESS_DENIED_ERROR_X: "Sie verfügen nicht mehr über die Berechtigung, diese Dateien zu teilen.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Eine eingeschränkte Datei kann nicht öffentlich gemacht werden. ",
	        	   ERROR_SHARE_X: "Eingeschränkte Dateien dürfen nicht öffentlich zugänglich gemacht werden."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Sie haben ${0} erfolgreich in ${1} hochgeladen.",
			   SUCCESS_PLURAL: "Sie haben ${0} Dateien erfolgreich in ${1} hochgeladen.",
			   ERROR: "Die Datei konnte nicht hochgeladen werden. Versuchen Sie es später erneut.",
			   ERROR_X: "${0} konnte nicht hochgeladen werden. Versuchen Sie es später erneut.",
			   INFO_SUCCESS_PRE_MODERATION: "Die Datei ${0} wurde zur Überprüfung übergeben und ist nach der Genehmigung verfügbar.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} Dateien wurden zur Überprüfung übergeben und sind nach der Genehmigung verfügbar."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Dateien hochladen und teilen"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Abbrechen",
		   CONFIRM_OTHER_TAB: "Die Informationen, die Sie auf den anderen Registerkarten eingegeben haben, gehen verloren, wenn Sie mit der laufenden Aktion fortfahren. Klicken Sie auf 'OK', um fortzufahren oder auf 'Abbrechen', um zurückzukehren.",
		   CONFIRM_CURRENT_TAB: "Die Informationen, die Sie auf der Registerkarte ${0} eingegeben haben, gehen verloren, wenn Sie mit der aktuellen Aktion fortfahren. Klicken Sie auf 'OK', um fortzufahren oder auf 'Abbrechen', um zurückzukehren.",
		   DIALOG_TITLE: "Bestätigen",
		   OK: "OK"
	   }
	})
	
	
);