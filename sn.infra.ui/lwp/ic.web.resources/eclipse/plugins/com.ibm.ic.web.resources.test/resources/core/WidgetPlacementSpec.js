/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([ "ic-core/WidgetPlacement",
         "dojo/_base/window"
], function(WidgetPlacement, windowModule) {

   /**
    * Core specs
    * 
    * @namespace ic-test.core
    */

   /**
    * Jasmine spec for the {@link ic-core.WidgetPlacement} module
    * 
    * @module ic-test.core.WidgetPlacementSpec
    * @author Qi Xi <xiqish@cn.ibm.com>
    */
   var win = windowModule.global;

   describe("the interface of ic-core/WidgetPlacement", function() {

      it("implements the expected util methods", function() {
         var utils = WidgetPlacement.utils;
         expect(utils.getWidgetDef).toEqual(jasmine.any(Function));
         expect(utils.getAllWidgetDefs).toEqual(jasmine.any(Function));
         expect(utils.getWidgetInstance).toEqual(jasmine.any(Function));
         expect(utils.getWidgetInstancesByDef).toEqual(jasmine.any(Function));
         expect(utils.getPageWidgetInstances).toEqual(jasmine.any(Function));
         expect(utils.withLayoutInfo).toEqual(jasmine.any(Function));

         expect(utils.getResourcedStringForItem).toEqual(jasmine.any(Function));
         expect(utils.getResourcedStringById).toEqual(jasmine.any(Function));
         expect(utils.getDefaultWidgetName).toEqual(jasmine.any(Function));
         expect(utils.getEscapedWidgetName).toEqual(jasmine.any(Function));
         expect(utils.getWidgetName).toEqual(jasmine.any(Function));
         expect(utils.getResourcedStringById).toEqual(jasmine.any(Function));
      });

      it("implements the expected core methods", function() {
         expect(WidgetPlacement.init).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.initEdit).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.closeOtherViews).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.closeFullPageWidgetIfOpen).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.closeSwitchView).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.switchView).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.handleModeExit).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.openHelpWindow).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.URLChange).toEqual(jasmine.any(Function));
         
         expect(WidgetPlacement.changeHash).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.setTitle).toEqual(jasmine.any(Function));
      });

      it("implements the expected methods for widgets", function() {
         expect(WidgetPlacement.getWidgetDocAndRenderWidget).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.destroyWidget).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.unhideWidget).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.renderWidgets).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.refresh).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.fetchAndRefresh).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.removeWidget).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.addWidgetToServerAndRender).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.minimizeWidget).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.addTabsWithOnclickCalls).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.addEditTabsWithOnclickCalls).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.showFirstTab).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.loadWidgetFullPage).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.loadFullpageView).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.reloadOverviewPage).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.canAddWidget).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.canRemoveWidget).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.requestRemovalConfirmation).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.activateTabbedWidget).toEqual(jasmine.any(Function));
      });

      it("implements the expected methods for columns/layout", function() {
         expect(WidgetPlacement.getInsertionPoint).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.getColumn3Anchor).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.getColumn2Anchor).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.checkWidgetLocation).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.getUILocation).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.getColumnWidgetNodes).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.sortWidgetNodes).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.onDropHandler).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.moveDown).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.moveUp).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.moveToNextColumn).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.moveToPreviousColumn).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.moveWidgetToEnd).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.showColumn).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.hideColumn).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.changeLayout).toEqual(jasmine.any(Function));
      });

      it("implements the expected methods for widget wrappers", function() {
         expect(WidgetPlacement.placeWidgetMetadata).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.refreshTitleAndMicroformat).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.changeTitle).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.updateMoreActions).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.openMenu).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.destroyWidgetContainer).toEqual(jasmine.any(Function));
      });

      it("implements the expected methods for navigator bar", function() {
         expect(WidgetPlacement.addToNavBar).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.highlightOverviewLink).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.isOverviewLinkSelected).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.highlightOverviewLink).toEqual(jasmine.any(Function));
      });

      it("implements the expected methods for messages", function() {
         expect(WidgetPlacement.displayDialog).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.showWidgetErrorInHeadline).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.customAddWidgetErrorHandler).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.showFullWidgetDeleteConfirmation).toEqual(jasmine.any(Function));
      });

      it("implements the expected helper methods", function() {
         expect(WidgetPlacement.getWidgetDefId).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.setFocus).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.getUserProfileOverrideProperty).toEqual(jasmine.any(Function));
      });

      it("implements the expected methods in global object (deprecated)", function() {
         expect(win.changeHash).toEqual(jasmine.any(Function));
         expect(win.registerCloseViewFunction).toEqual(jasmine.any(Function));
         expect(win.closeOtherViews).toEqual(jasmine.any(Function));
         expect(win.switchView).toEqual(jasmine.any(Function));
         expect(win.setTitle).toEqual(jasmine.any(Function));
         expect(win.getResourcedStringForItem).toEqual(jasmine.any(Function));
         expect(win.getResourcedStringById).toEqual(jasmine.any(Function));
         expect(win.getDefaultWidgetName).toEqual(jasmine.any(Function));
         expect(win.getEscapedWidgetName).toEqual(jasmine.any(Function));
         expect(win.getWidgetName).toEqual(jasmine.any(Function));
         expect(win.addToNavBar).toEqual(jasmine.any(Function));
         expect(win.canAddWidget).toEqual(jasmine.any(Function));
         expect(win.canRemoveWidget).toEqual(jasmine.any(Function));
         expect(win.requestRemovalConfirmation).toEqual(jasmine.any(Function));
         expect(win.destroyWidgetContainer).toEqual(jasmine.any(Function));
         expect(win.highlightOverviewLink).toEqual(jasmine.any(Function));
         expect(win.isOverviewLinkSelected).toEqual(jasmine.any(Function));
         expect(win.activateTabbedWidget).toEqual(jasmine.any(Function));
         expect(win.getUserProfileOverrideProperty).toEqual(jasmine.any(Function));
         expect(win.handleModeExit).toEqual(jasmine.any(Function));
      });
   });

   var utils = WidgetPlacement.utils,
       dataUrl1 = './data/widgets-config-1.xml?resourceId=',
       dataUrl2 = './data/widgets-config-2.xml?resourceId=';
   
   win.WidgetPlacementConfig.layoutInfoUrl = dataUrl1;
   win.WidgetPlacementConfig.widgetConfigXMLDocument = null;
   win.WidgetPlacementConfig.pageId = 'communityOverview';

   describe("the retrieval of widget metadata with WidgetPlacement", function() {

      it("implements the retrieval of widget metadata (no local data)", function(done) {
         utils.withLayoutInfo().then(function(){
            expect(win.WidgetPlacementConfig.widgetConfigXMLDocument).not.toBeNull();
         }, function(){
            // TODO: don't know what to test here
            return;
         }).always(done);
      });

      it("implements the retrieval of widget metadata (local data existed and no force refresh)", function(done) {
         var data = win.WidgetPlacementConfig.widgetConfigXMLDocument;

         win.WidgetPlacementConfig.layoutInfoUrl = dataUrl2;
         utils.withLayoutInfo().then(function(){
            expect(win.WidgetPlacementConfig.widgetConfigXMLDocument).toBe(data);
         }, function(){
            // TODO: don't know what to test here
            return;
         }).always(done);
      });

      it("implements the retrieval of widget metadata (local data existed and force refresh)", function(done) {
         var data = win.WidgetPlacementConfig.widgetConfigXMLDocument;
         utils.withLayoutInfo(true).then(function(){
            expect(win.WidgetPlacementConfig.widgetConfigXMLDocument).not.toBe(data);
         }, function(){
            // TODO: don't know what to test here
            return;
         }).always(done);
      });

      it("implements the retrieval of widget metadata (local data existed and stale mark)", function(done) {
         var data = win.WidgetPlacementConfig.widgetConfigXMLDocument;

         win.WidgetPlacementConfig.layoutInfoUrl = dataUrl1;
         win.staleXMLConfig = true;
         utils.withLayoutInfo(true).then(function(){
            expect(win.WidgetPlacementConfig.widgetConfigXMLDocument).not.toBe(data);
            expect(win.staleXMLConfig).toEqual(false);
         }, function(){
            // TODO: don't know what to test here
            return;
         }).always(done);
      });
   });

   describe("the visit to widget metadata with WidgetPlacement", function() {

      it("implements the visit to existent widget definition", function() {
         var widgetDef = utils.getWidgetDef('Members');
         expect(widgetDef).not.toBeNull();
         expect(widgetDef).toEqual(jasmine.any(Object));
         expect(widgetDef.defId).toEqual('Members');
      });

      it("implements the visit to inexistent widget definition", function() {
         var widgetDef = utils.getWidgetDef('Wissenschaft');
         expect(widgetDef).toBeNull();
      });

      it("implements the visit to existent widget instance", function() {
         var widgetInstance = utils.getWidgetInstance('We1b2655bd8b5_4ff7_845a_6832def1337d');
         expect(widgetInstance).not.toBeNull();
         expect(widgetInstance).toEqual(jasmine.any(Object));
         expect(widgetInstance.defIdRef).toEqual('ImportantBookmarks');
      });

      it("implements the visit to inexistent widget instance", function() {
         var widgetInstance = utils.getWidgetInstance('Wissenschaft_instance');
         expect(widgetInstance).toBeNull();
      });

      it("implements the visit to widget instances with its definition", function() {
         var widgetDefId = 'Members',
             widgetDef = utils.getWidgetDef(widgetDefId),
             widgetInstances = null;

         widgetInstances = utils.getWidgetInstancesByDef(widgetDefId);
         expect(widgetInstances).not.toBeNull();
         expect(widgetInstances).toEqual(jasmine.any(Array));
         expect(widgetInstances.length).toEqual(1);

         widgetInstances = utils.getWidgetInstancesByDef(widgetDef);
         expect(widgetInstances).not.toBeNull();
         expect(widgetInstances).toEqual(jasmine.any(Array));
         expect(widgetInstances.length).toEqual(1);
         
         widgetInstances = utils.getWidgetInstancesByDef(null);
         expect(widgetInstances).toBeNull();
      });

      it("implements the visit to widget definition with its instance", function() {
         var widgetInstanceId = 'We1b2655bd8b5_4ff7_845a_6832def1337d',
             widgetInstance = utils.getWidgetInstance(widgetInstanceId),
             widgetDef = null;

         widgetDef = utils.getWidgetDefByInstance(widgetInstanceId);
         expect(widgetDef).not.toBeNull();
         expect(widgetDef).toEqual(jasmine.any(Object));
         expect(widgetDef.defId).toEqual('ImportantBookmarks');

         widgetDef = utils.getWidgetDefByInstance(widgetInstance);
         expect(widgetDef).not.toBeNull();
         expect(widgetDef).toEqual(jasmine.any(Object));
         expect(widgetDef.defId).toEqual('ImportantBookmarks');
         
         widgetDef = utils.getWidgetDefByInstance(null);
         expect(widgetDef).toBeNull();
      });

      it("implements the visit to all widget instances when pageId='communityOverview'", function() {
         var widgetInstances = utils.getPageWidgetInstances('communityOverview');
         expect(widgetInstances).not.toBeNull();
         expect(widgetInstances).toEqual(jasmine.any(Array));
         expect(widgetInstances.length).toEqual(10);
      });

      it("implements the visit to all widget definitions", function() {
         var widgetDefs = utils.getAllWidgetDefs();
         expect(widgetDefs).not.toBeNull();
         expect(widgetDefs).toEqual(jasmine.any(Array));
         expect(widgetDefs.length).toEqual(22);
      });
   });
});
