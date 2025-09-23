/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2017                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/_base/array",
      "dojo/_base/declare",
      "dojo/_base/kernel",
      "dojo/_base/lang",
      "dojo/_base/window",
      "dojo/_base/xhr",
      "dojo/Deferred",
      "dojo/dom",
      "dojo/dom-attr",
      "dojo/dom-class",
      "dojo/dom-construct",
      "dojo/dom-style",
      "dojo/has",
      "dojo/hash",
      "dojo/i18n",
      "dojo/i18n!./config/nls/widgetbundles",
      "dojo/i18n!./nls/strings",
      "dojo/i18n!./nls/widgets",
      "dojo/keys",
      "dojo/on",
      "dojo/query",
      "dojo/request",
      "dojo/string",
      "dojo/topic",
      "./aria/TabPanel",
      "./aria/Toolbar",
      "./config/features",
      "./config/properties",
      "./config/services",
      "./errorhandling",
      "./help",
      "./HTMLUtil",
      "./url",
      "./util/widgetPlacementConfig",
      "./utilities",
      "./WidgetPlacementCRE",
      "./xpath",
      "./wp/events",
      "ic-gadget/util/trace",
      "ic-ui/DialogUtil"
],
   function(dojo, array, declare, kernel, lang, windowModule, xhr, Deferred, dom,
      domAttr, domClass, domConstruct, domStyle, has, hash, i18n, i18nwidgetbundles,
      i18nstrings, i18nwidgets, keys, on, query, request, string, topic, 
      TabPanel, Toolbar, has, properties, servicesConfig, errorhandling, help,
      HTMLUtil, urlModule, widgetPlacementConfig, utilities, WidgetPlacementCRE,
      xpath, events, logger, DialogUtil) {
        
      /**
       * IBM Connections Widget Framework
       * 
       * @namespace ic-core.WidgetPlacement
       */

      var win = windowModule.global;

      var _serviceName = ((win.ibmConfig) ? win.ibmConfig.serviceName : null),
          _isCommunitiesPage = ('communities' === _serviceName),
          _isProfilesPage = ('profiles' === _serviceName);

      var wp = WidgetPlacementCRE;

      // TODO: final solution should be component-specific code instead of 
      // detecting component in runtime
      wp.isCommunitiesPage = _isCommunitiesPage;
      wp.isProfilesPage = _isProfilesPage;

      // common code begins here
      var messages = i18nwidgets,
          widgetMessages = null,
          coreMessages = i18nstrings;

      var _getI18nString = function(/* String */template) {
         // IC 120789: if the string contains json, stop processing it
         if (/{[^}]+:[^}]+}/.test(template))
            return template;

         var params = win.WidgetPlacementConfig.params,
             newTemplate = template.replace(/{/g, '${');

         return string.substitute(newTemplate, params, function(v, k) {
            return (v ? v : '{' + k + '}');
         });
      };

      var getNavBar = function() {
         var lotusNavBar = dom.byId('lotusProfileNavBar') || dom.byId('lotusNavBar');
         return lotusNavBar;
      };

      var _getNavItem = function(instanceId) {
         var selectedItemId = ((instanceId) ? instanceId+'_navItem' : win.WidgetPlacementConfig.navBarOverViewElementId);
         if (!selectedItemId)
            return null;
         return dom.byId(selectedItemId);
      };

      var _highlightNavItem = function(instanceId) {
         var lotusNavBar = getNavBar();
         if (!lotusNavBar)
            return;

         var selectedItemEle = _getNavItem(instanceId);
         if (selectedItemEle) {
            var liElements = query('li', lotusNavBar) || [];
            array.forEach(liElements, function(liElement) {
               if ('' !== liElement.className) {
                  domClass.remove(liElement, 'lotusSelected');
               }
            });
            domClass.add(selectedItemEle, 'lotusSelected');

            var name = _getTitleFromEle(selectedItemEle);
            if (name) {
               wp.setTitle(name);

               var navBarSelection = dom.byId("dropdownNavMenuSelection");
               if (navBarSelection) {
                  domAttr.set(navBarSelection, 'innerText', name);
               }
            }
         }
      };

      var _modeSupported = function(/* String */mode, /* XMLNode */widgetDef, /* Boolean,optional */strict) {
         if (!widgetDef)
            return false;
         if ('undefined' === typeof strict)
            strict = true;
         var supportedModes = widgetDef.modes || 'view';
         return ((!mode && !strict) || (mode && supportedModes.indexOf(mode) !== -1));
      };

      wp.utils = {};
      if (has('json-widget-metadata')) {
         lang.mixin(wp.utils,
            (function() {
               var _getPage = function(pageId, resourceSubType, doc) {
                  doc = doc || win.WidgetPlacementConfig.widgetConfigDocument;
                  pageId = pageId || win.WidgetPlacementConfig.pageId || win.WidgetPlacementConfig.defaultPageId;
                  resourceSubType = resourceSubType || 'default';

                  var layouts = array.filter(doc.layouts, function(layout) {
                     return (layout.resourceSubType === resourceSubType);
                  });
                  if (!layouts.length) return null;

                  var pages = array.filter(layouts[0].pages, function(page) {
                     return (page.pageId === pageId);
                  });
                  if (!pages.length) return null;
                  
                  return pages[0];
               };

               var _getWidgetDef = function(defId, doc) {
                  if (!defId) return null;
                  if (lang.isArray(defId)) {
                     defId = defId[0];
                  }

                  doc = doc || win.WidgetPlacementConfig.widgetConfigDocument;
                  var defs = array.filter(doc.definitions, function(def) {
                     return (def && def.payload && def.payload.defId === defId);
                  });

                  return ((defs && defs.length) ? defs[0].payload : null);
               };

               var _getWidgetInstance = function(instanceId, doc, pageId) {
                  if (!instanceId) return null;
                  if (lang.isArray(instanceId)) {
                     instanceId = instanceId[0];
                  }

                  var page = _getPage(pageId, null, doc);
                  if (!page) return null;

                  var instances = array.filter(page.widgetInstances, function(inst) {
                     return (inst.instanceId === instanceId);
                  });

                  if (!instances.length) {
                     instances = array.filter(page.widgetInstances, function(inst) {
                        return (inst.defIdRef === instanceId);
                     });
                  }

                  return ((instances && instances.length) ? instances[0] : null);
               };

               var _getWidgetInstancesByDef = function(def, doc, pageId) {
                  if (!def) return null;
                  if (lang.isArray(def)) {
                     def = def[0];
                  }
                  def = def.defId || def;

                  var page = _getPage(pageId, null, doc);
                  if (!page) return null;

                  var instances = array.filter(page.widgetInstances, function(inst) {
                     return (inst.defIdRef === def);
                  });

                  return instances;
               };

               var _getWidgetDefByInstance = function(instance, doc, pageId) {
                  if (!instance) return null;
                  if (lang.isArray(instance)) {
                     instance = instance[0];
                  }

                  instance = (lang.isString(instance) ? _getWidgetInstance(instance, doc, pageId) : instance);

                  var defId = (instance ? instance['defIdRef'] : null);
                  return _getWidgetDef(defId, doc);
               };

               var _getPageWidgetInstances = function(pageId, doc, resourceSubType) {
                  var page = _getPage(pageId, resourceSubType, doc);
                  return (page ? page.widgetInstances : null);
               };

               var _getAllWidgetDefs = function(doc) {
                  doc = doc || win.WidgetPlacementConfig.widgetConfigDocument;

                  var distinctWidgetDef = {};
                  var result = array.map(doc.definitions, function(def) {
                     if (!def || !def.payload) {
                        return null;
                     }

                     var payload = def.payload;
                     if (payload.defId) {
                     	if (distinctWidgetDef[payload.defId]) {
                     		return null;
                     	} else {
                     		distinctWidgetDef[payload.defId] = true;
                        	return payload;
                     	}
                     } else {
                        return payload;
                     }
                  });
                  result = array.filter(result, function(def) {
                  	return !!def;
                  });

                  return result;
               };

               var _addWidgetInstance = function(instance, doc, pageId, unhide) {
                  if (!instance) return false;

                  if (unhide) {
                     var instanceId = instance.instanceId || instance;
                     if (!instanceId) return false;

                     var existingInstance = _getWidgetInstance(instanceId, doc, pageId);
                     if (!existingInstance) return false;

                     existingInstance.enabled = 'true';
                  } else {
                  	if (!instance.defIdRef || !instance.uiLocation) return false;

                     var page = _getPage(pageId, null, doc);
                     if (!page) return false;

                     page.widgetInstances.push(instance);
                  }

                  return true;
               };

               var _removeWidgetInstance = function(instanceId, doc, pageId, hide) {
                  if (!instanceId) return false;

                  if (hide) {
                     var existingInstance = _getWidgetInstance(instanceId, doc, pageId);
                     if (!existingInstance) return false;

                     existingInstance.enabled = 'false';
                  } else {
                     var page = _getPage(pageId, null, doc);
                     if (!page) return false;

                     page.widgetInstances = array.filter(page.widgetInstances, function(instance) {
                        return (instance && instance.instanceId !== instanceId);
                     });
                  }

                  return true;
               };

               var _withLayoutInfo = function(forceRefresh, errorHandler) {
                  var promise = new Deferred(), url;

                  if (!win.WidgetPlacementConfig.widgetConfigDocument || true === forceRefresh || true === win.staleXMLConfig) {
                     url = win.WidgetPlacementConfig.layoutInfoUrl + "&format=json";
                     if (!win.staleXMLConfig)
                        url += '&lastMod=' + win.WidgetPlacementConfig.lastMod;

                     if ('undefined' !== typeof win.WidgetPlacementConfig.needsMigration) {
                        if (win.WidgetPlacementConfig.needsMigration == true) {
                           // Used by server to decide whether to use old overview 
                           // layout or not for Communities
                           url += '&needsMigration=true'; 
                        }
                     }

                     // TODO: unify logging invocation
                     if (win.WidgetPlacementConfig.debug) 
                        console.info('Using URL:' + url);

                     xhr.get({
                        url: url,
                        handleAs: 'json',
                        sync: true,
                        load: function (data) {
                           win.WidgetPlacementConfig.widgetConfigDocument = data;
                           promise.resolve();
                        },
                        error: errorHandler || errorhandling.DefaultXHRErrorHandler
                     });

                     win.staleXMLConfig = false;
                  } else {
                     promise.resolve();
                  }

                  return promise;
               };

               var _resetLayoutInfo = function() {
                  win.WidgetPlacementConfig.widgetConfigDocument = null;
               };

               var exports = {
                     getWidgetDef : _getWidgetDef,
                     getAllWidgetDefs : _getAllWidgetDefs,
                     getWidgetInstance : _getWidgetInstance,
                     getWidgetInstancesByDef : _getWidgetInstancesByDef,
                     getWidgetDefByInstance : _getWidgetDefByInstance,
                     getPageWidgetInstances : _getPageWidgetInstances,
                     addWidgetInstance : _addWidgetInstance,
                     removeWidgetInstance : _removeWidgetInstance,
                     withLayoutInfo : _withLayoutInfo,
                     resetLayoutInfo : _resetLayoutInfo
               };

               return exports;
            })());
      } else {
         lang.mixin(wp.utils,
            (function () {
               var INST_NODE_PATH_BY_INSTID = '/tns:widgets/tns:layout/tns:page[@pageId="%PAGE_ID%"]/tns:widgetInstance[@instanceId="%INST_ID%"]',
                   INST_NODE_PATH_BY_DEFIDREF = '/tns:widgets/tns:layout/tns:page[@pageId="%PAGE_ID%"]/tns:widgetInstance[@defIdRef="%DEF_ID%"]',
                   DEF_NODE_PATH = '/tns:widgets/tns:definitions/tns:widgetDef[@defId="%DEF_ID%"]',
                   PAGE_INST_NODES_PATH = '/tns:widgets/tns:layout%LAYOUT_OPTIONS%/tns:page[@pageId="%PAGE_ID%"]/tns:widgetInstance',
                   PAGE_PATH = '/tns:widgets/tns:layout/tns:page[@pageId="%PAGE_ID%"]',
                   ALL_DEF_NODES_PATH = '/tns:widgets/tns:definitions/tns:widgetDef';

               var _parseToObject = function(node) {
                  // this might be a temporary solution for XML->JSON translation
                  if (!node) return null;

                  var result = {};
                  array.forEach(node.attributes, function(attr) {
                     result[attr.name] = attr.value;
                  });

                  var configDatas = node.getElementsByTagName('configData'),
                      itemSets = node.getElementsByTagName('itemSet');

                  var tempMap = [];
                  if (configDatas.length) {
                     var attrs = configDatas[0].getElementsByTagName('attr');
                     array.forEach(attrs, function(/* XMLNode */attr) {
                        tempMap.push({
                           'key' : attr.getAttribute('key'),
                           'value' : attr.getAttribute('value')
                        });
                     });
                  }
                  result.configData = tempMap;

                  tempMap = [];
                  if (itemSets.length) {
                     var items = itemSets[0].getElementsByTagName('item');
                     array.forEach(items, function(/* XMLNode */item) {
                        tempMap.push({
                           'name' : item.getAttribute('name'),
                           'value' : item.getAttribute('value')
                        });
                     });
                  }
                  result.itemSet = tempMap;

                  return result;
               };

               var _isIE11 = (function() {
                  try {
                     if(!has('ie') && !has('ff')) {
                        return !!win.navigator.userAgent.match(/Trident\/7\.0/);
                     }
                  } catch (e) { /* do nothging */ }

                  return false;
               })();

               var _getWidgetDef = function(defId, dataDoc) {
                  if (!defId) return null;
                  if (lang.isArray(defId)) {
                     defId = defId[0];
                  }

                  var node = null;
                  if (has("ie-native-mode") || _isIE11) {
                     node = widgetPlacementConfig.getDefinitionById(defId);
                  } else {
                     var doc = ((dataDoc) ? dataDoc : win.WidgetPlacementConfig.widgetConfigXMLDocument),
                         exp = DEF_NODE_PATH.replace('%DEF_ID%', defId);
                     node = xpath.selectSingleNode(exp, doc);
                  }

                  return _parseToObject(node);
               };

               var _getWidgetInstance = function(instanceId, dataDoc, pageId, toJSObject) {
                  if (!instanceId) return null;
                  if (lang.isArray(instanceId)) {
                     instanceId = instanceId[0];
                  }

                  pageId = pageId || win.WidgetPlacementConfig.pageId || win.WidgetPlacementConfig.defaultPageId;

                  var node = null;
                  if (has("ie-native-mode") || _isIE11) {
                     node = widgetPlacementConfig.getInstanceByInstId(instanceId, pageId);
                     if (!node) {
                        var defId = instanceId;
                        node = widgetPlacementConfig.getInstancesByDefId(defId, pageId)[0];
                     }                  
                  } else {
                     var doc = dataDoc || win.WidgetPlacementConfig.widgetConfigXMLDocument,
                         exp = INST_NODE_PATH_BY_INSTID.replace('%PAGE_ID%', pageId).replace('%INST_ID%', instanceId),
                         node = xpath.selectSingleNode(exp, doc);

                     if (!node) {
                        // for mandatory widgets, only one widget instance of which
                        // could exist on one page
                        var defId = instanceId;
                        exp = INST_NODE_PATH_BY_DEFIDREF.replace('%PAGE_ID%', pageId).replace('%DEF_ID%', defId);
                        node = xpath.selectSingleNode(exp, doc);
                     }
                  }

                  if (toJSObject === false) {
                  	return node;
                  } else {
                  	return _parseToObject(node);
                  }
               };

               var _getWidgetInstancesByDef = function(def, dataDoc, pageId) {
                  if (!def) return null;
                  if (lang.isArray(def)) {
                     def = def[0];
                  }

                  pageId = pageId || win.WidgetPlacementConfig.pageId || win.WidgetPlacementConfig.defaultPageId;
                  def = def.defId || def;

                  var nodes = null;
                  if (has("ie-native-mode") || _isIE11) {
                     nodes = widgetPlacementConfig.getInstancesByDefId(def, pageId);
                  } else {
                     var doc = dataDoc || win.WidgetPlacementConfig.widgetConfigXMLDocument,
                         exp = INST_NODE_PATH_BY_DEFIDREF.replace('%PAGE_ID%', pageId).replace('%DEF_ID%', def);
                     nodes = xpath.selectNodes(exp, doc);
                  }

                  return array.map(nodes, _parseToObject);
               };

               var _getWidgetDefByInstance = function(instance, doc, pageId) {
                  if (!instance) return null;
                  if (lang.isArray(instance)) {
                     instance = instance[0];
                  }

                  pageId = pageId || win.WidgetPlacementConfig.pageId || win.WidgetPlacementConfig.defaultPageId;
                  doc = doc || win.WidgetPlacementConfig.widgetConfigXMLDocument;
                  instance = (lang.isString(instance) ? _getWidgetInstance(instance, doc, pageId) : instance);

                  var defId = (instance ? instance['defIdRef'] : null);
                  return _getWidgetDef(defId, doc);
               };

               var _getPageWidgetInstances = function(pageId, dataDoc, resourceSubType) {
                  pageId = pageId || win.WidgetPlacementConfig.pageId || win.WidgetPlacementConfig.defaultPageId;

                  var nodes = null;
                  if (has("ie-native-mode") || _isIE11) {
                     nodes = widgetPlacementConfig.getInstances(pageId);
                  } else {
                     var doc = dataDoc || win.WidgetPlacementConfig.widgetConfigXMLDocument,
                         exp = PAGE_INST_NODES_PATH.replace('%PAGE_ID%', pageId);

                     if (resourceSubType) {
                        exp = exp.replace('%LAYOUT_OPTIONS%', '[@resourceSubType="%TYPE%"]').replace('%TYPE%', resourceSubType);
                     } else {
                        exp = exp.replace('%LAYOUT_OPTIONS%', '');
                     }

                     nodes = xpath.selectNodes(exp, doc);
                  }

                  return array.map(nodes, _parseToObject);
               };

               var _getAllWidgetDefs = function(dataDoc) {
                  var nodes = null;
                  if (has("ie-native-mode") || _isIE11) {
                     nodes = widgetPlacementConfig.getDefinitions();
                  } else {
                     var doc = dataDoc || win.WidgetPlacementConfig.widgetConfigXMLDocument;
                     nodes = xpath.selectNodes(ALL_DEF_NODES_PATH, doc);
                  }

						var distinctWidgetDef = {};
                  var result = array.map(nodes, _parseToObject);
                  result = array.filter(result, function(def) {
                     if (!def || !def.defId || distinctWidgetDef[def.defId]) {
                        return false;
                     } else {
                        distinctWidgetDef[def.defId] = true;
                        return true;
                     }
                  });

                  return result;
               };

               var _addWidgetInstance = function(instance, doc, pageId, hide) {
                  if (!instance) return false;

                  doc = doc || win.WidgetPlacementConfig.widgetConfigXMLDocument;
                  pageId = pageId || win.WidgetPlacementConfig.pageId || win.WidgetPlacementConfig.defaultPageId;

                  var widgetInstanceNode = null;
                  if (hide) {
                  	var instanceId = instance.instanceId || instance;
                  	if (!instanceId) return false;

                     widgetInstanceNode = _getWidgetInstance(instanceId, doc, pageId, false);
                     if (!widgetInstanceNode) return false;
                  } else {
                  	if (!instance.defIdRef || !instance.uiLocation) return false;

                     var node = null;
                     if (has("ie-native-mode") || _isIE11) {
                        node = widgetPlacementConfig.getPageById(pageId);
                     } else {
                        var exp = PAGE_PATH.replace('%PAGE_ID%', pageId);
                        node = xpath.selectSingleNode(exp, doc);
                     }

                     if (!node) {
                        return false;
                     }

                     var namespaceURI = doc.documentElement.namespaceURI;
                     if (typeof doc.createElementNS === 'function') {
                        widgetInstanceNode = doc.createElementNS(namespaceURI, 'widgetInstance');
                     } else { // IE fallback
                        widgetInstanceNode = doc.createNode(1, 'widgetInstance', namespaceURI);
                     }
                     widgetInstanceNode.setAttribute('defIdRef', instance.defIdRef);
                     if (instance.instanceId) {
                        widgetInstanceNode.setAttribute('instanceId', instance.instanceId);
                     }
                     widgetInstanceNode.setAttribute('uiLocation', instance.uiLocation);
                     node.appendChild(widgetInstanceNode);
                  }

						widgetInstanceNode.setAttribute('enabled', 'true');
                  return true;
               };

               var _removeWidgetInstance = function(instanceId, doc, pageId, unhide) {
                  if (!instanceId) return false;

                  pageId = pageId || win.WidgetPlacementConfig.pageId || win.WidgetPlacementConfig.defaultPageId;

                  var widgetInstanceNode = _getWidgetInstance(instanceId, doc, pageId, false);
                  if (!widgetInstanceNode) return false;

                  if (unhide) {
                     widgetInstanceNode.setAttribute('enabled', 'false');
                  } else {
                     widgetInstanceNode.parentNode.removeChild(widgetInstanceNode);
                  }

                  return true;
               };

               var _withLayoutInfo = function(forceRefresh, errorHandler) {
                  var promise = new Deferred(), url;

                  if (!win.WidgetPlacementConfig.widgetConfigXMLDocument || true === forceRefresh || true === win.staleXMLConfig) {
                     url = win.WidgetPlacementConfig.layoutInfoUrl;
                     if (!win.staleXMLConfig)
                        url += '&lastMod=' + win.WidgetPlacementConfig.lastMod;

                     if ('undefined' !== typeof win.WidgetPlacementConfig.needsMigration) {
                        if (win.WidgetPlacementConfig.needsMigration == true) {
                           // Used by server to decide whether to use old overview 
                           // layout or not for Communities
                           url += '&needsMigration=true'; 
                        }
                     }

                     // TODO: unify logging invocation
                     logger.debug('Using URL:' + url);

                     xhr.get({
                        url: url,
                        handleAs: 'xml',
                        sync: true,
                        load: function (response) {
                           win.WidgetPlacementConfig.widgetConfigXMLDocument = response;
                           promise.resolve();
                        },
                        error: errorHandler || errorhandling.DefaultXHRErrorHandler
                     });

                     win.staleXMLConfig = false;
                  } else {
                     promise.resolve();
                  }

                  return promise;
               };

               var _resetLayoutInfo = function() {
                  win.WidgetPlacementConfig.widgetConfigXMLDocument = null;
               };

               var exports = {
                     getWidgetDef : _getWidgetDef,
                     getAllWidgetDefs : _getAllWidgetDefs,
                     getWidgetInstance : _getWidgetInstance,
                     getWidgetInstancesByDef : _getWidgetInstancesByDef,
                     getWidgetDefByInstance : _getWidgetDefByInstance,
                     getPageWidgetInstances : _getPageWidgetInstances,
                     addWidgetInstance : _addWidgetInstance,
                     removeWidgetInstance : _removeWidgetInstance,
                     withLayoutInfo : _withLayoutInfo,
                     resetLayoutInfo : _resetLayoutInfo
               };

               return exports;
            })());
      }

      lang.mixin(wp.utils, (function initCustomFuncs() {
         var _customFuncs = {
            filter : {
               canAddWidget : [],
               canRemoveWidget : [],
               isWidgetRemovalAccepted : []
            },
            callback : {
               addWidget : [],
               removeWidget : []
            },
            handler : {
               handleSearchRequest : []
            }
         };

         var _registerFunc = function(/* String */type, /* String */name, /* Function */func) {
            if (!name || !lang.isFunction(func)) {
               logger.debug('unable to register ' + type + ' "' + name + '"');
               return;
            }

            if (!lang.isArray(_customFuncs[type][name])) {
               logger.debug('registering a ' + type + ' "' + name + '" which is never defined before');
            }

            _customFuncs[type][name].push(func);
         };

         var _getFuncs = function( /* String */type, /* String */name) {
            if (!name || !lang.isArray(_customFuncs[type][name])) {
               logger.debug('no ' + type + ' with name "' + name + '" is found');
               return null;
            }

            return _customFuncs[type][name];
         };

         var _clearFuncs = function( /* String */type, /* String */name) {
            if (!name || !lang.isArray(_customFuncs[type][name])) {
               logger.debug('no ' + type + ' is about to be cleared with name "' + name + '"');
               return;
            }

            _customFuncs[type][name] = [];
         };

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function registerFilter
          * @param {string} name
          * @param {Function} func
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function registerCallback
          * @param {string} name
          * @param {Function} func
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function registerHandler
          * @param {string} name
          * @param {Function} func
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function getFilters
          * @param {string} name
          * @returns {Function[]}
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function getCallbacks
          * @param {string} name
          * @returns {Function[]}
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function getHandlers
          * @param {string} name
          * @returns {Function[]}
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function clearFilters
          * @param {string} name
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function clearCallbacks
          * @param {string} name
          */

         /**
          * 
          * @memberof ic-core.WidgetPlacement
          * @function clearHandlers
          * @param {string} name
          */
         var exports = {
            // register custom functions
            registerFilter : lang.partial(_registerFunc, 'filter'),
            registerCallback : lang.partial(_registerFunc, 'callback'),
            registerHandler : lang.partial(_registerFunc, 'handler'),
            // get custom functions
            getFilters : lang.partial(_getFuncs, 'filter'),
            getCallbacks : lang.partial(_getFuncs, 'callback'),
            getHandlers : lang.partial(_getFuncs, 'handler'),
            // clear custom functions
            clearFilters : lang.partial(_clearFuncs, 'filter'),
            clearCallbacks : lang.partial(_clearFuncs, 'callback'),
            clearHandlers : lang.partial(_clearFuncs, 'handler'),
         };

         return exports;
      })());

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function showColumn
       * @param {string} column The column to show
       */
      wp.showColumn = function(column) {
         if (lang.isString(column))
            column = [column];
         if (!column || !column.length)
            return;

         array.forEach(column, function(col) {
            if (wp.uiLocations[col]) {
               wp.uiLocations[col].hidden = false;
               utilities.show('widget-container-' + col, false, false, true);
            }
         });
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function hideColumn
       * @param {string} column The column to hide
       */
      wp.hideColumn = function(column) {
         if (lang.isString(column))
            column = [column];
         if (!column || !column.length)
            return;

         array.forEach(column, function(col) {
            if (wp.uiLocations[col]) {
               wp.uiLocations[col].hidden = true;
               utilities.hide('widget-container-' + col, false, true);
            }
         });
      };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function replaceHash
       */
      
      wp.replaceHash = function(hashValue)
      {
    	  history.replaceState(null, null, window.location.href.split("#")[0]+'#'+hashValue);
      };
      
      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function changeHash
       * @param {string} hashValue
       */
      wp.changeHash = function(hashValue) {
    	  win.location.hash = hashValue;
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
         if (wp.registerCloseViewFunction != null) {
            wp.registerCloseViewFunction();
            wp.registerCloseViewFunction = null;
         }
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
       * @param {string|Object} widgetInstance
       * @param {Object} [additionalParameters]
       */
      wp.switchView = function(widgetDef, widgetInstance, additionalParameters) {
         wp.closeOtherViews();
         wp.registerCloseViewFunction = wp.closeSwitchView;

         var widgetInstanceId = widgetInstance;
         if (widgetInstance && lang.isObject(widgetInstance)) {
         	widgetInstanceId = widgetInstance.instanceId || widgetInstance.defIdRef;
         }
         if (!widgetInstanceId && widgetDef && lang.isObject(widgetDef)) {
            widgetInstanceId = widgetDef.defId;
         }

         wp.destroyWidget(widgetInstanceId, null, false, true);
         if (wp.currentFullpageWidgetInstanceId != null)
            wp.destroyWidget(wp.currentFullpageWidgetInstanceId, null, false, true);

         // TODO don't have to this anymore swhich we use closeOtherViews();
         wp.destroyWidgetContainer('fullpage');

         for (uiLocation in wp.uiLocations) {
            wp.hideColumn(uiLocation);
         }

         array.forEach(win.WidgetPlacementConfig.hideElements, function(hideElement) {
            utilities.hide(hideElement, false, true);
         });

         _highlightNavItem(widgetInstanceId);
         
         topic.publish(events.WIDGET_ENTERED_FULLPAGE_MODE_EVENT, widgetInstanceId);

         // give a chance for previous widget to load completely
         win.setTimeout(function() {
            utilities.show('widget-container-fullpage', false, false, true);
            wp.getWidgetDocAndRenderWidget(null, widgetDef, widgetInstance, 'fullpage', 'fullpage', 'skinless', false);
            wp.currentFullpageWidgetInstanceId = widgetInstanceId;
            wp.isInWidgetFullpageMode = true;
            window.scrollTo({ top: 0 });
            var title = wp.utils.getWidgetName(widgetDef, widgetInstance);
            wp.setTitle(title);
         }, wp.currentFullpageWidgetInstanceId == null ? 200 : 0);  
      };
      win.switchView = function(widgetDef, widgetInstanceId, additionalParameters, overwriteDefaultNavBarOverviewLink, addState) {
         kernel.deprecated('window.switchView()', 'use switchView() in ic-core/WidgetPlacement instead', '5.5');
         wp.switchView(widgetDef, widgetInstanceId, additionalParameters);
      };

      // only working for nav items
      var _getTitleFromEle = function(/*Element*/ navItemEle) {
         var navItemId = domAttr.get(navItemEle, 'id');
         var indexOfNavSuffix = navItemId.indexOf('_navItem');
         if (indexOfNavSuffix !== -1) {
            var instanceId = navItemId.substring(0, indexOfNavSuffix),
                widgetInstance = wp.utils.getWidgetInstance(instanceId),
                widgetDef = wp.utils.getWidgetDefByInstance(widgetInstance),
                title = wp.utils.getWidgetName(widgetDef, widgetInstance);

            if (title) {
               return title;
            }
         }

         var node = query('a', navItemEle);
         if (node.length) {
            return lang.trim(node[0][(has('ie') ? 'innerText' : 'textContent')]);
         }

         logger.warn('Unable to get proper title from navitem: ', navItemEle);
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
         // Only update title if running on Communities controlled page
         if (_isCommunitiesPage && win.ic_comm_communityName) {
            var titleString = '${0} - ${1}';
            var params = [title, win.ic_comm_communityName];
            win.document.title = string.substitute(titleString, params);
         }
      };
      win.setTitle = function(el) {
         kernel.deprecated('window.setTitle()', 'use setTitle() in ic-core/WidgetPlacement instead', '5.5');
         try {
            var title = _getTitleFromEle(el);
            if (title) {
               wp.setTitle(title);
            }
         } catch (e) { /* do nothing */ }
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
         // FIXME: remove hack when a final solution for widgetbundles is found
         widgetMessages = widgetMessages || kernel.i18n.getLocalization('lconn.core.config', 'widgetbundles');

         var prefix = widgetDef.bundleRefId || 'lc_default';
         var attributeValue = widgetDef[attributeName];
         var resourceBundle = widgetMessages || {};

         // first check to see if it's in the root resource bundle
         var value = resourceBundle[attributeValue];

         // if it's not in there, check the one defined in the prefix
         if (typeof value !== 'string' && resourceBundle[prefix]) {
            value = resourceBundle[prefix][attributeValue];
         }

         // all else failed, returne the attribute value itself.
         if (typeof value !== 'string') {
            value = attributeValue;
         }

         return value;
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
         // FIXME: remove hack when a final solution for widgetbundles is found
         widgetMessages = widgetMessages || kernel.i18n.getLocalization('lconn.core.config', 'widgetbundles');

         var prefix = widgetDef.bundleRefId || 'lc_default';
         var resourceBundle = widgetMessages[prefix];
         if (!resourceBundle) {
            logger.log('unable to find resource bundle for "' + prefix + '"');
            resourceBundle = {};
         }
         var value = resourceBundle[stringId];
         return ((value === undefined) ? stringId : value);
      };
      win.getResourcedStringById = function(widgetDef, stringId) {
         kernel.deprecated('window.getResourcedStringById()', 'use getResourcedStringById() in ic-core/WidgetPlacement instead', '5.5');
         return wp.utils.getResourcedStringById(widgetDef, stringId);
      };

      var _getResourcedForItem = function(widgetDef, attributeName) {
         // FIXME: remove hack when a final solution for widgetbundles is found
         widgetMessages = widgetMessages || kernel.i18n.getLocalization('lconn.core.config', 'widgetbundles');

         var prefix = widgetDef.bundleRefId || 'lc_default';
         var attributeValue = widgetDef[attributeName];
         var resourceBundle = widgetMessages || {};

         // first check to see if it's in the root resource bundle
         var value = resourceBundle[attributeValue];

         // if it's not in there, check the one defined in the prefix
         if (!value && resourceBundle[prefix]) {
            value = resourceBundle[prefix][attributeValue];
         }

         // all else failed, returne the attribute value itself.
         if (!value) {
            value = attributeValue;
         }

         return value;
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
         var widgetName = null;

         if (widgetDef) {
            widgetName = _getResourcedForItem(widgetDef, 'defId');
            if (widgetName && lang.isObject(widgetName)) {
               widgetName = widgetName[mode] || widgetName['default'];
            }
         }
         return widgetName;
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
         if ('undefined' === typeof inline)
            inline = false;
         return HTMLUtil.escapeInlineText(wp.utils.getWidgetName(widgetDef, widgetInstance, mode), inline);
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
         var widgetName = null;

         // Look up client assigned name
         if (widgetInstance) {
            var defaultWidgetName = widgetInstance.defaultTitle;
            if (!defaultWidgetName) {
               widgetName = widgetInstance.title;
            }
         }

         // Otherwise look up default name
         if (widgetName == null) {
            widgetDef = widgetDef || wp.utils.getWidgetDefByInstance(widgetInstance);
            widgetName = wp.utils.getDefaultWidgetName(widgetDef, mode);
         }
         return widgetName;
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

         var labels = [];
         var labelIds = [];
         var links = [];
         var ii;
         var lotusNavBar = getNavBar();
         if (lotusNavBar == null)
            return;

         var showFullPageViewLinkInNavBar = widgetDef.showFullPageViewLinkInNavBar;
         if ((showFullPageViewLinkInNavBar != null && showFullPageViewLinkInNavBar == 'true') || _modeSupported('fullpage', widgetDef)
               || (navBarLink != null && navBarLink != '')) {
            if (navBarLinkText != null && navBarLinkText != '') {
               labelIds = navBarLinkText.split(',');
               for (ii = 0; ii < labelIds.length; ii++) {
                  labels[ii] = wp.utils.getResourcedStringById(widgetDef, labelIds[ii]);
               }
            }
            else {
                labels[0] = wp.utils.getWidgetName(widgetDef, widgetInstance);
            }

            if (navBarLink != null && navBarLink != '') {
               links = navBarLink.split(',');
            }

            var defId = widgetDef.defId;
            var instanceId = widgetInstance.instanceId || defId;

            for (ii = 0; ii < labels.length; ii++) {
               var li = domConstruct.create('li', {
                  id : instanceId + '_navItem' + ((ii === 0) ? '' : ii),
                  'role' : 'button',
                  'aria-pressed' : 'false',
                  'tabindex' : -1,
                  // Remember uiLocation(column) for inserting other widgets.
                  'uiLocation' : widgetInstance.uiLocation,
                  'widgetdefid' : defId
               });

               var aElem = domConstruct.create('a', {
                  textContent : labels[ii],
                  'tabindex' : -1
               });

               if (navBarLink != null && navBarLink != '') {
                  if (links[ii] == null) {
                     links[ii] = links[0];
                  }
                  win.WidgetPlacementConfig.params['widgetInstanceId'] = instanceId;
                  var substitutedNavBarLink = _getI18nString(links[ii]);
                  domAttr.set(aElem, 'href', substitutedNavBarLink);
               }
               else {
                  domAttr.set(aElem, 'href', 'javascript:void(0);');
                  var onclickHandler = function() {
                     changeHash('fullpageWidgetId=' + instanceId);
                     return false;
                  };
                  on(aElem, 'click', onclickHandler);
               }

               li.appendChild(aElem);

               if (defId === 'StatusUpdates') {
                  var refElem = dom.byId('RecentUpdates_navItem');
                  lotusNavBar.insertBefore(li, refElem.nextSibling);
               }else if (defId === 'Highlights' && typeof gatekeeperConfig != "undefined" && typeof gatekeeperConfig['communities-highlights-as-overview'] != "undefined" && gatekeeperConfig['communities-highlights-as-overview'] ){
            	  //CONNPLAN-1649:- Display Highlights as a first tab in community 
            	  //CONNPLAN-1734:- Only set Highlights as a landing page for community if Gatekeeper community_template flag is set
            		var refElem = lotusNavBar.firstElementChild;
            		lotusNavBar.insertBefore(li, refElem);
               }else if (win.WidgetPlacementConfig.insertBeforeNavBarId) {
                  lotusNavBar.insertBefore(li, dom.byId(win.WidgetPlacementConfig.insertBeforeNavBarId));
               } 
                else {
                  domConstruct.place(li, wp.getInsertionPoint(lotusNavBar, li), 'after');
               }
               if (selected == true) {
                  var selectedWidget = win.WidgetPlacementConfig.NavBarSelectedMenuItem;
                  var selectedLink = 0;
                  var idx = selectedWidget.indexOf('_');
                  if (idx > 0) {
                     selectedLink = selectedWidget.substring(idx + 1);
                  }
                  if (ii == selectedLink) {
                     domClass.add(li, 'lotusSelected');
                  }
               }
            }
         }
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
         if (widgetDef == null)
            return false;

         var loginRequired = widgetDef.loginRequired;
         if (loginRequired == 'true' && !config.userLoggedIn)
            return false;

         var resourceOwnerWidget = widgetDef.resourceOwnerWidget;
         if (resourceOwnerWidget === 'true' && !canPersonalize)
            return false;

         var isHideWidgetForMyProfile = widgetDef.hideWidgetForMyProfile,
             keyValue = wp.getUserProfileOverrideProperty('key');
         if (isHideWidgetForMyProfile === 'true' && config.userLoggedIn && config.params.resourceId == keyValue) {
            return false;
         }

         // check any acl requirement for this widget
         var requireAcl = widgetDef.requireAcl;
         if (requireAcl != null && requireAcl != '') {
            var ok = false;
            try {
               for (var ii = 0; ii < config.enabledPermissions.length; ii++) {
                  if (config.enabledPermissions[ii] == requireAcl) {
                     ok = true;
                     break;
                  }
               }
            }
            catch (e) {
            }

            if (!ok)
               return false;
         }

         if (widgetInstance != null && wp.onlyFullPageWidgetLoaded != true && !showHiden) {
            var enabled = widgetInstance.enabled;
            if (enabled === 'false')
               return false;
         }

         var prerequisite = widgetDef.prerequisite;
         if (prerequisite != null && prerequisite != '' && config.availableServices != null) {
            var services = prerequisite.split(' ');
            for (var x = 0; services.length != null && x < services.length; x++) {
               if (config.availableServices[services[x]] == null || config.availableServices[services[x]] == false)
                  return false;
            }
         }

         // Added to check whether a widget depends on a certain feature
         var requiredFeatures = widgetDef.requiredFeatures;
         if (requiredFeatures != null && requiredFeatures != '' && typeof config.enabledFeatures !== 'undefined'
               && config.enabledFeatures != null && config.enabledFeatures != '') {

            if (win.WidgetPlacementConfig.debug)
               console.info('enabledFeatures = ' + config.enabledFeatures);

            var enabledFeaturesArray = config.enabledFeatures.split(new RegExp('[, \u3000]{1}', 'g'));
            var i = 0, len = enabledFeaturesArray.length;
            var requiredFeatureEnabled = false;

            for (i = 0; i < len; i++) {
               if (enabledFeaturesArray[i] == requiredFeatures) {
                  requiredFeatureEnabled = true;
                  break;
               }
            }

            if (!requiredFeatureEnabled) {
               logger.debug('The user doesn\'t have the required feature, returning false');
               return false;
            }
         }

         var defId = widgetDef.defId;
         if (config.disabledWidgets && config.disabledWidgets[defId]) {
            logger.debug('Widget ' + defId + ' is disabled in this context.');
            return false;
         }

         if (wp.utils.getFilters('canAddWidget')) {
            var params = {
               WidgetPlacementConfig : config,
               canPersonalize : canPersonalize,
               showHidden : showHiden
            };
            var result = array.every(wp.utils.getFilters('canAddWidget'), function(filter) {
               return filter(widgetDef, widgetInstance, params);
            });
            if (!result)
               return false;
         }

         return true;
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
         var widgetInstance = wp.utils.getWidgetInstance(instanceId);
         if (!widgetInstance) {
            // TODO: unify logging invocation
            console.log('lconn.core.WidgetPlacementCRE.removeWidget: Unable to find widget instance for instanceId = ' + widgetInstanceId);
            return false;
         }

         if (wp.utils.getFilters('canRemoveWidget')) {
            var widgetDef = wp.utils.getWidgetDefByInstance(widgetInstance);
            var params = {
               removeWidgetData : removeWidgetData
            };
            var result = array.every(wp.utils.getFilters('canRemoveWidget'), function(filter) {
               return filter(widgetDef, widgetInstance, params);
            });
            if (!result)
               return false;
         }

         return true;
      };
      win.canRemoveWidget = function(instanceId, removeWidgetData) {
         kernel.deprecated('window.canRemoveWidget()', 'use canRemoveWidget in ic-core/WidgetPlacement instead', '5.5');
         return wp.canRemoveWidget(instanceId, removeWidgetData);
      };

      wp.requestRemovalConfirmation = function(prompt, widgetInstanceId, removeData) {
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
            if (wp.utils.getFilters('isWidgetRemovalAccepted')) {
               array.forEach(wp.utils.getFilters('isWidgetRemovalAccepted'), function(filter) {
                  filter(widgetInstanceId, removeData, handleResult);
               });
            }
         } else {
            promise.resolve();
         }

         return promise;
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
         array.forEach(wp.loadOrder, function(NodeId) {
            if (NodeId != null && NodeId.uiLocation == containerId)
               wp.destroyWidget(NodeId.instanceId, NodeId.uiLocation, false);
         });
         var WidgetContainer = dom.byId('widget-container-' + containerId);
         if (WidgetContainer && WidgetContainer.innerHTML)
            WidgetContainer.innerHTML = '';
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
         _highlightNavItem(null);
      };
      win.highlightOverviewLink = function() {
         kernel.deprecated('window.highlightOverviewLink()', 'use highlightOverviewLink() in ic-core/WidgetPlacement instead', '5.5');
         wp.highlightOverviewLink();
      };

	  /**
       * Subscribe to all common widget events.
       *
       * @memberof ic-core.WidgetPlacement
       * @function subscribeToWidgetEvents
       * @param {object context} this pointer
       * @param {function} eventHandler
       */
	  wp.subscribeToWidgetEvents = function(thisPtr, eventHandler) {
		  var addCtlr, remCtlr, movCtlr, rnmCtlr, fpCtlr;

		  // Add / unhide widget
		  addCtlr = topic.subscribe(events.WIDGET_ADDED_EVENT, function(nodeId) {
		  	  eventHandler.call(thisPtr, events.WIDGET_ADDED_EVENT, nodeId);
		  });

		  // Remove / hide widget
		  remCtlr = topic.subscribe(events.WIDGET_REMOVED_EVENT, function(nodeId) {
		  	  eventHandler.call(thisPtr, events.WIDGET_REMOVED_EVENT, nodeId);
		  });

		   // Rename widget
		  rnmCtlr = topic.subscribe(events.WIDGET_RENAMED_EVENT, function(nodeId) {
			  eventHandler.call(thisPtr, events.WIDGET_RENAMED_EVENT, nodeId);
		  });

		  // Entered fullpage mode
		  fpCtlr = topic.subscribe(events.WIDGET_ENTERED_FULLPAGE_MODE_EVENT, function(nodeId) {
			  eventHandler.call(thisPtr, events.WIDGET_ENTERED_FULLPAGE_MODE_EVENT, nodeId);
		  });
	  };

	  /**
       * Subscribe to fullpage widget mode events.
       *
       * @memberof ic-core.WidgetPlacement
       * @function subscribeToFullPageModeEvents
       * @param {function} eventHandler
       */
	  wp.subscribeToFullPageModeEvents = function(eventHandler) {
		  var fpCtlr;

		  // Entered fullpage mode
		  fpCtlr = topic.subscribe(events.WIDGET_ENTERED_FULLPAGE_MODE_EVENT, function(nodeId) {
			  eventHandler.call(events.WIDGET_ENTERED_FULLPAGE_MODE_EVENT, nodeId);
		  });
	  };

	  /**
       * Subscribe to overview page reloaded events.
       *
       * @memberof ic-core.WidgetPlacement
       * @function subscribeToOverviewPageReloadedEvents
       * @param {function} eventHandler
       */
	  wp.subscribeToOverviewPageReloadedEvents = function(eventHandler) {
		  topic.subscribe(events.OVERVIEW_PAGE_RELOADED_EVENT, function() {
			  eventHandler.call(events.OVERVIEW_PAGE_RELOADED_EVENT);
		  });
	  };

      /**
       * 
       * @memberof ic-core.WidgetPlacement
       * @function isOverviewLinkSelected
       * @returns {Boolean} 
       */
      wp.isOverviewLinkSelected = function() {
         var retval = false;
         if (win.WidgetPlacementConfig.navBarOverViewElementId != null) {
            var navBarItem = dom.byId(win.WidgetPlacementConfig.navBarOverViewElementId);
            if (navBarItem != null) {
               retval = domClass.contains(navBarItem, 'lotusSelected');
            }
         }
         return retval;
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
         var widgetDefId = widgetDef.defId;
         var widgetInstanceId = widgetInstance.instanceId || widgetDefId;

         if (bDestroyTabContainerFirst)
            wp.destroyWidgetContainer(win.WidgetPlacementConfig.TempWidgetContainerDomId, false);

         wp.destroyWidget(widgetInstanceId, null, false, true);

         wp.getWidgetDocAndRenderWidget(widgetDefId,
            widgetDef,
            widgetInstanceId,
            win.WidgetPlacementConfig.TempWidgetContainerDomId,
            widgetMode,
            'skinless',
            false,
            false,
            attributesMap);

         if (intialDisplayDomId != null)
            utilities.hide(intialDisplayDomId, false, true);

         // a11y. If not role is set, make it a tab
         // if no map, create a blank array
         if (typeof attributesMap == 'undefined' || attributesMap == null)
            attributesMap = [];

         // if it's an object but not an array, make the map an array with just
         // that object.
         if (lang.isObject(attributesMap) && !lang.isArray(attributesMap))
            attributesMap = [attributesMap];

         // let's see if the role has already been set in the map
         var sRole = 'tab';
         array.forEach(attributesMap, function(attr) {
            try {
               if (attr && attr['role']) {
                  sRole = attr['role'];
               }
            }
            catch (ee) {
            }
         });

         var liElements = query('li', dom.byId(TabContainerDomId));
         array.forEach(liElements, function() {
            if (liElement.className != '')
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

            if (menuicon != null)
               domAttr.set(menuicon, 'tabIndex', '-1');
            query('a', liElement).forEach(function(node) {
               domAttr.set(node, 'tabIndex', '-1');
            });

            var tabLink = dom.byId(element + '_multiWidget');
            var holder = dom.byId(element + '_linkHolder');
            if (holder != null)
               holder.insertBefore(tabLink, holder.firstChild);
         });

         var selectedBarElem = dom.byId(widgetInstanceId + '_TabItem');
         if (selectedBarElem != null) {
            domClass.add(selectedBarElem, 'lotusSelected');
            domAttr.set(selectedBarElem, {
               tabindex : '0',
               'aria-selected' : 'true'
            });
            domClass.add(selectedBarElem, 'dijitTabContainerBottom-container');
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
         if (menuicon != null)
            dojoAttr.remove(menuicon, 'tabIndex');

         var tabLink = dom.byId(widgetInstanceId + '_multiWidget');
         var holder = dom.byId(widgetInstanceId + '_selectedLinkHolder');
         if (holder != null)
            holder.insertBefore(tabLink, holder.firstChild);
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
         if (win.WidgetPlacementConfig.userLoggedIn == false || win.WidgetPlacementConfig.userLoggedIn == null)
            return null;
         else {
            var propertyValue = null;

            if (win.widgetUserInfo != null) {
               var temp = widgetUserInfo[propertyName];
               if (temp == undefined || temp == 'undefined' || temp == null)
                  propertyValue = null;
               else
                  propertyValue = temp;
            }
            else if (win.WidgetPlacementConfig.userInfoXML == null) {
               var dojoLoadCallback = function(res) {
                  win.WidgetPlacementConfig.userInfoXML = res;
                  var temp = res.documentElement.getAttribute(propertyName);
                  if (temp == undefined || temp == 'undefined' || temp == null)
                     propertyValue = null;
                  else
                     propertyValue = temp;
               };
               var url = win.WidgetPlacementConfig.userInfoUrl;
               request(url, {
                  method : 'GET',
                  handleAs : 'xml',
                  sync : true,
               }).then(dojoLoadCallback, errorhandling.DefaultXHRErrorHandler);
            }
            else
               propertyValue = win.WidgetPlacementConfig.userInfoXML.documentElement.getAttribute(propertyName);

            return propertyValue;
         }
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
         win.WidgetPlacementConfig.handleModeExitExe = true;
         if (win.WidgetPlacementConfig.cancelCallBack != null && ignoreCallBack != true)
            win.WidgetPlacementConfig.cancelCallBack();

         array.forEach(win.WidgetPlacementConfig.hideElements, function(hideElement) {
            utilities.show(hideElement, false, false, true);
         });

         if (win.WidgetPlacementConfig.TabContainerDomId != null) {
            var parentHTMLNode = dom.byId(win.WidgetPlacementConfig.TabContainerDomId);
            var nodes = parentHTMLNode.childNodes;
            var temp = [];
            array.forEach(nodes, function(currentNode) {
               var currentNodeId = currentNode.id;
               if (typeof currentNodeId !== 'undefined' && currentNodeId != null && currentNodeId.indexOf('_TabItem') != -1
                     && !domClass.contains(currentNode, 'noRemove'))
                  temp.push(currentNode);
            });
            array.forEach(temp, function(currentNode) {
               currentNode.parentNode.removeChild(currentNode);
            });
         }

         if (win.WidgetPlacementConfig.TempWidgetContainerDomId != null)
            win.destroyWidgetContainer(win.WidgetPlacementConfig.TempWidgetContainerDomId);

         array.forEach(wp.loadOrder, function(NodeId) {
            if ( NodeId && dom.byId(NodeId.instanceId) )
               wp.refresh(NodeId.instanceId);
         });

         array.forEach(wp.uiLocations, function(uiLocation) {
            utilities.show('widget-container-' + uiLocation, false, false, true);
         });

         win.WidgetPlacementConfig.handleModeExitExe = null;
         win.WidgetPlacementConfig.firstWidget = null;
         win.WidgetPlacementConfig.isFullPageWidgetRendering = null;
         win.WidgetPlacementConfig.TempWidgetContainerDomId = null;
         win.WidgetPlacementConfig.TabContainerDomId = null;
         win.WidgetPlacementConfig.isTabbedFullPageWidgetRendering = null;

         highlightOverviewLink();
      };
      win.handleModeExit = function(ignoreCallBack) {
         kernel.deprecated('window.handleModeExit()','use handleModeExit() in ic-core/WidgetPlacement instead','5.5');
         wp.handleModeExit(ignoreCallBack);
      };
      // common code ends here

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
               logger.log('Skipping removal of Files widget since MediaGallery widget is present.');
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
         }
         catch (e) {
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

     if (!wp.aria) wp.aria = {};
      /**
       * @class ic-core.WidgetPlacement.aria.TabPanel
       * @extends ic-core.aria.TabPanel
       */
      wp.aria.TabPanel = declare('lconn.core.WidgetPlacement.aria.TabPanel', TabPanel, /** @lends ic-core.WidgetPlacement.aria.TabPanel.prototype */
      {
         selectedClassname : 'lotusSelected',
         connectToFirstLink : false,
         // connect the first link to the parent button
         selIdx : 0,
         // select the first tab by default
         _prevIdx : 0,
         // holds the previously selected tab

         constructor : function() {
            this.inherited(arguments);
            var ai = this.allItems;
            var si = this.selIdx;

            // loop through all the items and prep them
            array.forEach(ai, lang.hitch(this, function(node, idx) {
               domStyle.set(node, {
                  cursor : 'pointer'
               });

               this._connects.push(on(node, 'click', lang.hitch(this, function(event) {
                  this.selIdx = idx;
                  this._setItemVisuals();
               })));

               if (this.connectToFirstLink) {
                  try {
                     // if we're already connecting to the first link, we don't
                     // need to tab to it.
                     domAttr.set(query('a', node)[0], 'tabindex', '-1');
                  }
                  catch (ee) {
                  }

                  this._connects.push(on(node, 'click', lang.hitch(this, function(event) {
                     try {
                        var item = query('a', node)[0];
                        if (win.document.createEvent) {
                           var evt = win.document.createEvent('HTMLEvents');
                           evt.initEvent('click', false, true);
                           item.dispatchEvent(evt);
                        }
                        else { // IE
                           item.fireEvent('onclick');
                        }
                     }
                     catch (e) {
                     }
                  })));
               }
            }));

            // now select the first one...
            this._selectItem(this.selIdx, true);
            this._activate(ai[this.selIdx]);
         },

         /**
          * Activates an item by firing a click event
          */
         _activate : function(item, forceLink) {
            if (forceLink || !this.connectToFirstLink) {
               return this.inherited(arguments);
            }
            else {
               return this._activate((query('a', item)[0]), true);
            }
         },

         _setItemVisuals : function() {
            var ai = this.allItems;
            var si = this._prevIdx;

            if (this.selIdx != this._prevIdx) {
               domClass.remove(ai[this._prevIdx], this.selectedClassname);
               domAttr.set(ai[this._prevIdx], {
                  'tabindex' : '-1',
                  'aria-selected' : 'false'
               });
            }

            domClass.add(ai[this.selIdx], this.selectedClassname);
            domAttr.set(ai[this.selIdx], {
               'tabindex' : '0',
               'aria-selected' : 'true'
            });

            this._prevIdx = this.selIdx;
         },

         _selectItem : function(si, bSkipFocus) {
            if (typeof bSkipFocus === 'undefined')
               bSkipFocus = false;
            this._prevIdx = si;
            this._setItemVisuals();

            this.inherited(arguments);

            if (!bSkipFocus) {
               this.allItems[this.selIdx].focus();
            }
         }
      });

      /**
       * @class ic-core.WidgetPlacement.aria.Toolbar
       * @extends ic-core.aria.Toolbar
       */
      wp.aria.Toolbar = declare('lconn.core.WidgetPlacement.aria.Toolbar', Toolbar, /** @lends ic-core.WidgetPlacement.aria.Toolbar.prototype */
      {
         selectedClassname : 'lotusSelected',
         connectToFirstLink : true,
         // connect the first link to the parent button
         selIdx : 0,
         // select the first button by default
         _oldIdx : 0,
         // previously selected item
         changeSelectOnClick : true,
         // flag to see if we should change the selection to the new node when
         // clicking on anchor

         setItemIdx : function(node, idx) {
            if (domAttr.get(node, 'role') === 'button') {
               domAttr.set(node, 'itemidx_', idx);
            }
            else {
               if (node.parentNode) {
                  return this.setItemIdx(node.parentNode, idx);
               }
            }
         },
         getItemIdx : function(node) {
            ret = this.selIdx;
            if (domAttr.get(node, 'itemidx_') != null) {
               ret = domAttr.get(node, 'itemidx_');
            }
            else {
               if (node.parentNode) {
                  return this.getItemIdx(node.parentNode);
               }
            }
            return ret;
         },

         constructor : function() {
            if (typeof win.lconncoreWidgetPlacementariaToolbar !== 'undefined') {
               win.lconncoreWidgetPlacementariaToolbar.destroy();
            }
            // FIXME: do not write to the global namespace
            win.lconncoreWidgetPlacementariaToolbar = this;

            this.inherited(arguments);
            if (this.connectToFirstLink) {
               var ai = this.allItems;
               var si = this.selIdx;

               // loop through all the items and prep them
               array.forEach(ai, lang.hitch(this, function(node, idx) {
                  // Reset the state of all items to off/unpressed. We'll set
                  // the default one later.
                  // Also, set the idx to an atribute of the node so it can be
                  // looked up later.
                  this.setItemIdx(node, idx);
                  if (domClass.contains(node, this.selectedClassname)) {
                     this.selIdx = idx;
                  }
                  this._pressItem(idx, false);

                  // if we're already connecting to the first link, we don't
                  // need to tab to it or anything.
                  var linkNode = query('a', node)[0];
                  domAttr.set(linkNode, 'tabindex', '-1');
                  domAttr.remove(linkNode, 'aria-pressed');
                  domClass.remove(linkNode, this.selectedClassname);

                  if (this.changeSelectOnClick) {
                     this._connects.push(on(linkNode, 'click', lang.hitch(this, function(event) {
                        var newIdx = this.getItemIdx(linkNode);
                        this._pressItem(this._oldIdx, false);
                        this._pressItem(newIdx, true);
                        this._oldIdx = newIdx;
                     })));
                  }

                  this._connects.push(on(node, 'keypress', function(event) {
                     var code = null;
                     if (!event)
                        event = win.event;

                     if (event) {
                        code = event.keyCode || event.charCode;
                     }

                     if (code === keys.SPACE || code === keys.ENTER) {
                        try {
                           // click on the first link
                           var item = query('a', node)[0];
                           if (item) item.click();
                           event.preventDefault(), event.stopPropagation();
                        }
                        catch (ee) {
                        }
                     }
                  }));
               }));

               // now select the first one...
               this._pressItem(this.selIdx, true);
               this._oldIdx = this.selIdx;
            }
         },

         // make sure the tab index is set properly
         _kickIn : function(item, i) {
            this.inherited(arguments);
            if (this.connectToFirstLink) {
               domAttr.set(item, 'tabindex', '0');
            }
         },

         // checks to see if the dom element or any of it's parents are hidden
         _nodeIsHidden : function(node) {
            var bHidden = false;
            try {
               while (node) {
                  if (domStyle.get(node, 'display') === 'none') {
                     bHidden = true;
                     break;
                  }
                  node = node.parentNode;
               }
            }
            catch (ee) {
            }
            return bHidden;
         },

         // function to set/clear pressed state
         _pressItem : function(idx, yn) {
            if (idx >= 0) {
               var el = this.allItems[idx];
               if (el) {
                  if (yn) {
                     domClass.add(el, this.selectedClassname);
                     domAttr.set(el, {
                        'aria-pressed' : 'true',
                        'tabindex' : '0'
                     });

                     // Defect 87720: Setting focus on the title bar because
                     // Jaws 14 will not read the screen
                     // if focus is in the left navigation.
                     var focusEl = dom.byId('lotusTitleBar');
                     // Defect 88922: We should only be setting the focus if the
                     // nav is visible.
                     if (focusEl && !this._nodeIsHidden(el)) {
                        focusEl.focus();
                     }

                     var title = _getTitleFromEle(el);
                     if (title) {
                        wp.setTitle(title);
                     }
                  }
                  else {
                     domClass.remove(el, this.selectedClassname);
                     domAttr.set(el, {
                        'aria-pressed' : 'false',
                        'tabindex' : '-1'
                     });
                  }
               }
            }
         }
      });
      
      lang.setObject('lconn.core.WidgetPlacement', wp);

      return wp;
   });
