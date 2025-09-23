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
         label: "Továbbiak",
         tooltip: "További műveletek"
       },
       tags_more: "és ${0} másik",
       ERROR_ALT: "Hiba",
       PERSON_TITLE: "${user} profiljának megnyitása.",
       inactiveUser: "${user} (inaktív)",
       inactiveIndicator: "(inaktív)",
       like_error: "A kedvelést nem lehetett elmenteni. Próbálkozzon újra később.",
       vote_error: "A szavazatot nem lehetett elmenteni. Próbálkozzon újra később."
   },
   generic: {
      untitled: "(Névtelen)",
      tags: "Címkék:",
      tags_more: "és ${0} másik",
      likes: "Kedvelések",
      comments: "Megjegyzések",
      titleTooltip: "${app} megnyitása",
      error: "Nem lehet adatokat beolvasni.",
      timestamp: {
         created: {
            DAY: "Létrehozva: ${EEEE}, ${time} időpontban",
            MONTH: "Létrehozva: ${MMM} ${d}",
            TODAY: "Létrehozva ma ${time} időpontban",
            YEAR: "Létrehozva: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Létrehozva tegnap ${time} időpontban",
            TOMORROW: "Létrehozva: ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Frissítve: ${EEEE} - ${time}",
            MONTH: "Frissítve: ${MMM} ${d}",
            TODAY: "Frissítve ma ${time} időpontban",
            YEAR: "Frissítve: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Frissítve tegnap ${time} időpontban",
            TOMORROW: "Frissítve: ${MMM} ${d}, ${YYYY}"
         }
      },
      visibility: {
         pub: "Nyilvános",
         priv: "Privát"
      },
      action: {
         created: "Létrehozva",
         updated: "Frissítve"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "Frissítések fogadása a követett személyekről a Kezdőlapon és e-mail összegzésben.",
      profile_title: "${user} profiljának megnyitása.",
      profile_a11y: "A hivatkozás aktiválásával ${user} felhasználó profilját új ablakban nyitja meg.",
      error: "Hiba történt.  ${again}.",
      error_again: "Próbálkozzon újra",
      error_404: "A hálózati kérés már nem létezik.",
      warning: "Figyelmeztetés",
      messages: {
         success: {
            accept: {
            	nofollow: "Most már kapcsolatban állnak.",
            	follow: "Most már kapcsolatban állnak és követi ${user} felhasználót."
            },
            ignore: {
            	nofollow: "Figyelmen kívül hagyta a meghívást.",
            	follow: "Figyelmen kívül hagyta a meghívást, de most már követi ${user} felhasználót."
            }
         },
         error: {
            accept: "Hiba történt a kérés elfogadásakor.",
            ignore: "Hiba történt a kérés figyelmen kívül hagyásakor."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE}, ${time} időpontban",
              MONTH: "${MMM} ${d}",
              TODAY: "Ma ${time} időpontban",
              YEAR: "${MMM} ${d}, ${YYYY}",
              YESTERDAY: "Tegnap ${time} időpontban",
              TOMORROW: "${MMM} ${d}, ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "A hivatkozás aktiválása új ablakban nyitja meg a következőt: ${name}.",
      tooltip: "${name} megnyitása a Fájlok alkalmazásban",
      profile_title: "${user} profiljának megnyitása.",
      profile_a11y: "A hivatkozás aktiválásával ${user} felhasználó profilját új ablakban nyitja meg.",
      download_tooltip: "A fájl letöltése (${0})",
      following: {
         add: "Fájl követése",
         remove: "Követés leállítása",
         title: "Ki- bekapcsolja a fájl frissítéseinek fogadását"
      },
      share: {
         label: "Megosztás",
         title: "Hozzáférés megadása a fájlhoz mások számára"
      },
      timestamp: {
         created: {
            DAY: "Létrehozva: ${EEEE}, ${time} időpontban",
            MONTH: "Létrehozva: ${MMM} ${d}",
            TODAY: "Létrehozva ma ${time} időpontban",
            YEAR: "Létrehozva: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Létrehozva tegnap ${time} időpontban",
            TOMORROW: "Létrehozva: ${MMM} ${d}, ${YYYY}"
         },
         createdOther: {
            DAY: "${user} létrehozta: ${EEEE}, ${time} időpontban",
            MONTH: "${user} felhasználó létrehozta: ${MMM} ${d}",
            TODAY: "${user} felhasználó létrehozta ma ${time} időpontban",
            YEAR: "${user} létrehozta: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} felhasználó létrehozta tegnap ${time} időpontban",
            TOMORROW: "${user} létrehozta: ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Frissítve: ${EEEE} - ${time}",
            MONTH: "Frissítve: ${MMM} ${d}",
            TODAY: "Frissítve ma ${time} időpontban",
            YEAR: "Frissítve: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Frissítve tegnap ${time} időpontban",
            TOMORROW: "Frissítve: ${MMM} ${d}, ${YYYY}"
         },
         updatedOther: {
            DAY: "${user} frissítve: ${EEEE}, ${time} időpontban",
            MONTH: "${user} felhasználó frissítette: ${MMM} ${d}",
            TODAY: "${user} felhasználó frissítette ma ${time} időpontban",
            YEAR: "${user} frissítette: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "${user} felhasználó frissítette tegnap ${time} időpontban",
            TOMORROW: "${user} frissítette: ${MMM} ${d}, ${YYYY}"
         },
         createdCompact: {
            DAY: "Létrehozva: ${EEEE}, ${time} időpontban",
            MONTH: "Létrehozva: ${MMM} ${d}",
            TODAY: "Létrehozva: ma ${time} időpontban",
            YEAR: "Létrehozva: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Létrehozva: tegnap ${time} időpontban",
            TOMORROW: "Létrehozva: ${MMM} ${d}, ${YYYY}"
         },
         updatedCompact: {
            DAY: "Frissítve: ${EEEE}, ${time} időpontban",
            MONTH: "Frissítve: ${MMM} ${d}",
            TODAY: "Frissítve: ma ${time} időpontban",
            YEAR: "Frissítve: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Frissítve: tegnap ${time} időpontban",
            TOMORROW: "Frissítve: ${MMM} ${d}, ${YYYY}"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long}, ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long}, ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "Fájl letöltése (${size})",
      	 DOWNLOAD_ALT: "Letöltés"
      },

      PREVIEW: {
         LINK: "Előkép",
         TITLE: "Fájl előzetes megtekintése új ablakban."
      },
      TAGS: "Címkék:",
      error: "Hiba történt.  ${again}.",
      error_again: "Próbálkozzon újra",
      error_404: "A fájl már nem létezik vagy nincs megfelelő hozzáférési engedélye.",
      error_403: "Nincs jogosultsága a fájl megtekintésére. A fájl nem nyilvános és azt nem osztották meg.",
      notifications: {
         USER_SHARED: "${user} írta:",
         CHANGE_SUMMARY: "${user} változásösszegzést adott meg",
         NO_CHANGE_SUMMARY: "${user} nem adott meg változásösszegzést",
         COMMENTED: "${user} megjegyzést írt"
      }
   },
   ecm_file: {
      checkedout_you: "Én iktattam ki",
      checkedout_other: "${user} által kiiktatva",
      tooltip: "${name} fájl megnyitása a könyvtárban",
      draft_404_info: "A vázlat törölve lett vagy már nincs megosztva Önnel. A közzétett verzió most a fájl legújabb verziója.",
      error_404: "A fájlt törölték vagy már nincs megosztva Önnel.",
      error_403: "A fájlt törölték vagy már nincs megosztva Önnel.",
      error_preview: "A fájl már nem érhető el áttekintésre.",
      draft_review_canceled: "Az áttekintést visszavonták, és a vázlat már nincs megosztva Önnel. Az áttekintést már nem kérik.",
      switch_ee: "Vázlat megtekintése",
      switch_ee_tooltip: "A fájl legutóbbi vázlatának megtekintése"
   },
   ecm_draft: {
      tooltip: "${name} vázlat megnyitása a könyvtárban",
      community_owners: "Közösség tulajdonosai",
      draft: "Vázlat",
      draft_tooltip: "Vázlat megtekintése",
      draft_general_info: "Az előző vázlat már nem létezik, és most már egy újabb vázlat a legújabb verzió.",
      draft_review_404_general_info: "Az egyik áttekintő már szavazott. Már nincs szükség a vázlat áttekintésére.",
      draft_review_404_request_info: "Az előző vázlat már nem létezik, és a legutóbbi vázlatot beküldték áttekintésre. Az áttekintését kérik.",
      draft_review_404_require_info: "Az előző vázlat már nem létezik, és a legutóbbi vázlatot beküldték áttekintésre. Az áttekintésére van szükség.",
      draft_review_request_info: "Az áttekintését kérik.",
      draft_review_require_info: "Az áttekintésére van szükség.",
      error_404: "A vázlat törölve lett vagy már nincs megosztva Önnel.",
      error_403: "Nem tekintheti meg ezt a vázlatot, mert az már nincs megosztva Önnel.",
      error_preview: "A vázlat már nem érhető el áttekintésre.",
      switch_ee: "Közzétett verzió megtekintése",
      switch_ee_tooltip: "A fájl közzétett verziójának megtekintése",
      review: "Áttekintés",
      reviewers: "Áttekintők",
      reviwers_addtl: "További áttekintők",
      in_review: "Áttekintés alatt álló vázlat",
      in_review_tooltip: "Áttekintés alatt álló vázlat megtekintése",
      review_required_any: "A közösség tulajdonosai megkövetelik, hogy egy áttekintő átnézze ezt a vázlatot.",
      review_required_all: "A közösség tulajdonosai megkövetelik, hogy minden áttekintő átnézze ezt a vázlatot.",
      review_required_generic: "A közösség tulajdonosai megkövetelik, hogy ezek az áttekintők átnézzék ezt a vázlatot.",
      review_additional_required: "A vázlat beküldője által hozzáadott minden áttekintőnek át kell tekintenie ezt a vázlatot.",
      reivew_submitted_date: {
         DAY: "${user} beküldte a vázlatot áttekintésre, dátum: ${EEEE}, időpont: ${time}.",
         MONTH: "${user} beküldte a vázlatot áttekintésre, dátum: ${MMM} ${d}.",
         TODAY: "${user} beküldte a vázlatot áttekintésre ma ${time} időpontban.",
         YEAR: "${user} beküldte a vázlatot áttekintésre, dátum: ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "${user} beküldte a vázlatot áttekintésre tegnap ${time} időpontban.",
         TOMORROW: "${user} beküldte a vázlatot áttekintésre, dátum: ${MMM} ${d}, ${YYYY}."
      },
      pending: "Függőben",
      pending_rejected: "Már nincs szükség áttekintésre, mert a vázlatot elutasították",
      approve: "Jóváhagyás",
      approved: "Jóváhagyva",
      approve_tooltip: "A vázlat jóváhagyása",
      accept_success: "Jóváhagyta a vázlatot.",
      accept_error: "Hiba történt a vázlat jóváhagyásakor. Próbálkozzon újra.",
      accept_info: "Jóváhagyta a vázlatot.",
      reject: "Visszautasítás",
      rejected: "Elutasítva",
      reject_tooltip: "A vázlat elutasítása",
      reject_success: "Elutasította a vázlatot.",
      reject_error: "Hiba történt a vázlat elutasításakor. Próbálkozzon újra.",
      reject_info: "Elutasította a vázlatot."
   },
   authUser: {
      error: "Hiba történt az aktuális felhasználó beolvasásakor.  ${again}.",
      error_again: "Próbálkozzon újra",
      error_404: "Nem található hitelesített felhasználó.",
      error_403: "Nincs jogosultsága a felhasználói információk beolvasására."
   },
   forum: {
      error: "Hiba történt.  ${again}.",
      error_again: "Próbálkozzon újra",
      error_404: "A fórum már nem létezik vagy nincs megfelelő hozzáférési engedélye.",
      error_403: "Nincs megfelelő jogosultsága a fórum megtekintéséhez. A fórum nem nyilvános és nincs megosztva Önnel.",

      readMore: "Teljes témakör megtekintése...",
      readMore_tooltip: "${name} fórumtémakör megnyitása.",
      readMore_a11y: "A hivatkozásra kattintva a(z) ${name} fórumtémakör új ablakban nyílik meg.",
      QUESTION_ANSWERED: "Erre a kérdésre már érkezett válasz.",
      QUESTION_NOT_ANSWERED: "Erre a kérdésre még nem érkezett válasz.",

      attachments: "${count} melléklet",
      attachments_one: "${count} melléklet"
   },
   blog: {
      error: "Hiba történt.  ${again}.",
      error_again: "Próbálkozzon újra",
      error_404: "A blog már nem létezik vagy nincs megfelelő hozzáférési engedélye.",
      error_403: "Nincs jogosultsága a blog megtekintésére. A blog nem nyilvános és azt nem osztották meg.",
      readMore: " További részletek...",
      readMore_tooltip: "A(z) ${name} blogbejegyzés megnyitása.",
      readMore_a11y: "A hivatkozásra kattintva a(z) ${name} blogbejegyzés új ablakban nyílik meg.",
      graduated: "Kiemelt",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Szavazás</a>",
  					TOOLTIP: 	"Szavazás erre"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Szavazat</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Szavazott</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Szavazott - Visszavonás' href='javascript:;' id='TOGGLE_${id}'>Visszavonás</a>",
  					TOOLTIP: 	"Szavazat eltávolítása innen"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 személy szavazott erre"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 személy szavazott erre"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} szavazott erre"
  				}
  			},
  			LOADING: "Betöltés...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Szavazat"
  			}
  		}
   },
   idea: {
	  error_404: "A szavazatot nem sikerült menteni, mert vagy elérte a szavazási korlátot, vagy az ötlet már nem érhető el az Ön számára.",
      readMore_tooltip: "A(z) ${name} ötlet megnyitása.",
      readMore_a11y: "A hivatkozásra kattintva a(z) ${name} ötlet új ablakban nyílik meg."
   },
   size: {
      B: "${0} B",
      KB: "${0} KB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "Válaszok",
      THIS_ARIA_LABEL: "Ez a válasz",
      THIS_TAB_TITLE: "Ez a válasz",
      TAB_TITLE: "Válasz (${0})",
      REPLY_TO_REPLY: "Válasz a következőre: ${thisReply}",
      REPLY_TO_TOPIC: "Válasz a következőre: ${thisTopic}",
      THIS_TOPIC: "ez a témakör",
      THIS_REPLY: "ez a válasz",
      NAVIGATE_TO_REPLY: "Ugrás a szülőválaszra",
      NAVIGATE_TO_TOPIC: "Ugrás a szülőtémakörre",
      ADD_COMMENT: "Válasz a témakörre",
      ADD_COMMENT_TOOLTIP: "Válasz erre a fórumtémakörre",
      SHOWING_RECENT_REPLIES: "${0} legújabb válasz megjelenítése",
      PREV_COMMENTS: "További válaszok megjelenítése",
      PLACEHOLDER_TXT: "Válasz a témakörre",
      EMPTY: "Nincs több válasz.",
      TRIM_LONG_COMMENT: "Lerövidíti a választ?",
      WARN_LONG_COMMENT: "A válasz túl hosszú.  ${shorten}",
      ERROR: "Hiba történt a válaszok beolvasásakor. ${again}",
      ERROR_CREATE: "A választ nem lehetett elmenteni.  Próbálkozzon újra később.",
      ERROR_CREATE_NOT_FOUND: "A választ nem lehetett elmenteni, mert a témakört törölték vagy már nem láthatja azt.",
      ERROR_CREATE_ACCESS_DENIED: "A választ nem lehetett elmenteni, mert a témakört törölték vagy már nem láthatja azt.",
      ERROR_CREATE_TIMEOUT: "A választ nem lehetett elmenteni, mert nem sikerült felvenni a kapcsolatot a szerverrel.  A 'Mentés' gombra kattintva próbálkozzon újra.",
      ERROR_CREATE_CANCEL: "A választ nem lehetett elmenteni, mert a kérést visszavonták.  A 'Mentés' gombra kattintva próbálkozzon újra.",
      ERROR_CREATE_NOT_LOGGED_IN: "Be kell jelentkezni a válasz létrehozásához.  A 'Mentés' gombra kattintva megjelenik a bejelentkezési ablak.",
      ERROR_NO_CONTENT: "Adja meg a választ és kattintson a 'Mentés' gombra.  Ha mégsem akar választ hagyni, akkor kattintson a 'Mégse' gombra.",
      ERROR_UNAUTHORIZED: "A válasza nem menthető, mert Ön nincs feljogosítva válaszadásra.",
      COMMENT_DELETED: {
         DAY: "A választ ${user} felhasználó törölte ekkor: ${EEEE}, ${time} időpontban",
         MONTH: "A választ ${user} felhasználó törölte ekkor: ${MMM} ${d}",
         TODAY: "A választ ${user} felhasználó törölte ma ${time} időpontban",
         YEAR: "A választ ${user} felhasználó törölte: ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "A választ ${user} felhasználó törölte tegnap ${time} időpontban",
         TOMORROW: "A választ ${user} felhasználó törölte: ${MMM} ${d}, ${YYYY}"
      },
      REASON_FOR_DELETION: "Törlés oka: ${reason}",
      REPLY_TITLE: "Re: ${0}",
      SHOW_FULL_REPLY: "Teljes válasz megtekintése",
      SHOW_FULL_REPLY_TOOLTIP: "Az eredeti válaszra megjelenítése a fórumtémakörben.",
      REPLY_ACTION: "Válasz",
      REPLY_ACTION_TOOLTIP: "Válasz erre a bejegyzésre",
      MODERATION_PENDING: "A válasz áttekintése jelenleg függőben van.",
      MODERATION_QUARANTINED: "A bejegyzést a moderátor karanténba helyezte.",
      MODERATION_REMOVED: {
         DAY: "A választ ${user} felhasználó eltávolította ekkor: ${EEEE}, ${time}.",
         MONTH: "A választ ${user} felhasználó eltávolította ekkor: ${MMM} ${d}.",
         TODAY: "Ezt a választ ${user} felhasználó eltávolította ma ekkor: ${time}.",
         YEAR: "Ezt a választ ${user} felhasználó eltávolította ekkor: ${YYYY} ${MMM} ${d}.",
         YESTERDAY: "Ezt a választ ${user} felhasználó eltávolította tegnap ekkor: ${time}.",
         TOMORROW: "Ezt a választ ${user} felhasználó eltávolította ekkor: ${YYYY} ${MMM} ${d}."
      },
      MODERATION_REJECTED: {
         DAY: "Ezt a választ ${user} felhasználó elutasította ekkor: ${EEEE}, ${time}.",
         MONTH: "Ezt a választ ${user} felhasználó elutasította ekkor: ${MMM} ${d}.",
         TODAY: "Ezt a választ ${user} felhasználó elutasította ma ekkor: ${time}.",
         YEAR: "Ezt a választ ${user} felhasználó elutasította ekkor: ${YYYY} ${MMM} ${d}.",
         YESTERDAY: "Ezt a választ ${user} felhasználó elutasította tegnap ekkor: ${time}.",
         TOMORROW: "Ezt a választ ${user} felhasználó elutasította ekkor: ${YYYY} ${MMM} ${d}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "A válasza el lett küldve áttekintésre, és elérhető lesz, ha jóváhagyták."
   },
   COMMENTS: {
      ARIA_LABEL: "Megjegyzések",
      PLACEHOLDER_TXT: "Megjegyzés hozzáadása",
      TAB_TITLE: "Megjegyzések (${0})",
      ACTION_NOT_SUPPORTED: "Nem támogatott művelet",
      ADD_COMMENT: "Megjegyzés hozzáadása",
      ADD_COMMENT_TOOLTIP: "Megjegyzés hozzáadása ehhez az elemhez",
      CANCEL: "Mégse",
      COMMENT_COUNT_ONE: "${0} megjegyzés",
      COMMENT_COUNT_MANY: "${0} megjegyzés",
      COMMENT_LABEL: "Megjegyzés:",
      DELETE: "Törlés",
      DELETE_TOOLTIP: "Megjegyzés törlése",
      DELETEREASON: "Megjegyzés törlésének oka:",
      DIALOG_TITLE: "Megjegyzés lerövidítése",
      TOOLTIP: "Megjegyzés lerövidítése",
      NAME: "Megjegyzés lerövidítése",
      EDIT: "Szerkesztés",
      EDIT_TOOLTIP: "Megjegyzés szerkesztése",
      ERROR_CREATE: "A megjegyzés elmentése nem sikerült.  Próbálkozzon újra később.",
      ERROR_CREATE_NOT_FOUND: "A megjegyzést nem lehetett elmenteni, mert az elemet törölték vagy már nem láthatja azt.",
      ERROR_CREATE_ACCESS_DENIED: "A megjegyzést nem lehetett elmenteni, mert az elemet törölték vagy már nem láthatja azt.",
      ERROR_CREATE_TIMEOUT: "A megjegyzést nem lehetett elmenteni, mert nem sikerült a kapcsolatot felvenni a szerverrel.  Az 'Elküld' gombra kattintva próbálkozzon újra.",
      ERROR_CREATE_CANCEL: "A megjegyzést nem lehetett elmenteni, mert a kérést visszavonták.  Az 'Elküld' gombra kattintva próbálkozzon újra.",
      ERROR_CREATE_NOT_LOGGED_IN: "Be kell jelentkezni a megjegyzés létrehozásához.  Az 'Elküld' gombra kattintva megjelenik a bejelentkezési ablak.",
      ERROR_DELETE: "A megjegyzést nem lehetett törölni.  Próbálkozzon újra később.",
      ERROR_DELETE_TIMEOUT: "A megjegyzést nem lehetett törölni, mert a szerverrel nem sikerült felvenni a kapcsolatot.  A 'Törlés' gombra kattintva próbálkozzon újra.",
      ERROR_DELETE_NOT_FOUND: "A megjegyzést nem lehetett törölni, mert a megjegyzést vagy elemet törölték, vagy már nem láthatja azt.",
      ERROR_DELETE_ACCESS_DENIED: "A megjegyzést nem lehetett törölni, mert az elemet törölték vagy már nem láthatja azt.",
      ERROR_DELETE_CANCEL: "A megjegyzést nem lehetett törölni, mert a kérést visszavonták.  A 'Törlés' gombra kattintva próbálkozzon újra.",
      ERROR_DELETE_NOT_LOGGED_IN: "Be kell jelentkezni a megjegyzés törléséhez.  A 'Törlés' gombra kattintva megjelenik a bejelentkezési ablak.",
      ERROR_EDIT: "A megjegyzést nem lehetett frissíteni.  Próbálkozzon újra később.",
      ERROR_EDIT_ACCESS_DENIED: "A megjegyzést nem lehetett frissíteni, mert az elemet törölték vagy már nem láthatja azt.",
      ERROR_EDIT_NOT_FOUND: "A megjegyzést nem lehetett frissíteni, mert az elemet törölték vagy már nem láthatja azt.",
      ERROR_EDIT_TIMEOUT: "A megjegyzést nem lehetett frissíteni, mert nem sikerült a kapcsolatot felvenni a szerverrel.  Az 'Elküld' gombra kattintva próbálkozzon újra.",
      ERROR_EDIT_CANCEL: "A megjegyzést nem lehetett frissíteni, mert a kérést visszavonták.  Az 'Elküld' gombra kattintva próbálkozzon újra.",
      ERROR_EDIT_NOT_LOGGED_IN: "Be kell jelentkezni a megjegyzés szerkesztéséhez.  Az 'Elküld' gombra kattintva megjelenik a bejelentkezési ablak.",
      ERROR_NO_CONTENT: "Adja meg a megjegyzését és kattintson az 'Elküld' gombra.  Ha mégsem akar megjegyzést hagyni, akkor kattintson a 'Mégse' gombra.",
      ERROR_NO_CONTENT_EDIT: "Adja meg a megjegyzését és kattintson az 'Elküld' gombra.  Ha mégsem akarja szerkeszteni a megjegyzést, akkor kattintson 'Mégse' gombra.",
      ERROR_UNAUTHORIZED: "A megjegyzése nem menthető, mert Ön nincs feljogosítva megjegyzések írására.",
      ERROR_GENERAL: "Hiba történt.",
      OK: "OK",
      YES: "Igen",
      TRIM_LONG_COMMENT: "Rövidíti a megjegyzést?",
      WARN_LONG_COMMENT: "A megjegyzés túl hosszú.  ${shorten}",
      LINK: "Hivatkozás",
      SAVE: "Mentés",
      POST: "Elküldés",
      SHOWMORE: "További részletek...",
      VIEW_COMMENTS_FILE: "A fájl megjegyzéseinek megtekintése",
      SUBSCRIBE_TO_COMMENTS: "Előfizetés ezekre a megjegyzésekre",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Ezen megjegyzések módosításainak követése a hírfolyamolvasón keresztül",
      PROFILE_TITLE: "${user} profiljának megnyitása.",
      PROFILE_A11Y: "A hivatkozás aktiválásával ${user} felhasználó profilját új ablakban nyitja meg.",
      MODERATION_PENDING: "A megjegyzés áttekintése függőben van.",
      MODERATION_REMOVED: {
         DAY: "A megjegyzést ${user} felhasználó eltávolította: ${EEEE}, ${time} időpontban.",
         MONTH: "Ezt a megjegyzést ${user} felhasználó eltávolította ${MMM} ${d} időpontban.",
         TODAY: "A megjegyzést ${user} felhasználó ma ${time} időpontban eltávolította.",
         YEAR: "A megjegyzést ${user} felhasználó eltávolította: ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "A megjegyzést ${user} felhasználó tegnap ${time} időpontban eltávolította.",
         TOMORROW: "A megjegyzést ${user} felhasználó eltávolította: ${MMM} ${d}, ${YYYY}"
      },

      MODERATION_REJECTED: {
         DAY: "A megjegyzést ${user} felhasználó elutasította: ${EEEE}, ${time} időpontban.",
         MONTH: "Ezt a megjegyzést ${user} felhasználó elutasította ${MMM} ${d} időpontban.",
         TODAY: "A megjegyzést ${user} felhasználó ma ${time} időpontban elutasította.",
         YEAR: "A megjegyzést ${user} felhasználó elutasította: ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "A megjegyzést ${user} felhasználó tegnap ${time} időpontban elutasította.",
         TOMORROW: "A megjegyzést ${user} felhasználó elutasította: ${MMM} ${d}, ${YYYY}."
      },
      PREV_COMMENTS: "Előző megjegyzések megjelenítése",
      EMPTY: "Nincsenek megjegyzések",
      ERROR_ALT: "Hiba",
      ERROR: "Hiba történt a megjegyzések beolvasásakor. ${again}",
      ERROR_ADDTL: "Hiba történt a további megjegyzések beolvasásakor. ${again}",
      ERROR_AGAIN: "Próbálkozzon újra.",
      ERROR_AGAIN_TITLE: "További megjegyzésekhez próbálkozzon újra a kéréssel.",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE}, ${time} (${version} verzió)",
         MONTH: "${user} ${MMM} ${d} (${version} verzió)",
         TODAY: "${user} ma ${time} időpontban (${version} verzió)",
         YEAR: "${user} ${MMM} ${d}, ${YYYY} (${version} verzió)",
         YESTERDAY: "${user} tegnap ${time} időpontban (${version} verzió)",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (${version} verzió)"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE}, ${time} időpontban",
         MONTH: "${user} ${MMM} ${d}",
         TODAY: "${user} ma ${time} időpontban",
         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} tegnap ${time} időpontban",
         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE}, ${time} időpontban",
         MONTH: "${MMM} ${d}",
         TODAY: "Ma ${time} időpontban",
         YEAR: "${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Tegnap ${time} időpontban",
         TOMORROW: "${MMM} ${d}, ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "A megjegyzést ${user} felhasználó törölte ekkor: ${EEEE}, ${time} időpontban",
         MONTH: "A megjegyzést ${user} felhasználó törölte ekkor: ${MMM} ${d}",
         TODAY: "A megjegyzést ${user} felhasználó törölte ma ${time} időpontban",
         YEAR: "A megjegyzést ${user} felhasználó törölte: ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "A megjegyzést ${user} felhasználó törölte tegnap ${time} időpontban",
         TOMORROW: "A megjegyzést ${user} felhasználó törölte: ${MMM} ${d}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "${user} szerkesztette: ${EEEE}, ${time} időpontban (${version} verzió)",
         MONTH: "${user} szerkesztette: ${MMM} ${d} (${version} verzió)",
         TODAY: "${user}szerkesztette ma ${time} időpontban (${version} verzió)",
         YEAR: "${user} szerkesztette: ${MMM} ${d}, ${YYYY} (${version} verzió)",
         YESTERDAY: "${user} szerkesztette tegnap ${time} időpontban (${version} verzió)",
         TOMORROW: "${user} szerkesztette: ${MMM} ${d}, ${YYYY} (${version} verzió)"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} szerkesztette ${EEEE} ${time} időpontban",
         MONTH: "${user} szerkesztette: ${MMM} ${d}",
         TODAY: "${user} szerkesztette ma ${time} időpontban",
         YEAR: "${user} szerkesztette: ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "${user} szerkesztette tegnap ${time} időpontban",
         TOMORROW: "${user} szerkesztette: ${MMM} ${d}, ${YYYY}"
      },

      DELETE_CONFIRM: "Biztosan törli ezt a megjegyzést?",
      FLAG_ITEM: {
         BUSY: "Mentés...",
         CANCEL: "Mégse",
         ACTION: "Megjelölés nem megfelelőként",
         DESCRIPTION_LABEL: "Adja meg az elem megjelölésének okát (választható)",
         EDITERROR: "A fájl metaadatainak szerkesztésére hiba miatt nem került sor",
         OK: "Mentés",
         ERROR_SAVING: "Hiba történt a kérés feldolgozásakor. Próbálkozzon újra később.",
         SUCCESS_SAVING: "Elküldte a jelzést. Azt hamarosan megvizsgálja egy moderátor.",
         TITLE: "Elem megjelölése nem megfelelőként",
         COMMENT: {
            TITLE: "Megjegyzés megjelölése nem megfelelőként",
            A11Y: "Ez a gomb egy párbeszédpanelt nyit meg, ahol a felhasználó megjelölheti nem megfelelőként a megjegyzést."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Mégse",
      DIALOG_TITLE: "Megjegyzés törlése",
      NAME: "Megjegyzés törlése",
      OK: "OK",
      TOOLTIP: "Megjegyzés törlése"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Mégse",
      CONFIRM: "A rövidítés eltávolítja a megjegyzés korlátján felüli szöveget.  Az 'OK' gombra kattintva lerövidíti a megjegyzést, a 'Mégse' gombra kattintva pedig szerkesztheti azt.",
      DIALOG_TITLE: "Megjegyzés lerövidítése",
      NAME: "Megjegyzés lerövidítése",
      OK: "OK",
      TOOLTIP: "Megjegyzés lerövidítése"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Elküldés megerősítése",
      CONFIRM: "A megjegyzést elküldte áttekintésre és az jóváhagyás után elérhetővé válik.",
      OK: "OK"
   },

   DATE: {
      AM: "DE",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "DU",
      TODAY: "ma",
      TODAY_U: "Ma",
      YESTERDAY: "tegnap",
      YESTERDAY_U: "Tegnap",

      ADDED: { DAY: "Hozzáadva: ${EEee}, ${time} időpontban",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Hozzáadva: ${date_long}",
         TODAY: "Hozzáadva ma ${time} időpontban",
         YEAR: "Hozzáadva: ${date_long}",
         YESTERDAY: "Hozzáadva tegnap ${time} időpontban"
      },

      LAST_UPDATED: { DAY: "Legutóbbi frissítés: ${EEee}, ${time} időpontban",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Utolsó frissítés: ${date_long}",
         TODAY: "Legutóbbi frissítés ma ${time} időpontban",
         YEAR: "Utolsó frissítés: ${date_long}",
         YESTERDAY: "Legutóbbi frissítés tegnap ${time} időpontban"
      },

      MONTHS_ABBR: { 0: "JAN",
         10: "NOV",
         11: "DEC",
         1: "FEB",
         2: "MÁR",
         3: "ÁPR",
         4: "MÁJ",
         5: "JÚN",
         6: "JÚL",
         7: "AUG",
         8: "SZE",
         9: "OKT"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Ma",
         YEAR: "${date_short}",
         YESTERDAY: "Tegnap",
         TOMORROW: "Holnap"
      },

      RELATIVE_TIME: { DAY: "${EEee}, ${time} időpontban",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Ma ${time} időpontban",
         YEAR: "${date_short}",
         YESTERDAY: "Tegnap ${time} időpontban",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee}, ${time} időpontban",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Ma ${time} időpontban",
         YEAR: "${date_long}",
         YESTERDAY: "Tegnap ${time} időpontban",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short}, ${time} időpontban",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}, ${time} időpontban",
         TODAY: "${date_short}, ${time} időpontban",
         YEAR: "${date_short}, ${time} időpontban",
         YESTERDAY: "${date_short}, ${time} időpontban",
         TOMORROW: "${date_short}, ${time} időpontban"
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

      UPDATED: { DAY: "Frissítve: ${EEee} - ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Frissítve: ${date_long}",
         TODAY: "Frissítve ma ${time} időpontban",
         YEAR: "Frissítve: ${date_long}",
         YESTERDAY: "Frissítve tegnap ${time} időpontban"
      }
   },
   VERSIONS: {
      ERROR: "Nem lehet betölteni a verzióinformációkat.",
      ERROR_REQUEST_CANCELLED: "A kérést visszavonták.",
      ERROR_REQUEST_TIMEOUT: "A szerverrel nem sikerült felvenni a kapcsolatot.",
      ERROR_REQUEST_UNKNOWN: "Ismeretlen hiba történt.",
      LOADING: "Betöltés...",
      NO_VERSIONS: "Nincsenek verziók",
      INFO: "${0} verzió, létrehozva: ${1}, létrehozta: ",
      VERSION_NUMBER: "${0} verzió",
      DELETED: "Törölve",
      DELETE_ALL: "A következő verzió előtti összes verzió törlése:",
      DELETE_VERSION_SINGLE: "${0} verzió törlése",
      DELETEERROR: "A verzió törlésére hiba miatt nem került sor.",
      CREATE_VERSION: "Új verzió létrehozása",
      CREATE_VERSION_TOOLTIP: "A fájl új verziójának létrehozása",
      REVERT_VERSION: "${0} verzió visszaállítása",
      REVERT_DESCRIPTION: "Visszaállítva a(z) ${0} verzióból",
      PREVIOUS: "Előző",
      PREVIOUS_TOOLTIP: "Előző oldal",
      ELLIPSIS: "...",
      NEXT: "Következő",
      NEXT_TOOLTIP: "Következő oldal",
      COUNT: "${0}-${1} / ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Oldal",
      SHOW: "Megjelenítés",
      ITEMS_PER_PAGE: " elem laponként.",
      DATE: {
        AM: "DE",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Ma ${time} időpontban",
            YESTERDAY: "Tegnap ${time} időpontban"
        },
        RELATIVE_TIME_L: { DAY: "${EEee}, ${time} időpontban",
            YEAR: "${date_short}, ${time} időpontban",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short}, ${time} időpontban",
            TODAY: "ma ${time} időpontban",
            YESTERDAY: "tegnap ${time} időpontban"
        },
        UPDATED: { DAY: "Frissítve: ${EEee} - ${time}",
            YEAR: "Frissítve: ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Frissítve: ${date_short}",
            TODAY: "Frissítve ma ${time} időpontban",
            YESTERDAY: "Frissítve tegnap ${time} időpontban"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "${0} verzió törlése",
         DOWNLOAD: "Letöltés",
         DOWNLOAD_TOOLTIP: "Verzió letöltése (${0})",
         VIEW: "Megtekintés",
         VIEW_TOOLTIP: "${0} verzió megtekintése",
         REVERT: {
            A11Y: "Ez a gomb egy párbeszédpanelt nyit meg, amely segítségével a felhasználó megerősítheti a fájl visszaállítását egy korábbi verzióból. A művelet megerősítése az oldal tartalmának frissítését eredményezi.",
            FULL: "Visszaállítás",
            WIDGET: "Ezen verzió visszaállítása"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "A verziót nem lehetett törölni, mert már törölték vagy már nem láthatja azt.",
         ERROR_ACCESS_DENIED: "A verziót nem lehetett törölni, mert nincs szerkesztő jogosultsága.",
         ERROR_TIMEOUT: "A verzió törlésére nem került sor, mert a kiszolgálóval nem lehetett felvenni a kapcsolatot.  Kattintson újból a 'Törlés' gombra a kérés újrapróbálásához.",
         ERROR_CANCEL: "A verzió törlésére nem került sor, mert a kérést visszavonták.  Kattintson újból a 'Törlés' gombra a kérés újrapróbálásához.",
         ERROR_NOT_LOGGED_IN: "Be kell jelentkeznie a verzió törléséhez.  A 'Törlés' gombra kattintva megjelenik a bejelentkezési ablak.",
         GENERIC_ERROR: "A verziót ismeretlen hiba miatt nem lehetett törölni.  Kattintson újból a 'Törlés' gombra a kérés újrapróbálásához.",
         FULL: "Törlés",
         A11Y: "Ez a gomb egy párbeszédpanelt nyit meg, amely lehetővé teszi a felhasználó számára a verzió törlésének megerősítését. A művelet megerősítése az oldal tartalmának frissítését eredményezi."
      },

      REVERT: {
         ERROR_NOT_FOUND: "A verziót nem lehetett visszaállítani, mert azt törölték vagy már nem láthatja.",
         ERROR_ACCESS_DENIED: "A verziót nem lehetett visszaállítani, mert Ön nem szerkesztő.",
         ERROR_NAME_EXISTS: "A változat nem állítható vissza, mert egy másik fájl is létezik az adott néven.",
         ERROR_TIMEOUT: "A változat nem állítható vissza, mivel a szerverrel nem sikerült felvenni a kapcsolatot.  Kattintson újból a 'Visszaállítás' gombra a kérés újrapróbálásához.",
         ERROR_CANCEL: "A verzió visszaállítására nem került sor, mert a kérést visszavonták.  Kattintson újból a 'Visszaállítás' gombra a kérés újrapróbálásához.",
         ERROR_QUOTA_VIOLATION: "A változat tárterület-megszorítások miatt nem állítható vissza.",
         ERROR_MAX_CONTENT_SIZE: "A verzió nem állítható vissza, mivel az meghaladja a megengedett legnagyobb fájlméretet (${0}).",
         GENERIC_ERROR: "A verziót ismeretlen hiba miatt nem lehetett visszaállítani.  Kattintson újból a 'Visszaállítás' gombra a kérés újrapróbálásához."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Megtekintheti, ki töltötte le...",
      PREVIOUS: "Előző",
      PREVIOUS_TOOLTIP: "Előző oldal",
      ELLIPSIS: "...",
      NEXT: "Következő",
      NEXT_TOOLTIP: "Következő oldal",
      COUNT: "${0}-${1} / ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Oldal",
      SHOW: "Megjelenítés",
      ITEMS_PER_PAGE: " elem laponként.",
      VERSION: {
         DAY: "${version} verzió, ${date}",
         MONTH: "${version} verzió, ${date}",
         TODAY: "${version} verzió, ${time} időpontban",
         YEAR: "${version} verzió, ${date}",
         YESTERDAY: "${version} verzió tegnap"
      },

      FILE: {
         V_LATEST: "Letöltötte ennek a fájlnak a legfrissebb változatát",
         V_OLDER: "Utoljára ennek a fájlnak a következő változatát töltötte le: ${0}",
         LOADING: "Betöltés...",
         EMPTY: "Csak névtelen felhasználók",
         ERROR: "nem lehet betölteni a letöltési információkat"
      }
   },

   EE_DIALOG: {
      ERROR: "Hiba",
      ERROR_ALT_TEXT: "Hiba:",
      ERROR_MSG_GENERIC: "Hiba történt.  Próbálkozzon újra.",
      ERROR_MSG_NOT_AVAILABLE: "Ezt az elemet törölték, vagy már nem érhető el.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Az elem tartalma nem érhető el.",
      ERROR_MSG_NO_ACCESS: "Már nincs hozzáférése ehhez az elemhez.",
      LOADING: "Betöltés...",
      TITLE_SU: "${author} üzenetet küldött.",
      TITLE_NI: "${author} meghívta, hogy csatlakozzon a hálózatához.",
      AUTHOR_TITLE: "${author} profiljának megtekintése",
      OPEN_LINK: "${title} megnyitása",
      CONFIRM_CLOSE_TITLE: "Megerősítés",
      CONFIRM_CLOSE_MESSAGE: "Biztosan eldobja a módosításokat? Kattintson az OK gombra a folytatáshoz vagy a Mégse gombra a visszalépéshez.",
      OK: "OK",
      CANCEL: "Mégse"
   },
   MESSAGE: {
      SUCCESS: "Megerősítés",
      ERROR: "Hiba",
      ERROR_ALT_TEXT: "Hiba:",
      INFO: "Információk",
      WARNING: "Figyelmeztetés",
      DISMISS: "Üzenet elrejtése",
      MORE_DETAILS: "További részletek",
      HIDE_DETAILS: "Részletek elrejtése"
   },
   statusUpdate: {
       createdCompact: {
           DAY: "Létrehozva: ${EEEE}, ${time} időpontban",
           MONTH: "Létrehozva: ${MMM} ${d}",
           TODAY: "Létrehozva: ma ${time} időpontban",
           YEAR: "Létrehozva: ${MMM} ${d}, ${YYYY}",
           YESTERDAY: "Létrehozva: tegnap ${time} időpontban",
           TOMORROW: "Létrehozva: ${MMM} ${d}, ${YYYY}"
       },
      error: "Hiba történt.  ${again}.",
      error_again: "Próbálkozzon újra",
      error_404: "Az állapotfrissítés már nem létezik.",
      notifications: {
         STATUS_UPDATE: "${user} üzenetet küldött",
         USER_BOARD_POST: "${user} írt az üzenőfalára",
         POST_COMMENT: "${user} írta:"
      }
   },
   login: {
      error: "A felhasználónév és/vagy jelszó nem felel meg semmilyen meglévő fióknak. Próbálkozzon újra.",
      logIn: "Bejelentkezés",
      password: "Jelszó:",
      user: "Felhasználónév:",
      welcome: "Bejelentkezés az HCL Connections alkalmazásba"
   },
   repost: {
      name: "Továbbküldés",
      title: "A frissítés továbbküldése a követőim és közösségek számára",
      msg_success: "A frissítést sikeresen továbbküldte a követői számára.",
      msg_generic: "Hiba történt.  Próbálkozzon újra."
   },
   FILE_SHARE_INFO: {
      ADD: "Hozzáadás",
      ADD_TXT: "Személyek vagy közösségek hozzáadása olvasóként",
      SHOW_MORE: "Részletek megjelenítése...",
      READER_IF_PUBLIC: "Mindenki (nyilvános)",
      READER_IF_PUBLIC_TOOLTIP: "Ez a fájl nyilvános és mindenki láthatja",
      EMPTY_READERS: "Nincs",
      READERS_LABEL: "Olvasók: ",
      EDITORS_LABEL: "Szerkesztők: ",
      OWNER_LABEL: "Tulajdonos: ",
      ERROR: "Nem lehet betölteni a megosztási információkat",
      ERROR_NOT_FOUND: "A kért fájlt törölték vagy eltávolították. Ha ezt a hivatkozást valakitől kapta, akkor ellenőrizze, hogy az helyes-e.",
      ERROR_ACCESS_DENIED: "Nincs jogosultsága a fájl megtekintésére.  A fájl nem nyilvános és azt nem osztották meg.",
      SHARE: "Megosztás",
      CANCEL: "Mégse",
      SHARE_WITH: "Megosztás ezzel:",
      PERSON: "személy",
      COMMUNITY: "közösség",
      PLACEHOLDER: "Személy neve vagy e-mail címe...",
      MESSAGE: "Üzenet:",
      MESSAGE_TXT: "Igény esetén adjon hozzá egy üzenetet",
      REMOVE_ITEM_ALT: "${0} eltávolítása",
      NO_MEMBERS: "Nincs",
      A11Y_READER_ADDED: "${0} kiválasztva olvasóként",
      A11Y_READER_REMOVED: "${0} eltávolítva olvasóként",
      SELF_REFERENCE_ERROR: "Nem oszthat meg saját magával.",
      OWNER_REFERENCE_ERROR: "A fájlt a tulajdonosával nem oszthatja meg.",
      SHARE_COMMUNITY_WARN: "Ha megosztja a(z) '${0}' nyilvános közösséggel, akkor a fájl nyilvános lesz.",
      SELECT_USER_ERROR: "Legalább egy személyt vagy közösséget ki kell választania, akivel meg kívánja osztani",
      WARN_LONG_MESSAGE: "Az üzenet túl hosszú.",
      TRIM_LONG_MESSAGE: "Lerövidíti az üzenetet?",
      ERROR_SHARING: "A fájl sikerült megosztani.  Próbálkozzon újra később.",
      INFO_SUCCESS: "A fájl megosztása sikeres volt.",
      MAX_SHARES_ERROR: "Túllépte a megosztások maximális számát.",
      NOT_LOGGED_IN_ERROR: "A fájl nem került megosztásra, mivel nincs bejelentkezve.  A fájl megosztásához kattintson a 'Megosztás' gombra.",
      TIMEOUT_ERROR: "A fájl nem került megosztásra, mivel a kiszolgálóhoz nem sikerült csatlakozni.  A 'Megosztás' gombra kattintva próbálkozzon újra.",
      CANCEL_ERROR: "A fájl nem került megosztásra, mivel a kérelmet visszavonták.  A 'Megosztás' gombra kattintva próbálkozzon újra.",
      NOT_FOUND_ERROR: "A fájl nem osztható meg, mivel már törlésre került, vagy már nem látható az Ön számára.",
      ACCESS_DENIED_ERROR: "Már nincs engedélye megosztani a fájlt.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "A zárt fájlt nem lehet nyilvánossá tenni.",
      TOOLTIP: "Hozzáférés megadása a fájlhoz mások számára"
   },
   HISTORY: {
      TAB_TITLE: "Legutóbbi frissítések",
      NO_HISTORY: "Nincsenek új frissítések.",
      EMPTY: "Nem lehetett beolvasni az elem legújabb frissítéseit. Azt törölték vagy már nincs hozzáférése hozzá.",
      MORE: "Előző frissítések megjelenítése",
      ERROR_ALT: "Hiba",
      ERROR: "Hiba történt a frissítések beolvasása során. ${again}",
      ERROR_ADDTL: "Hiba történt a további frissítések beolvasása során. ${again}",
      ERROR_AGAIN: "Próbálkozzon újra.",
      ERROR_AGAIN_TITLE: "További frissítésekhez próbálkozzon újra a kéréssel.",
      PROFILE_TITLE: "${user} profiljának megnyitása.",
      SORT_BY: "Rendezés alapja\\:",
      SORTS: {
         DATE: "Dátum",
         DATE_TOOLTIP: "Rendezés a legújabb előzménytől a legrégebbi frissítésig",
         DATE_TOOLTIP_REVERSE: "Rendezés a legrégebbi előzménytől a legújabb frissítésig"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE}, ${time} időpontban",
             MONTH: "${MMM} ${d}",
             TODAY: "Ma ${time} időpontban",
             YEAR: "${MMM} ${d}, ${YYYY}",
             YESTERDAY: "Tegnap ${time} időpontban",
             TOMORROW: "${MMM} ${d}, ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Ez a megjegyzés",
	   REPLY_ACTION: "Válasz",
       REPLY_ACTION_TOOLTIP: "Válasz a megjegyzésre"
   },
   OAUTH: {
      welcomeHeader: "Üdvözli a Connections alkalmazás",
      continueBtnLabel: "Folytatás",
      continueBtnA11y: "A hivatkozás aktiválásával megnyílik egy új ablak, amelyben engedélyezheti a hozzáférést a Connections programhoz.",
      clickHere: "Kattintson ide",
      infoMsg: "A Connections alkalmazás felhatalmazást igényel az adatai eléréséhez.",
      authorizeGadget: "${clickHere}, hogy engedélyezze az alkalmazás számára a Connections információk elérését.",
      confirmAuthorization: "${clickHere}, hogy megerősítse az alkalmazás felhatalmazását a Connections információk elérésére."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "A hivatkozás aktiválásával megnyílik egy új ablak, amelyben engedélyezheti a hozzáférést a Connections Könyvtár lerakathoz.",
      infoMsg: "A Connections Könyvtár lerakat felhatalmazást igényel az adatai eléréséhez.",
      authorizeGadget: "${clickHere}, hogy engedélyezze az alkalmazás számára a Connections Könyvtár lerakat információinak elérését.",
      confirmAuthorization: "${clickHere}, hogy megerősítse az alkalmazás felhatalmazását a Connections Könyvtár lerakat információinak eléréséhez."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Mégse",
      CONFIRM: "Biztosan eldobja a módosításokat?  Kattintson az OK gombra a folytatáshoz vagy a Mégse gombra a visszalépéshez.",
      DIALOG_TITLE: "Megerősítés",
      NAME: "Megerősítés",
      OK: "OK",
      TOOLTIP: "Megerősítés"
   }
})
