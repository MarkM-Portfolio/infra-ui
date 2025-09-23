/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

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
loadingText: "Učitavanje...",

//common strings
errorText: "Greška",

invalidASConfig: "Došlo je do greške u konfiguraciji za tok ažuriranja. Molim, kontaktirajte vašeg administratora.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografija od ${0}",
// ${0}  :  Application
eventFromText: "Događaj iz ${0}",
removeNewsItemText: "Obrišite ovu stavku ",
// ${0}  :  Number of likes for a news item
tagsText: "Oznake: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} sviđanja",
likeText: "1 sviđanje",
imageNotAvailable: "Pregled trenutno nije dostupan",
likeError: "Došlo je do greške kod označavanja da vam se ova stavka sviđa.",
unLikeError: "Došlo je do greške kod označavanja da vam se ova stavka ne sviđa.",
// ${0} author name
fromText: "Od: ${0}",

sizeMB: "${0} MB",
sizeGB: "${0} GB",
sizeKB: "${0} KB",

//File download strings
downloadError: "Greška preuzimanja",
downloadErrorMessage: "Datoteka se nije mogla preuzeti. Možda je izbrisana ili nemate pristup toj datoteci.",
closeText: "zatvori",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Ovo je link na profil od ${0}",

// Files News Items
publicText: "Javno",
privateText: "Privatno",

// Video Preview
ariaPlayVideo: "Pokreni video",
ariaVideoArea: "Područje videa, pritisnite ENTER za pristup video kontrolorima",

// News Item Actions - Comment
commentText: "Komentar",
logInText: "Prijava",
logInCommentText: "Prijavite se za komentarisanje",
deleteCommentText: "Brisanje komentara",
addCommentText: "Dodavanje komentara...",
ariaAddCommentText: "Dodavanje komentara",
writeCommentText: "Napišite nešta...",
ariaCommentText: "Napišite nešta",
commentNotPermittedText: "Niste ovlašteni da komentarišete ovu poruku.",
commentFailureText: "Pokušaj dodavanja teksta komentara nije uspio. Molim, osvježite stranicu i pokušajte ponovo.",
commentSessionTimedOut: "Automatski ste odjavljeni sa servera zbog neaktivnosti. Kopirajte bilo koji tekst koji ste unijeli u vaš clipboard tako da ga ne izgubite, a zatim <a href : ''${0}''>prijava</a> da započnete ponovo.",
commentPostText: "Postavi",
commentCancelText: "Odustani",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Komentar je predug za objavljivanje. Molimo ispravite komentar i pokušajte ponovo.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Vaš komentar je objavljen.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} je napisao komentar na ${1}",
// same as above, but for replies
replyAriaLabel: "${0} je napisao odgovor na ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Pregled stavke u novom prozoru na stranici ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} je napisao komentar na ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} je napisao odgovor na ${1}",

// News Item Actions - Save
savedText: "Spremljeno",
savedSuccessText: "Uspješno spremljeno",

// No Content Item
noContentText: "Nema ažuriranja za prikaz.",

// News Feed Error
feedErrorText: "Došlo je do greške kod pristupa vašim tekućim informacijama.",
itemErrorText: "Došlo je do greške prikaza stavke u vašim tekućim informacijama.",
errorAlt : "Greška:",
errorShowMore: "Pokaži više",
errorShowLess: "Pokaži manje",

// Paging Handler
backToTopText: "Nazad na vrh",
ariaShowMore: "Pokaži više stavaka toka aktivnosti",
ariaShowLess: "Pokaži manje stavaka toka aktivnosti",
ariaBackToTop: "Nazad na vrh stavaka toka aktivnosti",

// Feed Link
feedLinkText: "Informacije za ove unose",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} dodatnih komentara",
oneMoreCommentsText: "1 dodatni komentar",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Pokaži sve ${0} komentare ",
singleCommentText: "Pokaži komentar",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Komentari za ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Komentari za ${0} . Koristite više detalja da prikažete svih ${1} komentara.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "stavka",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Tok aktivnosti",

// Filters
selectFilter: "Izbor filtera",
filterAriaDescription: "Izaberite filter za promjenu tipa stavaka prikazanih u Toku aktivnosti",
filterAriaLabel: "Filtriraj tok aktivnosti",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Pritisnite tipku Enter za detalje o ovoj stavci",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Pokaži akcije",

ariaActionsToolbar: "Akcije za stavke",

// Description for EE opener
openEEText: "Pokaži više detalja o ovoj stavci",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Brisanje ove poruke",
statusRemoveConfirmMessageText: "Da li ste sigurni da želite izbrisati ovu poruku?",
statusRemoveConfirmText: "Obriši",
statusRemoveCancelText: "Odustani",
statusRemoveConfirmationMsg:  "Poruka je uspješno izbrisana.",
statusRemoveErrorMsg: "Poruka nije mogla biti izbrisana u ovom trenutku. Pokušajte ponovo ili kontaktirajte administratora.",
commentRemoveText: "Brisanje ovog komentara",
commentRemoveConfirmMessageText: "Da li ste sigurni da želite brisati ovaj komentar?",
commentRemoveConfirmText: "Obriši",
commentRemoveCancelText: "Odustani",
commentRemoveConfirmationMsg: "Komentar je uspješno izbrisan.",
commentRemoveErrorMsg: "Komentar u ovom trenutku nije mogao biti izbrisan. Pokušajte ponovo ili kontaktirajte administratora.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Preostalo znakova",

// Message
msgCloseAlt: "Zatvori poruku",

//More Less Link
showMoreText: "Pokaži više",
showLessText: "Pokaži manje",
showMoreActions: "Više...",

ariaShowMoreLabel: "Ovo dugme se koristi za prikazivanje sadržaja skrivenog u prikazu. Nije važan za korisnike s omogućenim pomoćnim tehnologijama.",


//Tags
listTags: "${0} i ${1} više",

//Trends
expandTrend: "Proširi filter trendova",
collapseTrend: "Sruši filter trendova",
trendTitle: "Trend",
relatedTrendTitle: "Dodajte trend ''${0}''",
trendHelp: "Pomoć za trend",
closeTrendHelp: "Zatvori pomoć za trend",
trendDescription: "Trend je ključna riječ koju generiše sistem radi lakšeg izvođenja pretraživanja u Ažuriranjima statusa. Kliknite trend za prikaz rezultata pretraživanja koji imaju ovu ključnu riječ.",
noTrends: "Još nema trendova",
selectedTrends: "Izabrani trendovi",
relatedTrends: "Povezani trendovi",
relatedTrendsDesc: "Dodajte povezani trend da dodatno suzite vašu pretragu",
removeTrend: "Uklonite trend ''${0}'' iz izabranog trendova filtera",
removeGeneric: "Ukloni",
removeHashtag: "Uklonite hashtag ${0} iz tagova izabranih oznaka filtera.",

//ActivityStream search
asSearchLabel: "Pretraživanje trenutnog toka",
asSearchShadowtext: "Pretraži ovaj tok",
asSearchBarOpen: "Otvorite traku pretraživanja za trenutni pogled",
asSearchBarCancel: "Odustani od pretraživanja i povratak na glavni pogled",
asSearch: "Traži",
asSearchGlobalView: "Pregled rezultata pretraživanja za cijeli sadržaj",

matching: "Podudara se:",
matchingAllOf: "Podudara se sve od:",


//ViewAll extension
viewAllUpdates: "Pregled svih ažuriranja",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} je spomenut",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} je spomenut",

// String for new filter
filterMention: "@Mentions",

// Aria string for mentions
ariaFilterMention: "Spominjanja",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} u ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Danas u ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM} ${d}, ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Jučer u ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Sutra u ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Sve",
filterStatusUpdates: "Ažuriranja statusa",
filterActivities: "Aktivnosti",
filterBlogs: "Blogovi",
filterBookmarks: "Bukmarci",
filterCommunities: "Zajednice",
filterFiles: "Datoteke",
filterForums: "Forumi",
filterPeople: "Osobe",
filterProfiles: "Profili",
filterWikis: "Wikiji",
filterTags: "Oznake",
filterLibraries: "Biblioteke",
filterMyNetworkAndPeopleIFollow: "Moja mreža i osobe koje pratim",
filterMyNetwork: "Moja mreža",
filterPeopleIFollow: "Osobe koje pratim",
filterMyUpdates: "Moja ažuriranja",
filterCommunitiesIFollow: "Zajednice koje pratim",
filterForMe: "Za mene",
filterFromMe: "Od mene",

// Label for filters - used by gadget
viewFilterLabel: "Podpogled:",
filterOneLabel: "Filtriraj po:",
filterTwoLabel: "Pokaži:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Ja pratim",
viewStatusUpdates: "Ažuriranja statusa",
viewActionRequired: "Potrebna je akcija",
viewSaved: "Spremljeno",
viewMyNotifications: "Moje obavijesti",
viewDiscover: "Otkrivanje",
viewRecentUpdates: "Nedavna ažuriranja",

// Aria label for As View Side Nav
ariaASViews: "Pogledi tokova aktivnosti",

selectedLabel: "Izabrano",

// Gadget title
asTitle: "Ažuriranja povezivanja",

// Used by gadget in Notes
updatesFromSender: "Ažuriranja od pošiljaoca",
updatesFromContact: "Ažuriranja od kontakta",
updatesForUser: "Ažuriranja za korisnika",
updatesFor: "Ažuriranja za ${0}",
noUser: "Nije nađen Korisnik za ovu e-mail adresu: ${0}",
returnMainView: "Povratak",

//External Application Text
externalApplication: "Vanjska aplikacija",

//Strings for expanding comments inline
showPreviousComments: "Pokaži ranije komentare...",
hideAdditionalComments: "Sakrij dodatne komentare...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} od ${1}",
errorRetrieveComments: "Došlo je do greške kod dohvatanja ranijih komentara.",
errorRetrieveCommentsDeleted: "Došlo je do greške kod dohvatanja ranijih komentara. Stavka je možda izbrisana.",

// News Item Actions - Repost
repostText: "Ponovi objavu",
logInRepostText: "Prijavite se za ponovnu objavu",
repostMsgSuccess: "Ažuriranje je uspješno ponovo objavljeno vašim sljedbenicima.",
repostMsgFail: "Došlo je do greške kod ponovnog objavljivanja ove poruke.",
repostMsgErrorResGeneric: "Nemate ovlaštenje za ponovo objavljivanje ove poruke.",
repostMsgErrorRestricted: "Ova poruka ne može biti ponovo objavljena jer je ${0} zajednica sada ograničena zajednica.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Kliknite ovdje za traženje oznake ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Ovaj link će se otvoriti u novom prozoru.",
attachFile : "Dodavanje datoteke",
removeFileAttachment: "Ukloni datoteku priloga",

// External users 
externalUsersCommentsMsg: "Komentare mogu vidjeti osobe izvan vaše organizacije.",
externalUsersStatusUpdatesMsg: "Ažuriranja statusa mogu vidjeti osobe izvan vaše organizacije.",
externalUsersItemMsg: "Dijeljeno eksterno",

// Notifications Center
ariaNotificationCenter: "Centar za obavijesti - pogledajte novosti o vašem sadržaju i primljenim obavijestima",
allNotifications : "Sve obavijesti",
seeAllNotifications : "Pogledajte sve",
ariaSeeAllNotifications : "Kliknite ovdje za prelazak u pogled Moje obavijesti na početnoj stranici",
notificationsTitle : "Obavijesti",
notificationsSettings : "Postavke",
ariaNotificationsSettings : "Kliknite ovdje za prelazak na stranicu postavki obavijesti",
ariaNewNotification : "Novi naslov obavijesti. ${0}",
newNotifications: "${0} novih obavijesti",
loadingNotifications: "Učitavanje...",
noNewNotifications: "Niste primili nikakvu obavijest prošle sedmice.",
markRead: "Označi kao pročitano",
markUnread: "Označi kao nepročitano",
markAllRead: "Označi sve kao pročitano",
markAllReadDetails: "Kliknite ovdje da označite sve obavijesti kao pročitane.",
notificationPopupSingleGeneric: "Imate 1 novu obavijest",
notificationPopupGeneric: "Imate ${0} novih obavijesti"
});

