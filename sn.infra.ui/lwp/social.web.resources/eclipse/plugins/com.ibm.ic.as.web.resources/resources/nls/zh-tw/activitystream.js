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
loadingText: "載入中...",

//common strings
errorText: "錯誤",

invalidASConfig: "「更新項目」串流的配置有錯誤。 請聯絡您的管理者。",

// News Item
// ${0}  :  Person display name
photoOfText: "${0} 的照片",
// ${0}  :  Application
eventFromText: "來自 ${0} 的事件",
removeNewsItemText: "刪除此項目 ",
// ${0}  :  Number of likes for a news item
tagsText: "標籤：${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} 人按讚",
likeText: "1 人按讚",
imageNotAvailable: "預覽目前無法使用",
likeError: "對此項目按讚時發生錯誤。",
unLikeError: "對此項目取消讚時發生錯誤。",
// ${0} author name
fromText: "邀請人：${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "下載錯誤",
downloadErrorMessage: "無法下載檔案。 該檔案可能已刪除，或者您可能對其沒有存取權。",
closeText: "關閉",
okText: "確定",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "這是與 ${0} 人員資訊的鏈結",

// Files News Items
publicText: "公用",
privateText: "專用",

// Video Preview
ariaPlayVideo: "播放影片",
ariaVideoArea: "影像區域，按一下 ENTER 以存取影像控制器",

// News Item Actions - Comment
commentText: "評論",
logInText: "登入",
logInCommentText: "登入以評論",
deleteCommentText: "刪除評論",
addCommentText: "新增評論...",
ariaAddCommentText: "新增評論",
writeCommentText: "寫入內容...",
ariaCommentText: "寫入內容",
commentNotPermittedText: "您未獲授權，無法對此訊息進行評論。",
commentFailureText: "嘗試新增評論文字失敗。 請重新整理您的頁面，然後再試一次。",
commentSessionTimedOut: "由於未活動，因此您已自動被登出伺服器。 將您輸入的任何文字複製到剪貼簿，以便不會失去它，然後<a href : ''${0}''>登入</a>以重新開始。",
commentPostText: "張貼",
commentCancelText: "取消",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "評論太長，無法張貼。 請修改評論，然後再試一次。",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "已張貼您的評論。",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} 在 ${1} 撰寫評論",
// same as above, but for replies
replyAriaLabel: "${0} 在 ${1} 撰寫回覆",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "在新視窗中檢視${0}頁面上的項目。 ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} 在 ${1} 時撰寫評論",
// same as above, but for replies
replyAriaLabelSameDay: "${0} 在 ${1} 時撰寫回覆",

// News Item Actions - Save
savedText: "已儲存的項目",
savedSuccessText: "順利儲存",

// No Content Item
noContentText: "沒有可顯示的更新項目。",

// News Feed Error
feedErrorText: "擷取新聞資訊來源時發生錯誤。",
itemErrorText: "顯示您資訊來源中的項目時發生錯誤。",
errorAlt : "錯誤：",
errorShowMore: "顯示更多",
errorShowLess: "顯示更少",

// Paging Handler
backToTopText: "回到頁首",
ariaShowMore: "顯示更多活動流項目",
ariaShowLess: "顯示更少活動流項目",
ariaBackToTop: "回到活動流項目頂端",

// Feed Link
feedLinkText: "這些文章的資訊來源",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} 個更多評論",
oneMoreCommentsText: "1 個更多評論",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "顯示所有 ${0} 個評論 ",
singleCommentText: "顯示評論",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "對 ${0} 發表評論",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "對 ${0} 發表評論。 使用相關詳細資料來顯示所有 ${1} 個評論。",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "項目",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "活動流",

// Filters
selectFilter: "選取過濾器",
filterAriaDescription: "選取過濾器以變更在「活動流」上顯示的項目類型",
filterAriaLabel: "過濾活動流",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "按 Enter 鍵，以顯示此項目的更多詳細資料",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "顯示動作",

ariaActionsToolbar: "項目動作",

// Description for EE opener
openEEText: "顯示此項目的更多詳細資料",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "刪除此訊息",
statusRemoveConfirmMessageText: "確定要刪除這個訊息嗎？",
statusRemoveConfirmText: "刪除",
statusRemoveCancelText: "取消",
statusRemoveConfirmationMsg:  "已順利刪除訊息。",
statusRemoveErrorMsg: "此時無法刪除訊息。 請重試或聯絡管理者。",
commentRemoveText: "刪除此評論",
commentRemoveConfirmMessageText: "確定要刪除此評論嗎？",
commentRemoveConfirmText: "刪除",
commentRemoveCancelText: "取消",
commentRemoveConfirmationMsg: "已順利刪除評論。",
commentRemoveErrorMsg: "此時無法刪除評論。 請重試或聯絡管理者。",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "剩餘字元",

// Message
msgCloseAlt: "關閉訊息",

//More Less Link
showMoreText: "顯示更多",
showLessText: "顯示更少",
showMoreActions: "更多...",

ariaShowMoreLabel: "此按鈕可用以顯示出因顯示目的而隱藏的內容。 與輔助技術使用者無關。",


//Tags
listTags: "再多 ${0} 和 ${1} 個",

//Trends
expandTrend: "展開「趨勢」過濾器",
collapseTrend: "收合「趨勢」過濾器",
trendTitle: "趨勢",
relatedTrendTitle: "新增趨勢 ''${0}''",
trendHelp: "趨勢說明",
closeTrendHelp: "關閉趨勢說明",
trendDescription: "趨勢是系統所產生的關鍵字，以便於在「狀態更新」中執行搜尋。 按一下趨勢可顯示已指派該關鍵字的搜尋結果。",
noTrends: "尚未有趨勢",
selectedTrends: "選取的趨勢",
relatedTrends: "相關的趨勢",
relatedTrendsDesc: "新增相關的趨勢，以進一步精簡搜尋",
removeTrend: "將趨勢 ''${0}'' 從所選過濾器趨勢中移除",
removeGeneric: "移除",
removeHashtag: "從所選取的過濾器標籤中移除主題標籤 ${0}。",

//ActivityStream search
asSearchLabel: "搜尋現行串流",
asSearchShadowtext: "搜尋此串流",
asSearchBarOpen: "開啟搜尋列以搜尋現行視圖",
asSearchBarCancel: "取消搜尋並回到主視圖",
asSearch: "搜尋",
asSearchGlobalView: "檢視您所有內容的搜尋結果",

matching: "符合：",
matchingAllOf: "符合下列項目全部：",


//ViewAll extension
viewAllUpdates: "檢視所有更新項目",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "提及 ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "提及 ${0}",

// String for new filter
filterMention: "@提及",

// Aria string for mentions
ariaFilterMention: "提及訊息",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} 於 ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d} 日",
// e.g. Today at 11:23
timeToday: "今天 ${time}",
// e.g. June 6th, 2011
timeYear: "${YYYY} 年 ${MMM} ${d} 日",
// e.g. Yesterday at 5:45
timeYesterday: "昨天 ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "明天 ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "全部",
filterStatusUpdates: "狀態更新",
filterActivities: "活動",
filterBlogs: "部落格",
filterBookmarks: "書籤",
filterCommunities: "社群",
filterFiles: "檔案",
filterForums: "討論區",
filterPeople: "人員",
filterProfiles: "人員資訊",
filterWikis: "Wiki",
filterTags: "標籤",
filterLibraries: "檔案庫",
filterMyNetworkAndPeopleIFollow: "我的網路及我追蹤的人員",
filterMyNetwork: "我的網路",
filterPeopleIFollow: "我追蹤的人員",
filterMyUpdates: "我的更新項目",
filterCommunitiesIFollow: "我追蹤的社群",
filterForMe: "針對我",
filterFromMe: "來自我",

// Label for filters - used by gadget
viewFilterLabel: "子視圖：",
filterOneLabel: "過濾依據：",
filterTwoLabel: "顯示：",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "我在追蹤",
viewStatusUpdates: "狀態更新",
viewActionRequired: "待辦任務",
viewSaved: "已儲存的項目",
viewMyNotifications: "我的通知",
viewDiscover: "探索",
viewRecentUpdates: "最近的更新",

// Aria label for As View Side Nav
ariaASViews: "活動流視圖",

selectedLabel: "已選取",

// Gadget title
asTitle: "Connections 更新項目",

// Used by gadget in Notes
updatesFromSender: "來自寄件者的更新項目",
updatesFromContact: "來自聯絡人的更新項目",
updatesForUser: "使用者的更新項目",
updatesFor: "${0} 的更新項目",
noUser: "找不到下列電子郵件位址的使用者：${0}",
returnMainView: "傳回",

//External Application Text
externalApplication: "外部應用程式",

//Strings for expanding comments inline
showPreviousComments: "顯示先前的評論...",
hideAdditionalComments: "隱藏其他評論...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0}/${1}",
errorRetrieveComments: "擷取先前的評論時發生錯誤。",
errorRetrieveCommentsDeleted: "擷取先前的評論時發生錯誤。 項目可能已刪除。",

// News Item Actions - Repost
repostText: "轉貼",
logInRepostText: "登入以轉貼",
repostMsgSuccess: "更新已順利轉貼至您的追蹤者。",
repostMsgFail: "轉貼此訊息時發生錯誤。",
repostMsgErrorResGeneric: "您無權轉貼此訊息。",
repostMsgErrorRestricted: "因為 ${0} 社群現在是「受限社群」，所以無法轉貼此訊息。",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" 請按一下這裡以搜尋標籤 ${0}。 ",

// a11y information about the link opening on a new window
opensInNewWindow: "此鏈結會在新視窗中開啟。",
attachFile : "新增檔案",
removeFileAttachment: "移除檔案附件",

// External users 
externalUsersCommentsMsg: "組織外部的人員可以看見評論。",
externalUsersStatusUpdatesMsg: "組織外部的人員可以看見「狀態更新」。",
externalUsersItemMsg: "外部共用",

// Notifications Center
ariaNotificationCenter: "通知中心 - 檢視與內容相關的更新項目及您所收到的通知",
allNotifications : "所有通知",
seeAllNotifications : "查看全部",
ariaSeeAllNotifications : "請按一下這裡以移至首頁中「我的通知」視圖",
notificationsTitle : "通知",
notificationsSettings : "設定",
ariaNotificationsSettings : "請按一下這裡以移至通知設定頁面",
ariaNewNotification : "新通知標題。 ${0}",
newNotifications: "${0} 個新通知",
loadingNotifications: "載入中...",
noNewNotifications: "您在過去一週內尚未收到任何通知。",
markRead: "標示為已讀",
markUnread: "標示為未讀",
markAllRead: "全部標示為已讀",
markAllReadDetails: "按一下這裡以標示所有通知已讀。",
notificationPopupSingleGeneric: "您有 1 個新通知。",
notificationPopupGeneric: "您有 ${0} 個新通知"
});

