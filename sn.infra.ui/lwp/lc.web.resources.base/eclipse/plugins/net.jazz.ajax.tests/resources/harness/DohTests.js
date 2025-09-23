/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2005, 2012                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
(function() {
dojo.provide("net.jazz.ajax.tests.harness.DohTests");

dojo.require("doh.runner");
dojo.require("net.jazz.ajax.tests.ui.SimpleTestRunner");

dojo.declare("net.jazz.ajax.tests.harness.DohTests", [net.jazz.ajax.tests.ui.SimpleTestRunner], {
	postCreate: function() {
		this.inherited(arguments);
		this.registerTests();
		doh.run();
	},
	registerTests: function() {
		doh.register("net.jazz.ajax.tests.harness.DohTests", [
			{ 
				name: "DohRegister1",
				setUp: function(){
				},
				runTest: function(t){
					doh.t(true);
				}
			},
			{
				name: "DohRegister2",
				setUp: function(){
				},
				runTest: function(t){
					doh.is("test","test");
				}
			}
		]);
		doh.registerTest("net.jazz.ajax.tests.harness.DohTests", {
			name: "DohRegisterTest1",
			setUp: function () {
			},
			runTest: function(t) {
				doh.t(true);
			}
		});
		doh.registerTests("net.jazz.ajax.tests.harness.DohTests", [
			{
				name: "DohRegisterTests1",
				setUp: function () {
				},
				runTest: function(t) {
					doh.t(true);
				}
			},
			{
				name: "DohRegisterTests2",
				setUp: function () {
				},
				runTest: function(t) {
					doh.is("one","one");
				}
			}
		]);
	}
});
})();