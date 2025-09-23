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
	
		"ACTIONS_RENAME" : "Переименовать",
		"ACTIONS_REPLACE" : "Заменить",
		"ACTIONS_UNDO" : "Отменить",
		"ACTIONS_REPLACE_INVALID" : "Удалить недопустимые символы",
		"ACTIONS_TRUNCATE" : "Сократить имя",
		"ACTIONS_REVERT": "Восстановить",
		"ACTIONS_REMOVE": "Удалить файл",
	
		"LEVEL_INFO" : "Информация",
		"LEVEL_WARNING" : "Предупреждение",
		"LEVEL_ERROR" : "Ошибка",
		
		"A11Y_INFO": "Информация:",
		"A11Y_WARNING": "Предупреждение:",
		"A11Y_ERROR": "Ошибка:",
	
		"STATUS_REPLACE" : "Этот файл заменит существующий файл",
		"STATUS_REMOTE_DUPLICATE" : "Файл с таким именем уже существует",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Файл с таким именем уже существует. Продолжите передачу в качестве новой версии или измените имя файла. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Сообщество уже содержит файл с таким именем. Продолжите передачу в качестве новой версии или измените имя файла. ${0}",
	   "ACTIONS_RENAME_LONG" : "Переименовать", 
		"STATUS_LOCAL_DUPLICATE" : "Файл уже выбран.",
		"STATUS_TO_PREVIEW" : "Уменьшенную копию для этого видео создать невозможно. Откройте свойства файла и добавьте изображение для показа при предварительном просмотре.",
		"STATUS_INVALID_CHARS" : "Имя файла содержит недопустимые символы",
		"STATUS_NAME_TOO_LONG" : "Длина имени файла превышает максимальное значение, составляющее ${0} байт",
		"STATUS_RENAMED": "Прежнее имя файла: ${0}",
		
		"ERROR_TOO_BIG": "Размер ${0} составляет ${1}, превышая максимальное значение, равное ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} недопустим, так как расширение файла ${1} не входит в список допустимых расширений",
		"ERROR_BAD_EXT_BLACKLIST": "${0} недопустим, так как расширение файла ${1} входит в список запрещенных расширений",
		"ERROR_IO": "Браузеру не удалось выбрать ${0}.",
	
		"UI_EDIT" : "Переименовать ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Нажмите Enter для сохранения имени файла или Esc для отмены",
		"UI_REMOVE" : "Удалить ${0}",
		
		"SIZE_UNKNOWN": "Неизвестно",
		
		"STATE_UPLOADING" : "${0} передается на сервер",
		"STATE_UPLOADED" : "${0} успешно передан",
		
		"B": "${0} Б",
		"KB": "${0} КБ",
		"MB": "${0} МБ",
		"GB": "${0} ГБ",
		
		"BUTTON_TEXT_WEBKIT": "Выбрать файлы",
		"BUTTON_TEXT_WEBKIT_1": "Выбрать файл",
		"BUTTON_TEXT": "Обзор..."
	})
	
);