/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "dojo/_base/array",
   "ic-ui/util/fileViewerListener",
   "dojo/dom-construct",
   "dojo/_base/lang"
], function (array, fileViewerListener, domConstruct, lang) {
   
   var _require, 
   prevDef = function () { return true; },
   stopProp = function () { return true; },
   goodURL = "/files/app#/file/a0bd2831-5567-4dd3-8cbd-71d644cfc83d",
   badURL = "/foo/app#/bar/a0bd2831-5567-4dd3-8cbd-71d644cfc83d",
   goodAnchor = domConstruct.create("a", {href: goodURL, title: "validURL", innerHTML: "link"}),
   badAnchor = domConstruct.create("a", {href: badURL, title: "validURL", innerHTML: "link"}),
   badDiv = domConstruct.create("div"),
   goodLinkClick = {target: goodAnchor, button: 0, preventDefault: prevDef, stopPropagation: stopProp},
   badLinkClick = {target: badAnchor, button: 2, preventDefault: prevDef, stopPropagation: stopProp},
   goodRightClick = {target: goodAnchor, button: 2, preventDefault: prevDef, stopPropagation: stopProp},
   badRightClick = {target: badAnchor, button: 2, preventDefault: prevDef, stopPropagation: stopProp},
   badDivClick = {target: badDiv, button: 0, preventDefault: prevDef, stopPropagation: stopProp};
   

   describe("ic-core/util/fileViewerListener", function() {
      it("implements the expected methods", function() {
         expect(fileViewerListener.onClick).toEqual(jasmine.any(Function));
      });
   });

   describe("the function ic-core/util/fileViewerListener::isValid", function() {
      beforeEach(function () {
         spyOn(fileViewerListener, "openViewer").and.callFake(function () {
            return true;
         });
         
         spyOn(fileViewerListener, "isValid").and.callThrough();
         
         _require = lang.getObject("window.require");
         window.require = function (modules, callback) {
            return true;
         };
         
         spyOn(window, "require").and.callThrough();
         
      });
      it("returns true if target link can be parsed for an ID", function(done) {
         expect(fileViewerListener.isValid(goodLinkClick)).toBeTruthy();
         done();
      });
      it("returns false if target link cannot be parsed for an ID", function(done) {
         expect(fileViewerListener.isValid(badLinkClick)).toBeFalsy();
         done();
      });
      it("returns false if a good link was right-clicked", function (done) {
         expect(fileViewerListener.isValid(goodRightClick)).toBeFalsy();
         done();
      });
      it("returns false if a bad link was right-clicked", function (done) {
         expect(fileViewerListener.isValid(badRightClick)).toBeFalsy();
         done();
      });
      it("returns false if target does not have a link element", function(done) {
         expect(fileViewerListener.isValid(badDivClick)).toBeFalsy();
         done();
      });
      
   });
   
   describe("the function ic-core/util/fileViewerListener::openViewer", function() {
      beforeEach(function () {
         spyOn(fileViewerListener, "openViewer").and.callFake(function () {
            return true;
         });
         
         spyOn(fileViewerListener, "isValid").and.callThrough();
         
         _require = lang.getObject("window.require");
         window.require = function (modules, callback) {
            return true;
         };
         
         spyOn(window, "require").and.callThrough();
         
      });

      afterEach(function () {
         window.require = _require;
      });

      it("returns true if fileViewerListener::isValid was called from fileViewerListener::onClick", function(done) {
         fileViewerListener.onClick(goodLinkClick);
         expect(fileViewerListener.isValid).toHaveBeenCalled();
         done();
      });
      it("returns true if window::require was called", function(done) {
         fileViewerListener.onClick(goodLinkClick);
         expect(window.require).toHaveBeenCalled();
         done();
      });
      it("returns false if fileViewerListener::openViewer wasn't called", function(done) {
         fileViewerListener.onClick(badLinkClick);
         expect(fileViewerListener.openViewer).not.toHaveBeenCalled();
         done();
      });
      it("returns true if fileViewerListener::openViewer was called", function(done) {
         fileViewerListener._fileViewer = true;
         fileViewerListener.onClick(goodLinkClick);
         expect(fileViewerListener.openViewer).toHaveBeenCalled();
         done();
      });
   });
});
