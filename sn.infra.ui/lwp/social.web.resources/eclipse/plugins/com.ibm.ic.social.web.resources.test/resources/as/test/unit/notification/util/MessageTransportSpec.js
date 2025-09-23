/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-as/notification/util/MessageTransport","dojo/topic", "ic-as/notification/util/keys"
], function(MessageTransport, topic, keys) {
		
		
	var testObj;
	describe("the ic-as/notification/util/MessageTransport class", function() {
		beforeEach(function() {
			testObj = new MessageTransport(keys.IFRAME_MODE);	
		});
		
		it("implements the expected methods", function() {
			expect(testObj.sendMessage).toEqual(jasmine.any(Function));
				
		});
		
		it("implements the sendmessage function calling window postmessage", function() {
			spyOn(window.parent, "postMessage")
			testObj.sendMessage("key","message");			
			expect(window.parent.postMessage).toHaveBeenCalledWith("key|message", "*");
		});
		
		it("implements the sendmessage function calling window postmessage", function() {
			spyOn(topic, "publish");
			testObj.sendMessage("key","message");			
			expect(topic.publish).toHaveBeenCalledWith("key","message");
		});
		
		it("can construct a correct parameter for window postmessage", function() {
			var retVal = testObj.constructWindowMessage("com/ibm/social/key","test message");			
			expect(retVal).toEqual("com/ibm/social/key|test message");
		});
		
		
	});

});
