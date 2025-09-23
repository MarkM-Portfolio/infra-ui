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
loadingText: "Lataus on meneillään...",

//common strings
errorText: "Virhe",

invalidASConfig: "Päivitysvirran kokoonpanossa on virhe. Ota yhteys pääkäyttäjään.",

// News Item
// ${0}  :  Person display name
photoOfText: "Henkilön ${0} kuva",
// ${0}  :  Application
eventFromText: "Tapahtuma sovelluksesta ${0}",
removeNewsItemText: "Poista tämä kohde ",
// ${0}  :  Number of likes for a news item
tagsText: "Tunnisteet: ${0}",
// ${0}  :  Number of likes for a news item
likesText: "${0} pitää",
likeText: "Yksi pitää",
imageNotAvailable: "Esikatselu ei ole juuri nyt käytettävissä",
likeError: "Kohteen pitämisessä on ilmennyt virhe.",
unLikeError: "Kohteen pitämisen kumoamisessa on ilmennyt virhe.",
// ${0} author name
fromText: "Lähettäjä: ${0}",

sizeMB: "${0} Mt",
sizeGB: "${0} Gt",
sizeKB: "${0} kt",

//File download strings
downloadError: "Latausvirhe",
downloadErrorMessage: "Tiedoston lataus ei onnistunut. Tiedosto on ehkä poistettu, tai sinulla ei ole sen käyttöoikeuksia.",
closeText: "sulje",
okText: "OK",

// Alt for link to person text ${0}  :  person name
linkToPersonText: "Tämä on linkki henkilön ${0} profiiliin.",

// Files News Items
publicText: "Julkinen",
privateText: "Yksityinen",

// Video Preview
ariaPlayVideo: "Toista video",
ariaVideoArea: "Videoalue. Saat videon ohjaimet näkyviin painamalla Enter-näppäintä.",

// News Item Actions - Comment
commentText: "Kommentti",
logInText: "Kirjaudu sisään",
logInCommentText: "Voit lisätä kommentteja, kun olet kirjautunut sisään",
deleteCommentText: "Poista kommentti",
addCommentText: "Lisää kommentti...",
ariaAddCommentText: "Lisää kommentti",
writeCommentText: "Kirjoita jotakin...",
ariaCommentText: "Kirjoita jotakin",
commentNotPermittedText: "Käyttöoikeudet eivät riitä kommenttien lisäykseen tähän viestiin.",
commentFailureText: "Kommenttitekstin lisäys epäonnistui. Päivitä sivu ja yritä uudelleen.",
commentSessionTimedOut: "Sinut on kirjattu automaattisesti ulos palvelimesta, koska olet ollut pitkään toimettomana. Kopioi kirjoittamasi teksti leikepöydälle, jotta se ei häviäisi, ja aloita sitten alusta <a href : ''${0}''>kirjautumalla uudelleen sisään</a>.",
commentPostText: "Lisää",
commentCancelText: "Peruuta",




// Defect 59368 - String to say comment length exceeded.
commentLengthExceeded: "Kommentti on liian pitkä lisättäväksi. Muokkaa kommenttia ja yritä uudelleen.",

// Defect 65712 - Alert message for posting an inline comment - may only be read by Jaws.
commentPosted: "Kommentti on lisätty.",

// Text shown as a region name for a comment
// ${0} - Person name, ${1} - Date the comment was made.
commentAriaLabel: "${0} kirjoitti kommentin ${1}",
// same as above, but for replies
replyAriaLabel: "${0} kirjoitti vastauksen ${1}",

// Aria label for link to application in Activity Stream item
// ${0} - Date item was created
linkToAriaLabel: "Näytä kohde uudessa ikkunassa ${0}-sivulla. ",

// Text shown as a region name for a comment on the same day - date shown in hh:mm.
// ${0} - Person name, ${1} - Time the comment was made in format hh:mm am/pm.
commentAriaLabelSameDay: "${0} kirjoitti kommentin ${1}",
// same as above, but for replies
replyAriaLabelSameDay: "${0} kirjoitti vastauksen ${1}",

// News Item Actions - Save
savedText: "Tallennetut",
savedSuccessText: "Tallennettu",

// No Content Item
noContentText: "Näytettäviä päivityksiä ei ole.",

// News Feed Error
feedErrorText: "Uutissyötteen noudossa on ilmennyt virhe.",
itemErrorText: "Syötteen kohdetta näytettäessä on ilmennyt virhe.",
errorAlt : "Virhe:",
errorShowMore: "Näytä lisää",
errorShowLess: "Näytä vähemmän",

// Paging Handler
backToTopText: "Takaisin alkuun",
ariaShowMore: "Näytä lisää aktiviteettivirran kohteita",
ariaShowLess: "Näytä vähemmän aktiviteettivirran kohteita",
ariaBackToTop: "Palaa aktiviteettivirran kohteiden alkuun",

// Feed Link
feedLinkText: "Näiden merkintöjen syöte",

// Inline Comments
// Indicate more comments ${0}  :  number of more comments
moreCommentsText: "${0} kommenttia lisää",
oneMoreCommentsText: "1 kommentti lisää",

// Show total number of comments ${0}  :  total number of comments
allCommentsText: "Näytä kaikki ${0} kommenttia ",
singleCommentText: "Näytä kommentti",

// Spoken text for comments container ${0}  :  title of item comments are for.
commentsAriaLabel: "Kohteen ${0} kommentit",

// Spoken text for comments container where more comments available 
// ${0}  :  title of item comments are for
// ${1}  :  total number of available comments (will always be more than 1).
moreCommentsAriaLabel: "Kohteen ${0} kommentit. Saat näkyviin kaikki ${1} kommenttia napsauttamalla lisätietolinkkiä.",

// Spoken text for when an item has no description - possible from a third party feed
noDescriptionAriaLabel: "Kohde",

// Aria text for describing region holding activity stream items.
ariaNewsItemRegion: "Aktiviteettivirta",

// Filters
selectFilter: "Valitse suodatin",
filterAriaDescription: "Valitse suodatin, jos haluat muuttaa aktiviteettivirrassa näkyvien kohteiden lajia",
filterAriaLabel: "Suodata aktiviteettivirta",

// Aria description for newsitem mentioning how the EE can be opened. ${0}  :  Title of the item.
openEEDescription: "Saat näkyviin lisätietoja tästä kohteesta painamalla Enter-näppäintä.",

// Aria description for button allowing Jaws using Virtual PC cursor to show more actions. ${0}  :  Title of the item.
showActionsDescription: "Näytä toiminnot",

ariaActionsToolbar: "Kohteen toiminnot",

// Description for EE opener
openEEText: "Näytä lisätietoja tästä kohteesta",
openEEAltText: ">>",


//Mircroblog Deletion Extension
statusRemoveText: "Poista tämä viesti",
statusRemoveConfirmMessageText: "Haluatko varmasti poistaa tämän viestin?",
statusRemoveConfirmText: "Poista",
statusRemoveCancelText: "Peruuta",
statusRemoveConfirmationMsg:  "Viesti on poistettu.",
statusRemoveErrorMsg: "Viestin poisto ei onnistunut juuri nyt. Yritä uudelleen tai ota yhteys pääkäyttäjään.",
commentRemoveText: "Poista kommentti",
commentRemoveConfirmMessageText: "Haluatko varmasti poistaa tämän kommentin?",
commentRemoveConfirmText: "Poista",
commentRemoveCancelText: "Peruuta",
commentRemoveConfirmationMsg: "Kommentti on poistettu.",
commentRemoveErrorMsg: "Kommentin poisto ei onnistunut juuri nyt. Yritä uudelleen tai ota yhteys pääkäyttäjään.",

// Label for the characters remaining. This will be read by Jaws rather than displayed.
charactersRemaining: "Merkkejä jäljellä",

// Message
msgCloseAlt: "Sulje viesti",

//More Less Link
showMoreText: "Näytä lisää",
showLessText: "Näytä vähemmän",
showMoreActions: "Lisää...",

ariaShowMoreLabel: "Tämän painikkeen avulla tuodaan näkyviin sisältö, joka on piilotettu. Tällä ei ole merkitystä avustavaa tekniikkaa käyttäville.",


//Tags
listTags: "${0} ja ${1} lisää",

//Trends
expandTrend: "Laajenna trendien suodatin",
collapseTrend: "Pienennä trendien suodatin",
trendTitle: "Trendit",
relatedTrendTitle: "Lisää trendi ${0}",
trendHelp: "Trendien ohje",
closeTrendHelp: "Sulje trendien ohje",
trendDescription: "Trendi on järjestelmän luoma avainsana, jonka avulla tilapäivityksistä on helppo hakea tietoja. Napsauttamalla trendiä voit näyttää hakutulokset, jotka on määritetty avainsanalle.",
noTrends: "Trendejä ei ole vielä",
selectedTrends: "Valitut trendit",
relatedTrends: "Liittyvät trendit",
relatedTrendsDesc: "Tarkenna hakua edelleen lisäämällä liittyvä trendi",
removeTrend: "Poista trendi ${0} valituista suodatintrendeistä",
removeGeneric: "Poista",
removeHashtag: "Poista ristikkomerkkitunniste ${0} valituista suodatintunnisteista.",

//ActivityStream search
asSearchLabel: "Hae nykyisestä virrasta",
asSearchShadowtext: "Hae tästä virrasta",
asSearchBarOpen: "Hae nykyisestä virrasta avaamalla hakupalkki",
asSearchBarCancel: "Peruuta haku ja palaa päänäkymään",
asSearch: "Hae",
asSearchGlobalView: "Näytä hakutulokset kaikesta omasta sisällöstäsi",

matching: "Vastaavuus:",
matchingAllOf: "Vastine kaikkiin seuraavista:",


//ViewAll extension
viewAllUpdates: "Näytä kaikki päivitykset",

// Strings for the @mentions feature
// Main mention string. ${0}  :  name
mention: "@${0}",

// Aria string for single mention. ${0}  :  name
ariaSingleMention: "${0} mainittiin",

// Aria string for multiple mentions  :  ${0}  :  string of names
ariaMultipleMentions: "${0} mainittiin",

// String for new filter
filterMention: "@Maininnat",

// Aria string for mentions
ariaFilterMention: "Maininnat",

// Time Strings
// e.g. Friday at 10:25
timeDay: "${EEEE} kello ${time}",
// e.g. June 6th
timeMonth: "${MMM}n ${d}.",
// e.g. Today at 11:23
timeToday: "Tänään kello ${time}",
// e.g. June 6th, 2011
timeYear: "${MMM}n ${d}., ${YYYY}",
// e.g. Yesterday at 5:45
timeYesterday: "Eilen kello ${time}",
// e.g. Tomorrow at 6:45
timeTomorrow: "Huomenna kello ${time}",

// Names for filters in ActivityStream - used by gadget
filterAll: "Kaikki",
filterStatusUpdates: "Tilapäivitykset",
filterActivities: "Aktiviteetit",
filterBlogs: "Verkkolokit",
filterBookmarks: "Kirjanmerkit",
filterCommunities: "Yhteisöt",
filterFiles: "Tiedostot",
filterForums: "Keskusteluryhmät",
filterPeople: "Henkilöt",
filterProfiles: "Profiilit",
filterWikis: "Wikit",
filterTags: "Tunnisteet",
filterLibraries: "Kirjastot",
filterMyNetworkAndPeopleIFollow: "Oma verkosto ja henkilöt, joita seuraan",
filterMyNetwork: "Oma verkosto",
filterPeopleIFollow: "Henkilöt, joita seuraan",
filterMyUpdates: "Omat päivitykset",
filterCommunitiesIFollow: "Yhteisöt, joita seuraan",
filterForMe: "Minulle",
filterFromMe: "Minulta",

// Label for filters - used by gadget
viewFilterLabel: "Alinäkymä:",
filterOneLabel: "Suodatusperuste:",
filterTwoLabel: "Näytä:",

// Names for views in ActivityStream - used by gadget
viewImFollowing: "Olen seuraaja",
viewStatusUpdates: "Tilapäivitykset",
viewActionRequired: "Toimia tarvitaan",
viewSaved: "Tallennetut",
viewMyNotifications: "Omat ilmoitukset",
viewDiscover: "Etsi",
viewRecentUpdates: "Viimeisimmät päivitykset",

// Aria label for As View Side Nav
ariaASViews: "Aktiviteettivirtanäkymät",

selectedLabel: "Valittu",

// Gadget title
asTitle: "Connections-päivitykset",

// Used by gadget in Notes
updatesFromSender: "Päivitykset lähettäjältä",
updatesFromContact: "Päivitykset yhteyshenkilöltä",
updatesForUser: "Päivitykset käyttäjälle",
updatesFor: "Päivitykset käyttäjälle ${0}",
noUser: "Sähköpostiosoitetta ${0} vastaavaa käyttäjää ei löytynyt.",
returnMainView: "Paluu",

//External Application Text
externalApplication: "Ulkoinen sovellus",

//Strings for expanding comments inline
showPreviousComments: "Näytä edelliset kommentit...",
hideAdditionalComments: "Piilota lisäkommentit...",
// Used to display current shown comments. e.g. "2 of 10"
commentsCounter: "${0}/${1}",
errorRetrieveComments: "Edellisiä kommentteja noudettaessa on ilmennyt virhe.",
errorRetrieveCommentsDeleted: "Edellisiä kommentteja noudettaessa on ilmennyt virhe. Kohde on ehkä poistettu.",

// News Item Actions - Repost
repostText: "Julkaise uudelleen",
logInRepostText: "Kirjaudu sisään uudelleenlisäystä varten",
repostMsgSuccess: "Järjestelmä on lähettänyt päivityksen uudelleen seuraajillesi.",
repostMsgFail: "Tämän viestin uudelleenlisäyksessä on ilmennyt virhe.",
repostMsgErrorResGeneric: "Sinulla ei ole valtuuksia lisätä tätä viestiä uudelleen.",
repostMsgErrorRestricted: "Viestiä ei voi julkaista uudelleen, koska yhteisö ${0} on nyt rajoitettu.",

// Hashtags
// Defect 112455
// a11y feature to inform the user the hashtag can be clicked on
hashtagTitle:" Hae tunnistetta ${0} napsauttamalla tätä. ",

// a11y information about the link opening on a new window
opensInNewWindow: "Linkki aukeaa uuteen ikkunaan.",
attachFile : "Lisää tiedosto",
removeFileAttachment: "Poista liitetiedosto",

// External users 
externalUsersCommentsMsg: "Kommentit saattavat näkyä organisaation ulkopuolisille henkilöille.",
externalUsersStatusUpdatesMsg: "Tilapäivitykset saattavat näkyä organisaation ulkopuolisille henkilöille.",
externalUsersItemMsg: "Ulkoisessa yhteiskäytössä",

// Notifications Center
ariaNotificationCenter: "Ilmoituskeskus - Voit tarkastella lisäämääsi sisältöön liittyviä päivityksiä sekä vastaanottamiasi ilmoituksia.",
allNotifications : "Kaikki ilmoitukset",
seeAllNotifications : "Näytä kaikki",
ariaSeeAllNotifications : "Siirry kotisivun Omat ilmoitukset -näkymään napsauttamalla tätä",
notificationsTitle : "Ilmoitukset",
notificationsSettings : "Asetukset",
ariaNotificationsSettings : "Siirry ilmoitusasetusten sivulle napsauttamalla tätä",
ariaNewNotification : "Uuden ilmoituksen otsikko. ${0}",
newNotifications: "${0} uutta ilmoitusta",
loadingNotifications: "Lataus on meneillään...",
noNewNotifications: "Et ole saanut yhtään ilmoitusta kuluneen viikon aikana.",
markRead: "Merkitse luetuksi",
markUnread: "Merkitse lukemattomaksi",
markAllRead: "Merkitse kaikki luetuiksi",
markAllReadDetails: "Merkitse kaikki ilmoitukset luetuiksi napsauttamalla tätä.",
notificationPopupSingleGeneric: "Sinulla on yksi uusi ilmoitus",
notificationPopupGeneric: "Sinulla on ${0} uutta ilmoitusta"
});

