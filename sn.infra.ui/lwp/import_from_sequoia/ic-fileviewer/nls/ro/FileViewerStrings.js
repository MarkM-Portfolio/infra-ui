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
     FILE_VIEWER_TITLE: "Previzualizare fişier",
     FILENAME_TOOLTIP: "Editare nume fişier",
     ICON_TOOLTIP: "Descărcare fişier",
     ERROR: "A apărut o eroare.",
     SHARED_EXTERNALLY: "Partajat extern",
     FILE_SYNCED: "A fost adăugat la sincronizare",
     MORE_ACTIONS: {
       TITLE: "Acţiuni suplimentare",
       A11Y: "Deschide un meniu derulant cu o listă cu mai multe acţiuni de realizat pe fişier."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Mai multe opţiuni",
         A11Y: "Acest buton va deschide un meniu pentru opţiuni suplimentare. "
       },
       BUTTON: {
         EDIT: {
           TITLE: "Editare"
         },
         UPLOAD: {
           TITLE: "Încărcare"
         }
       }
     },
     WELCOME: {
       TITLE: "Am combinat vizualizarea Fişier cu detaliile",
       SUBTITLE: "Acum puteţi vizualiza un fişier alături de comentariile sale",
       LINES: {
          LINE_1: "Toate informaţiile şi lucrurile pe care le puteaţi face în pagina veche sunt aici. ",
          LINE_2: "Comentariile, partajarea, versiunile şi informaţiile de bază sunt disponibile în partea laterală a fişierului. "
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Acest buton navighează la următorul fişier.",
      PREVIOUS_A11Y: "Acest buton navighează la fişierul anterior."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Închidere",
         A11Y: "Acest buton închide vizualizatorul de fişier."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Nou din fişier",
         ACTION_NAME:"Creare fişier",
         A11Y: {
           TEXT: "Creaţi un document (fişier DOC, DOCX sau ODT) dintr-un fişier şablon. Puteţi edita aceste documente online în Docs.",
           PRES: "Creaţi o prezentare (fişier PPT, PPTX sau ODP) dintr-un fişier şablon. Puteţi edita aceste prezentări online în Docs.",
           SHEET: "Creaţi o foaie de calcul tabelar (fişier XLS, XLSX sau ODS) dintr-un fişier şablon. Puteţi edita aceste documente foi de calcul în Docs."
         },
         PROMPT: {
           TEXT: "Creaţi un document (fişier DOC, DOCX sau ODT) dintr-un fişier şablon. Puteţi edita aceste documente online în Docs.",
           PRES: "Creaţi o prezentare (fişier PPT, PPTX sau ODP) dintr-un fişier şablon. Puteţi edita aceste prezentări online în Docs.",
           SHEET: "Creaţi o foaie de calcul tabelar (fişier XLS, XLSX sau ODS) dintr-un fişier şablon. Puteţi edita aceste documente foi de calcul în Docs."
         },
         NAME_FIELD: "Nume:",
         EXTERNAL_FIELD: "Fişierele pot fi partajate cu persoane externe organizaţiei mele",
         EXTERNAL_DESC: "Accesul extern permite fişierelor să fie partajate cu persoane externe (persoane din afara organizaţiei sau companiei dumneavoastră), folderele partajate cu utilizatorii externi şi comunităţi cu persoane externe ca membri. Trebuie să setaţi accesul extern la încărcarea unui fişier; acesta nu poate fi activat ulterior.",
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
           DUPLICATE_NAME: "A fost găsit un nume de fişier duplicat. Introduceţi un nume nou.",
           SERVER_ERROR: "Serverul Connections nu este disponibil. Contactaţi administratorul serverului şi încercaţi din nou mai târziu."
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
           DEFAULT: "Nu aţi putut descărca fişierul ca fişier PDF.  Vă rugăm să încercaţi din nou mai târziu.",
           UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a putea descărca fişierul ca fişier PDF.",
           NOT_FOUND: "Fişierul nu a putut fi descărcat ca PDF, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
           ACCESS_DENIED: "Fişierul nu a putut fi descărcat ca PDF, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Nu există o versiune publicată a acestui fişier pentru descărcare.  Versiunile pot fi publicate din editorul Docs."
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
             DAY: "O ciornă mai nouă, editată ultima dată în ${date}, a fost detectată.",
             MONTH: "O ciornă mai nouă, editată ultima dată în ${date}, a fost detectată.",
             YEAR: "O ciornă mai nouă, editată ultima dată în ${date_long}, a fost detectată."
           },
           PROMPT2: {
             TODAY: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată azi la ${time}?",
             YESTERDAY: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată ieri la ${time}?",
             DAY: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată în ${date}?",
             MONTH: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată în ${date}?",
             YEAR: "Sunteţi sigur că doriţi să continuaţi să descărcaţi versiunea ce a fost publicată în ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Afişare panou detalii",
         HIDE: "Ascundere panou detalii",
         SHOW_A11Y: "Acest buton comută deschiderea sau închiderea panoului lateral. Panoul lateral este momentan închis.",
         HIDE_A11Y: "Acest buton comută deschiderea sau închiderea panoului lateral. Panoul lateral este momentan deschis."
       },
       VIEW_DOC: {
         NAME: "Deschidere în Docs Viewer",
         TOOLTIP: "Deschideţi în Vizualizare documente",
         A11Y: "Acest buton deschide fişierul pentru vizualizarea în interiorul unei noi ferestre de browser."
       },
       EDIT_DOC: {
         NAME: "Editare în Docs",
         TOOLTIP: "Editaţi fişierul în Docs",
         A11Y: "Acest buton deschide fişierul pentru editare în Docs în interiorul unei noi ferestre."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Editare pe Desktop",
         DIALOG_TITLE: "Editare pe Desktop",
         TOOLTIP: "Editaţi acest document",
         A11Y: "Acest buton deschide fişierul pentru editarea locală.",
         PROMPT: "Această caracteristică vă permite să editaţi fişierul local.",
         IMPORTANT: "Important:",
         REMINDER: "Odată ce finalizaţi editarea, trebuie să publicaţi o ciornă utilizând conectorii fişierelor de desktop. Dacă fişierul eşuează deschiderea, ar putea fi nevoie să instalaţi plug-in-uri pe desktop.",
         SKIP_DIALOG: "Nu afişaţi din nou acest mesaj.",
         OK: "OK",
         CANCEL: "Anulare"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Confirmare",
         DELETE_VERSION: "Ştergere versiune ${version}",
         DELETE_VERSION_AND_PRIOR: "Ştergeţi versiune ${version} şi toate versiunile anterioare",
         PROMPT: "Sunteţi pe cale să ştergeţi versiunea ${version}. Doriţi să continuaţi?",
         DELETE_PRIOR: "Ştergeţi de asemenea toate versiunile anterioare",
         ERROR: "A apărut o eroare la ştergerea versiunii. Încercaţi din nou mai târziu.",
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
         PROMPT: "Sunteţi pe cale să înlocuiţi versiunea curentă a acestui fişier cu versiunea ${version}. Doriţi să continuaţi?",
         ERROR: "A apărut o eroare la restaurarea versiunii. Încercaţi din nou mai târziu.",
         TOOLTIP: "Restauraţi această versiune",
         CHANGE_SUMMARY: "Restaurat de la versiunea ${version}",
         OK: "OK",
         CANCEL: "Anulare"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Confirmare",
         REMOVE_EVERYONE: "Sunteţi sigur că vreţi să înlăturaţi accesul organizaţiei dumneavoastră la acest fişier?. Dacă accesul este înlăturat, atunci fişierul este înlăturat din folderele şi comunităţile care permit accesul la nivel de organizaţie şi doar proprietarul şi persoanele cu care a fost partajat îl pot vedea şi lucra cu el.",
         REMOVE_USER: "Sunteţi sigur că doriţi oprirea partajării cu ${user}? Dacă opriţi partajarea, ${user} va putea accesa acest fişier doar prin foldere sau dacă este partajat cu toţi din organizaţia dumneavoastră.",
         REMOVE_COMMUNITY: "Sunteţi sigur că doriţi să înlăturaţi acest fişier din comunitatea ${communityName}?",
         REMOVE_FOLDER: "Sunteţi sigur că vreţi să înlăturaţi acest fişier din folderul ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Înăturaţi accesul organizaţiei dumneavoastră",
         REMOVE_USER_TOOLTIP: "Înlăturarea tuturor partajărilor cu ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Înlăturarea din comunitatea ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Înlăturaţi din folderul ${folderName}",
         OK: "OK",
         CANCEL: "Anulare"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Editaţi acest comentariu"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Confirmare",
         PROMPT: "Sunteţi sigur că vreţi să ştergeţi acest comentariu?",
         ERROR: "A apărut o eroare la ştergerea comentariului. Încercaţi din nou mai târziu.",
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
           DEFAULT: "Descrierea nu a putut fi salvată. Încercaţi din nou mai târziu.",
           UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă înregistraţi din nou în istoric înainte de a putea actualiza descrierea.",
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
             DEFAULT: "A fost o eroare la urmărirea acestui fişier. Încercaţi din nou mai târziu.",
             UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a putea urmări acest fişier.",
             NOT_FOUND: "Nu puteţi urmări acest fişier, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
             ACCESS_DENIED: "Nu puteţi urmări acest fişier, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
           },
           UNFOLLOW: {
             DEFAULT: "A fost o eroare la anularea urmăririi acestui fişier. Încercaţi din nou mai târziu.",
             UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a putea anula urmărirea acestui fişier.",
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
           NAME: "Adăugare la Sincronizare",
           TOOLTIP: "Adăugare acest fişier pentru sincronizare",
           A11Y: "Acest buton adaugă fişierul la sincronizare.",
           SUCCESS: "Aţi adăugat acest fişier la sincronizare.",
           ERROR: {
             DEFAULT: "A fost o eroare la adăugarea acestui fişier la sincronizare. Încercaţi din nou mai târziu.",
             UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a putea adăuga acest fişier la sincronizare.",
             NOT_FOUND: "Nu puteţi adăuga acest fişier la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
             ACCESS_DENIED: "Nu puteţi adăuga acest fişier la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
           }
         },
         STOP_SYNC: {
           NAME: "Înlăturare de la sincronizare",
           TOOLTIP: "Înlăturaţi acest fişier de la sincronizare",
           A11Y: "Acest buton înlătură fişierul de la sincronizare.",
           SUCCESS: "Aţi înlăturat acest fişier de la sincronizare.",
           ERROR: {
             DEFAULT: "A fost o eroare la înlăturarea acestui fişier de la sincronizare. Încercaţi din nou mai târziu.",
             UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a putea înlătura acest fişier de la sincronizare.",
             NOT_FOUND: "Nu puteţi înlătura acest fişier de la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
             ACCESS_DENIED: "Nu puteţi înlătura acest fişier de la sincronizare, deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Ţintuire",
          FAVORITE_TOOLTIP: "Ţintuiţi acest fişier",
          FAVORITE_A11Y: "Acest buton ţintuieşte fişierul.",
          FAVORITE_SUCCESS: "Aţi ţintuit acest fişier.",
          STOP_FAVORITEING_NAME: "Anulare ţintuire",
          STOP_FAVORITEING_TOOLTIP: "Anulaţi ţintuirea acestui fişier",
          STOP_FAVORITEING_A11Y: "Acest buton anulează ţintuirea fişierului.",
          STOP_FAVORITEING_SUCCESS: "Aţi anulat ţintuirea acestui fişier."
       },
       TRASH: {
         NAME: "Mutare la Coş de gunoi",
         DIALOG_TITLE: "Confirmare",
         PROMPT: "Sunteţi sigur că doriţi să mutaţi acest fişier în coşul de gunoi? Mutarea acestui fişier în coşul de gunoi îl face indisponibil pentru oricine căruia îi este momentan partajat.",
         ERROR: "A survenit o eroare la ştergerea fişierului. Încercaţi din nou mai târziu.",
         TOOLTIP: "Ştergeţi acest fişier",
         OK: "OK",
         CANCEL: "Anulare",
         A11Y: "Acest buton mută fişierul în coşul de gunoi.",
         SUCCESS_MSG: "${file} a fost mutat în coşul de gunoi."
       },
       REFRESH: {
         NAME: "Reîmprospătare",
         ERROR: "A apărut o eroare la reîmprospătarea Vizualizatorului de fişiere. Încercaţi din nou mai târziu.",
         TOOLTIP: "Reîmprospătare Vizualizator fişiere",
         INFO_MSG: "Reîmprospătaţi pentru a obţine cel mai recent conţinut. ${link}",
         A11Y: "Acest buton mută fişierul în coşul de gunoi.",
         SUCCESS_MSG: "Conţinutul a fost reîmprospătat cu succes."
       },
       COPY_FILE: {
         NAME: "Oferire copie unei comunităţi",
         DIALOG_TITLE: "Confirmare",
         ERROR: "A survenit o eroare la copierea fişierului. Încercaţi din nou mai târziu.",
         TOOLTIP: "Oferiţi o copie a acestui fişier unei comunităţi",
         OK: "OK",
         CANCEL: "Anulare",
         A11Y: "Acest buton deschide un dialog ce vă permite să daţi o copie a acestui fişier comunităţii.",
         SUCCESS_MSG: "${file} a fost copiat în ${community}."
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
          SUCCESS: "Fişierul este acum blocat."
       },
       UNLOCK: {
          NAME: "Deblocare fişier",
          TITLE: "Deblocare acest fişier",
          A11Y: "Deblocare acest fişier",
          SUCCESS: "Acest fişier este acum deblocat."
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
           OK: "Semnalare",
           CANCEL: "Anulare",
           SUCCESS: "Acest fişier a fost semnalat şi trimis pentru examinare.",
           ERROR: "Eroare la semnalarea acestui fişier, vă rugăm încercaţi din nou mai târziu. "
         },
         COMMENT: {
           NAME: "Semnalare ca necorespunzător",
           TITLE: "Semnalare comentariu",
           A11Y: "Semnalaţi acest comentariu ca necorespunzător",
           PROMPT: "Furnizaţi un motiv pentru semnalarea acestui comentariu (opţional):",
           OK: "Semnalare",
           CANCEL: "Anulare",
           SUCCESS: "Acest comentariu a fost semnalat şi trimis pentru examinare.",
           ERROR: "Eroare la semnalarea acestui comentariu, vă rugăm încercaţi din nou mai târziu. "
         }
       }
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
       RESET: "Reset",
       ZOOM_IN_A11Y: "Acest buton măreşte imaginea.",
       ZOOM_OUT_A11Y: "Acest buton micşorează imaginea.",
       RESET_ZOOM_A11Y: "Acest buton resetează nivelul de panoramare."
      },
      VIEWER: {
       LOADING: "Încărcare...",
       NO_PUBLISHED_VERSION: "Nu este disponibilă pentru vizualizare o versiune publicată a acestui fişier.",
       IFRAME_TITLE: "Previzualizarea acestui fişier"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Actualizat ultima dată de ${user} azi la ${time}",
       YESTERDAY: "Actualizat ultima dată de ${user} ieri la ${time}",
       DAY: "Actualizat ultima dată de ${user} pe ${EEee} la ${time}",
       MONTH: "Actualizat ultima dată de ${user} pe ${date_long}",
       YEAR: "Actualizat ultima dată de ${user} pe ${date_long}"
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
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - Astăzi",
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
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Zonă de text comentariu",
       SHADOW_TEXT: "Adăugaţi un comentariu...",
       CANNOT_ACCESS_CONTENT: "Următoarele persoane pe care le-aţi menţionat nu pot vizualiza comentariul deoarece nu au acces la conţinut:",
       ERROR: "A apărut o eroare la validarea utilizatorului pe care încercaţi să-l menţionaţi.",
       POST: "Postare",
       SAVE: "Salvare",
       CANCEL: "Anulare",
       EXTERNAL_WARNING: "Comentariile ar putea fi văzute de oameni din afara organizaţiei dumneavoastră."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Anulare",
         A11Y: "Acest buton anulează acţiunea de editare a numelui fişierului. "
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
       USER: "Utilizator",
       COMMUNITY: "Comunitate",
       SHARE: "Partajare",
       SHARE_ALT: "Partajaţi cu acest utilizator",
       MEMBER_TYPE: "Tip membru",
       PERSON_SHADOW: "Tastaţi pentru a găsi persoana",
       COMMUNITY_SHADOW: "Tastaţi pentru a găsi comunitatea",
       PERSON_FULL_SEARCH: "Persoană nelistată? Utilizaţi căutarea completă...",
       COMMUNITY_FULL_SEARCH: "Comunitatea nu este listată? Utilizaţi căutarea completă...",
       ADD_OPTIONAL_MESSAGE: "Adăugare mesaj opţional",
       ROLE_LABEL: "Rol",
       ROLE_EDIT: "Editor",
       ROLE_VIEW: "Cititor"
     },
     FILE_STATE: {
       DOCS_FILE: "Acesta este un fişier Docs. Toate editările trebuie să fie făcute online.",
       LOCKED_BY_YOU: {
         TODAY: "Blocat de dumneavoastră la ${time}.",
         YESTERDAY: "Blocat de dumneavoastră ieri la ${time}.",
         DAY: "Blocat de dumneavoastră pe ${date}.",
         MONTH: "Blocat de dumneavoastră pe ${date}.",
         YEAR: "Blocat de dumneavoastră pe ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Blocat la ${time} de ${user}.",
         YESTERDAY: "Blocat ieri la ${time} de ${user}.",
         DAY: "Blocat pe ${date} de ${user}.",
         MONTH: "Blocat pe ${date} de ${user}.",
         YEAR: "Blocat pe ${date_long} de ${user}."
       }
     },
     VALIDATION: {
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
       NO_ENTITLEMENT: "Acest fişier este disponibil pentru editare online doar dacă aţi achiziţionat licenţa de Docs.",
       CURRENT_EDITORS: "Acest fişier este momentan este editat pe web de ${users}.",
       UNPUBLISHED_CHANGES: "Există editări ale acestei ciorne ce nu au fost publicate ca şi versiune.",
       PUBLISH_A_VERSION: "Publicaţi o versiune",
       PUBLISH_SUCCESS: "Aţi publicat cu succes o versiune a acestui fişier",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Versiunea nu poate fi publicată deoarece a fost refuzat accesul.",
         NOT_FOUND: "Această versiune nu a putut fi publicată deoarece documentul nu a fost găsit.",
         CANNOT_REACH_REPOSITORY: "Această versiune nu a putut fi publicată deoarece serverul de documente nu se poate conecta la magazia de documente.",
         QUOTA_VIOLATION: "Versiunea nu a putut fi publicată din cauza restricţiilor de spaţiu. Înlăturaţi alte fişiere pentru a elibera suficient spaţiu pentru a publica această versiune.",
         CONVERSION_UNAVAILABLE: "Versiunea nu a putut fi publicată deoarece serviciul de conversie documente nu este disponibil. Încercaţi din nou mai târziu.",
         TOO_LARGE: "Versiunea nu a putut fi publicată deoarece acest document este prea mare.",
         CONVERSION_TIMEOUT: "Versiunea nu a putut fi publicată deoarece durează prea mult pentru serviciul de conversie documente să convertească acest document. Încercaţi din nou mai târziu.",
         SERVER_BUSY: "Versiunea nu a putut fi publicată deoarece serverul de documente este ocupat. Încercaţi din nou mai târziu.",
         DEFAULT: "Versiunea nu a putut fi publicată deoarece serviciul documente nu este disponibil. Încercaţi din nou mai târziu."
       }
     },
     COMMENTS: {
       EMPTY: "Nu există comentarii.",
       MODERATED: "Comentariul a fost trimis pentru examinare şi va fi disponibil  când este aprobat.",
       ERROR: {
         SAVE: {
           DEFAULT: "Comentariul dumneavoastră nu a putut fi salvat. Încercaţi din nou mai târziu.",
           UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a vă putea salva comentariul.",
           NOT_FOUND: "Comentariul dumneavoastră nu a putut fi salvat deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră.",
           ACCESS_DENIED: "Comentariul dumneavoastră nu a putut fi salvat deoarece fişierul a fost şters sau nu mai este partajat cu dumneavoastră."
         },
         DELETE: {
           DEFAULT: "Comentariul dumneavoastră nu a putut fi şters. Încercaţi din nou mai târziu.",
           UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a vă putea şterge comentariul.",
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
	           ORG: "Toţi din ${org}."
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
            ERROR: "A apărut o eroare la provizionarea contului. Încercaţi din nou mai târziu.",
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
	         ERROR: "A apărut o eroare la provizionarea conturilor. Încercaţi din nou mai târziu.",
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
            ERROR: "A apărut o eroare la provizionarea conturilor. Încercaţi din nou mai târziu.",
            SUCCESS: "Conturile de utilizator au fost provizionate cu succes."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Opţiuni partajare",
         PROPAGATION: "Permiteţi altora să partajeze acest fişier",
         EVERYONE: "Oricine poate partaja acest fişier.",
         OWNER_ONLY: "Doar proprietarul poate partaja acest fişier.",
         STOP_SHARE: "Oprire partajare",
         MAKE_INTERNAL: "Nu mai partajaţi extern",
         MAKE_INTERNAL_SUCCESS: "Acest fişier nu mai poate fi partajat cu persoane din afara organizaţiei dumneavoastră.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Faceţi intern?",
           PROMPT: "Facerea acestui fişier intern va însemna că nu va mai putea fi partajat cu persoane din afara organizaţiei dumneavoastră. ${br}${br}" +
             "Orice partajări cu persoane, comunităţi sau foldere externe va fi înlăturată.${br}${br}A face un fişier intern este permanent şi nu mai poate fi anulat."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Oprire partajare fişier",
           PROMPT: "Sunteţi sigur că vreţi să opriţi partajarea acestui fişier.",
           QUESTION_PUBLIC: "Acest fişier nu va mai fi vizibil pentru toţi din organizaţia dumneavoastră sau partajat cu persoane, foldere sau comunităţi. Această operaţie nu poate fi anulată.",
           QUESTION_PUBLIC_E: "Acest fişier nu va mai fi vizibil pentru toţi din organizaţia dumneavoastră sau partajat cu persoane sau foldere. Această operaţie nu poate fi anulată.",
           QUESTION: "Acest fişier nu va mai fi partajat cu persoane sau comunităţi, şi va fi înlăturat din toate folderele cu excepţia folderelor dumneavoastră private. Această acţiune nu poate fi anulată.",
           QUESTION_E: "Acest fişier nu va mai fi partajat cu persoane şi va fi înlăturat din toate foldere cu excepţia folderelor dumneavoastră private. Această acţiune nu poate fi anulată."
         },
         MAKE_PRIVATE_SUCCESS: "Acest fişier este privat acum.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Nu se poate opri partajarea fişierului. Încercaţi din nou mai târziu."
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
	     USER_PICTURE: "Fotografia lui ${0}",
	     FLAG: "Semnalare ca necorespunzător"
	   },
	   PANEL: {
	     LOAD_ERROR: "A fost o eroare la accesarea metadatelor acestui fişier. ",
	     ABOUT: {
	       TITLE: "Despre",
	       EXPAND_BUTTON: "Expandaţi acest buton pentru a vedea informaţii suplimentare",
	       CURRENT_VERSION_HEADER: "Versiune curentă ${versionNumber}",
	       FILE_SIZE_HEADER: "Dimensiune fişier",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versiunea curentă",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - Toate versiunile",
	       DOCS_DRAFT_UPDATED_HEADER: "Ciornă editată",
	       DOCS_DRAFT_CREATED_HEADER: "Ciornă creată",
	       DOCS_UPDATED_HEADER: "Publicat",
	       DOCS_CREATED_HEADER: "Creat",
	       UPDATED_HEADER: "Actualizate",
	       CREATED_HEADER: "Creat",
	       LIKES_HEADER: "Aprecieri",
	       LIKES_EXPAND_ICON: "Expandaţi această pictogramă pentru a vedea cine a apreciat fişierul",
	       DOWNLOADS_HEADER: "Descărcări",
	       DOWNLOADS_HEADER_MORE: "Descărcări (${0})",
	       DOWNLOADS_EXPAND_ICON: "Expandaţi această pictogramă pentru a vedea cine a descărcat fişierul",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonime",
	       DOWNLOADS_LATEST_VERSION: "Aveţi cea mai recentă versiune a acestui fişier",
	       DOWNLOADS_LAST_VERSION: "Aţi descărcat cea mai recentă versiune ${0} a acestui fişier",
	       TAGS_HEADER: "Taguri",
	       DESCRIPTION_HEADER: "Descriere",
	       DESCRIPTION_READ_MORE: "Citiţi mai multe...",
	       LINKS_HEADER: "Legături",
	       SECURITY: "Securitate",
	       FILE_ENCRYPTED: "Conţinutul fişierului este cifrat. Conţinutul de fişier cifrat nu poate fi căutat. Conţinutul fişierului nu poate fi vizualizat şi nu poate fi editat cu HCL Docs.",
	       GET_LINKS: "Obţinere legături...",
	       ADD_DESCRIPTION: "Adăugaţi o descriere",
	       NO_DESCRIPTION: "Nicio descriere",
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
	       TITLE_WITH_COUNT: "Partajate (${0})",
	       SHARED_WITH_FOLDERS: "Partajate cu Foldere - ${count}",
	       SEE_WHO_HAS_SHARED: "Vedeţi cine a partajat",
           COMMUNITY_FILE: "Fişierele deţinute de o Comunitate nu pot fi partajate la persoane sau la alte comunităţi. ",
           SHARED_WITH_COMMUNITY: "Partajat cu membrii comunităţii '${0}'",
           LOGIN: "Logare",
           NO_SHARE: "Acest fişier nu a fost adăugat la niciun folder încă.",
           ONE_SHARE: "Acest fişier se află într-un folder sau o comunitate la care nu aveţi acces. ",
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
       ERROR: "A survenit o eroare la efectuarea acţiunii. Încercaţi din nou mai târziu.",
       TOOLTIP: "Efectuare acţiune",
       OK: "OK",
       CANCEL: "Anulare",
       A11Y: "Acest buton efectuează acţiunea curentă."
     },
     THUMBNAIL: {
       TITLE: "Miniatură",
       CHANGE_LINK: "Modificare miniatură...",
       ERROR: "Miniatura nu poate fi salvată. Încercaţi din nou mai târziu.",
       EXT_ERROR: "Selectaţi un fişier cu una din următoarele extensii suportate: ${0}",
       SUCCESS: "Miniatura a fost modificată.",
       UPLOAD: "Salvare",
       CANCEL: "Anulare"
     },
     UPLOAD_VERSION: {
       LINK: "Încărcare versiune nouă...",
       CHANGE_SUMMARY: "Sumar de modificări opţional...",
       ERROR: "Noua versiune nu a putut fi salvată. Încercaţi din nou mai târziu.",
       SUCCESS: "Noua versiune a fost salvată",
       UPLOAD: "Încărcare",
       UPLOAD_AND_CHANGE_EXTENSION: "Încărcare şi modificare extensie",
       CANCEL: "Anulare"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "A survenit o eroare la accesarea fişierului. Încercaţi din nou mai târziu.",
       UNAUTHENTICATED: "Sesiunea dumneavoastră a expirat. Trebuie să vă logaţi din nou înainte de a putea vizualiza acest fişier.",
       NOT_FOUND: "Fişierul pe care l-aţi cerut a fost şters sau mutat. Dacă cineva v-a trimis această legătură, verificaţi dacă este corectă.",
       ACCESS_DENIED: "Nu aveţi permisiune să vizualizaţi acest fişier. Fişierul nu este partajat cu dumneavoastră.",
       ACCESS_DENIED_ANON: "Nu aveţi permisiune să vizualizaţi acest fişier. Dacă acesta este fişierul dumneavoastră sau a fost partajat cu dumneavoastră, trebuie să vă logaţi mai întâi."
     },
     LOAD_ERROR: {
       DEFAULT: "Hopa. A fost o eroare la accesarea legăturii. ",
       ACCESS_DENIED: "Contactaţi proprietarul fişierului pentru a-i cere permisiunea de a vizualiza fişierul. "
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Fişier",
       LOAD_ERROR: "Eroare la accesarea fişierului"
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
