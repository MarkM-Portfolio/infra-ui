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
loadingText: "Зареждане...",

//common strings
errorText: "Грешка",

invalidASConfig: "Има грешка при конфигурирането на потока за актуализации. Свържете се със системния си администратор.",

// News Item
// ${0}  :  Person display name
photoOfText: "Снимка на ${0}",
// ${0}  :  Application
eventFromText: "Събитие от ${0}",
removeNewsItemText: "Изтриване на този елемент ",
// ${0}  :  Number of likes for a news item
tagsText: "Етикети: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} харесвания",
likeText: "1 харесване",
imageNotAvailable: "Към момента предварителният преглед не е достъпен",
likeError: "Възникна грешка при харесването на този елемент.",
unLikeError: "Възникна грешка при премахването на харесване на този елемент.",
// ${0} author name
fromText: "От: ${0}",

sizeMB: "${0} МБ",
sizeGB: "${0} ГБ",
sizeKB: "${0} КБ",

//File download strings
downloadError: "Грешка при изтегляне",
downloadErrorMessage: "Файлът не можа да се изтегли. Той може да е бил изтрит или може да нямате достъп до него.",
closeText: "затваряне",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Това е връзка към профила на ${0}",

// Files News Items
publicText: "Публични",
privateText: "Частни",

// Video Preview
ariaPlayVideo: "Пусни видеоклипа",
ariaVideoArea: "Видео зона, натиснете ENTER, за да осъществите достъп до видео контролерите",

// News Item Actions - Comment
commentText: "Коментар",
logInText: "Влизане",
logInCommentText: "Влезте, за да коментирате",
deleteCommentText: "Изтриване на коментар",
addCommentText: "Добавяне на коментар...",
ariaAddCommentText: "Добавяне на коментар",
writeCommentText: "Напишете нещо...",
ariaCommentText: "Напишете нещо",
commentNotPermittedText: "Не сте оторизиран да правите коментари по това съобщение.",
commentFailureText: "Неуспешен опит за добавяне на текст на коментар. Обновете страницата си и опитайте отново.",
commentSessionTimedOut: "Бяхте автоматично изключени от сървъра поради неактивност. Копирайте във Вашата буферна памет текст, който сте въвели, за да не го загубите, и след това <a href : ''${0}''>влезте</a>, за да започнете отначало.",
commentPostText: "Публикуване",
commentCancelText: "Отказ",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Коментарът е твърде дълъг, за да бъде публикуван. Променете коментара и опитайте отново.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Коментарът Ви е публикуван.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} написа коментар на ${1}",
// same as above, but for replies
replyAriaLabel: "${0} написа отговор на ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Преглед на елемент в нов прозорец на стр. ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} написа коментар в ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} написа отговор на ${1}",

// News Item Actions - Save
savedText: "Записано",
savedSuccessText: "Успешно записано",

// No Content Item
noContentText: "Няма актуализации за показване.",

// News Feed Error
feedErrorText: "Има грешка при извличането на информационния канал за новини.",
itemErrorText: "Възникна грешка при показването на елемент в информационния Ви канал.",
errorAlt : "Грешка:",
errorShowMore: "Показване на повече",
errorShowLess: "Показване на по-малко",

// Paging Handler
backToTopText: "Обратно горе",
ariaShowMore: "Показване на повече елементи от потока на дейността",
ariaShowLess: "Показване на по-малко елементи от потока на дейността",
ariaBackToTop: "Обратно горе към елементите от потока на дейността",

// Feed Link
feedLinkText: "Информационен канал за тези записи",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} повече коментари",
oneMoreCommentsText: "още 1 коментар",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Показване на всички ${0} коментари ",
singleCommentText: "Показване на коментар",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Коментари за ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Коментари за ${0}. Използване на повече подробности за показване на всички ${1} коментари.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "елемент",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Поток на дейност",

// Filters
selectFilter: "Изберете филтър",
filterAriaDescription: "Изберете филтър, за да промените типа елементи, показвани в потока на дейността",
filterAriaLabel: "Филтриране на потока на дейността",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Натиснете бутон enter, за да покажете повече подробности за този елемент",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Показване на действия",

ariaActionsToolbar: "Действия за елемент",

// Description for EE opener
openEEText: "Показване на повече подробности за този елемент",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Изтриване на това съобщение",
statusRemoveConfirmMessageText: "Сигурни ли сте, че искате да изтриете това съобщение?",
statusRemoveConfirmText: "Изтриване",
statusRemoveCancelText: "Отказ",
statusRemoveConfirmationMsg:  "Съобщението е изтрито успешно.",
statusRemoveErrorMsg: "Съобщението не можа да се изтрие към момента. Опитайте отново или се свържете с администратор.",
commentRemoveText: "Изтриване на този коментар",
commentRemoveConfirmMessageText: "Наистина ли искате да изтриете този коментар?",
commentRemoveConfirmText: "Изтриване",
commentRemoveCancelText: "Отказ",
commentRemoveConfirmationMsg: "Коментарът е изтрит успешно.",
commentRemoveErrorMsg: "Коментарът не можа да се изтрие към момента. Опитайте отново или се свържете с администратор.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Оставащи символи",

// Message
msgCloseAlt: "Затваряне на съобщението",

//More Less Link
showMoreText: "Показване на повече",
showLessText: "Показване на по-малко",
showMoreActions: "Повече...",

ariaShowMoreLabel: "Бутонът се използва за показване на съдържание, което е скрито с цел показване. Не е приложимо за потребители на помощна технология.",


//Tags
listTags: "${0} и ${1} повече",

//Trends
expandTrend: "Разгъване на филтъра за тенденции",
collapseTrend: "Сгъване на филтъра за тенденции",
trendTitle: "Трендове (набиращи популярност)",
relatedTrendTitle: "Добавяне на тенденция ''${0}''",
trendHelp: "Помощ за трендове.",
closeTrendHelp: "Затваряне на помощта за трендове.",
trendDescription: "Тренд е ключова дума, която се генерира от системата за улесняване на търсенето в актуализациите на състояния. Щракнете върху тренд, за да видите резултатите от търсенето, които са приписани на тази ключова дума.",
noTrends: "Все още няма тенденции",
selectedTrends: "Избрани тенденции",
relatedTrends: "Свързани тенденции",
relatedTrendsDesc: "Добавяне на свързана тенденция за стесняване на търсенето",
removeTrend: "Премахване на тенденция ''${0}'' от избраните тенденции за филтър",
removeGeneric: "Премахване",
removeHashtag: "Премахване на етикет с префикс ${0} от избраните филтърни етикети.",

//ActivityStream search
asSearchLabel: "Търсене в текущия поток",
asSearchShadowtext: "Търсене в този поток",
asSearchBarOpen: "Отваряне на лентата за търсене за Търсене в текущ преглед",
asSearchBarCancel: "Анулиране на търсенето и връщане в основния преглед",
asSearch: "Търсене",
asSearchGlobalView: "Преглед на резултатите от търсенето от цялото Ви съдържание",

matching: "Съвпадения:",
matchingAllOf: "Съвпадения на всички от:",


//ViewAll extension
viewAllUpdates: "Преглед на всички актуализации",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} беше споменат",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} бяха споменати",

// String for new filter
filterMention: "@Споменавания",

// Aria string for mentions
ariaFilterMention: "Споменавания",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} в ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Днес в ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Вчера в ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Утре в ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Всички",
filterStatusUpdates: "Актуализации на състоянието",
filterActivities: "Дейности",
filterBlogs: "Блогове",
filterBookmarks: "Отметки",
filterCommunities: "Общности",
filterFiles: "Файлове",
filterForums: "Форуми",
filterPeople: "Лица",
filterProfiles: "Профили",
filterWikis: "Wikis",
filterTags: "Етикети",
filterLibraries: "Библиотеки",
filterMyNetworkAndPeopleIFollow: "Моята мрежа и хора, които следвам",
filterMyNetwork: "Моята мрежа",
filterPeopleIFollow: "Хора, които следя",
filterMyUpdates: "Моите актуализации",
filterCommunitiesIFollow: "Общности, които следвам",
filterForMe: "За мен",
filterFromMe: "От мен",

// Label for filters - used by gadget
viewFilterLabel: "Подизглед:",
filterOneLabel: "Филтриране по:",
filterTwoLabel: "Показване:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Следвам",
viewStatusUpdates: "Актуализации на състоянието",
viewActionRequired: "Изисква се действие",
viewSaved: "Записано",
viewMyNotifications: "Моите известия",
viewDiscover: "Откриване",
viewRecentUpdates: "Скорошни актуализации",

// Aria label for As View Side Nav
ariaASViews: "Преглеждания на поток с дейности",

selectedLabel: "Избрано",

// Gadget title
asTitle: "Актуализации на Connections",

// Used by gadget in Notes
updatesFromSender: "Актуализации от изпращача",
updatesFromContact: "Актуализации от контакта",
updatesForUser: "Актуализации за потребителя",
updatesFor: "Актуализации за ${0}",
noUser: "Няма открит потребител за този имейл адрес: ${0}",
returnMainView: "Връщане",

//External Application Text
externalApplication: "Външно приложение",

//Strings for expanding comments inline
showPreviousComments: "Покажи предишни коментари...",
hideAdditionalComments: "Скрий допълнителни коментари...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} от ${1}",
errorRetrieveComments: "Възникна грешка при извличането на предишни коментари.",
errorRetrieveCommentsDeleted: "Възникна грешка при извличането на предишни коментари. Елементът може да е бил изтрит.",

// News Item Actions - Repost
repostText: "Повторно публикуване",
logInRepostText: "Влезте, за да публикувате повторно",
repostMsgSuccess: "Актуализацията успешно е публикувана повторно на последователите Ви.",
repostMsgFail: "Възникна грешка при повторното публикуване на това съобщение.",
repostMsgErrorResGeneric: "Не сте упълномощен да публикувате повторно това съобщение.",
repostMsgErrorRestricted: "Това съобщение не може да бъде повторно публикувано, тъй като общността ${0} вече е ограничена общност.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Щракнете тук за търсене на етикет ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Тази връзка ще се отвори в нов прозорец.",
attachFile : "Добавяне на файл",
removeFileAttachment: "Премахване на прикачения файл",

// External users 
externalUsersCommentsMsg: "Коментарите могат да бъдат видени от лица, външни за Вашата организация.",
externalUsersStatusUpdatesMsg: "Актуализирането на състоянието може да бъде видяно от лица, външни за Вашата организация.",
externalUsersItemMsg: "Споделени външно",

// Notifications Center
ariaNotificationCenter: "Център за известия - Преглеждайте актуализации, свързани с Вашето съдържание и известията, които сте получили",
allNotifications : "Всички известия",
seeAllNotifications : "Вижте всички",
ariaSeeAllNotifications : "Щракнете тук, за да отидете на изгледа Моите известия в началната страница",
notificationsTitle : "Известия",
notificationsSettings : "Настройки",
ariaNotificationsSettings : "Щракнете тук, за да отидете на страницата с настройки за известия",
ariaNewNotification : "Ново заглавие за известие. ${0}",
newNotifications: "${0} нови известия",
loadingNotifications: "Зареждане...",
noNewNotifications: "Не сте получили известия през последната седмица.",
markRead: "Обозначаване като прочетено",
markUnread: "Обозначаване като непрочетено",
markAllRead: "Обозначаване на всички като прочетени",
markAllReadDetails: "Щракнете тук, за да обозначите всички известия като прочетени.",
notificationPopupSingleGeneric: "Имате 1 ново известие",
notificationPopupGeneric: "Имате ${0} нови известия"
});

