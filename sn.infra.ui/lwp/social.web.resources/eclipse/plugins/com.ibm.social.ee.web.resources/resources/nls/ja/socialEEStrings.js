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
/* The placeholders for date formatting strings are as follows:
   ${EEEE} is day of the week (e.g. Monday)
   ${MMM} is the month in short notation (e.g. Jan, Feb)
   ${time} is time (e.g. 6:00 PM)
   ${d} is numerical day of the month (e.g 15)
   ${YYYY} is year (e.g. 2012)
*/
({
   common: {
      more: {
         label: "詳細",
         tooltip: "他のアクション"
       },
       tags_more: "さらに ${0} 個",
       ERROR_ALT: "エラー",
       PERSON_TITLE: "${user} のプロフィールを開きます。",
       inactiveUser: "${user} (非アクティブ)",
       inactiveIndicator: "(非アクティブ)",
       like_error: "「いいね」を保存できませんでした。 後でもう一度実行してください。",
       vote_error: "投票を保存できませんでした。 後でもう一度実行してください。"
   },
   generic: {
      untitled: "(タイトルなし)",
      tags: "タグ:",
      tags_more: "さらに ${0} 個",
      likes: "いいね",
      comments: "コメント",
      titleTooltip: "${app} に移動します",
      error: "データを取得できません。",
      timestamp: {
         created: {
            DAY: "${EEEE} の ${time} に作成しました",
            MONTH: "${MMM} 月 ${d} 日に作成しました",
            TODAY: "今日の ${time} に作成しました",
            YEAR: "${YYYY} 年 ${MMM} 月 ${d} 日に作成しました",
            YESTERDAY: "昨日の ${time} に作成しました",
            TOMORROW: "${YYYY} 年 ${MMM} 月 ${d} 日に作成しました"
         },
         updated: {
            DAY: "${EEEE} の ${time} に更新しました",
            MONTH: "${MMM} ${d} 日に更新しました",
            TODAY: "今日の ${time} に更新しました",
            YEAR: "${YYYY} 年 ${MMM} 月 ${d} 日に更新しました",
            YESTERDAY: "昨日の ${time} に更新しました",
            TOMORROW: "${YYYY} 年 ${MMM} 月 ${d} 日に更新しました"
         }
      },
      visibility: {
         pub: "公開",
         priv: "非公開"
      },
      action: {
         created: "作成日時",
         updated: "最終更新日時"
      }
   },
   network : {
      friendsInviteUpdatesDescription: "フォローすると、そのユーザーの更新情報をホーム・ページやメール要約で受け取れるようになります。",
      profile_title: "${user} のプロフィールを開きます。",
      profile_a11y: "このリンクをアクティブにすると、${user} のプロフィールが新しいウィンドウで開きます。",
      error: "エラーが発生しました。  ${again}.",
      error_again: "もう一度実行してください",
      error_404: "ネットワーク・リクエストが存在しません。",
      warning: "警告",
      messages: {
         success: {
            accept: {
            	nofollow: "あなたがネットワーク連絡先に加わりました。",
            	follow: "あなたが ${user} さんのネットワークに加わり、フォローも開始しました。"
            },
            ignore: {
            	nofollow: "招待を辞退しました。",
            	follow: "招待を辞退しましたが、${user} さんをフォローしました。"
            }
         },
         error: {
            accept: "リクエストを受け入れているときにエラーが発生しました。",
            ignore: "リクエストを辞退しているときにエラーが発生しました。"
         }
      },
      timestamp: {
          created: {
              DAY: "${EEEE} の ${time}",
              MONTH: "${MMM} ${d} 日",
              TODAY: "今日の ${time}",
              YEAR: "${YYYY} 年 ${MMM} ${d} 日",
              YESTERDAY: "昨日の ${time}",
              TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
           }
      }
   },
   file: {
      a11y_help: "このリンクをアクティブにすると、${name} が新しいウィンドウで開きます。",
      tooltip: "ファイル・アプリケーションで ${name} を開きます",
      profile_title: "${user} のプロフィールを開きます。",
      profile_a11y: "このリンクをアクティブにすると、${user} のプロフィールが新しいウィンドウで開きます。",
      download_tooltip: "このファイルのダウンロード (${0})",
      following: {
         add: "ファイルのフォロー",
         remove: "フォローの停止",
         title: "このファイルに関する更新を受け取るかどうかを切り替えます"
      },
      share: {
         label: "共有",
         title: "このファイルへのアクセス権を他のユーザーに付与します"
      },
      timestamp: {
         created: {
            DAY: "${EEEE} の ${time} に作成しました",
            MONTH: "${MMM} 月 ${d} 日に作成しました",
            TODAY: "今日の ${time} に作成しました",
            YEAR: "${YYYY} 年 ${MMM} 月 ${d} 日に作成しました",
            YESTERDAY: "昨日の ${time} に作成しました",
            TOMORROW: "${YYYY} 年 ${MMM} 月 ${d} 日に作成しました"
         },
         createdOther: {
            DAY: "${user} が ${EEEE} の ${time} に作成しました",
            MONTH: "${user} が ${MMM} ${d} 日に作成しました",
            TODAY: "${user} が今日の ${time} に作成しました",
            YEAR: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に作成しました",
            YESTERDAY: "${user} が昨日の ${time} に作成しました",
            TOMORROW: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に作成しました"
         },
         updated: {
            DAY: "${EEEE} の ${time} に更新しました",
            MONTH: "${MMM} ${d} 日に更新しました",
            TODAY: "今日の ${time} に更新しました",
            YEAR: "${YYYY} 年 ${MMM} 月 ${d} 日に更新しました",
            YESTERDAY: "昨日の ${time} に更新しました",
            TOMORROW: "${YYYY} 年 ${MMM} 月 ${d} 日に更新しました"
         },
         updatedOther: {
            DAY: "${user} が ${EEEE} の ${time} に更新しました",
            MONTH: "${user} が ${MMM} ${d} 日に更新しました",
            TODAY: "${user} が今日の ${time} に更新しました",
            YEAR: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に更新しました",
            YESTERDAY: "${user} が昨日の ${time} に更新しました",
            TOMORROW: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に更新しました"
         },
         createdCompact: {
            DAY: "作成: ${EEEE} の ${time}",
            MONTH: "作成: ${MMM} ${d} 日",
            TODAY: "作成: 今日の ${time}",
            YEAR: "作成: ${YYYY} 年 ${MMM} 月 ${d} 日",
            YESTERDAY: "作成: 昨日の ${time}",
            TOMORROW: "作成: ${YYYY} 年 ${MMM} 月 ${d} 日"
         },
         updatedCompact: {
            DAY: "更新日時: ${EEEE} の ${time}",
            MONTH: "更新日時: ${MMM} ${d} 日",
            TODAY: "更新日時: 今日の ${time}",
            YEAR: "更新日時: ${YYYY} 年 ${MMM} 月 ${d} 日",
            YESTERDAY: "更新日時: 昨日の ${time}",
            TOMORROW: "更新日時: ${YYYY} 年 ${MMM} 月 ${d} 日"
         }
      },
      about: {
         CREATE_TIMESTAMP: "${date_long} ${time_long} 更新者 ${user}",
         UPDATE_TIMESTAMP: "${date_long} ${time_long} 更新者 ${user}",
         ANYUPDATE_TIMESTAMP: "${date_long} ${time_long}"
      },
      download: {
      	 TOOLTIP: "このファイルのダウンロード (${size})",
      	 DOWNLOAD_ALT: "ダウンロード"
      },

      PREVIEW: {
         LINK: "プレビュー",
         TITLE: "このファイルを新規ウィンドウでプレビューします。"
      },
      TAGS: "タグ:",
      error: "エラーが発生しました。  ${again}.",
      error_again: "もう一度実行してください",
      error_404: "ファイルが存在しないか、ファイルにアクセスするために必要な許可がありません。",
      error_403: "このファイルを表示するための許可がありません。 このファイルは公開されていないか、あなたに共有されていません。",
      notifications: {
         USER_SHARED: "${user} の書き込み:",
         CHANGE_SUMMARY: "${user} が変更の要約を入力しました",
         NO_CHANGE_SUMMARY: "${user} が変更の要約を入力しませんでした",
         COMMENTED: "${user} がコメントしました"
      }
   },
   ecm_file: {
      checkedout_you: "自分がチェックアウト",
      checkedout_other: "${user} がチェックアウトしています",
      tooltip: "ライブラリーの ${name} ファイルを開きます",
      draft_404_info: "このドラフトは既に削除されたか、あなたとの共有が解除されました。 現在公開されているバージョンはこのファイルの最新バージョンです。",
      error_404: "このファイルは削除されたか、あなたとの共有が解除されました。",
      error_403: "このファイルは削除されたか、あなたとの共有が解除されました。",
      error_preview: "ファイルはもうプレビューできなくなっています。",
      draft_review_canceled: "レビューがキャンセルされたため、このドラフトはもうあなたに共有されていません。 あなたのレビューはもう必要なくなりました。",
      switch_ee: "ドラフトの表示",
      switch_ee_tooltip: "このファイルの最新のドラフトの表示"
   },
   ecm_draft: {
      tooltip: "ライブラリーの ${name} ドラフトを開きます",
      community_owners: "コミュニティー所有者",
      draft: "ドラフト",
      draft_tooltip: "ドラフトの表示",
      draft_general_info: "以前のドラフトは存在せず、新しいドラフトが最新バージョンになっています。",
      draft_review_404_general_info: "レビューアーの 1 人が既に投票済みです。 あなたは、このドラフトをレビューする必要はありません。",
      draft_review_404_request_info: "以前のドラフトは存在せず、最新のドラフトがレビュー用に送信されました。 あなたのレビューは必須です。",
      draft_review_404_require_info: "以前のドラフトは存在せず、最新のドラフトがレビュー用に送信されました。 あなたのレビューは必須です。",
      draft_review_request_info: "あなたのレビューは必須です。",
      draft_review_require_info: "あなたのレビューは必須です。",
      error_404: "このドラフトは既に削除されたか、あなたとの共有が解除されました。",
      error_403: "このドラフトはあなたに共有されていないため、表示できません。",
      error_preview: "ドラフトはもうプレビューできなくなっています。",
      switch_ee: "公開バージョンの表示",
      switch_ee_tooltip: "この文書の公開バージョンの表示",
      review: "レビュー",
      reviewers: "レビューアー",
      reviwers_addtl: "追加のレビューアー",
      in_review: "レビュー中のドラフト",
      in_review_tooltip: "レビュー中のドラフトの表示",
      review_required_any: "コミュニティー所有者が、レビューアーの 1 人にこのドラフトのレビューを要求しています。",
      review_required_all: "コミュニティー所有者が、レビューアー全員にこのドラフトのレビューを要求しています。",
      review_required_generic: "コミュニティー所有者が、それらのレビューアーにこのドラフトのレビューを要求しています。",
      review_additional_required: "ドラフト送信者によって追加されたレビューアー全員が、このドラフトをレビューする必要があります。",
      reivew_submitted_date: {
         DAY: "${user} が ${EEEE} の ${time} にドラフトをレビュー用に送信しました。",
         MONTH: "${user} が ${MMM} 月 ${d} 日にドラフトをレビュー用に送信しました。",
         TODAY: "${user} が今日の ${time} にドラフトをレビュー用に送信しました。",
         YEAR: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日にドラフトをレビュー用に送信しました。",
         YESTERDAY: "${user} が昨日の ${time} にドラフトをレビュー用に送信しました。",
         TOMORROW: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日にドラフトをレビュー用に送信しました。"
      },
      pending: "保留",
      pending_rejected: "ドラフトが拒否されたため、レビューする必要はありません",
      approve: "承認",
      approved: "承認",
      approve_tooltip: "このドラフトを承認",
      accept_success: "このドラフトを承認しました。",
      accept_error: "このドラフトを承認中にエラーが発生しました。 もう一度実行してください。",
      accept_info: "このドラフトを承認しました。",
      reject: "拒否",
      rejected: "拒否済み",
      reject_tooltip: "このドラフトを拒否",
      reject_success: "このドラフトを拒否しました。",
      reject_error: "このドラフトを拒否中にエラーが発生しました。 もう一度実行してください。",
      reject_info: "このドラフトを拒否しました。"
   },
   authUser: {
      error: "現在のユーザーの取得中にエラーが発生しました。  ${again}.",
      error_again: "もう一度実行してください",
      error_404: "認証済みユーザーを検出できません。",
      error_403: "ユーザー情報を取得する許可がありません。"
   },
   forum: {
      error: "エラーが発生しました。  ${again}.",
      error_again: "もう一度実行してください",
      error_404: "フォーラムが存在しないか、フォーラムにアクセスするために必要な許可がありません。",
      error_403: "このフォーラムを表示するための許可がありません。 このフォーラムは公開されていないか、あなたに共有されていません。",

      readMore: "トピック全体の表示...",
      readMore_tooltip: "${name} フォーラム・トピックを開きます。",
      readMore_a11y: "このリンクをアクティブにすると、${name} フォーラム・トピックが新しいウィンドウで開きます。",
      QUESTION_ANSWERED: "この質問は回答済みです。",
      QUESTION_NOT_ANSWERED: "この質問にはまだ回答がありません。",

      attachments: "${count} 添付ファイル",
      attachments_one: "${count} 添付ファイル"
   },
   blog: {
      error: "エラーが発生しました。  ${again}.",
      error_again: "もう一度実行してください",
      error_404: "ブログが存在しないか、ブログにアクセスするために必要な許可がありません。",
      error_403: "このブログを表示するための許可がありません。このブログは公開されていないか、あなたに共有されていません。",
      readMore: " 続きを読む ...",
      readMore_tooltip: "${name} ブログ・エントリーを開きます。",
      readMore_a11y: "このリンクをアクティブにすると、${name} ブログ・エントリーが新しいウィンドウで開きます。",
      graduated: "投票終了",
  	  vote: {
  		  INLINE: {
  				UNRECOMMENDED: {
  					READONLYTEXT: "",
  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>投票</a>",
  					TOOLTIP: 	"これに投票する"
  				},

  				RECOMMENDED: {
  					READONLYTEXT: "<span class='lotusLikeDescription'>投票済みです</span>",
  					TEXT: 		"<span class='lotusLikeDescription'>投票済み</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='投票済み - 取り消す' href='javascript:;' id='TOGGLE_${id}'>取り消す</a>",
  					TOOLTIP: 	"これへの投票を取り消す"
  				},

  				RECOMMENDED_BYNONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"0 人のユーザーがこれに投票しました"
  				},

  				RECOMMENDED_BYONE:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"1 人のユーザーがこれに投票しました"
  				},

  				RECOMMENDED_BYMANY:  {
  					READONLYTEXT: "${recommendCount}",
  					TEXT: 		"${recommendCount}",
  					TOOLTIP: 	"${recommendCount} 人のユーザーがこれに投票しました"
  				}
  			},
  			LOADING: "ロード中...",
  			TEMPLATE_STRINGS: {
  				LIKES: "投票済みです"
  			}
  		}
   },
   idea: {
	  error_404: "投票制限に達したか、アイデアが使用可能ではなくなったため、あなたの投票を保存できませんでした。",
      readMore_tooltip: "${name} アイデアを開きます。",
      readMore_a11y: "このリンクをアクティブにすると、${name} アイデアが新しいウィンドウで開きます。"
   },
   size: {
      B: "${0} B",
      KB: "${0} KB",
      MB: "${0} MB",
      GB: "${0} GB"
   },
   REPLIES: {
      ARIA_LABEL: "返信",
      THIS_ARIA_LABEL: "この返信",
      THIS_TAB_TITLE: "この返信",
      TAB_TITLE: "返信 (${0})",
      REPLY_TO_REPLY: "これは、${thisReply}に対する返答です",
      REPLY_TO_TOPIC: "これは、${thisTopic}に対する返答です",
      THIS_TOPIC: "このトピック",
      THIS_REPLY: "この返信",
      NAVIGATE_TO_REPLY: "親の返信に移動",
      NAVIGATE_TO_TOPIC: "親のトピックに移動",
      ADD_COMMENT: "このトピックに返信",
      ADD_COMMENT_TOOLTIP: "このフォーラム・トピックに返信",
      SHOWING_RECENT_REPLIES: "最新の ${0} 件の返信を表示",
      PREV_COMMENTS: "他の返信を表示",
      PLACEHOLDER_TXT: "このトピックに返信",
      EMPTY: "返信はありません。",
      TRIM_LONG_COMMENT: "返信を短縮しますか?",
      WARN_LONG_COMMENT: "返信が長すぎます。  ${shorten}",
      ERROR: "返信の取得中にエラーが発生しました。 ${again}",
      ERROR_CREATE: "返信を保存できませんでした。  後でもう一度実行してください。",
      ERROR_CREATE_NOT_FOUND: "トピックが既に削除されたか閲覧できなくなっているため、返信を保存できませんでした。",
      ERROR_CREATE_ACCESS_DENIED: "トピックが既に削除されたか閲覧できなくなっているため、返信を保存できませんでした。",
      ERROR_CREATE_TIMEOUT: "サーバーに接続できなかったため、返信を保存できませんでした。  「保存」をクリックしてもう一度実行してください。",
      ERROR_CREATE_CANCEL: "要求がキャンセルされたため、返信を保存できませんでした。  「保存」をクリックしてもう一度実行してください。",
      ERROR_CREATE_NOT_LOGGED_IN: "この返信を作成するには、ログインする必要があります。  「保存」をクリックするとログイン用のプロンプトが出ます。",
      ERROR_NO_CONTENT: "返信を入力し、「保存」をクリックします。  返信しないことにした場合は「キャンセル」をクリックしてください。",
      ERROR_UNAUTHORIZED: "返信をする権限がないため、返信を保存できませんでした。",
      COMMENT_DELETED: {
         DAY: "返信を ${user} が ${EEEE} の ${time} に削除しました",
         MONTH: "返信を ${user} が ${MMM} ${d} 日に削除しました",
         TODAY: "返信を ${user} が今日の ${time} に削除しました",
         YEAR: "返信を ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に削除しました",
         YESTERDAY: "返信を ${user} が昨日の ${time} に削除しました",
         TOMORROW: "返信を ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に削除しました"
      },
      REASON_FOR_DELETION: "削除の理由: ${reason}",
      REPLY_TITLE: "Re: ${0}",
      SHOW_FULL_REPLY: "返信全体の表示",
      SHOW_FULL_REPLY_TOOLTIP: "フォーラム・トピック内の元の返信に移動します",
      REPLY_ACTION: "返信",
      REPLY_ACTION_TOOLTIP: "この投稿に返信します",
      MODERATION_PENDING: "この返信はレビュー待ちになっています",
      MODERATION_QUARANTINED: "投稿はモデレーターによって隔離されました。",
      MODERATION_REMOVED: {
         DAY: "この返信を ${user} が ${EEEE} の ${time} に削除しました。",
         MONTH: "この返信を ${user} が ${MMM} ${d} 日に削除しました。",
         TODAY: "この返信を ${user} が今日の ${time} に削除しました。",
         YEAR: "この返信を ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に削除しました。",
         YESTERDAY: "この返信を ${user} が昨日の ${time} に削除しました。",
         TOMORROW: "この返信を ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に削除しました。"
      },
      MODERATION_REJECTED: {
         DAY: "この返信を ${user} が ${EEEE} の ${time} に拒否しました。",
         MONTH: "この返信を ${user} が ${MMM} ${d} 日に拒否しました。",
         TODAY: "この返信を ${user} が今日の ${time} に拒否しました。",
         YEAR: "この返信を ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に拒否しました。",
         YESTERDAY: "この返信を ${user} が昨日の ${time} に拒否しました。",
         TOMORROW: "この返信を ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に拒否しました。"
      }
   },
   REPLIES_SUBMITTED: {
      CONFIRM: "返信がレビュー用に送信されました。承認されると、このコメントが使用可能になります。"
   },
   COMMENTS: {
      ARIA_LABEL: "コメント",
      PLACEHOLDER_TXT: "コメントの追加",
      TAB_TITLE: "コメント (${0})",
      ACTION_NOT_SUPPORTED: "サポートされないアクション",
      ADD_COMMENT: "コメントの追加",
      ADD_COMMENT_TOOLTIP: "コメントをこの項目に追加します",
      CANCEL: "キャンセル",
      COMMENT_COUNT_ONE: "${0} 件のコメント",
      COMMENT_COUNT_MANY: "${0} 件のコメント",
      COMMENT_LABEL: "コメント:",
      DELETE: "削除",
      DELETE_TOOLTIP: "コメントの削除",
      DELETEREASON: "このコメントを削除する理由:",
      DIALOG_TITLE: "コメントの短縮",
      TOOLTIP: "コメントの短縮",
      NAME: "コメントの短縮",
      EDIT: "編集",
      EDIT_TOOLTIP: "コメントの編集",
      ERROR_CREATE: "コメントを保存できませんでした。  後でもう一度実行してください。",
      ERROR_CREATE_NOT_FOUND: "項目が既に削除されたか、閲覧できなくなっているため、コメントを保存できませんでした。",
      ERROR_CREATE_ACCESS_DENIED: "項目が既に削除されたか、閲覧できなくなっているため、コメントを保存できませんでした。",
      ERROR_CREATE_TIMEOUT: "サーバーに接続できなかったため、コメントを保存できませんでした。  「投稿」をクリックしてもう一度実行してください。",
      ERROR_CREATE_CANCEL: "要求がキャンセルされたため、コメントを保存できませんでした。  「投稿」をクリックしてもう一度実行してください。",
      ERROR_CREATE_NOT_LOGGED_IN: "このコメントを作成するには、ログインする必要があります。  「投稿」をクリックするとログイン用のプロンプトが出ます。",
      ERROR_DELETE: "コメントを削除できませんでした。  後でもう一度実行してください。",
      ERROR_DELETE_TIMEOUT: "サーバーに接続できなかったため、コメントを削除できませんでした。  「削除」をクリックしてもう一度実行してください。",
      ERROR_DELETE_NOT_FOUND: "コメントまたは項目が既に削除されたか閲覧できなくなっているため、コメントを削除できませんでした。",
      ERROR_DELETE_ACCESS_DENIED: "項目が既に削除されたか、閲覧できなくなっているため、コメントを削除できませんでした。",
      ERROR_DELETE_CANCEL: "要求がキャンセルされたため、コメントを削除できませんでした。  「削除」をクリックしてもう一度実行してください。",
      ERROR_DELETE_NOT_LOGGED_IN: "このコメントを削除するには、ログインする必要があります。  「削除」をクリックするとログイン用のプロンプトが出ます。",
      ERROR_EDIT: "コメントを更新できませんでした。  後でもう一度実行してください。",
      ERROR_EDIT_ACCESS_DENIED: "項目が既に削除されたか、閲覧できなくなっているため、コメントを更新できませんでした。",
      ERROR_EDIT_NOT_FOUND: "項目が既に削除されたか、閲覧できなくなっているため、コメントを更新できませんでした。",
      ERROR_EDIT_TIMEOUT: "サーバーに接続できなかったため、コメントを更新できませんでした。  「投稿」をクリックしてもう一度実行してください。",
      ERROR_EDIT_CANCEL: "要求がキャンセルされたため、コメントを更新できませんでした。  「投稿」をクリックしてもう一度実行してください。",
      ERROR_EDIT_NOT_LOGGED_IN: "このコメントを編集するには、ログインする必要があります。  「投稿」をクリックするとログイン用のプロンプトが出ます。",
      ERROR_NO_CONTENT: "コメントを入力して「投稿」をクリックしてください。  コメントを残さない場合は「キャンセル」をクリックしてください。",
      ERROR_NO_CONTENT_EDIT: "コメントを入力して「投稿」をクリックしてください。  コメントを編集しない場合は「キャンセル」をクリックしてください。",
      ERROR_UNAUTHORIZED: "コメントを残す権限がないため、コメントを保存できませんでした。",
      ERROR_GENERAL: "エラーが発生しました。",
      OK: "OK",
      YES: "はい",
      TRIM_LONG_COMMENT: "コメントを短縮しますか?",
      WARN_LONG_COMMENT: "コメントが長すぎます。  ${shorten}",
      LINK: "リンク",
      SAVE: "保存",
      POST: "投稿",
      SHOWMORE: "続きを読む...",
      VIEW_COMMENTS_FILE: "このファイルのコメントを表示",
      SUBSCRIBE_TO_COMMENTS: "コメントの購読",
      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "フィード・リーダーでこれらのコメントに対する変更をフォローします",
      PROFILE_TITLE: "${user} のプロフィールを開きます。",
      PROFILE_A11Y: "このリンクをアクティブにすると、${user} のプロフィールが新しいウィンドウで開きます。",
      MODERATION_PENDING: "このコメントはレビュー待ちになっています。",
      MODERATION_REMOVED: {
         DAY: "このコメントを ${user} が ${EEEE} の ${time} に削除しました。",
         MONTH: "このコメントを ${user} が ${MMM} ${d} 日に削除しました。",
         TODAY: "このコメントを ${user} が今日の ${time} に削除しました。",
         YEAR: "このコメントを ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に削除しました。",
         YESTERDAY: "このコメントを ${user} が昨日の ${time} に削除しました。",
         TOMORROW: "このコメントを ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に削除しました。"
      },

      MODERATION_REJECTED: {
         DAY: "このコメントを ${user} が ${EEEE} の ${time} に拒否しました。",
         MONTH: "このコメントを ${user} が ${MMM} ${d} 日に拒否しました。",
         TODAY: "このコメントを ${user} が今日の ${time} に拒否しました。",
         YEAR: "このコメントを ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に拒否しました。",
         YESTERDAY: "このコメントを ${user} が昨日の ${time} に拒否しました。",
         TOMORROW: "このコメントを ${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に拒否しました。"
      },
      PREV_COMMENTS: "前のコメントを表示",
      EMPTY: "コメントがありません。",
      ERROR_ALT: "エラー",
      ERROR: "コメントの取得中にエラーが発生しました。${again}",
      ERROR_ADDTL: "追加コメントの取得中にエラーが発生しました。${again}",
      ERROR_AGAIN: "もう一度実行してください。",
      ERROR_AGAIN_TITLE: "コメントをさらに表示するには、要求を再試行してください。",
      COMMENT_CREATED: {
         DAY: "${user} ${EEEE} の ${time} (バージョン ${version})",
         MONTH: "${user} ${MMM} ${d} 日 (バージョン ${version})",
         TODAY: "${user} 今日の ${time} (バージョン ${version})",
         YEAR: "${user} ${YYYY} 年 ${MMM} 月 ${d} 日 (バージョン ${version})",
         YESTERDAY: "${user} 昨日の ${time} (バージョン ${version})",
         TOMORROW: "${user} ${YYYY} 年 ${MMM} 月 ${d} 日 (バージョン ${version})"
      },

      COMMENT_CREATED_NOVERSION: {
         DAY: "${user} ${EEEE} の ${time}",
         MONTH: "${user} ${MMM} ${d} 日",
         TODAY: "${user} 今日の ${time}",
         YEAR: "${user} ${MMM} ${d} 日, ${YYYY}",
         YESTERDAY: "${user} 昨日の ${time}",
         TOMORROW: "${user} ${MMM} ${d} 日, ${YYYY}"
      },

      COMMENT_CREATED_TIME: {
         DAY: "${EEEE} の ${time}",
         MONTH: "${MMM} ${d} 日",
         TODAY: "今日の ${time}",
         YEAR: "${YYYY} 年 ${MMM} ${d} 日",
         YESTERDAY: "昨日の ${time}",
         TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
      },

      COMMENT_DELETED: {
         DAY: "コメントを ${user} が ${EEEE} の ${time} に削除しました",
         MONTH: "コメントを ${user} が ${MMM} ${d} 日に削除しました",
         TODAY: "コメントを ${user} が今日の ${time} に削除しました",
         YEAR: "コメントを ${user} が ${MMM} ${d} 日 ${YYYY} に削除しました",
         YESTERDAY: "コメントを ${user} が昨日の ${time} に削除しました",
         TOMORROW: "コメントを ${user} が ${MMM} ${d} 日 ${YYYY} に削除しました"
      },
      COMMENT_EDITED: {
         DAY: "${user} が ${EEEE} の ${time} に編集 (バージョン ${version})",
         MONTH: "${user} が ${MMM} ${d} 日に編集 (バージョン ${version})",
         TODAY: "${user} が今日の ${time} に編集 (バージョン ${version})",
         YEAR: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に編集 (バージョン ${version})",
         YESTERDAY: "${user} が昨日の ${time} に編集 (バージョン ${version})",
         TOMORROW: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に編集 (バージョン ${version})"
      },
      COMMENT_EDITED_NOVERSION: {
         DAY: "${user} が ${EEEE} を ${time} に編集しました",
         MONTH: "${user} が ${MMM} ${d} 日に編集しました",
         TODAY: "${user} が今日の ${time} に編集しました",
         YEAR: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に編集しました",
         YESTERDAY: "${user} が昨日の ${time} に編集しました",
         TOMORROW: "${user} が ${YYYY} 年 ${MMM} 月 ${d} 日に編集しました"
      },

      DELETE_CONFIRM: "このコメントを削除しますか?",
      FLAG_ITEM: {
         BUSY: "保存中...",
         CANCEL: "キャンセル",
         ACTION: "不適切フラグを立てる",
         DESCRIPTION_LABEL: "この項目にフラグを立てる理由を入力してください (オプション)",
         EDITERROR: "エラーが原因でファイルのメタデータは編集されませんでした",
         OK: "保存",
         ERROR_SAVING: "要求の処理でエラーが発生しました。 後でもう一度実行してください。",
         SUCCESS_SAVING: "フラグが送信されました。 まもなくモデレーターによる調査が行われます。",
         TITLE: "この項目に不適切フラグを立てる",
         COMMENT: {
            TITLE: "このコメントに不適切フラグを立てる",
            A11Y: "このボタンをクリックすると、このコメントに不適切フラグを立てるためのダイアログが開きます。"
         }
      }
   },

   COMMENTS_DELETE: {
      CANCEL: "キャンセル",
      DIALOG_TITLE: "コメントの削除",
      NAME: "コメントの削除",
      OK: "OK",
      TOOLTIP: "コメントの削除"
   },

   COMMENTS_SHORTEN: {
      CANCEL: "キャンセル",
      CONFIRM: "短縮処理により、コメントの制限を超えるテキストが削除されます。  「OK」をクリックして短縮するか、「キャンセル」をクリックしてユーザー自身でコメントを編集してください。",
      DIALOG_TITLE: "コメントの短縮",
      NAME: "コメントの短縮",
      OK: "OK",
      TOOLTIP: "コメントの短縮"
   },

   COMMENTS_SUBMITTED: {
      DIALOG_TITLE: "送信確認",
      CONFIRM: "コメントがレビュー用に送信されました。承認されると、このコメントが使用可能になります。",
      OK: "OK"
   },

   DATE: {
      AM: "AM",
      FULL: "${EEEE}、${date_long} 日 ${time_long}",
      PM: "PM",
      TODAY: "今日",
      TODAY_U: "今日",
      YESTERDAY: "昨日",
      YESTERDAY_U: "昨日",

      ADDED: { DAY: "${EEee} の ${time} に追加しました",
         FULL: "${EEEE}、${date_long} 日 ${time_long}",
         MONTH: "${date_long} に追加しました",
         TODAY: "今日の ${time} に追加しました",
         YEAR: "${date_long} に追加しました",
         YESTERDAY: "昨日の ${time} に追加しました"
      },

      LAST_UPDATED: { DAY: "最終更新日時: ${EEee} の ${time}",
         FULL: "${EEEE}、${date_long} 日 ${time_long}",
         MONTH: "最終更新日時 ${date_long}",
         TODAY: "最終更新日時: 今日の ${time}",
         YEAR: "最終更新日時 ${date_long}",
         YESTERDAY: "最終更新日時: 昨日の ${time}"
      },

      MONTHS_ABBR: { 0: "1 月",
         10: "11 月",
         11: "12 月",
         1: "2 月",
         2: "3 月",
         3: "4 月",
         4: "5 月",
         5: "6 月",
         6: "7 月",
         7: "8 月",
         8: "9 月",
         9: "10 月"
      },

      COMPACT: { DAY: "${EEee}",
         FULL: "${EEEE}、${date_long} 日 ${time_long}",
         MONTH: "${date_short}",
         TODAY: "今日",
         YEAR: "${date_short}",
         YESTERDAY: "昨日",
         TOMORROW: "明日"
      },

      RELATIVE_TIME: { DAY: "${EEee} の ${time}",
         FULL: "${EEEE}、${date_long} 日 ${time_long}",
         MONTH: "${date_short}",
         TODAY: "今日の ${time}",
         YEAR: "${date_short}",
         YESTERDAY: "昨日の ${time}",
         TOMORROW: "${date_short}"
      },

      RELATIVE_TIME_LONG: { DAY: "${EEee} の ${time}",
         FULL: "${EEEE}、${date_long} 日 ${time_long}",
         MONTH: "${date_long}",
         TODAY: "今日の ${time}",
         YEAR: "${date_long}",
         YESTERDAY: "昨日の ${time}",
         TOMORROW: "${date_long}"
      },

      DATE_TIME: { DAY: "${date_short} の ${time}",
         FULL: "${EEEE}、${date_long} 日 ${time_long}",
         MONTH: "${date_short} の ${time}",
         TODAY: "${date_short} の ${time}",
         YEAR: "${date_short} の ${time}",
         YESTERDAY: "${date_short} の ${time}",
         TOMORROW: "${date_short} の ${time}"
      },

      DATE_ONLY: { DAY: "${date_short}",
         FULL: "${EEEE}、${date_long}",
         MONTH: "${date_short}",
         TODAY: "${date_short}",
         YEAR: "${date_short}",
         YESTERDAY: "${date_short}",
         TOMORROW: "${date_short}"
      },

      TIME_ONLY: { DAY: "${time}",
         FULL: "${time_long}",
         MONTH: "${time}",
         TODAY: "${time}",
         YEAR: "${time}",
         YESTERDAY: "${time}",
         TOMORROW: "${time}"
      },

      UPDATED: { DAY: "${EEee} の ${time} に更新しました",
         FULL: "${EEEE}、${date_long} 日 ${time_long}",
         MONTH: "${date_long} に更新しました",
         TODAY: "今日の ${time} に更新しました",
         YEAR: "${date_long} に更新しました",
         YESTERDAY: "昨日の ${time} に更新しました"
      }
   },
   VERSIONS: {
      ERROR: "バージョン情報をロードできません。",
      ERROR_REQUEST_CANCELLED: "要求がキャンセルされました。",
      ERROR_REQUEST_TIMEOUT: "サーバーに接続できませんでした。",
      ERROR_REQUEST_UNKNOWN: "不明なエラーが発生しました。",
      LOADING: "ロード中...",
      NO_VERSIONS: "バージョンはありません",
      INFO: "バージョン ${0}、作成日 ${1}、作成者: ",
      VERSION_NUMBER: "バージョン ${0}",
      DELETED: "削除済み",
      DELETE_ALL: "次のバージョンより前のすべてのバージョンを削除",
      DELETE_VERSION_SINGLE: "バージョン ${0} の削除",
      DELETEERROR: "エラーが原因でバージョンは削除されませんでした。",
      CREATE_VERSION: "新規バージョンの作成",
      CREATE_VERSION_TOOLTIP: "このファイルのバージョンを作成",
      REVERT_VERSION: "バージョン ${0} の復元",
      REVERT_DESCRIPTION: "バージョン ${0} から復元しました",
      PREVIOUS: "前へ",
      PREVIOUS_TOOLTIP: "前のページ",
      ELLIPSIS: "...",
      NEXT: "次へ",
      NEXT_TOOLTIP: "次のページ",
      COUNT: "${0}-${1}/${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "ページ",
      SHOW: "表示",
      ITEMS_PER_PAGE: " 個の項目をページに表示",
      DATE: {
        AM: "AM",
        RELATIVE_TIME: { DAY: "${date}",
            YEAR: "${date_long}",
            FULL: "${date_long} ${time_long}",
            MONTH: "${date}",
            TODAY: "今日の ${time}",
            YESTERDAY: "昨日の ${time}"
        },
        RELATIVE_TIME_L: { DAY: "${EEee} の ${time}",
            YEAR: "${date_short} の ${time}",
            FULL: "${EEEE}、${date_long} 日 ${time_long}",
            MONTH: "${date_short} の ${time}",
            TODAY: "今日の ${time}",
            YESTERDAY: "昨日の ${time}"
        },
        UPDATED: { DAY: "${EEee} の ${time} に更新しました",
            YEAR: "${date_short} に更新しました",
            FULL: "${EEEE}、${date_long} 日 ${time_long}",
            MONTH: "${date_short} に更新しました",
            TODAY: "今日の ${time} に更新しました",
            YESTERDAY: "昨日の ${time} に更新しました"
        }
      },
      CONTENT: {
         DELETE_TOOLTIP: "バージョン ${0} の削除",
         DOWNLOAD: "ダウンロード",
         DOWNLOAD_TOOLTIP: "このバージョンのダウンロード (${0})",
         VIEW: "表示",
         VIEW_TOOLTIP: "バージョン ${0} の表示",
         REVERT: {
            A11Y: "このボタンをクリックすると、ユーザーが以前のバージョンからのファイルの復元を確認できるダイアログが開きます。 この処置を確認すると、ページの内容が最新表示されます。",
            FULL: "復元",
            WIDGET: "このバージョンの復元"
         }
      },
      DELETE: {
         ERROR_NOT_FOUND: "このバージョンは、既に削除されたか参照できなくなっているため、削除できませんでした。",
         ERROR_ACCESS_DENIED: "編集者ではないため、このバージョンを削除できませんでした。",
         ERROR_TIMEOUT: "サーバーに接続できなかったため、このバージョンは削除されませんでした。  要求を再試行するには「削除」を再度クリックしてください。",
         ERROR_CANCEL: "要求がキャンセルされたため、このバージョンは削除されませんでした。  要求を再試行するには「削除」を再度クリックしてください。",
         ERROR_NOT_LOGGED_IN: "このバージョンを削除するには、ログインする必要があります。  「削除」をクリックするとログイン用のプロンプトが出ます。",
         GENERIC_ERROR: "不明なエラーのため、このバージョンを削除できませんでした。  要求を再試行するには「削除」を再度クリックしてください。",
         FULL: "削除",
         A11Y: "このボタンをクリックすると、ユーザーがこのバージョンの削除を確認できるダイアログが開きます。 この処置を確認すると、ページの内容が最新表示されます。"
      },

      REVERT: {
         ERROR_NOT_FOUND: "バージョンは、既に削除されたか閲覧できなくなっているため、復元できませんでした。",
         ERROR_ACCESS_DENIED: "編集者ではないため、バージョンを復元できませんでした。",
         ERROR_NAME_EXISTS: "別のファイルが同じ名前を持っているため、バージョンを復元できませんでした。",
         ERROR_TIMEOUT: "サーバーに接続できなかったため、バージョンは復元されませんでした。  要求を再試行するには「復元」を再度クリックしてください。",
         ERROR_CANCEL: "要求がキャンセルされたため、このバージョンは復元されませんでした。  要求を再試行するには「復元」を再度クリックしてください。",
         ERROR_QUOTA_VIOLATION: "スペースの制限のため、バージョンを復元できませんでした。",
         ERROR_MAX_CONTENT_SIZE: "最大ファイル・サイズ ${0} より大きいため、バージョンを復元できませんでした",
         GENERIC_ERROR: "不明なエラーのため、バージョンを復元できませんでした。  要求を再試行するには「復元」を再度クリックしてください。"
      }
   },

   DOWNLOAD_INFO: {
      SHOW_PEOPLE: "ダウンロードしたユーザーの表示...",
      PREVIOUS: "前へ",
      PREVIOUS_TOOLTIP: "前のページ",
      ELLIPSIS: "...",
      NEXT: "次へ",
      NEXT_TOOLTIP: "次のページ",
      COUNT: "${0}-${1}/${2}",
      COUNT_SHORT: "${0}-${1}",
      PAGE: "ページ",
      SHOW: "表示",
      ITEMS_PER_PAGE: " 個の項目をページに表示",
      VERSION: {
         DAY: "バージョン ${version}、日付 ${date}",
         MONTH: "バージョン ${version}、日付 ${date}",
         TODAY: "バージョン ${version}、時刻 ${time}",
         YEAR: "バージョン ${version}、日付 ${date}",
         YESTERDAY: "バージョン ${version}、昨日"
      },

      FILE: {
         V_LATEST: "このファイルの最新バージョンをダウンロードしました",
         V_OLDER: "最終ダウンロードしたこのファイルのバージョンは ${0} です",
         LOADING: "ロード中...",
         EMPTY: "匿名ユーザーのみ",
         ERROR: "ダウンロード情報をロードできません"
      }
   },

   EE_DIALOG: {
      ERROR: "エラー",
      ERROR_ALT_TEXT: "エラー:",
      ERROR_MSG_GENERIC: "何らかの問題が発生しました。  もう一度実行してください。",
      ERROR_MSG_NOT_AVAILABLE: "この項目は削除されたか、使用できなくなっています。",
      ERROR_MSG_CONTENT_NOT_AVAILABLE: "この項目のコンテンツは使用できません。",
      ERROR_MSG_NO_ACCESS: "この項目へのアクセス権がすでにありません。",
      LOADING: "ロード中...",
      TITLE_SU: "${author} がメッセージを投稿しました。",
      TITLE_NI: "${author} があなたにネットワーク参加依頼を送信しました。",
      AUTHOR_TITLE: "${author} のプロフィールを表示",
      OPEN_LINK: "${title} を開く",
      CONFIRM_CLOSE_TITLE: "確認",
      CONFIRM_CLOSE_MESSAGE: "変更を破棄しますか? 続行するには「OK」、戻るには「キャンセル」を押してください",
      OK: "OK",
      CANCEL: "キャンセル"
   },
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
   statusUpdate: {
       createdCompact: {
           DAY: "作成: ${EEEE} の ${time}",
           MONTH: "作成: ${MMM} ${d} 日",
           TODAY: "作成: 今日の ${time}",
           YEAR: "作成: ${YYYY} 年 ${MMM} 月 ${d} 日",
           YESTERDAY: "作成: 昨日の ${time}",
           TOMORROW: "作成: ${YYYY} 年 ${MMM} 月 ${d} 日"
       },
      error: "エラーが発生しました。  ${again}.",
      error_again: "もう一度実行してください",
      error_404: "最新の状況は存在しません。",
      notifications: {
         STATUS_UPDATE: "${user} がメッセージを投稿しました",
         USER_BOARD_POST: "${user} があなたのボードに書き込みました",
         POST_COMMENT: "${user} の書き込み:"
      }
   },
   login: {
      error: "ユーザー名/パスワードが既存のアカウントに一致しません。 もう一度実行してください。",
      logIn: "ログイン",
      password: "パスワード:",
      user: "ユーザー名:",
      welcome: "HCL Connections へのログイン"
   },
   repost: {
      name: "再投稿",
      title: "自分のフォロワーまたはコミュニティーへのこの更新の再投稿",
      msg_success: "更新がフォロワーに対して正常に再投稿されました。",
      msg_generic: "何らかの問題が発生しました。  もう一度実行してください。"
   },
   FILE_SHARE_INFO: {
      ADD: "追加",
      ADD_TXT: "ユーザーまたはコミュニティーを読者として追加",
      SHOW_MORE: "さらに表示...",
      READER_IF_PUBLIC: "すべてのユーザー (公開)",
      READER_IF_PUBLIC_TOOLTIP: "このファイルは公開されており、すべてのユーザーから閲覧可能です",
      EMPTY_READERS: "なし",
      READERS_LABEL: "読者: ",
      EDITORS_LABEL: "編集者: ",
      OWNER_LABEL: "所有者: ",
      ERROR: "共有情報をロードできません",
      ERROR_NOT_FOUND: "要求したファイルは削除または移動されました。 このリンクが他のユーザーから送信されたものである場合は、このリンクが正しいかどうかを確認してください。",
      ERROR_ACCESS_DENIED: "このファイルを表示するための許可がありません。  このファイルは公開されていないか、あなたに共有されていません。",
      SHARE: "共有",
      CANCEL: "キャンセル",
      SHARE_WITH: "共有先:",
      PERSON: "ユーザー",
      COMMUNITY: "コミュニティー",
      PLACEHOLDER: "ユーザー名またはメール...",
      MESSAGE: "メッセージ:",
      MESSAGE_TXT: "オプションのメッセージの追加",
      REMOVE_ITEM_ALT: "${0} の削除",
      NO_MEMBERS: "なし",
      A11Y_READER_ADDED: "読者として ${0} を選択",
      A11Y_READER_REMOVED: "読者として ${0} を削除",
      SELF_REFERENCE_ERROR: "自分自身に共有することはできません。",
      OWNER_REFERENCE_ERROR: "ファイルの所有者に共有することはできません。",
      SHARE_COMMUNITY_WARN: "公開コミュニティー '${0}' に共有すると、このファイルはすべてのユーザーから閲覧可能になります。",
      SELECT_USER_ERROR: "共有先としてユーザーまたはコミュニティーを少なくとも 1 つ選択してください。",
      WARN_LONG_MESSAGE: "メッセージが長すぎます。",
      TRIM_LONG_MESSAGE: "メッセージを短縮しますか?",
      ERROR_SHARING: "ファイルを共有できませんでした。  後でもう一度実行してください。",
      INFO_SUCCESS: "ファイルは正常に共有されました。",
      MAX_SHARES_ERROR: "共有の最大数を超えています。",
      NOT_LOGGED_IN_ERROR: "ログインしていなかったため、ファイルは共有されませんでした。  ファイルを共有するには「共有」をクリックしてください。",
      TIMEOUT_ERROR: "サーバーに接続できなかったため、ファイルは共有されませんでした。  「共有」をクリックしてもう一度実行してください。",
      CANCEL_ERROR: "要求がキャンセルされたため、ファイルは共有されませんでした。  「共有」をクリックしてもう一度実行してください。",
      NOT_FOUND_ERROR: "このファイルは既に削除されたか閲覧できなくなっているため、共有できません。",
      ACCESS_DENIED_ERROR: "このファイルを共有するための許可を失っています。",
      VISIBILITY_RESTRICTION_ERROR_SHARE: "制限付きファイルを公開することはできません。",
      TOOLTIP: "このファイルへのアクセス権を他のユーザーに付与します"
   },
   HISTORY: {
      TAB_TITLE: "最新の更新",
      NO_HISTORY: "最近の更新はありません。",
      EMPTY: "この項目の最新の更新を取得できませんでした。 項目が削除されたか、その項目へのアクセス権が既にありません。",
      MORE: "前の更新を表示",
      ERROR_ALT: "エラー",
      ERROR: "更新の検索中にエラーが発生しました。${again}",
      ERROR_ADDTL: "追加の更新の検索中にエラーが発生しました。${again}",
      ERROR_AGAIN: "もう一度実行してください。",
      ERROR_AGAIN_TITLE: "更新をさらに表示するには、要求を再試行してください。",
      PROFILE_TITLE: "${user} のプロフィールを開きます。",
      SORT_BY: "ソート順\\:",
      SORTS: {
         DATE: "日付",
         DATE_TOOLTIP: "更新を履歴の新しい順にソート",
         DATE_TOOLTIP_REVERSE: "更新を履歴の古い順にソート"
      },
      TIMESTAMP: {
         CREATED: {
             DAY: "${EEEE} の ${time}",
             MONTH: "${MMM} ${d} 日",
             TODAY: "今日の ${time}",
             YEAR: "${YYYY} 年 ${MMM} ${d} 日",
             YESTERDAY: "昨日の ${time}",
             TOMORROW: "${YYYY} 年 ${MMM} ${d} 日"
          }
     }
   },
   THISCOMMENT: {
       TAB_TITLE: "このコメント",
	   REPLY_ACTION: "返信",
       REPLY_ACTION_TOOLTIP: "このコメントに返信する"
   },
   OAUTH: {
      welcomeHeader: "HCL Connections へようこそ",
      continueBtnLabel: "続行",
      continueBtnA11y: "このリンクをアクティブにすると、HCL Connections に対するアクセスを許可する新規ウィンドウが開きます。",
      clickHere: "ここをクリック",
      infoMsg: "HCL Connections からデータにアクセスするには、アクセスを許可する必要があります。",
      authorizeGadget: "HCL Connections の情報へのアクセスをこのアプリケーションに対して許可するには、${clickHere}します。",
      confirmAuthorization: "HCL Connections の情報へのアクセスをこのアプリケーションに対して許可したことを確認するには、${clickHere}します。"
   },
   OAUTH_FILENET: {
      continueBtnA11y: "このリンクをアクティブにすると、Connections ライブラリー・リポジトリーに対するアクセスを許可する新規ウィンドウが開きます。",
      infoMsg: "Connections ライブラリー・リポジトリーからデータにアクセスするには、アクセスを許可する必要があります。",
      authorizeGadget: "Connections ライブラリー・リポジトリーの情報へのアクセスをこのアプリケーションに対して許可するには、${clickHere}します。",
      confirmAuthorization: "Connections ライブラリー・リポジトリーの情報へのアクセスをこのアプリケーションに対して許可したことを確認するには、${clickHere}します。"
   },
   UNSAVEDCHANGES: {
      CANCEL: "キャンセル",
      CONFIRM: "変更を破棄しますか?  続行するには「OK」、戻るには「キャンセル」を押してください。",
      DIALOG_TITLE: "確認",
      NAME: "確認",
      OK: "OK",
      TOOLTIP: "確認"
   }
})
