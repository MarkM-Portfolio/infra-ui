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

define(["ic-ui/ckeditor/plugins/docpicker",
        "ic-core/config/services",
        "../mocks/ckeditor"], function(docpicker, services, mocks) {

   describe('the docpicker plugin', function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(docpicker.getName)).toBeTruthy();
         expect(dojo.isFunction(docpicker.isEnabled)).toBeTruthy();
         expect(dojo.isFunction(docpicker.addPlugin)).toBeTruthy();
      });
      it('has the name of icdocpicker', function() {
         expect(docpicker.getName()).toBe('icdocpicker');
      });
   });
   describe('the docpicker plugin', function() {
      var files, ecm_files;
      beforeEach(function() {
         files = services.files;
         ecm_files = services.ecm_files;
      });
      afterEach(function() {
         services.files = files;
         services.ecm_files = ecm_files;
         files = undefined;
         ecm_files = undefined;
      });
      it('is not enabled when files and ecm_files are disabled', function() {
         delete services.files;
         delete services.ecm_files;
         expect(docpicker.isEnabled()).toBeFalsy();
      });
      it('is enabled when at least one of files and ecm_files are enabled', function() {
         services.files = {};
         delete services.ecm_files;
         expect(docpicker.isEnabled()).toBeTruthy();
         
         delete services.files;
         services.ecm_files = {};
         expect(docpicker.isEnabled()).toBeTruthy();
         
         services.files = {};
         services.ecm_files = {};
         expect(docpicker.isEnabled()).toBeTruthy();
      });
   });
   describe('the method addPlugin()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
      });
      afterEach(function() {
         // Restore
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('correctly registers the plugin with CKEditor', function() {
         function p(n) {
            return CKEDITOR.plugins.registered[n];
         }
         docpicker.addPlugin();
         expect(p('icdocpicker')).not.toBeNull();
         expect(p(docpicker.getName())).not.toBeNull();
         expect(p(docpicker.getName())).toBe(p('icdocpicker'));
         expect(dojo.isFunction(p(docpicker.getName()).init)).toBeTruthy();
         
         // Verify addPlugin() can be executed twice with no exceptions
         var thrown = false;
         try {
            docpicker.addPlugin();
         } catch (e) {
            thrown = true;
         }
         expect(thrown).toBeFalsy();
      });
   });
});
