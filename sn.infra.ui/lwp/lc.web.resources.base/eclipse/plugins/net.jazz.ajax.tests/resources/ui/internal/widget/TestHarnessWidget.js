/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2012                                    */
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
dojo.provide("net.jazz.ajax.tests.ui.internal.widget.TestHarnessWidget");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("doh.runner");

var WIDGET_ID = "net.jazz.ajax.tests.ui.internal.widget.TestHarnessWidget";

doh_testRegistered = doh._testRegistered;
doh._testRegistered = function(group, fixture) {
    var testHarness = dijit.byId(WIDGET_ID);
    testHarness.appendOutput("testRegistered ["+fixture.name+"] ["+group+"]");
    doh_testRegistered.apply(doh, arguments);
    testHarness.registerTest(fixture.name, group);
}

doh_groupStarted = doh._groupStarted;
doh._groupStarted = function(group) {
    var testHarness = dijit.byId(WIDGET_ID);
    testHarness.appendOutput("groupStarted ["+group+"]");
    testHarness.groupStarted(group);
    doh_groupStarted.apply(doh, arguments);
}

doh_groupFinished = doh._groupFinished;
doh._groupFinished = function(group, success) {
    var testHarness = dijit.byId(WIDGET_ID);
    testHarness.appendOutput("groupFinished ["+group+"] ["+success+"]");
    testHarness.groupFinished(group, success);
    doh_groupFinished.apply(doh, arguments);
}

doh_testStarted = doh._testStarted;
doh._testStarted = function(group, fixture) {
    var testHarness = dijit.byId(WIDGET_ID);
    testHarness.testStarted(fixture.name, group);
    testHarness.appendOutput("testStarted ["+fixture.name+"] ["+group+"]");
    doh_testStarted.apply(doh, arguments);
}

doh_testFinished = doh._testFinished;
doh._testFinished = function(group, fixture, success) {
    var testHarness = dijit.byId(WIDGET_ID);
    testHarness.appendOutput("testFinished ["+fixture.name+"] ["+group+"] ["+success+"]");
    doh_testFinished.apply(doh, arguments);
    testHarness.testFinished(fixture.name, group, success);
}

doh.debug = function() {
    var msg = "";
    for(var x=0; x<arguments.length; x++){
        msg += " "+arguments[x];
    }
    var testHarness = dijit.byId(WIDGET_ID);
    testHarness.appendOutput(msg);
    testHarness.recordDebug(msg);
}

dojo.declare("net.jazz.ajax.tests.ui.internal.widget.TestHarnessWidget", [dijit._Widget, dijit._Templated], {

    templatePath: dojo.moduleUrl("net.jazz.ajax.tests", "ui/internal/widget/templates/TestHarnessWidget.html"),
	
	constructor: function(args) {
		args.id = WIDGET_ID;
		this.registeredCount = 0;
		this.executedCount = 0;
		this.passingCount = 0;
		this.failingCount = 0;
		this._groupsFinished = {};
		this.testRunnerSrc = args.testRunnerSrc;
	},

    postCreate: function() {
		var testModule = null;
        var qstr = window.location.search.substr(1);
        if (qstr.length) {
            var qparts = qstr.split("&");
            for (var x=0; x<qparts.length; x++) {
                var tp = qparts[x].split("=");
                if (tp[0] == "testModule") {
                    testModule = tp[1];
                }
				if (tp[0] == "key") {
					this.key = tp[1];
				}
				if (tp[0] == "numTesters") {
					this.numTesters = tp[1];
				}
				if (tp[0] == "debug") {
					this.debug = tp[1] == "true" ? true : false;
				}
            }
        }
        if (testModule) {
			if (this.debug) {
				this.frameNode.src = this.testRunnerSrc + "?debug=true";
			} else {
				this.frameNode.src = this.testRunnerSrc;
			}
        }
        else {
            this.appendOutput("No testModule specified");
        }
		
		dojo.connect(this.testPageTab, "onclick", dojo.hitch(this, function (e) {
			this.showTestPage();
		}));
		dojo.connect(this.logTab, "onclick", dojo.hitch(this, function (e) {
			this.showLogPage();
		}));
		this.showTestPage();
		dojo.connect(this, "groupFinished", dojo.hitch(this, function () {
			setTimeout(dojo.hitch(this, function() {
				this.showLogPage();
			}), 2000);
		}));
    },
	
	showTestPage: function () {
		dojo.toggleClass(this.frameNode, "hidden", false);
		dojo.toggleClass(this.logNode, "hidden", true);
		dojo.toggleClass(this.testPageTab, "active", true);
		dojo.toggleClass(this.logTab, "active", false);	
	},
	
	showLogPage: function () {
		dojo.toggleClass(this.frameNode, "hidden", true);
		dojo.toggleClass(this.logNode, "hidden", false);
		dojo.toggleClass(this.testPageTab, "active", false);
		dojo.toggleClass(this.logTab, "active", true);	
	},

    clearOutput: function() {
        while (this.logNode.firstChild) {
            this.logNode.removeChild(this.logNode.firstChild);
        }
    },

    appendOutput: function(output) {
        this.logNode.appendChild(document.createTextNode(output));
        this.logNode.appendChild(document.createElement("br"));
    },

    registerTest: function(id, group) {
		this.registeredSpan.innerHTML = ++this.registeredCount;
		var tr = document.createElement("tr");
		tr.id = "_testRow-" + id;
		var tdName = document.createElement("td");
		tdName.appendChild(document.createTextNode(id));
		tr.nameCell = tdName;
		tr.appendChild(tdName);
		var tdTime = document.createElement("td");
		tr.timeCell = tdTime;
		tr.appendChild(tdTime);
		this.testResultTable.appendChild(tr);
		if (this.key) {
			this.testResult("_testResults/registerTest/"+id+"?group="+group+"&key="+this.key);
		}
    },

    groupStarted: function(group) {
		if (this.key && this.numTesters) {
			this.testResult("_testResults/groupStart/"+group+"?key="+this.key+"&numTesters="+this.numTesters);
		}
    },

    groupFinished: function(group, success) {
		if (this.key) {
			this.testResult("_testResults/groupFinish/"+group+"?success="+(success ? true : false)+"&key="+this.key);
		}
    },

    testStarted: function(id, group) {
        this.currentTestId = id;
		dojo.byId("_testRow-" + id).timeCell.startTime = new Date();
		if (this.key) {
			this.testResult("_testResults/testStart/"+id+"?group="+group+"&key="+this.key);
		}
    },

    testFinished: function(id, group, success) {
		this.executedSpan.innerHTML = ++this.executedCount;
		var testRow = dojo.byId("_testRow-" + id)
		if (success) {
			this.passingSpan.innerHTML = ++this.passingCount;
			dojo.toggleClass(testRow, "pass", true);
			dojo.toggleClass(testRow, "fail", false);
		} else {
			this.failingSpan.innerHTML = ++this.failingCount;
			dojo.toggleClass(testRow, "fail", true);
			dojo.toggleClass(testRow, "pass", false);
		}
		testRow.timeCell.finishTime = new Date();
		testRow.timeCell.innerHTML = (testRow.timeCell.finishTime - testRow.timeCell.startTime) / 1000 + " s";		
		
        this.currentTestId = null;
		if (this.key) {
			this.testResult("_testResults/testFinish/"+id+"?group="+group+"&success="+(success ? true : false)+"&key="+this.key);
		}
    },

    testResult: function(url) {
        var headers = {};
        headers["accept"] = "text/json";
        headers["content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
        var bindArgs = {
            url: dojo.baseUrl + "../../" + url,
            handleAs: "json",
            headers: headers,
            preventCache: dojo.isIE,
            handle: function(response, ioArgs) {
                if (response instanceof Error) {
                    alert("["+ioArgs.xhr.status + "] " + ioArgs.xhr.statusText);
                }
                else {
                }
            }
        };
        var xhr = dojo.xhrPut(bindArgs);
    },

    recordDebug: function(msg) {
        if (this.currentTestId != null) {
            var headers = {};
            headers["accept"] = "text/json";
            headers["content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
            var postData = {};
            postData["msg"] = msg;
            var bindArgs = {
                url: dojo.baseUrl + "../../_testResults/debug/" + this.currentTestId,
                postData: dojo.objectToQuery(postData),
                handleAs: "json",
                headers: headers,
                preventCache: dojo.isIE,
                handle: function(response, ioArgs) {
                    if (response instanceof Error) {
                        alert("["+ioArgs.xhr.status + "] " + ioArgs.xhr.statusText);
                    }
                    else {
                    }
                }
            };
            var xhr = dojo.rawXhrPost(bindArgs);
        }
    }
});

})();

