/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.util.promisesTests");

dojo.require("doh.runner");
dojo.require("lconn.core.util.promises");
dojo.require("lconn.core.util.LCDeferred");

(function(doh, promises, DeferredCls) {
	var LCPromiseCls = promises.iFaceClass;	
	
	doh.register("lconn.test.util.promisesTests", [
	   {
		   name: 'test_isPromiseLike_function_explicit',
		   runTest : function () {
			   var prom = new LCPromiseCls();
			   doh.assertTrue(promises.isPromiseLike(prom));
		   }
	   }, {
		   name: 'test_isPromiseLike_function_extend',
		   runTest : function () {
			   var EPromCls = dojo.extend(LCPromiseCls, {
					  foo: function() {
						  console.log('in foo');
					  } 
			   });
			   var prom = new EPromCls();
			   doh.assertTrue(promises.isPromiseLike(prom));
		   }
	   }, {
		   name: 'test_isPromiseLike_function_mimic',
		   runTest : function () {
			   var prom = {
					   then : function() {},
					   cancel : function() {}
			   };
			   doh.assertTrue(promises.isPromiseLike(prom));
		   }
	   }, {
		   name: 'test_isPromiseLike_function_minimal',
		   runTest : function () {
			   // Dojo only checks for 'then' function
			   //  CRE.promises do not have cancel, so more restrictive test breaks			   
			   var prom = {
					then : function() {}
			   };
			   doh.assertTrue(promises.isPromiseLike(prom));
		   }
	   }, {
		   name: 'test_isPromiseLike_function_negatives',
		   runTest : function () {
			   var prom = {
					   then : {},
					   cancel : function() {}
			   };
			   doh.assertFalse(promises.isPromiseLike(prom));
			   doh.assertFalse(promises.isPromiseLike({}));
			   doh.assertFalse(promises.isPromiseLike());
		   }
	   }
	]);
	
}(doh, lconn.core.util.promises, lconn.core.util.LCDeferred));
