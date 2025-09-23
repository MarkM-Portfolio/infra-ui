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
    homepageWelcomeTitle : "שלום!",
    homepageWelcomeContent : "דף הבית הוא מרכז הבקרה שלכם, שבו תוכלו להתמקד בעדכונים חשובים ולראות פריטים הדורשים את תשומת לבכם.",
    easyKeepUpTitle : "קל להישאר מעודכנים!",
    easyKeepUpContent : "סקרו את דף הבית כדי לעקוב אחר עדכונים המעניינים אתכם. תוכלו להציג את פרסומי הבלוג האחרונים ועדכוני פעילויות וקהילות.",
    whatNeedsAttentionTitle : "מה דורש את תשומת לבכם?",
    whatNeedsAttentionContent : "השתמשו במסננים כדי לראות מי מזכיר את שמכם, כדי להציג הודעות אחרות, וכדי לראות פריטים הדרושים פעולה.",
    whatsImportantTitle : "מה חשוב לכם?",
    whatsImportantContent : "העבירו או סלקו יישומים מהדף שלכם כדי לקבל את המראה ואת התוכן הרצויים.",
    customizePageTitle : "התאמת הדף שלכם",
    customizePageContent : "הוסיפו יישומים לדף הבית שלכם כדי שתוכלו לעקוב אחר פריטים ממקום אחד.",
    thanksForWatchingTitle : "תודה שצפיתם",
    thanksForWatchingContent : "תוכלו להציג סיור זה שוב מתפריט העזרה.",
    thanksExploreContent : "כשתסיירו באזורים אחרים, כגון יישומי הקבצים או הקהילות, חפשו סיורים מודרכים שיסייעו לכם לעבוד ביעילות.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "סיירו בסביבה",
    haveLookAroundContent : "השתמשו בקישור <b>שיתוף</b> ובקישור <b>סיור</b> כדי ללמוד להכיר את Connections.‏ ראו איך לעבוד בצוות עם עמיתים ולשפר את יעילותכם.",
    whatsImportantGSContent : "לחצו על <b>הדף שלי</b> כדי להציג את לוח הבקרה המותאם שלכם. תוכלו להוסיף, להעביר, או לסלק יישומים כך שתוכלו להתמקד בדברים החשובים לכם. תוכלו לעקוב אחר הפריטים המעניינים אתכם ממקום אחד.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "מהי קהילה?",
    whatsACommunityContent : "קהילה היא מרכז שבו תוכלו לשתף תוכן ורעיונות. תוכלו לעבוד עם הצוות שלכם או עם אנשים בעלי תחומי עניין משותפים.",
    whatCanIJoinTitle : "למה אוכל להצטרף?",
    whatCanIJoinContent : "קהילות מומלצות הן קהילות שעמיתיכם חברים בהן. אם ראיתם קהילה המעניינת אתכם, לחצו עליה. תוכלו גם לחפש קהילות כדי להצטרף אליהן.",
    whatColleaguesUpToTitle : "מהם העמיתים שלי עושים?",
    whatColleaguesUpToContent : "תצוגת הארגון כוללת את כל הקהילות הציבוריות שאתם יכולים להצטרף אליהן. עיינו בתצוגה כדי לאתר קהילה המעניינת אתכם.",
    startOwnCommTitle : "צרו קהילה משלכם!",
    startOwnCommContent : "לא מצאתם מה שחיפשתם? צרו קהילה כדי שתוכלו לשתף ולעבוד עם אחרים.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "הגיע הזמן להתארגן!",
    getOrganizedContent : "יישום הקבצים מאפשר לכם לאחסן מסמכים ותצלומים במיקום מרכזי כך שתוכלו לגשת אליהם ולשתף אותם מכל מקום.",
    findCreateFileTitle : "הוספה או יצירה של קובץ",
    findCreateFileContent : "תוכלו לטעון קובץ קיים, או ליצור מסמך חדש אם HCL Docs זמין עבורכם. בכל מקרה, הקבצים זמינים רק עבורכם, או שתוכלו לשתף אותם עם אחרים.",
    takeActionTitle : "קדימה לעבודה!",
    takeActionContent : "קבצים בבעלותכם מופיעים בתצוגה 'הקבצים שלי', שבה תוכלו לתייג ולנעוץ קבצים, להוסיף אותם לתיקיות ולשתף אותם עם אחרים.<br/><br/>לחצו על קובץ כדי להציג אותו ולהעיר עליו.",
    getLatestTitle : "ארגנו את החומרים שלכם באמצעות 'הכונן שלי'",
    getLatestContent : "תוכלו לשים קבצים ותיקיות חשובים במקום אחד. אם ארגונכם תומך במאפיין הסינכרון, התקינו את תוסף שולחן העבודה כדי לסנכרן אוטומטית שינויים בקבצים.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "השתתפו בעבודת צוות באמצעות יישום הקהילות!",
    teamUpContent : "הצטרפו או עקבו אחר קהילות כדי לעבוד ביחד עם צוות. קהילות בבעלותכם וקהילות שאתם שייכים אליהן או עוקבים אחריהן מוצגות ביחד כדי לרכז את מוקדי העניין שלכם.",
    getBackTitle : "חזרה מהירה לקהילות מועדפות!",
    getBackContent : "הציגו את הקהילות שבהן ביקרתם לאחרונה כדי להמשיך מהמקום שבו הפסקתם. תוכלו גם לשנות את התצוגה או להשתמש בחיפוש איתור קהילה.",
    createUniqueTitle : "צרו קהילה ייחודית!",
    createUniqueContent : "השתמשו ביישומי Connections כדי לבנות מרכז צוות.  לחלופין, תוכלו להשתמשו ביישום ההבלטות כדי ליצור חוויה מותאמת עם תוכן ממגוון מקורות, המותאם אישית למשתמשים שלכם.  נסו בעצמכם!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "ראו איפה הייתם",
    seeWhereContent : "תוכלו לחזור לקבצים או לתיקיות שיצרתם או עבדתם עליהם בצוות...במהירות!",
    filterFilesTitle : "סננו קבצים בדרך המתאימה לכם",
    filterFilesContent : "השתמשו בשתי חלוניות הניווט כדי לאתר קבצים. עיינו לפי תצוגה, או צמצמו את התצוגה הנוכחית לפי תג, תאריך, אדם ועוד.<br/><br/>ראו יותר תוכן! לחצו על האיקון הפעיל כדי להסתיר את חלונית הצד.",
    metricsThemeTreeTitle : "בחרו את המיקוד שלכם",
    metricsThemeTreeContent : "הצגת סטטיסטיקות מכל חלקי הקהילה דרך עדשות שונות.",
    metricsDateRangeTitle : "הצגת שינויים לאורך זמן",
    metricsDateRangeContent : "ניתוח נתונים עבור תקופות זמן החל מהשבוע החולף ועד תאריך יצירת הקהילה, או עבור תקופה שתגדירו. ",
    metricsSwitchTitle : "בשתי הצורות",
    metricsSwitchContent : "מעבר בין איקונים כדי להציג סיכומים כתרשימים או כטבלאות",
    metricsGroupByTitle : "סינון לפי קבוצה",
    metricsGroupByContent : "הצגת נתונים עבור כל האנשים, או פירוט לפי אזור גאוגרפי, תפקיד או מחלקה."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
