/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("com.ibm.social.ee.widget.TextArea");

dojo.require("dijit.form.Textarea");

dojo.declare("com.ibm.social.ee.widget.TextArea", [dijit.form.Textarea], {
   placeHolder: null,
   baseClass: "lotusText eeTextArea",
   name: "description",
   noPlaceholder: false,
   intermediateChanges: true,
   ariaLabel: null,
   constructor: function(opts) {
      if(opts)
         dojo.mixin(this, opts);
      if (!this.noPlaceholder)
         this.placeHolder = this.value;
   },
   postCreate: function () {
      this.inherited(arguments);
      this.textAreaNode = this.domNode;
      dojo.attr(this.textAreaNode, "aria-label", this.ariaLabel || this.placeHolder);
      if (!this.noPlaceholder)
         this.showPlaceHolder();
   },
   _onInput: function () {
      var initialHeight = this.textbox.style.height;
      this.inherited(arguments);
      if (initialHeight && this.textbox.style.height != initialHeight)
         this.onHeightChanged();
   },
   onFocus: function () {
      if (this.placeHolder && this.showingPlaceholder) {
         this.hidePlaceHolder();
      }
      this.inherited(arguments);
   },
   onBlur: function() {
      if (this.placeHolder && this.getText() == "") {
         this.showPlaceHolder();
      }
      this.inherited(arguments);
   },
   onHeightChanged: function () { 
   },
   getText: function() { 
      if (this.showingPlaceholder)
         return "";
      else {
         var txt = this.attr("value");
         return txt.replace(/^\s*/,"");
      }
   },
   focus: function () {
      dijit.focus(this.textAreaNode);
   },
   setText: function(txt) {
      this.attr("value", txt);
   },
   resetBox: function() {
      var scope = this;
      scope.showPlaceHolder();
      window.setTimeout(function() {
         scope.onHeightChanged();
      }, 50);
   },
   hidePlaceHolder: function() {
      var scope = this;
      window.setTimeout(function() {
         scope.setText("");
         dojo.style(scope.domNode, "color", "#000");
         scope.showingPlaceholder = false;
         scope.onHeightChanged();
      }, 0);
   },
   showPlaceHolder: function() {
      var scope = this;
      window.setTimeout(function() {
         scope.setText(scope.placeHolder);
         dojo.style(scope.domNode, "color", "#666");
         scope.showingPlaceholder = true;
      }, 0);
   }
});