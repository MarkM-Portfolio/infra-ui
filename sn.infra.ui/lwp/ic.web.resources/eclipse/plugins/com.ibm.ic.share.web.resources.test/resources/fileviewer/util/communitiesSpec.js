/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/util/communities",
  "dojox/xml/parser",
  "dojo/text!./sample/widgets_files_1.xml",
  "dojo/text!./sample/widgets_files_2.xml",
  "dojo/text!./sample/widgets_no_files.xml"
], function (communities, parser, communityFilesWidgets1, communityFilesWidgets2, communityWidgetsNoFiles) {
  "use strict";

  describe("ic-share/fileviewer/util/communities._isFilesWidget", function () {
    var communityFilesWidgets1Doc = parser.parse(communityFilesWidgets1);
    var communityFilesWidgets2Doc = parser.parse(communityFilesWidgets2);
    var communityWidgetsNoFilesDoc = parser.parse(communityWidgetsNoFiles);
    
    it("should return true if the fullpageWidgetId matches the fullpageWidgetId of the Files widget", function () {
      expect(communities._isFilesWidget("Wd618823ff5d0_405d_a103_e0016e796d24", communityFilesWidgets1Doc)).toBe(true);
      expect(communities._isFilesWidget("Wa40586e8c231_4f6a_b38a_3cc267a7791e", communityFilesWidgets2Doc)).toBe(true);
    });
    
    it("should return false if the fullpageWidgetId does not match the fullpageWidgetId of the Files widget", function () {
      expect(communities._isFilesWidget("Wd618823ff5d0_405d_a103_e0016e796d24", communityFilesWidgets2Doc)).toBe(false);
      expect(communities._isFilesWidget("Wa40586e8c231_4f6a_b38a_3cc267a7791e", communityFilesWidgets1Doc)).toBe(false);
    });
    
    it("should return false if no Files widgets are listed in the XML", function () {
      expect(communities._isFilesWidget("Wd618823ff5d0_405d_a103_e0016e796d24", communityWidgetsNoFilesDoc)).toBe(false);
      expect(communities._isFilesWidget("Wa40586e8c231_4f6a_b38a_3cc267a7791e", communityWidgetsNoFilesDoc)).toBe(false);
    });
  });
});
