/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.whiteListHelperSpec");

dojo.require("lconn.core.auth.whiteListHelper");

(function(Helper) {
   var PROXY_URL = "http://proxy.example.com",
   SERVICE_JSON = {
         activities: {
            url: "http://www.example.com/activities",
            secureUrl: "https://www.example.com/activities"
         },
         blogs: {
            url: "http://www.example.com/blogs",
            secureUrl: "https://www.example.com/blogs"
         }
   },
   SERVICE_JSON_WITH_PORTS = {
         activities: {
            url: "http://www.example.com:9080/activities",
            secureUrl: "https://www.example.com:9443/activities"
         },
         blogs: {
            url: "http://www.example.com:9080/blogs",
            secureUrl: "https://www.example.com:9443/blogs"
         }
   };
   
   describe("the interface of whiteListHelper", function() {
      it("implements the expected methods", function() {
         var helper = new Helper(SERVICE_JSON, PROXY_URL);
         expect(helper.isWhiteListedURL).toEqual(jasmine.any(Function));
      });
   });
   
   describe("the constructor of whiteListHelper", function() {
      it("throws when the first argument is null", function() {
         expect(function(){ new Helper(null); }).toThrow();
         expect(function(){ new Helper(null, PROXY_URL); }).toThrow();
      });
      it("throws when the first argument is undefined", function() {
         // FIXME: these are undesired? consequences of lax comparison (serviceJson == null)
         expect(function(){ new Helper(); }).toThrow();
         expect(function(){ new Helper(undefined, PROXY_URL); }).toThrow();
      });
      it("doesn't throw when the first argument is not null", function() {
         expect(function(){ new Helper(SERVICE_JSON); }).not.toThrow();
         expect(function(){ new Helper(SERVICE_JSON, PROXY_URL); }).not.toThrow();
      });
   });
   
   describe("the initializer of whiteListHelper", function() {
      it("stores the expected URL patterns without port numbers", function() {
         var helper = new Helper(SERVICE_JSON);
         expect(helper._list).not.toBeNull();
         expect(helper._list.length).toBe(2);
         expect(dojo.indexOf(helper._list, 'www.example.com/blogs')).not.toBe(-1);
         expect(dojo.indexOf(helper._list, 'www.example.com/activities')).not.toBe(-1);
      });
      it("stores the expected URL patterns with port numbers", function() {
         var helper = new Helper(SERVICE_JSON_WITH_PORTS);
         expect(helper._list).not.toBeNull();
         expect(helper._list.length).toBe(4);
         expect(dojo.indexOf(helper._list, 'www.example.com:9080/blogs')).not.toBe(-1);
         expect(dojo.indexOf(helper._list, 'www.example.com:9443/blogs')).not.toBe(-1);
         expect(dojo.indexOf(helper._list, 'www.example.com:9080/activities')).not.toBe(-1);
         expect(dojo.indexOf(helper._list, 'www.example.com:9443/activities')).not.toBe(-1);
      });
   });
   
   describe("the method whiteListHelper.isWhiteListedURL", function() {
      var helper, helper_with_ports, helper_with_proxy;
      beforeEach(function() {
         helper = new Helper(SERVICE_JSON);
         helper_with_ports = new Helper(SERVICE_JSON_WITH_PORTS);
         helper_with_proxy = new Helper(SERVICE_JSON, PROXY_URL);
         helper_with_ports_and_proxy = new Helper(SERVICE_JSON_WITH_PORTS, PROXY_URL);
      });
      it("returns false for undefined URLs", function() {
         expect(helper.isWhiteListedURL()).toBeFalsy();
         expect(helper_with_ports.isWhiteListedURL()).toBeFalsy();
         expect(helper_with_proxy.isWhiteListedURL()).toBeFalsy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL()).toBeFalsy();
      });
      it("returns true for relative URLs", function() {
         expect(helper.isWhiteListedURL('/can/be/anything')).toBeTruthy();
         expect(helper.isWhiteListedURL('can/be/anything')).toBeTruthy();
         expect(helper.isWhiteListedURL('canbeanything')).toBeTruthy();
         
         expect(helper_with_ports.isWhiteListedURL('/can/be/anything')).toBeTruthy();
         expect(helper_with_ports.isWhiteListedURL('can/be/anything')).toBeTruthy();
         expect(helper_with_ports.isWhiteListedURL('canbeanything')).toBeTruthy();
         
         expect(helper_with_proxy.isWhiteListedURL('/can/be/anything')).toBeTruthy();
         expect(helper_with_proxy.isWhiteListedURL('can/be/anything')).toBeTruthy();
         expect(helper_with_proxy.isWhiteListedURL('canbeanything')).toBeTruthy();
         
         expect(helper_with_ports_and_proxy.isWhiteListedURL('/can/be/anything')).toBeTruthy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('can/be/anything')).toBeTruthy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('canbeanything')).toBeTruthy();
      });
      it("returns true for absolute URLs matching config", function() {
         expect(helper.isWhiteListedURL('http://www.example.com/blogs/can/be/anything')).toBeTruthy();
         expect(helper.isWhiteListedURL('https://www.example.com/blogs/can/be/anything')).toBeTruthy();
         expect(helper.isWhiteListedURL('http://www.example.com/activities/can/be/anything')).toBeTruthy();
         expect(helper.isWhiteListedURL('https://www.example.com/activities/can/be/anything')).toBeTruthy();
         
         expect(helper_with_ports.isWhiteListedURL('http://www.example.com:9080/blogs/can/be/anything')).toBeTruthy();
         expect(helper_with_ports.isWhiteListedURL('https://www.example.com:9443/blogs/can/be/anything')).toBeTruthy();
         expect(helper_with_ports.isWhiteListedURL('http://www.example.com:9080/activities/can/be/anything')).toBeTruthy();
         expect(helper_with_ports.isWhiteListedURL('https://www.example.com:9443/activities/can/be/anything')).toBeTruthy();
      });
      it("returns false for absolute URLs not matching config", function() {
         expect(helper.isWhiteListedURL('http://other.example.com/blogs/can/be/anything')).toBeFalsy();
         expect(helper.isWhiteListedURL('https://other.example.com/blogs/can/be/anything')).toBeFalsy();
         expect(helper.isWhiteListedURL('http://other.example.com/activities/can/be/anything')).toBeFalsy();
         expect(helper.isWhiteListedURL('https://other.example.com/activities/can/be/anything')).toBeFalsy();
         
         expect(helper_with_ports.isWhiteListedURL('http://other.example.com:9080/blogs/can/be/anything')).toBeFalsy();
         expect(helper_with_ports.isWhiteListedURL('https://other.example.com:9443/blogs/can/be/anything')).toBeFalsy();
         expect(helper_with_ports.isWhiteListedURL('http://other.example.com:9080/activities/can/be/anything')).toBeFalsy();
         expect(helper_with_ports.isWhiteListedURL('https://other.example.com:9443/activities/can/be/anything')).toBeFalsy();
      });
      /*
       * Proxied URLs
       */
      it("returns true for proxied absolute URLs matching proxy and config", function() {
         // Note there's a major flaw here: the proxied URL part is not validated for well-formedness
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttp://www.example.com/blogs/can/be/anything')).toBeTruthy();
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttps://www.example.com/blogs/can/be/anything')).toBeTruthy();
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttp://www.example.com/activities/can/be/anything')).toBeTruthy();
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttps://www.example.com/activities/can/be/anything')).toBeTruthy();
         
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttp://www.example.com:9080/blogs/can/be/anything')).toBeTruthy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttps://www.example.com:9443/blogs/can/be/anything')).toBeTruthy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttp://www.example.com:9080/activities/can/be/anything')).toBeTruthy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttps://www.example.com:9443/activities/can/be/anything')).toBeTruthy();
      });
      it("returns false for proxied absolute URLs not matching proxy and config", function() {
         // Note there's a major flaw here: the proxied URL part is not validated for well-formedness
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttp://other.example.com/blogs/can/be/anything')).toBeFalsy();
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttps://other.example.com/blogs/can/be/anything')).toBeFalsy();
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttp://other.example.com/activities/can/be/anything')).toBeFalsy();
         expect(helper_with_proxy.isWhiteListedURL('http://proxy.example.comhttps://other.example.com/activities/can/be/anything')).toBeFalsy();
         
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttp://other.example.com:9080/blogs/can/be/anything')).toBeFalsy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttps://other.example.com:9443/blogs/can/be/anything')).toBeFalsy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttp://other.example.com:9080/activities/can/be/anything')).toBeFalsy();
         expect(helper_with_ports_and_proxy.isWhiteListedURL('http://proxy.example.comhttps://other.example.com:9443/activities/can/be/anything')).toBeFalsy();
      });
   });
}(lconn.core.auth.whiteListHelper));
