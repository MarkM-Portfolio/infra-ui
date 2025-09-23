/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/ECMAbstractDoc"
], function (declare, ECMAbstractDoc) {

	(function () {
	   var util = com.ibm.social.incontext.util;
	   
	   var ECMPublishedDoc = declare("com.ibm.social.ee.bean.ECMPublishedDoc", ECMAbstractDoc, {
	      category: "document",  
	      getPath: function() {return util.dom.getChildElementTextContentNS(this.e, "path", util.dom.DOCUMENTS_ATOM_NAMESPACE);},
	//      getChangeSummary: function() {return util.dom.getChildElementTextContent(this.e, "changeSummary");},
	      getVisibility: function() {
	         if (!this.visibility) {
	            this.visibility = util.dom.getChildElementTextContentNS(this.e, "visibility", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	         }
	         return this.visibility;
	      },
	      isLocked: function() {return (util.dom.getChildElementTextContentNS(this.e, "locked", util.dom.DOCUMENTS_ATOM_NAMESPACE) == "true");},
	      isPublic: function() {return this.getVisibility() == "public";},
	      isPrivate: function() {return this.getVisibility() == "private";},      
	//      getUrlLock: function() {return this.prependBase(util.dom.uri.makeAtomUrlIESafe(util.dom.uri.rewriteUri(util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "edit-media", "href")), {errorPage:true}));},
	//      getUrlUnlock: function() {return this.prependBase(util.dom.uri.makeAtomUrlIESafe(util.dom.uri.rewriteUri(util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "checked-out", "href"))));},   
	      getTags: function() {
	         if (!this.tags) {
	            var tags = [];
	            for (var i=0; i < this.e.childNodes.length; i++) {
	               var child = this.e.childNodes[i];
	               if (child.nodeName == "category" && child.getAttribute("scheme") == null)
	                  tags.push(child.getAttribute("term"));
	            }
	            this.tags = tags;
	         }
	         return this.tags;
	      },
	      getMimeType: function() {return util.dom.getChildElementAttributeMatching(this.e, "link", "rel", "enclosure", "type");},
	      getDocumentId: function() {return null;},
	      getVersionId: function() {return util.dom.getChildElementTextContentNS(this.e, "versionUuid", util.dom.DOCUMENTS_ATOM_NAMESPACE);},
	      getVersionLabel: function() {return util.dom.getChildElementTextContentNS(this.e, "versionLabel", util.dom.DOCUMENTS_ATOM_NAMESPACE);},
	      getCurrentVersion: function() {
	         var downloadInfo = util.dom.getChildElementNS(this.e, "downloadInfo", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	         if (downloadInfo) {
	            return util.dom.getChildElementTextContentNS(downloadInfo, "versionLabel", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	         }
	      },
	      getDocumentVersionId: function() {return util.dom.getChildElementTextContentNS(this.e, "documentVersionUuid", util.dom.DOCUMENTS_ATOM_NAMESPACE);},
	      getDocumentVersionLabel: function() {return util.dom.getChildElementTextContentNS(this.e, "documentVersionLabel", util.dom.DOCUMENTS_ATOM_NAMESPACE);},   
	//      getShareCount: function() {return util.text.parseInt(util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/share"));},
	//      getAttachmentCount: function() {return util.text.parseInt(util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/attachments"));},
	//      getVersionCount: function() {
	//         if (!this.versionCount) {
	//            this.versionCount = util.text.parseInt(util.dom.getChildElementMatchingAttributeTextContentNS(this.e, "rank", util.dom.SNX_NAMESPACE, "scheme", null, "http://www.ibm.com/xmlns/prod/sn/versions"));
	//         }
	//         return this.versionCount;
	//      },
	      getType: function() { return "file"; },
	      getDraftId: function() {
	         if (!this.draftId)
	            this.draftId = util.dom.getChildElementTextContentNS(this.e, "draftUuid", util.dom.DOCUMENTS_ATOM_NAMESPACE);
	         return this.draftId;
	      },
	      getDraftCreated: function() {
	         if (!this.draftCreated)
	            this.draftCreated = util.dom.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "draftCreated", util.dom.DOCUMENTS_ATOM_NAMESPACE));
	         return this.draftCreated;
	      },
	      getDraftModified: function() {
	         if (!this.draftModified)
	            this.draftModified = util.dom.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "draftModified", util.dom.DOCUMENTS_ATOM_NAMESPACE));
	         return this.draftModified;
	      },
	      isDraftAvail: function() {
	         var draftUuid = this.getDraftId();
	         if (draftUuid && draftUuid != "")
	            return true;
	         return false;
	      },
	      getUrlRendition: function(){
	         return this.prependBase(util.dom.getChildElementAttributeMatchingNS(this.e, "link", util.dom.ATOM_NAMESPACE, "rel", null, "rendition", "href"));
	      }
	   });
	
	})();
	return ECMPublishedDoc;
});
