/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
   submit: {label: "保存", a11y: "保存", tooltip: "保存"}, 
   cancel: {label: "キャンセル", a11y: "キャンセル", tooltip: "キャンセル"},
   close: {label: "閉じる", a11y: "閉じる", tooltip: "閉じる"},
   title: {global: "共有", community: "コミュニティーとの共有"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "このシナリオでは、共有アクションは使用できません。",
	   ACTIONS_LOAD_ERROR: "共有アクションのロード中にエラーが発生しました。",
	   CONTENT_LOAD_ERROR: "コンテンツをロードできません。 後で再試行するか、システム管理者にお問い合わせください。"},
   MESSAGE: {
	      SUCCESS: "確認",
	      ERROR: "エラー",
	      ERROR_ALT_TEXT: "エラー:",
	      INFO: "情報",
	      WARNING: "警告",
	      DISMISS: "このメッセージの非表示",
	      MORE_DETAILS: "詳細",
	      HIDE_DETAILS: "詳細の非表示"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "共有",
	   UPLOAD: "アップロード",
	   CANCEL: "キャンセル",
	   VISIBILITY_WARNING: "このコミュニティーに共有されているファイルは公開されます。",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "ファイル ${0} を正常に ${1} と共有しました。",
		   SUCCESS_PLURAL: "${0} ファイルを正常に ${1} と共有しました。",
		   ERROR: "ファイルを共有できませんでした。  後でもう一度実行してください。",
		   ERROR_X: "ファイルを共有できませんでした。  後でもう一度実行してください。",
           MAX_SHARES_ERROR: "共有の最大数を超えています。",
           EXTERNAL_SHARES_ERROR: "ファイルは組織内でのみ共有できます。",
           EXTERNAL_SHARES_ERROR_X: "ファイルは組織内でのみ共有できます。",
           NOT_LOGGED_IN_ERROR: "ログインしていなかったため、ファイルは共有されませんでした。  ファイルを共有するには「共有」をクリックしてください。",
           NOT_LOGGED_IN_ERROR_X: "ログインしていなかったため、ファイルは共有されませんでした。  ファイルを共有するには「共有」をクリックしてください。",
           TIMEOUT_ERROR: "サーバーに接続できなかったため、ファイルは共有されませんでした。  「共有」をクリックしてもう一度実行してください。",
           TIMEOUT_ERROR_X: "サーバーに接続できなかったため、ファイルは共有されませんでした。  「共有」をクリックしてもう一度実行してください。",
           CANCEL_ERROR: "要求がキャンセルされたため、ファイルは共有されませんでした。  「共有」をクリックしてもう一度実行してください。",
           CANCEL_ERROR_X: "要求がキャンセルされたため、ファイルは共有されませんでした。  「共有」をクリックしてもう一度実行してください。",
           NOT_FOUND_ERROR: "このファイルは既に削除されたか閲覧できなくなっているため、共有できません。",
           NOT_FOUND_ERROR_X: "これらのファイルは既に削除されたか閲覧できなくなっているため、共有できません。",
           ACCESS_DENIED_ERROR: "このファイルを共有するための許可を失っています。",
           ACCESS_DENIED_ERROR_X: "これらのファイルを共有するための許可がもうありません。",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "制限付きファイルを公開することはできません。",
        	   ERROR_SHARE_X: "制限付きファイルを公開することはできません。"
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "${0} を正常に ${1} にアップロードしました。",
		   SUCCESS_PLURAL: "${0} ファイルを正常に ${1} にアップロードしました。",
		   ERROR: "ファイルをアップロードできませんでした。  後でもう一度実行してください。",
		   ERROR_X: "${0} をアップロードできませんでした。  後でもう一度実行してください。",
		   INFO_SUCCESS_PRE_MODERATION: "ファイル ${0} がレビュー用に送信されました。承認されると、このファイルが使用可能になります。",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} ファイルがレビュー用に送信されました。承認されると、使用可能になります。"
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "ファイルをアップロードして共有"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "キャンセル",
	   CONFIRM_OTHER_TAB: "現在のアクションを続行すると、他のタブで入力した情報は失われます。  続行するには「OK」、戻るには「キャンセル」を押してください。",
	   CONFIRM_CURRENT_TAB: "現在のアクションを続行すると、「${0}」タブで入力した情報は失われます。  続行するには「OK」、戻るには「キャンセル」を押してください。",
	   DIALOG_TITLE: "確認",
	   OK: "OK"
   }
})



