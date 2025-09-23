/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dojo/text!./templates/CreateFromTemplate.html",
  "dijit/Dialog",
  "dojo/_base/lang",
  "./DialogAction",
  "dojo/Evented",
  "dojo/dom-style",
  "../widget/MessageBox",
  "dojo/when",
  "dojo/Deferred",
  "../config/globals",
  "../data/util/routes",
  "../network/request",
  "dojo/string",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/dom-attr",
  "dijit/registry",
  "dojo/keys",
  "dojo/on"
  ], function (declare, template, Dialog, lang, DialogAction, Evented, domStyle, MessageBox, when,
      Deferred, globals, routes, request, string, i18n, domAttr, registry, keys, on) {
  // Should be identical with CreateFromTemplateAction.doc_type
  var doc_type = {
      "ott" : "text",
      "ots" : "sheet",
      "otp" : "pres",
      "dot" : "text",
      "xlt" : "sheet",
      "pot" : "pres",
      "dotx" : "text",
      "xltx" : "sheet",
      "potx" : "pres"
  },

  ext_type = {
      "ott" : ".odt",
      "ots" : ".ods",
      "otp" : ".odp",
      "dot" : ".doc",
      "xlt" : ".xls",
      "pot" : ".ppt",
      "dotx" : ".docx",
      "xltx" : ".xlsx",
      "potx" : ".pptx"
  };

  return declare([Dialog, Evented], {
    "class": "templateCreateDialog",
    requestInProgress: false,
    
    constructor: function(args) {
      lang.mixin(this, args);
      var dialogNLS = lang.clone(i18n.ACTION.CREATE_FROM_TEMPLATE);
      dialogNLS.PROMPT = dialogNLS.PROMPT[doc_type[this.file.get("type")].toUpperCase()];
      var contentWidget = new DialogAction({
        template: template,
        nls: dialogNLS,
        fileNameInputId: registry.getUniqueId("fileviewer") + "_create_file_name",
        externalCheckboxId: registry.getUniqueId("fileviewer") + "external_checkbox"
      });
      this.nls = i18n.ACTION.CREATE_FROM_TEMPLATE;
      this.title = this.name = this.nls.NAME;

      contentWidget.clickLink = lang.hitch(this, function (e) {
        if (e.target.id === "ok" && !this.requestInProgress) {
          this.createNewFile();
        } else if (e.target.id === "cancel") {
          this.onCancel();
        }
      });
      
      on(contentWidget.fileName, "keydown", lang.hitch(this, function(evt) {
         if (keys.ENTER == evt.keyCode && !this.requestInProgress) {
            evt.stopPropagation();
            evt.preventDefault();
            this.createNewFile();
         }
      }));
      
      on(contentWidget.isExternal, "keydown", lang.hitch(this, function(evt) {
         if (keys.ENTER == evt.keyCode) {
            evt.stopPropagation();
            evt.preventDefault();
         }
      }));

      contentWidget.startup();
      this.content = contentWidget;
    },
    
    createNewFile: function () {
       this.requestInProgress = true;
       when(this.validateInput(), lang.hitch(this, function (isValid) {
          this.requestInProgress = false;
          if (isValid) {
            this.emit("clicked", {});
          }
       }));
    },

    showError: function (errorString) {
      this._errorBox.setMessage(errorString);
    },
    
    postCreate: function () {
      this.inherited(arguments);
      domStyle.set(this.content.externalContainer, "display", "none");
      this.content.fileName.value = this.nls.PRE_FILL_NAMES[this.file.get("type").toUpperCase()];
      
      this.showExternalOption();
      
      var contentId = registry.getUniqueId("fileviewer") + "_templateCreateDialog"
      domAttr.set(this.domNode, "aria-label", this._get("title"));
      domAttr.set(this.domNode, "aria-describedBy", contentId);
      domAttr.set(this.content.promptContainer, "id", contentId);
      
      var msgArgs = {type: "error"};
      this._errorBox = MessageBox.create(msgArgs);
      this._errorBox._hide();
      this._errorBox.placeAt(this.content.errorContainer);
    },
    
    validateInput: function () {
      var deferred = new Deferred(),
      input_text = this.content.fileName.value,
      fileNameLength = globals.validationUtil.FILENAME_LENGTH,
      bytesExt = ext_type[this.file.get("type")],
      bytesExtLength = globals.textUtil.lengthUtf8(bytesExt);
      
      if (lang.trim(input_text) == "") {
        this.showError(this.nls.ERRORS.NAME_REQUIRED);
        return deferred.resolve(false); // resolves 'isValid'
      }
      
      if (!/^([^\\\/\:\*\?\"\<\>\|]+)$/.test(input_text)) {
        this.showError(this.nls.ERRORS.ILLEGAL_NAME);
        return deferred.resolve(false); // resolves 'isValid'
      }
      
      if(!globals.validationUtil.validateTextLength(input_text, (fileNameLength - bytesExtLength))) {
        this.showError(this.nls.ERRORS.WARN_LONG_NAME);
        return deferred.resolve(false); // resolves 'isValid'
      }
      
      this._checkExistingTitle().then(lang.hitch(this, function (isValid) {
        if (isValid) {
          deferred.resolve(true); // resolves 'isValid'
        } else {
          deferred.resolve(false); // resolves 'isValid'
        }
      }));
      return deferred;
    },
    
    _checkExistingTitle: function () {
      var url = null,
      deferred = new Deferred();
      //personalFile: /files/form/api/userlibrary/{person-id}/document/{document-label}/entry?identifier=label
      //communityFile: /files/form/api/communitylibrary/{communityId}/document/{document-label}/entry?identifier=label
      url = routes.getNameCheckUrl("/document/${document-label}/entry?identifier=label", this.file);

      url = string.substitute(url, {
        "person-id": globals.currentUser.id,
        "document-label": encodeURI(this.content.fileName.value + ext_type[this.file.get("type")]),
        "communityId": this.file.get("communityId")
      });
      
      request(url, {
        noStatus: true,
        auth: {},
        preventCache: true,
        method: "HEAD",
        sync: true,
        handle: lang.hitch(this, function (response, ioArgs) {
          this._handleResponse(deferred, response, ioArgs);
        })
      });
      
      return deferred;
    },
    
    _handleResponse: function (deferred, response, ioArgs) {
      if (ioArgs.xhr.status == 404) {
        // no document with name entered was found
        deferred.resolve(true); //resolves 'isValid'
        
      } else if (ioArgs.xhr.status == 401) {
        this.showError(this.nls.ERRORS.SESSION_TIMEOUT);
        deferred.resolve(false); //resolves 'isValid'
        
      } else if (ioArgs.xhr.status == 200) {
        this.showError(this.nls.ERRORS.DUPLICATE_NAME);
        deferred.resolve(false); //resolves 'isValid'
        
      } else {
        this.showError(this.nls.ERRORS.SERVER_ERROR);
        deferred.resolve(false); //resolves 'isValid'
      }
    },
    
    showExternalOption: function () {
      if (this.file.get("location") === "communityFiles") {
        return;
      }
      
      when(globals.policy).then(lang.hitch(this, function (policy) {
        if (policy.capabilities.canCreate.files.external) {
          domStyle.set(this.content.externalContainer, "display", "");

          if (policy.isExternalDefault) {
            domAttr.set(this.content.isExternal, "checked", "true");
          }

          if (globals.currentUser.isExternal) {
            domAttr.set(this.content.isExternal, "checked", "true");
            domAttr.set(this.content.isExternal, "disabled", "true");
          }
        }
      }));
    },

    onCancel: function () {
      this.emit("close");
      this.inherited(arguments);
    }
  });
});