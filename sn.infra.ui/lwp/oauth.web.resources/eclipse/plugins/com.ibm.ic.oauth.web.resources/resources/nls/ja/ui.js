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
define({
      "authorize" : {
         "legal" : "Licensed Materials \u2013 Property of HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. All rights reserved. \u8a73\u7d30\u306b\u3064\u3044\u3066\u306f\u3001\u88fd\u54c1\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u3054\u89a7\u304f\u3060\u3055\u3044\u3002Java \u304a\u3088\u3073\u3059\u3079\u3066\u306e Java \u95a2\u9023\u306e\u5546\u6a19\u304a\u3088\u3073\u30ed\u30b4\u306f Oracle \u3084\u305d\u306e\u95a2\u9023\u4f1a\u793e\u306e\u7c73\u56fd\u304a\u3088\u3073\u305d\u306e\u4ed6\u306e\u56fd\u306b\u304a\u3051\u308b\u5546\u6a19\u307e\u305f\u306f\u767b\u9332\u5546\u6a19\u3067\u3059\u3002",
         "error" : "エラーが発生しました。 後でもう一度実行してください。",
         "granted" : {
            "title" : "アクセスが付与されました",
            "blurb" : "あなたの HCL Connections アカウントと対話するための ${0} アクセスを付与しました。"
         },
         "denied" : {
            "title" : "アクセスが拒否されました",
            "blurb" : "あなたの HCL Connections アカウントと対話するための ${0} アクセスを拒否しました。"
         },
         "blurb" : "{0} が HCL Connections 情報 (HCL Connections 内のすべてのコンテンツを含む) に対するアクセスを要求しています。",
         "revoke" : {
            "description" : "「HCL Connections 設定」>「{0}」の順にクリックすれば、いつでもアクセスを取り消すことができます。 HCL Connections は定期的に再許可を確認します。",
            "link" : "アプリケーションのアクセス"
         },
         "authorize" : {
            "label" : "アクセスの許可"
         },
         "windowtitle" : "HCL Connections へのアクセスを許可",
         "title" : "アクセス要求",
         "deny" : {
            "label" : "アクセスの拒否"
         },
         "action_tooltip" : "アプリケーション ${0} へのアクセスを許可します",
         "action" : "アクセスの許可",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "${0} に戻るようリダイレクトしています。"
      },
      "javascript" : {
         "disabled" : {
            "title" : "JavaScript をオンにする",
            "p2" : "ページを更新して続行してください。",
            "p1" : "ご使用の Web ブラウザーで JavaScript が無効になっています。  HCL Connections が機能するには JavaScript が必要です。  オンにしたら、ページを更新してください。"
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "要求を処理できません",
            "description" : "アプリケーションから発行された、HCL Connections アカウントへのアクセス要求が不完全でした。  ブラウザーの「戻る」ボタンをクリックして要求を送信したサイトまたはアプリケーションに戻り、もう一度実行してください。  この操作を行っても問題が解決しない場合は、管理者に問題を報告してください。"
         },
         "invalid_token" : {
            "title" : "要求を処理できません",
            "description" : "アプリケーションから発行された、HCL Connections アカウントへのアクセス要求が無効でした。  ブラウザーの「戻る」ボタンをクリックして要求を送信したサイトまたはアプリケーションに戻り、もう一度実行してください。  この操作を行っても問題が解決しない場合は、管理者に問題を報告してください。"
         },
         "default_action" : {
            "label" : "ホーム・ページに戻る"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "エラー:",
            "icon_alt" : "エラー"
         },
         "success" : {
            "a11y_label" : "成功:",
            "icon_alt" : "成功"
         },
         "warning" : {
            "a11y_label" : "警告:",
            "icon_alt" : "警告"
         },
         "info" : {
            "a11y_label" : "情報:",
            "icon_alt" : "情報"
         }
      },
      "loading" : "ロード中...",
      "deny" : {
         "error" : "エラーが発生しました。 後でもう一度実行してください。",
         "action_tooltip" : "アプリケーション ${0} へのアクセスを拒否します",
         "action" : "アクセスの拒否",
         "success" : "アクセスが拒否されました。"
      },
      "grid" : {
         "applications" : {
            "summary" : "あなたの HCL Connections 情報へのアクセス権限を持つアプリケーションのリスト。",
            "loading" : "ロード中...",
            "empty" : "アプリケーションが見つかりません。",
            "reverse_sort" : "逆順にソート"
         }
      },
      "applications" : {
         "windowtitle" : "アプリケーションのアクセス",
         "details" : "あなたの HCL Connections 情報へのアクセス権限を持つアプリケーション。",
         "error" : "エラーが原因でリストは取得されませんでした。",
         "titlebar" : {
            "tab2" : "アプリケーションのアクセス",
            "tab1" : "メール通知",
            "tab3" : "グローバリゼーション"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "このボタンを押すと現在のページが最新表示され、新規コンテンツが表示されるようになります。  このメニューに戻るには、次に移動して戻ります:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections 設定"
         },
         "heading" : "アプリケーションのアクセス"
      },
      "sorts" : {
         "application_name" : "アプリケーション名",
         "authorization_date" : "許可日",
         "expiration_date" : "有効期限日付",
         "action" : "アクション"
      },
      "revoke_token" : {
         "error" : "エラーが発生しました。 後でもう一度実行してください。",
         "dialog_title" : "アクセス権限の取り消し",
         "action_tooltip" : "アプリケーション ${0} へのアクセス権限を取り消します",
         "action" : "取り消し",
         "ok" : "OK",
         "cancel" : "キャンセル",
         "confirm" : "あなたの HCL Connections 情報に対するこのアプリケーションのアクセス権限を取り消しますか? ",
         "success" : "アプリケーションが削除されました。"
      }
});
