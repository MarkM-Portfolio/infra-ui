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
         label: "Více",
         tooltip: "Další akce"
       },
       tags_more: "a další (${0})",
       ERROR_ALT: "Chyba",
       PERSON_TITLE: "Otevřít profil uživatele ${user}",
       inactiveUser: "${user} (neaktivní)",
       inactiveIndicator: "(neaktivní)",
       like_error: "Hodnocení Oblíbené nelze uložit. Zopakujte akci později.",
       vote_error: "Váš hlas nelze uložit. Zopakujte akci později."
   },
   generic: {
      untitled: "(Bez názvu)",
      tags: "Značky:",
      tags_more: "a další (${0})",
      likes: "Hodnocení Oblíbené",
      comments: "Komentáře",
      titleTooltip: "Přejít k aplikaci ${app}",
      error: "Nelze načíst data.",
      timestamp: {
         created: {
            DAY: "Vytvořeno: ${EEEE} v ${time}",
            MONTH: "Vytvořeno ${MMM} ${d}",
            TODAY: "Vytvořeno dnes v ${time}",
            YEAR: "Vytvořeno ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Vytvořeno včera v ${time}",
            TOMORROW: "Vytvořeno ${d}. ${MMM} ${YYYY}"
         },
         updated: {
            DAY: "Aktualizováno: ${EEEE} v ${time}",
            MONTH: "Aktualizováno: ${d}. ${MMM}",
            TODAY: "Aktualizováno dnes v ${time}",
            YEAR: "Aktualizováno ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Aktualizováno včera v ${time}",
            TOMORROW: "Aktualizováno ${d}. ${MMM} ${YYYY}"
         }
      },
      visibility: {
         pub: "Veřejné",
         priv: "Soukromé"
      },
      action: {
         created: "Vytvořeno",
         updated: "Aktualizováno"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Aktualizace informací o sledovaných lidech můžete přijímat prostřednictvím domovské stránky a e-mailového souhrnu.",
      profile_title: "Otevřít profil uživatele ${user}",
      profile_a11y: "Aktivací tohoto odkazu otevřete profil uživatele ${user} v novém okně.",
      error: "Došlo k chybě. ${again}.",
      error_again: "Zopakujte operaci.",
      error_404: "Síťový požadavek již neexistuje.",
      warning: "Varování",
      messages: {
         success: {
            accept: {
            	nofollow: "Stali jste se síťovými kontakty.",
            	follow: "Stali jste se síťovými kontakty a sledujete uživatele ${user}."
            },
            ignore: {
            	nofollow: "Ignorovali jste pozvání.",
            	follow: "Ignorovali jste pozvání, ale sledujete nyní uživatele ${user}."
            }
         },
         error: {
            accept: "Při přijetí požadavku došlo k chybě.",
            ignore: "Při ignorování požadavku došlo k chybě."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} v ${time}",
              MONTH: "${d}. ${MMM}",
              TODAY: "Dnes v ${time}",
              YEAR: "${d}. ${MMM} ${YYYY}",
              YESTERDAY: "Včera v ${time}",
              TOMORROW: "${d}. ${MMM} ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Aktivací tohoto odkazu zobrazíte položku ${name} v novém okně.",
      tooltip: "Otevřít položku ${name}v aplikaci Soubory",
      profile_title: "Otevřít profil uživatele ${user}",
      profile_a11y: "Aktivací tohoto odkazu otevřete profil uživatele ${user} v novém okně.",
      download_tooltip: "Stáhnout tento soubor (${0})",
      following: {
         add: "Sledovat soubor",
         remove: "Ukončit sledování",
         title: "Přepíná, zda vám budou odesílány aktualizace týkající se tohoto souboru."
      },
      share: {
         label: "Sdílet",
         title: "Poskytnout ostatním přístup k tomuto souboru"
      },
      timestamp: {
         created: {
            DAY: "Vytvořeno: ${EEEE} v ${time}",
            MONTH: "Vytvořeno ${MMM} ${d}",
            TODAY: "Vytvořeno dnes v ${time}",
            YEAR: "Vytvořeno ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Vytvořeno včera v ${time}",
            TOMORROW: "Vytvořeno ${d}. ${MMM} ${YYYY}"
         },
         createdOther: {
            DAY: "Vytvořeno uživatelem ${user}: ${EEEE} v ${time}",
            MONTH: "Vytvořeno uživatelem ${user}: ${d}. ${MMM}",
            TODAY: "Vytvořeno uživatelem ${user} dnes v ${time}",
            YEAR: "Vytvořeno uživatelem ${user}: ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Vytvořeno uživatelem ${user} včera v ${time}",
            TOMORROW: "Vytvořeno uživatelem ${user}: ${d}. ${MMM} ${YYYY}"
         },
         updated: {
            DAY: "Aktualizováno: ${EEEE} v ${time}",
            MONTH: "Aktualizováno: ${d}. ${MMM}",
            TODAY: "Aktualizováno dnes v ${time}",
            YEAR: "Aktualizováno ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Aktualizováno včera v ${time}",
            TOMORROW: "Aktualizováno ${d}. ${MMM} ${YYYY}"
         },
         updatedOther: {
            DAY: "Aktualizováno uživatelem ${user}: ${EEEE} v ${time}",
            MONTH: "Aktualizováno uživatelem ${user}: ${d}. ${MMM}",
            TODAY: "Uživatel ${user} provedl aktualizaci dnes v ${time}.",
            YEAR: "Aktualizováno uživatelem ${user}: ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Uživatel ${user} provedl aktualizaci včera v ${time}.",
            TOMORROW: "Aktualizováno uživatelem ${user}: ${d}. ${MMM} ${YYYY}"
         },
         createdCompact: {
            DAY: "Vytvořeno: ${EEEE} v ${time}.",
            MONTH: "Vytvořeno: ${MMM} ${d}",
            TODAY: "Vytvořeno: Dnes v ${time}",
            YEAR: "Vytvořeno: ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Vytvořeno: Včera v ${time}",
            TOMORROW: "Vytvořeno: ${d}. ${MMM} ${YYYY}"
         },
         updatedCompact: {
            DAY: "Aktualizováno: ${EEEE} v ${time}.",
            MONTH: "Aktualizováno: ${MMM} ${d}",
            TODAY: "Aktualizováno: Dnes v ${time}",
            YEAR: "Aktualizováno: ${d}. ${MMM} ${YYYY}",
            YESTERDAY: "Aktualizováno: Včera v ${time}",
            TOMORROW: "Aktualizováno: ${d}. ${MMM} ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "Uživatel ${user} dne ${date_long} v ${time_long}",
         UPDATE_TIMESTAMP: "Uživatel ${user} dne ${date_long} v ${time_long}",
         ANYUPDATE_TIMESTAMP: "${date_long} v ${time_long}"
      },
      download: {
      	 TOOLTIP: "Stáhnout tento soubor (${size})",
      	 DOWNLOAD_ALT: "Stáhnout"
      },

      PREVIEW: {
         LINK: "Náhled",
         TITLE: "Zobrazí náhled tohoto souboru v novém okně."
      },
      TAGS: "Značky:",
      error: "Došlo k chybě. ${again}.",
      error_again: "Zopakujte operaci.",
      error_404: "Soubor již neexistuje nebo pro přístup k němu nemáte oprávnění.",
      error_403: "Nemáte oprávnění k zobrazení tohoto souboru. Soubor není veřejný a není s vámi sdílen.",
      notifications: {
         USER_SHARED: "Uživatel ${user} napsal:",
         CHANGE_SUMMARY: "Uživatel ${user} poskytl souhrn změn",
         NO_CHANGE_SUMMARY: "Uživatel ${user} neposkytl souhrn změn",
         COMMENTED: "Uživatel ${user} přidal komentář"
      }
   },
   ecm_file: {
      checkedout_you: "Zapůjčeno vámi",
      checkedout_other: "Zapůjčeno uživatelem ${user}",
      tooltip: "Otevřít soubor ${name} v knihovně",
      draft_404_info: "Koncept byl odstraněn nebo již s vámi není sdílen. Publikovaná verze je nyní nejnovější verzí tohoto souboru.",
      error_404: "Soubor byl odstraněn nebo již s vámi není sdílen.",
      error_403: "Soubor byl odstraněn nebo již s vámi není sdílen.",
      error_preview: "Soubor již není k dispozici pro zobrazení náhledu.",
      draft_review_canceled: "Revize byla zrušena a koncept již s vámi není sdílen. Vaše revize již není požadována.",
      switch_ee: "Zobrazit koncept",
      switch_ee_tooltip: "Zobrazit nejnovější koncept pro tento soubor"
   },
   ecm_draft: {
      tooltip: "Otevřít koncept ${name} v knihovně",
      community_owners: "Vlastníci komunity",
      draft: "Koncept",
      draft_tooltip: "Zobrazení konceptu",
      draft_general_info: "Předchozí koncept už neexistuje a nejnovější verzi nyní představuje novější koncept.",
      draft_review_404_general_info: "Jeden z recenzentů již odevzdal hlas. Revize tohoto konceptu od vás již není požadována.",
      draft_review_404_request_info: "Předchozí koncept již neexistuje a k revizi byl odeslán nejnovější koncept. Je požadována vaše revize.",
      draft_review_404_require_info: "Předchozí koncept již neexistuje a k revizi byl odeslán nejnovější koncept. Je nutná vaše revize.",
      draft_review_request_info: "Je požadována vaše revize.",
      draft_review_require_info: "Je nutná vaše revize.",
      error_404: "Koncept byl odstraněn nebo již s vámi není sdílen.",
      error_403: "Tento koncept nemůžete zobrazit, protože s vámi není sdílen.",
      error_preview: "Koncept již není k dispozici pro zobrazení náhledu.",
      switch_ee: "Zobrazit publikovanou verzi",
      switch_ee_tooltip: "Zobrazit publikovanou verzi tohoto souboru",
      review: "Revize",
      reviewers: "Recenzenti",
      reviwers_addtl: "Další recenzenti",
      in_review: "Koncept s probíhající revizí",
      in_review_tooltip: "Zobrazit koncept pro revizi",
      review_required_any: "Vlastníci komunity požadují revizi tohoto konceptu jedním recenzentem.",
      review_required_all: "Vlastníci komunity požadují revizi tohoto konceptu všemi recenzenty.",
      review_required_generic: "Vlastníci komunity požadují revizi tohoto konceptu těmito recenzenty.",
      review_additional_required: "Tento koncept musí revidovat všichni recenzenti přidaní zadavatelem konceptu.",
      reivew_submitted_date: {
         DAY: "Uživatel ${user} odeslal koncept k revizi ${EEEE} v ${time}.",
         MONTH: "Uživatel ${user} odeslal koncept k revizi dne ${MMM} ${d}.",
         TODAY: "Uživatel ${user} odeslal koncept k revizi dnes v ${time}.",
         YEAR: "Uživatel ${user} odeslal koncept k revizi ${d}. ${MMM} ${YYYY}.",
         YESTERDAY: "Uživatel ${user} odeslal koncept k revizi včera v ${time}.",
         TOMORROW: "Uživatel ${user} odeslal koncept k revizi ${d}. ${MMM} ${YYYY}."
      },
      pending: "Nevyřízeno",
      pending_rejected: "Revize již není potřebná, protože byl koncept odmítnut.",
      approve: "Schválit",
      approved: "Schváleno",
      approve_tooltip: "Schválit tento koncept",
      accept_success: "Tento koncept jste schválili.",
      accept_error: "Při schvalování tohoto konceptu došlo k chybě. Zkuste operaci zopakovat.",
      accept_info: "Tento koncept jste schválili.",
      reject: "Odmítnout",
      rejected: "Odmítnuto",
      reject_tooltip: "Odmítnout tento koncept",
      reject_success: "Tento koncept jste odmítli.",
      reject_error: "Při odmítání tohoto konceptu došlo k chybě. Zkuste operaci zopakovat.",
      reject_info: "Tento koncept jste odmítli."
   },
   authUser: {
      error: "Došlo k chybě při načítání aktuálního uživatele. ${again}.",
      error_again: "Zopakujte operaci.",
      error_404: "Ověřený uživatel nebyl nalezen.",
      error_403: "K načtení informací o uživateli nemáte oprávnění."
   },
   forum: {
      error: "Došlo k chybě. ${again}.",
      error_again: "Zopakujte operaci.",
      error_404: "Fórum již neexistuje nebo pro přístup k němu nemáte oprávnění.",
      error_403: "K zobrazení tohoto fóra nemáte oprávnění. Fórum není veřejné a není s vámi sdíleno.",

      readMore: "Zobrazit celé téma...",
      readMore_tooltip: "Otevřít téma fóra ${name}",
      readMore_a11y: "Aktivací tohoto odkazu otevřete téma fóra ${name} v novém okně.",
      QUESTION_ANSWERED: "Tato otázka byla zodpovězena.",
      QUESTION_NOT_ANSWERED: "Tato otázka nebyla dosud zodpovězena.",

      attachments: "Počet příloh: ${count}",
      attachments_one: "Počet příloh: ${count}"
   },
   blog: {
      error: "Došlo k chybě. ${again}.",
      error_again: "Zopakujte operaci.",
      error_404: "Blog již neexistuje nebo pro přístup k němu nemáte oprávnění.",
      error_403: "Nemáte oprávnění k zobrazení tohoto blogu. Blog není veřejný a není s vámi sdílen.",
      readMore: " Zobrazit více...",
      readMore_tooltip: "Otevřít položku blogu ${name}",
      readMore_a11y: "Aktivací tohoto odkazu otevřete položku blogu ${name} v novém okně.",
      graduated: "Se zvýšeným hodnocením",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Hlasovat</a>",
  					TOOLTIP: 	"Hlasovat pro tuto položku"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Hlasováno</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Hlasováno</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Vrátit zpět</a>",
  					TOOLTIP: 	"Odebrat váš hlas od této položky"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"Pro tuto položku hlasovalo 0 osob."
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"Pro tuto položku hlasovala 1 osoba."
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"Počet osob, jež hlasovaly pro tuto položku: ${recommendCount}."
  				}
  			},
  			LOADING: "Načítání...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Hlasováno"
  			}
  		}
   },
   idea: {
	  error_404: "Hlas nebude uložen, protože jste buď dosáhli omezení pro hlasování, nebo nápad již není k dispozici.",
      readMore_tooltip: "Otevřít nápad ${name}",
      readMore_a11y: "Aktivací tohoto odkazu otevřete nápad ${name} v novém okně."
   },
   size: {
      B: "${0} B",
      KB: "${0} kB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "Odpovědi",
      THIS_ARIA_LABEL: "Tato odpověď",
      THIS_TAB_TITLE: "Tato odpověď",
      TAB_TITLE: "Odpovědi (${0})",
      REPLY_TO_REPLY: "Jako odpověď na ${thisReply}",
      REPLY_TO_TOPIC: "Jako odpověď na ${thisTopic}",
      THIS_TOPIC: "toto téma",
      THIS_REPLY: "tato odpověď",
      NAVIGATE_TO_REPLY: "Přejít na nadřízenou odpověď",
      NAVIGATE_TO_TOPIC: "Přejít na nadřízené téma",
      ADD_COMMENT: "Odpovědět na toto téma",
      ADD_COMMENT_TOOLTIP: "Odpovědět na toto téma ve fóru",
      SHOWING_RECENT_REPLIES: "Zobrazuje se ${0} nejnovějších odpovědí.",
      PREV_COMMENTS: "Zobrazit více odpovědí",
      PLACEHOLDER_TXT: "Odpovědět na toto téma",
      EMPTY: "Nejsou k dispozici žádné odpovědi.",
      TRIM_LONG_COMMENT: "Chcete odpověď zkrátit?",
      WARN_LONG_COMMENT: "Odpověď je příliš dlouhá. ${shorten}",
      ERROR: "Došlo k chybě při načítání odpovědí. ${again}",
      ERROR_CREATE: "Vaši odpověď se nepodařilo uložit. Opakujte akci později.",
      ERROR_CREATE_NOT_FOUND: "Odpověď se nepodařilo uložit, protože téma bylo odstraněno nebo již pro vás není viditelné.",
      ERROR_CREATE_ACCESS_DENIED: "Odpověď se nepodařilo uložit, protože téma bylo odstraněno nebo již pro vás není viditelné.",
      ERROR_CREATE_TIMEOUT: "Odpověď se nepodařilo uložit, protože nebylo možné kontaktovat server. Klepnutím na tlačítko Uložit operaci zopakujte.",
      ERROR_CREATE_CANCEL: "Odpověď se nepodařilo uložit, protože byl požadavek zrušen. Klepnutím na tlačítko Uložit operaci zopakujte.",
      ERROR_CREATE_NOT_LOGGED_IN: "Chcete-li vytvořit tuto odpověď, musíte být přihlášeni. Chcete-li zobrazit výzvu k přihlášení, klepněte na tlačítko Uložit.",
      ERROR_NO_CONTENT: "Zadejte odpověď a klepněte na tlačítko Uložit. Pokud již odpověď přidávat nechcete, klepněte na volbu 'Storno'.",
      ERROR_UNAUTHORIZED: "Vaši odpověď se nepodařilo uložit, protože nemáte oprávnění k vytvoření odpovědi.",
      COMMENT_DELETED: {
         DAY: "Odpověď odstraněna uživatelem ${user} na ${EEEE} v ${time}",
         MONTH: "Odpověď byla odstraněna uživatelem ${user} dne ${d}. ${MMM}",
         TODAY: "Odpověď odstraněna uživatelem ${user} dnes v ${time}",
         YEAR: "Odpověď byla odstraněna uživatelem ${user} ${d}. ${MMM} ${YYYY}",
         YESTERDAY: "Odpověď odstraněna uživatelem ${user} včera ${time}",
         TOMORROW: "Odpověď byla odstraněna uživatelem ${user} ${d}. ${MMM} ${YYYY}"
      },
      REASON_FOR_DELETION: "Důvod k odstranění: ${reason}",
      REPLY_TITLE: "Re: ${0}",
      SHOW_FULL_REPLY: "Zobrazit celou odpověď",
      SHOW_FULL_REPLY_TOOLTIP: "Přejít na původní odpověď v tématu fóra",
      REPLY_ACTION: "Odpovědět",
      REPLY_ACTION_TOOLTIP: "Odpovědět na tento příspěvek",
      MODERATION_PENDING: "Tato odpověď čeká na přezkoumání.",
      MODERATION_QUARANTINED: "Příspěvek byl moderátorem umístěn do karantény.",
      MODERATION_REMOVED: {
         DAY: "Tuto odpověď odebral uživatel ${user} dne ${EEEE} v ${time}.",
         MONTH: "Tuto odpověď odebral uživatel ${user} ${d}. ${MMM}.",
         TODAY: "Tuto odpověď odebral uživatel ${user} dnes v čase ${time}.",
         YEAR: "Tuto odpověď odebral uživatel ${user} ${d}. ${MMM} ${YYYY}.",
         YESTERDAY: "Tuto odpověď odebral uživatel ${user} včera v čase ${time}.",
         TOMORROW: "Tuto odpověď odebral uživatel ${user} ${d}. ${MMM} ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Tuto odpověď odmítl uživatel ${user} dne ${EEEE} v ${time}.",
         MONTH: "Tuto odpověď odmítl uživatel ${user} dne ${MMM} ${d}.",
         TODAY: "Tuto odpověď odmítl uživatel ${user} dnes v čase ${time}.",
         YEAR: "Tuto odpověď odmítl uživatel ${user} ${d}. ${MMM} ${YYYY}.",
         YESTERDAY: "Tuto odpověď odmítl uživatel ${user} včera v čase ${time}.",
         TOMORROW: "Tuto odpověď odmítl uživatel ${user} ${d}. ${MMM} ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Vaše odpověď byla odeslána k revizi, bude k dispozici po schválení."
   },
   COMMENTS: {
      ARIA_LABEL: "Komentáře",
      PLACEHOLDER_TXT: "Přidat komentář",
      TAB_TITLE: "Komentáře: (${0})",
      ACTION_NOT_SUPPORTED: "Nepodporovaná akce",
      ADD_COMMENT: "Přidat komentář",
      ADD_COMMENT_TOOLTIP: "Přidat komentář k této položce",
      CANCEL: "Storno",
      COMMENT_COUNT_ONE: "${0} komentář",
      COMMENT_COUNT_MANY: "komentáře (${0})",
      COMMENT_LABEL: "Komentář:",
      DELETE: "Odstranit",
      DELETE_TOOLTIP: "Odstranit komentář",
      DELETEREASON: "Důvod odstranění tohoto komentáře:",
      DIALOG_TITLE: "Zkrátit komentář",
      TOOLTIP: "Zkrátit komentář",
      NAME: "Zkrátit komentář",
      EDIT: "Upravit",
      EDIT_TOOLTIP: "Upravit komentář",
      ERROR_CREATE: "Komentář nemohl být uložen. Opakujte akci později.",
      ERROR_CREATE_NOT_FOUND: "Komentář se nepodařilo uložit, protože příslušná položka byla odstraněna nebo již pro vás není viditelná.",
      ERROR_CREATE_ACCESS_DENIED: "Komentář se nepodařilo uložit, protože příslušná položka byla odstraněna nebo již pro vás není viditelná.",
      ERROR_CREATE_TIMEOUT: "Komentář se nepodařilo uložit, protože nebylo možné kontaktovat server. Klepnutím na tlačítko Zveřejnit operaci zopakujte.",
      ERROR_CREATE_CANCEL: "Komentář se nepodařilo uložit, protože požadavek byl zrušen. Klepnutím na tlačítko Zveřejnit operaci zopakujte.",
      ERROR_CREATE_NOT_LOGGED_IN: "Chcete-li vytvořit tento komentář, musíte být přihlášeni. Chcete-li zobrazit výzvu k přihlášení, klepněte na tlačítko Zveřejnit.",
      ERROR_DELETE: "Komentář nemohl být odstraněn. Opakujte akci později.",
      ERROR_DELETE_TIMEOUT: "Komentář se nepodařilo odstranit, protože nebylo možné kontaktovat server. Klepnutím na tlačítko Odstranit operaci zopakujte.",
      ERROR_DELETE_NOT_FOUND: "Komentář se nepodařilo odstranit, protože příslušný komentář nebo položka byly odstraněny nebo již pro vás nejsou viditelné.",
      ERROR_DELETE_ACCESS_DENIED: "Komentář se nepodařilo odstranit, protože příslušná položka byla odstraněna nebo již pro vás není viditelná.",
      ERROR_DELETE_CANCEL: "Komentář se nepodařilo odstranit, protože požadavek byl zrušen. Klepnutím na tlačítko Odstranit operaci zopakujte.",
      ERROR_DELETE_NOT_LOGGED_IN: "Chcete-li odstranit tento komentář, musíte být přihlášeni. Chcete-li zobrazit výzvu k přihlášení, klepněte na tlačítko Odstranit.",
      ERROR_EDIT: "Komentář nemohl být aktualizován. Opakujte akci později.",
      ERROR_EDIT_ACCESS_DENIED: "Komentář se nepodařilo aktualizovat, protože příslušná položka byla odstraněna nebo již pro vás není viditelná.",
      ERROR_EDIT_NOT_FOUND: "Komentář se nepodařilo aktualizovat, protože příslušná položka byla odstraněna nebo již pro vás není viditelná.",
      ERROR_EDIT_TIMEOUT: "Komentář se nepodařilo aktualizovat, protože nebylo možné kontaktovat server. Klepnutím na tlačítko Zveřejnit operaci zopakujte.",
      ERROR_EDIT_CANCEL: "Komentář se nepodařilo aktualizovat, protože požadavek byl zrušen. Klepnutím na tlačítko Zveřejnit operaci zopakujte.",
      ERROR_EDIT_NOT_LOGGED_IN: "Chcete-li upravit tento komentář, musíte být přihlášeni. Chcete-li zobrazit výzvu k přihlášení, klepněte na tlačítko Zveřejnit.",
      ERROR_NO_CONTENT: "Zadejte komentář a klepněte na tlačítko Zveřejnit. Pokud již komentář přidávat nechcete, klepněte na tlačítko Storno.",
      ERROR_NO_CONTENT_EDIT: "Zadejte komentář a klepněte na tlačítko Zveřejnit. Pokud již komentář upravovat nechcete, klepněte na tlačítko Storno.",
      ERROR_UNAUTHORIZED: "Váš komentář se nepodařilo uložit, protože nemáte oprávnění k přidání komentáře.",
      ERROR_GENERAL: "Došlo k chybě.",
      OK: "OK",
      YES: "Ano",
      TRIM_LONG_COMMENT: "Chcete komentář zkrátit?",
      WARN_LONG_COMMENT: "Komentář je příliš dlouhý. ${shorten}",
      LINK: "Odkaz",
      SAVE: "Uložit",
      POST: "Zveřejnit",
      SHOWMORE: "Zobrazit více...",
      VIEW_COMMENTS_FILE: "Zobrazit komentáře k tomuto souboru",
      SUBSCRIBE_TO_COMMENTS: "Přihlásit se k odběru těchto komentářů",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Sledovat změny těchto komentářů prostřednictvím čtečky informačních kanálů",
      PROFILE_TITLE: "Otevřít profil uživatele ${user}",
      PROFILE_A11Y: "Aktivací tohoto odkazu otevřete profil uživatele ${user} v novém okně.",
      MODERATION_PENDING: "Komentář čeká na přezkoumání.",
      MODERATION_REMOVED: {
         DAY: "Tento komentář odebral uživatel ${user} dne ${EEEE} v ${time}.",
         MONTH: "Tento komentář odebral uživatel ${user} dne ${MMM} ${d}.",
         TODAY: "Tento komentář odebral uživatel ${user} dnes v čase ${time}.",
         YEAR: "Tento komentář odebral uživatel ${user} ${d}. ${MMM} ${YYYY}.",
         YESTERDAY: "Tento komentář odebral uživatel ${user} včera v čase ${time}.",
         TOMORROW: "Tento komentář odebral uživatel ${user} ${d}. ${MMM} ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Tento komentář odmítl uživatel ${user} dne ${EEEE} v ${time}.",
         MONTH: "Tento komentář odmítl uživatel ${user} dne ${MMM} ${d}.",
         TODAY: "Tento komentář odmítl uživatel ${user} dnes v čase ${time}.",
         YEAR: "Tento komentář odmítl uživatel ${user} ${d}. ${MMM} ${YYYY}.",
         YESTERDAY: "Tento komentář odmítl uživatel ${user} včera v čase ${time}.",
         TOMORROW: "Tento komentář odmítl uživatel ${user} ${d}. ${MMM} ${YYYY}."
      },
      PREV_COMMENTS: "Zobrazit předchozí komentáře",
      EMPTY: "Nejsou k dispozici žádné komentáře.",
      ERROR_ALT: "Chyba",
      ERROR: "Došlo k chybě při načítání komentářů. ${again}",
      ERROR_ADDTL: "Došlo k chybě při načítání dalších komentářů. ${again}",
      ERROR_AGAIN: "Zkuste operaci zopakovat.",
      ERROR_AGAIN_TITLE: "Chcete-li získat další komentáře, zadejte požadavek znovu.",
      COMMENT_CREATED: {
         DAY: "${user}, ${EEEE} v ${time} (verze ${version})",
         MONTH: "${user}, ${d}. ${MMM} (verze ${version})",
         TODAY: "${user}, dnes v ${time} (verze ${version})",
         YEAR: "${user}, ${d}. ${MMM} ${YYYY} (verze ${version})",
         YESTERDAY: "${user}, včera v ${time} (verze ${version})",
         TOMORROW: "${user}, ${d}. ${MMM} ${YYYY} (verze ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} v ${time}",
         MONTH: "${user} ${d}. ${MMM}",
         TODAY: "${user} dnes v ${time}",
         YEAR: "${user} ${d}. ${MMM} ${YYYY}",
         YESTERDAY: "${user} včera v ${time}",
         TOMORROW: "${user} ${d}. ${MMM} ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} v ${time}",
         MONTH: "${d}. ${MMM}",
         TODAY: "Dnes v ${time}",
         YEAR: "${d}. ${MMM} ${YYYY}",
         YESTERDAY: "Včera v ${time}",
         TOMORROW: "${d}. ${MMM} ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Komentář odstraněn uživatelem ${user}: ${EEEE} v ${time}",
         MONTH: "Komentář byl odstraněn uživatelem ${user} dne ${d}. ${MMM}",
         TODAY: "Komentář odstraněn uživatelem ${user} dnes v ${time}",
         YEAR: "Komentář byl odstraněn uživatelem ${user} ${d}. ${MMM} ${YYYY}",
         YESTERDAY: "Komentář odstraněn uživatelem ${user} včera v ${time}",
         TOMORROW: "Komentář byl odstraněn uživatelem ${user} ${d}. ${MMM} ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "Upravil uživatele ${user} ${EEEE} v ${time} (verze ${version})",
         MONTH: "Uživatel ${user} provedl úpravu ${d}. ${MMM} (verze ${version})",
         TODAY: "Upravil uživatel ${user} dnes v ${time} (verze ${version})",
         YEAR: "Uživatel ${user} provedl úpravu ${d}. ${MMM} ${YYYY} (verze ${version})",
         YESTERDAY: "Upravil uživatel ${user} včera v ${time} (verze ${version})",
         TOMORROW: "Uživatel ${user} provedl úpravu ${d}. ${MMM} ${YYYY} (verze ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "Upravil uživatel ${user} ${EEEE} v ${time}",
         MONTH: "Uživatel ${user} provedl úpravu ${d}. ${MMM}",
         TODAY: "Upravil uživatel ${user} dnes v ${time}",
         YEAR: "Upravil uživatel ${user} ${d}. ${MMM} ${YYYY}",
         YESTERDAY: "Upravil uživatel ${user} včera v ${time}",
         TOMORROW: "Upravil uživatel ${user} ${d}. ${MMM} ${YYYY}"
      },

      DELETE_CONFIRM: "Opravdu chcete odstranit tento komentář?",
      FLAG_ITEM: {
         BUSY: "Probíhá ukládání...",
         CANCEL: "Storno",
         ACTION: "Nastavit příznak nevhodnosti",
         DESCRIPTION_LABEL: "Zadejte důvod pro označení této položky příznakem (volitelné).",
         EDITERROR: "Vzhledem k chybě nebyla upravena metadata souboru.",
         OK: "Uložit",
         ERROR_SAVING: "Při zpracování požadavku došlo k chybě. Opakujte akci později.",
         SUCCESS_SAVING: "Váš příznak byl odeslán. Moderátor jej v blízké době přezkoumá.",
         TITLE: "Nastavit pro tuto položku příznak nevhodnosti",
         COMMENT: {
            TITLE: "Nastavit pro tento komentář příznak nevhodnosti",
            A11Y: "Toto tlačítko otevře dialogové okno, ve kterém může uživatel označit tento komentář jako nevhodný."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Storno",
      DIALOG_TITLE: "Odstranit komentář",
      NAME: "Odstranit komentář",
      OK: "OK",
      TOOLTIP: "Odstranit komentář"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Storno",
      CONFIRM: "Zkrácením bude odebrán text přesahující mezní hodnotu délky komentáře. Chcete-li text zkrátit, klepněte na tlačítko OK. Chcete-li komentář upravit sami, klepněte na volbu Storno.",
      DIALOG_TITLE: "Zkrátit komentář",
      NAME: "Zkrátit komentář",
      OK: "OK",
      TOOLTIP: "Zkrátit komentář"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Potvrzení odeslání",
      CONFIRM: "Váš komentář byl odeslán k revizi, bude k dispozici po schválení.",
      OK: "OK"
   },

   DATE: {
      AM: "dop.",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "odp.",
      TODAY: "dnes",
      TODAY_U: "Dnes",
      YESTERDAY: "včera",
      YESTERDAY_U: "Včera",

      ADDED: { DAY: "Přidáno: ${EEee} v ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Přidáno dne ${date_long}",
         TODAY: "Přidáno dnes v ${time}",
         YEAR: "Přidáno dne ${date_long}",
         YESTERDAY: "Přidáno včera v ${time}"
      },

      LAST_UPDATED: { DAY: "Poslední aktualizace: ${EEee} v ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Poslední aktualizace ${date_long}",
         TODAY: "Poslední aktualizace dnes v ${time}",
         YEAR: "Poslední aktualizace ${date_long}",
         YESTERDAY: "Poslední aktualizace včera v ${time}"
      },

      MONTHS_ABBR: { 0: "LED",
         10: "LIS",
         11: "PRO",
         1: "ÚNO",
         2: "BŘE",
         3: "DUB",
         4: "KVĚ",
         5: "ČVN",
         6: "ČNC",
         7: "SRP",
         8: "ZÁŘ",
         9: "ŘÍJ"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Dnes",
         YEAR: "${date_short}",
         YESTERDAY: "Včera",
         TOMORROW: "Zítra"
      },

      RELATIVE_TIME: { DAY: "${EEee} v ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Dnes v ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Včera v ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} v ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Dnes v ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Včera v ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} v ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} v ${time}",
         TODAY: "${date_short} v ${time}",
         YEAR: "${date_short} v ${time}",
         YESTERDAY: "${date_short} v ${time}",
         TOMORROW: "${date_short} v ${time}"
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

      UPDATED: { DAY: "Aktualizováno: ${EEee} v ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Aktualizováno dne ${date_long}",
         TODAY: "Aktualizováno dnes v ${time}",
         YEAR: "Aktualizováno dne ${date_long}",
         YESTERDAY: "Aktualizováno včera v ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Nelze načíst informace o verzi.",
      ERROR_REQUEST_CANCELLED: "Požadavek byl zrušen.",
      ERROR_REQUEST_TIMEOUT: "Server se nepodařilo kontaktovat.",
      ERROR_REQUEST_UNKNOWN: "Došlo k neznámé chybě.",
      LOADING: "Načítání...",
      NO_VERSIONS: "K dispozici nejsou žádné verze.",
      INFO: "Verze ${0} vytvořená ${1} uživatelem ",
      VERSION_NUMBER: "Verze ${0}",
      DELETED: "Odstraněno",
      DELETE_ALL: "Odstranit všechny verze starší než verze",
      DELETE_VERSION_SINGLE: "Odstranit verzi ${0}",
      DELETEERROR: "Vzhledem k chybě nebyla verze odstraněn.",
      CREATE_VERSION: "Vytvoření nové verze",
      CREATE_VERSION_TOOLTIP: "Vytvořit verzi tohoto souboru",
      REVERT_VERSION: "Obnovit verzi ${0}",
      REVERT_DESCRIPTION: "Obnoveno z verze ${0}",
      PREVIOUS: "Předchozí",
      PREVIOUS_TOOLTIP: "Předchozí stránka",
      ELLIPSIS: "...",
      NEXT: "Další",
      NEXT_TOOLTIP: "Další stránka",
      COUNT: "${0}-${1} z ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Stránka",
      SHOW: "Zobrazit",
      ITEMS_PER_PAGE: " položek na stránce,",
      DATE: {
        AM: "dop.",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} v ${time_long}",
            MONTH: "${date}",
            TODAY: "Dnes v ${time}",
            YESTERDAY: "Včera v ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} v ${time}",
            YEAR: "${date_short} v ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} v ${time}",
            TODAY: "Dnes v ${time}",
            YESTERDAY: "Včera v ${time}"
        },
        UPDATED: { DAY: "Aktualizováno: ${EEee} v ${time}",
            YEAR: "Aktualizováno: ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Aktualizováno: ${date_short}",
            TODAY: "Aktualizováno dnes v ${time}",
            YESTERDAY: "Aktualizováno včera v ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Odstranit verzi ${0}",
         DOWNLOAD: "Stáhnout",
         DOWNLOAD_TOOLTIP: "Stáhnout tuto verzi (${0})",
         VIEW: "Zobrazit",
         VIEW_TOOLTIP: "Zobrazit verzi ${0}",
         REVERT: {
            A11Y: "Toto tlačítko otevře dialogové okno, ve kterém může uživatel potvrdit obnovení souboru z předchozí verze. Potvrzením této akce dojde k aktualizaci obsahu této stránky.",
            FULL: "Obnovit",
            WIDGET: "Obnovit tuto verzi"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Verzi nebylo možné odstranit, protože již byla odstraněna nebo pro vás již není viditelná.",
         ERROR_ACCESS_DENIED: "Verzi nebylo možné odstranit, protože nejste editorem.",
         ERROR_TIMEOUT: "Verze nebyla odstraněna, protože nelze kontaktovat server. Klepnutím na tlačítko 'Odstranit' operaci zopakujte.",
         ERROR_CANCEL: "Verze nebyla odstraněna, protože požadavek byl zrušen. Klepnutím na tlačítko 'Odstranit' operaci zopakujte.",
         ERROR_NOT_LOGGED_IN: "Chcete-li odstranit tuto verzi, musíte být přihlášeni. Chcete-li zobrazit výzvu k přihlášení, klepněte na tlačítko Odstranit.",
         GENERIC_ERROR: "Verzi se nepodařilo odstranit vzhledem k neznámé chybě. Klepnutím na tlačítko 'Odstranit' operaci zopakujte.",
         FULL: "Odstranit",
         A11Y: "Toto tlačítko otevře dialogové okno, ve kterém může uživatel potvrdit odstranění této verze. Potvrzením této akce dojde k aktualizaci obsahu této stránky."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Verzi nebylo možné obnovit, protože byla odstraněna nebo již pro vás není viditelná.",
         ERROR_ACCESS_DENIED: "Verzi nebylo možné obnovit, protože nejste editorem.",
         ERROR_NAME_EXISTS: "Verzi nebylo možné obnovit, protože existuje jiný soubor se stejným názvem.",
         ERROR_TIMEOUT: "Verze nebyla obnovena, protože nebylo možné kontaktovat server. Klepnutím na možnost Obnovit požadavek zopakujte.",
         ERROR_CANCEL: "Verze nebyla obnovena, protože požadavek byl zrušen. Klepnutím na možnost Obnovit požadavek zopakujte.",
         ERROR_QUOTA_VIOLATION: "Verzi se nepodařilo obnovit vzhledem k omezením místa.",
         ERROR_MAX_CONTENT_SIZE: "Verzi se nepodařilo obnovit, protože je větší než maximální povolená velikost souboru ${0}.",
         GENERIC_ERROR: "Verzi se nepodařilo obnovit vzhledem k neznámé chybě. Klepnutím na možnost Obnovit požadavek zopakujte."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Zobrazit uživatele, kteří tuto položku stáhli...",
      PREVIOUS: "Předchozí",
      PREVIOUS_TOOLTIP: "Předchozí stránka",
      ELLIPSIS: "...",
      NEXT: "Další",
      NEXT_TOOLTIP: "Další stránka",
      COUNT: "${0}-${1} z ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Stránka",
      SHOW: "Zobrazit",
      ITEMS_PER_PAGE: " položek na stránce,",
      VERSION: {
         DAY: "Verze ${version}: ${date}",
         MONTH: "Verze ${version}: ${date}",
         TODAY: "Verze ${version} v ${time}",
         YEAR: "Verze ${version}: ${date}",
         YESTERDAY: "Verze ${version}: včera"
      },

      FILE: {
         V_LATEST: "Stáhli jste nejnovější verzi tohoto souboru.",
         V_OLDER: "Naposledy jste stáhli verzi ${0} tohoto souboru.",
         LOADING: "Načítání...",
         EMPTY: "Pouze anonymní uživatelé",
         ERROR: "Nelze načíst informace o stahování."
      }
   },

   EE_DIALOG: {
      ERROR: "Chyba",
      ERROR_ALT_TEXT: "Chyba:",
      ERROR_MSG_GENERIC: "Došlo k potížím. Zkuste akci opakovat.",
      ERROR_MSG_NOT_AVAILABLE: "Položka byla odstraněna nebo již není k dispozici.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Obsah této položky není k dispozici.",
      ERROR_MSG_NO_ACCESS: "K této položce již nemáte přístup.",
      LOADING: "Načítání...",
      TITLE_SU: "Uživatel ${author} zaslal zprávu.",
      TITLE_NI: "Uživatel ${author} vás pozval do své sítě.",
      AUTHOR_TITLE: "Zobrazit profil pro uživatele ${author}",
      OPEN_LINK: "Otevřít odkaz ${title}",
      CONFIRM_CLOSE_TITLE: "Potvrdit",
      CONFIRM_CLOSE_MESSAGE: "Opravdu chcete provedené změny zrušit? Můžete pokračovat klepnutím na tlačítko OK, nebo klepnout na volbu Storno a vrátit se.",
      OK: "OK",
      CANCEL: "Storno"
   },
   MESSAGE: {
      SUCCESS: "Potvrzení",
      ERROR: "Chyba",
      ERROR_ALT_TEXT: "Chyba:",
      INFO: "Informace",
      WARNING: "Varování",
      DISMISS: "Skrýt tuto zprávu",
      MORE_DETAILS: "Další podrobnosti",
      HIDE_DETAILS: "Skrýt podrobnosti"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Vytvořeno: ${EEEE} v ${time}.",
           MONTH: "Vytvořeno: ${MMM} ${d}",
           TODAY: "Vytvořeno: Dnes v ${time}",
           YEAR: "Vytvořeno: ${d}. ${MMM} ${YYYY}",
           YESTERDAY: "Vytvořeno: Včera v ${time}",
           TOMORROW: "Vytvořeno: ${d}. ${MMM} ${YYYY}"
       },
      error: "Došlo k chybě. ${again}.",
      error_again: "Zopakujte operaci.",
      error_404: "Aktualizace stavu již neexistuje.",
      notifications: {
         STATUS_UPDATE: "Uživatel ${user} odeslal zprávu",
         USER_BOARD_POST: "Uživatel ${user} přidal příspěvek na vaši nástěnku",
         POST_COMMENT: "Uživatel ${user} napsal:"
      }
   },
   login: {
      error: "Kombinace jména uživatele a hesla neodpovídá žádnému existujícímu účtu. Zkuste akci opakovat.",
      logIn: "Přihlásit se",
      password: "Heslo:",
      user: "Jméno uživatele:",
      welcome: "Přihlásit se k produktu HCL Connections"
   },
   repost: {
      name: "Zveřejnit znovu",
      title: "Znovu zveřejnit tuto aktualizaci pro uživatele, kteří mě sledují, nebo mé komunity",
      msg_success: "Aktualizace byla úspěšně znovu odeslána osobám, které vás sledují.",
      msg_generic: "Došlo k potížím. Zkuste akci opakovat."
   },
   FILE_SHARE_INFO: {
      ADD: "Přidat",
      ADD_TXT: "Přidat osoby nebo komunity jako čtenáře",
      SHOW_MORE: "Zobrazit více...",
      READER_IF_PUBLIC: "Všichni (veřejné)",
      READER_IF_PUBLIC_TOOLTIP: "Tento soubor je veřejný a viditelný pro všechny.",
      EMPTY_READERS: "Žádná hodnota",
      READERS_LABEL: "Čtenáři: ",
      EDITORS_LABEL: "Editoři: ",
      OWNER_LABEL: "Vlastník: ",
      ERROR: "Nelze načíst informace o sdílení.",
      ERROR_NOT_FOUND: "Požadovaný soubor byl odstraněn nebo přesunut. Pokud vám tento odkaz někdo zaslal, zkontrolujte, zda je správný.",
      ERROR_ACCESS_DENIED: "Nemáte oprávnění k zobrazení tohoto souboru. Soubor není veřejný a není s vámi sdílen.",
      SHARE: "Sdílet",
      CANCEL: "Storno",
      SHARE_WITH: "Sdílet s uživatelem",
      PERSON: "Osoba",
      COMMUNITY: "Komunita",
      PLACEHOLDER: "Jméno nebo e-mail osoby...",
      MESSAGE: "Zpráva:",
      MESSAGE_TXT: "Přidat volitelnou zprávu",
      REMOVE_ITEM_ALT: "Odebrat ${0}",
      NO_MEMBERS: "Žádná hodnota",
      A11Y_READER_ADDED: "Osoba nebo komunita ${0} vybraná jako čtenář",
      A11Y_READER_REMOVED: "Osoba ${0} odebrána jako čtenář",
      SELF_REFERENCE_ERROR: "Nemůžete sdílet sami se sebou.",
      OWNER_REFERENCE_ERROR: "Nelze nastavit sdílení s vlastníkem souboru.",
      SHARE_COMMUNITY_WARN: "Sdílení s veřejnou komunitou '${0}' nastaví tento soubor jako veřejný.",
      SELECT_USER_ERROR: "Je nutné vybrat alespoň jednu osobu nebo komunitu, s níž bude nastaveno sdílení.",
      WARN_LONG_MESSAGE: "Zpráva je příliš dlouhá.",
      TRIM_LONG_MESSAGE: "Chcete zprávu zkrátit?",
      ERROR_SHARING: "Soubor nelze sdílet. Zopakujte akci později.",
      INFO_SUCCESS: "Soubor byl úspěšně sdílen.",
      MAX_SHARES_ERROR: "Byl překročen maximální povolený počet sdílení.",
      NOT_LOGGED_IN_ERROR: "Soubor nebyl sdílen, protože jste nebyli přihlášeni. Chcete-li soubor sdílet, klepněte na volbu Sdílet.",
      TIMEOUT_ERROR: "Soubor nebyl sdílen, protože nebylo možné kontaktovat server. Chcete-li operaci zopakovat, klepněte na volbu Sdílet.",
      CANCEL_ERROR: "Soubor nebyl sdílen, protože požadavek byl zrušen. Chcete-li operaci zopakovat, klepněte na volbu Sdílet.",
      NOT_FOUND_ERROR: "Soubor byl odstraněn nebo již pro vás není viditelný a nelze jej sdílet.",
      ACCESS_DENIED_ERROR: "Již nemáte oprávnění ke sdílení tohoto souboru.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Omezený soubor nelze zveřejnit.",
      TOOLTIP: "Poskytnout ostatním přístup k tomuto souboru"
   },
   HISTORY: {
      TAB_TITLE: "Nejnovější aktualizace",
      NO_HISTORY: "Žádné nové aktualizace neexistují.",
      EMPTY: "Nepodařilo se načíst nejnovější aktualizace této položky. Položka byla odstraněna nebo k ní již nemáte přístup.",
      MORE: "Zobrazit předchozí aktualizace",
      ERROR_ALT: "Chyba",
      ERROR: "Došlo k chybě při načítání aktualizací. ${again}",
      ERROR_ADDTL: "Došlo k chybě při načítání dalších aktualizací. ${again}",
      ERROR_AGAIN: "Zkuste operaci zopakovat.",
      ERROR_AGAIN_TITLE: "Chcete-li získat další aktualizace, zadejte požadavek znovu.",
      PROFILE_TITLE: "Otevřít profil uživatele ${user}",
      SORT_BY: "Řadit podle\\:",
      SORTS: {
         DATE: "Datum",
         DATE_TOOLTIP: "Řadit sestupně podle doby aktualizace",
         DATE_TOOLTIP_REVERSE: "Řadit vzestupně podle doby aktualizace"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} v ${time}",
             MONTH: "${d}. ${MMM}",
             TODAY: "Dnes v ${time}",
             YEAR: "${d}. ${MMM} ${YYYY}",
             YESTERDAY: "Včera v ${time}",
             TOMORROW: "${d}. ${MMM} ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Tento komentář",
	   REPLY_ACTION: "Odpovědět",
       REPLY_ACTION_TOOLTIP: "Odpovědět na tento komentář"
   },
   OAUTH: {
      welcomeHeader: "Vítejte v produktu Connections",
      continueBtnLabel: "Pokračovat",
      continueBtnA11y: "Aktivujete-li tento odkaz, otevře se nové okno, jehož prostřednictvím můžete autorizovat přístup k produktu Connections.",
      clickHere: "tento odkaz",
      infoMsg: "Produkt Connections potřebuje autorizaci pro přístup k vašim datům.",
      authorizeGadget: "Chcete-li autorizovat tuto aplikaci pro přístup k vašim informacím v produktu Connections, klepněte na ${clickHere}.",
      confirmAuthorization: "Klepnutím na ${clickHere} potvrdíte, že jste tuto aplikaci autorizovali pro přístup k vašim informacím v produktu Connections."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Aktivujete-li tento odkaz, otevře se nové okno, jehož prostřednictvím můžete autorizovat přístup k úložišti modulu Knihovna produktu Connections.",
      infoMsg: "Úložiště modulu Knihovna produktu Connections potřebuje vaši autorizaci pro přístup k vašim datům.",
      authorizeGadget: "Chcete-li autorizovat tuto aplikaci pro přístup k vašim informacím v úložišti modulu Knihovna produktu Connections, klepněte na ${clickHere}.",
      confirmAuthorization: "Klepnutím na ${clickHere} potvrdíte, že jste tuto aplikaci autorizovali pro přístup k vašim informacím v úložišti modulu Knihovna produktu Connections."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Storno",
      CONFIRM: "Opravdu chcete provedené změny zrušit?  Můžete pokračovat klepnutím na tlačítko OK, nebo klepnout na volbu Storno a vrátit se.",
      DIALOG_TITLE: "Potvrdit",
      NAME: "Potvrdit",
      OK: "OK",
      TOOLTIP: "Potvrdit"
   }
})
