/* Copyright IBM Corp. 2001, 2016  All Rights Reserved.              */
dojo.provide("lconn.communities.bizCard.bizCard");

dojo.require("lconn.core.bizCard.bizCardUtils");
dojo.require("lconn.communities.bizCard.bizCardUI");
dojo.require("lconn.communities.bizCard.newRelicTracker");

ic_comm_communityUuid = "";
ic_comm_communityName = "";
ic_comm_communityType = "";
ic_comm_communitiesSvcRef = "";

lconn.communities.bizCard.bizCard = 
{
	messages: {},
	servletUrl: null,
	requestor: null,
	initited: false,
	
	init: function () {
		this.servletUrl = lconn.core.bizCard.bizCardUtils.getBaseURL("hgroup") + "/service/json/communityview?communityUuid=@@@UUID@@@";
		if(this.initited == false)
		{
			dojo.requireLocalization("lconn.communities.bizCard", "ui");
			this.messages = dojo.i18n.getLocalization("lconn.communities.bizCard", "ui");
			
			this.requestor = new LCSemTagUtil.crossDomainRequest();
			
			if (dojo.exists("lconn.bizCard.publish")) {
				lconn.bizCard.publish("lconn/bizCard/communities/init", this);
			}
			
			this.initited = true;
		}
	},	
	
	updateGlobalVars: function(community) {
		
		ic_comm_communityUuid = community.uuid;
		ic_comm_communityName = community.name;
		ic_comm_communityType = community.communityType;
		ic_comm_communitiesSvcRef = lconn.core.bizCard.bizCardUtils.getBaseURL("hgroup");
	},

	
	getIdMethod: function (retval) {
		return retval.uuid?retval.uuid:null;
	},
	convMethod: function (retval) {
		return retval;
	},

	customTrim: function(value)
	{
		return value.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	
	//This an API that is used by Lotus Mashup LiveText framework and the portal team
	processTag: function(vcommDomNode)
	{
		try
		{
			if(!this.initited)
			{
				lconn.core.bizCard.bizCardUtils.init();
				LCSemTagMenu.init();
				this.init();
			}
			/* Replaced with direct localization mechanism
			if (window.lc_combizcard == null)
			{
				lconn.core.bizCard.bizCardUtils.loadScript(lconn.core.bizCard.bizCardUtils.getBaseURL("hgroup") + '/resourceStrings.do?p=1');
				lconn.core.utilities.processUntilAvailable(dojo.hitch(this,this.processHcard), "window.lc_combizcard != null",	vcommDomNode, false);
			}
			else*/
			this.processHcard(vcommDomNode);
		}
		catch(e)
		{
			console.log(e);
		}
	},
	
	processHcard: function(hcard) 
	{
    	var nameElem = this.getNameElement(hcard);
	    if (!nameElem) return;
	
		if (this.isInline(hcard)) {
			var event = {"target": nameElem}; // I need an event
			this.getTagFromServer(event);
		}
		else {
			lconn.core.bizCard.bizCardUtils.addHover(nameElem, lconn.communities.bizCard.bizCard.showHover, lconn.communities.bizCard.bizCard.showMenu);
		}
		nameElem.setAttribute("aria-label", this.messages["label.semtag.hover.altA11Y"]);			
	},
	
	isInline: function (hcard) {
		return this.getHcardAttributeValue("X-community-display-inline", hcard);
	},
		
	loadHcardCommunity: function (srcElement) {
		var community = new Object();
		var parentVcomm = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcomm", srcElement);
		var vcommElems = parentVcomm.getElementsByTagName("*");
		for (i=0; i<vcommElems.length; i++) {
			var curElem = vcommElems[i];
			if (curElem.className) {
				var classes = curElem.className.split(' ');
				for (j=0; j<classes.length; j++) {
					var c = classes[j];
					var attr = this.getHcardAttributeValue(c, parentVcomm);
					if (attr) community[c] = attr;
				}
			}
		}
		return community;
		
	},

	getHcardAttributeValue: function (hcardAttr, srcElement) {
		switch(hcardAttr) {
			case("name"):
				return this.getHcardTypedAttribute(srcElement, hcardAttr, "name");
			case("uuid"):
				return this.getHcardTypedAttribute(srcElement, hcardAttr, "uuid");
			case("selectedWidgetId"):
				return this.getHcardTypedAttribute(srcElement, hcardAttr, "selectedWidgetId");
		}
		var parentVcomm = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcomm", srcElement);
		var elems = lconn.core.bizCard.bizCardUtils.getElementsByClassName(hcardAttr, parentVcomm, 1);
		if (elems.length > 0 && elems[0].tagName.match(/^abbr$/i)) return elems[0].getAttribute("title");
		switch (hcardAttr) {
			case("uuid"):
				var uuid = lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(elems[0]);
				if (uuid) return uuid;
				else return this.getHcardAttributeValue("name", srcElement); // no uuid, parse for name
				break;
			case("name"):
				var name = lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(elems[0]);
				if (name) return name;
				break;
			case("selectedWidgetId"):
				var selectedWidgetId = lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(elems[0]);
				if (selectedWidgetId) return selectedWidgetId;
				break;
			case("X-community-display-inline"):
				if (elems.length > 0) return true;
				else return false;
			default:
				return lconn.core.bizCard.bizCardUtils.getSinglePropertyValue(elems[0]);
			break;
		}
	},

	getHcardTypedAttribute: function(srcElement, hcardAttr, defSubProp) {
		var returnElem = new Object();
		var parentVcomm = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcomm", srcElement);
		var typedElems = lconn.core.bizCard.bizCardUtils.getElementsByClassName(hcardAttr, parentVcomm);
		// this means there are multiple email, adr, or tel elements
		for (i=0; i<typedElems.length; i++) {
			var curElem = typedElems[i];
			returnElem = lconn.core.bizCard.bizCardUtils.getTypedValue(curElem, defSubProp);
		}
		return returnElem;
	},

	showHover: function(event) {
		try{
			lconn.core.bizCard.bizCardUtils.showHover(event, lconn.communities.bizCard.bizCard.showMenu);
			if(!LCSemTagMenu.preventFocus) this.focus( ); // Set keyboard focus to hovered element (SPR#JMGE8M3QYT: Ctrl+Enter while hovering over a name displaying yellow bizcard popup box does not pop biz card.)  
		}
		catch(e)
		{
			console.log("Error in lconn.communities.bizCard.bizCard.showHover");
			console.log(e);
		}
	},

	showMenu: function(event) {
		LCSemTagMenu.waitCursor();
		lconn.communities.bizCard.bizCard.getTagFromServer(event);
	},

	getTagFromServer: function(event) {
		
		var temp1 = null;
		var event2 = null;
			
		if(event != null && event.target != null && event.target.className == "name")
		{
			temp1 = event.target;
			event2 = event;
			LCSemTagMenu.currentElem = temp1;
		}
		else
		{
			temp1 = LCSemTagMenu.currentElem;//lconn.core.bizCard.bizCardUtils.getLiveElementFromEvent(event);
			event2 = {target: temp1, original: event};
			if(temp1 == null && event != null)
			{
				event2 = event;
				temp1 = event.target;
			}
		}
		var communityUuid = this.customTrim(this.getElementUuid(temp1));
//		var src = this.servletUrl.replace(/@@@UUID@@@/, communityUuid);
//		this.requestor.request(src, 6000, this.requestReturn, event2, communityUuid);

		var subst = {"UUID": communityUuid };
		var cbFuncName = "lconn.communities.bizCard.bizCard.dispatch";
		var connectionId = communityUuid;
		
		if (lconn.core.bizCard.bizCardUtils.isDebug) window.status = "Community.getTagFromServer sending request for: " + communityUuid + ")";

		lconn.core.bizCard.bizCardUtils.getBizCardData(
						this.servletUrl + "&preventCache="+new Date().getTime(), subst, cbFuncName, 
						this.requestor, this.requestReturn, event2, connectionId);
	},
	
	requestReturn: function (success, retval, event) {	     
	   if(success == false)
	   {
         console.log("lconn.communities.bizCard.bizCard.requestReturn: Error occurring while rendering the community bizcard");
         console.log("lconn.communities.bizCard.bizCard.requestReturn: Error Details: " + retval);
	   }
	   else
	   {
   		if (lconn.core.bizCard.bizCardUtils.isDebug) window.status = "Community.requestReturn: success=" + success;
   		var community = success? lconn.communities.bizCard.bizCard.convMethod(retval): {};
   		var currElem = lconn.core.bizCard.bizCardUtils.getLiveElementFromEvent(event);
   		lconn.communities.bizCard.bizCard.fillCommunityJsonMoreFromDom(community, currElem);
         lconn.communities.bizCard.bizCard.update(community, currElem, event);
	   }
	},

	fillCommunityJsonMoreFromDom: function(community, currElem) {
		if (lconn.core.bizCard.bizCardUtils.isDebug) window.status = "Community.fillCommunityJsonMoreFromDom";

		if (!community.name) {
			var nameElem = lconn.core.bizCard.bizCardUtils.findNameElementInHcard(currElem);
			if (nameElem) community.name = lconn.core.bizCard.bizCardUtils.getTextValue(nameElem);
		}
		if (!community.uuid) {
			var uuid = this.getElementUuid(currElem);
			community.uuid = uuid;
		}
	},

	// you can pass in an element to place the contents in...else it ends up in the regular container
	update: function (community, currElem, event) {
		if (lconn.core.bizCard.bizCardUtils.isDebug) window.status = "Community.update";
		
        this.currentCommunity = community; // for extenders to access

		// SPR #KRED8M7K67 - community toc pane intermitten on/off
		// var parentVcomm = lconn.core.bizCard.bizCardUtils.getParentByClassName("vcomm", currElem);
        var parentVcomm = null;
        dojo.query(".vcomm").forEach( function(node){ parentVcomm = node; });
		
		if (parentVcomm && this.isInline(parentVcomm)) {
			var out = new lconn.core.bizCard.bizCardUtils.out();
			var selectedWidgetId = this.getHcardAttributeValue("selectedWidgetId", parentVcomm).selectedWidgetId;
			lconn.communities.bizCard.bizCardUI.getInlineMarkup(community, "ltr", out, selectedWidgetId);
			var prev = lconn.core.bizCard.bizCardUtils.getElementsByClassName('personinlinemenu', parentVcomm, 1);
			if (prev.length > 0) {
				prev[0].innerHTML = out.buffer;
			}
			else {
				var span = document.createElement("span"); // inline card does not exist; create element and append it to vcomm classed element
				span.className = "personinlinemenu";
				span.innerHTML = out.buffer;
				try {
					parentVcomm.appendChild(span);
				} catch(e) {
					console.log("Error: attempt place inline bizcard menu under vcomm classed element failed.  parentVcomm=["+parentVcomm+"]");
					console.log(e);
				}
			}
			if (dojo.exists("lconn.core.WidgetPlacement")) {
				new lconn.core.WidgetPlacement.aria.Toolbar("bizCardNav");
			}
			lconn.communities.bizCard.bizCardUI.addCommunityActionsMenu(community);
			
					 // If new relic tracking is enabled - trigger actions for left nav clicks
			if (lconn.communities.bizCard.core.community.enableNewRelicTracking == true) {
				var leftNavParent = dojo.byId("bizCardNavMenu");
				if (leftNavParent != null) {
					// clickHandler is called when user clicks on left nav - records results to tracker
					//
					var clickHandler = function(communityUuid, userUuid) {
						var widgetDefId = dojo.attr(this, "widgetdefid");
						if (widgetDefId == null) {
							widgetDefId = this.textContent;
						}
						lconn.communities.bizCard.newRelicTracker.navAction(communityUuid,userUuid, widgetDefId, this.id);
						return false;
					};
					dojo.query("li", leftNavParent).forEach(function(node) {
						dojo.connect(node, "onclick", null, dojo.partial(clickHandler, lconn.communities.bizCard.core.community.uuid, lconn.communities.bizCard.core.community.userUuid));
					});
				}
			}
		}
		else {
        	var menuitemJsons = new Array();
        	var cssSelector = "personMenuActions";
			var headerHtml = new lconn.core.bizCard.bizCardUtils.out();
			var footerHtml = new lconn.core.bizCard.bizCardUtils.out();

			lconn.communities.bizCard.bizCardUI.getMenuData(community, "ltr", menuitemJsons, cssSelector, headerHtml, footerHtml);

			lconn.core.bizCard.bizCardUtils.setMenuData(event, menuitemJsons, cssSelector, lconn.core.bizCard.bizCardUtils.getMenuHeaderJson(headerHtml.buffer, -100));
		}
		
		this.updateGlobalVars(community);
    },
	
	dispatch: function (data) {
		var reqid = this.getIdMethod(data);
		this.requestor.dispatch(reqid, data);
	},
	
	getElementUuid: function (elem) {
		var uuid;
		var srcVcomm = lconn.core.bizCard.bizCardUtils.getParentByClassName('vcomm',elem);
		if (srcVcomm != null) {
			uuid = this.getHcardAttributeValue("uuid", srcVcomm);
			uuid = uuid.uuid;
		}
		return uuid;
	},

    getNameElement: function(elem) {
        if (elem.className!="vcomm") elem = lconn.core.bizCard.bizCardUtils.getParentByClassName('vcomm',elem);
        var nameElem = lconn.core.bizCard.bizCardUtils.getElementsByClassName("name", elem, 1)[0];
        return nameElem;
    }
};

(function(win) {
	
	win.SemTagSvcConfig = win.SemTagSvcConfig || {};
	win.livetextCfg = win.livetextCfg || [];
	
	var communitiesUrl;
	try {
		/*var communities = lconn.core.config.services.communities;
		communitiesUrl = com.ibm.oneui.util.Url.secure ? communities.secureUrl : communities.url;*/
		var communities = lconn.core.url.getServiceUrl(lconn.core.config.services.communities);
		communitiesUrl = communities.uri;
		
	} catch (e) {
		if (win.SemTagSvcConfig.communitiesSvc) {
			communitiesUrl = win.SemTagSvcConfig.communitiesSvc;
		}
	}

	if (communitiesUrl) {
		win.SemTagSvcConfig.baseUrl = communitiesUrl;
		win.livetextCfg.push({
			"id": "hgroup",
			"match": ".vcomm",
			"tagHandler": lconn.communities.bizCard.bizCard,
			"loaded": true,
			"baseURL": communitiesUrl
		});
	}
}(window));
