define(
	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2013                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	// NLS_CHARSET=UTF-8
	({
	   POPUP : {
	      RECOMMENDED_ME_ONLY : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span><span class='lotusDivider' role='separator'> - </span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ångra</a>",
	         TOOLTIP : "Ångra din rekommendation"
	      },
	      RECOMMENDED_ME_ONE : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span><span class='lotusDivider' role='separator'> - </span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ångra</a>",
	         TOOLTIP : "Ångra din rekommendation"
	      },
	      RECOMMENDED_ME_MANY : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span><span class='lotusDivider' role='separator'> - </span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ångra</a>",
	         TOOLTIP : "Ångra din rekommendation"
	      },
	      RECOMMENDED_NOTME_ONE : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Rekommendera</a>",
	         TOOLTIP : "Rekommendera det här"
	      },
	      RECOMMENDED_NOTME_MANY : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Rekommendera</a>",
	         TOOLTIP : "Rekommendera det här"
	      },
	      RECOMMENDED_HEADER_SHOWING_ALL : "Personer som har rekommenderat det här...",
	      RECOMMENDED_HEADER_SHOWING_SOME : "Personer som har rekommenderat det här... (sorterade efter namn)",
	      RECOMMENDED_CLOSE_TITLE : "Stäng listan med personer som har rekommenderat det här."
	   },
	   INLINE : {
	      UNRECOMMENDED : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Rekommendera</a>",
	         TOOLTIP : "Rekommendera det här"
	      },
	
	      RECOMMENDED : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Du har rekommenderat det här</span> <span class='lotusDivider' role='separator'> - </span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ångra</a>",
	         TOOLTIP : "Ångra din rekommendation"
	      },
	
	      RECOMMENDED_BYNONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "0 personer har rekommenderat det här"
	      },
	
	      RECOMMENDED_BYONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "1 person har rekommenderat det här"
	      },
	
	      RECOMMENDED_BYMANY : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "${recommendCount} personer har rekommenderat det här"
	      }
	   },
	   LOADING : "Läser in...",
	   TEMPLATE_STRINGS : {
	      LIKES : "Rekommendationer"
	   },
	   ERROR : {
	      TITLE : "Meddelande",
	      RECOMMEND_LOAD_FAILED : "Det här objektet har tagits bort eller visas inte längre."
	   }
	})
	
);