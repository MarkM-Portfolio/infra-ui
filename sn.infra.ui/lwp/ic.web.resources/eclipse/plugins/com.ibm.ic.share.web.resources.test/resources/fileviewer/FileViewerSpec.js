/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/FileViewer",
  "ic-share/fileviewer/data/FilesAPI",
  "dojo/_base/array",
  "dojo/_base/lang",
  "./MockFile",
  "dojo/dom-class",
  "dojo/_base/window",
  "dojo/Deferred"
], function (FileViewer, FilesAPI, array, lang, fileData, domClass, win, Deferred) {
  "use strict";

  describe("FileViewer.createConnectionsFile()", function () {
    beforeEach(function () {
      this.file = FileViewer.createConnectionsFile(fileData);
    });

    it("should decorate the object with 'connections'", function () {
      expect(this.file.type).toEqual("connections");
    });

    it("should extract the file info from the bean", function () {
      expect(this.file.args).toEqual({
        name: "buzz.png",
        type: "png",
        id: "f2bfae48-1271-4d24-a552-102bef1dd57f",
        size: 61817,
        totalSize: 71996,
        modifier: {
          id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4",
          name: "Vivian Hanley",
          email: "vhanley@renovations.com",
          hasEmail: true,
          userState: "active"
        },
        created: new Date(Date.UTC(2014, 9, 10, 4, 4, 32)),
        updated: new Date(Date.UTC(2014, 9, 10, 4, 4, 32)),
        isEncrypted: false,
        objectTypeId: null,
        libraryType: "communityFiles",
        visibility: "public",
        canOthersShare: false,
        permissions: {
           Edit: true
        },
        author: {
          id: "d8a42d71-bdb9-46bd-a71c-1fe1226897b4"
        },
        recommendationUrl: "http://example.rtp.raleigh.ibm.com/files/basic/api/library/" +
          "3ed14df6-c5b5-42f1-b964-de4ccc3f8663/document/c0f3b1a8-dedf-4372-918a-2a280f7745fa/" +
          "recommendation/d8a42d71-bdb9-46bd-a71c-1fe1226897b4/entry",
        links: {
          download: "http://example.com/files/form/anonymous/api/library/" +
            "06a5ed2d-fa61-4201-b522-ba57ea45a28d/document/" +
            "f2bfae48-1271-4d24-a552-102bef1dd57f/media/buzz.png",
          details: "http://example.com/files/app/file/f2bfae48-1271-4d24-a552-102bef1dd57f",
          thumbnail: "http://example.com/blah/thumbnail.png",
          entry: "http://example.com/files/form/api/library/f2bfae48-1271-4d24-a552-102bef1dd57f/entry",
          alternate: "http://garner.rtp.raleigh.ibm.com/communities/service/html/communityview?" + 
            "communityUuid=82d87c43-0edb-44a5-bfe1-5a435f3f3e77#fullpageWidgetId=" +
            "Wdf806667c474_44ee_9a98_4b11fafc847c&file=c20a3a2b-fb9c-4734-ac12-ae5ee5727cdc"
        },
        versionCount: 3,
        version: 3,
        recommendations: 8,
        comments: 1,
        downloads: 13,
        downloadsAnonymous: 7,
        summary: "Test Desc.",
        tags : "testtag1",
        isExternal: false
      });
    });
  });

  describe("FileViewer.addFile()", function () {
    beforeEach(function () {
      var data = [ fileData, fileData, fileData ];
      this.files = [];

      array.forEach(data, function (d) {
        this.files.push(FileViewer.createConnectionsFile(d));
      }, this);

      this.viewer = FileViewer.create();
    });

    it("should leave next and previous undefined when there is only one file", function () {
      this.viewer.addFile(this.files[0]);

      expect(this.files[0].paging.previous).not.toBeDefined();
      expect(this.files[0].paging.next).not.toBeDefined();
    });

    it("should set next and previous when there are multiple files", function () {
      array.forEach(this.files, lang.hitch(this.viewer, "addFile"));

      expect(this.files[0].paging.previous).not.toBeDefined();
      expect(this.files[0].paging.next.args).toBe(this.files[1].args);

      expect(this.files[1].paging.previous.args).toBe(this.files[0].args);
      expect(this.files[1].paging.next.args).toBe(this.files[2].args);

      expect(this.files[2].paging.previous.args).toBe(this.files[1].args);
      expect(this.files[2].paging.next).not.toBeDefined();
    });

    it("should set the ID of each file", function () {
      array.forEach(this.files, function (file, index) {
        this.viewer.addFile(file);
        expect(file.id).toBe(index);
      }, this);
    });

    it("should convert an ID to a URL", function () {
      var params, viewer, id;

      params = window.notesiniParameters;
      window.notesiniParameters = { bssUrl: "https://example.com" };

      viewer = FileViewer.create();
      id = viewer.addFile("abc-123");
      expect(viewer._files[id].args).toBe("https://example.com/files/basic/api/document/abc-123/entry");

      window.notesiniParameters = params;
    });
  });

  describe("FileViewer.open()", function () {
    it("should add a class to the body to indicate that the viewer is open", function () {
      var viewer = FileViewer.create();
      viewer.addFile(fileData);
      viewer.open();

      expect(domClass.contains(win.body(), "ics-viewer-open")).toBeTruthy();

      viewer.close();
      expect(domClass.contains(win.body(), "ics-viewer-open")).toBeFalsy();
    });
    
    it("should open for file in which there was an error loading", function () {
      spyOn(FilesAPI, "fromEntryURL").and.callFake(function () {
        var promise = new Deferred();
        promise.reject(new Error());
        return promise;
      });
      
      var viewer = createFileViewer();
      viewer.addFile("abc123");
      viewer.open();
      
      expect(viewer.openError).toBeFalsy();
      viewer.close();
    });
  });
  
  function createFileViewer() {
    var args = {
      isAuthenticated: function () { return true; },
      coreServices: {},
      coreUrl: {
        getServiceUrl: function () { return ""; }
      }
    };
    return FileViewer.create(args);
  }
});
