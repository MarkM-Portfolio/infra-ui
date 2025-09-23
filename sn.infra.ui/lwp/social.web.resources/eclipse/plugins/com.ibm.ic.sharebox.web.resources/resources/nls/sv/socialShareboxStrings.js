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
	   submit: {label: "Spara", a11y: "Spara", tooltip: "Spara"}, 
	   cancel: {label: "Avbryt", a11y: "Avbryt", tooltip: "Avbryt"},
	   close: {label: "Stäng", a11y: "Stäng", tooltip: "Stäng"},
	   title: {global: "Dela något", community: "Dela med en gemenskap"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Delningsåtgärderna är inte tillgängliga för det här scenariot.",
		   ACTIONS_LOAD_ERROR: "Det uppstod ett fel när delningsåtgärderna skulle läsas in.",
		   CONTENT_LOAD_ERROR: "Det gick inte att läsa in innehållet. Försök igen senare eller kontakta systemadministratören."},
	   MESSAGE: {
		      SUCCESS: "Bekräfta",
		      ERROR: "Fel",
		      ERROR_ALT_TEXT: "Fel:",
		      INFO: "Information",
		      WARNING: "Varning",
		      DISMISS: "Göm det här meddelandet",
		      MORE_DETAILS: "Fler detaljer",
		      HIDE_DETAILS: "Göm detaljer"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Dela",
		   UPLOAD: "Överför",
		   CANCEL: "Avbryt",
		   VISIBILITY_WARNING: "De filer du delar med den här gemenskapen kommer att bli gemensamma.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Du delade ${0} med ${1}.",
			   SUCCESS_PLURAL: "Du delade ${0} filer med ${1}.",
			   ERROR: "Det gick inte att dela filen. Försök igen senare.",
			   ERROR_X: "Det gick inte att dela filerna. Försök igen senare.",
	           MAX_SHARES_ERROR: "Det största antalet delningar har överskridits.",
	           EXTERNAL_SHARES_ERROR: "Det går endast att dela filen i företaget.",
	           EXTERNAL_SHARES_ERROR_X: "Det går endast att dela filerna i företaget.",
	           NOT_LOGGED_IN_ERROR: "Du är inte inloggad. Det gick inte att dela filen. Om du vill dela filen klickar du på Dela.",
	           NOT_LOGGED_IN_ERROR_X: "Du är inte inloggad. Det gick inte att dela filerna. Om du vill dela filerna klickar du på Dela.",
	           TIMEOUT_ERROR: "Det gick inte att ansluta till servern. Det gick inte att dela filen. Om du vill försöka igen klickar du på Dela.",
	           TIMEOUT_ERROR_X: "Det gick inte att ansluta till servern. Det gick inte att dela filerna. Om du vill försöka igen klickar du på Dela.",
	           CANCEL_ERROR: "Begäran avbröts. Det gick inte att dela filen. Om du vill försöka igen klickar du på Dela.",
	           CANCEL_ERROR_X: "Begäran avbröts. Det gick inte att dela filerna. Om du vill försöka igen klickar du på Dela.",
	           NOT_FOUND_ERROR: "Filen har tagits bort eller visas inte längre för dig. Det går inte att dela den.",
	           NOT_FOUND_ERROR_X: "Filerna har tagits bort eller visas inte längre för dig. Det går inte att dela dem.",
	           ACCESS_DENIED_ERROR: "Du har inte längre behörighet att dela den här filen.",
	           ACCESS_DENIED_ERROR_X: "Du har inte längre behörighet att dela de här filerna.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Det går inte att göra begränsade filer gemensamma.",
	        	   ERROR_SHARE_X: "Det går inte att göra begränsade filer gemensamma."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Du överförde ${0} till ${1}.",
			   SUCCESS_PLURAL: "Du överförde ${0} filer till ${1}.",
			   ERROR: "Det gick inte att överföra filen. Försök igen senare.",
			   ERROR_X: "Det gick inte att överföra ${0}. Försök igen senare.",
			   INFO_SUCCESS_PRE_MODERATION: "Filen ${0} har lämnats in för granskning och kommer att vara tillgänglig när den har godkänts.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} filer har lämnats in för granskning och kommer att vara tillgängliga när de har godkänts."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Överför och dela filer"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Avbryt",
		   CONFIRM_OTHER_TAB: "Om du fortsätter med den aktuella åtgärden kommer du att förlora den information du har angett på de andra flikarna. Om du vill fortsätta klickar du på OK, om du vill gå tillbaka klickar du på Avbryt.",
		   CONFIRM_CURRENT_TAB: "Om du fortsätter med den aktuella åtgärden kommer du att förlora den information du har angett på fliken ${0}. Om du vill fortsätta klickar du på OK, om du vill gå tillbaka klickar du på Avbryt.",
		   DIALOG_TITLE: "Bekräfta",
		   OK: "OK"
	   }
	})
	
	
);