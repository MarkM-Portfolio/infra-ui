/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("lconn.highway.util.restAPI");

dojo.declare("lconn.highway.util.restAPI.Caller", null,	
	{
		apiUrl: "",
		callback: null,
		DEFAULT_ORGANIZATION: "00000000-0000-0000-0000-000000000000",
		DEFAULT_ROLE: "___default_role___",
		
		constructor: function(callbackFunction) {
			this._resourceBundle = dojo.i18n.getLocalization("lconn.highway", "strings");
			this.apiUrl = lconn.highway.global.contextRoot + '/rest';
			this.callback = callbackFunction;
		},

		getSettings : function(organization) {
			var url = this.apiUrl + "/settings";
			console.log('getSettings called with path : ' + url);
		
			var args = this._createStandardArgs(organization, url);
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

		getGatekeeperSettings : function(organization) {
			var url = this.apiUrl + "/gatekeeper";
			console.log('getGatekeeperSettings called with path : ' + url);
		
			var args = this._createStandardArgs(organization, url);
			var xhrObj = dojo.xhrGet(args);
			
			console.log('getGatekeeperSettings complete');
		},

		postSetting : function(organization, details, role, value) {
			var url = this.apiUrl + "/settings";
			console.log('postSetting called with path : ' + url);
			
			var args = this._createStandardArgs(organization, url);
			var feedObject = this._createSettingForPost(organization, details, role, value, false);
			args.postData = dojo.toJson(feedObject);
			var xhrObj = dojo.xhrPost(args);
			
			console.log('postSetting complete');
		},
		
		postDefinition : function(details, defaultValue) {
			var url = this.apiUrl + "/definitions";
			console.log('postDefinition called with path : ' + url);
			
			var args = this._createStandardArgs(null, url);
			var feedObject = this._createDefinitionForPost(details, defaultValue, false);
			args.postData = dojo.toJson(feedObject);
			var xhrObj = dojo.xhrPost(args);
			
			console.log('postDefinition complete');
		},
		
		postDeletedSetting : function(organization, details, role) {
			var url = this.apiUrl + "/settings";
			console.log('postDeletedSetting called with path : ' + this.apiUrl);
			
			var args = this._createStandardArgs(organization, url);
			var feedObject = this._createSettingForPost(organization, details, role, "", true);
			args.postData = dojo.toJson(feedObject);
			var xhrObj = dojo.xhrPost(args);
			
			console.log('postDeletedSetting complete');
		},
		
		postDeletedDefinition : function(details) {
			var url = this.apiUrl + "/definitions";
			console.log('postDeletedDefinition called with path : ' + url);
			
			var args = this._createStandardArgs(null, url);
			var feedObject = this._createDefinitionForPost(details, null, true);
			args.postData = dojo.toJson(feedObject);
			var xhrObj = dojo.xhrPost(args);
			
			console.log('postDeletedDefinition complete');
		},
		
		postGatekeeperSetting : function(organization, name, value) {
			var url = this.apiUrl + "/gatekeeper";
			console.log('postGatekeeperSetting called with path : ' + url);
			
			var args = this._createStandardArgs(organization, url);
			var newFlag = {name: name, value: value, description: this.description, isDefault: false};
			var feedObject = this._createGatekeeperSettingForPost(organization, newFlag);
			args.postData = dojo.toJson(feedObject);
			var xhrObj = dojo.xhrPost(args);
			
			console.log('postGatekeeperSetting complete');
		},
		
		onLoad : function(json, ioArgs) {
			console.log('onLoad called');
			
			// TODO : check the address/contents for a login redirect
			
			if(json.error) {
				this.callback(false, json.message, json);
			}else{
				this.callback(true, "", json);
			}
		},
		
		onError : function(json, ioArgs) {
			console.log('onError called');
			console.log(json);
			var message = json.message;
			try {
				var jsonData = JSON.parse(json.response.data);
				message += "<br/>("+jsonData.message+")";
			} catch(err) {console.log(err);}
			this.callback(false, message, null);
		},

		_createStandardArgs : function(organization, url) {
			var callUrl = url;
			if ((organization != null) && (organization.length > 0) ) {
				callUrl += "/"+organization;
			}
			var args = { 
					url:  callUrl,
					load: dojo.hitch(this, "onLoad"),
					error: dojo.hitch(this, "onError"),
					handleAs: "json",
					sync:true,
					preventCache:true,
					headers: {'Content-Type': 'application/json;charset=UTF-8'}
				};
			return args;
		},			

		_createSettingForPost : function(org, details, role, content, doDelete) {
			
			var setting = this._createSettingDefinition(details, true, false);
			if ((role==null) || (role=="")) {
				role = this.DEFAULT_ROLE; // shouldn't happen, but a useful catch all
			}
			setting.values[role] = {
				"isFile" : false,
				"content" : content,
				"doDelete" : doDelete
			};
			
			// create the simple feed
			var feedObject = {
				organization: org,
				settings: []
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
				organization: this.DEFAULT_ORGANIZATION,
				settings: []
			};
			feedObject.settings.push(setting);
		
			return feedObject;
		},
		
		_createSettingDefinition : function(definition, addValues, addDefaultValues) {
			
			// No mixin as we don't want the values
			// we also wan't to make sure that there is valid values here and we don't send any "undefined" . . just in case
			// an invalid name is always a bad request however
			var setting = {
					id: this._validValue(definition.id, "newid"),
			  		name : definition.name,
					title: this._validValue(definition.title, "New setting title"),
			  		category : this._validValue(definition.category, "general"),
					description: this._validValue(definition.description, "New setting description"),
					canModify: this._validValue(definition.canModify, true),
					allowRoles: this._validValue(definition.allowRoles, false),
					validation: this._validValue(definition.validation, {})
			};
			if (addValues) {
				setting.values = new Object();
			}
			if (addDefaultValues) {
				setting.defaultValues = new Object();
			}
			return setting;
		},
		
		_createGatekeeperSettingForPost : function(org, object) {

			// create the setting
			var setting = {
			  		name : object.name,
			  		value: this._validValue(object.value, false),
					description: this._validValue(object.description, ""),
					isDefault: this._validValue(object.isDefault, false)
			};
			
			// create the simple feed
			var feedObject = {
				organization: this._validValue(org, ""),
				settings: []
			};
			feedObject.settings.push(setting);
		
			return feedObject;
		},
		
		_validValue : function(value, defaultValue) {
			return (value == null) ? defaultValue : value;
		}

	}
);
