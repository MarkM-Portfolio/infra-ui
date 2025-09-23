/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/preview/EntitlementChecker"
], function (EntitlementChecker) {
  "use strict";

  var FULL_ENTITLEMENT, NO_DOCS_ENTITLEMENT;

  FULL_ENTITLEMENT =
    "MTkwNDdmYmJhNjE2NWY2M2UwMThiZDdhM2U5ZWFkZTE4NWYxNDQ5Ng==-YmhfYWN0aXZpdGllcyxiaF9hY3Rp" +
    "dml0aWVzX19hbGxvd19vdmVyYWdlLGJoX2NoYXQsYmhfY29tbXVuaXRpZXMsYmhfY29udGFjdHMsYmhfZGFza" +
    "GJvYXJkLGJoX2RvY3MsYmhfZmVlZGJhY2ssYmhfZmlsZXIsYmhfZmlsZXJfX2FsbG93X292ZXJhZ2UsYmhfZm" +
    "9ybXMsYmhfZm9ydW1zLGJoX21lZXRpbmdzLGJoX3doYXRzX25ldyxic3NfYWRtaW4sYnNzX2ludml0ZV9ndWV" +
    "zdCxic3NfdWlfX2lzX2FjY2Vzc29yeV9vZmZlcmluZyxleHRfd2ViY2hhdCxoYXNfYWNjZXNzb3J5X3N1YnNj" +
    "cmlwdGlvbixsY19hY3Rpdml0aWVzLGxjX25ld3Msc2FtZXRpbWVfbWVldGluZyw=-MjE1NTgxMzY=";

  NO_DOCS_ENTITLEMENT =
    "MTkwNDdmYmJhNjE2NWY2M2UwMThiZDdhM2U5ZWFkZTE4NWYxNDQ5Ng==-YmhfYWN0aXZpdGllcyxiaF9hY3Rp" +
    "dml0aWVzX19hbGxvd19vdmVyYWdlLGJoX2NoYXQsYmhfY29tbXVuaXRpZXMsYmhfY29udGFjdHMsYmhfZGFza" +
    "GJvYXJkLGJoX2ZlZWRiYWNrLGJoX2ZpbGVyLGJoX2ZpbGVyX19hbGxvd19vdmVyYWdlLGJoX2Zvcm1zLGJoX2" +
    "ZvcnVtcyxiaF9tZWV0aW5ncyxiaF93aGF0c19uZXcsYnNzX2FkbWluLGJzc19pbnZpdGVfZ3Vlc3QsYnNzX3V" +
    "pX19pc19hY2Nlc3Nvcnlfb2ZmZXJpbmcsZXh0X3dlYmNoYXQsaGFzX2FjY2Vzc29yeV9zdWJzY3JpcHRpb24s" +
    "bGNfYWN0aXZpdGllcyxsY19uZXdzLHNhbWV0aW1lX21lZXRpbmcs-MjE1NTgxMzY=";

  describe("EntitlementChecker.getViewerDfd()", function () {
    it("should resolve to false immediately if the user is unauthenticated", function () {
      var checker, spy;

      checker = new EntitlementChecker({
        isAuthenticated: function () {
          return false;
        }
      });

      spy = jasmine.createSpy("callback");

      checker.getViewerDfd().then(spy);
      expect(spy).toHaveBeenCalledWith(false);
    });

    it("should resolve to true immediately if the entitlements cookie is set", function () {
      var checker, spy;

      checker = new EntitlementChecker({
        isAuthenticated: function () {
          return true;
        },
        cookie: function () {
          return true;
        }
      });

      spy = jasmine.createSpy("callback");

      checker.getViewerDfd().then(spy);
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe("EntitlementChecker.getDocsDfd()", function () {
    var entitlementChecker, dfd, cookie;

    beforeEach(function () {
      entitlementChecker = new EntitlementChecker();
      entitlementChecker.resetDfds();
    });

    it("should be true if there is an entitlements cookie and 'bh_docs' is in the list", function () {
      cookie = FULL_ENTITLEMENT;

      dfd = entitlementChecker.getDocsDfd({cookie: cookie});

      expect(dfd.isResolved()).toBe(true);
      dfd.then(function (result) {
        expect(result).toBe(true);
      });
    });

    it("should be true if there is an entitlements cookie but 'bh_docs' is not in the list", function () {
      cookie = NO_DOCS_ENTITLEMENT;
      dfd = entitlementChecker.getDocsDfd({cookie: cookie});

      expect(dfd.isResolved()).toBe(true);
      dfd.then(function (result) {
        expect(result).toBe(false);
      });
    });
  });
});
