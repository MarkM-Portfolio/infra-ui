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
         "windowtitle" : "Globalizácia",
         "unavailable" : "Nastavenia globalizácie nie sú k dispozícii",
         "details" : "Zadajte svoj preferovaný jazyk, preferovaný kalendár a smer textu generovaného používateľom.",
         "error" : "Nastavenia globalizácie sa nezískali, pretože nastala chyba.",
         "titlebar" : {
            "tab2" : "Prístup k aplikácii",
            "tab1" : "E-mailové notifikácie",
            "tab3" : "Globalizácia"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Stlačenie tohto tlačidla obnoví aktuálnu stránku novým obsahom.  Ak sa chcete vrátiť do tejto ponuky, prejdite naspäť do:"
         },
         "details_nolanguage" : "Zadajte svoj preferovaný kalendár a smer textu generovaného používateľom.",
         "a11y" : {
            "titlebar_label" : "Nastavenia produktu HCL Connections",
            "body_label" : "Nastavenia globalizácie"
         },
         "heading" : "Nastavenia globalizácie"
      },
      "restore_defaults" : {
         "error" : "Nastala chyba. Skúste to znova neskôr.",
         "action_tooltip" : "obnoviť nastavenia globalizácie na ich pôvodné predvolené hodnoty",
         "action" : "Obnoviť predvolené nastavenia",
         "success" : "Vaše nastavenia globalizácie boli obnovené na ich pôvodné predvolené hodnoty"
      },
      "help" : {
         "help" : "Pomoc",
         "close" : "Zatvoriť"
      },
      "save" : {
         "error" : "Nastala chyba. Skúste to znova neskôr.",
         "action_tooltip" : "Uložiť nastavenia globalizácie",
         "action" : "Uložiť",
         "success" : "Vaše nastavenia globalizácie boli aktualizované"
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Obnoviť predvolené nastavenia"
         },
         "bidi" : {
            "help" : "Pomoc k voľbe Povoliť obojsmerný text",
            "label" : "Povoliť obojsmerný text",
            "tooltip" : "Umožňuje zobrazenie spojeného textu a štruktúrovaného textu, ktorý je špecifický pre jazyk, napríklad cesty k súborom.  Tiež vám umožňuje určiť smer textu nezávisle od vášho výberu jazyka."
         },
         "error" : "Chyba",
         "save" : {
            "label" : "Uložiť"
         },
         "direction" : {
            "label" : "Smer užívateľom generovaného textu:",
            "tooltip" : "Smer textu odvodený od vstupu používateľa, ako sú názvy obsahu a navigačných stôp.  Predvolene to je určené vaším výberom jazyka (vo väčšine prípadov zľava doprava).  Výber kontextuálneho nastavenia umožňuje systému určiť smer na základe analýzy znakov (podporuje text so zmiešaným smerom).",
            "options" : {
               "contextual" : "Kontextovo (založené na znakoch)",
               "rtl" : "Sprava doľava",
               "ltr" : "Zľava doprava",
               "default_ltr" : "Použiť predvolené nastavenie jazyka (zľava doprava)",
               "default_rtl" : "Použiť predvolené nastavenie jazyka (sprava doľava)"
            }
         },
         "cancel" : {
            "label" : "Zrušiť"
         },
         "language" : {
            "selected" : "${0} (aktuálne)",
            "label" : "Jazyk:",
            "tooltip" : "Zadajte jazyk, v ktorom sa zobrazí text aplikácie.  Toto nastavenia neovplyvní text generovaný používateľom."
         },
         "calendar" : {
            "label" : "Kalendár:",
            "options" : {
               "hebrew" : "Hebrejský",
               "gregorian" : "Gregoriánsky",
               "hijri" : "Hijri"
            }
         }
      }
});
