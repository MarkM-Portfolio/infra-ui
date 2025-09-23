/* Copyright IBM Corp. 2014, 2018  All Rights Reserved.              */

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
            'sand_DYK' : 'Білесіз бе',
            'sand_recomItems' : 'Ұсынылымдар',
            'sand_recomComm' : 'Ұсынылымдар',
            'sand_thingsInCommon' : 'Жалпы нәрселер',
            'sand_socialPath' : 'Бізді кім байланыстырады?',
            'sand_simComm' : 'Ұқсас қауымдастықтар'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'Есеп беру тізбегі',
            'multiFeedReader' : 'Соңғы хабарлар',
            'filesReader' : 'Файлдар',
            'multiWidget' : 'Профиль мәліметі',
            'board' : 'Тақта',
            'contactInfo' : 'Контакт мәліметтері',
            'backgroundInfo' : 'Өң',
            'structTags' : 'Құрылымдық тэгтер',
            'commonTags' : 'Ұйым тэгтері',
            'socialTags' : 'Тегтер',
            'linkRoll' : 'Менің сілтемелерім',
            'friends' : 'Желі'
         },

         // Stock Communities widget titles
         'Blog' : 'Блог',
         'IdeationBlog' : 'Идеялар блогы',
         'Activities' : 'Әрекеттер',
         'Files' : 'Файлдар',
         'Wiki' : 'Вики',
         'RichContent' : 'Пішімделген мәтін',
         'Forum' : 'Форумдар',
         'Bookmarks' : 'Бетбелгілер',
         'Members' : 'Мүшелер',
         'Feeds' : 'Веб-арналар',
         'widgetPalette' : 'Виджет бояғышы',
         'feedReader' : 'Веб-арнасы оқушысы',
         'SubcommunityNav' : 'Ішкі қауымдастықтар',
         'CommunityUpdates' : 'Қауымдастық жаңартулары',
         'Updates' : 'Соңғы жаңартулар',
         'RecentUpdates' : 'Соңғы жаңартулар',
         'StatusUpdates' : 'Күйі жаңартулары',
         'Calendar' : {
            'default' : 'Оқиғалар',
            'view' : 'Келе жатқан оқиғалар'
         },
         'RelatedCommunities' : 'Байланысты қауымдастықтар',
         'MyLibrary' : 'Жеке кітапхана',
         'MyLibrary.sequenceNumber' : 'Жеке кітапхана {0}',
         'Tags' : 'Тегтер',
         'MembersSummary' : 'Мүшелер',
         'description' : 'Қауымдастық сипаттама',
         'ImportantBookmarks' : 'Маңызды бетбелгілер',
         // ICEC
         'highlights': {
         	'Highlights' : 'Бөлектеулер',
         	'Highlights.description' : 'Қауіпсіздікті күшейту үшін, Қауымдастық шолуына және әр түрлі көздерден мазмұнды біріктіріңіз.'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'Мультимедиаплейер жиынтығы',
            'MediaGallery.description' : 'Фотосуреттер мен бейнелерді қауымдастықпен ортақ пайдаланыңыз.',
            'CustomLibrary' : 'Сілтенген кітапхана',
            'CustomLibrary.sequenceNumber' : 'Сілтеме жасалған кітапхана {0}',
            'CustomLibrary.description' : 'Құжат репозиторийін қауымдастықта пайдаланыңыз.',
            'Library' : 'Кітапхана',
            'Library.sequenceNumber' : 'Кітапхана {0}',
            'Library.description' : 'Файлдармен жобаларды, тексерушілерді және жариялауды пайдаланып жұмыс істеңіз.',
            'librarysummary' : 'Құжат репозиторийі',
            'librarysummary.description' : 'Құжат репозиторийін қауымдастықта пайдаланыңыз.',
            'Gallery' : 'Жиынтық',
            'Gallery.description' : 'Осы қауымдастықтағы көрсетуге арналған файлдар.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'Бұрыннан бар қауымдастық ішінде мүшелер жиынын біріктіріңіз.',
         'galleryDescription' : 'Фотосуреттер мен бейнелерді қауымдастықпен ортақ пайдаланыңыз.',
         'blogsDescription' : 'Жаңалықтарыңыз бен көріністеріңізді қауымдастық мүшелерімен жылдам және қарқынды түрде ортақ пайдаланыңыз.',
         'ideationBlogsDescription' : 'Осы виджетті қауымдастық мүшелерімен бірігіп жұмыс істеу және идеялар бойынша дауыс беру үшін пайдаланыңыз.',
         'commActivitesDescription' : 'Қауымдастығыңыздың мақсаттарын бақылаңыз, тапсырмаларды ұйымдастырыңыз және іс тізімі элементтерін ұйымдастырыңыз.',
         'filesDescription' : 'Қауымдастық файлдарын жаңартыңыз, оларды ортақ пайдаланыңыз және олармен жұмыс істеңіз.',
         'wikiDescription' : 'Қауымдастығыңызбен ресурстарды ортақ пайдаланыңыз және әріптестеріңізбен бірігіп жұмыс істеңіз.',
         'forumDescription' : 'Тақырыптарды талқылаңыз және идеялармен бөлісіңіз.',
         'eventsDescription' : 'Семинарлар мен тренингтер сияқты маңызды қауымдастық оқиғаларын жариялаңыз. ',
         'commBookmarks' : 'Пайдалы веб ресурстарын қауымдастықтан тікелей қолжетімді етіңіз.',
         'commFeeds' : 'Қауымдастығыңыздағы қатысты Веб-тораптарға арналар қосыңыз.',
         'updatesDescription' : 'Қауымдастығыңызға не істеп жатқаныңызды білдіру үшін қауымдастық күйін жаңартыңыз.',
         'calendarDescription' : 'Семинарлар мен тренингтер сияқты маңызды қауымдастық оқиғаларын жариялаңыз. ',
         'relatedCommunitiesDescription' : 'Басқа қауымдастықтарға сілтемелер жасаңыз.  ',
         'importantBookmarksDescription' : 'Қауымдастығыңызға импорттаған желі ресурстары үшін бетбелгілерді жинаңыз.',
         'tagsDescription' : 'Оңай табу үшін, маңызы бар кілт сөздерді қолдана отыра, қызықты мазмұнды топтастырыңыз.',
         'descriptionDescription' : 'Қауымдастығыңыз қандай екенін алдын ала көру.  Сипаттама қауымдастықтың мақсаттары мен мәндеріне әсен ретуі керек.',
         'memberSummaryDescription' : 'Осы қауымдастықтың бөлігі болатын адамдар.  Мәліметті ортақ қолданыңыз және файлға қауымдастығыңызды апару үшін мүшелермен бірлесіп жұмыс істеңіз.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});

