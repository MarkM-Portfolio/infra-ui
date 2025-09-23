define([
   'dojo/_base/array',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/_base/xhr',
   'dojo/Deferred',
   'dojo/has',
   '../configs',
   '../../config/features',
   '../../errorhandling',
   '../../util/widgetPlacementConfig',
   '../../xpath',
   'ic-gadget/util/trace'
], function(array, lang, windowModule, xhr, Deferred, has, wpConfig, has, 
   errorhandling, widgetPlacementConfig, xpath, logger) {

   var win = windowModule.global;

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
      if (has('ie-native-mode') || _isIE11) {
         node = widgetPlacementConfig.getDefinitionById(defId);
      } else {
         var doc = ((dataDoc) ? dataDoc : wpConfig('widgetConfigXMLDocument')),
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

      pageId = pageId || wpConfig('pageId') || wpConfig('defaultPageId');

      var node = null;
      if (has('ie-native-mode') || _isIE11) {
         node = widgetPlacementConfig.getInstanceByInstId(instanceId, pageId);
         if (!node) {
            var defId = instanceId;
            node = widgetPlacementConfig.getInstancesByDefId(defId, pageId)[0];
         }                  
      } else {
         var doc = dataDoc || wpConfig('widgetConfigXMLDocument'),
             exp = INST_NODE_PATH_BY_INSTID.replace('%PAGE_ID%', pageId).replace('%INST_ID%', instanceId);

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

      pageId = pageId || wpConfig('pageId') || wpConfig('defaultPageId');
      def = def.defId || def;

      var nodes = null;
      if (has('ie-native-mode') || _isIE11) {
         nodes = widgetPlacementConfig.getInstancesByDefId(def, pageId);
      } else {
         var doc = dataDoc || wpConfig('widgetConfigXMLDocument'),
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

      pageId = pageId || wpConfig('pageId') || wpConfig('defaultPageId');
      doc = doc || wpConfig('widgetConfigXMLDocument');
      instance = (lang.isString(instance) ? _getWidgetInstance(instance, doc, pageId) : instance);

      var defId = (instance ? instance['defIdRef'] : null);
      return _getWidgetDef(defId, doc);
   };

   var _getPageWidgetInstances = function(pageId, dataDoc, resourceSubType) {
      pageId = pageId || wpConfig('pageId') || wpConfig('defaultPageId');

      var nodes = null;
      if (has('ie-native-mode') || _isIE11) {
         nodes = widgetPlacementConfig.getInstances(pageId);
      } else {
         var doc = dataDoc || wpConfig('widgetConfigXMLDocument'),
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
      if (has('ie-native-mode') || _isIE11) {
         nodes = widgetPlacementConfig.getDefinitions();
      } else {
         var doc = dataDoc || wpConfig('widgetConfigXMLDocument');
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

      doc = doc || wpConfig('widgetConfigXMLDocument');
      pageId = pageId || wpConfig('pageId') || wpConfig('defaultPageId');

      var widgetInstanceNode = null;
      if (hide) {
         var instanceId = instance.instanceId || instance;
         if (!instanceId) return false;

         widgetInstanceNode = _getWidgetInstance(instanceId, doc, pageId, false);
         if (!widgetInstanceNode) return false;
      } else {
         if (!instance.defIdRef || !instance.uiLocation || !instance.instanceId) return false;

         var node = null;
         if (has('ie-native-mode') || _isIE11) {
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

      pageId = pageId || wpConfig('pageId') || wpConfig('defaultPageId');

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

      if (!wpConfig('widgetConfigXMLDocument') || true === forceRefresh || true === win.staleXMLConfig) {
         url = wpConfig('layoutInfoUrl');
         if (!win.staleXMLConfig)
            url += '&lastMod=' + wpConfig('lastMod');

         if (wpConfig('needsMigration') == true) {
            // Used by server to decide whether to use old overview 
            // layout or not for Communities
            url += '&needsMigration=true';
         }

         logger.debug('Using URL:' + url);

         xhr.get({
            url: url,
            handleAs: 'xml',
            sync: true,
            load: function (response) {
               wpConfig('widgetConfigXMLDocument', response);
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
      wpConfig('widgetConfigXMLDocument', null);
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

})