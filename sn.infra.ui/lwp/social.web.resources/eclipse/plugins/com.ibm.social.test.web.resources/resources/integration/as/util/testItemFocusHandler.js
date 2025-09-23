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
 * Item Focus Handler tests.
 */

dojo.provide("com.ibm.social.test.integration.as.util.testItemFocusHandler");



dojo.require("com.ibm.social.as.util.ItemFocusHandler");

dojo.require("com.ibm.social.test.testUtil");

// helper function for converting a css selector to DOM, like an inverse of dojo.query
// only works with direct descendents using >, no spaces. classes and ids work too.
var selector2DOM = function(selector, parent){
	var tags = selector.replace(/#/g, ">#").replace(/\./g, ">.").split(">"),
		tag;
	while(tag = tags.shift()) {
		if(tag[0]==="#"){dojo.attr(parent, "id", tag.substr(1)); continue;}
		if(tag[0]==="."){dojo.attr(parent, "class", tag.substr(1)); continue;}
		parent = dojo.create(tag,null, parent);
	}
	return parent;
}

// more useful than it looks...
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}

com.ibm.social.test.testUtil.registerGroup("integration.as.util.testItemFocusHandler", [
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
			this.itemFocusHandler = new com.ibm.social.as.util.ItemFocusHandler();
			this.testDiv = dojo.create("div", null, dojo.body());
			this.nodeToTest = selector2DOM(this.selectorString, this.testDiv);
			this.expectedNode = dojo.byId("testNewsItem");
		},
		runTest: function(){
			var containingNewsItem = this.itemFocusHandler._getParentNewsItem(this.nodeToTest);
			
			doh.is(this.expectedNode, containingNewsItem);
		},
		tearDown: function(){
			this.itemFocusHandler.destroy();
			dojo.destroy(this.testDiv);
		}
	}
);


com.ibm.social.test.testUtil.registerGroup("integration.as.util.testItemFocusHandlerAgain", 
	[
         {	
        	 name: "testSubUnsub",
        	 description: "Test that all subscriptions are unsubscribed on destroy",
        	 runTest: function(){
        		 this.spyOn(dojo, "subscribe");
        		 this.spyOn(dojo, "unsubscribe");
        		 new com.ibm.social.as.util.ItemFocusHandler().destroy();
        		 doh.is(dojo.subscribe.calls.length, dojo.unsubscribe.calls.length);
        	 }
         }
    ]
);


