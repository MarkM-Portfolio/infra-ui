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
	
		"ACTIONS_RENAME" : "Преименуване",
		"ACTIONS_REPLACE" : "Заместване",
		"ACTIONS_UNDO" : "Отмяна",
		"ACTIONS_REPLACE_INVALID" : "Премахване на невалидните символи",
		"ACTIONS_TRUNCATE" : "Съкращаване на името",
		"ACTIONS_REVERT": "Връщане",
		"ACTIONS_REMOVE": "Премахване на файла",
	
		"LEVEL_INFO" : "Информация",
		"LEVEL_WARNING" : "Предупреждение",
		"LEVEL_ERROR" : "Грешка",
		
		"A11Y_INFO": "Информация:",
		"A11Y_WARNING": "Предупреждение:",
		"A11Y_ERROR": "Грешка:",
	
		"STATUS_REPLACE" : "Този файл ще подмени съществуващ файл",
		"STATUS_REMOTE_DUPLICATE" : "Вече съществува файл с това име",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "Вече съществува файл с това име. Продължете, за да качите нова версия или да промените името на файла. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "Вече съществува файл с това име в тази общност. Продължете, за да качите нова версия или да промените името на файла. ${0}",
	   "ACTIONS_RENAME_LONG" : "Преименуване", 
		"STATUS_LOCAL_DUPLICATE" : "Файлът вече е избран.",
		"STATUS_TO_PREVIEW" : "Не може да се създаде миниатюра за това видео. Отидете до подробностите за файл, за да добавите изображение за показване в предварителни прегледи.",
		"STATUS_INVALID_CHARS" : "Името на файла съдържа невалидни символи",
		"STATUS_NAME_TOO_LONG" : "Името на файла надвишава максималната дължина от ${0} байта",
		"STATUS_RENAMED": "Оригиналното име на файл е било ${0}",
		
		"ERROR_TOO_BIG": "${0} е с размер от ${1}, който е по-голям от позволения максимум от ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} е невалидно, защото файловото разширение ${1} не е в списъка с позволени файлови разширения",
		"ERROR_BAD_EXT_BLACKLIST": "${0} е невалидно, защото файловото разширение ${1} е в списъка със забранени файлови разширения",
		"ERROR_IO": "${0} не можа да се избере от браузъра Ви.",
	
		"UI_EDIT" : "Преименуване на ${0} (${1})",
		"UI_EDIT_TOOLTIP": "Натиснете Enter, за да запазите името на файла, или Esc за отказ",
		"UI_REMOVE" : "Премахване на ${0}",
		
		"SIZE_UNKNOWN": "Неизвестно",
		
		"STATE_UPLOADING" : "${0} в момента се качва",
		"STATE_UPLOADED" : "${0} се качи успешно",
		
		"B": "${0} Б",
		"KB": "${0} КБ",
		"MB": "${0} МБ",
		"GB": "${0} ГБ",
		
		"BUTTON_TEXT_WEBKIT": "Избор на файлове",
		"BUTTON_TEXT_WEBKIT_1": "Избор на файл",
		"BUTTON_TEXT": "Преглеждане..."
	})
	
);