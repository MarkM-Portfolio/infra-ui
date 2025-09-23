/* Copyright IBM Corp. 2010, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.bean.AbstractModerateBean");
dojo.require("lconn.share.util.dom");
dojo.require("lconn.share.util.misc");

dojo.require("lconn.share.bean.User");

dojo.declare("lconn.share.bean.AbstractModerateBean", null, {
   getStatus: function(){
      if(!this.status){
         this.status = lconn.share.util.dom.getChildElementAttributeMatching(this.e, "category", "scheme", "http://www.ibm.com/xmlns/prod/sn/flags", "term");
      }
      return this.status;
   },
   
   isActive: function(){
      var status = this.getStatus();
      return (!status) || "active"== status;
   },
   isQuarantined: function(){
      return "quarantined" == this.getStatus();
   },
   isPending: function(){
      return "pending" == this.getStatus();
   },
   isRejected: function(){
      return "rejected" == this.getStatus();
   },
   getStateChangedBy: function(){
      if (!this.stateChangedBy) {
         var e = lconn.share.util.dom.getElementsByTagNameNS(this.e, "stateChangedBy", lconn.share.util.dom.NAMESPACES.SNX)[0];
         if (e)
            this.stateChangedBy = new lconn.share.bean.User(e);
      }
      return this.stateChangedBy;
   }, 
   getStateChangedWhen: function(){
      if (!this.stateChangedWhen)
         this.stateChangedWhen = lconn.share.util.misc.date.convertAtomDate(lconn.share.util.dom.getChildElementTextContentNS(this.e, "stateChangedWhen", lconn.share.util.dom.NAMESPACES.SNX));
      return this.stateChangedWhen;
   }, 
   getUrlReport: function(){
      var qud = lconn.share.util.dom;
      return lconn.share.util.dom.getChildElementAttributeMatchingNS(this.e, "link", qud.ATOM_NAMESPACE, "rel", null, "http://www.ibm.com/xmlns/prod/sn/reports", "href", null);
   }, 
   isFlaggable: function(){
      return this.getUrlReport();
   }
});

dojo.declare("lconn.share.bean.AbstractModerateBeanFromJson", lconn.share.bean.AbstractModerateBean, {
   getStatus: function(){
      if(!this.status){
         var category = lconn.share.util.misc.indexById(this.d.categories,"scheme","http://www.ibm.com/xmlns/prod/sn/flags");
         if(category){
            this.status = category.term;
         }
      }
      return this.status;
   },
   getStateChangedBy: function(){
      if (!this.stateChangedBy) {
         var stateChangedByObj = lconn.share.util.misc.indexById(this.d.extensions,"name","snx:stateChangedBy");
         this.stateChangedBy = new lconn.share.bean.UserFromJson(stateChangedByObj);
      }
      return this.stateChangedBy;
   }, 
   getStateChangedWhen: function(){
      if (!this.stateChangedWhen){
         var stateChangedWhenObj = lconn.share.util.misc.indexById(this.d.extensions,"name","snx:stateChangedWhen");
         if(stateChangedWhenObj){
            this.stateChangedWhen = lconn.share.util.misc.date.convertAtomDate(stateChangedWhenObj.children[0]);
         }
      }
      return this.stateChangedWhen;
   }
});
