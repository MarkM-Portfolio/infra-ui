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
         label: "Meer",
         tooltip: "Meer acties"
       },
       tags_more: "en ${0} extra",
       ERROR_ALT: "Fout",
       PERSON_TITLE: "Open het profiel van ${user}.",
       inactiveUser: "${user} (inactief)",
       inactiveIndicator: "(inactief)",
       like_error: "Uw like is niet opgeslagen. Probeer het later opnieuw.",
       vote_error: "Uw stemkeuze is niet opgeslagen. Probeer het later opnieuw."
   },
   generic: {
      untitled: "(Naamloos)",
      tags: "Tags:",
      tags_more: "en ${0} extra",
      likes: "Likes",
      comments: "Reacties",
      titleTooltip: "Navigeren naar ${app}",
      error: "Gegevens kunnen niet worden opgehaald.",
      timestamp: {
         created: {
            DAY: "Gemaakt ${EEEE} om ${time}",
            MONTH: "Gemaakt ${MMM} ${d}",
            TODAY: "Vandaag gemaakt om ${time}",
            YEAR: "${MMM} ${d}, ${YYYY} gemaakt",
            YESTERDAY: "Gisteren gemaakt om ${time}",
            TOMORROW: "${MMM} ${d}, ${YYYY} gemaakt"
         },
         updated: {
            DAY: "Bijgewerkt ${EEEE} om ${time}",
            MONTH: "Bijgewerkt ${MMM} ${d}",
            TODAY: "Vandaag bijgewerkt om ${time}",
            YEAR: "Bijgewerkt: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Gisteren bijgewerkt om ${time}",
            TOMORROW: "Bijgewerkt: ${MMM} ${d}, ${YYYY}"
         }
      },
      visibility: {
         pub: "Openbaar",
         priv: "Persoonlijk"
      },
      action: {
         created: "Gemaakt",
         updated: "Bijgewerkt"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Ontvang updates over personen die u volgt op de pagina Home en in een e-mailoverzicht.",
      profile_title: "Open het profiel van ${user}.",
      profile_a11y: "Met deze link opent u het profiel van ${user} in een nieuw venster.",
      error: "Er is een fout opgetreden. ${again}.",
      error_again: "Probeer het opnieuw.",
      error_404: "De netwerkopdracht bestaat niet meer.",
      warning: "Waarschuwing",
      messages: {
         success: {
            accept: {
            	nofollow: "U bent nu een netwerkcontactpersoon van elkaar.",
            	follow: "U bent nu een netwerkcontactpersoon van elkaar en volgt ${user}."
            },
            ignore: {
            	nofollow: "U hebt de uitnodiging genegeerd.",
            	follow: "U hebt de uitnodiging genegeerd maar volgt nu ${user}."
            }
         },
         error: {
            accept: "Er is een fout opgetreden bij de acceptatie van het verzoek.",
            ignore: "Er is een fout opgetreden bij het negeren van het verzoek."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} om ${time}",
              MONTH: "${MMM} ${d}",
              TODAY: "Vandaag om ${time}",
              YEAR: "${MMM} ${d}, ${YYYY}",
              YESTERDAY: "Gisteren om ${time}",
              TOMORROW: "${MMM} ${d}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Met deze link opent u ${name} in een nieuw venster.",
      tooltip: "Open ${name} in de toepassing Bestanden",
      profile_title: "Open het profiel van ${user}.",
      profile_a11y: "Met deze link opent u het profiel van ${user} in een nieuw venster.",
      download_tooltip: "Download dit bestand (${0})",
      following: {
         add: "Bestand volgen",
         remove: "Volgen stoppen",
         title: "Aangeven of u updates over het bestand wilt ontvangen"
      },
      share: {
         label: "Delen",
         title: "Anderen toegang verlenen tot dit bestand"
      },
      timestamp: {
         created: {
            DAY: "Gemaakt ${EEEE} om ${time}",
            MONTH: "Gemaakt ${MMM} ${d}",
            TODAY: "Vandaag gemaakt om ${time}",
            YEAR: "${MMM} ${d}, ${YYYY} gemaakt",
            YESTERDAY: "Gisteren gemaakt om ${time}",
            TOMORROW: "${MMM} ${d}, ${YYYY} gemaakt"
         },
         createdOther: {
            DAY: "${user} gemaakt op ${EEEE} om ${time}",
            MONTH: "${user} gemaakt op ${MMM} ${d}",
            TODAY: "${user} vandaag gemaakt om ${time}",
            YEAR: "${user} gemaakt op ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} gisteren gemaakt om ${time}",
            TOMORROW: "${user} gemaakt op ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Bijgewerkt ${EEEE} om ${time}",
            MONTH: "Bijgewerkt ${MMM} ${d}",
            TODAY: "Vandaag bijgewerkt om ${time}",
            YEAR: "Bijgewerkt: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Gisteren bijgewerkt om ${time}",
            TOMORROW: "Bijgewerkt: ${MMM} ${d}, ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} bijgewerkt op ${EEEE} om ${time}",
            MONTH: "${user} bijgewerkt op ${MMM} ${d}",
            TODAY: "${user} vandaag bijgewerkt om ${time}",
            YEAR: "${user} bijgewerkt op ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} gisteren bijgewerkt om ${time}",
            TOMORROW: "${user} bijgewerkt op ${MMM} ${d}, ${YYYY}"
         },
         createdCompact: {
            DAY: "Gemaakt: ${EEEE} om ${time}",
            MONTH: "Gemaakt: ${MMM} ${d}",
            TODAY: "Gemaakt: Vandaag om ${time}",
            YEAR: "Gemaakt: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Gemaakt: Gisteren om ${time}",
            TOMORROW: "Gemaakt: ${MMM} ${d}, ${YYYY}"
         },
         updatedCompact: {
            DAY: "Bijgewerkt: ${EEEE} om ${time}",
            MONTH: "Bijgewerkt: ${MMM} ${d}",
            TODAY: "Bijgewerkt: Vandaag om ${time}",
            YEAR: "Bijgewerkt: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Bijgewerkt: Gisteren om ${time}",
            TOMORROW: "Bijgewerkt: ${MMM} ${d}, ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} door ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} door ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Download dit bestand (${size})",
      	 DOWNLOAD_ALT: "Downloaden"
      },

      PREVIEW: {
         LINK: "Preview",
         TITLE: "Dit bestand vooraf bekijken in een nieuw venster."
      },
      TAGS: "Tags:",
      error: "Er is een fout opgetreden. ${again}.",
      error_again: "Probeer het opnieuw.",
      error_404: "Het bestand bestaat niet meer of u bent onvoldoende gemachtigd om ermee te kunnen werken.",
      error_403: "U bent niet gemachtigd om dit bestand te bekijken. Het bestand is niet openbaar en wordt niet met u gedeeld.",
      notifications: {
         USER_SHARED: "${user} schrijft:",
         CHANGE_SUMMARY: "${user} heeft wijzigingsoverzicht geleverd",
         NO_CHANGE_SUMMARY: "${user} heeft geen wijzigingsoverzicht geleverd",
         COMMENTED: "${user} heeft gereageerd"
      }
   },
   ecm_file: {
      checkedout_you: "Uitgecheckt door u",
      checkedout_other: "Uitgecheckt door ${user}",
      tooltip: "Bestand ${name} in de bibliotheek openen",
      draft_404_info: "Het concept is gewist of wordt niet meer met u gedeeld. De gepubliceerde versie is nu de nieuwste versie van het bestand.",
      error_404: "Het bestand is gewist of wordt niet meer met u gedeeld.",
      error_403: "Het bestand is gewist of wordt niet meer met u gedeeld.",
      error_preview: "Er is geen preview van het bestand meer beschikbaar.",
      draft_review_canceled: "De evaluatie is geannuleerd en het concept wordt niet meer met u gedeeld. Uw evaluatie is niet meer nodig.",
      switch_ee: "Concept weergeven",
      switch_ee_tooltip: "Het nieuwste concept voor dit bestand weergeven"
   },
   ecm_draft: {
      tooltip: "Concept ${name} in de bibliotheek openen",
      community_owners: "Communityeigenaren",
      draft: "Concept",
      draft_tooltip: "Concept bekijken",
      draft_general_info: "Het vorige concept is niet meer aanwezig en een nieuwer concept wordt nu als nieuwste versie gebruikt.",
      draft_review_404_general_info: "Een van de revisors heeft al gestemd. Uw evaluatie van dit concept is niet meer nodig.",
      draft_review_404_request_info: "Het vorige concept is niet meer aanwezig en een het nieuwste concept is ingediend voor evaluatie. Uw evaluatie is aangevraagd.",
      draft_review_404_require_info: "Het vorige concept is niet meer aanwezig en een het nieuwste concept is ingediend voor evaluatie. Uw evaluatie is vereist",
      draft_review_request_info: "Uw evaluatie is aangevraagd.",
      draft_review_require_info: "Uw evaluatie is vereist",
      error_404: "Het concept is gewist of wordt niet meer met u gedeeld.",
      error_403: "U kunt dit concept niet bekijken omdat het niet met u wordt gedeeld.",
      error_preview: "Er is geen preview van het concept meer beschikbaar.",
      switch_ee: "Gepubliceerde versie bekijken",
      switch_ee_tooltip: "De gepubliceerde versie van dit bestand bekijken",
      review: "Evalueren",
      reviewers: "Revisors",
      reviwers_addtl: "Aanvullende revisors",
      in_review: "Concept in evaluatie",
      in_review_tooltip: "Concept in evaluatie bekijken",
      review_required_any: "Communityeigenaren willen dat dit concept door één revisor wordt geëvalueerd.",
      review_required_all: "Communityeigenaren willen dat dit concept door alle revisors wordt geëvalueerd.",
      review_required_generic: "Communityeigenaren willen dat dit concept door deze revisors wordt geëvalueerd.",
      review_additional_required: "Alle revisors die door indiener van het concept zijn toegevoegd, moeten dit concept evalueren.",
      reivew_submitted_date: {
         DAY: "${user} heeft het concept op ${EEEE} om ${time} ingediend voor evaluatie.",
         MONTH: "${user} heeft het concept op ${MMM} ${d} ingediend voor evaluatie.",
         TODAY: "${user} heeft het concept vandaag om ${time} ingediend voor evaluatie.",
         YEAR: "${user} heeft het concept op ${MMM} ${d} ${YYYY} ingediend voor evaluatie.",
         YESTERDAY: "${user} heeft het concept gisteren om ${time} ingediend voor evaluatie.",
         TOMORROW: "${user} heeft het concept op ${MMM} ${d} ${YYYY} ingediend voor evaluatie."
      },
      pending: "Aangehouden",
      pending_rejected: "Evaluatie niet meer nodig omdat het concept is afgewezen",
      approve: "Goedkeuren",
      approved: "Goedgekeurd",
      approve_tooltip: "Dit concept goedkeuren",
      accept_success: "U hebt dit concept goedgekeurd.",
      accept_error: "Er is een fout opgetreden tijdens het goedkeuren van het concept. Probeer het opnieuw.",
      accept_info: "U hebt dit concept goedgekeurd.",
      reject: "Afwijzen",
      rejected: "Afgewezen",
      reject_tooltip: "Dit concept afwijzen",
      reject_success: "U hebt dit concept afgewezen.",
      reject_error: "Er is een fout opgetreden tijdens het afwijzen van het concept. Probeer het opnieuw.",
      reject_info: "U hebt dit concept afgewezen."
   },
   authUser: {
      error: "Er is een fout opgetreden bij het ophalen van de huidige gebruiker. ${again}.",
      error_again: "Probeer het opnieuw.",
      error_404: "Kan de geverifieerde gebruiker niet vinden.",
      error_403: "U bent niet gemachtigd om gebruikersgegevens op te halen."
   },
   forum: {
      error: "Er is een fout opgetreden. ${again}.",
      error_again: "Probeer het opnieuw.",
      error_404: "Het forum bestaat niet meer of u bent onvoldoende gemachtigd om ermee te kunnen werken.",
      error_403: "U bent niet gemachtigd om dit forum te bekijken. Het forum is niet openbaar en wordt niet met u gedeeld.",

      readMore: "Volledig onderwerp weergeven...",
      readMore_tooltip: "Open het forumonderwerp ${name}.",
      readMore_a11y: "Met deze link opent u het forumonderwerp ${name} in een nieuw venster.",
      QUESTION_ANSWERED: "Deze vraag is beantwoord.",
      QUESTION_NOT_ANSWERED: "Deze vraag is nog niet beantwoord.",

      attachments: "${count} bijlagen",
      attachments_one: "${count} bijlage"
   },
   blog: {
      error: "Er is een fout opgetreden. ${again}.",
      error_again: "Probeer het opnieuw.",
      error_404: "De blog bestaat niet meer of u bent onvoldoende gemachtigd om ermee te kunnen werken.",
      error_403: "U bent niet gemachtigd om deze blog te bekijken. De blog is niet openbaar en wordt niet met u gedeeld.",
      readMore: " Meer informatie...",
      readMore_tooltip: "Open blogitem ${name}.",
      readMore_a11y: "Met deze link opent u het blogitem ${name} in een nieuw venster.",
      graduated: "Bevorderd",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Stemmen</a>",
  					TOOLTIP: 	"Hiervoor stemmen"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Gestemd</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Gestemd</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Ongedaan maken</a>",
  					TOOLTIP: 	"Uw stem hiervoor verwijderen"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 personen hebben hiervoor gestemd."
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 persoon heeft hiervoor gestemd"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} heeft hiervoor gestemd"
  				}
  			},
  			LOADING: "Bezig met laden...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Gestemd"
  			}
  		}
   },
   idea: {
	  error_404: "Uw stem kan niet worden opgeslagen omdat u uw stemlimiet hebt bereikt of het idee niet meer beschikbaar is voor u.",
      readMore_tooltip: "Open idee ${name}.",
      readMore_a11y: "Met deze link opent u idee ${name} in een nieuw venster."
   },
   size: {
      B: "${0} B",
      KB: "${0} kB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "Antwoorden",
      THIS_ARIA_LABEL: "Dit antwoord",
      THIS_TAB_TITLE: "Dit antwoord",
      TAB_TITLE: "Antwoorden (${0})",
      REPLY_TO_REPLY: "Als antwoord op ${thisReply}",
      REPLY_TO_TOPIC: "Als antwoord op ${thisTopic}",
      THIS_TOPIC: "dit onderwerp",
      THIS_REPLY: "dit antwoord",
      NAVIGATE_TO_REPLY: "Ga naar het bovenliggende antwoord",
      NAVIGATE_TO_TOPIC: "Ga naar het bovenliggende onderwerp",
      ADD_COMMENT: "Antwoorden op dit onderwerp",
      ADD_COMMENT_TOOLTIP: "Antwoorden op dit forumonderwerp",
      SHOWING_RECENT_REPLIES: "De ${0} recentste antwoorden",
      PREV_COMMENTS: "Meer antwoorden afbeelden",
      PLACEHOLDER_TXT: "Antwoorden op dit onderwerp",
      EMPTY: "Er zijn geen antwoorden.",
      TRIM_LONG_COMMENT: "Antwoord inkorten?",
      WARN_LONG_COMMENT: "Het antwoord is te lang. ${shorten}",
      ERROR: "Er is een fout opgetreden bij het ophalen van de antwoorden. ${again}",
      ERROR_CREATE: "Kan het antwoord niet opslaan. Probeer het later opnieuw.",
      ERROR_CREATE_NOT_FOUND: "Uw antwoord is niet opgeslagen omdat het onderwerp is gewist of niet langer zichtbaar is voor u.",
      ERROR_CREATE_ACCESS_DENIED: "Uw antwoord is niet opgeslagen omdat het onderwerp is gewist of niet langer zichtbaar is voor u.",
      ERROR_CREATE_TIMEOUT: "Uw antwoord is niet opgeslagen omdat er geen verbinding is met de server. Klik op 'Opslaan' om het opnieuw te proberen.",
      ERROR_CREATE_CANCEL: "Uw antwoord is niet opgeslagen omdat de opdracht is geannuleerd. Klik op 'Opslaan' om het opnieuw te proberen.",
      ERROR_CREATE_NOT_LOGGED_IN: "U moet zijn aangemeld om dit antwoord te kunnen maken. Kies 'Opslaan' om u aan te kunnen melden.",
      ERROR_NO_CONTENT: "Voer uw antwoord in en klik op 'Opslaan'. Als u toch geen antwoord wilt achterlaten, kiest u 'Annuleren'.",
      ERROR_UNAUTHORIZED: "Uw antwoord kan niet worden opgeslagen omdat u niet gemachtigd bent om een antwoord achter te laten.",
      COMMENT_DELETED: {
         DAY: "Antwoord is gewist door ${user}, op ${EEEE} om ${time}",
         MONTH: "Antwoord is gewist door ${user} in ${MMM} ${d}",
         TODAY: "Antwoord is vandaag om ${time} gewist door ${user}",
         YEAR: "Antwoord gewist door ${user} op ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Antwoord is gisteren om ${time} gewist door ${user}",
         TOMORROW: "Antwoord gewist door ${user} op ${MMM} ${d}, ${YYYY}"
      },
      REASON_FOR_DELETION: "Reden voor de verwijdering: ${reason}",
      REPLY_TITLE: "Betreft: ${0}",
      SHOW_FULL_REPLY: "Volledig antwoord weergeven",
      SHOW_FULL_REPLY_TOOLTIP: "Ga naar het oorspronkelijke antwoord in het forumonderwerp.",
      REPLY_ACTION: "Antwoorden",
      REPLY_ACTION_TOOLTIP: "Antwoorden op deze post",
      MODERATION_PENDING: "Dit antwoord wacht op beoordeling.",
      MODERATION_QUARANTINED: "De post is in quarantaine geplaatst door de moderator.",
      MODERATION_REMOVED: {
         DAY: "Dit antwoord is verwijderd door ${user} op ${EEEE} om ${time}.",
         MONTH: "Dit antwoord is verwijderd door ${user} op ${MMM} ${d}.",
         TODAY: "Dit antwoord is vandaag verwijderd door ${user} om ${time}.",
         YEAR: "Dit antwoord is verwijderd door ${user} op ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Dit antwoord is gisteren verwijderd door ${user} om ${time}.",
         TOMORROW: "Dit antwoord is verwijderd door ${user} op ${MMM} ${d}, ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Dit antwoord is afgewezen door ${user} op ${EEEE} om ${time}.",
         MONTH: "Dit antwoord is afgewezen door ${user} op ${MMM} ${d}.",
         TODAY: "Dit antwoord is vandaag afgewezen door ${user} om ${time}.",
         YEAR: "Dit antwoord is afgewezen door ${user} op ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Dit antwoord is gisteren afgewezen door ${user} om ${time}.",
         TOMORROW: "Dit antwoord is afgewezen door ${user} op ${MMM} ${d}, ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Uw antwoord is ter beoordeling verzonden en komt na goedkeuring beschikbaar."
   },
   COMMENTS: {
      ARIA_LABEL: "Reacties",
      PLACEHOLDER_TXT: "Reactie toevoegen",
      TAB_TITLE: "Reacties (${0})",
      ACTION_NOT_SUPPORTED: "Niet-ondersteunde actie",
      ADD_COMMENT: "Reactie toevoegen",
      ADD_COMMENT_TOOLTIP: "Voeg een reactie toe aan dit onderwerp",
      CANCEL: "Annuleren",
      COMMENT_COUNT_ONE: "${0} reactie",
      COMMENT_COUNT_MANY: "${0} reacties",
      COMMENT_LABEL: "Reactie:",
      DELETE: "Wissen",
      DELETE_TOOLTIP: "Reactie wissen",
      DELETEREASON: "Reden om deze reactie te wissen:",
      DIALOG_TITLE: "Reactie inkorten",
      TOOLTIP: "Reactie inkorten",
      NAME: "Reactie inkorten",
      EDIT: "Bewerken",
      EDIT_TOOLTIP: "reactie bewerken",
      ERROR_CREATE: "Uw reactie is niet opgeslagen. Probeer het later opnieuw.",
      ERROR_CREATE_NOT_FOUND: "Uw reactie is niet opgeslagen omdat het item is gewist of niet langer zichtbaar is voor u.",
      ERROR_CREATE_ACCESS_DENIED: "Uw reactie is niet opgeslagen omdat het item is gewist of niet langer zichtbaar is voor u.",
      ERROR_CREATE_TIMEOUT: "Uw reactie is niet opgeslagen omdat er geen verbinding is met de server. Klik op 'Posten' om het opnieuw te proberen.",
      ERROR_CREATE_CANCEL: "Uw reactie is niet opgeslagen omdat de opdracht is geannuleerd. Klik op 'Posten' om het opnieuw te proberen.",
      ERROR_CREATE_NOT_LOGGED_IN: "U moet zijn aangemeld om een reactie te kunnen geven. Klik op 'Posten' om u aan te kunnen melden.",
      ERROR_DELETE: "Uw reactie is niet gewist. Probeer het later opnieuw.",
      ERROR_DELETE_TIMEOUT: "Uw reactie is niet gewist omdat er geen verbinding is met de server. Klik op 'Wissen' om het opnieuw te proberen.",
      ERROR_DELETE_NOT_FOUND: "Uw reactie kan niet worden gewist omdat uw reactie of het item al is gewist of niet meer zichtbaar is voor u.",
      ERROR_DELETE_ACCESS_DENIED: "Uw reactie is niet gewist omdat het item is gewist of niet langer zichtbaar is voor u.",
      ERROR_DELETE_CANCEL: "Uw reactie is niet gewist omdat de opdracht is geannuleerd. Klik op 'Wissen' om het opnieuw te proberen.",
      ERROR_DELETE_NOT_LOGGED_IN: "U moet zijn aangemeld om een reactie te kunnen wissen. Kies 'Wissen' om u aan te kunnen melden.",
      ERROR_EDIT: "Uw reactie is niet bijgewerkt. Probeer het later opnieuw.",
      ERROR_EDIT_ACCESS_DENIED: "Uw reactie is niet bijgewerkt omdat het item is gewist of niet langer zichtbaar is voor u.",
      ERROR_EDIT_NOT_FOUND: "Uw reactie is niet bijgewerkt omdat het item is gewist of niet langer zichtbaar is voor u.",
      ERROR_EDIT_TIMEOUT: "Uw reactie is niet bijgewerkt omdat er geen verbinding is met de server. Klik op 'Posten' om het opnieuw te proberen.",
      ERROR_EDIT_CANCEL: "Uw reactie is niet bijgewerkt omdat de opdracht is geannuleerd. Klik op 'Posten' om het opnieuw te proberen.",
      ERROR_EDIT_NOT_LOGGED_IN: "U moet zijn aangemeld om deze reactie te kunnen bewerken. Klik op 'Posten' om u aan te kunnen melden.",
      ERROR_NO_CONTENT: "Voer uw opmerking in en klik op 'Posten'. Als u toch geen reactie wilt achterlaten, kiest u 'Annuleren'.",
      ERROR_NO_CONTENT_EDIT: "Voer uw opmerking in en klik op 'Posten'. Als u toch geen reactie wilt bewerken, kiest u 'Annuleren'.",
      ERROR_UNAUTHORIZED: "Uw reactie kan niet worden opgeslagen omdat u niet gemachtigd bent om een reactie achter te laten.",
      ERROR_GENERAL: "Er is een fout opgetreden.",
      OK: "OK",
      YES: "Ja",
      TRIM_LONG_COMMENT: "Reactie inkorten?",
      WARN_LONG_COMMENT: "De reactie is te lang. ${shorten}",
      LINK: "Link",
      SAVE: "Opslaan",
      POST: "Posten",
      SHOWMORE: "Meer informatie...",
      VIEW_COMMENTS_FILE: "Reacties op dit bestand bekijken",
      SUBSCRIBE_TO_COMMENTS: "Abonneren op deze reacties",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Volg de wijzigingen op deze reacties via uw feedlezer",
      PROFILE_TITLE: "Open het profiel van ${user}.",
      PROFILE_A11Y: "Met deze link opent u het profiel van ${user} in een nieuw venster.",
      MODERATION_PENDING: "Deze reactie wacht op beoordeling.",
      MODERATION_REMOVED: {
         DAY: "Deze reactie is verwijderd door ${user} op ${EEEE} om ${time}.",
         MONTH: "Deze reactie is verwijderd door ${user} in ${MMM} ${d}.",
         TODAY: "Deze reactie is vandaag verwijderd door ${user} om ${time}.",
         YEAR: "Deze reactie is verwijderd door ${user} op ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Deze reactie is gisteren verwijderd door ${user} om ${time}.",
         TOMORROW: "Deze reactie is verwijderd door ${user} op ${MMM} ${d}, ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Deze reactie is afgewezen door ${user} op ${EEEE} om ${time}.",
         MONTH: "Deze reactie is afgewezen door ${user} in ${MMM} ${d}.",
         TODAY: "Deze reactie is vandaag afgewezen door ${user} om ${time}.",
         YEAR: "Deze reactie is afgewezen door ${user} op ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Deze reactie is gisteren afgewezen door ${user} om ${time}.",
         TOMORROW: "Deze reactie is afgewezen door ${user} op ${MMM} ${d}, ${YYYY}."
      },
      PREV_COMMENTS: "Eerdere reacties afbeelden",
      EMPTY: "Er zijn geen reacties.",
      ERROR_ALT: "Fout",
      ERROR: "Er is een fout opgetreden bij het ophalen van de reacties. ${again}",
      ERROR_ADDTL: "Er is een fout opgetreden bij het ophalen van aanvullende reacties. ${again}",
      ERROR_AGAIN: "Probeer het opnieuw.",
      ERROR_AGAIN_TITLE: "Herhaal de opdracht voor meer reacties.",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} om ${time} (versie ${version})",
         MONTH: "${user} ${MMM} ${d} (versie ${version})",
         TODAY: "${user} vandaag om ${time} (versie ${version})",
         YEAR: "${user} ${MMM} ${d}, ${YYYY} (versie ${version})",
         YESTERDAY: "${user} gisteren om ${time} (versie ${version})",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (versie ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} om ${time}",
         MONTH: "${user} ${MMM} ${d}",
         TODAY: "${user} vandaag om ${time}",
         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} vandaag om ${time}",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} om ${time}",
         MONTH: "${MMM} ${d}",
         TODAY: "Vandaag om ${time}",
         YEAR: "${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Gisteren om ${time}",
         TOMORROW: "${MMM} ${d}, ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Reactie gewist door ${user} op ${EEEE} om ${time}",
         MONTH: "Reactie gewist door ${user} in ${MMM} ${d}",
         TODAY: "Reactie vandaag om ${time} gewist door ${user}",
         YEAR: "Reactie gewist door ${user} op ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Reactie gisteren om ${time} gewist door ${user}",
         TOMORROW: "Reactie gewist door ${user} op ${MMM} ${d}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} bewerkt door ${EEEE} om ${time} (versie ${version})",
         MONTH: "Door ${user} gewijzigd ${MMM} ${d} (versie ${version})",
         TODAY: "${user} vandaag bewerkt om ${time} (versie ${version})",
         YEAR: "${user} bewerkt ${MMM} ${d}, ${YYYY} (versie ${version})",
         YESTERDAY: "${user} gisteren bewerkt om ${time} (versie ${version})",
         TOMORROW: "${user} bewerkt ${MMM} ${d}, ${YYYY} (versie ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} bewerkt ${EEEE} om ${time}",
         MONTH: "${user} heeft ${MMM} ${d} bijgewerkt",
         TODAY: "${user} vandaag bijgewerkt om ${time}",
         YEAR: "${user} bijgewerkt ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} gisteren bijgewerkt om ${time}",
         TOMORROW: "${user} bijgewerkt ${MMM} ${d}, ${YYYY}"
      },

      DELETE_CONFIRM: "Weet u zeker dat u deze reactie wilt wissen?",
      FLAG_ITEM: {
         BUSY: "Opslaan...",
         CANCEL: "Annuleren",
         ACTION: "Markeren als ongepast",
         DESCRIPTION_LABEL: "Reden voor de markering van dit item (optioneel)",
         EDITERROR: "De metagegevens van het bestand zijn vanwege een fout niet bewerkt",
         OK: "Opslaan",
         ERROR_SAVING: "Er is een fout opgetreden bij het verwerken van de opdracht. Probeer het later opnieuw.",
         SUCCESS_SAVING: "Uw markering is verstuurd. Deze wordt op korte termijn door een moderator bekeken.",
         TITLE: "Dit item markeren als ongepast",
         COMMENT: {
            TITLE: "Deze reactie markeren als ongepast",
            A11Y: "Met deze knop opent u een venster waarin u deze reactie kunt markeren als ongepast."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Annuleren",
      DIALOG_TITLE: "Reactie wissen",
      NAME: "Reactie wissen",
      OK: "OK",
      TOOLTIP: "Reactie wissen"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Annuleren",
      CONFIRM: "Bij inkorting wordt de tekst vanaf de reactielimiet verwijderd. Kies 'OK' om de reactie in te korten, of klik op 'Annuleren' als u deze zelf wilt bewerken.",
      DIALOG_TITLE: "Reactie inkorten",
      NAME: "Reactie inkorten",
      OK: "OK",
      TOOLTIP: "Reactie inkorten"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Verzenden bevestigen",
      CONFIRM: "Uw reactie is ter beoordeling verzonden en komt na goedkeuring beschikbaar.",
      OK: "OK"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "PM",
      TODAY: "vandaag",
      TODAY_U: "Vandaag",
      YESTERDAY: "gisteren",
      YESTERDAY_U: "Gisteren",

      ADDED: { DAY: "Toegevoegd ${EEee} om ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Toegevoegd ${date_long}",
         TODAY: "Vandaag toegevoegd om ${time}",
         YEAR: "Toegevoegd ${date_long}",
         YESTERDAY: "Gisteren toegevoegd om ${time}"
      },

      LAST_UPDATED: { DAY: "Laatst bijgewerkt ${EEee} om ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Laatst bijgewerkt ${date_long}",
         TODAY: "Laatst bijgewerkt vandaag om ${time}",
         YEAR: "Laatst bijgewerkt ${date_long}",
         YESTERDAY: "Laatst bijgewerkt gisteren om ${time}"
      },

      MONTHS_ABBR: { 0: "JAN",
         10: "NOV",
         11: "DEC",
         1: "FEB",
         2: "MRT",
         3: "APR",
         4: "MEI",
         5: "JUN",
         6: "JUL",
         7: "AUG",
         8: "SEP",
         9: "OKT"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Vandaag",
         YEAR: "${date_short}",
         YESTERDAY: "Gisteren",
         TOMORROW: "Morgen"
      },

      RELATIVE_TIME: { DAY: "${EEee} om ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Vandaag om ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Gisteren om ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} om ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Vandaag om ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Gisteren om ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} om ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} om ${time}",
         TODAY: "${date_short} om ${time}",
         YEAR: "${date_short} om ${time}",
         YESTERDAY: "${date_short} om ${time}",
         TOMORROW: "${date_short} om ${time}"
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

      UPDATED: { DAY: "Bijgewerkt ${EEee} om ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Bijgewerkt ${date_long}",
         TODAY: "Vandaag bijgewerkt om ${time}",
         YEAR: "Bijgewerkt ${date_long}",
         YESTERDAY: "Gisteren bijgewerkt om ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Geen versiegegevens geladen.",
      ERROR_REQUEST_CANCELLED: "De opdracht is geannuleerd.",
      ERROR_REQUEST_TIMEOUT: "Er kan geen contact worden gemaakt met de server.",
      ERROR_REQUEST_UNKNOWN: "Er is een onvoorziene fout opgetreden.",
      LOADING: "Bezig met laden...",
      NO_VERSIONS: "Er zijn geen versies",
      INFO: "Versie ${0} gemaakt ${1} door ",
      VERSION_NUMBER: "Versie ${0}",
      DELETED: "Gewist",
      DELETE_ALL: "Alle versies wissen die ouder zijn dan versie",
      DELETE_VERSION_SINGLE: "Versie ${0} wissen",
      DELETEERROR: "De versie is vanwege een fout niet gewist.",
      CREATE_VERSION: "Nieuwe versie maken",
      CREATE_VERSION_TOOLTIP: "Maak een versie van dit bestand",
      REVERT_VERSION: "Versie ${0} herstellen",
      REVERT_DESCRIPTION: "Hersteld vanaf versie ${0}",
      PREVIOUS: "Vorige",
      PREVIOUS_TOOLTIP: "Vorige pagina",
      ELLIPSIS: "...",
      NEXT: "Volgende",
      NEXT_TOOLTIP: "Volgende pagina",
      COUNT: "${0} - ${1} van ${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "Pagina",
      SHOW: "Afbeelden",
      ITEMS_PER_PAGE: " items per pagina.",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Vandaag om ${time}",
            YESTERDAY: "Gisteren om ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} om ${time}",
            YEAR: "${date_short} om ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} om ${time}",
            TODAY: "vandaag om ${time}",
            YESTERDAY: "gisteren om ${time}"
        },
        UPDATED: { DAY: "Bijgewerkt ${EEee} om ${time}",
            YEAR: "Bijgewerkt ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Bijgewerkt ${date_short}",
            TODAY: "Vandaag bijgewerkt om ${time}",
            YESTERDAY: "Gisteren bijgewerkt om ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Versie ${0} wissen",
         DOWNLOAD: "Downloaden",
         DOWNLOAD_TOOLTIP: "Deze versie downloaden (${0})",
         VIEW: "Weergeven",
         VIEW_TOOLTIP: "Versie ${0} bekijken",
         REVERT: {
            A11Y: "Met deze knop opent u een venster waarin u het herstel van een bestand vanuit een eerdere versie kunt bevestigen. Bevestiging resulteert in vernieuwing van de inhoud van de pagina.",
            FULL: "Herstellen",
            WIDGET: "Deze versie herstellen"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "De versie is niet gewist omdat deze is al gewist of niet langer zichtbaar is voor u.",
         ERROR_ACCESS_DENIED: "De versie kan niet worden gewist, want u bent geen editor.",
         ERROR_TIMEOUT: "De versie is niet gewist omdat er geen verbinding is met de server. Klik opnieuw op 'Wissen' om uw opdracht opnieuw te proberen.",
         ERROR_CANCEL: "De versie is niet gewist omdat de opdracht is geannuleerd. Klik opnieuw op 'Wissen' om uw opdracht opnieuw te proberen.",
         ERROR_NOT_LOGGED_IN: "U moet zijn aangemeld om deze versie te kunnen wissen. Kies 'Wissen' om u aan te kunnen melden.",
         GENERIC_ERROR: "De versie kan niet worden gewist vanwege een onvoorziene fout. Klik opnieuw op 'Wissen' om uw opdracht opnieuw te proberen.",
         FULL: "Wissen",
         A11Y: "Met deze knop opent u een venster waarin u de verwijdering van deze versie kunt bevestigen. Bevestiging resulteert in vernieuwing van de inhoud van de pagina."
      },

      REVERT: {
         ERROR_NOT_FOUND: "De versie is niet hersteld omdat deze is gewist of niet langer zichtbaar is voor u.",
         ERROR_ACCESS_DENIED: "De versie kan niet worden hersteld, want u bent geen editor.",
         ERROR_NAME_EXISTS: "De versie kan niet worden hersteld, want deze naam wordt ook gebruikt voor een ander bestand.",
         ERROR_TIMEOUT: "De versie is niet hersteld omdat er geen verbinding is met de server. Klik opnieuw op 'Herstellen' om uw opdracht opnieuw te proberen.",
         ERROR_CANCEL: "De versie is niet hersteld omdat de opdracht is geannuleerd. Klik opnieuw op 'Herstellen' om uw opdracht opnieuw te proberen.",
         ERROR_QUOTA_VIOLATION: "De versie is niet hersteld vanwege ruimtebeperkingen.",
         ERROR_MAX_CONTENT_SIZE: "De versie kan niet worden hersteld omdat deze groter is dan de maximaal toegestane waarde van ${0}.",
         GENERIC_ERROR: "De versie kan niet worden hersteld vanwege een onvoorziene fout. Klik opnieuw op 'Herstellen' om uw opdracht opnieuw te proberen."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Kijken wie gedownload heeft...",
      PREVIOUS: "Vorige",
      PREVIOUS_TOOLTIP: "Vorige pagina",
      ELLIPSIS: "...",
      NEXT: "Volgende",
      NEXT_TOOLTIP: "Volgende pagina",
      COUNT: "${0} - ${1} van ${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "Pagina",
      SHOW: "Afbeelden",
      ITEMS_PER_PAGE: " items per pagina.",
      VERSION: {
         DAY: "Versie ${version} op ${date}",
         MONTH: "Versie ${version} op ${date}",
         TODAY: "Versie ${version} om ${time}",
         YEAR: "Versie ${version} op ${date}",
         YESTERDAY: "Versie ${version} gisteren"
      },

      FILE: {
         V_LATEST: "U hebt de meest recente versie van dit bestand gedownload.",
         V_OLDER: "De laatste keer hebt u versie ${0} van het bestand gedownload.",
         LOADING: "Bezig met laden...",
         EMPTY: "Alleen anonieme gebruikers",
         ERROR: "Downloadgegevens kunnen niet worden geladen"
      }
   },

   EE_DIALOG: {
      ERROR: "Fout",
      ERROR_ALT_TEXT: "Fout:",
      ERROR_MSG_GENERIC: "Er is iets misgegaan. Probeer het opnieuw.",
      ERROR_MSG_NOT_AVAILABLE: "Dit item is gewist of is niet meer beschikbaar.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "De content voor dit item is niet beschikbaar.",
      ERROR_MSG_NO_ACCESS: "U hebt geen toegang meer tot dit item.",
      LOADING: "Bezig met laden...",
      TITLE_SU: "${author} heeft een bericht gepost.",
      TITLE_NI: "${author} heeft u uitgenodigd om deel te nemen aan hun netwerk.",
      AUTHOR_TITLE: "Profiel bekijken voor ${author}",
      OPEN_LINK: "${title} openen",
      CONFIRM_CLOSE_TITLE: "Bevestigen",
      CONFIRM_CLOSE_MESSAGE: "Weet u zeker dat u de wijzigingen ongedaan wilt maken? Kies OK om door te gaan of Annuleren om terug te gaan.",
      OK: "OK",
      CANCEL: "Annuleren"
   },
   MESSAGE: {
      SUCCESS: "Bevestiging",
      ERROR: "Fout",
      ERROR_ALT_TEXT: "Fout:",
      INFO: "Informatie",
      WARNING: "Waarschuwing",
      DISMISS: "Dit bericht verbergen",
      MORE_DETAILS: "Meer details",
      HIDE_DETAILS: "Details verbergen"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Gemaakt: ${EEEE} om ${time}",
           MONTH: "Gemaakt: ${MMM} ${d}",
           TODAY: "Gemaakt: Vandaag om ${time}",
           YEAR: "Gemaakt: ${MMM} ${d}, ${YYYY}",
           YESTERDAY: "Gemaakt: Gisteren om ${time}",
           TOMORROW: "Gemaakt: ${MMM} ${d}, ${YYYY}"
       },
      error: "Er is een fout opgetreden. ${again}.",
      error_again: "Probeer het opnieuw.",
      error_404: "De statusupdate bestaat niet meer.",
      notifications: {
         STATUS_UPDATE: "${user} heeft een bericht gepost.",
         USER_BOARD_POST: "${user} heeft het volgende geschreven op uw board",
         POST_COMMENT: "${user} schrijft:"
      }
   },
   login: {
      error: "Uw gebruikersnaam en/of wachtwoord komt niet overeen met een bestaand account. Probeer het opnieuw.",
      logIn: "Aanmelden",
      password: "Wachtwoord:",
      user: "Gebruikersnaam:",
      welcome: "Aanmelden bij HCL Connections"
   },
   repost: {
      name: "Opnieuw posten",
      title: "Post deze update opnieuw naar mijn volgers of in mijn community's",
      msg_success: "De update is opnieuw gepost naar uw volgers.",
      msg_generic: "Er is iets misgegaan. Probeer het opnieuw."
   },
   FILE_SHARE_INFO: {
      ADD: "Toevoegen",
      ADD_TXT: "Personen of community's toevoegen als lezers",
      SHOW_MORE: "Meer afbeelden...",
      READER_IF_PUBLIC: "Iedereen (openbaar)",
      READER_IF_PUBLIC_TOOLTIP: "Dit bestand is openbaar en zichtbaar voor iedereen",
      EMPTY_READERS: "Geen",
      READERS_LABEL: "Lezers: ",
      EDITORS_LABEL: "Editors: ",
      OWNER_LABEL: "Eigenaar: ",
      ERROR: "Sharegegevens kunnen niet worden geladen",
      ERROR_NOT_FOUND: "Het gevraagde bestand is gewist of verplaatst. Als u deze link van iemand hebt ontvangen, controleer dan of deze juist is.",
      ERROR_ACCESS_DENIED: "U bent niet gemachtigd om dit bestand te bekijken. Het bestand is niet openbaar en wordt niet met u gedeeld.",
      SHARE: "Delen",
      CANCEL: "Annuleren",
      SHARE_WITH: "Delen met:",
      PERSON: "Een persoon",
      COMMUNITY: "Een community",
      PLACEHOLDER: "Naam of e-mailadres van persoon...",
      MESSAGE: "Bericht:",
      MESSAGE_TXT: "Optioneel bericht toevoegen",
      REMOVE_ITEM_ALT: "${0} verwijderen",
      NO_MEMBERS: "Geen",
      A11Y_READER_ADDED: "${0} is geselecteerd als lezer",
      A11Y_READER_REMOVED: "${0} is verwijderd als lezer",
      SELF_REFERENCE_ERROR: "U kunt niet delen met uzelf.",
      OWNER_REFERENCE_ERROR: "U kunt het bestand niet delen met de eigenaar ervan.",
      SHARE_COMMUNITY_WARN: "Als het bestand wordt gedeeld met de openbare community '${0}', wordt het openbaar.",
      SELECT_USER_ERROR: "Selecteer ten minste één persoon of community voor het delen.",
      WARN_LONG_MESSAGE: "Het bericht is te lang.",
      TRIM_LONG_MESSAGE: "Bericht inkorten?",
      ERROR_SHARING: "Het bestand kan niet worden gedeeld. Probeer het later opnieuw.",
      INFO_SUCCESS: "Het bestand is gedeeld.",
      MAX_SHARES_ERROR: "Het maximumaantal shares is overschreden.",
      NOT_LOGGED_IN_ERROR: "Het bestand is niet gedeeld omdat u niet bent aangemeld. Klik op 'Delen' om het bestand te delen.",
      TIMEOUT_ERROR: "Het bestand is niet gedeeld omdat er geen verbinding is met de server. Klik op 'Delen' om het opnieuw te proberen.",
      CANCEL_ERROR: "Het bestand is niet gedeeld omdat de opdracht is geannuleerd. Klik op 'Delen' om het opnieuw te proberen.",
      NOT_FOUND_ERROR: "Het bestand is gewist of is niet langer zichtbaar voor u en kan niet worden gedeeld.",
      ACCESS_DENIED_ERROR: "U bent niet meer gemachtigd om dit bestand te delen.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Een bestand waarvan de toegang beperkt is, kan niet openbaar worden gemaakt.",
      TOOLTIP: "Anderen toegang verlenen tot dit bestand"
   },
   HISTORY: {
      TAB_TITLE: "Recente updates",
      NO_HISTORY: "Er zijn geen recente updates.",
      EMPTY: "Er kunnen geen recente updates worden opgehaald voor dit item. Het is gewist of u hebt geen toegang meer tot dit item.",
      MORE: "Eerdere updates afbeelden",
      ERROR_ALT: "Fout",
      ERROR: "Er is een fout opgetreden bij het ophalen van de updates. ${again}",
      ERROR_ADDTL: "Er is een fout opgetreden bij het ophalen van aanvullende updates. ${again}",
      ERROR_AGAIN: "Probeer het opnieuw.",
      ERROR_AGAIN_TITLE: "Probeer de opdracht opnieuw voor meer updates.",
      PROFILE_TITLE: "Open het profiel van ${user}.",
      SORT_BY: "Sorteren op\\:",
      SORTS: {
         DATE: "Datum",
         DATE_TOOLTIP: "Sorteren van meest recente historie naar minst recente updates",
         DATE_TOOLTIP_REVERSE: "Sorteren van minst recente historie naar meest recente updates"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} om ${time}",
             MONTH: "${MMM} ${d}",
             TODAY: "Vandaag om ${time}",
             YEAR: "${MMM} ${d}, ${YYYY}",
             YESTERDAY: "Gisteren om ${time}",
             TOMORROW: "${MMM} ${d}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Deze reactie",
	   REPLY_ACTION: "Antwoorden",
       REPLY_ACTION_TOOLTIP: "Deze reactie beantwoorden"
   },
   OAUTH: {
      welcomeHeader: "Welkom bij Connections",
      continueBtnLabel: "Doorgaan",
      continueBtnA11y: "Door het activeren van deze link wordt er een nieuw venster geopend waarin u toegang tot Connections kunt verlenen.",
      clickHere: "Klik hier",
      infoMsg: "Connections heeft uw autorisatie nodig voor toegang tot uw gegevens.",
      authorizeGadget: "${clickHere} om deze toepassing machtiging te verlenen voor toegang tot uw Connections-gegevens.",
      confirmAuthorization: "${clickHere} om te bevestigen dat u deze toepassing machtiging hebt verleend voor toegang tot uw Connections-gegevens."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Door het activeren van deze link wordt er een nieuw venster geopend waarin u gebruikers toegang kunt verlenen tot de Connections Bibliotheek-repository.",
      infoMsg: "De Connections Bibliotheek-repository heeft uw autorisatie nodig voor toegang tot uw gegevens.",
      authorizeGadget: "${clickHere} om deze toepassing machtiging te verlenen voor toegang tot de gegevens van uw Connections Bibliotheek-repository.",
      confirmAuthorization: "${clickHere} om te bevestigen dat u deze toepassing toegang verleent tot de gegevens van uw Connections Bibliotheek-repository."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Annuleren",
      CONFIRM: "Weet u zeker dat u de wijzigingen ongedaan wilt maken? Kies OK om door te gaan of Annuleren om terug te gaan.",
      DIALOG_TITLE: "Bevestigen",
      NAME: "Bevestigen",
      OK: "OK",
      TOOLTIP: "Bevestigen"
   }
})
