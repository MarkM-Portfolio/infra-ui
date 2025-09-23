/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.util.promisesSpec");

dojo.require("lconn.core.util.promises");

(function(promises) {
	describe("the interface of lconn.core.util.promises", function() {
		it("implements the expected methods", function() {
			expect(promises.isPromiseLike).toEqual(jasmine.any(Function));
			expect(promises.deferredToPromise).toEqual(jasmine.any(Function));
		});
	});

	describe("the method lconn.core.util.promises.isPromiseLike()", function() {
		it("test_isPromiseLike_function_explicit", function() {
			expect(promises.isPromiseLike(new promises.iFaceClass)).toBeTruthy();
		});
		it("returns true when extending a class", function() {
			var EPromCls = dojo.extend(promises.iFaceClass, {
				foo: function() { return true } 
			});
			var extendedClass = new EPromCls();
			expect(promises.isPromiseLike(extendedClass)).toBeTruthy();
		});
		it("returns true when promises are defined", function() {
			var prom = {
					then : function() {},
					cancel : function() {}
			};
			expect(promises.isPromiseLike(prom)).toBeTruthy();
		});
		it("returns true when only 'then' is defined", function() {
			var prom = {
					then : function() {}
			};
			expect(promises.isPromiseLike(prom)).toBeTruthy();
		});
		it("returns false if 'then' method not defined", function() {
			var prom = {
					then : {},
					cancel : function() {}
			};
			expect(promises.isPromiseLike(prom)).toBeFalsy();
			expect(promises.isPromiseLike({})).toBeFalsy();
			expect(promises.isPromiseLike()).toBeFalsy();
		});
	});
   
}(lconn.core.util.promises));
