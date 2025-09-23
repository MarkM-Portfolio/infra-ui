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
loadingText: "S'està carregant...",

//common strings
errorText: "Error",

invalidASConfig: "Hi ha un error a la configuració per a la seqüència d'actualitzacions. Poseu-vos en contacte amb l'administrador.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografia de ${0}",
// ${0}  :  Application
eventFromText: "Esdeveniment des de ${0}",
removeNewsItemText: "Suprimeix aquest element ",
// ${0}  :  Number of likes for a news item
tagsText: "Etiquetes: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} m''agrada",
likeText: "Ha agradat 1 vegada",
imageNotAvailable: "La previsualització no està disponible en aquests moments",
likeError: "S'ha produït un error en recomanar aquest element.",
unLikeError: "S'ha produït un error en eliminar la recomanació d'aquest element.",
// ${0} author name
fromText: "Des: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Error de descàrrega",
downloadErrorMessage: "El fitxer no s'ha pogut descarregar. És possible que s'hagi esborrat de l'aplicació o que no hi tingueu accés.",
closeText: "tanca",
okText: "D'acord",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Aquest és un enllaç al perfil de ${0}",

// Files News Items
publicText: "Públiques",
privateText: "Privat",

// Video Preview
ariaPlayVideo: "Reprodueix vídeo",
ariaVideoArea: "Àrea de vídeo, premeu INTRO per accedir als controladors de vídeo",

// News Item Actions - Comment
commentText: "Comentari",
logInText: "Inicia sessió",
logInCommentText: "Inicieu sessió per comentar",
deleteCommentText: "Suprimeix el comentari",
addCommentText: "Afegeix un comentari...",
ariaAddCommentText: "Afegeix un comentari",
writeCommentText: "Escriviu alguna cosa...",
ariaCommentText: "Escriviu alguna cosa",
commentNotPermittedText: "No teniu autorització per fer comentaris en aquest missatge.",
commentFailureText: "L'intent d'afegir text de comentari ha fallat. Renoveu la pàgina i torneu-ho a intentar.",
commentSessionTimedOut: "Se us ha desconnectat automàticament del servidor per manca d''activitat. Copieu qualsevol text que hàgiu introduït al porta-retalls per no perdre''l i <a href : ''${0}''>inicieu sessió</a> per tornar a començar.",
commentPostText: "Publica",
commentCancelText: "Cancel·la",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "El comentari és massa llarg per publicar-lo. Corregiu el comentari i torneu a provar-ho.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "El vostre comentari s'ha publicat.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} ha escrit un comentari a ${1}",
// same as above, but for replies
replyAriaLabel: "${0} ha escrit una respondre a ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Visualitza l''element en una nova finestra a la pàgina ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} ha escrit un comentari a ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} ha escrit una respondre a ${1}",

// News Item Actions - Save
savedText: "Desat",
savedSuccessText: "S'ha desat correctament",

// No Content Item
noContentText: "No hi ha actualitzacions per mostrar.",

// News Feed Error
feedErrorText: "S'ha produït un error en recuperar el canal d'informació de notícies.",
itemErrorText: "S'ha produït un error en mostrar un element al canal d'informació.",
errorAlt : "Error:",
errorShowMore: "Mostra més",
errorShowLess: "Mostra menys",

// Paging Handler
backToTopText: "Torna a l'inici",
ariaShowMore: "Mostra més elements de la seqüència d'activitats",
ariaShowLess: "Mostra menys elements de la seqüència d'activitats",
ariaBackToTop: "Torna a la part superior dels elements de la seqüència d'activitats",

// Feed Link
feedLinkText: "Canal d'informació per a aquestes entrades",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} comentaris més",
oneMoreCommentsText: "1 comentari més",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Mostra tots els ${0} comentaris ",
singleCommentText: "Mostra comentari",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Comentaris de ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Comentaris per a ${0}. Utilitzeu més informació detallada per mostrar els ${1} comentaris.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "element",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Seqüència d'activitats",

// Filters
selectFilter: "Seleccioneu un filtre",
filterAriaDescription: "Seleccioneu un filtre per canviar el tipus d'elements que es mostren a la seqüència d'activitats.",
filterAriaLabel: "Filtra seqüència d'activitats",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Premeu la tecla Retorn per mostrar més detalls sobre aquest element",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Mostra les accions",

ariaActionsToolbar: "Accions d'elements",

// Description for EE opener
openEEText: "Mostra més detalls sobre aquest element",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Suprimeix aquest missatge",
statusRemoveConfirmMessageText: "Esteu segurs que voleu suprimir aquest missatge?",
statusRemoveConfirmText: "Suprimeix",
statusRemoveCancelText: "Cancel·la",
statusRemoveConfirmationMsg:  "El missatge s'ha suprimit correctament.",
statusRemoveErrorMsg: "El missatge no s'ha pogut suprimir en aquests moments. Torneu-ho a provar o poseu-vos en contacte amb l'administrador.",
commentRemoveText: "Suprimeix aquest comentari",
commentRemoveConfirmMessageText: "Esteu segur que voleu suprimir aquest comentari?",
commentRemoveConfirmText: "Suprimeix",
commentRemoveCancelText: "Cancel·la",
commentRemoveConfirmationMsg: "El comentari s'ha suprimit correctament.",
commentRemoveErrorMsg: "El missatge no s'ha pogut suprimir en aquests moments. Torneu-ho a provar o poseu-vos en contacte amb l'administrador.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Caràcters restants",

// Message
msgCloseAlt: "Tanca missatge",

//More Less Link
showMoreText: "Mostra més",
showLessText: "Mostra menys",
showMoreActions: "Més...",

ariaShowMoreLabel: "Aquest botó s'utilitza per visualitzar contingut que s'ha ocultat per motius de visualització. No és rellevant per als usuaris de tecnologia d'assistència.",


//Tags
listTags: "${0} i ${1} més",

//Trends
expandTrend: "Expandiu el filtre de tendències",
collapseTrend: "Reduïu el filtre de tendències",
trendTitle: "Tendència",
relatedTrendTitle: "Afegeix la tendència ''${0}''",
trendHelp: "Ajuda de tendència",
closeTrendHelp: "Tanca l'ajuda de tendència",
trendDescription: "Una tendència és una paraula clau que genera el sistema per facilitar la cerca a les actualitzacions d'estat. Feu clic a una tendència per mostrar els resultats de cerca amb la paraula clau assignada.",
noTrends: "Encara no hi ha cap tendència",
selectedTrends: "Tendències seleccionades",
relatedTrends: "Tendències relacionades",
relatedTrendsDesc: "Afegiu una tendència per afinar més la cerca",
removeTrend: "Elimina la tendència ''${0}'' de les tendències de filtre seleccionades",
removeGeneric: "Elimina",
removeHashtag: "Elimina l''etiqueta hash ${0} de les etiquetes de filtre seleccionades.",

//ActivityStream search
asSearchLabel: "Cerca a la seqüència actual",
asSearchShadowtext: "Cerca aquesta seqüència",
asSearchBarOpen: "Obre la barra de cerca per cercar la visualització actual",
asSearchBarCancel: "Cancel·la la cerca i torna a la visualització principal",
asSearch: "Cerca",
asSearchGlobalView: "Visualitza els resultats de cerca de tot el contingut",

matching: "Coincident:",
matchingAllOf: "Coincideixen tots de:",


//ViewAll extension
viewAllUpdates: "Mostra totes les actualitzacions",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "S''ha esmentat ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "S''han esmentat ${0}",

// String for new filter
filterMention: "@Mencions",

// Aria string for mentions
ariaFilterMention: "Mencions",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} a les ${time}",
// e.g. June 6th
timeMonth: "${d} de ${MMM}",
// e.g. Today at 11:23
timeToday: "Avui a les ${time}",
// e.g. June 6th, 2011
timeYear: "${d} de ${MMM} de ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Ahir a les ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Demà a les ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Tot",
filterStatusUpdates: "Actualitzacions d'estat",
filterActivities: "Activitats",
filterBlogs: "Blogs",
filterBookmarks: "Adreces d'interès",
filterCommunities: "Comunitats",
filterFiles: "Fitxers",
filterForums: "Fòrums",
filterPeople: "Persones",
filterProfiles: "Perfils",
filterWikis: "Wikis",
filterTags: "Etiquetes",
filterLibraries: "Biblioteques",
filterMyNetworkAndPeopleIFollow: "La meva xarxa i Persones que segueixo",
filterMyNetwork: "La meva xarxa",
filterPeopleIFollow: "Persones que segueixo",
filterMyUpdates: "Les meves actualitzacions",
filterCommunitiesIFollow: "Comunitats que segueixo",
filterForMe: "Per a mi",
filterFromMe: "Meu",

// Label for filters - used by gadget
viewFilterLabel: "Visualitza la subcomunitat:",
filterOneLabel: "Filtra per:",
filterTwoLabel: "Mostra:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Estic seguint",
viewStatusUpdates: "Actualitzacions d'estat",
viewActionRequired: "Acció necessària",
viewSaved: "Desat",
viewMyNotifications: "Les meves notificacions",
viewDiscover: "Descobreix",
viewRecentUpdates: "Actualitzacions recents",

// Aria label for As View Side Nav
ariaASViews: "Vistes de la seqüència d'activitats",

selectedLabel: "Seleccionat",

// Gadget title
asTitle: "Actualitzacions de Connexions",

// Used by gadget in Notes
updatesFromSender: "Actualitzacions de l'emissor",
updatesFromContact: "Actualitzacions del contacte",
updatesForUser: "Actualitzacions per a l'usuari",
updatesFor: "Actualitzacions per a ${0}",
noUser: "No ha trobat cap usuari amb aquesta adreça electrònica: ${0}",
returnMainView: "Retorna",

//External Application Text
externalApplication: "Aplicació externa",

//Strings for expanding comments inline
showPreviousComments: "Mostra els comentaris anteriors...",
hideAdditionalComments: "Oculta els comentaris addicionals...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} de ${1}",
errorRetrieveComments: "S'ha produït un error en recuperar els comentaris anteriors.",
errorRetrieveCommentsDeleted: "S'ha produït un error en recuperar els comentaris anteriors. Es pot suprimir l'element.",

// News Item Actions - Repost
repostText: "Torna a publicar",
logInRepostText: "Inicieu sessió per respondre",
repostMsgSuccess: "L'actualització s'ha enviat correctament als vostres seguidors.",
repostMsgFail: "S'ha produït un error en tornar a publicar el missatge.",
repostMsgErrorResGeneric: "No teniu autorització per tornar a publicar el missatge.",
repostMsgErrorRestricted: "Aquest missatge no es pot tornar a publicar ja que la comunitat ${0} ara és una comunitat restringida.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Feu clic aquí per cercar l''etiqueta ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Aquest enllaç s'obrirà en una finestra nova.",
attachFile : "Afegeix un fitxer",
removeFileAttachment: "Elimina el fitxer adjunt",

// External users 
externalUsersCommentsMsg: "És possible que persones externes a la vostra organització puguin veure els comentaris.",
externalUsersStatusUpdatesMsg: "És possible que persones externes a la vostra organització puguin veure les actualitzacions d'estat.",
externalUsersItemMsg: "Compartit externament",

// Notifications Center
ariaNotificationCenter: "Centre de notificacions - Visualitzeu les actualitzacions relacionades amb els vostres continguts i les notificacions que hàgiu rebut.",
allNotifications : "Totes les notificacions",
seeAllNotifications : "Veure-ho tot",
ariaSeeAllNotifications : "Feu clic aquí per anar a la visualització Les meves notificacions de la Pàgina inicial.",
notificationsTitle : "Notificacions",
notificationsSettings : "Valors",
ariaNotificationsSettings : "Feu clic aquí per anar a la pàgina de paràmetres de notificacions.",
ariaNewNotification : "Nou títol de notificació. ${0}",
newNotifications: "${0} notificacions noves",
loadingNotifications: "S'està carregant...",
noNewNotifications: "No heu rebut cap notificació en la darrera setmana.",
markRead: "Marca com a llegit",
markUnread: "Marca com a no llegit",
markAllRead: "Marca com a tots llegits",
markAllReadDetails: "Feu clic aquí per marcar totes les notificacions com a llegides.",
notificationPopupSingleGeneric: "Teniu 1 notificació nova",
notificationPopupGeneric: "Teniu ${0} notificacions noves"
});

