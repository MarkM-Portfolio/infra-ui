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
    homepageWelcomeTitle : "시작",
    homepageWelcomeContent : "홈 페이지는 사용자가 중요 업데이트에 중점을 두고 주목해야 하는 항목을 볼 수 있는 명령 센터입니다.",
    easyKeepUpTitle : "유지가 용이합니다!",
    easyKeepUpContent : "홈 페이지를 스캔하여 관심을 두고 있는 최상위 업데이트를 유지하십시오. 최신 블로그 게시물과 활동 및 커뮤니티 업데이트를 보십시오.",
    whatNeedsAttentionTitle : "주목해야 할 대상은 무엇입니까?",
    whatNeedsAttentionContent : "필터를 사용하여 귀하의 이름을 언급하는 사용자를 보고, 기타 알림을 보며, 조치가 필요한 항목을 보십시오.",
    whatsImportantTitle : "무엇이 중요합니까?",
    whatsImportantContent : "페이지에서 앱을 이동하거나 제거하여 원하는 모양과 컨텐츠를 가져오십시오.",
    customizePageTitle : "페이지의 사용자 정의",
    customizePageContent : "한 위치에서 원하는 대상만 추적할 수 있도록 홈 페이지에 앱을 추가하십시오.",
    thanksForWatchingTitle : "지켜봐 주셔서 감사합니다.",
    thanksForWatchingContent : "도움말 메뉴에서 다시 이 둘러보기를 보십시오.",
    thanksExploreContent : "기타 영역(예: 파일 또는 커뮤니티)을 탐색하는 경우, 안내식 둘러보기를 확인하면 생산성 향상에 도움이 됩니다.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "둘러보기",
    haveLookAroundContent : "<b>공유</b> 및 <b>탐색</b> 링크를 사용하여 Connections에 대해 알아보십시오. 동료와 협업하여 생산성을 향상시킬 수 있는 방법을 찾으십시오.",
    whatsImportantGSContent : "<b>내 페이지</b>를 클릭하여 사용자 설치 대시보드를 보십시오. 중요사항에 초점을 맞출 수 있도록 앱을 추가, 이동하거나 제거하십시오. 한 위치에서 원하는 대상만 추적하십시오.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "커뮤니티란 무엇입니까?",
    whatsACommunityContent : "커뮤니티는 사용자가 컨텐츠와 아이디어를 공유할 수 있는 허브입니다. 자체 팀 또는 공통의 관심사를 공유하는 사용자와 협업할 수 있습니다.",
    whatCanIJoinTitle : "어디에 참여할 수 있습니까?",
    whatCanIJoinContent : "추천된 커뮤니티는 동료가 구성원인 커뮤니티를 식별합니다. 원하는 커뮤니티가 나타나면 이를 클릭하십시오. 참여할 커뮤니티를 검색할 수도 있습니다.",
    whatColleaguesUpToTitle : "어디까지가 내 동료입니까?",
    whatColleaguesUpToContent : "조직의 보기에는 참여할 수 있는 모든 공용 커뮤니티가 나열되어 있습니다. 관심 대상인 커뮤니티를 찾아보십시오.",
    startOwnCommTitle : "자체 커뮤니티를 시작하십시오!",
    startOwnCommContent : "필요한 정보를 찾을 수 없습니까? 다른 사용자와 공유하고 협업할 수 있도록 커뮤니티를 시작하십시오.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "구성하십시오!",
    getOrganizedContent : "파일을 사용하면 모든 위치에서 액세스하고 공유할 수 있도록 문서와 사진을 중앙 위치에 저장할 수 있습니다.",
    findCreateFileTitle : "파일 추가 또는 작성",
    findCreateFileContent : "기존 파일을 업로드하거나 HCL Docs가 사용 가능한 경우 새 문서를 작성하십시오. 두 방법 모두, 파일을 자신이 직접 사용하거나 이를 다른 사용자와 공유할 수 있습니다.",
    takeActionTitle : "조치를 취하십시오!",
    takeActionContent : "소유한 파일이 내 파일 보기에 나타납니다. 여기에서 파일에 태그를 지정하고, 파일을 고정하고, 폴더에 파일을 추가하고, 다른 사용자와 파일을 공유할 수 있습니다.<br/><br/>파일을 클릭하여 보고 주석을 달 수 있습니다.",
    getLatestTitle : "내 드라이브에서 구성",
    getLatestContent : "한 위치에서 키 파일 및 폴더를 구성하십시오. 조직에서 동기화 기능을 지원하는 경우에는 파일에 대한 변경사항을 자동으로 동기화할 수 있도록 데스크탑 플러그인을 설치하십시오.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "커뮤니티와 협업하십시오!",
    teamUpContent : "커뮤니티에 참여하거나 팔로우하여 팀과 협업합니다. 소유, 소속 또는 팔로우하는 커뮤니티가 함께 나열되므로 가장 중요한 허브에 집중할 수 있습니다.",
    getBackTitle : "좋아하는 커뮤니티로 빨리 돌아가세요!",
    getBackContent : "마지막으로 방문한 커뮤니티를 보고 사용자가 중단했던 곳을 쉽게 찾을 수 있습니다. 보기를 변경하거나 검색을 사용하여 커뮤니티를 찾을 수도 있습니다.",
    createUniqueTitle : "고유한 커뮤니티를 작성하세요!",
    createUniqueContent : "알고 있는 연결 앱을 사용하여 팀 허브를 구축하십시오. 또는 하이라이트 앱을 사용하여 사용자를 위해 개인 설정된 다양한 소스의 콘텐츠로 사용자 정의된 환경을 만드십시오. 확인해 보십시오!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "사용자가 방문했던 위치를 확인",
    seeWhereContent : "작성하거나 공동 작업하는 파일 또는 폴더로 빨리 돌아가세요!",
    filterFilesTitle : "사용자 방식으로 파일 필터링",
    filterFilesContent : "두 개의 탐색 패널을 사용하여 파일을 찾습니다. 보기 별로 찾아보거나 태그, 날짜, 사용자 등을 기준으로 현재 뷰를 좁히십시오.<br/><br/>더 많은 컨텐츠를 확인해 보십시오! 활성 아이콘을 클릭하여 사이드 패널을 숨기십시오.",
    metricsThemeTreeTitle : "집중 사항 선택",
    metricsThemeTreeContent : "여러 다른 렌즈로 커뮤니티 전체의 메트릭을 봅니다.",
    metricsDateRangeTitle : "시간 경과에 따른 변경사항 보기",
    metricsDateRangeContent : "지난 주부터 커뮤니티 시작까지의 기간 또는 정의한 기간 동안의 데이터를 분석합니다.",
    metricsSwitchTitle : "두 방법 모두 유지",
    metricsSwitchContent : "아이콘 간에 전환하여 차트나 테이블로 총계를 표시합니다.",
    metricsGroupByTitle : "그룹으로 필터링",
    metricsGroupByContent : "모든 사용자의 데이터를 보거나 지역, 역할 또는 부서별로 구분하십시오."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
