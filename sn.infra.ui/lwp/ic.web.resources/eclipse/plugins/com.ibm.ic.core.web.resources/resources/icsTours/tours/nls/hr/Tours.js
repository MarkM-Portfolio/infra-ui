/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2017, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
    // Connections Home Page tour; for d61, runs as JIT tour on first visit to Communities app
    // Note - would like to include username in the title - 'Welcome, {username}!'
    homepageWelcomeTitle : "Dobro došli!",
    homepageWelcomeContent : "Vaša početna stranica predstavlja vaš zapovjedni centar, u kojem se možete fokusirati na važna ažuriranja i pogledati stavke koje zahtijevaju vašu pažnju.",
    easyKeepUpTitle : "Vrlo je jednostavno biti u toku!",
    easyKeepUpContent : "Pratite ažuriranja stavki koje su vam važne pregledom početne stranice. Pogledajte najnovije postove blogova te ažuriranja aktivnosti i zajednice.",
    whatNeedsAttentionTitle : "Što zahtijeva vašu pozornost?",
    whatNeedsAttentionContent : "Filteri vam omogućuju pregled osoba koje spominju vaše ime, obavijesti i stavki koje zahtijevaju akciju.",
    whatsImportantTitle : "Što vam je važno?",
    whatsImportantContent : "Premjestite ili uklonite aplikacije s vaše stranice da biste dobili izgled i sadržaj koji želite.",
    customizePageTitle : "Prilagodite svoju stranicu",
    customizePageContent : "Dodajte aplikacije na početnu stranicu da biste mogli pratiti stvari koje želite na jednom mjestu.",
    thanksForWatchingTitle : "Hvala na gledanju",
    thanksForWatchingContent : "Ovaj obilazak možete ponovno pregledati koristeći izbornik Pomoć.",
    thanksExploreContent : "Kad istražujete druga područja, na primjer Datoteke ili Zajednice, potražite obilaske s vodičem koji će poboljšati vašu produktivnost.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Razgledajte uokolo",
    haveLookAroundContent : "Pomoću veza <b>Dijeli</b> i <b>Istraži</b> možete upoznati Connections. Saznajte kako možete surađivati s kolegama i biti produktivni.",
    whatsImportantGSContent : "Kliknite <b>Moja stranica</b> za pregled prilagođene kontrolne ploče. Dodajte, premjestite ili uklonite aplikacije tako da se možete usmjeriti na ono što vam je važno. Pratite stvari koje želite na jednom mjestu.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Što je zajednica?",
    whatsACommunityContent : "Zajednica je mjesto na kojem možete dijeliti sadržaj i ideje. Možete surađivati sa svojim timom ili s osobama s kojima dijelite zajednički interes.",
    whatCanIJoinTitle : "Čemu se mogu pridružiti?",
    whatCanIJoinContent : "Preporučene zajednice prikazuju zajednice u koje su uključeni vaši kolege. Ako vidite zajednicu koja vam se sviđa, kliknite je. Možete i potražiti zajednice kojima ćete se pridružiti.",
    whatColleaguesUpToTitle : "Čime se bave moji kolege?",
    whatColleaguesUpToContent : "Pogled na vašu organizaciju prikazuje sve javne zajednice kojima se možete pridružiti. Potražite zajednicu koja vas zanima.",
    startOwnCommTitle : "Pokrenite vlastitu zajednicu!",
    startOwnCommContent : "Ne vidite ono što tražite? Pokrenite zajednicu koja će vam omogućiti dijeljenje sadržaja i surađivanje s drugima.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Organizirajte se!",
    getOrganizedContent : "Aplikacija Datoteke omogućava pohranu dokumenata i fotografija na središnjoj lokaciji, tako da im možete pristupiti i dijeliti ih bilo gdje.",
    findCreateFileTitle : "Dodajte ili kreirajte datoteku",
    findCreateFileContent : "Predajte postojeću datoteku ili kreirajte novi dokument ako vam je dostupan HCL Docs. Bez obzira na radnju koju izvodite, vaše su datoteke dostupne samo za vas ili za dijeljenje s drugima.",
    takeActionTitle : "Aktivirajte se!",
    takeActionContent : "Datoteke kojima ste vlasnik se pojavljuju u pogledu Moje datoteke, gdje ih možete označiti i prikvačiti, dodati ih u foldere i dijeliti ih s drugima.<br/><br/>Kliknite datoteku da biste ju vidjeli i komentirali.",
    getLatestTitle : "Organizirajte se koristeći Moj disk",
    getLatestContent : "Organizirajte ključne datoteke i foldere na jednom mjestu. Ako vaša organizacija podržava funkciju sinkronizacije, instalirajte Desktop plug-in za automatsko sinkroniziranje promjena na datotekama.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Pridružite se timu sa zajednicama!",
    teamUpContent : "Pridružite se ili slijedite zajednice i surađujte s timom. Zajednice koje posjedujete, kojima pripadate ili ih slijedite su ispisane zajedno, tako da se možete fokusirati na najbitnije hubove.",
    getBackTitle : "Vratite se na zajednice favorite brzo!",
    getBackContent : "Pogledajte zajednice koje ste posljednje posjetili, tako da možete lako nastaviti od mjesta na kojem ste bili. Možete također promijeniti pogled ili koristiti pretraživanje za pronalaženje zajednice.",
    createUniqueTitle : "Kreirajte jedinstvenu zajednicu!",
    createUniqueContent : "Koristite Connections aplikacije za koje znate da izgrađuju hub tima.  Možete također koristiti aplikaciju Istaknuto za kreiranje prilagođenog iskustva sa sadržajem iz različitih izvora i personaliziranim za vaše korisnike.  Provjerite!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Pogledajte gdje ste bili",
    seeWhereContent : "Vratite se na datoteke ili foldere koje kreirate ili na kojima surađujete... brzo!",
    filterFilesTitle : "Filtrirajte datoteke na vaš način",
    filterFilesContent : "Upotrijebite oba navigacijska okvira za pronalaženje datoteka. Pregledajte po pogledu ili suzite trenutni pogled po oznaci, datumu, osobi i još više.<br/><br/>Pogledajte više sadržaja! Kliknite aktivnu ikonu i sakrijte bočni panel.",
    metricsThemeTreeTitle : "Izaberite svoj fokus",
    metricsThemeTreeContent : "Pogledajte metrike za cijelu zajednicu kroz drugačije leće.",
    metricsDateRangeTitle : "Pogledajte promjene kroz vrijeme",
    metricsDateRangeContent : "Analizirajte podatke za vremenske periode od prošlog tjedna do početka zajednice ili za neki period koji sami definirate.",
    metricsSwitchTitle : "Možete imati oboje",
    metricsSwitchContent : "Prebacite se s ikone na ikonu pa prikažite zbrojeve ili kao grafikone ili kao tablice.",
    metricsGroupByTitle : "Filtriraj po grupi",
    metricsGroupByContent : "Pogledajte podatke za sve osobe ili ih raščlanite po zemljopisnim područjima, ulogama ili odjelima."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
