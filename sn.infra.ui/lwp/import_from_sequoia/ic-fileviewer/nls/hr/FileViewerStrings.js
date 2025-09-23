/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

//NLS_CHARSET=UTF-8

define ({
  root: {
     FILE_VIEWER_TITLE: "Pregled datoteke",
     FILENAME_TOOLTIP: "Uredi naziv datoteke",
     ICON_TOOLTIP: "Preuzmi datoteku",
     ERROR: "Dogodila se greška.",
     SHARED_EXTERNALLY: "Dijeljeno eksterno",
     FILE_SYNCED: "Dodana za usklađivanje",
     MORE_ACTIONS: {
       TITLE: "Više akcija",
       A11Y: "Otvara se padajući izbornik s popisom više akcija za izvođenje na datoteci."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Više opcija",
         A11Y: "Ovaj gumb otvara izbornik dodatnih opcija."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Uredi"
         },
         UPLOAD: {
           TITLE: "Predaj"
         }
       }
     },
     WELCOME: {
       TITLE: "Spojili smo Pregled datoteka i Detalje",
       SUBTITLE: "Sada možete gledati datoteku i njene komentare uporedo.",
       LINES: {
          LINE_1: "Sve informacije i stvari koje možete napraviti na staroj stranici se nalaze ovdje.",
          LINE_2: "Komentari, dijeljenja, verzije, i osnovne informacije dostupne su na strani datoteke."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Ovaj gumb vas vodi na sljedeću datoteku.",
      PREVIOUS_A11Y: "Ovaj gumb vas vodi na prethodnu datoteku."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Zatvori",
         A11Y: "Ovaj gumb zatvara preglednik datoteka."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Novo iz datoteke",
         ACTION_NAME:"Kreiraj datoteku",
         A11Y: {
           TEXT: "Kreirajte dokument (DOC, DOCX ili ODT datoteku) iz predloška. Te dokumente možete urediti online u Docsu.",
           PRES: "Kreirajte prezentaciju (PPT, PPTX ili ODP datoteku) iz predloška. Te prezentacije možete urediti online u Docsu.",
           SHEET: "Kreirajte proračunsku tablicu (XLS, XLSX ili ODS datoteku) iz predloška. Te proračunske tablice možete urediti online u Docsu."
         },
         PROMPT: {
           TEXT: "Kreirajte dokument (DOC, DOCX ili ODT datoteku) iz predloška. Te dokumente možete urediti online u Docsu.",
           PRES: "Kreirajte prezentaciju (PPT, PPTX ili ODP datoteku) iz predloška. Te prezentacije možete urediti online u Docsu.",
           SHEET: "Kreirajte proračunsku tablicu (XLS, XLSX ili ODS datoteku) iz predloška. Te proračunske tablice možete urediti online u Docsu."
         },
         NAME_FIELD: "Naziv:",
         EXTERNAL_FIELD: "Datoteke se mogu dijeliti s osobama izvan moje organizacije",
         EXTERNAL_DESC: "Eksterni pristup dozvoljava dijeljenje datoteka s vanjskim korisnicima (osobama izvan vaše organizacije ili poduzeća), dijeljenje foldera s vanjskim korisnicima ili zajednicama s vanjskim osobama kao članovima. Morate postaviti vanjski pristup kod učitavanja datoteke, on se kasnije ne može uključiti.",
         CREATE_BUTTON: "Kreiraj",
         CANCEL: "Opoziv",
         PRE_FILL_NAMES: {
           OTT: "Dokument bez naziva",
           OTS: "Proračunska tablica bez naziva",
           OTP: "Prezentacija bez naziva",
           DOT: "Dokument bez naziva",
           XLT: "Proračunska tablica bez naziva",
           POT: "Prezentacija bez naziva",
           DOTX: "Dokument bez naziva",
           XLTX: "Proračunska tablica bez naziva",
           POTX: "Prezentacija bez naziva"
         },
         ERRORS: {
           NAME_REQUIRED: "Naziv dokumenta je obavezan.",
           ILLEGAL_NAME:"Ovo nije dopušteni naziv dokumenta, molimo vas da navedete drugi.",
           WARN_LONG_NAME: "Naziv dokumenta je predugačak.",
           TRIM_NAME: "Skratiti naziv dokumenta?",
           SESSION_TIMEOUT: "Vaša sesija je istekla, molimo vas da se prijavite i pokušate ponovno.",
           DUPLICATE_NAME: "Pronađen je duplikat naziva datoteke. Unesite novi naziv.",
           SERVER_ERROR: "Connections poslužitelj nije dostupan. Kontaktirajte administratora poslužitelja i pokušajte ponovno kasnije."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Preuzmi datoteku",
         A11Y: "Ovaj gumb preuzima datoteku."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Preuzmi kao PDF",
         TOOLTIP: "Preuzmite ovu datoteku kao PDF datoteku",
         A11Y: "Ovaj gumb preuzima datoteku u obliku PDF-a.",
         SUCCESS: "Uspješno ste preuzeli datoteku u obliku PDF-a.",
         ERROR: {
           DEFAULT: "Niste mogli preuzeti datoteku u obliku PDF-a.  Molim, pokušajte ponovno kasnije.",
           UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovno prijaviti da biste mogli preuzeti datoteku u obliku PDF-a.",
           NOT_FOUND: "Datoteka se nije mogla preuzeti u obliku PDF-a jer je izbrisana ili se više ne dijeli s vama.",
           ACCESS_DENIED: "Datoteka se nije mogla preuzeti u obliku PDF-a jer je izbrisana ili se više ne dijeli s vama."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Nema objavljene verzije ove datoteke za preuzimanje.  Verzije se mogu objaviti u Docs editoru."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Datoteka se ne može preuzeti",
           CANCEL: "Zatvori",
           PROMPT: "Nema objavljene verzije ove datoteke za preuzimanje.",
           PROMPT2: "Verzije se mogu objaviti u Docs editoru."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Datoteka se ne može preuzeti",
           CANCEL: "Zatvori",
           PROMPT: "Nema objavljene verzije ove datoteke za preuzimanje.",
           PROMPT2: "Zatražite da vlasnika datoteke da objavi verziju ove datoteke."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Preuzimanje verzije",
           OK: "Preuzmi verziju",
           PROMPT: {
             TODAY: "Otkrivena je novija skica, uređena danas u ${time}.",
             YESTERDAY: "Otkrivena je novija skica, uređena jučer u ${time}.",
             DAY: "Otkrivena je novija skica, uređena ${date}.",
             MONTH: "Otkrivena je novija skica, uređena ${date}.",
             YEAR: "Otkrivena je novija skica, uređena ${date_long}."
           },
           PROMPT2: {
             TODAY: "Jeste li sigurni da želite nastaviti preuzimanje verzije objavljene danas u ${time}?",
             YESTERDAY: "Jeste li sigurni da želite nastaviti preuzimanje verzije objavljene jučer u ${time}?",
             DAY: "Jeste li sigurni da želite nastaviti preuzimanje verzije objavljene ${date}?",
             MONTH: "Jeste li sigurni da želite nastaviti preuzimanje verzije objavljene ${date}?",
             YEAR: "Jeste li sigurni da želite nastaviti preuzimanje verzije objavljene ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Pokaži panel detalja",
         HIDE: "Sakrij panel detalja",
         SHOW_A11Y: "Ovaj gumb služi za otvaranje i zatvaranje rubnog panela. Rubni panel je trenutno zatvoren.",
         HIDE_A11Y: "Ovaj gumb služi za otvaranje i zatvaranje rubnog panela. Rubni panel je trenutno otvoren."
       },
       VIEW_DOC: {
         NAME: "Otvori u Docs Vieweru",
         TOOLTIP: "Otvori u Docs Vieweru",
         A11Y: "Ovaj gumb otvara datoteku za pregled u prozoru pretražitelja."
       },
       EDIT_DOC: {
         NAME: "Uredi u Docsu",
         TOOLTIP: "Uređivanje datoteke u Docsu",
         A11Y: "Ovaj gumb otvara datoteku za uređivanje u Docsu unutar novog prozora."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Uredi na desktopu",
         DIALOG_TITLE: "Uredi na desktopu",
         TOOLTIP: "Uredite ovaj dokument",
         A11Y: "Ovaj gumb otvara datoteku za lokalno uređivanje.",
         PROMPT: "Ova funkcija omogućuje lokalno uređivanje datoteke.",
         IMPORTANT: "Važno:",
         REMINDER: "Kada dovršite uređivanje, morate objaviti skicu koristeći desktop konektore datoteke. Ako otvaranje datoteke nije uspješno, možda ćete trebati instalirati desktop plug-inove.",
         SKIP_DIALOG: "Više ne prikazuj ovu poruku.",
         OK: "OK",
         CANCEL: "Opoziv"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Potvrda",
         DELETE_VERSION: "Brisanje verzije ${version}",
         DELETE_VERSION_AND_PRIOR: "Izbriši verziju ${version} i sve ranije verzije",
         PROMPT: "Izbrisat ćete verziju ${version}. Da li želite nastaviti?",
         DELETE_PRIOR: "Također izbriši sve ranije verzije",
         ERROR: "Dogodila se greška prilikom brisanja verzije. Pokušajte ponovno kasnije.",
         TOOLTIP: "Izbrišite ovu verziju",
         OK: "OK",
         CANCEL: "Opoziv"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Dohvaćanje veza",
         LINK_FILE: "Poveži s datotekom:",
         LINK_PREVIEW: "Poveži s datotekom pregleda:",
         LINK_DOWNLOAD: "Poveži s datotekom preuzimanja:",
         TOOLTIP: "Poveži s datotekom",
         OK: "Zatvori"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Preuzmi ovu verziju"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Potvrda",
         PROMPT: "Namjeravate zamijeniti trenutnu verziju ove datoteke s verzijom ${version}. Da li želite nastaviti?",
         ERROR: "Dogodila se greška prilikom vraćanja verzije. Pokušajte ponovno kasnije.",
         TOOLTIP: "Vratite ovu verziju",
         CHANGE_SUMMARY: "Vraćeno iz verzije ${version}",
         OK: "OK",
         CANCEL: "Opoziv"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Potvrda",
         REMOVE_EVERYONE: "Jeste li sigurni da želite ukloniti pristup ovoj datoteci za vašu organizaciju? Ako uklonite pristup, datoteka se uklanja iz foldera i zajednica koje omogućuju pristup na razini organizacije te samo vlasnik i osobe s kojima se datoteka dijeli mogu gledati i raditi s datotekom.",
         REMOVE_USER: "Da li ste sigurni da želite zaustaviti dijeljenje s ${user}? Ako zaustavite dijeljenje, ${user} će moći pristupiti ovoj datoteci samo kroz foldere ili ako se dijeli sa svima u vašoj organizaciji.",
         REMOVE_COMMUNITY: "Jeste li sigurni da želite ukloniti ovu datoteku iz zajednice ${communityName}?",
         REMOVE_FOLDER: "Jeste li sigurni da želite ukloniti ovu datoteku iz foldera ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Uklonite pristup vaše organizacije",
         REMOVE_USER_TOOLTIP: "Ukloni sva dijeljenja s ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Ukloni iz ove zajednice ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Ukloni iz foldera ${folderName}",
         OK: "OK",
         CANCEL: "Opoziv"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Uredi ovaj komentar"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Potvrda",
         PROMPT: "Da li ste sigurni da želite brisati ovaj komentar?",
         ERROR: "Dogodila se greška prilikom brisanja komentara. Pokušajte ponovno kasnije.",
         TOOLTIP: "Brisanje ovog komentara",
         OK: "OK",
         CANCEL: "Opoziv"
       },
       LIKE: {
         LIKE: "Sviđa mi se datoteka",
         UNLIKE: "Ne sviđa mi se datoteka",
         LIKE_A11Y: "Ovaj gumb označava sviđanje datoteke.",
         UNLIKE_A11Y: "Ovaj gumb poništava sviđanje datoteke.",
         LIKED_SUCCESS: "Sviđa vam se datoteka",
         UNLIKE_SUCCESS: "Ne sviđa vam se ova datoteka"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Uredi opis",
         ERROR: {
           DEFAULT: "Opis se nije mogao spremiti. Pokušajte ponovno kasnije.",
           UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovno prijaviti da biste mogli ažurirati opis.",
           NOT_FOUND: "Opis se nije mogao spremiti jer je datoteka izbrisana ili se više ne dijeli s vama.",
           ACCESS_DENIED: "Opis se nije mogao spremiti jer je datoteka izbrisana ili se više ne dijeli s vama."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Greška spremanja naziva datoteke",
           CONFLICT: "Naziv datoteke već postoji"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Došlo je do greške prilikom slijeđenja ove datoteke. Pokušajte ponovno kasnije.",
             UNAUTHENTICATED: "Vaša sesija je istekla. Prije slijeđenja ove datoteke se morate ponovo prijaviti.",
             NOT_FOUND: "Ne možete slijediti ovu datoteku jer je obrisana ili se više ne dijeli s vama.",
             ACCESS_DENIED: "Ne možete slijediti ovu datoteku jer je obrisana ili se više ne dijeli s vama."
           },
           UNFOLLOW: {
             DEFAULT: "Došlo je do greške prilikom prestanka slijeđenja ove datoteke. Pokušajte ponovno kasnije.",
             UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti prije nego prestanete slijediti ovu datoteku.",
             NOT_FOUND: "Ne možete prestati slijediti ovu datoteku jer je obrisana ili se više ne dijeli s vama.",
             ACCESS_DENIED: "Ne možete prestati slijediti ovu datoteku jer je obrisana ili se više ne dijeli s vama."
           }
         },
         FOLLOW_NAME: "Prati",
         FOLLOW_TOOLTIP: "Pratite ovu datoteku",
         FOLLOW_A11Y: "Ovaj gumb pokreće praćenje datoteke.",
         FOLLOW_SUCCESS: "Sada pratite ovu datoteku.",
         STOP_FOLLOWING_NAME: "Zaustavi praćenje",
         STOP_FOLLOWING_TOOLTIP: "Zaustavljanje praćenja ove datoteke",
         STOP_FOLLOWING_A11Y: "Ovaj gumb zaustavlja praćenje datoteke.",
         STOP_FOLLOWING_SUCCESS: "Zaustavili ste praćenje ove datoteke."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Dodaj u Sync",
           TOOLTIP: "Dodajte ovu datoteku za sinkronizaciju",
           A11Y: "Ovaj gumb dodaje datoteku za sinkronizaciju.",
           SUCCESS: "Dodali ste ovu datoteku za sinkronizaciju.",
           ERROR: {
             DEFAULT: "Došlo je do greške kod dodavanja ove datoteke u sinkronizaciju. Pokušajte ponovno kasnije.",
             UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovno prijaviti da biste mogli dodati ovu datoteku u sinkronizaciju.",
             NOT_FOUND: "Ne možete dodati ovu datoteku u sinkronizaciju jer je datoteka izbrisana ili se više ne dijeli s vama.",
             ACCESS_DENIED: "Ne možete dodati ovu datoteku u sinkronizaciju jer je datoteka izbrisana ili se više ne dijeli s vama."
           }
         },
         STOP_SYNC: {
           NAME: "Uklanjanje iz Sync",
           TOOLTIP: "Uklonite ovu datoteku iz sinkronizacije",
           A11Y: "Ovaj gumb uklanja ovu datoteku iz sinkronizacije.",
           SUCCESS: "Uklonili ste ovu datoteku iz sinkronizacije.",
           ERROR: {
             DEFAULT: "Pojavila se greška kod uklanjanja ove datoteke iz sinkronizacije. Pokušajte ponovno kasnije.",
             UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovno prijaviti da biste mogli ukloniti ovu datoteku iz sinkronizacije.",
             NOT_FOUND: "Ne možete ukloniti ovu datoteku iz sinkronizacije jer je datoteka izbrisana ili se više ne dijeli s vama.",
             ACCESS_DENIED: "Ne možete ukloniti ovu datoteku iz sinkronizacije jer je datoteka izbrisana ili se više ne dijeli s vama."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Pribodii",
          FAVORITE_TOOLTIP: "Pribodite ovu datoteku",
          FAVORITE_A11Y: "Ovaj gumb pribada ovu datoteku.",
          FAVORITE_SUCCESS: "Priboli ste ovu datoteku.",
          STOP_FAVORITEING_NAME: "Ukloni prikačeno",
          STOP_FAVORITEING_TOOLTIP: "Odpribodite ovu datoteku",
          STOP_FAVORITEING_A11Y: "Ovaj gumb odpribada ovu datoteku.",
          STOP_FAVORITEING_SUCCESS: "Odpribodili ste ovu datoteku."
       },
       TRASH: {
         NAME: "Premjesti u smeće",
         DIALOG_TITLE: "Potvrda",
         PROMPT: "Jeste li sigurni da želite premjestiti ovu datoteku u smeće? Kada premjestite ovu datoteku u smeće, ona neće biti dostupna osobama s kojima se trenutno dijeli.",
         ERROR: "Dogodila se greška kod brisanja datoteke. Pokušajte ponovno kasnije.",
         TOOLTIP: "Izbriši ovu datoteku",
         OK: "OK",
         CANCEL: "Opoziv",
         A11Y: "Ovaj gumb premješta datoteku u smeće.",
         SUCCESS_MSG: "${file} je premješteno u smeće."
       },
       REFRESH: {
         NAME: "Osvježi",
         ERROR: "Došlo je do greške prilikom osvježavanja File Viewera. Pokušajte ponovno kasnije.",
         TOOLTIP: "Osvježite File Viewer",
         INFO_MSG: "Osvježite da bi dobili najnoviji sadržaj. ${link}",
         A11Y: "Ovaj gumb premješta datoteku u smeće.",
         SUCCESS_MSG: "Sadržaj je uspješno osvježen."
       },
       COPY_FILE: {
         NAME: "Dajte kopiju zajednici",
         DIALOG_TITLE: "Potvrda",
         ERROR: "Dogodila se greška kod kopiranja datoteke. Pokušajte ponovno kasnije.",
         TOOLTIP: "Predaj kopiju ove datoteke zajednici",
         OK: "OK",
         CANCEL: "Opoziv",
         A11Y: "Ovaj gumb otvara dijalog koji omogućuje dodjeljivanje kopije ove datoteke zajednici.",
         SUCCESS_MSG: "${file} je kopirano u ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Predaj novu verziju",
         NAME_SHORT: "Predaj",
         CHANGE_SUMMARY: "Opcijski sažetak promjena...",
         TOOLTIP: "Predajte novu verziju ove datoteke",
         A11Y: "Ovaj gumb otvara dijalog koji omogućuje predavanje nove verzije ove datoteke."
       },
       LOG_IN: {
    	   NAME: "Prijava",
    	   TOOLTIP: "Prijavite se da biste prenosili i dijelili datoteke, komentirali i kreirali foldere."
       },
       LOCK: {
          NAME: "Zaključaj datoteku",
          TITLE: "Zaključavanje datoteke",
          A11Y: "Zaključavanje datoteke",
          SUCCESS: "Datoteka je sada zaključana."
       },
       UNLOCK: {
          NAME: "Otključaj datoteku",
          TITLE: "Otključavanje datoteke",
          A11Y: "Otključavanje datoteke",
          SUCCESS: "Datoteka je sada otključana."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Uređivanje na desktopu",
          TITLE: "Uređivanje na desktopu",
          A11Y: "Uređivanje na desktopu"
       },
       FLAG: {
         FILE: {
           NAME: "Označi kao neodgovarajuće",
           TITLE: "Označavanje datoteke",
           A11Y: "Označite ovu datoteku kao neprikladnu",
           PROMPT: "Osigurajte razlog za označavanje ove datoteke (opcijski):",
           OK: "Oznaka",
           CANCEL: "Opoziv",
           SUCCESS: "Datoteka je označena i poslana na pregled.",
           ERROR: "Greška označavanja ove datoteke, molimo pokušajte kasnije."
         },
         COMMENT: {
           NAME: "Označi kao neodgovarajuće",
           TITLE: "Označi komentar",
           A11Y: "Označi ovaj komentar kao neodgovarajući",
           PROMPT: "Navedite razlog za označavanje ovog komentara (neobavezno):",
           OK: "Oznaka",
           CANCEL: "Opoziv",
           SUCCESS: "Komentar je označen i poslan na pregled.",
           ERROR: "Greška označavanja ovog komentara, molimo pokušajte kasnije."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "O ovoj datoteci",
       VIEW_FILE_DETAILS: "Pregled detalja datoteke",
       A11Y: "Aktiviranjem ove veze zatvorit će se preglednik datoteka i bit ćete usmjereni na stranicu detalja ove datoteke."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Pregled nije dostupan za ovu datoteku."
      },
      IMAGE: {
       ZOOM_IN: "Povećaj",
       ZOOM_OUT: "Smanji",
       RESET: "Reset",
       ZOOM_IN_A11Y: "Ovaj gumb povećava sliku.",
       ZOOM_OUT_A11Y: "Ovaj gumb smanjuje sliku.",
       RESET_ZOOM_A11Y: "Ovaj gumb resetira razinu povećanja."
      },
      VIEWER: {
       LOADING: "Učitavanje...",
       NO_PUBLISHED_VERSION: "Objavljena verzija ove datoteke nije dostupna za pregled.",
       IFRAME_TITLE: "Pregled ove datoteke"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Zadnji ažurirao ${user}, danas u ${time}",
       YESTERDAY: "Zadnji ažurirao ${user}, jučer u ${time}",
       DAY: "Zadnji ažurirao ${user}, ${EEee} u ${time}",
       MONTH: "Zadnji ažurirao ${user}, ${date_long}",
       YEAR: "Zadnji ažurirao ${user}, ${date_long}"
      },
      CREATED: {
       TODAY: "Kreirao ${user} danas u ${time}",
       YESTERDAY: "Kreirao ${user} jučer u ${time}",
       DAY: "Kreirao ${user}, ${EEee} u ${time}",
       MONTH: "Kreirao ${user}, ${date_long}",
       YEAR: "Kreirao ${user}, ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - danas",
       YESTERDAY: "${time} - jučer",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Danas",
       YESTERDAY: "Jučer",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Područje teksta komentara",
       SHADOW_TEXT: "Dodavanje komentara...",
       CANNOT_ACCESS_CONTENT: "Sljedeće osobe koje ste spomenuli ne mogu vidjeti komentar jer nemaju pristup sadržaju:",
       ERROR: "Pojavila se greška kod provjere korisnika kojeg pokušavate spomenuti.",
       POST: "Pošalji",
       SAVE: "Spremi",
       CANCEL: "Opoziv",
       EXTERNAL_WARNING: "Komentare mogu vidjeti osobe izvan vaše organizacije."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Opoziv",
         A11Y: "Ovaj gumb otkazuje akciju uređivanja naziva datoteke."
       },
       INVALID_CHARACTERS: "Nevažeći znak",
       INVALID_CHARACTERS_REMOVED: "Uklonjeni su nevažeći znakovi"
     },
     COMMENT_WIDGET: {
       EDITED: "(Uređeno)",
       EDITED_DATE: {
         TODAY: "Uređeno danas u ${time}",
         YESTERDAY: "Uređeno jučer u ${time}",
         DAY: "Uređeno ${EEee} u ${time}",
         MONTH: "Uređeno ${date_long}",
         YEAR: "Uređeno ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Spremi",
       CANCEL: "Opoziv",
       USER: "Korisnik",
       COMMUNITY: "Zajednica",
       SHARE: "Podijeli",
       SHARE_ALT: "Dijeli s ovim korisnikom",
       MEMBER_TYPE: "Tip člana",
       PERSON_SHADOW: "Upišite traženu osobu",
       COMMUNITY_SHADOW: "Upišite traženu zajednicu",
       PERSON_FULL_SEARCH: "Osoba nije navedena? Koristite puno pretraživanje...",
       COMMUNITY_FULL_SEARCH: "Zajednica nije na listi? Koristite puno pretraživanje...",
       ADD_OPTIONAL_MESSAGE: "Dodavanje opcijske poruke",
       ROLE_LABEL: "Uloga",
       ROLE_EDIT: "Urednik",
       ROLE_VIEW: "Čitač"
     },
     FILE_STATE: {
       DOCS_FILE: "Ovo je Docs datoteka. Sva uređivanja morate izvesti online.",
       LOCKED_BY_YOU: {
         TODAY: "Zaključali ste u ${time}.",
         YESTERDAY: "Zaključali ste jučer u ${time}.",
         DAY: "Zaključali ste na ${date}.",
         MONTH: "Zaključali ste na ${date}.",
         YEAR: "Zaključali ste na ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Zaključano u ${time} od ${user}.",
         YESTERDAY: "Zaključano jučer u ${time} od ${user}.",
         DAY: "Zaključao ${date} ${user}.",
         MONTH: "Zaključao ${date} ${user}.",
         YEAR: "Zaključao ${date_long} ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Komentar je predug.",
         TRIM: "Skratiti komentar?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Opis je predug.",
         TRIM: "Skratiti opis?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Poruka je preduga.",
         TRIM: "Skratiti poruku?"
       },
       TAG: {
         WARN_TOO_LONG: "Oznaka je preduga.",
         TRIM: "Skratiti oznaku?"
       },
       TAGS: {
         WARN_TOO_LONG: "Jedna ili više oznaka su preduge.",
         TRIM: "Skratiti oznake?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Naziv datoteke je predugačak"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Ova datoteka je dostupna za online uređivanje samo ako ste kupili licencu za Docs.",
       CURRENT_EDITORS: "${users} trenutno uređuju ovu datoteku na webu.",
       UNPUBLISHED_CHANGES: "U ovoj skici postoje uređivanja koja nisu objavljena u obliku verzije.",
       PUBLISH_A_VERSION: "Objavi verziju",
       PUBLISH_SUCCESS: "Uspješno ste objavili verziju ove datoteke",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Verzija se nije mogla objaviti zbog zabranjenog pristupa.",
         NOT_FOUND: "Verzija se nije mogla objaviti jer dokument nije pronađen.",
         CANNOT_REACH_REPOSITORY: "Verzija se nije mogla objaviti jer se Docs poslužitelj ne može povezati sa spremištem datoteka.",
         QUOTA_VIOLATION: "Verzija se nije mogla objaviti zbog ograničenja prostora. Uklonite druge datoteke i oslobodite dovoljno prostora za objavljivanje ove verzije.",
         CONVERSION_UNAVAILABLE: "Verzija se nije mogla objaviti jer nije dostupna Docs usluga konverzije. Pokušajte ponovno kasnije.",
         TOO_LARGE: "Verzija se nije mogla objaviti jer je dokument prevelik.",
         CONVERSION_TIMEOUT: "Verzija se nije mogla objaviti jer je konvertiranje dokumenta u Docs usluzi konverzije trajalo predugo. Pokušajte ponovno kasnije.",
         SERVER_BUSY: "Verzija se nije mogla objaviti jer je Docs poslužitelj zauzet. Pokušajte ponovno kasnije.",
         DEFAULT: "Verzija se nije mogla objaviti jer nije dostupna Docs usluga. Pokušajte ponovno kasnije."
       }
     },
     COMMENTS: {
       EMPTY: "Nema komentara.",
       MODERATED: "Komentar je poslan za pregledavanje i bit će dostupan po odobrenju.",
       ERROR: {
         SAVE: {
           DEFAULT: "Vaš komentar se nije mogao spremiti. Pokušajte ponovno kasnije.",
           UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovno prijaviti da možete spremiti komentar.",
           NOT_FOUND: "Vaš komentar se nije mogao spremiti zato što je datoteka izbrisana ili se više ne dijeli s vama.",
           ACCESS_DENIED: "Vaš komentar se nije mogao spremiti zato što je datoteka izbrisana ili se više ne dijeli s vama."
         },
         DELETE: {
           DEFAULT: "Vaš komentar se nije mogao izbrisati. Pokušajte ponovno kasnije.",
           UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovno prijaviti da možete izbrisati komentar.",
           NOT_FOUND: "Vaš komentar se nije mogao izbrisati zato što je datoteka izbrisana ili se više ne dijeli s vama.",
           ACCESS_DENIED: "Vaš komentar se nije mogao izbrisati zato što je datoteka izbrisana ili se više ne dijeli s vama."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Spremi",
       EDIT_TAGS: "Uredi oznake",
       ERROR: {
         SAVE: {
           DEFAULT: "Oznaka se nije mogla kreirati. Pokušajte ponovno kasnije."
         },
         DELETE: {
           DEFAULT: "Oznaka se nije mogla izbrisati. Pokušajte ponovno kasnije."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Pročitajte više...",
       READ_LESS: "Pročitajte manje..."
     },
     SHARE: {
	     EVERYONE: "Svi u mojoj organizaciji",
	     ADD_TOOLTIP: "Spremi",
	     ROLES: {
	       OWNER: "Vlasnik",
	       EDIT: "Editori",
	       VIEW: "Čitači",
	       FOLDER: "Dijeljeno s folderima"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Vlasnik"
	       },
	       EDIT: {
	         ROLE: "Uredi",
           ADD: "Dodaj editora"
	       },
	       VIEW: {
	         ROLE: "Čitač",
           ADD: "Dodaj čitača"
	       },
	       FOLDER: {
           ADD: "Dodaj foldere",
           COMMUNITY_ADD: "Dodaj u folder",
           MOVE: "Premjesti u folder"
	       },
	       MULTI: {
	         ADD: "Dodaj osobe ili zajednice",
	         ADD_PEOPLE: "Dodaj osobe"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Svi u mojoj organizaciji",
	        LONG: {
	           GENERIC: "Svi u vašoj organizaciji.",
	           ORG: "Svi u ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Ova datoteka se već dijeli s ${user}.",
	       ERROR: "Trenutno se ne može dijeliti s ${user}.",
	       SELF: "Ne možete dijeliti sami sa sobom."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} je promoviran u višu ulogu dijeljenja."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Uspješno podijeljeno s ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Opcijska poruka..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Dodjela vanjskog korisnika",
            ACTION: "Dodjela vanjskog korisnika...",
            TOOLTIP: "Dodijelite vanjskog korisnika",
            DIALOG_TITLE: "Sadržaj nije bio dijeljen",
            PROMPT: {
              NO_ACCOUNT: "Sljedeći korisnik nema račun i s njim nije podijeljen sadržaj.",
              INVITE: "Pozovite ovog korisnika kao gosta da biste dijelili sadržaj s njim."
            },
            SUBMIT: "Nastavi slanje pozivnice",
            CANCEL: "Opoziv",
            ERROR: "Pojavila se greška kod dodjele računa. Pokušajte ponovno kasnije.",
            SUCCESS: "Korisnički račun je uspješno dodijeljen."
	       },
	       PLURAL: {
	         NAME: "Dodjela vanjskih korisnika",
	         ACTION: "Dodjela vanjskih korisnika...",
	         TOOLTIP: "Dodijelite vanjske korisnike",
	         DIALOG_TITLE: "Sadržaj nije bio dijeljen",
	         PROMPT: {
	           NO_ACCOUNT: "Sljedeći korisnici nemaju račun i s njima nije podijeljen sadržaj.",
	           INVITE: "Pozovite ove korisnike kao goste da s njima podijelite sadržaj."
	         },
	         SUBMIT: "Nastavi s pozivnicama",
	         CANCEL: "Opoziv",
	         ERROR: "Pojavila se greška kod dodjele računa. Pokušajte ponovno kasnije.",
	         SUCCESS: "Korisnički računi su uspješno dodijeljeni."
	       },
	       ABSTRACT: {
	         NAME: "Dodjela vanjskih korisnika",
            ACTION: "Dodjela vanjskih korisnika...",
            TOOLTIP: "Dodijelite vanjske korisnike",
            DIALOG_TITLE: "Sadržaj nije bio dijeljen",
            PROMPT: {
              NO_ACCOUNT: "Neki korisnici nemaju račun i s njima nije podijeljen sadržaj.",
              INVITE: "Pozovite ove korisnike kao goste da s njima podijelite sadržaj."
            },
            SUBMIT: "Nastavi s pozivnicama",
            CANCEL: "Opoziv",
            ERROR: "Pojavila se greška kod dodjele računa. Pokušajte ponovno kasnije.",
            SUCCESS: "Korisnički računi su uspješno dodijeljeni."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Opcije dijeljenja",
         PROPAGATION: "Dozvoli da drugi dijele ovu datoteku",
         EVERYONE: "Svatko može dijeliti ovu datoteku.",
         OWNER_ONLY: "Samo vlasnik može dijeliti ovu datoteku.",
         STOP_SHARE: "Zaustavi dijeljenje",
         MAKE_INTERNAL: "Zaustavi vanjsko dijeljenje",
         MAKE_INTERNAL_SUCCESS: "Ova datoteka se više ne može dijeliti s osobama izvan organizacije.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Učiniti internim?",
           PROMPT: "Ako pretvorite ovu datoteku u internu datoteku, više je nećete moći dijeliti s osobama izvan vaše organizacije. ${br}${br}" +
             "Uklonit će se sva dijeljenja s vanjskim osobama, zajednicama ili folderima.${br}${br}Pretvaranje datoteke u internu datoteku je trajno i ne može se poništiti."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Zaustavi dijeljenje datoteke",
           PROMPT: "Jeste li sigurni da želite zaustaviti dijeljenje ove datoteke?",
           QUESTION_PUBLIC: "Ova datoteka više neće biti vidljiva za sve u vašoj organizaciji niti će se dijeliti s osobama, folderima ili zajednicama. Ova operacija se ne može poništiti.",
           QUESTION_PUBLIC_E: "Ova datoteka više neće biti vidljiva za sve u vašoj organizaciji niti će se dijeliti s osobama ili folderima. Ova operacija se ne može poništiti.",
           QUESTION: "Datoteka se više neće dijeliti s osobama ili zajednicama i uklonit će se iz svih foldera osim privatnih. Ova akcija se ne može poništiti.",
           QUESTION_E: "Ova datoteka se više neće dijeliti s osobama i uklonit će se iz svih foldera osim vaših privatnih foldera. Ova akcija se ne može poništiti."
         },
         MAKE_PRIVATE_SUCCESS: "Ova datoteka je sada privatna.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Ne može se zaustaviti dijeljenje datoteke. Pokušajte ponovno kasnije."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Moja dijeljenja"
	   },
	   STREAM: {
	     LOADING: "Učitavanje...",
	     LOAD_MORE: "Učitajte više..."
	   },
	   ENTRY: {
	     REMOVE: "Ukloni",
	     RESTORE: "Vrati",
	     EDIT: "Uredi",
	     DELETE: "Izbriši",
	     OK: "OK",
	     CANCEL: "Opoziv",
	     USER_PICTURE: "Slike od ${0}",
	     FLAG: "Označi kao neprikladno"
	   },
	   PANEL: {
	     LOAD_ERROR: "Pojavila se greška kod pristupanja meta podacima ove datoteke.",
	     ABOUT: {
	       TITLE: "O proizvodu",
	       EXPAND_BUTTON: "Proširite ovaj gumb da biste vidjeli više informacija.",
	       CURRENT_VERSION_HEADER: "Trenutna verzija ${versionNumber}",
	       FILE_SIZE_HEADER: "Veličina datoteke",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - trenutna verzija",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - sve verzije",
	       DOCS_DRAFT_UPDATED_HEADER: "Skica je uređena",
	       DOCS_DRAFT_CREATED_HEADER: "Skica je kreirana",
	       DOCS_UPDATED_HEADER: "Objavljeno",
	       DOCS_CREATED_HEADER: "Kreirano",
	       UPDATED_HEADER: "Ažurirano",
	       CREATED_HEADER: "Kreirano",
	       LIKES_HEADER: "Sviđanja",
	       LIKES_EXPAND_ICON: "Proširi ovu ikonu da bi vidjeli kome se je sviđala ova datoteka",
	       DOWNLOADS_HEADER: "Preuzimanja",
	       DOWNLOADS_HEADER_MORE: "Preuzimanja (${0})",
	       DOWNLOADS_EXPAND_ICON: "Proširite ovu ikonu da vidite tko je preuzeo datoteku",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimno",
	       DOWNLOADS_LATEST_VERSION: "Imate posljednju verziju datoteke",
	       DOWNLOADS_LAST_VERSION: "Vaša zadnja preuzeta verzija ${0} ove datoteke",
	       TAGS_HEADER: "Oznake",
	       DESCRIPTION_HEADER: "Opis",
	       DESCRIPTION_READ_MORE: "Pročitajte više...",
	       LINKS_HEADER: "Veze",
	       SECURITY: "Sigurnost",
	       FILE_ENCRYPTED: "Sadržaj datoteke je šifriran. Šifrirani sadržaj datoteke se ne može pretraživati. Sadržaj datoteke se ne može pregledati i urediti koristeći HCL Docs.",
	       GET_LINKS: "Dohvat poveznica...",
	       ADD_DESCRIPTION: "Dodaj opis",
	       NO_DESCRIPTION: "Nema opisa",
	       ADD_TAGS: "Dodaj oznake",
	       NO_TAGS: "Nema oznaka"
	     },
	     COMMENTS: {
	       TITLE: "Komentari",
	       TITLE_WITH_COUNT: "Komentari (${0})",
	       VERSION: "Verzija ${0}",
	       FEED_LINK: "Tekuće informacije za ove komentare",
	       FEED_TITLE: "Pratite promjene ovih komentara kroz čitač tekućih informacija"
	     },
	     SHARING: {
	       TITLE: "Dijeljenje",
	       TITLE_WITH_COUNT: "Dijeljeno (${0})",
	       SHARED_WITH_FOLDERS: "Dijeljno s folderima - ${count}",
	       SEE_WHO_HAS_SHARED: "Pogledajte tko je dijelio",
           COMMUNITY_FILE: "Datoteke u vlasništvu zajednice ne mogu se dijeliti s osobama ili drugim zajednicama.",
           SHARED_WITH_COMMUNITY: "Dijeljena s članovima zajednice '${0}'",
           LOGIN: "Prijava",
           NO_SHARE: "Ova datoteka još nije dodana ni u jedan folder.",
           ONE_SHARE: "Ova datoteka je u 1 folderu ili zajednici za koju nemate pristup.",
           MULTIPLE_SHARE: "Ova datoteka je u ${fileNumber} foldera ili zajednica za koje nemate pristup."
	     },
	     VERSIONS: {
	       TITLE: "Verzije",
	       TITLE_WITH_COUNT: "Verzije (${0})",
	       FEED_LINK: "Tekuće informacije za ove verzije",
	       FEED_TITLE: "Pratite promjene ove datoteke kroz čitač tekućih informacija"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Potvrda akcije",
       DIALOG_TITLE: "Potvrda",
       PROMPT: "Jeste li sigurni da želite izvesti ovu akciju?",
       ERROR: "Dogodila se greška kod izvođenja akcije. Pokušajte ponovno kasnije.",
       TOOLTIP: "Izvedi akciju",
       OK: "OK",
       CANCEL: "Opoziv",
       A11Y: "Ovaj gumb izvodi trenutnu akciju."
     },
     THUMBNAIL: {
       TITLE: "Sličica",
       CHANGE_LINK: "Promjena sličice...",
       ERROR: "Sličica se ne može spremiti. Pokušajte ponovno kasnije.",
       EXT_ERROR: "Izaberite datoteku s jednom od sljedećih ekstenzija: ${0}",
       SUCCESS: "Sličica je promijenjena",
       UPLOAD: "Spremi",
       CANCEL: "Opoziv"
     },
     UPLOAD_VERSION: {
       LINK: "Predaj novu verziju...",
       CHANGE_SUMMARY: "Opcijski sažetak promjena...",
       ERROR: "Nova verzija se ne može spremiti. Pokušajte ponovno kasnije.",
       SUCCESS: "Nova verzija je spremljena",
       UPLOAD: "Predaj",
       UPLOAD_AND_CHANGE_EXTENSION: "Predaj i promijeni ekstenziju",
       CANCEL: "Opoziv"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Dogodila se greška kod pristupanja datoteci. Pokušajte ponovno kasnije.",
       UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovno prijaviti da biste mogli pregledati datoteku.",
       NOT_FOUND: "Datoteka koju ste zahtijevali je izbrisana ili premještena. Ako vam je netko poslao ovu vezu provjerite da li je ispravna.",
       ACCESS_DENIED: "Nemate dozvolu za gledanje ove datoteke. Datoteka se ne dijeli s vama.",
       ACCESS_DENIED_ANON: "Nemate dozvolu za gledanje ove datoteke. Ako je ovo vaša datoteka ili ako se datoteka dijeli s vama, prvo se morate prijaviti."
     },
     LOAD_ERROR: {
       DEFAULT: "Ups. Pojavila se greška kod pristupanja vezi.",
       ACCESS_DENIED: "Kontaktirajte vlasnika datoteke i zatražite dozvolu za pregled ove datoteke."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - datoteka",
       LOAD_ERROR: "Greška pristupa datoteci"
     }
  },

   "pt-br": true,
    "ca": true,
    "cs": true,
    "da": true,
    "nl": true,
    "fi": true,
    "fr": true,
    "de": true,
    "el": true,
    "hu": true,
    "pt": true,
    "it": true,
    "ja": true,
    "ko": true,
    "no": true,
    "pl": true,
    "ru": true,
    "zh": true,
    "sl": true,
    "es": true,
    "sv": true,
    "th": true,
    "zh-tw": true,
    "tr": true
});
