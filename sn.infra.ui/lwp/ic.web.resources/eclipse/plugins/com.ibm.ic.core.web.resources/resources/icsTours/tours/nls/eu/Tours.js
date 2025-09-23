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
    homepageWelcomeTitle : "Ongi etorri!",
    homepageWelcomeContent : "Hasierako orria komando-zentroa da. Bertan, eguneratze eta berri garrantzitsuenak aurkituko dituzu, kudeatu ahal izateko.",
    easyKeepUpTitle : "Azken berriak izatea oso erraza da!",
    easyKeepUpContent : "Egin begirada bat hasierako orriari zure interesekin erlazionatutako eguneratze garrantzitsuenak irakurtzeko. Ikusi azken blog-mezuak, jarduerak eta komunitate-eguneratzeak.",
    whatNeedsAttentionTitle : "Zer duzu zain?",
    whatNeedsAttentionContent : "Erabili iragazkiak zure izena nork aipatu duen ikusteko, beste jakinarazpen batzuk irakurtzeko edo zure zain dauden beste elementu batzuk bistaratzeko.",
    whatsImportantTitle : "Zer behar duzu?",
    whatsImportantContent : "Mugitu edo kendu aplikazioak hasierako orritik behar duzuna bakarrik ikusteko eta izateko.",
    customizePageTitle : "Pertsonalizatu orria",
    customizePageContent : "Gehitu aplikazioak hasierako orrian interesatzen zaizuna leku bakar batetik jarraitu ahal izateko.",
    thanksForWatchingTitle : "Eskerrik asko ikusteagatik",
    thanksForWatchingContent : "Aurkezpen azkar hau berriro ikusteko, joan zaitez Laguntza menura.",
    thanksExploreContent : "Beste gune batzuk arakatu nahi badituzu (Fitxategiak edo Komunitateak, esaterako), ikusi gidatutako aurkezpen azkarrak laguntza eskuratzeko eta guneak hobeto erabiltzeko.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Eman begirada bat",
    haveLookAroundContent : "Erabili <b>Partekatu</b> eta <b>Arakatu</b> estekak Connections ezagutzeko. Ikusi beste lagun batzuekin nola kolaboratu eta produktibitatea nola areagotu.",
    whatsImportantGSContent : "Sakatu <b>Nire orria</b> pertsonalizatutako arbela ikusteko. Gehitu, mugitu edo kendu aplikazioak nahi duzuna bakarrik ikusteko. Jarraitu interesatzen zaizun guztia leku bakar batetik.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Zer da komunitate bat?",
    whatsACommunityContent : "Komunitateak ideiak eta edukia partekatzeko gune bat dira. Zure interes berberak dituzten lagunekin edo talde batekin kolaboratu ahal duzu.",
    whatCanIJoinTitle : "Zeren kidea izango naiz?",
    whatCanIJoinContent : "Gomendatutako komunitateen gunean zure lagunen komunitateak ikusiko dituzu. Baten bat gustatzen bazaizu, egin klik. Bertan sartzeko komunitateak bilatzea beste aukera bat da.",
    whatColleaguesUpToTitle : "Zer egiten ari dira lagunak?",
    whatColleaguesUpToContent : "Erakundeko ikuspegian komunitate publiko guztiak ikusiko dituzu, bertan sartzeko. Bilatu zure intereseko komunitate bat.",
    startOwnCommTitle : "Sortu zeuk komunitate bat!",
    startOwnCommContent : "Ez duzu behar duzuna aurkitu? Sortu komunitate bat nahi duzuna beste batzuekin partekatzeko eta kolaboratzeko.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Antolatu zeure burua!",
    getOrganizedContent : "Fitxategiak gunean dokumentuak eta argazkiak gorde ahal izango duzu kokapen zentral batean, geroago edozein lekutik atzitu eta partekatu ahal izateko.",
    findCreateFileTitle : "Gehitu edo sortu fitxategi bat",
    findCreateFileContent : "Kargatu dagoen fitxategi bat edo sortu dokumentu berri bat HCL Docs erabilgarri baduzu. Edozer eginda ere, fitxategiak zuk bakarrik izango dituzu eskuragarri eta besteekin partekatzeko aukera izango duzu.",
    takeActionTitle : "Hasi kudeatzen!",
    takeActionContent : "Jabe zaren fitxategiak Nire Fitxategiak ikuspegian agertzen dira. Bertan fitxategiak etiketatu eta ainguratu ditzakezu, karpetetara gehitu eta besteekin partekatu.<br/><br/>Egin klik fitxategi batean fitxategia ikusi eta iruzkina idazteko.",
    getLatestTitle : "Erabili Nire Diskoa zeure burua antolatzeko",
    getLatestContent : "Antolatu fitxategi eta karpeta garrantzitsuak leku berberean. Erakundeak sinkronizazioa onartzen badu, instalatu mahaigaineko plugina fitxategien aldaketak automatikoki sinkronizatzeko.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Egin bat komunitateekin!",
    teamUpContent : "Egin bat komunitateekin edo jarrai itzazu talde batekin elkarlanean jarduteko. Jabe zaren, kide zaren edo jarraitzen dituzun Komunitateak elkarrekin zerrendatuta daude, zure funtsezko guneetan arreta jarri ahal dezazun.",
    getBackTitle : "Itzuli azkar gogoko komunitateetara!",
    getBackContent : "Ikusi bisitatu dituzun azken komunitateak; horrela erraz itzul zaitezke utzi zenuen lekura. Gainera, ikuspegia aldatu  edo bilaketa erabil dezakezu komunitate bat aurkitzeko.",
    createUniqueTitle : "Sortu aparteko komunitate bat!",
    createUniqueContent : "Erabili ezagutzen duzun Connections aplikazioa talde-gune bat sortzeko.  Edo, erabili Highlights aplikazioa zure erabiltzaileentzako esperientzia pertsonalizatu bat sortzeko, hainbat iturritako edukia erabiliz.  Ikus ezazu!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Ikusi non ibili zaren",
    seeWhereContent : "Itzuli zuk sortutako fitxategi edo karpetetara edo egin ekarpenak... modu azkarrean!",
    filterFilesTitle : "Iragazi fitxategiak zeure erara",
    filterFilesContent : "Erabili nabigazio-panel biak fitxategiak aurkitzeko. Arakatu ikuspegiaren arabera, edo murriztu uneko ikuspegia etiketa, data, pertsona eta abarren arabera.<br/><br/>Ikusi eduki gehiago! Sakatu ikono aktiboa alboko panela ezkutatzeko.",
    metricsThemeTreeTitle : "Hautatu zure fokua",
    metricsThemeTreeContent : "Ikusi zure komunitateko metrikak ikuspegi ezberdinetatik.",
    metricsDateRangeTitle : "Ikusi denboran zehar egindako aldaketak",
    metricsDateRangeContent : "Datuak aztertu pasa den astetik komunitatea hasi artera doan denbora-tartean, edo zuk definitzen duzun denbora-tartean.",
    metricsSwitchTitle : "Izan ezazu bi moduetan",
    metricsSwitchContent : "Aldatu ikonoen artean totalak bistaratzeko, diagrama zein tauletan.",
    metricsGroupByTitle : "Iragazi taldearen arabera",
    metricsGroupByContent : "Ikusi jende guztiarentzako datuak, edo aztertu geografia, eginkizuna edo departamentuen arabera."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
