/* Copyright IBM Corp. 2014, 2105  All Rights Reserved.              */

/**
 * Jasmine spec for ic-ui.util.css
 * 
 * @module ic-test.ui.util.cssSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
      "ic-ui/util/css",
      "dojo/dom-construct",
      "dojo/query"
], function(cssUtil, domConstruct, query) {

   return;
//   describe('ic-ui/util/css', function() {
//      var tag;
//      beforeEach(function() {
//         tag = domConstruct.create('style', {
//            innerHTML : '.fooBar { color : #f00; } '
//         }, document.body);
//      });
//      afterEach(function() {
//         document.body.removeChild(tag);
//      });
//
//      it('exposes the expected methods', function() {
//         expect(cssUtil.getRule).toEqual(jasmine.any(Function));
//         expect(cssUtil.addRule).toEqual(jasmine.any(Function));
//         expect(cssUtil.deleteRule).toEqual(jasmine.any(Function));
//      });
//
//      it('the method getRule() can find rules', function() {
//         expect(cssUtil.getRule('.fooBar')).not.toBeNull();
//         expect(cssUtil.getRule('.fooBar').style.color).toBe('rgb(255, 0, 0)');
//         expect(cssUtil.getRule('.idontexist')).toBeFalsy();
//      });
//
//      it('the method addRule() adds rules', function() {
//         expect(cssUtil.addRule('.bazBaz')).not.toBeNull();
//         expect(cssUtil.getRule('.bazBaz')).not.toBeNull();
//         expect(cssUtil.deleteRule('.bazBaz')).toBeTruthy();
//      });
//
//      it('the method deleteRule() find and deletes rules', function() {
//         expect(cssUtil.deleteRule('.fooBar')).toBeTruthy();
//         expect(cssUtil.getRule('.fooBar')).toBeFalsy();
//         expect(cssUtil.deleteRule('.fooBar')).toBeFalsy();
//      });
//
//      it('the method addStylesheet() can add a stylesheet', function() {
//         var ID1 = "ic.fileviewer.css.fileviewer.css", ID2 = "ic.fileviewer/css/fileviewer.css";
//
//         cssUtil.addStylesheet(ID1);
//
//         var links = query("head>link[id='icStyle_" + ID1 + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         links = query("head>link[href*='include=" + encodeURIComponent(ID1) + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         // Adding the stylesheet again has no effect
//         cssUtil.addStylesheet(ID1);
//
//         links = query("head>link[href*='include=" + encodeURIComponent(ID1) + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         cssUtil.addStylesheet(ID2);
//
//         links = query("head>link[id='icStyle_" + ID2 + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         links = query("head>link[href*='include=" + encodeURIComponent(ID2) + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         // Adding the stylesheet again has no effect
//         cssUtil.addStylesheet(ID2);
//
//         links = query("head>link[id='icStyle_" + ID2 + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         links = query("head>link[href*='include=" + encodeURIComponent(ID2) + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//      });
//
//      it('the method removeStylesheet() can remove a stylesheet', function() {
//         var ID1 = "ic.fileviewer.css.fileviewer.css", ID2 = "ic.fileviewer/css/fileviewer.css";
//
//         cssUtil.addStylesheet(ID1);
//
//         var links = query("head>link[id='icStyle_" + ID1 + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         // Removing the stylesheet
//         cssUtil.removeStylesheet(ID1);
//
//         links = query("head>link[id='icStyle_" + ID1 + "']");
//         expect(links).not.toBeNull();
//         expect(links.length).toBe(0);
//
//         cssUtil.addStylesheet(ID2);
//
//         links = query("head>link[id='icStyle_" + ID2 + "']");
//         expect(links).not.toBeNull();
//         expect(links.length > 0).toBeTruthy();
//         expect(links.length).toBe(1);
//
//         // Removing the stylesheet
//         cssUtil.removeStylesheet(ID2);
//
//         links = query("head>link[id='icStyle_" + ID2 + "']");
//         expect(links).not.toBeNull();
//         expect(links.length).toBe(0);
//      });
//   });
});
