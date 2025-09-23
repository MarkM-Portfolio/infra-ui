/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/action/ExtensionAction",
   "ic-share/fileviewer/config/globals",
   "dojo/Stateful"
], function (ExtensionAction, globals, Stateful) {
   "use strict";

   describe("ExtensionAction", function () {
      beforeEach(function () {
         this.textUtil = globals.textUtil;

         globals.textUtil = {
            trim: function (str) {
               return str;
            }
         };
      });

      afterEach(function () {
         globals.textUtil = this.textUtil;
      });

      describe("create()", function () {
         beforeEach(function () {
            this.file = new Stateful({ mimeType: "image/jpg" });
         });

         it("should return undefined if the action contains a bad URL", function () {
            expect(ExtensionAction._create({
               "extends": "file_menu",
               type: "action",
               mime_type: "image/jpg",
               url: "javascript:alert('hello, world!');"
            }, this.file)).not.toBeDefined();
         });

         it("should return an object if the action applies to this mime type", function () {
            expect(ExtensionAction._create({
               "extends": "file_menu",
               type: "action",
               mime_type: "image/jpg",
               url: "http://foo.example.com/bar"
            }, this.file)).toBeDefined();
         });

         it("should return undefined if the action does not apply to this mime type", function () {
            expect(ExtensionAction._create({
               "extends": "file_menu",
               type: "action",
               mime_type: "image/png",
               url: "http://foo.example.com/bar"
            }, this.file)).not.toBeDefined();
         });

         it("should return undefined if the action does not have a target URL", function () {
            expect(ExtensionAction._create({
               "extends": "file_menu",
               type: "action",
               mime_type: "image/png"
            }, this.file)).not.toBeDefined();
         });

         it("should return undefined if the action is not a file menu action", function () {
            expect(ExtensionAction._create({
               "extends": "new_file_menu",
               type: "action",
               url: "http://foo.example.com/bar"
            })).not.toBeDefined();
         });

         it("should return undefined if the extension is not an action", function () {
            expect(ExtensionAction._create({
               "extends": "file_menu",
               type: "foo",
               url: "http://foo.example.com/bar"
            })).not.toBeDefined();
         });

         it("should return undefined if the args are empty", function () {
            expect(ExtensionAction._create({})).not.toBeDefined();
         });

         it("should return undefined if the args are undefined", function () {
            expect(ExtensionAction._create()).not.toBeDefined();
         });
      });

      describe("isSanitary()", function () {
         it("should return false if the URL is not defined", function () {
            expect(ExtensionAction._isSanitary()).toBeFalsy();
         });

         it("should return false if the URL uses the javascript protocol", function () {
            expect(ExtensionAction._isSanitary("javascript:alert()")).toBeFalsy();
         });

         it("should return false if the URL uses the data protocol", function () {
            expect(ExtensionAction._isSanitary("data:abc123")).toBeFalsy();
         });

         it("should return true if the URL uses the http protocol", function () {
            expect(ExtensionAction._isSanitary("http://foo.example.com/bar")).toBeTruthy();
         });

         it("should return true if the URL uses the https protocol", function () {
            expect(ExtensionAction._isSanitary("https://foo.example.com/bar")).toBeTruthy();
         });

         it("should return true if the URL uses the notes protocol", function () {
            expect(ExtensionAction._isSanitary("notes://Garth/86256EDF005310E2/" +
               "A4D87D90E1B19842852564FF006DED4E/")).toBeTruthy();
         });
      });

      describe("constructor", function () {
         beforeEach(function () {
            this.action = new ExtensionAction._class({
               menu_text: "Hello <world> & special; characters",
               tooltip: "Special < tooltip",
               "extends": "file_menu",
               type: "action",
               url: "http://foo.example.com/bar",
               mime_type: "dangerous & mimeType",
               new_window: "true",
               window_name: "-foo bar"
            });
         });

         it("should escape special characters in the name", function () {
            expect(this.action.name).toEqual("Hello &lt;world&gt; &amp; special; characters");
         });

         it("should escape special characters in the tooltip", function () {
            expect(this.action.tooltip).toEqual("Special &lt; tooltip");
         });

         it("should escape special characters in the mime type", function () {
            expect(this.action.mimeType).toEqual("dangerous &amp; mimeType");
         });

         it("should replace spaces and hyphens in the window name", function () {
            expect(this.action.windowName).toEqual("_foo_bar");
         });
      });

      describe("execute()", function () {
         beforeEach(function () {
            this.action = new ExtensionAction._class({
               menu_text: "Action Name",
               tooltip: "Action tooltip",
               "extends": "file_menu",
               type: "action",
               url: "http://foo.example.com/bar?fileId=${file_id}",
               new_window: "true",
               window_name: "WindowName"
            });

            this.file = new Stateful({
               id: "file-id-123"
            });

            this.currentUser = globals.currentUser;
            globals.currentUser = { id: "user-id-456", orgId: "org-id-789" };

            spyOn(this.action, "_openWindow");
            spyOn(this.action, "_redirect");
         });

         afterEach(function () {
            globals.currentUser = this.currentUser;
         });

         it("should call _openWindow() when opening in a new window", function () {
            this.action.execute(this.file);
            expect(this.action._openWindow).toHaveBeenCalled();
            expect(this.action._redirect).not.toHaveBeenCalled();
         });

         it("should call _redirect() when opening in the same window", function () {
            this.action.newWindow = false;
            this.action.execute(this.file);
            expect(this.action._openWindow).not.toHaveBeenCalled();
            expect(this.action._redirect).toHaveBeenCalled();
         });

         it("should mix the file ID into the URL", function () {
            this.action.execute(this.file);
            var args = this.action._openWindow.calls.argsFor(0);

            expect(args[0].indexOf("file-id-123")).toBeGreaterThan(0);
         });

         it("should mix the file ID into the URL", function () {
            this.action.execute(this.file);

            var args = this.action._openWindow.calls.argsFor(0);
            expect(args[0].indexOf("file-id-123")).toBeGreaterThan(0);
         });

         it("should mix the user ID into the URL", function () {
            this.action.url = "http://foo.example.com/bar?userId=${user_id}";
            this.action.execute(this.file);

            var args = this.action._openWindow.calls.argsFor(0);
            expect(args[0].indexOf("user-id-456")).toBeGreaterThan(0);
         });

         it("should mix the subscriber ID into the URL", function () {
            this.action.url = "http://foo.example.com/bar?subscriberID=${subscriber_id}";
            this.action.execute(this.file);

            var args = this.action._openWindow.calls.argsFor(0);
            expect(args[0].indexOf("user-id-456")).toBeGreaterThan(0);
         });

         it("should mix the org ID into the URL", function () {
            this.action.url = "http://foo.example.com/bar?orgId=${org_id}";
            this.action.execute(this.file);

            var args = this.action._openWindow.calls.argsFor(0);
            expect(args[0].indexOf("org-id-789")).toBeGreaterThan(0);
         });

         it("should mix the customer ID into the URL", function () {
            this.action.url = "http://foo.example.com/bar?customerId=${customer_id}";
            this.action.execute(this.file);

            var args = this.action._openWindow.calls.argsFor(0);
            expect(args[0].indexOf("org-id-789")).toBeGreaterThan(0);
         });

         it("should degrade gracefully if the URL happens to contain a replacement pattern", function () {
            this.action.url = "http://foo.example.com/bar?foo=${bar}";
            this.action.execute(this.file);

            var args = this.action._openWindow.calls.argsFor(0);
            expect(args[0].indexOf("${bar}")).toBeGreaterThan(0);
         });
      });

      describe("getUserField()", function () {
         it("should return the field from the top-level object if _native does not exist", function () {
            expect(ExtensionAction._getUserField({
               id: "top_ID"
            }, "id")).toEqual("top_ID");
         });

         it("should return the field from the _native object if it exists", function () {
            expect(ExtensionAction._getUserField({
               id: "top_ID",
               _native: {
                  id: "_native_ID"
               }
            }, "id")).toEqual("_native_ID");
         });

         it("should URI-encode the result", function () {
            expect(ExtensionAction._getUserField({
               id: "top ID",
            }, "id")).toEqual("top%20ID");
         });

         it("should return an empty string if the field does not exist in the user object", function () {
            expect(ExtensionAction._getUserField({}, "id")).toEqual("");
         });

         it("should return an empty string if the field is not given", function () {
            expect(ExtensionAction._getUserField({})).toEqual("");
         });

         it("should return an empty string if the user object is not defined", function () {
            expect(ExtensionAction._getUserField()).toEqual("");
         });
      });

      describe("createActions()", function () {
         it("should return all valid actions", function () {
            var data, actions;

            data = [{
               "extends": "file_menu",
               type: "action",
               url: "http://foo.example.com/bar",
               menu_text: "Action 1"
            }, {
               "extends": "new_file_menu",
               type: "action",
               url: "http://foo.example.com/bar",
               menu_text: "Action 2"
            }, {
               "extends": "file_menu",
               type: "action",
               url: "http://foo.example.com/bar",
               menu_text: "Action 3"
            }];

            actions = ExtensionAction.createActions(data);

            expect(actions.length).toBe(2);
         });

         it("should return an empty array if the data is undefined", function () {
            expect(ExtensionAction.createActions().length).toBe(0);
         });
      });
   });
});
