/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"ic-ee/bean/User",
	"ic-incontext/util/dom",
	"ic-incontext/util/misc"
], function (declare, User, dom, misc) {

	// Mixin to handle moderation status on moderated Atom responses
	
	(function () {
	var util = com.ibm.social.incontext.util;   
	var Moderated = declare ("com.ibm.social.ee.bean.Moderated", null, {
	   getModerationStatus: function () {
	      if (!this.moderationStatus) {
	         this.moderationStatus = util.dom.getChildElementAttributeMatching(this.e, "category", "scheme", "http://www.ibm.com/xmlns/prod/sn/flags", "term");
	      }
	      return this.moderationStatus;  
	   },
	   getStateChangedBy:function() {
	      if (!this.stateChangedBy) {
	         var el = util.dom.getElementsByTagNameNS(this.e, "stateChangedBy", util.dom.SNX_NAMESPACE)[0];
	         if(el)
	            this.stateChangedBy =new User(el);
	      }
	      return this.stateChangedBy;
	   },
	   getStateChangedDate: function() {
	      if (!this.stateChangedDate) {
	         this.stateChangedDate = util.misc.date.convertAtomDate(util.dom.getChildElementTextContentNS(this.e, "stateChangedWhen", util.dom.SNX_NAMESPACE));
	      }
	      return this.stateChangedDate;
	   }
	});
	})();
	return Moderated;
});
