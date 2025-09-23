/* Copyright IBM Corp. 2015  All Rights Reserved.          */

define([
  "ic-share/fileviewer/widget/DropDownMenuButton",
  "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings",
  "dojo/_base/lang",
  "dijit/MenuSeparator"
], function (DropDownMenuButton, i18n, lang, MenuSeparator) {
  "use strict";

  describe("ic-share/fileviewer/widget/DropDownMenuButton", function () {

    var defaultGroupId = 0;
    var spyMethod = jasmine.createSpy();
    var createSampleItem = function(name, groupId) {
      return {
        name: name,
        groupId: (groupId !== undefined) ? groupId : defaultGroupId,
        watch: spyMethod
      };
    };

    var sampleClassName = "sample-class";
    var sampleItem = createSampleItem("name");
    var sampleItems = [
      createSampleItem("name1", 0),
      createSampleItem("name2", 1),
      createSampleItem("name3", 2)
    ];
    var sampleItemsSameGroup = [
      createSampleItem("name1"),
      createSampleItem("name2"),
      createSampleItem("name3")
    ];
    var sampleItemsSameGroup1 = [
      createSampleItem("name1", 1),
      createSampleItem("name2", 1),
      createSampleItem("name3", 1)
    ];
   
    describe("constructor", function () {
      it("should create our wrapping version of the dijit drop-down menu button with no items and all of the appropriate properties set", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton).not.toBeFalsy();
        expect(dropDownMenuButton._items.length).toBe(0);
        expect(dropDownMenuButton._menuItems.length).toBe(0);
        expect(dropDownMenuButton._currentItemGroupId).toBe(0);
        expect(dropDownMenuButton._subMenu.className).toBeUndefined();
        expect(dropDownMenuButton._popupMenu).not.toBeFalsy();
        expect(dropDownMenuButton._popupMenu.showLabel).toBeFalsy();
        expect(dropDownMenuButton._popupMenu.dropDown).toBe(dropDownMenuButton._subMenu);
      });
      
      it("should create our wrapping version of the dijit drop-down menu button with no items and the NLS strings set", function () {
        var dropDownMenuButton = new DropDownMenuButton({
          nls: i18n.MORE_ACTIONS
        });
        expect(dropDownMenuButton.nls).toBe(i18n.MORE_ACTIONS);
        expect(dropDownMenuButton._popupMenu.label).toBe(i18n.MORE_ACTIONS.TITLE);
      });
      
      it("should create our wrapping version of the dijit drop-down menu button with no additional submenu customizations and no items", function () {
        var dropDownMenuButton = new DropDownMenuButton({});
        expect(dropDownMenuButton._subMenu.className).toBeUndefined();
      });
      
      it("should create our wrapping version of the dijit drop-down menu button with some additional submenu customization(s) and no items", function () {
        var dropDownMenuButton = new DropDownMenuButton({
          subMenu: {
            className: sampleClassName
          }
        });
        expect(dropDownMenuButton._subMenu.className).toBe(sampleClassName);
      });
      
      it("should create our wrapping version of the dijit drop-down menu button with one set of incorrect additional submenu customization(s) and no items", function () {
        var dropDownMenuButton = new DropDownMenuButton({
          subMenu: {
            classname: sampleClassName // Incorrect capitalization here
          }
        });
        expect(dropDownMenuButton._subMenu.className).toBeUndefined();
      });
      
      it("should create our wrapping version of the dijit drop-down menu button with another set of incorrect additional submenu customization(s) and no items", function () {
        var dropDownMenuButton = new DropDownMenuButton({
          submenu: { // Incorrect capitalization here
            className: sampleClassName
          }
        });
        expect(dropDownMenuButton._subMenu.className).toBeUndefined();
      });
      
      it("should create our wrapping version of the dijit drop-down menu button with no additional submenu customizations, and an empty set of items being passed in", function () {
        var dropDownMenuButton = new DropDownMenuButton({
          items: []
        });
        expect(dropDownMenuButton._menuItems.length).toBe(0);
      });
      
      it("should create our wrapping version of the dijit drop-down menu button with no additional submenu customizations, and a set of some items being passed in", function () {
        var dropDownMenuButton = new DropDownMenuButton({
          items: sampleItemsSameGroup
        });
        expect(dropDownMenuButton._items).toBe(sampleItemsSameGroup);
        expect(dropDownMenuButton._menuItems.length).toBe(3); // Cannot compare items directly since they are MenuItems, or could be of any internal representation, so just check that the amount is consistent.
      });
    });

    describe("addMenuItem", function () {
      it("should allow items to be added from the API, after the object has been created", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._menuItems.length).toBe(0);
        dropDownMenuButton.addMenuItem(sampleItem);
        expect(dropDownMenuButton._menuItems.length).toBe(1);
      });
      it("should allow items to be added from the API, after the object has been created, twice", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._menuItems.length).toBe(0);
        dropDownMenuButton.addMenuItem(sampleItem);
        expect(dropDownMenuButton._menuItems.length).toBe(1);
        dropDownMenuButton.addMenuItem(sampleItem);
        expect(dropDownMenuButton._menuItems.length).toBe(2);
      });
    });
    
    describe("addMenuItems", function () {
      var menuSeparatorDeclaredClassName = "dijit.MenuSeparator";
      it("should allow items to be added from the API, after the object has been created, in batch", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._menuItems.length).toBe(0);
        dropDownMenuButton.addMenuItems(sampleItemsSameGroup);
        expect(dropDownMenuButton._menuItems.length).toBe(3);
      });
      it("should allow items to be added from the API, after the object has been created, in batch, twice", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._menuItems.length).toBe(0);
        dropDownMenuButton.addMenuItems(sampleItemsSameGroup);
        expect(dropDownMenuButton._menuItems.length).toBe(3);
        dropDownMenuButton.addMenuItems(sampleItemsSameGroup);
        expect(dropDownMenuButton._menuItems.length).toBe(6);
      });
      it("should add items only in a single group, with no MenuSeparator objects", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._currentItemGroupId).toBe(0);
        dropDownMenuButton.addMenuItems(sampleItemsSameGroup);
        expect(dropDownMenuButton._currentItemGroupId).toBe(0);
      });
      it("should add items only in a single group, with no MenuSeparator objects (especially at the beginning), when an entire group (by id) is 'skipped' since no items are present in that group", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._currentItemGroupId).toBe(0);
        dropDownMenuButton.addMenuItems(sampleItemsSameGroup1);
        expect(dropDownMenuButton._menuItems[0].declaredClass).not.toBe(menuSeparatorDeclaredClassName);
        expect(dropDownMenuButton._currentItemGroupId).toBe(1);
      });
      it("should add items in 3 different groups, separated by a MenuSeparator object", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._currentItemGroupId).toBe(0);
        dropDownMenuButton.addMenuItems(sampleItems);
        expect(dropDownMenuButton._currentItemGroupId).toBe(2);
        expect(dropDownMenuButton._menuItems[1].declaredClass).toBe(menuSeparatorDeclaredClassName);
        expect(dropDownMenuButton._menuItems[3].declaredClass).toBe(menuSeparatorDeclaredClassName);
      });
      it("should add items in 3 different groups, separated by a MenuSeparator object, twice, not adding any more groups during the second pass since they are the same group ids that aren't any higher than the intenral current marker", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._currentItemGroupId).toBe(0);
        dropDownMenuButton.addMenuItems(sampleItems);
        expect(dropDownMenuButton._currentItemGroupId).toBe(2);
        dropDownMenuButton.addMenuItems(sampleItems);
        expect(dropDownMenuButton._currentItemGroupId).toBe(2);
        expect(dropDownMenuButton._menuItems[1].declaredClass).toBe(menuSeparatorDeclaredClassName);
        expect(dropDownMenuButton._menuItems[3].declaredClass).toBe(menuSeparatorDeclaredClassName);
      });
      it("should add items in different groups, separated by *distinct* MenuSeparator objects, so the widget does not have problems being destroyed and re-created", function () {
        var dropDownMenuButton = new DropDownMenuButton(), dropDownMenuButton2;
        expect(dropDownMenuButton._currentItemGroupId).toBe(0);
        dropDownMenuButton.addMenuItems(sampleItems);
        expect(dropDownMenuButton._currentItemGroupId).toBe(2);
        expect(dropDownMenuButton._menuItems[1]).not.toBe(dropDownMenuButton._menuItems[3]);
        
        dropDownMenuButton2 = new DropDownMenuButton();
        dropDownMenuButton2.addMenuItems(sampleItems);
        expect(dropDownMenuButton2._currentItemGroupId).toBe(2);
        expect(dropDownMenuButton2._menuItems[1]).not.toBe(dropDownMenuButton2._menuItems[3]);
        
        expect(dropDownMenuButton._menuItems[1]).not.toBe(dropDownMenuButton2._menuItems[1]);
      });
    });

    describe("_setupPopupMenu", function () {
      it("should allow to be 'setup' again by adding the same drop-down menu with no functional difference besides refreshing", function () {
        var dropDownMenuButton = new DropDownMenuButton();
        expect(dropDownMenuButton._popupMenu).not.toBeFalsy();
        var previousPopupMenu = dropDownMenuButton._popupMenu;
        dropDownMenuButton._setupPopupMenu();
        expect(dropDownMenuButton._popupMenu).not.toBeFalsy();
        expect(dropDownMenuButton._popupMenu).not.toBe(previousPopupMenu);
      });
    });
    
    describe("getClassName", function () {
      var dropDownMenuButton;
      beforeEach(function () {
        dropDownMenuButton = new DropDownMenuButton();
      });
      it("should return the classname to use for the main drop-down menu button's style", function () {
        expect(dropDownMenuButton.getClassName()).not.toBeFalsy();
      });
    });
    describe("getIconClassName", function () {
       var dropDownMenuButton;
       beforeEach(function () {
         dropDownMenuButton = new DropDownMenuButton();
       });
       it("should return the classname to use as the main drop-down menu button's icon", function () {
         expect(dropDownMenuButton.getIconClassName()).not.toBeFalsy();
       });
    });
  });
});
