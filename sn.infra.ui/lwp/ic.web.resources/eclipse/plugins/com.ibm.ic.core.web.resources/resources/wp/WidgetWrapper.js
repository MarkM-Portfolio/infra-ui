/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/declare',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/cookie',
   'dojo/dom',
   'dojo/dom-attr',
   'dojo/dom-class',
   'dojo/dom-style',
   'dojo/fx',
   'dojo/i18n!../nls/widgets',
   'dojo/on',
   'dojo/string',
   'dojo/text!./templates/OneUIWidgetWrapper.html',
   'dojo/text!./templates/SkinlessWidgetWrapper.html',
   'dijit/_TemplatedMixin',
   'dijit/_WidgetBase',
   'dijit/Menu',
   'dijit/MenuItem',
   'dijit/registry',
   './configs',
   './utils',
   '../help',
   '../utilities',
   'ic-gadget/util/trace',
   'ic-ui/util/openAround'
], function(array, declare, lang, windowModule, cookie, dom, domAttr, domClass,
   domStyle, fx, i18nwidgets, on, string, OneUITemplate, SkinlessTemplate,
   _TemplatedMixin, _WidgetBase, Menu, MenuItem, registry, wpConfig, utils, help,
   utilities, logger, openAround) {

   var win = windowModule.global;
   var messages = i18nwidgets;

   var _actionParams = [
         {
            name : 'toggle',
            label : messages['widgets_Min'],
            onClick : '_onToggle',
            shouldAdd : function() {
               return true;
            }
         },
         {
            name : 'refresh',
            label : messages['refresh'],
            onClick : '_onRefresh',
            shouldAdd : function() {
               return this._props.needRefresh;
            }
         },
         {
            name : 'edit',
            label : messages['edit'],
            onClick : '_onEdit',
            shouldAdd : function() {
               var canEdit = utils.isModeSupported('edit', this.widgetDef);
               return canEdit && this._props.canPersonalize;
            }
         },
         {
            name : 'changeTitle',
            label : messages['changeTitleAction'],
            onClick : '_onChangeTitle',
            shouldAdd : function() {
               var showTitleEdit = win.communityActionData && win.communityActionData.showWidgetTitleEdit;
               var defId = this.widgetDef.defId;
               showTitleEdit = showTitleEdit && !(defId == 'RecentUpdates' || defId == 'StatusUpdates');
               return showTitleEdit && this._props.canPersonalize;
            }
         },
         {
            name : 'view',
            label : messages['view'],
            onClick : '_onView',
            hidden : true,
            shouldAdd : function() {
               var canView = utils.isModeSupported('view', this.widgetDef);
               return canView && this._props.canPersonalize;
            }
         },
         {
            name : 'help',
            label : messages['help'],
            onClick : '_onHelp',
            shouldAdd : function() {
               return !!this._props.substitutedHelpLink;
            }
         },
         {
            name : 'moveup',
            label : messages['widgets_MoveUp'],
            onClick : '_onMoveUp',
            shouldAdd : function() {
               var showMove = this._props.isOptional && this._props.canPersonalize;
               showMove = showMove && (!this._props.isFixedPosition);
               return showMove;
            }
         },
         {
            name : 'movedown',
            label : messages['widgets_MoveDown'],
            onClick : '_onMoveDown',
            shouldAdd : function() {
               var showMove = this._props.isOptional && this._props.canPersonalize;
               showMove = showMove && (!this._props.isFixedPosition);
               return showMove;
            }
         },
         {
            name : 'moveprev',
            label : messages['widgets_MovePrev'],
            onClick : '_onMovePrev',
            shouldAdd : function() {
               var showMove = this._props.isOptional && this._props.canPersonalize;
               showMove = showMove && (!this._props.isFixedPosition);
               return showMove;
            }
         },
         {
            name : 'movenext',
            label : messages['widgets_MoveNext'],
            onClick : '_onMoveNext',
            shouldAdd : function() {
               var showMove = this._props.isOptional && this._props.canPersonalize;
               showMove = showMove && (!this._props.isFixedPosition);
               return showMove;
            }
         },
         {
            name : 'hide',
            label : messages['hide'],
            onClick : '_onHide',
            shouldAdd : function() {
               var showHide = this._props.isOptional && this._props.canPersonalize;
               return showHide;
            }
         },
         {
            name : 'remove',
            label : messages['link.remove'],
            onClick : '_onRemove',
            shouldAdd : function() {
               var showRemove = this._props.isOptional && this._props.canPersonalize;
               return showRemove;
            }
         }
   ];

   var _widgetManager = null;
   var _columnManager = null;

   var WidgetWrapper = declare(
      [_WidgetBase, _TemplatedMixin],
      {
         templateString : null,

         actionMenu : null,
         moreActions : null,

         _actions : {
            /* */
         },
         _props : {
            /* defId, instanceId, webInstanceId, widgetName, actionAlt,
             * isOptional, isMinimized, isHidden, needRefresh, isFixedPosition,
             * draggable, canPersonalize, substitutedHelpLink, skinTypes */
         },
         _resourceBundle : null,

         widgetDef : null,
         widgetInstance : null,
         opts : null,

         sectionNode : null,
         actionMenuNode : null,
         titleNode : null,
         moreActionsNode : null,
         subAreaNode : null,

         constructor : function() {
            if (!_widgetManager || !_columnManager) {
               throw error('WidgetWrapper is not inited properly, call WidgetWrapper.init() with right params.');
            }
            
            this._actions = {};
            this._props = {};
         },

         postMixInProperties: function() {
            this.inherited('postMixInProperties', arguments);

            if (this.widgetInstance && this.widgetDef) {
               var props = this._props;
               var instanceId = this.widgetInstance.instanceId;
               props.defId = this.widgetInstance.defIdRef;
               
               var isOptional = !!instanceId;
               props.isOptional = isOptional;
               props.instanceId = instanceId || props.defId;

               var mode = this.opts.mode;
               var webInstanceId = props.instanceId;
               if ('edit' === mode) {
                  webInstanceId += 'edit';
               }
               props.webInstanceId = webInstanceId;

               var widgetName = utils.getWidgetName(this.widgetDef, this.widgetInstance, true, mode || 'view');
               props.widgetName = widgetName;

               var actionsAlt = messages['actions_alt'] || 'Actions for: ${0}';
               props.actionsAlt = string.substitute(actionsAlt, [ widgetName ]);

               var isMinimized = ('true' === cookie(props.defId+'-isMinimized'));
               props.isMinimized = isMinimized;

               var isHidden = ('true' === this.widgetInstance.hidden);
               props.isHidden = isHidden;

               var userLoggedIn = wpConfig('userLoggedIn');
               var isLoginRequired = ('true' === this.widgetDef.displayLoginRequired);
               var needRefresh = userLoggedIn || !isLoginRequired;
               props.needRefresh = needRefresh;

               var isFixedPosition = ('true' === this.widgetDef.fixedPosition);
               props.isFixedPosition = isFixedPosition;

               props.draggable = this.opts.draggable;

               var helpLink = this.widgetDef.helpLink;
               if (helpLink) {
                  props.substitutedHelpLink = utils.getI18nString(helpLink);
               }

               var skinType = this.opts.skinType || 'use25OneUISkin';
               if ('use25OneUISkin' === skinType) {
                  this.templateString = OneUITemplate;
               } else if ('skinless' === skinType){
                  this.templateString = SkinlessTemplate;
               } else {
                  throw error('Unsupported skintype.');
               }
               props.skinType = skinType;

               var canPersonalize = this.opts.canPersonalize;
               props.canPersonalize = canPersonalize;
            }

            var actionsAlt = messages['actions_alt'] || 'Actions for: ${0}';
            actionsAlt = string.substitute(actionsAlt, [ widgetName ]);
            this._resourceBundle = {
                  actionsAlt : actionsAlt
            };
         },

         postCreate : function() {
            this.inherited(arguments);

            var props = this._props;
            if ('skinless' !== props.skinType) {
               this._initActionMenu();
            }

            var sectionNode = this.sectionNode;
            if (sectionNode) {
               domAttr.set(sectionNode, 'widgetid', props.instanceId);
               domAttr.set(sectionNode, 'id', props.webInstanceId+'Section');
               this.id = props.webInstanceId+'Section';

               if (props.isHidden) {
                  domClass.add(sectionNode, 'lotusHidden');
               }

               if (props.canPersonalize && props.draggable && props.isOptional) {
                  domAttr.set(sectionNode, 'dndType', 'widget');
                  domAttr.set(sectionNode, 'skipForm', 'true');
                  domAttr.set(sectionNode, 'dndData', props.instanceId);
                  domClass.add(sectionNode, 'dojoDndItem');
               }
            }

            var subAreaNode = this.subAreaNode;
            if (subAreaNode) {
               if (!props.needRefresh) {
                  subAreaNode.innerHTML = messages['msg.loginRequired'];
               } else if (!props.minimized || 'skinless' === props.skinType){
                  subAreaNode.innerHTML = _widgetManager._addiWidgetMicroformat(props.instanceId);
               }

               var widgetLoaded = (props.needRefresh && !props.isMinimized);
               var widgetNeedRefresh = (props.needRefresh && props.isMinized);
               domAttr.set(subAreaNode, 'widgetloaded', widgetLoaded+'');
               domAttr.set(subAreaNode, 'widgetneedrefresh', widgetNeedRefresh+'');

               if (props.canPersonalize && props.draggable && props.isOptional) {
                  domStyle.set(subAreaNode, '-webkit-user-select', 'auto');
               }
            }
         },

         _initActionMenu : function() {
            var menu = new Menu({
               id : this._props.webInstanceId+'moreActions',
               style : 'display:none',
               'aria-label' : 'More Actions Menu'
            }, this._props.webInstanceId+'moreActions');
            this.moreActionsNode = menu.domNode;

            array.forEach(_actionParams, lang.hitch(this, function(param) {
               var shouldAdd = (lang.hitch(this, param.shouldAdd))();
               if (shouldAdd) {
                  var actionOption = this._createActionOption(param);
                  this._actions[param.name] = actionOption;
                  menu.addChild(actionOption);
               }
            }));

            this.own(
               on(this.actionMenuNode, 'click', lang.hitch(this, 'openMenu')),
               on(this.actionMenuNode, 'keydown', lang.hitch(this, 'openMenu'))
            );
         },

         _createActionOption : function(action) {
            if (lang.isString(action)) {
               action = _actionParams[action];
            }

            if (!action || !lang.isObject(action)) {
               return;
            }

            var item = new MenuItem({
               label : action.label,
               'class' : action.name + '_button',
               'style' : (action.hidden ? 'display:none' : ''),
               onClick : lang.hitch(this, function(evt) {
                  utilities.hide(this._props.webInstanceId+'moreActions', true, true);
                  this[action.onClick] && this[action.onClick](evt);
                  win.setTimeout(lang.hitch(this, function() {
                     this._focusMenu();
                  }), 0);
               })
            });

            if (action.name === 'toggle') {
               item.id = this._props.webInstanceId + '_toggleAction';
            }

            return item;
         },

         _updateActions : function() {
            var props = this._props;
            var uiLocation = _widgetManager.getUILocation(props.instanceId);
            if (!uiLocation) {
               logger.error('Unable to find where the widget instance is for "' + props.instanceId + '"');
               return;
            }

            var widgetLocation = _widgetManager.getWidgetLocation(props.instanceId, uiLocation);
            if (widgetLocation) {
               // update move up and move down button
               var moveup, movedown;               
               if (this._actions['moveup'] && this._actions['movedown']) {
                  moveup = this._actions['moveup'].domNode;
                  movedown = this._actions['movedown'].domNode;
               }

               if (moveup && movedown) {
                  switch (widgetLocation) {
                     case 'alone':
                        domStyle.set(moveup, 'display', 'none');
                        domStyle.set(movedown, 'display', 'none');
                        break;
                     case 'top':
                        domStyle.set(moveup, 'display', 'none');
                        domAttr.remove(movedown, 'style');
                        domStyle.set(movedown, '-moz-user-select', 'none');
                        break;
                     case 'bottom':
                        domAttr.remove(moveup, 'style');
                        domStyle.set(moveup, '-moz-user-select', 'none');
                        domStyle.set(movedown, 'display', 'none');
                        break;
                     case 'middle':
                        domAttr.remove(movedown, 'style');
                        domStyle.set(movedown, '-moz-user-select', 'none');
                        domAttr.remove(moveup,'style');
                        domStyle.set(moveup, '-moz-user-select', 'none');
                        break;
                  }
               }

               // update move up and move down button
               var moveprev, movenext;               
               if (this._actions['moveprev'] && this._actions['movenext']) {
                  moveprev = this._actions['moveprev'].domNode;
                  movenext = this._actions['movenext'].domNode;
               }

               var nowhereToMove = (!_columnManager.getSiblingColumn(uiLocation, 0));
               if (moveprev && movenext) {
                  if (wpConfig('limitedDND') || nowhereToMove) {
                     domStyle.set(moveprev, 'display', 'none');
                     domStyle.set(movenext, 'display', 'none');
                  }
               }
            }

            utils.withIRuntime().then(lang.hitch(this, function(iRuntime) {
               var cre_widget = iRuntime.getWidgetById(this._instId);
               var edit, view;               
               if (this._actions['edit'] && this._actions['view']) {
                  edit = this._actions['edit'].domNode;
                  view = this._actions['view'].domNode;
               }

               if (edit && view && cre_widget) {
                  var mode = cre_widget.widgetObjet.getIContext().getiDescriptor().getItemValue('mode');
                  switch (mode) {
                     case 'edit':
                        domAttr.set(view, 'style', '');
                        domStyle.set(edit, 'display', 'none');
                        break;
                     case 'view':
                        domAttr.set(edit, 'style', '');
                        domStyle.set(view, 'display', 'none');
                        break;
                  }
               }
            }));
         },

         changeTitle : function(title) {
            if (!this.titleNode) {
               return;
            }

            if (this.titleNode.textContent) {
               this.titleNode.textContent = title;
            } else {
               this.titleNode.innerText = title;
            }
         },

         openMenu : function(event) {
            this._updateActions();

            var props = this._props;
            var actionMenuNode = this.actionMenuNode;
            domAttr.set(actionMenuNode, 'aria-expanded', 'true');
            domAttr.set(actionMenuNode, 'aria-owns', props.instanceId + '_dropdown');
            var dojoWidgetId = props.instanceId + 'moreActions';
            var dojoWidget = registry.byId(dojoWidgetId);
            var onCloseHandler = on(dojoWidget, 'Close', function() {
               domAttr.set(actionMenuNode, 'aria-expanded', 'false');
               domAttr.remove(actionMenuNode, 'aria-owns');
               onCloseHandler.remove();
            });

            if (event) event = dojo.fixEvent(event);
            openAround(dojoWidgetId, null, null, event);
         },

         updateActions : function() {
            this._updateActions();
         },

         toggle : function(hideWidget) {
            this._onToggle(hideWidget);
         },

         refresh : function() {
            var instanceId = this._props.instanceId;
            utilities.show(instanceId + 'SubArea', true, true, true);
            this.subAreaNode.innerHTML = _widgetManager._addiWidgetMicroformat(instanceId);
            domAttr.set(this.subAreaNode, 'widgetloaded', 'true');
         },

         unhide : function() {
            if (domClass.contains(this.sectionNode, 'lotusHidden')) {
               domClass.remove(this.sectionNode, 'lotusHidden');
            }
         },

         destroy : function(opts) {
            if (opts.destroyDropDownMenu) {
               var moreActions = this.moreActionsNode;
               var dijitMoreActions = registry.byNode(moreActions);
               dijitMoreActions && dijitMoreActions.destroy();

               var toggleAction = this._actions['toggle'];
               toggleAction && toggleAction.destroy();
            }

            if (opts.destroySubArea && this.subAreaNode) {
               this.subAreaNode.innerHTML = '';
            }

            var htmlElement = this.sectionNode;
            if (htmlElement) {
               var cleanStage = function() {
                  if (htmlElement.parentNode) {
                     htmlElement.parentNode.removeChild(htmlElement);
                  }
               };

               fx.wipeOut({
                  node : htmlElement,
                  duration : 300,
                  onEnd : cleanStage
               }).play();
            }
         },

         _onToggle : function(hideWidget) {
            var menuItem = this._actions['toggle'];
            if (domStyle.get(this.subAreaNode, 'display') === 'none') {
               cookie(this._props.defId + '-isMinimized', 'false');
               var widgetloaded = this.subAreaNode.getAttribute('widgetloaded');
               var widgetneedrefresh = this.subAreaNode.getAttribute('widgetneedrefresh');
               if (widgetneedrefresh == null)
                  widgetneedrefresh = 'true';

               if (widgetloaded === 'false' && widgetneedrefresh === 'true') {
                  var temp = function() {
                     _widgetManager.refresh(this._props.instanceId);
                     if (hideWidget) {
                        domStyle.set(this.subAreaNode, 'display', 'none');
                        menuItem.setLabel(messages['widgets_Max']);
                     } else {
                        domStyle.set(this.subAreaNode, 'display', '');
                        menuItem.setLabel(messages['widgets_Min']);
                     }
                  };

                  utils.withLayoutInfo().then(temp);
               } else {
                  domStyle.set(this.subAreaNode, 'display', '');
                  menuItem.setLabel(messages['widgets_Min']);
               }
            } else {
               cookie(this._props.defId + '-isMinimized', 'true');
               domStyle.set(this.subAreaNode, 'display', 'none');
               menuItem.setLabel(messages['widgets_Max']);
            }
         },

         _onRefresh : function() {
            _widgetManager.refreshWidget(this._props.instanceId);
         },

         _onView : function() {
            utils.withIRuntime().then(lang.hitch(this, function(iRuntime) {
               var widget = iRuntime.getWidgetById(this._props.instanceId);
               if (widget) {
                  widget.widgetObject.getIContext().iEvents.fireEvent('onModeChanged', '', {'newMode': 'view'});
               }
            }));
         },

         _onEdit : function() {
            utils.withIRuntime().then(lang.hitch(this, function(iRuntime) {
               var widget = iRuntime.getWidgetById(this._props.instanceId);
               if (widget)  {
                  widget.widgetObject.getIContext().iEvents.fireEvent('onModeChanged', '', {'newMode': 'edit'});
               }
            }));
         },

         _onHelp : function() {
            // Strip off lang parameter as launchHelp will add one
            var url = this._props.substitutedHelpLink;
            var langPos = (url ? url.indexOf('&lang') : -1);
            if (langPos > 0) {
               url = url.substr(0, langPos);
            }
            help.launchHelp(url);
         },

         _onMoveUp : function() {
            _widgetManager.moveWidgetUp(this._props.instanceId);
         },

         _onMoveDown : function() {
            _widgetManager.moveWidgetDown(this._props.instanceId);
         },

         _onMoveNext : function() {
            _widgetManager.moveWidgetToNextColumn(this._props.instanceId);
         },

         _onMovePrev : function() {
            _widgetManager.moveWidgetToPrevColumn(this._props.instanceId);
         },

         _onChangeTitle : function() {
            _widgetManager.changeWidgetTitle(this._props.instanceId);
         },

         _onRemove : function() {
            _widgetManager.removeWidget(this._props.instanceId, true);
         },

         _onHide : function() {
            _widgetManager.removeWidget(this._props.instanceId, false);
         },

         _focusMenu : function() {
            win.setTimeout(lang.hitch(this, function(){
               this.actionMenuNode.focus();
            }), 0);
         }
      });

	WidgetWrapper.init = function(widgetManager, columnManager) {
      _widgetManager = widgetManager;
      _columnManager = columnManager;
   };

   return WidgetWrapper;

});