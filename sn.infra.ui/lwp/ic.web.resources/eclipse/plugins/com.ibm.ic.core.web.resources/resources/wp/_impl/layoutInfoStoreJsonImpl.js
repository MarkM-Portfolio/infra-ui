define([
   'dojo/_base/array',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/_base/xhr',
   'dojo/Deferred',
   '../configs',
   '../../errorhandling',
   'ic-gadget/util/trace'
], function(array, lang, windowModule, xhr, Deferred, wpConfig, errorhandling, 
   logger) {

   var win = windowModule.global;

   var _getPage = function(pageId, resourceSubType, doc) {
      doc = doc || wpConfig('widgetConfigDocument');
      pageId = pageId || wpConfig('pageId') || wpConfig('defaultPageId');
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

      doc = doc || wpConfig('widgetConfigDocument');
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
      doc = doc || wpConfig('widgetConfigDocument');

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
         if (!instance.defIdRef || !instance.uiLocation || !instance.instanceId) return false;

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

      if (!wpConfig('widgetConfigDocument') || true === forceRefresh || true === win.staleXMLConfig) {
         url = wpConfig('layoutInfoUrl') + '&format=json';
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
            handleAs: 'json',
            sync: true,
            load: function (data) {
               wpConfig('widgetConfigDocument', data);
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
      wpConfig('widgetConfigDocument', null);
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

});