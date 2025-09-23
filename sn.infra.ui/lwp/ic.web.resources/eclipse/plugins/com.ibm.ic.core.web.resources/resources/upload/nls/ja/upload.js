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
	
		"ACTIONS_RENAME" : "名前変更",
		"ACTIONS_REPLACE" : "置換",
		"ACTIONS_UNDO" : "取り消し",
		"ACTIONS_REPLACE_INVALID" : "無効文字の削除",
		"ACTIONS_TRUNCATE" : "名前の短縮",
		"ACTIONS_REVERT": "元に戻す",
		"ACTIONS_REMOVE": "ファイルの削除",
	
		"LEVEL_INFO" : "情報",
		"LEVEL_WARNING" : "警告",
		"LEVEL_ERROR" : "エラー",
		
		"A11Y_INFO": "情報:",
		"A11Y_WARNING": "警告:",
		"A11Y_ERROR": "エラー:",
	
		"STATUS_REPLACE" : "このファイルは既存のファイルを置換します",
		"STATUS_REMOTE_DUPLICATE" : "この名前のファイルは既に存在しています",
		//${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME" : "この名前のファイルは既に存在しています。 ファイルを新バージョンとしてアップロードするか、ファイル名を変更してください。 ${0}",
	   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
	   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "この名前のファイルはこのコミュニティーに既に存在しています。 ファイルを新バージョンとしてアップロードするか、ファイル名を変更してください。 ${0}",
	   "ACTIONS_RENAME_LONG" : "名前変更", 
		"STATUS_LOCAL_DUPLICATE" : "ファイルは既に選択されています。",
		"STATUS_TO_PREVIEW" : "このビデオのサムネールは作成できません。ファイルの詳細に移動して、プレビューに表示されるイメージを追加してください。",
		"STATUS_INVALID_CHARS" : "ファイル名に無効文字が含まれています",
		"STATUS_NAME_TOO_LONG" : "このファイル名は最長文字数の ${0} バイトを超えています",
		"STATUS_RENAMED": "元のファイル名は ${0} でした",
		
		"ERROR_TOO_BIG": "${0} のサイズは ${1} ですが、これは許可されている最大サイズの ${2} を超えています",
		"ERROR_BAD_EXT_WHITELIST": "${0} は無効です。これはファイル拡張子の ${1} が、使用可能なファイル拡張子のリストに含まれていないためです。",
		"ERROR_BAD_EXT_BLACKLIST": "${0} は無効です。これはファイル拡張子の ${1} が、禁止されているファイル拡張子のリストに含まれているためです。",
		"ERROR_IO": "ご使用のブラウザーでは、${0} を選択することができませんでした。",
	
		"UI_EDIT" : "${0} の名前変更 (${1})",
		"UI_EDIT_TOOLTIP": "Enter を押してファイル名を保存するか、Esc を押して取り消してください",
		"UI_REMOVE" : "${0} の削除",
		
		"SIZE_UNKNOWN": "不明",
		
		"STATE_UPLOADING" : "${0} は現在アップロード中です",
		"STATE_UPLOADED" : "${0} が正常にアップロードしました",
		
		"B": "${0} B",
		"KB": "${0} KB",
		"MB": "${0} MB",
		"GB": "${0} GB",
		
		"BUTTON_TEXT_WEBKIT": "ファイルの選択",
		"BUTTON_TEXT_WEBKIT_1": "ファイルの選択",
		"BUTTON_TEXT": "参照..."
	})
	
);