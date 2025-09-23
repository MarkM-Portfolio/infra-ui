/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.Community"); 

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("lconn.core.xpath");
dojo.require("lconn.core.DateUtil");

dojo.require("lconn.sand.sandConsts");

dojo.declare("lconn.sand.Community", 
		[dijit._Widget, dijit._Templated],  
		{
	templateString: "", //"templateString" variable should appear before "templatePath" variable to avoid templates inclusion problems
	//templatePath: dojo.moduleUrl("lconn.sand","templates/Community.html"),
	widgetsInTemplate: true,
	
	communityUuid: null,
	people: null,
		
postCreate: function(){
	
	var handleAsType = "xml";
	var commLoadCallback = this.commLoad;
	var membersLoadCallback = this.membersLoad;
	
	if(lconn.core.xpath.isIE11()) {
		handleAsType = "text";
		commLoadCallback = this.commLoadAsTextOnIE11;
		membersLoadCallback = this.membersLoadAsTextOnIE11;
	}
	
	dojo.xhrGet({
		url: "../communities/service/atom/community/instance",
		handleAs: handleAsType,
		load: dojo.hitch(this, commLoadCallback),
		error: dojo.hitch(this, this.xhrError), 
		content: {communityUuid: this.communityUuid}
	});

	if (this.people) {
		dojo.xhrGet({
			url: "../communities/service/atom/community/members",
			handleAs: handleAsType,
			load: dojo.hitch(this, membersLoadCallback),
			error: dojo.hitch(this, this.xhrError), 
			content: {communityUuid: this.communityUuid}
		});
	} else {
		this.comNumCommon.innerHTML = "0";
	}	
},

commLoadAsTextOnIE11: function(data) {
    // the response is text, and must be turned to XML
	var dom = lconn.communities.catalog.util.loadDOMIE11(data);
    this.commLoad(dom);
},


membersLoadAsTextOnIE11: function(data) {
    // the response is text, and must be turned to XML
	var dom = lconn.communities.catalog.util.loadDOMIE11(data);
    this.membersLoad(dom);
},


commLoad: function (data) {
	this.commLink.innerHTML = lconn.core.xpath.selectSingleNode("/atom:entry/atom:title/text()", data, sandConsts.NAME_SPACES).nodeValue;
	this.commLink.href = lconn.core.xpath.selectSingleNode("/atom:entry/atom:link[@rel='alternate']/@href", data, sandConsts.NAME_SPACES).nodeValue;
	
	var commTags = lconn.core.xpath.selectNodes("/atom:entry/atom:category/@term", data, sandConsts.NAME_SPACES);
	var numTagsShown = 0;
	var tagStr = "";
	for (var i = 0; i < commTags.length && numTagsShown < 5; i++) {
		var tag = commTags[i].nodeValue;
		tagStr += "<span class='ltr'><a href='/communities/service/html/mycommunities?tag=" + tag + "'>" + tag + "</a>, </span>";
	}
	if (tagStr.length > 1) { // Remove redundant comma
		tagStr = tagStr.substring(0, tagStr.length-", </span>".length) + "</span>";
	}
	this.commonTags.innerHTML = tagStr;
	
	this.comNumMembers.appendChild(document.createTextNode(lconn.core.xpath.selectSingleNode("/atom:entry/snx:membercount/text()", data, sandConsts.NAME_SPACES).nodeValue));

	var descNode = lconn.core.xpath.selectSingleNode("/atom:entry/atom:summary/text()", data, sandConsts.NAME_SPACES);
	if (descNode) {
		this.comDescription.innerHTML = descNode.nodeValue;
	}	  

	this.comLastUpdated = lconn.core.DateUtil.AtomDateToString(lconn.core.xpath.selectSingleNode("/atom:entry/atom:updated/text()", data, sandConsts.NAME_SPACES).nodeValue);
},

membersLoad: function (data) {
	var members = lconn.core.xpath.selectNodes("/atom:feed/atom:entry/atom:contributor/snx:userid", data, sandConsts.NAME_SPACES);
	var numCommon = 0;
	for (var i = 0; i < members.length; i++) {
		numCommon += (this.people.indexOf(members[i].nodeValue) > -1) ? 1 : 0; 
	}
	this.comNumCommon = numCommon;
}
});
