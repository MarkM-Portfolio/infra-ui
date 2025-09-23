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
loadingText: "‏تحميل...‏",

//common strings
errorText: "خطأ",

invalidASConfig: "حدث خطأ في توصيف تسلسل التحديثات. برجاء الاتصال بمسؤول النظام الخاص بك.",

// News Item
// ${0}  :  Person display name
photoOfText: "صورة الى ${0}",
// ${0}  :  Application
eventFromText: "الحدث من ${0}",
removeNewsItemText: "حذف هذا البند ",
// ${0}  :  Number of likes for a news item
tagsText: "شارات التعليم: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} مرات اعجاب",
likeText: "علامة اعجاب واحدة",
imageNotAvailable: "المعاينة غير متاحة حاليا",
likeError: "حدث خطأ أثناء الاعجاب بهذا البند.",
unLikeError: "حدث خطأ أثناء الغاء الاعجاب بهذا البند.",
// ${0} author name
fromText: "من: ${0}",

sizeMB: "${0} ميجابايت",
sizeGB: "${0} جيجابايت",
sizeKB: "${0} كيلوبايت",

//File download strings
downloadError: "خطأ في التنزيل",
downloadErrorMessage: "لا يمكن تنزيل الملف على الحاسب. قد يكون تم حذفه، أو لا يتوافر لديك امكانية التوصل اليه.",
closeText: "اغلاق",
okText: "‏حسنا‏",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "هذا رابط الى ملف بيانات تعريف ${0}",

// Files News Items
publicText: "عام",
privateText: "خاص",

// Video Preview
ariaPlayVideo: "تشغيل الفيديو",
ariaVideoArea: "مساحة الفيديو، اضغط ENTER للتوصل الى وحدات تحكم الفيديو",

// News Item Actions - Comment
commentText: "‏تعقيب‏",
logInText: "بدءالاتصال",
logInCommentText: "تسجيل الدخول للتعقيب",
deleteCommentText: "حذف تعقيب",
addCommentText: "اضافة تعقيب...",
ariaAddCommentText: "اضافة تعقيب",
writeCommentText: "ادخل أي شيء...",
ariaCommentText: "أكتب أي شيء",
commentNotPermittedText: "لا يتوافر لديك الصلاحية لادخال تعقيبات على هذه الرسالة.",
commentFailureText: "فشل في محاولة اضافة تعقيب نصي. برجاء تجديد الصفحة الخاصة بك ثم أعد المحاولة.",
commentSessionTimedOut: "لقد تم تسجيل خروجك آليا من وحدة الخدمة بسبب عدم الفعالية. قم بنسخ النص الذي قمت بادخاله في المسودة بحيث لا تفقده، ثم <a href : ''${0}''>قم بتسجيل الدخول</a> للبدء مرة أخرى.",
commentPostText: "ارسال",
commentCancelText: "الغاء",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "التعقيب طويل جدا ولا يمكن ارساله. برجاء تغيير التعقيب وأعد المحاولة.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "تم ارسال التعقيب الخاص بك.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "قام ${0} بكتابة تعقيب على ${1}",
// same as above, but for replies
replyAriaLabel: "قام ${0} بكتابة رد في ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "مشاهدة البند في نافذة جديدة في الصفحة ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "قام ${0} بكتابة تعقيب على ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "قام ${0} بكتابة رد في ${1}",

// News Item Actions - Save
savedText: "تم الحفظ",
savedSuccessText: "تم الحفظ بنجاح",

// No Content Item
noContentText: "لا توجد تحديثات ليتم عرضها.",

// News Feed Error
feedErrorText: "هناك خطأ في استرجاع وحدة المعلومات المسترجعة للأخبار.",
itemErrorText: "حدث خطأ أثناء عرض أحد البنود في المعلومات المسترجعة الخاصة بك.",
errorAlt : "خطأ:",
errorShowMore: "عرض المزيد",
errorShowLess: "عرض أقل",

// Paging Handler
backToTopText: "العودة لأعلى",
ariaShowMore: "عرض المزيد من بنود تسلسل النشاط",
ariaShowLess: "عرض عدد أقل من بنود تسلسل النشاط",
ariaBackToTop: "العودة الى أعلى بنود تسلسل النشاط",

// Feed Link
feedLinkText: "وحدة المعلومات المسترجعة لهذه الادخالات",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} من التعقيبات الأخرى",
oneMoreCommentsText: "1 من التعقيبات الأخرى",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "عرض كل ${0} من التعقيبات ",
singleCommentText: "عرض التعقيب",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "تعقيبات الى ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "التعقيبات عن ${0} . قم باستخدام مزيد من التفاصيل لعرض ${1} تعقيب (تعقيبات) كلها.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "بند",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "تسلسل النشاط",

// Filters
selectFilter: "تحديد مرشح",
filterAriaDescription: "حدد مرشح بيانات لتغيير نوع البنود التي يتم عرضها في تسلسل النشاط",
filterAriaLabel: "ترشيح تسلسل النشاط",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "اضغط مفتاح enter لعرض المزيد من التفاصيل عن هذا البند",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "عرض التصرفات",

ariaActionsToolbar: "تصرفات البند",

// Description for EE opener
openEEText: "عرض مزيد من التفاصيل عن هذا البند",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "حذف هذه الرسالة",
statusRemoveConfirmMessageText: "هل أنت متأكد من أنك تريد حذف هذه الرسالة؟",
statusRemoveConfirmText: "‏حذف ‏",
statusRemoveCancelText: "الغاء",
statusRemoveConfirmationMsg:  "تم حذف الرسالة بنجاح.",
statusRemoveErrorMsg: "لا يمكن حذف الرسالة في الوقت الحالي. حاول مرة أخرى أو قم بالاتصال بمسؤول النظام.",
commentRemoveText: "حذف هذا التعقيب",
commentRemoveConfirmMessageText: "هل تريد حذف هذا التعقيب بالفعل؟",
commentRemoveConfirmText: "‏حذف ‏",
commentRemoveCancelText: "الغاء",
commentRemoveConfirmationMsg: "تم حذف التعقيب بنجاح.",
commentRemoveErrorMsg: "لا يمكن حذف التعقيب في الوقت الحالي. حاول مرة أخرى أو قم بالاتصال بمسؤول النظام.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "الحروف المتبقية",

// Message
msgCloseAlt: "اغلاق رسالة",

//More Less Link
showMoreText: "عرض المزيد",
showLessText: "عرض أقل",
showMoreActions: "‏المزيد‏...",

ariaShowMoreLabel: "يتم استخدام هذا المفتاح لعرض المحتويات التى تم اخفاؤها لأغراض العرض. لا صلة لذلك بمستخدمى تقنية مساعدة.",


//Tags
listTags: "${0} و ${1} أخرى",

//Trends
expandTrend: "عرض مرشح الأهداف",
collapseTrend: "طي مرشح الأهداف",
trendTitle: "الأهداف",
relatedTrendTitle: "اضافة الاتجاه ''${0}''",
trendHelp: "مساعدة عن التوجهات",
closeTrendHelp: "اغلاق المساعدة عن التوجهات",
trendDescription: "الاتجاه هو عبارة عن كلمة مرشدة يتم تكوينها من خلال النظام لتسهيل البحث في تحديثات الحالة. اضغط على أحد الأهداف لعرض نتائج البحث التي تم تخصيص هذه الكلمة المرشدة لها.",
noTrends: "لا توجد توجهات بعد",
selectedTrends: "التوجهات المحددة",
relatedTrends: "التوجهات المتعلقة",
relatedTrendsDesc: "قم باضافة الاتجاه المتعلق لمزيد من التنقيح لعملية البحث الخاصة بك",
removeTrend: "قم بازالة الاتجاه ''${0}'' من اتجاهات ترشيح البيانات المحددة",
removeGeneric: "‏ازالة‏",
removeHashtag: "قم بازالة علامة التصنيف ${0} من شارات الترشيح المحددة.",

//ActivityStream search
asSearchLabel: "بحث تسلسل المخرجات الحالي",
asSearchShadowtext: "بحث تسلسل المخرجات هذا",
asSearchBarOpen: "قم بفتح خط البحث لبحث المشاهدة الحالية",
asSearchBarCancel: "الغاء البحث والعودة الى المشاهدة الرئيسية",
asSearch: "‏بحث‏",
asSearchGlobalView: "مشاهدة نتائج البحث من كل المحتويات الخاصة بك",

matching: "المطابقة:",
matchingAllOf: "مطابقة كل:",


//ViewAll extension
viewAllUpdates: "مشاهدة كل التحديثات",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "تم ذكر ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "تم ذكر ${0}",

// String for new filter
filterMention: "‏‎@Mentions‎‏",

// Aria string for mentions
ariaFilterMention: "حالات الاشارة",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} في ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "اليوم في ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}، ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "أمس في ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "غدا في ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "كل",
filterStatusUpdates: "تحديثات الحالة",
filterActivities: "الأنشطة",
filterBlogs: "المدونات",
filterBookmarks: "علامات التوقف",
filterCommunities: "مجتمعات",
filterFiles: "الملفات",
filterForums: "منتدى المناقشات",
filterPeople: "أشخاص",
filterProfiles: "ملفات البيانات",
filterWikis: "صفحات Wikis",
filterTags: "شارات تعليم",
filterLibraries: "المكتبات",
filterMyNetworkAndPeopleIFollow: "شبكة الاتصال الخاصة بي والأشخاص الذين أقوم بتتبعهم",
filterMyNetwork: "شبكةالاتصال الخاصة بي",
filterPeopleIFollow: "الأشخاص الذي أقوم بتتبعهم",
filterMyUpdates: "التحديثات الخاصة بي",
filterCommunitiesIFollow: "المجتمعات التي أقوم بتتبعها",
filterForMe: "لي",
filterFromMe: "مني",

// Label for filters - used by gadget
viewFilterLabel: "المشاهدة الفرعية:",
filterOneLabel: "ترشيح بواسطة:",
filterTwoLabel: "عرض:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "أعد متابع",
viewStatusUpdates: "تحديثات الحالة",
viewActionRequired: "مطلوب تصرف",
viewSaved: "تم الحفظ",
viewMyNotifications: "الاعلامات الخاصة بي",
viewDiscover: "اكتشاف",
viewRecentUpdates: "أحدث التحديثات",

// Aria label for As View Side Nav
ariaASViews: "مشاهدات تسلسل حروف النشاط",

selectedLabel: "محدد",

// Gadget title
asTitle: "تحديثات الاتصالات",

// Used by gadget in Notes
updatesFromSender: "التحديثات من الراسل",
updatesFromContact: "التحديثات من جهة الاتصال",
updatesForUser: "التحديثات من المستخدم",
updatesFor: "التحديثات الى ${0}",
noUser: "لم يتم ايجاد أي مستخدم لعنوان البريد الالكتروني هذا: ${0}",
returnMainView: "عودة",

//External Application Text
externalApplication: "تطبيق خارجي",

//Strings for expanding comments inline
showPreviousComments: "عرض التعقيبات السابقة...",
hideAdditionalComments: "اخفاء التعقيبات الاضافية...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} من ${1}",
errorRetrieveComments: "حدث خطأ أثناء استرجاع التعقيبات السابقة.",
errorRetrieveCommentsDeleted: "حدث خطأ أثناء استرجاع التعقيبات السابقة. قد يكون تم حذف البند.",

// News Item Actions - Repost
repostText: "اعادة الارسال",
logInRepostText: "تسجيل الدخول لاعادة الارسال",
repostMsgSuccess: "تم استعادة التحديث للمتابعين لك.",
repostMsgFail: "حدث خطأ أثناء اعادة ارسال هذه الرسالة.",
repostMsgErrorResGeneric: "لا يتوافر لديك الصلاحية لاعادة ارسال هذه الرسالة.",
repostMsgErrorRestricted: "لا يمكن اعادة ارسال هذه الرسالة حيث أن المجتمع ${0} حاليا يعد مجتمع مقيد.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" اضغط هنا للبحث عن شارة التعليم ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "سيتم فتح هذا الرابط في نافذة جديدة.",
attachFile : "اضافة ملف",
removeFileAttachment: "ازالة مرفقات الملف",

// External users 
externalUsersCommentsMsg: "يمكن مشاهدة التعقيبات بواسطة أشخاص خارجين بالنسبة للمؤسسة الخاصة بك.",
externalUsersStatusUpdatesMsg: "يمكن مشاهدة تحديثات الحالة بواسطة أشخاص خارجين بالنسبة للمؤسسة الخاصة بك.",
externalUsersItemMsg: "تتم المشاركة خارجيا",

// Notifications Center
ariaNotificationCenter: "مركز الاعلام - مشاهدة التحديثات المتعلقة بالمحتوى الخاص بك والاعلامات التي تم استلامها",
allNotifications : "كل الاعلامات",
seeAllNotifications : "مشاهدة كل",
ariaSeeAllNotifications : "اضغط هنا للانتقال الى مشاهدة الاعلامات الخاصة بي في الصفحة الرئيسية",
notificationsTitle : "الاعلامات",
notificationsSettings : "المحددات",
ariaNotificationsSettings : "اضغط هنا للانتقال الى صفحة محددات الاعلامات",
ariaNewNotification : "عنوان اعلام جديد. ${0}",
newNotifications: "${0} اعلامات جديدة",
loadingNotifications: "‏تحميل...‏",
noNewNotifications: "لم يتم استلام أية اعلامات في الأسبوع الماضي.",
markRead: "تعليم كمقروء",
markUnread: "تعليم كغير مقروء",
markAllRead: "تعليم الكل كمقروء",
markAllReadDetails: "اضغط هنا لتعليم كل الاعلامات كمقروة.",
notificationPopupSingleGeneric: "لديك اعلام واحد جديدة",
notificationPopupGeneric: "لديك ${0} من الاعلامات الجديدة"
});

