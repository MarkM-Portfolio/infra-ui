/* Copyright IBM Corp. 2015, 2016  All Rights Reserved.        */

define([
  "dojo/_base/declare",
  "./EntryWidget",
  "../dialog/CommentDialog",
  "dojox/html/entities",
  "dojo/_base/lang",
  "../config/globals",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/string",
  "dojo/dom-class",
  "../util/html",
  "dojo/dom-construct",
  "../action/FlagAction",
  "../uiState",
  "dojo/topic"
], function (declare, EntryWidget, CommentDialog, entities, lang, globals, i18n, string,
    domClass, html, domConstruct, FlagAction, uiState, topic) {
  return declare([ EntryWidget ], {
    visibleContentLines: 16,
    htmlContentText: true,
    postMixInProperties: function () {
      this.nls = i18n.COMMENT_WIDGET;
      this.baseClasses = "comment";
      this.reloadItem = true;
      this.DialogFactory = CommentDialog;

      this.h1 = "";
      this.h2 = "";
      this.h3 = "";
      this.content = "";
      this.footer = string.substitute(i18n.PANEL.COMMENTS.VERSION, [this.entry.get("version")]);
      
      this.editTooltip = i18n.ACTION.EDIT_COMMENT.TOOLTIP;
      this.removeTooltip = i18n.ACTION.DELETE_COMMENT.TOOLTIP;
      if (i18n.ACTION.FLAG){
        this.flagTooltip = i18n.ACTION.FLAG.COMMENT.NAME;
      } else {
      	this.flagTooltip = "Flag as Inappropriate";
      }
      this.usernameMaxWidth = 226;
    },

    postCreate: function () {
      this.inherited(arguments);
      this.setUserName(this.entry.get("author"), this.h1Node);
      this.setUserImage(this.entry.get("author"));
      
      this._displayCommentDate();
      this.entry.watch("dateModified", lang.hitch(this, function () {
        this._displayCommentDate();
      }));
      
      this.entry.watch("content", lang.hitch(this, function (name, oldValue, value) {
        this.set("content", value);
      }));
      
      this.commentSizeWatch = uiState.watch("panelSize", lang.hitch(this, function (name, oldValue, value) {
         if (value != oldValue) {
            this._contentText._addExpandLink();
         }
      }));
      
      this.selectPanelHandle = topic.subscribe("ic-fileviewer/selectpanel", lang.hitch(this, function (args) {
         if (args && args[0] == "comments") {
            this._contentText._addExpandLink();
         }
      }));
    },
    
    startup: function () {
      this.inherited(arguments);
      
      this.set("content", this.entry.get("content"));
    },
    
    _displayCommentDate: function () {
      var dateCreated = this.entry.get("dateCreated"),
        dateModified = this.entry.get("dateModified");
      html.setText(this.h2Node, this.formatDate(dateCreated));
      
      if (dateCreated.getTime() !== dateModified.getTime()) {
        var editedMessage = domConstruct.create("span", {}, this.h2Node);
        html.setText(editedMessage, " " + this.nls.EDITED);
        editedMessage.title = this.formatDate(dateModified, this.nls.EDITED_DATE);
      }
    },

    _setContentText: function (commentContent) {
      domClass.remove(this.domNode, "editing");
      
      var superMethod = this.getInherited(arguments);
      commentContent = lconn.core.util.text.htmlify(commentContent);
      superMethod.apply(this, [commentContent]);
      
      if (lang.isFunction(globals.attachBizCard)) {
        globals.attachBizCard(this.contentContainer);
      }
    },
    
    _setContentWidget: function (editBox) {
      domClass.add(this.domNode, "editing");
      this.inherited(arguments);
    },
    
    flag: function () {
      var flagAction = FlagAction.create({item: this.entry});
      flagAction.createDialog();
    },
    
    destroy: function () {
       this.commentSizeWatch.remove();
       this.selectPanelHandle.remove();
    }
  });
});
