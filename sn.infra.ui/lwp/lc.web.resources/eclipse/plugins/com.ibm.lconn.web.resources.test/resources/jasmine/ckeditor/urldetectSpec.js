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

dojo.provide("lconn.test.jasmine.ckeditor.urldetectSpec");

dojo.require("lconn.core.ckplugins.urlDetect");
dojo.require("lconn.test.mocks.ckeditor");

(function(urlDetect, mocks, topic, lang) {
   describe('the lconn.core.ckplugins.urlDetect plugin', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(urlDetect.getName)).toBeTruthy();
         expect(lang.isFunction(urlDetect.isEnabled)).toBeTruthy();
         expect(lang.isFunction(urlDetect.addPlugin)).toBeTruthy();
      });
      it('has the name of urlDetect', function() {
         expect(urlDetect.getName()).toBe('urlDetect');
      });
      var _properties, PROPERTY_NAME = "com.ibm.lconn.core.web.ckeditor.urlDetect.enabled";
      beforeEach(function() {
         // Store original reference
         _properties = lconn.core.config.properties;
      });
      afterEach(function() {
         // Restore
         lconn.core.config.properties = _properties;
      });
      it('is enabled when the config property is not set', function() {
         delete lconn.core.config.properties[PROPERTY_NAME];
         expect(urlDetect.isEnabled()).toBeTruthy();
      });
      it('is enabled when the config property is set to true', function() {
         lconn.core.config.properties[PROPERTY_NAME] = "true";
         expect(urlDetect.isEnabled()).toBeTruthy();
      });
      it('is not enabled when the config property is set to false', function() {
         lconn.core.config.properties[PROPERTY_NAME] = "false";
         expect(urlDetect.isEnabled()).toBeFalsy();
      });
   });
   
   describe('the lconn.core.ckplugins.urlDetect method addPlugin()', function() {
      var _CKEDITOR, sub;
      function p(n) {
         return CKEDITOR.plugins.registered[n];
      }
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         urlDetect.addPlugin();
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
         if (sub) {
            sub.remove();
            sub = undefined;
         }
      });
      it('correctly registers the plugin with CKEditor', function() {
         expect(p('urlDetect')).not.toBeNull();
         expect(p(urlDetect.getName())).not.toBeNull();
         expect(p(urlDetect.getName())).toBe(p('urlDetect'));
         expect(lang.isFunction(p(urlDetect.getName()).init)).toBeTruthy();
      });
      it('can be executed twice with no exceptions thrown', function() {
         expect(urlDetect.addPlugin).not.toThrow();
      });
      it('calls instanceready when te plugin is init', function() {
         spyOn(CKEDITOR, "on").and.callThrough();
         p('urlDetect').init(CKEDITOR);
         expect(CKEDITOR.on).toHaveBeenCalledWith('instanceReady', jasmine.any(Function));
      });
      it('inits the listeners when the instance is ready', function() {
         CKEDITOR.mode = "wysiwyg";
         CKEDITOR.document.on = function(type, handler) {
            CKEDITOR._eventHandlers[type] = handler;
         };
         expect(CKEDITOR._eventHandlers.instanceReady).toBeDefined();
         CKEDITOR.fire('instanceReady', {});
         expect(CKEDITOR._eventHandlers.afterCommandExec).toBeDefined();
         expect(CKEDITOR._eventHandlers.paste).toBeDefined();
         expect(CKEDITOR._eventHandlers.keyup).toBeDefined();
      });
   });
}(lconn.core.ckplugins.urlDetect, lconn.test.mocks.ckeditor, dojo, dojo));
