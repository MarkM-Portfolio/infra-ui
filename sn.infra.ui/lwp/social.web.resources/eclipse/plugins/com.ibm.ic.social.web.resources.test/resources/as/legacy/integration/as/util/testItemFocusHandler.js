define([
	"dojo",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"ic-as/util/ItemFocusHandler",
	"ic-test/testUtil"
], function (dojo, windowModule, dom, domAttr, domConstruct, ItemFocusHandler, testUtil) {

	/*                                                                   */
	/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
	
	/**
	 * Item Focus Handler tests.
	 */
	
	// helper function for converting a css selector to DOM, like an inverse of dojo.query
	// only works with direct descendents using >, no spaces. classes and ids work too.
	var selector2DOM = function(selector, parent){
		var tags = selector.replace(/#/g, ">#").replace(/\./g, ">.").split(">"),
			tag;
		while(tag = tags.shift()) {
			if(tag[0]==="#"){domAttr.set(parent, "id", tag.substr(1)); continue;}
			if(tag[0]==="."){domAttr.set(parent, "class", tag.substr(1)); continue;}
			parent = domConstruct.create(tag,null, parent);
		}
		return parent;
	}
	
	// more useful than it looks...
	String.prototype.repeat = function( num )
	{
	    return new Array( num + 1 ).join( this );
	}
	
	testUtil.registerGroup("integration.as.util.testItemFocusHandler", [
			{	
				name: "testNewsItemLink",
				selectorString: "ul>li#testNewsItem.activityStreamNewsItemContainer>span>div>a#testNewsItemLink"
			},
			{
				name: "notNewsItemLink",
				selectorString: "span>div>span>a#notNewsItemLink"
			},
			{
				name: "maxDepthItem",
				selectorString: "ul>li#testNewsItem.activityStreamNewsItemContainer>" + "span>".repeat(9) + "a#maxDepthItem"
			},
			{
				name: "pastMaxDepthItem",
				selectorString: "ul>li#testNotNewsItem.activityStreamNewsItemContainer>" + "span>".repeat(10) + "a#pastMaxDepthItem"
			}
		],
		function setUpGroup(){},
		function tearDownGroup(){},
		null,
		{ // template
			nodeToTest: null,
			expectedNode: null,
			setUp: function(){
				this.itemFocusHandler = new ItemFocusHandler();
				this.testDiv = domConstruct.create("div", null, windowModule.body());
				this.nodeToTest = selector2DOM(this.selectorString, this.testDiv);
				this.expectedNode = dom.byId("testNewsItem");
			},
			runTest: function(){
				var containingNewsItem = this.itemFocusHandler._getParentNewsItem(this.nodeToTest);
				
				doh.is(this.expectedNode, containingNewsItem);
			},
			tearDown: function(){
				this.itemFocusHandler.destroy();
				domConstruct.destroy(this.testDiv);
			}
		}
	);
	
	
	testUtil.registerGroup("integration.as.util.testItemFocusHandlerAgain", 
		[
	         {	
	        	 name: "testSubUnsub",
	        	 description: "Test that all subscriptions are unsubscribed on destroy",
	        	 runTest: function(){
	        		 this.spyOn(dojo, "subscribe");
	        		 this.spyOn(dojo, "unsubscribe");
	        		 new ItemFocusHandler().destroy();
	        		 doh.is(dojo.subscribe.calls.length, dojo.unsubscribe.calls.length);
	        	 }
	         }
	    ]
	);
	
	
	
	return com.ibm.social.test.integration.as.util.testItemFocusHandler;
});
