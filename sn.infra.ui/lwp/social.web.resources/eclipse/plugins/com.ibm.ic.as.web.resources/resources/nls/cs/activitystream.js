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
loadingText: "Načítání...",

//common strings
errorText: "Chyba",

invalidASConfig: "Došlo k chybě konfigurace proudu aktualizací. Kontaktujte administrátora.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografie uživatele ${0}",
// ${0}  :  Application
eventFromText: "Událost od ${0}",
removeNewsItemText: "Odstranit tuto položku ",
// ${0}  :  Number of likes for a news item
tagsText: "Značky: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} hodnocení Oblíbené",
likeText: "1 hodnocení Oblíbené",
imageNotAvailable: "Náhled není v tuto chvíli k dispozici.",
likeError: "Při nastavení této položky jako oblíbené došlo k chybě.",
unLikeError: "Při zrušení nastavení této položky jako oblíbené došlo k chybě.",
// ${0} author name
fromText: "Od: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} kB",

//File download strings
downloadError: "Chyba stahování",
downloadErrorMessage: "Soubor nebyl stažen. Možná byl odstraněn nebo k němu nemáte přístup.",
closeText: "zavřít",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Toto je odkaz na profil uživatele ${0}.",

// Files News Items
publicText: "Veřejné",
privateText: "Soukromé",

// Video Preview
ariaPlayVideo: "Přehrát video",
ariaVideoArea: "Oblast videa, přístup k řadičům videa získáte stisknutím klávesy Enter.",

// News Item Actions - Comment
commentText: "Komentář",
logInText: "Přihlásit se",
logInCommentText: "Chcete-li komentovat, přihlaste se.",
deleteCommentText: "Odstranit komentář",
addCommentText: "Přidat komentář...",
ariaAddCommentText: "Přidat komentář",
writeCommentText: "Napište text...",
ariaCommentText: "Napište text",
commentNotPermittedText: "Ke komentování této zprávy nemáte oprávnění.",
commentFailureText: "Při pokusu o přidání textu komentáře došlo k chybě. Obnovte stránku a akci opakujte.",
commentSessionTimedOut: "Byli jste automaticky odhlášeni od serveru vzhledem k nečinnosti. Zkopírujte zadaný text do schránky, abyste o něj nepřišli, <a href : ''${0}''>přihlaste se</a> a začněte znovu.",
commentPostText: "Zveřejnit",
commentCancelText: "Storno",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Komentář nelze odeslat, je příliš dlouhý. Upravte jej a zkuste to znovu.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Komentář byl odeslán.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} napsal komentář ${1}",
// same as above, but for replies
replyAriaLabel: "${0} napsal odpověď ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Zobrazit položku v novém okně na stránce ${0} ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} napsal komentář v ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} napsal odpověď v ${1}",

// News Item Actions - Save
savedText: "Uloženo",
savedSuccessText: "Úspěšně uloženo",

// No Content Item
noContentText: "Nejsou k dispozici žádné aktualizace k zobrazení.",

// News Feed Error
feedErrorText: "Došlo k chybě při načítání diskusního kanálu.",
itemErrorText: "Při zobrazení položky ve vašem kanálu došlo k chybě.",
errorAlt : "Chyba:",
errorShowMore: "Zobrazit více",
errorShowLess: "Zobrazit méně",

// Paging Handler
backToTopText: "Zpět na začátek",
ariaShowMore: "Zobrazit více položek proudu aktivity",
ariaShowLess: "Zobrazit méně položek proudu aktivity",
ariaBackToTop: "Zpět na začátek položek proudu aktivity",

// Feed Link
feedLinkText: "Kanál pro tyto položky",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} dalších komentářů",
oneMoreCommentsText: "1 další komentář",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Zobrazit všechny komentáře (${0}) ",
singleCommentText: "Zobrazit komentář",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Komentáře pro: ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Komentáře k položce ${0}. Chcete-li zobrazit všechny komentáře (${1}), zobrazte více podrobností.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "položka",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Proud aktivity",

// Filters
selectFilter: "Vybrat filtr",
filterAriaDescription: "Výběrem filtru změníte typ položek zobrazených v proudu aktivity",
filterAriaLabel: "Filtrovat proud aktivity",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Stiskem klávesy Enter zobrazíte další podrobnosti o této položce.",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Zobrazit akce",

ariaActionsToolbar: "Akce položky",

// Description for EE opener
openEEText: "Zobrazit další podrobnosti o této položce",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Odstranit tuto zprávu",
statusRemoveConfirmMessageText: "Jste si jisti, že chcete odstranit tuto zprávu?",
statusRemoveConfirmText: "Odstranit",
statusRemoveCancelText: "Storno",
statusRemoveConfirmationMsg:  "Zpráva byla úspěšně odstraněna.",
statusRemoveErrorMsg: "Zprávu nelze nyní odstranit. Zkuste operaci zopakovat nebo se obraťte na administrátora.",
commentRemoveText: "Odstranit tento komentář",
commentRemoveConfirmMessageText: "Opravdu chcete odstranit tento komentář?",
commentRemoveConfirmText: "Odstranit",
commentRemoveCancelText: "Storno",
commentRemoveConfirmationMsg: "Komentář byl úspěšně odstraněn.",
commentRemoveErrorMsg: "Komentář nelze nyní odstranit. Zkuste operaci zopakovat nebo se obraťte na administrátora.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Počet zbývajících znaků",

// Message
msgCloseAlt: "Zavřít zprávu",

//More Less Link
showMoreText: "Zobrazit více",
showLessText: "Zobrazit méně",
showMoreActions: "Více...",

ariaShowMoreLabel: "Toto tlačítko slouží k zobrazení obsahu, který byl skryt pro účely zobrazení. Netýká se uživatelů podpůrné technologie.",


//Tags
listTags: "${0} a ${1} dalších",

//Trends
expandTrend: "Rozbalit filtr Trendy",
collapseTrend: "Sbalit filtr Trendy",
trendTitle: "Trendy",
relatedTrendTitle: "Přidat trend ''${0}''",
trendHelp: "Nápověda k trendům",
closeTrendHelp: "Zavřít nápovědu k trendům",
trendDescription: "Trend je klíčové slovo generované systémem, které usnadňuje vyhledávání v aktualizacích stavu. Po klepnutí na trend se zobrazí výsledky hledání s přiřazeným příslušným klíčovým slovem.",
noTrends: "Dosud žádné trendy",
selectedTrends: "Vybrané trendy",
relatedTrends: "Související trendy",
relatedTrendsDesc: "Chcete-li hledání dále zúžit, přidejte související trend.",
removeTrend: "Odebrat trend ${0} z vybraných značek trendu",
removeGeneric: "Odebrat",
removeHashtag: "Odebrat značku hashtag ${0} z vybraných značek filtru",

//ActivityStream search
asSearchLabel: "Prohledat aktuální proud",
asSearchShadowtext: "Prohledat tento proud",
asSearchBarOpen: "Otevřít panel hledání a prohledat aktuální zobrazení",
asSearchBarCancel: "Zrušit vyhledávání a vrátit se do hlavního zobrazení",
asSearch: "Hledat",
asSearchGlobalView: "Zobrazit výsledky vyhledávání z veškerého obsahu",

matching: "Odpovídající:",
matchingAllOf: "Vyhovující všem podmínkám:",


//ViewAll extension
viewAllUpdates: "Zobrazit všechny aktualizace",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "Byla zmíněna položka ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "Byly zmíněny položky ${0}",

// String for new filter
filterMention: "@Zmínky",

// Aria string for mentions
ariaFilterMention: "Zmínky",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} v ${time}",
// e.g. June 6th
timeMonth: "${d}. ${MMM}",
// e.g. Today at 11:23
timeToday: "Dnes v ${time}",
// e.g. June 6th, 2011
timeYear: "${d}. ${MMM} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Včera v ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Zítra v ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Vše",
filterStatusUpdates: "Aktualizace stavu",
filterActivities: "Aktivity",
filterBlogs: "Blogy",
filterBookmarks: "Záložky",
filterCommunities: "Komunity",
filterFiles: "Soubory",
filterForums: "Fóra",
filterPeople: "Lidé",
filterProfiles: "Profily",
filterWikis: "Wikiweby",
filterTags: "Značky",
filterLibraries: "Knihovny",
filterMyNetworkAndPeopleIFollow: "Má síť a lidé, které sleduji",
filterMyNetwork: "Má síť",
filterPeopleIFollow: "Lidé, které sleduji",
filterMyUpdates: "Mé aktualizace",
filterCommunitiesIFollow: "Komunity, jež sleduji",
filterForMe: "Pro mě",
filterFromMe: "Ode mě",

// Label for filters - used by gadget
viewFilterLabel: "Dílčí zobrazení:",
filterOneLabel: "Filtrovat podle:",
filterTwoLabel: "Zobrazit:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Sleduji",
viewStatusUpdates: "Aktualizace stavu",
viewActionRequired: "Požadované akce",
viewSaved: "Uloženo",
viewMyNotifications: "Moje oznámení",
viewDiscover: "Zjišťování",
viewRecentUpdates: "Nejnovější aktualizace",

// Aria label for As View Side Nav
ariaASViews: "Zobrazení proudu aktivity",

selectedLabel: "Vybráno",

// Gadget title
asTitle: "Aktualizace produktu Connections",

// Used by gadget in Notes
updatesFromSender: "Aktualizace od odesilatele",
updatesFromContact: "Aktualizace od kontaktu",
updatesForUser: "Aktualizace pro uživatele",
updatesFor: "Aktualizace pro ${0}",
noUser: "Pro tuto e-mailovou adresu nebyl nalezen žádný uživatel: ${0}",
returnMainView: "Návrat",

//External Application Text
externalApplication: "Externí aplikace",

//Strings for expanding comments inline
showPreviousComments: "Zobrazit předchozí komentáře...",
hideAdditionalComments: "Skrýt další komentáře...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} z ${1}",
errorRetrieveComments: "Došlo k chybě při načítání předchozích komentářů.",
errorRetrieveCommentsDeleted: "Došlo k chybě při načítání předchozích komentářů. Položka mohla být odstraněna.",

// News Item Actions - Repost
repostText: "Zveřejnit znovu",
logInRepostText: "Přihlásit se ke znovuzveřejnění",
repostMsgSuccess: "Aktualizace byla úspěšně znovu odeslána osobám, které vás sledují.",
repostMsgFail: "Při opětovném zveřejnění této položky došlo k chybě.",
repostMsgErrorResGeneric: "K opětovnému zveřejnění této položky nemáte oprávnění.",
repostMsgErrorRestricted: "Tuto zprávu nelze znovu zveřejnit, jelikož ${0} nyní patří mezi Omezené komunity.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Klepnutím vyhledáte značku ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Tento odkaz otevře nové okno.",
attachFile : "Přidat soubor",
removeFileAttachment: "Odebrat přiložený soubor",

// External users 
externalUsersCommentsMsg: "Komentáře mohou zobrazit osoby mimo vaši organizaci.",
externalUsersStatusUpdatesMsg: "Aktualizace stavu mohou zobrazit osoby mimo vaši organizaci.",
externalUsersItemMsg: "Sdíleno externě",

// Notifications Center
ariaNotificationCenter: "Centrum oznámení - Zobrazení aktualizací týkajících se vašeho obsahu a oznámení, která jste obdrželi",
allNotifications : "Všechna oznámení",
seeAllNotifications : "Zobrazit vše",
ariaSeeAllNotifications : "Chcete-li přejít k zobrazení Moje oznámení na domovské stránce, klepněte zde.",
notificationsTitle : "Oznámení",
notificationsSettings : "Nastavení",
ariaNotificationsSettings : "Chcete-li přejít na stránku nastavení pro oznámení, klepněte zde.",
ariaNewNotification : "Nový název oznámení. ${0}",
newNotifications: "${0} nových oznámení",
loadingNotifications: "Načítání...",
noNewNotifications: "Během posledního týdne jste nedostali žádné oznámení.",
markRead: "Označit jako přečtené",
markUnread: "Označit jako nepřečtené",
markAllRead: "Označit vše jako přečtené",
markAllReadDetails: "Klepnutím sem označíte všechna oznámení jako přečtená.",
notificationPopupSingleGeneric: "Máte 1 nové oznámení.",
notificationPopupGeneric: "Máte ${0} nových oznámení."
});

