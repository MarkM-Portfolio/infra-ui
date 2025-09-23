/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

//NLS_CHARSET=UTF-8

define ({
  root: {
     FILE_VIEWER_TITLE: "ファイル・プレビュー",
     FILENAME_TOOLTIP: "ファイル名の編集",
     ICON_TOOLTIP: "ファイルのダウンロード",
     ERROR: "エラーが発生しました。",
     SHARED_EXTERNALLY: "外部と共有",
     FILE_SYNCED: "同期に追加",
     MORE_ACTIONS: {
       TITLE: "他のアクション",
       A11Y: "ファイル上で実行する他のアクションのリストを含むドロップダウン・メニューを開きます。"
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "他のオプション",
         A11Y: "このボタンは他のオプションのメニューを開きます。"
       },
       BUTTON: {
         EDIT: {
           TITLE: "編集"
         },
         UPLOAD: {
           TITLE: "アップロード"
         }
       }
     },
     WELCOME: {
       TITLE: "ファイル・ビューと詳細を統合しました",
       SUBTITLE: "ファイルとそのコメントを横に並べて参照できるようになりました。",
       LINES: {
          LINE_1: "以前のページで行えた操作とすべての情報がこの画面に表示されます。",
          LINE_2: "コメント、共有状況、バージョンおよび基本情報は、ファイルの隣に表示されます。"
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "このボタンをクリックすると、次のファイルに移動します。",
      PREVIOUS_A11Y: "このボタンをクリックすると、前のファイルに移動します。"
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "閉じる",
         A11Y: "このボタンをクリックすると、ファイル・ビューアーが閉じます。"
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "ファイルから新規作成",
         ACTION_NAME:"ファイルの作成",
         A11Y: {
           TEXT: "テンプレート・ファイルから文書 (DOC ファイル、DOCX ファイル、ODT ファイル) を作成します。これらの文書は、Docs でオンラインで編集できます。",
           PRES: "テンプレート・ファイルからプレゼンテーション (PPT ファイル、PPTX ファイル、ODP ファイル) を作成します。これらのプレゼンテーションは、Docs でオンラインで編集できます。",
           SHEET: "テンプレート・ファイルからスプレッドシート (XLS ファイル、XLSX ファイル、ODS ファイル) を作成します。これらのスプレッドシートは、Docs でオンラインで編集できます。"
         },
         PROMPT: {
           TEXT: "テンプレート・ファイルから文書 (DOC ファイル、DOCX ファイル、ODT ファイル) を作成します。これらの文書は、Docs でオンラインで編集できます。",
           PRES: "テンプレート・ファイルからプレゼンテーション (PPT ファイル、PPTX ファイル、ODP ファイル) を作成します。これらのプレゼンテーションは、Docs でオンラインで編集できます。",
           SHEET: "テンプレート・ファイルからスプレッドシート (XLS ファイル、XLSX ファイル、ODS ファイル) を作成します。これらのスプレッドシートは、Docs でオンラインで編集できます。"
         },
         NAME_FIELD: "名前:",
         EXTERNAL_FIELD: "組織外部のユーザーとのファイルの共有が可能",
         EXTERNAL_DESC: "外部アクセスを有効にすると、外部ユーザー (組織または会社の外部のユーザー) とのファイルの共有、外部ユーザーとのフォルダーの共有、外部ユーザーをメンバーとして持つコミュニティーが可能になります。 外部アクセスは、ファイルのアップロード時に設定する必要があります。後で設定することはできません。",
         CREATE_BUTTON: "作成",
         CANCEL: "キャンセル",
         PRE_FILL_NAMES: {
           OTT: "無題の文書",
           OTS: "無題のスプレッドシート",
           OTP: "無題のプレゼンテーション",
           DOT: "無題の文書",
           XLT: "無題のスプレッドシート",
           POT: "無題のプレゼンテーション",
           DOTX: "無題の文書",
           XLTX: "無題のスプレッドシート",
           POTX: "無題のプレゼンテーション"
         },
         ERRORS: {
           NAME_REQUIRED: "文書名は必須です。",
           ILLEGAL_NAME:"これは無効な文書タイトルです。別のタイトルを指定してください。",
           WARN_LONG_NAME: "文書名が長すぎます。",
           TRIM_NAME: "文書名を短縮しますか?",
           SESSION_TIMEOUT: "セッションの有効期限が切れました。再度ログインしてやり直してください。",
           DUPLICATE_NAME: "重複するファイル名が見つかりました。 新しい名前を入力してください。",
           SERVER_ERROR: "Connections サーバーを使用できません。 サーバー管理者に連絡し、後でやり直してください。"
         }
       },
       DOWNLOAD: {
         TOOLTIP: "ファイルのダウンロード",
         A11Y: "このボタンをクリックすると、ファイルをダウンロードします。"
       },
       DOWNLOAD_AS_PDF: {
         NAME: "PDF としてダウンロード",
         TOOLTIP: "PDF ファイルとしてこのファイルをダウンロード",
         A11Y: "このボタンをクリックすると、ファイルを PDF としてダウンロードします。",
         SUCCESS: "ファイルを PDF として正常にダウンロードしました。",
         ERROR: {
           DEFAULT: "ファイルを PDF として正常にダウンロードできませんでした。  後で再試行してください。",
           UNAUTHENTICATED: "セッションがタイムアウトになりました。 ファイルを PDF としてダウンロードするには、再度ログインする必要があります。",
           NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、ファイルを PDF としてダウンロードできませんでした。",
           ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、ファイルを PDF としてダウンロードできませんでした。"
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "このファイルにはダウンロードできる公開バージョンがありません。  バージョンは、Docs エディターから公開できます。"
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "ファイルをダウンロードできません",
           CANCEL: "閉じる",
           PROMPT: "このファイルにはダウンロードできる公開バージョンがありません。",
           PROMPT2: "バージョンは、Docs エディターから公開できます。"
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "ファイルをダウンロードできません",
           CANCEL: "閉じる",
           PROMPT: "このファイルにはダウンロードできる公開バージョンがありません。",
           PROMPT2: "ファイル所有者に、このファイルのバージョンを公開するように依頼してください。"
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "バージョンのダウンロード",
           OK: "バージョンのダウンロード",
           PROMPT: {
             TODAY: "より新しいドラフト (最終編集時刻: 今日の ${time}) が検出されました。",
             YESTERDAY: "より新しいドラフト (最終編集時刻: 昨日の ${time}) が検出されました。",
             DAY: "より新しいドラフト (最終編集日: ${date}) が検出されました。",
             MONTH: "より新しいドラフト (最終編集日: ${date}) が検出されました。",
             YEAR: "より新しいドラフト (最終編集日: ${date_long}) が検出されました。"
           },
           PROMPT2: {
             TODAY: "今日の ${time} に公開されたバージョンのダウンロードを続行しますか?",
             YESTERDAY: "昨日の ${time} に公開されたバージョンのダウンロードを続行しますか?",
             DAY: "${date} に公開されたバージョンのダウンロードを続行しますか?",
             MONTH: "${date} に公開されたバージョンのダウンロードを続行しますか?",
             YEAR: "${date_long} に公開されたバージョンのダウンロードを続行しますか?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "詳細パネルの表示",
         HIDE: "詳細パネルの非表示",
         SHOW_A11Y: "このボタンをクリックすると、サイド・パネルを開く/閉じるを切り替えます。 このサイド･パネルは現在閉じています。",
         HIDE_A11Y: "このボタンをクリックすると、サイド・パネルを開く/閉じるを切り替えます。 このサイド･パネルは現在開いています。"
       },
       VIEW_DOC: {
         NAME: "Docs Viewer で開く",
         TOOLTIP: "Docs Viewer で開く",
         A11Y: "このボタンは、新規ブラウザー・ウィンドウ内で表示用にファイルを開きます。"
       },
       EDIT_DOC: {
         NAME: "Docs で編集",
         TOOLTIP: "ファイルを Docs で編集",
         A11Y: "このボタンは、新規ブラウザー・ウィンドウ内でファイルを編集用に開きます。"
       },
       ROUNDTRIP_EDIT: {
         NAME: "デスクトップで編集",
         DIALOG_TITLE: "デスクトップで編集",
         TOOLTIP: "この文書を編集",
         A11Y: "このボタンはローカルでの編集用にファイルを開きます。",
         PROMPT: "この機能を使用すると、ファイルをローカルに編集できます。",
         IMPORTANT: "重要:",
         REMINDER: "編集が完了したら、デスクトップ・ファイル・コネクターを使用してドラフトを公開する必要があります。 ファイルを開けない場合は、Desktop Plugins をインストールすることが必要な可能性があります。",
         SKIP_DIALOG: "次回からこのメッセージを表示しない",
         OK: "OK",
         CANCEL: "キャンセル"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "確認",
         DELETE_VERSION: "バージョン ${version} の削除",
         DELETE_VERSION_AND_PRIOR: "バージョン ${version} とそれ以前の全バージョンの削除",
         PROMPT: "バージョン ${version} を削除しようとしています。 続行しますか?",
         DELETE_PRIOR: "以前のバージョンもすべて削除",
         ERROR: "バージョンの削除中にエラーが発生しました。 後でもう一度実行してください。",
         TOOLTIP: "このバージョンを削除",
         OK: "OK",
         CANCEL: "キャンセル"
       },
       GET_LINKS: {
         DIALOG_TITLE: "リンクの取得",
         LINK_FILE: "ファイルへのリンク:",
         LINK_PREVIEW: "プレビュー・ファイルへのリンク:",
         LINK_DOWNLOAD: "ダウンロード・ファイルへのリンク:",
         TOOLTIP: "ファイルにリンクする",
         OK: "閉じる"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "このバージョンのダウンロード"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "確認",
         PROMPT: "このファイルの現在のバージョンをバージョン ${version} で置き換えようとしています。 続行しますか?",
         ERROR: "バージョンの復元中にエラーが発生しました。 後でもう一度実行してください。",
         TOOLTIP: "このバージョンの復元",
         CHANGE_SUMMARY: "バージョン ${version} から復元",
         OK: "OK",
         CANCEL: "キャンセル"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "確認",
         REMOVE_EVERYONE: "このファイルへの組織からのアクセス権を削除しますか? アクセスが削除された場合、ファイルは組織レベルのアクセスが許可されているフォルダーとコミュニティーから削除され、所有者と共有されているユーザーのみがそのファイルを表示および操作できます。",
         REMOVE_USER: "${user} との共有を停止しますか? 共有を停止すると、${user}  がこのファイルにアクセスできるのは、フォルダーを使用した場合か、このファイルが組織内のすべてのユーザーに共有されている場合だけです。",
         REMOVE_COMMUNITY: "このファイルをコミュニティー ${communityName} から削除しますか?",
         REMOVE_FOLDER: "このファイルをフォルダー ${folderName} から削除しますか?",
         REMOVE_EVERYONE_TOOLTIP: "組織のアクセス権を削除します",
         REMOVE_USER_TOOLTIP: "${user} とのすべての共有を削除",
         REMOVE_COMMUNITY_TOOLTIP: "コミュニティー ${communityName} から削除",
         REMOVE_FOLDER_TOOLTIP: "フォルダー ${folderName} から削除",
         OK: "OK",
         CANCEL: "キャンセル"
       },
       EDIT_COMMENT: {
         TOOLTIP: "このコメントの編集"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "確認",
         PROMPT: "このコメントを削除しますか?",
         ERROR: "コメントの削除中にエラーが発生しました。 後でもう一度実行してください。",
         TOOLTIP: "このコメントの削除",
         OK: "OK",
         CANCEL: "キャンセル"
       },
       LIKE: {
         LIKE: "このファイルに「いいね」と言う",
         UNLIKE: "このファイルへの「いいね」を取り消す",
         LIKE_A11Y: "このファイルに「いいね」と言うにはこのボタンをクリックします。",
         UNLIKE_A11Y: "このファイルへの「いいね」を取り消すにはこのボタンをクリックします。",
         LIKED_SUCCESS: "このファイルに「いいね」と言いました",
         UNLIKE_SUCCESS: "このファイルの「いいね」を取り消しました"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "説明の編集",
         ERROR: {
           DEFAULT: "説明を保存できませんでした。 後でもう一度実行してください。",
           UNAUTHENTICATED: "セッションがタイムアウトになりました。 説明を更新するには、再度ログインする必要があります。",
           NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、説明を保存できませんでした。",
           ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、説明を保存できませんでした。"
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "ファイル名の保存中にエラーが発生しました",
           CONFLICT: "ファイル名が既に存在します"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "このファイルをフォロー中にエラーが発生しました。 後でもう一度実行してください。",
             UNAUTHENTICATED: "セッションがタイムアウトになりました。 このファイルをフォローする前に、再度ログインする必要があります。",
             NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルをフォローできません。",
             ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルをフォローできません。"
           },
           UNFOLLOW: {
             DEFAULT: "このファイルのフォローを停止中にエラーが発生しました。 後でもう一度実行してください。",
             UNAUTHENTICATED: "セッションがタイムアウトになりました。 このファイルのフォローを停止する前に、再度ログインする必要があります。",
             NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルのフォローを停止できません。",
             ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルのフォローを停止できません。"
           }
         },
         FOLLOW_NAME: "フォロー",
         FOLLOW_TOOLTIP: "このファイルをフォロー",
         FOLLOW_A11Y: "このファイルをフォローするにはこのボタンをクリックします。",
         FOLLOW_SUCCESS: "このファイルをフォローしています。",
         STOP_FOLLOWING_NAME: "フォローの停止",
         STOP_FOLLOWING_TOOLTIP: "このファイルのフォローを停止します",
         STOP_FOLLOWING_A11Y: "このファイルのフォローを停止するにはこのボタンをクリックします。",
         STOP_FOLLOWING_SUCCESS: "このファイルのフォローを停止しました。"
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "同期に追加",
           TOOLTIP: "ファイルを同期に追加します",
           A11Y: "ファイルを同期に追加するにはこのボタンを使用します。",
           SUCCESS: "このファイルを同期に追加しました。",
           ERROR: {
             DEFAULT: "このファイルを同期に追加中にエラーが発生しました。 後でもう一度実行してください。",
             UNAUTHENTICATED: "セッションがタイムアウトになりました。 このファイルを同期に追加する前に、再度ログインする必要があります。",
             NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルを同期に追加できません。",
             ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルを同期に追加できません。"
           }
         },
         STOP_SYNC: {
           NAME: "同期から削除",
           TOOLTIP: "このファイルを同期から削除します",
           A11Y: "ファイルを同期から削除するにはこのボタンを使用します。",
           SUCCESS: "このファイルを同期から削除しました。",
           ERROR: {
             DEFAULT: "このファイルを同期から削除中にエラーが発生しました。 後でもう一度実行してください。",
             UNAUTHENTICATED: "セッションがタイムアウトになりました。 このファイルを同期から削除する前に、再度ログインする必要があります。",
             NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルを同期から削除できません。",
             ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、このファイルを同期から削除できません。"
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "ピン留め",
          FAVORITE_TOOLTIP: "このファイルをピン留め",
          FAVORITE_A11Y: "このファイルをピン留めするにはこのボタンをクリックします。",
          FAVORITE_SUCCESS: "このファイルをピン留めしました。",
          STOP_FAVORITEING_NAME: "ピン留めを解除",
          STOP_FAVORITEING_TOOLTIP: "このファイルのピン留めを解除",
          STOP_FAVORITEING_A11Y: "このボタンをクリックすると、ファイルのピン留めを解除します。",
          STOP_FAVORITEING_SUCCESS: "このファイルのピン留めを解除しました。"
       },
       TRASH: {
         NAME: "ごみ箱に移動",
         DIALOG_TITLE: "確認",
         PROMPT: "このファイルをごみ箱に移動しますか? このファイルをごみ箱に移動すると、現在これを共有しているユーザーがこのファイルを利用できなくなります。",
         ERROR: "ファイルの削除時にエラーが発生しました。 後でもう一度実行してください。",
         TOOLTIP: "このファイルを削除",
         OK: "OK",
         CANCEL: "キャンセル",
         A11Y: "ファイルをごみ箱に移動するにはこのボタンを使用します。",
         SUCCESS_MSG: "${file} がごみ箱に移動されました。"
       },
       REFRESH: {
         NAME: "最新表示",
         ERROR: "ファイル・ビューアーの最新表示中にエラーが発生しました。 後でもう一度実行してください。",
         TOOLTIP: "ファイル・ビューアーの最新表示",
         INFO_MSG: "最新表示して最新のコンテンツを取得します。 ${link}",
         A11Y: "ファイルをごみ箱に移動するにはこのボタンを使用します。",
         SUCCESS_MSG: "コンテンツは正常に最新表示されました。"
       },
       COPY_FILE: {
         NAME: "コミュニティーにコピーを追加",
         DIALOG_TITLE: "確認",
         ERROR: "ファイルのコピー中にエラーが発生しました。 後でもう一度実行してください。",
         TOOLTIP: "このファイルのコピーをコミュニティーに追加します",
         OK: "OK",
         CANCEL: "キャンセル",
         A11Y: "このボタンは、このファイルのコピーをコミュニティーに追加するためのダイアログを開きます。",
         SUCCESS_MSG: "${file} が ${community} にコピーされました。"
       },
       UPLOAD_VERSION: {
         NAME: "新規バージョンのアップロード",
         NAME_SHORT: "アップロード",
         CHANGE_SUMMARY: "変更の要約 (オプション)...",
         TOOLTIP: "このファイルの新しいバージョンをアップロードします。",
         A11Y: "このボタンは、このファイルの新バージョンをアップロードするためのダイアログを開きます。"
       },
       LOG_IN: {
    	   NAME: "ログイン",
    	   TOOLTIP: "ファイルのアップロードと共有、コメント記入、フォルダーの作成を行うには、ログインします"
       },
       LOCK: {
          NAME: "ファイルのロック",
          TITLE: "このファイルのロック",
          A11Y: "このファイルのロック",
          SUCCESS: "このファイルはロックされました。"
       },
       UNLOCK: {
          NAME: "ファイルのロック解除",
          TITLE: "このファイルのロック解除",
          A11Y: "このファイルのロック解除",
          SUCCESS: "ファイルのロックが解除されました。"
       },
       EDIT_ON_DESKTOP: {
          NAME: "デスクトップで編集",
          TITLE: "デスクトップで編集",
          A11Y: "デスクトップで編集"
       },
       FLAG: {
         FILE: {
           NAME: "不適切フラグを立てる",
           TITLE: "ファイルにフラグを立てる",
           A11Y: "このファイルに不適切フラグを立てる",
           PROMPT: "このファイルにフラグを立てる理由を入力してください (オプション): ",
           OK: "フラグ",
           CANCEL: "キャンセル",
           SUCCESS: "このファイルにフラグが立てられ、レビュー用に送信されました。",
           ERROR: "このファイルにフラグを立てようとしてエラーが発生しました。後で再試行してください。"
         },
         COMMENT: {
           NAME: "不適切フラグを立てる",
           TITLE: "コメントにフラグを立てる",
           A11Y: "このコメントに不適切フラグを立てる",
           PROMPT: "このコメントにフラグを立てる理由を入力してください (オプション): ",
           OK: "フラグ",
           CANCEL: "キャンセル",
           SUCCESS: "このコメントにフラグが立てられ、レビュー用に送信されました。",
           ERROR: "このコメントにフラグを立てようとしてエラーが発生しました。後で再試行してください。"
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "このファイルについて",
       VIEW_FILE_DETAILS: "ファイル詳細の表示",
       A11Y: "このリンクをアクティブ化すると、ファイル・ビューアーが閉じてこのファイルのファイル詳細ページに移動します。"
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "このファイルのプレビューは利用できません。"
      },
      IMAGE: {
       ZOOM_IN: "ズームイン",
       ZOOM_OUT: "ズームアウト",
       RESET: "リセット",
       ZOOM_IN_A11Y: "このボタンをクリックすると、イメージをズームインします。",
       ZOOM_OUT_A11Y: "このボタンをクリックすると、イメージをズームアウトします。",
       RESET_ZOOM_A11Y: "このボタンをクリックすると、ズーム・レベルをリセットします。"
      },
      VIEWER: {
       LOADING: "ロード中...",
       NO_PUBLISHED_VERSION: "このファイルの公開バージョンは表示可能ではありません。",
       IFRAME_TITLE: "このファイルのプレビュー"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "${user} が今日の ${time} に最終更新しました",
       YESTERDAY: "${user} が昨日の ${time} に最終更新しました",
       DAY: "${user} が ${EEee} で ${time} に最終更新しました",
       MONTH: "${user} が ${date_long} に最終更新しました",
       YEAR: "${user} が ${date_long} に最終更新しました"
      },
      CREATED: {
       TODAY: "${user} が今日の ${time} に作成しました",
       YESTERDAY: "${user} が昨日の ${time} に作成しました",
       DAY: "${user} が ${EEee} で ${time} に作成しました",
       MONTH: "${user} が ${date_long} 日に作成しました",
       YEAR: "${user} が ${date_long} 日に作成しました"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - 今日",
       YESTERDAY: "${time} - 昨日",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "今日",
       YESTERDAY: "昨日",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "コメント・テキスト・エリア",
       SHADOW_TEXT: "コメントの追加...",
       CANNOT_ACCESS_CONTENT: "あなたが言及した以下のユーザーはコンテンツにアクセスできないため、コメントを表示できません:",
       ERROR: "言及しようとしているユーザーの検証中にエラーが発生しました。",
       POST: "投稿",
       SAVE: "保存",
       CANCEL: "キャンセル",
       EXTERNAL_WARNING: "コメントは、自分の組織外のユーザーから閲覧される場合があります。"
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "キャンセル",
         A11Y: "ファイル名の編集アクションをキャンセルするにはこのボタンをクリックします。"
       },
       INVALID_CHARACTERS: "無効な文字",
       INVALID_CHARACTERS_REMOVED: "無効な文字が削除されました"
     },
     COMMENT_WIDGET: {
       EDITED: "(編集済み)",
       EDITED_DATE: {
         TODAY: "今日の ${time} に編集しました",
         YESTERDAY: "昨日の ${time} に編集しました",
         DAY: "${EEee} の ${time} に編集しました",
         MONTH: "${date_long} に編集しました",
         YEAR: "${date_long} に編集しました"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "保存",
       CANCEL: "キャンセル",
       USER: "ユーザー",
       COMMUNITY: "コミュニティー",
       SHARE: "共有",
       SHARE_ALT: "このユーザーとの共有",
       MEMBER_TYPE: "メンバー・タイプ",
       PERSON_SHADOW: "検索するユーザーを入力",
       COMMUNITY_SHADOW: "検索するコミュニティーを入力",
       PERSON_FULL_SEARCH: "対象ユーザーがリストに表示されない場合は、 全検索を使用してください...",
       COMMUNITY_FULL_SEARCH: "対象コミュニティーがリストに表示されない場合は、 全検索を使用してください...",
       ADD_OPTIONAL_MESSAGE: "オプションのメッセージの追加",
       ROLE_LABEL: "役割",
       ROLE_EDIT: "編集者",
       ROLE_VIEW: "読者"
     },
     FILE_STATE: {
       DOCS_FILE: "これは Docs ファイルです。 すべての編集は、オンラインで行う必要があります。",
       LOCKED_BY_YOU: {
         TODAY: "あなたが ${time} にロックしました。",
         YESTERDAY: "あなたが昨日の ${time} にロックしました。",
         DAY: "あなたが ${date} にロックしました。",
         MONTH: "あなたが ${date} にロックしました。",
         YEAR: "あなたが ${date_long} にロックしました。"
       },
       LOCKED_BY_OTHER: {
         TODAY: "${time} に ${user} がロックしました。",
         YESTERDAY: "昨日の ${time} に ${user} がロックしました。",
         DAY: "${user} が ${date} にロックしました。",
         MONTH: "${user} が ${date} にロックしました。",
         YEAR: "${user} が ${date_long} にロックしました。"
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "コメントが長すぎます。",
         TRIM: "コメントを短縮しますか?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "説明が長すぎます。",
         TRIM: "説明を短縮しますか?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "メッセージが長すぎます。",
         TRIM: "メッセージを短縮しますか?"
       },
       TAG: {
         WARN_TOO_LONG: "タグが長すぎます。",
         TRIM: "タグを短縮しますか?"
       },
       TAGS: {
         WARN_TOO_LONG: "1 つ以上のタグが長すぎます。",
         TRIM: "タグを短縮しますか?"
       },
       FILENAME: {
         WARN_TOO_LONG: "ファイル名が長すぎます。"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Docs ライセンスを購入済みの場合、このファイルについては、オンライン編集のみを使用できます。",
       CURRENT_EDITORS: "このファイルは、現在 ${users} が Web 上で編集中です。",
       UNPUBLISHED_CHANGES: "このドラフトには、バージョンとして公開されていない編集内容があります。",
       PUBLISH_A_VERSION: "バージョンの公開",
       PUBLISH_SUCCESS: "このファイルのバージョンを正常に公開しました",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "アクセスが拒否されたためバージョンを公開できませんでした。",
         NOT_FOUND: "文書が見つからなかったためバージョンを公開できませんでした。",
         CANNOT_REACH_REPOSITORY: "Docs サーバーがファイル・リポジトリーに接続できないため、バージョンを公開できませんでした。",
         QUOTA_VIOLATION: "スペースの制限のため、バージョンを公開できませんでした。 このバージョンを公開できるように、他のファイルを削除して十分なスペースを解放してください。",
         CONVERSION_UNAVAILABLE: "Docs 変換サービスが使用不可であるため、バージョンを公開できませんでした。 後でもう一度実行してください。",
         TOO_LARGE: "文書が大きすぎるため、バージョンを公開できませんでした。",
         CONVERSION_TIMEOUT: "Docs 変換サービスの文書の変換に時間がかかりすぎているため、バージョンを公開できませんでした。 後でもう一度実行してください。",
         SERVER_BUSY: "Docs サーバーがビジーなため、バージョンを公開できませんでした。 後でもう一度実行してください。",
         DEFAULT: "Docs サービスが使用不可であるため、バージョンを公開できませんでした。 後でもう一度実行してください。"
       }
     },
     COMMENTS: {
       EMPTY: "コメントがありません。",
       MODERATED: "コメントがレビュー用に送信されました。承認されると、このコメントが使用可能になります。 ",
       ERROR: {
         SAVE: {
           DEFAULT: "コメントを保存できませんでした。後でもう一度実行してください。",
           UNAUTHENTICATED: "セッションがタイムアウトになりました。 コメントを保存するには、再度ログインする必要があります。",
           NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、コメントを保存できませんでした。",
           ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、コメントを保存できませんでした。"
         },
         DELETE: {
           DEFAULT: "コメントを削除できませんでした。 後でもう一度実行してください。",
           UNAUTHENTICATED: "セッションがタイムアウトになりました。 コメントを削除するには、再度ログインする必要があります。",
           NOT_FOUND: "ファイルが削除されたか、あなたとの共有が解除されたため、コメントを削除できませんでした。",
           ACCESS_DENIED: "ファイルが削除されたか、あなたとの共有が解除されたため、コメントを削除できませんでした。"
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "保存",
       EDIT_TAGS: "タグの編集",
       ERROR: {
         SAVE: {
           DEFAULT: "タグを作成できませんでした。 後でもう一度実行してください。"
         },
         DELETE: {
           DEFAULT: "タグを削除できませんでした。 後でもう一度実行してください。"
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "続きを読む...",
       READ_LESS: "続きを非表示..."
     },
     SHARE: {
	     EVERYONE: "自分の組織内のすべてのユーザー",
	     ADD_TOOLTIP: "保存",
	     ROLES: {
	       OWNER: "所有者",
	       EDIT: "編集者",
	       VIEW: "読者",
	       FOLDER: "フォルダーに共有"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "所有者"
	       },
	       EDIT: {
	         ROLE: "編集",
           ADD: "編集者の追加"
	       },
	       VIEW: {
	         ROLE: "読者",
           ADD: "読者の追加"
	       },
	       FOLDER: {
           ADD: "フォルダーの追加",
           COMMUNITY_ADD: "フォルダーに追加",
           MOVE: "フォルダーに移動"
	       },
	       MULTI: {
	         ADD: "ユーザーまたはコミュニティーの追加",
	         ADD_PEOPLE: "ユーザーの追加"
	       }
	     },
	     PUBLIC: {
	        SHORT: "自分の組織内のすべてのユーザー",
	        LONG: {
	           GENERIC: "自分の組織内のすべてのユーザー。",
	           ORG: "${org} のすべてのユーザー。"
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "このファイルは既にユーザー ${user} に共有されています。",
	       ERROR: "現在、ユーザー ${user} に共有できません。",
	       SELF: "自分自身に共有することはできません。"
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} は、より高い共有役割にレベル上げされました。"
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "${user} への共有が成功しました"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "オプション・メッセージ..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "外部ユーザーのプロビジョン",
            ACTION: "外部ユーザーのプロビジョン...",
            TOOLTIP: "外部ユーザーのプロビジョン",
            DIALOG_TITLE: "コンテンツは共有されませんでした",
            PROMPT: {
              NO_ACCOUNT: "次のユーザーはアカウントを持っていないため、コンテンツはこれらのユーザーに共有されませんでした。",
              INVITE: "これらのユーザーとコンテンツを共有するには、ゲストとして招待してください。"
            },
            SUBMIT: "招待の開始",
            CANCEL: "キャンセル",
            ERROR: "アカウントをプロビジョニング中にエラーが発生しました。 後でもう一度実行してください。",
            SUCCESS: "ユーザー・アカウントが正常にプロビジョニングされました。"
	       },
	       PLURAL: {
	         NAME: "外部ユーザーのプロビジョン",
	         ACTION: "外部ユーザーのプロビジョン...",
	         TOOLTIP: "外部ユーザーのプロビジョン",
	         DIALOG_TITLE: "コンテンツは共有されませんでした",
	         PROMPT: {
	           NO_ACCOUNT: "次のユーザーはアカウントを持っていないため、コンテンツはこれらのユーザーに共有されませんでした。",
	           INVITE: "これらのユーザーとコンテンツを共有するには、ゲストとして招待してください。"
	         },
	         SUBMIT: "招待の開始",
	         CANCEL: "キャンセル",
	         ERROR: "アカウントをプロビジョニング中にエラーが発生しました。 後でもう一度実行してください。",
	         SUCCESS: "ユーザー・アカウントが正常にプロビジョニングされました。"
	       },
	       ABSTRACT: {
	         NAME: "外部ユーザーのプロビジョン",
            ACTION: "外部ユーザーのプロビジョン...",
            TOOLTIP: "外部ユーザーのプロビジョン",
            DIALOG_TITLE: "コンテンツは共有されませんでした",
            PROMPT: {
              NO_ACCOUNT: "一部のユーザーがアカウントを持っていないため、コンテンツはこれらのユーザーに共有されませんでした。",
              INVITE: "これらのユーザーとコンテンツを共有するには、ゲストとして招待してください。"
            },
            SUBMIT: "招待の開始",
            CANCEL: "キャンセル",
            ERROR: "アカウントをプロビジョニング中にエラーが発生しました。 後でもう一度実行してください。",
            SUCCESS: "ユーザー・アカウントが正常にプロビジョニングされました。"
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "共有オプション",
         PROPAGATION: "このファイルの共有を他のユーザーに許可する",
         EVERYONE: "誰でもこのファイルを共有できます。",
         OWNER_ONLY: "このファイルを共有できるのは所有者のみです。",
         STOP_SHARE: "共有の停止",
         MAKE_INTERNAL: "外部との共有を停止",
         MAKE_INTERNAL_SUCCESS: "このファイルは今後、組織外部のユーザーに共有することはできません。",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "内部に設定しますか?",
           PROMPT: "このファイルを内部に設定すると、組織外部のユーザーに共有できなくなります。 ${br}${br}" +
             "外部ユーザー、外部コミュニティー、外部フォルダーとの共有は解除されます。${br}${br}ファイルをいったん内部にすると、元に戻すことはできません。"
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "ファイルの共有を停止",
           PROMPT: "このファイルの共有を停止しますか?",
           QUESTION_PUBLIC: "このファイルは組織のメンバーから閲覧できなくなり、ユーザー、フォルダー、コミュニティーに共有されなくなります。 この操作を元に戻すことはできません。",
           QUESTION_PUBLIC_E: "このファイルは組織のメンバーから閲覧できなくなり、ユーザーまたはフォルダーに共有されなくなります。 この操作を元に戻すことはできません。",
           QUESTION: "このファイルはユーザーまたはコミュニティーに共有されなくなり、非公開フォルダーを除くすべてのフォルダーから削除されます。 このアクションを元に戻すことはできません。",
           QUESTION_E: "このファイルはユーザーに共有されなくなり、非公開フォルダーを除くすべてのフォルダーから削除されます。 このアクションを元に戻すことはできません。"
         },
         MAKE_PRIVATE_SUCCESS: "このファイルは非公開になりました。",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "ファイルの共有を停止できません。 後でもう一度実行してください。"
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "自分の共有"
	   },
	   STREAM: {
	     LOADING: "ロード中...",
	     LOAD_MORE: "さらにロード..."
	   },
	   ENTRY: {
	     REMOVE: "削除",
	     RESTORE: "復元",
	     EDIT: "編集",
	     DELETE: "削除",
	     OK: "OK",
	     CANCEL: "キャンセル",
	     USER_PICTURE: "${0} の写真",
	     FLAG: "不適切フラグを立てる"
	   },
	   PANEL: {
	     LOAD_ERROR: "このファイルのメタデータにアクセスしようとしてエラーが発生しました。",
	     ABOUT: {
	       TITLE: "詳細情報",
	       EXPAND_BUTTON: "このボタンを展開すると詳細情報が表示されます",
	       CURRENT_VERSION_HEADER: "現在のバージョン ${versionNumber}",
	       FILE_SIZE_HEADER: "ファイル・サイズ",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - 現在のバージョン",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - すべてのバージョン",
	       DOCS_DRAFT_UPDATED_HEADER: "ドラフトが編集済み",
	       DOCS_DRAFT_CREATED_HEADER: "ドラフト作成済み",
	       DOCS_UPDATED_HEADER: "公開済み",
	       DOCS_CREATED_HEADER: "作成日時",
	       UPDATED_HEADER: "最終更新日時",
	       CREATED_HEADER: "作成日時",
	       LIKES_HEADER: "いいね",
	       LIKES_EXPAND_ICON: "このアイコンを展開すると、ファイルに「いいね」と言っているユーザーが表示されます",
	       DOWNLOADS_HEADER: "ダウンロード",
	       DOWNLOADS_HEADER_MORE: "ダウンロード (${0})",
	       DOWNLOADS_EXPAND_ICON: "このアイコンを展開すると、ファイルをダウンロードしたユーザーが表示されます",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} 匿名",
	       DOWNLOADS_LATEST_VERSION: "このファイルは最新バージョンです",
	       DOWNLOADS_LAST_VERSION: "最終ダウンロードしたこのファイルのバージョンは ${0} です",
	       TAGS_HEADER: "タグ",
	       DESCRIPTION_HEADER: "説明",
	       DESCRIPTION_READ_MORE: "続きを読む...",
	       LINKS_HEADER: "リンク",
	       SECURITY: "セキュリティー",
	       FILE_ENCRYPTED: "ファイル・コンテンツが暗号化されています。暗号化されたファイル・コンテンツは検索できません。ファイル・コンテンツは、HCL Docs では表示および編集できません。",
	       GET_LINKS: "リンクの取得...",
	       ADD_DESCRIPTION: "説明の追加",
	       NO_DESCRIPTION: "説明なし",
	       ADD_TAGS: "タグの追加",
	       NO_TAGS: "タグがありません"
	     },
	     COMMENTS: {
	       TITLE: "コメント",
	       TITLE_WITH_COUNT: "コメント (${0})",
	       VERSION: "バージョン ${0}",
	       FEED_LINK: "これらのコメントのフィード",
	       FEED_TITLE: "フィード・リーダーで追加/変更コメントをフォローします"
	     },
	     SHARING: {
	       TITLE: "共有",
	       TITLE_WITH_COUNT: "共有先 (${0})",
	       SHARED_WITH_FOLDERS: "フォルダーに共有 - ${count}",
	       SEE_WHO_HAS_SHARED: "共有しているユーザーの表示",
           COMMUNITY_FILE: "コミュニティーが所有するファイルは、ユーザーや他のコミュニティーに共有できません。",
           SHARED_WITH_COMMUNITY: "コミュニティー '${0}' のメンバーに共有されています",
           LOGIN: "ログイン",
           NO_SHARE: "このファイルはまだどのフォルダーにも追加されていません。",
           ONE_SHARE: "このファイルは、アクセス権のない 1 個のフォルダーまたはコミュニティー内に存在します。",
           MULTIPLE_SHARE: "このファイルは、アクセス権のない ${fileNumber} 個のフォルダーまたはコミュニティー内に存在します。"
	     },
	     VERSIONS: {
	       TITLE: "バージョン",
	       TITLE_WITH_COUNT: "バージョン (${0})",
	       FEED_LINK: "これらのバージョンのフィード",
	       FEED_TITLE: "フィード・リーダーでこのファイルに対する変更内容をフォローします"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "アクションの確認",
       DIALOG_TITLE: "確認",
       PROMPT: "このアクションを実行しますか?",
       ERROR: "アクションの実行中にエラーが発生しました。 後でもう一度実行してください。",
       TOOLTIP: "アクションの実行",
       OK: "OK",
       CANCEL: "キャンセル",
       A11Y: "このボタンをクリックすると、現在のアクションが実行されます。"
     },
     THUMBNAIL: {
       TITLE: "サムネール",
       CHANGE_LINK: "サムネールの変更...",
       ERROR: "サムネールを保存できませんでした。 後でもう一度実行してください。",
       EXT_ERROR: "次のいずれかのサポートされた拡張子を持つファイルを選択してください: ${0}",
       SUCCESS: "サムネールが変更されました",
       UPLOAD: "保存",
       CANCEL: "キャンセル"
     },
     UPLOAD_VERSION: {
       LINK: "新規バージョンのアップロード...",
       CHANGE_SUMMARY: "変更の要約 (オプション)...",
       ERROR: "新バージョンを保存できませんでした。 後でもう一度実行してください。",
       SUCCESS: "新バージョンを保存しました。",
       UPLOAD: "アップロード",
       UPLOAD_AND_CHANGE_EXTENSION: "アップロードして拡張子を変更",
       CANCEL: "キャンセル"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "ファイルへのアクセス時にエラーが発生しました。 後でもう一度実行してください。",
       UNAUTHENTICATED: "セッションがタイムアウトになりました。 ファイルを表示するには、再度ログインする必要があります。",
       NOT_FOUND: "要求したファイルは削除または移動されました。 このリンクが他のユーザーから送信されたものである場合は、このリンクが正しいかどうかを確認してください。",
       ACCESS_DENIED: "このファイルを表示するための許可がありません。 このファイルはあなたに共有されていません。",
       ACCESS_DENIED_ANON: "このファイルを表示するための許可がありません。 これが自分のファイルであるか自分に共有されたファイルである場合、まずログインする必要があります。"
     },
     LOAD_ERROR: {
       DEFAULT: "リンクにアクセスしようとしてエラーが発生しました。",
       ACCESS_DENIED: "ファイルの所有者に連絡して、このファイルを閲覧するための許可を要求してください。"
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - ファイル",
       LOAD_ERROR: "ファイルへのアクセス時のエラー"
     }
  },

   "pt-br": true,
    "ca": true,
    "cs": true,
    "da": true,
    "nl": true,
    "fi": true,
    "fr": true,
    "de": true,
    "el": true,
    "hu": true,
    "pt": true,
    "it": true,
    "ja": true,
    "ko": true,
    "no": true,
    "pl": true,
    "ru": true,
    "zh": true,
    "sl": true,
    "es": true,
    "sv": true,
    "th": true,
    "zh-tw": true,
    "tr": true
});
