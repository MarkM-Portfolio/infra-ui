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

/* author: Ronny A. Pena                                             */
/* ***************************************************************** */
dojo.provide("lconn.core.errorhandling");

dojo.require("lconn.core.utilities");
dojo.requireLocalization("lconn.core", "widgets");
dojo.require("com.ibm.oneui.controls.MessageBox");

lconn.core.errorhandling.DefaultXHRErrorHandler = function(response, ioArgs)
{
	var messages = dojo.i18n.getLocalization("lconn.core", "widgets");
	var temp = null;
	var msg = null;
	
	if(response.status == 404)
	{
	 	if (ioArgs.args != null && ioArgs.args.url != null)
	 	{ 
	 		if (ioArgs.args.url.indexOf("roller-ui/feed") != -1 /* blogs */ ||
	 		 	ioArgs.args.url.indexOf("files/basic/anonymous/api/userlibrary") != -1 /* files SPR#AONO7TJHYY */ ||
	 		 	ioArgs.args.url.indexOf("wikis/basic/anonymous/api/userlibrary") != -1 /* wikis PMR 80291,999,744 */ )  {
					msg = messages["multiFeedReaderNoFeeds"];
					lconn.core.errorhandling.displayError(ioArgs, msg, response);
					return;
			}
		}
	}
	
	if(response.status == 400) /* Handle Bad Request Response from Communities PMR 80291,999,744 */
	{
	 	if (ioArgs.args != null && ioArgs.args.url != null)
	 	{ 
	 		if (ioArgs.args.url.indexOf("service/atom/communities") != -1 ) /* communities */ 	 		 	 
	 		{
					msg = messages["multiFeedReaderNoFeeds"];
					lconn.core.errorhandling.displayError(ioArgs, msg, response);
					return;
			}		
		}		
	}			
	
	if(response.documentElement != null)
	{
		if(response.documentElement.nodeName == "error" || response.documentElement.nodeName == "parsererror")
		{
			var xmlString = (dojox.data.dom.innerXML(response.documentElement));
			msg = lconn.core.errorhandling.getErrorHTML(null, null, null, null, xmlString);
		}
	}
	else
	{
		var temp2 = messages["errorUnableToConnect"];
		temp2 = lconn.core.utilities.replacePlaceHolders(temp2, [ioArgs.args.url]);
			
		if(response.message != null && response.name != null) // is an Error
		{
			if(ioArgs.args.xsltArgs != null)
				return lconn.core.errorhandling.DefaultErrorHandler(temp2, response, ioArgs.args.xsltArgs);
			else
				return lconn.core.errorhandling.DefaultErrorHandler(temp2, response, ioArgs.args.htmlContainerElemId);
		}
		else //if(typeof(response) == "string")
			msg = lconn.core.errorhandling.getErrorHTML(temp2, null, null, null, response);
	}
	
	if(msg == null)
		msg = lconn.core.errorhandling.getErrorHTML(null, null, null, null, response);
	
	lconn.core.errorhandling.displayError(ioArgs, msg, response);
};

lconn.core.errorhandling.displayError = function(ioArgs, msg, response)
{
	var htmlContainerElemId = null;
	if(ioArgs.args.xsltArgs != null && ioArgs.args.xsltArgs.htmlContainerElemId != null)
		htmlContainerElemId = ioArgs.args.xsltArgs.htmlContainerElemId;
	else if(ioArgs.args.htmlContainerElemId != null)
		htmlContainerElemId = ioArgs.args.htmlContainerElemId;		
	
	var stringRes = dojo.i18n.getLocalization("lconn.comm", "strings");
	
	 window.setTimeout(function () {
		 try {
			if (htmlContainerElemId) {
				var stringRes = dojo.i18n.getLocalization("lconn.comm", "strings");
				
				var elMsg = new com.ibm.oneui.controls.MessageBox({
					canClose: ((typeof canClose == "undefined")?true:canClose),
					_strings: {                
						icon_alt: stringRes["rs_msgbox_error"],
						a11y_label: stringRes["rs_msgbox_error_a11y"],
						close_btn_title: stringRes["rs_msgbox_close"],
						close_btn_alt: stringRes["rs_msgbox_close"]	
					},
					type: com.ibm.oneui.controls.MessageBox.TYPE.ERROR,
					msg: msg
				}, htmlContainerElemId);
			}
		} catch (e) {
			if (window.debugComm != null && window.console) {
				console.log(e);
			}
		}
	   }, 200); // Wait 200 milliseconds
	
};

/*
Example: 
	try{
		throw 'hello';
	}catch(exception){
		lconn.core.errorhandling.DefaultErrorHandler("MyJSFunction",exception,"MyDomNoIdErrorContainer");
	}
*/
lconn.core.errorhandling.DefaultErrorHandler = function(functionName, exception, xsltArgs)
{	
	var log = function(errorMsg,exception, htmlContainerElemId)
	{
		var msg = "";
		if(exception instanceof(Error))
		{
			var line = null;
			if(exception.lineNumber != null)
				line = exception.lineNumber;
			
			if(line != null)
				msg += dojo.i18n.getLocalization("lconn.core", "widgets")["errorLine"] + " " + line + "<br/>";
				
			var stack = null;//common_getStacktrace();
			
			msg = lconn.core.errorhandling.getErrorHTML(errorMsg, exception.message, exception.name, line, stack);
		}
		else
		{
			var stack = null; //common_getStacktrace();
			msg = lconn.core.errorhandling.getErrorHTML(errorMsg, exception, null, null, stack);
		}
		
		
		var ioArgs = {args: {xsltArgs: {htmlContainerElemId: htmlContainerElemId }}};	
		lconn.core.errorhandling.displayError(ioArgs, msg);		
	};
 
 	if(typeof(xsltArgs) == "string")
 		log(functionName, exception, xsltArgs);
 	else if(typeof(xsltArgs) == "undefined")
 	{
 		var newSpan = document.createElement("span");
 		newSpan.id = "errorContainer";
 		document.body.appendChild(newSpan);
 		log(functionName, exception, "errorContainer");
 	}
	else if(xsltArgs.htmlContainerElemId != null)
		log(functionName, exception, xsltArgs.htmlContainerElemId);
	else
		log(functionName, exception, xsltArgs);
	
};


lconn.core.errorhandling.getErrorHTML = function(errorName, errorMsg, errorType, errorLine, errorStackTrace)
{
	var msg = "";
	
	if(errorMsg != null)
		msg = errorMsg;
	
	return msg;
};


var common_getStacktrace = function()
{
	var functionObject = common_getStacktrace.caller;
	var errorObject = new Error();
	
	if(errorObject.stack != null)
		return errorObject.stack;
	else
	{	
		var stackTrace = "";
		while (functionObject != null) 
		{		
		
		  stackTrace += "\n" + common_getFunctionName(functionObject);
		  
		  var tempFunctionObject = functionObject.caller;
		  if(tempFunctionObject == null && functionObject.arguments != null && functionObject.arguments.caller != null)
		  	tempFunctionObject = functionObject.arguments.caller;
		  
		  functionObject = tempFunctionObject; 
		}
		return stackTrace;
	}
};

var common_getFunctionName = function(functionObject)
{
	//firefox
	var name = functionObject.name;	
	
	//my custom function names
	if(functionObject.tempName != null && functionObject.tempName != "")
    	name = functionObject.tempName;		    
	
	//ie and others
	if(name == null || name == "")
	{
	    var functionObject_toString = functionObject.toString();
	    var result = functionObject_toString.match(/function (\w*)/);
	    if(result != null)
		    name = result[1];
	    
	   //if (name == null || name == "")
		    //name = functionObject.constructor;
		    
	    //if (name == null || name == "")
		    //name = functionObject.prototype.name;
		    		    
	    //if (name == null || name == "")
	    	//name = functionObject.toString();
	    	
	    if (name == null || name == "")
	    	name = "anonymous-function";
	}
	
	return name;
};
