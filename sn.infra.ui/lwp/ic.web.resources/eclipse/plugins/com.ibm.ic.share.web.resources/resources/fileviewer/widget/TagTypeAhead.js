/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "../config/globals",
   "dojo/text!./templates/TagTypeAhead.html",
   "dojo/_base/config",
   "dijit/focus",
   "dojo/on",
   "dojo/_base/lang",
   "dojo/keys",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/has",
   "dojo/dom-attr"
], function (declare, _WidgetBase, _TemplatedMixin, globals, template, config, focusUtil, on, lang, keys, i18n, has, domAttr) {
   
   return declare([_WidgetBase, _TemplatedMixin], {
     templateString: template,
     
     postMixInProperties: function () {
       this._blank = config.blankGif;
       this.tagNls = i18n.TAG_WIDGET;
       this.entryNls = i18n.ENTRY;
     },
     
     postCreate: function () {
       this.inherited(arguments);
       
       this.tagStore = this.file.get("tagFeed");
       
       var typeAheadId = this.id + "_selectTag";
       
       domAttr.set(this.typeAheadInputLabel, "for", typeAheadId); 
       domAttr.set(this.typeAheadInputLabel, "innerHTML", i18n.PANEL.ABOUT.ADD_TAGS);
       
       this.typeAhead = new globals.TagTypeAhead({
         id: typeAheadId,
         name: "_shareTaggerTypeAhead",
         size: "30",
         pageSize: 10,
         multipleValues: true,
         token: ' ',
         _strings: this._strings,
         hideEmptyResults: true,
         autoSelectChars: [],
         libraryId: this.libraryId,
         userLibrary: this.userLibrary,
         store: this.tagStore,
         popupClassName: "ics-viewer-tag-popup"
         }, this.typeAheadInput);
       
       this.textBox = this.typeAhead.textbox;
       
       on(this.textBox, "keydown", lang.hitch(this, function (e) {
         if (e.keyCode === keys.ENTER) {
           this._save();
           domAttr.remove(this.textBox, "aria-owns");
           e.stopPropagation();
           e.preventDefault();
         } else if (e.keyCode === keys.ESCAPE) {
           this._cancel();
           e.stopPropagation();
           e.preventDefault();
         }
       }));
     },
     
     getValue: function () {
       return this.textBox.value.replace(/["']/g, "").split(/\s+/g);
     },
     
     setValue: function (tags) {
       this.textBox.value = tags.join(" ");
     },
     
     reset: function () {
       this.textBox.value = "";
     },
     
     isEmpty: function () {
       return lang.trim(this.textBox.value).length === 0;
     },
     
     focus: function () {
       // Timeout 500 fixes dijit 1.9 bug where IE hangs when elements is focused
       // while another element is yet to be blurred
       var timeout = (has("ie") || has("trident")) ? 500 : 0;
       setTimeout(lang.hitch(this, function(){
         focusUtil.focus(this.textBox); 
       }), timeout);     
     },
     
     blur: function () {
       this.textBox.blur();
     },
     
     _save: function () {
       this.emit("save", {inputBox: this});
     },
     
     _cancel: function () {
       this.reset();
       this.emit("cancel", {inputBox: this});
     },
     
     onsave: function () {},
     oncancel: function () {}
   });
});
