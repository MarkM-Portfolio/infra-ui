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

dojo.provide("com.ibm.social.ee.bean.SUPermission");

dojo.require("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.incontext.util.text");

(function () {
var util = com.ibm.social.incontext.util;

dojo.declare("com.ibm.social.ee.bean.SUPermission", [com.ibm.social.ee.bean.AtomBean], {   
   getAction: function() {
      if (!("action" in this))
         this.action = util.dom.getChildElementTextContentNS(this.e, "action", util.dom.SNX_NAMESPACE);
      return this.action;   
   },
   getEntityId: function() {
      if (!("entityId" in this))
         this.entityId = util.dom.getChildElementTextContentNS(this.e, "entityId", util.dom.SNX_NAMESPACE);
      return this.entityId;
   },
   getResult: function() {
      if (!("result" in this)) {
         var resultStr = util.dom.getChildElementTextContentNS(this.e, "result", util.dom.SNX_NAMESPACE);
         this.result = (resultStr === "true");
      }
      return this.result;
   }
   
});

})();