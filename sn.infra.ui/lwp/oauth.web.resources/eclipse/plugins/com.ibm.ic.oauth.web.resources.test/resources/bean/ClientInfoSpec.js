/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
   "ic-oauth/bean/ClientInfo"
], function (ClientInfo) {

   /**
    * Jasmine spec for Client Info bean
    * @module ic-oauth-test.bean.ClientInfoSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   describe("the ClientInfo bean", function() {
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
      describe("prototype", function() {
         it('implements the expected methods', function() {
            expect(ci.getName).toEqual(jasmine.any(Function));
            expect(ci.getId).toEqual(jasmine.any(Function));
            expect(ci.getRedirectURI).toEqual(jasmine.any(Function));
         });
      });
      describe("accessors", function() {
         it('return the correct values', function() {
            expect(ci.getName()).toEqual(DISPLAY_NAME);
            expect(ci.getId()).toEqual(CLIENT_ID);
            expect(ci.getRedirectURI()).toEqual(REDIRECT_URI);
         });
      });
   });
});
