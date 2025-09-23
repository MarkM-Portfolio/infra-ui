define({
	root: /* ***************************************************************** */
		/*                                                                   */
		/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
		
		// NLS_CHARSET=UTF-8
		({
		   POPUP : {
		      RECOMMENDED_ME_ONLY : {
		         /* For translator: translate "You like this" in this HTML string */
		         READONLYTEXT : "<span class='lotusLikeDescription'>You like this</span>",
		         /*
		          * For translator: translate all occurrences of "You like this" and
		          * "Unlike" in this HTML string
		          */
		         TEXT : "<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
		         TOOLTIP : "Unlike"
		      },
		      RECOMMENDED_ME_ONE : {
		         /* For translator: translate "You like this" in this HTML string */
		         READONLYTEXT : "<span class='lotusLikeDescription'>You like this</span>",
		         /*
		          * For translator: translate all occurrences of "You like this" and
		          * "Unlike" in this HTML string
		          */
		         TEXT : "<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
		         TOOLTIP : "Unlike"
		      },
		      RECOMMENDED_ME_MANY : {
		         /* For translator: translate "You like this" in this HTML string */
		         READONLYTEXT : "<span class='lotusLikeDescription'>You like this</span>",
		         /*
		          * For translator: translate all occurrences of "You like this" and
		          * "Unlike" in this HTML string
		          */
		         TEXT : "<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
		         TOOLTIP : "Unlike"
		      },
		      RECOMMENDED_NOTME_ONE : {
		         READONLYTEXT : "",
		         /* For translator: translate "Like" in this HTML string */
		         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Like</a>",
		         TOOLTIP : "Like this"
		      },
		      RECOMMENDED_NOTME_MANY : {
		         READONLYTEXT : "",
		         /* For translator: translate "Like" in this HTML string */
		         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Like</a>",
		         TOOLTIP : "Like this"
		      },
		      RECOMMENDED_HEADER_SHOWING_ALL : "People who like this...",
		      RECOMMENDED_HEADER_SHOWING_SOME : "People who like this... (sorted by name)",
		      RECOMMENDED_CLOSE_TITLE : "Close list of people who like this."
		   },
		   INLINE : {
		      UNRECOMMENDED : {
		         READONLYTEXT : "",
		         /* For translator: translate "Like" in this HTML string */
		         TEXT : "<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Like</a>",
		         TOOLTIP : "Like this"
		      },
		
		      RECOMMENDED : {
		         /* For translator: translate "You like this" in this HTML string */
		         READONLYTEXT : "<span class='lotusLikeDescription'>You like this</span>",
		         /*
		          * For translator: translate all occurrences of "You like this" and
		          * "Unlike" in this HTML string
		          */
		         TEXT : "<span class='lotusLikeDescription'>You like this</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
		         TOOLTIP : "Unlike"
		      },
		
		      RECOMMENDED_BYNONE : {
		         READONLYTEXT : "${recommendCount}",
		         TEXT : "${recommendCount}",
		         TOOLTIP : "0 people like this"
		      },
		
		      RECOMMENDED_BYONE : {
		         READONLYTEXT : "${recommendCount}",
		         TEXT : "${recommendCount}",
		         TOOLTIP : "1 person likes this"
		      },
		
		      RECOMMENDED_BYMANY : {
		         READONLYTEXT : "${recommendCount}",
		         TEXT : "${recommendCount}",
		         TOOLTIP : "${recommendCount} people like this"
		      }
		   },
		   LOADING : "Loading...",
		   TEMPLATE_STRINGS : {
		      LIKES : "Likes"
		   },
		   ERROR : {
		      TITLE : "Alert",
		      RECOMMEND_LOAD_FAILED : "This item has been deleted or is no longer visible."
		   }
	}),

	"ar": true,
	"bg": true,
	"ca": true,
	"cs": true,
	"da": true,
	"de": true,
	"el": true,
	"en": true,
	"es": true,
	"fi": true,
	"fr": true,
	"he": true,
	"hr": true,
	"hu": true,
	"id": true,
	"it": true,
	"iw": true,
	"ja": true,
	"kk": true,
	"ko": true,
	"nb": true,
	"nl": true,
	"no": true,
	"pl": true,
	"pt": true,
	"pt-br": true,
	"ro": true,
	"ru": true,
	"sk": true,
	"sl": true,
	"sv": true,
	"th": true,
	"tr": true,
	"zh": true,
	"zh-tw": true
});
