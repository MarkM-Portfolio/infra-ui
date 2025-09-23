/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
	"dojo/_base/declare",
	"dojo/has",
	"ic-incontext/util/dom"
], function (declare, has, dom) {

	(function() {
	
	var util = com.ibm.social.incontext.util;
	
	var _ForumRecommendationMixin = declare("com.ibm.social.ee.bean._ForumRecommendationMixin", null, {
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
	         this.recommendationCount = (has("ie")) ? rl.getAttribute(util.dom.SNX_NAMESPACE.SHORT + ":recommendation") : rl.getAttributeNS(util.dom.SNX_NAMESPACE.LONG, "recommendation");
	      }
	      else {
	         this.recommendationFeed = null;
	         this.recommendationCount = 0;
	      }
	   }   
	   
	});
	
	})();
	return _ForumRecommendationMixin;
});
