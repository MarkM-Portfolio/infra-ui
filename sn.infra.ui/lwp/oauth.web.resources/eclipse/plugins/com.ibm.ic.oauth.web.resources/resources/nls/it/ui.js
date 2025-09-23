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
         "legal" : "Materiale su licenza \u2013 Propriet\u00e0 di HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Tutti i diritti riservati. Per i dettagli, consultare la licenza del prodotto. Java e tutti i marchi e i loghi basati su Java sono marchi o marchi registrati di Oracle e/o delle sue societ\u00e0 affiliate.",
         "error" : "Si è verificato un errore. Riprovare più tardi.",
         "granted" : {
            "title" : "Accesso concesso",
            "blurb" : "Ti è stato concesso l\'accesso ${0} per interagire con l'account HCL Connections."
         },
         "denied" : {
            "title" : "Accesso negato",
            "blurb" : "Ti è stato negato l\'accesso ${0} per interagire con l'account HCL Connections."
         },
         "blurb" : "{0} sta richiedendo l'accesso alle informazioni su HCL Connections, incluso tutto il contenuto in Connections.",
         "revoke" : {
            "description" : "È possibile revocare l'accesso in qualsiasi momento tramite le Impostazioni di Connections > {0}. Connections potrebbe periodicamente richiedere l'autorizzazione.",
            "link" : "Accesso all'applicazione"
         },
         "authorize" : {
            "label" : "Concedi accesso"
         },
         "windowtitle" : "Autorizza accesso a HCL Connections",
         "title" : "Richiesta di accesso",
         "deny" : {
            "label" : "Nega accesso"
         },
         "action_tooltip" : "Concedi accesso ad applicazione ${0}",
         "action" : "Concedi accesso",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Reindirizzamento a ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Attiva JavaScript",
            "p2" : "Aggiornare la pagina per continuare.",
            "p1" : "JavaScript è stato disabilitato nel browser Web.  Per il funzionamento di HCL Connections è richiesto JavaScript.  Una volta attivato, aggiornare la pagina."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Non si è in grado di elaborare la richiesta",
            "description" : "La richiesta emessa dall'applicazione che richiede l'accesso al proprio account di HCL Connections non era completa.  Fare clic sul pulsante Indietro del browser per tornare al sito o all'applicazione che ha visualizzato questa pagina e provare di nuovo.  Se l'errore persiste, riferire il problema all'amministratore."
         },
         "invalid_token" : {
            "title" : "Non si è in grado di elaborare la richiesta",
            "description" : "La richiesta emessa dall'applicazione che richiede l'accesso al proprio account di HCL Connections non è valida.  Fare clic sul pulsante Indietro del browser per tornare al sito o all'applicazione che ha visualizzato questa pagina e provare di nuovo.  Se l'errore persiste, riferire il problema all'amministratore."
         },
         "default_action" : {
            "label" : "Torna alla homepage"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Errore:",
            "icon_alt" : "Errore"
         },
         "success" : {
            "a11y_label" : "Riuscito:",
            "icon_alt" : "Riuscito"
         },
         "warning" : {
            "a11y_label" : "Avviso:",
            "icon_alt" : "Avvertenza"
         },
         "info" : {
            "a11y_label" : "Informazioni:",
            "icon_alt" : "Informazioni"
         }
      },
      "loading" : "Caricamento...",
      "deny" : {
         "error" : "Si è verificato un errore. Riprovare più tardi.",
         "action_tooltip" : "Nega accesso ad applicazione ${0}",
         "action" : "Nega accesso",
         "success" : "L'accesso è stato negato."
      },
      "grid" : {
         "applications" : {
            "summary" : "Elenco delle applicazioni con accesso alle informazioni di HCL Connections.",
            "loading" : "Caricamento...",
            "empty" : "Nessuna applicazione trovata.",
            "reverse_sort" : "Inverti ordinamento"
         }
      },
      "applications" : {
         "windowtitle" : "Accesso all'applicazione",
         "details" : "Applicazioni con l'accesso alle informazioni di HCL Connections.",
         "error" : "L'elenco non è stato richiamato a causa di un errore.",
         "titlebar" : {
            "tab2" : "Accesso all'applicazione",
            "tab1" : "Notifiche email",
            "tab3" : "Globalizzazione"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Selezionando questo pulsante la pagina corrente sarà aggiornata con il nuovo contenuto.  Per tornare a questo menu, navigare e tornare a:"
         },
         "a11y" : {
            "titlebar_label" : "Impostazioni di HCL Connections"
         },
         "heading" : "Accesso all'applicazione"
      },
      "sorts" : {
         "application_name" : "Nome applicazione",
         "authorization_date" : "Data autorizzazione",
         "expiration_date" : "Data di scadenza",
         "action" : "Azione"
      },
      "revoke_token" : {
         "error" : "Si è verificato un errore. Riprovare più tardi.",
         "dialog_title" : "Revoca accesso",
         "action_tooltip" : "Revoca accesso ad applicazione ${0}",
         "action" : "Revoca",
         "ok" : "OK",
         "cancel" : "Annulla",
         "confirm" : "Revocare l\'accesso dell'applicazione alle informazioni su HCL Connections? ",
         "success" : "L'applicazione è stata rimossa."
      }
});
