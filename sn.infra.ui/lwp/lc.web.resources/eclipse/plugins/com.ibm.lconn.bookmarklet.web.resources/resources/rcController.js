/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.rcController");
dojo.requireLocalization("lconn.bookmarklet", "strings");

dojo.declare("lconn.bookmarklet.rcController", null, {
	_originalWidth : 500,
	_originalHeight : 450, 
	_serviceIncreasement : 150,
	_currentWindowHeight : 450,
	_lang: {},
	
	cPath : '',
	communityServiceUrl:'/service/proxy?service=ownerCommunities',
	isPrivate:'',
	hasCommunity:'',
	hasDescription:false,
	
	Effect: {},
	
	constructor:function() {
		dojo.mixin(this, {_lang:dojo.i18n.getLocalization('lconn.bookmarklet', 'strings')});
	    this.Effect = {
				DURATION : 250,
				
				fade: function(element){
					anim = dojo.fadeOut({node: element, duration: this.DURATION}).play();
					if (element.style.display == ''){
						element.style.display = "none";
					}
				},
				
				appear: function(element){
					if (element){
						if (element.style.display == 'none'){
							element.style.display = "";
						}
						dojo.fadeIn({node: element, duration: this.DURATION}).play();
					}
				}
	    };
	},
	
	init:function(args) {
		this.displayDescriptionHint(true);
		dojo.connect(dojo.byId('descField'),'onfocus', this, 'descriptionFocus');
		dojo.connect(dojo.byId('descField'),'onblur', this, 'descriptionBlur');
		dojo.mixin(this, args);
		if (this.hasCommunity == "false") {
			this.showNotice(this._lang.notCommunityPage);
		}
		if (this.isPrivate == "true") {
			this.showNotice(this._lang.privateCommunityNotice);
		}
		this.renderCommunityList();
	},
	
	showNotice:function(message){
		var infoNode = dojo.byId("messageNode");
		dojo.byId("messageText").innerHTML = message;
		this.Effect.fade(infoNode);
		this.Effect.appear(infoNode);
	},
	
	createErrorMessage: function(message, forId) {
		var messageId = "errorMessage";
		if (forId) {
			messageId = "errorMsgFor" + forId;
		}
		var messageNode = dojo.byId(messageId);
		if(messageNode != null){
		   dojo.destroy(messageNode);
		}
		messageNode = dojo.create("div", { "id": messageId, "role":"alert"},	forId,"before");
		new com.ibm.oneui.controls.MessageBox({msg: message}, 
				   messageNode);
		
		return messageNode;
	},
	
	deleteErrorMessage: function(forId) {
		var messageId = "errorMessage";
		if (forId) {
			messageId = "errorMsgFor" + forId;
		}
		var messageNode = dojo.byId(messageId);
		if (messageNode != null){
			messageNode.style.display = "none";		
		}
	},
	
	validateInputs: function(){
		var hasError = false;
		if (dojo.trim(dojo.byId("nameField").value.replace(/[\s]/g, "")) == ""){
			this.createErrorMessage(this._lang.notitle, "nameField");
			hasError = true;
		}else {
			this.deleteErrorMessage("nameField");
		}
		
		if (dojo.trim(dojo.byId("urlField").value) == "") {
			this.createErrorMessage(this._lang.nourl, "urlField");
			hasError = true;
		}else {
		    var url = dojo.trim(dojo.byId("urlField").value);
		    if (url.indexOf('http://')!=0 && url.indexOf('https://')!=0) {
			    this.createErrorMessage(this._lang.invalidUrl, "urlField");
			    hasError = true;
		    } else if (url.indexOf('/service/html/') < 0) {
			    this.createErrorMessage(this._lang.invalidUrl, "urlField");
			    hasError = true;
		    } else if (url.indexOf('communityUuid=') < 0) {
			    this.createErrorMessage(this._lang.invalidUrl, "urlField");
			    hasError = true;
		    } else {
			    var communityUuid = "";
			    var index = url.indexOf('communityUuid=');
			    communityUuid = url.substring(index, url.length);
			    
			    index = communityUuid.indexOf('&');
			    if (index < 0) {
			    	index = communityUuid.indexOf('#');
			    } else if (communityUuid.indexOf('#') > 0) {
			    	index = index < communityUuid.indexOf('#')?index:communityUuid.indexOf('#');
			    }

			    if (index < 0) index = communityUuid.length;
			    communityUuid = communityUuid.substring(0, index);
			    if (communityUuid.length == 36 + 'communityUuid='.length) {
				    this.deleteErrorMessage("urlField");
			    } else {
				    this.createErrorMessage(this._lang.invalidUrl, "urlField");
			        hasError = true;
				}
		    }
		}
		
		var hasFeatureSelected = false;
		
		if (hasFeatureSelected == false){
			if (dojo.byId("communityUuid")){
				if (dojo.byId("communityUuid").value) hasFeatureSelected = true;
			}
		}
		if (hasFeatureSelected == false){		
			this.createErrorMessage(this._lang.nothingselected, "communitiesProcessing")
			hasError = true;
		}else {
			this.deleteErrorMessage("communitiesProcessing");
			if(!hasError)hasError = false;
		}
	    if (!this.hasDescription) {
			this.displayDescriptionHint(false);
			}
		if (hasError) {
		    if (!this.hasDescription) {
				this.displayDescriptionHint(true);
				}
		    return false;
		}				
	},
	
	
	
	renderCommunityList:function() {
		dojo.xhrGet({url:this.communityServiceUrl,
			handle: dojo.hitch(this, this.callBack),
			handleAs: "json",
			timeout: 35000});		
	},
	
	callBack:function(data) {		
		try{
			this.Effect.fade(dojo.byId("communitiesProcessing"));
			if (data){
				var rtnObj = data;
				
				if (rtnObj && rtnObj.entries && rtnObj.entries.length){
					this.Effect.fade(dojo.byId("communitiesSelectField"));
					this.Effect.appear(dojo.byId("communitiesSelectField"));
					for(var i=0;i<rtnObj.entries.length;i++){
						var option = dojo.create("option", {"value": dojo.trim(rtnObj.entries[i].value)+"="+dojo.trim(rtnObj.entries[i].label)}, 
								dojo.byId("communityUuid"));
						option.appendChild(document.createTextNode(rtnObj.entries[i].label));
					}					
				}else {
					this.Effect.fade(dojo.byId("nocommunitiesLabel"));
					this.Effect.appear(dojo.byId("nocommunitiesLabel"));			
					
					dojo.byId("submitBtn").className = "lotusBtn";
					dojo.byId("submitBtn").setAttribute("disabled", "true");
					dojo.byId("cancelBtn").setAttribute("aria-describedby", "no" + TabController.serviceDataOption.service + "Label");
					dijit.focus(dojo.byId("cancelBtn"));
				}
			} else {
				this.Effect.fade(dojo.byId("nocommunitiesLabel"));
				this.Effect.appear(dojo.byId("nocommunitiesLabel"));			
				
				dojo.byId("submitBtn").className = "lotusBtn";
				dojo.byId("submitBtn").setAttribute("disabled", "true");
				dojo.byId("cancelBtn").setAttribute("aria-describedby", "no" + TabController.serviceDataOption.service + "Label");
				dijit.focus(dojo.byId("cancelBtn"));
			}
		} catch(err){
			this.Effect.fade(dojo.byId("nocommunitiesLabel"));
			this.Effect.appear(dojo.byId("nocommunitiesLabel"));
		}
	},
	
	resetSelectedItems:function() {
		var selectElement = dojo.byId("communityUuid");
		for(var i = 0; i < selectElement.options.length; i ++){
			selectElement.options[i].selected = false;
			selectElement.options[i].setAttribute('lastSelected', false);
		}
	},
	
	descriptionFocus:function() {
		if (!this.hasDescription) {
			this.displayDescriptionHint(false);
		}
	},
	
	descriptionBlur:function() {
		if (dojo.byId('descField').value) {
			if (dojo.attr(dojo.byId('descField'), 'showHint')=='true') {
				this.hasDescription = false;
			} else {
				this.hasDescription = true;
			}			
		} else {
			this.hasDescription = false;
		}
		if (!this.hasDescription) {
			this.displayDescriptionHint(true);
		} 
	},
	
	displayDescriptionHint:function(/*true*/show) {
		if (show) {
			dojo.byId('descField').style.color = "#666";
			dojo.byId('descField').value=this._lang.formDescriptionHint;
			dojo.attr(dojo.byId('descField'), {'showHint':'true'});
		} else {
			dojo.byId('descField').style.color = "#000";
			dojo.byId('descField').value="";
			dojo.attr(dojo.byId('descField'), {'showHint':'false'});
		}
	},
});

var RCController = new lconn.bookmarklet.rcController();
