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
     FILE_VIEWER_TITLE: "Náhled souboru",
     FILENAME_TOOLTIP: "Upravit název souboru",
     ICON_TOOLTIP: "Stáhnout soubor",
     ERROR: "Došlo k chybě.",
     SHARED_EXTERNALLY: "Sdíleno externě",
     FILE_SYNCED: "Přidáno do synchronizace",
     MORE_ACTIONS: {
       TITLE: "Další akce",
       A11Y: "Otevře rozevírací nabídku se seznamem dalších akcí, které lze provést se souborem."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Více voleb",
         A11Y: "Po stisknutí tohoto tlačítka se otevře nabídka s dalšími volbami."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Upravit"
         },
         UPLOAD: {
           TITLE: "Odeslat"
         }
       }
     },
     WELCOME: {
       TITLE: "Zkombinovali jsme zobrazení souboru a podrobností",
       SUBTITLE: "Nyní můžete zobrazit soubor a jeho komentáře vedle sebe.",
       LINES: {
          LINE_1: "Všechny informace a akce ze staré stránky zde najdete také.",
          LINE_2: "Komentáře, sdílení, verze a základní informace jsou k dispozici vedle souboru."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Pomocí tohoto tlačítka lze přejít k dalšímu souboru.",
      PREVIOUS_A11Y: "Pomocí tohoto tlačítka lze přejít k předchozímu souboru."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Zavřít",
         A11Y: "Pomocí tohoto tlačítka lze zavřít prohlížeč souborů."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Nový ze souboru",
         ACTION_NAME:"Vytvořit soubor",
         A11Y: {
           TEXT: "Vytvoří dokument (soubor DOC, DOCX nebo ODT) ze souboru šablony. Tyto dokumenty můžete upravit online v produktu Docs.",
           PRES: "Vytvoří prezentaci (soubor PPT, PPTX nebo ODP) ze souboru šablony. Tyto prezentace můžete upravit online v produktu Docs.",
           SHEET: "Vytvoří tabulku (soubor XLS, XLSX nebo ODS) ze souboru šablony. Tyto tabulky můžete upravit online v produktu Docs."
         },
         PROMPT: {
           TEXT: "Vytvoří dokument (soubor DOC, DOCX nebo ODT) ze souboru šablony. Tyto dokumenty můžete upravit online v produktu Docs.",
           PRES: "Vytvoří prezentaci (soubor PPT, PPTX nebo ODP) ze souboru šablony. Tyto prezentace můžete upravit online v produktu Docs.",
           SHEET: "Vytvoří tabulku (soubor XLS, XLSX nebo ODS) ze souboru šablony. Tyto tabulky můžete upravit online v produktu Docs."
         },
         NAME_FIELD: "Název:",
         EXTERNAL_FIELD: "Soubory lze sdílet s osobami mimo organizaci",
         EXTERNAL_DESC: "Externí přístup umožňuje sdílení souborů s externími uživateli (osobami mimo vaši organizaci či společnost), sdílení složek s externími uživateli a členství externích osob v komunitách. Externí přístup je nutné nastavit při odesílání souboru, nelze ho aktivovat později.",
         CREATE_BUTTON: "Vytvořit",
         CANCEL: "Storno",
         PRE_FILL_NAMES: {
           OTT: "Nepojmenovaný dokument",
           OTS: "Nepojmenovaná tabulka",
           OTP: "Nepojmenovaná prezentace",
           DOT: "Nepojmenovaný dokument",
           XLT: "Nepojmenovaná tabulka",
           POT: "Nepojmenovaná prezentace",
           DOTX: "Nepojmenovaný dokument",
           XLTX: "Nepojmenovaná tabulka",
           POTX: "Nepojmenovaná prezentace"
         },
         ERRORS: {
           NAME_REQUIRED: "Název dokumentu je povinná položka.",
           ILLEGAL_NAME:"Toto je neplatný název dokumentu. Zadejte jiný.",
           WARN_LONG_NAME: "Název dokumentu je příliš dlouhý.",
           TRIM_NAME: "Chcete název dokumentu zkrátit?",
           SESSION_TIMEOUT: "Platnost relace vypršela, přihlaste se a operaci opakujte.",
           DUPLICATE_NAME: "Byl zjištěn duplicitní název souboru. Zadejte nový název.",
           SERVER_ERROR: "Server Connections není dostupný. Obraťte se na administrátora serveru a zkuste to později."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Stáhnout soubor",
         A11Y: "Pomocí tohoto tlačítka lze stáhnout příslušný soubor."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Stáhnout jako soubor PDF",
         TOOLTIP: "Stáhnout tento soubor jako soubor PDF",
         A11Y: "Pomocí tohoto tlačítka lze stáhnout příslušný soubor jako soubor PDF.",
         SUCCESS: "Úspěšně jste stáhli soubor ve formátu PDF.",
         ERROR: {
           DEFAULT: "Nemohli jste stáhnout soubor ve formátu PDF. Zopakujte akci později.",
           UNAUTHENTICATED: "Časový limit relace vypršel. Než budete moci stáhnout soubor ve formátu PDF, musíte se znovu přihlásit.",
           NOT_FOUND: "Soubor se nepodařilo stáhnout ve formátu PDF, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
           ACCESS_DENIED: "Soubor se nepodařilo stáhnout ve formátu PDF, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Není k dispozici žádná publikovaná verze tohoto souboru, kterou by šlo stáhnout. Verze mohou být publikovány z editoru Docs."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Nelze stáhnout soubor",
           CANCEL: "Zavřít",
           PROMPT: "Není k dispozici žádná publikovaná verze tohoto souboru, kterou by šlo stáhnout.",
           PROMPT2: "Verze mohou být publikovány z editoru Docs."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Nelze stáhnout soubor",
           CANCEL: "Zavřít",
           PROMPT: "Není k dispozici žádná publikovaná verze tohoto souboru, kterou by šlo stáhnout.",
           PROMPT2: "Požádejte vlastníka souboru, aby publikoval verzi tohoto souboru."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Stáhnout verze",
           OK: "Stáhnout verzi",
           PROMPT: {
             TODAY: "Byl zjištěn novější koncept s poslední úpravou dnes v ${time}.",
             YESTERDAY: "Byl zjištěn novější koncept s poslední úpravou včera v ${time}.",
             DAY: "Byl zjištěn novější koncept s poslední úpravou ${date}.",
             MONTH: "Byl zjištěn novější koncept s poslední úpravou ${date}.",
             YEAR: "Byl zjištěn novější koncept s poslední úpravou ${date_long}."
           },
           PROMPT2: {
             TODAY: "Opravdu chcete pokračovat ve stahování verze publikované dnes v ${time}?",
             YESTERDAY: "Opravdu chcete pokračovat ve stahování verze publikované včera v ${time}?",
             DAY: "Opravdu chcete pokračovat ve stahování verze publikované ${date}?",
             MONTH: "Opravdu chcete pokračovat ve stahování verze publikované ${date}?",
             YEAR: "Opravdu chcete pokračovat ve stahování verze publikované ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Zobrazit panel s podrobnostmi",
         HIDE: "Skrýt panel s podrobnostmi",
         SHOW_A11Y: "Toto tlačítko přepíná otevření a zavření postranního panelu. Postranní panel je aktuálně zavřený.",
         HIDE_A11Y: "Toto tlačítko přepíná otevření a zavření postranního panelu. Postranní panel je aktuálně otevřený."
       },
       VIEW_DOC: {
         NAME: "Otevřít v prohlížeči produktu Docs",
         TOOLTIP: "Otevřít v prohlížeči produktu Docs",
         A11Y: "Toto tlačítko otevře soubor pro zobrazení v novém okně prohlížeče."
       },
       EDIT_DOC: {
         NAME: "Upravit v produktu Docs",
         TOOLTIP: "Upravit soubor v produktu Docs",
         A11Y: "Toto tlačítko otevře soubor pro úpravy v produktu Docs v novém okně."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Upravit na pracovní ploše",
         DIALOG_TITLE: "Upravit na pracovní ploše",
         TOOLTIP: "Upravit tento dokument",
         A11Y: "Po stisknutí tohoto tlačítka bude soubor otevřen pro lokální úpravy.",
         PROMPT: "Tato funkce umožňuje upravovat soubor lokálně.",
         IMPORTANT: "Důležité:",
         REMINDER: "Po dokončení úprav je třeba publikovat koncept s použitím konektorů souborů ve stolním počítači. Pokud se soubor nepodaří otevřít, je možné, že budete muset nainstalovat moduly plug-in pro stolní počítač.",
         SKIP_DIALOG: "Tuto zprávu již nezobrazovat",
         OK: "OK",
         CANCEL: "Storno"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Potvrdit",
         DELETE_VERSION: "Odstranit verzi ${version}",
         DELETE_VERSION_AND_PRIOR: "Odstranit verzi ${version} a všechny předchozí verze",
         PROMPT: "Chystáte se odstranit verzi ${version}. Chcete pokračovat?",
         DELETE_PRIOR: "Odstranit i všechny dřívější verze",
         ERROR: "Při odstraňování verze došlo k chybě. Opakujte akci později.",
         TOOLTIP: "Odstranit tuto verzi",
         OK: "OK",
         CANCEL: "Storno"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Získat odkazy",
         LINK_FILE: "Odkaz na soubor:",
         LINK_PREVIEW: "Odkaz pro náhled souboru:",
         LINK_DOWNLOAD: "Odkaz pro stažení souboru:",
         TOOLTIP: "Odkaz na soubor",
         OK: "Zavřít"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Stáhnout tuto verzi"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Potvrdit",
         PROMPT: "Chystáte se nahradit aktuální verzi tohoto souboru verzí ${version}. Chcete pokračovat?",
         ERROR: "Při obnovování verze došlo k chybě. Opakujte akci později.",
         TOOLTIP: "Obnovit tuto verzi",
         CHANGE_SUMMARY: "Obnoveno z verze ${version}",
         OK: "OK",
         CANCEL: "Storno"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Potvrdit",
         REMOVE_EVERYONE: "Opravdu chcete odebrat přístup své organizace k tomuto souboru? Je-li přístup odebrán, bude soubor odebrán ze složek a komunit s přístupem na úrovni organizace. Zobrazit tento soubor či s ním pracovat bude pak moci pouze vlastník a uživatelé, s nimiž je soubor sdílen.",
         REMOVE_USER: "Opravdu chcete ukončit sdílení s osobou ${user}? Pokud ukončíte sdílení, uživatel ${user} bude moci k tomuto souboru přistupovat pouze pomocí složek nebo v případě, že je soubor sdílený s kýmkoli ve vaší organizaci.",
         REMOVE_COMMUNITY: "Opravdu chcete odebrat tento soubor z komunity ${communityName}?",
         REMOVE_FOLDER: "Opravdu chcete odebrat tento soubor ze složky ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Odebrat přístup organizace",
         REMOVE_USER_TOOLTIP: "Odebrat veškeré sdílení s osobou ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Odebrat ze komunity ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Odebrat ze složky ${folderName}",
         OK: "OK",
         CANCEL: "Storno"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Upravit tento komentář"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Potvrdit",
         PROMPT: "Opravdu chcete odstranit tento komentář?",
         ERROR: "Při odstraňování komentáře došlo k chybě. Opakujte akci později.",
         TOOLTIP: "Odstranit tento komentář",
         OK: "OK",
         CANCEL: "Storno"
       },
       LIKE: {
         LIKE: "Označit soubor jako oblíbený",
         UNLIKE: "Zrušit označení souboru jako oblíbený",
         LIKE_A11Y: "Stisknutím tohoto tlačítka označíte soubor jako oblíbený.",
         UNLIKE_A11Y: "Stisknutím tohoto tlačítka zrušíte označení souboru jako oblíbený.",
         LIKED_SUCCESS: "Označili jste soubor jako oblíbený.",
         UNLIKE_SUCCESS: "Zrušili jste označení souboru jako oblíbeného."
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Upravit popis",
         ERROR: {
           DEFAULT: "Popis se nepodařilo uložit. Opakujte akci později.",
           UNAUTHENTICATED: "Časový limit relace vypršel. Než budete moci aktualizovat popis, musíte se znovu přihlásit.",
           NOT_FOUND: "Popis se nepodařilo uložit, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
           ACCESS_DENIED: "Popis se nepodařilo uložit, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Chyba při ukládání názvu souboru",
           CONFLICT: "Název souboru již existuje"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Při sledování tohoto souboru došlo k chybě. Opakujte akci později.",
             UNAUTHENTICATED: "Časový limit relace vypršel. Než budete moci sledovat tento soubor, musíte se znovu přihlásit.",
             NOT_FOUND: "Nemůžete sledovat tento soubor, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
             ACCESS_DENIED: "Nemůžete sledovat tento soubor, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
           },
           UNFOLLOW: {
             DEFAULT: "Při zrušení sledování tohoto souboru došlo k chybě. Opakujte akci později.",
             UNAUTHENTICATED: "Časový limit relace vypršel. Než budete moci přestat sledovat tento soubor, musíte se znovu přihlásit.",
             NOT_FOUND: "Nemůžete přestat sledovat tento soubor, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
             ACCESS_DENIED: "Nemůžete přestat sledovat tento soubor, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
           }
         },
         FOLLOW_NAME: "Sledovat",
         FOLLOW_TOOLTIP: "Sledovat tento soubor",
         FOLLOW_A11Y: "Po stisknutí tohoto tlačítka budete soubor sledovat.",
         FOLLOW_SUCCESS: "Nyní tento soubor sledujete.",
         STOP_FOLLOWING_NAME: "Ukončit sledování",
         STOP_FOLLOWING_TOOLTIP: "Přestat sledovat tento soubor",
         STOP_FOLLOWING_A11Y: "Po stisknutí tohoto tlačítka přestanete soubor sledovat.",
         STOP_FOLLOWING_SUCCESS: "Přestali jste sledovat tento soubor."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Přidat do synchronizace",
           TOOLTIP: "Přidat tento soubor do synchronizace",
           A11Y: "Po stisknutí tohoto tlačítka bude soubor přidán do synchronizace.",
           SUCCESS: "Přidali jste tento soubor do synchronizace.",
           ERROR: {
             DEFAULT: "Při přidávání tohoto souboru do synchronizace došlo k chybě. Opakujte akci později.",
             UNAUTHENTICATED: "Časový limit relace vypršel. Než budete moci přidat tento soubor do synchronizace, musíte se znovu přihlásit.",
             NOT_FOUND: "Nemůžete přidat tento soubor do synchronizace, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
             ACCESS_DENIED: "Nemůžete přidat tento soubor do synchronizace, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
           }
         },
         STOP_SYNC: {
           NAME: "Odebrat ze synchronizace",
           TOOLTIP: "Odebrat tento soubor ze synchronizace",
           A11Y: "Po stisknutí tohoto tlačítka bude soubor odebrán ze synchronizace.",
           SUCCESS: "Odebrali jste tento soubor ze synchronizace.",
           ERROR: {
             DEFAULT: "Při odebírání tohoto souboru ze synchronizace došlo k chybě. Opakujte akci později.",
             UNAUTHENTICATED: "Časový limit relace vypršel. Než budete moci odebrat tento soubor ze synchronizace, musíte se znovu přihlásit.",
             NOT_FOUND: "Nemůžete odebrat tento soubor ze synchronizace, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
             ACCESS_DENIED: "Nemůžete odebrat tento soubor ze synchronizace, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Ukotvit",
          FAVORITE_TOOLTIP: "Ukotvit tento soubor",
          FAVORITE_A11Y: "Po stisknutí tohoto tlačítka budete soubor ukotven.",
          FAVORITE_SUCCESS: "Tento soubor jste ukotvili.",
          STOP_FAVORITEING_NAME: "Zrušit ukotvení",
          STOP_FAVORITEING_TOOLTIP: "Zrušit ukotvení tohoto souboru",
          STOP_FAVORITEING_A11Y: "Po stisknutí tohoto tlačítka nebudete soubor ukotven.",
          STOP_FAVORITEING_SUCCESS: "Zrušili jste ukotvení tohoto souboru."
       },
       TRASH: {
         NAME: "Přesunout do koše",
         DIALOG_TITLE: "Potvrdit",
         PROMPT: "Opravdu chcete přesunout tento soubor do koše? Přesunutí tohoto souboru do koše bude mít za následek jeho nedostupnost pro všechny, kteří jej aktuálně sdílejí.",
         ERROR: "Při odstraňování souboru došlo k chybě. Opakujte akci později.",
         TOOLTIP: "Odstranit tento soubor",
         OK: "OK",
         CANCEL: "Storno",
         A11Y: "Po stisknutí tohoto tlačítka bude soubor přesunut do koše.",
         SUCCESS_MSG: "Soubor ${file} byl přesunut do koše."
       },
       REFRESH: {
         NAME: "Obnovit",
         ERROR: "Došlo k chybě při obnově prohlížeče souborů. Opakujte akci později.",
         TOOLTIP: "Obnovit prohlížeč souborů",
         INFO_MSG: "Chcete-li získat nejnovější obsah, proveďte obnovení. ${link}",
         A11Y: "Po stisknutí tohoto tlačítka bude soubor přesunut do koše.",
         SUCCESS_MSG: "Obsah byl úspěšně obnoven."
       },
       COPY_FILE: {
         NAME: "Dát kopii k dispozici komunitě",
         DIALOG_TITLE: "Potvrdit",
         ERROR: "Došlo k chybě při kopírování souboru. Opakujte akci později.",
         TOOLTIP: "Dát kopii tohoto souboru k dispozici komunitě",
         OK: "OK",
         CANCEL: "Storno",
         A11Y: "Po stisknutí tohoto tlačítka se otevře dialogové okno umožňující předat kopii tohoto souboru komunitě.",
         SUCCESS_MSG: "Soubor ${file} byl zkopírován do komunity ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Odeslat novou verzi",
         NAME_SHORT: "Odeslat",
         CHANGE_SUMMARY: "Volitelný souhrn změn...",
         TOOLTIP: "Odeslat novou verzi tohoto souboru",
         A11Y: "Po stisknutí tohoto tlačítka se otevře dialogové okno umožňující odeslat novou verzi tohoto souboru."
       },
       LOG_IN: {
    	   NAME: "Přihlásit se",
    	   TOOLTIP: "Po přihlášení můžete odesílat a sdílet soubory, přidávat komentáře a vytvářet složky"
       },
       LOCK: {
          NAME: "Uzamknout soubor",
          TITLE: "Uzamknout tento soubor",
          A11Y: "Uzamknout tento soubor",
          SUCCESS: "Soubor je nyní uzamknut."
       },
       UNLOCK: {
          NAME: "Odemknout soubor",
          TITLE: "Odemknout tento soubor",
          A11Y: "Odemknout tento soubor",
          SUCCESS: "Soubor je nyní odemknut."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Upravit na pracovní ploše",
          TITLE: "Upravit na pracovní ploše",
          A11Y: "Upravit na pracovní ploše"
       },
       FLAG: {
         FILE: {
           NAME: "Nastavit příznak nevhodnosti",
           TITLE: "Označit soubor příznakem",
           A11Y: "Nastavit pro tento soubor příznak nevhodnosti",
           PROMPT: "Zadejte důvod pro označení tohoto souboru příznakem (volitelné):",
           OK: "Označit příznakem",
           CANCEL: "Storno",
           SUCCESS: "Soubor byl označen příznakem a odeslán k revizi.",
           ERROR: "Chyba při označování souboru příznakem; opakujte akci později."
         },
         COMMENT: {
           NAME: "Nastavit příznak nevhodnosti",
           TITLE: "Nastavit pro komentář příznak",
           A11Y: "Nastavit pro tento komentář příznak nevhodnosti",
           PROMPT: "Zadejte důvod pro označení tohoto komentáře příznakem (volitelné):",
           OK: "Označit příznakem",
           CANCEL: "Storno",
           SUCCESS: "Komentář byl označen příznakem a odeslán k revizi.",
           ERROR: "Chyba při označování komentáře příznakem; opakujte akci později."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Informace o tomto souboru",
       VIEW_FILE_DETAILS: "Zobrazit podrobnosti o souboru",
       A11Y: "Po klepnutí na tento odkaz bude zavřen prohlížeč souborů a budete přesměrováni na stránku s podrobnostmi o tomto souboru."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Pro tento soubor není k dispozici žádný náhled."
      },
      IMAGE: {
       ZOOM_IN: "Přiblížit",
       ZOOM_OUT: "Oddálit",
       RESET: "Obnovit",
       ZOOM_IN_A11Y: "Pomocí tohoto tlačítka lze přiblížit obrázek.",
       ZOOM_OUT_A11Y: "Pomocí tohoto tlačítka lze oddálit obrázek.",
       RESET_ZOOM_A11Y: "Pomocí tohoto tlačítka lze obnovit úroveň přiblížení."
      },
      VIEWER: {
       LOADING: "Načítání...",
       NO_PUBLISHED_VERSION: "Pro zobrazení není k dispozici publikovaná verze tohoto souboru.",
       IFRAME_TITLE: "Náhled tohoto souboru"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Naposledy aktualizováno uživatelem ${user} dnes v ${time}.",
       YESTERDAY: "Naposledy aktualizováno uživatelem ${user} včera v ${time}.",
       DAY: "Naposledy aktualizováno uživatelem ${user} ${EEee} v ${time}.",
       MONTH: "Naposledy aktualizováno uživatelem ${user} ${date_long}.",
       YEAR: "Naposledy aktualizováno uživatelem ${user} ${date_long}."
      },
      CREATED: {
       TODAY: "Vytvořeno uživatelem ${user} dnes v ${time}.",
       YESTERDAY: "Vytvořeno uživatelem ${user} včera v ${time}.",
       DAY: "Vytvořeno uživatelem ${user} ${EEee} v ${time}.",
       MONTH: "Vytvořeno uživatelem ${user} ${date_long}.",
       YEAR: "Vytvořeno uživatelem ${user} ${date_long}."
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
       TITLE: "Oblast textu komentáře",
       SHADOW_TEXT: "Přidat komentář...",
       CANNOT_ACCESS_CONTENT: "Následující lidé, které jste zmínili, nemohou tento komentář zobrazit, protože nemají přístup k obsahu:",
       ERROR: "Při ověřování uživatelé, o kterém se pokoušíte uvést zmínku, došlo k chybě.",
       POST: "Zveřejnit",
       SAVE: "Uložit",
       CANCEL: "Storno",
       EXTERNAL_WARNING: "Komentáře mohou zobrazit osoby mimo vaši organizaci."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Storno",
         A11Y: "Pomocí tohoto tlačítka lze zrušit akci úpravy názvu souboru."
       },
       INVALID_CHARACTERS: "Neplatný znak",
       INVALID_CHARACTERS_REMOVED: "Neplatné znaky byly odebrány"
     },
     COMMENT_WIDGET: {
       EDITED: "(upraveno)",
       EDITED_DATE: {
         TODAY: "Upraveno dnes v ${time}",
         YESTERDAY: "Upraveno včera v ${time}",
         DAY: "Upraveno dne ${EEee} v ${time}",
         MONTH: "Upraveno dne ${date_long}",
         YEAR: "Upraveno dne ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Uložit",
       CANCEL: "Storno",
       USER: "Uživatel",
       COMMUNITY: "Komunita",
       SHARE: "Sdílet",
       SHARE_ALT: "Sdílet s tímto uživatelem",
       MEMBER_TYPE: "Typ člena",
       PERSON_SHADOW: "Začněte zadávat jméno hledané osoby",
       COMMUNITY_SHADOW: "Začněte zadávat název hledané komunity",
       PERSON_FULL_SEARCH: "Není zde hledaná osoba uvedena? Použijte úplné hledání...",
       COMMUNITY_FULL_SEARCH: "Není zde hledaná komunita uvedena? Použijte úplné hledání...",
       ADD_OPTIONAL_MESSAGE: "Přidat volitelnou zprávu",
       ROLE_LABEL: "Role",
       ROLE_EDIT: "Editor",
       ROLE_VIEW: "Čtenář"
     },
     FILE_STATE: {
       DOCS_FILE: "Toto je soubor produktu Docs. Všechny úpravy je třeba provádět online.",
       LOCKED_BY_YOU: {
         TODAY: "Uzamknuto vámi v ${time}.",
         YESTERDAY: "Uzamknuto vámi včera v ${time}.",
         DAY: "Uzamknuto vámi dne ${date}.",
         MONTH: "Uzamknuto vámi dne ${date}.",
         YEAR: "Uzamknuto vámi dne ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Uzamknuto v ${time} uživatelem ${user}.",
         YESTERDAY: "Uzamknuto včera v ${time} uživatelem ${user}.",
         DAY: "Uzamknuto dne ${date} uživatelem ${user}.",
         MONTH: "Uzamknuto dne ${date} uživatelem ${user}.",
         YEAR: "Uzamknuto ${date_long} uživatelem ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Komentář je příliš dlouhý.",
         TRIM: "Chcete komentář zkrátit?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Popis je příliš dlouhý.",
         TRIM: "Chcete popis zkrátit?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Zpráva je příliš dlouhá.",
         TRIM: "Chcete zprávu zkrátit?"
       },
       TAG: {
         WARN_TOO_LONG: "Značka je příliš dlouhá.",
         TRIM: "Chcete značku zkrátit?"
       },
       TAGS: {
         WARN_TOO_LONG: "Jedna či více značek je příliš dlouhých.",
         TRIM: "Chcete značky zkrátit?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Název souboru je příliš dlouhý"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Tento soubor je k dispozici pro úpravy online jen v případě, že jste zakoupili oprávnění pro produkt Docs.",
       CURRENT_EDITORS: "Tento soubor je nyní upravován na webu uživatelem ${users}.",
       UNPUBLISHED_CHANGES: "Existují úpravy tohoto konceptu, které nebyly publikovány jako verze.",
       PUBLISH_A_VERSION: "Publikovat verzi",
       PUBLISH_SUCCESS: "Úspěšně jste publikovali verzi tohoto souboru",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Verzi se nepodařilo publikovat, protože byl odepřen přístup.",
         NOT_FOUND: "Verzi se nepodařilo publikovat, protože dokument nebyl nalezen.",
         CANNOT_REACH_REPOSITORY: "Verzi se nepodařilo publikovat, protože se server Docs nemůže připojit k úložišti souborů.",
         QUOTA_VIOLATION: "Verzi se nepodařilo publikovat vzhledem k omezením místa. Uvolněte prostor pro publikování této verze odebráním jiných souborů.",
         CONVERSION_UNAVAILABLE: "Verzi se nepodařilo publikovat, protože převodní služba produktu Docs není k dispozici. Opakujte akci později.",
         TOO_LARGE: "Verzi se nepodařilo publikovat, protože dokument je příliš velký.",
         CONVERSION_TIMEOUT: "Verzi se nepodařilo publikovat, protože převodní službě produktu Docs trvá jeho převod příliš dlouho. Opakujte akci později.",
         SERVER_BUSY: "Verzi se nepodařilo publikovat, protože server Docs je zaneprázdněn. Opakujte akci později.",
         DEFAULT: "Verzi se nepodařilo publikovat, protože služba produktu Docs není k dispozici. Opakujte akci později."
       }
     },
     COMMENTS: {
       EMPTY: "Nejsou k dispozici žádné komentáře.",
       MODERATED: "Komentář byl odeslán k revizi, bude k dispozici po schválení.",
       ERROR: {
         SAVE: {
           DEFAULT: "Komentář nemohl být uložen. Opakujte akci později.",
           UNAUTHENTICATED: "Časový limit relace vypršel. Před uložením komentáře je třeba znovu se přihlásit.",
           NOT_FOUND: "Komentář se nepodařilo uložit, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
           ACCESS_DENIED: "Komentář se nepodařilo uložit, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
         },
         DELETE: {
           DEFAULT: "Komentář nemohl být odstraněn. Opakujte akci později.",
           UNAUTHENTICATED: "Časový limit relace vypršel. Před odstraněním komentáře je třeba znovu se přihlásit.",
           NOT_FOUND: "Komentář se nepodařilo odstranit, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen.",
           ACCESS_DENIED: "Komentář se nepodařilo odstranit, protože příslušný soubor byl odstraněn nebo již s vámi není sdílen."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Uložit",
       EDIT_TAGS: "Upravit značky",
       ERROR: {
         SAVE: {
           DEFAULT: "Značku se nepodařilo vytvořit. Opakujte akci později."
         },
         DELETE: {
           DEFAULT: "Značku se nepodařilo odstranit. Opakujte akci později."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Zobrazit více...",
       READ_LESS: "Zobrazit méně..."
     },
     SHARE: {
	     EVERYONE: "Všichni v rámci organizace",
	     ADD_TOOLTIP: "Uložit",
	     ROLES: {
	       OWNER: "Vlastník",
	       EDIT: "Editoři",
	       VIEW: "Čtenáři",
	       FOLDER: "Sdíleno se složkami"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Vlastník"
	       },
	       EDIT: {
	         ROLE: "Upravit",
           ADD: "Přidat editora"
	       },
	       VIEW: {
	         ROLE: "Čtenář",
           ADD: "Přidat čtenáře"
	       },
	       FOLDER: {
           ADD: "Přidat složky",
           COMMUNITY_ADD: "Přidat do složky",
           MOVE: "Přesunutí do složky"
	       },
	       MULTI: {
	         ADD: "Přidat lidi nebo komunity",
	         ADD_PEOPLE: "Přidat lidi"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Všichni v rámci organizace",
	        LONG: {
	           GENERIC: "Všichni v rámci organizace",
	           ORG: "Všichni v organizaci ${org}"
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Tento soubor je již s uživatelem ${user} sdílen.",
	       ERROR: "Sdílení s uživatelem ${user} nyní není možné.",
	       SELF: "Nemůžete sdílet sami se sebou."
	     },
	     SHARE_INFO: {
	       PROMOTED: "Uživatel ${user} byl povýšen do vyšší role sdílení."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Položka byla úspěšně sdílena s uživatelem ${user}."
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Volitelná zpráva..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Zajišťovat externího uživatele",
            ACTION: "Zajišťovat externího uživatele...",
            TOOLTIP: "Zajišťovat externího uživatele",
            DIALOG_TITLE: "Sdílení obsahu nebylo nastaveno.",
            PROMPT: {
              NO_ACCOUNT: "Následující uživatel nemá účet a nebyl s ním sdílen žádný obsah.",
              INVITE: "Pozvěte tohoto uživatele jako hosta, aby s ním bylo možné obsah sdílet."
            },
            SUBMIT: "Pokračovat s pozvánkou",
            CANCEL: "Storno",
            ERROR: "Došlo k chybě při zajišťování účtu. Opakujte akci později.",
            SUCCESS: "Uživatelský účet byl úspěšně zajištěn."
	       },
	       PLURAL: {
	         NAME: "Zajišťovat externí uživatele",
	         ACTION: "Zajišťovat externí uživatele...",
	         TOOLTIP: "Zajišťovat externí uživatele",
	         DIALOG_TITLE: "Sdílení obsahu nebylo nastaveno.",
	         PROMPT: {
	           NO_ACCOUNT: "Následující uživatelé nemají účet a nebyl s nimi sdílen žádný obsah.",
	           INVITE: "Pozvěte tyto uživatele jako hosty, aby s nimi bylo možné obsah sdílet."
	         },
	         SUBMIT: "Pokračovat s pozvánkami",
	         CANCEL: "Storno",
	         ERROR: "Došlo k chybě při zajišťování účtů. Opakujte akci později.",
	         SUCCESS: "Uživatelské účty byly úspěšně zajištěny."
	       },
	       ABSTRACT: {
	         NAME: "Zajišťovat externí uživatele",
            ACTION: "Zajišťovat externí uživatele...",
            TOOLTIP: "Zajišťovat externí uživatele",
            DIALOG_TITLE: "Sdílení obsahu nebylo nastaveno.",
            PROMPT: {
              NO_ACCOUNT: "Někteří uživatelé nemají účet a nebyl s nimi sdílen žádný obsah.",
              INVITE: "Pozvěte tyto uživatele jako hosty, aby s nimi bylo možné obsah sdílet."
            },
            SUBMIT: "Pokračovat s pozvánkami",
            CANCEL: "Storno",
            ERROR: "Došlo k chybě při zajišťování účtů. Opakujte akci později.",
            SUCCESS: "Uživatelské účty byly úspěšně zajištěny."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Volby sdílení",
         PROPAGATION: "Povolit ostatním sdílení tohoto souboru",
         EVERYONE: "Tento soubor mohou sdílet všichni uživatelé.",
         OWNER_ONLY: "Tento soubor může sdílet pouze vlastník.",
         STOP_SHARE: "Ukončit sdílení",
         MAKE_INTERNAL: "Ukončit externí sdílení",
         MAKE_INTERNAL_SUCCESS: "Tento soubor již nelze sdílet s osobami mimo organizaci.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Nastavit jako interní?",
           PROMPT: "Nastavením tohoto souboru jako interního znemožníte jeho sdílení s osobami mimo organizaci. ${br}${br}" +
             "Veškeré sdílení s externími osobami, komunitami či složkami bude odebráno.${br}${br}Nastavení souboru jako interního je trvalé a nelze je vrátit zpět."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Přestat sdílet soubor",
           PROMPT: "Opravdu chcete ukončit sdílení tohoto souboru?",
           QUESTION_PUBLIC: "Tento soubor nebude nadále viditelný pro všechny v organizaci a nebude sdílen s osobami, složkami nebo komunitami. Tuto operaci nelze vrátit zpět.",
           QUESTION_PUBLIC_E: "Tento soubor nebude nadále viditelný pro všechny v organizaci a nebude sdílen s osobami ani složkami. Tuto operaci nelze vrátit zpět.",
           QUESTION: "Tento soubor již nebude sdílen s osobami nebo komunitami a bude odebrán ze všech složek kromě vašich soukromých složek. Tuto akci nelze vrátit.",
           QUESTION_E: "Tento soubor již nebude sdílen s osobami a bude odebrán ze všech složek kromě vašich soukromých složek. Tuto akci nelze vrátit."
         },
         MAKE_PRIVATE_SUCCESS: "Tento soubor je nyní soukromý.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Nelze ukončit sdílení souboru. Opakujte akci později."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Mé sdílené položky"
	   },
	   STREAM: {
	     LOADING: "Načítání...",
	     LOAD_MORE: "Načíst další..."
	   },
	   ENTRY: {
	     REMOVE: "Odebrat",
	     RESTORE: "Obnovit",
	     EDIT: "Upravit",
	     DELETE: "Odstranit",
	     OK: "OK",
	     CANCEL: "Storno",
	     USER_PICTURE: "Obrázek uživatele ${0}",
	     FLAG: "Nastavit příznak nevhodnosti"
	   },
	   PANEL: {
	     LOAD_ERROR: "Při přístupu k metadatům tohoto souboru došlo k chybě.",
	     ABOUT: {
	       TITLE: "Informace",
	       EXPAND_BUTTON: "Rozbalením tohoto tlačítka zobrazíte další informace.",
	       CURRENT_VERSION_HEADER: "Aktuální verze ${versionNumber}",
	       FILE_SIZE_HEADER: "Velikost souboru",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - aktuální verze",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - všechny verze",
	       DOCS_DRAFT_UPDATED_HEADER: "Koncept upraven",
	       DOCS_DRAFT_CREATED_HEADER: "Koncept vytvořen",
	       DOCS_UPDATED_HEADER: "Publikováno",
	       DOCS_CREATED_HEADER: "Vytvořeno",
	       UPDATED_HEADER: "Aktualizováno",
	       CREATED_HEADER: "Vytvořeno",
	       LIKES_HEADER: "Hodnocení Oblíbené",
	       LIKES_EXPAND_ICON: "Rozbalením této ikony zobrazíte, kdo označil soubor jako Oblíbený.",
	       DOWNLOADS_HEADER: "Stažení",
	       DOWNLOADS_HEADER_MORE: "Stažení (${0})",
	       DOWNLOADS_EXPAND_ICON: "Rozbalením této ikony zobrazíte, kdo soubor stáhnul.",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymně",
	       DOWNLOADS_LATEST_VERSION: "Máte nejnovější verzi tohoto souboru.",
	       DOWNLOADS_LAST_VERSION: "Naposledy jste stáhli verzi ${0} tohoto souboru.",
	       TAGS_HEADER: "Značky",
	       DESCRIPTION_HEADER: "Popis",
	       DESCRIPTION_READ_MORE: "Zobrazit více...",
	       LINKS_HEADER: "Odkazy",
	       SECURITY: "Zabezpečení",
	       FILE_ENCRYPTED: "Obsah souboru je zašifrován. Šifrovaný obsah souborů nelze prohledávat. Obsah souboru nelze prohlížet a nelze jej editovat pomocí aplikací HCL Docs.",
	       GET_LINKS: "Získat odkazy...",
	       ADD_DESCRIPTION: "Přidat popis",
	       NO_DESCRIPTION: "Bez popisu",
	       ADD_TAGS: "Přidat značky",
	       NO_TAGS: "Žádné značky"
	     },
	     COMMENTS: {
	       TITLE: "Komentáře",
	       TITLE_WITH_COUNT: "Komentáře: (${0})",
	       VERSION: "Verze ${0}",
	       FEED_LINK: "Kanál pro tyto komentáře",
	       FEED_TITLE: "Sledovat změny těchto komentářů prostřednictvím čtečky informačních kanálů"
	     },
	     SHARING: {
	       TITLE: "Sdílení",
	       TITLE_WITH_COUNT: "Sdíleno (${0})",
	       SHARED_WITH_FOLDERS: "Sdíleno se složkami - ${count}",
	       SEE_WHO_HAS_SHARED: "Zobrazit uživatele sdílející položku",
           COMMUNITY_FILE: "Soubory vlastněné komunitou nelze sdílet s lidmi nebo jinými komunitami.",
           SHARED_WITH_COMMUNITY: "Sdíleno se členy komunity ${0}",
           LOGIN: "Přihlásit se",
           NO_SHARE: "Tento soubor zatím nebyl přidán do žádných složek.",
           ONE_SHARE: "Tento soubor je obsažen v jedné složce či komunitě, ke které nemáte přístup.",
           MULTIPLE_SHARE: "Tento soubor je obsažen ve složkách či komunitách (počet: ${fileNumber}), ke kterým nemáte přístup."
	     },
	     VERSIONS: {
	       TITLE: "Verze",
	       TITLE_WITH_COUNT: "Verze (${0})",
	       FEED_LINK: "Kanál pro tyto verze",
	       FEED_TITLE: "Sledovat změny tohoto souboru prostřednictvím čtečky informačních kanálů"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Potvrzení akce",
       DIALOG_TITLE: "Potvrdit",
       PROMPT: "Opravdu chcete tuto akci provést?",
       ERROR: "Při provádění akce došlo k chybě. Opakujte akci později.",
       TOOLTIP: "Provést akci",
       OK: "OK",
       CANCEL: "Storno",
       A11Y: "Po stisknutí tohoto tlačítka bude provedena aktuální akce."
     },
     THUMBNAIL: {
       TITLE: "Miniatura",
       CHANGE_LINK: "Změnit miniaturu...",
       ERROR: "Miniatura nebyla uložena. Opakujte akci později.",
       EXT_ERROR: "Vyberte soubor s jednou z následujících podporovaných přípon: ${0}",
       SUCCESS: "Miniatura byla změněna.",
       UPLOAD: "Uložit",
       CANCEL: "Storno"
     },
     UPLOAD_VERSION: {
       LINK: "Odeslat novou verzi...",
       CHANGE_SUMMARY: "Volitelný souhrn změn...",
       ERROR: "Novou verzi se nepodařilo uložit. Opakujte akci později.",
       SUCCESS: "Nová verze byla uložena.",
       UPLOAD: "Odeslat",
       UPLOAD_AND_CHANGE_EXTENSION: "Odeslat a změnit příponu",
       CANCEL: "Storno"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Při přístupu k souboru došlo k chybě. Opakujte akci později.",
       UNAUTHENTICATED: "Časový limit relace vypršel. Než budete moci zobrazit tento soubor, musíte se znovu přihlásit.",
       NOT_FOUND: "Požadovaný soubor byl odstraněn nebo přesunut. Pokud vám tento odkaz někdo zaslal, zkontrolujte, zda je správný.",
       ACCESS_DENIED: "Nemáte oprávnění k zobrazení tohoto souboru. Soubor s vámi není sdílen.",
       ACCESS_DENIED_ANON: "Nemáte oprávnění k zobrazení tohoto souboru. Pokud se jedná o váš soubor nebo pokud je s vámi tento soubor sdílen, musíte se nejprve přihlásit."
     },
     LOAD_ERROR: {
       DEFAULT: "Jejda! Při přístupu k odkazu došlo k chybě.",
       ACCESS_DENIED: "Obraťte se na vlastníka souboru a požádejte o oprávnění k zobrazení tohoto souboru."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Soubor",
       LOAD_ERROR: "Chyba při přístupu k souboru."
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
