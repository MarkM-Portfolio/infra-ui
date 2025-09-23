/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.mentions.URLPreviewMixinSpec");

dojo.require("lconn.core.widget.mentions.URLPreviewMixin");

(function(mixin) {
   describe("the URLPreviewMixin mixin", function() {
      var m = new lconn.core.widget.mentions.URLPreviewMixin();
      it("implements the expected methods", function() {
         expect(dojo.isFunction(m.detectURL)).toBeTruthy();
         expect(dojo.isFunction(m.removeURLPreview)).toBeTruthy();
      });
   });

   describe("a module implementing the URLPreviewMixin mixin", function() {
      var m, t;
      beforeEach(function() {
         m = new lconn.core.widget.mentions.URLPreviewMixin();
         t = dojo.doc
               .createTextNode("There's this famous search engine called http://www.google.com, but I prefer to use the more secure http://duckduckgo.com.")
      })
      it("can detect URLs in a text node correctly if disableURLPreview is false", function() {
         m.disableURLPreview = false;
         m.textAreaNode = dojo.doc.createElement('div', {
            contentEditable : true
         });
         m.textAreaNode.appendChild(t);
         // FIXME: this method has a side effect of incrementing the value of
         // _idx
         m._idx = 0;
         // FIXME: this method assumes there's a member array _trackedMentions
         m._trackedMentions = [];
         var ret = m.detectURL(t);
         // FIXME: not sure what to expect here?
         expect(ret).not.toBeNull();
      });
      it("doesn't throw errors when mixed into an object that doesn't have a textAreaNode member", function() {
         m.disableURLPreview = false;
         expect(m.detectURL(t)).toBe(t);
      });
      it("returns the original text node if disableURLPreview is true", function() {
         expect(m.detectURL(t)).toBe(t);
      });
      it("removes the URL Preview without errors", function() {
         expect(function() {
            m.removeURLPreview();
         }).not.toThrow();

         var _urlPreview = m._urlPreview = jasmine.createSpyObj('urlpreview', [ 'destroy'
         ]);
         var _urlPreviewNode = m._urlPreviewNode = {};
         m.removeURLPreview();
         expect(_urlPreview.destroy).toHaveBeenCalled();
         expect(_urlPreviewNode.hasPreview).toBeFalsy();
         expect(_urlPreviewNode.previewNode).toBeNull();
      });
   });

   describe("the URLPreviewMixin mixin",
      function() {
         var m;
         beforeEach(function() {
            m = new lconn.core.widget.mentions.URLPreviewMixin();
         })
         it("can match a URL at the beginning of a string", function() {
            var r = m.matchURL("http://www.ibm.com is the bluest website on earth");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('http://www.ibm.com');
         });
         it("can match a URL at the end of a string", function() {
            var r = m.matchURL("You should visit http://www.ibm.com");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('http://www.ibm.com');
         });
         it("can match multiple URLs anywhere in a string", function() {
            var r = m.matchURL("Most people use http://www.google.com, but I prefer the more secure http://duckduckgo.com.");
            expect(r).not.toBeNull();
            expect(r.length).toBe(2);
            expect(r[0]).toBe('http://www.google.com');
            expect(r[1]).toBe('http://duckduckgo.com');
         });
         it("matches a string made by a URL alone", function() {
            var r = m.matchURL("http://www.yahoo.com");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('http://www.yahoo.com');
         });
         it("matches a URL surrounded by invisible spaces", function() {
            var r = m.matchURL("\u200Bhttp://www.yahoo.com");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('http://www.yahoo.com');

            r = m.matchURL("http://www.yahoo.com\u200B");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('http://www.yahoo.com');

            r = m.matchURL("\u200Bhttp://www.yahoo.com\u200B");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('http://www.yahoo.com');
         });
         it("matches a URL with a query string", function() {
            var r = m.matchURL("The query string is not empty http://www.yahoo.com?yui=no and stuff");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('http://www.yahoo.com?yui=no');
         });
         it("matches multiple URLs with a query string",
            function() {
               var r = m
                     .matchURL("I found this on http://www.google.com?search=regexp&foo=bar so it must be true, although I couldn't find it on https://www.bing.com?search=regexp.");
               expect(r).not.toBeNull();
               expect(r.length).toBe(2);
               expect(r[0]).toBe('http://www.google.com?search=regexp&foo=bar');
               expect(r[1]).toBe('https://www.bing.com?search=regexp');
            });
         it("matches a URL that starts with www", function() {
            var r = m.matchURL("People normally copy and paste www.google.com/search and they expect it to be highlighted.");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('www.google.com/search');
         });
         it("matches a URL that starts with ftp", function() {
            var r = m.matchURL("Do we really need to preview stuff from ftp.linux.ibm.com ?");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('ftp.linux.ibm.com');
         });
         it("matches a URL with the ftp protocol", function() {
            var r = m.matchURL("I don't think we would preview stuff from ftp://claudio@ftp.linux.ibm.com ?");
            expect(r).not.toBeNull();
            expect(r.length).toBe(1);
            expect(r[0]).toBe('ftp://claudio@ftp.linux.ibm.com');
         });
         it("matches a URL with non-canonical port numbers",
            function() {
               var r = m
                     .matchURL("Development servers often use non standard ports like https://dubxcpvm803.mul.ie.ibm.com:9446/homepage or http://dubxcpvm803.mul.ie.ibm.com:9082/homepage");
               expect(r).not.toBeNull();
               expect(r.length).toBe(2);
               expect(r[0]).toBe('https://dubxcpvm803.mul.ie.ibm.com:9446/homepage');
               expect(r[1]).toBe('http://dubxcpvm803.mul.ie.ibm.com:9082/homepage');
            });
      });
}(lconn.core.widget.mentions.URLPreviewMixin));
