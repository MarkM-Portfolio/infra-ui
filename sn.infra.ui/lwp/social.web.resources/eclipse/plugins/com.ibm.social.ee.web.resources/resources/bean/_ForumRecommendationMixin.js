/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.bean._ForumRecommendationMixin");

dojo.require("com.ibm.social.incontext.util.dom");

(function() {

var util = com.ibm.social.incontext.util;

dojo.declare("com.ibm.social.ee.bean._ForumRecommendationMixin", null, {
   isRecommendedByUser: function() {
      if (!("recommendedByUser" in this)) {
         var notRecommendedEl = util.dom.getChildElementMatchingAttributeNS(this.e, "category", util.dom.ATOM_NAMESPACE, "term", null, "NotRecommendedByCurrentUser");
         if (notRecommendedEl)
            this.recommendedByUser = false;
         else
            this.recommendedByUser = true;              
      }
      return this.recommendedByUser;
   },
   
   getRecommendationCount: function() {
      if (!("recommendationCount" in this)) {
         this._getCountAndFeed();
      }
      return this.recommendationCount;
   },
   
   getRecommendationFeed: function() {
      if (!("recommendationFeed" in this)) {
         this._getCountAndFeed();
      }
      return this.recommendationFeed;
   },
   
   _getCountAndFeed: function() {
      var rl = util.dom.getChildElementMatchingAttributeNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "recommendations");
      if (rl) {
         this.recommendationFeed = rl.getAttribute("href");
         this.recommendationCount = (dojo.isIE) ? rl.getAttribute(util.dom.SNX_NAMESPACE.SHORT + ":recommendation") : rl.getAttributeNS(util.dom.SNX_NAMESPACE.LONG, "recommendation");
      }
      else {
         this.recommendationFeed = null;
         this.recommendationCount = 0;
      }
   }   
   
});

})();