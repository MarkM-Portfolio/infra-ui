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
         "legal" : "Gelicentieerd Materiaal - Eigendom van HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Alle rechten voorbehouden. Zie de productlicentie voor meer informatie. Java en alle op Java gebaseerde handelsmerken en logo's zijn handelsmerken of gedeponeerde handelsmerken van Oracle en/of haar dochterondernemingen.",
         "error" : "Er is een fout opgetreden. Probeer het later opnieuw.",
         "granted" : {
            "title" : "Toegang verleend",
            "blurb" : "U hebt ${0} toegang verleend om te werken met uw HCL Connections-account."
         },
         "denied" : {
            "title" : "Toegang geweigerd",
            "blurb" : "U hebt ${0} niet gemachtigd om te werken met uw HCL Connections-account."
         },
         "blurb" : "{0} verzoekt om toegang tot uw HCL Connections-informatie, inclusief al uw content in Connections.",
         "revoke" : {
            "description" : "U kunt op elk gewenst moment de toegang intrekken via Connections-instellingen > {0}. Connections kan u van tijd tot tijd vragen om een nieuwe autorisatie.",
            "link" : "Toepassingstoegang"
         },
         "authorize" : {
            "label" : "Toegang verlenen"
         },
         "windowtitle" : "Toegang verlenen tot HCL Connections",
         "title" : "Toegangsaanvraag",
         "deny" : {
            "label" : "Toegang weigeren"
         },
         "action_tooltip" : "Toegang verlenen tot toepassing ${0}",
         "action" : "Toegang verlenen",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "U wordt teruggestuurd naar ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "JavaScript inschakelen",
            "p2" : "Vernieuw de pagina om verder te gaan.",
            "p1" : "JavaScript is uitgeschakeld in uw webbrowser. HCL Connections vereist JavaScript om te kunnen functioneren. Als u dit hebt ingeschakeld, moet u de pagina vernieuwen."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Wij kunnen uw opdracht niet verwerken",
            "description" : "De opdracht van de toepassing om toegang te krijgen tot uw HCL Connections-account is onvolledig. Klik op de knop Terug van de browser om terug te gaan naar de site of toepassing die u hierheen heeft geleid en probeer het opnieuw. Als deze fout zich blijft voordoen, meld het probleem dan bij de beheerder."
         },
         "invalid_token" : {
            "title" : "Wij kunnen uw opdracht niet verwerken",
            "description" : "De opdracht van de toepassing om toegang te krijgen tot uw HCL Connections-account is ongeldig. Klik op de knop Terug van de browser om terug te gaan naar de site of toepassing die u hierheen heeft geleid en probeer het opnieuw. Als deze fout zich blijft voordoen, meld het probleem dan bij de beheerder."
         },
         "default_action" : {
            "label" : "Terug naar homepage"
         }
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
      "loading" : "Bezig met laden...",
      "deny" : {
         "error" : "Er is een fout opgetreden. Probeer het later opnieuw.",
         "action_tooltip" : "Toegang weigeren tot toepassing ${0}",
         "action" : "Toegang weigeren",
         "success" : "Toegang is geweigerd."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lijst van toepassingen met toegang tot uw HCL Connections-gegevens.",
            "loading" : "Bezig met laden...",
            "empty" : "Geen toepassingen gevonden.",
            "reverse_sort" : "In omgekeerde volgorde sorteren"
         }
      },
      "applications" : {
         "windowtitle" : "Toepassingstoegang",
         "details" : "Toepassingen met toegang tot uw HCL Connections-gegevens.",
         "error" : "De lijst is vanwege een fout niet opgehaald.",
         "titlebar" : {
            "tab2" : "Toepassingstoegang",
            "tab1" : "E-mailmeldingen",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Met deze knop vernieuwt u de huidige pagina en beeldt u nieuwe content af. Om terug te gaan naar dit menu, navigeert u naar:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections-instellingen"
         },
         "heading" : "Toepassingstoegang"
      },
      "sorts" : {
         "application_name" : "Naam van toepassing",
         "authorization_date" : "Machtigingsdatum",
         "expiration_date" : "Vervaldatum",
         "action" : "Actie"
      },
      "revoke_token" : {
         "error" : "Er is een fout opgetreden. Probeer het later opnieuw.",
         "dialog_title" : "Toegang intrekken",
         "action_tooltip" : "Toegang intrekken tot toepassing ${0}",
         "action" : "Intrekken",
         "ok" : "OK",
         "cancel" : "Annuleren",
         "confirm" : "De toegang van deze toepassing tot uw HCL Connections-gegevens intrekken? ",
         "success" : "De toepassing is verwijderd."
      }
});
