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
loadingText: "Indlæser...",

//common strings
errorText: "Fejl",

invalidASConfig: "Der er en fejl i konfigurationen af opdateringsstrømmen. Kontakt administratoren.",

// News Item
// ${0}  :  Person display name
photoOfText: "Foto af ${0}",
// ${0}  :  Application
eventFromText: "Begivenhed fra ${0}",
removeNewsItemText: "Slet dette element ",
// ${0}  :  Number of likes for a news item
tagsText: "Emneord: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} synes godt om-tilkendegivelser",
likeText: "1 synes godt om-tilkendegivelse",
imageNotAvailable: "Forhåndsvisning er ikke tilgængelig i øjeblikket",
likeError: "Der er opstået en fejl, da du syntes godt om dette element.",
unLikeError: "Der er opstået en fejl, da du fjernede synes godt om-tilkendegivelsen for dette element.",
// ${0} author name
fromText: "Fra: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Downloadningsfejl",
downloadErrorMessage: "Filen kan ikke downloades. Den kan være slettet, eller du har ikke adgang til den.",
closeText: "Luk",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Dette er et link til profilen for ${0}",

// Files News Items
publicText: "Offentlig",
privateText: "Privat",

// Video Preview
ariaPlayVideo: "Afspil video",
ariaVideoArea: "Videoområde. Tryk på Enter for at få adgang til kontrolelementerne til video.",

// News Item Actions - Comment
commentText: "Kommentar",
logInText: "Log på",
logInCommentText: "Log på for at kommentere",
deleteCommentText: "Slet kommentar",
addCommentText: "Tilføj en kommentar...",
ariaAddCommentText: "Tilføj en kommentar",
writeCommentText: "Skriv noget...",
ariaCommentText: "Skriv noget",
commentNotPermittedText: "Du har ikke tilladelse til at kommentere denne meddelelse.",
commentFailureText: "Fejl i forsøg på at tilføje kommentartekst. Opfrisk siden, og prøv igen.",
commentSessionTimedOut: "Du er blevet logget af serveren automatisk på grund af manglende aktivitet. Kopiér den tekst, du har skrevet, til udklipsholderen, så du ikke mister den, og <a href : ''${0}''>log på</a> for at starte forfra.",
commentPostText: "Slå op",
commentCancelText: "Annullér",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Kommentaren er for lang til at blive slået op. Ret kommentaren, og prøv igen.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Din kommentar er slået op.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} skrev en kommentar ${1}",
// same as above, but for replies
replyAriaLabel: "${0} skrev et svar ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Vis element i et nyt vindue på siden ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} skrev en kommentar kl. ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} skrev et svar kl. ${1}",

// News Item Actions - Save
savedText: "Gemt",
savedSuccessText: "Gemt",

// No Content Item
noContentText: "Der er ingen opdateringer at vise.",

// News Feed Error
feedErrorText: "Der er opstået en fejl under hentning af din nyhedsfeed.",
itemErrorText: "Der er opstået en fejl under fremvisningen af et element i din feed.",
errorAlt : "Fejl:",
errorShowMore: "Vis mere",
errorShowLess: "Vis mindre",

// Paging Handler
backToTopText: "Tilbage til toppen",
ariaShowMore: "Vis flere elementer i aktivitetsstrøm",
ariaShowLess: "Vis færre elementer i aktivitetsstrøm",
ariaBackToTop: "Tilbage til toppen af elementer i aktivitetsstrøm",

// Feed Link
feedLinkText: "Feed for disse indgange",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} kommentarer mere",
oneMoreCommentsText: "1 kommentar mere",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Vis alle ${0} kommentarer ",
singleCommentText: "Vis kommentar",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Kommentarer til ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Kommentarer til ${0}. Brug flere detaljer til at få alle ${1} kommentarer vist.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "element",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Aktivitetsstrøm",

// Filters
selectFilter: "Vælg et filter",
filterAriaDescription: "Vælg et filter for at ændre typen af elementer, der vises i aktivitetsstrømmen.",
filterAriaLabel: "Filtrér aktivitetsstrøm",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Tryk på Enter-tasten for at få vist flere oplysninger om dette element",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Vis handlinger",

ariaActionsToolbar: "Handlinger for element",

// Description for EE opener
openEEText: "Vis flere oplysninger om dette element",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Slet denne meddelelse",
statusRemoveConfirmMessageText: "Er du sikker på, at du vil slette denne meddelelse?",
statusRemoveConfirmText: "Slet",
statusRemoveCancelText: "Annullér",
statusRemoveConfirmationMsg:  "Meddelelsen er slettet.",
statusRemoveErrorMsg: "Meddelelsen kan ikke slettes på nuværende tidspunkt. Prøv igen, eller kontakt administratoren.",
commentRemoveText: "Slet denne kommentar",
commentRemoveConfirmMessageText: "Er du sikker på, at du vil slette denne kommentar?",
commentRemoveConfirmText: "Slet",
commentRemoveCancelText: "Annullér",
commentRemoveConfirmationMsg: "Kommentaren er slettet.",
commentRemoveErrorMsg: "Kommentaren kan ikke slettes på nuværende tidspunkt. Prøv igen, eller kontakt administratoren.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Tegn tilbage",

// Message
msgCloseAlt: "Luk besked",

//More Less Link
showMoreText: "Vis mere",
showLessText: "Vis mindre",
showMoreActions: "Mere...",

ariaShowMoreLabel: "Denne knap bruges til at vise indhold, som er skjult af hensyn til fremvisningen. Ikke relevant for brugere af hjælpeteknologi.",


//Tags
listTags: "${0} og ${1} flere",

//Trends
expandTrend: "Udvid tendensfilter",
collapseTrend: "Skjul tendensfilter",
trendTitle: "Tendenser",
relatedTrendTitle: "Tilføj tendensen ''${0}''",
trendHelp: "Hjælp til tendenser",
closeTrendHelp: "Luk hjælpen til tendenser",
trendDescription: "En tendens er et nøgleord, som er genereret af systemet, og som gør det lettere at søge i statusopdateringer. Klik på en tendens for at få vist søgeresultater, som er knyttet til nøgleordet.",
noTrends: "Ingen tendenser endnu",
selectedTrends: "Valgte tendenser",
relatedTrends: "Relaterede tendenser",
relatedTrendsDesc: "Tilføj en relateret tendens for at indsnævre søgningen yderligere",
removeTrend: "Fjern tendensen ''${0}'' fra de valgte filtertendenser",
removeGeneric: "Fjern",
removeHashtag: "Fjern hashtagget ${0} fra de valgte filteremneord.",

//ActivityStream search
asSearchLabel: "Søg i den aktuelle strøm",
asSearchShadowtext: "Søg i denne strøm",
asSearchBarOpen: "Åbn søgelinjen for at søge i den aktuelle oversigt",
asSearchBarCancel: "Annullér søgningen, og vend tilbage til hovedoversigten",
asSearch: "Søg",
asSearchGlobalView: "Vis søgeresultater fra alt dit indhold",

matching: "Matcher:",
matchingAllOf: "Matcher alle af:",


//ViewAll extension
viewAllUpdates: "Vis alle opdateringer",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} blev omtalt",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} blev omtalt",

// String for new filter
filterMention: "@omtale",

// Aria string for mentions
ariaFilterMention: "Omtale",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} kl. ${time}",
// e.g. June 6th
timeMonth: "${d}. ${MMM}",
// e.g. Today at 11:23
timeToday: "I dag kl. ${time}",
// e.g. June 6th, 2011
timeYear: "${d}. ${MMM} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "I går kl. ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "I morgen kl. ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Alle",
filterStatusUpdates: "Statusopdateringer",
filterActivities: "Aktiviteter",
filterBlogs: "Blogge",
filterBookmarks: "Bogmærker",
filterCommunities: "Fællesskaber",
filterFiles: "Filer",
filterForums: "Forummer",
filterPeople: "Personer",
filterProfiles: "Profiler",
filterWikis: "Wikier",
filterTags: "Emneord",
filterLibraries: "Biblioteker",
filterMyNetworkAndPeopleIFollow: "Mit netværk og Personer, jeg følger.",
filterMyNetwork: "Mit netværk",
filterPeopleIFollow: "Personer, jeg følger",
filterMyUpdates: "Mine opdateringer",
filterCommunitiesIFollow: "Fællesskaber, jeg følger",
filterForMe: "Til mig",
filterFromMe: "Fra mig",

// Label for filters - used by gadget
viewFilterLabel: "Underoversigt:",
filterOneLabel: "Filtrér efter:",
filterTwoLabel: "Vis:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Jeg følger",
viewStatusUpdates: "Statusopdateringer",
viewActionRequired: "Handling påkrævet",
viewSaved: "Gemte",
viewMyNotifications: "Mine notifikationer",
viewDiscover: "Opdag",
viewRecentUpdates: "Seneste opdateringer",

// Aria label for As View Side Nav
ariaASViews: "Oversigter over aktivitetsstrøm",

selectedLabel: "Valgt",

// Gadget title
asTitle: "Forbindelsesopdateringer",

// Used by gadget in Notes
updatesFromSender: "Opdateringer fra afsender",
updatesFromContact: "Opdateringer fra kontakt",
updatesForUser: "Opdateringer for bruger",
updatesFor: "Opdateringer for ${0}",
noUser: "Der er ikke fundet nogen bruger for denne e-mailadresse: ${0}",
returnMainView: "Retur",

//External Application Text
externalApplication: "Ekstern applikation",

//Strings for expanding comments inline
showPreviousComments: "Vis tidligere kommentarer...",
hideAdditionalComments: "Skjul yderligere kommentarer...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} af ${1}",
errorRetrieveComments: "Der er opstået en fejl under hentning af tidligere kommentarer.",
errorRetrieveCommentsDeleted: "Der er opstået en fejl under hentning af tidligere kommentarer. Elementet kan være slettet.",

// News Item Actions - Repost
repostText: "Genopslå",
logInRepostText: "Log på for at genopslå",
repostMsgSuccess: "Opdateringen er genopslået til dine følgere.",
repostMsgFail: "Der er opstået en fejl under genopslag af denne meddelelse.",
repostMsgErrorResGeneric: "Du har ikke tilladelse til at genopslå denne meddelelse.",
repostMsgErrorRestricted: "Denne meddelelse kan ikke genopslås, fordi fællesskabet ${0} er nu et begrænset fællesskab.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Klik her for at søge efter emneordet ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Dette link åbner i et nyt vindue.",
attachFile : "Tilføj en fil",
removeFileAttachment: "Fjern vedhæftning",

// External users 
externalUsersCommentsMsg: "Kommentarer kan læses af personer uden for din organisation.",
externalUsersStatusUpdatesMsg: "Statusopdateringer kan måske læses af personer uden for din organisation.",
externalUsersItemMsg: "Delt eksternt",

// Notifications Center
ariaNotificationCenter: "Notifikationscenter - Vis opdateringer til dit indhold samt notifikationer, du har modtaget",
allNotifications : "Alle notifikationer",
seeAllNotifications : "Se alle",
ariaSeeAllNotifications : "Klik her for at skifte til oversigten Mine notifikationer på hjemmesiden",
notificationsTitle : "Notifikationer",
notificationsSettings : "Indstillinger",
ariaNotificationsSettings : "Klik her for at gå til siden med notifikationsindstillinger",
ariaNewNotification : "Titel på ny notifikation. ${0}",
newNotifications: "${0} nye notifikationer",
loadingNotifications: "Indlæser...",
noNewNotifications: "Du har ikke modtaget nogen notifikationer i den seneste uge.",
markRead: "Markér som læst",
markUnread: "Markér som ulæst",
markAllRead: "Markér alle som læst",
markAllReadDetails: "Klik her for at markere alle notifikationer som læst.",
notificationPopupSingleGeneric: "Du har 1 ny notifikation",
notificationPopupGeneric: "Du har ${0} nye notifikationer"
});

