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
   "dojo/_base/array",
   "dojo/Deferred",
   "../dialog/ProvisionExternalUser",
   "../util/fidoNewRelic"
 ], function (declare, Action, domAttr, string, lang, topic, when, Evented, domStyle, domClass, SharingDialog, TypeAheadBox,
     i18n, globals, routes, request, ioQuery, on, EditBox, validation, array, Deferred, ProvisionExternalUser, fidoNewRelic) {
  "use strict";

  var MultiShareAction = declare([Action, Evented], {
    "class": "ics-viewer-action ics-viewer-action-share ics-viewer-action-multiShare",
    _TypeAheadBox: TypeAheadBox,
    constructor: function (args) {
      lang.mixin(this, args);
      this.isFolderPicker = args.isFolderPicker;
      this.preserveMessage = "";
    },

    postMixInProperties: function () {
      this.messageNls = i18n.SHARE;
      this.nls = i18n.SHARE.ACTION.MULTI;

      if(lang.getObject("capabilities.canView.communities", false, globals.policy)){
        this.name = this.title = this.nls.ADD || "Add People or Communities";
      } else{
        this.name = this.title = this.nls.ADD_PEOPLE || "Add People";
      } 
    },
    
    postCreate: function() {
       domAttr.set(this.altText, "innerHTML", "");
    },

    onLinkClicked: function () {
        this.setupAdd();
        fidoNewRelic.track("multiShare.open");
    },

    setupAdd: function (role) {

      if(!this.typeaheadBox){
        this.typeaheadBox = new this._TypeAheadBox({
          file: this.file,
          isMulti: true,
          showShadowText: true,
          filePermission: this.permission,
          sectionNode: this.domNode.parentNode,
          defaultRole: role
        });

        if (this.panelDomNode) {
          domClass.add(this.panelDomNode, "multiAdd-active");
        }
        
        if (!this.messageBox) {
          this.setupMessageBox();
        }

        this.typeaheadBox.messageBox = this.messageBox;
        
        domStyle.set(this.messageBox.domNode, "display", "none");
        
        this.typeaheadBox.on("save", lang.hitch(this, this._add));
        this.typeaheadBox.on("cancel", lang.hitch(this, this.resetTypeahead));
        this.typeaheadBox.placeAt(this.domNode);
        this.typeaheadBox.startup();
        domStyle.set(this.link, "display", "none");
        
      }
      
      topic.publish("ic-fileviewer/editStart", this, lang.hitch(this, function () {
        return !domClass.contains(this.messageBox.textBox, "hintText") || this.typeaheadBox.hasChanges();
      }));
    },
    
    setupMessageBox: function () {
      this.messageBox = new EditBox();
      this.messageBox.placeAt(this.typeaheadBox.optionalMsgLinkContainer, "after");
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

       if (isEveryone) {
          this._addEveryone(e);
       } else {
         this._multiShare(e);
       }
       
       fidoNewRelic.track("multiShare.add");
    },
    
    _addEveryone: function (e) {
      var item = this.file.get(this.dataKey).newItem({
        permission: "View",
        type: "everyone"
      });
        
      item.create().then(lang.hitch(this, this.handleShare, item, undefined),
          lang.hitch(this, this.handleShare, item, undefined));
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

    _multiShare: function (items) {
      var shareSummary = "",
      users, communities, emails, allResolved;
      if (this.messageBox.get("value") !== "" && this.messageBox.get("value") !== this.messageBox.get("hintText")) {
        shareSummary = this.messageBox.get("value");
      }
      
      users = items.users;
      communities = items.communities;
      emails = items.emails;
      
      when(this.resolveEmails(emails), lang.hitch(this, function (emailMap) {        
        allResolved = users.concat(communities.concat(emailMap.resolved));

        if (emailMap && emailMap.unresolved && emailMap.unresolved.length > 0) {
            this.handleUnresolvedEmails(emailMap.unresolved);
        } else {
            this.file.get(this.dataKey).createItem(allResolved, {summary: shareSummary}).then(lang.hitch(this, this.handleShare, items, emailMap),
                     lang.hitch(this, this.handleShareError, items, emailMap));	
        }
      }));
    },
    
    resolveEmails: function (emails) {
      var deferred = new Deferred(),
      emailQuery = [],
      emailToItemMap = {},
      resolved = [],
      unresolved = [],
      _routes = routes.getFilesAppRoutes(this.file);
      
      if (emails.length === 0) {
        return deferred.resolve({resolved: resolved, unresolved: unresolved});
      }
      
      array.forEach(emails, function (item) {
        if(item.entry.get("email")) {
          emailQuery.push(item.entry.get("email"));
          emailToItemMap[item.entry.get("email")] = item;
        }
      }, this);

      request(_routes.getBulkEmailResolutionUrl(), {
        auth: {secured: false},
        method: "POST",
        headers: { 'X-Method-Override': 'GET' },
        postData: ioQuery.objectToQuery({'email': emailQuery}),
        handleAs: "json",
        noStatus: true 
      }).then(lang.hitch(this, function (response, ioArgs) {

        if (lang.isArray(response.items) && response.items.length > 0){
          array.forEach(response.items, function (item, i) {
            if (item.id && emailToItemMap.hasOwnProperty(emailQuery[i])) {
              emailToItemMap[emailQuery[i]].entry.set("id", item.id);
              resolved.push(emailToItemMap[emailQuery[i]]);
            } else {
              unresolved.push(emailToItemMap[emailQuery[i]]);
            }
          }, this);

          deferred.resolve({resolved: resolved, unresolved: unresolved});
        } else {
          deferred.resolve({resolved: [], unresolved: emails});
        }

      }), lang.hitch(this, function (err) {
        deferred.resolve({resolved: [], unresolved: emails});
      }));
      
      return deferred;
    },

    handleShareError: function (items, emailMap, error) {
      this.handleShare(items, emailMap, error);
    },

    handleShare: function (items, emailMap, response) {
      this.resetTypeahead();
      this.refreshPanel();
      //if (emailMap && emailMap.unresolved && emailMap.unresolved.length > 0) {
      //  this.handleUnresolvedEmails(emailMap.unresolved);
      //}
      
      if (response instanceof Error && response.code !== "Conflict") {
        topic.publish("ic-fileviewer/push/messages", {
          type: "error",
          message: i18n.ERROR,
          cancelable: true
        });
      } else {
        this._displaySuccessMessage(items);
      }
    },
    
    handleUnresolvedEmails: function (items) {
      var userList = "";
      
      array.forEach(items, function (item) {
        userList += item.entry.get("name");
        userList += " ";
      }, this);

      when(ProvisionExternalUser.isValid(this.file)).then(lang.hitch(this, function (isValid) {
        if (isValid) {
          var users = [],
          user;
          array.forEach(items, function (item) {
            user = {email: item.entry.email};

            if (item.entry.permission.toUpperCase() === "EDIT") {
              user.role = "EDITOR";
            } else if (item.entry.permission.toUpperCase() === "VIEW"){
              user.role = "READER";
            }
            
            users.push(user);
          }, this);
          
          this._renderProvisionExternalUserDialog(users, this.file); 
        } else {
           this._errorHandler(userList);
        }
     }));
    },
    
    _displaySuccessMessage: function (items) {
//      if (items.type === "everyone" || items.users.length > 0 || items.communities.length > 0) {      
//        if (!this.messageNls.MULTI_SHARE_SUCCESS) {
//          this.messageNls.MULTI_SHARE_SUCCESS = {
//            SUCCESS: "The file was shared successfully."
//          };
//        }
//        
//        topic.publish("ic-fileviewer/push/messages", {
//          type: "success",
//          message: this.messageNls.MULTI_SHARE_SUCCESS.SUCCESS,
//          cancelable: true
//        });
//      }
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

    resetTypeahead: function () {
      this.typeaheadBox.destroy();
      this.typeaheadBox = undefined;
      this.messageBox.destroy();
      this.messageBox = undefined;
      domStyle.set(this.link, "display", "");
      
      if (this.panelDomNode) {
        domClass.remove(this.panelDomNode, "multiAdd-active");
      }
      
      topic.publish("ic-fileviewer/editStop", this);
    }

  });

  return {
    create: function (args) {
      return new MultiShareAction(args);
    },

    isValid: function (file, permission) {
      if(file.get("libraryType") === "communityFiles") {
        return false;
      }
      return file.get("permissions").canGrantAccessView() || file.get("permissions").canGrantAccessEdit();
    },

    getClassName: function () {
      return "ics-viewer-action-share ics-viewer-action-multiShare";
    }
  };
});
