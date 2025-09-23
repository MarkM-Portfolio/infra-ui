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

dojo.provide("lconn.sand.socialPath"); 

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");

dojo.require("dijit.form.Button");

dojo.require("lconn.sand.Evidence");
dojo.require("lconn.sand.sandConsts");

dojo.requireLocalization("lconn.sand", "ui");

/**
 * Who Connects Us widget
 */
dojo.declare("lconn.sand.socialPath", [dijit._Widget, dijit._Templated], {
	
	_blankGif: dojo.config.blankGif,
    templatePath: dojo.moduleUrl("lconn.sand","templates/socialPath.html"),
	
	CLIENT: "lconn.sand.socialPath", 
	
	userid: null,
	targetUserid: null,
	
	meLoaded: false,
	targetLoaded: false,
	
	iContext: null,
	lcSandStrings: null,
	
	postMixInProperties: function(){
		this.lcSandStrings = dojo.i18n.getLocalization("lconn.sand", "ui");
	},
	
	postCreate: function(){
		this._evidence1 = new lconn.sand.Evidence({},this._evidence1);
		this._evidence2 = new lconn.sand.Evidence({},this._evidence2);
	},
	
	_setNodeText: function(node, txt) {
		dojo.place(document.createTextNode(txt), node, "only");	
	},
	
	populate: function(){

		this._setNodeText(this.msgPersonSelf, this.lcSandStrings.sand_You);
	
		this._setNodeText(this.personInNetwork, dojo.string.substitute(this.lcSandStrings.sand_personIsInYourNetwork, {person: profilesData.displayedUser.displayName}));
	
		var attributesItemSet = this.iContext.getiWidgetAttributes();
		this.sandBackEndRoot = this.iContext.io.rewriteURI(attributesItemSet.getItemValue("sandBackEndRoot"));
	
		var sandURL = (this.sandBackEndRoot + "/atom/social/graph/path?maxLength=2&target={\"type\":\"personUserID\",\"id\":\"" + this.targetUserid + "\"}" ) ;

		this._setNodeText(this.target, profilesData.displayedUser.displayName);
		if (window.profilesData != null && window.profilesData.displayedUser
				&& window.profilesData.displayedUser.inNetwork) {
			this.loadingContainer.style.display = "none";
			this.pathContainer.style.display = "block";
			this.spCenterSection.style.display = "none";
			this.evidenceContainer.style.display = "none";
			this.personInNetwork.style.display = "block";
			dojo.attr(this.youAreConnectedToPerson, "alt", dojo.string.substitute(this.lcSandStrings.sand_YouAreConnectedToPerson, {person: profilesData.displayedUser.displayName}));
		} else {
			dojo.xhrGet({
				url: sandURL,
				handleAs: "text",
				htmlContainerElemId: this.iContext.getElementById("_"+this.iContext.widgetId+"_root"),
				load: dojo.hitch(this, this._load),
				error: dojo.hitch(this, this._xhrError)
			});
		}
	
	},
	
	_showEvidence: function () {
		try{
			var curPerson = this.imageStream.getCurrentItem();
			var you = this.lcSandStrings.sand_you;
			// Additional check when profilesData isn't defined:
			// Hide person if people directly connected.
			if (curPerson.uid == this.targetUserid) {
				this.spCenterSection.style.display = "none";
				this.evidenceContainer.style.display = "none";
			} else {
				this._evidence1.isBulletedList = true;
				this._evidence1.populate(this.userid, curPerson.uid, you, curPerson.name, curPerson, this.sonarData, true, true, this.CLIENT, this.iContext);
				this._evidence2.isBulletedList = true;
				this._evidence2.populate(curPerson.uid, this.targetUserid, curPerson.name, profilesData.displayedUser.displayName, curPerson, this.sonarData, false, true, this.CLIENT, this.iContext);
			}
		}
		catch(error1)
		{
			console.log(error1);
		}
	
	},
	
	areFriends: function (data) {
		// check if the first <path> returned in feed has You-[target person] path structure.
	
		var paths =  lconn.core.xpath.selectNodes("/atom:feed/atom:entry/atom:author/snx:userid[text()=\""+this.targetUserid + "\"]",data,sandConsts.NAME_SPACES);
		return (paths && paths.length > 0);
	},
	
	noConnection: function (data) {
		var paths =  lconn.core.xpath.selectNodes("/atom:feed/atom:entry/atom:author/snx:userid[text()=\""+this.targetUserid + "\"]",data,sandConsts.NAME_SPACES);
		return (paths && paths.length ==  0);	
	},
	
	showMessage: function (msgHTML) {
	
		this.msgContainer.innerHTML = msgHTML;
	
		// hide paths since there is no you-x-target path.
		this.pathContainer.style.display = 'none';
	},
	
	hide: function () {
		dojo.byId("socialPathSection").style.display = "none";   
	},
	
	_load: function (data,ioArgs) {
		var tmpStr = data;
		
		data = lconn.core.xslt.loadXmlString(data);
		
		if(lconn.core.xpath.isIE11()) {
			data = lconn.core.xpath.loadDOMIE11(tmpStr);
		}
	
		var paths =  lconn.core.xpath.selectNodes("/atom:feed/atom:entry/ibmss:entity_evidence",data,sandConsts.NAME_SPACES);
		this.loadingContainer.style.display = "none";
	
		if (paths == null || paths.length == 0) {
			this._setNodeText(this.msgContainer, dojo.string.substitute(this.lcSandStrings.sand_noSocialPath, {person: profilesData.displayedUser.displayName}));
			return;
		}
	
		this.sonarData = data;
	
		var people = [];
		for (var i=0; paths != null && paths.length != 0 && i < paths.length; i++) {
			var person = {
				uid: "",
				name: ""
			};
			var path = paths[i];
			person.obj = path; // Used for showing the evidence
			try {
				person.uid = lconn.core.xpath.selectSingleNode("atom:author/snx:userid/text()", data, sandConsts.NAME_SPACES, path).nodeValue;
				person.name = lconn.core.xpath.selectSingleNode("atom:author/atom:name/text()", data, sandConsts.NAME_SPACES, path).nodeValue;
			} catch (e1) {
				if (window.console) {
					console.warn("Error retrieving evidence name for user '" + person.uid + "' in socialPath widget");
				}
			}
			if (person.uid && person.uid != this.targetUserid)
				people.push(person);             
		}
	
		if (people.length != 0) {
			dojo.style(this.pathContainer,"display","block");
			
			if (this.imageStream instanceof lconn.sand.ImageStream){
				this.imageStream.data = people;
				this.imageStream.postCreate();
			} else {
				this.imageStream = new lconn.sand.ImageStream({
					data: people,
					onNext: dojo.hitch(this,"_selectedPersonUpdated"),
					onPrevious: dojo.hitch(this,"_selectedPersonUpdated")
				}, this.imageStream);
			}
			
			this._selectedPersonUpdated();
		} else {
			this._setNodeText(this.msgContainer, dojo.string.substitute(this.lcSandStrings.sand_noSocialPath, {person: profilesData.displayedUser.displayName}));
		}
	},
	
	_selectedPersonUpdated: function(){
		this._updateAssociationLabels();
		this._showEvidence();
	},
	
	_updateAssociationLabels: function(){
		var currentItem = this.imageStream.getCurrentItem();
		if (currentItem){
			var personInCommon = currentItem.name;
			var targetPerson = profilesData.displayedUser.displayName;
			var youAreConnectedToPersonString = dojo.string.substitute(this.lcSandStrings.sand_YouAreConnectedToPerson, {person: personInCommon});
			var personIsConnectedToTargetString = dojo.string.substitute(this.lcSandStrings.sand_PersonIsConnectedToTarget, {person: personInCommon, target: targetPerson});
			dojo.attr(this.youAreConnectedToPerson,"aria-label",youAreConnectedToPersonString);
			dojo.attr(this.personIsConnectedToTarget,"aria-label",personIsConnectedToTargetString);
			dojo.attr(this.youAreConnectedToPerson,"alt",youAreConnectedToPersonString);
			dojo.attr(this.personIsConnectedToTarget,"alt",personIsConnectedToTargetString);
		}
	},
	
	_xhrError: function (data, ioArgs) {
		
		if (data && data.status === 503){
			dojo.style(this.loadingContainer, "display", "none");
			this.showMessage(this.lcSandStrings.socialPathUnavailable);
			return;
		}
		
		lconn.core.errorhandling.DefaultXHRErrorHandler(data, ioArgs);
	}

});
