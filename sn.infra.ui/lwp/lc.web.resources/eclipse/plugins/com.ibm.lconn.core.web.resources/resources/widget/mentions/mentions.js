/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
/**
 * Dojo module package for the Mentions feature.
 * Will be moved to {@link lconn.core.mentions}.
 * @deprecated
 * @see lconn.core.mentions
 * @namespace lconn.core.widget.mentions
 */
/**
 * Layer supporting the Mentions feature
 * @namespace lconn.core.widget.mentions.mentions
 * @author James J. Antill <antillj@ie.ibm.com>
 */
dojo.provide("lconn.core.widget.mentions.mentions");

// Require the mentions classes
dojo.require("lconn.core.widget.mentions.MentionsHelper");
dojo.require("lconn.core.widget.mentions.MentionsKeyHandlers");
dojo.require("lconn.core.widget.mentions.MentionsNode");
dojo.require("lconn.core.widget.mentions.MentionsType");
dojo.require("lconn.core.widget.mentions.MentionsTypeaheadUtils");
dojo.require("lconn.core.widget.mentions.MentionsUtils");
dojo.require("lconn.core.widget.mentions.PersonMentionsNode");
dojo.require("lconn.core.widget.mentions.PersonMentionsType");
dojo.require("lconn.core.widget.mentions.TagMentionsNode");
dojo.require("lconn.core.widget.mentions.TagMentionsType");
dojo.require("lconn.core.widget.mentions.URLMentionsNode");
dojo.require("lconn.core.widget.mentions.utilities");
