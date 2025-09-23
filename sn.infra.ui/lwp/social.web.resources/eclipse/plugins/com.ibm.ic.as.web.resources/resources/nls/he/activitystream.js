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
loadingText: "טעינה...‏",

//common strings
errorText: "שגיאה",

invalidASConfig: "יש שגיאה בתצורה של זרם העדכונים. נא לפנות למנהלן.",

// News Item
// ${0}  :  Person display name
photoOfText: "תצלום של ${0}",
// ${0}  :  Application
eventFromText: "אירוע מתוך ${0}",
removeNewsItemText: "מחיקת פריט זה ",
// ${0}  :  Number of likes for a news item
tagsText: "תגים: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} סימוני ''אהבתי''",
likeText: "1 סימון 'אהבתי'",
imageNotAvailable: "תצוגה מקדימה אינה זמינה כרגע",
likeError: "אירעה שגיאה בנסיון להוסיף סימון 'אהבתי' לפריט.",
unLikeError: "אירעה שגיאה בנסיון להסיר סימון 'אהבתי' מפריט.",
// ${0} author name
fromText: "מאת: ${0}",

sizeMB: "${0} מ''''ב",
sizeGB: "${0} ג''''ב",
sizeKB: "${0} ק''''ב",

//File download strings
downloadError: "שגיאת הורדה",
downloadErrorMessage: "לא ניתן להוריד את הקובץ. יתכן שהוא נמחק, או שאין לכם גישה אליו.",
closeText: "סגירה",
okText: "אישור",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "זהו קישור אל הפרופיל של ${0}",

// Files News Items
publicText: "ציבור",
privateText: "פרטי",

// Video Preview
ariaPlayVideo: "הרצת וידיאו",
ariaVideoArea: "אזור וידיאו, לחצו על ENTER כדי לגשת לבקרי וידיאו",

// News Item Actions - Comment
commentText: "הערה",
logInText: "התחברות",
logInCommentText: "התחברו כדי להעיר",
deleteCommentText: "מחיקת הערה",
addCommentText: "הוספת הערה...‏",
ariaAddCommentText: "הוספת הערה",
writeCommentText: "כתבו משהו...‏",
ariaCommentText: "כתבו משהו",
commentNotPermittedText: "אינכם מורשים להעיר על הודעה זו.",
commentFailureText: "הנסיון להוסיף את ההערה נכשל. נא לרענן את הדף ולנסות שוב.",
commentSessionTimedOut: "נותקתם מהשרת אוטומטית בגלל חוסר פעילות. העתיקו תמליל שהקלדתם אל לוח הגזירים כדי שלא יאבד, ולאחר מכן <a href : ''${0}''>התחברו</a> כדי להתחיל מההתחלה.",
commentPostText: "פרסום",
commentCancelText: "ביטול",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "ההערה ארוכה מדי לפרסום. תקנו את ההערה ונסו שוב.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "ההערה פורסמה.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} כתב הערה בתאריך ${1}",
// same as above, but for replies
replyAriaLabel: "${0} כתב תשובה בתאריך ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "הצגת הפריט בחלון חדש בדף ''${0}''.‏ ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} כתב הערה בשעה ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} כתב תשובה בשעה ${1}",

// News Item Actions - Save
savedText: "נשמר",
savedSuccessText: "נשמר בהצלחה",

// No Content Item
noContentText: "אין עדכונים להצגה.‏",

// News Feed Error
feedErrorText: "היתה שגיאה באחזור ערוץ החדשות שלכם.",
itemErrorText: "אירעה שגיאה בהצגת הפריט בערוץ התוכן שלכם.",
errorAlt : "שגיאה:",
errorShowMore: "הצגת יותר",
errorShowLess: "הצגת פחות",

// Paging Handler
backToTopText: "בחזרה לראש",
ariaShowMore: "הצגת יותר פריטים בזרם הפעילויות",
ariaShowLess: "הצגת פחות פריטים בזרם הפעילויות",
ariaBackToTop: "בחזרה לראש פריטי זרם הפעילויות",

// Feed Link
feedLinkText: "ערוץ תוכן עבור רשומות אלה",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "עוד ${0} הערות",
oneMoreCommentsText: "עוד הערה 1",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "הצגת כל ${0} ההערות ",
singleCommentText: "הצגת הערה",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "הערות עבור ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "הערות עבור ${0}. השתמשו בפירוט גדול יותר כדי להציג את כל ${1} ההערות.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "פריט",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "זרם פעילויות",

// Filters
selectFilter: "בחירת מסנן",
filterAriaDescription: "בחרו מסנן כדי לשנות את סוג הפריטים המוצגים בזרם הפעילויות",
filterAriaLabel: "סינון זרם הפעילות",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "לחצו על המקש Enter כדי להציג עוד פרטים על פריט זה",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "הצגת פעולות",

ariaActionsToolbar: "פעולות פריט",

// Description for EE opener
openEEText: "הצגת פרטים נוספים על פריט זה",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "מחיקת הודעה זו",
statusRemoveConfirmMessageText: "אתם בטוחים שברצונכם למחוק הודעה זו?‏",
statusRemoveConfirmText: "מחיקה",
statusRemoveCancelText: "ביטול",
statusRemoveConfirmationMsg:  "ההודעה נמחקה בהצלחה.",
statusRemoveErrorMsg: "לא ניתן למחוק את ההערה כרגע. נסו שוב או פנו למנהלן.",
commentRemoveText: "מחיקת הערה זו",
commentRemoveConfirmMessageText: "אתם בטוחים שברצונכם למחוק הערה זו?‏",
commentRemoveConfirmText: "מחיקה",
commentRemoveCancelText: "ביטול",
commentRemoveConfirmationMsg: "ההערה נמחקה בהצלחה.",
commentRemoveErrorMsg: "לא ניתן למחוק את ההערה כרגע. נסו שוב או פנו למנהלן.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "תווים שנשארו",

// Message
msgCloseAlt: "סגירת ההודעה",

//More Less Link
showMoreText: "הצגת יותר",
showLessText: "הצגת פחות",
showMoreActions: "עוד...‏",

ariaShowMoreLabel: "לחצן זה משמש להצגת תוכן שהוסתר מהתצוגה. לא רלוונטי למשתמשי טכנולוגיה מסייעת.",


//Tags
listTags: "${0} ועוד ${1}",

//Trends
expandTrend: "הרחבת מסנן המגמות",
collapseTrend: "כיווץ מסנן המגמות",
trendTitle: "מגמות",
relatedTrendTitle: "הוספת המגמה ''${0}''",
trendHelp: "עזרה למגמות",
closeTrendHelp: "סגירת העזרה למגמות",
trendDescription: "מגמה היא מילת מפתח המופקת על ידי המערכת כדי להקל על ביצוע חיפושים בעדכוני מצב. לחצו על מגמה כדי להציג תוצאות חיפוש שמילת מפתח זו הוקצתה להן.",
noTrends: "עדיין אין מגמות",
selectedTrends: "מגמות שנבחרו",
relatedTrends: "מגמות קשורות",
relatedTrendsDesc: "הוסיפו מגמה קשורה כדי לחדד את החיפוש",
removeTrend: "סילוק המגמה ''${0}'' ממגמות המסנן שנבחרו",
removeGeneric: "לסלק את הקבוצה",
removeHashtag: "סילוק תג הסולמית ${0} מתגי המסנן הנבחרים.",

//ActivityStream search
asSearchLabel: "חיפוש בזרם הנוכחי.",
asSearchShadowtext: "חיפוש בזרם זה",
asSearchBarOpen: "פתיחת סרגל החיפוש כדי לחפש בזרם הנוכחי",
asSearchBarCancel: "ביטול החיפוש וחזרה לתצוגה הראשית",
asSearch: "חיפוש",
asSearchGlobalView: "הצגת תוצאות חיפוש מכל התוכן שלכם",

matching: "התאמות:",
matchingAllOf: "התאמה לכל:",


//ViewAll extension
viewAllUpdates: "הצגת כל העדכונים",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} אוזכר",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} אוזכרו",

// String for new filter
filterMention: "@אזכורים",

// Aria string for mentions
ariaFilterMention: "אזכורים",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} בשעה ${time}",
// e.g. June 6th
timeMonth: " ${d} ${MMM} ",
// e.g. Today at 11:23
timeToday: "היום בשעה ${time}",
// e.g. June 6th, 2011
timeYear: "${d} ${MMM}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "אתמול בשעה ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "מחר בשעה ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "הכל",
filterStatusUpdates: "עדכוני מצב",
filterActivities: "פעילויות",
filterBlogs: "בלוגים",
filterBookmarks: "סימניות",
filterCommunities: "קהילות",
filterFiles: "קבצים",
filterForums: "פורומים",
filterPeople: "אנשים",
filterProfiles: "פרופילים",
filterWikis: "אתרי ויקי",
filterTags: "תגים",
filterLibraries: "ספריות",
filterMyNetworkAndPeopleIFollow: "הרשת שלי ואנשים במעקב שלי",
filterMyNetwork: "הרשת שלי",
filterPeopleIFollow: "אנשים במעקב שלי",
filterMyUpdates: "העדכונים שלי",
filterCommunitiesIFollow: "קהילות במעקב שלי",
filterForMe: "אלי",
filterFromMe: "ממני",

// Label for filters - used by gadget
viewFilterLabel: "תת-תצוגה:",
filterOneLabel: "סינון לפי:",
filterTwoLabel: "הצגה:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "במעקב שלי",
viewStatusUpdates: "עדכוני מצב",
viewActionRequired: "פעולה דרושה",
viewSaved: "נשמר",
viewMyNotifications: "הדיווחים שלי",
viewDiscover: "איתור",
viewRecentUpdates: "עדכונים אחרונים",

// Aria label for As View Side Nav
ariaASViews: "תצוגות זרם פעילויות",

selectedLabel: "נבחר",

// Gadget title
asTitle: "עדכוני Connections",

// Used by gadget in Notes
updatesFromSender: "עדכונים מהשולח",
updatesFromContact: "עדכונים מאיש הקשר",
updatesForUser: "עדכונים עבור המשתמש",
updatesFor: "עדכונים עבור ${0}",
noUser: "לא נמצא משתמש עבור כתובת דואל זו: ‎${0}‎",
returnMainView: "חזרה",

//External Application Text
externalApplication: "יישום חיצוני",

//Strings for expanding comments inline
showPreviousComments: "הצגת הערות קודמות...",
hideAdditionalComments: "הסתרת הערות נוספות...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} מתוך ${1}",
errorRetrieveComments: "אירעה שגיאה באחזור הערות קודמות.",
errorRetrieveCommentsDeleted: "אירעה שגיאה באחזור הערות קודמות. ייתכן שהפריט נמחק.",

// News Item Actions - Repost
repostText: "פרסום חוזר",
logInRepostText: "התחברו כדי להגיש מחדש",
repostMsgSuccess: "העדכון פורסם מחדש בהצלחה לעוקבים שלכם.",
repostMsgFail: "אירעה שגיאה בפרסום מחדש של הודעה זו.",
repostMsgErrorResGeneric: "אינכם מורשים לפרסם מחדש הודעה זו.",
repostMsgErrorRestricted: "לא ניתן לפרסם את ההודעה מחדש מפני שהקהילה ${0} מוגדרת כעת כקהילה מוגבלת.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" לחצו כאן כדי לחפש את התג ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "קישור זה ייפתח בחלון חדש.",
attachFile : "הוספת קובץ",
removeFileAttachment: "סילוק צרופת קובץ",

// External users 
externalUsersCommentsMsg: "יתכן שאנשים מחוץ לארגון יראו את ההערות.",
externalUsersStatusUpdatesMsg: "יתכן שאנשים מחוץ לארגון יראו את עדכוני המצב.",
externalUsersItemMsg: "משותף חיצונית",

// Notifications Center
ariaNotificationCenter: "מרכז הדיווחים - הצגת עדכונים והערות הקשורים לתוכן שלכם ודיווחים שקיבלתם",
allNotifications : "כל הדיווחים",
seeAllNotifications : "הצגת הכל",
ariaSeeAllNotifications : "לחצו כאן כדי לעבור אל תצוגה 'הדיווחים שלי' בדף הבית.",
notificationsTitle : "דיווחים",
notificationsSettings : "הגדרות",
ariaNotificationsSettings : "לחצו כאן כדי לעבור לדף הגדרות הדיווחים",
ariaNewNotification : "כותרת דיווח חדש. ${0}",
newNotifications: "${0} דיווחים חדשים",
loadingNotifications: "טעינה...‏",
noNewNotifications: "לא קיבלתם דיווחים בשבוע האחרון.",
markRead: "סימון 'נקרא'",
markUnread: "סימון 'לא נקרא'",
markAllRead: "סימון 'נקרא' להכל",
markAllReadDetails: "לחצו כאן כדי לסמן אל כל הדיווחים בסימון 'נקרא'.",
notificationPopupSingleGeneric: "יש לכם 1 דיווח חדש",
notificationPopupGeneric: "יש לכם ${0} דיווחים חדשים"
});

