/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Dojo module package for the Mentions feature.
 * @namespace lconn.core.mentions
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
dojo.provide("lconn.core.mentions");

//Require the mentions classes
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
