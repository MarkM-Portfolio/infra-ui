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
loadingText: "Încărcare...",

//common strings
errorText: "Eroare",

invalidASConfig: "Există o eroare la configurarea pentru fluxul Actualizări. Vă rugăm să vă contactaţi administratorul.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografia lui ${0}",
// ${0}  :  Application
eventFromText: "Eveniment de la ${0}",
removeNewsItemText: "Ştergeţi acest articol ",
// ${0}  :  Number of likes for a news item
tagsText: "Taguri: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} aprecieri",
likeText: "1 apreciere",
imageNotAvailable: "Previzualizarea nu este disponibilă momentan",
likeError: "A apărut o eroare când aţi apreciat acest articol.",
unLikeError: "A apărut o eroare când aţi anulat aprecierea acestui articol.",
// ${0} author name
fromText: "De la: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Eroare de descărcare",
downloadErrorMessage: "Fişierul nu a putu fi descărcat. Este posibil să fi fost şters sau este posibil să nu aveţi acces la acesta.",
closeText: "închidere",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Aceasta este o legătură la profilul ${0}",

// Files News Items
publicText: "Public",
privateText: "Privat",

// Video Preview
ariaPlayVideo: "Redare video",
ariaVideoArea: "Zona video, apăsaţi ENTER pentru a accesa controlerele de video.",

// News Item Actions - Comment
commentText: "Comentariu",
logInText: "Logare",
logInCommentText: "Logaţi-vă pentru a comenta",
deleteCommentText: "Ştergere comentariu",
addCommentText: "Adăugaţi un comentariu...",
ariaAddCommentText: "Adăugaţi un comentariu",
writeCommentText: "Scrieţi ceva...",
ariaCommentText: "Scrieţi ceva",
commentNotPermittedText: "Nu sunteţi autorizat să faceţi comentarii pe acest mesaj.",
commentFailureText: "Încercarea de adăugare a unui comentariu text a eşuat. Vă rugăm să reîmprospătaţi pagina şi să încercaţi din nou.",
commentSessionTimedOut: "Aţi fost delogat automat de la server din cauza inactivităţii. Copiaţi textul pe care l-aţi introdus în clipboard ca să nu-l pierdeţi, apoi <a href : ''${0}''>logaţi-vă</a> pentru a începe din nou.",
commentPostText: "Postare",
commentCancelText: "Anulare",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Comentariul este prea lung pentru a fi postat. Vă rugăm să amendaţi comentariul şi să încercaţi din nou.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Comentariul dumneavoastră a fost postat.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} a scris un comentariu la ${1}",
// same as above, but for replies
replyAriaLabel: "${0} a scris un răspuns pe ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Vizualizare articol în fereastră nouă pe pagina ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} a scris un comentariu la ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} a scris un răspuns la ${1}",

// News Item Actions - Save
savedText: "Salvat",
savedSuccessText: "Salvat cu succes",

// No Content Item
noContentText: "Nu există actualizări de afişat.",

// News Feed Error
feedErrorText: "A fost o eroare la extragerea alimentării dumneavoastră de noutăţi.",
itemErrorText: "A apărut o eroare la afişarea unui articol din alimentarea dumneavoastră.",
errorAlt : "Eroare:",
errorShowMore: "Afişaţi mai mult",
errorShowLess: "Afişaţi mai puţin",

// Paging Handler
backToTopText: "Înapoi sus",
ariaShowMore: "Afişaţi mai multe articole din fluxul de activităţi",
ariaShowLess: "Afişaţi mai puţine articole din fluxul de activităţi",
ariaBackToTop: "Înapoi sus la articolele fluxului de activităţi",

// Feed Link
feedLinkText: "Alimentare pentru aceste intrări",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "încă ${0} comentarii",
oneMoreCommentsText: "încă 1 comentariu",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Afişare toate cele ${0} comentarii ",
singleCommentText: "Afişare comentariu",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Comentarii pentru ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Comentarii pentru ${0} . Utilizaţi Detalii suplimentare pentru a afişa toate cele ${1} comentarii.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "articol",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Flux activitate",

// Filters
selectFilter: "Selectaţi un filtru",
filterAriaDescription: "Selectaţi un filtru pentru a modifica tipul de articole afişat în Fluxul de activităţi",
filterAriaLabel: "Filtraţi fluxul de activităţi",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Apăsaţi pe tasta Enter pentru a afişa mai multe detalii despre acest articol",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Afişare Acţiuni",

ariaActionsToolbar: "Acţiuni articol",

// Description for EE opener
openEEText: "Afişaţi mai multe detalii despre acest articol",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Ştergeţi acest mesaj",
statusRemoveConfirmMessageText: "Sunteţi sigur că doriţi să ştergeţi acest mesaj?",
statusRemoveConfirmText: "Ştergere",
statusRemoveCancelText: "Anulare",
statusRemoveConfirmationMsg:  "Mesajul a fost şters cu succes.",
statusRemoveErrorMsg: "Mesajul nu a putut fi şters în acest moment. Încercaţi din nou sau contactaţi un administrator.",
commentRemoveText: "Ştergeţi acest comentariu",
commentRemoveConfirmMessageText: "Sunteţi sigur că vreţi să ştergeţi acest comentariu?",
commentRemoveConfirmText: "Ştergere",
commentRemoveCancelText: "Anulare",
commentRemoveConfirmationMsg: "Comentariul a fost şters cu succes.",
commentRemoveErrorMsg: "Comentariul nu a putut fi şters în acest moment. Încercaţi din nou sau contactaţi un administrator.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Caractere rămase",

// Message
msgCloseAlt: "Închidere mesaj",

//More Less Link
showMoreText: "Afişaţi mai mult",
showLessText: "Afişaţi mai puţin",
showMoreActions: "Mai multe...",

ariaShowMoreLabel: "Acest buton este utilizat pentru afişare conţinut care a fost ascuns în scopuri de afişare. Irelevant pentru utilizatorii tehnologiei de ajutor.",


//Tags
listTags: "${0} şi încă ${1}",

//Trends
expandTrend: "Expandaţi filtrul Tendinţe",
collapseTrend: "Restrângeţi filtrul Tendinţe",
trendTitle: "Tendinţe",
relatedTrendTitle: "Adăugare tendinţa ''${0}''",
trendHelp: "Ajutor tendinţe",
closeTrendHelp: "Închideţi ajutor tendinţe",
trendDescription: "O tendinţă este un cuvânt cheie care este generat de sistem pentru a simplifica realizarea căutării în Actualizări de status. Faceţi clic pe o tendinţă pentru a afişa rezultatele căutării care au fost alocate acelui cuvânt cheie.",
noTrends: "Nu sunt tendinţe încă",
selectedTrends: "Tendinţe selectate",
relatedTrends: "Tendinţe înrudite",
relatedTrendsDesc: "Adăugaţi o tendinţă înrudită pentru a rafina mai mult căutarea dumneavoastră",
removeTrend: "Înlăturaţi tendinţa ''${0}'' din tendinţele filtrului selectate",
removeGeneric: "Înlăturare",
removeHashtag: "Înlăturaţi hashtag-ul ''${0}'' din tagurile filtrului selectate",

//ActivityStream search
asSearchLabel: "Căutaţi în fluxul de curent",
asSearchShadowtext: "Căutaţi acest flux",
asSearchBarOpen: "Deschideţi bara de căutare pentru a căuta în vizualizarea curentă",
asSearchBarCancel: "Anulaţi căutarea şi reveniţi la ecranul principal",
asSearch: "Căutare",
asSearchGlobalView: "Vizualizaţi rezultatele de căutare din tot conţinutul dvs.",

matching: "Potrivire:",
matchingAllOf: "Potrivire cu toate dintre:",


//ViewAll extension
viewAllUpdates: "Vizualizaţi toate actualizările",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} a fost menţionat",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} au fost menţionaţi",

// String for new filter
filterMention: "@Menţiuni",

// Aria string for mentions
ariaFilterMention: "Menţiuni",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} la ${time}",
// e.g. June 6th
timeMonth: "${d} ${MMM}",
// e.g. Today at 11:23
timeToday: "Azi la ${time}",
// e.g. June 6th, 2011
timeYear: "${d} ${MMM}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Ieri la ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Mâine la ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Toate",
filterStatusUpdates: "Actualizări status",
filterActivities: "Activităţi",
filterBlogs: "Bloguri",
filterBookmarks: "Semne de carte",
filterCommunities: "Comunităţi",
filterFiles: "Fişiere",
filterForums: "Forumuri",
filterPeople: "Persoane",
filterProfiles: "Profiluri",
filterWikis: "Wiki-uri",
filterTags: "Taguri",
filterLibraries: "Biblioteci",
filterMyNetworkAndPeopleIFollow: "Reţeaua mea şi Persoane pe care le urmăresc",
filterMyNetwork: "Reţeaua mea",
filterPeopleIFollow: "Persoane pe care le urmăresc",
filterMyUpdates: "Actualizările mele",
filterCommunitiesIFollow: "Comunităţi pe care le urmăresc",
filterForMe: "Pentru mine",
filterFromMe: "De la mine",

// Label for filters - used by gadget
viewFilterLabel: "Sub-vizualizare:",
filterOneLabel: "Filtrare după:",
filterTwoLabel: "Afişare:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Urmăresc",
viewStatusUpdates: "Actualizări status",
viewActionRequired: "Acţiune necesară",
viewSaved: "Salvat",
viewMyNotifications: "Notificările mele",
viewDiscover: "Descoperire",
viewRecentUpdates: "Actualizări recente",

// Aria label for As View Side Nav
ariaASViews: "Vizualizare flux de activităţi",

selectedLabel: "Selectat",

// Gadget title
asTitle: "Actualizări Connections",

// Used by gadget in Notes
updatesFromSender: "Actualizări de la Expeditor",
updatesFromContact: "Actualizări de la Contact",
updatesForUser: "Actualizări de la utilizator",
updatesFor: "Actualizări pentru ${0}",
noUser: "Nu a fost găsit niciun utilizator pentru această adresă de e-mail: ${0}",
returnMainView: "Întoarcere",

//External Application Text
externalApplication: "Aplicaţie externă",

//Strings for expanding comments inline
showPreviousComments: "Afişare comentarii anteriore...",
hideAdditionalComments: "Ascundere comentarii suplimentare...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} din ${1}",
errorRetrieveComments: "A apărut o eroare la extragerea comentariilor anterioare.",
errorRetrieveCommentsDeleted: "A apărut o eroare la extragerea comentariilor anterioare. Articolul s-ar putea să fie şters.",

// News Item Actions - Repost
repostText: "Re-postare",
logInRepostText: "Logaţi-vă pentru a reposta",
repostMsgSuccess: "Actualizarea a fost re-postată cu succes pentru urmăritorii dumneavoastră.",
repostMsgFail: "A fost o eroare la repostarea acestui mesaj.",
repostMsgErrorResGeneric: "Nu sunteţi autorizat să repostaţi acest mesaj.",
repostMsgErrorRestricted: "Acest mesaj nu poate fi repostat la comunitatea ${0}, care este acum o comunitate restricţionată.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Faceţi clic aici pentru a căuta tagul ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Această legătură se va deschide într-o nouă fereastră.",
attachFile : "Adăugaţi un fişier",
removeFileAttachment: "Înlăturaţi ataşamentul fişier",

// External users 
externalUsersCommentsMsg: "Comentariile ar putea fi văzute de oameni din afara organizaţiei dumneavoastră.",
externalUsersStatusUpdatesMsg: "Actualizările de status pot fi văzute de persoane din afara organizaţiei dumneavoastră.",
externalUsersItemMsg: "Partajat extern",

// Notifications Center
ariaNotificationCenter: "Centru de notificare - Vedeţi actualizările legate de conţinutul dumneavoastră şi notificările primite",
allNotifications : "Toate notificările",
seeAllNotifications : "Vizualizare toate",
ariaSeeAllNotifications : "Faceţi clic aici pentru a vă deplasa la vizualizarea Notificările mele din pagina Acasă.",
notificationsTitle : "Notificări",
notificationsSettings : "Setări",
ariaNotificationsSettings : "Faceţi clic aici pentru a vă deplasa la pagina cu setările de notificare.",
ariaNewNotification : "Titlu notificare nouă. ${0}",
newNotifications: "${0} notificări noi",
loadingNotifications: "Încărcare...",
noNewNotifications: "Nu aţi primit nicio notificare în ultima săptămână.",
markRead: "Marcare ca şi citit",
markUnread: "Marcare ca necitit",
markAllRead: "Marcare toate ca citite",
markAllReadDetails: "Faceţi clic aici pentru a marca toate notificările ca citite.",
notificationPopupSingleGeneric: "Aveţi o notificare nouă.",
notificationPopupGeneric: "Aveţi ${0} notificări noi"
});

