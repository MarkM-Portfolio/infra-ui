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
	
		"ACTIONS_RENAME" : "Renommer",
		"ACTIONS_REPLACE" : "Remplacer",
		"ACTIONS_UNDO" : "Annuler",
		"ACTIONS_REPLACE_INVALID" : "Supprimer les caractères non valides",
		"ACTIONS_TRUNCATE" : "Raccourcir le nom",
		"ACTIONS_REVERT": "Revenir",
		"ACTIONS_REMOVE": "Retirer le fichier",
	
		"LEVEL_INFO" : "Informations",
		"LEVEL_WARNING" : "Avertissement",
		"LEVEL_ERROR" : "Erreur",
		
		"A11Y_INFO": "Information :",
		"A11Y_WARNING": "Avertissement :",
		"A11Y_ERROR": "Erreur :",
	
		"STATUS_REPLACE" : "Ce fichier va remplacer un fichier existant",
		"STATUS_REMOTE_DUPLICATE" : "Un fichier portant ce nom existe déjà",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Un fichier de ce nom existe déjà. Poursuivez l'envoi par téléchargement en tant que nouvelle version ou renommez le fichier. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Un fichier de ce nom existe déjà dans cette communauté. Poursuivez l'envoi par téléchargement en tant que nouvelle version ou renommez le fichier. ${0}",
	   "ACTIONS_RENAME_LONG" : "Renommer", 
		"STATUS_LOCAL_DUPLICATE" : "Le fichier est déjà sélectionné.",
		"STATUS_TO_PREVIEW" : "Impossible de créer une miniature pour cette vidéo. Accédez aux détails du fichier pour ajouter une image à afficher dans les prévisualisations.",
		"STATUS_INVALID_CHARS" : "Le nom de fichier contient des caractères non valides",
		"STATUS_NAME_TOO_LONG" : "Le nom de fichier dépasse la longueur maximale de ${0} octets",
		"STATUS_RENAMED": "Le nom de fichier original était ${0}",
		
		"ERROR_TOO_BIG": "${0} présente une taille de ${1}, qui est plus importante que la taille maximale autorisée : ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} est non valide car l'extension de fichier ${1} n'est pas présente dans la liste des extensions de fichier autorisées",
		"ERROR_BAD_EXT_BLACKLIST": "${0} est non valide car l'extension de fichier ${1} est pas présente dans la liste des extensions de fichier interdites",
		"ERROR_IO": "${0} n'a pas pu être sélectionné par votre navigateur",
	
		"UI_EDIT" : "Renommer ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Appuyez sur la touche Entrée pour enregistrer le nom de fichier, ou sur la touche Echap pour annuler",
		"UI_REMOVE" : "Supprimer ${0}",
		
		"SIZE_UNKNOWN": "Inconnu",
		
		"STATE_UPLOADING" : "${0} est en cours d'envoi par téléchargement",
		"STATE_UPLOADED" : "${0} a été envoyé par téléchargement",
		
		"B": "${0} o",
		"KB": "${0} ko",
		"MB": "${0} Mo",
		"GB": "${0} Go",
		
		"BUTTON_TEXT_WEBKIT": "Sélectionner les fichiers",
		"BUTTON_TEXT_WEBKIT_1": "Choisir un fichier",
		"BUTTON_TEXT": "Parcourir..."
	})
	
);