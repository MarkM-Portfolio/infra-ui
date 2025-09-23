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
	
		"ACTIONS_RENAME" : "Omdøb",
		"ACTIONS_REPLACE" : "Erstat",
		"ACTIONS_UNDO" : "Fortryd",
		"ACTIONS_REPLACE_INVALID" : "Fjern ugyldige tegn",
		"ACTIONS_TRUNCATE" : "Forkort navnet",
		"ACTIONS_REVERT": "Vend om",
		"ACTIONS_REMOVE": "Fjern fil",
	
		"LEVEL_INFO" : "Information",
		"LEVEL_WARNING" : "Advarsel",
		"LEVEL_ERROR" : "Fejl",
		
		"A11Y_INFO": "Info:",
		"A11Y_WARNING": "Advarsel:",
		"A11Y_ERROR": "Fejl:",
	
		"STATUS_REPLACE" : "Denne fil erstatter en eksisterende fil",
		"STATUS_REMOTE_DUPLICATE" : "Der findes allerede en fil med dette navn",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Der findes allerede en fil med det pågældende navn. Fortsæt med at uploade som en ny version, eller omdøb filen. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Der findes allerede en fil med dette navn i fællesskabet. Fortsæt med at uploade som en ny version, eller omdøb filen. ${0}",
	   "ACTIONS_RENAME_LONG" : "Omdøb", 
		"STATUS_LOCAL_DUPLICATE" : "Filen er allerede valgt.",
		"STATUS_TO_PREVIEW" : "Der kan ikke oprette en miniature for denne video. Skift til fildetaljerne for at tilføje et billede, som skal vises i forhåndsvisninger.",
		"STATUS_INVALID_CHARS" : "Filnavnet indeholder ugyldige tegn",
		"STATUS_NAME_TOO_LONG" : "Dette filnavn overskrider den maksimale længde på ${0} byte",
		"STATUS_RENAMED": "Det oprindelige filnavn var ${0}",
		
		"ERROR_TOO_BIG": "${0} har størrelsen ${1}. Det er større end det tilladte maksimum på ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} er ugyldig, fordi filtypen ${1} ikke er på listen over tilladte filtyper",
		"ERROR_BAD_EXT_BLACKLIST": "${0} er ugyldig, fordi filtypen ${1} er på listen over filtyper, der ikke er tilladt",
		"ERROR_IO": "${0} kunne ikke vælges af din browser.",
	
		"UI_EDIT" : "Omdøb ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Tryk på Enter for at gemme filnavnet eller Esc for at annullere",
		"UI_REMOVE" : "Fjern ${0}",
		
		"SIZE_UNKNOWN": "Ukendt",
		
		"STATE_UPLOADING" : "${0} er ved at blive uploadet",
		"STATE_UPLOADED" : "${0} er uploadet",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Vælg filer",
		"BUTTON_TEXT_WEBKIT_1": "Vælg en fil",
		"BUTTON_TEXT": "Gennemse..."
	})
	
);