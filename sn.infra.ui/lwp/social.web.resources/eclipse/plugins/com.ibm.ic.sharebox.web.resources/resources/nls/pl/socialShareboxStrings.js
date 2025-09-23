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
	   submit: {label: "Zapisz", a11y: "Zapisz", tooltip: "Zapisz"}, 
	   cancel: {label: "Anuluj", a11y: "Anuluj", tooltip: "Anuluj"},
	   close: {label: "Zamknij", a11y: "Zamknij", tooltip: "Zamknij"},
	   title: {global: "Współużytkowanie treści", community: "Współużytkowanie ze społecznością"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Działania współużytkowania są niedostępne w tym scenariuszu.",
		   ACTIONS_LOAD_ERROR: "Wystąpił błąd podczas ładowania działań współużytkowania.",
		   CONTENT_LOAD_ERROR: "Nie można załadować treści. Spróbuj ponownie później lub skontaktuj się z administratorem systemu."},
	   MESSAGE: {
		      SUCCESS: "Potwierdzenie",
		      ERROR: "Błąd",
		      ERROR_ALT_TEXT: "Błąd:",
		      INFO: "Informacja",
		      WARNING: "Ostrzeżenie",
		      DISMISS: "Ukryj ten komunikat",
		      MORE_DETAILS: "Więcej szczegółów",
		      HIDE_DETAILS: "Ukryj szczegóły"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Współużytkuj",
		   UPLOAD: "Prześlij",
		   CANCEL: "Anuluj",
		   VISIBILITY_WARNING: "Pliki współużytkowane z tą społecznością staną się publiczne.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Udostępnianie pliku ${0} do współużytkowania z ${1} zakończyło się pomyślnie.",
			   SUCCESS_PLURAL: "Udostępnianie plików (${0}) do współużytkowania z ${1} zakończyło się pomyślnie.",
			   ERROR: "Nie można współużytkować tego pliku.  Spróbuj ponownie później.",
			   ERROR_X: "Nie można współużytkować tych plików.  Spróbuj ponownie później.",
	           MAX_SHARES_ERROR: "Przekroczono maksymalną liczbę relacji współużytkowania.",
	           EXTERNAL_SHARES_ERROR: "Plik można udostępnić do współużytkowania jedynie w obrębie organizacji.",
	           EXTERNAL_SHARES_ERROR_X: "Pliki można udostępnić do współużytkowania jedynie w obrębie organizacji.",
	           NOT_LOGGED_IN_ERROR: "Nie udostępniono pliku do współużytkowania, ponieważ użytkownik nie był zalogowany.  Kliknij przycisk Współużytkuj, aby ustawić relację współużytkowania pliku.",
	           NOT_LOGGED_IN_ERROR_X: "Nie udostępniono plików do współużytkowania, ponieważ użytkownik nie był zalogowany.  Kliknij przycisk Współużytkuj, aby udostępnić te pliki do współużytkowania.",
	           TIMEOUT_ERROR: "Nie udostępniono pliku do współużytkowania, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij przycisk Współużytkuj, aby spróbować ponownie.",
	           TIMEOUT_ERROR_X: "Nie udostępniono plików do współużytkowania, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij przycisk Współużytkuj, aby spróbować ponownie.",
	           CANCEL_ERROR: "Nie udostępniono pliku do współużytkowania, ponieważ żądanie zostało anulowane.  Kliknij przycisk Współużytkuj, aby spróbować ponownie.",
	           CANCEL_ERROR_X: "Nie udostępniono plików do współużytkowania, ponieważ żądanie zostało anulowane.  Kliknij przycisk Współużytkuj, aby spróbować ponownie.",
	           NOT_FOUND_ERROR: "Plik został usunięty lub jest już niewidoczny dla użytkownika, dlatego nie można ustawić jego relacji współużytkowania.",
	           NOT_FOUND_ERROR_X: "Pliki zostały usunięte lub są już niewidoczne dla użytkownika, dlatego nie można ustawić ich relacji współużytkowania.",
	           ACCESS_DENIED_ERROR: "Już nie masz uprawnień do współużytkowania tego pliku.",
	           ACCESS_DENIED_ERROR_X: "Już nie masz uprawnień do współużytkowania tych plików.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Zastrzeżonego pliku nie można ustawić jako publicznego pliku.",
	        	   ERROR_SHARE_X: "Zastrzeżonego pliku nie można ustawić jako publicznego pliku."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Przesłanie pliku ${0} do społeczności ${1} zakończyło się pomyślnie.",
			   SUCCESS_PLURAL: "Przesłanie plików (${0}) do społeczności ${1} zakończyło się pomyślnie.",
			   ERROR: "Nie można przesłać pliku.  Spróbuj ponownie później.",
			   ERROR_X: "Nie można przesłać pliku ${0}.  Spróbuj ponownie później.",
			   INFO_SUCCESS_PRE_MODERATION: "Plik ${0} został wysłany do przeglądu i będzie dostępny po zatwierdzeniu.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "Liczba plików wysłanych do przeglądu, które staną się dostępne po zatwierdzeniu: ${0}."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Prześlij i współużytkuj pliki"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Anuluj",
		   CONFIRM_OTHER_TAB: "W przypadku kontynuacji bieżącego działania informacje wprowadzone na innych kartach zostaną utracone.  Kliknij przycisk OK, aby kontynuować, lub przycisk Anuluj, aby powrócić.",
		   CONFIRM_CURRENT_TAB: "W przypadku kontynuacji bieżącego działania informacje wprowadzone na karcie ${0} zostaną utracone.  Kliknij przycisk OK, aby kontynuować, lub przycisk Anuluj, aby powrócić.",
		   DIALOG_TITLE: "Potwierdzenie",
		   OK: "OK"
	   }
	})
	
	
);