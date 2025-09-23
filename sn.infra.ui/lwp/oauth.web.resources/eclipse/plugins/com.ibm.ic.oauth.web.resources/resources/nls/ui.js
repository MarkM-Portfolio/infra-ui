/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
define({
   root : ({
      "authorize" : {
         "legal" : "Licensed Materials – Property of HCL. \xa9 Copyright HCL Technologies Limited 2007-2019. All rights reserved. See product license for details. Java and all Java-based trademarks and logos are trademarks or registered trademarks of Oracle and/or its affiliates.",
         "error" : "An error occurred. Please try again later.",
         "granted" : {
            "title" : "Access Granted",
            "blurb" : "You\'ve granted ${0} access to interact with your HCL Connections account."
         },
         "denied" : {
            "title" : "Access Denied",
            "blurb" : "You\'ve denied ${0} access to interact with your HCL Connections account."
         },
         "blurb" : "{0} is requesting access to your HCL Connections information, including all of your content in Connections.",
         "revoke" : {
            "description" : "You can revoke access at any time through Connections Settings > {0}. Connections may periodically ask you to re-authorize.",
            "link" : "Application Access"
         },
         "authorize" : {
            "label" : "Grant Access"
         },
         "windowtitle" : "Authorize access to HCL Connections",
         "title" : "Access Request",
         "deny" : {
            "label" : "Deny Access"
         },
         "action_tooltip" : "Grant access to application ${0}",
         "action" : "Grant Access",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Redirecting you back to ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Turn on JavaScript",
            "p2" : "Refresh the page to continue.",
            "p1" : "JavaScript has been disabled in your web browser.  HCL Connections requires JavaScript in order to function.  Once you have turned it on, please refresh the page."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "We are unable to process your request",
            "description" : "The request issued by the application requesting access to your HCL Connections account was incomplete.  Click the browser back button to return to the site or application that sent you here and try again.  If this error persists, report the problem to your administrator."
         },
         "invalid_token" : {
            "title" : "We are unable to process your request",
            "description" : "The request issued by the application requesting access to your HCL Connections account was invalid.  Click the browser back button to return to the site or application that sent you here and try again.  If this error persists, report the problem to your administrator."
         },
         "default_action" : {
            "label" : "Return to Homepage"
         }
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
      "loading" : "Loading...",
      "deny" : {
         "error" : "An error occurred. Please try again later.",
         "action_tooltip" : "Deny access to application ${0}",
         "action" : "Deny Access",
         "success" : "Access was denied."
      },
      "grid" : {
         "applications" : {
            "summary" : "List of applications with access to your HCL Connections information.",
            "loading" : "Loading...",
            "empty" : "No applications found.",
            "reverse_sort" : "Reverse Sort"
         }
      },
      "applications" : {
         "windowtitle" : "Application Access",
         "details" : "Applications with access to your HCL Connections information.",
         "error" : "The list was not retrieved due to an error.",
         "titlebar" : {
            "tab2" : "Application Access",
            "tab1" : "Email Notifications",
            "tab3" : "Globalization",
            "tab0" : "Default Homepage"
         },
         "newsNav": {
            "tab1": "My Profile",
            "tab2": "Settings"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pressing this button refreshes the current page, with new content.  To return to this menu, navigate back to:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections settings"
         },
         "heading" : "Application Access"
      },
      "sorts" : {
         "application_name" : "Application Name",
         "authorization_date" : "Authorization Date",
         "expiration_date" : "Expiration Date",
         "action" : "Action"
      },
      "revoke_token" : {
         "error" : "An error occurred. Please try again later.",
         "dialog_title" : "Revoke Access",
         "action_tooltip" : "Revoke access to application ${0}",
         "action" : "Revoke",
         "ok" : "OK",
         "cancel" : "Cancel",
         "confirm" : "Revoke this application\'s access to your HCL Connections information? ",
         "success" : "The application was removed."
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
