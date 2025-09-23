/* Copyright IBM Corp. 2011, 2016  All Rights Reserved.              */

// NLS_CHARSET=UTF-8
({
   POPUP : {
      RECOMMENDED_ME_ONLY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>To vam je všeč</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>To vam je všeč</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Razveljavi všečnost</a>",
         TOOLTIP : "Razveljavi všečnost"
      },
      RECOMMENDED_ME_ONE : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>To vam je všeč</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>To vam je všeč</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Razveljavi všečnost</a>",
         TOOLTIP : "Razveljavi všečnost"
      },
      RECOMMENDED_ME_MANY : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>To vam je všeč</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>To vam je všeč</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Razveljavi všečnost</a>",
         TOOLTIP : "Razveljavi všečnost"
      },
      RECOMMENDED_NOTME_ONE : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Všeč mi je</a>",
         TOOLTIP : "To mi je všeč"
      },
      RECOMMENDED_NOTME_MANY : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Všeč mi je</a>",
         TOOLTIP : "To mi je všeč"
      },
      RECOMMENDED_HEADER_SHOWING_ALL : "Osebe, ki jim je to všeč ...",
      RECOMMENDED_HEADER_SHOWING_SOME : "Osebe, ki jim je to všeč ... (razvrščene po imenu)",
      RECOMMENDED_CLOSE_TITLE : "Zapri seznam oseb, ki jim je to všeč."
   },
   INLINE : {
      UNRECOMMENDED : {
         READONLYTEXT : "",
         /* For translator: translate "Like" in this HTML string */
         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Všeč mi je</a>",
         TOOLTIP : "To mi je všeč"
      },

      RECOMMENDED : {
         /* For translator: translate "You like this" in this HTML string */
         READONLYTEXT : "<span class='lotusLikeDescription'>To vam je všeč</span>",
         /*
          * For translator: translate all occurrences of "You like this" and
          * "Unlike" in this HTML string
          */
         TEXT : "<span class='lotusLikeDescription'>To vam je všeč</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Razveljavi všečnost</a>",
         TOOLTIP : "Razveljavi všečnost"
      },

      RECOMMENDED_BYNONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "To ni všeč nobeni osebi"
      },

      RECOMMENDED_BYONE : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "To je všeč 1 osebi"
      },

      RECOMMENDED_BYMANY : {
         READONLYTEXT : "${recommendCount}",
         TEXT : "${recommendCount}",
         TOOLTIP : "To je všeč ${recommendCount} osebam"
      }
   },
   LOADING : "Nalaganje ...",
   TEMPLATE_STRINGS : {
      LIKES : "Všečnosti"
   },
   ERROR : {
      TITLE : "Opozorilo",
      RECOMMEND_LOAD_FAILED : "Ta postavka je bila izbrisana ali pa ni več vidna."
   }
})

