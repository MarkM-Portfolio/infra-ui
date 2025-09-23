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
         "windowtitle" : "Globalizace",
         "unavailable" : "Nastavení globalizace nejsou dostupná",
         "details" : "Zadejte svůj preferovaný jazyk, preferovaný kalendář a směr toku uživatelsky definovaných textů.",
         "error" : "Nastavení globalizace nebyla načtena kvůli chybě.",
         "titlebar" : {
            "tab2" : "Přístup k aplikaci",
            "tab1" : "E-mailová oznámení",
            "tab3" : "Globalizace"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Po stisknutí tohoto tlačítka bude aktuální stránka aktualizována s použitím nového obsahu. Chcete-li se vrátit do této nabídky, přejděte zpět do umístění:"
         },
         "details_nolanguage" : "Zadejte svůj preferovaný kalendář a směr toku uživatelsky definovaných textů.",
         "a11y" : {
            "titlebar_label" : "Nastavení produktu HCL Connections",
            "body_label" : "Nastavení globalizace"
         },
         "heading" : "Nastavení globalizace"
      },
      "restore_defaults" : {
         "error" : "Došlo k chybě. Zopakujte akci později.",
         "action_tooltip" : "Obnovit nastavení globalizace na výchozí hodnoty.",
         "action" : "Obnovit výchozí nastavení",
         "success" : "Vaše nastavení globalizace bylo obnoveno na výchozí hodnoty."
      },
      "help" : {
         "help" : "Nápověda",
         "close" : "Zavřít"
      },
      "save" : {
         "error" : "Došlo k chybě. Zopakujte akci později.",
         "action_tooltip" : "Uložit nastavení globalizace",
         "action" : "Uložit",
         "success" : "Vaše nastavení globalizace bylo aktualizováno."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Obnovit výchozí nastavení"
         },
         "bidi" : {
            "help" : "Povolit obousměrný text - nápověda",
            "label" : "Povolit obousměrný text",
            "tooltip" : "Umožňuje specifické zobrazení zřetězeného a strukturovaného textu v závislosti na jazyku, například pro cesty k souborům. Dále umožňuje určit směr textu nezávisle na vybraném jazyku."
         },
         "error" : "Chyba",
         "save" : {
            "label" : "Uložit"
         },
         "direction" : {
            "label" : "Směr textu generovaného uživatelem:",
            "tooltip" : "Směr textu odvozený ze zadání uživatele, jako jsou například názvy obsahu a navigační cesty. Standardně je toto nastavení určeno podle vašeho výběru jazyka (pro většinu jazyků zleva doprava). Kontextový výběr umožňuje systému určit směr textu na základě analýzy znaků (podporuje texty obsahující části s různými směry čtení).",
            "options" : {
               "contextual" : "Kontextově (na základě znaků)",
               "rtl" : "Zprava doleva",
               "ltr" : "Zleva doprava",
               "default_ltr" : "Použít výchozí nastavení jazyka (zleva doprava)",
               "default_rtl" : "Použít výchozí nastavení jazyka (zprava doleva)"
            }
         },
         "cancel" : {
            "label" : "Storno"
         },
         "language" : {
            "selected" : "${0} (aktuální)",
            "label" : "Jazyk:",
            "tooltip" : "Určete jazyk, ve kterém budou zobrazovány texty aplikace. Toto nastavení nebude mít vliv na uživatelsky generované texty."
         },
         "calendar" : {
            "label" : "Kalendář:",
            "options" : {
               "hebrew" : "Židovský",
               "gregorian" : "Gregoriánský",
               "hijri" : "Hidžra"
            }
         }
      }
});
