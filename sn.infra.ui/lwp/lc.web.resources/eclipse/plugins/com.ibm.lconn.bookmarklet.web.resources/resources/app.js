/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * This module loads all the dojo required by lc.bookmarklet 
 */

dojo.provide("lconn.bookmarklet.app");

dojo.require("dojo.cookie");
dojo.require("dojo.parser");
dojo.require("dijit.Menu");
dojo.require("dijit.form.ComboBox");
dojo.require("com.ibm.ajax.auth");
dojo.require("lconn.core.aria.Toolbar");
dojo.require("lconn.core.TypeAheadDataStore");
dojo.require("lconn.core.HelpLauncher");
dojo.require("lconn.core.HTMLUtil");
dojo.require("lconn.bookmarklet.util");
dojo.require("lconn.bookmarklet.Res");
dojo.require("lconn.bookmarklet.tabController");
dojo.require("lconn.bookmarklet.rcController");
dojo.require("lconn.bookmarklet.DogearTypeAhead");
dojo.require("lconn.bookmarklet.ckeditor");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.a11y");
//Discuss This
dojo.require("lconn.bookmarklet.DiscussThisTypeAhead");
dojo.require("lconn.bookmarklet.TopicContent");
dojo.require("lconn.share.util.message");
dojo.require("lconn.core.people");
dojo.require("lconn.profiles.bizCard.bizCard");
dojo.provide("lconn.profiles.bizCard.bizCardUI");
dojo.require( "lconn.bookmarklet.DiscussThisComment");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.requireLocalization("lconn.core","strings");
dojo.requireLocalization("lconn.bookmarklet","strings");
