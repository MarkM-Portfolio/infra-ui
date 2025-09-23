/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/text!./templates/ShareFolder.html",
  "../panels/Stream",
  "../action/ShareAction",
  "../config/globals",
  "dojo/i18n!../nls/FileViewerStrings",
  "dojo/_base/lang",
  "dojo/_base/config",
  "dojo/string",
  "dojo/Deferred",
  "dojo/_base/array",
  "dojo/dom-construct",
  "dojo/Stateful",
  "dojo/aspect",
  "../data/util/routes",
  "../network/request",
  "../bean/FileAdapter",
  "dojo/dom-style",
  "dojo/dom-attr",
  "dojo/has",
  "dojo/topic"
], function (declare, _WidgetBase, _TemplatedMixin, template, Stream, ShareAction, globals, i18n, lang, config,
    string, Deferred, array, domConstruct, Stateful, aspect, routes, request, FileAdapter, domStyle, domAttr, has, topic) {

  return declare([_WidgetBase, _TemplatedMixin, Stateful], {
    templateString: template,

    constructor: function (args) {
      this.nls = i18n.PANEL.SHARING;
      
      if (!this.nls.NO_SHARE) {
        this.nls.NO_SHARE = "This file has not been added to any folders yet.";
        this.nls.ONE_SHARE = "This file is in 1 folder or community you do not have access to.";
        this.nls.MULTIPLE_SHARE = "This file is in ${fileNumber} folders or communities you do not have access to.";
      }
      
      this.titleWithCount = this.nls.SHARED_WITH_FOLDERS;
      this.title = string.substitute(this.titleWithCount, {count: 0});
      this.multipleShareSpan = undefined;

      lang.mixin(this, args);

      this.factoryTitle = this.factory.get("titleWithCount");
      this.moveFolder = false;

      this.handler = this.factory.watch("_folders", lang.hitch(this, function (name, oldVal, newVal) {
        this.moveFolder = (newVal.length > 0 && this.file.get("libraryType") === "communityFiles");
        this._addShareAction();
      }));
    },

    postMixInProperties: function () {
      this.blank = config.blankGif || dijit._WidgetBase.prototype._blankGif;
      if(!this.nls.NO_SHARE){
        this.nls.NO_SHARE = "This file has not been added to any folders yet.";
      }
      if(!this.nls.ONE_SHARE){
        this.nls.ONE_SHARE = "This file is in 1 folder or community you do not have access to.";
      }
      if(!this.nls.MULTIPLE_SHARE){
        this.nls.MULTIPLE_SHARE =  "This file is in ${fileNumber} folders or communities you do not have access to.";
      }
    },

    postCreate: function () {
      if (this.factory._folders) {
        this.renderFolders();
        return;
      }
      
      domStyle.set(this.domNode, "display", "none");
      this.getSharedFolders();
    },
    
    _addShareAction: function () {
      if (this.shareAction) {
        this.shareAction.destroy();
        domConstruct.empty(this.shareActionContainer);
      }

      this.file.get("permissions").canAddToFolder().then(lang.hitch(this, function (hasPermission) {
        if (!hasPermission) {
          return;
        }
        
        this.shareAction = ShareAction.create({
          permission: "Folder",
          isFolderPicker: true,
          moveFolder: this.moveFolder,
          file: this.file
        });

        this.shareAction.on("_addFolder", lang.hitch(this, this.openPicker));

        this.shareAction.placeAt(this.shareActionContainer);
      }));
    },

    getSharedFolders: function () {
      var deferred = new Deferred();
      this.factory._folders = deferred;

      this.file.get(this.dataKey).fetch().then(lang.hitch(this, function (response) {
        this.factory.set("_folders", response);

        this.updateTitle();
        this.renderFolders();
        this.displaySharedMessage();
        deferred.resolve(response);

      }), function (error) {
        deferred.reject(error);
      });

      return deferred;
    },

    renderFolders: function () {
      this.folderStream = new Stream({
        file: this.file,
        dataKey: this.dataKey,
        entryConstructor: this.entryConstructor,
        factory: this.factory,
        filteredItems: this.factory._folders,
        refreshCallback: lang.hitch(this, "refresh")
      });
      this.folderStream.placeAt(this.content);
      domStyle.set(this.domNode, "display", "");
    },
     
    displaySharedMessage: function () {
      if(!!this.multipleShareSpan){
        domConstruct.destory(this.multipleShareSpan);  
      }	
      var count = this.file.get(this.dataKey).getNonVisibleCount();	
      if((count === 0) && (this.folderStream.get("filteredItems").length == 0)){
        domStyle.set(this.oneShareContent, "display", "none");	 
        domStyle.set(this.multipleShareContent, "display", "none");
        domStyle.set(this.noneShareContent, "display", "");
      } else if(count === 1){
        domStyle.set(this.noneShareContent, "display", "none");
        domStyle.set(this.oneShareContent, "display", "");	 
        domStyle.set(this.multipleShareContent, "display", "none");	  
      } else if(count > 1){
        var text = string.substitute(this.nls.MULTIPLE_SHARE, {fileNumber: count});
        var span = this.multipleShareSpan = domConstruct.create("span", {innerHTML: text});
        domConstruct.place(span, this.multipleShareContent);
        domStyle.set(this.noneShareContent, "display", "none");
        domStyle.set(this.oneShareContent, "display", "none");	 
        domStyle.set(this.multipleShareContent, "display", "");  
      }	else{
        domStyle.set(this.oneShareContent, "display", "none");	 
        domStyle.set(this.multipleShareContent, "display", "none");
        domStyle.set(this.noneShareContent, "display", "none");
      }
    },

    updateTitle: function (size) {
      this.titleNode.innerHTML = string.substitute(this.titleWithCount, {count: this.factory._folders.length});
    },

    refresh: function () {
      this.clearItems();

      this._addShareAction();

      var deferred = new Deferred();
      this.factory._folders = deferred;

      this.file.get(this.dataKey).refresh().then(lang.hitch(this, function (response) {
        this.factory.set("_folders", response);

        this.updateTitle();
        this.renderFolders();
        this.displaySharedMessage();

        if(has("files-folder-syncable")) {
          topic.publish("ic-fileviewer/refresh");
        }

        deferred.resolve(response);

      }), function (error) {
        deferred.reject(error);
      });

      return deferred;
    },

    clearItems: function () {
      delete this.factory._folders;
      delete this.folderpicker;
      domConstruct.empty(this.shareActionContainer);
      domConstruct.empty(this.content);
    },

    openPicker: function () {
      if(!this.folderpicker){
        this.app = {
            nls: globals.pickerNLS,
            communityFolderEnabled: true,
            isAuthenticated: globals.pickerAuth.isAuthenticated,
            authenticatedUser: this.getAuthenticatedUser(),
            getAuthenticatedUser: this.getAuthenticatedUser,
            getAuthenticatedUserId: function () {return globals.pickerAuth.getUser().id;},
            routes: routes.getFilesAppRoutes(this.file),
            net: globals.network(),
            getUserPermissions: lang.hitch(this, "getUserPermission"),
            favorites: true,
            isNestedFolderEnabled: has("files-nested-folder")
        };
        if (this.moveFolder) {
          this.folderpicker = globals.moveToCollection(this.app, null, this.getPickerOpts());
        } else {
          this.folderpicker = globals.addToCollection(this.app, null, this.getPickerOpts());
        }
      }

      this.folderpicker.execute(this.getShareBean(this.file));
    },
    
    getCommRoutesArgs: function () {
      var args = {
          basePath: routes.getFilesBasePath(),
          disableAnonymous: globals.disableAnonymous,
          _form: routes.getFilesFormPath(),
          _cId: this.file.get("communityId"),
          getAuthenticatedUser: function () {return globals.pickerAuth.getUser();}
      };
      
      return args;
    },
    
    getPickerOpts: function () {
      var opts;
      if(this.file.get("libraryType") === "communityFiles") {
        opts = {
          sourceSet: ["thisCommunity"],
          singleSelection: true,
          community: {
            id: this.file.get("communityId"),
            name: window.ic_comm_communityName || this.file.get("libraryTitle") || ""
          }
        };
      } else {
        opts = {
          sourceSet: ["personalFolders"],
          singleSelection: has("files-nested-folder"),
          community: {
            id: this.file.get("communityId")
          }
        };
      }
      
      opts.onSuccess = lang.hitch(this, function(collections, file, madeShared, madePublic) {
        var newVisibility = "";
        if (madeShared) {
          newVisibility = "shared";
        } else if (madePublic) {
          newVisibility = "public";
        }
        if (newVisibility) {
          this.file.set("visibility", newVisibility);
          this.file.unmarkDirty();
        }
        
        if (madeShared || madePublic) {
          this.refreshPanel();
        } else {
          this.refresh();
        }
      });
      
      return opts;
    },

    getShareBean: function(file){

      if(!this.shareBean){
        this.shareBean = FileAdapter(file);
      }
      return this.shareBean;
    },
    
    getUserPermission: function () {
      return {
        canShareWithPublic: function () { return globals.policy["organizationPublic"]; }
      }
    },
    
    getAuthenticatedUser: function () {
       var user = globals.pickerAuth.getUser();
       user.policy = globals.policy;
       
       return user;
    },
    
    destroy: function () {
      this.handler.remove();
      this.inherited(arguments);
    }
  });
});
