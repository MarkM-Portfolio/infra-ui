/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

/**
 * Jasmine spec for lconn.core.proxyHelper
 * 
 * @module lconn.test.jasmine.core.proxyHelperSpec
 * @author Marc Labrecque <mdlabrec@us.ibm.com>
 */
dojo.provide("lconn.test.jasmine.core.proxyHelperSpec");
dojo.require("lconn.core.proxyHelper");
dojo.require("com.ibm.oneui.util.proxy");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.url");

describe("the method lconn.core.proxyHelper.proxy()", function() {
   var _services;
   beforeEach(function() {
      _services = lconn.core.config.services;
   });
   afterEach(function() {
      lconn.core.config.services = _services;
   });
   it("passes along the URL to com.ibm.oneui.util.proxy", function() {
      spyOn(com.ibm.oneui.util, "proxy");

      var url = "http://www.ibm.com";

      lconn.core.proxyHelper.proxy(url);
      expect(com.ibm.oneui.util.proxy).toHaveBeenCalledWith(url);
   });

   it("also passes along the common proxy URL if it is specified to use the common proxy", function() {
      spyOn(com.ibm.oneui.util, "proxy");

      var url = "http://www.ibm.com";
      var commonProxy = lconn.core.url.getServiceUrl(lconn.core.config.services.deploymentConfig).path + "/proxy/commonProxy";

      lconn.core.proxyHelper.proxy(url, true);
      expect(com.ibm.oneui.util.proxy).toHaveBeenCalledWith(url, commonProxy);
   });

   // FIXME: the commonProxy is detected when the module's callback is executed and can't be overridden later
//   it("returns the url unmodified if it is specified to use the common proxy but the deploymentConfig service is disabled", function() {
//      var url = "http://www.ibm.com";
//      delete lconn.core.config.services.deploymentConfig;
//      expect(lconn.core.proxyHelper.proxy(url, true)).toBe(url);
//   });
});
