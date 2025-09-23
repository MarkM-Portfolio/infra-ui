/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   "dojo/_base/array",
   "dojo/_base/lang",
   "dojo/_base/window",
   "ic-core/wp/_impl/layoutInfoStoreJsonImpl",
   "ic-core/wp/_impl/layoutInfoStoreXmlImpl",
   "ic-core/wp/utils"
], function(array, lang, windowModule, layoutInfoStoreJsonImpl, 
   layoutInfoStoreXmlImpl, wpUtils) {

   /**
    * Core specs
    * 
    * @namespace ic-test.wp
    */

   /**
    * Jasmine spec for the {@link ic-core.wp.utils} module
    * 
    * @module ic-test.wp.utilsSpec
    * @author Qi Xi <xiqish@cn.ibm.com>
    */

   var win = windowModule.global;

   describe("the interface of ic-core/wp/utils", function() {

      it("implements the expected methods", function() {
         expect(wpUtils.getWidgetDef).toEqual(jasmine.any(Function));
         expect(wpUtils.getAllWidgetDefs).toEqual(jasmine.any(Function));
         expect(wpUtils.getWidgetInstance).toEqual(jasmine.any(Function));
         expect(wpUtils.getWidgetInstancesByDef).toEqual(jasmine.any(Function));
         expect(wpUtils.getPageWidgetInstances).toEqual(jasmine.any(Function));
         expect(wpUtils.addWidgetInstance).toEqual(jasmine.any(Function));
         expect(wpUtils.removeWidgetInstance).toEqual(jasmine.any(Function));
         expect(wpUtils.withLayoutInfo).toEqual(jasmine.any(Function));
         expect(wpUtils.resetLayoutInfo).toEqual(jasmine.any(Function));

         expect(wpUtils.getI18nString).toEqual(jasmine.any(Function));
         expect(wpUtils.getResourcedStringForItem).toEqual(jasmine.any(Function));
         expect(wpUtils.getResourcedStringById).toEqual(jasmine.any(Function));
         expect(wpUtils.getDefaultWidgetName).toEqual(jasmine.any(Function));
         expect(wpUtils.getEscapedWidgetName).toEqual(jasmine.any(Function));
         expect(wpUtils.getWidgetName).toEqual(jasmine.any(Function));

         expect(wpUtils.isThemeSupported).toEqual(jasmine.any(Function));
         expect(wpUtils.isModeSupported).toEqual(jasmine.any(Function));
         expect(wpUtils.getUserProfileOverrideProperty).toEqual(jasmine.any(Function));
         expect(wpUtils.isUpdatesPage).toEqual(jasmine.any(Function));

         expect(wpUtils.sortWidgetInstances).toEqual(jasmine.any(Function));
         expect(wpUtils.setFocus).toEqual(jasmine.any(Function));
         expect(wpUtils.changeHash).toEqual(jasmine.any(Function));
         expect(wpUtils.setTitle).toEqual(jasmine.any(Function));

         expect(wpUtils.showAddWidgetDialog).toEqual(jasmine.any(Function));
         expect(wpUtils.showRemoveWidgetDialog).toEqual(jasmine.any(Function));
         expect(wpUtils.showFullWidgetDeleteConfirmation).toEqual(jasmine.any(Function));
         expect(wpUtils.getDialog).toEqual(jasmine.any(Function));
         expect(wpUtils.displayDialog).toEqual(jasmine.any(Function));
         expect(wpUtils.hideDialog).toEqual(jasmine.any(Function)); 
      });
      
   });

   var params = [{
          name :  'use XML',
          impl : layoutInfoStoreXmlImpl,
          useJSON : false,
          dataUrl1 : './data/widgets-config-1.xml?resourceId=',
          dataUrl2 : './data/widgets-config-2.xml?resourceId=',
          documentKey : 'widgetConfigXMLDocument',
          pageId : 'communityOverview',
          defaultPageId : "communityOverview"
       }, {
          name :  'use JSON',
          impl : layoutInfoStoreJsonImpl,
          useJSON : true,
          dataUrl1 : './data/widgets-config-1.json?resourceId=',
          dataUrl2 : './data/widgets-config-2.json?resourceId=',
          documentKey : 'widgetConfigDocument',
          pageId : 'communityOverview',
          defaultPageId : "communityOverview"
       }];

   array.forEach(params, lang.hitch(this, function(param) {
      win.gatekeeperConfig = win.gatekeeperConfig || {};
      win.gatekeeperConfig['json-widget-metadata'] = param.useJSON;
      win.WidgetPlacementConfig = win.WidgetPlacementConfig || {
         pageId : param.pageId,
         defaultPageId : param.defaultPageId
      };

      describe("the retrieval of widget metadata - " + param.name, function() {

         it("implements the retrieval of widget metadata (no local data)", function(done) {
            win.WidgetPlacementConfig[param.documentKey] = null;
            win.WidgetPlacementConfig.layoutInfoUrl = param.dataUrl1;
            param.impl.withLayoutInfo().then(function(){
               expect(win.WidgetPlacementConfig[param.documentKey]).not.toBeNull();
            }, function(){
               // TODO: don't know what to test here
               return;
            }).always(done);
         });

         it("implements the retrieval of widget metadata (local data existed and no force refresh)", function(done) {
            var data = win.WidgetPlacementConfig[param.documentKey];
            win.WidgetPlacementConfig.layoutInfoUrl = param.dataUrl2;
            param.impl.withLayoutInfo().then(function(){
               expect(win.WidgetPlacementConfig[param.documentKey]).toBe(data);
            }, function(){
               // TODO: don't know what to test here
               return;
            }).always(done);
         });

         it("implements the retrieval of widget metadata (local data existed and force refresh)", function(done) {
            var data = win.WidgetPlacementConfig[param.documentKey];
            param.impl.withLayoutInfo(true).then(function(){
               expect(win.WidgetPlacementConfig[param.documentKey]).not.toBe(data);
            }, function(){
               // TODO: don't know what to test here
               return;
            }).always(done);
         });

         it("implements the retrieval of widget metadata (local data existed and stale mark)", function(done) {
            var data = win.WidgetPlacementConfig[param.documentKey];
            win.WidgetPlacementConfig.layoutInfoUrl = param.dataUrl1;
            win.staleXMLConfig = true;
            param.impl.withLayoutInfo(true).then(function(){
               expect(win.WidgetPlacementConfig[param.documentKey]).not.toBe(data);
               expect(win.staleXMLConfig).toEqual(false);
            }, function(){
               // TODO: don't know what to test here
               return;
            }).always(done);
         });

      });

      describe("the visit to widget metadata - " + param.name, function() {

         it("implements the visit to existent widget definition", function() {
            var widgetDef = param.impl.getWidgetDef('Members');
            expect(widgetDef).not.toBeNull();
            expect(widgetDef).toEqual(jasmine.any(Object));
            expect(widgetDef.defId).toEqual('Members');
         });

         it("implements the visit to inexistent widget definition", function() {
            var widgetDef = param.impl.getWidgetDef('Wissenschaft');
            expect(widgetDef).toBeNull();
         });

         it("implements the visit to existent widget instance", function() {
            var widgetInstance = param.impl.getWidgetInstance('We1b2655bd8b5_4ff7_845a_6832def1337d');
            expect(widgetInstance).not.toBeNull();
            expect(widgetInstance).toEqual(jasmine.any(Object));
            expect(widgetInstance.defIdRef).toEqual('ImportantBookmarks');
         });

         it("implements the visit to inexistent widget instance", function() {
            var widgetInstance = param.impl.getWidgetInstance('Wissenschaft_instance');
            expect(widgetInstance).toBeNull();
         });

         it("implements the visit to widget instances with its definition", function() {
            var widgetDefId = 'Members',
                widgetDef = param.impl.getWidgetDef(widgetDefId),
                widgetInstances = null;

            widgetInstances = param.impl.getWidgetInstancesByDef(widgetDefId);
            expect(widgetInstances).not.toBeNull();
            expect(widgetInstances).toEqual(jasmine.any(Array));
            expect(widgetInstances.length).toEqual(1);

            widgetInstances = param.impl.getWidgetInstancesByDef(widgetDef);
            expect(widgetInstances).not.toBeNull();
            expect(widgetInstances).toEqual(jasmine.any(Array));
            expect(widgetInstances.length).toEqual(1);
            
            widgetInstances = param.impl.getWidgetInstancesByDef(null);
            expect(widgetInstances).toBeNull();
         });

         it("implements the visit to widget definition with its instance", function() {
            var widgetInstanceId = 'We1b2655bd8b5_4ff7_845a_6832def1337d',
                widgetInstance = param.impl.getWidgetInstance(widgetInstanceId),
                widgetDef = null;

            widgetDef = param.impl.getWidgetDefByInstance(widgetInstanceId);
            expect(widgetDef).not.toBeNull();
            expect(widgetDef).toEqual(jasmine.any(Object));
            expect(widgetDef.defId).toEqual('ImportantBookmarks');

            widgetDef = param.impl.getWidgetDefByInstance(widgetInstance);
            expect(widgetDef).not.toBeNull();
            expect(widgetDef).toEqual(jasmine.any(Object));
            expect(widgetDef.defId).toEqual('ImportantBookmarks');
            
            widgetDef = param.impl.getWidgetDefByInstance(null);
            expect(widgetDef).toBeNull();
         });

         it("implements the visit to all widget instances when pageId='communityOverview'", function() {
            var widgetInstances = param.impl.getPageWidgetInstances('communityOverview');
            expect(widgetInstances).not.toBeNull();
            expect(widgetInstances).toEqual(jasmine.any(Array));
            expect(widgetInstances.length).toEqual(10);
         });

         it("implements the visit to all widget definitions", function() {
            var widgetDefs = param.impl.getAllWidgetDefs();
            expect(widgetDefs).not.toBeNull();
            expect(widgetDefs).toEqual(jasmine.any(Array));
            expect(widgetDefs.length).toEqual(22);
         });

      });

      describe("the modification of widget metadata with WidgetPlacement - " + param.name, function() {

         var widgetInstance = {
               instanceId : 'instanceId_test',
               defIdRef : 'defId_test',
               uiLocation : 'column_test'
             },
             widgetInstance_fail = {
               defIdRef : 'defId_test',
               uiLocation : 'column_test'
             },
             widgetInstance_fail1 = {
               instanceId : 'instanceId_test',
               uiLocation : 'column_test'
             },
             widgetInstance_fail2 = {
               instanceId : 'instanceId_test',
               defIdRef : 'defId_test'
             };

         it("implements the adding of widget instance", function() {
            var success = param.impl.addWidgetInstance(widgetInstance);
            expect(success).toEqual(true);

            var instanceId = widgetInstance.instanceId;
            var rWidgetInstance = param.impl.getWidgetInstance(instanceId);
            expect(rWidgetInstance).not.toBeNull();

            success = param.impl.addWidgetInstance(widgetInstance_fail);
            expect(success).toEqual(false);

            success = param.impl.addWidgetInstance(widgetInstance_fail1);
            expect(success).toEqual(false);

            success = param.impl.addWidgetInstance(widgetInstance_fail2);
            expect(success).toEqual(false);
         });

         it("implements the hiding of widget instance", function() {
            var instanceId = widgetInstance.instanceId;
            var success = param.impl.removeWidgetInstance(instanceId, null, null, true);
            expect(success).toEqual(true);

            var rWidgetInstance = param.impl.getWidgetInstance(instanceId);
            expect(rWidgetInstance).not.toBeNull();
            expect(rWidgetInstance.enabled).toEqual('false');
         });

         it("implements the unhiding of widget instance", function() {
            var instanceId = widgetInstance.instanceId;
            var success = param.impl.addWidgetInstance(instanceId, null, null, true);
            expect(success).toEqual(true);

            var rWidgetInstance = param.impl.getWidgetInstance(instanceId);
            expect(rWidgetInstance).not.toBeNull();
            expect(rWidgetInstance.enabled).toEqual('true');
         });

         it("implements the removal of widget instance", function() {
            var instanceId = widgetInstance.instanceId;
            var success = param.impl.removeWidgetInstance(instanceId);
            expect(success).toEqual(true);

            var rWidgetInstance = param.impl.getWidgetInstance(instanceId);
            expect(rWidgetInstance).toBeNull();
         });

      });

   }));

});