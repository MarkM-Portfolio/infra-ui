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

dojo.provide("com.ibm.social.ee.bean.BlogEntry");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.ee.bean.User");

/* Loads data from a BlogEntry Feed*/
(function(){
	var du = com.ibm.social.incontext.util.dom;
	dojo.declare("com.ibm.social.ee.bean.BlogEntry", [com.ibm.social.ee.bean.AtomBean], {
		COMMENT_SCHEME: "http://www.ibm.com/xmlns/prod/sn/comment",
		RECOMMENDATION_SCHEME: "http://www.ibm.com/xmlns/prod/sn/recommendations",
		getCommentCount: function() {
			if (!("commentCount" in this)) {
				this.commentCount = du.getChildElementMatchingAttributeTextContentNS(this.e, "rank", du.SNX_NAMESPACE, "scheme", null, this.COMMENT_SCHEME);
			}
			return this.commentCount; 
		},
		getRecommendCount: function() {
			if (!("recommendCount" in this)) {
				this.recommendCount = du.getChildElementMatchingAttributeTextContentNS(this.e, "rank", du.SNX_NAMESPACE, "scheme", null, this.RECOMMENDATION_SCHEME);
			}
			return this.recommendCount;
		},
		getTags: function () {
			if (!("tags" in this)) {
				var tags = [];
				var tagElements = du.getChildElementsNS(this.e, "category", du.ATOM_NAMESPACE);
				dojo.forEach(tagElements, function (tagEl) { 
					tags.push(tagEl.getAttribute("term"));
				});
				this.tags = tags;
			}
			return this.tags;
		},
		getUserRecommended: function() {
			if (!("userRecommended" in this)) {
				this._readCollections();
			}
			return this.userRecommended;
		},
		getRecommendationCollectionUrl : function() {
			if (!("recommendationUrl" in this)) {
				this._readCollections();
			}
			return this.recommendationUrl;
		},
		getRecommendationUrl: function() {
		   return this.prependBase(du.getChildElementAttributeMatchingNS(this.e, "link", du.ATOM_NAMESPACE, "rel", null, this.RECOMMENDATION_SCHEME, "href"));
		},
		_readCollections: function () {
			var collections = du.getChildElementsNS(this.e, "collection", du.APP_NAMESPACE);
			var self = this;
			dojo.forEach(collections, function (coll) {
				var category = du.getChildElementAttribute(coll, "category", "term");
				if (category == "recommend") {
					self.userRecommended = (du.getChildElementNS(coll, "voted", du.SNX_NAMESPACE) != null);
					self.recommendationUrl = coll.attributes.getNamedItem("href").nodeValue;
				}
			});
		},
		getCommentsFeed: function() {
			if (!("commentsFeed" in this)) {
				this._readCollectionsComments();
			}
			return this.commentsFeed;
		}, 
		getCommentsAllowed: function() {
			if(!("commentsAllowed" in this)) {
				this._readCollectionsComments();
			}
			return this.commentsAllowed;
		},
		_readCollectionsComments: function () {
			var collections = du.getChildElementsNS(this.e, "collection", du.APP_NAMESPACE);
			var self = this;
			dojo.forEach(collections, function (coll) {
				category = du.getChildElementAttribute(coll, "category", "term");
				if (category == "comments") {
					self.commentsFeed = coll.attributes.getNamedItem("href").nodeValue;
					if(self.commentsFeed.indexOf("contentFormat=") == -1) {
						if(self.commentsFeed.indexOf("?") == -1) {
							self.commentsFeed = self.commentsFeed + "?" + "contentFormat=html";
						} else {
							self.commentsFeed = self.commentsFeed + "&" + "contentFormat=html";
						}
					}
					var commentsAccepted = du.getChildElementsNS(coll, "accept", du.APP_NAMESPACE);
					self.commentsAllowed = commentsAccepted[0].firstChild!==null;
				}
			});
		},
		getContainerId: function () {
		   if (!("containerId" in this)) {
   		      var source = du.getChildElementNS(this.e, "source", du.ATOM_NAMESPACE);
   		      var id = du.getChildElementTextContentNS(source, "id", du.ATOM_NAMESPACE);
   		      this.containerId = id.substring(id.length - 36);	   
		   }
		   return this.containerId;
		}
	});
})();