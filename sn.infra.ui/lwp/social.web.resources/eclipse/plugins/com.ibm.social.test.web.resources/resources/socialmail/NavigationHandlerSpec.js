/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.test.socialmail.NavigationHandlerSpec");

dojo.require("com.ibm.lconn.socialmail.gadget.NavigationHandler");

/**
 * Jasmine spec for the Connections Mail navigation handler
 * @module com.ibm.social.test.socialmail.NavigationHandlerSpec
 * @author Claudio Procida <procidac@ie.ibm.com>
 */
(function(NavigationHandler) {
   var fakeDom;
   // NavigationHandler needs some elements to exist or it will throw errors
   function createFakeDom() {
      fakeDom = [dojo.create('div', {id: 'lotusBannerMail'}, dojo.body()),
                 dojo.create('div', {id: 'lotusBannerCalendar'}, dojo.body()),
                 dojo.create('div', {'class': 'os-site-mail-notify'}, dojo.body())
                 ];
   }
   function destroyFakeDom() {
      dojo.map(fakeDom, function(el) { dojo.body().removeChild(el); });
      delete fakeDom;
   }
   var handler;
   beforeEach(function(){
      createFakeDom();
      handler = new NavigationHandler();
   });
   afterEach(function(){
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
})(com.ibm.lconn.socialmail.gadget.NavigationHandler);
