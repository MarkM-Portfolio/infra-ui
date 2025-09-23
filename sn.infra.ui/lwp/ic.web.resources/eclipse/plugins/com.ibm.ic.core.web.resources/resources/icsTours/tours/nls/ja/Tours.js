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
    homepageWelcomeTitle : "ようこそ",
    homepageWelcomeContent : "ホーム・ページとは、重要な更新を参照したり、注意が必要な項目を確認するためのコマンド・センターです。",
    easyKeepUpTitle : "最新の情報を簡単に入手",
    easyKeepUpContent : "ホーム・ページにざっと目を通すことで、注意が必要な更新を把握することができます。 最新のブログ投稿、アクティビティーやコミュニティーの更新を参照できます。",
    whatNeedsAttentionTitle : "注意を引きやすい表示に変える",
    whatNeedsAttentionContent : "フィルターを使用することで、あなたに言及したユーザーを表示したり、他の通知を参照したり、アクションが必要な項目を確認することができます。",
    whatsImportantTitle : "重要なものだけの表示に変える",
    whatsImportantContent : "自分のページにあるアプリを移動または削除することで、必要な外観とコンテンツが表示されるようにします。",
    customizePageTitle : "ページのカスタマイズ",
    customizePageContent : "ホーム・ページにアプリを追加することで、必要な情報に 1 つの場所からアクセスできるようになります。",
    thanksForWatchingTitle : "ツアーの参照",
    thanksForWatchingContent : "このツアーは「ヘルプ」メニューから再度表示できます。",
    thanksExploreContent : "「ファイル」や「コミュニティー」などの他の領域を探索する場合も、ガイド・ツアーをご利用ください。",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "機能をチェック",
    haveLookAroundContent : "<b>「共有」</b>と<b>「探索」</b>のリンクを使用することで Connections について知ることができます。 ワーク・メンバーとコラボレーションして生産性を上げる方法が分かります。",
    whatsImportantGSContent : "<b>「マイ・ページ」</b>をクリックしてカスタム・ダッシュボードを表示します。 アプリを追加、移動、削除することで、自分にとって重要な情報にフォーカスできるようにします。 必要な情報に 1 つの場所からアクセスできるようになります。",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "コミュニティーとは?",
    whatsACommunityContent : "コミュニティーは、コンテンツやアイデアを共有するためのハブとなる場所です。 チームや、共通の興味を持つユーザーとコラボレーションを行うことができます。",
    whatCanIJoinTitle : "参加するコミュニティーを探す",
    whatCanIJoinContent : "推奨コミュニティーでは、あなたのワーク・メンバーが所属しているコミュニティーが特定されます。 希望するコミュニティーがあれば、それをクリックします。 参加するコミュニティーを検索することもできます。",
    whatColleaguesUpToTitle : "ワーク・メンバーの最新動向を知る",
    whatColleaguesUpToContent : "組織のビューには、参加可能なすべての公開コミュニティーがリストされます。 リストを参照して興味のあるコミュニティーを見つけます。",
    startOwnCommTitle : "自分のコミュニティーを開始する",
    startOwnCommContent : "希望するものが見つからない場合は、 自分自身のコミュニティーを開始して、他のユーザーとの情報共有やコラボレーションを行えるようにします。",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "コンテンツを整理する",
    getOrganizedContent : "「ファイル」は、文書や写真を保管するための一元的な場所であり、どこからでもアクセスや共有が行えます。",
    findCreateFileTitle : "ファイルを追加または作成する",
    findCreateFileContent : "既存のファイルをアップロードするか、HCL Docs が利用可能な場合は新規文書を作成します。 いずれの方法でも、ファイルを自分だけが閲覧可能にしたり、他のユーザーと共有したりできます。",
    takeActionTitle : "実際に活用してみましょう",
    takeActionContent : "自分が所有するファイルは「マイ・ファイル」ビューに表示されます。ここでファイルにタグ付けしたりピン留めしたり、ファイルをフォルダーに追加したり、他のユーザーに共有することができます。<br/><br/>ファイルをクリックして表示したりコメントします。",
    getLatestTitle : "マイ・ドライブを使用してファイルを整理",
    getLatestContent : "主要なファイルやフォルダーを 1 つの場所に整理します。 組織で同期機能をサポートしている場合は、デスクトップ・プラグインをインストールすることで、ファイルへの変更を自動的に同期することができます。",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "コミュニティーを活用してチームを編成しましょう",
    teamUpContent : "コミュニティーに参加するかフォローして、チームとコラボレーションを行います。 自分が所有、所属、フォローするコミュニティーがまとまって表示されるため、最も重要なハブにフォーカスすることができます。",
    getBackTitle : "お気に入りのコミュニティーにすぐに戻ることができます",
    getBackContent : "前回アクセスしたコミュニティーが表示されるため、参照途中だったサイトに簡単に戻ることができます。 ビューを変更したり、検索を使用してコミュニティーを簡単に見つけることもできます。",
    createUniqueTitle : "独自のコミュニティーを作成しましょう",
    createUniqueContent : "既知の Connections アプリを使用してチーム・ハブを構築します。  また、ハイライト・アプリを使用することでさまざまなソースからコンテンツを集約し、ユーザー用にパーソナライズされたカスタム・エクスペリエンスを作成します。  是非お試しください。",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "アクセスした場所を表示します",
    seeWhereContent : "作成またはコラボレーションを行ったファイルやフォルダーに素早く戻ります。",
    filterFilesTitle : "お好みの方法でファイルをフィルターします",
    filterFilesContent : "両方のナビゲーション・ペインを使用してファイルを検索します。 ビューごとに参照したり、タグ、日付、ユーザー等で現在のビューを絞り込みます。<br/><br/>他にも数多くのコンテンツがあります。 アクティブなアイコンをクリックして、サイド・パネルを非表示にします。",
    metricsThemeTreeTitle : "フォーカスを選択",
    metricsThemeTreeContent : "コミュニティー全体のメトリックを異なる視点から表示します。",
    metricsDateRangeTitle : "一定期間にわたる変更の表示",
    metricsDateRangeContent : "過去 1 週間からコミュニティー開始時点からにわたる期間、または定義した期間のデータを分析します。",
    metricsSwitchTitle : "二通りの方法が利用可能",
    metricsSwitchContent : "アイコンを切り替えることで、合計をチャートまたはテーブルのいずれかで表示します。",
    metricsGroupByTitle : "グループでフィルター",
    metricsGroupByContent : "すべてのユーザーのデータを表示したり、地域、役割、部門ごとに表示します。"
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
