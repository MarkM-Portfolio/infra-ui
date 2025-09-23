/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
   submit: {label: "Save", a11y: "Save", tooltip: "Save"}, 
   cancel: {label: "Cancel", a11y: "Cancel", tooltip: "Cancel"},
   close: {label: "Close", a11y: "Close", tooltip: "Close"},
   title: {global: "Share Something", community: "Share with a Community"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "Sharing actions are not available for this scenario.",
	   ACTIONS_LOAD_ERROR: "An error occurred loading sharing actions.",
	   CONTENT_LOAD_ERROR: "The content cannot be loaded. Try again later or contact your system administrator."},
   MESSAGE: {
	      SUCCESS: "Confirmation",
	      ERROR: "Error",
	      ERROR_ALT_TEXT: "Error:",
	      INFO: "Information",
	      WARNING: "Warning",
	      DISMISS: "Hide this message",
	      MORE_DETAILS: "More details",
	      HIDE_DETAILS: "Hide details"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "Share",
	   UPLOAD: "Upload",
	   CANCEL: "Cancel",
	   VISIBILITY_WARNING: "Files shared with this community will become public.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "You have successfully shared ${0} with ${1}.",
		   SUCCESS_PLURAL: "You have successfully shared ${0} files with ${1}.",
		   ERROR: "The file could not be shared.  Please try again later.",
		   ERROR_X: "The files could not be shared.  Please try again later.",
           MAX_SHARES_ERROR: "The maximum number of shares has been exceeded.",
           EXTERNAL_SHARES_ERROR: "The file can only be shared inside your organization.",
           EXTERNAL_SHARES_ERROR_X: "The files can only be shared inside your organization.",
           NOT_LOGGED_IN_ERROR: "The file was not shared because you were not logged in.  Click 'Share' to share the file.",
           NOT_LOGGED_IN_ERROR_X: "The files were not shared because you were not logged in.  Click 'Share' to share the files.",
           TIMEOUT_ERROR: "The file was not shared because the server could not be contacted.  Click 'Share' to try again.",
           TIMEOUT_ERROR_X: "The files were not shared because the server could not be contacted.  Click 'Share' to try again.",
           CANCEL_ERROR: "The file was not shared because the request was cancelled.  Click 'Share' to try again.",
           CANCEL_ERROR_X: "The files were not shared because the request was cancelled.  Click 'Share' to try again.",
           NOT_FOUND_ERROR: "The file has been deleted or is no longer visible to you and cannot be shared.",
           NOT_FOUND_ERROR_X: "The files have been deleted or are no longer visible to you and cannot be shared.",
           ACCESS_DENIED_ERROR: "You no longer have permission to share this file.",
           ACCESS_DENIED_ERROR_X: "You no longer have permission to share these files.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "A file that is restricted may not be made public.",
        	   ERROR_SHARE_X: "Files that are restricted may not be made public."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "You have successfully uploaded ${0} to ${1}.",
		   SUCCESS_PLURAL: "You have successfully uploaded ${0} files to ${1}.",
		   ERROR: "The file could not be uploaded.  Please try again later.",
		   ERROR_X: "${0} could not be uploaded.  Please try again later.",
		   INFO_SUCCESS_PRE_MODERATION: "The file ${0} has been submitted for review and will be available when approved.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} files have been submitted for review and will be available when approved."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Upload and share files"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Cancel",
	   CONFIRM_OTHER_TAB: "The information you have entered on the other tabs will be lost if you continue with the current action.  Press OK to continue or Cancel to return.",
	   CONFIRM_CURRENT_TAB: "The information you have entered on the ${0} tab will be lost if you continue with the current action.  Press OK to continue or Cancel to return.",
	   DIALOG_TITLE: "Confirm",
	   OK: "OK"
   }
})

