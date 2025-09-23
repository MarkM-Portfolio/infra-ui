/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2012, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.scripts.results.ResultConnects");

// If we're running the tests using the runner.html
//if(window.parent != window){
	dojo.connect(doh, "_testRegistered", window.lconnTestRegistered);
	dojo.connect(doh, "_testStarted", window.lconnTestStarted);
	dojo.connect(doh, "_testFinished", window.lconnTestFinished);
	dojo.connect(doh, "_handleFailure", window.lconnHandleFailure);
	//dojo.connect(doh, "_report", window.parent.lconnAllTestsFinished);
//}
