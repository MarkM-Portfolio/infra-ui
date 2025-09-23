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

dojo.provide("lconn.test.ckeditor.icdocpickerTests");

dojo.require("doh.runner");
dojo.require("lconn.core.ckplugins.icdocpicker");
dojo.require("lconn.test.mocks.ckeditor");

(function(docpicker, mocks) {
   doh.register("lconn.test.ckeditor.icdocpickerTests", [ {
      name : 'test interface',
      runTest : function() {
         doh.t(dojo.isFunction(docpicker.getName));
         doh.t(dojo.isFunction(docpicker.isEnabled));
         doh.t(dojo.isFunction(docpicker.addPlugin));
      }
   }, {
      name : 'test isEnabled',
      setUp: function() {
         this.files = lconn.core.config.services.files;
         this.ecm_files = lconn.core.config.services.ecm_files;
      },
      runTest : function() {
         delete lconn.core.config.services.files;
         delete lconn.core.config.services.ecm_files;
         doh.f(docpicker.isEnabled());
         
         lconn.core.config.services.files = {};
         delete lconn.core.config.services.ecm_files;
         doh.t(docpicker.isEnabled());
         
         delete lconn.core.config.services.files;
         lconn.core.config.services.ecm_files = {};
         doh.t(docpicker.isEnabled());
         
         lconn.core.config.services.files = {};
         lconn.core.config.services.ecm_files = {};
         doh.t(docpicker.isEnabled());
      },
      tearDown: function() {
         lconn.core.config.services.files = this.files;
         lconn.core.config.services.ecm_files = this.ecm_files;
         delete this.files;
         delete this.ecm_files;
      }
   }, {
      name : 'test getName',
      runTest : function() {
         doh.is('icdocpicker', docpicker.getName());
      }
   }, {
      name : 'test addPlugin',
      setUp: function() {
         // Store original reference
         this.CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
      },
      runTest : function() {
         function p(n) {
            return CKEDITOR.plugins.registered[n];
         }
         docpicker.addPlugin();
         doh.t(null != p('icdocpicker'));
         doh.t(null != p(docpicker.getName()));
         doh.is(p('icdocpicker'), p(docpicker.getName()));
         doh.t(dojo.isFunction(p(docpicker.getName()).init));
         
         // Verify addPlugin() can be executed twice with no exceptions
         var thrown = false;
         try {
            docpicker.addPlugin();
         } catch (e) {
            thrown = true;
         }
         doh.f(thrown);
      },
      tearDown: function() {
         // Restore
         dojo.setObject('CKEDITOR', this.CKEDITOR);
      }
   }]);
}(lconn.core.ckplugins.icdocpicker, lconn.test.mocks.ckeditor));
