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
      "globalization" : {
         "windowtitle" : "グローバリゼーション",
         "unavailable" : "グローバリゼーション設定を使用できません",
         "details" : "優先言語、優先するカレンダー、ユーザー生成テキストの方向を指定してください。",
         "error" : "エラーが原因でグローバリゼーション設定が取得されませんでした。",
         "titlebar" : {
            "tab2" : "アプリケーションのアクセス",
            "tab1" : "メール通知",
            "tab3" : "グローバリゼーション"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "このボタンを押すと現在のページが最新表示され、新規コンテンツが表示されるようになります。  このメニューに戻るには、次に移動して戻ります:"
         },
         "details_nolanguage" : "優先するカレンダーとユーザー生成テキストの方向を指定してください。",
         "a11y" : {
            "titlebar_label" : "HCL Connections 設定",
            "body_label" : "グローバリゼーション設定"
         },
         "heading" : "グローバリゼーション設定"
      },
      "restore_defaults" : {
         "error" : "エラーが発生しました。 後でもう一度実行してください。",
         "action_tooltip" : "グローバリゼーション設定を元のデフォルト値に復元します",
         "action" : "デフォルトの復元",
         "success" : "グローバリゼーション設定が元のデフォルト値に復元されました。"
      },
      "help" : {
         "help" : "ヘルプ",
         "close" : "閉じる"
      },
      "save" : {
         "error" : "エラーが発生しました。 後でもう一度実行してください。",
         "action_tooltip" : "グローバリゼーション設定の保存",
         "action" : "保存",
         "success" : "グローバリゼーション設定が更新されました。"
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "デフォルトの復元"
         },
         "bidi" : {
            "help" : "「双方向テキストを有効にする」のヘルプ",
            "label" : "双方向テキストを有効にする",
            "tooltip" : "連結テキストと構造化テキスト (ファイル・パスなど) の言語固有の表示を可能にします。  また、言語の選択に関係なく、テキスト方向を指定することもできます。"
         },
         "error" : "エラー",
         "save" : {
            "label" : "保存"
         },
         "direction" : {
            "label" : "ユーザー生成テキストの方向:",
            "tooltip" : "ユーザー入力 (例えば、コンテンツの名前やナビゲーションの階層リンク) に基づくテキストの方向。  デフォルトでは、選択した言語によってテキストの方向が決まります (ほとんどの場合は左から右)。  コンテキストを選択すると、システムは文字分析に基づいて方向を決定できます (混合方向テキストがサポートされます)。",
            "options" : {
               "contextual" : "コンテキスト (文字ベース)",
               "rtl" : "右から左",
               "ltr" : "左から右",
               "default_ltr" : "言語のデフォルトを使用 (左から右)",
               "default_rtl" : "言語のデフォルトを使用 (右から左)"
            }
         },
         "cancel" : {
            "label" : "キャンセル"
         },
         "language" : {
            "selected" : "${0} (現在)",
            "label" : "言語:",
            "tooltip" : "アプリケーション・テキストを表示する言語を指定してください。  この設定はユーザー生成テキストには影響しません。"
         },
         "calendar" : {
            "label" : "カレンダー:",
            "options" : {
               "hebrew" : "ヘブライ語",
               "gregorian" : "グレゴリオ",
               "hijri" : "ヒジュラ"
            }
         }
      }
});
