/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.Evidence"); 

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojox.xml.parser");
dojo.require("lconn.sand.PersistTooltip");
dojo.require("lconn.sand.sandConsts");
						
dojo.requireLocalization("lconn.sand", "ui");

dojo.declare("lconn.sand.Evidence", 
		[dijit._Widget, dijit._Templated],  
		{
	templateString: "", //"templateString" variable should appear before "templatePath" variable to avoid templates inclusion problems
	templatePath: dojo.moduleUrl("lconn.sand","templates/Evidence.html"),
	widgetsInTemplate: true,
	_blankGif: (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif")),

	baseURL: window.location.protocol + "//" + window.location.host + applicationContext,	

	evMax: 25,

	//temp fix for beta. removing link. should be change back after beta
	//LINK_TEMPLATE : {tagA1: "<a id='%i' href='javascript:void(0);' role='link'>", tagA2: "</a>"},
	LINK_TEMPLATE : {tagA1: "", tagA2: ""},
	
	RELATIONSHIP_TEMPLATES : null, 
	
	uid: null,
	userid: null,
	targetUid: null,
	targetUserid: null,
	iContext: null,

	meLoaded: false,
	targetLoaded: false,

	twistyEvent: null,
	twistyTitleEvent: null,

	foundRels: [],
	
	isBulletedList: false,
	lcSS: null,
	
	clear: function () {
		dojo.disconnect(this.twistyTitleEvent);
		dojo.empty(this.evList);	
	},
	
	constructor: function () {
		this.lcSS = dojo.i18n.getLocalization("lconn.sand", "ui");
		this.RELATIONSHIP_TEMPLATES = [
					{relcode: "lpfr", getStr: function(isMyC, isPl){return isMyC?this.str1:this.str2;}, 
						str1: this.lcSS.sand_youCollegues, str2: this.lcSS.sand_theyCollegues, isCanBePlural:false},
					{relcode: "lm1",  getStr: function(isMyC, isPl){return isMyC?this.str1:this.str2;}, 
						str1: this.lcSS.sand_youAreTManager, str2:this.lcSS.sand_SIsTManager, isCanBePlural:false},
					{relcode: "le1",  getStr: function(isMyC, isPl){return isMyC?this.str1:this.str2;}, 
						str1: this.lcSS.sand_TIsYourManager, str2:this.lcSS.sand_TIsSManager, isCanBePlural:false},
					{relcode: "sdm",  getStr: function(isMyC, isPl){return isMyC?this.str1:this.str2;},
						str1: this.lcSS.sand_youShareDirectManager, str2: this.lcSS.sand_theyShareDirectManager, isCanBePlural:false},
					{relcode: "pt",   getStr: function(isMyC, isPl){return (isMyC ? this.str2 : this.str1);},
						str1: this.lcSS.sand_TTaggedS, str2: this.lcSS.sand_TTaggedYou, isCanBePlural:false},
					{relcode: "pbt",  getStr: function(isMyC, isPl){return (isMyC ? this.str2 : this.str1);}, 
						str1: this.lcSS.sand_STaggedT, str2: this.lcSS.sand_youTaggedT, isCanBePlural:false},
					{relcode: "acm",  getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_youShareActivity, str2: this.lcSS.sand_theyShareActivity, pluralStr1: this.lcSS.sand_youShareActivities, pluralStr2: this.lcSS.sand_theyShareActivities, isCanBePlural:true,
						specialAction: function(isMyC, c){return parseInt(c)>120?(isMyC? this.special1 : this.special2): null;}, special1: this.lcSS.sand_youShareActivities120, special2: this.lcSS.sand_theyShareActivities120},

					{relcode: "sameDepartment", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
                        str1: this.lcSS.sand_youSameDepartment, str2: this.lcSS.sand_theySameDepartment, isCanBePlural:false},

					{relcode: "wikiCoCommenting", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_youCoCommentedWiki, str2: this.lcSS.sand_theyCoCommentedWiki, pluralStr1: this.lcSS.sand_youCoCommentedWikis, pluralStr2: this.lcSS.sand_theyCoCommentedWikis, isCanBePlural:true},
						
					{relcode: "wikiCoContribution", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_youCoeditedWiki, str2: this.lcSS.sand_theyCoeditedWiki, pluralStr1: this.lcSS.sand_youCoeditedWikis, pluralStr2: this.lcSS.sand_theyCoeditedWikis, isCanBePlural:true},
					{relcode: "bpct", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_commentedOnYourBlog, str2: this.lcSS.sand_commentedOnSBlog, pluralStr1: this.lcSS.sand_commentedCTimesOnYourBlog, pluralStr2: this.lcSS.sand_commentedCTimesOnSBlog, isCanBePlural:true},

					{relcode: "bpcb", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr2:this.pluralStr1):(isMyC?this.str2:this.str1);},
						str1: this.lcSS.sand_commentedOnTBlog, str2: this.lcSS.sand_youCommentedOnTBlog, pluralStr1: this.lcSS.sand_commentedCTimesOnTBlog, pluralStr2: this.lcSS.sand_youCommentedCTimesOnTBlog, isCanBePlural:true},

					{relcode: "lpcfr",getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_youShareCollegue, str2: this.lcSS.sand_theyShareCollegue, pluralStr1: this.lcSS.sand_youShareCollegues, pluralStr2: this.lcSS.sand_theyShareCollegues, isCanBePlural:true},
					{relcode: "ccmf", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);}, 
						str1: this.lcSS.sand_youShareCommunity1, str2: this.lcSS.sand_theyShareCommunity1, pluralStr1: this.lcSS.sand_youShareCommunities1, pluralStr2: this.lcSS.sand_theyShareCommunities1, isCanBePlural:true},
					{relcode: "ccms", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_youShareCommunity2, str2: this.lcSS.sand_theyShareCommunity2, pluralStr1: this.lcSS.sand_youShareCommunities2, pluralStr2: this.lcSS.sand_theyShareCommunities2, isCanBePlural:true},
					/*
					 * OLD: {relcode: "fileSharing", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_youShareFile, str2: this.lcSS.sand_theyShareFile, pluralStr1: this.lcSS.sand_youShareFiles, pluralStr2: this.lcSS.sand_theyShareFiles, isCanBePlural:true},
					 */
					 
					/*
					 *  42206: SaND : No relationship defined for file sharing 
					 */	
					{relcode: "fileSharing", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						pluralStr1: this.lcSS.sand_youSharedFilesToT, pluralStr2: this.lcSS.sand_SSharedFilesToT, str1: this.lcSS.sand_youSharedAFileToT, str2: this.lcSS.sand_SSharedAFileToT, isCanBePlural:true},
					/*
					 *
					 */	
					{relcode: "fileShared", getStr: function(isMyC,isPl) { return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},	
						pluralStr1: this.lcSS.sand_TSharedFilesWithYou, pluralStr2: this.lcSS.sand_TSharedFilesWithS, str1:this.lcSS.sand_TSharedAFileToYou,str2:this.lcSS.sand_TSharedAFileWithS, isCanBePlural:true},
					{relcode: "fileCoSharing", getStr: function(isMyC,isPl) { return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},	
						pluralStr1: this.lcSS.sand_filesCoSharing, pluralStr2:this.lcSS.sand_SCoSharesFilesWithT, str1:this.lcSS.sand_fileCoSharing, str2:this.lcSS.sand_SCoSharesFileWithT, isCanBePlural:true},
					/*
					 *
					 */
					{relcode: "forumthreaddiscussion", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);}, 
						str1: this.lcSS.sand_youShareForumThread, str2: this.lcSS.sand_theyShareForumThread, pluralStr1: this.lcSS.sand_youShareForumThreads, pluralStr2: this.lcSS.sand_theyShareForumThreads, isCanBePlural:true},
					{relcode: "ctb",  getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_youShareBookmark, str2: this.lcSS.sand_theyShareBookmark, pluralStr1: this.lcSS.sand_youShareBookmarks, pluralStr2: this.lcSS.sand_theyShareBookmarks, isCanBePlural:true},
					{relcode: "bpcc", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);}, 
						str1: this.lcSS.sand_youBothCommentedOnSameBlogEntry, str2: this.lcSS.sand_theyBothCommentedOnSameBlogEntry, pluralStr1: this.lcSS.sand_youBothCommentedOnSameBlogEntryCTimes, pluralStr2: this.lcSS.sand_theyBothCommentedOnSameBlogEntryCTimes, isCanBePlural:true},
					{relcode: "tgw",  getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);}, 
						str1: this.lcSS.sand_youWereBothTaggedBySameTag, str2: this.lcSS.sand_theyWereBothTaggedBySameTag, pluralStr1: this.lcSS.sand_youWereBothTaggedWithTags, pluralStr2: this.lcSS.sand_theyWereBothTaggedWithTags, isCanBePlural:true},
					{relcode: "tcu",  getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);}, 
						str1: this.lcSS.sand_youBothUsedSameTag, str2: this.lcSS.sand_theyBothUsedSameTag, pluralStr1: this.lcSS.sand_youBothUsedTags, pluralStr2: this.lcSS.sand_theyBothUsedTags, isCanBePlural:true},
					{relcode: "pctg", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);}, 
						str1: this.lcSS.sand_youBothTaggedSamePerson, str2: this.lcSS.sand_theyBothTaggedSamePerson, pluralStr1: this.lcSS.sand_youBothTaggedPeople, pluralStr2: this.lcSS.sand_theyBothTaggedPeople, isCanBePlural:true},
								  
					{relcode: "tgb", getStr: function(isMyC, isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_someoneTaggedYouBoth, str2: this.lcSS.sand_someoneTaggedThemBoth, pluralStr1: this.lcSS.sand_thereArePeopleThatTaggedYouBoth, pluralStr2: this.lcSS.sand_thereArePeopleThatTaggedThemBoth, isCanBePlural:true},
					/*
					 *
					 */	
					{relcode: "statusUpdatesCoCommenting", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
			                        str1: this.lcSS.sand_YouCommentedOnTheSamePost, str2: this.lcSS.sand_TheyCommentedOnTheSamePost,pluralStr1: this.lcSS.sand_YouCommentedOnTheSamePosts, pluralStr2: this.lcSS.sand_TheyCommentedOnTheSamePosts, isCanBePlural:true},												
					{relcode: "statusUpdatesCommentedBy", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
			                        str1: this.lcSS.sand_YouCommentedOnTPost , str2: this.lcSS.sand_SCommentedOnTPost, pluralStr1: this.lcSS.sand_YouCommentedOnTPosts, pluralStr2: this.lcSS.sand_SCommentedOnTPosts, isCanBePlural:true},

					{relcode: "statusUpdatesCommentedTo", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
			                        str1: this.lcSS.sand_TCommentedOnYourPost, str2: this.lcSS.sand_TCommentedOnSPost, pluralStr1:  this.lcSS.sand_TCommentedOnYourPosts, pluralStr2: this.lcSS.sand_TCommentedOnSPosts, isCanBePlural:true},
					{relcode: "statusUpdatesOwnerCommentedBy", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1:this.lcSS.sand_YouCommentedOnPostOnTBoard, str2:this.lcSS.sand_SCommentedOnPostOnTBoard,pluralStr1:this.lcSS.sand_YouCommentedOnPostsOnTBoard,pluralStr2:this.lcSS.sand_SCommentedOnPostsOnTBoard,isCanBePlural:true},
					{relcode: "statusUpdatesOwnerCommentedTo", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_TCommentedOnPostOnYourBoard, str2: this.lcSS.sand_SCommentedOnPostOnTBoard, pluralStr1: this.lcSS.sand_TCommentedOnPostsOnYourBoard, pluralStr2: this.lcSS.sand_TCommentedOnPostsOnSBoard, isCanBePlural:true},
					{relcode: "statusUpdatesOwnerPostedBy", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_YouWroteOnTBoard, str2: this.lcSS.sand_SWroteOnTBoard, pluralStr1: this.lcSS.sand_YouWroteOnTBoard, pluralStr2:  this.lcSS.sand_SWroteOnTBoard, isCanBePlural:true},
					{relcode: "statusUpdatesOwnerPostedTo", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
			                        str1: this.lcSS.sand_TWroteOnYourBoard, str2: this.lcSS.sand_TWroteOnSBoard, pluralStr1: this.lcSS.sand_YouWroteOnTBoard, pluralStr2: this.lcSS.sand_TWroteOnSBoard, isCanBePlural:true},
					/*
					 *
					 */		
					{relcode: "fileAuthorEditedBy",  getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
						str1: this.lcSS.sand_YouEditedTFile, str2: this.lcSS.sand_SEditedTFile, pluralStr1:this.lcSS.sand_YouEditedTFiles, pluralStr2:this.lcSS.sand_SEditedTFiles, isCanBePlural:true},
					{relcode: "fileEditorAuthoredBy", getStr: function(isMyC,isPl){return isPl?(isMyC?this.pluralStr1:this.pluralStr2):(isMyC?this.str1:this.str2);},
                       str1: this.lcSS.sand_TEditedYourFile, str2: this.lcSS.sand_TModifiedSFile, pluralStr1:this.lcSS.sand_TEditedYourFiles, pluralStr2:this.lcSS.sand_TModifiedSFiles, isCanBePlural:true}
			];

		for (var i=0; i<this.RELATIONSHIP_TEMPLATES.length; i++) {
			if (this.RELATIONSHIP_TEMPLATES[i].str1) {this.RELATIONSHIP_TEMPLATES[i].str1 = dojo.string.substitute(this.RELATIONSHIP_TEMPLATES[i].str1, this.LINK_TEMPLATE);}
			if (this.RELATIONSHIP_TEMPLATES[i].str2) {this.RELATIONSHIP_TEMPLATES[i].str2 = dojo.string.substitute(this.RELATIONSHIP_TEMPLATES[i].str2, this.LINK_TEMPLATE);}
			if (this.RELATIONSHIP_TEMPLATES[i].pluralStr1) {this.RELATIONSHIP_TEMPLATES[i].pluralStr1 = dojo.string.substitute(this.RELATIONSHIP_TEMPLATES[i].pluralStr1, this.LINK_TEMPLATE);}
			if (this.RELATIONSHIP_TEMPLATES[i].pluralStr2) {this.RELATIONSHIP_TEMPLATES[i].pluralStr2 = dojo.string.substitute(this.RELATIONSHIP_TEMPLATES[i].pluralStr2, this.LINK_TEMPLATE);}
			if (this.RELATIONSHIP_TEMPLATES[i].special1) {this.RELATIONSHIP_TEMPLATES[i].special1 = dojo.string.substitute(this.RELATIONSHIP_TEMPLATES[i].special1, this.LINK_TEMPLATE);}
			if (this.RELATIONSHIP_TEMPLATES[i].special2) {this.RELATIONSHIP_TEMPLATES[i].special2 = dojo.string.substitute(this.RELATIONSHIP_TEMPLATES[i].special2, this.LINK_TEMPLATE);}
		}
	},

	_setNodeText: function(node, txt) {
		dojo.place(document.createTextNode(txt), node, "only");	
	},
	
	populate: function(evSrcId, evTargetId, evSrcName, evTargetName, curPerson, sonarData, isMyConnection, showTitle, client, iContext){
		this.iContext = iContext;
		this.clear();
		
		if (showTitle) {
			dojo.style(this.evAreaTitle,"display","");
			this.twistyTitleEvent = dojo.connect(this.evAreaTitle, "onclick", 
												 this, "toggleEvidence");
			
			this._setNodeText(this.evidenceTitle, dojo.string.substitute( this.lcSS.sand_howAreConnected, [evSrcName, evTargetName]));
			dojo.attr(this.twisty,"title",this.lcSS.sand_ExpandSection);
			
		} else {
			dojo.style(this.evAreaTitle,"display","none");
			dojo.style(this.evSubArea,"display","");
		}
		
		var r, s, t;
		var idprefix="sp-";
		var prefix = "";
		if (isMyConnection) {
			// r = "You";
			// s = "You";
			r = this.lcSS.sand_You;
			s = this.lcSS.sand_You;
			t = evTargetName;
			idprefix += "1-"
		} else {
		   prefix="../../ibmss:association_evidence[@to='"+evTargetId+"']/";
			// r = "They";
			r = this.lcSS.sand_they;
			s = evSrcName;
			t = evTargetName;
			idprefix += "2-"
		}	
	
		var arrRel = []; //this will hold an array of evidence items to display
		
		for (var i=0; i < this.RELATIONSHIP_TEMPLATES.length; i++) {
			var template = this.RELATIONSHIP_TEMPLATES[i];
			var rel = lconn.core.xpath.selectSingleNode("./ibmss:association_evidence[@type='"+template.relcode+"'][@from='"+evSrcId+"']", sonarData, sandConsts.NAME_SPACES, curPerson.obj);
			if (rel) {
				this.foundRels.push(template.relcode);

				var count = lconn.core.xpath.selectSingleNode("@count", sonarData, sandConsts.NAME_SPACES, rel).nodeValue;
				var isCanBePlural = template.isCanBePlural;
				var relStr = template.getStr(isMyConnection, false); // take nonPlural string

				if (isCanBePlural) {
					var pluralStr = template.getStr(isMyConnection, true);
					if (count != "1") {
						relStr = this.replaceMicro(pluralStr, "c", count);
					} 
				}

				if (template.specialAction && dojo.isFunction(template.specialAction)) {
					var tempStr = template.specialAction(isMyConnection, count);
					if (tempStr) relStr = tempStr;
				}
				
				relStr = this.replaceMicro(relStr, "i", idprefix + template.relcode);
				relStr = this.replaceMicro(relStr, "s", s, isMyConnection);
				relStr = this.replaceMicro(relStr, "t", t);
				
				//add this item to be displayed
				arrRel.push(relStr);
				
			}
		}
		
		//if we have at least one item to display, setup the container node
		if (arrRel.length > 0) {
			var baseNode;
			if (this.isBulletedList) {
				baseNode = dojo.create("ul");
				dojo.place(baseNode, this.evList, "only");
			} else {
				baseNode = this.evList;
			}
			for (var i = 0; i < arrRel.length; i++) {
				var listNode;
				if (this.isBulletedList) {
					listNode = dojo.create("li");
				} else {
					listNode = dojo.create("div");
				}
				this._setNodeText(listNode, arrRel[i]);
				dojo.place(listNode, baseNode, "last");
			}
		}
	},

	replaceMicro: function (str, rep, sub, handleCaps) {
		var ind = str.indexOf("%" + rep);
		if (ind > -1) {
			if (handleCaps && ind > 0) {
				sub = sub.substring(0, 1).toLowerCase() + sub.substring(1);
			}
			return str.substring(0, ind) + sub + str.substring(ind+2);
		} else {
			return str;
		} 	
	},
	
	toggleEvidence: function () {
		if (dojo.hasClass(this.twistyImg, "lotusTwistyClosed")) {
			dojo.style(this.evSubArea,"display","");
			dojo.removeClass(this.twistyImg, "lotusTwistyClosed");
			dojo.addClass(this.twistyImg, "lotusTwistyOpen");
			dojo.attr(this.twisty, "aria-expanded", "true");
			dojo.attr(this.twistySymbol, "innerHTML", "v");
			dojo.attr(this.twisty, "title", this.lcSS.sand_CollapseSection);
		} else {
			dojo.style(this.evSubArea,"display","none");		
			dojo.removeClass(this.twistyImg, "lotusTwistyOpen");
			dojo.addClass(this.twistyImg, "lotusTwistyClosed");
			dojo.attr(this.twisty, "aria-expanded", "false");
			dojo.attr(this.twistySymbol, "innerHTML", "&gt;");
			dojo.attr(this.twisty, "title", this.lcSS.sand_ExpandSection);
		}	
	},

});
