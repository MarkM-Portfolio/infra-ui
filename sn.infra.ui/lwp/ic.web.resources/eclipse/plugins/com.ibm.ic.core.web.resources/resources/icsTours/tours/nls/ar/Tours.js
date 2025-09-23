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
    homepageWelcomeTitle : "مرحبا!",
    homepageWelcomeContent : "الصفحة الرئيسية هي مركز الأوامر الخاص بك، حيث يمكنك تركيز التأثير على أهم التحديثات ومشاهدة البنود التي تحتاج الى اهتمامك.",
    easyKeepUpTitle : "من السهل البقاء على اتصال!",
    easyKeepUpContent : "قم باجراء مسح ضوئي للصفحة الرئيسية الخاصة بك للبقاء على علم بأهم التحديثات التي تهتم بها. ومشاهدة أحدث التعديلات في ادخالات المدونة والنشاط والمجتمع.",
    whatNeedsAttentionTitle : "ما الذي يتطلب اهتمامك؟",
    whatNeedsAttentionContent : "استخدم المرشحات لمشاهدة من يقوم بالاشارة الى اسمك، ولمشاهدة الاعلامات الأخرى، ومشاهدة البنود التي تتطلب اتخاذ تصرف.",
    whatsImportantTitle : "ما هو المهم بالنسبة لك؟",
    whatsImportantContent : "يمكنك نقل أو ازالة التطبيقات من الصفحة الخاصة بك للحصول على الشكل والمحتوى الذي تريده.",
    customizePageTitle : "تهيئة الصفحة الخاصة بك",
    customizePageContent : "يمكنك اضافة تطبيقات الى الصفحة الرئيسية الخاصة بك بحيث يمكنك تتبع ما تريده فقط من مكان واحد.",
    thanksForWatchingTitle : "شكرا للمشاهدة",
    thanksForWatchingContent : "يمكنك مشاهدة هذه الجولة مرة أخرى من قائمة المساعدة.",
    thanksExploreContent : "عند استكشاف المجالات الأخرى، مثل الملفات أو المجتمعات، ارجع الى الخطوات الارشادية لمساعدتك لتصبح أكثر انتاجية.",
    // For use on Getting Started home page if needed
    haveLookAroundTitle : "القاء نظرة حول",
    haveLookAroundContent : "استخدام روابط <b>المشاركة</b> و<b>الاستكشاف</b> لمعرفة المزيد عن Connections. اكتشف كيف يمكنك المشاركة مع زملائك وأن تصبح أكثر انتاجية.",
    whatsImportantGSContent : "اضغط على <b>الصفحة الخاصة بي</b> لمشاهدة الاستعراض البياني المهيأ الخاص بك. قم باضافة أو نقل أو ازالة التطبيقات بحيث يمكنك تركيز التأثير على ما يهمك. قم بتتبع ما تريده فقط من مكان واحد.",
    // Communities Guided tour; for d61, runs as a JIT tour on first visit to Communities app
    whatsACommunityTitle : "ما هو المجتمع؟",
    whatsACommunityContent : "المجتمع هو المحور الذي يمكنك من خلاله مشاركة المحتوى والأفكار. يمكنك المشاركة مع فريقك أو الأشخاص الذين لهم نفس الاهتمامات المشتركة.",
    whatCanIJoinTitle : "ما الذي يمكنني الانضمام اليه؟",
    whatCanIJoinContent : "تقوم المجتمعات المفضلة بتعريف المجتمعات التي يعد زملائك جزءا منها. اذا شاهدت ما يعجبك، قم بالضغط عليه. يمكنك أيضا البحث عن المجتمعات للانضمام اليها.",
    whatColleaguesUpToTitle : "ما الذي وصل اليه زملائي؟",
    whatColleaguesUpToContent : "تقوم مشاهدة المؤسسة الخاصة بك بعرض كل المجتمعات العامة التي يمكنك الانضمام اليها. يمكنك الاستعراض لايجاد المجتمع الذي يهمك.",
    startOwnCommTitle : "بدء المجتمع الخاص بك!",
    startOwnCommContent : "لا ترى ما تحتاجه؟ قم ببدء مجتمع بحيث يمكنك الاشتراك والمشاركة مع الآخرين.",
    // Files Guided Tour; for d61, runs as JIT tour on first visit to Files app
    getOrganizedTitle : "التنظيم!",
    getOrganizedContent : "تسمح لك الملفات بتخزين الوثائق والصور في مكان مركزي بحيث يمكنك التوصل اليها ومشاركتها من أي مكان.",
    findCreateFileTitle : "اضافة أو تكوين ملف",
    findCreateFileContent : "يمكنك تحميل ملف موجود أو تكوين وثيقة جديدة اذا كان HCL Docs متاحا لك. بأي من الطريقتين، تكون الملفات الخاصة بك متاحة لك فقط أو لتشاركها مع الآخرين.",
    takeActionTitle : "اتخاذ تصرف!",
    takeActionContent : "تظهر الملفات التي تمتلكها في مشاهدة الملفات الخاصة بي، حيث يمكنك تعليم وتثبيت الملفات، واضافتهم الى الحافظات، ومشاركتهم مع الأخرين.<br/><br/>اضغط على ملف لمشاهدته والتعقيب عليه.",
    getLatestTitle : "التنظيم باستخدام قرص التشغيل الخاص بي",
    getLatestContent : "يمكنك تنظيم الملفات والحافظات الرئيسية في مكان واحد. اذا كانت مؤسستك تدعم خاصية التزامن، قم بتركيب البرنامج المساعد Desktop لمزامنة التغييرات للملفات آليا.",
    // Communities Tour; new content for CR3, runs as JIT tour on first visit to Communities app
    teamUpTitle : "تشكيل فريق مع المجتمعات!",
    teamUpContent : "قم بالانضمام الى أو متابعة المجتمعات للتعاون مع أحد الفرق. يتم عرض المجتمعات التي تمتلكها، أو تنتمي اليها، أو تقوم بمتابعتها مع بعضهم البعض بحيث يمكنك التركيز على المحاور الخاصة بك الأكثر أهمية.",
    getBackTitle : "العودة الى المجتمعات المفضلة سريعا!",
    getBackContent : "امكانية مشاهدة المجتمعات التي قمت بزيارتها مؤخرا بحيث يمكنك المتابعة بسهولة من حيث قد توقفت. يمكنك أيضا تغيير المشاهدة أو استخدام البحث لايجاد أحد المجتمعات.",
    createUniqueTitle : "تكوين مجتمع متفرد!",
    createUniqueContent : "يمكن استخدام تطبيقات Connections التي تعرفها لبناء محور الفريق.  أو، يمكن استخدام تطبيق Highlights لتكوين تجربة مهيأة باستخدام المحتويات من مصادر مختلفة، وتعديلها وفقا للاحتياجات الشخصية للمستخدمين الخاصين بك.  تحقق من ذلك!",
    // Files Tour; new content for CR3, runs as JIT tour on first visit to Files app
    seeWhereTitle : "مشاهدة أين كنت",
    seeWhereContent : "العودة الى الملفات أو الحافظات التي قمت بتكوينها أو مشاركتها مع... سريعا!",
    filterFilesTitle : "ترشيح الملفات وفقا لطريقتك",
    filterFilesContent : "يمكن استخدام كل من لوحات التجول لايجاد الملفات. يمكن الاستعراض وفقا للمشاهدة، أو تضييق المشاهدة الحالية وفقا لشارة التعليم، والتاريخ، والأشخاص، وأكثر من ذلك.<br/><br/>شاهد المزيد من المحتويات! اضغط على الشارة الفعالة لاخفاء الشاشة الجانبية.",
    metricsThemeTreeTitle : "اختيار تركيز التأثير الخاص بك",
    metricsThemeTreeContent : "مشاهدة القياسات عبر المجتمع الخاص بك من خلال عدسات مختلفة.",
    metricsDateRangeTitle : "مشاهدة التغييرات على مر الوقت",
    metricsDateRangeContent : "تحليل بيانات الفترة الزمنية التي تمتد من الأسبوع الماضي الى حيث تم بدء المجتمع، أو لفترة تقوم بتعريفها.",
    metricsSwitchTitle : "الحصول عليها على حد سواء",
    metricsSwitchContent : "التبديل بين الشارات لعرض الاجماليات كمخططات بيانية أو جداول.",
    metricsGroupByTitle : "ترشيح البيانات وفقا للمجموعة",
    metricsGroupByContent : "مشاهدة بيانات كل الأشخاص، أو قسمها جغرافيا، أو وظيفيا، أو وفقا للادارة."
/**
   * Languages can be added using
   * "zh": true
   *
   * And specified as not available using
   * "zh": false
   */
});
