/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/declare",
      "dojo/_base/lang",
      "dojo/json"
], function(dojo, declare, lang, JSON) {

   declare("lconn.highway.util.restAPI.Caller", null, {
      apiUrl : "",
      callback : null,
      DEFAULT_ORGANIZATION : "00000000-0000-0000-0000-000000000000",
      DEFAULT_ROLE : "___default_role___",

      constructor : function(callbackFunction) {
         this._resourceBundle = i18nstrings;
         this.apiUrl = lconn.highway.global.contextRoot + '/rest';
         this.callback = callbackFunction;
      },

      getSettings : function(organisation) {
         var url = this.apiUrl + "/settings";
         console.log('getSettings called with path : ' + url);

         var args = this._createStandardArgs(organisation, url);
         var xhrObj = dojo.xhrGet(args);

         console.log('getSettings complete');
      },

      getDefaults : function() {
         var url = this.apiUrl + "/defaults";
         console.log('getSettings called with path : ' + url);

         var args = this._createStandardArgs(null, url);
         var xhrObj = dojo.xhrGet(args);

         console.log('getSettings complete');
      },

      getDefinitions : function() {
         var url = this.apiUrl + "/definitions";
         console.log('getDefinitions called with path : ' + url);

         var args = this._createStandardArgs(null, url);
         var xhrObj = dojo.xhrGet(args);

         console.log('getSettings complete');
      },

      postSetting : function(organisation, details, role, value) {
         var url = this.apiUrl + "/settings";
         console.log('postSetting called with path : ' + url);

         var args = this._createStandardArgs(organisation, url);
         var feedObject = this._createSettingForPost(organisation, details, role, value, false);
         args.postData = JSON.stringify(feedObject);
         var xhrObj = dojo.xhrPost(args);

         console.log('postSetting complete');
      },

      postDefinition : function(details, defaultValue) {
         var url = this.apiUrl + "/definitions";
         console.log('postDefinition called with path : ' + url);

         var args = this._createStandardArgs(null, url);
         var feedObject = this._createDefinitionForPost(details, defaultValue, false);
         args.postData = JSON.stringify(feedObject);
         var xhrObj = dojo.xhrPost(args);

         console.log('postDefinition complete');
      },

      postDeletedSetting : function(organisation, details, role) {
         var url = this.apiUrl + "/settings";
         console.log('postDeletedSetting called with path : ' + this.apiUrl);

         var args = this._createStandardArgs(organisation, url);
         var feedObject = this._createSettingForPost(organisation, details, role, "", true);
         args.postData = JSON.stringify(feedObject);
         var xhrObj = dojo.xhrPost(args);

         console.log('postDeletedSetting complete');
      },

      postDeletedDefinition : function(details) {
         var url = this.apiUrl + "/definitions";
         console.log('postDeletedDefinition called with path : ' + url);

         var args = this._createStandardArgs(null, url);
         var feedObject = this._createDefinitionForPost(details, null, true);
         args.postData = JSON.stringify(feedObject);
         var xhrObj = dojo.xhrPost(args);

         console.log('postDeletedDefinition complete');
      },

      onLoad : function(json, ioArgs) {
         console.log('onLoad called');

         // TODO : check the address/contents for a login redirect

         if (json.error) {
            this.callback(false, json.message, json);
         }
         else {
            this.callback(true, "", json);
         }
      },

      onError : function(json, ioArgs) {
         console.log('onError called');
         console.log(json);
         this.callback(false, json.message, null);
      },

      _createStandardArgs : function(organisation, url) {
         var callUrl = url;
         if ((organisation != null) && (organisation.length > 0)) {
            callUrl += "/" + organisation;
         }
         var args = {
            url : callUrl,
            load : lang.hitch(this, "onLoad"),
            error : lang.hitch(this, "onError"),
            handleAs : "json",
            sync : true,
            preventCache : true,
            headers : {
               'Content-Type' : 'application/json;charset=UTF-8'
            }
         };
         return args;
      },

      _createSettingForPost : function(org, details, role, content, doDelete) {

         var setting = this._createSettingDefinition(details, true, false);
         if ((role == null) || (role == "")) {
            role = this.DEFAULT_ROLE; // shouldn't happen, but a useful catch
            // all
         }
         setting.values[role] = {
            "isFile" : false,
            "content" : content,
            "doDelete" : doDelete
         };

         // create the simple feed
         var feedObject = {
            organisation : org,
            settings : []
         };
         feedObject.settings.push(setting);

         return feedObject;
      },

      _createDefinitionForPost : function(details, content, doDelete) {

         var setting = this._createSettingDefinition(details, false, true);
         setting.doDelete = doDelete;
         if (content != null) {
            setting.defaultValues[this.DEFAULT_ROLE] = {
               "isFile" : false,
               "content" : content
            };
         }

         // create the simple feed
         var feedObject = {
            organisation : this.DEFAULT_ORGANIZATION,
            settings : []
         };
         feedObject.settings.push(setting);

         return feedObject;
      },

      _createSettingDefinition : function(definition, addValues, addDefaultValues) {

         // No mixin as we don't want the values
         // we also wan't to make sure that there is valid values here and we
         // don't send any "undefined" . . just in case
         // an invalid name is always a bad request however
         var setting = {
            id : this._validValue(definition.id, "newid"),
            name : definition.name,
            title : this._validValue(definition.title, "New setting title"),
            category : this._validValue(definition.category, "general"),
            description : this._validValue(definition.description, "New setting description"),
            canModify : this._validValue(definition.canModify, true),
            allowRoles : this._validValue(definition.allowRoles, false),
            validation : this._validValue(definition.validation, {})
         };
         if (addValues) {
            setting.values = new Object();
         }
         if (addDefaultValues) {
            setting.defaultValues = new Object();
         }
         return setting;
      },

      _validValue : function(value, defaultValue) {
         return (value == null) ? defaultValue : value;
      }

   });
   return lconn.highway.util.restAPI;
});
