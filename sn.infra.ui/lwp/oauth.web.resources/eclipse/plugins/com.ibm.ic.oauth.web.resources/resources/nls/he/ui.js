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
      "authorize" : {
         "legal" : "Licensed Materials - Property of IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012.‎ IBM, the IBM logo, ibm.com and Lotus are trademarks of IBM Corporation in the United States, other countries, or both.‎ U.S. Government Users Restricted Rights: Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp. Please see the About page for further information.‎",
         "error" : "אירעה שגיאה. נא לנסות שוב מאוחר יותר.",
         "granted" : {
            "title" : "גישה הוענקה",
            "blurb" : "הענקתם לשירות ${0} גישה לאינטראקציה עם חשבון HCL Connections שלכם."
         },
         "denied" : {
            "title" : "הגישה חסומה",
            "blurb" : "אסרתם על השירות ${0} גישה לאינטראקציה עם חשבון HCL Connections שלכם."
         },
         "blurb" : "{0}  מבקש גישה אל פרטי HCL Connections שלכם, כולל כל התוכן שלכם בתוך Connections.‏",
         "revoke" : {
            "description" : "תוכלו לשלול את הגישה בכל עת באמצעות הגדרות Connections ‏> {0}. יתכן שתתבקשו על ידי Connections לאשר מחדש באופן תקופתי.",
            "link" : "גישת יישומים"
         },
         "authorize" : {
            "label" : "הענקת גישה"
         },
         "windowtitle" : "אישור גישה אל HCL Connections",
         "title" : "בקשת גישה",
         "deny" : {
            "label" : "חסימת גישה"
         },
         "action_tooltip" : "הענקת גישה ליישום ${0}",
         "action" : "הענקת גישה",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "אתם מנותבים בחזרה אל ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "הפעלת JavaScript",
            "p2" : "נא לרענן את הדף כדי להמשיך.‏",
            "p1" : "JavaScript הושבת בדפדפן שלכם.  HCL Connections דורש את JavaScript כדי שיוכל לפעול.  לאחר שתפעילו את JavaScript,‏ רעננו את הדף."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "לא ניתן לעבד את בקשתכם",
            "description" : "הבקשה של היישום לקבלת גישה אל חשבון HCL Connections שלכם לא היתה שלמה.  לחצו על 'אחורה' בדפדפן כדי לחזור אל האתר או היישום ששלח אתכם לכאן ולנסות שוב.  אם הבעיה נמשכת, דווחו על הבעיה למנהלן."
         },
         "invalid_token" : {
            "title" : "לא ניתן לעבד את בקשתכם",
            "description" : "הבקשה של היישום לקבלת גישה אל חשבון HCL Connections שלכם לא היתה חוקית.  לחצו על 'אחורה' בדפדפן כדי לחזור אל האתר או היישום ששלח אתכם לכאן ולנסות שוב.  אם הבעיה נמשכת, דווחו על הבעיה למנהלן."
         },
         "default_action" : {
            "label" : "חזרה אל דף הבית"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "שגיאה:",
            "icon_alt" : "שגיאה"
         },
         "success" : {
            "a11y_label" : "הצלחה:",
            "icon_alt" : "הצלחה"
         },
         "warning" : {
            "a11y_label" : "אזהרה:",
            "icon_alt" : "אזהרה"
         },
         "info" : {
            "a11y_label" : "מידע:",
            "icon_alt" : "מידע"
         }
      },
      "loading" : "טעינה בביצוע...‏",
      "deny" : {
         "error" : "אירעה שגיאה. נא לנסות שוב מאוחר יותר.",
         "action_tooltip" : "חסימת גישה ליישום ${0}",
         "action" : "חסימת גישה",
         "success" : "הגישה נחסמה."
      },
      "grid" : {
         "applications" : {
            "summary" : "רשימת יישומים שיש להם גישה אל פרטי HCL Connections שלכם.",
            "loading" : "טעינה בביצוע...‏",
            "empty" : "לא נמצאו יישומים.",
            "reverse_sort" : "מיון בסדר הפוך"
         }
      },
      "applications" : {
         "windowtitle" : "גישת יישומים",
         "details" : "יישומים שיש להם גישה אל פרטי HCL Connections שלכם.",
         "error" : "הרשימה לא אוחזרה בגלל שגיאה.",
         "titlebar" : {
            "tab2" : "גישת יישומים",
            "tab1" : "דיווחים בדואל",
            "tab3" : "גלובליזציה"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "הלחיצה על לחצן זה מרעננת את הדף הנוכחי בתוכן חדש.  כדי לחזור לתפריט זה, נווט בחזרה אל:"
         },
         "a11y" : {
            "titlebar_label" : "הגדרות HCL Connections"
         },
         "heading" : "גישת יישומים"
      },
      "sorts" : {
         "application_name" : "שם יישום",
         "authorization_date" : "תאריך הרשאה",
         "expiration_date" : "תאריך תפוגה",
         "action" : "פעולה"
      },
      "revoke_token" : {
         "error" : "אירעה שגיאה. נא לנסות שוב מאוחר יותר.",
         "dialog_title" : "שלילת גישה",
         "action_tooltip" : "שלילת גישה ליישום ${0}",
         "action" : "שלילה",
         "ok" : "אישור",
         "cancel" : "ביטול",
         "confirm" : "לשלול את הגישה של יישום זה אל פרטי HCL Connections שלכם? ",
         "success" : "היישום סולק."
      }
});
