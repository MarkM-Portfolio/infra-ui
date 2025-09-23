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
    homepageWelcomeTitle : "Üdvözöljük!",
    homepageWelcomeContent : "A honlapja az Ön parancsnoki központja, ahol fontos frissítésekre koncentrálhat és megtekintheti a figyelmét igénylő elemeket.",
    easyKeepUpTitle : "Könnyű tartani a lépést.",
    easyKeepUpContent : "Elemezze honlapját annak érdekében, hogy az Ön számára fontos frissítésekkel naprakész maradjon. Tekintse meg a legfrissebb blogbejegyzéseket, tevékenységeket és közösségi frissítéseket.",
    whatNeedsAttentionTitle : "Mire kell figyelnie?",
    whatNeedsAttentionContent : "A szűrők használatával láthatja, hogy ki említi meg a nevét, láthatja az egyéb értesítéseket és intézkedést igénylő tevékenységeket.",
    whatsImportantTitle : "Mi a fontos az Ön számára?",
    whatsImportantContent : "Helyezzen el vagy távolítson el alkalmazásokat az oldaláról, hogy a kívánt megjelenést és tartalmat kapja.",
    customizePageTitle : "Szabja személyre az oldalát.",
    customizePageContent : "Vegyen fel appokat a honlapjára, hogy azt követhessen, amit csak akar egyetlen helyről.",
    thanksForWatchingTitle : "Köszönjük a figyelmét.",
    thanksForWatchingContent : "A Súgó menüből ismét megtekintheti a termékbemutatót.",
    thanksExploreContent : "Az egyéb területek felfedezése során, mint például a Fájlok vagy Közösségek, keressen irányított termékbemutatót a hatékonyság érdekében.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Nézzen körül.",
    haveLookAroundContent : "Használja a <b>Megosztás</b> és <b>Felfedezés</b> hivatkozásokat a Connections megismeréséhez. Fedezze fel, hogyan tud együttműködni munkatársaival és hogyan tud hatékony lenni.",
    whatsImportantGSContent : "Kattintson a <b>Saját oldal</b> elemre egyéni konzoljának megtekintéséhez. Adjon hozzá, helyezzen át vagy távolítson el appokat, hogy arra koncentrálhasson, ami számít Önnek. Kövessen, amit csak szeretne egyetlen helyről.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Mi az a közösség?",
    whatsACommunityContent : "A közösség egy csomópont, ahol tartalmat és ötleteket oszthat meg. Együttműködhet a csapatával vagy olyan emberekkel, akikkel közös az érdeklődése.",
    whatCanIJoinTitle : "Mihez csatlakozhatok?",
    whatCanIJoinContent : "A javasolt közösségek azok a közösségek, amelyeknek munkatársai a tagjai. Ha olyat lát, amelyet kedvel, kattintson rá. Rá is kereshet a közösségekre, amelyekhez csatlakozhat.",
    whatColleaguesUpToTitle : "Min törik a fejüket munkatársaim?",
    whatColleaguesUpToContent : "Szervezeti nézete felsorol minden nyilvános közösséget, amelyhez csatlakozhat. Tallózzon olyan közösségért, amely érdekli.",
    startOwnCommTitle : "Indítsa el saját közösségét!",
    startOwnCommContent : "Nem találja, amire szüksége van? Indítson egy közösséget, hogy osztozzon és együttműködjön másokkal.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Legyen szervezett!",
    getOrganizedContent : "A Fájlok lehetővé teszi dokumentumai és fényképei tárolását egy központi helyen, hogy bárhonnan elérhesse és megoszthassa őket.",
    findCreateFileTitle : "Fájl hozzáadása vagy létrehozása",
    findCreateFileContent : "Töltsön fel egy meglévő fájlt, vagy hozzon létre új dokumentumot, ha az HCL Docs a rendelkezésére áll. Így vagy úgy, fájljai rendelkezésre állnak csak az Ön vagy mások számára megosztásra.",
    takeActionTitle : "Lépjen akcióba!",
    takeActionContent : "A fájlok, amelyeknek Ön a tulajdonosa, a Saját fájlok nézetben jelennek meg, ahol címkézheti és rögzítheti a fájlokat, hozzáadhatja a fájlokat mappákhoz, és megoszthatja azokat másokkal.<br/><br/>Kattintson egy fájlra a fájl megtekintéséhez és hozzászólás írásához.",
    getLatestTitle : "Legyen szervezett a Saját meghajtó segítségével",
    getLatestContent : "Rendezze a kulcsfontosságú fájlokat és mappákat egy helyre. Ha szervezete támogatja a szinkronizációs szolgáltatást, telepítse a Munkaasztal bővítményt a fájlok módosításainak automatikus szinkronizációjához.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Álljon össze közösségekkel!",
    teamUpContent : "Csatlakozzon közösségekhez, vagy kövessen közösségeket, hogy együttműködjön egy csapattal. A közösségek, amelyeknek Ön a tulajdonosa, amelyekhez tartozik vagy amelyeket követ, együtt vannak felsorolva, hogy a legfontosabb dolgokra összpontosíthasson.",
    getBackTitle : "Térjen vissza a kedvenc közösségekhez gyorsan!",
    getBackContent : "Megtekintheti a legutóbb meglátogatott közösségeket, hogy könnyedén folytathassa ott, ahol abbahagyta. A nézetet módosíthatja is, vagy a keresés használatával megkereshet egy közösséget.",
    createUniqueTitle : "Hozzon létre egy egyedi közösséget!",
    createUniqueContent : "A Connections appok használatával összeállíthat egy saját csapatközpontot.  Vagy használja az Aktualitások appot a felhasználók számára személyre szabott egyéni élmény létrehozásához, különféle forrásokból származó tartalmakkal.  Nézze meg!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Nézze meg, hol járt",
    seeWhereContent : "Térjen vissza fájlokhoz vagy mappákhoz, amelyeket létrehozott és amelyeken együttműködik másokkal... mindezt gyorsan!",
    filterFilesTitle : "Szűrje a fájlokat kedve szerint",
    filterFilesContent : "Fájlok kereséséhez használja mindkét navigációs panelt. Böngésszen nézet szerint, vagy szűkítse le a jelenlegi nézetet címke, dátum, személy és más szempontok alapján.<br/><br/>Lásson többet a tartalomból! Kattintson az aktív ikonra az oldalsó panel elrejtéséhez.",
    metricsThemeTreeTitle : "Válassza ki a fókuszt",
    metricsThemeTreeContent : "Mérőszámok megtekintése a közösségre kiterjedően különböző lencséken keresztül.",
    metricsDateRangeTitle : "Az idő során bekövetkező változások megtekintése",
    metricsDateRangeContent : "Adatok elemzése az elmúlt hét és a közösség indítása közötti időszakokra, illetve a megadott időszakra kiterjedően. ",
    metricsSwitchTitle : "Mindkét módon",
    metricsSwitchContent : "Váltás az ikonok között a diagramok vagy táblázatok összesítéseinek megjelenítéséhez.",
    metricsGroupByTitle : "Szűrés csoport szerint",
    metricsGroupByContent : "Az összes személy adatainak megjelenítése, illetve az adatok lebontása földrajzi hely, szerep vagy részleg szerint."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
