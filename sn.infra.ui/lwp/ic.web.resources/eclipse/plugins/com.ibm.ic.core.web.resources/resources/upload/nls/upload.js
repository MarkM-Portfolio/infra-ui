define({
	root: /* ***************************************************************** */
		/*                                                                   */
		/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
		
		// NLS_CHARSET=UTF-8
		({
		
			"ACTIONS_RENAME" : "Rename",
			"ACTIONS_REPLACE" : "Replace",
			"ACTIONS_UNDO" : "Undo",
			"ACTIONS_REPLACE_INVALID" : "Remove invalid characters",
			"ACTIONS_TRUNCATE" : "Shorten name",
			"ACTIONS_REVERT": "Revert",
			"ACTIONS_REMOVE": "Remove file",
		
			"LEVEL_INFO" : "Information",
			"LEVEL_WARNING" : "Warning",
			"LEVEL_ERROR" : "Error",
			
			"A11Y_INFO": "Info:",
			"A11Y_WARNING": "Warning:",
			"A11Y_ERROR": "Error:",
		
			"STATUS_REPLACE" : "This file will replace an existing file",
			"STATUS_REMOTE_DUPLICATE" : "A file with this name already exists",

		   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_GLOBAL" : "A file with this name already exists. ",
		   "STATUS_REMOTE_DUPLICATE_RENAME_CONTEXT_COLLECTION" : "A file named ${0} already exists in this folder. ",
		   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
		   "STATUS_REMOTE_DUPLICATE_RENAME_AND_REPLACE_ACTION" : "Continue to upload as a new version or rename the file. ${0}",
		   "STATUS_REMOTE_DUPLICATE_RENAME_ACTION" : "Specify a different name. ${0}",
			//${0} is ACTIONS_RENAME_LONG, word 'Rename'
		   "STATUS_REMOTE_DUPLICATE_RENAME" : "A file with this name already exists. Continue to upload as a new version or rename the file. ${0}",
		   //${0} is ACTIONS_RENAME_LONG, word 'Rename'
		   "STATUS_REMOTE_DUPLICATE_RENAME_COMMUNITY" : "A file with this name already exists in this community. Continue to upload as a new version or rename the file. ${0}",
		   "ACTIONS_RENAME_LONG" : "Rename", 
			"STATUS_LOCAL_DUPLICATE" : "The file is already selected.",
			"STATUS_TO_PREVIEW" : "A thumbnail can not be created for this video. Go to the file details to add an image to display in previews.",
			"STATUS_INVALID_CHARS" : "This file name contains invalid characters",
			"STATUS_NAME_TOO_LONG" : "This file name exceeds the maximum length of ${0} bytes",
			"STATUS_RENAMED": "The original file name was ${0}",
			
			"ERROR_TOO_BIG": "${0} has a size of ${1}, which is bigger than the allowed maximum of ${2}",
			"ERROR_BAD_EXT_WHITELIST": "${0} is invalid because the file extension ${1} is not in the list of allowed file extensions",
			"ERROR_BAD_EXT_BLACKLIST": "${0} is invalid because the file extension ${1} is in the list of prohibited file extensions",
			"ERROR_IO": "${0} could not be selected by your browser.",
		
			"UI_EDIT" : "Rename ${0} (${1})",
			"UI_EDIT_TOOLTIP": "Press Enter to save the file name, or Esc to cancel",
			"UI_REMOVE" : "Remove ${0}",
			
			"SIZE_UNKNOWN": "Unknown",
			
			"STATE_UPLOADING" : "${0} is currently being uploaded",
			"STATE_UPLOADED" : "${0} was successfully uploaded",
			
			"B": "${0} B",
			"KB": "${0} KB",
			"MB": "${0} MB",
			"GB": "${0} GB",
			
			"BUTTON_TEXT_WEBKIT": "Choose Files",
			"BUTTON_TEXT_WEBKIT_1": "Choose a File",
			"BUTTON_TEXT": "Browse..."
	}),

	"ar": true,
	"bg": true,
	"ca": true,
	"cs": true,
	"da": true,
	"de": true,
	"el": true,
	"es": true,
	"fi": true,
	"fr": true,
	"he": true,
	"hr": true,
	"hu": true,
	"id": true,
	"it": true,
	"iw": true,
	"ja": true,
	"kk": true,
	"ko": true,
	"nb": true,
	"nl": true,
	"no": true,
	"pl": true,
	"pt": true,
	"pt-br": true,
	"ro": true,
	"ru": true,
	"sk": true,
	"sl": true,
	"sv": true,
	"th": true,
	"tr": true,
	"zh": true,
	"zh-tw": true
});
