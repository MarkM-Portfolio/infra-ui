/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/Deferred',
   'dojo/dom',
   'dojo/dom-construct',
   'dojo/i18n!../nls/strings',
   'dojo/i18n!../nls/widgets',
   'dojo/parser',
   'dojo/query',
   'dojo/request',
   'dojo/string',
   './configs',
   './navigation',
   './persistor',
   './signals',
   './utils',
   './WidgetWrapper',
   '../errorhandling',
   '../utilities',
   'ic-gadget/container/iContainer2',
   'ic-gadget/util/trace',
   'ic-ui/DialogUtil'
], function(array, lang, windowModule, Deferred, dom, domConstruct, i18nstrings,
   i18nwidgets, parser, query, request, string, wpConfig, navigation, persistor,
   signals, utils, WidgetWrapper, errorhandling, utilities, iContainer, logger,
   DialogUtil) {

   var win = windowModule.global;
   var messages = i18nwidgets;
   var coreMessages = i18nstrings;

   var _loadOrder = [];
   var _wrappers = {};

   var _getWidgetConfigAttrs = function(attributesMap, widgetDef, widgetInstance) {
      attributesMap = attributesMap || [];
      if (attributesMap.length > 1) {
         return attributesMap;
      }

      var attributes = {}, result = [], configData, itemSet, value;

      if (attributesMap.length) {
         attributes[attributesMap[0].entryName] = attributesMap[0].entryValue;
      }

      configData = widgetDef.configData;
      array.forEach(configData, function(config) {
         value = utils.getI18nString(config['value']);
         attributes[config['key']] = value;
      });

      itemSet = widgetDef.itemSet;
      array.forEach(itemSet, function(item) {
         value = utils.getI18nString(item['value']);
         attributes[item['name']] = value;
      });

      if (widgetInstance) {
         wpConfig('params')['widgetInstanceId'] = widgetInstance.instanceId;
         itemSet = widgetInstance.itemSet;
         array.forEach(itemSet, function(item) {
            value = utils.getI18nString(item['value']);
            attributes[item['name']] = value;
         });
      }

      for (attr in attributes) {
         result.push({
            entryName : attr,
            entryValue : attributes[attr]
         });
      }

      return result;
   };

   var packageWidgetMetadata = function(widgetInstance, widgetDef, opts) {
      opts = opts || {};

      var instanceId = widgetInstance;
      if (lang.isString(widgetInstance)) {
         widgetInstance = utils.getWidgetInstance(widgetInstance);
      } else {
         instanceId = widgetInstance.instanceId;
      }

      if (!widgetInstance) {
         logger.error('No widgetInstance.');
         return null;
      }

      var defIdRef = widgetInstance.defIdRef;
      instanceId = instanceId || defIdRef;

      if (lang.isString(widgetDef)) {
         widgeDef = utils.getWidgetDef(widgetDef);
      }
      if (!widgetDef) {
         logger.error('No widgetDef');
         return null;
      }

      var widgetMode = opts.widgetMode || null;
      var attributesMap = opts.attributesMap;
      if (!attributesMap) {
         attributesMap = _getWidgetConfigAttrs(null, widgetDef, widgetInstance);
      }
      var widgetName = opts.widgetName;
      if (!widgetName) {
         widgetName = utils.getEscapedWidgetName(widgetDef, widgetInstance, widgetMode || 'view');
      }

      var url = opts.url || widgetDef.url;
      var skinType = opts.skinType || widgetDef.skinType;
      var displayedUserInfo = utils.getDisplayedUserInfo();

      var widgetMetadata = _createWidgetMetadata(instanceId, url, displayedUserInfo, 
         attributesMap, widgetMode, widgetName);
      return widgetMetadata;
   };
   
   var injectHostAttrs = function(items) {
      if (wpConfig('isProfilesEnv')) {
         var displayedUserInfo = utils.getDisplayedUserInfo();
         if (displayedUserInfo.uid != null) {
            items.push({
               'id' : 'profileDisplayedUserUID',
               'value' : displayedUserInfo.uid
            });
         }
         if (displayedUserInfo.key != null) {
            items.push({
               'id' : 'profileDisplayedUserKey',
               'value' : displayedUserInfo.key
            });
         }
      }

      var keys = ['resourceId', 'parentResourceId', 'resourceType', 'resourceName'];
      array.forEach(keys, function(key) {
         if (wpConfig(key) != null) {
            items.push({
               'id' : key,
               'value' : wpConfig(key)
            });
         }
      });
   };

   var _createWidgetMetadata = function(widgetInstanceId, url, displayedUserInfo, 
      attributesMap, widgetMode, computedWidgetTitle) {
      var items = [], itemSet = [], thePlacement = widgetInstanceId;

      url = utils.getI18nString(url);

      if (widgetMode) {
         var modeItem = [];
         modeItem.push({
            'id' : 'mode',
            'value' : widgetMode
         });
         itemSet.push({
            'id' : 'idescriptor',
            'item' : modeItem
         });
      }

      injectHostAttrs(items);
      if (computedWidgetTitle)
         items.push({
            'id' : 'computedWidgetTitle',
            'value' : computedWidgetTitle
         });

      array.forEach(attributesMap, function(attr) {
         items.push({
            'id' : attr.entryName,
            'value' : attr.entryValue
         });
      });

      itemSet.push({
         'id' : 'attributes',
         'mode' : 'edit',
         // due to the persistentce service limitation, communities only
         // support edit mode settings
         'item' : items
      });

      var instanceData = {
         'itemSet' : itemSet,
         'renderType' : 'default'
      };

      var obj = {
         definitionUrl : url,
         componentType : 'iWidget',
         placement : thePlacement,
         instanceData : instanceData
      };

      if (widgetInstanceId) {
         obj.id = widgetInstanceId;
      }
      return obj;
   };

   var updateUILocation = function(instanceId, uiLocation) {
      array.some(_loadOrder, function(node) {
         if (node && instanceId === node.instanceId && uiLocation !== node.uiLocation) {
            node.uiLocation = uiLocation;
            return true;
         }
      });
   };

   var getUILocation = function(instanceId) {
      var loadOrders = _loadOrder, i;
      for (i = 0; i < loadOrders.length; i++) {
         if (loadOrders[i] && loadOrders[i].instanceId === instanceId) {
            return loadOrders[i].uiLocation;
         }
      }
      return '';
   };

   var addUILocation = function(instanceId, uiLocation) {
      _loadOrder.push({
         instanceId : instanceId,
         uiLocation : uiLocation
      });
   };
   
   var getUsedUILocations = function() {
      var result = [];
      array.forEach(_loadOrder, function(NodeId) {
         var uiLocation = NodeId.uiLocation;
         if (array.indexOf(result, uiLocation) === -1) {
            result.push(uiLocation);
         }
      });

      return result;
   };

   // destroyDropDownMenu, destroySubArea, deleteDNDItem
   var destroyWidget = function(instanceId, uiLocation, opts) {
      if (!instanceId) return;

      opts = opts || {};
      if (opts.deleteDNDItem !== false) {
         widgets._removeWidgetFromDropZone(instanceId, uiLocation);
      }

      if (opts.destroyWrapper) {
         var wrapper = _wrappers[instanceId];
         wrapper && wrapper.destroy(opts);
         delete _wrappers[instanceId];
      } else {
         if (opts.destroyDropMenu) {
            var moreActions = registry.byId(instanceId + 'moreActions');
            moreActions && moreActions.destroy();

            var toggleAction = registry.byId(instanceId + '_toggleAction');
            toggleAction && toggleAction.destroy();
         }

         if (opts.destroySubArea) {
            var widgetDomSubAreaElm = dom.byId(instanceId + 'SubArea');
            if (widgetDomSubAreaElm) {
               widgetDomSubAreaElm.innerHTML = '';
            }
         }
      }

      utils.withIRuntime().then(lang.hitch(this, function(iRuntime) {
         var widgetId = iRuntime.getWidgetIdByDomId(instanceId);
         if (widgetId) { // unload only if the widget is there
            iContainer.unloadWidgets([widgetId]);
         }
      }));
   };

   var addWidget = function(defId, uiLocation, unhide, instanceId) {
      if (lang.isArray(defId)) {
         defId = defId[0];
      }

      if (defId === 'StatusUpdates') {
         uiLocation = 'col2statusposts';
      } else if (defId === 'Tags') {
         uiLocation = 'col1';
      }

      var promise = new Deferred('addWidget');

      // Set to true iff we're unhiding the widget.
      var unhidingWidget = false;
      if (unhide == false || unhide == 'false') {
         utils.showAddWidgetDialog();
      } else {
         var widgetInstance = utils.getWidgetInstance(instanceId);
         if (widgetInstance && 'false' === widgetInstance.enabled) {
            uiLocation = widgetInstance.uiLocation;
         }
         unhidingWidget = true;
      }

      persistor.addWidget(defId, uiLocation, unhide, instanceId).then(function(widgetInstanceId) {
         widgets.addUILocation(widgetInstanceId, uiLocation);
         widgets.renderWidget(defId, widgetInstanceId, uiLocation);
         utils.hideDialog();

         // If we're unhiding, since we're inserting the widget at the end of
         // column, update the database to reflect that so a page refresh
         // won't show the widget as moved.
         if (unhidingWidget) {
            widgets.moveWidgetToEnd(widgetInstanceId, uiLocation);
         }

         // Refresh the left navigator
         navigation.restore();

         // finally run through all registered callbacks
         if (utils.getCallbacks('addWidget')) {
            array.forEach(utils.getCallbacks('addWidget'), function(callback) {
               callback(defId, widgetInstanceId, uiLocation, unhide);
            });
         }

         promise.resolve();
      }, function() {
         promise.reject();
      });

      return promise;
   };

   var removeWidget = function(instanceId, removeWidgetData, prompt) {
      logger.entering('ic-core/WidgetPlacement', 'removeWidget', arguments);

      // internal functions
      var ifConfirmed = function() {
         var widgetInstance = utils.getWidgetInstance(instanceId),
             uiLocation = getUILocation(instanceId);

         if (!signals.get('removeWidgetInProgress') && removeWidgetData) {
            utils.showRemoveWidgetDialog();
         }

         persistor.removeWidget(instanceId, removeWidgetData).then(function() {
            var nextFocusWidgetId = getNextWidgetId(instanceId);
            _loadOrder = array.filter(_loadOrder, function(NodeId) {
               return (NodeId && NodeId.instanceId !== instanceId);
            });

            var iContext = win['_' + instanceId + '_iContext'];
            if (iContext && iContext.iScope().onRemoveWidgetUIContent) {
               iContext.iScope().onRemoveWidgetUIContent();
            }

            navigation.get().removeNavItem(instanceId);
            var destroyOpts = {
                  destroyDropDownMenu : true,
                  destroyWrapper : true
                };
            widgets.destroyWidget(instanceId, null, destroyOpts);

            win.setTimeout(lang.hitch(this, function() {
               var nextWidget = _wrappers[nextFocusWidgetId];
               nextWidget && nextWidget._focusMenu();
            }), 0);

            utils.hideDialog();

            // step 4: run assigned callback for removal
            if (utils.getCallbacks('removeWidget')) {
               array.forEach(utils.getCallbacks('removeWidget'), function(callback) {
                  callback(widgetInstance);
               });
            }
         }, function() {});
      };

      var ifDeclined = function() { /* do nothing */};
      // internal functions end

      // step 1: check whether the widget is removable
      if (!canRemoveWidget(instanceId)) return;

      // step 2: request user grant of removal
      var userConfirmation = requestRemovalConfirmation(prompt, instanceId, removeWidgetData);

      // step 3: react with user confirmation
      userConfirmation.then(ifConfirmed, ifDeclined);
   };

   var refreshWidget = function(instanceId, opts) {
      opts = opts || {};
      var widgetDoc = opts.widgetDoc;
      var grabFocus = opts.grabFocus;
      
      var refresh = function(instanceId, opts) {
         var widgetInstance = utils.getWidgetInstance(instanceId, widgetDoc),
             defId = ((widgetInstance) ? widgetInstance.defIdRef : instanceId),
             widgetDef = utils.getWidgetDef(defId, widgetDoc);

         if (!widgetInstance || !widgetDef)
            return; // skip the refresh if no widgetInstance or definitionNode

         var destroyOpts = {
               destroyDropDownMenu : false,
               destroySubArea : false,
               deleteDNDItem : false
             };
         widgets.destroyWidget(instanceId, null, destroyOpts);

         var wrapper = _wrappers[instanceId];
         wrapper && wrapper.refresh();

         win.refreshInfoHolder = win.refreshInfoHolder || {};
         win.refreshInfoHolder[instanceId] = true;
         win.setTimeout(function() {
            win.refreshInfoHolder[instanceId] = null;
         }, 2000);

         widgets.updateWidgetName(instanceId);
   
         var uiLocation = widgets.getUILocation(instanceId);
         if (widgets.isColumnSupported(uiLocation, widgetDef)) {
            var opts = {mode: 'view'};
            var widgetMetadata = packageWidgetMetadata(widgetInstance, widgetDef, opts);
            iContainer.loadWidget(widgetMetadata);
         } else {
            _showMisplacedWarning(instanceId);
         }
      };

      if (opts.forceFetch) {
         win.staleXMLConfig = true;
         utils.withLayoutInfo(true).then(function() {
            refresh(instanceId, opts);
         });
      } else {
         refresh(instanceId, opts);
      }
   };

   var renderWidget = function(widgetDef, widgetInstance, uiLocation, opts) {
      opts = opts || {};

      var temp = function() {
         if (!loaded()) { // Unable to load widget
            utils.showWidgetErrorInHeadline(messages['errorDefaultMsg'], false);
            // show the message area
            domStyle.set('contentArea', {
               display : 'inline',
               visibility : 'visible'
            });
         }
      };

      var loaded = function() {
         var widgetDefId = null;
         if (lang.isString(widgetDef)) {
            widgetDef = utils.getWidgetDef(widgetDef);
         }
         if (widgetDef == null) {
            logger.warn('Unable to find widget definition for: ' + widgetDefId);
            return null;
         }
         widgetDefId = widgetDef.defId;

         var widgetInstanceId = null;
         if (widgetInstance == null) {
            widgetInstanceId = widgetDefId;
         } else {
            if (lang.isObject(widgetInstance)) {
               if (widgetInstance.defIdRef != widgetDefId) {
                  logger.warn('The widget definition and instance fail to match: widgetDef=', widgetDef, ', widgetInstance=', widgetInstance);
                  return null;
               }

               widgetInstanceId = widgetInstance.instanceId || widgetDefId;
            } else {
               widgetInstanceId = widgetInstance;
               widgetInstance = wpCRE.utils.getWidgetInstance(widgetInstanceId);
            }
         }

         if (widgetInstance == null) {
            widgetInstance = {
                  uiLocation : uiLocation,
                  defIdRef : widgetDefId,
                  instanceId : widgetInstanceId
            };
         }

         var skinType = opts.skinType || widgetDef.skinType;
         var widgetMode = opts.widgetMode;
         var addToNavBar = opts.addToNavBar;
         var addDropZone = opts.addDropZone;
         var attributesMap = opts.attributesMap;
         var metadataOpts = { widgetMode : widgetMode };
         var widgetMetadata = packageWidgetMetadata(widgetInstance, widgetDef, metadataOpts);

         var htmlParentNode = widgets.getWidgetContainer(uiLocation);
         if (widgetMode === 'fullpage') {
            htmlParentNode.innerHTML += _addiWidgetMicroformat(widgetInstanceId);
            iContainer.loadWidget(widgetMetadata);
         } else {
            if (false !== addToNavBar) {
               navigation.get().addNavItem(widgetDef, widgetInstance);
            }
            
            if (htmlParentNode) {
               var widgetContainerObj = widgets.getWidgetContainerObject(uiLocation);
               var draggable = widgetContainerObj && widgetContainerObj.draggable;
               var wOpts = {
                     canPersonalize : true,
                     draggable : draggable,
                     skinType : skinType,
                     mode : widgetMode
                   };
               var wrapperOpts = {
                     widgetDef : widgetDef,
                     widgetInstance : widgetInstance,
                     opts : wOpts
                   };
               var wrapper = new WidgetWrapper(wrapperOpts);
               _wrappers[widgetInstanceId] = wrapper;
               domConstruct.place(wrapper.domNode, htmlParentNode, 'last');
            } else {
               // cannot find the drop zone, skip rendering widget, return as
               // if the widget is loaded
               return widgetDef;
            }

            if (false !== addDropZone) {
               widgets._addWidgetToDropZone(widgetInstanceId, uiLocation);
            }

            var supported = widgets.isColumnSupported(uiLocation, widgetDef);
            if (supported) {
               iContainer.loadWidget(widgetMetadata);
            } else {
               _showMisplacedWarning(widgetInstanceId);
            }

            utilities.processUntilElementIsFound(widgetInstanceId + 'Section', function() {
               parser.parse(dom.byId(widgetInstanceId + 'Section'));
            }, null, null, false);
         }

         return widgetDef;
      };

      utils.withLayoutInfo().then(temp);
   };

   var minimizeWidget = function(instanceId, hideWidget) {
      var wrapper = _wrappers[widgetId];
      if (wrapper) {
         wrapper.toggle(hideWidget);
      }
   };

   var unhideWidget = function(widgetId) {
      var wrapper = _wrappers[widgetId];
      if (wrapper) {
         wrapper.unhide();
      }
   };

   var updateWidgetName = function(instanceId, widgetData) {
      var widgetInstance = utils.getWidgetInstance(instanceId, widgetData),
          defIdRef = ((widgetInstance) ? widgetInstance.defIdRef : instanceId),
          widgetDef = utils.getWidgetDef(defIdRef),
          overviewWidgetName = utils.getWidgetName(widgetDef, widgetInstance, 'view'),
          navbarWidgetName = utils.getWidgetName(widgetDef, widgetInstance);

      _refreshTitle(instanceId, overviewWidgetName, navbarWidgetName);
   };

   var _refreshTitle = function(instanceId, overviewWidgetName, navbarWidgetName) {
      query('div#' + instanceId + ' > span[title="attributes"]').orphan();
      var wrapper = _wrappers[instanceId];
      if (wrapper && overviewWidgetName) {
         wrapper.changeTitle(overviewWidgetName);
      }

      if (navbarWidgetName) {
         navigation.get().updateNavItem(instanceId, null, {widgetName: navbarWidgetName});
      }
   };

   var refreshWidgets = function(filter, opts) {
      opts = opts || {};
      array.forEach(_loadOrder, function(node) {
         if (!node || !dom.byId(node.instanceId)) return false;

         for (key in filter) {
            if (filter[key] !== node[key]) {
               return false;
            }
         }

         refreshWidget(node.instanceId, opts);
      });
   };

   var renderWidgets = function(widgetSpecs) {
      if (widgetSpecs.length === 0) {
         return;
      }
      var filtered = array.filter(widgetSpecs, function(widgetSpec) {
         return !!dom.byId(widgetSpec.placement);
      });

      utils.showSidePanels();

      iContainer.preloadWidgets(widgetSpecs).then(function() {
         iContainer.loadWidgets(filtered);
      });
   };

   var destroyWidgets = function(filter, opts) {
      opts = opts || {};
      array.forEach(_loadOrder, function(node) {
         if (!node) return false;

         for (var key in filter) {
            if (filter[key] !== node[key]) {
               return false;
            }
         }

         destroyWidget(node.instanceId, node.uiLocation, opts);
      });
   };

   var _changeTitle = function(instanceId, title, okCallback, errCallback) {
      var object = {
            'widgetTitle' : title
      };

      persistor.savePreference(instanceId, object, true).then(okCallback, errCallback);
   };

   // IC 144158: calculate the bytes length for size
   var _getUTF8BytesLength = function (str) {
      var length = 0;
      for (var i = 0; i < str.length; i++) {
         var charcode = str.charCodeAt(i);
         if (charcode < 0x80) length += 1;
         else if (charcode < 0x800) length += 2;
         else length += 3;
      }
      return length;
   };

   var changeWidgetTitle = function(instanceId) {
      var widgetInstance = utils.getWidgetInstance(instanceId),
          defId = ((widgetInstance) ? widgetInstance.defIdRef : null),
          widgetDef = ((defId) ? utils.getWidgetDef(defId) : null);

      var oldTitle = utils.getWidgetName(widgetDef, widgetInstance, 'view'),
          defaultTitle = utils.getDefaultWidgetName(widgetDef);

      var input = domConstruct.create('input', {
         type : 'text',
         value : oldTitle,
         'aria-required' : true,
         'class' : 'lotusText bidiAware',
         style : 'width:300px',
         "aria-labelledby": "newTitleLabel"
      });
      var messageArea = domConstruct.create('div');

      var dlgContent = domConstruct.create('span', {
    	  innerHTML : string.substitute(coreMessages['rs_widget_title_change_direction'], [defaultTitle]) + 
          '<br/><br/><label id=\'newTitleLabel\'>' + coreMessages['rs_widget_title_change_label'] + "</label>"
      });
      domConstruct.place(messageArea, dlgContent, 'first');
      domConstruct.place(input, dlgContent, 'last');

      var ifSuccess = function () {
         dialog.hide();
         dialog = null;

         utils.withLayoutInfo(true).then(function() {
            updateWidgetName(instanceId);
         });
      };

      var ifFailure = function (error) {
         var errorTitle = string.substitute(coreMessages['rs_widget_title_change_fail_message']['default_message'], [defaultTitle]);
         _showMessage('error', 'dlgChangeTitle', errorTitle, null, messageArea, false, false);
      };

      var okCallback = function() {
         var title = input.value;
         if (title && oldTitle) {
            if (title === oldTitle) {
               dialog.hide();
               dialog = null;
            } else if (_getUTF8BytesLength(title) > 256) {
               var errorTitle = coreMessages['rs_widget_title_change_fail_message']['title_too_long'];
               _showMessage('error', 'dlgChangeTitle', errorTitle, null, messageArea, false, false);
            } else {
               _changeTitle(instanceId, title, ifSuccess, ifFailure);
            }
         } else {
            var errorTitle = coreMessages['rs_widget_title_change_fail_message']['empty_new_title'];
            _showMessage('error', 'dlgChangeTitle', errorTitle, null, messageArea, false, false);
         }
      };

      var dialog = DialogUtil.popupForm(coreMessages['rs_widget_title_change_title'], dlgContent, messages['save'], messages['cancel'], okCallback, null);
   };

   var canAddWidget = function(widgetDef, widgetInstance, opts) {
      if (widgetDef == null)
         return false;

      var loginRequired = widgetDef.loginRequired;
      if (loginRequired == 'true' && !wpConfig('userLoggedIn'))
         return false;

      var resourceOwnerWidget = widgetDef.resourceOwnerWidget;
      var canPersonalize = opts.canPersonalize;
      if (resourceOwnerWidget === 'true' && !canPersonalize)
         return false;

      var isHideWidgetForMyProfile = widgetDef.hideWidgetForMyProfile,
          keyValue = utils.getUserProfileOverrideProperty('key');
      if (isHideWidgetForMyProfile === 'true' && wpConfig('userLoggedIn') && wpConfig('params').resourceId == keyValue) {
         return false;
      }

      // check any acl requirement for this widget
      var requireAcl = widgetDef.requireAcl;
      if (requireAcl != null && requireAcl != '') {
         var ok = array.some(wpConfig('enabledPermissions'), function(permission) {
            return (permission == requireAcl);
         });
         if (!ok) {
            return false;
         }
      }

      var showHidden = opts.showHidden;
      var onlyFullPageWidgetLoaded = signals.get('onlyFullPageWidgetLoaded');
      if (widgetInstance != null && onlyFullPageWidgetLoaded != true && !showHidden) {
         var enabled = widgetInstance.enabled;
         if (enabled === 'false')
            return false;
      }

      var prerequisite = widgetDef.prerequisite;
      var availableServices = wpConfig('availableServices');
      if (prerequisite && availableServices && lang.isString(availableServices)) {
         var allAvailable = array.every(prerequisite.split(' '), function(prereq) {
            return !!availableServices[prereq];
         });
         if (!allAvailable) {
            return false;
         }
      }

      // Added to check whether a widget depends on a certain feature
      var requiredFeatures = widgetDef.requiredFeatures;
      var enabledFeatures = wpConfig('enabledFeatures');
      if (requiredFeatures && enabledFeatures && lang.isString(enabledFeatures)) {
         logger.info('enabledFeatures = ' + wpConfig('enabledFeatures'));

         var enabledFeaturesArray = enabledFeatures.split(new RegExp('[, \u3000]{1}', 'g'));
         var requiredFeatureEnabled = array.some(enabledFeaturesArray, function(feature) {
            return (feature == requiredFeatures);
         });

         if (!requiredFeatureEnabled) {
            logger.debug('The user doesn\'t have the required feature, returning false');
            return false;
         }
      }

      var defId = widgetDef.defId;
      if (wpConfig('disabledWidgets') && wpConfig('disabledWidgets')[defId]) {
         logger.debug('Widget ' + defId + ' is disabled in this context.');
         return false;
      }

      if (utils.getFilters('canAddWidget')) {
         var params = opts;
         var result = array.every(utils.getFilters('canAddWidget'), function(filter) {
            return filter(widgetDef, widgetInstance, params);
         });
         if (!result)
            return false;
      }

      return true;
   };

   var canRemoveWidget = function(instanceId, removeWidgetData) {
      var widgetInstance = utils.getWidgetInstance(instanceId);
      if (!widgetInstance) {
         logger.warning('ic-core/WidgetPlacement removeWidget: Unable to find widget instance for instanceId = ' + instanceId);
         return false;
      }

      if (utils.getFilters('canRemoveWidget')) {
         var widgetDef = utils.getWidgetDefByInstance(widgetInstance);
         var params = {
            removeWidgetData : removeWidgetData
         };
         var result = array.every(utils.getFilters('canRemoveWidget'), function(filter) {
            return filter(widgetDef, widgetInstance, params);
         });
         if (!result)
            return false;
      }

      return true;
   };

   var requestRemovalConfirmation = function(prompt, widgetInstanceId, removeData) {
      // internal functions
      var handleResult = function(result) {
         if (result) {
            promise.resolve();
         } else {
            promise.reject();
         }
      };
      // internal functions end

      var promise = new Deferred();

      if (false !== prompt) {
         if (utils.getFilters('isWidgetRemovalAccepted').length > 0) {
            array.forEach(utils.getFilters('isWidgetRemovalAccepted'), function(filter) {
               filter(widgetInstanceId, removeData, handleResult);
            });
         } else {
            promise.resolve();
         }
      } else {
         promise.resolve();
      }

      return promise;
   };

   var getNextWidgetId = function(instanceId) {
      var orderedWidgetIds = query('div.lotusWidget2').map(function(widget) {
         return widget.getAttribute('widgetid')
      }).filter(function(v) {
         return !!v
      });

      var index = array.indexOf(orderedWidgetIds, instanceId);
      if (-1 === index) {
         logger.warn('The widget is not on the page: ' + instanceId);
         return null;
      }

      return orderedWidgetIds[(index + 1) % (orderedWidgetIds.length)];
   };

   var _addiWidgetMicroformat = function(widgetInstanceId) {
      var htmlContent = '<div id="' + widgetInstanceId + '"></div>';
      return htmlContent;
   };

   var _showMisplacedWarning = function(instanceId) {
      _showMessageInWidget(instanceId, 'warning', coreMessages['rs_widget_misplacement_warning'], null);
   };

   var _registerWidgetWrapper = function(instanceId, wrapper) {
      if (instanceId && wrapper) {
         _wrappers[instanceId] = wrapper;
      }
   };

   var widgets = {
      packageWidgetMetadata : packageWidgetMetadata,

      updateUILocation : updateUILocation,
      getUILocation : getUILocation,
      addUILocation : addUILocation,
      getUsedUILocations : getUsedUILocations,

      addWidget : addWidget,
      removeWidget : removeWidget,
      refreshWidget : refreshWidget,
      unhideWidget : unhideWidget,
      renderWidget : renderWidget,
      destroyWidget : destroyWidget,
      minimizeWidget : minimizeWidget,
      changeWidgetTitle : changeWidgetTitle,
      updateWidgetName : updateWidgetName,

      _addiWidgetMicroformat : _addiWidgetMicroformat,
      _registerWidgetWrapper : _registerWidgetWrapper,

      moveWidgetUp : null,
      moveWidgetMove : null,
      moveWidgetToEnd : null,
      moveWidgetToNextColumn : null,
      moveWidgetToPrevColumn : null,
      getWidgetLocation : null,
      _addWidgetToDropZone : null,
      _removeWidgetFromDropZone : null,
      getWidgetTheme : null,

      renderWidgets : renderWidgets,
      refreshWidgets : refreshWidgets,
      destroyWidgets : destroyWidgets,

      canAddWidget : canAddWidget,
      canRemoveWidget : canRemoveWidget,
      requestRemovalConfirmation : requestRemovalConfirmation,

      _injectHostAttrs : injectHostAttrs
   };

   return widgets;

});