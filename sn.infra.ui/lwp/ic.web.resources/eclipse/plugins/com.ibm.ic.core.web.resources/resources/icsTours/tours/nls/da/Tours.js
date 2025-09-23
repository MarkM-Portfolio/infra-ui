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
    homepageWelcomeTitle : "Velkommen",
    homepageWelcomeContent : "Din hjemmeside er din kommandocentral, hvor du kan fokusere på vigtige opdateringer og få overblik over det, der kræver din opmærksomhed.",
    easyKeepUpTitle : "Det er let at holde trit!",
    easyKeepUpContent : "Scan din hjemmeside for at holde dig ajour med opdateringer, der er vigtige for dig. Få de seneste blogindlæg og opdateringer til aktiviteter og fællesskaber vist.",
    whatNeedsAttentionTitle : "Hvad kræver din opmærksomhed?",
    whatNeedsAttentionContent : "Brug filtrene til at se, hvem der nævner dig, til at få andre notifikationer vist og til at se elementer, der kræver handling.",
    whatsImportantTitle : "Hvad er vigtigt for dig?",
    whatsImportantContent : "Flyt eller fjern apps fra din side for at få det udseende og indhold, der passer til dig.",
    customizePageTitle : "Tilpas din side",
    customizePageContent : "Tilføj apps til din hjemmeside, så du kan holde øje med det vigtige et samlet sted.",
    thanksForWatchingTitle : "Tak for besøget",
    thanksForWatchingContent : "Rundturen kan startes igen fra menuen Hjælp.",
    thanksExploreContent : "Når du udforsker andre områder, f.eks. Filer eller Fællesskaber, kan du tage en rundtur for at få hjælp til at blive mere produktiv.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Kig dig omkring",
    haveLookAroundContent : "Brug linkene <b>Del</b> og <b>Udforsk</b> for at lære Connections at kende. Find ud af, hvordan du kan samarbejde med dine kollegaer og være produktiv.",
    whatsImportantGSContent : "Klik på <b>Min side</b> for at få dit tilpassede dashboard vist. Tilføj, flyt eller fjern apps, så du kan fokusere på det, der vedrører dig. Hold øje med dine interesseområder fra et enkelt sted.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Hvad er et fællesskab?",
    whatsACommunityContent : "Et fællesskab er mødested, hvor du kan dele indhold og idéer. Du kan samarbejde med dit team eller med andre, der har fælles interesser.",
    whatCanIJoinTitle : "Hvad kan jeg deltage i?",
    whatCanIJoinContent : "Anbefalede fællesskaber identificerer fællesskaber, som dine kollegaer er en del af. Hvis du får øje på et, du kan lide, kan du klikke på det. Du kan også søge efter fællesskaber for at deltage i dem.",
    whatColleaguesUpToTitle : "Hvad har mine kollegaer gang i?",
    whatColleaguesUpToContent : "Din organisations oversigt viser alle de offentlige fællesskaber, du kan deltage i. Gennemse dem for at finde fællesskaber, der interesserer dig.",
    startOwnCommTitle : "Start dit eget fællesskab!",
    startOwnCommContent : "Kan du ikke finde det, du har brug for? Start et fællesskab, så du kan dele og samarbejde med andre.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Få styr på det hele!",
    getOrganizedContent : "Filer bruges til at gemme dine dokumenter og billeder et centralt sted, så du har adgang til dem og kan dele dem alle steder fra.",
    findCreateFileTitle : "Tilføj eller opret en fil",
    findCreateFileContent : "Upload en eksisterende fil, eller opret et nyt dokument, hvis du har adgang til HCL Docs. Uanset hvad du vælger, har du altid adgang til dine filer til eget brug, eller du kan dele dem sammen med andre.",
    takeActionTitle : "Brug filerne aktivt!",
    takeActionContent : "Filer, som du ejer, vises i oversigten Mine filer, hvor du kan tagge og fastgøre filer, tilføje dem til foldere og dele dem med andre.<br/><br/>Klik på en fil for at vise og kommentere den.",
    getLatestTitle : "Organisér med Mit drev",
    getLatestContent : "Organisér vigtige filer og foldere et enkelt sted. Hvis din organisation understøtter synkroniseringsfunktionen, kan du installere desktop-pluginen for automatisk at synkronisere ændringer af filer.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Samarbejd med fællesskaber!",
    teamUpContent : "Deltag i eller følg fællesskaber for at samarbejde med et team. Fællesskaber, du ejer, tilhører eller følger, bliver vist sammen, så du kan fokusere på dine vigtigste informationskilder.",
    getBackTitle : "Kom hurtigt tilbage til dine foretrukne fællesskaber!",
    getBackContent : "Vis de fællesskaber, du sidst har besøgt, så du nemt kan fortsætte, hvor du slap. Du kan også skifte oversigt eller bruge søgefunktionen til at finde et fællesskab.",
    createUniqueTitle : "Opret et unikt fællesskab!",
    createUniqueContent : "Brug de Connections-apps, du allerede kender, til at opbygge en teamcentral.  Du kan også bruge Highlights-appen til at oprette et tilpasset miljø med indhold fra forskellige kilder, så det bliver personaliseret til dine brugere.  Prøv det!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Se, hvor du har været",
    seeWhereContent : "Kom tilbage til filer eller foldere, du har oprettet eller samarbejder om ... hurtigt!",
    filterFilesTitle : "Filtrér filer på din egen måde",
    filterFilesContent : "Brug begge navigationspaneler til at finde filer. Du kan gennemse filer pr. oversigt eller indsnævre den aktuelle oversigt ved hjælp af emneord, dato, person m.m.<br/><br/>Se mere af indholdet! Klik på den aktive ikon for at skjule sidepanelet.",
    metricsThemeTreeTitle : "Vælg fokus",
    metricsThemeTreeContent : "Vis metrik på tværs af dit fællesskab gennem forskellige linser.",
    metricsDateRangeTitle : "Se ændringer over tid",
    metricsDateRangeContent : "Analysér data i tidsperioder lige fra sidste uge til tidspunktet for starten af fællesskabet eller for en angivet periode.",
    metricsSwitchTitle : "Få begge dele",
    metricsSwitchContent : "Skift mellem ikonerne for at få vist totaler som diagrammer eller tabeller.",
    metricsGroupByTitle : "Filtrér efter gruppe",
    metricsGroupByContent : "Få vist data for alle personer, eller nedbryd dataene efter geografisk område, rolle eller afdeling."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
