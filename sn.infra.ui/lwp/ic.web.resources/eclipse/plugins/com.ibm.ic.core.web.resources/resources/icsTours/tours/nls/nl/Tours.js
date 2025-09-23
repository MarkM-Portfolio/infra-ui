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
    homepageWelcomeTitle : "Welkom",
    homepageWelcomeContent : "De homepage is uw actiecentrum. Hier ontvangt u belangrijke updates en ziet u de items die uw aandacht vereisen.",
    easyKeepUpTitle : "U blijft eenvoudig up-to-date",
    easyKeepUpContent : "Scan uw homepage en blijf op de hoogte van belangrijke updates. Bekijk de nieuwste blogposts en updates van activiteiten en community's.",
    whatNeedsAttentionTitle : "Wat vraagt uw aandacht?",
    whatNeedsAttentionContent : "Gebruik de filters om te zien wie uw naam vermeldt, om andere meldingen af te beelden en om items te bekijken waarop actie verwacht wordt.",
    whatsImportantTitle : "Wat is voor u belangrijk?",
    whatsImportantContent : "Verplaats of verwijder apps van de pagina om de indeling en content te krijgen die u wilt.",
    customizePageTitle : "Personaliseer de homepage",
    customizePageContent : "Voeg apps toe aan uw homepage om op één plek een overzicht te hebben van alles wat u wilt bijhouden.",
    thanksForWatchingTitle : "Dank voor uw aandacht",
    thanksForWatchingContent : "U kunt deze rondleiding opnieuw starten vanuit het Help-menu.",
    thanksExploreContent : "Wanneer u andere functies uitprobeert, zoals Bestanden of Community's, kijk dan ook of er rondleidingen zijn die u op weg kunnen helpen.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Kijk eens rond",
    haveLookAroundContent : "Gebruik de links <b>Delen</b> en <b>Verkennen</b> om Connections te leren kennen. Onderzoek hoe u productiever wordt door samenwerking met collega's.",
    whatsImportantGSContent : "Klik op <b>Mijn pagina</b> om uw eigen dashboard te bekijken. Door apps toe te voegen, te verplaatsen of te verwijderen kunt u zich richten op wat voor u belangrijk is. Houd alles wat u wilt bij vanaf één plek.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Wat is een community?",
    whatsACommunityContent : "Een community is een centrale locatie waar u content en ideeën kunt delen. U kunt samenwerken binnen een team of met gebruikers met een gezamenlijke interesse.",
    whatCanIJoinTitle : "Waarvan kan ik lid worden?",
    whatCanIJoinContent : "Aanbevolen community's zijn de community's waarvan uw collega's lid zijn. Als u er een ziet die u bevalt, klikt u er gewoon op. U kunt community's waaraan u wilt deelnemen ook opzoeken.",
    whatColleaguesUpToTitle : "Wat zijn de plannen van uw collega's?",
    whatColleaguesUpToContent : "Uw organisatieview geeft een overzicht van alle openbare community's waarvan u lid kunt worden. Zoek een community die uw belangstelling opwekt.",
    startOwnCommTitle : "Start een eigen community",
    startOwnCommContent : "Vindt u niet wat u zoekt? Start zelf een community voor het delen van content en samenwerken met anderen.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Breng uw werk op orde",
    getOrganizedContent : "Met de app Bestanden bewaart u uw documenten en foto's op een centrale plek, en opent en deelt u deze vanuit elke locatie.",
    findCreateFileTitle : "Bestand toevoegen of maken",
    findCreateFileContent : "Upload een bestaand bestand, of maak een nieuw bestand als u over HCL Docs beschikt. In beide gevallen zijn uw bestanden alleen beschikbaar voor u en voor u om te delen met anderen.",
    takeActionTitle : "Onderneem actie",
    takeActionContent : "Bestanden waarvan u de eigenaar bent, worden weergegeven in de view Mijn bestanden. Hierin kunt u bestanden voorzien van tags en vastzetten, toevoegen aan mappen en delen met anderen.<br/><br/>Klik op een bestand om het te bekijken en erop te reageren.",
    getLatestTitle : "Orden uw werk met My Drive",
    getLatestContent : "Organiseer uw belangrijke bestanden en mappen op een centrale locatie. Als voor uw organisatie de synchronisatiefunctie is ingeschakeld, kunt u de desktopplugin installeren en bestandswijzigingen automatisch synchroniseren.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Vorm een team met Community's!",
    teamUpContent : "Neem deel aan of volg community's om samen te werken met een team. Community's waarvan u de eigenaar bent, waartoe u behoort of die u volgt, worden bij elkaar afgebeeld zodat u zich kunt concentreren op uw meest essentiële hubs.",
    getBackTitle : "Keer snel terug naar uw favoriete community's!",
    getBackContent : "Bekijk de community's die u het laatst hebt bezocht, zodat u snel de draad weer kunt oppakken op het punt waar u gebleven was. U kunt ook de view wijzigen of zoeken naar een community.",
    createUniqueTitle : "Maak een unieke community!",
    createUniqueContent : "Gebruik uw bekende Connections-apps om een teamhub te maken.  Of gebruik de app Kenmerken om een maatwerkervaring te creëren met content uit een groot aantal bronnen, gepersonaliseerd voor uw gebruikers.  Probeer het uit!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Bekijk waar u geweest bent",
    seeWhereContent : "Hiermee kunt u - snel - terugkeren naar bestanden of mappen die u aan het maken bent of waaraan u meewerkt!",
    filterFilesTitle : "Filter bestanden op de manier die u wilt",
    filterFilesContent : "Gebruik beide navigatievensters om bestanden op te zoeken. Blader op basis van views of verfijn de huidige view op tag, datum, persoon, en meer.<br/><br/>Zie meer van de content! Klik op het actieve pictogram om het zijpaneel te verbergen.",
    metricsThemeTreeTitle : "Kies de gewenste focus",
    metricsThemeTreeContent : "Bekijk de gebruikscijfers binnen uw community door verschillende lenzen",
    metricsDateRangeTitle : "Bekijk de wijzigingen over de afgelopen periode",
    metricsDateRangeContent : "Analyseer gegevens voor tijdsperioden die variëren van de afgelopen week tot aan het begin van de community, of voor een door u gedefinieerde periode. ",
    metricsSwitchTitle : "Gebruik zowel de ene als de andere view",
    metricsSwitchContent : "Maak afwisselend gebruik van het ene of het andere pictogram om de totalen als diagrammen of tabellen af te beelden.",
    metricsGroupByTitle : "Filteren op groep",
    metricsGroupByContent : "Bekijk de gegevens voor alle personen, of splits deze op in geografie, rol of afdeling."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
