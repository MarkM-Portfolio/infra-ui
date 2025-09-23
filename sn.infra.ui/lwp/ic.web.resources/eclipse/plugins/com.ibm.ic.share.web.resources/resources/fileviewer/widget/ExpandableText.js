/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/ExpandableText.html",
  "dojo/dom-style",
  "dojo/dom-class",
  "dojo/dom-geometry",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-construct",
  "../util/html",
  "dojo/query",
  "dojo/_base/lang" 
  ], function (declare, _WidgetBase, _TemplatedMixin, template, domStyle, domClass, domGeometry, i18n, domConstruct,
    html, query, lang) {
  
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,
    
    htmlText: false,
    
    visibleLines: -1,
    showCollapseLink: true,
    
    postMixInProperties: function () {
      this.nls = i18n.EXPANDABLE_TEXT;
      this.expandable = this.visibleLines >= 0;
    },
    
    postCreate: function () {
      this.readMoreLink.style.display = "none";
    },
    
    startup: function () {
      this.inherited(arguments);
      
      if (this.text !== undefined) {
        this._renderText();
      }
    },
    
    _setTextAttr: function (text) {
      this.text = text;
      
      if (this._started) {
        this._renderText();
      }
    },
    
    _renderText: function () {
      domConstruct.empty(this.textNode);
      var txt = this.text;

      if (lang.getObject("lconn.core.globalization.api.isBidiEnabled")) {
		  if (lconn.core.globalization.api.isBidiEnabled()) {
			  txt = lconn.core.globalization.bidiUtil.enforceTextDirectionMultiLine(this.text, "AT_USER");
		  } 
      }

      var node;
      if (this.htmlText) {
        node = domConstruct.toDom(txt);
      } else {
        node = document.createDocumentFragment();
        html.createTextNode(document, node, txt);
      }
      this.textNode.appendChild(node);
      query("a", this.textNode).forEach(html.processLink);
      
      if (this.expandable) {
        this._addExpandLink();
      }
    },
    
    _addExpandLink: function () {
      this.expand();
      domClass.remove(this.domNode, "collapsable");
      this.readMoreLink.style.display = "";
      
      var computedStyle = domStyle.getComputedStyle(this.textContainer);
      this._lineHeight = Number(computedStyle.lineHeight.replace("px", ""));

      this._collapsedHeight = this._lineHeight * this.visibleLines;
      this._fullHeight = domGeometry.position(this.textContainer).h;
      
      if (this._lineHeight && ((this._collapsedHeight + this._lineHeight) < this._fullHeight)) {
        this.collapse();
        
        if (this.showCollapseLink) {
          domClass.add(this.domNode, "collapsable");
        }
      }
    },
    
    collapse: function () {
      domStyle.set(this.textContainer, "maxHeight", (this._lineHeight * this.visibleLines) + "px");
      domClass.remove(this.domNode, "expanded");
      this.textNode.innerHTML = this.text;
    },

    expand: function () {
      domStyle.set(this.textContainer, "maxHeight", "none");
      domClass.add(this.domNode, "expanded");
      this.emit("expand", {});
      this.textNode.innerHTML = this.text;
    }

  });
});
