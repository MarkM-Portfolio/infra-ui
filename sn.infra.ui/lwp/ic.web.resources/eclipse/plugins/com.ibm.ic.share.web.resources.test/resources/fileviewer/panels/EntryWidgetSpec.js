/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
  "ic-share/fileviewer/panels/EntryWidget",
  "dojo/dom-class",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "dojo/query",
  "ic-share/fileviewer/config/globals",
  "dijit/Dialog"
], function (EntryWidget, domClass, domConstruct, lang, query, globals, Dialog) {
  "use strict";

  describe("EntryWidget", function () {
    it("should add classes for each action", function () {
      var widget = new EntryWidget({
        actions: [ "foo" ]
      });

      expect(domClass.contains(widget.actionContainer, "foo")).toBeTruthy();
    });

    describe("setUserName", function () {
      beforeEach(function () {
        this.fixture = domConstruct.create("div");
        this.globals = lang.clone(globals);
        this.widget = new EntryWidget();
      });

      afterEach(function () {
        lang.mixin(globals, this.globals);
      });

      it("should set a plain-text name by default", function () {
        this.widget.setUserName({
          id: "123",
          name: "Thomas Watson"
        }, this.fixture);

        expect(query("span", this.fixture)[0].innerHTML.slice(-"Thomas Watson".length)).toEqual("Thomas Watson");
        expect(query("span", this.fixture)[1].innerHTML).toEqual("123");
      });
    });
    
    describe("createDialg", function () {
      beforeEach(function () {
        this.fixture = domConstruct.create("div");
        this.globals = lang.clone(globals);
        this.widget = new EntryWidget();
      });

      afterEach(function () {
        lang.mixin(globals, this.globals);
      });
      it("should create a dialog with a given factory", function () {
        this.widget.DialogFactory = Dialog;
        this.widget.createDialog();
        
        expect(this.widget.dialog).toBeDefined();
      });
    });
    
    describe("hover in and out functions", function () {
      beforeEach(function () {
        this.fixture = domConstruct.create("div");
        this.globals = lang.clone(globals);
        this.widget = new EntryWidget();
      });

      afterEach(function () {
        lang.mixin(globals, this.globals);
      });
      it("should add the hover class on mouse over", function () {
        this.widget.mouseOver();
        
        expect(domClass.contains(this.widget.domNode, "hover")).toBe(true);
      });
      
      it("should remove the hover class on mouse out", function () {
        
        domClass.add(this.widget.domNode, "hover");
        this.widget.mouseOut();
        
        expect(domClass.contains(this.widget.domNode, "hover")).toBe(false);
      });
    });
  });
});
