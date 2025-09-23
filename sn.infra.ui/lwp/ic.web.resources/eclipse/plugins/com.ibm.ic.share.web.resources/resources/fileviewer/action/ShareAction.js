/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/dom-attr",
   "dojo/string",
   "dojo/_base/lang",
   "dojo/topic",
   "dojo/when",
   "dojo/Evented",
   "dojo/dom-style",
   "dojo/dom-class",
   "../dialog/SharingDialog",
   "../widget/TypeAheadBox",
   "dojo/i18n!../nls/FileViewerStrings",
   "../config/globals",
   "../data/util/routes",
   "../network/request",
   "dojo/io-query",
   "dojo/on",
   "../widget/EditBox",
   "../util/validation",
   "../dialog/ProvisionExternalUser",
   "../util/fidoNewRelic"
 ], function (declare, Action, domAttr, string, lang, topic, when, Evented, domStyle, domClass, SharingDialog, TypeAheadBox,
     i18n, globals, routes, request, ioQuery, on, EditBox, validation, ProvisionExternalUser, fidoNewRelic) {
  "use strict";

  var ShareAction = declare([Action, Evented], {
    "class": "ics-viewer-action ics-viewer-action-share",
    _TypeAheadBox: TypeAheadBox,
    provisionExternalUserEnabled: true,
    
    constructor: function (args) {
      lang.mixin(this, args);
      this.isFolderPicker = args.isFolderPicker;
      this.preserveMessage = "";
    },

    postMixInProperties: function () {
      this.messageNls = i18n.SHARE;
      this.nls = i18n.SHARE.ACTION[this.permission.toUpperCase()] || i18n.SHARE.ACTION.EDIT;
      if (this.moveFolder && this.nls.MOVE){
        this.title = this.nls.MOVE;
      } else if(this.file.get("libraryType") === "communityFiles" && this.nls.COMMUNITY_ADD) {
        this.title = this.nls.COMMUNITY_ADD;
      } else {
        this.title = this.nls.ADD;
      }
      this.name = "";
      this.a11y = "";
    },

    onLinkClicked: function () {
      if(!this.isFolderPicker){
        this.setupAdd();
        fidoNewRelic.track("share.open", { mode: "quick" });
      } else {
        this.addFolder();
        fidoNewRelic.track("share.open", { mode: "folder" });
      }
    },
    
    addFolder: function () {
      this.emit("_addFolder");
    },

    setupAdd: function () {
       var role = (this.permission || "").toLowerCase() === 'edit' ? 'editor' : 'reader';
       topic.publish('ic-fileviewer/selectpanel', [ 'share', 'multiShare', role ])
    },
    
    setupMessageBox: function () {
      this.messageBox = new EditBox();
      this.messageBox.placeAt(this.typeaheadBox.actionContainer, "before");
      domClass.add(this.messageBox.textBox, "transition");

      this.messageBox.set("hintText", this.messageNls.MESSAGE_BOX.HINT_TEXT);
      
      this.messageBox.set("value", this.messageBox.get("hintText"));
      domClass.add(this.messageBox.textBox, "hintText");

      on(this.messageBox.textBox, "focus", lang.hitch(this, function () {
        domClass.remove(this.messageBox.textBox, "hintText");
        
        if (this.messageBox.get("value") === this.messageBox.get("hintText")) {
          this.messageBox.set("value", "");
        }
      }));
      
      on(this.messageBox.textBox, "blur", lang.hitch(this, function () {
         if (this.messageBox.get("value") === "") {
            this.preserveMessage = "";
            domClass.add(this.messageBox.textBox, "hintText");
            this.messageBox.set("value", this.messageBox.hintText);
         } else {
            this.preserveMessage = this.messageBox.get("value");
         }
      }));
    },
    
    _add: function (e) {
       var isEveryone = !!e.everyone;
       if (!isEveryone && !validation.validateShareMessage(this.messageBox)) {
         return;
       }
      
       if (this.messageBox.get("value") !== "" && this.messageBox.get("value") !== this.messageBox.get("hintText")) {
          e.typeaheadItem.summary = this.messageBox.get("value");
       }

       if (isEveryone) {
          this._addEveryone(e);
       } else if (e.typeaheadItem.communityType) {
          this._addCommunity(e.typeaheadItem);
       } else if (!e.typeaheadItem.id && e.typeaheadItem.email) {
          this._addByEmail(e.typeaheadItem);
       } else if (!e.typeaheadItem.email) {
          this._addUser(e.typeaheadItem);
       }
       
       this.typeaheadBox.clear();
       this.typeaheadBox.focusTypeahead();
       
       fidoNewRelic.track("share.add");
    },
    
    _addEveryone: function (e) {
      var item = this.file.get(this.dataKey).newItem({
        permission: "View",
        type: "everyone"
      });
      
      this.emit("_add", item);
    },
    
    _addByEmail: function (e) {
      var user,
      emailQuery = [e.email],
      _routes = routes.getFilesAppRoutes(this.file);

      request(_routes.getBulkEmailResolutionUrl(), {
        auth: {secured: false},
        method: "POST",
        headers: { 'X-Method-Override': 'GET' },
        postData: ioQuery.objectToQuery({'email': emailQuery}),
        handleAs: "json",
        noStatus: true 
      }).then(lang.hitch(this, function (response, ioArgs) {
        if (lang.isArray(response.items) && response.items.length > 0){
          var item = response.items[0];

          if (item.id && item.email === e.email) {
            user = this.file.get(this.dataKey).newItem({
              id: item.id,
              name: item.name,
              permission: this.permission,
              type: !!item.communityType ? "community" : "user"
            });
            
            if (e.summary) {
               user.set("summary", e.summary);
            }

            this.emit("_add", user);
          } else {
            when(ProvisionExternalUser.isValid(this.file)).then(lang.hitch(this, function (isValid) {
               if (isValid) {
                 //TODO pass in many users once ShareAction supports it
                 user = {email: e.email};
                 if (this.permission.toUpperCase() === "EDIT") {
                   user.role = "EDITOR";
                 } else if (this.permission.toUpperCase() === "VIEW"){
                   user.role = "READER";
                 }
                 
                 var users = [user];
                 
                 this._renderProvisionExternalUserDialog(users, this.file); 
               } else {
                  this._errorHandler(e.email);
               }
            }));
          }
        }
      }), lang.hitch(this, function (err) {
        this._errorHandler(e.email);
      }));
    },
    
    _renderProvisionExternalUserDialog: function (users, file) {      
      var provisionExternalDialog = new ProvisionExternalUser({users: users, file: file});
      provisionExternalDialog.on("error", lang.hitch(this, "_provisionExternalUserError"));
      provisionExternalDialog.placeAt(document.body);
      provisionExternalDialog.startup();
      provisionExternalDialog.show();
    },
    
    _provisionExternalUserError: function (err) {
      topic.publish("ic-fileviewer/push/messages", {
        type: "error",
        message: err.message,
        cancelable: true
      });
    },
    
    _errorHandler: function (userText) {
      if (userText) {
        topic.publish("ic-fileviewer/push/messages", {
          type: "error",
          message: string.substitute(i18n.SHARE.SHARE_FAIL.ERROR, {user: userText}),
          cancelable: true
        });
      }
    },

    _addUser: function (e){
      var item = this.file.get(this.dataKey).newItem({
        id: e.userid,
        name: e.name,
        permission: this.permission,
        type: "user"
      });
      
      if (e.summary) {
         item.set("summary", e.summary);
      }
      
      this.emit("_add", item);
    },

    _addCommunity: function (e) {
      var item = this.file.get(this.dataKey).newItem({
        communityUuid: e.id,
        communityType: e.communityType,
        name: e.name,
        permission: this.permission,
        type: "community"
      });

      if (e.summary) {
         item.set("summary", e.summary);
      }

      this.emit("_add", item);
    },

    resetTypeahead: function () {
      this.typeaheadBox.destroy();
      this.typeaheadBox = undefined;
      this.messageBox.destroy();
      this.messageBox = undefined;
      domStyle.set(this.link, "display", "");
    }

  });

  return {
    create: function (args) {
      return new ShareAction(args);
    },

    isValid: function (file, permission) {
      if(permission === "Edit" && file.get("permissions").canGrantAccessEdit()) { 
        return true; 
      }
      if(permission === "View" && file.get("permissions").canGrantAccessView()) { 
        return true; 
      }
      return false;
    },

    getClassName: function () {
      return "ics-viewer-action-share";
    }
  };
});
