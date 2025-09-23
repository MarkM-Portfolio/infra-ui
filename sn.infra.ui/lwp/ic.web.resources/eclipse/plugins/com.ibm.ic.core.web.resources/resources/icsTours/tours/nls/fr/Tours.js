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
    homepageWelcomeTitle : "Bienvenue !",
    homepageWelcomeContent : "Votre page d'accueil est votre centre de commande. Découvrez-y les mises à jour importantes et agissez sur les éléments qui réclament votre attention.",
    easyKeepUpTitle : "Rester informé est un jeu d'enfants !",
    easyKeepUpContent : "Parcourez votre page d'accueil pour être tenu informé des mises à jour qui vous intéressent. Consultez les derniers articles de blogue et les dernières mises à jour d'activité et de communauté.",
    whatNeedsAttentionTitle : "Quels sont les éléments qui requièrent votre attention ?",
    whatNeedsAttentionContent : "Utilisez les filtres pour voir qui mentionne votre nom, visualiser d'autres notifications et afficher les articles qui nécessitent une action.",
    whatsImportantTitle : "Qu'est-ce qui compte pour vous ?",
    whatsImportantContent : "Déplacez ou retirez des applications de votre page pour obtenir la présentation et le contenu que vous souhaitez.",
    customizePageTitle : "Personnalisez votre page",
    customizePageContent : "Ajoutez des applications à votre page d'accueil pour suivre uniquement les sujets qui vous intéressent depuis un seul emplacement.",
    thanksForWatchingTitle : "Merci de votre attention",
    thanksForWatchingContent : "Visualisez à nouveau cette visite guidée à partir du menu Aide.",
    thanksExploreContent : "Lorsque vous explorez d'autres zones, telles que Fichiers ou Communautés, pensez à visualiser les visites guidées pour devenir plus productif.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Partez à la découverte",
    haveLookAroundContent : "Utilisez les liens <b>Partager</b> et <b>Explorer</b> pour découvrir Connections. Découvrez comment vous pouvez collaborer avec des collègues et gagner en productivité.",
    whatsImportantGSContent : "Cliquez sur <b>Ma page</b> pour afficher votre tableau de bord personnalisé. Ajoutez, déplacez ou retirez des applications afin de vous concentrer sur ce qui est important pour vous. Suivez exactement ce qui vous intéresse depuis un seul emplacement.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "Qu'est-ce qu'une communauté ?",
    whatsACommunityContent : "Une communauté est un point central dédié au partage de contenu et d'idées. Vous pouvez collaborer avec les membres de votre équipe ou avec des personnes qui partagent un même centre d'intérêt.",
    whatCanIJoinTitle : "Pourquoi rejoindre une communauté ?",
    whatCanIJoinContent : "Les communautés recommandées identifient les communautés auxquelles vos collègues appartiennent. Si vous en voyez une qui vous intéresse, cliquez dessus. Vous pouvez aussi rechercher des communautés dans le but de les rejoindre.",
    whatColleaguesUpToTitle : "Sur quoi travaillent mes collègues ?",
    whatColleaguesUpToContent : "La vue de votre organisation répertorie toutes les communautés publiques que vous pouvez rejoindre. Recherchez une communauté qui vous intéresse.",
    startOwnCommTitle : "Démarrez votre propre communauté !",
    startOwnCommContent : "Vous ne trouvez pas ce dont vous avez besoin ? Démarrez une communauté afin de partager des informations et de collaborer avec d'autres personnes.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Organisez-vous !",
    getOrganizedContent : "L'application Fichiers permet de stocker des documents et des photos de manière centralisée, afin de les consulter et de les partager depuis n'importe où.",
    findCreateFileTitle : "Ajout ou création de fichier",
    findCreateFileContent : "Envoyez par téléchargement un fichier existant ou créez un document si vous disposez d'HCL Docs. Quelle que soit la méthode utilisée, vos fichiers sont disponibles uniquement pour vous ou pour que vous les partagiez avec d'autres personnes.",
    takeActionTitle : "Passez à l'action !",
    takeActionContent : "Les fichiers dont vous êtes propriétaire apparaissent dans votre vue Mes fichiers, dans laquelle vous pouvez étiqueter et épingler des fichiers, les ajouter à des dossiers et les partager avec d'autres.<br/><br/>Cliquez sur un fichier pour l'afficher et le commenter.",
    getLatestTitle : "Organisez-vous avec Mon unité",
    getLatestContent : "Rangez fichiers et dossiers clé à un seul et même emplacement. Si votre organisation prend en charge la fonction de synchronisation, installez le plug-in de bureau pour synchroniser automatiquement les modifications apportées aux fichiers.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Faites équipe avec des communautés",
    teamUpContent : "Rejoignez ou suivez des communautés pour collaborer avec une équipe. Les communautés dont vous êtes propriétaire, auxquelles vous appartenez, ou que vous suivez, sont répertoriées ensemble pour que vous puissiez accorder toute votre attention aux concentrateurs les plus importants pour vous.",
    getBackTitle : "Retournez rapidement à vos communautés préférées",
    getBackContent : "Affichez les communautés que vous avez visitées en dernier pour reprendre facilement là où vous vous étiez arrêté. Vous pouvez également changer la vue ou utiliser la fonction de recherche pour trouver une communauté.",
    createUniqueTitle : "Créez une communauté unique",
    createUniqueContent : "Utilisez les applications Connections que vous connaissez pour construire un concentrateur d'équipe.  Ou bien, utilisez l'application Points forts pour créer une expérience personnalisée avec un contenu provenant de diverses sources et adapté à vos utilisateurs.  Essayez !",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Voyez où vous êtes allé",
    seeWhereContent : "Revenez aux fichiers ou aux dossiers que vous avez créés ou sur lesquels vous avez collaboré... rapidement !",
    filterFilesTitle : "Filtrez les fichiers comme vous le souhaitez",
    filterFilesContent : "Utilisez les deux panneaux de navigation pour rechercher des fichiers. Parcourez les fichiers par vue ou restreignez la vue en cours par étiquette, date, personne, etc.<br/><br/>Affichez davantage de contenu. Cliquez sur l'icône active pour masquer le panneau latéral.",
    metricsThemeTreeTitle : "Choisissez votre objectif",
    metricsThemeTreeContent : "Affichez les métriques de votre communauté sous différents angles.",
    metricsDateRangeTitle : "Affichez les modifications au fil du temps",
    metricsDateRangeContent : "Analysez les données pour des périodes partant de la semaine passée et remontant jusqu'à la date de démarrage de la communauté, ou pour une période que vous définissez.",
    metricsSwitchTitle : "Deux présentations sont offertes",
    metricsSwitchContent : "Basculez d'une icône à l'autre pour afficher les totaux sous forme de graphiques ou de tableaux.",
    metricsGroupByTitle : "Filtrez par groupe",
    metricsGroupByContent : "Affichez les données pour toutes les personnes ou bien répartissez-les par zone géographique, par rôle ou par service."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
