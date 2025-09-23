/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2022                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
define({
   root : ({
      "globalization" : {
         "windowtitle" : "Globalization",
         "unavailable" : "Globalization settings are not available",
         "details" : "Specify your preferred language, which calendar you prefer, and the direction that user-generated text flows.",
         "error" : "Globalization settings were not retrieved due to an error.",
         "titlebar" : {
            "tab2" : "Application Access",
            "tab1" : "Email Notifications",
            "tab3" : "Globalization",
            "tab0" : "Default Homepage"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pressing this button refreshes the current page, with new content.  To return to this menu, navigate back to:"
         },
         "details_nolanguage" : "Specify which calendar you prefer, and the direction that user-generated text flows.",
         "a11y" : {
            "titlebar_label" : "HCL Connections settings",
            "body_label" : "Globalization settings"
         },
         "heading" : "Globalization Settings"
      },
      "applications": {
         "newsNav": {
            "tab1": "My Profile",
            "tab2": "Settings"
         },
      },
      "restore_defaults" : {
         "error" : "An error occurred. Please try again later.",
         "action_tooltip" : "Restore globalization settings to their original default values",
         "action" : "Restore Defaults",
         "success" : "Your globalization settings have been restored to their original default values."
      },
      "help" : {
         "help" : "Help",
         "close" : "Close"
      },
      "save" : {
         "error" : "An error occurred. Please try again later.",
         "action_tooltip" : "Save globalization settings",
         "action" : "Save",
         "success" : "Your globalization settings have been updated."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Error:",
            "icon_alt" : "Error"
         },
         "success" : {
            "a11y_label" : "Success:",
            "icon_alt" : "Success"
         },
         "warning" : {
            "a11y_label" : "Warning:",
            "icon_alt" : "Warning"
         },
         "info" : {
            "a11y_label" : "Information:",
            "icon_alt" : "Information"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Restore Defaults"
         },
         "bidi" : {
            "help" : "Enable bidirectional text help",
            "label" : "Enable bidirectional text",
            "tooltip" : "Allows for the language specific display of concatenated text and structured text, such as file paths.  Also allows you to specify a text direction independent of your language selection."
         },
         "error" : "Error",
         "save" : {
            "label" : "Save"
         },
         "direction" : {
            "label" : "Direction of user-generated text:",
            "tooltip" : "The direction of text derived from user input, such as names of content and navigation breadcrumbs.  By default, this is determined by your language selection (left to right for most).  Choosing contextual allows the system to determine direction based on character analysis (supports mixed-direction text).",
            "options" : {
               "contextual" : "Contextual (character-based)",
               "rtl" : "Right to left",
               "ltr" : "Left to right",
               "default_ltr" : "Use language default (left to right)",
               "default_rtl" : "Use language default (right to left)"
            }
         },
         "cancel" : {
            "label" : "Cancel"
         },
         "language" : {
            "selected" : "${0} (current)",
            "label" : "Language:",
            "tooltip" : "Specify the language in which application text will display.  This setting will not affect user-generated text."
         },
         "calendar" : {
            "label" : "Calendar:",
            "options" : {
               "hebrew" : "Hebrew",
               "gregorian" : "Gregorian",
               "hijri" : "Hijri"
            }
         }
      }
   }),

   "ar" : true,
   "bg" : true,
   "ca" : true,
   "cs" : true,
   "da" : true,
   "de" : true,
   "el" : true,
   "es" : true,
   "fi" : true,
   "fr" : true,
   "he" : true,
   "hr" : true,
   "hu" : true,
   "id" : true,
   "it" : true,
   "ja" : true,
   "kk" : true,
   "ko" : true,
   "nb" : true,
   "nl" : true,
   "no" : true,
   "pl" : true,
   "pt" : true,
   "pt-br" : true,
   "ro" : true,
   "ru" : true,
   "sk" : true,
   "sl" : true,
   "sv" : true,
   "th" : true,
   "tr" : true,
   "zh" : true,
   "zh-tw" : true
});
