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
   submit: {label: "Opslaan", a11y: "Opslaan", tooltip: "Opslaan"}, 
   cancel: {label: "Annuleren", a11y: "Annuleren", tooltip: "Annuleren"},
   close: {label: "Sluiten", a11y: "Sluiten", tooltip: "Sluiten"},
   title: {global: "Iets delen", community: "Delen met een community"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "Acties voor delen zijn niet beschikbaar voor dit scenario.",
	   ACTIONS_LOAD_ERROR: "Er is een fout opgetreden bij het laden van de acties voor delen.",
	   CONTENT_LOAD_ERROR: "De content kan niet worden geladen. Probeer het later opnieuw of neem contact op met de systeembeheerder."},
   MESSAGE: {
	      SUCCESS: "Bevestiging",
	      ERROR: "Fout",
	      ERROR_ALT_TEXT: "Fout:",
	      INFO: "Informatie",
	      WARNING: "Waarschuwing",
	      DISMISS: "Dit bericht verbergen",
	      MORE_DETAILS: "Meer details",
	      HIDE_DETAILS: "Details verbergen"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "Delen",
	   UPLOAD: "Uploaden",
	   CANCEL: "Annuleren",
	   VISIBILITY_WARNING: "Bestanden die met deze community worden gedeeld, worden openbaar.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "U hebt ${0} gedeeld met ${1}.",
		   SUCCESS_PLURAL: "U hebt ${0} bestanden gedeeld met ${1}.",
		   ERROR: "Het bestand kan niet worden gedeeld. Probeer het later opnieuw.",
		   ERROR_X: "De bestanden kunnen niet worden gedeeld. Probeer het later opnieuw.",
           MAX_SHARES_ERROR: "Het maximumaantal shares is overschreden.",
           EXTERNAL_SHARES_ERROR: "Het bestand kan alleen binnen uw organisatie worden gedeeld.",
           EXTERNAL_SHARES_ERROR_X: "De bestanden kunnen alleen binnen uw organisatie worden gedeeld.",
           NOT_LOGGED_IN_ERROR: "Het bestand is niet gedeeld omdat u niet bent aangemeld. Klik op 'Delen' om het bestand te delen.",
           NOT_LOGGED_IN_ERROR_X: "De bestanden zijn niet gedeeld omdat u niet bent aangemeld. Klik op 'Delen' om de bestanden te delen.",
           TIMEOUT_ERROR: "Het bestand is niet gedeeld omdat er geen verbinding is met de server. Klik op 'Delen' om het opnieuw te proberen.",
           TIMEOUT_ERROR_X: "De bestanden zijn niet gedeeld omdat er geen verbinding is met de server. Klik op 'Delen' om het opnieuw te proberen.",
           CANCEL_ERROR: "Het bestand is niet gedeeld omdat de opdracht is geannuleerd. Klik op 'Delen' om het opnieuw te proberen.",
           CANCEL_ERROR_X: "De bestanden zijn niet gedeeld omdat de opdracht is geannuleerd. Klik op 'Delen' om het opnieuw te proberen.",
           NOT_FOUND_ERROR: "Het bestand is gewist of is niet langer zichtbaar voor u en kan niet worden gedeeld.",
           NOT_FOUND_ERROR_X: "De bestanden zijn gewist of zijn niet langer zichtbaar voor u en kunnen niet worden gedeeld.",
           ACCESS_DENIED_ERROR: "U bent niet meer gemachtigd om dit bestand te delen.",
           ACCESS_DENIED_ERROR_X: "U bent niet meer gemachtigd om deze bestanden te delen.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "Een bestand waarvan de toegang beperkt is, kan niet openbaar worden gemaakt.",
        	   ERROR_SHARE_X: "Bestanden met beperkte toegang mogen niet openbaar worden gemaakt."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "U hebt ${0} geüpload naar ${1}.",
		   SUCCESS_PLURAL: "U hebt ${0} bestanden geüpload naar ${1}.",
		   ERROR: "Het bestand kan niet worden geüpload. Probeer het later opnieuw.",
		   ERROR_X: "${0} kan niet worden geüpload. Probeer het later opnieuw.",
		   INFO_SUCCESS_PRE_MODERATION: "Het bestand ${0} is ingediend ter beoordeling en komt beschikbaar na goedkeuring.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} bestanden zijn verzonden voor evaluatie en worden beschikbaar zo gauw ze zijn goedgekeurd."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Bestanden uploaden en delen"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Annuleren",
	   CONFIRM_OTHER_TAB: "De informatie die u op de andere tabbladen hebt opgegeven, gaat verloren als u de huidige actie voortzet. Kies OK om door te gaan of Annuleren om terug te gaan.",
	   CONFIRM_CURRENT_TAB: "De informatie die u op het tabblad ${0} hebt opgegeven, gaat verloren als u de huidige actie voortzet. Kies OK om door te gaan of Annuleren om terug te gaan.",
	   DIALOG_TITLE: "Bevestigen",
	   OK: "OK"
   }
})



