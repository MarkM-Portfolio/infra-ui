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
      FILE_VIEWER_TITLE: "Previzualizare fişier",
      FILENAME_TOOLTIP: "Editare nume de fişier",
      ICON_TOOLTIP: "Descărcare fişier",
      ERROR: "A survenit o eroare.",
      FILE_MALICIOUS: "Scanare conţinut rău intenţionat descoperit",
      SHARED_EXTERNALLY: "Partajată extern",
      FILE_SYNCED: "A fost adăugat la sincronizare",
      MY_DRIVE: {
         TITLE: "În Unitatea mea",
         ROOT_FOLDER: "/Unitatea mea",
         FOLDER: "/Unitatea mea/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Mai multe acţiuni",
         A11Y: "Deschide un meniu derulant cu o listă cu mai multe acţiuni de realizat pe fişier.",
            PANELS: {
               TITLE: "Mai multe",
               A11Y: "Deschide un meniu derulant cu o listă de panouri ascunse"
            }
      },
      WELCOME: {
         TITLE: "Am combinat vizualizarea Fişier cu detaliile",
         SUBTITLE: "Acum puteţi vizualiza un fişier alături de comentariile sale",
         LINES: {
            LINE_1: "Toate informaţiile şi lucrurile pe care le puteaţi face în pagina veche sunt aici.",
            LINE_2: "Comentariile, partajarea, versiunile şi informaţiile de bază sunt disponibile în partea laterală a fişierului."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Acest buton navighează la următorul fişier.",
         PREVIOUS_A11Y: "Acest buton navighează la fişierul anterior."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Mai multe opţiuni de editare",
            A11Y: "Acest buton deschide un meniu cu mai multe opţiuni de editare."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Editare"
            },
            UPLOAD: {
               TITLE: "Încărcare"
            },
            CREATE: {
              TITLE: "Creare"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Redimensionare panou",
           USAGE: "Apăsaţi tasta paranteză unghiulară stânga sau dreapta pentru a redimensiona panoul."
       },
         CLOSE: {
            TOOLTIP: "Închidere",
            A11Y: "Acest buton închide vizualizatorul de fişier.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Fişierul dumneavoastră încă se încarcă.",
              PROMPT: "Fișierul dvs. încă se încarcă. Dacă îl închideți înainte să termine, încărcarea va fi anulată.",
              OK: "Închidere",
              CANCEL: "Aşteptare pentru încărcare"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Adăugare în Fişiere",
           A11Y: "Acest buton adaugă ataşamentul în Fişiere.",
           VIEW_NOW: "Vizualizare acum"
         },
         TEAR_OFF: {
           TOOLTIP: "Deschidere în fereastră nouă",
           A11Y: "Deschidere în fereastră nouă",
           ERROR_TEARING_OFF: "A apărut o eroare la deschiderea noii ferestre.",
           DIALOG_TITLE: "Confirmare",
           UNSAVED_CHANGES_WARNING: "Aveți modificări nesalvate care se vor pierde. Doriți să deschideți oricum într-o fereastră nouă?",
           OK: "Da",
           CANCEL: "Nu",
           OPEN: "Deschidere",
           OPEN_ANYWAY: "Deschidere oricum",
           CANCEL_ALT: "Anulare"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Nou din fişier",
            ACTION_NAME:"Creare fişier",
            A11Y: {
               TEXT: "Creați un document (fișier DOC, DOCX sau ODT) dintr-un fișier șablon. Puteți edita online aceste documente în Docs.",
               PRES: "Creați o prezentare (fișier PPT, PPTX sau ODP) dintr-un fișier șablon. Puteți edita aceste prezentări online în Docs.",
               SHEET: "Creați o foaie de calcul tabelar (fișier XLS, XLSX sau ODS) dintr-un fișier șablon. Puteți edita aceste foi de calcul tabelar online în Docs."
            },
            PROMPT: {
               TEXT: "Creați un document (fișier DOC, DOCX sau ODT) dintr-un fișier șablon. Puteți edita online aceste documente în Docs.",
               PRES: "Creați o prezentare (fișier PPT, PPTX sau ODP) dintr-un fișier șablon. Puteți edita aceste prezentări online în Docs.",
               SHEET: "Creați o foaie de calcul tabelar (fișier XLS, XLSX sau ODS) dintr-un fișier șablon. Puteți edita aceste foi de calcul tabelar online în Docs."
            },
            NAME_FIELD: "Nume:",
            EXTERNAL_FIELD: "Fişierele pot fi partajate cu persoane externe organizaţiei mele",
            EXTERNAL_DESC: "Accesul extern permite fişierelor să fie partajate cu persoane externe (persoane din afara organizaţiei sau companiei dumneavoastră), folderele partajate cu utilizatorii externi, şi comunităţi cu persoane externe ca membri.  Trebuie să setaţi accesul extern la încărcarea unui fişier; acesta nu poate fi activat ulterior.",
            CREATE_BUTTON: "Creare",
            CANCEL: "Anulare",
            PRE_FILL_NAMES: {
               OTT: "Document fără titlu",
               OTS: "Foaie de calcul fără titlu",
               OTP: "Prezentare fără titlu",
               DOT: "Document fără titlu",
               XLT: "Foaie de calcul fără titlu",
               POT: "Prezentare fără titlu",
               DOTX: "Document fără titlu",
               XLTX: "Foaie de calcul fără titlu",
               POTX: "Prezentare fără titlu"
            },
            ERRORS: {
               NAME_REQUIRED: "Numele documentului este necesar.",
               ILLEGAL_NAME:"Acesta este un titlu de document ilegal, vă rugăm să specificaţi altul.",
               WARN_LONG_NAME: "Numele de document este prea lung.",
               TRIM_NAME: "Scurtaţi numele documentului?",
               SESSION_TIMEOUT: "Sesiunea dumneavoastră a expirat, vă rugăm să vă logaţi şi să încercaţi din nou.",
               DUPLICATE_NAME: "S-a găsit un nume de fișier duplicat. Introduceți un nume nou.",
               SERVER_ERROR: "Serverul Connections nu este disponibil. Contactați administratorul serverului și încercați din nou mai târziu."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Descărcare fişier",
            A11Y: "Acest buton descarcă fişierul."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Descărcare ca PDF",
            TOOLTIP: "Descărcare acest fişier ca un fişier PDF",
            A11Y: "Acest buton descarcă fişierul ca un fişier PDF.",
            SUCCESS: "Aţi descărcat cu succes fişierul ca un fişier PDF.",
            ERROR: {
               DEFAULT: "Nu ați putut descărca fișierul ca un PDF.  Vă rugăm să încercați din nou mai târziu.",
               UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea descărca fișierul ca un PDF.",
               NOT_FOUND: "Fişierul nu a putut fi descărcat ca PDF, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
               ACCESS_DENIED: "Fişierul nu a putut fi descărcat ca PDF, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Nu există nicio versiune publicată a acestui fișier pentru descărcare. Versiunile pot fi publicate din editorul Docs."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Nu se poate descărca fişierul",
               CANCEL: "Închidere",
               PROMPT: "Nu există o versiune publicată a acestui fişier pentru descărcare.",
               PROMPT2: "Versiunile pot fi publicate din editorul Docs."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Nu se poate descărca fişierul",
               CANCEL: "Închidere",
               PROMPT: "Nu există o versiune publicată a acestui fişier pentru descărcare.",
               PROMPT2: "Cereţi proprietarului fişierului să publice o versiune a acestui fişier."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Descărcaţi o versiune",
               OK: "Descărcare versiune",
               PROMPT: {
                  TODAY: "O ciornă mai noua, editată ultima dată azi la ${time}, a fost detectată.",
                  YESTERDAY: "O ciornă mai nouă, editată ultima dată ieri la ${time}, a fost detectată.",
                  DAY: "O ciornă mai nouă, editată ultima dată pe ${date}, a fost detectată.",
                  MONTH: "O ciornă mai nouă, editată ultima dată pe ${date}, a fost detectată.",
                  YEAR: "O ciornă mai nouă, editată ultima dată pe ${date_long}, a fost detectată."
               },
               PROMPT2: {
                  TODAY: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată azi la ${time}?",
                  YESTERDAY: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată ieri la ${time}?",
                  DAY: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată pe ${date}?",
                  MONTH: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată pe ${date}?",
                  YEAR: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată pe ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Afişare panou detalii",
            HIDE: "Ascundere panou detalii",
            RESET: "Resetare mărime panou",
            SHOW_A11Y: "Acest buton comută între deschiderea și închiderea panoului lateral. Panoul lateral este momentan închis.",
            HIDE_A11Y: "Acest buton comută între deschiderea și închiderea panoului lateral. Panoul lateral este momentan deschis.",
            RESET_A11Y: "Acest buton resetează panoul lateral înapoi la dimensiunea implicită. Panoul lateral este momentan extins."
         },
         VIEW_DOC: {
            NAME: "Deschidere în Docs Viewer",
            TOOLTIP: "Deschideţi în Vizualizare documente",
            A11Y: "Acest buton deschide fişierul pentru vizualizarea în interiorul unei noi ferestre de browser."
         },
         EDIT_DOC: {
            NAME: "Editare în Docs",
            TOOLTIP: "Utilizaţi HCL Docs pentru a edita acest fişier",
            A11Y: "Acest buton deschide fişierul pentru editare în Docs în interiorul unei noi ferestre."
         },
         EDIT_OFFICE: {
            TITLE: "Opţiuni de editare",
            NAME: "Editare în Microsoft Office Online",
            TOOLTIP: "Utilizaţi Microsoft Office Online pentru a edita acest fişier",
            A11Y: "Acest buton deschide fişierul pentru editarea în Microsoft Office Online, într-o fereastră nouă."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Editare în Microsoft Word Online",
           TOOLTIP: "Utilizaţi Microsoft Word Online pentru a edita acest fişier",
           A11Y: "Acest buton deschide fişierul pentru editarea în Microsoft Word Online, într-o fereastră nouă."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Editare în Microsoft Excel Online",
             TOOLTIP: "Utilizaţi Microsoft Excel Online pentru a edita acest fişier",
             A11Y: "Acest buton deschide fişierul pentru editarea în Microsoft Excel Online, într-o fereastră nouă."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Editare în Microsoft PowerPoint Online",
             TOOLTIP: "Utilizaţi Microsoft PowerPoint Online pentru a edita acest fişier",
             A11Y: "Acest buton deschide fişierul pentru editarea în Microsoft PowerPoint Online, într-o fereastră nouă."
         },
         OFFICE_EDITED: {
             SUCCESS: "Fişierul este salvat."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Editare pe Desktop",
            DIALOG_TITLE: "Editare pe Desktop",
            TOOLTIP: "Editaţi acest document",
            A11Y: "Acest buton deschide fişierul pentru editarea locală.",
            PROMPT: "Această caracteristică vă permite să editaţi utilizând software instalat pe computerul dumneavoastră.",
            INSTALL: "Înainte de a continua, ${startLink}instalați conectorii de fișier desktop${endLink}.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Important:",
            REMINDER: "După ce terminaţi editarea, publicaţi o ciornă utilizând conectorii de fişier desktop.",
            SKIP_DIALOG: "Nu afişaţi din nou acest mesaj.",
            OK: "OK",
            CANCEL: "Anulare"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Confirmare",
            DELETE_VERSION: "Ștergere versiune ${version}",
            DELETE_VERSION_AND_PRIOR: "Ştergeţi versiunea ${version} şi toate versiunile anterioare",
            PROMPT: "Sunteți pe cale să ștergeți versiunea ${version}. Doriți să continuați?",
            DELETE_PRIOR: "Ştergeţi de asemenea toate versiunile anterioare",
            ERROR: "A apărut o eroare la ștergerea versiunii. Încercați din nou mai târziu.",
            TOOLTIP: "Ştergeţi această versiune",
            OK: "OK",
            CANCEL: "Anulare"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Obţinere legături",
            LINK_FILE: "Legătură la fişier:",
            LINK_PREVIEW: "Legătură la previzualizare fişier:",
            LINK_DOWNLOAD: "Legătură la descărcare fişier:",
            TOOLTIP: "Legătură la fişier:",
            OK: "Închidere"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Descărcaţi această versiune"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Confirmare",
            PROMPT: "Sunteţi pe cale să înlocuiţi versiunea curentă a acestui fişier cu versiunea b, care a fost creată de ${version}. Doriţi să continuaţi?",
            ERROR: "A apărut o eroare la restabilirea versiunii. Încercați din nou mai târziu.",
            TOOLTIP: "Restauraţi această versiune",
            CHANGE_SUMMARY: "Restaurat din versiunea ${version}",
            OK: "OK",
            CANCEL: "Anulare"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Confirmare",
            REMOVE_EVERYONE: "Sunteţi sigur că vreţi să înlăturaţi accesul organizaţiei dumneavoastră la acest fişier? Dacă accesul este înlăturat, atunci fişierul este înlăturat din foldere şi comunităţi ce permit acces la nivel de organizaţie şi numai proprietarul şi persoanele cu care a fost partajat îl pot vizualiza şi pot lucra cu el.",
            REMOVE_USER: "Sunteţi sigur că vreţi să opriţi partajarea cu ${user}? Dacă opriţi partajarea, ${user} veţi putea accesa acest fişier doar prin foldere sau dacă este partajat cu toţi din organizaţia dumneavoastră.",
            REMOVE_COMMUNITY: "Sunteţi sigur că vreţi să înlăturaţi acest fişier din comunitatea ${communityName}?",
            REMOVE_FOLDER: "Sunteţi sigur că vreţi să înlăturaţi acest fişier din folderul ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Înlăturaţi accesul organizaţiei dumneavoastră",
            REMOVE_USER_TOOLTIP: "Înlăturaţi toate partajările cu ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Înlăturați din comunitatea ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Înlăturați din folderul ${folderName}",
            OK: "OK",
            CANCEL: "Anulare",
            EFSS: {
              DIALOG_TITLE: "Confirmare",
              REMOVE_EVERYONE: "Sunteţi sigur că vreţi să înlăturaţi accesul organizaţiei dumneavoastră la acest fişier? Dacă accesul este înlăturat, atunci fişierul este înlăturat din folderele care permit accesul la nivel de organizaţie şi doar proprietarul şi persoanele cu care a fost partajat îl pot vedea şi lucra cu el.",
              REMOVE_USER: "Sunteţi sigur că vreţi să opriţi partajarea cu ${user}? Dacă opriţi partajarea, ${user} veţi putea accesa acest fişier doar prin foldere sau dacă este partajat cu toţi din organizaţia dumneavoastră.",
              REMOVE_COMMUNITY: "Sunteţi sigur că vreţi să înlăturaţi acest fişier din comunitatea ${communityName}?",
              REMOVE_FOLDER: "Sunteţi sigur că vreţi să înlăturaţi acest fişier din folderul ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Înlăturaţi accesul organizaţiei dumneavoastră",
              REMOVE_USER_TOOLTIP: "Înlăturaţi toate partajările cu ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Înlăturați din comunitatea ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Înlăturați din folderul ${folderName}",
              OK: "OK",
              CANCEL: "Anulare",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Editaţi acest comentariu"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Confirmare",
            PROMPT: "Sunteţi sigur că vreţi să ştergeţi acest comentariu?",
            ERROR: "A apărut o eroare la ștergerea comentariului. Încercați din nou mai târziu.",
            TOOLTIP: "Ştergeţi acest comentariu",
            OK: "OK",
            CANCEL: "Anulare"
         },
         LIKE: {
            LIKE: "Apreciez fişierul",
            UNLIKE: "Nu îmi place fişierul",
            LIKE_A11Y: "Acest buton este pentru aprecierea fişierului.",
            UNLIKE_A11Y: "Acest buton este pentru anularea aprecierii fişierului.",
            LIKED_SUCCESS: "Aţi apreciat acest fişier",
            UNLIKE_SUCCESS: "Aşi anulat aprecierea pentru acest fişier"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Editare descriere",
            ERROR: {
               DEFAULT: "Descrierea nu a putut fi salvată. Încercați din nou mai târziu.",
               UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea actualiza descrierea.",
               NOT_FOUND: "Descrierea nu a putut fi salvată deoarece fişierul a fost şters sau nu vă mai este partajat.",
               ACCESS_DENIED: "Descrierea nu a putut fi salvată deoarece fişierul a fost şters sau nu vă mai este partajat."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Eroare la salvarea numelui fişierului",
               CONFLICT: "Numele de fişier există deja"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "A apărut o eroare la urmărirea acestui fișier. Încercați din nou mai târziu.",
                  UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea urmări acest fișier.",
                  NOT_FOUND: "Nu puteţi urmări acest fişier, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
                  ACCESS_DENIED: "Nu puteţi urmări acest fişier, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
               },
               UNFOLLOW: {
                  DEFAULT: "A apărut o eroare la anularea urmăririi acestui fișier. Încercați din nou mai târziu.",
                  UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea opri urmărirea acestui fișier.",
                  NOT_FOUND: "Nu puteţi opri urmărirea acestui fişier, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
                  ACCESS_DENIED: "Nu puteţi opri urmărirea acestui fişier, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
               }
            },
            FOLLOW_NAME: "Urmărire",
            FOLLOW_TOOLTIP: "Urmăriţi acest fişier",
            FOLLOW_A11Y: "Acest buton urmăreşte fişierul.",
            FOLLOW_SUCCESS: "Acum urmăriţi acest fişier.",
            STOP_FOLLOWING_NAME: "Oprire urmărire",
            STOP_FOLLOWING_TOOLTIP: "Opriţi urmărirea acestui fişier",
            STOP_FOLLOWING_A11Y: "Acest buton opreşte urmărirea fişierului.",
            STOP_FOLLOWING_SUCCESS: "Nu mai urmăriţi acest fişier."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Adăugare la sincronizare",
               TOOLTIP: "Adăugare acest fişier pentru sincronizare",
               A11Y: "Acest buton adaugă fişierul la sincronizare.",
               SUCCESS: "Aţi adăugat acest fişier la sincronizare.",
               ERROR: {
                  DEFAULT: "A apărut o eroare la adăugarea acestui fișier la sincronizare. Încercați din nou mai târziu.",
                  UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea adăuga acest fișier la sincronizare.",
                  NOT_FOUND: "Nu puteţi adăuga acest fişier la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
                  ACCESS_DENIED: "Nu puteţi adăuga acest fişier la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
               }
            },
            STOP_SYNC: {
               NAME: "Înlăturare de la Sincronizare",
               TOOLTIP: "Înlăturaţi acest fişier de la sincronizare",
               A11Y: "Acest buton înlătură fişierul de la sincronizare.",
               SUCCESS: "Aţi înlăturat acest fişier de la sincronizare.",
               ERROR: {
                  DEFAULT: "A fost o eroare la înlăturarea acestui fișier din sincronizare. Încercați din nou mai târziu.",
                  UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea înlătura acest fișier de la sincronizare.",
                  NOT_FOUND: "Nu puteţi înlătura acest fişier de la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
                  ACCESS_DENIED: "Nu puteţi înlătura acest fişier de la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
               }
            },
            MYDRIVE: {
                NAME: "Adăugare la Unitatea mea",
                TOOLTIP: "Adăugaţi acest fişier la Unitatea mea",
                A11Y: "Acest buton adaugă fişierul la Unitatea mea.",
                SUCCESS: "Aţi adăugat acest fişier la Unitatea mea.",
                ERROR: {
                   DEFAULT: "A apărut o eroare la adăugarea acestui fișier la Unitatea mea. Încercați din nou mai târziu.",
                   UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea adăuga acest fișier la Unitatea mea.",
                   NOT_FOUND: "Nu puteţi adăuga acest fişier la Unitatea mea, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
                   ACCESS_DENIED: "Nu puteţi adăuga acest fişier la Unitatea mea, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Înlăturare din Unitatea mea",
                TOOLTIP: "Înlăturaţi acest fişier din Unitatea mea",
                A11Y: "Acest buton înlătură fişierul din Unitatea mea.",
                SUCCESS: "Aţi înlăturat acest fişier din Unitatea mea.",
                ERROR: {
                   DEFAULT: "A fost o eroare la înlăturarea acestui fișier din Unitatea mea. Încercați din nou mai târziu.",
                   UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea înlătura acest fișier din Unitatea mea.",
                   NOT_FOUND: "Nu puteţi înlătura acest fişier din Unitatea mea, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
                   ACCESS_DENIED: "Nu puteţi înlătura acest fişier din Unitatea mea, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Ţintuire",
            FAVORITE_TOOLTIP: "Ţintuire acest fişier",
            FAVORITE_A11Y: "Acest buton ţintuieşte fişierul.",
            FAVORITE_SUCCESS: "Aţi ţintuit acest fişier.",
            STOP_FAVORITEING_NAME: "Anulare ţintuire",
            STOP_FAVORITEING_TOOLTIP: "Anulaţi ţintuirea acestui fişier",
            STOP_FAVORITEING_A11Y: "Acest buton anulează ţintuirea fişierului.",
            STOP_FAVORITEING_SUCCESS: "Aţi anulat ţintuirea acestui fişier."
         },
         TRASH: {
            NAME: "Mutare în Coş de gunoi",
            DIALOG_TITLE: "Confirmare",
            PROMPT: "Sunteţi sigur că doriţi să mutaţi acest fişier în coşul de gunoi? Mutarea acestui fişier în coşul de gunoi îl face indisponibil pentru orice persoană cu care este partajat în prezent.",
            ERROR: "A apărut o eroare la ștergerea fișierului. Încercați din nou mai târziu.",
            TOOLTIP: "Ştergeţi acest fişier",
            OK: "OK",
            CANCEL: "Anulare",
            A11Y: "Acest buton mută fişierul în coşul de gunoi.",
            SUCCESS_MSG: "${file} a fost mutat în coşul de gunoi."
         },
         REFRESH: {
            NAME: "Reîmprospătare",
            ERROR: "A apărut o eroare la reîncărcarea  File Viewer. Încercați din nou mai târziu.",
            TOOLTIP: "Reîmprospătare Vizualizator fişiere",
            INFO_MSG: "Reîmprospătaţi pentru a obţine cel mai recent conţinut. ${link}",
            A11Y: "Acest buton mută fişierul în coşul de gunoi.",
            SUCCESS_MSG: "Conţinutul a fost reîmprospătat cu succes."
         },
         COPY_FILE: {
            NAME: "Oferire copie unei comunităţi...",
            DIALOG_TITLE: "Confirmare",
            ERROR: "A apărut o eroare la copierea fișierului. Încercați din nou mai târziu.",
            TOOLTIP: "Oferiţi o copie a acestui fişier unei comunităţi",
            OK: "OK",
            CANCEL: "Anulare",
            A11Y: "Acest buton deschide un dialog ce vă permite să daţi o copie a acestui fişier comunităţii.",
            SUCCESS_MSG: "${file} a fost copiat la ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Transferare drept de proprietate...",
            DIALOG_TITLE: "Transferare drept de proprietate",
            TOOLTIP: "Transferați acest fișier către un proprietar nou",
            A11Y: "Acest buton deschide un dialog ce vă permite să transferați acest fișier către un proprietar nou.",
            EMPTY: "Gol"
         },
         UPLOAD_VERSION: {
            NAME: "Încărcare versiune nouă",
            NAME_SHORT: "Încărcare",
            CHANGE_SUMMARY: "Sumar de modificări opţional...",
            TOOLTIP: "Încărcaţi o nouă versiune a acestui fişier",
            A11Y: "Acest buton deschide un dialog ce vă permite să încărcaţi o nouă versiune a acestui fişier."
         },
         LOG_IN: {
            NAME: "Logare",
            TOOLTIP: "Logaţi-vă pentru a încărca şi partaja fişiere, pentru a comenta şi a crea foldere"
         },
         LOCK: {
            NAME: "Blocare fişier",
            TITLE: "Blocare acest fişier",
            A11Y: "Blocare acest fişier",
            SUCCESS: "Fişierul este acum blocat.",
            ERROR: "Fişierul nu a putut fi blocat deoarece a fost şters sau nu mai este partajat cu dumneavoastră."
         },
         UNLOCK: {
            NAME: "Deblocare fişier",
            TITLE: "Deblocare acest fişier",
            A11Y: "Deblocare acest fişier",
            SUCCESS: "Acest fişier este acum deblocat.",
            ERROR: "Fişierul nu a putut fi deblocat deoarece a fost şters sau nu mai este partajat cu dumneavoastră."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Editare pe desktop",
            TITLE: "Editare pe desktop",
            A11Y: "Editare pe desktop"
         },
         FLAG: {
            FILE: {
               NAME: "Semnalare ca necorespunzător",
               TITLE: "Semnalare fişier",
               A11Y: "Semnalaţi acest fişier ca necorespunzător",
               PROMPT: "Furnizaţi un motiv pentru semnalarea acestui fişier (opţional):",
               OK: "Steguleţ",
               CANCEL: "Anulare",
               SUCCESS: "Acest fişier a fost semnalat şi trimis pentru examinare.",
               ERROR: "Eroare la semnalarea acestui fişier, vă rugăm încercaţi din nou mai târziu."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Succes",
               PROMPT: "Acest fişier a fost semnalat şi trimis pentru examinare.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Semnalare ca necorespunzător",
               TITLE: "Semnalare comentariu",
               A11Y: "Semnalaţi acest comentariu ca necorespunzător",
               PROMPT: "Furnizaţi un motiv pentru semnalarea acestui comentariu (opţional):",
               OK: "Steguleţ",
               CANCEL: "Anulare",
               SUCCESS: "Acest comentariu a fost semnalat şi trimis pentru examinare.",
               ERROR: "Eroare la semnalarea acestui comentariu, vă rugăm încercaţi din nou mai târziu."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Succes",
            PROMPT: "Modificările au fost trimise pentru examinare. Acest fișier nu va fi disponibil până la aprobarea modificărilor.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Buton listă derulantă"
      },
      SECTION: {
         ABOUT: {
            NAME: "Despre acest fişier",
            VIEW_FILE_DETAILS: "Vizualizare detalii fişier",
            A11Y: "Activarea acestei legături va închide vizualizatorul de fişier şi vă va direcţiona la pagina cu detalii fişier pentru acest fişier."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Nu există previzualizare disponibilă pentru acest fişier."
         },
         IMAGE: {
            ZOOM_IN: "Mărire",
            ZOOM_OUT: "Micşorare",
            RESET: "Resetare",
            ZOOM_IN_A11Y: "Acest buton măreşte imaginea.",
            ZOOM_OUT_A11Y: "Acest buton micşorează imaginea.",
            RESET_ZOOM_A11Y: "Acest buton resetează nivelul de panoramare.",
            UNSAFE_PREVIEW: "Fişierul nu poate fi previzualizat, deoarece nu a fost scanat pentru viruşi."
         },
         VIEWER: {
            LOADING: "Încărcare...",
            PUBLISHING: "Publicare...",
            NO_PUBLISHED_VERSION: "Nu este disponibilă nicio versiune publicată a acestui fişier pentru vizualizare.",
            IFRAME_TITLE: "Previzualizarea acestui fişier",
            AUTOPUBLISH_TIMEOUT: "Serverului îi ia prea mult timp să răspundă. S-ar putea ca cele mai recente modificări să nu fi fost publicate."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Fişierul nu poate fi previzualizat, deoarece nu a fost scanat pentru viruşi."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Ultima actualizare de ${user} astăzi la ${time}",
            YESTERDAY: "Ultima actualizare de ${user} ieri la ${time}",
            DAY: "Actualizat ultima dată de ${user} pe ${EEee} la ${time}.",
            MONTH: "Ultima actualizare de ${user} pe ${date_long}",
            YEAR: "Ultima actualizare de ${user} pe ${date_long}"
         },
         CREATED: {
            TODAY: "Creat de ${user} astăzi la ${time}",
            YESTERDAY: "Creat de ${user} ieri la ${time}",
            DAY: "Creat de ${user} pe ${EEee} la ${time}",
            MONTH: "Creat de ${user} pe ${date_long}",
            YEAR: "Creat de ${user} pe ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long} ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Azi",
            YESTERDAY: "${time} - Ieri",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Astăzi",
            YESTERDAY: "Ieri",
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
         TITLE: "Zonă de text comentariu",
         SHADOW_TEXT: "Adăugare comentariu...",
         CANNOT_ACCESS_CONTENT: "Următoarele persoane pe care le-aţi menţionat nu pot vizualiza comentariul deoarece nu au acces la conţinut:",
         ERROR: "A apărut o eroare la validarea utilizatorului pe care încercaţi să-l menţionaţi.",
         POST: "Postare",
         SAVE: "Salvare",
         CANCEL: "Anulare",
         EXTERNAL_WARNING: "Comentariile ar putea fi văzute de oameni din afara organizaţiei dumneavoastră."
      },
      EDIT_BOX: {
         SAVE: "Salvare",
         CANCEL: {
            TOOLTIP: "Anulare",
            A11Y: "Acest buton anulează acţiunea de editare a numelui fişierului."
         },
         INVALID_CHARACTERS: "Caracter invalid",
         INVALID_CHARACTERS_REMOVED: "Caractere invalide înlăturate"
      },
      COMMENT_WIDGET: {
         EDITED: "(Editat)",
         EDITED_DATE: {
            TODAY: "Editat astăzi la ${time}",
            YESTERDAY: "Editat ieri la ${time}",
            DAY: "Editat pe ${EEee} la ${time}",
            MONTH: "Editat pe ${date_long}",
            YEAR: "Editat pe ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Salvare",
         CANCEL: "Anulare",
         USER: "Persoană",
         COMMUNITY: "Comunitate",
         SHARE: "Partajarea",
         SHARE_ALT: "Partajaţi cu această persoană",
         MEMBER_TYPE: "Tip membru",
         PERSON_SHADOW: "Tastaţi pentru a găsi persoana",
         COMMUNITY_SHADOW: "Tastaţi pentru a găsi comunitatea",
         PERSON_ARIA: "Tastați pentru a găsi persoana. Apăsaţi Shift+Tab pentru a comuta între persoane, comunităţi şi toţi din organizaţie.",
         COMMUNITY_ARIA: "Tastați pentru a găsi comunitatea. Apăsaţi Shift+Tab pentru a comuta între persoane, comunităţi şi toţi din organizaţie.",
         PERSON_FULL_SEARCH: "Persoană nelistată? Utilizaţi căutarea completă...",
         COMMUNITY_FULL_SEARCH: "Comunitate nelistată? Utilizaţi căutarea completă...",
         ADD_OPTIONAL_MESSAGE: "Adăugare mesaj opţional",
         ROLE_LABEL: "Rol",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Cititor"
      },
      FILE_STATE: {
         DOCS_FILE: "Acesta este un fișier Docs. Toate editările trebuie făcute online.",
         LOCKED_BY_YOU: {
            TODAY: "Blocat de dvs. la ${time}.",
            YESTERDAY: "Blocat de dumneavoastră ieri la ${time}.",
            DAY: "Blocat de dvs. pe ${date}.",
            MONTH: "Blocat de dvs. pe ${date}.",
            YEAR: "Blocat de dvs. pe ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Blocat la ${time} de către ${user}",
            YESTERDAY: "Blocat ieri la ${time} de către ${user}",
            DAY: "Blocat pe ${date} de către ${user}",
            MONTH: "Blocat pe ${date} de către ${user}",
            YEAR: "Blocat pe ${date_long} de către ${user}"
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Scurtare automată acest text",
         COMMENT: {
            WARN_TOO_LONG: "Comentariul este prea lung.",
            TRIM: "Scurtaţi comentariul?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "Descrierea este prea lungă.",
            TRIM: "Scurtaţi descrierea?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Acest mesaj este prea lung.",
            TRIM: "Scurtaţi mesajul?"
         },
         TAG: {
            WARN_TOO_LONG: "Tagul este prea lung.",
            TRIM: "Scurtaţi tagul?"
         },
         TAGS: {
            WARN_TOO_LONG: "Unul sau mai multe taguri este prea lung.",
            TRIM: "Scurtaţi tagurile?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Nume fişier prea lung"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Acest fişier poate fi editat online de persoanele care au HCL Docs.",
         NO_ENTITLEMENT_LINK: "Acest fișier poate fi editat online de persoanele care au ${startLink}HCL Docs${endLink}.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Acest fişier este momentan este editat pe web de ${users}.",
         UNPUBLISHED_CHANGES: "Există editări ale acestei ciorne ce nu au fost publicate ca şi versiune.",
         PUBLISH_A_VERSION: "Publicaţi o versiune",
         PUBLISH_SUCCESS: "Aţi publicat cu succes o versiune a acestui fişier",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Versiunea nu poate fi publicată deoarece a fost refuzat accesul.",
            NOT_FOUND: "Această versiune nu a putut fi publicată deoarece documentul nu a fost găsit.",
            CANNOT_REACH_REPOSITORY: "Această versiune nu a putut fi publicată deoarece serverul de documente nu se poate conecta la magazia de documente.",
            QUOTA_VIOLATION: "Versiunea nu a putut fi publicată din cauza restricțiilor de spațiu. Îndepărtați celelalte fișiere pentru a elibera suficient spațiu pentru a publica această versiune.",
            CONVERSION_UNAVAILABLE: "Versiunea nu a putut fi publicată deoarece serviciul de conversie documente nu este disponibil. Încercați din nou mai târziu.",
            TOO_LARGE: "Versiunea nu a putut fi publicată deoarece acest document este prea mare.",
            CONVERSION_TIMEOUT: "Versiunea nu a putut fi publicată deoarece durează prea mult pentru serviciul de conversie documente să convertească acest document. Încercați din nou mai târziu.",
            SERVER_BUSY: "Versiunea nu a putut fi publicată deoarece serverul Docs nu este ocupat. Încercați din nou mai târziu.",
            DEFAULT: "Versiunea nu a putut fi publicată deoarece serviciul documente nu este disponibil. Încercați din nou mai târziu."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Editările dvs. sunt în curs de publicare. ${startLink}Reîncărcați pentru a vedea modificările.${endLink}",
            GENERIC: "S-ar putea să fie necesar să reîncărcați pagina pentru a vedea cele mai recente modificări.  ${startLink}Reîncărcare${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Nu există comentarii.",
         MODERATED: "Comentariul a fost trimis pentru examinare şi va fi disponibil  când este aprobat.",
         ERROR: {
            SAVE: {
               DEFAULT: "Comentariul dumneavoastră nu a putut fi salvat. Încercaţi din nou mai târziu.",
               UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou pentru a vă putea salva comentariul.",
               NOT_FOUND: "Comentariul dumneavoastră nu a putut fi salvat deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
               ACCESS_DENIED: "Comentariul dumneavoastră nu a putut fi salvat deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
            },
            DELETE: {
               DEFAULT: "Comentariul dumneavoastră nu a putut fi şters. Încercați din nou mai târziu.",
               UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou pentru a vă putea șterge comentariul.",
               NOT_FOUND: "Comentariul dumneavoastră nu a putut fi şters deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
               ACCESS_DENIED: "Comentariul dumneavoastră nu a putut fi şters deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Salvare",
         EDIT_TAGS: "Editare taguri",
         ERROR: {
            SAVE: {
               DEFAULT: "Tagul nu a putut fi creat. Încercaţi din nou mai târziu."
            },
            DELETE: {
               DEFAULT: "Tagul nu a putut fi şters. Încercaţi din nou mai târziu."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Citiţi mai multe...",
         READ_LESS: "Citiţi mai puţin..."
      },
      SHARE: {
         EVERYONE: "Toată lumea din organizaţia mea",
         ADD_TOOLTIP: "Salvare",
         ROLES: {
            OWNER: "Proprietar",
            EDIT: "Editori",
            VIEW: "Cititori",
            FOLDER: "Partajat cu Foldere"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Proprietar"
            },
            EDIT: {
               ROLE: "Editare",
               ADD: "Adăugare Editor"
            },
            VIEW: {
               ROLE: "Cititor",
               ADD: "Adăugare Cititor"
            },
            FOLDER: {
               ADD: "Adăugare foldere",
               COMMUNITY_ADD: "Adăugare în folder",
               MOVE: "Mutare în Folder"
            },
            MULTI: {
               ADD: "Adăugare persoane sau comunităţi",
               ADD_PEOPLE: "Adăugare persoane"
            }
         },
         PUBLIC: {
            SHORT: "Toată lumea din organizaţia mea",
            LONG: {
               GENERIC: "Toţi din organizaţia dumneavoastră",
               ORG: "Toată lumea din ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Acest fişier este deja partajat cu ${user}.",
            ERROR: "Nu se poate partaja cu ${user} în acest moment.",
            SELF: "Nu puteţi partaja cu dumneavoastră."
         },
         SHARE_INFO: {
            PROMOTED: "${user} a fost promovat la un rol de partajare mai înalt."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Partajat cu succes cu ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Fişierul a fost partajat cu succes."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Mesaj opţional..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Provizionare utilizator extern",
               ACTION: "Provizionare utilizator extern ...",
               TOOLTIP: "Provizionare utilizator extern",
               DIALOG_TITLE: "Conţinutul nu a fost partajat",
               PROMPT: {
                  NO_ACCOUNT: "Utilizatorul următor nu are un cont şi nu a fost partajat conţinut cu el.",
                  INVITE: "Invitaţi acest utilizator ca musafir pentru a partaja conţinutul cu el."
               },
               SUBMIT: "Continuaţi cu invitaţia",
               CANCEL: "Anulare",
               ERROR: "A apărut o eroare la provizionarea contului. Încercați din nou mai târziu.",
               SUCCESS: "Contul de utilizator a fost provizionat cu succes."
            },
            PLURAL: {
               NAME: "Provizionare utilizatori externi",
               ACTION: "Provizionare utilizatori externi...",
               TOOLTIP: "Provizionare utilizatori externi",
               DIALOG_TITLE: "Conţinutul nu a fost partajat",
               PROMPT: {
                  NO_ACCOUNT: "Utilizatorii următori nu au cont şi nu a fost partajat conţinut cu ei.",
                  INVITE: "Invitaţi aceşti utilizatori ca musafiri pentru a partaja conţinutul cu ei."
               },
               SUBMIT: "Continuaţi cu invitaţiile",
               CANCEL: "Anulare",
               ERROR: "A apărut o eroare la provizionarea conturilor. Încercați din nou mai târziu.",
               SUCCESS: "Conturile de utilizator au fost provizionate cu succes."
            },
            ABSTRACT: {
               NAME: "Provizionare utilizatori externi",
               ACTION: "Provizionare utilizatori externi...",
               TOOLTIP: "Provizionare utilizatori externi",
               DIALOG_TITLE: "Conţinutul nu a fost partajat",
               PROMPT: {
                  NO_ACCOUNT: "Utilizatorii următori nu au cont şi nu a fost partajat conţinut cu ei.",
                  INVITE: "Invitaţi aceşti utilizatori ca musafiri pentru a partaja conţinutul cu ei."
               },
               SUBMIT: "Continuaţi cu invitaţiile",
               CANCEL: "Anulare",
               ERROR: "A apărut o eroare la provizionarea conturilor. Încercați din nou mai târziu.",
               SUCCESS: "Conturile de utilizator au fost provizionate cu succes."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opţiuni de partajare",
         PROPAGATION: "Permiteţi altora să partajeze acest fişier",
         EVERYONE: "Toţi pot partaja acest fişier.",
         OWNER_ONLY: "Doar proprietarul poate partaja acest fişier.",
         STOP_SHARE: "Opriţi partajarea",
         MAKE_INTERNAL: "Nu mai partajaţi extern",
         MAKE_INTERNAL_SUCCESS: "Acest fişier nu mai poate fi partajat cu persoane din afara organizaţiei dumneavoastră.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Faceţi intern?",
            PROMPT: "Facerea acestui fişier intern va însemna că nu mai poate fi partajat cu persoane din afara organizaţiei dumneavoastră. ${br}${br}" +
            "Orice partajări cu persoane, comunităţi sau foldere externe vor fi înlăturate.${br}${br}Declararea unui fişier intern este permanentă şi nu poate fi anulată.",
            EFSS: {
               DIALOG_TITLE: "Faceţi intern?",
               PROMPT: "Facerea acestui fişier intern va însemna că nu mai poate fi partajat cu persoane din afara organizaţiei dumneavoastră. ${br}${br}" +
               "Orice partajare cu persoane sau foldere externe va fi înlăturată.${br}${br}Declararea unui fişier intern este permanentă şi nu poate fi anulată."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Oprire partajare fişier",
            PROMPT: "Sunteţi sigur că vreţi să opriţi partajarea acestui fişier.",
            QUESTION_PUBLIC: "Acest fişier nu va mai fi vizibil pentru toţi din organizaţia dumneavoastră sau partajat cu persoane, foldere sau comunităţi. Această operație nu poate fi anulată.",
            QUESTION_PUBLIC_E: "Acest fişier nu va mai fi vizibil pentru toţi din organizaţia dumneavoastră sau partajat cu persoane, foldere sau comunităţi. Această operație nu poate fi anulată.",
            QUESTION: "Acest fişier nu va mai fi partajat cu persoane sau comunităţi, şi va fi înlăturat din toate folderele cu excepţia folderelor dumneavoastră private. Această acțiune nu poate fi anulată.",
            QUESTION_E: "Acest fişier nu va mai fi partajat cu persoane şi va fi înlăturat din toate foldere cu excepţia folderelor dumneavoastră private. Această acțiune nu poate fi anulată."
         },
         MAKE_PRIVATE_SUCCESS: "Acest fişier este privat acum.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Nu se poate opri partajarea fișierului. Încercați din nou mai târziu."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Partajările mele"
      },
      STREAM: {
         LOADING: "Încărcare...",
         LOAD_MORE: "Încărcaţi mai mult..."
      },
      ENTRY: {
         REMOVE: "Înlăturare",
         RESTORE: "Restaurare",
         EDIT: "Editare",
         DELETE: "Ştergere",
         OK: "OK",
         CANCEL: "Anulare",
         USER_PICTURE: "Imaginea lui ${0}",
         FLAG: "Semnalare ca necorespunzător"
      },
      PANEL: {
         LOAD_ERROR: "A fost o eroare la accesarea metadatelor acestui fişier.",
         ABOUT: {
            TITLE: "Despre",
            EXPAND_BUTTON: "Expandaţi acest buton pentru a vedea informaţii suplimentare",
            CURRENT_VERSION_HEADER: "Versiunea curentă ${versionNumber}",
            FILE_SIZE_HEADER: "Dimensiune fişier",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versiunea curentă",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Toate versiunile",
            DOCS_DRAFT_UPDATED_HEADER: "Ciornă editată",
            DOCS_DRAFT_CREATED_HEADER: "Ciornă creată",
            DOCS_UPDATED_HEADER: "A fost publicat",
            DOCS_CREATED_HEADER: "Creat(ă)",
            UPDATED_HEADER: "Actualizate",
            CREATED_HEADER: "Creat(ă)",
            LIKES_HEADER: "Aprecieri",
            LIKES_EXPAND_ICON: "Expandaţi această pictogramă pentru a vedea cine a apreciat fişierul",
            DOWNLOADS_HEADER: "Vizualizări",
            DOWNLOADS_HEADER_MORE: "Vizualizări (${0})",
            DOWNLOADS_EXPAND_ICON: "Expandaţi această pictogramă pentru a vedea cine a vizualizat fişierul",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonim",
            DOWNLOADS_LATEST_VERSION: "Aveţi cea mai recentă versiune a acestui fişier",
            DOWNLOADS_LAST_VERSION: "Aţi vizualizat ultima dată versiunea ${0} a acestui fişier",
            TAGS_HEADER: "Taguri",
            DESCRIPTION_HEADER: "Descriere",
            DESCRIPTION_READ_MORE: "Citiţi mai multe...",
            LINKS_HEADER: "Legături",
            SECURITY: "Securitate",
            FILE_ENCRYPTED: "Conţinutul fişierului este cifrat. Conţinutul de fişier cifrat nu poate fi căutat. Conţinutul fişierului nu poate fi vizualizat şi nu poate fi editat cu HCL Docs.",
            GET_LINKS: "Obţinere legături...",
            ADD_DESCRIPTION: "Adăugaţi o descriere",
            NO_DESCRIPTION: "Nici o descriere",
            ADD_TAGS: "Adăugare taguri",
            NO_TAGS: "Fără taguri"
         },
         COMMENTS: {
            TITLE: "Comentarii",
            TITLE_WITH_COUNT: "Comentarii (${0})",
            VERSION: "Versiune ${0}",
            FEED_LINK: "Alimentare pentru aceste comentarii",
            FEED_TITLE: "Urmăriţi modificările la aceste comentarii prin cititorul dumneavoastră de alimentări"
         },
         SHARING: {
            TITLE: "Partajare",
            TITLE_WITH_COUNT: "A partajat (${0})",
            SHARED_WITH_FOLDERS: "Partajat cu foldere - ${count}",
            SEE_WHO_HAS_SHARED: "Vedeţi cine a partajat",
            COMMUNITY_FILE: "Fişierele deţinute de o Comunitate nu pot fi partajate la persoane sau la alte comunităţi.",
            SHARED_WITH_COMMUNITY: "Partajat cu membrii comunităţii '${0}'",
            LOGIN: "Conectare",
            NO_SHARE: "Acest fişier nu a fost adăugat la niciun folder încă.",
            ONE_SHARE: "Acest fişier se află într-un folder sau o comunitate la care nu aveţi acces.",
            MULTIPLE_SHARE: "Acest fişier se află în ${fileNumber} foldere sau comunităţi la care nu aveţi acces."
         },
         VERSIONS: {
            TITLE: "Versiuni",
            TITLE_WITH_COUNT: "Versiuni (${0})",
            FEED_LINK: "Alimentare pentru aceste versiuni",
            FEED_TITLE: "Urmăriţi modificările la acest fişier prin cititorul dumneavoastră de alimentări"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Confirmare acţiune",
         DIALOG_TITLE: "Confirmare",
         PROMPT: "Sunteţi sigur că doriţi să efectuaţi această acţiune?",
         ERROR: "A apărut o eroare la realizarea acțiunii. Încercați din nou mai târziu.",
         TOOLTIP: "Efectuare acţiune",
         OK: "OK",
         CANCEL: "Anulare",
         A11Y: "Acest buton efectuează acţiunea curentă."
      },
      THUMBNAIL: {
         TITLE: "Miniatură",
         CHANGE_LINK: "Modificare miniatură...",
         ERROR: "Miniatura nu a putut fi salvată. Încercați din nou mai târziu.",
         EXT_ERROR: "Selectaţi un fişier cu una dintre următoarele extensii acceptate: ${0}",
         SUCCESS: "Miniatura a fost modificată.",
         UPLOAD: "Salvare",
         CANCEL: "Anulare"
      },
      UPLOAD_VERSION: {
         LINK: "Încărcare versiune nouă...",
         CHANGE_SUMMARY: "Sumar de modificări opţional...",
         ERROR: "Versiunea nouă nu a putut fi salvată. Încercați din nou mai târziu.",
         SUCCESS: "Noua versiune a fost salvată",
         UPLOAD: "Încărcare",
         UPLOAD_AND_CHANGE_EXTENSION: "Încărcare şi modificare extensie",
         CANCEL: "Anulare",
         TOO_LARGE: "${file} este mai mare decât dimensiunea de ${size} permisă pentru fișiere.",
         PROGRESS_BAR_TITLE: "Se încarcă versiunea nouă (${uploaded} din ${total} s-a încărcat)",
         CANCEL_UPLOAD: "Anulare încărcare"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "A apărut o eroare la accesarea fișierului. Încercați din nou mai târziu.",
         UNAUTHENTICATED: "Sesiunea dvs. a expirat. Trebuie să vă conectați din nou înainte de a putea vizualiza fișierul.",
         NOT_FOUND: "Fişierul pe care l-aţi cerut a fost şters sau mutat. Dacă cineva v-a trimis această legătură, verificaţi dacă este corectă.",
         ACCESS_DENIED: "Nu aveţi permisiune să vizualizaţi acest fişier.  Fişierul nu este partajat cu dumneavoastră.",
         ACCESS_DENIED_ANON: "Nu aveţi permisiune să vizualizaţi acest fişier.  Dacă acesta este fişierul dumneavoastră sau a fost partajat cu dumneavoastră, trebuie să vă conectați mai întâi."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Eroare",
         PROMPT: "Fişierul pe care l-aţi cerut a fost şters sau mutat.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Confirmare",
        PROMPT: "Sesiunea dumneavoastră HCL Connections a expirat.${lineBreaks}Faceţi clic pe OK pentru a vă conecta din nou sau pe Anulare pentru a închide acest dialog.",
        OK: "OK",
        CANCEL: "Anulare"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Nu se poate accesa legătura",
        PROMPT: "Ceva a mers prost la accesarea legăturii.${lineBreaks}Faceţi clic pe OK pentru a fi redirectat la pagină.",
        OK: "OK",
        CANCEL: "Anulare"
      },
      LOAD_ERROR: {
         DEFAULT: "Hopa. A fost o eroare la accesarea legăturii.",
         ACCESS_DENIED: "Contactaţi proprietarul fişierului pentru a-i cere permisiunea de a vizualiza fişierul."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Fișier",
         LOAD_ERROR: "Eroare la accesarea fişierului"
      },
      SHARE_WITH_LINK: {
         TITLE: "Partajare prin legătură",
         EMPTY_DESCRIPTION: "Nu aţi creat încă o legătură pentru acest fişier. Creaţi o legătură partajată pe care să o trimiteţi altora, astfel încât să poată previzualiza şi descărca fişierul.",
         CREATE_LINK: "Creare legătură",
         COPY_LINK: "Copiere legătură",
         DELETE_LINK: "Ştergere legătură",
         ACCESS_TYPE_1: "Oricine are legătura poate vizualiza acest fişier",
         ACCESS_TYPE_2: "Persoanele din organizaţia mea pot vizualiza acest fişier",
         ACCESS_TYPE_1_DESCRIPTION: "Persoanele care primesc această legătură pot examina şi descărca acest fişier după ce se loghează în Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Persoanele din organizaţia mea care primesc această legătură pot examina şi descărca acest fişier după ce se loghează în Connections.",
         CHANGE_TYPE_SUCCESS: "Permisiunea la legătură se actualizează la modificarea tipului de acces.",
         CHANGE_TYPE_ERROR: "Actualizările de permisiune la legătură au eşuat la modificarea tipului de acces.",
         COPY_LINK_SUCCESS: "Legătură copiată în clipboard",
         CREATE_SHARELINK_SUCCESS:"Legătura a fost creată cu succes.",
         CREATE_SHARELINK_ERROR:"Nu s-a putut crea o legătură din cauza unei erori.",
         DELETE_SHARELINK_SUCCESS: "A fost ştearsă legătura partajată pentru \"${file}.\"",
         DELETE_SHARELINK_ERROR: "Legătura partajată nu a fost ştearsă. Încercaţi din nou mai târziu.",
         CONFIRM_DIALOG: {
            OK: "Ştergere",
            DIALOG_TITLE: "Ştergere legătură partajată",
            PROMPT: "Acest fişier va deveni inaccesibil pentru toţi cei care au legătura. Sunteţi sigur că vreţi să ştergeţi legătura partajată?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Legătura partajată este activă. Oricine poate vizualiza acest fişier cu legătura. Faceţi clic pentru a copia această legătură.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Legătura partajată este activă. Persoanele din organizaţia mea pot vizualiza acest fişier. Faceţi clic pentru a copia această legătură."
      }
});
