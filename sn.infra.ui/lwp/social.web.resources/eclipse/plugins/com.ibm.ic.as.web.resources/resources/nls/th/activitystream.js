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
loadingText: "กำลังโหลด...",

//common strings
errorText: "ข้อผิดพลาด",

invalidASConfig: "นี่คือข้อผิดพลาดเกี่ยวกับคอนฟิกูเรชันสำหรับสตรีมอัพเดต โปรดติดต่อผู้ดูแลระบบของคุณ",

// News Item
// ${0}  :  Person display name
photoOfText: "ภาพถ่ายของ ${0}",
// ${0}  :  Application
eventFromText: "เหตุการณ์จาก ${0}",
removeNewsItemText: "ลบไอเท็มนี้ ",
// ${0}  :  Number of likes for a news item
tagsText: "แท็ก: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} ชื่นชอบ",
likeText: "1 คนที่ชื่นชอบ",
imageNotAvailable: "การแสดงตัวอย่างไม่พร้อมใช้งานในขณะนี้",
likeError: "มีข้อผิดพลาดเกิดขึ้นเมื่อความชอบรายการนี้",
unLikeError: "ข้อผิดพลาดเกิดขึ้นเมื่อยกเลิกการไลค์ไอเท็มนี้",
// ${0} author name
fromText: "จาก: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "ดาวน์โหลดข้อผิดพลาด",
downloadErrorMessage: "ไฟล์ไม่สามารถดาวน์โหลดได้ ไฟล์อาจถูกลบออกแล้ว หรือคุณอาจไม่มีสิทธิเข้าถึงไฟล์",
closeText: "ปิด",
okText: "ปกติ",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "นี้คือลิงก์ไปยังโปรไฟล์ของ ${0}",

// Files News Items
publicText: "ชื่อพับลิกโฟลเดอร์",
privateText: "ไพรเวต",

// Video Preview
ariaPlayVideo: "เล่นวิดีโอ",
ariaVideoArea: "พื้นที่วิดีโอ, กด ENTER เพื่อเข้าถึงการควบคุมวิดีโอ",

// News Item Actions - Comment
commentText: "ความคิดเห็น",
logInText: "ล็อกอิน",
logInCommentText: "ล็อกอินเพื่อแสดงข้อคิดเห็น",
deleteCommentText: "ลบข้อคิดเห็น",
addCommentText: "เพิ่มข้อคิดเห็น...",
ariaAddCommentText: "เพิ่มข้อคิดเห็น",
writeCommentText: "เขียนข้อมูลอะไรก็ได้...",
ariaCommentText: "เขียนบางสิ่ง",
commentNotPermittedText: "คุณไม่ได้รับอนุญาตให้แสดงข้อคิดเห็นเกี่ยวกับข้อความนี้",
commentFailureText: "ความพยายามเพิ่มข้อความแสดงข้อคิดเห็นล้มเหลว โปรดรีเฟรชเพจของคุณ และลองอีกครั้ง",
commentSessionTimedOut: "คุณถูกล็อกเอาต์จากเซิร์ฟเวอร์โดยอัตโนมัติ เนื่องจากไม่ได้ใช้งาน คัดลอกข้อความใดๆ ที่คุณป้อนลงในคลิปบอร์ดของคุณเพื่อที่คุณจะไม่ต้องสูญเสียข้อความนั้น จานกั้น <a href : ''${0}''>ล็อกอิน</a> เพื่อเริ่มต้นใหม่",
commentPostText: "โพสต์",
commentCancelText: "การยกเลิก",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "ข้อคิดเห็นยาวเกินไปสำหรับการโพสต์ โปรดแก้ไขข้อคิดเห็น และลองอีกครั้ง",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "โพสต์ข้อคิดเห็นของคุณแล้ว",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} เขียนข้อคิดเห็นบน ${1}",
// same as above, but for replies
replyAriaLabel: "${0} เขียนการตอบกลับเมื่อ ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "ดูไอเท็มในหน้าต่างใหม่บนเพจ ${0} ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} เขียนข้อคิดเห็นเมื่อ ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} เขียนการตอบกลับที่ ${1}",

// News Item Actions - Save
savedText: "บันทึกแล้ว",
savedSuccessText: "บันทึกเรียบร้อยแล้ว",

// No Content Item
noContentText: "ไม่มีการอัพเดตที่จะแสดง",

// News Feed Error
feedErrorText: "มีข้อผิดพลาดเกิดขึ้นขณะดึงฟีดข่าวสารของคุณ",
itemErrorText: "เกิดข้อผิดพลาดในการสแงดไอเท็มในฟีดของคุณ",
errorAlt : "ข้อผิดพลาด:",
errorShowMore: "แสดงเพิ่มเติม",
errorShowLess: "แสดงน้อยลง",

// Paging Handler
backToTopText: "กลับไปที่ด้านบนสุด",
ariaShowMore: "แสดงไอเท็มสตรีมกิจกรรมเพิ่มเติม",
ariaShowLess: "แสดงไอเท็มสตรีมกิจกรรมน้อยลง",
ariaBackToTop: "กลับไปที่ด้านบนสุดของไอเท็มสตรีมกิจกรรม",

// Feed Link
feedLinkText: "ฟีดสำหรับรายการเหล่านี้",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} ข้อคิดเห็นเพิ่มเติม",
oneMoreCommentsText: "1 ข้อคิดเห็นเพิ่มเติม",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "แสดงข้อคิดเห็น ${0} ทั้งหมด ",
singleCommentText: "แสดงข้อคิดเห็น",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "ข้อคิดเห็นสำหรับ ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "ข้อคิดเห็นสำหรับ ${0} ใช้รายละเอียดเพิ่มเติมเพื่อแสดง ${1} ทั้งหมด",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "ไอเท็ม",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "สตรีมกิจกรรม",

// Filters
selectFilter: "เลือกตัวกรอง",
filterAriaDescription: "เลือกตัวกรองเพื่อเปลี่ยนชนิดของไอเท็มที่แสดงขึ้นบนสตรีมกิจกรรม",
filterAriaLabel: "กรองสตรีมกิจกรรม",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "กดปุ่ม enter เพื่อแสดงรายละเอียดเพิ่มเติมเกี่ยวกับไอเท็มนี้",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "แสดงการดำเนินการ",

ariaActionsToolbar: "การดำเนินการไอเท็ม",

// Description for EE opener
openEEText: "แสดงรายละเอียดเพิ่มเติมเกี่ยวกับไอเท็มนี้",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "ลบข้อความนี้",
statusRemoveConfirmMessageText: "คุณต้องการลบข้อความนี้หรือไม่?",
statusRemoveConfirmText: "ลบ",
statusRemoveCancelText: "การยกเลิก",
statusRemoveConfirmationMsg:  "ข้อความได้ถูกลบทิ้งแล้ว",
statusRemoveErrorMsg: "ไม่สามารถลบข้อความในเวลานี้ได้ ลองอีกครั้ง หรือติดต่อผู้ดูแลระบบ",
commentRemoveText: "ลบข้อคิดเห็นนี้",
commentRemoveConfirmMessageText: "คุณแน่ใจว่าต้องการลบข้อคิดเห็นนี้หรือ?",
commentRemoveConfirmText: "ลบ",
commentRemoveCancelText: "การยกเลิก",
commentRemoveConfirmationMsg: "ข้อคิดเห็นได้ถูกลบทิ้งแล้ว",
commentRemoveErrorMsg: "ไม่สามารถลบข้อคิดเห็นในเวลานี้ได้ ลองอีกครั้ง หรือติดต่อผู้ดูแลระบบ",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "อักขระที่เหลืออยู่",

// Message
msgCloseAlt: "ปิดข้อความ",

//More Less Link
showMoreText: "แสดงเพิ่มเติม",
showLessText: "แสดงน้อยลง",
showMoreActions: "เพิ่มเติม...",

ariaShowMoreLabel: "ปุ่มนี้ใช้เพื่อแสดงเนื้อหาที่ถูกซ่อนไว้ไม่ให้แสดงผล ไม่เกี่ยวข้องกับผู้ใช้เทคโนโลยีความช่วยเหลือ",


//Tags
listTags: "${0} และ ${1} อื่นๆ",

//Trends
expandTrend: "ขยายตัวกรองแนวโน้ม",
collapseTrend: "ยุบตัวกรองแนวโน้ม",
trendTitle: "แนวโน้ม",
relatedTrendTitle: "เพิ่มแนวโน้ม ''${0}''",
trendHelp: "วิธีใช้ความนิยม",
closeTrendHelp: "ปิดวิธีใช้ความนิยม",
trendDescription: "แนวโน้มคือคีย์เวิร์ดที่สร้างขึ้นโดยระบบเพื่อทำให้ง่ายต่อการดำเนินการค้นหาในอัพเดตสถานะ คลิกแนวโน้มเพื่อแสดงผลลัพธ์การค้นหาที่ได้ถูกกำหนดให้กับคีย์เวิร์ดนั้นแล้ว",
noTrends: "ยังไม่มีแนวโน้ม",
selectedTrends: "แนวโน้มที่เลือกไว้",
relatedTrends: "แนวโน้มที่เกี่ยวข้อง",
relatedTrendsDesc: "เพิ่มแนวโน้มที่เกี่ยวข้องกับการกรองการค้นหาเพิ่มเติม",
removeTrend: "ลบแนวโน้ม ''${0}'' ออกจากแนวโน้มตัวกรองที่เลือก",
removeGeneric: "ลบออก",
removeHashtag: "ลบ ${0} แฮชแท็กอกจากแท็กตัวกรองที่เลือก",

//ActivityStream search
asSearchLabel: "ค้นหาสตรีมปัจจุบัน",
asSearchShadowtext: "ค้นหาสตรีมนี้",
asSearchBarOpen: "เปิดแถบค้นหาเพื่อค้นหามุมมองปัจจุบัน",
asSearchBarCancel: "ยกเลิกการค้นหา และกลับไปยังมุมมองหลัก",
asSearch: "การค้นหา",
asSearchGlobalView: "ดูผลลัพธ์การค้นหาจากเนื้อหาของคุณทั้งหมด",

matching: "การจับคู่:",
matchingAllOf: "การจับคู่ทั้งหมดของ:",


//ViewAll extension
viewAllUpdates: "ดูการอัพเดตทั้งหมด",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} ถูกกล่าวถึง",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} ถูกกล่าวถึง",

// String for new filter
filterMention: "@Mentions",

// Aria string for mentions
ariaFilterMention: "การกล่าวถึง",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} เวลา ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "วันนี้ที่ ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "เมื่อวาน เวลา ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "พรุ่งนี้เมื่อ ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "ทั้งหมด",
filterStatusUpdates: "การอัพเดตสถานะ",
filterActivities: "กิจกรรม",
filterBlogs: "บล็อก",
filterBookmarks: "บุ๊กมาร์ก",
filterCommunities: "ชุมชน",
filterFiles: "ไฟล์",
filterForums: "ฟอรัม",
filterPeople: "บุคคล",
filterProfiles: "โปรไฟล์",
filterWikis: "วิกิ",
filterTags: "แท็ก",
filterLibraries: "ไลบรารี",
filterMyNetworkAndPeopleIFollow: "เครือข่ายของฉันและผู้คนที่ฉันติดตาม",
filterMyNetwork: "เครือข่ายของฉัน",
filterPeopleIFollow: "ผู้คนที่ฉันติดตาม",
filterMyUpdates: "อัพเดตของฉัน",
filterCommunitiesIFollow: "ชุมชนที่ฉันติดตาม",
filterForMe: "สำหรับฉัน",
filterFromMe: "จากฉัน",

// Label for filters - used by gadget
viewFilterLabel: "มุมมองย่อย:",
filterOneLabel: "กรองโดย:",
filterTwoLabel: "แสดง:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "ฉันกำลังติดตาม",
viewStatusUpdates: "การอัพเดตสถานะ",
viewActionRequired: "แอ็คชันที่ต้องการ",
viewSaved: "บันทึกแล้ว",
viewMyNotifications: "การแจ้งเตือนของฉัน",
viewDiscover: "สำรวจ",
viewRecentUpdates: "อัพเดตล่าสุด",

// Aria label for As View Side Nav
ariaASViews: "มุมมองสตรีมของกิจกรรม",

selectedLabel: "ถูกเลือก",

// Gadget title
asTitle: "อัพเดตการเชื่อมต่อ",

// Used by gadget in Notes
updatesFromSender: "อัพเดตจากผู้ส่ง",
updatesFromContact: "อัพเดตจากผู้ติดต่อ",
updatesForUser: "อัพเดตสำหรับผู้ใช้",
updatesFor: "อัพเดตสำหรับ ${0}",
noUser: "ไม่พบผู้ใช้สำหรับอีเมลแอดเดรสนี้: ${0}",
returnMainView: "กลับไปยัง",

//External Application Text
externalApplication: "แอ็พพลิเคชันภายนอก",

//Strings for expanding comments inline
showPreviousComments: "แสดงข้อคิดเห็นก่อนหน้านี้...",
hideAdditionalComments: "ซ่อนข้อคิดเห็นเพิ่มเติม...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} จาก ${1}",
errorRetrieveComments: "มีข้อผิดพลาดเกิดขึ้นขณะดึงข้อมูลข้อคิดเห็นก่อนหน้านี้",
errorRetrieveCommentsDeleted: "มีข้อผิดพลาดเกิดขึ้นขณะดึงข้อมูลข้อคิดเห็นก่อนหน้านี้ ไอเท็มอาจถูกลบออกแล้ว",

// News Item Actions - Repost
repostText: "โพสต์ซ้ำ",
logInRepostText: "ล็อกอินเพื่อรีโพสต์",
repostMsgSuccess: "อัพเดตถูกโพสต์ไปยังผู้ติดตามของคุณอีกครั้งเรียบร้อยแล้ว",
repostMsgFail: "มีข้อผิดพลาดในการรีโพสต์ข้อความนี้",
repostMsgErrorResGeneric: "คุณไม่ได้รับอนุญาตให้รีโพสต์ข้อความนี้",
repostMsgErrorRestricted: "ไม่สามารถโพสต์ข้อความนี้ใหม่เนื่องจากขณะนี้ ชุมชน ${0} เป็น Restricted Community",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" คลิกที่นี่เพื่อค้นหาแท็ก ${0} ",

// a11y information about the link opening on a new window
opensInNewWindow: "ลิงก์นี้จะเปิดในหน้าต่างใหม่",
attachFile : "เพิ่มไฟล์",
removeFileAttachment: "ลบไฟล์ที่แนบออก",

// External users 
externalUsersCommentsMsg: "ข้อคิดเห็นอาจมองเห็นได้โดยบุคคลภายนอกองค์กรของคุณ",
externalUsersStatusUpdatesMsg: "การอัพเดตสถานะอาจเห็นโดยบุคคลภายนอกองค์กรของคุณ",
externalUsersItemMsg: "แบ่งใช้ภายนอก",

// Notifications Center
ariaNotificationCenter: "ศูนย์การแจ่งเตือน -  ดูอัพเดตและข้อคิดเห็นที่เกี่ยวข้องกับเนื้อหาของคุณ และการแจ้งเตือนที่คุณได้รับ",
allNotifications : "การแจ้งเตือนทั้งหมด",
seeAllNotifications : "ดูทั้งหมด",
ariaSeeAllNotifications : "คลิกที่นี่เพื่อไปที่มุมมองการแจ้งเตือนของฉันในโฮมเพจ",
notificationsTitle : "การแจ้งเตือน",
notificationsSettings : "การตั้งค่า",
ariaNotificationsSettings : "คลิกที่นี่เพื่อไปที่หน้าการตั้งค่าการแจ้งเตือน",
ariaNewNotification : "สร้างหัวเรื่องการแจ้งเตือน ${0}",
newNotifications: "${0} การแจ้งเตือนใหม่",
loadingNotifications: "กำลังโหลด...",
noNewNotifications: "คุณไม่ได้รับการแจ้งเตือนใดๆ ในสัปดาห์ที่แล้ว",
markRead: "ทำเครื่องหมายอ่านแล้ว",
markUnread: "ทำเครื่องหมายยังไม่ได้อ่าน",
markAllRead: "ทำเครื่องหมายอ่านแล้วทั้งหมด",
markAllReadDetails: "คลิกที่นี่เพื่อทำเครื่องหมายการแจ้งเตือนทั้งหมดเป็นอ่านแล้ว",
notificationPopupSingleGeneric: "คุณมี 1 การแจ้งเตือนใหม่",
notificationPopupGeneric: "คุณมี ${0} การแจ้งเตือนใหม่"
});

