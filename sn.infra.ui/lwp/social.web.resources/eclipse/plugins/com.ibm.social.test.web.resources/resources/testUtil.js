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
 * Util for writing better tests
 */

dojo.provide("com.ibm.social.test.testUtil");

var util = dojo.getObject("com.ibm.social.test.testUtil");

util.registerGroup = function(/*String*/ group, 
		/*Array||Function||Object*/ tests, 
		/*Function*/ setUp, 
		/*Function*/ tearDown,
		/*String*/ type,
		/*Object*/ testTemplate){
	// summary:
	//		shadow for doh.registerGroup providing additional functionality
	//		including test templates and spies
	// group:
	//		string name of the group
	// tests:
	//		either a function or an object or an array of functions/objects. If
	//		an object, it must contain at *least* a "runTest" method, and may
	//		also contain "setUp" and "tearDown" methods. These will be invoked
	//		on either side of the "runTest" method (respectively) when the test
	//		is run. If an array, it must contain objects matching the above
	//		description or test functions.
	// setUp: a function for initializing the test group
	// tearDown: a function for initializing the test group
	// type: The type of tests these are, such as a group of performance tests
	//		null/undefied are standard DOH tests, the valye 'perf' enables 
	//		registering them as performance tests.
	// testTemplate: a template object for the test provided in tests.
	//		If provided, all test objects are mixed into (a clone of) this object 
	//		before execution, with the tests' funcs overriding the template.
	//		setUp and tearDown can be overridden, like any other template property,
	//		if you want a setUp to run before every test in *addition* to any 
	//		test specific setUp, use a prop name of "alwaysSetUp" or "alwaysTearDown"
	testTemplate = dojo.mixin(testTemplate || {}, util.spyTemplate)
	// simpler to add empty ones than test for existence later.
	testTemplate.alwaysSetUp = testTemplate.alwaysSetUp || function(){};
	testTemplate.alwaysTearDown = testTemplate.alwaysTearDown || function(){};
	// make sure we have a tests array, not a function or object
	tests = [].concat(tests);
	tests = dojo.map(tests, function(test, ind, arr){
		if(typeof test === "function") {
			test = {"runTest":test, "name":group + ind};
		}
		
		// mixin to an empty object so we never alter our template.
		test =  dojo.mixin({}, testTemplate, test);
		
		// no need to disconnect because there's no DOM involved
		dojo.connect(test, "setUp", test, "alwaysSetUp");
		dojo.connect(test, "tearDown", test, "alwaysTearDown");
		
		return test;
	});
	// give the group methods (setUp and tearDown) access to the util methods.
	var customSetup = function(){
		dojo.mixin(this, util.spyTemplate);
		if(setUp){setUp.apply(this, arguments);}
	};
	customSetup = this.wrapInDoh(customSetup);
	tearDown = this.wrapInDoh(tearDown);
	doh.registerGroup(group, tests, customSetup, tearDown, type);
}

util.wrapInDoh = function(func, optContext){
	func = func || function(){};
	return function(){
		try {
			func.apply(optContext || this, arguments);
		} catch(e) {
			doh.debug(e);
		}
	}
}

util.spyTemplate = {
	spyOn :  function(/*Object*/ obj,
			/*String*/ funcName){
		// summary:
		//		replaces the given method with a stub which can then be inspected
		//		using obj[funcName].calls or .calledWith(args).
		//		Invoke obj[funcName].andCallThrough() to have the original function
		//		called as well, obj[funcName].andCallFake(func) to call your own
		//		function.
		//		The object is returned to its original state in the tearDown method,
		//		either of the group or test, depending where it was invoked.
		// obj:
		//		The object containing the method you wish to spy on.
		// funcName:
		//		The name of the method you wish to spy on.
		// returns the spy (also available now via obj[funcName]) for convenience.
		var savedFunc = obj[funcName],
			savedArgs = [], callThrough = false;
		
		this.tearDown = this.tearDown || function(){};
		dojo.connect(this, "tearDown", null, function(){
			obj[funcName] = savedFunc;
		});
		
		obj[funcName] = function(){
			savedArgs.push(Array.prototype.slice.call(arguments, 0));
			if(callThrough) {
				return callThrough.apply(this, arguments);
			}
		};
		obj[funcName].calls = savedArgs;
		
		obj[funcName].calledWith = function(){
			/*
			 * Possibly refactor this later to use doh.is for comparisons...
			 * NOTE : only tests args given, only works with simple (non obj, non array) args
			 * if the spy was invoked with spy(1,2,3)
			 * spy.calledWith(1,2) will return true. 
			 * For more control use doh.is(spy.calls[index], [1, 2])*/
			var testArgs = Array.prototype.slice.call(arguments, 0);
			return dojo.some(savedArgs, function(args){
				return dojo.every(testArgs, function(testArg, ind){
					return testArg === args[ind];
				});
			});
		};
		
		obj[funcName].andCallThrough = function(){
			callThrough = savedFunc;
		};
		
		obj[funcName].andCallFake = function(func){
			callThrough = func;
		};
		
		obj[funcName].andReturn = function(something){
			callThrough = function(){return something;};
		};
		
		// return spy for convenience
		return obj[funcName];
	},
	subscribe: function(topic, func){
		var subscription = dojo.subscribe(topic, func);
		this.connect(this, "tearDown", null, function(){dojo.unsubscribe(subscription);});
		return subscription;
	},
	connect: function(){
		var connections = [];
		
		this.connect = function(){
			return connections.push(dojo.connect.apply(dojo, arguments));
		};
		this.connect(this, "tearDown", null, function(){
			var connection;
			while(connection = connections.pop()){
				dojo.disconnect(connection);
			}
		});
		
		return this.connect.apply(this, arguments);
	}
}

// unimplemented, add if needed later.
util.mock = function(){
	
}