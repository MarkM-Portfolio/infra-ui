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

dojo.provide("com.ibm.social.ee.bean.ForumSummary");
dojo.require("com.ibm.social.ee.bean.ForumTopic");
dojo.require("com.ibm.social.ee.bean.Bean");

dojo.require("com.ibm.social.incontext.util.dom");


/* Loads data from a BlogEntry Feed*/
(function(){
   var du = com.ibm.social.incontext.util.dom;
   dojo.declare("com.ibm.social.ee.bean.ForumSummary", [com.ibm.social.ee.bean.Bean], {
      constructor: function(entry, base, values) {
         this.e = entry;
         this.setBase(entry, base);
         if (values)
            dojo.mixin(this, values);
      },
      getTopic: function () {
         if (!("topic" in this)) {
            var entries = this._getEntries();
            this.topic = new com.ibm.social.ee.bean.ForumTopic(entries[0]);
         }
         return this.topic; 
      },
      isReplyToReply: function () {
        if (!("replyToReply" in this)) {
           var entries = this._getEntries();
           this.replyToReply = (entries.length > 2);
        }
        return this.replyToReply;
      },
      getParentReply: function () {
         if (!("parentReply" in this)) {
            var entries = this._getEntries();
            this.parentReply = (entries.length > 1) ?
               new com.ibm.social.ee.bean.ForumReply(entries[1]) : null;
         }
         return this.parentReply;       
      },
      getChildReply: function () {
         if (!("childReply" in this)) {
            var entries = this._getEntries();
            this.childReply = (entries.length > 2) ? 
               new com.ibm.social.ee.bean.ForumReply(entries[2]) : null;
         }
         return this.childReply;
      },
      _getEntries: function () {
         if (!("entries" in this)) {
            this.entries = du.getChildElementsNS(this.e, "entry", du.ATOM_NAMESPACE);
         }
         return this.entries;
      }
      
      
   });
})();
               