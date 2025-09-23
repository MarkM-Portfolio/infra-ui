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
loadingText: "Ladevorgang läuft...",

//common strings
errorText: "Fehler",

invalidASConfig: "Bei der Konfiguration für den Aktualisierungsdatenstrom ist ein Fehler aufgetreten. Wenden Sie sich an den zuständigen Administrator.",

// News Item
// ${0}  :  Person display name
photoOfText: "Foto von ${0}",
// ${0}  :  Application
eventFromText: "Ereignis von ${0}",
removeNewsItemText: "Dieses Element löschen ",
// ${0}  :  Number of likes for a news item
tagsText: "Tags: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} Empfehlungen",
likeText: "1 Empfehlung",
imageNotAvailable: "Vorschau derzeit nicht verfügbar ",
likeError: "Beim Empfehlen dieses Elements ist ein Fehler aufgetreten.",
unLikeError: "Beim Entfernen der Empfehlung für dieses Element ist ein Fehler aufgetreten.",
// ${0} author name
fromText: "Von: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Fehler beim Download",
downloadErrorMessage: "Die Datei konnte nicht heruntergeladen werden.  Sie wurde möglicherweise gelöscht oder Sie haben keinen Zugriff auf die Datei.",
closeText: "Schließen",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Dies ist ein Link zum Profil von ${0}",

// Files News Items
publicText: "Öffentlich",
privateText: "Privat",

// Video Preview
ariaPlayVideo: "Video abspielen",
ariaVideoArea: "Videobereich, drücken Sie die Eingabetaste, um auf die Videocontroller zuzugreifen ",

// News Item Actions - Comment
commentText: "Kommentar",
logInText: "Anmelden",
logInCommentText: "Melden Sie sich an, um einen Kommentar zu verfassen",
deleteCommentText: "Kommentar löschen",
addCommentText: "Kommentar hinzufügen...",
ariaAddCommentText: "Kommentar hinzufügen",
writeCommentText: "Schreiben...",
ariaCommentText: "Schreiben",
commentNotPermittedText: "Sie sind nicht berechtigt, Kommentare zu dieser Nachricht zu schreiben.",
commentFailureText: "Beim Hinzufügen des Kommentartexts ist ein Fehler aufgetreten. Aktualisieren Sie Ihre Seite und versuchen Sie es erneut.",
commentSessionTimedOut: "Sie wurden aufgrund von Inaktivität automatisch vom Server abgemeldet. Kopieren Sie den eingegebenen Text in die Zwischenablage, um ihn nicht zu verlieren, und <a href : ''${0}''>melden Sie sich erneut an</a>.",
commentPostText: "Veröffentlichen ",
commentCancelText: "Abbrechen",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Der Kommentar ist zu lang, um ihn zu veröffentlichen. Ändern Sie den Kommentar und versuchen Sie es erneut.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Ihr Kommentar wurde veröffentlicht.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} hat einen Kommentar zu ${1} geschrieben",
// same as above, but for replies
replyAriaLabel: "${0} hat eine Antwort zu ${1} geschrieben",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Element auf Seite ${0} anzeigen. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} hat um ${1} einen Kommentar geschrieben",
// same as above, but for replies
replyAriaLabelSameDay: "${0} hat um ${1} eine Antwort geschrieben",

// News Item Actions - Save
savedText: "Gespeichert",
savedSuccessText: "Erfolgreich gespeichert",

// No Content Item
noContentText: "Es sind keine anzuzeigenden Aktualisierungen vorhanden.",

// News Feed Error
feedErrorText: "Beim Abrufen des Nachrichtenfeeds ist ein Fehler aufgetreten.",
itemErrorText: "Beim Anzeigen eines Elements in Ihrem Feed ist ein Fehler aufgetreten.",
errorAlt : "Fehler:",
errorShowMore: "Erweitern",
errorShowLess: "Reduzieren",

// Paging Handler
backToTopText: "Zum Seitenanfang",
ariaShowMore: "Mehr Activity-Stream-Elemente anzeigen",
ariaShowLess: "Weniger Activity-Stream-Elemente anzeigen",
ariaBackToTop: "Zum Anfang der Activity-Stream-Elemente",

// Feed Link
feedLinkText: "Feed für diese Einträge",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} weitere Kommentare",
oneMoreCommentsText: "1 weiterer Kommentar",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Alle ${0} Kommentare anzeigen ",
singleCommentText: "Kommentar anzeigen",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Kommentare für ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Kommentare für ${0}. Mehr Details verwenden, um alle ${1} Kommentare anzuzeigen.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "Element",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Activity Stream",

// Filters
selectFilter: "Filter auswählen",
filterAriaDescription: "Wählen Sie einen Filter aus, um den Typ von Elementen zu ändern, die im Activity Stream angezeigt werden",
filterAriaLabel: "Activity Stream filtern",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Drücken Sie die Eingabetaste, um mehr Details zu diesem Element anzuzeigen",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Aktionen anzeigen",

ariaActionsToolbar: "Elementaktionen",

// Description for EE opener
openEEText: "Weitere Details zu diesem Element anzeigen",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Diese Nachricht löschen",
statusRemoveConfirmMessageText: "Sind Sie sicher, dass Sie diese Nachricht wirklich löschen möchten?",
statusRemoveConfirmText: "Löschen",
statusRemoveCancelText: "Abbrechen",
statusRemoveConfirmationMsg:  "Die Nachricht wurde gelöscht.",
statusRemoveErrorMsg: "Die Nachricht konnte nicht gelöscht werden. Versuchen Sie es erneut oder wenden Sie sich an einen Administrator.",
commentRemoveText: "Diesen Kommentar löschen",
commentRemoveConfirmMessageText: "Möchten Sie diesen Kommentar wirklich löschen?",
commentRemoveConfirmText: "Löschen",
commentRemoveCancelText: "Abbrechen",
commentRemoveConfirmationMsg: "Der Kommentar wurde gelöscht.",
commentRemoveErrorMsg: "Der Kommentar konnte nicht gelöscht werden. Versuchen Sie es erneut oder wenden Sie sich an einen Administrator.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Verbleibende Zeichen",

// Message
msgCloseAlt: "Nachricht schließen",

//More Less Link
showMoreText: "Erweitern",
showLessText: "Reduzieren",
showMoreActions: "Mehr...",

ariaShowMoreLabel: "Mit dieser Schaltfläche können Inhalte angezeigt werden, die für die Anzeige ausgeblendet wurden. Nicht relevant für Benutzer einer Technologie für behindertengerechte Bedienung.",


//Tags
listTags: "${0} und ${1} weitere",

//Trends
expandTrend: "Trendfilter einblenden",
collapseTrend: "Trendfilter ausblenden",
trendTitle: "Trendermittlung",
relatedTrendTitle: "Trend ''${0}'' hinzufügen",
trendHelp: "Hilfe zur Trendermittlung",
closeTrendHelp: "Hilfe zur Trendermittlung schließen",
trendDescription: "Ein Trend ist ein Suchbegriff, der vom System generiert wird, um Suchvorgänge in Statusaktualisierungen zu vereinfachen. Klicken Sie auf einen Trend, um Suchergebnisse anzuzeigen, die diesem Suchbegriff zugewiesen wurden.",
noTrends: "Noch keine Trends vorhanden",
selectedTrends: "Ausgewählte Trends",
relatedTrends: "Zugehörige Trends",
relatedTrendsDesc: "Zugehörigen Trend hinzufügen, um die Suche weiter einzugrenzen",
removeTrend: "Trend ''${0}'' aus den ausgewählten Filtertrends entfernen",
removeGeneric: "Entfernen",
removeHashtag: "Hashtag ${0} aus den ausgewählten Filtertags entfernen.",

//ActivityStream search
asSearchLabel: "Aktuellen Stream durchsuchen",
asSearchShadowtext: "Diesen Stream durchsuchen",
asSearchBarOpen: "Suchleiste öffnen, um in der aktuellen Ansicht zu suchen",
asSearchBarCancel: "Suche abbrechen und zur Hauptsicht zurückkehren",
asSearch: "Suche",
asSearchGlobalView: "Suchergebnisse für Ihre gesamten Inhalte anzeigen",

matching: "Übereinstimmend mit:",
matchingAllOf: "Mit allen übereinstimmend:",


//ViewAll extension
viewAllUpdates: "Alle Aktualisierungen anzeigen",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} wurde erwähnt",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} wurden erwähnt",

// String for new filter
filterMention: "@Erwähnungen",

// Aria string for mentions
ariaFilterMention: "Erwähnungen",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} bei ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Heute um ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Gestern um ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Morgen um ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Alle",
filterStatusUpdates: "Statusaktualisierungen",
filterActivities: "Aktivitäten",
filterBlogs: "Blogs ",
filterBookmarks: "Lesezeichen ",
filterCommunities: "Communitys ",
filterFiles: "Dateien",
filterForums: "Foren",
filterPeople: "Personen",
filterProfiles: "Profile",
filterWikis: "Wikis",
filterTags: "Tags",
filterLibraries: "Bibliotheken",
filterMyNetworkAndPeopleIFollow: "Mein Netzwerk und Personen, denen ich folge",
filterMyNetwork: "Mein Netzwerk",
filterPeopleIFollow: "Personen, denen ich folge",
filterMyUpdates: "Meine Aktualisierungen",
filterCommunitiesIFollow: "Communitys, denen ich folge",
filterForMe: "Für mich",
filterFromMe: "Von mir",

// Label for filters - used by gadget
viewFilterLabel: "Unteransicht:",
filterOneLabel: "Filtern nach:",
filterTwoLabel: "Anzeigen:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Ich folge ",
viewStatusUpdates: "Statusaktualisierungen",
viewActionRequired: "Aktion erforderlich",
viewSaved: "Gespeichert",
viewMyNotifications: "Meine Benachrichtigungen",
viewDiscover: "Finden",
viewRecentUpdates: "Neuigkeiten ",

// Aria label for As View Side Nav
ariaASViews: "Activity Stream-Ansichten",

selectedLabel: "Ausgewählt",

// Gadget title
asTitle: "Connections-Aktualisierungen",

// Used by gadget in Notes
updatesFromSender: "Aktualisierungen vom Absender",
updatesFromContact: "Aktualisierungen von einem Kontakt",
updatesForUser: "Aktualisierungen für Benutzer",
updatesFor: "Aktualisierungen für ${0}",
noUser: "Für diese E-Mail-Adresse wurde kein Benutzer gefunden: ${0}",
returnMainView: "Zurück",

//External Application Text
externalApplication: "Externe Anwendung",

//Strings for expanding comments inline
showPreviousComments: "Vorherige Kommentare anzeigen...",
hideAdditionalComments: "Weitere Kommentare ausblenden...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} von ${1}",
errorRetrieveComments: "Beim Abrufen der vorherigen Kommentare ist ein Fehler aufgetreten.",
errorRetrieveCommentsDeleted: "Beim Abrufen der vorherigen Kommentare ist ein Fehler aufgetreten. Das Element wurde möglicherweise gelöscht.",

// News Item Actions - Repost
repostText: "Erneut veröffentlichen",
logInRepostText: "Melden Sie sich an, um die Nachricht erneut zu veröffentlichen",
repostMsgSuccess: "Die Aktualisierung wurde erfolgreich für die Personen, die Ihnen folgen, veröffentlicht. ",
repostMsgFail: "Beim erneuten Veröffentlichen dieser Nachricht ist ein Fehler aufgetreten.",
repostMsgErrorResGeneric: "Sie sind nicht berechtigt, diese Nachricht erneut zu veröffentlichen.",
repostMsgErrorRestricted: "Diese Nachricht kann nicht erneut veröffentlicht werden, da die Community ''${0}'' nun eine eingeschränkte Community ist.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Klicken Sie hier, um nach dem Tag ${0} zu suchen. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Dieser Link wird in einem neuen Fenster geöffnet.",
attachFile : "Datei hinzufügen",
removeFileAttachment: "Dateianhang entfernen",

// External users 
externalUsersCommentsMsg: "Kommentare könnten von Personen außerhalb Ihres Unternehmens angezeigt werden. ",
externalUsersStatusUpdatesMsg: "Statusaktualisierungen könnten von Personen außerhalb Ihres Unternehmens angezeigt werden.",
externalUsersItemMsg: "Extern geteilt",

// Notifications Center
ariaNotificationCenter: "Notification Center - Zeigen Sie Aktualisierungen an, die sich auf Ihren Inhalt beziehen, sowie Benachrichtigungen, die Sie empfangen haben",
allNotifications : "Alle Benachrichtigungen",
seeAllNotifications : "Alle anzeigen",
ariaSeeAllNotifications : "Klicken Sie hier, um zur Ansicht 'Meine Benachrichtigungen' in der Homepage zu gelangen",
notificationsTitle : "Benachrichtigungen",
notificationsSettings : "Einstellungen",
ariaNotificationsSettings : "Klicken Sie hier, um zur Seite für Benachrichtigungseinstellungen zu gelangen.",
ariaNewNotification : "Titel für neue Benachrichtigung. ${0}",
newNotifications: "${0} neue Benachrichtigungen",
loadingNotifications: "Ladevorgang läuft...",
noNewNotifications: "Sie haben in der vergangenen Woche keine Benachrichtigungen erhalten.",
markRead: "Als gelesen markieren",
markUnread: "Als ungelesen markieren",
markAllRead: "Alle als gelesen markieren",
markAllReadDetails: "Klicken Sie hier, um alle Benachrichtigungen als gelesen zu markieren.",
notificationPopupSingleGeneric: "Sie haben 1 neue Benachrichtigung",
notificationPopupGeneric: "Sie haben ${0} neue Benachrichtigungen"
});

