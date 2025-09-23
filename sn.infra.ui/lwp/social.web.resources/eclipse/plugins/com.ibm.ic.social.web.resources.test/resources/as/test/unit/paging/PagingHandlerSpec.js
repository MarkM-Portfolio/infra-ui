/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/topic",
	"ic-as/constants/events",
	"ic-as/paging/PagingHandler"
], function (lang, domClass, domConstruct, topic, events, PagingHandler) {

	   beforeEach(function() {
		   lang.getObject("activityStreamConfig.connections", true, window);
		   this.mockASView = {
				getLastNewsItem: function(){
					return {
						newsData: {
							getPublished: function(){
								return "2012-02-03T15:23:28.707Z";
							}
						}
					};
				},
				controller: {configHandler: {
						getSelectedViewFilterWithCount: function(){
							return{params:{}};
						}
				}}
			}
		   
		    com.ibm.social.as.configManager = {
				   getDefaultUrlTemplateValues: function(){
					   return {};
				   }
		   }
		   
			this.pagingHandler = new PagingHandler({
				view: this.mockASView
			}, domConstruct.create("div"));
	   });
	
	   describe("the com.ibm.social.as.paging.PagingHandler.showNextPage", function() {
	      it("Test the showNextPage function", function() {
	    	  	// Test the _onClick function
				// This event should be called by the onClick
				topic.subscribe(events.PAGECHANGE, function(paramObj){
					expect(paramObj["updatedBefore"]).toBe("2012-02-03T15:23:28.707Z");
				});
				
				this.pagingHandler.showNextPage();
	         
	      });
	   });
	   
	   describe("the com.ibm.social.as.paging.PagingHandler.testShowNextPageWithSnapshot", function() {
		      it("Test the showNextPage function with snapshot", function() {
		    	  topic.subscribe(events.PAGECHANGE, function(paramObj){
						expect(paramObj["updatedBefore"]).toBe("2012-02-03T15:23:28.707Z");
						expect(paramObj["snapshot"]).toBe("2012-02-03T15:23:28.745Z");
					});
					
					activityStreamConfig.connections.snapshot = "2012-02-03T15:23:28.745Z";
					
					this.pagingHandler.showNextPage();     
		      });
		});
	   
	   describe("the com.ibm.social.as.paging.PagingHandler.updateShowingAmount", function() {
		      it("Test updateShowingAmount", function() {
		    	// Update the showing amount so that it's hidden
		    	  this.pagingHandler.hasPaged = true;
		    	  this.pagingHandler.updateShowingAmount(this.pagingHandler.pagingAmount-1);
		    	  expect(domClass.contains(this.pagingHandler.showMoreNode, "lotusHidden")).toBeTruthy();
		    	  expect(domClass.contains(this.pagingHandler.backToTopNode, "lotusHidden")).toBeFalsy()
					
		    	  // Update the showing amount so that it's showing again
		    	  this.pagingHandler.updateShowingAmount(this.pagingHandler.pagingAmount);
					
		    	  expect(domClass.contains(this.pagingHandler.showMoreNode, "lotusHidden")).toBeFalsy();
		    	  expect(domClass.contains(this.pagingHandler.backToTopNode, "lotusHidden")).toBeTruthy()
		      });
		});
});
