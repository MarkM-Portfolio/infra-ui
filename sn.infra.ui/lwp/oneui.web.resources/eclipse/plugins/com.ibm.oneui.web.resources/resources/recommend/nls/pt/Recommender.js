/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Gosta disto</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Gosta disto</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Gosta disto' href='javascript:;' id='TOGGLE_${id}'>Não gosto</a>",
         TOOLTIP : "Não gosto"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Gosta disto</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Gosta disto</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Gosta disto' href='javascript:;' id='TOGGLE_${id}'>Não gosto</a>",
         TOOLTIP : "Não gosto"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Gosta disto</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Gosta disto</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Não gosto</a>",
         TOOLTIP : "Não gostar"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Gosto</a>",
         TOOLTIP : "Gostar disto"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Gosto</a>",
         TOOLTIP : "Gostar disto"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Pessoas que gostam disto...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Pessoas que gostam disto...(ordenadas por nome)",
      RECOMMENDED_CLOSE_TITLE : "Fechar a lista de pessoas que gostam disto"
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Gosto</a>",
         TOOLTIP : "Gosto disto"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Gosta disto</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Gosta disto</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Não gostar</a>",
         TOOLTIP : "Não gosto"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "0 pessoas gostam disto"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "1 pessoa gosta disto"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "${recommendCount} pessoas gostam disto"
      }
   },
   LOADING : "A carregar...",
   TEMPLATE_STRINGS : {
      LIKES : "Gostos"
   },
   ERROR : {
      TITLE : "Alerta",
      RECOMMEND_LOAD_FAILED : "Este item foi eliminado ou já não está visível."
   }
})

