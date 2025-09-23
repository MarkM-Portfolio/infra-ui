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
	   submit: {label: "Shrani", a11y: "Shrani", tooltip: "Shrani"}, 
	   cancel: {label: "Prekliči", a11y: "Prekliči", tooltip: "Prekliči"},
	   close: {label: "Zapri", a11y: "Zapri", tooltip: "Zapri"},
	   title: {global: "Daj vsebino v skupno rabo", community: "Daj v skupno rabao s skupnostjo"},
	   STATUS: {
		   ACTIONS_UNAVAILABLE: "Dejanja skupne rabe niso na voljo za ta scenarij.",
		   ACTIONS_LOAD_ERROR: "Med nalaganjem dejanj skupne rabe je prišlo do napake.",
		   CONTENT_LOAD_ERROR: "Vsebine ni mogoče naložiti. Poskusite znova pozneje ali se obrnite na skrbnika."},
	   MESSAGE: {
		      SUCCESS: "Potrditev",
		      ERROR: "Napaka",
		      ERROR_ALT_TEXT: "Napaka:",
		      INFO: "Informacije",
		      WARNING: "Opozorilo",
		      DISMISS: "Skrij to sporočilo",
		      MORE_DETAILS: "Več podrobnosti",
		      HIDE_DETAILS: "Skrij podrobnosti"
		   },
	   COMMUNITYUPLOADFILE: {
		   SHARE: "Skupna raba",
		   UPLOAD: "Naloži",
		   CANCEL: "Prekliči",
		   VISIBILITY_WARNING: "Datoteke, ki so v skupni rabi s to skupnostjo, bodo postale javne.",
		   SHARE_WITH_COMMUNITY: {
			   SUCCESS_ONE: "Datoteko ${0} ste uspešno dali v skupno rabo s skupnostjo ${1}.",
			   SUCCESS_PLURAL: "Datoteke ${0} ste uspešno dali v skupno rabo s skupnostjo ${1}.",
			   ERROR: "Datoteke ni bilo mogoče dati v skupno rabo.  Poskusite znova pozneje.",
			   ERROR_X: "Datotek ni bilo mogoče dati v skupno rabo.  Poskusite znova pozneje.",
	           MAX_SHARES_ERROR: "Največje število skupnih rab je bilo prekoračeno.",
	           EXTERNAL_SHARES_ERROR: "Datoteko je mogoče dati v skupno rabo samo znotraj organizacije.",
	           EXTERNAL_SHARES_ERROR_X: "Datoteke je mogoče dati v skupno rabo samo znotraj organizacije.",
	           NOT_LOGGED_IN_ERROR: "Datoteka ni bila dana v skupno rabo, ker niste prijavljeni.  Kliknite 'Skupna raba', če želite souporabljati datoteko.",
	           NOT_LOGGED_IN_ERROR_X: "Datoteke niso bile dane v skupno rabo, ker niste bili prijavljeni.  Kliknite 'Skupna raba', če želite souporabljati datoteke.",
	           TIMEOUT_ERROR: "Datoteka ni bila dana v skupno rabo, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Kliknite 'Skupna raba', da poskusite znova.",
	           TIMEOUT_ERROR_X: "Datoteke niso bile dane v skupno rabo, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Kliknite 'Skupna raba', da poskusite znova.",
	           CANCEL_ERROR: "Datoteka ni bila dana v skupno rabo, ker je bila zahteva preklicana.  Kliknite 'Skupna raba', da poskusite znova.",
	           CANCEL_ERROR_X: "Datoteke niso bile dane v skupno rabo, ker je bila zahteva preklicana.  Kliknite 'Skupna raba', da poskusite znova.",
	           NOT_FOUND_ERROR: "Datoteka je bila izbrisana ali pa ni več vidna in je ni mogoče dati v skupno rabo.",
	           NOT_FOUND_ERROR_X: "Datoteke so bile izbrisane ali pa niso več vidne in jih ni mogoče dati v skupno rabo.",
	           ACCESS_DENIED_ERROR: "Za souporabo te datoteke nimate dovoljenja.",
	           ACCESS_DENIED_ERROR_X: "Za souporabo teh datotek nimate dovoljenja.",
	           VISIBILITY_RESTRICTION: {
	        	   ERROR_SHARE: "Datoteke, ki je omejena, ni mogoče omogočiti za javno uporabo.",
	        	   ERROR_SHARE_X: "Datotek, ki so omejene, ni mogoče omogočiti za javno uporabo."
	           }
	         },
		   UPLOAD_TO_COMMUNITY: {
			   SUCCESS_ONE: "Datoteko ${0} ste uspešno naložili v skupnost ${1}.",
			   SUCCESS_PLURAL: "Datoteke ${0} ste uspešno naložili v skupnost ${1}.",
			   ERROR: "Datoteke ni bilo mogoče naložiti.  Poskusite znova pozneje.",
			   ERROR_X: "Datoteke ${0} ni bilo mogoče naložiti.  Poskusite znova pozneje.",
			   INFO_SUCCESS_PRE_MODERATION: "Datoteka ${0} je bila predložena v pregled in bo na voljo po odobritvi. ",
			   MULTI_INFO_SUCCESS_PRE_MODERATION: "Datoteke (${0}) so bile predložene v pregled in bodo na voljo po odobritvi."
		   }
	      },
	   UPLOADFILE: {
	      DESCRIPTION: "Naložite in souporabljajte datoteke"
	   },
	   UNSAVEDCHANGES: {
		   CANCEL: "Prekliči",
		   CONFIRM_OTHER_TAB: "Če nadaljujete s trenutnim dejanjem, bodo informacije, ki ste jih vnesli na drugih zavihkih, izgubljene. Za nadaljevanje pritisnite V redu, za vrnitev pa Prekliči.",
		   CONFIRM_CURRENT_TAB: "Če nadaljujete s trenutnim dejanjem, bodo informacije, ki ste jih vnesli na zavihku ${0}, izgubljene. Za nadaljevanje pritisnite V redu, za vrnitev pa Prekliči.",
		   DIALOG_TITLE: "Potrdi",
		   OK: "V redu"
	   }
	})
	
	
);