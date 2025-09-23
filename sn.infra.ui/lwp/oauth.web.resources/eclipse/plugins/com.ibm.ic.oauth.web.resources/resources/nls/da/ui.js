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
         "legal" : "Materialer med licens \u2013 Ejet af HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Alle rettigheder forbeholdt. Se produktlicens for oplysninger. Java og alle Java-baserede varem\u00e6rker og logoer er varem\u00e6rker eller registrerede varem\u00e6rker tilh\u00f8rende Oracle og/eller dens datterselskaber.",
         "error" : "Der er opstået en fejl. Prøv igen senere.",
         "granted" : {
            "title" : "Adgang nægtet",
            "blurb" : "Du har givet ${0} adgang til at interagere med din HCL Connections-konto."
         },
         "denied" : {
            "title" : "Adgang nægtet",
            "blurb" : "Du har nægtet ${0} adgang til at interagere med din HCL Connections-konto."
         },
         "blurb" : "{0} anmoder om adgang til din HCL Connections-information, herunder alt dit indhold i Connections.",
         "revoke" : {
            "description" : "Du kan når som helst tilbagekalde adgangen via Connections Indstillinger > {0}. Connections vil muligvis regelmæssigt bede dig om tilladelse igen.",
            "link" : "Applikationsadgang"
         },
         "authorize" : {
            "label" : "Tillad adgang"
         },
         "windowtitle" : "Giv adgang til HCL Connections",
         "title" : "Anmodning om adgang",
         "deny" : {
            "label" : "Afvis adgang"
         },
         "action_tooltip" : "Tillad adgang for applikationen ${0}",
         "action" : "Tillad adgang",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Sender dig tilbage til ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Aktivér JavaScript",
            "p2" : "Opfrisk siden for at fortsætte.",
            "p1" : "JavaScript er deaktiveret i din webbrowser. HCL Connections kræver JavaScript for at fungere. Opfrisk siden, når du har aktiveret det."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Anmodningen kan ikke behandles",
            "description" : "Applikationens anmodning om adgang til din HCL Connections-konto er ufuldstændig. Klik på browserens Tilbage-knap for at vende tilbage webstedet eller applikationen, der sendte dig hertil, og forsøge igen. Hvis fejlen fortsætter, skal du rapportere problemet til administratoren."
         },
         "invalid_token" : {
            "title" : "Anmodningen kan ikke behandles",
            "description" : "Applikationens anmodning om adgang til din HCL Connections-konto er ugyldig. Klik på browserens Tilbage-knap for at vende tilbage webstedet eller applikationen, der sendte dig hertil, og forsøge igen. Hvis fejlen fortsætter, skal du rapportere problemet til administratoren."
         },
         "default_action" : {
            "label" : "Tilbage til hjemmeside"
         }
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
      "loading" : "Indlæser...",
      "deny" : {
         "error" : "Der er opstået en fejl. Prøv igen senere.",
         "action_tooltip" : "Afvis adgang for applikationen ${0}",
         "action" : "Afvis adgang",
         "success" : "Adgang er nægtet."
      },
      "grid" : {
         "applications" : {
            "summary" : "Liste over applikationer med adgang til dine HCL Connections-oplysninger.",
            "loading" : "Indlæser...",
            "empty" : "Der er ikke fundet nogen applikationer.",
            "reverse_sort" : "Omvendt sortering"
         }
      },
      "applications" : {
         "windowtitle" : "Applikationsadgang",
         "details" : "Applikationer med adgang til dine HCL Connections-oplysninger.",
         "error" : "Listen er ikke hentet på grund af en fejl.",
         "titlebar" : {
            "tab2" : "Applikationsadgang",
            "tab1" : "E-mailnotifikationer",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Et tryk på denne knap opfrisker den aktuelle side med nyt indhold. Du kan returnere til denne menu ved at navigere tilbage til:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections-indstillinger"
         },
         "heading" : "Applikationsadgang"
      },
      "sorts" : {
         "application_name" : "Applikationsnavn",
         "authorization_date" : "Autorisationsdato",
         "expiration_date" : "Udløbsdato",
         "action" : "Handling"
      },
      "revoke_token" : {
         "error" : "Der er opstået en fejl. Prøv igen senere.",
         "dialog_title" : "Tilbagekald adgang",
         "action_tooltip" : "Tilbagekald adgang for applikationen ${0}",
         "action" : "Tilbagekald",
         "ok" : "OK",
         "cancel" : "Annullér",
         "confirm" : "Vil du tilbagekalde denne applikations adgang til dine HCL Connections-oplysninger? ",
         "success" : "Applikationen er fjernet."
      }
});
