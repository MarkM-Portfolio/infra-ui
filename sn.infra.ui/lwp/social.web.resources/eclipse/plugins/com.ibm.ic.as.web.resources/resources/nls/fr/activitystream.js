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
loadingText: "Chargement...",

//common strings
errorText: "Erreur",

invalidASConfig: "Une erreur s'est produite lors de la configuration du flux Mises à jour. Veuillez contacter votre administrateur.",

// News Item
// ${0}  :  Person display name
photoOfText: "Photo de ${0}",
// ${0}  :  Application
eventFromText: "Evénement provenant de ${0}",
removeNewsItemText: "Supprimer cet élément ",
// ${0}  :  Number of likes for a news item
tagsText: "Etiquettes : ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} recommandations",
likeText: "1 recommandation",
imageNotAvailable: "La prévisualisation n'est actuellement pas disponible",
likeError: "Une erreur s'est produite lors de la recommandation de cet élément.",
unLikeError: "Une erreur s'est produite lors de l'annulation de la recommandation de cet élément.",
// ${0} author name
fromText: "De : ${0}",

sizeMB: "${0} Mo",
sizeGB: "${0} Go",
sizeKB: "${0} ko",

//File download strings
downloadError: "Erreur de téléchargement",
downloadErrorMessage: "Le fichier n'a pas pu être téléchargé. Il a peut-être été supprimé ou vous pouvez ne pas y avoir accès.",
closeText: "Fermer",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Ceci est un lien vers le profil de ${0}",

// Files News Items
publicText: "Public",
privateText: "Privé",

// Video Preview
ariaPlayVideo: "Lire la vidéo",
ariaVideoArea: "Zone vidéo, appuyez sur ENTREE pour accéder aux contrôleurs vidéo",

// News Item Actions - Comment
commentText: "Commentaire",
logInText: "Connexion",
logInCommentText: "Se connecter pour écrire un commentaire",
deleteCommentText: "Supprimer le commentaire",
addCommentText: "Ajouter un commentaire...",
ariaAddCommentText: "Ajouter un commentaire",
writeCommentText: "Ecrire un commentaire...",
ariaCommentText: "Ecrire un commentaire",
commentNotPermittedText: "Vous n'êtes pas autorisé à apporter des commentaires sur ce message.",
commentFailureText: "Echec de la tentative d'ajout du texte de commentaire. Veuillez actualiser votre page et réessayer.",
commentSessionTimedOut: "Vous avez été automatiquement déconnecté du serveur suite à une période d''inactivité. Copiez dans le presse-papiers le texte que vous avez entré afin de ne pas le perdre puis <a href : ''${0}''>connectez-vous</a> pour recommencer.",
commentPostText: "Poster",
commentCancelText: "Annuler",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Le commentaire est trop long pour être posté. Modifiez le commentaire et recommencez.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Votre commentaire a été posté.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} a écrit un commentaire sur ${1}",
// same as above, but for replies
replyAriaLabel: "${0} a écrit une réponse sur ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Afficher l''élément dans une nouvelle fenêtre sur la page ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} a écrit un commentaire à ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} a écrit une réponse à ${1}",

// News Item Actions - Save
savedText: "Eléments enregistrés",
savedSuccessText: "Enregistrement réussi",

// No Content Item
noContentText: "Il n'y a aucune mise à jour à afficher.",

// News Feed Error
feedErrorText: "Une erreur s'est produite lors de l'extraction du flux d'actualités.",
itemErrorText: "Une erreur s'est produite lors de l'affichage d'un élément dans votre flux.",
errorAlt : "Erreur :",
errorShowMore: "Afficher plus",
errorShowLess: "Afficher moins",

// Paging Handler
backToTopText: "Haut de page",
ariaShowMore: "Afficher plus d'éléments de flux d'activités",
ariaShowLess: "Afficher moins d'éléments de flux d'activités",
ariaBackToTop: "Haut de page des éléments de flux d'activités",

// Feed Link
feedLinkText: "Flux pour ces entrées",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} commentaires supplémentaires",
oneMoreCommentsText: "1 commentaire supplémentaire",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Afficher l''ensemble des ${0} commentaires ",
singleCommentText: "Afficher le commentaire",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Commentaires pour ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Commentaires sur ${0}. Utilisez plus de détails pour afficher les ${1} commentaires.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "élément",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Flux d'activités",

// Filters
selectFilter: "Sélectionnez un filtre",
filterAriaDescription: "Sélectionnez un filtre pour modifier le type d'éléments affichés sur le flux d'activité.",
filterAriaLabel: "Filtrer un flux d'activités",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Appuyez sur la touche Entrée pour afficher plus de détails sur cet élément.",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Afficher les actions",

ariaActionsToolbar: "Actions d'élément",

// Description for EE opener
openEEText: "Afficher plus de détails sur cet élément",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Supprimer ce message",
statusRemoveConfirmMessageText: "Etes-vous sûr de vouloir supprimer ce message ?",
statusRemoveConfirmText: "Supprimer",
statusRemoveCancelText: "Annuler",
statusRemoveConfirmationMsg:  "Le message a été supprimé.",
statusRemoveErrorMsg: "Le message n'a pas pu être supprimé pour l'instant. Faites une nouvelle tentative ou contactez un administrateur.",
commentRemoveText: "Supprimer ce commentaire",
commentRemoveConfirmMessageText: "Etes-vous sûr de vouloir supprimer ce commentaire ?",
commentRemoveConfirmText: "Supprimer",
commentRemoveCancelText: "Annuler",
commentRemoveConfirmationMsg: "Le commentaire a été supprimé.",
commentRemoveErrorMsg: "Le commentaire n'a pas pu être supprimé pour l'instant. Faites une nouvelle tentative ou contactez un administrateur.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Caractères restants",

// Message
msgCloseAlt: "Fermer le message",

//More Less Link
showMoreText: "Afficher plus",
showLessText: "Afficher moins",
showMoreActions: "Plus...",

ariaShowMoreLabel: "Ce bouton permet d'afficher du contenu ayant été masqué pour des raisons d'affichage. Non pertinent pour les utilisateurs de technologie d'assistance aux personnes handicapées.",


//Tags
listTags: "${0} et ${1} de plus",

//Trends
expandTrend: "Développer le filtre de tendances",
collapseTrend: "Réduire le filtre de tendances",
trendTitle: "Etude des tendances",
relatedTrendTitle: "Ajouter la tendance ${0}",
trendHelp: "Aide sur Etude des tendances",
closeTrendHelp: "Fermer l'aide sur l'étude des tendances",
trendDescription: "Une tendance est un mot clé qui est généré par le système pour faciliter la recherche dans les mises à jour de statut. Cliquez sur une tendance pour afficher les résultats de recherche auxquels ce mot clé a été affecté.",
noTrends: "Pas encore de tendance",
selectedTrends: "Tendances sélectionnées",
relatedTrends: "Tendances associées",
relatedTrendsDesc: "Ajoutez une tendance associée pour affiner votre recherche",
removeTrend: "Retirer la tendance ${0} des tendances de filtrage sélectionnées",
removeGeneric: "Retirer",
removeHashtag: "Retirer le mot clé précédé d''un dièse ${0} des étiquettes de filtrage sélectionnées.",

//ActivityStream search
asSearchLabel: "Rechercher dans le flux en cours",
asSearchShadowtext: "Rechercher dans ce flux",
asSearchBarOpen: "Ouvrir la barre de recherche pour rechercher dans la vue actuelle",
asSearchBarCancel: "Annuler la recherche et revenir à la vue principale",
asSearch: "Recherche",
asSearchGlobalView: "Afficher les résultats de recherche sur tout votre contenu",

matching: "Correspondance :",
matchingAllOf: "Correspondant à toutes les valeurs suivantes :",


//ViewAll extension
viewAllUpdates: "Afficher toutes les mises à jour",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} a été mentionné",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} ont été mentionnés",

// String for new filter
filterMention: "@Mentions",

// Aria string for mentions
ariaFilterMention: "Mentions",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} à ${time}",
// e.g. June 6th
timeMonth: "${d} ${MMM}",
// e.g. Today at 11:23
timeToday: "Aujourd'hui à ${time}",
// e.g. June 6th, 2011
timeYear: "${d} ${MMM} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Hier à ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Demain à ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Tout",
filterStatusUpdates: "Mises à jour de statut",
filterActivities: "Activités",
filterBlogs: "Blogues",
filterBookmarks: "Signets",
filterCommunities: "Communautés",
filterFiles: "Fichiers",
filterForums: "Forums",
filterPeople: "Personnes",
filterProfiles: "Profils",
filterWikis: "Wikis",
filterTags: "Etiquettes",
filterLibraries: "Bibliothèques",
filterMyNetworkAndPeopleIFollow: "Mon réseau et Personnes que je suis",
filterMyNetwork: "Mon réseau",
filterPeopleIFollow: "Personnes que je suis",
filterMyUpdates: "Mes mises à jour",
filterCommunitiesIFollow: "Communautés que je suis",
filterForMe: "Pour moi",
filterFromMe: "De moi",

// Label for filters - used by gadget
viewFilterLabel: "Sous-vue :",
filterOneLabel: "Filtrer par :",
filterTwoLabel: "Afficher :",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Eléments que je suis",
viewStatusUpdates: "Mises à jour de statut",
viewActionRequired: "Action requise",
viewSaved: "Eléments enregistrés",
viewMyNotifications: "Mes notifications",
viewDiscover: "Découvrir",
viewRecentUpdates: "Mises à jour récentes",

// Aria label for As View Side Nav
ariaASViews: "Vues du flux d'activités",

selectedLabel: "Sélectionné",

// Gadget title
asTitle: "Mises à jour de Connections",

// Used by gadget in Notes
updatesFromSender: "Mises à jour de l'expéditeur",
updatesFromContact: "Mises à jour du contact",
updatesForUser: "Mises à jour pour l'utilisateur",
updatesFor: "Mises à jour pour ${0}",
noUser: "Aucun utilisateur trouvé pour cette adresse électronique : ${0}",
returnMainView: "Retour",

//External Application Text
externalApplication: "Application externe",

//Strings for expanding comments inline
showPreviousComments: "Afficher les commentaires précédents",
hideAdditionalComments: "Masquer les autres commentaires...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} sur ${1}",
errorRetrieveComments: "Une erreur s'est produite lors de l'extraction des commentaires précédents.",
errorRetrieveCommentsDeleted: "Une erreur s'est produite lors de l'extraction des commentaires précédents. L'élément a peut-être été supprimé.",

// News Item Actions - Repost
repostText: "Reposter",
logInRepostText: "Connectez-vous pour reposter",
repostMsgSuccess: "La mise à jour a été repostée pour vos suiveurs.",
repostMsgFail: "Une erreur s'est produite lors du repostage de ce message.",
repostMsgErrorResGeneric: "Vous n'êtes pas autorisé à reposter ce message.",
repostMsgErrorRestricted: "Ce message ne peut pas être reposté, car la communauté ${0} est maintenant une communauté restreinte.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Cliquez ici pour rechercher l''étiquette ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Ce lien s'ouvrira dans une nouvelle fenêtre.",
attachFile : "Ajouter un fichier",
removeFileAttachment: "Retirer la pièce jointe du fichier",

// External users 
externalUsersCommentsMsg: "Les commentaires peuvent être vus par des personnes externes à votre organisation.",
externalUsersStatusUpdatesMsg: "Les mises à jour de statut peuvent être vues par des personnes externes à votre organisation.",
externalUsersItemMsg: "Partagé en externe",

// Notifications Center
ariaNotificationCenter: "Centre de notification - Affichez les mises à jour relatives à votre contenu et les notifications que vous avez reçues",
allNotifications : "Toutes les notifications",
seeAllNotifications : "Tout afficher",
ariaSeeAllNotifications : "Cliquez ici pour accéder à la vue Mes notifications de la page d'accueil",
notificationsTitle : "Notifications",
notificationsSettings : "Paramètres",
ariaNotificationsSettings : "Cliquez ici pour accéder à la page des paramètres de notification",
ariaNewNotification : "Titre de la nouvelle notification. ${0}",
newNotifications: "${0} nouvelles notifications",
loadingNotifications: "Chargement...",
noNewNotifications: "Vous n'avez pas reçu de notifications la semaine précédente.",
markRead: "Marquer comme lue",
markUnread: "Marquer comme non lue",
markAllRead: "Tout marquer comme lues",
markAllReadDetails: "Cliquez ici pour marquer toutes les notifications comme lues.",
notificationPopupSingleGeneric: "Vous avez 1 nouvelle notification",
notificationPopupGeneric: "Vous avez ${0} nouvelles notifications"
});

