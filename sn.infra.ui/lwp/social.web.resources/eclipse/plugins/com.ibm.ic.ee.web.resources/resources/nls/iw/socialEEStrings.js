define(
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
	/* The placeholders for date formatting strings are as follows:
	   ${EEEE} is day of the week (e.g. Monday)
	   ${time} is time (e.g. 6:00 PM)
	   ${d} is numerical day of the month (e.g 15)
	   ${YYYY} is year (e.g. 2012)
	*/
	({
	   common: {
	      more: {
	         label: "יותר",
	         tooltip: "פעולות נוספות"
	       },
	       tags_more: "ועוד ${0}",
	       ERROR_ALT: "שגיאה"
	   },
	   generic: {
	      untitled: "(ללא שם)",
	      tags: "תגים:",
	      tags_more: "ועוד ${0}",
	      likes: "סימוני 'אהבתי'",
	      comments: "הערות",
	      titleTooltip: "ניווט אל ${app}",
	      error: "לא ניתן לאחזר את הנתונים.",
	      timestamp: {
	         created: {
	            DAY: "נוצר ${EEEE} בשעה ${time}",
	            MONTH: "נוצר ${MMM} ${d}",
	            TODAY: "נוצר היום בשעה ${time}",
	            YEAR: "נוצר ${d} ${MMM},‏ ${YYYY}",
	            YESTERDAY: "נוצר אתמול בשעה ${time}",
	            TOMORROW: "נוצר מחר בשעה ${time}"
	         },
	         updated: {
	            DAY: "עודכן ${EEEE} בעשה ${time}",
	            MONTH: "עודכן ${MMM} ${d}",
	            TODAY: "עודכן היום בשעה ${time}",
	            YEAR: "עודכן ${d} ${MMM},‏ ${YYYY}",
	            YESTERDAY: "עודכן אתמול בשעה ${time}",
	            TOMORROW: "עודכן מחר בשעה ${time}"
	         }
	      },
	      visibility: {
	         pub: "ציבורית",
	         priv: "פרטי"
	      },
	      action: {
	         created: "נוצר",
	         updated: "עודכן"
	      }
	   },
	   network : {
	      friendsInviteUpdatesDescription: "קבלת עדכונים על אנשים שאתם עוקבים אחריהם בדף הבית ובסיכום בדואל.",
	      profile_title: "פתיחת הפרופיל של ${user}.",
	      profile_a11y: "הפעלת קישור זה תפתח את הפרופיל של ${user} בחלון חדש.",
	      error: "אירעה שגיאה.  ${again}.",
	      error_again: "נא לנסות שוב",
	      error_404: "בקשת הרשת כבר אינה קיימת.",
	      warning: "אזהרה",
	      messages: {
	         success: {
	            accept: {
	            	nofollow: "כעת אתם חברי רשת. ",
	            	follow: "כעת אתם חברי רשת ועוקבים אחר ${user}."
	            },
	            ignore: {
	            	nofollow: "התעלמתם מהזמנה.",
	            	follow: "התעלמתם מהזמנה אבל אתם עוקבים כעת אחרי ${user}."
	            }
	         },
	         error: {
	            accept: "היתה שגיאה בהיענות לבקשה.",
	            ignore: "היתה שגיאה בהתעלמות מהבקשה."
	         }
	      },
	      timestamp: {
	          created: {
	              DAY: "${EEEE} בשעה ${time}",
	              MONTH: "${MMM} ${d}",
	              TODAY: "היום בשעה ${time}",
	              YEAR: "${MMM} ${d}, ${YYYY}",
	              YESTERDAY: "אתמול בשעה ${time}",
	              TOMORROW: "מחר בשעה ${time}"
	           }
	      }
	   },
	   file: {
	      a11y_help: "הפעלת קישור זה תפתח את ${name} בחלון חדש.",
	      tooltip: "פתיחת ${name} ביישום הקבצים",
	      profile_title: "פתיחת הפרופיל של ${user}.",
	      profile_a11y: "הפעלת קישור זה תפתח את הפרופיל של ${user} בחלון חדש.",
	      download_tooltip: "הורדת קובץ זה (${0})",
	      following: {
	         add: "מעקב",
	         remove: "הפסקת מעקב",
	         title: "מיתוג קבלת העדכונים על קובץ זה"
	      },
	      share: {
	         label: "שיתוף",
	         title: "הענקת גישה לקובץ זה לאחרים"
	      },
	      timestamp: {
	         created: {
	            DAY: "נוצר ${EEEE} בשעה ${time}",
	            MONTH: "נוצר ${MMM} ${d}",
	            TODAY: "נוצר היום בשעה ${time}",
	            YEAR: "נוצר ${d} ${MMM},‏ ${YYYY}",
	            YESTERDAY: "נוצר אתמול בשעה ${time}",
	            TOMORROW: "נוצר מחר בשעה ${time}"
	         },
	         createdOther: {
	            DAY: "${user} נוצר ${EEEE} בשעה ${time}",
	            MONTH: "${user} נוצר בתאריך ${MMM} ${d}",
	            TODAY: "${user} נוצר היום בשעה ${time}",
	            YEAR: "${user} נוצר ${d} ${MMM},‏ ${YYYY}",
	            YESTERDAY: "${user} נוצר אתמול בשעה ${time}",
	            TOMORROW: "${user} נוצר מחר בשעה ${time}"
	         },
	         updated: {
	            DAY: "עודכן ${EEEE} בעשה ${time}",
	            MONTH: "עודכן ${MMM} ${d}",
	            TODAY: "עודכן היום בשעה ${time}",
	            YEAR: "עודכן ${d} ${MMM},‏ ${YYYY}",
	            YESTERDAY: "עודכן אתמול בשעה ${time}",
	            TOMORROW: "עודכן מחר בשעה ${time}"
	         },
	         updatedOther: {
	            DAY: "${user} עודכן ${EEEE} בשעה ${time}",
	            MONTH: "${user} עודכן בתאריך ${MMM} ${d}",
	            TODAY: "${user} עודכן היום בשעה ${time}",
	            YEAR: "${user} עודכן ${MMM} ${d},‏ בשעה ${YYYY}",
	            YESTERDAY: "${user} עודכן אתמול בשעה ${time}",
	            TOMORROW: "${user} עודכן מחר בשעה ${time}"
	         },
	         createdCompact: {
	            DAY: "נוצר: ${EEEE} בשעה ${time}",
	            MONTH: "נוצר: ${MMM} ${d}",
	            TODAY: "נוצר: היום בשעה ${time}",
	            YEAR: "נוצר: ${MMM} ${d},‏ בשעה ${YYYY}",
	            YESTERDAY: "נוצר: אתמול בשעה ${time}",
	            TOMORROW: "נוצר: מחר בשעה ${time}"
	         },
	         updatedCompact: {
	            DAY: "עודכן: ${EEEE} בשעה ${time}",
	            MONTH: "עודכן: ${MMM} ${d}",
	            TODAY: "עודכן: היום בשעה ${time}",
	            YEAR: "עודכן: ${MMM} ${d},‏ בשעה ${YYYY}",
	            YESTERDAY: "עודכן: אתמול בשעה ${time}",
	            TOMORROW: "עודכן: מחר בשעה ${time}"
	         }
	      },
	      about: {
	         CREATE_TIMESTAMP: "${date_long} ${time_long} על ידי ${user}",
	         UPDATE_TIMESTAMP: "${date_long} ${time_long} על ידי ${user}",
	         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
	      },
	      download: {
	      	 TOOLTIP: "הורדת קובץ זה (${size})",
	      	 DOWNLOAD_ALT: "הורדה"
	      },

	      PREVIEW: {
	         LINK: "תצוגה מקדימה",
	         TITLE: "תצוגה מקדימה של קובץ זה בחלון חדש."
	      },
	      TAGS: "תגים:",
	      error: "אירעה שגיאה.  ${again}.",
	      error_again: "נא לנסות שוב",
	      error_404: "הקובץ כבר אינו קיים או שאין לכם הרשאות מספיקות לגשת אליו.",
	      error_403: "אין לכם הרשאה להציג קובץ זה.‏ הקובץ אינו ציבורי ואינו משותף אתכם.",
	      notifications: {
	         USER_SHARED: "${user} כתב:",
	         CHANGE_SUMMARY: "${user} סיפק סיכום שינויים",
	         NO_CHANGE_SUMMARY: "${user} לא סיפק סיכום שינויים",
	         COMMENTED: "${user} העיר "
	      }
	   },
	   authUser: {
	      error: "אירעה שגיאה באחזור המשתמש הנוכחי. ${again}.",
	      error_again: "נא לנסות שוב",
	      error_404: "המשתמש המאומת לא נמצא.",
	      error_403: "אין לכם הרשאה לאחזר פרטי משתמש. "
	   },
	   forum: {
	      error: "אירעה שגיאה.  ${again}.",
	      error_again: "נא לנסות שוב",
	      error_404: "הפורום כבר אינו קיים או שאין לכם הרשאות מספיקות לגשת אליו.",
	      error_403: "אין לכם הרשאה להציג פורום זה.‏ הפורום אינו ציבורי ואינו משותף אתכם.",

	      readMore: "הצגת הנושא המלא...‏",
	      readMore_tooltip: "פתיחת נושא הפורום ${name}.‏",
	      readMore_a11y: "הפעלת קישור זה תפתח את נושא הפורום ${name} בחלון חדש.",
	      QUESTION_ANSWERED: "שאלה זו נענתה.",
	      QUESTION_NOT_ANSWERED: "שאלה זו עדיין לא נענתה."
	   },
	   blog: {
	      error: "אירעה שגיאה.  ${again}.",
	      error_again: "נא לנסות שוב",
	      error_404: "הבלוג כבר אינו קיים או שאין לכם הרשאות מספיקות לגשת אליו.",
	      error_403: "אין לכם הרשאה להציג בלוג זה. הבלוג אינו ציבורי ולא שותף אתכם.",
	      readMore: " מידע נוסף...",
	      readMore_tooltip: "פתיחת רשומת הבלוג ${name}.‏",
	      readMore_a11y: "הפעלת קישור זה תפתח את רשומת הבלוג ${name} בחלון חדש.",
	      graduated: "בוגר",
	  	  vote: {
	  			INLINE: {
	  				UNRECOMMENDED: {
	  					READONLYTEXT: "",
	  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>הצבעה</a>"
	  				},

	  				RECOMMENDED: {
	  					READONLYTEXT: "<span class='lotusLikeDescription'>הצבעתי</span>",
	  					TEXT: 		"<span class='lotusLikeDescription'>הצבעתי</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>ביטול פעולה</a>"
	  				},

	  				RECOMMENDED_BYONE:  {
	  					READONLYTEXT: "${recommendCount}",
	  					TEXT: 		"${recommendCount}",
	  					TOOLTIP: 	"1 אדם הצביע "
	  				},

	  				RECOMMENDED_BYMANY:  {
	  					READONLYTEXT: "${recommendCount}",
	  					TEXT: 		"${recommendCount}",
	  					TOOLTIP: 	"${recommendCount} הצביעו "
	  				}
	  			},
	  			LOADING: "טעינה בביצוע...",
	  			TEMPLATE_STRINGS: {
	  				LIKES: "הצבעתי"
	  			}
	  		}
	   },
	   idea: {
	      readMore_tooltip: "פתיחת הרעיון ${name}.‏",
	      readMore_a11y: "הפעלת קישור זה תפתח את הרעיון ${name} בחלון חדש.",
	   },
	   size: {
	      B: "${0} בתים",
	      KB: "${0} ק''ב",
	      MB: "${0} מ''ב",
	      GB: "${0} ג''ב"
	   },
	   REPLIES: {
	      THIS_TAB_TITLE: "תשובה זו   ",
	      TAB_TITLE: "תשובות (${0})",
	      REPLY_TO_REPLY: "בתגובה על ${thisReply}",
	      REPLY_TO_TOPIC: "בתגובה על ${thisTopic}",
	      THIS_TOPIC: "נושא זה",
	      THIS_REPLY: "תשובה זו",
	      NAVIGATE_TO_REPLY: "ניווט אל תשובת האב",
	      NAVIGATE_TO_TOPIC: "ניווט אל נושא האב",
	      ADD_COMMENT: "תשובה לנושא זה",
	      ADD_COMMENT_TOOLTIP: "תשובה לנושא פורום זה",
	      SHOWING_RECENT_REPLIES: "מוצגים ${0} התשובות האחרונות",
	      PREV_COMMENTS: "הצגת תשובות נוספות",
	      PLACEHOLDER_TXT: "תשובה לנושא זה",
	      EMPTY: "אין תשובות.",
	      TRIM_LONG_COMMENT: "לקצר את התשובה?",
	      WARN_LONG_COMMENT: "התשובה ארוכה מדי.  ${shorten}",
	      ERROR_CREATE: "לא ניתן לשמור את התשובה.  נסו שוב מאוחר יותר.‏",
	      ERROR_CREATE_NOT_FOUND: "לא ניתן לשמור את התשובה שלכם מפני שהנושא נמחק או כבר אינו זמין עבורכם.",
	      ERROR_CREATE_ACCESS_DENIED: "לא ניתן לשמור את התשובה שלכם מפני שהנושא נמחק או כבר אינו זמין עבורכם.",
	      ERROR_CREATE_TIMEOUT: "לא ניתן לשמור את התשובה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'שמירה' כדי לנסות שוב.",
	      ERROR_CREATE_CANCEL: "לא ניתן לשמור את התשובה שלכם מפני שהבקשה בוטלה.  לחצו על 'שמירה' כדי לנסות שוב.",
	      ERROR_CREATE_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי ליצור תשובה זו.  לחצו על 'שמירה' כדי להציג את הנחיית ההתחברות.",
	      ERROR_NO_CONTENT: "ציינו את התשובה ולחצו על 'שמירה'.  אם כבר אינכם מעוניינים להוסיף הערה, לחצו על 'ביטול'.",
	      COMMENT_DELETED: {
	         DAY: "התשובה נמחקה על ידי ${user} ביום ${EEEE} בשעה ${time}",
	         MONTH: "התשובה נמחקה על ידי ${user} בתאריך ${MMM} ${d}",
	         TODAY: "התשובה נמחקה על ידי ${user} היום בשעה ${time}",
	         YEAR: "התשובה נמחקה על ידי ${user} ביום ${d} ${MMM}, בשעה ${YYYY}",
	         YESTERDAY: "התשובה נמחקה על ידי ${user} אתמול בשעה ${time}",
	         TOMORROW: "התשובה נמחקה על ידי ${user} מחר בשעה ${time}"
	      },
	      REASON_FOR_DELETION: "סיבת המחיקה: ${reason}",
	      REPLY_TITLE: "הנדון: ${0}",
	      SHOW_FULL_REPLY: "הצגת התשובה המלאה",
	      SHOW_FULL_REPLY_TOOLTIP: "ניווט אל התשובה המקורית בנושא הפורום",
	      REPLY_ACTION: "תשובה",
	      REPLY_ACTION_TOOLTIP: "תשובה לפרסום זה"
	   },
	   COMMENTS: {
	      ARIA_LABEL: "הערות",
	      PLACEHOLDER_TXT: "הוספת הערה",
	      TAB_TITLE: "הערות (${0})",
	      ACTION_NOT_SUPPORTED: "פעולה לא נתמכת",
	      ADD_COMMENT: "הוספת הערה",
	      ADD_COMMENT_TOOLTIP: "הוספת הערה לפריט זה",
	      CANCEL: "ביטול",
	      COMMENT_COUNT_ONE: "${0} הערה",
	      COMMENT_COUNT_MANY: "${0} הערות",
	      COMMENT_LABEL: "הערה:",
	      DELETE: "מחיקה",
	      DELETE_TOOLTIP: "מחיקת הערה",
	      DELETEREASON: "סיבה למחיקת ההערה:",
	      DIALOG_TITLE: "קיצור ההערה",
	      TOOLTIP: "קיצור ההערה",
	      NAME: "קיצור ההערה",
	      EDIT: "עריכה",
	      EDIT_TOOLTIP: "עריכת הערה",
	      ERROR_CREATE: "לא ניתן לשמור את ההערה שלכם.  נסו שוב מאוחר יותר.‏",
	      ERROR_CREATE_NOT_FOUND: "לא ניתן לשמור את ההערה שלכם מפני שהקובץ נמחק או כבר אינו זמין עבורכם.",
	      ERROR_CREATE_ACCESS_DENIED: "לא ניתן לשמור את ההערה שלכם מפני שהקובץ נמחק או כבר אינו זמין עבורכם.",
	      ERROR_CREATE_TIMEOUT: "לא ניתן לשמור את ההערה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'שמירה' כדי לנסות שוב.",
	      ERROR_CREATE_CANCEL: "לא ניתן לשמור את ההערה שלכם מפני שהבקשה בוטלה.  לחצו על 'שמירה' כדי לנסות שוב.",
	      ERROR_CREATE_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי ליצור הערה זו.  לחצו על 'שמירה' כדי להציג את הנחיית ההתחברות.",
	      ERROR_DELETE: "לא ניתן למחוק את ההערה שלכם.  נסו שוב מאוחר יותר.‏",
	      ERROR_DELETE_TIMEOUT: "לא ניתן למחוק את ההערה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'מחיקה' כדי לנסות שוב.",
	      ERROR_DELETE_NOT_FOUND: "לא ניתן למחוק את ההערה שלכם מפני שההערה או הקובץ נמחקו או כבר אינם זמינים עבורכם.",
	      ERROR_DELETE_ACCESS_DENIED: "לא ניתן למחוק את ההערה שלכם מפני שהקובץ נמחק או כבר אינו זמין עבורכם.",
	      ERROR_DELETE_CANCEL: "לא ניתן למחוק את ההערה שלכם מפני שהבקשה בוטלה.  לחצו על 'מחיקה' כדי לנסות שוב.",
	      ERROR_DELETE_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי למחוק הערה זו.  לחצו על 'מחיקה' כדי להציג את הנחיית ההתחברות.",
	      ERROR_EDIT: "לא ניתן לעדכן את ההערה שלכם.  נסו שוב מאוחר יותר.‏",
	      ERROR_EDIT_ACCESS_DENIED: "לא ניתן לעדכן את ההערה שלכם מפני שהקובץ נמחק או כבר אינו זמין עבורכם.",
	      ERROR_EDIT_NOT_FOUND: "לא ניתן לעדכן את ההערה שלכם מפני שהקובץ נמחק או כבר אינו זמין עבורכם.",
	      ERROR_EDIT_TIMEOUT: "לא ניתן לעדכן את ההערה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'שמירה' כדי לנסות שוב.",
	      ERROR_EDIT_CANCEL: "לא ניתן לעדכן את ההערה שלכם מפני שהבקשה בוטלה.  לחצו על 'שמירה' כדי לנסות שוב.",
	      ERROR_EDIT_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי לערוך הערה זו.  לחצו על 'שמירה' כדי להציג את הנחיית ההתחברות.",
	      ERROR_NO_CONTENT: "ציינו את הערכתם ולחצו על 'אישור'. אם כבר אינכם מעוניינים להוסיף הערה, לחצו על 'ביטול'.",
	      ERROR_NO_CONTENT_EDIT: "ציינו את הערתכם ולחצו על 'אישור'. אם כבר אינכם מעוניינים לערוך את ההערה, לחצו על 'ביטול'.",
	      ERROR_GENERAL: "אירעה שגיאה.‏",
	      OK: "אישור",
	      YES: "כן",
	      TRIM_LONG_COMMENT: "לקצר הערות?",
	      WARN_LONG_COMMENT: "ההערה ארוכה מדי.  ${shorten}",
	      LINK: "קישור",
	      SAVE: "שמירה",
	      POST: "פרסום",
	      SHOWMORE: "מידע נוסף...‏",
	      VIEW_COMMENTS_FILE: "הצגת הערות לקובץ זה",
	      SUBSCRIBE_TO_COMMENTS: "מינוי להערות אלה",
	      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "מעקב אחר שינויים בהערות אלה באמצעות קורא ערוצי התוכן שלכם",
	      PROFILE_TITLE: "פתיחת הפרופיל של ${user}.",
	      PROFILE_A11Y: "הפעלת קישור זה תפתח את הפרופיל של ${user} בחלון חדש.",
	      MODERATION_PENDING: "הערה זו ממתינה לסקירה.",
	      MODERATION_REMOVED: {
	         DAY: "הערה זו סולקה על ידי ${user} ביום ${EEEE} בשעה ${time}.",
	         MONTH: "ההערה סולקה על ידי ${user}  בתאריך ${MMM} ${d}.",
	         TODAY: "הערה זו סולקה על ידי ${user} היום בשעה ${time}.",
	         YEAR: "הערה זו סולקה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}.",
	         YESTERDAY: "הערה זו סולקה על ידי ${user} אתמול בשעה ${time}.",
	         TOMORROW: "הערה זו סולקה על ידי ${user} מחר בשעה ${time}."
	      },

	      MODERATION_REJECTED: {
	         DAY: "הערה זו נפסלה על ידי ${user} ביום ${EEEE} בשעה ${time}.",
	         MONTH: "ההערה נפסלה על ידי ${user}  בתאריך ${d} ${MMM}.",
	         TODAY: "הערה זו נפסלה על ידי ${user} היום בשעה ${time}.",
	         YEAR: "הערה זו נפסלה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}.",
	         YESTERDAY: "הערה זו נפסלה על ידי ${user} אתמול בשעה ${time}.",
	         TOMORROW: "הערה זו נפסלה על ידי ${user} מחר בשעה ${time}."
	      },
	      PREV_COMMENTS: "הצגת הערות קודמות",
	      EMPTY: "אין הערות.",
	      ERROR_ALT: "שגיאה",
	      ERROR: "אירעה שגיאה באחזור ההערות. ${again}",
	      ERROR_ADDTL: "אירעה שגיאה באחזור הערות נוספות. ${again}",
	      ERROR_AGAIN: "נא לנסות שוב.",
	      ERROR_AGAIN_TITLE: "חזרו על הבקשה כדי לראות הערות נוספות.",
	      COMMENT_CREATED: {
	         DAY: "${user} ${EEEE} בשעה ${time} (גרסה ${version})",
	         MONTH: "${user} ${d} ${MMM} (גרסה ${version})",
	         TODAY: "${user} היום בשעה ${time} (גרסה ${version})",
	         YEAR: "${user} ${d} ${MMM}, ${YYYY} (גרסה ${version})",
	         YESTERDAY: "${user} אתמול בשעה ${time} (גרסה ${version})",
	         TOMORROW: "${user} מחר בשעה ${time} (גרסה ${version})"
	      },

	      COMMENT_CREATED_NOVERSION: {
	         DAY: "${user} ${EEEE} בשעה ${time}",
	         MONTH: "${user} ${d} ${MMM} ",
	         TODAY: "${user} היום בשעה ${time} ",
	         YEAR: "$${user} ${d} {MMM}, ${YYYY}",
	         YESTERDAY: "${user} אתמול בשעה ${time} ",
	         TOMORROW: "${user} מחר בשעה ${time} "
	      },

	      COMMENT_CREATED_TIME: {
	         DAY: "${EEEE} בשעה ${time}",
	         MONTH: "${MMM} ${d}",
	         TODAY: "היום בשעה ${time}",
	         YEAR: "${MMM} ${d}, ${YYYY}",
	         YESTERDAY: "אתמול בשעה ${time}",
	         TOMORROW: "מחר בשעה ${time}"
	      },

	      COMMENT_DELETED: {
	         DAY: "ההערה נמחקה על ידי ${user} ביום ${EEEE} בשעה ${time}",
	         MONTH: "ההערה נמחקה על ידי ${user} בתאריך ${MMM} ${d}",
	         TODAY: "ההערה נמחקה על ידי ${user} היום בשעה ${time}",
	         YEAR: "ההערה נמחקה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}",
	         YESTERDAY: "ההערה נמחקה על ידי ${user} אתמול בשעה ${time}",
	         TOMORROW: "ההערה נמחקה על ידי ${user} מחר בשעה ${time}"
	      },
	      COMMENT_EDITED: {
	         DAY: "${user} ערך ביום ${EEEE} בשעה ${time} (גרסה ${version})",
	         MONTH: "${user} ערך ${MMM} ${d} (גרסה ${version})",
	         TODAY: "${user} ערך היום בשעה ${time} (גרסה ${version})",
	         YEAR: "${user} ערך ביום ${MMM} ${d}, ${YYYY} (גרסה ${version})",
	         YESTERDAY: "${user} ערך אתמול בשעה ${time} (גרסה ${version})",
	         TOMORROW: "${user} ערך מחר בשעה ${time} (גרסה ${version})"
	      },
	      COMMENT_EDITED_NOVERSION: {
	         DAY: "${user} ערך ביום ${EEEE} בשעה ${time} ",
	         MONTH: "${user} ערך ${MMM} ${d}",
	         TODAY: "${user} ערך היום בשעה ${time}",
	         YEAR: "${user} ערך ${d} ${MMM}, ${YYYY}",
	         YESTERDAY: "${user} ערך אתמול בשעה ${time}",
	         TOMORROW: "${user} ערך מחר בשעה ${time}"
	      },

	      DELETE_CONFIRM: "אתם בטוחים שברצונכם למחוק הערה זו?‏",
	      FLAG_ITEM: {
	         BUSY: "שמירה...",
	         CANCEL: "ביטול",
	         ACTION: "סימון כלא הולם",
	         DESCRIPTION_LABEL: "ציינו סיבה לסימון פריט זה (אופציונלי)‏",
	         EDITERROR: "המטא-נתונים של הקובץ לא נערכו בגלל שגיאה.",
	         OK: "שמירה",
	         ERROR_SAVING: "היתה שגיאה בעיבוד הבקשה. נסו שוב מאוחר יותר.‏",
	         SUCCESS_SAVING: "הסימון שלכם הוגש. מנחה יבדוק אותו בתוך זמן קצר.",
	         TITLE: "סימון פריט זה כלא הולם",
	         COMMENT: {
	            TITLE: "סימון הערה זו כלא הולמת",
	            A11Y: "לחצן זה פותח תיבת דו-שיח המאפשרת למשתמש לסמן הערה זו כלא הולמת."
	         }
	      }
	   },

	   COMMENTS_DELETE: {
	      CANCEL: "ביטול",
	      DIALOG_TITLE: "מחיקת הערה",
	      NAME: "מחיקת הערה",
	      OK: "אישור",
	      TOOLTIP: "מחיקת הערה"
	   },

	   COMMENTS_SHORTEN: {
	      CANCEL: "ביטול",
	      CONFIRM: "הקיצור יסלק כל תמליל החורג ממגבלת ההערה.  לחצו על 'אישור' כדי לקצר או על 'ביטול' כדי לערוך את ההערה בעצמכם.",
	      DIALOG_TITLE: "קיצור ההערה",
	      NAME: "קיצור ההערה",
	      OK: "אישור",
	      TOOLTIP: "קיצור ההערה"
	   },

	   COMMENTS_SUBMITTED: {
	      DIALOG_TITLE: "אישור הגשה",
	      CONFIRM: "ההערכה שלכם הוגשה לסקירה ותהיה זמינה לאחר שתאושר.",
	      OK: "אישור"
	   },

	   DATE: {
	      AM: "AM",
	      FULL: "${EEEE}, ${date_long} ${time_long}",
	      PM: "PM",
	      TODAY: "היום",
	      TODAY_U: "היום",
	      YESTERDAY: "אתמול",
	      YESTERDAY_U: "אתמול",

	      ADDED: { DAY: "נוסף ${EEee} בשעה ${time}",
	         FULL: "${EEEE}, ${date_long} ${time_long}",
	         MONTH: "נוסף ${date_long}",
	         TODAY: "נוסף היום בשעה ${time}",
	         YEAR: "נוסף ${date_long}",
	         YESTERDAY: "נוסף אתמול בשעה ${time}"
	      },

	      LAST_UPDATED: { DAY: "עודכן לאחרונה ${EEee} בשעה ${time}",
	         FULL: "${EEEE}, ${date_long} ${time_long}",
	         MONTH: "עדכון אחרון ${date_long}",
	         TODAY: "עודכן לאחרונה היום בשעה ${time}",
	         YEAR: "עדכון אחרון ${date_long}",
	         YESTERDAY: "עודכן לאחרונה אתמול בשעה ${time}"
	      },

	      MONTHS_ABBR: { 0: "ינו",
	         10: "נוב",
	         11: "דצמ",
	         1: "פבר",
	         2: "מרס",
	         3: "אפר",
	         4: "מאי",
	         5: "יונ",
	         6: "יול",
	         7: "אוג",
	         8: "ספט",
	         9: "אוק"
	      },

	      COMPACT: { DAY: "${EEee}",
	         FULL: "${EEEE}, ${date_long} ${time_long}",
	         MONTH: "${date_short}",
	         TODAY: "היום",
	         YEAR: "${date_short}",
	         YESTERDAY: "אתמול",
	         TOMORROW: "מחר"
	      },

	      RELATIVE_TIME: { DAY: "${EEee} בשעה ${time}",
	         FULL: "${EEEE}, ${date_long} ${time_long}",
	         MONTH: "${date_short}",
	         TODAY: "היום בשעה ${time}",
	         YEAR: "${date_short}",
	         YESTERDAY: "אתמול בשעה ${time}",
	         TOMORROW: "מחר בשעה ${time}"
	      },

	      RELATIVE_TIME_LONG: { DAY: "${EEee} בשעה ${time}",
	         FULL: "${EEEE}, ${date_long} ${time_long}",
	         MONTH: "${date_long}",
	         TODAY: "היום בשעה ${time}",
	         YEAR: "${date_long}",
	         YESTERDAY: "אתמול בשעה ${time}",
	         TOMORROW: "מחר בשעה ${time}"
	      },

	      DATE_TIME: { DAY: "${date_short} בשעה ${time}",
	         FULL: "${EEEE}, ${date_long} ${time_long}",
	         MONTH: "${date_short} בשעה ${time}",
	         TODAY: "${date_short} בשעה ${time}",
	         YEAR: "${date_short} בשעה ${time}",
	         YESTERDAY: "${date_short} בשעה ${time}",
	         TOMORROW: "${date_short} בשעה ${time}"
	      },

	      DATE_ONLY: { DAY: "${date_short}",
	         FULL: "${EEEE}, ${date_long}",
	         MONTH: "${date_short}",
	         TODAY: "${date_short}",
	         YEAR: "${date_short}",
	         YESTERDAY: "${date_short}",
	         TOMORROW: "${date_short}"
	      },

	      TIME_ONLY: { DAY: "${time}",
	         FULL: "${time_long}",
	         MONTH: "${time}",
	         TODAY: "${time}",
	         YEAR: "${time}",
	         YESTERDAY: "${time}",
	         TOMORROW: "${time}"
	      },

	      UPDATED: { DAY: "עודכן ${EEee} בעשה ${time}",
	         FULL: "${EEEE}, ${date_long} ${time_long}",
	         MONTH: "עודכן ${date_long}",
	         TODAY: "עודכן היום בשעה ${time}",
	         YEAR: "עודכן ${date_long}",
	         YESTERDAY: "עודכן אתמול בשעה ${time}"
	      }
	   },
	   VERSIONS: {
	      ERROR: "לא ניתן לטעון את פרטי הגרסה.",
	      ERROR_REQUEST_CANCELLED: "הבקשה בוטלה.",
	      ERROR_REQUEST_TIMEOUT: "לא ניתן להתחבר לשרת.",
	      ERROR_REQUEST_UNKNOWN: "אירעה שגיאה לא ידועה.",
	      LOADING: "טעינה...‏",
	      NO_VERSIONS: "אין גרסאות",
	      INFO: "גרסה ${0} נוצרה ${1} על ידי ",
	      VERSION_NUMBER: "גרסה ${0}",
	      DELETED: "נמחק",
	      DELETE_ALL: "מחיקת כל הגרסאות הקודמות לגרסה",
	      DELETE_VERSION_SINGLE: "מחיקת גרסה ${0}",
	      DELETEERROR: "הגרסה לא נמחקה בגלל שגיאה.",
	      CREATE_VERSION: "יצירת גרסה חדש",
	      CREATE_VERSION_TOOLTIP: "יצירת גרסה של קובץ זה",
	      REVERT_VERSION: "שחזור גרסה ${0}",
	      REVERT_DESCRIPTION: "שוחזר מגרסה ${0}",
	      PREVIOUS: "הקודם",
	      PREVIOUS_TOOLTIP: "הדף הקודם",
	      ELLIPSIS: "...",
	      NEXT: "הבא",
	      NEXT_TOOLTIP: "הדף הבא",
	      COUNT: "${0} - ${1} מתוך ${2}",
	      COUNT_SHORT: "${0}-${1}",
	      PAGE: "דף",
	      SHOW: "הצגת",
	      ITEMS_PER_PAGE: " פריטים בדף.",
	      DATE: {
	        AM: "AM",
	        RELATIVE_TIME: { DAY: "${date}",
	            YEAR: "${date_long}",
	            FULL: "${date_long} ${time_long}",
	            MONTH: "${date}",
	            TODAY: "היום בשעה ${time}",
	            YESTERDAY: "אתמול בשעה ${time}"
	        },
	        RELATIVE_TIME_L: { DAY: "${EEee} בשעה ${time}",
	            YEAR: "${date_short} בשעה ${time}",
	            FULL: "${EEEE}, ${date_long} ${time_long}",
	            MONTH: "${date_short} בשעה ${time}",
	            TODAY: "היום בשעה ${time}",
	            YESTERDAY: "אתמול בשעה ${time}"
	        },
	        UPDATED: { DAY: "עודכן ${EEee} בעשה ${time}",
	            YEAR: "עודכן ${date_short}",
	            FULL: "${EEEE}, ${date_long} ${time_long}",
	            MONTH: "עודכן ${date_short}",
	            TODAY: "עודכן היום בשעה ${time}",
	            YESTERDAY: "עודכן אתמול בשעה ${time}"
	        }
	      },
	      CONTENT: {
	         DELETE_TOOLTIP: "מחיקת גרסה ${0}",
	         DOWNLOAD: "הורדה",
	         DOWNLOAD_TOOLTIP: "הורדת גרסה זו (${0})",
	         VIEW: "תצוגה",
	         VIEW_TOOLTIP: "הצגת גרסה ${0}",
	         REVERT: {
	            A11Y: "לחצן זה פותח תיבת דו-שיח המאפשרת למשתמש לאשר שחזור של קובץ מגרסה קודמת. אישור הפעולה יגרום לרענון תוכן הדף.",
	            FULL: "שחזור",
	            WIDGET: "שחזור גרסה זו"
	         }
	      },
	      DELETE: {
	         ERROR_NOT_FOUND: "לא ניתן למחוק את הגרסה מפני שהיא נמחקה או כבר אינה זמינה עבורכם.",
	         ERROR_ACCESS_DENIED: "לא ניתן למחוק את הגרסה מפני שאינכם עורכים.",
	         ERROR_TIMEOUT: "הגרסה לא נמחקה מפני שלא ניתן להתחבר לשרת.  לחצו על 'מחיקה' כדי לנסות שוב.",
	         ERROR_CANCEL: "הגרסה לא נמחקה מפני שהבקשה בוטלה.  לחצו על 'מחיקה' כדי לנסות שוב.",
	         ERROR_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי למחוק גרסה זו.  לחצו על 'מחיקה' כדי להציג את הנחיית ההתחברות.",
	         GENERIC_ERROR: "לא ניתן למחוק את הגרסה בגלל שגיאה לא ידועה.  לחצו על 'מחיקה' כדי לנסות שוב.",
	         FULL: "מחיקה",
	         A11Y: "לחצן זה פותח תיבת דו-שיח המאפשרת למשתמש לאשר את מחיקת הגרסה. אישור הפעולה יגרום לרענון תוכן הדף."
	      },

	      REVERT: {
	         ERROR_NOT_FOUND: "לא ניתן לשחזר את הגרסה מפני שהיא נמחקה או כבר אינו זמינה עבורכם.",
	         ERROR_ACCESS_DENIED: "לא ניתן לשחזר את הגרסה מפני שאינכם עורכים.",
	         ERROR_NAME_EXISTS: "לא ניתן לשחזר את הגרסה מפני שיש קובץ אחר באותו שם.",
	         ERROR_TIMEOUT: "גרסה לא שוחזרה מפני שלא ניתן להתחבר לשרת.  לחצו על 'שחזור' כדי לנסות שוב.",
	         ERROR_CANCEL: "הגרסה לא שוחזרה מפני שהבקשה בוטלה.  לחצו על 'שחזור' כדי לנסות שוב.",
	         ERROR_QUOTA_VIOLATION: "לא ניתן לשחזר את הגרסה בגלל מגבלות שטח.",
	         ERROR_MAX_CONTENT_SIZE: "לא ניתן לשחזר את הגרסה מפני שהיא חורגת מהגודל המרבי המותר, ${0}",
	         GENERIC_ERROR: "לא ניתן לשחזר את הגרסה בגלל שגיאה לא ידועה.  לחצו על 'שחזור' כדי לנסות שוב."
	      }
	   },

	   DOWNLOAD_INFO: {
	      SHOW_PEOPLE: "ראו מי הוריד...‏",
	      PREVIOUS: "הקודם",
	      PREVIOUS_TOOLTIP: "הדף הקודם",
	      ELLIPSIS: "...",
	      NEXT: "הבא",
	      NEXT_TOOLTIP: "הדף הבא",
	      COUNT: "${0} - ${1} מתוך ${2}",
	      COUNT_SHORT: "${0}-${1}",
	      PAGE: "דף",
	      SHOW: "הצגת",
	      ITEMS_PER_PAGE: " פריטים בדף.",
	      VERSION: {
	         DAY: "גרסה ${version} בתאריך ${date}",
	         MONTH: "גרסה ${version} בתאריך ${date}",
	         TODAY: "גרסה ${version} בשעה ${time}",
	         YEAR: "גרסה ${version} בתאריך ${date}",
	         YESTERDAY: "גרסה ${version} אתמול"
	      },

	      FILE: {
	         V_LATEST: "הורדתם את הגרסה האחרונה של קובץ זה",
	         V_OLDER: "הורדתם את גרסה ${0} של קובץ זה",
	         LOADING: "טעינה בביצוע...",
	         EMPTY: "משתמשים אנונימיים בלבד",
	         ERROR: "לא ניתן לטעון את פרטי ההורדה"
	      }
	   },

	   EE_DIALOG: {
	      ERROR: "שגיאה",
	      ERROR_ALT_TEXT: "שגיאה:",
	      ERROR_MSG_GENERIC: "אירעה בעיה. נא לנסות שוב.‏",
	      ERROR_MSG_NOT_AVAILABLE: "פריט זה נמחק או כבר אינו זמין.",
	      ERROR_MSG_CONTENT_NOT_AVAILABLE: "התוכן של פריט זה אינו זמין.",
	      ERROR_MSG_NO_ACCESS: "כבר אין לכם גישה לפריט זה.‏",
	      LOADING: "טעינה בביצוע...",
	      TITLE_SU: "${author} יצר רשומת לוח.",
	      TITLE_NI: "${author} הזמין אתכם לרשת שלו. ",
	      AUTHOR_TITLE: "הצגת הפרופיל עבור ${author}"
	   },
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
	   statusUpdate: {
	       createdCompact: {
	           DAY: "נוצר: ${EEEE} בשעה ${time}",
	           MONTH: "נוצר: ${MMM} ${d}",
	           TODAY: "נוצר: היום בשעה ${time}",
	           YEAR: "נוצר: ${MMM} ${d},‏ בשעה ${YYYY}",
	           YESTERDAY: "נוצר: אתמול בשעה ${time}",
	           TOMORROW: "נוצר: מחר בשעה ${time}"
	       },
	      error: "אירעה שגיאה.  ${again}.",
	      error_again: "נא לנסות שוב",
	      error_404: "עדכון המצב אינו קיים יותר.",
	      notifications: {
	         STATUS_UPDATE: "${user} יצר רשומת לוח.",
	         USER_BOARD_POST: "${user} כתב על הלוח שלכם",
	         POST_COMMENT: "${user} כתב:"
	      }
	   },
	   login: {
	      error: "שם המשתמש ו/או הסיסמה אינם תואמים לחשבונות קיימים כלשהם. נא לנסות שוב.‏",
	      logIn: "התחברות",
	      password: "סיסמה:",
	      user: "שם משתמש:",
	      welcome: "התחברות אל HCL Connections"
	   },
	   repost: {
	      name: "פרסום חוזר",
	      title: "פרסום חוזר של פרסום זה לעוקבים או לקהילות שלי ",
	      msg_success: "העדכון פורסם מחדש בהצלחה לעוקבים שלכם.",
	      msg_generic: "אירעה בעיה.  נא לנסות שוב.‏"
	   },
	   FILE_SHARE_INFO: {
	      ADD: "הוספה",
	      ADD_TXT: "הוספת אנשים או קהילות בתור קוראים",
	      SHOW_MORE: "הצגת עוד...‏",
	      READER_IF_PUBLIC: "כולם (ציבורי)",
	      READER_IF_PUBLIC_TOOLTIP: "קובץ זה ציבורי וגלוי לכולם",
	      EMPTY_READERS: "ללא",
	      READERS_LABEL: "קוראים:\u00a0",
	      EDITORS_LABEL: "עורכים:\u00a0",
	      OWNER_LABEL: "בעלים:\u00a0",
	      ERROR: "לא ניתן לטעון את פרטי השיתוף",
	      ERROR_NOT_FOUND: "הקובץ שביקשתם נמחק או הועבר.‏ אם מישהו שלח לכם את הקישור, ודאו שהוא אינו שגוי.",
	      ERROR_ACCESS_DENIED: "אין לכם הרשאה להציג קובץ זה.‏  הקובץ אינו ציבורי ואינו משותף אתכם.",
	      SHARE: "שיתוף",
	      CANCEL: "ביטול",
	      SHARE_WITH: "שיתוף עם:",
	      PERSON: "אדם",
	      COMMUNITY: "קהילה",
	      PLACEHOLDER: "שם אדם או דואל...‏",
	      MESSAGE: "הודעה:",
	      MESSAGE_TXT: "הוספת הודעה אופציונלית",
	      REMOVE_ITEM_ALT: "סילוק ${0}",
	      NO_MEMBERS: "ללא",
	      A11Y_READER_ADDED: "${0} נבחר כקורא.",
	      A11Y_READER_REMOVED: "${0} סולק כקורא.",
	      SELF_REFERENCE_ERROR: "אינכם יכולים לשתף עם עצמכם.",
	      OWNER_REFERENCE_ERROR: "אינכם יכולים לשתף עם הבעלים של הקובץ.",
	      SHARE_COMMUNITY_WARN: "שיתוף עם הקבוצה הציבורית '${0}' יהפוך קובץ זה לציבורי.",
	      SELECT_USER_ERROR: "יש לבחור לפחות אדם אחד או קבוצה אחת לשיתוף.",
	      WARN_LONG_MESSAGE: "ההודעה ארוכה מדי.",
	      TRIM_LONG_MESSAGE: "לקצר את הההודעה?",
	      ERROR: "לא ניתן לשתף את הקובץ.  נא לנסות שוב מאוחר יותר.",
	      INFO_SUCCESS: "הקובץ שותף בהצלחה.",
	      MAX_SHARES_ERROR: "היתה חריגה ממספר השיתופים המרבי.",
	      NOT_LOGGED_IN_ERROR: "הקובץ לא שותף פני שלא הייתם מחוברים.  לחצו על 'שיתוף' כדי לשתף את הקובץ.",
	      TIMEOUT_ERROR: "הקובץ לא שותף מפני שלא ניתן להתחבר לשרת.  לחצו על 'שיתוף' כדי לנסות שוב.",
	      CANCEL_ERROR: "הקובץ לא שותף מפני שהבקשה בוטלה.  לחצו על 'שיתוף' כדי לנסות שוב.",
	      NOT_FOUND_ERROR: "הקובץ נמחק או כבר אינו זמין עבורכם ולא ניתן לשתף אותו.",
	      ACCESS_DENIED_ERROR: "כבר אין לכם הרשאה לשתף קובץ זה.‏",
	      VISIBILITY_RESTRICTION_ERROR_SHARE: "לא ניתן להגדיר קובץ מוגבל כציבורי.",
	      TOOLTIP: "הענקת גישה לקובץ זה לאחרים"
	   },
	   HISTORY: {
	      TAB_TITLE: "עדכונים אחרונים",
	      EMPTY: "אין עדכונים אחרונים.",
	      MORE: "הצגת עדכונים קודמים",
	      ERROR_ALT: "שגיאה",
	      ERROR: "אירעה שגיאה באחזור העדכונים. ${again}",
	      ERROR_ADDTL: "אירעה שגיאה באחזור עדכונים נוספים. ${again}",
	      ERROR_AGAIN: "נא לנסות שוב.",
	      ERROR_AGAIN_TITLE: "חזרו על הבקשה כדי לראות עדכונים נוספים.",
	      SORT_BY: "מיון לפי\:",
	      SORTS: {
	         DATE: "תאריך",
	         DATE_TOOLTIP: "מיון מהעדכונים החדשים ביותר לעדכונים הישנים ביותר",
	         DATE_TOOLTIP_REVERSE: "מיון מהעדכונים הישנים ביותר לעדכונים החדשים ביותר"
	      },
	      TIMESTAMP: {
	         CREATED: {
	             DAY: "${EEEE} בשעה ${time}",
	             MONTH: "${MMM} ${d}",
	             TODAY: "היום בשעה ${time}",
	             YEAR: "${MMM} ${d}, ${YYYY}",
	             YESTERDAY: "אתמול בשעה ${time}",
	             TOMORROW: "מחר בשעה ${time}"
	          }
	     }
	   },
	   OAUTH: {
	      clickHere: "לחצו כאן",
	      authorizeGadget: "${clickHere} כדי לאשר לאבזר זה לגשת אל פרטי HCL Connections שלכם. ",
	      confirmAuthorization: "${clickHere} כדי לאשר שהרשיתם לאבזר זה לגשת אל פרטי HCL Connections שלכם.  "
	   },
	   UNSAVEDCHANGES: {
	      CANCEL: "ביטול",
	      CONFIRM: "\u202bאתם בטוחים שברצונכם לזנוח את השינויים שלכם?‏\u202c  \u202bלחצו על 'אישור' כדי להמשיך או על 'ביטול' כדי לחזור.‏\u202c",
	      DIALOG_TITLE: "אישור פעולה",
	      NAME: "אישור פעולה",
	      OK: "אישור",
	      TOOLTIP: "אישור פעולה"
	   }
	})

);
