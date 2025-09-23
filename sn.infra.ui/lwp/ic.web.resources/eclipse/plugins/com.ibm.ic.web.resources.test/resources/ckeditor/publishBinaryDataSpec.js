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

define([
      "dojo/_base/array",
      "dojo/_base/lang",
      "ic-core/config/properties",
      "ic-ui/ckeditor/plugins/publishBinaryData",
      "../mocks/ckeditor",
      "../utils/inject"
], function(array, lang, properties, publishBinaryData, mocks, inject) {

   var PROPERTY = "com.ibm.lconn.core.web.ckeditor.pasteImages.enabled", DEMO_PROPERTY = "com.ibm.lconn.core.web.ckeditor.pasteImages.demo.enabled";

   describe('the ic-ui/ckeditor/plugins/publishBinaryData module', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(publishBinaryData.getName)).toBeTruthy();
         expect(lang.isFunction(publishBinaryData.isEnabled)).toBeTruthy();
         expect(lang.isFunction(publishBinaryData.addPlugin)).toBeTruthy();
      });
      it('has the name of icBinaryData', function() {
         expect(publishBinaryData.getName()).toBe('icBinaryData');
      });
   });

   describe('the icBinaryData plugin', function() {
      var _properties;
      beforeEach(function() {
         // Store original reference
         _properties = inject("ic-core/config/properties");
      });
      afterEach(function() {
         // Restore
         inject("ic-core/config/properties", _properties);
      });
      it('is enabled when the property is not set', function() {
         delete properties[PROPERTY];
         expect(publishBinaryData.isEnabled()).toBeTruthy();
      });
      it('is enabled when the property is set to true', function() {
         properties[PROPERTY] = "true";
         expect(publishBinaryData.isEnabled()).toBeTruthy();
      });
      it('is not enabled when the property is set to false', function() {
         properties[PROPERTY] = "false";
         expect(publishBinaryData.isEnabled()).toBeFalsy();
      });
   });

   describe('the demo mode of icBinaryData plugin', function() {
      var _properties;
      beforeEach(function() {
         // Store original reference
         _properties = inject("ic-core/config/properties");
      });
      afterEach(function() {
         // Restore
         inject("ic-core/config/properties", _properties);
      });
      it('is not enabled when the property is not set', function() {
         delete properties[DEMO_PROPERTY];
         expect(publishBinaryData.isDemo()).toBeFalsy();
      });
      it('is enabled when the property is set to true', function() {
         properties[DEMO_PROPERTY] = "true";
         expect(publishBinaryData.isDemo()).toBeTruthy();
      });
      it('is not enabled when the property is set to false', function() {
         properties[DEMO_PROPERTY] = "false";
         expect(publishBinaryData.isDemo()).toBeFalsy();
      });
   });

   describe('the method addPlugin()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('correctly registers the plugin with CKEditor', function() {
         function p(n) {
            return CKEDITOR.plugins.registered[n];
         }
         publishBinaryData.addPlugin();
         expect(p('icBinaryData')).not.toBeNull();
         expect(p(publishBinaryData.getName())).not.toBeNull();
         expect(p(publishBinaryData.getName())).toBe(p('icBinaryData'));
         expect(lang.isFunction(p(publishBinaryData.getName()).init)).toBeTruthy();

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
      var _CKEDITOR, _ibmConfig, _lconn_act_config;
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

      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         _ibmConfig = window.ibmConfig;
         _lconn_act_config = {};
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         window.ibmConfig = {};
         // Add config setting
         lang.setObject('config.ibmFilterPastedDataUriImage', true, mocks.CKEDITOR);
         _lconn_act_config.OAPasteImageToEditorEnabled = true;
      });
      afterEach(function() {
         // Restore
         _lconn_act_config = undefined;
         lang.setObject('CKEDITOR', _CKEDITOR);
         window.ibmConfig = _ibmConfig;
      });
      array.forEach(serviceName, function(comp) {
         it('is intercepting images in ' + comp, function() {
            var opts = {
               ibmFilterPastedDataUriImage : true
            };
            lang.setObject('ibmConfig.serviceName', comp);
            publishBinaryData.addCustomConfig(opts);
            expect(opts.ibmFilterPastedDataUriImage).toBeFalsy();
         });
      });
      array.forEach(falseServiceName, function(comp) {
         it('is not intercepting images in ' + comp, function() {
            var opts = {
               ibmFilterPastedDataUriImage : true
            };
            lang.setObject('ibmConfig.serviceName', comp);
            publishBinaryData.addCustomConfig(opts);
            expect(opts.ibmFilterPastedDataUriImage).toBeTruthy();
         });
      });
   });
});
