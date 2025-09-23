/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ovo vam se sviđa</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Sviđa vam se ovo</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ne sviđa</a>",
         TOOLTIP : "Ne sviđa se"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ovo vam se sviđa</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Sviđa vam se ovo</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ne sviđa</a>",
         TOOLTIP : "Ne sviđa"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Ovo vam se sviđa</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Sviđa vam se ovo</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ne sviđa</a>",
         TOOLTIP : "Ne sviđa"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Sviđa mi se</a>",
         TOOLTIP : "Ovo mi se sviđa"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Sviđa mi se</a>",
         TOOLTIP : "Ovo mi se sviđa"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Osobe kojima se ovo sviđa...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Osobe kojima se ovo sviđa... (sortirano po imenu)",
      RECOMMENDED_CLOSE_TITLE : "Zatvori listu osoba kojima se ovo sviđa."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Sviđa mi se</a>",
         TOOLTIP : "Ovo mi se sviđa"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>Pvp vam se sviđa</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>Sviđa vam se ovo</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ne sviđa</a>",
         TOOLTIP : "Ne sviđa"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "0 osoba se ovo sviđa"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "1 osobi se ovo sviđa"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "${recommendCount} osoba se ovo sviđa"
      }
   },
   LOADING : "Učitavanje...",
   TEMPLATE_STRINGS : {
      LIKES : "Sviđanja"
   },
   ERROR : {
      TITLE : "Uzbuna",
      RECOMMEND_LOAD_FAILED : "Ova stavka je izbrisana ili više nije vidljiva."
   }
})

