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
         "legal" : "Licensed Materials \u2013 Property of HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Alle Rechte vorbehalten. Siehe Produktlizenz f\u00fcr Details. Java und alle Java-basierten Marken und Logos sind Marken oder eingetragene Marken von Oracle und/oder seinen verbundenen Unternehmen.",
         "error" : "Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         "granted" : {
            "title" : "Zugriff erteilt",
            "blurb" : "Sie haben ${0} den Zugriff auf Ihr HCL Connections-Konto erteilt."
         },
         "denied" : {
            "title" : "Zugriff verweigert",
            "blurb" : "Sie haben ${0} den Zugriff auf Ihr HCL Connections-Konto verweigert."
         },
         "blurb" : "{0} fordert den Zugriff auf Ihre HCL Connections-Daten an, einschließlich Ihres gesamten Inhalts in Connections.",
         "revoke" : {
            "description" : "Sie können den Zugriff jederzeit über 'Connections-Einstellungen > {0}' widerrufen. Connections fordert Sie möglicherweise regelmäßig zur erneuten Berechtigung auf.",
            "link" : "Anwendungszugriff "
         },
         "authorize" : {
            "label" : "Zugriff erteilen"
         },
         "windowtitle" : "Zugriff auf HCL Connections autorisieren",
         "title" : "Zugriff anfordern",
         "deny" : {
            "label" : "Zugriff verweigern"
         },
         "action_tooltip" : "Anwendung ${0} den Zugriff erteilen.",
         "action" : "Zugriff erteilen",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Sie werden zurück zu ${0} geleitet."
      },
      "javascript" : {
         "disabled" : {
            "title" : "JavaScript aktivieren",
            "p2" : "Aktualisieren Sie die Seite, um fortzufahren.",
            "p1" : "JavaScript wurde in Ihrem Web-Browser inaktiviert.  Für das Funktionieren von HCL Connections ist JavaScript erforderlich.  Aktualisieren Sie die Seite, nachdem Sie JavaScript aktiviert haben."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Ihre Anforderung konnte nicht verarbeitet werden",
            "description" : "Die von der Anwendung, die Zugriff auf Ihr HCL Connections-Konto anfordert, ausgegebene Anforderung war unvollständig. Klicken Sie auf die Zurück-Schaltfläche des Browsers, um zu der Site oder Anwendung zurückzukehren, von der aus Sie hierher gelangt sind, und versuchen Sie es erneut.  Wenn dieser Fehler weiterhin bestehen bleibt, melden Sie das Problem dem Administrator."
         },
         "invalid_token" : {
            "title" : "Ihre Anforderung konnte nicht verarbeitet werden",
            "description" : "Die von der Anwendung, die Zugriff auf Ihr HCL Connections-Konto anfordert, ausgegebene Anforderung war ungültig. Klicken Sie auf die Zurück-Schaltfläche des Browsers, um zu der Site oder Anwendung zurückzukehren, von der aus Sie hierher gelangt sind, und versuchen Sie es erneut.  Wenn dieser Fehler weiterhin bestehen bleibt, melden Sie das Problem dem Administrator."
         },
         "default_action" : {
            "label" : "Zurück zur Homepage"
         }
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
      "loading" : "Ladevorgang läuft...",
      "deny" : {
         "error" : "Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         "action_tooltip" : "Anwendung ${0} den Zugriff verweigern.",
         "action" : "Zugriff verweigern",
         "success" : "Zugriff verweigert."
      },
      "grid" : {
         "applications" : {
            "summary" : "Liste der Anwendungen mit Zugriff auf Ihre HCL Connections-Daten",
            "loading" : "Ladevorgang läuft...",
            "empty" : "Keine Anwendungen gefunden.",
            "reverse_sort" : "Sortierung umkehren"
         }
      },
      "applications" : {
         "windowtitle" : "Anwendungszugriff ",
         "details" : "Anwendungen mit Zugriff auf Ihre HCL Connections-Daten.",
         "error" : "Die Liste wurde aufgrund eines Fehlers nicht abgerufen.",
         "titlebar" : {
            "tab2" : "Anwendungszugriff ",
            "tab1" : "E-Mail-Benachrichtigungen",
            "tab3" : "Globalisierung"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Wenn Sie diese Schaltfläche drücken, wird die aktuelle Seite mit neuen Inhalten aktualisiert. Um zu diesem Menü zurückzukehren, navigieren Sie zurück zu: "
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections-Einstellungen "
         },
         "heading" : "Anwendungszugriff "
      },
      "sorts" : {
         "application_name" : "Anwendungsname",
         "authorization_date" : "Autorisierungsdatum",
         "expiration_date" : "Ablaufdatum",
         "action" : "Aktion"
      },
      "revoke_token" : {
         "error" : "Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         "dialog_title" : "Zugriff widerrufen",
         "action_tooltip" : "Zugriff für Anwendung ${0} widerrufen.",
         "action" : "Widerrufen",
         "ok" : "OK",
         "cancel" : "Abbrechen",
         "confirm" : "Den Zugriff dieser Anwendung auf Ihre HCL Connections-Daten widerrufen? ",
         "success" : "Die Anwendung wurde entfernt."
      }
});
