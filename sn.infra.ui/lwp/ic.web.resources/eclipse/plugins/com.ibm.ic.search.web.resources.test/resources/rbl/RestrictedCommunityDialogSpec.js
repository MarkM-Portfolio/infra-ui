/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
	"ic-search/rbl/RestrictedCommunityDialog",
	"ic-core/auth"
], function(RestrictedCommunityDialog, auth) {

	describe("the widget ic-search/rbl/RestrictedCommunityDialog", function() {
		var rblDialog;
		var pageContent = document.createElement("div");
		var leftColumn = document.createElement("div");
		var isAuth;
		beforeEach(function() {
			isAuth = true;
			spyOn(auth, "login");
			spyOn(auth, "isAuthenticated").and.callFake(function() {
				return isAuth;
			});
			rblDialog = new RestrictedCommunityDialog();
			rblDialog.startup();
			rblDialog.pageContent = pageContent;
			rblDialog.leftColumn = leftColumn;
		});
		describe("the interface", function() {
			it("implements the expected methods", function() {
				expect(rblDialog.showJoinForm).toEqual(jasmine.any(Function));
				expect(rblDialog.onSuccess).toEqual(jasmine.any(Function));
				expect(rblDialog.onError).toEqual(jasmine.any(Function));
			});
		});
		describe("the showJoinForm method", function() {
			it("doesn't throw", function() {
				expect(function() {
					rblDialog.showJoinForm("ID", "NAME", "DESC");
				}).not.toThrow();
			});
			it("calls the ic-core.auth.login method if current user is not logged in", function() {
				isAuth = false;
				rblDialog.showJoinForm("ID", "NAME", "DESC");
				expect(auth.login).toHaveBeenCalled();
			});
		});
		describe("the _handleResponse method", function() {
			it("calls the onSuccess method if http status code is 201", function() {
				spyOn(rblDialog, "onSuccess");
				rblDialog._handleResponse({
					xhr: {
						status: 201
					}
				});
				expect(rblDialog.onSuccess).toHaveBeenCalled();
			});
			it("calls the onError method if any other http status code", function() {
				spyOn(rblDialog, "onError");
				rblDialog._handleResponse({
					xhr: {
						status: 301
					}
				});
				expect(rblDialog.onError).toHaveBeenCalled();
			});
		});
		describe("the _handleError method", function() {
			it("calls the onError method", function() {
				spyOn(rblDialog, "onError");
				rblDialog._handleError(null);
				expect(rblDialog.onError).toHaveBeenCalled();
			});
		});
	});
});