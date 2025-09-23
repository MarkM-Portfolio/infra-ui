/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for ic-core/url
 * 
 * @module ic-test.urlSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */

define([
      "dojo/_base/lang",
      "ic-core/config/services",
      "ic-core/url"
], function(lang, services, url) {

   describe("the interface of ic-core/url", function() {
      it("implements the expected methods", function() {
         expect(lang.isFunction(url.parse)).toBeTruthy();
         expect(lang.isFunction(url.write)).toBeTruthy();
         expect(lang.isFunction(url.rewrite)).toBeTruthy();
         expect(lang.isFunction(url.canonicalize)).toBeTruthy();
         expect(lang.isFunction(url.getRequestParameters)).toBeTruthy();
         expect(lang.isFunction(url.getServiceUrl)).toBeTruthy();
         expect(lang.isFunction(url.splitQuery)).toBeTruthy();
         expect(lang.isFunction(url.ensureQualified)).toBeTruthy();
         expect(lang.isFunction(url.writeParameters)).toBeTruthy();
      });
   });

   describe("the method parse()", function() {
      it("returns null if the argument is null", function() {
         expect(url.parse()).toBeNull();
         expect(url.parse(null)).toBeNull();
      });
      it("throws if either argument is not a string", function() {
         expect(function() {
            url.parse(1);
         }).toThrow();
         expect(function() {
            url.parse(1, 2);
         }).toThrow();
         expect(function() {
            url.parse('1', 2);
         }).toThrow();
         expect(function() {
            url.parse(1, '2');
         }).toThrow();
      });
      it("parses the URL argument correctly - one argument", function() {
         var u = url.parse('http://www.ibm.com/search/do?a=%3D&c=d&c=e');
         expect(u.scheme).toBe('http');
         expect(u.authority).toBe('www.ibm.com');
         expect(u.host).toBe('www.ibm.com');
         expect(u.port).toBe(null);
         expect(u.path).toBe('/search/do');
         expect(u.query).toBe('a=%3D&c=d&c=e');
         // Note we're using toEqual() which checks equivalence, and not toBe()
         // which checks identity
         expect(u.queryParameters).toEqual({
            a : '=',
            c : [
                  'd',
                  'e'
            ]
         });
      });
      it("parses the URL argument correctly - two arguments", function() {
         var u = url.parse('http://www.ibm.com/search/do?a=%3D&c=d&c=e', 'more?a=1&c=a&c=b');
         expect(u.scheme).toBe('http');
         expect(u.authority).toBe('www.ibm.com');
         expect(u.host).toBe('www.ibm.com');
         expect(u.port).toBe(null);
         expect(u.path).toBe('/search/more');
         expect(u.query).toBe('a=1&c=a&c=b');
         // Note we're using toEqual() which checks equivalence, and not toBe()
         // which checks identity
         expect(u.queryParameters).toEqual({
            a : '1',
            c : [
                  'a',
                  'b'
            ]
         });
      });
   });

   describe("the method write()", function() {
      it("returns null if the argument is null", function() {
         expect(url.write()).toBeNull();
         expect(url.write(null)).toBeNull();
      });
      it("writes the URL argument correctly", function() {
         // Test idempotence
         var u = 'http://www.ibm.com/home?a=1&b=2#foo';
         expect(url.write(url.parse(u))).toBe(u);
      });
   });

   describe("the method rewrite()", function() {
      it("adds and replaces params in a URL", function() {
         // Add and replace
         var u = url.rewrite('http://www.ibm.com/home?a=1&b=2', {
            a : 3,
            b : 4,
            c : 5
         });
         expect(u).toBe('http://www.ibm.com/home?a=3&b=4&c=5');
      });
      it("returns the first argument if you do not pass the second argument", function() {
         // Nothing to do
         var u = url.rewrite('http://www.ibm.com/home');
         expect(u).toBe('http://www.ibm.com/home');
      });
      it("accepts an array to set or replace multivalue URL parameters", function() {
         // Array
         var u = url.rewrite('http://www.ibm.com?a=1', {
            a : [
                  2,
                  3
            ]
         });
         expect(u).toBe('http://www.ibm.com?a=2&a=3');
      });
      it("URI encodes values of URL parameters", function() {
         // URI encoded
         var u = url.rewrite('http://www.ibm.com', {
            b : '%'
         });
         expect(u).toBe('http://www.ibm.com?b=%25');

         u = url.rewrite('http://www.ibm.com', {
            b : '!@#$%^&*()_+=-[]{}|\'";:'
         });
         expect(u).toBe("http://www.ibm.com?b=!%40%23%24%25%5E%26*()_%2B%3D-%5B%5D%7B%7D%7C'%22%3B%3A");
      });
   });

   describe("the method splitQuery()", function() {
      it("splits the query params from the URL correctly", function() {
         expect(url.splitQuery('?debug=true&a=foo&b=3')).toEqual({
            debug : "true",
            a : "foo",
            b : "3"
         });
      });
   });

   describe("the method writeParameters()", function() {
      it("returns the list of params to paste on the URL from an object", function() {
         var u = {
            debug : "true",
            a : "foo",
            b : "3"
         };
         expect(url.writeParameters(u)).toBe('?debug=true&a=foo&b=3');
      });
   });

   describe("the method canonicalize()", function() {
      it("canonicalizes the URL argument correctly", function() {
         // Wikis
         var u = url.canonicalize('http://www.ibm.com/wikis/home?lang=en#!/wiki/abc/page/def', 'wikis');
         expect(u).toBe('http://www.ibm.com/wikis/home/wiki/abc/page/def?lang=en');
         // Files
         u = url.canonicalize('http://www.ibm.com/files/app/#/file/abcdef', 'files');
         // Note the // is intended, as RFC 3986 doesn't mandate to collapse it
         expect(u).toBe('http://www.ibm.com/files/app//file/abcdef');
         // Other
         var w = 'http://www.ibm.com/communities/community/connuidev?a=1';
         u = url.canonicalize(w, 'communities');
         expect(u).toBe(w);
      });
   });

   describe("the method getServiceUrl()", function() {
      var _deploymentConfig;
      beforeEach(function() {
         _deploymentConfig = lang.clone(services.deploymentConfig);
      });
      afterEach(function() {
         services.deploymentConfig = _deploymentConfig;
      });
      it("returns null if the argument is null", function() {
         expect(url.getServiceUrl()).toBeNull();
      });
      it("returns the service URL - same security as location", function() {
         expect(url.getServiceUrl(services.deploymentConfig).toString()).toBe(location.href.indexOf('https:') === 0 ? services.deploymentConfig.secureUrl
               : services.deploymentConfig.url);
      });
      /*
      // DBell - 27 Aug 2021 - disabling test for non-http connections
      it("returns the service URL - force insecure", function() {
         expect(url.getServiceUrl(services.deploymentConfig, false).toString()).toBe(services.deploymentConfig.url);
      });
      // DBell - 27 Aug 2021 - disabling test for non-http connections
      it("returns the service URL - force insecure, insecure unavailable", function() {
         delete services.deploymentConfig.url;
         expect(url.getServiceUrl(services.deploymentConfig, false).toString()).toBe(services.deploymentConfig.secureUrl);
      });
      */
      it("returns the service URL - force secure", function() {
         expect(url.getServiceUrl(services.deploymentConfig, true).toString()).toBe(services.deploymentConfig.secureUrl);
      });
      it("returns the service URL - force secure, secure unavailable", function() {
         delete services.deploymentConfig.secureUrl;
         expect(url.getServiceUrl(services.deploymentConfig, true).toString()).toBe(services.deploymentConfig.url);
      });
      it("returns null if both secure and insecure unavailable", function() {
         delete services.deploymentConfig.url;
         delete services.deploymentConfig.secureUrl;
         expect(url.getServiceUrl(services.deploymentConfig)).toBeNull();
      });
      it("returns null if both secure and insecure unavailable - force secure", function() {
         delete services.deploymentConfig.url;
         delete services.deploymentConfig.secureUrl;
         expect(url.getServiceUrl(services.deploymentConfig, true)).toBeNull();
      });
   });

   describe("the method getRequestParameters()", function() {
      it("returns an empty object if the argument is null", function() {
         expect(url.getRequestParameters()).toEqual({});
         expect(url.getRequestParameters(null)).toEqual({});
      });
      it("returns key/value pairs from the URL's query string - no query string", function() {
         expect(url.getRequestParameters("http://www.example.com")).toEqual({});
      });
      it("returns key/value pairs from the URL's query string - empty query string", function() {
         expect(url.getRequestParameters("http://www.example.com?")).toEqual({});
      });
      it("returns key/value pairs from the URL's query string - multivalue", function() {
         expect(url.getRequestParameters("http://www.example.com?a=1&a=2&a=3")).toEqual({
            a : [
                  '1',
                  '2',
                  '3'
            ]
         });
      });
      it("returns key/value pairs from the URL's query string - single", function() {
         expect(url.getRequestParameters("http://www.example.com?foo=bar&bar=baz")).toEqual({
            foo : 'bar',
            bar : 'baz'
         });
      });
      it("returns key/value pairs from the URL's query string - no values", function() {
         expect(url.getRequestParameters("http://www.example.com?foo&bar")).toEqual({
            foo : '',
            bar : ''
         });
      });
      it("returns key/value pairs from the URL's query string - mixed", function() {
         expect(url.getRequestParameters("http://www.example.com?foo=bar&a=1&a=2&a=3&b")).toEqual({
            foo : 'bar',
            a : [
                  '1',
                  '2',
                  '3'
            ],
            b : ''
         });
      });
   });

   describe("the method ensureQualified()", function() {
      it("throws if the argument is null", function() {
         expect(function() {
            url.ensureQualified();
         }).toThrow();
         expect(function() {
            url.ensureQualified(null);
         }).toThrow();
      });
      it("returns a qualified URL based on current location", function() {
         // FIXME: replace dojo._Url with require.toUrl() once made to work
         // according to spec
         expect(url.ensureQualified('foo')).toBe(new dojo._Url(location.href, 'foo').toString());
      });
   });
});
