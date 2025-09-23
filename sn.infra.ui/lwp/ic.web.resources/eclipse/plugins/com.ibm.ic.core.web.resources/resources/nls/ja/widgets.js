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
         'msg.loginRequired' : 'コンテンツを表示するにはログインしてください。',
         'ErrorGeneric' : 'コンテンツの表示中にエラーが発生しました。 システム管理者にお問い合わせください。',
         'showErrorDetails' : 'エラー詳細を表示',
         'HideErrorDetails' : 'エラー詳細を非表示',

         'loadInfo' : '情報をロード...',

         'dykLoadInfo' : '推奨するユーザーを表示してネットワークに追加します。',
         'dykLoadInfo2' : '既存のネットワーク連絡先に基づいて、推奨するユーザーを表示してネットワークに追加します。',

         'wcuLoadInfo' : 'ネットワークとアクションに基づいて、このプロフィールとの関連性を確認します。',

         'ticLoadInfo' : 'ネットワークとアクティビティーに基づいて、このプロフィールとの共通性を確認します。',

         'deleteWidget' : 'アプリケーションの削除',
         'hideWidget' : 'アプリケーションを非表示',
         'deleteWidgetMsg' : 'アプリケーションを削除しようとしています。 この操作を実行すると、すべてのアプリケーション・コンテンツが削除されます。 このアクションを元に戻すことはできません。 メンバーがコミュニティーに共有しているコンテンツは、そのまま共有されます。 アプリケーションが再追加されると、この共有コンテンツはアプリケーションに再表示されます。<br/><br/>アプリケーションを削除する場合は、下の「削除」ボタンをクリックします。 <br/>そうでない場合は、「キャンセル」をクリックします。',
         'hideWidgetMsg' : 'アプリケーションを非表示にしようとしています。<br/><br/>後でコミュニティーにアプリケーションを再び追加することによって、アプリケーションを再びアクティブ化することができます。 アプリケーションのすべてのコンテンツは、そのまま保持されます。',
         'deleteWidgetWarn' : '警告: アプリケーション {0} のデータは完全に削除されます。',
         'deleteWidgetConfirm' : 'アプリケーションとそれに関連付けられているすべてのデータが完全に削除され、回復できなくなることについて了解しました。',
         'deleteWithSharedContentWidgetConfirm' : 'アプリケーションとそれに関連付けられているすべてのデータが完全に削除され、回復できなくなることについて了解しました。  メンバーがコミュニティーに共有しているコンテンツは、そのまま共有されます。 アプリケーションが再追加されると、この共有コンテンツはアプリケーションに再表示されます。',
         'delete' : '削除',
         'hide' : '非表示',
         'cancel' : 'キャンセル',
         'save' : '保存',
         'edit' : '編集',
         'view' : '表示',
         'help' : 'ヘルプ',
         'refresh' : '最新表示',
         'actions' : 'アクション',
         'switchTabWarning' : '別のタブに移動する前に各タブでの変更を保存する必要があります。',
         'confirmDeleteWidget' : 'このアプリケーションを削除しますか?<br><br>このアプリケーションを後で「コミュニティー・アクション」メニューを使用して復元できます。  アプリケーションを表示するための設定は失われますが、アプリケーションのデータはそのまま残ります。',

         // Strings for Change Title dialog
         'changeTitleAction' : 'タイトルの変更',

         // {0} is the translated title of the application being rendered
         'actions_alt' : '${0} のアクション',
         'actionsmenu' : 'アクション・メニュー',
         'toggle' : '切り替え',
         'open' : '開く',
         'close' : '閉じる',

         'widgets_Move' : '移動',
         'widgets_MoveUp' : '上へ移動',
         'widgets_MoveDown' : '下へ移動',
         'widgets_MoveLeft' : '左へ移動',
         'widgets_MoveRight' : '右へ移動',
         'widgets_MovePrev' : '前の列に移動',
         'widgets_MoveNext' : '次の列に移動',
         'widgets_Min' : '最小化',
         'widgets_Max' : '最大化',

         'widgetCat_AllWidgets' : 'すべてのアプリケーション',
         'widgetCat_thrdParty' : 'その他',
         'widgetCat_hidden' : '非表示',
         'widget_BackToOverview' : '概要ページに戻る',
         'widget_AddingWidget' : 'アプリケーションの追加',
         'widget_RemovingWidget' : 'アプリケーションの削除',
         'widget_AllTab' : 'すべて',
         'widget_HideConfirmation' : 'このコミュニティーから ${0} を正常に非表示にしました。',
         'widget_HideConfirmationUndo' : '取り消し',

         'link.remove' : '削除',
         'link.window.close' : 'ウィンドウを閉じる',
         'link.window.openNewWindow' : 'ここをクリックすると新規ウィンドウが開きます',

         'error.title.generic' : '問題が発生しました。',
         'error.message.generic' : '問題が発生しました。「戻る」ボタンをクリックし、もう一度実行してください。 それでも動作しない場合は、サポート・フォーラムに問題をレポートします。',
         'info.feed.general.moreinfo' : 'ここをクリックすると詳細が表示されます',

         'label.theme.customize' : 'アプリケーションの追加',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : '使用可能なフィードがありません',
         'errorDefaultMsg' : 'アプリケーション・データを表示できません',
         'errorDefaultMsg2' : 'エラーが発生しました。システム管理者にお問い合わせください',
         'errorDefaultMsg3' : 'ここをクリックすると詳細が表示されます',
         'errorMsg' : 'メッセージ: ',
         'errorName' : '名前: ',
         'errorType' : 'タイプ: ',
         'errorLine' : '行:',
         'errorStackTrace' : 'トレース: ',
         'errorUnableToConnect' : '{0} の接続に失敗しました'

});

