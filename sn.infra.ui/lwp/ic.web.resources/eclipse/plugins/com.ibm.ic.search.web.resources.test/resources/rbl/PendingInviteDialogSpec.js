/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/rbl/PendingInviteDialog",
	"ic-core/config/services",
	"ic-core/url"
], function(PendingInviteDialog, services, urlModule) {

	describe("the widget ic-search/rbl/PendingInviteDialog", function() {
		var dialog;
		beforeEach(function() {
			dialog = new PendingInviteDialog({
				commUuid: "commUuid",
				commName: "commName",
				commDescription: "commDescription",
				directoryUuid: "directoryUuid"
			});
			dialog.startup();
		});
		describe("the interface", function() {
			it("implements the expected methods", function() {
				expect(dialog.cancelFunction).toEqual(jasmine.any(Function));
				expect(dialog._acceptInvite).toEqual(jasmine.any(Function));
				expect(dialog._redirect).toEqual(jasmine.any(Function));
				expect(dialog._cancel).toEqual(jasmine.any(Function));
			});
		});
		describe("the _acceptInvite method", function() {
			it("doesn't throw", function() {
				spyOn(dialog, "_redirect");
				expect(function() {
					dialog._acceptInvite();
				}).not.toThrow();
			});
			it("redirects the browser to the community page", function() {
				spyOn(dialog, "_redirect");
				dialog._acceptInvite();
				setTimeout(function() {
					expect(dialog._redirect).toHaveBeenCalledWith(urlModule.getServiceUrl(services.communities)
						+ "/service/html/communitystart?communityUuid="
						+ "commUuid");
				}, 100);
			});
		});
		describe("the _cancel method", function() {
			it("doesn't throw", function() {
				expect(function() {
					dialog._cancel();
				}).not.toThrow();
			});
			it("calls the cancelFunction method", function() {
				spyOn(dialog, "cancelFunction");
				dialog._cancel();
				expect(dialog.cancelFunction).toHaveBeenCalled();
			});
		});
	});
});