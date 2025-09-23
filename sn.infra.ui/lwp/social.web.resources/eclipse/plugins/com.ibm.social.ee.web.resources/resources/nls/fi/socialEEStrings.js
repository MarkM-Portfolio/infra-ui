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
         label: "Lisää",
         tooltip: "Lisää toimintoja"
       },
       tags_more: "ja ${0} lisää",
       ERROR_ALT: "Virhe",
       PERSON_TITLE: "Avaa käyttäjän ${user} profiili.",
       inactiveUser: "${user} (passiivinen)",
       inactiveIndicator: "(passiivinen)",
       like_error: "Pitämisen tallennus ei onnistunut. Yritä myöhemmin uudelleen.",
       vote_error: "Äänen tallennus ei onnistunut. Yritä myöhemmin uudelleen."
   },
   generic: {
      untitled: "(Nimetön)",
      tags: "Tunnisteet:",
      tags_more: "ja ${0} lisää",
      likes: "Pitämiset",
      comments: "Kommentit",
      titleTooltip: "Siirry sovellukseen ${app}",
      error: "Tietojen nouto ei onnistu.",
      timestamp: {
         created: {
            DAY: "Luotu ${EEEE} kello ${time}",
            MONTH: "Luotu ${MMM} ${d}",
            TODAY: "Luotu tänään kello ${time}",
            YEAR: "Luotu ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Luotu eilen kello ${time}",
            TOMORROW: "Luotu ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Päivitetty ${EEEE} kello ${time}",
            MONTH: "Päivitetty ${MMM} ${d}",
            TODAY: "Päivitetty tänään kello ${time}",
            YEAR: "Päivitetty ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Päivitetty eilen kello ${time}",
            TOMORROW: "Päivitetty ${MMM} ${d}, ${YYYY}"
         }
      },
      visibility: {
         pub: "Julkinen",
         priv: "Yksityinen"
      },
      action: {
         created: "Luotu",
         updated: "Päivitetty"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Saat seuraamiasi henkilöitä koskevia päivityksiä kotisivulla ja sähköpostitiivistelmissä.",
      profile_title: "Avaa käyttäjän ${user} profiili.",
      profile_a11y: "Kun tämä linkki aktivoidaan, käyttäjän ${user} profiili aukeaa uuteen ikkunaan.",
      error: "On ilmennyt virhe.  ${again}.",
      error_again: "Yritä uudelleen.",
      error_404: "Verkostopyyntöä ei ole enää.",
      warning: "Varoitus",
      messages: {
         success: {
            accept: {
            	nofollow: "Olette nyt toistenne verkoston yhteyshenkilöjä.",
            	follow: "Olette nyt toistenne verkoston yhteyshenkilöjä ja seuraatte käyttäjää ${user}."
            },
            ignore: {
            	nofollow: "Olet ohittanut kutsun.",
            	follow: "Olet ohittanut kutsun, mutta olet aloittanut käyttäjän ${user} seurannan."
            }
         },
         error: {
            accept: "Pyyntöä hyväksyttäessä on ilmennyt virhe.",
            ignore: "Pyynnön ohituksessa on ilmennyt virhe."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} kello ${time}",
              MONTH: "${MMM}n ${d}.",
              TODAY: "Tänään kello ${time}",
              YEAR: "${MMM}n ${d}., ${YYYY}",
              YESTERDAY: "Eilen kello ${time}",
              TOMORROW: "${MMM}n ${d}., ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Kun tämä linkki aktivoidaan, ${name} aukeaa uuteen ikkunaan.",
      tooltip: "Avaa kohteen ${name} Tiedostot-sovelluksessa",
      profile_title: "Avaa käyttäjän ${user} profiili.",
      profile_a11y: "Kun tämä linkki aktivoidaan, käyttäjän ${user} profiili aukeaa uuteen ikkunaan.",
      download_tooltip: "Lataa tämä tiedosto (${0})",
      following: {
         add: "Tiedoston seuranta",
         remove: "Lopeta seuranta",
         title: "Ota käyttöön tai poista käytöstä tätä tiedostoa koskevien päivitysten vastaanotto"
      },
      share: {
         label: "Määritä yhteiskäyttöön",
         title: "Myönnä toisille tämän tiedoston käyttöoikeudet"
      },
      timestamp: {
         created: {
            DAY: "Luotu ${EEEE} kello ${time}",
            MONTH: "Luotu ${MMM} ${d}",
            TODAY: "Luotu tänään kello ${time}",
            YEAR: "Luotu ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Luotu eilen kello ${time}",
            TOMORROW: "Luotu ${MMM} ${d}, ${YYYY}"
         },
         createdOther: {
            DAY: "${user} on luonut tiedoston ${EEEE} kello ${time}",
            MONTH: "${user} on luonut tiedoston ${MMM} ${d}",
            TODAY: "${user} on luonut tiedoston tänään kello ${time}",
            YEAR: "${user} on luonut tiedoston ${MMM} ${d} ${YYYY}",
            YESTERDAY: "${user} on luonut tiedoston eilen kello ${time}",
            TOMORROW: "${user} on luonut tiedoston ${MMM} ${d} ${YYYY}"
         },
         updated: {
            DAY: "Päivitetty ${EEEE} kello ${time}",
            MONTH: "Päivitetty ${MMM} ${d}",
            TODAY: "Päivitetty tänään kello ${time}",
            YEAR: "Päivitetty ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Päivitetty eilen kello ${time}",
            TOMORROW: "Päivitetty ${MMM} ${d}, ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} on päivittänyt tiedoston ${EEEE} kello ${time}",
            MONTH: "${user} on päivittänyt tiedoston ${MMM} ${d}",
            TODAY: "${user} on päivittänyt tiedoston tänään kello ${time}",
            YEAR: "${user} on päivittänyt tiedoston ${MMM} ${d} ${YYYY}",
            YESTERDAY: "${user} on päivittänyt tiedoston eilen kello ${time}",
            TOMORROW: "${user} on päivittänyt tiedoston ${MMM} ${d} ${YYYY}"
         },
         createdCompact: {
            DAY: "Luotu: ${EEEE} kello ${time}",
            MONTH: "Luotu: ${MMM} ${d}",
            TODAY: "Luotu: tänään kello ${time}",
            YEAR: "Luotu: ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Luotu: eilen kello ${time}",
            TOMORROW: "Luotu: ${MMM} ${d} ${YYYY}"
         },
         updatedCompact: {
            DAY: "Päivitetty: ${EEEE} kello ${time}",
            MONTH: "Päivitetty: ${MMM} ${d}",
            TODAY: "Päivitetty: tänään kello ${time}",
            YEAR: "Päivitetty: ${MMM} ${d} ${YYYY}",
            YESTERDAY: "Päivitetty: eilen kello ${time}",
            TOMORROW: "Päivitetty: ${MMM} ${d} ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long}, ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long}, ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} kello ${time_long}"
      },
      download: {
      	 TOOLTIP: "Lataa tiedosto (${size})",
      	 DOWNLOAD_ALT: "Lataa"
      },

      PREVIEW: {
         LINK: "Esikatselu",
         TITLE: "Esikatsele tiedostoa uudessa ikkunassa."
      },
      TAGS: "Tunnisteet:",
      error: "On ilmennyt virhe.  ${again}.",
      error_again: "Yritä uudelleen.",
      error_404: "Tiedostoa ei ole enää, tai käyttöoikeudet eivät riitä tiedoston käsittelyyn.",
      error_403: "Sinulla ei ole tiedoston tarkasteluoikeuksia. Tiedosto ei ole julkinen, eikä sitä ole määritetty sinulle yhteiskäyttöön.",
      notifications: {
         USER_SHARED: "${user} kirjoitti:",
         CHANGE_SUMMARY: "${user} antoi muutosten tiivistelmän",
         NO_CHANGE_SUMMARY: "${user} ei antanut muutosten tiivistelmää",
         COMMENTED: "${user} kommentoi"
      }
   },
   ecm_file: {
      checkedout_you: "Olet kuitannut sisällön ulos itse",
      checkedout_other: "Uloskuittaaja: ${user}",
      tooltip: "Avaa kirjaston tiedosto ${name}",
      draft_404_info: "Luonnos on poistettu, tai se ei ole enää yhteiskäytössä kanssasi. Julkaistu versio on nyt tämän tiedoston uusin versio.",
      error_404: "Tiedosto on poistettu, tai se ei ole enää yhteiskäytössä kanssasi.",
      error_403: "Tiedosto on poistettu, tai se ei ole enää yhteiskäytössä kanssasi.",
      error_preview: "Tiedostoa ei voi enää esikatsella.",
      draft_review_canceled: "Tarkistus on peruutettu, eikä luonnos ole enää yhteiskäytössä kanssasi. Arviotasi ei enää pyydetä.",
      switch_ee: "Näytä luonnos",
      switch_ee_tooltip: "Näytä tiedoston viimeisin luonnos"
   },
   ecm_draft: {
      tooltip: "Avaa kirjaston luonnos ${name}",
      community_owners: "Yhteisön omistajat",
      draft: "Luonnos",
      draft_tooltip: "Luonnoksen tarkastelu",
      draft_general_info: "Edellistä luonnosta ei enää ole, ja uusi luonnos on nyt viimeisin versio.",
      draft_review_404_general_info: "Yksi tarkistajista on jo äänestänyt. Sinua ei pyydetä enää tarkistamaan tätä luonnosta.",
      draft_review_404_request_info: "Edellistä luonnosta ei ole enää, ja viimeisin luonnos on lähetetty tarkistettavaksi. Arviotasi pyydetään.",
      draft_review_404_require_info: "Edellistä luonnosta ei ole enää, ja viimeisin luonnos on lähetetty tarkistettavaksi. Arviosi on pakollinen.",
      draft_review_request_info: "Arviotasi pyydetään.",
      draft_review_require_info: "Arviosi on pakollinen.",
      error_404: "Luonnos on poistettu, tai se ei ole enää yhteiskäytössä kanssasi.",
      error_403: "Et voi tarkastella luonnosta, koska se ei ole yhteiskäytössä kanssasi.",
      error_preview: "Luonnosta ei voi enää esikatsella.",
      switch_ee: "Näytä julkaistu versio",
      switch_ee_tooltip: "Näytä tiedoston julkaistu versio",
      review: "Tarkistus",
      reviewers: "Tarkistajat",
      reviwers_addtl: "Lisätarkistajat",
      in_review: "Tarkistettavana oleva luonnos",
      in_review_tooltip: "Tarkistettavana olevan luonnoksen tarkastelu",
      review_required_any: "Yhteisön omistajat edellyttävät, että yksi tarkistaja tarkistaa tämän luonnoksen.",
      review_required_all: "Yhteisön omistajat edellyttävät, että kaikki tarkistajat tarkistavat tämän luonnoksen.",
      review_required_generic: "Yhteisön omistajat edellyttävät, että nämä tarkistajat tarkistavat tämän luonnoksen.",
      review_additional_required: "Kaikkien luonnoksen lähettäjän lisäämien tarkistajien on tarkistettava tämä luonnos.",
      reivew_submitted_date: {
         DAY: "${user} lähetti luonnoksen tarkistettavaksi ${EEEE} kello ${time}.",
         MONTH: "${user} lähetti luonnoksen tarkistettavaksi ${MMM} ${d}.",
         TODAY: "${user} lähetti luonnoksen tarkistettavaksi tänään kello ${time}.",
         YEAR: "${user} lähetti luonnoksen tarkistettavaksi ${MMM} ${d} ${YYYY}.",
         YESTERDAY: "${user} lähetti luonnoksen tarkistettavaksi eilen kello ${time}.",
         TOMORROW: "${user} lähetti luonnoksen tarkistettavaksi ${MMM} ${d} ${YYYY}."
      },
      pending: "Odottaa",
      pending_rejected: "Tarkistusta ei tarvita enää, koska luonnos on hylätty.",
      approve: "Hyväksy",
      approved: "Hyväksytty",
      approve_tooltip: "Hyväksy tämä luonnos",
      accept_success: "Olet hyväksynyt luonnoksen.",
      accept_error: "Luonnosta hyväksyttäessä on ilmennyt virhe. Yritä uudelleen.",
      accept_info: "Olet hyväksynyt luonnoksen.",
      reject: "Hylkää",
      rejected: "Hylätty",
      reject_tooltip: "Hylkää luonnos",
      reject_success: "Olet hylännyt luonnoksen.",
      reject_error: "Luonnosta hylättäessä on ilmennyt virhe. Yritä uudelleen.",
      reject_info: "Olet hylännyt luonnoksen."
   },
   authUser: {
      error: "Nykyisen käyttäjän noudossa on ilmennyt virhe.  ${again}.",
      error_again: "Yritä uudelleen.",
      error_404: "Todennettua käyttäjää ei löydy.",
      error_403: "Käyttöoikeudet eivät riitä käyttäjätietojen noutoon."
   },
   forum: {
      error: "On ilmennyt virhe.  ${again}.",
      error_again: "Yritä uudelleen.",
      error_404: "Keskusteluryhmää ei ole enää, tai käyttöoikeudet eivät riitä keskusteluryhmän käsittelyyn.",
      error_403: "Sinulla ei ole keskusteluryhmän tarkasteluoikeuksia. Keskusteluryhmä ei ole julkinen, eikä se ole yhteiskäytössä kanssasi.",

      readMore: "Näytä koko aihe...",
      readMore_tooltip: "Avaa keskusteluryhmän aihe ${name}.",
      readMore_a11y: "Kun tämä linkki aktivoidaan, keskusteluryhmän aihe ${name} aukeaa uuteen ikkunaan.",
      QUESTION_ANSWERED: "Tähän kysymykseen on vastattu.",
      QUESTION_NOT_ANSWERED: "Tähän kysymykseen ei vielä ole vastattu.",

      attachments: "${count} liitettä",
      attachments_one: "${count} liite"
   },
   blog: {
      error: "On ilmennyt virhe.  ${again}.",
      error_again: "Yritä uudelleen.",
      error_404: "Verkkolokia ei ole enää, tai käyttöoikeudet eivät riitä verkkolokin käsittelyyn.",
      error_403: "Sinulla ei ole verkkolokin tarkasteluoikeuksia. Verkkoloki ei ole julkinen, eikä se ole yhteiskäytössä kanssasi.",
      readMore: " Lisätietoja...",
      readMore_tooltip: "Avaa verkkolokin merkintä ${name}.",
      readMore_a11y: "Kun tämä linkki aktivoidaan, verkkolokin merkintä ${name} aukeaa uuteen ikkunaan.",
      graduated: "Valmistunut",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Äänestä</a>",
  					TOOLTIP: 	"Äänestä tätä"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Äänestetty</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Äänestetty</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Kumoa</a>",
  					TOOLTIP: 	"Poista ääni tältä"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 henkilöä on äänestänyt tätä"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 henkilö on äänestänyt tätä"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} henkilöä on äänestänyt tätä"
  				}
  			},
  			LOADING: "Lataus on meneillään...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Äänestetty"
  			}
  		}
   },
   idea: {
	  error_404: "Äänesi tallennus ei onnistunut, koska kaikki äänesi on jo annettu tai idea ei ole enää käytettävissä.",
      readMore_tooltip: "Avaa idea ${name}.",
      readMore_a11y: "Kun tämä linkki aktivoidaan, idea ${name} aukeaa uuteen ikkunaan."
   },
   size: {
      B: "${0} t",
      KB: "${0} kt",
      MB: "${0} Mt",
      GB: "${0} Gt"
   },
   REPLIES: {
      ARIA_LABEL: "Vastaukset",
      THIS_ARIA_LABEL: "Tämä vastaus",
      THIS_TAB_TITLE: "Tämä vastaus",
      TAB_TITLE: "Vastaukset (${0})",
      REPLY_TO_REPLY: "Vastauksena ${thisReply}",
      REPLY_TO_TOPIC: "Vastauksena ${thisTopic}",
      THIS_TOPIC: "tähän aiheeseen",
      THIS_REPLY: "tähän vastaukseen",
      NAVIGATE_TO_REPLY: "Siirry päävastaukseen",
      NAVIGATE_TO_TOPIC: "Siirry pääaiheeseen",
      ADD_COMMENT: "Vastaa tähän aiheeseen",
      ADD_COMMENT_TOOLTIP: "Vastaa tähän keskusteluryhmän aiheeseen",
      SHOWING_RECENT_REPLIES: "Näkyvissä on ${0} uusinta vastausta",
      PREV_COMMENTS: "Näytä lisää vastauksia",
      PLACEHOLDER_TXT: "Vastaa tähän aiheeseen",
      EMPTY: "Vastauksia ei ole.",
      TRIM_LONG_COMMENT: "Haluatko lyhentää vastausta?",
      WARN_LONG_COMMENT: "Vastaus on liian pitkä.  ${shorten}",
      ERROR: "Vastauksia noudettaessa on ilmennyt virhe. ${again}",
      ERROR_CREATE: "Vastauksen tallennus ei onnistunut.  Yritä myöhemmin uudelleen.",
      ERROR_CREATE_NOT_FOUND: "Vastauksen tallennus ei onnistunut, koska aihe on poistettu tai se ei ole enää näkyvissä.",
      ERROR_CREATE_ACCESS_DENIED: "Vastauksen tallennus ei onnistunut, koska aihe on poistettu tai se ei ole enää näkyvissä.",
      ERROR_CREATE_TIMEOUT: "Vastauksen tallennus ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä uudelleen napsauttamalla Tallenna-painiketta.",
      ERROR_CREATE_CANCEL: "Vastauksen tallennus ei onnistunut, koska pyyntö peruutettiin.  Yritä uudelleen napsauttamalla Tallenna-painiketta.",
      ERROR_CREATE_NOT_LOGGED_IN: "Tämän vastauksen luonti edellyttää, että olet kirjautuneena sisään.  Tuo sisäänkirjauskehote näkyviin valitsemalla Tallenna-vaihtoehto.",
      ERROR_NO_CONTENT: "Kirjoita vastaus ja napsauta Tallenna-painiketta.  Jos et halua enää lähettää vastausta, napsauta Peruuta-painiketta.",
      ERROR_UNAUTHORIZED: "Vastauksen tallennus ei onnistunut, koska sinulla ei ole oikeuksia jättää vastausta.",
      COMMENT_DELETED: {
         DAY: "${user} on poistanut vastauksen ${EEEE} kello ${time}",
         MONTH: "${user} on poistanut vastauksen ${MMM} ${d}",
         TODAY: "${user} on poistanut vastauksen tänään kello ${time}",
         YEAR: "${user} on poistanut vastauksen ${MMM} ${d} ${YYYY}",
         YESTERDAY: "${user} on poistanut vastauksen eilen kello ${time}",
         TOMORROW: "${user} on poistanut vastauksen ${MMM} ${d} ${YYYY}"
      },
      REASON_FOR_DELETION: "Poiston syy: ${reason}",
      REPLY_TITLE: "Vs: ${0}",
      SHOW_FULL_REPLY: "Näytä koko vastaus",
      SHOW_FULL_REPLY_TOOLTIP: "Siirry alkuperäiseen vastaukseen keskusteluryhmän aiheessa",
      REPLY_ACTION: "Vastaa",
      REPLY_ACTION_TOOLTIP: "Vastaa tähän viestiin",
      MODERATION_PENDING: "Tämä vastaus odottaa tarkistusta.",
      MODERATION_QUARANTINED: "Valvoja on asettanut viestin karanteeniin.",
      MODERATION_REMOVED: {
         DAY: "${user} on poistanut vastauksen ${EEEE} kello ${time}.",
         MONTH: "${user} on poistanut vastauksen ${MMM} ${d}.",
         TODAY: "${user} on poistanut vastauksen tänään kello ${time}.",
         YEAR: "${user} on poistanut vastauksen ${MMM} ${d} ${YYYY}.",
         YESTERDAY: "${user} on poistanut vastauksen eilen kello ${time}.",
         TOMORROW: "${user} on poistanut vastauksen ${MMM} ${d} ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "${user} on hylännyt vastauksen ${EEEE} kello ${time}.",
         MONTH: "${user} on hylännyt vastauksen ${MMM} ${d}.",
         TODAY: "${user} on hylännyt vastauksen tänään kello ${time}.",
         YEAR: "${user} on hylännyt vastauksen ${MMM} ${d} ${YYYY}.",
         YESTERDAY: "${user} on hylännyt vastauksen eilen kello ${time}.",
         TOMORROW: "${user} on hylännyt vastauksen ${MMM} ${d} ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Vastauksesi on lähetetty tarkistettavaksi. Kohde on käytettävissä, kun se on hyväksytty."
   },
   COMMENTS: {
      ARIA_LABEL: "Kommentit",
      PLACEHOLDER_TXT: "Lisää kommentti",
      TAB_TITLE: "Kommentit (${0})",
      ACTION_NOT_SUPPORTED: "Toiminto ei ole tuettu",
      ADD_COMMENT: "Lisää kommentti",
      ADD_COMMENT_TOOLTIP: "Lisää kommentti tähän kohteeseen",
      CANCEL: "Peruuta",
      COMMENT_COUNT_ONE: "${0} kommentti",
      COMMENT_COUNT_MANY: "${0} kommenttia",
      COMMENT_LABEL: "Kommentti:",
      DELETE: "Poista",
      DELETE_TOOLTIP: "Poista kommentti",
      DELETEREASON: "Kommentin poiston syy:",
      DIALOG_TITLE: "Lyhennä kommenttia",
      TOOLTIP: "Lyhennä kommenttia",
      NAME: "Lyhennä kommenttia",
      EDIT: "Muokkaa",
      EDIT_TOOLTIP: "Muokkaa kommenttia",
      ERROR_CREATE: "Kommentin tallennus ei onnistunut.  Yritä myöhemmin uudelleen.",
      ERROR_CREATE_NOT_FOUND: "Kommentin tallennus ei onnistunut, koska kohde on poistettu tai se ei ole enää näkyvissä.",
      ERROR_CREATE_ACCESS_DENIED: "Kommentin tallennus ei onnistunut, koska kohde on poistettu tai se ei ole enää näkyvissä.",
      ERROR_CREATE_TIMEOUT: "Kommentin tallennus ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä uudelleen napsauttamalla Lisää-painiketta.",
      ERROR_CREATE_CANCEL: "Kommentin tallennus ei onnistunut, koska pyyntö peruutettiin.  Yritä uudelleen napsauttamalla Lisää-painiketta.",
      ERROR_CREATE_NOT_LOGGED_IN: "Tämän kommentin luonti edellyttää, että olet kirjautuneena sisään.  Tuo sisäänkirjauskehote näkyviin napsauttamalla Lisää-painiketta.",
      ERROR_DELETE: "Kommentin poisto ei onnistunut.  Yritä myöhemmin uudelleen.",
      ERROR_DELETE_TIMEOUT: "Kommentin poisto ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä uudelleen napsauttamalla Poista-painiketta.",
      ERROR_DELETE_NOT_FOUND: "Kommentin poisto ei onnistunut, koska kommentti tai kohde on poistettu tai se ei ole enää näkyvissä.",
      ERROR_DELETE_ACCESS_DENIED: "Kommentin poisto ei onnistunut, koska kohde on poistettu tai se ei ole enää näkyvissä.",
      ERROR_DELETE_CANCEL: "Kommentin poisto ei onnistunut, koska pyyntö peruutettiin.  Yritä uudelleen napsauttamalla Poista-painiketta.",
      ERROR_DELETE_NOT_LOGGED_IN: "Tämän kommentin poisto edellyttää, että olet kirjautuneena sisään.  Tuo sisäänkirjauskehote näkyviin valitsemalla Poista-vaihtoehto.",
      ERROR_EDIT: "Kommentin päivitys ei onnistunut.  Yritä myöhemmin uudelleen.",
      ERROR_EDIT_ACCESS_DENIED: "Kommentin päivitys ei onnistunut, koska kohde on poistettu tai se ei ole enää näkyvissä.",
      ERROR_EDIT_NOT_FOUND: "Kommentin päivitys ei onnistunut, koska kohde on poistettu tai se ei ole enää näkyvissä.",
      ERROR_EDIT_TIMEOUT: "Kommentin päivitys ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä uudelleen napsauttamalla Lisää-painiketta.",
      ERROR_EDIT_CANCEL: "Kommentin päivitys ei onnistunut, koska pyyntö peruutettiin.  Yritä uudelleen napsauttamalla Lisää-painiketta.",
      ERROR_EDIT_NOT_LOGGED_IN: "Tämän kommentin muokkaus edellyttää, että olet kirjautuneena sisään.  Tuo sisäänkirjauskehote näkyviin napsauttamalla Lisää-painiketta.",
      ERROR_NO_CONTENT: "Kirjoita kommentti ja napsauta Lisää-painiketta.  Jos et haluakaan kommentoida, napsauta Peruuta-painiketta.",
      ERROR_NO_CONTENT_EDIT: "Kirjoita kommentti ja napsauta Lisää-painiketta.  Jos et enää halua muokata kommenttiasi, napsauta Peruuta-painiketta.",
      ERROR_UNAUTHORIZED: "Kommentin tallennus ei onnistunut, koska sinulla ei ole oikeuksia jättää kommenttia.",
      ERROR_GENERAL: "On ilmennyt virhe.",
      OK: "OK",
      YES: "Kyllä",
      TRIM_LONG_COMMENT: "Haluatko lyhentää kommenttia?",
      WARN_LONG_COMMENT: "Kommentti on liian pitkä.  ${shorten}",
      LINK: "Linkki",
      SAVE: "Tallenna",
      POST: "Lisää",
      SHOWMORE: "Lisätietoja...",
      VIEW_COMMENTS_FILE: "Näytä tiedoston kommentit",
      SUBSCRIBE_TO_COMMENTS: "Tilaa nämä kommentit",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Seuraa näiden kommenttien muutoksia syötteiden lukuohjelmalla",
      PROFILE_TITLE: "Avaa käyttäjän ${user} profiili.",
      PROFILE_A11Y: "Kun tämä linkki aktivoidaan, käyttäjän ${user} profiili aukeaa uuteen ikkunaan.",
      MODERATION_PENDING: "Tämä kommentti odottaa tarkistusta.",
      MODERATION_REMOVED: {
         DAY: "${user} on poistanut kommentin ${EEEE} kello ${time}.",
         MONTH: "${user} on poistanut kommentin ${MMM} ${d}.",
         TODAY: "${user} on poistanut kommentin tänään kello ${time}.",
         YEAR: "${user} on poistanut kommentin ${MMM} ${d} ${YYYY}.",
         YESTERDAY: "${user} on poistanut kommentin eilen kello ${time}.",
         TOMORROW: "${user} on poistanut kommentin ${MMM} ${d} ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "${user} on poistanut kommentin ${EEEE} kello ${time}.",
         MONTH: "${user} on hylännyt kommentin ${MMM} ${d}.",
         TODAY: "${user} on hylännyt kommentin tänään kello ${time}.",
         YEAR: "${user} on hylännyt kommentin ${MMM} ${d} ${YYYY}.",
         YESTERDAY: "${user} on hylännyt kommentin eilen kello ${time}.",
         TOMORROW: "${user} on hylännyt kommentin ${MMM} ${d} ${YYYY}."
      },
      PREV_COMMENTS: "Näytä edelliset kommentit",
      EMPTY: "Kommentteja ei ole.",
      ERROR_ALT: "Virhe",
      ERROR: "Kommentteja noudettaessa on ilmennyt virhe. ${again}",
      ERROR_ADDTL: "Lisäkommentteja noudettaessa on ilmennyt virhe. ${again}",
      ERROR_AGAIN: "Yritä uudelleen.",
      ERROR_AGAIN_TITLE: "Yritä lisäkommenttien pyyntöä uudelleen.",
      COMMENT_CREATED: {
         DAY: "${user}, ${EEEE} kello ${time} (versio ${version})",
         MONTH: "${user}, ${MMM} ${d} (versio ${version})",
         TODAY: "${user}, tänään kello ${time} (versio ${version})",
         YEAR: "${user}, ${MMM} ${d} ${YYYY} (versio ${version})",
         YESTERDAY: "${user}, eilen kello ${time} (versio ${version})",
         TOMORROW: "${user}, ${MMM} ${d} ${YYYY} (versio ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user}, ${EEEE} kello ${time}",
         MONTH: "${user}, ${MMM} ${d}.",
         TODAY: "${user}, tänään kello ${time}",
         YEAR: "${user}, ${MMM} ${d}., ${YYYY}",
         YESTERDAY: "${user}, eilen kello ${time}",
         TOMORROW: "${user}, ${MMM} ${d}., ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} kello ${time}",
         MONTH: "${MMM}n ${d}.",
         TODAY: "Tänään kello ${time}",
         YEAR: "${MMM}n ${d}., ${YYYY}",
         YESTERDAY: "Eilen kello ${time}",
         TOMORROW: "${MMM}n ${d}., ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "${user} on poistanut kommentin ${EEEE} kello ${time}",
         MONTH: "${user} on poistanut kommentin ${MMM} ${d}",
         TODAY: "${user} on poistanut kommentin tänään kello ${time}",
         YEAR: "${user} on poistanut kommentin ${MMM} ${d} ${YYYY}",
         YESTERDAY: "${user} on poistanut kommentin eilen kello ${time}",
         TOMORROW: "${user} on poistanut kommentin ${MMM} ${d} ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} on muokannut kommenttia ${EEEE} kello ${time} (versio ${version})",
         MONTH: "${user} on muokannut kommenttia ${MMM} ${d} (versio ${version})",
         TODAY: "${user} on muokannut kommenttia tänään kello ${time} (versio ${version})",
         YEAR: "${user} on muokannut kommenttia ${MMM} ${d} ${YYYY} (versio ${version})",
         YESTERDAY: "${user} on muokannut kommenttia eilen kello ${time} (versio ${version})",
         TOMORROW: "${user} on muokannut kommenttia ${MMM} ${d} ${YYYY} (versio ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} on muokannut kommenttia ${EEEE} kello ${time}",
         MONTH: "${user} on muokannut kommenttia ${MMM} ${d}",
         TODAY: "${user} on muokannut kommenttia tänään kello ${time}",
         YEAR: "${user} on muokannut kommenttia ${MMM} ${d} ${YYYY}",
         YESTERDAY: "${user} on muokannut kommenttia eilen kello ${time}",
         TOMORROW: "${user} on muokannut kommenttia ${MMM} ${d} ${YYYY}"
      },

      DELETE_CONFIRM: "Haluatko varmasti poistaa tämän kommentin?",
      FLAG_ITEM: {
         BUSY: "Tallennus on meneillään...",
         CANCEL: "Peruuta",
         ACTION: "Merkitse asiattomaksi",
         DESCRIPTION_LABEL: "Anna syy tämän kohteen merkitsemiselle (valinnainen)",
         EDITERROR: "Tiedoston metatietoja ei ole muokattu, koska on ilmennyt virhe",
         OK: "Tallenna",
         ERROR_SAVING: "Pyynnön käsittelyssä on ilmennyt virhe. Yritä myöhemmin uudelleen.",
         SUCCESS_SAVING: "Merkintä on lähetetty. Valvoja tutkii sen hetken kuluttua.",
         TITLE: "Merkitse kohde asiattomaksi",
         COMMENT: {
            TITLE: "Merkitse kommentti asiattomaksi",
            A11Y: "Tämä painike avaa valintaikkunan, jonka avulla käyttäjä voi merkitä kommentin sopimattomaksi."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Peruuta",
      DIALOG_TITLE: "Poista kommentti",
      NAME: "Poista kommentti",
      OK: "OK",
      TOOLTIP: "Poista kommentti"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Peruuta",
      CONFIRM: "Kun kommenttia lyhennetään, enimmäisrajan ylittävä teksti poistuu.  Lyhennä kommenttia napsauttamalla OK-painiketta tai muokkaa kommenttia itse napsauttamalla Peruuta-painiketta.",
      DIALOG_TITLE: "Lyhennä kommenttia",
      NAME: "Lyhennä kommenttia",
      OK: "OK",
      TOOLTIP: "Lyhennä kommenttia"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Lähetyksen vahvistus",
      CONFIRM: "Kommenttisi on lähetetty tarkistettavaksi. Kohde on käytettävissä, kun se on hyväksytty.",
      OK: "OK"
   },

   DATE: {
      AM: "ap",
      FULL: "${EEEE}, ${date_long} kello ${time_long}",
      PM: "ip",
      TODAY: "tänään",
      TODAY_U: "Tänään",
      YESTERDAY: "eilen",
      YESTERDAY_U: "Eilen",

      ADDED: { DAY: "Lisätty ${EEee} kello ${time}",
         FULL: "${EEEE}, ${date_long} kello ${time_long}",
         MONTH: "Lisätty ${date_long}",
         TODAY: "Lisätty tänään kello ${time}",
         YEAR: "Lisätty ${date_long}",
         YESTERDAY: "Lisätty eilen kello ${time}"
      },

      LAST_UPDATED: { DAY: "Viimeksi päivitetty ${EEee} kello ${time}",
         FULL: "${EEEE}, ${date_long} kello ${time_long}",
         MONTH: "Viimeksi päivitetty ${date_long}",
         TODAY: "Viimeksi päivitetty tänään kello ${time}",
         YEAR: "Viimeksi päivitetty ${date_long}",
         YESTERDAY: "Viimeksi päivitetty eilen kello ${time}"
      },

      MONTHS_ABBR: { 0: "TAMMI",
         10: "MARRAS",
         11: "JOULU",
         1: "HELMI",
         2: "MAALIS",
         3: "HUHTI",
         4: "TOUKO",
         5: "KESÄ",
         6: "HEINÄ",
         7: "ELO",
         8: "SYYS",
         9: "LOKA"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} kello ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Tänään",
         YEAR: "${date_short}",
         YESTERDAY: "Eilen",
         TOMORROW: "Huomenna"
      },

      RELATIVE_TIME: { DAY: "${EEee} kello ${time}",
         FULL: "${EEEE}, ${date_long} kello ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Tänään kello ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Eilen kello ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} kello ${time}",
         FULL: "${EEEE}, ${date_long} kello ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Tänään kello ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Eilen kello ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} kello ${time}",
         FULL: "${EEEE}, ${date_long} kello ${time_long}",
         MONTH: "${date_short} kello ${time}",
         TODAY: "${date_short} kello ${time}",
         YEAR: "${date_short} kello ${time}",
         YESTERDAY: "${date_short} kello ${time}",
         TOMORROW: "${date_short} kello ${time}"
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

      UPDATED: { DAY: "Päivitetty ${EEee} kello ${time}",
         FULL: "${EEEE}, ${date_long} kello ${time_long}",
         MONTH: "Päivitetty ${date_long}",
         TODAY: "Päivitetty tänään kello ${time}",
         YEAR: "Päivitetty ${date_long}",
         YESTERDAY: "Päivitetty eilen kello ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Versiotietojen lataus ei onnistu.",
      ERROR_REQUEST_CANCELLED: "Pyyntö on peruutettu.",
      ERROR_REQUEST_TIMEOUT: "Yhteyden muodostus palvelimeen ei onnistunut.",
      ERROR_REQUEST_UNKNOWN: "On ilmennyt tuntematon virhe.",
      LOADING: "Lataus on meneillään...",
      NO_VERSIONS: "Versioita ei ole",
      INFO: "Version ${0} on luonut ${1} ",
      VERSION_NUMBER: "Versio ${0}",
      DELETED: "Poistettu",
      DELETE_ALL: "Poista kaikki versiot, jotka ovat vanhempia kuin käsiteltävä versio",
      DELETE_VERSION_SINGLE: "Poista versio ${0}",
      DELETEERROR: "Versiota ei ole poistettu, koska on ilmennyt virhe.",
      CREATE_VERSION: "Luo uusi versio",
      CREATE_VERSION_TOOLTIP: "Luo versio tästä tiedostosta",
      REVERT_VERSION: "Palauta versio ${0}",
      REVERT_DESCRIPTION: "Palautettu versiosta ${0}",
      PREVIOUS: "Edellinen",
      PREVIOUS_TOOLTIP: "Edellinen sivu",
      ELLIPSIS: "...",
      NEXT: "Seuraava",
      NEXT_TOOLTIP: "Seuraava sivu",
      COUNT: "${0} - ${1}/${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Sivu",
      SHOW: "Näytä",
      ITEMS_PER_PAGE: " kohdetta sivulla.",
      DATE: {
        AM: "ap",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} kello ${time_long}",
            MONTH: "${date}",
            TODAY: "Tänään kello ${time}",
            YESTERDAY: "Eilen kello ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} kello ${time}",
            YEAR: "${date_short} kello ${time}",
            FULL: "${EEEE}, ${date_long} kello ${time_long}",
            MONTH: "${date_short} kello ${time}",
            TODAY: "tänään kello ${time}",
            YESTERDAY: "eilen kello ${time}"
        },
        UPDATED: { DAY: "Päivitetty ${EEee} kello ${time}",
            YEAR: "Päivitetty ${date_short}",
            FULL: "${EEEE}, ${date_long} kello ${time_long}",
            MONTH: "Päivitetty ${date_short}",
            TODAY: "Päivitetty tänään kello ${time}",
            YESTERDAY: "Päivitetty eilen kello ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Poista versio ${0}",
         DOWNLOAD: "Lataa",
         DOWNLOAD_TOOLTIP: "Lataa tämä versio (${0})",
         VIEW: "Näytä",
         VIEW_TOOLTIP: "Näytä versio ${0}",
         REVERT: {
            A11Y: "Tämä painike avaa valintaikkunan, jonka avulla käyttäjä voi vahvistaa tiedoston palautuksen edellisestä versiosta. Kun vahvistat toiminnon, sivun sisältö päivittyy.",
            FULL: "Palauta",
            WIDGET: "Palauta tämä versio"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Version poisto ei onnistunut, koska se on jo poistettu tai se ei ole enää näkyvissä.",
         ERROR_ACCESS_DENIED: "Version poisto ei onnistunut, koska et ole muokkaaja.",
         ERROR_TIMEOUT: "Versiota ei poistettu, koska yhteyden muodostus palvelimeen epäonnistui.  Yritä pyyntöä uudelleen napsauttamalla Poista-painiketta uudelleen.",
         ERROR_CANCEL: "Versiota ei poistettu, koska pyyntö peruutettiin.  Yritä pyyntöä uudelleen napsauttamalla Poista-painiketta uudelleen.",
         ERROR_NOT_LOGGED_IN: "Version poisto edellyttää, että olet kirjautuneena sisään.  Tuo sisäänkirjauskehote näkyviin valitsemalla Poista-vaihtoehto.",
         GENERIC_ERROR: "Version poisto ei onnistunut tuntemattoman virheen takia.  Yritä pyyntöä uudelleen napsauttamalla Poista-painiketta uudelleen.",
         FULL: "Poista",
         A11Y: "Tämä painike avaa valintaikkunan, jonka avulla käyttäjä voi vahvistaa tämän version poiston. Kun vahvistat toiminnon, sivun sisältö päivittyy."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Version palautus ei onnistunut, koska versio on poistettu tai se ei ole enää näkyvissä.",
         ERROR_ACCESS_DENIED: "Version palautus ei onnistunut, koska et ole muokkaaja.",
         ERROR_NAME_EXISTS: "Version palautus ei onnistunut, koska toisella tiedostolla on sama nimi.",
         ERROR_TIMEOUT: "Version palautus ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä pyyntöä uudelleen napsauttamalla Palauta-painiketta uudelleen.",
         ERROR_CANCEL: "Version palautus ei onnistunut, koska pyyntö peruutettiin.  Yritä pyyntöä uudelleen napsauttamalla Palauta-painiketta uudelleen.",
         ERROR_QUOTA_VIOLATION: "Version palautus ei onnistunut tilarajoitusten takia.",
         ERROR_MAX_CONTENT_SIZE: "Version palautus ei onnistunut, koska sen koko on suurempi kuin tiedostojen sallittu enimmäiskoko ${0}",
         GENERIC_ERROR: "Version palautus ei onnistunut tuntemattoman virheen takia.  Yritä pyyntöä uudelleen napsauttamalla Palauta-painiketta uudelleen."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Näytä, kuka on ladannut...",
      PREVIOUS: "Edellinen",
      PREVIOUS_TOOLTIP: "Edellinen sivu",
      ELLIPSIS: "...",
      NEXT: "Seuraava",
      NEXT_TOOLTIP: "Seuraava sivu",
      COUNT: "${0} - ${1}/${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Sivu",
      SHOW: "Näytä",
      ITEMS_PER_PAGE: " kohdetta sivulla.",
      VERSION: {
         DAY: "Versio ${version} (${date})",
         MONTH: "Versio ${version} (${date})",
         TODAY: "Versio ${version} (kello ${time})",
         YEAR: "Versio ${version} (${date})",
         YESTERDAY: "Version ${version} eilen"
      },

      FILE: {
         V_LATEST: "Olet ladannut tiedoston uusimman version",
         V_OLDER: "Latasit viimeksi tämän tiedoston version ${0}",
         LOADING: "Lataus on meneillään...",
         EMPTY: "Vain anonyymit käyttäjät",
         ERROR: "Lataustietojen lataus ei onnistu"
      }
   },

   EE_DIALOG: {
      ERROR: "Virhe",
      ERROR_ALT_TEXT: "Virhe:",
      ERROR_MSG_GENERIC: "On ilmennyt ongelma.  Yritä uudelleen.",
      ERROR_MSG_NOT_AVAILABLE: "Kohde on poistettu, tai se ei ole enää käytettävissä.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Objektin sisältö ei ole käytettävissä.",
      ERROR_MSG_NO_ACCESS: "Sinulla ei ole enää tämän kohteen käyttöoikeuksia.",
      LOADING: "Lataus on meneillään...",
      TITLE_SU: "${author} on lisännyt viestin.",
      TITLE_NI: "${author} kutsui sinut liittymään verkostoonsa.",
      AUTHOR_TITLE: "Tarkastele tekijän ${author} profiilia",
      OPEN_LINK: "Avaa ${title}",
      CONFIRM_CLOSE_TITLE: "Vahvista",
      CONFIRM_CLOSE_MESSAGE: "Haluatko varmasti hylätä muutokset? Jatka napsauttamalla OK-painiketta, tai palaa napsauttamalla Peruuta-painiketta.",
      OK: "OK",
      CANCEL: "Peruuta"
   },
   MESSAGE: {
      SUCCESS: "Vahvistus",
      ERROR: "Virhe",
      ERROR_ALT_TEXT: "Virhe:",
      INFO: "Ilmoitus",
      WARNING: "Varoitus",
      DISMISS: "Piilota tämä sanoma",
      MORE_DETAILS: "Lisätietoja",
      HIDE_DETAILS: "Piilota tiedot"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Luotu: ${EEEE} kello ${time}",
           MONTH: "Luotu: ${MMM} ${d}",
           TODAY: "Luotu: tänään kello ${time}",
           YEAR: "Luotu: ${MMM} ${d} ${YYYY}",
           YESTERDAY: "Luotu: eilen kello ${time}",
           TOMORROW: "Luotu: ${MMM} ${d} ${YYYY}"
       },
      error: "On ilmennyt virhe.  ${again}.",
      error_again: "Yritä uudelleen.",
      error_404: "Tilapäivitystä ei ole enää.",
      notifications: {
         STATUS_UPDATE: "${user} on lisännyt viestin",
         USER_BOARD_POST: "${user} kirjoitti tauluusi.",
         POST_COMMENT: "${user} kirjoitti:"
      }
   },
   login: {
      error: "Käyttäjätunnus ja salasana eivät vastaa mitään luotua tiliä. Yritä uudelleen.",
      logIn: "Kirjaudu sisään",
      password: "Salasana:",
      user: "Käyttäjätunnus:",
      welcome: "Kirjaudu HCL Connections -ohjelmaan"
   },
   repost: {
      name: "Julkaise uudelleen",
      title: "Julkaise päivitys uudelleen seuraajilleni tai yhteisöilleni",
      msg_success: "Järjestelmä on lähettänyt päivityksen uudelleen seuraajillesi.",
      msg_generic: "On ilmennyt ongelma.  Yritä uudelleen."
   },
   FILE_SHARE_INFO: {
      ADD: "Lisää",
      ADD_TXT: "Lisää henkilöitä tai yhteisöjä lukijoiksi",
      SHOW_MORE: "Näytä lisää...",
      READER_IF_PUBLIC: "Kaikki (julkinen)",
      READER_IF_PUBLIC_TOOLTIP: "Tämä tiedosto on julkinen ja kaikkien käyttäjien nähtävissä",
      EMPTY_READERS: "Ei mitään",
      READERS_LABEL: "Lukijat: ",
      EDITORS_LABEL: "Muokkaajat: ",
      OWNER_LABEL: "Omistaja: ",
      ERROR: "Yhteiskäyttötietojen lataus ei onnistu",
      ERROR_NOT_FOUND: "Pyydetty tiedosto on poistettu tai siirretty. Jos sait tämän linkin joltakulta, tarkista, että linkki on virheetön.",
      ERROR_ACCESS_DENIED: "Sinulla ei ole tiedoston tarkasteluoikeuksia.  Tiedosto ei ole julkinen, eikä sitä ole määritetty sinulle yhteiskäyttöön.",
      SHARE: "Määritä yhteiskäyttöön",
      CANCEL: "Peruuta",
      SHARE_WITH: "Yhteiskäyttäjät:",
      PERSON: "Henkilö",
      COMMUNITY: "Yhteisö",
      PLACEHOLDER: "Henkilön nimi tai sähköpostiosoite...",
      MESSAGE: "Viesti:",
      MESSAGE_TXT: "Lisää valinnainen viesti",
      REMOVE_ITEM_ALT: "Poista ${0}",
      NO_MEMBERS: "Ei mitään",
      A11Y_READER_ADDED: "${0} on valittu lukijaksi",
      A11Y_READER_REMOVED: "${0} on poistettu lukijoista",
      SELF_REFERENCE_ERROR: "Et voi määrittää itseäsi yhteiskäyttäjäksi.",
      OWNER_REFERENCE_ERROR: "Et voi määrittää tiedoston omistajaa sen yhteiskäyttäjäksi.",
      SHARE_COMMUNITY_WARN: "Jos määrität tiedoston yhteiskäyttöön julkisen yhteisön ${0} kanssa, tiedostosta tulee julkinen.",
      SELECT_USER_ERROR: "Valitse yhteiskäyttöön määritystä varten vähintään yksi henkilö tai yhteisö.",
      WARN_LONG_MESSAGE: "Viesti on liian pitkä.",
      TRIM_LONG_MESSAGE: "Haluatko lyhentää viestiä?",
      ERROR_SHARING: "Tiedoston luovutus yhteiskäyttöön ei onnistunut.  Yritä myöhemmin uudelleen.",
      INFO_SUCCESS: "Tiedosto on määritetty yhteiskäyttöön.",
      MAX_SHARES_ERROR: "Yhteiskäyttökohteiden enimmäismäärä on ylittynyt.",
      NOT_LOGGED_IN_ERROR: "Tiedoston luovutus yhteiskäyttöön ei onnistunut, koska et ollut kirjautunut sisään.  Määritä tiedosto yhteiskäyttöön napsauttamalla Määritä yhteiskäyttöön -painiketta.",
      TIMEOUT_ERROR: "Tiedoston luovutus yhteiskäyttöön ei onnistunut, koska palvelimeen ei saatu yhteyttä.  Yritä uudelleen napsauttamalla Määritä yhteiskäyttöön -painiketta.",
      CANCEL_ERROR: "Tiedoston luovutus yhteiskäyttöön ei onnistunut, koska pyyntö peruutettiin.  Yritä uudelleen napsauttamalla Määritä yhteiskäyttöön -painiketta.",
      NOT_FOUND_ERROR: "Tiedosto on poistettu, tai se ei ole enää näkyvissä, eikä sitä voi määrittää yhteiskäyttöön.",
      ACCESS_DENIED_ERROR: "Sinulla ei ole enää oikeuksia määrittää tätä tiedostoa yhteiskäyttöön.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Rajoitettua tiedostoa ei voi määrittää julkiseksi.",
      TOOLTIP: "Myönnä toisille tämän tiedoston käyttöoikeudet"
   },
   HISTORY: {
      TAB_TITLE: "Viimeisimmät päivitykset",
      NO_HISTORY: "Viimeaikaisia päivityksiä ei ole.",
      EMPTY: "Tämän kohteen viimeisimpien päivitysten nouto ei onnistunut. Kohde on poistettu, tai sinulla ei ole enää sen käyttöoikeutta.",
      MORE: "Näytä edelliset päivitykset",
      ERROR_ALT: "Virhe",
      ERROR: "Päivityksiä noudettaessa on ilmennyt virhe. ${again}",
      ERROR_ADDTL: "Lisäpäivityksiä noudettaessa on ilmennyt virhe. ${again}",
      ERROR_AGAIN: "Yritä uudelleen.",
      ERROR_AGAIN_TITLE: "Yritä lisäpäivitysten pyyntöä uudelleen.",
      PROFILE_TITLE: "Avaa käyttäjän ${user} profiili.",
      SORT_BY: "Lajitteluperuste\\:",
      SORTS: {
         DATE: "Päivämäärä",
         DATE_TOOLTIP: "Lajittele uusimmista päivityksistä vanhimpiin päivityksiin",
         DATE_TOOLTIP_REVERSE: "Lajittele vanhimmista päivityksistä uusimpiin päivityksiin"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} kello ${time}",
             MONTH: "${MMM}n ${d}.",
             TODAY: "Tänään kello ${time}",
             YEAR: "${MMM}n ${d}., ${YYYY}",
             YESTERDAY: "Eilen kello ${time}",
             TOMORROW: "${MMM}n ${d}., ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Tämä kommentti",
	   REPLY_ACTION: "Vastaa",
       REPLY_ACTION_TOOLTIP: "Vastaa tähän kommenttiin"
   },
   OAUTH: {
      welcomeHeader: "Tervetuloa käyttämään Connections-ohjelmaa",
      continueBtnLabel: "Jatka",
      continueBtnA11y: "Tämän linkin aktivointi avaa uuden ikkunan, jonka avulla voit määrittää Connections-sovelluksen käyttöoikeudet.",
      clickHere: "Napsauttamalla tätä",
      infoMsg: "Connections tarvitsee valtuutuksesi, ennen kuin se voi käyttää tietojasi.",
      authorizeGadget: "${clickHere} voit valtuuttaa tämän sovelluksen käyttämään Connections-tietojasi.",
      confirmAuthorization: "${clickHere} voit vahvistaa, että olet valtuuttanut tämän sovelluksen käyttämään Connections-tietojasi."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Tämän linkin aktivointi avaa uuden ikkunan, jonka avulla voit määrittää Connections-ohjelman kirjastotietovaraston käyttöoikeudet.",
      infoMsg: "Connections-ohjelman kirjastotietovarasto tarvitsee valtuutuksesi, ennen kuin se voi käyttää tietoja.",
      authorizeGadget: "${clickHere} voit valtuuttaa tämän sovelluksen käyttämään Connections-ohjelman kirjastotietovaraston tietoja.",
      confirmAuthorization: "${clickHere} voit vahvistaa, että olet valtuuttanut tämän sovelluksen käyttämään Connections-ohjelman kirjastotietovaraston tietoja."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Peruuta",
      CONFIRM: "Haluatko varmasti hylätä muutokset?  Jatka napsauttamalla OK-painiketta tai palaa napsauttamalla Peruuta-painiketta.",
      DIALOG_TITLE: "Vahvista",
      NAME: "Vahvista",
      OK: "OK",
      TOOLTIP: "Vahvista"
   }
})
