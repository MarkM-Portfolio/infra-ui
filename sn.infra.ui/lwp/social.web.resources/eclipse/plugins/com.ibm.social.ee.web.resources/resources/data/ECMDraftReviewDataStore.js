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

dojo.provide("com.ibm.social.ee.data.ECMDraftReviewDataStore");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.dom");
dojo.require("com.ibm.social.ee.data.ECMEntryDataStore");

dojo.declare("com.ibm.social.ee.data.ECMDraftReviewDataStore", com.ibm.social.ee.data.ECMEntryDataStore, {
   _fetch: function (args) {
      var q = args.query;
      if (dojo.isObject(q) && q.uuid) {
         if (args.onBegin)
            args.onBegin.call(args.scope, 1, args);
         if (args.onItem)
            args.onItem.call(args.scope, q, args);
         if (args.onComplete)
            args.onComplete.call(args.scope, [args], args);
      }
	},
	_setupRejectBodyBody: function() {
	   return this._setupDraftSubmitBody(false);	   
   },
   _setupAcceptDraftBody: function() {
	   return this._setupDraftSubmitBody(true);
   },
   _setupDraftSubmitBody: function(isApprove) {
	  var du = com.ibm.social.incontext.util.dom;
	  var doc = du.newXMLDocument("entry", du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE]);
	  var entry = doc.documentElement;
	     var approvalState = du.createElementNS(doc, "approvalAction", du.DOCUMENTS_ATOM_NAMESPACE);
	        approvalState.appendChild(doc.createTextNode(isApprove ? "approve" : "reject"));
	     entry.appendChild(approvalState);
	  var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
	  return com.ibm.social.incontext.util.text.trim(postBody);
	},
	_acceptOccurred: function (args) {
	   dojo.publish("com/ibm/social/ee/review/accepted");
	   if (args.onComplete)
	      args.onComplete.call(null);
	},
	_acceptError: function (args, error) {
	   if (args.onError)
	      args.onError.call(null);
	},
	_rejectOccurred: function (args) {
	   dojo.publish("com/ibm/social/ee/review/rejected");
	   if (args.onComplete) {
	      args.onComplete.call(null);
	   }
	},
	_rejectError: function (args, error) {
	   if (args.onError)
	      args.onError.call(null);
	},
    setValue: function (item, isApprove) {
       this._isApprove = isApprove ? true : false;
	   this._uuid = item.uuid;
	},
	save: function (args) {
	    var self = this;
       var dfd = this.net.putXml({
          url: this.url,
          headers: { "Content-Type": "application/atom+xml" },
          postData: this._isApprove ? this._setupAcceptDraftBody() : this._setupRejectBodyBody(),
          noTimeout: true
       });
       var errorCallback = function() { if (self._isApprove) { self._acceptError(args); } else { self._rejectError(args); }};
       var successCallback = function() { if (self._isApprove) { self._acceptOccurred(args); } else { self._rejectOccurred(args); }};
       dfd.addErrback(errorCallback);
       dfd.addCallback(dojo.hitch(this, function() {
          // If there is an alternate URL, it means we need to approve/reject twice - once for the current user
          // and once for the group (community owners)
          if (this.altUrl) {
              var altDfd = this.net.putXml({
                 url: this.altUrl,
                 headers: { "Content-Type": "application/atom+xml" },
                 postData: this._isApprove ? this._setupAcceptDraftBody() : this._setupRejectBodyBody(),
                 noTimeout: true
              });
              altDfd.addCallback(successCallback);
              altDfd.addErrback(errorCallback);
          }
          else {
              successCallback();
          }
       }));
    }
   
});