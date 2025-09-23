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
         "legal" : "Licencované materiály - vlastnictví IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, logo IBM, ibm.com a Lotus jsou ochranné známky společnosti IBM Corporation ve Spojených státech a případně v dalších jiných zemích. U.S. Government Users Restricted Rights: Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp. Další informace naleznete na stránce Informace.",
         "error" : "Došlo k chybě. Zopakujte akci později.",
         "granted" : {
            "title" : "Přístup byl udělen",
            "blurb" : "Udělili jste aplikaci ${0} přístup k vašemu účtu produktu HCL Connections."
         },
         "denied" : {
            "title" : "Přístup odmítnut",
            "blurb" : "Odepřeli jste aplikaci ${0} přístup k vašemu účtu produktu HCL Connections."
         },
         "blurb" : "Služba {0} požaduje přístup k vašim informacím v produktu HCL Connections včetně veškerého vašeho obsahu v produktu Connections.",
         "revoke" : {
            "description" : "Přístup můžete kdykoli zrušit prostřednictvím volby Nastavení produktu Connections > {0}. Produkt Connections vás může pravidelně žádat o opětnou autorizaci.",
            "link" : "Přístup k aplikaci"
         },
         "authorize" : {
            "label" : "Udělit přístup"
         },
         "windowtitle" : "Autorizovat přístup k produktu HCL Connections",
         "title" : "Požadavek na přístup",
         "deny" : {
            "label" : "Odepřít přístup"
         },
         "action_tooltip" : "Udělit přístup aplikace ${0}",
         "action" : "Udělit přístup",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Probíhá přesměrování zpět na ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Zapnout skript JavaScript",
            "p2" : "Chcete-li pokračovat, obnovte obsah stránky.",
            "p1" : "Ve webovém prohlížeči byl zakázán skript JavaScript. Produkt HCL Connections vyžaduje skript Javascript pro správnou činnost. Po jeho zapnutí obnovte obsah stránky."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Požadavek nebylo možné zpracovat",
            "description" : "Požadavek aplikace, která žádala o přístup k vašemu účtu produktu HCL Connections, byl neúplný. Klepnutím na tlačítko prohlížeče se vraťte na web nebo do aplikace, které vás sem přesměrovaly, a pokus zopakujte. Pokud chyba přetrvává, ohlaste problém administrátorovi."
         },
         "invalid_token" : {
            "title" : "Požadavek nebylo možné zpracovat",
            "description" : "Požadavek aplikace, která žádala o přístup k vašemu účtu produktu HCL Connections, byl neplatný. Klepnutím na tlačítko prohlížeče se vraťte na web nebo do aplikace, které vás sem přesměrovaly, a pokus zopakujte. Pokud chyba přetrvává, ohlaste problém administrátorovi."
         },
         "default_action" : {
            "label" : "Zpět na domovskou stránku"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Chyba:",
            "icon_alt" : "Chyba"
         },
         "success" : {
            "a11y_label" : "Úspěch:",
            "icon_alt" : "Úspěch"
         },
         "warning" : {
            "a11y_label" : "Varování:",
            "icon_alt" : "Varování"
         },
         "info" : {
            "a11y_label" : "Informace:",
            "icon_alt" : "Informace"
         }
      },
      "loading" : "Načítání...",
      "deny" : {
         "error" : "Došlo k chybě. Zopakujte akci později.",
         "action_tooltip" : "Odepřít přístup aplikace ${0}",
         "action" : "Odepřít přístup",
         "success" : "Přístup byl odepřen."
      },
      "grid" : {
         "applications" : {
            "summary" : "Seznam aplikací s přístupem k vašim informacím produktu HCL Connections",
            "loading" : "Načítání...",
            "empty" : "Nebyly nalezeny žádné aplikace.",
            "reverse_sort" : "Opačné řazení"
         }
      },
      "applications" : {
         "windowtitle" : "Přístup k aplikaci",
         "details" : "Aplikace s přístupem k vašim informacím produktu HCL Connections",
         "error" : "Vzhledem k chybě nebyl seznam načten.",
         "titlebar" : {
            "tab2" : "Přístup k aplikaci",
            "tab1" : "E-mailová oznámení",
            "tab3" : "Globalizace"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Po stisknutí tohoto tlačítka bude aktuální stránka aktualizována s použitím nového obsahu. Chcete-li se vrátit do této nabídky, přejděte zpět do umístění:"
         },
         "a11y" : {
            "titlebar_label" : "Nastavení produktu HCL Connections"
         },
         "heading" : "Přístup k aplikaci"
      },
      "sorts" : {
         "application_name" : "Název aplikace",
         "authorization_date" : "Datum autorizace",
         "expiration_date" : "Datum vypršení platnosti",
         "action" : "Akce"
      },
      "revoke_token" : {
         "error" : "Došlo k chybě. Zopakujte akci později.",
         "dialog_title" : "Zrušit přístup",
         "action_tooltip" : "Zrušit přístup aplikace ${0}",
         "action" : "Zrušit přístup",
         "ok" : "OK",
         "cancel" : "Storno",
         "confirm" : "Chcete zrušit přístup této aplikace k vašim informacím produktu HCL Connections? ",
         "success" : "Aplikace byla odebrána."
      }
});
