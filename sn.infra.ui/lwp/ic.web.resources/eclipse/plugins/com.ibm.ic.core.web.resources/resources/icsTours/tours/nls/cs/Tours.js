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
    homepageWelcomeTitle : "Vítejte!",
    homepageWelcomeContent : "Vaše domovská stránka představuje řídicí středisko. Můžete se zde zaměřit na důležité aktualizace a zobrazovat položky, které vyžadují vaši pozornost.",
    easyKeepUpTitle : "Držet krok je snadné!",
    easyKeepUpContent : "Sledujte svou domovskou stránku a udržte si přehled o aktualizacích, které jsou pro vás důležité. Čtěte nejnovější příspěvky v blozích a také aktualizace aktivit a komunit.",
    whatNeedsAttentionTitle : "Co vyžaduje vaši pozornost?",
    whatNeedsAttentionContent : "Prostřednictvím filtrů můžete zjišťovat, kdo uvedl vaše jméno, zobrazovat další oznámení a sledovat položky, které vyžadují vaši akci.",
    whatsImportantTitle : "Co je pro vás důležité?",
    whatsImportantContent : "Přesouváním nebo odebíráním aplikací ze stránky můžete dosáhnout požadovaného vzhledu.",
    customizePageTitle : "Přizpůsobení stránky",
    customizePageContent : "Na domovskou stránku si můžete přidat aplikace a sledovat jen to, co chcete, na jednom místě.",
    thanksForWatchingTitle : "pDíky za pozornost",
    thanksForWatchingContent : "Tuto prohlídku můžete absolvovat znovu prostřednictvím nabídky Nápověda.",
    thanksExploreContent : "V jiných oblastech, například v Souborech či Komunitách, vám prohlídky mohou pomoci zvýšit produktivitu.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Rozhlédněte se kolem",
    haveLookAroundContent : "Prostřednictvím odkazů <b>Sdílet</b> a <b>Prozkoumat</b> se můžete seznámit s produktem Connections. Zjistěte, jak lze spolupracovat s kolegy a být produktivní.",
    whatsImportantGSContent : "Klepnutím na volbu <b>Má stránka</b> zobrazíte svůj vlastní panel dashboard. Můžete přidávat, přesouvat či odebírat aplikace a zaměřit se na to, co je pro vás důležité. Sledujte jen to, co chcete, na jednom místě.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Co je to komunita?",
    whatsACommunityContent : "Komunita je centrální místo, na kterém lze sdílet obsah a nápady. Můžete spolupracovat se svým týmem nebo s lidmi, kteří mají společný zájem.",
    whatCanIJoinTitle : "Jak se lze přidat?",
    whatCanIJoinContent : "Mezi doporučenými komunitami jsou uvedeny komunity, jejichž členy jsou vaši kolegové. Objevíte-li nějakou, která se vám líbí, klepněte na ni. Komunity, k nimž se můžete připojit, lze také vyhledávat.",
    whatColleaguesUpToTitle : "Čím se zabývají kolegové?",
    whatColleaguesUpToContent : "V zobrazení organizace jsou uvedeny všechny veřejné komunity, k nimž se můžete připojit. Procházením můžete vyhledat komunitu, která vás zajímá.",
    startOwnCommTitle : "Založte si vlastní komunitu!",
    startOwnCommContent : "Nenašli jste, co jste hledali? Založte komunitu, abyste mohli sdílet informace a spolupracovat s ostatními.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Udělejte si pořádek!",
    getOrganizedContent : "Služba Soubory umožňuje ukládat dokumenty a fotografie do centrálního umístění, takže k ním můžete přistupovat a sdílet je odkudkoli.",
    findCreateFileTitle : "Přidat nebo vytvořit soubor",
    findCreateFileContent : "Můžete odeslat existující soubor nebo vytvořit nový dokument, pokud máte k dispozici produkt HCL Docs. V obou případech jsou vaše soubory buď k dispozici pouze pro vás, nebo je můžete sdílet s dalšími uživateli.",
    takeActionTitle : "Pusťte se do toho!",
    takeActionContent : "Soubory, které vlastníte, se objeví v zobrazení Mé soubory, kde je můžete označit nebo ukotvit, přidat je do složek a sdílet je s ostatními.<br/><br/>Po klepnutí na soubor ho můžete zobrazit nebo okomentovat.",
    getLatestTitle : "Udělejte si pořádek s použitím služby Moje jednotka",
    getLatestContent : "Klíčové soubory a složky si můžete uspořádat na jednom místě. Pokud vaše organizace podporuje funkci synchronizace, můžete si nainstalovat modul plug-in pro stolní počítače, který bude automaticky synchronizovat změny v souborech.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Spolupráce s komunitami",
    teamUpContent : "Připojte se ke komunitám nebo je sledujte, abyste mohli spolupracovat v týmu. Komunity, které vlastníte, do kterých patříte nebo které sledujete, jsou uvedeny společně, takže se můžete soustředit na to důležité.",
    getBackTitle : "Rychlý návrat k oblíbeným komunitám",
    getBackContent : "Zobrazte nedávno navštívené komunity, abyste se mohli snadno vracet. Zobrazení můžete také upravit nebo komunitu vyhledat.",
    createUniqueTitle : "Vytvoření jedinečné komunity",
    createUniqueContent : "Použijte známé aplikace produktu Connections k vytvoření centra týmu. Můžete také prostřednictvím aplikace Vybrané informace vytvořit vlastní prostředí s obsahem z různých zdrojů, který je přizpůsoben pro vaše uživatele. Vyzkoušejte si to!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Zobrazení historie",
    seeWhereContent : "Vraťte se k souborům nebo složkám, které jste vytvořili nebo s nimi pracovali, a to rychle!",
    filterFilesTitle : "Vlastní filtrování souborů",
    filterFilesContent : "K vyhledání souborů můžete používat oba navigační panely. Procházejte zobrazení, nebo zužte aktuální zobrazení podle značek, dat, osob a dalších možností.<br/><br/>Zobrazte více obsahu! Chcete-li skrýt postranní panel, klepněte na aktivní ikonu.",
    metricsThemeTreeTitle : "Vyberte fokus",
    metricsThemeTreeContent : "Zobrazujte metriky v rámci komunity pomocí různých objektivů.",
    metricsDateRangeTitle : "Zobrazte změny v čase",
    metricsDateRangeContent : "Analyzujte data za časové úseky, například za minulý týden nebo od vzniku komunity, případně za vámi definované období.",
    metricsSwitchTitle : "Použijte oba způsoby",
    metricsSwitchContent : "Přepnutím mezi ikonami zobrazíte celkové součty jako grafy nebo tabulky.",
    metricsGroupByTitle : "Filtrujte podle skupiny",
    metricsGroupByContent : "Prohlédněte si data pro všechny lidi, nebo je rozdělte podle zeměpisných oblastí, rolí nebo oddělení."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
