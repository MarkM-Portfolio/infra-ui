/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/_base/lang",
      "ic-ui/ckeditor/static"
], function(dojo, lang, ckeditorstatic) {

   describe('the lconn.core.ckeditorstatic wrapper', function() {
      beforeEach(function() {
         lang.setObject('ibmConfig', {
            versionStamp : 'abc'
         }, dojo.global);
      });
      it('loads correctly when included', function() {
         expect(CKEDITOR).toBeDefined();
      });
      it('has a version number', function() {
         expect(CKEDITOR.version).toBeDefined();
      });
      it('has a timestamp', function() {
         expect(CKEDITOR.timestamp).toBeDefined();
      });
   });

   describe('the CKEDITOR singleton', function() {
      it('has an appendTo method', function() {
         expect(CKEDITOR.appendTo).toEqual(jasmine.any(Function));
      });
      it('has a replace method', function() {
         expect(CKEDITOR.replace).toEqual(jasmine.any(Function));
      });
   });

   describe('the CKEditor instance', function() {
      it('has a getData method', function() {
         expect(CKEDITOR.editor.prototype.getData).toEqual(jasmine.any(Function));
      });
      it('has a setData method', function() {
         expect(CKEDITOR.editor.prototype.setData).toEqual(jasmine.any(Function));
      });
   });
});
