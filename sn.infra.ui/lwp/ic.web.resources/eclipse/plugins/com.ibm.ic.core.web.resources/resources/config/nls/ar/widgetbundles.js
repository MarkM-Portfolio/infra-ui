/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

// FIXME: temporary stop-gap until we make net.jazz.ajax.dojoResourceModules work with AMD bundles
define({
      // NLS_ENCODING=UNICODE
      // NLS_MARKUP=IBMJDK21
      //// G11N GA UI

      // COMPONENTPREFIX CLFWZ
      // NLS_MESSAGEFORMAT_VAR
      // NLS_CHARSET=UTF-8
         // These are the default strings that become part of lconn.core.nls.widgetbundles

         // Stock SaND widget titles
         'lc_sand' : {
            'sand_DYK' : 'الأشخاص الذين قد تعرفهم',
            'sand_recomItems' : '‏التوصيات‏',
            'sand_recomComm' : '‏التوصيات‏',
            'sand_thingsInCommon' : 'الأشياء المشتركة',
            'sand_socialPath' : 'من يربط بيننا؟',
            'sand_simComm' : 'المجتمعات المتماثلة'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'تسلسل ارسال التقارير-الى',
            'multiFeedReader' : 'أحدث الارسالات',
            'filesReader' : 'ملفات',
            'multiWidget' : 'معلومات ملف بيانات التعريف',
            'board' : 'اللوحة',
            'contactInfo' : 'معلومات الاتصال',
            'backgroundInfo' : 'الخلفية',
            'structTags' : 'شارات التعليم الهيكلية',
            'commonTags' : 'شارات المؤسسة',
            'socialTags' : 'شارات التعليم',
            'linkRoll' : 'الوصلات الخاصة بي',
            'friends' : 'شبكة الاتصال'
         },

         // Stock Communities widget titles
         'Blog' : 'المدونة',
         'IdeationBlog' : 'مدونة الأفكار',
         'Activities' : 'الأنشطة',
         'Files' : 'الملفات',
         'Wiki' : 'صفحة Wiki',
         'RichContent' : 'المحتوى المتميز',
         'Forum' : 'منتدى المناقشات',
         'Bookmarks' : 'علامات التوقف',
         'Members' : 'الأعضاء',
         'Feeds' : 'المعلومات المسترجعة',
         'widgetPalette' : 'لوحة عناصر واجهة التعامل',
         'feedReader' : 'وحدة قراءة المعلومات المسترجعة',
         'SubcommunityNav' : 'المجتمعات الفرعية',
         'CommunityUpdates' : 'تحديثات المجتمع',
         'Updates' : 'أحدث التحديثات',
         'RecentUpdates' : 'أخر التحديثات',
         'StatusUpdates' : 'تحديثات الحالة',
         'Calendar' : {
            'default' : 'الأحداث',
            'view' : 'الأحداث المستجدة'
         },
         'RelatedCommunities' : 'المجتمعات المتعلقة',
         'MyLibrary' : 'المكتبة الخاصة بي',
         'MyLibrary.sequenceNumber' : 'المكتبة الخاصة بي {0}',
         'Tags' : 'شارات التعليم',
         'MembersSummary' : 'أعضاء',
         'description' : 'وصف المجتمع',
         'ImportantBookmarks' : 'علامات توقف هامة',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'الاظهارات',
         	'Highlights.description' : 'يمكنك تعديل مقدمة المجتمع وفقا للاحتياجات الشخصية وتجميع المحتويات من مصادر مختلفة لبناء تجربة أكثر اقناعا.'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'استوديو الوسائط',
            'MediaGallery.description' : 'مشاركة صور وفيديو مع المجتمع.',
            'CustomLibrary' : 'مكتبة متصلة',
            'CustomLibrary.sequenceNumber' : 'مكتبة متصلة {0}',
            'CustomLibrary.description' : 'استخدام مستودع تخزين وثائق في المجتمع الخاص بك.',
            'Library' : 'المكتبة',
            'Library.sequenceNumber' : 'المكتبة {0}',
            'Library.description' : 'التعامل مع الملفات باستخدام المسودات وبرنامج المراجعة والنشر.',
            'librarysummary' : 'مستودع تخزين الوثائق',
            'librarysummary.description' : 'استخدام مستودع تخزين وثائق في المجتمع الخاص بك.',
            'Gallery' : 'الاستديو',
            'Gallery.description' : 'ملفات استعراض الحالة في هذا المجتمع.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'احضار فئة فرعية من الأعضاء معا في مجتمع موجود.',
         'galleryDescription' : 'مشاركة صور وفيديو مع المجتمع.',
         'blogsDescription' : 'مشاركة الأخبار والمشاهدات الخاصة بك بطريقة سريعة وديناميكية مع أعضاء المجتمع.',
         'ideationBlogsDescription' : 'التفاعل مع أعضاء المجتمع للمشاركة والتصويت على الأفكار.',
         'commActivitesDescription' : 'تتبع أهداف المجتمع الخاص بك وتنظيم المهام وتخصيص بنود المهام الواجبة.',
         'filesDescription' : 'تحميل ومشاركة والتعامل مع ملفات وحافظات المجتمع.',
         'wikiDescription' : 'مشاركة المصادر مع المجتمع الخاص بك والتفاعل مع الزملاء.',
         'forumDescription' : 'مناقشة الموضوعات ومشاركة الأفكار.',
         'eventsDescription' : 'ترحيل أحداث المجتمع الهامة مثل الندوات والتدريب. ',
         'commBookmarks' : 'جعل مصادر الانترنت المفيدة متاحة مباشرة من خلال المجتمع الخاص بك.',
         'commFeeds' : 'اضافة وحدات المعلومات المسترجعة لمواقع الانترنت المناظرة للمجتمع الخاص بك.',
         'updatesDescription' : 'قم بتحديث حالة المجتمع الخاص بك للسماح للأعضاء الآخرين بمعرفة ما تقوم به.',
         'calendarDescription' : 'ترحيل أحداث المجتمع الهامة مثل الندوات والتدريب. ',
         'relatedCommunitiesDescription' : 'تكوين روابط للمجتمعات الأخرى.  ',
         'importantBookmarksDescription' : 'قم بتجميع علامات التوقف لمصادر الانترنت الهامة للمجتمع الخاص بك.',
         'tagsDescription' : 'يمكنك تجميع المحتوى الهام باستخدام كلمات مرشدة ذات معنى ليسهل ايجادها.',
         'descriptionDescription' : 'مقدمة عن المجتمع الخاص بك.  يجب أن يعكس الوصف أهداف وقيم المجتمع.',
         'memberSummaryDescription' : 'الأشخاص الذين يعدون جزء من هذا المجتمع.  يمكنك مشاركة المعلومات مع الأعضاء لتقديم المجتمع للأشخاص.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});
