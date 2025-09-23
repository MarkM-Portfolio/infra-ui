/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

dojo.provide("lconn.share.widget.LotusForm");
dojo.require("lconn.share.util.html");
dojo.require("lconn.share.util.validation");
dojo.require('lconn.share.widget.ProtectedAction');
dojo.require("dijit._Widget");

dojo.declare("lconn.share.widget.LotusForm", [dijit._Widget, lconn.share.widget.ProtectedAction], {
   
   baseClass: "lotusForm",
   width1: "150px",
   
   postMixInProperties: function() {
      this.inherited(arguments);
      this._requests = [];
      this.fields = [];
      this.byName = {};
      this._i = 0;
   },

   destroy: function() {
      this.inherited(arguments);
      this.cancelRequest();
      delete this.fields;
   },
   
   enableInput: function() {
      if (this.progressNode)
         this.progressNode.style.display = "none";
      this._toggleInput(this.domNode,true);
   },
   disableInput: function() {
      if (this.progress)
         this.progress.update({indeterminate:true});
      if (this.progressNode)
         this.progressNode.style.display = "";
      this._toggleInput(this.domNode,false);
   },
   
   resize: function() {},
   
   beforeSave: function() {},
   protectedSave: function() {
      if (!this.startAction())
         return;
      this.beforeSave();
      try {
         if (!this.validate()) {
            var e = arguments[arguments.length-1];
            if (lconn.share.util.html.isEvent(e)) dojo.stopEvent(e);
            this.endAction();
            return;
         }
         if (this.save.apply(this,arguments)) {
            // some network requests may complete before .save() returns
            if (this.isActing())
               this.disableInput();
         }
         else
            this.endAction();
      } catch (e) {
         console.error(e);
         this.endAction();
         this.enableInput();
      }
   },
   beforeComplete: function() {},
   protectedComplete: function() {
      try {
         var ioArgs = arguments[arguments.length-1];
         ioArgs._finished = true;
         this.beforeComplete();
         if (ioArgs.explicitCancel)
            return;
         this.complete.apply(this, arguments);
      } finally {
         this.endAction();
         this.enableInput();
      }
      this.onComplete();
   },
   onComplete: function() {
   },

   cancel: function(e) {
      if (e) dojo.stopEvent(e);
      var isActing = this.isActing();
      this.cancelRequest();
      if (isActing) {
         console.log("Cancel while action is in process");
         this.endAction();
         this.enableInput();
         return;
      }
      this.onCancel();
   },
   onCancel: function() {},         
   
   cancelRequest: function() {
      if (this._requests)
         dojo.forEach(this._requests, function(r) {
            r.ioArgs.explicitCancel = true;
            if (!r.ioArgs._finished)
               r.cancel();
         });
      this._requests = [];
   },
   
   createProgressNode: function(d, el) {
      var span = this.progressNode = d.createElement("span");
         span.style.display = "none";
         span.className = "lotusRight qkrStatus";
         var img = d.createElement("IMG");
            img.className = "lotusLoading";
            img.alt = "";
            img.src = dojo.config.blankGif;
         span.appendChild(img);
         span.appendChild(d.createTextNode("\u00a0"));
         span.appendChild(d.createTextNode(this._strings.BUSY));
      el.appendChild(span);
   },
   
   /**
    * Return the field identified by the first parameter
    *   number - the field by its position
    *   string - the field by its name property
    *   object - assumed to be the field itself 
    */
   get: function(s) {
      var f;
      if (typeof s == "number")
         f = this.fields[s];
      else if (typeof s == "string")
         f = this.byName[s];
      else if (typeof s == "object") // should be the field
         f = s;
      return f;
   },
   
   /**
    * Attempt to retrieve the value of a field by an identifier.  If a field with that identifier is not defined the form 
    * will be checked for a field with the name matching the first parameter.
    */
   getValue: function(s) {
      var v = this.get(s);
      if (!v)
         v = this.formNode[s];

      if (v) {
         if (typeof v.getValue == "function")
            v = v.getValue();
         else if (v.value)
            v = v.value;
      }
      return v;
   },

   createHelpLink: function(el, topic, opt) {
      var s = el.appendChild(document.createElement("span"));
      s.appendChild(document.createTextNode("(?)"));
      s.title = topic;
      if (opt && opt.label)
         dijit.setWaiState(s, "label", opt.label);
   },
   
   addField: function() {
      var fields = this.fields;
      if (arguments.length == 1) {
         var field = arguments[0];
         field.form = this;
         field.hideErrors = this._hideParentFormError;
         fields.push(field);
         if (field.name)
            this.byName[field.name] = field;
         return field;
      }
      return this._addField.apply(this, arguments);
   },
   
   clearExtraButtons: function() {
      var buttons = this.extraButtons;
      delete this.extraButtons;

      if (!buttons)
         return;

      var buttonDivNode = this.buttonDivNode;
      for(var i=0; i < buttons.length; i++)
         buttonDivNode.removeChild(buttons[i]);
   },
   
   setExtraButtons: function(buttons) {
      this.clearExtraButtons();
      if(!buttons)
         return;

      this.extraButtons = buttons = (dojo.isArray(buttons) ? buttons : [buttons]);
      var buttonDivNode = this.buttonDivNode;
      var insertionPoint = this.saveNode ? this.saveNode.nextSibling : null;
      for(var i=0; i < buttons.length; i++)
         buttonDivNode.insertBefore(buttons[i], insertionPoint);
   },
   
   validate: function() {
      var failed = dojo.filter(this.fields, function(f) {
         var fieldErrors = [];
         if (f._validate)
            f._validate(fieldErrors);
         if (fieldErrors.length > 0) {
            this.setFieldErrors(f, fieldErrors);
            return true;
         }
         this.hideFieldErrors(f);
         return false;
      },this);
      return failed.length == 0;
   },
   
   //hideErrors: function() {},
   //setFormError: function(/*String, Node, or Array of nodes*/contents, /* Optional error object */error) {},
   //setFieldErrors: function(field, c) {},
   //hideFieldErrors: function(field, type) {},
   
   /** Used as the implementation of hideErrors for child fields */
   _hideParentFormError: function() {
      this.form.hideFieldErrors(this);
   },
      
   /**
    * Fired when an error occurs in an action that should be presented to the user.  The default implementation 
    * will show a generic error on the form.
    * 
    * @param error An object with information about the error.
    */
   onError: function(error) {
      this.setFormError(this._strings.ERROR_OCCURRED, error);
   }
});
