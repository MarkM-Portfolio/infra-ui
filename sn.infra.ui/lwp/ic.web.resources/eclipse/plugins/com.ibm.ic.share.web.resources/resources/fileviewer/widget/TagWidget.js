/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/_base/array",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/TagWidget.html",
  "dojo/text!./templates/Tag.html",
  "dojo/dom-construct",
  "dojo/_base/lang",
  "./TagTypeAhead",
  "dojo/dom-class",
  "dojo/_base/config",
  "../data/util/routes",
  "../util/validation",
  "./MessageBox",
  "../util/network",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/window",
  "dojo/when",
  "dojox/html/entities",
  "dojo/on",
  "dojo/dom",
  "dojo/dom-attr",
  "dojo/dom-style",
  "../util/html",
  "dojo/has",
  "../util/fidoNewRelic",
  "../util/history"
  ], function (declare, array, _WidgetBase, _TemplatedMixin, template, tagTemplate, domConstruct, lang, TagTypeAhead,
    domClass, config, routes, validation, MessageBox, networkUtil, i18n, win, when, entities, on, dom, domAttr, domStyle,
    htmlUtil, has, fidoNewRelic, historyUtil) {

  var Tag = declare([_WidgetBase, _TemplatedMixin], {
    templateString: tagTemplate,
    
    postMixInProperties: function () {
      this._blank = config.blankGif;
      var backgroundPageUrl = historyUtil.backgroundPageUrl;
      this.url = routes.getTagUrl(this.file, this.value, backgroundPageUrl);
      this.entryNls = i18n.ENTRY;
      this.displayValue = this.value;
    },
    
    postCreate: function () {
      htmlUtil.processLink(this.tagLink);
    },
    
    _remove: function () {
      this.emit("remove", {tag: this});
    },
    
    _linkClicked: function () {
      this.emit("linkclicked", {tag: this});
    },
    
    onremove: function () {},
    onlinkclicked: function () {}
  });

  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,
    
    _TagTypeAhead: TagTypeAhead,

    postMixInProperties: function () {
      this.nls = i18n.TAG_WIDGET;
    },
    
    postCreate: function () {
      var msgArgs = {type: "error"};
      this._errorBox = MessageBox.create(msgArgs);
      this._errorBox._hide();
      this._errorBox.placeAt(this.errorContainer);

      when(this.file.get("fullEntry"), lang.hitch(this, this._renderTags));
    },

    _renderTags: function () {
      domConstruct.empty(this.tagList);
      array.forEach(this.file.get("tags"), function (tagName) {
        var tag = new Tag({value: tagName, file: this.file}),
        listItem = domConstruct.create("li", {}, this.tagList);

        tag.on("remove", lang.hitch(this, this._removeTag, listItem));
        tag.on("linkclicked", lang.hitch(this, function () {
          this.stopEditing();
        }));

        tag.placeAt(listItem);
        tag.startup();
      }, this);
      this._onTagsUpdated();
    },
    
    _onTagsUpdated: function () {
      if (this.file.get("tags").length === 0) {
        domClass.add(this.entryWidget.domNode, "emptyContent");
        domStyle.set(this.tagList, "display", "none");
      } else {
        domClass.remove(this.entryWidget.domNode, "emptyContent");
        domStyle.set(this.tagList, "display", "block");
      }
    },
    
    toggleEditing: function () {
      if (this._isEditing) {
        this.stopEditing();
      } else {
        this.startEditing();
      }
    },
    
    startEditing: function () {
      this._isEditing = true;
      domClass.add(this.domNode, "editing");
      domClass.add(this.entryWidget.domNode, "editing");
      
      var inputBox = this.inputBox = new this._TagTypeAhead({file: this.file});
      inputBox.placeAt(this.typeAheadContainer);
      inputBox.startup();
      inputBox.on("save", lang.hitch(this, this._addTags));
      inputBox.on("cancel", lang.hitch(this, this.stopEditing));
      inputBox.focus();
      
      setTimeout(lang.hitch(this, function () {
        this._setupBlurHandler();
      }), 0);
    },
    
    _setupBlurHandler: function () {
      this.focusHandler = on(document, has("ie") <= 9 ? "mousedown" : "click", lang.hitch(this, function (evt) {
        var el = evt.target;

        if (dom.isDescendant(el, this.inputBox.domNode) ||
            (this.inputBox.typeAhead.dropDown && dom.isDescendant(el, this.inputBox.typeAhead.dropDown.domNode))) {
          return;
        }
                
        if (domAttr.has(el, "data-allowClick")) {
          return;
        }
        
        this.stopEditing();
      }));
    },
    
    stopEditing: function () {
      if (!this._isEditing) {
        return;
      }
      
      this._isEditing = false;
      domClass.remove(this.domNode, "editing");
      domClass.remove(this.entryWidget.domNode, "editing");
      this.inputBox.destroy();
      this._errorBox.removeMessage();
      this.focusHandler.remove();
    },
    
    _addTags: function (e) {
      this._errorBox.removeMessage();
      
      if (!validation.validateTags(e.inputBox)) {
        return;
      }
      
      var tags = e.inputBox.getValue();
      this.file.addTags(tags).then(lang.hitch(this, this._onAddTagsComplete), lang.hitch(this, this._displayError, this.nls.ERROR.SAVE));
    },
    
    _onAddTagsComplete: function () {
      this._renderTags();
      this.inputBox.reset();
      this.inputBox.focus();
    },
    
    _removeTag: function (listItem, e) {
      this._errorBox.removeMessage();
      this.file.removeTag(e.tag.value).then(lang.hitch(this, function () {
        e.tag.destroy();
        domConstruct.destroy(listItem);
        
        this._onTagsUpdated();
      }), lang.hitch(this, this._displayError, this.nls.ERROR.DELETE));
      fidoNewRelic.track("removeTag");
    },
    
    _displayError: function (errorStrings, error) {
      win.scrollIntoView(this.errorContainer);
      this._errorBox.setMessage(networkUtil.getErrorMessage(error, errorStrings));
    }
  });
});
