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
         label: "Gehiago",
         tooltip: "Ekintza gehiago"
       },
       tags_more: "eta beste ${0}",
       ERROR_ALT: "Errorea",
       PERSON_TITLE: "Ireki ${user} erabiltzailearen profila.",
       inactiveUser: "${user} (inaktibo)",
       inactiveIndicator: "(inaktibo)",
       like_error: "Ezin izan da egin duzun atseginaren adierazpena gorde. Saiatu berriro geroago.",
       vote_error: "Ezin izan da zure botoa gorde. Saiatu berriro geroago."
   },
   generic: {
      untitled: "(Izengabea)",
      tags: "Etiketak:",
      tags_more: "eta beste ${0}",
      likes: "Atsegin kopurua",
      comments: "Iruzkinak",
      titleTooltip: "Nabigatu hona: ${app}",
      error: "Ezin da datuak berreskuratu.",
      timestamp: {
         created: {
            DAY: "${EEEE}(e)an, ${time}e(t)an sortua",
            MONTH: "${MMM}-aren ${d}(e)an sortua",
            TODAY: "Gaur ${time}e(t)an sortua",
            YEAR: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an sortua",
            YESTERDAY: "Atzo ${time}e(t)an sortua",
            TOMORROW: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an sortua"
         },
         updated: {
            DAY: "${EEEE}(e)an, ${time}e(t)an eguneratua",
            MONTH: "${MMM}-aren ${d}(e)an eguneratua",
            TODAY: "Gaur ${time}e(t)an eguneratua",
            YEAR: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an eguneratua",
            YESTERDAY: "Atzo ${time}e(t)an eguneratua",
            TOMORROW: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an eguneratua"
         }
      },
      visibility: {
         pub: "Publikoa",
         priv: "Pribatua"
      },
      action: {
         created: "Sortzea",
         updated: "Eguneratua"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Jaso jarraitzen duzun jendearen berri hasierako orrian eta posta elektronikoan.",
      profile_title: "Ireki ${user} erabiltzailearen profila.",
      profile_a11y: "Esteka hau aktibatzean ${user} erabiltzailearen profila leiho berri batean irekiko da.",
      error: "Errorea gertatu da.  ${again}.",
      error_again: "Saiatu berriro",
      error_404: "Sareko eskaera jada ez dago.",
      warning: "Abisua",
      messages: {
         success: {
            accept: {
            	nofollow: "Orain sare-kontaktuak zarete.",
            	follow: "Orain sare-kontaktuak zarete eta ${user} jarraitzen duzue."
            },
            ignore: {
            	nofollow: "Gonbidapena ez ikusi egin duzu.",
            	follow: "Gonbidapena ez ikusi egin duzu baina ${user} jarraitzen duzu."
            }
         },
         error: {
            accept: "Errorea gertatu da eskaera onartzean.",
            ignore: "Errorea gertatu da eskaera ez ikusi egitean."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE}(e)an ${time}e(t)an",
              MONTH: "${MMM}k ${d}",
              TODAY: "Gaur ${time}e(t)an",
              YEAR: "${YYYY}(e)ko ${MMM}ren ${d}a",
              YESTERDAY: "Atzo ${time}e(t)an",
              TOMORROW: "${YYYY}(e)ko ${MMM}ren ${d}a"
           }
      }
   },
   file: {
      a11y_help: "Esteka hau aktibatzean ${name} leiho berri batean irekiko da.",
      tooltip: "Ireki ${name} Fitxategiak aplikazioan",
      profile_title: "Ireki ${user} erabiltzailearen profila.",
      profile_a11y: "Esteka hau aktibatzean ${user} erabiltzailearen profila leiho berri batean irekiko da.",
      download_tooltip: "Deskargatu fitxategi hau (${0})",
      following: {
         add: "Jarraitu fitxategia",
         remove: "Utzi jarraitzeari",
         title: "Txandakatu fitxategi honetako eguneratzeak jaso nahi duzun adierazteko"
      },
      share: {
         label: "Partekatu",
         title: "Eman beste batzuei fitxategi honetarako sarbidea"
      },
      timestamp: {
         created: {
            DAY: "${EEEE}(e)an ${time}e(t)an sortua",
            MONTH: "${MMM}-ean ${d}(e)an sortua",
            TODAY: "Gaur ${time}e(t)an sortua",
            YEAR: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an sortua",
            YESTERDAY: "Atzo ${time}e(t)an sortua",
            TOMORROW: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an sortua"
         },
         createdOther: {
            DAY: "${user}(e)k ${EEEE}(e)an ${time}e(t)an",
            MONTH: "${user}(e)k sortua ${MMM}-aren ${d}(e)an",
            TODAY: "${user}(e)k sortua gaur ${time}e(t)an",
            YEAR: "${user}(e)k sortua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
            YESTERDAY: "${user}(e)k sortua atzo ${time}e(t)an",
            TOMORROW: "${user}(e)k sortua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
         },
         updated: {
            DAY: "${EEEE}(e)an ${time}e(t)an eguneratua",
            MONTH: "${MMM}-aren ${d}(e)an eguneratua",
            TODAY: "Gaur ${time}e(t)an eguneratua",
            YEAR: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an eguneratua",
            YESTERDAY: "Atzo ${time}e(t)an eguneratua",
            TOMORROW: "${YYYY}(e)ko ${MMM}-aren ${d}(e)an eguneratua"
         },
         updatedOther: {
            DAY: "${user}(e)k eguneratua ${EEEE}(e)an ${time}e(t)an",
            MONTH: "${user}(e)k eguneratua ${MMM}-aren ${d}(e)an",
            TODAY: "${user}(e)k eguneratua gaur ${time}e(t)an",
            YEAR: "${user}(e)k eguneratua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
            YESTERDAY: "${user}(e)k eguneratua atzo ${time}e(t)an",
            TOMORROW: "${user}(e)k eguneratua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
         },
         createdCompact: {
            DAY: "Sortze-data: ${EEEE}(e)an ${time}e(t)an",
            MONTH: "Sortze-data: ${MMM}-aren ${d}(e)an",
            TODAY: "Sortze-data: Gaur ${time}e(t)an",
            YEAR: "Sortze-data: ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
            YESTERDAY: "Sortze-data: Atzo ${time}e(t)an",
            TOMORROW: "Sortze-data: ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
         },
         updatedCompact: {
            DAY: "Eguneratua: ${EEEE}(e)an ${time}e(t)an",
            MONTH: "Eguneratua: ${MMM}-aren ${d}(e)an",
            TODAY: "Eguneratua: Gaur ${time}e(t)an",
            YEAR: "Eguneratua: ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
            YESTERDAY: "Eguneratua: Atzo ${time}e(t)an",
            TOMORROW: "Eguneratua: ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} honek sortua: ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} honek sortua: ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Deskargatu fitxategi hau (${size})",
      	 DOWNLOAD_ALT: "Deskargatu"
      },

      PREVIEW: {
         LINK: "Aurrebista",
         TITLE: "Erakutsi fitxategi honen aurrebista leiho berri batean."
      },
      TAGS: "Etiketak:",
      error: "Errorea gertatu da.  ${again}.",
      error_again: "Saiatu berriro",
      error_404: "Fitxategia jada ez dago edo ez duzu sartzeko behar adina baimenik.",
      error_403: "Ez duzu fitxategi hau ikusteko baimenik. Fitxategia ez da publikoa eta ez dute zurekin partekatu.",
      notifications: {
         USER_SHARED: "${user}(e)k idatzi du:",
         CHANGE_SUMMARY: "${user}(e)k aldaketen laburpena eman du",
         NO_CHANGE_SUMMARY: "${user}(e)k ez du aldaketen laburpenik eman",
         COMMENTED: "${user}(e)k iruzkindu du"
      }
   },
   ecm_file: {
      checkedout_you: "Egiaztatu duzu",
      checkedout_other: "${user}(e)k egiaztatua",
      tooltip: "Ireki ${name} fitxategia liburutegian",
      draft_404_info: "Zirriborroa ezabatu dute edo jada ez dago zurekin partekatuta. Argitaratuta dagoen bertsioa fitxategiaren azken bertsioa da orain.",
      error_404: "Fitxategia ezabatu dute edo jada ez dago zurekin partekatuta.",
      error_403: "Fitxategia ezabatu dute edo jada ez dago zurekin partekatuta.",
      error_preview: "Fitxategiaren aurrebista jada ez dago erabilgarri.",
      draft_review_canceled: "Aurrebista bertan behera utzi dute eta zirriborroa jada ez dago zurekin partekatuta. Zure berrikuspena jada ez da beharrezkoa.",
      switch_ee: "Ikusi zirriborroa",
      switch_ee_tooltip: "Ikusi fitxategi honen azken zirriborroa"
   },
   ecm_draft: {
      tooltip: "Ireki ${name} zirriborroa liburutegian",
      community_owners: "Komunitateko jabeak",
      draft: "Zirriborroa",
      draft_tooltip: "Zirriborroa ikusten",
      draft_general_info: "Aurreko zirriborroa jada ez dago eta zirriborro berri bat azken bertsioa da orain.",
      draft_review_404_general_info: "Berrikusleetako batek dagoeneko bozkatu du. Ez duzu zirriborro honen berrikuspena zertan egin.",
      draft_review_404_request_info: "Aurreko zirriborroa jada ez dago; azken zirriborroa bidali dute eta berrikusteko zain dago. Zure berrikuspena eskatu dute.",
      draft_review_404_require_info: "Aurreko zirriborroa jada ez dago; azken zirriborroa bidali dute eta berrikusteko zain dago. Zure berrikuspena beharrezkoa da.",
      draft_review_request_info: "Zure berrikuspena eskatu dute.",
      draft_review_require_info: "Zure berrikuspena beharrezkoa da.",
      error_404: "Zirriborroa ezabatu dute edo jada ez dago zurekin partekatuta.",
      error_403: "Zirriborro hau ez dago zurekin partekatuta eta ezin duzu ikusi.",
      error_preview: "Zirriborro honen aurrebista jada ez dago erabilgarri.",
      switch_ee: "Ikusi argitaratutako bertsioa",
      switch_ee_tooltip: "Ikusi fitxategi honen bertsio argitaratua",
      review: "Berrikuspena",
      reviewers: "Berrikusleak",
      reviwers_addtl: "Berrikusle gehiago",
      in_review: "Zirriborroa berrikuspen prozesuan",
      in_review_tooltip: "Berrikuspen prozesuan dagoen zirriborroa ikusten",
      review_required_any: "Komunitateko jabeek zirriborro honetarako berrikusle bat eskatu dute.",
      review_required_all: "Komunitateko jabeek berrikusle guztiek zirriborro hau berrikusteko eskatu dute.",
      review_required_generic: "Komunitateko jabeek berrikusle hauek zirriborro hau berrikusteko eskatu dute.",
      review_additional_required: "Zirriborro honen bidaltzaileak gehitu dituen berrikusle guztiek zirriborro honen berrikuspena egin behar dute.",
      reivew_submitted_date: {
         DAY: "${user}(e)k zirriborroa berrikusteko bidali du ${EEEE}(e)an ${time}e(t)an.",
         MONTH: "${user}(e)k zirriborroa berrikusteko bidali du ${MMM}ren ${d}(e)an.",
         TODAY: "${user}(e)k zirriborroa berrikusteko bidali du gaur ${time}e(t)an.",
         YEAR: "${user}(e)k zirriborroa berrikusteko bidali du ${YYYY}(e)ko ${MMM}ren ${d}(e)an.",
         YESTERDAY: "${user}(e)k zirriborroa berrikusteko bidali zuen atzo ${time}e(t)an.",
         TOMORROW: "${user}(e)k zirriborroa berrikusteko bidali du ${YYYY}(e)ko ${MMM}ren ${d}(e)an."
      },
      pending: "Zain",
      pending_rejected: "Ez da berrikuspenik behar zirriborroa ezetsi egin delako",
      approve: "Onetsi",
      approved: "Onetsita",
      approve_tooltip: "Onetsi zirriborro hau",
      accept_success: "Zirriborro hau onetsi duzu.",
      accept_error: "Errorea gertatu da zirriborro hau onestean. Saiatu berriro.",
      accept_info: "Zirriborro hau onetsi duzu.",
      reject: "Ezetsi",
      rejected: "Ezetsita",
      reject_tooltip: "Ezetsi zirriborro hau",
      reject_success: "Zirriborro hau ezetsi duzu.",
      reject_error: "Errorea gertatu da zirriborro hau ezestean. Saiatu berriro.",
      reject_info: "Zirriborro hau ezetsi duzu."
   },
   authUser: {
      error: "Errorea gertatu da uneko erabiltzailea berreskuratzen.  ${again}.",
      error_again: "Saiatu berriro",
      error_404: "Ezin da identifikatutako erabiltzailea aurkitu.",
      error_403: "Ez duzu erabiltzailearen informazioa berreskuratzeko baimenik."
   },
   forum: {
      error: "Errorea gertatu da.  ${again}.",
      error_again: "Saiatu berriro",
      error_404: "Foroa jada ez dago edo ez duzu sartzeko behar adina baimenik.",
      error_403: "Ez duzu foro hau ikusteko baimenik. Foroa ez da publikoa eta ez dago zurekin partekatuta.",

      readMore: "Ikusi gai osoa...",
      readMore_tooltip: "Ireki ${name} foroaren gaia.",
      readMore_a11y: "Esteka hau aktibatzean ${name} foroaren gaia leiho berri batean irekiko da.",
      QUESTION_ANSWERED: "Galdera honi dagoeneko erantzun diote.",
      QUESTION_NOT_ANSWERED: "Oraindik inork ez dio galdera honi erantzun.",

      attachments: "${count} eranskin",
      attachments_one: "Eranskin ${count}"
   },
   blog: {
      error: "Errorea gertatu da.  ${again}.",
      error_again: "Saiatu berriro",
      error_404: "Bloga jada ez dago edo ez duzu sartzeko behar adina baimenik.",
      error_403: "Ez duzu blog hau ikusteko baimenik. Blog hau ez da publikoa eta ez dago zurekin partekatuta.",
      readMore: " Gehiago irakurri...",
      readMore_tooltip: "Ireki ${name} blogaren sarrera.",
      readMore_a11y: "Esteka hau aktibatzean ${name} blogaren sarrera leiho berri batean irekiko da.",
      graduated: "Graduatua",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Bozkatu</a>",
  					TOOLTIP: 	"Eman botoa honi"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Bozkatua</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Bozkatua</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Desegin</a>",
  					TOOLTIP: 	"Kendu honi eman diozun botoa"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 pertsonak honi eman diote botoa"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"Pertsona 1ek honi eman dio botoa"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount}(e)k honi eman diote botoa"
  				}
  			},
  			LOADING: "Kargatzen...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Bozkatua"
  			}
  		}
   },
   idea: {
	  error_404: "Ezin izan dugu zure botoa gorde; bozketa muga gainditu egin duzu edo ideia jada ez duzu erabilgarri.",
      readMore_tooltip: "Ireki ${name} ideia.",
      readMore_a11y: "Esteka hau aktibatzean ${name} ideia leiho berri batean irekiko da."
   },
   size: {
      B: "${0} B",
      KB: "${0} KB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "Erantzunak",
      THIS_ARIA_LABEL: "Erantzun hau",
      THIS_TAB_TITLE: "Erantzun hau",
      TAB_TITLE: "Erantzunak (${0})",
      REPLY_TO_REPLY: "Honi erantzunean: ${thisReply}",
      REPLY_TO_TOPIC: "Honi erantzunean: ${thisTopic}",
      THIS_TOPIC: "gai hau",
      THIS_REPLY: "erantzun hau",
      NAVIGATE_TO_REPLY: "Nabigatu erantzun nagusira",
      NAVIGATE_TO_TOPIC: "Nabigatu gai nagusira",
      ADD_COMMENT: "Erantzun gai honi",
      ADD_COMMENT_TOOLTIP: "Erantzun foroaren gai honi",
      SHOWING_RECENT_REPLIES: "Azken ${0} erantzun erakusten",
      PREV_COMMENTS: "Erakutsi erantzun gehiago",
      PLACEHOLDER_TXT: "Erantzun gai honi",
      EMPTY: "Ez dago erantzunik.",
      TRIM_LONG_COMMENT: "Erantzuna laburtu?",
      WARN_LONG_COMMENT: "Erantzuna luzeegia da.  ${shorten}",
      ERROR: "Errorera gertatu da erantzunak berreskuratzean. ${again}",
      ERROR_CREATE: "Ezin izan da erantzuna gorde.  Saiatu berriro geroago.",
      ERROR_CREATE_NOT_FOUND: "Gaia ezabatu dute edo ezin duzu ikusi, eta ezin izan da erantzuna gorde.",
      ERROR_CREATE_ACCESS_DENIED: "Gaia ezabatu dute edo ezin duzu ikusi, eta ezin izan da erantzuna gorde.",
      ERROR_CREATE_TIMEOUT: "Ezin izan da zerbitzaria aurkitu eta erantzuna ezin izan da gorde.  Sakatu 'Gorde' berriro saiatzeko.",
      ERROR_CREATE_CANCEL: "Eskaera bertan behera utzi da eta ezin izan da erantzuna gorde.  Sakatu 'Gorde' berriro saiatzeko.",
      ERROR_CREATE_NOT_LOGGED_IN: "Erantzuna sortu ahal izateko, saioa hasi behar duzu.  Sakatu 'Gorde' saioa hasteko.",
      ERROR_NO_CONTENT: "Idatzi erantzuna eta sakatu 'Gorde'.  Erantzuna idatzi nahi ez baduzu, sakatu 'Utzi'.",
      ERROR_UNAUTHORIZED: "Ez duzu erantzuteko baimenik eta ezin izan da erantzuna gorde.",
      COMMENT_DELETED: {
         DAY: "${user}(e)k erantzuna ezabatu du ${EEEE}(e)an ${time}e(t)an",
         MONTH: "${user}(e)k erantzuna ezabatu du ${MMM}-aren ${d}(e)an",
         TODAY: "${user}(e)k erantzuna ezabatu du gaur ${time}e(t)an",
         YEAR: "${user}(e)k erantzuna ezabatu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
         YESTERDAY: "${user}(e)k erantzuna ezabatu zuen atzo ${time}e(t)an",
         TOMORROW: "${user}(e)k erantzuna ezabatu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
      },
      REASON_FOR_DELETION: "Ezabatzeko arrazoia: ${reason}",
      REPLY_TITLE: "Re: ${0}",
      SHOW_FULL_REPLY: "Ikusi erantzun osoa",
      SHOW_FULL_REPLY_TOOLTIP: "Nabigatu foro-gaiaren jatorrizko erantzunera",
      REPLY_ACTION: "Erantzun",
      REPLY_ACTION_TOOLTIP: "Erantzun mezu honi",
      MODERATION_PENDING: "Erantzun hau berrikusteko zain dago.",
      MODERATION_QUARANTINED: "Moderatzaileak berrogeialdian jarri du mezua.",
      MODERATION_REMOVED: {
         DAY: "${user}(e)k erantzun hau kendu du ${EEEE}(e)an ${time}e(t)an.",
         MONTH: "${user}(e)k erantzun hau kendu du ${MMM}-aren ${d}(e)an.",
         TODAY: "${user}(e)k erantzun hau kendu du gaur ${time}e(t)an.",
         YEAR: "${user}(e)k erantzun hau kendu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an.",
         YESTERDAY: "${user}(e)k erantzun hau kendu zuen atzo ${time}e(t)an.",
         TOMORROW: "${user}(e)k erantzun hau kendu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an."
      },
      MODERATION_REJECTED: {
         DAY: "${user}(e)k erantzun hau ezetsi du ${EEEE}(e)an ${time}e(t)an.",
         MONTH: "${user}(e)k erantzun hau ezetsi du ${MMM}ren ${d}(e)an.",
         TODAY: "${user}(e)k erantzun hau ezetsi du gaur ${time}e(t)an.",
         YEAR: "${user}(e)k erantzun hau ezetsi du ${YYYY}(e)ko ${MMM}ren ${d}(e)an.",
         YESTERDAY: "${user}(e)k erantzun hau ezetsi zuen atzo ${time}e(t)an.",
         TOMORROW: "${user}(e)k erantzun hau ezetsi du ${YYYY}(e)ko ${MMM}ren ${d}(e)an."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Zure erantzuna berrikusteko bidali da eta, onesten denean, eskuragarri egongo da."
   },
   COMMENTS: {
      ARIA_LABEL: "Iruzkinak",
      PLACEHOLDER_TXT: "Gehitu iruzkina",
      TAB_TITLE: "Iruzkinak (${0})",
      ACTION_NOT_SUPPORTED: "Ekintza ez onartua",
      ADD_COMMENT: "Gehitu iruzkina",
      ADD_COMMENT_TOOLTIP: "Iruzkindu elementu hau",
      CANCEL: "Utzi",
      COMMENT_COUNT_ONE: "Iruzkin ${0}",
      COMMENT_COUNT_MANY: "${0} iruzkin",
      COMMENT_LABEL: "Iruzkina:",
      DELETE: "Ezabatu",
      DELETE_TOOLTIP: "Ezabatu iruzkina",
      DELETEREASON: "Iruzkina ezabatzeko arrazoia:",
      DIALOG_TITLE: "Laburtu iruzkina",
      TOOLTIP: "Laburtu iruzkina",
      NAME: "Laburtu iruzkina",
      EDIT: "Editatu",
      EDIT_TOOLTIP: "Editatu iruzkina",
      ERROR_CREATE: "Ezin izan da iruzkina gorde.  Saiatu berriro geroago.",
      ERROR_CREATE_NOT_FOUND: "Elementua ezabatu dute edo ezin duzu ikusi, eta iruzkina ezin izan da gorde.",
      ERROR_CREATE_ACCESS_DENIED: "Elementua ezabatu dute edo ezin duzu ikusi, eta iruzkina ezin izan da gorde.",
      ERROR_CREATE_TIMEOUT: "Ezin izan da zerbitzaria aurkitu eta iruzkina ezin izan da gorde.  Sakatu 'Argitaratu' berriro saiatzeko.",
      ERROR_CREATE_CANCEL: "Eskaera bertan behera utzi da eta ezin izan da iruzkina gorde.  Sakatu 'Argitaratu' berriro saiatzeko.",
      ERROR_CREATE_NOT_LOGGED_IN: "Iruzkina sortu ahal izateko, saioa hasi behar duzu.  Sakatu 'Argitaratu' saioa hasteko.",
      ERROR_DELETE: "Ezin izan da iruzkina ezabatu.  Saiatu berriro geroago.",
      ERROR_DELETE_TIMEOUT: "Ezin izan da zerbitzaria aurkitu eta iruzkina ezin izan da ezabatu.  Sakatu 'Ezabatu' berriro saiatzeko.",
      ERROR_DELETE_NOT_FOUND: "Iruzkina edo elementua ezabatu dute edo ezin duzu ikusi, eta iruzkina ezin izan da ezabatu.",
      ERROR_DELETE_ACCESS_DENIED: "Elementua ezabatu dute edo ezin duzu ikusi, eta iruzkina ezin izan da ezabatu.",
      ERROR_DELETE_CANCEL: "Eskaera bertan behera utzi da eta ezin izan da iruzkina ezabatu.  Sakatu 'Ezabatu' berriro saiatzeko.",
      ERROR_DELETE_NOT_LOGGED_IN: "Iruzkin hau ezabatu ahal izateko, saioa hasi behar duzu.  Sakatu 'Ezabatu' saioa hasteko.",
      ERROR_EDIT: "Ezin izan da iruzkina eguneratu.  Saiatu berriro geroago.",
      ERROR_EDIT_ACCESS_DENIED: "Elementua ezabatu dute edo ezin duzu ikusi, eta ezin izan da iruzkina eguneratu.",
      ERROR_EDIT_NOT_FOUND: "Elementua ezabatu dute edo ezin duzu ikusi, eta ezin izan da iruzkina eguneratu.",
      ERROR_EDIT_TIMEOUT: "Ezin izan da zerbitzaria aurkitu eta ezin izan da iruzkina eguneratu.  Sakatu 'Argitaratu' berriro saiatzeko.",
      ERROR_EDIT_CANCEL: "Eskaera bertan behera utzi da eta ezin izan da iruzkina eguneratu.  Sakatu 'Eguneratu' berriro saiatzeko.",
      ERROR_EDIT_NOT_LOGGED_IN: "Iruzkin hau editatu ahal izateko, saioa hasi behar duzu.  Sakatu 'Eguneratu' saioa hasteko.",
      ERROR_NO_CONTENT: "Idatzi iruzkina eta sakatu 'Argitaratu.'  Iruzkina idatzi nahi ez baduzu, sakatu 'Utzi'.'",
      ERROR_NO_CONTENT_EDIT: "Idatzi iruzkina eta sakatu 'Argitaratu.'  Iruzkina editatu nahi ez baduzu, sakatu 'Utzi'.",
      ERROR_UNAUTHORIZED: "Ez duzu iruzkinak idazteko baimenik eta ezin izan da iruzkina gorde.",
      ERROR_GENERAL: "Errorea gertatu da.",
      OK: "Ados",
      YES: "Bai",
      TRIM_LONG_COMMENT: "Iruzkina laburtu?",
      WARN_LONG_COMMENT: "Iruzkina luzeegia da.  ${shorten}",
      LINK: "Estekatu",
      SAVE: "Gorde",
      POST: "Argitaratu",
      SHOWMORE: "Gehiago irakurri...",
      VIEW_COMMENTS_FILE: "Ikusi fitxategi honen iruzkinak",
      SUBSCRIBE_TO_COMMENTS: "Harpidetu iruzkin hauetara",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Jarraitu iruzkin hauetan egiten diren aldaketei jario-irakurlean.",
      PROFILE_TITLE: "Ireki ${user} erabiltzailearen profila.",
      PROFILE_A11Y: "Esteka hau aktibatzean ${user} erabiltzailearen profila leiho berri batean irekiko da.",
      MODERATION_PENDING: "Iruzkin hau berrikusteko zain dago.",
      MODERATION_REMOVED: {
         DAY: "${user}(e)k iruzkin hau kendu du ${EEEE}(e)an ${time}e(t)an.",
         MONTH: "${user}(e)k iruzkin hau kendu du ${MMM}-aren ${d}(e)an.",
         TODAY: "${user}(e)k iruzkin hau kendu du gaur ${time}e(t)an.",
         YEAR: "${user}(e)k iruzkin hau kendu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an.",
         YESTERDAY: "${user}(e)k iruzkin hau kendu zuen atzo ${time}e(t)an.",
         TOMORROW: "${user}(e)k iruzkin hau kendu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an."
      },

      MODERATION_REJECTED: {
         DAY: "${user}(e)k iruzkin hau ezetsi du ${EEEE}(e)an ${time}e(t)an.",
         MONTH: "${user}(e)k iruzkin hau ezetsi du ${MMM}ren ${d}(e)an.",
         TODAY: "${user}(e)k iruzkin hau ezetsi du gaur ${time}e(t)an.",
         YEAR: "${user}(e)k iruzkin hau ezetsi du ${YYYY}(e)ko ${MMM}ren ${d}(e)an.",
         YESTERDAY: "${user}(e)k iruzkin hau ezetsi zuen atzo ${time}e(t)an.",
         TOMORROW: "${user}(e)k iruzkin hau ezetsi du ${YYYY}(e)ko ${MMM}ren ${d}(e)an."
      },
      PREV_COMMENTS: "Erakutsi aurreko iruzkinak",
      EMPTY: "Ez dago iruzkinik.",
      ERROR_ALT: "Errorea",
      ERROR: "Errorea gertatu da iruzkinak berreskuratzean. ${again}",
      ERROR_ADDTL: "Errorea gertatu da iruzkin gehigarriak berreskuratzean. ${again}",
      ERROR_AGAIN: "Saiatu berriro.",
      ERROR_AGAIN_TITLE: "Saiatu eskaera berriro egiten iruzkin gehiagorako.",
      COMMENT_CREATED: {
         DAY: "${user}(e)k ${EEEE}(e)an ${time}e(t)an (${version}. bertsioa)",
         MONTH: "${user}(e)k ${MMM}-aren ${d}(e)an (${version}. bertsioa)",
         TODAY: "${user}(e)k gaur ${time}e(t)an (${version}. bertsioa)",
         YEAR: "${user}(e)k ${YYYY}(e)ko ${MMM}-aren ${d}(e)an (${version}. bertsioa)",
         YESTERDAY: "${user}(e)k atzo ${time}e(t)an (${version}. bertsioa)",
         TOMORROW: "${user}(e)k ${YYYY}(e)ko ${MMM}-aren ${d}(e)an (${version}. bertsioa)"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user}(e)k ${EEEE}(e)an ${time}e(t)an",
         MONTH: "${user}(e)k ${MMM}ren ${d}(e)an",
         TODAY: "${user}(e)k gaur ${time}e(t)an",
         YEAR: "${user}(e)k ${YYYY}(e)ko ${MMM}ren ${d}(e)an",
         YESTERDAY: "${user}(e)k atzo ${time}e(t)an",
         TOMORROW: "${user}(e)k ${YYYY}(e)ko ${MMM}ren ${d}(e)an"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE}(e)an ${time}e(t)an",
         MONTH: "${MMM}k ${d}",
         TODAY: "Gaur ${time}e(t)an",
         YEAR: "${YYYY}(e)ko ${MMM}ren ${d}a",
         YESTERDAY: "Atzo ${time}e(t)an",
         TOMORROW: "${YYYY}(e)ko ${MMM}ren ${d}a"
      },

      COMMENT_DELETED: {
         DAY: "${user}(e)k iruzkin hau ezabatu du ${EEEE}(e)an ${time}e(t)an",
         MONTH: "${user}(e)k iruzkin hau ezabatu du ${MMM}-aren ${d}(e)an",
         TODAY: "${user}(e)k iruzkin hau ezabatu du gaur ${time}e(t)an",
         YEAR: "${user}(e)k iruzkin hau ezabatu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
         YESTERDAY: "${user}(e)k iruzkin hau ezabatu zuen atzo ${time}e(t)an",
         TOMORROW: "${user}(e)k iruzkin hau ezabatu du ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
      },
      COMMENT_EDITED: {
         DAY: "${user}(e)k editatua ${EEEE}(e)an ${time}e(t)an (${version}. bertsioa)",
         MONTH: "${user}(e)k editatua ${MMM}-aren ${d}(e)an (${version}. bertsioa)",
         TODAY: "${user}(e)k editatua gaur ${time}e(t)an (${version}. bertsioa)",
         YEAR: "${user}(e)k editatua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an (${version}. bertsioa)",
         YESTERDAY: "${user}(e)k editatua atzo ${time}e(t)an (${version}. bertsioa)",
         TOMORROW: "${user}(e)k editatua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an (${version}. bertsioa)"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user}(e)k editatua ${EEEE}(e)an ${time}e(t)an",
         MONTH: "${user}(e)k editatua ${MMM}-aren ${d}(e)an",
         TODAY: "${user}(e)k editatua gaur ${time}e(t)an",
         YEAR: "${user}(e)k editatua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
         YESTERDAY: "${user}(e)k editatua atzo ${time}e(t)an",
         TOMORROW: "${user}(e)k editatua ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
      },

      DELETE_CONFIRM: "Iruzkin hau ezabatu nahi duzu?",
      FLAG_ITEM: {
         BUSY: "Gordetzen...",
         CANCEL: "Utzi",
         ACTION: "Markatu desegoki gisa",
         DESCRIPTION_LABEL: "Eman elementu hau markatzeko arrazoia (aukerakoa)",
         EDITERROR: "Errorea gertatu da eta fitxategi honen metadatua ez da editatu",
         OK: "Gorde",
         ERROR_SAVING: "Errorea gertatu da eskaera prozesatzean. Saiatu berriro geroago.",
         SUCCESS_SAVING: "Zure marka bidali dugu. Moderatzaile batek aztertuko du laster.",
         TITLE: "Markatu elementu hau desegoki gisa",
         COMMENT: {
            TITLE: "Markatu iruzkin hau desegoki gisa",
            A11Y: "Botoi hau sakatu ondoren, elkarrizketa irekiko da eta erabiltzaileak iruzkina desegoki gisa markatu ahal izango du."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Utzi",
      DIALOG_TITLE: "Ezabatu iruzkina",
      NAME: "Ezabatu iruzkina",
      OK: "Ados",
      TOOLTIP: "Ezabatu iruzkina"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Utzi",
      CONFIRM: "Laburtzeak mugatik irteten den testua ezabatuko du.  Sakatu 'Ados' laburtzeko edo 'Utzi' iruzkina editatzeko.",
      DIALOG_TITLE: "Laburtu iruzkina",
      NAME: "Laburtu iruzkina",
      OK: "Ados",
      TOOLTIP: "Laburtu iruzkina"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Bidalketaren berrespena",
      CONFIRM: "Iruzkina berrikusteko bidali duzu eta, onartu ondoren, eskuragarri egongo da.",
      OK: "Ados"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "PM",
      TODAY: "gaur",
      TODAY_U: "Gaur",
      YESTERDAY: "atzo",
      YESTERDAY_U: "Atzo",

      ADDED: { DAY: "${EEee}(e)an ${time}e(t)an gehitua",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}(e)an gehitua",
         TODAY: "Gaur ${time}e(t)an gehitua",
         YEAR: "${date_long}(e)an gehitua",
         YESTERDAY: "Atzo ${time}e(t)an gehitua"
      },

      LAST_UPDATED: { DAY: "Azken eguneratzea: ${EEee}(e)an ${time}e(t)an",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Azken eguneratzea: ${date_long}",
         TODAY: "Azken eguneratzea: gaur ${time}e(t)an",
         YEAR: "Azken eguneratzea: ${date_long}",
         YESTERDAY: "Azken eguneratzea: atzo ${time}e(t)an"
      },

      MONTHS_ABBR: { 0: "URT",
         10: "AZA",
         11: "ABE",
         1: "OTS",
         2: "MAR",
         3: "API",
         4: "MAI",
         5: "EKA",
         6: "UZT",
         7: "ABU",
         8: "IRA",
         9: "URR"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Gaur",
         YEAR: "${date_short}",
         YESTERDAY: "Atzo",
         TOMORROW: "Bihar"
      },

      RELATIVE_TIME: { DAY: "${EEee}(e)an ${time}e(t)an",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Gaur ${time}e(t)an",
         YEAR: "${date_short}",
         YESTERDAY: "Atzo ${time}e(t)an",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee}(e)an ${time}e(t)an",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Gaur ${time}e(t)an",
         YEAR: "${date_long}",
         YESTERDAY: "Atzo ${time}e(t)an",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short}(e)an ${time}e(t)an",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}(e)an ${time}e(t)an",
         TODAY: "${date_short}(e)an ${time}e(t)an",
         YEAR: "${date_short}(e)an ${time}e(t)an",
         YESTERDAY: "${date_short}(e)an ${time}e(t)an",
         TOMORROW: "${date_short}(e)an ${time}e(t)an"
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

      UPDATED: { DAY: "${EEee}(e)an ${time}e(t)an eguneratua",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}(e)an eguneratua",
         TODAY: "Gaur ${time}e(t)an eguneratua",
         YEAR: "${date_long}(e)an eguneratua",
         YESTERDAY: "Atzo ${time}e(t)an eguneratua"
      }
   },
   VERSIONS: {
      ERROR: "Ezin da bertsioaren informazioa kargatu.",
      ERROR_REQUEST_CANCELLED: "Eskaera bertan behera utzi da.",
      ERROR_REQUEST_TIMEOUT: "Ezin izan da zerbitzaria aurkitu.",
      ERROR_REQUEST_UNKNOWN: "Errore ezezaguna gertatu da.",
      LOADING: "Kargatzen ..",
      NO_VERSIONS: "Ez dago bertsiorik",
      INFO: "${0}. bertsioa, ${1}e(t)an honek sortua: ",
      VERSION_NUMBER: "${0}. bertsioa",
      DELETED: "Ezabatuta",
      DELETE_ALL: "Ezabatu ondoko bertsioaren aurreko bertsio guztiak",
      DELETE_VERSION_SINGLE: "Ezabatu bertsio hau: ${0}",
      DELETEERROR: "Errorea gertatu da eta bertsioa ez da ezabatu.",
      CREATE_VERSION: "Sortu beste bertsio bat",
      CREATE_VERSION_TOOLTIP: "Sortu fitxategi honen bertsio bat",
      REVERT_VERSION: "Leheneratu bertsio hau: ${0}",
      REVERT_DESCRIPTION: "Bertsio honetatik leheneratua: ${0}",
      PREVIOUS: "Aurrekoa",
      PREVIOUS_TOOLTIP: "Aurreko orria",
      ELLIPSIS: "...",
      NEXT: "Hurrengoa",
      NEXT_TOOLTIP: "Hurrengo orria",
      COUNT: "${0}-${1}/${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "Orria",
      SHOW: "Erakutsi",
      ITEMS_PER_PAGE: " elementu orriko.",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Gaur ${time}e(t)an",
            YESTERDAY: "Atzo ${time}e(t)an"
        },
        RELATIVE_TIME_L: { DAY: "${EEee}(e)an ${time}e(t)an",
            YEAR: "${date_short}(e)an ${time}e(t)an",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short}(e)an ${time}e(t)an",
            TODAY: "gaur ${time}e(t)an",
            YESTERDAY: "atzo ${time}e(t)an"
        },
        UPDATED: { DAY: "${EEee}(e)an ${time}e(t)an eguneratua",
            YEAR: "${date_short}(e)an eguneratua",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short}(e)an eguneratua",
            TODAY: "Gaur ${time}e(t)an eguneratua",
            YESTERDAY: "Atzo ${time}e(t)an eguneratua"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Ezabatu bertsio hau: ${0}",
         DOWNLOAD: "Deskargatu",
         DOWNLOAD_TOOLTIP: "Deskargatu bertsio hau (${0})",
         VIEW: "Ikusi",
         VIEW_TOOLTIP: "Ikusi bertsio hau: ${0}",
         REVERT: {
            A11Y: "Botoi hau sakatu ondoren, elkarrizketa irekiko da eta erabiltzaileak fitxategi bat aurreko bertsiotik leheneratu nahi duen berretsi ahal izango du. Ekintza hau berrestean, orriaren edukia freskatuko da.",
            FULL: "Leheneratu",
            WIDGET: "Leheneratu bertsio hau"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Bertsioa ezabatu dute edo ezin duzu ikusi, eta ezin izan da ezabatu.",
         ERROR_ACCESS_DENIED: "Ez zara editorea eta ezin izan da bertsioa ezabatu.",
         ERROR_TIMEOUT: "Ezin izan da zerbitzaria aurkitu eta bertsioa ezin izan da ezabatu.  Sakatu 'Ezabatu' berriro saiatzeko.",
         ERROR_CANCEL: "Eskaera bertan behera utzi da eta ezin izan da bertsioa ezabatu.  Sakatu 'Ezabatu' berriro saiatzeko.",
         ERROR_NOT_LOGGED_IN: "Bertsio hau ezabatu ahal izateko, saioa hasi behar duzu.  Sakatu 'Ezabatu' saioa hasteko.",
         GENERIC_ERROR: "Errore ezezaguna gertatu da eta ezin izan da bertsioa ezabatu.  Sakatu 'Ezabatu' berriro saiatzeko.",
         FULL: "Ezabatu",
         A11Y: "Botoi hau sakatzean, elkarrizketa irekiko da eta erabiltzaileak bertsio hau ezabatu nahi duen berretsi ahal izango du. Ekintza hau berrestean, orriaren edukia freskatuko da."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Bertsioa ezabatu dute edo ezin duzu ikusi, eta ezin izan da leheneratu.",
         ERROR_ACCESS_DENIED: "Ez zara editorea eta ezin izan da bertsioa leheneratu.",
         ERROR_NAME_EXISTS: "Beste fitxategi batek izen berbera du eta ezin izan da bertsioa leheneratu.",
         ERROR_TIMEOUT: "Ezin izan da zerbitzaria aurkitu eta ez da bertsioa leheneratu.  Sakatu 'Leheneratu' berriro saiatzeko.",
         ERROR_CANCEL: "Eskaera bertan behera utzi da eta bertsioa ez da bertsioa leheneratu.  Sakatu 'Leheneratu' berriro saiatzeko.",
         ERROR_QUOTA_VIOLATION: "Leku-murrizketak direla eta, ezin izan da bertsioa leheneratu.",
         ERROR_MAX_CONTENT_SIZE: "Ezin izan da bertsioa leheneratu. Bertsioak ${0} baino gutxiago pisatu behar du",
         GENERIC_ERROR: "Errore ezezaguna gertatu da eta ezin izan da orria leheneratu.  Sakatu 'Leheneratu' berriro saiatzeko."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Ikusi nork deskargatu duen...",
      PREVIOUS: "Aurrekoa",
      PREVIOUS_TOOLTIP: "Aurreko orria",
      ELLIPSIS: "...",
      NEXT: "Hurrengoa",
      NEXT_TOOLTIP: "Hurrengo orria",
      COUNT: "${0}-${1}/${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "Orria",
      SHOW: "Erakutsi",
      ITEMS_PER_PAGE: " elementu orriko.",
      VERSION: {
         DAY: "${version}. bertsioa ${date}(e)an",
         MONTH: "${version}. bertsioa ${date}(e)an",
         TODAY: "${version}. bertsioa ${time}(r)tan",
         YEAR: "${version}. bertsioa ${date}(e)an",
         YESTERDAY: "${version}. bertsioa atzo"
      },

      FILE: {
         V_LATEST: "Fitxategi honen azken bertsioa deskargatu duzu",
         V_OLDER: "Fitxategi honen ${0}. bertsioa deskargatu duzu",
         LOADING: "Kargatzen...",
         EMPTY: "Erabiltzaile anonimoak bakarrik",
         ERROR: "Ezin izan da deskargaren informazioa kargatu"
      }
   },

   EE_DIALOG: {
      ERROR: "Errorea",
      ERROR_ALT_TEXT: "Errorea:",
      ERROR_MSG_GENERIC: "Errorea gertatu da.  Saiatu berriro.",
      ERROR_MSG_NOT_AVAILABLE: "Elementu hau ezabatu dute edo ez dago erabilgarri.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Elementu honen edukia ez dago erabilgarri.",
      ERROR_MSG_NO_ACCESS: "Ez duzu jada elementu honen atzipenik.",
      LOADING: "Kargatzen...",
      TITLE_SU: "${author}(e)k mezu bat argitaratu du.",
      TITLE_NI: "${author}(e)k bere sarean sartzeko gonbidatu zaitu.",
      AUTHOR_TITLE: "Ikusi ${author}(r)en profila",
      OPEN_LINK: "Ireki ${title}",
      CONFIRM_CLOSE_TITLE: "Berretsi",
      CONFIRM_CLOSE_MESSAGE: "Aldaketak baztertu nahi dituzu? Sakatu 'Ados' aurrera jarraitzeko edo 'Utzi' atzera itzultzeko",
      OK: "Ados",
      CANCEL: "Utzi"
   },
   MESSAGE: {
      SUCCESS: "Berrespena",
      ERROR: "Errorea",
      ERROR_ALT_TEXT: "Errorea:",
      INFO: "Informazioa",
      WARNING: "Abisua",
      DISMISS: "Ezkutatu mezu hau",
      MORE_DETAILS: "Xehetasun gehiago",
      HIDE_DETAILS: "Ezkutatu xehetasunak"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Sortze-data: ${EEEE}(e)an ${time}e(t)an",
           MONTH: "Sortze-data: ${MMM}-aren ${d}(e)an",
           TODAY: "Sortze-data: Gaur ${time}e(t)an",
           YEAR: "Sortze-data: ${YYYY}(e)ko ${MMM}-aren ${d}(e)an",
           YESTERDAY: "Sortze-data: Atzo ${time}e(t)an",
           TOMORROW: "Sortze-data: ${YYYY}(e)ko ${MMM}-aren ${d}(e)an"
       },
      error: "Errorea gertatu da.  ${again}.",
      error_again: "Saiatu berriro",
      error_404: "Egoeraren eguneratzea jada ez dago.",
      notifications: {
         STATUS_UPDATE: "${user}(e)k mezu bat argitaratu du",
         USER_BOARD_POST: "${user}(e)k zure panelean idatzi du",
         POST_COMMENT: "${user}(e)k idatzi du:"
      }
   },
   login: {
      error: "Zure erabiltzaile-izena edota pasahitza ez dator bat dauden kontuekin. Saiatu berriro.",
      logIn: "Hasi saioa",
      password: "Pasahitza:",
      user: "Erabiltzailearen izena:",
      welcome: "Hasi saioa HCL Connections gunean"
   },
   repost: {
      name: "Berrargitaratu",
      title: "Berrargitaratu eguneratze hau nire komunitate edo jarraitzaileentzat",
      msg_success: "Eguneratzea ondo berrargitaratu da zure jarraitzaileentzat.",
      msg_generic: "Errorea gertatu da.  Saiatu berriro."
   },
   FILE_SHARE_INFO: {
      ADD: "Gehitu",
      ADD_TXT: "Gehitu jendea edo komunitateak irakurle gisa",
      SHOW_MORE: "Erakutsi gehiago...",
      READER_IF_PUBLIC: "Guztiak (publikoa)",
      READER_IF_PUBLIC_TOOLTIP: "Fitxategi hau publikoa da eta guztiek ikusi dezakete",
      EMPTY_READERS: "Bat ere ez",
      READERS_LABEL: "Irakurleak: ",
      EDITORS_LABEL: "Editoreak: ",
      OWNER_LABEL: "Jabea: ",
      ERROR: "Ezin da partekatze informazioa kargatu",
      ERROR_NOT_FOUND: "Eskatu duzun fitxategia ezabatu edo mugitu dute. Esteka norbaitek bidali badizu, ziurtatu zuzena dela.",
      ERROR_ACCESS_DENIED: "Ez duzu fitxategi hau ikusteko baimenik.  Fitxategia ez da publikoa eta ez dute zurekin partekatu.",
      SHARE: "Partekatu",
      CANCEL: "Utzi",
      SHARE_WITH: "Partekatu ondokoarekin:",
      PERSON: "pertsona bat",
      COMMUNITY: "komunitate bat",
      PLACEHOLDER: "Pertsonaren izena edo posta elektronikoa...",
      MESSAGE: "Mezua:",
      MESSAGE_TXT: "Gehitu mezu aukerako mezu bat",
      REMOVE_ITEM_ALT: "Kendu ${0}",
      NO_MEMBERS: "Bat ere ez",
      A11Y_READER_ADDED: "Hautatu \"${0}\" irakurle gisa",
      A11Y_READER_REMOVED: "${0} ez da jada irakurlea",
      SELF_REFERENCE_ERROR: "Ezin duzu zurekin partekatu.",
      OWNER_REFERENCE_ERROR: "Ezin duzu fitxategiaren jabearekin partekatu.",
      SHARE_COMMUNITY_WARN: "'${0}' komunitate publikoarekin partekatuz gero, fitxategi hau publikoa izango da.",
      SELECT_USER_ERROR: "Partekatzeko pertsona bat edo komunitate bat, gutxienez, hautatu behar duzu",
      WARN_LONG_MESSAGE: "Mezua luzeegia da.",
      TRIM_LONG_MESSAGE: "Mezua laburtu?",
      ERROR_SHARING: "Ezin izan da fitxategia partekatu.  Saiatu berriro geroago.",
      INFO_SUCCESS: "Fitxategia ondo partekatu da.",
      MAX_SHARES_ERROR: "Partekatzearen kopuru muga gainditu da.",
      NOT_LOGGED_IN_ERROR: "Fitxategia ez da partekatu ez duzulako saioa hasi.  Sakatu 'Partekatu' fitxategia partekatzeko.",
      TIMEOUT_ERROR: "Fitxategia ez da partekatu ezin izan delako zerbitzariarekin kontaktatu.  Sakatu 'Partekatu' berriro saiatzeko.",
      CANCEL_ERROR: "Fitxategia ez da partekatu eskaera bertan behera utzi delako  Sakatu 'Partekatu' berriro saiatzeko.",
      NOT_FOUND_ERROR: "Fitxategi hau ezabatu dute edo ezin duzu ikusi, eta ezin da partekatu.",
      ACCESS_DENIED_ERROR: "Ez duzu jadanik fitxategi hau partekatzeko baimenik.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Baliteke murriztuta dagoen fitxategia publikoa ez izatea.",
      TOOLTIP: "Eman beste batzuei fitxategi honetarako sarbidea"
   },
   HISTORY: {
      TAB_TITLE: "Azken eguneratzeak",
      NO_HISTORY: "Azkenaldian ez da eguneratzerik egin.",
      EMPTY: "Ezin izan da elementu honetarako azken eguneratzeak berreskuratu. Ezabatu dute edo ez duzu jada horren atzipenik.",
      MORE: "Erakutsi aurreko eguneratzeak",
      ERROR_ALT: "Errorea",
      ERROR: "Errorea gertatu da eguneratzeak berreskuratzean. ${again}",
      ERROR_ADDTL: "Errorea gertatu da eguneratze gehigarriak berreskuratzean. ${again}",
      ERROR_AGAIN: "Saiatu berriro.",
      ERROR_AGAIN_TITLE: "Saiatu berriro eguneratze gehiagorako.",
      PROFILE_TITLE: "Ireki ${user} erabiltzailearen profila.",
      SORT_BY: "Ordenatu honen arabera\\:",
      SORTS: {
         DATE: "Data",
         DATE_TOOLTIP: "Ordenatu historia-dataren arabera (gorantz)",
         DATE_TOOLTIP_REVERSE: "Ordenatu historia-dataren arabera (beherantz)"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE}(e)an ${time}e(t)an",
             MONTH: "${MMM}k ${d}",
             TODAY: "Gaur ${time}e(t)an",
             YEAR: "${YYYY}(e)ko ${MMM}ren ${d}a",
             YESTERDAY: "Atzo ${time}e(t)an",
             TOMORROW: "${YYYY}(e)ko ${MMM}ren ${d}a"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Iruzkin hau",
	   REPLY_ACTION: "Erantzun",
       REPLY_ACTION_TOOLTIP: "Erantzun iruzkin honi"
   },
   OAUTH: {
      welcomeHeader: "Ongi etorri Connections gunera",
      continueBtnLabel: "Jarraitu",
      continueBtnA11y: "Esteka hau aktibatzean, leiho berri bat irekiko da eta Connections guneari atzipena eman nahi diozun berretsi ahal izango duzu.",
      clickHere: "Sakatu hemen",
      infoMsg: "Connections guneak zure datuak atzitzeko baimena behar du.",
      authorizeGadget: "${clickHere} aplikazio honi Connections informazioa atzitzeko baimena emateko.",
      confirmAuthorization: "${clickHere} aplikazio honi Connections informazioa atzitzeko baimena eman diozun berresteko."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Esteka hau aktibatzean, leiho berri bat irekiko da eta Connections gunearen liburutegi-biltegia atzitzeko baimena emateko aukera izango duzu.",
      infoMsg: "Connections gunearen liburutegi-biltegiak zure datuak atzitzeko baimena behar du.",
      authorizeGadget: "${clickHere} aplikazio honi Connections gunearen liburutegi-biltegiaren informazioa atzitzeko baimena emateko.",
      confirmAuthorization: "${clickHere} aplikazio honi Connections gunearen liburutegi-biltegiaren informazio atzitzeko baimena eman diozun berresteko."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Utzi",
      CONFIRM: "Aldaketak baztertu nahi dituzu?  Sakatu 'Ados' aurrera jarraitzeko edo 'Utzi' itzultzeko.",
      DIALOG_TITLE: "Berretsi",
      NAME: "Berretsi",
      OK: "Ados",
      TOOLTIP: "Berretsi"
   }
})
