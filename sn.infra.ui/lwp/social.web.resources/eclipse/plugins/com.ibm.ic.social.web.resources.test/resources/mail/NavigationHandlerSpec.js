/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
      "dojo/_base/array",
      "dojo/_base/window",
      "dojo/dom-construct",
      "ic-mail/gadget/NavigationHandler"
], function(array, windowModule, domConstruct, NavigationHandler) {

   /**
    * Jasmine spec for the Connections Mail navigation handler
    * 
    * @module com.ibm.social.test.socialmail.NavigationHandlerSpec
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   var fakeDom;
   // NavigationHandler needs some elements to exist or it will throw errors
   function createFakeDom() {
      fakeDom = [
            domConstruct.create('div', {
               id : 'lotusBannerMail'
            }, windowModule.body()),
            domConstruct.create('div', {
               id : 'lotusBannerCalendar'
            }, windowModule.body()),
            domConstruct.create('div', {
               'class' : 'os-site-mail-notify'
            }, windowModule.body())
      ];
   }
   function destroyFakeDom() {
      array.map(fakeDom, function(el) {
         windowModule.body().removeChild(el);
      });
      delete fakeDom;
   }
   var handler;
   beforeEach(function() {
      createFakeDom();
      handler = new com.ibm.lconn.socialmail.gadget.NavigationHandler();
   });
   afterEach(function() {
      delete handler;
      destroyFakeDom();
   })
   describe("the Connections Mail navigation handler", function() {
      it('can be instantiated without errors with a fake DOM', function() {
         expect(handler).not.toBeNull();
      });
      it('implements the expected methods', function() {
         expect(handler.navigateInbox).toEqual(jasmine.any(Function));
         expect(handler.navigateCalendar).toEqual(jasmine.any(Function));
         expect(handler.destroy).toEqual(jasmine.any(Function));
      });
   });
});
