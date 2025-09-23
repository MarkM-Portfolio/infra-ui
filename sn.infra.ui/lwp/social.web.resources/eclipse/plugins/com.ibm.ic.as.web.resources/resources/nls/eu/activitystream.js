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
loadingText: "Kargatzen...",

//common strings
errorText: "Errorea",

invalidASConfig: "Errore bat dago eguneratze-korrontearen konfigurazioan. Jarri harremanetan administratzailearekin.",

// News Item
// ${0}  :  Person display name
photoOfText: "${0}(r)en argazkia",
// ${0}  :  Application
eventFromText: "${0}(r)en gertaera",
removeNewsItemText: "Ezabatu elementu hau ",
// ${0}  :  Number of likes for a news item
tagsText: "Etiketak: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} atsegite",
likeText: "Atsegite 1",
imageNotAvailable: "Aurrebista ez dago erabilgarri une honetan",
likeError: "Errore bat gertatu elementu hau atsegitean.",
unLikeError: "Errore bat gertatu da elementu hau desatsegitean.",
// ${0} author name
fromText: "Igorlea: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Deskarga-errorea",
downloadErrorMessage: "Ezin izan da fitxategia deskargatu. Baliteke ezabatuta egotea edo zuk atzitu ezin izatea.",
closeText: "itxi",
okText: "Ados",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Hau da ${0}(r)en profilerako esteka bat",

// Files News Items
publicText: "Publikoa",
privateText: "Pribatua",

// Video Preview
ariaPlayVideo: "Erreproduzitu bideoa",
ariaVideoArea: "Bideo-eremua, sakatu SARTU bideo-kontrolatzaileak atzitzeko",

// News Item Actions - Comment
commentText: "Iruzkina",
logInText: "Sartu",
logInCommentText: "Hasi saioa iruzkinak idazteko",
deleteCommentText: "Ezabatu iruzkina",
addCommentText: "Gehitu iruzkin bat...",
ariaAddCommentText: "Gehitu iruzkin bat",
writeCommentText: "Idatzi zerbait...",
ariaCommentText: "Idatzi zerbait",
commentNotPermittedText: "Ez duzu mezu honetan iruzkinak idazteko baimenik.",
commentFailureText: "Iruzkina gehitzeko saiakerak huts egin du. Mesedez, freskatu orria eta saiatu berriro.",
commentSessionTimedOut: "Saioa automatikoki itxi da denbora luzean ez delako jarduerarik egon. Idatzi duzun testurik ez galtzeko, kopia ezazu arbelean. Gero, <a href : ''${0}''>hasi saioa</a> atzera hasteko.",
commentPostText: "Argitaratu",
commentCancelText: "Utzi",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Iruzkina luzeegia da argitaratzeko. Zuzendu iruzkina eta saiatu berriro.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Zure iruzkina argitaratu egin da.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0}(e)k ${1}(e)an iruzkin bat idatzi du",
// same as above, but for replies
replyAriaLabel: "${0}(e)k ${1}8e)an erantzun bat idatzi du",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Ikusi elementua ${0} orriaren leiho berri batean. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0}(e)k iruzkin bat idatzi du ${1}e(t)an",
// same as above, but for replies
replyAriaLabelSameDay: "${0}(e)k erantzun bat idatzi du ${1}e(t)an",

// News Item Actions - Save
savedText: "Gordeta",
savedSuccessText: "Ondo gorde da",

// No Content Item
noContentText: "Ez dago eguneratzerik bistaratzeko.",

// News Feed Error
feedErrorText: "Errore bat egon da zure berrien jarioa berreskuratzean.",
itemErrorText: "Errore bat gertatu da elementu bat zure jarioan bistaratzean.",
errorAlt : "Errorea:",
errorShowMore: "Erakutsi gehiago",
errorShowLess: "Erakutsi gutxiago",

// Paging Handler
backToTopText: "Itzuli gora",
ariaShowMore: "Erakutsi jarduera-korrontearen elementu gehiago",
ariaShowLess: "Erakutsi jarduera-korrontearen elementu gutxiago",
ariaBackToTop: "Itzuli jarduera-korrontearen elementuen hasierara",

// Feed Link
feedLinkText: "Sarrera hauen jarioa",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} iruzkin gehiago",
oneMoreCommentsText: "Beste iruzkin 1",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Erakutsi ${0} iruzkinak ",
singleCommentText: "Erakutsi iruzkina",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "${0}(r)entzako iruzkinak",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "${0}(e)ntzako iruzkinak. Erabili xehetasun gehiago ${1} iruzkinak erakusteko.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "elementua",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Jardueren jarioa",

// Filters
selectFilter: "Hautatu iragazki bat",
filterAriaDescription: "Hautatu iragazki bat Jarduera-korrontea atalean erakusten den elementu mota aldatzeko",
filterAriaLabel: "Iragazi jarduera-korrontea",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Sakatu sartu tekla elementu honi buruzko xehetasun gehiago erakusteko",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Erakutsi ekintzak",

ariaActionsToolbar: "Elementuen ekintzak",

// Description for EE opener
openEEText: "Erakutsi elementu honi buruzko xehetasun gehiago",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Ezabatu mezu hau",
statusRemoveConfirmMessageText: "Ziur zaude mezu hau ezabatu nahi duzula?",
statusRemoveConfirmText: "Ezabatu",
statusRemoveCancelText: "Utzi",
statusRemoveConfirmationMsg:  "Mezua ezabatu egin da.",
statusRemoveErrorMsg: "Une honetan ezin izan da mezua ezabatu. Saiatu berriro edo jarri harremanetan administratzailearekin.",
commentRemoveText: "Ezabatu iruzkin hau",
commentRemoveConfirmMessageText: "Ziur zaude iruzkin hau ezabatu nahi duzula?",
commentRemoveConfirmText: "Ezabatu",
commentRemoveCancelText: "Utzi",
commentRemoveConfirmationMsg: "Iruzkina ezabatu egin da.",
commentRemoveErrorMsg: "Une honetan ezin izan da iruzkina ezabatu. Saiatu berriro edo jarri harremanetan administratzailearekin.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Geratzen diren karaktereak",

// Message
msgCloseAlt: "Itxi mezua",

//More Less Link
showMoreText: "Erakutsi gehiago",
showLessText: "Erakutsi gutxiago",
showMoreActions: "Gehiago...",

ariaShowMoreLabel: "Botoi hau bistaratze-helburuetarako ezkutatu den edukia erakusteko erabiltzen da. Ez da erabilgarria laguntza-teknologiaren erabiltzaileentzat.",


//Tags
listTags: "${0} eta beste ${1}",

//Trends
expandTrend: "Zabaldu joeren iragazkia",
collapseTrend: "Tolestu joeren iragazkia",
trendTitle: "Joerak",
relatedTrendTitle: "Gehitu joera hau: ''${0}''",
trendHelp: "Joeren laguntza",
closeTrendHelp: "Itxi joerei buruzko laguntza",
trendDescription: "Joera bat sistemak sortutako gako-hitza da, egoera-eguneratzeetako bilaketak errazagoak izan daitezen. Egin klik joera batean gako-hitz hori duten bilaketa-emaitzak ikusteko.",
noTrends: "Oraindik ez dago joerarik",
selectedTrends: "Hautatutako joerak",
relatedTrends: "Erlazionatutako joerak",
relatedTrendsDesc: "Gehitu erlazionatutako joera bat zure bilaketa zehazteko",
removeTrend: "Kendu ''${0}'' joera hautatutako iragazki-joeretatik",
removeGeneric: "Kendu",
removeHashtag: "Kendu ${0} etiketa hautatutako iragazki-etiketetatik.",

//ActivityStream search
asSearchLabel: "Bilatu uneko korrontean",
asSearchShadowtext: "Bilatu korronte honetan",
asSearchBarOpen: "Ireki bilaketa-barra oraingo ikuspegian bilatzeko",
asSearchBarCancel: "Ezeztatu bilaketa eta itzuli ikuspegi nagusira",
asSearch: "Bilatu",
asSearchGlobalView: "Ikusi zure eduki osoaren bilaketaren emaitzak",

matching: "Honekin bat etorri behar da:",
matchingAllOf: "Bat etortze-guztiak:",


//ViewAll extension
viewAllUpdates: "Ikusi eguneratze guztiak",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} aipatu egin da",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} aipatu egin dira",

// String for new filter
filterMention: "@Aipamenak",

// Aria string for mentions
ariaFilterMention: "Aipamenak",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} ${time}e(t)an",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Gaur ${time}e(t)an",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Atzo ${time}e(t)an",
// e.g. Tomorrow at 6:45
timeTomorrow: "Bihar ${time}e(t)an",

// Names for filters in ActivityStream - used by gadget
filterAll: "Guztiak",
filterStatusUpdates: "Egoera-eguneratzeak",
filterActivities: "Jarduerak",
filterBlogs: "Blogak",
filterBookmarks: "Laster-markak",
filterCommunities: "Komunitateak",
filterFiles: "Fitxategiak",
filterForums: "Foroak",
filterPeople: "Jendea",
filterProfiles: "Profilak",
filterWikis: "Wikiak",
filterTags: "Etiketak",
filterLibraries: "Liburutegiak",
filterMyNetworkAndPeopleIFollow: "Nire sarea eta jarraitzen dudan jendea",
filterMyNetwork: "Nire sarea",
filterPeopleIFollow: "Jarraitzen dudan jendea",
filterMyUpdates: "Nire eguneratzeak",
filterCommunitiesIFollow: "Jarraitzen ditudan komunitateak",
filterForMe: "Niretzat",
filterFromMe: "Nik bidaliak",

// Label for filters - used by gadget
viewFilterLabel: "Azpiikuspegia:",
filterOneLabel: "Iragazi honen arabera:",
filterTwoLabel: "Erakutsi:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Jarraitutakoak",
viewStatusUpdates: "Egoera-eguneratzeak",
viewActionRequired: "Ekintza beharrezkoa da",
viewSaved: "Gordeta",
viewMyNotifications: "Nire jakinarazpenak",
viewDiscover: "Aurkitu",
viewRecentUpdates: "Azken eguneratzeak",

// Aria label for As View Side Nav
ariaASViews: "Jarduera-korrontearen ikuspegiak",

selectedLabel: "Hautatua",

// Gadget title
asTitle: "Connections-en eguneratzeak",

// Used by gadget in Notes
updatesFromSender: "Igorlearen eguneratzeak",
updatesFromContact: "Kontaktuaren eguneratzeak",
updatesForUser: "Erabiltzailearen eguneratzeak",
updatesFor: "${0}(r)en eguneratzeak",
noUser: "Ez da aurkitu ondoko helbide elektronikoa duen erabiltzailerik: ${0}",
returnMainView: "Itzuli",

//External Application Text
externalApplication: "Kanpoko aplikazioa",

//Strings for expanding comments inline
showPreviousComments: "Erakutsi aurreko iruzkinak...",
hideAdditionalComments: "Ezkutatu iruzkin gehigarriak...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} ${1}(e)tik",
errorRetrieveComments: "Errore bat gertatu da aurreko iruzkinak berreskuratzean.",
errorRetrieveCommentsDeleted: "Errore bat gertatu da aurreko iruzkinak berreskuratzean. Baliteke elementua ezabatuta egotea.",

// News Item Actions - Repost
repostText: "Berrargitaratu",
logInRepostText: "Hasi saioa berriz argitaratzeko",
repostMsgSuccess: "Eguneratzea ondo berrargitaratu da zure jarraitzaileentzat.",
repostMsgFail: "Errore bat gertatu da mezu hau berriz argitaratzean.",
repostMsgErrorResGeneric: "Ez duzu baimenik mezu hau berriz argitaratzeko.",
repostMsgErrorRestricted: "Ezin da mezua berriz argitaratu ${0} komunitatea komunitate murriztua delako orain.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Egin klik hemen ${0} etiketa bilatzeko. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Esteka hau leiho berri batean irekiko da.",
attachFile : "Gehitu fitxategi bat",
removeFileAttachment: "Kendu fitxategi-eranskina",

// External users 
externalUsersCommentsMsg: "Iruzkinak zure erakundetik kanpoko jendeak ikus ditzake.",
externalUsersStatusUpdatesMsg: "Egoera-eguneratzeak zure erakundetik kanpoko jendeak ikus ditzake.",
externalUsersItemMsg: "Kanpokoekin partekatua",

// Notifications Center
ariaNotificationCenter: "Jakinarazpen-zentroa - Ikusi zure edukiari lotutako eguneratzeak eta jasotako jakinarazpenak",
allNotifications : "Jakinarazpen guztiak",
seeAllNotifications : "Ikusi guztiak",
ariaSeeAllNotifications : "Egin klik hemen hasierako orriko 'Nire jakinarazpenak' ikuspegira joateko",
notificationsTitle : "Jakinarazpenak",
notificationsSettings : "Ezarpenak",
ariaNotificationsSettings : "Egin klik hemen jakinarazpenen ezarpenen orrira joateko",
ariaNewNotification : "Jakinarazpen-titulu berria. ${0}",
newNotifications: "${0} jakinarazpen berri",
loadingNotifications: "Kargatzen...",
noNewNotifications: "Joan den astean ez duzu jakinarazpenik jaso.",
markRead: "Markatu irakurritako gisa",
markUnread: "Markatu irakurri gabeko gisa",
markAllRead: "Markatu guztiak irakurritako gisa",
markAllReadDetails: "Egin klik hemen jakinarazpen guztiak irakurritako gisa markatzeko.",
notificationPopupSingleGeneric: "Jakinarazpen berri 1 duzu",
notificationPopupGeneric: "${0} jakinarazpen berri dituzu"
});

