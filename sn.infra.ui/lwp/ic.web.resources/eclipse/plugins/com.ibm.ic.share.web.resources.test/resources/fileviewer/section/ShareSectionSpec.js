/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/section/ShareSection",
  "ic-share/fileviewer/panels/SharingWidget",
  "../MockFileBean",
  "dojo/Stateful",
  "dojo/_base/array"
], function (ShareSection, SharingWidget, MockFileBean, Stateful, array) {
  "use strict";

  describe("ShareSection::constructor()", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;

      this.mockFactory = new Stateful({
        titleWithCount: "test title",
        updateTitle: function () { return; }
      });
    });
    
    it("should create an instance of the ShareSection widget", function () {
      var shareSection = new ShareSection({
        file: this.mockFile,
        dataKey: "sharingFeed",
        entryConstructor: SharingWidget,
        factory: this.mockFactory,
        getSharedUsers: function () { return; }
      });
      expect(shareSection).toBeDefined();
    });
  });
  
  describe("ShareSection::renderUsers()", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;

      this.mockFactory = new Stateful({
        titleWithCount: "test title",
        updateTitle: function () { return; }
      });
    });
    
    it("should render no users in each stream", function () {
      var shareSection = new ShareSection({
        file: this.mockFile,
        dataKey: "sharingFeed",
        entryConstructor: SharingWidget,
        factory: this.mockFactory,
        getSharedUsers: function () { return; }
      });

      spyOn(shareSection, 'renderUsers').andCallThrough();
      shareSection.renderUsers();
      expect(shareSection.renderUsers).toHaveBeenCalled();
    });
  });
  
  describe("ShareSection::refresh()", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;

      this.mockFactory = new Stateful({
        titleWithCount: "test title",
        updateTitle: function () { return; }
      });
    });
    
    it("should refresh the widget's properties on refresh", function () {
      var shareSection = new ShareSection({
        file: this.mockFile,
        dataKey: "sharingFeed",
        entryConstructor: SharingWidget,
        factory: this.mockFactory,
        getSharedUsers: function () { return; }
      });

      spyOn(shareSection, 'refresh').andCallThrough();
      spyOn(shareSection, 'clearItems').andCallThrough();
      spyOn(shareSection, 'refreshUsers');
      
      shareSection.refresh();
      
      expect(shareSection.refresh).toHaveBeenCalled();
      expect(shareSection.clearItems).toHaveBeenCalled();
      expect(shareSection.refreshUsers).toHaveBeenCalled();
    });
  });
});
