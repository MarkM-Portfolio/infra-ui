/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Ви се допаѓа ова' href='javascript:;' id='TOGGLE_${id}'>Не ми се допаѓа</a>",
         TOOLTIP : "Не ми се допаѓа"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Ви се допаѓа ова' href='javascript:;' id='TOGGLE_${id}'>Не ми се допаѓа</a>",
         TOOLTIP : "Не ми се допаѓа"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Ви се допаѓа ова' href='javascript:;' id='TOGGLE_${id}'>Не ми се допаѓа</a>",
         TOOLTIP : "Не ми се допаѓа"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Ми се допаѓа</a>",
         TOOLTIP : "Означете дека ви се допаѓа"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Ми се допаѓа</a>",
         TOOLTIP : "Означете дека ви се допаѓа"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Лица на кои им се допаѓа ова...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Лица на кои им се допаѓа ова... (сортирани по име)",
      RECOMMENDED_CLOSE_TITLE : "Затвори го списокот со лицата на кои им се допаѓа ова."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Ми се допаѓа </a>",
         TOOLTIP : "Означете дека ви се допаѓа"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ви се допаѓа ова</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='Ви се допаѓа ова' href='javascript:;' id='TOGGLE_${id}'>Не ми се допаѓа</a>",
         TOOLTIP : "Не ми се допаѓа"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "Ова му се допаѓа на 0 лица"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "Ова му се допаѓа на 1 лице"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "Ова им се допаѓа на ${recommendCount} лица"
      }
   },
   LOADING : "Вчитување...",
   TEMPLATE_STRINGS : {
      LIKES : "Допаѓања"
   },
   ERROR : {
      TITLE : "Предупредување",
      RECOMMEND_LOAD_FAILED : "Ставката е избришана или веќе не е видлива."
   }
})

