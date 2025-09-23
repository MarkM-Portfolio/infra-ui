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

define([
   "dojo",
   "dojo/dom",
   "dojo/i18n",
   "dojo/i18n!ic-core/nls/widgets",
   "dijit/_Widget",
   "dojox/data/dom",
   "ic-core/utilities"
], function (dojo, dom, i18n, i18nwidgets, _Widget, dojoxDom, utilities) {

   var errorhandling = {};

   errorhandling.DefaultXHRErrorHandler = function(response, ioArgs) {
      var messages = i18nwidgets;
      var temp = null;
      var msg = null;

      if (response.status == 404) {
         if (ioArgs.args != null && ioArgs.args.url != null) {
            if (ioArgs.args.url.indexOf("roller-ui/feed") != -1 /* blogs */ || ioArgs.args.url.indexOf("files/basic/anonymous/api/userlibrary") != -1 /* files SPR#AONO7TJHYY */ || ioArgs.args.url.indexOf("wikis/basic/anonymous/api/userlibrary") != -1 /* wikis PMR 80291,999,744 */ ) {
               msg = messages["multiFeedReaderNoFeeds"];
               errorhandling.displayError(ioArgs, msg, response);
               return;
            }
         }
      }

      if (response.status == 400) /* Handle Bad Request Response from Communities PMR 80291,999,744 */
      {
         if (ioArgs.args != null && ioArgs.args.url != null) {
            if (ioArgs.args.url.indexOf("service/atom/communities") != -1) /* communities */
            {
               msg = messages["multiFeedReaderNoFeeds"];
               errorhandling.displayError(ioArgs, msg, response);
               return;
            }
         }
      }

      if (response.documentElement != null) {
         if (response.documentElement.nodeName == "error" || response.documentElement.nodeName == "parsererror") {
            var xmlString = (dojoxDom.innerXML(response.documentElement));
            msg = errorhandling.getErrorHTML(null, null, null, null, xmlString);
         }
      } else {
         var temp2 = messages["errorUnableToConnect"];
         temp2 = utilities.replacePlaceHolders(temp2, [ioArgs.args.url]);

         if (response.message != null && response.name != null) // is an Error
         {
            if (ioArgs.args.xsltArgs != null) return errorhandling.DefaultErrorHandler(temp2, response, ioArgs.args.xsltArgs);
            else return errorhandling.DefaultErrorHandler(temp2, response, ioArgs.args.htmlContainerElemId);
         } else //if(typeof(response) == "string")
         msg = errorhandling.getErrorHTML(temp2, null, null, null, response);
      }

      if (msg == null) msg = errorhandling.getErrorHTML(null, null, null, null, response);

      errorhandling.displayError(ioArgs, msg, response);
   };

   errorhandling.displayError = function(ioArgs, msg, response) {
      var htmlContainerElemId = null;
      if (ioArgs.args.xsltArgs != null && ioArgs.args.xsltArgs.htmlContainerElemId != null) htmlContainerElemId = ioArgs.args.xsltArgs.htmlContainerElemId;
      else if (ioArgs.args.htmlContainerElemId != null) htmlContainerElemId = ioArgs.args.htmlContainerElemId;

      if (htmlContainerElemId != null) {
         if (typeof(htmlContainerElemId) == "string") dom.byId(htmlContainerElemId).innerHTML = msg;
         else htmlContainerElemId.innerHTML = msg;
      } else alert("htmlContainerElemId was not defined.\n" + msg + "\nArguments: " + ioArgs + "\nresponse: " + response);

   };

/*
   Example: 
      try{
         throw 'hello';
      }catch(exception){
         errorhandling.DefaultErrorHandler("MyJSFunction",exception,"MyDomNoIdErrorContainer");
      }
   */
   errorhandling.DefaultErrorHandler = function(functionName, exception, xsltArgs) {
      var log = function(errorMsg, exception, htmlContainerElemId) {
            var msg = "";
            if (exception instanceof(Error)) {
               var line = null;
               if (exception.lineNumber != null) line = exception.lineNumber;

               if (line != null) msg += i18nwidgets["errorLine"] + " " + line + "<br/>";

               var stack = null; //common_getStacktrace();
               msg = errorhandling.getErrorHTML(errorMsg, exception.message, exception.name, line, stack);
            } else {
               var stack = null; //common_getStacktrace();
               msg = errorhandling.getErrorHTML(errorMsg, exception, null, null, stack);
            }


            var ioArgs = {
               args: {
                  xsltArgs: {
                     htmlContainerElemId: htmlContainerElemId
                  }
               }
            };
            errorhandling.displayError(ioArgs, msg);
         };

      if (typeof(xsltArgs) == "string") log(functionName, exception, xsltArgs);
      else if (typeof(xsltArgs) == "undefined") {
         var newSpan = document.createElement("span");
         newSpan.id = "errorContainer";
         document.body.appendChild(newSpan);
         log(functionName, exception, "errorContainer");
      } else if (xsltArgs.htmlContainerElemId != null) log(functionName, exception, xsltArgs.htmlContainerElemId);
      else log(functionName, exception, xsltArgs);

   };

   errorhandling.getErrorHTML = function(errorName, errorMsg, errorType, errorLine, errorStackTrace) {
      var messages = i18nwidgets;
      var time = new Date().getTime();
      var msg = "";
      if (errorMsg != null && errorMsg.indexOf("BMWIW0001E") != -1) msg += "<div class='lconnWidgetMsgError lconnWidgetMsgCompact'>";
      else msg += "<div class='lconnWidgetMsgError'>";

      var id = dijit.getUniqueId("error");

      msg += "<img class='lconnSprite lconnSprite-iconError16' src='" + _Widget.prototype._blankGif + "'/><b>" + messages["errorDefaultMsg"] + "</b><br/>";
      msg += messages["errorDefaultMsg2"] + "<br/><br/>";
      msg += "<a href='javascript:void(0);' onclick=\"utilities.toggleVisibility('" + id + "');\">" + messages["errorDefaultMsg3"] + "</a>";
      msg += "<div id='" + id + "' style='visibility: hidden; display: none;'>";
      msg += "<br/>";
      if (errorName != null) msg += messages["errorName"] + " " + errorName + "<br/>";
      if (errorMsg != null) msg += messages["errorMsg"] + " " + errorMsg + "<br/>";
      if (errorType != null) msg += messages["errorType"] + "" + errorType + "<br/>";
      if (errorLine != null) msg += messages["errorLine"] + " " + errorLine + "<br/>";
      if (errorStackTrace != null) msg += messages["errorStackTrace"] + "<br/><pre>" + errorStackTrace + "</pre><br/>";
      msg += "</div>";
      msg += "</div>";

      return msg;
   };

   var common_getStacktrace = function() {
         var functionObject = common_getStacktrace.caller;
         var errorObject = new Error();

         if (errorObject.stack != null) return errorObject.stack;
         else {
            var stackTrace = "";
            while (functionObject != null) {

               stackTrace += "\n" + common_getFunctionName(functionObject);

               var tempFunctionObject = functionObject.caller;
               if (tempFunctionObject == null && functionObject.arguments != null && functionObject.arguments.caller != null) tempFunctionObject = functionObject.arguments.caller;

               functionObject = tempFunctionObject;
            }
            return stackTrace;
         }
      };

   var common_getFunctionName = function(functionObject) {
         //firefox
         var name = functionObject.name;

         //my custom function names
         if (functionObject.tempName != null && functionObject.tempName != "") name = functionObject.tempName;

         //ie and others
         if (name == null || name == "") {
            var functionObject_toString = functionObject.toString();
            var result = functionObject_toString.match(/function (\w*)/);
            if (result != null) name = result[1];

            //if (name == null || name == "")
            //name = functionObject.constructor;
            //if (name == null || name == "")
            //name = functionObject.prototype.name;
            //if (name == null || name == "")
            //name = functionObject.toString();
            if (name == null || name == "") name = "anonymous-function";
         }

         return name;
      };

   return errorhandling;
});
