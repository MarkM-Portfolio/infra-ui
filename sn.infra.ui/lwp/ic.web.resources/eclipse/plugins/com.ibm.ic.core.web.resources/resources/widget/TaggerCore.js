/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/i18n!ic-core/nls/tagger",
   "dojo/Deferred",
   "dojo/dom-construct",
   "dojo/_base/declare",
   "dojo/i18n",
   "dojo/html",
   "dojo/text!ic-core/widget/templates/Tagger.html",
   "dojo/topic",
   "dijit/_Templated",
   "dijit/_Widget"
], function (dojo, i18ntagger, Deferred, domConstruct, declare, i18n, html, template, topic, _Templated, _Widget) {

   var TaggerCore = declare("lconn.core.widget.TaggerCore", [_Widget, _Templated], {

      tags: null,
      editable: false,

      _strings: i18ntagger,

      size: 30,
      additionalClasses: "",

      templateString: template,

      postMixInProperties: function() {
        this.tags.sort();
      },

      buildRendering: function() {
        this.inherited(arguments);

        var addNode = this.addNode;
        this.editable = this.editable && !!addNode && !!this.formNode;
        if (this.editable) {
           this.renderAddLabel();
           addNode.style.display = "";
        }

        this.renderTags();
      },

      renderAddLabel: function() {
        var multipleTags = this.tags.length > 0;
        this.labelNode.style.display = multipleTags ? "" : "none";
        var strings = this._strings;
        html.set(this.addNode, multipleTags ? strings.addRemoveLabel : strings.addLabel);
      },

      renderTags: function(newTags) {
         var tags = newTags || this.tags;
         var separatorTemplateNode = this.separatorTemplateNode;
         var tagsNode = this.tagsNode;

         for (var i=0,l=tags.length; i<l; i++) {
            if (tagsNode.firstChild) {
               var separator = separatorTemplateNode.cloneNode(true);
               separator._sep = true;
               separator.style.display = "";
               tagsNode.appendChild(separator);
            }
            var tag = tags[i];
            var tagNode = tagsNode.appendChild(this.renderTag(tag))
            tagNode._tag = tag;
         }
      },

      renderTag: function(tag) {
         var node = this.tagTemplateNode.cloneNode(true);
         var a = node.firstChild;
         html.set(a, tag);
          // Force the close link to display on the correct side
         if (dojo._isBodyLtr()) a.appendChild(document.createTextNode("\u200F"));
         var links = this.links;
         if (links && links.tag)
            links.tag(a, tag);
         return a;
      },

      edit: function(e) {
        console.log("edit invoked on TaggerCore");
         if (e) e.preventDefault(), e.stopPropagation();
         if (!this.editable)
            return;

         domConstruct.empty(this.addNode);
         var img = document.createElement("img");
         img.src = this._blankGif;
         img.alt = img.title = "Loading...";
         img.className = "lotusLoading";
         this.addNode.appendChild(img);

         var baseClass = lconn.core.widget.TaggerCore;
         var deferred = baseClass._defer;
         if (!deferred) {
           deferred = baseClass._defer = new Deferred();
           setTimeout(function() { var d=dojo; d.require("lconn.core.widget.TaggerExtend"); baseClass._defer = null; deferred.callback(); }, 2000);
         }
         deferred.addCallback(this, "edit");
      },

      cancelEdit: function() {
        // stub
      },
      submit: function() {
        // stub
      }
   });
   return TaggerCore;
});
