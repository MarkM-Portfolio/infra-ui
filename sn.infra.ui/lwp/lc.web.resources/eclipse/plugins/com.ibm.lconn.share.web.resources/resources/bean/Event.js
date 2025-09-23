/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Event");
dojo.require("lconn.share.util.misc");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.Event", null, {
   constructor: function(entry) {
      this.e = entry;
   },
   getEntry: function() {return this.e;},
   getAtomId: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "id");},
   getTitle: function() {return lconn.share.util.dom.getChildElementTextContent(this.e, "title");},
   getUpdated: function() {
      if (!this.updated)
         this.updated = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContent(this.e, "updated"));
      return this.updated;
   },
   getContents: function() {return lconn.share.util.dom.getChildElementMatchingAttributeTextContent(this.e, "content", "type", "html");},
   getUrlEntry: function() {return lconn.share.util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "self", "href");}
});

