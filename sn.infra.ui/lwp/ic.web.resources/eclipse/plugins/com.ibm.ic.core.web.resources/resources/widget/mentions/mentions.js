define([
	"ic-core/widget/mentions/PersonMentionsNode",
	"ic-core/widget/mentions/MentionsHelper",
	"ic-core/widget/mentions/MentionsKeyHandlers",
	"ic-core/widget/mentions/MentionsNode",
	"ic-core/widget/mentions/MentionsType",
	"ic-core/widget/mentions/MentionsTypeaheadUtils",
	"ic-core/widget/mentions/MentionsUtils",
	"ic-core/widget/mentions/PersonMentionsType",
	"ic-core/widget/mentions/TagMentionsNode",
	"ic-core/widget/mentions/TagMentionsType",
	"ic-core/widget/mentions/URLMentionsNode",
	"ic-core/widget/mentions/utilities"
], function (PersonMentionsNode, MentionsHelper, MentionsKeyHandlers, MentionsNode, MentionsType, MentionsTypeaheadUtils, MentionsUtils, PersonMentionsType, TagMentionsNode, TagMentionsType, URLMentionsNode, utilities) {

	/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
	/**
	 * Dojo module package for the Mentions feature.
	 * Will be moved to {@link lconn.core.mentions}.
	 * @deprecated
	 * @see core.mentions
	 * @namespace ic-core.widget.mentions
	 */
	/**
	 * Layer supporting the Mentions feature
	 * @namespace ic-core.widget.mentions.mentions
	 * @author James J. Antill <antillj@ie.ibm.com>
	 */
	// Require the mentions classes
	
	return lconn.core.widget.mentions.mentions;
});
