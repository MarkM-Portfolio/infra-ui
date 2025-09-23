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
loadingText: "Bezig met laden...",

//common strings
errorText: "Fout",

invalidASConfig: "Er is een fout in de configuratie voor de updategegevensstroom. Neem contact op met de beheerder.",

// News Item
// ${0}  :  Person display name
photoOfText: "Foto van ${0}",
// ${0}  :  Application
eventFromText: "Event van ${0}",
removeNewsItemText: "Dit item wissen ",
// ${0}  :  Number of likes for a news item
tagsText: "Tags: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} likes",
likeText: "1 like",
imageNotAvailable: "Preview is op dit moment niet beschikbaar",
likeError: "Er is een fout opgetreden bij het liken van dit item.",
unLikeError: "Er is een fout opgetreden bij het verwijderen van de like van dit item. ",
// ${0} author name
fromText: "Van: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} kB",

//File download strings
downloadError: "Downloadfout",
downloadErrorMessage: "Het bestand kan niet worden gedownload. Het is mogelijk gewist of u hebt er geen toegang toe.",
closeText: "sluiten",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Dit is een link naar het profiel van ${0}",

// Files News Items
publicText: "Openbaar",
privateText: "Besloten",

// Video Preview
ariaPlayVideo: "Video afspelen",
ariaVideoArea: "Video's, druk op Enter om videocontrollers te openen",

// News Item Actions - Comment
commentText: "Reactie",
logInText: "Aanmelden",
logInCommentText: "Aanmelden om een opmerking te maken",
deleteCommentText: "Reactie wissen",
addCommentText: "Reactie toevoegen...",
ariaAddCommentText: "Reactie toevoegen",
writeCommentText: "Schrijf iets...",
ariaCommentText: "Schrijf iets",
commentNotPermittedText: "U bent niet gemachtigd reacties te geven over dit bericht.",
commentFailureText: "De poging om reactietekst op te geven is mislukt. Vernieuw de pagina en probeer het opnieuw. ",
commentSessionTimedOut: "U bent automatisch afgemeld bij de server vanwege inactiviteit. Kopieer de ingevoerde tekst naar het klembord zodat u deze niet kwijt raakt, en <a href : ''${0}''>meld u aan</a> om opnieuw te beginnen. ",
commentPostText: "Posten",
commentCancelText: "Annuleren",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "De reactie is te lang om te worden gepost. Wijzig de reactie en probeer het opnieuw. ",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Uw reactie is gepost.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} heeft een reactie geleverd op ${1}",
// same as above, but for replies
replyAriaLabel: "${0} heeft geantwoord op ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Item afbeelden in nieuw venster op pagina ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} heeft een reactie geleverd om ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} heeft geantwoord om ${1}",

// News Item Actions - Save
savedText: "Opgeslagen",
savedSuccessText: "Met succes opgeslagen",

// No Content Item
noContentText: "Er zijn geen updates om af te beelden.",

// News Feed Error
feedErrorText: "Er is een fout opgetreden tijdens het ophalen van uw nieuwsfeed.",
itemErrorText: "Er is een fout opgetreden bij het afbeelden van een item in uw feed.",
errorAlt : "Fout:",
errorShowMore: "Meer afbeelden",
errorShowLess: "Minder afbeelden",

// Paging Handler
backToTopText: "Terug naar begin",
ariaShowMore: "Meer gegevensstroomitems afbeelden",
ariaShowLess: "Minder gegevensstroomitems afbeelden",
ariaBackToTop: "Terug naar begin van activiteitenstroomitems",

// Feed Link
feedLinkText: "Feed voor deze items",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0}  extra reacties",
oneMoreCommentsText: "1 extra reactie",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Alle ${0} reacties afbeelden ",
singleCommentText: "Reactie afbeelden",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Reacties op ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Reacties voor ${0} . Meer details gebruiken om alle ${1} reacties af te beelden.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "item",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Activiteitenstroom",

// Filters
selectFilter: "Selecteer een filter",
filterAriaDescription: "Selecteer een filter om het type items te wijzigen dat wordt weergegeven in de activiteitenstroom",
filterAriaLabel: "Activiteitenstroom filteren",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Druk op Enter voor meer informatie over dit item.",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Acties afbeelden",

ariaActionsToolbar: "Itemacties",

// Description for EE opener
openEEText: "Meer details over dit item afbeelden",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Dit bericht wissen",
statusRemoveConfirmMessageText: "Weet u zeker dat u dit bericht wilt wissen?",
statusRemoveConfirmText: "Delete",
statusRemoveCancelText: "Annuleren",
statusRemoveConfirmationMsg:  "Bericht is gewist.",
statusRemoveErrorMsg: "Bericht kan op dit moment niet worden gewist. Probeer het opnieuw of neem contact op met de beheerder.",
commentRemoveText: "Deze reactie wissen",
commentRemoveConfirmMessageText: "Weet u zeker dat u deze reactie wilt wissen?",
commentRemoveConfirmText: "Delete",
commentRemoveCancelText: "Annuleren",
commentRemoveConfirmationMsg: "Reactie is gewist.",
commentRemoveErrorMsg: "Reactie kan op dit moment niet worden gewist. Probeer het opnieuw of neem contact op met de beheerder.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Resterende tekens",

// Message
msgCloseAlt: "Bericht sluiten",

//More Less Link
showMoreText: "Meer afbeelden",
showLessText: "Minder afbeelden",
showMoreActions: "Meer...",

ariaShowMoreLabel: "Deze knop wordt gebruikt om content af te beelden die standaard verborgen is. Niet relevant voor gebruikers van hulptechnologie.",


//Tags
listTags: "${0} en ${1} extra",

//Trends
expandTrend: "Het trendsfilter uitvouwen",
collapseTrend: "Het trendsfilter samenvouwen",
trendTitle: "Trending",
relatedTrendTitle: "De trend ''${0}'' toevoegen",
trendHelp: "Help bij Trending",
closeTrendHelp: "Help bij Trending sluiten",
trendDescription: "Een trend is een trefwoord dat door het systeem wordt gegenereerd voor het vereenvoudigen van zoekacties in Statusupdates. Klik op een trend om de zoekresultaten weer te geven waaraan dit trefwoord is toegewezen.",
noTrends: "Nog geen trends",
selectedTrends: "Geselecteerde trends",
relatedTrends: "Verwante trends",
relatedTrendsDesc: "Voeg een verwante trend toe om uw zoekopdracht verder te verfijnen",
removeTrend: "De trend ''${0}'' verwijderen uit de geselecteerde filtertrends",
removeGeneric: "Verwijderen",
removeHashtag: "De hashtag ${0} verwijderen uit de geselecteerde filtertags.",

//ActivityStream search
asSearchLabel: "Zoeken in huidige gegevensstroom",
asSearchShadowtext: "Zoeken in deze gegevensstroom",
asSearchBarOpen: "Zoekbalk openen en zoeken in de huidige view",
asSearchBarCancel: "Zoekactie annuleren en terug naar hoofdview",
asSearch: "Zoeken",
asSearchGlobalView: "Zoekresultaten voor al uw content bekijken",

matching: "Overeenkomend met:",
matchingAllOf: "Komt overeen met alles van:",


//ViewAll extension
viewAllUpdates: "Alle updates bekijken",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0}  is genoemd",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0}  zijn genoemd",

// String for new filter
filterMention: "@Vermeldingen",

// Aria string for mentions
ariaFilterMention: "Vermeldingen",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} om ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Vandaag om ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Gisteren om ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Morgen om ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Alle",
filterStatusUpdates: "Statusupdates",
filterActivities: "Activiteiten",
filterBlogs: "Blogs",
filterBookmarks: "Bladwijzers",
filterCommunities: "Community's",
filterFiles: "Bestanden",
filterForums: "Forums",
filterPeople: "Personen",
filterProfiles: "Profielen",
filterWikis: "Wiki's",
filterTags: "Tags",
filterLibraries: "Bibliotheken",
filterMyNetworkAndPeopleIFollow: "Mijn netwerk en Personen die ik volg",
filterMyNetwork: "Mijn netwerk",
filterPeopleIFollow: "Personen die ik volg",
filterMyUpdates: "Mijn updates",
filterCommunitiesIFollow: "Community's die ik volg",
filterForMe: "Voor mij",
filterFromMe: "Van mij",

// Label for filters - used by gadget
viewFilterLabel: "Subview:",
filterOneLabel: "Filteren op:",
filterTwoLabel: "Afbeelden:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Door mij gevolgd",
viewStatusUpdates: "Statusupdates",
viewActionRequired: "Actie vereist",
viewSaved: "Opgeslagen",
viewMyNotifications: "Mijn meldingen",
viewDiscover: "Opsporen",
viewRecentUpdates: "Recente updates",

// Aria label for As View Side Nav
ariaASViews: "Views voor activiteitenstroom",

selectedLabel: "Geselecteerd",

// Gadget title
asTitle: "Connections-updates",

// Used by gadget in Notes
updatesFromSender: "Updates van afzender",
updatesFromContact: "Updates van contactpersoon",
updatesForUser: "Updates voor gebruiker",
updatesFor: "Updates voor ${0}",
noUser: "Er is geen gebruiker gevonden met e-mailadres ${0}",
returnMainView: "Terug",

//External Application Text
externalApplication: "Externe toepassing",

//Strings for expanding comments inline
showPreviousComments: "Eerdere reacties afbeelden...",
hideAdditionalComments: "Aanvullende reacties verbergen...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} van ${1}",
errorRetrieveComments: "Er is een fout opgetreden bij het ophalen van eerdere reacties. ",
errorRetrieveCommentsDeleted: "Er is een fout opgetreden bij het ophalen van eerdere reacties. Mogelijk is het item gewist.",

// News Item Actions - Repost
repostText: "Opnieuw posten",
logInRepostText: "Aanmelden en opnieuw posten",
repostMsgSuccess: "De update is opnieuw gepost naar uw volgers.",
repostMsgFail: "Er is een fout opgetreden bij het opnieuw posten van dit bericht.",
repostMsgErrorResGeneric: "U bent niet gemachtigd om dit bericht opnieuw te posten. ",
repostMsgErrorRestricted: "Dit bericht kan niet opnieuw worden gepost, want community ${0} is nu een besloten community. ",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Klik hier om te zoeken naar de tag ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Met deze link opent u een nieuw venster. ",
attachFile : "Bestand toevoegen",
removeFileAttachment: "Bestandsbijlage verwijderen",

// External users 
externalUsersCommentsMsg: "Reacties zijn zichtbaar voor personen buiten uw organisatie.",
externalUsersStatusUpdatesMsg: "Statusupdates zijn zichtbaar voor personen buiten uw organisatie. ",
externalUsersItemMsg: "Extern gedeeld",

// Notifications Center
ariaNotificationCenter: "Meldingen - Updates voor uw content en ontvangen meldingen bekijken",
allNotifications : "Alle meldingen",
seeAllNotifications : "Alle bekijken",
ariaSeeAllNotifications : "Klik hier om de view Mijn meldingen in de Homepage te openen. ",
notificationsTitle : "Meldingen",
notificationsSettings : "Instellingen",
ariaNotificationsSettings : "Klik hier om de instellingenpagina voor meldingen te openen. ",
ariaNewNotification : "Geen een onderwerptitel op.${0}",
newNotifications: "${0}  nieuwe meldingen",
loadingNotifications: "Bezig met laden...",
noNewNotifications: "U hebt de afgelopen week geen enkele melding ontvangen.",
markRead: "Markeren als gelezen",
markUnread: "Markeren als ongelezen",
markAllRead: "Alle markeren als gelezen",
markAllReadDetails: "Klik hier om alle meldingen te markeren als gelezen.",
notificationPopupSingleGeneric: "U hebt 1 nieuwe melding",
notificationPopupGeneric: "U hebt ${0} nieuwe meldingen"
});

