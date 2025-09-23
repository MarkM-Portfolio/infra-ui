/* Copyright IBM Corp. 2015  All Rights Reserved.          */

define([
  "ic-share/fileviewer/widget/ToolbarDivider",
  "dojo/_base/lang"
], function (ToolbarDivider, lang) {
  "use strict";

  describe("ic-share/fileviewer/widget/ToolbarDivider", function () {

    describe("<static properties>", function () {
      it("should define our custom ToolbarDivider appropriately with the appropriate action attributes (with details in the spec test definition)", function () {
        // This divider is built to only be used in the main File Viewer action toolbar,
        // and not in the drop-down which has its own separator functionality.
        expect(ToolbarDivider.isSubItem).toBeFalsy();
        // Same as above, but this flag currently acts in a 'force' nature, so it is
        // more vital than "isSubItem", since that activate at certain times
        // depending on the total number of actions added so far.
        expect(ToolbarDivider.isSticky).toBeTruthy();
        // This divider is not an actual action class that defines an icon to click on,
        // and should not add to the total by prematurely increasing that value,
        // which would cause other actions following this one in the list of actions
        // to add, *not* to fall into the drop-down menu earlier than they should. 
        expect(ToolbarDivider.realAction).toBeFalsy();
      });
    });

    describe("create", function () {
      it("should create our custom ToolbarDivider with the HTML template correctly set to mimic the other action items' HTML", function () {
        var toolbarDivider = ToolbarDivider.create();
        expect(toolbarDivider).not.toBeFalsy();
        expect(toolbarDivider.domNode).not.toBeFalsy();
        expect(toolbarDivider.templateString.indexOf("<li") > -1).toBeTruthy();
      });
    });
      
    describe("isValid", function () {
      it("should always return true since this widget will only be used explicitly in the actions list when needed", function () {
        expect(ToolbarDivider.isValid()).toBeTruthy();
      });
    });
    
    describe("getClassName", function () {
      it("should return the classname to use for the divider's style", function () {
        expect(ToolbarDivider.getClassName()).not.toBeFalsy();
      });
    });
  });
});
