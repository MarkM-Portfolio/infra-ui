/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/dom',
   'dojo/dom-attr',
   'dojo/dom-class',
   'dojo/dom-construct',
   'dojo/dnd/Manager',
   'dojo/parser',
   'dojo/query',
   'dojo/request',
   'dojo/topic',
   './configs',
   './dnd/Source',
   './persistor',
   './signals',
   './utils',
   './widgets',
   '../dnd/Source',
   '../errorhandling',
   '../paletteOneUI/dnd/avatar',
   '../utilities',
   'ic-gadget/util/trace'
], function(array, lang, windowModule, dom, domAttr, domClass, domConstruct,
   Manager, parser, query, request, topic, wpConfig, WpSource, persistor,
   signals, utils, widgets, Source, errorhandling, Avatar, utilities, logger) {

   var win = windowModule.global;

   var _columns = {};
   var _columnArray = [];

   var _dropZoneObjects = {};

   var _getTheme = function(column) {
      var node = (lang.isString(column)) ? dom.byId('widget-container-' + column) : column;
      if (!node || 1 !== node.nodeType)
         return null;

      while ('lotusMain' !== node.id) {
         var classes = node.getAttribute('class') || '';
         var start = classes.indexOf('wptheme');
         if (-1 === start) {
            node = node.parentNode;
            continue;
         }

         classes = classes.substring(start);
         var end = classes.indexOf(' ');
         if (-1 === end) {
            return classes;
         } else {
            return classes.substring(0, end);
         }
      }

      return null;
   };

   var getWidgetTheme = function(/* String */instanceId) {
      var uiLocation = widgets.getUILocation(instanceId);
      if (uiLocation && _columns[uiLocation]) {
         return _columns[uiLocation].theme;
      }
      return null;
   };

   var _isColumnRequested = function(column, criteria) {
      if (criteria) {
         for (var key in criteria) {
            if (column[key] != criteria[key]) return false;
         }
      }

      return true;
   };

   var getColumns = function(selector) {
      if ('undefined' === typeof selector) {
         return lang.clone(_columnArray);
      } else if (lang.isArray(selector)) {
         return array.map(selector, getColumn);
      } else if (lang.isObject(selector)) {
         return array.filter(_columnArray, function(column) {
            return (column && _isColumnRequested(column, selector));
         });
      }

      return null;
   };

   var getColumn = function(uiLocation) {
      var result = _columns[uiLocation];
      if (!result) {
         var widgetContainerNode = dom.byId('widget-container-' + uiLocation);
         if (widgetContainerNode) {
            return _initColumn(widgetContainerNode, false);
         } else {
            return null;
         }
      }

      return result;
   };

   var getColumnContainer = function(uiLocation) {
      var column = getColumn(uiLocation);
      if (!column) return null;

      var draggable = (column.draggable || false),
          widgetContainer = column.container,
          dropZone = column.dropZone;

      // create drop-zone element if drop zones are supported and a drop
      // zone does not exist for this uiLocation SPR#NZSG8CN6AH
      var result = dropZone;
      if (draggable) {
         if (result == null && widgetContainer) {
            result = domConstruct.create('div', {
               id : uiLocation + 'DropZone'
            }, widgetContainer);
         }
      } else {
         // if no drop zone support, mimic the current uiLocation as the 
         // drop-zone. SPR#AVEI8DNT2Z
         result = widgetContainer; 
      }

      return result;
   };

   var _createDropZoneObject = function(uiLocation, dropZoneDOMNode) {
      var accept = (wpConfig('limitedDND') ? [] : ['widget']);
      var params = {
         jsId : uiLocation,
         accept : accept,
         withhandles : true,
         skipForm : true
      };
      var dropZoneObject = new WpSource(dropZoneDOMNode, params);
      var dropZoneObjectId = uiLocation + 'DropZone';
      _dropZoneObjects[dropZoneObjectId] = dropZoneObject;
      return dropZoneObject;
   };
   
   var onDropHandler = function(source, nodes, iscopy) {
      var currentNode = signals.get('currentNode');
      if (!currentNode) {
         return;
      }

      var target = Manager.manager().target,
          newUiLocation = target.jsId,
          currentNodeId = currentNode.getAttribute('widgetId');

      if (target && source && target !== source) {
         utilities.hide(currentNodeId + 'SubArea', true, true);
      }
      utilities.show(currentNode, false, false, true);
      signals.set('currentNode', null);

      widgets.updateUILocation(currentNodeId, newUiLocation);

      var saveMove = function() {
         var childNodes = target.getAllNodes();
         for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].getAttribute('widgetId') === currentNodeId) {
               var previousId = (i === 0) ? null : childNodes[i - 1].getAttribute('widgetId');
               _moveWidgetTemp(currentNodeId, newUiLocation, previousId, target, source);
               break;
            }
         }
      };
      win.setTimeout(saveMove, 300);
   };

   var _initColumn = function(container, canPersonalize) {
      var id = container.id || '';
      var uiLocation = id.replace('widget-container-', '');
      if (id.length !== uiLocation.length + 17) {
         logger.warning('Skip an invalid widget container with id: ' + id);
         return null;
      }

      var draggable = ('false' !== container.getAttribute('draggable'));
      var column = {
            uiLocation : uiLocation,
            theme : _getTheme(container),
            hidden : false,
            draggable : draggable,
            container : container
      };
      _columns[uiLocation] = column;
      _columnArray.push(column);

      if (canPersonalize && column.draggable) {
         var dropZone = domConstruct.create('div', {
            'id' : uiLocation + 'DropZone',
            'class' : 'target',
            'role' : 'presentation'
         }, container);
         column.dropZone = dropZone;
      } else {
         domAttr.set(container, 'role', 'presentation');
      }

      return column;
   };

   var initColumns = function(canPersonalize) {
      // fix for SPR DJOS7UNT5B and SPR JMGE7XESJJ
      if (Source) {
         Source.prototype.onSelectStart = function() {};
      }

      query('.widgetContainer').forEach(function(container) {
         _initColumn(container, canPersonalize);
      });

      var manager = Manager.manager();
      manager.makeAvatar = function() {
         return new Avatar(this);
      };

      topic.subscribe('/dnd/drop', onDropHandler);
      topic.subscribe('/dnd/start', function(source, nodes, iscopy) {
         for (var i = 0; i < nodes.length; i++) {
            utilities.hide(nodes[i], false, true);
         }
         signals.set('currentNode', nodes[nodes.length-1]);
      });
      topic.subscribe('/dnd/cancel', function() {
         var currentNode = signals.get('currentNode');
         if (currentNode) {
            utilities.show(currentNode, false, false, true);
            signals.set('currentNode', null);
         }
      });
   };

   var createAllDropzones = function() {
      for (var uiLocation in _columns) {
         var column = _columns[uiLocation];
         var dropZone = (column ? column.dropZone : null);
         if (dropZone) {
            _createDropZoneObject(uiLocation, dropZone);
         }
      }
   };

   var isWidgetSupported = function(column, widgetDef) {
      if (!column) {
         return false;
      }

      if (!_columns[column]) {
         return true;
      }

      return utils.isThemeSupported(_columns[column].theme, widgetDef);
   };
   
   widgets.isColumnSupported = function(widgetDef, column) {
      return isWidgetSupported(column, widgetDef);
   };

   /**
    * 
    * @memberof ic-core.WidgetPlacement
    * @function showColumns
    * @param {string} column The column to show
    */
   var showColumns = function(uiLocations) {
      if (lang.isString(uiLocations)) {
         uiLocations = [uiLocations];
      }

      var columns = getColumns(uiLocations);
      array.forEach(columns, function(col) {
         if (col) {
            col.hidden = false;
         }
      });

      array.forEach(uiLocations, function(uiLocation) {
         utilities.show('widget-container-'+uiLocation, false, false, true);
      });
   };

   /**
    * 
    * @memberof ic-core.WidgetPlacement
    * @function hideColumns
    * @param {string} column The column to hide
    */
   var hideColumns = function(uiLocations) {
      if (lang.isString(uiLocations)) {
         uiLocations = [uiLocations];
      }

      var columns = getColumns(uiLocations);
      array.forEach(columns, function(col) {
         if (col) {
            col.hidden = true;
         }
      });
      
      array.forEach(uiLocations, function(uiLocation) {
         utilities.hide('widget-container-'+uiLocation, false, true);
      });
   };

   var destroyColumns = function(uiLocations) {
      if (lang.isString(uiLocations)) {
         uiLocations = [uiLocations];
      }

      array.forEach(uiLocations, function(uiLocation) {
         widgets.destroyWidgets({column: uiLocation});
      });

      var columns = getColumns(uiLocations);
      array.forEach(columns, function(col) {
         if (col && col.container) {
            col.container.innerHTML = '';
         }
      });
   };

   var getColumnAnchor = function(column) {
      return 'top';
   };

   var getColumnTheme = function(column) {
      if (_columns[column]) {
         return _columns[column].theme;
      }
   };

   var getSiblingColumn = function(uiLocation, direction) {
      var column = _columns[uiLocation];
      if (!column) return null;

      var columns = getColumns({
         hidden : false,
         draggable : true
      });

      var columnNum = columns.length;
      var columnIndex = columns.indexOf(column);
      if (columnNum <= 1 || -1 === columnIndex) {
         return null;
      }

      var newIndex = (columnNum + columnIndex + direction) % columnNum;
      return columns[newIndex].uiLocation;
   };

   var getColumnWidgetNodes = function(uiLocation, allowNested) {
      var widgetContainer;
      if (lang.isString(uiLocation)) {
         var column = _columns[uiLocation];
         if (column) {
            widgetContainer = column.dropZone || column.container;
         }
      } else if (uiLocation === dom.byId(uiLocation)) {
         widgetContainer = uiLocation;
      }

      var widgetQuery = (allowNested ? '' : '> ') + 'div.lotusWidget2';
      return query(widgetQuery, widgetContainer).filter(function(w) {
         return !!w.getAttribute('widgetid');
      });
   };
   
   var _moveWidgetTemp = function(widgetId, newUILocation, previousWidgetId, target, source) {
      // Adjusts the id of the previous widget to use to place a widget.
      // Accounts for moving to beginning of column3, and useing last widget
      // in column 2 as previous for that case
      // so navigator keeps column 3 widgets after column 2 widgets.
      previousWidgetId = previousWidgetId || getColumnAnchor(newUILocation);

      persistor.moveWidget(widgetId, newUILocation, previousWidgetId).then(function() {
         if (target && source && target !== source)
            utils.withLayoutInfo(true).then(function(){
               widgets.refreshWidget(widgetId);
            });
      }, function() {});
   };

   var moveWidgetDown = function(instanceId, uiLocation) {
      uiLocation = uiLocation || widgets.getUILocation(instanceId);
      var childNodes = getColumnWidgetNodes(uiLocation);
      array.some(childNodes, function(node, currentIndex) {
         var currentWidgetId = childNodes[currentIndex].getAttribute('widgetid');
         if (currentWidgetId === instanceId) {
            var calculatedIndex = currentIndex + 1;
            var previousId = childNodes[calculatedIndex].getAttribute('widgetid');
   
            _moveWidgetTemp(instanceId, uiLocation, previousId);
            domConstruct.place(node, childNodes[calculatedIndex], 'after');
            return true;
         }
      });
   };

   var moveWidgetUp = function(instanceId, uiLocation) {
      uiLocation = uiLocation || widgets.getUILocation(instanceId);
      var childNodes = getColumnWidgetNodes(uiLocation);
      // we cannot move the first of the list, start from 1
      array.some(childNodes, function(node, currentIndex) {
         var currentWidgetId = node.getAttribute('widgetid');
         if (currentWidgetId == instanceId) {
            var calculatedIndex = currentIndex - 1;
            var previousId = ((calculatedIndex !== 0) ? childNodes[calculatedIndex - 1].getAttribute('widgetid') : null);

            _moveWidgetTemp(instanceId, uiLocation, previousId);
            domConstruct.place(node, childNodes[calculatedIndex], 'before');
            return true;
         }
      });
   };

   var moveWidgetToEnd = function(instanceId, uiLocation) {
      var widgetNodes = getColumnWidgetNodes(uiLocation);
      if (widgetNodes) {
         var previousId = domAttr.get(widgetNodes[widgetNodes.length - 1], 'widgetid');
         if (previousId === instanceId) {
            // Widget is last one in UI, but we need to ensure the DB is 
            // updated to reflect that
            if (widgetNodes.length > 1) {
               previousId = domAttr.get(widgetNodes[widgetNodes.length - 2], 'widgetid');
            } else {
               previousId = null;
            }
         }
         _moveWidgetTemp(instanceId, uiLocation, previousId, null, null);
      }
   };

   var _getDropZoneObject = function(uiLocation) {
      return _dropZoneObjects[uiLocation + 'DropZone'];
   };

   var _addWidgetToDropZone = function(instanceId, uiLocation) {
      if (_getDropZoneObject(uiLocation) == null) {
         // create the dropzone object
         utilities.processUntilElementIsFound(uiLocation+'DropZone', _buildNewDNDDropZone, null, {
            uiLocation : uiLocation
         });
      } else {
         // use exising dropzone object
         utilities.processUntilElementIsFound(instanceId+'Section', _addDNDItem, null, {
            uiLocation : uiLocation,
            instanceId : instanceId
         });
      }
   };

   var _buildNewDNDDropZone = function(dropZoneDOMNode, parameters) {
      parser.parse(dropZoneDOMNode);
      _createDropZoneObject(parameters.uiLocation, dropZoneDOMNode);
   };

   var _addDNDItem = function(widgetSectionDOMNode, parameters) {
      parser.parse(widgetSectionDOMNode);
      var dropZoneObject = _getDropZoneObject(parameters.uiLocation);
      if (dropZoneObject) {
         dropZoneObject.setItem(widgetSectionDOMNode.id, {
            node : widgetSectionDOMNode,
            id : widgetSectionDOMNode.id,
            data : parameters.instanceId,
            type : ['widget']
         });
         dropZoneObject.hideEmptyIndicator();
      }
   };

   var _removeWidgetFromDropZone = function(instanceId, uiLocation) {
      var dropZoneObject = _getDropZoneObject(uiLocation);
      if (dropZoneObject) {
         dropZoneObject.delItem(instanceId + 'Section');
         dropZoneObject.showEmptyIndicator();
      }
   };

   var _moveToSiblingColumn = function(instanceId, uiLocation, direction) {
      uiLocation = uiLocation || widgets.getUILocation(instanceId);
      var nodes = getColumnWidgetNodes(uiLocation);
      if (!nodes)
         return;

      nodes = nodes.filter(function(w) {
         return (instanceId === w.getAttribute('widgetid'))
      });
      if (1 !== nodes.length)
         return;

      var newUiLocation = getSiblingColumn(uiLocation, direction);
      if (newUiLocation) {
         var dropZoneNode = _columns[newUiLocation].dropZone;
         domConstruct.place(nodes[0], dropZoneNode, 'last');
         moveWidgetToEnd(instanceId, newUiLocation);

         widgets.updateUILocation(instanceId, newUiLocation);
         widgets.refreshWidget(instanceId);

         _removeWidgetFromDropZone(instanceId, uiLocation);
         _addWidgetToDropZone(instanceId, newUiLocation);
      }
   };

   var moveWidgetToNextColumn = function(instanceId, uiLocation) {
      _moveToSiblingColumn(instanceId, uiLocation, 1);
   };

   var moveWidgetToPrevColumn = function(instanceId, uiLocation) {
      _moveToSiblingColumn(instanceId, uiLocation, -1);
   };

   var changeLayout = function(newLayout, callback) {
      if (!lang.isString(newLayout) || '' === newLayout) {
         logger.warn('new layout is invalid: ' + newLayout);
         return;
      }

      persistor.changeLayout(newLayout).then(function() {
         if (lang.isFunction(callback)) {
            callback();
         }
      });
   };
   
   var getWidgetLocation = function(instanceId, uiLocation) {
      var column = _columns[uiLocation];
      var dropZoneNode = (column ? column.dropZone : null);
      if (dropZoneNode) {
         var childNodes = array.filter(dropZoneNode.childNodes, function(node) {
            // filter out the empty column placeholder
            return node && !!node.getAttribute('widgetid');
         });

         if (childNodes.length === 1)
            return 'alone';

         var location = null;
         array.some(childNodes, function(node, i, arr) {
            if (node.getAttribute('widgetid') === instanceId) {
               if (i === 0)
                  location = 'top';
               else if (i >= arr.length - 1)
                  location = 'bottom';
               else
                  location = 'middle';

               return true;
            }
         });
         return location;
      }

      return null;
   };

   var showSidePanels = function() {
      if (wpConfig('isProfilesPage')) {
         var usedUILocations = widgets.getUsedUILocations();
         if (array.indexOf(usedUILocations, 'col3') !== -1) {
            domClass.remove('profilePaneRight', 'lotusHidden');
         }
         if (array.indexOf(usedUILocations, 'col1') !== -1) {
            domClass.remove('profilePaneLeft', 'lotusHidden');
         }
      }
   };

   lang.mixin(widgets, {
      moveWidgetUp : moveWidgetUp,
      moveWidgetDown : moveWidgetDown,
      moveWidgetToEnd : moveWidgetToEnd,
      moveWidgetToNextColumn : moveWidgetToNextColumn,
      moveWidgetToPrevColumn : moveWidgetToPrevColumn,
      getWidgetLocation : getWidgetLocation,
      getWidgetContainer : getColumnContainer,
      getWidgetContainerObject : getColumn,

      _addWidgetToDropZone : _addWidgetToDropZone,
      _removeWidgetFromDropZone : _removeWidgetFromDropZone,

      getWidgetTheme : getWidgetTheme
   });

   lang.mixin(utils, {
      showSidePanels : showSidePanels
   });
   
   lang.extend(WpSource, {
      _getColumnWidgetNodes : getColumnWidgetNodes
   });

   var layout = {
         initColumns : initColumns,
         createAllDropzones : createAllDropzones,

         getColumns : getColumns,
         showColumns : showColumns,
         hideColumns : hideColumns,
         destroyColumns : destroyColumns,

         getColumn : getColumn,
         showColumn : showColumns,
         hideColumn : hideColumns,
         destroyColumn : destroyColumns,

         getSiblingColumn : getSiblingColumn,

         getColumnAnchor : getColumnAnchor,
         getColumnContainer : getColumnContainer,
         getColumnTheme : getColumnTheme,
         getColumnWidgetNodes : getColumnWidgetNodes,
         isWidgetSupported : isWidgetSupported,

         moveWidgetUp : moveWidgetUp,
         moveWidgetDown : moveWidgetDown,
         moveWidgetToEnd : moveWidgetToEnd,
         moveWidgetToNextColumn : moveWidgetToNextColumn,
         moveWidgetToPrevColumn : moveWidgetToPrevColumn,
         getWidgetLocation : getWidgetLocation,

         changeLayout : changeLayout
   };

   return layout;

});