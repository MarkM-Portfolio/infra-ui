/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.action.Action");

/**
 * Different contexts in which actions are invoked may determine how the action is rendered and which methods
 * are respected.  Always check the action context before implementing methods.
 * 
 * The lifetime of an action object is typically the same as the scene it is displayed in.  Some actions may
 * have the same lifetime as the application object itself.
 */
dojo.declare("lconn.share.action.Action", null, {
   constructor: function(opts) {
   },
   /** Is the action valid for the item and the scope. */
   isValid: function(item,opt) {
      return true;
   },
   getName: function(item,opt) {
      return this.name || "";
   },
   getTooltip: function(item,opt) {
      return this.tooltip || "";
   },
   getId: function(suffix) {
      var id = this.declaredClass.toLowerCase().replace(/\./g, '_');
      if (suffix && suffix.length > 0)
         id += '_' + suffix;
      return id;
   }, 
   /**
    * Perform the "action" for the specific item.  An action may be invoked multiple times with different items
    * or opt parameters in the same lifetime.
    */
   execute: function(item,opt) {
      return;
   },
   /**
    * Return a URL that represents this action. The execute() method should take precedence unless the action
    * scope has defined a different behavior.
    */
   getUrlResource: function(item,opt) {
      return null;
   }
   /** 
    * Action renderers may invoke the "addExtra" method to give the action the opportunity to display additional markup.  It is 
    * not defined by default.
    * 
    * addExtra: function(item, el) {}
    */
});
