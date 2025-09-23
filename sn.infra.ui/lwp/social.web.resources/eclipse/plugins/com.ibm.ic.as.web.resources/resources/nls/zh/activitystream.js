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
loadingText: "正在装入...",

//common strings
errorText: "错误",

invalidASConfig: "更新流的配置存在错误。 请与管理员联系。",

// News Item
// ${0}  :  Person display name
photoOfText: "${0} 的照片",
// ${0}  :  Application
eventFromText: "来自 ${0} 的事件",
removeNewsItemText: "删除此项 ",
// ${0}  :  Number of likes for a news item
tagsText: "标签：${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} 人点赞",
likeText: "1 人点赞",
imageNotAvailable: "预览当前不可用。",
likeError: "链接此项时发生错误。",
unLikeError: "取消链接此项时发生错误。",
// ${0} author name
fromText: "发送方：${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "下载出错",
downloadErrorMessage: "无法下载文件。 该文件可能已删除，或者您可能无权对其进行访问。",
closeText: "关闭",
okText: "确定",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "这是指向 ${0} 的个人档案的链接",

// Files News Items
publicText: "公共",
privateText: "私有",

// Video Preview
ariaPlayVideo: "播放视频",
ariaVideoArea: "视频区域，按 ENTER 键可以打开视频控制器",

// News Item Actions - Comment
commentText: "评论",
logInText: "登录",
logInCommentText: "请登录以发表评论",
deleteCommentText: "删除评论",
addCommentText: "添加评论...",
ariaAddCommentText: "添加评论",
writeCommentText: "写点什么...",
ariaCommentText: "请写点什么",
commentNotPermittedText: "您无权对此消息作出评论。",
commentFailureText: "尝试添加评论文本失败。 请刷新页面，然后重试。",
commentSessionTimedOut: "由于处于未激活状态，服务器已自动将您注销。 将输入的任何文本复制到剪贴板中，这样就不会丢失该文本，然后<a href : ''${0}''>登录</a>以重新开始。",
commentPostText: "发布",
commentCancelText: "取消",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "评论过长，无法发布。 请修正评论并重试。",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "您的评论已发布。",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} 于 ${1} 撰写了评论",
// same as above, but for replies
replyAriaLabel: "${0} 于 ${1} 撰写了回复",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "在新窗口中查看“${0}”页面上的项。 ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} 于 ${1} 撰写了评论",
// same as above, but for replies
replyAriaLabelSameDay: "${0} 于 ${1} 撰写了回复",

// News Item Actions - Save
savedText: "已保存",
savedSuccessText: "成功保存",

// No Content Item
noContentText: "没有可显示的更新。",

// News Feed Error
feedErrorText: "检索新闻订阅源时发生错误。",
itemErrorText: "显示订阅源中的项时发生错误。",
errorAlt : "错误：",
errorShowMore: "显示更多",
errorShowLess: "显示更少",

// Paging Handler
backToTopText: "返回顶部",
ariaShowMore: "显示更多活动流项",
ariaShowLess: "显示更少活动流项",
ariaBackToTop: "返回活动流项的顶部",

// Feed Link
feedLinkText: "这些条目的订阅源",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "尚有 ${0} 条评论",
oneMoreCommentsText: "尚有 1 条评论",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "显示所有 ${0} 条评论 ",
singleCommentText: "显示评论",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "有关 ${0} 的评论",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "有关 ${0} 的评论。 使用更多详细信息以显示全部 ${1} 项评论。",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "项",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "活动流",

// Filters
selectFilter: "选择过滤器",
filterAriaDescription: "请选择过滤器以更改显示在活动流上的项类型。",
filterAriaLabel: "过滤活动流",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "按 Enter 键可显示关于此项的更多详细信息。",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "显示操作",

ariaActionsToolbar: "项操作",

// Description for EE opener
openEEText: "显示有关此项的更多详细信息",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "删除此消息",
statusRemoveConfirmMessageText: "确定要删除此消息吗？",
statusRemoveConfirmText: "删除",
statusRemoveCancelText: "取消",
statusRemoveConfirmationMsg:  "已成功删除消息。",
statusRemoveErrorMsg: "此时无法删除消息。 请重试或联系管理员。",
commentRemoveText: "删除此评论",
commentRemoveConfirmMessageText: "确定要删除此评论吗？",
commentRemoveConfirmText: "删除",
commentRemoveCancelText: "取消",
commentRemoveConfirmationMsg: "已成功删除评论。",
commentRemoveErrorMsg: "此时无法删除评论。 请重试或联系管理员。",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "剩余字符数",

// Message
msgCloseAlt: "关闭消息",

//More Less Link
showMoreText: "显示更多",
showLessText: "显示更少",
showMoreActions: "更多...",

ariaShowMoreLabel: "该按钮用于显示为显示目的隐藏的内容。 与辅助技术用户不相关。",


//Tags
listTags: "${0} 个以及 ${1} 个以上",

//Trends
expandTrend: "展开“趋势”过滤器",
collapseTrend: "折叠“趋势”过滤器",
trendTitle: "趋势",
relatedTrendTitle: "添加趋势“${0}”",
trendHelp: "“趋势”帮助",
closeTrendHelp: "关闭“趋势”帮助",
trendDescription: "趋势是系统生成的关键字，用于使您更方便地在状态更新中执行搜索。 单击趋势可显示已分配到该关键字的搜索结果。",
noTrends: "尚无趋势",
selectedTrends: "选定趋势",
relatedTrends: "相关趋势",
relatedTrendsDesc: "添加相关趋势进一步优化搜索",
removeTrend: "从所选过滤器趋势中除去趋势“${0}”",
removeGeneric: "除去",
removeHashtag: "从选定过滤器标签中除去 # 号标签“${0}”。",

//ActivityStream search
asSearchLabel: "搜索当前流",
asSearchShadowtext: "搜索此流",
asSearchBarOpen: "打开搜索栏以搜索当前视图",
asSearchBarCancel: "取消搜索并返回主视图",
asSearch: "搜索",
asSearchGlobalView: "查看所有内容中的搜索结果",

matching: "匹配项：",
matchingAllOf: "匹配下列全部：",


//ViewAll extension
viewAllUpdates: "查看所有更新",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "已提及 ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "已提及 ${0}",

// String for new filter
filterMention: "@Mentions",

// Aria string for mentions
ariaFilterMention: "个人消息",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} 于 ${time}",
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
filterStatusUpdates: "状态更新",
filterActivities: "活动",
filterBlogs: "博客",
filterBookmarks: "书签",
filterCommunities: "社区",
filterFiles: "文件",
filterForums: "论坛",
filterPeople: "人员",
filterProfiles: "个人档案",
filterWikis: "Wiki",
filterTags: "标签",
filterLibraries: "文档库",
filterMyNetworkAndPeopleIFollow: "我的网络和我关注的人员",
filterMyNetwork: "我的网络",
filterPeopleIFollow: "我关注的人员",
filterMyUpdates: "我的更新",
filterCommunitiesIFollow: "我关注的社区",
filterForMe: "给我的通知",
filterFromMe: "我发出的通知",

// Label for filters - used by gadget
viewFilterLabel: "子视图：",
filterOneLabel: "过滤条件：",
filterTwoLabel: "显示：",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "我在关注",
viewStatusUpdates: "状态更新",
viewActionRequired: "待执行操作",
viewSaved: "已保存",
viewMyNotifications: "我的通知",
viewDiscover: "查看",
viewRecentUpdates: "最近更新",

// Aria label for As View Side Nav
ariaASViews: "活动流视图",

selectedLabel: "选定",

// Gadget title
asTitle: "Connections 更新",

// Used by gadget in Notes
updatesFromSender: "“发件人”中的更新",
updatesFromContact: "“联系人”中的更新",
updatesForUser: "用户的更新",
updatesFor: "${0} 的更新",
noUser: "找不到电子邮件地址为 ${0} 的用户",
returnMainView: "返回",

//External Application Text
externalApplication: "外部应用程序",

//Strings for expanding comments inline
showPreviousComments: "显示先前的评论...",
hideAdditionalComments: "隐藏其他评论...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "第 ${0} 个（共 ${1} 个）",
errorRetrieveComments: "检索先前评论时发生错误。",
errorRetrieveCommentsDeleted: "检索先前评论时发生错误。 可能已删除此项。",

// News Item Actions - Repost
repostText: "转发",
logInRepostText: "登录以转发",
repostMsgSuccess: "已成功向您的关注者转发更新。",
repostMsgFail: "转发此消息时出错。",
repostMsgErrorResGeneric: "您无权转发此消息。",
repostMsgErrorRestricted: "无法转发此消息，因为 ${0} 社区现在为受限社区。",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" 单击此处以搜索标签 ${0}。 ",

// a11y information about the link opening on a new window
opensInNewWindow: "此链接将在新窗口中打开。",
attachFile : "添加文件",
removeFileAttachment: "除去文件附件",

// External users 
externalUsersCommentsMsg: "贵组织以外的人员可能会看到评论。",
externalUsersStatusUpdatesMsg: "贵组织以外的人员可能会看到状态更新。",
externalUsersItemMsg: "外部共享",

// Notifications Center
ariaNotificationCenter: "通知中心 - 查看与您的内容相关的更新以及您收到的通知。",
allNotifications : "所有通知",
seeAllNotifications : "查看全部",
ariaSeeAllNotifications : "单击此处可转至主页中的“我的通知”视图",
notificationsTitle : "通知",
notificationsSettings : "设置",
ariaNotificationsSettings : "单击此处可转至“通知设置”页面",
ariaNewNotification : "新通知标题。 ${0}",
newNotifications: "${0} 个新通知",
loadingNotifications: "正在装入...",
noNewNotifications: "在过去一周您未收到任何通知。",
markRead: "标记为已读",
markUnread: "标记为未读",
markAllRead: "全部标记为已读",
markAllReadDetails: "单击此处以将所有通知标记为已读。",
notificationPopupSingleGeneric: "您有 1 个新通知",
notificationPopupGeneric: "您有 ${0} 个新通知"
});

