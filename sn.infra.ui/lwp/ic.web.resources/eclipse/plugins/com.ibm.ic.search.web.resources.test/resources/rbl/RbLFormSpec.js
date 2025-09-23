/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	//XXX hack to fix CKeditor AMD widgets - to remove once LC #148060 is solved
	"ic-core/ckeditor",
	//XXX end hack
	"ic-search/rbl/RbLForm"
], function(ckeditor, RbLForm) {

	describe("the widget ic-search/rbl/RbLForm", function() {
		var rblForm;
		beforeEach(function() {
			rblForm = new RbLForm();
			rblForm.startup();
		});
		describe("the interface", function() {
			it("implements the expected methods", function() {
				expect(rblForm._saveForm).toEqual(jasmine.any(Function));
				expect(rblForm._send).toEqual(jasmine.any(Function));
				expect(rblForm._cancel).toEqual(jasmine.any(Function));
			});
		});
		describe("the _saveForm method", function() {
			it("doesn't throw", function() {
				expect(function() {
					rblForm._saveForm();
				}).not.toThrow();
			});
		});
		describe("the _send method", function() {
			it("doesn't throw", function() {
				expect(function() {
					rblForm._send();
				}).not.toThrow();
			});
			it("calls the _saveForm method", function() {
				spyOn(rblForm, "_saveForm");
				rblForm._send();
				expect(rblForm._saveForm).toHaveBeenCalled();
			});
		});
		describe("the _cancel method", function() {
			it("doesn't throw", function() {
				expect(function() {
					rblForm._cancel();
				}).not.toThrow();
			});
		});
	});
});