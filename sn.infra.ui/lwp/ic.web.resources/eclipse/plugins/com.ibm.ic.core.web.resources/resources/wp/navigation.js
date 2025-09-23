/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/declare',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/dom',
   'dojo/dom-attr',
   'dojo/dom-class',
   'dojo/dom-construct',
   'dojo/query',
   'dojo/on',
   './aria/Toolbar',
   './configs',
   './utils',
   'ic-gadget/util/trace',
   'ic-ui/aria/Toolbar'
], function(array, declare, lang, windowModule, dom, domAttr, domClass,
   domConstruct, query, on, WpToolbar, wpConfig, utils, logger, Toolbar) {

   var win = windowModule.global;
   var _navbar = null;

   var NavigationBar = declare(
      'lconn.core.wp.NavigationBar',
      null,
      {
         domId : null,
         domNode : null,
         overviewDomId : null,

         navItemMap : null,
         selectedNavItem : null,
         
         _toolbar : null,

         constructor : function(domId, opts){
            this.domId = domId;
            this.domNode = dom.byId(this.domId);
            this.navItemMap = {};
            if (opts && opts.overviewDomId) {
               this.overviewDomId = opts.overviewDomId;
            }
         },

         addNavItem : function(widgetDef, widgetInstance, selected, navLink, navLinkText) {
            if ('undefined' === typeof navLink) {
               navLink = widgetDef.navBarLink;
            }
            if ('undefined' === typeof navLinkText) {
               navLinkText = widgetDef.navBarLinkText;
            }

            var labels = [];
            var links = [];

            var showFullpageLink = widgetDef.showFullPageViewLinkInNavBar;
            if ((showFullpageLink === 'true') || utils.isModeSupported('fullpage', widgetDef)
                  || (!!navLink)) {
               if (!!navLinkText) {
                  labels = array.map(navLinkText.split(','), function(labelId) {
                     return utils.getResourcedStringById(widgetDef, labelId);
                  });
               } else {
                  labels[0] = utils.getWidgetName(widgetDef, widgetInstance);
               }

               if (!!navLink) {
                  links = navLink.split(',');
               }

               var defId = widgetDef.defId;
               var instanceId = widgetInstance.instanceId || defId;
               var uiLocation = widgetInstance.uiLocation;

               array.forEach(labels, lang.hitch(this, function(label, i) {
                  var navItemId = instanceId + '_navItem' + ((i === 0) ? '' : i);
                  var li = domConstruct.create('li', {
                     'id' : navItemId,
                     'role' : 'button',
                     'aria-pressed' : 'false',
                     'tabindex' : -1,
                     // Remember uiLocation(column) for inserting other widgets.
                     'uiLocation' : widgetInstance.uiLocation
                  });

                  var aElem = domConstruct.create('a', {
                     innerHTML : label,
                     'tabindex' : -1
                  });

                  if (!!navLink) {
                     var link = links[i] || links[0];
                     var substitutedNavBarLink = utils.getI18nString(link);
                     domAttr.set(aElem, 'href', substitutedNavBarLink);
                     wpConfig('params')['widgetInstanceId'] = instanceId;
                  } else {
                     domAttr.set(aElem, 'href', 'javascript:void(0);');
                     var onclickHandler = function() {
                        wpConfig('NavBarSelectedMenuItem', navItemId);
                        utils.changeHash('fullpageWidgetId=' + instanceId);
                        return false;
                     };
                     on(aElem, 'click', onclickHandler);
                  }

                  li.appendChild(aElem);

                  var refElem = null;
                  var direction = 'after';
                  if (defId === 'StatusUpdates') {
                     refElem = dom.byId('RecentUpdates_navItem');
                  } else if (wpConfig('insertBeforeNavBarId')) {
                     refElem = dom.byId(wpConfig('insertBeforeNavBarId'));
                     direction = 'before';
                  } else {
                     refElem = this._getInsertionPoint(uiLocation);
                  }
                  domConstruct.place(li, refElem, direction);

                  if (!this.navItemMap[uiLocation]) {
                     this.navItemMap[uiLocation] = [];
                  }
                  this.navItemMap[uiLocation].push(li);
               }));
            }
         },

         selectNavItem : function(instanceId, index) {
            var navItem = this._getNavItem(instanceId, index);
            if (navItem) {
               this._getNavItems().forEach(lang.hitch(this, this._blurNavItem));
               this._highlightNavItem(navItem);

					// TODO: should be cleaned later
               var name = _getNavItemName(navItem);
               if (name) {
                  utils.setTitle(name);

                  var navBarSelection = dom.byId("dropdownNavMenuSelection");
                  if (navBarSelection) {
                     domAttr.set(navBarSelection, 'innerHTML', name);
                  }
               }
            }
         },

         isNavItemSelected : function(instanceId, index) {
            var result = false;
            var navItem = this._getNavItem(instanceId, index);
            if (navItem) {
               result = domClass.contains(navItem, 'lotusSelected');
            }

            return result;
         },

         updateNavItem : function(instanceId, index, opts) {
            var navItem = this._getNavItem(instanceId, index);
            if (navItem && opts) {
               var navLink = navItem.children[0];
               var newName = opts.name;
               if (newName) {
                  if (navLink.textContent) {
                     navLink.textContent = newName;
                  } else {
                     navLink.innerText = newName;
                  }
               }
            }
         },

         removeNavItem : function(instanceId, index) {
            var navItem = this._getNavItem(instanceId, index);
            if (navItem) {
               navItem.parentNode.removeChild(navItem);
            }
         },

         getInsertionPoint : function(li) {
            /* For a node being inserted into nav bar - find child node after 
             * which it should be inserted. This insertion node will be the last 
             * item in the nav bar with the same column number. */
            var uiLocation = li.getAttribute('uiLocation');
            return this._getInsertionPoint(uiLocation);
         },

         restore : function() {
            try {
               _toolbar = new WpToolbar(this.domId);
            } catch (ee) {
               _toolbar = new Toolbar(this.domId);
            }
            
            this.domNode = dom.byId(this.domId);
         },

         _getInsertionPoint : function(uiLocation) {
            if (uiLocation === 'col2') {
               var navItems = this._getNavItems(uiLocation);
               if (navItems && navItems.length) {
                  return navItems[navItems.length - 1];
               }
            }

            var allNavItems = this._getNavItems();
            if (allNavItems && allNavItems.length) {
               return allNavItems[allNavItems.length - 1];
            }

            return null;
         },

         _getNavItem : function(instanceId, index) {
            // if the parameter is an DOM node, will just return it
            if (dom.byId(instanceId) === instanceId)
               return instanceId;

            var selectedItemId = null;
            if (instanceId) {
               selectedItemId = instanceId + '_navItem';
               if (index && index !== 0) {
                  selectedItemId += index;
               }
            } else {
               selectedItemId = this.overviewDomId;
            }

            if (!selectedItemId)
               return null;

            var navItems = query('li#'+selectedItemId, this.domNode);
            if (navItems && navItems[0]) {
               return navItems[0];
            } else {
               return null;
            }
         },

         _getNavItems : function(uiLocation) {
            var queryStr = 'li';
            if (uiLocation) {
               queryStr += '[uilocation="'+uiLocation+'"]';
            }
            return query(queryStr, this.domNode);
         },

         _highlightNavItem : function(instanceId, index) {
            var navItem = this._getNavItem(instanceId, index);
            if (navItem) {
               domClass.add(navItem, 'lotusSelected');
            }
         },

         _blurNavItem : function(instanceId, index) {
            var navItem = this._getNavItem(instanceId, index);
            if (navItem) {
               domClass.remove(navItem, 'lotusSelected');
            }
         },
         
         _refreshSelection : function() {
            var navItemId = wpConfig('NavBarSelectedMenuItem');
            if (!navItemId) return;

            var pairs = navItemId.split('_navItem');
            var widgetInstance = utils.getWidgetInstance(pairs[0]);
            if (widgetInstance) {
               var instanceId = widgetInstance.instanceId || widgetInstance.defIdRef;
               this.selectNavItem(instanceId, pairs[1]);
            } else if (overviewDomId === pairs[0]){
               this.selectNavItem();
            }
         }
      });

   var init = function(domId, opts) {
      if (lang.isString(domId) && domId) {
         opts = opts || {};
         try {
            _navbar = new NavigationBar(domId, opts);
         } catch (e) {
            logger.error('Unable to initialize new NavigationBar, trying to go on with existing one.', e);
         }
      }

      _navbar && _navbar.restore();
      return _navbar;
   };

   // TODO: should be cleaned later
   var _getNavItemName = function(navItem) {
      var navItemId = domAttr.get(navItem, 'id');
      var indexOfNavSuffix = navItemId.indexOf('_navItem');
      if (indexOfNavSuffix !== -1) {
         var instanceId = navItemId.substring(0, indexOfNavSuffix),
             widgetInstance = utils.getWidgetInstance(instanceId),
             widgetDef = utils.getWidgetDefByInstance(widgetInstance),
             title = utils.getWidgetName(widgetDef, widgetInstance);

         if (title) {
            return title;
         }
      }

      var node = query('a', navItem);
      if (node.length) {
         return lang.trim(node[0][(has('ie') ? 'innerText' : 'textContent')]);
      }

      logger.warn('Unable to get proper title from navitem: ', navItemEle);
      return null;
   };

   var get = function() {
      if (!_navbar) {
         logger.error('No navbar ever initialized.');
      }

      return _navbar;
   };

   var navigation = {
         init : init,
         get : get,
         restore : init
   };

   return navigation;

});