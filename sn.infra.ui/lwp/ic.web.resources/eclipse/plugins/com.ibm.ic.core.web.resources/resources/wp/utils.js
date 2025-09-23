/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/kernel',
   'dojo/_base/lang',
   'dojo/_base/window',
   'dojo/_base/xhr',
   'dojo/Deferred',
   'dojo/dom',
   'dojo/dom-construct',
   'dojo/dom-style',
   'dojo/has',
   'dojo/i18n!../config/nls/widgetbundles',
   'dojo/i18n!../nls/strings',
   'dojo/i18n!../nls/widgets',
   'dojo/string',
   'dijit/Dialog',
   './configs',
   './_impl/layoutInfoStoreJsonImpl',
   './_impl/layoutInfoStoreXmlImpl',
   '../config/features',
   '../errorhandling',
   '../HTMLUtil',
   '../util/widgetPlacementConfig',
   '../xpath',
   'ic-gadget/container/iContainer2',
   'ic-gadget/util/trace',
   'ic-ui/MessageBox'
], function(array, kernel, lang, windowModule, xhr, Deferred, dom, domConstruct,
   domStyle, has, i18nwidgetbundles, i18nstrings, i18nwidgets, string, Dialog,
   wpConfig, layoutInfoStoreJsonImpl, layoutInfoStoreXmlImpl, has, errorhandling, 
   HTMLUtil, widgetPlacementConfig, xpath, iContainer, logger, MessageBox) {

   /**
    * IBM Connections Widget Placement Utilities
    * 
    * @namespace ic-core.wp.utils
    * @author Qi Xi <xiqish@cn.ibm.com>
    */

   var win = windowModule.global;
   var messages = i18nwidgets;
   var widgetMessages = null;
   var coreMessages = i18nstrings;

   var _creInited = false;
   var _dialog = null;

   /**
    * @function withIRuntime
    * @memberof ic-core.wp.utils
    * @return {dojo.Deferred}
    */
   var withIRuntime = function() {
      if (!_creInited) {
         iContainer.init();
      }

      var promise = iContainer.getIRuntime();
      promise.then(function() {
         _creInited = true;
      });

      if (!promise || 'function' !== typeof promise.then) {
         promise = new Deferred();
         promise.reject('_withIRuntime: failed to get iRuntime.');
      }
      return promise;
   };

   /**
    * @function getI18nString
    * @memberof ic-core.wp.utils
    * @param template {string}
    * @return {string}
    */
   var getI18nString = function(template) {
      // IC 120789: if the string contains json, stop processing it
      if (/{[^}]+:[^}]+}/.test(template))
         return template;

      var params = wpConfig('params'),
          newTemplate = template.replace(/{/g, '${');

      return string.substitute(newTemplate, params, function(v, k) {
         return (v ? v : '{' + k + '}');
      });
   };

   /**
    * @function getDisplayedUserInfo
    * @memberof ic-core.wp.utils
    * @return {Object}
    */
   var getDisplayedUserInfo = function() {
      var displayedUserInfo = null;
      if (wpConfig('isProfilesEnv')) {
         if (win.profilesData.displayedUser && !win.profilesData.displayedUser.profileType)
            win.profilesData.displayedUser.profileType = 'default';
         displayedUserInfo = win.profilesData.displayedUser;
      }
      return displayedUserInfo;
   };

   /**
    * @function getResourcedStringForItem
    * @memberof ic-core.wp.utils
    * @param widgetDef {Object}
    * @param attributeName {string}
    * @return {string}
    */
   var getResourcedStringForItem = function(widgetDef, attributeName) {
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

   /**
    * @function getResourcedStringForItem
    * @memberof ic-core.wp.utils
    * @param widgetDef {Object}
    * @param stringId {string}
    * @return {string}
    */
   var getResourcedStringById = function(widgetDef, stringId) {
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
    * @function getDefaultWidgetName
    * @memberof ic-core.wp.utils
    * @param widgetDef {Object}
    * @param [mode="default"] {mode}
    * @return {?string}
    */
   var getDefaultWidgetName = function(widgetDef, mode) {
      var widgetName = null;

      if (widgetDef) {
         widgetName = _getResourcedForItem(widgetDef, 'defId');
         if (widgetName && lang.isObject(widgetName)) {
            widgetName = widgetName[mode] || widgetName['default'];
         }
      }
      return widgetName;
   };

   /**
    * @function getEscapedWidgetName
    * @memberof ic-core.wp.utils
    * @param widgetDef {Object}
    * @param widgetInstance {Object}
    * @param [inline=false] {boolean}
    * @param [mode="default"] {mode}
    * @return {?string}
    */
   var getEscapedWidgetName = function(widgetDef, widgetInstance, inline, mode) {
      if ('undefined' === typeof inline)
         inline = false;
      return HTMLUtil.escapeInlineText(getWidgetName(widgetDef, widgetInstance, mode), inline);
   };

   /**
    * @function getWidgetName
    * @memberof ic-core.wp.utils
    * @param widgetDef {Object}
    * @param widgetInstance {Object}
    * @param [mode="default"] {mode}
    * @return {?string}
    */
   var getWidgetName = function(widgetDef, widgetInstance, mode) {
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
         widgetDef = widgetDef || utils.getWidgetDefByInstance(widgetInstance);
         widgetName = getDefaultWidgetName(widgetDef, mode);
      }
      return widgetName;
   };

   /**
    * Sort the array of widget instances according to the widget container since
    * the list of theme are usually intermixed when retrieved from server. The
    * widgets in the main column ('col2') are the first in the sorted list.
    * 
    * @function sortWidgetInstances
    * @memberof ic-core.wp.utils
    * @param instances {Array.<Object>} (perhaps) intermixed array of widgets
    * @return {Array.<Object>} sorted array of widgets
    */
   var sortWidgetInstances = function(instances) {
      var col2Widgets = [], col3Widgets = [], result = [];

      for (var i = 0; i < instances.length; i++) {
         var inst = instances[i];
         var uiLoc = inst.uiLocation;
         if (uiLoc === 'col2') {
            col2Widgets.push(inst);
         } else if (uiLoc === 'col3' && inst.defIdRef !== 'Members') {
            // Member widget is in column3, but is fixed so put it at the
            // start of the result array.
            col3Widgets.push(inst);
         } else {
            result.push(inst);
         }
      }

      result = result.concat(col2Widgets, col3Widgets);
      return result;
   };

   /**
    * @function setFocus
    * @memberof ic-core.wp.utils
    * @param widgetId {string}
    * @param elemId {string}
    */
   var setFocus = function(widgetId, elemId) {
      var section = dom.byId(widgetId + 'Section');
      if (section) {
         var elems = query('#' + elemId, section);
         if (elems && elems.length) {
            try {
               if (elems[0].focus)
                  elems[0].focus();
            } catch (e) {
               logger.error(e.message);
            }
         }
      }
   };

   /**
    * @function isThemeSupported
    * @memberof ic-core.wp.utils
    * @param widgetId {string}
    * @param elemId {string}
    * @return {boolean}
    */
   var isThemeSupported = function(theme, widgetDef) {
      if (!widgetDef) {
         return false;
      }

      var supportedThemes = widgetDef.themes;
      return (!supportedThemes || !theme || supportedThemes.indexOf(theme) !== -1);
   };

   /**
    * @function isModeSupported
    * @memberof ic-core.wp.utils
    * @param [mode] {string}
    * @param widgetDef {Object}
    * @param [strict=true] {boolean}
    * @return {boolean}
    */
   var isModeSupported = function(mode, widgetDef, strict) {
      if (!widgetDef) {
         return false;
      }

      if ('undefined' === typeof strict) {
         strict = true;
      }

      var supportedModes = widgetDef.modes || 'view';
      return ((!mode && !strict) || (mode && supportedModes.indexOf(mode) !== -1));
   };

   /**
    * @function setTitle
    * @memberof ic-core.wp.utils
    * @param title {string}
    */
   var setTitle = function(title) {
      // Only update title if running on Communities controlled page
      if (wpConfig('isCommunitiesPage') && win.ic_comm_communityName && title) {
         var titleString = '${0} - ${1}';
         var params = [title, win.ic_comm_communityName];
         win.document.title = string.substitute(titleString, params);
      }
   };

   /**
    * @function getUserProfileOverrideProperty
    * @memberof ic-core.wp.utils
    * @param propertyName {string}
    * @return {string}
    */
   var getUserProfileOverrideProperty = function(propertyName) {
      var propertyValue = null;
      if (wpConfig('userLoggedIn')) {
         if (win.widgetUserInfo != null) {
            var temp = win.widgetUserInfo[propertyName];
            if (temp == undefined || temp == 'undefined' || temp == null) {
               propertyValue = null;
            } else {
               propertyValue = temp;
            }
         } else if (wpConfig('userInfoXML') != null) {
            propertyValue = wpConfig('userInfoXML').documentElement.getAttribute(propertyName);
         } else {
            var callback = function(res) {
               wpConfig('userInfoXML', res);
               var temp = res.documentElement.getAttribute(propertyName);
               if (temp && temp !== 'undefined') {
                  propertyValue = temp;
               }
            };
            var url = wpConfig('userInfoUrl');
            request(url, {
               method : 'GET',
               handleAs : 'xml',
               sync : true
            }).then(callback, errorhandling.DefaultXHRErrorHandler);
         }
      }

      return propertyValue;
   };

   /**
    * @function isUpdatesPage
    * @memberof ic-core.wp.utils
    * @return {boolean}
    */
   var isUpdatesPage = function() {
      var pageId = wpConfig('pageId');
      return pageId && (pageId.indexOf('Updates') !== -1);
   };

   /**
    * @function showAddWidgetDialog
    * @memberof ic-core.wp.utils
    */
   var showAddWidgetDialog = function() {
      var dialogContent = '<div class="lotusDialogBorder" role="alert" aria-live="assertive">'
                        +    '<form class="lotusDialog lotusForm">'
                        +       '<h1>'
                        +          '<img src="' + wpConfig('applicationContext') + '/nav/common/styles/images/loading.gif" title="' + messages['widget_AddingWidget'] + '">'
                        +          messages['widget_AddingWidget']
                        +       '</h1>'
                        +    '</form>'
                        + '</div>';
      displayDialog(dialogContent);
   };

   /**
    * @function showRemoveWidgetDialog
    * @memberof ic-core.wp.utils
    */
   var showRemoveWidgetDialog = function() {
      var dialogContent = '<div class="lotusDialogBorder" role="alert" aria-live="assertive">'
                        +    '<form class="lotusDialog lotusForm">'
                        +       '<h1>'
                        +          '<img src="' + wpConfig('applicationContext') + '/nav/common/styles/images/loading.gif" title="' + messages['widget_AddingWidget'] + '">'
                        +          messages['widget_RemovingWidget']
                        +       '</h1>'
                        +    '</form>'
                        + '</div>';
      displayDialog(dialogContent);
   };

   /**
    * @function getDialog
    * @memberof ic-core.wp.utils
    * @param defId {string}
    * @return {boolean} whether the widget should show full delete confirmation dialogue.
    */
   var showFullWidgetDeleteConfirmation = function(defId) {
      var result = true;
      var widgetDef = utils.getWidgetDef(defId);
      if (widgetDef) {
         var showFullWidgetDeleteConfirmation = widgetDef.showFullWidgetDeleteConfirmation;
         if (showFullWidgetDeleteConfirmation === 'false') {
            result = false;
         }
      }

      return result;
   };

   /**
    * @function getDialog
    * @memberof ic-core.wp.utils
    * @return {ic-ui.Dialog}
    */
   var getDialog = function() {
      if (!_dialog) {
         var dialog1Container = dom.byId('dialog1Container');
         if (!dialog1Container) {
            dialog1Container = domConstruct.create('div', {
               id : 'dialog1Container'
            }, dom.byId('lotusContent'));
         }

         _dialog = new Dialog({
            id : 'dialog1',
            style : 'width: 500px'
         }, dialog1Container);
      }

      return _dialog;
   };

   /**
    * @function displayDialog
    * @memberof ic-core.wp.utils
    * @param dialogContent {string}
    * @return {ic-ui.Dialog}
    * @deprecated This method will be removed in 4.0.
    */
   var displayDialog = function(dialogContent) {
      var dialog = getDialog();
      if (dialog) {
         dialog.setContent(dialogContent);

         try {
            domStyle.set(dialog.titleBar, 'display', 'none');
         } catch (error) {
            logger.error(error);
         }

         dialog.show();
         var dialogButton = dom.byId('dialog1.button');
         if (dialogButton)
            dialogButton.focus();
      }
   };

   /**
    * @function hideDialog
    * @memberof ic-core.wp.utils
    * @return {ic-ui.Dialog}
    */
   var hideDialog = function() {
      var dialog = getDialog();
      if (dialog) {
         dialog.hide();
      }
   };

   /**
    * @function changeHash
    * @memberof ic-core.wp.utils
    * @param hash {(string|Object)}
    */
   var changeHash = function(hash) {
      var hashStr = '';
      if (lang.isObject(hash)) {
         hashStr = kernel.objectToQuery(hash);
      } else if (lang.isString(hash)) {
         hashStr = lang.trim(hash);
      }

      win.location.hash = hashStr;
   };

   var _showMessage = function (level, scope, title, detail, container, hideDetail, prepend) {
      if (lang.isString(container)) {
         container = dom.byId(container);
      }

      if (container) {
         var isError = ('error' === level);

         title = title || (isError ? messages['error.title.generic'] : null);
         if (!title) {
            return;
         }

         if (true !== prepend) {
            container.innerHTML = '';
         }

         var cLEVEL = (isError ? 'ERROR' : 'WARNING');
         var messageNode = domConstruct.create('div', null, container, 'first');
         var messageBox = new MessageBox({
            _strings: {
               icon_alt: coreMessages['rs_messagebox_' + level + '_a11y_label'],
               a11y_label: coreMessages['rs_messagebox_' + level + '_a11y_label']
            },
            type: MessageBox.TYPE[cLEVEL],
            msg: title,
            msgMore: detail
         }, messageNode);

         if (false !== hideDetail && detail) {
            messageBox.showMoreNode.click();
         }
      } else {
         logger.warn('Unable to show message in the container', container);
      }
   };

   var _showMessageInHeadline = function (level, title, detail, hideDetail, prepend) {
      _showMessage(level, 'global', title, detail, 'headline', hideDetail, prepend);
   };

   var _showMessageInWidget = function (instanceId, level, title, detail, hideDetail, prepend) {
      _showMessage(level, 'widget'+instanceId, title, detail, instanceId, hideDetail, prepend);
   };

   var utils = {
         withIRuntime : withIRuntime,

         getI18nString : getI18nString,
         getDisplayedUserInfo : getDisplayedUserInfo,
         getResourcedStringForItem : getResourcedStringForItem,
         getResourcedStringById : getResourcedStringById,
         getDefaultWidgetName : getDefaultWidgetName,
         getEscapedWidgetName : getEscapedWidgetName,
         getWidgetName : getWidgetName,
         isThemeSupported : isThemeSupported,
         isModeSupported : isModeSupported,
         getUserProfileOverrideProperty : getUserProfileOverrideProperty,
         isUpdatesPage : isUpdatesPage,

         sortWidgetInstances : sortWidgetInstances,
         setFocus : setFocus,
         changeHash : changeHash,
         setTitle : setTitle,

         showAddWidgetDialog : showAddWidgetDialog,
         showRemoveWidgetDialog : showRemoveWidgetDialog,
         showFullWidgetDeleteConfirmation : showFullWidgetDeleteConfirmation,
         getDialog : getDialog,
         displayDialog : displayDialog,
         hideDialog : hideDialog
   };

   /**
    * Get the object of widget definition with specific defId. <br>
    * <br>
    * Unless strongly need to inject a new document, it is recommended <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.
    * 
    * @function getWidgetDef
    * @memberof ic-core.wp.utils
    * @param defId {string}
    * @param [doc] {Object} The document where the data of all widgets and pages 
    * are stored in; if not provided, the default document will be used.
    * @return {Object} The object which contains the widget's definition 
    * metadata iff <code>defId</code> belongs to an existing widget definition, 
    * otherwise null 
    */

   /**
    * Get the object of widget instance with specific instanceId. If no of the 
    * instances have matched instanceId, will get the first widget instance with 
    * that string as defIdRef. <br>
    * <br>
    * Unless strongly need to inject a new document, it is recommended <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.<br>
    * Without assigning a <code>pageId</code>, the current pageId will be used; 
    * if current pageId is neither set, default pageId will be used.
    * 
    * @function getWidgetInstance
    * @memberof ic-core.wp.utils
    * @param instanceId {string}
    * @param [doc] {Object} The document where the data of all widgets and pages 
    * are stored in; if not provided, the default document will be used.
    * @param [pageId] {string} 
    * @return {Object} The object which contains the widget's instance iff
    * <code>instanceId</code> belongs to an existing widget instance, otherwise 
    * null.
    */

   /**
    * Get the array of objects of widget instances which is the instance of the 
    * widget definition (itself or its defId) provided. <br>
    * <br>
    * Unless strongly need to inject a new document, it is recommended <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.<br>
    * Without assigning a <code>pageId</code>, the current pageId will be used; 
    * if current pageId is neither set, default pageId will be used.
    * 
    * @function getWidgetInstancesByDef
    * @memberof ic-core.wp.utils
    * @param def {(string|Object)} an object of widget definition or its defId
    * @param [doc] {Object}
    * @param [pageId] {string}
    * @return {Array.<Object>} The array of objects which contain the widgets' 
    * instance metadata which are the instances of specific 
    * <code>definition</code>, otherwise an empty array
    */

   /**
    * Get the object of widget definition which is the definition of the widget 
    * instance (itself or its instanceId) provided.<br>
    * <br>
    * Unless strongly need to inject a new document, it is recommended <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.<br>
    * Without assigning a <code>pageId</code>, the current pageId will be used; 
    * if current pageId is neither set, default pageId will be used.
    * 
    * @function getWidgetDefByInstance
    * @memberof ic-core.wp.utils
    * @param instance {(string|Object)} an object of widget instance or its 
    * instanceId
    * @param [doc] {Object}
    * @param [pageId] {string}
    * @return {Object}
    */

   /**
    * Get the array of objects of widget instances in a specific page.<br>
    * <br>
    * Unless strongly need to inject a new document, it is recommended <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.<br>
    * Without assigning a <code>pageId</code>, the current pageId will be used; 
    * if current pageId is neither set, default pageId will be used.
    * 
    * @function getPageWidgetInstances
    * @memberof ic-core.wp.utils
    * @param [pageId=null] {string}
    * @param [doc=null] {Object}
    * @param [resourceSubType="default"] {string}
    * @return {Array.<Object>}
    */

   /**
    * Get the array of objects of all widget definitions. <br>
    * <br>
    * Unless strongly need to inject a new document, it is recommend <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.
	 * 
    * @function getAllWidgetDefs
    * @memberof ic-core.wp.utils
    * @param [doc] {Object}
    * @return {Array.<Object>}
    */

   /**
    * Add a new widget instance or unhide a hidden widget on a page.<br>
    * <br>
    * Unless strongly need to inject a new document, it is recommend <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.<br>
    * Without assigning a <code>pageId</code>, the current pageId will be used; 
    * if current pageId is neither set, default pageId will be used.<br>
    * Unless <code>unhide</code> is explicitly assigned true, 
    * <code>instance</code> can only be assign an object of widget instance.
    * 
    * @function addWidgetInstance
    * @memberof ic-core.wp.utils
    * @param instance {(Object|string)} an object of widget instance or its 
    * instanceId
    * @param [doc] {Object}
    * @param [pageId] {string}
    * @param [unhide=false] {boolean} whether the adding succeeds or not
    * @return {boolean}
    */

   /**
    * Remove a new widget instance or hide a widget on a page.<br>
    * <br>
    * Unless strongly need to inject a new document, it is recommend <b>NOT</b> 
    * to pass <code>doc</code>. To ensure that the default document is not null 
    * or it is of the latest version, call this function only after the promise 
    * {@link ic-core.wp.utils}.withLayoutInfo returns is resolved.<br>
    * Without assigning a <code>pageId</code>, the current pageId will be used; 
    * if current pageId is neither set, default pageId will be used.
    * 
    * @function removeWidgetInstance
    * @memberof ic-core.wp.utils
    * @param instanceId {string}
    * @param [doc] {Object}
    * @param [pageId] {string}
    * @param [hide=false] {boolean} whether the removal succeeds or not
    * @return {boolean}
    */

   /**
    * Get a promise with which all actions are executed along with the latest
    * document of widget defitions and instances. Usually there will be no 
    * retrieval from the server if it is already retrieved. Following are 2 
    * exceptions:<br>
    * 1. forceRefresh is set true.<br>
    * 2. window.staleXMLConfig is set true.<br>
    * It is also recommended to use {@link ic-core.wp.utils}.resetLayoutInfo if 
    * you want to force a refresh.
    * 
    * @function withLayoutInfo
    * @memberof ic-core.wp.utils
    * @param [forceRefresh=false] {boolean}
    * @param [errorhandler] {Function}
    * @return {dojo.Deferred}
    */

   /**
    * Reset the document of widget definitions and instances, so that the 
    * succeeding call of {@link ic-core.wp.utils}.withLayoutInfo will always be 
    * forced to retrieve the document from server.
    * 
    * @function resetLayoutInfo
    * @memberof ic-core.wp.utils
    */

   if (has('json-widget-metadata')) {
      lang.mixin(utils, layoutInfoStoreJsonImpl);
   } else {
      lang.mixin(utils, layoutInfoStoreXmlImpl);
   }

   lang.mixin(utils, (function initCustomFuncs() {
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
          * @memberof ic-core.wp.utils
          * @function registerFilter
          * @param {string} name
          * @param {Function} func
          */

         /**
          * 
          * @memberof ic-core.wp.utils
          * @function registerCallback
          * @param {string} name
          * @param {Function} func
          */

         /**
          * 
          * @memberof ic-core.wp.utils
          * @function registerHandler
          * @param {string} name
          * @param {Function} func
          */

         /**
          * 
          * @memberof ic-core.wp.utils
          * @function getFilters
          * @param {string} name
          * @returns {Array.<Function>}
          */

         /**
          * 
          * @memberof ic-core.wp.utils
          * @function getCallbacks
          * @param {string} name
          * @returns {Array.<Function>}
          */

         /**
          * 
          * @memberof ic-core.wp.utils
          * @function getHandlers
          * @param {string} name
          * @returns {Array.<Function>}
          */

         /**
          * 
          * @memberof ic-core.wp.utils
          * @function clearFilters
          * @param {string} name
          */

         /**
          * 
          * @memberof ic-core.wp.utils
          * @function clearCallbacks
          * @param {string} name
          */

         /**
          * 
          * @memberof ic-core.wp.utils
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

   lang.setObject('lconn.core.wp.utils', utils);

   return utils;

});