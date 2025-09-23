/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"ic-test/testUtil"
], function (testUtil) {

	/**
	 * Example Class tests.
	 */
	
	// NOTE: require any classes your test needs here.
	// NOTE: You *can* do setup here such as defining standalone helper functions etc.
	//       However, try to keep *most* setup inside the setUpGroup function.
	//       This way any errors will be caught and correctly marked as test failures
	//       by DOH. If an error is thrown here, the whole testSuite will halt.
	
	// NOTE: Register your DOH tests here. It is *essential* that this string matches with
	//       the one in dojo.provide, without the com.ibm.social.test prefix.
	testUtil.registerGroup("example.testExampleClass",
		[
			{
				name: "testExampleFunction",
				description: "Testing the example function",
				// NOTE: All your setup code goes here
				setUp: function(){
				},
				// NOTE: Run your tests in here
				runTest: function(){
				}
			}
		],
		function setUpGroup(){
			// perform setup for entire group of tests.
			// objects attached to this here can be accessed through
			// this.group inside individual tests
		},
		function tearDownGroup(){
			
		},
		null, // set to "perf" for performance tests
		// template for all tests
		{
			testObj: null,
			tearDown: function(){
				// perform tear down common to all tests
			}
		}
	);
	return com.ibm.social.test.example.testExampleClass;
});
