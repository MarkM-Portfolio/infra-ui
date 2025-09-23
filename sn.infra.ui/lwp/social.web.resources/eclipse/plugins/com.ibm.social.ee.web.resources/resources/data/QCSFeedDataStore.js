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

dojo.provide("com.ibm.social.ee.data.QCSFeedDataStore");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.data.DomBuilder");
dojo.require("com.ibm.social.ee.data.FeedDataStore");
dojo.require("com.ibm.social.ee.bean.File");

(function(){
var tu =  com.ibm.social.incontext.util.text;
var du =  com.ibm.social.incontext.util.dom;
dojo.declare("com.ibm.social.ee.data.QCSFeedDataStore", [com.ibm.social.ee.data.FeedDataStore], {
   _domBuilder: new com.ibm.social.ee.data.DomBuilder(),
   getTotalItems: function(el) {
      return parseInt(du.getChildElementTextContentNS(el, "totalResults", du.OPENSEARCH_NAMESPACE));
   },
   getStdParams: function(request) {
      var params = {};
      if(dojo.isIE)
         params.format = "xml";
      var start = null;
      if (request.start)
         start = request.start + 1;
      if (start) {
         params.sI = start;
      }
      if (request.count) {
         params.pageSize = request.count;
      }
      if (request.sort && request.sort.length > 0) {
         params.sK = request.sort[0].attribute;
         params.sO = (request.sort[0].descending) ? "dsc" : "asc";
      }
      return params;
   },
   getCategory: function(el) {
      return du.getChildElementAttribute(el, "category", "term");
   },
   getDeleteHandleAs: function() {
      return "text"; 
   },
   itemFromDocElAndCat: function (el, base, category, keywordArgs) {
      return new com.ibm.social.ee.bean.File(el, base);
   }   

});

})();