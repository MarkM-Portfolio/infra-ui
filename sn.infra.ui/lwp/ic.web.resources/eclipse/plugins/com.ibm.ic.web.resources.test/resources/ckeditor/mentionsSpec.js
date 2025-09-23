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

define([
   "dojo/_base/lang",
   "ic-ui/ckeditor/plugins/mentions",
   "ic-ui/ckeditor/plugins/mentions/PersonHandler",
   "ic-core/auth",
   "ic-core/config/properties",
   "../mocks/ckeditor",
   "../utils/inject"
], function (lang, mentions, PersonHandler, auth, properties, mocks, inject) {

   function p(n) {
      return CKEDITOR.plugins.registered[n];
   }

   describe('the ic-ui/ckeditor/plugins/mentions plugin', function() {
      it('implements the expected methods', function() {
         expect(lang.isFunction(mentions.getName)).toBeTruthy();
         expect(lang.isFunction(mentions.isEnabled)).toBeTruthy();
         expect(lang.isFunction(mentions.addPlugin)).toBeTruthy();
         expect(lang.isFunction(mentions.registerHandler)).toBeTruthy();
      });
      it('has the name of mentions', function() {
         expect(mentions.getName()).toBe('mentions');
      });
   });
   describe('the ic-ui/ckeditor/plugins/mentions mentions plugin', function() {
      var _properties, PROPERTY_NAME = "com.ibm.lconn.core.web.ckeditor.mentions.enabled";
      beforeEach(function() {
         // Store original reference
         _properties = inject("ic-core/config/properties");
      });
      afterEach(function() {
         // Restore
         inject("ic-core/config/properties", _properties);
      });
      it('is enabled when the config property is not set', function() {
         delete properties[PROPERTY_NAME];
         expect(mentions.isEnabled()).toBeTruthy();
      });
      it('is enabled when the config property is set to true', function() {
         properties[PROPERTY_NAME] = "true";
         expect(mentions.isEnabled()).toBeTruthy();
      });
      it('is not enabled when the config property is set to false', function() {
         properties[PROPERTY_NAME] = "false";
         expect(mentions.isEnabled()).toBeFalsy();
      });
   });
   describe('the method ic-ui/ckeditor/plugins/mentions.addPlugin()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         mentions.addPlugin();
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('implements the expected methods', function() {
         expect(lang.isFunction(p('mentions').addCallback)).toBeTruthy();
         expect(lang.isFunction(p('mentions').cancelActiveMentions)).toBeTruthy();
         expect(lang.isFunction(p('mentions').init)).toBeTruthy();
         expect(lang.isFunction(p('mentions').setDataStore)).toBeTruthy();
         expect(lang.isFunction(p('mentions').setTypeaheadHeader)).toBeTruthy();
         expect(lang.isFunction(p('mentions').setNetwork)).toBeTruthy();
      });
      it('correctly registers the plugin with CKEditor', function() {
         expect(p('mentions')).not.toBeNull();
         expect(p(mentions.getName())).not.toBeNull();
         expect(p(mentions.getName())).toBe(p('mentions'));
         expect(lang.isFunction(p(mentions.getName()).init)).toBeTruthy();
      });
      it('can be executed twice with no exceptions', function() {
         expect(mentions.addPlugin).not.toThrow();
      });
   });

   describe('the method ic-ui/ckeditor/plugins/mentions.init()', function() {
      var _CKEDITOR, external, getUser;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         getUser = auth.getUser;
         auth.getUser = function() {
            return {isExternal : external};
         };
         mentions.addPlugin();
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
         auth.getUser = getUser;
         external = false;
      });

      it('inits the plugin normally if the ibmMentionDisabled config property is not set', function() {
         expect(p('mentions')).not.toBeNull();
         var on_called = false;
         p('mentions').init({
            config : {
            },
            on : function() {
               on_called = true;
            }
         });
         expect(on_called).toBeTruthy();
      });
      it('inits the plugin normally if the ibmMentionDisabled config property is false', function() {
         expect(p('mentions')).not.toBeNull();

         var on_called = false;
         p('mentions').init({
            config : {
               ibmMentionDisabled : false
            },
            on : function() {
               on_called = true;
            }
         });
         expect(on_called).toBeTruthy();
      });
      it('returns immediately if the ibmMentionDisabled config property is true', function() {
         expect(p('mentions')).not.toBeNull();

         var on_called = false;
         p('mentions').init({
            config : {
               ibmMentionDisabled : true
            },
            on : function() {
               on_called = true;
            }
         });
         expect(on_called).toBeFalsy();
      });
      it('returns immediately if the the user is external', function() {
         expect(p('mentions')).not.toBeNull();

         external = true;
         var on_called = false;
         p('mentions').init({
            config : {},
            on : function() {
               on_called = true;
            }
         });
         expect(on_called).toBeFalsy();
      });
   });

   describe('the method ic-ui/ckeditor/plugins/mentions.setTypeaheadHeader()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         mentions.addPlugin();
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleSetTypeaheadHeader menthod', function() {
         spyOn(PersonHandler, 'handleSetTypeaheadHeader');
         p('mentions').setTypeaheadHeader();
         expect(PersonHandler.handleSetTypeaheadHeader).toHaveBeenCalled();
      });
   });
   
   describe('the method ic-ui/ckeditor/plugins/mentions.addCallback()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         mentions.addPlugin();
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleAddCallback menthod', function() {
         spyOn(PersonHandler, 'handleAddCallback');
         p('mentions').addCallback();
         expect(PersonHandler.handleAddCallback).toHaveBeenCalled();
      });
   });
   
   describe('the method ic-ui/ckeditor/plugins/mentions.setDataStore()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         mentions.addPlugin();
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleSetDataStore menthod', function() {
         spyOn(PersonHandler, 'handleSetDataStore');
         p('mentions').setDataStore();
         expect(PersonHandler.handleSetDataStore).toHaveBeenCalled();
      });
   });

   describe('the method ic-ui/ckeditor/plugins/mentions.setNetwork()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = lang.getObject('CKEDITOR');
         // Mock
         lang.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         mentions.addPlugin();
      });
      afterEach(function() {
         // Restore
         lang.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleSetNetwork menthod', function() {
         spyOn(PersonHandler, 'handleSetNetwork');
         p('mentions').setNetwork();
         expect(PersonHandler.handleSetNetwork).toHaveBeenCalled();
      });
   });
});