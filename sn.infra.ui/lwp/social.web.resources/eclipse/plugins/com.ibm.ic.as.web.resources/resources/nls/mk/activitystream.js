/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

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
loadingText: "Вчитување...",

//common strings
errorText: "Грешка",

invalidASConfig: "Има грешка во конфигурацијата на постојаниот тек на ажурирањата. Контактирајте со администраторот.",

// News Item
// ${0}  :  Person display name
photoOfText: "Фотографија од ${0}",
// ${0}  :  Application
eventFromText: "Настан од ${0}",
removeNewsItemText: "Избриши ја ставката ",
// ${0}  :  Number of likes for a news item
tagsText: "Ознаки: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} допаѓања",
likeText: "1 допаѓање",
imageNotAvailable: "Во моментов, прегледот е недостапен",
likeError: "Се појави грешка при означувањето дека ви се допаѓа оваа ставка",
unLikeError: "Се појави грешка при означувањето дека не ви се допаѓа оваа ставка.",
// ${0} author name
fromText: "Од:${0}",

sizeMB: "${0} МБ",
sizeGB: "${0} ГБ",
sizeKB: "${0} КБ",

//File download strings
downloadError: "Грешка при преземањето",
downloadErrorMessage: "Датотеката не може да се преземе. Можеби е избришана или можеби немате пристап до неа.",
closeText: "затвори",
okText: "ОК",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Ова е врска до профилот на ${0}",

// Files News Items
publicText: "Јавно",
privateText: "Приватно",

// Video Preview
ariaPlayVideo: "Пушти видео",
ariaVideoArea: "Област за видео, притиснете ENTER за да пристапите до контролерите за видео",

// News Item Actions - Comment
commentText: "Коментар",
logInText: "Најави се",
logInCommentText: "Најавете се за да коментирате",
deleteCommentText: "Избриши коментар",
addCommentText: "Додај коментар...",
ariaAddCommentText: "Додајте коментар",
writeCommentText: "Напиши нешто...",
ariaCommentText: "Напишете нешто",
commentNotPermittedText: "Не сте овластени да коментирате на пораката",
commentFailureText: "Обидот да додадете текст на коментарот не успеа. Освежете ја страницата и обидете се повторно.",
commentSessionTimedOut: "Поради неактивност, автоматски сте одјавени од серверот. Копирајте го текстот што го внесовте во складот да да не го загубите, а потоа <a href : ''${0}''>најавете се</a> за да почнете одново.",
commentPostText: "Објави",
commentCancelText: "Откажи",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Коментарот е предолг за да се објави. Поправете го коментарот и обидете се повторно.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Вашиот коментар е објавен.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} напиша коментар на ${1}",
// same as above, but for replies
replyAriaLabel: "${0} напиша одговор на ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Прикажете ја ставката во нов прозорец на страницата ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} напиша коментар во ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} напиша одговор во ${1}",

// News Item Actions - Save
savedText: "Зачувано",
savedSuccessText: "Успешно зачувано",

// No Content Item
noContentText: "Нема ажурирања за прикажување",

// News Feed Error
feedErrorText: "Имаше грешка при враќањето на навестувањето на вестите.",
itemErrorText: "Се појави грешка при прикажувањето ставка во навестувањето.",
errorAlt : "Грешка:",
errorShowMore: "Покажи повеќе",
errorShowLess: "Покажи помалку",

// Paging Handler
backToTopText: "Назад на врвот",
ariaShowMore: "Прикажи повеќе ставки во постојаниот тек на активноста",
ariaShowLess: "Прикажи помалку ставки во постојаниот тек на активноста",
ariaBackToTop: "Назад на врвот на ставките во постојаниот тек на активноста",

// Feed Link
feedLinkText: "Навестување за овие записи",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "Уште ${0} коментари",
oneMoreCommentsText: "Уште 1 коментар",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Прикажи ги сите ${0} коментари ",
singleCommentText: "Прикажи коментар",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Коментари за ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Коментари за ${0}. Употребете повеќе детали за да ги прикажете сите ${1} коментари.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "ставка",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Постојан тек на активноста",

// Filters
selectFilter: "Изберете филтер",
filterAriaDescription: "Изберете филтер за да го измените типот на ставките прикажани во постојаниот тек на активноста",
filterAriaLabel: "Филтрирајте го постојаниот тек на активноста",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Притиснете го копчето enter за да прикажете повеќе детали за ставката",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Прикажи дејства",

ariaActionsToolbar: "Дејства на ставката",

// Description for EE opener
openEEText: "Прикажете повеќе детали за ставката",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Избриши ја пораката",
statusRemoveConfirmMessageText: "Дали сте сигурни дека сакате да ја избришете пораката?",
statusRemoveConfirmText: "Избриши",
statusRemoveCancelText: "Откажи",
statusRemoveConfirmationMsg:  "Пораката е успешно избришана.",
statusRemoveErrorMsg: "Пораката не може да се избрише во моментов. Обидете се повторно или контактирајте со администраторот.",
commentRemoveText: "Избриши го коментарот",
commentRemoveConfirmMessageText: "Дали сте сигурни дека сакате да го избришете коментарот?",
commentRemoveConfirmText: "Избриши",
commentRemoveCancelText: "Откажи",
commentRemoveConfirmationMsg: "Коментарот е успешно избришан.",
commentRemoveErrorMsg: "Коментарот не може да се избрише во моментов. Обидете се повторно или контактирајте со администраторот.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Преостанати знаци",

// Message
msgCloseAlt: "Затвори ја пораката",

//More Less Link
showMoreText: "Покажи повеќе",
showLessText: "Покажи помалку",
showMoreActions: "Повеќе...",

ariaShowMoreLabel: "Копчето се користи за да се прикаже содржината што била скриена заради екранот. Ова нема значење за корисниците на помошна технологија.",


//Tags
listTags: "${0} и уште ${1}",

//Trends
expandTrend: "Прошири го филтерот за трендови",
collapseTrend: "Собери го филтерот за трендови",
trendTitle: "Трендови",
relatedTrendTitle: "Додај го трендот „${0}“",
trendHelp: "Помош за трендови",
closeTrendHelp: "Затвори ја Помош за трендови",
trendDescription: "Трендот е клучен збор генериран од системот за полесно извршување на пребарувањето во Ажурирања на статусот. Кликнете на тренд за да се прикажат резултатите од пребарувањето доделени на тој клучен збор.",
noTrends: "Уште нема трендови",
selectedTrends: "Избрани трендови",
relatedTrends: "Поврзани трендови",
relatedTrendsDesc: "Додајте поврзан тренд за дополнително да го подобрите пребарувањето",
removeTrend: "Отстранете го трендот од „${0}“ од трендовите во избраниот филтер",
removeGeneric: "Отстрани",
removeHashtag: "Отстранете го хаштагот ${0} од ознаките во избраниот филтер.",

//ActivityStream search
asSearchLabel: "Пребарај го тековниот постојан тек",
asSearchShadowtext: "Пребарај го овој постојан тек",
asSearchBarOpen: "Отворете ја лентата за пребарување за Пребарување на тековниот приказ",
asSearchBarCancel: "Откажете го Пребарувањето и вратете се на главниот триказ",
asSearch: "Пребарај",
asSearchGlobalView: "Прикажете ги резултатите од пребарувањето од сите ваши содржини",

matching: "Совпаѓање:",
matchingAllOf: "Совпаѓање на сите од:",


//ViewAll extension
viewAllUpdates: "Прикажи ги сите ажурирања",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} беше споменат",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} беа споменати",

// String for new filter
filterMention: "@Споменувања",

// Aria string for mentions
ariaFilterMention: "Споменувања",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} во ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Денеска во ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Вчера во ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Утре во ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Сите",
filterStatusUpdates: "Ажурирања на статусот",
filterActivities: "Активности",
filterBlogs: "Блогови",
filterBookmarks: "Обележувачи",
filterCommunities: "Заедници",
filterFiles: "Датотеки",
filterForums: "Форуми",
filterPeople: "Лица",
filterProfiles: "Профили",
filterWikis: "Wikis",
filterTags: "Ознаки",
filterLibraries: "Библиотеки",
filterMyNetworkAndPeopleIFollow: "Моја мрежа и лица кои ги следам",
filterMyNetwork: "Моја мрежа",
filterPeopleIFollow: "Лица кои ги следам",
filterMyUpdates: "Мои ажурирања",
filterCommunitiesIFollow: "Заедници што ги следам",
filterForMe: "За мене",
filterFromMe: "Од мене",

// Label for filters - used by gadget
viewFilterLabel: "Потприказ:",
filterOneLabel: "Филтрирај според:",
filterTwoLabel: "Покажи:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Следам",
viewStatusUpdates: "Ажурирања на статусот",
viewActionRequired: "Потребно е дејство",
viewSaved: "Зачувано",
viewMyNotifications: "Мои известувања",
viewDiscover: "Откриј",
viewRecentUpdates: "Најнови ажурирања",

// Aria label for As View Side Nav
ariaASViews: "Прикази на постојаниот тек на активноста",

selectedLabel: "Избрано",

// Gadget title
asTitle: "Ажурирања на Connections",

// Used by gadget in Notes
updatesFromSender: "Ажурирања од испраќачот",
updatesFromContact: "Ажурирања од контактот",
updatesForUser: "Ажурирања за корисникот",
updatesFor: "Ажурирана за ${0}",
noUser: "Не е најден корисник за оваа адреса на е-пошта: ${0}",
returnMainView: "Врати",

//External Application Text
externalApplication: "Надворешна апликација",

//Strings for expanding comments inline
showPreviousComments: "Прикажи ги претходните коментари...",
hideAdditionalComments: "Сокриј ги дополнителните коментари...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} од ${1}",
errorRetrieveComments: "Се појави грешка при вчитувањето на претходните коментари.",
errorRetrieveCommentsDeleted: "Се појави грешка при вчитувањето на претходните коментари. Можеби е избришана ставка.",

// News Item Actions - Repost
repostText: "Објави повторно",
logInRepostText: "Најавете се за да објавите повторно",
repostMsgSuccess: "Ажурирањето е повторно успешно објавено до вашите следбеници.",
repostMsgFail: "Имаше грешка при повторното објавување на пораката.",
repostMsgErrorResGeneric: "Не сте овластени повторно да ја објавите пораката.",
repostMsgErrorRestricted: "Пораката не може повторно да се објави бидејќи заедницата ${0} сега е ограничена заедница.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Кликнете тука за пребарување за ознаката ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Оваа врска ќе се отвори во нов прозорец.",
attachFile : "Додај датотека",
removeFileAttachment: "Отстрани го прилогот на датотеката",

// External users 
externalUsersCommentsMsg: "Коментарите може да ги видат надворешни лица кои не се од вашата организација.",
externalUsersStatusUpdatesMsg: "Ажурирањата на статусот може да ги видат надворешни лица кои не се од вашата организација.",
externalUsersItemMsg: "Споделено надворешно",

// Notifications Center
ariaNotificationCenter: "Центар за известувања - Прикажете ги ажурирањата поврзани со вашата содржина и известувањата што ги примате",
allNotifications : "Сите известувања",
seeAllNotifications : "Види ги сите",
ariaSeeAllNotifications : "Кликнете тука за да отидете до приказот Мои известувања во почетната страница",
notificationsTitle : "Известувања",
notificationsSettings : "Параметри",
ariaNotificationsSettings : "Кликнете тука за да отидете до страница со параметри на известувањата",
ariaNewNotification : "Наслов на новото известување. ${0}",
newNotifications: "${0} нови известувања",
loadingNotifications: "Вчитување...",
noNewNotifications: "Немате примено известувања изминатата седмица.",
markRead: "Означи како прочитано",
markUnread: "Означи како непрочитано",
markAllRead: "Означи ги сите како прочитани",
markAllReadDetails: "Кликнете тука за да ги означите сите известувања како прочитани.",
notificationPopupSingleGeneric: "Имате 1 ново известување",
notificationPopupGeneric: "Имате ${0} нови известувања"
});

