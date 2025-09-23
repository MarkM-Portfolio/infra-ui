/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
         TOOLTIP : "Не харесвам"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
         TOOLTIP : "Не харесвам"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
         TOOLTIP : "Не харесвам"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Харесвам</a>",
         TOOLTIP : "Харесайте това"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Харесвам</a>",
         TOOLTIP : "Харесайте това"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Лицата, които харесват това...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Лицата, които харесват това... (сортирани по име)",
      RECOMMENDED_CLOSE_TITLE : "Затваряне на списъка с лица, които харесват това."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Харесвам</a>",
         TOOLTIP : "Харесайте това"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Вие харесвате това</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
         TOOLTIP : "Не харесвам"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "0 лица харесват това"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "1 лице харесва това"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "${recommendCount} лица харесват това"
      }
   },
   LOADING : "Зареждане...",
   TEMPLATE_STRINGS : {
      LIKES : "Харесвания"
   },
   ERROR : {
      TITLE : "Аларма",
      RECOMMEND_LOAD_FAILED : "Този елемент е бил изтрит или вече не е видим."
   }
})

