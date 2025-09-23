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
	
		"ACTIONS_RENAME" : "Ändra namn",
		"ACTIONS_REPLACE" : "Ersätt",
		"ACTIONS_UNDO" : "Ångra",
		"ACTIONS_REPLACE_INVALID" : "Ta bort ogiltiga tecken",
		"ACTIONS_TRUNCATE" : "Korta av namnet",
		"ACTIONS_REVERT": "Återställ",
		"ACTIONS_REMOVE": "Ta bort fil",
	
		"LEVEL_INFO" : "Information",
		"LEVEL_WARNING" : "Varning",
		"LEVEL_ERROR" : "Fel",
		
		"A11Y_INFO": "Information:",
		"A11Y_WARNING": "Varning:",
		"A11Y_ERROR": "Fel:",
	
		"STATUS_REPLACE" : "Den här filen kommer att ersätta en befintlig fil",
		"STATUS_REMOTE_DUPLICATE" : "Det finns redan en fil med det här namnet",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Det finns redan en fil med det angivna namnet. Om du vill kan du överföra filen som en ny version eller ändra namn på den. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Det finns redan en fil med det här namnet i gemenskapen. Om du vill kan du överföra filen som en ny version eller ändra namn på den. ${0}",
	   "ACTIONS_RENAME_LONG" : "Ändra namn", 
		"STATUS_LOCAL_DUPLICATE" : "Du har redan valt filen.",
		"STATUS_TO_PREVIEW" : "Det går inte att skapa någon miniatyrbild för det här videoklippet. Om du vill lägga till en bild som ska visas i förhandsgranskningar går du till fildetaljerna.",
		"STATUS_INVALID_CHARS" : "Filnamnet innehåller ogiltiga tecken",
		"STATUS_NAME_TOO_LONG" : "Filnamnet är längre än den största tillåta längden, ${0} byte",
		"STATUS_RENAMED": "Det ursprungliga filnamnet var ${0}",
		
		"ERROR_TOO_BIG": "${0} har storleken ${1}, vilket är större än den största tillåtna storleken, ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} är ogiltig eftersom filtillägget ${1} inte finns med i listan med tillåtna filtillägg",
		"ERROR_BAD_EXT_BLACKLIST": "${0} är ogiltig eftersom filtillägget ${1} finns med i listan med otillåtna filtillägg",
		"ERROR_IO": "Det gick inte att välja ${0} på grund av webbläsaren.",
	
		"UI_EDIT" : "Ändra namn på ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Om du vill spara filnamnet trycker du på Enter, om du vill avbryta trycker du på Esc.",
		"UI_REMOVE" : "Ta bort ${0}",
		
		"SIZE_UNKNOWN": "Okänt",
		
		"STATE_UPLOADING" : "${0} överförs",
		"STATE_UPLOADED" : "${0} överfördes",
		
		"B": "${0} B",
		"KB": "${0} kB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Välj filer",
		"BUTTON_TEXT_WEBKIT_1": "Välj en fil",
		"BUTTON_TEXT": "Bläddra..."
	})
	
);