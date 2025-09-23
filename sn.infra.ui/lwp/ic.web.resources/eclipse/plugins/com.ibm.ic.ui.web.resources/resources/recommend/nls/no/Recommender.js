define(
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
					READONLYTEXT: "<span class='lotusLikeDescription'>Du liker dette</span>",
					TEXT: 		"<span class='lotusLikeDescription'>Du liker denne</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Angre Liker</a>",
					TOOLTIP: 	"Angre Liker"
				},
				RECOMMENDED_ME_ONE: {
					READONLYTEXT: "<span class='lotusLikeDescription'>Du liker dette</span>",
					TEXT: 		"<span class='lotusLikeDescription'>Du liker denne</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Angre Liker</a>",
					TOOLTIP: 	"Angre Liker"		
				},
				RECOMMENDED_ME_MANY: {
					READONLYTEXT: "<span class='lotusLikeDescription'>Du liker dette</span>",
					TEXT: 		"<span class='lotusLikeDescription'>Du liker denne</span><span class='lotusDivider' role='separator'>-</span><a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Angre Liker</a>",
					TOOLTIP: 	"Angre Liker"		
				},
				RECOMMENDED_NOTME_ONE: {
					READONLYTEXT: "",
					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Liker</a>",
					TOOLTIP: 	"Lik dette"
				},
				RECOMMENDED_NOTME_MANY: {
					READONLYTEXT: "",
					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Liker</a>",
					TOOLTIP: 	"Lik dette"	
				},
				RECOMMENDED_HEADER_SHOWING_ALL: "Personer som liker denne...",
				RECOMMENDED_HEADER_SHOWING_SOME: "Personer som liker denne... (sortert etter navn)",
				RECOMMENDED_CLOSE_TITLE: "Lukk listen over personer som liker denne."
			},
			INLINE: {
				UNRECOMMENDED: {
					READONLYTEXT: "",
					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Liker</a>",
					TOOLTIP: 	"Lik dette"
				},
				
				RECOMMENDED: {
					READONLYTEXT: "<span class='lotusLikeDescription'>Du liker dette</span>",
					TEXT: 		"<span class='lotusLikeDescription'>Du liker denne</span> <span class='lotusDivider' role='separator'>-</span> <a class='lotusLikeAction' role='button' aria-label='You like this' href='javascript:;' id='TOGGLE_${id}'>Angre Liker</a>",
					TOOLTIP: 	"Angre Liker"
				},
				
				RECOMMENDED_BYNONE:  {
					READONLYTEXT: "${recommendCount}",
					TEXT: 		"${recommendCount}",
					TOOLTIP: 	"0 personer liker dette"
				},
						
				RECOMMENDED_BYONE:  {
					READONLYTEXT: "${recommendCount}",
					TEXT: 		"${recommendCount}",
					TOOLTIP: 	"1 person liker dette"
				},
						
				RECOMMENDED_BYMANY:  {
					READONLYTEXT: "${recommendCount}",
					TEXT: 		"${recommendCount}",
					TOOLTIP: 	"${recommendCount} personer liker dette"
				}
			},
			LOADING: "Laster inn...",
			TEMPLATE_STRINGS: {
				LIKES: "Liker"
			}
		}
	)
);