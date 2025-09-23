/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/string",
   "dojo/_base/lang",
   "../config/globals",
   "../bean/FileAdapter",
   "dojo/_base/config",
   "../data/util/routes",
   "dojo/topic",
   "dojo/Deferred",
   "dojo/aspect",
   "dojo/promise/all",
   "dojo/when",
   "../util/html",
   "dojo/dom-construct",
   "../util/fidoNewRelic"
], function (declare, Action, i18n, string, lang, globals, FileAdapter, config, routes, topic, Deferred, aspect, all, when,
    html, domConstruct, fidoNewRelic) {
   "use strict";

   var CopyFileAction = declare([Action], {
     groupId: 1,

     postMixInProperties: function () {
       this.nls = i18n.ACTION.COPY_FILE;
       this.title = this.nls.TOOLTIP;
       this.name = this.nls.NAME;
       this.a11y = this.nls.A11Y;
     },

     onLinkClicked: function () {
       this.beginCopy();
       fidoNewRelic.track("copyFile");
     },

     beginCopy: function () {
       var app = this.getApp();
       var copier = this.getCopier(app);
       this.copyFile(copier);
     },

     getApp: function () {
       if (!this.app) {
         this.app = {
             net: globals.network(),
             routes: routes.getFilesAppRoutes(this.file.bean),
             getLibraryTypeAheadStore: lang.hitch(this, "getLibraryTypeAheadStore"),
             getTagStore: lang.hitch(this, "getTagStore"),
             nls: globals.pickerNLS
         };
       }
       return this.app;
     },
     
     getCopier: function (app) {
       if (!this._copier) {
         this._copier = new globals.copyFileAction(app || this.app, null);

         aspect.before(this._copier, "save", lang.hitch(this, function (e) {
           this.setupMessage();
           return [e];
         }));

         aspect.around(this._copier, "complete", lang.hitch(this, function (originalComplete) {
           return lang.hitch(this, function (response, ioArgs) {
             if ( response instanceof Error) {
               lang.hitch(this._copier, originalComplete, response, ioArgs)();
             } else {
               this._onSuccess();
             }
           });
         }));
       }
       
       return this._copier;
     },
     
     copyFile: function (copier) {
       copier.execute(this.getShareBean(this.file.bean));
     },

     getLibraryTypeAheadStore: function () {
       if (!this.libraryStore){
         this.libraryStore = globals.LibraryDataStore({
           net: this.app.net,
           getUrl: dojo.hitch(this.app.routes, "getLibrariesListServiceUrl"),
           queryParam: "name"
         }); 
       }
       return this.libraryStore;
     },

     getTagStore: function () {
       if (!this.tagStore){
         this.tagStore = globals.TagDataStore({
           net: this.app.net,
           getUrl: dojo.hitch(this.app.routes, "getTagServiceUrl"),
           queryParam: "tag"
         });
         topic.subscribe("lconn/files/tags/changed", this.tagStore, "clear"); 
       }
       return this.tagStore;
     },

     getShareBean: function(file){
       
       if(!this.shareBean){
         this.shareBean = FileAdapter(file);
       }
       return this.shareBean;
     },
     
     setupMessage: function () {
       var fileName = this._copier.getFilename();
       if (this._copier.community !== null) {
          var commName = this._copier.community.title,
            commId = this._copier.community.communityUuid;
          
          var node = domConstruct.create("span");
          this._successMsg = html.substitute(document, node, this.nls.SUCCESS_MSG, {
            file: fileName,
            community: function () {
              var link = domConstruct.create("a", {
                innerHTML: commName,
                href: routes.getCommunityLink({communityUuid: commId})
              });
              
              html.processLink(link);
              return link;
            }
          });
       }
     },
     
     _onSuccess: function () {
       this._copier.close();
       
       topic.publish("ic-fileviewer/push/messages", {
           type: "success",
           message: this._successMsg,
           cancelable: true
       });
     }
   });

   return {
      isSubItem: true,

      create: function (args) {
         return new CopyFileAction(args);
      },

      isValid: function (file, args) {
        var deferred = new Deferred();

        all({
          policy: when(globals.policy),
          fullEntry: file.bean.get("fullEntry"),
          layer2: globals.layer2()
        }).then(lang.hitch(this, function (results) {
          if (globals.restrictUserInComm && file.bean.get("libraryType") === "communityFiles") {
            deferred.resolve(false);
            return;
          }
          
          if(!lang.getObject("capabilities.canView.communities", false, results.policy)){
            deferred.resolve(false);
          } else {
            deferred.resolve(!!file.bean.get("permissions").canGrantAccess());
          }
          
        }), lang.hitch(this, function() {
          deferred.resolve(false);
        }));

        return deferred;
      },

      getClassName: function () {
         return "ics-viewer-action-copy";
      }
   };
});
