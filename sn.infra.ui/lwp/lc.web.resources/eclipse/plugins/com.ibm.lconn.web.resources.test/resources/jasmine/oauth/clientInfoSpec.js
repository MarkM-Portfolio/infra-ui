/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.oauth.clientInfoSpec");

dojo.require("lconn.oauth.bean.ClientInfo");

/**
 * Jasmine spec for Bidi utilities
 * @module lconn.test.jasmine.globalization.bidiTests
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(ClientInfo) {
   var DISPLAY_NAME = "test-client",
      CLIENT_ID = '4bf41689-05c0-4b01-8d65-6c6ef431d57a',
      REDIRECT_URI = "http://www.example.com",
      DATA = {
         clientDisplayName: DISPLAY_NAME,
         client_id: CLIENT_ID,
         redirect_uri: REDIRECT_URI
      };
   var ci;
   beforeEach(function(){
      ci = new ClientInfo(DATA);
   });
   describe("the ClientInfo bean's accessors", function() {
      it('return the correct values', function() {
         expect(ci.getName()).toEqual(DISPLAY_NAME);
         expect(ci.getId()).toEqual(CLIENT_ID);
         expect(ci.getRedirectURI()).toEqual(REDIRECT_URI);
      });
   });
}(lconn.oauth.bean.ClientInfo));
