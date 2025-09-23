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
	         READONLYTEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ұнамау</a>",
	         TOOLTIP : "Ұнамау"
	      },
	      RECOMMENDED_ME_ONE : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ұнамау</a>",
	         TOOLTIP : "Ұнамау"
	      },
	      RECOMMENDED_ME_MANY : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ұнамау</a>",
	         TOOLTIP : "Ұнамау"
	      },
	      RECOMMENDED_NOTME_ONE : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Ұнату</a>",
	         TOOLTIP : "Бұл ұнайды"
	      },
	      RECOMMENDED_NOTME_MANY : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Ұнату</a>",
	         TOOLTIP : "Бұл ұнайды"
	      },
	      RECOMMENDED_HEADER_SHOWING_ALL : "Бұны ұнататын адамдар...",
	      RECOMMENDED_HEADER_SHOWING_SOME : "Бұны ұнататын адамдар... (аттары бойынша сұрыпталған)",
	      RECOMMENDED_CLOSE_TITLE : "Бұны ұнататын адамдар тізімін жабыңыз."
	   },
	   INLINE : {
	      UNRECOMMENDED : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Ұнату</a>",
	         TOOLTIP : "Бұл ұнайды"
	      },
	
	      RECOMMENDED : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Бұл сізге ұнайды</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Ұнамау</a>",
	         TOOLTIP : "Ұнамау"
	      },
	
	      RECOMMENDED_BYNONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "Осы сияқты 0 адам"
	      },
	
	      RECOMMENDED_BYONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "Бұны 1 адам ұнатады"
	      },
	
	      RECOMMENDED_BYMANY : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "Бұл ${recommendCount} адамға ұнайды"
	      }
	   },
	   LOADING : "Жүктелуде...",
	   TEMPLATE_STRINGS : {
	      LIKES : "Ұнатулар"
	   },
	   ERROR : {
	      TITLE : "Ескерту",
	      RECOMMEND_LOAD_FAILED : "Бұл элемент жойылған немесе одан әрі көрінбейді."
	   }
	})
	
);