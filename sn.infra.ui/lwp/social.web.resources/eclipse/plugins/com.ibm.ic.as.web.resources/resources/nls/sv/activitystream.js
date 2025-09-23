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
loadingText: "Laddar...",

//common strings
errorText: "Fel",

invalidASConfig: "Det uppstod ett fel i konfigurationen för uppdateringsströmmen. Kontakta administratören.",

// News Item
// ${0}  :  Person display name
photoOfText: "Foto på ${0}",
// ${0}  :  Application
eventFromText: "Händelse från ${0}",
removeNewsItemText: "Ta bort det här objektet ",
// ${0}  :  Number of likes for a news item
tagsText: "Taggar: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} gillanden",
likeText: "1 gillande",
imageNotAvailable: "Förhandsgranskningen är inte tillgänglig",
likeError: "Det uppstod ett fel när det här objektet gillades.",
unLikeError: "Det uppstod ett fel när gillandet av det här objektet skulle ångras.",
// ${0} author name
fromText: "Från: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Nedladdningsfel",
downloadErrorMessage: "Det gick inte att ladda ned filen. Den har eventuellt tagits bort eller så har du inte åtkomst till den.",
closeText: "Stäng",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Länk till profilen för ${0}",

// Files News Items
publicText: "Gemensam",
privateText: "Privat",

// Video Preview
ariaPlayVideo: "Spela upp videofilmen",
ariaVideoArea: "Videoområde, tryck på Enter om du vill använda videokontrollerna.",

// News Item Actions - Comment
commentText: "Kommentera",
logInText: "Logga in",
logInCommentText: "Om du vill kommentera måste du logga in",
deleteCommentText: "Ta bort kommentar",
addCommentText: "Lägg till en kommentar...",
ariaAddCommentText: "Lägg till en kommentar",
writeCommentText: "Skriv något...",
ariaCommentText: "Skriv något",
commentNotPermittedText: "Du har inte behörighet att kommentera det här meddelandet.",
commentFailureText: "Det gick inte att lägga till kommentarstexten. Uppdatera sidan och försök sedan igen.",
commentSessionTimedOut: "Du har loggats ut från servern på grund av inaktivitet. Kopiera text i Urklipp så att du inte förlorar den och <a href : ''${0}''>logga in</a> igen.",
commentPostText: "Skicka in",
commentCancelText: "Avbryt",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Kommentaren är för lång. Ändra kommentaren och försök sedan igen.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Din kommentar har skickats in.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} skrev en kommentar ${1}",
// same as above, but for replies
replyAriaLabel: "${0} skrev ett svar ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Visa objektet i ett nytt fönster på sidan ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} skrev en kommentar ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} skrev ett svar ${1}",

// News Item Actions - Save
savedText: "Sparat",
savedSuccessText: "Sparades",

// No Content Item
noContentText: "Det finns inga uppdateringar att visa.",

// News Feed Error
feedErrorText: "Det uppstod ett fel när nyhetsflödet skulle hämtas.",
itemErrorText: "Det uppstod ett fel när ett objekt i flödet skulle visas.",
errorAlt : "Fel:",
errorShowMore: "Visa fler",
errorShowLess: "Visa färre",

// Paging Handler
backToTopText: "Överst",
ariaShowMore: "Visa fler aktivitetsströmsobjekt",
ariaShowLess: "Visa färre aktivitetsströmsobjekt",
ariaBackToTop: "Överst i aktivitetsströmsobjekten",

// Feed Link
feedLinkText: "Flöde för de här posterna",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} till kommentarer",
oneMoreCommentsText: "1 till kommentar",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Visa alla ${0} kommentarer ",
singleCommentText: "Visa kommentar",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Kommentarer till ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Kommentarer till ${0}. Välj att visa fler detaljer om du vill se alla ${1} kommentarer.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "objekt",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Aktivitetsström",

// Filters
selectFilter: "Välj ett filter",
filterAriaDescription: "Om du vill ändra typ av objekt att visa i aktivitetsströmmen väljer du ett filter",
filterAriaLabel: "Filtrera aktivitetsströmmen",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Om du vill visa mer information om det här objektet trycker du på Enter",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Visa åtgärder",

ariaActionsToolbar: "Objekt...",

// Description for EE opener
openEEText: "Visa mer detaljer om det här objektet",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Ta bort det här meddelandet",
statusRemoveConfirmMessageText: "Vill du ta bort det här meddelandet?",
statusRemoveConfirmText: "Ta bort",
statusRemoveCancelText: "Avbryt",
statusRemoveConfirmationMsg:  "Meddelandet togs bort.",
statusRemoveErrorMsg: "Det gick inte att ta bort meddelandet. Försök igen eller kontakta administratören.",
commentRemoveText: "Ta bort den här kommentaren",
commentRemoveConfirmMessageText: "Vill du ta bort den här kommentaren?",
commentRemoveConfirmText: "Ta bort",
commentRemoveCancelText: "Avbryt",
commentRemoveConfirmationMsg: "Kommentaren togs bort.",
commentRemoveErrorMsg: "Det gick inte att ta bort kommentaren. Försök igen eller kontakta administratören.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Återstående antal tecken",

// Message
msgCloseAlt: "Stäng meddelandet",

//More Less Link
showMoreText: "Visa fler",
showLessText: "Visa färre",
showMoreActions: "Mer...",

ariaShowMoreLabel: "Den här knappen används till att visa gömt innehåll. Den är inte relevant för hjälpmedelsteknikanvändare.",


//Tags
listTags: "${0} och ${1} fler",

//Trends
expandTrend: "Expandera filtret för trender",
collapseTrend: "Komprimera filtret för trender",
trendTitle: "Trender",
relatedTrendTitle: "Lägg till trenden ${0}",
trendHelp: "Hjälp för trender",
closeTrendHelp: "Stäng hjälpen för trender",
trendDescription: "Trender är nyckelord som genereras av systemet och som används till att enklare söka i Statusuppdateringar. Klicka på en trend om du vill se sökresultaten.",
noTrends: "Det finns inga trender",
selectedTrends: "Valda trender",
relatedTrends: "Relaterade trender",
relatedTrendsDesc: "Om du vill begränsa sökningen lägger du till en relaterad trend",
removeTrend: "Ta bort trenden ${0} från valda filtertrender",
removeGeneric: "Ta bort",
removeHashtag: "Ta bort #-taggen ${0} från valda filtertaggar.",

//ActivityStream search
asSearchLabel: "Sök i den aktuella strömmen",
asSearchShadowtext: "Sök i den här strömmen",
asSearchBarOpen: "Öppna sökfältet och sök i den aktuella vyn",
asSearchBarCancel: "Avbryt sökningen och gå tillbaka till huvudvyn",
asSearch: "Sök",
asSearchGlobalView: "Visa sökresultat från allt ditt innehåll",

matching: "Som överensstämmer med följande:",
matchingAllOf: "Överensstämmer med alla följande:",


//ViewAll extension
viewAllUpdates: "Visa alla uppdateringar",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} omnämndes",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} omnämndes",

// String for new filter
filterMention: "Omnämnanden",

// Aria string for mentions
ariaFilterMention: "Omnämnanden",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "I dag ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "I går ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "I morgon ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Alla",
filterStatusUpdates: "Statusuppdateringar",
filterActivities: "Aktiviteter",
filterBlogs: "Bloggar",
filterBookmarks: "Bokmärken",
filterCommunities: "Gemenskaper",
filterFiles: "Filer",
filterForums: "Forum",
filterPeople: "Personer",
filterProfiles: "Profiler",
filterWikis: "Wikier",
filterTags: "Taggar",
filterLibraries: "Bibliotek",
filterMyNetworkAndPeopleIFollow: "Mitt nätverk och personer jag följer",
filterMyNetwork: "Mitt nätverk",
filterPeopleIFollow: "Personer jag följer",
filterMyUpdates: "Mina uppdateringar",
filterCommunitiesIFollow: "Gemenskaper jag följer",
filterForMe: "För mig",
filterFromMe: "Från mig",

// Label for filters - used by gadget
viewFilterLabel: "Undervy:",
filterOneLabel: "Filtrera efter:",
filterTwoLabel: "Visa:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Jag följer",
viewStatusUpdates: "Statusuppdateringar",
viewActionRequired: "Kräver åtgärd",
viewSaved: "Sparat",
viewMyNotifications: "Mina aviseringar",
viewDiscover: "Upptäck",
viewRecentUpdates: "Senaste uppdateringar",

// Aria label for As View Side Nav
ariaASViews: "Aktivitetsströmsvyer",

selectedLabel: "Valt",

// Gadget title
asTitle: "Connections-uppdateringar",

// Used by gadget in Notes
updatesFromSender: "Uppdateringar från avsändaren",
updatesFromContact: "Uppdateringar från kontakten",
updatesForUser: "Uppdateringar för användaren",
updatesFor: "Uppdateringar för ${0}",
noUser: "Det gick inte att hitta någon användare med mejladressen ${0}",
returnMainView: "Tillbaka",

//External Application Text
externalApplication: "Extern applikation",

//Strings for expanding comments inline
showPreviousComments: "Visa föregående kommentarer...",
hideAdditionalComments: "Dölj ytterligare kommentarer...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} av ${1}",
errorRetrieveComments: "Det uppstod ett fel när de föregående kommentarerna skulle hämtas.",
errorRetrieveCommentsDeleted: "Det uppstod ett fel när de föregående kommentarerna skulle hämtas. Objektet har eventuellt tagits bort.",

// News Item Actions - Repost
repostText: "Skicka in igen",
logInRepostText: "Om du vill skicka in igen måste du logga in",
repostMsgSuccess: "Uppdateringen skickades in till de som följer dig.",
repostMsgFail: "Det uppstod ett fel när meddelandet skulle skickas igen.",
repostMsgErrorResGeneric: "Du har inte behörighet att skicka in meddelandet igen.",
repostMsgErrorRestricted: "Det går inte att skicka in meddelandet igen eftersom gemenskapen ${0} nu är en begränsad gemenskap.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Klicka här om du vill söka efter taggen ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Den här länken öppnas i ett nytt fönster.",
attachFile : "Lägg till en fil",
removeFileAttachment: "Ta bort filbilaga",

// External users 
externalUsersCommentsMsg: "Personer utanför företaget får se kommentarer.",
externalUsersStatusUpdatesMsg: "Statusuppdateringar kan delas med personer utanför företaget.",
externalUsersItemMsg: "Delas externt",

// Notifications Center
ariaNotificationCenter: "Notification Center - Visa uppdateringar relaterat till innehåll samt aviseringar du har tagit emot.",
allNotifications : "Alla aviseringar",
seeAllNotifications : "Visa alla",
ariaSeeAllNotifications : "Klicka här om du vill gå till Mina aviseringar på hemsidan.",
notificationsTitle : "Aviseringar",
notificationsSettings : "Inställningar",
ariaNotificationsSettings : "Klicka här om du vill gå till aviseringsinställningarna.",
ariaNewNotification : "Ny aviseringsrubrik. ${0}",
newNotifications: "${0} nya aviseringar",
loadingNotifications: "Laddar...",
noNewNotifications: "Du har inte tagit emot någon avisering den senaste veckan.",
markRead: "Markera som läst",
markUnread: "Markera som oläst",
markAllRead: "Markera alla som lästa",
markAllReadDetails: "Klicka här om du vill markera alla aviseringar som lästa.",
notificationPopupSingleGeneric: "Du har 1 ny avisering",
notificationPopupGeneric: "Du har ${0} nya aviseringar"
});

