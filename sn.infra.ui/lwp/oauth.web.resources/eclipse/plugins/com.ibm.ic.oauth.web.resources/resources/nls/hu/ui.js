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
      "authorize" : {
         "legal" : "Engedélyköteles anyagok - Az IBM Corp tulajdona. 5724-S68 \xa9 IBM Corporation 2007, 2012. Az IBM, az IBM embléma, az ibm.com és a Lotus az IBM Corporation védjegyei az Egyesült Államokban és/vagy más országokban. Az Egyesült Államok kormányzati felhasználóinak korlátozott jogai: A használatot, másolást és közzétételt az IBM Corporationnel kötött GSA ADP Schedule Contract szabályozza. További információkért lásd a Névjegy oldalt.",
         "error" : "Hiba történt. Próbálkozzon újra később.",
         "granted" : {
            "title" : "Hozzáférés megadva",
            "blurb" : "Engedélyezte ${0} számára, hogy használja az HCL Connections fiókját."
         },
         "denied" : {
            "title" : "Hozzáférés megtagadva",
            "blurb" : "Megtagadta ${0} számára, hogy használja az HCL Connections fiókját."
         },
         "blurb" : "{0} hozzáférést kér az HCL Connections információihoz, a Connections programban lévő minden tartalmat beleértve.",
         "revoke" : {
            "description" : "A hozzáférést bármikor visszavonhatja a Connections beállítások > {0} menüponttal. A Connections időnként kérheti a jogosultság ismételt megadását.",
            "link" : "Alkalmazás hozzáférése"
         },
         "authorize" : {
            "label" : "Hozzáférés megadása"
         },
         "windowtitle" : "HCL Connections hozzáférésének engedélyezése",
         "title" : "Hozzáférési kérés",
         "deny" : {
            "label" : "Hozzáférés megtagadása"
         },
         "action_tooltip" : "A(z) ${0} alkalmazás hozzáférésének megadása",
         "action" : "Hozzáférés megadása",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Átirányítás a(z) ${0} alkalmazáshoz."
      },
      "javascript" : {
         "disabled" : {
            "title" : "JavaScript bekapcsolása",
            "p2" : "A folytatáshoz frissítse az oldalt.",
            "p1" : "A JavaScript le van tiltva a böngészőben.  Az HCL Connections alkalmazás működéséhez JavaScript szükséges.  Amint bekapcsolta azt, frissítse az oldalt."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Nem tudjuk feldolgozni a kérését",
            "description" : "Az HCL Connections fiókhoz hozzáférést kérő alkalmazás által kiadott kérés hiányos volt.  A böngésző Vissza gombjára kattintva térjen vissza az oldalra vagy alkalmazásra, amely ide irányította, és próbálkozzon újra.  Ha a hiba továbbra is fennáll, akkor jelentse a problémát az adminisztrátor számára."
         },
         "invalid_token" : {
            "title" : "Nem tudjuk feldolgozni a kérését",
            "description" : "Az HCL Connections fiókhoz hozzáférést kérő alkalmazás által kiadott kérés érvénytelen volt.  A böngésző Vissza gombjára kattintva térjen vissza az oldalra vagy alkalmazásra, amely ide irányította, és próbálkozzon újra.  Ha a hiba továbbra is fennáll, akkor jelentse a problémát az adminisztrátor számára."
         },
         "default_action" : {
            "label" : "Vissza a kezdőlapra"
         }
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
      "loading" : "Betöltés...",
      "deny" : {
         "error" : "Hiba történt. Próbálkozzon újra később.",
         "action_tooltip" : "A(z) ${0} alkalmazás hozzáférésének elutasítása",
         "action" : "Hozzáférés megtagadása",
         "success" : "Hozzáférés megtagadva."
      },
      "grid" : {
         "applications" : {
            "summary" : "Az HCL Connections információihoz hozzáférő alkalmazások listája.",
            "loading" : "Betöltés...",
            "empty" : "Nem található alkalmazás.",
            "reverse_sort" : "Fordított rendezés"
         }
      },
      "applications" : {
         "windowtitle" : "Alkalmazás hozzáférése",
         "details" : "Az HCL Connections információihoz hozzáférő alkalmazások.",
         "error" : "A lista betöltése hiba miatt nem sikerült.",
         "titlebar" : {
            "tab2" : "Alkalmazás hozzáférése",
            "tab1" : "E-mail értesítések",
            "tab3" : "Globalizáció"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "A gombra kattintás az aktuális oldalt az új tartalommal frissíti.  A menühöz úgy térhet vissza, ha visszanavigál a következőhöz:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections beállítások"
         },
         "heading" : "Alkalmazás hozzáférése"
      },
      "sorts" : {
         "application_name" : "Alkalmazás neve",
         "authorization_date" : "Felhatalmazás dátuma",
         "expiration_date" : "Lejárat dátuma",
         "action" : "Művelet"
      },
      "revoke_token" : {
         "error" : "Hiba történt. Próbálkozzon újra később.",
         "dialog_title" : "Hozzáférés visszavonása",
         "action_tooltip" : "A(z) ${0} alkalmazás hozzáférésének visszavonása",
         "action" : "Visszavonás",
         "ok" : "OK",
         "cancel" : "Mégse",
         "confirm" : "Visszavonja az alkalmazás hozzáférését az HCL Connections információihoz? ",
         "success" : "Az alkalmazás el lett távolítva."
      }
});
