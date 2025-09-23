/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/util/network"
], function (network) {
  "use strict";

  describe("ic-share/fileviewer/util/network", function () {
    var error, errorStrings = {
      UNAUTHENTICATED: "Unauthenticated Message",
      ACCESS_DENIED: "No Access Message",
      NOT_FOUND: "Not Found Message",
      DEFAULT: "Default Message"
    };
    
    beforeEach(function () {
      error = new Error();
    });
    
    describe("getErrorMessage()", function () {
      it("should provide the correct error message for an unauthenticated error", function () {
        error.code = "Unauthenticated";
        expect(network.getErrorMessage(error, errorStrings)).toBe("Unauthenticated Message");
      });
      
      it("should provide the correct error message for an access-denied error", function () {
        error.code = "AccessDenied";
        expect(network.getErrorMessage(error, errorStrings)).toBe("No Access Message");
      });
      
      it("should provide the correct error message for an item-not-found error", function () {
        error.code = "ItemNotFound";
        expect(network.getErrorMessage(error, errorStrings)).toBe("Not Found Message");
      });
      
      it("should provide the correct error message for any other error", function () {
        error.code = "RandomError";
        expect(network.getErrorMessage(error, errorStrings)).toBe("Default Message");
      });
    });
  });
});
