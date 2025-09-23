/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([ "ic-core/CommonTags/AjaxCall"
],
   function(AjaxCall) {

      var JSON_TAGS_URL = './data/tagcloud_tags.json', JSON_TAGCOUNT_URL = './data/tagcloud_tagcount.json', JSON_TAGCOUNT_FLAT_URL = './data/tagcloud_tagcount_flat.json';

      describe("the AjaxCall class", function() {
         var ajaxCall;
         beforeEach(function() {
            ajaxCall = new AjaxCall();
         });
         it('implements the expected methods', function() {
            expect(ajaxCall.getTags).toEqual(jasmine.any(Function));
            expect(ajaxCall.redirect).toEqual(jasmine.any(Function));
            expect(ajaxCall.encodeTagParameter).toEqual(jasmine.any(Function));
            expect(ajaxCall.generateTagUrl).toEqual(jasmine.any(Function));
            expect(ajaxCall.generateTagParameters).toEqual(jasmine.any(Function));
            expect(ajaxCall.getTotalTagNumber).toEqual(jasmine.any(Function));
            expect(ajaxCall.getPageTags).toEqual(jasmine.any(Function));
            expect(ajaxCall.clearParamsFromUrl).toEqual(jasmine.any(Function));
         });

         describe("the getTags method", function() {
            var TAGS = [
                  'a',
                  'b',
                  'c'
            ];
            it("performs an XHR call", function() {
               spyOn(dojo, 'xhrGet');
               var cb = jasmine.createSpy('callback 1');
               ajaxCall.getTags(cb, undefined, TAGS);
               expect(dojo.xhrGet).toHaveBeenCalled();
               expect(cb).not.toHaveBeenCalled();
            });
            it("invokes the callback when the XHR call succeeds", function(done) {
               ajaxCall.TAG_URL = JSON_TAGS_URL;
               ajaxCall.HANDLE_AS = 'json';
               ajaxCall.URL_PARAMETERS = 'tag';
               var cb = jasmine.createSpy('callback 2');
               ajaxCall.getTags(function() {
                  cb();
                  expect(cb).toHaveBeenCalled();
                  done();
               }, undefined, TAGS);
            });
         });

         describe("the getPageTags method", function() {
            it("performs an XHR call", function() {
               spyOn(dojo, 'xhrGet');
               var cb = jasmine.createSpy('callback 1');
               ajaxCall.getPageTags(cb, 1, 100, 'abc');
               expect(dojo.xhrGet).toHaveBeenCalled();
               expect(cb).not.toHaveBeenCalled();
            });
            it("invokes the callback when the XHR call succeeds", function(done) {
               ajaxCall.TAG_URL = JSON_TAGS_URL;
               ajaxCall.HANDLE_AS = 'json';
               ajaxCall.URL_PARAMETERS = 'tag';
               var cb = jasmine.createSpy('callback 2');
               ajaxCall.getPageTags(function() {
                  cb();
                  expect(cb).toHaveBeenCalled();
                  done();
               }, 1, 100, 'abc');
            });
         });

         describe("the getTotalTagNumber method", function() {
            it("performs an XHR call", function() {
               spyOn(dojo, 'xhrGet');
               var cb = jasmine.createSpy('callback 1');
               ajaxCall.getTotalTagNumber(cb, 'abc');
               expect(dojo.xhrGet).toHaveBeenCalled();
               expect(cb).not.toHaveBeenCalled();
            });
            it("invokes the callback when the XHR call succeeds", function(done) {
               ajaxCall.TAG_URL = JSON_TAGCOUNT_URL;
               ajaxCall.HANDLE_AS = 'json';
               ajaxCall.URL_PARAMETERS = 'tag';
               var cb = jasmine.createSpy('callback 2');
               ajaxCall.getTotalTagNumber(function(response) {
                  cb(response);
                  expect(cb).toHaveBeenCalledWith(256);
                  done();
               }, 'abc');
            });
            it("invokes the callback when the XHR call succeeds - flat response", function(done) {
               ajaxCall.TAG_URL = JSON_TAGCOUNT_FLAT_URL;
               ajaxCall.HANDLE_AS = 'json';
               ajaxCall.URL_PARAMETERS = 'tag';
               var cb = jasmine.createSpy('callback 2');
               ajaxCall.getTotalTagNumber(function(response) {
                  cb(response);
                  expect(cb).toHaveBeenCalledWith(128);
                  done();
               }, 'abc');
            });
         });

         describe("the encodeTagParameter method", function() {
            it("splits the input string by spaces and joins URI encoded pieces again with spaces", function() {
               expect(ajaxCall.encodeTagParameter('abc')).toBe('abc');
               expect(ajaxCall.encodeTagParameter('@^%$&*')).toBe(encodeURIComponent('@^%$&*'));
               expect(ajaxCall.encodeTagParameter('abc def ghi')).toBe('abc def ghi');
               expect(ajaxCall.encodeTagParameter('@^%$&* *(^)& %^*$')).toBe(encodeURIComponent('@^%$&*') + ' ' + encodeURIComponent('*(^)&') + ' '
                     + encodeURIComponent('%^*$'));
            });
         });

         describe("the redirect method", function() {
            it("does nothing if the argument is null", function() {
               spyOn(ajaxCall, '_redirect');
               ajaxCall.redirect(null);
               expect(ajaxCall._redirect).toHaveBeenCalled();
            });
            it("does nothing with no arguments", function() {
               spyOn(ajaxCall, '_redirect');
               ajaxCall.redirect();
               expect(ajaxCall._redirect).toHaveBeenCalled();
            });
            it("assigns the window.location", function() {
               spyOn(ajaxCall, '_redirect');
               ajaxCall.redirect('foo');
               expect(ajaxCall._redirect).toHaveBeenCalled();
            });
         });
         it("assigns the window.location - URL with ?", function() {
            ajaxCall.REDIRECT_URL = 'bar?';
            spyOn(ajaxCall, '_redirect');
            ajaxCall.redirect('foo');
            expect(ajaxCall._redirect).toHaveBeenCalled();
         });

         describe("the generateTagUrl method", function() {
            it('appends a query string to a URL', function() {
               ajaxCall.URL_PARAMETERS = {
                  foo : 'bar',
                  baz : 'skip',
                  tags : 'ignored'
               };
               ajaxCall.TAG_TEMPLATE = 'tags';

               // FIXME:
               expect(ajaxCall.generateTagUrl(null)).toEqual('nullfoo=bar&baz=skip&');
               expect(ajaxCall.generateTagUrl('')).toEqual('foo=bar&baz=skip&');
               expect(ajaxCall.generateTagUrl('abc?')).toEqual('abc?foo=bar&baz=skip&');

               // FIXME:
               expect(ajaxCall.generateTagUrl(null, 'a b c')).toEqual('nullfoo=bar&baz=skip&tags=a b c');
               expect(ajaxCall.generateTagUrl('', 'a b c')).toEqual('foo=bar&baz=skip&tags=a b c');
               expect(ajaxCall.generateTagUrl('abc?', 'a b c')).toEqual('abc?foo=bar&baz=skip&tags=a b c');

               delete ajaxCall.URL_PARAMETERS;

               expect(ajaxCall.generateTagUrl(null)).toEqual(null);
               expect(ajaxCall.generateTagUrl('')).toEqual('');
               expect(ajaxCall.generateTagUrl('abc?')).toEqual('abc?');

               // FIXME:
               expect(ajaxCall.generateTagUrl(null, 'a b c')).toEqual('nulltags=a b c');
               expect(ajaxCall.generateTagUrl('', 'a b c')).toEqual('tags=a b c');
               expect(ajaxCall.generateTagUrl('abc?', 'a b c')).toEqual('abc?tags=a b c');
            });
         });

         describe("the clearParamsFromUrl method", function() {
            it("returns the part of URL before the ?", function() {
               expect(ajaxCall.clearParamsFromUrl('')).toBe('');
               expect(ajaxCall.clearParamsFromUrl('?')).toBe('');
               expect(ajaxCall.clearParamsFromUrl('a?b')).toBe('a');
            });
         });
      });
   });
