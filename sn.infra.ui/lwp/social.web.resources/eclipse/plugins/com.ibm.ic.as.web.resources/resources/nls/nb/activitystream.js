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
loadingText: "Laster inn...",

//common strings
errorText: "Feil",

invalidASConfig: "Det oppstod en feil med konfigurasjonen for Oppdateringer-strømmen. Kontakt administratoren.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografi av ${0}",
// ${0}  :  Application
eventFromText: "Hendelse fra ${0}",
removeNewsItemText: "Slett dette elementet ",
// ${0}  :  Number of likes for a news item
tagsText: "Tagger: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} liker",
likeText: "1 liker",
imageNotAvailable: "Forhåndsvisningen er ikke tilgjengelig nå",
likeError: "Det oppstod en feil da du skulle like dette elementet.",
unLikeError: "Det oppstod en feil da du skulle angre Liker for dette elementet.",
// ${0} author name
fromText: "Fra: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} kB",

//File download strings
downloadError: "Nedlastingsfeil",
downloadErrorMessage: "Filen kunne ikke lastes ned. Den kan ha blitt slettet, eller du har kanskje ikke tilgang til den.",
closeText: "lukk",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Dette er en kobling til profilen til ${0}",

// Files News Items
publicText: "Felles",
privateText: "Privat",

// Video Preview
ariaPlayVideo: "Spill av video",
ariaVideoArea: "Videoområde. Trykk på ENTER for å få tilgang til videokontrollere",

// News Item Actions - Comment
commentText: "Kommentar",
logInText: "Logg på",
logInCommentText: "Logg deg på for å kommentere",
deleteCommentText: "Slett kommentar",
addCommentText: "Legg til en kommentar...",
ariaAddCommentText: "Legg til en kommentar",
writeCommentText: "Skriv noe...",
ariaCommentText: "Skriv noe",
commentNotPermittedText: "Du er ikke autorisert for å kommentere denne meldingen.",
commentFailureText: "Forsøk på å legge til kommentartekst mislyktes. Oppdater (forny) siden og prøv igjen.",
commentSessionTimedOut: "Du er blitt automatisk logget av serveren på grunn av inaktivitet. Kopier eventuell tekst du har lagt på utklippstavlen, så du ikke mister den. <a href : ''${0}''>Logg deg på</a> igjen for å starte på nytt.",
commentPostText: "Legg inn",
commentCancelText: "Avbryt",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Kommentaren er for lang til å bli lagt inn. Endre kommentaren og prøv igjen.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Kommentaren din er lagt inn.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} skrev en kommentar den ${1}",
// same as above, but for replies
replyAriaLabel: "${0} skrev et svar til ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Vis element i nytt vindu på ${0}-side. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} skrev en kommentar klokken ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} skrev et svar klokken ${1}",

// News Item Actions - Save
savedText: "Lagret",
savedSuccessText: "Lagringen var vellykket",

// No Content Item
noContentText: "Det er ingen oppdateringer å vise.",

// News Feed Error
feedErrorText: "Det oppstod en feil ved henting av nyhetskanalen din.",
itemErrorText: "Det oppstod en feil ved visning av et element i kanalen din.",
errorAlt : "Feil:",
errorShowMore: "Vis mer",
errorShowLess: "Vis mindre",

// Paging Handler
backToTopText: "Tilbake til toppen",
ariaShowMore: "Vis flere aktivitetsstrømelementer",
ariaShowLess: "Vis færre aktivitetsstrømelementer",
ariaBackToTop: "Tilbake til toppen av aktivitetsstrømelementer",

// Feed Link
feedLinkText: "Kanal for disse oppføringene",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} kommentarer til",
oneMoreCommentsText: "1 kommentar til",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Vis alle ${0} kommentarer ",
singleCommentText: "Vis kommentar",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Kommentarer for ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Kommentarer for ${0} . Bruk flere detaljer til å vise alle ${1} kommentarer.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "element",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Aktivitetsstrøm",

// Filters
selectFilter: "Velg et filter",
filterAriaDescription: "Velg et filter for å endre typen elementer som blir vist i aktivitetsstrømmen",
filterAriaLabel: "Filtrer aktivitetsstrøm",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Trykk på Enter-tasten for å vise flere detaljert om dette elementet",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Vis handlinger",

ariaActionsToolbar: "Elementhandlinger",

// Description for EE opener
openEEText: "Vis flere detaljer om dette elementet",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Slett denne meldingen",
statusRemoveConfirmMessageText: "Er du sikker på at du vil slette denne meldingen?",
statusRemoveConfirmText: "Slett",
statusRemoveCancelText: "Avbryt",
statusRemoveConfirmationMsg:  "Meldingen er slettet.",
statusRemoveErrorMsg: "Meldingen kunne ikke slettes nå. Prøv igjen eller kontakt en administrator.",
commentRemoveText: "Slett denne kommentaren",
commentRemoveConfirmMessageText: "Er du sikker på at du vil slette denne kommentaren?",
commentRemoveConfirmText: "Slett",
commentRemoveCancelText: "Avbryt",
commentRemoveConfirmationMsg: "Kommentaren er slettet.",
commentRemoveErrorMsg: "Kommentaren kunne ikke slettes nå. Prøv igjen eller kontakt en administrator.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Tegn som gjenstår",

// Message
msgCloseAlt: "Lukk melding",

//More Less Link
showMoreText: "Vis mer",
showLessText: "Vis mindre",
showMoreActions: "Mer...",

ariaShowMoreLabel: "Denne knappen brukes til å vise innhold som er skjult for visningsformål. Ikke relevant for brukere med tekniske hjelpefunksjoner.",


//Tags
listTags: "${0} og ${1} til",

//Trends
expandTrend: "Utvid filteret for trender",
collapseTrend: "Komprimer filteret for trender",
trendTitle: "Trender",
relatedTrendTitle: "Legg til trenden ''${0}''",
trendHelp: "Hjelp til Trender",
closeTrendHelp: "Lukk Hjelp til Trender",
trendDescription: "En trend er et nøkkelord som blir generert av systemet for å gjøre det enklere å utføre søk i Statusoppdateringer. Klikk på en trend for å vise søkeresultater som er blitt tildelt det nøkkelordet.",
noTrends: "Ingen trender ennå",
selectedTrends: "Valgte trender",
relatedTrends: "Beslektede trender",
relatedTrendsDesc: "Legg til en beslektet trend for å avgrense søket ytterligere",
removeTrend: "Fjern trenden ''${0}'' fra de valgte filtertrendene",
removeGeneric: "Fjern",
removeHashtag: "Fjern emneknaggen ${0} fra de valgte filtertaggene.",

//ActivityStream search
asSearchLabel: "Søk i gjeldende strøm",
asSearchShadowtext: "Søk i denne strømmen",
asSearchBarOpen: "Åpne søkefeltet for å søke i gjeldende visning",
asSearchBarCancel: "Avbryt søk og gå tilbake til hovedvisningen",
asSearch: "Søk",
asSearchGlobalView: "Vis søkeresultater fra alt innholdet ditt",

matching: "Som samsvarer med:",
matchingAllOf: "Som samsvarer med alle:",


//ViewAll extension
viewAllUpdates: "Vis alle oppdateringer",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} ble omtalt",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} ble omtalt",

// String for new filter
filterMention: "@Omtaler",

// Aria string for mentions
ariaFilterMention: "Omtaler",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} klokken ${time}",
// e.g. June 6th
timeMonth: "${d}. ${MMM}",
// e.g. Today at 11:23
timeToday: "I dag klokken ${time}",
// e.g. June 6th, 2011
timeYear: "${d}. ${MMM}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "I går klokken ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "I morgen klokken ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Alle",
filterStatusUpdates: "Statusoppdateringer",
filterActivities: "Aktiviteter",
filterBlogs: "Blogger",
filterBookmarks: "Bokmerker",
filterCommunities: "Fellesskap",
filterFiles: "Filer",
filterForums: "Fora",
filterPeople: "Personer",
filterProfiles: "Profiler",
filterWikis: "Wikier",
filterTags: "Tagger",
filterLibraries: "Biblioteker",
filterMyNetworkAndPeopleIFollow: "Mitt nettverk og personer jeg følger",
filterMyNetwork: "Mitt nettverk",
filterPeopleIFollow: "Personer jeg følger",
filterMyUpdates: "Mine oppdateringer",
filterCommunitiesIFollow: "Fellesskap jeg følger",
filterForMe: "For meg",
filterFromMe: "Fra meg",

// Label for filters - used by gadget
viewFilterLabel: "Delvisning:",
filterOneLabel: "Filtrer etter:",
filterTwoLabel: "Vis:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Jeg følger",
viewStatusUpdates: "Statusoppdateringer",
viewActionRequired: "Handling kreves",
viewSaved: "Lagret",
viewMyNotifications: "Mine varsler",
viewDiscover: "Oppdag",
viewRecentUpdates: "Nyeste oppdateringer",

// Aria label for As View Side Nav
ariaASViews: "Aktivitetsstrømvisninger",

selectedLabel: "Valgt",

// Gadget title
asTitle: "Connections-oppdateringer",

// Used by gadget in Notes
updatesFromSender: "Oppdater fra avsender",
updatesFromContact: "Oppdateringer fra kontakt",
updatesForUser: "Oppdateringer for bruker",
updatesFor: "Oppdateringer for ${0}",
noUser: "Fant ingen bruker for denne e-postadressen: ${0}",
returnMainView: "Gå tilbake",

//External Application Text
externalApplication: "Ekstern applikasjon",

//Strings for expanding comments inline
showPreviousComments: "Vis tidligere kommentarer...",
hideAdditionalComments: "Skjul ekstra kommentarer...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} av ${1}",
errorRetrieveComments: "Det oppstod en feil ved henting av tidligere kommentarer.",
errorRetrieveCommentsDeleted: "Det oppstod en feil ved henting av tidligere kommentarer. Elementet kan være slettet.",

// News Item Actions - Repost
repostText: "Legg inn på nytt",
logInRepostText: "Logg deg på for å legge inn på nytt",
repostMsgSuccess: "Oppdateringen din ble lagt inn på nytt til dem som følger deg.",
repostMsgFail: "Det oppstod en feil da denne meldingen skulle legges inn på nytt.",
repostMsgErrorResGeneric: "Du er ikke autorisert for å legge inn denne meldingen på nytt.",
repostMsgErrorRestricted: "Denne meldingen kan ikke legges inn på nytt, fordi fellesskapet ${0} nå er et begrenset fellesskap.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Klikk her for å søke etter taggen ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Denne koblingen åpnes i et nytt vindu.",
attachFile : "Legg til en fil",
removeFileAttachment: "Fjern filvedlegg",

// External users 
externalUsersCommentsMsg: "Kommentarer kan ses av personer utenfor organisasjonen.",
externalUsersStatusUpdatesMsg: "Statusoppdateringer kan ses av personer utenfor organisasjonen.",
externalUsersItemMsg: "Delt eksternt",

// Notifications Center
ariaNotificationCenter: "Varslingssenter - Vis oppdateringer knyttet til innholdet ditt og varsler du har mottatt",
allNotifications : "Alle varsler",
seeAllNotifications : "Se alle",
ariaSeeAllNotifications : "Klikk her for å gå til visningen Mine varsler på hjemmesiden.",
notificationsTitle : "Varsler",
notificationsSettings : "Innstillinger",
ariaNotificationsSettings : "Klikk her for å gå til siden med varslingsinnstillinger",
ariaNewNotification : "Ny varslingstittel. ${0}",
newNotifications: "${0} nye varsler",
loadingNotifications: "Laster inn...",
noNewNotifications: "Du har ikke mottatt noen varsler siste uke.",
markRead: "Merk som lest",
markUnread: "Merk som ulest",
markAllRead: "Merk alle som leste",
markAllReadDetails: "Klikk her for å merke alle varsler som leste.",
notificationPopupSingleGeneric: "Du har 1 nytt varsel",
notificationPopupGeneric: "Du har ${0} nye varsler"
});

