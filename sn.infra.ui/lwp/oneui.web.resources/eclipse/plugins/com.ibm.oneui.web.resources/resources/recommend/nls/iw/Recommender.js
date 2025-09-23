/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
(
	{
		POPUP: {
			RECOMMENDED_ME_ONLY: {
				READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
				TEXT: 		"<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='presentation'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Undo</a>",
				TOOLTIP: 	"Undo your like from this"
			},
			RECOMMENDED_ME_ONE: {
				READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
				TEXT: 		"<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='presentation'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Undo</a>",
				TOOLTIP: 	"Undo your like from this"		
			},
			RECOMMENDED_ME_MANY: {
				READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
				TEXT: 		"<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='presentation'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Undo</a>",
				TOOLTIP: 	"Undo your like from this"		
			},
			RECOMMENDED_NOTME_ONE: {
				READONLYTEXT: "",
				TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Like</a>",
				TOOLTIP: 	"Like this"
			},
			RECOMMENDED_NOTME_MANY: {
				READONLYTEXT: "",
				TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Like</a>",
				TOOLTIP: 	"Like this"	
			},
			RECOMMENDED_HEADER_SHOWING_ALL: "People who like this...",
			RECOMMENDED_HEADER_SHOWING_SOME:  "Most recent 25"
		},
		INLINE: {
			UNRECOMMENDED: {
				READONLYTEXT: "",
				TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Like</a>",
				TOOLTIP: 	"Like this"
			},
			
			RECOMMENDED: {
				READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
				TEXT: 		"<span class='lotusLikeDescription'>You like this</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Undo</a>",
				TOOLTIP: 	"Undo your like from this"
			},
			
			RECOMMENDED_BYNONE:  {
				READONLYTEXT: "${recommendCount}",
				TEXT: 		"${recommendCount}",
				TOOLTIP: 	"0 people like this"
			},
					
			RECOMMENDED_BYONE:  {
				READONLYTEXT: "${recommendCount}",
				TEXT: 		"${recommendCount}",
				TOOLTIP: 	"1 person likes this"
			},
					
			RECOMMENDED_BYMANY:  {
				READONLYTEXT: "${recommendCount}",
				TEXT: 		"${recommendCount}",
				TOOLTIP: 	"${recommendCount} people like this"
			}
		},
		LOADING: "טעינה בביצוע...",
		TEMPLATE_STRINGS: {
			LIKES: "סימוני 'אהבתי'"
		}
	}
)
