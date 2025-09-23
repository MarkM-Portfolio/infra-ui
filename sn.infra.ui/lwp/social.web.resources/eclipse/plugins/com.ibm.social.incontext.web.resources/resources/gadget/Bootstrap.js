/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.incontext.gadget.Bootstrap");

dojo.require("dojo.cookie");
dojo.require("lconn.core.config.services");

(function () {
var _bootstrap = com.ibm.social.incontext.gadget.Bootstrap;

var logMsg, logError;
function printArgs(args, startIndex) {
   if (!startIndex) startIndex = 0;
   var result = "";
   if (args.length > startIndex) {
      for (var i = startIndex; i < args.length; i++) {
         if (result) result += " ";
         if (dojo.isObject(args[i])) { 
            try { result += dojo.toJson(args[i]); } catch(e) { } 
         }
         else {
            result += (args[i]);
         }
      }
   }
   return result;
}

if (dojo.getObject("gadgets.log")) {
   logMsg = function(msg) { gadgets.log(msg); }
   logError = function(msg) { gadgets.log(msg); };
}
else {
   logMsg = function(msg) { console.log(msg); };
   logError = function(msg) { console.error(msg); };
}


dojo.mixin(_bootstrap, {
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
      dojo.forEach(ids, function(id) {
         var e = dojo.byId(id);
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
      dojo.addClass(dojo.body(), this.getBodyClasses());
      dijit.setWaiRole(dojo.body(), "main");
      dojo.addOnLoad(function() {
         if (dojo.hasClass(dojo.body(), "dijit_a11y"))
            dojo.addClass(dojo.body(), "lotusImagesOff");
      });
      if (dojo.isIE)
         dojo.doc.getElementsByTagName("html")[0].className += " lotusui_ie lotusui_ie" + dojo.isIE;


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
         var clz = dojo.getObject(className);
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
                  if (dojo.isFunction(declared[i])) {
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
      var classesToTrace = dojo.cookie("_classesToTrace") || this.getClassesToTrace();
      if (classesToTrace && dojo.config.isDebug) {
         var classes = dojo.trim(classesToTrace).split("~");
         for (var i = 0; i < classes.length; i++) {
            logMsg("Adding debug to ", classes[i]);
            debug_addLogging(classes[i]);
         }
      }

      if (dojo.cookie("_debugAtAllCosts") == "true")
         dojo.config.debugAtAllCosts = true;

      var self = this;
      self.onLoadGadgetComplete(context);
   },
   
   getClassesToTrace: function() {
      return "";
   }
}); // end of bootstrap object

})(); // end of anonymous function