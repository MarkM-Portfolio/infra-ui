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
	
		"ACTIONS_RENAME" : "Renombrar",
		"ACTIONS_REPLACE" : "Reemplazar",
		"ACTIONS_UNDO" : "Deshacer",
		"ACTIONS_REPLACE_INVALID" : "Suprimir caracteres no válidos",
		"ACTIONS_TRUNCATE" : "Nombre abreviado",
		"ACTIONS_REVERT": "Revertir",
		"ACTIONS_REMOVE": "Suprimir archivo",
	
		"LEVEL_INFO" : "Información",
		"LEVEL_WARNING" : "Aviso",
		"LEVEL_ERROR" : "Error",
		
		"A11Y_INFO": "Información:",
		"A11Y_WARNING": "Aviso:",
		"A11Y_ERROR": "Error:",
	
		"STATUS_REPLACE" : "Este archivo sustituirá un archivo existente",
		"STATUS_REMOTE_DUPLICATE" : "Ya existe un archivo con el mismo nombre",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Ya existe un archivo con este nombre. Continúe la carga como versión nueva o renombre el archivo. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Ya existe un archivo con este nombre en esta comunidad. Continúe la carga como versión nueva o renombre el archivo. ${0}",
	   "ACTIONS_RENAME_LONG" : "Renombrar", 
		"STATUS_LOCAL_DUPLICATE" : "El archivo ya está seleccionado.",
		"STATUS_TO_PREVIEW" : "No se puede crear una miniatura para este vídeo. Vaya a los detalles del archivo para añadir una imagen para que se muestre en las vistas previas.",
		"STATUS_INVALID_CHARS" : "Este nombre de archivo contiene caracteres no válidos",
		"STATUS_NAME_TOO_LONG" : "Este nombre de archivo supera la longitud máxima de ${0} bytes",
		"STATUS_RENAMED": "El nombre de archivo original era ${0}",
		
		"ERROR_TOO_BIG": "${0} tiene un tamaño de ${1}, lo cual es mayor que el máximo permitido de ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} no es válida porque la extensión de archivo ${1} no se encuentra en la lista de extensiones de archivo permitidas",
		"ERROR_BAD_EXT_BLACKLIST": "${0} no es válida porque la extensión de archivo ${1} se encuentra en la lista de extensiones de archivo prohibidas",
		"ERROR_IO": "El navegador no ha podido seleccionar ${0}.",
	
		"UI_EDIT" : "Renombrar ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Pulse Intro para guardar el nombre de archivo o Esc para cancelar",
		"UI_REMOVE" : "Eliminar ${0}",
		
		"SIZE_UNKNOWN": "Desconocido",
		
		"STATE_UPLOADING" : "${0} se está cargando en estos momentos",
		"STATE_UPLOADED" : "${0} se ha cargado satisfactoriamente",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "Elegir archivos",
		"BUTTON_TEXT_WEBKIT_1": "Seleccionar un archivo",
		"BUTTON_TEXT": "Examinar..."
	})
	
);