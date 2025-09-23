/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for core.proxy
 * @module ic-test.core.proxySpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
define([
   "ic-core/proxy",
   "dojo/_base/config",
   "dojo/_base/lang",
   "ic-core/config/services",
   "ic-core/url"
], function (proxy, config, lang, services, url) {

   var AJAX_PROXY_BASE_URL = config.proxy;
   var COMMON_PROXY_BASE_URL = url.getServiceUrl(services.deploymentConfig).path + "/proxy/commonProxy";

   describe('ic-core/proxy', function() {
      it('is a function', function() {
         expect(lang.isFunction(proxy)).toBeTruthy();
      });
   });

   describe('the method ic-core/proxy()', function() {
      it('proxies an external URL through the AJAX proxy', function() {
         // Default ports are added if missing
         expect(proxy('http://www.ibm.com')).toBe(AJAX_PROXY_BASE_URL + '/http/www.ibm.com%3A80');
         expect(proxy('https://mail.google.com')).toBe(AJAX_PROXY_BASE_URL + '/https/mail.google.com%3A443');
         // Existing ports are preserved
         expect(proxy('http://localhost:8080')).toBe(AJAX_PROXY_BASE_URL + '/http/localhost%3A8080');
      });
      
      it('proxies an external URL through the common proxy if specified to use the common proxy', function() {
      // Default ports are added if missing
         expect(proxy('http://www.ibm.com', true)).toBe(COMMON_PROXY_BASE_URL + '/http/www.ibm.com%3A80');
         expect(proxy('https://mail.google.com', true)).toBe(COMMON_PROXY_BASE_URL + '/https/mail.google.com%3A443');
         // Existing ports are preserved
         expect(proxy('http://localhost:8080', true)).toBe(COMMON_PROXY_BASE_URL + '/http/localhost%3A8080');
      });
   });

   // We cannot test this without refactoring the utility
   // hostname is evaluated once and reference stored into a closure.
   /*
   describe('ic-core/proxy()', function() {
      var hostname;
      beforeEach(function() {
         hostname = window.location.hostname;
         delete window.location.hostname;
      });
      afterEach(function() {
         window.location.hostname = hostname;
      });
      it('falls back to localhost when location.hostname is not set', function() {
         // localhost port 80
         expect(proxy('http://localhost')).toBe('http://localhost');
         expect(proxy('http://localhost:80')).toBe('http://localhost:80');
         // But...
         expect(proxy('http://localhost:8080')).toBe(AJAX_PROXY_BASE_URL + '/http/localhost%3A8080');
         expect(proxy('https://localhost:9090')).toBe(AJAX_PROXY_BASE_URL + '/https/localhost%3A9090');
      });
   });
   */
});
