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
loadingText: "Yükleniyor...",

//common strings
errorText: "Hata",

invalidASConfig: "Güncelleştirmeler akışı için yapılandırmayla ilgili bir sorun oluştu. Lütfen yöneticinize başvurun.",

// News Item
// ${0}  :  Person display name
photoOfText: "${0} adlı kişinin fotoğrafı",
// ${0}  :  Application
eventFromText: "Etkinlik: ${0}",
removeNewsItemText: "Bu öğeyi sil ",
// ${0}  :  Number of likes for a news item
tagsText: "Etiketler: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} beğenme",
likeText: "1 beğenme",
imageNotAvailable: "Önizleme şu anda kullanılamıyor",
likeError: "Bu öğe beğenilirken bir hata oluştu.",
unLikeError: "Bu öğenin beğenilmesinden vazgeçilirken bir hata oluştu.",
// ${0} author name
fromText: "Gönderen: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Karşıdan Yükleme Hatası",
downloadErrorMessage: "Dosya karşıdan yüklenemedi. Silinmiş olabilir ya da dosyaya erişiminiz olmayabilir.",
closeText: "kapat",
okText: "Tamam",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Bu, ${0} kullanıcısının profil bağlantısıdır",

// Files News Items
publicText: "Genel",
privateText: "Özel",

// Video Preview
ariaPlayVideo: "Videoyu Oynat",
ariaVideoArea: "Video alanı, video denetleyicilerine erişmek için ENTER tuşuna basın.",

// News Item Actions - Comment
commentText: "Yorum",
logInText: "Oturum Aç",
logInCommentText: "Yorum yapmak için oturum açın",
deleteCommentText: "Yorumu sil",
addCommentText: "Yorum ekle...",
ariaAddCommentText: "Yorum ekle",
writeCommentText: "Bir şey yazın...",
ariaCommentText: "Bir şey yazın",
commentNotPermittedText: "Bu iletiye yorum yapma yetkiniz yok.",
commentFailureText: "Yorum metni ekleme girişimi başarısız oldu. Lütfen sayfanızı yenileyin ve yeniden deneyin.",
commentSessionTimedOut: "Etkinlik dışı durum nedeniyle sunucu oturumunuz otomatik olarak kapandı. Girdiğiniz metni kaybetmemek için panonuza kopyalayın ve daha sonra baştan başlamak için <a href : ''${0}''>oturum açın</a>.",
commentPostText: "Gönder",
commentCancelText: "İptal",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Yorum gönderilmek için çok uzun. Lütfen yorumu düzeltip yeniden deneyin.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Yorumunuz gönderildi.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0}, ${1} tarihinde bir yorum yaptı",
// same as above, but for replies
replyAriaLabel: "${0}, ${1} tarihinde bir yanıt yazdı",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Öğeyi şu sayfada yeni pencerede görüntüle: ${0} ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0}, şu saatte bir yorum yaptı: ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0}, şu saatte bir yanıt yazdı: ${1}",

// News Item Actions - Save
savedText: "Kaydedilenler",
savedSuccessText: "Başarıyla Kaydedildi",

// No Content Item
noContentText: "Görüntülenecek güncelleştirme yok.",

// News Feed Error
feedErrorText: "Haber özet akışınız alınırken bir hata oluştu.",
itemErrorText: "Özet akışınızdaki bir öğe görüntülenirken hata oluştu.",
errorAlt : "Hata:",
errorShowMore: "Daha fazla göster",
errorShowLess: "Daha az göster",

// Paging Handler
backToTopText: "Başa dön",
ariaShowMore: "Daha fazla etkinlik akışı öğesi göster",
ariaShowLess: "Daha az etkinlik akışı öğesi göster",
ariaBackToTop: "Etkinlik akışı öğelerinin başına dön",

// Feed Link
feedLinkText: "Bu girdiler için özet akışı",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} yorum daha",
oneMoreCommentsText: "1 yorum daha",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Tüm ${0} yorumu göster ",
singleCommentText: "Yorumu göster",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "${0} için yorumlar",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "${0} ile ilgili yorumlar. ${1} yorumun tümünü göstermek için daha fazla ayrıntı kullanın.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "öğe",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Etkinlik Akışı",

// Filters
selectFilter: "Bir süzgeç seçin",
filterAriaDescription: "Etkinlik Akışında gösterilen öğelerin türünü değiştirmek için bir süzgeç seçin",
filterAriaLabel: "Etkinlik akışına süzgeç uygulayın",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Bu öğeyle ilgili daha fazla ayrıntı göstermek için Enter tuşuna basın",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Eylemleri Göster",

ariaActionsToolbar: "Öğe İşlemleri",

// Description for EE opener
openEEText: "Bu öğe hakkında daha fazla ayrıntı göster",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Bu İletiyi Sil",
statusRemoveConfirmMessageText: "Bu iletiyi silmek istediğinizden emin misiniz?",
statusRemoveConfirmText: "Delete",
statusRemoveCancelText: "İptal",
statusRemoveConfirmationMsg:  "İleti başarıyla silindi.",
statusRemoveErrorMsg: "İleti şu anda silinemedi. Yeniden deneyin ya da yöneticiye başvurun.",
commentRemoveText: "Bu Yorumu Sil",
commentRemoveConfirmMessageText: "Bu yorumu silmek istediğinizden emin misiniz?",
commentRemoveConfirmText: "Delete",
commentRemoveCancelText: "İptal",
commentRemoveConfirmationMsg: "Yorum başarıyla silindi.",
commentRemoveErrorMsg: "Yorum şu anda silinemedi. Yeniden deneyin ya da yöneticiye başvurun.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Kalan Karakterler",

// Message
msgCloseAlt: "İletiyi kapat",

//More Less Link
showMoreText: "Daha fazla göster",
showLessText: "Daha az göster",
showMoreActions: "Diğer...",

ariaShowMoreLabel: "Bu düğme, gizlenen içeriği görüntülemek için kullanılır. Yardımcı teknoloji kullanıcıları için geçerli değildir.",


//Tags
listTags: "${0} ve ${1} daha",

//Trends
expandTrend: "Eğilimler süzgecini genişlet",
collapseTrend: "Eğilimler süzgecini daralt",
trendTitle: "Eğilimler",
relatedTrendTitle: "''${0}'' eğilimini ekle",
trendHelp: "Eğilim Yardımı",
closeTrendHelp: "Eğilim Yardımını Kapat",
trendDescription: "Eğilim, Durum Güncelleştirmeleri içinde arama yapılmasını kolaylaştırmak için sistem tarafından oluşturulan bir anahtar sözcüktür. Bir eğilimi tıklatarak ilgili anahtar sözcüğe atanmış arama sonuçlarını görüntüleyebilirsiniz.",
noTrends: "Henüz herhangi bir eğilim yok",
selectedTrends: "Seçilen Eğilimler",
relatedTrends: "İlgili Eğilimler",
relatedTrendsDesc: "Aramanızı daha da daraltmak için ilgili bir eğilim ekleyin",
removeTrend: "''${0}'' eğilimini seçilen süzgeç eğilimlerinden kaldır",
removeGeneric: "Kaldır",
removeHashtag: "${0} etiketini seçili süzgeç etiketlerinden kaldırın.",

//ActivityStream search
asSearchLabel: "Geçerli akışta ara",
asSearchShadowtext: "Bu akışta ara",
asSearchBarOpen: "Geçerli görünümü Aramak için arama çubuğunu aç",
asSearchBarCancel: "Aramayı iptal et ve ana görünüme dön",
asSearch: "Ara",
asSearchGlobalView: "Tüm içeriğinizdeki arama sonuçlarını görüntüleyin",

matching: "Eşleşme:",
matchingAllOf: "Tümüyle eşleşen:",


//ViewAll extension
viewAllUpdates: "Tüm güncelleştirmeleri görüntüle",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} adlı kişiden söz edildi",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} adlı kişilerden söz edildi",

// String for new filter
filterMention: "@Söz Etmeler",

// Aria string for mentions
ariaFilterMention: "Söz Etmeler",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE}, ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Bugün, ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Dün, ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Yarın, ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Tümü",
filterStatusUpdates: "Durum Güncelleştirmeleri",
filterActivities: "Etkinlikler",
filterBlogs: "Web Günlükleri",
filterBookmarks: "Yer İşaretleri",
filterCommunities: "Topluluklar",
filterFiles: "Dosyalar",
filterForums: "Forumlar",
filterPeople: "Kişiler",
filterProfiles: "Profiller",
filterWikis: "Vikiler",
filterTags: "Etiketler",
filterLibraries: "Kitaplıklar",
filterMyNetworkAndPeopleIFollow: "Ağım ve İzlediğim Kişiler",
filterMyNetwork: "Ağım",
filterPeopleIFollow: "İzlediğim Kişiler",
filterMyUpdates: "Güncelleştirmelerim",
filterCommunitiesIFollow: "İzlediğim Topluluklar",
filterForMe: "Benim İçin",
filterFromMe: "Benden",

// Label for filters - used by gadget
viewFilterLabel: "Alt Görünüm:",
filterOneLabel: "Süzme Temeli:",
filterTwoLabel: "Göster:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "İzlediklerim",
viewStatusUpdates: "Durum Güncelleştirmeleri",
viewActionRequired: "İşlem Gerektirenler",
viewSaved: "Kaydedilenler",
viewMyNotifications: "Bildirimlerim",
viewDiscover: "Keşfet",
viewRecentUpdates: "En Son Güncelleştirmeler",

// Aria label for As View Side Nav
ariaASViews: "Etkinlik akışı görünümleri",

selectedLabel: "Seçili",

// Gadget title
asTitle: "Connections Güncelleştirmeleri",

// Used by gadget in Notes
updatesFromSender: "Gönderenden Alınan Güncelleştirmeler",
updatesFromContact: "Kişiden Alınan Güncelleştirmeler",
updatesForUser: "Kullanıcıya ilişkin güncelleştirmeler",
updatesFor: "${0} için güncelleştirmeler",
noUser: "Bu e-posta adresi için Kullanıcı bulunamadı: ${0}",
returnMainView: "Dönüş",

//External Application Text
externalApplication: "Dış Uygulama",

//Strings for expanding comments inline
showPreviousComments: "Önceki Yorumları Göster...",
hideAdditionalComments: "Ek Yorumları Gizle...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} / ${1}",
errorRetrieveComments: "Önceki yorumlar alınırken bir hata oluştu.",
errorRetrieveCommentsDeleted: "Önceki yorumlar alınırken bir hata oluştu. Öğe silinmiş olabilir.",

// News Item Actions - Repost
repostText: "Yeniden Gönder",
logInRepostText: "Yeniden göndermek için oturum açın",
repostMsgSuccess: "Güncelleştirme, izleyenlerinize başarıyla yeniden gönderildi.",
repostMsgFail: "Bu ileti yeniden gönderilirken bir hata oluştu.",
repostMsgErrorResGeneric: "Bu iletiyi yeniden gönderme yekiniz yok.",
repostMsgErrorRestricted: "${0} topluluğu Sınırlı Topluluk olduğundan bu ileti yeniden gönderilemiyor.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" ${0} etiketini aramak için burayı tıklatın. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Bu bağlantı yeni bir pencerede açılır.",
attachFile : "Dosya Ekle",
removeFileAttachment: "Dosya ekini kaldır",

// External users 
externalUsersCommentsMsg: "Yorumlar kuruluşunuz dışındaki kişiler tarafından görülebilir.",
externalUsersStatusUpdatesMsg: "Durum Güncelleştirmeleri kuruluşunuz dışındaki kişiler tarafından görülebilir.",
externalUsersItemMsg: "Dışarıda paylaşıldı",

// Notifications Center
ariaNotificationCenter: "Bildirim Merkezi - Aldığınız bildirimlerle ve içeriğinizle ilgili güncelleştirmeleri görüntüleyin",
allNotifications : "Tüm Bildirimler",
seeAllNotifications : "Tümünü Göster",
ariaSeeAllNotifications : "Giriş sayfasında Bildirimlerim Görünümü'ne gitmek için burayı tıklatın",
notificationsTitle : "Bildirimler",
notificationsSettings : "Ayarlar",
ariaNotificationsSettings : "Bildirim ayarları sayfasına gitmek için burayı tıklatın",
ariaNewNotification : "Yeni bildirim başlığı. ${0}",
newNotifications: "${0} yeni bildirim",
loadingNotifications: "Yükleniyor...",
noNewNotifications: "Geçen hafta bildirim almadınız.",
markRead: "Okundu olarak işaretle",
markUnread: "Okunmadı olarak işaretle",
markAllRead: "Tümünü okundu olarak işaretle",
markAllReadDetails: "Tüm bildirimleri okundu olarak işaretlemek için tıklatın.",
notificationPopupSingleGeneric: "1 yeni bildiriminiz var",
notificationPopupGeneric: "${0} yeni bildiriminiz var"
});

