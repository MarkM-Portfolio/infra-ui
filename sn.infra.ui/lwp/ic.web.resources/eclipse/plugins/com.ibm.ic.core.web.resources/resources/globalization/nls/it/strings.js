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
         "windowtitle" : "Globalizzazione",
         "unavailable" : "Impostazioni di globalizzazione non disponibili",
         "details" : "Specificare la lingua preferita, il calendario e la direzione del testo generato dall'utente.",
         "error" : "Le impostazioni di globalizzazione non sono state richiamate a causa di un errore.",
         "titlebar" : {
            "tab2" : "Accesso all'applicazione",
            "tab1" : "Notifiche email",
            "tab3" : "Globalizzazione"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Selezionando questo pulsante la pagina corrente sarà aggiornata con il nuovo contenuto.  Per tornare a questo menu, navigare e tornare a:"
         },
         "details_nolanguage" : "Specificare il calendario preferito e la direzione del testo generato dall'utente.",
         "a11y" : {
            "titlebar_label" : "Impostazioni di HCL Connections",
            "body_label" : "Impostazioni di globalizzazione"
         },
         "heading" : "Impostazioni di globalizzazione"
      },
      "restore_defaults" : {
         "error" : "Si è verificato un errore. Riprovare più tardi.",
         "action_tooltip" : "Ripristina impostazioni di globalizzazione ai valori predefiniti originali",
         "action" : "Ripristina predefiniti",
         "success" : "Le impostazioni di globalizzazione sono state ripristinate ai valori predefiniti originali."
      },
      "help" : {
         "help" : "Guida",
         "close" : "Chiudi"
      },
      "save" : {
         "error" : "Si è verificato un errore. Riprovare più tardi.",
         "action_tooltip" : "Salva impostazioni di globalizzazione",
         "action" : "Salva",
         "success" : "Le impostazioni di globalizzazione sono state aggiornate."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Ripristina predefiniti"
         },
         "bidi" : {
            "help" : "Abilita guida testo bidirezionale",
            "label" : "Abilita testo bidirezionale",
            "tooltip" : "Consente la visualizzazione specifica della lingua di testo concatenato e testo strutturato, come i percorsi di file.  Consente inoltre di specificare la direzione del testo indipendentemente dalla selezione della lingua."
         },
         "error" : "Errore",
         "save" : {
            "label" : "Salva"
         },
         "direction" : {
            "label" : "Direzione del testo generato dall'utente:",
            "tooltip" : "La direzione del testo derivato dall'input utente, come nomi di contenuto e tracce di navigazione.  Per impostazione predefinita, tale direzione è determinata dalla selezione della propria lingua (per la maggior parte dei casi, da sinistra a destra).  La scelta del contesto consente al sistema di determinare la direzione in base all'analisi dei caratteri (supporta un testo a direzione mista).",
            "options" : {
               "contextual" : "Contestuale (basato sui caratteri)",
               "rtl" : "Da destra a sinistra",
               "ltr" : "Da sinistra a destra",
               "default_ltr" : "Utilizza valore predefinito lingua (da sinistra a destra)",
               "default_rtl" : "Utilizza valore predefinito lingua (da destra a sinistra)"
            }
         },
         "cancel" : {
            "label" : "Annulla"
         },
         "language" : {
            "selected" : "${0} (corrente)",
            "label" : "Lingua:",
            "tooltip" : "Specificare la lingua in cui sarà visualizzato il testo dell'applicazione.  Questa impostazione non interesserà il testo generato dall'utente."
         },
         "calendar" : {
            "label" : "Calendario:",
            "options" : {
               "hebrew" : "Ebraico",
               "gregorian" : "Gregoriano",
               "hijri" : "Hijri"
            }
         }
      }
});
