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
         "windowtitle" : "Globalisering",
         "unavailable" : "Indstillinger for globalisering er ikke tilgængelige",
         "details" : "Angiv foretrukket sprog, hvilken kalender du foretrækker, og retningen i det brugergenererede tekstforløb.",
         "error" : "Indstillinger for globalisering er ikke hentet på grund af en fejl.",
         "titlebar" : {
            "tab2" : "Applikationsadgang",
            "tab1" : "E-mailnotifikationer",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Et tryk på denne knap opfrisker den aktuelle side med nyt indhold. Du kan returnere til denne menu ved at navigere tilbage til:"
         },
         "details_nolanguage" : "Angiv, hvilken kalender du foretrækker, og retningen i det brugergenererede tekstforløb.",
         "a11y" : {
            "titlebar_label" : "HCL Connections-indstillinger",
            "body_label" : "Indstillinger for globalisering"
         },
         "heading" : "Indstillinger for globalisering"
      },
      "restore_defaults" : {
         "error" : "Der er opstået en fejl. Prøv igen senere.",
         "action_tooltip" : "Gendan indstillinger for globalisering til deres originale standardværdier",
         "action" : "Gendan standardværdier",
         "success" : "Dine indstillinger for globalisering er gendannet til deres originale standardværdier."
      },
      "help" : {
         "help" : "Hjælp",
         "close" : "Luk"
      },
      "save" : {
         "error" : "Der er opstået en fejl. Prøv igen senere.",
         "action_tooltip" : "Gem indstillinger for globalisering",
         "action" : "Gem",
         "success" : "Dine indstillinger for globalisering er opdateret."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Fejl:",
            "icon_alt" : "Fejl"
         },
         "success" : {
            "a11y_label" : "Udført:",
            "icon_alt" : "Udført"
         },
         "warning" : {
            "a11y_label" : "Advarsel:",
            "icon_alt" : "Advarsel"
         },
         "info" : {
            "a11y_label" : "Information:",
            "icon_alt" : "Information"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Gendan standardværdier"
         },
         "bidi" : {
            "help" : "Hjælp til Aktivér tovejstekst",
            "label" : "Aktivér tovejstekst",
            "tooltip" : "Tillader sprogspecifik visning af sammenkædet tekst og struktureret tekst, f.eks. filstier. Gør det også muligt at angive en tekstretning uafhængig af dit sprogvalg."
         },
         "error" : "Fejl",
         "save" : {
            "label" : "Gem"
         },
         "direction" : {
            "label" : "Retning af brugergenereret tekst:",
            "tooltip" : "Retningen af teksten udledes af brugerinput, f.eks. indholdsnavne og navigationsbrødkrummer. Som standard bestemmes dette af dit sprogvalg (primært venstre mod højre). Hvis der vælges kontekstafhængig, bestemmer systemet retningen på basis af tegnanalyse (blandet tekst i flere retninger understøttes).",
            "options" : {
               "contextual" : "Kontekstafhængig (tegnbaseret)",
               "rtl" : "Højre mod venstre",
               "ltr" : "Venstre mod højre",
               "default_ltr" : "Brug sprogstandard (venstre mod højre)",
               "default_rtl" : "Brug sprogstandard (højre mod venstre)"
            }
         },
         "cancel" : {
            "label" : "Annullér"
         },
         "language" : {
            "selected" : "${0} (aktuel)",
            "label" : "Sprog:",
            "tooltip" : "Angiv det sprog, som applikationsteksten bliver vist i. Indstillingen påvirker ikke den brugergenererede tekst."
         },
         "calendar" : {
            "label" : "Kalender:",
            "options" : {
               "hebrew" : "Hebraisk",
               "gregorian" : "Gregoriansk",
               "hijri" : "Hijri"
            }
         }
      }
});
