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
            'sand_DYK' : 'Люди, которых вы можете знать',
            'sand_recomItems' : 'Рекомендации',
            'sand_recomComm' : 'Рекомендации',
            'sand_thingsInCommon' : 'Общие ресурсы',
            'sand_socialPath' : 'Кто нас связывает?',
            'sand_simComm' : 'Похожие сообщества'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'Цепочка подчинения',
            'multiFeedReader' : 'Последние публикации',
            'filesReader' : 'Файлы',
            'multiWidget' : 'Информация о профайле',
            'board' : 'Доска объявлений',
            'contactInfo' : 'Контактная информация',
            'backgroundInfo' : 'Биография',
            'structTags' : 'Структурированные теги',
            'commonTags' : 'Теги организации',
            'socialTags' : 'Теги',
            'linkRoll' : 'Мои ссылки',
            'friends' : 'Сеть'
         },

         // Stock Communities widget titles
         'Blog' : 'Блог',
         'IdeationBlog' : 'Блог идей',
         'Activities' : 'Операции',
         'Files' : 'Файлы',
         'Wiki' : 'Вики',
         'RichContent' : 'Насыщенное информационное наполнение',
         'Forum' : 'Форумы',
         'Bookmarks' : 'Закладки',
         'Members' : 'Участники',
         'Feeds' : 'Ленты новостей',
         'widgetPalette' : 'Панель виджетов',
         'feedReader' : 'Читатель ленты новостей',
         'SubcommunityNav' : 'Подсообщества',
         'CommunityUpdates' : 'Обновления сообщества',
         'Updates' : 'Последние обновления',
         'RecentUpdates' : 'Последние обновления',
         'StatusUpdates' : 'Обновления статуса',
         'Calendar' : {
            'default' : 'Мероприятия',
            'view' : 'Планируемые мероприятия'
         },
         'RelatedCommunities' : 'Связанные сообщества',
         'MyLibrary' : 'Моя библиотека',
         'MyLibrary.sequenceNumber' : 'Моя библиотека {0}',
         'Tags' : 'Теги',
         'MembersSummary' : 'Участники',
         'description' : 'Описание сообщества',
         'ImportantBookmarks' : 'Важные закладки',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'Основные моменты',
         	'Highlights.description' : 'Персонализация обзора сообщества и объединение материалов из множества источников, чтобы сделать интерфейс еще более привлекательным. '
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'Галерея медиафайлов',
            'MediaGallery.description' : 'Делитесь фотографиями и видеозаписями с сообществом.',
            'CustomLibrary' : 'Подключенная библиотека',
            'CustomLibrary.sequenceNumber' : 'Подключенная библиотека {0}',
            'CustomLibrary.description' : 'Используйте хранилище документов в сообществе.',
            'Library' : 'Библиотека',
            'Library.sequenceNumber' : 'Библиотека {0}',
            'Library.description' : 'Работайте с файлами с помощью черновиков, проверяющих и публикации.',
            'librarysummary' : 'Хранилище документов',
            'librarysummary.description' : 'Используйте хранилище документов в сообществе.',
            'Gallery' : 'Галерея',
            'Gallery.description' : 'Демонстрация файлов в этом сообществе.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'Объедините подмножество участников существующего сообщества.',
         'galleryDescription' : 'Делитесь фотографиями и видеозаписями с сообществом.',
         'blogsDescription' : 'Быстро и динамично делитесь новостями и взглядами с другими участниками сообщества.',
         'ideationBlogsDescription' : 'Работайте вместе с другими участниками сообщества над созданием новых идей и голосуйте за идеи.',
         'commActivitesDescription' : 'Следите за целями сообщества, организуйте задачи и назначайте задания.',
         'filesDescription' : 'Передавайте, открывайте совместный доступ и работайте с файлами и папками сообщества.',
         'wikiDescription' : 'Делитесь ресурсами с сообществом и сотрудничайте с коллегами.',
         'forumDescription' : 'Обсуждайте темы и делитесь идеями.',
         'eventsDescription' : 'Публикуйте важные мероприятия сообщества, такие как семинары и обучение. ',
         'commBookmarks' : 'Сделайте полезные веб-ресурсы доступными прямо из сообщества.',
         'commFeeds' : 'Добавьте ленты новостей тематических веб-сайтов в сообщество.',
         'updatesDescription' : 'Обновляйте ваш статус, чтобы другие участники сообщества знали, чем вы заняты.',
         'calendarDescription' : 'Публикуйте важные мероприятия сообщества, такие как семинары и обучение. ',
         'relatedCommunitiesDescription' : 'Создавайте ссылки на другие сообщества.  ',
         'importantBookmarksDescription' : 'Сбор закладок на веб-сайты, важные для вашего сообщества.',
         'tagsDescription' : 'Материалы, которые могут быть интересны для группы, с ключевыми словами для удобного поиска.',
         'descriptionDescription' : 'Общие сведения о сообществе и его назначении.  Описание должно отражать цели и задачи сообщества.',
         'memberSummaryDescription' : 'Пользователи, входящие в сообщество.  Делитесь информацией и сотрудничайте с участниками сообщества, чтобы оно было активным.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});
