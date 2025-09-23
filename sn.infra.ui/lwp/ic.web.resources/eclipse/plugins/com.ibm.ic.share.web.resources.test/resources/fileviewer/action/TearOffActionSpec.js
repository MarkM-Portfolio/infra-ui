/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/action/TearOffAction",
  "ic-share/fileviewer/config/globals",
  "dojo/has",
  "dojo/Deferred",
  "dojo/topic"
], function (TearOffAction, globals, has, Deferred, topic) {
  "use strict";

  describe("TearOffAction.isValid", function () {
    beforeEach(function () {
      has.add("fileviewer-tearoff", true, true, true);
    });
    
    it("should be valid if the viewer is not currently torn off", function () {
      delete globals.tornOff;
      expect(TearOffAction.isValid()).toBe(true);
    });
    
    it("should not be valid if the viewer is currently torn off", function () {
      globals.tornOff = true;
      expect(TearOffAction.isValid()).toBe(false);
    });
    
    it("should not be valid if the gatekeeper flag is not set", function () {
      has.add("fileviewer-tearoff", false, true, true);
      expect(TearOffAction.isValid()).toBe(false);
    });
  });
  
  describe("TearOffAction.onLinkClicked()", function () {
    it("should publish a topic when the link is clicked", function () {
      var spy = jasmine.createSpy();
      var handle = topic.subscribe("ic-fileviewer/action/tearoff", spy);
      
      var action = TearOffAction.create();
      action.onLinkClicked();
      expect(spy).toHaveBeenCalled();
      
      handle.remove();
    });
  });
});
