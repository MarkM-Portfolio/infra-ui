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
     FILE_VIEWER_TITLE: "Náhľad súboru",
     FILENAME_TOOLTIP: "Upraviť názov súboru",
     ICON_TOOLTIP: "Prevziať súbor",
     ERROR: "Nastala chyba.",
     SHARED_EXTERNALLY: "Zdieľané externe",
     FILE_SYNCED: "Pridané do synchronizácie",
     MORE_ACTIONS: {
       TITLE: "Viac akcií",
       A11Y: "Otvorí rozbaľovaciu ponuku so zoznamom ďalších akcií na vykonanie na súbore."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Viac volieb",
         A11Y: "Toto tlačidlo otvorí ponuku pre viac volieb."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Upraviť"
         },
         UPLOAD: {
           TITLE: "Odoslať"
         }
       }
     },
     WELCOME: {
       TITLE: "Skombinovali sme zobrazenie súborov a podrobností",
       SUBTITLE: "Teraz si môžete prezerať súbor a jeho komentáre vedľa seba.",
       LINES: {
          LINE_1: "Nájdete tu všetky informácie a veci, ktoré ste mohli robiť na starej stránke.",
          LINE_2: "Vedľa súboru sú k dispozícii komentáre, zdieľanie, verzie a základné informácie."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Toto tlačidlo vás presunie na ďalší súbor.",
      PREVIOUS_A11Y: "Toto tlačidlo vás presunie na predošlý súbor."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Zatvoriť",
         A11Y: "Toto tlačidlo zatvorí prezerač súborov."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Nový zo súboru",
         ACTION_NAME:"Vytvoriť súbor",
         A11Y: {
           TEXT: "Vytvorte dokument (súbor DOC, DOCX alebo ODT) zo súboru šablóny. Tieto dokumenty môžete upravovať online v Docs.",
           PRES: "Vytvorte prezentáciu (súbor PPT, PPTX alebo ODP) zo súboru šablóny. Tieto prezentácie môžete upravovať online v Docs.",
           SHEET: "Vytvorte tabuľku (súbor XLS, XLSX alebo ODS) zo súboru šablóny. Tieto tabuľky môžete upravovať online v Docs."
         },
         PROMPT: {
           TEXT: "Vytvorte dokument (súbor DOC, DOCX alebo ODT) zo súboru šablóny. Tieto dokumenty môžete upravovať online v Docs.",
           PRES: "Vytvorte prezentáciu (súbor PPT, PPTX alebo ODP) zo súboru šablóny. Tieto prezentácie môžete upravovať online v Docs.",
           SHEET: "Vytvorte tabuľku (súbor XLS, XLSX alebo ODS) zo súboru šablóny. Tieto tabuľky môžete upravovať online v Docs."
         },
         NAME_FIELD: "Názov:",
         EXTERNAL_FIELD: "Súbory možno zdieľať s ľuďmi, ktorí sú externí pre moju organizáciu",
         EXTERNAL_DESC: "Externý prístup umožňuje zdieľať súbory s externými používateľmi (ľudia mimo vašej organizácie alebo spoločnosti), zložky zdieľané s externými používateľmi a komunity s externými ľuďmi ako členmi. Pri odosielaní súboru musíte nastaviť externý prístup; neskôr sa nedá aktivovať.",
         CREATE_BUTTON: "Vytvoriť",
         CANCEL: "Zrušiť",
         PRE_FILL_NAMES: {
           OTT: "Dokument bez názvu",
           OTS: "Tabuľka bez názvu",
           OTP: "Prezentácia bez názvu",
           DOT: "Dokument bez názvu",
           XLT: "Tabuľka bez názvu",
           POT: "Prezentácia bez názvu",
           DOTX: "Dokument bez názvu",
           XLTX: "Tabuľka bez názvu",
           POTX: "Prezentácia bez názvu"
         },
         ERRORS: {
           NAME_REQUIRED: "Vyžaduje sa názov dokumentu.",
           ILLEGAL_NAME:"Toto je neplatný nadpis dokumentu, zadajte iný.",
           WARN_LONG_NAME: "Názov dokumentu je pridlhý.",
           TRIM_NAME: "Má sa skrátiť názov dokumentu?",
           SESSION_TIMEOUT: "Skončila platnosť vašej relácie. Prihláste sa a skúste to znova.",
           DUPLICATE_NAME: "Našiel sa duplicitný názov súboru. Zadajte nový názov.",
           SERVER_ERROR: "Nie je k dispozícii server Connections. Kontaktujte administrátora servera a skúste to znova neskôr."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Prevziať súbor",
         A11Y: "Toto tlačidlo prevezme súbor."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Prevziať ako PDF",
         TOOLTIP: "Prevziať tento súbor ako súbor PDF",
         A11Y: "Toto tlačidlo prevezme súbor ako PDF.",
         SUCCESS: "Úspešne ste prevzali súbor ako PDF.",
         ERROR: {
           DEFAULT: "Nemohli ste prevziať súbor ako PDF.  Skúste to znova neskôr.",
           UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete prevziať súbor ako PDF, musíte sa znova prihlásiť.",
           NOT_FOUND: "Nebolo možné prevziať súbor ako PDF, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
           ACCESS_DENIED: "Nebolo možné prevziať súbor ako PDF, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Neexistuje žiadna zverejnená verzia tohto súboru na prevzatie.  Verzie možno zverejniť z editora Docs."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Nemožno prevziať súbor",
           CANCEL: "Zatvoriť",
           PROMPT: "Neexistuje žiadna zverejnená verzia tohto súboru na prevzatie.",
           PROMPT2: "Verzie možno zverejniť z editora Docs."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Nemožno prevziať súbor",
           CANCEL: "Zatvoriť",
           PROMPT: "Neexistuje žiadna zverejnená verzia tohto súboru na prevzatie.",
           PROMPT2: "Požiadajte vlastníka súboru, aby zverejnil verziu tohto súboru."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Prevziať verziu",
           OK: "Prevziať verziu",
           PROMPT: {
             TODAY: "Našiel sa novší koncept, naposledy upravený dnes o ${time}.",
             YESTERDAY: "Našiel sa novší koncept, naposledy upravený včera o ${time}.",
             DAY: "Našiel sa novší koncept, naposledy upravený dňa ${date}.",
             MONTH: "Našiel sa novší koncept, naposledy upravený dňa ${date}.",
             YEAR: "Našiel sa novší koncept, naposledy upravený dňa ${date_long}."
           },
           PROMPT2: {
             TODAY: "Naozaj chcete pokračovať v preberaní verzie, ktorá bola zverejnená dnes o ${time}?",
             YESTERDAY: "Naozaj chcete pokračovať v preberaní verzie, ktorá bola zverejnená včera o ${time}?",
             DAY: "Naozaj chcete pokračovať v preberaní verzie, ktorá bola zverejnená dňa ${date}?",
             MONTH: "Naozaj chcete pokračovať v preberaní verzie, ktorá bola zverejnená dňa ${date}?",
             YEAR: "Naozaj chcete pokračovať v preberaní verzie, ktorá bola zverejnená dňa ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Zobraziť panel podrobností",
         HIDE: "Skryť panel podrobností",
         SHOW_A11Y: "Toto tlačidlo prepína otvorený a zatvorený stav bočného panela. Bočný panel je aktuálne zatvorený.",
         HIDE_A11Y: "Toto tlačidlo prepína otvorený a zatvorený stav bočného panela. Bočný panel je aktuálne otvorený."
       },
       VIEW_DOC: {
         NAME: "Otvoriť v Docs Viewer",
         TOOLTIP: "Otvoriť v Docs Viewer",
         A11Y: "Toto tlačidlo otvorí súbor na prezretie vnútri nového okna prehliadača."
       },
       EDIT_DOC: {
         NAME: "Upraviť v Docs",
         TOOLTIP: "Upraviť súbor v Docs",
         A11Y: "Toto tlačidlo otvorí súbor na úpravu v produkte Docs vnútri nového okna."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Upraviť v počítači",
         DIALOG_TITLE: "Upraviť v počítači",
         TOOLTIP: "Upraviť tento dokument",
         A11Y: "Toto tlačidlo otvorí súbor na lokálne upravovanie.",
         PROMPT: "Tento komponent vám umožňuje upravovať súbor lokálne.",
         IMPORTANT: "Dôležité:",
         REMINDER: "Po dokončení úprav musíte zverejniť koncept pomocou konektorov na súbory z počítača. Ak zlyhá otváranie súboru, môže byť potrebné nainštalovať doplnkové komponenty pre počítač.",
         SKIP_DIALOG: "Túto správu už nezobrazovať.",
         OK: "OK",
         CANCEL: "Zrušiť"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Potvrdiť",
         DELETE_VERSION: "Vymazať verziu ${version}",
         DELETE_VERSION_AND_PRIOR: "Vymazať verziu ${version} a všetky staršie verzie",
         PROMPT: "Chystáte sa vymazať verziu ${version}. Chcete pokračovať?",
         DELETE_PRIOR: "Vymazať aj všetky staršie verzie",
         ERROR: "Nastala chyba pri vymazávaní verzie. Skúste to znova neskôr.",
         TOOLTIP: "Vymazať túto verziu",
         OK: "OK",
         CANCEL: "Zrušiť"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Získať odkazy",
         LINK_FILE: "Odkaz na súbor:",
         LINK_PREVIEW: "Odkaz na náhľad súboru:",
         LINK_DOWNLOAD: "Odkaz na prevzatie súboru:",
         TOOLTIP: "Odkaz na súbor",
         OK: "Zatvoriť"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Prevziať túto verziu"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Potvrdiť",
         PROMPT: "Chystáte sa nahradiť aktuálnu verziu tohto súboru verziou ${version}. Chcete pokračovať?",
         ERROR: "Nastala chyba pri obnovovaní verzie. Skúste to znova neskôr.",
         TOOLTIP: "Obnoviť túto verziu",
         CHANGE_SUMMARY: "Obnovené z verzie ${version}",
         OK: "OK",
         CANCEL: "Zrušiť"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Potvrdiť",
         REMOVE_EVERYONE: "Naozaj chcete odstrániť prístup organizácie k tomuto súboru? Po odstránení prístupu sa súbor odstráni zo zložiek a komunít, ktoré povoľujú prístup na úrovni organizácie, a položku môže zobraziť a pracovať s ňou iba vlastník a ľudia, s ktorými bola zdieľaná.",
         REMOVE_USER: "Naozaj chcete zastaviť zdieľanie s ${user}? Ak zastavíte zdieľanie, používateľ ${user} bude môcť pristupovať k tomuto súbory iba cez zložky, alebo ak je zdieľaný s každým vo vašej organizácii.",
         REMOVE_COMMUNITY: "Naozaj chcete odstrániť tento súbor z komunity ${communityName}?",
         REMOVE_FOLDER: "Naozaj chcete odstrániť tento súbor zo zložky ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Odstráňte prístup svojej organizácie",
         REMOVE_USER_TOOLTIP: "Odstrániť všetky zdieľania s používateľom ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Odstrániť z komunity ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Odstrániť zo zložky ${folderName}",
         OK: "OK",
         CANCEL: "Zrušiť"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Upraviť tento komentár"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Potvrdiť",
         PROMPT: "Naozaj chcete vymazať tento komentár?",
         ERROR: "Nastala chyba pri vymazávaní komentára. Skúste to znova neskôr.",
         TOOLTIP: "Vymazať tento komentár",
         OK: "OK",
         CANCEL: "Zrušiť"
       },
       LIKE: {
         LIKE: "Označiť súbor ako Páči sa mi",
         UNLIKE: "Zrušiť označenie súboru Páči sa mi",
         LIKE_A11Y: "Toto tlačidlo označí súbor ako Páči sa mi.",
         UNLIKE_A11Y: "Toto tlačidlo odstráni označenie súboru Páči sa mi.",
         LIKED_SUCCESS: "Tento súbor ste označili Páči sa mi",
         UNLIKE_SUCCESS: "Zrušili ste označenie Páči sa mi tohto súboru"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Upraviť opis",
         ERROR: {
           DEFAULT: "Nebolo možné uložiť opis. Skúste to znova neskôr.",
           UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete aktualizovať opis, musíte sa znova prihlásiť.",
           NOT_FOUND: "Váš opis nebolo možné uložiť, pretože súbor bol vymazaný alebo už nie je s vami zdieľaný.",
           ACCESS_DENIED: "Váš opis nebolo možné uložiť, pretože súbor bol vymazaný alebo už nie je s vami zdieľaný."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Nastala chyba pri ukladaní názvu súboru",
           CONFLICT: "Názov súboru už existuje"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Nastala chyba pri sledovaní tohto súboru. Skúste to znova neskôr.",
             UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete sledovať tento súbor, znova sa musíte prihlásiť.",
             NOT_FOUND: "Tento súbor nemôžete sledovať, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
             ACCESS_DENIED: "Tento súbor nemôžete sledovať, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
           },
           UNFOLLOW: {
             DEFAULT: "Nastala chyba pri rušení sledovania tohto súboru. Skúste to znova neskôr.",
             UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete zastaviť sledovanie tohto súboru, znova sa musíte prihlásiť.",
             NOT_FOUND: "Nemôžete zastaviť sledovanie tohto súboru, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
             ACCESS_DENIED: "Nemôžete zastaviť sledovanie tohto súboru, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
           }
         },
         FOLLOW_NAME: "Sledovať",
         FOLLOW_TOOLTIP: "Sledovať tento súbor",
         FOLLOW_A11Y: "Týmto tlačidlom začnete sledovať súbor.",
         FOLLOW_SUCCESS: "Teraz sledujete tento súbor.",
         STOP_FOLLOWING_NAME: "Zastaviť sledovanie",
         STOP_FOLLOWING_TOOLTIP: "Zastaviť sledovanie tohto súboru",
         STOP_FOLLOWING_A11Y: "Toto tlačidlo zastaví sledovanie súboru.",
         STOP_FOLLOWING_SUCCESS: "Zastavili ste sledovanie tohto súboru."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Pridať do synchronizácie",
           TOOLTIP: "Pridať tento súbor do synchronizácie",
           A11Y: "Toto tlačidlo pridá súbor do synchronizácie.",
           SUCCESS: "Pridali ste tento súbor do synchronizácie.",
           ERROR: {
             DEFAULT: "Nastala chyba pri pridávaní tohto súboru do synchronizácie. Skúste to znova neskôr.",
             UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete pridať tento súbor do synchronizácie, znova sa musíte prihlásiť.",
             NOT_FOUND: "Tento súbor nemôžete pridať do synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
             ACCESS_DENIED: "Tento súbor nemôžete pridať do synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
           }
         },
         STOP_SYNC: {
           NAME: "Odstrániť zo synchronizácie",
           TOOLTIP: "Odstrániť tento súbor zo synchronizácie",
           A11Y: "Toto tlačidlo odstrániť súbor zo synchronizácie.",
           SUCCESS: "Odstránili ste tento súbor zo synchronizácie.",
           ERROR: {
             DEFAULT: "Nastala chyba pri odstraňovaní tohto súboru zo synchronizácie. Skúste to znova neskôr.",
             UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete odstrániť tento súbor zo synchronizácie, znova sa musíte prihlásiť.",
             NOT_FOUND: "Tento súbor nemôžete odstrániť zo synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
             ACCESS_DENIED: "Tento súbor nemôžete odstrániť zo synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Pripnúť",
          FAVORITE_TOOLTIP: "Pripnúť tento súbor",
          FAVORITE_A11Y: "Toto tlačidlo pripne súbor.",
          FAVORITE_SUCCESS: "Pripli ste tento súbor.",
          STOP_FAVORITEING_NAME: "Zrušiť pripnutie",
          STOP_FAVORITEING_TOOLTIP: "Zrušiť pripnutie tohto súboru",
          STOP_FAVORITEING_A11Y: "Toto tlačidlo zruší pripnutie súboru.",
          STOP_FAVORITEING_SUCCESS: "Zrušili ste pripnutie tohto súboru."
       },
       TRASH: {
         NAME: "Presunúť do koša",
         DIALOG_TITLE: "Potvrdiť",
         PROMPT: "Naozaj chcete presunúť tento súbor do koša? Presunutie tohto súboru do koša ho spraví nedostupným pre každého, s kým je aktuálne zdieľaný.",
         ERROR: "Nastala chyba pri vymazávaní súboru. Skúste to znova neskôr.",
         TOOLTIP: "Vymazať tento súbor",
         OK: "OK",
         CANCEL: "Zrušiť",
         A11Y: "Toto tlačidlo presunie súbor do koša.",
         SUCCESS_MSG: "Súbor ${file} bol presunutý do koša."
       },
       REFRESH: {
         NAME: "Obnoviť",
         ERROR: "Nastala chyba počas obnovovania File Viewer. Skúste to znova neskôr.",
         TOOLTIP: "Obnoviť File Viewer",
         INFO_MSG: "Vykonajte obnovenie, aby ste získali najnovší obsah. ${link}",
         A11Y: "Toto tlačidlo presunie súbor do koša.",
         SUCCESS_MSG: "Obsah bol úspešne obnovený."
       },
       COPY_FILE: {
         NAME: "Dať kópiu do komunity",
         DIALOG_TITLE: "Potvrdiť",
         ERROR: "Nastala chyba pri kopírovaní súboru. Skúste to znova neskôr.",
         TOOLTIP: "Dať kópiu tohto súboru do komunity",
         OK: "OK",
         CANCEL: "Zrušiť",
         A11Y: "Toto tlačidlo otvorí dialógové okno, ktoré vám umožňuje dať kópiu tohto súboru do komunity.",
         SUCCESS_MSG: "Súbor ${file} bol skopírovaný do komunity ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Odoslať novú verziu",
         NAME_SHORT: "Odoslať",
         CHANGE_SUMMARY: "Voliteľný súhrn zmeny...",
         TOOLTIP: "Odoslať novú verziu tohto súboru",
         A11Y: "Toto tlačidlo otvorí dialógové okno, ktoré vám umožňuje odoslať novú verziu tohto súboru."
       },
       LOG_IN: {
    	   NAME: "Prihlásiť",
    	   TOOLTIP: "Prihláste sa, aby ste mohli odosielať a zdieľať súbory, komentovať a vytvárať zložky"
       },
       LOCK: {
          NAME: "Zamknúť súbor",
          TITLE: "Zamknúť tento súbor",
          A11Y: "Zamknúť tento súbor",
          SUCCESS: "Súbor je teraz zamknutý."
       },
       UNLOCK: {
          NAME: "Odomknúť súbor",
          TITLE: "Odomknúť tento súbor",
          A11Y: "Odomknúť tento súbor",
          SUCCESS: "Súbor je teraz odomknutý."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Upraviť v počítači",
          TITLE: "Upraviť v počítači",
          A11Y: "Upraviť v počítači"
       },
       FLAG: {
         FILE: {
           NAME: "Označiť ako nevhodné",
           TITLE: "Označiť súbor",
           A11Y: "Označiť tento súbor ako nevhodný",
           PROMPT: "Zadajte dôvod označenia tohto súboru (voliteľné):",
           OK: "Označiť",
           CANCEL: "Zrušiť",
           SUCCESS: "Súbor bol označený a odoslaný na posúdenie.",
           ERROR: "Nastala chyba pri označovaní tohto súboru. Skúste to znova neskôr."
         },
         COMMENT: {
           NAME: "Označiť ako nevhodné",
           TITLE: "Označiť komentár",
           A11Y: "Označiť tento komentár ako nevhodný",
           PROMPT: "Zadajte dôvod označenia tohto komentára (voliteľné):",
           OK: "Označiť",
           CANCEL: "Zrušiť",
           SUCCESS: "Komentár bol označený a odoslaný na posúdenie.",
           ERROR: "Nastala chyba pri označovaní tohto komentára. Skúste to znova neskôr."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Informácie o tomto súbore",
       VIEW_FILE_DETAILS: "Zobraziť podrobnosti o súbore",
       A11Y: "Aktivácia tohto odkazu zatvorí prezerač súborov a nasmeruje vás na stránku s podrobnosťami o súbore pre tento súbor."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Pre tento súbor nie je k dispozícii žiadny náhľad."
      },
      IMAGE: {
       ZOOM_IN: "Priblížiť",
       ZOOM_OUT: "Oddialiť",
       RESET: "Vynulovať",
       ZOOM_IN_A11Y: "Toto tlačidlo priblíži obrázok.",
       ZOOM_OUT_A11Y: "Toto tlačidlo oddiali obrázok.",
       RESET_ZOOM_A11Y: "Toto tlačidlo vynuluje úroveň priblíženia."
      },
      VIEWER: {
       LOADING: "Načítava sa...",
       NO_PUBLISHED_VERSION: "Neexistuje žiadna zverejnená verzia tohto súboru na zobrazenie.",
       IFRAME_TITLE: "Náhľad tohto súboru"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Posledná aktualizácia od používateľa ${user} dnes o ${time}",
       YESTERDAY: "Posledná aktualizácia od používateľa ${user} včera o ${time}",
       DAY: "Posledná aktualizácia od používateľa ${user} ${EEee} o ${time}",
       MONTH: "Posledná aktualizácia od používateľa ${user} ${date_long}",
       YEAR: "Posledná aktualizácia od používateľa ${user} ${date_long}"
      },
      CREATED: {
       TODAY: "Vytvoril používateľ ${user} dnes o ${time}",
       YESTERDAY: "Vytvoril používateľ ${user} včera o ${time}",
       DAY: "Vytvoril používateľ ${user} dňa ${EEee} o ${time}",
       MONTH: "Vytvoril užívateľ ${user} dňa ${date_long}",
       YEAR: "Vytvoril užívateľ ${user} dňa ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - dnes",
       YESTERDAY: "${time} - včera",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Dnes",
       YESTERDAY: "Včera",
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
       TITLE: "Textová oblasť pre komentár",
       SHADOW_TEXT: "Pridať komentár...",
       CANNOT_ACCESS_CONTENT: "Nasledujúce osoby, o ktorých ste sa zmienili, neuvidia komentár, pretože nemajú prístup k obsahu:",
       ERROR: "Nastala chyba počas validovania používateľa, ktorého chcete spomenúť.",
       POST: "Zverejniť",
       SAVE: "Uložiť",
       CANCEL: "Zrušiť",
       EXTERNAL_WARNING: "Komentáre uvidia aj ľudia, ktorí sú externí pre vašu organizáciu."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Zrušiť",
         A11Y: "Toto tlačidlo zruší akciu úpravy názvu súboru."
       },
       INVALID_CHARACTERS: "Neplatný znak",
       INVALID_CHARACTERS_REMOVED: "Neplatné znaky boli odstránené"
     },
     COMMENT_WIDGET: {
       EDITED: "(Upravené)",
       EDITED_DATE: {
         TODAY: "Upravené dnes o ${time}",
         YESTERDAY: "Upravené včera o ${time}",
         DAY: "Upravené ${EEee} o ${time}",
         MONTH: "Upravené ${date_long}",
         YEAR: "Upravené ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Uložiť",
       CANCEL: "Zrušiť",
       USER: "Používateľ",
       COMMUNITY: "Komunita",
       SHARE: "Zdieľať",
       SHARE_ALT: "Zdieľať s týmto používateľom",
       MEMBER_TYPE: "Typ člena",
       PERSON_SHADOW: "Začnite písať hľadanú osobu",
       COMMUNITY_SHADOW: "Začnite písať hľadanú komunitu",
       PERSON_FULL_SEARCH: "Osoba sa nezobrazila? Použite úplné vyhľadávanie...",
       COMMUNITY_FULL_SEARCH: "Komunita sa nezobrazila? Použite úplné vyhľadávanie...",
       ADD_OPTIONAL_MESSAGE: "Pridať voliteľnú správu",
       ROLE_LABEL: "Rola",
       ROLE_EDIT: "Editor",
       ROLE_VIEW: "Čitateľ"
     },
     FILE_STATE: {
       DOCS_FILE: "Toto je súbor Docs. Všetky úpravy sa musia robiť online.",
       LOCKED_BY_YOU: {
         TODAY: "Zamknuté vami o ${time}.",
         YESTERDAY: "Zamknuté vami včera o ${time}.",
         DAY: "Zamknuté vami dňa ${date}.",
         MONTH: "Zamknuté vami dňa ${date}.",
         YEAR: "Zamknuté vami dňa ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Zamknuté o ${time} používateľom ${user}.",
         YESTERDAY: "Zamknuté včera o ${time} používateľom ${user}.",
         DAY: "Zamknuté dňa ${date} používateľom ${user}.",
         MONTH: "Zamknuté dňa ${date} používateľom ${user}.",
         YEAR: "Zamknuté dňa ${date_long} používateľom ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Komentár je pridlhý.",
         TRIM: "Má sa skrátiť komentár?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Opis je pridlhý.",
         TRIM: "Má sa skrátiť opis?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Správa je pridlhá.",
         TRIM: "Má sa skrátiť správa?"
       },
       TAG: {
         WARN_TOO_LONG: "Značka je pridlhá.",
         TRIM: "Má sa skrátiť značka?"
       },
       TAGS: {
         WARN_TOO_LONG: "Jedna alebo viaceré značky sú pridlhé.",
         TRIM: "Majú sa skrátiť značky?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Názov súboru je pridlhý"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Tento súbor je k dispozícii pre online úpravy iba v prípade, ak ste si kúpili oprávnenie na produkt Docs.",
       CURRENT_EDITORS: "Tento súbor je aktuálne upravovaný na webe používateľom ${users}.",
       UNPUBLISHED_CHANGES: "V tomto koncepte existujú úpravy, ktoré ešte neboli zverejnené ako verzia.",
       PUBLISH_A_VERSION: "Zverejniť verziu",
       PUBLISH_SUCCESS: "Úspešne ste zverejnili verziu tohto súboru.",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Nebolo možné zverejniť verziu, pretože bol zakázaný prístup.",
         NOT_FOUND: "Nebolo možné zverejniť verziu, pretože sa nenašiel dokument.",
         CANNOT_REACH_REPOSITORY: "Nebolo možné zverejniť verziu, pretože server Docs sa nemôže pripojiť k archívu súborov.",
         QUOTA_VIOLATION: "Nebolo možné zverejniť verziu z dôvodu obmedzení priestoru. Ak chcete zverejniť túto verziu, odstráňte iné súbory, aby ste uvoľnili dostatok priestoru.",
         CONVERSION_UNAVAILABLE: "Nebolo možné zverejniť verziu, pretože nie je k dispozícii služba konverzie Docs. Skúste to znova neskôr.",
         TOO_LARGE: "Nebolo možné zverejniť verziu, pretože dokument je priveľký.",
         CONVERSION_TIMEOUT: "Nebolo možné zverejniť verziu, pretože službe konverzie Docs trvá konvertovanie dokumentu pridlho. Skúste to znova neskôr.",
         SERVER_BUSY: "Nebolo možné zverejniť verziu, pretože server Docs je zaneprázdnený. Skúste to znova neskôr.",
         DEFAULT: "Nebolo možné zverejniť verziu, pretože nie je k dispozícii služba Docs. Skúste to znova neskôr."
       }
     },
     COMMENTS: {
       EMPTY: "Neexistujú žiadne komentáre.",
       MODERATED: "Komentár bol odoslaný na posúdenie a bude k dispozícii po schválení.",
       ERROR: {
         SAVE: {
           DEFAULT: "Nebolo možné uložiť váš komentár. Skúste to znova neskôr.",
           UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete uložiť svoj komentár, musíte sa prihlásiť.",
           NOT_FOUND: "Váš komentár nebolo možné uložiť, pretože súbor bol vymazaný alebo už nie je s vami zdieľaný.",
           ACCESS_DENIED: "Váš komentár nebolo možné uložiť, pretože súbor bol vymazaný alebo už nie je s vami zdieľaný."
         },
         DELETE: {
           DEFAULT: "Nebolo možné vymazať váš komentár. Skúste to znova neskôr.",
           UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete vymazať svoj komentár, musíte sa prihlásiť.",
           NOT_FOUND: "Nebolo možné vymazať váš komentár, pretože bol vymazaný alebo už s vami nie je zdieľaný.",
           ACCESS_DENIED: "Nebolo možné vymazať váš komentár, pretože bol vymazaný alebo už s vami nie je zdieľaný."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Uložiť",
       EDIT_TAGS: "Upraviť značky",
       ERROR: {
         SAVE: {
           DEFAULT: "Nebolo možné vytvoriť značku. Skúste to znova neskôr."
         },
         DELETE: {
           DEFAULT: "Nebolo možné vymazať značku. Skúste to znova neskôr."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Viac informácií...",
       READ_LESS: "Menej informácií..."
     },
     SHARE: {
	     EVERYONE: "Každý v mojej organizácii",
	     ADD_TOOLTIP: "Uložiť",
	     ROLES: {
	       OWNER: "Vlastník",
	       EDIT: "Editori",
	       VIEW: "Čitatelia",
	       FOLDER: "Zdieľané so zložkami"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Vlastník"
	       },
	       EDIT: {
	         ROLE: "Upraviť",
           ADD: "Pridať editora"
	       },
	       VIEW: {
	         ROLE: "Čitateľ",
           ADD: "Pridať čitateľa"
	       },
	       FOLDER: {
           ADD: "Pridať zložky",
           COMMUNITY_ADD: "Pridať do zložky",
           MOVE: "Presunúť do zložky"
	       },
	       MULTI: {
	         ADD: "Pridať ľudí alebo komunity",
	         ADD_PEOPLE: "Pridať ľudí"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Každý v mojej organizácii",
	        LONG: {
	           GENERIC: "Každý vo vašej organizácii",
	           ORG: "Každý v ${org}"
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Tento súbor už je zdieľaný s používateľom ${user}.",
	       ERROR: "V tejto chvíli nemožno zdieľať s používateľom ${user}.",
	       SELF: "Nemôžete zdieľať so sebou."
	     },
	     SHARE_INFO: {
	       PROMOTED: "Rola používateľa ${user} bola zvýšená na vyššiu rolu zdieľania."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Úspešne zdieľané s používateľom ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Voliteľná správa..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Poskytnúť službu externému používateľovi",
            ACTION: "Poskytnúť službu externému používateľovi...",
            TOOLTIP: "Poskytnúť službu externému používateľovi",
            DIALOG_TITLE: "Obsah nebol zdieľaný",
            PROMPT: {
              NO_ACCOUNT: "Nasledujúci používateľ nemá konto a nie je s ním zdieľaný žiadny obsah.",
              INVITE: "Pozvite tohto používateľa ako hosťa, ak s ním chcete zdieľať obsah."
            },
            SUBMIT: "Pokračovať v pozývaní",
            CANCEL: "Zrušiť",
            ERROR: "Nastala chyba počas poskytovania konta. Skúste to znova neskôr.",
            SUCCESS: "Používateľské konto bolo úspešne poskytnuté."
	       },
	       PLURAL: {
	         NAME: "Poskytnúť službu externým používateľom",
	         ACTION: "Poskytnúť službu externým používateľom...",
	         TOOLTIP: "Poskytnúť službu externým používateľom",
	         DIALOG_TITLE: "Obsah nebol zdieľaný",
	         PROMPT: {
	           NO_ACCOUNT: "Nasledujúci používatelia nemajú účet a nie je s nimi zdieľaný žiadny obsah.",
	           INVITE: "Pozvite týchto používateľov ako hostí, ak s nimi chcete zdieľať obsah."
	         },
	         SUBMIT: "Pokračovať s pozvaniami",
	         CANCEL: "Zrušiť",
	         ERROR: "Nastala chyba počas poskytovania kont. Skúste to znova neskôr.",
	         SUCCESS: "Používateľské kontá boli úspešne poskytnuté."
	       },
	       ABSTRACT: {
	         NAME: "Poskytnúť službu externým používateľom",
            ACTION: "Poskytnúť službu externým používateľom...",
            TOOLTIP: "Poskytnúť službu externým používateľom",
            DIALOG_TITLE: "Obsah nebol zdieľaný",
            PROMPT: {
              NO_ACCOUNT: "Niektorí používatelia nemajú kontá a nie je s nimi zdieľaný žiadny obsah.",
              INVITE: "Pozvite týchto používateľov ako hostí, ak s nimi chcete zdieľať obsah."
            },
            SUBMIT: "Pokračovať s pozvaniami",
            CANCEL: "Zrušiť",
            ERROR: "Nastala chyba počas poskytovania kont. Skúste to znova neskôr.",
            SUCCESS: "Používateľské kontá boli úspešne poskytnuté."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Možnosti zdieľania",
         PROPAGATION: "Povoliť ostatným zdieľať tento súbor",
         EVERYONE: "Každý môže zdieľať tento súbor.",
         OWNER_ONLY: "Iba vlastník môže zdieľať tento súbor.",
         STOP_SHARE: "Zastaviť zdieľanie",
         MAKE_INTERNAL: "Zastaviť externé zdieľanie",
         MAKE_INTERNAL_SUCCESS: "Tento súbor sa už nemôže zdieľať s ľuďmi mimo vašej organizácie.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Spraviť interným?",
           PROMPT: "Ak spravíte tento súbor interným, nebude sa zdieľať s ľuďmi mimo vašej organizácie. ${br}${br}" +
             "Odstránia sa všetky zdieľania s externými ľuďmi, komunitami alebo zložkami.${br}${br}Zmena súboru na interný je trvalá a nedá sa vrátiť späť."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Zastaviť zdieľanie súboru",
           PROMPT: "Naozaj chcete zastaviť zdieľanie tohto súboru?",
           QUESTION_PUBLIC: "Tento súbor už nebude viditeľný pre každého vo vašej organizácii ani zdieľaný s ľuďmi, zložkami alebo komunitami. Táto operácia sa nedá vrátiť späť.",
           QUESTION_PUBLIC_E: "Tento súbor už nebude viditeľný pre každého vo vašej organizácii ani zdieľaný s ľuďmi alebo zložkami. Táto operácia sa nedá vrátiť späť.",
           QUESTION: "Súbor sa už nebude zdieľať s ľuďmi alebo komunitami a odstráni sa zo všetkých zložiek s výnimkou vašich súkromných zložiek. Táto akcia sa nedá vrátiť späť.",
           QUESTION_E: "Tento súbor sa už nebude zdieľať s ľuďmi a odstráni sa zo všetkých zložiek s výnimkou vašich súkromných zložiek. Táto akcia sa nedá vrátiť späť."
         },
         MAKE_PRIVATE_SUCCESS: "Tento súbor je teraz súkromný.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Nemožno zastaviť zdieľanie súboru. Skúste to znova neskôr."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Moje zdieľania"
	   },
	   STREAM: {
	     LOADING: "Načítava sa...",
	     LOAD_MORE: "Načítať viac..."
	   },
	   ENTRY: {
	     REMOVE: "Odstrániť",
	     RESTORE: "Obnoviť",
	     EDIT: "Upraviť",
	     DELETE: "Delete",
	     OK: "OK",
	     CANCEL: "Zrušiť",
	     USER_PICTURE: "Obrázok ${0}",
	     FLAG: "Označiť ako nevhodné"
	   },
	   PANEL: {
	     LOAD_ERROR: "Nastala chyba pri pristupovaní k metaúdajom tohto súboru.",
	     ABOUT: {
	       TITLE: "Informácie",
	       EXPAND_BUTTON: "Ak chcete zobraziť viac informácií, rozviňte toto tlačidlo.",
	       CURRENT_VERSION_HEADER: "Aktuálna verzia ${versionNumber}",
	       FILE_SIZE_HEADER: "Veľkosť súboru",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - aktuálna verzia",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - všetky verzie",
	       DOCS_DRAFT_UPDATED_HEADER: "Koncept bol upravený",
	       DOCS_DRAFT_CREATED_HEADER: "Koncept bol vytvorený",
	       DOCS_UPDATED_HEADER: "Zverejnené",
	       DOCS_CREATED_HEADER: "Vytvorený",
	       UPDATED_HEADER: "Aktualizované",
	       CREATED_HEADER: "Vytvorený",
	       LIKES_HEADER: "Páči sa",
	       LIKES_EXPAND_ICON: "Ak chcete vidieť, komu sa páči tento súbor, rozviňte túto ikonu",
	       DOWNLOADS_HEADER: "Prevzatia",
	       DOWNLOADS_HEADER_MORE: "Prevzatia (${0})",
	       DOWNLOADS_EXPAND_ICON: "Ak chcete vidieť, kto prevzal tento súbor, rozviňte túto ikonu",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymne",
	       DOWNLOADS_LATEST_VERSION: "Máte najnovšiu verziu tohto súboru",
	       DOWNLOADS_LAST_VERSION: "Naposledy ste prevzali verziu ${0} tohto súboru",
	       TAGS_HEADER: "Značky",
	       DESCRIPTION_HEADER: "Opis",
	       DESCRIPTION_READ_MORE: "Viac informácií...",
	       LINKS_HEADER: "Odkazy",
	       SECURITY: "Bezpečnosť",
	       FILE_ENCRYPTED: "Obsah súboru je zašifrovaný. Obsah zašifrovaného súboru sa neprehľadáva. Obsah súboru nemožno zobraziť ani upravovať pomocou HCL Docs.",
	       GET_LINKS: "Získať odkazy...",
	       ADD_DESCRIPTION: "Pridať opis",
	       NO_DESCRIPTION: "Žiadny opis",
	       ADD_TAGS: "Pridať značky",
	       NO_TAGS: "Žiadne značky"
	     },
	     COMMENTS: {
	       TITLE: "Komentáre",
	       TITLE_WITH_COUNT: "Komentáre (${0})",
	       VERSION: "Verzia ${0}",
	       FEED_LINK: "Informačný kanál pre tieto komentáre",
	       FEED_TITLE: "Sledujte zmeny v týchto komentároch cez čítačku informačných kanálov"
	     },
	     SHARING: {
	       TITLE: "Zdieľanie",
	       TITLE_WITH_COUNT: "Zdieľané (${0})",
	       SHARED_WITH_FOLDERS: "Zdieľané so zložkami - ${count}",
	       SEE_WHO_HAS_SHARED: "Zobraziť, kto zdieľa",
           COMMUNITY_FILE: "Súbory vlastnené komunitou nemožno zdieľať s ľuďmi ani inými komunitami.",
           SHARED_WITH_COMMUNITY: "Zdieľané s členmi komunity '${0}'",
           LOGIN: "Prihlásiť",
           NO_SHARE: "Tento súbor ešte nebol pridaný do žiadnych zložiek.",
           ONE_SHARE: "Tento súbor je v jednej zložke alebo komunite, do ktorej nemáte prístup.",
           MULTIPLE_SHARE: "Tento súbor je v ${fileNumber} zložkách alebo komunitách, do ktorých nemáte prístup."
	     },
	     VERSIONS: {
	       TITLE: "Verzie",
	       TITLE_WITH_COUNT: "Verzie (${0})",
	       FEED_LINK: "Informačný kanál pre tieto verzie",
	       FEED_TITLE: "Sledovať zmeny v tomto súbore cez čítačku informačných kanálov"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Potvrdenie akcie",
       DIALOG_TITLE: "Potvrdiť",
       PROMPT: "Naozaj chcete vykonať túto akciu?",
       ERROR: "Nastala chyba pri vykonávaní akcie. Skúste to znova neskôr.",
       TOOLTIP: "Vykonať akciu",
       OK: "OK",
       CANCEL: "Zrušiť",
       A11Y: "Toto tlačidlo vykoná aktuálnu akciu."
     },
     THUMBNAIL: {
       TITLE: "Miniatúra",
       CHANGE_LINK: "Zmeniť miniatúru...",
       ERROR: "Nebolo možné uložiť miniatúru. Skúste to znova neskôr.",
       EXT_ERROR: "Vyberte súbor s jednou z týchto podporovaných prípon: ${0}",
       SUCCESS: "Miniatúra bola zmenená",
       UPLOAD: "Uložiť",
       CANCEL: "Zrušiť"
     },
     UPLOAD_VERSION: {
       LINK: "Odoslať novú verziu...",
       CHANGE_SUMMARY: "Voliteľný súhrn zmeny...",
       ERROR: "Nebolo možné uložiť novú verziu. Skúste to znova neskôr.",
       SUCCESS: "Nová verzia bola uložená",
       UPLOAD: "Odoslať",
       UPLOAD_AND_CHANGE_EXTENSION: "Odoslať a zmeniť príponu",
       CANCEL: "Zrušiť"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Nastala chyba pri prístupe k súboru. Skúste to znova neskôr.",
       UNAUTHENTICATED: "Uplynul časový limit vašej relácie. Ak chcete zobraziť súbor, musíte sa znova prihlásiť.",
       NOT_FOUND: "Súbor, o ktorý ste požiadali, bol vymazaný alebo presunutý. Ak vám niekto poslal tento odkaz, skontrolujte, či je správny.",
       ACCESS_DENIED: "Nemáte oprávnenie zobraziť tento súbor. Súbor nie je zdieľaný s vami.",
       ACCESS_DENIED_ANON: "Nemáte oprávnenie zobraziť tento súbor. Ak je tento súbor váš alebo je s vami zdieľaný, najprv sa musíte prihlásiť."
     },
     LOAD_ERROR: {
       DEFAULT: "Ľutujeme, ale nastala chyba pri pristupovaní k odkazu.",
       ACCESS_DENIED: "Kontaktujte vlastníka súboru a požiadajte o oprávnenie na zobrazenie tohto súboru."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - súbor",
       LOAD_ERROR: "Nastala chyba pri pristupovaní k súboru"
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
