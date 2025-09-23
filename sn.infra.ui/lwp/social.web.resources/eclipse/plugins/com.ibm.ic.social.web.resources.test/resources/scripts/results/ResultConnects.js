/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/aspect"
], function (aspect) {

	// If we're running the tests using the runner.html
	//if(window.parent != window){
		aspect.after(doh, "_testRegistered", window.lconnTestRegistered, true);
		aspect.after(doh, "_testStarted", window.lconnTestStarted, true);
		aspect.after(doh, "_testFinished", window.lconnTestFinished, true);
		aspect.after(doh, "_handleFailure", window.lconnHandleFailure, true);
		//dojo.connect(doh, "_report", window.parent.lconnAllTestsFinished);
	//}
	
	return com.ibm.social.test.scripts.results.ResultConnects;
});
