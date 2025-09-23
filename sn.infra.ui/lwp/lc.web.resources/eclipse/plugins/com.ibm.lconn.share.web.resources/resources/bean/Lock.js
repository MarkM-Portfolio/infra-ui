/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Lock");
dojo.require("lconn.share.bean.User");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.misc");

dojo.declare("lconn.share.bean.Lock", null, {
   constructor: function(e) {
      this.e = e;
   },
   getType: function() {
      return this.e ? this.e.getAttribute("type") : null;
   },
   getOwner: function() {
      if (!this.owner && this.e) {
         var e = lconn.share.util.dom.getChildElementNS(this.e, "owner", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         if (e)
            this.owner = new lconn.share.bean.User(e);
      }
      return this.owner;
   },
   getLockTime: function() {
      if (!this.lockTime)
         this.lockTime = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "lockTime", lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE));
      return this.lockTime;
   }
});
