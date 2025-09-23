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

define([
   "dojo",
   "dojo/i18n"
], function (dojo, i18n) {

   dojo.deprecated("core.i18nOverrider", "Use standard resource bundle operations, stop requiring core.i18nOverrider.", "3.5");
   
   var i18nOverrider = {};
   
   /*
   if(i18nOverrider.originalFunction == null)
      i18nOverrider.originalFunction = dojo.i18n.getLocalization;
   
   dojo.i18n.getLocalization = function(packageName, bundleName, locale)
   {
      try {
         if (!bundleName && packageName) {
            dojo.deprecated("i18nOverrider", "Accessing dojo.i18n.getLocalization with an empty bundle name for '"+packageName+"' is deprecated and should be replaced with proper calls to dojo.i18n.getLocalization.", "3.5");
            return window[packageName];
         }
         
         //Bidi workaround for ROOT locale
         if(locale=="ROOT" && (bundleName == "islamic" || bundleName == "hebrew"))
          locale = djConfig.locale;
         
         var packages = packageName ? packageName.split(".") : [""];
         if (packages[0] == "lconn"){
            locale = locale || djConfig.locale;
            
            var config = dojo.getObject("net.jazz.ajax.config");
            var localOverride = (!(config && config.params && config.params.toLowerCase().indexOf("_localeoverride=false") > -1));
            
            // if "_localeoverride=false" then not transform locale 
            if (locale == "no" && localOverride) locale = "nb";
            if (locale == "pt" && localOverride) locale = "pt-pt";
           
            if (locale == "iw") locale = "he";
         }
         return i18nOverrider.originalFunction(packageName, bundleName, locale);
      } catch (e) {
         console.error("Unable to access bundle", e);
         throw e;
      }
   };
   
   /*
   dojo.i18n.getLocalization = function(packageName,bundleName, locale)
   {
      if(packageName == "dijit" || packageName == "dojo")
         return i18nOverrider.originalFunction(packageName,bundleName, locale);
         
      var resourceStringContent = bundleName;
      if(window[packageName] != null)
      //if(typeof(window[packageName]) != "undefined")
      {
         var resourceBundleTemp = window[packageName];
         //var temp = resourceBundleTemp[bundleName];
         //if(temp == "undefined" || typeof(temp) == "undefined")
         if(resourceBundleTemp != null && resourceBundleTemp != "undefined")
            return resourceBundleTemp;
         else
            return i18nOverrider.originalFunction(packageName,bundleName, locale);
      }
      else
         return i18nOverrider.originalFunction(packageName,bundleName, locale);
   }
   */
   i18nOverrider.getResourceString = function(resourceId)
   {
      throw "Use dojo.i18n.getLocalization(...) instead";
      //return dojo.i18n.getLocalization("lc_default",resourceId);
   };
   
   i18nOverrider.loadResourceStringsInParams = function(params, resourceBundleKeys)
   {   
      throw "Use dojo.i18n.getLocalization(...) instead";
      /*if(params == null)   
         params = new Array;
   
      for (var i = 0; resourceBundleKeys != null && i < resourceBundleKeys.length; i++) {
         var rawStr = dojo.i18n.getLocalization("default", resourceBundleKeys[i]);
         var noDups = rawStr.replace(/\'\'/g, "'");
         if(noDups == null || noDups == "")
            params.push([resourceBundleKeys[i], resourceBundleKeys[i] + " resourceKey not found"]);
         else
            params.push([resourceBundleKeys[i], noDups]);
      }
      
      return params;*/
   };
   
   
   /**
   var params = new Object();
   params["test1"] = "value1";
   params["test2"] = "value2";
   document.write(replaceParams("my test string {test1} and other {test2} and that it", params));
   */
   i18nOverrider.replaceParams = function(inputString, paramsMap)
   {
      dojo.deprecated("i18nOverrider.replaceParams", "Use dojo.string.substitute with ${} strings instead", "3.5");
      var openBracket = inputString.indexOf("{"); 
      
      if(openBracket != -1)
      {
         var closeBracket = inputString.indexOf("}");
         if(closeBracket == -1)
            return inputString;
            
         var currentParam = inputString.substring(openBracket+1, closeBracket);
         var currentParamValue = paramsMap[currentParam];
         
         // If the variable does not exist, keep {currentParam} in the string
         if(typeof currentParamValue == "undefined")
            currentParamValue = "{" + currentParam + "}";
         
         return inputString.substring(0, openBracket) +  currentParamValue + i18nOverrider.replaceParams(inputString.substring(closeBracket+1), paramsMap);
      }
      else    
         return inputString;
   };
   
   return i18nOverrider;
});
