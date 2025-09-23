/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Du gillar det här</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Du gillar det här</span><span class='lotusDivider' role='separator'> - </span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Sluta gilla</a>",
         TOOLTIP : "Sluta gilla"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Du gillar det här</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Du gillar det här</span><span class='lotusDivider' role='separator'> - </span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Sluta gilla</a>",
         TOOLTIP : "Sluta gilla"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Du gillar det här</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Du gillar det här</span><span class='lotusDivider' role='separator'> - </span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Sluta gilla</a>",
         TOOLTIP : "Sluta gilla"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Gilla</a>",
         TOOLTIP : "Gilla det här"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Gilla</a>",
         TOOLTIP : "Gilla det här"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Personer som gillar det här...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Personer som gillar det här... (sorterade efter namn)",
      RECOMMENDED_CLOSE_TITLE : "Stäng listan över personer som gillar det här."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Gilla</a>",
         TOOLTIP : "Gilla det här"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Du gillar det här</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Du gillar det här</span> <span class='lotusDivider' role='separator'> - </span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Sluta gilla</a>",
         TOOLTIP : "Sluta gilla"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "0 personer gillar det här"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "1 person gillar det här"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "${recommendCount} personer gillar det här"
      }
   },
   LOADING : "Laddar...",
   TEMPLATE_STRINGS : {
      LIKES : "Gillanden"
   },
   ERROR : {
      TITLE : "Meddelande",
      RECOMMEND_LOAD_FAILED : "Det här objektet har tagits bort eller visas inte längre."
   }
})

