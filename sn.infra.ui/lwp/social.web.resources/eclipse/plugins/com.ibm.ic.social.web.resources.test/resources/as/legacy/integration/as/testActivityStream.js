/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/topic",
	"dijit/registry",
	"ic-as/util/hashtag/HashtagUtil",
	"ic-as/ActivityStream",
	"ic-as/config/ConfigManager",
	"ic-core/util/LCDeferred",
	"ic-test/integration/as/config/homepage/config",
	"ic-test/integration/as/mockXhrResponses/newSUPosted",
	"ic-test/integration/as/mockXhrResponses/updatesBefore",
	"ic-test/integration/as/testfeeds/StatusUpdateFeed",
	"ic-test/testUtil"
], function (dojo, windowModule, domConstruct, query, topic, registry, HashtagUtil, ActivityStream, ConfigManager, LCDeferred, config, newSUPosted, updatesBefore, StatusUpdateFeed, testUtil) {

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
	
	//Number of news items in the feed
	function numNewsItems(node){
		return query("> li .lotusPost", node).length;
	}
	
	// Register tests for Activity Stream
	testUtil.registerGroup("integration.as.testActivityStream", [
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
					
					topic.publish(com.ibm.social.as.constants.events.STATUSUPDATEPOST, newSUPosted);
					
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
					
					this.fakeXhrWith(updatesBefore);
					
					topic.publish(com.ibm.social.as.constants.events.PAGECHANGE, "updatedBefore", "2013-03-14T17:26:48.448Z");
					
					// check that the stream is immediately updated
					doh.is(3, numNewsItems(this.group.activityStreamView.newsFeedNode));
				}
			}
		],
		function setUpGroup(){
			// avoid any annoying async stuff...
			this.spyOn(dojo, "xhr");
	
			com.ibm.social.as.configManager = new ConfigManager({configObject: window.activityStreamConfig});
			
			this.as = new ActivityStream({
				configObject: window.activityStreamConfig,
				domNode: domConstruct.create("div", {"id":"activityStreamtestAS"}, windowModule.body()),
				selectedState: true,
				isGadget: false
			});
			
			// Get the widget instance
			this.activityStreamView = registry.byId("activityStreamtestAS");
	
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
				this.feed = new StatusUpdateFeed().content;
				this.fakeXhrWith(this.feed);
				topic.publish(com.ibm.social.as.constants.events.UPDATESTATE, {});
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
							var df = new LCDeferred();
							df.resolve(xhrResponse);
							options.load(xhrResponse);
							return df;
						});
			}
		}
	);
	return com.ibm.social.test.integration.as.testActivityStream;
});
