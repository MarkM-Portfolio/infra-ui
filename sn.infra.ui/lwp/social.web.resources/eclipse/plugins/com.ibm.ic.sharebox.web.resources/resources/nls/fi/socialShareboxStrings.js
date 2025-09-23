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
	   submit: {label: "Tallenna", a11y: "Tallenna", tooltip: "Tallenna"}, 
	   cancel: {label: "Peruuta", a11y: "Peruuta", tooltip: "Peruuta"},
	   close: {label: "Sulje", a11y: "Sulje", tooltip: "Sulje"},
	   title: {global: "Määritä jotakin yhteiskäyttöön", community: "Määritä yhteiskäyttöön yhteisön kanssa"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Yhteiskäyttötoiminnot eivät ole käytettävissä tässä skenaariossa.",
		   ACTIONS_LOAD_ERROR: "Yhteiskäyttötoimintojen latauksessa on ilmennyt virhe.",
		   CONTENT_LOAD_ERROR: "Sisällön lataus ei onnistu. Yritä uudelleen tai ota yhteys järjestelmän pääkäyttäjään."},
	   MESSAGE: {
		      SUCCESS: "Vahvistus",
		      ERROR: "Virhe",
		      ERROR_ALT_TEXT: "Virhe:",
		      INFO: "Ilmoitus",
		      WARNING: "Varoitus",
		      DISMISS: "Piilota tämä sanoma",
		      MORE_DETAILS: "Lisätietoja",
		      HIDE_DETAILS: "Piilota tiedot"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Määritä yhteiskäyttöön",
		   UPLOAD: "Siirrä",
		   CANCEL: "Peruuta",
		   VISIBILITY_WARNING: "Tiedostoista, jotka on määritetty yhteiskäyttöön tähän yhteisöön, tulee julkisia.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Olet määrittänyt tiedoston ${0} yhteiskäyttöön seuraavien kanssa: ${1}.",
			   SUCCESS_PLURAL: "Olet määrittänyt ${0} tiedostoa yhteiskäyttöön seuraavien kanssa: ${1}.",
			   ERROR: "Tiedoston luovutus yhteiskäyttöön ei onnistunut.  Yritä myöhemmin uudelleen.",
			   ERROR_X: "Tiedostojen luovutus yhteiskäyttöön ei onnistunut.  Yritä myöhemmin uudelleen.",
	           MAX_SHARES_ERROR: "Yhteiskäyttökohteiden enimmäismäärä on ylittynyt.",
	           EXTERNAL_SHARES_ERROR: "Tiedosto voidaan määrittää yhteiskäyttöön vain organisaation sisäisesti.",
	           EXTERNAL_SHARES_ERROR_X: "Tiedostot voidaan määrittää yhteiskäyttöön vain organisaation sisäisesti.",
	           NOT_LOGGED_IN_ERROR: "Tiedoston luovutus yhteiskäyttöön ei onnistunut, koska et ollut kirjautunut sisään.  Määritä tiedosto yhteiskäyttöön napsauttamalla Määritä yhteiskäyttöön -painiketta.",
	           NOT_LOGGED_IN_ERROR_X: "Tiedostojen määritys yhteiskäyttöön ei onnistunut, koska et ollut kirjautunut sisään.  Määritä tiedostot yhteiskäyttöön napsauttamalla Määritä yhteiskäyttöön -painiketta.",
	           TIMEOUT_ERROR: "Tiedoston luovutus yhteiskäyttöön ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä uudelleen napsauttamalla Määritä yhteiskäyttöön -painiketta.",
	           TIMEOUT_ERROR_X: "Tiedostojen määritys yhteiskäyttöön ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä uudelleen napsauttamalla Määritä yhteiskäyttöön -painiketta.",
	           CANCEL_ERROR: "Tiedoston luovutus yhteiskäyttöön ei onnistunut, koska pyyntö peruutettiin.  Yritä uudelleen napsauttamalla Määritä yhteiskäyttöön -painiketta.",
	           CANCEL_ERROR_X: "Tiedostojen määritys yhteiskäyttöön ei onnistunut, koska pyyntö peruutettiin.  Yritä uudelleen napsauttamalla Määritä yhteiskäyttöön -painiketta.",
	           NOT_FOUND_ERROR: "Tiedosto on poistettu, tai se ei ole enää näkyvissä, eikä sitä voi määrittää yhteiskäyttöön.",
	           NOT_FOUND_ERROR_X: "Tiedostot on poistettu, tai ne eivät ole enää näkyvissä, eikä niitä voi määrittää yhteiskäyttöön.",
	           ACCESS_DENIED_ERROR: "Sinulla ei ole enää oikeuksia määrittää tätä tiedostoa yhteiskäyttöön.",
	           ACCESS_DENIED_ERROR_X: "Sinulla ei ole enää oikeuksia määrittää näitä tiedostoja yhteiskäyttöön.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Rajoitettua tiedostoa ei voi määrittää julkiseksi.",
	        	   ERROR_SHARE_X: "Rajoitettuja tiedostoja ei voi määrittää julkisiksi."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Olet siirtänyt tiedoston ${0} yhteisöön ${1}.",
			   SUCCESS_PLURAL: "Olet siirtänyt ${0} tiedostoa yhteisöön ${1}.",
			   ERROR: "Tiedoston siirto ei onnistunut.  Yritä myöhemmin uudelleen.",
			   ERROR_X: "Tiedoston ${0} siirto ei onnistunut.  Yritä myöhemmin uudelleen.",
			   INFO_SUCCESS_PRE_MODERATION: "Tiedosto ${0} on lähetetty tarkistettavaksi. Tiedosto on käytettävissä, kun se hyväksytään.",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} tiedostoa on lähetetty tarkistettavaksi. Tiedostot ovat käytettävissä, kun ne on hyväksytty."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Siirrä tiedostoja ja määritä niitä yhteiskäyttöön."
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Peruuta",
		   CONFIRM_OTHER_TAB: "Muissa välilehdissä antamasi tiedot katoavat, jos jatkat meneillään olevaa toimintoa.  Jatka napsauttamalla OK-painiketta tai palaa napsauttamalla Peruuta-painiketta.",
		   CONFIRM_CURRENT_TAB: "Välilehdessä ${0} antamasi tiedot katoavat, jos jatkat meneillään olevaa toimintoa.  Jatka napsauttamalla OK-painiketta tai palaa napsauttamalla Peruuta-painiketta.",
		   DIALOG_TITLE: "Vahvista",
		   OK: "OK"
	   }
	})
	
	
);