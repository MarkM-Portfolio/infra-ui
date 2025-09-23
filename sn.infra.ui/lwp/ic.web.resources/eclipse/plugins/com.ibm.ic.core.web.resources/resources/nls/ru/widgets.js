/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

// FIXME: temporary stop-gap until we make net.jazz.ajax.dojoResourceModules work with AMD bundles
define({
      // NLS_ENCODING=UNICODE
      // NLS_MARKUP=IBMJDK21
      //// G11N GA UI

      // COMPONENTPREFIX CLFWZ
      // NLS_MESSAGEFORMAT_VAR
      // NLS_CHARSET=UTF-8
         'str_component_id' : 'CLFWZ',

         // Login Required
         'msg.loginRequired' : 'Войдите в систему для просмотра содержимого.',
         'ErrorGeneric' : 'Ошибка при показе содержимого. Обратитесь к системному администратору.',
         'showErrorDetails' : 'Показать сведения об ошибке',
         'HideErrorDetails' : 'Скрыть сведения об ошибке',

         'loadInfo' : 'Загрузить информацию ...',

         'dykLoadInfo' : 'Показать пользователей, которых рекомендуется добавить в вашу сеть.',
         'dykLoadInfo2' : 'Показать пользователей, которых рекомендуется добавить в вашу сеть, с учетом существующего списка сетевых контактов.',

         'wcuLoadInfo' : 'Определите, каким образом вы связаны с этим профайлом с учетом вашей сети и действий.',

         'ticLoadInfo' : 'Определите, что вас связывает с этим профайлом с учетом вашей сети и деятельности.',

         'deleteWidget' : 'Удалить приложение',
         'hideWidget' : 'Скрыть приложение',
         'deleteWidgetMsg' : 'Вы собираетесь удалить приложение. Это приведет к удалению всей информации приложения. Это действие нельзя отменить. Совместно используемое участниками сообщества содержимое останется общим. В случае повторного добавления приложения общие данные снова появляются в нем.<br/><br/>Если вы действительно хотите удалить это приложение, нажмите кнопку Удалить. <br/>В противном случае нажмите Отмена.',
         'hideWidgetMsg' : 'Приложение будет скрыто.<br/><br/>Его можно снова активировать повторным добавлением в сообщество. Вся информация приложения сохраняется.',
         'deleteWidgetWarn' : 'Предупреждение: данные приложения {0} будут необратимо удалены.',
         'deleteWidgetConfirm' : 'Я понимаю, что приложение и все связанные с ним данные будут удалены безвозвратно.',
         'deleteWithSharedContentWidgetConfirm' : 'Я понимаю, что приложение и все связанные с ним данные будут удалены безвозвратно.  Совместно используемое участниками сообщества содержимое останется общим. В случае повторного добавления приложения общие данные снова появляются в нем.',
         'delete' : 'Удалить',
         'hide' : 'Скрыть',
         'cancel' : 'Отмена',
         'save' : 'Сохранить',
         'edit' : 'Изменить',
         'view' : 'Показать',
         'help' : 'Справка',
         'refresh' : 'Обновить',
         'actions' : 'Действия',
         'switchTabWarning' : 'Прежде чем открывать другую вкладку, сохраните изменения на каждой из текущих открытых вкладок.',
         'confirmDeleteWidget' : 'Вы действительно хотите удалить это приложение?<br><br>Его можно будет восстановить позднее из меню Действия сообщества.  Все параметры отображения будут потеряны, но данные приложения будут сохранены.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Изменить заголовок',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'Действия для: ${0}',
         'actionsmenu' : 'Меню действий',
         'toggle' : 'Включить/выключить',
         'open' : 'Открыть',
         'close' : 'Закрыть',

         'widgets_Move' : 'Переместить',
         'widgets_MoveUp' : 'Переместить вверх',
         'widgets_MoveDown' : 'Переместить вниз',
         'widgets_MoveLeft' : 'Переместить влево',
         'widgets_MoveRight' : 'Переместить вправо',
         'widgets_MovePrev' : 'Переместить в предыдущий столбец',
         'widgets_MoveNext' : 'Переместить в следующий столбец',
         'widgets_Min' : 'Свернуть',
         'widgets_Max' : 'Развернуть',

         'widgetCat_AllWidgets' : 'Все приложения',
         'widgetCat_thrdParty' : 'Прочее',
         'widgetCat_hidden' : 'Скрытые',
         'widget_BackToOverview' : 'Вернуться на страницу Обзор',
         'widget_AddingWidget' : 'Добавление приложения',
         'widget_RemovingWidget' : 'Удаление приложения',
         'widget_AllTab' : 'Все',
         'widget_HideConfirmation' : 'Вы успешно скрыли ${0} из этого сообщества. ',
         'widget_HideConfirmationUndo' : 'Отменить',

         'link.remove' : 'Удалить',
         'link.window.close' : 'Закрыть окно',
         'link.window.openNewWindow' : 'Будет открыто новое окно',

         'error.title.generic' : 'Обнаружена неполадка.',
         'error.message.generic' : 'Произошел сбой - нажмите кнопку Назад и повторите попытку. Если это не сработает, сообщите о неполадке на форуме поддержки.',
         'info.feed.general.moreinfo' : 'Щелкните здесь для просмотра дополнительных сведений',

         'label.theme.customize' : 'Добавить приложения',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Нет доступных лент новостей',
         'errorDefaultMsg' : 'Невозможно отобразить данные приложения',
         'errorDefaultMsg2' : 'Возникла ошибка, обратитесь к системному администратору',
         'errorDefaultMsg3' : 'Щелкните здесь для просмотра дополнительных сведений',
         'errorMsg' : 'Сообщение: ',
         'errorName' : 'Имя: ',
         'errorType' : 'Тип: ',
         'errorLine' : 'Строка:',
         'errorStackTrace' : 'Трассировка: ',
         'errorUnableToConnect' : 'Не удалось подключиться к {0}'

});

