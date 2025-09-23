/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.oneui.test.jasmine.util.proxySpec");

dojo.require("com.ibm.oneui.util.proxy");

/**
 * @namespace com
 */
/**
 * @namespace com.ibm
 */
/**
 * @namespace com.ibm.oneui
 */
/**
 * @namespace com.ibm.oneui.test
 */
/**
 * @namespace com.ibm.oneui.test.jasmine
 */
/**
 * @namespace com.ibm.oneui.test.jasmine.util
 */
/**
 * Jasmine spec for com.ibm.oneui.util.proxy
 * 
 * @module com.ibm.oneui.test.jasmine.util.proxySpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(proxy) {
   var BASE_URL = dojo.config.proxy;

   describe('com.ibm.oneui.util.proxy', function() {
      it('is a function', function() {
         expect(dojo.isFunction(proxy)).toBeTruthy();
      });
   });

   describe('the method com.ibm.oneui.util.proxy()', function() {
      it('proxies an external URL through the AJAX proxy', function() {
         // Default ports are added if missing
         expect(proxy('http://www.ibm.com')).toBe(BASE_URL + '/http/www.ibm.com%3A80');
         expect(proxy('https://mail.google.com')).toBe(BASE_URL + '/https/mail.google.com%3A443');
         // Existing ports are preserved
         expect(proxy('http://localhost:8080')).toBe(BASE_URL + '/http/localhost%3A8080');
      });

      it('proxies an external URL through the passed in proxy URL', function() {
         var proxyUrl = '/proxy';

         // Default ports are added if missing
         expect(proxy('http://www.ibm.com', proxyUrl)).toBe(proxyUrl + '/http/www.ibm.com%3A80');
         expect(proxy('https://mail.google.com', proxyUrl)).toBe(proxyUrl + '/https/mail.google.com%3A443');
         // Existing ports are preserved
         expect(proxy('http://localhost:8080', proxyUrl)).toBe(proxyUrl + '/http/localhost%3A8080');
      });
   });

   // We cannot test this without refactoring the utility
   // hostname is evaluated once and reference stored into a closure.
   /*
    * describe('com.ibm.oneui.util.proxy()', function() { var hostname;
    * beforeEach(function() { hostname = window.location.hostname; delete
    * window.location.hostname; }); afterEach(function() {
    * window.location.hostname = hostname; }); it('falls back to localhost when
    * location.hostname is not set', function() { // localhost port 80
    * expect(proxy('http://localhost')).toBe('http://localhost');
    * expect(proxy('http://localhost:80')).toBe('http://localhost:80'); //
    * But... expect(proxy('http://localhost:8080')).toBe(BASE_URL +
    * '/http/localhost%3A8080');
    * expect(proxy('https://localhost:9090')).toBe(BASE_URL +
    * '/https/localhost%3A9090'); }); });
    */
}(com.ibm.oneui.util.proxy));
