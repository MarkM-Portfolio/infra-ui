/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/window',
   '../config/features',
   '../config/properties',
   '../utilities'
], function(windowModule, hasFeature, properties, utilities) {

   var win = windowModule.global;

   var _serviceName = ((win.ibmConfig) ? win.ibmConfig.serviceName : null),
       _isCommunitiesPage = ('communities' === _serviceName),
       _isProfilesPage = ('profiles' === _serviceName);

   var _useServerInjection = true;
   var useServerInjectionParam = utilities.getURLParam('useServerInjection', true);
   if ('false' === useServerInjectionParam) {
     _useServerInjection = false;
   } else if ('true' === useServerInjectionParam) {
     _useServerInjection = true;
   } else if (_isProfilesPage || _isCommunitiesPage) {
     _useServerInjection = !('false' === properties['lconn.core.WidgetPlacement.'+_serviceName+'.useServerInjection']);
   }

   var _limitedDND = false;
   var limitedDNDParam = utilities.getURLParam('limitedDND', true);
   if ('false' === limitedDNDParam) {
     _limitedDND = false;
   } else if ('true' === limitedDNDParam) {
     _limitedDND = true;
   }

   var _freeLayout = true;
   var freeLayoutParam = utilities.getURLParam('freeLayout', true);
   if ('false' === freeLayoutParam) {
     _freeLayout = false;
   } else if ('true' === freeLayoutParam) {
     _freeLayout = true;
   }

   var configs = {
         useServerInjection : _useServerInjection,
         limitedDND : _limitedDND,
         freeLayout : _freeLayout,
         serviceName : _serviceName,
         isCommunitiesPage : _isCommunitiesPage,
         isProfilesPage : _isProfilesPage
   };

   var getConfig = function(name) {
      if (!name)
         return null;

      if (configs[name])
         return configs[name];

      return win.WidgetPlacementConfig[name];
   };

   var setConfig = function(name, value) {
      if (!name || configs[name])
         return;

      win.WidgetPlacementConfig[name] = value;
      return value;
   };

   var wpConfig = function() {
      var length = arguments.length;
      if (length === 1) {
         return getConfig(arguments[0]);
      } else if (length === 2) {
         return setConfig(arguments[0], arguments[1]);
      }

      return null;
   };

   return wpConfig;
 
});