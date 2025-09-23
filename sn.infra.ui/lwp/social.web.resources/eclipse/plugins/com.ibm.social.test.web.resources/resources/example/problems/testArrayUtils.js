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
 * Example Unit test.
 */

dojo.provide("com.ibm.social.test.example.problems.testArrayUtils");

dojo.require("com.ibm.social.test.testUtil");
dojo.require("com.ibm.social.test.example.problems.arrayUtils");

com.ibm.social.test.testUtil.registerGroup("example.problems.testArrayUtils",
	[
		{
			name: "testEmptyArray",
			description: "Testing an Empty Array",
			inputArray: [],
			expectedOutput: []
		},
		{
			name: "testSingleItem",
			description: "Testing a Single Item Array",
			inputArray: ["a"],
			expectedOutput: ["a"]
		},
		{
			name: "testOnlyDuplicates",
			description: "Testing an Array of duplicates",
			inputArray: ["a", "a", "a"],
			expectedOutput: ["a"]
		},
		{
			name: "testSortedDuplicates",
			description: "Testing an array of sorted duplicates",
			inputArray: ["a", "a", "a", "a", "b", "b", "c", "c", "c"],
			expectedOutput: ["a", "b", "c"]
		},
		{
			name: "testUnsortedDuplicates",
			description: "Testing an Array of unsorted duplicates",
			inputArray: ["a", "a", "b", "a", "b", "a", "c"],
			expectedOutput: ["a", "b", "c"]
		}
	],
	function setUpGroup(){},
	function tearDownGroup(){},
	null,
	{
		util: com.ibm.social.test.example.problems.arrayUtils,
		setUp: function(){
			// we don't test the isEqual method at the same time
			// use our own trivial one and only test with strings here.
			this.spyOn(this.util, "isEqual").andCallFake(function(val1, val2){
				return val1 == val2;
			});
		},
		runTest: function(){
			doh.is(this.expectedOutput, this.util.removeDuplicates(this.inputArray));
		}
	}
);