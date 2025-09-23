/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([ 
  "dojo/_base/declare",
  "dojo/_base/lang",
  "./EntryWidget",
  "./Stream",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/dom-class",
  "dojo/dom-style",
  "dojo/fx",
  "../util/html",
  "dojo/sniff"
], function(declare, lang, EntryWidget, Stream, domConstruct, on, domClass, domStyle, coreFx, html, has) {

  return declare([ EntryWidget ], {
    postMixInProperties : function() {
      this.baseClass = "dropdownStream " + this.entry.baseClasses;

      this.h1 = this.entry.h1 || "";
      this.h2 = this.entry.h2 || "";
      this._isOpen = false;
      this.firstLoad = true;
    },
    
    postCreate: function() {
      this._setupLinks();
      if (this.entry.isRecommendations) {
         this.file.watch("recommendations", lang.hitch(this, function(name, oldValue, newValue) {
            html.setText(this.linkNode, this.file.get("recommendations"));
            html.setText(this.linkSpan, this.file.get("recommendations"));
            this._disableRecommendationsCheck();
            this.reset();
         }));
      }
    },
    
    _setupLinks: function() {
      var link = this._addLink(this.h1, this.h1Node);
      on(link, "click", lang.hitch(this, this._clickHandler));
      
      if (this.h2) {
        link = this._addLink(this.h2, this.h2Node);
        on(link, "click", lang.hitch(this, this._clickHandler));
      }

      on(this.iconNodeContainer, "click", lang.hitch(this, this._clickHandler));
      domStyle.set(this.iconNodeContainer, "cursor", "pointer");
      if (this.entry.isRecommendations)
        this._disableRecommendationsCheck();
      if (this.entry.isDownloads)
         this._disableDownloadsCheck();
    },
    
    _disableRecommendationsCheck: function() {
       if (("" + this.file.get("recommendations")) === "0") {
         domClass.add(this.domNode, "hideLinks");
       } else {
         domClass.remove(this.domNode, "hideLinks");
       }
    },
    _disableDownloadsCheck: function() {
       if (("" + this.file.get("downloads")) === "0") {
         domClass.add(this.domNode, "hideLinks");
       } else {
         domClass.remove(this.domNode, "hideLinks");
       }
    },
    
    _addLink: function(value, parent) {
      var node = this.linkNode = domConstruct.create("a", {"class": "dropdownLink", innerHTML: value, href: "javascript:;", role: "button"}, parent, "only");
      var nodeSpan = this.linkSpan = domConstruct.create("span", {"class": "dropdownLinkSpan", innerHTML: value}, parent);

      return node;
    },
    
    _clickHandler: function() {
      if (!this._stream) {
        this._createStream();
      } else {
        this._toggleStreamPanel();
      }
    },

    _createStream: function () {
      this._stream = new Stream({
        file: this.file,
        dataKey: this.dataKey,
        entryConstructor: this.entryConstructor,
        entryArgs: this.entry.entryArgs
      });
      this._stream.placeAt(this.contentContainer);
      this._stream.on("loaded", lang.hitch(this, function () {
         if(this.firstLoad == true) {
            domStyle.set(this._stream.domNode, "display", "none");
            coreFx.wipeIn({
              node : this._stream.domNode
            }).play();
            this.firstLoad = false;
            domClass.toggle(this.iconNode, "open");
         }
       }));
      
    },

    _toggleStreamPanel: function() {
      if (has("ie") === 8) {
         if (domStyle.get(this._stream.domNode, "display") == "none") {
            domStyle.set(this._stream.domNode, "display", "");
         } else {
            domStyle.set(this._stream.domNode, "display", "none");
         }
      } else {
         if (domStyle.get(this._stream.domNode, "display") == "none") {
            coreFx.wipeIn({
               node : this._stream.domNode
            }).play();
         } else {
            coreFx.wipeOut({
               node : this._stream.domNode
            }).play();
         }
      }

      domClass.toggle(this.iconNode, "open");
    },
    
    reset: function () {
      if (this._stream) {
        domStyle.set(this._stream.domNode, "display", "none");
        this._stream = undefined;
      }
      domClass.remove(this.iconNode, "open");
    }
  });
});
