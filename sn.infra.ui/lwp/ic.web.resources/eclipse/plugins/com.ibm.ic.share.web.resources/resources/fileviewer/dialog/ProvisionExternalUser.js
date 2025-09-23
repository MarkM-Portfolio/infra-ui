/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/dom-class",
   "dojo/text!./templates/ProvisionExternalUser.html",
   "./DialogAction",
   "./UploadDialog",
   "../data/util/routes",
   "dojo/_base/lang",
   "dojo/dom-attr",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/dom-construct",
   "dojo/_base/json",
   "dojo/_base/array",
   "../config/globals",
   "dojo/when"
], function (declare, domClass, template, DialogAction, UploadDialog,
             routes, lang, domAttr, i18n, domConstruct, json, array, 
             globals, when) {
   
   var ProvisionWidget = declare([UploadDialog], {
      "class": "provisionExternalUserDialog",
      USER_EMAIL_SEPARATOR: ', ',
      
      constructor: function(args) {
         this.nls = i18n.SHARE.PROVISION_EXTERNAL_USER_DIALOG.ABSTRACT;
         this.users = [];
         this.collIds = [];
         this.message = "";
         this.file = args.file;
         
         if (args.users) {
            if (args.users.length === 1) {
               this.nls = i18n.SHARE.PROVISION_EXTERNAL_USER_DIALOG.SINGULAR;
               this.users = args.users;
            } else if (args.users.length > 1) {
               this.nls = i18n.SHARE.PROVISION_EXTERNAL_USER_DIALOG.PLURAL;
               this.users = args.users;
            }
         }
         if (args.collIds) {
            this.collIds = args.collIds;
         }
         if (args.message) {
            this.message = args.message;
         }
         
         this.content = new DialogAction({template: template, nls: this.nls});
         this.content.clickLink = lang.hitch(this, function (e) {
            if (e.target.id === "ok") {
              this.emit("clicked", {});
              this._onSubmit();
            }
            this.onCancel();
         });

         this.content.startup();
         this._set("title", this.nls.NAME);
      },
      
      postCreate: function () {
         this.inherited(arguments);
         if (this.users.length > 0) {
            this._renderUserEmails();
         } else {
            this._hideUserEmailsContainer();
         }
      },
      
      _renderUserEmails: function () {
         this._showUserEmailsContainer();
         domConstruct.empty(this.content.userEmailsContainer);
         
         var userDiv = domConstruct.create("div", {innerHTML: this._parseUserEmailList().join(this.USER_EMAIL_SEPARATOR)});
         domClass.add(userDiv, "lotusMessage lotusMeta lotusWarning");
         domConstruct.place(userDiv, this.content.userEmailsContainer);
      },
      
      _hideUserEmailsContainer: function () {
         domClass.add(this.content.userEmailsContainer, "lotusHidden");
      },
      
      _showUserEmailsContainer: function () {
         domClass.remove(this.content.userEmailsContainer, "lotusHidden");
      },
      
      _parseUserEmailList: function () {
         var userEmailList = [];
         array.forEach(this.users, lang.hitch(this, function(user) {
            userEmailList.push(user.email);
         }));
         return userEmailList;
      },
      
      getUploadUrl: function (args) {
         this._populateFormData(args.nonce);
         return routes.getProvisionExternalUserUrl();
      },
      
      _populateFormData: function (nonce) {
         domAttr.set(this.content.appCsrfToken, "value", nonce);
         domAttr.set(this.content.returnUrl, "value", routes.getProvisionExternalUserReturnUrl(this.file));
         domAttr.set(this.content.cancelUrl, "value", routes.getProvisionExternalUserCancelUrl(this.file));
         domAttr.set(this.content.guestEmails, "value", this._parseUserEmailList().join(this.USER_EMAIL_SEPARATOR));
         domAttr.set(this.content.serviceData, "value", this._getServiceData());
      },
      
      _getServiceData: function () { 
         var serviceData = {
            message: this.message,
            collIds: this.collIds,
            fileIds: [this.file.get("id")],
            roles: {}
         };
         
         array.forEach(this.users, function(user) {
            serviceData.roles[user.email] = user.role.toUpperCase();
         });
         
         return json.toJson(serviceData);
      },
      
      onCancel: function () {
         this.emit("close");
         this.inherited(arguments);
      },
      
      setUsers: function (users, redraw) {
         this.users = users;
         if (redraw) {
            if (this.users.length > 0) {
               this._renderUserEmails();
            } else {
               this._hideUserEmailsContainer();
            }
         }
      }
   });
   
   ProvisionWidget.isValid = function (file) {
      //TODO Use gatekeeper if this is necessary in the future
	  //CNXSERV-9209 suppressing invite flow
	  var provisionExternalUserEnabled = false;
      return when(globals.policy).then(lang.hitch(this, function (policy) {
         var valid = policy.isExternalEnabled 
                  && !globals.currentUser.isExternal
                  && file.get("isExternal") 
                  && file.get("permissions").canGrantAccess() 
                  && (file.get("libraryType") === "personalFiles") 
                  && (lang.getObject("lconn.files.config.features.canInviteUsers") === true) 
                  && provisionExternalUserEnabled;
         //Files checks this, but we are not as the bss services could come to on-prem
         //lconn.files.config.isCloudMode
            
         if (valid) {
            var configUtil = lang.getObject("lconn.share.util.configUtil");
            if (configUtil && configUtil.canViewEveryPeople) {
               valid = configUtil.canViewEveryPeople(globals.currentUser);
            }
         }
         
         return valid;
      }));
   };
  
   return ProvisionWidget;
});