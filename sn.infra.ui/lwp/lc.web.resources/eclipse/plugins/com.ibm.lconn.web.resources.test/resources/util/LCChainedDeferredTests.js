/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.util.LCChainedDeferredTests");

dojo.require("doh.runner");
dojo.require("lconn.core.util.LCChainedDeferred");
dojo.require("lconn.core.util.LCDeferred");

(function(dojo, doh, LCChainedDeferredCls, LCDeferredCls) {
	
	var MTestCls = dojo.declare('', null, {
		result : null,
		error : null,
		promise : null,
		chain : null,
		name : null,
		
		constructor : function (name, special) {
			this.name = name;
			this.promise = new LCDeferredCls();
			this.chain = new LCChainedDeferredCls(this.promise);
			
			dojo.mixin(this, special);			
		},
		
		setUp : function() {
			this.chain.then(dojo.hitch(this, function(result) { this.result = result; }),
					dojo.hitch(this, function(error) { this.error = error; }));
		}		
	});
	
	doh.register("lconn.test.util.LCChainedDeferredTests", [
		new MTestCls('test_1_level_promise', {
	    	runTest : function() {
	    		this.promise.callback(true);
	    		doh.t(this.result);
	    	}
	    }),
	    
	    new MTestCls('test_2_level_promise', {
	    	runTest : function() {
	    		var res = 2, def = new LCDeferredCls();
	    		
	    		this.promise.callback(def);
	    		def.callback(res);
	    		
	    		doh.is(res, this.result);
	    	}
	    }),
		
	    new MTestCls('test_3_level_promise', {
	    	runTest : function() {
	    		var res = 3, 
	    			def2 = new LCDeferredCls(), 
	    			def3 = new LCDeferredCls();
	    		
	    		this.promise.callback(def2);
	    		def2.callback(def3);
	    		def3.callback(res);
	    		
	    		doh.is(res, this.result);
	    	}
	    }),
	    
	    new MTestCls('test_3_level_promise_then', {
	    	runTest : function() {
	    		var res = 3, 
	    			res2 = -1,
	    			def2 = new LCDeferredCls(), 
	    			def3 = new LCDeferredCls();
	    		
	    		this.chain.then(function(r) {
	    			res2 = r;
	    		});
	    		
	    		this.promise.callback(def2);
	    		def2.callback(def3);
	    		def3.callback(res);
	    		
	    		doh.is(res, this.result);
	    		doh.is(res2, this.result);
	    	}
	    }),
		
	    new MTestCls('test_1_level_errback', {
	    	runTest : function() {
	    		var err = 1;
	    		this.promise.errback(err);	    		
	    		doh.is(err, this.error);
	    	}
	    }),
	    
	    new MTestCls('test_2_level_errback', {
	    	runTest : function() {
	    		var err = 2, 
	    			def2 = new LCDeferredCls();
	    		
	    		this.promise.callback(def2);
	    		def2.errback(err);
	    			    		
	    		doh.is(err, this.error);
	    	}
	    }),
	    
	    new MTestCls('test_3_level_errback', {
	    	runTest : function() {
	    		var err = 3, 
	    			def2 = new LCDeferredCls(),
	    			def3 = new LCDeferredCls();
	    		
	    		this.promise.callback(def2);
	    		def2.callback(def3);
	    		def3.errback(err);
	    			    		
	    		doh.is(err, this.error);
	    	}
	    }),
	    
	    new MTestCls('test_3_level_errback_then_errorbk', {
	    	runTest : function() {
	    		var err = 3,
	    			gerr = -1,
	    			res = this.result = 4,
	    			def2 = new LCDeferredCls(),
	    			def3 = new LCDeferredCls();
	    		
	    		this.chain.then(function (r) {
	    			doh.t(false, 'Should not be reachable');
	    		}, function (e) {
	    			gerr = e;
	    		});
	    		
	    		this.promise.callback(def2);
	    		def2.callback(def3);
	    		def3.errback(err);
	    		
	    		doh.is(err, this.error);
	    		doh.is(gerr, this.error);
	    		doh.is(res, this.result);
	    	}
	    }),
	    
	    new MTestCls('test_errback_with_no_cancel', {
	    	runTest : function() {
	    		var err = 4;
	    		
	    		this.promise.cancel = null;
	    		this.chain.cancel(err);
	    			    			    		
	    		doh.is(err, this.error);
	    	}
	    }),
	    
	    new MTestCls('test_errback_with_no_cancel_still_resolve', {
	    	runTest : function() {
	    		var err = 4;
	    		
	    		this.promise.cancel = null;
	    		this.chain.cancel(err);
	    			    			    		
	    		doh.is(err, this.error);
	    		
	    		this.promise.callback('foo');
	    		
	    		doh.is(null, this.result);
	    	}
	    })
	]);
	
}(dojo, doh, lconn.core.util.LCChainedDeferred, lconn.core.util.LCDeferred));
