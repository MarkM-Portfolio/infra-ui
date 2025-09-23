/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Ovo ste označili sa Sviđa mi se' href='javascript:;' id='TOGGLE_${id}'>Opozovi sviđanje</a>",
         TOOLTIP : "Opozovi sviđanje"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Ovo ste označili sa Sviđa mi se' href='javascript:;' id='TOGGLE_${id}'>Opozovi sviđanje</a>",
         TOOLTIP : "Opozovi sviđanje"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Ovo ste označili sa Sviđa mi se' href='javascript:;' id='TOGGLE_${id}'>Opozovi sviđanje</a>",
         TOOLTIP : "Opozovi sviđanje"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Ovo ste označili sa Sviđa mi se</a>",
         TOOLTIP : "Označite ovo sa Sviđa mi se"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Označi sa Sviđa mi se</a>",
         TOOLTIP : "Označite ovo sa Sviđa mi se"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Osobe koje su označile da im se ovo sviđa...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Osobe koje su označile da im se ovo sviđa... (sortirano po imenu)",
      RECOMMENDED_CLOSE_TITLE : "Zatvori listu osoba koje su označile da im se ovo sviđa."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Označi sa Sviđa mi se</a>",
         TOOLTIP : "Označite ovo sa Sviđa mi se"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Ovo ste označili sa Sviđa mi se</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='Ovo ste označili sa Sviđa mi se' href='javascript:;' id='TOGGLE_${id}'>Opozovi sviđanje</a>",
         TOOLTIP : "Opozovi sviđanje"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "0 osoba je ovo označilo sa Sviđa mi se"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "1 osoba je ovo označila sa Sviđa mi se"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "${recommendCount} osoba je ovo označilo sa Sviđa mi se"
      }
   },
   LOADING : "Učitavanje...",
   TEMPLATE_STRINGS : {
      LIKES : "Označeno sa Sviđa mi se"
   },
   ERROR : {
      TITLE : "Upozorenje",
      RECOMMEND_LOAD_FAILED : "Ova stavka je izbrisana ili više nije vidljiva."
   }
})

