/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2020                         */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define([
   "ic-ui/ckeditor/dynamic",
   "ic-core/help",
   "dojo/_base/kernel"
], function (dynamic, help, kernel) {

   describe('ic-ui/ckeditor/dynamic module', function() {
      it('implements the expected methods', function() {
         expect(dynamic.applyCustomConfig).toEqual(jasmine.any(Function));
         expect(dynamic.addCustomConfig).toEqual(jasmine.any(Function));
         expect(dynamic.addCustomPlugin).toEqual(jasmine.any(Function));
         expect(dynamic.addExtraPlugin).toEqual(jasmine.any(Function));
         expect(dynamic.replace).toEqual(jasmine.any(Function));
         expect(dynamic.appendTo).toEqual(jasmine.any(Function));
         expect(dynamic.async).toEqual(jasmine.any(Function));
         expect(dynamic.getHelpUrl).toEqual(jasmine.any(Function));
      });
   });

   describe('ic-ui/ckeditor/dynamic: applyCustomConfig method', function() {
      var _require,
         defaultPluginsFull = [ 'ic-ui/ckeditor/plugins/docpicker', 'ic-ui/ckeditor/plugins/publishBinaryData', 'ic-ui/ckeditor/plugins/mentions' ],
         defaultPluginsLite = [ 'ic-ui/ckeditor/plugins/mentions', 'ic-ui/ckeditor/plugins/urlDetect' ];

      beforeEach(function() {
         _require = require;
         require = jasmine.createSpy('require');
       });

      afterEach(function() {
         require = _require;
       });
      it("loads the right plugins (Full Editor)", function() {
         dynamic.applyCustomConfig({});
         expect(require).toHaveBeenCalledWith(defaultPluginsFull, jasmine.any(Function));
      });
      it("loads the right plugins (Lite Editor)", function() {
         var opts = {
               lite: true
         };
         dynamic.applyCustomConfig(opts);
         expect(require).toHaveBeenCalledWith(defaultPluginsLite, jasmine.any(Function));
      });
      it("includes the custom plugins added as an input param by the consumer", function() {
         var opts = {
               customPlugins: ['plugn1', 'plugin2']
         };
         dynamic.applyCustomConfig(opts);
         expect(require).toHaveBeenCalledWith(opts.customPlugins.concat(defaultPluginsFull), jasmine.any(Function));
      });
      it("removes the urlDetect plugin if disabled", function() {
         var opts = {
               disableURLDetect: true,
               lite: true
         };
         dynamic.applyCustomConfig(opts);
         expect(require).toHaveBeenCalledWith([ 'ic-ui/ckeditor/plugins/mentions' ], jasmine.any(Function));
      });
   });

   describe('ic-ui/ckeditor/dynamic: addCustomConfig method', function() {
      it("is marked as deprecated", function() {
         spyOn(kernel, 'deprecated');
         dynamic.addCustomConfig();
         expect(kernel.deprecated).toHaveBeenCalled();
      });
   });

   describe('ic-ui/ckeditor/dynamic: addCustomPlugin method', function() {
      it("is marked as deprecated", function() {
         spyOn(kernel, 'deprecated');
         dynamic.addCustomPlugin();
         expect(kernel.deprecated).toHaveBeenCalled();
      });
   });

   describe('ic-ui/ckeditor/dynamic: addExtraPlugin method', function() {
      it("adds the plugin name to the list of extra plugins", function() {
         var opts = {};
         CKEDITOR = {
               config: {
                  extraPlugins: ''
               }
         };

         dynamic.addExtraPlugin('testPlugin', opts);
         expect(opts.extraPlugins).toBe('testPlugin');

         dynamic.addExtraPlugin('testPlugin2', opts);
         expect(opts.extraPlugins).toBe('testPlugin,testPlugin2');

         dynamic.addExtraPlugin('testPlugin');
         expect(CKEDITOR.config.extraPlugins).toBe('testPlugin');
      });
   });

   describe('ic-ui/ckeditor/dynamic: replace method', function() {
      it("calls dynamic.async with the right params", function() {
         spyOn(dynamic, 'async');

         dynamic.replace();
         expect(dynamic.async).toHaveBeenCalledWith('replace', []);

         dynamic.replace('arg1', {'name': 'value', 'name1': true});
         expect(dynamic.async).toHaveBeenCalledWith('replace', ['arg1', {'name': 'value', 'name1': true}]);
      });
   });

   describe('ic-ui/ckeditor/dynamic: appendTo method', function() {
      it("calls dynamic.async with the right params", function() {
         spyOn(dynamic, 'async');

         dynamic.appendTo();
         expect(dynamic.async).toHaveBeenCalledWith('appendTo', []);

         dynamic.appendTo('arg1', {'name': 'value', 'name1': true});
         expect(dynamic.async).toHaveBeenCalledWith('appendTo', ['arg1', {'name': 'value', 'name1': true}]);
      });
   });

   describe('ic-ui/ckeditor/dynamic: async method', function() {
      var _require;

      beforeEach(function() {
         _require = require;
         require = jasmine.createSpy('require');
       });

      afterEach(function() {
         require = _require;
       });

      it("calls dynamic.applyCustomConfig with the right params", function() {
         dynamic.async('appendTo', ['arg1', {'name': 'value', 'name1': true}]);
         expect(require).toHaveBeenCalledWith([ 'ic-ui/ckeditor/static' ], jasmine.any(Function));
      });
   });

   describe('ic-ui/ckeditor/dynamic: getHelpUrl method', function() {
      it("calls help.getProductHelpUrl with the right params", function() {
         spyOn(help, 'getProductHelpUrl');

         dynamic.getHelpUrl();
         expect(help.getProductHelpUrl).toHaveBeenCalled();
         expect(help.getProductHelpUrl).toHaveBeenCalledWith('/user/common/eucommon_ckeditor.html');

         dynamic.getHelpUrl('how/to/use/jasmine.html');
         expect(help.getProductHelpUrl).toHaveBeenCalled();
         expect(help.getProductHelpUrl).toHaveBeenCalledWith('/user/how/to/use/jasmine.html');
      });
   });
});
