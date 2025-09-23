/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Us agrada això</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Us agrada</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>No us agrada</a>",
         TOOLTIP : "No us agrada"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Us agrada això</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Us agrada</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>No us agrada</a>",
         TOOLTIP : "No us agrada"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Us agrada això</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Us agrada</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>No us agrada</a>",
         TOOLTIP : "No us agrada"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>M'agrada</a>",
         TOOLTIP : "M'agrada"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>M'agrada</a>",
         TOOLTIP : "M'agrada"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Persones a qui agrada...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Persones a qui agrada... (ordenades per nom)",
      RECOMMENDED_CLOSE_TITLE : "Tanca la llista de persones a qui agrada això."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>M'agrada</a>",
         TOOLTIP : "M'agrada"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Us agrada això</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Us agrada</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>No us agrada</a>",
         TOOLTIP : "No us agrada"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "A 0 persones els agrada això"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "A 1 persona li agrada això"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "Això agrada a ${recommendCount} persones"
      }
   },
   LOADING : "S'està carregant...",
   TEMPLATE_STRINGS : {
      LIKES : "M'agrada"
   },
   ERROR : {
      TITLE : "Alerta",
      RECOMMEND_LOAD_FAILED : "Aquest element s'ha suprimit o ja no és visible."
   }
})

