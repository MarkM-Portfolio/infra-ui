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
     FILE_VIEWER_TITLE: "Predogled datoteke",
     FILENAME_TOOLTIP: "Urejanje imena datoteke",
     ICON_TOOLTIP: "Prenesi datoteko",
     ERROR: "Prišlo je do napake.",
     SHARED_EXTERNALLY: "V skupni rabi zunanje",
     FILE_SYNCED: "Dodano v sinhronizacijo",
     MORE_ACTIONS: {
       TITLE: "Več dejanj",
       A11Y: "Odpre spustni meni s seznamom več dejanj, ki jih lahko izvedete za datoteko."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Več možnosti",
         A11Y: "S tem gumbom se odpre meni, ki vsebuje več dejanj."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Urejanje"
         },
         UPLOAD: {
           TITLE: "Naloži"
         }
       }
     },
     WELCOME: {
       TITLE: "Združili smo pogled datotek in podrobnosti",
       SUBTITLE: "Zdaj si lahko datoteko ogledate skupaj z njenimi komentarji.",
       LINES: {
          LINE_1: "Vse informacije in stvari, ki ste jih lahko počeli na stari strani, najdete tukaj.",
          LINE_2: "Komentarji, skupna raba, različice in osnovne informacije so vam na voljo ob strani datoteke."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "S tem gumbom se pomaknete v naslednjo datoteko.",
      PREVIOUS_A11Y: "S tem gumbom se pomaknete v prejšnjo datoteko."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Zapri",
         A11Y: "S tem gumbom zaprete prikazovalnik datotek."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Novo iz datoteke",
         ACTION_NAME:"Ustvari datoteko",
         A11Y: {
           TEXT: "Ustvarite dokument (datoteka DOC, DOCX ali ODT) iz datoteke predloge. Te dokumente lahko uredite v priključnem načinu v aplikaciji Docs.",
           PRES: "Ustvarite predstavitev (datoteka PPT, PPTX ali ODP) iz datoteke predloge. Te predstavitve lahko uredite v priključnem načinu v aplikaciji Docs.",
           SHEET: "Ustvarite preglednico (datoteka XLS, XLSX ali ODS) iz datoteke predloge. Te preglednice lahko uredite v priključnem načinu v aplikaciji Docs."
         },
         PROMPT: {
           TEXT: "Ustvarite dokument (datoteka DOC, DOCX ali ODT) iz datoteke predloge. Te dokumente lahko uredite v priključnem načinu v aplikaciji Docs.",
           PRES: "Ustvarite predstavitev (datoteka PPT, PPTX ali ODP) iz datoteke predloge. Te predstavitve lahko uredite v priključnem načinu v aplikaciji Docs.",
           SHEET: "Ustvarite preglednico (datoteka XLS, XLSX ali ODS) iz datoteke predloge. Te preglednice lahko uredite v priključnem načinu v aplikaciji Docs."
         },
         NAME_FIELD: "Ime:",
         EXTERNAL_FIELD: "Datoteke je mogoče souporabljati z osebami zunaj moje organizacije",
         EXTERNAL_DESC: "Zunanji dostop omogoča, da se datoteke souporabljajo z zunanjimi uporabniki (osebe zunaj vaše organizacije ali podjetja), da se mape souporabljajo z zunanjimi uporabniki in da se skupnosti souporabljajo z zunanjimi osebami kot člani. Zunanji dostop morate nastaviti, ko nalagate datoteko. Pozneje tega ne morete več omogočiti.",
         CREATE_BUTTON: "Ustvari",
         CANCEL: "Prekliči",
         PRE_FILL_NAMES: {
           OTT: "Dokument brez naslova",
           OTS: "Preglednica brez naslova",
           OTP: "Predstavitev brez naslova",
           DOT: "Dokument brez naslova",
           XLT: "Preglednica brez naslova",
           POT: "Predstavitev brez naslova",
           DOTX: "Dokument brez naslova",
           XLTX: "Preglednica brez naslova",
           POTX: "Predstavitev brez naslova"
         },
         ERRORS: {
           NAME_REQUIRED: "Ime dokumenta je zahtevano.",
           ILLEGAL_NAME:"To ni veljaven naslov dokumenta. Podajte drug naslov.",
           WARN_LONG_NAME: "Ime dokumenta je predolgo.",
           TRIM_NAME: "Ali želite skrajšati ime dokumenta?",
           SESSION_TIMEOUT: "Vaša seja je potekla. Prijavite se in poskusite znova.",
           DUPLICATE_NAME: "Najdeno je bilo podvojeno ime datoteke. Vnesite novo ime.",
           SERVER_ERROR: "Strežnik Connections ni na voljo. Obrnite se na skrbnika sistema in poskusite znova pozneje."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Prenesi datoteko",
         A11Y: "S tem gumbom prenesete datoteko."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Prenesi kot PDF",
         TOOLTIP: "Prenesi to datoteko kot datoteko PDF",
         A11Y: "S tem gumbom prenesete datoteko kot PDF.",
         SUCCESS: "Datoteko ste uspešno prenesli kot PDF.",
         ERROR: {
           DEFAULT: "Datoteke ni bilo mogoče prenesti kot PDF.  Poskusite znova pozneje.",
           UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko prenesete datoteko kot PDF, se morate znova prijaviti.",
           NOT_FOUND: "Datoteke ni bilo mogoče prenesti kot PDF, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami.",
           ACCESS_DENIED: "Datoteke ni bilo mogoče prenesti kot PDF, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Za prenos ni na voljo nobene objavljene različice te datoteke.  Različice lahko objavite iz urejevalnika Docs."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Datoteke ni mogoče prenesti",
           CANCEL: "Zapri",
           PROMPT: "Za prenos ni na voljo nobene objavljene različice te datoteke.",
           PROMPT2: "Različice lahko objavite iz urejevalnika Docs."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Datoteke ni mogoče prenesti",
           CANCEL: "Zapri",
           PROMPT: "Za prenos ni na voljo nobene objavljene različice te datoteke.",
           PROMPT2: "Prosite lastnika datoteke, da objavi različico te datoteke."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Prenesi različico",
           OK: "Prenesi različico",
           PROMPT: {
             TODAY: "Odkrit je bil novejši osnutek, nazadnje urejen danes ob ${time}.",
             YESTERDAY: "Odkrit je bil novejši osnutek, nazadnje urejen včeraj ob ${time}.",
             DAY: "Odkrit je bil novejši osnutek, nazadnje urejen ${date}.",
             MONTH: "Odkrit je bil novejši osnutek, nazadnje urejen ${date}.",
             YEAR: "Odkrit je bil novejši osnutek, nazadnje urejen ${date_long}."
           },
           PROMPT2: {
             TODAY: "Ali ste prepričani, da želite nadaljevati s prenosom različice, ki je bila objavljena danes ob ${time}?",
             YESTERDAY: "Ali ste prepričani, da želite nadaljevati s prenosom različice, ki je bila objavljena včeraj ob ${time}?",
             DAY: "Ali ste prepričani, da želite nadaljevati s prenosom različice, ki je bila objavljena ${date}?",
             MONTH: "Ali ste prepričani, da želite nadaljevati s prenosom različice, ki je bila objavljena ${date}?",
             YEAR: "Ali ste prepričani, da želite nadaljevati s prenosom različice, ki je bila objavljena ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Prikaži podokno podrobnosti",
         HIDE: "Skrij podokno podrobnosti",
         SHOW_A11Y: "S tem gumbom preklapljate med odprtim in zaprtim stranskim podoknom. Stransko podokno je trenutno zaprto.",
         HIDE_A11Y: "S tem gumbom preklapljate med odprtim in zaprtim stranskim podoknom. Stransko podokno je trenutno odprto."
       },
       VIEW_DOC: {
         NAME: "Odpri v prikazovalniku Docs",
         TOOLTIP: "Odpri v prikazovalniku Docs",
         A11Y: "S tem gumbom odprete datoteko za ogled v novem oknu brskalnika."
       },
       EDIT_DOC: {
         NAME: "Urejanje v programu Docs",
         TOOLTIP: "Uredite datoteko v programu Docs",
         A11Y: "S tem gumbom odprete datoteko za urejanje v novem oknu."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Urejanje na namizju",
         DIALOG_TITLE: "Urejanje na namizju",
         TOOLTIP: "Uredite ta dokument",
         A11Y: "Ta gumb odpre datoteko za lokalno urejanje.",
         PROMPT: "Ta funkcija vam omogoča lokalno urejanje datoteke.",
         IMPORTANT: "Pomembno:",
         REMINDER: "Ko končate z urejanjem, morate osnutek objaviti s pomočjo namiznih datotečnih spojnikov. Če odpiranje datoteke ne uspe, morate morda namestiti namizne vtičnike.",
         SKIP_DIALOG: "Tega sporočila ne pokaži več.",
         OK: "V redu",
         CANCEL: "Prekliči"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Potrdi",
         DELETE_VERSION: "Izbriši različico ${version}",
         DELETE_VERSION_AND_PRIOR: "Izbriši različico ${version} in vse starejše različice",
         PROMPT: "Izbrisali boste različico ${version}. Ali želite nadaljevati?",
         DELETE_PRIOR: "Izbriši tudi vse starejše različice",
         ERROR: "Med brisanjem različice je prišlo do napake. Poskusite znova pozneje.",
         TOOLTIP: "Izbriši to različico",
         OK: "V redu",
         CANCEL: "Prekliči"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Pridobi povezave",
         LINK_FILE: "Povezava na datoteko:",
         LINK_PREVIEW: "Povezava za predogled datoteke:",
         LINK_DOWNLOAD: "Povezava za prenos datoteke:",
         TOOLTIP: "Povezava na datoteko",
         OK: "Zapri"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Prenesi to različico"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Potrdi",
         PROMPT: "Trenutno različico te datoteke boste zamenjali z različico ${version}. Ali želite nadaljevati?",
         ERROR: "Med obnavljanjem različice je prišlo do napake. Poskusite znova pozneje.",
         TOOLTIP: "Obnovi to različico",
         CHANGE_SUMMARY: "Obnovljeno iz različice ${version}",
         OK: "V redu",
         CANCEL: "Prekliči"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Potrdi",
         REMOVE_EVERYONE: "Ali ste prepričani, da želite odstraniti dostop vaše organizacije do te datoteke? Če odstranite dostop, je datoteka odstranjena iz map in skupnosti, vendar omogoča dostop na ravni organizacije, datoteko pa si lahko ogledujejo in delajo z njo samo lastniki in osebe, ki so jo souporabljale.",
         REMOVE_USER: "Ali ste prepričani, da želite ustaviti skupno rabo z osebo ${user}? Če ustavite skupno rabo, bo uporabnik ${user} lahko dostopal do te datoteke samo prek map ali samo, če je datoteka v skupni rabi z vsemi v vaši organizaciji.",
         REMOVE_COMMUNITY: "Ali ste prepričani, da želite odstraniti to datoteko iz skupnosti ${communityName}?",
         REMOVE_FOLDER: "Ali ste prepričani, da želite odstraniti to datoteko iz mape ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Odstranite dostop organizacije",
         REMOVE_USER_TOOLTIP: "Odstrani vse skupne rabe z osebo ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Odstrani iz skupnosti ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Odstrani iz mape ${folderName}",
         OK: "V redu",
         CANCEL: "Prekliči"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Urejanje tega komentarja"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Potrdi",
         PROMPT: "Ali ste prepričani, da želite izbrisati ta komentar?",
         ERROR: "Med brisanjem komentarja je prišlo do napake. Poskusite znova pozneje.",
         TOOLTIP: "Izbriši ta komentar",
         OK: "V redu",
         CANCEL: "Prekliči"
       },
       LIKE: {
         LIKE: "Dodajte všečnost datoteke",
         UNLIKE: "Odstranite všečnost datoteke",
         LIKE_A11Y: "S tem gumbom dodate všečnost datoteke.",
         UNLIKE_A11Y: "S tem gumbom odstranite všečnost datoteke.",
         LIKED_SUCCESS: "Ta datoteka vam je všeč",
         UNLIKE_SUCCESS: "Ta datoteka vam ni več všeč"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Urejanje opisa",
         ERROR: {
           DEFAULT: "Opisa ni bilo mogoče shraniti. Poskusite znova pozneje.",
           UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko posodobite opis, se morate znova prijaviti.",
           NOT_FOUND: "Opisa ni mogoče shraniti, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami.",
           ACCESS_DENIED: "Opisa ni mogoče shraniti, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Napaka pri shranjevanju imena datoteke",
           CONFLICT: "Ime datoteke že obstaja"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Med spremljanjem te datoteke je prišlo do napake. Poskusite znova pozneje.",
             UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko spremljate datoteko, se morate znova prijaviti.",
             NOT_FOUND: "Te datoteke ne morete spremljati, ker je bila izbrisana ali ni več v skupni rabi z vami.",
             ACCESS_DENIED: "Te datoteke ne morete spremljati, ker je bila izbrisana ali ni več v skupni rabi z vami."
           },
           UNFOLLOW: {
             DEFAULT: "Med prenehanjem spremljanja te datoteke je prišlo do napake. Poskusite znova pozneje.",
             UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko prenehate spremljati datoteko, se morate znova prijaviti.",
             NOT_FOUND: "Te datoteke ne morete prenehati spremljati, ker je bila izbrisana ali ni več v skupni rabi z vami.",
             ACCESS_DENIED: "Te datoteke ne morete prenehati spremljati, ker je bila izbrisana ali ni več v skupni rabi z vami."
           }
         },
         FOLLOW_NAME: "Spremljaj",
         FOLLOW_TOOLTIP: "Spremljaj to datoteko",
         FOLLOW_A11Y: "S tem gumbom začnete spremljati datoteko.",
         FOLLOW_SUCCESS: "Sedaj spremljate to datoteko.",
         STOP_FOLLOWING_NAME: "Prenehaj spremljati",
         STOP_FOLLOWING_TOOLTIP: "Prenehaj spremljati to datoteko",
         STOP_FOLLOWING_A11Y: "S tem gumbom prenehate spremljati datoteko.",
         STOP_FOLLOWING_SUCCESS: "Prenehali ste spremljati to datoteko."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Dodaj v sinhronizacijo",
           TOOLTIP: "Dodaj to datoteko v sinhronizacijo",
           A11Y: "S tem gumbom dodate datoteko v sinhronizacijo.",
           SUCCESS: "To datoteko ste dodali v sinhronizacijo.",
           ERROR: {
             DEFAULT: "Med dodajanjem te datoteke v sinhronizacijo je prišlo do napake. Poskusite znova pozneje.",
             UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko dodate to datoteko v sinhronizacijo, se morate znova prijaviti.",
             NOT_FOUND: "Te datoteke ne morete dodati v sinhronizacijo, ker je bila izbrisana ali ni več v skupni rabi z vami.",
             ACCESS_DENIED: "Te datoteke ne morete dodati v sinhronizacijo, ker je bila izbrisana ali ni več v skupni rabi z vami."
           }
         },
         STOP_SYNC: {
           NAME: "Odstrani iz sinhronizacije",
           TOOLTIP: "Odstrani to datoteko iz sinhronizacije",
           A11Y: "S tem gumbom odstranite datoteko iz sinhronizacije.",
           SUCCESS: "To datoteko ste odstranili iz sinhronizacije.",
           ERROR: {
             DEFAULT: "Med odstranjevanjem te datoteke iz sinhronizacije je prišlo do napake. Poskusite znova pozneje.",
             UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko odstranite to datoteko iz sinhronizacije, se morate znova prijaviti.",
             NOT_FOUND: "Te datoteke ne morete odstraniti iz sinhronizacije, ker je bila izbrisana ali ni več v skupni rabi z vami.",
             ACCESS_DENIED: "Te datoteke ne morete odstraniti iz sinhronizacije, ker je bila izbrisana ali ni več v skupni rabi z vami."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Pripni",
          FAVORITE_TOOLTIP: "Pripni to datoteko",
          FAVORITE_A11Y: "S tem gumbom pripnete datoteko.",
          FAVORITE_SUCCESS: "Pripeli ste to datoteko.",
          STOP_FAVORITEING_NAME: "Odpni",
          STOP_FAVORITEING_TOOLTIP: "Odpni to datoteko",
          STOP_FAVORITEING_A11Y: "S tem gumbom odpnete datoteko.",
          STOP_FAVORITEING_SUCCESS: "To datoteko ste odpeli."
       },
       TRASH: {
         NAME: "Premakni v koš",
         DIALOG_TITLE: "Potrdi",
         PROMPT: "Ali ste prepričani, da želite premakniti to datoteko v koš? Če premaknete to datoteko v koš, ne bo na voljo nobeni osebi, s katero je v skupni rabi.",
         ERROR: "Med brisanjem datoteke je prišlo do napake. Poskusite znova pozneje.",
         TOOLTIP: "Izbriši to datoteko",
         OK: "V redu",
         CANCEL: "Prekliči",
         A11Y: "S tem gumbom premaknete datoteko v koš.",
         SUCCESS_MSG: "Datoteka ${file} je bila premaknjena v koš."
       },
       REFRESH: {
         NAME: "Osveži",
         ERROR: "Med osveževanjem prikazovalnika datotek je prišlo do napake. Poskusite znova pozneje.",
         TOOLTIP: "Osvežite prikazovalnik datotek",
         INFO_MSG: "Osvežite, da dobite najnovejšo vsebino. ${link}",
         A11Y: "S tem gumbom premaknete datoteko v koš.",
         SUCCESS_MSG: "Vsebina je bila uspešno osvežena."
       },
       COPY_FILE: {
         NAME: "Daj kopijo v skupnost",
         DIALOG_TITLE: "Potrdi",
         ERROR: "Med kopiranjem datoteke je prišlo do napake. Poskusite znova pozneje.",
         TOOLTIP: "Daj kopijo te datoteke v skupnost",
         OK: "V redu",
         CANCEL: "Prekliči",
         A11Y: "S tem gumbom odprete pogovorno okno, kjer lahko skupnosti daste kopijo te datoteke.",
         SUCCESS_MSG: "Datoteka ${file} je bila prekopirana v skupnost ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Naloži novo različico",
         NAME_SHORT: "Naloži",
         CHANGE_SUMMARY: "Izbirni povzetek sprememb ...",
         TOOLTIP: "Naloži novo različico te datoteke",
         A11Y: "S tem gumbom odprete pogovorno okno, kjer lahko naložite novo različico te datoteke."
       },
       LOG_IN: {
    	   NAME: "Prijava",
    	   TOOLTIP: "Prijavite se, da naložite in souporabljate datoteke, dodajate komentarje in ustvarjate mape"
       },
       LOCK: {
          NAME: "Zakleni datoteko",
          TITLE: "Zakleni to datoteko",
          A11Y: "Zakleni to datoteko",
          SUCCESS: "Datoteka je sedaj zaklenjena."
       },
       UNLOCK: {
          NAME: "Odkleni datoteko",
          TITLE: "Odkleni to datoteko",
          A11Y: "Odkleni to datoteko",
          SUCCESS: "Datoteka je sedaj odklenjena."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Urejanje na namizju",
          TITLE: "Urejanje na namizju",
          A11Y: "Urejanje na namizju"
       },
       FLAG: {
         FILE: {
           NAME: "Označi z zastavico kot neprimerno",
           TITLE: "Označi datoteko z zastavico",
           A11Y: "Označite to datoteko z zastavico kot neprimerno",
           PROMPT: "Podajte razlog za označitev te datoteke z zastavico (izbirno):",
           OK: "Označi z zastavico",
           CANCEL: "Prekliči",
           SUCCESS: "Datoteka je bila označena z zastavico in predložena v pregled.",
           ERROR: "Napaka pri označevanju te datoteke z zastavico. Poskusite znova pozneje."
         },
         COMMENT: {
           NAME: "Označi z zastavico kot neprimerno",
           TITLE: "Označi komentar z zastavico",
           A11Y: "Označite ta komentar z zastavico kot neprimernega",
           PROMPT: "Podajte razlog za označitev tega komentarja z zastavico (izbirno):",
           OK: "Označi z zastavico",
           CANCEL: "Prekliči",
           SUCCESS: "Komentar je bil označen z zastavico in predložen v pregled.",
           ERROR: "Napaka pri označevanju tega komentarja z zastavico. Poskusite znova pozneje."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "O tej datoteki",
       VIEW_FILE_DETAILS: "Ogled podrobnosti o datoteki",
       A11Y: "Z aktiviranjem te povezave boste zaprli prikazovalnik datotek in odprli stran s podrobnostmi o datoteki za to datoteko."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Predogled ni na voljo za to datoteko."
      },
      IMAGE: {
       ZOOM_IN: "Povečaj",
       ZOOM_OUT: "Pomanjšaj",
       RESET: "Ponastavi",
       ZOOM_IN_A11Y: "S tem gumbom povečate sliko.",
       ZOOM_OUT_A11Y: "S tem gumbom pomanjšate sliko.",
       RESET_ZOOM_A11Y: "S tem gumbom ponastavite raven povečave/pomanjšave."
      },
      VIEWER: {
       LOADING: "Nalaganje ...",
       NO_PUBLISHED_VERSION: "Objavljena različica te datoteke ni na voljo za ogled.",
       IFRAME_TITLE: "Predogled datoteke"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Nazadnje posodobila oseba ${user} danes ob ${time}",
       YESTERDAY: "Nazadnje posodobila oseba ${user} včeraj ob ${time}",
       DAY: "Nazadnje posodobila oseba ${user} dne ${EEee} ob ${time}",
       MONTH: "Nazadnje posodobila oseba ${user} dne ${date_long}",
       YEAR: "Nazadnje posodobila oseba ${user} dne ${date_long}"
      },
      CREATED: {
       TODAY: "Ustvarila oseba ${user} danes ob ${time}",
       YESTERDAY: "Ustvarila oseba ${user} včeraj ob ${time}",
       DAY: "Ustvarila oseba ${user} na dan: ${EEee} ob ${time}",
       MONTH: "Ustvarila oseba ${user} dne ${date_long}",
       YEAR: "Ustvarila oseba ${user} dne ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - danes",
       YESTERDAY: "${time} - včeraj",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Danes",
       YESTERDAY: "Včeraj",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size} B",
      KILOBYTES: "${size} kB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Področje z besedilom komentarja",
       SHADOW_TEXT: "Dodaj komentar ...",
       CANNOT_ACCESS_CONTENT: "Naslednje osebe, ki ste jih omenili, si ne bodo mogle ogledati komentarja, ker nimajo dostopa do vsebine:",
       ERROR: "Pri preverjanju uporabnika, ki ga poskušate omeniti, je prišlo do napake.",
       POST: "Objavi",
       SAVE: "Shrani",
       CANCEL: "Prekliči",
       EXTERNAL_WARNING: "Komentarje lahko vidijo osebe zunaj vaše organizacije."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Prekliči",
         A11Y: "S tem gumbom prekličete dejanje urejanja imena datoteke."
       },
       INVALID_CHARACTERS: "Neveljaven znak",
       INVALID_CHARACTERS_REMOVED: "Neveljavni znaki so bili odstranjeni"
     },
     COMMENT_WIDGET: {
       EDITED: "(Urejeno)",
       EDITED_DATE: {
         TODAY: "Urejeno danes ob ${time}",
         YESTERDAY: "Urejeno včeraj ob ${time}",
         DAY: "Urejeno ${EEee} ob ${time}",
         MONTH: "Urejeno ${date_long}",
         YEAR: "Urejeno ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Shrani",
       CANCEL: "Prekliči",
       USER: "Uporabnik",
       COMMUNITY: "Skupnost",
       SHARE: "Skupna raba",
       SHARE_ALT: "Daj v skupno rabo s tem uporabnikom",
       MEMBER_TYPE: "Vrsta člana",
       PERSON_SHADOW: "Vnesite iskani izraz, da poiščete osebo",
       COMMUNITY_SHADOW: "Vnesite iskani izraz, da poiščete skupnost",
       PERSON_FULL_SEARCH: "Ali oseba ni navedena? Uporabite celotno iskanje ...",
       COMMUNITY_FULL_SEARCH: "Ali skupnost ni navedena? Uporabite celotno iskanje ...",
       ADD_OPTIONAL_MESSAGE: "Dodaj izbirno sporočilo",
       ROLE_LABEL: "Vloga",
       ROLE_EDIT: "Urednik",
       ROLE_VIEW: "Bralec"
     },
     FILE_STATE: {
       DOCS_FILE: "To je datoteka Docs. Vsa urejanja morate narediti v priključnem načinu.",
       LOCKED_BY_YOU: {
         TODAY: "Zaklenili ste ob ${time}.",
         YESTERDAY: "Zaklenili ste včeraj ob ${time}.",
         DAY: "Zaklenili ste dne ${date}.",
         MONTH: "Zaklenili ste dne ${date}.",
         YEAR: "Zaklenili ste dne ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Zaklenila oseba ${user} ob ${time}.",
         YESTERDAY: "Zaklenila oseba ${user} včeraj ob ${time}.",
         DAY: "Zaklenila oseba ${user}, ${date}.",
         MONTH: "Zaklenila oseba ${user}, ${date}.",
         YEAR: "Zaklenila oseba ${user}, ${date_long}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Komentar je predolg.",
         TRIM: "Ali želite skrajšati ta komentar?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Opis je predolg.",
         TRIM: "Ali želite skrajšati opis?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Sporočilo je predolgo.",
         TRIM: "Ali želite skrajšati sporočilo?"
       },
       TAG: {
         WARN_TOO_LONG: "Oznaka je predolga.",
         TRIM: "Ali želite skrajšati oznako?"
       },
       TAGS: {
         WARN_TOO_LONG: "Ena ali več oznak je predolgih.",
         TRIM: "Ali želite skrajšati oznake?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Ime datoteke je predolgo"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Ta datoteka je za spletno urejanje na voljo samo, če ste nabavili upravičenje za Docs.",
       CURRENT_EDITORS: "Datoteko trenutno na spletu ureja oseba ${users}.",
       UNPUBLISHED_CHANGES: "Ni urejanj tega osnutka, ki ne bi bila objavljena kot različica.",
       PUBLISH_A_VERSION: "Objavi kot različico",
       PUBLISH_SUCCESS: "Različico te datoteke ste uspešno objavili",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Različice ni bilo mogoče objaviti, ker je bil dostop zavrnjen.",
         NOT_FOUND: "Različice ni bilo mogoče objaviti, ker dokumenta ni bilo mogoče najti.",
         CANNOT_REACH_REPOSITORY: "Različice ni bilo mogoče objaviti, ker se strežnik Docs ne more povezati z repozitorijem datotek.",
         QUOTA_VIOLATION: "Različice ni bilo mogoče objaviti zaradi omejitve prostora. Odstranite druge datoteke, da sprostite dovolj prostora za objavo te različice.",
         CONVERSION_UNAVAILABLE: "Različice ni bilo mogoče objaviti, ker storitev za pretvorbo dokumentov Docs ni na voljo. Poskusite znova pozneje.",
         TOO_LARGE: "Različice ni bilo mogoče objaviti, ker je dokument prevelik.",
         CONVERSION_TIMEOUT: "Različice ni bilo mogoče objaviti, ker storitev za pretvorbo dokumentov Docs potrebuje preveč časa za pretvorbo dokumenta. Poskusite znova pozneje.",
         SERVER_BUSY: "Različice ni bilo mogoče objaviti, ker je strežnik Docs zaseden. Poskusite znova pozneje.",
         DEFAULT: "Različice ni bilo mogoče objaviti, ker storitev Docs ni na voljo. Poskusite znova pozneje."
       }
     },
     COMMENTS: {
       EMPTY: "Ni komentarjev.",
       MODERATED: "Komentar je bil predložen v pregled in bo na voljo po odobritvi.",
       ERROR: {
         SAVE: {
           DEFAULT: "Vašega komentarja ni bilo mogoče shraniti. Poskusite znova pozneje.",
           UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko shranite komentar, se morate znova prijaviti.",
           NOT_FOUND: "Vašega komentarja ni mogoče shraniti, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami.",
           ACCESS_DENIED: "Vašega komentarja ni mogoče shraniti, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami."
         },
         DELETE: {
           DEFAULT: "Vašega komentarja ni bilo mogoče izbrisati. Poskusite znova pozneje.",
           UNAUTHENTICATED: "Vaša seja je potekla. Preden lahko izbrišete komentar, se morate znova prijaviti.",
           NOT_FOUND: "Vašega komentarja ni mogoče izbrisati, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami.",
           ACCESS_DENIED: "Vašega komentarja ni mogoče izbrisati, ker je bila datoteka izbrisana ali pa ni več v skupni rabi z vami."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Shrani",
       EDIT_TAGS: "Urejanje oznak",
       ERROR: {
         SAVE: {
           DEFAULT: "Oznake ni bilo mogoče ustvariti. Poskusite znova pozneje."
         },
         DELETE: {
           DEFAULT: "Oznake ni mogoče izbrisati. Poskusite znova pozneje."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Preberite več ...",
       READ_LESS: "Preberite manj ..."
     },
     SHARE: {
	     EVERYONE: "Vsi v moji organizaciji",
	     ADD_TOOLTIP: "Shrani",
	     ROLES: {
	       OWNER: "Lastnik",
	       EDIT: "Uredniki",
	       VIEW: "Bralci",
	       FOLDER: "V skupni rabi z mapami"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Lastnik"
	       },
	       EDIT: {
	         ROLE: "Urejanje",
           ADD: "Dodaj urednika"
	       },
	       VIEW: {
	         ROLE: "Bralec",
           ADD: "Dodaj bralca"
	       },
	       FOLDER: {
           ADD: "Dodaj mape",
           COMMUNITY_ADD: "Dodaj v mapo",
           MOVE: "Premakni v mapo"
	       },
	       MULTI: {
	         ADD: "Dodaj osebe ali skupnosti",
	         ADD_PEOPLE: "Dodaj osebe"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Vsi v moji organizaciji",
	        LONG: {
	           GENERIC: "Vsi v vaši organizaciji.",
	           ORG: "Vsi v ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Ta datoteka je že v skupni rabi z osebo ${user}.",
	       ERROR: "Skupna raba z osebo ${user} trenutno ni mogoča.",
	       SELF: "Ne morete souporabljati sami s sabo."
	     },
	     SHARE_INFO: {
	       PROMOTED: "Oseba ${user} je bila povišana v višjo vlogo skupne rabe."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Skupna raba z osebo ${user} je uspela"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Izbirno sporočilo ..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Preskrba zunanjega uporabnika",
            ACTION: "Preskrba zunanjega uporabnika ...",
            TOOLTIP: "Preskrba zunanjega uporabnika",
            DIALOG_TITLE: "Vsebina ni bila dana v skupno rabo",
            PROMPT: {
              NO_ACCOUNT: "Naslednji uporabnik nima računa, zato vsebina ni bila dana v skupno rabo z njim.",
              INVITE: "Povabite uporabnika kot gosta, da lahko z njim souporabljate vsebino."
            },
            SUBMIT: "Nadaljuj z vabilom",
            CANCEL: "Prekliči",
            ERROR: "Med preskrbo računa je prišlo do napake. Poskusite znova pozneje.",
            SUCCESS: "Uporabniški račun je bil uspešno preskrbljen."
	       },
	       PLURAL: {
	         NAME: "Preskrba zunanjih uporabnikov",
	         ACTION: "Preskrba zunanjih uporabnikov ...",
	         TOOLTIP: "Preskrba zunanjih uporabnikov",
	         DIALOG_TITLE: "Vsebina ni bila dana v skupno rabo",
	         PROMPT: {
	           NO_ACCOUNT: "Naslednji uporabniki nimajo računa, zato vsebina ni bila dana v skupno rabo z njimi.",
	           INVITE: "Povabite te uporabnike kot goste, da boste lahko souporabljali vsebino z njimi."
	         },
	         SUBMIT: "Nadaljuj z vabili",
	         CANCEL: "Prekliči",
	         ERROR: "Med preskrbo računov je prišlo do napake. Poskusite znova pozneje.",
	         SUCCESS: "Uporabniški računi so bili uspešno preskrbljeni."
	       },
	       ABSTRACT: {
	         NAME: "Preskrba zunanjih uporabnikov",
            ACTION: "Preskrba zunanjih uporabnikov ...",
            TOOLTIP: "Preskrba zunanjih uporabnikov",
            DIALOG_TITLE: "Vsebina ni bila dana v skupno rabo",
            PROMPT: {
              NO_ACCOUNT: "Nekateri uporabniki nimajo računov, zato vsebina ni bila dana v skupno rabo z njimi.",
              INVITE: "Povabite te uporabnike kot goste, da boste lahko souporabljali vsebino z njimi."
            },
            SUBMIT: "Nadaljuj z vabili",
            CANCEL: "Prekliči",
            ERROR: "Med preskrbo računov je prišlo do napake. Poskusite znova pozneje.",
            SUCCESS: "Uporabniški računi so bili uspešno preskrbljeni."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Možnosti skupne rabe",
         PROPAGATION: "Dovoli drugim, da souporabljajo to datoteko",
         EVERYONE: "To datoteko lahko souporabljajo vsi uporabniki.",
         OWNER_ONLY: "To datoteko lahko souporablja samo lastnik.",
         STOP_SHARE: "Ustavi skupno rabo",
         MAKE_INTERNAL: "Ustavi zunanjo skupno rabo",
         MAKE_INTERNAL_SUCCESS: "Te datoteke ni več mogoče souporabljati z osebami zunaj organizacije.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Jo želite določiti kot notranjo?",
           PROMPT: "Če bo ta datoteka notranja, to pomeni, da je ni več mogoče souporabljati z osebami zunaj organizacije. ${br}${br}" +
             "Skupne rabe z zunanjimi osebami, skupnostmi ali mapami bodo odstranjene.${br}${br}Spreminjanje datoteke v notranjo je trajno dejanje in ga ni mogoče razveljaviti."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Ustavi skupno rabo datoteke",
           PROMPT: "Ali ste prepričani, da želite ustaviti skupno rabo trenutne datoteke?",
           QUESTION_PUBLIC: "Ta datoteka ne bo več vidna vsem v vaši organizaciji ali v skupni rabi z osebami, mapami ali skupnostmi. Te operacije ni mogoče razveljaviti.",
           QUESTION_PUBLIC_E: "Ta datoteka ne bo več vidna vsem v vaši organizaciji ali v skupni rabi z osebami ali mapami. Te operacije ni mogoče razveljaviti.",
           QUESTION: "Datoteka ne bo več v skupni rabi z osebami ali skupnostmi in bo odstranjena iz vseh map, razen vaših zasebnih map. Tega dejanja ni mogoče razveljaviti.",
           QUESTION_E: "Datoteka ne bo več v skupni rabi z osebam in bo odstranjena iz vseh map razen iz vaših zasebnih map. Tega dejanja ni mogoče razveljaviti."
         },
         MAKE_PRIVATE_SUCCESS: "Ta datoteka je sedaj zasebna.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Skupne rabe te datoteke ni mogoče ustaviti. Poskusite znova pozneje."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Moje skupne rabe"
	   },
	   STREAM: {
	     LOADING: "Nalaganje ...",
	     LOAD_MORE: "Naloži več ..."
	   },
	   ENTRY: {
	     REMOVE: "Odstrani",
	     RESTORE: "Obnovi",
	     EDIT: "Urejanje",
	     DELETE: "Izbriši",
	     OK: "V redu",
	     CANCEL: "Prekliči",
	     USER_PICTURE: "Slika osebe ${0}",
	     FLAG: "Označi z zastavico kot neprimerno"
	   },
	   PANEL: {
	     LOAD_ERROR: "Med dostopanjem do metapodatkov te datoteke je prišlo do napake. ",
	     ABOUT: {
	       TITLE: "O programu",
	       EXPAND_BUTTON: "Razširite ta gumb za prikaz več informacij",
	       CURRENT_VERSION_HEADER: "Trenutna različica ${versionNumber}",
	       FILE_SIZE_HEADER: "Velikost datoteke",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - trenutna različica",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - vse različice",
	       DOCS_DRAFT_UPDATED_HEADER: "Osnutek je urejen",
	       DOCS_DRAFT_CREATED_HEADER: "Osnutek je ustvarjen",
	       DOCS_UPDATED_HEADER: "Objavljeno",
	       DOCS_CREATED_HEADER: "Ustvarjeno",
	       UPDATED_HEADER: "Posodobljeno",
	       CREATED_HEADER: "Ustvarjeno",
	       LIKES_HEADER: "Všečnosti",
	       LIKES_EXPAND_ICON: "Razširite to ikono, da si ogledate, komu je datoteka všeč",
	       DOWNLOADS_HEADER: "Prenosi",
	       DOWNLOADS_HEADER_MORE: "Prenosi (${0})",
	       DOWNLOADS_EXPAND_ICON: "Razširite to ikono, da si ogledate, kdo je prenesel datoteko",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - št. anonimnih prenosov: ${anonymousDownloads}",
	       DOWNLOADS_LATEST_VERSION: "Imate najnovejšo različico te datoteke",
	       DOWNLOADS_LAST_VERSION: "Nazadnje ste prenesli različico ${0} te datoteke",
	       TAGS_HEADER: "Oznake",
	       DESCRIPTION_HEADER: "Opis",
	       DESCRIPTION_READ_MORE: "Preberite več ...",
	       LINKS_HEADER: "Povezave",
	       SECURITY: "Varnost",
	       FILE_ENCRYPTED: "Vsebina datoteke je šifrirana. Iskanje po šifrirani vsebini datoteke ni mogoče. Vsebine datoteke ni mogoče prikazati in je ni mogoče urejati z HCL Docs.",
	       GET_LINKS: "Pridobi povezave ...",
	       ADD_DESCRIPTION: "Dodaj opis",
	       NO_DESCRIPTION: "Brez opisa",
	       ADD_TAGS: "Dodaj oznake",
	       NO_TAGS: "Brez oznak"
	     },
	     COMMENTS: {
	       TITLE: "Komentarji",
	       TITLE_WITH_COUNT: "Komentarji (${0})",
	       VERSION: "Različica ${0}",
	       FEED_LINK: "Vir za te komentarje",
	       FEED_TITLE: "Spremljajte spremembe v teh komentarjih prek bralnika virov"
	     },
	     SHARING: {
	       TITLE: "Skupna raba",
	       TITLE_WITH_COUNT: "V skupni rabi z (${0})",
	       SHARED_WITH_FOLDERS: "V skupni rabi z mapami - ${count}",
	       SEE_WHO_HAS_SHARED: "Oglejte si, kdo je souporabljal",
           COMMUNITY_FILE: "Datotek, ki so v lasti skupnosti, ni mogoče dati v skupno rabo z drugimi osebami ali skupnostmi.",
           SHARED_WITH_COMMUNITY: "V skupni rabi s člani skupnosti '${0}'",
           LOGIN: "Prijava",
           NO_SHARE: "Ta datoteka še ni bila dodana v mape.",
           ONE_SHARE: "Ta datoteka je v eni mapi ali skupnosti, do katere nimate dostopa.",
           MULTIPLE_SHARE: "Ta datoteka je v ${fileNumber} mapah ali skupnostih, do katerih nimate dostopa."
	     },
	     VERSIONS: {
	       TITLE: "Različice",
	       TITLE_WITH_COUNT: "Različice (${0})",
	       FEED_LINK: "Vir za te različice",
	       FEED_TITLE: "Spremljajte spremembe te datoteke prek bralnika virov"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Potrditev dejanja",
       DIALOG_TITLE: "Potrdi",
       PROMPT: "Ali ste prepričani, da želite izvesti to dejanje?",
       ERROR: "Med izvajanjem dejanja je prišlo do napake. Poskusite znova pozneje.",
       TOOLTIP: "Izvedi dejanje",
       OK: "V redu",
       CANCEL: "Prekliči",
       A11Y: "Gumb izvede trenutno dejanje."
     },
     THUMBNAIL: {
       TITLE: "Sličica",
       CHANGE_LINK: "Spremeni sličico ...",
       ERROR: "Sličice ni bilo mogoče shraniti. Poskusite znova pozneje.",
       EXT_ERROR: "Izberite datoteko z eno od naslednjih podprtih pripon: ${0}",
       SUCCESS: "Sličica je bila spremenjena",
       UPLOAD: "Shrani",
       CANCEL: "Prekliči"
     },
     UPLOAD_VERSION: {
       LINK: "Naloži novo različico ...",
       CHANGE_SUMMARY: "Izbirni povzetek sprememb ...",
       ERROR: "Nove različice ni bilo mogoče shraniti. Poskusite znova pozneje.",
       SUCCESS: "Nova različica je bila shranjena.",
       UPLOAD: "Naloži",
       UPLOAD_AND_CHANGE_EXTENSION: "Naloži in spremeni pripono",
       CANCEL: "Prekliči"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Med dostopanjem do datoteke je prišlo do napake. Poskusite znova pozneje.",
       UNAUTHENTICATED: "Vaša seja je potekla. Preden si lahko ogledate datoteko, se morate znova prijaviti.",
       NOT_FOUND: "Datoteka, ki ste jo zahtevali, je bila izbrisana ali premaknjena. Če vam je to povezavo poslala določena oseba, preverite, ali je pravilna.",
       ACCESS_DENIED: "Za ogled te datoteke nimate dovoljenja. Datoteka ni v skupni rabi z vami.",
       ACCESS_DENIED_ANON: "Za ogled te datoteke nimate dovoljenja. Če je to vaša datoteka oz. jo souporabljate, se morate najprej prijaviti."
     },
     LOAD_ERROR: {
       DEFAULT: "Ups. Pri dostopanju do povezave je prišlo do napake.",
       ACCESS_DENIED: "Obrnite se na lastnika datoteke in ga prosite za dovoljenje za ogled datoteke."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Datoteka",
       LOAD_ERROR: "Napaka pri dostopanju do datoteke"
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
