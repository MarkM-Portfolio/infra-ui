/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>أعجبك هذا. </span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>أعجبك هذا </span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='أعجبك هذا' href='javascript:;' id='TOGGLE_${id}'>الغاء الاعجاب</a>",
         TOOLTIP : "الغاء الاعجاب"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>أعجبك هذا. </span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>أعجبك هذا  </span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='أعجبك  هذا' href='javascript:;' id='TOGGLE_${id}'>الغاء الاعجاب</a>",
         TOOLTIP : "الغاء الاعجاب"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>أعجبك هذا.</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>أعجبك هذا  </span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='أعجبك  هذا' href='javascript:;' id='TOGGLE_${id}'>الغاء الاعجاب</a>",
         TOOLTIP : "الغاء الاعجاب"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>اعجاب</a>",
         TOOLTIP : "اعجاب بهذا"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>اعجاب</a>",
         TOOLTIP : "اعجاب بهذا"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "الأشخاص الذين قاموا بتحديد علامة الاعجاب...",
      RECOMMENDED_HEADER_SHOWING_SOME : "الأشخاص الذين قاموا بتحديد علامة الاعجاب... (تم التخزين    بالاسم)",
      RECOMMENDED_CLOSE_TITLE : "اغلاق كشف الأشخاص الذين قاموا بتحديد علامة الاعجاب."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>اعجاب</a>",
         TOOLTIP : "اعجاب بهذا"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>أعجبك هذا. </span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>أعجبك هذا </span>   <span class='lotusDivider' role='separator'>-</span>   <a class='lotusLikeAction' role='button' aria-label='أعجبك   هذا' href='javascript:;' id='TOGGLE_${id}'>الغاء الاعجاب</a>",
         TOOLTIP : "الغاء الاعجاب"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "أعجب 0 من الأشخاص بهذا"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "أعجب شخص واحد"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "أعجب ${recommendCount} من الأشخاص"
      }
   },
   LOADING : "تحميل...",
   TEMPLATE_STRINGS : {
      LIKES : "يفضل"
   },
   ERROR : {
      TITLE : "تنبيه",
      RECOMMEND_LOAD_FAILED : "تم حذف هذا البند أو لم يعد مرئيا بالنسبة لك."
   }
})

