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

dojo.provide("com.ibm.social.test.scripts.results.ResultCollector");

dojo.require("dojo.date.stamp");

window.lconnResults = {testsuites:{}, totalTests: 0, passedTests: 0};
window.lconnTestRegistered = function (groupName, fixture) {
   if (!lconnResults.testsuites[groupName]) {
      lconnResults.testsuites[groupName] = {
         errors: 0,
         failures: 0,
         testcases:{},
         tests: 0
      };
   }
   var group = lconnResults.testsuites[groupName];
   group.tests++;
   lconnResults.totalTests++;
   if (!group.testcases[fixture.name]) {
      group.testcases[fixture.name] = {
         failure: {}
      }
   }
};
window.lconnTestStarted = function(groupName, fixture) {
   if (!lconnResults.testsuites[groupName].timestamp )
      lconnResults.testsuites[groupName].timestamp = dojo.date.stamp.toISOString(new Date(), {milliseconds: true});
};
window.lconnHandleFailure = function(groupName, fixture, e){
	var out = "";   
	if(e instanceof doh._AssertFailure){
      lconnResults.testsuites[groupName].failures++;
      lconnResults.testsuites[groupName].testcases[fixture.name].failure.type = "failure";
		if(e["fileName"]){ out += e.fileName + ':'; }
		if(e["lineNumber"]){ out += e.lineNumber + ' '; }
		out += e+": "+e.message;
	}
	else {
      lconnResults.testsuites[groupName].errors++;
      lconnResults.testsuites[groupName].testcases[fixture.name].failure.type = "error";
		if(e["fileName"]){ out += e.fileName + ':'; }
		if(e["lineNumber"]){ out += e.lineNumber + ' '; }
      out += e + "\n";
	}
	if(fixture.runTest["toSource"]){
		var ss = fixture.runTest.toSource();
		out += "\nProblem generated in:\n\t" + ss;
	}else{
		out += "\nProblem generated in:\n\t" + fixture.runTest;
	}
   lconnResults.testsuites[groupName].testcases[fixture.name].failure.message = out;
};

window.lconnTestFinished = function(group, fixture, success) {
   if (!lconnResults.testsuites[group].testcases[fixture.name]) {
      lconnResults.testsuites[group].testcases[fixture.name] = {};
   }
   if (success)
     lconnResults.passedTests++;
   lconnResults.testsuites[group].testcases[fixture.name].success = success;
   lconnResults.testsuites[group].testcases[fixture.name].time = fixture.endTime - fixture.startTime;
};
window.lconnAllTestsFinished = function() {
      var params = {
         buildNumber: "buildNumber",
         component: "component",
         host: window.location.hostname,
         totalTests: lconnResults.totalTests,
         passedTests: lconnResults.passedTests
      };
      if (dojo.isIE) {
         params.browser = "Internet Explorer (" + dojo.isIE + ")";
      }
      else if (dojo.isFF) {
         params.browser = "Firefox (" + dojo.isFF + ")";
      }
      else if (dojo.isSafari) {
         var version = parseFloat(navigator.appVersion.split("Version/")[1]) || ((parseFloat(navigator.appVersion.substr(index + 7)) > 419.3) ? 3 : 2);
         params.browser = "Safari (" + version + ")";
      }
      else if (dojo.isOpera) {
         params.browser = "Opera (" + dojo.isOpera + ")";
      }
      else {
         params.browser = "Unknown Browser";
      }
      var report = "<html><head><style type='text/css'>table {border-color: #000;border-style: solid;border-width:0 0 1px 1px;border-spacing:0;border-collapse:collapse;} th, td{border-color: #000;border-style: solid;border-width:1px 1px 0 0;margin:0;padding:4px;}</style></head><body>";
         //Write header information
         report += "<h1><a name='topResults'>JavaScript UT - (" + params.buildNumber + ")</a></h1>";
         report += "<div>";
            report += "<span style='color:red; font-weight: bold'>IBM Confidential</span>";
         report += "</div>";
         //Write details for component/browser/buildNumber/etc.
         report += "<div style='margin-top: 5px;'>";
            report += "<span style='font-weight: bold;'>Details:</span>";
         report += "</div>";
         report += "<div style='margin-left: 20px'>";
            report += "<span style='font-weight: bold;'>Component:&nbsp;</span>" + params.component;
         report += "</div>";
         report += "<div style='margin-left: 20px'>";
            report += "<span style='font-weight: bold;'>Host:&nbsp;</span>" + params.host;
         report += "</div>";
         report += "<div style='margin-left: 20px'>";
            report += "<span style='font-weight: bold;'>Browser:&nbsp;</span>" + params.browser;
         report += "</div>";
         report += "<div style='margin-left: 20px'>";
            report += "<span style='font-weight: bold;'>Build number:&nbsp;</span>" + params.buildNumber;
         report += "</div>";
         report += "<div style='margin-left: 20px'>";
            report += "<span style='font-weight: bold;'>Tests passed:&nbsp;</span>" + params.passedTests + "/" + params.totalTests;
         report += "</div>";
         //Write out group test results
         report += "<table style='margin-top: 20px' cellspacing='0'>";
            report += "<thead>";
               report += "<th style='background-color: lightgrey;'>Group</th>";
               report += "<th style='background-color: lightgrey;'>Result (passed/total)</th>";
               report += "<th style='background-color: lightgrey;'>Timestamp</th>";
               report += "<th style='background-color: lightgrey;'>More Info</th>";
            report += "</thead>";
            report += "<tbody>";
            var groupHtml = [];
            var idInd = 0;
            for (var gn in lconnResults.testsuites) {
               report += "<tr>";
               var g = lconnResults.testsuites[gn];
               report += "<td>" + gn + "</td>";
               if (g.errors == 0 && g.failures == 0) {
                  report += "<td style='background-color:lime;'>PASSED (" + g.tests + "/" + g.tests + ")</td>";
               }
               else {
                  var passed = g.tests - (g.errors + g.failures);
                  report += "<td style='background-color:red;'>FAILED (" + passed + "/" + g.tests + ")</td>";
               }
               report += "<td>" + g.timestamp + "</td>";
               var gUnique = "testGroup_"+idInd;
               report += "<td><a href='#" + gUnique + "'>Details</a></td>";
               var gHtml = "<h3 style='margin-top: 50px;'><a name='" + gUnique + "'>" + gn + "</a><a href='#topResults' style='margin-left: 20px; font-size:0.7em;'>Back to top</a></h3>";
               gHtml += "<table cellspacing='0'>";
               gHtml += "<thead>";
                  gHtml += "<tr>";
                  gHtml += "<th style='background-color:lightgrey;'>Test</th>";
                  gHtml += "<th style='background-color:lightgrey;'>Result</th>";
                  gHtml += "<th style='background-color:lightgrey;'>Time (ms)</th>";
                  gHtml += "<th style='background-color:lightgrey;'>Log</th>";
                  gHtml += "</tr>";
               gHtml += "</thead>";
               gHtml += "<tbody>";
               for (var tn in g.testcases) {
                  gHtml += "<tr>";
                  var t = g.testcases[tn];
                  gHtml += "<td>" + tn + "</td>";
                  if (t.success) {
                     gHtml += "<td style='background-color: lime;'>PASSED</td>";
                     gHtml += "<td>" + t.time + "</td>";
                     gHtml += "<td>&nbsp;</td>";
                  }
                  else {
                     gHtml += "<td style='background-color: red;'>FAILED from " + (t.failure.type == "failure" ? "failed assertion" : "JavaScript error") + "</td>";
                     gHtml += "<td>" + t.time + "</td>";
                     var msg = t.failure.message;
                     msg = msg.replace(new RegExp("\\t", "g"), "&nbsp;&nbsp;&nbsp;&nbsp;").replace(new RegExp("\\n", "g"), "<br/>");
                     gHtml += "<td>" + msg + "</td>";
                  }
                  gHtml += "</tr>";
               }
               gHtml += "</tbody></table>";
               groupHtml.push(gHtml);
               idInd++;
               report += "</tr>";
            }
            report += "</tbody>";
         report += "</table>";
         for (var i = 0; i < groupHtml.length; i++)
            report += groupHtml[i];
      report += "</body></html>";
      
      // Wrapped in an object so as to not take up too much room in the console
      console.log("HTML Report: %o", {
    	  report: report
      });
      
      // Set the report to the JS var 'dohHtmlReport'. This will be picked up by the
      // selenium Java node and brought back to RTC.
      window.dohHtmlReport = report;
      
      // Did the tests pass or fail. If more than 50% did, we count that as a failure.
      // TODO: Using a high number here to begin with. Will adjust once stable.
      window.testsFailed = ((lconnResults.passedTests / lconnResults.totalTests) < 1.0);
};

dojo.connect(doh, "_report", window.lconnAllTestsFinished);
