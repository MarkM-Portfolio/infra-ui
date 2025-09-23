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
loadingText: "Načítava sa...",

//common strings
errorText: "Chyba",

invalidASConfig: "Konfigurácia pre prúd Aktualizácie obsahuje chybu. Kontaktujte svojho administrátora.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografia používateľa ${0}",
// ${0}  :  Application
eventFromText: "Udalosť z ${0}",
removeNewsItemText: "Vymazať túto položku ",
// ${0}  :  Number of likes for a news item
tagsText: "Značky: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} označení Páči sa mi",
likeText: "Jednému sa páči",
imageNotAvailable: "Náhľad je momentálne nedostupný",
likeError: "Nastala chyba pri vytváraní prepojenia tejto úlohy.",
unLikeError: "Nastala chyba pri rušení prepojenia tejto úlohy.",
// ${0} author name
fromText: "Od: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} kB",

//File download strings
downloadError: "Chyba preberania",
downloadErrorMessage: "Nebolo možné prevziať súbor. Možno je vymazaný alebo k nemu nemáte prístup.",
closeText: "zatvoriť",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Toto je odkaz na profil používateľa ${0}",

// Files News Items
publicText: "Verejná",
privateText: "Súkromné",

// Video Preview
ariaPlayVideo: "Prehrať video",
ariaVideoArea: "Oblasť videa. Stlačte kláves Enter na sprístupnenie radičov videa.",

// News Item Actions - Comment
commentText: "Komentár",
logInText: "Prihlásiť",
logInCommentText: "Ak chcete komentovať, prihláste sa",
deleteCommentText: "Vymazať komentár",
addCommentText: "Pridať komentár...",
ariaAddCommentText: "Pridať komentár",
writeCommentText: "Napíšte niečo...",
ariaCommentText: "Napíšte niečo",
commentNotPermittedText: "Nie ste autorizovaný komentovať túto správu.",
commentFailureText: "Zlyhal pokus o pridanie textu komentára. Obnovte svoju stránku a skúste to znova.",
commentSessionTimedOut: "Boli ste automaticky odhlásený zo servera z dôvodu neaktivity. Skopírujte všetok zadaný text do schránky, aby ste ho nestratili. Potom sa <a href : ''${0}''>prihláste</a> a začnite od začiatku.",
commentPostText: "Zverejniť",
commentCancelText: "Zrušiť",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Komentár je pridlhý na zverejnenie. Zmeňte komentár a skúste to znova.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Váš komentár bol zverejnený.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} napísal komentár k ${1}",
// same as above, but for replies
replyAriaLabel: "Používateľ ${0} napísal odpoveď dňa ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Zobraziť položku v novom okne na stránke ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} napísal komentár o ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "Používateľ ${0} napísal odpoveď o ${1}",

// News Item Actions - Save
savedText: "Uložené",
savedSuccessText: "Úspešne uložené",

// No Content Item
noContentText: "Neexistujú žiadne aktualizácie na zobrazenie.",

// News Feed Error
feedErrorText: "Nastala chyba pri získavaní informačného kanála noviniek.",
itemErrorText: "Nastala chyba pri zobrazovaní položky vo vašom informačnom kanáli.",
errorAlt : "Chyba:",
errorShowMore: "Zobraziť viac",
errorShowLess: "Zobraziť menej",

// Paging Handler
backToTopText: "Späť na začiatok",
ariaShowMore: "Zobraziť viac položiek prúdu aktivity",
ariaShowLess: "Zobraziť menej položiek prúdu aktivity",
ariaBackToTop: "Späť na začiatok položiek prúdu aktivity",

// Feed Link
feedLinkText: "Informačný kanál pre tieto položky",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} ďalších komentárov",
oneMoreCommentsText: "Jeden ďalší komentár",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Zobraziť všetkých ${0} komentárov ",
singleCommentText: "Zobraziť komentár",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Komentáre k ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Komentáre pre ${0}. Ak chcete zobraziť všetkých ${1} komentárov, použite viac podrobností.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "položka",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Prúd aktivity",

// Filters
selectFilter: "Vybrať filter",
filterAriaDescription: "Vyberte filter, ak chcete zmeniť typ položiek, ktoré sa zobrazujú v prúde aktivity",
filterAriaLabel: "Filtrovať prúd aktivity",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Ak chcete zobraziť viac podrobností o tejto položke, stlačte kláves Enter",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Zobraziť akcie",

ariaActionsToolbar: "Akcie pre položku",

// Description for EE opener
openEEText: "Zobraziť viac podrobností o tejto položke",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Vymazať túto správu",
statusRemoveConfirmMessageText: "Naozaj chcete vymazať túto správu?",
statusRemoveConfirmText: "Delete",
statusRemoveCancelText: "Zrušiť",
statusRemoveConfirmationMsg:  "Správa bola úspešne vymazaná.",
statusRemoveErrorMsg: "V tejto chvíli nemožno vymazať správu. Skúste to znova alebo kontaktujte administrátora.",
commentRemoveText: "Vymazať tento komentár",
commentRemoveConfirmMessageText: "Naozaj chcete vymazať tento komentár?",
commentRemoveConfirmText: "Delete",
commentRemoveCancelText: "Zrušiť",
commentRemoveConfirmationMsg: "Komentár bol úspešne vymazaný.",
commentRemoveErrorMsg: "V tejto chvíli nemožno vymazať komentár. Skúste to znova alebo kontaktujte administrátora.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Zostáva znakov",

// Message
msgCloseAlt: "Zatvoriť správu",

//More Less Link
showMoreText: "Zobraziť viac",
showLessText: "Zobraziť menej",
showMoreActions: "Viac...",

ariaShowMoreLabel: "Toto tlačidlo sa používa na zobrazenie obsahu, ktorý bol skrytý za účelom zobrazenia. Nevzťahuje sa to na používateľov pomocnej technológie.",


//Tags
listTags: "${0} a ${1} ďalších",

//Trends
expandTrend: "Rozvinúť filter trendov",
collapseTrend: "Zvinúť filter trendov",
trendTitle: "Trendy",
relatedTrendTitle: "Pridať trend ''${0}''",
trendHelp: "Pomoc k trendom",
closeTrendHelp: "Zatvoriť pomoc k trendom",
trendDescription: "Trend je kľúčové slovo, ktoré vygeneroval systém, aby zjednodušil vyhľadávanie v Aktualizáciách stavu. Ak chcete zobraziť výsledky vyhľadávania, ktoré majú priradené dané kľúčové slovo, kliknite na trend.",
noTrends: "Zatiaľ žiadne trendy",
selectedTrends: "Vybraté trendy",
relatedTrends: "Súvisiace trendy",
relatedTrendsDesc: "Pridajte súvisiaci trend na ďalšie spresnenie vyhľadávania",
removeTrend: "Odstrániť trend ''${0}'' z vybratých trendov filtra",
removeGeneric: "Odstrániť",
removeHashtag: "Odstrániť hashtag ${0} z vybratých značiek filtra.",

//ActivityStream search
asSearchLabel: "Hľadať v aktuálnom prúde",
asSearchShadowtext: "Hľadať v tomto prúde",
asSearchBarOpen: "Otvoriť vyhľadávaciu lištu pre hľadanie v aktuálnom zobrazení",
asSearchBarCancel: "Zrušiť vyhľadávanie a vrátiť sa do hlavného zobrazenia",
asSearch: "Hľadať",
asSearchGlobalView: "Zobraziť výsledky vyhľadávania v celom obsahu",

matching: "Zhoda:",
matchingAllOf: "Zhoda so všetkým:",


//ViewAll extension
viewAllUpdates: "Zobraziť všetky aktualizácie",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "Bol spomenutý používateľ ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "Boli spomenutí používatelia ${0}",

// String for new filter
filterMention: "@Mentions",

// Aria string for mentions
ariaFilterMention: "Zmienky",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} o ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Dnes o ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Včera o ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Zajtra o ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Všetky",
filterStatusUpdates: "Aktualizácie stavu",
filterActivities: "Aktivity",
filterBlogs: "Blogy",
filterBookmarks: "Záložky",
filterCommunities: "Komunity",
filterFiles: "Súbory",
filterForums: "Fóra",
filterPeople: "Ľudia",
filterProfiles: "Profily",
filterWikis: "Wiki",
filterTags: "Značky",
filterLibraries: "Knižnice",
filterMyNetworkAndPeopleIFollow: "Moja sieť a ľudia, ktorých sledujem",
filterMyNetwork: "Moja sieť",
filterPeopleIFollow: "Ľudia, ktorých sledujem.",
filterMyUpdates: "Moje aktualizácie",
filterCommunitiesIFollow: "Komunity, ktoré sledujem",
filterForMe: "Pre mňa",
filterFromMe: "Odo mňa",

// Label for filters - used by gadget
viewFilterLabel: "Podzobrazenie",
filterOneLabel: "filtrovať podľa:",
filterTwoLabel: "Zobraziť:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Sledujem",
viewStatusUpdates: "Aktualizácie stavu",
viewActionRequired: "Vyžaduje sa akcia",
viewSaved: "Uložené",
viewMyNotifications: "Moje notifikácie",
viewDiscover: "Zistiť",
viewRecentUpdates: "Posledné aktualizácie",

// Aria label for As View Side Nav
ariaASViews: "Zobrazenia prúdu aktivity",

selectedLabel: "Vybratý",

// Gadget title
asTitle: "Aktualizácie Connections",

// Used by gadget in Notes
updatesFromSender: "Aktualizácie od odosielateľa",
updatesFromContact: "Aktualizácie od kontaktu",
updatesForUser: "Aktualizácie pre používateľa",
updatesFor: "Aktualizácie pre ${0}",
noUser: "Nenašiel sa žiadny používateľ pre túto e-mailovú adresu: ${0}",
returnMainView: "Vrátiť",

//External Application Text
externalApplication: "Externá aplikácia",

//Strings for expanding comments inline
showPreviousComments: "Zobraziť predošlé komentáre...",
hideAdditionalComments: "Skryť ďalšie komentáre...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} z ${1}",
errorRetrieveComments: "Nastala chyba pri získavaní predošlých komentárov.",
errorRetrieveCommentsDeleted: "Nastala chyba pri získavaní predošlých komentárov. Položka bola možno vymazaná.",

// News Item Actions - Repost
repostText: "Opakovane zverejniť",
logInRepostText: "Ak chcete opakovane zverejniť, prihláste sa",
repostMsgSuccess: "Aktualizácia sa úspešne opakovane zverejnila pre vašich sledovateľov.",
repostMsgFail: "Nastala chyba pri opakovanom zverejňovaní tejto správy.",
repostMsgErrorResGeneric: "Nie ste autorizovaný opakovane zverejniť túto správu.",
repostMsgErrorRestricted: "Túto správu nemožno opakovane zverejniť, pretože komunita ${0} je teraz obmedzená komunita.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Kliknite tu, ak chcete hľadať značku ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Tento odkaz otvorí nové okno.",
attachFile : "Pridať súbor",
removeFileAttachment: "Odstrániť priložený súbor",

// External users 
externalUsersCommentsMsg: "Komentáre uvidia aj ľudia, ktorí sú externí pre vašu organizáciu.",
externalUsersStatusUpdatesMsg: "Aktualizácie stavu uvidia aj ľudia, ktorí sú externí pre vašu organizáciu.",
externalUsersItemMsg: "Zdieľané externe",

// Notifications Center
ariaNotificationCenter: "Centrum notifikácií - pozrite si aktualizácie a komentáre, ktoré súvisia s vaším obsahom, a notifikácie, ktoré ste prijali",
allNotifications : "Všetky notifikácie",
seeAllNotifications : "Zobraziť všetko",
ariaSeeAllNotifications : "Kliknite tu, ak chcete prejsť do zobrazenia Moje notifikácie v aplikácii Domovská stránka",
notificationsTitle : "Notifikácie",
notificationsSettings : "Nastavenia",
ariaNotificationsSettings : "Kliknite tu, ak chcete prejsť na stránku nastavení notifikácií",
ariaNewNotification : "Nový nadpis notifikácie. ${0}",
newNotifications: "${0} nových notifikácií",
loadingNotifications: "Načítava sa...",
noNewNotifications: "Za posledný týždeň ste nedostali žiadne notifikácie.",
markRead: "Označiť ako prečítané",
markUnread: "Označiť ako neprečítané",
markAllRead: "Označiť všetko ako prečítané",
markAllReadDetails: "Kliknite tu, ak chcete označiť všetky notifikácie ako prečítané.",
notificationPopupSingleGeneric: "Máte jednu novú notifikáciu",
notificationPopupGeneric: "Máte ${0} nových notifikácií"
});

