/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/dom-attr",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/i18n!./nls/searchValidation",
	"dojo/request/xhr",
	"dojo/text!./templates/searchValidation.html",
	"dijit/_Templated",
	"dijit/_Widget",
	"dijit/registry",
	"ic-core/config/services",
	"ic-ui/MessageBox",
	"ic-ui/util/Url"
], function (domAttr, declare, lang, domClass, domConstruct, i18nsearchValidation, xhr, template, _Templated, _Widget, registry, coreServices, MessageBox, Url) {

	var searchValidation = declare(
		"lconn.search.searchValidation",
		[_Widget, _Templated],
	{
		
		URL_PATH: "/json/validate",
		TIMEOUT: 240000,
		_strings: i18nsearchValidation,
			
		webResourcesBasePath: "",
		templateString: template,
		
		constructor: function() {
			this.webResourcesBasePath = window.location.protocol.match("https") ? coreServices.webresources.secureUrl : coreServices.webresources.url;
		}, 
		
		runRequest: function(){
			
			var searchService = coreServices.search;
			if (Url.secure){
				var searchUrl = searchService.secureUrl;
			} else {
				var searchUrl = searchService.url;
			}
			
			var url = searchUrl + this.URL_PATH;
			console.log('In runRequest');
			this.showLoading();
			domConstruct.empty(this.container);
			xhr(url, {
				method: "GET",
				handleAs: "json",
				timeout: this.TIMEOUT,
				sync: false
			}).then(lang.hitch(this,"_handleResults"), lang.hitch(this,"_onError"));
		},
		
		postMixInProperties: function(){
			var commonStrings = i18nsearchValidation;
			lang.mixin(this, commonStrings);
			this.inherited(arguments);
		},
		
		showLoading: function(){
			domClass.remove(this.loadingContainer, "lotusHidden");
		},
	
		hideLoading: function(){
			domClass.add(this.loadingContainer, "lotusHidden");
		},
		
		_handleResults: function(/* Object */obj) {
			this.hideLoading();
			var id = registry.getUniqueId(this.declaredClass);
			
			console.log('Getting the json');
			var tokens = obj.checkDBTokens_token;
			var installedServices = obj.checkInstalledServices_token;
			var seedlists = obj.validatingSeedlists;
			var schedularCalendars = obj.checkSchedulersSet;
			var variables = obj.varWASSettings;
			var enabledTasks = obj.checkDBTasks;
			var indexFiles = obj.checkIndexFilesExist;
			var errors = obj.checkLogsForErrors_token;
			var configFiles = obj.checkConfigFiles;
			var nameOfNode = obj.nodeInfoName;
			var numDictionariesEnabled = obj.dictionaryLengthKey;
			var nodeState = obj.checkNodesInSync;
			var checkNumberOfRecords = obj.checkDBRecords;
				
			this._createHeading(this._strings.NODE + nameOfNode.nodeName, id);
			this._printInfoMsgsAdvanced(this._strings.INSTALLED, installedServices,  this._strings.INSTALLEDMSG);
			this._printInfoMsgsAdvanced(this._strings.RESUMETOKENS, tokens, this._strings.RESUMETOKENSMSG);
			this._printInfoMsgsAdvanced(this._strings.SEEDLISTS, seedlists, this._strings.SEEDLISTSMSG);
			this._printInfoMsgsAdvanced(this._strings.VARIABLES, variables, this._strings.VARIABLESMSG);
			this._printInfoMsgsAdvanced(this._strings.TASKS, enabledTasks, this._strings.TASKSMSG);
			this._printInfoMsgsAdvanced(this._strings.INDEXFILES,indexFiles, this._strings.INDEXFILESMSG);
			this._printInfoMsgsAdvanced(this._strings.LOGS, errors, this._strings.LOGSMSG);
			this._printInfoMsgsAdvanced(this._strings.CONFIGFILES, configFiles, this._strings.CONFIGFILESMSG);
			this._printResults(this._strings.DICTIONARIES,numDictionariesEnabled, this._strings.DICTIONARIESMSG);
			this._printInfoMsgsAdvanced(this._strings.SYNC, nodeState, this._strings.OUTOFDATE );
			this._printInfoMsgsAdvanced(this._strings.DBRECORDS, checkNumberOfRecords, this._strings.NUMOFDOCS);
		},
		
		_printResults: function(/* String */ heading, /* Object */ jsonChildFeed, /* String */ prefixString){
			var noValueVar;
			var id = registry.getUniqueId(this.declaredClass+"res");
			
			this._createHeading(heading, id);
			
			for (var key in jsonChildFeed) {
				if (jsonChildFeed.hasOwnProperty(key)){
					if(key.indexOf("_status") !== -1){
						var status = jsonChildFeed[key];
					}
					if(key.indexOf("_value") !== -1){
						var value = jsonChildFeed[key];
					}
				}
			}
			if(key.indexOf("dictionaryEnabled") !== -1){
				this._setMessageBox(status, prefixString, noValueVar, value);
			}else if(key.indexOf("calendarsInstalled") !== -1){
				this._setMessageBox(status, prefixString, noValueVar, noValueVar);
			}
		},
		
		_printInfoMsgsAdvanced: function(/* String */ heading, /* Object */ jsonChildFeed, /* String */ prefixString){
			
			var id = registry.getUniqueId(this.declaredClass+"res");
			var noValue = "";
	
			this._createHeading(heading, id);
			
			for (var key in jsonChildFeed) {
				if (jsonChildFeed.hasOwnProperty(key)){
					innerFeed = jsonChildFeed[key];
					
					for(var innerKey in innerFeed){
						if(innerKey.indexOf("_status") !== -1){
							var status = innerFeed[innerKey];
						}
						if(innerKey.indexOf("_variable") !== -1){
							var component = innerFeed[innerKey];
						}
						if(innerKey.indexOf("_value") !== -1){
							var value = innerFeed[innerKey];
						}
					}
					if( innerKey.indexOf("dbNoBlockedNodesKey") !== -1){
						if(status === "pass"){
							this._setMessageBox(status, this._strings.NOTBLOCKED, noValue, noValue);
						}else{
							this._setMessageBox(status, this._strings.BLOCKED, noValue, noValue);
						}
					}else if( innerKey.indexOf("dbAllNodesInDateKey") !== -1){
						if(status === "pass"){
							this._setMessageBox(status, this._strings.INDATE, noValue, noValue);
						}else{
							this._setMessageBox(status, this._strings.OUTOFDATE, noValue, value);
						}	
					}else if( innerKey.indexOf("dbCountIndexDocsInofKey") !== -1){
						this._setMessageBox(status, this._strings.NUMOFDOCS, component, value);
					}else if( innerKey.indexOf("dbConvertFilescontent") !== -1){
						this._setMessageBox(status, this._strings.FILESTOCONVERT, component, value);
					}else if( innerKey.indexOf("dbTotalFiles") !== -1){
						this._setMessageBox(status, this._strings.TOTALFILES, component, value);
					}else if( innerKey.indexOf("dbConvertedFilescontent") !== -1){
						this._setMessageBox(status, this._strings.CONVERTEDFILES, component, value);
					}else if( innerKey.indexOf("seedlistReturned") !== -1){
						if(status === "pass"){
							this._setMessageBox(status, this._strings.SEEDLISTS, " " + component, value);
						}else{
							this._setMessageBox(status, this._strings.SEEDLISTSMSG, component, value);
						}
					}else{
						this._setMessageBox(status, prefixString, component, value);
					}
				}
			}
		},
		
		_printCrawlFailedMsg: function(/* String */ heading, /* Object */ feed, /* String */ crawlFailedMsg, /* String */ exceptionDetails){
			var noValueVar;
			var id = registry.getUniqueId(this.declaredClass+"res");
			var noValue = "";
	
			this._createHeading(heading, id);
			
			for (var key in feed) {
				if (feed.hasOwnProperty(key)){
					innerFeed = feed[key];
					
					for(var detailedKey in innerFeed){
						if(detailedKey.indexOf("service") !== -1){
							var service = innerFeed[detailedKey];
							this._setMessageBox("fail", crawlFailedMsg, " " + service, noValueVar);
						}
						if(detailedKey.indexOf("message") !== -1){
							var errorMsg = innerFeed[detailedKey];
							this._setMessageBox("fail", exceptionDetails, " " + errorMsg, noValueVar);
						}				
					}
				}
			}
		},
		
		_createMessageInfoBox: function(/*String*/ msg){
			
			var messageContainer = domConstruct.create("div", {}, this.container);
			new MessageBox({
				canClose:	false,
				_stringsMsgs:	{
								icon_alt:	this._strings.INFO,
								a11y_label: this._strings.INFO_PREFIX
							},
				type:		MessageBox.TYPE.INFO,
				msg:		msg
			},messageContainer);
		},
		
		_createMessagePassBox: function(/*String*/ msg){
			
			var messageContainer = domConstruct.create("div", {}, this.container);
			new MessageBox({
				canClose:	false,
				_stringsMsgs:	{
								icon_alt:	this._strings.PASS,
								a11y_label: this._strings.PASS_PREFIX
							},
				type:		MessageBox.TYPE.SUCCESS,
				msg:		msg
			},messageContainer);
		},
		_createMessageWarnBox: function(/*String*/ msg){
			
			var messageContainer = domConstruct.create("div", {}, this.container);
			new MessageBox({
				canClose:	false,
				_stringsMsgs:	{
								icon_alt:	this._strings.WARNING,
								a11y_label: this._strings.WARNING_PREFIX
							},
				type:		MessageBox.TYPE.WARNING,
				msg:		msg
			},messageContainer);
		},
		
		_createMessageErrorBox: function(/*String*/ msg){
			
			var messageContainer = domConstruct.create("div", {}, this.container);
			new MessageBox({
				canClose:	false,
				_stringsMsgs:	{
								icon_alt:	this._strings.ERROR,
								a11y_label: this._strings.ERROR_PREFIX
							},
				type:		MessageBox.TYPE.ERROR,
				msg:		msg
			},messageContainer);
		},
		
		_createHeading: function(/*String*/ heading, /*String*/ id){
			domConstruct.create(
					"h2",
					{
						"class": "lotusHeader",
						"innerHTML": heading,
						"id": id
					},this.container
			);
		},
		
		_onError: function(/* Object */sres) {
			// summary: Parse data for error status and, if applicable, error
			// message.
			
			var data = lang.mixin(sres, sres.response);
			data.args = lang.mixin(data.args, data.options);
			this._hasError=true;
			
			if(data.status===404) {
				this._errorMessage=this._Trans.NO_CONTACT;
			} else if(data.status===500) {
				this._errorMessage=this._Trans.SERVER_ERROR;
			} else if(data.status===403) {
				this._errorMessage=this._Trans.NO_CONTACT;
			} else {
				this._errorMessage=this._Trans.NO_CONTACT;
			}
			
			domAttr.set(this.container, "innerHTML", this._errorMessage);
			domConstruct.create("div",{
				"innerHTML": data
			}, this.container, "last");
		},
		
		_setMessageBox: function(/*String*/ status, /*String*/prefixString, /* String*/ component, /*String*/value){
			if(typeof(component) === 'undefined' && typeof(value) !== 'undefined'){
				if(status === "info"){
					this._createMessageInfoBox(prefixString + value);
				}else if(status === "pass"){
					this._createMessagePassBox(prefixString + value);
				}else if(status === "warn"){
					this._createMessageWarnBox(prefixString + value);
				}else{
					this._createMessageErrorBox(prefixString + value);
				}
			}else if(typeof(value) === 'undefined' && typeof(component) !== 'undefined'){
				if(status === "info"){
					this._createMessageInfoBox(prefixString + component);
				}else if(status === "pass"){
					this._createMessagePassBox(prefixString + component);
				}else if(status === "warn"){
					this._createMessageWarnBox(prefixString + component);
				}else{
					this._createMessageErrorBox(prefixString + component);
				}
			}else if(typeof(value) === 'undefined' && typeof(component) === 'undefined'){
				if(status === "info"){
					this._createMessageInfoBox(prefixString);
				}else if(status === "pass"){
					this._createMessagePassBox(prefixString);
				}else if(status === "warn"){
					this._createMessageWarnBox(prefixString);
				}else{
					this._createMessageErrorBox(prefixString);
				}
			}else{
				if(status === "info"){
					this._createMessageInfoBox(prefixString + component + " " + value);
				}else if(status === "pass"){
					this._createMessagePassBox(prefixString + component + " " + value);
				}else if(status === "warn"){
					this._createMessageWarnBox(prefixString + component + " " + value);
				}else{
					this._createMessageErrorBox(prefixString + component + " " + value);
				}
			}
		}
	});
		
	return searchValidation;
});
