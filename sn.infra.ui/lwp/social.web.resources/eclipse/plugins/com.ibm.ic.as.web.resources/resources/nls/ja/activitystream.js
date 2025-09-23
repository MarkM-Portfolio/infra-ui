/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// 5724-E76                                                          
// NLS_ENCODING : UNICODE
// NLS_MESSAGEFORMAT_VAR
//// G11N GA UI

// Component ID key required by msgID tool.

// Activity Stream Strings

// //// G11N GA UI
// NLS_CHARSET : UTF-8
define({      

//loading string
loadingText: "ロード中...",

//common strings
errorText: "エラー",

invalidASConfig: "更新ストリームの構成にエラーがあります。 管理者にお問い合わせください。",

// News Item
// ${0}  :  Person display name
photoOfText: "${0} の写真",
// ${0}  :  Application
eventFromText: "${0} からのイベント",
removeNewsItemText: "この項目を削除 ",
// ${0}  :  Number of likes for a news item
tagsText: "タグ: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} 件の「いいね」",
likeText: "1 いいね",
imageNotAvailable: "プレビューは現在使用できません",
likeError: "この項目にリンク中にエラーが発生しました。",
unLikeError: "この項目へのリンク解除中にエラーが発生しました。",
// ${0} author name
fromText: "転送元: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "ダウンロード・エラー",
downloadErrorMessage: "ファイルをダウンロードできませんでした。 このファイルが削除されているか、このファイルへのアクセス権限がない可能性があります。",
closeText: "閉じる",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "これは ${0} のプロフィールへのリンクです",

// Files News Items
publicText: "公開",
privateText: "非公開",

// Video Preview
ariaPlayVideo: "ビデオの再生",
ariaVideoArea: "ビデオ領域: ビデオ・コントローラーにアクセスするには、ENTER を押します",

// News Item Actions - Comment
commentText: "コメント",
logInText: "ログイン",
logInCommentText: "ログインしてコメント",
deleteCommentText: "コメントの削除",
addCommentText: "コメントの追加...",
ariaAddCommentText: "コメントの追加",
writeCommentText: "書き込んでください...",
ariaCommentText: "書き込んでください",
commentNotPermittedText: "このメッセージにコメントする許可がありません。",
commentFailureText: "コメント・テキストを追加しようとしましたが、失敗しました。 ページを最新表示してもう一度実行してください。",
commentSessionTimedOut: "作業を行わなかったため、サーバーから自動的にログアウトしました。 クリップボードに入力したテキストをコピーして保存してから、<a href : ''${0}''>ログイン</a>してもう一度最初から実行してください。",
commentPostText: "投稿",
commentCancelText: "キャンセル",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "コメントが長すぎるため投稿できません。 コメントを修正して、もう一度実行してください。",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "コメントが投稿されました。",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} さんが、${1} にコメントを書き込みました",
// same as above, but for replies
replyAriaLabel: "${0} さんが、${1} に返信を書き込みました",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "${0} ページの新規ウィンドウで項目を表示します。 ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} さんが、${1} にコメントを書き込みました",
// same as above, but for replies
replyAriaLabelSameDay: "${0} さんが、${1} に返信しました",

// News Item Actions - Save
savedText: "保存済み",
savedSuccessText: "正常に保存されました",

// No Content Item
noContentText: "表示する更新はありません。",

// News Feed Error
feedErrorText: "ニュース・フィードの取得中にエラーが発生しました。",
itemErrorText: "フィードに項目を表示しているときにエラーが発生しました。",
errorAlt : "エラー:",
errorShowMore: "さらに表示",
errorShowLess: "簡略表示",

// Paging Handler
backToTopText: "先頭に戻る",
ariaShowMore: "アクティビティー・ストリーム項目をさらに表示",
ariaShowLess: "アクティビティー・ストリーム項目の表示件数を減少",
ariaBackToTop: "アクティビティー・ストリーム項目の先頭に戻る",

// Feed Link
feedLinkText: "エントリーのフィード",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "さらに ${0} 件のコメント",
oneMoreCommentsText: "さらに 1 件のコメント",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "${0} 件すべてのコメントを表示 ",
singleCommentText: "コメントの表示",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "${0} へのコメント",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "${0} へのコメント。 ${1} 件すべてのコメントを表示するには、「詳細」を使用します。",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "項目",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "アクティビティー・ストリーム",

// Filters
selectFilter: "フィルターの選択",
filterAriaDescription: "アクティビティー・ストリームに表示される項目のタイプを変更するフィルターを選択します",
filterAriaLabel: "アクティビティー・ストリームのフィルター",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Enter キーを押すと、この項目に関する詳細が表示されます",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "アクションの表示",

ariaActionsToolbar: "項目アクション",

// Description for EE opener
openEEText: "この項目に関する詳細を表示します",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "このメッセージの削除",
statusRemoveConfirmMessageText: "このメッセージを削除しますか?",
statusRemoveConfirmText: "削除",
statusRemoveCancelText: "キャンセル",
statusRemoveConfirmationMsg:  "メッセージが正常に削除されました。",
statusRemoveErrorMsg: "この時点ではメッセージを削除できませんでした。 再試行するか、管理者にお問い合わせください。",
commentRemoveText: "このコメントの削除",
commentRemoveConfirmMessageText: "このコメントを削除しますか?",
commentRemoveConfirmText: "削除",
commentRemoveCancelText: "キャンセル",
commentRemoveConfirmationMsg: "コメントが正常に削除されました。",
commentRemoveErrorMsg: "この時点ではコメントを削除できませんでした。 再試行するか、管理者にお問い合わせください。",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "文字が残っています",

// Message
msgCloseAlt: "メッセージを閉じる",

//More Less Link
showMoreText: "さらに表示",
showLessText: "簡略表示",
showMoreActions: "さらに表示...",

ariaShowMoreLabel: "このボタンは、非表示にされたコンテンツを表示するために使用されます。 支援技術ユーザーとは関連がありません。",


//Tags
listTags: "${0} とさらに ${1} 個",

//Trends
expandTrend: "トレンド・フィルターを展開する",
collapseTrend: "トレンド・フィルターを省略表示する",
trendTitle: "トレンド",
relatedTrendTitle: "トレンド ''${0}'' の追加",
trendHelp: "トレンドのヘルプ",
closeTrendHelp: "トレンドのヘルプを閉じる",
trendDescription: "トレンドは、システムによって生成されるキーワードで、最新の状況内で簡単に検索を行えるようになります。 トレンドをクリックすると、そのキーワードが割り当てられた検索結果が表示されます。",
noTrends: "まだトレンドはありません",
selectedTrends: "選択されたトレンド",
relatedTrends: "関連トレンド",
relatedTrendsDesc: "関連トレンドを追加してさらに検索範囲を絞り込みます",
removeTrend: "選択したフィルター・トレンドからトレンド ''${0}'' を削除します",
removeGeneric: "削除",
removeHashtag: "選択したフィルター・タグからハッシュタグ ${0} を削除します。",

//ActivityStream search
asSearchLabel: "現在のストリームの検索",
asSearchShadowtext: "このストリームの検索",
asSearchBarOpen: "現在のビューを検索するために検索バーを開く",
asSearchBarCancel: "検索をキャンセルしてメイン・ビューに戻る",
asSearch: "検索",
asSearchGlobalView: "すべてのコンテンツからの検索結果を表示する",

matching: "マッチング:",
matchingAllOf: "次のすべてと一致:",


//ViewAll extension
viewAllUpdates: "すべての更新を表示",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} が言及されました",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} が言及されました",

// String for new filter
filterMention: "自分宛のメッセージ",

// Aria string for mentions
ariaFilterMention: "自分宛のメッセージ",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} の ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d} 日",
// e.g. Today at 11:23
timeToday: "今日の ${time}",
// e.g. June 6th, 2011
timeYear: "${YYYY} 年 ${MMM} ${d} 日",
// e.g. Yesterday at 5:45
timeYesterday: "昨日の ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "明日の ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "すべて",
filterStatusUpdates: "最新の状況",
filterActivities: "アクティビティー",
filterBlogs: "ブログ",
filterBookmarks: "ブックマーク",
filterCommunities: "コミュニティー",
filterFiles: "ファイル",
filterForums: "フォーラム",
filterPeople: "ユーザー",
filterProfiles: "プロフィール",
filterWikis: "Wiki",
filterTags: "タグ",
filterLibraries: "ライブラリー",
filterMyNetworkAndPeopleIFollow: "マイ・ネットワークと自分がフォローしているユーザー",
filterMyNetwork: "マイ・ネットワーク",
filterPeopleIFollow: "自分がフォローしているユーザー",
filterMyUpdates: "マイ・アップデート",
filterCommunitiesIFollow: "自分がフォローしているコミュニティー",
filterForMe: "自分用",
filterFromMe: "自分から",

// Label for filters - used by gadget
viewFilterLabel: "サブビュー:",
filterOneLabel: "フィルター:",
filterTwoLabel: "表示:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "自分がフォロー",
viewStatusUpdates: "最新の状況",
viewActionRequired: "アクションが必要",
viewSaved: "保存済み",
viewMyNotifications: "自分の通知",
viewDiscover: "すべて",
viewRecentUpdates: "最新の更新",

// Aria label for As View Side Nav
ariaASViews: "アクティビティー・ストリーム・ビュー",

selectedLabel: "選択済み",

// Gadget title
asTitle: "Connections の更新",

// Used by gadget in Notes
updatesFromSender: "送信者からの更新",
updatesFromContact: "連絡先からの更新",
updatesForUser: "ユーザーに関する最新情報",
updatesFor: "${0} に関する最新情報",
noUser: "このメール・アドレスに一致するユーザーが見つかりませんでした: ${0}",
returnMainView: "戻る",

//External Application Text
externalApplication: "外部アプリケーション",

//Strings for expanding comments inline
showPreviousComments: "前のコメントを表示...",
hideAdditionalComments: "追加表示したコメントを非表示...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0}/${1}",
errorRetrieveComments: "以前のコメントの取得中にエラーが発生しました。",
errorRetrieveCommentsDeleted: "以前のコメントの取得中にエラーが発生しました。 項目が削除された可能性があります。",

// News Item Actions - Repost
repostText: "再投稿",
logInRepostText: "ログインして再投稿",
repostMsgSuccess: "更新がフォロワーに対して正常に再投稿されました。",
repostMsgFail: "このメッセージの再投稿でエラーが発生しました。",
repostMsgErrorResGeneric: "このメッセージを再投稿する許可がありません。",
repostMsgErrorRestricted: "${0} コミュニティーは現在制限付きコミュニティーであるため、このメッセージを再投稿できません。",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" ここをクリックしてタグ ${0} を検索します。 ",

// a11y information about the link opening on a new window
opensInNewWindow: "リンクをクリックすると新しいウィンドウで開きます。",
attachFile : "ファイルの追加",
removeFileAttachment: "添付ファイルの削除",

// External users 
externalUsersCommentsMsg: "コメントは、自分の組織外のユーザーから閲覧される場合があります。",
externalUsersStatusUpdatesMsg: "最新の状況は、自分の組織外のユーザーから閲覧される場合があります。",
externalUsersItemMsg: "外部と共有",

// Notifications Center
ariaNotificationCenter: "通知センター - 自分のコンテンツに関連する更新と、自分が受信した通知を表示します",
allNotifications : "すべての通知",
seeAllNotifications : "すべて表示",
ariaSeeAllNotifications : "ホーム・ページの「自分の通知」ビューに移動するには、ここをクリックします。",
notificationsTitle : "通知",
notificationsSettings : "設定",
ariaNotificationsSettings : "通知設定ページに移動するには、ここをクリックします。",
ariaNewNotification : "新規通知のタイトル。 ${0}",
newNotifications: "${0} 件の新規通知",
loadingNotifications: "ロード中...",
noNewNotifications: "過去 1 週間、通知を受信していません。",
markRead: "既読にする",
markUnread: "未読にする",
markAllRead: "すべて既読にする",
markAllReadDetails: "クリックしてすべての通知を既読にします。",
notificationPopupSingleGeneric: "1 件の新規通知があります",
notificationPopupGeneric: "${0} 件の新規通知があります"
});

