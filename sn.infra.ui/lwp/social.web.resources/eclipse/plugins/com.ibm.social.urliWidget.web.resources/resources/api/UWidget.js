/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/**
 * Message definition
 * {
 * id: "",
 * action: ""
 * targets: [],
 * data: {},
 * callback: ""
 * }
 */
UWidget = (function(targetWindow) {
   /* API to export */
   var obj = {
      _targetWindow: targetWindow, 
      _callbacks: {}, // Registry of callbacks
      _widgetEventListeners: {},
      _idCounter: 0,
      _generateId: function() {
         return (this._idCounter++).toString();
      }
   };
   
   obj._createMessage = function(cb, cbScope) {
      var ret = {};
      ret.id = obj._generateId.call(obj);
      ret.targets = [];
      ret.data = '';
      ret.type = "singleiframewidget";
      
      if (cb) {
         callback = {};
         callback.f = cb;
         callback.scope = cbScope;
         callback.once = true;
         
         obj._callbacks[ret.id] = callback;
         
         ret.callback = ret.id;
      }
      
      return ret;
   };
   
   obj.getContext = function(cb, scope) {
      var msg = obj._createMessage(cb, scope);
      msg.action = "getContext";
      this._sendMessage(msg);
   }, 
   
   obj.setAttribute = function(key, value, cb, cbScope) {
      var msg = obj._createMessage(cb, cbScope);
      
      msg.action = "setAttribute";
      msg.key = key;
      msg.value = value;
      
      this._sendMessage(msg);
   },
   
   obj.setAttributes = function(attributes, cb, cbScope) {
      var msg = obj._createMessage(cb, cbScope);
      var attribute = {};
      msg.action = "setAttributes";
      msg.value = attributes;
      this._sendMessage(msg); 
   },
   
   obj.setStyle = function(key, value, cb, cbScope) {
      var msg = obj._createMessage(cb, cbScope);
      
      msg.action = "setStyle";
      msg.key = key;
      msg.value = value;
      
      this._sendMessage(msg);
   },
   
   obj.getAttribute = function(key, cb, cbScope) {
      var msg = obj._createMessage(cb, cbScope);
      
      msg.action = "getAttribute";
      msg.key = key;
      
      this._sendMessage(msg);
   },
   
   obj.switchMode = function(newMode, cb, cbScope) {
      var msg = obj._createMessage(cb, cbScope);
      msg.action = "changeMode";
      msg.key = newMode;
      this._sendMessage(msg);
   },
   
   obj._sendMessage = function(msg) {
      obj._targetWindow.postMessage(JSON.stringify(msg), '*');
   },
   
   obj._handleMessage = function(msg) {
      console.debug("obj._handleMessage: " + msg);
      var data = JSON.parse(msg.data);
      
      if (data.action == "callback") {
         if (data.callback) {
            var cb = obj._callbacks[data.callback];
            
            if (cb) {
               if (cb.once)
                  delete obj._callbacks[data.callback];
               
               if (cb.f) {
                  cb.f.call(cb.scope, data.value);
               }
            }
            
         }
      }
      else if (data.action == "widgetevent" ){
         var eventName = data.key;
         
         var listeners = obj._widgetEventListeners[eventName]; // This could be an array.
         
         if (listeners) {
            for (var i = 0; i < listeners.length; i++) {
               var listener = listeners[i];
               listener.f.call(listener.scope, data.value);
            }
         } else {
            console.debug("No listeners for " + eventName);
         }
      }
   };
   
   obj.addWidgetEventListener = function(eventName, f, scope) {
      if (!eventName || !f )
         return;
      
      if (!obj._widgetEventListeners[eventName])
         obj._widgetEventListeners[eventName] = [];
      
      obj._widgetEventListeners[eventName].push({"f": f, "scope": scope ? scope : this});
   };
   
   obj.registerMessageHandler = function() {
      window.addEventListener("message", obj._handleMessage, false);
   };
   
   
   return obj;
}) (window.parent);

UWidget.registerMessageHandler();
