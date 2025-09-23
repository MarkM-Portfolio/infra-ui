/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.IdeationBlogIdea");
dojo.require("com.ibm.social.ee.gadget.BlogEntry");
dojo.require("com.ibm.social.ee.data.IdeationBlogIdeaDataStore");
dojo.require("com.ibm.social.ee.widget.IdeaRecommendation");

/**
 * Widget that displays an EE UI for a IdeationBlog Idea The following properties are
 * required for creation: - network - An instance of either NetworkOS or
 * NetworkDojo - context - A context object containing the URL of the blog entry
 */

(function(){
	dojo.declare("com.ibm.social.ee.gadget.IdeationBlogIdea", [com.ibm.social.ee.gadget.BlogEntry], {
      recommendationWidgetClass: "com.ibm.social.ee.widget.IdeaRecommendation",
      recommendation404: null,
      createDataStore : function()  {
      	return new com.ibm.social.ee.data.IdeationBlogIdeaDataStore(this.getDsParams());
      },
      initializeUI: function() {
    	 this.recommendation404 = this.nls.common.vote_error;
         this.inherited(arguments);
         this.setGraduated();
      },	
      notifyLoaded: function() {
          dojo.publish("social/ee/ideationblogidea/load", [this.context, this.network, this.routes.oauth]);
      },
      setGraduated : function() {
      	var graduated = this.value("graduated");
      	if(graduated) {
      		var self = this;
      		dojo.addOnLoad(function() {
	      		self.graduationNode = dojo.create("span", { className: "ideaGraduated", innerHTML:self.nls.blog.graduated }, self.recommendWidget.domNode, "before");
	      		var space = dojo.create("span", null, self.recommendWidget.domNode, "before");
	      		space.appendChild(dojo.doc.createTextNode('\u00A0'));
      		});
      	}
      },
      getReadMoreStrings: function() { return dojo.i18n.getLocalization("com.ibm.social.ee", "socialEEStrings").idea; }
	});	
})();