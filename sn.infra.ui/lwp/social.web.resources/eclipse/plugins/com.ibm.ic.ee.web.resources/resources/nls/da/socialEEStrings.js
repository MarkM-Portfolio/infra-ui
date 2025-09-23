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
		         label: "Mere",
		         tooltip: "Flere handlinger"
		       },
		       tags_more: "og ${0} flere",
		       ERROR_ALT: "Fejl",
		       PERSON_TITLE: "Åbn profilen for ${user}.",
		       inactiveUser: "${user} (inaktiv)",
		       inactiveIndicator: "(inaktiv)",
		       like_error: "Din synes godt om-tilkendegivelse kan ikke gemmes. Prøv igen senere.",
		       vote_error: "Din stemme kan ikke gemmes. Prøv igen senere."
		   },
		   generic: {
		      untitled: "(Uden navn)",
		      tags: "Emneord:",
		      tags_more: "og ${0} flere",
		      likes: "Synes godt om-tilkendegivelser",
		      comments: "Kommentarer",
		      titleTooltip: "Navigér til ${app}",
		      error: "Kan ikke hente data.",
		      timestamp: {
		         created: {
		            DAY: "Oprettet ${EEEE} kl. ${time}",
		            MONTH: "Oprettet ${MMM} ${d}",
		            TODAY: "Oprettet i dag kl. ${time}",
		            YEAR: "Oprettet ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Oprettet i går kl. ${time}",
		            TOMORROW: "Oprettet ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Opdateret ${EEEE} kl. ${time}",
		            MONTH: "Opdateret ${MMM} ${d}",
		            TODAY: "Opdateret i dag kl. ${time}",
		            YEAR: "Opdateret ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Opdateret i går kl. ${time}",
		            TOMORROW: "Opdateret ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Offentlig",
		         priv: "Privat"
		      },
		      action: {
		         created: "Oprettet",
		         updated: "Opdateret"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Få opdateringer på hjemmesiden og i et e-mailresumé om personer, du følger.",
		      profile_title: "Åbn profilen for ${user}.",
		      profile_a11y: "Klik på dette link for at åbne profilen for ${user} i et nyt vindue.",
		      error: "Der er opstået en fejl. ${again}.",
		      error_again: "Prøv igen.",
		      error_404: "Netværksanmodningen findes ikke længere.",
		      warning: "Advarsel",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "I er nu netværkskontakter.",
		            	follow: "I er nu netværkskontakter, og du følger ${user}."
		            },
		            ignore: {
		            	nofollow: "Du har ignoreret invitationen.",
		            	follow: "Du har ignoreret invitationen, men følger nu ${user}."
		            }
		         },
		         error: {
		            accept: "Der er opstået en fejl under accept af anmodningen.",
		            ignore: "Der er opstået en fejl under ignorering af anmodningen."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} kl. ${time}",
		              MONTH: "${d}. ${MMM}",
		              TODAY: "I dag kl. ${time}",
		              YEAR: "${d}. ${MMM} ${YYYY}",
		              YESTERDAY: "I går kl. ${time}",
		              TOMORROW: "${d}. ${MMM} ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Klik på dette link for at åbne ${name} i et nyt vindue.",
		      tooltip: "Åbn ${name} i applikationen Filer",
		      profile_title: "Åbn profilen for ${user}.",
		      profile_a11y: "Klik på dette link for at åbne profilen for ${user} i et nyt vindue.",
		      download_tooltip: "Download denne fil (${0})",
		      following: {
		         add: "Følg fil",
		         remove: "Hold op med at følge",
		         title: "Skift mellem modtagelse af opdateringer om denne fil eller ej"
		      },
		      share: {
		         label: "Del",
		         title: "Giv andre adgang til denne fil"
		      },
		      timestamp: {
		         created: {
		            DAY: "Oprettet ${EEEE} kl. ${time}",
		            MONTH: "Oprettet ${MMM} ${d}",
		            TODAY: "Oprettet i dag kl. ${time}",
		            YEAR: "Oprettet ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Oprettet i går kl. ${time}",
		            TOMORROW: "Oprettet ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "Oprettet af ${user} ${EEEE} kl. ${time}",
		            MONTH: "Oprettet af ${user} ${MMM} ${d}",
		            TODAY: "Oprettet af ${user} i dag kl. ${time}",
		            YEAR: "Oprettet af ${user} ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Oprettet af ${user} i går kl. ${time}",
		            TOMORROW: "Oprettet af ${user} ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Opdateret ${EEEE} kl. ${time}",
		            MONTH: "Opdateret ${MMM} ${d}",
		            TODAY: "Opdateret i dag kl. ${time}",
		            YEAR: "Opdateret ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Opdateret i går kl. ${time}",
		            TOMORROW: "Opdateret ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "Opdateret af ${user} ${EEEE} kl. ${time}",
		            MONTH: "Opdateret af ${user} ${MMM} ${d}",
		            TODAY: "Opdateret af ${user} i dag kl. ${time}",
		            YEAR: "Opdateret af ${user} ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Opdateret af ${user} i går kl. ${time}",
		            TOMORROW: "Opdateret af ${user} ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Oprettet: ${EEEE} kl. ${time}",
		            MONTH: "Oprettet: ${MMM} ${d}",
		            TODAY: "Oprettet: I dag kl. ${time}",
		            YEAR: "Oprettet: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Oprettet: I går kl. ${time}",
		            TOMORROW: "Oprettet: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Opdateret: ${EEEE} kl. ${time}",
		            MONTH: "Opdateret: ${MMM} ${d}",
		            TODAY: "Opdateret: I dag kl. ${time}",
		            YEAR: "Opdateret: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Opdateret: I går kl. ${time}",
		            TOMORROW: "Opdateret: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} af ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} af ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Download denne fil (${size})",
		      	 DOWNLOAD_ALT: "Download"
		      },
		      PREVIEW: {
		         LINK: "Forhåndsvis",
		         TITLE: "Vis filen i et nyt vindue."
		      },
		      TAGS: "Emneord:",
		      error: "Der er opstået en fejl. ${again}.",
		      error_again: "Prøv igen.",
		      error_404: "Filen findes ikke længere, eller du har ikke tilstrækkelige tilladelser til at få adgang til den.",
		      error_403: "Du har ikke tilladelse til at se denne fil. Filen er ikke offentlig, og den deles ikke med dig.",
		      notifications: {
		         USER_SHARED: "${user} skrev:",
		         CHANGE_SUMMARY: "${user} leverede et ændringsresumé",
		         NO_CHANGE_SUMMARY: "${user} leverede ikke et ændringsresumé",
		         COMMENTED: "${user} har kommenteret"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Tjekket ud af dig",
		      checkedout_other: "Tjekket ud af ${user}",
		      tooltip: "Åbn filen ${name} i biblioteket",
		      draft_404_info: "Kladden er slettet eller er ikke længere delt med dig. Den publicerede version er nu den seneste version af filen.",
		      error_404: "Filen er slettet eller er ikke længere delt med dig.",
		      error_403: "Filen er slettet eller er ikke længere delt med dig.",
		      error_preview: "Filen er ikke længere tilgængelig til eksempelvisning.",
		      draft_review_canceled: "Gennemgang er annulleret, og kladden er ikke længere delt med dig. Din gennemgang er ikke længere ønsket.",
		      switch_ee: "Vis kladde",
		      switch_ee_tooltip: "Vis den seneste kladde for denne fil"
		   },
		   ecm_draft: {
		      tooltip: "Åbn kladden ${name} i biblioteket",
		      community_owners: "Fællesskabsejere",
		      draft: "Kladde",
		      draft_tooltip: "Viser kladde",
		      draft_general_info: "Den forrige kladde findes ikke længere, og en nyere kladde er nu den seneste version.",
		      draft_review_404_general_info: "En af korrekturlæserne har allerede stemt. Der er ikke længere noget ønske om, at du skal gennemgå kladden.",
		      draft_review_404_request_info: "Den forrige kladde findes ikke længere, og den seneste kladde er sendt til gennemgang. Din gennemgang er ønsket.",
		      draft_review_404_require_info: "Den forrige kladde findes ikke længere, og den seneste kladde er sendt til gennemgang. Din gennemgang er påkrævet.",
		      draft_review_request_info: "Din gennemgang er ønsket.",
		      draft_review_require_info: "Din gennemgang er påkrævet.",
		      error_404: "Kladden er slettet eller er ikke længere delt med dig.",
		      error_403: "Du kan ikke se denne kladde, fordi den ikke deles med dig.",
		      error_preview: "Kladden er ikke længere tilgængelig til eksempelvisning.",
		      switch_ee: "Vis publiceret version",
		      switch_ee_tooltip: "Vis den publicerede version af denne fil",
		      review: "Gennemgang",
		      reviewers: "Korrekturlæsere",
		      reviwers_addtl: "Yderligere korrekturlæsere",
		      in_review: "Kladde under gennemgang",
		      in_review_tooltip: "Viser kladder under gennemgang",
		      review_required_any: "Fællesskabsejere kræver, at én korrekturlæser gennemgår denne kladde.",
		      review_required_all: "Fællesskabsejere kræver, at alle korrekturlæsere gennemgår denne kladde.",
		      review_required_generic: "Fællesskabsejere kræver, at følgende korrekturlæsere gennemgår denne kladde.",
		      review_additional_required: "Alle korrekturlæsere, som kladdeafsenderen har tilføjet, skal gennemgå denne kladde.",
		      reivew_submitted_date: {
		         DAY: "${user} sendte kladden til gennemgang ${EEEE} kl. ${time}.",
		         MONTH: "${user} sendte kladden til gennemgang ${d} ${MMM}.",
		         TODAY: "${user} sendte kladden til gennemgang i dag kl. ${time}.",
		         YEAR: "${user} sendte kladden til gennemgang ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "${user} sendte kladden til gennemgang i går kl. ${time}.",
		         TOMORROW: "${user} sendte kladden til gennemgang ${d} ${MMM} ${YYYY}."
		      },
		      pending: "Venter",
		      pending_rejected: "Der kræves ikke længere gennemgang, fordi kladden blev afvist",
		      approve: "Godkend",
		      approved: "Godkendt",
		      approve_tooltip: "Godkend denne kladde",
		      accept_success: "Du har godkendt denne kladde.",
		      accept_error: "Der er opstået en fejl under godkendelse af kladden. Prøv igen.",
		      accept_info: "Du godkendte denne kladde.",
		      reject: "Afvis",
		      rejected: "Afvist",
		      reject_tooltip: "Afvis denne kladde",
		      reject_success: "Du har afvist denne kladde.",
		      reject_error: "Der er opstået en fejl under afvisning af kladden. Prøv igen.",
		      reject_info: "Du har afvist denne kladde."
		   },
		   authUser: {
		      error: "Der er opstået en fejl under hentning af den aktuelle bruger. ${again}.",
		      error_again: "Prøv igen.",
		      error_404: "Kan ikke finde valideret bruger.",
		      error_403: "Du har ikke tilladelse til at hente brugeroplysninger."
		   },
		   forum: {
		      error: "Der er opstået en fejl. ${again}.",
		      error_again: "Prøv igen.",
		      error_404: "Forummet findes ikke længere, eller du har ikke tilstrækkelige tilladelser til at få adgang til det.",
		      error_403: "Du har ikke tilladelse til at se dette forum. Forummet er ikke offentligt, og det deles ikke med dig.",
		      readMore: "Vis hele emnet...",
		      readMore_tooltip: "Åbn forumemnet ${name}.",
		      readMore_a11y: "Klik på dette link for at åbne forumemnet ${name} i et nyt vindue.",
		      QUESTION_ANSWERED: "Spørgsmålet er besvaret.",
		      QUESTION_NOT_ANSWERED: "Spørgsmålet er endnu ikke besvaret.",
		      attachments: "${count} vedhæftninger",
		      attachments_one: "${count} vedhæftning"
		   },
		   blog: {
		      error: "Der er opstået en fejl. ${again}.",
		      error_again: "Prøv igen.",
		      error_404: "Bloggen findes ikke længere, eller du har ikke tilstrækkelige tilladelser til at få adgang til den.",
		      error_403: "Du har ikke tilladelse til at se denne blog. Bloggen er ikke offentlig, og den deles ikke med dig.",
		      readMore: " Læs mere...",
		      readMore_tooltip: "Åbn blogindlægget ${name}.",
		      readMore_a11y: "Klik på dette link for at åbne blogindlægget ${name} i et nyt vindue.",
		      graduated: "Vedtaget",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Stem</a>",
		  					TOOLTIP: 	"Stem på dette"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Stemt</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Stemt</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Stemt - Fortryd' href='javascript:;' id='TOGGLE_${id}'>Fortryd</a>",
		  					TOOLTIP: 	"Fjern din stemme fra dette"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 personer har stemt på dette"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 person har stemt på dette"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} har stemt på dette"
		  				}
		  			},
		  			LOADING: "Indlæser...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Stemt"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Din stemme kan ikke gemmes, fordi du enten har nået grænsen for antal stemmer, eller fordi idéen ikke længere er tilgængelig for dig.",
		      readMore_tooltip: "Åbn ideen ${name}.",
		      readMore_a11y: "Klik på dette link for at åbne ideen ${name} i et nyt vindue."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Svar",
		      THIS_ARIA_LABEL: "Dette svar",
		      THIS_TAB_TITLE: "Dette svar",
		      TAB_TITLE: "Svar (${0})",
		      REPLY_TO_REPLY: "Som svar på ${thisReply}",
		      REPLY_TO_TOPIC: "Som svar på ${thisTopic}",
		      THIS_TOPIC: "dette emne",
		      THIS_REPLY: "dette svar",
		      NAVIGATE_TO_REPLY: "Navigér til det overordnede svar",
		      NAVIGATE_TO_TOPIC: "Navigér til det overordnede emne",
		      ADD_COMMENT: "Svar på dette emne",
		      ADD_COMMENT_TOOLTIP: "Svar på dette forumemne",
		      SHOWING_RECENT_REPLIES: "Viser de ${0} seneste svar",
		      PREV_COMMENTS: "Vis flere svar",
		      PLACEHOLDER_TXT: "Svar på dette emne",
		      EMPTY: "Der er ingen svar.",
		      TRIM_LONG_COMMENT: "Vil du gøre svaret kortere?",
		      WARN_LONG_COMMENT: "Svaret er for langt. ${shorten}",
		      ERROR: "Der er opstået en fejl under hentning af svarene. ${again}",
		      ERROR_CREATE: "Dit svar kan ikke gemmes. Prøv igen senere.",
		      ERROR_CREATE_NOT_FOUND: "Svaret kan ikke gemmes, fordi emnet er slettet eller ikke længere er synligt for dig.",
		      ERROR_CREATE_ACCESS_DENIED: "Svaret kan ikke gemmes, fordi emnet er slettet eller ikke længere er synligt for dig.",
		      ERROR_CREATE_TIMEOUT: "Svaret kan ikke gemmes, fordi serveren ikke kan kontaktes. Klik på Gem for at prøve igen.",
		      ERROR_CREATE_CANCEL: "Svaret kan ikke gemmes, fordi anmodningen er annulleret. Klik på Gem for at prøve igen.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Du skal være logget på for at oprette dette svar. Klik på Gem for at blive spurgt, om du vil logge på.",
		      ERROR_NO_CONTENT: "Skriv dit svar, og klik på Gem. Hvis du ikke længere vil skrive et svar, skal du klikke på Annullér.",
		      ERROR_UNAUTHORIZED: "Dit svar kan ikke gemmes, fordi du ikke har tilladelse til at efterlade et svar.",
		      COMMENT_DELETED: {
		         DAY: "Svar slettet af ${user} ${EEEE} kl. ${time}",
		         MONTH: "Svar slettet af ${user} ${MMM} ${d}",
		         TODAY: "Svar slettet af ${user} i dag kl. ${time}",
		         YEAR: "Svar slettet af ${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Svar slettet af ${user} i går kl. ${time}",
		         TOMORROW: "Svar slettet af ${user} ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Årsag til sletning: ${reason}",
		      REPLY_TITLE: "Vedr.: ${0}",
		      SHOW_FULL_REPLY: "Vis hele svaret",
		      SHOW_FULL_REPLY_TOOLTIP: "Navigér til det oprindelige svar i forumemnet",
		      REPLY_ACTION: "Svar",
		      REPLY_ACTION_TOOLTIP: "Svar på dette indlæg",
		      MODERATION_PENDING: "Svaret afventer korrektur.",
		      MODERATION_QUARANTINED: "Indlægget er sat i karantæne af moderatoren.",
		      MODERATION_REMOVED: {
		         DAY: "Svaret er fjernet af ${user} ${EEEE} kl. ${time}.",
		         MONTH: "Svaret er fjernet af ${user} ${MMM} ${d}.",
		         TODAY: "Svaret er fjernet af ${user} i dag kl. ${time}.",
		         YEAR: "Svaret er fjernet af ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Svaret er fjernet af ${user} i går kl. ${time}.",
		         TOMORROW: "Svaret er fjernet af ${user} ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Svaret er afvist af ${user} ${EEEE} kl. ${time}.",
		         MONTH: "Svaret er afvist af ${user} ${MMM} ${d}.",
		         TODAY: "Svaret er afvist af ${user} i dag kl. ${time}.",
		         YEAR: "Svaret er afvist af ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Svaret er afvist af ${user} i går kl. ${time}.",
		         TOMORROW: "Svaret er afvist af ${user} ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Dit svar er sendt til gennemgang og vil blive gjort tilgængelig, når den er godkendt."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Kommentarer",
		      PLACEHOLDER_TXT: "Tilføj en kommentar",
		      TAB_TITLE: "Kommentarer (${0})",
		      ACTION_NOT_SUPPORTED: "Handlingen understøttes ikke",
		      ADD_COMMENT: "Tilføj en kommentar",
		      ADD_COMMENT_TOOLTIP: "Tilføj en kommentar til elementet",
		      CANCEL: "Annullér",
		      COMMENT_COUNT_ONE: "${0} kommentar",
		      COMMENT_COUNT_MANY: "${0} kommentarer",
		      COMMENT_LABEL: "Kommentar:",
		      DELETE: "Slet",
		      DELETE_TOOLTIP: "Slet kommentar",
		      DELETEREASON: "Årsag til sletning af kommentaren:",
		      DIALOG_TITLE: "Forkort kommentar",
		      TOOLTIP: "Forkort kommentar",
		      NAME: "Forkort kommentar",
		      EDIT: "Redigér",
		      EDIT_TOOLTIP: "Redigér kommentar",
		      ERROR_CREATE: "Kommentaren kan ikke gemmes. Prøv igen senere.",
		      ERROR_CREATE_NOT_FOUND: "Kommentaren kan ikke gemmes, fordi elementet er slettet eller ikke længere er synligt for dig.",
		      ERROR_CREATE_ACCESS_DENIED: "Kommentaren kan ikke gemmes, fordi elementet er slettet eller ikke længere er synligt for dig.",
		      ERROR_CREATE_TIMEOUT: "Kommentaren kan ikke gemmes, fordi serveren ikke kan kontaktes. Klik på Slå op for at prøve igen.",
		      ERROR_CREATE_CANCEL: "Kommentaren kan ikke gemmes, fordi anmodningen er annulleret. Klik på Slå op for at prøve igen.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Du skal være logget på for at oprette denne kommentar. Klik på Slå op for at blive spurgt, om du vil logge på.",
		      ERROR_DELETE: "Kommentaren kan ikke slettes. Prøv igen senere.",
		      ERROR_DELETE_TIMEOUT: "Kommentaren kan ikke slettes, fordi serveren ikke kan kontaktes. Klik på Slet for at prøve igen.",
		      ERROR_DELETE_NOT_FOUND: "Kommentaren kan ikke slettes, fordi kommentaren eller elementet er slettet eller ikke længere er synlig for dig.",
		      ERROR_DELETE_ACCESS_DENIED: "Kommentaren kan ikke slettes, fordi elementet er slettet eller ikke længere er synligt for dig.",
		      ERROR_DELETE_CANCEL: "Kommentaren kan ikke slettes, fordi anmodningen er annulleret. Klik på Slet for at prøve igen.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Du skal være logget på for at slette denne kommentar. Klik på Slet for at blive spurgt, om du vil logge på.",
		      ERROR_EDIT: "Kommentaren kan ikke opdateres. Prøv igen senere.",
		      ERROR_EDIT_ACCESS_DENIED: "Kommentaren kan ikke opdateres, fordi elementet er slettet eller ikke længere er synligt for dig.",
		      ERROR_EDIT_NOT_FOUND: "Kommentaren kan ikke opdateres, fordi elementet er slettet eller ikke længere er synligt for dig.",
		      ERROR_EDIT_TIMEOUT: "Kommentaren kan ikke opdateres, fordi serveren ikke kan kontaktes. Klik på Slå op for at prøve igen.",
		      ERROR_EDIT_CANCEL: "Kommentaren kan ikke opdateres, fordi anmodningen er annulleret. Klik på Slå op for at prøve igen.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Du skal være logget på for at redigere denne kommentar. Klik på Slå op for at blive spurgt, om du vil logge på.",
		      ERROR_NO_CONTENT: "Skriv din kommentar, og klik på Slå op. Hvis du ikke længere vil skrive en kommentar, skal du klikke på Annullér.",
		      ERROR_NO_CONTENT_EDIT: "Skriv din kommentar, og klik på Slå op. Hvis du ikke længere vil redigere din kommentar, skal du klikke på Annullér.",
		      ERROR_UNAUTHORIZED: "Din kommentar kan ikke gemmes, fordi du ikke har tilladelse til at efterlade en kommentar.",
		      ERROR_GENERAL: "Der er opstået en fejl.",
		      OK: "OK",
		      YES: "Ja",
		      TRIM_LONG_COMMENT: "Vil du gøre kommentaren kortere?",
		      WARN_LONG_COMMENT: "Kommentaren er for lang. ${shorten}",
		      LINK: "Link",
		      SAVE: "Gem",
		      POST: "Slå op",
		      SHOWMORE: "Læs mere...",
		      VIEW_COMMENTS_FILE: "Vis kommentarer til denne fil",
		      SUBSCRIBE_TO_COMMENTS: "Abonnér på disse kommentarer",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Du kan følge ændringerne af disse kommentarer i din feedlæser",
		      PROFILE_TITLE: "Åbn profilen for ${user}.",
		      PROFILE_A11Y: "Klik på dette link for at åbne profilen for ${user} i et nyt vindue.",
		      MODERATION_PENDING: "Kommentaren afventer korrektur.",
		      MODERATION_REMOVED: {
		         DAY: "Kommentaren er fjernet af ${user} ${EEEE} kl. ${time}.",
		         MONTH: "Kommentaren er fjernet af ${user} ${MMM} ${d}.",
		         TODAY: "Kommentaren er fjernet af ${user} i dag kl. ${time}.",
		         YEAR: "Kommentaren er fjernet af ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Kommentaren er fjernet af ${user} i går kl. ${time}.",
		         TOMORROW: "Kommentaren er fjernet af ${user} ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Kommentaren er afvist af ${user} ${EEEE} kl. ${time}.",
		         MONTH: "Kommentaren er afvist af ${user} ${MMM} ${d}.",
		         TODAY: "Kommentaren er afvist af ${user} i dag kl. ${time}.",
		         YEAR: "Kommentaren er afvist af ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Kommentaren er afvist af ${user} i går kl. ${time}.",
		         TOMORROW: "Kommentaren er afvist af ${user} ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Vis forrige kommentarer",
		      EMPTY: "Der er ingen kommentarer.",
		      ERROR_ALT: "Fejl",
		      ERROR: "Der er opstået en fejl under hentning af kommentarerne. ${again}",
		      ERROR_ADDTL: "Der er opstået en fejl under hentning af yderligere kommentarer. ${again}",
		      ERROR_AGAIN: "Prøv igen.",
		      ERROR_AGAIN_TITLE: "Gentag anmodningen om flere kommentarer.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} kl. ${time} (version ${version})",
		         MONTH: "${user} ${MMM} ${d} (version ${version})",
		         TODAY: "${user} i dag kl. ${time} (version ${version})",
		         YEAR: "${user} ${d}. ${MMM} ${YYYY} (version ${version})",
		         YESTERDAY: "${user} i går kl. ${time} (version ${version})",
		         TOMORROW: "${user} ${d}. ${MMM} ${YYYY} (version ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} kl. ${time}",
		         MONTH: "${user} ${d} ${MMM}",
		         TODAY: "${user} i dag kl. ${time}",
		         YEAR: "${user} ${d}. ${MMM} ${YYYY}",
		         YESTERDAY: "${user} i går kl. ${time}",
		         TOMORROW: "${user} ${d}. ${MMM} ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} kl. ${time}",
		         MONTH: "${d}. ${MMM}",
		         TODAY: "I dag kl. ${time}",
		         YEAR: "${d}. ${MMM} ${YYYY}",
		         YESTERDAY: "I går kl. ${time}",
		         TOMORROW: "${d}. ${MMM} ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Kommentar slettet af ${user} ${EEEE} kl. ${time}",
		         MONTH: "Kommentar slettet af ${user} ${d}. ${MMM}",
		         TODAY: "Kommentar slettet af ${user} i dag kl. ${time}",
		         YEAR: "Kommentar slettet af ${user} ${d}. ${MMM} ${YYYY}",
		         YESTERDAY: "Kommentar slettet af ${user} i går kl. ${time}",
		         TOMORROW: "Kommentar slettet af ${user} ${d}. ${MMM} ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "Redigeret af ${user} ${EEEE} kl. ${time} (version ${version})",
		         MONTH: "Redigeret af ${user} ${MMM} ${d} (version ${version})",
		         TODAY: "Redigeret af ${user} i dag kl. ${time} (version ${version})",
		         YEAR: "Redigeret af ${user} ${d}. ${MMM} ${YYYY} (version ${version})",
		         YESTERDAY: "Redigeret af ${user} i går kl. ${time} (version ${version})",
		         TOMORROW: "Redigeret af ${user} ${d}. ${MMM} ${YYYY} (version ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "Redigeret af ${user} ${EEEE} kl. ${time}",
		         MONTH: "Redigeret af ${user} ${MMM} ${d}",
		         TODAY: "Redigeret af ${user} i dag kl. ${time}",
		         YEAR: "Redigeret af ${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Redigeret af ${user} i går kl. ${time}",
		         TOMORROW: "Redigeret af ${user} ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Er du sikker på, at du vil slette denne kommentar?",
		      FLAG_ITEM: {
		         BUSY: "Gemmer...",
		         CANCEL: "Annullér",
		         ACTION: "Markér som upassende",
		         DESCRIPTION_LABEL: "Angiv en årsag til at markere dette element (valgfrit)",
		         EDITERROR: "Filens metadata er ikke redigeret på grund af en fejl",
		         OK: "Gem",
		         ERROR_SAVING: "Der opstod en fejl under behandling af anmodningen. Prøv igen senere.",
		         SUCCESS_SAVING: "Flaget er blevet sendt. En moderator vil snarest undersøge det.",
		         TITLE: "Markér dette element som upassende",
		         COMMENT: {
		            TITLE: "Markér denne kommentar som upassende",
		            A11Y: "Denne knap åbner en dialogboks, hvor brugeren kan markere kommentaren som upassende."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Annullér",
		      DIALOG_TITLE: "Slet kommentar",
		      NAME: "Slet kommentar",
		      OK: "OK",
		      TOOLTIP: "Slet kommentar"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Annullér",
		      CONFIRM: "Hvis du gør kommentaren kortere, fjernes tekst ud over størrelsesgrænsen. Klik på OK for at gøre kommentaren kortere eller Annullér for selv at redigere den.",
		      DIALOG_TITLE: "Forkort kommentar",
		      NAME: "Forkort kommentar",
		      OK: "OK",
		      TOOLTIP: "Forkort kommentar"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Afsendelse bekræftet",
		      CONFIRM: "Din kommentar er sendt til gennemgang og vil blive gjort tilgængelig, når den er godkendt.",
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
		      ADDED: { DAY: "Tilføjet ${EEee} kl. ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Tilføjet ${date_long}",
		         TODAY: "Tilføjet i dag kl. ${time}",
		         YEAR: "Tilføjet ${date_long}",
		         YESTERDAY: "Tilføjet i går kl. ${time}"
		      },
		      LAST_UPDATED: { DAY: "Sidst opdateret ${EEee} kl. ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Sidst opdateret ${date_long}",
		         TODAY: "Sidst opdateret i dag kl. ${time}",
		         YEAR: "Sidst opdateret ${date_long}",
		         YESTERDAY: "Sidst opdateret i går kl. ${time}"
		      },
		      MONTHS_ABBR: { 0: "JAN",
		         10: "NOV",
		         11: "DEC",
		         1: "FEB",
		         2: "MAR",
		         3: "APR",
		         4: "MAJ",
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
		      RELATIVE_TIME: { DAY: "${EEee} kl. ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "I dag kl. ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "I går kl. ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} kl. ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "I dag kl. ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "I går kl. ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} kl. ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} kl. ${time}",
		         TODAY: "${date_short} kl. ${time}",
		         YEAR: "${date_short} kl. ${time}",
		         YESTERDAY: "${date_short} kl. ${time}",
		         TOMORROW: "${date_short} kl. ${time}"
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
		      UPDATED: { DAY: "Opdateret ${EEee} kl. ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Opdateret ${date_long}",
		         TODAY: "Opdateret i dag kl. ${time}",
		         YEAR: "Opdateret ${date_long}",
		         YESTERDAY: "Opdateret i går kl. ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Kan ikke uploade versionsoplysninger",
		      ERROR_REQUEST_CANCELLED: "Anmodningen er annulleret.",
		      ERROR_REQUEST_TIMEOUT: "Serveren kan ikke kontaktes.",
		      ERROR_REQUEST_UNKNOWN: "Der er opstået en ukendt fejl.",
		      LOADING: "Indlæser...",
		      NO_VERSIONS: "Der er ingen versioner",
		      INFO: "Version ${0} oprettet ${1} af ",
		      VERSION_NUMBER: "Version ${0}",
		      DELETED: "Slettet",
		      DELETE_ALL: "Slet alle versioner før version",
		      DELETE_VERSION_SINGLE: "Slet version ${0}",
		      DELETEERROR: "Versionen er ikke slettet på grund af en fejl.",
		      CREATE_VERSION: "Opret en ny version",
		      CREATE_VERSION_TOOLTIP: "Opret en version af dette dokument",
		      REVERT_VERSION: "Gendan version ${0}",
		      REVERT_DESCRIPTION: "Gendannet fra version ${0}",
		      PREVIOUS: "Forrige",
		      PREVIOUS_TOOLTIP: "Forrige side",
		      ELLIPSIS: "...",
		      NEXT: "Næste",
		      NEXT_TOOLTIP: "Næste side",
		      COUNT: "${0}-${1} af ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Side",
		      SHOW: "Vis",
		      ITEMS_PER_PAGE: " elementer pr. side.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "I dag kl. ${time}",
		            YESTERDAY: "I går kl. ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} kl. ${time}",
		            YEAR: "${date_short} kl. ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} kl. ${time}",
		            TODAY: "i dag kl. ${time}",
		            YESTERDAY: "i går kl. ${time}"
		        },
		        UPDATED: { DAY: "Opdateret ${EEee} kl. ${time}",
		            YEAR: "Opdateret ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Opdateret ${date_short}",
		            TODAY: "Opdateret i dag kl. ${time}",
		            YESTERDAY: "Opdateret i går kl. ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Slet version ${0}",
		         DOWNLOAD: "Download",
		         DOWNLOAD_TOOLTIP: "Download denne version (${0})",
		         VIEW: "Vis",
		         VIEW_TOOLTIP: "Vis version ${0}",
		         REVERT: {
		            A11Y: "Denne knap åbner en dialogboks, hvor brugeren kan bekræfte gendannelsen af en fil fra en tidligere version. Hvis du bekræfter denne funktion, opfriskes indholdet på siden.",
		            FULL: "Gendan",
		            WIDGET: "Gendan denne version"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Versionen kan ikke slettes, fordi den allerede er slettet eller ikke længere er synlig for dig.",
		         ERROR_ACCESS_DENIED: "Versionen kan ikke slettes, fordi du ikke er redaktør.",
		         ERROR_TIMEOUT: "Versionen er ikke slettet, fordi serveren ikke kan kontaktes. Klik på Slet igen for at gentage anmodningen.",
		         ERROR_CANCEL: "Versionen er ikke slettet, fordi anmodningen er annulleret. Klik på Slet igen for at gentage anmodningen.",
		         ERROR_NOT_LOGGED_IN: "Du skal være logget på for at slette denne version. Klik på Slet for at blive spurgt, om du vil logge på.",
		         GENERIC_ERROR: "Versionen kan ikke slettes på grund af en ukendt fejl. Klik på Slet igen for at gentage anmodningen.",
		         FULL: "Slet",
		         A11Y: "Denne knap åbner en dialogboks, hvor brugeren kan bekræfte sletningen af denne version. Hvis du bekræfter denne funktion, opfriskes indholdet på siden."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Versionen kan ikke gendannes, fordi den er slettet eller ikke længere er synlig for dig.",
		         ERROR_ACCESS_DENIED: "Versionen kan ikke gendannes, fordi du ikke er redaktør.",
		         ERROR_NAME_EXISTS: "Versionen kan ikke gendannes, fordi en anden fil har samme navn.",
		         ERROR_TIMEOUT: "Versionen er ikke gendannet, fordi serveren ikke kan kontaktes. Klik på Gendan igen for at gentage anmodningen.",
		         ERROR_CANCEL: "Versionen er ikke gendannet, fordi anmodningen er annulleret. Klik på Gendan igen for at gentage anmodningen.",
		         ERROR_QUOTA_VIOLATION: "Versionen kan ikke gendannes på grund af pladsbegrænsninger.",
		         ERROR_MAX_CONTENT_SIZE: "Versionen kan ikke gendannes, fordi den er større end den maksimalt tilladte filstørrelse, som er ${0}",
		         GENERIC_ERROR: "Versionen kan ikke gendannes på grund af en ukendt fejl. Klik på Gendan igen for at gentage anmodningen."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Se, hvem der har downloadet...",
		      PREVIOUS: "Forrige",
		      PREVIOUS_TOOLTIP: "Forrige side",
		      ELLIPSIS: "...",
		      NEXT: "Næste",
		      NEXT_TOOLTIP: "Næste side",
		      COUNT: "${0}-${1} af ${2}",
		      COUNT_SHORT: "${0} - ${1}",
		      PAGE: "Side",
		      SHOW: "Vis",
		      ITEMS_PER_PAGE: " elementer pr. side.",
		      VERSION: {
		         DAY: "Version ${version} den ${date}",
		         MONTH: "Version ${version} den ${date}",
		         TODAY: "Version ${version} kl. ${time}",
		         YEAR: "Version ${version} den ${date}",
		         YESTERDAY: "Version ${version} i går"
		      },
		      FILE: {
		         V_LATEST: "Du har downloadet den seneste version af filen",
		         V_OLDER: "Du downloadede sidst version ${0} af filen",
		         LOADING: "Indlæser...",
		         EMPTY: "Kun anonyme brugere",
		         ERROR: "Kan ikke downloade oplysninger"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Fejl",
		      ERROR_ALT_TEXT: "Fejl:",
		      ERROR_MSG_GENERIC: "Der er sket en fejl. Prøv igen.",
		      ERROR_MSG_NOT_AVAILABLE: "Elementet er slettet eller er ikke længere tilgængeligt.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Indholdet af dette element er ikke længere tilgængeligt.",
		      ERROR_MSG_NO_ACCESS: "Du har ikke længere adgang til elementet.",
		      LOADING: "Indlæser...",
		      TITLE_SU: "${author} slog en meddelelse op.",
		      TITLE_NI: "${author} har inviteret dig til at deltage i sit netværk.",
		      AUTHOR_TITLE: "Vis profil for ${author}",
		      OPEN_LINK: "Åbn ${title}",
		      CONFIRM_CLOSE_TITLE: "Bekræft",
		      CONFIRM_CLOSE_MESSAGE: "Er du sikker på, at du vil kassere ændringerne? Klik på OK for at fortsætte eller Annullér for at returnere.",
		      OK: "OK",
		      CANCEL: "Annullér"
		   },
		   MESSAGE: {
		      SUCCESS: "Bekræftelse",
		      ERROR: "Fejl",
		      ERROR_ALT_TEXT: "Fejl:",
		      INFO: "Information",
		      WARNING: "Advarsel",
		      DISMISS: "Skjul denne meddelelse",
		      MORE_DETAILS: "Flere detaljer",
		      HIDE_DETAILS: "Skjul detaljer"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Oprettet: ${EEEE} kl. ${time}",
		           MONTH: "Oprettet: ${MMM} ${d}",
		           TODAY: "Oprettet: I dag kl. ${time}",
		           YEAR: "Oprettet: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Oprettet: I går kl. ${time}",
		           TOMORROW: "Oprettet: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Der er opstået en fejl. ${again}.",
		      error_again: "Prøv igen.",
		      error_404: "Statusopdateringen findes ikke længere.",
		      notifications: {
		         STATUS_UPDATE: "${user} slog en meddelelse op",
		         USER_BOARD_POST: "${user} har skrevet på din tavle",
		         POST_COMMENT: "${user} skrev:"
		      }
		   },
		   login: {
		      error: "Dit brugernavn og/eller kodeord passer ikke til nogen eksisterende konti. Prøv igen.",
		      logIn: "Log på",
		      password: "Kodeord:",
		      user: "Brugernavn:",
		      welcome: "Log på HCL Connections"
		   },
		   repost: {
		      name: "Genopslå",
		      title: "Slå denne opdatering op igen for mine følgere eller fællesskaber",
		      msg_success: "Opdateringen er genopslået til dine følgere.",
		      msg_generic: "Der er sket en fejl. Prøv igen."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Tilføj",
		      ADD_TXT: "Tilføj personer eller fællesskaber som læsere",
		      SHOW_MORE: "Vis mere...",
		      READER_IF_PUBLIC: "Alle (offentlig)",
		      READER_IF_PUBLIC_TOOLTIP: "Denne fil er offentlig og synlig for alle",
		      EMPTY_READERS: "Ingen",
		      READERS_LABEL: "Læsere:\u00a0",
		      EDITORS_LABEL: "Redaktører:\u00a0",
		      OWNER_LABEL: "Ejer:\u00a0",
		      ERROR: "Kan ikke dele oplysninger",
		      ERROR_NOT_FOUND: "Den fil, du har anmodet om, er slettet eller flyttet. Hvis en person har sendt dig dette link, kan du undersøge, om det er korrekt.",
		      ERROR_ACCESS_DENIED: "Du har ikke tilladelse til at se denne fil. Filen er ikke offentlig, og den deles ikke med dig.",
		      SHARE: "Del",
		      CANCEL: "Annullér",
		      SHARE_WITH: "Del med:",
		      PERSON: "en person",
		      COMMUNITY: "et fællesskab",
		      PLACEHOLDER: "Personnavn eller e-mail...",
		      MESSAGE: "Besked:",
		      MESSAGE_TXT: "Tilføj en valgfri besked",
		      REMOVE_ITEM_ALT: "Fjern ${0}",
		      NO_MEMBERS: "Ingen",
		      A11Y_READER_ADDED: "${0} er valgt som læser",
		      A11Y_READER_REMOVED: "${0} er fjernet som læser",
		      SELF_REFERENCE_ERROR: "Du kan ikke dele med dig selv.",
		      OWNER_REFERENCE_ERROR: "Du kan ikke dele med ejeren af filen.",
		      SHARE_COMMUNITY_WARN: "Deling med det offentlige fællesskab '${0}' vil gøre denne fil offentlig.",
		      SELECT_USER_ERROR: "Du skal vælge mindst én person eller fællesskab, du vil dele med",
		      WARN_LONG_MESSAGE: "Beskeden er for lang.",
		      TRIM_LONG_MESSAGE: "Vil du gøre beskeden kortere?",
		      ERROR_SHARING: "Filen kan ikke deles. Prøv igen senere.",
		      INFO_SUCCESS: "Filen deles.",
		      MAX_SHARES_ERROR: "Det maksimale antal delinger er overskredet.",
		      NOT_LOGGED_IN_ERROR: "Filen er ikke delt, fordi du ikke er logget på. Klik på Del for at dele filen.",
		      TIMEOUT_ERROR: "Filen er ikke delt, fordi serveren ikke kan kontaktes. Klik på Del for at prøve igen.",
		      CANCEL_ERROR: "Filen er ikke delt, fordi anmodningen er annulleret. Klik på Del for at prøve igen.",
		      NOT_FOUND_ERROR: "Filen er slettet eller er ikke længere synlig for dig og kan ikke deles.",
		      ACCESS_DENIED_ERROR: "Du har ikke længere tilladelse til at dele denne fil.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "En begrænset fil kan ikke gøres offentlig.",
		      TOOLTIP: "Giv andre adgang til denne fil"
		   },
		   HISTORY: {
		      TAB_TITLE: "Seneste opdateringer",
		      NO_HISTORY: "Der er ingen seneste kommentarer.",
		      EMPTY: "Kan ikke hente de seneste opdateringer for dette element. Det er slettet, eller du har ikke længere adgang til det.",
		      MORE: "Vis forrige opdateringer",
		      ERROR_ALT: "Fejl",
		      ERROR: "Der er opstået en fejl under hentning af opdateringerne. ${again}",
		      ERROR_ADDTL: "Der er opstået en fejl under hentning af yderligere opdateringer. ${again}",
		      ERROR_AGAIN: "Prøv igen.",
		      ERROR_AGAIN_TITLE: "Gentag anmodningen om flere opdateringer.",
		      PROFILE_TITLE: "Åbn profilen for ${user}.",
		      SORT_BY: "Sortér efter\\:",
		      SORTS: {
		         DATE: "Dato",
		         DATE_TOOLTIP: "Sortér fra mest nylige historik til mindst nylige opdateringer",
		         DATE_TOOLTIP_REVERSE: "Sortér fra mindst nylige historik til mest nylige opdateringer"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} kl. ${time}",
		             MONTH: "${d}. ${MMM}",
		             TODAY: "I dag kl. ${time}",
		             YEAR: "${d}. ${MMM} ${YYYY}",
		             YESTERDAY: "I går kl. ${time}",
		             TOMORROW: "${d}. ${MMM} ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Denne kommentar",
			   REPLY_ACTION: "Svar",
		       REPLY_ACTION_TOOLTIP: "Svar på denne kommentar"
		   },
		   OAUTH: {
		      welcomeHeader: "Velkommen til Connections",
		      continueBtnLabel: "Fortsæt",
		      continueBtnA11y: "Hvis du klikker på dette link, åbnes der et nyt vindue, hvor du kan give adgang til Connections.",
		      clickHere: "Klik her",
		      infoMsg: "Connections skal bruge din tilladelse til at læse dine data.",
		      authorizeGadget: "${clickHere} for at give denne applikation adgang til dine Connections-oplysninger.",
		      confirmAuthorization: "${clickHere} for at bekræfte, at du har givet denne applikation adgang til dine Connections-oplysninger."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Hvis du klikker på dette link, åbnes der et nyt vindue, hvor du kan give adgang til Connections Library-lageret.",
		      infoMsg: "Connections Library-lageret skal bruge din tilladelse til at læse dine data.",
		      authorizeGadget: "${clickHere} for at give denne applikation adgang til dine Connections Library-lageroplysninger.",
		      confirmAuthorization: "${clickHere} for at bekræfte, at du har givet denne applikation adgang til dine Connections Library-lageroplysninger."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Annullér",
		      CONFIRM: "Er du sikker på, at du vil kassere ændringerne? Klik på OK for at fortsætte eller Annullér for at returnere.",
		      DIALOG_TITLE: "Bekræft",
		      NAME: "Bekræft",
		      OK: "OK",
		      TOOLTIP: "Bekræft"
		   }
});
