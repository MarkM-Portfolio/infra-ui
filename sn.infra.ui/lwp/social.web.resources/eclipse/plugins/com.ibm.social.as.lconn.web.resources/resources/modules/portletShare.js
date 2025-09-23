/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.modules.portletShare");

//Required for Activity Stream
dojo.require("com.ibm.social.as.portlet.ASPortletUtil");
dojo.require("com.ibm.social.sharebox.ContextualSharebox");

dojo.require("com.ibm.social.as.util.xhr.DojoXhrHandler");

//Required for @mentions
dojo.require("lconn.core.PeopleTypeAhead");
dojo.require("lconn.core.widget.mentions.MentionsHelper");
dojo.require("lconn.core.widget.mentions.PersonMentionsNode");

//Required for add a file
dojo.require("lconn.share.widget.TagTypeAhead");
dojo.require("lconn.share.widget.Dialog");
dojo.require("lconn.share.widget.PeopleTypeAhead");
