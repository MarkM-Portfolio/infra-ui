/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "./Stream",
  "./CommentWidget",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dojo/dom-class",
  "../widget/CommentBox",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/CommentsPanel.html",
  "../util/validation",
  "../config/globals",
  "../widget/MessageBox",
  "../util/network",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/topic"
], function (declare, Stream, CommentWidget, lang, array, domConstruct, domClass, CommentBox, _WidgetBase, _TemplatedMixin,
    template, validation, globals, MessageBox, networkUtil, i18n, topic) {
  "use strict";

  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    constructor: function () {
      this.CommentBox = CommentBox;
      this.CommentWidget = CommentWidget;
    },
    
    postMixInProperties: function () {
      // this.nls = i18n.COMMENTS;
      
      // Temporary fallback for D43 until strings are translated
      this.nls = lang.clone(i18n.COMMENTS);
      if(!this.nls.EMPTY) {
        this.nls.EMPTY = "There are no comments.";
      }
      if(!this.nls.MODERATED){
        this.nls.MODERATED = "The comment has been submitted for review and will be available when approved.";
      }
    },
    
    postCreate: function () {
      this._addCommentBox();
      this._addCommentStream();
      var bidiUtil = dojo.getObject("lconn.core.globalization.bidiUtil");
      if (bidiUtil) {      
      	lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.domNode);
      }
    },
    
    _addCommentBox: function () {
      if (!globals.isAuthenticated) {
        return;
      }
      
      var commentBox = this.commentBox = new this.CommentBox({
        file: this.file,
        showShadowText: true,
        cancelOnBlur: true,
        isNew: true
      });
    
      commentBox.on("save", lang.hitch(this, this._createComment));
      
      commentBox.placeAt(this.addCommentContainer);
      commentBox.startup();
    },
    
    _addCommentStream: function () {
      var commentStream = this.commentStream = new Stream({
        file: this.file,
        dataKey: "commentFeed",
        entryConstructor: CommentWidget,
        factory: this.factory,
        edit: lang.hitch(this, this._onEdit),
        deleteErrorStrings: this.nls.ERROR.DELETE,
        isActionValid: this._isActionValid
      });
      
      commentStream.placeAt(this.streamContainer);
      
      this.commentStream.on("loaded", lang.hitch(this, function(){
        this._toggleNoCommentsContainer();
      }));
    },
    
    _toggleNoCommentsContainer: function() {
      if(this.commentStream.size() == 0) {
        domClass.remove(this.noCommentsContainer, "hideNoCommentsContainer");
      } else {
        domClass.add(this.noCommentsContainer, "hideNoCommentsContainer");
      }
    },
    
    _onEdit: function (commentWidget) {
      var commentBox = new this.CommentBox({
        file: this.file
      });
      var comment = commentWidget.entry;

      commentWidget.set("content", commentBox);
      commentBox.startup();
      commentBox.setValue(comment.get("content"));
      
      commentBox.on("save", lang.hitch(this, this._updateComment, commentWidget));
      commentBox.on("cancel", lang.hitch(this, function (e) {
        commentWidget.set("content", comment.get("content"));
      }));
    },
    
    _createComment: function (e) {
      if (!validation.validateComment(e.commentBox)) {
        return;
      }
      
      var feed = this.file.get("commentFeed");
      var comment = feed.newItem({content: e.commentBox.getValue()});
      
      comment.create().then(
         lang.hitch(this, this._checkContentApproval, comment),
         lang.hitch(this, this._displayError, this.nls.ERROR.SAVE, e.commentBox));
    },
    
    _updateComment: function (commentWidget, e) {
      if (!validation.validateComment(e.commentBox)) {
        return;
      }
      
      var comment = commentWidget.entry;
      comment.set("content", e.commentBox.getValue());
      
      comment.update().then(
         lang.hitch(this, this._checkContentApproval, comment),
         lang.hitch(this, this._displayError, this.nls.ERROR.SAVE, e.commentBox));
    },
    
    _checkContentApproval: function(comment) {
       if(comment.get("status") === "pending"){
         topic.publish("ic-fileviewer/push/messages", {
           type: "success",
           message: this.nls.MODERATED,
           cancelable: true
         });
       }
       this.commentStream.refresh();
       this.commentBox.reset();
   },
    
    
    _displayError: function (errorStrings, commentBox, error) {
      var msgArgs = {type: "error"};
      var errorBox = MessageBox.create(msgArgs);
      errorBox.placeAt(commentBox.errorContainer);
      errorBox.setMessage(networkUtil.getErrorMessage(error, errorStrings));
      commentBox.on("save, cancel", lang.hitch(this, function () {
        errorBox.removeMessage();
      }));
    },
    
    _isActionValid: function (action, commentWidget) {
      var permissions = commentWidget.entry.get("permissions"),
      reportUrl = commentWidget.entry.get("reportUrl"),
      isFlaggable = reportUrl && (reportUrl !== "");
      if (action === "edit") {
        return permissions.Edit;
      } else if (action === "delete"){
        return permissions.Delete;
      } else if (action === "flag") {
        return globals.isAuthenticated && isFlaggable;
      }
      return false;
    }
  });
});
