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
loadingText: "Жүктелуде...",

//common strings
errorText: "Қате",

invalidASConfig: "Жаңарту ағыны үшін теңшелімі бар қате бар. Әкімшіңізге хабарласыңыз.",

// News Item
// ${0}  :  Person display name
photoOfText: "${0} қырлы бүркеніш і",
// ${0}  :  Application
eventFromText: "${0} ішіндегі оқиға",
removeNewsItemText: "Бұл элементті жою ",
// ${0}  :  Number of likes for a news item
tagsText: "Тегтер: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} ұнату",
likeText: "1 ұнату",
imageNotAvailable: "Алдын ала қарай мүмкіндігі қазір қолжетімді емес",
likeError: "Осы элементті ұнату кезінде қате орын алды.",
unLikeError: "Осы элементті ұнатпау кезінде қате орын алды.",
// ${0} author name
fromText: "Кімнен: ${0}",

sizeMB: "${0} Мбайт",
sizeGB: "${0} Гбайт",
sizeKB: "${0} Кбайт",

//File download strings
downloadError: "Жүктеу қатесі",
downloadErrorMessage: "Файл жүктелмейді. Оның жойылуы мүмкін немесе сізде оған қатынас рұқсаты болмауы мүмкін.",
closeText: "жабу",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Бұл ${0} профилінің сілтемесі",

// Files News Items
publicText: "Жалпы",
privateText: "Жеке",

// Video Preview
ariaPlayVideo: "Бейнені ойнату",
ariaVideoArea: "Бейне аймағы, бейнені басқару элементтерін ашу үшін ENTER пернесін басыңыз",

// News Item Actions - Comment
commentText: "Пікір",
logInText: "Кіру",
logInCommentText: "Пікірге кіру",
deleteCommentText: "Аңғартпаны жою",
addCommentText: "Пікірді салу...",
ariaAddCommentText: "Пікір қосу",
writeCommentText: "Бір нәрсе жазу...",
ariaCommentText: "Бір нәрсе жазу",
commentNotPermittedText: "Осы хабарға пікір қалдыру үшін рұқсатыңыз жоқ.",
commentFailureText: "Пікір мәтінін қосу әрекеті сәтсіз аяқталды. Бетіңізді жаңартып, әрекетті қайталаңыз.",
commentSessionTimedOut: "Әрекетсіздікке байланысты осы серверден автоматты түрде шығарылдыңыз. Оны жоғал'тып алмайтндай етіп аралық сақтағышқа енгізген кез келген мәтінді сақтаңыз сосын <a href : ''${0}''></a> бастау үшін кіріңіз.",
commentPostText: "Хабар",
commentCancelText: "Болдырмау",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Бұл пікір жіберу үшін тым ұзын. Пікірді өзгертіп, әрекетті қайталаңыз.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Пікіріңіз жіберілді.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0}-${1} өрісінде пікір жазды",
// same as above, but for replies
replyAriaLabel: "${0} ${1} жауабын жазюы",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Элементті ${0}-беттегі жаңа терезеде көріңіз. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0}-${1} уақытында пікір жазды",
// same as above, but for replies
replyAriaLabelSameDay: "${0} жауапты ${1} уақытында жазды",

// News Item Actions - Save
savedText: "Сақталған",
savedSuccessText: "Сәтті сақталды",

// No Content Item
noContentText: "Көрсетуге арналған жаңартулар жоқ.",

// News Feed Error
feedErrorText: "Жаңалықтар арнасын қалпына келтіруде қате орын алды.",
itemErrorText: "Арнаңызда элемент көрсету кезінде қателік орын алды.",
errorAlt : "Қате:",
errorShowMore: "Қосымша көрсету",
errorShowLess: "Азырақ көрсету",

// Paging Handler
backToTopText: "Жоғарыға қайту",
ariaShowMore: "Көбірек әрекет ағынының элементтерін көрсету",
ariaShowLess: "Азырақ әрекет ағынының элементтерін көрсету",
ariaBackToTop: "Көбірек әрекет ағынының үстіне қайту",

// Feed Link
feedLinkText: "Осы жазбалардың арнасы",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "Тағы ${0} пікір",
oneMoreCommentsText: "1 көбірек пікір",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Барлық ${0} пікірді көрсету ",
singleCommentText: "Пікірді көрсету",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "${0} арналған пікірлер",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "${0} үшін пікірлер. Барлық ${1} пікірді көру үшін қосымша мәліметті қолданыңыз.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "элемент",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Әрекет ағыны",

// Filters
selectFilter: "Сүзгіні таңдау",
filterAriaDescription: "Әрекет ағынында көрсетілген элементтер түрін өзгерту үшін, сүзгіні белгілеу",
filterAriaLabel: "Әрекет ағынын сүзгілеу",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Бұл элемент туралы көбірек мәлімет көрсету үшін енгізу пернесін басыңыз",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Әрекеттерді көрсету",

ariaActionsToolbar: "Элемент әрекеттері",

// Description for EE opener
openEEText: "Бұл элемент туралы көбірек ақпаратты көрсету",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Осы хабарламаны жою",
statusRemoveConfirmMessageText: "Бұл хабарды жою қажет пе?",
statusRemoveConfirmText: "Жою",
statusRemoveCancelText: "Болдырмау",
statusRemoveConfirmationMsg:  "Хабар сәтті жойылды.",
statusRemoveErrorMsg: "Хабарды қазір жою мүмкін емес. Қайта байқап көрініңіз немесе әкімшімен байланысыңыз.",
commentRemoveText: "Осы пікірді жою",
commentRemoveConfirmMessageText: "Осы аңғартпаны жойғыңыз келетініне сенімдісіз бе?",
commentRemoveConfirmText: "Жою",
commentRemoveCancelText: "Болдырмау",
commentRemoveConfirmationMsg: "Пікір сәтті жойылмады.",
commentRemoveErrorMsg: "Пікірді қазір жою мүмкін емес. Қайта байқап көрініңіз немесе әкімшімен байланысыңыз.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Қалған таңбалар",

// Message
msgCloseAlt: "Хабарламаны жабу",

//More Less Link
showMoreText: "Қосымша көрсету",
showLessText: "Азырақ көрсету",
showMoreActions: "Қосымша...",

ariaShowMoreLabel: "Бұл түймешік көрсету мақсаттары үшін жасырылған мазмұнды көрсету үшін пайдаланылады. Көмекші технология пайдаланушыларына қатысты емес.",


//Tags
listTags: "${0} және тағы ${1}",

//Trends
expandTrend: "Трендтер сүзгісін ашу",
collapseTrend: "Трендтер сүзгісін тасалау",
trendTitle: "Трендтеу",
relatedTrendTitle: "''${0}'' трендін қосу",
trendHelp: "Трендтеу анықтамасы",
closeTrendHelp: "Трендтеу анықтамасын жабу",
trendDescription: "Күй жаңартуларында іздеуді орындауды оңайырақ жасау үшін жүйе арқылы құрылатын кілт сөз тренд болып табылады. Іздеу нәтижелерін көрсету үшін, кілтсөзге тағайындалған трендті басыңыз.",
noTrends: "Әлі трендтер жоқ",
selectedTrends: "Таңдалған трендтер",
relatedTrends: "Қатынасты трендтер",
relatedTrendsDesc: "Келешектегі іздеуді анықтау үшін қатысты трендті қосу",
removeTrend: "Таңдалған сүзгі трендтерінен ''${0}'' трендін жойыңыз",
removeGeneric: "Жою",
removeHashtag: "Таңдалған сүзгі тегтерінен ${0} хэштегін жойыңыз.",

//ActivityStream search
asSearchLabel: "Ағымдағы ағынды іздеу",
asSearchShadowtext: "Осы ағынды іздеу",
asSearchBarOpen: "Ағымдағы көріністі іздеу үшін іздеу жолын ашу",
asSearchBarCancel: "Іздеуді тоқтатып, негізгі көрініске оралу",
asSearch: "Іздеу",
asSearchGlobalView: "Іздеу нәтижелерін барлық мазмұннын көру",

matching: "Сәйкестендіру:",
matchingAllOf: "Барлығына сәйкес келу:",


//ViewAll extension
viewAllUpdates: "Барлық жаңартуларды көру",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} ескерілді",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} ескерілді",

// String for new filter
filterMention: "@Ескертулер",

// Aria string for mentions
ariaFilterMention: "Ескертпелер",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} күні ${time} сағатта",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Бүгін ${time} уақытта",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Кеше ${time} уақытта",
// e.g. Tomorrow at 6:45
timeTomorrow: "Ертең ${time} өрісінде",

// Names for filters in ActivityStream - used by gadget
filterAll: "Барлығы",
filterStatusUpdates: "Күйі жаңартулары",
filterActivities: "Әрекеттер",
filterBlogs: "Блогтар",
filterBookmarks: "Бетбелгілер",
filterCommunities: "Қауымдастықтар",
filterFiles: "Файлдар",
filterForums: "Форумдар",
filterPeople: "Адамдар",
filterProfiles: "Профильдер",
filterWikis: "Викилер",
filterTags: "Тегтер",
filterLibraries: "Кітапханалар",
filterMyNetworkAndPeopleIFollow: "Менің желім және мені жетелейтін адамдар",
filterMyNetwork: "Менің желім",
filterPeopleIFollow: "Мені жетелейтін адамдар",
filterMyUpdates: "Менің Жаңартуларым",
filterCommunitiesIFollow: "Мен жетелейтін қауымдастықтар",
filterForMe: "Маған",
filterFromMe: "Менен",

// Label for filters - used by gadget
viewFilterLabel: "Ішкі көрініс:",
filterOneLabel: "Келесі бойынша сүзу:",
filterTwoLabel: "Көрсету:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Бақылаудамын",
viewStatusUpdates: "Күйі жаңартулары",
viewActionRequired: "Талап етілетін әрекет",
viewSaved: "Сақталған",
viewMyNotifications: "Менің хабарландыруларым",
viewDiscover: "Табу",
viewRecentUpdates: "Соңғы жаңартулар",

// Aria label for As View Side Nav
ariaASViews: "Әрекет ағыны көріністері",

selectedLabel: "Бөлектелген",

// Gadget title
asTitle: "Қосылымдар жаңартулары",

// Used by gadget in Notes
updatesFromSender: "Жіберуші жаңартулары",
updatesFromContact: "Контакт жаңартулары",
updatesForUser: "Пайдаланушы үшін жаңартулар",
updatesFor: "${0} жаңартулары",
noUser: "Пайдаланушы осы электрондық-пошта мекенжайы үшін табылмады: ${0}",
returnMainView: "Қайтару",

//External Application Text
externalApplication: "Сыртқы бағдарлама",

//Strings for expanding comments inline
showPreviousComments: "Алдыңғы пікірлерді көрсету...",
hideAdditionalComments: "Қосымша пікірлерді жасыру...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${1} беттің ${0} беті",
errorRetrieveComments: "Алдыңғы пікірлерді шығарып алу кезінде қате орын алды.",
errorRetrieveCommentsDeleted: "Алдыңғы пікірлерді шығарып алу кезінде қате орын алды. Элемент жойылуы мүмкін.",

// News Item Actions - Repost
repostText: "Қайта жариялау",
logInRepostText: "Қайта жариялау үшін жүйеге кіру",
repostMsgSuccess: "Жаңартуды орындаушыларға қайта жариялады.",
repostMsgFail: "Осы хабарды қайта жариялау кезінде қате болды.",
repostMsgErrorResGeneric: "Сізде осы хабарды қайта жариялауға рұқсат жоқ.",
repostMsgErrorRestricted: "Осы хабарды ${0} қауымдастық шектеулі қауымдастық болғандықтан қайта жариялау мүмкін емес.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" ${0} тегін іздеу үшін осы жерді басыңыз. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Бұл сілтеме жаңа терезеде ашылады.",
attachFile : "Файл қосу",
removeFileAttachment: "Файл тіркемесін жою",

// External users 
externalUsersCommentsMsg: "Пікірлерді ұйымыңыздан тыс адамдар көре алады.",
externalUsersStatusUpdatesMsg: "Жаңартулар Күйін, ұйымыңыздан тыс пайдаланушылар көре алады.",
externalUsersItemMsg: "Сырттай ортақ пайдаланылады",

// Notifications Center
ariaNotificationCenter: "Құлақтандыру орталығы - Алған ескертулер мен мазмұнға ұқсас жаңартуларды қарау",
allNotifications : "Барлық құлақтандырулар",
seeAllNotifications : "Барлығын көру",
ariaSeeAllNotifications : "Басты беттегі менің ескертулерімнің көрінісіне бару үшін осында басу",
notificationsTitle : "Құлақтандырулар",
notificationsSettings : "Параметрлер",
ariaNotificationsSettings : "Құлақтандырулар параметрлерінің бетіне бару үшін осында басу",
ariaNewNotification : "Жаңа құлақтандыру тақырыбы. ${0}",
newNotifications: "${0} жаңа құлақтандыру",
loadingNotifications: "Жүктелуде...",
noNewNotifications: "Соңғы аптада ешқандай екерту алған жоқсыз.",
markRead: "Оқылатынын белгілеу",
markUnread: "Оқылмайтынын белгілеу",
markAllRead: "Барлық оқылатынды белгілеу",
markAllReadDetails: "Осында барлық ескерту оқылатынын белгілеу үшін басыңыз.",
notificationPopupSingleGeneric: "1 жаңа ескертуіңіз бар",
notificationPopupGeneric: "${0} жаңа екертулеріңіз бар"
});

