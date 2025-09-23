/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Pidät tästä</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Pidät tästä</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Kumoa</a>",
         TOOLTIP : "Kumoa"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Pidät tästä</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Pidät tästä</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Kumoa</a>",
         TOOLTIP : "Kumoa"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Pidät tästä</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Pidät tästä</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Kumoa</a>",
         TOOLTIP : "Kumoa"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Pidä</a>",
         TOOLTIP : "Pidä tästä"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Pidä</a>",
         TOOLTIP : "Pidä tästä"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Henkilöt, jotka pitävät tästä...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Henkilöt, jotka pitävät tästä... (lajiteltu nimen mukaan)",
      RECOMMENDED_CLOSE_TITLE : "Sulje tästä pitävien henkilöiden luettelo."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Pidä</a>",
         TOOLTIP : "Pidä tästä"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Pidät tästä</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Pidät tästä</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Kumoa</a>",
         TOOLTIP : "Kumoa"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "0 henkilöä pitää tästä"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "Yksi henkilö pitää tästä"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "${recommendCount} henkilöä pitää tästä"
      }
   },
   LOADING : "Lataus on meneillään...",
   TEMPLATE_STRINGS : {
      LIKES : "Pitämiset"
   },
   ERROR : {
      TITLE : "Ilmoitus",
      RECOMMEND_LOAD_FAILED : "Kohde on poistettu, tai se ei ole enää näkyvissä."
   }
})

