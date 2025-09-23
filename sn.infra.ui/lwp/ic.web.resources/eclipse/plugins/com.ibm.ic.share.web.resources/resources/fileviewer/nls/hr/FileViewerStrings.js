/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Pregled datoteke",
      FILENAME_TOOLTIP: "Uredi naziv datoteke",
      ICON_TOOLTIP: "Preuzmite datoteku",
      ERROR: "Dogodila se greška.",
      FILE_MALICIOUS: "Skeniranje je otkrilo zlonamjerni sadržaj",
      SHARED_EXTERNALLY: "Dijeljeno eksterno",
      FILE_SYNCED: "Dodana za usklađivanje",
      MY_DRIVE: {
         TITLE: "Na Mojem disku",
         ROOT_FOLDER: "/Moj disk",
         FOLDER: "/Moj disk/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Više akcija",
         A11Y: "Otvara se padajući izbornik s listom dodatnih akcija koje se izvode na datoteci.",
            PANELS: {
               TITLE: "Više",
               A11Y: "Otvara padajući izbornik s listom skrivenih panela"
            }
      },
      WELCOME: {
         TITLE: "Spojili smo Pregled datoteka i Detalje",
         SUBTITLE: "Sada možete paralelno gledati datoteku i komentare.",
         LINES: {
            LINE_1: "Sve informacije i stvari koje možete napraviti na staroj stranici se nalaze ovdje.",
            LINE_2: "Komentari, dijeljenja, verzije i osnovne informacije dostupne su na strani datoteke."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Ovaj gumb vas vodi na sljedeću datoteku.",
         PREVIOUS_A11Y: "Ovaj gumb vas vodi na prethodnu datoteku."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Još opcija uređivanja",
            A11Y: "Ovaj gumb otvara izbornik dodatnih opcija uređivanja."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Uredi"
            },
            UPLOAD: {
               TITLE: "Predaj"
            },
            CREATE: {
              TITLE: "Kreiraj"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Promjena veličine panela",
           USAGE: "Pritisnite tipku lijeve ili desne uglate zagrade za promjenu veličine panela."
       },
         CLOSE: {
            TOOLTIP: "Zatvori",
            A11Y: "Ovaj gumb zatvara preglednik datoteka.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Vaša datoteka se još uvijek predaje.",
              PROMPT: "Vaša datoteka se još uvijek predaje. Ako je zatvorite prije nego što završi, predaja će biti otkazana.",
              OK: "Svejedno zatvori",
              CANCEL: "Pričekaj predavanje"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Dodaj datotekama",
           A11Y: "Ovaj gumb dodaje pripojenje u Datoteke.",
           VIEW_NOW: "Vidi odmah"
         },
         TEAR_OFF: {
           TOOLTIP: "Otvori u novom prozoru",
           A11Y: "Otvori u novom prozoru",
           ERROR_TEARING_OFF: "Došlo je do greške prilikom otvaranja novog prozora.",
           DIALOG_TITLE: "Potvrda",
           UNSAVED_CHANGES_WARNING: "Imate nespremljenih promjena koje će biti izgubljene. Želite li svejedno otvoriti u novom prozoru?",
           OK: "Da",
           CANCEL: "Ne",
           OPEN: "Otvori",
           OPEN_ANYWAY: "Svakako otvori",
           CANCEL_ALT: "Opoziv"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Novo iz datoteke",
            ACTION_NAME:"Kreiraj datoteku",
            A11Y: {
               TEXT: "Kreirajte dokument (DOC, DOCX ili ODT datoteku) iz datoteke predloška. Te dokumente možete uređivati online u Docs.",
               PRES: "Kreirajte prezentaciju (PPT, PPTX ili ODP datoteku) iz datoteke predloška. Te prezentacije možete uređivati online u Docs.",
               SHEET: "Kreirajte proračunsku tablicu (XLS, XLSX ili ODS datoteka) iz datoteke predloška. Te proračunske tablice možete ažurirati online u Docs."
            },
            PROMPT: {
               TEXT: "Kreirajte dokument (DOC, DOCX ili ODT datoteku) iz datoteke predloška. Te dokumente možete uređivati online u Docs.",
               PRES: "Kreirajte prezentaciju (PPT, PPTX ili ODP datoteku) iz datoteke predloška. Te prezentacije možete uređivati online u Docs.",
               SHEET: "Kreirajte proračunsku tablicu (XLS, XLSX ili ODS datoteka) iz datoteke predloška. Te proračunske tablice možete ažurirati online u Docs."
            },
            NAME_FIELD: "Ime:",
            EXTERNAL_FIELD: "Datoteke se mogu dijeliti s osobama izvan moje organizacije",
            EXTERNAL_DESC: "Eksterni pristup dozvoljava dijeljenje datoteka s vanjskim korisnicima (osobama izvan vaše organizacije ili poduzeća), dijeljenje foldera s vanjskim korisnicima i zajednicama s vanjskim osobama kao članovima. Morate postaviti vanjski pristup kod predavanja datoteke, on se kasnije ne može uključiti.",
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
               DUPLICATE_NAME: "Pronađen je duplikat imena datoteke. Unesite novo ime.",
               SERVER_ERROR: "Poslužitelj za Connections nije dostupan. Kontaktirajte administratora poslužitelja i pokušajte ponovno kasnije."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Preuzmite datoteku",
            A11Y: "Ovaj gumb preuzima datoteku."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Preuzmi kao PDF",
            TOOLTIP: "Preuzmite ovu datoteku kao PDF datoteku",
            A11Y: "Ovaj gumb preuzima datoteku u obliku PDF-a.",
            SUCCESS: "Uspješno ste preuzeli datoteku u obliku PDF-a.",
            ERROR: {
               DEFAULT: "Niste mogli preuzeti datoteku u obliku PDF-a.  Pokušajte ponovno kasnije.",
               UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli preuzeti datoteku u obliku PDF-a.",
               NOT_FOUND: "Datoteka se nije mogla preuzeti u obliku PDF-a jer je izbrisana ili se više ne dijeli s vama.",
               ACCESS_DENIED: "Datoteka se nije mogla preuzeti u obliku PDF-a jer je izbrisana ili se više ne dijeli s vama."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Ne postoji objavljena verzija ove datoteke za preuzimanje. Verzije se mogu objaviti u Docs editoru."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Datoteka se ne može preuzeti",
               CANCEL: "Zatvori",
               PROMPT: "Ne postoji objavljena verzija ove datoteke za preuzimanje.",
               PROMPT2: "Verzije se mogu objaviti u Docs editoru."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Datoteka se ne može preuzeti",
               CANCEL: "Zatvori",
               PROMPT: "Ne postoji objavljena verzija ove datoteke za preuzimanje.",
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
            RESET: "Resetiraj veličinu panela",
            SHOW_A11Y: "Ovaj gumb zatvara i otvara bočnu ploču. Bočna ploča trenutačno je zatvorena.",
            HIDE_A11Y: "Ovaj gumb otvara i zatvara bočnu ploču. Bočna ploča trenutačno je otvorena.",
            RESET_A11Y: "Ovaj gumb ponovno postavlja bočnu ploču na defaultnu veličinu. Bočna ploča trenutačno je proširena."
         },
         VIEW_DOC: {
            NAME: "Otvori u Docs Vieweru",
            TOOLTIP: "Otvori u Docs Vieweru",
            A11Y: "Ovaj gumb otvara datoteku za pregled u prozoru pretražitelja."
         },
         EDIT_DOC: {
            NAME: "Uredi u Docsu",
            TOOLTIP: "Upotrijebite HCL Docs za uređivanje ove datoteke",
            A11Y: "Ovaj gumb otvara datoteku za uređivanje u Docsu unutar novog prozora."
         },
         EDIT_OFFICE: {
            TITLE: "Opcije uređivanja",
            NAME: "Uredi koristeći Microsoft Office Online",
            TOOLTIP: "Upotrijebite Microsoft Office Online za uređivanje datoteke",
            A11Y: "Ovaj gumb otvara datoteku za uređivanje u Microsoft Office Onlineu unutar novog prozora."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Uredi koristeći Microsoft Word Online",
           TOOLTIP: "Upotrijebite Microsoft Word Online za uređivanje datoteke",
           A11Y: "Ovaj gumb otvara datoteku za uređivanje u Microsoft Word Onlineu unutar novog prozora."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Uredi koristeći Microsoft Excel Online",
             TOOLTIP: "Upotrijebite Microsoft Excel Online za uređivanje datoteke",
             A11Y: "Ovaj gumb otvara datoteku za uređivanje u Microsoft Excel Onlineu unutar novog prozora."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Uredi koristeći Microsoft PowerPoint Online",
             TOOLTIP: "Upotrijebite Microsoft PowerPoint Online za uređivanje datoteke",
             A11Y: "Ovaj gumb otvara datoteku za uređivanje u Microsoft PowerPoint Onlineu unutar novog prozora."
         },
         OFFICE_EDITED: {
             SUCCESS: "Datoteka je spremljena."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Uredi na desktopu",
            DIALOG_TITLE: "Uredi na desktopu",
            TOOLTIP: "Uredite ovaj dokument",
            A11Y: "Ovaj gumb otvara datoteku za lokalno uređivanje.",
            PROMPT: "Ova funkcija omogućuje vam uređivanje pomoću softvera instaliranog na vašem računalu.",
            INSTALL: "Prije nego što nastavite, ${startLink}instalirajte konektore desktop datoteke${endLink}.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Važno:",
            REMINDER: "Kad dovršite uređivanje, objavite skicu koristeći konektore desktop datoteka.",
            SKIP_DIALOG: "Ne prikazuj ovu poruku ponovno.",
            OK: "OK",
            CANCEL: "Opoziv"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Potvrda",
            DELETE_VERSION: "Izbriši verziju ${version}",
            DELETE_VERSION_AND_PRIOR: "Izbriši verziju ${version} i sve ranije verzije",
            PROMPT: "Upravo ćete izbrisati verziju ${version}. Želite li nastaviti?",
            DELETE_PRIOR: "Također izbriši sve ranije verzije",
            ERROR: "Dogodila se greška pri brisanju verzije. Pokušajte ponovno kasnije.",
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
            PROMPT: "Zamijenit ćete trenutnu verziju ove datoteke s verzijom ${version}. Želite li nastaviti?",
            ERROR: "Dogodila se greška pri vraćanju verzije. Pokušajte ponovno kasnije.",
            TOOLTIP: "Vratite ovu verziju",
            CHANGE_SUMMARY: "Vraćeno iz verzije ${version}",
            OK: "OK",
            CANCEL: "Opoziv"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Potvrda",
            REMOVE_EVERYONE: "Jeste li sigurni da želite organizaciji ukloniti pristup ovoj datoteci? Ako se pristup ukloni, datoteka se uklanja iz foldera i zajednica koji omogućuju pristup na razini organizacije i mogu je pregledavati i koristiti samo vlasnik i osobe s kojima je podijeljena.",
            REMOVE_USER: "Jeste li sigurni da želite zaustaviti dijeljenje s ${user}? Ako zaustavite dijeljenje, ${user} će moći pristupiti ovoj datoteci samo kroz foldere ili ako je dijeljena sa svima u organizaciji.",
            REMOVE_COMMUNITY: "Jeste li sigurni da želite ukloniti ovu datoteku iz zajednice ${communityName}?",
            REMOVE_FOLDER: "Jeste li sigurni da želite ukloniti ovu datoteku iz foldera ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Uklonite pristup vaše organizacije",
            REMOVE_USER_TOOLTIP: "Ukloni sva dijeljenja s ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Ukloni iz zajednice ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Ukloni iz foldera ${folderName}",
            OK: "OK",
            CANCEL: "Opoziv",
            EFSS: {
              DIALOG_TITLE: "Potvrda",
              REMOVE_EVERYONE: "Jeste li sigurni da želite organizaciji ukloniti pristup ovoj datoteci?  Ako se pristup ukloni, datoteka se uklanja iz foldera koji omogućuju pristup na razini organizacije i mogu je pregledavati i koristiti samo vlasnik i osobe s kojima je podijeljena.",
              REMOVE_USER: "Jeste li sigurni da želite zaustaviti dijeljenje s ${user}? Ako zaustavite dijeljenje, ${user} će moći pristupiti ovoj datoteci samo kroz foldere ili ako je dijeljena sa svima u organizaciji.",
              REMOVE_COMMUNITY: "Jeste li sigurni da želite ukloniti ovu datoteku iz zajednice ${communityName}?",
              REMOVE_FOLDER: "Jeste li sigurni da želite ukloniti ovu datoteku iz foldera ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Uklonite pristup vaše organizacije",
              REMOVE_USER_TOOLTIP: "Ukloni sva dijeljenja s ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Ukloni iz zajednice ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Ukloni iz foldera ${folderName}",
              OK: "OK",
              CANCEL: "Opoziv",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Uredi ovaj komentar"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Potvrda",
            PROMPT: "Jeste li sigurni da želite izbrisati ovaj komentar?",
            ERROR: "Dogodila se greška pri brisanju komentara. Pokušajte ponovno kasnije.",
            TOOLTIP: "Izbrišite ovaj komentar",
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
               UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli ažurirati opis.",
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
                  DEFAULT: "Došlo je do greške pri praćenju ove datoteke. Pokušajte ponovno kasnije.",
                  UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli pratiti ovu datoteku.",
                  NOT_FOUND: "Ne možete pratiti ovu datoteku jer je izbrisana ili se više ne dijeli s vama.",
                  ACCESS_DENIED: "Ne možete pratiti ovu datoteku jer je izbrisana ili se više ne dijeli s vama."
               },
               UNFOLLOW: {
                  DEFAULT: "Došlo je do greške pri prekidu praćenja ove datoteke. Pokušajte ponovno kasnije.",
                  UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli zaustaviti praćenje ove datoteke.",
                  NOT_FOUND: "Ne možete zaustaviti praćenje ove datoteke jer je izbrisana ili se više ne dijeli s vama.",
                  ACCESS_DENIED: "Ne možete zaustaviti praćenje ove datoteke jer je izbrisana ili se više ne dijeli s vama."
               }
            },
            FOLLOW_NAME: "Prati",
            FOLLOW_TOOLTIP: "Pratite ovu datoteku",
            FOLLOW_A11Y: "Ovaj gumb pokreće praćenje datoteke.",
            FOLLOW_SUCCESS: "Sada pratite ovu datoteku.",
            STOP_FOLLOWING_NAME: "Zaustavi praćenje",
            STOP_FOLLOWING_TOOLTIP: "Zaustavi praćenje ove datoteke",
            STOP_FOLLOWING_A11Y: "Ovaj gumb zaustavlja praćenje datoteke.",
            STOP_FOLLOWING_SUCCESS: "Zaustavili ste praćenje ove datoteke."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Dodaj u sinkronizaciju",
               TOOLTIP: "Dodajte ovu datoteku za sinkronizaciju",
               A11Y: "Ovaj gumb dodaje datoteku za sinkronizaciju.",
               SUCCESS: "Dodali ste ovu datoteku za sinkronizaciju.",
               ERROR: {
                  DEFAULT: "Došlo je do greške tijekom dodavanja datoteke za sinkronizaciju. Pokušajte ponovno kasnije.",
                  UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli dodati ovu datoteku za sinkronizaciju.",
                  NOT_FOUND: "Ne možete dodati ovu datoteku u sinkronizaciju jer je datoteka izbrisana ili se više ne dijeli s vama.",
                  ACCESS_DENIED: "Ne možete dodati ovu datoteku u sinkronizaciju jer je datoteka izbrisana ili se više ne dijeli s vama."
               }
            },
            STOP_SYNC: {
               NAME: "Ukloni iz sinkronizacije",
               TOOLTIP: "Uklonite ovu datoteku iz sinkronizacije",
               A11Y: "Ovaj gumb uklanja ovu datoteku iz sinkronizacije.",
               SUCCESS: "Uklonili ste ovu datoteku iz sinkronizacije.",
               ERROR: {
                  DEFAULT: "Došlo je do greške kod uklanjanja ove datoteke iz sinkronizacije. Pokušajte ponovno kasnije.",
                  UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli ukloniti ovu datoteku iz sinkronizacije.",
                  NOT_FOUND: "Ne možete ukloniti ovu datoteku iz sinkronizacije jer je datoteka izbrisana ili se više ne dijeli s vama.",
                  ACCESS_DENIED: "Ne možete ukloniti ovu datoteku iz sinkronizacije jer je datoteka izbrisana ili se više ne dijeli s vama."
               }
            },
            MYDRIVE: {
                NAME: "Dodaj na Moj disk",
                TOOLTIP: "Dodajte ovu datoteku na Moj disk",
                A11Y: "Ovaj gumb dodaje datoteku na Moj disk.",
                SUCCESS: "Dodali ste ovu datoteku na Moj disk.",
                ERROR: {
                   DEFAULT: "Došlo je do pogreške kod dodavanja ove datoteke na Moj disk. Pokušajte ponovno kasnije.",
                   UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli dodati ovu datoteku na Moj disk.",
                   NOT_FOUND: "Ne možete dodati ovu datoteku na Moj disk jer je datoteka izbrisana ili se više ne dijeli s vama.",
                   ACCESS_DENIED: "Ne možete dodati ovu datoteku na Moj disk jer je datoteka izbrisana ili se više ne dijeli s vama."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Ukloni s Mojeg diska",
                TOOLTIP: "Uklonite ovu datoteku s Mojeg diska",
                A11Y: "Ovaj gumb uklanja ovu datoteku s Mojeg diska.",
                SUCCESS: "Uklonili ste ovu datoteku s Mojeg diska.",
                ERROR: {
                   DEFAULT: "Pojavila se greška kod uklanjanja ove datoteke s Mojeg diska. Pokušajte ponovno kasnije.",
                   UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli ukloniti ovu datoteku iz Mojeg diska.",
                   NOT_FOUND: "Ne možete ukloniti ovu datoteku s Mojeg diska jer je datoteka izbrisana ili se više ne dijeli s vama.",
                   ACCESS_DENIED: "Ne možete ukloniti ovu datoteku s Mojeg diska jer je datoteka izbrisana ili se više ne dijeli s vama."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Prikvači",
            FAVORITE_TOOLTIP: "Prikvačite ovu datoteku",
            FAVORITE_A11Y: "Ovaj gumb će prikvačiti ovu datoteku.",
            FAVORITE_SUCCESS: "Prikvačili ste ovu datoteku.",
            STOP_FAVORITEING_NAME: "Ukloni prikvačeno",
            STOP_FAVORITEING_TOOLTIP: "Otkvačite ovu datoteku",
            STOP_FAVORITEING_A11Y: "Ovaj gumb će otkvačiti ovu datoteku.",
            STOP_FAVORITEING_SUCCESS: "Otkvačili ste ovu datoteku."
         },
         TRASH: {
            NAME: "Premjesti u smeće",
            DIALOG_TITLE: "Potvrda",
            PROMPT: "Jeste li sigurni da želite premjestiti ovu datoteku u smeće? Premještanje datoteke u smeće čini je nedostupnom za sve s kojima se trenutno dijeli.",
            ERROR: "Dogodila se greška pri brisanju datoteke. Pokušajte ponovno kasnije.",
            TOOLTIP: "Izbriši ovu datoteku",
            OK: "OK",
            CANCEL: "Opoziv",
            A11Y: "Ovaj gumb premješta datoteku u smeće.",
            SUCCESS_MSG: "${file} je premještena u smeće."
         },
         REFRESH: {
            NAME: "Osvježi",
            ERROR: "Dogodila se greška tijekom osvježavanja File Viewera. Pokušajte ponovno kasnije.",
            TOOLTIP: "Osvježite File Viewer",
            INFO_MSG: "Osvježite da dobijete najnoviji sadržaj. ${link}",
            A11Y: "Ovaj gumb premješta datoteku u smeće.",
            SUCCESS_MSG: "Sadržaj je uspješno osvježen."
         },
         COPY_FILE: {
            NAME: "Dajte kopiju za zajednicu...",
            DIALOG_TITLE: "Potvrda",
            ERROR: "Dogodila se greška tijekom kopiranja datoteke. Pokušajte ponovno kasnije.",
            TOOLTIP: "Dajte kopiju ove datoteke zajednici",
            OK: "OK",
            CANCEL: "Opoziv",
            A11Y: "Ovaj gumb otvara dijalog koji omogućuje dodjeljivanje kopije ove datoteke zajednici.",
            SUCCESS_MSG: "${file} je kopirana u ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Prijenos vlasništva...",
            DIALOG_TITLE: "Prijenos vlasništva",
            TOOLTIP: "Prenesite ovu datoteku novom vlasniku",
            A11Y: "Ovaj gumb otvara dijaloški okvir koji vam omogućava da ovu datoteku prenesete na novog vlasnika.",
            EMPTY: "Prazno"
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
            A11Y: "Zaključaj ovu datoteku",
            SUCCESS: "Datoteka je sada zaključana.",
            ERROR: "Datoteka se nije mogla zaključati jer je izbrisana ili se više ne dijeli s vama."
         },
         UNLOCK: {
            NAME: "Otključaj datoteku",
            TITLE: "Otključaj ovu datoteku",
            A11Y: "Otključaj ovu datoteku",
            SUCCESS: "Datoteka je sada otključana.",
            ERROR: "Datoteka se nije mogla otključati jer je izbrisana ili se više ne dijeli s vama."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Uredi na desktopu",
            TITLE: "Uredi na desktopu",
            A11Y: "Uredi na desktopu"
         },
         FLAG: {
            FILE: {
               NAME: "Označi kao neodgovarajuće",
               TITLE: "Označavanje datoteke",
               A11Y: "Označite ovu datoteku kao neprikladnu",
               PROMPT: "Navedite razlog za označavanje ove datoteke (neobavezno):",
               OK: "Oznaka",
               CANCEL: "Opoziv",
               SUCCESS: "Datoteka je označena i poslana na pregled.",
               ERROR: "Greška označavanja ove datoteke, molimo pokušajte kasnije."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Uspjeh",
               PROMPT: "Datoteka je označena i poslana na pregled.",
               CANCEL: "OK"
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
         },
         MODERATION: {
            DIALOG_TITLE: "Uspjeh",
            PROMPT: "Promjene su poslane na pregled. Ova datoteka neće biti dostupna dok se promjene ne odobre.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Padajući gumb"
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
            RESET: "Resetiranje",
            ZOOM_IN_A11Y: "Ovaj gumb približava sliku.",
            ZOOM_OUT_A11Y: "Ovaj gumb udaljava sliku.",
            RESET_ZOOM_A11Y: "Ovaj gumb resetira razinu približavanja.",
            UNSAFE_PREVIEW: "Ova datoteka se ne može pregledati jer nije skenirana radi otkrivanja virusa."
         },
         VIEWER: {
            LOADING: "Učitavanje...",
            PUBLISHING: "Objavljivanje...",
            NO_PUBLISHED_VERSION: "Objavljena verzija ove datoteke nije dostupna za pregledavanje.",
            IFRAME_TITLE: "Pregled ove datoteke",
            AUTOPUBLISH_TIMEOUT: "Poslužitelju treba predugo da odgovori.  Najnovije promjene možda nisu objavljene."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Ova datoteka se ne može pregledati jer nije skenirana radi otkrivanja virusa."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Zadnji je ažurirao ${user} danas u ${time}",
            YESTERDAY: "Zadnji je ažurirao ${user} jučer u ${time}",
            DAY: "Zadnji je ažurirao ${user} ${EEee} u ${time}.",
            MONTH: "Zadnji je ažurirao ${user} ${date_long}",
            YEAR: "Zadnji je ažurirao ${user} ${date_long}"
         },
         CREATED: {
            TODAY: "Kreirao je ${user} danas u ${time}",
            YESTERDAY: "Kreirao je ${user} jučer u ${time}",
            DAY: "kreirao je ${user} ${EEee} u ${time}",
            MONTH: "Kreirao je ${user} ${date_long}",
            YEAR: "Kreirao je ${user} ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long} ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long} ${time_long}",
            DAY: "${EEEE}, ${date_long} ${time_long}",
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
         ERROR: "Pojavila se greška kod provjere korisnika kojeg pokušavate spomenuti.",
         POST: "Objavi",
         SAVE: "Spremi",
         CANCEL: "Opoziv",
         EXTERNAL_WARNING: "Komentare mogu vidjeti osobe izvan vaše organizacije."
      },
      EDIT_BOX: {
         SAVE: "Spremi",
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
         USER: "Osoba",
         COMMUNITY: "Zajednica",
         SHARE: "Dijeli",
         SHARE_ALT: "Dijeli s ovom osobom",
         MEMBER_TYPE: "Tip člana",
         PERSON_SHADOW: "Upišite traženu osobu",
         COMMUNITY_SHADOW: "Upišite traženu zajednicu",
         PERSON_ARIA: "Upišite traženu osobu.  Pritisnite shift tab za prebacivanje između osoba, zajednica i svih u organizaciji.",
         COMMUNITY_ARIA: "Upišite traženu zajednicu.  Pritisnite shift tab za prebacivanje između osoba, zajednica i svih u organizaciji.",
         PERSON_FULL_SEARCH: "Osoba nije ispisana? Koristite potpuno pretraživanje...",
         COMMUNITY_FULL_SEARCH: "Zajednica nije ispisana? Koristite potpuno pretraživanje...",
         ADD_OPTIONAL_MESSAGE: "Dodavanje opcijske poruke",
         ROLE_LABEL: "Uloga",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Čitač"
      },
      FILE_STATE: {
         DOCS_FILE: "To je Docs datoteka. Sva uređivanja moraju se provesti online.",
         LOCKED_BY_YOU: {
            TODAY: "Vi ste zaključali u ${time}.",
            YESTERDAY: "Vi ste zaključali jučer u ${time}.",
            DAY: "Vi ste zaključali ${date}.",
            MONTH: "Vi ste zaključali ${date}.",
            YEAR: "Vi ste zaključali ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Zaključao ${user} u ${time}.",
            YESTERDAY: "Zaključao ${user} jučer u ${time}.",
            DAY: "Zaključao ${user} ${date}.",
            MONTH: "Zaključao ${user} ${date}.",
            YEAR: "Zaključao ${user} ${date_long}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Automatski skrati ovaj tekst",
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
         NO_ENTITLEMENT: "Ovu datoteku mogu uređivati online osobe koje imaju HCL Docs.",
         NO_ENTITLEMENT_LINK: "Ovu datoteku mogu uređivati online osobe koje imaju ${startLink}HCL Docs${endLink}.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "${users} trenutačno uređuje ovu datoteku na webu.",
         UNPUBLISHED_CHANGES: "U ovoj skici postoje uređivanja koja nisu objavljena u obliku verzije.",
         PUBLISH_A_VERSION: "Objavi verziju",
         PUBLISH_SUCCESS: "Uspješno ste objavili verziju ove datoteke",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Verzija se nije mogla objaviti zbog zabranjenog pristupa.",
            NOT_FOUND: "Verzija se nije mogla objaviti jer dokument nije pronađen.",
            CANNOT_REACH_REPOSITORY: "Verzija se nije mogla objaviti jer se Docs poslužitelj ne može povezati sa spremištem datoteka.",
            QUOTA_VIOLATION: "Verzija se nije mogla objaviti zbog ograničenja prostora. Uklonite druge datoteke kako biste oslobodili dovoljno prostora za objavljivanje ove verzije.",
            CONVERSION_UNAVAILABLE: "Verzija se nije mogla objaviti jer usluga Docs konverzije nije dostupna. Pokušajte ponovno kasnije.",
            TOO_LARGE: "Verzija se nije mogla objaviti jer je dokument prevelik.",
            CONVERSION_TIMEOUT: "Verzija se nije mogla objaviti jer je konvertiranje dokumenta u Docs usluzi konverzije trajalo predugo. Pokušajte ponovno kasnije.",
            SERVER_BUSY: "Verzija se nije mogla objaviti jer je Docs usluga zauzeta. Pokušajte ponovno kasnije.",
            DEFAULT: "Verzija se nije mogla objaviti jer nije dostupna Docs usluga. Pokušajte ponovno kasnije."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Vaša se uređivanja objavljuju. ${startLink}Osvježite kako biste vidjeli promjene.${endLink}",
            GENERIC: "Možda ćete trebati osvježiti stranicu kako biste vidjeli najnovije promjene.  ${startLink}Osvježi${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Nema komentara.",
         MODERATED: "Komentar je poslan za pregledavanje i bit će dostupan po odobrenju.",
         ERROR: {
            SAVE: {
               DEFAULT: "Vaš komentar se nije mogao spremiti.  Pokušajte ponovno kasnije.",
               UNAUTHENTICATED: "Vaš je sesija istekla. Morate se ponovno prijaviti kako biste mogli spremiti svoj komentar.",
               NOT_FOUND: "Vaš komentar se nije mogao spremiti zato što je datoteka izbrisana ili se više ne dijeli s vama.",
               ACCESS_DENIED: "Vaš komentar se nije mogao spremiti zato što je datoteka izbrisana ili se više ne dijeli s vama."
            },
            DELETE: {
               DEFAULT: "Vaš komentar nije se mogao izbrisati. Pokušajte ponovno kasnije.",
               UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli izbrisati svoj komentar.",
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
               DEFAULT: "Oznaka se nije mogla kreirati.  Pokušajte ponovno kasnije."
            },
            DELETE: {
               DEFAULT: "Stranica se ne može izbrisati.  Pokušajte ponovno kasnije."
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
               GENERIC: "Svi u vašoj organizaciji",
               ORG: "Svi u ${org}"
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
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Datoteka je uspješno dijeljena."
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
               ERROR: "Dogodila se greška s dodjelom računa. Pokušajte ponovno kasnije.",
               SUCCESS: "Korisnički račun je uspješno dodijeljen."
            },
            PLURAL: {
               NAME: "Dodjela vanjskih korisnika",
               ACTION: "Dodjela vanjskih korisnika...",
               TOOLTIP: "Dodijelite vanjske korisnike",
               DIALOG_TITLE: "Sadržaj nije bio dijeljen",
               PROMPT: {
                  NO_ACCOUNT: "Sljedeći korisnici nemaju račun i s njima nije dijeljen sadržaj.",
                  INVITE: "Pozovite ove korisnike kao goste da biste s njima dijelili sadržaj."
               },
               SUBMIT: "Nastavi s pozivnicama",
               CANCEL: "Opoziv",
               ERROR: "Dogodila se greška s dodjelom računa. Pokušajte ponovno kasnije.",
               SUCCESS: "Korisnički računi su uspješno dodijeljeni."
            },
            ABSTRACT: {
               NAME: "Dodjela vanjskih korisnika",
               ACTION: "Dodjela vanjskih korisnika...",
               TOOLTIP: "Dodijelite vanjske korisnike",
               DIALOG_TITLE: "Sadržaj nije bio dijeljen",
               PROMPT: {
                  NO_ACCOUNT: "Neki korisnici nemaju račun i s njima nije podijeljen sadržaj.",
                  INVITE: "Pozovite ove korisnike kao goste da biste s njima dijelili sadržaj."
               },
               SUBMIT: "Nastavi s pozivnicama",
               CANCEL: "Opoziv",
               ERROR: "Dogodila se greška s dodjelom računa. Pokušajte ponovno kasnije.",
               SUCCESS: "Korisnički računi su uspješno dodijeljeni."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opcije dijeljenja",
         PROPAGATION: "Dozvoli da drugi dijele ovu datoteku",
         EVERYONE: "Svi mogu dijeliti ovu datoteku.",
         OWNER_ONLY: "Samo vlasnik može dijeliti ovu datoteku.",
         STOP_SHARE: "Zaustavi dijeljenje",
         MAKE_INTERNAL: "Zaustavi vanjsko dijeljenje",
         MAKE_INTERNAL_SUCCESS: "Ova datoteka se više ne može dijeliti s osobama izvan organizacije.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Učiniti internim?",
            PROMPT: "Ako ovu datoteku učinite internom, to znači da se više ne može dijeliti s osobama izvan organizacije.${br}${br}" +
            "Svako dijeljenje s vanjskim osobama, zajednicama ili folderima bit će uklonjeno.${br}${br}Ako datoteku učinite internom, to je trajno i ne može se poništiti.",
            EFSS: {
               DIALOG_TITLE: "Učiniti internim?",
               PROMPT: "Ako ovu datoteku učinite internom, to znači da se više ne može dijeliti s osobama izvan organizacije.${br}${br}" +
            "Svako dijeljenje s vanjskim osobama ili folderima bit će uklonjeno.${br}${br}Ako datoteku učinite internom, to je trajno i ne može se poništiti."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Zaustavi dijeljenje datoteke",
            PROMPT: "Jeste li sigurni da želite zaustaviti dijeljenje ove datoteke?",
            QUESTION_PUBLIC: "Ova datoteka više neće biti vidljiva svima u vašoj organizaciji i neće se dijeliti s osobama, folderima ili zajednicama. Ta se radnja ne može poništiti.",
            QUESTION_PUBLIC_E: "Ova datoteka više neće biti vidljiva svima u vašoj organizaciji i neće se dijeliti s osobama ili folderima. Ta se radnja ne može poništiti.",
            QUESTION: "Datoteka se više neće dijeliti s osobama ili zajednicama i uklonit će se iz svih foldera osim privatnih. Ta se radnja ne može poništiti.",
            QUESTION_E: "Ova datoteka se više neće dijeliti s osobama i uklonit će se iz svih foldera osim vaših privatnih foldera. Ta se radnja ne može poništiti."
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
         USER_PICTURE: "Slika od ${0}",
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
            DOWNLOADS_HEADER: "Pogledi",
            DOWNLOADS_HEADER_MORE: "Pogledi (${0})",
            DOWNLOADS_EXPAND_ICON: "Proširite ovu ikonu da vidite tko je pregledao datoteku",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimno",
            DOWNLOADS_LATEST_VERSION: "Imate posljednju verziju datoteke",
            DOWNLOADS_LAST_VERSION: "Zadnje ste vidjeli verziju ${0} ove datoteke",
            TAGS_HEADER: "Oznake",
            DESCRIPTION_HEADER: "Opis",
            DESCRIPTION_READ_MORE: "Pročitajte više...",
            LINKS_HEADER: "Veze",
            SECURITY: "Sigurnost",
            FILE_ENCRYPTED: "Sadržaj datoteke je šifriran. Šifrirani sadržaj datoteke ne može se pretraživati. Sadržaj datoteke ne može se pregledati i urediti koristeći HCL Docs.",
            GET_LINKS: "Dohvat poveznica...",
            ADD_DESCRIPTION: "Dodaj opis",
            NO_DESCRIPTION: "Nema opisa",
            ADD_TAGS: "Dodajte oznake",
            NO_TAGS: "Nema oznaka"
         },
         COMMENTS: {
            TITLE: "Komentari",
            TITLE_WITH_COUNT: "Komentari (${0})",
            VERSION: "Verzija ${0}",
            FEED_LINK: "Feed za ove komentare",
            FEED_TITLE: "Pratite promjene ovih komentara kroz čitač feedova"
         },
         SHARING: {
            TITLE: "Dijeljenje",
            TITLE_WITH_COUNT: "Dijeljeno (${0})",
            SHARED_WITH_FOLDERS: "Dijeljeno s folderima - ${count}",
            SEE_WHO_HAS_SHARED: "Pogledajte tko je dijelio",
            COMMUNITY_FILE: "Datoteke u vlasništvu zajednice ne mogu se dijeliti s osobama ili drugim zajednicama.",
            SHARED_WITH_COMMUNITY: "Dijeljeno s članovima zajednice '${0}'",
            LOGIN: "Prijava",
            NO_SHARE: "Ova datoteka još nije dodana ni u jedan folder.",
            ONE_SHARE: "Ova datoteka je u 1 folderu ili zajednici za koju nemate pristup.",
            MULTIPLE_SHARE: "Ova datoteka je u ${fileNumber} foldera ili zajednica za koje nemate pristup."
         },
         VERSIONS: {
            TITLE: "Verzije",
            TITLE_WITH_COUNT: "Verzije (${0})",
            FEED_LINK: "Feed za ove verzije",
            FEED_TITLE: "Pratite promjene ove datoteke kroz čitač feedova"
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
         ERROR: "Sličica se nije mogla spremiti. Pokušajte ponovno kasnije.",
         EXT_ERROR: "Izaberite datoteku s jednim od sljedećih podržanih proširenja: ${0}",
         SUCCESS: "Sličica je promijenjena",
         UPLOAD: "Spremi",
         CANCEL: "Opoziv"
      },
      UPLOAD_VERSION: {
         LINK: "Predaj novu verziju...",
         CHANGE_SUMMARY: "Opcijski sažetak promjena...",
         ERROR: "Nova verzija nije se mogla spremiti. Pokušajte ponovno kasnije.",
         SUCCESS: "Nova verzija je spremljena",
         UPLOAD: "Predaj",
         UPLOAD_AND_CHANGE_EXTENSION: "Predaj i promijeni ekstenziju",
         CANCEL: "Opoziv",
         TOO_LARGE: "${file} veća je od dozvoljene veličine datoteke od ${size}.",
         PROGRESS_BAR_TITLE: "Predaja nove verzije (dovršeno ${uploaded} od ${total})",
         CANCEL_UPLOAD: "Opozovi predavanje"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Dogodila se greška kod pristupanja datoteci. Pokušajte ponovno kasnije.",
         UNAUTHENTICATED: "Vaša je sesija istekla. Morate se ponovno prijaviti kako biste mogli pogledati datoteku.",
         NOT_FOUND: "Datoteka koju ste zahtijevali je izbrisana ili premještena. Ako vam je netko poslao ovu vezu provjerite da li je ispravna.",
         ACCESS_DENIED: "Nemate dozvolu za gledanje ove datoteke.  Datoteka nije javna i ne dijeli se s vama.",
         ACCESS_DENIED_ANON: "Nemate dozvolu za gledanje ove datoteke.  Ako je ovo vaša datoteka ili se ona dijeli s vama, morate se najprije prijaviti."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Greška",
         PROMPT: "Datoteka koju ste zahtijevali je izbrisana ili premještena.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Potvrda",
        PROMPT: "Vaša HCL Connections sesija je istekla.${lineBreaks}Kliknite OK ako se želite ponovno prijaviti ili Opoziv za zatvaranje ovog dijaloga.",
        OK: "OK",
        CANCEL: "Opoziv"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Ne može se pristupiti vezi",
        PROMPT: "Došlo je do greške tijekom pristupanja vezi.${lineBreaks}Kliknite OK za preusmjeravanje na stranicu.",
        OK: "OK",
        CANCEL: "Opoziv"
      },
      LOAD_ERROR: {
         DEFAULT: "Ups. Pojavila se greška kod pristupanja poveznici.",
         ACCESS_DENIED: "Kontaktirajte vlasnika datoteke i zatražite dozvolu za pregled ove datoteke."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - datoteka",
         LOAD_ERROR: "Greška pristupa datoteci"
      },
      SHARE_WITH_LINK: {
         TITLE: "Podijeli s poveznicom",
         EMPTY_DESCRIPTION: "Za ovu datoteku još niste kreirali poveznicu. Kreirajte dijeljenu poveznicu koju ćete slati drugima kako bi pogledali i preuzeli datoteku.",
         CREATE_LINK: "Kreiraj poveznicu",
         COPY_LINK: "Kopiraj poveznicu",
         DELETE_LINK: "Izbriši poveznicu",
         ACCESS_TYPE_1: "Bilo tko s ovom poveznicom može pogledati datoteku",
         ACCESS_TYPE_2: "Osobe u mojoj organizaciji mogu gledati ovu datoteku",
         ACCESS_TYPE_1_DESCRIPTION: "Osobe koje dobiju poveznicu mogu gledati i preuzeti ovu datoteku nakon prijave u Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Osobe u mojoj organizaciji koje dobiju poveznicu mogu gledati i preuzeti ovu datoteku nakon prijave u Connections.",
         CHANGE_TYPE_SUCCESS: "Ažuriranje dozvola poveznice kad se promijeni tip pristupa.",
         CHANGE_TYPE_ERROR: "Ažuriranje dozvola poveznice nije uspjelo prilikom promjene tipa pristupa.",
         COPY_LINK_SUCCESS: "Poveznica je kopirana u memoriju za isječke",
         CREATE_SHARELINK_SUCCESS:"Poveznica je uspješno kreirana.",
         CREATE_SHARELINK_ERROR:"Poveznica se ne može kreirati zbog greške.",
         DELETE_SHARELINK_SUCCESS: "Izbrisana je dijeljena poveznica za \"${file}.\"",
         DELETE_SHARELINK_ERROR: "Dijeljena poveznica nije izbrisana. Pokušajte ponovno kasnije.",
         CONFIRM_DIALOG: {
            OK: "Izbriši",
            DIALOG_TITLE: "Izbriši dijeljenu poveznicu",
            PROMPT: "Ova datoteka će postati nedostupna osobama koje imaju poveznicu. Jeste li sigurni da želite izbrisati dijeljenu poveznicu?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Dijeljena poveznica je aktivna. Bilo tko s ovom poveznicom može pogledati datoteku. Kliknite za kopiranje ove poveznice.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Dijeljena poveznica je aktivna. Osobe iz moje organizacije mogu vidjeti ovu datoteku. Kliknite za kopiranje ove poveznice."
      }
});
