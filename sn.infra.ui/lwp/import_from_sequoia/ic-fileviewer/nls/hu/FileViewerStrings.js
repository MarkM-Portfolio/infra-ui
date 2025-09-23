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
     FILE_VIEWER_TITLE: "Fájl előnézete",
     FILENAME_TOOLTIP: "Fájlnév szerkesztése",
     ICON_TOOLTIP: "Fájl letöltése",
     ERROR: "Hiba történt.",
     SHARED_EXTERNALLY: "Külsőleg megosztott",
     FILE_SYNCED: "Szinkronizáláshoz hozzáadva",
     MORE_ACTIONS: {
       TITLE: "További műveletek",
       A11Y: "Megnyitja a fájlon elvégezhető további műveletek listáját tartalmazó legördülő menüt."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "További lehetőségek",
         A11Y: "Ez a gomb további lehetőségeket tartalmazó menüt nyit meg."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Szerkesztés"
         },
         UPLOAD: {
           TITLE: "Feltöltés"
         }
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
     ACTION: {
       CLOSE: {
         TOOLTIP: "Bezárás",
         A11Y: "Ez a gomb bezárja a fájlmegjelenítőt."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Új, fájlból",
         ACTION_NAME:"Fájl létrehozása",
         A11Y: {
           TEXT: "Dokumentum (DOC, DOCX vagy ODT fájl) létrehozása  sablonfájlból. Ezeket a dokumentumokat online szerkesztheti a Docs szolgáltatásban.",
           PRES: "Bemutató (PPT, PPTX vagy ODP fájl) létrehozása sablonfájlból. Ezeket a bemutatókat online szerkesztheti a Docs szolgáltatásban. ",
           SHEET: "Számolótábla (XLS, XLSX vagy ODS fájl) létrehozása sablonfájlból. Ezeket a számolótáblákat online szerkesztheti a Docs szolgáltatásban. "
         },
         PROMPT: {
           TEXT: "Dokumentum (DOC, DOCX vagy ODT fájl) létrehozása  sablonfájlból. Ezeket a dokumentumokat online szerkesztheti a Docs szolgáltatásban.",
           PRES: "Bemutató (PPT, PPTX vagy ODP fájl) létrehozása sablonfájlból. Ezeket a bemutatókat online szerkesztheti a Docs szolgáltatásban. ",
           SHEET: "Számolótábla (XLS, XLSX vagy ODS fájl) létrehozása sablonfájlból. Ezeket a számolótáblákat online szerkesztheti a Docs szolgáltatásban. "
         },
         NAME_FIELD: "Név:",
         EXTERNAL_FIELD: "A fájlok megoszthatók a szervezeten kívüli személyekkel",
         EXTERNAL_DESC: "A külső hozzáférés lehetővé teszi fájlok, mappák és közösségek megosztását külső felhasználókkal (a szervezetén vagy vállalatán kívüli személyekkel). A külső hozzáférést a fájl feltöltésekor kell beállítania, az nem kapcsolható be később.",
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
           DUPLICATE_NAME: "Többször szereplő fájlnév található. Írjon be egy új nevet.",
           SERVER_ERROR: "A Connections kiszolgáló nem érhető el. Forduljon a kiszolgáló adminisztrátorához, és próbálkozzon újra."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Fájl letöltése",
         A11Y: "Ez a gomb letölti a fájlt."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Letöltés PDF formátumban",
         TOOLTIP: "A fájl letöltése PDF fájlként",
         A11Y: "Ez a gomb letölti a fájlt PDF formátumban.",
         SUCCESS: "Sikeresen letöltötte a fájlt PDF formátumban.",
         ERROR: {
           DEFAULT: "Nem tudta letölteni a fájlt PDF formátumban.  Próbálkozzon újra később.",
           UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Be kell jelentkeznie, hogy letölthesse a fájlt PDF formátumban.",
           NOT_FOUND: "A fájlt nem lehetett letölteni, mert a fájlt törölték vagy már nincs megosztva Önnel.",
           ACCESS_DENIED: "A fájlt nem lehetett letölteni, mert a fájlt törölték vagy már nincs megosztva Önnel."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Nincs közzétett verziója a letöltendő fájlnak.  A verziók a Docs szerkesztőből tehetők közzé."
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
             DAY: "Egy újabb, utoljára ${date} dátumon szerkesztett vázlat észlelhető.",
             MONTH: "Egy újabb, utoljára ${date} dátumon szerkesztett vázlat észlelhető.",
             YEAR: "Egy újabb, utoljára ${date_long} dátumon szerkesztett vázlat észlelhető."
           },
           PROMPT2: {
             TODAY: "Biztosan folytatni kívánja a ma ${time} időpontban közzétett verzió letöltésével?",
             YESTERDAY: "Biztosan folytatni kívánja a tegnap ${time} időpontban közzétett verzió letöltésével?",
             DAY: "Biztosan folytatni kívánja a(z) ${date} dátumon közzétett verzió letöltésével?",
             MONTH: "Biztosan folytatni kívánja a(z) ${date} dátumon közzétett verzió letöltésével?",
             YEAR: "Biztosan folytatni kívánja a(z) ${date_long} dátumon közzétett verzió letöltésével?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Részletek panel megjelenítése",
         HIDE: "Részletek panel elrejtése",
         SHOW_A11Y: "Ez a gomb megnyitja vagy bezárja az oldalsó panelt. Az oldalsó panel jelenleg be van zárva.",
         HIDE_A11Y: "Ez a gomb megnyitja vagy bezárja az oldalsó panelt. Az oldalsó panel jelenleg meg van nyitva."
       },
       VIEW_DOC: {
         NAME: "Megnyitás a dokumentummegjelenítőben",
         TOOLTIP: "Megnyitás a dokumentummegjelenítőben",
         A11Y: "Ez a gomb új böngészőablakban nyitja meg a fájlt megtekintésre."
       },
       EDIT_DOC: {
         NAME: "Szerkesztés a Docs alkalmazásban",
         TOOLTIP: "A fájl szerkesztése Docs alkalmazásban",
         A11Y: "Ez a gomb új ablakban nyitja meg a fájlt szerkesztésre a Docs alkalmazásban."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Szerkesztés a munkaasztalon",
         DIALOG_TITLE: "Szerkesztés a munkaasztalon",
         TOOLTIP: "A dokumentum szerkesztése",
         A11Y: "Ez a gomb megnyitja a fájlt szerkesztésre helyben.",
         PROMPT: "Ez a szolgáltatás lehetővé teszi a fájl helyi szerkesztését.",
         IMPORTANT: "Fontos:",
         REMINDER: "Amikor befejezte a szerkesztést, akkor közzé kell tennie egy vázlatot a munkaasztali fájl csatolók használatával. Ha a fájl nem nyílik meg, akkor szükség lehet a munkaasztali bedolgozó telepítésére.",
         SKIP_DIALOG: "Ne jelenjen meg többé ez az üzenet.",
         OK: "OK",
         CANCEL: "Mégse"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Megerősítés",
         DELETE_VERSION: "${version} verzió törlése",
         DELETE_VERSION_AND_PRIOR: "${version} verzió és minden korábbi verzió törlése",
         PROMPT: "A(z) ${version} verzió törlésére készül. Kívánja folytatni?",
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
         PROMPT: "A fájl aktuális verziójának lecserélésére készül a(z) ${version} verzióval. Kívánja folytatni?",
         ERROR: "Hiba történt a verzió visszaállításakor. Próbálkozzon újra később.",
         TOOLTIP: "Ezen verzió visszaállítása",
         CHANGE_SUMMARY: "Visszaállítva a(z) ${version} verzióból",
         OK: "OK",
         CANCEL: "Mégse"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Megerősítés",
         REMOVE_EVERYONE: "Biztosan eltávolítja a szervezete hozzáférését ehhez a fájlhoz? Ha eltávolítja a hozzáférést, akkor eltávolítja a fájlt a mappákból és közösségekből, ezzel lehetővé téve a szervezeti hozzáférést, és csak a tulajdonos és azok a felhasználók láthatják és használhatják azt, akikkel az meg van osztva.",
         REMOVE_USER: "Biztosan leállítja a megosztást ${user} felhasználóval? Ha megszünteti a megosztást, ${user} ezt a fájlt csak mappákon keresztül érheti el, vagy ha az meg van osztva mindenkivel a szervezetében.",
         REMOVE_COMMUNITY: "Biztosan eltávolítja a fájlt a(z) ${communityName} közösségből?",
         REMOVE_FOLDER: "Biztosan eltávolítja a fájlt a(z) ${folderName} mappából?",
         REMOVE_EVERYONE_TOOLTIP: "Szervezete hozzáférésének eltávolítása",
         REMOVE_USER_TOOLTIP: "Minden megosztás eltávolítása a következővel: ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Eltávolítás a(z) ${communityName} közösségből",
         REMOVE_FOLDER_TOOLTIP: "Eltávolítás a(z) ${folderName} mappából",
         OK: "OK",
         CANCEL: "Mégse"
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
           DEFAULT: "A leírást nem sikerült elmenteni. Próbálkozzon újra később.",
           UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, hogy frissíthesse a leírást.",
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
             DEFAULT: "Hiba történ a fájl követése közben. Próbálkozzon újra később.",
             UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Mielőtt követhetné a fájlt, ismét be kell jelentkeznie.",
             NOT_FOUND: "Nem követheti a fájlt, mivel a fájl törölve lett, vagy már nincs megosztva Önnel.",
             ACCESS_DENIED: "Nem követheti a fájlt, mivel a fájl törölve lett, vagy már nincs megosztva Önnel."
           },
           UNFOLLOW: {
             DEFAULT: "Hiba történ a fájl követésének megszüntetése közben. Próbálkozzon újra később.",
             UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Mielőtt megszüntethetné a fájl követését, ismét be kell jelentkeznie.",
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
             DEFAULT: "Hiba történt a fájl hozzáadásakor a szinkronizáláshoz. Próbálkozzon újra később.",
             UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, hogy hozzáadhassa a fájlt a szinkronizáláshoz.",
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
             DEFAULT: "Hiba történt a fájl eltávolításakor a szinkronizálásból. Próbálkozzon újra később.",
             UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, hogy eltávolíthassa a fájlt a szinkronizálásból.",
             NOT_FOUND: "Nem távolíthatja el a fájlt a szinkronizálásból, mert a fájlt törölték, vagy már nincs megosztva Önnel.",
             ACCESS_DENIED: "Nem távolíthatja el a fájlt a szinkronizálásból, mert a fájlt törölték, vagy már nincs megosztva Önnel."
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
         NAME: "Áthelyezés a szemétgyűjtőbe",
         DIALOG_TITLE: "Megerősítés",
         PROMPT: "Biztosan áthelyezi a fájlt a szemétgyűjtőbe? A fájl szemétgyűjtőbe helyezésével az mindenki számára elérhetetlenné válik, akivel az jelenleg meg van osztva.",
         ERROR: "Hiba történt a fájl törlésekor. Próbálkozzon újra később.",
         TOOLTIP: "Fájl törlése",
         OK: "OK",
         CANCEL: "Mégse",
         A11Y: "Ez a gomb áthelyezi a fájlt a szemétgyűjtőbe.",
         SUCCESS_MSG: "${file} át lett helyezve a szemétgyűjtőbe."
       },
       REFRESH: {
         NAME: "Frissítés",
         ERROR: "Hiba lépett fel a Fájlmegjelenítő frissítése közben. Próbálkozzon újra később.",
         TOOLTIP: "Fájlmegjelenítő frissítése",
         INFO_MSG: "Frissítsen a legfrissebb tartalmakért. ${link}",
         A11Y: "Ez a gomb áthelyezi a fájlt a szemétgyűjtőbe.",
         SUCCESS_MSG: "A tartalom sikeresen frissítve."
       },
       COPY_FILE: {
         NAME: "Másolat hozzáadása közösséghez",
         DIALOG_TITLE: "Megerősítés",
         ERROR: "Hiba történt a fájl másolásakor. Próbálkozzon újra később.",
         TOOLTIP: "Fájl másolatának hozzáadása közösséghez",
         OK: "OK",
         CANCEL: "Mégse",
         A11Y: "Ez a gomb megnyit egy párbeszédpanelt, ahol hozzáadhatja a fájl másolatát a közösséghez.",
         SUCCESS_MSG: "${file} át lett másolva a(z) ${community} közösségbe."
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
          SUCCESS: "A fájl most már zárolva van."
       },
       UNLOCK: {
          NAME: "Fájl zárolásának feloldása",
          TITLE: "Fájl zárolásának feloldása",
          A11Y: "Fájl zárolásának feloldása",
          SUCCESS: "A fájl zárolása most már fel van oldva."
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
         COMMENT: {
           NAME: "Megjelölés nem megfelelőként",
           TITLE: "Megjegyzés megjelölése",
           A11Y: "Megjegyzés megjelölése nem megfelelőként",
           PROMPT: "Adja meg a megjegyzés megjelölésének okát (elhagyható):",
           OK: "Megjelölés",
           CANCEL: "Mégse",
           SUCCESS: "A megjegyzés megjelölve és elküldve áttekintésre.",
           ERROR: "Hiba történt a megjegyzés megjelölésekor, próbálkozzon újra később."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "A fájl adatai",
       VIEW_FILE_DETAILS: "Fájl részleteinek megjelenítése",
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
       RESET: "Visszaállítás",
       ZOOM_IN_A11Y: "Ez a gomb nagyítja a képet.",
       ZOOM_OUT_A11Y: "Ez a gomb kicsinyíti a képet.",
       RESET_ZOOM_A11Y: "Ez a gomb visszaállítja a nagyítási szintet."
      },
      VIEWER: {
       LOADING: "Betöltés...",
       NO_PUBLISHED_VERSION: "Nem érhető el megtekintésre a fájl közzétett változata.",
       IFRAME_TITLE: "A fájl előnézete"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Legutóbb frissítette ${user}, ma ${time} időpontban",
       YESTERDAY: "Legutóbb frissítette ${user}, tegnap ${time} időpontban",
       DAY: "Legutóbb frissítette ${user} ekkor: ${EEee}, időpont: ${time}",
       MONTH: "Legutóbb frissítette ${user} ekkor: ${date_long}",
       YEAR: "Legutóbb frissítette ${user} ekkor: ${date_long}"
      },
      CREATED: {
       TODAY: "Létrehozta: ${user} ma a következő időpontban: ${time}",
       YESTERDAY: "Létrehozta: ${user} tegnap a következő időpontban: ${time}",
       DAY: "Létrehozta: ${user} ekkor: ${EEee}, időpont: ${time}",
       MONTH: "Létrehozta: ${user} ekkor: ${date_long}",
       YEAR: "Létrehozta: ${user} ekkor: ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - Ma",
       YESTERDAY: "${time} - Tegnap",
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
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Megjegyzés szövegterülete",
       SHADOW_TEXT: "Megjegyzés hozzáadása...",
       CANNOT_ACCESS_CONTENT: "A következő említett személyek nem láthatják a megjegyzést, mert nem férnek hozzá a tartalomhoz: ",
       ERROR: "Hiba történt a megemlíteni próbált felhasználó érvényesítésekor.",
       POST: "Elküldés",
       SAVE: "Mentés",
       CANCEL: "Mégse",
       EXTERNAL_WARNING: "A megjegyzéseket a szervezetén kívüli személyek is láthatják."
     },
     EDIT_BOX: {
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
         DAY: "Szerkesztve: ${EEee}, ${time}",
         MONTH: "Szerkesztve: ${date_long}",
         YEAR: "Szerkesztve: ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Mentés",
       CANCEL: "Mégse",
       USER: "Felhasználói",
       COMMUNITY: "Közösség",
       SHARE: "Megosztás",
       SHARE_ALT: "Megosztás ezzel a felhasználóval",
       MEMBER_TYPE: "Tagtípus",
       PERSON_SHADOW: "Írja be a keresett személyt",
       COMMUNITY_SHADOW: "Írja be a keresett közösséget",
       PERSON_FULL_SEARCH: "A személy nem szerepel a listában? Használja a teljes keresést...",
       COMMUNITY_FULL_SEARCH: "A közösség nem szerepel a listában? Használja a teljes keresést...",
       ADD_OPTIONAL_MESSAGE: "választható üzenet hozzáadása",
       ROLE_LABEL: "Szerepkör",
       ROLE_EDIT: "Szerkesztő",
       ROLE_VIEW: "Olvasó"
     },
     FILE_STATE: {
       DOCS_FILE: "Ez egy Docs fájl. Minden szerkesztést online módon kell végezni.",
       LOCKED_BY_YOU: {
         TODAY: "Ön által zárolva: ${time}.",
         YESTERDAY: "Ön által zárolva: tegnap, ${time}.",
         DAY: "Ön által zárolva: ${date}.",
         MONTH: "Ön által zárolva: ${date}.",
         YEAR: "Ön által zárolva: ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Zárolva: ${time}, zárolta: ${user}.",
         YESTERDAY: "Zárolva: tegnap, ${time}, zárolta: ${user}.",
         DAY: "Zárolva: ${date}, zárolta: ${user}.",
         MONTH: "Zárolva: ${date}, zárolta: ${user}.",
         YEAR: "Zárolva: ${date_long}, zárolta: ${user}."
       }
     },
     VALIDATION: {
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
       NO_ENTITLEMENT: "A fájl akkor érhető el online szerkesztésre, ha felhatalmazást vásárolt a Docs termékhez.",
       CURRENT_EDITORS: "Ezt a fájlt jelenleg ${users} szerkeszti a weben.",
       UNPUBLISHED_CHANGES: "Ennek a vázlatnak verzióként még közzé nem tett módosításai vannak.",
       PUBLISH_A_VERSION: "Verzió közzététele",
       PUBLISH_SUCCESS: "Sikeresen közzétette a fájl egy verzióját",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "A verziót nem lehetett közzétenni, mert a hozzáférést megtagadták.",
         NOT_FOUND: "A verziót nem lehetett közzétenni, mert a dokumentum nem található.",
         CANNOT_REACH_REPOSITORY: "A verziót nem lehetett közzétenni, mert a Docs szerver nem tud csatlakozni a fájllerakathoz.",
         QUOTA_VIOLATION: "A verziót tárterület-megszorítások miatt nem sikerült közzétenni. Más fájlok eltávolításával szabadítson fel a verzió közzétételéhez szükséges elegendő területet.",
         CONVERSION_UNAVAILABLE: "A verziót nem lehetett közzétenni, mert a Docs átalakítási szolgáltatás nem érhető el. Próbálkozzon újra később.",
         TOO_LARGE: "A verziót nem lehetett közzétenni, mert a dokumentum túl nagy.",
         CONVERSION_TIMEOUT: "A verziót nem lehetett közzétenni, mert a Docs átalakítási szolgáltatásnak túl sokáig tart a dokumentum átalakítása. Próbálkozzon újra később.",
         SERVER_BUSY: "A verziót nem lehetett közzétenni, mert a Docs szerver túlterhelt. Próbálkozzon újra később.",
         DEFAULT: "A verziót nem lehetett közzétenni, mert a Docs szolgáltatás nem érhető el. Próbálkozzon újra később."
       }
     },
     COMMENTS: {
       EMPTY: "Nincsenek megjegyzések",
       MODERATED: "A megjegyzés el lett küldve áttekintésre és a jóváhagyás után lesz elérhető.",
       ERROR: {
         SAVE: {
           DEFAULT: "A megjegyzés elmentése nem sikerült. Próbálkozzon újra később.",
           UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkezni, hogy elmenthesse a megjegyzését.",
           NOT_FOUND: "A megjegyzést nem lehetett elmenteni, mert a fájlt törölték vagy már nincs megosztva Önnel.",
           ACCESS_DENIED: "A megjegyzést nem lehetett elmenteni, mert a fájlt törölték vagy már nincs megosztva Önnel."
         },
         DELETE: {
           DEFAULT: "A megjegyzést nem lehetett törölni. Próbálkozzon újra később.",
           UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkezni, hogy törölhesse a megjegyzését.",
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
           DEFAULT: "A címkét nem lehetett létrehozni. Próbálkozzon újra később."
         },
         DELETE: {
           DEFAULT: "A címkét nem sikerült törölni. Próbálkozzon újra később."
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
	           GENERIC: "Mindenki a szervezetében.",
	           ORG: "Mindenki a(z) ${org} szervezetben."
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
            ERROR: "Hiba történt a fiók létesítésekor. Próbálkozzon újra később.",
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
	         ERROR: "Hiba történt a fiókok létesítésekor. Próbálkozzon újra később.",
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
            ERROR: "Hiba történt a fiókok létesítésekor. Próbálkozzon újra később.",
            SUCCESS: "Sikeres volt a felhasználói fiókok létesítése."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Megosztási beállítások",
         PROPAGATION: "Mások is megoszthatják a fájlt",
         EVERYONE: "Bárki megoszthatja ezt a fájlt.",
         OWNER_ONLY: "Csak a tulajdonos oszthatja meg ezt a fájlt.",
         STOP_SHARE: "Megosztás leállítása",
         MAKE_INTERNAL: "Külső megosztás leállítása",
         MAKE_INTERNAL_SUCCESS: "Ezt a fájlt már nem lehet megosztani a szervezetén kívüli személyekkel.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Belsővé teszi?",
           PROMPT: "A fájl belsővé tételével az a továbbiakban nem lesz megosztható a szervezetén kívüli személyekkel. ${br}${br}" +
             "A külső személyekkel, közösségekkel és mappákkal történő megosztások el lesznek távolítva.${br}${br}A fájl belsővé tétele végleges, és vissza nem vonható."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Fájl megosztásának megszüntetése",
           PROMPT: "Biztosan megszünteti a fájl megosztását?",
           QUESTION_PUBLIC: "Ez a fájl már nem lesz látható a szervezete minden tagja számára, vagy nem lesz megosztva személyekkel, mappákkal vagy közösségekkel. Ezt a műveletet nem lehet visszavonni.",
           QUESTION_PUBLIC_E: "Ez a fájl már nem lesz látható a szervezete minden tagja számára, vagy nem lesz megosztva személyekkel vagy mappákkal. Ezt a műveletet nem lehet visszavonni.",
           QUESTION: "A fájl már nem lesz megosztva személyekkel és közösségekkel, és a saját mappák kivételével el lesz távolítva minden mappából. Ez a művelet nem vonható vissza.",
           QUESTION_E: "Ez a fájl már nem lesz megosztva személyekkel, és a saját mappák kivételével el lesz távolítva minden mappából. Ez a művelet nem vonható vissza."
         },
         MAKE_PRIVATE_SUCCESS: "Ez a fájl most már saját.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Nem lehet megszüntetni a fájl megosztását. Próbálkozzon újra később."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Saját megosztások"
	   },
	   STREAM: {
	     LOADING: "Betöltés...",
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
	       CURRENT_VERSION_HEADER: "Jelenlegi változat: ${versionNumber}",
	       FILE_SIZE_HEADER: "Fájlméret",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - Aktuális verzió",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - Minden verzió",
	       DOCS_DRAFT_UPDATED_HEADER: "Szerkesztett vázlat",
	       DOCS_DRAFT_CREATED_HEADER: "Létrehozott vázlat",
	       DOCS_UPDATED_HEADER: "Közzétett",
	       DOCS_CREATED_HEADER: "Létrehozta",
	       UPDATED_HEADER: "Frissítve",
	       CREATED_HEADER: "Létrehozta",
	       LIKES_HEADER: "Kedvelések",
	       LIKES_EXPAND_ICON: "Az ikon kibontásával látható, hogy ki kedvelte a fájlt",
	       DOWNLOADS_HEADER: "Letöltések",
	       DOWNLOADS_HEADER_MORE: "Letöltések (${0})",
	       DOWNLOADS_EXPAND_ICON: "Az ikon kibontásával látható, hogy ki töltötte le a fájlt",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} névtelenül",
	       DOWNLOADS_LATEST_VERSION: "A fájl legújabb változatával rendelkezik",
	       DOWNLOADS_LAST_VERSION: "Utoljára ennek a fájlnak a következő változatát töltötte le: ${0}",
	       TAGS_HEADER: "Címkék",
	       DESCRIPTION_HEADER: "Leírás",
	       DESCRIPTION_READ_MORE: "További információk...",
	       LINKS_HEADER: "Hivatkozások",
	       SECURITY: "Biztonság",
	       FILE_ENCRYPTED: "A fájl tartalma titkosított. A titkosított fájltartalom nem kereshető. A fájl tartalmát nem lehet megtekinteni és szerkeszteni az HCL Docs alkalmazással.",
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
	       TITLE_WITH_COUNT: "Megosztott (${0})",
	       SHARED_WITH_FOLDERS: "Megosztva mappákkal - ${count}",
	       SEE_WHO_HAS_SHARED: "Ki osztotta meg",
           COMMUNITY_FILE: "Közösség tulajdonában lévő fájl nem osztható meg személyekkel vagy más közösségekkel.",
           SHARED_WITH_COMMUNITY: "A(z) '${0}' közösség tagjaival megosztva",
           LOGIN: "Bejelentkezés",
           NO_SHARE: "A fájl még nem lett hozzáadva semmilyen mappához.",
           ONE_SHARE: "Ez a fájl 1 olyan mappában vagy közösségben van, amihez Önnek nincs hozzáférése. ",
           MULTIPLE_SHARE: "Ez a fájl ${fileNumber} mappában vagy közösségben található, amelyekhez Önnek nincs hozzáférése."
	     },
	     VERSIONS: {
	       TITLE: "Verziók",
	       TITLE_WITH_COUNT: "Verziók (${0})",
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
       ERROR: "A miniatűrt nem lehet elmenteni. Próbálkozzon újra később.",
       EXT_ERROR: "Válasszon fájlt a következő támogatott kiterjesztések egyikével: ${0}",
       SUCCESS: "A miniatűr módosítva lett",
       UPLOAD: "Mentés",
       CANCEL: "Mégse"
     },
     UPLOAD_VERSION: {
       LINK: "Új változat feltöltése...",
       CHANGE_SUMMARY: "Elhagyható módosítás összegzése...",
       ERROR: "Az új változatot nem lehet elmenteni. Próbálkozzon újra később.",
       SUCCESS: "Az új változat el lett mentve",
       UPLOAD: "Feltöltés",
       UPLOAD_AND_CHANGE_EXTENSION: "Feltöltés és kiterjesztés módosítása",
       CANCEL: "Mégse"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Hiba történt a fájl elérésekor. Próbálkozzon újra később.",
       UNAUTHENTICATED: "A munkamenete túllépte az időkorlátot. Újból be kell jelentkeznie, mielőtt megtekinthetné a fájlt.",
       NOT_FOUND: "A kért fájlt törölték vagy eltávolították. Ha ezt a hivatkozást valakitől kapta, akkor ellenőrizze, hogy az helyes-e.",
       ACCESS_DENIED: "Nincs jogosultsága a fájl megtekintésére. A fájl nincs megosztva Önnel.",
       ACCESS_DENIED_ANON: "Nincs jogosultsága a fájl megtekintésére. Ha ez az Ön fájlja vagy megosztották azt Önnel, akkor előbb be kell jelentkeznie."
     },
     LOAD_ERROR: {
       DEFAULT: "Hoppá! Hiba történt a hivatkozás elérésekor.",
       ACCESS_DENIED: "A fájl tulajdonosától kérjen engedélyt a fájl megtekintésére. "
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Fájl",
       LOAD_ERROR: "Hiba történt a fájl elérésekor"
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
