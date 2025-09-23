/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * @namespace lconn
 */

/**
 * @namespace lconn.core
 */
dojo.provide("lconn.core.bundle_common");

dojo.require("com.ibm.ajax.auth");
dojo.require("com.ibm.mm.livetext.serviceImpl");
dojo.require("com.ibm.oneui.util.openAround");
dojo.require("com.ibm.oneui.util.proxy");
dojo.require("dijit.CheckedMenuItem");
dojo.require("dijit.Dialog");
dojo.require("dijit.DialogUnderlay");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuSeparator");
dojo.require("dijit.PopupMenuItem");
dojo.require("dijit.Tooltip");
dojo.require("dijit.TooltipDialog");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.ComboBox");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojo.AdapterRegistry");
dojo.require("dojo.cache");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.cookie");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.data.util.sorter");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.require("dojo.dnd.Moveable");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.TimedMoveable");
dojo.require("dojo.dnd.autoscroll");
dojo.require("dojo.dnd.common");
dojo.require("dojo.dnd.move");
dojo.require("dojo.fx");
dojo.require("dojo.fx.Toggler");
dojo.require("dojo.html");
dojo.require("dojo.i18n");
dojo.require("dojo.io.iframe");
dojo.require("dojo.parser");
dojo.require("dojo.regexp");
dojo.require("dojo.string");

// Dojo patches
dojo.require("lconn.core.util.dojoPatches");

dojo.require("lconn.core.a11y");
dojo.require("lconn.core.config.features");
dojo.require("lconn.core.config.htmlClass");
dojo.require("lconn.core.LanguageSelector");
dojo.require("lconn.core.MenuUtility");
dojo.require("lconn.core.Res");
dojo.require("lconn.core.TypeAhead");
dojo.require("lconn.core.TypeAheadDataStore");
dojo.require("lconn.core.header");
dojo.require("lconn.core.header.apps");
dojo.require("lconn.core.i18nOverrider");
dojo.require("lconn.core.url");
dojo.require("lconn.core.utilities");
dojo.require("lconn.core.widget.MenuLauncher");
dojo.require("lconn.core.xpath");
dojo.require("lconn.core.auth");
dojo.require("lconn.core.help");

dojo.require("lconn.core.PeopleFinderDataStore");
dojo.require("lconn.core.PeopleFinderTypeAhead");


dojo.require("dojo.number");

dojo.require("net.jazz.ajax.xdloader");

dojo.require("lconn.core.CommonTags.AjaxCall");
dojo.require("lconn.core.CommonTags.FeedConverter");
dojo.require("lconn.core.CommonTags.TagWidget");
dojo.require("lconn.core.CommonTags.CommonTagsTypeAhead");
dojo.require("lconn.core.HTMLUtil");
dojo.require("lconn.core.HelpLauncher");
dojo.require("lconn.core.aria.Toolbar");

dojo.require("com.ibm.oneui.ckeditor.editor.dojoconfig");
dojo.require("lconn.core.DateUtil");
dojo.require("lconn.core.NameUtil");
dojo.require("lconn.core.PeopleDataStore");
dojo.require("lconn.core.PeopleTypeAhead");
dojo.require("lconn.core.SearchBar");
dojo.require("lconn.core.TextBox");
dojo.require("lconn.core.aria.TabPanel");
dojo.require("lconn.core.ckeditor");
dojo.require("lconn.core.widget.HomeLink");

// Enables Community action menus
dojo.require("lconn.communities.bizCard.bizCard_internal");

//Enables person cards
dojo.require("lconn.core.people");

// Enables fileViewer
dojo.require("ic-ui.util.fileViewerListener");

// Load track.js for Metrics usage
dojo.require("com.ibm.lconn.layout.track");

// Load the mentions layer
dojo.require("lconn.core.widget.mentions.mentions");

// Bidi Utilities
dojo.require("lconn.core.globalization.bidiUtil");
