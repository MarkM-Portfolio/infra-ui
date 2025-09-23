/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.test.jasmine.ckeditor.icpublishBinaryDataSpec");

dojo.require("lconn.core.ckplugins.icpublishBinaryData");
dojo.require("lconn.test.mocks.ckeditor");

(function(publishBinaryData, mocks) {
   var PROPERTY = "com.ibm.lconn.core.web.ckeditor.pasteImages.enabled", DEMO_PROPERTY = "com.ibm.lconn.core.web.ckeditor.pasteImages.demo.enabled";

   describe('the lconn.core.ckplugins.icpublishBinaryData module', function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(publishBinaryData.getName)).toBeTruthy();
         expect(dojo.isFunction(publishBinaryData.isEnabled)).toBeTruthy();
         expect(dojo.isFunction(publishBinaryData.addPlugin)).toBeTruthy();
      });
      it('has the name of icBinaryData', function() {
         expect(publishBinaryData.getName()).toBe('icBinaryData');
      });
   });

   describe('the icBinaryData plugin', function() {
      var pasteImagesEnabled;
      beforeEach(function() {
         pasteImagesEnabled = lconn.core.config.properties[PROPERTY];
      });
      afterEach(function() {
         lconn.core.config.properties[PROPERTY] = this.pasteImagesEnabled;
         delete pasteImagesEnabled;
      });
      it('is enabled when the property is not set', function() {
         delete lconn.core.config.properties[PROPERTY];
         expect(publishBinaryData.isEnabled()).toBeTruthy();
      });
      it('is enabled when the property is set to true', function() {
         lconn.core.config.properties[PROPERTY] = "true";
         expect(publishBinaryData.isEnabled()).toBeTruthy();
      });
      it('is not enabled when the property is set to false', function() {
         lconn.core.config.properties[PROPERTY] = "false";
         expect(publishBinaryData.isEnabled()).toBeFalsy();
      });
   });

   describe('the demo mode of icBinaryData plugin', function() {
      var demoEnabled;
      beforeEach(function() {
         demoEnabled = lconn.core.config.properties[DEMO_PROPERTY];
      });
      afterEach(function() {
         lconn.core.config.properties[DEMO_PROPERTY] = this.pasteImagesEnabled;
         delete demoEnabled;
      });
      it('is not enabled when the property is not set', function() {
         delete lconn.core.config.properties[DEMO_PROPERTY];
         expect(publishBinaryData.isDemo()).toBeFalsy();
      });
      it('is enabled when the property is set to true', function() {
         lconn.core.config.properties[DEMO_PROPERTY] = "true";
         expect(publishBinaryData.isDemo()).toBeTruthy();
      });
      it('is not enabled when the property is set to false', function() {
         lconn.core.config.properties[DEMO_PROPERTY] = "false";
         expect(publishBinaryData.isDemo()).toBeFalsy();
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
         publishBinaryData.addPlugin();
         expect(p('icBinaryData')).not.toBeNull();
         expect(p(publishBinaryData.getName())).not.toBeNull();
         expect(p(publishBinaryData.getName())).toBe(p('icBinaryData'));
         expect(dojo.isFunction(p(publishBinaryData.getName()).init)).toBeTruthy();

         // Verify addPlugin() can be executed twice with no exceptions
         var thrown = false;
         try {
            publishBinaryData.addPlugin();
         }
         catch (e) {
            thrown = true;
         }
         expect(thrown).toBeFalsy();
      });
   });

   describe('the icBinaryData plugin', function() {
      var serviceName = [
            "wikis",
            "forums",
            "blogs"
      ];
      var falseServiceName = [
            "dogear",
            "communities",
            "files",
            "homepage",
            "activities"
      ];
      var _CKEDITOR, _lconn_act_config;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         _ibmConfig = window.ibmConfig;
         // mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         window.ibmConfig = {};
         _lconn_act_config = {};
         // Add config setting
         dojo.setObject("config.ibmFilterPastedDataUriImage", true, mocks.CKEDITOR);
         _lconn_act_config.OAPasteImageToEditorEnabled = true;
      });
      afterEach(function() {
         // cleanup mocks.CKEDITOR
         delete mocks.CKEDITOR.config;
         delete _lconn_act_config;
         // restore original references
         dojo.setObject('CKEDITOR', _CKEDITOR);
         window.ibmConfig = _ibmConfig;

      });

      dojo.forEach(serviceName, function(comp) {
         it('is intercepting images in ' + comp, function() {
            var opts = {
               ibmFilterPastedDataUriImage : true
            };
            dojo.setObject('ibmConfig.serviceName', comp);
            publishBinaryData.addCustomConfig(opts);
            expect(opts.ibmFilterPastedDataUriImage).toBeFalsy();
         });
      });
      dojo.forEach(falseServiceName, function(comp) {
         it('is not intercepting images in ' + comp, function() {
            var opts = {
               ibmFilterPastedDataUriImage : true
            };
            dojo.setObject('ibmConfig.serviceName', comp);
            publishBinaryData.addCustomConfig(opts);
            expect(opts.ibmFilterPastedDataUriImage).toBeTruthy();
         });
      });
   });

}(lconn.core.ckplugins.icpublishBinaryData, lconn.test.mocks.ckeditor));
