/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.test.jasmine.ckeditor.ckeditorSpec");

dojo.require("lconn.core.ckeditor");
dojo.require("net.jazz.ajax.xdloader");
dojo.require("lconn.core.help");

(function(ckeditor, xdloader, help) {

   describe("the lconn.core.ckeditor class", function() {
      it("implements the expected methods", function() {
         expect(ckeditor.applyCustomConfig).toEqual(jasmine.any(Function));
         expect(ckeditor.addCustomConfig).toEqual(jasmine.any(Function));
         expect(ckeditor.addCustomPlugin).toEqual(jasmine.any(Function));
         expect(ckeditor.addExtraPlugin).toEqual(jasmine.any(Function));
         expect(ckeditor.replace).toEqual(jasmine.any(Function));
         expect(ckeditor.appendTo).toEqual(jasmine.any(Function));
         expect(ckeditor.async).toEqual(jasmine.any(Function));
         expect(ckeditor.getHelpUrl).toEqual(jasmine.any(Function));
      });
   });

   describe("the lconn.core.ckeditor.addExtraPlugin method", function() {
      it("adds the plugin name to the list of extra plugins", function() {
         var opts = {};
         CKEDITOR = {
               config: {
                  extraPlugins: ''
               }
         };

         ckeditor.addExtraPlugin('testPlugin', opts);
         expect(opts.extraPlugins).toBe('testPlugin');
         
         ckeditor.addExtraPlugin('testPlugin2', opts);
         expect(opts.extraPlugins).toBe('testPlugin,testPlugin2');

         ckeditor.addExtraPlugin('testPlugin');
         expect(CKEDITOR.config.extraPlugins).toBe('testPlugin');
      });
   });

   describe("the lconn.core.ckeditor.replace method", function() {
      it("calls lconn.core.ckeditor.async with the right params", function() {
         spyOn(ckeditor, 'async');

         ckeditor.replace();
         expect(ckeditor.async).toHaveBeenCalled();
         expect(ckeditor.async).toHaveBeenCalledWith('replace', []);

         ckeditor.replace('arg1', {'name': 'value', 'name1': true});
         expect(ckeditor.async).toHaveBeenCalled();
         expect(ckeditor.async).toHaveBeenCalledWith('replace', ['arg1', {'name': 'value', 'name1': true}]);
      });
   });

   describe("the lconn.core.ckeditor.appendTo method", function() {
      it("calls lconn.core.ckeditor.async with the right params", function() {
         spyOn(ckeditor, 'async');

         ckeditor.appendTo();
         expect(ckeditor.async).toHaveBeenCalled();
         expect(ckeditor.async).toHaveBeenCalledWith('appendTo', []);

         ckeditor.appendTo('arg1', {'name': 'value', 'name1': true});
         expect(ckeditor.async).toHaveBeenCalled();
         expect(ckeditor.async).toHaveBeenCalledWith('appendTo', ['arg1', {'name': 'value', 'name1': true}]);
      });
   });

   describe("the lconn.core.ckeditor.async method", function() {
      it("calls net.jazz.ajax.xdloader.load_async with the right params", function() {
         spyOn(xdloader, 'load_layer_async');

         ckeditor.async('testMethod', [[], {autoGrow:'true', lite: 'true'}]);
         expect(xdloader.load_layer_async).toHaveBeenCalled();
         expect(xdloader.load_layer_async).toHaveBeenCalledWith('lconn.core.ckeditorstatic', ["lconn.core.ckeditor"], jasmine.any(Function));

         ckeditor.async('testMethod', [[]]);
         expect(xdloader.load_layer_async).toHaveBeenCalledWith('lconn.core.ckeditorstatic', ["lconn.core.ckeditor"], jasmine.any(Function));

         ckeditor.async('testMethod', [[], {lite: 'false'}]);
         expect(xdloader.load_layer_async).toHaveBeenCalledWith('lconn.core.ckeditorstatic', ["lconn.core.ckeditor"], jasmine.any(Function));
         
         ckeditor.async('testMethod', [[], {lite: 'true'}]);
         expect(xdloader.load_layer_async).toHaveBeenCalledWith('lconn.core.ckeditorstatic', ["lconn.core.ckeditor"], jasmine.any(Function));
      });
   });

   describe("the lconn.core.ckeditor.getHelpUrl method", function() {
      it("calls help.getProductHelpUrl with the right params", function() {
         spyOn(help, 'getProductHelpUrl');

         ckeditor.getHelpUrl();
         expect(help.getProductHelpUrl).toHaveBeenCalled();
         expect(help.getProductHelpUrl).toHaveBeenCalledWith('/topic/com.ibm.lotus.connections.common.help/eucommon_ckeditor.html');

         ckeditor.getHelpUrl('how/to/use/jasmine.html');
         expect(help.getProductHelpUrl).toHaveBeenCalled();
         expect(help.getProductHelpUrl).toHaveBeenCalledWith('/topic/how/to/use/jasmine.html');
      });
   });
}(lconn.core.ckeditor, net.jazz.ajax.xdloader, lconn.core.help));