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
         "legal" : "Licenčno gradivo - lastnina IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, IBM-ov logotip, ibm.com in Lotus so blagovne znamke korporacije IBM Corporation v Združenih državah Amerike, drugih državah ali v obojih. Omejene pravice uporabnikov vlade ZDA - uporaba, razmnoževanje ali razkrivanje je omejeno s terminsko pogodbo GSA ADP z IBM Corp. Za več informacij glejte stran O programu.",
         "error" : "Prišlo je do napake. Poskusite znova pozneje.",
         "granted" : {
            "title" : "Dostop je odobren",
            "blurb" : "${0} ste odobrili dostop za komuniciranje z vašim računom za HCL Connections."
         },
         "denied" : {
            "title" : "Dostop je zavrnjen",
            "blurb" : "${0} ste zavrnili dostop za komuniciranje z vašim računom za HCL Connections."
         },
         "blurb" : "{0} zahteva dostop do informacij HCL Connections, vključno z vso vsebino v Connections.",
         "revoke" : {
            "description" : "Dostop lahko prekličete kadarkoli prek nastavitev za Connections > {0}. Connections lahko periodično prikaže poziv, da se znova prijavite.",
            "link" : "Dostop do aplikacije"
         },
         "authorize" : {
            "label" : "Odobri dostop"
         },
         "windowtitle" : "Pooblastitev dostopa do programa HCL Connections",
         "title" : "Zahteva za dostop",
         "deny" : {
            "label" : "Zavrni dostop"
         },
         "action_tooltip" : "Odobri dostop do aplikacije ${0}",
         "action" : "Odobri dostop",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Preusmerjeni boste nazaj v ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Vklopi JavaScript",
            "p2" : "Če želite nadaljevati, osvežite stran.",
            "p1" : "JavaScript je bil v vašem spletnem brskalniku onemogočen.  HCL Connections za delovanje zahteva JavaScript.  Ko ga vključite, osvežite stran."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Vaše zahteve ni mogoče obdelati.",
            "description" : "Zahteva, ki jo je izdala aplikacija, ki zahteva dostop do vašega računa HCL Connections, ni bila popolna.  V brskalniku kliknite gumb Nazaj, da se vrnete na spletno mesto ali aplikacijo, ki vas je preusmerila sem, in poskusite znova.  Če te napake ne uspete odpraviti, težavo javite skrbniku."
         },
         "invalid_token" : {
            "title" : "Vaše zahteve ni mogoče obdelati.",
            "description" : "Zahteva, ki jo je izdala aplikacija, ki zahteva dostop do vašega računa HCL Connections, ni bila veljavna.  V brskalniku kliknite gumb Nazaj, da se vrnete na spletno mesto ali aplikacijo, ki vas je preusmerila sem, in poskusite znova.  Če te napake ne uspete odpraviti, težavo javite skrbniku."
         },
         "default_action" : {
            "label" : "Nazaj na domačo stran"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Napaka:",
            "icon_alt" : "Napaka"
         },
         "success" : {
            "a11y_label" : "Uspešno:",
            "icon_alt" : "Uspeh"
         },
         "warning" : {
            "a11y_label" : "Opozorilo:",
            "icon_alt" : "Opozorilo"
         },
         "info" : {
            "a11y_label" : "Informacije:",
            "icon_alt" : "Informacije"
         }
      },
      "loading" : "Nalaganje ...",
      "deny" : {
         "error" : "Prišlo je do napake. Poskusite znova pozneje.",
         "action_tooltip" : "Zavrni dostop do aplikacije ${0}",
         "action" : "Zavrni dostop",
         "success" : "Dostop je bil zavrnjen."
      },
      "grid" : {
         "applications" : {
            "summary" : "Seznam aplikacij z dostopom do informacij programa HCL Connections.",
            "loading" : "Nalaganje ...",
            "empty" : "Aplikacij ni bilo mogoče najti.",
            "reverse_sort" : "Obratni vrstni red razvrščanja"
         }
      },
      "applications" : {
         "windowtitle" : "Dostop do aplikacije",
         "details" : "Aplikacije, ki imajo dostop do informacij programa HCL Connections.",
         "error" : "Seznam ni bil pridobljen zaradi napake.",
         "titlebar" : {
            "tab2" : "Dostop do aplikacije",
            "tab1" : "Elektronska obvestila",
            "tab3" : "Globalizacija"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Če pritisnete ta gumb, boste trenutno stran osvežili z novo vsebino.  Če se želite vrniti na ta meni, se pomaknite nazaj na:"
         },
         "a11y" : {
            "titlebar_label" : "Nastavitve za HCL Connections"
         },
         "heading" : "Dostop do aplikacije"
      },
      "sorts" : {
         "application_name" : "Ime aplikacije",
         "authorization_date" : "Datum pooblastila",
         "expiration_date" : "Datum zapadlosti",
         "action" : "Dejanje"
      },
      "revoke_token" : {
         "error" : "Prišlo je do napake. Poskusite znova pozneje.",
         "dialog_title" : "Prekliči dostop",
         "action_tooltip" : "Prekliči dostop do aplikacije ${0}",
         "action" : "Prekliči",
         "ok" : "V redu",
         "cancel" : "Prekliči",
         "confirm" : "Ali želite preklicati dostop te aplikacije do informacij programa HCL Connections? ",
         "success" : "Aplikacija je bila odstranjena."
      }
});
