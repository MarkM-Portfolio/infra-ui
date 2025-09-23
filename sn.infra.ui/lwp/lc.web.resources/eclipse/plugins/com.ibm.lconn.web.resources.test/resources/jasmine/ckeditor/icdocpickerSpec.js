/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.test.jasmine.ckeditor.icdocpickerSpec");

dojo.require("lconn.core.ckplugins.icdocpicker");
dojo.require("lconn.test.mocks.ckeditor");

(function(docpicker, mocks) {
   describe('the lconn.core.ckplugins.icdocpicker', function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(docpicker.getName)).toBeTruthy();
         expect(dojo.isFunction(docpicker.isEnabled)).toBeTruthy();
         expect(dojo.isFunction(docpicker.addPlugin)).toBeTruthy();
      });
      it('has the name of docpicker', function() {
         expect(docpicker.getName()).toBe('icdocpicker');
      });
   });
   describe('the icdocpicker plugin', function() {
      var files, ecm_files;
      beforeEach(function() {
         files = lconn.core.config.services.files;
         ecm_files = lconn.core.config.services.ecm_files;
      });
      afterEach(function() {
         lconn.core.config.services.files = this.files;
         lconn.core.config.services.ecm_files = this.ecm_files;
         delete files;
         delete ecm_files;
      });
      it('is not enabled when files and ecm_files are disabled', function() {
         delete lconn.core.config.services.files;
         delete lconn.core.config.services.ecm_files;
         expect(docpicker.isEnabled()).toBeFalsy();
      });
      it('is enabled when at least one of files and ecm_files are enabled', function() {
         lconn.core.config.services.files = {};
         delete lconn.core.config.services.ecm_files;
         expect(docpicker.isEnabled()).toBeTruthy();
         
         delete lconn.core.config.services.files;
         lconn.core.config.services.ecm_files = {};
         expect(docpicker.isEnabled()).toBeTruthy();
         
         lconn.core.config.services.files = {};
         lconn.core.config.services.ecm_files = {};
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
}(lconn.core.ckplugins.icdocpicker, lconn.test.mocks.ckeditor));
