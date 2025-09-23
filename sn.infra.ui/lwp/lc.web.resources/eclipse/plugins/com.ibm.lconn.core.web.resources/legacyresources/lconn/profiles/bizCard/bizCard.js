/* Copyright IBM Corp. 2001, 2016  All Rights Reserved.              */
dojo.provide("lconn.profiles.bizCard.bizCard");

dojo.require("lconn.core.bizCard.bizCardUtils");
dojo.require("lconn.profiles.bizCard.bizCardUI");


(function() {

//Our encapsulated reference to dojo.  
//On init, this is set from lconn.core.bizCard.bizCardUtils.getDojoObject in case that has been set to a scoped dojo.
var _d = dojo;

// Standalone person card must require these files explicitly
lconn.core.bizCard.bizCardUtils.loadSametimeModules();

/* This is the JS file semantic tagging with people */
lconn.profiles.bizCard.bizCard = {
	messages: {},
	
	CARDBEHAVIORS: {
		HOVER: "hover",  //this is the traditional behavior with a separate hover div to click on to show card.
		POSTLINK: "postLink",  //this will append a down arrow after the name for the user to click.  No hover.
		OVERRIDE: "override"  //this will change the href of the link directly to open the card.  No Hover.
	},
	
	
	cardBehavior: null,


	applicationContext: null,
	servletUrlByUserId: null,
	servletUrlByEmail:  null,
	servletUrlByDn:  null,

	requestor: null,
	services: [],
	initited: false,

	init: function () {
		if(this.initited == false)
		{
			_d = lconn.core.bizCard.bizCardUtils.getDojoObject();
			_d.requireLocalization("lconn.profiles.bizCard", "ui");
			this.messages = _d.i18n.getLocalization("lconn.profiles.bizCard", "ui");
			
			//default card behavior
			this.cardBehavior = this.CARDBEHAVIORS.OVERRIDE;
			
			this.applicationContext = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");

			var jsonBaseUrl = this.applicationContext + "/json/semanticTagProfileView.do";

			this.servletUrlByUserId2 = jsonBaseUrl + "?userid=@@@USERID@@@&auth=@@@AUTH@@@";
			this.servletUrlByEmail2 =  jsonBaseUrl + "?email=@@@EMAIL@@@&auth=@@@AUTH@@@";
			this.servletUrlByDn2 =  jsonBaseUrl + "?distinguishedName=@@@DN@@@&auth=@@@AUTH@@@";
			
			this.servletUrlByUserId = jsonBaseUrl + "?userid=@@@USERID@@@&callback=lconn.profiles.bizCard.bizCard.dispatchByUserId&auth=@@@AUTH@@@";
			this.servletUrlByEmail =  jsonBaseUrl + "?email=@@@EMAIL@@@&callback=lconn.profiles.bizCard.bizCard.dispatchByEmail&auth=@@@AUTH@@@";
			this.servletUrlByDn =  jsonBaseUrl + "?distinguishedName=@@@DN@@@&callback=lconn.profiles.bizCard.bizCard.dispatchByDn&auth=@@@AUTH@@@";
	
			this.requestor = new LCSemTagUtil.crossDomainRequest();
			
			//check to see whether we use the hover card, override the link, or an icon link after the name
			var behaviorParam = lconn.core.bizCard.bizCardUtils.getUrlParam("cardBehavior");
			if (behaviorParam) {
				this.cardBehavior = behaviorParam;
			} else if (dojo.exists("SemTagSvcConfig") && SemTagSvcConfig.cardBehavior) {
				this.cardBehavior = SemTagSvcConfig.cardBehavior; 
			} else {
				var cfgobj = dojo.getObject("lconn.core.config.properties");			
				if (cfgobj && typeof cfgobj['com.ibm.lconn.personcard.behavior'] !== "undefined") {
					this.cardBehavior = cfgobj['com.ibm.lconn.personcard.behavior'];
				}
			}
			
			if (dojo.exists("lconn.bizCard.publish")) {
				lconn.bizCard.publish("lconn/bizCard/profiles/init", this);
			}
			
			this.initited = true;
		}
	},
	
	getIdMethod: function(jsonObj) {
		return (jsonObj.email && jsonObj.email.internet)? jsonObj.email.internet: null;
	},
	
	convMethod: function (retval) {
		return retval;
	},
		
	dispatchByEmail: function (data) 
	{
		if(lconn.core.bizCard.bizCardUtils.isDebug) console.log("lconn.profiles.bizCard.bizCard.dispatchByEmail: data: " + data);
		//var reqid = this.getIdMethod(null, data);
		var reqid = (data.email && data.email.internet)? data.email.internet: null;
		this.dispatch(reqid, data);
	},
	
	dispatchByUserId: function (data) 
	{
		if(lconn.core.bizCard.bizCardUtils.isDebug) console.log("lconn.profiles.bizCard.bizCard.dispatchByUserId: data: " + data);
		var reqid = data.X_lconn_userid ? data.X_lconn_userid : null;
		this.dispatch(reqid, data);
	},
	
	dispatchByDn: function (data) 
	{
		if(lconn.core.bizCard.bizCardUtils.isDebug) console.log("lconn.profiles.bizCard.bizCard.dispatchByDn: data: " + data);
		var reqid = data.dn ? data.dn : null;
		this.dispatch(reqid, data);
	},

	dispatchByConfig: function (data) 
	{
		if(lconn.core.bizCard.bizCardUtils.isDebug) console.log("lconn.profiles.bizCard.bizCard.dispatchByConfig: data: " + data);
		this.dispatch("configDataId", data);
	},
	
	dispatch: function(id, data)
	{
		if(lconn.core.bizCard.bizCardUtils.isDebug) console.log("lconn.profiles.bizCard.bizCard.dispatch: id:"+ id +"  data: " + data);
		this.requestor.dispatch(id, data);
	},
	
	//This an API that is used by Lotus Mashup LiveText framework and the portal team
	processTag: function(vcardDomNodes)
	{
		try
		{
			if(!this.initited)
			{
				lconn.core.bizCard.bizCardUtils.init();
				LCSemTagMenu.init();
				this.init();
			}
			// There are conditions where mashup framework will pass in an array
			// of domnodes if an older version of dojo is used.
			if (typeof vcardDomNodes == "object" && vcardDomNodes.length) { //it's an array of dom nodes
				for (var ii = 0; ii < vcardDomNodes.length; ii++) {
					this.processHcard(vcardDomNodes[ii]);
				}
			} else { //it's just a single dom node
				this.processHcard(vcardDomNodes);
			}
		}
		catch(e)
		{ 
			console.log(e);
		}
	},

	processHcard: function(hcard) {
		if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Processing at lconn.profiles.bizCard.bizCard.processHcard for " + (dojo.isIE? hcard.innerText : hcard.textContent));

		if (!this._hasValidSemanticTags(hcard)) return;

		var fnElem = this.getNameElement(hcard);
		if (this.isInline(hcard)) {
			return this.processHcard_inline(fnElem);
			
		} else if (this.cardBehavior === this.CARDBEHAVIORS.HOVER) {
			return this.processHcard_hover(fnElem);
			
		} else if (this.cardBehavior === this.CARDBEHAVIORS.POSTLINK) {
			return this.processHcard_postlink(fnElem);
			
		} else { //default to override
			return this.processHcard_override(fnElem);
			
		}
	},
	
	_onClickShowMenu: function(event) {
		LCSemTagMenu.waitCursor();
		LCSemTagMenu.originalActiveEl = document.activeElement;
		LCSemTagMenu.currentEvent = event;
		LCSemTagMenu.setCurrentElement(lconn.core.bizCard.bizCardUtils.getElementFromEvent(event));				
		this.showMenu(event);
	},
	
	_cleanupElementLink: function(fnElem) {
		//if the user is external, we want to remove the link href since this user 
		//doesn't have access to other people's profiles.
		setTimeout(function() {
			try {
				if (lconn.core.auth.getUser().isExternal) {
					dojo.attr(fnElem, "href", "javascript:;");
					dojo.connect(fnElem, "click", function(evt) {
						dojo.stopEvent(evt);
					});
				}
			} catch (e) {}
		},0);
	},
	
	_removeAriaDescribedBy: function(fnElem) {
		// RTC #101297 - If someone else has put aria-describedby to "semtagmenu",
		// we can remove it since we are building a better aria-label.
		setTimeout(function() {
			if (dojo.attr(fnElem, "aria-describedby") == "semtagmenu") {
				if (lconn.core.bizCard.bizCardUtils.isDebug) {
					console.warn("[lconn.profiles.bizCard.bizCard.processHcard] The 'aria-describedby' attribute should not be set to 'semtagmenu' for profile bizcard links.  Removing...");
				}
				dojo.removeAttr(fnElem, "aria-describedby");
			}
		},0);	
	},
	
	processHcard_postlink: function(fnElem) {
		setTimeout(dojo.hitch(this, function() {
			lconn.core.bizCard.bizCardUtils.addPostLink(fnElem, dojo.hitch(this, this._onClickShowMenu));
			
			this._removeAriaDescribedBy(fnElem);
			this._cleanupElementLink(fnElem);
		}), 0);
		
	},
	
	processHcard_override: function(fnElem) {
		setTimeout(dojo.hitch(this, function() {
			lconn.core.bizCard.bizCardUtils.addOverride(fnElem, dojo.hitch(this, this._onClickShowMenu));
			this._removeAriaDescribedBy(fnElem);
		}), 0);
	},
	
	processHcard_inline: function(fnElem) {
		var event = {"target": fnElem}; // We need an event
		/*
			The inline processing is failing in certain conditions because the currentElem 
			is not set correctly. But since the getCurrentElem() function is used in some 
			funky ways, changing it would probably result in some breakage elsewhere since 
			this code is so fragile.  The only way we can reliably fix this would be to 
			reset the currentElem to null beforehand for inline cards.
		*/
		LCSemTagMenu.currentElem = null;
		this.getTagFromServer(event);
	},
	
	processHcard_hover: function(fnElem) {
	
		// RTC #123148
		// Hover business card not supported from within a dojo dijit Dialog
		try {
			var pNode = fnElem.parentNode;
			while (pNode) {
				if (dojo.hasClass(pNode, "dijitDialog")) {
					if (lconn.core.bizCard.bizCardUtils.isDebug && window.console) console.warn("Connections business card hover not supported from within dojo dijit Dialog.");
					return;
				}
				pNode = pNode.parentNode;
			}
		} catch (e) {}
		
		
		lconn.core.bizCard.bizCardUtils.addHover(
			fnElem, 				 // watched element
			this.showHover, 		 // hover func
			this.showMenu, 			 // click func
			this.keystrokeHandler 	 // keystroke func
		); 


		// Code here sets the aria-label info for JAWS to read
		// TODO - Right now we are concatenating the aria-label.
		// We should have separate message for all different 
		// scenarios.  May become an issue in future with translations
		// of strings and JAWS i18n support.
		try {
			var msg = "";
			
			//try to add the name 
			try {
				if (dojo.hasAttr(fnElem, "aria-label")) {
					msg += dojo.attr(fnElem, "aria-label");
				} else			
				if (dojo.hasAttr(fnElem, "title")) {
					msg += dojo.attr(fnElem, "title");
				} else
				{
					//try to find any hidden nodes and remove them before getting the inner content
					var fnElemCopy = dojo.clone(fnElem);
					try {
						dojo.query("*", fnElemCopy).forEach(function(subNode) {
							if (subNode && (dojo.hasClass(subNode, "lotusHidden") || subNode.style.display == "none")) {
								subNode.parentNode.removeChild(subNode);
							}
						});
					} catch (e) {}
					msg += dojo.trim((dojo.isIE? fnElemCopy.innerText : fnElemCopy.textContent));
				}
				if (msg.length > 0) {
					msg += ". ";
				}
			} catch (e) {}			
			
			// Need to check to see if this user is inactive.  A parentNode would 
			// have a className of lotusDim if it was inactive 
			var pNode = fnElem.parentNode;
			while (pNode) {
				if (dojo.hasClass(pNode, "lotusDim")) {
					msg += this.messages["label.inactive.user.msg"] + ". ";
					break;
				}
				pNode = pNode.parentNode;
			}
			
			if (msg.indexOf(this.messages["label.semtag.hover.altA11Y"]) == -1) {
				msg += this.messages["label.semtag.hover.altA11Y"];
			}
			
			fnElem.setAttribute("aria-label", msg);	
			
			// If there is an image in the link, then we need to set the aria-label
			// of the image so JAWS will read it.
			dojo.query("img", fnElem).forEach(function(node, index, nodelist){
				if (!dojo.attr(node, "aria-label")) {
					var alttext = dojo.attr(node, "alt");
					if (alttext) alttext += ". ";
					dojo.attr(node, "aria-label", alttext + msg);
				}
			});
			
			this._removeAriaDescribedBy(fnElem);
			this._cleanupElementLink(fnElem);
			
		} catch (ee) {}
		
	},
	
	isInline: function (hcard) {
		return this.getHcardAttributeValue("X-person-display-inline", hcard);
	},
	
	loadHcardPerson: function (srcElement) {
		var person = new Object();
		var parentVcard = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcard", srcElement);
		var vcardElems = parentVcard.getElementsByTagName("*");
		for (var i=0; i<vcardElems.length; i++) {
			var curElem = vcardElems[i];
			if (curElem.className) {
				var classes = curElem.className.split(' ');
				for (var j=0; j<classes.length; j++) {
					var c = classes[j];
					var attr = this.getHcardAttributeValue(c, parentVcard);
					if (attr) person[c] = attr;
				}
			}
		}
		return person;
	},

	getHcardAttributeValue: function (hcardAttr, srcElement) {
		
		switch(hcardAttr) {
			case("email"):
				return this.getHcardTypedAttribute(srcElement, hcardAttr, "internet");
			case("tel"):
				return this.getHcardTypedAttribute(srcElement, hcardAttr, "voice");
			case("adr"):
				return this.getHcardTypedAttribute(srcElement, hcardAttr, "intl");
		}
		
		var parentVcard = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcard", srcElement);
		var elems = lconn.core.bizCard.bizCardUtils.getElementsByClassName(hcardAttr, parentVcard, 1);
		if (elems.length > 0 && elems[0].tagName.match(/^abbr$/i)) return elems[0].getAttribute("title");
		switch (hcardAttr) {
			case("fn"):
				var fn = lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(elems[0]);
				if (fn) return fn;
				else return this.getHcardAttributeValue("n", srcElement); // no fn, parse for n
				break;
			case("n"):
				if (elems.length > 0) {
					var nElem = elems[0];
					var fnStr = "";
					var attrs = ["honorific-prefix","given-name","additional-name","family-name","honorific-suffix"];
					for (var i=0;i<5;i++) {
						var n = lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(lconn.core.bizCard.bizCardUtils.getElementsByClassName(attrs[i], nElem, 1)[0]);
						if (n) fnStr += n + " ";
					}
					return fnStr;
				}
				// empty or no n is valid, return blank
				return "";
				break;
			case("photo"):
				var photoElem = elems[0];
				if (photoElem) return photoElem.getAttribute("src");
				else return;
				break;
			case("X-sametime-status"):
				var stStatusElem = elems[0];
				if (!stStatusElem) return "";
				var stStatusValue = stStatusElem.getAttribute("value");
				if (stStatusValue) return stStatusValue;
				else return lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(stStatusElem);
				break;
			case("X-person-display-inline"):
				if (elems.length > 0) return true;
				else return false;
			case("street-address"):
			case("post-office-box"):
			case("extended-address"):
			case("locality"):
			case("region"):
			case("postal-code"):
			case("country-name"):
			case("title"):
			case("role"):
			case("org"):
			default:
				return lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(elems[0]);
			break;
		}
	},

	getHcardTypedAttribute: function(srcElement, hcardAttr, defSubProp) {
		var returnElem = new Object();
		var parentVcard = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcard", srcElement);
		var typedElems = lconn.core.bizCard.bizCardUtils.getElementsByClassName(hcardAttr, parentVcard);
		// this means there are multiple email, adr, or tel elements
		for (var i=0; i<typedElems.length; i++) {
			var curElem = typedElems[i];

			if (hcardAttr == "email" && curElem.nodeName.toLowerCase() == 'a' && curElem.href.match(/^mailto:/)) {
				// then we need to use the href value
				var queryPos = curElem.href.indexOf("?");
				if (queryPos > -1) returnElem[defSubProp] = curElem.href.slice(7,queryPos);
				else returnElem[defSubProp] = curElem.href.slice(7);
				continue;
			}
			returnElem = lconn.core.bizCard.bizCardUtils.getTypedValue(curElem, defSubProp);
		}
		return returnElem;
	},
	
	showHover: function(event) {
		try{
			lconn.core.bizCard.bizCardUtils.showHover(event, lconn.profiles.bizCard.bizCard.showMenu);
			if (!LCSemTagMenu.preventFocus) this.focus( ); // Set keyboard focus to hovered element (SPR#JMGE8M3QYT: Ctrl+Enter while hovering over a name displaying yellow bizcard popup box does not pop biz card.)  
		}
		catch(e)
		{
			console.log("Error in lconn.profiles.bizCard.bizCard.showHover");
			console.log(e);
		}
	},

	showMenu: function(event) {
		LCSemTagMenu.waitCursor(); // I need a server roundtrip...
		lconn.profiles.bizCard.bizCard.getTagFromServer(event);
	},

	keystrokeHandler: function(event) {
		if (event.ctrlKey && (event.keyCode == 13)) { // Ctrl + Enter
		 	if (event.preventDefault) event.preventDefault();  // cancel browser chrome events for this keystroke
			try {
				LCSemTagMenu.isAccessibleOpen = true;
			} catch(e) {
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("ERROR setting isAccessibleOpen event flag: " + e);
			}
			lconn.profiles.bizCard.bizCard.showMenu(event);	
			if (!LCSemTagMenu.getCurrentElement()) {
				var elem = lconn.core.bizCard.bizCardUtils.getLiveElementFromEvent(event);
				LCSemTagMenu.setCurrentElement(elem);
			}
		}
	},

	getSearchType: function(event) {
		indexOf.lconn.core.bizCard.bizCardUtils.getBaseURL("hcard")
	},

	_hasValidSemanticTags: function(elem) {
		var userId = this.getElementUserId(elem);
		var email = this.getElementEmail(elem);
		var dn = this.getElementDn(elem);
		var nam = this.getNameElement(elem);
		
		//if we are missing all data tags or the name tag, it's not valid
		if ((!userId && !email && !dn) || (!nam)) {
			return false;
		} else {
			return true;
		}
	},
	
	_cachedData: {},
	getTagFromServer: function(event) {
		var currElem = lconn.core.bizCard.bizCardUtils.getLiveElementFromEvent(event);
		
		var langParam = lconn.core.bizCard.bizCardUtils.getLangParam();
		var subst = {"LANG": langParam };
		
		//check if user is logged in and add value
		var isSTPRoxyUserLoggedIn = false;
		if(window.lconnAwarenessLoggedInUser){isSTPRoxyUserLoggedIn = true;}
		subst["AUTH"] = true;
		var url = null;
		var connectionId = null;
		var cbFuncName = null;

		var userId = this.getElementUserId(currElem);
		var email = this.getElementEmail(currElem);
		var dn = this.getElementDn(currElem);
				
				
				
		if ( dn ) { //first try the dn
			if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.getTagFromServer sending request for dn: " + dn);
		
			subst["DN"] = dn;
			connectionId = dn;
			url = this.servletUrlByDn2;
			cbFuncName = "lconn.profiles.bizCard.bizCard.dispatchByDn";		
		}
		
		else
		if ( email ) {  // next use email if provided 
			if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.getTagFromServer sending request for email: " + email);
		
			subst["EMAIL"] = email;
			connectionId = email;
			url = this.servletUrlByEmail2;
			cbFuncName = "lconn.profiles.bizCard.bizCard.dispatchByEmail";
		} 
		
		else 
		if ( userId ) {  //fallback to check for the id
			if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.getTagFromServer sending request for user id: " + userId);
			
			subst["USERID"] = userId;
			connectionId = userId;
			url = this.servletUrlByUserId2;	
			cbFuncName = "lconn.profiles.bizCard.bizCard.dispatchByUserId";
		}
		
		
		
		if ( connectionId != null ) {
			if (this._cachedData[connectionId]) {
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.getTagFromServer get data from cache: " + connectionId);
				this.requestReturn(true, this._cachedData[connectionId], event);
				
			} else {
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.getTagFromServer get data from server: " + connectionId);
				lconn.core.bizCard.bizCardUtils.getBizCardData(
					url, 
					subst, 
					cbFuncName, 
					this.requestor, 
					dojo.hitch(this, function(success, retval, event) {
						//TODO - figure out why IE doesn't like this
						if (!dojo.isIE) this._cachedData[connectionId] = dojo.clone(retval);
						this.requestReturn(success, retval, event);
					}),
					event, 
					connectionId
				);
			}
				
			if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.getTagFromServer sent");
		}else{
			this.noInformationProvided(currElem, event);
		}
	},
	
	noInformationProvided: function (currElem, event) {		
		lconn.profiles.bizCard.bizCard.update(null, currElem, event);
	},
	
	requestReturn: function (success, retval, event) {
		if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.requestReturn: success=" + success);
		var currElem = lconn.core.bizCard.bizCardUtils.getLiveElementFromEvent(event);
		var retval = success? lconn.profiles.bizCard.bizCard.convMethod.call(null, retval): {};   
		lconn.profiles.bizCard.bizCard.fillPersonJsonMoreFromDom(retval, currElem);
		lconn.profiles.bizCard.bizCard.update(retval, currElem, event);
	},

	fillPersonJsonMoreFromDom: function(person, currElem) {
		if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.fillPersonJsonMoreFromDom");

		if (!person.photo) {
			person.photo = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources)  + "/web/com.ibm.oneui3.styles/imageLibrary/OtherImages/People/NoPhotoPerson128.png";
		}
		if (!person.fn) {
			var nameElem = lconn.core.bizCard.bizCardUtils.findNameElementInHcard(currElem);
			if (nameElem) person.fn = lconn.core.bizCard.bizCardUtils.getTextValue(nameElem);
		}
		if (!person.email || !person.email.internet) {
			var email = this.getElementEmail(currElem);
			person.email = {"internet": email};
		}
		if (!person.tel || !person.tel.voice) {
			var telElem = lconn.core.bizCard.bizCardUtils.findElementByNameInHcard(currElem, "tel");
			if (telElem) {
				var tels = lconn.core.bizCard.bizCardUtils.getTypedValue(telElem, "voice");
				person.tel = {"voice": tels["voice"]};
			}
		}
		var addrElem = lconn.core.bizCard.bizCardUtils.findElementByNameInHcard(currElem, "adr");
		var addrJson = {};
		if (addrElem) {
			addrJson = SemTagAddr.getAddressJson(addrElem); //NEEDSWORK bad dependency
			person.adr = addrJson;
		}
	},

	// you can pass in an element to place the contents in...else it ends up in the regular container
	update: function (person, currElem, event) {
		if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Person.update");
		var messages = this.messages;

        this.currentPerson = person; // for extenders to access

		var parentVcard = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcard", currElem);
		
		if (!person) {
			
			LCSemTagMenu.defaultCursor();
			if (lconn.core.bizCard.bizCardUtils.isDebug && window.console) console.warn("Unable to find person object");
			
		} else {
			if (parentVcard && this.isInline(parentVcard)) {
				var out = new lconn.core.bizCard.bizCardUtils.out();
				lconn.profiles.bizCard.bizCardUI.getInlineMarkup(person, "ltr", out);
				
				var span = document.createElement("span");
				parentVcard.appendChild(span);
				span.innerHTML = out.buffer;

				var showCollapsed = (dojo.cookie && dojo.cookie("card.inline.expanded")?false:true);
				// REVISIT: change escape for string replace function since escape is js deprecated
				//if(showCollapsed)
					//lconn.profiles.bizCard.bizCardUI.toggleInlineCard( escape(person.fn) + "_card" );
			}
			else {
				var menuitemJsons = new Array();
				var cssSelector = "personMenuActions";
				var headerHtml = new lconn.core.bizCard.bizCardUtils.out();
				var footerHtml = new lconn.core.bizCard.bizCardUtils.out();

				// fetch Appreg extensions from v3 appregistry
				var isAppRegEnabled = lconn.core.config.services;	
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.log('Is App Registry Service Enabled: ', isAppRegEnabled.extensionRegistry);

				if (isAppRegEnabled.extensionRegistry && (isAppRegEnabled.extensionRegistry["secureUrl"] !== "" || null)) { 
					var fetchAppRegExtensions = lconn.profiles.bizCard.bizCardUI.fetchAppRegistryExtensions();
					var extensionPayloads;

					fetchAppRegExtensions.then(function(resp) {
						if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("fetchAppRegExtensions response: ", resp);
						try{
							extensionPayloads = lconn.profiles.bizCard.bizCardUI.getExtensionPayload(resp.items);
							if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("chatExtensions payload: ", extensionPayloads);
						} catch (err) {
							console.log('Failed to fetch appreg extensions: ', err);
						}
						lconn.profiles.bizCard.bizCardUI.getMenuData(person, "ltr", menuitemJsons, cssSelector, headerHtml, footerHtml, null, null, extensionPayloads);
						lconn.core.bizCard.bizCardUtils.setMenuData(event, menuitemJsons, cssSelector, lconn.core.bizCard.bizCardUtils.getMenuHeaderJson(headerHtml.buffer, -100));	
					});
				} else {
					console.debug('To enabled Profiles extensions in this environment, enabled the "extensionRegistry" service in the LotusConnections-config.xml');
					lconn.profiles.bizCard.bizCardUI.getMenuData(person, "ltr", menuitemJsons, cssSelector, headerHtml, footerHtml, null, null, null);
					lconn.core.bizCard.bizCardUtils.setMenuData(event, menuitemJsons, cssSelector, lconn.core.bizCard.bizCardUtils.getMenuHeaderJson(headerHtml.buffer, -100));	
				}
			}

			//---------------------------------------------------------------------------------
			// SAMETIME AWARENESS
			if(person != null && person.X_isActiveUser && person.X_isActiveUser == "true") {
				if(person.X_stLinks != null && person.X_stLinks!= "") {
					this.invokeSTLinks(person);			
				}
				else if (dojo.exists("lconn.core.config.services.sametimeProxy") /*lconn.core.uiextensions.areExtensionsEnabled("lc.IMAwareness")*/)
				{
					var userLoggedIn = (person.X_loggedInUserKey != null && person.X_loggedInUserKey != "");
					if(userLoggedIn) {
						if (parentVcard && this.isInline(parentVcard)) {
							lconn.profiles.sametime.sametimeProxyAwareness.scanPage();
						}
						else {
							var tempDomNode = dojo.byId(person.fn + "vcardNameElem");
							if(tempDomNode == null) tempDomNode = dojo.byId(person.uid + "vcardNameElem");
							if(tempDomNode == null) tempDomNode = dojo.byId(person.email.internet+ "vcardNameElem");
							if(tempDomNode == null) tempDomNode = dojo.byId(person.X_lconn_userid+ "vcardNameElem");
							if(tempDomNode != null) {
								var htmlContent5 = "";
								htmlContent5 += '<span class="IMAwarenessDisplayedUser">';
								htmlContent5 += '<span style="display: none;" class="renderType">Icon</span>';
								htmlContent5 += '<span style="display: none;" class="dn">'+person.dn+'</span>';
								htmlContent5 += '<span style="display: none;" class="uid">'+person.uid+'</span>';
								htmlContent5 += '<span id="IMcontent" class="IMContent"><img alt="'+messages['loadingSTStatus']+'" src="'+this.applicationContext+'/nav/common/styles/images/loading.gif">&nbsp;</span>';
								htmlContent5 += '</span> ';
			
								var newParentNode	= document.createElement("span");
								newParentNode.innerHTML = htmlContent5;
								var tempDomNodeParent = tempDomNode.parentNode;
								tempDomNodeParent.insertBefore(newParentNode.firstChild, tempDomNode);
		
								lconn.profiles.sametime.sametimeProxyAwareness.scanPage();
							}
						}
					}
				}
				else if(person.X_bizCardSTAwareness || person.X_bizCardSecureSTAwareness ) {
					this.invokeSametimeAwareness(person);
				}
			}
		}
    },
    
    invokeSTLinks: function (person) 
    {  
       if(document.cookie.match(/LtpaToken=\w*/g) != null && window.writeSTLinksApplet != null)
       {
          var element = document.getElementById(person.email.internet+"vcardNameElem"); 
          if(element == null)
             element = document.getElementById(person.X_lconn_userid+"vcardNameElem");
          
          element.innerHTML = prepareSametimeLink(person.dn, person.fn, true, 'icon:yes');
       }  
     }, 
    
    //Leverage presenceAwarenessFramework to determine what type of service provides presence for users
    invokeSametimeAwareness: function (person) {
   	 var awareness = dojo.getObject("lconn.profiles.sametime.sametimeAwareness");
   	 if (awareness)
   		 awareness.invokeSametimeAwareness(person);
    },
  
	sametimeStart: function (commandName, userid) {
		sametime_invoke(commandName, userid);
	},

	getElementEmail: function (elem) {
		var email;
		var srcVcard = lconn.core.bizCard.bizCardUtils.getConnectedElement('vcard',elem);
		if (srcVcard) {
			email = this.getHcardAttributeValue("email", srcVcard);
			email = email.internet;
		}
		else if (elem.nodeName.toLowerCase() == 'a' && elem.href.match(/^mailto:/)) {
			email = elem.href.replace(/^mailto:/,"");
		}
		return email;
	},

    getElementUserId: function(elem) {
		var userId = "";
		var srcVcard = lconn.core.bizCard.bizCardUtils.getConnectedElement('vcard',elem);
		if (srcVcard) {
			userId = this.getHcardAttributeValue("x-lconn-userid", srcVcard);
		}
		return userId;
    },

    getElementDn: function(elem) {
		var dn = "";
		var srcVcard = lconn.core.bizCard.bizCardUtils.getConnectedElement('vcard',elem);
		if (srcVcard) {
			dn = this.getHcardAttributeValue("dn", srcVcard);
			if (!dn) {
				dn = this.getHcardAttributeValue("uid", srcVcard); //sametime and portal sometimes set this to uid
			}
		}
		return dn;
    },
    
    getNameElement: function(elem) {
        if (elem.className!="vcard") elem = lconn.core.bizCard.bizCardUtils.getConnectedElement('vcard',elem);
        var nameElem = lconn.core.bizCard.bizCardUtils.getElementsByClassName("fn", elem, 1)[0];
        if (!nameElem) {
            nameElem = lconn.core.bizCard.bizCardUtils.getElementsByClassName("n", elem, 1)[0];
        }
        return nameElem;
    },
	
	/** 
		Helper method to render the bizcard programatically
		Must pass in userId, and either a callback or a target dom node
		{
			userId: <user id>,
			callbackfn: <function to callback once it is rendered>,
			domNode: <dom node to render against>,
			args: {
				isSlim: <boolean>,
				isExpandable: <boolean>,
				timeout: <milliseconds>
			}
		}
		
		Do not remove renderBizCard or renderMiniBizCard.  Used by internal typeahead and ephox editor integration
	**/
	renderBizCard: function(userId, callbackfn, domNode, args) {
		this.init();
		
		if (typeof userId !== "string") {
			if (window.console) {
				console.error("renderBizCard: arguments must contain a userId.");
			}
			return;
		}		
		if (typeof domNode !== "object" && typeof callbackfn !== "function") {
			if (window.console) {
				console.error("renderBizCard: arguments must contain either a target node or a callback function.");
			}
			return;
		}
		
		args = dojo.mixin({
			"target": domNode,
			"callback": callbackfn,
			"isSlim": false, 
			"isExpandable": true,
			"timeout": 10000
		}, args || {});
		
		var subst = {
			"USERID": userId,
			"AUTH": true,
			"LANG": lconn.core.bizCard.bizCardUtils.getLangParam()
		};		
		
		lconn.core.bizCard.bizCardUtils.getBizCardData(
			this.servletUrlByUserId2, 
			subst, 
			"lconn.profiles.bizCard.bizCard.dispatchByUserId", 
			this.requestor, 
			dojo.hitch(this, this._requestReturnBizCard),
			args, 
			userId
		);    
	},	
	
	_requestReturnBizCard: function (success, retval, args) {
		var retval = success? lconn.profiles.bizCard.bizCard.convMethod.call(null, retval): {};
		var out = new lconn.core.bizCard.bizCardUtils.out();

		lconn.profiles.bizCard.bizCardUI.getMenuData(retval, null, null, null, out, null, args.isSlim, args.isExpandable);

		if (typeof args.target === "object") {
			args.target.innerHTML = out.buffer;
		}
		
		if (typeof args.callback === "function") {
			args.callback(out.buffer);
		}
		
		if (dojo.exists("lconn.core.globalization.bidiUtil") && dojo.byId("cardDiv")) {
			lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(dojo.byId("cardDiv"));	
		}
	},
	
	renderMiniBizCard: function (userId, callbackfn, domNode) {
		this.renderBizCard(
			userId, 
			callbackfn, 
			domNode, 
			{
				"isSlim": true,
				"isExpandable": false
			}
		);
	}
	
};

})();

(function(win) {
	
	win.SemTagSvcConfig = win.SemTagSvcConfig || {};
	win.livetextCfg = win.livetextCfg || [];
	
	var profilesUrl;
	try {
		var profiles = lconn.core.config.services.profiles;
		profilesUrl = com.ibm.oneui.util.Url.secure ? profiles.secureUrl : profiles.url;
	} catch (e) {
		if (win.SemTagSvcConfig.profilesSvc) {
			profilesUrl = win.SemTagSvcConfig.profilesSvc;
		}
	}

	if (profilesUrl) {
		win.SemTagSvcConfig.baseUrl = profilesUrl;
		win.livetextCfg.push({
				id: "hcard",
				match: ".vcard",
				processEnclosedTags: false,
				tagHandler: lconn.profiles.bizCard.bizCard,
				loaded: true,
				baseURL: profilesUrl
		});
	}
})(window);
