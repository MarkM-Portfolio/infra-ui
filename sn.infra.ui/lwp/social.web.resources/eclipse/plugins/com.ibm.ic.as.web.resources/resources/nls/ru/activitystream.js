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
loadingText: "Загрузка...",

//common strings
errorText: "Ошибка",

invalidASConfig: "Ошибка конфигурации потока обновлений. Обратитесь к администратору.",

// News Item
// ${0}  :  Person display name
photoOfText: "Фотография пользователя ${0}",
// ${0}  :  Application
eventFromText: "Мероприятие из ${0}",
removeNewsItemText: "Удалить этот элемент ",
// ${0}  :  Number of likes for a news item
tagsText: "Теги: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "Отметок Нравится: ${0}",
likeText: "1 отметка Нравится",
imageNotAvailable: "Предварительный просмотр недоступен",
likeError: "Ошибка при отметке этого элемента как понравившегося.",
unLikeError: "Ошибка при отметке этого элемента как непонравившегося.",
// ${0} author name
fromText: "От: ${0}",

sizeMB: "${0} МБ",
sizeGB: "${0} ГБ",
sizeKB: "${0} КБ",

//File download strings
downloadError: "Ошибка загрузки",
downloadErrorMessage: "Невозможно загрузить файл. Он мог быть удален, или у вас недостаточно прав доступа к нему.",
closeText: "закрыть",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Это ссылка на профайл ${0}",

// Files News Items
publicText: "Общедоступный",
privateText: "Личный",

// Video Preview
ariaPlayVideo: "Воспроизвести видео",
ariaVideoArea: "Область видео, нажмите ENTER для доступа к видеоконтроллерам",

// News Item Actions - Comment
commentText: "Комментарий",
logInText: "Войти",
logInCommentText: "Войти для добавления комментария",
deleteCommentText: "Удалить комментарий",
addCommentText: "Добавить комментарий...",
ariaAddCommentText: "Добавить комментарий",
writeCommentText: "Введите текст...",
ariaCommentText: "Введите текст",
commentNotPermittedText: "У вас нет прав для комментирования этого сообщения.",
commentFailureText: "Не удалось добавить текст комментария. Обновите страницу и повторите попытку.",
commentSessionTimedOut: "Сеанс связи с сервером был автоматически закрыт из-за простоя. Скопируйте введенный текст в буфер обмена, чтобы не потерять его, и <a href : ''${0}''>войдите в систему</a>, чтобы начать все заново.",
commentPostText: "Опубликовать",
commentCancelText: "Отмена",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Комментарий слишком длинный для публикации. Сократите комментарий и повторите попытку.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Комментарий опубликован.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "Пользователь ${0} добавил комментарий ${1}",
// same as above, but for replies
replyAriaLabel: "Пользователь ${0} написал ответ ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Показать элемент в новом окне на странице ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "Пользователь ${0} добавил комментарий в ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "Пользователь ${0} написал ответ в ${1}",

// News Item Actions - Save
savedText: "Сохраненные",
savedSuccessText: "Успешно сохранено",

// No Content Item
noContentText: "Обновлений нет.",

// News Feed Error
feedErrorText: "Обнаружена ошибка при извлечении ваших новостных лент.",
itemErrorText: "Ошибка отображения элемента на ленте новостей.",
errorAlt : "Ошибка:",
errorShowMore: "Показать больше",
errorShowLess: "Показать меньше",

// Paging Handler
backToTopText: "Вернуться в начало",
ariaShowMore: "Показать больше элементов потока операций",
ariaShowLess: "Показать меньше элементов потока операций",
ariaBackToTop: "Вернуться в начало списка элементов потока операций",

// Feed Link
feedLinkText: "Лента новостей для этих записей",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "Еще комментариев: ${0}",
oneMoreCommentsText: "Еще 1 комментарий",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Показать все комментарии (кол-во: ${0}) ",
singleCommentText: "Показать комментарий",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Комментарии для ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Комментарии для ${0}. Для просмотра всех комментариев (общее кол-во: ${1}) используйте команду Дополнительно.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "элемент",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Поток операций",

// Filters
selectFilter: "Выбрать фильтр",
filterAriaDescription: "Выбрать фильтр для изменения типа элементов, показываемых в потоке операций",
filterAriaLabel: "Фильтр потока операций",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Нажмите клавишу Enter для просмотра сведений об этом элементе",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Показать действия",

ariaActionsToolbar: "Действия с элементом",

// Description for EE opener
openEEText: "Показать дополнительные сведения об этом элементе",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Удалить это сообщение",
statusRemoveConfirmMessageText: "Вы действительно хотите удалить это сообщение?",
statusRemoveConfirmText: "Удалить",
statusRemoveCancelText: "Отмена",
statusRemoveConfirmationMsg:  "Сообщение успешно удалено.",
statusRemoveErrorMsg: "Невозможно удалить сообщение в данный момент. Повторите попытку или обратитесь к администратору.",
commentRemoveText: "Удалить этот комментарий",
commentRemoveConfirmMessageText: "Вы действительно хотите удалить этот комментарий?",
commentRemoveConfirmText: "Удалить",
commentRemoveCancelText: "Отмена",
commentRemoveConfirmationMsg: "Комментарий успешно удален.",
commentRemoveErrorMsg: "Невозможно удалить комментарий в данный момент. Повторите попытку или обратитесь к администратору.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Осталось символов",

// Message
msgCloseAlt: "Закрыть сообщение",

//More Less Link
showMoreText: "Показать больше",
showLessText: "Показать меньше",
showMoreActions: "Дополнительно...",

ariaShowMoreLabel: "Эта кнопка используется для отображения информации, которая скрыта для целей отображения. Это не имеет отношения к пользователям реабилитационных технологий.",


//Tags
listTags: "${0} и еще ${1}",

//Trends
expandTrend: "Развернуть фильтр тенденций",
collapseTrend: "Свернуть фильтр тенденций",
trendTitle: "Тенденция",
relatedTrendTitle: "Добавить тенденцию ''${0}''",
trendHelp: "Справка по тенденциям",
closeTrendHelp: "Закрыть справку по тенденциям",
trendDescription: "Тенденция - это ключевое слово, которое создается системой для облегчения поиска обновлений статуса. Щелкните на тенденции, чтобы просмотреть результаты поиска по ключевому слову.",
noTrends: "Нет тенденций",
selectedTrends: "Выбранные тенденции",
relatedTrends: "Связанные тенденции",
relatedTrendsDesc: "Добавьте связанную тенденцию для дальнейшего уточнения поиска",
removeTrend: "Удалить тенденцию ''${0}'' из выбранных тенденций фильтра",
removeGeneric: "Удалить",
removeHashtag: "Удалить хэштег ${0} из выбранных тегов фильтра.",

//ActivityStream search
asSearchLabel: "Поиск в текущем потоке",
asSearchShadowtext: "Поиск в этом потоке",
asSearchBarOpen: "Открыть панель поиска для поиска в текущем представлении",
asSearchBarCancel: "Отменить поиск и вернуться в главное представление",
asSearch: "Поиск",
asSearchGlobalView: "Просмотр результатов поиска во всех материалах",

matching: "Содержащие:",
matchingAllOf: "Все из:",


//ViewAll extension
viewAllUpdates: "Показать все обновления",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "Упомянут пользователь ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "Упомянуты пользователи ${0}",

// String for new filter
filterMention: "@Упоминания",

// Aria string for mentions
ariaFilterMention: "Упоминания",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE}, ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Сегодня в ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Вчера в ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Завтра в ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Все",
filterStatusUpdates: "Обновления статуса",
filterActivities: "Операции",
filterBlogs: "Блоги",
filterBookmarks: "Закладки",
filterCommunities: "Сообщества",
filterFiles: "Файлы",
filterForums: "Форумы",
filterPeople: "Пользователи",
filterProfiles: "Профайлы",
filterWikis: "Вики",
filterTags: "Теги",
filterLibraries: "Библиотеки",
filterMyNetworkAndPeopleIFollow: "Моя сеть и отслеживаемые пользователи",
filterMyNetwork: "Моя сеть",
filterPeopleIFollow: "Отслеживаемые пользователи",
filterMyUpdates: "Мои обновления",
filterCommunitiesIFollow: "Сообщества, которые я отслеживаю",
filterForMe: "Для меня",
filterFromMe: "От меня",

// Label for filters - used by gadget
viewFilterLabel: "Подпредставление:",
filterOneLabel: "Фильтр по:",
filterTwoLabel: "Показать:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Отслеживаемые мной",
viewStatusUpdates: "Обновления статуса",
viewActionRequired: "Требующие внимания",
viewSaved: "Сохраненные",
viewMyNotifications: "Мои уведомления",
viewDiscover: "Найти",
viewRecentUpdates: "Последние обновления",

// Aria label for As View Side Nav
ariaASViews: "Представления потока операций",

selectedLabel: "Выбран",

// Gadget title
asTitle: "Обновления Connections",

// Used by gadget in Notes
updatesFromSender: "Обновления от отправителя",
updatesFromContact: "Обновления от контакта",
updatesForUser: "Обновления для пользователя",
updatesFor: "Обновления для ${0}",
noUser: "Не найден пользователь, соответствующий этому адресу электронной почты: ${0}",
returnMainView: "Вернуться",

//External Application Text
externalApplication: "Внешнее приложение",

//Strings for expanding comments inline
showPreviousComments: "Показать предыдущие комментарии...",
hideAdditionalComments: "Скрыть дополнительные комментарии...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} из ${1}",
errorRetrieveComments: "Ошибка при получении предыдущих комментариев.",
errorRetrieveCommentsDeleted: "Ошибка при получении предыдущих комментариев. Возможно, элементы удалены.",

// News Item Actions - Repost
repostText: "Сделать репост",
logInRepostText: "Войдите в систему, чтобы сделать репост",
repostMsgSuccess: "Сделан репост обновления для отслеживающих вас пользователей.",
repostMsgFail: "При репосте сообщения возникла ошибка.",
repostMsgErrorResGeneric: "Нет прав доступа для репоста этого сообщения.",
repostMsgErrorRestricted: "Репост сообщения невозможен, так как сообщество ${0} сейчас является частным.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Щелкните здесь для поиска тега ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Эта ссылка открывается в новом окне.",
attachFile : "Добавить файл",
removeFileAttachment: "Удалить вложенный файл",

// External users 
externalUsersCommentsMsg: "Комментарии могут быть доступны внешним пользователям (за пределами организации).",
externalUsersStatusUpdatesMsg: "Обновления статуса могут быть доступны внешним пользователям (за пределами организации).",
externalUsersItemMsg: "Разрешен доступ внешним пользователям",

// Notifications Center
ariaNotificationCenter: "Центр уведомлений - просмотр обновлений, связанных с вашими материалами, и полученных приглашений",
allNotifications : "Все уведомления",
seeAllNotifications : "Просмотреть все",
ariaSeeAllNotifications : "Щелкните здесь для перехода к представлению Мои уведомления на домашней странице",
notificationsTitle : "Уведомления",
notificationsSettings : "Параметры",
ariaNotificationsSettings : "Щелкните здесь для перехода к странице параметров уведомлений",
ariaNewNotification : "Название нового уведомления. ${0}",
newNotifications: "Новых уведомлений: ${0}",
loadingNotifications: "Загрузка...",
noNewNotifications: "Нет новых уведомлений за последнюю неделю.",
markRead: "Пометить как прочитанное",
markUnread: "Пометить как непрочитанное",
markAllRead: "Пометить все как прочитанное",
markAllReadDetails: "Щелкните здесь, чтобы пометить все уведомления как прочитанные.",
notificationPopupSingleGeneric: "1 новое уведомление",
notificationPopupGeneric: "Новых уведомлений: ${0}"
});

