/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>ביטול 'אהבת'</a>",
         TOOLTIP : "ביטול 'אהבתי'"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>ביטול 'אהבת'</a>",
         TOOLTIP : "ביטול 'אהבתי'"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>ביטול 'אהבת'</a>",
         TOOLTIP : "ביטול 'אהבתי'"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>סימון 'אהבתי'</a>",
         TOOLTIP : "סימון 'אהבתי' לפריט זה"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>סימון 'אהבתי'</a>",
         TOOLTIP : "סימון 'אהבתי' לפריט זה"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "אנשים שאהבו פריט זה...‏",
      RECOMMENDED_HEADER_SHOWING_SOME : "אנשים שאהבו פריט זה...‏ (ממוין לפי שם)",
      RECOMMENDED_CLOSE_TITLE : "סגירת הרשימה של אנשים שאהבו פריט זה."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>סימון 'אהבתי'</a>",
         TOOLTIP : "סימון 'אהבתי' לפריט זה"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>אהבתם פריט זה</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>ביטול 'אהבת'</a>",
         TOOLTIP : "ביטול 'אהבתי'"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "0 אנשים אהבו פריט זה"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "1 אדם אהב פריט זה"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "${recommendCount} אנשים אהבו פריט זה"
      }
   },
   LOADING : "טעינה מתבצעת...",
   TEMPLATE_STRINGS : {
      LIKES : "סימוני 'אהבתי'"
   },
   ERROR : {
      TITLE : "התרעה",
      RECOMMEND_LOAD_FAILED : "פריט זה נמחק או כבר אינו גלוי."
   }
})

