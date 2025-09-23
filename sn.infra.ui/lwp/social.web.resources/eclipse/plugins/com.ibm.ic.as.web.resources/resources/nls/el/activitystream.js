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
loadingText: "Φόρτωση...",

//common strings
errorText: "Σφάλμα",

invalidASConfig: "Υπάρχει σφάλμα στις ρυθμίσεις της ροής ενημερώσεων. Επικοινωνήστε με το διαχειριστή.",

// News Item
// ${0}  :  Person display name
photoOfText: "Φωτογραφία του χρήστη ${0}",
// ${0}  :  Application
eventFromText: "Συμβάν από ${0}",
removeNewsItemText: "Διαγραφή αυτού του στοιχείου ",
// ${0}  :  Number of likes for a news item
tagsText: "Προσδιοριστικά: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} θετικές γνώμες",
likeText: "1 θετική γνώμη",
imageNotAvailable: "Δεν υπάρχει διαθέσιμη προεπισκόπηση",
likeError: "Παρουσιάστηκε σφάλμα κατά την προσθήκη θετικής γνώμης για αυτό το στοιχείο.",
unLikeError: "Παρουσιάστηκε σφάλμα κατά την αναίρεση της θετικής γνώμης για αυτό το στοιχείο.",
// ${0} author name
fromText: "Από: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Σφάλμα μεταφόρτωσης",
downloadErrorMessage: "Δεν ήταν δυνατή η μεταφόρτωση του αρχείου. Μπορεί να έχει διαγραφεί ή να μην έχετε πρόσβαση σε αυτό.",
closeText: "κλείσιμο",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Αυτή είναι μια διασύνδεση προς το προφίλ του χρήστη ${0}",

// Files News Items
publicText: "Δημόσιο",
privateText: "Ιδιωτικό",

// Video Preview
ariaPlayVideo: "Αναπαραγωγή βίντεο",
ariaVideoArea: "Περιοχή βίντεο. Πατήστε ENTER για πρόσβαση στα στοιχεία ελέγχου βίντεο.",

// News Item Actions - Comment
commentText: "Σχόλιο",
logInText: "Συνδεθείτε",
logInCommentText: "Συνδεθείτε για να προσθέσετε ένα σχόλιο",
deleteCommentText: "Διαγραφή σχολίου",
addCommentText: "Προσθήκη σχολίου...",
ariaAddCommentText: "Προσθήκη σχολίου",
writeCommentText: "Γράψτε κάτι...",
ariaCommentText: "Γράψτε κάτι",
commentNotPermittedText: "Δεν έχετε εξουσιοδότηση για την προσθήκη σχολίων σε αυτό το μήνυμα.",
commentFailureText: "Απέτυχε η προσπάθεια προσθήκης σχολίου. Ανανεώστε τη σελίδα και προσπαθήστε ξανά.",
commentSessionTimedOut: "Αποσυνδεθήκατε αυτόματα από τον εξυπηρετητή λόγω αδράνειας. Για να μη χάσετε οποιοδήποτε περιεχόμενο έχετε ήδη καταχωρήσει, αντιγράψτε το στο πρόχειρο. Στη συνέχεια, <a href : ''${0}''>συνδεθείτε</a> ξανά για να συνεχίσετε την εργασία σας.",
commentPostText: "Ανάρτηση",
commentCancelText: "Ακύρωση",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Το σχόλιο δεν μπορεί να προστεθεί γιατί έχει πολύ μεγάλο μήκος. Διορθώστε το σχόλιο και προσπαθήστε ξανά.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Το σχόλιό σας αναρτήθηκε.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "Ο χρήστης ${0} πρόσθεσε ένα σχόλιο στις ${1}.",
// same as above, but for replies
replyAriaLabel: "Ο χρήστης ${0} πρόσθεσε μια απάντηση στις ${1}.",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Προβολή στοιχείου σε νέο παράθυρο στη σελίδα ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "Ο χρήστης ${0} πρόσθεσε ένα σχόλιο στις ${1}.",
// same as above, but for replies
replyAriaLabelSameDay: "Ο χρήστης ${0} πρόσθεσε μια απάντηση στις ${1}.",

// News Item Actions - Save
savedText: "Αποθηκευμένα",
savedSuccessText: "Αποθηκεύτηκε με επιτυχία",

// No Content Item
noContentText: "Δεν υπάρχουν ενημερώσεις για εμφάνιση.",

// News Feed Error
feedErrorText: "Παρουσιάστηκε σφάλμα κατά την ανάκτηση της υπηρεσίας διανομής ειδήσεων.",
itemErrorText: "Παρουσιάστηκε σφάλμα κατά την εμφάνιση ενός στοιχείου στην υπηρεσία διανομής.",
errorAlt : "Σφάλμα:",
errorShowMore: "Εμφάνιση περισσότερων",
errorShowLess: "Εμφάνιση λιγότερων",

// Paging Handler
backToTopText: "Επιστροφή στην αρχή",
ariaShowMore: "Εμφάνιση περισσότερων στοιχείων ροής δραστηριοτήτων",
ariaShowLess: "Εμφάνιση λιγότερων στοιχείων ροής δραστηριοτήτων",
ariaBackToTop: "Επιστροφή στην αρχή των στοιχείων ροής δραστηριοτήτων",

// Feed Link
feedLinkText: "Διανομή περιεχομένου για αυτές τις καταχωρήσεις",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} επιπλέον σχόλια",
oneMoreCommentsText: "1 επιπλέον σχόλιο",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Εμφάνιση και των ${0} σχολίων ",
singleCommentText: "Εμφάνιση σχολίου",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Σχόλια για ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Σχόλια για ${0}. Επιλέξτε την προβολή λεπτομερειών για να δείτε και τα ${1} σχόλια.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "στοιχείο",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Ροή δραστηριοτήτων",

// Filters
selectFilter: "Επιλογή φίλτρου",
filterAriaDescription: "Επιλέξτε ένα φίλτρο για να αλλάξετε το είδος των στοιχείων που εμφανίζονται στη ροή δραστηριοτήτων",
filterAriaLabel: "Φιλτράρισμα ροής δραστηριοτήτων",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Πατήστε το πλήκτρο Enter για να εμφανιστούν περισσότερες λεπτομέρειες για αυτό το στοιχείο",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Εμφάνιση ενεργειών",

ariaActionsToolbar: "Ενέργειες στοιχείου",

// Description for EE opener
openEEText: "Εμφάνιση περισσότερων λεπτομερειών για αυτό το στοιχείο",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Διαγραφή αυτού του μηνύματος",
statusRemoveConfirmMessageText: "Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτό το μήνυμα;",
statusRemoveConfirmText: "Διαγραφή",
statusRemoveCancelText: "Ακύρωση",
statusRemoveConfirmationMsg:  "Το μήνυμα διαγράφηκε με επιτυχία.",
statusRemoveErrorMsg: "Δεν ήταν δυνατή η διαγραφή του μηνύματος. Προσπαθήστε ξανά ή επικοινωνήστε με έναν διαχειριστή.",
commentRemoveText: "Διαγραφή αυτού του σχολίου",
commentRemoveConfirmMessageText: "Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτό το σχόλιο;",
commentRemoveConfirmText: "Διαγραφή",
commentRemoveCancelText: "Ακύρωση",
commentRemoveConfirmationMsg: "Το σχόλιο διαγράφηκε με επιτυχία.",
commentRemoveErrorMsg: "Δεν ήταν δυνατή η διαγραφή του σχολίου. Προσπαθήστε ξανά ή επικοινωνήστε με έναν διαχειριστή.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Εναπομείναντες χαρακτήρες",

// Message
msgCloseAlt: "Κλείσιμο μηνύματος",

//More Less Link
showMoreText: "Εμφάνιση περισσότερων",
showLessText: "Εμφάνιση λιγότερων",
showMoreActions: "Περισσότερα...",

ariaShowMoreLabel: "Αυτό το κουμπί χρησιμοποιείται για την εμφάνιση περιεχομένου που έχει αποκρυφτεί για λόγους εμφάνισης. Δεν αφορά χρήστες τεχνολογίας υποβοήθησης.",


//Tags
listTags: "${0} και άλλα ${1}",

//Trends
expandTrend: "Ανάπτυξη φίλτρου τάσεων",
collapseTrend: "Σύμπτυξη φίλτρου τάσεων",
trendTitle: "Τάσεις",
relatedTrendTitle: "Προσθήκη της τάσης ''${0}''",
trendHelp: "Βοήθεια για τις τάσεις",
closeTrendHelp: "Κλείσιμο βοήθειας για τις τάσεις",
trendDescription: "Τάση είναι μια λέξη-κλειδί που δημιουργείται από το σύστημα ώστε να διευκολύνει την πραγματοποίηση αναζητήσεων στις Ενημερώσεις κατάστασης. Πατήστε σε μια τάση για να εμφανιστούν τα αποτελέσματα αναζήτησης που έχουν συσχετιστεί με αυτή τη λέξη-κλειδί.",
noTrends: "Δεν υπάρχουν ακόμα τάσεις",
selectedTrends: "Επιλεγμένες τάσεις",
relatedTrends: "Σχετικές τάσεις",
relatedTrendsDesc: "Προσθέστε μια σχετική τάση για να εξειδικεύσετε περαιτέρω την αναζήτηση",
removeTrend: "Αφαίρεση της τάσης ''${0}'' από τις επιλεγμένες τάσεις φιλτραρίσματος",
removeGeneric: "Αφαίρεση",
removeHashtag: "Αφαίρεση του hashtag ${0} από τα επιλεγμένα προσδιοριστικά φιλτραρίσματος.",

//ActivityStream search
asSearchLabel: "Αναζήτηση στην τρέχουσα ροή",
asSearchShadowtext: "Αναζήτηση σε αυτή τη ροή",
asSearchBarOpen: "Άνοιγμα της γραμμής αναζήτησης για αναζήτηση στην τρέχουσα προβολή",
asSearchBarCancel: "Ακύρωση της αναζήτησης και επιστροφή στην κύρια προβολή",
asSearch: "Αναζήτηση",
asSearchGlobalView: "Προβολή αποτελεσμάτων αναζήτησης από ολόκληρο το περιεχόμενό σας",

matching: "Συμφωνεί με:",
matchingAllOf: "Συμφωνεί με όλα:",


//ViewAll extension
viewAllUpdates: "Προβολή όλων των ενημερώσεων",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "Έγινε αναφορά στο πρόσωπο ${0}",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "Έγινε αναφορά στα πρόσωπα ${0}",

// String for new filter
filterMention: "@Αναφορές",

// Aria string for mentions
ariaFilterMention: "Αναφορές",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} στις ${time}",
// e.g. June 6th
timeMonth: "${d} ${MMM}",
// e.g. Today at 11:23
timeToday: "Σήμερα στις ${time}",
// e.g. June 6th, 2011
timeYear: "${d} ${MMM} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Χθες στις ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Αύριο στις ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Όλα",
filterStatusUpdates: "Ενημερώσεις κατάστασης",
filterActivities: "Δραστηριότητες",
filterBlogs: "Ιστολόγια",
filterBookmarks: "Σελιδοδείκτες",
filterCommunities: "Κοινότητες",
filterFiles: "Αρχεία",
filterForums: "Φόρουμ",
filterPeople: "Πρόσωπα",
filterProfiles: "Προφίλ",
filterWikis: "Wikis",
filterTags: "Προσδιοριστικά",
filterLibraries: "Βιβλιοθήκες",
filterMyNetworkAndPeopleIFollow: "Το δίκτυό μου και πρόσωπα που παρακολουθώ",
filterMyNetwork: "Το δίκτυό μου",
filterPeopleIFollow: "Πρόσωπα που παρακολουθώ",
filterMyUpdates: "Οι ενημερώσεις μου",
filterCommunitiesIFollow: "Κοινότητες που παρακολουθώ",
filterForMe: "Για εμένα",
filterFromMe: "Από εμένα",

// Label for filters - used by gadget
viewFilterLabel: "Υποπροβολή:",
filterOneLabel: "Φιλτράρισμα κατά:",
filterTwoLabel: "Εμφάνιση:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Παρακολουθώ",
viewStatusUpdates: "Ενημερώσεις κατάστασης",
viewActionRequired: "Απαιτείται ενέργεια",
viewSaved: "Αποθηκευμένα",
viewMyNotifications: "Οι ειδοποιήσεις μου",
viewDiscover: "Εύρεση",
viewRecentUpdates: "Πρόσφατες αλλαγές",

// Aria label for As View Side Nav
ariaASViews: "Προβολές ροής δραστηριοτήτων",

selectedLabel: "Επιλεγμένα στοιχεία",

// Gadget title
asTitle: "Ενημερώσεις για το Connections",

// Used by gadget in Notes
updatesFromSender: "Ενημερώσεις από αποστολέα",
updatesFromContact: "Ενημερώσεις από επαφή",
updatesForUser: "Ενημερώσεις για χρήστη",
updatesFor: "Ενημερώσεις για ${0}",
noUser: "Δεν εντοπίστηκε χρήστης με αυτή τη διεύθυνση e-mail: ${0}",
returnMainView: "Επιστροφή",

//External Application Text
externalApplication: "Εξωτερική εφαρμογή",

//Strings for expanding comments inline
showPreviousComments: "Εμφάνιση προηγούμενων σχολίων...",
hideAdditionalComments: "Απόκρυψη πρόσθετων σχολίων...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} από ${1}",
errorRetrieveComments: "Παρουσιάστηκε σφάλμα κατά την ανάκτηση των προηγούμενων σχολίων.",
errorRetrieveCommentsDeleted: "Παρουσιάστηκε σφάλμα κατά την ανάκτηση των προηγούμενων σχολίων. Το στοιχείο μπορεί να έχει διαγραφεί.",

// News Item Actions - Repost
repostText: "Επανανάρτηση",
logInRepostText: "Σύνδεση για επανανάρτηση",
repostMsgSuccess: "Ολοκληρώθηκε με επιτυχία η επανανάρτηση της ενημέρωσης για τους χρήστες που σας παρακολουθούν.",
repostMsgFail: "Παρουσιάστηκε σφάλμα κατά την επανανάρτηση αυτού του μηνύματος.",
repostMsgErrorResGeneric: "Δεν έχετε εξουσιοδότηση για την επανανάρτηση αυτού του μηνύματος.",
repostMsgErrorRestricted: "Αυτό το μήνυμα δεν μπορεί να αναρτηθεί ξανά, γιατί η κοινότητα ${0} είναι πλέον μια κοινότητα περιορισμένης πρόσβασης.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Πατήστε εδώ για να αναζητήσετε το προσδιοριστικό ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Αυτή η διασύνδεση θα ανοίξει σε νέο παράθυρο.",
attachFile : "Προσθήκη αρχείου",
removeFileAttachment: "Αφαίρεση συνημμένου αρχείου",

// External users 
externalUsersCommentsMsg: "Τα σχόλια ενδέχεται να εμφανίζονται και σε πρόσωπα εκτός του οργανισμού σας.",
externalUsersStatusUpdatesMsg: "Οι ενημερώσεις κατάστασης ενδέχεται να εμφανιστούν σε πρόσωπα εκτός του οργανισμού σας.",
externalUsersItemMsg: "Εξωτερική κοινή χρήση",

// Notifications Center
ariaNotificationCenter: "Κέντρο ειδοποιήσεων - Δείτε ενημερώσεις που σχετίζονται με το περιεχόμενό σας. Σε αυτή την προβολή, μπορείτε επίσης να δείτε τις ειδοποιήσεις που έχετε λάβει.",
allNotifications : "Όλες οι ειδοποιήσεις",
seeAllNotifications : "Εμφάνιση όλων",
ariaSeeAllNotifications : "Πατήστε εδώ για να μεταβείτε στην προβολή Οι ειδοποιήσεις μου στην Αρχική σελίδα.",
notificationsTitle : "Ειδοποιήσεις",
notificationsSettings : "Ρυθμίσεις",
ariaNotificationsSettings : "Πατήστε εδώ για να μεταβείτε στη σελίδα ρυθμίσεων της λειτουργίας ειδοποιήσεων.",
ariaNewNotification : "Τίλος νέας ειδοποίησης. ${0}",
newNotifications: "${0} νέες ειδοποιήσεις",
loadingNotifications: "Φόρτωση...",
noNewNotifications: "Δεν λάβατε καμία ειδοποίηση την περασμένη εβδομάδα.",
markRead: "Επισήμανση ως αναγνωσμένης",
markUnread: "Επισήμανση ως μη αναγνωσμένης",
markAllRead: "Επισήμανση όλων ως αναγνωσμένων",
markAllReadDetails: "Πατήστε εδώ για να επισημάνετε όλες τις ειδοποιήσεις ως αναγνωσμένες.",
notificationPopupSingleGeneric: "Έχετε 1 νέα ειδοποίηση.",
notificationPopupGeneric: "Έχετε ${0} νέες ειδοποιήσεις."
});

