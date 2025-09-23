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
         'msg.loginRequired' : 'Melden Sie sich an, um Ihren Inhalt anzuzeigen. ',
         'ErrorGeneric' : 'Fehler beim Anzeigen von Inhalt. Wenden Sie sich an den zuständigen Systemadministrator.',
         'showErrorDetails' : 'Fehlerdetails anzeigen ',
         'HideErrorDetails' : 'Fehlerdetails ausblenden ',

         'loadInfo' : 'Informationen laden... ',

         'dykLoadInfo' : 'Empfohlene Personen anzeigen, die Ihrem Netzwerk hinzugefügt werden sollen. ',
         'dykLoadInfo2' : 'Zeigen Sie empfohlene Personen an, die auf der Basis Ihrer vorhandenen Netzwerkkontakte Ihrem Netzwerk hinzugefügt werden sollen. ',

         'wcuLoadInfo' : 'Finden Sie heraus, in welchem Zusammenhang Sie zu diesem Profil auf der Basis Ihres Netzwerks und Ihrer Aktionen stehen. ',

         'ticLoadInfo' : 'Finden Sie heraus, was Sie auf der Basis Ihres Netzwerks und Ihrer Aktivität mit diesem Profil gemeinsam haben. ',

         'deleteWidget' : 'Anwendung entfernen ',
         'hideWidget' : 'Anwendung ausblenden ',
         'deleteWidgetMsg' : 'Sie sind dabei, die Anwendung zu entfernen. Dadurch wird der gesamte Anwendungsinhalt entfernt. Diese Aktion kann nicht rückgängig gemacht werden. Inhalte, die Mitglieder mit der Community teilen, bleiben geteilt. Wird die Anwendung erneut hinzugefügt, wird der geteilte Inhalt erneut in der Anwendung angezeigt. <br/><br/>Wenn Sie die Anwendung tatsächlich entfernen möchten, klicken Sie unten auf die Schaltfläche "Entfernen". <br/>Klicken Sie andernfalls auf "Abbrechen". ',
         'hideWidgetMsg' : 'Sie sind dabei, die Anwendung auszublenden.<br/><br/>Sie können sie später erneut aktivieren, indem Sie die Anwendung wieder zur Community hinzufügen. Der gesamte Anwendungsinhalt bleibt erhalten. ',
         'deleteWidgetWarn' : 'Warnung: Daten für die Anwendung {0} werden dauerhaft gelöscht. ',
         'deleteWidgetConfirm' : 'Ich verstehe, dass die Anwendung und alle ihr zugeordneten Daten gelöscht werden und nicht wiederhergestellt werden können. ',
         'deleteWithSharedContentWidgetConfirm' : 'Ich verstehe, dass die Anwendung und alle ihr zugeordneten Daten gelöscht werden und nicht wiederhergestellt werden können. Inhalte, die Mitglieder mit der Community teilen, bleiben geteilt. Wird die Anwendung erneut hinzugefügt, wird der geteilte Inhalt erneut in der Anwendung angezeigt. ',
         'delete' : 'Löschen',
         'hide' : 'Ausblenden',
         'cancel' : 'Abbrechen',
         'save' : 'Speichern',
         'edit' : 'Bearbeiten',
         'view' : 'Anzeigen',
         'help' : 'Hilfe',
         'refresh' : 'Aktualisieren ',
         'actions' : 'Aktionen ',
         'switchTabWarning' : 'Sie müssen die Änderungen auf jeder Registerkarte speichern, bevor Sie zu einer anderen Registerkarte wechseln. ',
         'confirmDeleteWidget' : 'Möchten Sie diese Anwendung wirklich entfernen? <br><br>Sie können diese Anwendung später über das Menü \'Community-Aktionen\' wiederherstellen. Alle Einstellungen für die Anzeige der Anwendung gehen verloren, aber die Daten der Anwendung bleiben erhalten. ',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Titel ändern',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'Aktionen für: ${0} ',
         'actionsmenu' : 'Aktionsmenü ',
         'toggle' : 'Umschalten',
         'open' : 'Öffnen',
         'close' : 'Schließen',

         'widgets_Move' : 'Verschieben',
         'widgets_MoveUp' : 'Nach oben',
         'widgets_MoveDown' : 'Nach unten',
         'widgets_MoveLeft' : 'Nach links ',
         'widgets_MoveRight' : 'Nach rechts ',
         'widgets_MovePrev' : 'Zur vorherigen Spalte ',
         'widgets_MoveNext' : 'Zur nächsten Spalte ',
         'widgets_Min' : 'Minimieren',
         'widgets_Max' : 'Maximieren',

         'widgetCat_AllWidgets' : 'Alle Anwendungen ',
         'widgetCat_thrdParty' : 'Andere ',
         'widgetCat_hidden' : 'Ausgeblendet ',
         'widget_BackToOverview' : 'Zurück zur Übersichtsseite ',
         'widget_AddingWidget' : 'Anwendung wird hinzugefügt ',
         'widget_RemovingWidget' : 'Anwendung wird entfernt ',
         'widget_AllTab' : 'Alle',
         'widget_HideConfirmation' : 'Sie haben ${0} erfolgreich in dieser Community ausgeblendet.',
         'widget_HideConfirmationUndo' : 'Rückgängig machen',

         'link.remove' : 'Entfernen',
         'link.window.close' : 'Fenster schließen ',
         'link.window.openNewWindow' : 'Durch Klicken wird ein neues Fenster geöffnet ',

         'error.title.generic' : 'Es wurde ein Fehler festgestellt. ',
         'error.message.generic' : 'Es ist ein Fehler aufgetreten. Klicken Sie auf die Schaltfläche "Zurück" und versuchen Sie es erneut. Wenn dies nicht funktioniert, melden Sie den Fehler im Unterstützungsforum. ',
         'info.feed.general.moreinfo' : 'Klicken Sie hier, um weitere Details anzuzeigen. ',

         'label.theme.customize' : 'Apps hinzufügen ',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Keine Feeds verfügbar ',
         'errorDefaultMsg' : 'Die Anwendungsdaten können nicht angezeigt werden. ',
         'errorDefaultMsg2' : 'Es ist ein Fehler aufgetreten. Wenden Sie sich an Ihren Systemadministrator. ',
         'errorDefaultMsg3' : 'Klicken Sie hier, um weitere Details anzuzeigen. ',
         'errorMsg' : 'Nachricht: ',
         'errorName' : 'Name: ',
         'errorType' : 'Typ: ',
         'errorLine' : 'Zeile: ',
         'errorStackTrace' : 'Trace: ',
         'errorUnableToConnect' : 'Verbindung fehlgeschlagen für {0} '

});

