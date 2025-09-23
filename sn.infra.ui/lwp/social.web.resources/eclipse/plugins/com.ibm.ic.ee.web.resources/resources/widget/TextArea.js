/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dijit/form/Textarea",
	"dijit/focus"
], function (dojo, declare, lang, domAttr, domStyle, Textarea, focusUtils) {

	var TextArea = declare("com.ibm.social.ee.widget.TextArea", Textarea, {
	   placeHolder: null,
	   baseClass: "lotusText eeTextArea",
	   name: "description",
	   noPlaceholder: false,
	   intermediateChanges: true,
	   ariaLabel: null,
	   constructor: function(opts) {
	      if(opts)
	         lang.mixin(this, opts);
	      if (!this.noPlaceholder)
	         this.placeHolder = this.value;
	   },
	   postCreate: function () {
	      this.inherited(arguments);
	      this.textAreaNode = this.domNode;
	      domAttr.set(this.textAreaNode, "aria-label", this.ariaLabel || this.placeHolder);
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
	         var txt = this.get("value");
	         return txt.replace(/^\s*/,"");
	      }
	   },
	   focus: function () {
	      focusUtils.focus(this.textAreaNode);
	   },
	   setText: function(txt) {
	      this.set("value", txt);
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
	         domStyle.set(scope.domNode, "color", "#000");
	         scope.showingPlaceholder = false;
	         scope.onHeightChanged();
	      }, 0);
	   },
	   showPlaceHolder: function() {
	      var scope = this;
	      window.setTimeout(function() {
	         scope.setText(scope.placeHolder);
	         domStyle.set(scope.domNode, "color", "#666");
	         scope.showingPlaceholder = true;
	      }, 0);
	   }
	});
	return TextArea;
});
