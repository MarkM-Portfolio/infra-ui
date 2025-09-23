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
    homepageWelcomeTitle : "Bem-vindo!",
    homepageWelcomeContent : "A sua página inicial é o seu centro de controlo, onde se pode concentrar nas actualizações importantes e ver os itens que necessitam da sua atenção.",
    easyKeepUpTitle : "É fácil manter-se actualizado!",
    easyKeepUpContent : "Verifique a sua página inicial para se manter a par das actualizações relevantes. Veja as mais recentes publicações de blogue e as actualizações da comunidade e actividades.",
    whatNeedsAttentionTitle : "O que necessita da sua atenção?",
    whatNeedsAttentionContent : "Utilize os filtros para ver quem menciona o seu nome, para ver outras modificações e ver itens que necessitam de acção.",
    whatsImportantTitle : "O que é importante para si?",
    whatsImportantContent : "Mova ou remova aplicações da sua página para obter o aspecto e o conteúdo pretendido.",
    customizePageTitle : "Personalizar a sua página",
    customizePageContent : "Adicione aplicações à sua página inicial para que possa seguir apenas o que pretende a partir de uma localização centralizada.",
    thanksForWatchingTitle : "Obrigado por assistir",
    thanksForWatchingContent : "Veja esta apresentação novamente a partir do menu Ajuda.",
    thanksExploreContent : "Quando explorar outras áreas, como os Ficheiros ou as Comunidades, procure as apresentações para o ajudarem a ser produtivo.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "Veja o que tem ao seu dispor",
    haveLookAroundContent : "Utilize as ligações <b>Partilhar</b> e <b>Explorar</b> para ficar a conhecer o Connections. Descubra como pode colaborar com colegas e ser produtivo.",
    whatsImportantGSContent : "Faça clique em <b>A minha página</b> para aceder à sua vista-resumo personalizada. Pode adicionar, mover ou remover aplicações para que se posso dedicar ao que é realmente importante para si. Siga apenas o que pretende a partir de uma localização centralizada.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "O que é uma Comunidade?",
    whatsACommunityContent : "Uma comunidade é um centro onde pode partilhar conteúdos e ideias. Pode colaborar com a sua equipa ou com as pessoas que partilham interesses comuns.",
    whatCanIJoinTitle : "Em que posso participar?",
    whatCanIJoinContent : "As comunidades recomendadas identificam as comunidades das quais os seus colegas fazem parte. Se vir uma comunidade de que gosta, faça clique na mesma. Também pode procurar comunidades para participar.",
    whatColleaguesUpToTitle : "Em que estão a trabalhar os meus colegas?",
    whatColleaguesUpToContent : "A vista da sua organização apresenta todas as comunidades públicas em que pode participar. Procure uma comunidade que seja do seu interesse.",
    startOwnCommTitle : "Inicie a sua própria comunidade!",
    startOwnCommContent : "Não encontra o que precisa? Inicie uma comunidade para que possa partilhar e colaborar com outros utilizadores.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "Organização!",
    getOrganizedContent : "Os Ficheiros permitem-lhe armazenar os seus documentos e fotografias numa localização central para que possa aceder e partilhar os mesmos a partir de qualquer local.",
    findCreateFileTitle : "Adicionar ou criar um ficheiro",
    findCreateFileContent : "Transfira um ficheiro existente ou crie um documento novo, se o HCL Docs estiver disponível. De qualquer das formas, os seus ficheiros estão disponíveis apenas para si ou para partilhar com outros utilizadores.",
    takeActionTitle : "Agir!",
    takeActionContent : "Os ficheiros dos quais é proprietário aparecem na sua vista Os meus ficheiros, onde pode etiquetar e afixar ficheiros, adicioná-los a pastas e partilhá-los com outros utilizadores.<br/><br/>Clique num ficheiro para visualizar e comentar o mesmo.",
    getLatestTitle : "Organização com A minha unidade",
    getLatestContent : "Organize os ficheiros e pastas mais importantes numa localização centralizada. Se a sua organização suportar a função de sincronização, instale o suplemento de ambiente de trabalho para sincronizar automaticamente alterações nos ficheiros.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "Crie equipas com as Comunidades!",
    teamUpContent : "Participe ou acompanhe comunidades para colaborar com uma equipa. As comunidades das quais é proprietário, a que pertence ou que acompanha são apresentadas em conjunto de forma a que se possa concentrar nos seus núcleos essenciais.",
    getBackTitle : "Volte às comunidades favoritas rapidamente!",
    getBackContent : "Visualize as comunidades que visitou mais recentemente de forma a que possa retomar o seu trabalho no ponto em que ficou. Também pode alterar a vista ou utilizar a procura para localizar uma comunidade.",
    createUniqueTitle : "Crie uma comunidade única!",
    createUniqueContent : "Utilize as aplicações do Connections que conhece para criar um núcleo para a equipa.  Ou utilize a aplicação Destaques (Highlights) para criar uma experiência personalizada com conteúdo de diversas origens, personalizada para os seus utilizadores.  Veja por si próprio!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "Visualize onde esteve",
    seeWhereContent : "Volte aos ficheiros ou pastas que criou ou em que colaborou... rapidamente!",
    filterFilesTitle : "Filtre os ficheiros à sua maneira",
    filterFilesContent : "Utilize ambas as áreas de navegação para encontrar ficheiros. Pesquise por vista ou limite a vista actual por etiqueta, data, pessoa e outros.<br/><br/>Visualize mais conteúdo! Clique no ícone activo para ocultar o painel lateral.",
    metricsThemeTreeTitle : "Escolha o seu foco",
    metricsThemeTreeContent : "Ver métricas em toda a comunidade através de diferente lentes.",
    metricsDateRangeTitle : "Ver alterações ao longo do tempo",
    metricsDateRangeContent : "Analisar dados para períodos de tempo desde a última semana até ao início da comunidade ou durante um período definido pelo utilizador.",
    metricsSwitchTitle : "Ver de ambas as formas",
    metricsSwitchContent : "Alterne entre os ícones para apresentar totais como gráficos ou como tabelas.",
    metricsGroupByTitle : "Filtrar por grupo",
    metricsGroupByContent : "Ver dados para todas as pessoas ou divida-os por geografia, função ou departamento."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
