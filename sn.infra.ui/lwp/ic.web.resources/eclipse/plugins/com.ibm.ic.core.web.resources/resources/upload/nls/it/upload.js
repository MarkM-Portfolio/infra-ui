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
	
		"ACTIONS_RENAME" : "Ridenomina",
		"ACTIONS_REPLACE" : "Sostituisci",
		"ACTIONS_UNDO" : "Annulla",
		"ACTIONS_REPLACE_INVALID" : "Rimuovi caratteri non validi",
		"ACTIONS_TRUNCATE" : "Nome abbreviato",
		"ACTIONS_REVERT": "Inverti",
		"ACTIONS_REMOVE": "Rimuovi file",
	
		"LEVEL_INFO" : "Informazioni",
		"LEVEL_WARNING" : "Avviso",
		"LEVEL_ERROR" : "Errore",
		
		"A11Y_INFO": "Info:",
		"A11Y_WARNING": "Avviso:",
		"A11Y_ERROR": "Errore:",
	
		"STATUS_REPLACE" : "Questo file sostituirà un file esistente",
		"STATUS_REMOTE_DUPLICATE" : "Un file con questo nome esiste già",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Un file con questo nome esiste già. Continuare con il caricamento come nuova versione o ridenominare il file. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "In questa comunità esiste già un file con questo nome. Continuare con il caricamento come nuova versione o ridenominare il file. ${0}",
	   "ACTIONS_RENAME_LONG" : "Ridenomina", 
		"STATUS_LOCAL_DUPLICATE" : "Il file è già selezionato.",
		"STATUS_TO_PREVIEW" : "Impossibile creare una miniatura per questo video. Passare ai dettagli del file per aggiungere un'immagine da visualizzare nelle anteprime. ",
		"STATUS_INVALID_CHARS" : "Il nome di questo file contiene caratteri non validi",
		"STATUS_NAME_TOO_LONG" : "Il nome di questo file supera la lunghezza massima di ${0} byte",
		"STATUS_RENAMED": "Il nome file originale era ${0}",
		
		"ERROR_TOO_BIG": "${0} ha una dimensione di ${1}, che è maggiore del massimo consentito di ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} non è valido in quanto l'estensione file ${1} non è presente nell'elenco di estensioni file consentite",
		"ERROR_BAD_EXT_BLACKLIST": "${0} non è valido in quanto l'estensione file ${1} è presente nell'elenco di estensioni file proibite",
		"ERROR_IO": "${0} non può essere selezionato dal browser.",
	
		"UI_EDIT" : "Ridenomina ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Premere Invio per salvare il nome file o Esc per annullare l'operazione",
		"UI_REMOVE" : "Rimuovi ${0}",
		
		"SIZE_UNKNOWN": "Sconosciuto",
		
		"STATE_UPLOADING" : "${0} sta per essere caricato",
		"STATE_UPLOADED" : "${0} è stato correttamente caricato",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Scegli file",
		"BUTTON_TEXT_WEBKIT_1": "Scegli un file",
		"BUTTON_TEXT": "Sfoglia..."
	})
	
);