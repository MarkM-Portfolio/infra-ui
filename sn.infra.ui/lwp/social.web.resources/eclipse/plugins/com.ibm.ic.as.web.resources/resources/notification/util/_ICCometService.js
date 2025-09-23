/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
      "dojo/_base/declare",
      "dojo/_base/config",
      "cometd-dojo/cometd",
      "dojo/_base/array",
      "dojo/_base/lang",
      "dojo/_base/unload",
      "dojo/json",
      "./ICCometChannel",
      "ic-core/config/services",
      "ic-core/url",
      "ic-as/notification/util/WindowBroadcastSupport",
      "ic-as/util/xhr/XhrHandler",
      "cometd-dojo/cometd/reload"
], function(declare, dojoConfig, cometd, array, lang, baseUnload, JSON, ICCometChannel, ICServices, ICUrl, WindowBroadcastSupport, XhrHandler) {

   /**
    * ICCometService manages the comet initialization and subscriptions.
    * Consumsers wishing to subscribe to a channel can add a subscription here
    * and register callbacks with ICCometChannel objects. Is an instance of
    * WindowBroadcastSupport, only instance will lock and maintain the comet
    * connection, all others created on a browser will register to listen to the
    * master which forwards onto the messages.
    */

   var _ICCometService = declare(WindowBroadcastSupport, {

      _internalSubscriptions : [],

      _subscriptions : [],

      _webSocketsEnabled : false,

      initCometD : function() {
         this.initWindowBroadcastSupport();
      },

      _initCometD : function() {
         if (!ICServices.pushnotification) {
            console.warn("The push notification service is not enabled, aborting.");
            return;
         }

         var cometLogLevel = (dojoConfig.isDebug) ? "debug" : "info";
         var pushServiceUrl = ICUrl.getServiceUrl(ICServices.pushnotification) + "/form/comet";

         setTimeout(lang.hitch(this, function() {
            cometd.configure({
               url : pushServiceUrl,
               backoffIncrement : this.generateRandomNumber(10000),
               maxBackoff : this.generateRandomNumber(300000),
               maxNetworkDelay : 20000,
               logLevel : cometLogLevel
            });
            cometd.getExtension('reload').configure({
               cookieMaxAge : 100
            });
            cometd.websocketEnabled = this._webSocketsEnabled;           
            this.setupCometListener();

         }), 6000);
      },

      /**
       * generate a random number based on input seed Will be used by the cometD
       * backoff settings to provide random large timeouts that would help
       * distribute the load of requests if one app node locked out and all
       * users on the node get transferred to another.
       */
      generateRandomNumber : function(seed) {
         return Math.floor(seed + (Math.random() * 200000));
      },

      setupCometListener : function() {
         var self = this;
         if (this.hasSubscriptions()) {
            cometd.addListener('/meta/handshake', function(message) {
               if (message.successful) {
                  var msgChannels = message.ext.channels
                  cometd.batch(function() {
                     // iterate through channels and subscribe
                     array.forEach(self._subscriptions, function(channel) {
                        var channelID = channel.getChannelId();
                        // fixup for rename of news channel by pns team
                        // remove when consilidated on 'news'
                        if (channelID === "news") {
                           if (!msgChannels[channelID]) {
                              channelID = "news directed notifications";
                           }
                        }

                        if (msgChannels[channelID] && msgChannels[channelID].url) {
                           var currentChannel = msgChannels[channelID].url;
                           self._internalSubscriptions.push(cometd.subscribe(currentChannel, cometd, function(message) {
                              channel.getChannelCallback()(message);
                              if (self.isMaster) {
                                 message.icWindowChannel = true;
                                 var messageEnvelope = {
                                    channelName : channelID,
                                    payload : message
                                 };
                                 self.windowBroadcast(messageEnvelope);
                              }
                           }));
                        }
                        else {
                           console.debug("comet chanel config not valid for: " + channel);
                        }
                     });
                  });
               }
               else {
                  console.debug("fail to load comet");
               }
            });
            // load cometd reload extension to manage state of handshake between
            // browser refreshes
           window.addEventListener('pagehide', lang.hitch(this, function() {              
               cometd.reload({cookieMaxAge: 100});
               cometd.getTransport().abort();
            }), false);
           baseUnload.addOnUnload(lang.hitch(this, function() {              
        	   try{//ref for handling un-intentional page unloads (file download links etc)
        		   cometd.getTransport().abort();
        	   }catch(e){}               
            }));
           this.initiateHandshake();
         }
      },
      
      /**
       * Required to work around - SmartCloud PNS not being behind the F5 meaning security ltpa tokens
       * can be out of sync between Connections and PNS. This will ensure we are synched before
       * we commit to hanshake by hitting an endpoint exposed through webseal thereby keeping us 
       * from getting out of sync
       */
      initiateHandshake: function() {
    	  var pushAuthSyncUrl = ICUrl.getServiceUrl(ICServices.pushnotification) + "/service/info";
    	  XhrHandler.xhrGet({
    		  	url: pushAuthSyncUrl			
			}).then(function(data){
				cometd.handshake();
			}, 
			function(err){
				console.log('Error connecting to push auth sync service /servic/info: '+err)
			});
      },

      stopCometD : function() {
         cometd.disconnect();
      },

      hasSubscriptions : function() {
         return this._subscriptions && this._subscriptions.length > 0;
      },

      /**
       * Add a channel subscription and register for callback when a message is
       * received for that channel
       * 
       * @channel - id of the channel as returned via handshake
       *          message/ext/channels
       * @callback - function to execute upon message received at channel
       */
      addCometChannelSubscription : function(channel, callback) {
         var icChannel = new ICCometChannel(channel, callback);
         this._subscriptions.push(icChannel);
      },

      setWebSocketEnabled : function(enabled) {
         this._webSocketsEnabled = enabled;
      },

      windowActivated : function() {
         // removes the current setTimeout
         this.handleStorageEvent = function(event) {};
         this._initCometD();
      },

      /**
       * When the window is not active subscribe to localstorage events and pass
       * comet messges onto the correct channel subscribers
       */
      windowDeactivated : function() {
         var self = this;
         this.handleStorageEvent = function(event) {
            var msg = JSON.parse(event.newValue);
            if (msg.event && msg.event.payload) {
               var channelId = msg.event.channelName;
               var channelPayload = msg.event.payload;
               if (self._subscriptions.length > 0) {
                  array.some(self._subscriptions, function(channel) {
                     if (channel && channel.getChannelId() === channelId) {
                        channel.getChannelCallback()(channelPayload);
                        return true;
                     }
                  });
               }
            }

         };
      }
   });

   return _ICCometService;
});
