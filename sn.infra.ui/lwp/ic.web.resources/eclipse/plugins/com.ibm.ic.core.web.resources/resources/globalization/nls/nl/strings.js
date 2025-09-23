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
         "unavailable" : "Globaliseringsinstellingen zijn niet beschikbaar",
         "details" : "Geef uw voorkeurstaal op, de gewenste kalenderinstelling en de schrijfrichting voor door de gebruiker gegenereerde tekst.",
         "error" : "Globaliseringsinstellingen zijn vanwege een fout niet opgehaald.",
         "titlebar" : {
            "tab2" : "Toepassingstoegang",
            "tab1" : "E-mailmeldingen",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Met deze knop vernieuwt u de huidige pagina en beeldt u nieuwe content af. Om terug te gaan naar dit menu, navigeert u naar:"
         },
         "details_nolanguage" : "Geef de gewenste kalenderinstelling op en de schrijfrichting voor door de gebruiker gegenereerde tekst.",
         "a11y" : {
            "titlebar_label" : "HCL Connections-instellingen",
            "body_label" : "Globaliseringsinstellingen"
         },
         "heading" : "Globaliseringsinstellingen"
      },
      "restore_defaults" : {
         "error" : "Er is een fout opgetreden. Probeer het later opnieuw.",
         "action_tooltip" : "Oorspronkelijke standaardwaarden voor globaliseringsinstellingen herstellen",
         "action" : "Standaardwaarden herstellen",
         "success" : "De oorspronkelijke standaardwaarden voor de globaliseringsinstellingen zijn hersteld."
      },
      "help" : {
         "help" : "Help",
         "close" : "Sluiten"
      },
      "save" : {
         "error" : "Er is een fout opgetreden. Probeer het later opnieuw.",
         "action_tooltip" : "Globaliseringsinstellingen opslaan",
         "action" : "Opslaan",
         "success" : "Uw globaliseringsinstellingen zijn bijgewerkt."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Fout:",
            "icon_alt" : "Fout"
         },
         "success" : {
            "a11y_label" : "Geslaagd:",
            "icon_alt" : "Geslaagd"
         },
         "warning" : {
            "a11y_label" : "Waarschuwing:",
            "icon_alt" : "Waarschuwing"
         },
         "info" : {
            "a11y_label" : "Informatie:",
            "icon_alt" : "Informatie"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Standaardwaarden herstellen"
         },
         "bidi" : {
            "help" : "Help voor bidirectionele tekst inschakelen",
            "label" : "Bidirectionele tekst inschakelen",
            "tooltip" : "Maakt de taalspecifieke weergave mogelijk van aaneengeschakelde en gestructureerde tekst, zoals bestandspaden. Hiermee kunt u ook onafhankelijk van de geselecteerde taal een tekstrichting opgeven."
         },
         "error" : "Fout",
         "save" : {
            "label" : "Opslaan"
         },
         "direction" : {
            "label" : "Richting van door de gebruiker gegenereerde tekst:",
            "tooltip" : "De tekstrichting van de invoer van de gebruiker, zoals namen van content en navigatiebroodkruimels. Standaard wordt deze bepaald door de taalselectie, en is dus meestal van links naar rechts. Als u Contextueel kiest, kan het systeem de richting bepalen op basis van een tekstanalyse (ondersteunt tekst met wisselende richtingen).",
            "options" : {
               "contextual" : "Contextueel (op basis van tekens)",
               "rtl" : "Rechts naar links",
               "ltr" : "Links naar rechts",
               "default_ltr" : "Standaardwaarde voor taal gebruiken (links naar rechts)",
               "default_rtl" : "Standaardwaarde voor taal gebruiken (rechts naar links)"
            }
         },
         "cancel" : {
            "label" : "Annuleren"
         },
         "language" : {
            "selected" : "${0} (huidig)",
            "label" : "Taal:",
            "tooltip" : "Geef de taal op waarin de toepassingstekst moet worden afgebeeld. Deze instelling is niet van invloed op door de gebruiker gegenereerde tekst."
         },
         "calendar" : {
            "label" : "Kalender:",
            "options" : {
               "hebrew" : "Hebreeuws",
               "gregorian" : "Gregoriaans",
               "hijri" : "Hijri"
            }
         }
      }
});
