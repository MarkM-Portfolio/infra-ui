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
	
		"ACTIONS_RENAME" : "Átnevezés",
		"ACTIONS_REPLACE" : "Csere",
		"ACTIONS_UNDO" : "Visszavonás",
		"ACTIONS_REPLACE_INVALID" : "Érvénytelen karakterek eltávolítása",
		"ACTIONS_TRUNCATE" : "Név rövidítése",
		"ACTIONS_REVERT": "Visszaállítás",
		"ACTIONS_REMOVE": "Fájl eltávolítása",
	
		"LEVEL_INFO" : "Információk",
		"LEVEL_WARNING" : "Figyelmeztetés",
		"LEVEL_ERROR" : "Hiba",
		
		"A11Y_INFO": "Információk:",
		"A11Y_WARNING": "Figyelem:",
		"A11Y_ERROR": "Hiba:",
	
		"STATUS_REPLACE" : "Ez a fájl felülír egy meglévőt",
		"STATUS_REMOTE_DUPLICATE" : "Már létezik fájl ezzel a névvel",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Már létezik ilyen nevű fájl. Folytathatja a feltöltést új verzióként, vagy nevezze át a fájlt. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Ilyen nevű fájl már létezik a közösségben. Folytathatja a feltöltést új verzióként, vagy nevezze át a fájlt. ${0}",
	   "ACTIONS_RENAME_LONG" : "Átnevezés", 
		"STATUS_LOCAL_DUPLICATE" : "A fájl már ki van választva.",
		"STATUS_TO_PREVIEW" : "Nem hozható létre miniatűr a videóhoz. Menjen a fájl részleteihez egy kép hozzáadásához, amely az előnézetben fog megjelenni.",
		"STATUS_INVALID_CHARS" : "Ez a fájlnév érvénytelen karaktereket tartalmaz",
		"STATUS_NAME_TOO_LONG" : "Ez a fájlnév túllépi a maximális ${0} byte hosszt",
		"STATUS_RENAMED": "Az eredeti fájlnév ${0} volt",
		
		"ERROR_TOO_BIG": "${0} mérete ${1}, ami nagyobb, mint a legnagyobb megengedett ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} érvénytelen, mert a fájlkiterjesztés (${1}) nincs a megengedett fájlkiterjesztések listájában",
		"ERROR_BAD_EXT_BLACKLIST": "${0} érvénytelen, mert a fájlkiterjesztés (${1}( a tiltott fájlkiterjesztések listájában van",
		"ERROR_IO": "A böngésző nem tudta kiválasztani a következőt: ${0}",
	
		"UI_EDIT" : "${0} átnevezése (${1})",
		"UI_EDIT_TOOLTIP": "Az Enter megnyomásával mentse el a fájlnevet, vagy az Esc megnyomásával vonja vissza a műveletet",
		"UI_REMOVE" : "${0} eltávolítása",
		
		"SIZE_UNKNOWN": "Ismeretlen",
		
		"STATE_UPLOADING" : "${0} jelenleg feltöltés alatt",
		"STATE_UPLOADED" : "${0} feltöltése sikerült",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Fájlok kiválasztása",
		"BUTTON_TEXT_WEBKIT_1": "Fájl kiválasztása",
		"BUTTON_TEXT": "Tallózás..."
	})
	
);