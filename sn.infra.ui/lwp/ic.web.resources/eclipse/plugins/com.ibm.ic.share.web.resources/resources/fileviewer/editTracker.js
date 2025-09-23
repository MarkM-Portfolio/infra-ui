/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/Stateful",
  "dojo/topic",
  "dijit/registry"
  ], function (declare, array, lang, Stateful, topic, registry) {
  "use strict";
  
  var EditTracker = declare([Stateful], {
    
    init: function () {
      this._subscriptions = [];
      this.numUnsavedChanges = 0;
      this._widgets = {};
      
      this._subscriptions.push(topic.subscribe("ic-fileviewer/editStart", lang.hitch(this, function (widget, hasChangesCheck) {
        if (widget && hasChangesCheck) {
          this._widgets[widget.get("id")] = hasChangesCheck;
        } else {
          this.numUnsavedChanges++;
        }
      })));
      
      this._subscriptions.push(topic.subscribe("ic-fileviewer/editStop", lang.hitch(this, function (widget) {
        if (widget) {
          delete this._widgets[widget.get("id")];
        } else {
          this.numUnsavedChanges--;
          if (this.numUnsavedChanges < 0) {
            // Shouldn't happen
            this.numUnsavedChanges = 0;
          }
        }
      })));
      
      this._subscriptions.push(topic.subscribe("ic-fileviewer/refresh", lang.hitch(this, function () {
        this.numUnsavedChanges = 0;
        this._widgets = {};
      })));
    },
    
    hasUnsavedChanges: function () {
      return this.numUnsavedChanges > 0 || this._widgetsHaveUnsavedChanges();
    },
    
    _widgetsHaveUnsavedChanges: function () {
      for (var widgetId in this._widgets) {
        var widget = registry.byId(widgetId);
        var hasChangesCheck = this._widgets[widgetId];
        if (widget && widget.domNode && hasChangesCheck()) {
          return true;
        }
      }
      return false;
    },
    
    reset: function () {
      array.forEach(this._subscriptions, function (subscription) {
        subscription.remove();
      });
    }
  });
  
  return new EditTracker();
});
