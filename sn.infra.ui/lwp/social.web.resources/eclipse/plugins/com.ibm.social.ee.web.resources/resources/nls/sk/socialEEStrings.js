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
         label: "Viac",
         tooltip: "Viac akcií"
       },
       tags_more: "a ${0} ďalších",
       ERROR_ALT: "Chyba",
       PERSON_TITLE: "Otvoriť profil užívateľa ${user}.",
       inactiveUser: "${user} (neaktívny)",
       inactiveIndicator: "(neaktívny)",
       like_error: "Nebolo možné uložiť vaše označenie „páči sa mi“. Skúste to znova neskôr.",
       vote_error: "Nebolo možné uložiť váš hlas. Skúste to znova neskôr."
   },
   generic: {
      untitled: "(Bez nadpisu)",
      tags: "Značky:",
      tags_more: "a ${0} ďalších",
      likes: "Páči sa mi",
      comments: "Komentáre",
      titleTooltip: "Prejsť do ${app}",
      error: "Nemožno získať údaje.",
      timestamp: {
         created: {
            DAY: "Vytvorené ${EEEE} o ${time}",
            MONTH: "Vytvorené ${MMM} ${d}",
            TODAY: "Vytvorené dnes o ${time}",
            YEAR: "Vytvorené ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Vytvorené včera o ${time}",
            TOMORROW: "Vytvorené ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Aktualizované ${EEEE} o ${time}",
            MONTH: "Aktualizované ${MMM} ${d}",
            TODAY: "Aktualizované dnes o ${time}",
            YEAR: "Aktualizované ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Aktualizované včera o ${time}",
            TOMORROW: "Aktualizované ${MMM} ${d}, ${YYYY}"
         }
      },
      visibility: {
         pub: "Verejné",
         priv: "Súkromné"
      },
      action: {
         created: "Vytvorený",
         updated: "Aktualizované"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Aktivujte si príjem aktualizácií o ľuďoch, ktorých sledujete, na domovskej stránke a v e-mailovom súhrne.",
      profile_title: "Otvoriť profil užívateľa ${user}.",
      profile_a11y: "Aktivácia tohto odkazu otvorí profil užívateľa ${user} v novom okne.",
      error: "Nastala chyba.  ${again}.",
      error_again: "Skúste to znova",
      error_404: "Sieťová požiadavka už neexistuje.",
      warning: "Upozornenie",
      messages: {
         success: {
            accept: {
            	nofollow: "Teraz ste sieťové kontakty.",
            	follow: "Teraz ste sieťové kontakty a sledujete užívateľa ${user}."
            },
            ignore: {
            	nofollow: "Ignorovali ste pozvanie.",
            	follow: "Ignorovali ste pozvanie, ale teraz sledujete užívateľa ${user}."
            }
         },
         error: {
            accept: "Nastala chyba pri prijímaní žiadosti.",
            ignore: "Nastala chyba pri ignorovaní žiadosti."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} o ${time}",
              MONTH: "${MMM} ${d}",
              TODAY: "Dnes o ${time}",
              YEAR: "${MMM} ${d}, ${YYYY}",
              YESTERDAY: "Včera o ${time}",
              TOMORROW: "${MMM} ${d}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Aktivácia tohto odkazu otvorí ${name} v novom okne.",
      tooltip: "Otvoriť ${name} v aplikácii Súbory",
      profile_title: "Otvoriť profil užívateľa ${user}.",
      profile_a11y: "Aktivácia tohto odkazu otvorí profil užívateľa ${user} v novom okne.",
      download_tooltip: "Prevziať tento súbor (${0})",
      following: {
         add: "Sledovať súbor",
         remove: "Zastaviť sledovanie",
         title: "Prepnúť, či budete dostávať aktualizácie o tomto súbore"
      },
      share: {
         label: "Zdieľať",
         title: "Udeliť ostatným prístup k tomuto súboru"
      },
      timestamp: {
         created: {
            DAY: "Vytvorené ${EEEE} o ${time}",
            MONTH: "Vytvorené ${MMM} ${d}",
            TODAY: "Vytvorené dnes o ${time}",
            YEAR: "Vytvorené ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Vytvorené včera o ${time}",
            TOMORROW: "Vytvorené ${MMM} ${d}, ${YYYY}"
         },
         createdOther: {
            DAY: "${user} vytvoril ${EEEE} o ${time}",
            MONTH: "${user} vytvoril ${MMM} ${d}",
            TODAY: "${user} vytvoril dnes o ${time}",
            YEAR: "${user} vytvoril ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} vytvoril včera o ${time}",
            TOMORROW: "${user} vytvoril ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Aktualizované ${EEEE} o ${time}",
            MONTH: "Aktualizované ${MMM} ${d}",
            TODAY: "Aktualizované dnes o ${time}",
            YEAR: "Aktualizované ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Aktualizované včera o ${time}",
            TOMORROW: "Aktualizované ${MMM} ${d}, ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} aktualizované ${EEEE} o ${time}",
            MONTH: "${user} aktualizované ${MMM} ${d}",
            TODAY: "${user} aktualizované dnes o ${time}",
            YEAR: "${user} aktualizované ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} aktualizované včera o ${time}",
            TOMORROW: "${user} aktualizované ${MMM} ${d}, ${YYYY}"
         },
         createdCompact: {
            DAY: "Vytvorené: ${EEEE} o ${time}",
            MONTH: "Vytvorené: ${MMM} ${d}",
            TODAY: "Vytvorené: dnes o ${time}",
            YEAR: "Vytvorené. ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Vytvorené: včera o ${time}",
            TOMORROW: "Vytvorené. ${MMM} ${d}, ${YYYY}"
         },
         updatedCompact: {
            DAY: "Aktualizované: ${EEEE} o ${time}",
            MONTH: "Aktualizované: ${MMM} ${d}",
            TODAY: "Aktualizované: Dnes o ${time}",
            YEAR: "Aktualizované: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Aktualizované: Včera o ${time}",
            TOMORROW: "Aktualizované: ${MMM} ${d}, ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} užívateľom ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} užívateľom ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Prevziať tento súbor (${size})",
      	 DOWNLOAD_ALT: "Prevziať"
      },

      PREVIEW: {
         LINK: "Náhľad",
         TITLE: "Zobraziť náhľad tohto súboru v novom okne."
      },
      TAGS: "Značky:",
      error: "Nastala chyba.  ${again}.",
      error_again: "Skúste to znova",
      error_404: "Súbor už neexistuje alebo nemáte dostatočné oprávnenia na prístup k nemu.",
      error_403: "Nemáte oprávnenie zobraziť tento súbor. Súbor nie je verejný a nie je s vami zdieľaný.",
      notifications: {
         USER_SHARED: "${user} napísal:",
         CHANGE_SUMMARY: "${user} poskytol súhrn zmien",
         NO_CHANGE_SUMMARY: "${user} neposkytol súhrn zmien",
         COMMENTED: "${user} komentoval"
      }
   },
   ecm_file: {
      checkedout_you: "Odhlásené vami",
      checkedout_other: "Odhlásené užívateľom ${user}",
      tooltip: "Otvoriť súbor ${name} v knižnici",
      draft_404_info: "Koncept bol vymazaný alebo už s vami nie je zdieľaný. Zverejnená verzia je teraz najnovšia verzia tohto súboru.",
      error_404: "Súbor bol vymazaný alebo už s vami nie je zdieľaný.",
      error_403: "Súbor bol vymazaný alebo už s vami nie je zdieľaný.",
      error_preview: "Súbor už nie je k dispozícii na náhľad.",
      draft_review_canceled: "Posúdenie bolo zrušené a koncept už s vami nie je zdieľaný. Vaše posúdenie už nie je potrebné.",
      switch_ee: "Zobraziť koncept",
      switch_ee_tooltip: "Zobraziť najnovší koncept pre tento súbor"
   },
   ecm_draft: {
      tooltip: "Otvoriť koncept ${name} v knižnici",
      community_owners: "Vlastníci komunity",
      draft: "Koncept",
      draft_tooltip: "Zobrazenie konceptu",
      draft_general_info: "Predošlý koncept už neexistuje a novší koncept je teraz najnovšou verziou.",
      draft_review_404_general_info: "Jeden z posudzovateľov už hlasoval. Už sa nevyžaduje, aby ste posúdili tento koncept.",
      draft_review_404_request_info: "Predošlý koncept už neexistuje a najnovší koncept bol odoslaný na posúdenie. Vznikla požiadavka, aby ste vykonali posúdenie.",
      draft_review_404_require_info: "Predošlý koncept už neexistuje a najnovší koncept bol odoslaný na posúdenie. Musíte vykonať posúdenie.",
      draft_review_request_info: "Vznikla požiadavka, aby ste vykonali posúdenie.",
      draft_review_require_info: "Musíte vykonať posúdenie.",
      error_404: "Koncept bol vymazaný alebo už s vami nie je zdieľaný.",
      error_403: "Tento koncept nemôžete zobraziť, pretože nie je zdieľaný s vami.",
      error_preview: "Koncept už nie je k dispozícii na náhľad.",
      switch_ee: "Zobraziť zverejnenú verziu",
      switch_ee_tooltip: "Zobraziť zverejnenú verziu tohto súboru",
      review: "Posúdiť",
      reviewers: "Posudzovatelia",
      reviwers_addtl: "Ďalší posudzovatelia",
      in_review: "Koncept sa posudzuje",
      in_review_tooltip: "Zobrazenie konceptu pri posudzovaní",
      review_required_any: "Vlastníci komunity vyžadujú, aby tento koncept schválil jeden posudzovateľ.",
      review_required_all: "Vlastníci komunity vyžadujú, aby tento koncept schválili všetci posudzovatelia.",
      review_required_generic: "Vlastníci komunity vyžadujú, aby tento koncept schválili všetci posudzovatelia.",
      review_additional_required: "Tento koncept musia schváliť všetci posudzovatelia, ktorých pridal odosielateľ konceptu.",
      reivew_submitted_date: {
         DAY: "Užívateľ ${user} odoslal koncept na posúdenie ${EEEE} o ${time}.",
         MONTH: "Užívateľ ${user} odoslal koncept na posúdenie dňa ${MMM} ${d}.",
         TODAY: "Užívateľ ${user} odoslal koncept na posúdenie dnes o ${time}.",
         YEAR: "Užívateľ ${user} odoslal koncept na posúdenie ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Užívateľ ${user} odoslal koncept na posúdenie včera o ${time}.",
         TOMORROW: "Užívateľ ${user} odoslal koncept na posúdenie ${MMM} ${d}, ${YYYY}."
      },
      pending: "Prebieha",
      pending_rejected: "Posúdenie už nie je potrebné, pretože koncept bol odmietnutý",
      approve: "Schváliť",
      approved: "Schválené",
      approve_tooltip: "Schváliť tento koncept",
      accept_success: "Schválili ste tento koncept.",
      accept_error: "Nastala chyba pri schvaľovaní tohto konceptu. Skúste to znova.",
      accept_info: "Schválili ste tento koncept.",
      reject: "Odmietnuť",
      rejected: "Odmietnuté",
      reject_tooltip: "Odmietnuť tento koncept",
      reject_success: "Odmietli ste tento koncept.",
      reject_error: "Nastala chyba pri odmietaní tohto konceptu. Skúste to znova.",
      reject_info: "Odmietli ste tento koncept."
   },
   authUser: {
      error: "Nastala chyba pri získavaní aktuálneho užívateľa.  ${again}.",
      error_again: "Skúste to znova",
      error_404: "Nenašiel sa autentifikovaný užívateľ.",
      error_403: "Nemáte oprávnenie získať informácie o užívateľovi."
   },
   forum: {
      error: "Nastala chyba.  ${again}.",
      error_again: "Skúste to znova",
      error_404: "Fórum už neexistuje alebo nemáte dostatočné oprávnenia na prístup k nemu.",
      error_403: "Nemáte oprávnenie zobraziť toto fórum. Fórum nie je verejné a nie je s vami zdieľané.",

      readMore: "Zobraziť celú tému...",
      readMore_tooltip: "Otvoriť tému fóra ${name}.",
      readMore_a11y: "Aktivácia tohto odkazu otvorí tému fóra ${name} v novom okne.",
      QUESTION_ANSWERED: "Táto otázka bola zodpovedaná.",
      QUESTION_NOT_ANSWERED: "Táto otázka ešte nebola zodpovedaná.",

      attachments: "${count} príloh",
      attachments_one: "${count} príloha"
   },
   blog: {
      error: "Nastala chyba.  ${again}.",
      error_again: "Skúste to znova",
      error_404: "Blog už neexistuje alebo nemáte dostatočné oprávnenia na prístup k nemu.",
      error_403: "Nemáte oprávnenie zobraziť tento blog. Blog nie je verejný a nie je s vami zdieľaný.",
      readMore: " Viac informácií...",
      readMore_tooltip: "Otvoriť položku blogu ${name}.",
      readMore_a11y: "Aktivácia tohto odkazu otvorí položku blogu ${name} v novom okne.",
      graduated: "Graduovaný",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Hlasovať</a>",
  					TOOLTIP: 	"Hlasovať za toto"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Hlasoval</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Hlasované</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Späť</a>",
  					TOOLTIP: 	"Odstrániť váš hlas pre toto"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"Za toto hlasovalo nula ľudí"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"Za toto hlasovala 1 osoba"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"Za toto hlasovalo ${recommendCount} ľudí"
  				}
  			},
  			LOADING: "Načítava sa...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Hlasoval"
  			}
  		}
   },
   idea: {
	  error_404: "Nemohli sme uložiť váš hlas, pretože ste dosiahli svoj limit počtu hlasov alebo nápad už pre vás nie je k dispozícii.",
      readMore_tooltip: "Otvoriť nápad ${name}.",
      readMore_a11y: "Aktivácia tohto odkazu otvorí nápad ${name} v novom okne."
   },
   size: {
      B: "${0} B",
      KB: "${0} kB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "Odpovede",
      THIS_ARIA_LABEL: "Táto odpoveď",
      THIS_TAB_TITLE: "Táto odpoveď",
      TAB_TITLE: "Odpovede (${0})",
      REPLY_TO_REPLY: "V odpovedi na ${thisReply}",
      REPLY_TO_TOPIC: "V odpovedi na ${thisTopic}",
      THIS_TOPIC: "táto téma",
      THIS_REPLY: "táto odpoveď",
      NAVIGATE_TO_REPLY: "Prejsť k rodičovskej odpovedi",
      NAVIGATE_TO_TOPIC: "Prejsť k rodičovskej téme",
      ADD_COMMENT: "Odpovedať na túto tému",
      ADD_COMMENT_TOOLTIP: "Odpovedať na túto tému fóra",
      SHOWING_RECENT_REPLIES: "Zobrazuje sa ${0} najnovších odpovedí",
      PREV_COMMENTS: "Zobraziť viac odpovedí",
      PLACEHOLDER_TXT: "Odpovedať na túto tému",
      EMPTY: "Neexistujú žiadne odpovede.",
      TRIM_LONG_COMMENT: "Má sa skrátiť odpoveď?",
      WARN_LONG_COMMENT: "Odpoveď je pridlhá.  ${shorten}",
      ERROR: "Nastala chyba počas získavania odpovedí. ${again}",
      ERROR_CREATE: "Vašu odpoveď nebolo možné uložiť.  Skúste to znova neskôr.",
      ERROR_CREATE_NOT_FOUND: "Vašu odpoveď nebolo možné uložiť, pretože téma bola vymazaná alebo ju už nevidíte.",
      ERROR_CREATE_ACCESS_DENIED: "Vašu odpoveď nebolo možné uložiť, pretože téma bola vymazaná alebo ju už nevidíte.",
      ERROR_CREATE_TIMEOUT: "Vašu odpoveď nebolo možné uložiť, pretože nebolo možné kontaktovať server.  Skúste to znova kliknutím na položku Uložiť.",
      ERROR_CREATE_CANCEL: "Vašu odpoveď nebolo možné uložiť, pretože požiadavka bola zrušená.  Skúste to znova kliknutím na položku Uložiť.",
      ERROR_CREATE_NOT_LOGGED_IN: "Ak chcete vytvoriť túto odpoveď, musíte byť prihlásený.  Kliknite na položku Uložiť, aby sa zobrazila výzva na prihlásenie.",
      ERROR_NO_CONTENT: "Zadajte vašu odpoveď a kliknite na tlačidlo Uložiť.  Ak nechcete zanechať odpoveď, kliknite na položku Zrušiť.",
      ERROR_UNAUTHORIZED: "Vašu odpoveď nebolo možné uložiť, pretože nie ste autorizovaný nechať odpoveď.",
      COMMENT_DELETED: {
         DAY: "Odpoveď vymazal užívateľ ${user} ${EEEE} o ${time}",
         MONTH: "Odpoveď vymazal užívateľ ${user} dňa ${MMM} ${d}",
         TODAY: "Odpoveď vymazal užívateľ ${user} dnes o ${time}",
         YEAR: "Odpoveď vymazal užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Odpoveď vymazal užívateľ ${user} včera o ${time}",
         TOMORROW: "Odpoveď vymazal užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}"
      },
      REASON_FOR_DELETION: "Dôvod vymazania: ${reason}",
      REPLY_TITLE: "Re: ${0}",
      SHOW_FULL_REPLY: "Zobraziť celú odpoveď",
      SHOW_FULL_REPLY_TOOLTIP: "Prejsť do pôvodnej odpovede v téme fóra",
      REPLY_ACTION: "Odpovedať",
      REPLY_ACTION_TOOLTIP: "Odpovedať na tento príspevok",
      MODERATION_PENDING: "Táto odpoveď čaká na posúdenie.",
      MODERATION_QUARANTINED: "Moderátor presunul príspevok do karantény.",
      MODERATION_REMOVED: {
         DAY: "Túto odpoveď odstránil užívateľ ${user} ${EEEE} o ${time}.",
         MONTH: "Túto odpoveď odstránil užívateľ ${user} dňa ${MMM} ${d}.",
         TODAY: "Túto odpoveď odstránil užívateľ ${user} dnes o ${time}.",
         YEAR: "Túto odpoveď odstránil užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Túto odpoveď odstránil užívateľ ${user} včera o ${time}.",
         TOMORROW: "Túto odpoveď odstránil užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Túto odpoveď odmietol užívateľ ${user} ${EEEE} o ${time}.",
         MONTH: "Túto odpoveď odmietol užívateľ ${user} ${MMM} ${d}.",
         TODAY: "Túto odpoveď odmietol užívateľ ${user} dnes o ${time}.",
         YEAR: "Túto odpoveď odmietol užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Túto odpoveď odmietol užívateľ ${user} včera o ${time}.",
         TOMORROW: "Túto odpoveď odmietol užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Vaša odpoveď bola odoslaná na posúdenie a bude k dispozícii po schválení."
   },
   COMMENTS: {
      ARIA_LABEL: "Komentáre",
      PLACEHOLDER_TXT: "Pridať komentár",
      TAB_TITLE: "Komentáre (${0})",
      ACTION_NOT_SUPPORTED: "Nepodporovaná akcia",
      ADD_COMMENT: "Pridať komentár",
      ADD_COMMENT_TOOLTIP: "Pridať komentár k tejto položke",
      CANCEL: "Zrušiť",
      COMMENT_COUNT_ONE: "${0} komentár",
      COMMENT_COUNT_MANY: "${0} komentárov",
      COMMENT_LABEL: "Komentár:",
      DELETE: "Vymazať",
      DELETE_TOOLTIP: "Vymazať komentár",
      DELETEREASON: "Dôvod vymazania tohto komentára:",
      DIALOG_TITLE: "Skrátiť komentár",
      TOOLTIP: "Skrátiť komentár",
      NAME: "Skrátiť komentár",
      EDIT: "Upraviť",
      EDIT_TOOLTIP: "Upraviť komentár",
      ERROR_CREATE: "Nebolo možné uložiť váš komentár.  Skúste to znova neskôr.",
      ERROR_CREATE_NOT_FOUND: "Váš komentár nebolo možné uložiť, pretože položka bola vymazaná alebo ju už nevidíte.",
      ERROR_CREATE_ACCESS_DENIED: "Váš komentár nebolo možné uložiť, pretože položka bola vymazaná alebo ju už nevidíte.",
      ERROR_CREATE_TIMEOUT: "Nebolo možné uložiť váš komentár, pretože nebolo možné kontaktovať server.  Skúste to znova kliknutím na položku Zverejniť",
      ERROR_CREATE_CANCEL: "Váš komentár nebolo možné uložiť, pretože požiadavka bola zrušená.  Skúste to znova kliknutím na položku Zverejniť",
      ERROR_CREATE_NOT_LOGGED_IN: "Ak chcete vytvoriť tento komentár, musíte byť prihlásený.  Kliknite na položku Zverejniť, aby sa zobrazila výzva na prihlásenie.",
      ERROR_DELETE: "Nebolo možné vymazať váš komentár.  Skúste to znova neskôr.",
      ERROR_DELETE_TIMEOUT: "Nebolo možné vymazať váš komentár, pretože nebolo možné kontaktovať server.  Skúste to znova kliknutím na položku Vymazať.",
      ERROR_DELETE_NOT_FOUND: "Váš komentár nebolo možné vymazať, pretože komentár alebo položka bola vymazaná alebo ju už nevidíte.",
      ERROR_DELETE_ACCESS_DENIED: "Váš komentár nebolo možné vymazať, pretože položka bola vymazaná alebo ju už nevidíte.",
      ERROR_DELETE_CANCEL: "Váš komentár nebolo možné vymazať, pretože požiadavka bola zrušená.  Skúste to znova kliknutím na položku Vymazať.",
      ERROR_DELETE_NOT_LOGGED_IN: "Ak chcete vymazať tento komentár, musíte byť prihlásený.  Kliknite na položku Vymazať, aby sa zobrazila výzva na prihlásenie.",
      ERROR_EDIT: "Nebolo možné aktualizovať váš komentár.  Skúste to znova neskôr.",
      ERROR_EDIT_ACCESS_DENIED: "Váš komentár nebolo možné aktualizovať, pretože položka bola vymazaná alebo ju už nevidíte.",
      ERROR_EDIT_NOT_FOUND: "Váš komentár nebolo možné aktualizovať, pretože položka bola vymazaná alebo ju už nevidíte.",
      ERROR_EDIT_TIMEOUT: "Nebolo možné aktualizovať váš komentár, pretože nebolo možné kontaktovať server.  Skúste to znova kliknutím na položku Zverejniť",
      ERROR_EDIT_CANCEL: "Váš komentár nebolo možné aktualizovať, pretože požiadavka bola zrušená.  Skúste to znova kliknutím na položku Zverejniť",
      ERROR_EDIT_NOT_LOGGED_IN: "Ak chcete upraviť tento komentár, musíte byť prihlásený.  Kliknite na položku Zverejniť, aby sa zobrazila výzva na prihlásenie.",
      ERROR_NO_CONTENT: "Zadajte komentár a kliknite na tlačidlo Zverejniť.  Ak nechcete zanechať komentár, kliknite na položku Zrušiť.",
      ERROR_NO_CONTENT_EDIT: "Zadajte komentár a kliknite na tlačidlo Zverejniť.  Ak nechcete upraviť komentár, kliknite na položku Zrušiť.",
      ERROR_UNAUTHORIZED: "Váš komentár nebolo možné uložiť, pretože nie ste autorizovaný nechať komentár.",
      ERROR_GENERAL: "Nastala chyba.",
      OK: "OK",
      YES: "Áno",
      TRIM_LONG_COMMENT: "Má sa skrátiť komentár?",
      WARN_LONG_COMMENT: "Komentár je pridlhý.  ${shorten}",
      LINK: "Odkaz",
      SAVE: "Uložiť",
      POST: "Zverejniť",
      SHOWMORE: "Viac informácií...",
      VIEW_COMMENTS_FILE: "Zobraziť komentáre k tomuto súboru",
      SUBSCRIBE_TO_COMMENTS: "Prihlásiť na odber týchto komentárov",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Sledujte zmeny v týchto komentároch cez čítačku informačných kanálov",
      PROFILE_TITLE: "Otvoriť profil užívateľa ${user}.",
      PROFILE_A11Y: "Aktivácia tohto odkazu otvorí profil užívateľa ${user} v novom okne.",
      MODERATION_PENDING: "Tento komentár čaká na posúdenie.",
      MODERATION_REMOVED: {
         DAY: "Tento komentár odstránil užívateľ ${user} ${EEEE} o ${time}.",
         MONTH: "Tento komentár odstránil užívateľ ${user} ${MMM} ${d}.",
         TODAY: "Tento komentár odstránil užívateľ ${user} dnes o ${time}.",
         YEAR: "Tento komentár odstránil užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Tento komentár odstránil užívateľ ${user} včera o ${time}.",
         TOMORROW: "Tento komentár odstránil užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Tento komentár odmietol užívateľ ${user} ${EEEE} o ${time}.",
         MONTH: "Tento komentár odmietol užívateľ ${user} ${MMM} ${d}.",
         TODAY: "Tento komentár odmietol užívateľ ${user} dnes o ${time}.",
         YEAR: "Tento komentár odmietol užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Tento komentár odmietol užívateľ ${user} včera o ${time}.",
         TOMORROW: "Tento komentár odmietol užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}."
      },
      PREV_COMMENTS: "Zobraziť staršie komentáre",
      EMPTY: "Neexistujú žiadne komentáre.",
      ERROR_ALT: "Chyba",
      ERROR: "Nastala chyba počas získavania komentárov. ${again}",
      ERROR_ADDTL: "Nastala chyba pri získavaní ďalších komentárov. ${again}",
      ERROR_AGAIN: "Skúste to znova.",
      ERROR_AGAIN_TITLE: "Zopakujte požiadavku o ďalšie komentáre.",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} o ${time} (verzia ${version})",
         MONTH: "${user} ${MMM} ${d} (verzia ${version})",
         TODAY: "${user} dnes o ${time} (verzia ${version})",
         YEAR: "${user} ${MMM} ${d}, ${YYYY} (verzia ${version})",
         YESTERDAY: "${user} včera o ${time} (verzia ${version})",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (verzia ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} o ${time}",
         MONTH: "${user} ${MMM} ${d}",
         TODAY: "${user} dnes o ${time}",
         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} včera o ${time}",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} o ${time}",
         MONTH: "${MMM} ${d}",
         TODAY: "Dnes o ${time}",
         YEAR: "${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Včera o ${time}",
         TOMORROW: "${MMM} ${d}, ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Komentár bol vymazaný užívateľom ${user} dňa ${EEEE} o ${time}",
         MONTH: "Komentár bol vymazaný užívateľom ${user} dňa ${MMM} ${d}",
         TODAY: "Komentár vymazal užívateľ ${user} dnes o ${time}",
         YEAR: "Komentár vymazal užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Komentár vymazal užívateľ ${user} včera o ${time}",
         TOMORROW: "Komentár vymazal užívateľ ${user} dňa ${MMM} ${d}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} upravil ${EEEE} o ${time} (verzia ${version})",
         MONTH: "${user} upravil ${MMM} ${d} (verzia ${version})",
         TODAY: "${user} upravil dnes o ${time} (verzia ${version})",
         YEAR: "${user} upravil dňa ${MMM} ${d}, ${YYYY} (verzia ${version})",
         YESTERDAY: "${user} upravil včera o ${time} (verzia ${version})",
         TOMORROW: "${user} upravil dňa ${MMM} ${d}, ${YYYY} (verzia ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} upravil ${EEEE} o ${time}",
         MONTH: "${user} upravil ${MMM} ${d}",
         TODAY: "${user} upravil dnes o ${time}",
         YEAR: "${user} upravil dňa ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} upravil včera o ${time}",
         TOMORROW: "${user} upravil dňa ${MMM} ${d}, ${YYYY}"
      },

      DELETE_CONFIRM: "Naozaj chcete vymazať tento komentár?",
      FLAG_ITEM: {
         BUSY: "Ukladá sa...",
         CANCEL: "Zrušiť",
         ACTION: "Označiť ako nevhodné",
         DESCRIPTION_LABEL: "Zadajte dôvod označenia tejto položky (voliteľné)",
         EDITERROR: "Metaúdaje súboru nebolo možné upraviť, pretože nastala chyba.",
         OK: "Uložiť",
         ERROR_SAVING: "Nastala chyba pri spracúvaní požiadavky. Skúste to znova neskôr.",
         SUCCESS_SAVING: "Vaše označenie bolo odoslané. Moderátor ho čoskoro preskúma.",
         TITLE: "Označiť túto položku ako nevhodnú",
         COMMENT: {
            TITLE: "Označiť tento komentár ako nevhodný",
            A11Y: "Toto tlačidlo otvorí dialógové okno, ktoré umožňuje užívateľovi označiť tento komentár ako nevhodný."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Zrušiť",
      DIALOG_TITLE: "Vymazať komentár",
      NAME: "Vymazať komentár",
      OK: "OK",
      TOOLTIP: "Vymazať komentár"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Zrušiť",
      CONFIRM: "Skrátením sa odstráni text presahujúci limit komentára.  Ak požadujete skrátenie, kliknite na položku OK. Ak chcete upraviť samotný komentár, kliknite na položku Zrušiť.",
      DIALOG_TITLE: "Skrátiť komentár",
      NAME: "Skrátiť komentár",
      OK: "OK",
      TOOLTIP: "Skrátiť komentár"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Potvrdenie odoslania",
      CONFIRM: "Váš komentár bol odoslaný na posúdenie a bude k dispozícii po schválení.",
      OK: "OK"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "PM",
      TODAY: "dnes",
      TODAY_U: "Dnes",
      YESTERDAY: "včera",
      YESTERDAY_U: "Včera",

      ADDED: { DAY: "Pridané ${EEee} o ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Pridané ${date_long}",
         TODAY: "Pridané dnes o ${time}",
         YEAR: "Pridané ${date_long}",
         YESTERDAY: "Pridané včera o ${time}"
      },

      LAST_UPDATED: { DAY: "Posledná aktualizácia ${EEee} o ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Posledná aktualizácia ${date_long}",
         TODAY: "Posledná aktualizácia dnes o ${time}",
         YEAR: "Posledná aktualizácia ${date_long}",
         YESTERDAY: "Posledná aktualizácia včera o ${time}"
      },

      MONTHS_ABBR: { 0: "JAN",
         10: "NOV",
         11: "DEC",
         1: "FEB",
         2: "MAR",
         3: "APR",
         4: "MÁJ",
         5: "JÚN",
         6: "JÚL",
         7: "AUG",
         8: "SEP",
         9: "OKT"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Dnes",
         YEAR: "${date_short}",
         YESTERDAY: "Včera",
         TOMORROW: "Zajtra"
      },

      RELATIVE_TIME: { DAY: "${EEee} o ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Dnes o ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Včera o ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} o ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Dnes o ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Včera o ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} o ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short} o ${time}",
         TODAY: "${date_short} o ${time}",
         YEAR: "${date_short} o ${time}",
         YESTERDAY: "${date_short} o ${time}",
         TOMORROW: "${date_short} o ${time}"
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

      UPDATED: { DAY: "Aktualizované ${EEee} o ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Aktualizované ${date_long}",
         TODAY: "Aktualizované dnes o ${time}",
         YEAR: "Aktualizované ${date_long}",
         YESTERDAY: "Aktualizované včera o ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Nedajú sa načítať informácie o verzii.",
      ERROR_REQUEST_CANCELLED: "Požiadavka bola zrušená.",
      ERROR_REQUEST_TIMEOUT: "Nebolo možné kontaktovať server.",
      ERROR_REQUEST_UNKNOWN: "Nastala neznáma chyba.",
      LOADING: "Načítava sa...",
      NO_VERSIONS: "Neexistujú žiadne verzie",
      INFO: "Verzia ${0} vytvorené ${1} užívateľom ",
      VERSION_NUMBER: "Verzia ${0}",
      DELETED: "Vymazané",
      DELETE_ALL: "Vymazať všetky verzie staršie ako verzia",
      DELETE_VERSION_SINGLE: "Vymazať verziu ${0}",
      DELETEERROR: "Verzia nebola vymazaná, pretože nastala chyba.",
      CREATE_VERSION: "Vytvoriť novú verziu",
      CREATE_VERSION_TOOLTIP: "Vytvoriť verziu tohto súboru",
      REVERT_VERSION: "Obnoviť verziu ${0}",
      REVERT_DESCRIPTION: "Obnovené z verzie ${0}",
      PREVIOUS: "Predchádzajúci",
      PREVIOUS_TOOLTIP: "Predchádzajúca stránka",
      ELLIPSIS: "...",
      NEXT: "Ďalší",
      NEXT_TOOLTIP: "Ďalšia stránka",
      COUNT: "${0} - ${1} z ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Stránka",
      SHOW: "Zobraziť",
      ITEMS_PER_PAGE: " položiek na stránke.",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Dnes o ${time}",
            YESTERDAY: "Včera o ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} o ${time}",
            YEAR: "${date_short} o ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} o ${time}",
            TODAY: "dnes o ${time}",
            YESTERDAY: "včera o ${time}"
        },
        UPDATED: { DAY: "Aktualizované ${EEee} o ${time}",
            YEAR: "Aktualizované ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Aktualizované ${date_short}",
            TODAY: "Aktualizované dnes o ${time}",
            YESTERDAY: "Aktualizované včera o ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Vymazať verziu ${0}",
         DOWNLOAD: "Prevziať",
         DOWNLOAD_TOOLTIP: "Prevziať túto verziu (${0})",
         VIEW: "Zobraziť",
         VIEW_TOOLTIP: "Zobraziť verziu ${0}",
         REVERT: {
            A11Y: "Toto tlačidlo otvorí dialógové okno, ktoré umožňuje používateľovi potvrdiť obnovenie súboru zo staršej verzie. Potvrdenie tejto akcie spôsobí obnovu obsahu na stránke.",
            FULL: "Obnoviť",
            WIDGET: "Obnoviť túto verziu"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Nebolo možné vymazať verziu, pretože už bola vymazaná alebo už pre vás nie je viditeľná.",
         ERROR_ACCESS_DENIED: "Nebolo možné vymazať verziu, pretože nie ste editor.",
         ERROR_TIMEOUT: "Verzia nebola vymazaná, pretože nebolo možné kontaktovať server.  Znova kliknite na položku Vymazať, aby ste znova vyskúšali svoju požiadavku.",
         ERROR_CANCEL: "Verzia nebola vymazaná, pretože požiadavka bola zrušená.  Znova kliknite na položku Vymazať, aby ste znova vyskúšali svoju požiadavku.",
         ERROR_NOT_LOGGED_IN: "Ak chcete vymazať túto verziu, musíte byť prihlásený.  Kliknite na položku Vymazať, aby sa zobrazila výzva na prihlásenie.",
         GENERIC_ERROR: "Nebolo možné vymazať verziu, pretože nastala neznáma chyba.  Znova kliknite na položku Vymazať, aby ste znova vyskúšali svoju požiadavku.",
         FULL: "Vymazať",
         A11Y: "Toto tlačidlo otvorí dialógové okno, ktoré umožňuje používateľovi potvrdiť vymazanie tejto verzie. Potvrdenie tejto akcie spôsobí obnovu obsahu na stránke."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Nebolo možné obnoviť verziu, pretože bola vymazaná alebo už pre vás nie je viditeľná.",
         ERROR_ACCESS_DENIED: "Nebolo možné obnoviť verziu, pretože nie ste editor.",
         ERROR_NAME_EXISTS: "Nebolo možné obnoviť verziu, pretože iný súbor má rovnaký názov.",
         ERROR_TIMEOUT: "Verzia nebola obnovená, pretože nebolo možné kontaktovať server.  Znova kliknite na položku Obnoviť, aby ste znova vyskúšali svoju požiadavku.",
         ERROR_CANCEL: "Verzia nebola obnovená, pretože požiadavka bola zrušená.  Znova kliknite na položku Obnoviť, aby ste znova vyskúšali svoju požiadavku.",
         ERROR_QUOTA_VIOLATION: "Nebolo možné obnoviť verziu z dôvodu obmedzení priestoru.",
         ERROR_MAX_CONTENT_SIZE: "Nebolo možné obnoviť verziu, pretože je väčšia ako maximálna povolená veľkosť súboru ${0}",
         GENERIC_ERROR: "Nebolo možné obnoviť verziu, pretože nastala neznáma chyba.  Znova kliknite na položku Obnoviť, aby ste znova vyskúšali svoju požiadavku."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Pozrite sa, kto prevzal...",
      PREVIOUS: "Predchádzajúci",
      PREVIOUS_TOOLTIP: "Predchádzajúca stránka",
      ELLIPSIS: "...",
      NEXT: "Ďalší",
      NEXT_TOOLTIP: "Ďalšia stránka",
      COUNT: "${0} - ${1} z ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Stránka",
      SHOW: "Zobraziť",
      ITEMS_PER_PAGE: " položiek na stránke.",
      VERSION: {
         DAY: "Verzia ${version} dňa ${date}",
         MONTH: "Verzia ${version} dňa ${date}",
         TODAY: "Verzia ${version} o ${time}",
         YEAR: "Verzia ${version} dňa ${date}",
         YESTERDAY: "Verzia ${version} včera"
      },

      FILE: {
         V_LATEST: "Prevzali ste najnovšiu verziu tohto súboru",
         V_OLDER: "Naposledy ste prevzali verziu ${0} tohto súboru",
         LOADING: "Načítava sa...",
         EMPTY: "Iba anonymní používatelia",
         ERROR: "Nedajú sa načítať informácie o preberaní"
      }
   },

   EE_DIALOG: {
      ERROR: "Chyba",
      ERROR_ALT_TEXT: "Chyba:",
      ERROR_MSG_GENERIC: "Niečo sa stalo.  Skúste to znova.",
      ERROR_MSG_NOT_AVAILABLE: "Položka bola vymazaná alebo už nie je k dispozícii.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Obsah pre túto položku nie je k dispozícii.",
      ERROR_MSG_NO_ACCESS: "Už nemáte prístup k tejto položke.",
      LOADING: "Načítava sa...",
      TITLE_SU: "${author} zverejnil správu.",
      TITLE_NI: "${author} vás pozval na pripojenie do jeho siete.",
      AUTHOR_TITLE: "Zobraziť profil pre ${author}",
      OPEN_LINK: "Otvoriť ${title}",
      CONFIRM_CLOSE_TITLE: "Potvrdiť",
      CONFIRM_CLOSE_MESSAGE: "Naozaj chcete zrušiť svoje zmeny? Ak chcete pokračovať, kliknite na položku OK. Ak sa chcete vrátiť, kliknite na položku Zrušiť.",
      OK: "OK",
      CANCEL: "Zrušiť"
   },
   MESSAGE: {
      SUCCESS: "Potvrdenie",
      ERROR: "Chyba",
      ERROR_ALT_TEXT: "Chyba:",
      INFO: "Informácie",
      WARNING: "Upozornenie",
      DISMISS: "Skryť túto správu",
      MORE_DETAILS: "Viac podrobností",
      HIDE_DETAILS: "Skryť podrobnosti"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Vytvorené: ${EEEE} o ${time}",
           MONTH: "Vytvorené: ${MMM} ${d}",
           TODAY: "Vytvorené: dnes o ${time}",
           YEAR: "Vytvorené. ${MMM} ${d}, ${YYYY}",
           YESTERDAY: "Vytvorené: včera o ${time}",
           TOMORROW: "Vytvorené. ${MMM} ${d}, ${YYYY}"
       },
      error: "Nastala chyba.  ${again}.",
      error_again: "Skúste to znova",
      error_404: "Aktualizácia stavu už neexistuje.",
      notifications: {
         STATUS_UPDATE: "${user} zverejnil správu",
         USER_BOARD_POST: "${user} napísal na vašu nástenku",
         POST_COMMENT: "${user} napísal:"
      }
   },
   login: {
      error: "Vaše meno používateľa alebo heslo sa nezhoduje so žiadnym z existujúcich účtov. Skúste to znova.",
      logIn: "Prihlásiť",
      password: "Heslo:",
      user: "Meno používateľa:",
      welcome: "Prihlásiť do produktu HCL Connections"
   },
   repost: {
      name: "Opakovane zverejniť",
      title: "Opakovane zverejniť túto aktualizáciu mojim sledovateľom alebo komunitám",
      msg_success: "Aktualizácia sa úspešne opakovane zverejnila pre vašich sledovateľov.",
      msg_generic: "Niečo sa stalo.  Skúste to znova."
   },
   FILE_SHARE_INFO: {
      ADD: "Pridať",
      ADD_TXT: "Pridať ľudí alebo komunity ako čitateľov",
      SHOW_MORE: "Zobraziť viac...",
      READER_IF_PUBLIC: "Každý (verejnosť)",
      READER_IF_PUBLIC_TOOLTIP: "Tento súbor je verejný a je viditeľný pre každého",
      EMPTY_READERS: "Žiadny",
      READERS_LABEL: "Čitatelia: ",
      EDITORS_LABEL: "Editori: ",
      OWNER_LABEL: "Vlastník: ",
      ERROR: "Nedajú sa načítať informácie o zdieľaní",
      ERROR_NOT_FOUND: "Súbor, o ktorý ste požiadali, bol vymazaný alebo presunutý. Ak vám niekto poslal tento odkaz, skontrolujte, či je správny.",
      ERROR_ACCESS_DENIED: "Nemáte oprávnenie zobraziť tento súbor.  Súbor nie je verejný a nie je s vami zdieľaný.",
      SHARE: "Zdieľať",
      CANCEL: "Zrušiť",
      SHARE_WITH: "Zdieľať s:",
      PERSON: "Osoba",
      COMMUNITY: "Komunita",
      PLACEHOLDER: "Meno osoby alebo e-mailová adresa...",
      MESSAGE: "Správa:",
      MESSAGE_TXT: "Pridať voliteľnú správu",
      REMOVE_ITEM_ALT: "Odstrániť ${0}",
      NO_MEMBERS: "Žiadny",
      A11Y_READER_ADDED: "Vybraté ${0} ako čitateľ",
      A11Y_READER_REMOVED: "Odstránených ${0} ako čitateľ",
      SELF_REFERENCE_ERROR: "Nemôžete zdieľať so sebou.",
      OWNER_REFERENCE_ERROR: "Nemôžete zdieľať s vlastníkom súboru.",
      SHARE_COMMUNITY_WARN: "Zdieľanie s verejnou komunitou „${0}“ spraví tento súbor verejným.",
      SELECT_USER_ERROR: "Musíte vybrať aspoň jednu osobu alebo komunitu, s ktorou chcete zdieľať",
      WARN_LONG_MESSAGE: "Správa je pridlhá.",
      TRIM_LONG_MESSAGE: "Má sa skrátiť správa?",
      ERROR_SHARING: "Nebolo možné zdieľať súbor.  Skúste to znova neskôr.",
      INFO_SUCCESS: "Súbor sa úspešne zdieľa.",
      MAX_SHARES_ERROR: "Prekročil sa maximálny počet zdieľaní.",
      NOT_LOGGED_IN_ERROR: "Súbor sa nezdieľa, pretože ste neboli prihlásený.  Ak chcete zdieľať súbor, kliknite na položku Zdieľať.",
      TIMEOUT_ERROR: "Súbor sa nezdieľa, pretože nebolo možné kontaktovať server.  Skúste to znova kliknutím na položku Zdieľať",
      CANCEL_ERROR: "Súbor sa nezdieľa, pretože požiadavka bola zrušená.  Skúste to znova kliknutím na položku Zdieľať",
      NOT_FOUND_ERROR: "Súbor bol vymazaný alebo ho už nevidíte a nedá sa zdieľať.",
      ACCESS_DENIED_ERROR: "Už nemáte oprávnenie zdieľať tento súbor.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Súbor, ktorý je obmedzený, nemožno spraviť verejným.",
      TOOLTIP: "Udeliť ostatným prístup k tomuto súboru"
   },
   HISTORY: {
      TAB_TITLE: "Posledné aktualizácie",
      NO_HISTORY: "Neexistujú žiadne posledné aktualizácie.",
      EMPTY: "Nebolo možné získať posledné aktualizácie pre túto položku. Bola vymazaná alebo už k nej nemáte prístup.",
      MORE: "Zobraziť staršie aktualizácie",
      ERROR_ALT: "Chyba",
      ERROR: "Nastala chyba počas získavania aktualizácií. ${again}",
      ERROR_ADDTL: "Nastala chyba pri získavaní ďalších aktualizácií. ${again}",
      ERROR_AGAIN: "Skúste to znova.",
      ERROR_AGAIN_TITLE: "Zopakujte požiadavku na ďalšie aktualizácie.",
      PROFILE_TITLE: "Otvoriť profil používateľa ${user}.",
      SORT_BY: "Zoradiť podľa\\:",
      SORTS: {
         DATE: "Dátum",
         DATE_TOOLTIP: "Zoradiť od najnovších po najstaršie aktualizácie",
         DATE_TOOLTIP_REVERSE: "Zoradiť od najstarších po najnovšie aktualizácie"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} o ${time}",
             MONTH: "${MMM} ${d}",
             TODAY: "Dnes o ${time}",
             YEAR: "${MMM} ${d}, ${YYYY}",
             YESTERDAY: "Včera o ${time}",
             TOMORROW: "${MMM} ${d}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Tento komentár",
	   REPLY_ACTION: "Odpovedať",
       REPLY_ACTION_TOOLTIP: "Odpovedať na tento komentár"
   },
   OAUTH: {
      welcomeHeader: "Vitajte v produkte Connections",
      continueBtnLabel: "Pokračovať",
      continueBtnA11y: "Aktivácia tohto odkazu otvorí nové okno, ktoré vám umožní autorizovať prístup pre Connections.",
      clickHere: "Kliknite tu",
      infoMsg: "Connections vyžaduje vašu autorizáciu na prístup k vašim údajom.",
      authorizeGadget: "${clickHere}, ak chcete autorizovať túto aplikáciu na prístup k vašim informáciám v produkte Connections.",
      confirmAuthorization: "${clickHere}, ak chcete potvrdiť, že ste autorizovali túto aplikáciu na prístup k vašim informáciám v produkte Connections."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Aktivácia tohto odkazu otvorí nové okno, ktoré vám umožní autorizovať prístup pre archív knižníc Connections.",
      infoMsg: "Archív knižníc Connections vyžaduje vašu autorizáciu na prístup k vašim údajom.",
      authorizeGadget: "${clickHere}, ak chcete autorizovať túto aplikáciu na prístup k vašim informáciám v archíve knižníc Connections.",
      confirmAuthorization: "${clickHere}, ak chcete potvrdiť, že ste autorizovali túto aplikáciu na prístup k vašim informáciám v archíve knižníc Connections."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Zrušiť",
      CONFIRM: "Naozaj chcete zrušiť svoje zmeny?  Ak chcete pokračovať, kliknite na položku OK. Ak sa chcete vrátiť, kliknite na položku Zrušiť.",
      DIALOG_TITLE: "Potvrdiť",
      NAME: "Potvrdiť",
      OK: "OK",
      TOOLTIP: "Potvrdiť"
   }
})
