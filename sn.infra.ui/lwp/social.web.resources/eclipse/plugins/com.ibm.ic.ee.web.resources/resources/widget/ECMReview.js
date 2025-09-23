/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"dojo/dom-class",
	"dojo/text!ic-ee/widget/templates/ECMReview.html",
	"dojo/topic",
	"dijit/_Templated",
	"dijit/_Widget",
	"ic-ee/data/CommunityRoutes",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/html"
], function (dojo, domAttr, declare, array, windowModule, domConstruct, i18nsocialEEStrings, domClass, template, topic, _Templated, _Widget, CommunityRoutes, DateFormat, html) {

	(function () {
	   var util = com.ibm.social.incontext.util;
	   var ECMReview = declare("com.ibm.social.ee.widget.ECMReview", [_Widget, _Templated], {
		   approvers: [],
		   submitter: null,
		   allLibraryApprovers: false,
		   _blankGif: null,
		   approvalState: null,
		   _strings: i18nsocialEEStrings.ecm_draft,
		   templateString: template,
		   postCreate: function() {
			  this._showLoading();
			  this.render();
			  this.inherited(arguments);
			  this.loading.style.display = "none";
			  this.main.style.display = "";
			  var self = this;
			  window.setTimeout(function() { self.onDisplayChange(); }, 1);
		   },
		   render: function() {
		      var libApprovers = [], docApprovers = [], d = windowModule.doc, scope = this;
			  //Set review info string
			  this.setReviewInfo(d, scope);
	
			  //Determine approver lists
			  array.forEach (this.approvers, function (approver) {
		         if(approver.scope == "library")
		            libApprovers.push(approver);
		         else
		            docApprovers.push(approver);
			  });
		      //Create help text
		      this.helpTxt.appendChild(d.createTextNode(this.allLibraryApprovers ? this._strings.review_required_all : this._strings.review_required_any));
		      
		      //Add reviewer information to main table
		      array.forEach (libApprovers, function (libApprover) {
		         scope._renderApproverRow(libApprover, scope.mainTbody);
		      });
		      
		      //If additional reviewers exist, populate additional table
		      if (docApprovers.length > 0) {
		    	  array.forEach (docApprovers, function (docApprover) {
		            scope._renderApproverRow(docApprover, scope.AddtlTbody);
		         });
			     this.addtlReviewers.style.display = "";
		      }
		      topic.publish("com/ibm/social/ee/data/loaded");
		   },
		   setReviewInfo: function(d, scope) {
			   var submitTime = new DateFormat(this.submitted).formatByAge(this._strings.reivew_submitted_date, d);
		          util.html.substitute(d, this.draftInfo, submitTime, {
		             user: function() {
		                var span = d.createElement("span");
		                   util.text.breakString(scope.submitter.name, d, span);
		                   if (scope.generateLinkToPerson)
		                	   scope.generateLinkToPerson(scope.submitter, span);
		                return span;
		             }
		          });
		   },
			   _renderApproverRow: function(approver, tbody) {
			      var d = windowModule.doc, statusImg;
			      var tr = domConstruct.create("tr", {}, tbody);
			         var td = domConstruct.create("td", {}, tr);
			         if (approver.status == "rejected") {
			            statusImg = domConstruct.create("img", {title: this._strings.rejected, className: "otherVoting12 otherVoting12-VoteRejected12", alt: this._strings.rejected, src: this._blankGif}, td);
			         }
			         else if (approver.status == "approved") {
			            statusImg = domConstruct.create("img", {title: this._strings.approved, className: "otherVoting12 otherVoting12-VoteAccepted12", alt: this._strings.approved, src: this._blankGif}, td);
			         }
			         else if (this.approvalState == "rejected") {
			            statusImg = domConstruct.create("img", {title: this._strings.pending_rejected, className: "otherVoting12 otherVoting12-VoteNotRequired12", title: this._strings.pending_rejected, src: this._blankGif}, td);
			         }
			        //If the auth user is both a community owner and an individual reviewer show the authUserStatus on both.  The user will vote on behalf of themselves and the community.
			         if (statusImg && this.isApprover(approver))
			            domClass.add(statusImg, "authUserStatus");
			         var td = domConstruct.create("td", {}, tr);
			         
			         //First check to see if user is the community group
			         //Note: This solution is a HACK to fix 88090.  We expect to get the communityOwnerGroupId data back on the draft entry to compare to approver.id.  We will fix in a future release.
			         if (approver.type == "group" && approver.id.substring(0, 7) == "$IC-C-O") {
			        	 var communityId = approver.id.split("$IC-C-O-")[1];
			        	 var communityUrl = this.getCommunityRoutes().getCommunityLink(communityId);
			        	 var memberUrl = communityUrl + "#fullpageWidgetId=Members";
			             var a = domConstruct.create("a", {href: memberUrl, title: this._strings.community_owners}, td);
			                domAttr.set(a, "target", "_blank");
			        	    a.appendChild(d.createTextNode(this._strings.community_owners));
			         }
			         else {
			            if (this.generateLinkToPerson)
		                   this.generateLinkToPerson(approver, td);
			            else
			               td.appendChild(d.createTextNode(approver.name));
			         }
			   },
			   _showLoading: function() {
			      domConstruct.empty(this.loading);
			      util.html.showLoading(this.loading);
			      this.loading.style.display = "";
			   },
			   getCommunityRoutes: function () {
			      if (!this.communityRoutes)
			         this.communityRoutes = new CommunityRoutes(this.getRouteOptions());
			      return this.communityRoutes;  
			   },
			   onDisplayChange: function() {},
			   generateLinkToPerson: function() {},
			   getRouteOptions: function() {}
	   });
	})();
	return ECMReview;
});
