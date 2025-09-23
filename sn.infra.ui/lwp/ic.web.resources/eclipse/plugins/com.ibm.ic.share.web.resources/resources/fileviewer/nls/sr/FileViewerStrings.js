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
      FILE_MALICIOUS: "Skeniranje otkrivenog zlonamernog sadržaja",
      SHARED_EXTERNALLY: "Deli se spoljno",
      FILE_SYNCED: "Dodato u sinhronizaciju",
      MY_DRIVE: {
         TITLE: "U Mom disku",
         ROOT_FOLDER: "/Moj disk",
         FOLDER: "/Moj disk/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Više radnji",
         A11Y: "Otvara padajući meni sa listom dodatnih radnji koje možete izvršiti na ovoj datoteci.",
            PANELS: {
               TITLE: "Više",
               A11Y: "Otvara padajući meni sa listom sakrivenih tabli"
            }
      },
      WELCOME: {
         TITLE: "Kombinovali smo Prikaz datoteke i Detalje",
         SUBTITLE: "Sada možete da prikažete datoteke i komentare jednu pored drugog.",
         LINES: {
            LINE_1: "Sve informacije i stvari koje ste mogli da uradite na staroj stranici su sada ovde.",
            LINE_2: "Komentari, deljenja, verzije i osnovne informacije su dostupne sa strane datoteke."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Ovo dugme vas vodi do sledeće datoteke.",
         PREVIOUS_A11Y: "Ovo dugme vas vraća na prethodnu datoteku."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Više opcija uređivanja",
            A11Y: "Ovo dugme otvara meni sa više opcija uređivanja."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Uredi"
            },
            UPLOAD: {
               TITLE: "Otpremi"
            },
            CREATE: {
              TITLE: "Kreiraj"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Promena veličine table",
           USAGE: "Pritisnite taster leve zagrade ili desne zagrade da biste promenili veličinu table."
       },
         CLOSE: {
            TOOLTIP: "Zatvori",
            A11Y: "Ovo dugme zatvara prikazivač datoteke.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Datoteka se još uvek otprema.",
              PROMPT: "Datoteka se još uvek otprema. Ako zatvorite pre nego što se završi, otpremanje će biti otkazano.",
              OK: "Zatvori bez obzira",
              CANCEL: "Sačekaj da se otpremi"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Dodaj u Datoteke",
           A11Y: "Ovo dugme dodaje priloge u Datoteke.",
           VIEW_NOW: "Prikaži sada"
         },
         TEAR_OFF: {
           TOOLTIP: "Otvori u novom prozoru",
           A11Y: "Otvori u novom prozoru",
           ERROR_TEARING_OFF: "Došlo je do greške u otvaranju novog prozora.",
           DIALOG_TITLE: "Potvrđivanje",
           UNSAVED_CHANGES_WARNING: "Imate nesačuvane promene koje će biti izgubljene. Želite li zaista da otvorite u novom prozoru?",
           OK: "Da",
           CANCEL: "Ne",
           OPEN: "Otvori",
           OPEN_ANYWAY: "Otvori svakako",
           CANCEL_ALT: "Otkaži"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Novo iz datoteke",
            ACTION_NAME:"Kreiraj datoteku",
            A11Y: {
               TEXT: "Kreiraj dokument (DOC, DOCX ili ODT datoteku) iz predloška. Možete da uređujete ove dokumente na mreži u Docs aplikaciji.",
               PRES: "Kreiraj prezentaciju (PPT, PPTX ili ODP datoteku) iz datoteke predloška. Možete urediti ove prezentacije onlajn u aplikaciji Docs.",
               SHEET: "Kreiraj unakrsnu tabelu (XLS, XLSX ili ODS datoteka) iz datoteke predloška. Možete urediti ove unakrsne tabele onlajn u aplikaciji Docs."
            },
            PROMPT: {
               TEXT: "Kreiraj dokument (DOC, DOCX ili ODT datoteku) iz predloška. Možete da uređujete ove dokumente na mreži u Docs aplikaciji.",
               PRES: "Kreiraj prezentaciju (PPT, PPTX ili ODP datoteku) iz datoteke predloška. Možete urediti ove prezentacije onlajn u aplikaciji Docs.",
               SHEET: "Kreiraj unakrsnu tabelu (XLS, XLSX ili ODS datoteka) iz datoteke predloška. Možete urediti ove unakrsne tabele onlajn u aplikaciji Docs."
            },
            NAME_FIELD: "Ime:",
            EXTERNAL_FIELD: "Datoteke mogu da se dele sa osobama van moje organizacije",
            EXTERNAL_DESC: "Spoljni pristup omogućava deljenje datoteka sa spoljnim korisnicima (osobama van vaše organizacije ili kompanije) i fascikli sa spoljnim korisnicima i sa zajednicama čiji članovi su spoljni korisnici. Morate podesiti spoljni pristup kada otpremate datoteku, zato što ne može biti uključen kasnije.",
            CREATE_BUTTON: "Kreiraj",
            CANCEL: "Otkaži",
            PRE_FILL_NAMES: {
               OTT: "Dokument bez naslova",
               OTS: "Unakrsna tabela bez naslova",
               OTP: "Prezentacija bez naslova",
               DOT: "Dokument bez naslova",
               XLT: "Unakrsna tabela bez naslova",
               POT: "Prezentacija bez naslova",
               DOTX: "Dokument bez naslova",
               XLTX: "Unakrsna tabela bez naslova",
               POTX: "Prezentacija bez naslova"
            },
            ERRORS: {
               NAME_REQUIRED: "Ime dokumenta je obavezno.",
               ILLEGAL_NAME:"Ovo je nedozvoljen naslov dokumenta, navedite drugi naslov",
               WARN_LONG_NAME: "Ime dokumenta je predugačko.",
               TRIM_NAME: "Želite li da skratite ime dokumenta?",
               SESSION_TIMEOUT: "Vaša sesija je istekla, prijavite se i pokušajte ponovo.",
               DUPLICATE_NAME: "Pronađena je datoteka sa istim imenom. Unesite novo ime.",
               SERVER_ERROR: "Server Connections nije dostupan. Kontaktirajte administratora servera i pokušajte ponovo kasnije."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Preuzmi datoteku",
            A11Y: "Klikom na ovo dugme preuzimate datoteku."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Preuzmi u PDF formatu",
            TOOLTIP: "Preuzmi ovu datoteku kao PDF datoteku",
            A11Y: "Klikom na ovo dugme preuzimate datoteku u PDF formatu.",
            SUCCESS: "Uspešno ste preuzeli datoteku u PDF formatu.",
            ERROR: {
               DEFAULT: "Nije bilo moguće preuzeti datoteku u PDF formatu.  Pokušajte ponovo kasnije",
               UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da bi ste preuzeli datoteku u PDF formatu.",
               NOT_FOUND: "Datoteku nije bilo moguće preuzeti kao PDF datoteku jer je izbrisana ili se više ne deli sa vama.",
               ACCESS_DENIED: "Datoteku nije bilo moguće preuzeti kao PDF datoteku jer je izbrisana ili se više ne deli sa vama."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Ne postoji objavljena verzija ove datoteke za preuzimanje.  Verzije se mogu objaviti iz Docs urednika."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Nije moguće preuzeti datoteku",
               CANCEL: "Zatvori",
               PROMPT: "Ne postoji objavljena verzija ove datoteke za preuzimanje.",
               PROMPT2: "Verzije se mogu objaviti iz Docs urednika."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Nije moguće preuzeti datoteku",
               CANCEL: "Zatvori",
               PROMPT: "Ne postoji objavljena verzija ove datoteke za preuzimanje.",
               PROMPT2: "Pitajte vlasnika datoteke da objavite verziju ove datoteke."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Preuzmi verziju",
               OK: "Preuzmi verziju",
               PROMPT: {
                  TODAY: "Otkrivena je novija nedovršena verzija, poslednji put uređena danas u ${time}.",
                  YESTERDAY: "Otkrivena je novija nedovršena verzija, poslednji put uređena juče u ${time}.",
                  DAY: "Otkrivena je novija nedovršena verzija, poslednji put uređena dana ${date}.",
                  MONTH: "Otkrivena je novija nedovršena verzija, poslednji put uređena dana ${date}.",
                  YEAR: "Otkrivena je novija nedovršena verzija, poslednji put uređena dana ${date_long}."
               },
               PROMPT2: {
                  TODAY: "Želite li zaista da nastavite sa preuzimanjem verzije koja je objavljena danas u ${time}?",
                  YESTERDAY: "Želite li zaista da nastavite sa preuzimanjem verzije koja je objavljena juče u ${time}?",
                  DAY: "Želite li zaista nastaviti sa preuzimanjem verzije koja je objavljena dana ${date}?",
                  MONTH: "Želite li zaista nastaviti sa preuzimanjem verzije koja je objavljena dana ${date}?",
                  YEAR: "Želite li zaista nastaviti sa preuzimanjem verzije koja je objavljena dana ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Prikaži tablu sa detaljima",
            HIDE: "Sakrij tablu sa detaljima",
            RESET: "Ponovo postavi veličinu table",
            SHOW_A11Y: "Ovo dugme uključuje/isključuje bočnu tablu. Bočna tabla je trenutno zatvorena.",
            HIDE_A11Y: "Ovo dugme uključuje/isključuje bočnu tablu. Bočna tabla je trenutno otvorena.",
            RESET_A11Y: "Ovo dugme ponovo postavlja tablu sa strane na podrazumevanu veličinu. Tabla sa strane je trenutno proširena."
         },
         VIEW_DOC: {
            NAME: "Otvori u Docs prikazivaču",
            TOOLTIP: "Otvori u Docs prikazivaču",
            A11Y: "Ovo dugme otvara datoteku u novom prozoru pretraživača."
         },
         EDIT_DOC: {
            NAME: "Uredi u programu Docs",
            TOOLTIP: "Koristite aplikaciju HCL Docs da biste uredili datoteku",
            A11Y: "Ovo dugme otvara datoteku za uređivanje u Docs aplikaciji u novom prozoru."
         },
         EDIT_OFFICE: {
            TITLE: "Opcije uređivanja.",
            NAME: "Uredi u aplikaciji Microsoft Office Online",
            TOOLTIP: "Koristite aplikaciju Microsoft Office Online da biste uredili ovu datoteku",
            A11Y: "Ovo dugme otvara datoteku u režimu uređivanja u aplikaciji Microsoft Office Online u novom prozoru."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Uredi u aplikaciji Microsoft Word Online",
           TOOLTIP: "Koristite aplikaciju Microsoft Word Online da biste uredili ovu datoteku",
           A11Y: "Ovo dugme otvara datoteku u režimu uređivanja u aplikaciji Microsoft Word Online u novom prozoru."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Uredi u aplikaciji Microsoft Excel Online",
             TOOLTIP: "Koristite aplikaciju Microsoft Excel Online da biste uredili ovu datoteku",
             A11Y: "Ovo dugme otvara datoteku u režimu uređivanja u aplikaciji Microsoft Excel Online u novom prozoru."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Uredi u aplikaciji Microsoft PowerPoint Online",
             TOOLTIP: "Koristite aplikaciju Microsoft PowerPoint Online da biste uredili ovu datoteku",
             A11Y: "Ovo dugme otvara datoteku u režimu uređivanja u aplikaciji Microsoft PowerPoint Online u novom prozoru."
         },
         OFFICE_EDITED: {
             SUCCESS: "Čuvanje datoteke je u toku."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Uredi na radnoj površini",
            DIALOG_TITLE: "Uredi na radnoj površini",
            TOOLTIP: "Uredi ovaj dokument",
            A11Y: "Ovo dugme otvara datoteku za lokalno uređivanje.",
            PROMPT: "Ova funkcija vam dozvoljava da uređujete koristeći softver instaliran na vašem računaru.",
            INSTALL: "Pre nego što nastavite, ${startLink}instalirajte konektore datoteka na radnoj površini${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Važno:",
            REMINDER: "Kada završite uređivanje, objavite nedovršenu verziju koristeći konektore datoteka na radnoj površini.",
            SKIP_DIALOG: "Više ne prikazuj ovu poruku.",
            OK: "U redu",
            CANCEL: "Otkaži"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Potvrđivanje",
            DELETE_VERSION: "Izbriši verziju ${version}",
            DELETE_VERSION_AND_PRIOR: "Izbriši verziju ${version} i sve prethodne verzije",
            PROMPT: "Ovim ćete obrisati verziju ${version}. Želite li da nastavite?",
            DELETE_PRIOR: "Želite li da izbrišete i sve ranije verzije",
            ERROR: "Došlo je do greške tokom brisanja verzije. Pokušajte ponovo kasnije.",
            TOOLTIP: "Izbriši ovu verziju",
            OK: "U redu",
            CANCEL: "Otkaži"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Nabavka linkova",
            LINK_FILE: "Link ka datoteci:",
            LINK_PREVIEW: "Link ka pregledu datoteke:",
            LINK_DOWNLOAD: "Link ka preuzimanju datoteke:",
            TOOLTIP: "Link ka datoteci",
            OK: "Zatvori"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Preuzmi ovu verziju"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Potvrđivanje",
            PROMPT: "Ovim ćete zameniti trenutnu verziju ove datoteke verzijom ${version}. Želite li da nastavite?",
            ERROR: "Došlo je do greške tokom vraćanja ove verzije. Pokušajte ponovo kasnije.",
            TOOLTIP: "Vrati ovu verziju",
            CHANGE_SUMMARY: "Vraćeno iz verzije ${version}",
            OK: "U redu",
            CANCEL: "Otkaži"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Potvrđivanje",
            REMOVE_EVERYONE: "Želite li zaista da uklonite pristup vaše organizacije ovoj datoteci? Ako uklonite pristup, datoteka će biti uklonjena iz fascikli i zajednica u kojima je dozvoljen pristup na nivou organizacije i samo vlasnik i ljudi sa kojima se deli će moći da prikažu datoteku i da rade na njoj.",
            REMOVE_USER: "Želite li zaista da prekinete deljenje sa korisnikom ${user}? Ako prekinete deljenje, korisnik ${user} će moći da pristupi ovoj datoteci samo preko fascikli ili ako se deli sa svima u vašoj organizaciji.",
            REMOVE_COMMUNITY: "Želite li zaista da uklonite ovu datoteku iz zajednice ${communityName}?",
            REMOVE_FOLDER: "Želite li zaista da uklonite ovu datoteku iz fascikle ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Uklonite pristup vaše organizacije",
            REMOVE_USER_TOOLTIP: "Ukloni sva deljenja sa korisnikom ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Ukloni iz zajednice ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Ukloni iz fascikle ${folderName}",
            OK: "U redu",
            CANCEL: "Otkaži",
            EFSS: {
              DIALOG_TITLE: "Potvrđivanje",
              REMOVE_EVERYONE: "Želite li zaista da uklonite pristup vaše organizacije ovoj datoteci? Ako se pristup ukloni, datoteka će se ukloniti iz fascikli što će omogućiti pristup na nivou organizacije i samo vlasnik i ljudi sa kojima je deljena će moći da je prikažu i rade sa njom.",
              REMOVE_USER: "Želite li zaista da prekinete deljenje sa korisnikom ${user}? Ako prekinete deljenje, korisnik ${user} će moći da pristupi ovoj datoteci samo preko fascikli ili ako se deli sa svima u vašoj organizaciji.",
              REMOVE_COMMUNITY: "Želite li zaista da uklonite ovu datoteku iz zajednice ${communityName}?",
              REMOVE_FOLDER: "Želite li zaista da uklonite ovu datoteku iz fascikle ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Uklonite pristup vaše organizacije",
              REMOVE_USER_TOOLTIP: "Ukloni sva deljenja sa korisnikom ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Ukloni iz zajednice ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Ukloni iz fascikle ${folderName}",
              OK: "U redu",
              CANCEL: "Otkaži",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Uredi ovaj komentar"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Potvrđivanje",
            PROMPT: "Želite li da izbrišete ovaj komentar?",
            ERROR: "Došlo je do greške tokom brisanja komentara. Pokušajte ponovo kasnije.",
            TOOLTIP: "Izbriši ovaj komentar",
            OK: "U redu",
            CANCEL: "Otkaži"
         },
         LIKE: {
            LIKE: "Označi sa Sviđa mi se",
            UNLIKE: "Ukloni oznaku Sviđa mi se",
            LIKE_A11Y: "Ovo dugme postavlja oznaku Sviđa mi se.",
            UNLIKE_A11Y: "Ovo dugme uklanja oznaku Sviđa mi se.",
            LIKED_SUCCESS: "Označili ste sa Sviđa mi se",
            UNLIKE_SUCCESS: "Uklonili ste oznaku Sviđa mi se"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Uredi opis",
            ERROR: {
               DEFAULT: "Nije bilo moguće sačuvati opis. Pokušajte ponovo kasnije.",
               UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste ažurirali opis.",
               NOT_FOUND: "Nije bilo moguće sačuvati opis jer je datoteka izbrisana ili se više ne deli sa vama.",
               ACCESS_DENIED: "Nije bilo moguće sačuvati opis jer je datoteka izbrisana ili se više ne deli sa vama."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Greška prilikom čuvanja imena datoteke",
               CONFLICT: "Ime datoteke već postoji"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Došlo je do greške tokom praćenja ove datoteke. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste pratili ovu datoteku.",
                  NOT_FOUND: "Ne možete pratiti ovu datoteku jer je datoteka izbrisana ili se više ne deli sa vama.",
                  ACCESS_DENIED: "Ne možete pratiti ovu datoteku jer je datoteka izbrisana ili se više ne deli sa vama."
               },
               UNFOLLOW: {
                  DEFAULT: "Došlo je do greške tokom prekida praćenja ove datoteke. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste prekinuli praćenje ove datoteke.",
                  NOT_FOUND: "Ne možete prekinuti praćenje ove datoteke jer je datoteka izbrisana ili se više ne deli sa vama.",
                  ACCESS_DENIED: "Ne možete prekinuti praćenje ove datoteke jer je datoteka izbrisana ili se više ne deli sa vama."
               }
            },
            FOLLOW_NAME: "Prati",
            FOLLOW_TOOLTIP: "Prati ovu datoteku",
            FOLLOW_A11Y: "Ovo dugme prati datoteku.",
            FOLLOW_SUCCESS: "Sada pratite ovu datoteku.",
            STOP_FOLLOWING_NAME: "Prekini praćenje",
            STOP_FOLLOWING_TOOLTIP: "Prekini praćenje ove datoteke",
            STOP_FOLLOWING_A11Y: "Ovo dugme prekida praćenje datoteke.",
            STOP_FOLLOWING_SUCCESS: "Prestali ste da pratite ovu datoteku."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Dodaj u Sync",
               TOOLTIP: "Dodaj ovu datoteku u sinhronizaciju",
               A11Y: "Ovo dugme dodaje datoteku u sinhronizaciju.",
               SUCCESS: "Dodali ste ovu datoteku u sinhronizaciju.",
               ERROR: {
                  DEFAULT: "Došlo je do greške tokom dodavanja ove datoteke u sinhronizaciju. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste dodali ovu datoteku u sinhronizaciju.",
                  NOT_FOUND: "Ne možete dodati ovu datoteku u sinhronizaciju jer je datoteka izbrisana ili se više ne deli sa vama.",
                  ACCESS_DENIED: "Ne možete dodati ovu datoteku u sinhronizaciju jer je datoteka izbrisana ili se više ne deli sa vama."
               }
            },
            STOP_SYNC: {
               NAME: "Ukloni iz Sync-a",
               TOOLTIP: "Ukloni ovu datoteku iz sinhronizacije",
               A11Y: "Ovo dugme uklanja datoteku iz sinhronizacije.",
               SUCCESS: "Uklonili ste ovu datoteku iz sinhronizacije.",
               ERROR: {
                  DEFAULT: "Došlo je do greške tokom uklanjanja ove datoteke iz sinhronizacije. Pokušajte ponovo kasnije.",
                  UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste uklonili ovu datoteku iz sinhronizacije.",
                  NOT_FOUND: "Ne možete ukloniti ovu datoteku iz sinhronizacije jer je datoteka izbrisana ili se više ne deli sa vama.",
                  ACCESS_DENIED: "Ne možete ukloniti ovu datoteku iz sinhronizacije jer je datoteka izbrisana ili se više ne deli sa vama."
               }
            },
            MYDRIVE: {
                NAME: "Dodaj u Moj disk",
                TOOLTIP: "Dodaj ovu datoteku u Moj disk",
                A11Y: "Ovo dugme dodaj datoteku u Moj disk.",
                SUCCESS: "Dodali ste ovu datoteku u Moj disk.",
                ERROR: {
                   DEFAULT: "Došlo je do greške tokom dodavanja ove datoteke u Moj disk. Pokušajte ponovo kasnije.",
                   UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste mogli da dodate ovu datoteku u Moj disk.",
                   NOT_FOUND: "Nije moguće dodati ovu datoteku u Moj disk zato što je datoteka izbrisana ili se više ne deli sa vama.",
                   ACCESS_DENIED: "Nije moguće dodati ovu datoteku u Moj disk zato što je datoteka izbrisana ili se više ne deli sa vama."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Ukloni sa Mog diska",
                TOOLTIP: "Ukloni ovu datoteku sa Mog diska",
                A11Y: "Ovo dugme uklanja datoteku sa Mog diska.",
                SUCCESS: "Uklonili ste ovu datoteku sa Mog diska.",
                ERROR: {
                   DEFAULT: "Došlo je do greške tokom uklanjanja ove datoteke sa Mog diska. Pokušajte ponovo kasnije.",
                   UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste mogli da uklonite ovu datoteku sa Mog diska.",
                   NOT_FOUND: "Nije moguće ukloniti ovu datoteku sa Mog diska zato što je datoteka izbrisana ili se više ne deli sa vama.",
                   ACCESS_DENIED: "Nije moguće ukloniti ovu datoteku sa Mog diska zato što je datoteka izbrisana ili se više ne deli sa vama."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Zakači",
            FAVORITE_TOOLTIP: "Zakači ovu datoteku",
            FAVORITE_A11Y: "Klikom na ovo dugme kačite datoteku.",
            FAVORITE_SUCCESS: "Zakačili ste ovu datoteku.",
            STOP_FAVORITEING_NAME: "Otkači",
            STOP_FAVORITEING_TOOLTIP: "Otkači ovu datoteku",
            STOP_FAVORITEING_A11Y: "Klikom na ovo dugme otkačićete datoteku.",
            STOP_FAVORITEING_SUCCESS: "Otkačili ste ovu datoteku."
         },
         TRASH: {
            NAME: "Premesti u korpu za otpatke",
            DIALOG_TITLE: "Potvrđivanje",
            PROMPT: "Želite li zaista da premestite ovu datoteku u korpu za otpatke? Ako premestite ovu datoteku u korpu za otpatke ona neće biti dostupna osobama sa kojima se trenutno deli.",
            ERROR: "Došlo je do greške tokom brisanja ove datoteke. Pokušajte ponovo kasnije.",
            TOOLTIP: "Izbriši ovu datoteku",
            OK: "U redu",
            CANCEL: "Otkaži",
            A11Y: "Klikom na ovo dugme premestićete datoteku u korpu za otpatke.",
            SUCCESS_MSG: "${file} je premeštena u korpu za otpatke."
         },
         REFRESH: {
            NAME: "Osveži",
            ERROR: "Došlo je do greške tokom osvežavanja Prikazivača datoteka. Pokušajte ponovo kasnije.",
            TOOLTIP: "Osveži Prikazivač datoteka",
            INFO_MSG: "Osveži da dobiješ najnoviji sadržaj. ${link}",
            A11Y: "Klikom na ovo dugme premestićete datoteku u korpu za otpatke.",
            SUCCESS_MSG: "Sadržaj je uspešno osvežen."
         },
         COPY_FILE: {
            NAME: "Daj kopiju zajednici",
            DIALOG_TITLE: "Potvrđivanje",
            ERROR: "Došlo je do greške tokom kopiranja datoteke. Pokušajte ponovo kasnije.",
            TOOLTIP: "Daj kopiju ove datoteke zajednici",
            OK: "U redu",
            CANCEL: "Otkaži",
            A11Y: "Ovo dugme otvara dijalog koji vam dozvoljava da date kopiju ove datoteke zajednici.",
            SUCCESS_MSG: "${file} je kopirana u zajednicu ${community}."
         },
         UPLOAD_VERSION: {
            NAME: "Otpremanje nove verzije",
            NAME_SHORT: "Otpremi",
            CHANGE_SUMMARY: "Rezime opcionalnih promena...",
            TOOLTIP: "Otpremite novu verziju ove datoteke",
            A11Y: "Ovo dugme otvara dijalog koji vam dozvoljava da otpremite novu verziju ove datoteke."
         },
         LOG_IN: {
            NAME: "Prijavi se",
            TOOLTIP: "Prijavite se da biste delili datoteke, komentarisali i kreirali fascikle"
         },
         LOCK: {
            NAME: "Zaključaj datoteku",
            TITLE: "Zaključaj ovu datoteku",
            A11Y: "Zaključaj ovu datoteku",
            SUCCESS: "Datoteka je sada zaključana.",
            ERROR: "Datoteka nije mogla biti zaključana zato što je izbrisana ili se više ne deli sa vama."
         },
         UNLOCK: {
            NAME: "Otključaj datoteku",
            TITLE: "Otključaj ovu datoteku",
            A11Y: "Otključaj ovu datoteku",
            SUCCESS: "Datoteka je sada otključana.",
            ERROR: "Datoteku nije bilo moguće otključati jer je izbrisana ili se više ne deli sa vama."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Uredi na radnoj površini",
            TITLE: "Uredi na radnoj površini",
            A11Y: "Uredi na radnoj površini"
         },
         FLAG: {
            FILE: {
               NAME: "Označi kao neprikladno",
               TITLE: "Označi datoteku zastavicom",
               A11Y: "Označi datoteku kao neprikladnu",
               PROMPT: "Unesite razlog za označavanje ove datoteke (opciono):",
               OK: "Označi",
               CANCEL: "Otkaži",
               SUCCESS: "Datoteka je označena i poslata na pregled.",
               ERROR: "Greška u označavanju ove datoteke, pokušajte ponovo kasnije."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Uspešno",
               PROMPT: "Datoteka je označena i poslata na pregled.",
               CANCEL: "U redu"
            },
            COMMENT: {
               NAME: "Označi kao neprikladno",
               TITLE: "Označi komentar zastavicom",
               A11Y: "Označi ovaj komentar kao neprikladan",
               PROMPT: "Navedite razlog za označavanje ovog komentara (opcionalno):",
               OK: "Označi",
               CANCEL: "Otkaži",
               SUCCESS: "Komentar je označen i poslat na pregled.",
               ERROR: "Greška u označavanju ovog komentara, pokušajte ponovo kasnije."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Uspešno",
            PROMPT: "Promene su poslate na pregled. Datoteka neće biti dostupna dok promene ne budu odobrene.",
            CANCEL: "U redu"
         },
         DROPDOWN_BUTTON: "Padajuće dugme"
      },
      SECTION: {
         ABOUT: {
            NAME: "O ovoj datoteci",
            VIEW_FILE_DETAILS: "Prikaži detalje datoteke",
            A11Y: "Aktiviranje ovog linka će zatvoriti prikazivač datoteka i usmeriti vas na stranicu sa detaljima o ovoj datoteci."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Pregled za ovu datoteku nije dostupan."
         },
         IMAGE: {
            ZOOM_IN: "Uveličaj",
            ZOOM_OUT: "Umanji",
            RESET: "Ponovo postavi",
            ZOOM_IN_A11Y: "Ovo dugme daje uveličan prikaz slike.",
            ZOOM_OUT_A11Y: "Ovo dugme daje umanjen prikaz slike.",
            RESET_ZOOM_A11Y: "Ovo dugme vraća normalan prikaz slike.",
            UNSAFE_PREVIEW: "Nije moguće pregledati datoteku jer nije bila skenirana za viruse."
         },
         VIEWER: {
            LOADING: "Učitavanje...",
            PUBLISHING: "Objavljivanje...",
            NO_PUBLISHED_VERSION: "Objavljena verzija ove datoteke nije dostupna za prikazivanje.",
            IFRAME_TITLE: "Pregled ove datoteke",
            AUTOPUBLISH_TIMEOUT: "Serveru je potrebno previše vremena za odgovor.  Moguće je da poslednje promene nisu objavljene."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Nije moguće pregledati datoteku jer nije bila skenirana za viruse."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Poslednji put ažurirao korisnik ${user} danas u ${time}",
            YESTERDAY: "Poslednji put ažurirao korisnik ${user} juče u ${time}",
            DAY: "Poslednji put ažurirao korisnik ${user} u ${EEee} u ${time}",
            MONTH: "Poslednji put ažurirao korisnik dana ${user} ${date_long}",
            YEAR: "Poslednji put ažurirao korisnik dana ${user} ${date_long}"
         },
         CREATED: {
            TODAY: "Kreirao korisnik ${user} danas u ${time}",
            YESTERDAY: "Kreirao korisnik ${user} juče u ${time}",
            DAY: "Kreirao korisnik ${user} u ${EEee} u ${time}",
            MONTH: "Kreirao korisnik dana ${user} ${date_long}",
            YEAR: "Kreirao korisnik dana ${user} ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Danas",
            YESTERDAY: "${time} - Juče",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Danas",
            YESTERDAY: "Juče",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} bajtova",
         KB: "${0} KB",
         MB: "${0} megabajta",
         GB: "${0} gigabajta",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Prostor za tekst komentara",
         SHADOW_TEXT: "Dodajte komentar...",
         CANNOT_ACCESS_CONTENT: "Sledeće osobe koje ste pomenuli ne mogu da prikažu sadržaj jer nemaju pristup:",
         ERROR: "Došlo je do greške tokom provere korisnika koga pokušavate da pomenete.",
         POST: "Postavi",
         SAVE: "Sačuvaj",
         CANCEL: "Otkaži",
         EXTERNAL_WARNING: "Komentare mogu videti osobe van vaše organizacije."
      },
      EDIT_BOX: {
         SAVE: "Sačuvaj",
         CANCEL: {
            TOOLTIP: "Otkaži",
            A11Y: "Ovo dugme otkazuje radnju uređivanja imena datoteke."
         },
         INVALID_CHARACTERS: "Neispravan znak",
         INVALID_CHARACTERS_REMOVED: "Uklonjen neispravni znak"
      },
      COMMENT_WIDGET: {
         EDITED: "(Uređeno)",
         EDITED_DATE: {
            TODAY: "Uređeno danas u ${time}",
            YESTERDAY: "Uređeno juče u ${time}",
            DAY: "Uređeno u ${EEee} u ${time}",
            MONTH: "Uređeno dana ${date_long}",
            YEAR: "Uređeno dana ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Sačuvaj",
         CANCEL: "Otkaži",
         USER: "Osoba",
         COMMUNITY: "Zajednica",
         SHARE: "Deli",
         SHARE_ALT: "Podeli sa ovom osobom",
         MEMBER_TYPE: "Tip člana",
         PERSON_SHADOW: "Upišite da biste pronašli osobu",
         COMMUNITY_SHADOW: "Upišite da biste pronašli zajednicu",
         PERSON_ARIA: "Upišite da biste pronašli osobu.  Pritisnite tastere shift i tab da biste menjali između osoba, zajednica i svih osoba u organizaciji.",
         COMMUNITY_ARIA: "Upišite da biste pronašli zajednicu.  Pritisnite tastere shift i tab da biste menjali između osoba, zajednica i svih osoba u organizaciji.",
         PERSON_FULL_SEARCH: "Osoba nije navedena? Koristi punu pretragu ...",
         COMMUNITY_FULL_SEARCH: "Zajednica nije navedena? Koristi punu pretragu ...",
         ADD_OPTIONAL_MESSAGE: "Dodaj opcionalnu poruku",
         ROLE_LABEL: "Uloga",
         ROLE_EDIT: "Urednik",
         ROLE_VIEW: "Čitalac"
      },
      FILE_STATE: {
         DOCS_FILE: "Ovo je datoteka programa Docs. Sva uređivanja se moraju izvršiti onlajn.",
         LOCKED_BY_YOU: {
            TODAY: "Zaključali ste u ${time}.",
            YESTERDAY: "Zaključali ste juče u ${time}.",
            DAY: "Zaključali ste dana ${date}.",
            MONTH: "Zaključali ste dana ${date}.",
            YEAR: "Zaključali ste dana ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Zaključao u ${time} korisnik ${user}.",
            YESTERDAY: "Zaključano juče u ${time} od strane ${user}.",
            DAY: "Zaključano dana ${date} od strane korisnika ${user}.",
            MONTH: "Zaključano dana ${date} od strane korisnika ${user}.",
            YEAR: "Zaključano dana ${date_long} od strane ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Automatski skrati ovaj tekst",
         COMMENT: {
            WARN_TOO_LONG: "Komentar je predugačak.",
            TRIM: "Skratiti komentar?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "Opis je predugačak.",
            TRIM: "Želite li da skratite opis?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Poruka je predugačka.",
            TRIM: "Skratiti poruku?"
         },
         TAG: {
            WARN_TOO_LONG: "Oznaka je predugačka.",
            TRIM: "Želite li da skratite oznaku?"
         },
         TAGS: {
            WARN_TOO_LONG: "Jedna ili više oznaka su predugačke.",
            TRIM: "Želite li da skratite oznake?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Ime datoteke je predugačko"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Ovu datoteku mogu onlajn da uređuju ljudi koji imaju aplikaciju HCL Docs.",
         NO_ENTITLEMENT_LINK: "Ovu datoteku mogu onlajn da uređuju ljudi koji imaju aplikaciju ${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Ova datoteka se trenutno uređuje onlajn od strane ${users}.",
         UNPUBLISHED_CHANGES: "Postoje izmene ove nedovršene verzije koje nisu objavljene kao verzija.",
         PUBLISH_A_VERSION: "Objavi verziju",
         PUBLISH_SUCCESS: "Uspešno ste objavili verziju ove datoteke",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Nije bilo moguće objaviti verziju jer je pristup zabranjen.",
            NOT_FOUND: "Nije bilo moguće objaviti verziju jer dokument nije pronađen.",
            CANNOT_REACH_REPOSITORY: "Nije bilo moguće objaviti verziju jer Docs server nije mogao da se poveže sa spremištem datoteke.",
            QUOTA_VIOLATION: "Nije bilo moguće objaviti verziju zbog prostornog ograničenja. Uklonite druge datoteke da oslobodite dovoljno prostora da objavite ovu verziju.",
            CONVERSION_UNAVAILABLE: "Nije bilo moguće objaviti verziju jer Docs usluga konverzije nije dostupna. Pokušajte ponovo kasnije.",
            TOO_LARGE: "Nije bilo moguće objaviti verziju jer je dokument preveliki.",
            CONVERSION_TIMEOUT: "Nije bilo moguće objaviti verziju jer Docs konverziji treba previše vremena da pretvori dokument. Pokušajte ponovo kasnije.",
            SERVER_BUSY: "Nije bilo moguće objaviti verziju jer je Docs server zauzet. Pokušajte ponovo kasnije.",
            DEFAULT: "Nije bilo moguće objaviti verziju jer Docs usluga nije dostupna. Pokušajte ponovo kasnije."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Vaša uređivanja se objavljuju. ${startLink}Osvežite da biste prikazali vaše promene.${endLink}",
            GENERIC: "Možda ćete morati da osvežite stranicu da biste prikazali najnovije promene.  ${startLink}Osveži${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Nema komentara.",
         MODERATED: "Komentar je poslat na pregled i biće dostupan kada bude bio odobren.",
         ERROR: {
            SAVE: {
               DEFAULT: "Komentar nije moguće sačuvati. Pokušajte ponovo kasnije.",
               UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste sačuvali svoj komentar.",
               NOT_FOUND: "Nije bilo moguće sačuvati vaš komentar jer je datoteka izbrisana ili se više ne deli sa vama.",
               ACCESS_DENIED: "Nije bilo moguće sačuvati vaš komentar jer je datoteka izbrisana ili se više ne deli sa vama."
            },
            DELETE: {
               DEFAULT: "Komentar nije moguće izbrisati. Pokušajte ponovo kasnije.",
               UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste izbrisali svoj komentar.",
               NOT_FOUND: "Nije bilo moguće izbrisati vaš komentar zato što je datoteka izbrisana ili se više ne deli sa vama.",
               ACCESS_DENIED: "Nije bilo moguće izbrisati vaš komentar zato što je datoteka izbrisana ili se više ne deli sa vama."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Sačuvaj",
         EDIT_TAGS: "Uredi oznake",
         ERROR: {
            SAVE: {
               DEFAULT: "Nije bilo moguće kreirati oznaku. Pokušajte ponovo kasnije."
            },
            DELETE: {
               DEFAULT: "Nije bilo moguće izbrisati oznaku. Pokušajte ponovo kasnije."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Pročitajte više...",
         READ_LESS: "Pročitajte manje..."
      },
      SHARE: {
         EVERYONE: "Svi u mojoj organizaciji",
         ADD_TOOLTIP: "Sačuvaj",
         ROLES: {
            OWNER: "Vlasnik",
            EDIT: "Urednici",
            VIEW: "Čitaoci",
            FOLDER: "Deljeno sa fasciklama"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Vlasnik"
            },
            EDIT: {
               ROLE: "Uredi",
               ADD: "Dodaj urednika"
            },
            VIEW: {
               ROLE: "Čitalac",
               ADD: "Dodaj čitača"
            },
            FOLDER: {
               ADD: "Dodaj fascikle",
               COMMUNITY_ADD: "Dodaj u fasciklu",
               MOVE: "Premesti u fasciklu"
            },
            MULTI: {
               ADD: "Dodaj osobe ili zajednice",
               ADD_PEOPLE: "Dodaj osobe"
            }
         },
         PUBLIC: {
            SHORT: "Svi u mojoj organizaciji",
            LONG: {
               GENERIC: "Svi u mojoj organizaciji",
               ORG: "Svi u ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Ova datoteka se već deli sa ${user}.",
            ERROR: "Trenutno nije moguće deljenje sa ${user}.",
            SELF: "Nije moguće da delite sa sobom."
         },
         SHARE_INFO: {
            PROMOTED: "Korisnik ${user} je unapređen na višu ulogu deljenja."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Uspešno podeljeno sa korisnikom ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Datoteka je uspešno podeljena."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Dodatna poruka..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Dodela spoljnog korisnika",
               ACTION: "Dodela spoljnog korisnika...",
               TOOLTIP: "Dodela spoljnog korisnika",
               DIALOG_TITLE: "Sadržaj nije bio deljen",
               PROMPT: {
                  NO_ACCOUNT: "Sledeći korisnik nema nalog i ne postoji sadržaj koji se deli sa ovim korisnikom.",
                  INVITE: "Pozovite ovog korisnika kao gosta da podelite sadržaj sa njim."
               },
               SUBMIT: "Nastavite sa pozivnicom",
               CANCEL: "Otkaži",
               ERROR: "Došlo je do greške tokom dodele naloga. Pokušajte ponovo kasnije.",
               SUCCESS: "Uspešno dodeljen korisnički nalog."
            },
            PLURAL: {
               NAME: "Dodela spoljnih korisnika",
               ACTION: "Dodela spoljnih korisnika...",
               TOOLTIP: "Dodela spoljnih korisnika",
               DIALOG_TITLE: "Sadržaj nije bio deljen",
               PROMPT: {
                  NO_ACCOUNT: "Sledeći korisnici nemaju naloge i sa njima se ne deli nikakav sadržaj.",
                  INVITE: "Pozovite korisnike kao goste da biste delili sadržaj s njima."
               },
               SUBMIT: "Nastavi s pozivnicama",
               CANCEL: "Otkaži",
               ERROR: "Došlo je do greške za vreme dodele naloga. Pokušajte ponovo kasnije.",
               SUCCESS: "Korisnički nalog je uspešno dodeljen."
            },
            ABSTRACT: {
               NAME: "Dodela spoljnih korisnika",
               ACTION: "Dodela spoljnih korisnika...",
               TOOLTIP: "Dodela spoljnih korisnika",
               DIALOG_TITLE: "Sadržaj nije bio deljen",
               PROMPT: {
                  NO_ACCOUNT: "Neki korisnici nemaju naloge i nikakav sadržaj se ne deli sa njima.",
                  INVITE: "Pozovite korisnike kao goste da biste delili sadržaj s njima."
               },
               SUBMIT: "Nastavi s pozivnicama",
               CANCEL: "Otkaži",
               ERROR: "Došlo je do greške za vreme dodele naloga. Pokušajte ponovo kasnije.",
               SUCCESS: "Korisnički nalog je uspešno dodeljen."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opcije deljenja",
         PROPAGATION: "Dozvoli drugima da dele ovu datoteku",
         EVERYONE: "Svi mogu da dele ovu datoteku.",
         OWNER_ONLY: "Samo vlasnik može da deli ovu datoteku.",
         STOP_SHARE: "Prekini deljenje",
         MAKE_INTERNAL: "Zaustavi spoljno deljenje",
         MAKE_INTERNAL_SUCCESS: "Ova datoteka više ne može da se deli sa ljudima van vaše organizacije.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Želite li učiniti unutrašnjom?",
            PROMPT: "Ako pretvorite ovu datoteku u unutrašnju ona neće moći da se deli sa ljudima van vaše organizacije. ${br}${br}" +
            "Svako deljenje sa osobama, zajednicama i fasciklama van vaše organizacije će biti uklonjeno.${br}${br}Pretvaranje datoteke u unutrašnju je trajna radnja i ne može se opozvati.",
            EFSS: {
               DIALOG_TITLE: "Želite li učiniti unutrašnjom?",
               PROMPT: "Ako pretvorite ovu datoteku u unutrašnju ona neće moći da se deli sa ljudima van vaše organizacije. ${br}${br}" +
               "Sve podele sa spoljnim ljudima ili fasciklama će biti uklonjene.${br}${br}Pretvaranje datoteke u unutrašnju je trajno i ne može biti opozvano."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Prekini deljenje datoteke",
            PROMPT: "Želite li zaista da prestanete da delite ovu datoteku?",
            QUESTION_PUBLIC: "Ova datoteka više neće biti vidljiva svima u vašoj organizaciji ili deljena sa osobama, fasciklama ili zajednicama. Ova operacija se ne može opozvati.",
            QUESTION_PUBLIC_E: "Ova datoteka više neće biti vidljiva svima u vašoj organizaciji ili deljena sa osobama, fasciklama ili zajednicama. Ova operacija se ne može opozvati.",
            QUESTION: "Ova datoteka više neće biti deljena sa osobama ili zajednicama i biće uklonjena iz svih fascikli osim iz vaših privatnih fascikli. Ovu radnju nije moguće opozvati.",
            QUESTION_E: "Ova datoteka više neće biti deljena sa osobama i biće uklonjena iz svih fascikli osim iz vaših privatnih fascikli. Ovu radnju nije moguće opozvati."
         },
         MAKE_PRIVATE_SUCCESS: "Ova datoteka je sada privatna.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Nije moguće prekinuti deljenje datoteke. Pokušajte ponovo kasnije."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Moja deljenja"
      },
      STREAM: {
         LOADING: "Učitavanje...",
         LOAD_MORE: "Učitaj još..."
      },
      ENTRY: {
         REMOVE: "Ukloni",
         RESTORE: "Vrati",
         EDIT: "Uredi",
         DELETE: "Izbriši",
         OK: "U redu",
         CANCEL: "Otkaži",
         USER_PICTURE: "${0} slika",
         FLAG: "Označi kao neprikladno"
      },
      PANEL: {
         LOAD_ERROR: "Došlo je do greške u pristupanju metapodacima ove datoteke.",
         ABOUT: {
            TITLE: "O nama",
            EXPAND_BUTTON: "Proširite ovo dugme da biste videli više informacija",
            CURRENT_VERSION_HEADER: "Aktuelna verzija ${versionNumber}",
            FILE_SIZE_HEADER: "Veličina datoteke",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Aktuelna verzija",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Sve verzije",
            DOCS_DRAFT_UPDATED_HEADER: "Nedovršena verzija uređena",
            DOCS_DRAFT_CREATED_HEADER: "Nedovršena verzija kreirana",
            DOCS_UPDATED_HEADER: "Objavljeno",
            DOCS_CREATED_HEADER: "Kreirano",
            UPDATED_HEADER: "Ažurirano",
            CREATED_HEADER: "Kreirano",
            LIKES_HEADER: "Označeno sa Sviđa mi se",
            LIKES_EXPAND_ICON: "Proširite ovu ikonu da biste videli kome se sviđa ova datoteka.",
            DOWNLOADS_HEADER: "Prikazi",
            DOWNLOADS_HEADER_MORE: "Prikazi (${0})",
            DOWNLOADS_EXPAND_ICON: "Proširite ovu ikonu da biste videli ko je prikazao datoteku",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimno",
            DOWNLOADS_LATEST_VERSION: "Imate najnoviju verziju ove datoteke",
            DOWNLOADS_LAST_VERSION: "Poslednji put ste prikazali verziju ${0} ove datoteke",
            TAGS_HEADER: "Oznake",
            DESCRIPTION_HEADER: "Opis",
            DESCRIPTION_READ_MORE: "Pročitajte više...",
            LINKS_HEADER: "Linkovi",
            SECURITY: "Bezbednost",
            FILE_ENCRYPTED: "Sadržaj datoteke je šifrovan. Nije moguće pretraživati šifrovani sadržaj datoteke. Sadržaj datoteke nije moguće prikazati niti urediti u programu HCL Docs.",
            GET_LINKS: "Nabavka linkova...",
            ADD_DESCRIPTION: "Dodaj opis",
            NO_DESCRIPTION: "Nema opisa",
            ADD_TAGS: "Dodaj oznake",
            NO_TAGS: "Nema oznaka"
         },
         COMMENTS: {
            TITLE: "Komentari",
            TITLE_WITH_COUNT: "Komentari (${0})",
            VERSION: "Verzija ${0}",
            FEED_LINK: "Fid za ove komentare",
            FEED_TITLE: "Pratite promene ovih komentara preko fid čitača"
         },
         SHARING: {
            TITLE: "Deljenje",
            TITLE_WITH_COUNT: "Deljeno (${0})",
            SHARED_WITH_FOLDERS: "Deljeno sa fasciklama - ${count}",
            SEE_WHO_HAS_SHARED: "Vidi ko je podelio",
            COMMUNITY_FILE: "Datoteke u vlasništvu zajednice ne mogu biti podeljene sa osobama ili drugim zajednicama.",
            SHARED_WITH_COMMUNITY: "Deljeno sa članovima zajednice'${0}'",
            LOGIN: "Prijavite se",
            NO_SHARE: "Ova datoteka još uvek nije dodata u fascikle.",
            ONE_SHARE: "Ova datoteka je u 1 fascikli ili zajednici kojoj nemate pristup.",
            MULTIPLE_SHARE: "Ova datoteka je u ${fileNumber} fascikli ili zajednica kojima nemate pristup."
         },
         VERSIONS: {
            TITLE: "Verzije",
            TITLE_WITH_COUNT: "Verzije (${0})",
            FEED_LINK: "Fid za ove verzije",
            FEED_TITLE: "Pratite promene ove datoteke preko čitača fida"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Potvrda radnje",
         DIALOG_TITLE: "Potvrđivanje",
         PROMPT: "Želite li zaista da izvršite ovu radnju?",
         ERROR: "Došlo je do greške tokom izvršenja ove radnje. Pokušajte ponovo kasnije.",
         TOOLTIP: "Izvrši radnju",
         OK: "U redu",
         CANCEL: "Otkaži",
         A11Y: "Ovo dugme izvršava trenutnu radnju."
      },
      THUMBNAIL: {
         TITLE: "Sličica",
         CHANGE_LINK: "Promeni sličicu...",
         ERROR: "Nije bilo moguće sačuvati sličicu. Pokušajte ponovo kasnije.",
         EXT_ERROR: "Izaberite datoteku sa jednim od navedenih podržanih proširenja: ${0}",
         SUCCESS: "Sličica je promenjena",
         UPLOAD: "Sačuvaj",
         CANCEL: "Otkaži"
      },
      UPLOAD_VERSION: {
         LINK: "Otpremanje nove verzije...",
         CHANGE_SUMMARY: "Rezime opcionalnih promena...",
         ERROR: "Nije bilo moguće sačuvati novu verziju. Pokušajte ponovo kasnije.",
         SUCCESS: "Nova verzija je sačuvana",
         UPLOAD: "Otpremi",
         UPLOAD_AND_CHANGE_EXTENSION: "Otpremi i promeni ekstenziju",
         CANCEL: "Otkaži",
         TOO_LARGE: "Datoteka ${file} je veća od dozvoljene veličine od: ${size}.",
         PROGRESS_BAR_TITLE: "Otpremanje nove verzije (${uploaded} od ${total} dovršeno)",
         CANCEL_UPLOAD: "Otkaži otpremanje"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Došlo je do greške tokom pristupanja datoteci. Pokušajte ponovo kasnije.",
         UNAUTHENTICATED: "Sesija je istekla. Prijavite se ponovo da biste prikazali ovu datoteku.",
         NOT_FOUND: "Datoteka koju zahtevate je izbrisana ili premeštena. Ako vam je neko poslao ovaj link, proverite da li je tačan.",
         ACCESS_DENIED: "Nemate dozvolu za prikaz te datoteke. Ova datoteka se ne deli sa vama.",
         ACCESS_DENIED_ANON: "Nemate dozvolu za prikaz te datoteke. Ako je ovo vaša datoteka ili je deljena sa vama, morate prvo da se prijavite."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Greška",
         PROMPT: "Datoteka koju zahtevate je izbrisana ili pomerena.",
         CANCEL: "U redu"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Potvrđivanje",
        PROMPT: "HCL Connections sesija je istekla.${lineBreaks}Kliknite na „U redu“ da biste se ponovo prijavili ili na „Otkaži“ da biste zatvorili ovaj dijalog.",
        OK: "U redu",
        CANCEL: "Otkaži"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Nije moguće pristupiti linku",
        PROMPT: "Došlo je do greške pri pristupanju linku.${lineBreaks}Kliknite na „U redu“ da biste bili preusmereni do stranice.",
        OK: "U redu",
        CANCEL: "Otkaži"
      },
      LOAD_ERROR: {
         DEFAULT: "Ups. Došlo je do greške pri pristupanju linku.",
         ACCESS_DENIED: "Kontaktirajte vlasnika datoteke da biste zatražili dozvolu da prikažete ovu datoteku."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Datoteka",
         LOAD_ERROR: "Greška u pristupanju datoteci"
      },
      SHARE_WITH_LINK: {
         TITLE: "Deljenje pomoću linka",
         EMPTY_DESCRIPTION: "Još uvek niste kreirali link za ovu datoteku. Kreirajte link za deljenje i pošaljite ga ostalima kako bi mogli da pregledaju i preuzmu datoteku.",
         CREATE_LINK: "Kreiraj link",
         COPY_LINK: "Kopiraj link",
         DELETE_LINK: "Izbriši link",
         ACCESS_TYPE_1: "Svako ko ima link može da prikaže ovu datoteku",
         ACCESS_TYPE_2: "Osobe u mojoj organizaciji mogu da pregledaju ovu datoteku",
         ACCESS_TYPE_1_DESCRIPTION: "Osobe koje dobiju link mogu da pregledaju i preuzmu ovu datoteku nakon što se prijave u Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Osobe u mojoj organizaciji koje dobiju link, mogu da pregledaju i preuzmu ovu datoteku nakon što  se prijave u Connections.",
         CHANGE_TYPE_SUCCESS: "Prilikom promene tipa pristupa ažuriraće se dozvola za link.",
         CHANGE_TYPE_ERROR: "Prilikom promene tipa pristupa nije uspelo ažuriranje dozvole za link.",
         COPY_LINK_SUCCESS: "Link je kopiran u privremenu memoriju",
         CREATE_SHARELINK_SUCCESS:"Veza je uspešno kreirana.",
         CREATE_SHARELINK_ERROR:"Nije moguće kreirati vezu jer je došlo do greške.",
         DELETE_SHARELINK_SUCCESS: "Izbrisan deljeni link za \"${file}.\"",
         DELETE_SHARELINK_ERROR: "Link za deljenje nije izbrisan. Pokušajte ponovo kasnije.",
         CONFIRM_DIALOG: {
            OK: "Izbriši",
            DIALOG_TITLE: "Brisanje deljenog linka",
            PROMPT: "Datoteka će postati nedostupna svima koji imaju link. Sigurni ste da želite da izbrišete deljeni link?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Link za deljenje je aktivan. Svako ko ima link može da prikaže ovu datoteku. Kliknite da biste kopirali ovaj link.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Link za deljenje je aktivan. Osobe u mojoj organizaciji mogu da prikažu ovu datoteku. Kliknite da biste kopirali ovaj link."
      }
});
