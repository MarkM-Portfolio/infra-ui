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
	   submit: {label: "Salva", a11y: "Salva", tooltip: "Salva"}, 
	   cancel: {label: "Annulla", a11y: "Annulla", tooltip: "Annulla"},
	   close: {label: "Chiudi", a11y: "Chiudi", tooltip: "Chiudi"},
	   title: {global: "Condividi qualcosa", community: "Condividi con una comunità"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Le azioni di condivisone non sono disponibili per questo scenario.",
		   ACTIONS_LOAD_ERROR: "Si è verificato un errore nel caricamento delle azioni di condivisione.",
		   CONTENT_LOAD_ERROR: "Impossibile caricare il contenuto. Provare di nuovo o contattare un amministratore di sistema."},
	   MESSAGE: {
		      SUCCESS: "Conferma",
		      ERROR: "Errore",
		      ERROR_ALT_TEXT: "Errore:",
		      INFO: "Informazioni",
		      WARNING: "Avviso",
		      DISMISS: "Nascondi questo messaggio",
		      MORE_DETAILS: "Ulteriori dettagli",
		      HIDE_DETAILS: "Nascondi dettagli"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Condividi",
		   UPLOAD: "Carica",
		   CANCEL: "Annulla",
		   VISIBILITY_WARNING: "I file condivisi con questa comunità diventeranno pubblici.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "${0} è stato correttamente condiviso con ${1}.",
			   SUCCESS_PLURAL: "I file ${0} sono stati correttamente condivisi con ${1}.",
			   ERROR: "Impossibile condividere il file.  Riprovare in seguito.",
			   ERROR_X: "Impossibile condividere i file.  Riprovare in seguito.",
	           MAX_SHARES_ERROR: "Il numero massimo di condivisioni è stato superato.",
	           EXTERNAL_SHARES_ERROR: "Il file può essere condiviso solo all'interno della propria organizzazione.",
	           EXTERNAL_SHARES_ERROR_X: "I file possono essere condivisi solo all'interno della propria organizzazione.",
	           NOT_LOGGED_IN_ERROR: "Il file non è stato condiviso poiché non si era collegati.  Fare clic su 'Condividi' per condividere il file.",
	           NOT_LOGGED_IN_ERROR_X: "I file non sono stati condivisi poiché non si era collegati.  Fare clic su 'Condividi' per condividere i file.",
	           TIMEOUT_ERROR: "Il file non è stato condiviso poiché non è stato possibile contattare il server.  Fare clic su 'Condividi' per tentare di nuovo.",
	           TIMEOUT_ERROR_X: "I file non sono stati condivisi poiché non è stato possibile contattare il server.  Fare clic su 'Condividi' per tentare di nuovo.",
	           CANCEL_ERROR: "Il file non è stato condiviso poiché la richiesta è stata annullata.  Fare clic su 'Condividi' per tentare di nuovo.",
	           CANCEL_ERROR_X: "I file non sono stati condivisi poiché la richiesta è stata annullata.  Fare clic su 'Condividi' per tentare di nuovo.",
	           NOT_FOUND_ERROR: "Il file è stato eliminato o non è più visibile e non può essere condiviso.",
	           NOT_FOUND_ERROR_X: "I file sono stati eliminati o non sono più visibili all'utente e non possono essere condivisi.",
	           ACCESS_DENIED_ERROR: "Non si dispone più dell'autorizzazione per condividere questo file.",
	           ACCESS_DENIED_ERROR_X: "L'utente non dispone più dell'autorizzazione per la condivisione di questi file.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Un file limitato non può essere reso pubblico.",
	        	   ERROR_SHARE_X: "I file che sono limitati non possono essere resi pubblici."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "${0} è stato correttamente caricato in ${1}.",
			   SUCCESS_PLURAL: "I file ${0} sono stati correttamente caricati in ${1}.",
			   ERROR: "Non è stato possibile caricare il file.  Riprovare in seguito.",
			   ERROR_X: "Impossibile caricare ${0}.  Riprovare in seguito.",
			   INFO_SUCCESS_PRE_MODERATION: "Il file ${0} è stato sottoposto a revisione e sarà disponibile una volta approvato.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} file sono stati inoltrati per la revisione e saranno disponibili una volta approvati."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Carica e condividi file"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Annulla",
		   CONFIRM_OTHER_TAB: "Le informazioni immesse su altre schede verranno perse se si continua con l'azione corrente.  Premere OK per continuare o su Annulla per chiudere.",
		   CONFIRM_CURRENT_TAB: "Le informazioni immesse sulla scheda ${0} verranno perse se si continua con l'azione corrente.  Premere OK per continuare o su Annulla per chiudere.",
		   DIALOG_TITLE: "Conferma",
		   OK: "OK"
	   }
	})
	
	
);