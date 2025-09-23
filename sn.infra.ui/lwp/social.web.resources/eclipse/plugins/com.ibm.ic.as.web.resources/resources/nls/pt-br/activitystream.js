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
loadingText: "Carregando...",

//common strings
errorText: "Erro",

invalidASConfig: "Há um erro com a configuração do fluxo de Atualizações. Entre em contato com o seu administrador.",

// News Item
// ${0}  :  Person display name
photoOfText: "Foto de ${0}",
// ${0}  :  Application
eventFromText: "Evento de ${0}",
removeNewsItemText: "Excluir este item ",
// ${0}  :  Number of likes for a news item
tagsText: "Marcações: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} curtidas",
likeText: "1 curtir",
imageNotAvailable: "Visualização prévia não disponível atualmente",
likeError: "Ocorreu um erro ao vincular este item.",
unLikeError: "Ocorreu um erro ao desvincular este item.",
// ${0} author name
fromText: "De: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Erro de Download",
downloadErrorMessage: "O arquivo não pôde ser transferido por download. Ele pode ter sido excluído ou talvez você não tenha acesso a ele.",
closeText: "Fechar",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Este é um link para o perfil de ${0}",

// Files News Items
publicText: "Público",
privateText: "Privado",

// Video Preview
ariaPlayVideo: "Reproduzir Vídeo",
ariaVideoArea: "Área de vídeo, pressione ENTER para acessar os controladores de vídeo",

// News Item Actions - Comment
commentText: "Comentário",
logInText: "Efetuar Login",
logInCommentText: "Efetuar login para comentar",
deleteCommentText: "Excluir comentário",
addCommentText: "Incluir um comentário...",
ariaAddCommentText: "Incluir um Comentário",
writeCommentText: "Escrever algo...",
ariaCommentText: "Escrever algo",
commentNotPermittedText: "Você não está autorizado a fazer comentários sobre esta mensagem.",
commentFailureText: "A tentativa de incluir o texto do comentário falhou. Atualize a página e tente novamente.",
commentSessionTimedOut: "Você foi desconectado automaticamente do servidor devido a inatividade. Copie qualquer texto que você tenha inserido na sua área de transferência para que você não perca ', em seguida, <a href : ''${0}''>efetue login</a> para iniciar.",
commentPostText: "Postar",
commentCancelText: "Cancelar",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "O comentário é muito longo para ser postado. Reformule o comentário e tente novamente.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Seu comentário foi postado.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} escreveu um comentário sobre ${1}",
// same as above, but for replies
replyAriaLabel: "${0} escreveu uma resposta em ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Item de visualização em nova janela na página ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} escreveu um comentário em ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} escreveu uma resposta em ${1}",

// News Item Actions - Save
savedText: "Salvo",
savedSuccessText: "Salvo com êxito",

// No Content Item
noContentText: "Não há atualizações a serem exibidas.",

// News Feed Error
feedErrorText: "Houve um erro ao recuperar seu feed de notícias.",
itemErrorText: "Ocorreu um erro ao exibir um item em seu feed.",
errorAlt : "Erro:",
errorShowMore: "Mostrar mais",
errorShowLess: "Mostrar menos",

// Paging Handler
backToTopText: "Voltar à parte superior",
ariaShowMore: "Mostrar mais itens do fluxo de atividades",
ariaShowLess: "Mostrar menos itens do fluxo de atividades",
ariaBackToTop: "Voltar para a parte superior dos itens do fluxo de atividades",

// Feed Link
feedLinkText: "Feed para estas entradas",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} mais comentários",
oneMoreCommentsText: "1 comentário adicional",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Mostrar todos os ${0} comentários ",
singleCommentText: "Mostrar comentário",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Comentários para ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Comentários para ${0} . Usar mais detalhes para mostrar todos os ${1} comentários.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "item",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Fluxo de Atividade",

// Filters
selectFilter: "Selecionar um filtro",
filterAriaDescription: "Selecione um filtro para alterar o tipo de itens mostrados no Fluxo de Atividade",
filterAriaLabel: "Filtrar fluxo de atividade",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Pressione a tecla Enter para mostrar mais detalhes sobre este item",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Mostrar Ações",

ariaActionsToolbar: "Ações do item",

// Description for EE opener
openEEText: "Mostrar mais detalhes sobre este item",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Excluir esta Mensagem",
statusRemoveConfirmMessageText: "Tem certeza de que deseja excluir esta mensagem?",
statusRemoveConfirmText: "Excluir",
statusRemoveCancelText: "Cancelar",
statusRemoveConfirmationMsg:  "A mensagem foi excluída com êxito.",
statusRemoveErrorMsg: "A mensagem não pôde ser excluída neste momento. Tente novamente ou entre em contato com um administrador.",
commentRemoveText: "Excluir este Comment",
commentRemoveConfirmMessageText: "Tem certeza de que deseja excluir este comentário?",
commentRemoveConfirmText: "Excluir",
commentRemoveCancelText: "Cancelar",
commentRemoveConfirmationMsg: "O comentário foi excluído com êxito.",
commentRemoveErrorMsg: "O comentário não pôde ser excluído neste momento. Tente novamente ou entre em contato com um administrador.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Caracteres Restantes",

// Message
msgCloseAlt: "Fechar mensagem",

//More Less Link
showMoreText: "Mostrar mais",
showLessText: "Mostrar menos",
showMoreActions: "Mais...",

ariaShowMoreLabel: "Este botão é usado para exibir conteúdo que ficou oculto para propósitos de exibição. Não é relevante para usuários de tecnologia assistiva.",


//Tags
listTags: "${0} e ${1} mais",

//Trends
expandTrend: "Expandir o filtro Tendências",
collapseTrend: "Reduzir o filtro Tendências",
trendTitle: "Tendência",
relatedTrendTitle: "Incluir a tendência ''${0}''",
trendHelp: "Ajuda de Tendência",
closeTrendHelp: "Fechar Ajuda de Tendência",
trendDescription: "Tendência é uma palavra-chave gerada pelo sistema para tornar mais fácil a execução de procura em Atualizações de Status. Clique em uma tendência para exibir os resultados da procura que foram designados a essa palavra-chave.",
noTrends: "Nenhuma tendência ainda",
selectedTrends: "Tendências Selecionadas",
relatedTrends: "Tendências Relacionadas",
relatedTrendsDesc: "Inclua uma tendência relacionada para refinar ainda mais sua procura",
removeTrend: "Remover a tendência ''${0}'' das tendências de filtro selecionadas",
removeGeneric: "Remover",
removeHashtag: "as tags de filtro selecionadas.Remover a hashtag ${0} das marcações de filtro selecionadas.",

//ActivityStream search
asSearchLabel: "Procurar o fluxo atual",
asSearchShadowtext: "Procurar este fluxo",
asSearchBarOpen: "Abrir barra de procura para procurar visualização atual",
asSearchBarCancel: "Cancelar Procura e retornar para a visualização principal",
asSearch: "Pesquisar",
asSearchGlobalView: "Visualizar resultados da procura de todo conteúdo",

matching: "Correspondendo a:",
matchingAllOf: "Correspondendo todos de:",


//ViewAll extension
viewAllUpdates: "Visualizar todas as atualizações",

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
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Hoje às ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Ontem às ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Amanhã às ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Tudo",
filterStatusUpdates: "Atualizações de Status",
filterActivities: "Atividades",
filterBlogs: "Blogs",
filterBookmarks: "Favoritos",
filterCommunities: "Comunidades",
filterFiles: "Arquivos",
filterForums: "Fóruns",
filterPeople: "Pessoas",
filterProfiles: "Perfis",
filterWikis: "Wikis",
filterTags: "Marcações",
filterLibraries: "Bibliotecas",
filterMyNetworkAndPeopleIFollow: "Minha Rede e as Pessoas que Eu Sigo",
filterMyNetwork: "Minha Rede",
filterPeopleIFollow: "Pessoas que eu sigo",
filterMyUpdates: "Minhas Atualizações",
filterCommunitiesIFollow: "Comunidades que Eu Sigo",
filterForMe: "Para Mim",
filterFromMe: "De Mim",

// Label for filters - used by gadget
viewFilterLabel: "Subvisualização:",
filterOneLabel: "Filtrar por:",
filterTwoLabel: "Mostrar:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Estou seguindo",
viewStatusUpdates: "Atualizações de Status",
viewActionRequired: "Ação Requerida",
viewSaved: "Salvo",
viewMyNotifications: "Minhas Notificações",
viewDiscover: "Descobrir",
viewRecentUpdates: "Atualizações Recentes",

// Aria label for As View Side Nav
ariaASViews: "Visualizações do Fluxo de Atividades",

selectedLabel: "Selecionado",

// Gadget title
asTitle: "Atualizações do Connections",

// Used by gadget in Notes
updatesFromSender: "Atualizações do Remetente",
updatesFromContact: "Atualizações do Contato",
updatesForUser: "Atualizações para o usuário",
updatesFor: "Atualizações para ${0}",
noUser: "Nenhum Usuário foi localizado para este endereço de e-mail: ${0}",
returnMainView: "Retornar",

//External Application Text
externalApplication: "Aplicativo Externo",

//Strings for expanding comments inline
showPreviousComments: "Mostrar Comentários Anteriores...",
hideAdditionalComments: "Ocultar Comentários Adicionais...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} de ${1}",
errorRetrieveComments: "Ocorreu um erro ao recuperar comentários anteriores.",
errorRetrieveCommentsDeleted: "Ocorreu um erro ao recuperar comentários anteriores. O item pode ter sido excluído.",

// News Item Actions - Repost
repostText: "Postar novamente",
logInRepostText: "Efetuar login ao postar novamente",
repostMsgSuccess: "A atualização foi postada com êxito novamente para seus seguidores.",
repostMsgFail: "Ocorreu um erro ao repostar essa mensagem.",
repostMsgErrorResGeneric: "Você não está autorizado a postar novamente esta mensagem.",
repostMsgErrorRestricted: "Essa mensagem não pode ser postada novamente, pois a comunidade ${0} agora é uma Comunidade Restrita.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Clique aqui para procurar a marcação ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Este link abrirá em uma nova janela.",
attachFile : "Incluir um Arquivo",
removeFileAttachment: "Remover anexo do arquivo",

// External users 
externalUsersCommentsMsg: "Os comentários podem ser vistos por pessoas de fora da sua organização.",
externalUsersStatusUpdatesMsg: "As Atualizações de Status podem ser vistas por pessoas de fora da sua organização.",
externalUsersItemMsg: "Compartilhado externamente",

// Notifications Center
ariaNotificationCenter: "Notification Center - Visualize atualizações relacionadas ao seu conteúdo e notificações recebidas",
allNotifications : "Todas as Notificações",
seeAllNotifications : "Ver todas",
ariaSeeAllNotifications : "Clique aqui para acessar a visualização Minhas notificações na Página inicial",
notificationsTitle : "Notificações",
notificationsSettings : "Configurações",
ariaNotificationsSettings : "Clique aqui para acessar a página de configurações de notificações",
ariaNewNotification : "Novo título de notificação. ${0}",
newNotifications: "${0} novas notificações",
loadingNotifications: "Carregando...",
noNewNotifications: "Você não recebeu nenhuma notificação na semana passada.",
markRead: "Marcar como lida",
markUnread: "Marcar como não lida",
markAllRead: "Marcar todas como lidas",
markAllReadDetails: "Clique aqui para marcar todas as notificações lidas.",
notificationPopupSingleGeneric: "Você tem 1 nova notificação",
notificationPopupGeneric: "Você tem ${0} novas notificações"
});

