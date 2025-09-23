/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.util.XSLCacheSpec");

dojo.require("lconn.core.util._XSLCache");
dojo.require("lconn.core.xslt");
dojo.require("dojo.cache");

dojo.declare("lconn.test.jasmine.util.XSLCacheSpec", lconn.core.util._XSLCache, {
   xslStrings : {
      "activities.xsl" : {
         templatePath : dojo.moduleUrl("lconn.test", "templates/activities.xsl")
      },
      "files.xsl" : {
         templatePath : dojo.moduleUrl("lconn.test", "templates/files.xsl")
      },
      "malformed.xsl" : {
         templatePath : dojo.moduleUrl("lconn.test", "templates/malformed.xsl")
      }
   }
});

(function(XSLCache) {

   var ACTIVITIES_XSL_DOC = lconn.core.xslt.loadXslString(dojo.cache("lconn.test", "templates/activities.xsl"));
   var FILES_XSL_DOC = lconn.core.xslt.loadXslString(dojo.cache("lconn.test", "templates/files.xsl"));

   var cache;
   beforeEach(function() {
      cache = new XSLCache();
   });
   describe("the interface of lconn.core.util._XSLCache", function() {
      it("implements the expected methods", function() {
         expect(cache.getXslDoc).toEqual(jasmine.any(Function));
      });
   });

   describe("the method lconn.core.util._XSLCache.getXslDoc()", function() {
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
         spyOn(lconn.core.xslt, "loadXslString");
         cache.getXslDoc("files.xsl");
         expect(lconn.core.xslt.loadXslString).not.toHaveBeenCalled();
      });
   });

}(lconn.test.jasmine.util.XSLCacheSpec));
