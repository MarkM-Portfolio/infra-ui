/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/lang",
	"ic-test/example/problems/stringUtils",
	"ic-test/testUtil"
], function (lang, stringUtils, testUtil) {

	/**
	 * Example Unit test.
	 */
	
	testUtil.registerGroup("example.problems.testStringUtils",
		[
		 {
			 name: "EmptyString",
			 runTest: function(){
				 doh.is(0, this.testAdd(""));
			 }
		 },
		 {
			 name:"SingleNumber",
			 runTest: function(){
				 doh.is(7, this.testAdd("7"));
			 }
		 },
		 {
			 name:"addTwoNumbers",
			 runTest: function(){
				 doh.is(23, this.testAdd("13,10"));
			 }
		 },
		 {
			 name:"addManyNumbers",
			 runTest: function(){
				 doh.is(58, this.testAdd("13,10,24,3,8"));
			 }
		 },
		 {
			 name:"addNumbersWithNewLines",
			 runTest: function(){
				 doh.is(28, this.testAdd("13,10\n3,2"));
			 }
		 },
		 {
			 name:"addWithCustomDelimiter",
			 runTest: function(){
				 doh.is(7, this.testAdd("//;\n1;3;3"));
			 }
		 },
		 {
			 name:"errorNegativeNumber",
			 runTest: function(){
				 var errorString = "";
				 try {
					 output = this.testAdd("-3");
				 } catch(e) {
					 errorString = e.message;
				 }
				 doh.t(/-3/.exec(errorString));
			 }
		 },
		 {
			 name:"errorMultipleNegativeNumbers",
			 runTest: function(){
				 var errorString = "";
				 try {
					 output = this.testAdd("-3,4,-7");
				 } catch(e) {
					 errorString = e.message;
				 }
				 doh.t(/-3/.exec(errorString));
				 doh.t(/-7/.exec(errorString));
			 }
		 },
		 {
			 name:"ignoreBigNumbers",
			 runTest: function(){
				 doh.is(7, this.testAdd("4,1001,3"));
			 }
		 },
		 {
			 name: "longCustomDelimiters",
			 runTest: function(){
				 doh.is(9, this.testAdd("//[***]\n1***3***5"));
			 }
		 },
		 {
			 name: "multipleCustomDelimiters",
			 runTest: function(){
				 doh.is(9, this.testAdd("//[***][fooo]\n1***3fooo5"));
			 }
		 }
		],
		function setUpGroup(){},
		function tearDownGroup(){},
		null,
		{
			testAdd: lang.hitch(stringUtils, stringUtils.add)
		}
	);
	return com.ibm.social.test.example.problems.testStringUtils;
});
