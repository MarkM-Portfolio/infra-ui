/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   'dojo/_base/kernel',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/hash',
   'dojo/query',
   './help',
   './wp/core',
   './wp/layout',
   './wp/navigation',
   './wp/configs',
   './wp/signals',
   './wp/utils',
   './wp/widgets',
   'ic-ui/DialogUtil'
],
   function(kernel, lang, windowModule, hash, query, help, core, layout,
      navigation, wpConfig, signals, utils, widgets, DialogUtil) {

      /**
       * IBM Connections Widget Framework
       * 
       * @namespace ic-core.WidgetPlacement
       * @author Xiao Feng Yu <yuxiaof@cn.ibm.com>
       * @author Qi Xi <xiqish@cn.ibm.com>
       */

      var win = windowModule.global;

      var wp = {
            utils : {}
          };
      lang.mixin(wp.utils, utils);
      
      wp.initialLoad = null;
      wp.currentFullpageWidgetInstanceId = null;
      wp.onlyFullPageWidgetLoaded = false;
      wp.registerCloseViewFunction = null;
      wp.isInWidgetFullpageMode = false;
      wp.addWidgetInProgress = false;
      wp.removeWidgetInProgress = false;
      wp.currentNode = null;
      wp.URLChangeCallBack = [];

      signals.watch(function(name, oldValue, value) {
         wp[name] = value;
      });

      wp._freeLayout = wpConfig('freeLayout');

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function showColumn
       * @param {string} column The column to show
       */
      wp.showColumn = function(column) {
         layout.showColumn(column);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function hideColumn
       * @param {string} column The column to hide
       */
      wp.hideColumn = function(column) {
         layout.hideColumn(column);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function changeHash
       * @param {string} hashValue
       */
      wp.changeHash = function(hashValue) {
         utils.changeHash(hashValue);
      };
      win.changeHash = function(hashValue) {
         kernel.deprecated('window.changeHash()', 'use changeHash() in ic-core/WidgetPlacement instead', '5.5');
         wp.changeHash(hashValue);
      };

      win.registerCloseViewFunction = function(callback1) {
         kernel.deprecated('window.registerCloseViewFunction()', 'use registerCloseViewFunction in ic-core/WidgetPlacement instead', '5.5');
         wp.registerCloseViewFunction = callback1;
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function closeOtherViews
       */
      wp.closeOtherViews = function() {
         core.closeOtherViews();
      };
      win.closeOtherViews = function() {
         kernel.deprecated('window.closeOtherViews()', 'use closeOtherViews() in ic-core/WidgetPlacement instead', '5.5');
         wp.closeOtherViews();
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function switchView
       * @param {Object} widgetDef
       * @param {string} widgetInstanceId
       * @param {Object} [additionalParameters]
       */
      wp.switchView = function(widgetDef, widgetInstanceId, additionalParameters) {
         core.switchView(widgetDef, widgetInstanceId, additionalParameters);
      };
      win.switchView = function(widgetDef, widgetInstanceId, additionalParameters, overwriteDefaultNavBarOverviewLink, addState) {
         kernel.deprecated('window.switchView()', 'use switchView() in ic-core/WidgetPlacement instead', '5.5');
         wp.switchView(widgetDef, widgetInstanceId, additionalParameters);
      };

      var _getTitleFromEle = function(/*Element*/ ele) {
         var node = query('a', ele);
         if (node.length) {
            return lang.trim(node[0][(has('ie') ? 'innerText' : 'textContent')]);
         }

         return null;
      };

      /**
       * Set window title as {component} - {community}  
       * 
       * @memberof ic-core.WidgetPlacement
       * @function setTitle
       * @param {string} title
       */
      wp.setTitle = function(title) {
         utils.setTitle(title);
      };
      win.setTitle = function(el) {
         kernel.deprecated('window.setTitle()', 'use setTitle() in ic-core/WidgetPlacement instead', '5.5');
         try {
            var title = _getTitleFromEle(el);
            if (title) {
               wp.setTitle(title);
            }
         } catch (e) { }
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function getResourcedStringForItem
       * @param {Object} widgetDef
       * @param {string} attributeName
       * @returns {string}
       */
      wp.utils.getResourcedStringForItem = function(widgetDef, attributeName) {
         return utils.getResourcedStringForItem(widgetDef, attributeName);
      };
      win.getResourcedStringForItem = function(widgetDef, attributeName) {
         kernel.deprecated('window.getResourcedStringForItem()', 'use getResourcedStringForItem() in ic-core/WidgetPlacement instead', '5.5');
         return wp.utils.getResourcedStringForItem(widgetDef, attributeName);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function getResourcedStringById
       * @param {Object} widgetDef
       * @param {string} stringId
       * @returns {string} 
       */
      wp.utils.getResourcedStringById = function(widgetDef, stringId) {
         return utils.getResourcedStringById(widgetDef, stringId);
      };
      win.getResourcedStringById = function(widgetDef, stringId) {
         kernel.deprecated('window.getResourcedStringById()', 'use getResourcedStringById() in ic-core/WidgetPlacement instead', '5.5');
         return wp.utils.getResourcedStringById(widgetDef, stringId);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function getDefaultWidgetName
       * @param {Object} widgetDef
       * @param {string} [mode='default']
       * @param {string} [defaultTitle]
       * @returns {string}
       */
      wp.utils.getDefaultWidgetName = function(widgetDef, mode) {
         return utils.getDefaultWidgetName(widgetDef, mode);
      };
      win.getDefaultWidgetName = function(widgetDef, mode, defaultTitle) {
         kernel.deprecated('window.getDefaultWidgetName()', 'use getDefaultWidgetName() in ic-core/WidgetPlacement instead', '5.5');
         return wp.utils.getDefaultWidgetName(widgetDef, mode, defaultTitle);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function getEscapedWidgetName
       * @param {Object} widgetDef
       * @param {Object} widgetInstance
       * @param {Boolean} [inline=false]
       * @param {string} [mode='default']
       * @returns {string}
       */
      wp.utils.getEscapedWidgetName = function(widgetDef, widgetInstance, inline, mode) {
         return utils.getEscapedWidgetName(widgetDef, widgetInstance, inline, mode);
      };
      win.getEscapedWidgetName = function(widgetDef, widgetInstance, inline, mode) {
         kernel.deprecated('window.getEscapedWidgetName()', 'use getEscapedWidgetName() in ic-core/WidgetPlacement instead', '5.5');
         return wp.utils.getEscapedWidgetName(widgetDef, widgetInstance, inline, mode);
      };

      /**
       * Get Widget name, taking renaming into account
       * 
       * @memberof ic-core.WidgetPlacement
       * @function getWidgetName
       * @param {Object} widgetDef
       * @param {Object} widgetInstance
       * @param {string} [mode='default']
       * @returns {string}
       */
      wp.utils.getWidgetName = function(widgetDef, widgetInstance, mode) {
         return utils.getWidgetName(widgetDef, widgetInstance, mode);
      };
      win.getWidgetName = function(widgetDef, widgetInstance, mode) {
         kernel.deprecated('window.getWidgetName()', 'use getWidgetName() in ic-core/WidgetPlacement instead', '5.5');
         return wp.utils.getWidgetName(widgetDef, widgetInstance, mode);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function addToNavBar
       * @param {Object} widgetDef
       * @param {Object} widgetInstance
       * @param {Boolean} [selected=false]
       * @param {string} [navBarLink]
       * @param {string} [navBarLinkText]
       */
      wp.addToNavBar = function(widgetDef, widgetInstance, selected, navBarLink, navBarLinkText) {
         navigation.get().addNavItem(widgetDef, widgetInstance, selected, navBarLink, navBarLinkText);
      };
      win.addToNavBar = function(widgetDef, widgetInstance, displayedUserInfo, selected, navBarLink, overwriteDefaultNavBarOverviewLink, navBarLinkText) {
         kernel.deprecated('window.addToNavBar()', 'use addToNavBar() in ic-core/WidgetPlacement instead', '5.5');
         wp.addToNavBar(widgetDef, widgetInstance, selected, navBarLink, navBarLinkText);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function canAddWidget
       * @param {Object} widgetDef
       * @param {Object} WidgetPlacementConfig
       * @param {Boolean} canPersonalize
       * @param {Object} widgetInstance
       * @param {Boolean} [showHiden=false]
       * @returns {Boolean}
       */
      wp.canAddWidget = function(widgetDef, config, canPersonalize, widgetInstance, showHiden) {
         return widgets.canAddWidget(widgetDef, config, canPersonalize, widgetInstance, showHiden);
      };
      win.canAddWidget = function(widgetDef, config, canPersonalize, widgetInstance, showHiden) {
         kernel.deprecated('window.canAddWidget()', 'use canAddWidget in ic-core/WidgetPlacement instead', '5.5');
         return wp.canAddWidget(widgetDef, config, canPersonalize, widgetInstance, showHiden);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function canRemoveWidget
       * @param {string} instanceId
       * @param {Boolean} [removeWidgetData=false]
       * @returns {Boolean}
       */
      wp.canRemoveWidget = function(instanceId, removeWidgetData) {
         return widgets.canRemoveWidget(instanceId, removeWidgetData);
      };
      win.canRemoveWidget = function(instanceId, removeWidgetData) {
         kernel.deprecated('window.canRemoveWidget()', 'use canRemoveWidget in ic-core/WidgetPlacement instead', '5.5');
         return wp.canRemoveWidget(instanceId, removeWidgetData);
      };

      wp.requestRemovalConfirmation = function(prompt, widgetInstanceId, removeData) {
         return widgets.requestRemovalConfirmation(prompt, widgetInstanceId, removeData);
      };
      win.requestRemovalConfirmation = function(prompt, widgetInstanceId, removeData) {
         kernel.deprecated('window.requestRemovalConfirmation()', 'use requestRemovalConfirmation in ic-core/WidgetPlacement instead', '5.5');
         return wp.requestRemovalConfirmation(prompt, widgetInstanceId, removeData);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function destroyWidgetContainer
       * @param {string} containerId
       */
      wp.destroyWidgetContainer = function(containerId) {
         layout.destroyColumn(containerId);
      };
      win.destroyWidgetContainer = function(containerId) {
         kernel.deprecated('window.destroyWidgetContainer()', 'use destroyWidgetContainer() in ic-core/WidgetPlacement instead', '5.5');
         wp.destroyWidgetContainer(containerId);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function highlightOverviewLink
       */
      wp.highlightOverviewLink = function() {
         nav._highlightNavItem();
      };
      win.highlightOverviewLink = function() {
         kernel.deprecated('window.highlightOverviewLink()', 'use highlightOverviewLink() in ic-core/WidgetPlacement instead', '5.5');
         wp.highlightOverviewLink();
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function isOverviewLinkSelected
       * @returns {Boolean} 
       */
      wp.isOverviewLinkSelected = function() {
         return navigation.get().isNavItemSelected();
      };
      win.isOverviewLinkSelected = function() {
         kernel.deprecated('window.isOverviewLinkSelected()', 'use isOverviewLinkSelected() in ic-core/WidgetPlacement instead', '5.5');
         return wp.isOverviewLinkSelected();
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function activateTabbedWidget
       * @param {Object} widgetDef
       * @param {Object} widgetInstance
       * @param {string} widgetMode
       * @param {string} intialDisplayDomId
       * @param {string} TabContainerDomId
       * @param {Boolean} [bDestroyTabContainerFirst=false]
       * @param {Object} [attributesMap]
       */
      wp.activateTabbedWidget = function(widgetDef, widgetInstance, widgetMode, intialDisplayDomId, TabContainerDomId, bDestroyTabContainerFirst, attributesMap) {
         core.activateTabbedWidget(widgetDef, widgetInstance, widgetMode, intialDisplayDomId, TabContainerDomId, bDestroyTabContainerFirst, attributesMap);
      };
      win.activateTabbedWidget = function(widgetDef, widgetInstance, widgetMode, intialDisplayDomId, TabContainerDomId, bDestroyTabContainerFirst, attributesMap) {
         kernel.deprecated('window.activeTabbedWidget()', 'use activeTabbedWidget() in ic-core/WidgetPlacement instead', '5.5');
         wp.activeTabbedWidget(widgetDef, widgetInstance, widgetMode, intialDisplayDomId, TabContainerDomId, bDestroyTabContainerFirst, attributesMap);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function getUserProfileOverrideProperty
       * @param {string} propertyName Name of the property
       * @returns {string} value of the property
       */
      wp.getUserProfileOverrideProperty = function(propertyName) {
         return utils.getUserProfileOverrideProperty(propertyName);
      };
      win.getUserProfileOverrideProperty = function(propertyName) {
         kernel.deprecated('window.getUserProfileOverrideProperty()', 'use getUserProfileOverrideProperty() in ic-core/WidgetPlacement instead', '5.5');
         return wp.getUserProfileOverrideProperty(propertyName);
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function handleModeExit
       * @param {Boolean} [ignoreCallBack=false]
       */
      wp.handleModeExit = function(ignoreCallBack) {
         core.handleModeExit(ignoreCallBack);
      };
      win.handleModeExit = function(ignoreCallBack) {
         kernel.deprecated('window.handleModeExit()','use handleModeExit() in ic-core/WidgetPlacement instead','5.5');
         wp.handleModeExit(ignoreCallBack);
      };
      // common code ends here

      // all requires are handled by WidgetPlacement
      // Has content from communities UI strings
      // Generated by administrator configuration
      if (!win.WidgetPlacementConfig)
         win.WidgetPlacementConfig = {
            debug : false,
            appStartupDate : ''
         };

      // keeps a list of all the widget-containers avaiable. 
      // format: [containerDOMId, (true | false)]
//      wp.uiLocations = {}; 
//      wp.dropZoneObjects = {};

      // Returns node displaying the widget.
      wp.getWidgetDocAndRenderWidget = function(widgetDefId, widgetDef, widgetInstanceId, uiLocation, widgetMode, skinType, addToNavBar, addDropZone, attributesMap) {
         var widgetDef = widgetDef || widgetDefId;
         var opts = {
               widgetMode : widgetMode,
               skinType : skinType,
               addToNavBar : addToNavBar,
               addDropZone : addDropZone,
               attributesMap : attributesMap
         };
         widgets.renderWidget(widgetDef, widgetInstanceId, uiLocation, opts);
      };

      wp.destroyWidget = function(widgetInstanceId, uiLocation, destroyDropDownMenu, destroySubArea, deleteDNDItem) {
         var opts = {
               destroyDropDownMenu : destroyDropDownMenu,
               destroySubArea : destroySubArea,
               deleteDNDItem : deleteDNDItem
         }
         widgets.destroyWidget(widgetInstanceId, uiLocation, opts);
      };

      wp.closeFullPageWidgetIfOpen = function() {
         core.closeFullPageWidgetIfOpen();
      };

      wp.closeSwitchView = function() {
         core.closeSwitchView();
      };

      wp.getInsertionPoint = function(lotusNavBar, li) {
         navigation.get().getInsertionPoint(li);
      };

      wp.openHelpWindow = function(url) {
         // Strip off lang parameter as launchHelp will add one
         var langPos = url.indexOf('&lang');
         if (langPos > 0) {
            url = url.substr(0, langPos);
         }
         help.launchHelp(url);
      };

      wp.checkWidgetLocation = function(widgetInstanceId, uiLocation) {
         return widgets.getWidgetLocation(widgetInstanceId, uiLocation);
      };

      wp.getUILocation = function(widgetInstanceId) {
         return widgets.getUILocation(widgetInstanceId);
      };

      wp.updateMoreActions = function(widgetInstanceId) {
         widgets.updateActions(widgetInstandeId);
      };

      wp.openMenu = function(event, widgetId, id) {
         widgets.openMenu(widgetid, event);
      };

      wp.sortWidgetNodes = function(nodes) {
         return utils.sortWidgetNodes(nodes);
      };

      wp.placeWidgetMetadata = function(addToNavBarBoolean, widgetMode) {
         return core.placeWidgetMetadata(addToNavBarBoolean, widgetMode);
      };

      wp.onDropHandler = function(source, nodes, iscopy) {
         layout.onDropHandler(source, nodes, iscopy);
      };

      // Returns widget instance id to use as previous id for widgets moved to
      // top of column 3
      wp.getColumn3Anchor = function() {
         return layout.getColumnAnchor('col3');
      };

      // Returns widget instance id to use as previous id for widgets moved to
      // top of column 2
      wp.getColumn2Anchor = function() {
         return layout.getColumnAnchor('col2');
      };

      wp.unhideWidget = function(widgetId) {
         widgets.unhideWidget(widgetId);
      };

      wp.renderWidgets = function(widgetSpecs) {
         widgets.renderWidgets(widgetSpec);
      };

      wp.loadWidgetFullPage = function(widgetId, additionalParameters) {
         core.loadFullpageView(widgetId, additionalParameters, true, true);
      };

      wp.loadFullpageView = function(instanceId, additionalParameters, addState, overrideOverViewLink, dontRegisterCloseView) {
         core.loadFullpageView(instanceId, additionalParameters, addState, overrideOverViewLink, dontRegisterCloseView);
      };

      wp.reloadOverviewPage = function() {
         return core.reloadOverviewPage();
      };

      wp.getWidgetDefId = function(instanceId, widgetDataDoc) {
         var widgetInstance = wp.utils.getWidgetInstance(instanceId, widgetDataDoc),
             defIdRef = ((widgetInstance) ? widgetInstance.defIdRef : instanceId);

         return defIdRef;
      };

      var _showMisplacedWarning = function(instanceId) {
         _showMessageInWidget(instanceId, 'warning', coreMessages['rs_widget_misplacement_warning'], null);
      };

      wp.refresh = function(instanceId, widgetDataDoc, grabFocus) {
         var opts = {
               widgetDoc : widgetDataDoc,
               grabFocus : grabFocus
             };
         widgets.refreshWidget(instanceId, opts);
      };

      wp.refreshTitleAndMicroformat = function(instanceId, widgetData) {
         widgets.updateWidgetName(instanceId, widgetData);
      };

      wp.fetchAndRefresh = function(instanceId) {
         var opts = {
               forceFetch : true
             };
         widgets.refreshWidget(instanceId, opts);
      };

      wp.changeTitle = function(instanceId) {
         widgets.changeTitle(instanceId);
      };

      wp.moveDown = function(widgetInstanceId, uiLocation) {
         widgets.moveWidgetDown(widgetInstanceId);
      };

      wp.moveUp = function(widgetInstanceId, uiLocation) {
         widgets.moveWidgetUp(widgetInstanceId);
      };

      wp.moveToNextColumn = function(instanceId, uiLocation) {
         widgets.moveWidgetToNextColumn(instanceId);
      };

      wp.moveToPreviousColumn = function(instanceId, uiLocation) {
         widgets.moveWidgetToPreviousColumn(instanceId);
      };

      // @deprecated This method will be removed in 4.0 with a different dialog
      // method
      wp.displayDialog = function(dialogContent) {
         utils.displayDialog(dialogContent);
      }

      // Returns NodeList - one for each widget in column, in the order of their
      // display.
      // column = "col2" or "col3"
      wp.getColumnWidgetNodes = function(column, allowNested) {
         return layout.getColumnWidgetsNodes(column, allowNested);
      };

      // Move widget to end of widget list in column 2
      wp.moveWidgetToEnd = function(widgetInstanceId, column) {
         widgets.moveWidgetToEnd(widgetInstanceId, column);
      };

      // Returns true iff the widget should show the full delete confirmation
      // dialogue.
      wp.showFullWidgetDeleteConfirmation = function(defId) {
         return utils.showFullWidgetDeleteConfirmation(defId);
      };

      wp.removeWidget = function(widgetInstanceId, removeWidgetData, prompt) {
         widgets.removeWidget(widgetInstanceId, removeWidgetData, prompt);
      };

      wp.addWidgetToServerAndRender = function(widgetDefId, uiLocation, unhide, instanceId) {
         return widgets.addWidget(widgetDefId, uiLocation, unhide, instanceId);
      };

      // Shows widget error on page in headline div.
      // set prepend = true iff you want the message pre-pended to he headline.
      // false to replace the headline content.
      wp.showWidgetErrorInHeadline = function(error, prepend) {
         utils.showWidgetErrorInHeadline(error, prepend);
      };

      wp.customAddWidgetErrorHandler = function(error) {
         utils.showWidgetErrorInHeadline(error, true);
      };

      wp.minimizeWidget = function(htmlElement, widgetInstanceId, widgetDefId, hideWidget) {
         widgets.minimizeWidget(widgetInstanceId, hideWidget);
      };

      wp.addEditTabsWithOnclickCalls = function(TabContainerDomId, editModeContainerDomId, intialDisplayDomId, cancelCallBack, editPageTabFirstItemDomId) {
         return core.addTabsWithOnclickCalls(TabContainerDomId, editModeContainerDomId, intialDisplayDomId, cancelCallBack, editPageTabFirstItemDomId, 'edit');
      };

      wp.showFirstTab = function(intialDisplayDomId, FirstTabItemDomId, callback) {
         return core.showFirstTab(intialDisplayDomId, FirstTabItemDomId, callback);
      };

      wp.addTabsWithOnclickCalls = function(TabContainerDomId, TempWidgetContainerDomId, intialDisplayDomId, cancelCallBack, FirstTabItemDomId, widgetMode, attributesMap) {
         core.addTabsWithOnclickCalls(TabContainerDomId, TempWidgetContainerDomId, intialDisplayDomId, cancelCallBack, FirstTabItemDomId, widgetMode, attributesMap);
      };

      wp.URLChange = function(URL) {
         core.URLChange(URL);
      };

      wp.init = function(mode) {
         core.init(mode);
      };

      wp.initEdit = function() {
         core.init('edit');
      };

      wp.setFocus = function(widgetId, elemId) {
         utils.setFocus(widgetId, elemId);
      };

      wp.changeLayout = function(/* String */newLayout, /* Function */callback) {
         layout.changeLayout(newLayout, callback);
      };

      wp.aria = {};
      wp.aria.Toolbar = WpToolbar;
      wp.aria.TabPanel = WpTabPanel;
      
      // potential removed code
      var _canAddWidget = function(widgetDef, widgetInstance, opts) {
         // for externally visible community, see if Widget is allowed to be
         // added
         var bizCardCommunity = lang.getObject("lconn.communities.bizCard.core.community");
         if (bizCardCommunity && bizCardCommunity.externalAllowed) {
            if (widgetDef.showInExternalCommunities === 'false') {
               return false;
            }
         }
         return true;
      };
      wp.utils.registerFilter('canAddWidget', lang.hitch(wp, _canAddWidget));

      var _canRemoveWidget = function(widgetDef, widgetInstance, opts) {
         // If removing the files widget, make sure the media gallery widget is
         // not present
         if (opts.removeWidgetData) {
            if (widgetInstance.defIdRef === 'Files' && wp.utils.getWidgetInstance('MediaGallery')) {
               console.log('Skipping removal of Files widget since MediaGallery widget is present.');
               return false;
            }
         }
         return true;
      };
      wp.utils.registerFilter('canRemoveWidget', lang.hitch(wp, _canRemoveWidget));

      var _postRemoveWidget = function(widgetInstance) {
         if (!widgetInstance)
            return;

         var defId = widgetInstance.defIdRef,
             instanceId = widgetInstance.instanceId || defId;

         try {
            // If we're on the Status Updates page, return to the overview
            if (defId === 'StatusUpdates') {
               win.location.href = win.WidgetPlacementConfig.applicationContext + '/service/html/communityview?communityUuid='
                     + win.WidgetPlacementConfig.resourceId;
            }
         } catch (e) {
            // TODO: unify logging invocation
            console.log(e);
         }
      };
      wp.utils.registerCallback('removeWidget', lang.hitch(wp, _postRemoveWidget));

      var _isWidgetRemovalAccepted = function(instanceId, removeData, callback) {
         if (removeData) {
            // Show simple confirmation dialog for sub-community widget.
            var widgetInstance = wp.utils.getWidgetInstance(instanceId);
            var defId = widgetInstance.defIdRef;
            if (defId === 'FeaturedSurvey' || defId === 'LinkedQuickrCommunityLib'
                  || wp.showFullWidgetDeleteConfirmation(defId) === false) {
               DialogUtil.prompt(messages['deleteWidget'],
                  messages['confirmDeleteWidget'],
                  coreMessages['rs_ok'],
                  messages['cancel'],
                  callback,
                  null);
            }
            else {
               // Show delete or hide confirmation dialog with callback.
               var deleteOrHideCallback = function ( isDelete ) {
                  if ( isDelete ) {
                     callback(true);
                  } else {
                     callback(false);
                     wp.removeWidget(instanceId, false, false);
                  }
               };
               var deleteConfirmWidget = lang.getObject('lconn.communities.bizCard.dialogs.deleteConfirmWidget');
               var dlg = new deleteConfirmWidget({
                  communityTitle : wp.utils.getWidgetName(null, widgetInstance),
                  callback : deleteOrHideCallback,
                  userName : communityActionData.userName
               });
               dlg.show();
            }
         }
         else {
            DialogUtil.prompt(messages['hideWidget'], messages['hideWidgetMsg'], messages['hide'], messages['cancel'], callback, null);
         }
      };
      wp.utils.registerFilter('isWidgetRemovalAccepted', lang.hitch(wp, _isWidgetRemovalAccepted));

      var _handleSearchRequest = function(opts) {
         var attributesMap = [ {
            entryName : 'searchKeywords',
            entryValue : opts.query,
            component : 'communities:content',
            selectTabInst : opts.tabinst,
            selectTab : opts.tab
         }
         ];
         var community = lang.getObject('lconn.comm.community');
         community.handleSearchRequestbyGeneral(attributesMap);
      };
      wp.utils.registerHandler('handleSearchRequest', lang.hitch(wp, _handleSearchRequest));
      // potential removed code end

      lang.setObject('lconn.core.WidgetPlacement', wp);
      return wp;
   });
