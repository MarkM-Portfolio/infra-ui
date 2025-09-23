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

define([
   "dojo/_base/array",
   "dojo/_base/lang"
], function (array, lang) {
   "use strict";

   function filterNodesByAttributeValue(nodes, attribute, attributeValue) {
      return array.filter(nodes, function (node) {
         return node.getAttribute(attribute) === attributeValue;
      });
   }

   function getDefinitions(defId) {
      var root, nodes;

      root = lang.getObject("WidgetPlacementConfig.widgetConfigXMLDocument.documentElement");

      if (!root) {
         return [];
      }

      nodes = root.getElementsByTagName("widgetDef");

      if (defId) {
         nodes = filterNodesByAttributeValue(nodes, "defId", defId);
      }

      return nodes;
   }

   function getInstancesBy(pageId, attribute, id) {
      var root, nodes;

      root = lang.getObject("WidgetPlacementConfig.widgetConfigXMLDocument.documentElement");

      if (!root) {
         return [];
      }

      if (pageId) {
         nodes = root.getElementsByTagName("page");
         nodes = filterNodesByAttributeValue(nodes, "pageId", pageId);
         root = nodes[0];
      }

      if (!root) {
         return [];
      }

      nodes = root.getElementsByTagName("widgetInstance");

      if (attribute) {
         nodes = filterNodesByAttributeValue(nodes, attribute, id);
      }

      return nodes;
   }

   function getPageBy(pageId) {
      var root, nodes;

      root = lang.getObject("WidgetPlacementConfig.widgetConfigXMLDocument.documentElement");

      if (!root) {
         return [];
      }

      if (pageId) {
         nodes = root.getElementsByTagName("page");
         nodes = filterNodesByAttributeValue(nodes, "pageId", pageId);
         root = nodes[0];
      }

      return root;
   }

   /**
    * Widget placement config utility
    * <p>
    * Uses XML DOM APIs to traverse the widget placement config XML instead of
    * XPath
    * 
    * @namespace ic-core.util.widgetPlacementConfig
    */
   var util = /** @lends ic-core.util.widgetPlacementConfig */ {
      /**
       * Returns an array of widget definitions
       * 
       * @returns array of widget definitions
       */
      getDefinitions: function () {
         return getDefinitions();
      },
      /**
       * Returns a widget definition by id
       * 
       * @param {String}
       *           defId The id of the widget definition
       * @returns a widget definition by id
       */
      getDefinitionById: function (defId) {
         if (!defId) {
            return;
         }

         var defs = getDefinitions(defId);
         return defs[0];
      },
      /**
       * Returns an array of widget instances for a page
       * 
       * @param {String}
       *           pageId The id of the page
       * @returns an array of widget instances for a page
       */
      getInstances: function (pageId) {
         return getInstancesBy(pageId);
      },
      /**
       * Returns an array of widget instances for a definition and a page
       * 
       * @param {String}
       *           widgetDefId The id of the widget definition
       * @param {String}
       *           pageId The id of the page
       * @returns an array of widget instances for a definition and a page
       */
      getInstancesByDefId: function (widgetDefId, pageId) {
         return getInstancesBy(pageId, "defIdRef", widgetDefId);
      },
      /**
       * Returns a widget instance for a page
       * 
       * @param {String}
       *           instanceId The id of the widget instance
       * @param {String}
       *           pageId The id of the page
       * @returns a widget instance for a page
       */
      getInstanceByInstId: function (instanceId, pageId) {
         var instances = getInstancesBy(pageId, "instanceId", instanceId);
         return instances[0];
      },
      /**
       * Returns a page
       * 
       * @param {String}
       *           pageId The id of the page
       * @returns a page
       */
      getPageById: function (pageId) {
         return getPageBy(pageId);
      }
   };

   lang.setObject("lconn.core.util.widgetPlacementConfig", util);

   return util;
});
