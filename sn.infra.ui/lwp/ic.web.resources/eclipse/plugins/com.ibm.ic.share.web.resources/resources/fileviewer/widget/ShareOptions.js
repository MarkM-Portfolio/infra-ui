/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/ShareOptions.html",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/on",
  "dojo/_base/lang",
  "dojo/dom-style",
  "dojo/when",
  "dojo/topic",
  "dojo/string",
  "../config/globals",
  "../dialog/ConfirmationDialog",
  "../util/network",
  "dijit/registry",
  "dojo/dom-attr"
], function (declare, _WidgetBase, _TemplatedMixin, template, i18n, on, lang, domStyle, when, topic,
    string, globals, ConfirmationDialog, network, registry, domAttr) {
  return declare([_WidgetBase, _TemplatedMixin], {

    templateString: template,

    _totalRequests: 0,

    postMixInProperties: function () {
      this.nls = i18n.SHARE_OPTIONS;
      this.title = this.nls.TITLE;
      this.canOthersShare = this.file.get("canOthersShare") || false;
      this.defaultCheck = "" + this.canOthersShare;
      
      if (!this.nls.OWNER_ONLY) {
        this.nls.OWNER_ONLY = "Only the owner can share this file.";
      }
    },

    postCreate: function () {
      this.setOptionVisibility();
      this.stopPropagation.checked = this.canOthersShare;
      on(this.stopPropagation, "change", lang.hitch(this, "_togglePropagation"));
      
      this.file.watch("visibility", lang.hitch(this, function () {
        this.refresh();
      }));

      this.stopPropagation.id = registry.getUniqueId("fileviewer") + "_stopPropagationBox";
      domAttr.set(this.stopPropagationLabel, "for", this.stopPropagation.id);
      domAttr.set(this.stopPropagationLabel, "innerHTML", this.nls.PROPAGATION);
    },

    _togglePropagation: function () {
      if (!this.requestInProgress) {
        this.requestInProgress = true;
        this.canOthersShare = !this.canOthersShare;
        this.file.set("canOthersShare", this.canOthersShare);

        this.file.update().then(lang.hitch(this, function () {

          this.requestInProgress = false;
          this.canOthersShare = this.file.get("canOthersShare");
          this.stopPropagation.checked = this.canOthersShare;
          this.refreshCallback();

        }), lang.hitch(this, function (err) {

          this.requestInProgress = false;
        }));
      }
    },

    _showStopSharePrompt: function () {
      when(globals.policy).then(lang.hitch(this, function (policy) {
        var prompt2;
        if(!!lang.getObject("capabilities.canView.communities", false, policy)){           
          prompt2 = this.file.get("visibility") === "public"? this.nls.MAKE_PRIVATE_DIALOG.QUESTION_PUBLIC: this.nls.MAKE_PRIVATE_DIALOG.QUESTION;
        } else{
          prompt2 = this.file.get("visibility") === "public"? this.nls.MAKE_PRIVATE_DIALOG.QUESTION_PUBLIC_E: this.nls.MAKE_PRIVATE_DIALOG.QUESTION_E;
        } 

        var strings = lang.clone(this.nls.MAKE_PRIVATE_DIALOG);
        strings.PROMPT2 = prompt2;

        var dialog = new ConfirmationDialog({strings: strings});
        dialog.on("clicked", lang.hitch(this, this._stopShare, dialog));
        dialog.render();
      })); 
    },
    
    _stopShare: function (dialog) {
      if (!this.requestInProgress) {
        this.requestInProgress = true;

        this.file.stopSharing().then(lang.hitch(this, function () {
          if (dialog) {
            dialog.onCancel();
          }

          this.requestInProgress = false;
          this.refreshCallback();

          topic.publish("ic-fileviewer/push/messages", {message: this.nls.MAKE_PRIVATE_SUCCESS, type: "success"});
        }), lang.hitch(this, function (err) {
          this.requestInProgress = false;
          if (dialog) {
            dialog.showError(network.getErrorMessage(err, this.nls.MAKE_PRIVATE_ERROR));
          }
        }));
      }
    },

    _setupInternal: function () {
      var strings = this.nls.MAKE_INTERNAL_DIALOG;
      if (!lang.getObject("capabilities.canView.communities", false, globals.policy)) {
        strings = strings.EFSS || strings;
      }
      
      strings.PROMPT = string.substitute(strings.PROMPT, {
        br: "<br>"
      });

      var dialog = new ConfirmationDialog({strings: strings});
      dialog.render();

      dialog.on("clicked", lang.hitch(this, function () {
        dialog.onCancel();
        this._makeInternal();
      }));
    },
    
    _makeInternal: function () {
      this.file.set("isExternal", false);
      this.file.update().then(lang.hitch(this, function () {
        topic.publish("ic-fileviewer/push/messages", {
          type: "success",
          message: this.nls.MAKE_INTERNAL_SUCCESS,
          cancelable: true
        });
        this.refreshCallback();
      }));
    },

    setOptionVisibility: function () {
      var isContentDisplayed = false;
      
      if (this.file.get("visibility") === "public" && !lang.getObject("lconn.files.config.isCloudMode")) { //if public and not cloud: "everyone can share"
        domStyle.set(this.propContent, "display", "none");
        domStyle.set(this.ownerShareContent, "display", "none");
        domStyle.set(this.everyoneShareContent, "display", "");
        isContentDisplayed = true;

      } else if (this.file.get("permissions").canGrantAccess()) { // if cloud and user can 'GrantAccess' show toggle box
        domStyle.set(this.propContent, "display", "");
        domStyle.set(this.ownerShareContent, "display", "none");
        domStyle.set(this.everyoneShareContent, "display", "none");
        isContentDisplayed = true;

      } else if (!this.file.get("canOthersShare")) { // if only owner can share: "only owner can share this file"
        domStyle.set(this.propContent, "display", "none");
        domStyle.set(this.ownerShareContent, "display", "");
        domStyle.set(this.everyoneShareContent, "display", "none");
        isContentDisplayed = true;

      } else { //else display nothing
        domStyle.set(this.domNode, "display", "none");
        domStyle.set(this.ownerShareContent, "display", "none");
        domStyle.set(this.everyoneShareContent, "display", "none");
      }

      if (this.file.get("visibility") === "private" || !this.file.get("permissions").canGrantAccess()) { //hide 'stop sharing' if file is already private, or user can't perform action
        domStyle.set(this.stopShareContent, "display", "none");
      } else {
        domStyle.set(this.stopShareContent, "display", "");
        isContentDisplayed = true;
      }

      when(globals.policy).then(lang.hitch(this, function (policy) {
        if (policy.isExternalEnabled && this.file.get("isExternal") && 
              this.file.get("permissions").canChangeSharingIntent()) {
          domStyle.set(this.makeInternalContent, "display", "");
          isContentDisplayed = true;
        } else {
          domStyle.set(this.makeInternalContent, "display", "none");
        }
        
        if (!isContentDisplayed) {
          domStyle.set(this.domNode, "display", "none");
        }
        
      }));
      
    },

    refresh: function () {
      this.setOptionVisibility();
    }
  });
});