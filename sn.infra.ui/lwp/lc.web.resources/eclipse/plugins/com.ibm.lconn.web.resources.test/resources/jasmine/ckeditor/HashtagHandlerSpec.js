/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.test.jasmine.ckeditor.HashtagHandlerSpec");

dojo.require("lconn.core.ckplugins.mentions.HashtagHandler");
dojo.require("lconn.test.mocks.ckeditor");

(function(handler, mocks) {
   var TAG = 'social-business', ITEM = {displayName: TAG}, ITEM_JSON = {
         value: ITEM.displayName,
         type: 'TagMentions',
         hasSymbol: true
   };

   describe('the lconn.core.ckplugins.mentions.HashtagHandler handler', function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(handler.getStore)).toBeTruthy();
      });
      it('implements the expected properties', function() {
         expect(handler.activatorChar).toBe('#');
      });
   });

   describe('the lconn.core.ckplugins.mentions.HashtagHandler.getStore() method', function() {
      it('returns an instance of TypeAheadDataStore', function() {
         expect(handler.getStore()).not.toBeNull();
         expect(handler.getStore().declaredClass).toBe('lconn.core.TypeAheadDataStore');
      });
   });

   describe('the lconn.core.ckplugins.mentions.HashtagHandler.getTextFromItem() method', function() {
      it('returns the name of the argument', function() {
         expect(handler.getTextFromItem({displayName: TAG})).toBe(TAG);
      });
      it('returns null if the argument is null', function() {
         expect(handler.getTextFromItem(null)).toBeNull();
      });
   });

   describe('the lconn.core.ckplugins.mentions.HashtagHandler.formatData() method', function() {
      it('returns a well formed JSON object', function() {
         expect(handler.formatData(ITEM)).not.toBeNull();
         expect(handler.formatData(ITEM)).toBe(dojo.toJson(ITEM_JSON));
      });
   });

   describe('the lconn.core.ckplugins.mentions.HashtagHandler.isMention() method', function() {
      it('always returns false', function() {
         expect(handler.isMention()).toBeFalsy();
      });
   });
}(lconn.core.ckplugins.mentions.HashtagHandler, lconn.test.mocks.ckeditor));
