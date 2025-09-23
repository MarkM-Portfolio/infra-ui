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
loadingText: "Cargando...",

//common strings
errorText: "Error",

invalidASConfig: "Hay un error con la configuración para la secuencia de Actualizaciones. Póngase en contacto con el administrador.",

// News Item
// ${0}  :  Person display name
photoOfText: "Foto de ${0}",
// ${0}  :  Application
eventFromText: "Evento desde ${0}",
removeNewsItemText: "Suprimir este elemento ",
// ${0}  :  Number of likes for a news item
tagsText: "Etiquetas: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} me gusta",
likeText: "1 me gusta",
imageNotAvailable: "La visualización previa no está disponible en estos momentos",
likeError: "Se ha producido un error al marcar me gusta en este elemento.",
unLikeError: "Se ha producido un error al marcar ya no me gusta en este elemento.",
// ${0} author name
fromText: "De: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Error de descarga",
downloadErrorMessage: "El archivo no se ha podido descargar. Es posible que se haya suprimido o quizás no tenga acceso al mismo.",
closeText: "cerrar",
okText: "Aceptar",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Esto es un enlace al perfil de ${0}",

// Files News Items
publicText: "Público",
privateText: "Privada",

// Video Preview
ariaPlayVideo: "Reproducir vídeo",
ariaVideoArea: "Área de vídeo, pulse INTRO para acceder a los controladores de vídeo",

// News Item Actions - Comment
commentText: "Comentario",
logInText: "Iniciar sesión",
logInCommentText: "Iniciar sesión para comentar",
deleteCommentText: "Suprimir comentario",
addCommentText: "Añadir un comentario...",
ariaAddCommentText: "Añadir un comentario",
writeCommentText: "Escribir algo...",
ariaCommentText: "Escribir algo",
commentNotPermittedText: "No está autorizado a hacer comentarios en este mensaje.",
commentFailureText: "El intento de añadir un texto de comentario ha sido erróneo. Consulte la página y vuelva a intentarlo.",
commentSessionTimedOut: "Su sesión se ha cerrado automáticamente en el servidor debido a la inactividad. Copie el texto que ha introducido en el portapapeles para no'perderlo y vuelva a <a href : ''${0}''>iniciar sesión</a> para retomar la actividad.",
commentPostText: "Publicar",
commentCancelText: "Cancelar",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "El comentario es demasiado largo para publicarse. Corrija el comentario y vuélvalo a intentar.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "El comentario se ha publicado.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} ha escrito un comentario en ${1}",
// same as above, but for replies
replyAriaLabel: "${0} ha escrito una respuesta en ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Visualizar elemento en una nueva ventana en la página ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} ha escrito un comentario en ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} ha escrito una respuesta en ${1}",

// News Item Actions - Save
savedText: "Guardado",
savedSuccessText: "Guardado correctamente",

// No Content Item
noContentText: "No hay actualizaciones que mostrar.",

// News Feed Error
feedErrorText: "Se ha producido un error al recuperar su canal de información de noticias.",
itemErrorText: "Se ha producido un error al visualizar un elemento en el canal de información.",
errorAlt : "Error:",
errorShowMore: "Mostrar más",
errorShowLess: "Mostrar menos",

// Paging Handler
backToTopText: "Volver al principio",
ariaShowMore: "Mostrar más elementos de la secuencia de actividades",
ariaShowLess: "Mostrar menos elementos de la secuencia de actividades",
ariaBackToTop: "Volver al principio de los elementos de la secuencia de actividades",

// Feed Link
feedLinkText: "Canal de información para estas entradas",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} más comentarios",
oneMoreCommentsText: "1 comentario más",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Mostrar los ${0} comentarios ",
singleCommentText: "Mostrar comentario",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Comentarios para ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Comentarios para ${0} . Utilice más detalles para mostrar todos los comentarios de ${1}.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "elemento",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Secuencia de actividad",

// Filters
selectFilter: "Seleccionar un filtro",
filterAriaDescription: "Seleccione un filtro para cambiar el tipo de elementos mostrados en la Secuencia de actividad",
filterAriaLabel: "Filtro de secuencia de actividad",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Pulse la tecla Intro para mostrar más detalles sobre este elemento",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Mostrar acciones",

ariaActionsToolbar: "Acciones de elementos",

// Description for EE opener
openEEText: "Mostrar más detalles sobre este elemento",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Suprimir este mensaje",
statusRemoveConfirmMessageText: "¿Está seguro de que desea suprimir este mensaje?",
statusRemoveConfirmText: "Suprimir",
statusRemoveCancelText: "Cancelar",
statusRemoveConfirmationMsg:  "El mensaje se ha suprimido correctamente.",
statusRemoveErrorMsg: "El mensaje no se ha podido suprimir en este momento. Vuelva a intentarlo o póngase en contacto con un administrador.",
commentRemoveText: "Suprimir este comentario",
commentRemoveConfirmMessageText: "¿Está seguro de que desea suprimir este comentario?",
commentRemoveConfirmText: "Suprimir",
commentRemoveCancelText: "Cancelar",
commentRemoveConfirmationMsg: "El comentario se ha suprimido correctamente.",
commentRemoveErrorMsg: "El comentario no se ha podido suprimir en este momento. Vuelva a intentarlo o póngase en contacto con un administrador.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Caracteres restantes",

// Message
msgCloseAlt: "Cerrar mensaje",

//More Less Link
showMoreText: "Mostrar más",
showLessText: "Mostrar menos",
showMoreActions: "Más...",

ariaShowMoreLabel: "Este botón se utiliza para visualizar el contenido que se ha ocultado. No es relevante para los usuario de tecnología de asistencia.",


//Tags
listTags: "${0} y ${1} más",

//Trends
expandTrend: "Expandir el filtro de tendencias",
collapseTrend: "Contraer el filtro de tendencias",
trendTitle: "Tendencia",
relatedTrendTitle: "Añadir la tendencia ''${0}''",
trendHelp: "Ayuda de tendencia",
closeTrendHelp: "Cerrar ayuda de tendencia",
trendDescription: "Una tendencia es una palabra clave que ha sido generada por el sistema para facilitar las búsquedas en Actualizaciones de estado. Pulse una tendencia para visualizar los resultados de búsqueda asignados a la palabra clave.",
noTrends: "Aún no hay tendencias",
selectedTrends: "Tendencias seleccionadas",
relatedTrends: "Tendencias relacionadas",
relatedTrendsDesc: "Añada una tendencia relacionada para perfeccionar más la búsqueda",
removeTrend: "Eliminar la tendencia ''${0}'' de las tendencias filtradas seleccionadas",
removeGeneric: "Eliminar",
removeHashtag: "Eliminar la etiqueta hash ${0} de las etiquetas filtradas seleccionadas.",

//ActivityStream search
asSearchLabel: "Buscar en la secuencia actual",
asSearchShadowtext: "Buscar en esta secuencia",
asSearchBarOpen: "Abra la barra de búsqueda para Buscar la vista actual",
asSearchBarCancel: "Cancelar la Búsqueda y volver a la vista principal",
asSearch: "Búsqueda",
asSearchGlobalView: "Ver los resultados de búsqueda desde todo el contenido",

matching: "Que coincida con:",
matchingAllOf: "Coincide con todos los:",


//ViewAll extension
viewAllUpdates: "Ver todas las actualizaciones",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "Se ha mencionado ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "Se han mencionado ${0}",

// String for new filter
filterMention: "@Mentions",

// Aria string for mentions
ariaFilterMention: "Menciones",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} a las ${time}",
// e.g. June 6th
timeMonth: "${d} de ${MMM}",
// e.g. Today at 11:23
timeToday: "Hoy a las ${time}",
// e.g. June 6th, 2011
timeYear: "${d} de ${MMM} de ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Ayer a las ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Mañana a las ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Todas",
filterStatusUpdates: "Actualizaciones de estado",
filterActivities: "Actividades",
filterBlogs: "Blogs",
filterBookmarks: "Marcadores",
filterCommunities: "Comunidades",
filterFiles: "Archivos",
filterForums: "Foros",
filterPeople: "Personas",
filterProfiles: "Perfiles",
filterWikis: "Wikis",
filterTags: "Etiquetas",
filterLibraries: "Bibliotecas",
filterMyNetworkAndPeopleIFollow: "Mi red y gente que sigo",
filterMyNetwork: "Mi red",
filterPeopleIFollow: "Gente que sigo",
filterMyUpdates: "Mis actualizaciones",
filterCommunitiesIFollow: "Comunidades que sigo",
filterForMe: "Para mí",
filterFromMe: "De mí",

// Label for filters - used by gadget
viewFilterLabel: "Vista Sub:",
filterOneLabel: "Filtrado por:",
filterTwoLabel: "Mostrar:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Sigo",
viewStatusUpdates: "Actualizaciones de estado",
viewActionRequired: "Acción necesaria",
viewSaved: "Guardado",
viewMyNotifications: "Mis notificaciones",
viewDiscover: "Descubrir",
viewRecentUpdates: "Actualizaciones recientes",

// Aria label for As View Side Nav
ariaASViews: "Vistas de secuencias de actividad",

selectedLabel: "Seleccionado",

// Gadget title
asTitle: "Actualizaciones de conexiones",

// Used by gadget in Notes
updatesFromSender: "Actualizaciones de Remitente",
updatesFromContact: "Actualizaciones de Contacto",
updatesForUser: "Actualizaciones de usuario",
updatesFor: "Actualizaciones de ${0}",
noUser: "No se ha podido encontrar ningún usuario para esta dirección de correo electrónico: ${0}",
returnMainView: "Volver",

//External Application Text
externalApplication: "Aplicación externa",

//Strings for expanding comments inline
showPreviousComments: "Mostrar comentarios anteriores...",
hideAdditionalComments: "Oculta comentarios adicionales...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} de ${1}",
errorRetrieveComments: "Se ha producido un error al recuperar comentarios anteriores.",
errorRetrieveCommentsDeleted: "Se ha producido un error al recuperar comentarios anteriores. Puede que se haya suprimido el elemento.",

// News Item Actions - Repost
repostText: "Volver a publicar",
logInRepostText: "Iniciar sesión para responder",
repostMsgSuccess: "La actualización se ha vuelto a publicar correctamente para sus seguidores.",
repostMsgFail: "Se ha producido un error al volver a publicar este mensaje.",
repostMsgErrorResGeneric: "No tiene autorización para responder este mensaje.",
repostMsgErrorRestricted: "Este mensaje no puede volver a publicarse porque la comunidad ${0} ahora es restringida.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Pulse aquí para buscar la etiqueta ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Este enlace se abrirá en otra ventana.",
attachFile : "Añadir un archivo",
removeFileAttachment: "Suprimir archivo adjunto",

// External users 
externalUsersCommentsMsg: "Los comentarios pueden ser vistos por personas externas a su empresa.",
externalUsersStatusUpdatesMsg: "Es posible que las Actualizaciones de estado se puedan ver por personas externas a su empresa.",
externalUsersItemMsg: "Compartido externamente",

// Notifications Center
ariaNotificationCenter: "Centro de notificaciones - Visualice las actualizaciones relacionadas con el contenido y las notificaciones que ha recibido.",
allNotifications : "Todas las notificaciones",
seeAllNotifications : "Ver todas",
ariaSeeAllNotifications : "Pulse aquí para ir a la vista Mis notificaciones en la Página inicial.",
notificationsTitle : "Notificaciones",
notificationsSettings : "Configuración",
ariaNotificationsSettings : "Pulse aquí para ir a la página de configuración de notificaciones.",
ariaNewNotification : "Nuevo título de notificación. ${0}",
newNotifications: "${0} notificaciones nuevas",
loadingNotifications: "Cargando...",
noNewNotifications: "No ha recibido ninguna notificación durante la semana pasada.",
markRead: "Marcar como leído",
markUnread: "Marcar como no leído",
markAllRead: "Marcar todo como leído",
markAllReadDetails: "Pulse aquí para marcar todas las notificaciones como leídas.",
notificationPopupSingleGeneric: "Tiene 1 notificación nueva",
notificationPopupGeneric: "Tiene ${0} notificaciones nuevas"
});

