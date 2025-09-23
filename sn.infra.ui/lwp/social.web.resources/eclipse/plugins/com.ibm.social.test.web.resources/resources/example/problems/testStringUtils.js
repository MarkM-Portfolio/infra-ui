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

dojo.provide("com.ibm.social.test.example.problems.testStringUtils");

dojo.require("com.ibm.social.test.testUtil");
dojo.require("com.ibm.social.test.example.problems.stringUtils");

com.ibm.social.test.testUtil.registerGroup("example.problems.testStringUtils",
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
		testAdd: dojo.hitch(com.ibm.social.test.example.problems.stringUtils, com.ibm.social.test.example.problems.stringUtils.add)
	}
);