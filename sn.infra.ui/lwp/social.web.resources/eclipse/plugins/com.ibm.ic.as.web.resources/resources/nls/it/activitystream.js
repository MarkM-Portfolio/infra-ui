/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// 5724-E76                                                          
// NLS_ENCODING : UNICODE
// NLS_MESSAGEFORMAT_VAR
//// G11N GA UI

// Component ID key required by msgID tool.

// Activity Stream Strings

// //// G11N GA UI
// NLS_CHARSET : UTF-8
define({      

//loading string
loadingText: "Caricamento...",

//common strings
errorText: "Errore",

invalidASConfig: "Si è verificato un errore con la configurazione per lo stream Aggiornamenti. Rivolgersi all'amministratore.",

// News Item
// ${0}  :  Person display name
photoOfText: "Foto di ${0}",
// ${0}  :  Application
eventFromText: "Evento da ${0}",
removeNewsItemText: "Elimina questo elemento ",
// ${0}  :  Number of likes for a news item
tagsText: "Tag: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} preferenze",
likeText: "1 preferenza",
imageNotAvailable: "Anteprima non disponibile",
likeError: "Si è verificato un errore durante l'aggiunta della preferenza a questo elemento.",
unLikeError: "Si è verificato un errore durante l'eliminazione della preferenza da questo elemento.",
// ${0} author name
fromText: "Da: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Errore di download",
downloadErrorMessage: "Impossibile scaricare il file. Potrebbe essere stato eliminato o non si dispone dell'accesso.",
closeText: "chiudi",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Questo è un collegamento al profilo di ${0}",

// Files News Items
publicText: "Pubblico",
privateText: "Privata",

// Video Preview
ariaPlayVideo: "Riproduci video",
ariaVideoArea: "Area video, premere INVIO per accedere ai controller video",

// News Item Actions - Comment
commentText: "Commento",
logInText: "Collega",
logInCommentText: "Accedi a commento",
deleteCommentText: "Elimina commento",
addCommentText: "Aggiungi un commento...",
ariaAddCommentText: "Aggiungi un commento",
writeCommentText: "Scrivi qualcosa...",
ariaCommentText: "Scrivi qualcosa",
commentNotPermittedText: "Non sei autorizzato ad aggiungere commenti a questo messaggio.",
commentFailureText: "Il tentativo di aggiunta di un testo di commento non è riuscito. Aggiornare la pagina e riprovare.",
commentSessionTimedOut: "L''utente è stato scollegato automaticamente dal server a causa di inattività. Copiare il testo immesso negli appunti in modo che non vada perso, quindi <a href : ''${0}''>accedere</a> per iniziare daccapo.",
commentPostText: "Pubblica",
commentCancelText: "Annulla",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Il commento è troppo lungo per essere pubblicato. Accorciare il commento e provare di nuovo.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Il commento è stato pubblicato.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} ha scritto un commento su ${1}",
// same as above, but for replies
replyAriaLabel: "${0} ha risposto a ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Visualizza elemento in una nuova finestra sulla pagina ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} ha scritto un commento su ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} ha risposto alle ${1}",

// News Item Actions - Save
savedText: "Salvato",
savedSuccessText: "Salvato correttamente",

// No Content Item
noContentText: "Non sono presenti aggiornamenti da visualizzare.",

// News Feed Error
feedErrorText: "Si è verificato un errore durante il richiamo del feed Notizie.",
itemErrorText: "Si è verificato un errore durante la visualizzazione di un elemento nel feed.",
errorAlt : "Errore:",
errorShowMore: "Mostra altro",
errorShowLess: "Mostra meno",

// Paging Handler
backToTopText: "Torna all'inizio",
ariaShowMore: "Mostra elementi del flusso di attività",
ariaShowLess: "Mostra meno elementi del flusso di attività",
ariaBackToTop: "Torna all'inizio degli elementi del flusso di attività",

// Feed Link
feedLinkText: "Feed per queste voci",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} altri commenti",
oneMoreCommentsText: "1 altro commento",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Mostra tutti ${0} commenti ",
singleCommentText: "Mostra commento",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Commenti per ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Commenti per ${0}. Utilizzare maggiori i dettagli per visualizzare tutti i ${1} commenti.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "elemento",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Flusso di attività",

// Filters
selectFilter: "Seleziona un filtro",
filterAriaDescription: "Selezionare un filtro per modificare il tipo di elementi visualizzato sul flusso di attività.",
filterAriaLabel: "Filtra flusso di attività",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Premere un tasto qualsiasi per visualizzare maggiori dettagli su questo elemento",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Mostra azioni",

ariaActionsToolbar: "Azioni dell'elemento",

// Description for EE opener
openEEText: "Mostra ulteriori dettagli su questo elemento",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Elimina questo messaggio",
statusRemoveConfirmMessageText: "Eliminare questo messaggio?",
statusRemoveConfirmText: "Elimina",
statusRemoveCancelText: "Annulla",
statusRemoveConfirmationMsg:  "Il messaggio è stato eliminato correttamente.",
statusRemoveErrorMsg: "Impossibile eliminare il messaggio. Provare di nuovo o contattare un amministratore.",
commentRemoveText: "Elimina questo commento",
commentRemoveConfirmMessageText: "Eliminare questo commento?",
commentRemoveConfirmText: "Elimina",
commentRemoveCancelText: "Annulla",
commentRemoveConfirmationMsg: "Il commento è stato eliminato correttamente.",
commentRemoveErrorMsg: "Impossibile eliminare il commento. Provare di nuovo o contattare un amministratore.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Caratteri rimanenti",

// Message
msgCloseAlt: "Chiudi messaggio",

//More Less Link
showMoreText: "Mostra altro",
showLessText: "Mostra meno",
showMoreActions: "Altro...",

ariaShowMoreLabel: "Questo pulsante è utilizzato per visualizzare il contenuto che è stato nascosto per scopi di visualizzazione. Non rilevante per gli utenti della tecnologia assistiva.",


//Tags
listTags: "${0} e ${1} altro",

//Trends
expandTrend: "Espandi il filtro andamenti",
collapseTrend: "Comprimi il filtro andamenti",
trendTitle: "Tendenza",
relatedTrendTitle: "Aggiungi la tendenza ''${0}''",
trendHelp: "Guida di Tendenza",
closeTrendHelp: "Chiudi guida di Tendenza",
trendDescription: "Una tendenza è una parola chiave generata dal sistema per semplificare l'esecuzione delle ricerche negli aggiornamenti dello stato. Fare clic su una tendenza per visualizzare i risultati della ricerca assegnati a tale parola chiave.",
noTrends: "Nessuna tendenza ancora",
selectedTrends: "Tendenze selezionate",
relatedTrends: "Tendenze correlate",
relatedTrendsDesc: "Aggiungi una tendenza correlata per restringere ulteriormente la ricerca",
removeTrend: "Rimuovi la tendenza ''${0}'' dalle tendenze del filtro selezionato",
removeGeneric: "Rimuovi",
removeHashtag: "Rimuovi l''hashtag ${0} dai tag del filtro selezionato",

//ActivityStream search
asSearchLabel: "Cerca nel flusso corrente",
asSearchShadowtext: "Cerca in questo flusso",
asSearchBarOpen: "Apri la barra di ricerca per ricercare nella vista corrente",
asSearchBarCancel: "Annulla la ricerca e torna alla vista principale",
asSearch: "Cerca",
asSearchGlobalView: "Visualizza risultati della ricerca da tutto il contenuto",

matching: "Corrispondenza:",
matchingAllOf: "Corrispondenza con tutti di:",


//ViewAll extension
viewAllUpdates: "Visualizza tutti gli aggiornamenti",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} è stato citato",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} sono stati citati",

// String for new filter
filterMention: "@Citazioni",

// Aria string for mentions
ariaFilterMention: "Citazioni",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} alle ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Oggi alle ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Ieri alle ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Domani alle ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Tutto",
filterStatusUpdates: "Aggiornamenti dello stato",
filterActivities: "Attività",
filterBlogs: "Blog",
filterBookmarks: "Segnalibri",
filterCommunities: "Comunità",
filterFiles: "File",
filterForums: "Forum",
filterPeople: "Persone",
filterProfiles: "Profili",
filterWikis: "Wiki",
filterTags: "Tag",
filterLibraries: "Librerie",
filterMyNetworkAndPeopleIFollow: "Rete personale e persone che seguo",
filterMyNetwork: "Rete personale",
filterPeopleIFollow: "Persone che seguo",
filterMyUpdates: "Aggiornamenti personali",
filterCommunitiesIFollow: "Comunità che l'utente segue",
filterForMe: "Per me",
filterFromMe: "Da me",

// Label for filters - used by gadget
viewFilterLabel: "Vista secondaria:",
filterOneLabel: "Filtra per:",
filterTwoLabel: "Mostra:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Sto seguendo",
viewStatusUpdates: "Aggiornamenti dello stato",
viewActionRequired: "Azione necessaria",
viewSaved: "Salvato",
viewMyNotifications: "Notifiche personali",
viewDiscover: "Scopri",
viewRecentUpdates: "Aggiornamenti recenti",

// Aria label for As View Side Nav
ariaASViews: "Viste flusso di attività",

selectedLabel: "Selezionato",

// Gadget title
asTitle: "Aggiornamenti di Connections",

// Used by gadget in Notes
updatesFromSender: "Aggiornamenti dal mittente",
updatesFromContact: "Aggiornamenti dal contatto",
updatesForUser: "Aggiornamenti per l'utente",
updatesFor: "Aggiornamenti per ${0}",
noUser: "Non è stato trovato alcun utente per questo indirizzo email: ${0}",
returnMainView: "Torna",

//External Application Text
externalApplication: "Applicazione esterna",

//Strings for expanding comments inline
showPreviousComments: "Mostra commenti precedenti...",
hideAdditionalComments: "Nascondi commenti aggiuntivi...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} di ${1}",
errorRetrieveComments: "Si è verificato un errore durante il richiamo dei commenti precedenti.",
errorRetrieveCommentsDeleted: "Si è verificato un errore durante il richiamo dei commenti precedenti. L'elemento potrebbe essere stato eliminato.",

// News Item Actions - Repost
repostText: "Ripubblica",
logInRepostText: "Accedi per ripubblicare",
repostMsgSuccess: "L'aggiornamento è stato ripubblicato correttamente per le persone che seguono l'utente.",
repostMsgFail: "Si è verificato un errore nella ripubblicazione di questo messaggio.",
repostMsgErrorResGeneric: "Non si dispone dell'autorizzazione per ripubblicare questo messaggio.",
repostMsgErrorRestricted: "Questo messaggio non può essere ripubblicato in quanto la comunità ${0} adesso è una comunità limitata.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Fare clic qui per ricercare il tag ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Questo collegamento consentirà di aprire una nuova finestra.",
attachFile : "Aggiungi un file",
removeFileAttachment: "Rimuovi allegato file",

// External users 
externalUsersCommentsMsg: "I commenti potrebbero essere visualizzati da persone esterne alla propria organizzazione.",
externalUsersStatusUpdatesMsg: "Gli aggiornamenti dello stato potrebbero essere visualizzati da persone esterne alla propria organizzazione.",
externalUsersItemMsg: "Condiviso esternamente",

// Notifications Center
ariaNotificationCenter: "Centro di notifica - Visualizza gli aggiornamenti e commenti correlati al proprio contenuto e le notifiche ricevute",
allNotifications : "Tutte le notifiche",
seeAllNotifications : "Visualizza tutto",
ariaSeeAllNotifications : "Fare clic qui per passare alla vista Notifiche personali in Homepage",
notificationsTitle : "Notifiche",
notificationsSettings : "Impostazioni",
ariaNotificationsSettings : "Fare clic qui per passare alla pagina delle impostazioni per le notifiche",
ariaNewNotification : "Titolo nuova notifica. ${0}",
newNotifications: "${0} nuove notifiche",
loadingNotifications: "Caricamento...",
noNewNotifications: "Non sono state ricevute notifiche nell'ultima settimana.",
markRead: "Contrassegna come letto",
markUnread: "Contrassegna come non letto",
markAllRead: "Contrassegna tutto come letto",
markAllReadDetails: "Fare clic qui per contrassegnare tutte le notifiche come lette.",
notificationPopupSingleGeneric: "Hai 1 nuova notifica",
notificationPopupGeneric: "Hai ${0} nuove notifiche"
});

