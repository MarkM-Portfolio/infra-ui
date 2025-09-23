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
         label: "Više",
         tooltip: "Više radnji"
       },
       tags_more: "i ${0} više",
       ERROR_ALT: "Greška",
       PERSON_TITLE: "Otvori profil korisnika ${user}.",
       inactiveUser: "Korisnik ${user} (neaktivno)",
       inactiveIndicator: "(neaktivan)",
       like_error: "Vaše sviđanje nije bilo moguće sačuvati. Pokušajte ponovo kasnije.",
       vote_error: "Vaš glas nije bilo moguće sačuvati. Pokušajte ponovo kasnije."
   },
   generic: {
      untitled: "(Bez naslova)",
      tags: "Oznake:",
      tags_more: "i ${0} više",
      likes: "Označeno sa Sviđa mi se",
      comments: "Komentari",
      titleTooltip: "Idite na aplikaciju ${app}",
      error: "Nije moguće preuzeti podatke.",
      timestamp: {
         created: {
            DAY: "Kreirano u ${EEEE} u ${time}",
            MONTH: "Kreirano ${MMM} ${d}",
            TODAY: "Kreirano danas u ${time}",
            YEAR: "Kreirano ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Kreirano juče u ${time}",
            TOMORROW: "Kreirano ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Ažurirano u ${EEEE} u ${time}",
            MONTH: "Ažurirano ${MMM} ${d}",
            TODAY: "Ažurirano danas u ${time}",
            YEAR: "Ažurirano ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Ažurirano juče u ${time}",
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
      friendsInviteUpdatesDescription: "Primite ažuriranja o osobama koje pratite na početnoj stranici i u rezimeu e-pošte.",
      profile_title: "Otvori profil korisnika ${user}.",
      profile_a11y: "Aktiviranje ovog linka otvoriće profil korisnika ${user} u novom prozoru.",
      error: "Došlo je do greške.  ${again}.",
      error_again: "Pokušajte ponovo",
      error_404: "Zahtev mreže više ne postoji.",
      warning: "Upozorenje",
      messages: {
         success: {
            accept: {
            	nofollow: "Sada ste kontakti na mreži.",
            	follow: "Sada ste kontakti na mreži i pratite korisnika ${user}."
            },
            ignore: {
            	nofollow: "Ignorisali ste poziv.",
            	follow: "Ignorisali ste poziv, ali sada pratite korisnika ${user}."
            }
         },
         error: {
            accept: "Došlo je do greške tokom prihvatanja zahteva.",
            ignore: "Došlo je do greške tokom ignorisanja zahteva."
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} u ${time}",
              MONTH: "${MMM} ${d}",
              TODAY: "Danas u ${time}",
              YEAR: "${d}. ${MMM} ${YYYY}",
              YESTERDAY: "Juče u ${time}",
              TOMORROW: "${d}. ${MMM} ${YYYY}"
           }
      }
   },
   file: {
      a11y_help: "Aktiviranje ovog linka otvoriće ${name} u novom prozoru.",
      tooltip: "Otvorite ${name} u aplikaciji Datoteke",
      profile_title: "Otvori profil korisnika ${user}.",
      profile_a11y: "Aktiviranje ovog linka otvoriće profil korisnika ${user} u novom prozoru.",
      download_tooltip: "Preuzmi ovu datoteku (${0})",
      following: {
         add: "Prati datoteku",
         remove: "Prekini praćenje",
         title: "Uključite/isključite da li primate ažuriranja o ovoj datoteci"
      },
      share: {
         label: "Deljenje",
         title: "Dodeli pristup ovoj datoteci ostalim osobama"
      },
      timestamp: {
         created: {
            DAY: "Kreirano u ${EEEE} u ${time}",
            MONTH: "Kreirano ${MMM} ${d}",
            TODAY: "Kreirano danas u ${time}",
            YEAR: "Kreirano ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Kreirano juče u ${time}",
            TOMORROW: "Kreirano ${MMM} ${d}, ${YYYY}"
         },
         createdOther: {
            DAY: "Korisnik ${user} je kreirao u ${EEEE} u ${time}",
            MONTH: "Korisnik ${user} je kreirao ${MMM} ${d}",
            TODAY: "Korisnik ${user} je kreirao danas u ${time}",
            YEAR: "Korisnik ${user} je kreirao ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Korisnik ${user} je kreirao juče u ${time}",
            TOMORROW: "Korisnik ${user} je kreirao ${MMM} ${d}, ${YYYY}"
         },
         updated: {
            DAY: "Ažurirano u ${EEEE} u ${time}",
            MONTH: "Ažurirano ${MMM} ${d}",
            TODAY: "Ažurirano danas u ${time}",
            YEAR: "Ažurirano ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Ažurirano juče u ${time}",
            TOMORROW: "Ažurirano ${MMM} ${d}, ${YYYY}"
         },
         updatedOther: {
            DAY: "Korisnik ${user} je ažurirao u ${EEEE} u ${time}",
            MONTH: "Korisnik ${user} je ažurirao ${MMM} ${d}",
            TODAY: "Korisnik ${user} je ažurirao danas u ${time}",
            YEAR: "Korisnik ${user} je ažurirao dana ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Korisnik ${user} je ažurirao juče u ${time}",
            TOMORROW: "Korisnik ${user} je ažurirao dana ${MMM} ${d}, ${YYYY}"
         },
         createdCompact: {
            DAY: "Kreirano: ${EEEE} u ${time}",
            MONTH: "Kreirano: ${MMM} ${d}",
            TODAY: "Kreirano: Danas u ${time}",
            YEAR: "Kreirano: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Kreirano: Juče u ${time}",
            TOMORROW: "Kreirano: ${MMM} ${d}, ${YYYY}"
         },
         updatedCompact: {
            DAY: "Ažurirano: ${EEEE} u ${time}",
            MONTH: "Ažurirano: ${MMM} ${d}",
            TODAY: "Ažurirano: Danas u ${time}",
            YEAR: "Ažurirano: ${MMM} ${d}, ${YYYY}",
            YESTERDAY: "Ažurirano: Juče u ${time}",
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
         LINK: "Pregledaj",
         TITLE: "Pregledanje ove datoteke u novom prozoru."
      },
      TAGS: "Znakovi:",
      error: "Došlo je do greške.  ${again}.",
      error_again: "Pokušajte ponovo",
      error_404: "Datoteka više ne postoji ili nemate potrebne dozvole da joj pristupite.",
      error_403: "Nemate dozvolu da prikažete ovu datoteku. Datoteka nije javna i ne deli se sa vama.",
      notifications: {
         USER_SHARED: "Korisnik ${user} je napisao:",
         CHANGE_SUMMARY: "Korisnik ${user} obezbedio je rezime promene",
         NO_CHANGE_SUMMARY: "Korisnik ${user} nije obezbedio rezime promene",
         COMMENTED: "Korisnik ${user} je prokomentarisao"
      }
   },
   ecm_file: {
      checkedout_you: "Koje ste vi odjavili",
      checkedout_other: "Koje je odjavio korisnik ${user}",
      tooltip: "Otvorite datoteku ${name} u biblioteci",
      draft_404_info: "Nedovršena verzija je izbrisana ili se više ne deli sa vama. Objavljena verzija sada je poslednja verzija ove datoteke.",
      error_404: "Datoteka je izbrisana ili se više ne deli sa vama.",
      error_403: "Datoteka je izbrisana ili se više ne deli sa vama.",
      error_preview: "Datoteka više nije dostupna za pregled.",
      draft_review_canceled: "Redigovanje je otkazano i nedovršena verzija se više ne deli sa vama. Redigovanje se više ne zahteva.",
      switch_ee: "Prikaži nedovršenu verziju",
      switch_ee_tooltip: "Prikaži najnoviju nedovršenu verziju za ovu datoteku"
   },
   ecm_draft: {
      tooltip: "Otvorite ${name} nedovršenu verziju u biblioteci",
      community_owners: "Vlasnici zajednica",
      draft: "Nedovršena verzija",
      draft_tooltip: "Prikazivanje nedovršene verzije",
      draft_general_info: "Prethodna nedovršena verzija više ne postoji a novija nedovršena verzija je poslednja verzija.",
      draft_review_404_general_info: "Jedan od kontrolora je već glasao. Više nije potrebno da redigujete ovu nedovršenu verziju.",
      draft_review_404_request_info: "Prethodna nedovršena verzija više ne postoji, a najnovija nedovršena verzija je poslata na pregled. Zahteva se redigovanje.",
      draft_review_404_require_info: "Prethodna nedovršena verzija više ne postoji, a najnovija nedovršena verzija je poslata na pregled. Zahteva se redigovanje.",
      draft_review_request_info: "Zahteva se redigovanje.",
      draft_review_require_info: "Potrebno je redigovanje.",
      error_404: "Nedovršena verzija je izbrisana i više se ne deli sa vama.",
      error_403: "Nije moguće da prikažete ovu nedovršenu verziju jer se ne deli sa vama.",
      error_preview: "Nedovršena verzija više nije dostupna za pregled.",
      switch_ee: "Prikaži objavljenu verziju",
      switch_ee_tooltip: "Prikaži objavljenu verziju datoteke",
      review: "Redigovanje",
      reviewers: "Kontrolori",
      reviwers_addtl: "Dodatni kontrolori",
      in_review: "Nedovršena verzija na redigovanju",
      in_review_tooltip: "Prikazivanje nedovršene verzije na redigovanju",
      review_required_any: "Vlasnicima zajednice potreban je kontrolor za redigovanje nedovršene verzije.",
      review_required_all: "Vlasnicima zajednice potrebni su svi kontrolori za redigovanje nedovršene verzije.",
      review_required_generic: "Vlasnicima zajednice potrebni su ovi kontrolori za redigovanje nedovršene verzije.",
      review_additional_required: "Svi kontrolori koje je dodao podnosilac nedovršene verzije potrebni su za redigovanje nedovršene verzije.",
      reivew_submitted_date: {
         DAY: "Korisnik ${user} poslao je nedovršenu verziju na redigovanje u ${EEEE} u ${time}.",
         MONTH: "Korisnik ${user} poslao je nedovršenu verziju na redigovanje dana ${MMM} ${d}.",
         TODAY: "Korisnik ${user} poslao je nedovršenu verziju na redigovanje danas u ${time}.",
         YEAR: "Korisnik ${user} poslao je nedovršenu verziju na redigovanje dana ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Korisnik ${user} poslao je nedovršenu verziju na redigovanje juče u ${time}.",
         TOMORROW: "Korisnik ${user} poslao je nedovršenu verziju na redigovanje dana ${MMM} ${d}, ${YYYY}."
      },
      pending: "U toku",
      pending_rejected: "Redigovanje više nije potrebno jer je nedovršena verzija odbijena",
      approve: "Odobri",
      approved: "Odobreno",
      approve_tooltip: "Odobri ovu nedovršenu verziju",
      accept_success: "Odobrili ste ovu nedovršenu verziju.",
      accept_error: "Došlo je do greške tokom odobravanja ove nedovršene verzije. Pokušajte ponovo.",
      accept_info: "Odobrili ste ovu nedovršenu verziju.",
      reject: "Odbij",
      rejected: "Odbijeno",
      reject_tooltip: "Odbij ovu nedovršenu verziju",
      reject_success: "Odbili ste ovu nedovršenu verziju.",
      reject_error: "Došlo je do greške tokom odbijanja ove nedovršene verzije. Pokušajte ponovo.",
      reject_info: "Odbili ste ovu nedovršenu verziju."
   },
   authUser: {
      error: "Došlo je do greške tokom preuzimanja aktuelnog korisnika.  ${again}.",
      error_again: "Pokušajte ponovo",
      error_404: "Nije moguće pronaći potvrđenog korisnika.",
      error_403: "Nemate dozvolu da preuzmete korisničke informacije."
   },
   forum: {
      error: "Došlo je do greške.  ${again}.",
      error_again: "Pokušajte ponovo",
      error_404: "Forum više ne postoji ili nemate potrebne dozvole da mu pristupite.",
      error_403: "Nemate dozvolu da prikažete forum. Forum nije javni i ne deli se sa vama.",

      readMore: "Prikaži celu temu...",
      readMore_tooltip: "Otvori temu foruma ${name}.",
      readMore_a11y: "Aktiviranjem linka otvara se tema foruma ${name} u novom prozoru.",
      QUESTION_ANSWERED: "Postoji odgovor na ovo pitanje.",
      QUESTION_NOT_ANSWERED: "Još uvek ne postoji odgovor na ovo pitanje.",

      attachments: "${count} Prilozi",
      attachments_one: "${count} Prilog"
   },
   blog: {
      error: "Došlo je do greške.  ${again}.",
      error_again: "Pokušajte ponovo",
      error_404: "Blog više ne postoji ili nemate potrebne dozvole da mu pristupite.",
      error_403: "Nemate dozvolu da pristupite blogu. Blog nije javni i ne deli se sa vama.",
      readMore: " Pročitajte više ...",
      readMore_tooltip: "Otvori unos bloga ${name}.",
      readMore_a11y: "Aktiviranjem ovog linka otvara se unos bloga ${name} u novom prozoru.",
      graduated: "Usvojene",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Glasaj</a>",
  					TOOLTIP: 	"Glasaj za ovo"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>Izglasano</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>Izglasano</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Izglasano - opozovi radnju' href='javascript:;' id='TOGGLE_${id}'>Undo</a>",
  					TOOLTIP: 	"Ukloni glas sa ovog"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 osoba je glasalo za ovo"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 osoba glasala je za ovo"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} glasalo je za ovo"
  				}
  			},
  			LOADING: "Učitavanje...",
  			TEMPLATE_STRINGS: {
  				LIKES: "Izglasano"
  			}
  		}
   },
   idea: {
	  error_404: "Nismo u mogućnosti da sačuvamo vaš glas jer ste ili ispunili ograničenje za glasanje ili vam ideja više nije dostupna.",
      readMore_tooltip: "Otvorite ideju ${name}.",
      readMore_a11y: "Aktiviranjem ovog linka otvara se ideja ${name} u novom prozoru."
   },
   size: {
      B: "${0} bajta",
      KB: "${0} KB",
      MB: "${0} megabajta",
      GB: "${0} gigabajta"
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
      NAVIGATE_TO_REPLY: "Idite na nadređeni odgovor",
      NAVIGATE_TO_TOPIC: "Idite na nadređenu temu",
      ADD_COMMENT: "Odgovorite na temu",
      ADD_COMMENT_TOOLTIP: "Odgovorite na temu foruma",
      SHOWING_RECENT_REPLIES: "Prikazivanje ${0} najnovijih odgovora",
      PREV_COMMENTS: "Prikaži više odgovora",
      PLACEHOLDER_TXT: "Odgovori na ovu temu",
      EMPTY: "Nema odgovora.",
      TRIM_LONG_COMMENT: "Skraćeni odgovor?",
      WARN_LONG_COMMENT: "Odgovor je predugačak.  ${shorten}",
      ERROR: "Došlo je do greške tokom preuzimanja odgovora. ${again}",
      ERROR_CREATE: "Odgovor nije moguće sačuvati.  Pokušajte ponovo kasnije.",
      ERROR_CREATE_NOT_FOUND: "Odgovor nije moguće sačuvati jer je tema izbrisana ili vam više nije vidljiva.",
      ERROR_CREATE_ACCESS_DENIED: "Odgovor nije moguće sačuvati jer je tema izbrisana ili vam više nije vidljiva.",
      ERROR_CREATE_TIMEOUT: "Odgovor nije moguće sačuvati jer nismo mogli kontaktirati server.  Kliknite na stavku 'Sačuvaj' da biste pokušali ponovo.",
      ERROR_CREATE_CANCEL: "Odgovor nije moguće sačuvati jer je zahtev otkazan.  Kliknite na stavku 'Sačuvaj' da biste pokušali ponovo.",
      ERROR_CREATE_NOT_LOGGED_IN: "Potrebno je da se prijavite da biste kreirali odgovor.  Kliknite na 'Sačuvaj' kako bi od vas bilo zatraženo da se prijavite.",
      ERROR_NO_CONTENT: "Unesite odgovor i kliknite na stavku 'Sačuvaj.'  Ukoliko više ne želite da ostavite odgovor, kliknite na 'Otkaži.'",
      ERROR_UNAUTHORIZED: "Odgovor nije moguće sačuvati jer nemate ovlašćenje da ostavite odgovor.",
      COMMENT_DELETED: {
         DAY: "Odgovor je izbrisao korisnik ${user} u ${EEEE} u ${time}",
         MONTH: "Odgovor je izbrisao korisnik ${user} dana ${MMM} ${d}",
         TODAY: "Odgovor je izbrisao korisnik ${user} danas u ${time}",
         YEAR: "Odgovor je izbrisao korisnik ${user} dana ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Odgovor je izbrisao korisnik ${user} juče u ${time}",
         TOMORROW: "Odgovor je izbrisao korisnik ${user} dana ${MMM} ${d}, ${YYYY}"
      },
      REASON_FOR_DELETION: "Razlog za brisanje: ${reason}",
      REPLY_TITLE: "Odgovor: ${0}",
      SHOW_FULL_REPLY: "Prikaži ceo odgovor",
      SHOW_FULL_REPLY_TOOLTIP: "Idite na originalni odgovor u temi foruma",
      REPLY_ACTION: "Odgovori",
      REPLY_ACTION_TOOLTIP: "Odgovorite na ovaj post",
      MODERATION_PENDING: "Ovaj odgovor je redigovanje na čekanju.",
      MODERATION_QUARANTINED: "Moderator je stavio post u karantin.",
      MODERATION_REMOVED: {
         DAY: "Odgovor je korisnik ${user} uklonio u ${EEEE} u ${time}.",
         MONTH: "Odgovor je korisnik ${user} uklonio ${MMM} ${d}.",
         TODAY: "Odgovor je korisnik ${user} uklonio danas u ${time}.",
         YEAR: "Odgovor je korisnik ${user} uklonio dana ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Odgovor je korisnik ${user} uklonio juče u ${time}.",
         TOMORROW: "Odgovor je korisnik ${user} uklonio dana ${MMM} ${d}, ${YYYY}."
      },
      MODERATION_REJECTED: {
         DAY: "Odgovor je odbio korisnik ${user} u ${EEEE} u ${time}.",
         MONTH: "Odgovor je odbio korisnik ${user} dana ${MMM} ${d}.",
         TODAY: "Odgovor je odbio korisnik ${user} danas u ${time}.",
         YEAR: "Odgovor je odbio korisnik ${user} dana ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Odgovor je odbio korisnik ${user} juče u ${time}.",
         TOMORROW: "Odgovor je odbio korisnik ${user} dana ${MMM} ${d}, ${YYYY}."
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "Odgovor je poslat na pregled i biće dostupan nakon odobrenja."
   },
   COMMENTS: {
      ARIA_LABEL: "Komentari",
      PLACEHOLDER_TXT: "Dodaj komentar",
      TAB_TITLE: "Komentari (${0})",
      ACTION_NOT_SUPPORTED: "Nepodržana radnja",
      ADD_COMMENT: "Dodaj komentar",
      ADD_COMMENT_TOOLTIP: "Dodaj komentar na ovu stavku",
      CANCEL: "Otkaži",
      COMMENT_COUNT_ONE: "${0} komentar",
      COMMENT_COUNT_MANY: "${0} komentari",
      COMMENT_LABEL: "Komentar:",
      DELETE: "Izbriši",
      DELETE_TOOLTIP: "Izbriši komentar",
      DELETEREASON: "Razlog za brisanje komentara:",
      DIALOG_TITLE: "Skraćeni komentar",
      TOOLTIP: "Skraćeni komentar",
      NAME: "Skraćeni komentar",
      EDIT: "Uredi",
      EDIT_TOOLTIP: "Uredi komentar",
      ERROR_CREATE: "Nije moguće sačuvati komentar.  Pokušajte ponovo kasnije.",
      ERROR_CREATE_NOT_FOUND: "Nije moguće sačuvati komentar jer je stavka izbrisana ili vam više nije vidljiva.",
      ERROR_CREATE_ACCESS_DENIED: "Nije moguće sačuvati komentar jer je stavka izbrisana ili vam više nije vidljiva.",
      ERROR_CREATE_TIMEOUT: "Nije moguće sačuvati komentar jer nije moguće kontaktirati server.  Kliknite na stavku 'Postavi' kako biste pokušali ponovo.",
      ERROR_CREATE_CANCEL: "Nije moguće sačuvati komentar jer je zahtev otkazan.  Kliknite na stavku 'Postavi' kako biste pokušali ponovo.",
      ERROR_CREATE_NOT_LOGGED_IN: "Potrebno je da se prijavite da biste kreirali komentar.  Kliknite na stavku 'Postavi' kako biste dobili odziv da se prijavite.",
      ERROR_DELETE: "Komentar nije moguće izbrisati.  Pokušajte ponovo kasnije.",
      ERROR_DELETE_TIMEOUT: "Nije moguće izbrisati komentar zato što nije moguće kontaktirati server.  Kliknite na stavku 'Izbriši' da biste pokušali ponovo.",
      ERROR_DELETE_NOT_FOUND: "Nije moguće izbrisati komentar zato što su komentar ili stavka izbrisani ili vam više nisu vidljivi.",
      ERROR_DELETE_ACCESS_DENIED: "Nije moguće izbrisati komentar zato što je stavka izbrisana ili vam više nije vidljiva.",
      ERROR_DELETE_CANCEL: "Nije moguće izbrisati komentar zato što je zahtev otkazan.  Kliknite na stavku 'Izbriši' da biste pokušali ponovo.",
      ERROR_DELETE_NOT_LOGGED_IN: "Potrebno je da se prijavite da biste izbrisali komentar.  Kliknite na stavku 'Izbriši' da biste dobili odziv za prijavljivanje.",
      ERROR_EDIT: "Komentar nije moguće ažurirati.  Pokušajte ponovo kasnije.",
      ERROR_EDIT_ACCESS_DENIED: "Komentar nije moguće ažurirati zato što je stavka izbrisana ili vam više nije vidljiva.",
      ERROR_EDIT_NOT_FOUND: "Komentar nije moguće ažurirati zato što je stavka izbrisana ili vam više nije vidljiva.",
      ERROR_EDIT_TIMEOUT: "Nije moguće ažurirati komentar zato što nije bilo moguće kontaktirati server.  Kliknite na stavku 'Postavi' kako biste pokušali ponovo.",
      ERROR_EDIT_CANCEL: "Komentar nije moguće ažurirati zato što je zahtev otkazan.  Kliknite na stavku 'Postavi' kako biste pokušali ponovo.",
      ERROR_EDIT_NOT_LOGGED_IN: "Potrebno je da se prijavite da biste uredili komentar.  Kliknite na stavku 'Postavi' da biste dobili odziv za prijavljivanje.",
      ERROR_NO_CONTENT: "Unesite komentar i kliknite na stavku 'Postavi'.  Ako više ne želite ostaviti komentar, kliknite na stavku 'Otkaži'.",
      ERROR_NO_CONTENT_EDIT: "Unesite komentar i kliknite na stavku 'Postavi'.  Ako više ne želite urediti komentar, kliknite na stavku 'Otkaži'.",
      ERROR_UNAUTHORIZED: "Nije moguće sačuvati komentar jer nemate ovlašćenje da ostavite komentar.",
      ERROR_GENERAL: "Došlo je do greške.",
      OK: "U redu",
      YES: "Da",
      TRIM_LONG_COMMENT: "Skratiti komentar?",
      WARN_LONG_COMMENT: "Komentar je predug.  ${shorten}",
      LINK: "Link",
      SAVE: "Sačuvaj",
      POST: "Postavi",
      SHOWMORE: "Pročitajte više...",
      VIEW_COMMENTS_FILE: "Prikaži komentare na ovu datoteku",
      SUBSCRIBE_TO_COMMENTS: "Prijavite se na ove komentare",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Pratite promene ovih komentara preko fid čitača",
      PROFILE_TITLE: "Otvori profil korisnika ${user}.",
      PROFILE_A11Y: "Aktiviranje ovog linka otvoriće profil korisnika ${user} u novom prozoru.",
      MODERATION_PENDING: "Komentar čeka redigovanje.",
      MODERATION_REMOVED: {
         DAY: "Komentar je uklonio korisnik ${user} u ${EEEE} u ${time}.",
         MONTH: "Komentar je uklonio korisnik ${user} dana ${MMM} ${d}.",
         TODAY: "Komentar je uklonio korisnik ${user} danas u ${time}.",
         YEAR: "Korisnik ${user} je uklonio komentar dana ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Komentar je uklonio korisnik ${user} juče u ${time}.",
         TOMORROW: "Korisnik ${user} je uklonio ovaj komentar dana ${MMM} ${d}, ${YYYY}."
      },

      MODERATION_REJECTED: {
         DAY: "Komentar je odbio korisnik ${user} u ${EEEE} u ${time}.",
         MONTH: "Komentar je odbio korisnik ${user} dana ${MMM} ${d}.",
         TODAY: "Komentar je odbio korisnik ${user} danas u ${time}.",
         YEAR: "Korisnik ${user} je odbio ovaj komentar dana ${MMM} ${d}, ${YYYY}.",
         YESTERDAY: "Komentar je odbio korisnik ${user} juče u ${time}.",
         TOMORROW: "Korisnik ${user} je odbio ovaj komentar dana ${MMM} ${d}, ${YYYY}."
      },
      PREV_COMMENTS: "Prikaži prethodne komentare",
      EMPTY: "Nema komentara.",
      ERROR_ALT: "Greška",
      ERROR: "Došlo je do greške tokom preuzimanja komentara. ${again}",
      ERROR_ADDTL: "Došlo je do greške tokom preuzimanja dodatnih komentara. ${again}",
      ERROR_AGAIN: "Pokušajte ponovo.",
      ERROR_AGAIN_TITLE: "Pokušajte ponovo da pošaljete zahtev za više komentara.",
      COMMENT_CREATED: {
         DAY: "Korisnik ${user} u ${EEEE} u ${time} (verzija ${version})",
         MONTH: "Korisnik ${user} ${MMM} ${d} (verzija ${version})",
         TODAY: "Korisnik ${user} danas u ${time} (verzija ${version})",
         YEAR: "Korisnik ${user} ${MMM} ${d}, ${YYYY} (verzija ${version})",
         YESTERDAY: "Korisnik ${user} juče u ${time} (verzija ${version})",
         TOMORROW: "Korisnik ${user} ${MMM} ${d}, ${YYYY} (verzija ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "Korisnik ${user} u ${EEEE} u ${time}",
         MONTH: "Korisnik ${user} ${MMM} ${d}",
         TODAY: "Korisnik ${user} danas u ${time}",
         YEAR: "Korisnik ${user} ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Korisnik ${user} juče u ${time}",
         TOMORROW: "Korisnik ${user} ${MMM} ${d}, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} u ${time}",
         MONTH: "${MMM} ${d}",
         TODAY: "Danas u ${time}",
         YEAR: "${d}. ${MMM} ${YYYY}",
         YESTERDAY: "Juče u ${time}",
         TOMORROW: "${d}. ${MMM} ${YYYY}"
      },

      COMMENT_DELETED: {
         DAY: "Komentar je izbrisao korisnik ${user} u ${EEEE} u ${time}",
         MONTH: "Komentar je izbrisao korisnik ${user} u ${MMM} ${d}",
         TODAY: "Komentar je izbrisao korisnik ${user} danas u ${time}",
         YEAR: "Komentar je izbrisao korisnik ${user} dana ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Komentar je izbrisao korisnik ${user} juče u ${time}",
         TOMORROW: "Komentar je izbrisao korisnik ${user} dana ${MMM} ${d}, ${YYYY}"
      },
      COMMENT_EDITED: {
         DAY: "Korisnik ${user} je uredio u ${EEEE} u ${time} (verzija ${version})",
         MONTH: "Korisnik ${user} je uredio ${MMM} ${d} (verzija ${version})",
         TODAY: "Korisnik ${user} je uredio danas u ${time} (verzija ${version})",
         YEAR: "Korisnik ${user} je uredio dana ${MMM} ${d}, ${YYYY} (verzija ${version})",
         YESTERDAY: "Korisnik ${user} je uredio juče u ${time} (verzija ${version})",
         TOMORROW: "Korisnik ${user} je uredio dana ${MMM} ${d}, ${YYYY} (verzija ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "Korisnik ${user} je uredio u ${EEEE} u ${time}",
         MONTH: "Korisnik ${user} je uredio ${MMM} ${d}",
         TODAY: "Korisnik ${user} je uredio danas u ${time}",
         YEAR: "Korisnik ${user} je uredio dana ${MMM} ${d}, ${YYYY}",
         YESTERDAY: "Korisnik ${user} je uredio juče u ${time}",
         TOMORROW: "Korisnik ${user} je uredio dana ${MMM} ${d}, ${YYYY}"
      },

      DELETE_CONFIRM: "Želite li zaista izbrisati komentar?",
      FLAG_ITEM: {
         BUSY: "Čuvanje...",
         CANCEL: "Otkaži",
         ACTION: "Označi kao neprikladno",
         DESCRIPTION_LABEL: "Navedite razlog za označavanje ove stavke (opcionalno)",
         EDITERROR: "Metapodaci datoteke nisu uređeni zbog greške",
         OK: "Sačuvaj",
         ERROR_SAVING: "Došlo je do greške tokom obrade zahteva. Pokušajte ponovo kasnije.",
         SUCCESS_SAVING: "Oznaka je poslata. Moderator će to ubrzo ispitati.",
         TITLE: "Označi stavku kao neprikladnu",
         COMMENT: {
            TITLE: "Označi komentar kao neprikladan",
            A11Y: "Ovo dugme otvara dijalog koji omogućava korisniku da označi komentar kao neprikladan."
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "Otkaži",
      DIALOG_TITLE: "Izbriši komentar",
      NAME: "Izbriši komentar",
      OK: "U redu",
      TOOLTIP: "Izbriši komentar"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "Otkaži",
      CONFIRM: "Skraćivanje uklanja tekst duži od ograničenja za komentar.  Kliknite na dugme „U redu” kako biste skratili ili na dugme „Otkaži” kako biste sami uredili komentar.",
      DIALOG_TITLE: "Skrati komentar",
      NAME: "Skrati komentar",
      OK: "U redu",
      TOOLTIP: "Skrati komentar"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "Potvrda predavanja",
      CONFIRM: "Komentar je poslat na pregled i biće dostupan posle odobrenja.",
      OK: "U redu"
   },

   DATE: {
      AM: "pre podne",
      FULL: "${EEEE}, ${date_long} ${time_long}",
      PM: "posle podne",
      TODAY: "danas",
      TODAY_U: "Danas",
      YESTERDAY: "juče",
      YESTERDAY_U: "Juče",

      ADDED: { DAY: "Dodato u ${EEee} u ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Dodato ${date_long}",
         TODAY: "Dodato danas u ${time}",
         YEAR: "Dodato ${date_long}",
         YESTERDAY: "Dodato juče u ${time}"
      },

      LAST_UPDATED: { DAY: "Poslednje ažuriranje u ${EEee} u ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Poslednje ažuriranje ${date_long}",
         TODAY: "Poslednje ažuriranje danas u ${time}",
         YEAR: "Poslednje ažuriranje ${date_long}",
         YESTERDAY: "Poslednje ažuriranje juče u ${time}"
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
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Danas",
         YEAR: "${date_short}",
         YESTERDAY: "Juče",
         TOMORROW: "Sutra"
      },

      RELATIVE_TIME: { DAY: "${EEee} u ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_short}",
         TODAY: "Danas u ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "Juče u ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} u ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "${date_long}",
         TODAY: "Danas u ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "Juče u ${time}",
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

      UPDATED: { DAY: "Ažurirano u ${EEee} u ${time}",
         FULL: "${EEEE}, ${date_long} ${time_long}",
         MONTH: "Ažurirano ${date_long}",
         TODAY: "Ažurirano danas u ${time}",
         YEAR: "Ažurirano ${date_long}",
         YESTERDAY: "Ažurirano juče u ${time}"
      }
   },
   VERSIONS: {
      ERROR: "Nije moguće učitati informacije o verzijama.",
      ERROR_REQUEST_CANCELLED: "Zahtev je otkazan.",
      ERROR_REQUEST_TIMEOUT: "Nije moguće kontaktirati server.",
      ERROR_REQUEST_UNKNOWN: "Došlo je do nepoznate greške.",
      LOADING: "Učitavanje je u toku ..",
      NO_VERSIONS: "Nema verzija",
      INFO: "Verzija ${0} kreirana ${1} od strane ",
      VERSION_NUMBER: "Verzija ${0}",
      DELETED: "Izbrisano",
      DELETE_ALL: "Izbriši sve verzije pre verzije",
      DELETE_VERSION_SINGLE: "Izbriši verziju ${0}",
      DELETEERROR: "Verzija nije izbrisana zbog greške.",
      CREATE_VERSION: "Kreiraj novu verziju",
      CREATE_VERSION_TOOLTIP: "Kreiraj verziju ove datoteke",
      REVERT_VERSION: "Vrati verziju ${0}",
      REVERT_DESCRIPTION: "Vraćeno od verzije ${0}",
      PREVIOUS: "Prethodno",
      PREVIOUS_TOOLTIP: "Prethodna stranica",
      ELLIPSIS: "...",
      NEXT: "Sledeće",
      NEXT_TOOLTIP: "Sledeća stranica",
      COUNT: "${0} - ${1} od ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Stranica",
      SHOW: "Prikaži",
      ITEMS_PER_PAGE: " stavki po stranici.",
      DATE: {
        AM: "pre podne",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "Danas u ${time}",
            YESTERDAY: "Juče u ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} u ${time}",
            YEAR: "${date_short} u ${time}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "${date_short} u ${time}",
            TODAY: "danas u ${time}",
            YESTERDAY: "juče u ${time}"
        },
        UPDATED: { DAY: "Ažurirano u ${EEee} u ${time}",
            YEAR: "Ažurirano ${date_short}",
            FULL: "${EEEE}, ${date_long} ${time_long}",
            MONTH: "Ažurirano ${date_short}",
            TODAY: "Ažurirano danas u ${time}",
            YESTERDAY: "Ažurirano juče u ${time}"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "Izbriši verziju ${0}",
         DOWNLOAD: "Preuzmi",
         DOWNLOAD_TOOLTIP: "Preuzmi ovu verziju (${0})",
         VIEW: "Prikaz",
         VIEW_TOOLTIP: "Prikaži verziju ${0}",
         REVERT: {
            A11Y: "Ovo dugme otvara dijalog koji omogućava korisniku da potvrdi vraćanje datoteke iz prethodne verzije. Potvrda ove radnje osvežiće sadržaj na stranici.",
            FULL: "Vrati",
            WIDGET: "Vrati ovu verziju"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "Nije moguće izbrisati ovu verziju jer je već izbrisana ili vam više nije vidljiva.",
         ERROR_ACCESS_DENIED: "Nije moguće izbrisati ovu verziju jer niste urednik.",
         ERROR_TIMEOUT: "Verzija nije izbrisana zato što nije bilo moguće kontaktirati server.  Ponovo kliknite na dugme 'Izbriši' da biste ponovili zahtev.",
         ERROR_CANCEL: "Verzija nije izbrisana jer je zahtev otkazan.  Ponovo kliknite na dugme 'Izbriši' da biste ponovili zahtev.",
         ERROR_NOT_LOGGED_IN: "Potrebno je da se prijavite da biste izbrisali ovu verziju.  Kliknite na dugme 'Izbriši' da biste dobili odziv za prijavljivanje.",
         GENERIC_ERROR: "Nije moguće izbrisati verziju zbog nepoznate greške.  Ponovo kliknite na dugme 'Izbriši' da biste ponovili zahtev.",
         FULL: "Izbriši",
         A11Y: "Ovo dugme otvara dijalog koji omogućava korisniku da potvrdi brisanje ove verzije. Brisanje ove radnje osvežiće sadržaj na stranici."
      },

      REVERT: {
         ERROR_NOT_FOUND: "Nije moguće vratiti verziju jer je izbrisana ili vam više nije vidljiva.",
         ERROR_ACCESS_DENIED: "Nije moguće vratiti verziju jer niste urednik.",
         ERROR_NAME_EXISTS: "Nije bilo moguće vratiti verziju zato što druga datoteka ima isto ime.",
         ERROR_TIMEOUT: "Verzija nije vraćena zato što nije bilo moguće kontaktirati server.  Ponovo kliknite na dugme 'Vrati' da biste ponovili zahtev.",
         ERROR_CANCEL: "Verzija nije vraćena zato što je zahtev otkazan.  Ponovo kliknite na dugme 'Vrati' da biste ponovili zahtev.",
         ERROR_QUOTA_VIOLATION: "Nije bilo moguće vratiti verziju zbog ograničenja prostora.",
         ERROR_MAX_CONTENT_SIZE: "Nije bilo moguće vratiti verziju zato što je veća od maksimalno dozvoljenih ${0}",
         GENERIC_ERROR: "Nije bilo moguće vratiti verziju zbog nepoznate greške.  Ponovo kliknite na dugme 'Vrati' da biste ponovili zahtev."
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "Pogledajte ko je preuzeo...",
      PREVIOUS: "Prethodno",
      PREVIOUS_TOOLTIP: "Prethodna stranica",
      ELLIPSIS: "...",
      NEXT: "Sledeće",
      NEXT_TOOLTIP: "Sledeća stranica",
      COUNT: "${0} - ${1} od ${2}",
      COUNT_SHORT: "${0} - ${1}",
      PAGE: "Stranica",
      SHOW: "Prikaži",
      ITEMS_PER_PAGE: " stavki po stranici.",
      VERSION: {
         DAY: "Verzija ${version} od ${date}",
         MONTH: "Verzija ${version} od ${date}",
         TODAY: "Verzija ${version} u ${time}",
         YEAR: "Verzija ${version} od ${date}",
         YESTERDAY: "Verzija ${version} juče"
      },

      FILE: {
         V_LATEST: "Preuzeli ste najnoviju verziju ove datoteke",
         V_OLDER: "Poslednja preuzeta verzija ove datoteke je ${0}",
         LOADING: "Učitavanje...",
         EMPTY: "Samo Anonimni korisnici",
         ERROR: "Nije moguće učitati informacije o preuzimanju"
      }
   },

   EE_DIALOG: {
      ERROR: "Greška",
      ERROR_ALT_TEXT: "Greška:",
      ERROR_MSG_GENERIC: "Nešto nije u redu.  Pokušajte ponovo.",
      ERROR_MSG_NOT_AVAILABLE: "Stavka je izbrisana ili više nije dostupna.",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Sadržaj za ovu stavku nije dostupan.",
      ERROR_MSG_NO_ACCESS: "Više nemate pristup ovoj stavki.",
      LOADING: "Učitavanje...",
      TITLE_SU: "Korisnik ${author} je postavio poruku.",
      TITLE_NI: "Korisnik ${author} vas je pozvao da se pridružite njegovoj mreži.",
      AUTHOR_TITLE: "Prikaži profil korisnika ${author}",
      OPEN_LINK: "Otvorite ${title}",
      CONFIRM_CLOSE_TITLE: "Potvrđivanje",
      CONFIRM_CLOSE_MESSAGE: "Želite li zaista napustiti promene? Pritisnite dugme „U redu“ da biste nastavili ili dugme „Otkaži“ da biste se vratili",
      OK: "U redu",
      CANCEL: "Otkaži"
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
           TODAY: "Kreirano: Danas u ${time}",
           YEAR: "Kreirano: ${MMM} ${d}, ${YYYY}",
           YESTERDAY: "Kreirano: Juče u ${time}",
           TOMORROW: "Kreirano: ${MMM} ${d}, ${YYYY}"
       },
      error: "Došlo je do greške.  ${again}.",
      error_again: "Pokušajte ponovo",
      error_404: "Ažuriranje statusa više ne postoji.",
      notifications: {
         STATUS_UPDATE: "Korisnik ${user} postavio je poruku",
         USER_BOARD_POST: "Korisnik ${user} napisao je na tabli",
         POST_COMMENT: "Korisnik ${user} je napisao:"
      }
   },
   login: {
      error: "Korisničko ime i/ili lozinka ne podudaraju se sa postojećim nalozima. Pokušajte ponovo.",
      logIn: "Prijavi se",
      password: "Lozinka:",
      user: "Korisničko ime:",
      welcome: "Prijavite se na aplikaciju HCL Connections"
   },
   repost: {
      name: "Postavi ponovo",
      title: "Ponovo postavite ažuriranje mojim sledbenicima ili zajednicama",
      msg_success: "Ažuriranje je uspešno ponovo postavljeno vašim sledbenicima.",
      msg_generic: "Nešto nije u redu.  Pokušajte ponovo."
   },
   FILE_SHARE_INFO: {
      ADD: "Dodaj",
      ADD_TXT: "Dodaj osobe ili zajednice kao čitaoce",
      SHOW_MORE: "Prikaži više...",
      READER_IF_PUBLIC: "Svako (javno)",
      READER_IF_PUBLIC_TOOLTIP: "Ova datoteka je javna i vidljiva svakome",
      EMPTY_READERS: "Nema",
      READERS_LABEL: "Čitaoci: ",
      EDITORS_LABEL: "Urednici: ",
      OWNER_LABEL: "Vlasnik: ",
      ERROR: "Nije moguće učitati deljenje informacija",
      ERROR_NOT_FOUND: "Datoteka koju zahtevate je izbrisana ili premeštena. Ukoliko vam je neko postao ovaj link, proverite da li je ispravan.",
      ERROR_ACCESS_DENIED: "Nemate dozvolu da prikažete datoteku.  Datoteka nije javna i ne deli se sa vama.",
      SHARE: "Deljenje",
      CANCEL: "Otkaži",
      SHARE_WITH: "Deli sa:",
      PERSON: "osoba",
      COMMUNITY: "zajednica",
      PLACEHOLDER: "Ime osobe ili e-pošta...",
      MESSAGE: "Poruka:",
      MESSAGE_TXT: "Dodajte opcionu poruku",
      REMOVE_ITEM_ALT: "Ukloni ${0}",
      NO_MEMBERS: "Nema",
      A11Y_READER_ADDED: "Izabrano ${0} kao čitalac",
      A11Y_READER_REMOVED: "Uklonjeno ${0} kao čitalac",
      SELF_REFERENCE_ERROR: "Ne možete deliti sami sa sobom.",
      OWNER_REFERENCE_ERROR: "Ne možete da delite sa vlasnikom datoteke.",
      SHARE_COMMUNITY_WARN: "Deljenje sa javnom zajednicom '${0}' će učiniti datoteku javnom.",
      SELECT_USER_ERROR: "Potrebno je da izaberete najmanje jednu osobu ili zajednicu sa kojom ćete deliti",
      WARN_LONG_MESSAGE: "Poruka je predugačka.",
      TRIM_LONG_MESSAGE: "Skratiti poruku?",
      ERROR_SHARING: "Nije moguće deliti datoteku.  Pokušajte ponovo kasnije.",
      INFO_SUCCESS: "Datoteka je uspešno podeljena.",
      MAX_SHARES_ERROR: "Maksimalni broj deljenja je veći od dozvoljenog.",
      NOT_LOGGED_IN_ERROR: "Datoteka se ne deli jer niste prijavljeni.  Kliknite na stavku 'Podeli' da biste delili datoteku.",
      TIMEOUT_ERROR: "Datoteka se ne deli jer nije moguće kontaktirati server.  Kliknite na stavku 'Podeli' kako biste pokušali ponovo.",
      CANCEL_ERROR: "Datoteka se ne deli jer je zahtev otkazan.  Kliknite na stavku 'Podeli' kako biste pokušali ponovo.",
      NOT_FOUND_ERROR: "Datoteka je izbrisana ili više nije vidljiva i nije je moguće deliti.",
      ACCESS_DENIED_ERROR: "Više nemate dozvolu da delite datoteku.",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "Datoteka koji je ograničena ne može biti dostupna javnosti.",
      TOOLTIP: "Dodeli pristup ovoj datoteci ostalim osobama"
   },
   HISTORY: {
      TAB_TITLE: "Nedavne novosti",
      NO_HISTORY: "Nema nedavnih novosti.",
      EMPTY: "Nije moguće preuzeti nedavne novosti za ovu stavku. Izbrisane su ili više nemate pristup.",
      MORE: "Prikaži prethodne novosti",
      ERROR_ALT: "Greška",
      ERROR: "Došlo je do greške tokom preuzimanja novosti. ${again}",
      ERROR_ADDTL: "Došlo je do greške tokom preuzimanja dodatnih novosti. ${again}",
      ERROR_AGAIN: "Pokušajte ponovo.",
      ERROR_AGAIN_TITLE: "Pokušajte ponovo poslati zahtev za više novosti.",
      PROFILE_TITLE: "Otvori profil korisnika ${user}.",
      SORT_BY: "Sortiraj po\\:",
      SORTS: {
         DATE: "Datum",
         DATE_TOOLTIP: "Sortirajte od najnovije istorije do najkasnijih ažuriranja",
         DATE_TOOLTIP_REVERSE: "Sortirajte od najkasnije istorije do najnovijih ažuriranja"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} u ${time}",
             MONTH: "${MMM} ${d}",
             TODAY: "Danas u ${time}",
             YEAR: "${d}. ${MMM} ${YYYY}",
             YESTERDAY: "Juče u ${time}",
             TOMORROW: "${d}. ${MMM} ${YYYY}"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "Ovaj komentar",
	   REPLY_ACTION: "Odgovori",
       REPLY_ACTION_TOOLTIP: "Odgovori na ovaj komentar"
   },
   OAUTH: {
      welcomeHeader: "Dobrodošli u aplikaciju Connections",
      continueBtnLabel: "Nastavi",
      continueBtnA11y: "Aktiviranjem ovog linka otvara se novi prozor koji će omogućiti da ovlastite pristup aplikaciji Connections.",
      clickHere: "Kliknite ovde",
      infoMsg: "Aplikaciji Connections potrebna je vaša autorizacija za pristup podacima.",
      authorizeGadget: "${clickHere} da biste ovlastili ovu aplikaciju da pristupi informacijama aplikacije Connections.",
      confirmAuthorization: "${clickHere} da biste potvrdili da ste ovlastili ovu aplikaciju da pristupi informacijama aplikacije Connections."
   },
   OAUTH_FILENET: {
      continueBtnA11y: "Aktiviranjem ovog linka otvara se novi prozor koji će omogućiti da ovlastite pristup spremištu aplikacije Connections Library.",
      infoMsg: "Spremištu aplikacije Connections Library potrebna je vaša autorizacija za pristup podacima.",
      authorizeGadget: "${clickHere} da biste ovlastili ovu aplikaciju da pristupi informacijama spremišta aplikacije Connections Library.",
      confirmAuthorization: "${clickHere} da biste potvrdili da ste ovlastili ovu aplikaciju da pristupi informacijama spremišta aplikacije Connections Library."
   },
   UNSAVEDCHANGES: {
      CANCEL: "Otkaži",
      CONFIRM: "Želite li zaista napustiti promene?  Pritisnite dugme „U redu“ da biste nastavili ili dugme „Otkaži“ biste se vratili.",
      DIALOG_TITLE: "Potvrđivanje",
      NAME: "Potvrđivanje",
      OK: "U redu",
      TOOLTIP: "Potvrđivanje"
   }
})
