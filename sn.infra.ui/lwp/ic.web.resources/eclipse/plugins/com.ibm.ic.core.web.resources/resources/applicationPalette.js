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
      "dojo/_base/lang",
      "dojo/_base/window",
      "dojo/_base/config",
      "dojo/aspect",
      "dojo/dom",
      "dojo/dom-attr",
      "dojo/dom-style",
      "dojo/i18n",
      "dojo/i18n!./nls/widgets",
      "dojo/i18n!./palette/nls/applicationPalette",
      "dojo/io-query",
      "dojo/query",
      "dojo/on",
      "dojo/string",
      "dojo/topic",
      "dijit/registry",
      "./config",
      "./HTMLUtil",
      "./config/properties",
      "./errorhandling",
      "./formutilities",
      "./paletteOneUI/Palette",
      "./palette/ChangeLayoutAddContentPane",
      "./utilities",
      "./WidgetPlacement",
      "./wp/events",
      "./xpath",
      "./xslt",
      "ic-gadget/util/trace",
      "./theme",
      "./themeSmartCloud",
      "dijit/Dialog"
],
   function(dojo, array, lang, windowModule, dojoConfig, aspect, dom, domAttr,
      domStyle, i18n, i18nwidgets, i18napplicationPalette, ioQuery, query, on,
      string, topic, registry, config, HTMLUtil, properties, errorhandling,
      formutilities, Palette, ChangeLayoutAddContentPane, utilities, wp, events,
      xpath, xslt, logger, theme, themeSmartCloud, Dialog) {

      var win = windowModule.global;
      //gatekeeper: communities-new-widget-layouts
      var is_communities_new_widget_layouts = false;
      if( typeof gatekeeperConfig != "undefined" && gatekeeperConfig['communities-new-widget-layouts'] )
   	     is_communities_new_widget_layouts=true;

      var palette = function() {

         // keeping the lifecycle of all event handlers
         var _evtHandlers = [];

         this.onLoad = function() {
            try {
               _evtHandlers.push(topic.subscribe(Palette.prototype.ADD_WIDGET_EVENT, lang.hitch(this, "_paletteButtonListener")));
               _evtHandlers.push(topic.subscribe(Palette.prototype.CLOSE_PALETTE_EVENT, palette.hidePalette));
               _evtHandlers.push(topic.subscribe(events.WIDGET_ADDED_EVENT, palette.handleWidgetAdded));

               this._createPaletteWidget();

               var applicationPalettewidgetContainer = this.iContext.getElementById('applicationPalettewidgetContainer');
               applicationPalettewidgetContainer.appendChild(palette.palette.domNode);
               domAttr.set(applicationPalettewidgetContainer, {
                  'role' : 'region',
                  'aria-label' : palette.messages['label.theme.customize']
               });

               var attrs = this.iContext.getiWidgetAttributes();
               var tabId = (attrs ? attrs.getItemValue('tabId') : null);
               palette.palette._switchToTab(tabId);

               palette.contentLoaded = true;
            } catch (e) {
               logger.error('Unable to load application palette', e);
            }
         };

         this.onUnload = function() {
            array.forEach(_evtHandlers, function(handler) {
               handler.remove();
            });
         };

         this._createPaletteWidget = function() {
            palette.palette = new Palette({
               id : 'communityPalette',
               imageContextRoot : win.WidgetPlacementConfig.applicationContext + '/nav/common/styles/images'
            });
            palette.palette.setLayoutImage('primary', win.WidgetPlacementConfig.applicationContext + '/nav/common/styles/images/3col_primary.jpg');
            palette.palette.setLayoutImage('secondary', win.WidgetPlacementConfig.applicationContext + '/nav/common/styles/images/2secondary_cols.jpg');
            palette.palette.registerCanAddWidgetFct(lang.hitch(this, '_buttonStatusHandler'));

            if (wp._freeLayout) {
               this.contentAreaChangeLayout = new ChangeLayoutAddContentPane({
                  imageContextRoot : this.imageContextRoot
               });
               this.contentAreaChangeLayout.registerCanAddWidgetFct(lang.hitch(this, '_buttonStatusHandler'));

               palette.palette.addTabPane(palette.CHANGE_LAYOUT_TAB, palette._resourceBundle.CHANGE_LAYOUT, this.contentAreaChangeLayout, false);
               aspect.after(palette.palette, '_switchToTab', lang.hitch(this, 'onSwitch'), true);
            }
         };

         this._paletteButtonListener = function(item) {
            if ('layout' == item.widgetType && wp._freeLayout) {
               palette.changeLayout(item);
            } else {
               palette.addWidget(item);
            }
         };

         this._buttonStatusHandler = function(item) {
            // handler passed to the palette to update the state of the buttons
            var enabled = false;
            if ('layout' == item.widgetType && wp._freeLayout) {
               enabled = palette.canSwitchLayout(item);
            } else {
               enabled = palette.canAdd(item);
            }

            return enabled;
         };

         this.onSwitch = function(id, evt) {
            if (palette.CHANGE_LAYOUT_TAB === id && wp._freeLayout) {
               // change layout view
               this.contentAreaChangeLayout.setJsonData(palette.getLayoutJsonData());
               this.contentAreaChangeLayout.populatePalette(false);
               // just check for disableItemCounter because of timing issues
               // when delivering sn.infra
               if (lang.isFunction(palette.palette.disableItemCounter)) {
                  palette.palette.disableItemCounter();
               }
            } else {
               // add Content view
               palette.palette.setJsonData(palette.getjsonData());
               palette.palette.populatePalette(false);
               topic.publish(Palette.prototype.RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT);
               topic.publish(Palette.prototype.RESET_COUNTER_EVENT);
            }
         };
      };

      // constants
      palette.TWO_COL_ID = '2columnLayout';
      palette.THREE_COL_ID = '3columnLayout';
      palette.THREE_COL_WITH_BANNER_ID = '3columnLayoutWithBanner';

      palette.THREE_COL_TOPMENU_ID = '3columnsTopMenuLayout';
      palette.THREE_COL_WITH_BANNER_TOPMENU_ID = '3columnsWithBannerTopMenuLayout';

      palette.ADD_WIDGET_TAB = 'widgetAddId';
      palette.CHANGE_LAYOUT_TAB = 'changeLayoutId';

      // attributes
      palette.messages = i18nwidgets;
      palette._resourceBundle = i18napplicationPalette;
      palette.uiLocation = null;

      // static functions
      palette.currentTabId = function() {
         var p = palette.palette;
         if (p && p._currentTab) {
            var tabId = p._currentTab.id;
            p = null;
            return tabId;
         }
         return null;
      };

      palette.hidePalette = function() {
         var temppp = function() {
            var temp = registry.byId('communityPalette');
            if (temp) {
               temp.destroy();
            }

            wp.destroyWidget('widgetPalette');

            palette.palette = null;
            palette.contentLoaded = false;
            palette.uiLocation = null;

            domAttr.set(dom.byId('widget-container-palette'), 'innerHTML', '');
            var displayActionsButton = dom.byId('displayActionsBtn');
            if (displayActionsButton) {
               displayActionsButton.focus();
            }
         };
         utilities.hide('communityPalette', false, false, temppp);

         return false;
      }

      palette.showPalette = function(tabIdToShow,uiLocation)
      {
    	var isHikari					= lconn.core.theme.isHikariTheme();
    	var container_id				= isHikari ? 'widget-container-app-palette-modal' : 'widget-container-palette';
    	var widget_name					= isHikari ? 'app-palette-modal' : 'palette';
    	var palette_modal_id 			= 'app_palette_dialog_modal';
    	var palette_modal_default_width = 'width:400px;overflow:hidden';
    	var dialog_html 				= '<div id="app_palette_dialog_modal"><span id="widget-container-app-palette-modal" class="widgetContainer" draggable="false" role="presentation" style="display:none;"></span></div>';
    	 
    	if(!dijit.byId(palette_modal_id) && isHikari)
    	{
    		var app_palette_modal = new Dialog({
    			style	: palette_modal_default_width	,
    			id		: palette_modal_id				,
    			content	: dialog_html
    		});
    		
    		app_palette_modal.show();
    	}
    
         if (uiLocation)
         {
            palette.uiLocation = uiLocation;
         }

         if (palette.CHANGE_LAYOUT_TAB !== tabIdToShow || !wp._freeLayout) {
            tabIdToShow = palette.ADD_WIDGET_TAB;
         }

        if(!palette.contentLoaded)
        {	 
        	if(dijit.byId(palette_modal_id) && dijit.byId(palette_modal_id).open == false && isHikari)
        	{
   				dijit.byId(palette_modal_id).show();
       		}
        	
            domStyle.set(dom.byId(container_id), 'display', 'none');
            wp.closeOtherViews();
            wp.registerCloseViewFunction = palette.hidePalette;

            var attributeArr = [{
               entryName : 'tabId',
               entryValue : tabIdToShow
            }];
            wp.getWidgetDocAndRenderWidget('widgetPalette', null, null, widget_name, null, 'skinless', null, false, attributeArr);

            utilities.processUntilAvailable(function() {

               // Show the palette and give the current tab focus
               utilities.show(container_id, false, true, false);
               if(isHikari)
               {
                   setTimeout(function()
                		   {
		                	   dijit.byId(palette_modal_id).resize();
		                	   document.querySelector('#communityPalette').style.width = '402px';
		                	   document.querySelector('#communityPalette').style.height = '820px';
		                	   document.querySelector('#communityPalette').style.overflowY = 'scroll';
		                	   dijit.byId(palette_modal_id).resize();
                		   },500);
               }
               palette.palette._switchToTab(tabIdToShow);

            }, 'dojo.byId("'+tabIdToShow+'") != null && dojo.query(".lotusPaletteWidget").length > 0');
        }
        else
        {
        	if(dijit.byId(palette_modal_id) && isHikari)
        	{
        		dijit.byId(palette_modal_id).show();
        	}
        	 
            if (palette.palette) {
               palette.palette._switchToTab(tabIdToShow);
            } else {
               logger.warn('Something went wrong so that the palette is missing.');
            }
         }
         return false;
      };

      palette.addWidget = function(item) {
         var canAdd = palette.canAdd(item);
         logger.debug('addWidget: canAdd=' + canAdd + ' for: ' + item.id);
         if (lang.isFunction(palette.palette.enableItemCounter)) {
            palette.palette.enableItemCounter();
         }
         if (canAdd) {
            var uiLocation = palette.uiLocation || ((item.widgetType == 'primary') ? 'col2' : 'col3');
            if (!dom.byId('widget-container-' + uiLocation)) {
               // IC 141574: use col2 if the column does not exist
               uiLocation = 'col2';
            }

            wp.addWidgetToServerAndRender(item.defId, uiLocation, item.hidden, item.instanceId);

            if (item.category == 'hidden' && item.hidden == 'true')
               item.hasAlreadyBeenUnhidden = 'true';

            logger.debug('addWidget: completed for: ' + item.id);
         }
      };

      palette.changeLayout = function(item) {
         var canSwitch = palette.canSwitchLayout(item);
         logger.debug('changeLayout: canSwitch=' + canSwitch + ' to: ' + item.id);

         if (canSwitch) {
            var newLayout = item.id[0];
            var refreshPage = function() {
               win.document.location.reload();
            };
            wp.changeLayout(newLayout, lang.hitch(this, refreshPage));
         }
      };
      
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

      var createCatItem = function(currentWidgetDef, hidden, idPrefix, instanceId, instanceName) {
         idPrefix = idPrefix || '';

         var defId = currentWidgetDef.defId;
         var iconUrl = currentWidgetDef.iconUrl;
         var subtituedIconUrl = ((iconUrl) ? _getI18nString(iconUrl) : null);

         var id = idPrefix + '_' + defId;
         var name = wp.utils.getDefaultWidgetName(currentWidgetDef);
         var i18nDesc = wp.utils.getResourcedStringForItem(currentWidgetDef, 'description');
         var desc = i18nDesc || currentWidgetDef.description || name;
         var uniqueInstance = (currentWidgetDef.uniqueInstance === 'true').toString();
         var widgetType = ((currentWidgetDef.primaryWidget === 'false') ? 'secondary' : 'primary');

         var catItem = {
            id : id,
            widgetId : defId,
            name : name,
            desc : desc,
            defId : defId,
            uniqueInstance : uniqueInstance,
            hidden : hidden,
            widgetType : widgetType
         };

         if (hidden == 'true') {
            catItem.widgetId = instanceId;
            catItem.category = 'hidden';
            catItem.instanceId = instanceId;
            if (instanceName != null) {
               catItem.name = HTMLUtil.escapeText(instanceName);
            }
            catItem.id = idPrefix + '_' + defId + '_' + instanceId;
         }

         if (subtituedIconUrl) {
            catItem.iconUrl = subtituedIconUrl;
         }

         return catItem;
      };

      var addToList = function(currentWidgetDef, availableWidgets, items) {
         var widgetCat = currentWidgetDef.category;
         if (widgetCat != null && widgetCat != '') {
            var categoryItem = null;
            for (var i = 0; items.categories != null && i < items.categories.length; i++) {
               var currentCat = items.categories[i];
               if (currentCat.id == widgetCat) {
                  categoryItem = currentCat;
                  break;
               }
            }
            if (categoryItem == null) {
               categoryItem = {
                  name : wp.utils.getResourcedStringForItem(currentWidgetDef, 'category'),
                  id : widgetCat,
                  widgets : []
               };
               items.categories.push(categoryItem);
            }
            categoryItem.widgets.push(createCatItem(currentWidgetDef, 'false', widgetCat, null, null));
         }

         availableWidgets.push(currentWidgetDef);
      };

      palette.getjsonData = function() {
         var items = {
            categories : [ {
               name : this.messages['widgetCat_AllWidgets'],
               id : 'allWidgetsCat',
               widgets : []
            } ]
         };

         var widgetDefs = wp.utils.getAllWidgetDefs();
         var availableWidgets = [];
         var hiddenWidgets = [];
         var isFilesMediaView_ic = properties['filesMediaView'];
         // org policy value on SC
         var isFilesMediaView_policy = widgetUserInfo['files.media.view.features.enabled'];

         // going through all the widgets
         for (var i = 0; widgetDefs.length != null && i < widgetDefs.length; i++) {
            var widgetDef = widgetDefs[i];
            var defId = widgetDef.defId;
            if (!defId) continue;

            if (widgetDef.showInPalette == 'false') {
               if (isFilesMediaView_policy == 'false' && defId == 'MediaGallery') {
                  // Add MG by letting the for loop iterate through
               }
               else
                  continue;
            }

            if (!wp.canAddWidget(widgetDef, win.WidgetPlacementConfig, true)) {
               continue;
            }

            var pageId = win.WidgetPlacementConfig.defaultPageId;
            var existingInstances = wp.utils.getWidgetInstancesByDef(defId, null, pageId);
            if (existingInstances == null || existingInstances.length == 0) {
               addToList(widgetDef, availableWidgets, items);
            } else if (existingInstances.length > 0) {
               for (var x = 0; x < existingInstances.length; x++) {
                  if (existingInstances[x].enabled == 'false') {
                     var instanceId = existingInstances[x].instanceId;
                     var instanceName = existingInstances[x].title;
                     hiddenWidgets.push(createCatItem(widgetDef, 'true', 'hidden', instanceId, instanceName));
                  }
               }
               if (widgetDef.uniqueInstance == null || widgetDef.uniqueInstance == 'false') {
                  addToList(widgetDef, availableWidgets, items);
               }
            }
         }

         // handle darklauch and IC mediaview disabled
         // Defaults: MG is disabled, Gallery is enabled
         // For deployments where mediaview features are off - show MG on the
         // shelf instead.
         if (isFilesMediaView_policy === 'false' || isFilesMediaView_ic !== 'enabled') {
            // remove gallery
            availableWidgets = array.filter(availableWidgets, function(item) {
               return (item.defId !== 'Gallery');
            });
         }

         // adding availableWidgets to the category
         array.forEach(availableWidgets, function(currentDef) {
            items.categories[0].widgets.push(createCatItem(currentDef, 'false', 'aval', null, null));
         });

         // taking care of hidden widgets
         if (hiddenWidgets.length > 0) {
            var newCat = {
               name : this.messages['widgetCat_hidden'],
               id : 'hiddenCat',
               widgets : []
            };
            items.categories.push(newCat);
            for (var i = 0; i < hiddenWidgets.length; i++) {
               newCat.widgets.push(hiddenWidgets[i]);
            }
         }

         return items;
      };

      palette.getLayoutJsonData = function() {
         // build the change layout view
         // reuse some of the stuffs implemented for widget view, hence the
         // mention to "widgets" here
         // we need to re-design the json string to use names more generic
         var appendix = ((win.SemTagSvcConfig && win.SemTagSvcConfig.isBidiRTL) ? 'RTL' : '');
         
         var currentTheme= themeSmartCloud.getThemeIdForOrg(win.WidgetPlacementConfig.resourceOrgId);
         var isHikari = ('hikari' === currentTheme || 'hikariTheme' === currentTheme
        		 || properties['com.ibm.lconn.communities.support.custom.themes.for.hikari']);
         
         var jsonData;

         if(is_communities_new_widget_layouts && isHikari){
        	 if('RTL' === appendix)
        		 appendix = '_'+appendix;
             jsonData= {
                 categories : [ {
                     name : '',
                     id : 'all',
                     widgets : [
                     {
                         id : palette.TWO_COL_ID,
                         name : palette._resourceBundle.TWO_COL_SIDE_MENU,
                         widgetId : '2col', /* not used but mandatory */
                         iconUrl : require.toUrl('ic-core/palette/images/2columns'+appendix+'.png'),
                         iconAlt : palette._resourceBundle.TWO_COL_SIDE_MENU_ALT,
                         desc : palette._resourceBundle.TWO_COL_SIDE_MENU_DESC,
                         multipleInstance : false, /* not used but mandatory */
                         widgetType : 'layout'
                      },
                      {
                          id : palette.THREE_COL_ID,
                          name : palette._resourceBundle.THREE_COL_SIDE_MENU,
                          widgetId : '3col',
                          iconUrl : require.toUrl('ic-core/palette/images/3columns'+appendix+'.png'),
                          iconAlt : palette._resourceBundle.THREE_COL_SIDE_MENU_ALT,
                          desc : palette._resourceBundle.THREE_COL_SIDE_MENU_DESC,
                          multipleInstance : false,
                          isDefault: true,
                          widgetType : 'layout'
                       },
                       {
                           id : palette.THREE_COL_WITH_BANNER_ID,
                           name : palette._resourceBundle.THREE_COL_SIDE_MENU_WITH_BANNER,
                           widgetId : '3colBanner',
                           iconUrl : require.toUrl('ic-core/palette/images/3columnsBanner'+appendix+'.png'),
                           iconAlt : palette._resourceBundle.THREE_COL_SIDE_MENU_WITH_BANNER_ALT,
                           desc : palette._resourceBundle.THREE_COL_SIDE_MENU_WITH_BANNER_DESC,
                           multipleInstance : false,
                           widgetType : 'layout'
                       },
                       {
                           id : palette.THREE_COL_TOPMENU_ID,
                           name : palette._resourceBundle.THREE_COL_TOP_MENU,
                           widgetId : 'top_nav_3col',
                           iconUrl : require.toUrl('ic-core/palette/images/3columnsTopMenu'+appendix+'.png'),
                           iconAlt : palette._resourceBundle.THREE_COL_TOP_MENU_ALT,
                           desc : palette._resourceBundle.THREE_COL_TOP_MENU_DESC,
                           multipleInstance : false,
                           isDefault: false,
                           widgetType : 'layout'
                        },
                        {
                           id : palette.THREE_COL_WITH_BANNER_TOPMENU_ID,
                           name : palette._resourceBundle.THREE_COL_TOP_MENU_WITH_BANNER,
                           widgetId : 'top_Nav_3colBanner',
                           iconUrl : require.toUrl('ic-core/palette/images/3columnsWithBannerTopMenu'+appendix+'.png'),
                           iconAlt : palette._resourceBundle.THREE_COL_TOP_MENU_WITH_BANNER_ALT,
                           desc : palette._resourceBundle.THREE_COL_TOP_MENU_WITH_BANNER_DESC,
                           multipleInstance : false,
                           isDefault: false,
                           widgetType : 'layout'
                        }
                 ]
              }
              ]
           };
           }else{
        	    jsonData= {
                        categories : [ {
                            name : '',
                            id : 'all',
                            widgets : [
                            {
                                id : palette.TWO_COL_ID,
                                name : palette._resourceBundle.TWO_COL,
                                widgetId : '2col', /* not used but mandatory */
                                iconUrl : require.toUrl('ic-core/palette/images/2column'+appendix+'.png'),
                                iconAlt : palette._resourceBundle.TWO_COL_ALT,
                                desc : palette._resourceBundle.TWO_COL_DESC,
                                multipleInstance : false, /* not used but mandatory */
                                widgetType : 'layout'
                             },
                             {
                                 id : palette.THREE_COL_ID,
                                 name : palette._resourceBundle.THREE_COL,
                                 widgetId : '3col',
                                 iconUrl : require.toUrl('ic-core/palette/images/3column'+appendix+'.png'),
                                 iconAlt : palette._resourceBundle.THREE_COL_ALT,
                                 desc : palette._resourceBundle.THREE_COL_DESC,
                                 multipleInstance : false,
                                 isDefault: true,
                                 widgetType : 'layout'
                              },
                              {
                                  id : palette.THREE_COL_WITH_BANNER_ID,
                                  name : palette._resourceBundle.THREE_COL_WITH_BANNER,
                                  widgetId : '3colBanner',
                                  iconUrl : require.toUrl('ic-core/palette/images/3columnBanner'+appendix+'.png'),
                                  iconAlt : palette._resourceBundle.THREE_COL_WITH_BANNER_ALT,
                                  desc : palette._resourceBundle.THREE_COL_WITH_BANNER_DESC,
                                  multipleInstance : false,
                                  widgetType : 'layout'
                              }
                        ]
                     }
                     ]
                  };
        	   
           }
         return jsonData;
      };

      palette.canAdd = function(widgetItem) {
         var returnValue = false;
         if (widgetItem.hasAlreadyBeenUnhidden == 'true') {
            returnValue = false;
         } else if (widgetItem.category == 'hidden' && widgetItem.hidden == 'true') {
            returnValue = true;
         } else {
            var pageId = win.WidgetPlacementConfig.defaultPageId;
            var existingInstances = wp.utils.getWidgetInstancesByDef(widgetItem.defId, null, pageId);
            returnValue = (existingInstances.length == 0) || (widgetItem.uniqueInstance == 'false');
         }

         logger.debug('returnValue: ' + returnValue + ' for id: ' + widgetItem.id);
         return returnValue;
      };

      palette.canSwitchLayout = function(widgetItem) {
         var returnValue = false;
         if (widgetItem.id && win.WidgetPlacementConfig.currentLayout != widgetItem.id) {
            returnValue = true;
         }

         logger.debug('returnValue: ' + returnValue + ' for layoutId: ' + widgetItem.id);
         return returnValue;
      };
      
      palette.handleWidgetAdded = function(widgetDefId) {
         if (palette.palette) {
            topic.publish(Palette.prototype.RECHECK_CAN_ADD_WIDGET_HANDLER_EVENT, widgetDefId);
            palette.palette.incCounter();
         }
      };


      var _postAddWidget = function(widgetDefId) {
		 palette.palette.setTabFocus();
      };
      wp.utils.registerCallback('addWidget', lang.hitch(palette, _postAddWidget));

      var _postRemoveWidget = function() {
         if (palette.palette) {
            palette.palette.setJsonData(palette.getjsonData());
            if (palette.ADD_WIDGET_TAB === palette.currentTabId()) {
               palette.palette.populatePalette(false);
            }
         }
      };
      wp.utils.registerCallback('removeWidget', lang.hitch(palette, _postRemoveWidget));

      lang.setObject('lconn.core.applicationPalette', palette);

      return palette;
   });
