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
		         label: "Mer",
		         tooltip: "Fler åtgärder"
		       },
		       tags_more: "och ${0} till",
		       ERROR_ALT: "Fel",
		       PERSON_TITLE: "Öppna profilen för ${user}.",
		       inactiveUser: "${user} (inaktiv)",
		       inactiveIndicator: "(inaktiv)",
		       like_error: "Det gick inte att spara ditt gillande. Försök igen senare.",
		       vote_error: "Det gick inte att spara din röst. Försök igen senare."
		   },
		   generic: {
		      untitled: "(Namnlöst)",
		      tags: "Taggar:",
		      tags_more: "och ${0} till",
		      likes: "Gillanden",
		      comments: "Kommentarer",
		      titleTooltip: "Gå till ${app}",
		      error: "Det gick inte att hämta data.",
		      timestamp: {
		         created: {
		            DAY: "Skapades ${EEEE} ${time}",
		            MONTH: "Skapades ${MMM} ${d}",
		            TODAY: "Skapades i dag ${time}",
		            YEAR: "Skapades ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Skapades i går ${time}",
		            TOMORROW: "Skapades ${MMM} ${d} ${YYYY}"
		         },
		         updated: {
		            DAY: "Uppdaterades ${EEEE} ${time}",
		            MONTH: "Uppdaterades ${MMM} ${d}",
		            TODAY: "Uppdaterades i dag ${time}",
		            YEAR: "Uppdaterades ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Uppdaterades i går ${time}",
		            TOMORROW: "Uppdaterades ${MMM} ${d} ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Gemensam",
		         priv: "Privat"
		      },
		      action: {
		         created: "Skapades",
		         updated: "Uppdaterades"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Du kan ta emot uppdateringar om personer du följer på hemsidan och i mejlsammanfattningar.",
		      profile_title: "Öppna profilen för ${user}.",
		      profile_a11y: "Om du klickar på den här länken öppnas profilen för ${user} i ett nytt fönster.",
		      error: "Det uppstod ett fel. ${again}.",
		      error_again: "Försök igen.",
		      error_404: "Nätverksbegäran finns inte längre.",
		      warning: "Varning",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Du och den här personen är nu nätverkskontakter.",
		            	follow: "Du och den här personen är nu nätverkskontakter och följer ${user}."
		            },
		            ignore: {
		            	nofollow: "Du har ignorerat inbjudan.",
		            	follow: "Du har ignorerat inbjudan men följer ${user}."
		            }
		         },
		         error: {
		            accept: "Det uppstod ett fel när begäran skulle accepteras.",
		            ignore: "Det uppstod ett fel när begäran skulle ignoreras."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "I dag ${time}",
		              YEAR: "${MMM} ${d} ${YYYY}",
		              YESTERDAY: "I går ${time}",
		              TOMORROW: "${MMM} ${d} ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Om du klickar på den här länken öppnas ${name} i ett nytt fönster.",
		      tooltip: "Öppna ${name} i applikationen Filer",
		      profile_title: "Öppna profilen för ${user}.",
		      profile_a11y: "Om du klickar på den här länken öppnas profilen för ${user} i ett nytt fönster.",
		      download_tooltip: "Ladda ned filen (${0})",
		      following: {
		         add: "Följ filen",
		         remove: "Sluta följa",
		         title: "Ange om du vill få meddelanden om uppdateringar av den här filen."
		      },
		      share: {
		         label: "Dela",
		         title: "Ge andra åtkomst till den här filen"
		      },
		      timestamp: {
		         created: {
		            DAY: "Skapades ${EEEE} ${time}",
		            MONTH: "Skapades ${MMM} ${d}",
		            TODAY: "Skapades i dag ${time}",
		            YEAR: "Skapades ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Skapades i går ${time}",
		            TOMORROW: "Skapades ${MMM} ${d} ${YYYY}"
		         },
		         createdOther: {
		            DAY: "Skapades av ${user} ${EEEE} ${time}",
		            MONTH: "Skapades av ${user} ${MMM} ${d}",
		            TODAY: "Skapades av ${user} i dag ${time}",
		            YEAR: "Skapades av ${user} ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Skapades av ${user} i går ${time}",
		            TOMORROW: "Skapades av ${user} ${MMM} ${d} ${YYYY}"
		         },
		         updated: {
		            DAY: "Uppdaterades ${EEEE} ${time}",
		            MONTH: "Uppdaterades ${MMM} ${d}",
		            TODAY: "Uppdaterades i dag ${time}",
		            YEAR: "Uppdaterades ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Uppdaterades i går ${time}",
		            TOMORROW: "Uppdaterades ${MMM} ${d} ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} uppdaterade ${EEEE} ${time}",
		            MONTH: "${user} uppdaterade ${MMM} ${d}",
		            TODAY: "${user} uppdaterade i dag ${time}",
		            YEAR: "${user} uppdaterade ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "${user} uppdaterade i går ${time}",
		            TOMORROW: "${user} uppdaterade ${MMM} ${d} ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Skapades ${EEEE} ${time}",
		            MONTH: "Skapades ${MMM} ${d}",
		            TODAY: "Skapades i dag ${time}",
		            YEAR: "Skapades ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Skapades i går ${time}",
		            TOMORROW: "Skapades ${MMM} ${d} ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Uppdaterades ${EEEE} ${time}",
		            MONTH: "Uppdaterades ${MMM} ${d}",
		            TODAY: "Uppdaterades i dag ${time}",
		            YEAR: "Uppdaterades ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Uppdaterades i går ${time}",
		            TOMORROW: "Uppdaterades ${MMM} ${d} ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} av ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} av ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Ladda ned filen (${size})",
		      	 DOWNLOAD_ALT: "Ladda ned"
		      },
		      PREVIEW: {
		         LINK: "Förhandsgranska",
		         TITLE: "Förhandsgranska den här filen i ett nytt fönster."
		      },
		      TAGS: "Taggar:",
		      error: "Det uppstod ett fel. ${again}.",
		      error_again: "Försök igen.",
		      error_404: "Filen finns inte längre eller så har du inte behörighet att få åtkomst till den.",
		      error_403: "Du har inte behörighet att visa den här filen. Filen är inte gemensam och ingen delar den med dig.",
		      notifications: {
		         USER_SHARED: "${user} skrev:",
		         CHANGE_SUMMARY: "${user} angav en sammanfattning av ändringer",
		         NO_CHANGE_SUMMARY: "${user} angav inte någon sammanfattning av ändringer",
		         COMMENTED: "${user} kommenterade"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Utcheckat av dig",
		      checkedout_other: "Utcheckat av ${user}",
		      tooltip: "Öppna filen ${name} i biblioteket",
		      draft_404_info: "Utkastet har tagits bort eller delas inte längre med dig. Den publicerade versionen är nu den senaste versionen av den här filen.",
		      error_404: "Filen har tagits bort eller delas inte längre med dig.",
		      error_403: "Filen har tagits bort eller delas inte längre med dig.",
		      error_preview: "Filen är inte längre tillgänglig för förhandsgranskning.",
		      draft_review_canceled: "Granskningen avbröts. Utkastet delas inte längre med dig. Du behöver inte längre granska det.",
		      switch_ee: "Visa utkastet",
		      switch_ee_tooltip: "Visa det senaste utkastet till den här filen"
		   },
		   ecm_draft: {
		      tooltip: "Öppna utkastet ${name} i biblioteket",
		      community_owners: "Gemenskapsägare",
		      draft: "Utkast",
		      draft_tooltip: "Visa utkast",
		      draft_general_info: "Det tidigare utkastet finns inte och ett nyare utkast är nu den senaste versionen.",
		      draft_review_404_general_info: "En av granskarna har redan röstat. Du behöver inte längre granska det här utkastet.",
		      draft_review_404_request_info: "Det tidigare utkastet finns inte längre och det senaste utkastet har skickats in för granskning. Du måste granska det.",
		      draft_review_404_require_info: "Det tidigare utkastet finns inte längre och det senaste utkastet har skickats in för granskning. Du måste granska det.",
		      draft_review_request_info: "Granskning krävs.",
		      draft_review_require_info: "Gransknings krävs.",
		      error_404: "Utkastet har tagits bort eller delas inte längre med dig.",
		      error_403: "Det går inte att visa det här utkastet eftersom det inte delas med dig.",
		      error_preview: "Utkastet är inte längre tillgängligt för förhandsgranskning.",
		      switch_ee: "Visa den publicerade versionen",
		      switch_ee_tooltip: "Visa den publicerade versionen av den här filen",
		      review: "Granska",
		      reviewers: "Granskare",
		      reviwers_addtl: "Ytterligare granskare",
		      in_review: "Utkast som granskas",
		      in_review_tooltip: "Visa utkast som granskas",
		      review_required_any: "Gemenskapsägaren har angett att en granskare måste granska det här utkastet.",
		      review_required_all: "Gemenskapsägaren har angett att alla granskare måste granska det här utkastet.",
		      review_required_generic: "Gemenskapsägaren har angett att följande granskare måste granska det här utkastet.",
		      review_additional_required: "Alla granskare som har lagts till av den som skickade utkastet måste granska utkastet.",
		      reivew_submitted_date: {
		         DAY: "${user} skickade utkastet för granskning ${EEEE} ${time}.",
		         MONTH: "${user} skickade utkastet för granskning ${MMM} ${d}.",
		         TODAY: "${user} skickade utkastet för granskning idag ${time}.",
		         YEAR: "${user} skickade utkastet för granskning ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "${user} skickade utkastet för granskning igår ${time}.",
		         TOMORROW: "${user} skickade utkastet för granskning ${MMM} ${d} ${YYYY}."
		      },
		      pending: "Väntar på godkännande",
		      pending_rejected: "Utkastet har avvisats. Det behöver inte längre granskas",
		      approve: "Godkänn",
		      approved: "Godkänd",
		      approve_tooltip: "Godkänn det här utkastet",
		      accept_success: "Du har godkänt det här utkastet.",
		      accept_error: "Det uppstod ett fel när det här utkastet skulle godkännas. Försök igen.",
		      accept_info: "Du har godkänt det här utkastet.",
		      reject: "Avvisa",
		      rejected: "Avvisat",
		      reject_tooltip: "Avvisa det här utkastet",
		      reject_success: "Du har avvisat det här utkastet.",
		      reject_error: "Det uppstod ett fel när det här utkastet skulle avvisas. Försök igen.",
		      reject_info: "Du har avvisat det här utkastet."
		   },
		   authUser: {
		      error: "Det uppstod ett fel när den aktuella användaren skulle hämtas. ${again}.",
		      error_again: "Försök igen.",
		      error_404: "Det gick inte att hitta den autentiserade användaren.",
		      error_403: "Du har inte behörighet att hämta användarinformation."
		   },
		   forum: {
		      error: "Det uppstod ett fel. ${again}.",
		      error_again: "Försök igen.",
		      error_404: "Forumet finns inte längre eller så har du inte behörighet att få åtkomst till det.",
		      error_403: "Du har inte behörighet att visa det här forumet. Forumet är inte gemensamt och ingen delar det med dig.",
		      readMore: "Visa det fullständiga ämnet.",
		      readMore_tooltip: "Öppna forumämnet ${name}.",
		      readMore_a11y: "Om du klickar på den här länken öppnas forumämnet ${name} i ett nytt fönster.",
		      QUESTION_ANSWERED: "Den här frågan har besvarats.",
		      QUESTION_NOT_ANSWERED: "Den här frågan har inte besvarats.",
		      attachments: "${count} bilagor",
		      attachments_one: "${count} bilaga"
		   },
		   blog: {
		      error: "Det uppstod ett fel. ${again}.",
		      error_again: "Försök igen.",
		      error_404: "Bloggen finns inte längre eller så har du inte behörighet att få åtkomst till den.",
		      error_403: "Du har inte behörighet att visa den här bloggen. Bloggen är inte gemensam och ingen delar den med dig.",
		      readMore: " Läs mer...",
		      readMore_tooltip: "Öppna blogginlägget ${name}.",
		      readMore_a11y: "Om du klickar på den här länken öppnas blogginlägget ${name} i ett nytt fönster.",
		      graduated: "Utvecklad",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Rösta</a>",
		  					TOOLTIP: 	"Rösta på det här"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Röstat</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Röstat</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Ångra</a>",
		  					TOOLTIP: 	"Ta bort din röst på det här"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 person har röstat på det här"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 person har röstat på det här"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} personer har röstat på det här"
		  				}
		  			},
		  			LOADING: "Läser in...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Röstat"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Det gick inte att spara din röst. Du har antingen uppnått din röstgräns eller så är idén inte längre tillgänglig för dig.",
		      readMore_tooltip: "Öppna idén ${name}.",
		      readMore_a11y: "Om du klickar på den här länken öppnas idén ${name} i ett nytt fönster."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} kB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Svar",
		      THIS_ARIA_LABEL: "Det här svaret",
		      THIS_TAB_TITLE: "Det här svaret",
		      TAB_TITLE: "Svar (${0})",
		      REPLY_TO_REPLY: "Svar på ${thisReply}",
		      REPLY_TO_TOPIC: "Svar på ${thisTopic}",
		      THIS_TOPIC: "det här ämnet",
		      THIS_REPLY: "det här svaret",
		      NAVIGATE_TO_REPLY: "Gå till det överordnade svaret",
		      NAVIGATE_TO_TOPIC: "Gå till det överordnade ämnet",
		      ADD_COMMENT: "Svara på det här ämnet",
		      ADD_COMMENT_TOOLTIP: "Svara på det här forumämnet",
		      SHOWING_RECENT_REPLIES: "Visar de ${0} senaste svaren",
		      PREV_COMMENTS: "Visa fler svar",
		      PLACEHOLDER_TXT: "Svara på det här ämnet",
		      EMPTY: "Det finns inga svar.",
		      TRIM_LONG_COMMENT: "Vill du skriva ett kortare svar?",
		      WARN_LONG_COMMENT: "Svaret är för långt. ${shorten}",
		      ERROR: "Det uppstod ett fel när svaren skulle hämtas. ${again}",
		      ERROR_CREATE: "Det gick inte att spara svaret. Försök igen senare.",
		      ERROR_CREATE_NOT_FOUND: "Ämnet har tagits bort eller visas inte längre för dig. Det gick inte att spara ditt svar.",
		      ERROR_CREATE_ACCESS_DENIED: "Ämnet har tagits bort eller visas inte längre för dig. Det gick inte att spara ditt svar.",
		      ERROR_CREATE_TIMEOUT: "Det gick inte att ansluta till servern. Det gick inte att spara ditt svar. Klicka på Spara om du vill försöka igen.",
		      ERROR_CREATE_CANCEL: "Begäran avbröts. Det gick inte att spara ditt svar. Klicka på Spara om du vill försöka igen.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Om du vill skapa det här svaret måste du vara inloggad. Om du vill att en uppmaning om att logga in ska visas klickar du på Spara.",
		      ERROR_NO_CONTENT: "Ange ditt svar och klicka sedan på Spara. Om du inte vill ange något svar klickar du på Avbryt.",
		      ERROR_UNAUTHORIZED: "Du har inte behörighet att skicka in svar. Det gick inte att spara ditt svar.",
		      COMMENT_DELETED: {
		         DAY: "Svaret togs bort av ${user} ${EEEE} ${time}",
		         MONTH: "Svaret togs bort av ${user} ${MMM} ${d}",
		         TODAY: "Svaret togs bort av ${user} i dag ${time}",
		         YEAR: "Svaret togs bort av ${user} ${MMM} ${d} ${YYYY}",
		         YESTERDAY: "Svaret togs bort av ${user} i går ${time}",
		         TOMORROW: "Svaret togs bort av ${user} ${MMM} ${d} ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Orsak till borttagning: ${reason}",
		      REPLY_TITLE: "Ang.: ${0}",
		      SHOW_FULL_REPLY: "Visa det fullständiga svaret",
		      SHOW_FULL_REPLY_TOOLTIP: "Gå till det ursprungliga svaret i forumämnet",
		      REPLY_ACTION: "Svara",
		      REPLY_ACTION_TOOLTIP: "Svara på det här inlägget",
		      MODERATION_PENDING: "Det här svaret väntar på granskning.",
		      MODERATION_QUARANTINED: "Inlägget har placerats i karantän av moderatorn.",
		      MODERATION_REMOVED: {
		         DAY: "Svaret togs bort av ${user} ${EEEE} ${time}",
		         MONTH: "Svaret togs bort av ${user} ${MMM} ${d}.",
		         TODAY: "Svaret togs bort av ${user} i dag ${time}.",
		         YEAR: "Svaret togs bort av ${user} ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Svaret togs bort av ${user} i går ${time}.",
		         TOMORROW: "Svaret togs bort av ${user} ${MMM} ${d} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Svaret avvisades av ${user} ${EEEE} ${time}.",
		         MONTH: "Svaret avvisades av ${user} ${MMM} ${d}.",
		         TODAY: "Svaret avvisades av ${user} i dag ${time}.",
		         YEAR: "Svaret avvisades av ${user} ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Svaret avvisades av ${user} i går ${time}.",
		         TOMORROW: "Svaret avvisades av ${user} ${MMM} ${d} ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Ditt svar har skickats in för granskning och kommer att vara tillgängligt när det har godkänts."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Kommentarer",
		      PLACEHOLDER_TXT: "Lägg till en kommentar",
		      TAB_TITLE: "Kommentarer (${0})",
		      ACTION_NOT_SUPPORTED: "Otillåten åtgärd",
		      ADD_COMMENT: "Lägg till en kommentar",
		      ADD_COMMENT_TOOLTIP: "Lägg till en kommentar till det här objektet",
		      CANCEL: "Avbryt",
		      COMMENT_COUNT_ONE: "${0} kommentar",
		      COMMENT_COUNT_MANY: "${0} kommentarer",
		      COMMENT_LABEL: "Kommentar:",
		      DELETE: "Ta bort",
		      DELETE_TOOLTIP: "Ta bort kommentar",
		      DELETEREASON: "Orsak till borttagning av kommentaren:",
		      DIALOG_TITLE: "Korta av kommentar",
		      TOOLTIP: "Korta av kommentar",
		      NAME: "Korta av kommentar",
		      EDIT: "Redigera",
		      EDIT_TOOLTIP: "Redigera kommentar",
		      ERROR_CREATE: "Det gick inte att spara kommentaren. Försök igen senare.",
		      ERROR_CREATE_NOT_FOUND: "Objektet har tagits bort eller visas inte längre för dig. Det gick inte att spara din kommentar.",
		      ERROR_CREATE_ACCESS_DENIED: "Objektet har tagits bort eller visas inte längre för dig. Det gick inte att spara din kommentar.",
		      ERROR_CREATE_TIMEOUT: "Det gick inte att ansluta till servern. Det gick inte att spara din kommentar. Om du vill försöka igen klickar du på Skicka in.",
		      ERROR_CREATE_CANCEL: "Det gick inte att spara din kommentar eftersom begäran avbröts. Om du vill försöka igen klickar du på Skicka in.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Om du vill skapa den här kommentaren måste du vara inloggad. Om du vill att en uppmaning om att logga in ska visas klickar du på Skicka in.",
		      ERROR_DELETE: "Det gick inte att ta bort din kommentar. Försök igen senare.",
		      ERROR_DELETE_TIMEOUT: "Det gick inte att ansluta till servern. Det gick inte att ta bort din kommentar. Om du vill försöka igen klickar du på Ta bort.",
		      ERROR_DELETE_NOT_FOUND: "Objektet eller kommentaren har tagits bort eller visas inte längre för dig. Det gick inte att ta bort din kommentar.",
		      ERROR_DELETE_ACCESS_DENIED: "Objektet har tagits bort eller visas inte längre för dig. Det gick inte att ta bort din kommentar.",
		      ERROR_DELETE_CANCEL: "Begäran avbröts. Det gick inte att ta bort din kommentar. Om du vill försöka igen klickar du på Ta bort.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Om du vill ta bort den här kommentaren måste du vara inloggad. Klicka på Ta bort om du vill logga in.",
		      ERROR_EDIT: "Det gick inte att uppdatera din kommentar. Försök igen senare.",
		      ERROR_EDIT_ACCESS_DENIED: "Objektet har tagits bort eller visas inte längre för dig. Det gick inte att uppdatera din kommentar.",
		      ERROR_EDIT_NOT_FOUND: "Objektet har tagits bort eller visas inte längre för dig. Det gick inte att uppdatera din kommentar.",
		      ERROR_EDIT_TIMEOUT: "Det gick inte att ansluta till servern. Det gick inte att uppdatera din kommentar. Om du vill försöka igen klickar du på Skicka in.",
		      ERROR_EDIT_CANCEL: "Begäran avbröts. Det gick inte att uppdatera din kommentar. Om du vill försöka igen klickar du på Skicka in.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Om du vill redigera den här kommentaren måste du vara inloggad. Om du vill att en uppmaning om att logga in ska visas klickar du på Skicka in.",
		      ERROR_NO_CONTENT: "Ange din kommentar och klicka sedan på Skicka in. Om du inte vill ange någon kommentar klickar du på Avbryt.",
		      ERROR_NO_CONTENT_EDIT: "Ange din kommentar och klicka sedan på Skicka in. Om du inte vill redigera kommentaren klickar du på Avbryt.",
		      ERROR_UNAUTHORIZED: "Du har inte behörighet att skicka in kommentarer. Det gick inte att spara din kommentar.",
		      ERROR_GENERAL: "Det uppstod ett fel.",
		      OK: "OK",
		      YES: "Ja",
		      TRIM_LONG_COMMENT: "Vill du skriva en kortare kommentar?",
		      WARN_LONG_COMMENT: "Kommentaren är för lång. ${shorten}",
		      LINK: "Länk",
		      SAVE: "Spara",
		      POST: "Skicka in",
		      SHOWMORE: "Läs mer...",
		      VIEW_COMMENTS_FILE: "Visa kommentarer till den här filen",
		      SUBSCRIBE_TO_COMMENTS: "Prenumerera på de här kommentarerna",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Följ ändringar av de här kommentarerna med hjälp av en flödesläsare",
		      PROFILE_TITLE: "Öppna profilen för ${user}.",
		      PROFILE_A11Y: "Om du klickar på den här länken öppnas profilen för ${user} i ett nytt fönster.",
		      MODERATION_PENDING: "Den här kommentaren väntar på granskning.",
		      MODERATION_REMOVED: {
		         DAY: "Den här kommentaren togs bort ${EEEE} ${time} av ${user}",
		         MONTH: "Den här kommentaren togs bort ${MMM} ${d} av ${user}",
		         TODAY: "Den här kommentaren togs bort i dag ${time} av ${user}",
		         YEAR: "Den här kommentaren togs bort ${MMM} ${d} ${YYYY} av ${user}",
		         YESTERDAY: "Den här kommentaren togs bort i går ${time} av ${user}",
		         TOMORROW: "Den här kommentaren togs bort ${MMM} ${d} ${YYYY} av ${user}"
		      },
		      MODERATION_REJECTED: {
		         DAY: "Den här kommentaren avvisades ${EEEE} ${time} av ${user}",
		         MONTH: "Den här kommentaren avvisades ${MMM} ${d} av ${user}",
		         TODAY: "Den här kommentaren avvisades i dag ${time} av ${user}",
		         YEAR: "Den här kommentaren avvisades ${MMM} ${d} ${YYYY} av ${user}",
		         YESTERDAY: "Den här kommentaren avvisades i går ${time} av ${user}",
		         TOMORROW: "Den här kommentaren avvisades ${MMM} ${d} ${YYYY} av ${user}"
		      },
		      PREV_COMMENTS: "Visa föregående kommentarer",
		      EMPTY: "Det finns inga kommentarer.",
		      ERROR_ALT: "Fel",
		      ERROR: "Det uppstod ett fel när kommentarerna skulle hämtas. ${again}",
		      ERROR_ADDTL: "Det uppstod ett fel när ytterligare kommentarer skulle hämtas. ${again}",
		      ERROR_AGAIN: "Försök igen.",
		      ERROR_AGAIN_TITLE: "Om du vill se fler kommentarer försöker du utföra begäran igen.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} ${time} (version ${version})",
		         MONTH: "${user} ${MMM} ${d} (version ${version})",
		         TODAY: "${user} i dag ${time} (version ${version})",
		         YEAR: "${user} ${MMM} ${d} ${YYYY} (version ${version})",
		         YESTERDAY: "${user} i går ${time} (version ${version})",
		         TOMORROW: "${user} ${MMM} ${d} ${YYYY} (version ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} i dag ${time}",
		         YEAR: "${user} ${MMM} ${d} ${YYYY}",
		         YESTERDAY: "${user} i går ${time}",
		         TOMORROW: "${user} ${MMM} ${d} ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "I dag ${time}",
		         YEAR: "${MMM} ${d} ${YYYY}",
		         YESTERDAY: "I går ${time}",
		         TOMORROW: "${MMM} ${d} ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Kommentaren togs bort ${EEEE} ${time} av ${user}",
		         MONTH: "Kommentaren togs bort ${MMM} ${d} av ${user}",
		         TODAY: "Kommentaren togs bort i dag ${time} av ${user}",
		         YEAR: "Kommentaren togs bort ${MMM} ${d} ${YYYY} av ${user}",
		         YESTERDAY: "Kommentaren togs bort i går ${time} av ${user}",
		         TOMORROW: "Kommentaren togs bort ${MMM} ${d} ${YYYY} av ${user}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} redigerade ${EEEE} ${time} (version ${version})",
		         MONTH: "${user} redigerade ${MMM} ${d} (version ${version})",
		         TODAY: "${user} redigerade i dag ${time} (version ${version})",
		         YEAR: "${user} redigerade ${MMM} ${d} ${YYYY} (version ${version})",
		         YESTERDAY: "${user} redigerade i går ${time} (version ${version})",
		         TOMORROW: "${user} redigerade ${MMM} ${d} ${YYYY} (version ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} redigerade ${EEEE} ${time}",
		         MONTH: "${user} redigerade ${MMM} ${d}",
		         TODAY: "${user} redigerade i dag ${time}",
		         YEAR: "${user} redigerade ${MMM} ${d} ${YYYY}",
		         YESTERDAY: "${user} redigerade i går ${time}",
		         TOMORROW: "${user} redigerade ${MMM} ${d} ${YYYY}"
		      },
		      DELETE_CONFIRM: "Vill du ta bort den här kommentaren?",
		      FLAG_ITEM: {
		         BUSY: "Sparar...",
		         CANCEL: "Avbryt",
		         ACTION: "Flagga som olämpligt",
		         DESCRIPTION_LABEL: "Ange en orsak till att du har flaggat det här objektet (valfritt)",
		         EDITERROR: "Det uppstod ett fel. Det gick inte att redigera metadata för filen.",
		         OK: "Spara",
		         ERROR_SAVING: "Det uppstod ett fel när begäran skulle bearbetas. Försök igen senare.",
		         SUCCESS_SAVING: "Din flagga har skickats in. En moderator kommer att kontrollera begäran.",
		         TITLE: "Flagga det här objektet som olämpligt",
		         COMMENT: {
		            TITLE: "Flagga den här kommentaren som olämplig",
		            A11Y: "Om du klickar på den här knappen visas en dialogruta där du kan flagga den här kommentaren som olämplig."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Avbryt",
		      DIALOG_TITLE: "Ta bort kommentar",
		      NAME: "Ta bort kommentar",
		      OK: "OK",
		      TOOLTIP: "Ta bort kommentar"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Avbryt",
		      CONFIRM: "Den text som är längre än gränsen för kommentarer kommer att tas bort. Om du vill att kommentaren ska avkortas automatiskt klickar du på OK, om du vill redigera kommentaren själv klickar du på Avbryt.",
		      DIALOG_TITLE: "Korta av kommentar",
		      NAME: "Korta av kommentar",
		      OK: "OK",
		      TOOLTIP: "Korta av kommentar"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Bekräfta",
		      CONFIRM: "Din kommentar har skickats in för granskning och kommer att vara tillgänglig när den har godkänts.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE} ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "i dag",
		      TODAY_U: "I dag",
		      YESTERDAY: "i går",
		      YESTERDAY_U: "I går",
		      ADDED: { DAY: "Lades till ${EEee} ${time}",
		         FULL: "${EEEE} ${date_long} ${time_long}",
		         MONTH: "Lades till ${date_long}",
		         TODAY: "Lades till i dag ${time}",
		         YEAR: "Lades till ${date_long}",
		         YESTERDAY: "Lades till i går ${time}"
		      },
		      LAST_UPDATED: { DAY: "Uppdaterades ${EEee} ${time}",
		         FULL: "${EEEE} ${date_long} ${time_long}",
		         MONTH: "Uppdaterades ${date_long}",
		         TODAY: "Uppdaterades i dag ${time}",
		         YEAR: "Uppdaterades ${date_long}",
		         YESTERDAY: "Uppdaterades i går ${time}"
		      },
		      MONTHS_ABBR: { 0: "jan",
		         10: "nov",
		         11: "dec",
		         1: "feb",
		         2: "mar",
		         3: "apr",
		         4: "maj",
		         5: "juni",
		         6: "juli",
		         7: "aug",
		         8: "sep",
		         9: "okt"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE} ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "I dag",
		         YEAR: "${date_short}",
		         YESTERDAY: "I går",
		         TOMORROW: "I morgon"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} ${time}",
		         FULL: "${EEEE} ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "I dag ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "I går ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} ${time}",
		         FULL: "${EEEE} ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "I dag ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "I går ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} ${time}",
		         FULL: "${EEEE} ${date_long} ${time_long}",
		         MONTH: "${date_short} ${time}",
		         TODAY: "${date_short} ${time}",
		         YEAR: "${date_short} ${time}",
		         YESTERDAY: "${date_short} ${time}",
		         TOMORROW: "${date_short} ${time}"
		      },
		      DATE_ONLY: { DAY: "${date_short}",
		         FULL: "${EEEE} ${date_long}",
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
		      UPDATED: { DAY: "Uppdaterades ${EEee} ${time}",
		         FULL: "${EEEE} ${date_long} ${time_long}",
		         MONTH: "Uppdaterades ${date_long}",
		         TODAY: "Uppdaterades i dag ${time}",
		         YEAR: "Uppdaterades ${date_long}",
		         YESTERDAY: "Uppdaterades i går ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Det gick inte att läsa in versionsinformationen.",
		      ERROR_REQUEST_CANCELLED: "Begäran avbröts.",
		      ERROR_REQUEST_TIMEOUT: "Det gick inte att ansluta till servern.",
		      ERROR_REQUEST_UNKNOWN: "Det uppstod ett okänt fel.",
		      LOADING: "Läser in..",
		      NO_VERSIONS: "Det finns inga versioner",
		      INFO: "Version ${0} skapades ${1} av ",
		      VERSION_NUMBER: "Version ${0}",
		      DELETED: "Borttagna",
		      DELETE_ALL: "Ta bort alla versioner som är tidigare än version",
		      DELETE_VERSION_SINGLE: "Ta bort version ${0}",
		      DELETEERROR: "Det uppstod ett fel. Det gick inte att ta bort versionen.",
		      CREATE_VERSION: "Skapa en ny version",
		      CREATE_VERSION_TOOLTIP: "Skapa en version av filen",
		      REVERT_VERSION: "Återställ version ${0}",
		      REVERT_DESCRIPTION: "Återställdes från version ${0}",
		      PREVIOUS: "Föregående",
		      PREVIOUS_TOOLTIP: "Föregående sida",
		      ELLIPSIS: "...",
		      NEXT: "Nästa",
		      NEXT_TOOLTIP: "Nästa sida",
		      COUNT: "${0} - ${1} av ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Sida",
		      SHOW: "Visa",
		      ITEMS_PER_PAGE: " objekt per sida.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "I dag ${time}",
		            YESTERDAY: "I går ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} ${time}",
		            YEAR: "${date_short} ${time}",
		            FULL: "${EEEE} ${date_long} ${time_long}",
		            MONTH: "${date_short} ${time}",
		            TODAY: "i dag ${time}",
		            YESTERDAY: "i går ${time}"
		        },
		        UPDATED: { DAY: "Uppdaterades ${EEee} ${time}",
		            YEAR: "Uppdaterades ${date_short}",
		            FULL: "${EEEE} ${date_long} ${time_long}",
		            MONTH: "Uppdaterades ${date_short}",
		            TODAY: "Uppdaterades i dag ${time}",
		            YESTERDAY: "Uppdaterades i går ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Ta bort version ${0}",
		         DOWNLOAD: "Ladda ned",
		         DOWNLOAD_TOOLTIP: "Ladda ned den här versionen (${0})",
		         VIEW: "Visa",
		         VIEW_TOOLTIP: "Visa version ${0}",
		         REVERT: {
		            A11Y: "Om du klickar på den här knappen öppnas en dialogruta där du kan bekräfta återställningen av en fil från en tidigare version. Om du bekräftar åtgärden uppdateras innehållet på sidan.",
		            FULL: "Återställ",
		            WIDGET: "Återställ den här versionen"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Det gick inte att ta bort versionen. Den har redan tagits bort eller visas inte för dig.",
		         ERROR_ACCESS_DENIED: "Du är inte redigerare och kan därför inte ta bort versionen.",
		         ERROR_TIMEOUT: "Det gick inte att ansluta till servern. Det gick inte att ta bort versionen. Klicka på Ta bort om du vill försöka igen.",
		         ERROR_CANCEL: "Begäran avbröts. Det gick inte att ta bort versionen. Klicka på Ta bort om du vill försöka igen.",
		         ERROR_NOT_LOGGED_IN: "Om du vill ta bort den här versionen måste du vara inloggad. Klicka på Ta bort om du vill logga in.",
		         GENERIC_ERROR: "Det uppstod ett okänt fel. Det gick inte att ta bort versionen. Klicka på Ta bort om du vill försöka igen.",
		         FULL: "Ta bort",
		         A11Y: "Om du klickar på den här knappen öppnas en dialogruta där du kan bekräfta borttagningen av den här versionen. Om du bekräftar åtgärden uppdateras innehållet på sidan."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Versionen har tagits bort eller visas inte längre för dig. Det gick inte att återställa den.",
		         ERROR_ACCESS_DENIED: "Det gick inte att återställa versionen eftersom du inte är redigerare.",
		         ERROR_NAME_EXISTS: "Det finns en annan fil med samma namn. Det gick inte att återställa versionen.",
		         ERROR_TIMEOUT: "Det gick inte att ansluta till servern. Det gick inte att återställa versionen. Om du vill försöka igen klickar du på Återställ.",
		         ERROR_CANCEL: "Begäran avbröts. Det gick inte att återställa versionen. Om du vill försöka igen klickar du på Återställ.",
		         ERROR_QUOTA_VIOLATION: "Det gick inte att återställa versionen på grund av utrymmesbegränsningar.",
		         ERROR_MAX_CONTENT_SIZE: "Det gick inte att återställa versionen eftersom den är större än den största tillåtna filstorleken, ${0}.",
		         GENERIC_ERROR: "Det uppstod ett okänt fel. Det gick inte att återställa versionen. Om du vill försöka igen klickar du på Återställ."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Visa vilka som har laddat ned...",
		      PREVIOUS: "Föregående",
		      PREVIOUS_TOOLTIP: "Föregående sida",
		      ELLIPSIS: "...",
		      NEXT: "Nästa",
		      NEXT_TOOLTIP: "Nästa sida",
		      COUNT: "${0} - ${1} av ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Sida",
		      SHOW: "Visa",
		      ITEMS_PER_PAGE: " objekt per sida.",
		      VERSION: {
		         DAY: "Version ${version} ${date}",
		         MONTH: "Version ${version} ${date}",
		         TODAY: "Version ${version} ${time}",
		         YEAR: "Version ${version} ${date}",
		         YESTERDAY: "Version ${version} (i går)"
		      },
		      FILE: {
		         V_LATEST: "Du har laddat ned den senaste versionen av filen",
		         V_OLDER: "Du har senast laddat ned version ${0} av den här filen",
		         LOADING: "Läser in...",
		         EMPTY: "Endast anonyma användare",
		         ERROR: "Det gick inte att läsa in nedladdningsinformationen"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Fel",
		      ERROR_ALT_TEXT: "Fel:",
		      ERROR_MSG_GENERIC: "Det uppstod ett fel. Försök igen.",
		      ERROR_MSG_NOT_AVAILABLE: "Det här objektet har tagits bort eller är inte längre tillgängligt.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Innehållet för det här objektet är inte tillgängligt.",
		      ERROR_MSG_NO_ACCESS: "Du har inte längre åtkomst till det här objektet.",
		      LOADING: "Läser in...",
		      TITLE_SU: "${author} skickade ett meddelande.",
		      TITLE_NI: "${author} bjöd in dig till sitt nätverk.",
		      AUTHOR_TITLE: "Visa profilen för ${author}",
		      OPEN_LINK: "Öppna ${title}",
		      CONFIRM_CLOSE_TITLE: "Bekräfta",
		      CONFIRM_CLOSE_MESSAGE: "Vill du ignorera dina ändringar? Om du vill fortsätta klickar du på OK, om du vill gå tillbaka klickar du på Avbryt.",
		      OK: "OK",
		      CANCEL: "Avbryt"
		   },
		   MESSAGE: {
		      SUCCESS: "Bekräfta",
		      ERROR: "Fel",
		      ERROR_ALT_TEXT: "Fel:",
		      INFO: "Information",
		      WARNING: "Varning",
		      DISMISS: "Dölj meddelandet",
		      MORE_DETAILS: "Fler detaljer",
		      HIDE_DETAILS: "Dölj detaljer"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Skapades ${EEEE} ${time}",
		           MONTH: "Skapades ${MMM} ${d}",
		           TODAY: "Skapades i dag ${time}",
		           YEAR: "Skapades ${MMM} ${d} ${YYYY}",
		           YESTERDAY: "Skapades i går ${time}",
		           TOMORROW: "Skapades ${MMM} ${d} ${YYYY}"
		       },
		      error: "Det uppstod ett fel. ${again}.",
		      error_again: "Försök igen.",
		      error_404: "Statusuppdateringen finns inte längre.",
		      notifications: {
		         STATUS_UPDATE: "${user} skickade ett meddelande",
		         USER_BOARD_POST: "${user} skrev på din anslagstavla",
		         POST_COMMENT: "${user} skrev:"
		      }
		   },
		   login: {
		      error: "Ditt användarnamn och/eller lösenord överensstämmer inte med något befintligt konto. Försök igen.",
		      logIn: "Logga in",
		      password: "Lösenord:",
		      user: "Användarnamn:",
		      welcome: "Logga in till HCL Connections"
		   },
		   repost: {
		      name: "Skicka in igen",
		      title: "Skicka in den här uppdateringen till följare eller gemenskaper",
		      msg_success: "Uppdateringen skickades in till de som följer dig.",
		      msg_generic: "Det uppstod ett fel. Försök igen."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Lägg till",
		      ADD_TXT: "Lägg till personer eller gemenskaper som läsare",
		      SHOW_MORE: "Visa mer...",
		      READER_IF_PUBLIC: "Alla (gemensam)",
		      READER_IF_PUBLIC_TOOLTIP: "Den här filen är gemensam och visas för alla",
		      EMPTY_READERS: "Ingen",
		      READERS_LABEL: "Läsare:\u00a0",
		      EDITORS_LABEL: "Redigerare:\u00a0",
		      OWNER_LABEL: "Ägare:\u00a0",
		      ERROR: "Det gick inte att läsa in delningsinformationen",
		      ERROR_NOT_FOUND: "Den begärda filen har tagits bort eller flyttats. Om någon sände den här länken till dig kontrollerar du att den fungerar.",
		      ERROR_ACCESS_DENIED: "Du har inte behörighet att visa den här filen. Filen är inte gemensam och ingen delar den med dig.",
		      SHARE: "Dela",
		      CANCEL: "Avbryt",
		      SHARE_WITH: "Dela med:",
		      PERSON: "en person",
		      COMMUNITY: "en gemenskap",
		      PLACEHOLDER: "Personnamn eller mejladress...",
		      MESSAGE: "Meddelande:",
		      MESSAGE_TXT: "Lägg till ett meddelande",
		      REMOVE_ITEM_ALT: "Ta bort ${0}",
		      NO_MEMBERS: "Inga",
		      A11Y_READER_ADDED: "Valde ${0} som läsare",
		      A11Y_READER_REMOVED: "Tog bort ${0} som läsare",
		      SELF_REFERENCE_ERROR: "Du kan inte dela med dig själv.",
		      OWNER_REFERENCE_ERROR: "Det går inte att dela med ägaren till filen.",
		      SHARE_COMMUNITY_WARN: "Om du delar med den gemensamma gemenskapen ${0} kommer filen att bli gemensam.",
		      SELECT_USER_ERROR: "Du måste välja minst en person eller gemenskap att dela med",
		      WARN_LONG_MESSAGE: "Meddelandet är för långt.",
		      TRIM_LONG_MESSAGE: "Vill du skriva ett kortare meddelande?",
		      ERROR_SHARING: "Det gick inte att dela filen. Försök igen senare.",
		      INFO_SUCCESS: "Filen delades.",
		      MAX_SHARES_ERROR: "Det största antalet delningar har överskridits.",
		      NOT_LOGGED_IN_ERROR: "Du är inte inloggad. Det gick inte att dela filen. Om du vill dela filen klickar du på Dela.",
		      TIMEOUT_ERROR: "Det gick inte att ansluta till servern. Det gick inte att dela filen. Klicka på Dela om du vill försöka igen.",
		      CANCEL_ERROR: "Begäran avbröts. Det gick inte att dela filen. Klicka på Dela om du vill försöka igen.",
		      NOT_FOUND_ERROR: "Filen har tagits bort eller visas inte längre för dig. Det går inte att dela den.",
		      ACCESS_DENIED_ERROR: "Du har inte längre behörighet att dela den här filen.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Det går inte att göra begränsade filer gemensamma.",
		      TOOLTIP: "Ge andra åtkomst till den här filen"
		   },
		   HISTORY: {
		      TAB_TITLE: "Senaste uppdateringar",
		      NO_HISTORY: "Det finns inga senaste uppdateringar.",
		      EMPTY: "Det gick inte att hämta de senaste uppdateringarna för det här objektet. Det har tagits bort eller så har du inte längre åtkomst till det.",
		      MORE: "Visa tidigare uppdateringar",
		      ERROR_ALT: "Fel",
		      ERROR: "Det uppstod ett fel när uppdateringarna skulle hämtas. ${again}",
		      ERROR_ADDTL: "Det uppstod ett fel när ytterligare uppdateringar skulle hämtas. ${again}",
		      ERROR_AGAIN: "Försök igen.",
		      ERROR_AGAIN_TITLE: "Om du vill se fler uppdateringar försöker du utföra begäran igen.",
		      PROFILE_TITLE: "Öppna profilen för ${user}.",
		      SORT_BY: "Sortera efter\\:",
		      SORTS: {
		         DATE: "Datum",
		         DATE_TOOLTIP: "Sortera från de senaste uppdateringarna till de äldsta uppdateringarna",
		         DATE_TOOLTIP_REVERSE: "Sortera från de äldsta uppdateringarna till de senaste uppdateringarna"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "I dag ${time}",
		             YEAR: "${MMM} ${d} ${YYYY}",
		             YESTERDAY: "I går ${time}",
		             TOMORROW: "${MMM} ${d} ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Den här kommentaren",
			   REPLY_ACTION: "Svara",
		       REPLY_ACTION_TOOLTIP: "Svara på den här kommentaren"
		   },
		   OAUTH: {
		      welcomeHeader: "Välkommen till Connections!",
		      continueBtnLabel: "Fortsätt",
		      continueBtnA11y: "Om du klickar på den här länken öppnas ett nytt fönster där du kan ange åtkomst för Connections.",
		      clickHere: "klickar du här",
		      infoMsg: "Du måste ange åtkomst till dina data för Connections.",
		      authorizeGadget: "Om du vill ge den här applikationen åtkomst till din Connections-information ${clickHere}.",
		      confirmAuthorization: "Om du vill bekräfta att du har behörighet att ge applikationen åtkomst till din Connections ${clickHere}."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Om du klickar på den här länken öppnas ett nytt fönster där du kan ange åtkomst för bibliotekslagret i Connections.",
		      infoMsg: "Du måste ange åtkomst till dina data för bibliotekslagret för Connections.",
		      authorizeGadget: "Om du vill ge den här applikationen åtkomst till din bibliotekslagerinformation för Connections ${clickHere}.",
		      confirmAuthorization: "Om du vill bekräfta att du har behörighet att ge applikationen åtkomst till din bibliotekslagerinformation för Connections ${clickHere}."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Avbryt",
		      CONFIRM: "Vill du ignorera dina ändringar? Om du vill fortsätta klickar du på OK, om du vill gå tillbaka klickar du på Avbryt.",
		      DIALOG_TITLE: "Bekräfta",
		      NAME: "Bekräfta",
		      OK: "OK",
		      TOOLTIP: "Bekräfta"
		   }
});
