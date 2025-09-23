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
	
		"ACTIONS_RENAME" : "Mudar o nome",
		"ACTIONS_REPLACE" : "Substituir",
		"ACTIONS_UNDO" : "Anular",
		"ACTIONS_REPLACE_INVALID" : "Remover caracteres não válidos",
		"ACTIONS_TRUNCATE" : "Abreviar nome",
		"ACTIONS_REVERT": "Reverter",
		"ACTIONS_REMOVE": "Remover ficheiro",
	
		"LEVEL_INFO" : "Informações",
		"LEVEL_WARNING" : "Aviso",
		"LEVEL_ERROR" : "Erro",
		
		"A11Y_INFO": "Informação:",
		"A11Y_WARNING": "Aviso:",
		"A11Y_ERROR": "Erro:",
	
		"STATUS_REPLACE" : "Este ficheiro irá substituir um ficheiro existente",
		"STATUS_REMOTE_DUPLICATE" : "Já existe um ficheiro com este nome",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Já existe um ficheiro com este nome. Continue a transferir como uma nova versão ou altere o nome do ficheiro. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Já existe um ficheiro com este nome nesta comunidade. Continue a transferir como uma nova versão ou altere o nome do ficheiro. ${0}",
	   "ACTIONS_RENAME_LONG" : "Mudar o nome", 
		"STATUS_LOCAL_DUPLICATE" : "O ficheiro já está seleccionado.",
		"STATUS_TO_PREVIEW" : "Não é possível criar uma miniatura para este vídeo. Aceda aos detalhes do ficheiro para adicionar uma imagem a apresentar em pré-visualizações.",
		"STATUS_INVALID_CHARS" : "O nome deste ficheiro contém caracteres não válidos",
		"STATUS_NAME_TOO_LONG" : "O nome deste ficheiro excede o comprimento máximo de ${0} bytes",
		"STATUS_RENAMED": "O nome original do ficheiro era ${0}",
		
		"ERROR_TOO_BIG": "${0} tem um tamanho de ${1}, o qual é superior ao máximo permitido de ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} não é válido, uma vez que a extensão do ficheiro ${1} não consta da lista de extensões de ficheiros permitidas",
		"ERROR_BAD_EXT_BLACKLIST": "${0} não é válido, uma vez que a extensão do ficheiro ${1} consta da lista de extensões de ficheiros proibidas",
		"ERROR_IO": "Não foi possível ao navegador seleccionar ${0}.",
	
		"UI_EDIT" : "Mudar o nome de ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Prima Enter para guardar o nome do ficheiro ou Esc para cancelar",
		"UI_REMOVE" : "Remover ${0}",
		
		"SIZE_UNKNOWN": "Desconhecido",
		
		"STATE_UPLOADING" : "${0} está a ser transferido",
		"STATE_UPLOADED" : "${0} foi transferido com êxito",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Seleccionar ficheiros",
		"BUTTON_TEXT_WEBKIT_1": "Seleccionar um ficheiro",
		"BUTTON_TEXT": "Pesquisar..."
	})
	
);