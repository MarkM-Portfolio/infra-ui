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
      FILE_VIEWER_TITLE: "Náhľad súboru",
      FILENAME_TOOLTIP: "Upraviť názov súboru",
      ICON_TOOLTIP: "Prevziať súbor",
      ERROR: "Nastala chyba.",
      FILE_MALICIOUS: "Skenovanie odhalilo škodlivý obsah",
      SHARED_EXTERNALLY: "Zdieľané externe",
      FILE_SYNCED: "Pridané do synchronizácie",
      MY_DRIVE: {
         TITLE: "V Mojej jednotke",
         ROOT_FOLDER: "/Moja jednotka",
         FOLDER: "/Moja jednotka/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Viac akcií",
         A11Y: "Otvorí rozbaľovaciu ponuku so zoznamom ďalších akcií na vykonanie na súbore.",
            PANELS: {
               TITLE: "Viac",
               A11Y: "Otvorí rozbaľovaciu ponuku so zoznamom skrytých panelov"
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
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Viac volieb úpravy",
            A11Y: "Toto tlačidlo otvorí ponuku pre viac volieb úpravy."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Upraviť"
            },
            UPLOAD: {
               TITLE: "Odoslať"
            },
            CREATE: {
              TITLE: "Vytvoriť"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Zmeniť veľkosť panelu",
           USAGE: "Ak chcete zmeniť veľkosť panelu, stlačte kláves ľavej alebo pravej hranatej zátvorky."
       },
         CLOSE: {
            TOOLTIP: "Zatvoriť",
            A11Y: "Toto tlačidlo zatvorí prezerač súborov.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Váš súbor sa stále odosiela.",
              PROMPT: "Súbor sa stále nahráva. Ak zavriete toto okno pred dokončením nahrávania, bude nahrávanie zrušené.",
              OK: "Napriek tomu zatvoriť",
              CANCEL: "Počkať na odoslanie"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Pridať do súborov",
           A11Y: "Toto tlačidlo pridá prílohu do aplikácie Súbory.",
           VIEW_NOW: "Zobraziť teraz"
         },
         TEAR_OFF: {
           TOOLTIP: "Otvoriť  v novom okne",
           A11Y: "Otvoriť  v novom okne",
           ERROR_TEARING_OFF: "Nastala chyba pri otváraní v novom okne.",
           DIALOG_TITLE: "Potvrdiť",
           UNSAVED_CHANGES_WARNING: "Máte neuložené zmeny, ktoré budú stratené. Chcete napriek tomu otvoriť nové okno?",
           OK: "Áno",
           CANCEL: "Nie",
           OPEN: "Otvoriť",
           OPEN_ANYWAY: "Napriek tomu otvoriť",
           CANCEL_ALT: "Zrušiť"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Nový zo súboru",
            ACTION_NAME:"Vytvoriť súbor",
            A11Y: {
               TEXT: "Vytvorí dokument (súbor DOC, DOCX alebo ODT) zo súboru šablóny. Tieto dokumenty môžete upraviť on-line v aplikácii Docs.",
               PRES: "Vytvorí prezentáciu (súbor PPT, PPTX alebo ODP) zo súboru šablóny. Tieto prezentácie môžete upraviť on-line v aplikácii Docs.",
               SHEET: "Vytvorí tabuľku (súbor XLS, XLSX alebo ODS) zo súboru šablóny. Tieto tabuľky môžete upraviť on-line v aplikácii Docs."
            },
            PROMPT: {
               TEXT: "Vytvorí dokument (súbor DOC, DOCX alebo ODT) zo súboru šablóny. Tieto dokumenty môžete upraviť on-line v aplikácii Docs.",
               PRES: "Vytvorí prezentáciu (súbor PPT, PPTX alebo ODP) zo súboru šablóny. Tieto prezentácie môžete upraviť on-line v aplikácii Docs.",
               SHEET: "Vytvorí tabuľku (súbor XLS, XLSX alebo ODS) zo súboru šablóny. Tieto tabuľky môžete upraviť on-line v aplikácii Docs."
            },
            NAME_FIELD: "Názov:",
            EXTERNAL_FIELD: "Súbory možno zdieľať s ľuďmi, ktorí sú externí pre moju organizáciu",
            EXTERNAL_DESC: "Externý prístup umožňuje zdieľať súbory s externými užívateľmi (osoby mimo vašej organizácie alebo spoločnosti), zložky zdieľané s externými používateľmi a komunity s externými osobami ako členmi.  Pri odosielaní súboru musíte nastaviť externý prístup; neskôr sa nedá aktivovať.",
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
               SERVER_ERROR: "Server Connections nie je dostupný. Kontaktujte administrátora a skúste to znova."
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
               DEFAULT: "Prevzatie súboru vo formáte PDF sa nepodarilo. Skúste to znova neskôr.",
               UNAUTHENTICATED: "Platnosť relácie vypršala. Pred prevzatím súboru vo formáte PDF sa musíte znova prihlásiť.",
               NOT_FOUND: "Nebolo možné prevziať súbor ako PDF, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
               ACCESS_DENIED: "Nebolo možné prevziať súbor ako PDF, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Nie je k dispozícii zverejnená verzia tohto súboru na prevzatie. Verzie je možné zverejňovať z editora Docs."
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
            RESET: "Prestaviť veľkosť panelu",
            SHOW_A11Y: "Kliknutím na toto tlačidlo prepnete medzi otvoreným a zavretým bočným panelom. Bočný panel je aktuálne zavretý.",
            HIDE_A11Y: "Kliknutím na toto tlačidlo prepnete medzi otvoreným a zavretým bočným panelom. Bočný panel je aktuálne otvorený.",
            RESET_A11Y: "Kliknutím na toto tlačidlo obnovíte pôvodnú veľkosť bočného panela. Bočný panel je aktuálne roztiahnutý."
         },
         VIEW_DOC: {
            NAME: "Otvoriť v Docs Viewer",
            TOOLTIP: "Otvoriť v Docs Viewer",
            A11Y: "Toto tlačidlo otvorí súbor na prezretie vnútri nového okna prehliadača."
         },
         EDIT_DOC: {
            NAME: "Upraviť v Docs",
            TOOLTIP: "Na úpravu tohto súboru použiť HCL Docs ",
            A11Y: "Toto tlačidlo otvorí súbor na úpravu v produkte Docs vnútri nového okna."
         },
         EDIT_OFFICE: {
            TITLE: "Voľby úpravy.",
            NAME: "Upraviť v produkte Microsoft Office Online",
            TOOLTIP: "Použiť produkt Microsoft Office Online na úpravu tohto súboru",
            A11Y: "Toto tlačidlo otvorí súbor na úpravu v produkte Microsoft Office Online vnútri nového okna."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Upraviť v aplikácii Microsoft Word Online",
           TOOLTIP: "Použiť aplikáciu Microsoft Word Online na úpravu tohto súboru",
           A11Y: "Toto tlačidlo otvorí súbor na úpravu v aplikácii Microsoft Word Online vnútri nového okna."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Upraviť v aplikácii Microsoft Excel Online",
             TOOLTIP: "Použiť aplikáciu Microsoft Excel Online na úpravu tohto súboru",
             A11Y: "Toto tlačidlo otvorí súbor na úpravu v aplikácii Microsoft Excel Online vnútri nového okna."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Upraviť v aplikácii Microsoft PowerPoint Online",
             TOOLTIP: "Použiť aplikáciu Microsoft PowerPoint Online na úpravu tohto súboru",
             A11Y: "Toto tlačidlo otvorí súbor na úpravu v aplikácii Microsoft PowerPoint Online vnútri nového okna."
         },
         OFFICE_EDITED: {
             SUCCESS: "Súbor sa ukladá."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Upraviť v počítači",
            DIALOG_TITLE: "Upraviť v počítači",
            TOOLTIP: "Upraviť tento dokument",
            A11Y: "Toto tlačidlo otvorí súbor na lokálne upravovanie.",
            PROMPT: "Tento komponent vám umožňuje upravovať pomocou softvéru nainštalovaného vo vašom počítači.",
            INSTALL: "Pred pokračovaním ${startLink}nainštalujte konektory počítačových súborov${endLink}.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Dôležité:",
            REMINDER: "Po dokončení úprav zverejnite koncept pomocou konektorov pre súbory v počítači.",
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
            ERROR: "Pri vymazaní verzie sa vyskytla chyba. Skúste to znova neskôr.",
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
            ERROR: "Pri obnovovaní verzie sa vyskytla chyba. Skúste to znova neskôr.",
            TOOLTIP: "Obnoviť túto verziu",
            CHANGE_SUMMARY: "Obnovené z verzie ${version}",
            OK: "OK",
            CANCEL: "Zrušiť"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Potvrdiť",
            REMOVE_EVERYONE: "Naozaj chcete vymazať prístup organizácie k tomuto súboru? Ak sa prístup odstráni, súbor sa odstráni zo zložiek a komunít, ktoré povoľujú prístup na úrovni organizácie, a bude ho môcť zobraziť a pracovať s ním iba vlastník a používatelia, s ktorými bol zdieľaný.",
            REMOVE_USER: "Naozaj chcete zastaviť zdieľanie s používateľom ${user}? Ak zastavíte zdieľanie, bude mať ${user} prístup k tomuto súboru iba prostredníctvom zložiek alebo ak je zdieľaný so všetkými používateľmi vo vašej organizácii.",
            REMOVE_COMMUNITY: "Naozaj chcete odstrániť tento súbor z komunity ${communityName}?",
            REMOVE_FOLDER: "Naozaj chcete odstrániť tento súbor zo zložky ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Odstráňte prístup svojej organizácie",
            REMOVE_USER_TOOLTIP: "Vymazať všetky zdieľania s používateľom ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Vymazať z komunity ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Vymazať zo zložky ${folderName}",
            OK: "OK",
            CANCEL: "Zrušiť",
            EFSS: {
              DIALOG_TITLE: "Potvrdiť",
              REMOVE_EVERYONE: "Naozaj chcete odstrániť prístup organizácie k tomuto súboru? Ak sa prístup odstráni, súbor sa odstráni zo zložiek, ktoré povoľujú prístup na úrovni organizácie, a bude ho môcť zobraziť a pracovať s ním iba vlastník a používatelia, s ktorými bol zdieľaný.",
              REMOVE_USER: "Naozaj chcete zastaviť zdieľanie s používateľom ${user}? Ak zastavíte zdieľanie, bude mať ${user} prístup k tomuto súboru iba prostredníctvom zložiek alebo ak je zdieľaný so všetkými používateľmi vo vašej organizácii.",
              REMOVE_COMMUNITY: "Naozaj chcete odstrániť tento súbor z komunity ${communityName}?",
              REMOVE_FOLDER: "Naozaj chcete odstrániť tento súbor zo zložky ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Odstráňte prístup svojej organizácie",
              REMOVE_USER_TOOLTIP: "Vymazať všetky zdieľania s používateľom ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Vymazať z komunity ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Odstrániť zo zložky ${folderName}",
              OK: "OK",
              CANCEL: "Zrušiť",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Upraviť tento komentár"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Potvrdiť",
            PROMPT: "Naozaj chcete vymazať tento komentár?",
            ERROR: "Pri vymazaní komentára sa vyskytla chyba. Skúste to znova neskôr.",
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
               DEFAULT: "Opis sa nedá uložiť. Skúste to znova neskôr.",
               UNAUTHENTICATED: "Platnosť relácie vypršala. Pred aktualizáciou opisu sa musíte znova prihlásiť.",
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
                  DEFAULT: "Pri aktivovaní sledovania tohto súboru sa vyskytol problém. Skúste to znova neskôr.",
                  UNAUTHENTICATED: "Platnosť relácie vypršala. Pred aktivovaním sledovania tohto súboru sa musíte znova prihlásiť.",
                  NOT_FOUND: "Tento súbor nemôžete sledovať, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
                  ACCESS_DENIED: "Tento súbor nemôžete sledovať, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
               },
               UNFOLLOW: {
                  DEFAULT: "Pri rušení sledovania tohto súboru sa vyskytol problém. Skúste to znova neskôr.",
                  UNAUTHENTICATED: "Platnosť relácie vypršala. Pred ukončením sledovania tohto súboru sa musíte znova prihlásiť.",
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
                  DEFAULT: "Pri pridávaní tohto súboru na synchronizáciu sa vyskytol problém. Skúste to znova neskôr.",
                  UNAUTHENTICATED: "Platnosť relácie vypršala. Pred pridaním tohto súboru na synchronizáciu sa musíte znova prihlásiť.",
                  NOT_FOUND: "Tento súbor nemôžete pridať do synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
                  ACCESS_DENIED: "Tento súbor nemôžete pridať do synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
               }
            },
            STOP_SYNC: {
               NAME: "Odstrániť zo synchronizácie",
               TOOLTIP: "Odstrániť tento súbor zo synchronizácie",
               A11Y: "Toto tlačidlo odstráni súbor zo synchronizácie.",
               SUCCESS: "Odstránili ste tento súbor zo synchronizácie.",
               ERROR: {
                  DEFAULT: "Pri odstraňovaní tohto súboru zo synchronizácie sa vyskytol problém. Skúste to znova neskôr.",
                  UNAUTHENTICATED: "Platnosť relácie vypršala. Pred odstránením tohto súboru zo synchronizácie sa musíte znova prihlásiť.",
                  NOT_FOUND: "Tento súbor nemôžete odstrániť zo synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
                  ACCESS_DENIED: "Tento súbor nemôžete odstrániť zo synchronizácie, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
               }
            },
            MYDRIVE: {
                NAME: "Pridať do Mojej jednotky",
                TOOLTIP: "Pridať tento súbor do Mojej jednotky",
                A11Y: "Toto tlačidlo pridá súbor do Mojej jednotky.",
                SUCCESS: "Pridali ste tento súbor do Mojej jednotky.",
                ERROR: {
                   DEFAULT: "Počas pridávania tohto súboru do zložky Moja jednotka sa vyskytol problém. Skúste to znova neskôr.",
                   UNAUTHENTICATED: "Platnosť relácie vypršala. Pred pridaním tohto súboru do Mojej jednotky sa musíte znova prihlásiť.",
                   NOT_FOUND: "Tento súbor nemôžete pridať do Mojej jednotky, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
                   ACCESS_DENIED: "Tento súbor nemôžete pridať do Mojej jednotky, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Odstrániť z Mojej jednotky",
                TOOLTIP: "Odstrániť tento súbor z Mojej jednotky",
                A11Y: "Toto tlačidlo odstráni súbor z Mojej jednotky.",
                SUCCESS: "Odstránili ste tento súbor z Mojej jednotky.",
                ERROR: {
                   DEFAULT: "Pri odstraňovaní tohto súboru zo zložky Moja jednotka sa vyskytol problém. Skúste to znova neskôr.",
                   UNAUTHENTICATED: "Platnosť relácie vypršala. Pred odstránením tohto súboru z Mojej jednotky sa musíte znova prihlásiť.",
                   NOT_FOUND: "Tento súbor nemôžete odstrániť z Mojej jednotky, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný.",
                   ACCESS_DENIED: "Tento súbor nemôžete odstrániť z Mojej jednotky, pretože súbor bol vymazaný alebo už s vami nie je zdieľaný."
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
            PROMPT: "Naozaj chcete presunúť tento súbor do koša? Presunutím do koša sa tento súbor stane nedostupným pre každého, s kým je aktuálne zdieľaný.",
            ERROR: "Pri vymazaní súboru sa vyskytla chyba. Skúste to znova neskôr.",
            TOOLTIP: "Vymazať tento súbor",
            OK: "OK",
            CANCEL: "Zrušiť",
            A11Y: "Toto tlačidlo presunie súbor do koša.",
            SUCCESS_MSG: "Súbor ${file} bol presunutý do koša."
         },
         REFRESH: {
            NAME: "Obnoviť",
            ERROR: "Pri obnovovaní prehliadača súborov sa vyskytla chyba. Skúste to znova neskôr.",
            TOOLTIP: "Obnoviť File Viewer",
            INFO_MSG: "Ak chcete získať najnovší obsah, obnovte stránku. ${link}",
            A11Y: "Toto tlačidlo presunie súbor do koša.",
            SUCCESS_MSG: "Obsah bol úspešne obnovený."
         },
         COPY_FILE: {
            NAME: "Dať kópiu do komunity...",
            DIALOG_TITLE: "Potvrdiť",
            ERROR: "Pri kopírovaní súboru sa vyskytla chyba. Skúste to znova neskôr.",
            TOOLTIP: "Dať kópiu tohto súboru do komunity",
            OK: "OK",
            CANCEL: "Zrušiť",
            A11Y: "Toto tlačidlo otvorí dialógové okno, ktoré vám umožňuje dať kópiu tohto súboru do komunity.",
            SUCCESS_MSG: "Súbor ${file} bol skopírovaný do komunity ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Previesť vlastníctvo...",
            DIALOG_TITLE: "Previesť vlastníctvo",
            TOOLTIP: "Preniesť tento súbor novému vlastníkovi",
            A11Y: "Kliknutím na toto tlačidlo otvoríte dialógové okno, v ktorom je možné preniesť tento súbor k novému vlastníkovi.",
            EMPTY: "Prázdny"
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
            SUCCESS: "Súbor je teraz zamknutý.",
            ERROR: "Nebolo možné zamknúť súbor, pretože bol vymazaný alebo už s vami nie je zdieľaný."
         },
         UNLOCK: {
            NAME: "Odomknúť súbor",
            TITLE: "Odomknúť tento súbor",
            A11Y: "Odomknúť tento súbor",
            SUCCESS: "Súbor je teraz odomknutý.",
            ERROR: "Nebolo možné odomknúť súbor, pretože bol vymazaný alebo už s vami nie je zdieľaný."
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
            FILE_DIALOG: {
               DIALOG_TITLE: "Úspech",
               PROMPT: "Súbor bol označený a odoslaný na posúdenie.",
               CANCEL: "OK"
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
         },
         MODERATION: {
            DIALOG_TITLE: "Úspech",
            PROMPT: "Zmeny boli odoslané na kontrolu. Tento súbor nebude dostupný až do okamihu schválenia zmien.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Rozbaľovacie tlačidlo"
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
            RESET: "Obnoviť",
            ZOOM_IN_A11Y: "Toto tlačidlo priblíži obrázok.",
            ZOOM_OUT_A11Y: "Toto tlačidlo oddiali obrázok.",
            RESET_ZOOM_A11Y: "Toto tlačidlo vynuluje úroveň priblíženia.",
            UNSAFE_PREVIEW: "Nemožno zobraziť náhľad tohto súboru, pretože nebol skontrolovaný na prítomnosť vírusov."
         },
         VIEWER: {
            LOADING: "Načítava sa...",
            PUBLISHING: "Zverejňuje sa...",
            NO_PUBLISHED_VERSION: "Neexistuje žiadna zverejnená verzia tohto súboru na zobrazenie.",
            IFRAME_TITLE: "Náhľad tohto súboru",
            AUTOPUBLISH_TIMEOUT: "Odpoveď servera trvá príliš dlho. Pravdepodobne neboli zverejnené posledné zmeny."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Nemožno zobraziť náhľad tohto súboru, pretože nebol skontrolovaný na prítomnosť vírusov."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Naposledy aktualizované používateľom ${user} dnes o ${time}",
            YESTERDAY: "Naposledy aktualizované používateľom ${user} včera o ${time}",
            DAY: "Naposledy aktualizované používateľom ${user} dňa ${EEee} o ${time}",
            MONTH: "Naposledy aktualizované používateľom ${user} dňa ${date_long}",
            YEAR: "Naposledy aktualizované používateľom ${user} dňa ${date_long}"
         },
         CREATED: {
            TODAY: "Vytvorené používateľom ${user} dnes o ${time}",
            YESTERDAY: "Vytvorené používateľom ${user} včera o ${time}",
            DAY: "Vytvorené používateľom ${user} dňa ${EEee} o ${time}",
            MONTH: "Vytvorené používateľom ${user} dňa ${date_long}",
            YEAR: "Vytvorené používateľom ${user} dňa ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long} ${time_long}",
            YEAR: "${date_long} ${time_long}"
         },
         SHORT: {
            TODAY: "${time} – dnes",
            YESTERDAY: "${time} – včera",
            DAY: "${time} – ${EEee}",
            MONTH: "${time} – ${date_long}",
            YEAR: "${time} – ${date_long}"
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
         B: "${0} B",
         KB: "${0} kB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Textová oblasť pre komentár",
         SHADOW_TEXT: "Pridať komentár...",
         CANNOT_ACCESS_CONTENT: "Nasledujúce osoby, o ktorých ste sa zmienili, neuvidia komentár, pretože nemajú prístup k obsahu:",
         ERROR: "Nastala chyba počas validovania používateľa, ktorého chcete spomenúť.",
         POST: "Zverejniť",
         SAVE: "Uložiť",
         CANCEL: "Zrušiť",
         EXTERNAL_WARNING: "Komentáre uvidia aj ľudia, ktorí sú externými spolupracovníkmi vašej organizácie."
      },
      EDIT_BOX: {
         SAVE: "Uložiť",
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
            DAY: "Upravené dňa ${EEee} o ${time}",
            MONTH: "Upravené ${date_long}",
            YEAR: "Upravené ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Uložiť",
         CANCEL: "Zrušiť",
         USER: "Osoba",
         COMMUNITY: "Komunita",
         SHARE: "Zdieľať",
         SHARE_ALT: "Zdieľať s touto osobou",
         MEMBER_TYPE: "Typ člena",
         PERSON_SHADOW: "Začnite písať hľadanú osobu",
         COMMUNITY_SHADOW: "Začnite písať hľadanú komunitu",
         PERSON_ARIA: "Zadajte osobu, ktorú chcete vyhľadať. Stlačením klávesov Shift + Tab môžete prepnúť medzi ľuďmi, komunitami a každým v organizácii.",
         COMMUNITY_ARIA: "Zadajte komunitu, ktorú chcete vyhľadať. Stlačením klávesov Shift + Tab môžete prepnúť medzi ľuďmi, komunitami a každým v organizácii.",
         PERSON_FULL_SEARCH: "Osoba sa nezobrazila? Použite úplné vyhľadávanie...",
         COMMUNITY_FULL_SEARCH: "Komunita sa nezobrazila? Použite úplné vyhľadávanie...",
         ADD_OPTIONAL_MESSAGE: "Pridať voliteľnú správu",
         ROLE_LABEL: "Rola",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Čitateľ"
      },
      FILE_STATE: {
         DOCS_FILE: "Toto je súbor aplikácie Docs. Všetky úpravy je treba vykonať on-line.",
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
         A11Y_TEXT: "Automaticky skrátiť tento text",
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
         NO_ENTITLEMENT: "Tento súbor môžu upravovať on-line používatelia, ktorí majú aplikáciu HCL Docs.",
         NO_ENTITLEMENT_LINK: "Tento súbor môžu upravovať on-line používatelia, ktorí majú aplikáciu ${startLink}HCL Docs${endLink}.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Tento súbor aktuálne upravujú na webe títo používatelia: ${users}.",
         UNPUBLISHED_CHANGES: "V tomto koncepte existujú úpravy, ktoré ešte neboli zverejnené ako verzia.",
         PUBLISH_A_VERSION: "Zverejniť verziu",
         PUBLISH_SUCCESS: "Úspešne ste zverejnili verziu tohto súboru.",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Nebolo možné zverejniť verziu, pretože bol zakázaný prístup.",
            NOT_FOUND: "Nebolo možné zverejniť verziu, pretože sa nenašiel dokument.",
            CANNOT_REACH_REPOSITORY: "Nebolo možné zverejniť verziu, pretože server Docs sa nemôže pripojiť k archívu súborov.",
            QUOTA_VIOLATION: "Verzia sa nedá zverejniť z dôvodu obmedzeného priestoru. Odstránením ďalších súborov uvoľnite dostatok miesta na zverejnenie tejto verzie.",
            CONVERSION_UNAVAILABLE: "Verzia sa nedá zverejniť, pretože nie je k dispozícii služba konverzie Docs. Skúste to znova neskôr.",
            TOO_LARGE: "Nebolo možné zverejniť verziu, pretože dokument je priveľký.",
            CONVERSION_TIMEOUT: "Verzia sa nedá zverejniť, pretože službe konverzie Docs trvá konvertovanie dokumentu príliš dlho. Skúste to znova neskôr.",
            SERVER_BUSY: "Verzia sa nedá zverejniť, pretože server Docs je zaneprázdnený. Skúste to znova neskôr.",
            DEFAULT: "Verzia sa nedá zverejniť, pretože nie je k dispozícii služba Docs. Skúste to znova neskôr."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Vaše úpravy sa zverejňujú. ${startLink}Obnovením stránky zobrazíte zmeny.${endLink}",
            GENERIC: "Ak chcete zobraziť najnovšie zmeny, budete musieť pravdepodobne obnoviť stránku. ${startLink}Obnoviť${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Neexistujú žiadne komentáre.",
         MODERATED: "Komentár bol odoslaný na posúdenie a bude k dispozícii po schválení.",
         ERROR: {
            SAVE: {
               DEFAULT: "Komentár sa nedá uložiť. Skúste to znova neskôr.",
               UNAUTHENTICATED: "Platnosť relácie vypršala. Pred uložením svojho komentára sa musíte znova prihlásiť.",
               NOT_FOUND: "Váš komentár nebolo možné uložiť, pretože súbor bol vymazaný alebo už nie je s vami zdieľaný.",
               ACCESS_DENIED: "Váš komentár nebolo možné uložiť, pretože súbor bol vymazaný alebo už nie je s vami zdieľaný."
            },
            DELETE: {
               DEFAULT: "Komentár sa nedá vymazať. Skúste to znova neskôr.",
               UNAUTHENTICATED: "Platnosť relácie vypršala. Pred odstránením svojho komentára sa musíte znova prihlásiť.",
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
               DEFAULT: "Značka sa nedá vytvoriť. Skúste to znova neskôr."
            },
            DELETE: {
               DEFAULT: "Stránka sa nedá vymazať. Skúste to znova neskôr."
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
         USERROLE: "${userRole} – ${sharedUserCount}",
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
               ORG: "Každý v organizácii ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Tento súbor je už zdieľaný s používateľom ${user}.",
            ERROR: "Momentálne nie je možné zdieľať s používateľom ${user}.",
            SELF: "Nemôžete zdieľať so sebou."
         },
         SHARE_INFO: {
            PROMOTED: "Úroveň používateľa ${user} bola zvýšená na vyššiu rolu zdieľania."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Úspešne zdieľané s používateľom ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Súbor sa úspešne zdieľa."
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
               ERROR: "Pri zriaďovaní konta sa vyskytla chyba. Skúste to znova neskôr.",
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
               ERROR: "Pri zriaďovaní kont sa vyskytla chyba. Skúste to znova neskôr.",
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
               ERROR: "Pri zriaďovaní kont sa vyskytla chyba. Skúste to znova neskôr.",
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
            "Odstránia sa prípadné zdieľania s externými ľuďmi, komunitami alebo zložkami.${br}${br}Zmena súboru na interný je trvalá a nedá sa vrátiť späť.",
            EFSS: {
               DIALOG_TITLE: "Spraviť interným?",
               PROMPT: "Ak spravíte tento súbor interným, nebude sa zdieľať s ľuďmi mimo vašej organizácie. ${br}${br}" +
               "Odstránia sa prípadné zdieľania s externými ľuďmi alebo zložkami.${br}${br}Zmena súboru na interný je trvalá a nedá sa vrátiť späť."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Zastaviť zdieľanie súboru",
            PROMPT: "Naozaj chcete zastaviť zdieľanie tohto súboru?",
            QUESTION_PUBLIC: "Tento súbor prestane byť viditeľný pre všetkých používateľov vo vašej organizácii a prestane byť zdieľaný s ľuďmi, zložkami alebo komunitami. Táto akcia sa nedá vrátiť.",
            QUESTION_PUBLIC_E: "Tento súbor prestane byť viditeľný pre všetkých používateľov vo vašej organizácii a prestane byť zdieľaný s ľuďmi alebo zložkami. Táto akcia sa nedá vrátiť.",
            QUESTION: "Súbor sa prestane zdieľať s ľuďmi alebo komunitami a odstráni sa zo všetkých zložiek s výnimkou vašich súkromných zložiek. Táto akcia sa nedá vrátiť.",
            QUESTION_E: "Tento súbor sa prestane zdieľať s ľuďmi a odstráni sa zo všetkých zložiek s výnimkou vašich súkromných zložiek. Táto akcia sa nedá vrátiť."
         },
         MAKE_PRIVATE_SUCCESS: "Tento súbor je teraz súkromný.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Zdieľanie súboru sa nedá zastaviť. Skúste to znova neskôr."
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
         DELETE: "Vymazať",
         OK: "OK",
         CANCEL: "Zrušiť",
         USER_PICTURE: "Obrázok používateľa ${0}",
         FLAG: "Označiť ako nevhodné"
      },
      PANEL: {
         LOAD_ERROR: "Nastala chyba pri pristupovaní k metaúdajom tohto súboru.",
         ABOUT: {
            TITLE: "Informácie",
            EXPAND_BUTTON: "Ak chcete zobraziť viac informácií, rozviňte toto tlačidlo.",
            CURRENT_VERSION_HEADER: "Aktuálna verzia ${versionNumber}",
            FILE_SIZE_HEADER: "Veľkosť súboru",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} – aktuálna verzia",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} – všetky verzie",
            DOCS_DRAFT_UPDATED_HEADER: "Koncept bol upravený",
            DOCS_DRAFT_CREATED_HEADER: "Koncept bol vytvorený",
            DOCS_UPDATED_HEADER: "Zverejnené",
            DOCS_CREATED_HEADER: "Vytvorené",
            UPDATED_HEADER: "Aktualizované",
            CREATED_HEADER: "Vytvorené",
            LIKES_HEADER: "Páči sa",
            LIKES_EXPAND_ICON: "Ak chcete vidieť, komu sa páči tento súbor, rozviňte túto ikonu",
            DOWNLOADS_HEADER: "Zobrazenia",
            DOWNLOADS_HEADER_MORE: "Zobrazenia (${0})",
            DOWNLOADS_EXPAND_ICON: "Ak chcete vidieť, kto zobrazil tento súbor, rozviňte túto ikonu",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} – ${anonymousDownloads} anonymne",
            DOWNLOADS_LATEST_VERSION: "Máte najnovšiu verziu tohto súboru",
            DOWNLOADS_LAST_VERSION: "Naposledy ste zobrazili verziu ${0} tohto súboru",
            TAGS_HEADER: "Značky",
            DESCRIPTION_HEADER: "Opis",
            DESCRIPTION_READ_MORE: "Viac informácií...",
            LINKS_HEADER: "Odkazy",
            SECURITY: "Bezpečnosť",
            FILE_ENCRYPTED: "Obsah súboru je zašifrovaný. Obsah zašifrovaného súboru nie je možné prehľadávať. Obsah súboru nemožno zobraziť ani upravovať pomocou aplikácie HCL Docs.",
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
            SHARED_WITH_FOLDERS: "Zdieľané s aplikáciou Súbory – ${count}",
            SEE_WHO_HAS_SHARED: "Zobraziť, kto zdieľa",
            COMMUNITY_FILE: "Súbory vlastnené komunitou nemožno zdieľať s ľuďmi ani inými komunitami.",
            SHARED_WITH_COMMUNITY: "Zdieľaný s členmi komunity '${0}'",
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
         ERROR: "Pri vykonávaní akcie sa vyskytla chyba. Skúste to znova neskôr.",
         TOOLTIP: "Vykonať akciu",
         OK: "OK",
         CANCEL: "Zrušiť",
         A11Y: "Toto tlačidlo vykoná aktuálnu akciu."
      },
      THUMBNAIL: {
         TITLE: "Miniatúra",
         CHANGE_LINK: "Zmeniť miniatúru...",
         ERROR: "Miniatúra sa nedá uložiť. Skúste to znova neskôr.",
         EXT_ERROR: "Vyberte súbor s jednou z týchto podporovaných prípon: ${0}",
         SUCCESS: "Miniatúra bola zmenená",
         UPLOAD: "Uložiť",
         CANCEL: "Zrušiť"
      },
      UPLOAD_VERSION: {
         LINK: "Odoslať novú verziu...",
         CHANGE_SUMMARY: "Voliteľný súhrn zmeny...",
         ERROR: "Nová verzia sa nedá uložiť. Skúste to znova neskôr.",
         SUCCESS: "Nová verzia bola uložená",
         UPLOAD: "Odoslať",
         UPLOAD_AND_CHANGE_EXTENSION: "Odoslať a zmeniť príponu",
         CANCEL: "Zrušiť",
         TOO_LARGE: "Súbor ${file} prekračuje povolenú veľkosť súboru ${size}.",
         PROGRESS_BAR_TITLE: "Nahráva sa nová verzia (dokončené ${uploaded} z ${total})",
         CANCEL_UPLOAD: "Zrušiť odosielanie"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Pri pristupovaní k súboru sa vyskytla chyba. Skúste to znova neskôr.",
         UNAUTHENTICATED: "Platnosť relácie vypršala. Pred zobrazením tohto súboru sa musíte znova prihlásiť.",
         NOT_FOUND: "Súbor, o ktorý ste požiadali, bol vymazaný alebo presunutý. Ak vám niekto poslal tento odkaz, skontrolujte, či je správny.",
         ACCESS_DENIED: "Nemáte povolenie zobraziť tento súbor. Súbor nie je s vami zdieľaný.",
         ACCESS_DENIED_ANON: "Nemáte povolenie zobraziť tento súbor. Ak je tento súbor váš alebo je s vami zdieľaný, najprv sa musíte prihlásiť."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Chyba",
         PROMPT: "Súbor, o ktorý ste požiadali, bol vymazaný alebo presunutý.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Potvrdiť",
        PROMPT: "Časový limit relácie HCL Connections vypršal.${lineBreaks}Ak sa chcete prihlásiť späť, kliknite na tlačidlo OK. Ak chcete zatvoriť toto dialógové okno, kliknite na tlačidlo Zrušiť.",
        OK: "OK",
        CANCEL: "Zrušiť"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Nemožno pristúpiť k odkazu",
        PROMPT: "Pri prístupe k odkazu sa vyskytol problém.${lineBreaks}Kliknutím na tlačidlo OK spustíte presmerovanie na stránku.",
        OK: "OK",
        CANCEL: "Zrušiť"
      },
      LOAD_ERROR: {
         DEFAULT: "Ľutujeme, ale nastala chyba pri pristupovaní k odkazu.",
         ACCESS_DENIED: "Kontaktujte vlastníka súboru a požiadajte o oprávnenie na zobrazenie tohto súboru."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} – súbor",
         LOAD_ERROR: "Nastala chyba pri pristupovaní k súboru"
      },
      SHARE_WITH_LINK: {
         TITLE: "Zdieľať cez odkaz",
         EMPTY_DESCRIPTION: "Pre tento súbor ste ešte nevytvorili odkaz. Vytvorte zdieľaný odkaz a pošlite ho ostatným, aby mohli zobraziť a prevziať súbor.",
         CREATE_LINK: "Vytvoriť odkaz",
         COPY_LINK: "Kopírovať odkaz",
         DELETE_LINK: "Vymazať odkaz",
         ACCESS_TYPE_1: "Tento súbor môže zobraziť ktokoľvek s odkazom",
         ACCESS_TYPE_2: "Tento súbor môžu zobraziť ľudia v mojej organizácii",
         ACCESS_TYPE_1_DESCRIPTION: "Ľudia, ktorí dostanú odkaz, môžu zobraziť náhľad a prevziať tento súbor po prihlásení do produktu Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Ľudia v mojej organizácii, ktorí dostanú odkaz, môžu zobraziť náhľad a prevziať tento súbor po prihlásení do produktu Connections.",
         CHANGE_TYPE_SUCCESS: "Povolenie na prístup k odkazu sa zaktualizuje pri zmene typu prístupu.",
         CHANGE_TYPE_ERROR: "Zlyhalo aktualizovanie oprávnenia odkazu pri zmene typu prístupu.",
         COPY_LINK_SUCCESS: "Odkaz bol skopírovaný do schránky",
         CREATE_SHARELINK_SUCCESS:"Odkaz bol úspešne vytvorený.",
         CREATE_SHARELINK_ERROR:"Nemožno vytvoriť odkaz pre chybu.",
         DELETE_SHARELINK_SUCCESS: "Zdieľaný odkaz na súbor ${file} bol vymazaný.",
         DELETE_SHARELINK_ERROR: "Zdieľaný odkaz nebol vymazaný. Skúste to znova neskôr.",
         CONFIRM_DIALOG: {
            OK: "Vymazať",
            DIALOG_TITLE: "Vymazať zdieľaný odkaz",
            PROMPT: "Tento súbor sa stane neprístupným pre každého, kto má odkaz. Naozaj chcete vymazať zdieľaný odkaz?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Zdieľaný odkaz je aktívny. Tento súbor môže zobraziť ktokoľvek s odkazom. Kliknutím skopírujete tento odkaz.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Zdieľaný odkaz je aktívny. Tento súbor môžu zobraziť ľudia v mojej organizácii. Kliknutím skopírujete tento odkaz."
      }
});
