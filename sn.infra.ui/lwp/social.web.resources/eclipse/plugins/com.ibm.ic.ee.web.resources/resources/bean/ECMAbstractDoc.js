/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/AtomBean",
	"ic-ee/bean/ECMUser",
	"ic-incontext/util/dom",
	"ic-incontext/util/text"
], function (declare, AtomBean, ECMUser, dom, text) {

	(function () {
	   var util = com.ibm.social.incontext.util;
	   
	   var ECMAbstractDoc = declare("com.ibm.social.ee.bean.ECMAbstractDoc", AtomBean, {
	      getName: function() {
	         if (!this.name) {
	            var s = util.dom.getChildElementTextContentNS(this.e, "label", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	            if (!s || s.length == 0)
	               s = util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "title");
	            if (!s || s.length == 0)
	               s = util.dom.getChildElementTextContent(this.e, "title");
	            this.name = s;
	         }
	         if (!this.name || this.name == "")
	            this.throwRequiredPropertyError("name");
	         return this.name;
	      },
	//      getMultipartFormLink: function() {
	//         return this.getUrlEntry();
	//      },
	//      getSnxFields: function() {
	//         var f = {};
	//         var fields = util.dom.getChildElementsNS(this.e, "field", util.dom.SNX_NAMESPACE);
	//         for (var i = 0; i < fields.length; i++) {
	//            var field = fields[i];
	//            var pst = field.getAttribute("pstId");
	//            var fid = field.getAttribute("fid");
	//            if (pst && fid) {
	//               if (!f[pst])
	//                  f[pst] = {};
	//               if (f[pst][fid]) {
	//                  if (!f[pst][fid].push)
	//                     f[pst][fid] = [f[pst][fid], util.dom.xmlText(field)];
	//                  else
	//                     f[pst][fid].push(util.dom.xmlText(field));
	//               }
	//               else
	//                  f[pst][fid] = util.dom.xmlText(field);
	//            }
	//         }
	//         return f;
	//      },
	      getLabel: function() {
	         var retVal = this.inherited(arguments); 
	         if (!retVal || retVal == "")
	            this.throwRequiredPropertyError("label");
	         return retVal;
	      },
	      getSize: function() {return util.text.parseInt(util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "length"));},
	      getLockOwner: function() {
	         if (!this.lockOwner) {
	            var el = util.dom.getElementsByTagNameNS(this.e, "lockOwner", util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
	            if (el) {                        
	               this.lockOwner = new ECMUser(el);
	            }
	         }
	         return this.lockOwner;
	      },   
	//      getDocumentType: function() {
	//         return util.dom.getChildElementTextContentNS(this.e, "documenttype", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	//      },
	      getWorkingCopyLink: function() {
	         return this.getUrlEntry();
	      },
	      getCurrentVersionLink: function() {
	         return this.getUrlEntry();
	      },
	      getNexusId: function() {
	         return util.dom.getChildElementTextContentNS(this.e, "nexusId", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	      },
	      getRatingCount: function() {
	         if (typeof this.ratingCount == "undefined") {
	            this.ratingCount = util.text.parseInt(util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/recommendations"));
	         }
	         return this.ratingCount;
	      },
	      getUrlRecommendation: function() {
	         if (!this.urlRec) {
	            var url = util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "recommendation", "href");
	            url = url ? util.uri.makeAtomUrlIESafe(url) : null;
	            this.urlRec = this.prependBase(url);
	         }
	         return this.urlRec;
	      },
	      getUrlRecommendations: function() {
	         if (!this.urlRecs) {
	            var url = util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "recommenders", "href");
	            this.urlRecs = this.prependBase(url);
	         }
	         return this.urlRecs;
	      },
	      isUserRecommended: function() {
	         return this.getUrlRecommendation() ? true : false;
	      },
	  //    getTimesDownloaded: function() {return util.text.parseInt(util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/hit"));},
	  //    getTimesDownloadedAnonymously: function() {return util.text.parseInt(util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/anonymous_hit"));},
	//      getUrlDownloads: function() {
	//         if (!this.urlDownloads) {
	//            var url = util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "downloaders", "href");
	//            this.urlDownloads = this.prependBase(url);
	//         }
	//         return this.urlDownloads;
	//      },
	      getCommentCount: function() {
	         if (!this.commentCount) {
	            this.commentCount = util.text.parseInt(util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/comment"));
	         }
	         return this.commentCount;
	      },
	      isNotificationEnabled: function() {
	         if (!this.notificationEnabled)
	         {
	            this.notificationEnabled = false;
	            var notifications = util.dom.getElementsByTagNameNS(this.e, "notifications", util.dom.DOCUMENTS_ATOM_NAMESPACE)[0];
	            if (notifications)
	               this.notificationEnabled = (util.dom.getChildElementTextContentNS(notifications, "media", util.dom.DOCUMENTS_ATOM_NAMESPACE) == "on");
	         }
	         return this.notificationEnabled;
	      },
	      getNotifications: function() {
	         if (!this.notifications) {         
	            var e = util.dom.getChildElementNS(this.e, "notifications", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	            if (e) {
	               var c;
	               var n = this.notifications = {};            
	               for (var i=0; c=e.childNodes[i]; i++)
	                  if (c.nodeType == 1)
	                     n[c.localName] = util.dom.xmlText(c) == "on";
	            }
	         }
	         return this.notifications;
	      },
	      /* For draft, need this data on both draft and public doc so we know when to show link */
	      getApprovalState: function() {
	         if (!this.approvalState) {
	            this.approvalState = util.dom.getChildElementTextContentNS(this.e, "approvalState", util.dom.DOCUMENTS_ATOM_NAMESPACE);
		     }
		     return this.approvalState;
	      },
	      getUrlLandingPage: function() {
	         if (!this.urlLand)
	            this.urlLand = util.uri.makeAtomUrlIESafe(util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "via", "href"));
	         return this.urlLand;
	      },
	      getModifier: function() {
	         if (!this.modifier)
	            this.modifier = new ECMUser(util.dom.getElementsByTagNameNS(this.e, "modifier", util.dom.DOCUMENTS_ATOM_NAMESPACE)[0]);
	         return this.modifier;
	      },
	      getUrlMembers: function() {
	         if (!this.urlMembers) {
	            var url = util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "members", "href");
	            this.urlMembers = this.prependBase(url);
	         }
	         return this.urlMembers;
	      }
	   });
	
	})();
	return ECMAbstractDoc;
});
