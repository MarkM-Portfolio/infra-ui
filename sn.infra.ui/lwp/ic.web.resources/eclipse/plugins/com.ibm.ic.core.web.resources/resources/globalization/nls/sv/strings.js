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
         "unavailable" : "Globaliseringsinställningarna är inte tillgängliga",
         "details" : "Ange föredraget språk, föredragen kalender och föredragen riktning för användargenererade textflöden.",
         "error" : "Det uppstod ett fel. Det gick inte att hämta globaliseringsinställningarna.",
         "titlebar" : {
            "tab2" : "Applikationsåtkomst",
            "tab1" : "Mejlaviseringar",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Om du trycker på den här knappen uppdateras sidan med det nya innehållet. Återgå till den här menyn genom att gå tillbaka till:"
         },
         "details_nolanguage" : "Ange föredragen kalender och föredragen riktning för användargenererade textflöden.",
         "a11y" : {
            "titlebar_label" : "HCL Connections-inställningar",
            "body_label" : "Globaliseringsinställningar"
         },
         "heading" : "Globaliseringsinställningar"
      },
      "restore_defaults" : {
         "error" : "Det uppstod ett fel. Försök igen senare.",
         "action_tooltip" : "Återställ globaliseringsinställningarna till standardvärdena",
         "action" : "Återställ standardvärden",
         "success" : "Globaliseringsinställningarna har återställts till standardvärdena."
      },
      "help" : {
         "help" : "Hjälp",
         "close" : "Stäng"
      },
      "save" : {
         "error" : "Det uppstod ett fel. Försök igen senare.",
         "action_tooltip" : "Spara globaliseringsinställningarna",
         "action" : "Spara",
         "success" : "Globaliseringsinställningarna har uppdaterats."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Fel:",
            "icon_alt" : "Fel"
         },
         "success" : {
            "a11y_label" : "Slutfördes:",
            "icon_alt" : "Slutfördes"
         },
         "warning" : {
            "a11y_label" : "Varning!",
            "icon_alt" : "Varning"
         },
         "info" : {
            "a11y_label" : "Information:",
            "icon_alt" : "Information"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Återställ standardvärden"
         },
         "bidi" : {
            "help" : "Aktivera dubbelriktad text",
            "label" : "Aktivera dubbelriktad text",
            "tooltip" : "Används för språkspecifik visning av sammanslagen eller strukturerad text, som filsökvägar. Du kan även ange textriktning oberoende av det valda språket."
         },
         "error" : "Fel",
         "save" : {
            "label" : "Spara"
         },
         "direction" : {
            "label" : "Riktning för användargenererad text:",
            "tooltip" : "Riktningen på text härleds från användarindata, som namn på innehåll och navigeringssökvägar. Som standard används inställningarna för det valda språket (vanligtvis vänster till höger). Om du väljer Sammanhangsbaserat används teckenanalys till att fastställa riktning, vilket innebär att text med blandade riktningar kan användas.",
            "options" : {
               "contextual" : "Sammanhangsbaserat (teckenbaserat)",
               "rtl" : "Höger till vänster",
               "ltr" : "Vänster till höger",
               "default_ltr" : "Använd standardinställningen för språket (vänster till höger)",
               "default_rtl" : "Använd standardinställningen för språket (höger till vänster)"
            }
         },
         "cancel" : {
            "label" : "Avbryt"
         },
         "language" : {
            "selected" : "${0} (aktuellt)",
            "label" : "Språk:",
            "tooltip" : "Ange språk för applikationstext. Den här inställningen påverkar inte användargenererad text."
         },
         "calendar" : {
            "label" : "Kalender:",
            "options" : {
               "hebrew" : "Hebreisk",
               "gregorian" : "Gregoriansk",
               "hijri" : "Hijri"
            }
         }
      }
});
