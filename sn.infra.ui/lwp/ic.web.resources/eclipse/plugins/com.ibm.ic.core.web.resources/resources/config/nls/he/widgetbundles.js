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
            'sand_DYK' : 'אנשים שאולי מוכרים לך',
            'sand_recomItems' : 'המלצות',
            'sand_recomComm' : 'המלצות',
            'sand_thingsInCommon' : 'דברים משותפים',
            'sand_socialPath' : 'מה מחבר בינינו?',
            'sand_simComm' : 'קהילות דומות'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'היררכיית ניהול',
            'multiFeedReader' : 'פרסומים אחרונים',
            'filesReader' : 'קבצים',
            'multiWidget' : 'פרטי פרופיל',
            'board' : 'הלוח',
            'contactInfo' : 'פרטי איש קשר',
            'backgroundInfo' : 'רקע',
            'structTags' : 'תגים מובנים',
            'commonTags' : 'תגי ארגון',
            'socialTags' : 'תגים',
            'linkRoll' : 'הקישורים שלי',
            'friends' : 'רשת'
         },

         // Stock Communities widget titles
         'Blog' : 'בלוג',
         'IdeationBlog' : 'בלוג רעיונות',
         'Activities' : 'פעילויות',
         'Files' : 'קבצים',
         'Wiki' : 'ויקי',
         'RichContent' : 'תוכן עשיר',
         'Forum' : 'פורומים',
         'Bookmarks' : 'סימניות',
         'Members' : 'חברים',
         'Feeds' : 'ערוצי תוכן',
         'widgetPalette' : 'בורר פקדים',
         'feedReader' : 'קורא ערוצי תוכן',
         'SubcommunityNav' : 'תת-קהילות',
         'CommunityUpdates' : 'עדכוני קהילה',
         'Updates' : 'עדכונים אחרונים',
         'RecentUpdates' : 'עדכונים אחרונים',
         'StatusUpdates' : 'עדכוני מצב',
         'Calendar' : {
            'default' : 'אירועים',
            'view' : 'אירועים צפויים'
         },
         'RelatedCommunities' : 'קהילות קשורות',
         'MyLibrary' : 'הספריה שלי',
         'MyLibrary.sequenceNumber' : 'הספריה שלי {0}',
         'Tags' : 'תגים',
         'MembersSummary' : 'חברים',
         'description' : 'תיאור קהילה',
         'ImportantBookmarks' : 'סימניות חשובות',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'הבלטות',
         	'Highlights.description' : 'התאמה אישית של סקירת הקהילה וצבירה תוכן ממגוון מקורות לבניית חוויה מרתקת יותר.'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'גלריית מדיה',
            'MediaGallery.description' : 'שיתוף תצלומים וסרטונים עם הקהילה.',
            'CustomLibrary' : 'ספריה מקושרת',
            'CustomLibrary.sequenceNumber' : 'ספריה מקושרת {0}',
            'CustomLibrary.description' : 'שימוש במאגר מסמכים בקהילה.',
            'Library' : 'ספריה',
            'Library.sequenceNumber' : 'ספריה {0}',
            'Library.description' : 'עבודה עם קבצים מהקהילה שלכם באמצעות טיוטות, סוקרים ופרסום.',
            'librarysummary' : 'מאגר מסמכים',
            'librarysummary.description' : 'שימוש במאגר מסמכים בקהילה.',
            'Gallery' : 'גלריה',
            'Gallery.description' : 'הצגת קבצים בקהילה.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'הפגשת תת-קבוצה של חברים בקהילה קיימת.',
         'galleryDescription' : 'שיתוף תצלומים וסרטונים עם הקהילה.',
         'blogsDescription' : 'שיתוף מהיר ודינמי של חדשות ודעות עם חברי קהילה.',
         'ideationBlogsDescription' : 'מאפשר לחברי קהילה לתרום ולהצביע לרעיונות.',
         'commActivitesDescription' : 'מעקב אחר יעדי הקהילה, ארגון משימות והקצאת מטלות.',
         'filesDescription' : 'טעינה, שיתוף ועבודה עם קבצים ותיקיות של הקהילה.',
         'wikiDescription' : 'שיתוף משאבים עם הקהילה ועבודת צוות עם עמיתים.',
         'forumDescription' : 'דיון בנושאים ושיתוף רעיונות.',
         'eventsDescription' : 'פרסום אירועי קהילה חשובים כגון סמינרים והכשרות. ',
         'commBookmarks' : 'שיתוף משאבי רשת שימושיים ישירות מהקהילה שלכם.',
         'commFeeds' : 'הוספת ערוצי תוכן לאתרים רלוונטיים לקהילה שלכם.',
         'updatesDescription' : 'עדכון מצב הקהילה שלכם כדי לדווח לחברים אחרים מה אתם עושים.',
         'calendarDescription' : 'פרסום אירועי קהילה חשובים כגון סמינרים והכשרות. ',
         'relatedCommunitiesDescription' : 'בניית קישורים לקהילות אחרות.  ',
         'importantBookmarksDescription' : 'איסוף סימניות למשאבי רשת החשובים לקהילה שלכם.',
         'tagsDescription' : 'קיבוץ תוכן חשוב באמצעות מילות מפתח בעלות משמעות המקלות על איתור התוכן.',
         'descriptionDescription' : 'סקירה של ייעוד הקהילה.  התיאור צריך לשקף את המטרות והערכים של הקהילה.',
         'memberSummaryDescription' : 'אנשים החברים בקהילה זו.  תוכלו לשתף מידע ולעבוד במשותף עם חברים בקהילה.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});
