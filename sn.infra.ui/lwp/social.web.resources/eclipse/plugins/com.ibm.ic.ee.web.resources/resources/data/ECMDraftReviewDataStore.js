/* Copyright IBM Corp. 2007, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"ic-ee/data/ECMEntryDataStore",
	"ic-incontext/util/dom",
	"ic-incontext/util/text"
], function (declare, lang, topic, ECMEntryDataStore, dom, text) {

	var ECMDraftReviewDataStore = declare("com.ibm.social.ee.data.ECMDraftReviewDataStore", ECMEntryDataStore, {
	   _fetch: function (args) {
	      var q = args.query;
	      if (lang.isObject(q) && q.uuid) {
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
		  var du = dom;
		  var doc = du.newXMLDocument("entry", du.ATOM_NAMESPACE, [du.DOCUMENTS_ATOM_NAMESPACE]);
		  var entry = doc.documentElement;
		     var approvalState = du.createElementNS(doc, "approvalAction", du.DOCUMENTS_ATOM_NAMESPACE);
		        approvalState.appendChild(doc.createTextNode(isApprove ? "approve" : "reject"));
		     entry.appendChild(approvalState);
		  var postBody = du.XML_DECLARATION + du.serializeXMLDocument(doc);
		  return text.trim(postBody);
		},
		_acceptOccurred: function (args) {
		   topic.publish("com/ibm/social/ee/review/accepted");
		   if (args.onComplete)
		      args.onComplete.call(null);
		},
		_acceptError: function (args, error) {
		   if (args.onError)
		      args.onError.call(null);
		},
		_rejectOccurred: function (args) {
		   topic.publish("com/ibm/social/ee/review/rejected");
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
	       dfd.addCallback(lang.hitch(this, function() {
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
	return ECMDraftReviewDataStore;
});
