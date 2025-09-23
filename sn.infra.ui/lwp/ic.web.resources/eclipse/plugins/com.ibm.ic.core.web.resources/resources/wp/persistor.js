/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/array',
   'dojo/_base/window',
   'dojo/Deferred',
   'dojo/has',
   'dojo/request',
   'dojo/topic',
   './configs',
   './events',
   './signals',
   './utils',
   '../config/features',
   '../errorhandling',
   'ic-gadget/util/trace'
], function(array, windowModule, Deferred, has, request, topic, wpConfig, events,
   signals, utils, hasFeature, errorhandling, logger) {

   var win = windowModule.global;

   // TODO: refactor urlPath generator
   var _contextRoot = {
      addWidget : '/addWidget.do?',
      removeWidget : '/removeWidget.do?',
      moveWidget : '/moveWidget.do?',
      savePreference : '/saveWidgetPreferences.do?',
      changeLayout : '/changeLayout.do?',
      processPage : '/widgetProcess.do?'
   };

   var _isFormatJSON = (function() {
      return has('json-widget-metadata');
   })();
   var _format = (_isFormatJSON ? 'json' : 'xml');

   signals.set('addWidgetInProgress', false);
   signals.set('removeWidgetInProgress', false);

   var _getUrlPath = function(action) {
      var path = wpConfig('applicationContext') + _contextRoot[action] 
               + 'resourceId=' + wpConfig('resourceId') + '&format=' + _format;
      return path;
   };

   var changeLayout = function(newLayoutId) {
      var promise = new Deferred();

      var params = {
            layout : newLayoutId
          };
      var queryString = ioQuery.objectToQuery(params);
      if (queryString) {
         queryString = '&' + queryString;
      }
      var dataUrl = _getUrlPath('changeLayout') + queryString;

      request(dataUrl, {
         method : 'POST',
         handleAs : _format
      }).then(function(resp) {
         wpConfig('lastMod', new Date().getTime());
         promise.resolve();
      }, errorhandling.DefaultXHRErrorHandler);

      return promise;
   };

   var addWidget = function(defId, uiLocation, unhide, instanceId) {
      // FIXME: remove the temporary solution
      if (lang.isArray(defId)) defId = defId[0];
      if (lang.isArray(uiLocation)) uiLocation = uiLocation[0];
      if (lang.isArray(unhide)) unhide = ('true' === unhide[0]);
      if (lang.isArray(instanceId)) instanceId = instanceId[0];

      var promise = new Deferred();

      if (!signals.get('addWidgetInProgress')) {
         signals.set('addWidgetInProgress', true);

         var params = {
               widgetDefId : defId,
               uiLocation : uiLocation
             };
         if (unhide) {
            params.unhide = unhide;
            if (instanceId) {
               params.instanceId = instanceId;
            }
         }
         var queryString = ioQuery.objectToQuery(params);
         if (queryString) {
            queryString = '&' + queryString;
         }
         var dataUrl = _getUrlPath('addWidget') + queryString;

         request(dataUrl, {
            method : 'POST',
            handleAs : _format
         }).then(function(resp) {
            signals.set('addWidgetInProgress', false);
            wpConfig('lastMod', new Date().getTime());

            var widgetInstanceId = null;
            if (_isFormatJSON) {
               widgetInstanceId = resp.widgetInstanceId;
            } else {
               widgetInstanceId = resp.documentElement.getAttribute('widgetInstanceId');
            }

            utils.withLayoutInfo(true).then(lang.hitch(this, function(){
               var widgetInstance = utils.getWidgetInstance(widgetInstanceId);
               if (!widgetInstance) {
                  widgetInstance = {
                        instanceId : widgetInstanceId,
                        defIdRef : defId,
                        uiLocation : uiLocation
                  };
                  utils.addWidgetInstance(widgetInstance, null, null, unhide);
               }

               topic.publish(events.WIDGET_ADDED_EVENT, defId);
               promise.resolve(widgetInstanceId);
            }));
         }, function(error) {
            signals.set('addWidgetInProgress', false);
            wpCRE.customAddWidgetErrorHandler(error);
            promise.reject();
         });
      } else {
         signals.set('addWidgetInProgress', false);
         promise.reject();
      }

      return promise;
   };

   var removeWidget = function(instanceId, removeWidgetData) {
      var promise = new Deferred();

      if (!signals.get('removeWidgetInProgress')) {
         signals.set('removeWidgetInProgress', true);

         var params = {
               widgetInstanceId : instanceId,
               removeWidgetData : removeWidgetData
             };
         var queryString = ioQuery.objectToQuery(params);
         if (queryString) {
            queryString = '&' + queryString;
         }
         var dataUrl = _getUrlPath('removeWidget') + queryString;

         request(dataUrl, {
            method : 'POST',
            handleAs : _format,
            headers : {
               'X-Update-Nonce' : win.dangerousurlnonce
            }
         }).then(function(resp) {
            var hide = !removeWidgetData;
            utils.removeWidgetInstance(instanceId, null, null, hide);
            signals.set('removeWidgetInProgress', false);
            wpConfig('lastMod', new Date().getTime());
            promise.resolve();
         }, function(error) {
            signals.set('removeWidgetInProgress', false);
            wpCRE.customAddWidgetErrorHandler(error);
            promise.reject();
         });
      } else {
         signals.set('removeWidgetInProgress', false);
         promise.reject();
      }

      return promise;
   };

   var moveWidget = function(instanceId, newUILocation, previousWidgetId) {
      var promise = new Deferred();

      var params = {
            widgetInstanceId : instanceId,
            newUiLocation : newUILocation
          };
      if (previousWidgetId) {
         params.afterWidgetInstanceId = previousWidgetId;
      }
      var queryString = ioQuery.objectToQuery(params);
      if (queryString) {
         queryString = '&' + queryString;
      }
      var dataUrl = _getUrlPath('moveWidget') + queryString;

      request(dataUrl, {
         method : 'POST',
         handleAs : _format
      }).then(function(resp) {
         wpConfig('lastMod', new Date().getTime());
         promise.resolve();
      }, errorhandling.DefaultXHRErrorHandler);
      return promise;
   };

   var savePreference = function(instanceId, change, update) {
      var promise = new Deferred();

      var params = {
            widgetInstanceId : instanceId
          };
      if (update) {
         params.update = true;
      }
      var queryString = ioQuery.objectToQuery(params);
      if (queryString) {
         queryString = '&' + queryString;
      }
      var dataUrl = _getUrlPath('savePreference') + queryString;

      var xmlContent = '';
      for (var name in change) {
         xmlContent += (name + '=_=' + change[name] + ',_,');
      }

      request(dataUrl, {
         method : 'PUT',
         headers : {
            'X-Update-Nonce' : win.dangerousurlnonce
         },
         data : xmlContent,
         sync : true
      }).then(
         function (resp) {
            utils.resetLayoutInfo();
            wpConfig('lastMod', new Date().getTime() + 'saveAttributes');
            promise.resolve(change);
         },
         function (err) {
            promise.reject(err);
         }
      );
      return promise;
   };

   var processPage = function(opts) {
      var promise = new Deferred();

      var params = {};
      if (wpConfig('resourceType')) {
         params.resourceType = wpConfig('resourceType');
      }
      if (wpConfig('pageId')) {
         params.page = wpConfig('pageId');
      }
      var queryString = ioQuery.objectToQuery(params);
      if (queryString) {
         queryString = '&' + queryString;
      }
      var dataUrl = _getUrlPath('processPage') + queryString;

      var st = ((opts && opts.st) ? opts.st : '');

      request(dataUrl, {
         method : 'GET',
         handleAs : 'json',
         headers : {
            'X-Shindig-ST' : st
         },
         sync : true
      }).then(function(jsonData) {
         if (jsonData.sc) {
            logger.error('Failed to get data from ' + dataUrl + ', error: \n' + jsonData.message);
            promise.reject(jsonData);
            return;
         }

         promise.resolve(jsonData);
      }, function(error) {
         logger.error('Failed to get data from ' + dataUrl + ', error: \n' + error);
         promise.reject(error);
      });

      return promise;
   };

   var persistor = {
         addWidget : addWidget,
         removeWidget : removeWidget,
         moveWidget : moveWidget,
         savePreference : savePreference,
         changeLayout : changeLayout,
         processPage : processPage
   };

   return persistor;

});