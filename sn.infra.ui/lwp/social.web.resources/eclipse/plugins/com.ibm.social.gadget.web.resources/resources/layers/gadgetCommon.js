/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2013                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.gadget.layers.gadgetCommon");

dojo.require("com.ibm.lconn.layout.people");
dojo.require("com.ibm.oneui.util.Url");
dojo.require("dijit.DialogUnderlay");
dojo.require("dijit._Contained");
dojo.require("dijit._Container");
dojo.require("dijit._DialogMixin");
dojo.require("dijit._Templated");
dojo.require("dijit._Widget");
dojo.require("dijit._base");
dojo.require("dijit._base.focus");
dojo.require("dijit._base.manager");
dojo.require("dijit._base.place");
dojo.require("dijit._base.popup");
dojo.require("dijit._base.scroll");
dojo.require("dijit._base.sniff");
dojo.require("dijit._base.typematic");
dojo.require("dijit._base.wai");
dojo.require("dijit._base.window");
dojo.require("dojo.AdapterRegistry");
dojo.require("dojo.cache");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.date");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.require("dojo.html");
dojo.require("dojo.i18n");
dojo.require("dojo.io.iframe");
dojo.require("dojo.number");
dojo.require("dojo.parser");
dojo.require("dojo.regexp");
dojo.require("dojo.string");
dojo.require("dojox.uuid");
dojo.require("dojox.uuid._base");
dojo.require("dojox.uuid.generateTimeBasedUuid");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");
dojo.require("lconn.core.util.dojoPatches");

//Load the mentions layer
dojo.require("lconn.core.widget.mentions.mentions");