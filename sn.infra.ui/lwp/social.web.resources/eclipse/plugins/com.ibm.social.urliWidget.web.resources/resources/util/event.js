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

if (typeof(dojo) != "undefined") {
   dojo.provide("lconn.urlwidget.util.event");
   dojo.provide("lconn.urlwidget.util.channel");
}
else {
   lconn = new Object();
   lconn.urlwidget = new Object();
   lconn.urlwidget.util = new Object();
}
/**
 Events sent through channel object
**/
lconn.urlwidget.util.event = function(msg)
{  
   this._msg = msg || {};
      
   this.getEventType = function() {
      return this._msg ? this._msg.action : null;
   }
   
   this.setEventType = function(eType) {
      this._msg.action = eType;
   }
   
   this.getEventKey = function() {
      return this._msg ? this._msg.key : null;
   }
   
   this.setEventKey = function(eKey) {
      this._msg.key = eKey;
   }
   
   this.getEventValue = function() {
      return this._msg ? this._msg.value : null;
   }
   
   this.setEventValue = function(eValue) {
      this._msg.value = eValue;
   }
   
   this.getCallback = function() {
      return this._msg ? this._msg.callback : null;
   }

   this.setCallback = function(cb) {
      this._msg.callback = cb;
   }
   
   this.stringify = function() {
      var msg = {action: this.getEventType(), 
            key: this.getEventKey(), 
            value: this.getEventValue()
      };
      
      if (this.getCallback())
         msg.callback = this.getCallback();
      
      if (this.width != null) {
         msg.width = this.width;
      }
      if (this.height != null) {
         msg.height = this.height;
      }
      
      return(JSON.stringify(msg));
   }
   
   this.info = function(msg) {
      console.info("lconn.urlwidget.util.event:  " + msg);
   }
}

/**
  Channel object used by two types of clients
  1)  Listeners - handling events sent by event generators
  2)  Event generators - sending events to listeners
  Note that a client can, and usually is, both
**/
lconn.urlwidget.util.channel = function(myWindow, cb)
{  
   this.sendEvent = function(event, win) {
      var msg = event.stringify();
      win.postMessage(msg, "*");
   }
   
   this.callback = function(e) {
      this.info("got message:  " + e.data);
      if (e.data != "appReady") {
         try {
            var msg = JSON.parse(e.data);
            if (msg.type == "singleiframewidget"){
               this.info("msg.action:  " + msg.action + "msg.key:  " + msg.key + ", msg.value:  " + msg.value);
               var event = new lconn.urlwidget.util.event(msg);
               this.cb(event, e.source, this);
            }
         } catch (error) {
            this.error("got message that couldn't be parsed");
            return;
         }
      }
   }
   
   this.addListener = function(cb) {
      this.info("listenToIframe");
      // Create IE + others compatible event handler
      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
      
      var boundCallback = this.callback.bind(this);
      
      if (!window.__iframeMessageListener)
         window.__iframeMessageListener = {};
      
      if (!window.__iframeMessageListener[this.myWindow.id]) {
         eventer(messageEvent, boundCallback, false);
         window.__iframeMessageListener[this.myWindow.id] = true;
      }
      
   }
   
   this.info = function(msg) {
      console.info("lconn.urlwidget.util.channel:  " + msg);
   }
   
   this.error = function(msg) {
      console.error("lconn.urlwidget.util.channel:  " + msg);
   }
   
   this.setWindow = function(win) {
      this.myWindow = win;
   }
   
   this.setCallback = function(cb) {
      this.cb = cb;
   }
   
   this.myWindow = myWindow;
   this.cb = cb;
   this.addListener();
   
}
