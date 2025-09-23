/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/topic",
	"ic-ee/data/IdeationBlogIdeaDataStore",
	"ic-ee/gadget/BlogEntry"
], function (dojo, declare, windowModule, domConstruct, topic, IdeationBlogIdeaDataStore, BlogEntry) {

	/**
	 * Widget that displays an EE UI for a IdeationBlog Idea The following properties are
	 * required for creation: - network - An instance of either NetworkOS or
	 * NetworkDojo - context - A context object containing the URL of the blog entry
	 */
	
	(function(){
		var IdeationBlogIdea = declare("com.ibm.social.ee.gadget.IdeationBlogIdea", BlogEntry, {
	      recommendationWidgetClass: "com.ibm.social.ee.widget.IdeaRecommendation",
	      recommendation404: null,
	      createDataStore : function()  {
	      	return new IdeationBlogIdeaDataStore(this.getDsParams());
	      },
	      initializeUI: function() {
	    	 this.recommendation404 = this.nls.common.vote_error;
	         this.inherited(arguments);
	         this.setGraduated();
	      },	
	      notifyLoaded: function() {
	          topic.publish("social/ee/ideationblogidea/load", this.context, this.network, this.routes.oauth);
	      },
	      setGraduated : function() {
	      	var graduated = this.value("graduated");
	      	if(graduated) {
	      		var self = this;
	      		dojo.addOnLoad(function() {
		      		self.graduationNode = domConstruct.create("span", { className: "ideaGraduated", innerHTML:self.nls.blog.graduated }, self.recommendWidget.domNode, "before");
		      		var space = domConstruct.create("span", null, self.recommendWidget.domNode, "before");
		      		space.appendChild(windowModule.doc.createTextNode('\u00A0'));
	      		});
	      	}
	      },
	      getReadMoreStrings: function() { return i18nsocialEEStrings.idea; }
		});	
	})();
	return IdeationBlogIdea;
});
