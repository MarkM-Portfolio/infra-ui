/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

/**
 * Core UI widgets and utilities
 * 
 * @namespace ic-ui
 */

define([
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/topic",
        "dijit/_Widget",
        "./Logger"
], function(declare, array, lang, topic, _Widget, Logger) {

   return declare("com.ibm.oneui._base", [ _Widget
   ], /** @lends ic-ui._base.prototype */
   {
      /**
       * Context to use for pub/sub - if non empty then only objects that use
       * same 'ctx' will be involved in pub/sub with this object.
       */
      ctx : "",

      /**
       * Set to 'true' to enable debugging to console
       */
      debug : false,

      /**
       * @private
       */
      _controlinit : null,

      strings : null,

      /**
       * <pre>
       * Force the rendering of the control in a right-to-left format.
       * </pre>
       * 
       * @type Boolean
       */
      isBidi : null,

      /**
       * <pre>
       * Force the locale of the control.
       * If not set, the control will pull the locale from the dojo settings.
       * </pre>
       * 
       * @type String
       */
      locale : null,

      /**
       * @returns Controller Init object
       */
      getControlInit : function() {
         return this._controlinit;
      },

      /**
       * @param Controller
       *           object
       */
      setControlInit : function(obj) {
         this._controlinit = obj;
      },

      /**
       * @constructs
       */
      constructor : function() {
         this.strings = null;

         var thisWidget = this;
         this.debug = (!!this.debug) || dojo.config.isDebug || dojo.config.debugAtAllCosts;
         this.EventHandler = {

            _instance : {
               _sep : "__",

               publish : function(ctx, topic, args) {
                  topic.publish(ctx + this._sep + topic, args);
               },

               subscribe : function(ctx, topic, context, method) {
                  topic.subscribe(ctx + this._sep + topic, context, method);
               },

               unsubscribe : function(ctx, handle) {
                  handle.remove();
               }
            },

            getInstance : function() {
               return this._instance;
            }
         };

         this.Logger = {
            _instance : {
               _logger : null,

               log : function() {
                  if (!!thisWidget.debug && this._logger && typeof this._logger.log === "function") {
                     this._logger.log.apply(this._logger, arguments);
                  }
               },
               error : function() {
                  if (!!thisWidget.debug && this._logger && typeof this._logger.error === "function") {
                     this._logger.error.apply(this._logger, arguments);
                  }
               },
               warn : function() {
                  if (!!thisWidget.debug && this._logger && typeof this._logger.warn === "function") {
                     this._logger.warn.apply(this._logger, arguments);
                  }
               },
               info : function() {
                  if (!!thisWidget.debug && this._logger && typeof this._logger.info === "function") {
                     this._logger.info.apply(this._logger, arguments);
                  }
               },
               debug : function() {
                  if (!!thisWidget.debug && this._logger && typeof this._logger.debug === "function") {
                     this._logger.debug.apply(this._logger, arguments);
                  }
               }
            },

            getInstance : function() {

               if (!!thisWidget.debug && !this._instance._logger) {
                  this._instance._logger = new Logger();
               }

               return this._instance;
            },

            setSystemLogger : function(loggerObj) {
               if (!!loggerObj) {
                  var logger;
                  if (typeof loggerObj === "function") {
                     logger = new loggerObj();
                  }
                  else {
                     logger = loggerObj;
                  }

                  this._instance._logger = logger;
               }
            }
         };
      },

      // _getStateObject returns an object to hold the state info this this
      // instance of the widget.
      // this way specific objects and info for one widget won't poison the info
      // for others on the same page.
      _getStateObject : function(state) {

         this._stateObj = this._stateObj || [];

         var idx = this._stateIndex || this.id;

         if (!idx || idx == "") {
            this._stateIndex = idx = "ctrl_" + new Date().getTime();
         }

         var _this = this;
         _this.StateObject = function(args) {

            var instance = {
               strings : {},
               connects : [],
               widgets : [],
               styles : []
            };

            instance = _this._mixin(instance, args);

            return instance;
         };

         if (!this._stateObj[idx]) {

            var obj = new this.StateObject(((arguments.length > 0) ? state : {}));

            this._stateObj[idx] = obj;
         }

         return this._stateObj[idx];
      },

      _getValue : function(idx, nam) {
         var stateObj = this._getStateObject();
         var item;
         if (typeof idx === "number") {
            item = this.getItem(idx);
         }
         else {
            item = idx;
         }

         var ret = null;
         if (item) {
            try {
               ret = stateObj.store.data.getValue(item, nam);
            }
            catch (ignore) {
            }

            if (!ret) {
               try {
                  ret = stateObj.store.data.getValue(item, stateObj.store.attributes[nam]);
               }
               catch (ignore) {
               }
            }

            if (!ret) {
               try {
                  ret = stateObj.store.data.getValue(item, stateObj.store.attributes[nam + "Attr"]);
               }
               catch (ignore) {
               }
            }

            if (!ret) {
               ret = null;
            }
         }

         return ret;
      },

      _getStringResource : function(str, def, objStrings) {
         // var ret = def || "";

         var oTemp = objStrings || this._getStateObject().strings;
         if (oTemp) {
            var aStr = str.split(".");
            var ii, iLen = aStr.length;
            for (ii = 0; ii < iLen; ii++) {
               if (oTemp) {
                  oTemp = oTemp[aStr[ii]];
               }
            }

            // if (typeof oTemp === "string") {
            // ret = oTemp;
            // }
         }
         return oTemp;
      },

      _connect : function() {
         var stateObj = this._getStateObject();

         var cn = dojo.connect.apply(dojo, arguments);

         stateObj.connects.unshift(cn);
      },

      _addWidgetStyle : function(url) {
         var stateObj = this._getStateObject();

         var css = dojo.create("link", {
            type : "text/css",
            rel : "stylesheet",
            href : url
         });
         dojo.doc.getElementsByTagName("head")[0].appendChild(css);

         stateObj.styles.unshift(css);
      },

      // similar to dojo.mixin but recurses through child objects
      _mixin : function(obj1, obj2) {
         var ii, ret = lang.clone(obj1);
         for (ii in ret) {
            if (ret.hasOwnProperty(ii)) {
               if (obj2[ii]) {
                  if (typeof ret[ii] === "object" && typeof obj2[ii] === "object") {
                     ret[ii] = this._mixin(ret[ii], obj2[ii]);
                  }
                  else {
                     ret[ii] = obj2[ii];
                  }
               }
            }
         }

         for (ii in obj2) {
            if (obj2.hasOwnProperty(ii)) {
               if (ret[ii] === undefined) {
                  ret[ii] = obj2[ii];
               }
            }
         }

         return ret;
      },

      destroy : function() {

         var stateObj = this._getStateObject();

         try {
            array.forEach(stateObj.connects, dojo.disconnect);
         }
         catch (ignore) {
         }
         try {
            stateObj.connects.length = 0;
         }
         catch (ignore) {
         }
         try {
            array.forEach(stateObj.widgets, function(itm) {
               itm.destroy();
            });
         }
         catch (ignore) {
         }
         try {
            stateObj.widgets.length = 0;
         }
         catch (ignore) {
         }

         try {
            array.forEach(stateObj.styles, function(itm) {
               if (itm && itm.parentNode) {
                  itm.parentNode.removeChild(itm);
               }
            });
         }
         catch (ignore) {
         }
         try {
            stateObj.styles.length = 0;
         }
         catch (ignore) {
         }
         this.inherited(arguments);
      },

      postMixInProperties : function() {
         var obj;

         var thisControl = this;

         // Set locale and bidi.

         if (!this.locale) {
            if (dojo.locale) {
               this.locale = dojo.locale;
            }
            else {
               this.locale = "en";
            }
         }

         if (!this.isBidi) {
            this.isBidi = ((dojo.hasAttr(dojo.body(), "dir") && dojo.attr(dojo.body(), "dir").toLowerCase() == "rtl") || dojo.indexOf([
                                                                                                                                       "ar",
                                                                                                                                       "he"
            ], dojo.locale) > -1);
         }

         // if there are a "strings" attribute defined, pull it.
         if (typeof this.strings === "string" && this.strings.length > 0) {
            var str = this.strings;
            this.strings = null;
            try {
               this.strings = dojo.fromJson(str);
            }
            catch (ignore) {
            }
         }

         if (this.strings == null) {
            this.strings = {};
         }

         // go through the src node to see if there is cdata.
         // if there is, then try to populate an object with it.
         var oTag = this.srcNodeRef;
         if (!!oTag) {
            array.forEach(

            oTag.childNodes, function(node) {
               var sNodeVal = node.nodeValue;

               // if we've got cdata, try to pull out the json object and mixin
               // with existing object
               if (sNodeVal && sNodeVal.indexOf("[CDATA[") == 0) {
                  try {
                     sNodeVal = dojo.trim(sNodeVal.substring(0, sNodeVal.length - 2).substring(7).replace(/\n/g, " ").replace(/\r/g, " "));

                     var newObj = {};

                     try {
                        newObj = dojo.fromJson(sNodeVal);
                     }
                     catch (ignore) {
                     }

                     obj = dojo.mixin(obj, newObj);
                  }
                  catch (ee1) {
                     console.error("Error reading CDATA for control (" + thisControl.declaredClass + "): " + ee1.message, ee1);
                  }
               }
            });
         }
         this._controlinit = obj;

         // if there are strings in the controlinit, pull that into
         if (this._controlinit && this._controlinit.strings) {
            this.strings = dojo.mixin(this.strings, this._controlinit.strings);
         }
      },

      /**
       * @private
       */
      _getIsBidi : function() {
         return this.isBidi;
      },

      /**
       * Gets the real path to the current widget.
       */
      getWidgetLocation : function() {
         var aClass = dojo.moduleUrl((this.coreWidgetClass || this.declaredClass)).path.split("/");
         aClass.pop();
         aClass.pop();
         return aClass.join("/") + "/";
      },

      /**
       * Gets the module's path relative to dojo.js
       */
      getWidgetLocationDojoRelative : function() {

         var dojoRoot = "dojo/dojo/";

         var url = this.getWidgetLocation();

         // Strip off path from dojo root directory
         var ix = url.indexOf(dojoRoot);
         if (ix != -1) {
            url = url.substr(ix + dojoRoot.length);
         }
         return url;
      },

      parseInt : function(val) {
         return parseInt(val, 10);
      },

      /**
       * Our version of the publish function.
       * 
       * @param topic
       *           Topic to subscribe to
       * @param args
       *           Event to publish to the topic
       */
      publish : function(topic, args) {
         this.EventHandler.getInstance().publish(this.ctx, topic, args);
      },

      /**
       * Our version of the publish/subscribe/unsubscribe functions. Allows for
       * tying together controls based on controller_id.
       * 
       * @param {String}
       *           topic Topic to subscribe to
       * @param {Object}
       *           context Context for subscription. Empty if you want subscribe
       *           to all topics on page
       * @param {String}
       *           method callback when event is published to topic
       */
      subscribe : function(topic, context, method) {
         this.EventHandler.getInstance().subscribe(this.ctx, topic, context, method);
      },

      /**
       * Our version of unsubscribe
       * 
       * @param handle
       */
      unsubscribe : function(handle) {
         this.EventHandler.getInstance().unsubscribe(this.ctx, handle);
      },

      logEnter : function(args) {
         if (!!this.debug) {
            var callee = ((args && args.callee && args.callee.nom) ? args.callee.nom : args);
            this.Logger.getInstance().debug("Entering: " + this.declaredClass + "." + callee + " (" + this.id + ")");
         }
      },

      logExit : function(args) {
         if (!!this.debug) {
            var callee = ((args && args.callee && args.callee.nom) ? args.callee.nom : args);
            this.Logger.getInstance().debug("Exiting: " + this.declaredClass + "." + callee + " (" + this.id + ")");
         }
      },

      logError : function(e) {
         var inst = this.Logger.getInstance();
         inst.error("Error: " + this.declaredClass + ((e.callee) ? "." + e.callee : "") + " (" + this.id + ") - " + e.message);
         inst.error(e);
      }
   });
});
