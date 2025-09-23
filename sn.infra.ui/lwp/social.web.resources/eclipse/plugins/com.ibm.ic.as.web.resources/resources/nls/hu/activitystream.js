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
loadingText: "Betöltés...",

//common strings
errorText: "Hiba",

invalidASConfig: "Hiba van a Frissítések adatfolyam konfigurációjával. Lépjen kapcsolatba az adminisztrátorral.",

// News Item
// ${0}  :  Person display name
photoOfText: "${0} fotója",
// ${0}  :  Application
eventFromText: "Esemény ${0} alkalmazásból",
removeNewsItemText: "Elem törlése ",
// ${0}  :  Number of likes for a news item
tagsText: "Címkék: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} kedvelés",
likeText: "1 kedvelés",
imageNotAvailable: "Az előkép jelenleg nem érhető el",
likeError: "Hiba történt az elem kedvelésekor.",
unLikeError: "Hiba történt az elem nem kedvelésekor.",
// ${0} author name
fromText: "Feladó: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Letöltési hiba",
downloadErrorMessage: "A fájlt nem lehetett letölteni. Lehet, hogy törölték, vagy már nincs hozzáférése.",
closeText: "bezárás",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Ez ${0} profiljára mutató hivatkozás",

// Files News Items
publicText: "Nyilvános",
privateText: "Privát",

// Video Preview
ariaPlayVideo: "Videó lejátszása",
ariaVideoArea: "Videó terület, a videó vezérlőihez nyomja meg az Enter billentyűt",

// News Item Actions - Comment
commentText: "Megjegyzés",
logInText: "Bejelentkezés",
logInCommentText: "Jelentkezzen be megjegyzés írásához",
deleteCommentText: "Megjegyzés törlése",
addCommentText: "Megjegyzés hozzáadása...",
ariaAddCommentText: "Megjegyzés hozzáadása",
writeCommentText: "Írjon valamit...",
ariaCommentText: "Írjon valamit",
commentNotPermittedText: "Nem jogosult megjegyzések írására az üzenethez.",
commentFailureText: "Nem sikerült a megjegyzés szövegének hozzáadása. Frissítse az oldalt és próbálkozzon újra.",
commentSessionTimedOut: "Tétlenség miatt a szerver automatikusan kiléptette. A beírt szöveget másolja a vágólapra, így ne'm veszíti el azt, majd <a href : ''${0}''>jelentkezzen be</a> és kezdje elölről.",
commentPostText: "Elküldés",
commentCancelText: "Mégse",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "A megjegyzés túl hosszú és nem lehet elküldeni. Módosítsa a megjegyzést és próbálkozzon újra.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "A megjegyzés el lett küldve.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} megjegyzést írt: ${1}",
// same as above, but for replies
replyAriaLabel: "${0} választ írt: ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Elem megtekintése új ablakban a(z) ${0} oldalon. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} megjegyzést írt ${1} időpontban",
// same as above, but for replies
replyAriaLabelSameDay: "${0} választ írt ${1} időpontban",

// News Item Actions - Save
savedText: "Elmentve",
savedSuccessText: "A mentés sikerült",

// No Content Item
noContentText: "Nincsenek megjelenítendő frissítések.",

// News Feed Error
feedErrorText: "Hiba történt a hírfolyamok beolvasásakor.",
itemErrorText: "Hiba történt egy hírfolyamelem megjelenítésekor.",
errorAlt : "Hiba:",
errorShowMore: "Részletek megjelenítése",
errorShowLess: "Részletek elrejtése",

// Paging Handler
backToTopText: "Vissza a tetejére",
ariaShowMore: "További tevékenységfolyam elemek megjelenítése",
ariaShowLess: "Kevesebb tevékenységfolyam elem megjelenítése",
ariaBackToTop: "Vissza a tevékenységfolyam elemek tetejére",

// Feed Link
feedLinkText: "Bejegyzések hírfolyama",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} további megjegyzés",
oneMoreCommentsText: "1 további megjegyzés",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Az összes (${0}) megjegyzés megjelenítése ",
singleCommentText: "Megjegyzés megjelenítése",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "${0} megjegyzései",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "${0} megjegyzései. További részletek mind a(z) ${1} megjegyzés megjelenítéséhez.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "elem",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Tevékenységfolyam",

// Filters
selectFilter: "Szűrő kiválasztása",
filterAriaDescription: "Válasszon ki egy szűrőt a tevékenységfolyamban megjelenített elemek típusának módosításához.",
filterAriaLabel: "Tevékenységfolyam szűrése",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Az enter gomb lenyomásával jelenítheti meg az elem további részleteit",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Műveletek megjelenítése",

ariaActionsToolbar: "Elem műveletek",

// Description for EE opener
openEEText: "Elem további részleteinek megjelenítése",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Üzenet törlése",
statusRemoveConfirmMessageText: "Biztosan törölni kívánja az üzenetet?",
statusRemoveConfirmText: "Törlés",
statusRemoveCancelText: "Mégse",
statusRemoveConfirmationMsg:  "Az üzenet törlése sikerült.",
statusRemoveErrorMsg: "Az üzenetet jelenleg nem lehetett törölni. Próbálja meg újra, vagy forduljon az adminisztrátorhoz.",
commentRemoveText: "Megjegyzés törlése",
commentRemoveConfirmMessageText: "Biztosan törli ezt a megjegyzést?",
commentRemoveConfirmText: "Törlés",
commentRemoveCancelText: "Mégse",
commentRemoveConfirmationMsg: "A megjegyzés törlése sikerült.",
commentRemoveErrorMsg: "A megjegyzést jelenleg nem lehetett törölni. Próbálja meg újra, vagy forduljon az adminisztrátorhoz.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Hátralévő karakterek",

// Message
msgCloseAlt: "Üzenet bezárása",

//More Less Link
showMoreText: "Részletek megjelenítése",
showLessText: "Részletek elrejtése",
showMoreActions: "Több...",

ariaShowMoreLabel: "Ez a gomb megjelenítés elől elrejtett tartalom megjelenítésére szolgál. A kisegítő technológiákat használó felhasználó számára ennek nincs jelentősége.",


//Tags
listTags: "${0} és ${1} másik",

//Trends
expandTrend: "Trend szűrő kibontása",
collapseTrend: "Trend szűrő összehúzása",
trendTitle: "Trendek",
relatedTrendTitle: "A(z) ''${0}'' trend hozzáadása",
trendHelp: "Trendek súgója",
closeTrendHelp: "Trendek súgójának bezárása",
trendDescription: "A trend a rendszer által előállított kulcsszó, ami megkönnyíti a keresés végrehajtását az állapotfrissítésekben. Egy trendre kattintva megjelenítheti a keresési találatokat, amelyekhez az adott kulcsszót hozzárendelték.",
noTrends: "Még nincsenek trendek",
selectedTrends: "Kiválasztott trendek",
relatedTrends: "Kapcsolódó trendek",
relatedTrendsDesc: "Adjon hozzá egy kapcsolódó trendet a keresés további finomításához",
removeTrend: "A(z) ''${0}'' tendencia eltávolítása a kiválasztott szűrőtrendekből",
removeGeneric: "Eltávolítás",
removeHashtag: "Távolítsa el a(z) ${0} címkét a kiválasztott szűrőcímkékből.",

//ActivityStream search
asSearchLabel: "Keresés az aktuális adatfolyamban",
asSearchShadowtext: "Keresés ebben az adatfolyamban",
asSearchBarOpen: "Nyissa meg a keresősávot a kereséshez az aktuális nézetben",
asSearchBarCancel: "Vonja vissza a keresést, és térjen vissza a fő nézethez",
asSearch: "Keresés",
asSearchGlobalView: "Tekintse meg a teljes tartalomban végzett keresés eredményét",

matching: "Egyezés:",
matchingAllOf: "Egyezés a következők mindegyikével:",


//ViewAll extension
viewAllUpdates: "Összes frissítés megtekintése",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} meg lett említve",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} meg lettek említve",

// String for new filter
filterMention: "@Említések",

// Aria string for mentions
ariaFilterMention: "Említések",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE}, ${time} időpontban",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Ma ${time} időpontban",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Tegnap ${time} időpontban",
// e.g. Tomorrow at 6:45
timeTomorrow: "Holnap: ekkor: ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Mind",
filterStatusUpdates: "Állapotfrissítések",
filterActivities: "Tevékenységek",
filterBlogs: "Blogok",
filterBookmarks: "Könyvjelzők",
filterCommunities: "Közösségek",
filterFiles: "Fájlok",
filterForums: "Fórumok",
filterPeople: "Személyek",
filterProfiles: "Profilok",
filterWikis: "Wikik",
filterTags: "Címkék",
filterLibraries: "Függvénytárak",
filterMyNetworkAndPeopleIFollow: "Saját hálózat és általam követett személyek",
filterMyNetwork: "Saját hálózat",
filterPeopleIFollow: "Általam követett személyek",
filterMyUpdates: "Saját frissítések",
filterCommunitiesIFollow: "Általam követett közösségek",
filterForMe: "Nekem",
filterFromMe: "Tőlem",

// Label for filters - used by gadget
viewFilterLabel: "Alnézet:",
filterOneLabel: "Szűrés alapja:",
filterTwoLabel: "Megjelenítés:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Általam követett",
viewStatusUpdates: "Állapotfrissítések",
viewActionRequired: "Művelet szükséges",
viewSaved: "Elmentve",
viewMyNotifications: "Saját értesítések",
viewDiscover: "Nyomon követés",
viewRecentUpdates: "Legutóbbi frissítések",

// Aria label for As View Side Nav
ariaASViews: "Tevékenységfolyam nézetek",

selectedLabel: "Kijelölt",

// Gadget title
asTitle: "Connections frissítések",

// Used by gadget in Notes
updatesFromSender: "Külső frissítései",
updatesFromContact: "Kapcsolat frissítései",
updatesForUser: "Felhasználó frissítései",
updatesFor: "${0} frissítései",
noUser: "Nem található felhasználó a következő e-mail címmel: ${0}",
returnMainView: "Visszalépés",

//External Application Text
externalApplication: "Külső alkalmazás",

//Strings for expanding comments inline
showPreviousComments: "Korábbi megjegyzések megjelenítése...",
hideAdditionalComments: "További megjegyzések elrejtése...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} / ${1}",
errorRetrieveComments: "Hiba történt a korábbi megjegyzések beolvasásakor.",
errorRetrieveCommentsDeleted: "Hiba történt a korábbi megjegyzések beolvasásakor. Lehet, hogy az elemet törölték.",

// News Item Actions - Repost
repostText: "Továbbküldés",
logInRepostText: "Jelentkezzen be az újbóli elküldéshez",
repostMsgSuccess: "A frissítést sikeresen továbbküldte a követői számára.",
repostMsgFail: "Hiba történt az üzenet újbóli elküldésekor.",
repostMsgErrorResGeneric: "Nem jogosult az üzenet újbóli elküldésére.",
repostMsgErrorRestricted: "Az üzenetet nem lehet újból elküldeni, mert a(z) ${0} közösség már zárt közösség.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Kattintson ide a(z) ${0} címke kereséséhez. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Ez a hivatkozás új ablakban nyílik meg.",
attachFile : "Fájl hozzáadása",
removeFileAttachment: "Fájlmelléklet eltávolítása",

// External users 
externalUsersCommentsMsg: "A megjegyzéseket a szervezetén kívüli személyek is láthatják.",
externalUsersStatusUpdatesMsg: "Az állapotfrissítéseket a szervezetén kívüli személyek is láthatják.",
externalUsersItemMsg: "Külsőleg megosztott",

// Notifications Center
ariaNotificationCenter: "Értesítési központ - A tartalmával, valamint a fogadott értesítésekkel kapcsolatos frissítések megtekintése.",
allNotifications : "Összes értesítés",
seeAllNotifications : "Összes megtekintése",
ariaSeeAllNotifications : "Kattintson ide a Saját értesítések nézet megnyitásához a kezdőlapon.",
notificationsTitle : "Értesítések",
notificationsSettings : "Beállítások",
ariaNotificationsSettings : "Kattintson ide az értesítési beállítások megnyitásához.",
ariaNewNotification : "Új értesítési cím. ${0}",
newNotifications: "${0} új értesítés",
loadingNotifications: "Betöltés...",
noNewNotifications: "Az elmúlt héten nem kapott értesítést.",
markRead: "Megjelölés olvasottként",
markUnread: "Megjelölés olvasatlanként",
markAllRead: "Összes megjelölése olvasottként",
markAllReadDetails: "Az összes értesítés olvasottként való megjelöléséhez kattintson ide.",
notificationPopupSingleGeneric: "1 új értesítése van",
notificationPopupGeneric: "${0} új értesítése van"
});

