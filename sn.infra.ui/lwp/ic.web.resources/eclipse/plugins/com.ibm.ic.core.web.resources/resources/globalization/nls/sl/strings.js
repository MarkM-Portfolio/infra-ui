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
         "windowtitle" : "Globalizacija",
         "unavailable" : "Nastavitve globalizacije niso na voljo.",
         "details" : "Podajte izbrani jezik, želeni koledar in smer, v katero teče uporabniško generirano besedilo.",
         "error" : "Nastavitve globalizacije niso bile pridobljene zaradi napake.",
         "titlebar" : {
            "tab2" : "Dostop do aplikacije",
            "tab1" : "Elektronska obvestila",
            "tab3" : "Globalizacija"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Če pritisnete ta gumb, boste trenutno stran osvežili z novo vsebino.  Če se želite vrniti na ta meni, se pomaknite nazaj na:"
         },
         "details_nolanguage" : "Podajte želeni koledar in smer, v katero teče uporabniško generirano besedilo.",
         "a11y" : {
            "titlebar_label" : "Nastavitve za HCL Connections",
            "body_label" : "Nastavitve globalizacije"
         },
         "heading" : "Nastavitve globalizacije"
      },
      "restore_defaults" : {
         "error" : "Prišlo je do napake. Poskusite znova pozneje.",
         "action_tooltip" : "Obnovi nastavitve globalizacije v izvirne privzete vrednosti",
         "action" : "Obnovi privzeto",
         "success" : "Vaše nastavitve globalizacije so bile obnovljene v izvirne privzete vrednosti."
      },
      "help" : {
         "help" : "Pomoč",
         "close" : "Zapri"
      },
      "save" : {
         "error" : "Prišlo je do napake. Poskusite znova pozneje.",
         "action_tooltip" : "Shrani nastavitve globalizacije",
         "action" : "Shrani",
         "success" : "Vaše nastavitve globalizacije so posodobljene."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Obnovi privzeto"
         },
         "bidi" : {
            "help" : "Omogoči pomoč za dvosmerno besedilo",
            "label" : "Omogoči dvosmerno besedilo",
            "tooltip" : "Dovoli za jezik specifičen prikaz verižnega in strukturiranega besedila, kot so poti datotek.  Dovoli tudi, da podate smer besedila ne glede na izbiro jezika."
         },
         "error" : "Napaka",
         "save" : {
            "label" : "Shrani"
         },
         "direction" : {
            "label" : "Smer uporabniško generiranega besedila:",
            "tooltip" : "Smer besedila, izpeljanega iz vhodnih podatkov uporabnika, kot so imena vsebine in navigacijske sledi drobtinic.  Privzeto je to določeno z izbiro jezika (v večini primerov od leve proti desni).  Če izberete kontekstualno možnost, lahko sistem določi smer na podlagi analize znakov (podpira besedilo mešane smeri).",
            "options" : {
               "contextual" : "Kontekstualno (na podlagi znakov)",
               "rtl" : "Od desne proti levi",
               "ltr" : "Od leve proti desni",
               "default_ltr" : "Uporabi jezikovni privzetek (od leve proti desni)",
               "default_rtl" : "Uporabi jezikovni privzetek (od desne proti levi)"
            }
         },
         "cancel" : {
            "label" : "Prekliči"
         },
         "language" : {
            "selected" : "${0} (trenutno)",
            "label" : "Jezik:",
            "tooltip" : "Podajte jezik, v katerem bo prikazano besedilo aplikacij.  Ta nastavitev ne vpliva na uporabniško generirano besedilo."
         },
         "calendar" : {
            "label" : "Koledar:",
            "options" : {
               "hebrew" : "Hebrejski",
               "gregorian" : "Gregorijanski",
               "hijri" : "Hijri"
            }
         }
      }
});
