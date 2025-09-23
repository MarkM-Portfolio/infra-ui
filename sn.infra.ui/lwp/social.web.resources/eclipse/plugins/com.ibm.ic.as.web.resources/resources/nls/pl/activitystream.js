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
loadingText: "Ładowanie...",

//common strings
errorText: "Błąd",

invalidASConfig: "Wystąpił błąd w konfiguracji dla strumienia aktualizacji. Skontaktuj się z administratorem.",

// News Item
// ${0}  :  Person display name
photoOfText: "Zdjęcie użytkownika ${0}",
// ${0}  :  Application
eventFromText: "Zdarzenie od ${0}",
removeNewsItemText: "Usuń ten element ",
// ${0}  :  Number of likes for a news item
tagsText: "Znaczniki: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "Polubienia: ${0}",
likeText: "1 polubienie",
imageNotAvailable: "Podgląd aktualnie nie jest dostępny",
likeError: "Wystąpił błąd podczas oznaczania tego elementu jako polubionego.",
unLikeError: "Wystąpił błąd podczas anulowania polubienia tego elementu.",
// ${0} author name
fromText: "Od: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} kB",

//File download strings
downloadError: "Błąd pobierania",
downloadErrorMessage: "Nie można pobrać pliku. Plik mógł zostać usunięty lub użytkownik nie ma do niego dostępu.",
closeText: "Zamknij",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "To jest odsyłacz do profilu użytkownika ${0}",

// Files News Items
publicText: "Publiczne",
privateText: "Prywatne",

// Video Preview
ariaPlayVideo: "Odtwórz film wideo",
ariaVideoArea: "Jest to obszar Wideo. Naciśnij klawisz ENTER, aby uzyskać dostęp do kontrolerów wideo.",

// News Item Actions - Comment
commentText: "Komentarz",
logInText: "Zaloguj",
logInCommentText: "Zaloguj się, aby dodać komentarz",
deleteCommentText: "Usuń komentarz",
addCommentText: "Dodaj komentarz...",
ariaAddCommentText: "Dodaj komentarz",
writeCommentText: "Napisz coś...",
ariaCommentText: "Napisz coś",
commentNotPermittedText: "Brak autoryzacji do umieszczania komentarzy dotyczących tej wiadomości.",
commentFailureText: "Próba dodania tekstu komentarza nie powiodła się. Odśwież stronę i ponów próbę.",
commentSessionTimedOut: "Nastąpiło automatyczne wylogowanie z serwera spowodowane brakiem aktywności. Skopiuj wprowadzony tekst do schowka, aby go nie utracić, a następnie <a href : ''${0}''>zaloguj się</a>, aby zacząć od nowa.",
commentPostText: "Publikuj",
commentCancelText: "Anuluj",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Komentarz jest zbyt długi, aby można go było opublikować. Zmień komentarz i spróbuj ponownie.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Komentarz został opublikowany.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "Osoba ${0} napisała komentarz w dniu: ${1}",
// same as above, but for replies
replyAriaLabel: "Osoba ${0} napisała odpowiedź w dniu: ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Wyświetl element w nowym oknie na stronie ${0} ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "Osoba ${0} napisała komentarz o godzinie: ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "Osoba ${0} napisała odpowiedź o godzinie: ${1}",

// News Item Actions - Save
savedText: "Zapisano",
savedSuccessText: "Zapisane pomyślnie",

// No Content Item
noContentText: "Brak aktualizacji do wyświetlenia.",

// News Feed Error
feedErrorText: "Wystąpił błąd podczas pobierania kanału wiadomości RSS użytkownika.",
itemErrorText: "Wystąpił błąd podczas wyświetlania pozycji w kanale RSS.",
errorAlt : "Błąd:",
errorShowMore: "Pokaż więcej",
errorShowLess: "Pokaż mniej",

// Paging Handler
backToTopText: "Początek strony",
ariaShowMore: "Pokaż więcej elementów strumienia działań",
ariaShowLess: "Pokaż mniej elementów strumienia działań",
ariaBackToTop: "Początek listy elementów strumienia działań",

// Feed Link
feedLinkText: "Kanał RSS dla tych wpisów",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "Liczba pozostałych komentarzy: ${0}",
oneMoreCommentsText: "1 komentarz więcej",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Pokaż wszystkie komentarze: ${0} ",
singleCommentText: "Pokaż komentarz",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Komentarze do elementu ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Komentarze do pozycji ${0}. Użyj więcej szczegółów, aby wyświetlić wszystkie komentarze (${1}).",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "element",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Strumień działań",

// Filters
selectFilter: "Wybierz filtr",
filterAriaDescription: "Wybierz filtr, aby zmienić typ elementów wyświetlanych w strumieniu działań",
filterAriaLabel: "Filtruj strumień działań",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Naciśnij klawisz Enter, aby pokazać więcej szczegółów dotyczących tego elementu",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Wyświetl działania",

ariaActionsToolbar: "Działania dotyczące elementu",

// Description for EE opener
openEEText: "Pokaż więcej szczegółów dotyczących tego elementu",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Usuwanie tej wiadomości",
statusRemoveConfirmMessageText: "Czy na pewno usunąć tę wiadomość?",
statusRemoveConfirmText: "Usuń",
statusRemoveCancelText: "Anuluj",
statusRemoveConfirmationMsg:  "Wiadomość została pomyślnie usunięta.",
statusRemoveErrorMsg: "Nie można teraz usunąć wiadomości. Spróbuj ponownie lub skontaktuj się z administratorem.",
commentRemoveText: "Usuń ten komentarz",
commentRemoveConfirmMessageText: "Czy na pewno usunąć ten komentarz?",
commentRemoveConfirmText: "Usuń",
commentRemoveCancelText: "Anuluj",
commentRemoveConfirmationMsg: "Komentarz został pomyślnie usunięty.",
commentRemoveErrorMsg: "Nie można teraz usunąć komentarza. Spróbuj ponownie lub skontaktuj się z administratorem.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Liczba pozostałych znaków",

// Message
msgCloseAlt: "Zamknij wiadomość",

//More Less Link
showMoreText: "Pokaż więcej",
showLessText: "Pokaż mniej",
showMoreActions: "Więcej...",

ariaShowMoreLabel: "Ten przycisk służy do wyświetlania treści, która została ukryta na potrzeby wyświetlania. Nie jest ona istotna dla użytkowników korzystających z techniki wspomagającej.",


//Tags
listTags: "${0} i jeszcze ${1}",

//Trends
expandTrend: "Rozwiń filtr Trendy",
collapseTrend: "Zwiń filtr Trendy",
trendTitle: "Trendy",
relatedTrendTitle: "Dodawanie trendu ${0}",
trendHelp: "Pomoc dotycząca trendów",
closeTrendHelp: "Zamknij pomoc dotyczącą trendów",
trendDescription: "Trend jest słowem kluczowym generowanym przez system w celu ułatwienia wykonywania wyszukiwania w aktualizacjach statusów. Kliknij trend, aby wyświetlić wyniki wyszukiwania, do których zostało przypisane dane słowo kluczowe.",
noTrends: "Nie ma jeszcze trendów",
selectedTrends: "Wybrane trendy",
relatedTrends: "Pokrewne trendy",
relatedTrendsDesc: "Dodaj pokrewny trend, aby bardziej zawęzić wyszukiwanie",
removeTrend: "Usuń trend ${0} spośród wybranych trendów filtru",
removeGeneric: "Usuń",
removeHashtag: "Usuń znacznik hash ${0} spośród znaczników wybranego filtru.",

//ActivityStream search
asSearchLabel: "Szukaj w bieżącym strumieniu",
asSearchShadowtext: "Szukaj w tym strumieniu",
asSearchBarOpen: "Otwórz pasek wyszukiwania, aby przeszukać bieżący widok",
asSearchBarCancel: "Anuluj wyszukiwanie i wróć do głównego widoku",
asSearch: "Szukaj",
asSearchGlobalView: "Wyświetl wyniki wyszukiwania w całej treści",

matching: "Zgodne:",
matchingAllOf: "Zgodne ze wszystkimi:",


//ViewAll extension
viewAllUpdates: "Wyświetl wszystkie aktualizacje",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "Wspomniano użytkownika ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "Wspomniano użytkowników ${0}",

// String for new filter
filterMention: "@wzmianki",

// Aria string for mentions
ariaFilterMention: "Wzmianki",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} o ${time}",
// e.g. June 6th
timeMonth: "${d} ${MMM}",
// e.g. Today at 11:23
timeToday: "dzisiaj o ${time}",
// e.g. June 6th, 2011
timeYear: "${d} ${MMM} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "wczoraj o ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "jutro o ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Wszystko",
filterStatusUpdates: "Aktualizacje statusów",
filterActivities: "Działania",
filterBlogs: "Blogi",
filterBookmarks: "Zakładki",
filterCommunities: "Społeczności",
filterFiles: "Pliki",
filterForums: "Fora",
filterPeople: "Osoby",
filterProfiles: "Profile",
filterWikis: "Wiki",
filterTags: "Znaczniki",
filterLibraries: "Biblioteki",
filterMyNetworkAndPeopleIFollow: "Moja sieć i osoby, które śledzę",
filterMyNetwork: "Moja sieć",
filterPeopleIFollow: "Osoby, które śledzę",
filterMyUpdates: "Moje aktualizacje",
filterCommunitiesIFollow: "Społeczności, które śledzę",
filterForMe: "Dla mnie",
filterFromMe: "Ode mnie",

// Label for filters - used by gadget
viewFilterLabel: "Widok podrzędny:",
filterOneLabel: "Filtruj wg:",
filterTwoLabel: "Pokaż:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Śledzę",
viewStatusUpdates: "Aktualizacje statusów",
viewActionRequired: "Wymagane działanie",
viewSaved: "Zapisane",
viewMyNotifications: "Moje powiadomienia",
viewDiscover: "Wykrywanie",
viewRecentUpdates: "Ostatnie aktualizacje",

// Aria label for As View Side Nav
ariaASViews: "Widoki strumienia działań",

selectedLabel: "Wybrano",

// Gadget title
asTitle: "Aktualizacje programu Connections",

// Used by gadget in Notes
updatesFromSender: "Aktualizacje pochodzące od nadawcy",
updatesFromContact: "Aktualizacje pochodzące od kontaktu",
updatesForUser: "Aktualizacje dla użytkownika",
updatesFor: "Aktualizacje dla ${0}",
noUser: "Nie znaleziono użytkownika dla tego adresu e-mail: ${0}",
returnMainView: "Wróć",

//External Application Text
externalApplication: "Aplikacja zewnętrzna",

//Strings for expanding comments inline
showPreviousComments: "Pokaż poprzednie komentarze...",
hideAdditionalComments: "Ukryj dodatkowe komentarze...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} z ${1}",
errorRetrieveComments: "Wystąpił błąd podczas pobierania poprzednich komentarzy.",
errorRetrieveCommentsDeleted: "Wystąpił błąd podczas pobierania poprzednich komentarzy. Element mógł zostać usunięty.",

// News Item Actions - Repost
repostText: "Publikuj ponownie",
logInRepostText: "Zaloguj się, aby opublikować ponownie",
repostMsgSuccess: "Aktualizacja została pomyślnie ponownie opublikowana dla osób śledzących profil użytkownika.",
repostMsgFail: "Wystąpił błąd podczas ponownego publikowania tej wiadomości.",
repostMsgErrorResGeneric: "Brak autoryzacji do ponownego publikowania tej wiadomości.",
repostMsgErrorRestricted: "Nie można ponownie opublikować tej wiadomości, ponieważ społeczność ${0} jest teraz społecznością zastrzeżoną.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Kliknij tutaj, aby wyszukać znacznik ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Ten odsyłacz zostanie otwarty w nowym oknie.",
attachFile : "Dodaj plik",
removeFileAttachment: "Usuń plik załącznika",

// External users 
externalUsersCommentsMsg: "Komentarze mogą być przeglądane przez osoby spoza organizacji.",
externalUsersStatusUpdatesMsg: "Aktualizacje statusów mogą być przeglądane przez osoby spoza organizacji.",
externalUsersItemMsg: "Współużytkowane zewnętrznie",

// Notifications Center
ariaNotificationCenter: "Centrum powiadomień – służy do wyświetlania aktualizacji i komentarzy dotyczących treści oraz odebranych powiadomień",
allNotifications : "Wszystkie powiadomienia",
seeAllNotifications : "Wyświetl wszystkie",
ariaSeeAllNotifications : "Kliknij tutaj, aby przejść do widoku Moje powiadomienia na stronie głównej",
notificationsTitle : "Powiadomienia",
notificationsSettings : "Ustawienia",
ariaNotificationsSettings : "Kliknij tutaj, aby przejść do strony ustawień powiadomień",
ariaNewNotification : "Tytuł nowego powiadomienia. ${0}",
newNotifications: "Nowe powiadomienia: ${0}",
loadingNotifications: "Ładowanie...",
noNewNotifications: "Nie otrzymano żadnych powiadomień w ciągu ostatniego tygodnia.",
markRead: "Oznacz jako przeczytane",
markUnread: "Oznacz jako nieprzeczytane",
markAllRead: "Oznacz wszystkie jako przeczytane",
markAllReadDetails: "Kliknij tutaj, aby oznaczyć wszystkie powiadomienia jako przeczytane.",
notificationPopupSingleGeneric: "Liczba nowych powiadomień: 1",
notificationPopupGeneric: "Liczba nowych powiadomień: ${0}"
});

