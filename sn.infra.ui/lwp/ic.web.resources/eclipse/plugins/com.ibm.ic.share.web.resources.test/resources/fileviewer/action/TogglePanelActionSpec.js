/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/action/TogglePanelAction",
   "dojo/_base/lang"
], function (TogglePanelAction, lang) {
   "use strict";

   function getActionArgs() {
      return {
         viewerActions: {
            showDetailsPanel: function () {
               return;
            }
         },
         blank: ""
      };
   }

   describe("TogglePanelAction._getCookieValue()", function () {
      function createAction(cookieValue) {
         var args = getActionArgs(),
            spy = jasmine.createSpy("cookie");

         if (lang.isFunction(spy.andReturn)) {
           spy.andReturn(cookieValue);        // Jasmine 1.3
         } else if (lang.isFunction(spy.and.returnValue)) {
            spy.and.returnValue(cookieValue); // Jasmine 2.0
         } else {
            spy.and.callReturn(cookieValue);  // Jasmine 2.0 RC
         }

         args._cookie = spy;

         return TogglePanelAction.create(args);
      }

      it("should return true if the cookie is 'true'", function () {
         expect(createAction("true")._getCookieValue()).toBeTruthy();
      });

      it("should return false if the cookie is 'false'", function () {
         expect(createAction("false")._getCookieValue()).not.toBeTruthy();
      });

      it("should return true if the cookie is undefined", function () {
         expect(createAction()._getCookieValue()).toBeTruthy();
      });
   });

   describe("TogglePanelAction._setCookieValue()", function () {
      var COOKIE_NAME = "com.ibm.ic.share.fileviewer.panel-showing";

      beforeEach(function () {
         this.spy = jasmine.createSpy("cookie");

         var args = getActionArgs();
         args._cookie = this.spy;

         this.action = TogglePanelAction.create(args);
      });

      it("should set 'true' if the value is truthy", function () {
         this.action._setCookieValue("abc123");
         expect(this.spy).toHaveBeenCalledWith(COOKIE_NAME, "true");
      });

      it("should set 'false' if the value is not truthy", function () {
         this.action._setCookieValue(false);
         expect(this.spy).toHaveBeenCalledWith(COOKIE_NAME, "false");
      });
   });
});
