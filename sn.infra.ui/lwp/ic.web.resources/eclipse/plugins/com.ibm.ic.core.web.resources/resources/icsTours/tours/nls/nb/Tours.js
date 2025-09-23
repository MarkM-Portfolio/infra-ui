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
    homepageWelcomeTitle : "Velkommen!",
    homepageWelcomeContent : "Hjemmesiden er ditt kommandosenter, der du kan fokusere på viktige oppdateringer og se ting som krever din oppmerksomhet.",
    easyKeepUpTitle : "Det er enkelt å følge med!",
    easyKeepUpContent : "Se gjennom hjemmesiden din for å få med deg oppdateringene du er interessert i. Se de nyeste blogginnleggene og oppdateringer om aktiviteter og fellesskap.",
    whatNeedsAttentionTitle : "Hva krever din oppmerksomhet?",
    whatNeedsAttentionContent : "Bruk filtrene til å se hvem som omtaler navnet ditt, til å vise andre varsler og til å se elementer som krever handling.",
    whatsImportantTitle : "Hva er viktig for deg?",
    whatsImportantContent : "Flytt eller fjern apper fra siden din for å få det utseendet og innholdet du vil ha der.",
    customizePageTitle : "Tilpass siden din",
    customizePageContent : "Legg til apper på hjemmesiden din slik at du kan holde oversikt over det du vil fra ett sted.",
    thanksForWatchingTitle : "Takk for oppmerksomheten",
    thanksForWatchingContent : "Du kan se denne veiledningen fra menyen Hjelp.",
    thanksExploreContent : "Når du utforsker andre områder, for eksempel Filer eller Fellesskap, kan du se etter veiledninger som kan hjelpe deg med å bli mer produktiv.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Se deg litt rundt",
    haveLookAroundContent : "Bruk koblingene <b>Del</b> og <b>Utforsk</b> til å bli bedre kjent med Connections. Finn ut hvordan du kan samarbeide med kolleger og bli mer produktiv.",
    whatsImportantGSContent : "Klikk på <b>Min side</b> for å se ditt tilpassede dashbord. Legg til, flytt eller fjern apper slik at du kan fokusere på det som er viktig for deg. Følg med på det du ønsker fra ett sted.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Hva er et fellesskap?",
    whatsACommunityContent : "Et fellesskap er et sentralt sted der du kan dele innhold og ideer. Du kan samarbeide med gruppen din eller med folk som har samme interesser som deg.",
    whatCanIJoinTitle : "Hva kan jeg delta i?",
    whatCanIJoinContent : "Anbefalte fellesskap viser fellesskap kollegene dine er med i. Hvis du ser ett du liker, kan du klikke på det. Du kan også søke etter fellesskap du vil delta i.",
    whatColleaguesUpToTitle : "Hva holder kollegene mine på med?",
    whatColleaguesUpToContent : "Organisasjonens oversikt viser en liste over alle de felles fellesskapene du kan delta i. Se om du finner et fellesskap som interesserer deg.",
    startOwnCommTitle : "Start ditt eget fellesskap!",
    startOwnCommContent : "Finner du ikke det du har behov for? Start et fellesskap slik at du kan dele og samarbeide med andre.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Organiser arbeidet ditt!",
    getOrganizedContent : "I Filer kan du lagre dokumenter og bilder på et sentralt sted slik at du har tilgang til dem og kan dele dem fra hvor som helst.",
    findCreateFileTitle : "Legg til eller opprett en fil",
    findCreateFileContent : "Last opp en eksisterende fil eller opprett et nytt dokument hvis HCL Docs er tilgjengelig for deg. I begge tilfeller blir filene tilgjengelige for bare deg eller også for andre du vil dele dem med.",
    takeActionTitle : "Arbeid med filene!",
    takeActionContent : "Filer du eier, blir vist i Mine filer, der du kan tagge og feste filer, legge dem til i mapper og dele dem med andre.<br/><br/>Klikk på en fil for å vise den eller kommentere den.",
    getLatestTitle : "Organiser arbeidet med Min stasjon",
    getLatestContent : "Organiser viktige filer og mapper på ett sted. Hvis organisasjonen din støtter synkroniseringsfunksjonen, kan du installere skrivebordspluginmodulen for å synkronisere endringer i filer automatisk",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Bli med i fellesskap!",
    teamUpContent : "Delta i eller følg fellesskap for å samarbeide med andre. Fellesskap du eier, tilhører eller følger, blir vist sammen på listen, slik at du kan fokusere på det som er viktigst for deg.",
    getBackTitle : "Gå tilbake til favorittfellesskapene dine raskt!",
    getBackContent : "Vis fellesskapene du besøkte sist, slik at det blir enkelt å fortsette der du slapp. Du kan også endre visningen eller bruke søk til å finne et fellesskap.",
    createUniqueTitle : "Opprett et unikt fellesskap!",
    createUniqueContent : "Bruk Connections-appene du kjenner, til å lage et nav for gruppen din. Eller bruk appen Høydepunkter til å lage en tilpasset løsning med innhold fra ulike kilder, tilpasset brukerne dine. Finn ut mer!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Se hvor du har vært",
    seeWhereContent : "Gå tilbake til filer eller mapper du har opprettet eller samarbeidet om ... raskt!",
    filterFilesTitle : "Filtrer filer slik du vil",
    filterFilesContent : "Bruk begge navigeringsrutene til å finne filer. Bla gjennom ulike visninger eller begrens den aktive visningen ved hjelp av tagg, dato, person og annet.<br/><br/>Se mer av innholdet! Klikk på det aktive ikonet for å skjule sidepanelet.",
    metricsThemeTreeTitle : "Velg fokus",
    metricsThemeTreeContent : "Se metrikk for fellesskapet gjennom ulike linser.",
    metricsDateRangeTitle : "Se endringer over tid",
    metricsDateRangeContent : "Analyser data for perioder, alt fra forrige uke til helt siden fellesskapet ble startet, eller for en periode du definerer.",
    metricsSwitchTitle : "Få både i pose og sekk",
    metricsSwitchContent : "Bytt mellom ikonene for å vise totalverdier enten som diagrammer eller tabeller",
    metricsGroupByTitle : "Filtrer etter gruppe",
    metricsGroupByContent : "Se data for alle personer, eller del opp dataene etter geografi, rolle eller avdeling."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
