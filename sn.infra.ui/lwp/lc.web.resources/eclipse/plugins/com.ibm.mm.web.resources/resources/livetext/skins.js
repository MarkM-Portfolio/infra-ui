/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.livetext.skins");
dojo.provide("tagservices.skins");

dojo.require("dojo.string");
dojo.require("dojo.dnd.move");
dojo.require("dojox.uuid.generateRandomUuid");

/* 
Each skin should have a skin.html and skin.js file.
skin.html file serves as a template with desirable variables. As a skin developer, you may
define any number of variables for you to use as long as you setup the variable correctly
in the process function which is defined in skin.js

skin.js file is a json string file, it defines all the variables in the skin.html and how they should be created.
In this file, function process can be defined as follows:

process:function(skinId,tagId) {
}

this function will be called to form all the variables which are used in the skin.html.
you may have variables in skin.html file like this
	${var01}
	${var02}
When you have these, you will have to define these two variables with correct values. Of course,
in process function, you have chance to set these variables to other values. Since function process
will be given two objects, one is the skinId and the other is the tagId (widget id normally), so 
a lot of action can be taken to set up all necessary variables.

There are two variable that you can use in the skin.html file, but you must not provide the value for,
these two variables are
	${widgetBody}
	${skinId}
Even if you provide values for these two variables, they will be overwritten;
*/
dojo.declare("tagservices.skins", null, 
{
	trace:false,
	skinIdPrefix:"mm_ibm_skin_",
	allSkins:[],
	allVars:[],
	allSkinURL:[],
	tempSkinHtmlObj:null,
	tempSkinJsObj:null,
	
	isProcessing:0,
	waitingList:[],
	subscribeHandler:null,
	skinAttachEvent:"/skinservice/attachEnd",
	
	processTag: function(tag){
		this.tempSkinHtmlObj = new Object();
		this.tempSkinJsObj = new Object();
		if (tag == null) {
			return;
		}
		if (this.trace) {
			com.ibm.mm.enabler.debug.log("aTag " + tag.id + " " + tag.getAttribute("skin"));
			com.ibm.mm.enabler.debug.log(this._getNodeMarkup(tag));
		}
		var skinId = tag.getAttribute("skin");	
		this._getSkinTemplate(skinId,tag);	
	},
	
	_getSkinTemplate:function(skinId,tag) {
		 var aSkin = this.allSkins[skinId];
		 if (aSkin == null) {
			var skinroot = this._getSkinRoot(skinId);
			if (skinroot == ""){
				var firstSkin = this._getFirstSkin();
				if (firstSkin!=null){
					skinroot = firstSkin.baseURL;
					tag.setAttribute("skin",firstSkin.name);
					skinId = firstSkin.name;
				}else{
					com.ibm.mm.enabler.debug.error(com.ibm.mm.builder.coreWidgetsMessages.E_SKIN_NOSKIN_EXIST_0);
					return;		
				}	 	
			}
			var thisObj = this;
			var skinMarkupURL = skinroot + "skin.html";
			dojo.xhrGet({
				url: skinMarkupURL,
				handleAs: "text",
				sync: true,
				load:function(htmlData) {	
					var skinVarURL = skinroot + "skin.js";
				 	dojo.xhrGet({
					url: skinVarURL,
					handleAs: "json",
					sync: true,
					load:function(jsData) {
						// remove the copyright in the skin.html		
						htmlData = htmlData.replace(/<!--.*-->\s*/,"");
						thisObj.allSkins[skinId] = htmlData;
						thisObj.allVars[skinId] = jsData;
						thisObj.startAttatchSkin(skinId,tag);
					},
					error:function(data) {
						thisObj.allSkins[skinId] = htmlData;
						thisObj.startAttatchSkin(skinId,tag);						 	
					}
				 });				 	
				},
				error:function(data) {
					com.ibm.mm.enabler.debug.error(dojo.string.substitute(com.ibm.mm.builder.coreWidgetsMessages.E_SKIN_LOAD_TEMPLATE_FAIL_1,[data]));
				}
			});
		 }else{
		 	this.startAttatchSkin(skinId,tag);
		 }
	},
	
	startAttatchSkin:function(skinId,tag){
		if (this.isProcessing == 0){
			this.executeReplaceSkin(skinId,tag);
		}else{
			this.addToWaitingList(skinId,tag);
		}
	},
	
	chooseNext:function(){
		if (this.waitingList.length!=0){
			var theObject = this.waitingList.pop();
			this.executeReplaceSkin(theObject.skin,theObject.tag);
		}
	},
	
	addToWaitingList:function(skinId,tag){
		if (this.subscribeHandler==null){
			this.subscribeHandler = dojo.subscribe(this.skinAttachEvent, this, "chooseNext");
		}
		var waitObj = new Object();
		waitObj.skin = skinId;
		waitObj.tag = tag;
		this.waitingList.push(waitObj);
	},	
	
	executeReplaceSkin:function(skinId,tag){
		this.isProcessing = 1;
		var temp = this.allSkins[skinId];
		
		if (temp != null) {
			var nodeToReplace = this._getNodeToReplace(tag);  
			var parentNode = nodeToReplace.parentNode;	 
			var anId = dojox.uuid.generateRandomUuid();
			var args = this._getArgs(skinId, tag, anId);
			
			if (args == null) {
				com.ibm.mm.enabler.debug.error(com.ibm.mm.builder.coreWidgetsMessages.E_SKIN_NOT_EXIST_0);
				return;
			}
			
			mainPage.loadCss(args.skinRoot + "skin.css");
			var newMarkup = dojo.string.substitute(temp, args);
			//TODO
			newMarkup = newMarkup.replace(/\/>/g,"><\/div>");	
			
			var newNode = this._getNodeFromMarkup(newMarkup);
			dojo.addClass(newNode,"mumWidgetTitleBar");
			
			parentNode.replaceChild(newNode, nodeToReplace); 
			var tNode = dojo.byId(anId);
			tNode.parentNode.replaceChild(tag, tNode);
			
			//create edit bar and attach events
			var hwc = com.ibm.mashups.builder.systemWidgetLocator.registory["HiddenWidgetsCorral"];
			if(hwc && skinId == hwc.skinType){
				hwc.postAttachSkin(args,tag,newNode);
			}else{
				com.ibm.mashups.builder.systemWidgetLocator.registory["Layout"].postAttachSkin(args,tag,newNode);				
			}
			
			if (serviceManager.getService("queryService").getWidgetById(tag.id)){
				com.ibm.mm.builder.utils.skinUtil.updateTitleAndIcon(tag.id);
			}
		}
		
		this.isProcessing = 0;
		dojo.publish(this.skinAttachEvent, [null]);
	},
	
	_getSkinRoot:function(skinId) {
		var baseURL = "";
		try{
			if (this.allSkinURL[skinId]!=null){
				return this.allSkinURL[skinId];	
			}
			var curThemeId = mainPage.themeId;
			var themeModel = com.ibm.mashups.enabler.model.Factory.getThemeModel();
			themeModel.setStrategy(new com.ibm.mashups.enabler.strategy.ListLoadAheadStrategy(5));
			themeModel.setCursorPosition(0);
			var theme = null;
			while (themeModel.hasNext()) {
				theme = themeModel.next();
				if (theme.getID() == curThemeId){
					break;
				}
			}
			if (theme!=null){
				var skinModel = themeModel.getSkinModel(theme);
				skinModel.setStrategy(new com.ibm.mashups.enabler.strategy.ListLoadAheadStrategy(10));
				skinModel.setCursorPosition(0);
				while (skinModel.hasNext()) {
					var skin = skinModel.next();
					if (skin.getName() == skinId){
						baseURL = skin.getBaseUrl();
						break;
					}
				}			
			}else{
				com.ibm.mm.enabler.debug.error(com.ibm.mm.builder.coreWidgetsMessages.E_SKIN_THEME_NOT_EXIST_0);
			}
			if (baseURL!=""){
				this.allSkinURL[skinId] = baseURL;
			}
			return baseURL;			
		}catch (ex){
			com.ibm.mm.enabler.debug.error(dojo.string.substitute(com.ibm.mm.builder.coreWidgetsMessages.E_SKIN_LOAD_ROOT_FAIL_1,[ex.message]));
		}
	},
	
	_getFirstSkin:function() {
		var skinObject = null;
		try{
			var curThemeId = mainPage.themeId;
			var themeModel = com.ibm.mashups.enabler.model.Factory.getThemeModel();
			themeModel.setStrategy(new com.ibm.mashups.enabler.strategy.ListLoadAheadStrategy(5));
			themeModel.setCursorPosition(0);
			var theme = null;
			while (themeModel.hasNext()) {
				theme = themeModel.next();
				if (theme.getID() == curThemeId){
					break;
				}
			}
			if (theme!=null){
				var skinModel = themeModel.getSkinModel(theme);
				skinModel.setStrategy(new com.ibm.mashups.enabler.strategy.ListLoadAheadStrategy(10));
				skinModel.setCursorPosition(0);
				while (skinModel.hasNext()) {
					var skin = skinModel.next();
					skinObject = new Object();
					skinObject.name = skin.getName();
					skinObject.baseURL = skin.getBaseUrl();
					break;
				}			
			}else{
				com.ibm.mm.enabler.debug.error(com.ibm.mm.builder.coreWidgetsMessages.E_SKIN_THEME_NOT_EXIST_0);
			}
			return skinObject;			
		}catch (ex){
			com.ibm.mm.enabler.debug.error(dojo.string.substitute(com.ibm.mm.builder.coreWidgetsMessages.E_SKIN_LOAD_ROOT_FAIL_1,[ex.message]));
		}
	},	

	_getArgs:function(skinId, tag, anId) {
		var args = {};
		//fixme. use the skin substitution to do this.
		//here we will allow users to do things.
		var skinVar = this.allVars[skinId];
		if (skinVar != null) {
			dojo.mixin(args, skinVar);
		}		 
		//in case, skin defines the widgetBody and skinId, we need to overwrite.
		args.widgetBody = "<div id='" +anId + "'/>";
		args.skinId = this.skinIdPrefix+tag.id;
		var skinRoot = this._getSkinRoot(skinId);
		if (skinRoot == ""){
			return null;
		}
		args.skinRoot = skinRoot;
		if (args.process == "undefined" || args.process == null) {
			 args.process = function(skinId, tagId){
			 }
		}
		args.process(skinId, tag.id);
		return args;
	},

	_getNodeMarkup:function(tag) {
		 var newNode = document.createElement("div");
		 newNode.appendChild(tag.cloneNode(true));
		 var markup = newNode.innerHTML;
		 newNode.removeChild(newNode.firstChild);
		 return markup;
	},

	_getNodeFromMarkup:function(markup) {
		 var newNode = document.createElement("div");
		 newNode.innerHTML = markup;
		 return newNode.removeChild(newNode.firstChild);		  	 
	},

	_getNodeToReplace:function(tag) {
		 var node = dojo.byId(this.skinIdPrefix+tag.id);
		 if (node == null) {
			 node = tag;
		 }
		 return node;
	},

	_showParent:function(node) {
		 var parent = node.parentNode;
		 while (parent!=null) {
			 parent = parent.parentNode;
		 }
	}
});
