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
dojo.provide("net.jazz.ajax.tests.harness.RobotXTests");

dojo.require("dojo.robotx");
dojo.require("net.jazz.ajax.tests.ui.SimpleTestRunner");

dojo.declare("net.jazz.ajax.tests.harness.RobotXTests", [net.jazz.ajax.tests.ui.SimpleTestRunner], {
	postCreate: function () {
		this.inherited(arguments);
        doh.robot.initRobot(dojo.moduleUrl("net.jazz.ajax.tests","harness/testData/RobotXTests.html"));
		this.registerTests();
		doh.run();
	},
	registerTests: function () {
		doh.register("net.jazz.ajax.tests.harness.RobotXTests", [
			{
                name: "RobotXTest1",
                timeout: 5000,
                runTest: function () {
					var dfd = new doh.Deferred();
					doh.robot.mouseMoveAt(dojo.byId("valueOne"), 500);
					doh.robot.sequence(function (){
						if (dojo.byId("testInput").value == "One") {
							dfd.callback(true);
						} else {
							dfd.errback("Expected value of \"One\" in input box");
						}
					}, 500);
					return dfd;
                }
            },
			{
                name: "RobotXTest2",
                timeout: 5000,
                runTest: function () {
					var dfd = new doh.Deferred();
					doh.robot.mouseMoveAt(dojo.byId("valueTwo"), 500);
					doh.robot.sequence(function (){
						if (dojo.byId("testInput").value == "Two") {
							dfd.callback(true);
						} else {
							dfd.errback("Expected value of \"Two\" in input box");
						}
					}, 500);
					return dfd;
                }
            },
			{
                name: "RobotXTest3",
                timeout: 5000,
                runTest: function () {
					var dfd = new doh.Deferred();
					doh.robot.mouseMoveAt(dojo.byId("valueThree"), 500);
					doh.robot.sequence(function (){
						if (dojo.byId("testInput").value == "Three") {
							dfd.callback(true);
						} else {
							dfd.errback("Expected value of \"Three\" in input box");
						}
					}, 500);
					return dfd;
                }
            }
		]);
	}
});
})();