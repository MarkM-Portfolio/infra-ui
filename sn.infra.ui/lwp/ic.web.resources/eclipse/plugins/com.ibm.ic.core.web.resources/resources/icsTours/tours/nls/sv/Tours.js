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
    homepageWelcomeTitle : "Välkommen!",
    homepageWelcomeContent : "Hemsidan är kommandocentret där fokus sätts på viktiga uppdateringar och objekt som kräver åtgärd.",
    easyKeepUpTitle : "Det är enkelt att hålla koll!",
    easyKeepUpContent : "Ögna igenom hemsidan så att du inte missar viktiga uppdateringar. Titta på de senaste blogginläggen samt uppdateringar av aktiviteter och gemenskaper.",
    whatNeedsAttentionTitle : "Är det något som kräver din åtgärd?",
    whatNeedsAttentionContent : "Använd filtren för att se vilka som har nämnt ditt namn, läsa meddelanden och se vad som behöver åtgärdas.",
    whatsImportantTitle : "Vad är viktigt?",
    whatsImportantContent : "Flytta och ta bort appar på och från sidan så att den ser ut som och har det innehåll du vill.",
    customizePageTitle : "Anpassa sidan",
    customizePageContent : "Lägg till appar på hemsidan så att du kan följa upp det du behöver från ett och samma ställe.",
    thanksForWatchingTitle : "Tack för att du tittade",
    thanksForWatchingContent : "Öppna rundturen igen från hjälpmenyn.",
    thanksExploreContent : "Utforska andra områden, som Filer och Gemenskaper och använd rundturerna som hjälper dig att bli mer produktiv.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Se dig omkring",
    haveLookAroundContent : "Använd länkarna <b>Dela</b> och <b>Utforska</b> så att du får veta mer om Connections. Ta reda på hur du kan samarbeta med kollegor och vara produktiv.",
    whatsImportantGSContent : "Klicka på <b>Min sida</b> så visas den anpassade panelen. Lägg till, flytta och ta bort appar så att du kan fokusera på viktiga saker. Följ upp det som behövs från ett och samma ställe.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Vad är en gemenskap?",
    whatsACommunityContent : "En gemenskap är en plats där du kan dela innehåll och idéer. Du kan samarbeta med teamet eller med personer med ett gemensamt intresse.",
    whatCanIJoinTitle : "Vad kan jag delta i?",
    whatCanIJoinContent : "Rekommenderade gemenskaper identifierar gemenskaper som dina kollegor är medlemmar av. Klicka på en gemenskap som intresserar dig. Du kan även söka efter intressanta gemenskaper.",
    whatColleaguesUpToTitle : "Vad har mina kollegor på gång?",
    whatColleaguesUpToContent : "Företagsvyn visar alla gemensamma gemenskaper du kan delta i. Bläddra efter en gemenskap som intresserar dig.",
    startOwnCommTitle : "Starta en egen gemenskap!",
    startOwnCommContent : "Hittar du inte vad du behöver? Starta en gemenskap så att du kan dela information och samarbeta med andra.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Skapa ordning!",
    getOrganizedContent : "Med Filer kan du lagra dokument och foton på en central plats så att du kan nå och dela dem från valfri plats.",
    findCreateFileTitle : "Lägg till eller skapa en fil",
    findCreateFileContent : "Ladda upp en fil eller skapa ett nytt dokument om du har tillgång till HCL Docs. Filerna är tillgängliga för dig eller för delning med andra.",
    takeActionTitle : "Åtgärda!",
    takeActionContent : "Filer som du äger visas i vyn Mina filer, där du kan tagga och ange filer som favoriter, lägga till dem i mappar och dela dem med andra.<br/><br/>Klicka på en fil för att visa och kommentera den.",
    getLatestTitle : "Skapa ordning med hjälp av Min enhet",
    getLatestContent : "Ordna nyckelfiler och mappar från samma plats. Om företaget har aktiverat synkroniseringsfunktionen installerar du tilläggsprogrammet så att filändringar synkroniseras automatiskt.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Gå med i gemenskaper!",
    teamUpContent : "Gå med eller följ gemenskaper för att samarbeta med ett team. Gemenskaper som du äger, tillhör eller följer listas tillsammans så att du kan fokusera på de mest väsentliga hubbarna.",
    getBackTitle : "Gå tillbaka till favoritgemenskaper snabbt!",
    getBackContent : "Visa gemenskaper som du besökt senast så att du snabbt kan fortsätta där du lämnade. Du kan också byta vy eller använda sökning för att hitta en gemenskap.",
    createUniqueTitle : "Skapa en unik gemenskap!",
    createUniqueContent : "Använd de anslutningsappar du känner till för att bygga en teamhubb.  Eller använd appen Huvudpunkter för att skapa en anpassad upplevelse med innehåll från olika källor, anpassade till dina användare.  Ta en titt på den!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Se var du har varit",
    seeWhereContent : "Gå tillbaka till filer eller mappar du skapar eller samarbetar med... snabbt!",
    filterFilesTitle : "Filtrera filer på ditt sätt",
    filterFilesContent : "Använd båda navigeringsrutorna för att hitta filer. Bläddra efter vy, eller begränsa den aktuella vyn efter tagg, datum, person med mera.<br/><br/>Se mer av innehållet! Klicka på den aktiva ikonen för att dölja sidopanelen.",
    metricsThemeTreeTitle : "Välj fokus",
    metricsThemeTreeContent : "Visa nyckeltal för gemenskapen via olika linser.",
    metricsDateRangeTitle : "Se ändringar över tid",
    metricsDateRangeContent : "Analysera data för tidsperioder från den senaste veckan till då gemenskapen startades eller för en definierad period. ",
    metricsSwitchTitle : "Gör det på båda sätten",
    metricsSwitchContent : "Växla mellan ikonerna för att visa totaler som diagram eller tabeller.",
    metricsGroupByTitle : "Filtrera efter grupp",
    metricsGroupByContent : "Se data för alla personer eller dela upp efter geografi, roll eller avdelning."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
