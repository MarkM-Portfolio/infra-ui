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
	
		"ACTIONS_RENAME" : "이름 변경",
		"ACTIONS_REPLACE" : "대체",
		"ACTIONS_UNDO" : "실행 취소",
		"ACTIONS_REPLACE_INVALID" : "올바르지 않은 문자 제거",
		"ACTIONS_TRUNCATE" : "이름 축약",
		"ACTIONS_REVERT": "되돌리기",
		"ACTIONS_REMOVE": "파일 제거",
	
		"LEVEL_INFO" : "정보",
		"LEVEL_WARNING" : "경고",
		"LEVEL_ERROR" : "오류",
		
		"A11Y_INFO": "정보:",
		"A11Y_WARNING": "경고:",
		"A11Y_ERROR": "오류:",
	
		"STATUS_REPLACE" : "이 파일은 기존 파일을 대체합니다.",
		"STATUS_REMOTE_DUPLICATE" : "이 이름으로 된 파일이 이미 있습니다.",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "이 이름의 파일이 이미 존재합니다. 새 버전으로 계속 업로드하거나 파일 이름을 변경하십시오. ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "이 이름의 파일이 이 커뮤니티에 있습니다. 새 버전으로 계속 업로드하거나 파일 이름을 변경하십시오. ${0}",
	   "ACTIONS_RENAME_LONG" : "이름 변경", 
		"STATUS_LOCAL_DUPLICATE" : "파일을 이미 선택했습니다.",
		"STATUS_TO_PREVIEW" : "이 비디오에 대해 작은 그림을 작성할 수 없습니다. 파일 세부사항으로 이동하여 미리보기에 표시할 이미지를 추가하십시오.",
		"STATUS_INVALID_CHARS" : "이 파일 이름에 올바르지 않은 문자가 포함되어 있습니다.",
		"STATUS_NAME_TOO_LONG" : "이 파일 이름이 최대 길이인 ${0}바이트를 초과합니다.",
		"STATUS_RENAMED": "원래 파일 이름은 ${0}입니다.",
		
		"ERROR_TOO_BIG": "${0}이(가) ${1} 크기로, 허용된 최대 크기인 ${2}보다 큽니다.",
		"ERROR_BAD_EXT_WHITELIST": "파일 확장자 ${1}이(가) 허용된 파일 확장자 목록에 포함되어 있지 않으므로 ${0}은(는) 올바르지 않습니다.",
		"ERROR_BAD_EXT_BLACKLIST": "파일 확장자 ${1}이(가) 금지된 파일 확장자 목록에 포함되어 있으므로 ${0}은(는) 올바르지 않습니다.",
		"ERROR_IO": "${0}은(는) 사용자의 브라우저에서 선택할 수 없습니다.",
	
		"UI_EDIT" : "이름 변경 ${0} (${1})",
		"UI_EDIT_TOOLTIP": "이 파일 이름을 저장하려면 Enter를 누르고, 취소하려면 Esc를 누르십시오.",
		"UI_REMOVE" : "${0} 제거",
		
		"SIZE_UNKNOWN": "알 수 없음",
		
		"STATE_UPLOADING" : "${0}이(가) 현재 업로드 중입니다.",
		"STATE_UPLOADED" : "${0}이(가) 업로드되었습니다.",
		
		"B": "${0}B",
		"KB": "${0}KB",
		"MB": "${0}MB",
		"GB": "${0}GB",
		
		"BUTTON_TEXT_WEBKIT": "파일 선택",
		"BUTTON_TEXT_WEBKIT_1": "파일 선택",
		"BUTTON_TEXT": "찾아보기..."
	})
	
);