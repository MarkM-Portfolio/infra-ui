/* Copyright IBM Corp. 2006, 2015  All Rights Reserved.              */

dojo.provide("lconn.bookmarklet.tabController");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.declare("lconn.bookmarklet.tabController", null, {
	selectedTab: {},
	currentTab: {},
	currentSelectedElement: {},
	changeExecute: false,
	tabIndex: -1,
	serviceDataOption: {},
	getServiceEntriesProxyUrl: "",
	
	getElementsByClassName: function(tagName, className){
		var results = new Array();
		var elements = document.getElementsByTagName(tagName);
		for(var i=0;i<elements.length;i++){
			if (dojo.hasClass(elements[i], className)){
				results.push(elements[i]);
			}
		}
		return results;
	},
	
	resetAll: function(){
		var controllers = TabController.getElementsByClassName("A", "tabcontrol");
		var tabs = TabController.getElementsByClassName("TR", "tabcontent");
		for(i=0;i<controllers.length;i++){
			controllers[i].parentNode.className = "";
		}
		for(i=0;i<tabs.length;i++){
			tabs[i].style.display = "none";
		}
		
		/*
		*
		* To fix a very strange UI overlap issue, only appears on IE6, poor IE!!
		*/
		if (dojo.byId("activitiesInputs")){
			dojo.byId("activitiesInputs").style.display = "none";
		}
		if (dojo.byId("communitiesInputs")){
			dojo.byId("communitiesInputs").style.display = "none";
		}
		if (dojo.byId("blogsInputs")){
			dojo.byId("blogsInputs").style.display = "none";
		}
	},
	
	callback: function(data){
		try{
			TabController.Effect.fade(dojo.byId(TabController.serviceDataOption.service + 'Processing'));
			if (data){
				
				//eval("TabController." + TabController.serviceDataOption.service + "=data;");
				TabController[TabController.serviceDataOption.service] = data;
				//eval("var rtnObj = TabController." + TabController.serviceDataOption.service  + ";");
				var rtnObj = data;
				
				if (rtnObj && rtnObj.entries && rtnObj.entries.length){
					TabController.Effect.fade(dojo.byId(TabController.serviceDataOption.service + 'Inputs'));
					TabController.Effect.appear(dojo.byId(TabController.serviceDataOption.service + 'Inputs'));
					for(var i=0;i<rtnObj.entries.length;i++){
						var option = document.createElement("option");
						option.appendChild(document.createTextNode(lconn.core.globalization.bidiUtil.enforceTextDirection(rtnObj.entries[i].label)));
						option.setAttribute("value", rtnObj.entries[i].value);
						TabController.serviceDataOption.holder.appendChild(option);
					}
					if (useRTE && TabController.editorOptions && !dijit.byId(TabController.editorOptions.id)){						
						if (TabController.editorOptions.height) height = TabController.editorOptions.height;						
						//eval(TabController.serviceDataOption.service + "Editor=CKEDITOR.replace(TabController.editorOptions.container, {toolbar:[['Bold','Italic','Underline','Strike','TextColor', 'BulletedList', 'Image', 'UrlLink', 'Smiley']]});");
						lconn.core.ckeditor.async(dojo.hitch(TabController, "createEditor"));
					}	
					
					if (! entriesSelectDisplayed && isPopupForm){
						currentWindowHeight += serviceIncreasement;
						window.resizeBy(0, serviceIncreasement);
						entriesSelectDisplayed = true;
					}
				}else {
					TabController.Effect.fade(dojo.byId("no" + TabController.serviceDataOption.service));
					TabController.Effect.appear(dojo.byId("no" + TabController.serviceDataOption.service));
					if (dojo.byId("IsNotAddToDogear")){
						dojo.byId("submitBtn").className = "lotusBtn";
						dojo.byId("cancelBtn").setAttribute("aria-describedby", "no" + TabController.serviceDataOption.service + "Label");
						dijit.focus(dojo.byId("cancelBtn"));
					}
				}
			}else {
				TabController.Effect.fade(dojo.byId("no" + TabController.serviceDataOption.service));
				TabController.Effect.appear(dojo.byId("no" + TabController.serviceDataOption.service));
				if (isPopupForm){
					if (currentWindowHeight < originalHeight + serviceIncreasement) return;
					currentWindowHeight -= serviceIncreasement;
					window.resizeBy(0, serviceIncreasement);
					entriesSelectDisplayed = false;
				}
				if (dojo.byId("IsNotAddToDogear")){
					dojo.byId("submitBtn").className = "lotusBtn";
					dojo.byId("cancelBtn").setAttribute("aria-describedby", "no" + TabController.serviceDataOption.service + "Label");
					dijit.focus(dojo.byId("cancelBtn"));
				}
			}
		}catch(err){
			TabController.Effect.fade(dojo.byId("no" + TabController.serviceDataOption.service));
			TabController.Effect.appear(dojo.byId("no" + TabController.serviceDataOption.service));
		}
		
	},
	
	createEditor: function() {
		window[TabController.serviceDataOption.service+"Editor"] = CKEDITOR.replace(TabController.editorOptions.container, {toolbar:'BookmarkletDiscussion'});
	},
	
	render: function(eventSrc, tabContent, editorOptions, service, dataHolder){
		
		try{
			TabController.selectedTab = eventSrc.parentNode;
			if (service){
				TabController.serviceDataOption.service = service;
				TabController.serviceDataOption.holder = dojo.byId(dataHolder);
			}
			if (TabController.selectedTab == TabController.currentTab) return;
			TabController.resetAll();
			TabController.editorOptions = editorOptions;
			TabController.currentTab = TabController.selectedTab;
			TabController.currentTab.className = "lotusSelected";
			tabContent.style.display = "";
			if (service){
				//if (! eval("TabController." + TabController.serviceDataOption.service)){
				if (!TabController[TabController.serviceDataOption.service]){
					dojo.xhrGet({url:TabController.getServiceEntriesProxyUrl,
								content: {service: TabController.serviceDataOption.service},
								handle: this.callback,
								handleAs: "json",
								timeout: 15000
								//error: TabController.callback
						}
					);
				}else {
					//if (eval("TabController." + service) && eval("TabController." + service + ".entries.length")) {
					//if (TabController[service] && TabController[service.entries.length]) {
					if (TabController[TabController.serviceDataOption.service] && TabController[TabController.serviceDataOption.service].entries.length) {
						if (dojo.byId(service + "Inputs")) {
							TabController.Effect.fade(dojo.byId(service + "Inputs"));
							TabController.Effect.appear(dojo.byId(service + "Inputs"));
							if (! entriesSelectDisplayed && isPopupForm){
								currentWindowHeight += serviceIncreasement;
								window.resizeBy(0, serviceIncreasement);
								entriesSelectDisplayed = true;
							}
						}
					}
				}
			}else {
				if (currentWindowHeight < originalHeight + serviceIncreasement) return;
				if (isPopupForm){
					currentWindowHeight -= serviceIncreasement;
					window.resizeBy(0, 0-serviceIncreasement);
					entriesSelectDisplayed = false;
				}
			}
		}catch(err){}
		
	},
	
	imgEffect: function(obj, no, val, action) {
		TabController.tabIndex = no;
		TabController.currentSelectElement = obj;
		var imgs  = TabController.getElementsByClassName("IMG", "checked");
		if (obj.tagName == "INPUT") {
			if (imgs[no]) imgs[no].style.display = obj.checked ? "none" : "";
		}else if (obj.tagName == "SELECT") {
			if (imgs[no]) {
				imgs[no].style.marginRight="0";
				imgs[no].nextSibling.style.marginRight="0.5em";
				if(obj.value == ""){
					imgs[no].style.display  = "none";
					imgs[no].nextSibling.style.display = "none";
				} else {
					imgs[no].style.display  = "";
					imgs[no].nextSibling.style.display="";
					var selectedOptionsLen = 0;	
					for (var i=0;i<obj.length;i++){
						if(obj.options[i].selected) selectedOptionsLen++;
					}
					imgs[no].nextSibling.innerHTML = "("+selectedOptionsLen+")";
					var hint;
					switch(no){
						case 1:hint = dojo.i18n.getLocalization("lconn.bookmarklet","strings").communities_checked;break;
						case 2:hint = dojo.i18n.getLocalization("lconn.bookmarklet","strings").activities_checked;break;
						case 3:hint = dojo.i18n.getLocalization("lconn.bookmarklet","strings").blogs_checked;break;
					}
					imgs[no].title = imgs[no].nextSibling.title = dojo.string.substitute(hint,[selectedOptionsLen]);
				}
			}
		}
	},
	
	resetSelectedItems: function(selectElement, index){
		if (!selectElement) return;
		for(var i = 0; i < selectElement.options.length; i ++){
			selectElement.options[i].selected = false;
			selectElement.options[i].setAttribute('lastSelected', false);
		}
		TabController.imgEffect(selectElement, index);
	}
	
});

var TabController = new lconn.bookmarklet.tabController();

TabController.Effect = {
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
