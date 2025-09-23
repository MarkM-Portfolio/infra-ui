/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/topic",
  "../util/ibmDocs",
  "../util/html",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-construct",
  "dojo/_base/array",
  "../config/globals",
  "dojo/_base/lang",
  "dojo/promise/all",
  "dojo/Deferred",
  "dojo/on",
  "../data/docsApi",
  "../util/network"
], function (topic, ibmDocs, html, i18n, domConstruct, array, globals, lang, all, Deferred, on, docsApi, network) {
  "use strict";
  
  return {
    nls: i18n.DOCS_STATUS_MESSAGE || {},

    _checkIfValid: function () {
      var promise = new Deferred();
      
      if (!this.file.get("isDocsFile")) {
        promise.resolve(false);
      } else {
        promise = this.file.get("fullEntry").then(lang.hitch(this, function () {
          return this.file.get("permissions").canEdit();
        }));
      }
      
      return promise;
    },

    render: function (file) {
      this.file = file;
      this._checkIfValid().then(lang.hitch(this, function (isValid) {
        if (!isValid) {
          return;
        }
        
        this._render();
      }));
    },
    
    _render: function () {
      ibmDocs.isDocsEnabled().then(lang.hitch(this, function (isDocsEnabled) {
        if (!isDocsEnabled) {
          this._renderNoEntitlementMessage();
        } else {
          this._renderDraftInfoMessage();
        }
      }));
      
    },
    
    _renderNoEntitlementMessage: function () {
      topic.publish("ic-fileviewer/push/messages", { type: "info", message: this.nls.NO_ENTITLEMENT});
    },
    
    _renderDraftInfoMessage: function () {
      this.file.getDocsDraftInfo().then(lang.hitch(this, function (info) {
        if (!info) {
          return;
        }
        
        if (info.get("editors").length !== 0) {
          this._renderEditorMessage(info.get("editors"));
        } else if (info.get("hasChanges")) {
          this._renderPublishMessage();
          this._addDraftUpdateInfo(info);
        }
      }));
    },

    _addDraftUpdateInfo: function(info) {
       this.file.unpublishedChanges.draftUpdateDate = info.get("dateModified");
       this.file.unpublishedChanges.baseVersion = info.get("baseVersion");
       this.file.unpublishedChanges.hasChanges = info.hasChanges; 
    },
    
    _renderEditorMessage: function (editors) {
      var node = domConstruct.create("div");
      html.substitute(window.document, node, this.nls.CURRENT_EDITORS, {
        users: function() {
           var usersEl = document.createDocumentFragment();
              array.forEach(editors, function(editor, i) {
                 var personCardEl = document.createDocumentFragment();
                 html.generateLinkToUser(editor, personCardEl);
                 usersEl.appendChild(personCardEl);
                 
                 if (i !== editors.length - 1) {
                    usersEl.appendChild(document.createTextNode(",\u00A0"));
                 }
              }, self);//TODO: bug?

           return usersEl;
        }
      });
      topic.publish("ic-fileviewer/push/messages", { type: "info", message: node});
    },

    _renderPublishMessage: function () {
      var node = domConstruct.create("div"), publishLink;
      node.appendChild(document.createTextNode(this.nls.UNPUBLISHED_CHANGES + " "));
      publishLink = domConstruct.create("a", {href: "javascript:;", innerHTML: this.nls.PUBLISH_A_VERSION}, node);
      on(publishLink, "click", lang.hitch(this, this._publish));

      topic.publish("ic-fileviewer/push/clearMessages", { forceRemove: true });

      this._publishMessage = { type: "warning", message: node , isSticky: true};
      topic.publish("ic-fileviewer/push/messages", this._publishMessage);
    },
    
    _publish: function () {
      topic.publish("ic-fileviewer/push/removeMessage", this._publishMessage);
      topic.publish("ic-fileviewer/manualpublishing");
      docsApi.publish(this.file).then(lang.hitch(this, this._onPublishSuccess), lang.hitch(this, this._onPublishError));
    },
    
    _onPublishSuccess: function () {
      // TODO: Find a better way to do this by such listening for version changes in the version panel instead
      // (there were issues with this due to the fact that doing this would cause multiple refreshes in some cases)
      this.file.load().then(lang.hitch(this, function () {
        topic.publish("ic-fileviewer/dirty");
        topic.publish("ic-fileviewer/refresh");
      }));
    },
    
    _onPublishError: function (error) {
      var errorMessage = network.getErrorMessage(error, this.nls.PUBLISH_ERROR);
      topic.publish("ic-fileviewer/push/messages", { type: "error", message: errorMessage });
    }
  };
});
