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
    homepageWelcomeTitle : "歡迎使用！",
    homepageWelcomeContent : "首頁是發號施令的中心，在這裡您可以把注意力放在重要的更新項目上，並查看需要注意的項目。",
    easyKeepUpTitle : "輕鬆掌握最新消息！",
    easyKeepUpContent : "快速瀏覽首頁，即可掌握所需的最新資訊。檢視最新的部落格文章及活動與社群更新項目。",
    whatNeedsAttentionTitle : "需要注意哪些內容？",
    whatNeedsAttentionContent : "使用過濾器來查看哪些用戶提到您的名字、檢視其他通知以及查看需要執行動作的項目。",
    whatsImportantTitle : "哪些功能對您很重要？",
    whatsImportantContent : "在您的頁面上移動或移除應用程式，即可打造想要的外觀和內容。",
    customizePageTitle : "自訂您的頁面",
    customizePageContent : "將應用程式新增至您的首頁，即可從同一個地方追蹤想要的內容。",
    thanksForWatchingTitle : "謝謝您觀看",
    thanksForWatchingContent : "請再次從「說明」功能表觀看此導覽。",
    thanksExploreContent : "瀏覽其他區域（例如「檔案」或「社群」）時，請查閱引導式導覽以協助您提高生產力。",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "四處看看",
    haveLookAroundContent : "使用<b>共用</b>及<b>瀏覽</b>鏈結來瞭解 Connections。瞭解您如何與同事進行分工合作並提高生產力。",
    whatsImportantGSContent : "按一下<b>我的頁面</b>以檢視您的自訂儀表板。新增、移動或移除應用程式，以便您可以專注於對您而言很重要的事項。即可從同一個地方追蹤想要的內容。",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "什麼是社群？",
    whatsACommunityContent : "社群是您可以分享內容與構想的中心。分工合作的對象可以是您的團隊，也可以是有共同喜好的人。",
    whatCanIJoinTitle : "可以加入哪些社群？",
    whatCanIJoinContent : "建議的社群會幫您找出同事所加入的社群。如果看到喜歡的社群，請按一下該社群名稱。您還可以搜尋要加入的社群。",
    whatColleaguesUpToTitle : "我的同事們最近在做什麼？",
    whatColleaguesUpToContent : "您的組織視圖會列出您可加入的所有公用社群。請瀏覽並找出您感興趣的社群。",
    startOwnCommTitle : "開始建立您自己的社群！",
    startOwnCommContent : "找不到您需要的內容嗎？開始建立社群，即可與其他人共用及分工合作。",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "開始整理！",
    getOrganizedContent : "您可透過「檔案」，將文件及照片集中儲存在同一位置，以便從任何地方進行存取及共用。",
    findCreateFileTitle : "新增或建立檔案",
    findCreateFileContent : "上傳現有檔案，或者如果可以使用 HCL Docs，則建立新文件。不論採用何種方式，您的檔案可以只給自己使用，也可以與其他人共用。",
    takeActionTitle : "馬上行動！",
    takeActionContent : "您擁有的檔案會出現在「我的檔案」視圖中，您可以在其中標記和釘選檔案，將檔案新增至資料夾，以及與其他人共用檔案。<br/><br/>按一下檔案以檢視和註解檔案。",
    getLatestTitle : "使用「我的磁碟機」開始整理",
    getLatestContent : "在同一個地方組織重要檔案及資料夾。如果您的組織支援同步功能，請安裝桌面外掛程式以自動同步檔案變更。",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "透過社群建立團隊！",
    teamUpContent : "加入或追蹤社群以與團隊協作。您擁有、隸屬或追蹤的社群會一併列出，因此您可以關注極重要的中心。",
    getBackTitle : "快速回到我的最愛社群！",
    getBackContent : "檢視您前次造訪的社群，因此您可以輕鬆地從離開的位置繼續。您也可以變更視圖，或者使用搜尋來尋找社群。",
    createUniqueTitle : "建立唯一的社群！",
    createUniqueContent : "使用您瞭解的 Connections 應用程式來建置團隊中心。或者，使用「要點」應用程式，藉由各種來源的內容營造自訂體驗，針對您的使用者進行個人化。快來試試！",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "查看您先前所在的位置",
    seeWhereContent : "回到您建立或協作處理的檔案或資料夾... 神速！",
    filterFilesTitle : "以您的方式過濾檔案",
    filterFilesContent : "使用兩個導覽窗格來尋找檔案。依視圖瀏覽，或者依標籤、日期、人員等等縮小現行視圖。<br/><br/>查看更多內容！按一下作用中圖示以隱藏側面畫面。",
    metricsThemeTreeTitle : "選擇您的焦點",
    metricsThemeTreeContent : "透過不同的鏡頭來檢視社群的度量值。",
    metricsDateRangeTitle : "查看一段時間的變更",
    metricsDateRangeContent : "分析特定時段（從上週到社群啟動時間，或者您所定義的時段）的資料。",
    metricsSwitchTitle : "採用兩種方式",
    metricsSwitchContent : "在圖示之間切換以將總計顯示為圖表或表格。",
    metricsGroupByTitle : "依群組過濾",
    metricsGroupByContent : "查看所有人的資料，或者依地理位置、角色或部門進行資料分類。"
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
