/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
   submit: {label: "שמירה", a11y: "שמירה", tooltip: "שמירה"}, 
   cancel: {label: "ביטול", a11y: "ביטול", tooltip: "ביטול"},
   close: {label: "סגירה", a11y: "סגירה", tooltip: "סגירה"},
   title: {global: "שתפו משהו", community: "שיתוף עם קהילה"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "פעולות שיתוף אינן זמינות עבור תרחיש זה.",
	   ACTIONS_LOAD_ERROR: "אירעה שגיאה בטעינת פעולות השיתוף.",
	   CONTENT_LOAD_ERROR: "לא ניתן לטעון את התוכן. נסו שוב מאוחר יותר או פנו אל המנהלן."},
   MESSAGE: {
	      SUCCESS: "אישור",
	      ERROR: "שגיאה",
	      ERROR_ALT_TEXT: "שגיאה:",
	      INFO: "מידע",
	      WARNING: "אזהרה",
	      DISMISS: "הסתרת הודעה זו.",
	      MORE_DETAILS: "פרטים נוספים",
	      HIDE_DETAILS: "הסתרת פרטים"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "שיתוף",
	   UPLOAD: "טעינה",
	   CANCEL: "ביטול",
	   VISIBILITY_WARNING: "קבצים המשותפים עם קהילה זו יהפכו לציבוריים.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "שיתפתם בהצלחה את ${0} עם ${1}.",
		   SUCCESS_PLURAL: "שיתפתם בהצלחה ${0} קבצים עם ${1}.",
		   ERROR: "לא ניתן לשתף את הקובץ.  נא לנסות שוב מאוחר יותר.",
		   ERROR_X: "לא ניתן לשתף את הקובץ.  נא לנסות שוב מאוחר יותר.",
           MAX_SHARES_ERROR: "היתה חריגה ממספר השיתופים המרבי.",
           EXTERNAL_SHARES_ERROR: "אפשר לשתף את הקובץ רק בתוך הארגון.",
           EXTERNAL_SHARES_ERROR_X: "אפשר לשתף את קובץ זה רק בתוך הארגון.",
           NOT_LOGGED_IN_ERROR: "הקובץ לא שותף מפני שלא הייתם מחוברים.  לחצו על 'שיתוף' כדי לשתף את הקובץ.",
           NOT_LOGGED_IN_ERROR_X: "הקבצים לא שותפו מפני שלא הייתם מחוברים.  לחצו על 'שיתוף' כדי לשתף את הקבצים.",
           TIMEOUT_ERROR: "הקובץ לא שותף מפני שלא ניתן להתחבר לשרת.  לחצו על 'שיתוף' כדי לנסות שוב.",
           TIMEOUT_ERROR_X: "הקבצים לא שותפו מפני שלא ניתן להתחבר לשרת.  לחצו על 'שיתוף' כדי לנסות שוב.",
           CANCEL_ERROR: "הקובץ לא שותף מפני שהבקשה בוטלה.  לחצו על 'שיתוף' כדי לנסות שוב.",
           CANCEL_ERROR_X: "הקבצים לא שותפו מפני שהבקשה בוטלה.  לחצו על 'שיתוף' כדי לנסות שוב.",
           NOT_FOUND_ERROR: "הקובץ נמחק או כבר אינו זמין עבורכם ולא ניתן לשתף אותו.",
           NOT_FOUND_ERROR_X: "הקבצים נמחקו או כבר אינו זמינים עבורכם ולא ניתן לשתף אותם.",
           ACCESS_DENIED_ERROR: "כבר אין לכם הרשאה לשתף קובץ זה.‏",
           ACCESS_DENIED_ERROR_X: "כבר אין לכם הרשאה לשתף קבצים אלה.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "לא ניתן להגדיר קובץ מוגבל כציבורי.",
        	   ERROR_SHARE_X: "לא ניתן להגדיר קובץ מוגבל כציבורי."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "טענתם בהצלחה את ${0} אל ${1}.",
		   SUCCESS_PLURAL: "טענתם בהצלחה ${0} קבצים אל ${1}.",
		   ERROR: "לא ניתן לטעון את הקובץ.  נא לנסות שוב מאוחר יותר.",
		   ERROR_X: "לא ניתן לטעון את ‎${0}‎.‏  נא לנסות שוב מאוחר יותר.",
		   INFO_SUCCESS_PRE_MODERATION: "הקובץ ${0} הוגש לסקירה ויהיה זמין לאחר שיאושר.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} קבצים הוגשו לסקירה ויהיו זמינים לאחר שיאושרו."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "טעינה ושיתוף של קבצים"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "ביטול",
	   CONFIRM_OTHER_TAB: "נתונים שציינתם בלשוניות אחרות יאבדו אם תמשיכו בפעולה הנוכחית.  \u202bלחצו על 'אישור' כדי להמשיך או על 'ביטול' כדי לחזור.‏\u202c",
	   CONFIRM_CURRENT_TAB: "המידע שציינתם בלשונית ${0} יאבד אם תמשיכו בפעולה הנוכחית.  \u202bלחצו על 'אישור' כדי להמשיך או על 'ביטול' כדי לחזור.‏\u202c",
	   DIALOG_TITLE: "אישור פעולה",
	   OK: "אישור"
   }
})



