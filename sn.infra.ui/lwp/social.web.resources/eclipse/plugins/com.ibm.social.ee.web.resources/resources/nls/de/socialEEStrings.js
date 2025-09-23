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
({
   common: {
      more: {
         label: "Mehr",
         tooltip: "Weitere Aktionen"
       },
       tags_more: "und ${0} weitere",
       ERROR_ALT: "Fehler",
       PERSON_TITLE: "Öffnen Sie das Profil von ${user}.",
       inactiveUser: "${user} (inaktiv)",
       inactiveIndicator: "(inaktiv)",
       like_error: "Ihre Empfehlung konnte nicht gespeichert werden. Versuchen Sie es später erneut.",
       vote_error: "Ihre Stimme konnte nicht gespeichert werden. Versuchen Sie es später erneut."
   },
   generic: {
      untitled: "(Ohne Titel)",
      tags: "Tags:",
      tags_more: "und ${0} weitere",
      likes: "Empfehlungen ",
      comments: "Kommentare ",
      titleTooltip: "Navigieren zu ${app}",
      error: "Die Daten können nicht abgerufen werden. ",
      timestamp: {
         created: {
            DAY: "Erstellt am ${EEEE} um ${time}",
            MONTH: "Erstellt am ${MMM} ${d}",
            TODAY: "Heute erstellt um ${time}",
            YEAR: "Erstellt am ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Gestern erstellt um ${time}",
            TOMORROW: "Erstellt am ${MMM} ${d} ${YYYY}"
         },
         updated: {
            DAY: "Am ${EEEE} aktualisiert um ${time}",
            MONTH: "Aktualisiert am ${MMM} ${d}",
            TODAY: "Heute aktualisiert um ${time}",
            YEAR: "Aktualisiert am ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Gestern aktualisiert um ${time}",
            TOMORROW: "Aktualisiert am ${MMM} ${d} ${YYYY}"
         }
      },
      visibility: {
         pub: "Öffentlich",
         priv: "Privat"
      },
      action: {
         created: "Erstellt",
         updated: "Aktualisiert"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Aktualisierungen zu Personen, denen Sie folgen, auf der Homepage und in einer E-Mail-Zusammenfassung erhalten. ",
      profile_title: "Öffnen Sie das Profil von ${user}.",
      profile_a11y: "Durch Aktivierung dieses Links wird das Profil von ${user} in einem neuen Fenster geöffnet. ",
      error: "Es ist ein Fehler aufgetreten. ${again}.",
      error_again: "Versuchen Sie es erneut. ",
      error_404: "Die Netzanforderung ist nicht mehr vorhanden. ",
      warning: "Warnung ",
      messages: {
         success: {
            accept: {
            	nofollow: "Sie sind jetzt vernetzt.",
            	follow: "Sie sind jetzt vernetzt und folgen ${user}."
            },
            ignore: {
            	nofollow: "Sie haben die Einladung ignoriert.",
            	follow: "Sie haben die Einladung ignoriert, folgen nun aber ${user}."
            }
         },
         error: {
            accept: "Bei der Anforderungsannahme ist ein Fehler aufgetreten. ",
            ignore: "Beim Ignorieren der Anforderung ist ein Fehler aufgetreten. "
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} bei ${time}",
              MONTH: "${MMM} ${d}",
              TODAY: "Heute um ${time}",
              YEAR: "${MMM} ${d}, ${YYYY}",
              YESTERDAY: "Gestern um ${time}",
              TOMORROW: "${MMM} ${d}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Durch Aktivierung dieses Links wird ${name} in einem neuen Fenster geöffnet. ",
      tooltip: "Öffnen Sie ${name} in der Dateien-Anwendung. ",
      profile_title: "Öffnen Sie das Profil von ${user}.",
      profile_a11y: "Durch Aktivierung dieses Links wird das Profil von ${user} in einem neuen Fenster geöffnet. ",
      download_tooltip: "Diese Datei herunterladen (${0})",
      following: {
         add: "Datei folgen",
         remove: "Nicht mehr folgen",
         title: "Benachrichtigung zu Aktualisierungen dieser Datei ein-/ausschalten"
      },
      share: {
         label: "Teilen ",
         title: "Diese Datei mit anderen Personen teilen "
      },
      timestamp: {
         created: {
            DAY: "Erstellt am ${EEEE} um ${time}",
            MONTH: "Erstellt am ${MMM} ${d}",
            TODAY: "Heute erstellt um ${time}",
            YEAR: "Erstellt am ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Gestern erstellt um ${time}",
            TOMORROW: "Erstellt am ${MMM} ${d} ${YYYY}"
         },
         createdOther: {
            DAY: "${user} erstellt am ${EEEE} um ${time}",
            MONTH: "${user} erstellt am ${MMM} ${d}",
            TODAY: "${user} heute erstellt um ${time}",
            YEAR: "${user} erstellt am ${MMM} ${d} ${YYYY}",
            YESTERDAY: "${user} gestern erstellt um ${time}",
            TOMORROW: "${user} erstellt am ${MMM} ${d} ${YYYY}"
         },
         updated: {
            DAY: "Am ${EEEE} aktualisiert um ${time}",
            MONTH: "Aktualisiert am ${MMM} ${d}",
            TODAY: "Heute aktualisiert um ${time}",
            YEAR: "Aktualisiert am ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Gestern aktualisiert um ${time}",
            TOMORROW: "Aktualisiert am ${MMM} ${d} ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} aktualisiert am ${EEEE} um ${time}",
            MONTH: "${user} aktualisiert am ${MMM} ${d}",
            TODAY: "${user} heute aktualisiert um ${time}",
            YEAR: "${user} aktualisiert am ${MMM} ${d} ${YYYY}",
            YESTERDAY: "${user} gestern aktualisiert um ${time}",
            TOMORROW: "${user} aktualisiert am ${MMM} ${d} ${YYYY}"
         },
         createdCompact: {
            DAY: "Erstellt: ${EEEE} um ${time}",
            MONTH: "Erstellt: ${MMM} ${d}",
            TODAY: "Erstellt: Heute um ${time}",
            YEAR: "Erstellt: ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Erstellt: Gestern um ${time}",
            TOMORROW: "Erstellt: ${MMM} ${d} ${YYYY}"
         },
         updatedCompact: {
            DAY: "Aktualisiert: ${EEEE} um ${time}",
            MONTH: "Aktualisiert: ${MMM} ${d}",
            TODAY: "Aktualisiert: Heute um ${time}",
            YEAR: "Aktualisiert: ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Aktualisiert: Gestern um ${time}",
            TOMORROW: "Aktualisiert: ${MMM} ${d} ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} von ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} von ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Diese Datei herunterladen (${size})",
      	 DOWNLOAD_ALT: "Herunterladen "
      },

      PREVIEW: {
         LINK: "Vorschau",
         TITLE: "Zeigen Sie eine Vorschau dieser Datei in einem neuen Fenster an. "
      },
      TAGS: "Tags:",
      error: "Es ist ein Fehler aufgetreten. ${again}.",
      error_again: "Versuchen Sie es erneut. ",
      error_404: "Die Datei ist nicht mehr vorhanden oder Sie haben keine ausreichenden Berechtigungen für den Zugriff darauf. ",
      error_403: "Sie sind nicht zum Anzeigen dieser Datei berechtigt. Die Datei ist nicht öffentlich und wird nicht mit Ihnen geteilt.",
      notifications: {
         USER_SHARED: "${user} schrieb: ",
         CHANGE_SUMMARY: "${user} hat eine Änderungszusammenfassung bereitgestellt",
         NO_CHANGE_SUMMARY: "${user} hat keine Änderungszusammenfassung bereitgestellt",
         COMMENTED: "${user} kommentiert"
      }
   },
   ecm_file: {
      checkedout_you: "Ausgecheckt von Ihnen",
      checkedout_other: "Ausgecheckt von ${user}",
      tooltip: "Datei ${name} in der Bibliothek öffnen",
      draft_404_info: "Der Entwurf wurde gelöscht oder wird nicht mehr mit Ihnen geteilt. Die veröffentlichte Version ist nun die neueste Version dieser Datei.",
      error_404: "Die Datei wurde gelöscht oder wird nicht mehr mit Ihnen geteilt.",
      error_403: "Die Datei wurde gelöscht oder wird nicht mehr mit Ihnen geteilt.",
      error_preview: "Die Datei ist nicht mehr für die Vorschau verfügbar.",
      draft_review_canceled: "Die Überprüfung wurde abgebrochen und der Entwurf wird nicht mehr mit Ihnen geteilt. Ihre Überprüfung ist nicht mehr erforderlich.",
      switch_ee: "Entwurf anzeigen",
      switch_ee_tooltip: "Neuesten Entwurf für diese Datei anzeigen"
   },
   ecm_draft: {
      tooltip: "Entwurf ${name} in der Bibliothek öffnen",
      community_owners: "Community-Eigentümer",
      draft: "Entwurf",
      draft_tooltip: "Entwurf anzeigen",
      draft_general_info: "Der vorherige Entwurf ist nicht mehr vorhanden; ein neuerer Entwurf ist nun die aktuellste Version.",
      draft_review_404_general_info: "Einer der Prüfer hat bereits abgestimmt. Sie müssen diesen Entwurf nicht mehr überprüfen.",
      draft_review_404_request_info: "Der vorherige Entwurf ist nicht mehr vorhanden; der aktuellste Entwurf wurde zur Überprüfung eingereicht. Ihre Überprüfung wurde angefordert.",
      draft_review_404_require_info: "Der vorherige Entwurf ist nicht mehr vorhanden; der aktuellste Entwurf wurde zur Überprüfung eingereicht. Ihre Überprüfung ist erforderlich.",
      draft_review_request_info: "Ihre Überprüfung wurde angefordert.",
      draft_review_require_info: "Ihre Überprüfung ist erforderlich.",
      error_404: "Der Entwurf wurde gelöscht oder wird nicht mehr mit Ihnen geteilt.",
      error_403: "Sie können diesen Entwurf nicht anzeigen, weil er nicht mit Ihnen geteilt wird.",
      error_preview: "Der Entwurf ist nicht mehr für die Vorschau verfügbar.",
      switch_ee: "Veröffentlichte Version anzeigen",
      switch_ee_tooltip: "Veröffentlichte Version dieser Datei anzeigen",
      review: "Überprüfung",
      reviewers: "Prüfer",
      reviwers_addtl: "Zusätzliche Prüfer",
      in_review: "Entwurf in Überprüfung",
      in_review_tooltip: "Entwurf in Überprüfung anzeigen",
      review_required_any: "Die Community-Eigentümer fordern, dass dieser Entwurf von einem Prüfer überprüft wird.",
      review_required_all: "Die Community-Eigentümer fordern, dass dieser Entwurf von allen Prüfern überprüft wird.",
      review_required_generic: "Die Community-Eigentümer fordern, dass dieser Entwurf von diesen Prüfern überprüft wird.",
      review_additional_required: "Alle Prüfer, die von der Person, die den Entwurf eingereicht hat, hinzugefügt wurden, sind für die Überprüfung dieses Entwurfs erforderlich.",
      reivew_submitted_date: {
         DAY: "${user} hat den Entwurf am ${EEEE} um ${time} zur Überprüfung eingereicht.",
         MONTH: "${user} hat den Entwurf am ${MMM} ${d} zur Überprüfung eingereicht.",
         TODAY: "${user} hat den Entwurf heute um ${time} zur Überprüfung eingereicht.",
         YEAR: "${user} hat den Entwurf am ${MMM} ${d} ${YYYY} zur Überprüfung eingereicht.",
         YESTERDAY: "${user} hat den Entwurf gestern um ${time} zur Überprüfung eingereicht.",
         TOMORROW: "${user} hat den Entwurf am ${MMM} ${d} ${YYYY} zur Überprüfung eingereicht."
      },
      pending: "Anstehend",
      pending_rejected: "Überprüfung nicht mehr erforderlich, da der Entwurf zurückgewiesen wurde",
      approve: "Genehmigen",
      approved: "Genehmigt",
      approve_tooltip: "Diesen Entwurf genehmigen",
      accept_success: "Sie haben diesen Entwurf genehmigt.",
      accept_error: "Beim Genehmigen dieses Entwurfs ist ein Fehler aufgetreten. Versuchen Sie es erneut.",
      accept_info: "Sie haben diesen Entwurf genehmigt.",
      reject: "Zurückweisen",
      rejected: "Zurückgewiesen",
      reject_tooltip: "Diesen Entwurf zurückweisen",
      reject_success: "Sie haben diesen Entwurf zurückgewiesen.",
      reject_error: "Beim Zurückweisen dieses Entwurfs ist ein Fehler aufgetreten. Versuchen Sie es erneut.",
      reject_info: "Sie haben diesen Entwurf zurückgewiesen."
   },
   authUser: {
      error: "Beim Abrufen des aktuellen Benutzers ist ein Fehler aufgetreten. ${again}.",
      error_again: "Versuchen Sie es erneut. ",
      error_404: "Der authentifizierte Benutzer wurde nicht gefunden.",
      error_403: "Sie sind nicht zum Abrufen von Benutzerdaten berechtigt."
   },
   forum: {
      error: "Es ist ein Fehler aufgetreten. ${again}.",
      error_again: "Versuchen Sie es erneut. ",
      error_404: "Das Forum ist nicht mehr vorhanden oder Sie verfügen nicht über ausreichend Berechtigungen, um darauf zuzugreifen.",
      error_403: "Sie sind nicht zum Anzeigen dieses Forums berechtigt. Das Forum ist nicht öffentlich und wird nicht mit Ihnen geteilt.",

      readMore: "Vollständiges Thema anzeigen...",
      readMore_tooltip: "Öffnen Sie das Forenthema ${name}.",
      readMore_a11y: "Durch Aktivierung dieses Links wird das Forenthema ${name} in einem neuen Fenster geöffnet.",
      QUESTION_ANSWERED: "Diese Frage wurde beantwortet.",
      QUESTION_NOT_ANSWERED: "Diese Frage wurde noch nicht beantwortet.",

      attachments: "${count} Anhänge",
      attachments_one: "${count} Anhang"
   },
   blog: {
      error: "Es ist ein Fehler aufgetreten. ${again}.",
      error_again: "Versuchen Sie es erneut. ",
      error_404: "Das Blog ist nicht mehr vorhanden oder Sie haben keine ausreichenden Berechtigungen für den Zugriff darauf. ",
      error_403: "Sie sind nicht zum Anzeigen dieses Blogs berechtigt. Der Blog ist nicht öffentlich und wird nicht mit Ihnen geteilt.",
      readMore: " Mehr lesen...",
      readMore_tooltip: "Öffnen Sie den Blogeintrag ${name}.",
      readMore_a11y: "Durch Aktivierung dieses Links wird der Blogeintrag ${name} in einem neuen Fenster geöffnet.",
      graduated: "Hochgestuft",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Abstimmen</a>",
  					TOOLTIP: 	"Dafür abstimmen"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Abgestimmt</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Abgestimmt</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Widerrufen</a>",
  					TOOLTIP: 	"Entfernt Ihre Stimme dafür"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 Personen haben dafür gestimmt"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 Person hat dafür gestimmt"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} haben dafür gestimmt "
  				}
  			},
  			LOADING: "Ladevorgang läuft...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Abgestimmt"
  			}
  		}
   },
   idea: {
	  error_404: "Ihre Stimme konnte nicht gespeichert werden, weil Sie entweder Begrenzung für Abstimmungen erreicht haben oder weil die Idee nicht mehr für Sie verfügbar ist. ",
      readMore_tooltip: "Öffnen Sie die Idee ${name}.",
      readMore_a11y: "Durch Aktivierung dieses Links wird die Idee ${name} in einem neuen Fenster geöffnet."
   },
   size: {
      B: "${0} B",
      KB: "${0} KB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "Antworten",
      THIS_ARIA_LABEL: "Diese Antwort",
      THIS_TAB_TITLE: "Diese Antwort",
      TAB_TITLE: "Beiträge (${0})",
      REPLY_TO_REPLY: "Als Antwort auf ${thisReply}",
      REPLY_TO_TOPIC: "Als Antwort auf ${thisTopic}",
      THIS_TOPIC: "dieses Thema",
      THIS_REPLY: "diesen Beitrag",
      NAVIGATE_TO_REPLY: "Zum übergeordneten Beitrag navigieren ",
      NAVIGATE_TO_TOPIC: "Zum übergeordneten Thema navigieren ",
      ADD_COMMENT: "Auf dieses Thema antworten",
      ADD_COMMENT_TOOLTIP: "Auf dieses Forenthema antworten",
      SHOWING_RECENT_REPLIES: "Die ${0} neuesten Beiträge anzeigen",
      PREV_COMMENTS: "Mehr Antworten anzeigen ",
      PLACEHOLDER_TXT: "Auf dieses Thema antworten",
      EMPTY: "Es gibt keine Beiträge.",
      TRIM_LONG_COMMENT: "Antwort kürzen?",
      WARN_LONG_COMMENT: "Die Antwort ist zu lang. ${shorten}",
      ERROR: "Beim Abrufen der Antworten ist ein Fehler aufgetreten. ${again}",
      ERROR_CREATE: "Ihre Antwort konnte nicht gespeichert werden. Versuchen Sie es später erneut.",
      ERROR_CREATE_NOT_FOUND: "Ihre Antwort konnte nicht gespeichert werden, da das Thema gelöscht wurde oder da es Ihnen nicht mehr angezeigt wird.",
      ERROR_CREATE_ACCESS_DENIED: "Ihre Antwort konnte nicht gespeichert werden, da das Thema gelöscht wurde oder da es Ihnen nicht mehr angezeigt wird.",
      ERROR_CREATE_TIMEOUT: "Ihre Antwort konnte nicht gespeichert werden, da keine Verbindung zum Server hergestellt werden konnte. Klicken Sie auf 'Speichern', um es erneut zu versuchen.",
      ERROR_CREATE_CANCEL: "Ihre Antwort konnte nicht gespeichert werden, da die Anforderung abgebrochen wurde. Klicken Sie auf 'Speichern', um es erneut zu versuchen.",
      ERROR_CREATE_NOT_LOGGED_IN: "Sie müssen angemeldet sein, um diese Antwort zu erstellen. Klicken Sie auf 'Speichern', damit eine Anmeldeaufforderung angezeigt wird.",
      ERROR_NO_CONTENT: "Geben Sie Ihre Antwort ein und klicken Sie auf 'Speichern'. Wenn Sie keine Antwort mehr verfassen möchten, klicken Sie auf 'Abbrechen'.",
      ERROR_UNAUTHORIZED: "Die Antwort konnte nicht gespeichert werden, da Sie nicht berechtigt sind eine Antwort zu hinterlassen.",
      COMMENT_DELETED: {
         DAY: "Beitrag gelöscht von${user} am ${EEEE} um ${time}",
         MONTH: "Antwort gelöscht von ${user} am ${MMM} ${d}",
         TODAY: "Beitrag gelöscht von ${user} heute um ${time}",
         YEAR: "Antwort gelöscht von ${user} am ${MMM} ${d} ${YYYY}",
         YESTERDAY: "Beitrag gelöscht von ${user} gestern um ${time}",
         TOMORROW: "Antwort gelöscht von ${user} am ${MMM} ${d} ${YYYY}"
      },
      REASON_FOR_DELETION: "Grund für den Löschvorgang: ${reason}",
      REPLY_TITLE: "AW: ${0}",
      SHOW_FULL_REPLY: "Vollständige Antwort anzeigen",
      SHOW_FULL_REPLY_TOOLTIP: "Navigieren Sie zur ursprünglichen Antwort in diesem Forenthema",
      REPLY_ACTION: "Antwort",
      REPLY_ACTION_TOOLTIP: "Auf diesen Beitrag antworten",
      MODERATION_PENDING: "Diese Antwort steht zur Überprüfung an.",
      MODERATION_QUARANTINED: "Der Beitrag wurde vom Moderator in einen isolierten Bereich verlagert.",
      MODERATION_REMOVED: {
         DAY: "Diese Antwort wurde von ${user} am ${EEEE} um ${time} entfernt.",
         MONTH: "Diese Antwort wurde von ${user} am ${MMM} ${d} entfernt.",
         TODAY: "Diese Antwort wurde von ${user} heute um ${time} entfernt.",
         YEAR: "Diese Antwort wurde von ${user} am ${MMM} ${d} ${YYYY} entfernt.",
         YESTERDAY: "Diese Antwort wurde von ${user} gestern um ${time} entfernt.",
         TOMORROW: "Diese Antwort wurde von ${user} am ${MMM} ${d} ${YYYY} entfernt."
      },
      MODERATION_REJECTED: {
         DAY: "Diese Antwort wurde von ${user} am ${EEEE} um ${time} zurückgewiesen.",
         MONTH: "Diese Antwort wurde von ${user} am ${MMM} ${d} zurückgewiesen.",
         TODAY: "Diese Antwort wurde von ${user} heute um ${time} zurückgewiesen.",
         YEAR: "Diese Antwort wurde von ${user} am ${MMM} ${d} ${YYYY} zurückgewiesen.",
         YESTERDAY: "Diese Antwort wurde von ${user} gestern um ${time} zurückgewiesen.",
         TOMORROW: "Diese Antwort wurde von ${user} am ${MMM} ${d} ${YYYY} zurückgewiesen."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Ihre Antwort wurde zur Überprüfung übergeben und ist nach der Genehmigung verfügbar."
   },
   COMMENTS: {
      ARIA_LABEL: "Kommentare ",
      PLACEHOLDER_TXT: "Kommentar hinzufügen",
      TAB_TITLE: "Kommentare (${0})",
      ACTION_NOT_SUPPORTED: "Nicht unterstützte Aktion",
      ADD_COMMENT: "Kommentar hinzufügen",
      ADD_COMMENT_TOOLTIP: "Diesem Element einen Kommentar hinzufügen ",
      CANCEL: "Abbrechen",
      COMMENT_COUNT_ONE: "${0} Kommentar",
      COMMENT_COUNT_MANY: "${0} Kommentare",
      COMMENT_LABEL: "Kommentar: ",
      DELETE: "Löschen",
      DELETE_TOOLTIP: "Kommentar löschen",
      DELETEREASON: "Grund für das Löschen dieses Kommentars:",
      DIALOG_TITLE: "Kommentar kürzen",
      TOOLTIP: "Kommentar kürzen",
      NAME: "Kommentar kürzen",
      EDIT: "Bearbeiten",
      EDIT_TOOLTIP: "Kommentar bearbeiten",
      ERROR_CREATE: "Ihr Kommentar konnte nicht gespeichert werden. Versuchen Sie es später erneut.",
      ERROR_CREATE_NOT_FOUND: "Ihr Kommentar konnte nicht gespeichert werden, weil das Element gelöscht wurde oder nicht mehr für Sie sichtbar ist.",
      ERROR_CREATE_ACCESS_DENIED: "Ihr Kommentar konnte nicht gespeichert werden, weil das Element gelöscht wurde oder nicht mehr für Sie sichtbar ist.",
      ERROR_CREATE_TIMEOUT: "Ihr Kommentar konnte nicht gespeichert werden, weil keine Verbindung zum Server hergestellt werden konnte.  Klicken Sie auf 'Veröffentlichen', um es erneut zu versuchen.",
      ERROR_CREATE_CANCEL: "Ihr Kommentar konnte nicht gespeichert werden, weil die Anforderung abgebrochen wurde. Klicken Sie auf 'Veröffentlichen', um es erneut zu versuchen.",
      ERROR_CREATE_NOT_LOGGED_IN: "Sie müssen angemeldet sein, um diesen Kommentar zu erstellen. Klicken Sie auf 'Veröffentlichen', damit eine Anmeldeaufforderung angezeigt wird.",
      ERROR_DELETE: "Ihr Kommentar konnte nicht gelöscht werden. Versuchen Sie es später erneut.",
      ERROR_DELETE_TIMEOUT: "Ihr Kommentar konnte nicht gelöscht werden, weil keine Verbindung zum Server hergestellt werden konnte. Klicken Sie auf 'Löschen', um es erneut zu versuchen.",
      ERROR_DELETE_NOT_FOUND: "Ihr Kommentar konnte nicht gelöscht werden, weil der Kommentar oder das Element gelöscht wurde oder nicht mehr für Sie sichtbar ist.",
      ERROR_DELETE_ACCESS_DENIED: "Ihr Kommentar konnte nicht gelöscht werden, weil das Element gelöscht wurde oder nicht mehr für Sie sichtbar ist.",
      ERROR_DELETE_CANCEL: "Ihr Kommentar konnte nicht gelöscht werden, weil die Anforderung abgebrochen wurde. Klicken Sie auf 'Löschen', um es erneut zu versuchen.",
      ERROR_DELETE_NOT_LOGGED_IN: "Sie müssen angemeldet sein, um diesen Kommentar zu löschen. Klicken Sie auf 'Löschen', damit eine Anmeldeaufforderung angezeigt wird.",
      ERROR_EDIT: "Ihr Kommentar konnte nicht aktualisiert werden. Versuchen Sie es später erneut.",
      ERROR_EDIT_ACCESS_DENIED: "Ihr Kommentar konnte nicht aktualisiert werden, weil das Element gelöscht wurde oder nicht mehr für Sie sichtbar ist.",
      ERROR_EDIT_NOT_FOUND: "Ihr Kommentar konnte nicht aktualisiert werden, weil das Element gelöscht wurde oder nicht mehr für Sie sichtbar ist.",
      ERROR_EDIT_TIMEOUT: "Ihr Kommentar konnte nicht aktualisiert werden, weil keine Verbindung zum Server hergestellt werden konnte.  Klicken Sie auf 'Veröffentlichen', um es erneut zu versuchen.",
      ERROR_EDIT_CANCEL: "Ihr Kommentar konnte nicht aktualisiert werden, weil die Anforderung abgebrochen wurde. Klicken Sie auf 'Veröffentlichen', um es erneut zu versuchen.",
      ERROR_EDIT_NOT_LOGGED_IN: "Sie müssen angemeldet sein, um diesen Kommentar zu bearbeiten. Klicken Sie auf 'Veröffentlichen', damit eine Anmeldeaufforderung angezeigt wird.",
      ERROR_NO_CONTENT: "Geben Sie Ihren Kommentar ein und klicken Sie auf 'Veröffentlichen'. Wenn Sie keinen Kommentar mehr verfassen möchten, klicken Sie auf 'Abbrechen'.",
      ERROR_NO_CONTENT_EDIT: "Geben Sie Ihren Kommentar ein und klicken Sie auf 'Veröffentlichen'. Wenn Sie Ihren Kommentar nicht mehr bearbeiten möchten, klicken Sie auf 'Abbrechen'.",
      ERROR_UNAUTHORIZED: "Ihr Kommentar konnte nicht gespeichert werden, da Sie nicht berechtigt sind einen Kommentar zu hinterlassen.",
      ERROR_GENERAL: "Es ist ein Fehler aufgetreten. ",
      OK: "OK",
      YES: "Ja",
      TRIM_LONG_COMMENT: "Kommentar kürzen?",
      WARN_LONG_COMMENT: "Der Kommentar ist zu lang. ${shorten}",
      LINK: "Link",
      SAVE: "Speichern",
      POST: "Veröffentlichen ",
      SHOWMORE: "Erweitern... ",
      VIEW_COMMENTS_FILE: "Kommentare zu dieser Datei anzeigen",
      SUBSCRIBE_TO_COMMENTS: "Diese Kommentare abonnieren",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Änderungen an diesen Kommentaren über Feed-Leseprogramm folgen",
      PROFILE_TITLE: "Öffnen Sie das Profil von ${user}.",
      PROFILE_A11Y: "Durch Aktivierung dieses Links wird das Profil von ${user} in einem neuen Fenster geöffnet. ",
      MODERATION_PENDING: "Dieser Kommentar steht zur Überprüfung an.",
      MODERATION_REMOVED: {
         DAY: "Dieser Kommentar wurde von ${user} am ${EEEE} um ${time} entfernt.",
         MONTH: "Dieser Kommentar wurde von ${user} am ${MMM} ${d} entfernt. ",
         TODAY: "Dieser Kommentar wurde von ${user} heute um ${time} entfernt.",
         YEAR: "Dieser Kommentar wurde von ${user} am ${MMM} ${d} ${YYYY} entfernt.",
         YESTERDAY: "Dieser Kommentar wurde von ${user} gestern um ${time} entfernt.",
         TOMORROW: "Dieser Kommentar wurde von ${user} am ${MMM} ${d} ${YYYY} entfernt."
      },

      MODERATION_REJECTED: {
         DAY: "Dieser Kommentar wurde von ${user} am ${EEEE} um ${time} zurückgewiesen.",
         MONTH: "Dieser Kommentar wurde von ${user} am ${MMM} ${d} zurückgewiesen.",
         TODAY: "Dieser Kommentar wurde von ${user} heute um ${time} zurückgewiesen.",
         YEAR: "Dieser Kommentar wurde von ${user} am ${MMM} ${d} ${YYYY} zurückgewiesen.",
         YESTERDAY: "Dieser Kommentar wurde von ${user} gestern um ${time} zurückgewiesen.",
         TOMORROW: "Dieser Kommentar wurde von ${user} am ${MMM} ${d} ${YYYY} zurückgewiesen."
      },
      PREV_COMMENTS: "Vorherige Kommentare einblenden ",
      EMPTY: "Es sind keine Kommentare vorhanden.",
      ERROR_ALT: "Fehler",
      ERROR: "Beim Abrufen der Kommentare ist ein Fehler aufgetreten. ${again}",
      ERROR_ADDTL: "Beim Abrufen weiterer Kommentare ist ein Fehler aufgetreten. ${again}",
      ERROR_AGAIN: "Versuchen Sie es erneut.",
      ERROR_AGAIN_TITLE: "Wiederholen Sie die Anforderung für weitere Kommentare.",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} um ${time} (Version ${version})",
         MONTH: "${user} ${MMM} ${d} (Version ${version})",
         TODAY: "${user} heute um ${time} (Version ${version})",
         YEAR: "${user} ${MMM} ${d} ${YYYY} (Version ${version})",
         YESTERDAY: "${user} gestern um ${time} (Version ${version})",
         TOMORROW: "${user} ${MMM} ${d} ${YYYY} (Version ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} bei ${time}",
         MONTH: "${user} ${MMM} ${d}",
         TODAY: "${user} heute um ${time}",
         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} gestern um ${time}",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} bei ${time}",
         MONTH: "${MMM} ${d}",
         TODAY: "Heute um ${time}",
         YEAR: "${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Gestern um ${time}",
         TOMORROW: "${MMM} ${d}, ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Kommentar gelöscht von ${user} am ${EEEE} um ${time}",
         MONTH: "Kommentar gelöscht von ${user} am ${MMM} ${d}",
         TODAY: "Kommentar gelöscht von ${user} heute um ${time}",
         YEAR: "Kommentar gelöscht von ${user} am ${MMM} ${d} ${YYYY}",
         YESTERDAY: "Kommentar gelöscht von ${user} gestern um ${time}",
         TOMORROW: "Kommentar gelöscht von ${user} am ${MMM} ${d} ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} hat ${EEEE} um ${time} (Version ${version}) bearbeitet",
         MONTH: "${user} hat ${MMM} ${d} bearbeitet (Version ${version})",
         TODAY: "${user} hat heute um ${time} bearbeitet (Version ${version})",
         YEAR: "${user} hat ${MMM} ${d} ${YYYY} bearbeitet (Version ${version})",
         YESTERDAY: "${user} hat gestern um ${time} bearbeitet (Version ${version})",
         TOMORROW: "${user} hat ${MMM} ${d} ${YYYY} bearbeitet (Version ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} hat ${EEEE} um ${time} bearbeitet",
         MONTH: "${user} hat ${MMM} ${d} bearbeitet",
         TODAY: "${user} hat heute um ${time} bearbeitet",
         YEAR: "${user} hat ${MMM} ${d} ${YYYY} bearbeitet",
         YESTERDAY: "${user} hat gestern um ${time} bearbeitet",
         TOMORROW: "${user} hat ${MMM} ${d} ${YYYY} bearbeitet"
      },

      DELETE_CONFIRM: "Möchten Sie diesen Kommentar wirklich löschen?",
      FLAG_ITEM: {
         BUSY: "Speichern...",
         CANCEL: "Abbrechen",
         ACTION: "Als unzulässig markieren",
         DESCRIPTION_LABEL: "Geben Sie einen Grund für das Markieren dieses Elements an (optional) ",
         EDITERROR: "Die Metadaten der Datei wurden aufgrund eines Fehlers nicht bearbeitet",
         OK: "Speichern",
         ERROR_SAVING: "Fehler beim Verarbeiten der Anforderung. Versuchen Sie es später erneut.",
         SUCCESS_SAVING: "Ihre Markierung wurde übergeben. In Kürze prüft sie ein Moderator.",
         TITLE: "Dieses Element als unzulässig markieren",
         COMMENT: {
            TITLE: "Diesen Kommentar als unzulässig markieren",
            A11Y: "Diese Schaltfläche öffnet ein Dialogfenster, in dem der Benutzer diesen Kommentar als unzulässig markieren kann."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Abbrechen",
      DIALOG_TITLE: "Kommentar löschen",
      NAME: "Kommentar löschen",
      OK: "OK",
      TOOLTIP: "Kommentar löschen"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Abbrechen",
      CONFIRM: "Beim Kürzen wird der Text, der den Kommentargrenzwert überschreitet, entfernt.  Klicken Sie auf 'OK', um den Kommentar selbst zu kürzen, oder auf 'Abbrechen', um ihn selbst zu bearbeiten.",
      DIALOG_TITLE: "Kommentar kürzen",
      NAME: "Kommentar kürzen",
      OK: "OK",
      TOOLTIP: "Kommentar kürzen"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Übergabebestätigung",
      CONFIRM: "Ihr Kommentar wurde zur Überprüfung übergeben und ist nach der Genehmigung verfügbar.",
      OK: "OK"
   },

   DATE: {
      AM: "vormittags",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "nachmittags",
      TODAY: "heute",
      TODAY_U: "Heute",
      YESTERDAY: "gestern",
      YESTERDAY_U: "Gestern",

      ADDED: { DAY: "${EEee} hinzugefügt am ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Hinzugefügt am ${date_long}",
         TODAY: "Heute hinzugefügt um ${time}",
         YEAR: "Hinzugefügt am ${date_long}",
         YESTERDAY: "Gestern hinzugefügt um ${time}"
      },

      LAST_UPDATED: { DAY: "${EEee} zuletzt aktualisiert am ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Zuletzt aktualisiert am ${date_long}",
         TODAY: "Zuletzt aktualisiert heute um ${time}",
         YEAR: "Zuletzt aktualisiert am ${date_long}",
         YESTERDAY: "Zuletzt aktualisiert gestern um ${time}"
      },

      MONTHS_ABBR: { 0: "JAN",
         10: "NOV",
         11: "DEZ",
         1: "FEB",
         2: "MÄR",
         3: "APR",
         4: "MAI",
         5: "JUN",
         6: "JUL",
         7: "AUG",
         8: "SEP",
         9: "OKT"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Heute",
         YEAR: "${date_short}",
         YESTERDAY: "Gestern",
         TOMORROW: "Morgen"
      },

      RELATIVE_TIME: { DAY: "${EEee} bei ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Heute um ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Gestern um ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} bei ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Heute um ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Gestern um ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} bei ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} bei ${time}",
         TODAY: "${date_short} bei ${time}",
         YEAR: "${date_short} bei ${time}",
         YESTERDAY: "${date_short} bei ${time}",
         TOMORROW: "${date_short} bei ${time}"
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

      UPDATED: { DAY: "${EEee} aktualisiert um ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Aktualisiert am ${date_long}",
         TODAY: "Heute aktualisiert um ${time}",
         YEAR: "Aktualisiert am ${date_long}",
         YESTERDAY: "Gestern aktualisiert um ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Versionsinformationen können nicht geladen werden.",
      ERROR_REQUEST_CANCELLED: "Die Anforderung wurde abgebrochen.",
      ERROR_REQUEST_TIMEOUT: "Es konnte keine Verbindung zum Server hergestellt werden.",
      ERROR_REQUEST_UNKNOWN: "Ein unbekannter Fehler ist aufgetreten. ",
      LOADING: "Ladevorgang läuft...",
      NO_VERSIONS: "Es sind keine Versionen vorhanden",
      INFO: "Version ${0} erstellt am ${1} von ",
      VERSION_NUMBER: "Version ${0} ",
      DELETED: "Gelöscht",
      DELETE_ALL: "Alle Versionen löschen vor Version",
      DELETE_VERSION_SINGLE: "Version ${0} löschen ",
      DELETEERROR: "Die Version wurde aufgrund eines Fehlers nicht gelöscht.",
      CREATE_VERSION: "Neue Version erstellen",
      CREATE_VERSION_TOOLTIP: "Version dieser Datei erstellen",
      REVERT_VERSION: "Version ${0} wiederherstellen",
      REVERT_DESCRIPTION: "Wiederhergestellt aus Version ${0}",
      PREVIOUS: "Zurück",
      PREVIOUS_TOOLTIP: "Vorherige Seite",
      ELLIPSIS: "...",
      NEXT: "Weiter",
      NEXT_TOOLTIP: "Nächste Seite",
      COUNT: "${0}-${1} von ${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "Seite ",
      SHOW: "Anzeigen ",
      ITEMS_PER_PAGE: " Elemente pro Seite.",
      DATE: {
        AM: "vormittags",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Heute um ${time}",
            YESTERDAY: "Gestern um ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} bei ${time}",
            YEAR: "${date_short} bei ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} bei ${time}",
            TODAY: "heute um ${time}",
            YESTERDAY: "gestern um ${time}"
        },
        UPDATED: { DAY: "${EEee} aktualisiert um ${time}",
            YEAR: "Aktualisiert am ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Aktualisiert am ${date_short}",
            TODAY: "Heute aktualisiert um ${time}",
            YESTERDAY: "Gestern aktualisiert um ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Version ${0} löschen ",
         DOWNLOAD: "Herunterladen ",
         DOWNLOAD_TOOLTIP: "Diese Version herunterladen (${0})",
         VIEW: "Anzeigen",
         VIEW_TOOLTIP: "Version ${0} anzeigen ",
         REVERT: {
            A11Y: "Mit dieser Schaltfläche wird ein Dialogfenster geöffnet, in dem der Benutzer die Wiederherstellung einer Datei aus einer vorherigen Version bestätigen kann. Durch Bestätigen dieser Aktion wird der Inhalt der Seite aktualisiert. ",
            FULL: "Wiederherstellen ",
            WIDGET: "Diese Version wiederherstellen"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Die Version konnte nicht gelöscht werden, weil sie bereits gelöscht wurde oder nicht mehr für Sie sichtbar ist.",
         ERROR_ACCESS_DENIED: "Die Version konnte nicht gelöscht werden, weil Sie kein Bearbeiter sind.",
         ERROR_TIMEOUT: "Die Version wurde nicht gelöscht, da keine Verbindung zum Server hergestellt werden konnte. Klicken Sie erneut auf 'Löschen', um Ihre Anforderung zu wiederholen.",
         ERROR_CANCEL: "Die Version wurde nicht gelöscht, weil die Anforderung abgebrochen wurde. Klicken Sie erneut auf 'Löschen', um Ihre Anforderung zu wiederholen.",
         ERROR_NOT_LOGGED_IN: "Sie müssen angemeldet sein, um diese Version löschen zu können. Klicken Sie auf 'Löschen', damit eine Anmeldeaufforderung angezeigt wird.",
         GENERIC_ERROR: "Die Version konnte aufgrund eines unbekannten Fehlers nicht gelöscht werden. Klicken Sie erneut auf 'Löschen', um Ihre Anforderung zu wiederholen.",
         FULL: "Löschen",
         A11Y: "Mit dieser Schaltfläche wird ein Dialogfenster geöffnet, mit dessen Hilfe der Benutzer das Löschen dieser Version bestätigen kann. Durch Bestätigen dieser Aktion wird der Inhalt der Seite aktualisiert. "
      },

      REVERT: {
         ERROR_NOT_FOUND: "Die Version konnte nicht wiederhergestellt werden, weil sie gelöscht wurde oder für Sie nicht mehr sichtbar ist. ",
         ERROR_ACCESS_DENIED: "Die Version konnte nicht wiederhergestellt werden, weil Sie kein Bearbeiter sind.",
         ERROR_NAME_EXISTS: "Die Version konnte nicht wiederhergestellt werden, weil eine andere Datei mit demselben Namen vorhanden ist.",
         ERROR_TIMEOUT: "Die Version wurde nicht wiederhergestellt, weil keine Verbindung zum Server hergestellt werden konnte.  Klicken Sie erneut auf 'Wiederherstellen', um Ihre Anforderung zu wiederholen.",
         ERROR_CANCEL: "Die Version wurde nicht wiederhergestellt, weil die Anforderung abgebrochen wurde. Klicken Sie erneut auf 'Wiederherstellen', um Ihre Anforderung zu wiederholen.",
         ERROR_QUOTA_VIOLATION: "Die Version konnte aufgrund von Speicherplatzeinschränkungen nicht wiederhergestellt werden.",
         ERROR_MAX_CONTENT_SIZE: "Die Version konnte nicht wieder hergestellt werden, weil sie die maximal zulässige Dateigröße von ${0} überschreitet. ",
         GENERIC_ERROR: "Die Version konnte aufgrund eines unbekannten Fehlers nicht wiederhergestellt werden.  Klicken Sie erneut auf 'Wiederherstellen', um Ihre Anforderung zu wiederholen."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Personen, die heruntergeladen haben...",
      PREVIOUS: "Zurück",
      PREVIOUS_TOOLTIP: "Vorherige Seite",
      ELLIPSIS: "...",
      NEXT: "Weiter",
      NEXT_TOOLTIP: "Nächste Seite",
      COUNT: "${0}-${1} von ${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "Seite ",
      SHOW: "Anzeigen ",
      ITEMS_PER_PAGE: " Elemente pro Seite.",
      VERSION: {
         DAY: "Version ${version} am ${date}",
         MONTH: "Version ${version} am ${date}",
         TODAY: "Version ${version} um ${time}",
         YEAR: "Version ${version} am ${date}",
         YESTERDAY: "Version ${version} gestern "
      },

      FILE: {
         V_LATEST: "Sie haben die aktuellste Version dieser Datei heruntergeladen. ",
         V_OLDER: "Sie haben zuletzt Version ${0} dieser Datei heruntergeladen. ",
         LOADING: "Ladevorgang läuft...",
         EMPTY: "Nur anonyme Benutzer",
         ERROR: "Downloadinformation können nicht geladen werden"
      }
   },

   EE_DIALOG: {
      ERROR: "Fehler",
      ERROR_ALT_TEXT: "Fehler:",
      ERROR_MSG_GENERIC: "Es ist ein Fehler aufgetreten. Versuchen Sie es erneut.",
      ERROR_MSG_NOT_AVAILABLE: "Dieses Element wurde gelöscht oder ist nicht mehr verfügbar. ",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Der Inhalt für dieses Element ist nicht verfügbar.",
      ERROR_MSG_NO_ACCESS: "Sie haben keinen Zugriff mehr auf dieses Element. ",
      LOADING: "Ladevorgang läuft...",
      TITLE_SU: "${author} hat eine Nachricht veröffentlicht.",
      TITLE_NI: "${author} hat Sie zur Teilnahme am eigenen Netzwerk eingeladen.",
      AUTHOR_TITLE: "Profil für ${author} anzeigen",
      OPEN_LINK: "${title} öffnen",
      CONFIRM_CLOSE_TITLE: "Bestätigen",
      CONFIRM_CLOSE_MESSAGE: "Möchten Sie Ihre Änderungen wirklich verwerfen? Klicken Sie auf 'OK', um die Änderungen zu verwerfen, oder auf 'Abbrechen', um zurückzukehren.",
      OK: "OK",
      CANCEL: "Abbrechen"
   },
   MESSAGE: {
      SUCCESS: "Bestätigung",
      ERROR: "Fehler",
      ERROR_ALT_TEXT: "Fehler:",
      INFO: "Information ",
      WARNING: "Warnung ",
      DISMISS: "Diese Nachricht ausblenden",
      MORE_DETAILS: "Mehr Details",
      HIDE_DETAILS: "Details ausblenden"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Erstellt: ${EEEE} um ${time}",
           MONTH: "Erstellt: ${MMM} ${d}",
           TODAY: "Erstellt: Heute um ${time}",
           YEAR: "Erstellt: ${MMM} ${d} ${YYYY}",
           YESTERDAY: "Erstellt: Gestern um ${time}",
           TOMORROW: "Erstellt: ${MMM} ${d} ${YYYY}"
       },
      error: "Es ist ein Fehler aufgetreten. ${again}.",
      error_again: "Versuchen Sie es erneut. ",
      error_404: "Die Statusaktualisierung ist nicht mehr vorhanden. ",
      notifications: {
         STATUS_UPDATE: "${user} hat eine Nachricht veröffentlicht",
         USER_BOARD_POST: "${user} hat an Ihr Board geschrieben",
         POST_COMMENT: "${user} schrieb: "
      }
   },
   login: {
      error: "Ihr Benutzername und/oder Ihr Kennwort stimmen mit keinem vorhandenen Konto überein. Versuchen Sie es erneut.",
      logIn: "Anmelden",
      password: "Kennwort:",
      user: "Benutzername: ",
      welcome: "Bei HCL Connections anmelden "
   },
   repost: {
      name: "Erneut veröffentlichen",
      title: "Diese Aktualisierung erneut für die Personen, die mir folgen, oder für Communitys veröffentlichen",
      msg_success: "Die Aktualisierung wurde erfolgreich für die Personen, die Ihnen folgen, veröffentlicht. ",
      msg_generic: "Es ist ein Fehler aufgetreten. Versuchen Sie es erneut."
   },
   FILE_SHARE_INFO: {
      ADD: "Hinzufügen",
      ADD_TXT: "Personen oder Communitys als Benutzer mit Leseberechtigung hinzufügen ",
      SHOW_MORE: "Erweitern...",
      READER_IF_PUBLIC: "Jeder (öffentlich) ",
      READER_IF_PUBLIC_TOOLTIP: "Diese Datei ist öffentlich und wird mit allen geteilt.",
      EMPTY_READERS: "Keine",
      READERS_LABEL: "Leser: ",
      EDITORS_LABEL: "Bearbeiter: ",
      OWNER_LABEL: "Eigentümer:",
      ERROR: "Informationen zum Teilen können nicht geladen werden",
      ERROR_NOT_FOUND: "Die von Ihnen angeforderte Datei wurde gelöscht oder verschoben. Wenn Ihnen dieser Link gesendet wurde, überprüfen Sie, ob er richtig ist. ",
      ERROR_ACCESS_DENIED: "Sie sind nicht zum Anzeigen dieser Datei berechtigt. Die Datei ist nicht öffentlich und wird nicht mit Ihnen geteilt.",
      SHARE: "Teilen ",
      CANCEL: "Abbrechen",
      SHARE_WITH: "Teilen mit: ",
      PERSON: "eine Person",
      COMMUNITY: "eine Community",
      PLACEHOLDER: "Name oder E-Mail-Adresse einer Person... ",
      MESSAGE: "Nachricht:",
      MESSAGE_TXT: "Optionale Nachricht hinzufügen",
      REMOVE_ITEM_ALT: "${0} entfernen ",
      NO_MEMBERS: "Keine",
      A11Y_READER_ADDED: "${0} als Leser ausgewählt ",
      A11Y_READER_REMOVED: "${0} als Leser entfernt ",
      SELF_REFERENCE_ERROR: "Sie können diese Datei nicht mit sich selbst teilen. ",
      OWNER_REFERENCE_ERROR: "Sie können die Datei nicht mit dem Eigentümer der Datei teilen.",
      SHARE_COMMUNITY_WARN: "Durch Teilen dieser Datei mit der öffentlichen Community '${0}' wird die Datei öffentlich. ",
      SELECT_USER_ERROR: "Sie müssen mindestens eine Person oder Community auswählen, mit der die Datei geteilt werden soll. ",
      WARN_LONG_MESSAGE: "Die Nachricht ist zu lang.",
      TRIM_LONG_MESSAGE: "Nachricht kürzen?",
      ERROR_SHARING: "Die Datei konnte nicht geteilt werden.  Versuchen Sie es später erneut.",
      INFO_SUCCESS: "Die Datei wurde erfolgreich geteilt. ",
      MAX_SHARES_ERROR: "Die maximale Anzahl an geteilten Dateien wurde überschritten.",
      NOT_LOGGED_IN_ERROR: "Die Datei wurde nicht geteilt, weil Sie nicht angemeldet waren. Klicken Sie auf 'Teilen', um die Datei zu teilen. ",
      TIMEOUT_ERROR: "Die Datei wurde nicht geteilt, weil keine Verbindung zum Server hergestellt werden konnte.  Klicken Sie auf 'Teilen', um es erneut zu versuchen.",
      CANCEL_ERROR: "Die Datei wurde nicht geteilt, da die Anforderung abgebrochen wurde. Klicken Sie auf 'Teilen', um es erneut zu versuchen.",
      NOT_FOUND_ERROR: "Die Datei wurde gelöscht oder wird Ihnen nicht mehr angezeigt und kann daher nicht geteilt werden.",
      ACCESS_DENIED_ERROR: "Sie sind zum Teilen dieser Datei nicht mehr berechtigt.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Eine eingeschränkte Datei kann nicht öffentlich gemacht werden. ",
      TOOLTIP: "Diese Datei mit anderen Personen teilen "
   },
   HISTORY: {
      TAB_TITLE: "Neuigkeiten ",
      NO_HISTORY: "Es gibt keine Neuigkeiten.",
      EMPTY: "Für dieses Element konnten keine Neuigkeiten abgerufen werden. Es wurde gelöscht oder Sie haben keinen Zugriff mehr darauf.",
      MORE: "Vorherige Aktualisierungen anzeigen",
      ERROR_ALT: "Fehler",
      ERROR: "Beim Abrufen der Aktualisierungen ist ein Fehler aufgetreten. ${again}",
      ERROR_ADDTL: "Beim Abrufen zusätzlicher Aktualisierungen ist ein Fehler aufgetreten. ${again}",
      ERROR_AGAIN: "Versuchen Sie es erneut.",
      ERROR_AGAIN_TITLE: "Wiederholen Sie die Anforderung für weitere Aktualisierungen.",
      PROFILE_TITLE: "Öffnen Sie das Profil von ${user}.",
      SORT_BY: "Sortieren nach\\:",
      SORTS: {
         DATE: "Datum",
         DATE_TOOLTIP: "Vom letzten Element bis zu den letzten Aktualisierungen sortieren ",
         DATE_TOOLTIP_REVERSE: "Vom ältesten Element bis zu den letzten Aktualisierungen sortieren "
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} bei ${time}",
             MONTH: "${MMM} ${d}",
             TODAY: "Heute um ${time}",
             YEAR: "${MMM} ${d}, ${YYYY}",
             YESTERDAY: "Gestern um ${time}",
             TOMORROW: "${MMM} ${d}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Dieser Kommentar",
	   REPLY_ACTION: "Antwort",
       REPLY_ACTION_TOOLTIP: "Auf diesen Kommentar antworten"
   },
   OAUTH: {
      welcomeHeader: "Willkommen bei Connections",
      continueBtnLabel: "Weiter",
      continueBtnA11y: "Durch Aktivierung dieses Links wird ein neues Fenster geöffnet, in dem Sie Connections den Zugriff ermöglichen können. ",
      clickHere: "Klicken Sie hier",
      infoMsg: "Connections braucht Ihre Genehmigung, um auf Ihre Daten zuzugreifen. ",
      authorizeGadget: "${clickHere}, um diese Anwendung zum Zugriff auf Ihre Connections-Informationen zu autorisieren.",
      confirmAuthorization: "${clickHere}, um zu bestätigen, dass Sie diese Anwendung zum Zugriff auf Ihre Connections-Informationen autorisiert haben."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Durch Aktivierung dieses Links wird ein neues Fenster geöffnet, in dem Sie die Berechtigung für den Zugriff auf das Connections-Bibliotheksrepository erteilen können. ",
      infoMsg: "Das Connections-Bibliotheksrepository braucht Ihre Genehmigung, um auf Ihre Daten zuzugreifen. ",
      authorizeGadget: "${clickHere}, um diese Anwendung zum Zugriff auf die Informationen im Connections-Bibliotheksrepository zu autorisieren.",
      confirmAuthorization: "${clickHere}, um zu bestätigen, dass Sie diese Anwendung zum Zugriff auf die Informationen im Connections-Bibliotheksrepository autorisiert haben."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Abbrechen",
      CONFIRM: "Möchten Sie Ihre Änderungen wirklich verwerfen? Klicken Sie auf 'OK', um die Änderungen zu verwerfen, oder auf 'Abbrechen', um zurückzukehren.",
      DIALOG_TITLE: "Bestätigen",
      NAME: "Bestätigen",
      OK: "OK",
      TOOLTIP: "Bestätigen"
   }
})
