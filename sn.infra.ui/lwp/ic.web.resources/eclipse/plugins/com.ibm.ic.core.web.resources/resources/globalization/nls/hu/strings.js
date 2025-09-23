/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
define({
      "globalization" : {
         "windowtitle" : "Globalizáció",
         "unavailable" : "A globalizációs beállítások nem érhetők el",
         "details" : "Adja meg a preferált nyelvet, naptárt, és a felhasználói szöveg irányát.",
         "error" : "A globalizációs beállítások beolvasása hiba miatt nem sikerült.",
         "titlebar" : {
            "tab2" : "Alkalmazás hozzáférése",
            "tab1" : "E-mail értesítések",
            "tab3" : "Globalizáció"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "A gomb megnyomása új tartalommal frissíti az aktuális lapot.  A menühöz úgy térhet vissza, ha visszanavigál a következőhöz:"
         },
         "details_nolanguage" : "Adja meg a preferált naptárt és a felhasználói szöveg irányát.",
         "a11y" : {
            "titlebar_label" : "HCL Connections beállítások",
            "body_label" : "Globalizációs beállítások"
         },
         "heading" : "Globalizációs beállítások"
      },
      "restore_defaults" : {
         "error" : "Hiba történt. Próbálkozzon újra később.",
         "action_tooltip" : "Globalizációs beállítások visszaállítása az eredeti értékükre",
         "action" : "Alapértelmezések visszaállítása",
         "success" : "A globalizációs beállításai vissza lettek állítva az eredeti értékükre."
      },
      "help" : {
         "help" : "Súgó",
         "close" : "Bezárás"
      },
      "save" : {
         "error" : "Hiba történt. Próbálkozzon újra később.",
         "action_tooltip" : "Globálizációs beállítások mentése",
         "action" : "Mentés",
         "success" : "A globalizációs beállítások frissültek."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Hiba:",
            "icon_alt" : "Hiba"
         },
         "success" : {
            "a11y_label" : "Siker:",
            "icon_alt" : "Sikerült"
         },
         "warning" : {
            "a11y_label" : "Figyelmeztetés:",
            "icon_alt" : "Figyelmeztetés"
         },
         "info" : {
            "a11y_label" : "Információk:",
            "icon_alt" : "Információk"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Alapértelmezések visszaállítása"
         },
         "bidi" : {
            "help" : "Kétirányú szöveges súgó engedélyezése",
            "label" : "Kétirányú szöveg engedélyezése",
            "tooltip" : "Lehetővé teszi az összefűzött szöveg és strukturált szöveg, például fájlútvonalak nyelvspecifikus megjelenítését.  Lehetővé teszi a kiválasztott nyelvtől független szövegirány megadását is."
         },
         "error" : "Hiba",
         "save" : {
            "label" : "Mentés"
         },
         "direction" : {
            "label" : "Felhasználó által létrehozott szöveg iránya:",
            "tooltip" : "A felhasználói bevitelből származó szöveg, például a tartalom neveinek és a navigációs útvonalak iránya.  Alapértelmezés szerint ezt a nyelv kiválasztása határozza meg (legtöbbször balról jobbra).  A környezetfüggő lehetőség kiválasztásával a rendszer a karakterek elemzése alapján határozza meg az irányt (támogatja a kevert irányú szöveget).",
            "options" : {
               "contextual" : "Környezetfüggő (karakteralapú)",
               "rtl" : "Jobbról balra",
               "ltr" : "Balról jobbra",
               "default_ltr" : "Nyelv alapértelmezéseinek használata (balról jobbra)",
               "default_rtl" : "Nyelv alapértelmezéseinek használata (jobbról balra)"
            }
         },
         "cancel" : {
            "label" : "Mégse"
         },
         "language" : {
            "selected" : "${0} (aktuális)",
            "label" : "Nyelv:",
            "tooltip" : "Adja meg a nyelvet, amelyben az alkalmazás szövege megjelenik.  Ez a beállítás nincs hatással a felhasználó által létrehozott szövegre."
         },
         "calendar" : {
            "label" : "Naptár:",
            "options" : {
               "hebrew" : "Héber",
               "gregorian" : "Gergely naptár",
               "hijri" : "Hidzsri"
            }
         }
      }
});
