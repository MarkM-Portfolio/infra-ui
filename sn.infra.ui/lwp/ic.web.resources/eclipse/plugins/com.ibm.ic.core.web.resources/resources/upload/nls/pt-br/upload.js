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
	
		"ACTIONS_RENAME" : "Renomear",
		"ACTIONS_REPLACE" : "Substituir",
		"ACTIONS_UNDO" : "Desfazer",
		"ACTIONS_REPLACE_INVALID" : "Remover caracteres inválidos",
		"ACTIONS_TRUNCATE" : "Nome abreviado",
		"ACTIONS_REVERT": "Reverter",
		"ACTIONS_REMOVE": "Remover arquivo",
	
		"LEVEL_INFO" : "Informações",
		"LEVEL_WARNING" : "Aviso",
		"LEVEL_ERROR" : "Erro",
		
		"A11Y_INFO": "Informações:",
		"A11Y_WARNING": "Aviso:",
		"A11Y_ERROR": "Erro:",
	
		"STATUS_REPLACE" : "Esse arquivo substituirá um arquivo existente",
		"STATUS_REMOTE_DUPLICATE" : "Um arquivo com esse nome já existe",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Já existe um arquivo com este nome. Continue para fazer o upload como uma nova versão ou renomeie o arquivo. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Um arquivo com este nome já existe nesta comunidade. Continue para fazer o upload como uma nova versão ou renomeie o arquivo. ${0}",
	   "ACTIONS_RENAME_LONG" : "Renomear", 
		"STATUS_LOCAL_DUPLICATE" : "O arquivo já está selecionado.",
		"STATUS_TO_PREVIEW" : "Uma miniatura não pode ser criada para esse vídeo. Acesse os detalhes do arquivo para incluir uma imagem a ser exibida em visualizações.",
		"STATUS_INVALID_CHARS" : "Esse nome de arquivo contém caracteres inválidos",
		"STATUS_NAME_TOO_LONG" : "Esse nome de arquivo excede o comprimento máximo de ${0} bytes",
		"STATUS_RENAMED": "O nome do arquivo original era ${0}",
		
		"ERROR_TOO_BIG": "${0} tem um tamanho de ${1}, que é maior que o máximo permitido de ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} é inválido, pois a extensão do arquivo ${1} não está na lista de extensões de arquivo permitidas",
		"ERROR_BAD_EXT_BLACKLIST": "${0} é inválido, pois a extensão do arquivo ${1} está na lista de extensões de arquivo proibidas",
		"ERROR_IO": "${0} não pôde ser selecionado pelo navegador.",
	
		"UI_EDIT" : "Renomear ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Pressione Enter para salvar o nome do arquivo, ou Esc para cancelar",
		"UI_REMOVE" : "Remover ${0}",
		
		"SIZE_UNKNOWN": "Desconhecido",
		
		"STATE_UPLOADING" : "${0} está sendo transferido por upload no momento",
		"STATE_UPLOADED" : "${0} foi transferido por upload com êxito",
		
		"B": "${0}B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Escolher Arquivos",
		"BUTTON_TEXT_WEBKIT_1": "Escolha um Arquivo",
		"BUTTON_TEXT": "Procurar..."
	})
	
);