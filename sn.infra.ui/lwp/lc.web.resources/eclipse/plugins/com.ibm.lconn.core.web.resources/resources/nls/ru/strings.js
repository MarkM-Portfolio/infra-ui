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
   'rs_close' : "Закрыть",
   'rs_loading' : "Загрузка...",
   'rs_at' : "в",

   'rs_searchDirectory' : "Пользователя нет в списке? Воспользуйтесь полным поиском...",
   'rs_searchGroupDirectory' : "Группы нет в списке? Воспользуйтесь полным поиском...",
   'rs_searchPersonAndGroupDirectory' : "Пользователя или группы нет в списке? Воспользуйтесь полным поиском...",
   'rs_searchCommunityDirectory' : "Сообщества нет в списке? Воспользуйтесь полным поиском...",

   'rs_shadowText_searchDirectory' : "Введите текст для поиска пользователя",
   'rs_shadowText_searchGroupDirectory' : "Введите текст для поиска группы",
   'rs_shadowText_searchPersonAndGroupDirectory' : "Введите текст для поиска пользователя или группы",
   'rs_shadowText_searchCommunityDirectory' : "Введите текст для поиска сообщества",

   'rs_listItem' : "Элемент списка",
   'rs_noResults' : "Нет результатов для '${0}'",
   'rs_today' : "Сегодня",
   'rs_tomorrow' : "Завтра",
   'rs_yesterday' : "Вчера",

   /* Activity List Widget */
   'rs_activityFeedLink' : "Лента новостей для этих операций",
   'rs_externalText' : "Эта операция может иметь участников из других организаций.",
   'rs_moveActivitySuccess' : 'Операция \"${activityTitle}\" успешно перемещена в подсообщество \"${destCommName}\".',
   // copy 'rs_moreInfo' and 'rs_hideInfo' from activity's strings.js
   'rs_moreInfo' : 'Показать дополнительную информацию об операции',
   'rs_hideInfo' : 'Скрыть дополнительную информацию',
   'rs_more' : "Дополнительно",
   'rs_hide' : "Скрыть",
   'rs_edit' : "Изменить",
   'rs_restore' : "Восстановить",
   'rs_deleteEntry' : "Удалить",
   'rs_prioritize' : "Расставить приоритеты",
   'rs_markComplete' : "Пометить как выполненный.",
   'rs_markIncomplete' : "Восстановить",
   'rs_linkMore' : "... [больше]",
   'rs_linkLess' : "... [меньше]",
   'rs_actUpdatedByDate' : "Обновлен пользователем ${0} ${1}",// Updated by (author name) (date)
   'rs_actUpdatedBy' : "Обновлен пользователем ${0}",// Updated by (author name)
   'rs_actDue' : "Выполнить до: ${0}",// Due (date)
   'rs_actTags' : "Теги: ",
   'rs_actTagsDelim' : ", ",
   'rs_startFromTemplate' : "Создать операцию на основе этого шаблона",
   'rs_favoriteTemplate' : "Пометить как избранный шаблон",
   'rs_normalTemplate' : "Пометить как обычный шаблон",
   'rs_tunedOutPri' : "Скрыто",
   'rs_pagepos' : "${0} - ${1} из ${2}", // pagination - e.g. 1 - 10 of 100
   'rs_navPrevLabel' : "Назад",
   'rs_navNextLabel' : "Далее",
   'rs_noActivities' : "Для этого сообщества нет начатых операций.",
   'rs_feedError' : "Не удалось загрузить ленту новостей.",
   'rs_highPri' : "Высокий приоритет",
   'rs_medPri' : "Средний приоритет",
   'rs_normalPri' : "Обычный приоритет (по умолчанию)",
   'rs_tuneOut' : "Отметить как скрытое",
   'rs_startActivity' : "Запустить операцию",
   'rs_startFirstActivity' : "Создайте свою первую операцию",
   'rs_navNextLabel' : "Далее",
   'rs_viewAll' : "Показать все",
   'rs_activityWidgetTitle' : "Операции",
   'rs_activityWidgetBriefDescription' : "Наметьте цели сообщества. Создайте задачи и общие ресурсы.",
   'rs_activityWidgetDescription' : "Операции сообщества можно использовать для совместной работы и отслеживания состояния проектов или инициатив.",
   'rs_completedActivityLink' : "Показать выполненные операции",
   'rs_activitiesUnavailable' : "Служба операций недоступна.",
   'rs_errorPersists' : "Если проблема не будет устранена, обратитесь к системному администратору.",
   'rs_shared' : "Общий",
   'rs_removeActFromComm' : "Удалить из сообщества",
   'rs_externalLabel' : "Внешние",

   // for ActivityForm
   'rs_templateOptions' : "Параметры шаблона",
   'rs_template' : "Шаблон",
   'rs_tagsLabel' : "Теги",
   'rs_peopleLabel' : "Пользователи",
   'rs_aboutThisTemplate' : "Описание шаблона",
   'rs_activity' : "Операция",
   'rs_copyOf' : "Копия для: ${0}",// copy of (activity name)
   'rs_activityFormGoal' : "Цель операции",
   'rs_noTemplate' : "Нет",
   'rs_copyActivityMembers' : "Использовать участников из операции",
   'rs_copyTemplateMembers' : "Использовать участников из шаблона",

   /* Forum Widget */
   'rs_noTopics' : "Для этого сообщества еще нет тем.",
   'rs_noTopicsLoggedIn' : "Задавайте вопросы, участвуйте в мозговом штурме или просто поделитесь своими идеями.",
   'rs_postedBy' : "Последнее сообщение пользователя",
   'rs_topics' : "темы",
   'rs_noTopicsShort' : "Нет тем",
   'rs_topic' : "тема",
   'rs_replies' : "ответов",
   'rs_noReplies' : "Нет ответов",
   'rs_reply' : "ответ",
   'rs_startTopic' : "Создать тему",
   'rs_startFirstTopic' : "Создать новую тему",
   'rs_ok' : "OK",
   'rs_locked' : "[Заблокировано]",
   'rs_manageForumSetting' : "Управление параметрами форума",
   'rs_forumSettingCommunityOverviewPage' : "Страница обзора сообщества:",
   'rs_defaultForumList' : "По умолчанию отображается список форумов",
   'rs_defaultTopicList' : "По умолчанию отображается список тем",
   'rs_forumSettingApplicationView' : "Представление приложения форума по умолчанию:",
   'rs_forumSettingNote' : "Примечание: если создан только один форум, то по умолчанию отображается список тем.",
   'rs_forumSettingSubmit' : "Отправить",
   'rs_forumSettingSave' : "Сохранить",
   'rs_forumSettingSaveAndClose' : "Сохранить и закрыть",
   'rs_forumSettingConfirm' : "Изменения приложения Форумы сохранены.",
   'rs_forumSettingError' : "Ошибка. Обратитесь к администратору.",
   'rs_formSettingHideMessage' : "Скрыть это сообщение",
   'rs_forumSettingCancel' : "Отмена",
   'rs_forumAnsweredQuestion' : "Вопрос с ответом",
   'rs_forumUnAnsweredQuestion' : "Вопрос без ответа",
   'rs_forumSortBy' : "Критерий сортировки:",
   'rs_forumSortByDate' : "Дата",
   'rs_forumSortByReplies' : "Ответы",
   'rs_forumSortByTopic' : "Темы",
   'rs_forumSortByTopicsAndReplies' : "Темы и ответы",
   'rs_sortByReplies' : "Сортировать по ответам",
   'rs_sortbyTopicsAndReplies' : "Сортировать по темам и ответам",
   'rs_forumOpenQuestions' : "Открытые вопросы",
   'rs_feedOpenQuestions' : "Лента новостей для этих открытых вопросов",
   'rs_feedAnsweredQuestions' : "Лента новостей для этих вопросов, на которые дан ответ",
   'rs_forumMessages' : "${0} сообщений",
   'rs_forumLastAddedPost' : "Последнее сообщение пользователя ${0}",
   'rs_forumTopics' : "${0} тем",
   /* End discussion forum */

   /* Editor plugins -- some for a possible one we haven't implemented yet */
   'rs_createPersonLink' : "Создать ссылку на сотрудника",
   'rs_quote' : "Цитировать",
   'rs_labelColon' : "Метка: ",
   'rs_personColon' : "Пользователь: ",
   'rs_personLink' : "Ссылка на сотрудника",
   'rs_replace' : "Заменить",
   'rs_inactivePerson' : "${0} (неактивный)", // person's name (inactive)
   'rs_PersonPicture' : "Изображение ${0}", // person name's picture

   /*Visitor mode -- external user name decoration use cases */
   'rs_PersonExternalLabel' : "Внешний пользователь", // A label for the visitor model use cases.
   'rs_PersonExternal' : "${0} (внешний пользователь)", //'{0}' is the person's name. This will be used for the user profile name and profile photo tooltip
   'rs_PersonPictureExternal' : "Фотография ${0} (внешний пользователь)", // Alt text for the external user's profile photo
   'rs_personExternalDesc' : "У этого пользователя есть доступ к Файлам и Сообществам, к которым открыт внешний доступ.",
   /* End editor plugins */

   /* Notification Form */
   'rs_notifyOthers' : "Уведомить других пользователей",
   'rs_messageColon' : "Сообщение: ",
   'rs_notifyColon' : "Уведомление: ",
   'rs_notificationConfirm' : "Уведомление отправлено успешно. ",
   'rs_notificationFail' : "Сообщение с уведомлением не отправлено. Повторите попытку позже. Если неполадка сохраняется, обратитесь к системному администратору.",
   'rs_pickCommunity' : "Выбрать в списке сообществ",
   'rs_typeName' : "Введите имя",
   'rs_typeToFilter' : "Введите фильтр списка",
   /* End Notification Form */

   /* FilteringCheckbox */
   'rs_filterListPrompt' : "Введите фильтр списка",
   'rs_filterGroupLabel' : "Выбрать группу",
   'rs_noResults' : "Ничего не найдено",
   // ${0} will be replaced with a number
   'rs_numResults' : "Показ ${0} результатов из ${1}",

   /* PeopleFilterList */
   'rs_removeFilter' : "Удалить",

   /* Language Selector */
   'rs_browser_setting' : "Настройки браузера",
   'rs_customLangaugeLinkLabel' : "Пользовательский язык",

   /* Paging controls */
   // 0 and 1 are page numbers
   'rs_jumpPage' : "Перейти к странице ${0} из ${1}",
   "rs_jumpPageLabel" : "Перейти к странице",
   'rs_pageNumLabel' : "Номер страницы",
   'rs_pageLabel' : "Страница:",

   /* Common Tags Widget */
   'rs_tagCloudNavigationLabel' : 'Теги',
   'rs_tagCloudToggleHint' : "Щелкните здесь, чтобы скрыть или показать",
   'rs_tagCloudHelpAlt' : "Получить справку по тегам",
   'rs_tagCloudNoTags' : "Тегов еще нет",
   'rs_tagCloudNoRecentTags' : "Нет последних тегов",
   'rs_tagCloudNoTagsProfiles' : "Поиск в каталоге. Здесь показываются теги, связанные с профайлами в результатах поиска.",
   'rs_tagLoadingTags' : "Загрузка данных",
   'rs_tagCloudSelectedTags' : "Выбранные теги",
   'rs_tagCloudSeachDesc' : "Найти тег",
   'rs_tagCloudSeach' : "Поиск",
   'rs_tagCloudRelatedTags' : "Связанные теги",
   'rs_tagCloudRelatedTagsDescription' : "Добавьте связанный тег для дальнейшего уточнения поиска",
   'rs_tagCloudError' : 'Возникла ошибка',

   'rs_viewAsCloud' : "Облако",
   'rs_viewAsCloudTitle' : "Показать теги в виде облака тегов",
   'rs_viewAsCloudDescription' : "Просмотр тегов в виде облака тегов",
   'rs_viewAsList' : "Список",
   'rs_viewAsListTitle' : "Показать теги в виде последовательного списка",
   'rs_viewAsListDescription' : "Просмотр тегов в виде последовательного списка",
   'rs_tagCloudViewAll' : "Обзор",
   'rs_tagCloudViewAllTitle' : "Обзор всех тегов",

   'rs_normalTags' : "Активные теги",

   'rs_removeTag' : "Удалить тег из выбранных тегов фильтра",
   'rs_clearAll' : "Очистить все",
   'rs_searchInputDefault' : "Введите текст для поиска тега",
   'rs_searchInputTagSelected' : "Введите другой тег",
   'rs_relatedTagTitle' : "Показать результаты поиска тега ${0}, кол-во: ${1}",
   'rs_removeTagTitle' : "Удалить тег ${0} из выбранных тегов фильтра",
   'rs_addTagTitle' : "Фильтровать по тегу ${0} со счетчиком ${1}",

   'rs_tagDialogCloseTile' : "Закрыть",
   'rs_tagDialogTitle' : "Все теги",
   'rs_tagDialogPageInfo' : "${0} - ${1} из ${2} тегов",

   /* Group Selection (Picker) Widget */
   'rs_group_browse_groups' : "Просмотр групп",
   'rs_group_browse_groups_dialog_title' : "Просмотр групп",
   'rs_group_browse_find_groups' : "Найти группы",
   'rs_group_browse_add_button' : "Добавить",
   'rs_group_browse_cancel_button' : "Отмена",
   'rs_group_browse_enter_string' : "Введите текст для поиска групп",
   'rs_group_browse_group_typeahead_label' : "Введите имя группы:",
   'rs_group_browse_group_name' : "Имя группы:",
   'rs_group_browse_results_label' : "Выберите соответствующую группу:",
   'rs_group_browse_parent_group_label' : "Вы работаете в:",
   'rs_group_browse_next_page' : "Следующая страница",
   'rs_group_browse_previous' : "Назад",
   'rs_group_browse_next' : "Далее",
   'rs_group_browse_paging' : "Разбиение на страницы",
   'rs_group_browse_previous_page' : "Предыдущая страница",
   'rs_group_browse_group_selected' : "Выбранная группа:",
   'rs_group_browse_group_no_groups' : "Эта группа не содержит другие группы",
   'rs_group_browse_page_info' : "${0} - ${1} из ${2}",
   'rs_group_browse_page_info_alt' : "Совпадающие группы с ${0} по ${1} из ${2}",
   'rs_group_browse_remove_selection' : 'Удалить выбранные вложенные группы: ${0}',
   'rs_group_browse_paging' : "Разбиение на страницы",
   'rs_member_groups' : "Группы",
   'rs_member_members' : "Участники",
   'rs_member_no_results' : "Ничего не найдено",
   'rs_member_remove_group' : "Удалить ${0}",
   'rs_member_add_to_community' : "Щелкните, чтобы добавить участника",
   'rs_member_remove_name' : "Щелкните, чтобы удалить участника",
   'rs_group_add_to_community' : "Щелкните, чтобы добавить группу",
   'rs_group_remove_name' : "Щелкните, чтобы удалить группу",
   'rs_group_name' : "Имя группы",
   'rs_group_role' : "Роль группы",

   'rs_warning' : "Предупреждение",
   'rs_a11y_warning' : "Предупреждение:",

   'rs_messagebox_close_btn_title' : "Закрыть",
   'rs_messagebox_close_btn_alt' : "Закрыть",
   'rs_messagebox_error_icon_alt' : "Ошибка",
   'rs_messagebox_error_a11y_label' : "Ошибка:",
   'rs_messagebox_warning_icon_alt' : "Предупреждение",
   'rs_messagebox_warning_a11y_label' : "Предупреждение:",
   'rs_messagebox_info_icon_alt' : "Информация",
   'rs_messagebox_info_a11y_label' : "Информационное сообщение:",
   'rs_messagebox_success_icon_alt' : "Выполнено",
   'rs_messagebox_success_a11y_label' : "Выполнено:",

   /* Document Picker CK Plugin */
   'rs_docpicker_title' : "Вставить ссылку на Файлы",
   'rs_docpicker_label' : "Ссылка на Файлы Connections",
   // '{0}' is a filename
   'rs_docpicker_download_title' : "Загрузить ${0}",
   'rs_docpicker_viewdetails_text' : "Показать сведения",
   // '{0}' is a filename
   'rs_docpicker_viewdetails_title' : "Показать сведения об ${0}",

   /* AttachedFileList widget */
   'rs_attachedfile_remove_alt' : "Удалить",
   'rs_attachedfile_filename' : "Изображение ${0}",

   'rs_feedreader_warning' : "Предупреждение: Эта ссылка предназначена для читателей ленты и может отображаться неверно в вашем браузере. Нажмите OK для продолжения или Отмена для возврата на страницу.",

   'rs_search' : "Поиск",
   'rs_all_connections' : "Все компоненты Connections",
   'rs_advanced' : "Дополнительно",
   'rs_select_scope' : "Выбрать область поиска",

   'rs_icfixlayout' : {
      button_label : "Изменить формат",
      dialog_title : "Изменить формат материалов",
      warning : "Предупреждение",
      reformat_save : "Изменить формат и сохранить",
      save_as_is : "Сохранить как есть",
      cancel : "Отмена",
      warn_layout : "Ширина содержимого больше максимальной ширины окна.  Изменять формат автоматически для размещения в доступном пространстве?",
      remember_decision : "Запомнить решение"
   },

   //The following error messages are used by icdocpicker when private files are shared with a Community.
   'rs_sharefile_constraint_violation' : "При предоставлении совместного доступа к выбранным файлам возникла ошибка.",
   'rs_sharefile_access_denied' : "Этот файл был удален или больше не используется совместно с вами.",
   'rs_sharefile_invalid_request' : "При предоставлении совместного доступа к выбранным файлам возникла ошибка.",
   'rs_sharefile_sharing_intent_restriction' : "Файл можно сделать общим только внутри организации.",
   'rs_sharefile_error_title' : "Ошибка",

   /* Strings for the native mobile app banners */
   'rs_mobileBanner_title' : 'HCL Connections',
   'rs_mobileBanner_inAppStore' : 'В App Store',
   'rs_mobileBanner_inGooglePlay' : 'В Google Play',
   'rs_mobileBanner_author' : 'HCL Software',
   'rs_mobileBanner_open' : 'Открыть',
   'rs_mobileBanner_view' : 'Показать',
   'rs_mobileBanner_hide' : 'Скрыть',

   'rs_empty_column_placeholder' : 'Перенесите приложения сюда.',
   'rs_widget_loading_error_title' : 'Ошибка отображения виджета',
   'rs_widget_loading_error_message' : 'Повторите попытку позже. Если неполадка сохраняется, обратитесь к системному администратору.',
   'rs_widgets_loading_error_title' : 'Не удалось показать виджеты в этом сообществе',
   'rs_widget_misplacement_warning' : 'Это приложение не умещается в данном столбце. Владелец сообщества может переместить его в другой столбец или убрать со страницы.',

   'rs_widget_title_change_fail_message' : {
      title_too_long : 'Введен слишком длинный заголовок.',
      empty_new_title : 'Введенный заголовок не должен быть пустым.',
      default_message : 'Не удалось изменить заголовок приложения ${0}.'
   },

   /* Strings for change title dialog */
   'rs_widget_title_change_label' : 'Заголовок:  ',
   'rs_widget_title_change_direction' : 'Измените заголовок приложения ${0}.',
   'rs_widget_title_change_title' : 'Изменить заголовок',

   /* Strings for Visitor Model Invite dialog */
	'rs_vmmainContentTitle' : "Пригласить или добавить участников",
	'rs_vmmainContentDesc' : "Пригласите участников, чтобы они могли присоединиться к сообществу. Добавьте участников для их автоматического включения.",
	'rs_vmtypeAheadLabel' : "Имя или адрес электронной почты: ",
	'rs_vmgroupTypeAheadLabel' : "Имя: ",
	'rs_vmtypeAheadRoleLabel' : " в качестве ",
	'rs_vmgroupTypeAheadRoleLabel' : " как участников ",
	'rs_vmtaNoResults' : "Результаты не найдены.",
	'rs_vmtaHeader' : "заголовок",
	'rs_vmaddUser' : "Добавить",
	'rs_vmradioSectionTitle' : "Параметры для участника:",
	'rs_vmradioOne' : "Отправить приглашения присоединиться к сообществу",
	'rs_vmradioTwo' : "Автоматически добавлять пользователей в сообщество",
	'rs_vmtwistyA' : "Добавить дополнительное сообщение",
	'rs_vmtwistyB' : "Удалить дополнительный текст",
	'rs_vmmessage' : "Сообщение:",
	'rs_vmtextAreaStartText' : "Введите текст...",
	'rs_vmcheckboxLabel' : "Отправить мне копию",
	'rs_vmsave' : "Сохранить",
	'rs_vminvite' : "Пригласить",
	'rs_vmcancel' : "Отмена",
	'rs_userContentTitle' : "Введите информацию",
	'rs_vmaddUser' : "Создать пользователя",
	'rs_vmback'	 : "Назад",
	'rs_vmvisitor'	 : "Посетитель"
})
