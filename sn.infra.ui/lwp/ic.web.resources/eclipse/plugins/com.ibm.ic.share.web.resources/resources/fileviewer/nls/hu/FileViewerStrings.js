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
      FILE_VIEWER_TITLE: "Fájl előnézete",
      FILENAME_TOOLTIP: "Fájlnév szerkesztése",
      ICON_TOOLTIP: "Fájl letöltése",
      ERROR: "Hiba történt.",
      FILE_MALICIOUS: "A vírusellenőrzés rosszindulatú tartalmat észlelt",
      SHARED_EXTERNALLY: "Külsőleg megosztott",
      FILE_SYNCED: "Szinkronizáláshoz hozzáadva",
      MY_DRIVE: {
         TITLE: "A Saját meghajtón",
         ROOT_FOLDER: "/Saját meghajtó",
         FOLDER: "/Saját meghajtó/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "További műveletek",
         A11Y: "Megnyitja a fájlon elvégezhető további műveletek listáját tartalmazó legördülő menüt.",
            PANELS: {
               TITLE: "Továbbiak",
               A11Y: "Megnyitja a rejtett panelek listáját tartalmazó legördülő menüt."
            }
      },
      WELCOME: {
         TITLE: "Kombináltuk a fájl nézetet és a részleteket",
         SUBTITLE: "Most már egymás mellett tekintheti meg a fájlt és a hozzá tartozó megjegyzéseket.",
         LINES: {
            LINE_1: "Minden információ és tevékenység, amely a régi oldalon volt elérhető, most már itt található.",
            LINE_2: "A megjegyzések, a megosztás, a változatok és az általános információk a fájl mellett érhetők el."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Ez a gomb a következő fájlhoz navigál.",
         PREVIOUS_A11Y: "Ez a gomb az előző fájlhoz navigál."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "További szerkesztési lehetőségek",
            A11Y: "Ez a gomb további szerkesztési lehetőségeket tartalmazó menüt nyit meg."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Szerkesztés"
            },
            UPLOAD: {
               TITLE: "Feltöltés"
            },
            CREATE: {
              TITLE: "Létrehozás"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Panel átméretezése",
           USAGE: "A panel átméretezéséhez nyomja le a bal vagy a jobb szögletes zárójelet."
       },
         CLOSE: {
            TOOLTIP: "Bezárás",
            A11Y: "Ez a gomb bezárja a fájlmegjelenítőt.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "A fájl feltöltése folyamatban.",
              PROMPT: "A fájl továbbra is feltöltés alatt áll. Ha ennek befejeződése előtt bezárja ezt, akkor a feltöltés megszakad.",
              OK: "Bezárás mindenképpen",
              CANCEL: "Várakozás a feltöltésre"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Hozzáadás a Fájlokhoz",
           A11Y: "Ez a gomb hozzáadja a csatolmányt a Fájlokhoz.",
           VIEW_NOW: "Megtekintés most"
         },
         TEAR_OFF: {
           TOOLTIP: "Megnyitás új ablakban",
           A11Y: "Megnyitás új ablakban",
           ERROR_TEARING_OFF: "Hiba történt az új ablak megnyitása közben.",
           DIALOG_TITLE: "Megerősítés",
           UNSAVED_CHANGES_WARNING: "Nem mentett módosításai vannak, melyek elvésznek. Ennek ellenére szeretne új ablakot nyitni?",
           OK: "Igen",
           CANCEL: "Nem",
           OPEN: "Megnyitás",
           OPEN_ANYWAY: "Megnyitás mindenképpen",
           CANCEL_ALT: "Mégse"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Új, fájlból",
            ACTION_NAME:"Fájl létrehozása",
            A11Y: {
               TEXT: "Dokumentum (DOC-, DOCX- vagy ODT-fájl) létrehozása sablonfájlból. Ezek a dokumentumok online szerkeszthetők a Docs szolgáltatásban.",
               PRES: "Bemutató (PPT-, PPTX- vagy ODP-fájl) létrehozása sablonfájlból. Ezek a bemutatók online szerkeszthetők a Docs szolgáltatásban.",
               SHEET: "Táblázat (XLS-, XLSX- vagy ODS-fájl) létrehozása sablonfájlból. Ezek a táblázatok online szerkeszthetők a Docs szolgáltatásban."
            },
            PROMPT: {
               TEXT: "Dokumentum (DOC-, DOCX- vagy ODT-fájl) létrehozása sablonfájlból. Ezek a dokumentumok online szerkeszthetők a Docs szolgáltatásban.",
               PRES: "Bemutató (PPT-, PPTX- vagy ODP-fájl) létrehozása sablonfájlból. Ezek a bemutatók online szerkeszthetők a Docs szolgáltatásban.",
               SHEET: "Táblázat (XLS-, XLSX- vagy ODS-fájl) létrehozása sablonfájlból. Ezek a táblázatok online szerkeszthetők a Docs szolgáltatásban."
            },
            NAME_FIELD: "Név:",
            EXTERNAL_FIELD: "A fájlok megoszthatók a szervezeten kívüli személyekkel",
            EXTERNAL_DESC: "A külső hozzáférés lehetővé teszi fájlok megosztását külső felhasználókkal (a szervezetén vagy vállalatán kívüli személyekkel), a mappák megosztását külső felhasználókkal, valamint a közösségek megosztását tagokként részt vevő külső személyekkel. A külső hozzáférést a fájl feltöltésekor kell beállítania, nem kapcsolható be később.",
            CREATE_BUTTON: "Létrehozás",
            CANCEL: "Mégse",
            PRE_FILL_NAMES: {
               OTT: "Névtelen dokumentum",
               OTS: "Névtelen számolótábla",
               OTP: "Névtelen bemutató",
               DOT: "Névtelen dokumentum",
               XLT: "Névtelen számolótábla",
               POT: "Névtelen bemutató",
               DOTX: "Névtelen dokumentum",
               XLTX: "Névtelen számolótábla",
               POTX: "Névtelen bemutató"
            },
            ERRORS: {
               NAME_REQUIRED: "A dokumentumnév megadása kötelező.",
               ILLEGAL_NAME:"Ez érvénytelen dokumentumcím, adjon meg másikat.",
               WARN_LONG_NAME: "A dokumentumnév túl hosszú.",
               TRIM_NAME: "Lerövidíti a dokumentumnevet?",
               SESSION_TIMEOUT: "A munkamenet lejárt, jelentkezzen be és próbálkozzon újra.",
               DUPLICATE_NAME: "A rendszer ismétlődő nevet talált. Adjon meg új nevet.",
               SERVER_ERROR: "A Connections-kiszolgáló nem áll rendelkezésre. Forduljon a kiszolgáló adminisztrátorához, és próbálkozzon újra később."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Fájl letöltése",
            A11Y: "Ez a gomb letölti a fájlt."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Letöltés PDF-ként",
            TOOLTIP: "A fájl letöltése PDF fájlként",
            A11Y: "Ez a gomb letölti a fájlt PDF formátumban.",
            SUCCESS: "Sikeresen letöltötte a fájlt PDF formátumban.",
            ERROR: {
               DEFAULT: "Nem sikerült PDF-ként letölteni a fájlt. Próbálkozzon újra később.",
               UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt letölthetné a fájlt PDF-ként.",
               NOT_FOUND: "A fájlt nem lehetett letölteni, mert a fájlt törölték vagy már nincs megosztva Önnel.",
               ACCESS_DENIED: "A fájlt nem lehetett letölteni, mert a fájlt törölték vagy már nincs megosztva Önnel."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Ez a fájl nem rendelkezik közzétett verzióval, amely letölthető lenne. A Docs szerkesztőből lehet verziókat közzétenni."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Nem lehet letölteni a fájlt",
               CANCEL: "Bezárás",
               PROMPT: "Nincs közzétett verziója a letöltendő fájlnak.",
               PROMPT2: "A verziók a Docs szerkesztőből tehetők közzé."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Nem lehet letölteni a fájlt",
               CANCEL: "Bezárás",
               PROMPT: "Nincs közzétett verziója a letöltendő fájlnak.",
               PROMPT2: "Kérje meg a fájl tulajdonosát, hogy tegye közzé a fájl egy verzióját."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Verzió letöltése",
               OK: "Verzió letöltése",
               PROMPT: {
                  TODAY: "Egy újabb, utoljára ma ${time} időpontban szerkesztett vázlat észlelhető.",
                  YESTERDAY: "Egy újabb, utoljára tegnap ${time} időpontban szerkesztett vázlat észlelhető.",
                  DAY: "Egy újabb, utoljára ${date} napján szerkesztett vázlat észlelhető.",
                  MONTH: "Egy újabb, utoljára ${date} napján szerkesztett vázlat észlelhető.",
                  YEAR: "Egy újabb, utoljára ${date_long} napján szerkesztett vázlat észlelhető."
               },
               PROMPT2: {
                  TODAY: "Biztosan folytatni kívánja a ma ${time} időpontban közzétett verzió letöltésével?",
                  YESTERDAY: "Biztosan folytatni kívánja a tegnap ${time} időpontban közzétett verzió letöltésével?",
                  DAY: "Biztosan folytatni kívánja a(z) ${date} napján közzétett verzió letöltésével?",
                  MONTH: "Biztosan folytatni kívánja a(z) ${date} napján közzétett verzió letöltésével?",
                  YEAR: "Biztosan folytatni kívánja a(z) ${date_long} napján közzétett verzió letöltésével?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Részletek panel megjelenítése",
            HIDE: "Részletek panel elrejtése",
            RESET: "Panelméret visszaállítása",
            SHOW_A11Y: "Ez a gomb vált az oldalsó panel nyitott és zárt állapota között. Az oldalsó panel jelenleg be van zárva.",
            HIDE_A11Y: "Ez a gomb vált az oldalsó panel nyitott és zárt állapota között. Az oldalsó panel jelenleg nyitva van.",
            RESET_A11Y: "Ez a gomb visszaállítja az oldalsó panelt az alapértelmezett méretre. Az oldalsó panel jelenleg ki van bontva."
         },
         VIEW_DOC: {
            NAME: "Megnyitás a dokumetummegjelenítőben",
            TOOLTIP: "Megnyitás a dokumentummegjelenítőben",
            A11Y: "Ez a gomb új böngészőablakban nyitja meg a fájlt megtekintésre."
         },
         EDIT_DOC: {
            NAME: "Szerkesztés a Docs alkalmazásban",
            TOOLTIP: "HCL Docs használata a fájl szerkesztésére",
            A11Y: "Ez a gomb új ablakban nyitja meg a fájlt szerkesztésre a Docs alkalmazásban."
         },
         EDIT_OFFICE: {
            TITLE: "Szerkesztési lehetőségek.",
            NAME: "Szerkesztés a Microsoft Office Online szolgáltatásban",
            TOOLTIP: "Microsoft Office Online használata a fájl szerkesztésére",
            A11Y: "Ez a gomb új ablakban nyitja meg a fájlt szerkesztésre a Microsoft Office Online szolgáltatásban."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Szerkesztés a Microsoft Word Online szolgáltatásban",
           TOOLTIP: "Microsoft Word Online használata a fájl szerkesztésére",
           A11Y: "Ez a gomb új ablakban nyitja meg a fájlt szerkesztésre a Microsoft Word Online szolgáltatásban."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Szerkesztés a Microsoft Excel Online szolgáltatásban",
             TOOLTIP: "Microsoft Excel Online használata a fájl szerkesztésére",
             A11Y: "Ez a gomb új ablakban nyitja meg a fájlt szerkesztésre a Microsoft Excel Online szolgáltatásban."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Szerkesztés a Microsoft PowerPoint Online szolgáltatásban",
             TOOLTIP: "Microsoft PowerPoint Online használata a fájl szerkesztésére",
             A11Y: "Ez a gomb új ablakban nyitja meg a fájlt szerkesztésre a Microsoft PowerPoint Online szolgáltatásban."
         },
         OFFICE_EDITED: {
             SUCCESS: "A fájl mentése folyamatban van."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Szerkesztés a munkaasztalon",
            DIALOG_TITLE: "Szerkesztés a munkaasztalon",
            TOOLTIP: "A dokumentum szerkesztése",
            A11Y: "Ez a gomb megnyitja a fájlt szerkesztésre helyben.",
            PROMPT: "Ez a szolgáltatás lehetővé teszi a szerkesztést a számítógépre telepített szoftverrel.",
            INSTALL: "Mielőtt továbblépne, ${startLink}telepítsen asztalifájl-összekötőket${endLink}.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Fontos:",
            REMINDER: "Ha befejezte a szerkesztést, tegyen közzé egy vázlatot a munkaasztali fájl csatolókkal.",
            SKIP_DIALOG: "Ne jelenjen meg többé ez az üzenet.",
            OK: "OK",
            CANCEL: "Mégse"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Megerősítés",
            DELETE_VERSION: "${version}. verzió törlése",
            DELETE_VERSION_AND_PRIOR: "${version}. verzió és minden korábbi verzió törlése",
            PROMPT: "A(z) ${version} verzió törlésére készül. Szeretné folytatni?",
            DELETE_PRIOR: "Töröljön minden korábbi verziót is",
            ERROR: "Hiba történt a verzió törlésekor. Próbálkozzon újra később.",
            TOOLTIP: "Törölje ezt a verziót",
            OK: "OK",
            CANCEL: "Mégse"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Hivatkozások beolvasása",
            LINK_FILE: "Hivatkozás fájlra:",
            LINK_PREVIEW: "Hivatkozás a fájl előnézetéhez:",
            LINK_DOWNLOAD: "Hivatkozás a fájl letöltéséhez:",
            TOOLTIP: "Hivatkozás fájlra",
            OK: "Bezárás"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "A verzió letöltése"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Megerősítés",
            PROMPT: "A fájl aktuális verziójának a(z) ${version} verzióra való lecserélésére készül. Szeretné folytatni?",
            ERROR: "Hiba történt a verzió visszaállításakor. Próbálkozzon újra később.",
            TOOLTIP: "Ezen verzió visszaállítása",
            CHANGE_SUMMARY: "Visszaállítva a(z) ${version}. verzióból",
            OK: "OK",
            CANCEL: "Mégse"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Megerősítés",
            REMOVE_EVERYONE: "Biztosan eltávolítja a szervezete hozzáférését ehhez a fájlhoz? Ha eltávolítja a hozzáférést, akkor eltávolítja a fájlt a mappákból és közösségekből, ezzel lehetővé téve a szervezeti szintű hozzáférést, és csak a tulajdonos és azok a felhasználók láthatják és használhatják azt, akikkel az meg van osztva.",
            REMOVE_USER: "Biztosan megszünteti a megosztást ${user} felhasználóval? Ha megszünteti a megosztást, ${user} ezt a fájlt csak mappákon keresztül érheti el, vagy ha meg van osztva mindenkivel az Ön szervezetében.",
            REMOVE_COMMUNITY: "Biztosan eltávolítja ezt a fájlt a(z) ${communityName} közösségből?",
            REMOVE_FOLDER: "Biztosan eltávolítja a fájlt a(z) ${folderName} mappából?",
            REMOVE_EVERYONE_TOOLTIP: "Szervezete hozzáférésének eltávolítása",
            REMOVE_USER_TOOLTIP: "${user} felhasználót célzó minden megosztás eltávolítása",
            REMOVE_COMMUNITY_TOOLTIP: "Eltávolítás a(z) ${communityName} közösségből",
            REMOVE_FOLDER_TOOLTIP: "Eltávolítás a(z) ${folderName} mappából",
            OK: "OK",
            CANCEL: "Mégse",
            EFSS: {
              DIALOG_TITLE: "Megerősítés",
              REMOVE_EVERYONE: "Biztosan eltávolítja a szervezete hozzáférését ehhez a fájlhoz? Ha eltávolítja a hozzáférést, akkor eltávolítja a fájlt a mappákból, ezzel lehetővé téve a szervezeti szintű hozzáférést, és csak a tulajdonos és azok a felhasználók láthatják és használhatják azt, akikkel az meg van osztva.",
              REMOVE_USER: "Biztosan megszünteti a megosztást ${user} felhasználóval? Ha megszünteti a megosztást, ${user} ezt a fájlt csak mappákon keresztül érheti el, vagy ha meg van osztva mindenkivel az Ön szervezetében.",
              REMOVE_COMMUNITY: "Biztosan eltávolítja ezt a fájlt a(z) ${communityName} közösségből?",
              REMOVE_FOLDER: "Biztosan eltávolítja a fájlt a(z) ${folderName} mappából?",
              REMOVE_EVERYONE_TOOLTIP: "Szervezete hozzáférésének eltávolítása",
              REMOVE_USER_TOOLTIP: "${user} felhasználót célzó minden megosztás eltávolítása",
              REMOVE_COMMUNITY_TOOLTIP: "Eltávolítás a(z) ${communityName} közösségből",
              REMOVE_FOLDER_TOOLTIP: "Eltávolítás a(z) ${folderName} mappából",
              OK: "OK",
              CANCEL: "Mégse",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Megjegyzés szerkesztése"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Megerősítés",
            PROMPT: "Biztosan törli ezt a megjegyzést?",
            ERROR: "Hiba történt a megjegyzés törlésekor. Próbálkozzon újra később.",
            TOOLTIP: "A megjegyzés törlése",
            OK: "OK",
            CANCEL: "Mégse"
         },
         LIKE: {
            LIKE: "A fájl kedvelése",
            UNLIKE: "A fájl kedvelésének visszavonása",
            LIKE_A11Y: "Ezzel a gombbal kedvelheti a fájlt.",
            UNLIKE_A11Y: "Ezzel a gombbal vonhatja vissza a fájl kedvelését.",
            LIKED_SUCCESS: "Ön kedvelte ezt a fájlt",
            UNLIKE_SUCCESS: "Ön visszavonta a fájl kedvelését"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Leírás szerkesztése",
            ERROR: {
               DEFAULT: "A leírást nem sikerült menteni. Próbálkozzon újra később.",
               UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt frissíthetné a leírást.",
               NOT_FOUND: "A leírást nem lehetett elmenteni, mert a fájlt törölték vagy már nincs megosztva Önnel.",
               ACCESS_DENIED: "A leírást nem lehetett elmenteni, mert a fájlt törölték vagy már nincs megosztva Önnel."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Hiba történt a fájlnév mentésekor",
               CONFLICT: "A fájlnév már létezik"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Hiba történt a fájl követésekor. Próbálkozzon újra később.",
                  UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt követhetné ezt a fájlt.",
                  NOT_FOUND: "Nem követheti a fájlt, mivel a fájl törölve lett, vagy már nincs megosztva Önnel.",
                  ACCESS_DENIED: "Nem követheti a fájlt, mivel a fájl törölve lett, vagy már nincs megosztva Önnel."
               },
               UNFOLLOW: {
                  DEFAULT: "Hiba történt a fájl követésének leállításakor. Próbálkozzon újra később.",
                  UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt leállíthatná ennek a fájlnak a követését.",
                  NOT_FOUND: "Nem szüntetheti meg a fájl követését, mivel a fájl törölve lett, vagy már nincs megosztva Önnel.",
                  ACCESS_DENIED: "Nem szüntetheti meg a fájl követését, mivel a fájl törölve lett, vagy már nincs megosztva Önnel."
               }
            },
            FOLLOW_NAME: "Követés",
            FOLLOW_TOOLTIP: "A fájl követése",
            FOLLOW_A11Y: "Ezzel a gombbal követheti a fájlt.",
            FOLLOW_SUCCESS: "Most már követi ezt a fájlt.",
            STOP_FOLLOWING_NAME: "Követés leállítása",
            STOP_FOLLOWING_TOOLTIP: "A fájl követésének leállítása",
            STOP_FOLLOWING_A11Y: "Ezzel a gombbal leállíthatja a fájl követését.",
            STOP_FOLLOWING_SUCCESS: "Már nem követi a fájlt."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Hozzáadás szinkronizáláshoz",
               TOOLTIP: "Fájl hozzáadása a szinkronizáláshoz",
               A11Y: "Ez a gomb hozzáadja a fájlt a szinkronizáláshoz.",
               SUCCESS: "Hozzáadta a fájlt a szinkronizáláshoz.",
               ERROR: {
                  DEFAULT: "Hiba történt a fájl szinkronizáláshoz való hozzáadásakor. Próbálkozzon újra később.",
                  UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt hozzáadhatná ezt a fájlt szinkronizáláshoz.",
                  NOT_FOUND: "Nem adhatja hozzá a fájlt a szinkronizáláshoz, mert a fájlt törölték, vagy már nincs megosztva Önnel.",
                  ACCESS_DENIED: "Nem adhatja hozzá a fájlt a szinkronizáláshoz, mert a fájlt törölték, vagy már nincs megosztva Önnel."
               }
            },
            STOP_SYNC: {
               NAME: "Eltávolítás szinkronizálásból",
               TOOLTIP: "Fájl eltávolítása a szinkronizálásból",
               A11Y: "Ez a gomb eltávolítja a fájlt a szinkronizálásból.",
               SUCCESS: "Eltávolította a fájlt a szinkronizálásból.",
               ERROR: {
                  DEFAULT: "Hiba történt a fájl szinkronizálásból való eltávolításakor. Próbálkozzon újra később.",
                  UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt eltávolíthatná a fájlt szinkronizálásból.",
                  NOT_FOUND: "Nem távolíthatja el a fájlt a szinkronizálásból, mert a fájlt törölték, vagy már nincs megosztva Önnel.",
                  ACCESS_DENIED: "Nem távolíthatja el a fájlt a szinkronizálásból, mert a fájlt törölték, vagy már nincs megosztva Önnel."
               }
            },
            MYDRIVE: {
                NAME: "Hozzáadás a Saját meghajtóhoz",
                TOOLTIP: "Fájl hozzáadása a Saját meghajtóhoz",
                A11Y: "Ez a gomb hozzáadja a fájlt a Saját meghajtóhoz.",
                SUCCESS: "Hozzáadta a fájlt a Saját meghajtóhoz.",
                ERROR: {
                   DEFAULT: "Hiba történt a fájl Saját meghajtóhoz való hozzáadásakor. Próbálkozzon újra később.",
                   UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt hozzáadhatná ezt a fájlt a Saját meghajtóhoz.",
                   NOT_FOUND: "Nem adhatja hozzá a fájlt a Saját meghajtóhoz, mert a fájlt törölték, vagy már nincs megosztva Önnel.",
                   ACCESS_DENIED: "Nem adhatja hozzá a fájlt a Saját meghajtóhoz, mert a fájlt törölték, vagy már nincs megosztva Önnel."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Eltávolítás a Saját meghajtóról",
                TOOLTIP: "Fájl eltávolítása a Saját meghajtóról",
                A11Y: "Ez a gomb eltávolítja a fájlt a Saját meghajtóról.",
                SUCCESS: "Eltávolította a fájlt a Saját meghajtóról.",
                ERROR: {
                   DEFAULT: "Hiba történt a fájl Saját meghajtóról való eltávolításakor. Próbálkozzon újra később.",
                   UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt eltávolíthatná ezt a fájlt a Saját meghajtóról.",
                   NOT_FOUND: "Nem távolíthatja el a fájlt a Saját meghajtóról, mert a fájlt törölték, vagy már nincs megosztva Önnel.",
                   ACCESS_DENIED: "Nem távolíthatja el a fájlt a Saját meghajtóról, mert a fájlt törölték, vagy már nincs megosztva Önnel."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Rögzítés",
            FAVORITE_TOOLTIP: "Fájl rögzítése",
            FAVORITE_A11Y: "Ez a gomb rögzíti a fájlt.",
            FAVORITE_SUCCESS: "Rögzítette a fájlt.",
            STOP_FAVORITEING_NAME: "Rögzítés feloldása",
            STOP_FAVORITEING_TOOLTIP: "Fájl rögzítésének megszüntetése",
            STOP_FAVORITEING_A11Y: "Ez a gomb megszünteti a fájl rögzítését.",
            STOP_FAVORITEING_SUCCESS: "Megszüntette a fájl rögzítését."
         },
         TRASH: {
            NAME: "Áthelyezés szemétgyűjtőbe",
            DIALOG_TITLE: "Megerősítés",
            PROMPT: "Biztosan áthelyezi a fájlt a szemétgyűjtőbe? A fájl szemétgyűjtőbe helyezésével az mindenki számára elérhetetlenné válik, akivel jelenleg meg van osztva.",
            ERROR: "Hiba történt a fájl törlésekor. Próbálkozzon újra később.",
            TOOLTIP: "Fájl törlése",
            OK: "OK",
            CANCEL: "Mégse",
            A11Y: "Ez a gomb áthelyezi a fájlt a szemétgyűjtőbe.",
            SUCCESS_MSG: "${file} át lett helyezve a szemétgyűjtőbe."
         },
         REFRESH: {
            NAME: "Frissítés",
            ERROR: "Hiba történt a fájlmegjelenítő frissítésekor. Próbálkozzon újra később.",
            TOOLTIP: "Fájlmegjelenítő frissítése",
            INFO_MSG: "Frissítsen a legfrissebb tartalmakért. ${link}",
            A11Y: "Ez a gomb áthelyezi a fájlt a szemétgyűjtőbe.",
            SUCCESS_MSG: "A tartalom sikeresen frissítve."
         },
         COPY_FILE: {
            NAME: "Másolat hozzáadása közösséghez...",
            DIALOG_TITLE: "Megerősítés",
            ERROR: "Hiba történt a fájl másolásakor. Próbálkozzon újra később.",
            TOOLTIP: "Fájl másolatának hozzáadása közösséghez",
            OK: "OK",
            CANCEL: "Mégse",
            A11Y: "Ez a gomb megnyit egy párbeszédpanelt, ahol hozzáadhatja a fájl másolatát a közösséghez.",
            SUCCESS_MSG: "A(z) ${file} át lett másolva ide: ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Tulajdonjog átadása…",
            DIALOG_TITLE: "Tulajdonjog átadása",
            TOOLTIP: "A fájl átadása új tulajdonos számára",
            A11Y: "Ez a gomb egy párbeszédpanelt nyit meg, amellyel új tulajdonosnak adhatja át ezt a fájlt.",
            EMPTY: "Üres"
         },
         UPLOAD_VERSION: {
            NAME: "Új változat feltöltése",
            NAME_SHORT: "Feltöltés",
            CHANGE_SUMMARY: "Elhagyható módosítás összegzése...",
            TOOLTIP: "A fájl új változatának feltöltése",
            A11Y: "Ez a gomb megnyit egy párbeszédpanelt, ahol feltöltheti a fájl új változatát."
         },
         LOG_IN: {
            NAME: "Bejelentkezés",
            TOOLTIP: "Jelentkezzen be fájlok és megjegyzések feltöltéséhez és megosztásához, illetve mappák létrehozásához"
         },
         LOCK: {
            NAME: "Fájl zárolása",
            TITLE: "Fájl zárolása",
            A11Y: "Fájl zárolása",
            SUCCESS: "A fájl most már zárolva van.",
            ERROR: "A fájlt nem lehetett zárolni, mert azt törölték, vagy már nincs megosztva Önnel."
         },
         UNLOCK: {
            NAME: "Fájl zárolásának feloldása",
            TITLE: "Fájl zárolásának feloldása",
            A11Y: "Fájl zárolásának feloldása",
            SUCCESS: "A fájl zárolása most már fel van oldva.",
            ERROR: "A fájl zárolását nem lehetett feloldani, mert azt törölték, vagy már nincs megosztva Önnel."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Szerkesztés a munkaasztalon",
            TITLE: "Szerkesztés a munkaasztalon",
            A11Y: "Szerkesztés a munkaasztalon"
         },
         FLAG: {
            FILE: {
               NAME: "Megjelölés nem megfelelőként",
               TITLE: "Fájl megjelölése",
               A11Y: "Fájl megjelölése nem megfelelőként",
               PROMPT: "Adja meg a fájl megjelölésének okát (nem kötelező):",
               OK: "Megjelölés",
               CANCEL: "Mégse",
               SUCCESS: "A fájl megjelölve és elküldve áttekintésre.",
               ERROR: "Hiba történt a fájl megjelölésekor, próbálkozzon újra később."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Sikerült",
               PROMPT: "A fájl megjelölve és elküldve áttekintésre.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Megjelölés nem megfelelőként",
               TITLE: "Megjegyzés megjelölése",
               A11Y: "Megjegyzés megjelölése nem megfelelőként",
               PROMPT: "Adja meg a megjegyzés megjelölésének okát (nem kötelező):",
               OK: "Megjelölés",
               CANCEL: "Mégse",
               SUCCESS: "A megjegyzés megjelölve és elküldve áttekintésre.",
               ERROR: "Hiba történt a megjegyzés megjelölésekor, próbálkozzon újra később."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Sikerült",
            PROMPT: "A módosítások ellenőrzésre való beküldése megtörtént. A fájl csak a módosítások jóváhagyása után válik elérhetővé.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Legördülő lista"
      },
      SECTION: {
         ABOUT: {
            NAME: "A fájl adatai",
            VIEW_FILE_DETAILS: "Fájl részleteinek megtekintése",
            A11Y: "A hivatkozásra kattintva bezárja a fájlmegjelenítőt, és a fájl részleteit tartalmazó oldalra ugrik."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Ehhez a fájlhoz nem érhető el előkép."
         },
         IMAGE: {
            ZOOM_IN: "Nagyítás",
            ZOOM_OUT: "Kicsinyítés",
            RESET: "Alaphelyzet",
            ZOOM_IN_A11Y: "Ez a gomb nagyítja a képet.",
            ZOOM_OUT_A11Y: "Ez a gomb kicsinyíti a képet.",
            RESET_ZOOM_A11Y: "Ez a gomb visszaállítja a nagyítási szintet.",
            UNSAFE_PREVIEW: "A fájl előnézete nem jeleníthető meg, mert nem történt meg a vírusellenőrzése."
         },
         VIEWER: {
            LOADING: "Betöltés…",
            PUBLISHING: "Közzététel...",
            NO_PUBLISHED_VERSION: "Nem áll rendelkezésre megtekintésre közzétett verzió erről a fájlról.",
            IFRAME_TITLE: "A fájl előnézete",
            AUTOPUBLISH_TIMEOUT: "A kiszolgálónak túl sokáig tart a válaszadás. Lehetséges, hogy a legújabb változtatások nem lettek közzétéve."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "A fájl előnézete nem jeleníthető meg, mert nem történt meg a vírusellenőrzése."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Legutóbb ${user} frissítette ma ekkor: ${time}",
            YESTERDAY: "Legutóbb ${user} frissítette tegnap ekkor: ${time}",
            DAY: "Legutóbb ${user} frissítette ekkor: ${EEee}, ${time}",
            MONTH: "Legutóbb ${user} frissítette ekkor: ${date_long}",
            YEAR: "Legutóbb ${user} frissítette ekkor: ${date_long}"
         },
         CREATED: {
            TODAY: "Létrehozta ${user} ma ekkor: ${time}",
            YESTERDAY: "Létrehozta ${user} tegnap ekkor: ${time}",
            DAY: "Létrehozta ${user} ekkor: ${EEee}, ${time}",
            MONTH: "Létrehozta ${user} ekkor: ${date_long}",
            YEAR: "Létrehozta ${user} ekkor: ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - ma",
            YESTERDAY: "${time} - tegnap",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Ma",
            YESTERDAY: "Tegnap",
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
         TITLE: "Megjegyzés szövegterülete",
         SHADOW_TEXT: "Megjegyzés hozzáadása...",
         CANNOT_ACCESS_CONTENT: "A következő említett személyek nem láthatják a megjegyzést, mert nem férnek hozzá a tartalomhoz:",
         ERROR: "Hiba történt annak a felhasználónak az érvényesítése során, akit említeni próbált.",
         POST: "Közzététel",
         SAVE: "Mentés",
         CANCEL: "Mégse",
         EXTERNAL_WARNING: "A megjegyzéseket a szervezetén kívüli személyek is láthatják."
      },
      EDIT_BOX: {
         SAVE: "Mentés",
         CANCEL: {
            TOOLTIP: "Mégse",
            A11Y: "Ez a gomb visszavonja a fájlnév szerkesztésének műveletét."
         },
         INVALID_CHARACTERS: "Érvénytelen karakter",
         INVALID_CHARACTERS_REMOVED: "Érvénytelen karakterek eltávolítva"
      },
      COMMENT_WIDGET: {
         EDITED: "(Szerkesztve)",
         EDITED_DATE: {
            TODAY: "Szerkesztve ma ekkor: ${time}",
            YESTERDAY: "Szerkesztve tegnap ekkor: ${time}",
            DAY: "Szerkesztve ekkor: ${EEee}, ${time}",
            MONTH: "Szerkesztve: ${date_long}",
            YEAR: "Szerkesztve: ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Mentés",
         CANCEL: "Mégse",
         USER: "Személy",
         COMMUNITY: "Közösség",
         SHARE: "Megosztás",
         SHARE_ALT: "Megosztás ezzel a személlyel",
         MEMBER_TYPE: "Tagtípus",
         PERSON_SHADOW: "Írja be a keresett személyt",
         COMMUNITY_SHADOW: "Írja be a keresett közösséget",
         PERSON_ARIA: "Írja be a keresett személyt. A Shift és Tab együttes megnyomásával válthat a személyek, közösségek és a szervezet összes tagja között.",
         COMMUNITY_ARIA: "Írja be a keresett közösséget. A Shift és Tab együttes megnyomásával válthat a személyek, közösségek és a szervezet összes tagja között.",
         PERSON_FULL_SEARCH: "A személy nem szerepel a listán? Használja a teljes keresést...",
         COMMUNITY_FULL_SEARCH: "A közösség nem szerepel a listán? Használja a teljes keresést...",
         ADD_OPTIONAL_MESSAGE: "választható üzenet hozzáadása",
         ROLE_LABEL: "Szerepkör",
         ROLE_EDIT: "Szerkesztő",
         ROLE_VIEW: "Olvasó"
      },
      FILE_STATE: {
         DOCS_FILE: "Ez egy Docs-fájl. Minden szerkesztést online kell elvégezni.",
         LOCKED_BY_YOU: {
            TODAY: "Ön által zárolva ekkor: ${time}.",
            YESTERDAY: "Ön által zárolva tegnap ekkor: ${time}.",
            DAY: "Ön által zárolva ekkor: ${date}.",
            MONTH: "Ön által zárolva ekkor: ${date}.",
            YEAR: "Ön által zárolva ekkor: ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "${user} által zárolva ekkor: ${time}.",
            YESTERDAY: "${user} által zárolva tegnap ekkor: ${time}.",
            DAY: "${user} által zárolva ekkor: ${date}.",
            MONTH: "${user} által zárolva ekkor: ${date}.",
            YEAR: "${user} által zárolva ekkor: ${date_long}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "A szöveg automatikus lerövidítése",
         COMMENT: {
            WARN_TOO_LONG: "A megjegyzés túl hosszú.",
            TRIM: "Rövidíti a megjegyzést?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "A leírás túl hosszú.",
            TRIM: "Lerövidíti a leírást?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Az üzenet túl hosszú.",
            TRIM: "Lerövidíti az üzenetet?"
         },
         TAG: {
            WARN_TOO_LONG: "A címke túl hosszú.",
            TRIM: "Lerövidíti a címkét?"
         },
         TAGS: {
            WARN_TOO_LONG: "Néhány címke túl hosszú.",
            TRIM: "Lerövidíti a címkéket?"
         },
         FILENAME: {
            WARN_TOO_LONG: "A fájlnév túl hosszú"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Ezt a fájlt online szerkeszthetik a HCL Docs termékkel rendelkező felhasználók.",
         NO_ENTITLEMENT_LINK: "Ezt a fájlt online szerkeszthetik a ${startLink}HCL Docs${endLink} termékkel rendelkező felhasználók.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Ezt a fájlt jelenleg ${users} szerkeszti a weben.",
         UNPUBLISHED_CHANGES: "Ennek a vázlatnak verzióként még közzé nem tett módosításai vannak.",
         PUBLISH_A_VERSION: "Verzió közzététele",
         PUBLISH_SUCCESS: "Sikeresen közzétette a fájl egy verzióját",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "A verziót nem lehetett közzétenni, mert a hozzáférést megtagadták.",
            NOT_FOUND: "A verziót nem lehetett közzétenni, mert a dokumentum nem található.",
            CANNOT_REACH_REPOSITORY: "A verziót nem lehetett közzétenni, mert a Docs szerver nem tud csatlakozni a fájllerakathoz.",
            QUOTA_VIOLATION: "A verziót nem lehet közzétenni, a tárhellyel kapcsolatos korlátozások miatt. A verzió közzétételéhez más fájlok eltávolításával szabadítson fel elegendő helyet.",
            CONVERSION_UNAVAILABLE: "A verziót nem lehetett közzétenni, mert a Docs átalakítási szolgáltatás nem érhető el. Próbálkozzon újra később.",
            TOO_LARGE: "A verziót nem lehetett közzétenni, mert a dokumentum túl nagy.",
            CONVERSION_TIMEOUT: "A verziót nem lehetett közzétenni, mert a Docs átalakítási szolgáltatásnak túl sokáig tart a dokumentum átalakítása. Próbálkozzon újra később.",
            SERVER_BUSY: "A verziót nem lehetett közzétenni, mert a Docs szolgáltatás elfoglalt. Próbálkozzon újra később.",
            DEFAULT: "A verziót nem lehetett közzétenni, mert a Docs szolgáltatás nem érhető el. Próbálkozzon újra később."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "A szerkesztéseinek közzététele folyamatban van. ${startLink}A változtatásai megtekintéséhez frissítse az oldalt.${endLink}",
            GENERIC: "Lehet, hogy a legújabb változtatások megtekintéséhez frissítenie kell az oldalt. ${startLink}Frissítés${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Nincsenek megjegyzések",
         MODERATED: "A megjegyzés el lett küldve ellenőrzésre, és a jóváhagyás után lesz elérhető.",
         ERROR: {
            SAVE: {
               DEFAULT: "A megjegyzés mentése nem sikerült. Próbálkozzon újra később.",
               UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt menthetné a megjegyzést.",
               NOT_FOUND: "A megjegyzést nem lehetett elmenteni, mert a fájlt törölték vagy már nincs megosztva Önnel.",
               ACCESS_DENIED: "A megjegyzést nem lehetett elmenteni, mert a fájlt törölték vagy már nincs megosztva Önnel."
            },
            DELETE: {
               DEFAULT: "A megjegyzés törlése nem sikerült. Próbálkozzon újra később.",
               UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt törölhetné a megjegyzést.",
               NOT_FOUND: "A megjegyzést nem lehetett törölni, mert a fájlt törölték vagy már nincs megosztva Önnel.",
               ACCESS_DENIED: "A megjegyzést nem lehetett törölni, mert a fájlt törölték vagy már nincs megosztva Önnel."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Mentés",
         EDIT_TAGS: "Címkék szerkesztése",
         ERROR: {
            SAVE: {
               DEFAULT: "A címke létrehozása nem sikerült. Próbálkozzon újra később."
            },
            DELETE: {
               DEFAULT: "A címke törlése nem sikerült. Próbálkozzon újra később."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "További információk...",
         READ_LESS: "Kevesebb információ..."
      },
      SHARE: {
         EVERYONE: "Mindenki a szervezetemben",
         ADD_TOOLTIP: "Mentés",
         ROLES: {
            OWNER: "Tulajdonos",
            EDIT: "Szerkesztők",
            VIEW: "Olvasók",
            FOLDER: "Megosztva mappákkal"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Tulajdonos"
            },
            EDIT: {
               ROLE: "Szerkesztés",
               ADD: "Szerkesztő hozzáadása"
            },
            VIEW: {
               ROLE: "Olvasó",
               ADD: "Olvasó hozzáadása"
            },
            FOLDER: {
               ADD: "Mappák hozzáadása",
               COMMUNITY_ADD: "Hozzáadás mappához",
               MOVE: "Áthelyezés mappába"
            },
            MULTI: {
               ADD: "Személyek vagy közösségek hozzáadása",
               ADD_PEOPLE: "Személyek hozzáadása"
            }
         },
         PUBLIC: {
            SHORT: "Mindenki a szervezetemben",
            LONG: {
               GENERIC: "Mindenki a szervezetében",
               ORG: "Mindenki a(z) ${org} szervezetben"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Ez a fájl már meg van osztva ${user} felhasználóval.",
            ERROR: "Jelenleg nem lehet megosztani ${user} felhasználóval.",
            SELF: "Nem oszthat meg saját magával."
         },
         SHARE_INFO: {
            PROMOTED: "${user} elő lett léptetve egy magasabb megosztási szerepkörbe."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Sikeresen megosztva ${user} felhasználóval"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "A fájl megosztása sikeres volt."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Nem kötelező üzenet..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Külső felhasználó létesítése",
               ACTION: "Külső felhasználó létesítése...",
               TOOLTIP: "Külső felhasználó létesítése",
               DIALOG_TITLE: "A tartalom nem lett megosztva",
               PROMPT: {
                  NO_ACCOUNT: "A következő felhasználó nem rendelkezik fiókkal, és nem lett tartalom megosztva vele.",
                  INVITE: "Hívja meg a felhasználót vendégként, hogy megoszthassa vele a tartalmat."
               },
               SUBMIT: "Folytatás a meghívással",
               CANCEL: "Mégse",
               ERROR: "Hiba történt a fiók ellátásakor. Próbálkozzon újra később.",
               SUCCESS: "Sikeres volt a felhasználói fiók létesítése."
            },
            PLURAL: {
               NAME: "Külső felhasználók létesítése",
               ACTION: "Külső felhasználók létesítése...",
               TOOLTIP: "Külső felhasználók létesítése",
               DIALOG_TITLE: "A tartalom nem lett megosztva",
               PROMPT: {
                  NO_ACCOUNT: "A következő felhasználók nem rendelkeznek fiókkal, és nem lett tartalom megosztva velük.",
                  INVITE: "Hívja meg ezeket a felhasználókat vendégként, hogy tartalmat oszthasson meg velük."
               },
               SUBMIT: "Meghívások folytatása",
               CANCEL: "Mégse",
               ERROR: "Hiba történt a fiókok ellátásakor. Próbálkozzon újra később.",
               SUCCESS: "Sikeres volt a felhasználói fiókok létesítése."
            },
            ABSTRACT: {
               NAME: "Külső felhasználók létesítése",
               ACTION: "Külső felhasználók létesítése...",
               TOOLTIP: "Külső felhasználók létesítése",
               DIALOG_TITLE: "A tartalom nem lett megosztva",
               PROMPT: {
                  NO_ACCOUNT: "Néhány felhasználó nem rendelkezik fiókkal, és nem volt tartalom megosztva velük.",
                  INVITE: "Hívja meg ezeket a felhasználókat vendégként, hogy tartalmat oszthasson meg velük."
               },
               SUBMIT: "Meghívások folytatása",
               CANCEL: "Mégse",
               ERROR: "Hiba történt a fiókok ellátásakor. Próbálkozzon újra később.",
               SUCCESS: "Sikeres volt a felhasználói fiókok létesítése."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Megosztási beállítások",
         PROPAGATION: "A fájl megosztásának engedélyezése mások számára",
         EVERYONE: "Bárki megoszthatja ezt a fájlt.",
         OWNER_ONLY: "Csak a tulajdonos oszthatja meg ezt a fájlt.",
         STOP_SHARE: "Megosztás leállítása",
         MAKE_INTERNAL: "Külső megosztás leállítása",
         MAKE_INTERNAL_SUCCESS: "Ezt a fájlt már nem lehet megosztani a szervezetén kívüli személyekkel.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Belsővé teszi?",
            PROMPT: "Ha belsővé teszi a fájlt, akkor a továbbiakban nem lehet majd megosztani a szervezetén kívüli személyekkel.  ${br}${br}" +
            "A külső személyekkel, közösségekkel és mappákkal való minden megosztás el lesz távolítva.${br}${br}A fájl belsővé tétele végleges és nem lehet visszavonni.",
            EFSS: {
               DIALOG_TITLE: "Belsővé teszi?",
               PROMPT: "Ha belsővé teszi a fájlt, akkor a továbbiakban nem lehet majd megosztani a szervezetén kívüli személyekkel. ${br}${br}" +
               "A külső személyekkel és mappákkal való minden megosztás el lesz távolítva.${br}${br}A fájl belsővé tétele végleges és nem lehet visszavonni."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Fájl megosztásának megszüntetése",
            PROMPT: "Biztosan megszünteti a fájl megosztását?",
            QUESTION_PUBLIC: "Ez a fájl már nem lesz látható a szervezete minden tagja számára, illetve nem lesz megosztva személyekkel, mappákkal vagy közösségekkel. Ez a művelet nem vonható vissza.",
            QUESTION_PUBLIC_E: "Ez a fájl már nem lesz látható a szervezete minden tagja számára, illetve nem lesz megosztva személyekkel vagy mappákkal. Ez a művelet nem vonható vissza.",
            QUESTION: "A fájl már nem lesz megosztva személyekkel vagy közösségekkel, és a saját privát mappái kivételével el lesz távolítva minden mappából. Ez a művelet nem vonható vissza.",
            QUESTION_E: "Ez a fájl már nem lesz megosztva személyekkel, és a saját privát mappái kivételével el lesz távolítva minden mappából. Ez a művelet nem vonható vissza."
         },
         MAKE_PRIVATE_SUCCESS: "Ez a fájl most már saját.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Nem sikerült leállítani a fájl megosztását. Próbálkozzon újra később."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Saját megosztások"
      },
      STREAM: {
         LOADING: "Betöltés…",
         LOAD_MORE: "További betöltés..."
      },
      ENTRY: {
         REMOVE: "Eltávolítás",
         RESTORE: "Visszaállítás",
         EDIT: "Szerkesztés",
         DELETE: "Törlés",
         OK: "OK",
         CANCEL: "Mégse",
         USER_PICTURE: "${0} képe",
         FLAG: "Megjelölés nem megfelelőként"
      },
      PANEL: {
         LOAD_ERROR: "Hiba történt a fájl metaadatainak elérésekor.",
         ABOUT: {
            TITLE: "Névjegy",
            EXPAND_BUTTON: "További információk megtekintéséhez bontsa ki ezt a gombot",
            CURRENT_VERSION_HEADER: "Jelenlegi verzió: ${versionNumber}",
            FILE_SIZE_HEADER: "Fájlméret",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - jelenlegi verzió",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - minden verzió",
            DOCS_DRAFT_UPDATED_HEADER: "Szerkesztett vázlat",
            DOCS_DRAFT_CREATED_HEADER: "Létrehozott vázlat",
            DOCS_UPDATED_HEADER: "Közzétéve",
            DOCS_CREATED_HEADER: "Létrehozva",
            UPDATED_HEADER: "Frissítve",
            CREATED_HEADER: "Létrehozva",
            LIKES_HEADER: "Kedvelések",
            LIKES_EXPAND_ICON: "Az ikon kibontásával látható, hogy ki kedvelte a fájlt",
            DOWNLOADS_HEADER: "Megtekintések",
            DOWNLOADS_HEADER_MORE: "Megtekintések (${0})",
            DOWNLOADS_EXPAND_ICON: "Az ikon kibontásával látható, hogy ki tekintette meg a fájlt",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonim módon",
            DOWNLOADS_LATEST_VERSION: "A fájl legújabb változatával rendelkezik",
            DOWNLOADS_LAST_VERSION: "Ön utoljára ennek a fájlnak a következő verzióját tekintette meg: ${0}",
            TAGS_HEADER: "Címkék",
            DESCRIPTION_HEADER: "Leírás",
            DESCRIPTION_READ_MORE: "További információk...",
            LINKS_HEADER: "Hivatkozások",
            SECURITY: "Biztonság",
            FILE_ENCRYPTED: "A fájl tartalma titkosított. A titkosított fájltartalom nem kereshető. A fájl tartalmát nem lehet megtekinteni és szerkeszteni a HCL Docs alkalmazással.",
            GET_LINKS: "Hivatkozások beolvasása...",
            ADD_DESCRIPTION: "Leírás hozzáadása",
            NO_DESCRIPTION: "Nincs leírás",
            ADD_TAGS: "Címkék hozzáadása",
            NO_TAGS: "Nincs címke"
         },
         COMMENTS: {
            TITLE: "Megjegyzések",
            TITLE_WITH_COUNT: "Megjegyzések (${0})",
            VERSION: "${0} verzió",
            FEED_LINK: "A megjegyzések hírfolyama",
            FEED_TITLE: "Ezen megjegyzések módosításainak követése a hírfolyamolvasón keresztül"
         },
         SHARING: {
            TITLE: "Megosztás",
            TITLE_WITH_COUNT: "Megosztva (${0})",
            SHARED_WITH_FOLDERS: "Megosztva mappákkal - ${count}",
            SEE_WHO_HAS_SHARED: "Ki osztotta meg",
            COMMUNITY_FILE: "Közösség tulajdonában lévő fájl nem osztható meg személyekkel vagy más közösségekkel.",
            SHARED_WITH_COMMUNITY: "Megosztva '${0}' közösség tagjaival",
            LOGIN: "Bejelentkezés",
            NO_SHARE: "A fájl még nem lett hozzáadva semmilyen mappához.",
            ONE_SHARE: "Ez a fájl 1 olyan mappában vagy közösségben van, amihez Önnek nincs hozzáférése.",
            MULTIPLE_SHARE: "Ez a fájl ${fileNumber} olyan mappában vagy közösségben található meg, amelyekhez Önnek nincs hozzáférése."
         },
         VERSIONS: {
            TITLE: "Verziók",
            TITLE_WITH_COUNT: "Változatok (${0})",
            FEED_LINK: "A verziók hírfolyama",
            FEED_TITLE: "A fájl módosításainak követése hírfolyamolvasón keresztül"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Művelet megerősítése",
         DIALOG_TITLE: "Megerősítés",
         PROMPT: "Biztosan végre kívánja hajtani ezt a műveletet?",
         ERROR: "Hiba történt a művelet végrehajtásakor. Próbálkozzon újra később.",
         TOOLTIP: "Művelet végrehajtása",
         OK: "OK",
         CANCEL: "Mégse",
         A11Y: "Ez a gomb végrehajtja az aktuális műveletet."
      },
      THUMBNAIL: {
         TITLE: "Miniatűr",
         CHANGE_LINK: "Miniatűr módosítása...",
         ERROR: "Nem sikerült menteni a miniatűrt. Próbálkozzon újra később.",
         EXT_ERROR: "Válasszon fájlt a következő támogatott kiterjesztésekkel: ${0}.",
         SUCCESS: "A miniatűr módosítva lett",
         UPLOAD: "Mentés",
         CANCEL: "Mégse"
      },
      UPLOAD_VERSION: {
         LINK: "Új változat feltöltése...",
         CHANGE_SUMMARY: "Elhagyható módosítás összegzése...",
         ERROR: "Nem sikerült menteni az új verziót. Próbálkozzon újra később.",
         SUCCESS: "Az új változat el lett mentve",
         UPLOAD: "Feltöltés",
         UPLOAD_AND_CHANGE_EXTENSION: "Feltöltés és kiterjesztés módosítása",
         CANCEL: "Mégse",
         TOO_LARGE: "A(z) ${file} nagyobb a megengedett ${size} fájlméretnél.",
         PROGRESS_BAR_TITLE: "Új verzió feltöltése folyamatban (${uploaded} / ${total} kész)",
         CANCEL_UPLOAD: "Feltöltés megszakítása"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Hiba történt a fájlhoz való hozzáféréskor. Próbálkozzon újra később.",
         UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt megtekinthetné a fájlt.",
         NOT_FOUND: "A kért fájlt törölték vagy eltávolították. Ha ezt a hivatkozást valakitől kapta, akkor ellenőrizze, hogy az helyes-e.",
         ACCESS_DENIED: "Nincs jogosultsága a fájl megtekintésére. A fájl nincs megosztva Önnel.",
         ACCESS_DENIED_ANON: "Nincs jogosultsága a fájl megtekintésére. Ha ez az Ön fájlja vagy megosztották azt Önnel, akkor előbb be kell jelentkeznie."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Hiba",
         PROMPT: "A kért fájlt törölték vagy eltávolították.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Megerősítés",
        PROMPT: "A HCL Connections-munkamenete lejárt.${lineBreaks}Az OK gombra kattintva jelentkezzen be újból, vagy a Mégse gombra kattintva zárja be ezt a párbeszédpanelt.",
        OK: "OK",
        CANCEL: "Mégse"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "A hivatkozás nem érhető el",
        PROMPT: "Valami hiba történt a hivatkozás elérésekor.${lineBreaks}Kattintson az OK gombra a lapra való átirányításhoz.",
        OK: "OK",
        CANCEL: "Mégse"
      },
      LOAD_ERROR: {
         DEFAULT: "Hoppá. Hiba történt a hivatkozás elérésekor.",
         ACCESS_DENIED: "A fájl tulajdonosától kérjen engedélyt a fájl megtekintésére."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - fájl",
         LOAD_ERROR: "Hiba történt a fájl elérésekor"
      },
      SHARE_WITH_LINK: {
         TITLE: "Megosztás hivatkozással",
         EMPTY_DESCRIPTION: "Még nem hozott létre hivatkozást erre a fájlra. A többieknek elküldendő megosztott hivatkozás létrehozása, hogy megtekinthessék és letölthessék a fájlt.",
         CREATE_LINK: "Hivatkozás létrehozása",
         COPY_LINK: "Hivatkozás másolása",
         DELETE_LINK: "Hivatkozás törlése",
         ACCESS_TYPE_1: "Bárki, aki rendelkezik a hivatkozással, megtekintheti ezt a fájlt",
         ACCESS_TYPE_2: "A saját szervezetemhez tartozó személyek tekinthetik meg ezt a fájlt",
         ACCESS_TYPE_1_DESCRIPTION: "A hivatkozással rendelkező személyek megnézhetik és letölthetik a fájlt a Connections alkalmazásba történő bejelentkezés után.",
         ACCESS_TYPE_2_DESCRIPTION: "A saját szervezetemhez tartozó, hivatkozással rendelkező személyek megnézhetik és letölthetik a fájlt a Connections alkalmazásba történő bejelentkezés után.",
         CHANGE_TYPE_SUCCESS: "A hozzáférési típus módosításakor a hivatkozás engedélye frissítésre kerül.",
         CHANGE_TYPE_ERROR: "A hozzáférési típus módosításakor a hivatkozás engedélyének frissítése nem sikerült.",
         COPY_LINK_SUCCESS: "Hivatkozás vágólapra másolva",
         CREATE_SHARELINK_SUCCESS:"A hivatkozás létrehozása sikeresen megtörtént.",
         CREATE_SHARELINK_ERROR:"Hiba miatt nem hozható létre hivatkozás.",
         DELETE_SHARELINK_SUCCESS: "A(z) „${file}” fájl megosztási hivatkozása törölve lett.",
         DELETE_SHARELINK_ERROR: "A megosztott hivatkozás nem került törlésre. Próbálkozzon újra később.",
         CONFIRM_DIALOG: {
            OK: "Törlés",
            DIALOG_TITLE: "A megosztási hivatkozás törlése",
            PROMPT: "A fájlt nem érhetik el a hivatkozással rendelkezők. Biztosan törli a megosztási hivatkozást?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "A megosztott hivatkozás aktív. Bárki, aki rendelkezik a hivatkozással, megtekintheti ezt a fájlt. Ide kattintva másolhatja ezt a hivatkozást.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "A megosztott hivatkozás aktív. A saját szervezetemhez tartozó személyek megtekinthetik ezt a fájlt. Ide kattintva másolhatja ezt a hivatkozást."
      }
});
