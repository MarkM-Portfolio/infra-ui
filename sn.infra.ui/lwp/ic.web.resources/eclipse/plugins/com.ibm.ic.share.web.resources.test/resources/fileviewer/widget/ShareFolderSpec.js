/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/widget/ShareFolder",
  "dojo/Stateful",
  "dojo/_base/lang",
  "../MockFileBean"
], function (ShareFolder, Stateful, lang, MockFileBean) {
  "use strict";

  describe("ShareFolder.getShareBean()", function () {
    beforeEach(function () {
      this.mockFile = MockFileBean;
      
      this.mockFactory = new Stateful({
        titleWithCount: "test title"
      });

      this.mockShareFolder = new ShareFolder({
        file: this.mockFile,
        dataKey: "collectionSharingFeed",
        factory: this.mockFactory,
        getSharedFolders: function () {console.log("fake getSharedFolders"); }
      });
    });

    it("should create a shareBean given an stateful file", function () {
      var shareBean = this.mockShareFolder.getShareBean(this.mockFile);
      console.log(shareBean);
      shareBean.getVisibility();
      shareBean.getLibraryType();
      shareBean.isPublic();
      shareBean.getPermissions();
      shareBean.isExternal();
      shareBean.isPrivate();
      shareBean.getAuthor();
      shareBean.getId();
      shareBean.getConfiguration();
      expect(shareBean.getVisibility).toBeDefined();
      expect(shareBean.getLibraryType).toBeDefined();
      expect(shareBean.isPublic).toBeDefined();
      expect(shareBean.getPermissions).toBeDefined();
      expect(shareBean.isExternal).toBeDefined();
      expect(shareBean.isPrivate).toBeDefined();
      expect(shareBean.getAuthor).toBeDefined();
      expect(shareBean.getId).toBeDefined();
      expect(shareBean.getConfiguration).toBeDefined();
    });
  });
});
