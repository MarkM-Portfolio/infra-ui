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
loadingText: "Nalaganje ...",

//common strings
errorText: "Napaka",

invalidASConfig: "V konfiguraciji za tok posodobitev je prišlo do napake. Obrnite se na skrbnika.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografija osebe ${0}",
// ${0}  :  Application
eventFromText: "Dogodek iz ${0}",
removeNewsItemText: "Izbriši to postavko ",
// ${0}  :  Number of likes for a news item
tagsText: "Oznake: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "Št. všečnosti: ${0}",
likeText: "1 všečnost",
imageNotAvailable: "Predogled trenutno ni na voljo",
likeError: "Med povezovanjem te postavke je prišlo do napake.",
unLikeError: "Med odstranjevanjem povezave te postavke je prišlo do napake.",
// ${0} author name
fromText: "Od: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Napaka pri prenosu",
downloadErrorMessage: "Datoteke ni bilo mogoče prenesti. Lahko je bila izbrisana ali pa nimate dostopa do nje.",
closeText: "zapri",
okText: "V redu",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "To je povezava na profil osebe ${0}",

// Files News Items
publicText: "Javno",
privateText: "Zasebno",

// Video Preview
ariaPlayVideo: "Predvajaj video",
ariaVideoArea: "Področje videa, za dostop do video kontrolnikov pritisnite ENTER",

// News Item Actions - Comment
commentText: "Komentar",
logInText: "Prijava",
logInCommentText: "Prijavite se, če želite komentirati",
deleteCommentText: "Izbriši komentar",
addCommentText: "Dodaj komentar ...",
ariaAddCommentText: "Dodaj komentar",
writeCommentText: "Napišite nekaj ...",
ariaCommentText: "Napišite nekaj",
commentNotPermittedText: "Nimate pooblastila za komentiranje tega sporočila.",
commentFailureText: "Poskus dodajanja besedila komentarja ni uspel. Osvežite stran in poskusite znova.",
commentSessionTimedOut: "Zaradi nedejavnosti ste bili samodejno odjavljeni s strežnika. Poljubno vneseno besedilo prekopirajte v odložišče, da ga ne izgubite, nato se <a href : ''${0}''>prijavite</a>, da začnete od začetka.",
commentPostText: "Objavi",
commentCancelText: "Prekliči",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Komentar je predolg za objavo. Spremenite komentar in poskusite znova.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Vaš komentar je bil objavljen.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "Oseba ${0} je napisala komentar dne ${1}",
// same as above, but for replies
replyAriaLabel: "Oseba ${0} je napisala odgovor dne ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Prikaži postavko v novem oknu na strani ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "Oseba ${0} je napisala komentar ob ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "Oseba ${0} je napisala odgovor ob ${1}",

// News Item Actions - Save
savedText: "Shranjeno",
savedSuccessText: "Uspešno shranjeno",

// No Content Item
noContentText: "Ni posodobitev za prikaz.",

// News Feed Error
feedErrorText: "Pri pridobivanju vira novic je prišlo do napake.",
itemErrorText: "Med prikazom postavke v viru je prišlo do napake.",
errorAlt : "Napaka:",
errorShowMore: "Pokaži več",
errorShowLess: "Pokaži manj",

// Paging Handler
backToTopText: "Nazaj na vrh",
ariaShowMore: "Pokaži več postavk toka dejavnosti",
ariaShowLess: "Pokaži manj postavk toka dejavnosti",
ariaBackToTop: "Nazaj na vrh postavk toka dejavnosti",

// Feed Link
feedLinkText: "Vir za te vnose",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "Še toliko komentarjev: ${0}",
oneMoreCommentsText: "Še en 1 komentar",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Pokaži vse komentarje (${0}) ",
singleCommentText: "Pokaži komentar",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Komentarji za ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Komentarji za ${0}. Če želite prikazati vse komentarje (${1}), uporabite več podrobnosti.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "postavka",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Tok dejavnosti",

// Filters
selectFilter: "Izberite filter",
filterAriaDescription: "Izberite filter, da spremenite vrsto postavk, prikazanih v toku dejavnosti",
filterAriaLabel: "Filter toka dejavnosti",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Pritisnite tipko Enter, da prikažete več podrobnosti o tej postavki",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Pokaži dejanja",

ariaActionsToolbar: "Dejanja postavke",

// Description for EE opener
openEEText: "Pokaži več podrobnosti o tej postavki",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Izbriši to sporočilo",
statusRemoveConfirmMessageText: "Ali ste prepričani, da želite izbrisati to sporočilo?",
statusRemoveConfirmText: "Izbriši",
statusRemoveCancelText: "Prekliči",
statusRemoveConfirmationMsg:  "Sporočilo je bilo uspešno izbrisano.",
statusRemoveErrorMsg: "Sporočila trenutno ni mogoče izbrisati. Poskusite znova ali se obrnite na skrbnika.",
commentRemoveText: "Izbriši ta komentar",
commentRemoveConfirmMessageText: "Ali ste prepričani, da želite izbrisati ta komentar?",
commentRemoveConfirmText: "Izbriši",
commentRemoveCancelText: "Prekliči",
commentRemoveConfirmationMsg: "Komentar je bil uspešno izbrisan.",
commentRemoveErrorMsg: "Komentarja trenutno ni mogoče izbrisati. Poskusite znova ali se obrnite na skrbnika.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Preostali znaki",

// Message
msgCloseAlt: "Zapri sporočilo",

//More Less Link
showMoreText: "Pokaži več",
showLessText: "Pokaži manj",
showMoreActions: "Več ...",

ariaShowMoreLabel: "Ta gumb je namenjen prikazu vsebine, ki je bila skrita v namene prikaza. Ni relevantno za uporabnike tehnologije za pomoč osebam s posebnimi potrebami.",


//Tags
listTags: "${0} in še ${1}",

//Trends
expandTrend: "Razširi filter trendov",
collapseTrend: "Strni filter trendov",
trendTitle: "Trendi",
relatedTrendTitle: "Dodaj trend ''${0}''",
trendHelp: "Pomoč za trende",
closeTrendHelp: "Zapri pomoč za trende",
trendDescription: "Trend je ključna beseda, ki jo generira sistem, da poenostavi iskanje v posodobitvah statusov. Kliknite trend, če želite prikazati rezultate iskanje, ki so bili dodeljeni tej ključni besedi.",
noTrends: "Ni trendov",
selectedTrends: "Izbrani trendi",
relatedTrends: "Sorodni trendi",
relatedTrendsDesc: "Dodajte soroden trend, da dodatno izboljšate iskanje",
removeTrend: "Odstrani trend ''${0}'' iz izbranih trendov filtra",
removeGeneric: "Odstrani",
removeHashtag: "Odstrani ključno besedo ${0} iz izbranih filtrirnih oznak.",

//ActivityStream search
asSearchLabel: "Preišči trenutni tok",
asSearchShadowtext: "Preišči ta tok",
asSearchBarOpen: "Odpri iskalno vrstico za iskanje v trenutnem pogledu",
asSearchBarCancel: "Prekliči iskanje in vrni v glavni pogled",
asSearch: "Iskanje",
asSearchGlobalView: "Ogled rezultatov iskanja iz vse vaše vsebine",

matching: "Ujemanje:",
matchingAllOf: "Ujemanje vseh od:",


//ViewAll extension
viewAllUpdates: "Prikaži vse posodobitve",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "Omenjena je bila oseba ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "Omenjene so bile osebe ${0}",

// String for new filter
filterMention: "@Omembe",

// Aria string for mentions
ariaFilterMention: "Omembe",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} ob ${time}",
// e.g. June 6th
timeMonth: "${d} ${MMM}",
// e.g. Today at 11:23
timeToday: "Danes ob ${time}",
// e.g. June 6th, 2011
timeYear: "${d} ${MMM} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Včeraj ob ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Jutri ob ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Vse",
filterStatusUpdates: "Posodobitve statusov",
filterActivities: "Dejavnosti",
filterBlogs: "Blogi",
filterBookmarks: "Zaznamki",
filterCommunities: "Skupnosti",
filterFiles: "Datoteke",
filterForums: "Forumi",
filterPeople: "Osebe",
filterProfiles: "Profili",
filterWikis: "Wikiji",
filterTags: "Oznake",
filterLibraries: "Knjižnice",
filterMyNetworkAndPeopleIFollow: "Moje omrežje in osebe, ki jih spremljam",
filterMyNetwork: "Moje omrežje",
filterPeopleIFollow: "Osebe, ki jih spremljam",
filterMyUpdates: "Moje posodobitve",
filterCommunitiesIFollow: "Skupnosti, ki jih spremljam",
filterForMe: "Zame",
filterFromMe: "Od mene",

// Label for filters - used by gadget
viewFilterLabel: "Podpogled:",
filterOneLabel: "Filtriraj po:",
filterTwoLabel: "Pokaži:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Spremljam",
viewStatusUpdates: "Posodobitve statusov",
viewActionRequired: "Zahtevano dejanje",
viewSaved: "Shranjeno",
viewMyNotifications: "Moja obvestila",
viewDiscover: "Odkritja",
viewRecentUpdates: "Nedavne posodobitve",

// Aria label for As View Side Nav
ariaASViews: "Pogledi toka dejavnosti",

selectedLabel: "Izbrano",

// Gadget title
asTitle: "Posodobitve za Connections",

// Used by gadget in Notes
updatesFromSender: "Posodobitve od pošiljatelja",
updatesFromContact: "Posodobitve od stika",
updatesForUser: "Posodobitve za uporabnika",
updatesFor: "Posodobitve za ${0}",
noUser: "Za ta elektronski naslov ${0} ni bilo mogoče najti uporabnika",
returnMainView: "Vrni se",

//External Application Text
externalApplication: "Zunanja aplikacija",

//Strings for expanding comments inline
showPreviousComments: "Pokaži prejšnje komentarje ...",
hideAdditionalComments: "Skrij dodatne komentarje ...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} od ${1}",
errorRetrieveComments: "Med pridobivanjem prejšnjih komentarjev je prišlo do napake.",
errorRetrieveCommentsDeleted: "Med pridobivanjem prejšnjih komentarjev je prišlo do napake. Postavke so izbrisane.",

// News Item Actions - Repost
repostText: "Znova objavi",
logInRepostText: "Za vnovično objavo se prijavite",
repostMsgSuccess: "Posodobitev je bila uspešno znova objavljena za vaše spremljevalce.",
repostMsgFail: "Med vnovičnim objavljanjem tega sporočila je prišlo do napake.",
repostMsgErrorResGeneric: "Nimate pooblastila za vnovično objavljanje tega sporočila.",
repostMsgErrorRestricted: "Tega sporočila ni mogoče znova objaviti, ker je skupnost ${0} zdaj omejena.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Kliknite tukaj, da poiščete oznako ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Ta povezava se bo odprla v novem oknu.",
attachFile : "Dodaj datoteko",
removeFileAttachment: "Odstrani datotečno prilogo",

// External users 
externalUsersCommentsMsg: "Komentarje lahko vidijo osebe zunaj vaše organizacije.",
externalUsersStatusUpdatesMsg: "Posodobitve statusov lahko vidijo osebe zunaj vaše organizacije.",
externalUsersItemMsg: "V skupni rabi zunanje",

// Notifications Center
ariaNotificationCenter: "Središče za obveščanje - Oglejte si posodobitve, povezane z vašo vsebino, in obvestila, ki ste jih prejeli.",
allNotifications : "Vsa obvestila",
seeAllNotifications : "Prikaži vse",
ariaSeeAllNotifications : "Kliknite tukaj za pomik v pogled Moja obvestila na domači strani",
notificationsTitle : "Obvestila",
notificationsSettings : "Nastavitve",
ariaNotificationsSettings : "Kliknite tukaj za pomik na stran z nastavitvami za obvestila",
ariaNewNotification : "Nov naslov obvestila. ${0}",
newNotifications: "Št. novih obvestil: ${0}",
loadingNotifications: "Nalaganje ...",
noNewNotifications: "V preteklem tednu niste prejeli obvestil.",
markRead: "Označi kot prebrano",
markUnread: "Označi kot neprebrano",
markAllRead: "Označi vse kot prebrano",
markAllReadDetails: "Kliknite tukaj, da označite vsa obvestila kot prebrana.",
notificationPopupSingleGeneric: "Imate 1 novo obvestilo",
notificationPopupGeneric: "Imate toliko novih obvestil: ${0}"
});

