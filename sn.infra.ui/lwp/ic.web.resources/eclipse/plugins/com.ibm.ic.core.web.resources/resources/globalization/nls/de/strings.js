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
         "windowtitle" : "Globalisierung",
         "unavailable" : "Die Globalisierungseinstellungen sind nicht verfügbar",
         "details" : "Geben Sie Ihre bevorzugte Sprache, das bevorzugte Format für Ihren Kalender und die Leserichtung für von Benutzern erzeugten Text an. ",
         "error" : "Die Globalisierungseinstellungen wurden aufgrund eines Fehlers nicht abgerufen. ",
         "titlebar" : {
            "tab2" : "Anwendungszugriff ",
            "tab1" : "E-Mail-Benachrichtigungen",
            "tab3" : "Globalisierung"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Wenn Sie diese Schaltfläche drücken, wird die aktuelle Seite mit neuen Inhalten aktualisiert. Um zu diesem Menü zurückzukehren, navigieren Sie zurück zu: "
         },
         "details_nolanguage" : "Geben Sie das bevorzugte Format für Ihren Kalender und die Leserichtung für von Benutzern erzeugten Text an. ",
         "a11y" : {
            "titlebar_label" : "HCL Connections-Einstellungen ",
            "body_label" : "Globalisierungseinstellungen "
         },
         "heading" : "Globalisierungseinstellungen "
      },
      "restore_defaults" : {
         "error" : "Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         "action_tooltip" : "Globalisierungseinstellungen auf ursprüngliche Standardwerte zurücksetzen ",
         "action" : "Standardwerte wiederherstellen ",
         "success" : "Ihre Globalisierungseinstellungen wurden auf die ursprünglichen Standardwerte zurückgesetzt. "
      },
      "help" : {
         "help" : "Hilfe",
         "close" : "Schließen"
      },
      "save" : {
         "error" : "Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         "action_tooltip" : "Globalisierungseinstellungen speichern ",
         "action" : "Speichern",
         "success" : "Ihre Globalisierungseinstellungen wurden gespeichert. "
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Fehler:",
            "icon_alt" : "Fehler"
         },
         "success" : {
            "a11y_label" : "Erfolg:",
            "icon_alt" : "Erfolg "
         },
         "warning" : {
            "a11y_label" : "Warnung:",
            "icon_alt" : "Warnung "
         },
         "info" : {
            "a11y_label" : "Information: ",
            "icon_alt" : "Information "
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Standardwerte wiederherstellen "
         },
         "bidi" : {
            "help" : "Hilfe zum bidirektionalen Text aktivieren ",
            "label" : "Bidirektionalen Text aktivieren ",
            "tooltip" : "Ermöglicht eine sprachenspezifische Anzeige von verkettetem und strukturiertem Text, wie beispielsweise in Dateipfaden. Ermöglicht Ihnen zudem die Angabe einer von Ihrer Sprachauswahl unabhängigen Textrichtung. "
         },
         "error" : "Fehler",
         "save" : {
            "label" : "Speichern"
         },
         "direction" : {
            "label" : "Richtung des von Benutzern erzeugten Texts ",
            "tooltip" : "Die Richtung des aus Benutzereingaben, wie beispielsweise Namen von Inhalten und Navigationspfaden, entnommenen Texts. Diese Vorgabe wird standardmäßig durch Ihre Sprachauswahl (in den meisten Fällen von links nach rechts) festgelegt. Durch kontextgebundenes Auswählen kann das System die Richtung anhand einer Zeichenanalyse festlegen (unterstützt Text mit unterschiedlichen Richtungen). ",
            "options" : {
               "contextual" : "Kontextgebunden (zeichenbasiert) ",
               "rtl" : "Von rechts nach links ",
               "ltr" : "Von links nach rechts ",
               "default_ltr" : "Standardeinstellung für Sprache (von links nach rechts) verwenden ",
               "default_rtl" : "Standardeinstellung für Sprache (von rechts nach links) verwenden "
            }
         },
         "cancel" : {
            "label" : "Abbrechen"
         },
         "language" : {
            "selected" : "${0} (aktuell)",
            "label" : "Sprache:",
            "tooltip" : "Geben Sie die Sprache an, in der der Anwendungstext angezeigt wird. Diese Einstellung wirkt sich nicht auf von Benutzern erzeugten Text aus. "
         },
         "calendar" : {
            "label" : "Kalender: ",
            "options" : {
               "hebrew" : "Hebräisch ",
               "gregorian" : "Gregorianisch ",
               "hijri" : "Hijri "
            }
         }
      }
});
