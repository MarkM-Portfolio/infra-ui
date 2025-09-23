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
	
		"ACTIONS_RENAME" : "Umbenennen",
		"ACTIONS_REPLACE" : "Ersetzen",
		"ACTIONS_UNDO" : "Rückgängig machen",
		"ACTIONS_REPLACE_INVALID" : "Ungültige Zeichen entfernen",
		"ACTIONS_TRUNCATE" : "Name kürzen ",
		"ACTIONS_REVERT": "Aufheben ",
		"ACTIONS_REMOVE": "Datei entfernen ",
	
		"LEVEL_INFO" : "Information",
		"LEVEL_WARNING" : "Warnung ",
		"LEVEL_ERROR" : "Fehler",
		
		"A11Y_INFO": "Info:",
		"A11Y_WARNING": "Warnung:",
		"A11Y_ERROR": "Fehler:",
	
		"STATUS_REPLACE" : "Diese Datei ersetzt eine vorhandene Datei. ",
		"STATUS_REMOTE_DUPLICATE" : "Es ist bereits eine Datei mit diesem Namen vorhanden. ",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Es ist bereits eine Datei mit diesem Namen vorhanden. Laden Sie die Datei als neue Version hoch oder benennen Sie sie um. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Es ist bereits eine Datei mit diesem Namen in der Community vorhanden. Laden Sie die Datei als neue Version hoch oder benennen Sie sie um. ${0}",
	   "ACTIONS_RENAME_LONG" : "Umbenennen", 
		"STATUS_LOCAL_DUPLICATE" : "Die Datei ist bereits ausgewählt.",
		"STATUS_TO_PREVIEW" : "Für dieses Video kann kein Piktogramm erstellt werden. Rufen Sie die Dateidetails auf, um ein Bild für die Anzeige in der Vorschau hinzuzufügen.",
		"STATUS_INVALID_CHARS" : "Dieser Dateiname enthält ungültige Zeichen. ",
		"STATUS_NAME_TOO_LONG" : "Dieser Dateiname überschreitet die Maximalgröße von ${0} Byte. ",
		"STATUS_RENAMED": "Der ursprüngliche Dateiname lautet ${0}.",
		
		"ERROR_TOO_BIG": "${0} hat die Größe ${1}. Dies überschreitet die Maximalgröße von ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} ist ungültig, weil die Dateierweiterung ${1} nicht in der Liste der zulässigen Dateierweiterungen gespeichert ist. ",
		"ERROR_BAD_EXT_BLACKLIST": "${0} ist ungültig, weil die Dateierweiterung ${1} in der Liste unzulässiger Dateierweiterungen gespeichert ist. ",
		"ERROR_IO": "${0} konnte vom Browser nicht ausgewählt werden. ",
	
		"UI_EDIT" : "${0} umbenennen (${1})",
		"UI_EDIT_TOOLTIP": "Drücken Sie die Eingabetaste, um den Dateinamen zu speichern, oder Esc, um den Vorgang abzubrechen. ",
		"UI_REMOVE" : "${0} entfernen",
		
		"SIZE_UNKNOWN": "Unbekannt",
		
		"STATE_UPLOADING" : "${0} wird derzeit hochgeladen. ",
		"STATE_UPLOADED" : "${0} wurde hochgeladen. ",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Dateien auswählen ",
		"BUTTON_TEXT_WEBKIT_1": "Datei auswählen ",
		"BUTTON_TEXT": "Durchsuchen... "
	})
	
);