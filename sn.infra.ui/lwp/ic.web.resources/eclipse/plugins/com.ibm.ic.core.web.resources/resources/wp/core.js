/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo',
   'dojo/_base/array',
   'dojo/_base/declare',
   'dojo/_base/json',
   'dojo/_base/kernel',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/cookie',
   'dojo/Deferred',
   'dojo/dom',
   'dojo/dom-attr',
   'dojo/dom-class',
   'dojo/dom-construct',
   'dojo/dom-style',
   'dojo/i18n!../config/nls/widgetbundles',
   'dojo/i18n!../nls/strings',
   'dojo/i18n!../nls/widgets',
   'dojo/on',
   'dojo/parser',
   'dojo/query',
   'dojo/request',
   'dojo/string',
   'dijit/Menu',
   'dijit/registry',
   './aria/TabPanel',
   './configs',
   './layout',
   './navigation',
   './persistor',
   './signals',
   './utils',
   './widgets',
   './WidgetWrapper',
   '../back',
   '../errorhandling',
   '../utilities',
   '../HTMLUtil',
   'ic-gadget/container/iContainer2',
   'ic-gadget/util/trace',
   'ic-ui/MessageBox'
], function(dojo, array, declare, jsonUtil, kernel, lang, windowModule, cookie,
   Deferred, dom, domAttr, domClass, domConstruct, domStyle, i18nwidgetbundles,
   i18nstrings, i18nwidgets, on, parser, query, request, string, Menu, registry, 
   TabPanel, wpConfig, layout, navigation, persistor, signals, utils, widgets,
   WidgetWrapper, back, errorhandling, utilities, HTMLUtil, iContainer, logger,
   MessageBox) {

   var win = windowModule.global;
   var messages = i18nwidgets;
   var widgetMessages = null;
   var coreMessages = i18nstrings;

   var _moreActionsConnect = null;

   var init = function(mode) {
      var fullpageWidgetId = utilities.getURLParam('fullpageWidgetId', true),
          queryValue = utilities.getURLParam('query', true),
          tagValue = utilities.getURLParam('tag', true);

      var isEditMode = ('edit' === mode),
          isFullpageMode = !!fullpageWidgetId,
          isSearchMode = !isFullpageMode && (!!queryValue || !!tagValue),
          isOverviewPage = !isFullpageMode && !isSearchMode && !isEditMode;

      var addToNavBar = !isEditMode;

      if (isFullpageMode) {
         mode = 'fullpage';
      } else if (isSearchMode) {
         mode = 'search';
      }

      var widgetSpecsPromise = placeWidgetMetadata(addToNavBar, mode);

      // show widgets for pages not in fullpage mode and having no query
      if (isOverviewPage) {
         array.forEach(wpConfig('hideElements'), function(hideElement){
            utilities.show(hideElement, false, false, true);
         });
      }

      if (isFullpageMode || utils.isUpdatesPage()) {
         layout.hideColumn('col1'); // Hide left column widgets
      }

      utils.showSidePanels();

      if (typeof win.widgetUserInfo !== 'undefined' && typeof win.userid === 'undefined') {
         win.userid = win.widgetUserInfo.userid;
      }

      // initialize iContainer
      utils.withIRuntime().then(lang.hitch(this, function(iRuntime) {
         // overwrite cre handle event function.
         _overwriteCREEventHandleFunc(iRuntime);

         if (wpConfig('useServerInjection') && isOverviewPage) {
            var st = cre$.internalutil.getCREContainerToken();
            st = ((st && st.token) ? st.token : '');

            persistor.processPage({st: st}).then(function(jsonData) {
               var pageData = jsonData.pageData,
                   instanceData = pageData.instanceData,
                   metaData = pageData.widgetMetadata,
                   displayedUserInfo = utils.getDisplayedUserInfo();

               pageData.userProfile = {
                     'id' : 'userProfile',
                     'item' : [ {
                        'id' : 'viewer',
                        'value' : win.widgetUserInfo
                     } ]
               };

               // temp solution for IC126053, remove the instanceData and 
               // metaData if placement of the widget instance doesn't exist.
               var filteredInstData = [],
                   misplacedInstId = [],
                   useMetaData = {};

               array.forEach(instanceData, function(inst) {
                  var domId = inst.domId;
                  var domNode = dom.byId(domId);
                  if (domNode) {
                     var uiLocation = widgets.getUILocation(domId);
                     var widgetDef = utils.getWidgetDefByInstance(domId);
                     var supported = widgets.isColumnSupported(uiLocation, widgetDef);
                     if (supported) {
                        filteredInstData.push(inst);
                        useMetaData[inst.definition] = true;
                     } else {
                        misplacedInstId.push(domId);
                     }
                  }
               });

               var filteredMetaData = array.filter(metaData, function(meta) {
                  return (useMetaData[meta.definitionUrl] === true);
               });
               // end of temp solution

               array.forEach(misplacedInstId, function(instanceId) {
                  _showMisplacedWarning(instanceId);
               });

               // i18nalize instanceData, and append some more params
               array.forEach(filteredInstData, function(data) {
                  var itemSet = data.instanceMetaData.itemSet;
                  array.forEach(itemSet, function(v) {
                     if ('attributes' !== v.id) {
                        return;
                     }

                     var item = v.item;
                     array.forEach(item, function(it) {
                        var _newValue = it.value;
                        if ('computedWidgetTitle' === it.id) {
                           _newValue = _parseWidgetTitle(_newValue);
                        }
                        _newValue = utils.getI18nString(_newValue);
                        it.value = _newValue;
                     });

                     widgets._injectHostAttrs(item);
                  });
               });

               pageData.instanceData = filteredInstData;
               pageData.widgetMetadata = filteredMetaData;

               widgetSpecsPromise.then(lang.hitch(this, function(widgetSpecs) {
                  //Move to iContainer2.init() ??
                  var initPromise = iRuntime.init(pageData, true);
                  var ifInitFail = function (widgetRefArray) {
                     array.forEach(widgetRefArray, function (widgetRef) {
                        var error = null,
                            instanceId = '';

                        if (lang.isString(widgetRef)) {
                           error = widgetRef;
                        } else if (widgetRef && widgetRef.isError()){ 
                           error = widgetRef.getError().message;
                           instanceId = widgetRef.getWidgetId();
                           _showMessageInWidget(instanceId, 'error', 
                              coreMessages['rs_widget_loading_error_title'], 
                              coreMessages['rs_widget_loading_error_message'], 
                              false, true);
                        }
                        if (error) {
                           logger.error('Failed to load widget ' + instanceId + ', error: \n' + error);
                        }
                     });
                  };

                  initPromise.then(null, ifInitFail);
               }));
            }, function(error) {
               _showMessageInHeadline('error', 
                  coreMessages['rs_widgets_loading_error_title'], 
                  coreMessages['rs_widget_loading_error_message'], 
                  false, true);
            });
         } else {
            // Set user profile info
            var pageData = {
               'userProfile' : {
                  'id' : 'userProfile',
                  'item' : [ {
                     'id' : 'viewer',
                     'value' : win.widgetUserInfo
                  } ]
               }
            };

            // Move to iContainer2.init()??
            iRuntime.init(pageData, true);
         }

         _redeclareIContext();
         _registerItemSetPersistence(iRuntime);

         var URLChangeCallBack = signals.get('URLChangeCallBack');
         if (!URLChangeCallBack || !URLChangeCallBack.length) {
            URLChangeCallBack = [ URLChange ];
            signals.set('URLChangeCallBack', URLChangeCallBack);
            win.registerBackButtonSupport();
         }

         if (isOverviewPage && !wpConfig('useServerInjection') || isEditMode) {
            widgetSpecsPromise.then(lang.hitch(this, function(widgetSpecs) {
               widgets.renderWidgets(widgetSpecs);
            }));
         } else if (isFullpageMode) {
            signals.set('onlyFullPageWidgetLoaded', true);
            loadFullpageView(fullpageWidgetId, null, 'initial', false);
         }
      }));
   };
   
   var _redeclareIContext = function() {
      // don't support canNavigateAway
      cre$.iwidget.iContext.prototype.canNavigateAway = null;
      cre$.iwidget.iContext.prototype.getUserProfile = function() {
         if (!this._userProfile) {
            var ss = this._iRuntime.getStateSet(this._instanceData.moduleId, this.constants.USERPROFILE, {});
            this._userProfile = new cre$.iwidget.UserProfile(this._instanceData.moduleId, ss);
            this._userProfile._iContext = this;
            // for activity stream
            this._userProfile.widgetUserInfo = this._userProfile.user; 
         }
         return this._userProfile;
      };

      // workaround to remove cookies not needed.
      declare('com.ibm.cre.iwidget.iContext', com.ibm.cre.iwidget.iContext, {
         constructor : function(widgetObject, rootElement) {
            var proxyUrl = cre$.iRuntime.getProxyUrl();
            var _proxyCookieDomain = null;
            var _proxyCookiePath = null;
            var uri = proxyUrl.replace('%host%', win.document.location.host);
            var uriObj = shindig.uri(uri);
            var oldpath = uriObj.getPath();
            var newpath = oldpath + '/';
            if (widgetObject.instanceMetaData) {
               newpath += widgetObject.instanceMetaData.moduleId;
            } else {
               newpath += widgetObject.getModuleId();
            }
            uriObj.setPath(newpath);
            uri = uriObj.toString();
            var urlWithoutPrefix = shindig.uri().removePrefix(uri);
            if (urlWithoutPrefix.indexOf('/') > 0) {
               _proxyCookieDomain = urlWithoutPrefix.substring(0, urlWithoutPrefix.indexOf('/'));
               _proxyCookiePath = urlWithoutPrefix.substring(urlWithoutPrefix.indexOf('/'), urlWithoutPrefix.indexOf('?'));
            } else {
               _proxyCookieDomain = urlWithoutPrefix;
               _proxyCookiePath = '/';
            }
            if (_proxyCookieDomain.indexOf(':') > 0) {
               _proxyCookieDomain = this._proxyCookieDomain.substring(0, this._proxyCookieDomain.indexOf(':'));
            }
            cookie('widgetid', null, {
               path : _proxyCookiePath,
               domain : _proxyCookieDomain,
               expires : -1
            });
            cookie('st', null, {
               path : _proxyCookiePath,
               domain : _proxyCookieDomain,
               expires : -1
            });
         },

         getTheme : function() {
            return widgets.getWidgetTheme(this.getWidgetId());
         }
      });
   };

   var _overwriteCREEventHandleFunc = function(iRuntime) {
      cre$.WidgetRefInternal.prototype.handleEvent = function(/* String */eventName, /* String */payloadType, /* Object */payload) {
         if (typeof eventName === 'undefined' || eventName === null) {
            return false;
         }

         if (eventName === this._iContext.constants.predefinedEvents.onModeChanged) {
            if (wpConfig('isTabbedFullPageWidgetRendering')) {
               handleModeExit();
            } else {
               if (payload && payload.newMode === 'fullpage') {
                  var widgetId = this._iContext._iEvents._widgetId;
                  if (widgetId) {
                     utils.changeHash('fullpageWidgetId=' + widgetId);
                  }
               }
               return this.handleModeChange(payload.newMode);
            }
         } else if (payload && payload.newMode && this._isOnModeEvent(eventName, payloadType, payload)) {
            this.invokeOnModeMethod(payload.newMode);
            return true;
         }

         return this._handleEventInternal(eventName, payloadType, payload);
      };
   };

   var _registerItemSetPersistence = function(iRuntime) {
      var _extractChange = function(itemSet) {
         var result = {};
         array.forEach(itemSet.getAllNames(), function(name) {
            value = itemSet.getItemValue(name);
            result[name] = value;
         });
         return result;
      };

      var itemSetPersistence = {
            update : function(widgetId, itemSet, sync) {
               var retVal = new cre$.promise.Promise();
               var change = _extractChange(itemSet);

               persistor.savePreference(widgetId, change).then(
                  function (change) {
                     var refresh = function() {
                        widgets.updateWidgetName(widgetId);
                        retVal.resolve(itemSet);
                     };
                     var errorHandler = function(response, ioArgs) {
                        retVal.reject();
                     };
                     utils.withLayoutInfo(true, errorHandler).then(refresh);
                  },
                  function (error){
                     retVal.reject(error);
                  }
               );

               return retVal;
            },
            getItemSets : function(widgetId, id, mode) {
               var context = iRuntime.getWidgetById(widgetId)._iContext;
               return cre$.promise.resolved(context.getItemSet(id, mode));
            }
          };
      cre$.services.getServiceManager().setService(cre$.services.ITEMSETPERSISTENCE, itemSetPersistence, '');
   };

   var _loadNavItems = function(canPersonalize) {
      var domId = null;
      if (wpConfig('isCommunitiesPage')) {
         domId = 'lotusNavBar';
      } else if (wpConfig('isProfilesPage')) {
         domId = 'lotusProfileNavBar';
      }

      var navBarOpts = {
            overviewDomId : wpConfig('navBarOverViewElementId')
          };
      var navbar = navigation.init(domId, navBarOpts);

      var nodes = utils.getPageWidgetInstances(wpConfig('defaultPageId'));
      nodes = utils.sortWidgetInstances(nodes);

      array.forEach(nodes, function(widgetInstance) {
         var enabled = widgetInstance.enabled;
         if (enabled !== 'false') {
            var widgetDef = utils.getWidgetDefByInstance(widgetInstance);
            if (widgetDef == null) {
               logger.warn('Unable to find widget definition for: ' + widgetInstance.defIdRef + ', it will be skipped.');
               return false;
            }

            if (widgets.canAddWidget(widgetDef, widgetInstance, canPersonalize)) {
               navbar.addNavItem(widgetDef, widgetInstance);
            }
         }
      });

      navbar._refreshSelection();
   };

   var placeWidgetMetadata = function(addToNavBarBoolean, baseWidgetMode) {
   	signals.set('initialLoad', true);

      var promise = new Deferred();
      var widgetsMetadata = [];

      /* internal functions */
      var addAllWidgets = function(pageId, displayedUserInfo, canPersonalize) {
         var widgetsMetadata = [];
         try {
            var widgetInstances = null;
            if (wpConfig('isProfilesEnv')) {
               var profileType = (displayedUserInfo && typeof (displayedUserInfo.profileType) == 'string'
                     && lang.trim(displayedUserInfo.profileType).length > 0 ? displayedUserInfo.profileType : 'default');
               widgetInstances = utils.getPageWidgetInstances(pageId, null, profileType);
               if (!widgetInstances || !widgetInstances.length) { 
                  // fall back to default layout when there is no layout for
                  // current profile type
                  widgetInstances = utils.getPageWidgetInstances(pageId, null, 'default');
                  logger.debug('No widget layout for profile type [' + profileType + '] defined.  Falling back to default layout.');
               }
            } else {
               widgetInstances = utils.getPageWidgetInstances(pageId);
               widgetInstances = utils.sortWidgetInstances(widgetInstances);
            }

            array.forEach(widgetInstances, function(widgetInstance) {
               var widgetDef = utils.getWidgetDefByInstance(widgetInstance);
               var defIdRef = widgetInstance.defIdRef;
               if (widgetDef == null) {
                  logger.warn('Unable to find widget definition for: ' + defIdRef + ', it will be skipped.');
                  return false;
               }

               var widgetMode = baseWidgetMode || 'view';
               var haveMode = utils.isModeSupported(widgetMode, widgetDef, false);
               var canAddOpts = { canPersonalize : canPersonalize };
               var canAddWidget = widgets.canAddWidget(widgetDef, widgetInstance, canAddOpts);

               var wCanPersonalize = canPersonalize;
               if (utils.isUpdatesPage() && defIdRef !== 'StatusUpdates') {
                  wCanPersonalize = false;
               }

               if (haveMode && canAddWidget) {
                  var instanceId = widgetInstance.instanceId || defIdRef;
                  var uiLocation = widgetInstance.uiLocation;                  
                  widgets.addUILocation(instanceId, uiLocation);

                  var column = layout.getColumn(uiLocation);
                  if (column) {
                     var draggable = column.draggable;
                     var opts = {
                           canPersonalize : wCanPersonalize,
                           draggable : draggable
                         };
                     var wrapperOpts = {
                           widgetDef : widgetDef,
                           widgetInstance : widgetInstance,
                           opts : opts
                         };
                     var wrapper = new WidgetWrapper(wrapperOpts);
                     widgets._registerWidgetWrapper(instanceId, wrapper);
                     var columnContainer = layout.getColumnContainer(uiLocation);
                     if (columnContainer) {
                        domConstruct.place(wrapper.domNode, columnContainer, 'last');
                     }

                     // create widget object
                     var metadataOpts = {
                           widgetMode : widgetMode
                         };
                     var widgetMetadata = widgets.packageWidgetMetadata(widgetInstance, widgetDef, metadataOpts);
                     widgetsMetadata.push(widgetMetadata);
                  }
               }
            });

            promise.resolve(widgetsMetadata);
         } catch (exception) {
            promise.reject(exception);
            logger.error(exception);
            errorhandling.DefaultErrorHandler('lconn.core.WidgetPlacement.addAllWidgets', exception);
         }
      };

      WidgetWrapper.init(widgets, layout);

      var displayedUserInfo = utils.getDisplayedUserInfo();
      var canPersonalize = (utils.getUserProfileOverrideProperty('canPersonalize') === 'true');
      var pageId = wpConfig('pageId');

      var layoutInfoPromise = utils.withLayoutInfo();
      if (addToNavBarBoolean != false) {
         layoutInfoPromise.then(function() {
            _loadNavItems(canPersonalize);
         });
      }

      if (!pageId) {
         promise.resolve(widgetsMetadata);
         return promise;
      }

      layout.initColumns(canPersonalize);
      promise.then(lang.hitch(this, function(widgetSpecs) {
         var parseAllWidgets = function() {
            var parseArea = dom.byId('lotusFrame');
            if (parseArea == null) {
               var frameDivs = query('.lotusFrame');
               if (frameDivs != null && frameDivs.length > 0) {
                  parseArea = frameDivs[0];
               } else {
                  parseArea = win.document;
               }
            }
            parser.parse(parseArea);
         };
         layout.createAllDropZones();

         signals.get('initialLoad', false);
      }));

      layoutInfoPromise.then(function() {
         addAllWidgets(pageId, displayedUserInfo, canPersonalize);
      });

      return promise;
   };

   var loadWidgetFullPage = function(widgetId, additionalParameters) {
      loadFullpageView(widgetId, additionalParameters, true, true);
   };

   var loadFullpageView = function(instanceId, additionalParameters, addState, overrideOverViewLink, dontRegisterCloseView) {
      var pageId = wpConfig('defaultPageId');
      var widgetInstance = utils.getWidgetInstance(instanceId, null, pageId);
      var defIdRef = (widgetInstance ? widgetInstance.defIdRef : instanceId);
      var widgetDef = utils.getWidgetDef(defIdRef);
      additionalParameters = additionalParameters || [];
      additionalParameters.push({
         name : 'resourceId',
         value : wpConfig('resourceId')
      });

      switchView(widgetDef, widgetInstance, additionalParameters, overrideOverViewLink, addState);
   };

   var reloadOverviewPage = function() {
      logger.entering('ic-core/WidgetPlacement', 'reloadOverviewPage');

      closeOtherViews();
      var currentFullpageWidgetId = signals.get('currentFullpageWidgetInstanceId');
      if (currentFullpageWidgetId) {
         // remove references to fullpage widget
         var destroyOpts = {
               destroyDropDownMenu : false,
               destroySubArea : true,
               deleteDNDItem : false
             };
         widgets.destroyWidget(currentFullpageWidgetId, null, destroyOpts);
         signals.set('currentFullpageWidgetInstanceId', null);
      }

      var onlyFullPageWidgetLoaded = signals.get('onlyFullPageWidgetLoaded');
      if (onlyFullPageWidgetLoaded) {
         var widgetSpecsPromise = wpCRE.placeWidgetMetadata(false, 'view');
         widgetSpecsPromise.then(lang.hitch(this, function(widgetSpecs) {
            widgets.renderWidgets(widgetSpecs);
            signals.set('onlyFullPageWidgetLoaded', false);
         }));
      }

      array.forEach(wpConfig('hideElements'), function(hideElement) {
         utilities.show(hideElement, false, false, true);
         try {
            registry.byId(hideElement).show();
         } catch (exception1) { /* do nothing */ }
      });

      layout.destroyColumn('fullpage');
      layout.showColumns();

      navigation.get()._highlightNavItem();
      widgets.refreshWidgets();
      
      return false;
   };

   var closeOtherViews = function() {
      var closeViewFunction = signals.get('registerCloseViewFunction');
      if (closeViewFunction != null) {
         closeViewFunction();
         signals.set('registerCloseViewFunction', null);
      }
   };
   
   var switchView = function(widgetDef, widgetInstance, additionalParameters) {
      closeOtherViews();
      signals.set('registerCloseViewFunction', closeSwitchView);

      var widgetInstanceId = widgetInstance;
      if (widgetInstance && lang.isObject(widgetInstance)) {
         widgetInstanceId = widgetInstance.instanceId;
      }
      if (!widgetInstanceId && widgetDef && lang.isObject(widgetDef)) {
         widgetInstanceId = widgetDef.defId;
      }

      var destroyOpts = {
            destroyDropDownMenu : false,
            destroySubArea : true
          };
      widgets.destroyWidget(widgetInstanceId, null, destroyOpts);
      var currentFullpageWidgetId = signals.get('currentFullpageWidgetInstanceId');
      if (currentFullpageWidgetId) {
         widgets.destroyWidget(currentFullpageWidgetId, null, destroyOpts);
      }

      // TODO don't have to this anymore swhich we use closeOtherViews();
      layout.destroyColumn('fullpage');
      layout.hideColumns();

      array.forEach(wpConfig('hideElements'), function(hideElement) {
         utilities.hide(hideElement, false, true);
      });

      navigation.get()._highlightNavItem(widgetInstanceId);

      // give a chance for previous widget to load completely
      win.setTimeout(function() {
         utilities.show('widget-container-fullpage', false, false, true);
         var renderOpts = {
               widgetMode : 'fullpage',
               skinType : 'skinless',
               addToNavBar : false
             };
         widgets.renderWidget(widgetDef, widgetInstance, 'fullpage', renderOpts);
         signals.set('currentFullpageWidgetInstanceId', widgetInstanceId);
         signals.set('isInWidgetFullpageMode', true);

         var title = utils.getWidgetName(widgetDef, widgetInstance);
         utils.setTitle(title);
      }, (signals.get('currentFullpageWidgetInstanceId') == null ? 200 : 0));  
   };

   var handleModeExit = function(ignoreCallBack) {
      wpConfig('handleModeExitExe', true);
      if (wpConfig('cancelCallBack') != null && ignoreCallBack != true) {
         wpConfig('cancelCallBack')();
      }

      array.forEach(wpConfig('hideElements'), function(hideElement) {
         utilities.show(hideElement, false, false, true);
      });

      if (wpConfig('TabContainerDomId') != null) {
         var parentHTMLNode = dom.byId(wpConfig('TabContainerDomId'));
         var nodes = parentHTMLNode.childNodes;
         var temp = array.filter(nodes, function(currentNode) {
            var currentNodeId = currentNode.id;
            return (lang.isString(currentNodeId) && (currentNodeId.indexOf('_TabItem') !== -1)
                  && !domClass.contains(currentNode, 'noRemove'));
         });
         array.forEach(temp, function(currentNode) {
            currentNode.parentNode.removeChild(currentNode);
         });
      }

      if (wpConfig('TempWidgetContainerDomId') != null) {
         layout.destroyColumn(wpConfig('TempWidgetContainerDomId'));
      }

      widgets.refreshWidgets();
      layout.showColumns();

      wpConfig('handleModeExitExe', null);
      wpConfig('firstWidget', null);
      wpConfig('isFullPageWidgetRendering', null);
      wpConfig('TempWidgetContainerDomId', null);
      wpConfig('TabContainerDomId', null);
      wpConfig('isTabbedFullPageWidgetRendering', null);

      navigation.get()._highlightNavItem();
   };
   
   var activateTabbedWidget = function(widgetDef, widgetInstance, widgetMode, intialDisplayDomId, TabContainerDomId, bDestroyTabContainerFirst, attributesMap) {
      var widgetDefId = widgetDef.defId;
      var widgetInstanceId = widgetInstance.instanceId || widgetDefId;

      if (bDestroyTabContainerFirst) {
         layout.destroyColumn(wpConfig('TempWidgetContainerDomId'), false);
      }

      var destroyOpts = {
            destroyDropDownMenu : false,
            destroySubArea : true
          };
      widgets.destroyWidget(widgetInstanceId, null, destroyOpts);
      var renderOpts = {
            widgetMode : widgetMode,
            skinType : 'skinless',
            addToNavBar : false,
            addDropZone : false,
            attributesMap : attributesMap
          };
      var uiLocation = wpConfig('TempWidgetContainerDomId');
      widgets.renderWidget(widgetDef, widgetInstanceId, uiLocation, renderOpts);

      if (intialDisplayDomId != null) {
         utilities.hide(intialDisplayDomId, false, true);
      }

      // a11y. If not role is set, make it a tab if no map, create a blank array
      // if it's an object but not an array, make the map an array with just
      // that object.
      attributesMap = attributesMap || [];
      if (lang.isObject(attributesMap) && !lang.isArray(attributesMap)) {
         attributesMap = [attributesMap];
      }

      // let's see if the role has already been set in the map
      var sRole = 'tab';
      array.forEach(attributesMap, function(attr) {
         try {
            if (attr && attr['role']) {
               sRole = attr['role'];
            }
         } catch (ee) { /* do nothing */ }
      });

      var liElements = query('li', dom.byId(TabContainerDomId));
      array.forEach(liElements, function(liElement) {
         domClass.remove(liElement, 'lotusSelected');  
         domClass.remove(liElement, 'dijitTabContainerBottom-container');
         domAttr.set(liElement, {
            tabindex : '-1',
            'role' : sRole,
            'aria-selected' : 'false'
         });

         var element = liElement.id.substring(0, liElement.id.indexOf('_TabItem'));
         var menuiconHolder = dom.byId(element + '_menuiconHolder');
         var selectedLinkHolder = dom.byId(element + '_selectedLinkHolder');
         var menuicon = dom.byId(element + '_menuicon');

         if (menuiconHolder != null) {
            domStyle.set(menuiconHolder, 'width', '7000px');
            domStyle.set(menuiconHolder, 'display', 'block');
         }
         if (selectedLinkHolder != null) {
            domStyle.set(selectedLinkHolder, 'width', '1px');
            domStyle.set(selectedLinkHolder, 'visibility', 'hidden');
            domStyle.set(selectedLinkHolder, 'overflow', 'hidden');
         }

         if (menuicon != null){
            domAttr.set(menuicon, 'tabIndex', '-1');
         }

         query('a', liElement).forEach(function(node) {
            domAttr.set(node, 'tabIndex', '-1');
         });

         var holder = dom.byId(element + '_linkHolder');
         if (holder != null) {
         	var tabLink = dom.byId(element + '_multiWidget');
            holder.insertBefore(tabLink, holder.firstChild);
         }
      });

      var selectedBarElem = dom.byId(widgetInstanceId + '_TabItem');
      if (selectedBarElem != null) {
         domClass.add(selectedBarElem, 'lotusSelected');
         domClass.add(selectedBarElem, 'dijitTabContainerBottom-container');
         domAttr.set(selectedBarElem, {
            tabindex : '0',
            'aria-selected' : 'true'
         });
      }

      var menuiconHolder = dom.byId(widgetInstanceId + '_menuiconHolder');
      var selectedLinkHolder = dom.byId(widgetInstanceId + '_selectedLinkHolder');
      var menuicon = dom.byId(widgetInstanceId + '_menuicon');

      if (menuiconHolder != null) {
         domStyle.set(menuiconHolder, 'width', '');
         domStyle.set(menuiconHolder, 'display', '');
      }
      if (selectedLinkHolder != null) {
         domStyle.set(selectedLinkHolder, 'width', '');
         domStyle.set(selectedLinkHolder, 'visibility', '');
         domStyle.set(selectedLinkHolder, 'overflow', '');
      }
      if (menuicon != null) {
         dojoAttr.remove(menuicon, 'tabIndex');
      }

      var holder = dom.byId(widgetInstanceId + '_selectedLinkHolder');
      if (holder != null) {
      	var tabLink = dom.byId(widgetInstanceId + '_multiWidget');
         holder.insertBefore(tabLink, holder.firstChild);
      }
   };
   
   var addTabsWithOnclickCalls = function(TabContainerDomId, TempWidgetContainerDomId, intialDisplayDomId, cancelCallBack, FirstTabItemDomId, widgetMode, attributesMap) {
      var selectTab = function(node, opts) {
         var widgetDefId = opts.defNode.defId;
         var widgetInstanceId = opts.instNode.instanceId || widgetDefId;
         var selectTabInstValue = utilities.getURLParam('tabinst', true);

         query('._iconHolder', node.parentNode).forEach(function(iconNode) {
            domStyle.set(iconNode, 'display', 'none');
         });
         if (!moreActionsNode) {
            query('._iconHolder', node).forEach(function(iconNode) {
               domStyle.set(iconNode, 'display', 'inline');
            });
         }

         // set the aria-label of the tabpanel to match the tab selected
         try {
            domAttr.set(dom.byId(wpConfig('TabContainerDomId') + '_panel'), 
               'aria-label', query('a._linkHolder', node)[0].innerHTML);
         } catch (ee) { /* do nothing */ }

         // Show informational message that changes should be saved for each
         // tab.
         var infoMessage = signals.get('infoMessage');
         if (infoMessage == null && dom.byId('editWarningMessage')) {
            infoMessage = new MessageBox({
               canClose : true,
               _strings : {
                  icon_alt : coreMessages['rs_messagebox_info_icon_alt'],
                  a11y_label : coreMessages['rs_messagebox_info_a11y_label'],
                  close_btn_title : coreMessages['rs_close'],
                  close_btn_alt : coreMessages['rs_close']
               },
               type : MessageBox.TYPE.INFO,
               msg : messages['switchTabWarning']
            }, domConstruct.create('div'));
            domConstruct.place(infoMessage.domNode, dom.byId('editWarningMessage'), 'only');
            signals.set('infoMessage', infoMessage);
         }

         if (opts.destroyContainer) {
            layout.destroyColumn(wpConfig('TempWidgetContainerDomId'), false);
         }

         var destroyOpts = {
               destroyDropDownMenu : false,
               destroySubArea : true,
               deleteDNDItem : false
             };
         widgets.destroyWidget(widgetInstanceId, null, destroyOpts);
         var renderOpts = {
               widgetMode : opts.widgetMode,
               skinType : 'skinless',
               addToNavBar : false,
               addDropZone : false,
               attributesMap : opts.attributesMap
             };
         var uiLocation = wpConfig('TempWidgetContainerDomId');
         widgets.renderWidget(widgetDefId, widgetInstanceId, uiLocation, renderOpts);

         if (opts.initDispId) {
            utilities.hide(opts.initDispId, false, true);
         }

         if (opts.attributesMap && opts.attributesMap.length) {
            var attributes = opts.attributesMap[0];
            var key = attributes.entryValue;
            if (key) {
               var hash = null;
               if (attributes.entryName === 'searchKeywords') {
                  hash = 'query=';
               } else if (attributes.entryName === 'tagCloudItemValue') {
                  hash = 'tag=';
               }

               if (hash) {
                  selectTabId = attributes.selectTab;
                  selectTabInst = attributes.selectTabInst;

                  hash += key;
                  if (selectTabInst) {
                     hash += '&tabinst=' + widgetInstanceId;
                  } else if (selectTabId) {
                     hash += '&tab=' + widgetDefId;
                  } else {
                     hash += '&tabinst=' + widgetInstanceId;
                  }
                  utils.changeHash(hash);
               }
            }
         }

         // we have an external node to hold the more actions, update that
         // when we switch tabs
         if (moreActionsNode) {
            // destroy, disconnect, and remove old dijits and dom elements
            var oldDijit = registry.byId(opts.instId + 'moreActions');
            if (oldDijit) {
               oldDijit.destroy();
            }

            if (!_moreActionsConnect || !lang.isObject(_moreActionsConnect)) {
               _moreActionsConnect = {};
            }

            if (_moreActionsConnect[opts.instId]) {
               _moreActionsConnect[opts.instId].remove();
               delete _moreActionsConnect[opts.instId];
            }

            var linkId = moreActionsNode.id + '_menuHolder';
            query('.' + linkId).forEach(function(node) {
               node.parentNode.removeChild(node);
            });

            // create new dijits and dom elements
            var menu = new Menu({
               'id' : opts.instId + 'moreActions',
               'class' : linkId,
               'style' : 'display:none;'
            });
            domConstruct.place(menu.domNode, moreActionsNode, 'after');

            // set the aria label and title to the correct text
            var widgetName = utils.getEscapedWidgetName(opts.defNode, opts.instNode, true, widgetMode || 'view');
            var actionsAlt = messages['actions_alt'] || 'Actions for: ${0}';
            actionsAlt = string.substitute(actionsAlt, [ widgetName ]);

            query('a', moreActionsNode).forEach(function(node) {
               domAttr.set(node, {
                  title : actionsAlt,
                  'aria-label' : actionsAlt
               });
            });
            query('.lotusAltText', moreActionsNode).forEach(function(node) {
               domAttr.set(node, {
                  innerHTML : actionsAlt
               });
            });

            // get a reference to the newly generated moreActions node
            var linkNode = dom.byId(opts.instId + 'moreActions');

            // add the refresh menu item
            domConstruct.place(domConstruct.create('div', {
               dojoType : 'dijit.MenuItem',
               label : messages['refresh'],
               'onclick' : 'lconn.core.WidgetPlacement.fetchAndRefresh("' + opts.instId + '");'
            }), linkNode, 'last');

            // add the help menu item
            var helpLink = opts.defNode.helpLink;
            if (helpLink && helpLink.length) {
               helpLink = utils.getI18nString(helpLink);
               var helpItem = domConstruct.create('div', {
                  dojoType : 'dijit.MenuItem',
                  label : messages['help'],
                  title : messages['link.window.openNewWindow'],
                  'onclick' : 'lconn.core.utilities.hide("' + opts.instId + 'moreActions", true, true);' 
                            + 'lconn.core.WidgetPlacement.openHelpWindow("' + helpLink + '");'
               });
               domConstruct.place(helpItem, linkNode, 'last');
            }

            // parse the newly generated moreActions so the Menu will show
            parser.parse(linkNode.parentNode);

            // let's connect the click to open the newly generated menu
            _moreActionsConnect[opts.instId] = on(moreActionsNode, 'click', function(evt) {
               wpCRE.openMenu(evt, opts.instId);
               evt.preventDefault(), evt.stopPropagation();
            });
         }
      };

      var addTab = function(opts) {
         // Maximum number of characters in tab's string.
         var maxTabLength = 50;
         var widgetName = utils.getEscapedWidgetName(opts.defNode, opts.instNode, true, widgetMode || 'view');
         if (widgetName.length > maxTabLength) {
            widgetName = widgetName.substring(0, maxTabLength) + '...';
         }

         var li = dom.byId(opts.instId + '_TabItem');
         if (li == null) {
            li = domConstruct.create('li', {
               id : opts.instId + '_TabItem',
               role : 'tab'
            }, TabContainerDomId, 'last');
         }

         domAttr.set(li, {
            itemidx : opts.itemIdx,
            innerHTML : '<a class="_linkHolder lotusLeft">' + widgetName + '</a>'
                  + '<a class="_iconHolder lotusIcon lotusLeft" style="padding: 0; display: none;"></a>'
                  + '<div class="_menuHolder" style="display: none;"><div>'
         });

         on(li, 'click', function(evt) {
            selectTab(li, opts);
            evt.preventDefault(), evt.stopPropagation();
            return false;
         });

         if (!opts.showMenu) {
            query('._iconHolder', li).forEach(domConstruct.destroy);
            query('div._menuHolder', li).forEach(domConstruct.destroy);
         } else if (!moreActionsNode) {
            var pMenu = query('div._menuHolder', li)[0];

            domAttr.set(pMenu, {
               id : opts.instId + 'moreActions',
               dojoType : 'dijit.Menu'
            });

            var refreshItem = domConstruct.create('div', {
               dojoType : 'dijit.MenuItem',
               label : messages['refresh'],
               'onclick' : 'lconn.core.WidgetPlacement.fetchAndRefresh("' + opts.instId + '");'
            }, pMenu, 'last');

            var helpLink = opts.defNode.helpLink;
            if (helpLink && helpLink.length) {
               helpLink = utils.getI18nString(helpLink);
               var helpItem = domConstruct.create('div', {
                  dojoType : 'dijit.MenuItem',
                  label : messages['help'],
                  title : messages['link.window.openNewWindow'],
                  'onclick' : 'lconn.core.utilities.hide("' + pMenu.id + '", true, true);'
                            + 'lconn.core.WidgetPlacement.openHelpWindow("' + helpLink + '");'
               }, pMenu, 'last');
            }

            var actionsAlt = messages['actions_alt'] || 'Actions for: ${0}';
            actionsAlt = string.substitute(actionsAlt, [widgetName]);

            var pIcon = query('._iconHolder', li)[0];
            domAttr.set(pIcon, {
               id : opts.instId + '_MenuIcon',
               role : 'button',
               'aria-haspopup' : 'true',
               href : 'javascript:void(0);',
               innerHTML : '<img class="lotusArrow" alt="' + actionsAlt + '" title="' + actionsAlt + '" src="' + _Widget.prototype._blankGif
                     + '"/><span class="lotusAltText">&#9660;</span>'
            });
            domClass.add(pIcon, 'lotusIcon');
            on(pIcon, 'click', function(evt) {
               wpCRE.openMenu(evt, opts.instId);
               evt.preventDefault(), evt.stopPropagation();
            });
         }

         domConstruct.place(li, TabContainerDomId);
         parser.parse(li);
         return li;
      };

      layout.showColumns();

      array.forEach((wpConfig('hideElements') || []), function(elem) {
         utilities.hide(elem, false, true);
      });

      if (cancelCallBack) {
         wpConfig('cancelCallBack', cancelCallBack);
      }

      var selectedNode = null;
      var selectTabId = null;
      var selectTabInst = null;
      var showHidden = false;
      var moreActionsNode = null;

      if (attributesMap && attributesMap.length) {
         var attributes = attributesMap[0];
         var component = attributes.component;
         if (component && component === 'communities:content') {
            showHidden = true;
         }
         selectTabId = attributes.selectTab;
         selectTabInst = attributes.selectTabInst;
         var key = attributes.entryValue;
         if (key) {
            var hash = null;
            if (attributes.entryName === 'searchKeywords') {
               hash = 'query=' + key;
            } else if (attributes.entryName === 'tagCloudItemValue') {
               hash = 'tag=' + key;
            }

            if (hash) {
               // CCM
               if (selectTabInst) {
                  hash += '&tabinst=' + selectTabInst;
               } else if (selectTabId) {
                  hash += '&tab=' + selectTabId;
               }
               utils.changeHash(hash);
            }
         }

         moreActionsNode = attributes.moreActionsContainerNode;
      }

      var displayedUserInfo = utils.getDisplayedUserInfo();
      var profileType = (displayedUserInfo && displayedUserInfo.profileType ? displayedUserInfo.profileType : 'default');
      var canPersonalize = (utils.getUserProfileOverrideProperty('canPersonalize') === 'true');

      var nodes = utils.getPageWidgetInstances(wpConfig('defaultPageId'), null, profileType);
      if (!nodes || !nodes.length) {
         // fall back to default layout when there is no layout for current
         // profile type
         nodes = utils.getPageWidgetInstances(wpConfig('defaultPageId'), null, 'default');
      }

      array.forEach((nodes || []), lang.hitch(this, function(widgetInstance, idx) {
         var defIdRef = widgetInstance.defIdRef;
         selectTabId = selectTabId || defIdRef;
         var widgetDef = utils.getWidgetDef(defIdRef);
         if (widgetDef == null) {
            logger.warn('Unable to find widget definition for: ' + defIdRef + ', it will be skipped.');
            return; // the widget def is missing the config file.
         }

         var uiLocation = widgetInstance.uiLocation,
             instanceId = widgetInstance.instanceId || defIdRef;

         if (instanceId === TempWidgetContainerDomId) {
            return; // skip adding widget to widget's self location
         }

         var canAddOpts = {
               canPersonalize : canPersonalize,
               showHidden : showHidden
             };
         if (!widgets.canAddWidget(widgetDef, widgetInstance, canAddOpts)) {
            return;
         }

         var params = {
               containerId : TabContainerDomId,
               tempContainerId : TempWidgetContainerDomId,
               defNode : widgetDef,
               instNode : widgetInstance,
               instId : instanceId,
               initDispId : intialDisplayDomId,
               cancelCallBack : cancelCallBack,
               widgetMode : widgetMode,
               attributesMap : lang.clone(attributesMap),
               itemIdx : idx,
               showMenu : false,
               destroyContainer : true
             };

         var addedNode = null;
         if (utils.isModeSupported(widgetMode, widgetDef)) {
            // Don't show edit tab for description widget
            if (!((defIdRef === 'description') && (widgetMode === 'edit'))) {
               addedNode = addTab(params);
            }
         } else if (uiLocation === TempWidgetContainerDomId) {
            params.showMenu = true;
            addedNode = addTab(params);
         }

         if (instanceId === selectTabInst || defIdRef === selectTabId) {
            selectedNode = addedNode;
         }
      }));

      wpConfig('isTabbedFullPageWidgetRendering', true);
      wpConfig('TempWidgetContainerDomId', TempWidgetContainerDomId);
      wpConfig('TabContainerDomId', TabContainerDomId);

      new TabPanel(TabContainerDomId);
      selectedNode && selectedNode.click();

      // code makes sure the height of the image in the tabs is equal to the
      // height of the link text.
      // For the case where the customer changes the appearance of the tabs.
      query('a._iconHolder', dom.byId(TabContainerDomId)).forEach(function(iconNode) {
         var imgNode = query('img.lotusArrow', iconNode);
         if (imgNode.length) {
            var linkNode = query('._linkHolder', iconNode.parentNode);
            if (linkNode.length) {
               var h = dojo.coords(linkNode[0]).h - domStyle.get(linkNode[0], 'borderBottomWidth');
               if (!has('ie')) {
                  h -= domStyle.get(linkNode[0], 'borderTopWidth');
               }
               domStyle.set(imgNode[0], 'height', h + 'px');
            }
         }
      });
   };

   var URLChange = function(/* String */URL) {
      logger.entering('ic-core/WidgetPlacement', 'URLChange', arguments);

      var index = URL.indexOf('#');
      if (index === -1 || URL.substring(index).length === 1 || URL.substring(index) === '#overview') {
         reloadOverviewPage();
         return;
      }

      var fullpageWidgetId = utilities.getURLParam('fullpageWidgetId', true);
      var currentFullpageWidgetId = signals.get('currentFullpageWidgetInstanceId');
      if (fullpageWidgetId && fullpageWidgetId !== currentFullpageWidgetId) {
         loadFullpageView(fullpageWidgetId, null, false, true, true);
         return;
      }

      // Check for query hash - indicating search url. Force browser to
      // switch to it and send url to server.
      var queryValue = utilities.getURLParam('query', true);
      if (queryValue && domStyle.get('searchCommunityForm', 'display') === 'none') {
         // If we're already displaying the search result form - don't do
         // navigation to search again.
         // Otherwise duplicate what a search does...
         if (utils.getHandlers('handleSearchRequest')) {
            var selectTabInstValue = utilities.getURLParam('tabinst', true) || null, 
                selectTabValue = utilities.getURLParam('tab', true) || null;

            var opts = {
                  tab : selectTabValue,
                  tabinst : selectTabInstValue,
                  query : queryValue
                };
            array.forEach(utils.getHandlers('handleSearchRequest'), function(handler) {
               handler(opts);
            });
         }
      }
   };

   var addEditTabsWithOnclickCalls = function(TabContainerDomId, editModeContainerDomId, intialDisplayDomId, cancelCallBack, editPageTabFirstItemDomId) {
      return addTabsWithOnclickCalls(TabContainerDomId, editModeContainerDomId, intialDisplayDomId, cancelCallBack, editPageTabFirstItemDomId, 'edit');
   };

   var showFirstTab = function(intialDisplayDomId, FirstTabItemDomId, callback) {
      if (wpConfig('TabContainerDomId')) {
         var parentHTMLNode = dom.byId(wpConfig('TabContainerDomId'));
         if (parentHTMLNode) {
            query('li[id$="_TabItem"]', parentHTMLNode).forEach(function(node) {
               domClass.remove(node, 'lotusSelected');
               domAttr.set(node, {
                  'tabindex' : '-1',
                  'aria-selected' : 'false',
                  'role' : 'tab'
               });
            });
         }

         // set the aria-label of the tabpanel to match the tab selected
         try {
            domAttr.set(dom.byId(wpConfig('TabContainerDomId') + '_panel'),
               'aria-label',
               query('a._linkHolder', dom.byId(FirstTabItemDomId))[0].innerHTML);
         } catch (ee) { }
      }

      if (wpConfig('TempWidgetContainerDomId')) {
         layout.destroyColumn(wpConfig('TempWidgetContainerDomId'));
      }

      if (intialDisplayDomId) {
         utilities.show(intialDisplayDomId);
      }

      if (FirstTabItemDomId) {
         query('#' + FirstTabItemDomId).forEach(function(liItem) {
            domAttr.set(liItem, {
               'tabindex' : '0',
               'aria-selected' : 'true'
            });
            domClass.add(liItem, 'lotusSelected');
         });
      }

      var hash = win.location.hash;
      if (hash) {
         // CCM
         var searchTabPos = hash.indexOf('&tab');
         if (searchTabPos > 0) {
            utils.changeHash(hash.substr(0, searchTabPos));
         }
      }

      if (callback) {
         callback();
      }

      return false;
   };

   var _parseWidgetTitle = function(titleObjectStr) {
      if ('string' !== typeof titleObjectStr) {
         logger.debug('_parseWidgetTitle: unable to parse a non-string object, ' + titleObjectStr);
         return '';
      }

      var result = null, title, resourceBundle, prefix, obj;
      try {
         obj = jsonUtil.fromJson(titleObjectStr);
         if (!obj.title || 'string' !== typeof obj.title) {
            logger.debug('_parseWidgetTitle: title is missing, will return an empty string');
            return '';
         }

         title = obj.title;
         prefix = obj.prefix;

         if (prefix) { // e.g.: {'title':'Forums','prefix':'lc_default'}
            // FIXME: remove hack when a final solution for widgetbundles is found
            widgetMessages = widgetMessages || kernel.i18n.getLocalization('lconn.core.config', 'widgetbundles');
            
            resourceBundle = widgetMessages || {};
            result = resourceBundle[title];
            if ('string' !== typeof result && resourceBundle[prefix]) {
               result = resourceBundle[prefix][title];
            }

            if ('string' !== typeof result) {
               result = title;
            }
         } else { // e.g.: {'title':'Forums'}
            result = title;
         }
      }
      catch (e) { // plain text
         result = titleObjectStr;
      }

      logger.debug('_parseWidgetTitle: parsed title is ' + result);
      return HTMLUtil.escapeText(result);
   };

   var closeFullPageWidgetIfOpen = function() {
      var currentFullpageWidgetId = signals.get('currentFullpageWidgetInstanceId');
      if (currentFullpageWidgetId) {
         var opts = {
               destroyDropDownMenu : false,
               destroySubArea : true,
               deleteDNDItem : false
             };
         widgets.destroyWidget(currentFullpageWidgetId, null, opts);
         signals.set('currentFullpageWidgetInstanceId', null);
      }
   };

   var closeSwitchView = function() {
      var currentFullpageWidgetId = signals.get('currentFullpageWidgetInstanceId');
      if (currentFullpageWidgetId) {
         var opts = {
               destroyDropDownMenu : false,
               destroySubArea : false,
               deleteDNDItem : false
             };
         widgets.destroyWidget(currentFullpageWidgetId, null, opts);
      }

      layout.hideColumn('fullpage');
      layout.destroyColumn('fullpage');
      signals.set('isInWidgetFullpageMode', true);
   };

   var core = {
         init : init,
         placeWidgetMetadata : placeWidgetMetadata,
         loadWidgetFullPage : loadWidgetFullPage,
         loadFullpageView : loadFullpageView,
         reloadOverviewPage : reloadOverviewPage,
         closeOtherViews : closeOtherViews,
         switchView : switchView,
         handleModeExit : handleModeExit,
         activateTabbedWidget : activateTabbedWidget,
         addTabsWithOnclickCalls : addTabsWithOnclickCalls,
         URLChange : URLChange,
         addEditTabsWithOnclickCalls : addEditTabsWithOnclickCalls,
         showFirstTab : showFirstTab,
         closeFullPageWidgetIfOpen : closeFullPageWidgetIfOpen,
         closeSwitchView : closeSwitchView
       };

   return core;

});