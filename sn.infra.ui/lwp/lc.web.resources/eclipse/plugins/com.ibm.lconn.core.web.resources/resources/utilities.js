/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2006, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.utilities");

dojo.require("dojo.fx");
dojo.require("lconn.core.i18nOverrider");
dojo.require("lconn.core.url");

lconn.core.utilities.getHash = function() {
   var href = document.location.href;
   var i = href.indexOf("#");
   if (i == -1)
      return "";
   return href.substring(i+1);
};

lconn.core.utilities.getURLParam = function(paramName, checkFragment)
{
   var uri = lconn.core.url.parse(window.location.href);
   var value = uri.queryParameters[paramName];
   if (checkFragment && value === undefined && uri.fragment) {
      value = lconn.core.url.splitQuery(uri.fragment)[paramName];
      if (value === undefined) {
         try {
            // Tolerate URI-component encoded fragments (param%3dvalue)
            var decodedFragment = decodeURIComponent(uri.fragment);
            if (decodedFragment != uri.fragment)
               value = lconn.core.url.splitQuery(decodedFragment)[paramName];
         } catch(e) { }
      }
   }
   if (dojo.isArray(value))
      return value[0];
   return value;
}

lconn.core.utilities.isCSSSpriteOn = function()
{
	var img = document.createElement("img");
	img.className = "lotusSprite lotusSprite-iconPublic16";
	img.style.display = "none";
	document.body.appendChild(img);
	var pos = dojo.style(img).backgroundPosition;
	var isSpritingEnabled = pos && pos != "0px 0px";
	return isSpritingEnabled;
}

lconn.core.utilities.replacePlaceHolders = function(inputString, arrayOfValues)
{
	var params = new Object();
	
	for (var i = 0; arrayOfValues != null && i < arrayOfValues.length; i++) 
	{
		params[""+i+""] = arrayOfValues[i];
	}
	return lconn.core.i18nOverrider.replaceParams(inputString, params);
}

//looks for an element until its loaded by the browser
// example: lconn.core.utilities.processUntilElementIsFound("myMissingDomElementId", mycallbackFunction, parametersforCallbackFunction);
lconn.core.utilities.processUntilElementIsFound = function(elementId, callback, iContext, params, pThrowIfExhausted, pWaitBetweenTries, pMaxTries)
{
	if( typeof(callback) != "function" ) return; // nothing to call back, so just get out
	
	// defaults
	var waitBetweenTries = 500; // milliseconds
	var maxTries = 20; // intervals before giving up
	var throwIfExhausted = true; // throw err exhausted all tries 	
	if( typeof(pWaitBetweenTries) == "number") waitBetweenTries = pWaitBetweenTries;  // override if supplied parameter
	if( typeof(pMaxTries) == "number") maxTries = pMaxTries;  // override if supplied parameter
	if( typeof(pThrowIfExhausted) == "boolean") throwIfExhausted = pThrowIfExhausted;  // override if supplied parameter
	
	var intervalId = "";
	var tried = 0;
	
	var element = null;
	if(iContext != null)
		element = iContext.getElementById(elementId);
	else
		element = dojo.byId(elementId);
		
	if(element != null)
	{
		callback(element, params);
		return;
	}
			
	intervalId = window.setInterval(function()
	{		
		var element = null;
		if(iContext != null)
			element = iContext.getElementById(elementId);
		else
			element = dojo.byId(elementId);
			
		tried++;
		if(element != null)
		{
			window.clearInterval(intervalId);
			callback(element, params);
		}
		else if(tried == maxTries)
		{
			window.clearInterval(intervalId);
			if( throwIfExhausted ) throw new Error( "lconn.core.utilities.processUntilElementIsFound: elementId was never found: " + elementId );
		}
	},waitBetweenTries);
}

//looks for a test case until its true, then executes a callback
// example: lconn.core.utilities.processUntilAvailable(mycallbackFunction, "(window.myObject != null))", parametersforCallbackFunction);
lconn.core.utilities.processUntilAvailable = function(callback, test, passedInParam, pThrowIfExhausted, pWaitBetweenTries, pMaxTries) 
{
	if( typeof(callback) != "function" ) return; // nothing to call back, so just get out
	
	// defaults
	var waitBetweenTries = 500; // milliseconds
	var maxTries = 20; // intervals before giving up
	var throwIfExhausted = true; // throw err exhausted all tries 	
	if( typeof(pWaitBetweenTries) == "number") waitBetweenTries = pWaitBetweenTries;  // override with supplied parameter
	if( typeof(pMaxTries) == "number") maxTries = pMaxTries;  // override with supplied parameter
	if( typeof(pThrowIfExhausted) == "boolean") throwIfExhausted = pThrowIfExhausted;  // override with supplied parameter
	 
	var intervalId = "";
	var tried = 0;
	
	if(eval(test))
	{
		if(passedInParam != null)
			callback(passedInParam);
		else
			callback();
		return;			
	}
	
	intervalId = window.setInterval(function()
	{		
		tried++;
		if(eval(test))
		{	
			window.clearInterval(intervalId);
			if(passedInParam != null)
				callback(passedInParam);
			else
				callback();				
		}
		else if(tried == maxTries)
		{
			window.clearInterval(intervalId);
			if( throwIfExhausted ) throw new Error( "lconn.core.utilities.processUntilAvailable: test was never met: " + test );
		}
	}, waitBetweenTries);
}

lconn.core.utilities.gotoURL = function(url, ignoreLastMod)
{	
	//document.cookie = 'ProfilesReqURL=' + document.location.href + '; path=/';
	//document.location.href = applicationContext + '/html/loginView.do?lang=' + appLang;
	
	if(ignoreLastMod == null)
	{
		if(url.indexOf("?") != -1)
			url += "&ver=" + profilesData.config.buildNumber + "&lastMod=" + profilesData.config.profileLastMod;
		else
			url += "?ver=" + profilesData.config.buildNumber + "&lastMod=" + profilesData.config.profileLastMod;
	}
	
	if(dojo.isIE)
	{
		var SideBar_RedirectUrl = url;
		setTimeout("window.location.href = SideBar_RedirectUrl", 0 );
	}
	else
		window.location.assign(url);
};
	
lconn.core.utilities.toggleVisibility = function (divID, visibilityOnly)
{
	var element = null;
	if((typeof divID) == "string")
		element = dojo.byId(divID);
	else
		element = divID;

	if(element)
	{
		if(element.style.visibility == "hidden")
			lconn.core.utilities.show(element, visibilityOnly);
		else
			lconn.core.utilities.hide(element, visibilityOnly);		
	}
	return false;
};

lconn.core.utilities.hide = function(divID, visibilityOnly, nofx, callBack)
{
	var element = null;
	if((typeof divID) == "string")
		element = dojo.byId(divID);
	else
		element = divID;
	if(element != null)
	{
		var temp383 = function()
		{
			element.style.visibility = "hidden";
			if(!visibilityOnly)
				element.style.display = "none";
			if(callBack != null)
				callBack();
		};
		if(nofx == null || nofx == false)
		{
			var temp3892387 = dojo.fx.wipeOut({node: element, duration: 300, onEnd: temp383});
			temp3892387.play();
		}
		else
			temp383();
	}
	return false;
};

lconn.core.utilities.show = function(divID, visibilityOnly, retryUntilElementFound, nofx, callBack)
{
	var tried = 0;
			
	var element = null;
	if((typeof divID) == "string")
		element = dojo.byId(divID);
	else
		element = divID;
	if(retryUntilElementFound && element == null)
	{
		var intervalId = "";
		intervalId = window.setInterval(function()
		{		
			tried++;
			
			if((typeof divID) == "string")
				element = dojo.byId(divID);
			else
				element = divID;
				
			if(element != null)
			{
				window.clearInterval(intervalId);
				lconn.core.utilities.show(element, visibilityOnly, false, nofx, callBack);
			}
			else if(tried == 20)
				window.clearInterval(intervalId);
		},300);
	}
	else if(element != null)
	{
		var temp222 = function()
		{
			element.style.visibility = "visible";
			if(!visibilityOnly)
				element.style.display = "block";
			if(callBack != null)
				callBack();
		};
		if(nofx == null || nofx == false)
		{
			var temp893j = dojo.fx.wipeIn({node: element, duration: 300});
			temp893j.play();
			//console.log("show - play");
		}
		else
			temp222();		
	}
	return false;
};


lconn.core.utilities.loadScript = function(script) 
{
	if(this.scripts == null) this.scripts = {};
	if (!this.scripts[script]) {
		this.scripts[script] = true;
		var scriptElem = document.createElement("script");
		scriptElem.src = script;
		document.body.insertBefore(scriptElem, document.body.firstChild);
	}
};

/**
 * Given a filename, return the lower cased extension.  If the extension is empty this will return
 * an empty string.  Extra spaces will also be removed.
 */
lconn.core.utilities.getExtension = function(s)
{
   if (!s) return "";
   var i = s.lastIndexOf(".");
   if (i != -1)
      return dojo.trim(s.substring(i+1).toLowerCase());
   return "";
}

/**
 * Given a filename, return the correct CSS classname for an icon to this type to the sprite.
 */
lconn.core.utilities.getFileIconClassName = function(filename, size)
{
   var size = size || 16;
   var extension = lconn.core.utilities.getExtension(filename);
   extension = extension.replace(/[^a-z0-9]/g,'-');
   var classTemplate = "lconn-ftype{size} lconn-ftype{size}-{ext}";
   var className = classTemplate.replace(/\{size\}/g, size).replace(/\{ext\}/g, extension);
   return className;
}

lconn.core.utilities.getGridActionClass = function(actionname, size){
   var size = size || 16;
   var extension = lconn.core.utilities.getExtension(actionname);
   extension = extension.replace(/[^a-z0-9]/g,'-');
   var classTemplate = "grid-a-{ext}";
   var className = classTemplate.replace(/\{ext\}/g, extension);
   return className;
}

lconn.core.utilities.isDefined = function(variableName) 
{
	//TODO change recursion so that it start from the last child and works up to the parent, 
	//instead of just checking only the parent and the child and not everything in between
	var indexofdot = variableName.indexOf(".");
	var parentDefined = true; 
	if(indexofdot != -1) // there is a dot, check if parent is defined
	{
		parentDefined = lconn.core.utilities.isDefined(variableName.substring(0,indexofdot));
		if(parentDefined)
		{
			var temp33 = eval("typeof( " + variableName + ") != 'undefined'");
			return temp33;
		}
		else
			return false;
	}
	else//there is no parent
	{
		return (window[variableName] != null);
	}
};



// Defect 94579.  Dojo code just looks for the existence of DOMParser in the window object.  
// Starting with IE9, IE has this object now, but it isn't setting the character encoding correctly
// so UTF-8 encoded xml has a charset set to windows 1252, which causes an error when trying to transform
// it.  So we need to force the use of the ActiveX object to parse the xml.
dojo.require("dojox.xml.parser");
if (dojo.isIE && dojo.exists("dojox.xml.parser") && "DOMParser" in dojo.global) {
	dojox.xml.parser["parse.orig"] = dojox.xml.parser.parse;
	dojox.xml.parser.parse = function(str, mimetype) {
		try {
			// taken from dojo dojox.xml.parser.parse function
			var doc;
			var ms = function(n){ return "MSXML" + n + ".DOMDocument"; };
			dojo.some(["Microsoft.XMLDOM", ms(6), ms(4), ms(3), ms(2)], function(p){
				try{
					doc = new ActiveXObject(p);
				}catch(e){ return false; }
				return true;
			});
			if(str && doc){
				doc.async = false;
				doc.loadXML(str);
			}
			if(doc){
				return doc;
			}
		} catch (e) {}
		
		// if it doesn't successfully parse the xml, try calling the original function
		return dojox.xml.parser["parse.orig"](str, mimetype);
		
	};
};
