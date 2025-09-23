/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/cache",
      "dojo/text!../templates/activities.xsl",
      "dojo/text!../templates/files.xsl",
      "ic-core/util/_XSLCache",
      "ic-core/xslt"
], function(declare, cacheModule, templateActivities, templateFiles, _XSLCache, xslt) {

   var XSLCacheImpl = declare("ic-test.util.XSLCacheSpec", _XSLCache, {
      xslStrings : {
         "activities.xsl" : {
            templatePath : dojo.moduleUrl("ic-test", "templates/activities.xsl")
         },
         "files.xsl" : {
            templatePath : dojo.moduleUrl("ic-test", "templates/files.xsl")
         },
         "malformed.xsl" : {
            templatePath : dojo.moduleUrl("ic-test", "templates/malformed.xsl")
         }
      }
   });

   var ACTIVITIES_XSL_DOC = xslt.loadXslString(templateActivities);
   var FILES_XSL_DOC = xslt.loadXslString(templateFiles);

   describe("the ic-core/util/_XSLCache class", function() {
      var cache;
      beforeEach(function() {
         cache = new XSLCacheImpl();
      });
      describe("the interface", function() {
         it("implements the expected methods", function() {
            expect(cache.getXslDoc).toEqual(jasmine.any(Function));
         });
      });

      describe("the method getXslDoc()", function() {
         it("returns the expected XSL documents", function() {
            expect(cache.getXslDoc("files.xsl").documentElement.outerHTML).toEqual(FILES_XSL_DOC.documentElement.outerHTML);
            expect(cache.getXslDoc("activities.xsl").documentElement.outerHTML).toEqual(ACTIVITIES_XSL_DOC.documentElement.outerHTML);
         });

         it("returns null if xslStrings does not contain the requested XSL", function() {
            expect(cache.getXslDoc("foo.xsl")).toBeNull();
         });

         it("returns null if the requested XSL is malformed", function() {
            expect(cache.getXslDoc("malformed.xsl")).toBeNull();
         });

         it("fetches from the cache when invoked twice", function() {
            cache.getXslDoc("files.xsl");
            spyOn(xslt, "loadXslString");
            cache.getXslDoc("files.xsl");
            expect(xslt.loadXslString).not.toHaveBeenCalled();
         });
      });
   });
});
