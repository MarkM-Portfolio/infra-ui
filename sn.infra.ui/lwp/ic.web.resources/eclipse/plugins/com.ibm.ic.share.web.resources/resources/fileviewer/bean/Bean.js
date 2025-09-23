/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/Stateful",
  "dojo/Deferred"
], function (declare, array, lang, Stateful, Deferred) {

  return declare([Stateful], {
    constructor: function () {
      this._dirtyPromise = new Deferred();
      this.resetChangedProperties();
    },
    
    set: function (name, value, markAsChanged) {
      if (value === undefined && typeof name !== "object") {
        return;
      }
      
      if (markAsChanged === undefined) {
        markAsChanged = true;
      }
      
      if (markAsChanged && typeof name !== "object") {
        this._oldValues[name] = this.get(name);
      }
      
      this.inherited(arguments);
    },
    
    deleteProperty: function (name) {
      delete this[name];
      delete this._oldValues[name];
    },

    hasPropertyChanged: function (propertyName) {
      return this._oldValues.hasOwnProperty(propertyName);
    },
    
    resetChangedProperties: function () {
      this._oldValues = {};
    },
    
    unmarkDirty: function () {
      this._dirtyPromise.resolve();
      this._dirtyPromise = new Deferred();
      this.resetChangedProperties();
    },
    
    cancelChanges: function () {
      this.set(this._oldValues);
      this.resetChangedProperties();
      this._dirtyPromise = new Deferred();
    },
    
    /**
     * Attaches a watch, but also calls the attached function with the initial value
     */
    attachWatch: function (property, callback) {
      callback(property, undefined, this.get(property));
      return this.watch(property, callback);
    }
  });
});
