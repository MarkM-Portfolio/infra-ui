define([
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"ic-as/paging/PagingHandler",
	"ic-test/testUtil"
], function (lang, domClass, domConstruct, PagingHandler, testUtil) {

	/*                                                                   */
	/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
	
	/**
	 * paging handler tests.
	 */
	
	testUtil.registerGroup("unit.as.paging.testPagingHandler",
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
					doh.t(domClass.contains(this.group.pagingHandler.showMoreNode, "lotusHidden"));
					doh.f(domClass.contains(this.group.pagingHandler.backToTopNode, "lotusHidden"));
					
					// Update the showing amount so that it's showing again
					this.group.pagingHandler.updateShowingAmount(this.group.pagingHandler.pagingAmount);
					
					doh.f(domClass.contains(this.group.pagingHandler.showMoreNode, "lotusHidden"));
					doh.t(domClass.contains(this.group.pagingHandler.backToTopNode, "lotusHidden"));
				}
			}
		],
		function setUpGroup(){
		
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
				}
			}
		
			this.pagingHandler = new PagingHandler({
				view: this.mockASView
			}, domConstruct.create("div"));
		},
		function tearDownGroup(){
			this.pagingHandler.destroy();
		}
	);
	return com.ibm.social.test.unit.as.paging.testPagingHandler;
});
