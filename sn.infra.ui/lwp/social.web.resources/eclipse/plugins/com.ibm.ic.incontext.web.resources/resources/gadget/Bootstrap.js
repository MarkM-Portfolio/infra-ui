/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/_base/config",
	"dojo/ready",
	"dojo/cookie",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/has",
	"dojo/json"
], function (dojo, array, lang, windowModule, config, ready, cookie, dom, domClass, has, JSON) {

	(function () {
	var _bootstrap = com.ibm.social.incontext.gadget.Bootstrap;
	
	var logMsg, logError;
	function printArgs(args, startIndex) {
	   if (!startIndex) startIndex = 0;
	   var result = "";
	   if (args.length > startIndex) {
	      for (var i = startIndex; i < args.length; i++) {
	         if (result) result += " ";
	         if (lang.isObject(args[i])) { 
	            try { result += JSON.stringify(args[i]); } catch(e) { } 
	         }
	         else {
	            result += (args[i]);
	         }
	      }
	   }
	   return result;
	}
	
	if (lang.getObject("gadgets.log")) {
	   logMsg = function(msg) { gadgets.log(msg); }
	   logError = function(msg) { gadgets.log(msg); };
	}
	else {
	   logMsg = function(msg) { console.log(msg); };
	   logError = function(msg) { console.error(msg); };
	}
	
	
	lang.mixin(_bootstrap, {
	   adjustSize: function() {
	      if (gadgets.window.adjustHeight)
	         gadgets.window.adjustHeight();
	      if (gadgets.window.adjustWidth)
	         gadgets.window.adjustWidth();
	   },
	   getBodyClasses: function() {
	      return "lotusui30 lotusui30_fonts lotusui30_layout lotusui30_body lotusui30dojo";
	   },
	   initializeNetwork: function(context) {},
	   onLoadGadgetComplete: function(context) {},
	   onSizeChange: function(height) {
	      this.adjustSize();
	   },
	   showOne: function(ids, idToShow) {
	      array.forEach(ids, function(id) {
	         var e = dom.byId(id);
	         if (id === idToShow) e.style.display = "";
	         else e.style.display = "none";
		   });
	   },
	   initializeKeyHandlers: function () {
	      // Subclasses should override to register any handlers like popup open/close
	   },
	   loadGadget: function (context) {
	      // Initialize esc key handlers
	      this.initializeKeyHandlers();
	   
	      // Initialize the body styles
	      domClass.add(windowModule.body(), this.getBodyClasses());
	      windowModule.body().setAttribute("role", "main");
	      ready(function() {
	         if (domClass.contains(windowModule.body(), "dijit_a11y"))
	            domClass.add(windowModule.body(), "lotusImagesOff");
	      });
	      if (has("ie"))
	         windowModule.doc.getElementsByTagName("html")[0].className += " lotusui_ie lotusui_ie" + has("ie");
	
	
	      //Initialize network
	      this.initializeNetwork(context);
	
	      function debug_replaceFunc(className, functionName, prot) {
	         return function() {
	            logMsg((new Date()).getTime() +  " >>> Entering " + className + "::" + functionName + " - " + printArgs(arguments));
	            try {
	                var ret = prot["$$_" + functionName].apply(this, arguments);
	            } catch (e) {
	               logError("An error occurred calling " + className + "::" + functionName + " - " + printArgs([e]));
	            }
	            logMsg((new Date()).getTime() + " <<< Exiting " + className + "::" + functionName + " - " + printArgs([ret]));
	            return ret;
	         }
	      }
	
	      function debug_addLogging(className) {
	         var clz = lang.getObject(className);
	         if (!clz) return;
	         if (clz._debugAdded) return;
	         clz._debugAdded = true;
	         var baseName = className.substring(className.lastIndexOf(".")+1);
	         var funcs = [];
	         if (clz) {
	           if (clz._meta) {
	               // Traditional dojo class
	               var declared = clz._meta.hidden, i, f, prot = clz.prototype;
	               for (i in declared) {
	                  if (lang.isFunction(declared[i])) {
	                     if (i !== "constructor")
	                        funcs.push(i);
	                  }
	               }
	               for (i = 0; i < funcs.length; i++) {
	                  var f = funcs[i];
	                  prot["$$_" + f] = prot[f];
	                  prot[f] = debug_replaceFunc(baseName, f, prot);
	               }
	            }
	         }
	      }
	      var classesToTrace = cookie("_classesToTrace") || this.getClassesToTrace();
	      if (classesToTrace && config.isDebug) {
	         var classes = lang.trim(classesToTrace).split("~");
	         for (var i = 0; i < classes.length; i++) {
	            logMsg("Adding debug to ", classes[i]);
	            debug_addLogging(classes[i]);
	         }
	      }
	
	      if (cookie("_debugAtAllCosts") == "true")
	         config.debugAtAllCosts = true;
	
	      var self = this;
	      self.onLoadGadgetComplete(context);
	   },
	   
	   getClassesToTrace: function() {
	      return "";
	   }
	}); // end of bootstrap object
	
	})(); // end of anonymous function
	return com.ibm.social.incontext.gadget.Bootstrap;
});
