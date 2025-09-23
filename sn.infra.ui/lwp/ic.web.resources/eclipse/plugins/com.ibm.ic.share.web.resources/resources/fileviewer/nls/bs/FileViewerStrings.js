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

define({
      FILE_VIEWER_TITLE: "Pregled datoteke",
      FILENAME_TOOLTIP: "Uredi ime datoteke",
      ICON_TOOLTIP: "Preuzmi datoteku",
      ERROR: "Došlo je do greške.",
      SHARED_EXTERNALLY: "Dijeljeno eksterno",
      FILE_SYNCED: "Dodata za usklađivanje",
      MORE_ACTIONS: {
         TITLE: "Više akcija",
         A11Y: "Otvara se padajući izbornik s popisom više akcija za izvođenje na datoteci.",
            PANELS: {
               TITLE: "Više",
               A11Y: "Otvara padajući meni s listom skrivenih panela"
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
         NEXT_A11Y: "Ovo dugme vas vodi na sljedeću datoteku.",
         PREVIOUS_A11Y: "Ovo dugme vas vodi na raniju datoteku."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Više opcija",
            A11Y: "Ovo dugme otvara izbornik dodatnih opcija."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Uredi"
            },
            UPLOAD: {
               TITLE: "Učitaj"
            },
            CREATE: {
              TITLE: "Kreiraj"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Mijenja veličinu panela",
           USAGE: "Pritisnite dugme lijeve zagrade da promijenite veličinu panela."
       },
         CLOSE: {
            TOOLTIP: "Zatvori",
            A11Y: "Ovo dugme zatvara preglednik datoteka."
         },
         ADD_TO_FILES: {
           TOOLTIP: "Dodaj u Datoteke",
           A11Y: "Ovao dugume dodaje pripojenje u Datoteke.",
           VIEW_NOW: "Vidi odmah"
         },
         TEAR_OFF: {
           TOOLTIP: "Otvori u novom prozoru",
           A11Y: "Otvori u novom prozoru",
           ERROR_TEARING_OFF: "Došlo je do greške prilikom otvaranja novog prozora.",
           DIALOG_TITLE: "Potvrda",
           UNSAVED_CHANGES_WARNING: "Imate nespremljene promjene koje bit će izgubljene. Da li želite ipak otvoriti novi prozor?",
           OK: "Da",
           CANCEL: "Ne",
           OPEN: "Otvori",
           OPEN_ANYWAY: "Svakako otvori",
           CANCEL_ALT: "Odustani"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Novo iz datoteke",
            ACTION_NAME:"Kreiraj datoteku",
            A11Y: {
               TEXT: "Kreirajte dokument (DOC, DOCX ili ODT datoteku) iz uzorka. Te dokumente možete urediti online u Docsu.",
               PRES: "Kreirajte prezentaciju (PPT, PPTX ili ODP datoteku) iz uzorka. Te prezentacije možete urediti online u Docsu.",
               SHEET: "Kreirajte proračunsku tabelu (XLS, XLSX ili ODS datoteku) iz uzorka. Te proračunske tabele možete urediti online u Docsu."
            },
            PROMPT: {
               TEXT: "Kreirajte dokument (DOC, DOCX ili ODT datoteku) iz uzorka. Te dokumente možete urediti online u Docsu.",
               PRES: "Kreirajte prezentaciju (PPT, PPTX ili ODP datoteku) iz uzorka. Te prezentacije možete urediti online u Docsu.",
               SHEET: "Kreirajte proračunsku tabelu (XLS, XLSX ili ODS datoteku) iz uzorka. Te proračunske tabele možete urediti online u Docsu."
            },
            NAME_FIELD: "Ime:",
            EXTERNAL_FIELD: "Datoteke se mogu dijeliti s osobama izvan moje organizacije",
            EXTERNAL_DESC: "Eksterni pristup dozvoljava dijeljenje datoteka s vanjskim korisnicima (osobama izvan vaše organizacije ili preduzeća), dijeljenje foldera s vanjskim korisnicima ili zajednicama s vanjskim osobama kao članovima. Morate postaviti vanjski pristup kod učitavanja datoteke, on se kasnije ne može uključiti.",
            CREATE_BUTTON: "Kreiraj",
            CANCEL: "Odustani",
            PRE_FILL_NAMES: {
               OTT: "Dokument bez imena",
               OTS: "Proračunska tabela bez imena",
               OTP: "Prezentacija bez imena",
               DOT: "Dokument bez imena",
               XLT: "Proračunska tabela bez imena",
               POT: "Prezentacija bez imena",
               DOTX: "Dokument bez imena",
               XLTX: "Proračunska tabela bez imena",
               POTX: "Prezentacija bez imena"
            },
            ERRORS: {
               NAME_REQUIRED: "Ime dokumenta je obavezno.",
               ILLEGAL_NAME:"Ovo nije dopušteno ime dokumenta, molimo vas da navedete drugo.",
               WARN_LONG_NAME: "Ime dokumenta je predug.",
               TRIM_NAME: "Skratiti ime dokumenta?",
               SESSION_TIMEOUT: "Vaša sesija je istekla, molimo vas da se prijavite i probate ponovo.",
               DUPLICATE_NAME: "Pronađen je duplikat imena datoteke. Unesite novo ime.",
               SERVER_ERROR: "Connections server nije dostupan. Kontaktirajte administratora servera i pokušajte ponovo kasnije."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Preuzmi datoteku",
            A11Y: "Ovo dugme preuzima datoteku."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Preuzmi kao PDF",
            TOOLTIP: "Preuzmite ovu datoteku kao PDF datoteku",
            A11Y: "Ovo dugme preuzima datoteku u obliku PDF-a.",
            SUCCESS: "Uspješno ste preuzeli datoteku u obliku PDF-a.",
            ERROR: {
               DEFAULT: "Niste mogli preuzeti datoteku u obliku PDF-a.  Molimo da pokušate ponovo kasnije.",
               UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti da biste mogli preuzeti datoteku u obliku PDF-a.",
               NOT_FOUND: "Datoteka se nije mogla preuzeti u obliku PDF-a jer je izbrisana ili se ne dijeli više s vama.",
               ACCESS_DENIED: "Datoteka se nije mogla preuzeti u obliku PDF-a jer je izbrisana ili se ne dijeli više s vama."
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
                  TODAY: "Da li ste sigurni da želite nastaviti preuzimanje verzije objavljene danas u ${time}?",
                  YESTERDAY: "Da li ste sigurni da želite nastaviti preuzimanje verzije objavljene jučer u ${time}?",
                  DAY: "Da li ste sigurni da želite nastaviti preuzimanje verzije objavljene ${date}?",
                  MONTH: "Da li ste sigurni da želite nastaviti preuzimanje verzije objavljene ${date}?",
                  YEAR: "Da li ste sigurni da želite nastaviti preuzimanje verzije objavljene ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Pokaži panel detalja",
            HIDE: "Sakrij panel detalja",
            RESET: "Reset veličine panela",
            SHOW_A11Y: "Ovo dugme služi za otvaranje i zatvaranje bočnog panela. Bočni panel je trenutno zatvoren.",
            HIDE_A11Y: "Ovo dugme služi za otvaranje i zatvaranje bočnog panela. Bočni panel je trenutno otvoren.",
            RESET_A11Y: "Ovo dugme resetira bočni panel nazad na default veličinu. Bočni panel je trenutno proširen."
         },
         VIEW_DOC: {
            NAME: "Otvori u Docs Vieweru",
            TOOLTIP: "Otvori u Docs Vieweru",
            A11Y: "Ovo dugme otvara datoteku za pregled u prozoru pretraživača."
         },
         EDIT_DOC: {
            NAME: "Uredi u Docsu",
            TOOLTIP: "Uređivanje datoteke u Docsu",
            A11Y: "Ovo dugme otvara datoteku za uređivanje u Docsu unutar novog prozora."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Uredi na desktopu",
            DIALOG_TITLE: "Uredi na desktopu",
            TOOLTIP: "Uredite ovaj dokument",
            A11Y: "Ovo dugme otvara datoteku za lokalno uređivanje.",
            PROMPT: "Ova funkcija omogućuje vam uređivanje pomoću softvera instalisanog na vašem računaru.",
            INSTALL: "Prije nastavka, ${startLink}instališite konektore desktop datoteka${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Važno:",
            REMINDER: "Kad dovršite uređivanje, objaviti skicu koristeći konektore desktop datoteka.",
            SKIP_DIALOG: "Više ne prikazuj ovu poruku.",
            OK: "OK",
            CANCEL: "Odustani"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Potvrda",
            DELETE_VERSION: "Obriši verzije ${version}",
            DELETE_VERSION_AND_PRIOR: "Obriši verziju ${version} i sve ranije verzije",
            PROMPT: "Izbrisat ćete verziju ${version}. Da li želite nastaviti?",
            DELETE_PRIOR: "Takođe Obriši sve ranije verzije",
            ERROR: "Došlo je do greške prilikom brisanja verzije. Pokušajte ponovo kasnije.",
            TOOLTIP: "Izbrišite ovu verziju",
            OK: "OK",
            CANCEL: "Odustani"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Pristup linkovima",
            LINK_FILE: "Link s datotekom:",
            LINK_PREVIEW: "Link s datotekom pregleda:",
            LINK_DOWNLOAD: "Link s datotekom preuzimanja:",
            TOOLTIP: "Link s datotekom",
            OK: "Zatvori"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Preuzmi ovu verziju"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Potvrda",
            PROMPT: "Namjeravate zamijeniti trenutnu verziju ove datoteke s verzijom ${version}. Da li želite nastaviti?",
            ERROR: "Došlo je do greške prilikom vraćanja verzije. Pokušajte ponovo kasnije.",
            TOOLTIP: "Vratite ovu verziju",
            CHANGE_SUMMARY: "Vraćeno iz verzije ${version}",
            OK: "OK",
            CANCEL: "Odustani"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Potvrda",
            REMOVE_EVERYONE: "Da li ste sigurni da želite ukloniti pristup ovoj datoteci za vašu organizaciju? Ako uklonite pristup, datoteka se uklanja iz foldera i zajednica koje omogućuju pristup na nivou organizacije te samo vlasnik i osobe s kojima se datoteka dijeli mogu gledati i raditi s datotekom.",
            REMOVE_USER: "Da li ste sigurni da želite zaustaviti dijeljenje s ${user}? Ako zaustavite dijeljenje, ${user} će moći pristupiti ovoj datoteci samo kroz foldere ili ako se dijeli sa svima u vašoj organizaciji.",
            REMOVE_COMMUNITY: "Da li ste sigurni da želite ukloniti ovu datoteku iz zajednice ${communityName}?",
            REMOVE_FOLDER: "Da li ste sigurni da želite ukloniti ovu datoteku iz foldera ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Uklonite pristup vaše organizacije",
            REMOVE_USER_TOOLTIP: "Ukloni sva dijeljenja s ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Ukloni iz ove zajednice ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Ukloni iz foldera ${folderName}",
            OK: "OK",
            CANCEL: "Odustani",
            EFSS: {
              DIALOG_TITLE: "Potvrda",
              REMOVE_EVERYONE: "Da li ste sigurni da želite ukloniti pristup ovoj datoteci za vašu organizaciju? Ako je pristup uklonjen, tada je datoteka uklonjena iz foldera dozvoljavajući pristup nivoa organizacije i samo vlasnik i osobe s kojima je dijeljena mogu je vidjeti i raditi s njom.",
              REMOVE_USER: "Da li ste sigurni da želite zaustaviti dijeljenje s ${user}? Ako zaustavite dijeljenje, ${user} će moći pristupiti ovoj datoteci samo kroz foldere ili ako se dijeli sa svima u vašoj organizaciji.",
              REMOVE_COMMUNITY: "Da li ste sigurni da želite ukloniti ovu datoteku iz zajednice ${communityName}?",
              REMOVE_FOLDER: "Da li ste sigurni da želite ukloniti ovu datoteku iz foldera ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Uklonite pristup vaše organizacije",
              REMOVE_USER_TOOLTIP: "Ukloni sva dijeljenja s ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Ukloni iz ove zajednice ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Ukloni iz foldera ${folderName}",
              OK: "OK",
              CANCEL: "Odustani",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Uredi ovaj komentar"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Potvrda",
            PROMPT: "Da li ste sigurni da želite brisati ovaj komentar?",
            ERROR: "Došlo je do greške prilikom brisanja komentara. Pokušajte ponovo kasnije.",
            TOOLTIP: "Brisanje ovog komentara",
            OK: "OK",
            CANCEL: "Odustani"
         },
         LIKE: {
            LIKE: "Sviđa mi se datoteka",
            UNLIKE: "Ne sviđa mi se datoteka",
            LIKE_A11Y: "Ovo dugme označava sviđanje datoteke.",
            UNLIKE_A11Y: "Ovo dugme poništava sviđanje datoteke.",
            LIKED_SUCCESS: "Sviđa vam se datoteka",
            UNLIKE_SUCCESS: "Ne sviđa vam se ova datoteka"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Uredi opis",
            ERROR: {
               DEFAULT: "Opis nije mogao da se spremiti. Pokušajte ponovo kasnije.",
               UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti da biste mogli ažurirati opis.",
               NOT_FOUND: "Opis nije mogao da se spremiti jer je datoteka izbrisana ili se ne dijeli više s vama.",
               ACCESS_DENIED: "Opis nije mogao da se spremiti jer je datoteka izbrisana ili se ne dijeli više s vama."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Greška spremanja imena datoteke",
               CONFLICT: "Ime datoteke već postoji"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Došlo je do greške prilikom slijeđenja ove datoteke. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Vaša sesija je istekla. Prije slijeđenja ove datoteke se morate ponovo prijaviti.",
                  NOT_FOUND: "Ne možete slijediti ovu datoteku jer je obrisana ili se ne dijeli više s vama.",
                  ACCESS_DENIED: "Ne možete slijediti ovu datoteku jer je obrisana ili se ne dijeli više s vama."
               },
               UNFOLLOW: {
                  DEFAULT: "Došlo je do greške prilikom prestanka slijeđenja ove datoteke. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti prije nego prestanete slijediti ovu datoteku.",
                  NOT_FOUND: "Ne možete prestati slijediti ovu datoteku jer je obrisana ili se ne dijeli više s vama.",
                  ACCESS_DENIED: "Ne možete prestati slijediti ovu datoteku jer je obrisana ili se ne dijeli više s vama."
               }
            },
            FOLLOW_NAME: "Prati",
            FOLLOW_TOOLTIP: "Pratite ovu datoteku",
            FOLLOW_A11Y: "Ovo dugme pokreće praćenje datoteke.",
            FOLLOW_SUCCESS: "Sada pratite ovu datoteku.",
            STOP_FOLLOWING_NAME: "Zaustavi praćenje",
            STOP_FOLLOWING_TOOLTIP: "Zaustavljanje praćenja ove datoteke",
            STOP_FOLLOWING_A11Y: "Ovo dugme zaustavlja praćenje datoteke.",
            STOP_FOLLOWING_SUCCESS: "Zaustavili ste praćenje ove datoteke."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Dodaj u Sync",
               TOOLTIP: "Dodajte ovu datoteku za sinhronizaciju",
               A11Y: "Ovo dugme dodaje datoteku za sinhronizaciju.",
               SUCCESS: "Dodali ste ovu datoteku za sinhronizaciju.",
               ERROR: {
                  DEFAULT: "Došlo je do greške kod dodavanja ove datoteke u sinhronizaciju. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti da biste mogli dodati ovu datoteku u sinhronizaciju.",
                  NOT_FOUND: "Ne možete dodati ovu datoteku u sinhronizaciju jer je datoteka izbrisana ili se ne dijeli više s vama.",
                  ACCESS_DENIED: "Ne možete dodati ovu datoteku u sinhronizaciju jer je datoteka izbrisana ili se ne dijeli više s vama."
               }
            },
            STOP_SYNC: {
               NAME: "Uklanjanje iz Sync",
               TOOLTIP: "Uklonite ovu datoteku iz sinhronizacije",
               A11Y: "Ovo dugme uklanja ovu datoteku iz sinhronizacije.",
               SUCCESS: "Uklonili ste ovu datoteku iz sinhronizacije.",
               ERROR: {
                  DEFAULT: "Došlo je do greške kod uklanjanja ove datoteke iz sinhronizacije. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti da biste mogli ukloniti ovu datoteku iz sinhronizacije.",
                  NOT_FOUND: "Ne možete ukloniti ovu datoteku iz sinhronizacije jer je datoteka izbrisana ili se ne dijeli više s vama.",
                  ACCESS_DENIED: "Ne možete ukloniti ovu datoteku iz sinhronizacije jer je datoteka izbrisana ili se ne dijeli više s vama."
               }
            }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Pinovi",
            FAVORITE_TOOLTIP: "Zakačite ovu datoteku",
            FAVORITE_A11Y: "Ovo dugme kači ovu datoteku.",
            FAVORITE_SUCCESS: "Zakačili ste ovu datoteku.",
            STOP_FAVORITEING_NAME: "Ukloni zakačeno",
            STOP_FAVORITEING_TOOLTIP: "Odkačite ovu datoteku",
            STOP_FAVORITEING_A11Y: "Ovo dugme odkačuje ovu datoteku.",
            STOP_FAVORITEING_SUCCESS: "Odkačili ste ovu datoteku."
         },
         TRASH: {
            NAME: "Premjesti u smeće",
            DIALOG_TITLE: "Potvrda",
            PROMPT: "Da li ste sigurni da želite premjestiti ovu datoteku u smeće? Kad premjestite ovu datoteku u smeće, ona nebit će dostupna osobama s kojima se trenutno dijeli.",
            ERROR: "Došlo je do greške kod brisanja datoteke. Pokušajte ponovo kasnije.",
            TOOLTIP: "Obriši ovu datoteku",
            OK: "OK",
            CANCEL: "Odustani",
            A11Y: "Ovo dugme premješta datoteku u smeće.",
            SUCCESS_MSG: "${file} je premješteno u smeće."
         },
         REFRESH: {
            NAME: "Osvježi",
            ERROR: "Došlo je do greške prilikom osvježavanja File Viewera. Pokušajte ponovo kasnije.",
            TOOLTIP: "Osvježite File Viewer",
            INFO_MSG: "Osvježite da bi ste dobili najnoviji sadržaj. ${link}",
            A11Y: "Ovo dugme premješta datoteku u smeće.",
            SUCCESS_MSG: "Sadržaj je uspješno osvježen."
         },
         COPY_FILE: {
            NAME: "Dajte kopiju zajednici",
            DIALOG_TITLE: "Potvrda",
            ERROR: "Došlo je do greške kod kopiranja datoteke. Pokušajte ponovo kasnije.",
            TOOLTIP: "Predaj kopiju ove datoteke zajednici",
            OK: "OK",
            CANCEL: "Odustani",
            A11Y: "Ovo dugme otvara dijalog koji omogućuje dodjeljivanje kopije ove datoteke zajednici.",
            SUCCESS_MSG: "${file} je kopirano u ${community}."
         },
         UPLOAD_VERSION: {
            NAME: "Predaj novu verziju",
            NAME_SHORT: "Učitaj",
            CHANGE_SUMMARY: "Opcijski rezime promjena...",
            TOOLTIP: "Predajte novu verziju ove datoteke",
            A11Y: "Ovo dugme otvara dijalog koji omogućuje slanje nove verzije ove datoteke."
         },
         LOG_IN: {
            NAME: "Prijava",
            TOOLTIP: "Prijavite se da biste prenosili i dijelili datoteke, komentarisali i kreirali foldere."
         },
         LOCK: {
            NAME: "Zaključaj datoteku",
            TITLE: "Zaključavanje datoteke",
            A11Y: "Zaključavanje datoteke",
            SUCCESS: "Datoteka je sada zaključana.",
            ERROR: "Datoteka se nije mogla zaključati jer je izbrisana ili se ne dijeli više s vama."
         },
         UNLOCK: {
            NAME: "Otključaj datoteku",
            TITLE: "Otključavanje datoteke",
            A11Y: "Otključavanje datoteke",
            SUCCESS: "Datoteka je sada otključana.",
            ERROR: "Datoteka se nije mogla otključati jer je izbrisana ili se ne dijeli više s vama."
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
               A11Y: "Označite ovu datoteku kao neprimjerenu",
               PROMPT: "Osigurajte razlog za označavanje ove datoteke (opcijski):",
               OK: "Oznaka",
               CANCEL: "Odustani",
               SUCCESS: "Datoteka je označena i poslata na pregled.",
               ERROR: "Greška označavanja ove datoteke, molimo probajte kasnije."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Uspjeh",
               PROMPT: "Datoteka je označena i poslata na pregled.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Označi kao neodgovarajuće",
               TITLE: "Označi komentar",
               A11Y: "Označi ovaj komentar kao neodgovarajući",
               PROMPT: "Navedite razlog za označavanje ovog komentara (neobavezno):",
               OK: "Oznaka",
               CANCEL: "Odustani",
               SUCCESS: "Komentar je označen i poslat na pregled.",
               ERROR: "Greška označavanja ovog komentara, molimo probajte kasnije."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Uspjeh",
            PROMPT: "Promjene su predate na pregled. Ova datoteka nebit će dostupna dok se promjene ne odobre ili ne odbace.",
            CANCEL: "OK"
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
            ZOOM_IN_A11Y: "Ovo dugme povećava sliku.",
            ZOOM_OUT_A11Y: "Ovo dugme smanjuje sliku.",
            RESET_ZOOM_A11Y: "Ovo dugme resetira nivo povećanja."
         },
         VIEWER: {
            LOADING: "Učitavanje...",
            PUBLISHING: "Objavljivanje...",
            NO_PUBLISHED_VERSION: "Objavljena verzija ove datoteke nije dostupna za pregled.",
            IFRAME_TITLE: "Pregled ove datoteke",
            AUTOPUBLISH_TIMEOUT: "Odgovor servera traje predugo.  Zadnje promjene ne mogu biti objavljene."
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
         B: "${0} B",
         KB: "${0} KB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Područje teksta komentara",
         SHADOW_TEXT: "Dodavanje komentara...",
         CANNOT_ACCESS_CONTENT: "Sljedeće osobe koje ste spomenuli ne mogu vidjeti komentar jer nemaju pristup sadržaju:",
         ERROR: "Došlo je do greške kod provjere korisnika kojeg pokušavate spomenuti.",
         POST: "Pošalji",
         SAVE: "Spremi",
         CANCEL: "Odustani",
         EXTERNAL_WARNING: "Komentare mogu vidjeti osobe izvan vaše organizacije."
      },
      EDIT_BOX: {
         CANCEL: {
            TOOLTIP: "Odustani",
            A11Y: "Ovo dugme otkazuje akciju uređivanja imena datoteke."
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
         CANCEL: "Odustani",
         USER: "Osoba",
         COMMUNITY: "Zajednica",
         SHARE: "Dijeli",
         SHARE_ALT: "Share with this person",
         MEMBER_TYPE: "Tip člana",
         PERSON_SHADOW: "Upišite traženu osobu",
         COMMUNITY_SHADOW: "Upišite traženu zajednicu",
         PERSON_FULL_SEARCH: "Osoba nije navedena? Koristite puno pretraživanje...",
         COMMUNITY_FULL_SEARCH: "Zajednica nije na listi? Koristite puno pretraživanje...",
         ADD_OPTIONAL_MESSAGE: "Dodavanje opcijske poruke",
         ROLE_LABEL: "Uloga",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Čitaoc"
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
            WARN_TOO_LONG: "Ime datoteke je predugačo"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Ova datoteka može biti uređena online od osoba koje imaju HCL Docs.",
         NO_ENTITLEMENT_LINK: "Ova datoteka može biti uređena online od osoba koje imaju ${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "${users} trenutno uređuju ovu datoteku na webu.",
         UNPUBLISHED_CHANGES: "U ovoj skici postoje uređivanja koja nisu objavljena u obliku verzije.",
         PUBLISH_A_VERSION: "Objavi verziju",
         PUBLISH_SUCCESS: "Uspješno ste objavili verziju ove datoteke",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Verzija se nije mogla objaviti zbog zabranjenog pristupa.",
            NOT_FOUND: "Verzija se nije mogla objaviti jer dokument nije pronađen.",
            CANNOT_REACH_REPOSITORY: "Verzija se nije mogla objaviti jer se Docs server ne može povezati sa repozitorijem datoteka.",
            QUOTA_VIOLATION: "Verzija se nije mogla objaviti zbog ograničenja prostora. Uklonite druge datoteke i oslobodite dovoljno prostora za objavljivanje ove verzije.",
            CONVERSION_UNAVAILABLE: "Verzija se nije mogla objaviti jer nije dostupna Docs usluga konverzije. Pokušajte ponovo kasnije.",
            TOO_LARGE: "Verzija se nije mogla objaviti jer je dokument prevelik.",
            CONVERSION_TIMEOUT: "Verzija se nije mogla objaviti jer je pretvaranje dokumenta u Docs usluzi konverzije trajalo predugo. Pokušajte ponovo kasnije.",
            SERVER_BUSY: "Verzija se nije mogla objaviti jer je Docs server zauzet. Pokušajte ponovo kasnije.",
            DEFAULT: "Verzija se nije mogla objaviti jer nije dostupna Docs usluga. Pokušajte ponovo kasnije."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Vaše promjene su objavljene. ${startLink}Osvježite da vidite svoje promjene.${endLink}",
            GENERIC: "Možda ćete trebati osvježiti stranicu da vidite najnovije promjene.  ${startLink}Osvježi${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Nema komentara.",
         MODERATED: "Komentar je poslat za pregledavanje i bit će dostupan po odobrenju.",
         ERROR: {
            SAVE: {
               DEFAULT: "Vaš komentar nije mogao da se spremiti. Pokušajte ponovo kasnije.",
               UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti da možete spremiti komentar.",
               NOT_FOUND: "Vaš komentar nije mogao da se spremiti zato sta je datoteka izbrisana ili se ne dijeli više s vama.",
               ACCESS_DENIED: "Vaš komentar nije mogao da se spremiti zato sta je datoteka izbrisana ili se ne dijeli više s vama."
            },
            DELETE: {
               DEFAULT: "Vaš komentar nije mogao da se izbrisati. Pokušajte ponovo kasnije.",
               UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti da možete izbrisati komentar.",
               NOT_FOUND: "Vaš komentar nije mogao da se izbrisati zato sta je datoteka izbrisana ili se ne dijeli više s vama.",
               ACCESS_DENIED: "Vaš komentar nije mogao da se izbrisati zato sta je datoteka izbrisana ili se ne dijeli više s vama."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Spremi",
         EDIT_TAGS: "Uredi oznake",
         ERROR: {
            SAVE: {
               DEFAULT: "Oznaka se nije mogla kreirati. Pokušajte ponovo kasnije."
            },
            DELETE: {
               DEFAULT: "Oznaka se nije mogla izbrisati. Pokušajte ponovo kasnije."
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
            VIEW: "Čitaoci",
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
               ROLE: "Čitaoc",
               ADD: "Dodaj čitaoca"
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
            PROMOTED: "${user} je promovisan u višu ulogu dijeljenja."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Uspješno podijeljeno s ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Datoteka je uspješno podijeljena."
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
               CANCEL: "Odustani",
               ERROR: "Pošlo je do greške kod dodjele računa. Pokušajte ponovo kasnije.",
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
               CANCEL: "Odustani",
               ERROR: "Došlo je do greške kod dodjele računa. Pokušajte ponovo kasnije.",
               SUCCESS: "Korisnički računi uspješno su dodijeljeni."
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
               CANCEL: "Odustani",
               ERROR: "Došlo je do greške kod dodjele računa. Pokušajte ponovo kasnije.",
               SUCCESS: "Korisnički računi uspješno su dodijeljeni."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opcije dijeljenja",
         PROPAGATION: "Dozvoli da drugi dijele ovu datoteku",
         EVERYONE: "Svako može dijeliti ovu datoteku.",
         OWNER_ONLY: "Samo vlasnik može dijeliti ovu datoteku.",
         STOP_SHARE: "Zaustavi dijeljenje",
         MAKE_INTERNAL: "Zaustavi vanjsko dijeljenje",
         MAKE_INTERNAL_SUCCESS: "Ova datoteka ne može se više dijeliti s osobama izvan organizacije.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Učiniti internim?",
            PROMPT: "Ako pretvorite ovu datoteku u internu datoteku, nećete je više moći dijeliti s osobama izvan vaše organizacije. ${br}${br}" +
            "Uklonit će se sva dijeljenja s vanjskim osobama, zajednicama ili folderima.${br}${br}Pretvaranje datoteke u internu datoteku je trajno i ne može se poništiti.",
            EFSS: {
               DIALOG_TITLE: "Učiniti internim?",
               PROMPT: "Ako pretvorite ovu datoteku u internu datoteku, nećete je više moći dijeliti s osobama izvan vaše organizacije. ${br}${br}" +
               "Svako dijeljenje s vanjskim ljudima ili folderima bit će uklonjeno.${br}${br}Činjenje datoteke internom je trajno i ne može biti poništeno."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Zaustavi dijeljenje datoteke",
            PROMPT: "Da li ste sigurni da želite zaustaviti dijeljenje ove datoteke?",
            QUESTION_PUBLIC: "Ova datoteka više nebit će vidljiva za sve u vašoj organizaciji niti će se dijeliti s osobama, folderima ili zajednicama. Ova operacija se ne može poništiti.",
            QUESTION_PUBLIC_E: "Ova datoteka više nebit će vidljiva za sve u vašoj organizaciji niti će se dijeliti s osobama ili folderima. Ova operacija se ne može poništiti.",
            QUESTION: "Datoteka se više neće dijeliti s osobama ili zajednicama i uklonit će se iz svih foldera osim privatnih. Ova akcija ne može da se poništi.",
            QUESTION_E: "Ova datoteka se više neće dijeliti s osobama i uklonit će se iz svih foldera osim vaših privatnih foldera. Ova akcija ne može da se poništi."
         },
         MAKE_PRIVATE_SUCCESS: "Ova datoteka je sada privatna.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Ne može se zaustaviti dijeljenje datoteke. Pokušajte ponovo kasnije."
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
         RESTORE: "Vraćanje",
         EDIT: "Uredi",
         DELETE: "Obriši",
         OK: "OK",
         CANCEL: "Odustani",
         USER_PICTURE: "Slike od ${0}",
         FLAG: "Označi kao neodgovarajuće"
      },
      PANEL: {
         LOAD_ERROR: "Došlo je do greške kod pristupanja meta podacima ove datoteke.",
         ABOUT: {
            TITLE: "O proizvodu",
            EXPAND_BUTTON: "Proširite ovo dugme da biste vidjeli više informacija.",
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
            DOWNLOADS_HEADER: "Pogledi",
            DOWNLOADS_HEADER_MORE: "Pogledi (${0})",
            DOWNLOADS_EXPAND_ICON: "Proširite ovu ikonu da vidite ko je pregledao datoteku",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimno",
            DOWNLOADS_LATEST_VERSION: "Imate zadnju verziju datoteke",
            DOWNLOADS_LAST_VERSION: "Zadnje ste vidjeli verziju ${0} ove datoteke",
            TAGS_HEADER: "Oznake",
            DESCRIPTION_HEADER: "Opis",
            DESCRIPTION_READ_MORE: "Pročitajte više...",
            LINKS_HEADER: "Linkovi",
            SECURITY: "Sigurnost",
            FILE_ENCRYPTED: "Sadržaj datoteke je šifriran. Šifrirani sadržaj datoteke ne može se pretraživati. Sadržaj datoteke ne može se pregledati i urediti koristeći HCL Docs.",
            GET_LINKS: "Pristup linkovima...",
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
            FEED_TITLE: "Pratite promjene ovih komentara kroz čitaoc tekućih informacija"
         },
         SHARING: {
            TITLE: "Dijeljenje",
            TITLE_WITH_COUNT: "Dijeljeno (${0})",
            SHARED_WITH_FOLDERS: "Dijeljno s folderima - ${count}",
            SEE_WHO_HAS_SHARED: "Pogledajte ko je dijelio",
            COMMUNITY_FILE: "Datoteke u vlasništvu zajednice ne mogu se dijeliti s osobama ili drugim zajednicama.",
            SHARED_WITH_COMMUNITY: "Dijeljena s članovima zajednice '${0}'",
            LOGIN: "Prijava",
            NO_SHARE: "Ova datoteka još nije dodata ni u jedan folder.",
            ONE_SHARE: "Ova datoteka je u 1 folderu ili zajednici za koju nemate pristup.",
            MULTIPLE_SHARE: "Ova datoteka je u ${fileNumber} foldera ili zajednica za koje nemate pristup."
         },
         VERSIONS: {
            TITLE: "Verzije",
            TITLE_WITH_COUNT: "Verzije (${0})",
            FEED_LINK: "Tekuće informacije za ove verzije",
            FEED_TITLE: "Pratite promjene ove datoteke kroz čitaoc tekućih informacija"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Potvrda akcije",
         DIALOG_TITLE: "Potvrda",
         PROMPT: "Da li ste sigurni da želite izvesti ovu akciju?",
         ERROR: "Došlo je do greške kod izvođenja akcije. Pokušajte ponovo kasnije.",
         TOOLTIP: "Izvrši akciju",
         OK: "OK",
         CANCEL: "Odustani",
         A11Y: "Ovo dugme izvodi trenutnu akciju."
      },
      THUMBNAIL: {
         TITLE: "Sličica",
         CHANGE_LINK: "Promjena sličice...",
         ERROR: "Sličica se ne može spremiti. Pokušajte ponovo kasnije.",
         EXT_ERROR: "Izaberite datoteku s jednom od sljedećih ekstenzija: ${0}",
         SUCCESS: "Sličica je promijenjena",
         UPLOAD: "Spremi",
         CANCEL: "Odustani"
      },
      UPLOAD_VERSION: {
         LINK: "Predaj novu verziju...",
         CHANGE_SUMMARY: "Opcijski rezime promjena...",
         ERROR: "Nova verzija se ne može spremiti. Pokušajte ponovo kasnije.",
         SUCCESS: "Nova verzija je spremljena",
         UPLOAD: "Učitaj",
         UPLOAD_AND_CHANGE_EXTENSION: "Predaj i promijeni ekstenziju",
         CANCEL: "Odustani"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Došlo je do greške kod pristupanja datoteci. Pokušajte ponovo kasnije.",
         UNAUTHENTICATED: "Vaša sesija je istekla. Morate se ponovo prijaviti da biste mogli pregledati datoteku.",
         NOT_FOUND: "Datoteka koju ste tražili je izbrisana ili premještena. Ako vam je neko poslao ovu vezu provjerite da li je ispravna.",
         ACCESS_DENIED: "Nemate dozvolu za gledanje ove datoteke. Datoteka se ne dijeli s vama.",
         ACCESS_DENIED_ANON: "Nemate dozvolu za gledanje ove datoteke. Ako je ovo vaša datoteka ili ako se datoteka dijeli s vama, prvo se morate prijaviti."
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Potvrda",
        PROMPT: "Vaša HCL Connections sesija je istekla.${lineBreaks}Kliknite OK za ponovnu prijavu ili Odustani da zatvorite dijalog.",
        OK: "OK",
        CANCEL: "Odustani"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Ne može se pristupiti linku",
        PROMPT: "Nešta je pošlo krivo kod pristupanja linku.${lineBreaks}Kliknite OK da budete preusmjereni na stranicu.",
        OK: "OK",
        CANCEL: "Odustani"
      },
      LOAD_ERROR: {
         DEFAULT: "Ups. Došlo je do greške kod pristupanja linku.",
         ACCESS_DENIED: "Kontaktirajte vlasnika datoteke i zatražite dozvolu za pregled ove datoteke."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - datoteka",
         LOAD_ERROR: "Greška pristupa datoteci"
      }
});
