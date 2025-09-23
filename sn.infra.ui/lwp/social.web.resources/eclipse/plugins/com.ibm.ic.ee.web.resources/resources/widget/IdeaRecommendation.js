/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/i18n!ic-ee/nls/socialEEStrings",
	"ic-ee/data/BlogsRoutes",
	"ic-ee/widget/Recommendation"
], function (dojo, declare, i18nsocialEEStrings, BlogsRoutes, Recommendation) {

	(function () {
			var IdeaRecommendation = declare("com.ibm.social.ee.widget.IdeaRecommendation", Recommendation, {
			disablePopup : true,
			postMixInProperties: function() {
				this.logEnter(arguments);
				this.inherited(arguments);
				var nls = i18nsocialEEStrings;
				this.strings = i18nsocialEEStrings.blog.vote;
				this._getStateObject().strings = this.strings;		
				this.logExit(arguments);	
			},
			postCreate: function() {
				this.logEnter(arguments);			
				this.inherited(arguments);
				var routes = new BlogsRoutes();
				this.inlineSmiley.src = routes.getServiceUrl() + "/roller-ui/images/iconVote.png";
				this.inlineSmiley.style.backgroundImage="none";
				this.logExit(arguments);
			}
		});
	})();
	
	return IdeaRecommendation;
});
