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
	   submit: {label: "Spremi", a11y: "Spremi", tooltip: "Spremi"}, 
	   cancel: {label: "Opoziv", a11y: "Opoziv", tooltip: "Opoziv"},
	   close: {label: "Zatvori", a11y: "Zatvori", tooltip: "Zatvori"},
	   title: {global: "Dijeljenje nečega", community: "Dijeljenje sa zajednicom"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Dijeljenje akcija nije dostupno za ovaj scenarij.",
		   ACTIONS_LOAD_ERROR: "Dogodila se greška prilikom učitavanja dijeljenih akcija.",
		   CONTENT_LOAD_ERROR: "Sadržaj se ne može učitati. Pokušajte ponovno kasnije ili kontaktirajte vašeg sistemskog administratora."},
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
		   SHARE: "Dijeli",
		   UPLOAD: "Učitaj",
		   CANCEL: "Opoziv",
		   VISIBILITY_WARNING: "Datoteke dijeljene s ovom zajednicom će postati javne.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Uspješno ste podijelili ${0} s ${1}.",
			   SUCCESS_PLURAL: "Uspješno ste podijelili ${0} datoteka s ${1}.",
			   ERROR: "Datoteka se nije mogla dijeliti.  Molimo pokušajte ponovno kasnije.",
			   ERROR_X: "Datoteke se ne mogu dijeliti.  Molimo pokušajte ponovno kasnije.",
	           MAX_SHARES_ERROR: "Premašen je maksimalan broj podjela.",
	           EXTERNAL_SHARES_ERROR: "Datoteka se može dijeliti samo unutar vaše organizacije.",
	           EXTERNAL_SHARES_ERROR_X: "Datoteke se mogu dijeliti samo unutar vaše organizacije.",
	           NOT_LOGGED_IN_ERROR: "Datoteka nije dijeljena zato što niste bili prijavljeni.  Kliknite 'Podijeli' za podjelu datoteke.",
	           NOT_LOGGED_IN_ERROR_X: "Datoteke nisu dijeljene jer niste prijavljeni.  Kliknite 'Dijeli' za podjelu datoteka.",
	           TIMEOUT_ERROR: "Datoteka nije dijeljena zato što se nije moglo kontaktirati poslužitelj.  Kliknite 'Dijeli' za ponovni pokušaj.",
	           TIMEOUT_ERROR_X: "Datoteke nisu dijeljene zato što se nije moglo kontaktirati poslužitelj.  Kliknite 'Dijeli' za ponovni pokušaj.",
	           CANCEL_ERROR: "Datoteka nije dijeljena zato što je zahtjev opozvan.  Kliknite 'Dijeli' za ponovni pokušaj.",
	           CANCEL_ERROR_X: "Datoteke nisu dijeljene zato što je zahtjev opozvan.  Kliknite 'Dijeli' za ponovni pokušaj.",
	           NOT_FOUND_ERROR: "Datoteka je izbrisana ili više nije vidljiva i ne može se dijeliti.",
	           NOT_FOUND_ERROR_X: "Datoteke su izbrisane ili više nisu vidljive i ne mogu se dijeliti.",
	           ACCESS_DENIED_ERROR: "Više nemate dozvolu za dijeljenje ove datoteke.",
	           ACCESS_DENIED_ERROR_X: "Više nemate dozvolu za dijeljenje ovih datoteka.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Datoteka koja je ograničena se ne može napraviti javnom.",
	        	   ERROR_SHARE_X: "Datoteke koje su ograničene se ne mogu napraviti javnima."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Uspješno ste učitali ${0} u ${1}.",
			   SUCCESS_PLURAL: "Uspješno ste učitali ${0} datoteka u ${1}.",
			   ERROR: "Datoteka se nije mogla učitati.  Molimo pokušajte ponovno kasnije.",
			   ERROR_X: "${0} se nije mogla učitati.  Molimo pokušajte ponovno kasnije.",
			   INFO_SUCCESS_PRE_MODERATION: "Datoteka ${0} je poslana na izvođenje radi pregleda i bit će dostupna nakon odobrenja.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} datoteka je uspješno poslano na izvođenje radi pregleda i bit će dostupno nakon odobrenja."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Učitaj i dijeli datoteke"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Opoziv",
		   CONFIRM_OTHER_TAB: "Informacije koje ste unijeli u druge kartice bit će izgubljene ako nastavite s trenutnom akcijom.  Pritisnite OK za nastavak ili Opoziv za povratak.",
		   CONFIRM_CURRENT_TAB: "Informacije koje ste unijeli na karticu ${0} bit će izgubljene ako nastavite s trenutnom akcijom.  Pritisnite OK za nastavak ili Opoziv za povratak.",
		   DIALOG_TITLE: "Potvrda",
		   OK: "OK"
	   }
	})
	
	
);