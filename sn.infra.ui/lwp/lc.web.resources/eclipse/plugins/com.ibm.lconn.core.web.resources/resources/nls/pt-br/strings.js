/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
({
   'rs_close' : "Fechar",
   'rs_loading' : "Carregando...",
   'rs_at' : "em",

   'rs_searchDirectory' : "Pessoa não listada? Usar procura completa...",
   'rs_searchGroupDirectory' : "Grupo não listado? Usar procura completa...",
   'rs_searchPersonAndGroupDirectory' : "Pessoa ou grupo não listado? Usar procura completa...",
   'rs_searchCommunityDirectory' : "Comunidade não listada? Usar procura completa...",

   'rs_shadowText_searchDirectory' : "Digite para localizar a pessoa",
   'rs_shadowText_searchGroupDirectory' : "Digite para localizar o grupo",
   'rs_shadowText_searchPersonAndGroupDirectory' : "Digite para localizar a pessoa ou grupo",
   'rs_shadowText_searchCommunityDirectory' : "Digite para localizar a comunidade",

   'rs_listItem' : "Item da lista",
   'rs_noResults' : "Nenhum resultado para '${0}'",
   'rs_today' : "Hoje",
   'rs_tomorrow' : "Amanhã",
   'rs_yesterday' : "Ontem",

   /* Activity List Widget */
   'rs_activityFeedLink' : "Feed para estas atividades",
   'rs_externalText' : "Esta atividade pode ter membros de fora da organização.",
   'rs_moveActivitySuccess' : '\"${activityTitle}\" foi movido com sucesso para a subcomunidade \"${destCommName}\".',
   // copy 'rs_moreInfo' and 'rs_hideInfo' from activity's strings.js
   'rs_moreInfo' : 'Mostrar mais informações sobre esta atividade',
   'rs_hideInfo' : 'Ocultar informações adicionais',
   'rs_more' : "Mais",
   'rs_hide' : "Ocultar",
   'rs_edit' : "Editar",
   'rs_restore' : "Restaurar",
   'rs_deleteEntry' : "Excluir",
   'rs_prioritize' : "Priorizar",
   'rs_markComplete' : "Marcar como Concluído",
   'rs_markIncomplete' : "Restaurar",
   'rs_linkMore' : "... [mais]",
   'rs_linkLess' : "... [menos]",
   'rs_actUpdatedByDate' : "Atualizado por ${0} ${1}",// Updated by (author name) (date)
   'rs_actUpdatedBy' : "Atualizado por ${0}",// Updated by (author name)
   'rs_actDue' : "Prazo ${0}",// Due (date)
   'rs_actTags' : "Marcações: ",
   'rs_actTagsDelim' : ", ",
   'rs_startFromTemplate' : "Iniciar Atividade a partir deste Modelo",
   'rs_favoriteTemplate' : "Marcar como Modelo em Destaque",
   'rs_normalTemplate' : "Marcar como modelo normal",
   'rs_tunedOutPri' : "Desativado",
   'rs_pagepos' : "${0} - ${1} de ${2}", // pagination - e.g. 1 - 10 of 100
   'rs_navPrevLabel' : "Anterior",
   'rs_navNextLabel' : "Próximo",
   'rs_noActivities' : "Não há atividades iniciadas para esta comunidade.",
   'rs_feedError' : "Falha ao carregar o feed.",
   'rs_highPri' : "Alta Prioridade",
   'rs_medPri' : "Prioridade Média",
   'rs_normalPri' : "Prioridade Normal (Padrão)",
   'rs_tuneOut' : "Marcar como Desativado",
   'rs_startActivity' : "Iniciar uma Atividade",
   'rs_startFirstActivity' : "Criar sua Primeira Atividade",
   'rs_navNextLabel' : "Próximo",
   'rs_viewAll' : "Visualizar Todos",
   'rs_activityWidgetTitle' : "Atividades",
   'rs_activityWidgetBriefDescription' : "Controlar metas da comunidade. Criar pendências e compartilhar recursos.",
   'rs_activityWidgetDescription' : "As atividades da comunidade podem ser usadas para colaborar e controlar o progresso em projetos ou iniciativas da comunidade.",
   'rs_completedActivityLink' : "Mostrar Atividades concluídas",
   'rs_activitiesUnavailable' : "O serviço de Atividades está indisponível.",
   'rs_errorPersists' : "Se o problema persistir, entre em contato com o administrador do sistema.",
   'rs_shared' : "Compartilhado",
   'rs_removeActFromComm' : "Remover da comunidade",
   'rs_externalLabel' : "Externo",

   // for ActivityForm
   'rs_templateOptions' : "Opções de modelo",
   'rs_template' : "Modelo",
   'rs_tagsLabel' : "Marcações",
   'rs_peopleLabel' : "Pessoas",
   'rs_aboutThisTemplate' : "Sobre este Modelo",
   'rs_activity' : "Atividade",
   'rs_copyOf' : "Cópia de ${0}",// copy of (activity name)
   'rs_activityFormGoal' : "Objetivos da Atividade",
   'rs_noTemplate' : "Nenhum",
   'rs_copyActivityMembers' : "Usar membros da atividade",
   'rs_copyTemplateMembers' : "Usar membros do modelo",

   /* Forum Widget */
   'rs_noTopics' : "Ainda não há tópicos para esta comunidade.",
   'rs_noTopicsLoggedIn' : "Faça uma pergunta, dê novas ideias ou simplesmente compartilhe suas ideias.",
   'rs_postedBy' : "Post mais recente por",
   'rs_topics' : "tópicos",
   'rs_noTopicsShort' : "Nenhum tópico",
   'rs_topic' : "tópico",
   'rs_replies' : "respostas",
   'rs_noReplies' : "Nenhuma resposta",
   'rs_reply' : "resposta",
   'rs_startTopic' : "Iniciar um Tópico",
   'rs_startFirstTopic' : "Iniciar o Primeiro Tópico",
   'rs_ok' : "OK",
   'rs_locked' : "[Bloqueado]",
   'rs_manageForumSetting' : "Gerenciar Configurações do Fórum",
   'rs_forumSettingCommunityOverviewPage' : "Página de visão geral da comunidade:",
   'rs_defaultForumList' : "Mostrar lista de fóruns por padrão",
   'rs_defaultTopicList' : "Mostrar lista de tópicos por padrão",
   'rs_forumSettingApplicationView' : "Visualização padrão do aplicativo de fórum:",
   'rs_forumSettingNote' : "Nota: Tópicos serão exibidos por padrão se houver apenas um fórum.",
   'rs_forumSettingSubmit' : "Enviar",
   'rs_forumSettingSave' : "Salvar",
   'rs_forumSettingSaveAndClose' : "Salvar e Fechar",
   'rs_forumSettingConfirm' : "Suas mudanças nos Fóruns foram salvas.",
   'rs_forumSettingError' : "Ocorreu erro. Entre em contato com o administrador.",
   'rs_formSettingHideMessage' : "Ocultar esta mensagem",
   'rs_forumSettingCancel' : "Cancelar",
   'rs_forumAnsweredQuestion' : "Pergunta respondida",
   'rs_forumUnAnsweredQuestion' : "Questão não respondida",
   'rs_forumSortBy' : "Classificar por:",
   'rs_forumSortByDate' : "Data",
   'rs_forumSortByReplies' : "Respostas",
   'rs_forumSortByTopic' : "Tópicos",
   'rs_forumSortByTopicsAndReplies' : "Tópicos e Respostas",
   'rs_sortByReplies' : "Classificação por Respostas",
   'rs_sortbyTopicsAndReplies' : "Classificação por Tópicos e Respostas",
   'rs_forumOpenQuestions' : "Questões Abertas",
   'rs_feedOpenQuestions' : "Feed para estas questões abertas",
   'rs_feedAnsweredQuestions' : "Feed para estas questões respondidas",
   'rs_forumMessages' : "${0} mensagens",
   'rs_forumLastAddedPost' : "Post mais recente por ${0}",
   'rs_forumTopics' : "${0} tópicos",
   /* End discussion forum */

   /* Editor plugins -- some for a possible one we haven't implemented yet */
   'rs_createPersonLink' : "Criar Link Pessoal",
   'rs_quote' : "Citação",
   'rs_labelColon' : "Rótulo: ",
   'rs_personColon' : "Pessoa: ",
   'rs_personLink' : "Link de Pessoa",
   'rs_replace' : "Substituir",
   'rs_inactivePerson' : "${0} (inativo)", // person's name (inactive)
   'rs_PersonPicture' : "Foto de ${0}", // person name's picture

   /*Visitor mode -- external user name decoration use cases */
   'rs_PersonExternalLabel' : "Usuário Externo", // A label for the visitor model use cases.
   'rs_PersonExternal' : "${0} (Usuário Externo)", //'{0}' is the person's name. This will be used for the user profile name and profile photo tooltip
   'rs_PersonPictureExternal' : "Foto de ${0} (Usuário Externo)", // Alt text for the external user's profile photo
   'rs_personExternalDesc' : "Este usuário tem acesso a Arquivos e Comunidades compartilhados externamente.",
   /* End editor plugins */

   /* Notification Form */
   'rs_notifyOthers' : "Notificar outras pessoas",
   'rs_messageColon' : "Mensagem: ",
   'rs_notifyColon' : "Notificar: ",
   'rs_notificationConfirm' : "A mensagem de notificação foi enviada com sucesso. ",
   'rs_notificationFail' : "A mensagem de notificação não foi enviada. Tente novamente mais tarde e entre em contato com o administrador do sistema se o problema persistir.",
   'rs_pickCommunity' : "Selecionar na Lista de Comunidades",
   'rs_typeName' : "Digitar um Nome",
   'rs_typeToFilter' : "Digite para filtrar esta lista",
   /* End Notification Form */

   /* FilteringCheckbox */
   'rs_filterListPrompt' : "Digite para filtrar esta lista",
   'rs_filterGroupLabel' : "Selecionar Grupo",
   'rs_noResults' : "Nenhum resultado localizado",
   // ${0} will be replaced with a number
   'rs_numResults' : "Mostrando ${0} resultados de ${1}",

   /* PeopleFilterList */
   'rs_removeFilter' : "Remover",

   /* Language Selector */
   'rs_browser_setting' : "Configuração do Navegador",
   'rs_customLangaugeLinkLabel' : "Idioma Customizado",

   /* Paging controls */
   // 0 and 1 are page numbers
   'rs_jumpPage' : "Ir para a página ${0} de ${1}",
   "rs_jumpPageLabel" : "Ir para a página",
   'rs_pageNumLabel' : "Número da Página",
   'rs_pageLabel' : "Página:",

   /* Common Tags Widget */
   'rs_tagCloudNavigationLabel' : 'Marcações',
   'rs_tagCloudToggleHint' : "Clique para ocultar ou mostrar",
   'rs_tagCloudHelpAlt' : "Obter ajuda com as marcações",
   'rs_tagCloudNoTags' : "Nenhuma marcação ainda",
   'rs_tagCloudNoRecentTags' : "Nenhuma marcação recente",
   'rs_tagCloudNoTagsProfiles' : "Procurar o diretório. As marcações associadas aos perfis retornados pela procura serão exibidas aqui.",
   'rs_tagLoadingTags' : "Carregando Conteúdo",
   'rs_tagCloudSelectedTags' : "Marcações Selecionadas",
   'rs_tagCloudSeachDesc' : "Localizar uma Marcação",
   'rs_tagCloudSeach' : "Procurar",
   'rs_tagCloudRelatedTags' : "Marcações Relacionadas",
   'rs_tagCloudRelatedTagsDescription' : "Adicione uma marcação relacionada para refinar mais esta procura",
   'rs_tagCloudError' : 'Houve um erro',

   'rs_viewAsCloud' : "Nuvem",
   'rs_viewAsCloudTitle' : "Listar as marcações como nuvem de marcações",
   'rs_viewAsCloudDescription' : "Visualizando marcações como uma nuvem de marcações",
   'rs_viewAsList' : "Lista",
   'rs_viewAsListTitle' : "Listar as marcações como uma lista sequencial de marcações",
   'rs_viewAsListDescription' : "Visualizando marcações como uma lista sequencial de marcações",
   'rs_tagCloudViewAll' : "Procurar",
   'rs_tagCloudViewAllTitle' : "Procurar todas as marcações",

   'rs_normalTags' : "Marcações Ativas",

   'rs_removeTag' : "Remover a marcação das marcações de filtro selecionadas",
   'rs_clearAll' : "Limpar Todos",
   'rs_searchInputDefault' : "Digite para localizar uma marcação",
   'rs_searchInputTagSelected' : "Digite outra marcação",
   'rs_relatedTagTitle' : "Mostrar os resultados de procura da marcação ${0}, contagem ${1}",
   'rs_removeTagTitle' : "Remover a marcação ${0} das marcações de filtro selecionadas",
   'rs_addTagTitle' : "Filtrar por marcação ${0} com a contagem ${1}",

   'rs_tagDialogCloseTile' : "Fechar",
   'rs_tagDialogTitle' : "Todas as Marcações",
   'rs_tagDialogPageInfo' : "${0} - ${1} de ${2} marcações",

   /* Group Selection (Picker) Widget */
   'rs_group_browse_groups' : "Procurar Grupos",
   'rs_group_browse_groups_dialog_title' : "Procurar Grupos",
   'rs_group_browse_find_groups' : "Localizar Grupos",
   'rs_group_browse_add_button' : "Incluir",
   'rs_group_browse_cancel_button' : "Cancelar",
   'rs_group_browse_enter_string' : "Digite para localizar grupos",
   'rs_group_browse_group_typeahead_label' : "Digite um nome de grupo:",
   'rs_group_browse_group_name' : "Nome do grupo:",
   'rs_group_browse_results_label' : "Selecione um grupo correspondente:",
   'rs_group_browse_parent_group_label' : "Você está em:",
   'rs_group_browse_next_page' : "Próxima página",
   'rs_group_browse_previous' : "Anterior",
   'rs_group_browse_next' : "Próximo",
   'rs_group_browse_paging' : "Paginação",
   'rs_group_browse_previous_page' : "Página anterior",
   'rs_group_browse_group_selected' : "Grupo selecionado:",
   'rs_group_browse_group_no_groups' : "Esse grupo não contém nenhum grupo",
   'rs_group_browse_page_info' : "${0} - ${1} de ${2}",
   'rs_group_browse_page_info_alt' : "Correspondendo grupos ${0} a ${1} de ${2}",
   'rs_group_browse_remove_selection' : 'Remover seleção de grupo aninhado: ${0}',
   'rs_group_browse_paging' : "Paginação",
   'rs_member_groups' : "Grupos",
   'rs_member_members' : "Membros",
   'rs_member_no_results' : "Nenhum resultado localizado",
   'rs_member_remove_group' : "Remover ${0}",
   'rs_member_add_to_community' : "Clique para incluir um membro",
   'rs_member_remove_name' : "Clique para remover um membro",
   'rs_group_add_to_community' : "Clique para incluir um grupo",
   'rs_group_remove_name' : "Clique para remover um grupo",
   'rs_group_name' : "Nome do Grupo",
   'rs_group_role' : "Função do Grupo",

   'rs_warning' : "Aviso",
   'rs_a11y_warning' : "Aviso:",

   'rs_messagebox_close_btn_title' : "Fechar",
   'rs_messagebox_close_btn_alt' : "Fechar",
   'rs_messagebox_error_icon_alt' : "Erro",
   'rs_messagebox_error_a11y_label' : "Erro:",
   'rs_messagebox_warning_icon_alt' : "Aviso",
   'rs_messagebox_warning_a11y_label' : "Aviso:",
   'rs_messagebox_info_icon_alt' : "Informações",
   'rs_messagebox_info_a11y_label' : "Informações:",
   'rs_messagebox_success_icon_alt' : "Êxito",
   'rs_messagebox_success_a11y_label' : "Sucesso:",

   /* Document Picker CK Plugin */
   'rs_docpicker_title' : "Inserir Link para Arquivos",
   'rs_docpicker_label' : "Link para o Connections Files",
   // '{0}' is a filename
   'rs_docpicker_download_title' : "Fazer Download de ${0}",
   'rs_docpicker_viewdetails_text' : "Visão de Detalhes",
   // '{0}' is a filename
   'rs_docpicker_viewdetails_title' : "Visualizar detalhes de ${0}",

   /* AttachedFileList widget */
   'rs_attachedfile_remove_alt' : "Remover",
   'rs_attachedfile_filename' : "Imagem ${0}",

   'rs_feedreader_warning' : "Aviso: este link deve ser usado por leitores de feed e pode ser exibido incorretamente em seu navegador. Clique em OK para continuar ou em Cancelar para retornar à página.",

   'rs_search' : "Procurar",
   'rs_all_connections' : "Todo o Connections",
   'rs_advanced' : "Avançado",
   'rs_select_scope' : "Selecionar escopo da procura",

   'rs_icfixlayout' : {
      button_label : "Reformatar",
      dialog_title : "Reformatar Conteúdo",
      warning : "Aviso",
      reformat_save : "Reformatar e Salvar",
      save_as_is : "Salvar no Estado em que se Encontra",
      cancel : "Cancelar",
      warn_layout : "Seu conteúdo excede a largura máxima de exibição.  Deseja reformatar automaticamente para ajustar o espaço disponível?",
      remember_decision : "Lembrar minha Decisão"
   },

   //The following error messages are used by icdocpicker when private files are shared with a Community.
   'rs_sharefile_constraint_violation' : "Ocorreu um erro ao compartilhar os arquivos selecionados.",
   'rs_sharefile_access_denied' : "Este arquivo foi excluído ou não está mais compartilhado com você.",
   'rs_sharefile_invalid_request' : "Ocorreu um erro ao compartilhar os arquivos selecionados.",
   'rs_sharefile_sharing_intent_restriction' : "O arquivo só pode ser compartilhado dentro de sua organização.",
   'rs_sharefile_error_title' : "Erro",

   /* Strings for the native mobile app banners */
   'rs_mobileBanner_title' : 'HCL Connections',
   'rs_mobileBanner_inAppStore' : 'No App Store',
   'rs_mobileBanner_inGooglePlay' : 'No Google Play',
   'rs_mobileBanner_author' : 'HCL Software',
   'rs_mobileBanner_open' : 'Abrir',
   'rs_mobileBanner_view' : 'Visualizar',
   'rs_mobileBanner_hide' : 'Ocultar',

   'rs_empty_column_placeholder' : 'Arrastar aplicativos aqui.',
   'rs_widget_loading_error_title' : 'Não é possível exibir o widget',
   'rs_widget_loading_error_message' : 'Tente novamente mais tarde e entre em contato com o administrador do sistema se o problema persistir.',
   'rs_widgets_loading_error_title' : 'Não é possível exibir o widget(s) nesta comunidade',
   'rs_widget_misplacement_warning' : 'Esse aplicativo não se ajusta a essa coluna. Um proprietário da comunidade pode movê-lo para outra coluna ou removê-lo da página.',

   'rs_widget_title_change_fail_message' : {
      title_too_long : 'O título inserido é muito longo.',
      empty_new_title : 'O título inserido não pode ficar vazio.',
      default_message : 'Não é possível alterar o título para este aplicativo ${0}.'
   },

   /* Strings for change title dialog */
   'rs_widget_title_change_label' : 'Título:  ',
   'rs_widget_title_change_direction' : 'Alterar o título para este aplicativo ${0}.',
   'rs_widget_title_change_title' : 'Alterar Título',

   /* Strings for Visitor Model Invite dialog */
	'rs_vmmainContentTitle' : "Convidar ou Incluir Membros",
	'rs_vmmainContentDesc' : "Convide membros para que eles tenham a oportunidade de participar da comunidade. Adicione membros para incluí-los automaticamente.",
	'rs_vmtypeAheadLabel' : "Nome ou E-mail: ",
	'rs_vmgroupTypeAheadLabel' : "Nome: ",
	'rs_vmtypeAheadRoleLabel' : " como ",
	'rs_vmgroupTypeAheadRoleLabel' : " como Membros ",
	'rs_vmtaNoResults' : "Nenhum resultado foi encontrado.",
	'rs_vmtaHeader' : "cabeçalho",
	'rs_vmaddUser' : "Incluir",
	'rs_vmradioSectionTitle' : "Opções do Membro:",
	'rs_vmradioOne' : "Enviar convites para participar da comunidade",
	'rs_vmradioTwo' : "Incluir usuários automaticamente na comunidade",
	'rs_vmtwistyA' : "Incluir uma Mensagem Opcional",
	'rs_vmtwistyB' : "Remover texto adicional",
	'rs_vmmessage' : "Mensagem:",
	'rs_vmtextAreaStartText' : "Diga algo...",
	'rs_vmcheckboxLabel' : "Enviar-me uma cópia",
	'rs_vmsave' : "Salvar",
	'rs_vminvite' : "Convidar",
	'rs_vmcancel' : "Cancelar",
	'rs_userContentTitle' : "Inserir informações",
	'rs_vmaddUser' : "Criar usuário",
	'rs_vmback'	 : "Voltar",
	'rs_vmvisitor'	 : "Visitante"
})
