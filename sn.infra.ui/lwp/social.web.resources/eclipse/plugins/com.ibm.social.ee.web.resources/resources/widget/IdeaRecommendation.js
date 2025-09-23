/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.widget.IdeaRecommendation");
dojo.require("com.ibm.social.ee.data.BlogsRoutes");
dojo.requireLocalization("com.ibm.social.ee", "socialEEStrings");


(function () {
	dojo.require("com.ibm.social.ee.widget.Recommendation");
	dojo.declare("com.ibm.social.ee.widget.IdeaRecommendation", [com.ibm.social.ee.widget.Recommendation], {
		disablePopup : true,
		postMixInProperties: function() {
			this.logEnter(arguments);
			this.inherited(arguments);
			var nls = dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings");
			this.strings = dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").blog.vote;
			this._getStateObject().strings = this.strings;		
			this.logExit(arguments);	
		},
		postCreate: function() {
			this.logEnter(arguments);			
			this.inherited(arguments);
			var routes = new com.ibm.social.ee.data.BlogsRoutes();
			this.inlineSmiley.src = routes.getServiceUrl() + "/roller-ui/images/iconVote.png";
			this.inlineSmiley.style.backgroundImage="none";
			this.logExit(arguments);
		}
	});
})();
