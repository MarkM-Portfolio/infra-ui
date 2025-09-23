/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

/*
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

dojo.provide("com.ibm.lconn.gadget.test.registry.ee._EEGadgetMapperTests");

dojo.require("doh.runner");
dojo.require("com.ibm.lconn.gadget.registry.ee.iEEGadgetRegistry");
//dojo.require("com.ibm.lconn.gadget.registry.ee._EEGadgetMapper");

(function(){	
	var baseEEUrl = "http://server.com/connections/ee/";

	var makeEEUrl = function(service, objectType) {
		return baseEEUrl + "/" + service + "/" + objectType + "/gadget.xml";
	};
	
	var testDefs = [
			   {
				   	config: {},
				   	result: 0
			   },
			   {
				   	config: {gadget:'1.xml'},
				   	result: 1
			   },
			   {
				   	config: {
				   		gadget:'1.xml',
				   		services: {
				   			"files" : {
				   				gadget: "2.xml",
				   				objectTypes: {
				   					"foo": {gadget: "2.xml"},
				   					"bar": {gadget: "3.xml"}
				   				}
				   			},
				   			"profiles" : {
				   				objectTypes: {
				   					"foo": {gadget: "2.xml"},
				   					"bar": {gadget: "4.xml"}
				   				}
				   			}
				   		}
				   	},
				   	result: 4
			   }
		   ];
	
	var testResolve = 
	  {
		  config: testDefs[2],
		  tests: [
		      [ makeEEUrl("files", "foo"), 2 ],
		      [ makeEEUrl("files", "bar"), 3 ],
		      [ makeEEUrl("files", "barf"), 2 ],
		      [ makeEEUrl("activities", "foo"), 1 ],
		      [ makeEEUrl("profiles", "foo"), 2 ],
		      [ makeEEUrl("profiles", "bar"), 4 ],
		      [ makeEEUrl("profiles", "foob"), 1 ]
		  ]
	  };

	
	
	doh.register("com.ibm.lconn.gadget.test.registry.ee._EEGadgetMapperTests", [
	    /*
	     * Test find all registered gadget defs
	     */                                                  
		function test_gadget_defs_extraction() {
			dojo.forEach(testDefs, function(testDef) {
				var mapping = new com.ibm.lconn.gadget.registry.ee._EEGadgetMapper(baseEEUrl, testDef);
				var result = [];
				
				dojo.forEach(mapping.gadgetDefs, function(mapping) {
					var num = new Number(mapping.substr(0, mapping.indexOf('.')));
					result.push(num);
				});
			});
		}, 
		
		/*
		 * Test match service/objectType query to correct handler
		 */
		function test_preload_resolution() {
			var mapping = new com.ibm.lconn.gadget.registry.ee._EEGadgetMapper(baseEEUrl, testResolve.config);
			
			dojo.forEach(testResolve.tests, function(test) {
				var url = test[0],
					expectUrl = test[1] + ".xml";
				
				var spec = mapping.getGadgetSpec(url);
				
				console.log("Test: " + url + " / " + expectUrl);
				doh.is(expectUrl, spec.preloadedGadgetUrl);
			});			
		},
		
		/*
		 * ensure patter matcher matches URLs
		 */
		function test_ee_pattern_matcher() {
			var success = [
					makeEEUrl("profiles", "bar"),
					makeEEUrl("files", "foo"),
					makeEEUrl("blogs", "foobar"),
			];
			
			var fail = [
			       "http://fail.com/profiles/bar/gadget.xml",
			       ""
			];
			
			var matcher = new com.ibm.lconn.gadget.registry.ee._EEGadgetMapper(baseEEUrl, testResolve.config)._eeUrlMatcher;
			
			dojo.forEach(success, function(test) {
				doh.t(matcher.test(test));
			});
			
			dojo.forEach(fail, function(test) {
				doh.f(matcher.test(test));
			});
			
			var vals = matcher.exec(makeEEUrl("profiles", "bar"));
			doh.is(3, vals.length);
			doh.is("profiles", vals[1]);
			doh.is("bar", vals[2]);
		}
	]);
	
})();
