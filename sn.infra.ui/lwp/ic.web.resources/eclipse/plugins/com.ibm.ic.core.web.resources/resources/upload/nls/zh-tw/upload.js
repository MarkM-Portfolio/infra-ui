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
	
		"ACTIONS_RENAME" : "重新命名",
		"ACTIONS_REPLACE" : "取代",
		"ACTIONS_UNDO" : "復原",
		"ACTIONS_REPLACE_INVALID" : "移除無效字元",
		"ACTIONS_TRUNCATE" : "縮短名稱",
		"ACTIONS_REVERT": "回復",
		"ACTIONS_REMOVE": "移除檔案",
	
		"LEVEL_INFO" : "資訊",
		"LEVEL_WARNING" : "警告",
		"LEVEL_ERROR" : "錯誤",
		
		"A11Y_INFO": "資訊：",
		"A11Y_WARNING": "警告：",
		"A11Y_ERROR": "錯誤：",
	
		"STATUS_REPLACE" : "這個檔案會取代現有檔案",
		"STATUS_REMOTE_DUPLICATE" : "已存在具有該名稱的檔案",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "擁有相同名稱的檔案已存在。 繼續上傳作為新版本或重新命名此檔案。${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "此社群中已存在此名稱的檔案。 繼續上傳作為新版本或重新命名此檔案。${0}",
	   "ACTIONS_RENAME_LONG" : "重新命名", 
		"STATUS_LOCAL_DUPLICATE" : "已經選取這個檔案。",
		"STATUS_TO_PREVIEW" : "無法建立此影片的縮圖。請使用檔案詳細資料，新增預覽時所要顯的影像。",
		"STATUS_INVALID_CHARS" : "這個檔案名稱包含無效的字元",
		"STATUS_NAME_TOO_LONG" : "這個檔案名稱已超出長度上限 ${0} 位元組",
		"STATUS_RENAMED": "原始檔名為 ${0}",
		
		"ERROR_TOO_BIG": "${0} 的大小為 ${1}，且大於容許的上限 ${2}",
		"ERROR_BAD_EXT_WHITELIST": "${0} 無效，因為副檔名 ${1} 不在容許的副檔名清單中。",
		"ERROR_BAD_EXT_BLACKLIST": "${0} 無效，因為副檔名 ${1} 不在禁止的副檔名清單中。",
		"ERROR_IO": "無法在瀏覽器中選取 ${0}。",
	
		"UI_EDIT" : "重新命名 ${0} (${1})",
		"UI_EDIT_TOOLTIP": "請按下 Enter 以儲存檔名，或按下 Esc 以取消。",
		"UI_REMOVE" : "移除 ${0}",
		
		"SIZE_UNKNOWN": "不明",
		
		"STATE_UPLOADING" : "${0} 目前正在上傳中",
		"STATE_UPLOADED" : "${0} 已順利上傳",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "選擇檔案",
		"BUTTON_TEXT_WEBKIT_1": "選擇檔案",
		"BUTTON_TEXT": "瀏覽..."
	})
	
);