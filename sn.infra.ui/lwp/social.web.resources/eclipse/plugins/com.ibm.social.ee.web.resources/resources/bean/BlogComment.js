/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2007, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.bean.BlogComment");
dojo.require("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.incontext.util.dom");

(function(){
	var util = com.ibm.social.incontext.util;  
	dojo.declare("com.ibm.social.ee.bean.BlogComment", [com.ibm.social.ee.bean.AtomBean], {
		category: "comment", 
	 FLAGS_SCHEME: "http://www.ibm.com/xmlns/prod/sn/flags",
	 TERM_DELETED: "deleted",
	
	 getDeleted: function () {
		if (!("deleted" in this)) {
			this._readCategories();
		}
		return this.deleted;
	 },
	 getModifier: function () {		   
		if (!this.modifier)
           this.modifier = new com.ibm.social.ee.bean.User(util.dom.getElementsByTagNameNS(this.e, "contributor", util.dom.ATOM_NAMESPACE)[0]);
		if (!this.modifier)
		   this.modifier = this.getAuthor();
        return this.modifier;
     },
	 getModerationStatus: function () {
	      if (!this.moderationStatus) {
	         this.moderationStatus = util.dom.getChildElementNSAttribute(this.e, "moderation",  util.dom.SNX_NAMESPACE, "status");
	      }
	      return this.moderationStatus;  
	   },
	 getContent: function() {
	    var content = this.inherited(arguments), replaceRegex = dojo.isIE ? /\n\n/g: /\n/g;
	    return ((util.dom.getChildElementNSAttribute(this.e, "content", util.dom.ATOM_NAMESPACE, "type") == "text") && content) ? 
	          content.replace(replaceRegex, "<br />") : content;

     },
	 getAllowReplies: function() {
	    this.allowReplies = false;
	    var collectionElements = util.dom.getChildElementsNS(this.e, "collection", util.dom.APP_NAMESPACE);
		dojo.forEach(collectionElements, function (ei) { 
            var categoryElements = util.dom.getChildElementsNS(ei, "category", util.dom.ATOM_NAMESPACE);   
			dojo.forEach(categoryElements, function (ej) {
                var term = ej.getAttribute("term");
				if(term == 'comments') {
				    this.allowReplies = true;
				}
			}, this);
         }, this);
		 return this.allowReplies;
	 },
	 
	 _readCategories: function () {
         var categoryElements = util.dom.getChildElementsNS(this.e, "category", util.dom.ATOM_NAMESPACE);
         var deleted = false;
         dojo.forEach(categoryElements, function (el) { 
            var scheme = el.getAttribute("scheme");
            var term = el.getAttribute("term");
            if (scheme) {
              if (scheme == this.FLAGS_SCHEME) {
                 if (term == this.TERM_DELETED) deleted = true;                 
              }
            }            
         }, this);
         this.deleted = deleted;
    }
});
})();