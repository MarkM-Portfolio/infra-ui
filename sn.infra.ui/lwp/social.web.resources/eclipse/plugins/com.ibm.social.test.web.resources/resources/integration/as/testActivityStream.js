/* ***************************************************************** */
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
 * Activity Stream dijit Integration tests.
 * All the tests below were created by monitoring dojo.publish and xhr calls in connections.
 * If they break - do not try to debug directly before :
 * 		* checking lower level unit tests
 * 		* checking the behaviour in connections itself
 * 		* re-syncing mock data with connections. e.g., post an SU and copy the xhr resp into mockXhrResponses.newSUPosted
 * If you've tried all that and it's still broken, hunt around for 
 * timeouts and other async actions (attempted to disable them for the tests but others may be lurking...).
 * Still stuck? Consider deleting the test. Seriously. If the test breakage does not relate to any breakage in the product
 * and it takes a lot of effort to fix it (you've tried all the above, right?), then it sounds like the costs are out-weighing
 * the benefits here.
 */

dojo.provide("com.ibm.social.test.integration.as.testActivityStream");

dojo.require("com.ibm.social.test.integration.as.config.homepage.config");
dojo.require("com.ibm.social.test.integration.as.testfeeds.StatusUpdateFeed");
dojo.require("com.ibm.social.test.integration.as.mockXhrResponses.newSUPosted");
dojo.require("com.ibm.social.test.integration.as.mockXhrResponses.updatesBefore");
dojo.require("com.ibm.social.test.testUtil");
dojo.require("lconn.core.util.LCDeferred");

dojo.require("com.ibm.social.as.ActivityStream");
dojo.require("com.ibm.social.as.util.hashtag.HashtagUtil");

//Number of news items in the feed
function numNewsItems(node){
	return dojo.query("> li .lotusPost", node).length;
}

// Register tests for Activity Stream
com.ibm.social.test.testUtil.registerGroup("integration.as.testActivityStream", [
		{
			name: "testStreamRefresh",
			description: "check if the AS has any items after a refresh",
			runTest: function(){
				// test we have the single item from our testfeed
				doh.is(1, numNewsItems(this.group.activityStreamView.newsFeedNode));
			}
		},
		{
			name: "testAddItemFromInputForm",
			description: "check if the AS can add any items",
			runTest: function(){
				// test we have the single item from our testfeed
				doh.is(1, numNewsItems(this.group.activityStreamView.newsFeedNode));
				
				dojo.publish(com.ibm.social.as.constants.events.STATUSUPDATEPOST, [com.ibm.social.test.integration.as.mockXhrResponses.newSUPosted]);
				
				// check that the stream is immediately updated
				doh.is(2, numNewsItems(this.group.activityStreamView.newsFeedNode));
			}
		},
		{
			name: "testAddOlderUpdates",
			description: "check if the AS can add items when 'show more' is clicked",
			runTest: function(){
				// test we have the single item from our initial testfeed
				doh.is(1, numNewsItems(this.group.activityStreamView.newsFeedNode));
				
				this.fakeXhrWith(com.ibm.social.test.integration.as.mockXhrResponses.updatesBefore);
				
				dojo.publish(com.ibm.social.as.constants.events.PAGECHANGE, ["updatedBefore", "2013-03-14T17:26:48.448Z"]);
				
				// check that the stream is immediately updated
				doh.is(3, numNewsItems(this.group.activityStreamView.newsFeedNode));
			}
		}
	],
	function setUpGroup(){
		// avoid any annoying async stuff...
		this.spyOn(dojo, "xhr");

		com.ibm.social.as.configManager = new com.ibm.social.as.config.ConfigManager({configObject: window.activityStreamConfig});
		
		this.as = new com.ibm.social.as.ActivityStream({
			configObject: window.activityStreamConfig,
			domNode: dojo.create("div", {"id":"activityStreamtestAS"}, dojo.body()),
			selectedState: true,
			isGadget: false
		});
		
		// Get the widget instance
		this.activityStreamView = dijit.byId("activityStreamtestAS");

		// avoid any annoying async stuff...
		this.spyOn(this.activityStreamView.controller, "makeTimeoutRequest").andCallFake(
				function(url, timeout, clickEvent){
					this.dynamicUpdateInProgress = true;
					this.fetchFeed(url, true, false, true, clickEvent);
				}
		);
	},
	function tearDownGroup(){
		this.activityStreamView.destroyRecursive();
		this.as.destroy();
	},
	null,
	{
		setUp: function(){
			this.feed = new com.ibm.social.test.integration.as.testfeeds.StatusUpdateFeed().content;
			this.fakeXhrWith(this.feed);
			dojo.publish(com.ibm.social.as.constants.events.UPDATESTATE, [{}]);
		},
		tearDown: function(){
			this.group.activityStreamView.destroyNewsFeed();
		},
		fakeXhrWith: function(xhrResponse){
			if(!dojo.xhr.andCallFake) {
				this.spyOn(dojo, "xhr");
			}
			dojo.xhr.andCallFake(
				function(method, options){
						var df = new lconn.core.util.LCDeferred();
						df.resolve(xhrResponse);
						options.load(xhrResponse);
						return df;
					});
		}
	}
);