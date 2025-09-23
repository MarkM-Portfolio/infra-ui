/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.WidgetPlacementSpec");

dojo.require("lconn.core.WidgetPlacement");

(function(WidgetPlacement) {
   describe("the interface of lconn.core.WidgetPlacement", function() {
      it("implements the expected core methods", function() {
         expect(WidgetPlacement.init).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.initEdit).toEqual(jasmine.any(Function));

         expect(WidgetPlacement.closeFullPageWidgetIfOpen).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.closeSwitchView).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.openHelpWindow).toEqual(jasmine.any(Function));
         expect(WidgetPlacement.URLChange).toEqual(jasmine.any(Function));
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
      });

      it("implements the expected methods in window object", function() {
         expect(window.changeHash).toEqual(jasmine.any(Function));
         expect(window.registerCloseViewFunction).toEqual(jasmine.any(Function));
         expect(window.closeOtherViews).toEqual(jasmine.any(Function));
         expect(window.switchView).toEqual(jasmine.any(Function));
         expect(window.setTitle).toEqual(jasmine.any(Function));
         expect(window.getResourcedStringForItem).toEqual(jasmine.any(Function));
         expect(window.getResourcedStringById).toEqual(jasmine.any(Function));
         expect(window.getDefaultWidgetName).toEqual(jasmine.any(Function));
         expect(window.getEscapedWidgetName).toEqual(jasmine.any(Function));
         expect(window.getWidgetName).toEqual(jasmine.any(Function));
         expect(window.addToNavBar).toEqual(jasmine.any(Function));
         expect(window.canAddWidget).toEqual(jasmine.any(Function));
         expect(window.canRemoveWidget).toEqual(jasmine.any(Function));
         expect(window.requestRemovalConfirmation).toEqual(jasmine.any(Function));
         expect(window.destroyWidgetContainer).toEqual(jasmine.any(Function));
         expect(window.highlightOverviewLink).toEqual(jasmine.any(Function));
         expect(window.isOverviewLinkSelected).toEqual(jasmine.any(Function));
         expect(window.activateTabbedWidget).toEqual(jasmine.any(Function));
         expect(window.getUserProfileOverrideProperty).toEqual(jasmine.any(Function));
         expect(window.handleModeExit).toEqual(jasmine.any(Function));
      });
   });
}(lconn.core.WidgetPlacement));
