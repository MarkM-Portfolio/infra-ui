/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */
define([
      "dojo/_base/declare",
      "dojo/topic",
      "./event",
      "../utilities"
],
   function(declare, topic, eventIface, utilities) {

      var eventImpl = {};

      eventImpl.iEventImpl = declare("com.ibm.mm.enabler.iw.iEventImpl", eventIface.iEvent, {

         constructor : function(/* String */name,/* String */type,/* Object */payload,/* String */source) {
            this.name = name;

            if (typeof type != "undefined")
               this.type = type;
            else
               this.type = null;

            if (typeof payload != "undefined")
               this.payload = payload;
            else
               this.payload = null;

            if (typeof source != "undefined")
               this.source = source;
            else
               this.source = null;
            this.source = source;
         }
      });

      eventImpl.iEventDescriptionImpl = declare("com.ibm.mm.enabler.iw.iEventDescriptionImpl",
         com.ibm.mm.enabler.iw.iEventDescription,
         {

            constructor : function(/* String */name,/* function */handlingFn,/* String */type,/* [] */description,/* String[] */aliases, defaultLang,/* [] */descriptions) {
               this.name = name;

               if (typeof type != "undefined")
                  this.type = type;
               else
                  this.type = null;

               if (typeof description != "undefined")
                  this.description = description;
               else
                  this.description = null;

               if (typeof aliases != "undefined")
                  this.aliases = aliases;
               else
                  this.aliases = null;

               if (typeof handlingFn != "undefined")
                  this.handlingFn = handlingFn;
               else
                  this.handlingFn = null;

               this.lang = defaultLang;

               // each description is saved in following format
               // {lang,description,descriptionURI}
               this.descriptions = descriptions;

            },
            getDescription : function(locale) {
               return this._getLocalizedAttribute("description", locale);
            },
            getTitle : function(locale) {
               return this._getLocalizedAttribute("title", locale);
            },
            _getLocalizedAttribute : function(attributeName, locale) {
               var attValue = null, altAttValue = null;
               var finalLocale = utilities.getLocale(this, locale, this.lang);
               if (typeof this.descriptions != "undefined" && this.descriptions != null) {
                  altAttValue = this.descriptions[finalLocale];
                  if (typeof altAttValue != "undefined" && altAttValue != null) {
                     attValue = altAttValue[attributeName];
                  }
               }
               if (typeof attValue == "undefined" || attValue == null) {
                  attValue = this[attributeName];
               }

               if (typeof attValue == "undefined")
                  attValue = null;
               return attValue;
            },
            setOnRemoveWire : function(/* String */handler) {
               if (typeof handler == "undefined" || handler === null) {
                  handler = "onRemoveWire";
               }
               this.onRemoveWire = handler;
            },
            getOnRemoveWire : function() {
               if (this.onRemoveWire) {
                  return this.onRemoveWire;
               }
               return null;
            },
            setOnNewWire : function(/* String */handler) {
               if (typeof handler == "undefined" || handler === null) {
                  handler = "onNewWire";
               }
               this.onNewWire = handler;
            },
            getOnNewWire : function() {
               if (this.onNewWire) {
                  return this.onNewWire;
               }
               return null;
            },
            getLocales : function() {
               var locales = [];
               if (typeof this.descriptions != "undefined" && this.descriptions != null) {
                  for ( var i in this.descriptions) {
                     locales.push(i);
                  }
               }
               return locales;
            }
         });

      eventImpl.iEventsImpl = declare("com.ibm.mm.enabler.iw.iEventsImpl", eventIface.iEvents, {

         constructor : function(id) {
            this.id = id;
         },
         publishEvent : function(/* String */eventName, payload, payloadType) {
            // let widget handle this event first
            var widget = iWidgetContainer.getWidgetById(this.id);
            var aEvent = new eventIface.iEventImpl(eventName, payloadType, payload, null);
            var isHandled = widget.handleEvent(eventName, aEvent);

            // publish wire if widget couldn't handle this event
            if (!isHandled)
               iWidgetContainer.eventService.publishWire(this.id, eventName, payload, payloadType);
         },
         fireEvent : function(/* String */eventName, payloadType, payload) {
            // event description here...
            var widget = iWidgetContainer.getWidgetById(this.id);

            var aEvent = new eventIface.iEventImpl(eventName, payloadType, payload, null);
            var isHandled = widget.handleEvent(eventName, aEvent);

            // publish wire if widget couldn't handle this event
            if (!isHandled)
               serviceManager.getService("eventService").publishWire(this.id, eventName, payload, payloadType);
         },
         // deprecated
         addWire : function(sourceEvent, targetWidget, targetEvent) {
            iWidgetContainer.eventService.addWire(this.id, sourceEvent, targetWidget, targetEvent);
         }

      });

      eventImpl.eventHolder = declare("com.ibm.mm.enabler.iw.eventHolder", null, {
         constructor : function(id, data) {
            this.targetId = id;
            this.data = data;
         },
         handleLoaded : function() {
            // hold the data and publish event only when it's loaded
            if (this.handler) {
               this.handler.remove();
            }
            topic.publish("/enabler/eventService/" + this.targetId, this.data);
         }
      });
      eventIface.iEvents.Constants = new eventIface.iEventsConstants();

      return eventImpl;
   });
