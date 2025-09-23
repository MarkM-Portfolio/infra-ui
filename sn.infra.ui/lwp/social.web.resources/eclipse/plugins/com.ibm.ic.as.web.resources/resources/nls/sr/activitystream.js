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
loadingText: "Učitavanje...",

//common strings
errorText: "Greška",

invalidASConfig: "Došlo je do greške tokom konfiguracije toka novosti. Kontaktirajte svog administratora.",

// News Item
// ${0}  :  Person display name
photoOfText: "Fotografija ${0}",
// ${0}  :  Application
eventFromText: "Događaj od ${0}",
removeNewsItemText: "Izbriši ovu stavku ",
// ${0}  :  Number of likes for a news item
tagsText: "Oznake: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} sviđanja",
likeText: "1 sviđanje",
imageNotAvailable: "Pregled trenutno nije dostupan",
likeError: "Došlo je do greške tokom obeležavanja sviđanja ove stavke.",
unLikeError: "Došlo je do greške tokom obeležavanja sviđanja ove stavke.",
// ${0} author name
fromText: "Od: ${0}",

sizeMB: "${0} megabajta",
sizeGB: "${0} gigabajta",
sizeKB: "${0} KB",

//File download strings
downloadError: "Greška preuzimanja",
downloadErrorMessage: "Nije moguće preuzeti datoteku. Možda je izbrisana ili nemate pristup za nju.",
closeText: "zatvori",
okText: "U redu",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Ovo je link do profila ${0}",

// Files News Items
publicText: "Javno",
privateText: "Privatno",

// Video Preview
ariaPlayVideo: "Reprodukuj video",
ariaVideoArea: "Oblast videa, pritisnite taster ENTER da biste pristupili video kontrolerima",

// News Item Actions - Comment
commentText: "Komentar",
logInText: "Prijava",
logInCommentText: "Prijavite se da biste komentarisali",
deleteCommentText: "Izbriši komentar",
addCommentText: "Dodajte komentar...",
ariaAddCommentText: "Dodajte komentar",
writeCommentText: "Napišite nešto...",
ariaCommentText: "Napišite nešto",
commentNotPermittedText: "Niste ovlašćeni da komentarišete poruku.",
commentFailureText: "Pokušaj da se doda tekst komentara nije uspeo. Osvežite stranicu i pokušajte ponovo.",
commentSessionTimedOut: "Automatski ste odjavljeni sa servera zbog neaktivnosti. Kopirajte tekst koji ste uneli na privremenu memoriju da ga ne biste' izgubili, a zatim <a href : ''${0}''>se prijavite</a> da biste ponovo počeli.",
commentPostText: "Postavi",
commentCancelText: "Otkaži",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Komentar je predugačak da bi se postavio. Izmenite komentar i ponovo pokušajte.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Komentar je postavljen.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} je napisao komentar na ${1}",
// same as above, but for replies
replyAriaLabel: "${0} je odgovorio na ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Prikaži stavku u novom prozoru na stranici ${0}. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} je napisao komentar na ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} je odgovorio na ${1}",

// News Item Actions - Save
savedText: "Sačuvano",
savedSuccessText: "Uspešno sačuvano",

// No Content Item
noContentText: "Nema novosti za prikaz.",

// News Feed Error
feedErrorText: "Došlo je do greške tokom preuzimanja fida novina.",
itemErrorText: "Došlo je do greške tokom prikazivanja stavke u fidu.",
errorAlt : "Greška:",
errorShowMore: "Prikaži više",
errorShowLess: "Prikaži manje",

// Paging Handler
backToTopText: "Nazad na vrh",
ariaShowMore: "Prikaži više stavki toka aktivnosti",
ariaShowLess: "Prikaži manje stavki toka aktivnosti",
ariaBackToTop: "Nazad na vrh stavki toka aktivnosti",

// Feed Link
feedLinkText: "Fid za ove unose",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} više komentara",
oneMoreCommentsText: "još 1 komentar",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Prikaži sve komentare ${0} ",
singleCommentText: "Prikaži komentar",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Komentari na ${0}",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Komentari za ${0} . Koristite više detalja da biste prikazali sve komentare ${1}.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "stavka",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Tok aktivnosti",

// Filters
selectFilter: "Izaberite filter",
filterAriaDescription: "Izaberite filter da biste promenili tip stavki prikazanih u toku aktivnosti",
filterAriaLabel: "Tok aktivnosti filtera",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Pritisnite taster enter da biste prikazali više detalja o ovoj stavki",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Prikaži radnje",

ariaActionsToolbar: "Stavka radnje",

// Description for EE opener
openEEText: "Prikaži više detalja o ovoj stavki",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Izbrišite ovu poruku",
statusRemoveConfirmMessageText: "Želite li zaista izbrisati poruku?",
statusRemoveConfirmText: "Izbriši",
statusRemoveCancelText: "Otkaži",
statusRemoveConfirmationMsg:  "Poruka je uspešno izbrisana.",
statusRemoveErrorMsg: "Poruku sada nije bilo moguće izbrisati. Pokušajte ponovo ili kontaktirajte administratora.",
commentRemoveText: "Izbrišite komentar",
commentRemoveConfirmMessageText: "Želite li zaista izbrisati komentar?",
commentRemoveConfirmText: "Izbriši",
commentRemoveCancelText: "Otkaži",
commentRemoveConfirmationMsg: "Komentar je uspešno izbrisan.",
commentRemoveErrorMsg: "Komentar sada nije bilo moguće izbrisati. Pokušajte ponovo ili kontaktirajte administratora.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Preostali znakovi",

// Message
msgCloseAlt: "Zatvori poruku",

//More Less Link
showMoreText: "Prikaži više",
showLessText: "Prikaži manje",
showMoreActions: "Više...",

ariaShowMoreLabel: "Ovo dugme se koristi za prikaz sadržaja koji je skriven zbog prikaza. Nije relevantno za korisnike pomoćne tehnologije.",


//Tags
listTags: "${0} i ${1} više",

//Trends
expandTrend: "Proširite filter Trendovi",
collapseTrend: "Skupite filter Trendovi",
trendTitle: "U trendu",
relatedTrendTitle: "Dodajte trend ''${0}''",
trendHelp: "Pomoć za filter Trendovi",
closeTrendHelp: "Zatvori pomoć za filter Trendovi",
trendDescription: "Trend je ključna reč koju sistem generiše kako bi bilo lakše pretraživati ažuriranja statusa. Kliknite na trend da biste prikazali rezultate pretrage kojima je dodeljena ta ključna reč.",
noTrends: "Još nema trendova",
selectedTrends: "Izabrani Trendovi",
relatedTrends: "Povezani Trendovi",
relatedTrendsDesc: "Dodajte povezani trend da biste dodatno pročistili pretragu",
removeTrend: "Uklonite trend ''${0}'' iz izabranog filtera trendovi",
removeGeneric: "Ukloni",
removeHashtag: "Ukloni haštag ${0} iz izabranih oznaka filtera.",

//ActivityStream search
asSearchLabel: "Pretraži aktuelni tok",
asSearchShadowtext: "Pretraži ovaj tok",
asSearchBarOpen: "Otvorite traku pretrage da biste pretražili aktuelni prikaz",
asSearchBarCancel: "Otkažite pretragu i vratite se na glavni prikaz",
asSearch: "Pretraga",
asSearchGlobalView: "Prikaži rezultate pretrage u celom sadržaju",

matching: "Podudarno:",
matchingAllOf: "Podudara se sa svim od:",


//ViewAll extension
viewAllUpdates: "Prikaži sve novosti",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} je pomenut",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} su bili pomenuti",

// String for new filter
filterMention: "@Pominjanja",

// Aria string for mentions
ariaFilterMention: "Pominjanja",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} u ${time}",
// e.g. June 6th
timeMonth: "${MMM} ${d}",
// e.g. Today at 11:23
timeToday: "Danas u ${time}",
// e.g. June 6th, 2011
timeYear: "${d}. ${MMM} ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Juče u ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Sutra u ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Sve",
filterStatusUpdates: "Ažuriranja statusa",
filterActivities: "Aktivnosti",
filterBlogs: "Blogovi",
filterBookmarks: "Obeleživači",
filterCommunities: "Zajednice",
filterFiles: "Datoteke",
filterForums: "Forumi",
filterPeople: "Osobe",
filterProfiles: "Profili",
filterWikis: "Vikiji",
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
viewFilterLabel: "Podprikaz:",
filterOneLabel: "Filter po:",
filterTwoLabel: "Prikaži:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Pratim",
viewStatusUpdates: "Ažuriranja statusa",
viewActionRequired: "Potrebna je radnja",
viewSaved: "Sačuvano",
viewMyNotifications: "Moja obaveštenja",
viewDiscover: "Otkrij",
viewRecentUpdates: "Nedavna ažuriranja",

// Aria label for As View Side Nav
ariaASViews: "Prikazi toka aktivnosti",

selectedLabel: "Izabrano",

// Gadget title
asTitle: "Novosti aplikacije Connections",

// Used by gadget in Notes
updatesFromSender: "Novosti od pošiljaoca",
updatesFromContact: "Novosti od kontakta",
updatesForUser: "Novosti za korisnika",
updatesFor: "Novosti za ${0}",
noUser: "Nije pronađen korisnik za ovu adresu e-pošte: ${0}",
returnMainView: "Vrati",

//External Application Text
externalApplication: "Spoljna aplikacija",

//Strings for expanding comments inline
showPreviousComments: "Prikaži prethodne komentare...",
hideAdditionalComments: "Sakrij dodatne komentare...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0} od ${1}",
errorRetrieveComments: "Došlo je do greške tokom preuzimanja prethodnih komentara.",
errorRetrieveCommentsDeleted: "Došlo je do greške tokom preuzimanja prethodnih komentara. Moguće je da je stavka izbrisana.",

// News Item Actions - Repost
repostText: "Postavi ponovo",
logInRepostText: "Prijavi se na ponovo postavili",
repostMsgSuccess: "Ažuriranje je uspešno ponovo postavljeno vašim sledbenicima.",
repostMsgFail: "Došlo je do greške tokom ponovnog postavljanja poruke.",
repostMsgErrorResGeneric: "Niste ovlašćeni da ponovo postavite poruku.",
repostMsgErrorRestricted: "Nije moguće ponovo postaviti poruku jer je zajednica ${0} sada ograničena zajednica.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Kliknite ovde da biste pretražili oznaku ${0}. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Link će se otvoriti u novom prozoru.",
attachFile : "Dodaj datoteku",
removeFileAttachment: "Ukloni prilog datoteke",

// External users 
externalUsersCommentsMsg: "Komentare mogu videti osobe van vaše organizacije.",
externalUsersStatusUpdatesMsg: "Moguće je da ljudi van vaše organizacije vide ažuriranja statusa.",
externalUsersItemMsg: "Deljeno spolja",

// Notifications Center
ariaNotificationCenter: "Notification Center - Prikazuje novosti u vezi sa sadržajem i primljena obaveštenja",
allNotifications : "Sva obaveštenja",
seeAllNotifications : "Vidite sve",
ariaSeeAllNotifications : "Kliknite ovde da biste otišli na prikaz Moja obaveštenja na početnoj stranici",
notificationsTitle : "Obaveštenja",
notificationsSettings : "Postavke",
ariaNotificationsSettings : "Kliknite ovde da biste otišli na stranicu postavki obaveštenja",
ariaNewNotification : "Naslov novog obaveštenja. ${0}",
newNotifications: "${0} nova obaveštenja",
loadingNotifications: "Učitavanje...",
noNewNotifications: "Niste primili obaveštenja prošle sedmice.",
markRead: "Označi pročitano",
markUnread: "Označi nepročitano",
markAllRead: "Označi sve pročitano",
markAllReadDetails: "Kliknite ovde da biste označili da su sva obaveštenja pročitana.",
notificationPopupSingleGeneric: "Imate 1 novo obaveštenje",
notificationPopupGeneric: "Imate ${0} nova obaveštenja"
});

