/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "ic-share/fileviewer/action/ToggleSyncAction",
   "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
   "dojo/_base/lang",
   "dojo/_base/array",
   "dojo/topic",
   "dojo/when",
   "dojox/lang/functional/object",
   "../MockFileBean",
   "ic-share/fileviewer/config/globals",
   "ic-share/fileviewer/util/network"
], function (ToggleSyncAction, i18n, lang, array, topic, when, object, MockFileBean, globals, networkUtil) {
   "use strict";

   var filesDocumentSyncTagName = "isSyncable";
   var mainNLS = i18n.ACTION.TOGGLE_SYNC;

   describe("ic-share/fileviewer/action/ToggleSyncAction", function () {

      var mockFileNotSyncing = {
        bean: MockFileBean
      };
      // TODO: See if we can get clone to work instead.  Fails with "TypeError: Illegal constructor".
      //var mockFileNotSyncing = lang.clone(mockFileNotSyncing);
      /*var mockFileNotSyncing = {
        bean: MockFileBean
      }*/
      //mockFileNotSyncing.bean.set(filesDocumentSyncTagName, true);

      // Testing class (static) functional members

      var originalIsSyncable, _beanModified;
      function getToggleSyncAction(withSyncingBean) {
        if(_beanModified) {
          throw "Error: \"getToggleSyncAction\" called when bean has already been modified.  Please restore the bean when a test is complete.";
        }
        var toggleSyncAction;
        if (withSyncingBean) {
          originalIsSyncable = mockFileNotSyncing.bean.get(filesDocumentSyncTagName);
          mockFileNotSyncing.bean.set(filesDocumentSyncTagName, true);
          _beanModified = true;
        }
        toggleSyncAction = ToggleSyncAction.create({file: mockFileNotSyncing});

        return toggleSyncAction;
      }

      function restoreBeanState() {
        if(_beanModified) {
          mockFileNotSyncing.bean.set(filesDocumentSyncTagName, originalIsSyncable);
          _beanModified = false;
        } else {
          throw "Error: \"restoreBeanState\" called when bean has not been modified.";
        }
      }

      describe("create", function () {
        it("should create our ToggleSyncAction with all of the appropriate properties set and represent a file not currently being synced", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction).not.toBeFalsy();
          expect(toggleSyncAction.nls).not.toBeFalsy();
          expect(toggleSyncAction.toggleStrings).not.toBeFalsy();
          expect(toggleSyncAction.get("checked")).toBeFalsy();
        });
        it("should create our ToggleSyncAction with all of the appropriate properties set and represent a file currently being synced", function () {
          var toggleSyncAction = getToggleSyncAction(true);
          expect(toggleSyncAction).not.toBeFalsy();
          expect(toggleSyncAction.nls).not.toBeFalsy();
          expect(toggleSyncAction.toggleStrings).not.toBeFalsy();
          expect(toggleSyncAction.get("checked")).toBeTruthy();
          restoreBeanState();
        });
      });

      describe("isValid", function () {
        var originalGlobalsPolicy, originalIsAuthenticated, originalItemEnvironment;
        var fileBean = mockFileNotSyncing.bean;

        //TODO: Add similar tests for folders and/or other item types when they become supported using existing unit test structure.
        var itemTypes = ["files"];
        var environments = [
          { value: "personalFiles", message: "Personal Files'", policyName: "personal" },
          { value: "communityFiles", message: "Community Files'", policyName: "community" }
        ];
        var expectations = [
          { value: false, message: "disabled"},
          { value: true, message: "enabled"}
        ];

        var testValidityWithmockFileNotSyncing = function(opts) {
          if (opts && opts.environmentType) {
            globals.environmentType = opts.environmentType;
          }

          if (opts && opts.isAuthenticated) {
            globals.isAuthenticated = opts.isAuthenticated;
          }

          if (opts && opts.itemEnvironment) {
            fileBean.set("libraryType", opts.itemEnvironment);
          }

          when(ToggleSyncAction.isValid(mockFileNotSyncing), function (value) {
            var isValidExpectation = expect(value);
            if (opts && opts.toBeTruthy === true) {
              isValidExpectation.toBeTruthy();
            } else {
              isValidExpectation.toBeFalsy();
            }
          });
        };

        var setSyncPolicy = function(itemType, environment, value) {
          var canSync = globals.policy.capabilities.canSync;
          var canSyncItem;

          if (canSync[itemType]) {
            canSyncItem = canSync[itemType];
            if (canSyncItem[environment.policyName] !== undefined) {
              globals.policy.capabilities.canSync[itemType][environment.policyName] = value;
            }
          }
        };

        beforeEach(function () {
          originalGlobalsPolicy = globals.policy;
          globals.policy = {
            capabilities: {
              canSync: {
                files: {
                  personal: false,
                  community: false
                },
                folders: {
                  personal: false,
                  community: false
                }
              }
            }
          };
          originalIsAuthenticated = globals.isAuthenticated;
          originalItemEnvironment = fileBean.get("libraryType");
        });

        afterEach(function () {
          globals.policy = originalGlobalsPolicy;
          globals.isAuthenticated = originalIsAuthenticated;
          fileBean.set("libraryType", originalItemEnvironment);
        });

        it("should return false for an anonymous user", function () {
          testValidityWithmockFileNotSyncing();
        });

        it("should return false for an empty environment's Syncing capability", function () {
          testValidityWithmockFileNotSyncing({
            isAuthenticated: true,
            itemEnvironment: ""
          });
        });

        array.forEach(itemTypes, function (itemType) {
          array.forEach(environments, function (environment) {
            array.forEach(expectations, function (expectation) {
              it("should return " + expectation.message + " for " + environment.message + " Syncing capability", function () {
                if (expectation.value) {
                  setSyncPolicy(itemType, environment, expectation.value);
                }
                testValidityWithmockFileNotSyncing({
                  isAuthenticated: true,
                  itemEnvironment: environment.value,
                  toBeTruthy: expectation.value
                });
              });
            });
          });
        });
      });

      describe("getClassName", function () {
        it("should return the classname to use for the action's styling or UI automation anchor", function () {
          expect(ToggleSyncAction.getClassName()).not.toBeFalsy();
        });
      });



      // Testing instance functional members

      describe("onLinkClicked", function () {
        it("should send a request to update the file bean and start syncing a file", function () {
          spyOn(mockFileNotSyncing.bean, "update").and.callThrough();
          var toggleSyncAction = getToggleSyncAction(false);
          toggleSyncAction.onLinkClicked();
          expect(mockFileNotSyncing.bean.update.calls.count()).toBe(1);
        });
        it("should send a request to update the file bean and stop syncing a file", function () {
          spyOn(mockFileNotSyncing.bean, "update").and.callThrough();
          var toggleSyncAction = getToggleSyncAction(true);
          toggleSyncAction.onLinkClicked();
          expect(mockFileNotSyncing.bean.update.calls.count()).toBe(1);
          restoreBeanState();
        });
        it("should call 2 functions when the file bean updates request is sent out", function () {
          var fakePromiseSpyObj = jasmine.createSpyObj('fakePromise', ['then']);
          spyOn(mockFileNotSyncing.bean, "update").and.returnValue(fakePromiseSpyObj);
          var toggleSyncAction = getToggleSyncAction(false);
          toggleSyncAction.onLinkClicked();
          expect(fakePromiseSpyObj.then).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        });
        it("should call the success method when the file bean update request succeeds", function () {
          spyOn(mockFileNotSyncing.bean, "update").and.returnValue({
            then: function(successCallback, errorCallback) {
              successCallback();
            }
          });
          var toggleSyncAction = getToggleSyncAction(false);
          spyOn(toggleSyncAction, "_onSuccess");
          toggleSyncAction.onLinkClicked();
          expect(toggleSyncAction._onSuccess.calls.count()).toBe(1);
        });
        it("should call the error method when the file bean update request fails", function () {
          spyOn(mockFileNotSyncing.bean, "update").and.returnValue({
            then: function(successCallback, errorCallback) {
              errorCallback();
            }
          });
          var toggleSyncAction = getToggleSyncAction(false);
          spyOn(toggleSyncAction, "_onError");
          toggleSyncAction.onLinkClicked();
          expect(toggleSyncAction._onError.calls.count()).toBe(1);
        });
      });

      describe("_onSuccess", function () {
        var fileViewerRefreshTopicName = "ic-fileviewer/dirty";

        it("should implement the success method, which refreshes the page is used", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction._onSuccess).toBeDefined();
        });
        it("should publish a topic with the approriate parameters when called", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          spyOn(topic, "publish");
          spyOn(toggleSyncAction, "_publishMessage");
          toggleSyncAction._onSuccess();
          expect(topic.publish.calls.count()).toBe(1);
          expect(topic.publish.calls.argsFor(0)[0]).toBe(fileViewerRefreshTopicName);
          expect(topic.publish.calls.argsFor(0)[1]).toBe(filesDocumentSyncTagName);
          expect(topic.publish.calls.argsFor(0)[2]).toBeFalsy();
        });
        it("should update the action's syncing state with the new file bean's state when called", function () {
          var toggleSyncAction = getToggleSyncAction(true);
          toggleSyncAction._onSuccess();
          expect(toggleSyncAction.get("checked")).toBeTruthy();

          mockFileNotSyncing.bean.set(filesDocumentSyncTagName, false);
          toggleSyncAction._onSuccess();
          expect(toggleSyncAction.get("checked")).toBeFalsy();

          restoreBeanState();
        });
        it("should publish a topic to signify a modified file bean with the approriate parameters when called", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          spyOn(topic, "publish");
          spyOn(toggleSyncAction, "_publishMessage");
          toggleSyncAction._onSuccess();
          expect(topic.publish.calls.count()).toBe(1);
          expect(topic.publish.calls.argsFor(0)[0]).toBe(fileViewerRefreshTopicName);
          expect(topic.publish.calls.argsFor(0)[1]).toBe(filesDocumentSyncTagName);
          expect(topic.publish.calls.argsFor(0)[2]).toBeFalsy();
        });
        it("should publish a success message with the approriate parameters when called", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          spyOn(toggleSyncAction, "_publishMessage");
          toggleSyncAction._onSuccess();
          expect(toggleSyncAction._publishMessage.calls.count()).toBe(1);
          expect(toggleSyncAction._publishMessage).toHaveBeenCalledWith(true);
        });
      });

      describe("_onError", function () {
        var sampleError = {
          code: "FileNotFound",
          stack: ""
        };
        it("should implement the error method, that does nothing for now but complements adding the success method and in case we need to use it in the future", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction._onError).toBeDefined();
        });
        it("should publish an error message with the approriate parameters when called", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          spyOn(toggleSyncAction, "_publishMessage");
          toggleSyncAction._onError(sampleError);
          expect(toggleSyncAction._publishMessage.calls.count()).toBe(1);
          expect(toggleSyncAction._publishMessage).toHaveBeenCalledWith(false, jasmine.any(Object));
        });
      });

      describe("_publishMessage", function () {
        var fileViewerUIMessageTopicName = "ic-fileviewer/push/messages";

        describe("Success Messages", function () {
          it("should publish an \"Add to Sync\" success message", function () {
            // Starting with a bean that is not currently added to sync,
            // but combined this statement by simulating the bean update after clicking the button,
            // which is when this method is run, so it is now added to sync.
            var toggleSyncAction = getToggleSyncAction(true);
            spyOn(networkUtil, "getErrorMessage");
            spyOn(topic, "publish");
            
            toggleSyncAction._publishMessage(true);
            expect(networkUtil.getErrorMessage.calls.count()).toBe(0);
            expect(topic.publish.calls.count()).toBe(1);
            expect(topic.publish.calls.argsFor(0)[0]).toBe(fileViewerUIMessageTopicName);
            expect(topic.publish.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
              type: "success",
              message: mainNLS.SYNC.SUCCESS,
              cancelable: true
            }));
            
            restoreBeanState();
          });
          it("should publish a \"Remove from Sync\" success message", function () {
            // Starting with a bean that is currently added to sync,
            // but combined this statement by simulating the bean update after clicking the button,
            // which is when this method is run, so it is now removed from sync.
            var toggleSyncAction = getToggleSyncAction(false);
            spyOn(networkUtil, "getErrorMessage");
            spyOn(topic, "publish");
            toggleSyncAction._publishMessage(true);
            expect(networkUtil.getErrorMessage.calls.count()).toBe(0);
            expect(topic.publish.calls.count()).toBe(1);
            expect(topic.publish.calls.argsFor(0)[0]).toBe(fileViewerUIMessageTopicName);
            expect(topic.publish.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
              type: "success",
              message: mainNLS.STOP_SYNC.SUCCESS,
              cancelable: true
            }));
          });
        });
        
        describe("Error Messages", function () {

          array.forEach(object.keys(mainNLS), function(subActionSubNLSKey) {
            array.forEach(object.keys(mainNLS[subActionSubNLSKey].ERROR), function(errorMessageKey) {
              it("should publish the \"" + subActionSubNLSKey + "\" sub-action's \"" + errorMessageKey + "\" error messages", function () {
                var errorMessage = mainNLS[subActionSubNLSKey].ERROR[errorMessageKey];
                var isSyncing = (mainNLS[subActionSubNLSKey].ERROR === mainNLS.STOP_SYNC.ERROR);
                var toggleSyncAction = getToggleSyncAction(isSyncing);
                spyOn(networkUtil, "getErrorMessage").and.callFake(function(error, messageSubNLS) {
                  expect(messageSubNLS).toBe(mainNLS[subActionSubNLSKey].ERROR);
                  return messageSubNLS[errorMessageKey];
                });
                spyOn(topic, "publish");
              
                toggleSyncAction._publishMessage(false);
                expect(networkUtil.getErrorMessage.calls.count()).toBe(1);
                expect(topic.publish.calls.count()).toBe(1);
                expect(topic.publish.calls.argsFor(0)[0]).toBe(fileViewerUIMessageTopicName);
                expect(topic.publish.calls.argsFor(0)[1]).toEqual(jasmine.objectContaining({
                  type: "error",
                  message: errorMessage,
                  cancelable: true
                }));
                
                if(isSyncing) {
                  restoreBeanState();
                }
              });
            });
          });
        });
      });

      describe("_isSyncing", function () {
        it("should return false for a file that is not currently syncing with the client", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction._isSyncing()).toBeFalsy();
        });
        it("should return true for a file that is currently syncing with the client", function () {
          var toggleSyncAction = getToggleSyncAction(true);
          expect(toggleSyncAction._isSyncing()).toBeTruthy();
          restoreBeanState();
        });
      });

      describe("_getPreviousActionSubNLS", function () {
        it("should return the \"STOP_SYNC\" SubNLS using the override for a file that is not currently syncing or that was recently removed from sync", function () {
          // The following statements utilizing a bean of the opposite status is used as interference,
          // to make sure the method does not use the value from the bean.
          var toggleSyncAction = getToggleSyncAction(true);
          expect(toggleSyncAction._getPreviousActionSubNLS(false)).toBe(mainNLS.STOP_SYNC);
          restoreBeanState();
        });
        it("should return the \"SYNC\" SubNLS using the override for a file that is currently syncing or that was recently added to sync", function () {
          // The following statements utilizing a bean of the opposite status is used as interference,
          // to make sure the method does not use the value from the bean.
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction._getPreviousActionSubNLS(true)).toBe(mainNLS.SYNC);
        });
        it("should return the \"STOP_SYNC\" SubNLS for a file that is not currently syncing", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction._getPreviousActionSubNLS()).toBe(mainNLS.STOP_SYNC);
        });
        it("should return the \"SYNC\" SubNLS for a file that is currently syncing", function () {
          var toggleSyncAction = getToggleSyncAction(true);
          expect(toggleSyncAction._getPreviousActionSubNLS()).toBe(mainNLS.SYNC);
          restoreBeanState();
        });
      });

      describe("_getCurrentNextActionSubNLS", function () {
        it("should return the \"SYNC\" SubNLS using the override for a that is file not currently syncing", function () {
          // The following statements utilizing a bean of the opposite status is used as interference,
          // to make sure the method does not use the value from the bean.
          var toggleSyncAction = getToggleSyncAction(true);
          expect(toggleSyncAction._getCurrentNextActionSubNLS(false)).toBe(mainNLS.SYNC);
          restoreBeanState();
        });
        it("should return the \"STOP_SYNC\" SubNLS using the override for a that is file currently syncing", function () {
          // The following statements utilizing a bean of the opposite status is used as interference,
          // to make sure the method does not use the value from the bean.
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction._getCurrentNextActionSubNLS(true)).toBe(mainNLS.STOP_SYNC);
        });
        it("should return the \"SYNC\" SubNLS for a file that is not currently syncing", function () {
          var toggleSyncAction = getToggleSyncAction(false);
          expect(toggleSyncAction._getCurrentNextActionSubNLS()).toBe(mainNLS.SYNC);
        });
        it("should return the \"STOP_SYNC\" SubNLS for a file that is currently syncing", function () {
          var toggleSyncAction = getToggleSyncAction(true);
          expect(toggleSyncAction._getCurrentNextActionSubNLS()).toBe(mainNLS.STOP_SYNC);
          restoreBeanState();
        });
      });
   });
});