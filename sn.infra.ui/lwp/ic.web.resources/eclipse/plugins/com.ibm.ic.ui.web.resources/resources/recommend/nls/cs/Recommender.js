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
	         READONLYTEXT : "<span class='lotusLikeDescription'>Tato položka se vám líbí</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Toto je vaše oblíbená položka</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Toto je vaše oblíbená položka' href='javascript:;' id='TOGGLE_${id}'>Odebrat hodnocení Oblíbené</a>",
	         TOOLTIP : "Odebrat hodnocení Oblíbené"
	      },
	      RECOMMENDED_ME_ONE : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Tato položka se vám líbí</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Toto je vaše oblíbená položka</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Toto je vaše oblíbená položka' href='javascript:;' id='TOGGLE_${id}'>Odebrat hodnocení Oblíbené</a>",
	         TOOLTIP : "Odebrat hodnocení Oblíbené"
	      },
	      RECOMMENDED_ME_MANY : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Tato položka se vám líbí</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Toto je vaše oblíbená položka</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='Toto je vaše oblíbená položka' href='javascript:;' id='TOGGLE_${id}'>Odebrat hodnocení Oblíbené</a>",
	         TOOLTIP : "Odebrat hodnocení Oblíbené"
	      },
	      RECOMMENDED_NOTME_ONE : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Hodnocení Oblíbené</a>",
	         TOOLTIP : "Nastavit jako oblíbené"
	      },
	      RECOMMENDED_NOTME_MANY : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Hodnocení Oblíbené</a>",
	         TOOLTIP : "Nastavit jako oblíbené"
	      },
	      RECOMMENDED_HEADER_SHOWING_ALL : "Osoby, kterým se tato položka líbí...",
	      RECOMMENDED_HEADER_SHOWING_SOME : "Osoby, kterým se tato položka líbí (řazeno podle jmen)",
	      RECOMMENDED_CLOSE_TITLE : "Zavřít seznam osob, kterým se tato položka líbí"
	   },
	   INLINE : {
	      UNRECOMMENDED : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Hodnocení Oblíbené</a>",
	         TOOLTIP : "Nastavit jako oblíbené"
	      },
	
	      RECOMMENDED : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Tato položka se vám líbí</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Toto je vaše oblíbená položka</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='Toto je vaše oblíbená položka' href='javascript:;' id='TOGGLE_${id}'>Odebrat hodnocení Oblíbené</a>",
	         TOOLTIP : "Odebrat hodnocení Oblíbené"
	      },
	
	      RECOMMENDED_BYNONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "Počet osob, kterým se tato položka líbí: 0"
	      },
	
	      RECOMMENDED_BYONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "Počet osob, kterým se tato položka líbí: 1"
	      },
	
	      RECOMMENDED_BYMANY : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "Počet osob, kterým se tato položka líbí: ${recommendCount}"
	      }
	   },
	   LOADING : "Probíhá načítání...",
	   TEMPLATE_STRINGS : {
	      LIKES : "Hodnocení Oblíbené"
	   },
	   ERROR : {
	      TITLE : "Výstraha",
	      RECOMMEND_LOAD_FAILED : "Položka byla odstraněna nebo již není viditelná."
	   }
	})
	
);