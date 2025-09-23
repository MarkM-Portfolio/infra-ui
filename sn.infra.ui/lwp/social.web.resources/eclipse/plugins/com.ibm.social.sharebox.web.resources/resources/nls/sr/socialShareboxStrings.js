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
   submit: {label: "Sačuvaj", a11y: "Sačuvaj", tooltip: "Sačuvaj"}, 
   cancel: {label: "Otkaži", a11y: "Otkaži", tooltip: "Otkaži"},
   close: {label: "Zatvori", a11y: "Zatvori", tooltip: "Zatvori"},
   title: {global: "Podeli nešto", community: "Podeli sa aplikacijom Zajednica"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "Deljenje radnji nije dostupno za ovaj scenario.",
	   ACTIONS_LOAD_ERROR: "Došlo je do greške tokom učitavanja deljenja radnji.",
	   CONTENT_LOAD_ERROR: "Nije moguće učitati sadržaj. Pokušajte ponovo kasnije ili kontaktirajte administratora sistema."},
   MESSAGE: {
	      SUCCESS: "Potvrda",
	      ERROR: "Greška",
	      ERROR_ALT_TEXT: "Greška:",
	      INFO: "Informacije",
	      WARNING: "Upozorenje",
	      DISMISS: "Sakrij ovu poruku",
	      MORE_DETAILS: "Više detalja",
	      HIDE_DETAILS: "Sakrij detalje"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "Deljenje",
	   UPLOAD: "Otpremi",
	   CANCEL: "Otkaži",
	   VISIBILITY_WARNING: "Datoteke koje se dele sa ovom zajednicom postaće javne.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "Uspešno ste podelili ${0} sa ${1}.",
		   SUCCESS_PLURAL: "Uspešno ste podelili ${0} datoteka sa ${1}.",
		   ERROR: "Nije moguće deliti datoteku.  Pokušajte ponovo kasnije.",
		   ERROR_X: "Nije moguće deliti datoteke.  Pokušajte ponovo kasnije.",
           MAX_SHARES_ERROR: "Premašili ste maksimalni broj deljenja.",
           EXTERNAL_SHARES_ERROR: "Datoteku nije moguće deliti unutar vaše organizacije.",
           EXTERNAL_SHARES_ERROR_X: "Datoteke je moguće deliti samo unutar organizacije.",
           NOT_LOGGED_IN_ERROR: "Datoteka se ne deli jer se niste prijavili.  Kliknite na stavku 'Deli' da biste delili datoteku.",
           NOT_LOGGED_IN_ERROR_X: "Datoteke se ne dele jer se niste prijavili.  Kliknite na stavku 'Deli' da biste delili datoteke.",
           TIMEOUT_ERROR: "Datoteka se ne deli jer nije moguće kontaktirati server.  Kliknite na stavku 'Deli' kako biste pokušali ponovo.",
           TIMEOUT_ERROR_X: "Datoteke se ne dele jer nije moguće kontaktirati server.  Kliknite na 'Deli' kako biste pokušali ponovo.",
           CANCEL_ERROR: "Datoteka se ne deli jer je zahtev otkazan.  Kliknite na 'Deli' kako biste pokušali ponovo.",
           CANCEL_ERROR_X: "Datoteke se ne dele jer je zahtev otkazan.  Kliknite na 'Deli' kako biste pokušali ponovo.",
           NOT_FOUND_ERROR: "Datoteka je izbrisana ili više nije vidljiva i nije je moguće deliti.",
           NOT_FOUND_ERROR_X: "Datoteke su izbrisane ili više nisu vidljive i nije ih moguće deliti.",
           ACCESS_DENIED_ERROR: "Više nemate dozvolu da delite ovu datoteku.",
           ACCESS_DENIED_ERROR_X: "Više nemate dozvolu da delite ove datoteke.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "Datoteka koja je ograničena ne može biti dostupna javnosti.",
        	   ERROR_SHARE_X: "Datoteke koje su ograničene ne mogu biti dostupne javnosti."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "Uspešno ste otpremili ${0} do ${1}.",
		   SUCCESS_PLURAL: "Uspešno ste otpremili ${0} datoteka do ${1}.",
		   ERROR: "Nije bilo moguće otpremiti datoteku.  Pokušajte ponovo kasnije.",
		   ERROR_X: "${0} nije moguće otpremiti.  Pokušajte ponovo kasnije.",
		   INFO_SUCCESS_PRE_MODERATION: "Datoteku ${0} ste poslali na pregled i biće dostupna posle odobrenja.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} datoteke ste poslali na pregled i biće dostupne posle odobrenja."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Otpremanje i deljenje datoteka"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Otkaži",
	   CONFIRM_OTHER_TAB: "Informacije koje ste uneli na drugim karticama izgubićete ako nastavite aktuelnu radnju.  Pritisnite dugme „U redu“ da biste nastavili ili „Otkaži“ da biste se vratili.",
	   CONFIRM_CURRENT_TAB: "Informacije koje ste uneli na kartici ${0} izgubićete ako nastavite aktuelnu radnju.  Pritisnite dugme „U redu“ da biste nastavili ili „Otkaži“ da biste se vratili.",
	   DIALOG_TITLE: "Potvrđivanje",
	   OK: "U redu"
   }
})



