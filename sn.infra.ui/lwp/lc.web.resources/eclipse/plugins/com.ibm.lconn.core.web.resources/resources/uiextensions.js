/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.uiextensions");

dojo.require("lconn.core.utilities");

if (!window.lc_ui_extensionsContainer)
	window.lc_ui_extensionsContainer = {};

lconn.core.uiextensions = {
   /**
    * @deprecated use invokeExtensions()
    */
   invokeExtesions: function(extensionName) {
      return lconn.core.uiextensions.invokeExtensions(extensionName);
   },
   
   /**
    * @return the extensions registered for this name.  The definition of each extension may differ.
    */
   get: function(extensionName) {
      if(window.lc_ui_extensionsContainer == null) {
         console.log("lconn.core.uiextensions.invokeExtensions: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
         return [];
      }
      
      return window.lc_ui_extensionsContainer[extensionName];
   },
   
   /**
    * @param eventName the name of an event
    * @param arg (optional) If specified, trigger this deferred object with the specified argument
    * @return a Deferred object for this event name.  This allows extenders to register
    *    functions that will be run once and only once in a given execution context.
    */
   when: function(eventName, arg) {
      var c = window.lc_ui_extensionsWhen;
      if (!c)
         c = window.lc_ui_extensionsWhen = {};
      var dfd = c[eventName];
      if (!dfd)
         dfd = c[eventName] = new dojo.Deferred();
      if (dfd.fired == -1 && typeof arg != "undefined")
         try {dfd.callback(arg);} catch (e) {console.error(e);}
      return dfd;
   },

   /**
    * Register an extension with a given name.  The extension value may be any set of input, and the 
    * extension consumer is responsible for defining what constitutes valid values.
    * @param extensionName a string representing the extension
    * @param ext A value representing an extension.
    */
   add: function(extensionName, ext) {
      var c = window.lc_ui_extensionsContainer;
      if (!c)
         c = window.lc_ui_extensionsContainer = {};
      var extensions = c[extensionName];
      if (!extensions)
         extensions = c[extensionName] = [];
      extensions.push(ext);
   },
   
   invokeExtensions: function(extensionName) {
   	if(window.lc_ui_extensionsContainer == null)
   	{
   		console.log("lconn.core.uiextensions.invokeExtensions: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
   		return;
   	}
   	
   	var extensions = window.lc_ui_extensionsContainer[extensionName];
   
   	for(var i = 0; extensions != null && i < extensions.length; i++)
   	{
   		var script = extensions[i].script;
   		var callbackText = extensions[i].callbackText;
   		
   		if(callbackText == null || callbackText == "")
   			continue;
   
         var temp = function()
         {
            if(script != null) //loads only once
               lconn.core.utilities.loadScript(script);
            
            var tempCallback = function(){
               eval(callbackText + "();");
            };
            //waits for the callback to be define by the js engine
            lconn.core.utilities.processUntilAvailable(tempCallback, "lconn.core.utilities.isDefined('" + callbackText + "')"); 
         };
   
         var invokeDelay = extensions[i].invokeDelay;
         
         if(invokeDelay != null && invokeDelay != "")
            setTimeout(temp, invokeDelay);
         else
            temp();
   		
   	}
   },

   areExtensionsEnabled: function(extensionName) {
   	if(window.lc_ui_extensionsContainer == null)
   	{
   		console.log("lconn.core.uiextensions.areExtensionsEnabled: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
   		return;
   	}
   	
   	var areExtensionsEnabled = false;
   	if(typeof(window.lc_ui_extensionsContainer) != "undefined" && window.lc_ui_extensionsContainer != null){
   		var extensions = window.lc_ui_extensionsContainer[extensionName];
   	
   		for(var i = 0; extensions != null && i < extensions.length; i++)
   		{
   			var callbackText = extensions[i].callbackText;
   			if(callbackText != null && callbackText != "" && typeof(callbackText ) != 'undefined')
   			areExtensionsEnabled = true;
   		}
   	}
   	return areExtensionsEnabled;
   },

   getParameters: function(extensionName, extensionId) {
   	if(window.lc_ui_extensionsContainer == null)
   	{
   		console.log("lconn.core.uiextensions.getParameters: lc_ui_extensionsContainer is not defined. plugin taglib must be missing.");
   		return;
   	}
   	var extensions = window.lc_ui_extensionsContainer[extensionName];
   
   	for(var i = 0; extensions != null && i < extensions.length; i++)
   	{
   		if(extensions[i] != null && extensions[i].id ==  extensionId)
   		{
   			return extensions[i].params;
   		}
   	}
   	return null;
   }
};
