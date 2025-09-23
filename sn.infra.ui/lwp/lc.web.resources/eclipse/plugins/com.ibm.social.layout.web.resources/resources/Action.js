/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.Action");

/**
 * Different contexts in which actions are invoked may determine how the action is rendered and which methods
 * are respected.  Always check the action context before implementing methods.
 *
 * The lifetime of an action object is typically the same as the scene it is displayed in.  Some actions may
 * have the same lifetime as the application object itself.
 */
dojo.declare("com.ibm.social.layout.Action", null, {
   /**
    * enabledFor - Two-item array of inclusive selection count to enable action for. '*' can be used as second item
    */
   // enabledFor: [0,"*"],

   /**
    * visibleFor - Two-item array of inclusive selection count to make action visible for. '*' can be used as second item
    */
   // visibleFor: [0,"*"],

   /**
    * state - Non-null object containing current action state (name, tooltip, enabled, visible properties). Should be modified to reflect the state of the action for the given selection and context.
    *    name
    *    tooltip
    *    enabled
    *    visible
    * selection - Non-null array containing current selection of 0 or more items. Must not be modified.
    * context - Non-null object containing additional action context. Must not be modified.
    */
   selectionChanged: function(state, selection, context) {
      state.name = this.getName(selection, context);
      state.tooltip = this.getTooltip(selection, context);
      state.visible = !!this.isVisible(selection, context);
      // An action can only be enabled, if it is visible
      // This also assures that "enabled"/"disabled" announcement for a11y tools are not emitted.
      state.enabled = state.visible && !!this.isEnabled( selection, context );
   },
   getName: function(selection, context) {
      return this.name || "";
   },
   getTooltip: function(selection, context) {
      return this.tooltip || "";
   },
   getId: function(suffix) {
      var id = this.declaredClass.toLowerCase().replace(/\./g, '_');
      if (suffix && suffix.length > 0) {
         id += '_' + suffix;
      }
      return id;
   },

   // check, if enable/disable action strings are available for creation of corresponding a11y DOM node
   hasEnableDisableActionString: function() {
      if( this.nls !== undefined
          && this.nls.ACTION_ENABLED != undefined
          && this.nls.ACTION_DISABLED !== undefined) {
         return true;
      }
      return false;
   },

   // provide enable action string for a11y DOM node
   getEnableActionString: function() {
      return this.nls !== undefined
             ? this.nls.ACTION_ENABLED
             : undefined;
   },

   // provide disable action string for a11y DOM node
   getDisableActionString: function() {
      return this.nls !== undefined
             ? this.nls.ACTION_DISABLED
             : undefined;
   },

   isVisible: function(selection, context) {
      if (this.visibleFor) {
         return this._isInRange(selection.length, this.visibleFor);
      }
      return true;
   },
   isEnabled: function(selection, context) {
      if (this.enabledFor) {
         return this._isInRange(selection.length, this.enabledFor);
      }
      return true;
   },

   _isInRange: function(count, range) {
      return count >= range[0] && (range[1] == "*" || count <= range[1]);
   },

   canHaveChildren: function(selection, context) {
      return this.hasChildren;
   },

   isLoaded: function() {
      return true;
   },
   load: function() {
      // no-op for base action
      if (!this.loadDeferred) {
         this.loadDeferred = new dojo.Deferred();
         this.loadDeferred.callback(this);
      }
      return this.loadDeferred;
   },
   /* Helper method to allow one-line instantiation */
   mixin: function(opts) {
      if (opts) {
         dojo.mixin(this, opts);
      }
      return this;
   },

   /**
    * Perform the action on the specific selection.
    * An action may be invoked multiple times with different selections or context parameters in the same lifetime.
    */
   execute: function(selection, context) {
   }
});
