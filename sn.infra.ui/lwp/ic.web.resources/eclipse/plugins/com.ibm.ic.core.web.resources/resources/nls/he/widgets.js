/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

// FIXME: temporary stop-gap until we make net.jazz.ajax.dojoResourceModules work with AMD bundles
define({
      // NLS_ENCODING=UNICODE
      // NLS_MARKUP=IBMJDK21
      //// G11N GA UI

      // COMPONENTPREFIX CLFWZ
      // NLS_MESSAGEFORMAT_VAR
      // NLS_CHARSET=UTF-8
         'str_component_id' : 'CLFWZ',

         // Login Required
         'msg.loginRequired' : 'התחברו כדי לראות את התוכן שלכם.',
         'ErrorGeneric' : 'אירעה שגיאה בהצגת התוכן. נא לפנות אל מנהלן המערכת.‏',
         'showErrorDetails' : 'הצגת פרטי שגיאה',
         'HideErrorDetails' : 'הסתרת פרטי שגיאה',

         'loadInfo' : 'טעינת מידע...‏',

         'dykLoadInfo' : 'הצגת אנשים מומלצים להוספה לרשת שלכם.',
         'dykLoadInfo2' : 'הצגת אנשים מומלצים להוספה לרשת שלכם בהתבסס על חברי הרשת הקיימים שלכם.',

         'wcuLoadInfo' : 'ראו איך אתם קשורים לפרופיל זה בהתבסס על הרשת והפעולות שלכם.',

         'ticLoadInfo' : 'ראו מה משותף לכם ולפרופיל זה בהתבסס על הרשת והפעולות שלכם.',

         'deleteWidget' : 'סילוק יישום',
         'hideWidget' : 'הסתרת יישום',
         'deleteWidgetMsg' : 'אתם עומדים לסלק את היישום שלכם. פעולה זו תסלק את כל תוכן היישום. לא ניתן לבטל פעולה זו. תוכן שחברים שיתפו עם הקהילה ימשיך להיות משותף. אם היישום יתווסף שוב, תוכן משותף זה יופיע שוב ביישום.<br/><br/>אם אתם בטוחים שברצונכם לסלק את היישום, לחצו על לחצן הסילוק למטה. <br/>אחרת, לחצו על \'ביטול\'.',
         'hideWidgetMsg' : 'אתם עומדים להסתיר את היישום שלכם.<br/><br/>כדי להפעיל את היישום מחדש בהמשך, פשוט הוסיפו אותו שוב לקהילה שלכם. כל תוכן היישום יישמר ללא שינוי.',
         'deleteWidgetWarn' : 'אזהרה: הנתונים עבור היישום {0} יימחקו לצמיתות.',
         'deleteWidgetConfirm' : 'אני מבין שהיישום והנתונים המשויכים אליו יימחקו ולא ניתן יהיה לשחזר אותם.',
         'deleteWithSharedContentWidgetConfirm' : 'אני מבין שהיישום והנתונים המשויכים אליו יימחקו ולא ניתן יהיה לשחזר אותם.  תוכן שחברים שיתפו עם הקהילה ימשיך להיות משותף. אם היישום יתווסף שוב, תוכן משותף זה יופיע שוב ביישום.',
         'delete' : 'מחיקה',
         'hide' : 'הסתרה',
         'cancel' : 'ביטול',
         'save' : 'שמירה',
         'edit' : 'עריכה',
         'view' : 'הצגה',
         'help' : 'עזרה',
         'refresh' : 'רענון',
         'actions' : 'פעולות',
         'switchTabWarning' : 'עליכם לשמור את השינויים בכל לשונית לפני שתעברו ללשונית אחרת.',
         'confirmDeleteWidget' : 'אתם בטוחים שברצונכם לסלק את היישום?<br><br>תוכלו לשחזר יישום זה בהמשך מהתפריט \'פעולות קהילה\'.  הגדרות להצגת היישום יאבדו, אך נתוני היישום יישארו שלמים.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'שינוי כותרת',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'פעולות עבור: ${0}',
         'actionsmenu' : 'תפריט פעולות',
         'toggle' : 'מיתוג',
         'open' : 'פתיחה',
         'close' : 'סגירה',

         'widgets_Move' : 'העברה',
         'widgets_MoveUp' : 'העברה למעלה',
         'widgets_MoveDown' : 'העברה למטה',
         'widgets_MoveLeft' : 'העברה ימינה',
         'widgets_MoveRight' : 'העברה שמאלה',
         'widgets_MovePrev' : 'העברה לעמודה הקודמת',
         'widgets_MoveNext' : 'העברה לעמודה הבאה',
         'widgets_Min' : 'מזעור',
         'widgets_Max' : 'הגדלה',

         'widgetCat_AllWidgets' : 'כל היישומים',
         'widgetCat_thrdParty' : 'אחר',
         'widgetCat_hidden' : 'מוסתרת',
         'widget_BackToOverview' : 'בחזרה אל דף הסקירה',
         'widget_AddingWidget' : 'הוספת יישום',
         'widget_RemovingWidget' : 'סילוק יישום',
         'widget_AllTab' : 'הכל',
         'widget_HideConfirmation' : 'הסתרתם את ${0} מהקהילה בהצלחה. ',
         'widget_HideConfirmationUndo' : 'ביטול',

         'link.remove' : 'סילוק',
         'link.window.close' : 'סגירת החלון',
         'link.window.openNewWindow' : 'לחיצה כאן תפתח חלון חדש',

         'error.title.generic' : 'אירעה בעיה.',
         'error.message.generic' : 'אירעה בעיה - לחצו על הלחצן \'חזרה\' כדי לנסות שוב. אם הבעיה נמשכת, דווחו על הבעיה בפורום התמיכה.',
         'info.feed.general.moreinfo' : 'לחצו כאן כדי להציג פרטים נוספים',

         'label.theme.customize' : 'הוספת יישומים',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'אין ערוצי תוכן זמינים',
         'errorDefaultMsg' : 'לא ניתן להציג את נתוני היישום',
         'errorDefaultMsg2' : 'אירעה שגיאה, נא לפנות למנהלן המערכת',
         'errorDefaultMsg3' : 'לחצו כאן כדי להציג פרטים נוספים',
         'errorMsg' : 'הודעה: ',
         'errorName' : 'שם: ',
         'errorType' : 'סוג: ',
         'errorLine' : 'שורה:',
         'errorStackTrace' : 'מעקב: ',
         'errorUnableToConnect' : 'החיבור נכשל עבור {0}'

});

