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
    homepageWelcomeTitle : "Benvenuto!",
    homepageWelcomeContent : "La tua home page è il centro comandi, il posto da cui è possibile consultare gli aggiornamenti importanti e visualizzare gli elementi che richiedono attenzione.",
    easyKeepUpTitle : "Inizia subito!",
    easyKeepUpContent : "Consulta la home page per visualizzare tutti gli aggiornamenti più importanti. Visualizza gli ultimi post del blog e gli aggiornamenti alle attività e alla comunità.",
    whatNeedsAttentionTitle : "Quali sono gli elementi che richiedono attenzione?",
    whatNeedsAttentionContent : "Utilizza i filtri per visualizzare chi ti sta citando, le altre notifiche e gli elementi che richiedono un intervento.",
    whatsImportantTitle : "Quali sono gli elementi importanti?",
    whatsImportantContent : "Sposta o rimuovi le app dalla tua pagina e fai spazio al contenuto per te più importante.",
    customizePageTitle : "Personalizza la tua pagina",
    customizePageContent : "Aggiungi le app alla home page in modo da poter tenere traccia degli elementi desiderati da un solo posto.",
    thanksForWatchingTitle : "Grazie per l'attenzione",
    thanksForWatchingContent : "Visualizza di nuovo questo tour dal menu Guida.",
    thanksExploreContent : "Quando esplori altre aree, come File o Comunità, consulta sempre i tour guidati in modo da essere più produttivo.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Dai un'occhiata in giro",
    haveLookAroundContent : "Utilizza i link <b>Condividi</b> e <b>Esplora</b> per iniziare a conoscere Connections. Scopri come collaborare con i colleghi ed essere più produttivi.",
    whatsImportantGSContent : "Fai clic su <b>Pagina personale</b> per visualizzare il tuo dashboard personalizzato. Aggiungi, sposta e rimuovi le app in modo da potersi concentrare su ciò che è più importante. Tieni traccia degli elementi desiderati da un solo posto.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Cos'è una comunità?",
    whatsACommunityContent : "Una comunità è uno snodo da cui poter condividere idee e contenuto. Da qui potrai collaborare con il tuo team o con le persone che condividono un interesse comune.",
    whatCanIJoinTitle : "A cosa posso unirmi?",
    whatCanIJoinContent : "Le comunità consigliate sono quelle comunità di cui fanno già parte i tuoi colleghi. Se ne visualizzi una che potrebbe interessarti, fai clic su di essa. Altrimenti, ricerca le comunità a cui partecipare.",
    whatColleaguesUpToTitle : "Dove sono i miei colleghi?",
    whatColleaguesUpToContent : "La vista della tua organizzazione riporta tutte le comunità pubbliche a cui puoi partecipare. Seleziona una comunità che ti interessa.",
    startOwnCommTitle : "Crea la tua comunità!",
    startOwnCommContent : "Non trovi ciò di cui hai bisogno? Crea una comunità in modo da poter condividere e collaborare con altri.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Sii organizzato.",
    getOrganizedContent : "File consente di memorizzare documenti e foto in un sito centrale in modo da potervi accedere e condividerli da qualsiasi posto.",
    findCreateFileTitle : "Aggiungi o crea un file",
    findCreateFileContent : "Caricare un file esistente o creare un nuovo documento se è disponibile HCL Docs. In entrambi i casi, i file saranno disponibili e potranno essere condivisi con altri.",
    takeActionTitle : "Azione da intraprendere",
    takeActionContent : "I file di proprietà sono visualizzati nella vista File personali, da cui è possibile aggiungere tag e mettere in evidenza i file, aggiungerli a cartelle e condividerli con altri utenti.<br/><br/>Fare clic su un file per visualizzarlo e commentarlo.",
    getLatestTitle : "Organizzazione massima con Unità personale",
    getLatestContent : "Organizza i file e le cartelle principali in un unico posto. Se la tua organizzazione supporta la funzione di sincronizzazione, installa il Desktop plug-in per sincronizzare automaticamente le modifiche ai file.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Unisciti alle comunità!",
    teamUpContent : "Partecipa o segui delle comunità per collaborare con un team. Le comunità di proprietà, a cui appartieni o che segui sono riportate insieme in modo da poter visualizzare gli hub principali.",
    getBackTitle : "Torna rapidamente alle comunità preferite.",
    getBackContent : "Visualizza le comunità visitate per ultime in modo da poter ricominciare da dove hai lasciato. È inoltre possibile modificare la vista o utilizzare la ricerca per trovare una comunità.",
    createUniqueTitle : "Crea una comunità univoca.",
    createUniqueContent : "Utilizza le app di Connections per generare un hub di team,  oppure utilizza l'app Caratteristiche principali per creare un'esperienza personalizzata con del contenuto da diverse origini, personalizzate per i propri utenti.  Dai un'occhiata!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Guarda dove sei stato",
    seeWhereContent : "Torna rapidamente ai file o alle cartelle che hai creato o collabora su...",
    filterFilesTitle : "Filtra i file come desideri",
    filterFilesContent : "Utilizza entrambi i riquadri di navigazione per trovare i file. Seleziona per vista o limita la vista corrente per tag, data, persona e altro.<br/><br/>Visualizza più contenuto. Fare clic sull'icona attiva per nascondere il pannello laterale.",
    metricsThemeTreeTitle : "Scegli il tuo obiettivo",
    metricsThemeTreeContent : "Visualizza le metriche in tutta la comunità attraverso diverse lenti.",
    metricsDateRangeTitle : "Visualizza le modifiche nel tempo",
    metricsDateRangeContent : "Analizzare i dati per periodo di tempo che vanno dalla settimana passata all'avvio della comunità o per un periodo definito dall'utente. ",
    metricsSwitchTitle : "Entrambe le opzioni",
    metricsSwitchContent : "Cambia icona per visualizzare i totali come grafici o tabelle.",
    metricsGroupByTitle : "Filtra per gruppo",
    metricsGroupByContent : "Visualizza i dati per tutte le persone o filtra per area geografica,  ruolo o reparto."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
