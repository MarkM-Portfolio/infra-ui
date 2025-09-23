/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * paging handler tests.
 */

dojo.provide("com.ibm.social.test.unit.as.paging.testPagingHandler");


dojo.require("com.ibm.social.test.testUtil");

dojo.require("com.ibm.social.as.paging.PagingHandler");


com.ibm.social.test.testUtil.registerGroup("unit.as.paging.testPagingHandler",
	[
		{
			name: "testShowNextPage",
			description: "Test the showNextPage function",
			runTest: function(){
				// Test the _onClick function
				// This event should be called by the onClick
				this.subscribe(com.ibm.social.as.constants.events.PAGECHANGE, function(paramObj){
					doh.is("2012-02-03T15:23:28.707Z", paramObj["updatedBefore"]);
				});
				
				this.group.pagingHandler.showNextPage();
			}
		},
		{
			name: "testShowNextPageWithSnapshot",
			description: "Test the showNextPage function when a snapshot is available",
			runTest: function(){
				// Test the _onClick function
				// This event should be called by the onClick
				this.subscribe(com.ibm.social.as.constants.events.PAGECHANGE, function(paramObj){
					doh.is("2012-02-03T15:23:28.707Z", paramObj["updatedBefore"]);
					doh.is("2012-02-03T15:23:28.745Z", paramObj["snapshot"]);
				});
				
				activityStreamConfig.connections.snapshot = "2012-02-03T15:23:28.745Z";
				
				this.group.pagingHandler.showNextPage();
			}
		},
		{
			name: "testUpdateShowingAmount",
			description: "Test the updateShowingAmount function",
			setUp: function(){
				// Update the showing amount so that it's hidden
				this.group.pagingHandler.updateShowingAmount(this.group.pagingHandler.pagingAmount-1);
			},
			runTest: function(){
				doh.t(dojo.hasClass(this.group.pagingHandler.showMoreNode, "lotusHidden"));
				doh.f(dojo.hasClass(this.group.pagingHandler.backToTopNode, "lotusHidden"));
				
				// Update the showing amount so that it's showing again
				this.group.pagingHandler.updateShowingAmount(this.group.pagingHandler.pagingAmount);
				
				doh.f(dojo.hasClass(this.group.pagingHandler.showMoreNode, "lotusHidden"));
				doh.t(dojo.hasClass(this.group.pagingHandler.backToTopNode, "lotusHidden"));
			}
		}
	],
	function setUpGroup(){
	
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
			}
		}
	
		this.pagingHandler = new com.ibm.social.as.paging.PagingHandler({
			view: this.mockASView
		}, dojo.create("div"));
	},
	function tearDownGroup(){
		this.pagingHandler.destroy();
	}
);