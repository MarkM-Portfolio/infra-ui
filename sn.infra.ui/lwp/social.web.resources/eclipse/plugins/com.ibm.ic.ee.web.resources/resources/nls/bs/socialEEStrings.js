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
		         label: "Više",
		         tooltip: "Više akcija"
		       },
		       tags_more: "i ${0} više",
		       ERROR_ALT: "Greška",
		       PERSON_TITLE: "Otvorite profil od ${user}.",
		       inactiveUser: "${user} (neaktivno)",
		       inactiveIndicator: "(neaktivno)",
		       like_error: "Vaše sviđanje se nije moglo spremiti. Molimo da pokušate ponovo kasnije.",
		       vote_error: "Vaš glas nije mogao da se spremiti. Molimo da pokušate ponovo kasnije."
		   },
		   generic: {
		      untitled: "(Bez naslova)",
		      tags: "Oznake:",
		      tags_more: "i ${0} više",
		      likes: "Sviđanja",
		      comments: "Komentari",
		      titleTooltip: "Otiđite do ${app}",
		      error: "Ne može se pristupiti podacima.",
		      timestamp: {
		         created: {
		            DAY: "Kreirano ${EEEE} u ${time}",
		            MONTH: "Kreirano ${MMM} ${d}",
		            TODAY: "Kreirano danas u ${time}",
		            YEAR: "Kreirano ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Kreirano jučer u ${time}",
		            TOMORROW: "Kreirano ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Ažurirano ${EEEE} u ${time}",
		            MONTH: "Ažurirano ${MMM} ${d}",
		            TODAY: "Ažurirano danas u ${time}",
		            YEAR: "Ažurirano ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ažurirano jučer u ${time}",
		            TOMORROW: "Ažurirano ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Javno",
		         priv: "Privatno"
		      },
		      action: {
		         created: "Kreirano",
		         updated: "Ažurirano"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Primite ažuriranja o osobama koje pratite na početnu stranicu i u rezimeu e-mailova.",
		      profile_title: "Otvorite profil od ${user}.",
		      profile_a11y: "Aktiviranje ovog linka će otvoriti profil od ${user} u novom prozoru.",
		      error: "Došlo je do greške.  ${again}.",
		      error_again: "Molimo da pokušate ponovo",
		      error_404: "Mrežni zahtjev više ne postoji.",
		      warning: "Upozorenje",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Sada ste dio mrežnih kontakata.",
		            	follow: "Sada ste dio mrežnih kontakata i pratite ${user}."
		            },
		            ignore: {
		            	nofollow: "Ignorisali ste pozivnicu.",
		            	follow: "Ignorisali ste pozivnicu, ali sada pratite ${user}."
		            }
		         },
		         error: {
		            accept: "Došlo je do greške prilikom prihvata zahtjeva.",
		            ignore: "Došlo je do greške zanemarivanja zahtjeva."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} u ${time}",
		              MONTH: "${MMM} ${d}",
		              TODAY: "Danas u ${time}",
		              YEAR: "${MMM} ${d}, ${YYYY}",
		              YESTERDAY: "Jučer u ${time}",
		              TOMORROW: "${MMM} ${d}, ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Aktiviranje ovog linka otvara ${name} u novom prozoru.",
		      tooltip: "Otvori ${name} u aplikaciji Datoteke",
		      profile_title: "Otvorite profil od ${user}.",
		      profile_a11y: "Aktiviranje ovog linka će otvoriti profil od ${user} u novom prozoru.",
		      download_tooltip: "Preuzmite ovu datoteku (${0})",
		      following: {
		         add: "Prati datoteku",
		         remove: "Zaustavi praćenje",
		         title: "Prebacite želite li primati ažuriranja za ovu datoteku"
		      },
		      share: {
		         label: "Dijeli",
		         title: "Dajte drugima pristup do ove datoteke"
		      },
		      timestamp: {
		         created: {
		            DAY: "Kreirano ${EEEE} u ${time}",
		            MONTH: "Kreirano ${MMM} ${d}",
		            TODAY: "Kreirano danas u ${time}",
		            YEAR: "Kreirano ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Kreirano jučer u ${time}",
		            TOMORROW: "Kreirano ${MMM} ${d}, ${YYYY}"
		         },
		         createdOther: {
		            DAY: "${user} kreirao ${EEEE} u ${time}",
		            MONTH: "${user} kreirao ${MMM} ${d}",
		            TODAY: "${user} kreirao danas u ${time}",
		            YEAR: "${user} kreirao ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} kreirao jučer u ${time}",
		            TOMORROW: "${user} kreirao ${MMM} ${d}, ${YYYY}"
		         },
		         updated: {
		            DAY: "Ažurirano ${EEEE} u ${time}",
		            MONTH: "Ažurirano ${MMM} ${d}",
		            TODAY: "Ažurirano danas u ${time}",
		            YEAR: "Ažurirano ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ažurirano jučer u ${time}",
		            TOMORROW: "Ažurirano ${MMM} ${d}, ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "${user} ažurirao ${EEEE} u ${time}",
		            MONTH: "${user} ažurirao ${MMM} ${d}",
		            TODAY: "${user} ažurirao danas u ${time}",
		            YEAR: "${user} ažurirao ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "${user} ažurirao jučer u ${time}",
		            TOMORROW: "${user} ažurirao ${MMM} ${d}, ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Kreirano: ${EEEE} u ${time}",
		            MONTH: "Kreirano: ${MMM} ${d}",
		            TODAY: "Kreirano: danas u ${time}",
		            YEAR: "Kreirano: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Kreirano: jučer u ${time}",
		            TOMORROW: "Kreirano: ${MMM} ${d}, ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Ažurirano: ${EEEE} u ${time}",
		            MONTH: "Ažurirano: ${MMM} ${d}",
		            TODAY: "Ažurirano: Danas u ${time}",
		            YEAR: "Ažurirano: ${MMM} ${d}, ${YYYY}",
		            YESTERDAY: "Ažurirano: Jučer u ${time}",
		            TOMORROW: "Ažurirano: ${MMM} ${d}, ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} ${time_long} od ${user}",
		         UPDATE_TIMESTAMP: "${date_long} ${time_long} od ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Preuzmi ovu datoteku (${size})",
		      	 DOWNLOAD_ALT: "Preuzmi"
		      },
		      PREVIEW: {
		         LINK: "Pregled",
		         TITLE: "Pregled ove datoteke u novom prozoru."
		      },
		      TAGS: "Oznake:",
		      error: "Došlo je do greške.  ${again}.",
		      error_again: "Molimo da pokušate ponovo",
		      error_404: "Datoteka više ne postoji ili nemate odgovarajuću dozvolu da joj pristupite.",
		      error_403: "Nemate dozvolu za gledanje ove datoteke. Datoteka nije javna i ne dijeli se s vama.",
		      notifications: {
		         USER_SHARED: "${user} je napisao:",
		         CHANGE_SUMMARY: "${user} je naveo rezime promjene",
		         NO_CHANGE_SUMMARY: "${user} nije naveo rezime promjene",
		         COMMENTED: "${user} je komentarisao"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Vi ste odjavili",
		      checkedout_other: "Odjavio je ${user}",
		      tooltip: "Otvorite datoteku ${name} u biblioteki",
		      draft_404_info: "Skica je izbrisana se ne dijeli više s vama. Objavljena verzija je sada zadnja verzije ove datoteke.",
		      error_404: "Datoteka je izbrisana se ne dijeli više s vama.",
		      error_403: "Datoteka je izbrisana se ne dijeli više s vama.",
		      error_preview: "Datoteka više nije dostupna za pregled.",
		      draft_review_canceled: "Pregled je poništen i skica više nije dijeljena s vama. Od vas se više ne traži pregled.",
		      switch_ee: "Pregled skice",
		      switch_ee_tooltip: "Pregled zadnje skice za ovu datoteku"
		   },
		   ecm_draft: {
		      tooltip: "Otvorite skicu ${name} u biblioteki",
		      community_owners: "Vlasnici zajednice",
		      draft: "Skica",
		      draft_tooltip: "Pregled skice",
		      draft_general_info: "Prethodna skica više ne postoji i novija skica je sad zadnja verzija.",
		      draft_review_404_general_info: "Jedan od nadzornika je već glasao. Od vas se više ne traži da pregledate ovu skicu.",
		      draft_review_404_request_info: "Prethodna skica više ne postoji i zadnja skica je poslana na pregled. Traži se vaš pregled.",
		      draft_review_404_require_info: "Prethodna skica više ne postoji i zadnja skica je poslana na pregled. Traži se vaš pregled.",
		      draft_review_request_info: "Traži se vaš pregled.",
		      draft_review_require_info: "Traži se vaš pregled.",
		      error_404: "Skica je izbrisana se ne dijeli više s vama.",
		      error_403: "Ne možete pregledati ovu skicu jer nije dijeljena s vama.",
		      error_preview: "Skica više nije dostupna za pregled.",
		      switch_ee: "Pregled objavljene verzije",
		      switch_ee_tooltip: "Pregled objavljene verzije ove datoteke",
		      review: "Pregled",
		      reviewers: "Nadzornici",
		      reviwers_addtl: "Dodatni nadzornici",
		      in_review: "Skica u pregledu",
		      in_review_tooltip: "Pregledavanje skice u pregledu",
		      review_required_any: "Vlasnici zajednice zahtijevaju da jedan nadzornik pregleda ovu skicu.",
		      review_required_all: "Vlasnici zajednice zahtijevaju da svi nadzornici pregledaju ovu skicu.",
		      review_required_generic: "Vlasnici zajednice zahtijevaju da ovi nadzornici pregledaju ovu skicu.",
		      review_additional_required: "Od svih nadzornika koje je dodao kreator skice se zahtijeva da pregledaju ovu skicu.",
		      reivew_submitted_date: {
		         DAY: "${user} je poslao skicu na pregled ${EEEE} u ${time}.",
		         MONTH: "${user} je poslao skicu na pregled ${MMM} u ${d}.",
		         TODAY: "${user} je poslao skicu na pregled danas u ${time}.",
		         YEAR: "${user} je poslao skicu na pregled ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "${user} je poslao skicu na pregled jučer u ${time}.",
		         TOMORROW: "${user} je poslao skicu na pregled ${MMM} ${d}, ${YYYY}."
		      },
		      pending: "Na čekanju",
		      pending_rejected: "Pregled više nije potreban jer je skica odbijena",
		      approve: "Odobrenje",
		      approved: "Odobreno",
		      approve_tooltip: "Odobri ovu skicu",
		      accept_success: "Odobrili ste ovu skicu.",
		      accept_error: "Došlo je do greške prilikom odobravanja ove skice. Pokušajte ponovo.",
		      accept_info: "Odobrili ste ovu skicu.",
		      reject: "Odbij",
		      rejected: "Odbijeno",
		      reject_tooltip: "Odbij ovu skicu",
		      reject_success: "Odbili ste ovu skicu.",
		      reject_error: "Došlo je do greške prilikom odbijanja ove skice. Pokušajte ponovo.",
		      reject_info: "Odbili ste ovu skicu."
		   },
		   authUser: {
		      error: "Došlo je do greške prilikom pristupa trenutnom korisniku.  ${again}.",
		      error_again: "Molimo da pokušate ponovo",
		      error_404: "Ne može se naći ovlašteni korisnik.",
		      error_403: "Nemate dozvolu za pristup korisničkim informacijama."
		   },
		   forum: {
		      error: "Došlo je do greške.  ${again}.",
		      error_again: "Molimo da pokušate ponovo",
		      error_404: "Forum više ne postoji ili nemate dovoljno dozvola da mu pristupite.",
		      error_403: "Nemate dozvolu za gledanje ovog foruma. Forum nije javni i nije dijeljen s vama.",
		      readMore: "Pregled svih tema...",
		      readMore_tooltip: "Otvorite teme ${name} foruma.",
		      readMore_a11y: "Aktiviranje ovog linkae će otvoriti teme ${name} foruma u novom prozoru.",
		      QUESTION_ANSWERED: "Na ovo pitanje je odgovoreno.",
		      QUESTION_NOT_ANSWERED: "Na ovo pitanje još nije odgovoreno.",
		      attachments: "${count} priloga",
		      attachments_one: "${count} prilog"
		   },
		   blog: {
		      error: "Došlo je do greške.  ${again}.",
		      error_again: "Molimo da pokušate ponovo",
		      error_404: "Blog više ne postoji ili nemate dovoljno dozvola da mu pristupite.",
		      error_403: "Nemate dozvolu za pregled ovog bloga. Blog nije javni i nije dijeljen s vama.",
		      readMore: " Pročitaj više ...",
		      readMore_tooltip: "Otvorite unos u ${name} blog.",
		      readMore_a11y: "Aktiviranje ovog linka će otvoriti unos u ${name} blog u novom prozoru.",
		      graduated: "Stepenovano",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Glasaj</a>",
		  					TOOLTIP: 	"Glasaj za ovo"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Glasano</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Glasano</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Poništi</a>",
		  					TOOLTIP: 	"Uklonite vaš glas iz ovoga"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"0 osoba je glasalo za ovo"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"1 osoba je glasala za ovo"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"${recommendCount} je glasalo za ovo"
		  				}
		  			},
		  			LOADING: "Učitavanje...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Glasano"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Vaše glasanje nije moglo biti spremljeno jer ste ili dostigli vaše ograničenje za glasanje ili vam ideja više nije dostupna.",
		      readMore_tooltip: "Otvorite ideju ${name}.",
		      readMore_a11y: "Aktiviranje ovog linka će otvoriti ${name} ideju u novom prozoru."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} KB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Odgovori",
		      THIS_ARIA_LABEL: "Ovaj odgovor",
		      THIS_TAB_TITLE: "Ovaj odgovor",
		      TAB_TITLE: "Odgovori (${0})",
		      REPLY_TO_REPLY: "Kao odgovor na ${thisReply}",
		      REPLY_TO_TOPIC: "Kao odgovor na ${thisTopic}",
		      THIS_TOPIC: "ova tema",
		      THIS_REPLY: "ovaj odgovor",
		      NAVIGATE_TO_REPLY: "Otiđi do nadređenog odgovora",
		      NAVIGATE_TO_TOPIC: "Otiđi do nadređene teme",
		      ADD_COMMENT: "Odgovor na ovu temu",
		      ADD_COMMENT_TOOLTIP: "Odgovor na ovu temu foruma",
		      SHOWING_RECENT_REPLIES: "Prikaz ${0} najnovijih odgovora",
		      PREV_COMMENTS: "Pokaži više odgovora",
		      PLACEHOLDER_TXT: "Odgovor na ovu temu",
		      EMPTY: "Nema odgovora.",
		      TRIM_LONG_COMMENT: "Skratiti odgovor?",
		      WARN_LONG_COMMENT: "Odgovor je predug.  ${shorten}",
		      ERROR: "Došlo je do greške prilikom dohvata odgovora. ${again}",
		      ERROR_CREATE: "Vaš odgovor nije mogao da se spremiti.  Pokušajte ponovo kasnije.",
		      ERROR_CREATE_NOT_FOUND: "Vaš odgovor nije mogao da se spremiti zato šta je tema izbrisana ili vam više nije vidljiva.",
		      ERROR_CREATE_ACCESS_DENIED: "Vaš odgovor nije mogao da se spremiti zato šta je tema izbrisana ili vam više nije vidljiva.",
		      ERROR_CREATE_TIMEOUT: "Vaš odgovor nije mogao da se spremiti jer nije mogao da se kontaktirati server.  Kliknite 'Spremi' za ponovni pokušaj.",
		      ERROR_CREATE_CANCEL: "Vaš odgovor nije mogao da se spremiti jer je zahtjev poništen.  Kliknite 'Spremi' za ponovni pokušaj.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Morate biti prijavljeni za kreiranje ovog odgovora.  Kliknite 'Spremi' za prompt za prijavu.",
		      ERROR_NO_CONTENT: "Unesite vaš odgovor i kliknite 'Spremi.'  Ako ne želite ostaviti odgovor kliknite 'Odustani'.",
		      ERROR_UNAUTHORIZED: "Vaš odgovor nije mogao da se spremiti jer niste ovlašteni da možete ostaviti odgovor.",
		      COMMENT_DELETED: {
		         DAY: "Odgovor je izbrisao ${user} ${EEEE} u ${time}",
		         MONTH: "Odgovor je izbrisao ${user} ${MMM} ${d}",
		         TODAY: "Odgovor je izbrisao ${user} danas u ${time}",
		         YEAR: "Odgovor je izbrisao ${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Odgovor je izbrisao ${user} jučer u ${time}",
		         TOMORROW: "Odgovor je izbrisao ${user} ${MMM} ${d}, ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Razlog za brisanje: ${reason}",
		      REPLY_TITLE: "Od: ${0}",
		      SHOW_FULL_REPLY: "Pregled punog odgovora",
		      SHOW_FULL_REPLY_TOOLTIP: "Otiđi do originalnog odgovora u temi foruma",
		      REPLY_ACTION: "Odgovor",
		      REPLY_ACTION_TOOLTIP: "Odgovor na ovu objavu",
		      MODERATION_PENDING: "Ovaj odgovor čeka pregled.",
		      MODERATION_QUARANTINED: "Objava je zabranjena od strane moderatora.",
		      MODERATION_REMOVED: {
		         DAY: "Ovaj odgovor je uklonio ${user} ${EEEE} u ${time}.",
		         MONTH: "Ovaj odgovor je uklonio ${user} ${MMM} ${d}.",
		         TODAY: "Ovaj odgovor je uklonio ${user} danas u ${time}.",
		         YEAR: "Ovaj odgovor je uklonio ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Ovaj odgovor je uklonio ${user} jučer u ${time}.",
		         TOMORROW: "Ovaj odgovor je uklonio ${user} ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Ovaj odgovor je odbio ${user} ${EEEE} u ${time}.",
		         MONTH: "Ovaj odgovor je odbio ${user} ${MMM} ${d}.",
		         TODAY: "Ovaj odgovor je odbio ${user} danas u ${time}.",
		         YEAR: "Ovaj odgovor je odbio ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Ovaj odgovor je odbio ${user} jučer u ${time}.",
		         TOMORROW: "Ovaj odgovor je odbio ${user} ${MMM} ${d}, ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Vaš odgovor je poslat na pregled i bit će dostupan nakon odobrenja."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Komentari",
		      PLACEHOLDER_TXT: "Dodavanje komentara",
		      TAB_TITLE: "Komentari (${0})",
		      ACTION_NOT_SUPPORTED: "Nepodržana akcija",
		      ADD_COMMENT: "Dodaj komentar",
		      ADD_COMMENT_TOOLTIP: "Dodaj komentar u ovu stavku",
		      CANCEL: "Odustani",
		      COMMENT_COUNT_ONE: "${0} komentar",
		      COMMENT_COUNT_MANY: "${0} komentara",
		      COMMENT_LABEL: "Komentar:",
		      DELETE: "Obriši",
		      DELETE_TOOLTIP: "Brisanje komentara",
		      DELETEREASON: "Razlog za brisanje ovog komentara:",
		      DIALOG_TITLE: "Skraćeni komentar",
		      TOOLTIP: "Skraćeni komentar",
		      NAME: "Skraćeni komentar",
		      EDIT: "Uredi",
		      EDIT_TOOLTIP: "Uredi komentar",
		      ERROR_CREATE: "Vaš komentar nije mogao da se spremiti.  Pokušajte ponovo kasnije.",
		      ERROR_CREATE_NOT_FOUND: "Vaš komentar nije mogao da se spremiti zato šta je stavka izbrisana ili vam više nije vidljiva.",
		      ERROR_CREATE_ACCESS_DENIED: "Vaš komentar nije mogao da se spremiti zato šta je stavka izbrisana ili vam više nije vidljiva.",
		      ERROR_CREATE_TIMEOUT: "Vaš komentar nije mogao da se spremiti zato šta nije mogao da se kontaktirati server.  Kliknite 'Postavi' za ponovni pokušaj.",
		      ERROR_CREATE_CANCEL: "Vaš komentar nije mogao da se spremiti zato šta je zahtjev poništen.  Kliknite 'Postavi' za ponovni pokušaj.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Morate biti prijavljeni za kreiranje ovog komentara.  Kliknite 'Postavi' za prompt za prijavu.",
		      ERROR_DELETE: "Vaš komentar nije mogao da se izbrisati.  Pokušajte ponovo kasnije.",
		      ERROR_DELETE_TIMEOUT: "Vaš komentar nije mogao da se izbrisati zato šta nije mogao da se kontaktirati server.  Kliknite 'Obriši' za ponovni pokušaj.",
		      ERROR_DELETE_NOT_FOUND: "Vaš komentar nije mogao da se izbrisati jer je komentar ili stavka izbrisan ili vam više nije vidljiva.",
		      ERROR_DELETE_ACCESS_DENIED: "Vaš komentar nije mogao da se izbrisati jer je stavka izbrisana ili vam više nije vidljiva.",
		      ERROR_DELETE_CANCEL: "Vaš komentar nije mogao da se izbrisati zato šta je zahtjev poništen.  Kliknite 'Obriši' za ponovni pokušaj.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Morate biti prijavljeni za brisanje ovog komentara.  Kliknite 'Obriši' za prompt za prijavu.",
		      ERROR_EDIT: "Vaš komentar nije mogao da se ažurira.  Pokušajte ponovo kasnije.",
		      ERROR_EDIT_ACCESS_DENIED: "Vaš komentar nije mogao da se ažurira zato šta je stavka izbrisana ili vam više nije vidljiva.",
		      ERROR_EDIT_NOT_FOUND: "Vaš komentar nije mogao da se ažurira zato šta je stavka izbrisana ili vam više nije vidljiva.",
		      ERROR_EDIT_TIMEOUT: "Vaš komentar nije mogao da se ažurira zato šta nije mogao da se kontaktirati server.  Kliknite 'Postavi' za ponovni pokušaj.",
		      ERROR_EDIT_CANCEL: "Vaš komentar nije mogao da se ažurira zato šta je zahtjev poništen.  Kliknite 'Postavi' za ponovni pokušaj.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Morate biti prijavljeni za uređivanje ovog komentara.  Kliknite 'Postavi' za prompt za prijavu.",
		      ERROR_NO_CONTENT: "Unesite vaš komentar i kliknite 'Postavi'.  Ako ne želite ostaviti komentar kliknite 'Odustani'.",
		      ERROR_NO_CONTENT_EDIT: "Unesite vaš komentar i kliknite 'Postavi'.  Ako više ne želite uređivati vaš komentar kliknite 'Odustani.'",
		      ERROR_UNAUTHORIZED: "Vaš komentar nije mogao biti spremljen jer niste ovlašteni da možete ostaviti komentar.",
		      ERROR_GENERAL: "Došlo je do greške.",
		      OK: "OK",
		      YES: "Da",
		      TRIM_LONG_COMMENT: "Skratiti komentar?",
		      WARN_LONG_COMMENT: "Komentar je predug.  ${shorten}",
		      LINK: "Link",
		      SAVE: "Spremi",
		      POST: "Postavi",
		      SHOWMORE: "Pročitajte više...",
		      VIEW_COMMENTS_FILE: "Pregled komentara na ovoj datoteci",
		      SUBSCRIBE_TO_COMMENTS: "Pretplatite se na ove komentare",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Pratite promjene ovih komentara kroz čitaoc tekućih informacija",
		      PROFILE_TITLE: "Otvorite profil od ${user}.",
		      PROFILE_A11Y: "Aktiviranje ovog linka će otvoriti profil od ${user} u novom prozoru.",
		      MODERATION_PENDING: "Ovaj komentar čeka na pregled.",
		      MODERATION_REMOVED: {
		         DAY: "Ovaj komentar je uklonio ${user} ${EEEE} u ${time}.",
		         MONTH: "Ovaj komentar je uklonio ${user} ${MMM} ${d}.",
		         TODAY: "Ovaj komentar je uklonio ${user} danas u ${time}.",
		         YEAR: "Ovaj komentar je uklonio ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Ovaj komentar je uklonio ${user} jučer u ${time}.",
		         TOMORROW: "Ovaj komentar je uklonio ${user} ${MMM} ${d}, ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Ovaj komentar je odbio ${user} ${EEEE} u ${time}.",
		         MONTH: "Ovaj komentar je odbio ${user} ${MMM} ${d}.",
		         TODAY: "Ovaj komentar je odbio ${user} danas u ${time}.",
		         YEAR: "Ovaj komentar je odbio ${user} ${MMM} ${d}, ${YYYY}.",
		         YESTERDAY: "Ovaj komentar je odbio ${user} jučer u ${time}.",
		         TOMORROW: "Ovaj komentar je odbio ${user} ${MMM} ${d}, ${YYYY}."
		      },
		      PREV_COMMENTS: "Pokaži ranije komentare",
		      EMPTY: "Nema komentara.",
		      ERROR_ALT: "Greška",
		      ERROR: "Došlo je do greške prilikom pristupa komentarima. ${again}",
		      ERROR_ADDTL: "Došlo je do greške prilikom pristupa dodatnim komentarima. ${again}",
		      ERROR_AGAIN: "Pokušajte ponovo.",
		      ERROR_AGAIN_TITLE: "Probajte zahtjev ponovo za još komentara.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} u ${time} (verzija ${version})",
		         MONTH: "${user} ${MMM} ${d} (verzija ${version})",
		         TODAY: "${user} danas u ${time} (verzija ${version})",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY} (verzija ${version})",
		         YESTERDAY: "${user} jučer u ${time} (verzija ${version})",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY} (verzija ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} u ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} danas u ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} jučer u ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} u ${time}",
		         MONTH: "${MMM} ${d}",
		         TODAY: "Danas u ${time}",
		         YEAR: "${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Jučer u ${time}",
		         TOMORROW: "${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Komentar je izbrisao ${user} ${EEEE} u ${time}",
		         MONTH: "Komentar je izbrisao ${user} ${MMM} ${d}",
		         TODAY: "Komentar je izbrisao ${user} danas u ${time}",
		         YEAR: "Komentar je izbrisao ${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "Komentar je izbrisao ${user} jučer u ${time}",
		         TOMORROW: "Komentar je izbrisao ${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "${user} je uredio ${EEEE} u ${time} (verzija ${version})",
		         MONTH: "${user} je uredio ${MMM} ${d} (verzija ${version})",
		         TODAY: "${user} je uredio danas u ${time} (verzija ${version})",
		         YEAR: "${user} uređeno ${MMM} ${d}, ${YYYY} (verzija ${version})",
		         YESTERDAY: "${user} uređeno jučer u ${time} (verzija ${version})",
		         TOMORROW: "${user} uređeno ${MMM} ${d}, ${YYYY} (verzija ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "${user} uređeno ${EEEE} u ${time}",
		         MONTH: "${user} uređeno ${MMM} ${d}",
		         TODAY: "${user} uređeno danas u ${time}",
		         YEAR: "${user} uređeno ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} uređeno jučer u ${time}",
		         TOMORROW: "${user} uređeno ${MMM} ${d}, ${YYYY}"
		      },
		      DELETE_CONFIRM: "Da li ste sigurni da želite brisati ovaj komentar?",
		      FLAG_ITEM: {
		         BUSY: "Spremanje...",
		         CANCEL: "Odustani",
		         ACTION: "Označi kao neodgovarajuće",
		         DESCRIPTION_LABEL: "Navedite razlog za označavanje ove stavke (opcijski)",
		         EDITERROR: "Meta podaci datoteke nisu uređivani zbog greške",
		         OK: "Spremi",
		         ERROR_SAVING: "Došlo je do greške prilikom obrade zahtjeva. Pokušajte ponovo kasnije.",
		         SUCCESS_SAVING: "Vaša oznaka je poslata. Moderator će uskoro izvesti istraživanje.",
		         TITLE: "Označite ovu stavku kao neodgovarajuću",
		         COMMENT: {
		            TITLE: "Označi ovaj komentar kao neodgovarajući",
		            A11Y: "Ovo dugme otvara dijalog koji korisniku omogućuava da označi ovaj komentar kao neodgovarajući."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Odustani",
		      DIALOG_TITLE: "Brisanje komentara",
		      NAME: "Brisanje komentara",
		      OK: "OK",
		      TOOLTIP: "Brisanje komentara"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Odustani",
		      CONFIRM: "Skraćivanje će ukloniti tekst iza ograničenja komentara.  Kliknite 'OK' za skraćivanje ili 'Odustani' da sami uredite komentar.",
		      DIALOG_TITLE: "Skraćeni komentar",
		      NAME: "Skraćeni komentar",
		      OK: "OK",
		      TOOLTIP: "Skraćeni komentar"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Potvrda slanja",
		      CONFIRM: "Vaš komentar je poslan na pregled i bit će dostupan nakon odobrenja.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "AM",
		      FULL: "${EEEE}, ${date_long} ${time_long}",
		      PM: "PM",
		      TODAY: "danas",
		      TODAY_U: "Danas",
		      YESTERDAY: "jučer",
		      YESTERDAY_U: "Jučer",
		      ADDED: { DAY: "Dodano ${EEee} u ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Dodato ${date_long}",
		         TODAY: "Dodato danas u ${time}",
		         YEAR: "Dodato ${date_long}",
		         YESTERDAY: "Dodato jučer u ${time}"
		      },
		      LAST_UPDATED: { DAY: "Zadnji put ažurirano ${EEee} u ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Zadnja promjena ${date_long}",
		         TODAY: "Zadnji put ažurirano danas u ${time}",
		         YEAR: "Zadnja promjena ${date_long}",
		         YESTERDAY: "Zadnji put ažurirano jučer u ${time}"
		      },
		      MONTHS_ABBR: { 0: "JAN ",
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
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Danas",
		         YEAR: "${date_short}",
		         YESTERDAY: "Jučer",
		         TOMORROW: "Sutra"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} u ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Danas u ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "Jučer u ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} u ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "Danas u ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "Jučer u ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} u ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "${date_short} u ${time}",
		         TODAY: "${date_short} u ${time}",
		         YEAR: "${date_short} u ${time}",
		         YESTERDAY: "${date_short} u ${time}",
		         TOMORROW: "${date_short} u ${time}"
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
		      UPDATED: { DAY: "Ažurirao ${EEee} u ${time}",
		         FULL: "${EEEE}, ${date_long} ${time_long}",
		         MONTH: "Ažurirano ${date_long}",
		         TODAY: "Ažurirano danas u ${time}",
		         YEAR: "Ažurirano ${date_long}",
		         YESTERDAY: "Ažurirano jučer u ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Ne može se učitati informacija o verziji.",
		      ERROR_REQUEST_CANCELLED: "Zahtjev je poništen.",
		      ERROR_REQUEST_TIMEOUT: "Server nije mogao da se kontaktirati.",
		      ERROR_REQUEST_UNKNOWN: "Došlo je do nepoznate greške.",
		      LOADING: "Učitavanje ..",
		      NO_VERSIONS: "Nema verzija",
		      INFO: "Verzija ${0} kreirao ${1} ",
		      VERSION_NUMBER: "Verzija ${0}",
		      DELETED: "Izbrisano",
		      DELETE_ALL: "Obrišite sve verzije prije verzije",
		      DELETE_VERSION_SINGLE: "Brisanje verzije ${0}",
		      DELETEERROR: "Verzija nije izbrisana zbog greške.",
		      CREATE_VERSION: "Kreiranje nove verzije",
		      CREATE_VERSION_TOOLTIP: "Kreirajte verziju ove datoteke",
		      REVERT_VERSION: "Vraćanje verzije ${0}",
		      REVERT_DESCRIPTION: "Vraćeno iz verzije ${0}",
		      PREVIOUS: "Prethodno",
		      PREVIOUS_TOOLTIP: "Prethodna stranica",
		      ELLIPSIS: "...",
		      NEXT: "Sljedeće",
		      NEXT_TOOLTIP: "Sljedeća stranica",
		      COUNT: "${0}-${1} od ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Stranica",
		      SHOW: "Pokaži",
		      ITEMS_PER_PAGE: " stavaka po stranici.",
		      DATE: {
		        AM: "AM",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} ${time_long}",
		            MONTH: "${date}",
		            TODAY: "Danas u ${time}",
		            YESTERDAY: "Jučer u ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} u ${time}",
		            YEAR: "${date_short} u ${time}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "${date_short} u ${time}",
		            TODAY: "danas u ${time}",
		            YESTERDAY: "jučer u ${time}"
		        },
		        UPDATED: { DAY: "Ažurirao ${EEee} u ${time}",
		            YEAR: "Ažurirano ${date_short}",
		            FULL: "${EEEE}, ${date_long} ${time_long}",
		            MONTH: "Ažurirano ${date_short}",
		            TODAY: "Ažurirano danas u ${time}",
		            YESTERDAY: "Ažurirano jučer u ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Brisanje verzije ${0}",
		         DOWNLOAD: "Preuzmi",
		         DOWNLOAD_TOOLTIP: "Preuzmi ovu verziju (${0})",
		         VIEW: "Pogled",
		         VIEW_TOOLTIP: "Pregled verzije ${0}",
		         REVERT: {
		            A11Y: "Ovo dugme otvara dijalog na kojem korisnik može potvrditi vraćanje datoteke iz ranije verzije. Potvrda ove akcije će rezultirati osvježavanjem sadržaja na stranici.",
		            FULL: "Vraćanje",
		            WIDGET: "Vratite ovu verziju"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Verzija se ne može izbrisati jer je već izbrisana ili vam više nije vidljiva.",
		         ERROR_ACCESS_DENIED: "Verzija se ne može izbrisati jer vi niste urednik.",
		         ERROR_TIMEOUT: "Verzija nije izbrisana zato šta nije mogao da se kontaktirati server.  Kliknite 'Obriši' za ponovni pokušaj zahtjeva.",
		         ERROR_CANCEL: "Verzija nije izbrisana zato šta je zahtjev poništen.  Kliknite 'Brisanje' za ponovni pokušaj zahtjeva.",
		         ERROR_NOT_LOGGED_IN: "Morate biti prijavljeni da biste izbrisali ovu verziju.  Kliknite 'Obriši' za prompt za prijavu.",
		         GENERIC_ERROR: "Verzija se nije mogla izbrisati zbog nepoznate greške.  Kliknite 'Obriši' za ponovni pokušaj zahtjeva.",
		         FULL: "Obriši",
		         A11Y: "Ovo dugme otvara dijalog na kojem korisnik može potvrditi brisanje ove verzije. Potvrda ove akcije će rezultirati osvježavanjem sadržaja na stranici."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Verzija se ne može vratiti jer je izbrisana ili vam više nije vidljiva.",
		         ERROR_ACCESS_DENIED: "Verzija se ne može vratiti jer vi niste urednik.",
		         ERROR_NAME_EXISTS: "Verzija se nije mogla vratiti zato šta neka druga datoteka ima isto ime.",
		         ERROR_TIMEOUT: "Verzija nije vraćena zato šta nije mogao da se kontaktirati server.  Kliknite 'Vraćanje' za ponovni pokušaj zahtjeva.",
		         ERROR_CANCEL: "Verzija nije vraćena zato šta je zahtjev poništen.  Kliknite 'Vraćanje' za ponovni pokušaj zahtjeva.",
		         ERROR_QUOTA_VIOLATION: "Verzija se nije mogla vratiti zbog ograničenja prostora.",
		         ERROR_MAX_CONTENT_SIZE: "Verzija se nije mogla vratiti zato šta je veća od najveće dozvoljene veličine datoteke od ${0}",
		         GENERIC_ERROR: "Verzija se nije mogla vratiti zbog nepoznate greške.  Kliknite 'Vraćanje' za ponovni pokušaj zahtjeva."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Pogledajte ko je preuzeo",
		      PREVIOUS: "Prethodno",
		      PREVIOUS_TOOLTIP: "Prethodna stranica",
		      ELLIPSIS: "...",
		      NEXT: "Sljedeće",
		      NEXT_TOOLTIP: "Sljedeća stranica",
		      COUNT: "${0}-${1} od ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Stranica",
		      SHOW: "Pokaži",
		      ITEMS_PER_PAGE: " stavaka po stranici.",
		      VERSION: {
		         DAY: "Verzija ${version} od ${date}",
		         MONTH: "Verzija ${version} od ${date}",
		         TODAY: "Verzija ${version} u ${time}",
		         YEAR: "Verzija ${version} od ${date}",
		         YESTERDAY: "Verzija ${version} jučer"
		      },
		      FILE: {
		         V_LATEST: "Preuzeli ste zadnju verziju ove datoteke",
		         V_OLDER: "Vaša zadnja preuzeta verzija ${0} ove datoteke",
		         LOADING: "Učitavanje...",
		         EMPTY: "Samo anonimni korisnici",
		         ERROR: "Ne mogu se učitati informacije o preuzimanju"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Greška",
		      ERROR_ALT_TEXT: "Greška:",
		      ERROR_MSG_GENERIC: "Desilo se nešta pogrešno.  Molimo da pokušate ponovo.",
		      ERROR_MSG_NOT_AVAILABLE: "Ova stavka je izbrisana ili više nije dostupna.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Sadržaj za ovu stavku nije dostupan.",
		      ERROR_MSG_NO_ACCESS: "Više nemate pristup ovoj stavci.",
		      LOADING: "Učitavanje...",
		      TITLE_SU: "${author} je objavio poruku.",
		      TITLE_NI: "${author} vas je pozvao da se pridružite njihovoj mreži.",
		      AUTHOR_TITLE: "Pregled profila za ${author}",
		      OPEN_LINK: "Otvorite ${title}",
		      CONFIRM_CLOSE_TITLE: "Potvrda",
		      CONFIRM_CLOSE_MESSAGE: "Da li ste sigurni da želite zanemariti vaše promjene? Pritisnite OK za nastavak ili Odustani za povratak",
		      OK: "OK",
		      CANCEL: "Odustani"
		   },
		   MESSAGE: {
		      SUCCESS: "Potvrda",
		      ERROR: "Greška",
		      ERROR_ALT_TEXT: "Greška:",
		      INFO: "Informacije",
		      WARNING: "Upozorenje",
		      DISMISS: "Sakrij ovu poruku",
		      MORE_DETAILS: "Više detalja",
		      HIDE_DETAILS: "Sakrij detalje"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Kreirano: ${EEEE} u ${time}",
		           MONTH: "Kreirano: ${MMM} ${d}",
		           TODAY: "Kreirano: danas u ${time}",
		           YEAR: "Kreirano: ${MMM} ${d}, ${YYYY}",
		           YESTERDAY: "Kreirano: jučer u ${time}",
		           TOMORROW: "Kreirano: ${MMM} ${d}, ${YYYY}"
		       },
		      error: "Došlo je do greške.  ${again}.",
		      error_again: "Molimo da pokušate ponovo",
		      error_404: "Ažuriranje statusa više ne postoji.",
		      notifications: {
		         STATUS_UPDATE: "${user} je objavio poruku",
		         USER_BOARD_POST: "${user} je pisao na vašu tablu",
		         POST_COMMENT: "${user} je napisao:"
		      }
		   },
		   login: {
		      error: "Vaše ime i/ili lozinka korisnika ne odgovaraju nijednom postojećem računu. Molimo da pokušate ponovo.",
		      logIn: "Prijava",
		      password: "Lozinka:",
		      user: "Ime korisnika:",
		      welcome: "Prijava na HCL Connections"
		   },
		   repost: {
		      name: "Ponovi objavu",
		      title: "Ponovo objavi ovo ažuriranje mojim sljedbenicima ili zajednici",
		      msg_success: "Ažuriranje je uspješno ponovo objavljeno vašim sljedbenicima.",
		      msg_generic: "Desilo se nešta pogrešno.  Molimo da pokušate ponovo."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Dodaj",
		      ADD_TXT: "Dodaj osobe ili zajednice kao čitaoce",
		      SHOW_MORE: "Prikaži više...",
		      READER_IF_PUBLIC: "Svako (javno)",
		      READER_IF_PUBLIC_TOOLTIP: "Ova datoteka je javna i svima vidljiva",
		      EMPTY_READERS: "Ništa",
		      READERS_LABEL: "Čitaoci:\u00a0",
		      EDITORS_LABEL: "Editori:\u00a0",
		      OWNER_LABEL: "Vlasnik:\u00a0",
		      ERROR: "Ne mogu se učitati informacije o dijeljenju",
		      ERROR_NOT_FOUND: "Datoteka koju ste zahtijevali je izbrisana ili premještena. Ako vam je neko poslao ovaj link provjerite da li je ispravna.",
		      ERROR_ACCESS_DENIED: "Nemate dozvolu za gledanje ove datoteke.  Datoteka nije javna i ne dijeli se s vama.",
		      SHARE: "Dijeli",
		      CANCEL: "Odustani",
		      SHARE_WITH: "Dijeli s:",
		      PERSON: "osoba",
		      COMMUNITY: "Zajednica",
		      PLACEHOLDER: "Ime ili e-mail osobe...",
		      MESSAGE: "Poruka:",
		      MESSAGE_TXT: "Dodajte neobaveznu poruku",
		      REMOVE_ITEM_ALT: "Ukloni ${0}",
		      NO_MEMBERS: "Ništa",
		      A11Y_READER_ADDED: "Izabrano ${0} kao čitaoc",
		      A11Y_READER_REMOVED: "Uklonjen je ${0} kao čitaoc",
		      SELF_REFERENCE_ERROR: "Ne možete dijeliti sami sa sobom.",
		      OWNER_REFERENCE_ERROR: "Ne možete dijeliti s vlasnikom datoteke.",
		      SHARE_COMMUNITY_WARN: "Dijeljenje s javnom zajednicom '${0}' će ovu datoteku učiniti javnom.",
		      SELECT_USER_ERROR: "Morate izabrati najmanje jednu osobu ili zajednicu za dijeljenje",
		      WARN_LONG_MESSAGE: "Poruka je preduga.",
		      TRIM_LONG_MESSAGE: "Skratiti poruku?",
		      ERROR_SHARING: "Datoteka se nije mogla dijeliti.  Molimo da pokušate ponovo kasnije.",
		      INFO_SUCCESS: "Datoteka je uspješno podijeljena.",
		      MAX_SHARES_ERROR: "Pređen je maksimalan broj podjela.",
		      NOT_LOGGED_IN_ERROR: "Datoteka nije dijeljena zato šta niste bili prijavljeni.  Kliknite 'Podijeli' za podjelu datoteke.",
		      TIMEOUT_ERROR: "Datoteka nije dijeljena zato šta nije mogao da se kontaktirati server.  Kliknite 'Podijeli' za ponovni pokušaj.",
		      CANCEL_ERROR: "Datoteka nije dijeljena zato šta je zahtjev poništen.  Kliknite 'Dijeli' za ponovni pokušaj.",
		      NOT_FOUND_ERROR: "Datoteka je izbrisana ili više nije vidljiva i ne može se dijeliti.",
		      ACCESS_DENIED_ERROR: "Više nemate dozvolu za dijeljenje ove datoteke.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Datoteka koja je ograničena se ne može napraviti javnom.",
		      TOOLTIP: "Dajte drugima pristup do ove datoteke"
		   },
		   HISTORY: {
		      TAB_TITLE: "Nedavna ažuriranja",
		      NO_HISTORY: "Ne postoje nedavna ažuriranja.",
		      EMPTY: "Ne može se pristupiti nedavnim ažuriranjima za ovu stavku. Stavka je izbrisana ili vi više nemate pristup ovoj stavci.",
		      MORE: "Prikaz ranijih ažuriranja",
		      ERROR_ALT: "Greška",
		      ERROR: "Došlo je do greške prilikom pristupa ažuriranju. ${again}",
		      ERROR_ADDTL: "Došlo je do greške prilikom pristupa dodatnim ažuriranjima. ${again}",
		      ERROR_AGAIN: "Pokušajte ponovo.",
		      ERROR_AGAIN_TITLE: "Probajte zahtjev ponovo za još ažuriranja.",
		      PROFILE_TITLE: "Otvorite profil od ${user}.",
		      SORT_BY: "Sort po\:",
		      SORTS: {
		         DATE: "Datum",
		         DATE_TOOLTIP: "Sortiraj od najnovije povijesti do najstarijih ažuriranja",
		         DATE_TOOLTIP_REVERSE: "Sortiraj od najstarije povijesti do najnovijih ažuriranja"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} u ${time}",
		             MONTH: "${MMM} ${d}",
		             TODAY: "Danas u ${time}",
		             YEAR: "${MMM} ${d}, ${YYYY}",
		             YESTERDAY: "Jučer u ${time}",
		             TOMORROW: "${MMM} ${d}, ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Ovaj komentar",
			   REPLY_ACTION: "Odgovor",
		       REPLY_ACTION_TOOLTIP: "Odgovor na ovaj komentar"
		   },
		   OAUTH: {
		      welcomeHeader: "Dobro došli u Connections",
		      continueBtnLabel: "Nastavak",
		      continueBtnA11y: "Aktiviranje ovog linka će otvoriti novi prozor koji će vam omogućiti ovlaštenje pristupa u Connections.",
		      clickHere: "Kliknite ovdje",
		      infoMsg: "Connections treba vaše ovlaštenje za pristup vašim podacima.",
		      authorizeGadget: "${clickHere} da ovlastite ovu aplikaciju za pristup vašim informacijama u Connections.",
		      confirmAuthorization: "${clickHere} da potvrdite da ste ovlastili ovu aplikaciju za pristup vašim informacijama u Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Aktivacija ove veze će otvoriti novi prozor koji će vam omogućiti da ovlastite pristup u Connections repozitorij biblioteke.",
		      infoMsg: "Connections repozitorij biblioteke treba vaše ovlaštenje za pristup vašim podacima.",
		      authorizeGadget: "${clickHere} da ovlastite ovu aplikaciju za pristup vašim informacijama u Connections repozitoriju biblioteke.",
		      confirmAuthorization: "${clickHere} da potvrdite da ste ovlastili ovu aplikaciju za pristup vašim informacijama u Connections repozitoriju biblioteke."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Odustani",
		      CONFIRM: "Da li ste sigurni da želite zanemariti vaše promjene?  Pritisnite OK za nastavak ili Odustani za povratak.",
		      DIALOG_TITLE: "Potvrda",
		      NAME: "Potvrda",
		      OK: "OK",
		      TOOLTIP: "Potvrda"
		   }
});
