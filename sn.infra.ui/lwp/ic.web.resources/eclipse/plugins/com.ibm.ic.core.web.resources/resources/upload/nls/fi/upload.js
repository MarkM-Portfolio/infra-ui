define(
	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2014                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	// NLS_CHARSET=UTF-8
	({
	
		"ACTIONS_RENAME" : "Nimeä uudelleen",
		"ACTIONS_REPLACE" : "Korvaa",
		"ACTIONS_UNDO" : "Kumoa",
		"ACTIONS_REPLACE_INVALID" : "Poista virheelliset merkit",
		"ACTIONS_TRUNCATE" : "Lyhennä nimeä",
		"ACTIONS_REVERT": "Palauta",
		"ACTIONS_REMOVE": "Poista tiedosto",
	
		"LEVEL_INFO" : "Ilmoitus",
		"LEVEL_WARNING" : "Varoitus",
		"LEVEL_ERROR" : "Virhe",
		
		"A11Y_INFO": "Tietoja:",
		"A11Y_WARNING": "Varoitus:",
		"A11Y_ERROR": "Virhe:",
	
		"STATUS_REPLACE" : "Tiedosto korvaa aiemmin luodun tiedoston",
		"STATUS_REMOTE_DUPLICATE" : "Samanniminen tiedosto on jo järjestelmässä",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Järjestelmässä on jo samanniminen tiedosto. Jatketaanko tiedoston siirtoa uutena versiona vai nimetäänkö tiedosto uudelleen? ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Yhteisössä on jo samanniminen tiedosto. Jatketaanko tiedoston siirtoa uutena versiona vai nimetäänkö tiedosto uudelleen? ${0}",
	   "ACTIONS_RENAME_LONG" : "Nimeä uudelleen", 
		"STATUS_LOCAL_DUPLICATE" : "Tiedosto on jo valittu.",
		"STATUS_TO_PREVIEW" : "Videon pienoiskuvaa ei voi luoda. Siirry tiedoston tietoihin ja lisää esikatselunäkymässä näytettävä kuva.",
		"STATUS_INVALID_CHARS" : "Tiedoston nimi sisältää virheellisiä merkkejä",
		"STATUS_NAME_TOO_LONG" : "Tiedoston nimi on pidempi kuin enimmäispituus ${0} tavua",
		"STATUS_RENAMED": "Alkuperäinen tiedoston nimi oli ${0}",
		
		"ERROR_TOO_BIG": "Tiedoston ${0} koko ${1} on suurempi kuin sallittu enimmäiskoko ${2}",
		"ERROR_BAD_EXT_WHITELIST": "Tiedosto ${0} ei kelpaa, koska tiedoston tunniste ${1} ei ole sallittujen tiedoston tunnisteiden luettelossa",
		"ERROR_BAD_EXT_BLACKLIST": "Tiedosto ${0} ei kelpaa, koska tiedoston tunniste ${1} on estettyjen tiedoston tunnisteiden luettelossa",
		"ERROR_IO": "Tiedoston ${0} valinta selaimessa ei onnistunut.",
	
		"UI_EDIT" : "Nimeä uudelleen tiedosto ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Tallenna tiedoston nimi painamalla Enter-näppäintä tai peruuta painamalla Esc-näppäintä",
		"UI_REMOVE" : "Poista ${0}",
		
		"SIZE_UNKNOWN": "Tuntematon",
		
		"STATE_UPLOADING" : "Tiedoston ${0} siirto palvelimeen on meneillään",
		"STATE_UPLOADED" : "Tiedosto ${0} on siirretty palvelimeen",
		
		"B": "${0} t",
		"KB": "${0} kt",
		"MB": "${0} Mt",
		"GB": "${0} Gt",
		
		"BUTTON_TEXT_WEBKIT": "Valitse tiedostot",
		"BUTTON_TEXT_WEBKIT_1": "Valitse tiedosto",
		"BUTTON_TEXT": "Selaa..."
	})
	
);