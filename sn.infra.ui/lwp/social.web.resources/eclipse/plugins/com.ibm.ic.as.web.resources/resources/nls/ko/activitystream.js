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
loadingText: "로드 중...",

//common strings
errorText: "오류",

invalidASConfig: "업데이트 스트림에 대한 구성에 오류가 있습니다. 관리자에게 문의하십시오.",

// News Item
// ${0}  :  Person display name
photoOfText: "${0}의 사진",
// ${0}  :  Application
eventFromText: "${0}의 이벤트",
removeNewsItemText: "이 항목 삭제 ",
// ${0}  :  Number of likes for a news item
tagsText: "태그: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0}명이 좋아함",
likeText: "1명이 좋아함",
imageNotAvailable: "미리보기는 현재 사용할 수 없음",
likeError: "이 항목을 좋아하는 중에 오류가 발생했습니다. ",
unLikeError: "이 항목을 좋아하지 않는 중에 오류가 발생했습니다. ",
// ${0} author name
fromText: "발신인: ${0}",

sizeMB: "${0}MB",
sizeGB: "${0}GB",
sizeKB: "${0}KB",

//File download strings
downloadError: "다운로드 오류",
downloadErrorMessage: "이 파일을 다운로드할 수 없습니다. 삭제되었거나 액세스 권한이 없습니다. ",
closeText: "닫기",
okText: "확인",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "${0}의 프로파일로의 링크입니다.",

// Files News Items
publicText: "공용",
privateText: "개인용",

// Video Preview
ariaPlayVideo: "비디오 재생",
ariaVideoArea: "비디오 영역. 비디오 제어기에 액세스하려면 Enter를 누르십시오.",

// News Item Actions - Comment
commentText: "댓글",
logInText: "로그인",
logInCommentText: "로그인하여 댓글 작성",
deleteCommentText: "댓글 삭제",
addCommentText: "댓글 추가...",
ariaAddCommentText: "댓글 추가",
writeCommentText: "내용 기록...",
ariaCommentText: "내용 기록",
commentNotPermittedText: "이 메시지에 댓글을 작성할 권한이 없습니다. ",
commentFailureText: "댓글 텍스트를 추가하지 못했습니다. 페이지를 새로 고치고 다시 시도하십시오. ",
commentSessionTimedOut: "서버 활동이 없으므로 자동으로 로그아웃되었습니다. 입력한 텍스트가 손실되지 않도록 클립보드에 복사한 후 <a href : ''${0}''>로그인</a>하여 다시 시작하십시오.",
commentPostText: "게시",
commentCancelText: "취소",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "댓글이 너무 길어 게시할 수 없습니다. 댓글을 수정하고 다시 시도하십시오.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "댓글이 게시되었습니다.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0}이(가) ${1}에 대한 댓글을 작성함",
// same as above, but for replies
replyAriaLabel: "${0}이(가) ${1}에 대한 답글을 작성함",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "${0} 페이지의 새 창에서 항목 보기",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0}이(가) ${1}에 댓글을 작성함",
// same as above, but for replies
replyAriaLabelSameDay: "${0}이(가) ${1}에 답글을 작성함",

// News Item Actions - Save
savedText: "저장 항목",
savedSuccessText: "성공적으로 저장함",

// No Content Item
noContentText: "표시할 업데이트가 없습니다.",

// News Feed Error
feedErrorText: "뉴스 피드를 검색하는 중에 오류가 있습니다. ",
itemErrorText: "피드에 항목을 표시하는 중에 오류가 발생했습니다. ",
errorAlt : "오류:",
errorShowMore: "자세히 표시",
errorShowLess: "간단히 표시",

// Paging Handler
backToTopText: "맨 위로 돌아가기",
ariaShowMore: "활동 스트림 항목 자세히 표시",
ariaShowLess: "활동 스트림 항목 간단히 표시",
ariaBackToTop: "활동 스트림 항목의 맨 위로 돌아가기",

// Feed Link
feedLinkText: "해당 항목 피드",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0}개의 추가 댓글",
oneMoreCommentsText: "1개의 추가 댓글",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "모든 ${0} 댓글 표시 ",
singleCommentText: "댓글 표시",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "${0}에 대한 댓글",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "${0}에 대한 댓글을 작성합니다. 추가 세부사항을 사용하여 모든 ${1} 댓글을 표시하십시오.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "항목",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "활동 스트림",

// Filters
selectFilter: "필터 선택",
filterAriaDescription: "활동 스트림에 표시된 항목 유형을 변경하려면 필터 선택",
filterAriaLabel: "활동 스트림 필터",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Enter 키를 눌러 이 항목에 관한 세부사항 표시",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "조치 표시",

ariaActionsToolbar: "항목 조치",

// Description for EE opener
openEEText: "이 항목에 대한 세부사항 표시",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "이 메시지 삭제",
statusRemoveConfirmMessageText: "이 메시지를 삭제하시겠습니까?",
statusRemoveConfirmText: "삭제",
statusRemoveCancelText: "취소",
statusRemoveConfirmationMsg:  "메시지가 삭제되었습니다. ",
statusRemoveErrorMsg: "지금은 메시지를 삭제할 수 없습니다. 다시 시도하거나 관리자에게 문의하십시오.",
commentRemoveText: "댓글 삭제",
commentRemoveConfirmMessageText: "이 댓글을 삭제하시겠습니까?",
commentRemoveConfirmText: "삭제",
commentRemoveCancelText: "취소",
commentRemoveConfirmationMsg: "댓글이 삭제되었습니다. ",
commentRemoveErrorMsg: "지금은 댓글을 삭제할 수 없습니다. 다시 시도하거나 관리자에게 문의하십시오. ",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "문자가 남아 있음",

// Message
msgCloseAlt: "메시지 닫기",

//More Less Link
showMoreText: "자세히 표시",
showLessText: "간단히 표시",
showMoreActions: "자세히...",

ariaShowMoreLabel: "이 단추는 표시 용도에 대해 숨겨졌던 컨텐츠를 표시하는 데 사용됩니다. 보조 기술 사용자와 관련이 없습니다. ",


//Tags
listTags: "${0} 및 ${1} 이상",

//Trends
expandTrend: "경향 필터 펼치기",
collapseTrend: "경향 필터 접기",
trendTitle: "경향",
relatedTrendTitle: "경향 ''${0}'' 추가",
trendHelp: "경향 도움말",
closeTrendHelp: "경향 도움말 닫기",
trendDescription: "경향은 시스템에서 생성되어 상태 업데이트에서 검색을 보다 쉽게 수행할 수 있게 하는 키워드입니다. 키워드가 지정된 검색 결과를 표시하려면 경향을 클릭하십시오.",
noTrends: "아직 경향 없음",
selectedTrends: "선택한 경향",
relatedTrends: "관련 경향",
relatedTrendsDesc: "관련 경향을 추가하여 검색 세분화",
removeTrend: "선택한 필터 경향에서 경향 ''${0}'' 제거",
removeGeneric: "제거",
removeHashtag: "선택한 필터 태그에서 해시 태그 ${0} 제거",

//ActivityStream search
asSearchLabel: "현재 스트림 검색",
asSearchShadowtext: "이 스트림 검색",
asSearchBarOpen: "현재 보기를 검색하려면 검색 표시줄 열기",
asSearchBarCancel: "검색을 취소하고 기본 보기로 돌아가기",
asSearch: "검색",
asSearchGlobalView: "모든 컨텐츠에서 검색 결과 보기",

matching: "일치:",
matchingAllOf: "다음 항목과 모두 일치:",


//ViewAll extension
viewAllUpdates: "모든 업데이트 보기",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0}을(를) 멘션함",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0}을(를) 멘션함",

// String for new filter
filterMention: "@Mention",

// Aria string for mentions
ariaFilterMention: "멘션",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}일",
// e.g. Today at 11:23
timeToday: "오늘 ${time}",
// e.g. June 6th, 2011
timeYear: "${YYYY} ${MMM} ${d}일",
// e.g. Yesterday at 5:45
timeYesterday: "어제 ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "내일 ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "모두",
filterStatusUpdates: "상태 업데이트",
filterActivities: "활동",
filterBlogs: "블로그",
filterBookmarks: "책갈피",
filterCommunities: "커뮤니티",
filterFiles: "파일",
filterForums: "포럼",
filterPeople: "사용자",
filterProfiles: "프로파일",
filterWikis: "위키",
filterTags: "태그",
filterLibraries: "라이브러리",
filterMyNetworkAndPeopleIFollow: "내 네트워크 및 관심 대상으로 등록한 사람",
filterMyNetwork: "내 네트워크",
filterPeopleIFollow: "관심 대상으로 등록한 사람",
filterMyUpdates: "내 업데이트",
filterCommunitiesIFollow: "나의 관심 커뮤니티",
filterForMe: "나에게 발송된 알림",
filterFromMe: "내가 발송한 알림",

// Label for filters - used by gadget
viewFilterLabel: "하위 보기: ",
filterOneLabel: "필터 기준: ",
filterTwoLabel: "표시:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "관심 대상으로 등록",
viewStatusUpdates: "상태 업데이트",
viewActionRequired: "지시 항목",
viewSaved: "저장 항목",
viewMyNotifications: "내 알림",
viewDiscover: "공개 메시지",
viewRecentUpdates: "최근 업데이트",

// Aria label for As View Side Nav
ariaASViews: "활동 스트림 보기",

selectedLabel: "선택됨",

// Gadget title
asTitle: "연결 업데이트",

// Used by gadget in Notes
updatesFromSender: "발신인에서 업데이트",
updatesFromContact: "사용자로부터 업데이트",
updatesForUser: "사용자에 대한 업데이트",
updatesFor: "${0}에 대한 업데이트",
noUser: "다음 이메일 주소에 대한 사용자를 찾을 수 없음: ${0}",
returnMainView: "돌아가기",

//External Application Text
externalApplication: "외부 애플리케이션",

//Strings for expanding comments inline
showPreviousComments: "이전 댓글 표시...",
hideAdditionalComments: "추가 댓글 숨기기...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0}/${1}",
errorRetrieveComments: "이전 댓글을 검색하는 중에 오류가 발생했습니다. ",
errorRetrieveCommentsDeleted: "이전 댓글을 검색하는 중에 오류가 발생했습니다. 항목이 삭제되었을 수 있습니다. ",

// News Item Actions - Repost
repostText: "재게시",
logInRepostText: "다시 게시하기 위해 로그인",
repostMsgSuccess: "업데이트가 사용자의 팔로워에 다시 게시되었습니다.",
repostMsgFail: "이 메시지를 다시 게시하는 중에 오류가 발생했습니다.",
repostMsgErrorResGeneric: "이 메시지를 다시 게시할 권한이 없습니다.",
repostMsgErrorRestricted: "${0} 커뮤니티가 지금 제한된 커뮤니티이기 때문에 이 메시지를 다시 게시할 수 없습니다.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" 태그 ${0}에 대해 검색하려면 여기를 클릭하십시오. ",

// a11y information about the link opening on a new window
opensInNewWindow: "이 링크는 새 창에서 열립니다.",
attachFile : "파일 추가",
removeFileAttachment: "파일 첨부 제거",

// External users 
externalUsersCommentsMsg: "댓글은 조직 외부 사람이 볼 수 있습니다.",
externalUsersStatusUpdatesMsg: "상태 업데이트는 조직 외부 사람이 볼 수 있습니다. ",
externalUsersItemMsg: "외부적으로 공유됨",

// Notifications Center
ariaNotificationCenter: "알림 센터 - 컨텐츠와 관련된 업데이트와 수신한 알림을 봅니다. ",
allNotifications : "모든 알림",
seeAllNotifications : "모두 보기",
ariaSeeAllNotifications : "홈 페이지의 내 알림 보기로 이동하려면 여기를 클릭하십시오. ",
notificationsTitle : "알림",
notificationsSettings : "설정",
ariaNotificationsSettings : "알림 설정 페이지로 이동하려면 여기를 클릭하십시오. ",
ariaNewNotification : "새 알림 제목입니다. ${0}",
newNotifications: "${0}개의 새 알림",
loadingNotifications: "로드 중...",
noNewNotifications: "지난 주에 알림을 받지 않았습니다.",
markRead: "읽은 것으로 표시",
markUnread: "읽지 않은 것으로 표시",
markAllRead: "모든 문서를 읽은 것으로 표시",
markAllReadDetails: "모든 알림을 읽은 것으로 표시하려면 여기를 클릭하십시오.",
notificationPopupSingleGeneric: "한 개의 새 알림이 있습니다.",
notificationPopupGeneric: "${0}개의 새 알림이 있습니다."
});

