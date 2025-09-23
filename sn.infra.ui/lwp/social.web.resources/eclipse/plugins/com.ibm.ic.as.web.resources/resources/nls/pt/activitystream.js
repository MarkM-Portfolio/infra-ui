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
loadingText: "A carregar...",

//common strings
errorText: "Erro",

invalidASConfig: "Existe um erro na configuração da sequência de actualizações. Contacte o administrador.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografia de ${0}",
// ${0}  :  Application
eventFromText: "Evento de ${0}",
removeNewsItemText: "Eliminar este item ",
// ${0}  :  Number of likes for a news item
tagsText: "Etiquetas: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} gostos",
likeText: "1 gosto",
imageNotAvailable: "Pré-visualização actualmente indisponível",
likeError: "Ocorreu um erro ao gostar deste item.",
unLikeError: "Ocorreu um erro ao anular o gosto deste item.",
// ${0} author name
fromText: "De: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Erro de transferência",
downloadErrorMessage: "Não foi possível descarregar o ficheiro. Este poderá ter sido eliminado ou poderá não ter acesso ao mesmo.",
closeText: "fechar",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Trata-se de uma ligação para o perfil de ${0}",

// Files News Items
publicText: "Público",
privateText: "Particular",

// Video Preview
ariaPlayVideo: "Reproduzir vídeo",
ariaVideoArea: "Área de vídeo; prima ENTER para aceder aos controladores de vídeo",

// News Item Actions - Comment
commentText: "Comentário",
logInText: "Iniciar sessão",
logInCommentText: "Iniciar sessão para comentar",
deleteCommentText: "Eliminar comentário",
addCommentText: "Adicionar um comentário...",
ariaAddCommentText: "Adicionar um comentário",
writeCommentText: "Escrever...",
ariaCommentText: "Escrever algo",
commentNotPermittedText: "Não está autorizado a fazer comentários nesta mensagem.",
commentFailureText: "A tentativa de adicionar o texto de comentário falhou. Actualize a página e tente novamente.",
commentSessionTimedOut: "A sessão do utilizador no servidor foi concluída automaticamente devido a inactividade. Copie qualquer texto que tenha introduzido para a área de transferência, de modo a não perder o mesmo e, em seguida, <a href : ''${0}''>inicie sessão</a> para recomeçar.",
commentPostText: "Publicar",
commentCancelText: "Cancelar",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "O comentário é demasiado longo para ser publicado. Altere o comentário e tente novamente.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "O seu comentário foi publicado.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} escreveu um comentário a ${1}",
// same as above, but for replies
replyAriaLabel: "${0} escreveu uma resposta ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Ver item na nova janela na página ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} escreveu um comentário às ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} escreveu uma resposta a ${1}",

// News Item Actions - Save
savedText: "Guardado",
savedSuccessText: "Guardado com êxito",

// No Content Item
noContentText: "Não existem actualizações para apresentar.",

// News Feed Error
feedErrorText: "Ocorreu um erro ao obter o feed de notícias.",
itemErrorText: "Ocorreu um erro ao apresentar um item no feed.",
errorAlt : "Erro:",
errorShowMore: "Mostrar mais",
errorShowLess: "Mostrar menos",

// Paging Handler
backToTopText: "Regressar ao início",
ariaShowMore: "Mostrar mais itens de sequências de actividades",
ariaShowLess: "Mostrar menos itens de sequências de actividades",
ariaBackToTop: "Regressar ao início dos itens de sequências de actividades",

// Feed Link
feedLinkText: "Feed para estas entradas",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "Mais ${0} comentários",
oneMoreCommentsText: "mais 1 comentário",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Mostrar todos os ${0} comentários ",
singleCommentText: "Mostrar comentário",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Comentários para ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Comentários para ${0}. Utilizar mais detalhes para mostrar todos os ${1} comentários.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "item",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Sequência de actividades",

// Filters
selectFilter: "Seleccionar um filtro",
filterAriaDescription: "Seleccionar um filtro para alterar o tipo de itens apresentados na sequência de actividades",
filterAriaLabel: "Filtrar sequência de actividades",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Prima a tecla Enter para mostrar mais detalhes sobre este item",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Mostrar acções",

ariaActionsToolbar: "Acções de item",

// Description for EE opener
openEEText: "Mostrar mais detalhes sobre este item",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Eliminar esta mensagem",
statusRemoveConfirmMessageText: "Tem a certeza de que pretende eliminar esta mensagem?",
statusRemoveConfirmText: "Eliminar",
statusRemoveCancelText: "Cancelar",
statusRemoveConfirmationMsg:  "A mensagem foi eliminada com êxito.",
statusRemoveErrorMsg: "Não é possível eliminar a mensagem neste momento. Tente novamente ou contacte um administrador.",
commentRemoveText: "Eliminar este comentário",
commentRemoveConfirmMessageText: "Tem a certeza de que pretende eliminar este comentário?",
commentRemoveConfirmText: "Eliminar",
commentRemoveCancelText: "Cancelar",
commentRemoveConfirmationMsg: "O comentário foi eliminado com êxito.",
commentRemoveErrorMsg: "Não é possível eliminar o comentário neste momento. Tente novamente ou contacte um administrador.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Caracteres restantes",

// Message
msgCloseAlt: "Fechar mensagem",

//More Less Link
showMoreText: "Mostrar mais",
showLessText: "Mostrar menos",
showMoreActions: "Mais...",

ariaShowMoreLabel: "Este botão é utilizado para apresentar conteúdo que foi ocultado para efeitos de apresentação. Não é relevante para utilizadores da tecnologia de assistência.",


//Tags
listTags: "${0} e ${1} mais",

//Trends
expandTrend: "Expandir o filtro Tendências",
collapseTrend: "Contrair o filtro Tendências",
trendTitle: "Tendência",
relatedTrendTitle: "Adicionar a tendência ''${0}''",
trendHelp: "Ajuda de tendências",
closeTrendHelp: "Fechar ajuda de tendências",
trendDescription: "Uma tendência consiste numa palavra-chave gerada pelo sistema para facilitar a procura nas Actualizações de estado. Faça clique numa tendência para apresentar os resultados da procura com essa palavra-chave atribuída.",
noTrends: "Ainda não existem tendências",
selectedTrends: "Seleccionar Tendências",
relatedTrends: "Tendências relacionadas",
relatedTrendsDesc: "Adicionar uma tendência relacionada para aperfeiçoar ainda mais a procura",
removeTrend: "Remover a tendência ''${0}'' das tendências do filtro seleccionado",
removeGeneric: "Remover",
removeHashtag: "Remover a etiqueta ${0} das etiquetas de filtro seleccionadas.",

//ActivityStream search
asSearchLabel: "Procurar na sequência actual",
asSearchShadowtext: "Procurar nesta sequência",
asSearchBarOpen: "Abrir a barra de procura para procurar na vista actual",
asSearchBarCancel: "Cancelar a procura e regressar à vista principal",
asSearch: "Procurar",
asSearchGlobalView: "Ver resultados da procura para todo o conteúdo",

matching: "Correspondente a:",
matchingAllOf: "Correspondente a todos de:",


//ViewAll extension
viewAllUpdates: "Ver todas as actualizações",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} foi mencionado",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} foram mencionados",

// String for new filter
filterMention: "@Menções",

// Aria string for mentions
ariaFilterMention: "Menções",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} às ${time}",
// e.g. June 6th
timeMonth: "${d} de ${MMM}",
// e.g. Today at 11:23
timeToday: "Hoje às ${time}",
// e.g. June 6th, 2011
timeYear: "${d} de ${MMM} de ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Ontem às ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Amanhã às ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Tudo",
filterStatusUpdates: "Actualizações de estado",
filterActivities: "Actividades",
filterBlogs: "Blogues",
filterBookmarks: "Marcadores",
filterCommunities: "Comunidades",
filterFiles: "Ficheiros",
filterForums: "Fóruns",
filterPeople: "Pessoas",
filterProfiles: "Perfis",
filterWikis: "Wikis",
filterTags: "Etiquetas",
filterLibraries: "Bibliotecas",
filterMyNetworkAndPeopleIFollow: "A minha rede e pessoas que acompanho",
filterMyNetwork: "A minha rede",
filterPeopleIFollow: "Pessoas que acompanho",
filterMyUpdates: "As minhas actualizações",
filterCommunitiesIFollow: "Comunidades que acompanho",
filterForMe: "Para mim",
filterFromMe: "De mim",

// Label for filters - used by gadget
viewFilterLabel: "Sub-vista:",
filterOneLabel: "Filtrar por:",
filterTwoLabel: "Mostrar:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Estou a acompanhar",
viewStatusUpdates: "Actualizações de estado",
viewActionRequired: "Acção requerida",
viewSaved: "Guardado",
viewMyNotifications: "As minhas notificações",
viewDiscover: "Descobrir",
viewRecentUpdates: "Actualizações recentes",

// Aria label for As View Side Nav
ariaASViews: "Vistas de sequências de actividades",

selectedLabel: "Seleccionado",

// Gadget title
asTitle: "Actualizações do Connections",

// Used by gadget in Notes
updatesFromSender: "Actualizações do remetente",
updatesFromContact: "Actualizações do contacto",
updatesForUser: "Actualizações para o utilizador",
updatesFor: "Actualizações para ${0}",
noUser: "Não foi localizado qualquer utilizador para este endereço de correio electrónico: ${0}",
returnMainView: "Regressar",

//External Application Text
externalApplication: "Aplicação externa",

//Strings for expanding comments inline
showPreviousComments: "Mostrar comentários anteriores...",
hideAdditionalComments: "Ocultar comentários adicionais...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} de ${1}",
errorRetrieveComments: "Ocorreu um erro ao obter os comentários anteriores.",
errorRetrieveCommentsDeleted: "Ocorreu um erro ao obter os comentários anteriores. O item pode ter sido eliminado.",

// News Item Actions - Repost
repostText: "Republicar",
logInRepostText: "Inicie sessão para republicar",
repostMsgSuccess: "A actualização foi publicada novamente com êxito para os seus acompanhantes.",
repostMsgFail: "Ocorreu um erro ao publicar novamente esta mensagem.",
repostMsgErrorResGeneric: "Não está autorizado a publicar novamente esta mensagem.",
repostMsgErrorRestricted: "Esta mensagem não pode ser republicada, uma vez que a comunidade ${0} é agora uma Comunidade restrita.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Faça clique aqui para procurar pela etiqueta ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Esta ligação será apresentada numa nova janela.",
attachFile : "Adicionar um ficheiro",
removeFileAttachment: "Remover anexo de ficheiro",

// External users 
externalUsersCommentsMsg: "Os comentários poderão ser visualizados por pessoas externas à organização.",
externalUsersStatusUpdatesMsg: "As actualizações de estado poderão ser visualizadas por pessoas externas à organização.",
externalUsersItemMsg: "Partilhado externamente",

// Notifications Center
ariaNotificationCenter: "Centro de Notificações - Ver actualizações relacionadas com o seu conteúdo e as notificações que recebeu",
allNotifications : "Todas as notificações",
seeAllNotifications : "Ver tudo",
ariaSeeAllNotifications : "Faça clique aqui para aceder à vista As minhas notificações na página inicial",
notificationsTitle : "Notificações",
notificationsSettings : "Definições",
ariaNotificationsSettings : "Faça clique aqui para aceder à página de definições das notificações",
ariaNewNotification : "Título da nova notificação. ${0}",
newNotifications: "${0} novas notificações",
loadingNotifications: "A carregar...",
noNewNotifications: "Não recebeu quaisquer notificações na última semana.",
markRead: "Marcar como lido",
markUnread: "Marcar como não lido",
markAllRead: "Marcar tudo como lido",
markAllReadDetails: "Faça clique aqui para marcar todas as notificações como lidas",
notificationPopupSingleGeneric: "Tem 1 nova notificação",
notificationPopupGeneric: "Tem ${0} novas notificações"
});

