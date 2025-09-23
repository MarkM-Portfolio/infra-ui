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

define([
   "dojo/_base/lang",
   "dojo/json",
   "ic-ui/ckeditor/plugins/mentions/HashtagHandler",
   "../mocks/ckeditor",
   "ic-core/TypeAheadDataStore"
], function (lang, JSON, HashtagHandler, mocks, TypeAheadDataStore) {

   var TAG = 'social-business', ITEM = {displayName: TAG}, ITEM_JSON = {
         value: ITEM.displayName,
         type: 'TagMentions',
         hasSymbol: true
   };

   describe('the ic-ui/ckeditor/plugins/mentions/HashtagHandler handler', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(HashtagHandler.getStore)).toBeTruthy();
      });
      it('implements the expected properties', function() {
         expect(HashtagHandler.activatorChar).toBe('#');
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/HashtagHandler.getStore() method', function() {
      it('returns an instance of TypeAheadDataStore', function() {
         expect(HashtagHandler.getStore()).not.toBeNull();
         expect(HashtagHandler.getStore() instanceof TypeAheadDataStore).toBeTruthy();
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/HashtagHandler.getTextFromItem() method', function() {
      it('returns the name of the argument', function() {
         expect(HashtagHandler.getTextFromItem({displayName: TAG})).toBe(TAG);
      });
      it('returns null if the argument is null', function() {
         expect(HashtagHandler.getTextFromItem(null)).toBeNull();
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/HashtagHandler.formatData() method', function() {
      it('returns a well formed JSON object', function() {
         expect(HashtagHandler.formatData(ITEM)).not.toBeNull();
         expect(HashtagHandler.formatData(ITEM)).toBe(JSON.stringify(ITEM_JSON));
      });
   });

   describe('the ic-ui/ckeditor/plugins/mentions/HashtagHandler.isMention() method', function() {
      it('always returns false', function() {
         expect(HashtagHandler.isMention()).toBeFalsy();
      });
   });
});