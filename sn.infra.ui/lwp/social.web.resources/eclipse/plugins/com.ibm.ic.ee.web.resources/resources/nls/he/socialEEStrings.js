define({
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
		   ${MMM} is the month in short notation (e.g. Jan, Feb)
		   ${time} is time (e.g. 6:00 PM)
		   ${d} is numerical day of the month (e.g 15)
		   ${YYYY} is year (e.g. 2012)
		*/
		   common: {
		      more: {
		         label: "עוד",
		         tooltip: "פעולות נוספות"
		       },
		       tags_more: "ועוד ${0}",
		       ERROR_ALT: "שגיאה",
		       PERSON_TITLE: "פתיחת הפרופיל של ${user}.",
		       inactiveUser: "${user} (לא פעיל)",
		       inactiveIndicator: "(לא פעיל)",
		       like_error: "לא ניתן לשמור את סימון 'אהבתי' שלכם. נא לנסות שוב מאוחר יותר.",
		       vote_error: "לא ניתן לשמור את ההצבעה שלכם. נא לנסות שוב מאוחר יותר."
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
		            TOMORROW: "נוצר ${d} ${MMM},‏ ${YYYY}"
		         },
		         updated: {
		            DAY: "עודכן ${EEEE} בשעה ${time}",
		            MONTH: "עודכן ${MMM} ${d}",
		            TODAY: "עודכן היום בשעה ${time}",
		            YEAR: "עודכן ${d} ${MMM},‏ ${YYYY}",
		            YESTERDAY: "עודכן אתמול בשעה ${time}",
		            TOMORROW: "עודכן ${d} ${MMM},‏ ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "ציבור",
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
		            	nofollow: "כעת אתם חברי רשת.",
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
		              YEAR: "${d} ${MMM}, ${YYYY}",
		              YESTERDAY: "אתמול בשעה ${time}",
		              TOMORROW: "${d} ${MMM}, ${YYYY}"
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
		         add: "מעקב אחר קובץ",
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
		            TOMORROW: "נוצר ${d} ${MMM},‏ ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} נוצר ${EEEE} בשעה ${time}",
		            MONTH: "${user} נוצר בתאריך ${MMM} ${d}",
		            TODAY: "${user} נוצר היום בשעה ${time}",
		            YEAR: "${user} נוצר ${d} ${MMM},‏ ${YYYY}",
		            YESTERDAY: "${user} נוצר אתמול בשעה ${time}",
		            TOMORROW: "${user} נוצר ${d} ${MMM},‏ ${YYYY}"
		         },
		         updated: {
		            DAY: "עודכן ${EEEE} בשעה ${time}",
		            MONTH: "עודכן ${MMM} ${d}",
		            TODAY: "עודכן היום בשעה ${time}",
		            YEAR: "עודכן ${d} ${MMM},‏ ${YYYY}",
		            YESTERDAY: "עודכן אתמול בשעה ${time}",
		            TOMORROW: "עודכן ${d} ${MMM},‏ ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} עדכן ${EEEE} בשעה ${time}",
		            MONTH: "${user} עדכן בתאריך ${MMM} ${d}",
		            TODAY: "${user} עדכן היום בשעה ${time}",
		            YEAR: "${user} עדכן ${MMM} ${d},‏ בשעה ${YYYY}",
		            YESTERDAY: "${user} עדכן אתמול בשעה ${time}",
		            TOMORROW: "${user} עדכן ${MMM} ${d},‏ בשעה ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "נוצר: ${EEEE} בשעה ${time}",
		            MONTH: "נוצר: ${MMM} ${d}",
		            TODAY: "נוצר: היום בשעה ${time}",
		            YEAR: "נוצר: ${MMM} ${d},‏ בשעה ${YYYY}",
		            YESTERDAY: "נוצר: אתמול בשעה ${time}",
		            TOMORROW: "נוצר: ${MMM} ${d},‏ בשעה ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "עודכן: ${EEEE} בשעה ${time}",
		            MONTH: "עודכן: ${MMM} ${d}",
		            TODAY: "עודכן: היום בשעה ${time}",
		            YEAR: "עודכן: ${MMM} ${d},‏ בשעה ${YYYY}",
		            YESTERDAY: "עודכן: אתמול בשעה ${time}",
		            TOMORROW: "עודכן: ${MMM} ${d},‏ בשעה ${YYYY}"
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
		         COMMENTED: "${user} העיר"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "נמשך על ידיכם",
		      checkedout_other: "נמשך על ידי ${user}.",
		      tooltip: "פתיחת הקובץ ${name} בספריה.",
		      draft_404_info: "הטיוטה נמחקה או שכבר אינה משותפת אתכם. הגרסה המפורסמת היא כעת הגרסה האחרונה של קובץ זה.",
		      error_404: "הקובץ נמחק או כבר שאינו משותף אתכם.",
		      error_403: "הקובץ נמחק או כבר שאינו משותף אתכם.",
		      error_preview: "הקובץ כבר אינו זמין תצוגה מקדימה.",
		      draft_review_canceled: "הסקירה בוטלה והטיוטה כבר אינה משותפת אתכם. סקירתכם כבר אינה מבוקשת.",
		      switch_ee: "הצגת טיוטה",
		      switch_ee_tooltip: "הצגת הטיוטה האחרונה של קובץ זה"
		   },
		   ecm_draft: {
		      tooltip: "פתיחת הטיוטה ${name} בספריה.",
		      community_owners: "בעלים של הקהילה",
		      draft: "טיוטה",
		      draft_tooltip: "הצגת טיוטה",
		      draft_general_info: "הטיוטה הקודמת כבר אינה קיימת וטיוטה חדשה יותר היא כעת הגרסה האחרונה.",
		      draft_review_404_general_info: "אחד הסוקרים כבר הצביע. כבר אינכם מתבקשים לסקור טיוטה זו.",
		      draft_review_404_request_info: "הטיוטה הקודמת כבר אינה קיימת והטיוטה האחרונה הוגשה לסקירה. סקירתכם מתבקשת.",
		      draft_review_404_require_info: "הטיוטה הקודמת כבר אינה קיימת והטיוטה האחרונה הוגשה לסקירה. סקירתכם נדרשת.",
		      draft_review_request_info: "סקירתכם מתבקשת.",
		      draft_review_require_info: "סקירתכם נדרשת.",
		      error_404: "הטיוטה נמחקה או שכבר אינה משותפת אתכם.",
		      error_403: "אינכם יכולים להציג טיוטה זו מפני שהיא אינה משותפת אתכם.",
		      error_preview: "הטיוטה כבר אינה זמינה תצוגה מקדימה.",
		      switch_ee: "הצגת גרסה מפורסמת",
		      switch_ee_tooltip: "הצגת הגרסה המפורסמת של קובץ זה",
		      review: "סקירה",
		      reviewers: "סוקרים",
		      reviwers_addtl: "סוקרים נוספים",
		      in_review: "טיוטה בסקירה",
		      in_review_tooltip: "הצגת טיוטה בסקירה",
		      review_required_any: "הבעלים של הקהילה דורשים שסוקר אחד יסקור טיוטה זו.",
		      review_required_all: "הבעלים של הקהילה דורשים שכל הסוקרים יסקרו טיוטה זו.",
		      review_required_generic: "הבעלים של הקהילה דורשים שכל הסוקרים יסקרו טיוטה זו.",
		      review_additional_required: "כל הסוקרים שנוספו על ידי מגיש הטיוטה נדרשים לסקור טיוטה זו.",
		      reivew_submitted_date: {
		         DAY: "${user} הגיש את הטיוטה לסקירה ביום ${EEEE} בשעה ${time}.",
		         MONTH: "${user} הגיש את הטיוטה לסקירה בתאריך ${d} ${MMM}.",
		         TODAY: "${user} הגיש את הטיוטה לסקירה היום בשעה ${time}.",
		         YEAR: "${user} הגיש את הטיוטה לסקירה בתאריך ${d} ${MMM}, ${YYYY}.",
		         YESTERDAY: "${user} הגיש את הטיוטה לסקירה אתמול בשעה ${time}.",
		         TOMORROW: "${user} הגיש את הטיוטה לסקירה בתאריך ${d} ${MMM}, ${YYYY}."
		      },
		      pending: "ממתין",
		      pending_rejected: "כבר אין צורך בסקירה מפני שהטיוטה נפסלה",
		      approve: "אישור",
		      approved: "אושר",
		      approve_tooltip: "אישור טיוטה זו",
		      accept_success: "אישרתם טיוטה זו.",
		      accept_error: "היתה שגיאה באישור הטיוטה. נא לנסות שוב.",
		      accept_info: "אישרתם טיוטה זו.",
		      reject: "דחייה",
		      rejected: "נפסל",
		      reject_tooltip: "פסילת טיוטה זו",
		      reject_success: "פסלתם טיוטה זו.",
		      reject_error: "היתה שגיאה בפסילת הטיוטה. נא לנסות שוב.",
		      reject_info: "פסלתם טיוטה זו."
		   },
		   authUser: {
		      error: "אירעה שגיאה באחזור המשתמש הנוכחי.  ${again}.",
		      error_again: "נא לנסות שוב",
		      error_404: "המשתמש המאומת לא נמצא.",
		      error_403: "אין לכם הרשאה לאחזר פרטי משתמש."
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
		      QUESTION_NOT_ANSWERED: "שאלה זו עדיין לא נענתה.",
		      attachments: "${count} צרופות",
		      attachments_one: "${count} צרופה"
		   },
		   blog: {
		      error: "אירעה שגיאה.  ${again}.",
		      error_again: "נא לנסות שוב",
		      error_404: "הבלוג כבר אינו קיים או שאין לכם הרשאות מספיקות לגשת אליו.",
		      error_403: "אין לכם הרשאה להציג בלוג זה.‏ הבלוג אינו ציבורי ואינו משותף אתכם.",
		      readMore: " מידע נוסף...",
		      readMore_tooltip: "פתיחת רשומת הבלוג ${name}.‏",
		      readMore_a11y: "הפעלת קישור זה תפתח את רשומת הבלוג ${name} בחלון חדש.",
		      graduated: "בוגר",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>הצבעה</a>",
		  					TOOLTIP: 	"הצבעה לפריט זה"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>הצבעתי</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>הצבעתי</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>ביטול פעולה</a>",
		  					TOOLTIP: 	"סילוק הצבעתכם מפריט זה"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 אנשים הצביעו"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 אדם הצביע"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} הצביעו"
		  				}
		  			},
		  			LOADING: "טעינה...‏",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "הצבעתי"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "לא ניתן לשמור את הצבעתם מפני שהגעתם למגבלת ההצבעות שלכם, או שהרעיון כבר אינו זמין עבורכם.",
		      readMore_tooltip: "פתיחת הרעיון ${name}.‏",
		      readMore_a11y: "הפעלת קישור זה תפתח את הרעיון ${name} בחלון חדש."
		   },
		   size: {
		      B: "${0} בתים",
		      KB: "${0} ק''ב",
		      MB: "${0} מ''ב",
		      GB: "${0} ג''ב"
		   },
		   REPLIES: {
		      ARIA_LABEL: "תשובות",
		      THIS_ARIA_LABEL: "תשובה זו",
		      THIS_TAB_TITLE: "תשובה זו",
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
		      PREV_COMMENTS: "הצגת עוד תשובות",
		      PLACEHOLDER_TXT: "תשובה לנושא זה",
		      EMPTY: "אין תשובות.",
		      TRIM_LONG_COMMENT: "לקצר את התשובה?",
		      WARN_LONG_COMMENT: "התשובה ארוכה מדי.  ${shorten}",
		      ERROR: "אירעה שגיאה באחזור התשובות. ${again}",
		      ERROR_CREATE: "לא ניתן לשמור את התשובה.  נסו שוב מאוחר יותר.‏",
		      ERROR_CREATE_NOT_FOUND: "לא ניתן לשמור את התשובה שלכם מפני שהנושא נמחק או כבר אינו זמין עבורכם.",
		      ERROR_CREATE_ACCESS_DENIED: "לא ניתן לשמור את התשובה שלכם מפני שהנושא נמחק או כבר אינו זמין עבורכם.",
		      ERROR_CREATE_TIMEOUT: "לא ניתן לשמור את התשובה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'שמירה' כדי לנסות שוב.",
		      ERROR_CREATE_CANCEL: "לא ניתן לשמור את התשובה שלכם מפני שהבקשה בוטלה.  לחצו על 'שמירה' כדי לנסות שוב.",
		      ERROR_CREATE_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי ליצור תשובה זו.  לחצו על 'שמירה' כדי להציג את הנחיית ההתחברות.",
		      ERROR_NO_CONTENT: "ציינו את התשובה ולחצו על 'שמירה'.  אם כבר אינכם מעוניינים להוסיף הערה, לחצו על 'ביטול'.",
		      ERROR_UNAUTHORIZED: "לא ניתן לשמור את התשובה שלכם מפני שאינכם מורשים להשאיר תשובה.",
		      COMMENT_DELETED: {
		         DAY: "התשובה נמחקה על ידי ${user} ביום ${EEEE} בשעה ${time}",
		         MONTH: "התשובה נמחקה על ידי ${user} בתאריך ${MMM} ${d}",
		         TODAY: "התשובה נמחקה על ידי ${user} היום בשעה ${time}",
		         YEAR: "התשובה נמחקה על ידי ${user} ביום ${d} ${MMM}, בשעה ${YYYY}",
		         YESTERDAY: "התשובה נמחקה על ידי ${user} אתמול בשעה ${time}",
		         TOMORROW: "התשובה נמחקה על ידי ${user} ביום ${d} ${MMM}, בשעה ${YYYY}"
		      },
		      REASON_FOR_DELETION: "סיבת המחיקה: ${reason}",
		      REPLY_TITLE: "הנדון: ${0}",
		      SHOW_FULL_REPLY: "הצגת התשובה המלאה",
		      SHOW_FULL_REPLY_TOOLTIP: "ניווט אל התשובה המקורית בנושא הפורום",
		      REPLY_ACTION: "תשובה",
		      REPLY_ACTION_TOOLTIP: "תשובה לפרסום זה",
		      MODERATION_PENDING: "תשובה זו ממתינה לסקירה.",
		      MODERATION_QUARANTINED: "הפרסום הוכנס להסגר על ידי המפקח.",
		      MODERATION_REMOVED: {
		         DAY: "תשובה זו סולקה על ידי ${user} ביום ${EEEE} בשעה ${time}.",
		         MONTH: "תשובה זו סולקה על ידי ${user} בתאריך ${d} ${MMM}.‏",
		         TODAY: "תשובה זו סולקה על ידי ${user} היום בשעה ${time}.",
		         YEAR: "תשובה זו סולקה על ידי ${user} בתאריך ${d} ${MMM}, ${YYYY}.",
		         YESTERDAY: "תשובה זו סולקה על ידי ${user} אתמול בשעה ${time}.",
		         TOMORROW: "תשובה זו סולקה על ידי ${user} בתאריך ${d} ${MMM}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "תשובה זו נפסלה על ידי ${user} ביום ${EEEE} בשעה ${time}.",
		         MONTH: "תשובה זו נפסלה על ידי ${user}  בתאריך ${d} ${MMM}.",
		         TODAY: "תשובה זו נפסלה על ידי ${user} היום בשעה ${time}.",
		         YEAR: "תשובה זו נפסלה על ידי ${user} בתאריך ${d} ${MMM}, ${YYYY}.",
		         YESTERDAY: "תשובה זו נפסלה על ידי ${user} אתמול בשעה ${time}.",
		         TOMORROW: "תשובה זו נפסלה על ידי ${user} בתאריך ${d} ${MMM}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "התשובה שלכם הוגשה לסקירה ותהיה זמינה לאחר שתאושר."
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
		      ERROR_CREATE_NOT_FOUND: "לא ניתן לשמור את ההערה שלכם מפני שהפריט נמחק או כבר אינו זמין עבורכם.",
		      ERROR_CREATE_ACCESS_DENIED: "לא ניתן לשמור את ההערה שלכם מפני שהפריט נמחק או כבר אינו זמין עבורכם.",
		      ERROR_CREATE_TIMEOUT: "לא ניתן לשמור את ההערה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'פרסום' כדי לנסות שוב.",
		      ERROR_CREATE_CANCEL: "לא ניתן לשמור את ההערה שלכם מפני שהבקשה בוטלה.  לחצו על 'פרסום' כדי לנסות שוב.",
		      ERROR_CREATE_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי ליצור הערה זו.  לחצו על 'פרסום' כדי להציג את הנחיית ההתחברות.",
		      ERROR_DELETE: "לא ניתן למחוק את ההערה שלכם.  נסו שוב מאוחר יותר.‏",
		      ERROR_DELETE_TIMEOUT: "לא ניתן למחוק את ההערה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'מחיקה' כדי לנסות שוב.",
		      ERROR_DELETE_NOT_FOUND: "לא ניתן למחוק את ההערה שלכם מפני שההערה או הפריט נמחקו או כבר אינם זמינים עבורכם.",
		      ERROR_DELETE_ACCESS_DENIED: "לא ניתן למחוק את ההערה שלכם מפני שהפריט נמחק או כבר אינו זמין עבורכם.",
		      ERROR_DELETE_CANCEL: "לא ניתן למחוק את ההערה שלכם מפני שהבקשה בוטלה.  לחצו על 'מחיקה' כדי לנסות שוב.",
		      ERROR_DELETE_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי למחוק הערה זו.  לחצו על 'מחיקה' כדי להציג את הנחיית ההתחברות.",
		      ERROR_EDIT: "לא ניתן לעדכן את ההערה שלכם.  נסו שוב מאוחר יותר.‏",
		      ERROR_EDIT_ACCESS_DENIED: "לא ניתן לעדכן את ההערה שלכם מפני שהפריט נמחק או כבר אינו זמין עבורכם.",
		      ERROR_EDIT_NOT_FOUND: "לא ניתן לעדכן את ההערה שלכם מפני שהפריט נמחק או כבר אינו זמין עבורכם.",
		      ERROR_EDIT_TIMEOUT: "לא ניתן לעדכן את ההערה שלכם מפני שלא ניתן להתחבר לשרת.  לחצו על 'פרסום' כדי לנסות שוב.",
		      ERROR_EDIT_CANCEL: "לא ניתן לעדכן את ההערה שלכם מפני שהבקשה בוטלה.  לחצו על 'פרסום' כדי לנסות שוב.",
		      ERROR_EDIT_NOT_LOGGED_IN: "עליכם להיות מחוברים למערכת כדי לערוך הערה זו.  לחצו על 'פרסום' כדי להציג את הנחיית ההתחברות.",
		      ERROR_NO_CONTENT: "ציינו את ההערה ולחצו על 'פרסום'.  אם כבר אינכם מעוניינים להוסיף הערה, לחצו על 'ביטול'.",
		      ERROR_NO_CONTENT_EDIT: "ציינו את ההערה ולחצו על 'פרסום'.  אם כבר אינכם מעוניינים לערוך את ההערה, לחצו על 'ביטול'.",
		      ERROR_UNAUTHORIZED: "לא ניתן לשמור את ההערה שלכם מפני שאינכם מורשים להשאיר הערה.",
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
		         TOMORROW: "הערה זו סולקה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "הערה זו נפסלה על ידי ${user} ביום ${EEEE} בשעה ${time}.",
		         MONTH: "ההערה נפסלה על ידי ${user}  בתאריך ${d} ${MMM}.",
		         TODAY: "הערה זו נפסלה על ידי ${user} היום בשעה ${time}.",
		         YEAR: "הערה זו נפסלה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}.",
		         YESTERDAY: "הערה זו נפסלה על ידי ${user} אתמול בשעה ${time}.",
		         TOMORROW: "הערה זו נפסלה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}."
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
		         TOMORROW: "${user} ${d} ${MMM}, ${YYYY} (גרסה ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} בשעה ${time}",
		         MONTH: "${user} ${d} ${MMM}",
		         TODAY: "${user} היום בשעה ${time}",
		         YEAR: "${user} ${d} ${MMM}, ${YYYY}",
		         YESTERDAY: "${user} אתמול בשעה ${time}",
		         TOMORROW: "${user} ${d} ${MMM}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} בשעה ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "היום בשעה ${time}",
		         YEAR: "${d} ${MMM}, ${YYYY}",
		         YESTERDAY: "אתמול בשעה ${time}",
		         TOMORROW: "${d} ${MMM}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "ההערה נמחקה על ידי ${user} ביום ${EEEE} בשעה ${time}",
		         MONTH: "ההערה נמחקה על ידי ${user} בתאריך ${MMM} ${d}",
		         TODAY: "ההערה נמחקה על ידי ${user} היום בשעה ${time}",
		         YEAR: "ההערה נמחקה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}",
		         YESTERDAY: "ההערה נמחקה על ידי ${user} אתמול בשעה ${time}",
		         TOMORROW: "ההערה נמחקה על ידי ${user} ביום ${d} ${MMM}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} ערך ביום ${EEEE} בשעה ${time} (גרסה ${version})",
		         MONTH: "${user} ערך ${MMM} ${d} (גרסה ${version})",
		         TODAY: "${user} ערך היום בשעה ${time} (גרסה ${version})",
		         YEAR: "${user} ערך ביום ${MMM} ${d}, ${YYYY} (גרסה ${version})",
		         YESTERDAY: "${user} ערך אתמול בשעה ${time} (גרסה ${version})",
		         TOMORROW: "${user} ערך ביום ${MMM} ${d}, ${YYYY} (גרסה ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} ערך ביום ${EEEE} בשעה ${time}",
		         MONTH: "${user} ערך ${MMM} ${d}",
		         TODAY: "${user} ערך היום בשעה ${time}",
		         YEAR: "${user} ערך ${d} ${MMM}, ${YYYY}",
		         YESTERDAY: "${user} ערך אתמול בשעה ${time}",
		         TOMORROW: "${user} ערך ${d} ${MMM}, ${YYYY}"
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
		         SUCCESS_SAVING: "הסימון שלכם הוגש. מפקח יבדוק אותו בתוך זמן קצר.",
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
		      CONFIRM: "ההערה שלכם הוגשה לסקירה ותהיה זמינה לאחר שתאושר.",
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
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} בשעה ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "היום בשעה ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "אתמול בשעה ${time}",
		         TOMORROW: "${date_long}"
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
		      CREATE_VERSION: "יצירת גרסה חדשה",
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
		      SHOW: "הצגה",
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
		         VIEW: "הצגה",
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
		      SHOW: "הצגה",
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
		         LOADING: "טעינה...‏",
		         EMPTY: "משתמשים אנונימיים בלבד",
		         ERROR: "לא ניתן לטעון את פרטי ההורדה"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "שגיאה",
		      ERROR_ALT_TEXT: "שגיאה:",
		      ERROR_MSG_GENERIC: "אירעה בעיה.  נא לנסות שוב.‏",
		      ERROR_MSG_NOT_AVAILABLE: "פריט זה נמחק או כבר אינו זמין.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "התוכן של פריט זה אינו זמין.",
		      ERROR_MSG_NO_ACCESS: "כבר אין לכם גישה לפריט זה.‏",
		      LOADING: "טעינה...‏",
		      TITLE_SU: "${author} פרסם הודעה.",
		      TITLE_NI: "${author} הזמין אתכם לרשת שלו.",
		      AUTHOR_TITLE: "הצגת הפרופיל עבור ${author}",
		      OPEN_LINK: "פתיחת ${title}",
		      CONFIRM_CLOSE_TITLE: "אישור פעולה",
		      CONFIRM_CLOSE_MESSAGE: "\u202bאתם בטוחים שברצונכם לזנוח את השינויים שלכם?‏\u202c \u202bלחצו על 'אישור' כדי להמשיך או על 'ביטול' כדי לחזור.‏\u202c",
		      OK: "אישור",
		      CANCEL: "ביטול"
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
		           TOMORROW: "נוצר: ${MMM} ${d},‏ בשעה ${YYYY}"
		       },
		      error: "אירעה שגיאה.  ${again}.",
		      error_again: "נא לנסות שוב",
		      error_404: "עדכון המצב אינו קיים יותר.",
		      notifications: {
		         STATUS_UPDATE: "${user} פרסם הודעה",
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
		      title: "פרסום חוזר של עדכון זה לעוקבים או לקהילות שלי",
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
		      A11Y_READER_ADDED: "${0} נבחר כקורא",
		      A11Y_READER_REMOVED: "${0} סולק כקורא.",
		      SELF_REFERENCE_ERROR: "אינכם יכולים לשתף עם עצמכם.",
		      OWNER_REFERENCE_ERROR: "אינכם יכולים לשתף עם הבעלים של הקובץ.",
		      SHARE_COMMUNITY_WARN: "שיתוף עם הקבוצה הציבורית '${0}' יהפוך קובץ זה לציבורי.",
		      SELECT_USER_ERROR: "יש לבחור לפחות אדם אחד או קבוצה אחת לשיתוף.",
		      WARN_LONG_MESSAGE: "ההודעה ארוכה מדי.",
		      TRIM_LONG_MESSAGE: "לקצר את הההודעה?",
		      ERROR_SHARING: "לא ניתן לשתף את הקובץ.  נא לנסות שוב מאוחר יותר.",
		      INFO_SUCCESS: "הקובץ שותף בהצלחה.",
		      MAX_SHARES_ERROR: "היתה חריגה ממספר השיתופים המרבי.",
		      NOT_LOGGED_IN_ERROR: "הקובץ לא שותף מפני שלא הייתם מחוברים.  לחצו על 'שיתוף' כדי לשתף את הקובץ.",
		      TIMEOUT_ERROR: "הקובץ לא שותף מפני שלא ניתן להתחבר לשרת.  לחצו על 'שיתוף' כדי לנסות שוב.",
		      CANCEL_ERROR: "הקובץ לא שותף מפני שהבקשה בוטלה.  לחצו על 'שיתוף' כדי לנסות שוב.",
		      NOT_FOUND_ERROR: "הקובץ נמחק או כבר אינו זמין עבורכם ולא ניתן לשתף אותו.",
		      ACCESS_DENIED_ERROR: "כבר אין לכם הרשאה לשתף קובץ זה.‏",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "לא ניתן להגדיר קובץ מוגבל כציבורי.",
		      TOOLTIP: "הענקת גישה לקובץ זה לאחרים"
		   },
		   HISTORY: {
		      TAB_TITLE: "עדכונים אחרונים",
		      NO_HISTORY: "אין עדכונים אחרונים.",
		      EMPTY: "לא ניתן לאחזר את העדכונים האחרונים עבור פריט זה. הפריט נמחק או שכבר אין לכם גישה אליו.",
		      MORE: "הצגת עדכונים קודמים",
		      ERROR_ALT: "שגיאה",
		      ERROR: "אירעה שגיאה באחזור העדכונים. ${again}",
		      ERROR_ADDTL: "אירעה שגיאה באחזור עדכונים נוספים. ${again}",
		      ERROR_AGAIN: "נא לנסות שוב.",
		      ERROR_AGAIN_TITLE: "חזרו על הבקשה כדי לראות עדכונים נוספים.",
		      PROFILE_TITLE: "פתיחת הפרופיל של ${user}.",
		      SORT_BY: "מיון לפי\\:",
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
		             YEAR: "${d} ${MMM}, ${YYYY}",
		             YESTERDAY: "אתמול בשעה ${time}",
		             TOMORROW: "${d} ${MMM}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "הערה זו",
			   REPLY_ACTION: "תשובה",
		       REPLY_ACTION_TOOLTIP: "תשובה להערה זו"
		   },
		   OAUTH: {
		      welcomeHeader: "ברוכים הבאים אל Connections",
		      continueBtnLabel: "המשך",
		      continueBtnA11y: "הפעלת קישור זה תפתח חלון חדש שיאפשר לכם לאשר את הגישה אל Connections.‏",
		      clickHere: "לחצו כאן",
		      infoMsg: "Connections זקוק לאישורכם כדי לגשת לנתונים שלכם.",
		      authorizeGadget: "${clickHere} כדי לאשר ליישום זה לגשת אל פרטי Connections שלכם.",
		      confirmAuthorization: "${clickHere} כדי לאשר שהרשיתם ליישום זה לגשת אל פרטי Connections שלכם."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "הפעלת קישור זה תפתח חלון חדש שיאפשר לכם לאשר את הגישה אל מאגר הספריה של Connections.‏",
		      infoMsg: "מאגר הספריה של Connections זקוק לאישורכם כדי לגשת לנתונים שלכם.",
		      authorizeGadget: "${clickHere} כדי לאשר ליישום זה לגשת אל הפרטים שלכם במאגר הספריה של Connections.‏",
		      confirmAuthorization: "${clickHere} כדי לאשר שהרשיתם ליישום זה לגשת אל הפרטים שלכם במאגר הספריה של Connections.‏"
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "ביטול",
		      CONFIRM: "\u202bאתם בטוחים שברצונכם לזנוח את השינויים שלכם?‏\u202c  לחצו על 'אישור' כדי להמשיך או על 'ביטול' כדי לחזור.‏",
		      DIALOG_TITLE: "אישור פעולה",
		      NAME: "אישור פעולה",
		      OK: "אישור",
		      TOOLTIP: "אישור פעולה"
		   }
});
