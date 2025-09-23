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
	         READONLYTEXT : "<span class='lotusLikeDescription'>Σας αρέσει</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Σας αρέσει αυτό το στοιχείο</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Αναίρεση</a>",
	         TOOLTIP : "Αναίρεση"
	      },
	      RECOMMENDED_ME_ONE : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Σας αρέσει</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Σας αρέσει αυτό το στοιχείο</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Αναίρεση</a>",
	         TOOLTIP : "Αναίρεση"
	      },
	      RECOMMENDED_ME_MANY : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Σας αρέσει</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Σας αρέσει αυτό το στοιχείο</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Αναίρεση</a>",
	         TOOLTIP : "Αναίρεση"
	      },
	      RECOMMENDED_NOTME_ONE : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Μου αρέσει</a>",
	         TOOLTIP : "Δηλώστε ότι σας αρέσει"
	      },
	      RECOMMENDED_NOTME_MANY : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Μου αρέσει</a>",
	         TOOLTIP : "Δηλώστε ότι σας αρέσει"
	      },
	      RECOMMENDED_HEADER_SHOWING_ALL : "Πρόσωπα στα οποία αρέσει...",
	      RECOMMENDED_HEADER_SHOWING_SOME : "Πρόσωπα στα οποία αρέσει... (ταξινομημένα κατά όνομα)",
	      RECOMMENDED_CLOSE_TITLE : "Κλείσιμο λίστας προσώπων στα οποία αρέσει αυτό το στοιχείο."
	   },
	   INLINE : {
	      UNRECOMMENDED : {
	         READONLYTEXT : "",
	         /* For translator: translate "Like" in this HTML string */
	         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Μου αρέσει</a>",
	         TOOLTIP : "Δηλώστε ότι σας αρέσει"
	      },
	
	      RECOMMENDED : {
	         /* For translator: translate "You like this" in this HTML string */
	         READONLYTEXT : "<span class='lotusLikeDescription'>Σας αρέσει</span>",
	         /*
	          * For translator: translate all occurrences of "You like this" and
	          * "Unlike" in this HTML string
	          */
	         TEXT : "<span class='lotusLikeDescription'>Σας αρέσει αυτό το στοιχείο</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Αναίρεση</a>",
	         TOOLTIP : "Αναίρεση"
	      },
	
	      RECOMMENDED_BYNONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "0 πρόσωπα δήλωσαν ότι τους αρέσει"
	      },
	
	      RECOMMENDED_BYONE : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "1 πρόσωπο δήλωσε ότι του αρέσει"
	      },
	
	      RECOMMENDED_BYMANY : {
	         READONLYTEXT : "${recommendCount}",
	         TEXT : "${recommendCount}",
	         TOOLTIP : "${recommendCount} πρόσωπα δήλωσαν ότι τους αρέσει"
	      }
	   },
	   LOADING : "Φόρτωση...",
	   TEMPLATE_STRINGS : {
	      LIKES : "Θετικές γνώμες"
	   },
	   ERROR : {
	      TITLE : "Προειδοποίηση",
	      RECOMMEND_LOAD_FAILED : "Αυτό το στοιχείο έχει διαγραφεί ή δεν είναι πλέον ορατό."
	   }
	})
	
);