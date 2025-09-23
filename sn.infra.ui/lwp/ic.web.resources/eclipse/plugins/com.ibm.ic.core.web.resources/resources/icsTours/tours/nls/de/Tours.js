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
    homepageWelcomeTitle : "Willkommen!",
    homepageWelcomeContent : "Ihre Homepage ist Ihre Befehlszentrale, in der Sie sich auf wichtige Aktualisierungen konzentrieren und Elemente anzeigen können, die für Sie wichtig sind.",
    easyKeepUpTitle : "Es ist einfach, auf dem Laufenden zu bleiben!",
    easyKeepUpContent : "Rufen Sie Ihre Homepage auf, um bei den für Sie wichtigen Aktualisierungen auf dem Laufenden zu bleiben. Hier sehen Sie die aktuellsten Blogbeiträge sowie Aktualisierungen von Aktivitäten und Communitys.",
    whatNeedsAttentionTitle : "Was ist für Sie wichtig?",
    whatNeedsAttentionContent : "Filtern Sie die Inhalte, um Erwähnungen Ihres Namens anzuzeigen und um weitere Benachrichtigungen und Aufgaben zu sehen, um die Sie sich kümmern müssen.",
    whatsImportantTitle : "Worauf liegt Ihr Fokus?",
    whatsImportantContent : "Verschieben Sie die Apps auf Ihrer Homepage oder entfernen Sie sie, um das gewünschte Erscheinungsbild zu erhalten.",
    customizePageTitle : "Passen Sie Ihre Homepage an",
    customizePageContent : "Fügen Sie Apps zu Ihrer Homepage hinzu, um alle für Sie wichtigen Ereignisse auf einer Seite verfolgen zu können.",
    thanksForWatchingTitle : "Danke für Ihre Teilnahme",
    thanksForWatchingContent : "Sie können diese Tour über das Hilfemenü erneut anzeigen.",
    thanksExploreContent : "Wenn Sie andere Bereiche, wie 'Dateien' oder 'Communitys', erforschen, rufen Sie die geführten Touren auf, die Ihnen helfen werden, produktiv zu bleiben.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Schauen Sie sich um",
    haveLookAroundContent : "Nutzen Sie die Links <b>Teilen</b> und <b>Durchsuchen</b>, um Connections kennenzulernen. Erfahren Sie, wie Sie am produktivsten mit Kollegen zusammenarbeiten können.",
    whatsImportantGSContent : "Klicken Sie auf <b>Meine Seite</b>, um Ihr angepasstes Dashboard anzuzeigen. Fügen Sie App hinzu, entfernen oder verschieben Sie sie, sodass Sie sich auf die wichtigen Inhalte konzentrieren können. Verfolgen Sie alle wichtigen Ereignisse von einer Seite aus.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Was ist eine Community?",
    whatsACommunityContent : "Eine Community ist eine Art Zentrale, in der Sie Inhalte und Ideen mit anderen teilen können. Sie können dort mit Ihrem Team oder mit Personen zusammenarbeiten, mit denen Sie ein gemeinsames Interesse verbindet.",
    whatCanIJoinTitle : "Woran kann ich teilnehmen?",
    whatCanIJoinContent : "Ihnen werden Communitys empfohlen, an denen Ihre Kollegen teilnehmen. Wenn Ihnen eine Community gefällt, klicken Sie darauf. Darüber hinaus können Sie auch gezielt nach Communitys suchen.",
    whatColleaguesUpToTitle : "Womit beschäftigen sich meine Kollegen?",
    whatColleaguesUpToContent : "In der Ansicht Ihres Unternehmens werden alle öffentlichen Communitys aufgelistet, an denen Sie teilnehmen können. Durchsuchen Sie die Liste nach Communitys, die Sie interessieren.",
    startOwnCommTitle : "Starten Sie eine eigene Community!",
    startOwnCommContent : "Haben Sie nicht gefunden, wonach Sie suchen? Starten Sie selbst eine Community, um Inhalte mit anderen zu teilen und mit ihnen zusammenzuarbeiten.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Organisieren Sie Ihre Arbeit!",
    getOrganizedContent : "In 'Dateien' können Sie Ihre Dokumente und Fotos in einer zentralen Position speichern, sodass Sie von überall her auf sie zugreifen und sie teilen können.",
    findCreateFileTitle : "Datei hinzufügen oder erstellen",
    findCreateFileContent : "Laden Sie bereits vorhandene Dateien hoch oder erstellen Sie ein neues Dokument, wenn HCL Docs verfügbar ist. Auf diese Weise sind Ihre Dateien immer für Sie oder für das Teilen mit anderen Personen verfügbar.",
    takeActionTitle : "Legen Sie los!",
    takeActionContent : "Dateien, deren Eigner Sie sind, erscheinen in der Ansicht 'Meine Dateien', in der Sie Dateien mit Tags kennzeichnen und pinnen, sie zu Ordnern hinzufügen und mit anderen teilen können.<br/><br/>Klicken Sie auf eine Datei, um sie anzuzeigen und zu kommentieren.",
    getLatestTitle : "Nutzen Sie 'Mein Laufwerk'",
    getLatestContent : "Organisieren Sie wichtige Dateien und Ordner in einem Bereich. Wenn Ihr Unternehmen die Synchronisationsfunktion unterstützt, installieren Sie das Desktop-Plug-in, um Änderungen an Dateien automatisch zu synchronisieren.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Nutzen Sie Communitys, um Teams zu erstellen!",
    teamUpContent : "Nehmen Sie an Communitys teil oder folgen Sie ihnen, um mit einem Team zusammenzuarbeiten. Communitys, deren Eigner Sie sind, zu denen Sie gehören oder denen Sie folgen, werden zusammen aufgelistet, damit Sie sich auf Ihre wichtigsten Informationszentren konzentrieren können.",
    getBackTitle : "Schnell zu Ihren wichtigsten Communitys wechseln!",
    getBackContent : "Zeigen Sie die Communitys an, die Sie zuletzt besucht haben, sodass Sie einfach dort weiterarbeiten können, wo Sie aufgehört haben. Sie können die Ansicht auch ändern oder die Suche verwenden, um eine Community zu finden.",
    createUniqueTitle : "Erstellen Sie eine einzigartige Community!",
    createUniqueContent : "Mit den Ihnen bekannten Connections-Apps können Sie eine Teamzentrale aufbauen. Oder verwenden Sie die App 'Schwerpunkte', um eine benutzerdefinierte Erfahrung mit Inhalten aus einer Vielzahl von Quellen zu erstellen und sie für Ihre Benutzer zu personalisieren. Schauen Sie es sich einfach mal an!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Kürzlich verwendete Elemente anzeigen",
    seeWhereContent : "Kehren Sie schnell zu Dateien oder Ordnern zurück, die Sie erstellt oder an denen Sie mit anderen zusammengearbeitet haben!",
    filterFilesTitle : "Dateien nach Wunsch filtern",
    filterFilesContent : "Suchen Sie Dateien in beiden Navigationsfenstern. Durchsuchen Sie sie nach Ansicht oder grenzen Sie die aktuelle Ansicht nach Tags, Datum, Person usw. ein.<br/><br/>Finden Sie mehr Inhalte! Klicken Sie auf das aktive Symbol, um die Seitenansicht auszublenden.",
    metricsThemeTreeTitle : "Wählen Sie Ihren Fokus aus",
    metricsThemeTreeContent : "Zeigen Sie Messdaten in Ihrer Community durch verschiedene Blickwinkel an.",
    metricsDateRangeTitle : "Änderungen im Laufe der Zeit anzeigen",
    metricsDateRangeContent : "Analysieren Sie Daten für Zeiträume von letzter Woche bis zum Beginn der Community oder für einen von Ihnen definierten Zeitraum.",
    metricsSwitchTitle : "Beide Möglichkeiten nutzen",
    metricsSwitchContent : "Wechseln Sie zwischen den Symbolen, um die Gesamtsummen als Diagramme oder Tabellen anzuzeigen.",
    metricsGroupByTitle : "Nach Gruppe filtern",
    metricsGroupByContent : "Zeigen Sie Daten für alle Personen an oder unterteilen Sie sie nach Region, Rolle oder Abteilung."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
