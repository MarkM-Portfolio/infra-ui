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

dojo.provide("lconn.test.jasmine.ckeditor.mentionsSpec");

dojo.require("lconn.core.ckplugins.mentions");
dojo.require("lconn.core.ckplugins.mentions.PersonHandler");
dojo.require("lconn.test.mocks.ckeditor");
dojo.require("lconn.core.auth");

(function(plugin, PersonHandler, auth, mocks) {
   function p(n) {
      return CKEDITOR.plugins.registered[n];
   }

   describe('the lconn.core.ckplugins.mentions plugin', function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(plugin.getName)).toBeTruthy();
         expect(dojo.isFunction(plugin.isEnabled)).toBeTruthy();
         expect(dojo.isFunction(plugin.addPlugin)).toBeTruthy();
         expect(dojo.isFunction(plugin.registerHandler)).toBeTruthy();
      });
      it('has the name of mentions', function() {
         expect(plugin.getName()).toBe('mentions');
      });
   });
   describe('the lconn.core.ckplugins.mentions plugin', function() {
      var _properties, PROPERTY_NAME = "com.ibm.lconn.core.web.ckeditor.mentions.enabled";
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
         expect(plugin.isEnabled()).toBeTruthy();
      });
      it('is enabled when the config property is set to true', function() {
         lconn.core.config.properties[PROPERTY_NAME] = "true";
         expect(plugin.isEnabled()).toBeTruthy();
      });
      it('is not enabled when the config property is set to false', function() {
         lconn.core.config.properties[PROPERTY_NAME] = "false";
         expect(plugin.isEnabled()).toBeFalsy();
      });
   });
   describe('the method lconn.core.ckplugins.mentions.addPlugin()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         plugin.addPlugin();
      });
      afterEach(function() {
         // Restore
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('implements the expected methods', function() {
         expect(dojo.isFunction(p('mentions').addCallback)).toBeTruthy();
         expect(dojo.isFunction(p('mentions').cancelActiveMentions)).toBeTruthy();
         expect(dojo.isFunction(p('mentions').init)).toBeTruthy();
         expect(dojo.isFunction(p('mentions').setDataStore)).toBeTruthy();
         expect(dojo.isFunction(p('mentions').setTypeaheadHeader)).toBeTruthy();
         expect(dojo.isFunction(p('mentions').setNetwork)).toBeTruthy();
      });
      it('correctly registers the plugin with CKEditor', function() {
         expect(p('mentions')).not.toBeNull();
         expect(p(plugin.getName())).not.toBeNull();
         expect(p(plugin.getName())).toBe(p('mentions'));
         expect(dojo.isFunction(p(plugin.getName()).init)).toBeTruthy();
      });
      it('can be executed twice with no exceptions', function() {
         expect(plugin.addPlugin).not.toThrow();
      });
   });

   describe('the method lconn.core.ckplugins.mentions.init()', function() {
      var _CKEDITOR, external, getUser;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         getUser = auth.getUser;
         auth.getUser = function() {
            return {isExternal : external};
         };
         plugin.addPlugin();
      });
      afterEach(function() {
         // Restore
         dojo.setObject('CKEDITOR', _CKEDITOR);
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

   describe('the method lconn.core.ckplugins.mentions.setTypeaheadHeader()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         plugin.addPlugin();
      });
      afterEach(function() {
         // Restore
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleSetTypeaheadHeader menthod', function() {
         spyOn(PersonHandler, 'handleSetTypeaheadHeader');
         p('mentions').setTypeaheadHeader();
         expect(PersonHandler.handleSetTypeaheadHeader).toHaveBeenCalled();
      });
   });
   
   describe('the method lconn.core.ckplugins.mentions.addCallback()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         plugin.addPlugin();
      });
      afterEach(function() {
         // Restore
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleAddCallback menthod', function() {
         spyOn(PersonHandler, 'handleAddCallback');
         p('mentions').addCallback();
         expect(PersonHandler.handleAddCallback).toHaveBeenCalled();
      });
   });
   
   describe('the method lconn.core.ckplugins.mentions.setDataStore()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         plugin.addPlugin();
      });
      afterEach(function() {
         // Restore
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleSetDataStore menthod', function() {
         spyOn(PersonHandler, 'handleSetDataStore');
         p('mentions').setDataStore();
         expect(PersonHandler.handleSetDataStore).toHaveBeenCalled();
      });
   });

   describe('the method lconn.core.ckplugins.mentions.setNetwork()', function() {
      var _CKEDITOR;
      beforeEach(function() {
         // Store original reference
         _CKEDITOR = dojo.getObject('CKEDITOR');
         // Mock
         dojo.setObject('CKEDITOR', mocks.CKEDITOR);
         mocks.CKEDITOR.plugins.reset();
         plugin.addPlugin();
      });
      afterEach(function() {
         // Restore
         dojo.setObject('CKEDITOR', _CKEDITOR);
      });
      it('calls the handleSetNetwork menthod', function() {
         spyOn(PersonHandler, 'handleSetNetwork');
         p('mentions').setNetwork();
         expect(PersonHandler.handleSetNetwork).toHaveBeenCalled();
      });
   });
}(lconn.core.ckplugins.mentions, lconn.core.ckplugins.mentions.PersonHandler,lconn.core.auth, lconn.test.mocks.ckeditor));
