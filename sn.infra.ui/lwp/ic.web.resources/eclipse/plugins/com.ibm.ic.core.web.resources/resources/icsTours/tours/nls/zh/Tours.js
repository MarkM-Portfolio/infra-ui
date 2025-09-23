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
    homepageWelcomeTitle : "欢迎",
    homepageWelcomeContent : "主页是您发号施令的中心，在这里您可以将注意力放在重要更新上，并查看需要特别注意的项目。",
    easyKeepUpTitle : "方便跟进！",
    easyKeepUpContent : "扫视主页，掌握您关注的更新。查看最新的博客帖子、活动和社区更新。",
    whatNeedsAttentionTitle : "您需要注意哪些内容？",
    whatNeedsAttentionContent : "可使用过滤器来查看谁提及了您的姓名，查看其他通知以及查看需要采取措施的项目。",
    whatsImportantTitle : "什么对您很重要？",
    whatsImportantContent : "在页面中移动或移除应用程序，以获得您想要的外观和内容。",
    customizePageTitle : "定制页面",
    customizePageContent : "将应用程序添加到主页中，以便从同一个位置跟踪所需内容。",
    thanksForWatchingTitle : "感谢观看",
    thanksForWatchingContent : "从“帮助”菜单可以再次查看此教程。",
    thanksExploreContent : "探索其他区域（例如“文件”或“社区”）时，请查看引导式教程以帮助您提高工作效率。",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "浏览一番",
    haveLookAroundContent : "可使用<b>共享</b>和<b>探索</b>链接来了解 Connections。了解如何与同事合作并提高工作效率。",
    whatsImportantGSContent : "单击<b>我的页面</b>以查看定制仪表板。添加、移动或移除应用程序，以便关注对您重要的内容。从同一个位置跟踪所需内容。",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "什么是社区？",
    whatsACommunityContent : "社区是一个中心，您可以在其中分享内容和想法。您可以与自己的团队或志同道合的人协作。",
    whatCanIJoinTitle : "我可以加入哪些社区？",
    whatCanIJoinContent : "推荐的社区帮您找到了同事已加入的社区。如果看到您喜欢的社区，请按一下社区名称。您也可以搜索要加入的社区。",
    whatColleaguesUpToTitle : "我的同事加入哪些社区？",
    whatColleaguesUpToContent : "贵组织的视图列出了您可以加入的所有公共社区。请进行浏览，以找到感兴趣的社区。",
    startOwnCommTitle : "创建自己的社区!",
    startOwnCommContent : "未找到所需信息？创建一个社区，以便与他人共享和协作。",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "开始整理！",
    getOrganizedContent : "通过“文件”，您可将文档和照片存储在一个中央位置，以便从任何位置进行访问和共享。",
    findCreateFileTitle : "添加或创建文件",
    findCreateFileContent : "请上载现有文件，或者如果 HCL Docs 可用，请新建文档。无论使用哪种方式，您的文件都只供您使用或由您与他人共享。",
    takeActionTitle : "行动起来！",
    takeActionContent : "您拥有的文件显示在“我的文件”视图中，您可以在其中标记和置顶文件、将其添加到文件夹以及与他人共享。<br/><br/>单击文件以进行查看和评论。",
    getLatestTitle : "使用“我的驱动器”进行整理",
    getLatestContent : "在同一个位置整理重要文件和文件夹。如果贵组织支持同步功能，请安装桌面插件以自动同步文件更改。",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "与社区合作！",
    teamUpContent : "加入或关注社区以与团队协作。您拥有、所属于或关注的社区将列在一起，以便您可以专注于最重要的中心。",
    getBackTitle : "快速返回到最喜欢的社区！",
    getBackContent : "查看您最近访问过的社区，以便轻松选取停留过的社区。您还可以更改视图或使用搜索来查找社区。",
    createUniqueTitle : "创建独特的社区！",
    createUniqueContent : "使用您知道的 Connections 应用来构建团队中心。或者，使用“要点”应用创建定制体验，其中包含各种来源的内容，为您的用户量身定制。请尝试看看！",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "查看您浏览过的位置",
    seeWhereContent : "快速返回到您创建或展开协作的文件或文件夹！",
    filterFilesTitle : "按您喜欢的方式过滤文件",
    filterFilesContent : "使用两个导航窗格来查找文件。按视图浏览，或者按标记、日期、人员等缩小当前视图范围。<br/><br/>查看更多内容！单击活动图标以隐藏侧面板。",
    metricsThemeTreeTitle : "选择焦点",
    metricsThemeTreeContent : "通过不同的视角查看社区中的统计。",
    metricsDateRangeTitle : "查看随时间推移而发生的变化",
    metricsDateRangeContent : "分析从社区启动起过去一周，或您定义的时间段内的数据。",
    metricsSwitchTitle : "以两种方式提供统计",
    metricsSwitchContent : "在图标之间进行切换，以便采用图表或者表的形式来显示总计。",
    metricsGroupByTitle : "按组进行过滤",
    metricsGroupByContent : "查看所有用户的数据，或者按地理位置、角色或部门对数据进行细分。"
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
