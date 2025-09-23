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
         "legal" : "Licenčné materiály, vlastníctvo spoločnosti IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2015. IBM, logo IBM, ibm.com a Lotus sú ochranné známky spoločnosti IBM Corporation v USA alebo iných krajinách. Obmedzené práva užívateľov v štátnej správe USA: používanie, kopírovanie alebo zverejňovanie je obmedzené zmluvou GSA ADP Schedule Contract so spoločnosťou IBM Corp. Viac informácií nájdete na stránke Informácie o produkte.",
         "error" : "Nastala chyba. Skúste to znova neskôr.",
         "granted" : {
            "title" : "Prístup udelený",
            "blurb" : "Udelili ste prístup ${0} na interakciu s vaším kontom HCL Connections."
         },
         "denied" : {
            "title" : "Zakázaný prístup",
            "blurb" : "Zakázali ste prístup ${0} na interakciu s vaším kontom HCL Connections."
         },
         "blurb" : "{0} žiada prístup k vašim informáciám v HCL Connections vrátane všetkého vášho obsahu v Connections.",
         "revoke" : {
            "description" : "Prístup môžete kedykoľvek zrušiť cez Nastavenia Connections > {0}. Produkt Connections vás môže pravidelne žiadať o opakovanú autorizáciu.",
            "link" : "Prístup k aplikácii"
         },
         "authorize" : {
            "label" : "Udeliť prístup"
         },
         "windowtitle" : "Autorizovať prístup k produktu HCL Connections",
         "title" : "Požiadavka na prístup",
         "deny" : {
            "label" : "Zakázať prístup"
         },
         "action_tooltip" : "Udeliť prístup aplikácii ${0}",
         "action" : "Udeliť prístup",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Budete presmerovaný späť do ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Zapnúť JavaScript",
            "p2" : "Obnovte stránku, aby ste pokračovali.",
            "p1" : "Vo vašom webovom prehliadači je zakázaný jazyk JavaScript.  Produkt HCL Connections vyžaduje na fungovanie jazyk JavaScript.  Keď to zapnete, obnovte stránku."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Nemôžeme spracovať vašu požiadavku",
            "description" : "Požiadavka, ktorú vydala aplikácia žiadajúca prístup k vášmu kontu HCL Connections, bola neúplná.  Kliknite na tlačidlo späť v prehliadači, aby ste sa vrátili do lokality alebo aplikácie, ktorá vás sem poslala, a skúste to znova.  Ak táto chyba pretrváva, nahláste problém svojmu administrátorovi."
         },
         "invalid_token" : {
            "title" : "Nemôžeme spracovať vašu požiadavku",
            "description" : "Požiadavka, ktorú vydala aplikácia žiadajúca prístup k vášmu kontu HCL Connections, bola neplatná.  Kliknite na tlačidlo späť v prehliadači, aby ste sa vrátili do lokality alebo aplikácie, ktorá vás sem poslala, a skúste to znova.  Ak táto chyba pretrváva, nahláste problém svojmu administrátorovi."
         },
         "default_action" : {
            "label" : "Vrátiť sa do aplikácie Domovská stránka"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Chyba:",
            "icon_alt" : "Chyba"
         },
         "success" : {
            "a11y_label" : "Úspech:",
            "icon_alt" : "Úspech"
         },
         "warning" : {
            "a11y_label" : "Varovanie:",
            "icon_alt" : "Upozornenie"
         },
         "info" : {
            "a11y_label" : "Informácie:",
            "icon_alt" : "Informácie"
         }
      },
      "loading" : "Načítava sa...",
      "deny" : {
         "error" : "Nastala chyba. Skúste to znova neskôr.",
         "action_tooltip" : "Zakázať prístup k aplikácii ${0}",
         "action" : "Zakázať prístup",
         "success" : "Prístup bol zakázaný."
      },
      "grid" : {
         "applications" : {
            "summary" : "Zoznam aplikácií s prístupom k vašim informáciám v produkte HCL Connections.",
            "loading" : "Načítava sa...",
            "empty" : "Nenašli sa žiadne aplikácie.",
            "reverse_sort" : "Otočiť zoradenie"
         }
      },
      "applications" : {
         "windowtitle" : "Prístup k aplikácii",
         "details" : "Aplikácie s prístupom k vašim informáciám v produkte HCL Connections.",
         "error" : "Zoznam sa nezískal, pretože nastala chyba.",
         "titlebar" : {
            "tab2" : "Prístup k aplikácii",
            "tab1" : "E-mailové notifikácie",
            "tab3" : "Globalizácia"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Stlačenie tohto tlačidla obnoví aktuálnu stránku novým obsahom.  Ak sa chcete vrátiť do tejto ponuky, prejdite naspäť do:"
         },
         "a11y" : {
            "titlebar_label" : "Nastavenia produktu HCL Connections"
         },
         "heading" : "Prístup k aplikácii"
      },
      "sorts" : {
         "application_name" : "Názov aplikácie",
         "authorization_date" : "Dátum autorizácie",
         "expiration_date" : "Dátum skončenia platnosti",
         "action" : "Akcia"
      },
      "revoke_token" : {
         "error" : "Nastala chyba. Skúste to znova neskôr.",
         "dialog_title" : "Zrušiť prístup",
         "action_tooltip" : "Zrušiť prístup aplikácie ${0}",
         "action" : "Zrušiť",
         "ok" : "OK",
         "cancel" : "Zrušiť",
         "confirm" : "Chcete zrušiť prístup tejto aplikácie k vašim informáciám v produkte HCL Connections? ",
         "success" : "Aplikácia bola odstránená."
      }
});
