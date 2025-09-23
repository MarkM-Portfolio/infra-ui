/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Anteprima file",
      FILENAME_TOOLTIP: "Modifica nome file",
      ICON_TOOLTIP: "Scarica file",
      ERROR: "Si è verificato un errore.",
      FILE_MALICIOUS: "La scansione ha rilevato del contenuto dannoso",
      SHARED_EXTERNALLY: "Condiviso esternamente",
      FILE_SYNCED: "Aggiunto a cartella di sincronizzazione",
      MY_DRIVE: {
         TITLE: "In Unità personale",
         ROOT_FOLDER: "/Unità personale",
         FOLDER: "/Unità personale/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Ulteriori azioni",
         A11Y: "Apre un menu a discesa con un elenco di altre azioni da poter eseguire sul file.",
            PANELS: {
               TITLE: "Ulteriori informazioni",
               A11Y: "Apre un menu a discesa con un elenco di pannelli nascosti"
            }
      },
      WELCOME: {
         TITLE: "Dettagli e Vista file combinati",
         SUBTITLE: "È ora possibile visualizzare un file e i relativi commenti affiancati.",
         LINES: {
            LINE_1: "Tutte le informazioni e le attività che si potevano svolgere sulla pagina precedente si trovano qui.",
            LINE_2: "Commenti, condivisioni, versioni, e le informazioni base sono disponibili sul lato del file."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Questo pulsante consente di passare al file successivo.",
         PREVIOUS_A11Y: "Questo pulsante consente di tornare al file precedente."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Altre opzioni di modifica",
            A11Y: "Questo pulsante apre un menu in cui sono riportate ulteriori opzioni di modifica."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Modifica"
            },
            UPLOAD: {
               TITLE: "Carica"
            },
            CREATE: {
              TITLE: "Crea"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Ridimensiona il pannello",
           USAGE: "Premere i tasti della parentesi sinistra o destra per ridimensionare il pannello."
       },
         CLOSE: {
            TOOLTIP: "Chiudi",
            A11Y: "Questo pulsante consente di chiudere il visualizzatore file.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Il file è ancora in fase di caricamento.",
              PROMPT: "Il file è ancora in fase di caricamento. Se si chiude prima del completamento, il caricamento sarà annullato.",
              OK: "Chiudi comunque",
              CANCEL: "Attendi il caricamento"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Aggiungi a File",
           A11Y: "Questo pulsante aggiunge l'allegato a File.",
           VIEW_NOW: "Visualizza adesso"
         },
         TEAR_OFF: {
           TOOLTIP: "Apri in una nuova finestra",
           A11Y: "Apri in una nuova finestra",
           ERROR_TEARING_OFF: "Si è verificato un errore durante l'apertura della nuova finestra.",
           DIALOG_TITLE: "Conferma",
           UNSAVED_CHANGES_WARNING: "Sono presenti delle modifiche non salvate che saranno perse. Aprire comunque una nuova finestra?",
           OK: "Sì",
           CANCEL: "No",
           OPEN: "Apri",
           OPEN_ANYWAY: "Apri comunque",
           CANCEL_ALT: "Annulla"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Nuovo da file",
            ACTION_NAME:"Crea file",
            A11Y: {
               TEXT: "Crea un documento (file DOC, DOCX o ODT) dal file di un modello. È possibile modificare questi documenti online in Docs.",
               PRES: "Crea una presentazione (file PPT, PPTX o ODP) da un file di modello. È possibile modificare queste presentazioni online in Docs.",
               SHEET: "Crea un foglio di calcolo (file XLS, XLSX o ODS) dal file di un modello. È possibile modificare questi fogli di calcolo online in Docs."
            },
            PROMPT: {
               TEXT: "Crea un documento (file DOC, DOCX o ODT) dal file di un modello. È possibile modificare questi documenti online in Docs.",
               PRES: "Crea una presentazione (file PPT, PPTX o ODP) da un file di modello. È possibile modificare queste presentazioni online in Docs.",
               SHEET: "Crea un foglio di calcolo (file XLS, XLSX o ODS) dal file di un modello. È possibile modificare questi fogli di calcolo online in Docs."
            },
            NAME_FIELD: "Nome:",
            EXTERNAL_FIELD: "I file possono essere condivisi con persone esterne alla mia organizzazione",
            EXTERNAL_DESC: "L'accesso esterno consente la condivisione di file con utenti esterni (persone esterne alla propria organizzazione o società), di cartelle con utenti esterni e di comunità con persone esterne come membri. Impostare l'accesso esterno quando si carica un file; non sarà possibile farlo in un secondo momento.",
            CREATE_BUTTON: "Crea",
            CANCEL: "Annulla",
            PRE_FILL_NAMES: {
               OTT: "Documento senza titolo",
               OTS: "Foglio di calcolo senza titolo",
               OTP: "Presentazione senza titolo",
               DOT: "Documento senza titolo",
               XLT: "Foglio di calcolo senza titolo",
               POT: "Presentazione senza titolo",
               DOTX: "Documento senza titolo",
               XLTX: "Foglio di calcolo senza titolo",
               POTX: "Presentazione senza titolo"
            },
            ERRORS: {
               NAME_REQUIRED: "Il nome del documento è obbligatorio.",
               ILLEGAL_NAME:"Questo titolo del documento non è consentito, specificarne un altro.",
               WARN_LONG_NAME: "Il nome del documento è troppo lungo.",
               TRIM_NAME: "Abbreviare il nome del documento?",
               SESSION_TIMEOUT: "La sessione è scaduta, accedere e provare di nuovo.",
               DUPLICATE_NAME: "È stato rilevato un nome file duplicato. Immettere un nuovo nome.",
               SERVER_ERROR: "Il server Connections non è disponibile. Rivolgersi all'amministratore del server e riprovare in seguito."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Scarica file",
            A11Y: "Questo pulsante consente di scaricare il file."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Scarica come PDF",
            TOOLTIP: "Scarica questo file come file PDF",
            A11Y: "Questo pulsante consente di scaricare il file come PDF.",
            SUCCESS: "Il file è stato correttamente scaricato come PDF.",
            ERROR: {
               DEFAULT: "Non è stato possibile scaricare il file come PDF.  Riprovare più tardi.",
               UNAUTHENTICATED: "Sessione scaduta. Sarà necessario collegarsi di nuovo prima di poter scaricare il file come PDF.",
               NOT_FOUND: "Il file non è stato scaricato come PDF in quanto è stato eliminato o non è più condiviso con l'utente.",
               ACCESS_DENIED: "Il file non è stato scaricato come PDF in quanto è stato eliminato o non è più condiviso con l'utente."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Non esiste una versione pubblicata di questo file da scaricare.  Le versioni possono essere pubblicati dall'editor Docs."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Impossibile scaricare il file",
               CANCEL: "Chiudi",
               PROMPT: "Non esiste una versione pubblicata di questo file da scaricare.",
               PROMPT2: "Le versioni possono essere pubblicati dall'editor Docs."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Impossibile scaricare il file",
               CANCEL: "Chiudi",
               PROMPT: "Non esiste una versione pubblicata di questo file da scaricare.",
               PROMPT2: "Richiedere al proprietario del file da pubblicare una versione di questo file."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Scarica una versione",
               OK: "Scarica versione",
               PROMPT: {
                  TODAY: "È stata rilevata una bozza più recente, modificata oggi alle ${time}.",
                  YESTERDAY: "È stata rilevata una bozza più recente, modificata ieri alle ${time}.",
                  DAY: "È stata rilevata una bozza più recente, modificata il ${date}.",
                  MONTH: "È stata rilevata una bozza più recente, modificata il ${date}.",
                  YEAR: "È stata rilevata una bozza più recente, modificata il ${date_long}."
               },
               PROMPT2: {
                  TODAY: "Continuare a scaricare la versione pubblicata oggi alle ${time}?",
                  YESTERDAY: "Continuare a scaricare la versione pubblicata ieri alle ${time}?",
                  DAY: "Continuare a scaricare la versione pubblicata il ${date}?",
                  MONTH: "Continuare a scaricare la versione pubblicata il ${date}?",
                  YEAR: "Continuare a scaricare la versione pubblicata il ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Mostra pannello dei dettagli",
            HIDE: "Nascondi pannello dei dettagli",
            RESET: "Reimposta dimensione pannello",
            SHOW_A11Y: "Questo pulsante consente di aprire e chiudere il pannello laterale. Il pannello laterale al momento è chiuso.",
            HIDE_A11Y: "Questo pulsante consente di aprire e chiudere il pannello laterale. Il pannello laterale al momento è aperto.",
            RESET_A11Y: "Questo pulsante reimposta il pannello laterale sulle sue dimensioni predefinite. Il pannello laterale al momento è espanso."
         },
         VIEW_DOC: {
            NAME: "Apri in Docs Viewer",
            TOOLTIP: "Apri in Docs Viewer",
            A11Y: "Questo pulsante consente di aprire il file per la visualizzazione all'interno di una nuova finestra del browser."
         },
         EDIT_DOC: {
            NAME: "Modifica in Docs",
            TOOLTIP: "Utilizza HCL Docs per modificare questo file",
            A11Y: "Questo pulsante consente di aprire il file per la modifica in Docs all'interno di una nuova finestra."
         },
         EDIT_OFFICE: {
            TITLE: "Opzioni di modifica.",
            NAME: "Modifica in Microsoft Office Online",
            TOOLTIP: "Utilizza Microsoft Office Online per modificare questo file",
            A11Y: "Questo pulsante consente di aprire il file per la modifica in Microsoft Office Online all'interno di una nuova finestra."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Modifica in Microsoft Word Online",
           TOOLTIP: "Utilizza Microsoft Word Online per modificare questo file",
           A11Y: "Questo pulsante consente di aprire il file per la modifica in Microsoft Word Online all'interno di una nuova finestra."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Modifica Microsoft Excel Online",
             TOOLTIP: "Utilizza Microsoft Excel Online per modificare questo file",
             A11Y: "Questo pulsante consente di aprire il file per la modifica in Microsoft Excel Online all'interno di una nuova finestra."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Modifica in Microsoft PowerPoint Online",
             TOOLTIP: "Utilizza Microsoft PowerPoint Online per modificare questo file",
             A11Y: "Questo pulsante consente di aprire il file per la modifica in Microsoft PowerPoint Online all'interno di una nuova finestra."
         },
         OFFICE_EDITED: {
             SUCCESS: "Il file sta per essere salvato."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Modifica su Desktop",
            DIALOG_TITLE: "Modifica su Desktop",
            TOOLTIP: "Modifica questo documento",
            A11Y: "Questo pulsante apre il file per la modifica in locale.",
            PROMPT: "Questa funzione consente di apportare delle modifiche utilizzando il software installato sul computer in uso.",
            INSTALL: "Prima di continuare, ${startLink}installare i connettori file desktop${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Importante:",
            REMINDER: "Una volta terminato con le modifiche, pubblicare una bozza utilizzando i connettori file desktop.",
            SKIP_DIALOG: "Non visualizzare di nuovo questo messaggio.",
            OK: "OK",
            CANCEL: "Annulla"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Conferma",
            DELETE_VERSION: "Elimina versione ${version}",
            DELETE_VERSION_AND_PRIOR: "Elimina versione ${version} e tutte le versioni precedenti",
            PROMPT: "Si sta per eliminare la versione ${version}. Si desidera procedere?",
            DELETE_PRIOR: "Elimina anche tutte le versioni precedenti",
            ERROR: "Si è verificato un errore durante l'eliminazione della versione. Provare di nuovo in un secondo momento.",
            TOOLTIP: "Elimina questa versione",
            OK: "OK",
            CANCEL: "Annulla"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Ottieni link",
            LINK_FILE: "Link al file:",
            LINK_PREVIEW: "Link all'anteprima del file:",
            LINK_DOWNLOAD: "Link per scaricare il file:",
            TOOLTIP: "Link al file",
            OK: "Chiudi"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Scarica questa versione"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Conferma",
            PROMPT: "Si sta per sostituire la versione corrente di questo file con la versione ${version}. Si desidera procedere?",
            ERROR: "Si è verificato un errore durante il ripristino della versione. Provare di nuovo in un secondo momento.",
            TOOLTIP: "Ripristina questa versione",
            CHANGE_SUMMARY: "Ripristinato dalla versione ${version}",
            OK: "OK",
            CANCEL: "Annulla"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Conferma",
            REMOVE_EVERYONE: "Rimuovere l'accesso dell'organizzazione a questo file? Se l'accesso viene rimosso, allora il file sarà rimosso dalle cartelle e dalle comunità consentendo l'accesso a livello di organizzazione e solo il proprietario e le persone con cui è stato condiviso potranno visualizzarlo e lavorare con esso.",
            REMOVE_USER: "Interrompere la condivisione con ${user}? Se si interrompe la condivisione, ${user} potrà accedere a questo file solo attraverso le cartelle oppure se è condiviso con chiunque appartenga all'organizzazione.",
            REMOVE_COMMUNITY: "Rimuovere questo file dalla comunità ${communityName}?",
            REMOVE_FOLDER: "Rimuovere questo file dalla cartella ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Rimuovi dall'accesso dell'organizzazione",
            REMOVE_USER_TOOLTIP: "Rimuovi tutte le condivisioni con ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Rimuovi dalla comunità ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Rimuovi dalla cartella ${folderName}",
            OK: "OK",
            CANCEL: "Annulla",
            EFSS: {
              DIALOG_TITLE: "Conferma",
              REMOVE_EVERYONE: "Rimuovere l'accesso dell'organizzazione a questo file? Se l'accesso viene rimosso, allora il file sarà rimosso dalle cartelle che consentono l'accesso a livello di organizzazione e soltanto il proprietario e le persone con cui è stato condiviso potranno visualizzarlo e utilizzarlo.",
              REMOVE_USER: "Interrompere la condivisione con ${user}? Se si interrompe la condivisione, ${user} potrà accedere a questo file solo attraverso le cartelle oppure se è condiviso con chiunque appartenga all'organizzazione.",
              REMOVE_COMMUNITY: "Rimuovere questo file dalla comunità ${communityName}?",
              REMOVE_FOLDER: "Rimuovere questo file dalla cartella ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Rimuovi dall'accesso dell'organizzazione",
              REMOVE_USER_TOOLTIP: "Rimuovi tutte le condivisioni con ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Rimuovi dalla comunità ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Rimuovi dalla cartella ${folderName}",
              OK: "OK",
              CANCEL: "Annulla",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Modifica questo commento"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Conferma",
            PROMPT: "Eliminare questo commento?",
            ERROR: "Si è verificato un errore durante l'eliminazione del commento. Provare di nuovo in un secondo momento.",
            TOOLTIP: "Elimina questo commento",
            OK: "OK",
            CANCEL: "Annulla"
         },
         LIKE: {
            LIKE: "Aggiungi preferenza al file",
            UNLIKE: "Rimuovi preferenza dal file",
            LIKE_A11Y: "Questo pulsante aggiunge una preferenza al file.",
            UNLIKE_A11Y: "Questo pulsante rimuove una preferenza dal file.",
            LIKED_SUCCESS: "Hai aggiunto una preferenza a questo file",
            UNLIKE_SUCCESS: "Hai rimosso una preferenza da questo file"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Descrizione della modifica",
            ERROR: {
               DEFAULT: "Impossibile salvare la descrizione. Provare di nuovo in un secondo momento.",
               UNAUTHENTICATED: "Sessione scaduta. Per poter aggiornare la descrizione è necessario collegarsi di nuovo.",
               NOT_FOUND: "La descrizione non è stata salvata in quanto il file è stato eliminato o non è più condiviso con l'utente.",
               ACCESS_DENIED: "La descrizione non è stata salvata in quanto il file è stato eliminato o non è più condiviso con l'utente."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Errore durante il salvataggio del nome file",
               CONFLICT: "Il nome file esiste già"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Si è verificato un errore mentre seguivi questo file. Provare di nuovo in un secondo momento.",
                  UNAUTHENTICATED: "Sessione scaduta. Per poter seguire questo file, è necessario effettuare di nuovo l'accesso.",
                  NOT_FOUND: "Non è possibile seguire questo file in quanto è stato eliminato o non è più condiviso con l'utente.",
                  ACCESS_DENIED: "Non è possibile seguire questo file in quanto è stato eliminato o non è più condiviso con l'utente."
               },
               UNFOLLOW: {
                  DEFAULT: "Si è verificato un errore mentre di smetteva di seguire questo file. Provare di nuovo in un secondo momento.",
                  UNAUTHENTICATED: "Sessione scaduta. Per poter smettere di seguire questo file, è necessario effettuare di nuovo l'accesso.",
                  NOT_FOUND: "Non è possibile smettere di seguire questo file in quanto è stato eliminato o non è più condiviso con l'utente.",
                  ACCESS_DENIED: "Non è possibile smettere di seguire questo file in quanto è stato eliminato o non è più condiviso con l'utente."
               }
            },
            FOLLOW_NAME: "Segui",
            FOLLOW_TOOLTIP: "Segui questo file",
            FOLLOW_A11Y: "Con questo pulsante si segue il file.",
            FOLLOW_SUCCESS: "Si sta ora seguendo questo file.",
            STOP_FOLLOWING_NAME: "Non seguire più",
            STOP_FOLLOWING_TOOLTIP: "Non seguire più questo file",
            STOP_FOLLOWING_A11Y: "Con questo pulsante si smette di seguire il file.",
            STOP_FOLLOWING_SUCCESS: "Non si sta più seguendo questo file."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Aggiungi a cartella di sincronizzazione",
               TOOLTIP: "Aggiungi questo file alla cartella di sincronizzazione",
               A11Y: "Questo pulsante aggiunge il file alla cartella di sincronizzazione.",
               SUCCESS: "Hai aggiunto questo file alla cartella di sincronizzazione.",
               ERROR: {
                  DEFAULT: "Si è verificato un errore durante l'aggiunta di questo file alla cartella di sincronizzazione. Provare di nuovo in un secondo momento.",
                  UNAUTHENTICATED: "Sessione scaduta. Per aggiungere questo file alla cartella di sincronizzazione, collegarsi di nuovo.",
                  NOT_FOUND: "Non è possibile aggiungere questo file alla cartella di sincronizzazione in quanto è stato eliminato o non è più condiviso con l'utente.",
                  ACCESS_DENIED: "Non è possibile aggiungere questo file alla cartella di sincronizzazione in quanto è stato eliminato o non è più condiviso con l'utente."
               }
            },
            STOP_SYNC: {
               NAME: "Rimuovi dalla cartella di sincronizzazione",
               TOOLTIP: "Rimuovi questo file dalla cartella di sincronizzazione",
               A11Y: "Questo pulsante rimuove il file dalla cartella di sincronizzazione.",
               SUCCESS: "Hai rimosso questo file dalla cartella di sincronizzazione.",
               ERROR: {
                  DEFAULT: "Si è verificato un errore durante la rimozione di questo file dalla cartella di sincronizzazione. Provare di nuovo in un secondo momento.",
                  UNAUTHENTICATED: "Sessione scaduta. Per rimuovere questo file dalla cartella di sincronizzazione, collegarsi di nuovo.",
                  NOT_FOUND: "Non è possibile rimuovere questo file dalla cartella di sincronizzazione in quanto è stato eliminato o non è più condiviso con l'utente.",
                  ACCESS_DENIED: "Non è possibile rimuovere questo file dalla cartella di sincronizzazione in quanto è stato eliminato o non è più condiviso con l'utente."
               }
            },
            MYDRIVE: {
                NAME: "Aggiungi a Unità personale",
                TOOLTIP: "Aggiungi questo file a Unità personale",
                A11Y: "Questo pulsante consente di aggiungere il file a Unità personale.",
                SUCCESS: "Questo file è stato aggiunto a Unità personale.",
                ERROR: {
                   DEFAULT: "Si è verificato un errore durante l'aggiunta del file a Unità personale. Provare di nuovo in un secondo momento.",
                   UNAUTHENTICATED: "Sessione scaduta. Per aggiungere questo file a Unità personale, accedere di nuovo.",
                   NOT_FOUND: "Non è possibile aggiungere questo file a Unità personale in quanto è stato eliminato o non è più condiviso con l'utente.",
                   ACCESS_DENIED: "Non è possibile aggiungere questo file a Unità personale in quanto è stato eliminato o non è più condiviso con l'utente."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Rimuovi da Unità personale",
                TOOLTIP: "Rimuovi questo file da Unità personale",
                A11Y: "Questo pulsante consente di rimuovere il file da Unità personale.",
                SUCCESS: "Questo file è stato rimosso da Unità personale.",
                ERROR: {
                   DEFAULT: "Si è verificato un errore durante la rimozione del file da Unità personale. Provare di nuovo in un secondo momento.",
                   UNAUTHENTICATED: "Sessione scaduta. Per rimuovere questo file da Unità personale, accedere di nuovo.",
                   NOT_FOUND: "Non è possibile rimuovere questo file da Unità personale in quanto è stato eliminato o non è più condiviso con l'utente.",
                   ACCESS_DENIED: "Non è possibile rimuovere questo file da Unità personale in quanto è stato eliminato o non è più condiviso con l'utente."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Metti in evidenza",
            FAVORITE_TOOLTIP: "Metti in evidenza questo file",
            FAVORITE_A11Y: "Questo pulsante mette in evidenza il file.",
            FAVORITE_SUCCESS: "Hai messo in evidenza questo file.",
            STOP_FAVORITEING_NAME: "Annulla messa in evidenza",
            STOP_FAVORITEING_TOOLTIP: "Annulla messa in evidenza di questo file",
            STOP_FAVORITEING_A11Y: "Con questo pulsante si annulla la messa in evidenza del file.",
            STOP_FAVORITEING_SUCCESS: "Hai annullato la messa in evidenza di questo file."
         },
         TRASH: {
            NAME: "Sposta nel cestino",
            DIALOG_TITLE: "Conferma",
            PROMPT: "Spostare questo file nel cestino? Lo spostamento del file nel cestino lo renderà non disponibile a tutti coloro con cui è condiviso.",
            ERROR: "Si è verificato un errore durante l'eliminazione del file. Provare di nuovo in un secondo momento.",
            TOOLTIP: "Elimina questo file",
            OK: "OK",
            CANCEL: "Annulla",
            A11Y: "Questo pulsante sposta il file nel cestino.",
            SUCCESS_MSG: "${file} è stato spostato nel cestino."
         },
         REFRESH: {
            NAME: "Aggiorna",
            ERROR: "Si è verificato un errore durante l'aggiornamento del visualizzatore file. Provare di nuovo in un secondo momento.",
            TOOLTIP: "Aggiorna il visualizzatore file",
            INFO_MSG: "Aggiornare per visualizzare il contenuto più recente. ${link}",
            A11Y: "Questo pulsante sposta il file nel cestino.",
            SUCCESS_MSG: "Il contenuto è stato aggiornato correttamente."
         },
         COPY_FILE: {
            NAME: "Fornisci copia alla comunità",
            DIALOG_TITLE: "Conferma",
            ERROR: "Si è verificato un errore durante la copia del file. Provare di nuovo in un secondo momento.",
            TOOLTIP: "Fornire una copia di questo file a una comunità",
            OK: "OK",
            CANCEL: "Annulla",
            A11Y: "Con questo pulsante si apre una finestra di dialogo che consente di fornire una copia di questo file a una comunità.",
            SUCCESS_MSG: "${file} è stato copiato in ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Trasferisci la propriet\u00e0...",
            DIALOG_TITLE: "Trasferisci la propriet\u00e0",
            TOOLTIP: "Trasferisci questo file a un nuovo proprietario",
            A11Y: "Questo pulsante apre una finestra di dialogo che consente di trasferire questo file a un nuovo proprietario.",
            EMPTY: "Vuoto"
         },
         UPLOAD_VERSION: {
            NAME: "Carica nuova versione",
            NAME_SHORT: "Carica",
            CHANGE_SUMMARY: "Riepilogo modifiche facoltative...",
            TOOLTIP: "Carica una nuova versione di questo file",
            A11Y: "Questo pulsante apre una finestra di dialogo che consente di caricare una nuova versione di questo file."
         },
         LOG_IN: {
            NAME: "Accedi",
            TOOLTIP: "Accedi per caricare e condividere file, commenti e creare cartelle"
         },
         LOCK: {
            NAME: "Blocca file",
            TITLE: "Blocca questo file",
            A11Y: "Blocca questo file",
            SUCCESS: "Il file è bloccato.",
            ERROR: "Impossibile bloccare il file poiché è stato eliminato oppure non è più condiviso con l'utente."
         },
         UNLOCK: {
            NAME: "Sblocca file",
            TITLE: "Sblocca questo file",
            A11Y: "Sblocca questo file",
            SUCCESS: "Il file è sbloccato.",
            ERROR: "Il file non è stato sbloccato in quanto è stato eliminato o non è più condiviso con l'utente."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Modifica sul desktop",
            TITLE: "Modifica sul desktop",
            A11Y: "Modifica sul desktop"
         },
         FLAG: {
            FILE: {
               NAME: "Contrassegna come inappropriato",
               TITLE: "Contrassegna file",
               A11Y: "Contrassegna questo file come inappropriato",
               PROMPT: "Fornire un motivo per il contrassegno di questo file (facoltativo):",
               OK: "Contrassegna",
               CANCEL: "Annulla",
               SUCCESS: "Il file è stato contrassegnato e sottoposto a revisione.",
               ERROR: "Errore durante il contrassegno di questo file, provare di nuovo in un secondo momento."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Riuscita",
               PROMPT: "Il file è stato contrassegnato e sottoposto a revisione.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Contrassegna come inappropriato",
               TITLE: "Contrassegna commento",
               A11Y: "Contrassegna questo commento come inappropriato",
               PROMPT: "Fornire un motivo per il contrassegno di questo commento (facoltativo):",
               OK: "Contrassegna",
               CANCEL: "Annulla",
               SUCCESS: "Il commento è stato contrassegnato e sottoposto a revisione.",
               ERROR: "Errore durante il contrassegno di questo commento, provare di nuovo in un secondo momento."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Riuscita",
            PROMPT: "e modifiche sono state inoltrate per la revisione. Questo file non sarà disponibile fino a che non saranno approvate le modifiche.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Pulsante a discesa"
      },
      SECTION: {
         ABOUT: {
            NAME: "Informazioni su questo file",
            VIEW_FILE_DETAILS: "Visualizza dettagli file",
            A11Y: "L'attivazione di questo collegamento chiuderà il visualizzatore di file e indirizzerà alla pagina dei dettagli del file per questo file."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Nessuna anteprima disponibile per questo file."
         },
         IMAGE: {
            ZOOM_IN: "Zoom in",
            ZOOM_OUT: "Zoom out",
            RESET: "Reimposta",
            ZOOM_IN_A11Y: "Questo pulsante ingrandisce l'immagine.",
            ZOOM_OUT_A11Y: "Questo pulsante riduce l'immagine.",
            RESET_ZOOM_A11Y: "Questo pulsante reimposta il livello di zoom.",
            UNSAFE_PREVIEW: "Questo file non può essere visualizzato in anteprima perché non è stato sottoposto a scansione anti-virus."
         },
         VIEWER: {
            LOADING: "Carica...",
            PUBLISHING: "Pubblicazione in corso...",
            NO_PUBLISHED_VERSION: "Una versione pubblicata di questo file non è disponibile per la visualizzazione.",
            IFRAME_TITLE: "Anteprima di questo file",
            AUTOPUBLISH_TIMEOUT: "Il server sta impiegando troppo tempo a rispondere.  Le ultime modifiche potrebbero non essere state pubblicate."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Questo file non può essere visualizzato in anteprima perché non è stato sottoposto a scansione anti-virus."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Ultimo aggiornamento effettuato da ${user} oggi alle ${time}",
            YESTERDAY: "Ultimo aggiornamento effettuato da ${user} ieri alle ${time}",
            DAY: "Ultimo aggiornamento effettuato da ${user} il ${EEee} alle ${time}",
            MONTH: "Ultimo aggiornamento effettuato da ${user} il ${date_long}",
            YEAR: "Ultimo aggiornamento effettuato da ${user} il ${date_long}"
         },
         CREATED: {
            TODAY: "Creato da ${user} oggi alle ${time}",
            YESTERDAY: "Creato da ${user} ieri alle ${time}",
            DAY: "Creato da ${user} il ${EEee} alle ${time}",
            MONTH: "Creato da ${user} il ${date_long}",
            YEAR: "Creato da ${user} il ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Oggi",
            YESTERDAY: "${time} - Ieri",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Odierno",
            YESTERDAY: "Ieri",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} B",
         KB: "${0} KB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Area del testo del commento",
         SHADOW_TEXT: "Aggiungi un commento...",
         CANNOT_ACCESS_CONTENT: "Le seguenti persone citate non possono visualizzare il commento in quanto non hanno accesso al contenuto:",
         ERROR: "Si è verificato un errore durante la convalida dell'utente che si sta provando a citare.",
         POST: "Pubblica",
         SAVE: "Salva",
         CANCEL: "Annulla",
         EXTERNAL_WARNING: "I commenti potrebbero essere visualizzati da persone esterne alla propria organizzazione."
      },
      EDIT_BOX: {
         SAVE: "Salva",
         CANCEL: {
            TOOLTIP: "Annulla",
            A11Y: "Questo pulsante annulla l'azione di modifica del nome del file."
         },
         INVALID_CHARACTERS: "Carattere non valido",
         INVALID_CHARACTERS_REMOVED: "Caratteri non validi rimossi"
      },
      COMMENT_WIDGET: {
         EDITED: "(Modificato)",
         EDITED_DATE: {
            TODAY: "Modificato oggi alle ${time}",
            YESTERDAY: "Modificato ieri alle ${time}",
            DAY: "Modificato il ${EEee} alle ${time}",
            MONTH: "Modificato ${date_long}",
            YEAR: "Modificato ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Salva",
         CANCEL: "Annulla",
         USER: "Persona",
         COMMUNITY: "Comunità",
         SHARE: "Condividi",
         SHARE_ALT: "Condividi con questa persona",
         MEMBER_TYPE: "Tipo di membro",
         PERSON_SHADOW: "Inserire del testo per trovare una persona",
         COMMUNITY_SHADOW: "Inserire del testo per trovare una comunità",
         PERSON_ARIA: "Inserire del testo per trovare una persona.  Premere Maius + Tab per spostarsi tra persone, comunità e membri nell'organizzazione.",
         COMMUNITY_ARIA: "Inserire del testo per trovare una comunità.  Premere Maius + Tab per spostarsi tra persone, comunità e membri nell'organizzazione.",
         PERSON_FULL_SEARCH: "Persona non elencata? Utilizzare la ricerca completa...",
         COMMUNITY_FULL_SEARCH: "La comunità non è riportata? Utilizzare la ricerca completa...",
         ADD_OPTIONAL_MESSAGE: "Aggiungi un messaggio facoltativo",
         ROLE_LABEL: "Ruolo",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Lettore"
      },
      FILE_STATE: {
         DOCS_FILE: "Questo è un file di Docs. Tutte le modifiche devono essere eseguite online.",
         LOCKED_BY_YOU: {
            TODAY: "Bloccato dall'utente alle ${time}.",
            YESTERDAY: "Bloccato dall'utente ieri alle ${time}.",
            DAY: "Bloccato dall'utente il ${date}.",
            MONTH: "Bloccato dall'utente il ${date}.",
            YEAR: "Bloccato dall'utente il ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Bloccato alle ${time} da ${user}.",
            YESTERDAY: "Bloccato ieri alle ${time} da ${user}.",
            DAY: "Bloccato il ${date} da ${user}.",
            MONTH: "Bloccato il ${date} da ${user}.",
            YEAR: "Bloccato il ${date_long} da ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Abbreviare automaticamente questo testo",
         COMMENT: {
            WARN_TOO_LONG: "Il commento è troppo lungo.",
            TRIM: "Abbreviare il commento?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "La descrizione è troppo lunga.",
            TRIM: "Abbreviare la descrizione?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Il messaggio è troppo lungo.",
            TRIM: "Abbreviare il messaggio?"
         },
         TAG: {
            WARN_TOO_LONG: "Il tag è troppo lungo.",
            TRIM: "Abbreviare tag?"
         },
         TAGS: {
            WARN_TOO_LONG: "Uno o più tag sono troppo lunghi.",
            TRIM: "Abbreviare i tag?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Nome file troppo lungo"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Questo file può essere modificato online da persone che dispongono di HCL Docs.",
         NO_ENTITLEMENT_LINK: "Questo file può essere modificato online da persone che hanno ${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Questo file al momento è in corso di modifica su Web da parte di ${users}.",
         UNPUBLISHED_CHANGES: "Questa bozza contiene delle modifiche che non sono state pubblicate come versione.",
         PUBLISH_A_VERSION: "Pubblica una versione",
         PUBLISH_SUCCESS: "È stata correttamente pubblicata una versione di questo file",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "La versione non è stata pubblicata in quanto è stato negato l'accesso.",
            NOT_FOUND: "La versione non è stata pubblicata perché il documento non è stato trovato.",
            CANNOT_REACH_REPOSITORY: "La versione non è stata pubblicata in quanto il server Docs non è in grado di connettersi al repository file.",
            QUOTA_VIOLATION: "La versione non è stata pubblicata a causa di limitazioni di spazio. Rimuovere altri file per liberare spazio per pubblicare questa versione.",
            CONVERSION_UNAVAILABLE: "La versione non può essere pubblicata perché il servizio di conversione di Docs non è disponibile. Provare di nuovo in un secondo momento.",
            TOO_LARGE: "La versione non è stata pubblicata perché il documento è troppo grande.",
            CONVERSION_TIMEOUT: "La versione non è stata pubblicata poiché il servizio di conversione di Docs sta impiegando troppo tempo per la conversione del documento. Provare di nuovo in un secondo momento.",
            SERVER_BUSY: "La versione non può essere pubblicata perché il server Docs è occupato. Provare di nuovo in un secondo momento.",
            DEFAULT: "La versione non può essere pubblicata perché il servizio Docs non è disponibile. Provare di nuovo in un secondo momento."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Le modifiche stanno per essere pubblicate. ${startLink}Aggiornare la pagina per visualizzare le modifiche.${endLink}",
            GENERIC: "Per visualizzare le ultime modifiche potrebbe essere necessario aggiornare la pagina.  ${startLink}Aggiorna${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Non esistono commenti.",
         MODERATED: "Il commento è stato sottoposto a revisione e sarà disponibile una volta approvato.",
         ERROR: {
            SAVE: {
               DEFAULT: "Non è stato possibile salvare il commento. Provare di nuovo in un secondo momento.",
               UNAUTHENTICATED: "Sessione scaduta. Prima di poter salvare il commento è necessario effettuare di nuovo l'accesso.",
               NOT_FOUND: "Impossibile salvare il commento poiché il file è stato eliminato oppure non è più condiviso.",
               ACCESS_DENIED: "Impossibile salvare il commento poiché il file è stato eliminato oppure non è più condiviso."
            },
            DELETE: {
               DEFAULT: "Non è stato possibile eliminare il commento. Provare di nuovo in un secondo momento.",
               UNAUTHENTICATED: "Sessione scaduta. Prima di poter eliminare il commento è necessario effettuare di nuovo l'accesso.",
               NOT_FOUND: "Non è stato possibile eliminare il commento poiché il file è stato eliminato o non è più condiviso con l'utente.",
               ACCESS_DENIED: "Non è stato possibile eliminare il commento poiché il file è stato eliminato o non è più condiviso con l'utente."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Salva",
         EDIT_TAGS: "Modifica tag",
         ERROR: {
            SAVE: {
               DEFAULT: "Non è stato possibile creare il tag. Provare di nuovo in un secondo momento."
            },
            DELETE: {
               DEFAULT: "Non è stato possibile eliminare il tag. Provare di nuovo in un secondo momento."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Leggi altro...",
         READ_LESS: "Leggi meno..."
      },
      SHARE: {
         EVERYONE: "Tutti nella mia organizzazione",
         ADD_TOOLTIP: "Salva",
         ROLES: {
            OWNER: "Proprietario",
            EDIT: "Editor",
            VIEW: "Lettori",
            FOLDER: "Condiviso con le cartelle"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Proprietario"
            },
            EDIT: {
               ROLE: "Modifica",
               ADD: "Aggiungi editor"
            },
            VIEW: {
               ROLE: "Lettore",
               ADD: "Aggiungi lettore"
            },
            FOLDER: {
               ADD: "Aggiungi cartelle",
               COMMUNITY_ADD: "Aggiungi alla cartella",
               MOVE: "Sposta nella cartella"
            },
            MULTI: {
               ADD: "Aggiungi persone o comunità",
               ADD_PEOPLE: "Aggiungi persone"
            }
         },
         PUBLIC: {
            SHORT: "Tutti nella mia organizzazione",
            LONG: {
               GENERIC: "Tutti nella tua organizzazione",
               ORG: "Tutti in ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Questo file è già condiviso con ${user}.",
            ERROR: "Impossibile condividere con ${user} in questo momento.",
            SELF: "Non è possibile condividere con sé stessi."
         },
         SHARE_INFO: {
            PROMOTED: "${user} è stato promosso in un ruolo di condivisione superiore."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Condivisione con ${user} riuscita correttamente"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Il file è stato condiviso correttamente."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Messaggio facoltativo..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Utente esterno di provisioning",
               ACTION: "Utente esterno di provisioning...",
               TOOLTIP: "Utente esterno di provisioning",
               DIALOG_TITLE: "Il contenuto non è stato condiviso",
               PROMPT: {
                  NO_ACCOUNT: "Il seguente utente non ha un account e non è stato condiviso alcun contenuto con lui.",
                  INVITE: "Invitare l'utente come guest per condividere con lui il contenuto."
               },
               SUBMIT: "Procedi con l'invito",
               CANCEL: "Annulla",
               ERROR: "Si è verificato un errore durante il provisioning dell'account. Provare di nuovo in un secondo momento.",
               SUCCESS: "Provisioning dell'account utente riuscito correttamente."
            },
            PLURAL: {
               NAME: "Utenti esterni di provisioning",
               ACTION: "Utenti esterni di provisioning...",
               TOOLTIP: "Utenti esterni di provisioning",
               DIALOG_TITLE: "Il contenuto non è stato condiviso",
               PROMPT: {
                  NO_ACCOUNT: "I seguenti utenti non hanno un account e non è stato condiviso alcun contenuto con loro.",
                  INVITE: "Invitare questi utenti come guest in modo da condividere con loro del contenuto."
               },
               SUBMIT: "Procedi con gli inviti",
               CANCEL: "Annulla",
               ERROR: "Si è verificato un errore durante il provisioning degli account. Provare di nuovo in un secondo momento.",
               SUCCESS: "Provisioning degli account utente riuscito correttamente."
            },
            ABSTRACT: {
               NAME: "Utenti esterni di provisioning",
               ACTION: "Utenti esterni di provisioning...",
               TOOLTIP: "Utenti esterni di provisioning",
               DIALOG_TITLE: "Il contenuto non è stato condiviso",
               PROMPT: {
                  NO_ACCOUNT: "Alcuni utenti non hanno un account e non è stato condiviso alcun contenuto con loro.",
                  INVITE: "Invitare questi utenti come guest in modo da condividere con loro del contenuto."
               },
               SUBMIT: "Procedi con gli inviti",
               CANCEL: "Annulla",
               ERROR: "Si è verificato un errore durante il provisioning degli account. Provare di nuovo in un secondo momento.",
               SUCCESS: "Provisioning degli account utente riuscito correttamente."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opzioni di condivisione",
         PROPAGATION: "Consenti ad altri di condividere questo file",
         EVERYONE: "Tutti possono condividere questo file.",
         OWNER_ONLY: "Questo file può essere condiviso soltanto dal proprietario.",
         STOP_SHARE: "Interrompi condivisione",
         MAKE_INTERNAL: "Interrompi condivisione esterna",
         MAKE_INTERNAL_SUCCESS: "Questo file non può più essere condiviso con persone esterne all'organizzazione.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Rendere interno?",
            PROMPT: "Rendendo questo file interno il file non sarà più condiviso con persone esterne all'organizzazione. ${br}${br}" +
            "Tutte le condivisioni con persone, comunità o cartelle esterne saranno rimosse.${br}${br}L'operazione di rendere un file interno è permanente e non può essere annullata.",
            EFSS: {
               DIALOG_TITLE: "Rendere interno?",
               PROMPT: "Rendendo questo file interno il file non sarà più condiviso con persone esterne all'organizzazione. ${br}${br}" +
               "Qualsiasi condivisione con persone esterne o cartelle sarà rimossa.${br}${br}L'operazione per rendere un file interno è permanente e non può essere annullata."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Interrompi condivisione file",
            PROMPT: "Smettere di condividere questo file?",
            QUESTION_PUBLIC: "Il file non sarà più visibile per tutti nell'organizzazione né sarà condiviso con persone, cartelle o comunità. Questa operazione non può essere annullata.",
            QUESTION_PUBLIC_E: "Il file non sarà più visibile a tutti nella propria organizzazione né sarà condiviso con persone o cartelle. Questa operazione non può essere annullata.",
            QUESTION: "Il file non sarà più condiviso con persone o comunità e sarà rimosso da tutte le cartelle tranne che dalle cartelle private. Questa azione non può essere annullata.",
            QUESTION_E: "Questo file non sarà più condiviso con le persone e sarà rimosso da tutte le cartelle tranne che dalle cartelle private. Questa azione non può essere annullata."
         },
         MAKE_PRIVATE_SUCCESS: "Questo file adesso è privato.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Impossibile smettere di condividere il file. Provare di nuovo in un secondo momento."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Condivisioni personali"
      },
      STREAM: {
         LOADING: "Carica...",
         LOAD_MORE: "Carica altri elementi..."
      },
      ENTRY: {
         REMOVE: "Rimuovi",
         RESTORE: "Ripristina",
         EDIT: "Modifica",
         DELETE: "Elimina",
         OK: "OK",
         CANCEL: "Annulla",
         USER_PICTURE: "Immagine di ${0}",
         FLAG: "Contrassegna come inappropriato"
      },
      PANEL: {
         LOAD_ERROR: "Si è verificato un errore durante l'accesso ai metadati di questo file.",
         ABOUT: {
            TITLE: "Informazioni",
            EXPAND_BUTTON: "Espandi questo pulsante per visualizzare ulteriori informazioni",
            CURRENT_VERSION_HEADER: "Versione corrente ${versionNumber}",
            FILE_SIZE_HEADER: "Dimensione file",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versione corrente",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Tutte le versioni",
            DOCS_DRAFT_UPDATED_HEADER: "Bozza modificata",
            DOCS_DRAFT_CREATED_HEADER: "Bozza creata",
            DOCS_UPDATED_HEADER: "Pubblicato",
            DOCS_CREATED_HEADER: "Creato",
            UPDATED_HEADER: "Aggiornato",
            CREATED_HEADER: "Creato",
            LIKES_HEADER: "Preferenze",
            LIKES_EXPAND_ICON: "Espandi questa icona per visualizzare chi ha aggiunto una preferenza al file",
            DOWNLOADS_HEADER: "Viste",
            DOWNLOADS_HEADER_MORE: "Viste (${0})",
            DOWNLOADS_EXPAND_ICON: "Espandere questa icona per visualizzare chi ha visualizzato il file",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} in maniera anonima",
            DOWNLOADS_LATEST_VERSION: "È disponibile l'ultima versione di questo file",
            DOWNLOADS_LAST_VERSION: "Hai visualizzato l'ultima versione ${0} di questo file",
            TAGS_HEADER: "Tag",
            DESCRIPTION_HEADER: "Descrizione",
            DESCRIPTION_READ_MORE: "Leggi altro...",
            LINKS_HEADER: "Collegamento",
            SECURITY: "Sicurezza",
            FILE_ENCRYPTED: "Il contenuto del file è crittografato. Non è possibile effettuare ricerche nel contenuto di file crittografati. Il contenuto dei file non potrà essere visualizzato o modificato con HCL Docs.",
            GET_LINKS: "Ottieni collegamenti...",
            ADD_DESCRIPTION: "Aggiungi una descrizione",
            NO_DESCRIPTION: "Nessuna descrizione",
            ADD_TAGS: "Aggiungi tag",
            NO_TAGS: "Nessun tag"
         },
         COMMENTS: {
            TITLE: "Commenti",
            TITLE_WITH_COUNT: "Commenti (${0})",
            VERSION: "Versione ${0}",
            FEED_LINK: "Feed per questi commenti",
            FEED_TITLE: "Seguire le modifiche a questi commenti attraverso il lettore feed"
         },
         SHARING: {
            TITLE: "Condivisione",
            TITLE_WITH_COUNT: "Condiviso (${0})",
            SHARED_WITH_FOLDERS: "Condiviso con le cartelle - ${count}",
            SEE_WHO_HAS_SHARED: "Visualizza chi ha condiviso",
            COMMUNITY_FILE: "I file di proprietà di una comunità non possono essere condivisi con persone o altre comunità.",
            SHARED_WITH_COMMUNITY: "Condiviso con i membri della comunità '${0}'",
            LOGIN: "Accedi",
            NO_SHARE: "Questo file non è ancora stato aggiunto ad alcuna cartella.",
            ONE_SHARE: "Questo file si trova in una cartella o in una comunità a cui non si ha accesso.",
            MULTIPLE_SHARE: "Questo file è in ${fileNumber} cartelle o comunità a cui non si ha accesso."
         },
         VERSIONS: {
            TITLE: "Versioni",
            TITLE_WITH_COUNT: "Versioni (${0})",
            FEED_LINK: "Feed per queste versioni",
            FEED_TITLE: "Seguire le modifiche a questo file tramite il lettore feed"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Conferma azione",
         DIALOG_TITLE: "Conferma",
         PROMPT: "Eseguire questa azione?",
         ERROR: "Si è verificato un errore durante l'esecuzione dell'azione. Provare di nuovo in un secondo momento.",
         TOOLTIP: "Azione Esegui",
         OK: "OK",
         CANCEL: "Annulla",
         A11Y: "Questo pulsante esegue l'azione corrente."
      },
      THUMBNAIL: {
         TITLE: "Miniatura",
         CHANGE_LINK: "Modifica miniatura...",
         ERROR: "La miniatura non è stata salvata. Provare di nuovo in un secondo momento.",
         EXT_ERROR: "Selezionare un file con una delle seguenti estensioni supportate: ${0}",
         SUCCESS: "La miniatura è stata modificata",
         UPLOAD: "Salva",
         CANCEL: "Annulla"
      },
      UPLOAD_VERSION: {
         LINK: "Carica nuova versione...",
         CHANGE_SUMMARY: "Riepilogo modifiche facoltative...",
         ERROR: "La nuova versione non è stata salvata. Provare di nuovo in un secondo momento.",
         SUCCESS: "La nuova versione è stata salvata",
         UPLOAD: "Carica",
         UPLOAD_AND_CHANGE_EXTENSION: "Carica e modifica estensione",
         CANCEL: "Annulla",
         TOO_LARGE: "${file} è maggiore della dimensione file ${size} consentita.",
         PROGRESS_BAR_TITLE: "Caricamento della nuova versione (${uploaded} di ${total} completo)",
         CANCEL_UPLOAD: "Annulla caricamento"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Si è verificato un errore durante l'accesso al file. Provare di nuovo in un secondo momento.",
         UNAUTHENTICATED: "Sessione scaduta. Per poter visualizzare il file, è necessario effettuare di nuovo l'accesso.",
         NOT_FOUND: "Il file richiesto è stato eliminato o spostato. Se questo collegamento è stato inviato da qualcuno, controllare che sia corretto.",
         ACCESS_DENIED: "Non si dispone dell'autorizzazione per visualizzare questo file. Il file non è condiviso con l'utente.",
         ACCESS_DENIED_ANON: "Non si dispone dell'autorizzazione per visualizzare questo file. Se questo è il proprio file o è stato condiviso, effettuare prima l'accesso."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Errore",
         PROMPT: "Il file richiesto è stato eliminato o spostato.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Conferma",
        PROMPT: "La sessione di HCL Connections è scaduta.${lineBreaks}Fare clic su OK per collegarsi di nuovo o su Annulla per chiudere questa finestra di dialogo.",
        OK: "OK",
        CANCEL: "Annulla"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Impossibile accedere al link",
        PROMPT: "Si è verificato un problema durante l'accesso al link.${lineBreaks}Fare clic suOK per essere reindirizzato alla pagina.",
        OK: "OK",
        CANCEL: "Annulla"
      },
      LOAD_ERROR: {
         DEFAULT: "Siamo spiacenti. Si è verificato un errore durante l'accesso al collegamento.",
         ACCESS_DENIED: "Contattare il proprietario del file per richiedere l'autorizzazione per visualizzare il file."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - File",
         LOAD_ERROR: "Errore durante l'accesso al file"
      },
      SHARE_WITH_LINK: {
         TITLE: "Condividi con collegamento",
         EMPTY_DESCRIPTION: "Non hai ancora creato un collegamento per questo file. Creare un collegamento condiviso da inviare ad altre persone in modo che queste possano visualizzare in anteprima e scaricare il file.",
         CREATE_LINK: "Crea un collegamento",
         COPY_LINK: "Copia collegamento",
         DELETE_LINK: "Elimina collegamento",
         ACCESS_TYPE_1: "Chiunque con il collegamento può visualizzare questo file",
         ACCESS_TYPE_2: "Le persone nella mia organizzazione possono visualizzare questo file",
         ACCESS_TYPE_1_DESCRIPTION: "Le persone che hanno il collegamento possono visualizzare in anteprima e scaricare questo file dopo aver effettuato l'accesso a Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Le persone nella mia organizzazione che hanno il collegamento possono visualizzare in anteprima e scaricare questo file dopo aver effettuato l'accesso a Connections.",
         CHANGE_TYPE_SUCCESS: "Autorizzazioni per il collegamento aggiornate durante la modifica del tipo di accesso.",
         CHANGE_TYPE_ERROR: "Aggiornamento delle autorizzazioni per il collegamento durante la modifica del tipo di accesso non riuscito.",
         COPY_LINK_SUCCESS: "Collegamento copiato negli appunti",
         CREATE_SHARELINK_SUCCESS:"Link creato correttamente.",
         CREATE_SHARELINK_ERROR:"Impossibile creare un link a causa di un errore.",
         DELETE_SHARELINK_SUCCESS: "Eliminato il collegamento condiviso per \"${file}.\"",
         DELETE_SHARELINK_ERROR: "Il collegamento condiviso non è stato eliminato. Riprovare in seguito.",
         CONFIRM_DIALOG: {
            OK: "Elimina",
            DIALOG_TITLE: "Elimina il collegamento condiviso",
            PROMPT: "Questo file diventerà inaccessibile a chiunque abbia il collegamento. Eliminare il collegamento condiviso?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Il collegamento condiviso è attivo. Chiunque con il collegamento può visualizzare questo file. Fare clic per copiare il collegamento.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Il collegamento condiviso è attivo. Le persone nella mia organizzazione possono visualizzare questo file. Fare clic per copiare il collegamento."
      }
});
