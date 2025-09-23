define(
	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	// NLS_CHARSET=UTF-8
	(
		{
			POPUP: {
				RECOMMENDED_ME_ONLY: {
					READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
					TEXT: 		"<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
					TOOLTIP: 	"Unlike"
				},
				RECOMMENDED_ME_ONE: {
					READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
					TEXT: 		"<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
					TOOLTIP: 	"Unlike"		
				},
				RECOMMENDED_ME_MANY: {
					READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
					TEXT: 		"<span class='lotusLikeDescription'>You like this</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
					TOOLTIP: 	"Unlike"		
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
				RECOMMENDED_HEADER_SHOWING_SOME: "People who like this... (sorted by name)",
				RECOMMENDED_CLOSE_TITLE: "Close list of people who like this."
			},
			INLINE: {
				UNRECOMMENDED: {
					READONLYTEXT: "",
					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Like</a>",
					TOOLTIP: 	"Like this"
				},
				
				RECOMMENDED: {
					READONLYTEXT: "<span class='lotusLikeDescription'>You like this</span>",
					TEXT: 		"<span class='lotusLikeDescription'>You like this</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Unlike</a>",
					TOOLTIP: 	"Unlike"
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
			LOADING: "Loading...",
			TEMPLATE_STRINGS: {
				LIKES: "Likes"
			}
		}
	)
);
