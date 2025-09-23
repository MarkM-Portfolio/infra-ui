/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 *
 */
dojo.provide("com.ibm.social.test.unit.jasmine.as.paging.PagingHandlerSpec");

dojo.require("com.ibm.social.as.paging.PagingHandler");

(function(PagingHandler) {

   beforeEach(function() {
	   dojo.getObject("activityStreamConfig.connections", true, window);
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
		}, dojo.create("div"));
   });

   describe("the com.ibm.social.as.paging.PagingHandler.showNextPage", function() {
      it("Test the showNextPage function", function() {
    	  	// Test the _onClick function
			// This event should be called by the onClick
			dojo.subscribe(com.ibm.social.as.constants.events.PAGECHANGE, function(paramObj){
				expect(paramObj["updatedBefore"]).toBe("2012-02-03T15:23:28.707Z");
			});
			
			this.pagingHandler.showNextPage();
         
      });
   });
   
   describe("the com.ibm.social.as.paging.PagingHandler.testShowNextPageWithSnapshot", function() {
	      it("Test the showNextPage function with snapshot", function() {
	    	  dojo.subscribe(com.ibm.social.as.constants.events.PAGECHANGE, function(paramObj){
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
	    	  expect(dojo.hasClass(this.pagingHandler.showMoreNode, "lotusHidden")).toBeTruthy();
	    	  expect(dojo.hasClass(this.pagingHandler.backToTopNode, "lotusHidden")).toBeFalsy()
				
	    	  // Update the showing amount so that it's showing again
	    	  this.pagingHandler.updateShowingAmount(this.pagingHandler.pagingAmount);
				
	    	  expect(dojo.hasClass(this.pagingHandler.showMoreNode, "lotusHidden")).toBeFalsy();
	    	  expect(dojo.hasClass(this.pagingHandler.backToTopNode, "lotusHidden")).toBeTruthy()
	      });
	});
   
 
}(com.ibm.social.as.paging.PagingHandler));

