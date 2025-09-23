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
dojo.provide("net.jazz.ajax.tests.harness.RobotTests");

dojo.require("doh.runner");
dojo.require("dijit.robot");
dojo.require("net.jazz.ajax.tests.ui.SimpleTestRunner");

dojo.declare("net.jazz.ajax.tests.harness.RobotTests", [net.jazz.ajax.tests.ui.SimpleTestRunner], {
	postCreate: function() {
		this.inherited(arguments);
		this.registerTests();
		doh.run();
	},
	registerTests: function() {
		doh.register("net.jazz.ajax.tests.harness.RobotTests", 
			[
				{
					name: "PixelRobotTest",
					timeout: 5000,
					setUp: function() {
						var div = document.createElement("div");
						div.id = "DOH-Robot-div";
						div.style.position = "absolute";
						div.style.left = "25px";
						div.style.top = "27px";
						var input = document.createElement("input");
						input.type = "text";
						div.appendChild(input);
						document.body.appendChild(div);		
					},
					runTest: function () {
						var dfd = new doh.Deferred();
						doh.robot.mouseMove(30, 30, 500);
						doh.robot.mouseClick({left: true}, 500);
						doh.robot.typeKeys("DOH Robot Testing", 500);
						doh.robot.sequence(function (){
							if (dojo.byId("DOH-Robot-div").firstChild.value == "DOH Robot Testing") {
								dfd.callback(true);
							} else {
								dfd.errback("Expected value of \"DOH Robot Testing\" in input box");
							}
						}, 500);
						return dfd;
					}
				},
				{
					name: "DomRobotTest",
					timeout: 5000,
					setUp: function() {
						var div = document.createElement("div");
						div.id = "DOJO-Robot-div";
						div.style.position = "absolute";
						div.style.left = "25px";
						div.style.top = "77px";
						var input = document.createElement("input");
						input.type = "text";
						div.appendChild(input);
						document.body.appendChild(div);		
					},
					runTest: function () {
						var dfd = new doh.Deferred();
						doh.robot.mouseMoveAt(dojo.byId("DOJO-Robot-div"), 500);
						doh.robot.mouseClick({left: true}, 500);
						doh.robot.typeKeys("DOJO Robot Testing", 500);
						doh.robot.sequence(function (){
							if (dojo.byId("DOJO-Robot-div").firstChild.value == "DOJO Robot Testing") {
								dfd.callback(true);
							} else {
								dfd.errback("Expected value of \"DOJO Robot Testing\" in input box");
							}
						}, 500);
						return dfd;
					}
				},
				{
					name: "ScrollRobotTest",
					timeout: 5000,
					setUp: function() {
						var div = document.createElement("div");
						div.id = "DIJIT-Robot-div";
						div.style.position = "absolute";
						div.style.left = "2500px";
						div.style.top = "5000px";
						var input = document.createElement("input");
						input.type = "text";
						div.appendChild(input);
						document.body.appendChild(div);		
					},
					runTest: function () {
						var dfd = new doh.Deferred();
						doh.robot.mouseMoveAt(dojo.byId("DIJIT-Robot-div"), 500);
						doh.robot.mouseClick({left: true}, 500);
						doh.robot.typeKeys("DIJIT Robot Testing", 500);
						doh.robot.sequence(function (){
							if (dojo.byId("DIJIT-Robot-div").firstChild.value == "DIJIT Robot Testing") {
								dfd.callback(true);
							} else {
								dfd.errback("Expected value of \"DIJIT Robot Testing\" in input box");
							}
						}, 500);
						return dfd;
					}
				}
			]
		);
	}
});
})();