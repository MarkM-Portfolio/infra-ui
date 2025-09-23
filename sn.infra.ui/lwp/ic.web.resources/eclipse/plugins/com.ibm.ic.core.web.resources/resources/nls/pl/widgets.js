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
         'msg.loginRequired' : 'Zaloguj się, aby wyświetlić swoją treść.',
         'ErrorGeneric' : 'Wystąpił błąd podczas wyświetlania treści. Skontaktuj się z administratorem systemu.',
         'showErrorDetails' : 'Pokaż szczegóły błędu',
         'HideErrorDetails' : 'Ukryj szczegóły błędu',

         'loadInfo' : 'Ładuj informacje...',

         'dykLoadInfo' : 'Wyświetl osoby rekomendowane do dodania do sieci.',
         'dykLoadInfo2' : 'Wyświetl osoby rekomendowane do dodania do sieci na podstawie istniejących kontaktów sieciowych.',

         'wcuLoadInfo' : 'Określ relację z profilem na podstawie sieci i działań.',

         'ticLoadInfo' : 'Określ wspólne elementy z profilem na podstawie sieci i działań.',

         'deleteWidget' : 'Usuwanie aplikacji',
         'hideWidget' : 'Ukrywanie aplikacji',
         'deleteWidgetMsg' : 'Aplikacja zostanie za chwilę usunięta. Spowoduje to usunięcie całej treści aplikacji. Tego działania nie można cofnąć. Treść udostępniona przez członków do współużytkowania dla społeczności jest nadal udostępniona. Jeśli aplikacja zostanie ponownie dodana, ta treść udostępniona do współużytkowania zostanie ponownie wyświetlona w aplikacji.<br/><br/>Jeśli na pewno chcesz usunąć tę aplikację, kliknij umieszczony poniżej przycisk Usuń. <br/>W przeciwnym razie kliknij przycisk Anuluj.',
         'hideWidgetMsg' : 'Aplikacja zostanie za chwilę ukryta.<br/><br/>Aby aktywować tę aplikację w przyszłości, wystarczy ponownie dodać ją do społeczności. Cała treść aplikacji zostanie zachowana bez zmian.',
         'deleteWidgetWarn' : 'Ostrzeżenie: Dane aplikacji {0} zostaną trwale usunięte.',
         'deleteWidgetConfirm' : 'Rozumiem, że aplikacja i wszystkie powiązane z nią dane zostaną usunięte i nie będzie można ich odzyskać.',
         'deleteWithSharedContentWidgetConfirm' : 'Rozumiem, że aplikacja i wszystkie powiązane z nią dane zostaną usunięte i nie będzie można ich odzyskać. Treść udostępniona przez członków do współużytkowania dla społeczności jest nadal udostępniona. Jeśli aplikacja zostanie ponownie dodana, ta treść udostępniona do współużytkowania zostanie ponownie wyświetlona w aplikacji.',
         'delete' : 'Usuń',
         'hide' : 'Ukryj',
         'cancel' : 'Anuluj',
         'save' : 'Zapisz',
         'edit' : 'Edytuj',
         'view' : 'Wyświetl',
         'help' : 'Pomoc',
         'refresh' : 'Odśwież',
         'actions' : 'Działania',
         'switchTabWarning' : 'Należy zapisać zmiany na każdej karcie przed przejściem do innej karty.',
         'confirmDeleteWidget' : 'Czy na pewno usunąć tę aplikację?<br><br>Później można odtworzyć tę aplikację przy użyciu menu Działania dotyczące społeczności.  Wszystkie ustawienia wyświetlania aplikacji są tracone, ale dane aplikacji zostają zachowane bez zmian.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Zmień tytuł',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'Działania dotyczące aplikacji ${0}',
         'actionsmenu' : 'Menu działań',
         'toggle' : 'Przełącz',
         'open' : 'Otwórz',
         'close' : 'Zamknij',

         'widgets_Move' : 'Przenieś',
         'widgets_MoveUp' : 'Przenieś w górę',
         'widgets_MoveDown' : 'Przenieś w dół',
         'widgets_MoveLeft' : 'Przenieś w lewo',
         'widgets_MoveRight' : 'Przenieś w prawo',
         'widgets_MovePrev' : 'Przenieś do poprzedniej kolumny',
         'widgets_MoveNext' : 'Przenieś do następnej kolumny',
         'widgets_Min' : 'Minimalizuj',
         'widgets_Max' : 'Maksymalizuj',

         'widgetCat_AllWidgets' : 'Wszystkie aplikacje',
         'widgetCat_thrdParty' : 'Inne',
         'widgetCat_hidden' : 'Ukryte',
         'widget_BackToOverview' : 'Powrót do strony Przegląd',
         'widget_AddingWidget' : 'Dodawanie aplikacji',
         'widget_RemovingWidget' : 'Usuwanie aplikacji',
         'widget_AllTab' : 'Wszystko',
         'widget_HideConfirmation' : 'Widget ${0} został pomyślnie ukryty w tej społeczności. ',
         'widget_HideConfirmationUndo' : 'Cofnij',

         'link.remove' : 'Usuń',
         'link.window.close' : 'Zamknij okno',
         'link.window.openNewWindow' : 'Kliknięcie tego odsyłacza spowoduje otwarcie nowego okna',

         'error.title.generic' : 'Napotkano problem.',
         'error.message.generic' : 'Wystąpił problem. Kliknij przycisk Wstecz i spróbuj ponownie. Jeśli problem wystąpi ponownie, zgłoś go na forum wsparcia.',
         'info.feed.general.moreinfo' : 'Kliknij tutaj, aby wyświetlić więcej szczegółów',

         'label.theme.customize' : 'Dodaj apki',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Brak dostępnych kanałów',
         'errorDefaultMsg' : 'Nie można wyświetlić danych aplikacji',
         'errorDefaultMsg2' : 'Wystąpił błąd. Skontaktuj się z administratorem systemu.',
         'errorDefaultMsg3' : 'Kliknij tutaj, aby wyświetlić więcej szczegółów',
         'errorMsg' : 'Wiadomość: ',
         'errorName' : 'Nazwa: ',
         'errorType' : 'Typ: ',
         'errorLine' : 'Wiersz:',
         'errorStackTrace' : 'Ślad: ',
         'errorUnableToConnect' : 'Nie powiodła się próba nawiązania połączenia z {0}'

});

