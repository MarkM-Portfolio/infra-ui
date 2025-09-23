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
		         label: "Več",
		         tooltip: "Več dejanj"
		       },
		       tags_more: "in ${0} več",
		       ERROR_ALT: "Napaka",
		       PERSON_TITLE: "Odprite profil osebe ${user}.",
		       inactiveUser: "${user} (neaktiven)",
		       inactiveIndicator: "(neaktivno)",
		       like_error: "Vaše všečnosti ni bilo mogoče shraniti. Poskusite znova pozneje.",
		       vote_error: "Vašega glasu ni bilo mogoče shraniti. Poskusite znova pozneje."
		   },
		   generic: {
		      untitled: "(Brez naslova)",
		      tags: "Oznake:",
		      tags_more: "in ${0} več",
		      likes: "Všečnosti",
		      comments: "Komentarji",
		      titleTooltip: "Pomik na ${app}",
		      error: "Podatkov ni mogoče najti.",
		      timestamp: {
		         created: {
		            DAY: "Ustvarjeno ${EEEE} ob ${time}",
		            MONTH: "Ustvarjeno ${MMM} ${d}",
		            TODAY: "Ustvarjeno danes ob ${time}",
		            YEAR: "Ustvarjeno ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ustvarjeno včeraj ob ${time}",
		            TOMORROW: "Ustvarjeno ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Posodobljeno ${EEEE} ob ${time}",
		            MONTH: "Posodobljeno ${MMM} ${d}",
		            TODAY: "Posodobljeno danes ob ${time}",
		            YEAR: "Posodobljeno ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Posodobljeno včeraj ob ${time}",
		            TOMORROW: "Posodobljeno ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Javno",
		         priv: "Zasebno"
		      },
		      action: {
		         created: "Ustvarjeno",
		         updated: "Posodobljeno"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Prejemajte posodobitve o osebah, ki jih spremljate, na domači strani in v e-poštnem povzetku.",
		      profile_title: "Odprite profil osebe ${user}.",
		      profile_a11y: "Če aktivirate to povezavo, boste odprli profil osebe ${user} v novem oknu.",
		      error: "Prišlo je do napake.  ${again}.",
		      error_again: "Poskusite znova.",
		      error_404: "Omrežna zahteva ne obstaja več.",
		      warning: "Opozorilo",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Nimate omrežnih stikov.",
		            	follow: "Sedaj imate omrežne stike in spremljate osebo ${user}."
		            },
		            ignore: {
		            	nofollow: "To vabilo ste prezrli.",
		            	follow: "Vabilo ste prezrli, vendar sedaj spremljate osebo ${user}."
		            }
		         },
		         error: {
		            accept: "Pri sprejemanju zahteve je prišlo do napake.",
		            ignore: "Pri prezrtju zahteve je prišlo do napake."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} ob ${time}",
		              MONTH: "${d} ${MMM}",
		              TODAY: "Danes ob ${time}",
		              YEAR: "${d} ${MMM} ${YYYY}",
		              YESTERDAY: "Včeraj ob ${time}",
		              TOMORROW: "${d} ${MMM} ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Če aktivirate to povezavo, boste odprli ${name} v novem oknu.",
		      tooltip: "Odpiranje ${name} v aplikaciji datoteke",
		      profile_title: "Odprite profil osebe ${user}.",
		      profile_a11y: "Če aktivirate to povezavo, boste odprli profil osebe ${user} v novem oknu.",
		      download_tooltip: "Prenesi to datoteko (${0})",
		      following: {
		         add: "Spremljaj datoteko",
		         remove: "Prenehaj spremljati",
		         title: "Preklopi nastavitev za prejemanje posodobitev o tej datoteki"
		      },
		      share: {
		         label: "Daj v skupno rabo",
		         title: "Drugim dodeli dostop do te datoteke"
		      },
		      timestamp: {
		         created: {
		            DAY: "Ustvarjeno ${EEEE} ob ${time}",
		            MONTH: "Ustvarjeno ${MMM} ${d}",
		            TODAY: "Ustvarjeno danes ob ${time}",
		            YEAR: "Ustvarjeno ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ustvarjeno včeraj ob ${time}",
		            TOMORROW: "Ustvarjeno ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "Ustvarila ${user} oseba ${EEEE} ob ${time}",
		            MONTH: "Ustvarila oseba ${user}, ${MMM} ${d}",
		            TODAY: "Ustvarila oseba ${user} danes ob ${time}",
		            YEAR: "Ustvarila oseba ${user}, ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Ustvarila oseba ${user} včeraj ob ${time}",
		            TOMORROW: "Ustvarila oseba ${user}, ${MMM} ${d} ${YYYY}"
		         },
		         updated: {
		            DAY: "Posodobljeno ${EEEE} ob ${time}",
		            MONTH: "Posodobljeno ${MMM} ${d}",
		            TODAY: "Posodobljeno danes ob ${time}",
		            YEAR: "Posodobljeno ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Posodobljeno včeraj ob ${time}",
		            TOMORROW: "Posodobljeno ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "Posodobila oseba ${user} ${EEEE} ob ${time}",
		            MONTH: "Posodobila oseba ${user}, ${MMM} ${d}",
		            TODAY: "Posodobila oseba ${user} danes ob ${time}",
		            YEAR: "Posodobila oseba ${user}, ${MMM} ${d} ${YYYY}",
		            YESTERDAY: "Posodobila oseba ${user} včeraj ob ${time}",
		            TOMORROW: "Posodobila oseba ${user}, ${MMM} ${d} ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Ustvarjeno: ${EEEE} ob ${time}",
		            MONTH: "Ustvarjeno: ${MMM} ${d}",
		            TODAY: "Ustvarjeno: danes ob ${time}",
		            YEAR: "Ustvarjeno: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ustvarjeno: včeraj ob ${time}",
		            TOMORROW: "Ustvarjeno: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Posodobljeno: ${EEEE} ob ${time}",
		            MONTH: "Posodobljeno: ${MMM} ${d}",
		            TODAY: "Posodobljeno: danes ob ${time}",
		            YEAR: "Posodobljeno: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Posodobljeno: včeraj ob ${time}",
		            TOMORROW: "Posodobljeno: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long}, ${time_long}, izvedla oseba ${user}",
		         UPDATE_TIMESTAMP: "${date_long}, ${time_long}, izvedla oseba ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long}, ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Prenesi to datoteko (${size})",
		      	 DOWNLOAD_ALT: "Prenesi"
		      },
		      PREVIEW: {
		         LINK: "Predogled",
		         TITLE: "Pokaži predogled te datoteke v novem oknu"
		      },
		      TAGS: "Oznake:",
		      error: "Prišlo je do napake.  ${again}.",
		      error_again: "Poskusite znova.",
		      error_404: "Datoteka ne obstaja več ali nimate zadostnih dovoljenj za dostopanje.",
		      error_403: "Za ogled te datoteke nimate dovoljenja. Ta datoteka ni javna in ni v skupni rabi z vami.",
		      notifications: {
		         USER_SHARED: "Oseba ${user} je zapisala:",
		         CHANGE_SUMMARY: "Oseba ${user} je podala povzetek sprememb",
		         NO_CHANGE_SUMMARY: "Oseba ${user} ni podala povzetka sprememb",
		         COMMENTED: "Oseba ${user} je komentirala"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Odjavili ste vi",
		      checkedout_other: "Odjavila je oseba ${user}",
		      tooltip: "Odpri datoteko ${name} v knjižnici",
		      draft_404_info: "Osnutek je bil izbrisan ali pa ni več v skupni rabi z vami. Objavljena različica je zdaj najnovejša različica te datoteke.",
		      error_404: "Datoteka je bila izbrisana ali pa ni več v skupni rabi z vami.",
		      error_403: "Datoteka je bila izbrisana ali pa ni več v skupni rabi z vami.",
		      error_preview: "Datoteka ni več na voljo za predogled.",
		      draft_review_canceled: "Pregled je bil preklican in osnutek ni več v skupni rabi z vami. Vaš pregled ni več zahtevan.",
		      switch_ee: "Pokaži osnutek",
		      switch_ee_tooltip: "Pokaži najnovejši osnutek za to datoteko"
		   },
		   ecm_draft: {
		      tooltip: "Odpri osnutek ${name} v knjižnici",
		      community_owners: "Lastniki skupnosti",
		      draft: "Osnutek",
		      draft_tooltip: "Ogledovanje osnutka",
		      draft_general_info: "Predhodni osnutek ne obstaja več, novejši osnutek pa je zdaj najnovejša različica.",
		      draft_review_404_general_info: "Eden od pregledovalcev je že glasoval. Vaš pregled tega osnutka ni več zahtevan.",
		      draft_review_404_request_info: "Predhodni osnutek ne obstaja več, najnovejši osnutek pa je bil predložen v pregled. Vaš pregled je zahtevan.",
		      draft_review_404_require_info: "Predhodni osnutek ne obstaja več, najnovejši osnutek pa je bil predložen v pregled. Vaš pregled je obvezen.",
		      draft_review_request_info: "Vaš pregled je zahtevan.",
		      draft_review_require_info: "Vaš pregled je obvezen.",
		      error_404: "Osnutek je bil izbrisan ali pa ni več v skupni rabi z vami.",
		      error_403: "Tega osnutka si ne morete ogledati, ker ni v skupni rabi z vami.",
		      error_preview: "Osnutek ni več na voljo za predogled.",
		      switch_ee: "Ogled objavljene različice",
		      switch_ee_tooltip: "Oglejte si objavljeno različico te datoteke",
		      review: "Pregled",
		      reviewers: "Pregledovalci",
		      reviwers_addtl: "Dodatni pregledovalci",
		      in_review: "Osnutek v pregledu",
		      in_review_tooltip: "Ogledovanje osnutka v pregledu",
		      review_required_any: "Lastniki skupnosti zahtevajo, da eden od pregledovalcev pregleda ta osnutek.",
		      review_required_all: "Lastniki skupnosti zahtevajo, da vsi pregledovalci pregledajo ta osnutek.",
		      review_required_generic: "Lastniki skupnosti zahtevajo, da ti pregledovalci pregledajo ta osnutek.",
		      review_additional_required: "Vsi pregledovalci, ki jih je dodal predložitelj, morajo pregledati ta osnutek.",
		      reivew_submitted_date: {
		         DAY: "Oseba ${user} je predložila osnutek v pregled dne ${EEEE} ob ${time}.",
		         MONTH: "Oseba ${user} je predložila osnutek v pregled ${d} ${MMM} .",
		         TODAY: "Oseba ${user} je predložila osnutek v pregled danes ob ${time}.",
		         YEAR: "Oseba ${user} je predložila osnutek v pregled ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Oseba ${user} je predložila osnutek v pregled včeraj ob ${time}.",
		         TOMORROW: "Oseba ${user} je predložila osnutek v pregled ${d} ${MMM} ${YYYY}."
		      },
		      pending: "V teku",
		      pending_rejected: "Pregled ni več potreben, ker je bil osnutek zavrnjen",
		      approve: "Odobri",
		      approved: "Odobreno",
		      approve_tooltip: "Odobri ta osnutek",
		      accept_success: "Ta osnutek ste odobrili.",
		      accept_error: "Pri odobritvi tega osnutka je prišlo do napake. Poskusite znova.",
		      accept_info: "Ta osnutek ste odobrili.",
		      reject: "Zavrni",
		      rejected: "Zavrnjeno",
		      reject_tooltip: "Zavrnite ta osnutek",
		      reject_success: "Ta osnutek ste zavrnili.",
		      reject_error: "Pri zavračanju tega osnutka je prišlo do napake. Poskusite znova.",
		      reject_info: "Ta osnutek ste zavrnili."
		   },
		   authUser: {
		      error: "Med pridobivanjem trenutnega uporabnika je prišlo do napake.  ${again}.",
		      error_again: "Poskusite znova.",
		      error_404: "Overjenega uporabnika ni mogoče najti.",
		      error_403: "Nimate dovoljenja za pridobitev informacij o uporabniku."
		   },
		   forum: {
		      error: "Prišlo je do napake.  ${again}.",
		      error_again: "Poskusite znova.",
		      error_404: "Forum ne obstaja več ali nimate zadostnih dovoljenj za dostopanje do njega.",
		      error_403: "Nimate dovoljenja za ogled tega foruma. Forum ni javen in ni v skupni rabi z vami.",
		      readMore: "Pokaži celotno temo ...",
		      readMore_tooltip: "Odpri temo na forumu ${name}.",
		      readMore_a11y: "Če aktivirate to povezavo, boste odprli temo na forumu ${name} v novem oknu.",
		      QUESTION_ANSWERED: "To vprašanje je bilo odgovorjeno.",
		      QUESTION_NOT_ANSWERED: "To vprašanje še ni bilo odgovorjeno.",
		      attachments: "Število prilog: ${count}",
		      attachments_one: "${count} priloga"
		   },
		   blog: {
		      error: "Prišlo je do napake.  ${again}.",
		      error_again: "Poskusite znova.",
		      error_404: "Blog ne obstaja več ali nimate zadostnih dovoljenj za dostopanje.",
		      error_403: "Za ogled tega bloga nimate dovoljenja. Blog ni javen in ni v skupni rabi z vami.",
		      readMore: " Preberite več ...",
		      readMore_tooltip: "Odpri vnos v blog ${name}.",
		      readMore_a11y: "Če aktivirate to povezavo, boste odprli vnos v blog ${name} v novem oknu.",
		      graduated: "Odlikovana",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Glasuj</a>",
		  					TOOLTIP: 	"Glasujte za to"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Glasovano</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Glasovano</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Razveljavi</a>",
		  					TOOLTIP: 	"Odstranite svoj glas za to"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"Nihče ni glasoval za to"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 oseba je glasovala za to"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} je glasovalo za to"
		  				}
		  			},
		  			LOADING: "Nalaganje ...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Glasovano"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Vašega glasu nismo mogli shraniti, ker ste dosegli omejitev glasovanja ali pa ideja ni več na voljo.",
		      readMore_tooltip: "Odpri idejo ${name}.",
		      readMore_a11y: "Če aktivirate to povezavo, boste odprli idejo ${name} v novem oknu."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} kB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Odgovori",
		      THIS_ARIA_LABEL: "Ta odgovor",
		      THIS_TAB_TITLE: "Ta odgovor",
		      TAB_TITLE: "Odgovori (${0})",
		      REPLY_TO_REPLY: "Odgovor na ${thisReply}",
		      REPLY_TO_TOPIC: "Odgovor na ${thisTopic}",
		      THIS_TOPIC: "to temo",
		      THIS_REPLY: "ta odgovor",
		      NAVIGATE_TO_REPLY: "Pomakni se na nadrejeni odgovor",
		      NAVIGATE_TO_TOPIC: "Pomakni se na nadrejeno temo",
		      ADD_COMMENT: "Odgovori na to temo",
		      ADD_COMMENT_TOOLTIP: "Odgovorite na to temo na forumu",
		      SHOWING_RECENT_REPLIES: "Prikaz ${0} najnovejših odgovorov",
		      PREV_COMMENTS: "Pokaži več odgovorov",
		      PLACEHOLDER_TXT: "Odgovori na to temo",
		      EMPTY: "Ni odgovorov.",
		      TRIM_LONG_COMMENT: "Ali želite skrajšati odgovor?",
		      WARN_LONG_COMMENT: "Odgovor je predolg.  ${shorten}",
		      ERROR: "Med pridobivanjem odgovorov je prišlo do napake. ${again}",
		      ERROR_CREATE: "Odgovora ni bilo mogoče shraniti.  Poskusite znova pozneje.",
		      ERROR_CREATE_NOT_FOUND: "Odgovora ni bilo mogoče shraniti, ker je bila tema izbrisana ali ni več vidna.",
		      ERROR_CREATE_ACCESS_DENIED: "Odgovora ni bilo mogoče shraniti, ker je bila tema izbrisana ali ni več vidna.",
		      ERROR_CREATE_TIMEOUT: "Odgovora ni bilo mogoče shraniti, ker ni bilo mogoče vzpostaviti povezave s strežnikom.  Kliknite 'Shrani', da poskusite znova.",
		      ERROR_CREATE_CANCEL: "Odgovora ni bilo mogoče shraniti, ker je bila zahteva preklicana.  Kliknite 'Shrani', da poskusite znova.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Za ustvarjanje tega odgovora morate biti prijavljeni.  Kliknite 'Shrani', da se prikaže poziv za prijavo.",
		      ERROR_NO_CONTENT: "Vnesite odgovor in kliknite 'Shrani'.  Če odgovora ne želite pustiti, kliknite 'Prekliči'.",
		      ERROR_UNAUTHORIZED: "Vašega odgovora ni bilo mogoče shraniti, ker nimate pooblastila za objavljanje odgovorov.",
		      COMMENT_DELETED: {
		         DAY: "Odgovor je izbrisala oseba ${user}, ${EEEE} ob ${time}",
		         MONTH: "Odgovor je izbrisala oseba ${user}, ${MMM} ${d}",
		         TODAY: "Odgovor je izbrisala oseba ${user} danes ob ${time}",
		         YEAR: "Odgovor je izbrisala oseba ${user}, ${MMM} ${d} ${YYYY}",
		         YESTERDAY: "Odgovor je izbrisala oseba ${user} včeraj ob ${time}",
		         TOMORROW: "Odgovor je izbrisala oseba ${user}, ${MMM} ${d} ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Razlog za izbris: ${reason}",
		      REPLY_TITLE: "Odg: ${0}",
		      SHOW_FULL_REPLY: "Pokaži celoten odgovor",
		      SHOW_FULL_REPLY_TOOLTIP: "Pomik na izvirni odgovor v tej temi na forumu",
		      REPLY_ACTION: "Odgovori",
		      REPLY_ACTION_TOOLTIP: "Odgovori na to objavo",
		      MODERATION_PENDING: "Ta odgovor čaka na pregled.",
		      MODERATION_QUARANTINED: "Moderator je objavo premaknil v karanteno.",
		      MODERATION_REMOVED: {
		         DAY: "Ta odgovor je odstranila oseba ${user}, ${EEEE} ob ${time}.",
		         MONTH: "Ta odgovor je odstranila oseba ${user}, ${MMM} ${d}.",
		         TODAY: "Ta odgovor je odstranila oseba ${user} danes ob ${time}.",
		         YEAR: "Ta odgovor je odstranila oseba ${user}, ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Ta odgovor je odstranila oseba ${user} včeraj ob ${time}.",
		         TOMORROW: "Ta odgovor je odstranila oseba ${user}, ${MMM} ${d} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Ta odgovor je zavrnila oseba ${user}, ${EEEE} ob ${time}.",
		         MONTH: "Ta odgovor je zavrnila oseba ${user}, ${MMM} ${d}.",
		         TODAY: "Ta odgovor je zavrnila oseba ${user} danes ob ${time}.",
		         YEAR: "Ta odgovor je zavrnila oseba ${user}, ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Ta odgovor je zavrnila oseba ${user} včeraj ob ${time}.",
		         TOMORROW: "Ta odgovor je zavrnila oseba ${user}, ${MMM} ${d} ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Vaš odgovor je bil predložen v pregled in bo na voljo po odobritvi."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Komentarji",
		      PLACEHOLDER_TXT: "Dodaj komentar",
		      TAB_TITLE: "Komentarji (${0})",
		      ACTION_NOT_SUPPORTED: "Nepodprto dejanje",
		      ADD_COMMENT: "Dodaj komentar",
		      ADD_COMMENT_TOOLTIP: "Dodajte komentar na to postavko",
		      CANCEL: "Prekliči",
		      COMMENT_COUNT_ONE: "${0} komentar",
		      COMMENT_COUNT_MANY: "Št. komentarjev: ${0}",
		      COMMENT_LABEL: "Komentar:",
		      DELETE: "Izbriši",
		      DELETE_TOOLTIP: "Izbriši komentar",
		      DELETEREASON: "Razlog za izbris tega komentarja:",
		      DIALOG_TITLE: "Skrajšaj komentar",
		      TOOLTIP: "Skrajšaj komentar",
		      NAME: "Skrajšaj komentar",
		      EDIT: "Urejanje",
		      EDIT_TOOLTIP: "Urejanje komentarja",
		      ERROR_CREATE: "Vašega komentarja ni bilo mogoče shraniti.  Poskusite znova pozneje.",
		      ERROR_CREATE_NOT_FOUND: "Vašega komentarja ni bilo mogoče shraniti, ker je bila postavka izbrisana ali ni več vidna.",
		      ERROR_CREATE_ACCESS_DENIED: "Vašega komentarja ni bilo mogoče shraniti, ker je bila postavka izbrisana ali ni več vidna.",
		      ERROR_CREATE_TIMEOUT: "Vašega komentarja ni bilo mogoče shraniti, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Kliknite 'Objavi', da poskusite znova.",
		      ERROR_CREATE_CANCEL: "Vašega komentarja ni bilo mogoče shraniti, ker je bila zahteva preklicana.  Kliknite 'Objavi', da poskusite znova.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Če želite ustvariti komentar, morate biti prijavljeni.  Kliknite 'Objavi', da se prikaže poziv za prijavo.",
		      ERROR_DELETE: "Vašega komentarja ni bilo mogoče izbrisati.  Poskusite znova pozneje.",
		      ERROR_DELETE_TIMEOUT: "Vašega komentarja ni bilo mogoče izbrisati, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Kliknite 'Izbriši', da poskusite znova.",
		      ERROR_DELETE_NOT_FOUND: "Vašega komentarja ni bilo mogoče izbrisati, ker je bil komentar ali postavka izbrisana ali ni več vidna.",
		      ERROR_DELETE_ACCESS_DENIED: "Vašega komentarja ni bilo mogoče izbrisati, ker je bila postavka izbrisana ali ni več vidna.",
		      ERROR_DELETE_CANCEL: "Vašega komentarja ni bilo mogoče izbrisati, ker je bila zahteva preklicana.  Kliknite 'Izbriši', da poskusite znova.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Če želite izbrisati komentar, morate biti prijavljeni.  Kliknite 'Izbriši', da se prikaže poziv za prijavo.",
		      ERROR_EDIT: "Vašega komentarja ni bilo mogoče posodobiti.  Poskusite znova pozneje.",
		      ERROR_EDIT_ACCESS_DENIED: "Vašega komentarja ni bilo mogoče posodobiti, ker je bila postavka izbrisana ali ni več vidna.",
		      ERROR_EDIT_NOT_FOUND: "Vašega komentarja ni bilo mogoče posodobiti, ker je bila postavka izbrisana ali ni več vidna.",
		      ERROR_EDIT_TIMEOUT: "Vašega komentarja ni bilo mogoče posodobiti, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Kliknite 'Objavi', da poskusite znova.",
		      ERROR_EDIT_CANCEL: "Vašega komentarja ni bilo mogoče posodobiti, ker je bila zahteva preklicana.  Kliknite 'Objavi', da poskusite znova.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Če želite urejati komentar, morate biti prijavljeni.  Kliknite 'Objavi', da se prikaže poziv za prijavo.",
		      ERROR_NO_CONTENT: "Vnesite komentar in kliknite 'Objavi'.  Če komentarja ne želite pustiti, kliknite 'Prekliči'.",
		      ERROR_NO_CONTENT_EDIT: "Vnesite komentar in kliknite 'Objavi'.  Če komentarja ne želite urejati, kliknite 'Prekliči'.",
		      ERROR_UNAUTHORIZED: "Vašega komentarja ni bilo mogoče shraniti, ker nimate pooblastila za objavljanje komentarjev.",
		      ERROR_GENERAL: "Prišlo je do napake.",
		      OK: "V redu",
		      YES: "Da",
		      TRIM_LONG_COMMENT: "Ali želite skrajšati ta komentar?",
		      WARN_LONG_COMMENT: "Komentar je predolg.  ${shorten}",
		      LINK: "Povezava",
		      SAVE: "Shrani",
		      POST: "Objavi",
		      SHOWMORE: "Preberite več ...",
		      VIEW_COMMENTS_FILE: "Ogled komentarjev na to datoteko",
		      SUBSCRIBE_TO_COMMENTS: "Naroči me na te komentarje",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Spremljajte spremembe v teh komentarjih prek bralnika virov",
		      PROFILE_TITLE: "Odprite profil osebe ${user}.",
		      PROFILE_A11Y: "Če aktivirate to povezavo, boste odprli profil osebe ${user} v novem oknu.",
		      MODERATION_PENDING: "Ta komentar čaka na pregled.",
		      MODERATION_REMOVED: {
		         DAY: "Ta komentar je odstranila oseba ${user}, ${EEEE} ob ${time}.",
		         MONTH: "Ta komentar je odstranila oseba ${user}, ${MMM} ${d}.",
		         TODAY: "Ta komentar je odstranila oseba ${user} danes ob ${time}.",
		         YEAR: "Ta komentar je odstranila oseba ${user}, ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Ta komentar je odstranila oseba ${user} včeraj ob ${time}.",
		         TOMORROW: "Ta komentar je odstranila oseba ${user}, ${MMM} ${d} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Ta komentar je zavrnila oseba ${user}, ${EEEE} ob ${time}.",
		         MONTH: "Ta komentar je zavrnila oseba ${user}, ${MMM} ${d}.",
		         TODAY: "Ta komentar je zavrnila oseba ${user} danes ob ${time}.",
		         YEAR: "Ta komentar je zavrnila oseba ${user}, ${MMM} ${d} ${YYYY}.",
		         YESTERDAY: "Ta komentar je zavrnila oseba ${user} včeraj ob ${time}.",
		         TOMORROW: "Ta komentar je zavrnila oseba ${user}, ${MMM} ${d} ${YYYY}."
		      },
		      PREV_COMMENTS: "Pokaži prejšnje komentarje",
		      EMPTY: "Ni komentarjev.",
		      ERROR_ALT: "Napaka",
		      ERROR: "Med pridobivanjem komentarjev je prišlo do napake. ${again}",
		      ERROR_ADDTL: "Med pridobivanjem dodatnih komentarjev je prišlo do napake. ${again}",
		      ERROR_AGAIN: "Poskusite znova.",
		      ERROR_AGAIN_TITLE: "Ponovite zahtevo za več komentarjev.",
		      COMMENT_CREATED: {
		         DAY: "Oseba ${user}, ${EEEE} ob ${time} (različica ${version})",
		         MONTH: "Oseba ${user}, ${MMM} ${d} (različica ${version})",
		         TODAY: "Oseba ${user} danes ob ${time} (različica ${version})",
		         YEAR: "Oseba ${user}, ${MMM} ${d} ${YYYY} (različica ${version})",
		         YESTERDAY: "Oseba ${user} včeraj ob ${time} (različica ${version})",
		         TOMORROW: "Oseba ${user}, ${MMM} ${d} ${YYYY} (različica ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "Oseba ${user}, ${EEEE} ob ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "Oseba ${user} danes ob ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Oseba ${user} včeraj ob ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} ob ${time}",
		         MONTH: "${d} ${MMM}",
		         TODAY: "Danes ob ${time}",
		         YEAR: "${d} ${MMM} ${YYYY}",
		         YESTERDAY: "Včeraj ob ${time}",
		         TOMORROW: "${d} ${MMM} ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Oseba ${user} je izbrisala komentar, ${EEEE} ob ${time}",
		         MONTH: "Oseba ${user} je izbrisala komentar, ${MMM} ${d}",
		         TODAY: "Oseba ${user} je izbrisala komentar danes ob ${time}",
		         YEAR: "Oseba ${user} je izbrisala komentar, ${MMM} ${d} ${YYYY}",
		         YESTERDAY: "Oseba ${user} je izbrisala komentar včeraj ob ${time}",
		         TOMORROW: "Oseba ${user} je izbrisala komentar, ${MMM} ${d} ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "Oseba ${user} je uredila ${EEEE} ob ${time} (različica ${version})",
		         MONTH: "Oseba ${user} je uredila ${MMM} ${d} (različica ${version})",
		         TODAY: "Oseba ${user} je uredila danes ob ${time} (različica ${version})",
		         YEAR: "Oseba ${user} je uredila ${MMM} ${d}, ${YYYY} (različica ${version})",
		         YESTERDAY: "Oseba ${user} je uredila včeraj ob ${time} (različica ${version})",
		         TOMORROW: "Oseba ${user} je uredila ${MMM} ${d}, ${YYYY} (različica ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "Oseba ${user} je uredila ${EEEE} ob ${time}",
		         MONTH: "Oseba ${user} je uredila ${MMM} ${d}",
		         TODAY: "Oseba ${user} je uredila danes ob ${time}",
		         YEAR: "Oseba ${user} je uredila ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Oseba ${user} je uredila včeraj ob ${time}",
		         TOMORROW: "Oseba ${user} je uredila ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Ali ste prepričani, da želite izbrisati ta komentar?",
		      FLAG_ITEM: {
		         BUSY: "Shranjevanje ...",
		         CANCEL: "Prekliči",
		         ACTION: "Označi z zastavico kot neprimerno",
		         DESCRIPTION_LABEL: "Podajte razlog za označitev te postavke z zastavico (izbirno)",
		         EDITERROR: "Metapodatki datoteke niso bili urejeni zaradi napake",
		         OK: "Shrani",
		         ERROR_SAVING: "Pri obdelavi te zahteve je prišlo do napake. Poskusite znova pozneje.",
		         SUCCESS_SAVING: "Vaša oznaka je bila predložena. Moderator jo bo v kratkem pregledal.",
		         TITLE: "Označite to postavko z zastavico kot neprimerno",
		         COMMENT: {
		            TITLE: "Označite ta komentar z zastavico kot neprimernega",
		            A11Y: "S tem gumbom se odpre pogovorno okno, ki omogoča uporabniku označevanje komentarja z zastavico kot neprimernega."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Prekliči",
		      DIALOG_TITLE: "Izbriši komentar",
		      NAME: "Izbriši komentar",
		      OK: "V redu",
		      TOOLTIP: "Izbriši komentar"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Prekliči",
		      CONFIRM: "Če skrajšate besedilo, boste s tem odstranili besedilo zunaj omejitve komentarjev.  Kliknite 'V redu', da skrajšate besedilo, ali 'Prekliči', če želite sami urediti komentar.",
		      DIALOG_TITLE: "Skrajšaj komentar",
		      NAME: "Skrajšaj komentar",
		      OK: "V redu",
		      TOOLTIP: "Skrajšaj komentar"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Potrditev predložitve",
		      CONFIRM: "Vaš komentar je bil predložen v pregled in bo na voljo po odobritvi.",
		      OK: "V redu"
		   },
		   DATE: {
		      AM: "dop.",
		      FULL: "${EEEE}, ${date_long}, ${time_long}",
		      PM: "pop.",
		      TODAY: "danes",
		      TODAY_U: "Danes",
		      YESTERDAY: "včeraj",
		      YESTERDAY_U: "Včeraj",
		      ADDED: { DAY: "Dodano ${EEee} ob ${time}",
		         FULL: "${EEEE}, ${date_long}, ${time_long}",
		         MONTH: "Dodano ${date_long}",
		         TODAY: "Dodano danes ob ${time}",
		         YEAR: "Dodano ${date_long}",
		         YESTERDAY: "Dodano včeraj ob ${time}"
		      },
		      LAST_UPDATED: { DAY: "Zadnja posodobitev ${EEee} ob ${time}",
		         FULL: "${EEEE}, ${date_long}, ${time_long}",
		         MONTH: "Zadnja posodobitev ${date_long}",
		         TODAY: "Zadnja posodobitev danes ob ${time}",
		         YEAR: "Zadnja posodobitev ${date_long}",
		         YESTERDAY: "Zadnja posodobitev včeraj ob ${time}"
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
		         7: "AVG",
		         8: "SEP",
		         9: "OKT"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long}, ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Danes",
		         YEAR: "${date_short}",
		         YESTERDAY: "Včeraj",
		         TOMORROW: "Jutri"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} ob ${time}",
		         FULL: "${EEEE}, ${date_long}, ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Danes ob ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Včeraj ob ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} ob ${time}",
		         FULL: "${EEEE}, ${date_long}, ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Danes ob ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Včeraj ob ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} ob ${time}",
		         FULL: "${EEEE}, ${date_long}, ${time_long}",
		         MONTH: "${date_short} ob ${time}",
		         TODAY: "${date_short} ob ${time}",
		         YEAR: "${date_short} ob ${time}",
		         YESTERDAY: "${date_short} ob ${time}",
		         TOMORROW: "${date_short} ob ${time}"
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
		      UPDATED: { DAY: "Posodobljeno ${EEee} ob ${time}",
		         FULL: "${EEEE}, ${date_long}, ${time_long}",
		         MONTH: "Posodobljeno ${date_long}",
		         TODAY: "Posodobljeno danes ob ${time}",
		         YEAR: "Posodobljeno ${date_long}",
		         YESTERDAY: "Posodobljeno včeraj ob ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Informacij o različici ni mogoče naložiti.",
		      ERROR_REQUEST_CANCELLED: "Zahteva je preklicana.",
		      ERROR_REQUEST_TIMEOUT: "S strežnikom ni bilo mogoče vzpostaviti stika.",
		      ERROR_REQUEST_UNKNOWN: "Prišlo je do neznane napake.",
		      LOADING: "Nalaganje ...",
		      NO_VERSIONS: "Ni različic",
		      INFO: "Različica ${0} je bila ustvarjena ${1}, ustvarila oseba ",
		      VERSION_NUMBER: "Različica ${0}",
		      DELETED: "Izbrisano",
		      DELETE_ALL: "Izbriši vse različice pred to različico",
		      DELETE_VERSION_SINGLE: "Izbriši različico ${0}",
		      DELETEERROR: "Različica ni bila izbrisana zaradi napake.",
		      CREATE_VERSION: "Ustvarjanje nove različice",
		      CREATE_VERSION_TOOLTIP: "Ustvari različico te datoteke",
		      REVERT_VERSION: "Obnovi različico ${0}",
		      REVERT_DESCRIPTION: "Obnovljeno iz različice ${0}",
		      PREVIOUS: "Nazaj",
		      PREVIOUS_TOOLTIP: "Prejšnja stran",
		      ELLIPSIS: "...",
		      NEXT: "Naprej",
		      NEXT_TOOLTIP: "Naslednja stran",
		      COUNT: "${0}-${1} od ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Stran",
		      SHOW: "Pokaži",
		      ITEMS_PER_PAGE: " postavk na stran",
		      DATE: {
		        AM: "dop.",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long}, ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Danes ob ${time}",
		            YESTERDAY: "Včeraj ob ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} ob ${time}",
		            YEAR: "${date_short} ob ${time}",
		            FULL: "${EEEE}, ${date_long}, ${time_long}",
		            MONTH: "${date_short} ob ${time}",
		            TODAY: "danes ob ${time}",
		            YESTERDAY: "včeraj ob ${time}"
		        },
		        UPDATED: { DAY: "Posodobljeno ${EEee} ob ${time}",
		            YEAR: "Posodobljeno ${date_short}",
		            FULL: "${EEEE}, ${date_long}, ${time_long}",
		            MONTH: "Posodobljeno ${date_short}",
		            TODAY: "Posodobljeno danes ob ${time}",
		            YESTERDAY: "Posodobljeno včeraj ob ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Izbriši različico ${0}",
		         DOWNLOAD: "Prenesi",
		         DOWNLOAD_TOOLTIP: "Prenesi to različico (${0})",
		         VIEW: "Ogled",
		         VIEW_TOOLTIP: "Prikaži različico ${0}",
		         REVERT: {
		            A11Y: "S tem gumbom se odpre pogovorno okno, ki omogoča uporabniku potrditev obnovitve datoteke s prejšnje različice. S potrditvijo tega dejanja se osveži vsebina strani.",
		            FULL: "Obnovi",
		            WIDGET: "Obnovi to različico"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Različice ni bilo mogoče izbrisati, ker je že bila izbrisana ali ni več vidna.",
		         ERROR_ACCESS_DENIED: "Različice ni bilo mogoče izbrisati, ker niste urednik.",
		         ERROR_TIMEOUT: "Različice ni bilo mogoče izbrisati, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Če želite ponoviti zahtevo, znova kliknite 'Izbriši'.",
		         ERROR_CANCEL: "Različica ni bila izbrisana, ker je bila zahteva preklicana.  Če želite ponoviti zahtevo, znova kliknite 'Izbriši'.",
		         ERROR_NOT_LOGGED_IN: "Če želite izbrisati različico, morate biti prijavljeni.  Kliknite 'Izbriši', da se prikaže poziv za prijavo.",
		         GENERIC_ERROR: "Različice ni bilo mogoče izbrisati zaradi neznane napake.  Če želite ponoviti zahtevo, znova kliknite 'Izbriši'.",
		         FULL: "Izbriši",
		         A11Y: "S tem gumbom se odpre pogovorno okno, ki omogoča uporabniku potrditev izbrisa različice. S potrditvijo tega dejanja se osveži vsebina strani."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Različice ni bilo mogoče obnoviti, ker je bila izbrisana ali ni več vidna.",
		         ERROR_ACCESS_DENIED: "Različice ni bilo mogoče obnoviti, ker niste urednik.",
		         ERROR_NAME_EXISTS: "Različice ni bilo mogoče obnoviti, ker ima druga datoteka enako ime.",
		         ERROR_TIMEOUT: "Različice ni bilo mogoče obnoviti, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Kliknite 'Obnovi', da znova poskusite z zahtevo.",
		         ERROR_CANCEL: "Različice ni bilo mogoče obnoviti, ker je bila zahteva preklicana.  Kliknite 'Obnovi', da znova poskusite z zahtevo.",
		         ERROR_QUOTA_VIOLATION: "Različice ni bilo mogoče obnoviti zaradi omejitve prostora.",
		         ERROR_MAX_CONTENT_SIZE: "Različice ni bilo mogoče obnoviti, ker je večja od največje dovoljene velikosti datoteke ${0}.",
		         GENERIC_ERROR: "Različice ni bilo mogoče obnoviti zaradi neznane napake.  Kliknite 'Obnovi', da znova poskusite z zahtevo."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Oglejte si, kdo je prenesel ...",
		      PREVIOUS: "Nazaj",
		      PREVIOUS_TOOLTIP: "Prejšnja stran",
		      ELLIPSIS: "...",
		      NEXT: "Naprej",
		      NEXT_TOOLTIP: "Naslednja stran",
		      COUNT: "${0}-${1} od ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Stran",
		      SHOW: "Pokaži",
		      ITEMS_PER_PAGE: " postavk na stran",
		      VERSION: {
		         DAY: "Različica ${version} z dne ${date}",
		         MONTH: "Različica ${version} z dne ${date}",
		         TODAY: "Različica ${version} ob ${time}",
		         YEAR: "Različica ${version} z dne ${date}",
		         YESTERDAY: "Različica ${version} včeraj"
		      },
		      FILE: {
		         V_LATEST: "Prenesli ste najnovejšo različico te datoteke",
		         V_OLDER: "Nazadnje ste prenesli različico ${0} te datoteke",
		         LOADING: "Nalaganje ...",
		         EMPTY: "Samo anonimni uporabniki",
		         ERROR: "Informacij o prenosu ni mogoče naložiti"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Napaka",
		      ERROR_ALT_TEXT: "Napaka:",
		      ERROR_MSG_GENERIC: "Prišlo je do težave.  Poskusite znova.",
		      ERROR_MSG_NOT_AVAILABLE: "Ta postavka je bila izbrisana in ni več na voljo.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Vsebina za to postavko ni na voljo.",
		      ERROR_MSG_NO_ACCESS: "Do te postavke nimate več dostopa.",
		      LOADING: "Nalaganje ...",
		      TITLE_SU: "Oseba ${author} je objavila sporočilo.",
		      TITLE_NI: "Oseba ${author} vas je povabila, da se pridružite omrežju.",
		      AUTHOR_TITLE: "Pokaži profil za osebo ${author}",
		      OPEN_LINK: "Odpri ${title}",
		      CONFIRM_CLOSE_TITLE: "Potrdi",
		      CONFIRM_CLOSE_MESSAGE: "Ali ste prepričani, da želite opustiti spremembe? Za nadaljevanje pritisnite V redu, za vrnitev pa Prekliči.",
		      OK: "V redu",
		      CANCEL: "Prekliči"
		   },
		   MESSAGE: {
		      SUCCESS: "Potrditev",
		      ERROR: "Napaka",
		      ERROR_ALT_TEXT: "Napaka:",
		      INFO: "Informacije",
		      WARNING: "Opozorilo",
		      DISMISS: "Skrij to sporočilo",
		      MORE_DETAILS: "Več podrobnosti",
		      HIDE_DETAILS: "Skrij podrobnosti"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Ustvarjeno: ${EEEE} ob ${time}",
		           MONTH: "Ustvarjeno: ${MMM} ${d}",
		           TODAY: "Ustvarjeno: danes ob ${time}",
		           YEAR: "Ustvarjeno: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Ustvarjeno: včeraj ob ${time}",
		           TOMORROW: "Ustvarjeno: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Prišlo je do napake.  ${again}.",
		      error_again: "Poskusite znova.",
		      error_404: "Posodobitev statusa ne obstaja več.",
		      notifications: {
		         STATUS_UPDATE: "Oseba ${user} je objavila sporočilo",
		         USER_BOARD_POST: "Oseba ${user} je pisala na vašo tablo",
		         POST_COMMENT: "Oseba ${user} je zapisala:"
		      }
		   },
		   login: {
		      error: "Vaše uporabniško ime in/ali geslo se ne ujema z nobenim obstoječim računom. Poskusite znova.",
		      logIn: "Prijava",
		      password: "Geslo:",
		      user: "Uporabniško ime:",
		      welcome: "Prijava v HCL Connections"
		   },
		   repost: {
		      name: "Znova objavi",
		      title: "Znova objavi to posodobitev mojim spremljevalcem ali skupnostim",
		      msg_success: "Posodobitev je bila uspešno znova objavljena za vaše spremljevalce.",
		      msg_generic: "Prišlo je do težave.  Poskusite znova."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Dodaj",
		      ADD_TXT: "Dodajte osebe ali skupnosti kot bralce",
		      SHOW_MORE: "Pokaži več ...",
		      READER_IF_PUBLIC: "Vsi (javno)",
		      READER_IF_PUBLIC_TOOLTIP: "Ta datoteka je javna in vidna vsem",
		      EMPTY_READERS: "Brez",
		      READERS_LABEL: "Bralci:\u00a0",
		      EDITORS_LABEL: "Uredniki:\u00a0",
		      OWNER_LABEL: "Lastnik:\u00a0",
		      ERROR: "Informacij o skupni rabi ni mogoče naložiti",
		      ERROR_NOT_FOUND: "Datoteka, ki ste jo zahtevali, je bila izbrisana ali premaknjena. Če vam je to povezavo poslala določena oseba, preverite, ali je pravilna.",
		      ERROR_ACCESS_DENIED: "Za ogled te datoteke nimate dovoljenja.  Ta datoteka ni javna in ni v skupni rabi z vami.",
		      SHARE: "Daj v skupno rabo",
		      CANCEL: "Prekliči",
		      SHARE_WITH: "Daj v skupno rabo z:",
		      PERSON: "Oseba",
		      COMMUNITY: "Skupnost",
		      PLACEHOLDER: "Ime ali e-pošta osebe ...",
		      MESSAGE: "Sporočilo:",
		      MESSAGE_TXT: "Dodaj izbirno sporočilo",
		      REMOVE_ITEM_ALT: "Odstrani: ${0}",
		      NO_MEMBERS: "Brez",
		      A11Y_READER_ADDED: "Oseba ${0} je izbrana kot bralec",
		      A11Y_READER_REMOVED: "Oseba ${0} je odstranjena kot bralec",
		      SELF_REFERENCE_ERROR: "Ne morete souporabljati sami s sabo.",
		      OWNER_REFERENCE_ERROR: "Te datoteke ne morete souporabljati z njenim lastnikom.",
		      SHARE_COMMUNITY_WARN: "Skupna raba z javno skupnostjo '${0}' bo naredila to datoteko javno.",
		      SELECT_USER_ERROR: "Za deljenje morate izbrati vsaj eno osebo ali skupnost",
		      WARN_LONG_MESSAGE: "Sporočilo je predolgo.",
		      TRIM_LONG_MESSAGE: "Ali želite skrajšati sporočilo?",
		      ERROR_SHARING: "Datoteke ni bilo mogoče dati v skupno rabo.  Poskusite znova pozneje.",
		      INFO_SUCCESS: "Datoteka je bila uspešno dana v skupno rabo.",
		      MAX_SHARES_ERROR: "Največje število skupnih rab je bilo prekoračeno.",
		      NOT_LOGGED_IN_ERROR: "Datoteka ni bila dana v skupno rabo, ker niste prijavljeni.  Kliknite 'Skupna raba', če želite souporabljati datoteko.",
		      TIMEOUT_ERROR: "Datoteka ni bila dana v skupno rabo, ker ni bilo mogoče vzpostaviti stika s strežnikom.  Kliknite 'Skupna raba', da poskusite znova.",
		      CANCEL_ERROR: "Datoteka ni bila dana v skupno rabo, ker je bila zahteva preklicana.  Kliknite 'Skupna raba', da poskusite znova.",
		      NOT_FOUND_ERROR: "Datoteka je bila izbrisana ali pa ni več vidna in je ni mogoče dati v skupno rabo.",
		      ACCESS_DENIED_ERROR: "Za souporabo te datoteke nimate dovoljenja.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Datoteke, ki je omejena, ni mogoče omogočiti za javno uporabo.",
		      TOOLTIP: "Drugim dodeli dostop do te datoteke"
		   },
		   HISTORY: {
		      TAB_TITLE: "Nedavne posodobitve",
		      NO_HISTORY: "Ni nedavnih posodobitev.",
		      EMPTY: "Za to postavko ni bilo mogoče pridobiti nedavnih posodobitev. Postavka je bila izbrisana ali pa nimate več dostopa do nje.",
		      MORE: "Pokaži prejšnje posodobitve",
		      ERROR_ALT: "Napaka",
		      ERROR: "Med pridobivanjem posodobitev je prišlo do napake. ${again}",
		      ERROR_ADDTL: "Med pridobivanjem dodatnih posodobitev je prišlo do napake. ${again}",
		      ERROR_AGAIN: "Poskusite znova.",
		      ERROR_AGAIN_TITLE: "Za več posodobitev ponovite zahtevo.",
		      PROFILE_TITLE: "Odprite profil osebe ${user}.",
		      SORT_BY: "Razvrsti po\\:",
		      SORTS: {
		         DATE: "Datum",
		         DATE_TOOLTIP: "Razvrsti od najnovejše zgodovine do najstarejših posodobitev",
		         DATE_TOOLTIP_REVERSE: "Razvrsti od najstarejše zgodovine do najnovejših posodobitev"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} ob ${time}",
		             MONTH: "${d} ${MMM}",
		             TODAY: "Danes ob ${time}",
		             YEAR: "${d} ${MMM} ${YYYY}",
		             YESTERDAY: "Včeraj ob ${time}",
		             TOMORROW: "${d} ${MMM} ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Ta komentar",
			   REPLY_ACTION: "Odgovori",
		       REPLY_ACTION_TOOLTIP: "Odgovori na ta komentar"
		   },
		   OAUTH: {
		      welcomeHeader: "Dobrodošli v Connections",
		      continueBtnLabel: "Nadaljuj",
		      continueBtnA11y: "Če aktivirate to povezavo, se bo odprlo novo okno, kjer boste lahko odobrili dostop do Connections.",
		      clickHere: "Kliknite tukaj",
		      infoMsg: "Connections potrebuje vaše pooblastilo za dostop do vaših podatkov.",
		      authorizeGadget: "${clickHere}, da pooblastite to aplikacijo za dostop do informacij Connections.",
		      confirmAuthorization: "${clickHere}, da potrdite, da ste pooblastili to aplikacijo za dostop do informacij Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Če aktivirate to povezavo, se bo odprlo novo okno, kjer boste lahko odobrili dostop do repozitorija knjižnice Connections.",
		      infoMsg: "Repozitorij knjižnice Connections potrebuje vaše pooblastilo za dostop do vaših podatkov.",
		      authorizeGadget: "${clickHere}, da pooblastite to aplikacijo za dostop do informacij repozitorija knjižnice Connections.",
		      confirmAuthorization: "${clickHere}, da potrdite, da ste pooblastili to aplikacijo za dostop do informacij repozitorija knjižnice Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Prekliči",
		      CONFIRM: "Ali ste prepričani, da želite opustiti spremembe?  Za nadaljevanje pritisnite V redu, za vrnitev pa Prekliči.",
		      DIALOG_TITLE: "Potrdi",
		      NAME: "Potrdi",
		      OK: "V redu",
		      TOOLTIP: "Potrdi"
		   }
});
