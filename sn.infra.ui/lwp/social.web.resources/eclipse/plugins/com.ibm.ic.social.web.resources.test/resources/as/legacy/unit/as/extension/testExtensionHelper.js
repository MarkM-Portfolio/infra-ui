/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"ic-as/extension/ExtensionHelper",
	"ic-test/testUtil"
], function (ExtensionHelper, testUtil) {

	/**
	 * ExtensionHelper tests.
	 */
	
	testUtil.registerGroup("unit.as.extension.testExtensionHelper", [
			{
				name: "testQueueExtensions",
				description: "Testing the queueExtensions function",
				runTest: function(){
					// Test empty queue
					this.group.extHelper.queueExtensions(null, null);
					
					doh.is(this.group.extHelper.outgoingExtensions.length, 0);
					doh.is(this.group.extHelper.incomingExtensions.length, 0);
					
					// Test adding to the queue
					this.group.extHelper.queueExtensions({
						extensions: ["a", "b"]
					}, {
						extensions: ["b", "c"]
					});
					
					doh.is(this.group.extHelper.outgoingExtensions, ["a", "b"]);
					doh.is(this.group.extHelper.incomingExtensions, ["b", "c"]);
					
					// Add more
					this.group.extHelper.queueExtensions({
						extensions: ["b", "c"]
					}, {
						extensions: ["c", "d"]
					});
					
					doh.is(this.group.extHelper.outgoingExtensions, ["b", "c", "a", "b"]);
					doh.is(this.group.extHelper.incomingExtensions, ["c", "d", "b", "c"]);
				}
			},
			{
				name: "testRemoveExtensionDuplicates",
				description: "Testing the removeExtensionDuplicates function",
				runTest: function(){
					// Test with one element
					var arr = ["a"];
					arr = this.group.extHelper.removeExtensionDuplicates(arr);
					doh.is(arr, ["a"]);
		
					// Test with multiple duplicate elements
					arr = ["a", "a", "a", "b", "b", "a", "b", "c", "a"];
					arr = this.group.extHelper.removeExtensionDuplicates(arr);
					doh.is(arr, ["a", "b", "c"]);
					
					// Test with all duplicate elements
					arr = ["a", "a", "a", "a"];
					arr = this.group.extHelper.removeExtensionDuplicates(arr);
					doh.is(arr, ["a"]);
				}
			}
		],
		function setUp(){
			this.extHelper = new ExtensionHelper();
		},
		function tearDown(){},
		null,
		{
			tearDown: function(){
				this.group.extHelper.outgoingExtensions = [];
				this.group.extHelper.incomingExtensions = [];
			}
		}
	);
	return com.ibm.social.test.unit.as.extension.testExtensionHelper;
});
