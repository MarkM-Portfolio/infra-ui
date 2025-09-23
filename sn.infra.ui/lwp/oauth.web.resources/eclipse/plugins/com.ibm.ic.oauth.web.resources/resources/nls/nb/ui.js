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
         "legal" : "Licensed Materials - Property of IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, IBM-logoen, ibm.com og Lotus er varemerker for IBM Corporation i USA og/eller andre land. Begrensede rettigheter for bruk i offentlig administrasjon i USA: Bruk, mangfoldiggjørelse eller videreformidling er begrenset av GSA ADP Schedule Contract med IBM Corp. Du finner mer informasjon på Om-siden.",
         "error" : "Det oppstod en feil. Prøv igjen senere.",
         "granted" : {
            "title" : "Tilgang gitt",
            "blurb" : "Du har gitt ${0} tilgang til å bruke HCL Connections-kontoen din."
         },
         "denied" : {
            "title" : "Ingen tilgang",
            "blurb" : "Du har nektet ${0} tilgang til å bruke HCL Connections-kontoen din."
         },
         "blurb" : "{0} ber om tilgang til HCL Connections-informasjonen din, inkludert alt innholdet ditt i Connections.",
         "revoke" : {
            "description" : "Du kan inndra tilgangen når som helst via Connections-innstillinger > {0}. Connections vil kanskje med jevne mellomrom be deg om å autorisere på nytt.",
            "link" : "Applikasjonstilgang"
         },
         "authorize" : {
            "label" : "Gi tilgang"
         },
         "windowtitle" : "Gi tilgang til HCL Connections",
         "title" : "Tilgangsforespørsel",
         "deny" : {
            "label" : "Nekt tilgang"
         },
         "action_tooltip" : "Gi tilgang for applikasjon ${0}",
         "action" : "Gi tilgang",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Omdirigerer deg tilbake til ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Aktiver JavaScript",
            "p2" : "Oppdater siden for å fortsette.",
            "p1" : "JavaScript er deaktivert i nettleseren.  HCL Connections krever JavaScript for å fungere.  Når du har aktivert JavaScript, må du oppdatere siden."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Vi kan ikke behandle forespørselen din",
            "description" : "Forespørsel som applikasjonen gav om tilgang til HCL Connections-kontoen din, var ufullstendig.  Klikk på tilbakeknappen i nettleseren for å gå tilbake til stedet eller applikasjonen som sendte deg hit, og prøve igjen.  Hvis denne feilen vedvarer, må du rapportere problemet til administratoren."
         },
         "invalid_token" : {
            "title" : "Vi kan ikke behandle forespørselen din",
            "description" : "Forespørsel som applikasjonen gav om tilgang til HCL Connections-kontoen din, var ugyldig.  Klikk på tilbakeknappen i nettleseren for å gå tilbake til stedet eller applikasjonen som sendte deg hit, og prøve igjen.  Hvis denne feilen vedvarer, må du rapportere problemet til administratoren."
         },
         "default_action" : {
            "label" : "Tilbake til hjemmeside"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Feil:",
            "icon_alt" : "Feil"
         },
         "success" : {
            "a11y_label" : "Vellykket:",
            "icon_alt" : "Vellykket"
         },
         "warning" : {
            "a11y_label" : "Advarsel:",
            "icon_alt" : "Advarsel"
         },
         "info" : {
            "a11y_label" : "Informasjon:",
            "icon_alt" : "Informasjon"
         }
      },
      "loading" : "Laster inn...",
      "deny" : {
         "error" : "Det oppstod en feil. Prøv igjen senere.",
         "action_tooltip" : "Nekt tilgang for applikasjon ${0}",
         "action" : "Nekt tilgang",
         "success" : "Tilgang ble nektet."
      },
      "grid" : {
         "applications" : {
            "summary" : "Liste over applikasjoner med tilgang til HCL Connections-informasjonen din.",
            "loading" : "Laster inn...",
            "empty" : "Fant ingen applikasjoner.",
            "reverse_sort" : "Omvendt sortering"
         }
      },
      "applications" : {
         "windowtitle" : "Applikasjonstilgang",
         "details" : "Applikasjoner med tilgang til HCL Connections-informasjonen din.",
         "error" : "Listen ble ikke hentet på grunn av en feil.",
         "titlebar" : {
            "tab2" : "Applikasjonstilgang",
            "tab1" : "E-postvarsler",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Hvis du trykker på denne knappen, blir den gjeldende siden oppdatert med nytt innhold.  Hvis du vil gå tilbake til denne menyen, navigerer du tilbake til:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections-innstillinger"
         },
         "heading" : "Applikasjonstilgang"
      },
      "sorts" : {
         "application_name" : "Applikasjonsnavn",
         "authorization_date" : "Autorisasjonsdato",
         "expiration_date" : "Utløpsdato",
         "action" : "Gjør slik"
      },
      "revoke_token" : {
         "error" : "Det oppstod en feil. Prøv igjen senere.",
         "dialog_title" : "Inndra tilgang",
         "action_tooltip" : "Inndra tilgang for applikasjon ${0}",
         "action" : "Inndra",
         "ok" : "OK",
         "cancel" : "Avbryt",
         "confirm" : "Vil du inndra denne applikasjonens tilgang til HCL Connections-informasjonen din? ",
         "success" : "Applikasjonen ble fjernet."
      }
});
