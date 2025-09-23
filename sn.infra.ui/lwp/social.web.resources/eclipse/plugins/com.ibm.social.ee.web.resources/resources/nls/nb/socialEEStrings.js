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
         label: "Mer",
         tooltip: "Flere handlinger"
       },
       tags_more: "og ${0} til",
       ERROR_ALT: "Feil",
       PERSON_TITLE: "Åpne profilen for ${user}.",
       inactiveUser: "${user} (inaktiv)",
       inactiveIndicator: "(inaktiv)",
       like_error: "Din Liker kunne ikke lagres. Prøv igjen senere.",
       vote_error: "Stemmen kunne ikke lagres. Prøv igjen senere."
   },
   generic: {
      untitled: "(Uten tittel)",
      tags: "Tagger:",
      tags_more: "og ${0} til",
      likes: "Liker",
      comments: "Kommentarer",
      titleTooltip: "Naviger til ${app}",
      error: "Kan ikke hente data.",
      timestamp: {
         created: {
            DAY: "Opprettet ${EEEE} klokken ${time}",
            MONTH: "Opprettet ${d}. ${MMM}",
            TODAY: "Opprettet i dag klokken ${time}",
            YEAR: "Opprettet ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "Opprettet i går klokken ${time}",
            TOMORROW: "Opprettet ${d}. ${MMM}, ${YYYY}"
         },
         updated: {
            DAY: "Oppdatert ${EEEE} klokken ${time}",
            MONTH: "Oppdatert ${d}. ${MMM}",
            TODAY: "Oppdatert i dag klokken ${time}",
            YEAR: "Oppdatert ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "Oppdatert i går klokken ${time}",
            TOMORROW: "Oppdatert ${d}. ${MMM}, ${YYYY}"
         }
      },
      visibility: {
         pub: "Felles",
         priv: "Privat"
      },
      action: {
         created: "Opprettet",
         updated: "Oppdatert"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Motta oppdateringer om personer du følger, på hjemmesiden og i et e-postsammendrag.",
      profile_title: "Åpne profilen for ${user}.",
      profile_a11y: "Hvis du aktiverer denne koblingen, åpner du profilen for ${user} i et nytt vindu.",
      error: "Det oppstod en feil.  ${again}.",
      error_again: "Prøv igjen",
      error_404: "Nettverksforespørselen finnes ikke lenger.",
      warning: "Advarsel",
      messages: {
         success: {
            accept: {
            	nofollow: "Dere er nå nettverkskontakter.",
            	follow: "Dere er nå nettverkskontakter og følger ${user}."
            },
            ignore: {
            	nofollow: "Du har ignorert invitasjonen.",
            	follow: "Du har ignorert invitasjonen, men følger nå ${user}."
            }
         },
         error: {
            accept: "Det oppstod en feil da forespørselen skulle godtas.",
            ignore: "Det oppstod en feil da forespørselen skulle ignoreres."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} klokken ${time}",
              MONTH: "${d}. ${MMM}",
              TODAY: "I dag klokken ${time}",
              YEAR: "${d}. ${MMM}, ${YYYY}",
              YESTERDAY: "I går klokken ${time}",
              TOMORROW: "${d}. ${MMM}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Hvis du aktiverer denne koblingen, åpner du ${name} i et nytt vindu.",
      tooltip: "Åpne ${name} i applikasjonen Filer.",
      profile_title: "Åpne profilen for ${user}.",
      profile_a11y: "Hvis du aktiverer denne koblingen, åpner du profilen for ${user} i et nytt vindu.",
      download_tooltip: "Last ned denne filen (${0})",
      following: {
         add: "Følg fil",
         remove: "Ikke følg lenger",
         title: "Veksle mellom å motta oppdateringer om denne filen eller ikke"
      },
      share: {
         label: "Del",
         title: "Gi andre tilgang til denne filen"
      },
      timestamp: {
         created: {
            DAY: "Opprettet ${EEEE} klokken ${time}",
            MONTH: "Opprettet ${d}. ${MMM}",
            TODAY: "Opprettet i dag klokken ${time}",
            YEAR: "Opprettet ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "Opprettet i går klokken ${time}",
            TOMORROW: "Opprettet ${d}. ${MMM}, ${YYYY}"
         },
         createdOther: {
            DAY: "${user} opprettet ${EEEE} klokken ${time}",
            MONTH: "${user} opprettet den ${d}. ${MMM}",
            TODAY: "${user} opprettet i dag klokken ${time}",
            YEAR: "${user} opprettet ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "${user} opprettet i går klokken ${time}",
            TOMORROW: "${user} opprettet ${d}. ${MMM}, ${YYYY}"
         },
         updated: {
            DAY: "Oppdatert ${EEEE} klokken ${time}",
            MONTH: "Oppdatert ${d}. ${MMM}",
            TODAY: "Oppdatert i dag klokken ${time}",
            YEAR: "Oppdatert ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "Oppdatert i går klokken ${time}",
            TOMORROW: "Oppdatert ${d}. ${MMM}, ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} oppdatert ${EEEE} klokken ${time}",
            MONTH: "${user} oppdatert den ${d}. ${MMM}",
            TODAY: "${user} oppdatert i dag klokken ${time}",
            YEAR: "${user} oppdatert ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "${user} oppdatert i går klokken ${time}",
            TOMORROW: "${user} oppdatert ${d}. ${MMM}, ${YYYY}"
         },
         createdCompact: {
            DAY: "Opprettet: ${EEEE} klokken ${time}",
            MONTH: "Opprettet: ${d}. ${MMM}",
            TODAY: "Opprettet: I dag klokken ${time}",
            YEAR: "Opprettet: ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "Opprettet: I går klokken ${time}",
            TOMORROW: "Opprettet: ${d}. ${MMM}, ${YYYY}"
         },
         updatedCompact: {
            DAY: "Oppdatert: ${EEEE} klokken ${time}",
            MONTH: "Oppdatert: ${d}. ${MMM}",
            TODAY: "Oppdatert: I dag klokken ${time}",
            YEAR: "Oppdatert: ${d}. ${MMM}, ${YYYY}",
            YESTERDAY: "Oppdatert: I går klokken ${time}",
            TOMORROW: "Oppdatert: ${d}. ${MMM}, ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} av ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} av ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Last ned denne filen (${size})",
      	 DOWNLOAD_ALT: "Last ned"
      },

      PREVIEW: {
         LINK: "Forhåndsvis",
         TITLE: "Forhåndsvis denne filen i et nytt vindu."
      },
      TAGS: "Tagger:",
      error: "Det oppstod en feil.  ${again}.",
      error_again: "Prøv igjen",
      error_404: "Filen finnes ikke lenger, eller du har ikke tillatelser som gir deg tilgang til den.",
      error_403: "Du har ikke tillatelse til å vise denne filen. Filen er ikke felles, og den er ikke delt med deg.",
      notifications: {
         USER_SHARED: "${user} skrev:",
         CHANGE_SUMMARY: "${user} laget endringssammendrag",
         NO_CHANGE_SUMMARY: "${user} laget ikke endringssammendrag",
         COMMENTED: "${user} kommenterte"
      }
   },
   ecm_file: {
      checkedout_you: "Sjekket ut av deg",
      checkedout_other: "Sjekket ut av ${user}",
      tooltip: "Åpne filen ${name} i biblioteket",
      draft_404_info: "Utkastet er slettet eller deles ikke lenger med deg. Den publiserte versjonen er nå den nyeste versjonen av denne filen.",
      error_404: "Filen er slettet eller deles ikke lenger med deg.",
      error_403: "Filen er slettet eller deles ikke lenger med deg.",
      error_preview: "Filen er ikke lenger tilgjengelig for forhåndsvisning.",
      draft_review_canceled: "Gjennomgangen ble avbrutt, og utkastet deles ikke lenger med deg. Du er ikke lenger bedt om å se gjennom utkastet.",
      switch_ee: "Vis utkast",
      switch_ee_tooltip: "Vis det nyeste utkastet for denne filen"
   },
   ecm_draft: {
      tooltip: "Åpne utkastet ${name} i biblioteket",
      community_owners: "Fellesskapseiere",
      draft: "Utkast",
      draft_tooltip: "Viser utkast",
      draft_general_info: "Det forrige utkastet finnes ikke lenger, og et nyere utkast er nå den nyeste versjonen.",
      draft_review_404_general_info: "En av godkjennerne har allerede stemt. Du er ikke lenger bedt om å se gjennom dette utkastet.",
      draft_review_404_request_info: "Det forrige utkastet finnes ikke lenger, og det nyeste utkastet er sendt til gjennomgang. Du er bedt om å se gjennom utkastet.",
      draft_review_404_require_info: "Det forrige utkastet finnes ikke lenger, og det nyeste utkastet er sendt til gjennomgang. Du må se gjennom utkastet.",
      draft_review_request_info: "Du er bedt om å se gjennom utkastet.",
      draft_review_require_info: "Du må se gjennom utkastet.",
      error_404: "Utkastet er slettet eller deles ikke lenger med deg.",
      error_403: "Du kan ikke vise dette utkastet fordi det ikke er delt med deg.",
      error_preview: "Utkastet er ikke lenger tilgjengelig for forhåndsvisning.",
      switch_ee: "Vis publisert versjon",
      switch_ee_tooltip: "Vis publisert versjon av denne filen",
      review: "Gjennomgang",
      reviewers: "Godkjennere",
      reviwers_addtl: "Ekstra godkjennere",
      in_review: "Utkast til gjennomgang",
      in_review_tooltip: "Viser utkast til gjennomgang",
      review_required_any: "Fellesskapseiere krever at en godkjenner gjennomgår dette utkastet.",
      review_required_all: "Fellesskapseiere krever at alle godkjennere gjennomgår dette utkastet.",
      review_required_generic: "Fellesskapseiere krever at disse godkjennerne gjennomgår dette utkastet.",
      review_additional_required: "Alle godkjennere som er lagt til av den som sendte utkastet, må gjennomgå dette utkastet.",
      reivew_submitted_date: {
         DAY: "${user} sendte utkastet til gjennomgang ${EEEE} klokken ${time}.",
         MONTH: "${user} sendte utkastet til gjennomgang ${MMM} ${d}.",
         TODAY: "${user} sendte utkastet til gjennomgang i dag klokken ${time}.",
         YEAR: "${user} sendte utkastet til gjennomgang ${d}. ${MMM} ${YYYY}.",
         YESTERDAY: "${user} sendte utkastet til gjennomgang i går klokken ${time}.",
         TOMORROW: "${user} sendte utkastet til gjennomgang ${d}. ${MMM} ${YYYY}."
      },
      pending: "Venter",
      pending_rejected: "Gjennomgang ikke lenger nødvendig fordi utkastet ble forkastet",
      approve: "Godkjenn",
      approved: "Godkjent",
      approve_tooltip: "Godkjenn dette utkastet",
      accept_success: "Du har godkjent dette utkastet.",
      accept_error: "Det oppstod en feil da utkastet skulle godkjennes. Prøv igjen.",
      accept_info: "Du godkjente dette utkastet.",
      reject: "Forkast",
      rejected: "Forkastet",
      reject_tooltip: "Forkast dette utkastet",
      reject_success: "Du har forkastet dette utkastet.",
      reject_error: "Det oppstod en feil da utkastet skulle forkastes. Prøv igjen.",
      reject_info: "Du forkastet dette utkastet."
   },
   authUser: {
      error: "Det oppstod en feil ved henting av gjeldende bruker.  ${again}.",
      error_again: "Prøv igjen",
      error_404: "Finner ikke autentisert bruker.",
      error_403: "Du har ikke tillatelse til å hente brukerinformasjon."
   },
   forum: {
      error: "Det oppstod en feil.  ${again}.",
      error_again: "Prøv igjen",
      error_404: "Forumet finnes ikke lenger, eller du har ikke tillatelser som gir deg tilgang til det.",
      error_403: "Du har ikke tillatelse til å se på dette forumet. Forumet er ikke felles, og det er ikke delt med deg.",

      readMore: "Vis fullstendig emne...",
      readMore_tooltip: "Åpne forumemnet ${name}.",
      readMore_a11y: "Hvis du aktiverer denne koblingen, åpner du forumemnet ${name} i et nytt vindu.",
      QUESTION_ANSWERED: "Spørsmålet er besvart.",
      QUESTION_NOT_ANSWERED: "Spørsmålet er ikke besvart ennå.",

      attachments: "${count} vedlegg",
      attachments_one: "${count} vedlegg"
   },
   blog: {
      error: "Det oppstod en feil.  ${again}.",
      error_again: "Prøv igjen",
      error_404: "Bloggen finnes ikke lenger, eller du har ikke tillatelser som gir deg tilgang til den.",
      error_403: "Du har ikke tillatelse til å se på denne bloggen. Bloggen er ikke felles, og den er ikke delt med deg.",
      readMore: " Les mer ...",
      readMore_tooltip: "Åpne blogginnlegget ${name}.",
      readMore_a11y: "Hvis du aktiverer denne koblingen, åpner du blogginnlegget ${name} i et nytt vindu.",
      graduated: "Forfremmet",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Stem</a>",
  					TOOLTIP: 	"Stem på dette"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Stemt</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Stemt</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Angre</a>",
  					TOOLTIP: 	"Fjern stemmen din fra dette"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 personer stemte på dette"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 person stemte på dette"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} stemte på dette"
  				}
  			},
  			LOADING: "Laster inn...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Stemt"
  			}
  		}
   },
   idea: {
	  error_404: "Stemmen din kunne ikke lagres fordi du enten har nådd grensen for antall stemmer, eller fordi ideen ikke lenger er tilgjengelig for deg.",
      readMore_tooltip: "Åpne ideen ${name}.",
      readMore_a11y: "Hvis du aktiverer denne koblingen, åpner du ideen ${name} i et nytt vindu."
   },
   size: {
      B: "${0} byte",
      KB: "${0} kB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "Svar",
      THIS_ARIA_LABEL: "Dette svaret",
      THIS_TAB_TITLE: "Dette svaret",
      TAB_TITLE: "Svar (${0})",
      REPLY_TO_REPLY: "Som svar på ${thisReply}",
      REPLY_TO_TOPIC: "Som svar på ${thisTopic}",
      THIS_TOPIC: "dette emnet",
      THIS_REPLY: "dette svaret",
      NAVIGATE_TO_REPLY: "Naviger til det overordnede svaret",
      NAVIGATE_TO_TOPIC: "Naviger til det overordnede emnet",
      ADD_COMMENT: "Svar på dette emnet",
      ADD_COMMENT_TOOLTIP: "Svar på dette forumemnet",
      SHOWING_RECENT_REPLIES: "Viser de ${0} nyeste svarene",
      PREV_COMMENTS: "Vis flere svar",
      PLACEHOLDER_TXT: "Svar på dette emnet",
      EMPTY: "Det er ingen svar.",
      TRIM_LONG_COMMENT: "Forkort svaret?",
      WARN_LONG_COMMENT: "Svaret er for langt.  ${shorten}",
      ERROR: "Det oppstod en feil ved henting av svarene. ${again}",
      ERROR_CREATE: "Svaret kunne ikke lagres.  Prøv igjen senere.",
      ERROR_CREATE_NOT_FOUND: "Svaret kunne ikke lagres fordi emnet er slettet eller ikke lenger er synlig for deg.",
      ERROR_CREATE_ACCESS_DENIED: "Svaret kunne ikke lagres fordi emnet er slettet eller ikke lenger er synlig for deg.",
      ERROR_CREATE_TIMEOUT: "Svaret kunne ikke lagres fordi det ikke var mulig å kontakte serveren.  Klikk på Lagre for å prøve igjen.",
      ERROR_CREATE_CANCEL: "Svaret kunne ikke lagres fordi forespørselen ble avbrutt.  Klikk på Lagre for å prøve igjen.",
      ERROR_CREATE_NOT_LOGGED_IN: "Du må være logget på for å kunne opprette dette svaret.  Klikk på Lagre for å få forespørsel om å logge på.",
      ERROR_NO_CONTENT: "Skriv svaret og klikk på Lagre.  Hvis du ikke vil svare likevel, klikker du på Avbryt.",
      ERROR_UNAUTHORIZED: "Svaret kunne ikke lagres fordi du ikke er autorisert for å legge inn et svar.",
      COMMENT_DELETED: {
         DAY: "Svar slettet av ${user} ${EEEE} klokken ${time}",
         MONTH: "Svar slettet av ${user} den ${d}. ${MMM}",
         TODAY: "Svar slettet av ${user} i dag klokken ${time}",
         YEAR: "Svar slettet av ${user} den ${d}. ${MMM}, ${YYYY}",
         YESTERDAY: "Svar slettet av ${user} i går klokken ${time}",
         TOMORROW: "Svar slettet av ${user} den ${d}. ${MMM}, ${YYYY}"
      },
      REASON_FOR_DELETION: "Årsak til sletting: ${reason}",
      REPLY_TITLE: "Ang: ${0}",
      SHOW_FULL_REPLY: "Vis fullstendig svar",
      SHOW_FULL_REPLY_TOOLTIP: "Naviger til det opprinnelige svaret i forumemnet",
      REPLY_ACTION: "Svar",
      REPLY_ACTION_TOOLTIP: "Svar på dette innlegget",
      MODERATION_PENDING: "Dette svaret venter på godkjennelse.",
      MODERATION_QUARANTINED: "Innlegget er satt i karantene av ordstyreren.",
      MODERATION_REMOVED: {
         DAY: "Dette svaret ble fjernet av ${user} den ${EEEE} klokken ${time}.",
         MONTH: "Dette svaret ble fjernet av ${user} den ${MMM} ${d}.",
         TODAY: "Dette svaret ble fjernet av ${user} i dag klokken ${time}.",
         YEAR: "Dette svaret ble fjernet av ${user} den ${d}. ${MMM}, ${YYYY}.",
         YESTERDAY: "Dette svaret ble fjernet av ${user} i går klokken ${time}.",
         TOMORROW: "Dette svaret ble fjernet av ${user} den ${d}. ${MMM}, ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Dette svaret ble forkastet av ${user} den ${EEEE} klokken ${time}.",
         MONTH: "Dette svaret ble forkastet av ${user} den ${d}. ${MMM}.",
         TODAY: "Dette svaret ble forkastet av ${user} i dag klokken ${time}.",
         YEAR: "Dette svaret ble forkastet av ${user} den ${d}. ${MMM}, ${YYYY}.",
         YESTERDAY: "Dette svaret ble forkastet av ${user} i går klokken ${time}.",
         TOMORROW: "Dette svaret ble forkastet av ${user} den ${d}. ${MMM}, ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Svaret ditt er sendt til gjennomgang og vil bli tilgjengelig når den er godkjent."
   },
   COMMENTS: {
      ARIA_LABEL: "Kommentarer",
      PLACEHOLDER_TXT: "Legg til en kommentar",
      TAB_TITLE: "Kommentarer (${0})",
      ACTION_NOT_SUPPORTED: "Ikke støttet handling",
      ADD_COMMENT: "Legg til en kommentar",
      ADD_COMMENT_TOOLTIP: "Legg til en kommentar for denne oppføringen",
      CANCEL: "Avbryt",
      COMMENT_COUNT_ONE: "${0} kommentar",
      COMMENT_COUNT_MANY: "${0} kommentarer",
      COMMENT_LABEL: "Kommentar:",
      DELETE: "Slett",
      DELETE_TOOLTIP: "Slett kommentar",
      DELETEREASON: "Årsaken til at denne kommentaren skal slettes:",
      DIALOG_TITLE: "Forkort kommentar",
      TOOLTIP: "Forkort kommentar",
      NAME: "Forkort kommentar",
      EDIT: "Rediger",
      EDIT_TOOLTIP: "Rediger kommentar",
      ERROR_CREATE: "Kommentaren kunne ikke lagres.  Prøv igjen senere.",
      ERROR_CREATE_NOT_FOUND: "Kommentaren kunne ikke lagres fordi elementet er slettet eller ikke lenger er synlig for deg.",
      ERROR_CREATE_ACCESS_DENIED: "Kommentaren kunne ikke lagres fordi elementet er slettet eller ikke lenger er synlig for deg.",
      ERROR_CREATE_TIMEOUT: "Kommentaren kunne ikke lagres fordi det ikke var mulig å kontakte serveren.  Klikk på Legg inn for å prøve igjen.",
      ERROR_CREATE_CANCEL: "Kommentaren kunne ikke lagres fordi forespørselen ble avbrutt.  Klikk på Legg inn for å prøve igjen.",
      ERROR_CREATE_NOT_LOGGED_IN: "Du må være logget på for å kunne opprette denne kommentaren.  Klikk på Legg inn for å få forespørsel om å logge på.",
      ERROR_DELETE: "Kommentaren kunne ikke slettes.  Prøv igjen senere.",
      ERROR_DELETE_TIMEOUT: "Kommentaren kunne ikke slettes fordi det ikke var mulig å kontakte serveren.  Klikk på Slett for å prøve igjen.",
      ERROR_DELETE_NOT_FOUND: "Kommentaren kunne ikke slettes fordi kommentaren eller elementet er slettet eller ikke lenger er synlig for deg.",
      ERROR_DELETE_ACCESS_DENIED: "Kommentaren kunne ikke slettes fordi elementet er slettet eller ikke lenger er synlig for deg.",
      ERROR_DELETE_CANCEL: "Kommentaren kunne ikke slettes fordi forespørselen ble avbrutt.  Klikk på Slett for å prøve igjen.",
      ERROR_DELETE_NOT_LOGGED_IN: "Du må være logget på for å kunne slette denne kommentaren.  Klikk på Slett for å få forespørsel om å logge på.",
      ERROR_EDIT: "Kommentaren kunne ikke oppdateres.  Prøv igjen senere.",
      ERROR_EDIT_ACCESS_DENIED: "Kommentaren kunne ikke oppdateres fordi elementet er slettet eller ikke lenger er synlig for deg.",
      ERROR_EDIT_NOT_FOUND: "Kommentaren kunne ikke oppdateres fordi elementet er slettet eller ikke lenger er synlig for deg.",
      ERROR_EDIT_TIMEOUT: "Kommentaren kunne ikke oppdateres fordi det ikke var mulig å kontakte serveren.  Klikk på Legg inn for å prøve igjen.",
      ERROR_EDIT_CANCEL: "Kommentaren kunne ikke oppdateres fordi forespørselen ble avbrutt.  Klikk på Legg inn for å prøve igjen.",
      ERROR_EDIT_NOT_LOGGED_IN: "Du må være logget på for å kunne redigere denne kommentaren.  Klikk på Legg inn for å få forespørsel om å logge på.",
      ERROR_NO_CONTENT: "Skriv inn kommentaren din og klikk på Legg inn.  Hvis du ikke vil lage en kommentar likevel, klikker du på Avbryt.",
      ERROR_NO_CONTENT_EDIT: "Skriv inn kommentaren din og klikk på Legg inn.  Hvis du ikke vil redigere kommentaren likevel, klikker du på Avbryt.",
      ERROR_UNAUTHORIZED: "Kommentaren kunne ikke lagres fordi du ikke er autorisert for å legge inn en kommentar.",
      ERROR_GENERAL: "Det har oppstått en feil.",
      OK: "OK",
      YES: "Ja",
      TRIM_LONG_COMMENT: "Forkort kommentar?",
      WARN_LONG_COMMENT: "Kommentaren er for lang.  ${shorten}",
      LINK: "Kobling",
      SAVE: "Lagre",
      POST: "Legg inn",
      SHOWMORE: "Les mer...",
      VIEW_COMMENTS_FILE: "Vis kommentarer til denne filen",
      SUBSCRIBE_TO_COMMENTS: "Abonner på disse kommentarene",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Følg endringene i disse kommentarene gjennom kanalleseren",
      PROFILE_TITLE: "Åpne profilen for ${user}.",
      PROFILE_A11Y: "Hvis du aktiverer denne koblingen, åpner du profilen for ${user} i et nytt vindu.",
      MODERATION_PENDING: "Denne kommentaren venter på godkjennelse.",
      MODERATION_REMOVED: {
         DAY: "Denne kommentaren ble fjernet av ${user} den ${EEEE} klokken ${time}.",
         MONTH: "Denne kommentaren ble fjernet av ${user} den ${d}. ${MMM}.",
         TODAY: "Denne kommentaren ble fjernet av ${user} i dag klokken ${time}.",
         YEAR: "Denne kommentaren ble fjernet av ${user} den ${d}. ${MMM}, ${YYYY}.",
         YESTERDAY: "Denne kommentaren ble fjernet av ${user} i går klokken ${time}.",
         TOMORROW: "Denne kommentaren ble fjernet av ${user} den ${d}. ${MMM}, ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Denne kommentaren ble forkastet av ${user} den ${EEEE} klokken ${time}.",
         MONTH: "Denne kommentaren ble forkastet av ${user} den ${d}. ${MMM}.",
         TODAY: "Denne kommentaren ble forkastet av ${user} i dag klokken ${time}.",
         YEAR: "Denne kommentaren ble forkastet av ${user} den ${d}. ${MMM}, ${YYYY}.",
         YESTERDAY: "Denne kommentaren ble forkastet av ${user} i går klokken ${time}.",
         TOMORROW: "Denne kommentaren ble forkastet av ${user} den ${d}. ${MMM}, ${YYYY}."
      },
      PREV_COMMENTS: "Vis tidligere kommentarer",
      EMPTY: "Det er ingen kommentarer.",
      ERROR_ALT: "Feil",
      ERROR: "Det oppstod en feil ved henting av kommentarene. ${again}",
      ERROR_ADDTL: "Det oppstod en feil ved henting av flere kommentarer. ${again}",
      ERROR_AGAIN: "Prøv igjen.",
      ERROR_AGAIN_TITLE: "Prøv forespørselen om flere kommentarer på nytt.",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} klokken ${time} (versjon ${version})",
         MONTH: "${user} ${d}. ${MMM} (versjon ${version})",
         TODAY: "${user} i dag klokken ${time} (versjon ${version})",
         YEAR: "${user} ${d}. ${MMM}, ${YYYY} (versjon ${version})",
         YESTERDAY: "${user} i går klokken ${time} (versjon ${version})",
         TOMORROW: "${user} ${d}. ${MMM}, ${YYYY} (versjon ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} klokken ${time}",
         MONTH: "${user} ${d}. ${MMM}",
         TODAY: "${user} i dag klokken ${time}",
         YEAR: "${user} ${d}. ${MMM}, ${YYYY}",
         YESTERDAY: "${user} i går klokken ${time}",
         TOMORROW: "${user} ${d}. ${MMM}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} klokken ${time}",
         MONTH: "${d}. ${MMM}",
         TODAY: "I dag klokken ${time}",
         YEAR: "${d}. ${MMM}, ${YYYY}",
         YESTERDAY: "I går klokken ${time}",
         TOMORROW: "${d}. ${MMM}, ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Kommentar slettet av ${user} ${EEEE} klokken ${time}",
         MONTH: "Kommentar slettet av ${user} den ${d}. ${MMM}",
         TODAY: "Kommentar slettet av ${user} i dag klokken ${time}",
         YEAR: "Kommentar slettet av ${user} den ${d}. ${MMM}, ${YYYY}",
         YESTERDAY: "Kommentar slettet av ${user} i går klokken ${time}",
         TOMORROW: "Kommentar slettet av ${user} den ${d}. ${MMM}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} redigerte ${EEEE} klokken ${time} (versjon ${version})",
         MONTH: "${user} redigerte ${d}. ${MMM} (versjon ${version})",
         TODAY: "${user} redigerte i dag klokken ${time} (versjon ${version})",
         YEAR: "${user} redigerte ${d}. ${MMM}, ${YYYY} (versjon ${version})",
         YESTERDAY: "${user} redigerte i går klokken ${time} (versjon ${version})",
         TOMORROW: "${user} redigerte ${d}. ${MMM}, ${YYYY} (versjon ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} redigerte ${EEEE} klokken ${time}",
         MONTH: "${user} redigerte ${d}. ${MMM}",
         TODAY: "${user} redigerte i dag klokken ${time}",
         YEAR: "${user} redigerte ${d}. ${MMM}, ${YYYY}",
         YESTERDAY: "${user} redigerte i går klokken ${time}",
         TOMORROW: "${user} redigerte ${d}. ${MMM}, ${YYYY}"
      },

      DELETE_CONFIRM: "Er du sikker på at du vil slette denne kommentaren?",
      FLAG_ITEM: {
         BUSY: "Lagrer...",
         CANCEL: "Avbryt",
         ACTION: "Merk som upassende",
         DESCRIPTION_LABEL: "Oppgi en årsak til at dette elementet er merket (valgfritt)",
         EDITERROR: "På grunn av en feil ble filens metadata ikke redigert",
         OK: "Lagre",
         ERROR_SAVING: "Det oppstod en feil under behandling av forespørselen. Prøv igjen senere.",
         SUCCESS_SAVING: "Merkingen din er sendt. En ordstyrer vil undersøke om kort tid.",
         TITLE: "Merk dette elementet som upassende",
         COMMENT: {
            TITLE: "Merk denne kommentaren som upassende",
            A11Y: "Denne knappen åpner en dialogboks der brukeren kan merke denne kommentaren som upassende."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Avbryt",
      DIALOG_TITLE: "Slett kommentar",
      NAME: "Slett kommentar",
      OK: "OK",
      TOOLTIP: "Slett kommentar"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Avbryt",
      CONFIRM: "Forkorting fjerner teksten som overskrider kommentargrensen.  Klikk på OK hvis du vil forkorte, eller på Avbryt hvis du vil redigere kommentaren selv.",
      DIALOG_TITLE: "Forkort kommentar",
      NAME: "Forkort kommentar",
      OK: "OK",
      TOOLTIP: "Forkort kommentar"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Bekreftelse av sending",
      CONFIRM: "Kommentaren din er sendt til gjennomgang og vil bli tilgjengelig når den er godkjent.",
      OK: "OK"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "PM",
      TODAY: "i dag",
      TODAY_U: "I dag",
      YESTERDAY: "i går",
      YESTERDAY_U: "I går",

      ADDED: { DAY: "Lagt til ${EEee} klokken ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Lagt til ${date_long}",
         TODAY: "Lagt til i dag klokken ${time}",
         YEAR: "Lagt til ${date_long}",
         YESTERDAY: "Lagt til i går klokken ${time}"
      },

      LAST_UPDATED: { DAY: "Sist oppdatert ${EEee} klokken ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Sist oppdatert ${date_long}",
         TODAY: "Sist oppdatert i dag klokken ${time}",
         YEAR: "Sist oppdatert ${date_long}",
         YESTERDAY: "Sist oppdatert i går klokken ${time}"
      },

      MONTHS_ABBR: { 0: "JAN",
         10: "NOV",
         11: "DES",
         1: "FEB",
         2: "MAR",
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
         TODAY: "I dag",
         YEAR: "${date_short}",
         YESTERDAY: "I går",
         TOMORROW: "I morgen"
      },

      RELATIVE_TIME: { DAY: "${EEee} klokken ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "I dag klokken ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "I går klokken ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} klokken ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "I dag klokken ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "I går klokken ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} klokken ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} klokken ${time}",
         TODAY: "${date_short} klokken ${time}",
         YEAR: "${date_short} klokken ${time}",
         YESTERDAY: "${date_short} klokken ${time}",
         TOMORROW: "${date_short} klokken ${time}"
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

      UPDATED: { DAY: "Oppdatert ${EEee} klokken ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Oppdatert ${date_long}",
         TODAY: "Oppdatert i dag klokken ${time}",
         YEAR: "Oppdatert ${date_long}",
         YESTERDAY: "Oppdatert i går klokken ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Kan ikke laste inn versjonsinformasjon.",
      ERROR_REQUEST_CANCELLED: "Forespørselen ble avbrutt.",
      ERROR_REQUEST_TIMEOUT: "Det var ikke mulig å kontakte serveren.",
      ERROR_REQUEST_UNKNOWN: "Det har oppstått en ukjent feil.",
      LOADING: "Laster inn..",
      NO_VERSIONS: "Det finnes ingen versjoner",
      INFO: "Versjon ${0} opprettet ${1} av ",
      VERSION_NUMBER: "Versjon ${0}",
      DELETED: "Slettet",
      DELETE_ALL: "Slett alle versjoner før versjon",
      DELETE_VERSION_SINGLE: "Slett versjon ${0}",
      DELETEERROR: "Versjonen ble ikke slettet på grunn av en feil.",
      CREATE_VERSION: "Opprett en ny versjon",
      CREATE_VERSION_TOOLTIP: "Opprett en versjon av denne filen",
      REVERT_VERSION: "Gjenopprett versjon ${0}",
      REVERT_DESCRIPTION: "Gjenopprettet fra versjon ${0}",
      PREVIOUS: "Forrige",
      PREVIOUS_TOOLTIP: "Forrige side",
      ELLIPSIS: "...",
      NEXT: "Neste",
      NEXT_TOOLTIP: "Neste side",
      COUNT: "${0} - ${1} av ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Side",
      SHOW: "Vis",
      ITEMS_PER_PAGE: " elementer per side.",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "I dag klokken ${time}",
            YESTERDAY: "I går klokken ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} klokken ${time}",
            YEAR: "${date_short} klokken ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} klokken ${time}",
            TODAY: "i dag klokken ${time}",
            YESTERDAY: "i går klokken ${time}"
        },
        UPDATED: { DAY: "Oppdatert ${EEee} klokken ${time}",
            YEAR: "Oppdatert ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Oppdatert ${date_short}",
            TODAY: "Oppdatert i dag klokken ${time}",
            YESTERDAY: "Oppdatert i går klokken ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Slett versjon ${0}",
         DOWNLOAD: "Last ned",
         DOWNLOAD_TOOLTIP: "Last ned denne versjonen (${0})",
         VIEW: "Vis",
         VIEW_TOOLTIP: "Oversikt versjon ${0}",
         REVERT: {
            A11Y: "Denne knappen åpner en dialogboks der brukeren kan bekrefte at filen skal gjenopprettes fra en tidligere versjon. Hvis du bekrefter denne handlingen, vil innholdet på siden bli oppdatert.",
            FULL: "Gjenopprett",
            WIDGET: "Gjenopprett denne versjonen"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Versjonen kunne ikke slettes fordi den allerede er slettet eller ikke lenger er synlig for deg.",
         ERROR_ACCESS_DENIED: "Versjonen kunne ikke slettes fordi du ikke er redigerer.",
         ERROR_TIMEOUT: "Versjonen ble ikke slettet fordi det ikke var mulig å kontakte serveren.  Klikk på Slett igjen for å prøve forespørselen på nytt.",
         ERROR_CANCEL: "Versjonen ble ikke slettet fordi forespørselen ble avbrutt.  Klikk på Slett igjen for å prøve forespørselen på nytt.",
         ERROR_NOT_LOGGED_IN: "Du må være logget på for å kunne slette denne versjonen.  Klikk på Slett for å få forespørsel om å logge på.",
         GENERIC_ERROR: "Versjonen kunne ikke slettes på grunn av en ukjent feil.  Klikk på Slett igjen for å prøve forespørselen på nytt.",
         FULL: "Slett",
         A11Y: "Denne knappen åpner en dialogboks der brukeren kan bekrefte slettingen av denne versjonen. Hvis du bekrefter denne handlingen, vil innholdet på siden bli oppdatert."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Versjonen kunne ikke gjenopprettes fordi den er slettet eller ikke lenger er synlig for deg.",
         ERROR_ACCESS_DENIED: "Versjonen kunne ikke gjenopprettes fordi du ikke er redigerer.",
         ERROR_NAME_EXISTS: "Versjonen kunne ikke gjenopprettes fordi en annen fil har samme navn.",
         ERROR_TIMEOUT: "Versjonen ble ikke gjenopprettet fordi det ikke var mulig å kontakte serveren.  Klikk på Gjenopprett igjen for å prøve forespørselen på nytt.",
         ERROR_CANCEL: "Versjonen ble ikke gjenopprettet fordi forespørselen ble avbrutt.  Klikk på Gjenopprett igjen for å prøve forespørselen på nytt.",
         ERROR_QUOTA_VIOLATION: "Versjonen kunne ikke gjenopprettes på grunn av plassbegrensninger.",
         ERROR_MAX_CONTENT_SIZE: "Versjonen kunne ikke gjenopprettes fordi den er større enn tillatt maksimal størrelse på filer på ${0}",
         GENERIC_ERROR: "Versjonen kunne ikke gjenopprettes på grunn av en ukjent feil.  Klikk på Gjenopprett igjen for å prøve forespørselen på nytt."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Se hvem som har lastet ned...",
      PREVIOUS: "Forrige",
      PREVIOUS_TOOLTIP: "Forrige side",
      ELLIPSIS: "...",
      NEXT: "Neste",
      NEXT_TOOLTIP: "Neste side",
      COUNT: "${0} - ${1} av ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Side",
      SHOW: "Vis",
      ITEMS_PER_PAGE: " elementer per side.",
      VERSION: {
         DAY: "Versjon ${version} ${date}",
         MONTH: "Versjon ${version} ${date}",
         TODAY: "Versjon ${version} klokken ${time}",
         YEAR: "Versjon ${version} ${date}",
         YESTERDAY: "Versjon ${version} i går"
      },

      FILE: {
         V_LATEST: "Du har lastet ned den nyeste versjonen av denne filen",
         V_OLDER: "Du lastet sist ned versjon ${0} av denne filen",
         LOADING: "Laster inn...",
         EMPTY: "Bare anonyme brukere",
         ERROR: "Kan ikke laste inn nedlastingsinformasjon"
      }
   },

   EE_DIALOG: {
      ERROR: "Feil",
      ERROR_ALT_TEXT: "Feil:",
      ERROR_MSG_GENERIC: "Noe gikk galt.  Prøv igjen.",
      ERROR_MSG_NOT_AVAILABLE: "Dette elementet er slettet eller er ikke lenger tilgjengelig.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Innholdet for dette elementet er ikke tilgjengelig.",
      ERROR_MSG_NO_ACCESS: "Du har ikke lenger tilgang til dette elementet.",
      LOADING: "Laster inn...",
      TITLE_SU: "${author} la inn en melding.",
      TITLE_NI: "${author} inviterte deg til å delta i nettverket sitt.",
      AUTHOR_TITLE: "Vis profil for ${author}",
      OPEN_LINK: "Åpne ${title}",
      CONFIRM_CLOSE_TITLE: "Bekreft",
      CONFIRM_CLOSE_MESSAGE: "Er du sikker på at du vil forkaste endringene? Klikk på OK for å fortsette eller på Avbryt for å gå tilbake.",
      OK: "OK",
      CANCEL: "Avbryt"
   },
   MESSAGE: {
      SUCCESS: "Bekreftelse",
      ERROR: "Feil",
      ERROR_ALT_TEXT: "Feil:",
      INFO: "Informasjon",
      WARNING: "Advarsel",
      DISMISS: "Skjul denne meldingen",
      MORE_DETAILS: "Flere detaljer",
      HIDE_DETAILS: "Skjul detaljer"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Opprettet: ${EEEE} klokken ${time}",
           MONTH: "Opprettet: ${d}. ${MMM}",
           TODAY: "Opprettet: I dag klokken ${time}",
           YEAR: "Opprettet: ${d}. ${MMM}, ${YYYY}",
           YESTERDAY: "Opprettet: I går klokken ${time}",
           TOMORROW: "Opprettet: ${d}. ${MMM}, ${YYYY}"
       },
      error: "Det oppstod en feil.  ${again}.",
      error_again: "Prøv igjen",
      error_404: "Statusoppdateringen finnes ikke lenger.",
      notifications: {
         STATUS_UPDATE: "${user} la inn en melding",
         USER_BOARD_POST: "${user} skrev på tavlen din",
         POST_COMMENT: "${user} skrev:"
      }
   },
   login: {
      error: "Brukernavnet og/eller passordet samsvarer ikke med noen eksisterende kontoer. Prøv igjen.",
      logIn: "Logg på",
      password: "Passord:",
      user: "Brukernavn:",
      welcome: "Logg på HCL Connections"
   },
   repost: {
      name: "Legg inn på nytt",
      title: "Legg inn denne oppdateringen på nytt til dem som følger meg, eller til fellesskapene mine",
      msg_success: "Oppdateringen din ble lagt inn på nytt til dem som følger deg.",
      msg_generic: "Noe gikk galt.  Prøv igjen."
   },
   FILE_SHARE_INFO: {
      ADD: "Legg til",
      ADD_TXT: "Legg til personer eller fellesskap som lesere",
      SHOW_MORE: "Vis mer...",
      READER_IF_PUBLIC: "Alle (felles)",
      READER_IF_PUBLIC_TOOLTIP: "Denne filen er felles og synlig for alle",
      EMPTY_READERS: "Ingen",
      READERS_LABEL: "Lesere: ",
      EDITORS_LABEL: "Redigerere: ",
      OWNER_LABEL: "Eier: ",
      ERROR: "Kan ikke laste inn delingsinformasjon",
      ERROR_NOT_FOUND: "Filen du har bedt om, er slettet eller flyttet. Hvis noen sendte deg denne koblingen, må du kontrollere at den er riktig.",
      ERROR_ACCESS_DENIED: "Du har ikke tillatelse til å vise denne filen.  Filen er ikke felles, og den er ikke delt med deg.",
      SHARE: "Del",
      CANCEL: "Avbryt",
      SHARE_WITH: "Del med:",
      PERSON: "en person",
      COMMUNITY: "et fellesskap",
      PLACEHOLDER: "Personnavn eller e-post...",
      MESSAGE: "Melding:",
      MESSAGE_TXT: "Legg til en valgfri melding",
      REMOVE_ITEM_ALT: "Fjern ${0}",
      NO_MEMBERS: "Ingen",
      A11Y_READER_ADDED: "Valgte ${0} som leser",
      A11Y_READER_REMOVED: "Fjernet ${0} som leser",
      SELF_REFERENCE_ERROR: "Du kan ikke dele med deg selv.",
      OWNER_REFERENCE_ERROR: "Du kan ikke dele med eieren av filen.",
      SHARE_COMMUNITY_WARN: "Hvis du deler med det felles fellesskapet '${0}', vil filen bli felles.",
      SELECT_USER_ERROR: "Du må velge minst en person eller et fellesskap du vil dele med",
      WARN_LONG_MESSAGE: "Meldingen er for lang.",
      TRIM_LONG_MESSAGE: "Forkort melding?",
      ERROR_SHARING: "Filen kunne ikke deles.  Prøv igjen senere.",
      INFO_SUCCESS: "Filen ble delt.",
      MAX_SHARES_ERROR: "Maksimalt antall delinger er overskredet.",
      NOT_LOGGED_IN_ERROR: "Filen ble ikke delt fordi du ikke var logget på.  Klikk på Del for å dele filen.",
      TIMEOUT_ERROR: "Filen ble ikke delt fordi det ikke var mulig å kontakte serveren.  Klikk på Del for å prøve igjen.",
      CANCEL_ERROR: "Filen ble ikke delt fordi forespørselen ble avbrutt.  Klikk på Del for å prøve igjen.",
      NOT_FOUND_ERROR: "Filen kan ikke deles fordi den er slettet eller ikke lenger er synlig for deg.",
      ACCESS_DENIED_ERROR: "Du har ikke lenger tillatelse til å dele denne filen.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "En fil som er begrenset, kan ikke gjøres felles.",
      TOOLTIP: "Gi andre tilgang til denne filen"
   },
   HISTORY: {
      TAB_TITLE: "Nyeste oppdateringer",
      NO_HISTORY: "Det er ingen nyeste oppdateringer.",
      EMPTY: "Kunne ikke hente de nyeste oppdateringene for dette elementet. Det er slettet, eller du har ikke lenger tilgang til det.",
      MORE: "Vis forrige oppdateringer",
      ERROR_ALT: "Feil",
      ERROR: "Det oppstod en feil ved henting av oppdateringene. ${again}",
      ERROR_ADDTL: "Det oppstod en feil ved henting av flere oppdateringer. ${again}",
      ERROR_AGAIN: "Prøv igjen.",
      ERROR_AGAIN_TITLE: "Prøv forespørselen om flere oppdateringer på nytt.",
      PROFILE_TITLE: "Åpne profilen for ${user}.",
      SORT_BY: "Sorter etter\\:",
      SORTS: {
         DATE: "Dato",
         DATE_TOOLTIP: "Sorter fra nyeste til eldste oppdateringer",
         DATE_TOOLTIP_REVERSE: "Sorter fra eldste til nyeste oppdateringer"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} klokken ${time}",
             MONTH: "${d}. ${MMM}",
             TODAY: "I dag klokken ${time}",
             YEAR: "${d}. ${MMM}, ${YYYY}",
             YESTERDAY: "I går klokken ${time}",
             TOMORROW: "${d}. ${MMM}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Denne kommentaren",
	   REPLY_ACTION: "Svar",
       REPLY_ACTION_TOOLTIP: "Svar på denne kommentaren"
   },
   OAUTH: {
      welcomeHeader: "Velkommen til Connections",
      continueBtnLabel: "Fortsett",
      continueBtnA11y: "Hvis du aktiverer denne koblingen, åpnes det et nytt vindu der du kan autorisere tilgang til Connections.",
      clickHere: "Klikk her",
      infoMsg: "Connections trenger autorisasjonen din for å få tilgang til dataene dine.",
      authorizeGadget: "${clickHere} for å autorisere denne applikasjonen for tilgang til Connections-informasjonen din.",
      confirmAuthorization: "${clickHere} for å bekrefte at du har gitt denne applikasjonen tilgang til Connections-informasjonen din."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Hvis du aktiverer denne koblingen, åpnes det et nytt vindu der du kan autorisere tilgang til Connections-bibliotekets datalager.",
      infoMsg: "Connections-bibliotekets datalager trenger autorisasjonen din for å få tilgang til dataene dine.",
      authorizeGadget: "${clickHere} for å autorisere denne applikasjonen for tilgang til informasjonen din i Connections-bibliotekets datalager.",
      confirmAuthorization: "${clickHere} for å bekrefte at du har gitt denne applikasjonen tilgang til informasjonen din i Connections-bibliotekets datalager."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Avbryt",
      CONFIRM: "Er du sikker på at du vil forkaste endringene?  Klikk på OK for å fortsette eller på Avbryt for å gå tilbake.",
      DIALOG_TITLE: "Bekreft",
      NAME: "Bekreft",
      OK: "OK",
      TOOLTIP: "Bekreft"
   }
})
