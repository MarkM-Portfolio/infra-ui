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
	
		"ACTIONS_RENAME" : "重命名",
		"ACTIONS_REPLACE" : "替换",
		"ACTIONS_UNDO" : "撤销",
		"ACTIONS_REPLACE_INVALID" : "除去无效字符",
		"ACTIONS_TRUNCATE" : "简化名称",
		"ACTIONS_REVERT": "还原",
		"ACTIONS_REMOVE": "除去文件",
	
		"LEVEL_INFO" : "信息",
		"LEVEL_WARNING" : "警告",
		"LEVEL_ERROR" : "错误",
		
		"A11Y_INFO": "信息：",
		"A11Y_WARNING": "警告：",
		"A11Y_ERROR": "错误：",
	
		"STATUS_REPLACE" : "该文件将替换现有文件",
		"STATUS_REMOTE_DUPLICATE" : "已存在具有该名称的文件",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "具有此名称的文件已经存在。 继续操作，将此文件将作为新版本上载，或重命名此文件。${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "此社区中已存在具有此名称的文件。 继续操作，将此文件将作为新版本上载，或重命名此文件。${0}",
	   "ACTIONS_RENAME_LONG" : "重命名", 
		"STATUS_LOCAL_DUPLICATE" : "已选择该文件。",
		"STATUS_TO_PREVIEW" : "无法为该视频创建缩略图。请转至文件详细信息，以添加要在预览中显示的图像。",
		"STATUS_INVALID_CHARS" : "该文件名包含无效字符",
		"STATUS_NAME_TOO_LONG" : "该文件名超过 ${0} 个字节的最大长度",
		"STATUS_RENAMED": "原始的文件名为 ${0}",
		
		"ERROR_TOO_BIG": "${0} 具有大小 ${1}，这比允许的最大大小 ${2} 大",
		"ERROR_BAD_EXT_WHITELIST": "${0} 无效，因为文件扩展名 ${1} 不在所允许的文件扩展名列表中",
		"ERROR_BAD_EXT_BLACKLIST": "${0} 无效，因为文件扩展名 ${1} 在被禁止的文件扩展名列表中",
		"ERROR_IO": "不能按您的浏览器选择 ${0}。",
	
		"UI_EDIT" : "重命名 ${0} (${1})",
		"UI_EDIT_TOOLTIP": "按 Enter 键保存文件名，或 Esc 键取消",
		"UI_REMOVE" : "除去 ${0}",
		
		"SIZE_UNKNOWN": "未知",
		
		"STATE_UPLOADING" : "当前，正在上载 ${0}",
		"STATE_UPLOADED" : "成功上载 ${0}",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "选择文件",
		"BUTTON_TEXT_WEBKIT_1": "选择文件",
		"BUTTON_TEXT": "浏览..."
	})
	
);