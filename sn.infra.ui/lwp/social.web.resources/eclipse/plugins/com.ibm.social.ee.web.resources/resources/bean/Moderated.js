/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide ("com.ibm.social.ee.bean.Moderated");
dojo.require("com.ibm.social.ee.bean.User");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.misc");
// Mixin to handle moderation status on moderated Atom responses

(function () {
var util = com.ibm.social.incontext.util;   
dojo.declare ("com.ibm.social.ee.bean.Moderated", null, {
   getModerationStatus: function () {
      if (!this.moderationStatus) {
         this.moderationStatus = util.dom.getChildElementAttributeMatching(this.e, "category", "scheme", "http://www.ibm.com/xmlns/prod/sn/flags", "term");
      }
      return this.moderationStatus;  
   },
   getStateChangedBy:function() {
      if (!this.stateChangedBy) {
         var el = util.dom.getElementsByTagNameNS(this.e, "stateChangedBy", util.dom.SNX_NAMESPACE)[0];
         if(el)
            this.stateChangedBy =new com.ibm.social.ee.bean.User(el);
      }
      return this.stateChangedBy;
   },
   getStateChangedDate: function() {
      if (!this.stateChangedDate) {
         this.stateChangedDate = util.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "stateChangedWhen", util.dom.SNX_NAMESPACE));
      }
      return this.stateChangedDate;
   }
});
})();