/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
   root: ({
      FILE_VIEWER_TITLE: "File preview",
      FILENAME_TOOLTIP: "Edit file name",
      ICON_TOOLTIP: "Download file",
      ERROR: "An error has occurred.",
      FILE_MALICIOUS: "Scanning revealed malicious content",
      SHARED_EXTERNALLY: "Shared externally",
      FILE_SYNCED: "Added to sync",
      MY_DRIVE: {
         TITLE: "In My Drive",
         ROOT_FOLDER: "/My Drive",
         FOLDER: "/My Drive/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "More Actions",
         A11Y: "Opens a drop-down menu with a list of more actions to perform on the file.",
            PANELS: {
               TITLE: "More",
               A11Y: "Opens a drop-down menu with a list of hidden panels"
            }
      },
      WELCOME: {
         TITLE: "We've Combined File View and Details",
         SUBTITLE: "Now you can view a file and its comments side-by-side.",
         LINES: {
            LINE_1: "All the information and things you could do on the old page are found here.",
            LINE_2: "Comments, sharing, versions, and basic information are available to the side of the file."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "This button navigates to the next file.",
         PREVIOUS_A11Y: "This button navigates to the previous file."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "More editing options",
            A11Y: "This button opens a menu for more editing options."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Edit"
            },
            UPLOAD: {
               TITLE: "Upload"
            },
            CREATE: {
              TITLE: "Create"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Resize the panel",
           USAGE: "Press left bracket or right bracket keys to resize the panel."
       },
         CLOSE: {
            TOOLTIP: "Close",
            A11Y: "This button closes the file viewer.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Your file is still uploading.",
              PROMPT: "Your file is still uploading. If you close before it completes, the upload will be canceled.",
              OK: "Close Anyway",
              CANCEL: "Wait for Upload"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Add to Files",
           A11Y: "This button adds the attachment to Files.",
           VIEW_NOW: "View Now"
         },
         TEAR_OFF: {
           TOOLTIP: "Open in new window",
           A11Y: "Open in new window",
           ERROR_TEARING_OFF: "There was an error opening the new window.",
           DIALOG_TITLE: "Confirm",
           UNSAVED_CHANGES_WARNING: "You have unsaved changes which will be lost. Do you want to open in a new window anyway?",
           OK: "Yes",
           CANCEL: "No",
           OPEN: "Open",
           OPEN_ANYWAY: "Open Anyway",
           CANCEL_ALT: "Cancel"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "New from File",
            ACTION_NAME:"Create File",
            A11Y: {
               TEXT: "Create a document (DOC, DOCX or ODT file) from a template file. You can edit these documents online in Docs.",
               PRES: "Create a presentation (PPT, PPTX or ODP file) from a template file. You can edit these presentations online in Docs.",
               SHEET: "Create a spreadsheet (XLS, XLSX or ODS file) from a template file. You can edit these spreadsheets online in Docs."
            },
            PROMPT: {
               TEXT: "Create a document (DOC, DOCX or ODT file) from a template file. You can edit these documents online in Docs.",
               PRES: "Create a presentation (PPT, PPTX or ODP file) from a template file. You can edit these presentations online in Docs.",
               SHEET: "Create a spreadsheet (XLS, XLSX or ODS file) from a template file. You can edit these spreadsheets online in Docs."
            },
            NAME_FIELD: "Name:",
            EXTERNAL_FIELD: "Files can be shared with people external to my organization",
            EXTERNAL_DESC: "External access allows files to be shared with external users (people outside of your organization or company), folders shared with external users, and communities with external people as members. You must set external access when uploading a file; it cannot be turned on later.",
            CREATE_BUTTON: "Create",
            CANCEL: "Cancel",
            PRE_FILL_NAMES: {
               OTT: "Untitled Document",
               OTS: "Untitled Spreadsheet",
               OTP: "Untitled Presentation",
               DOT: "Untitled Document",
               XLT: "Untitled Spreadsheet",
               POT: "Untitled Presentation",
               DOTX: "Untitled Document",
               XLTX: "Untitled Spreadsheet",
               POTX: "Untitled Presentation"
            },
            ERRORS: {
               NAME_REQUIRED: "Document name is required.",
               ILLEGAL_NAME:"This is an illegal document title, please specify another one.",
               WARN_LONG_NAME: "The document name is too long.",
               TRIM_NAME: "Shorten the document name?",
               SESSION_TIMEOUT: "Your session has expired, please log in and try again.",
               DUPLICATE_NAME: "A duplicate file name was found. Enter a new name.",
               SERVER_ERROR: "The Connections server is not available. Contact the server administrator and try again later."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Download file",
            A11Y: "This button downloads the file."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Download as PDF",
            TOOLTIP: "Download this file as a PDF file",
            A11Y: "This button downloads the file as a PDF.",
            SUCCESS: "You have successfully downloaded the file as a PDF.",
            ERROR: {
               DEFAULT: "You were not able to download the file as a PDF.  Please try again later.",
               UNAUTHENTICATED: "Your session has timed out. You must log in again before you can download the file as a PDF.",
               NOT_FOUND: "The file could not be downloaded as a PDF because the file has been deleted or is no longer shared with you.",
               ACCESS_DENIED: "The file could not be downloaded as a PDF because the file has been deleted or is no longer shared with you."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "There is no published version of this file to download.  Versions can be published from the Docs editor."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Cannot Download the File",
               CANCEL: "Close",
               PROMPT: "There is no published version of this file to download.",
               PROMPT2: "Versions can be published from the Docs editor."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Cannot Download the File",
               CANCEL: "Close",
               PROMPT: "There is no published version of this file to download.",
               PROMPT2: "Ask the file owner to publish a version of this file."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Download a Version",
               OK: "Download Version",
               PROMPT: {
                  TODAY: "A newer draft, last edited today at ${time}, has been detected.",
                  YESTERDAY: "A newer draft, last edited yesterday at ${time}, has been detected.",
                  DAY: "A newer draft, last edited on ${date}, has been detected.",
                  MONTH: "A newer draft, last edited on ${date}, has been detected.",
                  YEAR: "A newer draft, last edited on ${date_long}, has been detected."
               },
               PROMPT2: {
                  TODAY: "Are you sure you want to continue to download the version that was published today at ${time}?",
                  YESTERDAY: "Are you sure you want to continue to download the version that was published yesterday at ${time}?",
                  DAY: "Are you sure you want to continue to download the version that was published on ${date}?",
                  MONTH: "Are you sure you want to continue to download the version that was published on ${date}?",
                  YEAR: "Are you sure you want to continue to download the version that was published on ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Show details panel",
            HIDE: "Hide details panel",
            RESET: "Reset panel size",
            SHOW_A11Y: "This button toggles the side panel open and closed. The side panel is currently closed.",
            HIDE_A11Y: "This button toggles the side panel open and closed. The side panel is currently open.",
            RESET_A11Y: "This button resets the side panel back to default size. The side panel is currently expanded."
         },
         VIEW_DOC: {
            NAME: "Open in Docs Viewer",
            TOOLTIP: "Open in the Docs Viewer",
            A11Y: "This button opens the file for viewing inside of a new browser window."
         },
         EDIT_DOC: {
            NAME: "Edit in Docs",
            TOOLTIP: "Use HCL Docs to edit this file",
            A11Y: "This button opens the file for editing in Docs inside of a new window."
         },
         EDIT_OFFICE: {
            TITLE: "Editing options.",
            NAME: "Edit in Microsoft Office Online",
            TOOLTIP: "Use Microsoft Office Online to edit this file",
            A11Y: "This button opens the file for editing in Microsoft Office Online inside of a new window."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Edit in Microsoft Word Online",
           TOOLTIP: "Use Microsoft Word Online to edit this file",
           A11Y: "This button opens the file for editing in Microsoft Word Online inside of a new window."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Edit in Microsoft Excel Online",
             TOOLTIP: "Use Microsoft Excel Online to edit this file",
             A11Y: "This button opens the file for editing in Microsoft Excel Online inside of a new window."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Edit in Microsoft PowerPoint Online",
             TOOLTIP: "Use Microsoft PowerPoint Online to edit this file",
             A11Y: "This button opens the file for editing in Microsoft PowerPoint Online inside of a new window."
         },
         OFFICE_EDITED: {
             SUCCESS: "The file is being saved."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Edit on Desktop",
            DIALOG_TITLE: "Edit on Desktop",
            TOOLTIP: "Edit this document",
            A11Y: "This button opens the file for editing locally.",
            PROMPT: "This feature allows you to edit using software installed on your computer.",
            INSTALL: "Before proceeding, ${startLink}install desktop file connectors${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Important:",
            REMINDER: "When you are done editing, publish a draft using the desktop file connectors.",
            SKIP_DIALOG: "Don't show this message again.",
            OK: "OK",
            CANCEL: "Cancel"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Confirm",
            DELETE_VERSION: "Delete version ${version}",
            DELETE_VERSION_AND_PRIOR: "Delete version ${version} and all earlier versions",
            PROMPT: "You are about to delete version ${version}. Do you want to proceed?",
            DELETE_PRIOR: "Also delete all earlier versions",
            ERROR: "An error occurred deleting the version. Try again later.",
            TOOLTIP: "Delete this version",
            OK: "OK",
            CANCEL: "Cancel"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Get Links",
            LINK_FILE: "Link to file:",
            LINK_PREVIEW: "Link to preview file:",
            LINK_DOWNLOAD: "Link to download file:",
            TOOLTIP: "Link to file",
            OK: "Close"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Download this version"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Confirm",
            PROMPT: "You are about to replace the current version of this file with version ${version}. Do you want to proceed?",
            ERROR: "An error occurred restoring the version. Try again later.",
            TOOLTIP: "Restore this version",
            CHANGE_SUMMARY: "Restored from version ${version}",
            OK: "OK",
            CANCEL: "Cancel"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Confirm",
            REMOVE_EVERYONE: "Are you sure you want to remove your organization's access to this file? If access is removed, then the file is removed from folders and communities allowing organization-level access, and only the owner and people with whom it has been shared can view and work with it.",
            REMOVE_USER: "Are you sure you want to stop sharing with ${user}? If you stop sharing, ${user} will only be able to access this file through folders or if it is shared with everyone in your organization.",
            REMOVE_COMMUNITY: "Are you sure you want to remove this file from the community ${communityName}?",
            REMOVE_FOLDER: "Are you sure you want to remove this file from the folder ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Remove your organization's access",
            REMOVE_USER_TOOLTIP: "Remove all shares with ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Remove from the community ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Remove from the folder ${folderName}",
            OK: "OK",
            CANCEL: "Cancel",
            EFSS: {
              DIALOG_TITLE: "Confirm",
              REMOVE_EVERYONE: "Are you sure you want to remove your organization's access to this file? If access is removed, then the file is removed from folders allowing organization-level access, and only the owner and people with whom it has been shared can view and work with it.",
              REMOVE_USER: "Are you sure you want to stop sharing with ${user}? If you stop sharing, ${user} will only be able to access this file through folders or if it is shared with everyone in your organization.",
              REMOVE_COMMUNITY: "Are you sure you want to remove this file from the community ${communityName}?",
              REMOVE_FOLDER: "Are you sure you want to remove this file from the folder ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Remove your organization's access",
              REMOVE_USER_TOOLTIP: "Remove all shares with ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Remove from the community ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Remove from the folder ${folderName}",
              OK: "OK",
              CANCEL: "Cancel",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Edit this comment"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Confirm",
            PROMPT: "Are you sure you want to delete this comment?",
            ERROR: "An error occurred deleting the comment. Try again later.",
            TOOLTIP: "Delete this comment",
            OK: "OK",
            CANCEL: "Cancel"
         },
         LIKE: {
            LIKE: "Like the file",
            UNLIKE: "Unlike the file",
            LIKE_A11Y: "This button likes the file.",
            UNLIKE_A11Y: "This button unlikes the file.",
            LIKED_SUCCESS: "You liked this file",
            UNLIKE_SUCCESS: "You unliked this file"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Edit description",
            ERROR: {
               DEFAULT: "The description could not be saved. Try again later.",
               UNAUTHENTICATED: "Your session has timed out. You must log in again before you can update the description.",
               NOT_FOUND: "The description could not be saved because the file has been deleted or is no longer shared with you.",
               ACCESS_DENIED: "The description could not be saved because the file has been deleted or is no longer shared with you."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Error saving filename",
               CONFLICT: "Filename already exists"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "There was an error following this file. Try again later.",
                  UNAUTHENTICATED: "Your session has timed out. You must log in again before you can follow this file.",
                  NOT_FOUND: "You cannot follow this file because the file has been deleted or is no longer shared with you.",
                  ACCESS_DENIED: "You cannot follow this file because the file has been deleted or is no longer shared with you."
               },
               UNFOLLOW: {
                  DEFAULT: "There was an error unfollowing this file. Try again later.",
                  UNAUTHENTICATED: "Your session has timed out. You must log in again before you can stop following this file.",
                  NOT_FOUND: "You cannot stop following this file because the file has been deleted or is no longer shared with you.",
                  ACCESS_DENIED: "You cannot stop following this file because the file has been deleted or is no longer shared with you."
               }
            },
            FOLLOW_NAME: "Follow",
            FOLLOW_TOOLTIP: "Follow this file",
            FOLLOW_A11Y: "This button follows the file.",
            FOLLOW_SUCCESS: "You are now following this file.",
            STOP_FOLLOWING_NAME: "Stop Following",
            STOP_FOLLOWING_TOOLTIP: "Stop following this file",
            STOP_FOLLOWING_A11Y: "This button stops following the file.",
            STOP_FOLLOWING_SUCCESS: "You have stopped following this file."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Add to Sync",
               TOOLTIP: "Add this file to sync",
               A11Y: "This button adds the file to sync.",
               SUCCESS: "You have added this file to sync.",
               ERROR: {
                  DEFAULT: "There was an error adding this file to sync. Try again later.",
                  UNAUTHENTICATED: "Your session has timed out. You must log in again before you can add this file to sync.",
                  NOT_FOUND: "You cannot add this file to sync because the file has been deleted or is no longer shared with you.",
                  ACCESS_DENIED: "You cannot add this file to sync because the file has been deleted or is no longer shared with you."
               }
            },
            STOP_SYNC: {
               NAME: "Remove from Sync",
               TOOLTIP: "Remove this file from sync",
               A11Y: "This button removes the file from sync.",
               SUCCESS: "You have removed this file from sync.",
               ERROR: {
                  DEFAULT: "There was an error removing this file from sync. Try again later.",
                  UNAUTHENTICATED: "Your session has timed out. You must log in again before you can remove this file from sync.",
                  NOT_FOUND: "You cannot remove this file from sync because the file has been deleted or is no longer shared with you.",
                  ACCESS_DENIED: "You cannot remove this file from sync because the file has been deleted or is no longer shared with you."
               }
            },
            MYDRIVE: {
                NAME: "Add to My Drive",
                TOOLTIP: "Add this file to My Drive",
                A11Y: "This button adds the file to My Drive.",
                SUCCESS: "You have added this file to My Drive.",
                ERROR: {
                   DEFAULT: "There was an error adding this file to My Drive. Try again later.",
                   UNAUTHENTICATED: "Your session has timed out. You must log in again before you can add this file to My Drive.",
                   NOT_FOUND: "You cannot add this file to My Drive because the file has been deleted or is no longer shared with you.",
                   ACCESS_DENIED: "You cannot add this file to My Drive because the file has been deleted or is no longer shared with you."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Remove from My Drive",
                TOOLTIP: "Remove this file from My Drive",
                A11Y: "This button removes the file from My Drive.",
                SUCCESS: "You have removed this file from My Drive.",
                ERROR: {
                   DEFAULT: "There was an error removing this file from My Drive. Try again later.",
                   UNAUTHENTICATED: "Your session has timed out. You must log in again before you can remove this file from My Drive.",
                   NOT_FOUND: "You cannot remove this file from My Drive because the file has been deleted or is no longer shared with you.",
                   ACCESS_DENIED: "You cannot remove this file from My Drive because the file has been deleted or is no longer shared with you."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Pin",
            FAVORITE_TOOLTIP: "Pin this file",
            FAVORITE_A11Y: "This button pins the file.",
            FAVORITE_SUCCESS: "You pinned this file.",
            STOP_FAVORITEING_NAME: "Unpin",
            STOP_FAVORITEING_TOOLTIP: "Unpin this file",
            STOP_FAVORITEING_A11Y: "This button unpins the file.",
            STOP_FAVORITEING_SUCCESS: "You have unpinned this file."
         },
         TRASH: {
            NAME: "Move to Trash",
            DIALOG_TITLE: "Confirm",
            PROMPT: "Are you sure you want to move this file to the trash? Moving this file to the trash makes it unavailable to anyone with whom it is presently shared.",
            ERROR: "An error occurred deleting the file. Try again later.",
            TOOLTIP: "Delete this file",
            OK: "OK",
            CANCEL: "Cancel",
            A11Y: "This button moves the file to the trash.",
            SUCCESS_MSG: "${file} has been moved to the trash."
         },
         REFRESH: {
            NAME: "Refresh",
            ERROR: "An error occurred refreshing the File Viewer. Try again later.",
            TOOLTIP: "Refresh the File Viewer",
            INFO_MSG: "Refresh to get the latest content. ${link}",
            A11Y: "This button moves the file to the trash.",
            SUCCESS_MSG: "The Content has successfully been refreshed."
         },
         COPY_FILE: {
            NAME: "Give Copy to Community...",
            DIALOG_TITLE: "Confirm",
            ERROR: "An error occurred copying the file. Try again later.",
            TOOLTIP: "Give a copy of this file to a community",
            OK: "OK",
            CANCEL: "Cancel",
            A11Y: "This button opens a dialog which lets you give a copy of this file to a community.",
            SUCCESS_MSG: "${file} has been copied to ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Transfer Ownership...",
            DIALOG_TITLE: "Transfer Ownership",
            TOOLTIP: "Transfer this file to a new owner",
            A11Y: "This button opens a dialog which lets you transfer this file to a new owner."
         },
         UPLOAD_VERSION: {
            NAME: "Upload New Version",
            NAME_SHORT: "Upload",
            CHANGE_SUMMARY: "Optional change summary...",
            TOOLTIP: "Upload a new version of this file",
            A11Y: "This button opens a dialog which lets you upload a new version of this file."
         },
         LOG_IN: {
            NAME: "Log In",
            TOOLTIP: "Log in to upload and share files, comment, and create folders"
         },
         LOCK: {
            NAME: "Lock File",
            TITLE: "Lock this File",
            A11Y: "Lock this File",
            SUCCESS: "The file is now locked.",
            ERROR: "The file could not be locked because it has been deleted or is no longer shared with you."
         },
         UNLOCK: {
            NAME: "Unlock File",
            TITLE: "Unlock this File",
            A11Y: "Unlock this File",
            SUCCESS: "The file is now unlocked.",
            ERROR: "The file could not be unlocked because it has been deleted or is no longer shared with you."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Edit on desktop",
            TITLE: "Edit on desktop",
            A11Y: "Edit on desktop"
         },
         FLAG: {
            FILE: {
               NAME: "Flag as Inappropriate",
               TITLE: "Flag File",
               A11Y: "Flag this file as inappropriate",
               PROMPT: "Provide a reason for flagging this file (optional):",
               OK: "Flag",
               CANCEL: "Cancel",
               SUCCESS: "The file has been flagged and submitted for review.",
               ERROR: "Error flagging this file, please try again later."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Success",
               PROMPT: "The file has been flagged and submitted for review.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Flag as Inappropriate",
               TITLE: "Flag Comment",
               A11Y: "Flag this comment as inappropriate",
               PROMPT: "Provide a reason for flagging this comment (optional):",
               OK: "Flag",
               CANCEL: "Cancel",
               SUCCESS: "The comment has been flagged and submitted for review.",
               ERROR: "Error flagging this comment, please try again later."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Success",
            PROMPT: "The changes have been submitted for review. This file will not be available until the changes are approved.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Dropdown button"
      },
      SECTION: {
         ABOUT: {
            NAME: "About This File",
            VIEW_FILE_DETAILS: "View File Details",
            A11Y: "Activating this link will close the file viewer and direct you to the file details page for this file."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "No preview available for this file."
         },
         IMAGE: {
            ZOOM_IN: "Zoom in",
            ZOOM_OUT: "Zoom out",
            RESET: "Reset",
            ZOOM_IN_A11Y: "This button zooms in on the image.",
            ZOOM_OUT_A11Y: "This button zooms out on the image.",
            RESET_ZOOM_A11Y: "This button resets the zoom level.",
            UNSAFE_PREVIEW: "This file cannot be previewed because it has not been scanned for viruses."
         },
         VIEWER: {
            LOADING: "Loading...",
            PUBLISHING: "Publishing...",
            NO_PUBLISHED_VERSION: "A published version of this file is not available for viewing.",
            IFRAME_TITLE: "Preview of this file",
            AUTOPUBLISH_TIMEOUT: "The server is taking too long to respond.  The latest changes may not have been published."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "This file cannot be previewed because it has not been scanned for viruses."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Last updated by ${user} today at ${time}",
            YESTERDAY: "Last updated by ${user} yesterday at ${time}",
            DAY: "Last updated by ${user} on ${EEee} at ${time}",
            MONTH: "Last updated by ${user} on ${date_long}",
            YEAR: "Last updated by ${user} on ${date_long}"
         },
         CREATED: {
            TODAY: "Created by ${user} today at ${time}",
            YESTERDAY: "Created by ${user} yesterday at ${time}",
            DAY: "Created by ${user} on ${EEee} at ${time}",
            MONTH: "Created by ${user} on ${date_long}",
            YEAR: "Created by ${user} on ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Today",
            YESTERDAY: "${time} - Yesterday",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Today",
            YESTERDAY: "Yesterday",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} B",
         KB: "${0} KB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Comment text area",
         SHADOW_TEXT: "Add a comment...",
         CANNOT_ACCESS_CONTENT: "The following people that you mentioned cannot view the comment because they do not have access to the content:",
         ERROR: "An error occurred validating the user you are attempting to mention.",
         POST: "Post",
         SAVE: "Save",
         CANCEL: "Cancel",
         EXTERNAL_WARNING: "Comments might be seen by people external to your organization."
      },
      EDIT_BOX: {
         SAVE: "Save",
         CANCEL: {
            TOOLTIP: "Cancel",
            A11Y: "This button cancels the action of editing the file name."
         },
         INVALID_CHARACTERS: "Invalid character",
         INVALID_CHARACTERS_REMOVED: "Invalid characters removed"
      },
      COMMENT_WIDGET: {
         EDITED: "(Edited)",
         EDITED_DATE: {
            TODAY: "Edited today at ${time}",
            YESTERDAY: "Edit yesterday at ${time}",
            DAY: "Edited on ${EEee} at ${time}",
            MONTH: "Edited on ${date_long}",
            YEAR: "Edited on ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Save",
         CANCEL: "Cancel",
         USER: "Person",
         COMMUNITY: "Community",
         SHARE: "Share",
         SHARE_ALT: "Share with this person",
         MEMBER_TYPE: "Member Type",
         PERSON_SHADOW: "Type to find person",
         COMMUNITY_SHADOW: "Type to find community",
         PERSON_ARIA: "Type to find person.  Press shift tab to change between people, communities, and everyone in the organization.",
         COMMUNITY_ARIA: "Type to find community.  Press shift tab to change between people, communities, and everyone in the organization.",
         PERSON_FULL_SEARCH: "Person not listed? Use full search...",
         COMMUNITY_FULL_SEARCH: "Community not listed? Use full search...",
         ADD_OPTIONAL_MESSAGE: "Add Optional Message",
         ROLE_LABEL: "Role",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Reader"
      },
      FILE_STATE: {
         DOCS_FILE: "This is a Docs file. All edits must be made online.",
         LOCKED_BY_YOU: {
            TODAY: "Locked by you at ${time}.",
            YESTERDAY: "Locked by you yesterday at ${time}.",
            DAY: "Locked by you on ${date}.",
            MONTH: "Locked by you on ${date}.",
            YEAR: "Locked by you on ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Locked at ${time} by ${user}.",
            YESTERDAY: "Locked yesterday at ${time} by ${user}.",
            DAY: "Locked on ${date} by ${user}.",
            MONTH: "Locked on ${date} by ${user}.",
            YEAR: "Locked on ${date_long} by ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Automatically shorten this text",
         COMMENT: {
            WARN_TOO_LONG: "The comment is too long.",
            TRIM: "Shorten comment?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "The description is too long.",
            TRIM: "Shorten description?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "The message is too long.",
            TRIM: "Shorten message?"
         },
         TAG: {
            WARN_TOO_LONG: "The tag is too long.",
            TRIM: "Shorten tag?"
         },
         TAGS: {
            WARN_TOO_LONG: "One or more tags are too long.",
            TRIM: "Shorten tags?"
         },
         TAGCHAR: {
            WARN_INVALID_CHARS_IN_TAG: "The tag list you entered contains invalid character '&'.  Please remove this character from the tag list."
         },
         FILENAME: {
            WARN_TOO_LONG: "Filename too long"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "This file can be edited online by people who have HCL Docs.",
         NO_ENTITLEMENT_LINK: "This file can be edited online by people who have ${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "This file is currently being edited on the web by ${users}.",
         UNPUBLISHED_CHANGES: "There are edits to this draft that have not been published as a version.",
         PUBLISH_A_VERSION: "Publish a version",
         PUBLISH_SUCCESS: "You have successfully published a version of this file",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "The version could not be published because access was denied.",
            NOT_FOUND: "The version could not be published because the document was not found.",
            CANNOT_REACH_REPOSITORY: "The version could not be published because the Docs server is unable to connect to the file repository.",
            QUOTA_VIOLATION: "The version could not be published because of space restrictions. Remove other files to free enough space to publish this version.",
            CONVERSION_UNAVAILABLE: "The version could not be published because the Docs conversion service is not available. Try again later.",
            TOO_LARGE: "The version could not be published because the document is too large.",
            CONVERSION_TIMEOUT: "The version could not be published because the Docs conversion service is taking too long to convert the document. Try again later.",
            SERVER_BUSY: "The version could not be published because the Docs server is busy. Try again later.",
            DEFAULT: "The version could not be published because the Docs service is not available. Try again later."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Your edits are being published. ${startLink}Refresh to see your changes.${endLink}",
            GENERIC: "You might need to refresh the page to see the latest changes.  ${startLink}Refresh${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "There are no comments.",
         MODERATED: "The comment has been submitted for review and will be available when approved.",
         ERROR: {
            SAVE: {
               DEFAULT: "Your comment could not be saved. Try again later.",
               UNAUTHENTICATED: "Your session has timed out. You must log in again before you can save your comment.",
               NOT_FOUND: "Your comment could not be saved because the file has been deleted or is no longer shared with you.",
               ACCESS_DENIED: "Your comment could not be saved because the file has been deleted or is no longer shared with you."
            },
            DELETE: {
               DEFAULT: "Your comment could not be deleted. Try again later.",
               UNAUTHENTICATED: "Your session has timed out. You must log in again before you can delete your comment.",
               NOT_FOUND: "Your comment could not be deleted because the file has been deleted or is no longer shared with you.",
               ACCESS_DENIED: "Your comment could not be deleted because the file has been deleted or is no longer shared with you."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Save",
         EDIT_TAGS: "Edit tags",
         ERROR: {
            SAVE: {
               DEFAULT: "The tag could not be created. Try again later."
            },
            DELETE: {
               DEFAULT: "The tag could not be deleted. Try again later."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Read More...",
         READ_LESS: "Read Less..."
      },
      SHARE: {
         EVERYONE: "Everyone in my organization",
         ADD_TOOLTIP: "Save",
         ROLES: {
            OWNER: "Owner",
            EDIT: "Editors",
            VIEW: "Readers",
            FOLDER: "Shared with Folders"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Owner"
            },
            EDIT: {
               ROLE: "Edit",
               ADD: "Add Editor"
            },
            VIEW: {
               ROLE: "Reader",
               ADD: "Add Reader"
            },
            FOLDER: {
               ADD: "Add Folders",
               COMMUNITY_ADD: "Add To Folder",
               MOVE: "Move to Folder"
            },
            MULTI: {
               ADD: "Add People or Communities",
               ADD_PEOPLE: "Add People"
            }
         },
         PUBLIC: {
            SHORT: "Everyone in my organization",
            LONG: {
               GENERIC: "Everyone in your organization",
               ORG: "Everyone in ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "This file is already shared with ${user}.",
            ERROR: "Unable to share with ${user} at this time.",
            SELF: "You cannot share with yourself."
         },
         SHARE_INFO: {
            PROMOTED: "${user} has been promoted to a higher sharing role."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Successfully shared with ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "The file was shared successfully."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Optional message..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Provision External User",
               ACTION: "Provision external user...",
               TOOLTIP: "Provision external user",
               DIALOG_TITLE: "Content Was Not Shared",
               PROMPT: {
                  NO_ACCOUNT: "The following user does not have an account and no content was shared with them.",
                  INVITE: "Invite this user as a guest to share the content with them."
               },
               SUBMIT: "Proceed with invitation",
               CANCEL: "Cancel",
               ERROR: "An error occured provisioning the account. Try again later.",
               SUCCESS: "Successfully provisioned user account."
            },
            PLURAL: {
               NAME: "Provision External Users",
               ACTION: "Provision external users...",
               TOOLTIP: "Provision external users",
               DIALOG_TITLE: "Content Was Not Shared",
               PROMPT: {
                  NO_ACCOUNT: "The following users do not have an account and no content was shared with them.",
                  INVITE: "Invite these users as guests to share the content with them."
               },
               SUBMIT: "Proceed with invitations",
               CANCEL: "Cancel",
               ERROR: "An error occured provisioning accounts. Try again later.",
               SUCCESS: "Successfully provisioned user accounts."
            },
            ABSTRACT: {
               NAME: "Provision External Users",
               ACTION: "Provision external users...",
               TOOLTIP: "Provision external users",
               DIALOG_TITLE: "Content Was Not Shared",
               PROMPT: {
                  NO_ACCOUNT: "Some users do not have accounts and no content was shared with them.",
                  INVITE: "Invite these users as guests to share the content with them."
               },
               SUBMIT: "Proceed with invitations",
               CANCEL: "Cancel",
               ERROR: "An error occured provisioning accounts. Try again later.",
               SUCCESS: "Successfully provisioned user accounts."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Sharing Options",
         PROPAGATION: "Allow others to share this file",
         EVERYONE: "Everyone can share this file.",
         OWNER_ONLY: "Only the owner can share this file.",
         STOP_SHARE: "Stop Sharing",
         MAKE_INTERNAL: "Stop Sharing Externally",
         MAKE_INTERNAL_SUCCESS: "This file can no longer be shared with people outside of your organization.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Make Internal?",
            PROMPT: "Making this file internal will mean it can no longer be shared with people outside of your organization. ${br}${br}" +
            "Any shares with external people, communities or folders will be removed.${br}${br}Making a file internal is permanent and cannot be undone.",
            EFSS: {
               DIALOG_TITLE: "Make Internal?",
               PROMPT: "Making this file internal will mean it can no longer be shared with people outside of your organization. ${br}${br}" +
               "Any shares with external people or folders will be removed.${br}${br}Making a file internal is permanent and cannot be undone."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Stop Sharing File",
            PROMPT: "Are you sure you want to stop sharing this file?",
            QUESTION_PUBLIC: "This file will no longer be visible to everyone in your organization, or shared with people, folders, or communities. This operation cannot be undone.",
            QUESTION_PUBLIC_E: "This file will no longer be visible to everyone in your organization, or shared with people or folders. This operation cannot be undone.",
            QUESTION: "The file will no longer be shared with people or communities, and will be removed from all folders except your private folders. This action cannot be undone.",
            QUESTION_E: "This file will no longer be shared with people, and will be removed from all folders except your private folders. This action cannot be undone."
         },
         MAKE_PRIVATE_SUCCESS: "This file is now private.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Unable to stop sharing the file. Try again later."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "My Shares"
      },
      STREAM: {
         LOADING: "Loading...",
         LOAD_MORE: "Load more..."
      },
      ENTRY: {
         REMOVE: "Remove",
         RESTORE: "Restore",
         EDIT: "Edit",
         DELETE: "Delete",
         OK: "OK",
         CANCEL: "Cancel",
         USER_PICTURE: "${0}'s Picture",
         FLAG: "Flag As Inappropriate"
      },
      PANEL: {
         LOAD_ERROR: "There was an error accessing the metadata of this file.",
         ABOUT: {
            TITLE: "About",
            EXPAND_BUTTON: "Expand this button to see more information",
            CURRENT_VERSION_HEADER: "Current Version ${versionNumber}",
            FILE_SIZE_HEADER: "File Size",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Current Version",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - All Versions",
            DOCS_DRAFT_UPDATED_HEADER: "Draft Edited",
            DOCS_DRAFT_CREATED_HEADER: "Draft Created",
            DOCS_UPDATED_HEADER: "Published",
            DOCS_CREATED_HEADER: "Created",
            UPDATED_HEADER: "Updated",
            CREATED_HEADER: "Created",
            LIKES_HEADER: "Likes",
            LIKES_EXPAND_ICON: "Expand this icon to see who has liked the file",
            DOWNLOADS_HEADER: "Views",
            DOWNLOADS_HEADER_MORE: "Views (${0})",
            DOWNLOADS_EXPAND_ICON: "Expand this icon to see who has viewed the file",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymously",
            DOWNLOADS_LATEST_VERSION: "You have the latest version of this file",
            DOWNLOADS_LAST_VERSION: "You last viewed version ${0} of this file",
            TAGS_HEADER: "Tags",
            DESCRIPTION_HEADER: "Description",
            DESCRIPTION_READ_MORE: "Read More...",
            LINKS_HEADER: "Links",
            SECURITY: "Security",
            FILE_ENCRYPTED: "File content is encrypted. Encrypted file content is not searchable. File content cannot be viewed and cannot be edited with HCL Docs.",
            GET_LINKS: "Get Links...",
            ADD_DESCRIPTION: "Add a description",
            NO_DESCRIPTION: "No description",
            ADD_TAGS: "Add tags",
            NO_TAGS: "No tags"
         },
         COMMENTS: {
            TITLE: "Comments",
            TITLE_WITH_COUNT: "Comments (${0})",
            VERSION: "Version ${0}",
            FEED_LINK: "Feed for these comments",
            FEED_TITLE: "Follow changes to these comments through your feed reader"
         },
         SHARING: {
            TITLE: "Sharing",
            TITLE_WITH_COUNT: "Shared (${0})",
            SHARED_WITH_FOLDERS: "Shared with Folders - ${count}",
            SEE_WHO_HAS_SHARED: "See who has shared",
            COMMUNITY_FILE: "Files owned by a community cannot be shared to people or other communities.",
            SHARED_WITH_COMMUNITY: "Shared with members of the community '${0}'",
            LOGIN: "Log in",
            NO_SHARE: "This file has not been added to any folders yet.",
            ONE_SHARE: "This file is in 1 folder or community you do not have access to.",
            MULTIPLE_SHARE: "This file is in ${fileNumber} folders or communities you do not have access to."
         },
         VERSIONS: {
            TITLE: "Versions",
            TITLE_WITH_COUNT: "Versions (${0})",
            FEED_LINK: "Feed for these versions",
            FEED_TITLE: "Follow changes to this file through your feed reader"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Action Confirmation",
         DIALOG_TITLE: "Confirm",
         PROMPT: "Are you sure you want to perform this action?",
         ERROR: "An error occurred performing the action. Try again later.",
         TOOLTIP: "Perform action",
         OK: "OK",
         CANCEL: "Cancel",
         A11Y: "This button performs the current action."
      },
      THUMBNAIL: {
         TITLE: "Thumbnail",
         CHANGE_LINK: "Change Thumbnail...",
         ERROR: "The thumbnail could not be saved. Try again later.",
         EXT_ERROR: "Select a file with one of the following supported extensions: ${0}",
         SUCCESS: "The thumbnail was changed",
         UPLOAD: "Save",
         CANCEL: "Cancel"
      },
      UPLOAD_VERSION: {
         LINK: "Upload New Version...",
         CHANGE_SUMMARY: "Optional change summary...",
         ERROR: "The new version could not be saved. Try again later.",
         SUCCESS: "The new version was saved",
         UPLOAD: "Upload",
         UPLOAD_AND_CHANGE_EXTENSION: "Upload and Change Extension",
         CANCEL: "Cancel",
         TOO_LARGE: "${file} is larger than the ${size} file size allowed.",
         PROGRESS_BAR_TITLE: "Uploading new version (${uploaded} of ${total} complete)",
         CANCEL_UPLOAD: "Cancel upload"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "An error occurred accessing the file. Try again later.",
         UNAUTHENTICATED: "Your session has timed out. You must log in again before you can view the file.",
         NOT_FOUND: "The file you have requested has been deleted or moved. If someone sent you this link, check that it is correct.",
         ACCESS_DENIED: "You do not have permission to view this file. The file is not shared with you.",
         ACCESS_DENIED_ANON: "You do not have permission to view this file. If this is your file or it has been shared with you, you must log in first."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Error",
         PROMPT: "The file you have requested has been deleted or moved.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Confirm",
        PROMPT: "Your HCL Connections session has timed out.${lineBreaks}Click OK to log back in or Cancel to close this dialog.",
        OK: "OK",
        CANCEL: "Cancel"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Cannot Access Link",
        PROMPT: "Something went wrong accessing the link.${lineBreaks}Click OK to be redirected to the page.",
        OK: "OK",
        CANCEL: "Cancel"
      },
      LOAD_ERROR: {
         DEFAULT: "Oops. There was an error accessing the link.",
         ACCESS_DENIED: "Contact the file owner to request permission to view this file."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - File",
         LOAD_ERROR: "Error accessing file"
      },
      SHARE_WITH_LINK: {
         TITLE: "Share by Link",
         EMPTY_DESCRIPTION: "You haven't created a link for this file yet. Create a shared link to send to others so that they can preview and download the file.",
         CREATE_LINK: "Create a Link",
         COPY_LINK: "Copy Link",
         DELETE_LINK: "Delete Link",
         ACCESS_TYPE_1: "Anyone with the link can view this file",
         ACCESS_TYPE_2: "People in my organization can view this file",
         ACCESS_TYPE_1_DESCRIPTION: "People who get the link can preview and download this file after logging into Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "People in my organization who get the link can preview and download this file after logging into Connections.",
         CHANGE_TYPE_SUCCESS: "Link permission updates when the access type changes.",
         CHANGE_TYPE_ERROR: "Link permission updates failed when the access type changes.",
         COPY_LINK_SUCCESS: "Link copied to clipboard",
         CREATE_SHARELINK_SUCCESS:"Link successfully created.",
         CREATE_SHARELINK_ERROR:"Cannot create a link due to an error.",
         DELETE_SHARELINK_SUCCESS: "Deleted the shared link for \"${file}.\"",
         DELETE_SHARELINK_ERROR: "The shared link was not deleted. Try again later.",
         CONFIRM_DIALOG: {
            OK: "Delete",
            DIALOG_TITLE: "Delete the Shared Link",
            PROMPT: "This file will become inaccessible to anyone who has the link. Are you sure you want to delete the shared link?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Shared link is active. Anyone with the link can view this file. Click to copy this link.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Shared link is active. People in my organization can view this file. Click to copy this link."
      }
   }),

   "pt-br": true,
   "ca": true,
   "cs": true,
   "da": true,
   "nl": true,
   "fi": true,
   "fr": true,
   "de": true,
   "el": true,
   "hu": true,
   "pt": true,
   "it": true,
   "ja": true,
   "ko": true,
   "no": true,
   "pl": true,
   "ru": true,
   "zh": true,
   "sl": true,
   "es": true,
   "sv": true,
   "th": true,
   "zh-tw": true,
   "tr": true,
   "he": true
});
