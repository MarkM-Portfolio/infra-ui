/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2019, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define([
   "dojo/_base/declare",
   "./Action",
   "dojo/i18n!../nls/FileViewerStrings",
   "dojo/string",
   "dojo/_base/lang",
   "../config/globals",
   "dojo/has",
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
   "../util/fidoNewRelic",
   "ic-core/config/features"

], function (declare, Action, i18n, string, lang, globals, has, FileAdapter, config, routes, topic, Deferred, aspect, all, when,
    html, domConstruct, fidoNewRelic, features) {
   "use strict";

   var TransferFileAction = declare([Action], {
      groupId: 1,

      /**
       * Initialize strings
       */
      postMixInProperties: function () {
         this.nls = i18n.ACTION.TRANSFER_FILE;
         this.title = this.nls.TOOLTIP;
         this.name = this.nls.NAME;
         this.a11y = this.nls.A11Y;
      },

      /**
       * Handle action menu click event
       */
      onLinkClicked: function () {
         this.beginTransfer();
         fidoNewRelic.track("transferFile");
      },

      /**
       * Initiate the file transfer
       */
      beginTransfer: function () {
         var app = this.getApp();
         var transferer = this.getTransferer(app);
         this.transferFile(transferer);
      },

      /**
       * Setup app to support dialog
       */
      getApp: function () {
         if (!this.app) {
            this.app = {
               net: globals.network(),
               routes: routes.getFilesAppRoutes(this.file.bean),
               getUserTypeAheadStore: lang.hitch(this, "getUserTypeAheadStore"),
               getCommunityTypeAheadStore: lang.hitch(this, "getCommunityTypeAheadStore"),
               getTagStore: lang.hitch(this, "getTagStore"),
               nls: globals.pickerNLS
            };
         }
         return this.app;
      },

      /**
       * Use aspect to override some methods on the original TransferFile
       */
      getTransferer: function (app) {
         if (!this._transferer) {
            this._transferer = new globals.transferFileAction(app || this.app, null);

            aspect.around(this._transferer, "publishEvents", lang.hitch(this, function (originalEvents) {
               return lang.hitch(this, function (e) {

                  this._transferer.close();
                  
                  // Publish events
                  topic.publish("ic-fileviewer/action/completed");
                  topic.publish("ic-fileviewer/close");
                  topic.publish("lconn/share/action/completed", e);
               });
            }));

            // Ensure that you can not transfer to yourself
            aspect.around(this._transferer, "isPersonSelfInvalid", lang.hitch(this, function (originalIsPersonSelfInvalid) {
               return lang.hitch(this, function (person) {
                  var retval = false;
                  if (person && globals.currentUser) {
                     retval = (person.id == globals.currentUser.id || (!!person.email && person.email == globals.currentUser.email));
                  }
                  return retval;
               });
            }));

         }
         return this._transferer;
      },

      /**
       * Perform the ownership transfer
       */
      transferFile: function (transferer) {
         transferer.execute(this.getShareBean(this.file.bean));
      },

      /**
       * Stub for MemberInput widget
       */
      getUserTypeAheadStore: function () {
         return this.userTypeAheadStore;
      },

      /**
       * Stub for MemberInput widget
       */
      getCommunityTypeAheadStore: function () {
         return this.communityTypeAheadStore;
      },

      /**
       * Initialize the Tags Typeahead control
       */
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

      /**
       * Return a share bean corresponding to the current file
       */
      getShareBean: function(file){
         if(!this.shareBean){
            this.shareBean = FileAdapter(file);
         }
         return this.shareBean;
      },
   });

   return {
      isSubItem: true,

      /**
       * Create and return a Transfer File object
       */
      create: function (args) {
         return new TransferFileAction(args);
      },

      /**
       * Verify that we are an authenticated user with ownership privileges and
       * that the Transfer Ownership gatekeeper flag is on.
       */
      isValid: function (file, args) {
         var valid = false;
         var admin = false;
         var lccProp;

         if (file && args) {
            var user = args.currentUser ? args.currentUser : null;
            if (user) {

               // Fetch gatekeeper override, and if it's not there default it to true.
               lccProp = args.properties['files.ownership.transfer.enabled'];
               if (lccProp == null) {
                  lccProp = true;
               }
               else {
		            lccProp = (lccProp === "true");
               }

               if (features("files-enable-file-ownership-transfer") && lccProp) {

                  // Determine if we're an admin
                  if (user._native && user._native.roles) {
                     dojo.forEach(user._native.roles, function(role) {
                        if (role == "admin" || role == "org-admin") {
                           admin = true;
                        }
                     });
                  }
                  if ((file.args.author.id == user.id || admin) && (file.args.libraryType !== 'communityFiles')) {
                     valid = true;
                  }
               }
            }
         }

         // Caller is expecting a promise
         var deferred = new Deferred();
         deferred.resolve(valid);
         return deferred.promise;
      },

      /**
       * Return our class name
       */
      getClassName: function () {
         return "ics-viewer-action-transfer";
      }
   };
});
