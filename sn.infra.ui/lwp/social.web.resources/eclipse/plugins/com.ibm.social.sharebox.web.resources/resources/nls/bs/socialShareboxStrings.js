/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
   submit: {label: "Spremi", a11y: "Spremi", tooltip: "Spremi"}, 
   cancel: {label: "Odustani", a11y: "Odustani", tooltip: "Odustani"},
   close: {label: "Zatvori", a11y: "Zatvori", tooltip: "Zatvori"},
   title: {global: "Dijeljenje nečega", community: "Dijeljenje sa zajednicom"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "Dijeljenje akcija nije dostupno za ovaj scenarij.",
	   ACTIONS_LOAD_ERROR: "Došlo je do greške prilikom učitavanja dijeljenih akcija.",
	   CONTENT_LOAD_ERROR: "Sadržaj se ne može učitati. Pokušajte ponovo kasnije ili kontaktirajte vašeg sistemskog administratora."},
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
	   CANCEL: "Odustani",
	   VISIBILITY_WARNING: "Datoteke dijeljene s ovom zajednicom će postati javne.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "Uspješno ste podijelili ${0} s ${1}.",
		   SUCCESS_PLURAL: "Uspješno ste podijelili ${0} datoteka s ${1}.",
		   ERROR: "Datoteka se nije mogla dijeliti.  Molimo da pokušate ponovo kasnije.",
		   ERROR_X: "Datoteke se ne mogu dijeliti.  Molimo da pokušate ponovo kasnije.",
           MAX_SHARES_ERROR: "Pređen je maksimalan broj podjela.",
           EXTERNAL_SHARES_ERROR: "Datoteka se može dijeliti samo unutar vaše organizacije.",
           EXTERNAL_SHARES_ERROR_X: "Datoteke se mogu dijeliti samo unutar vaše organizacije.",
           NOT_LOGGED_IN_ERROR: "Datoteka nije dijeljena zato sta niste bili prijavljeni.  Kliknite 'Podijeli' za podjelu datoteke.",
           NOT_LOGGED_IN_ERROR_X: "Datoteke nisu dijeljene jer niste prijavljeni.  Kliknite 'Dijeli' za podjelu datoteka.",
           TIMEOUT_ERROR: "Datoteka nije dijeljena zato sta se nije moglo kontaktirati server.  Kliknite 'Podijeli' za ponovni pokušaj.",
           TIMEOUT_ERROR_X: "Datoteke nisu dijeljene zato sta nije mogao da se kontaktirati server.  Kliknite 'Podijeli' za ponovni pokušaj.",
           CANCEL_ERROR: "Datoteka nije dijeljena zato sta je zahtjev otkazan.  Kliknite 'Podijeli' za ponovni pokušaj.",
           CANCEL_ERROR_X: "Datoteke nisu dijeljene zato sta je zahtjev poništen.  Kliknite 'Podijeli' za ponovni pokušaj.",
           NOT_FOUND_ERROR: "Datoteka je izbrisana ili više nije vidljiva i ne može se dijeliti.",
           NOT_FOUND_ERROR_X: "Datoteke su izbrisane ili više nisu vidljive i ne mogu se dijeliti.",
           ACCESS_DENIED_ERROR: "Više nemate dozvolu za dijeljenje ove datoteke.",
           ACCESS_DENIED_ERROR_X: "Više nemate dozvolu za dijeljenje ovih datoteka.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "Datoteka koja je ograničena, ne može se napraviti javnom.",
        	   ERROR_SHARE_X: "Ograničene datoteke ne smiju se napraviti javnim."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "Uspješno ste učitali ${0} u ${1}.",
		   SUCCESS_PLURAL: "Uspješno ste učitali ${0} datoteka u ${1}.",
		   ERROR: "Datoteka se nije mogla učitati.  Molimo da pokušate ponovo kasnije.",
		   ERROR_X: "${0} se nije mogla učitati.  Molimo da pokušate ponovo kasnije.",
		   INFO_SUCCESS_PRE_MODERATION: "Datoteka ${0} je poslata na pregled i bit će dostupna po odobrenju.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} datoteka je poslato na pregled i bit će dostupne po odobrenju."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Učitaj i dijeli datoteke"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Odustani",
	   CONFIRM_OTHER_TAB: "Informacije koje ste unijeli u druge kartice bit će izgubljene ako nastavite s trenutnom akcijom.  Pritisnite OK za nastavak ili Odustani za povratak.",
	   CONFIRM_CURRENT_TAB: "Informacije koje ste unijeli na karticu ${0} bit će izgubljene ako nastavite s trenutnom akcijom.  Pritisnite OK za nastavak ili Odustani za povratak.",
	   DIALOG_TITLE: "Potvrda",
	   OK: "OK"
   }
})



