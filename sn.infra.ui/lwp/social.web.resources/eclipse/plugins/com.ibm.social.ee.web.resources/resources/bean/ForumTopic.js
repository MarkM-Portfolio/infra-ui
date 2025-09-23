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

dojo.provide("com.ibm.social.ee.bean.ForumTopic");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.bean.AtomBean");
dojo.require("com.ibm.social.ee.bean._ForumRecommendationMixin");
dojo.require("com.ibm.social.ee.bean.User");

/* Loads data from a ForumTopic entry */
(function(){
	var du = com.ibm.social.incontext.util.dom;
	dojo.declare("com.ibm.social.ee.bean.ForumTopic", [com.ibm.social.ee.bean.AtomBean, com.ibm.social.ee.bean._ForumRecommendationMixin], {
		COMMENT_SCHEME: "http://www.ibm.com/xmlns/prod/sn/comment",
		FLAGS_SCHEME: "http://www.ibm.com/xmlns/prod/sn/flags",
		TERM_QUESTION: "question",
		TERM_LOCKED: "locked",
		TERM_ANSWERED: "answered",		
		getRepliesCount: function() {
			if (!("repliesCount" in this)) {
				this.repliesCount = du.getChildElementAttributeMatchingNS(this.e, "link", du.ATOM_NAMESPACE, "rel", null, "replies", "count", du.THREAD_ATOM_NAMESPACE);
			}
			return this.repliesCount; 
		},
		getAttachmentCount: function() {
		   if (!("attachmentCount" in this)) {
		      var fields = du.getChildElementsNS(this.e, "field", du.SNX_NAMESPACE);
		      var count = 0;
		      for (var i = 0; i < fields.length; i++)
		         if (fields[i].getAttribute("type") === "file")
		             count++;
		      this.attachmentCount = count;
		   }
		   return this.attachmentCount;
		},
		isQuestion: function () {
		   if (!("question" in this)) {
	         this._readCategories();
		   }
		   return this.question;
		},
		isAnswered: function () {
		   if (!("answered" in this)) {
		      this._readCategories();
		   }
		   return this.answered;
		},
		isLocked: function () {
         if (!("locked" in this)) {
            this._readCategories();
         }
         return this.locked;   
		},
		getTags: function () {
			if (!("tags" in this)) {
				this._readCategories();
			}
			return this.tags;
		},		
		_readCategories: function () {
         var categoryElements = du.getChildElementsNS(this.e, "category", du.ATOM_NAMESPACE);
         var question = false;
         var answered = false;
         var locked = false;
         var tags = [];
         dojo.forEach(categoryElements, function (el) { 
            var scheme = el.getAttribute("scheme");
            var term = el.getAttribute("term");
            if (scheme) {
              if (scheme == this.FLAGS_SCHEME) {
                 if (term == this.TERM_QUESTION) question = true;
                 else if (term == this.TERM_ANSWERED) answered = true;
                 else if (term == this.TERM_LOCKED) locked = true;
              }
            }
            else {
               tags.push(term);
            }
        }, this);
         this.question = question;
         this.answered = answered;
         this.locked = locked;
         this.tags = tags;
		},		
		getUserRecommended: function() {
			if (!("userRecommended" in this)) {
				this._readCollections();
			}
			return this.userRecommended;
		},
		getRecommendationUrl : function() {
			if (!("recommendationUrl" in this)) {
				this._readCollections();
			}
			return this.recommendationUrl;
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
      getPermissions: function() {
         if (!("permissions" in this)) {
            var str = du.getChildElementTextContentNS(this.e, "permissions", du.SNX_NAMESPACE);
            var arr = str.split(",");
            var perms = { };
            for (var i = 0; i < arr.length; i++) perms[dojo.trim(arr[i])] = true;
            this.permissions = perms;
         }
         return this.permissions;
      },
      getContainerId: function () {
         if (!("containerId" in this)) {
            var ref = du.getChildElementNSAttribute(this.e, "in-reply-to", du.THREAD_ATOM_NAMESPACE, "ref");
            this.containerId = /(.*forum:)?(.*)/.exec(ref)[2];
         }
         return this.containerId;
      },
      getUrlAlternate: function() {
         if (!("altUrl" in this)) {
            this.altUrl = "";
            var links = du.getChildElementsNS(this.e, "link", du.ATOM_NAMESPACE);
            for (var i = 0; i < links.length; i++) {
               if (links[i].getAttribute("rel") == "alternate") {
                  this.altUrl = links[i].getAttribute("href");
                  break;
               }
            }
         }
         return this.altUrl;
      }      
	});
})();
