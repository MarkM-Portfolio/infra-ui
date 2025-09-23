/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.Policy");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.text");
dojo.require("lconn.share.util.misc");

dojo.declare("lconn.share.bean.Policy", null, {
   constructor: function(e) {
      if(e){
         var p = lconn.share.bean.Policy.createPolicy(e);
         dojo.mixin(this, p);
      }
   }
});

lconn.share.bean.Policy.SUPPORTED_POLICY = ["organizationPublic", "contentFollowing"];
lconn.share.bean.Policy.createPolicy = function(e){
   if(e){
      var supportedPolicy = lconn.share.bean.Policy.SUPPORTED_POLICY;
      var p = {};
      dojo.forEach(supportedPolicy, function(pName){
         var val = lconn.share.util.dom.getChildElementTextContentNS(e, pName, lconn.share.util.dom.DOCUMENTS_ATOM_NAMESPACE);
         if (val) {
        	 if(val === "true")
        		 p[pName] = true;
        	 else 
        		 p[pName] = false;
         }
      });
      return p;
   }
}
