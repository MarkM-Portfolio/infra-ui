/* ***************************************************************** */
/*                                                                   */
/* Licensed Materials - Property of HCL                              */
/*                                                                   */
/* Copyright HCL Technologies Limited 2010, 2022                     */
/*                                                                   */
/* US Government Users Restricted Rights                             */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.sand.DYKProfiles");

dojo.require("dojo.string");
dojo.require("dojo.date.locale");
dojo.require("dojo.cookie");
dojo.require("dojo.number");
dojo.require("dojox.date.posix");
dojo.require("dojox.xml.parser");
dojo.require("dojo._base.html");
dojo.require("com.ibm.oneui.util.proxy");
dojo.require("lconn.core.xslt");
dojo.require("lconn.core.util._XSLCache");
dojo.require("lconn.profiles.invite.Invite");
dojo.require("lconn.sand.ImageStream");
dojo.require("lconn.core.globalization.bidiUtil");

dojo.requireLocalization("lconn.sand", "ui");
dojo.requireLocalization("lconn.sand", "DoYouKnowWidget");

var bidiUtil = lconn.core.globalization.bidiUtil;

dojo.declare("lconn.sand.DYKProfiles",[dijit._Widget, dijit._Templated, dijit._Container], {
		_blankIcon: dojo.config.blankGif,
		_resourceBundle: null,
		// nodes
		widgetTitle: "",
		inviteTitle: "",
		sendAction: "",
		cancelAction: "",
		connectString: "",
		remove: "",
		prev: "",
		next: "",
		noDYKEntry1: "",
		loading: "",
		templatePath: dojo.moduleUrl("lconn.sand", "templates/DYKProfiles.html"),		
		feedbackUrl: "",
		remoteUrl: "",
		profilesRoot: "",
		currentData:null,
		currentUserId: null,
		inviteErrorHandler: null,
		inviteXHRErrorHandler: null,
		lastMod: "",
		profilesQueryUrl : "",
		_xslCache: new (dojo.declare("", [lconn.core.util._XSLCache], {
			xslStrings: {
				"doYouKnow.xsl": {templatePath : dojo.moduleUrl("lconn.sand","xslt/doYouKnow.xsl")}
			} 		
		})),	

		postMixInProperties: function(){
			this._resourceBundle = dojo.i18n.getLocalization("lconn.sand", "ui");
			this.widgetTitle=this._resourceBundle.DYK_TITLE;
			this.noDYKEntry1=this._resourceBundle.NDYK1;
			this.loading=this._resourceBundle.LOADING;
			this.inviteTitle=this._resourceBundle.INVITE_TITLE;
			this.cancelAction=this._resourceBundle.CANCEL_ACTION;
			this.sendAction=this._resourceBundle.SEND_ACTION;
			this.connectString=this._resourceBundle.CONNECT_TO;
			this.prev=this._resourceBundle.PREV;
			this.next=this._resourceBundle.NEXT;
			this.remove=this._resourceBundle.DYKRemove;
			
			if(this.remoteUrl=="") {
				this.remoteUrl = "/search/atomfba/social/graph/list";
			}
			if(this.feedbackUrl=="") {
				this.feedbackUrl="/search/api/feedback";
			}
			if (this.profilesQueryUrl==""){
				if (dojo.exists("lconn.core.url") && dojo.exists("lconn.core.config.services.profiles")) {
					this.profilesQueryUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles)+"/atom/profile.do";
				}
				else
					{this.profilesQueryUrl = "/profiles/atom/profile.do";}
			}
		},
		
		postCreate: function(){
			dojo.style(this.DYKLoading,"display","");
			
			var nlm = dojo.cookie("lconn.sand.lastmod");
			if(nlm) {
				this.lastMod=nlm;
			} else {
				this.lastMod=new Date().getTime();
				dojo.cookie("lconn.sand.lastmod", this.lastMod, {expires: 7, secure: !!window.location.protocol.match("https"), samesite: 'None'});
			}
			
			this._fetchPeople();
		},	
		
		_handleAsyncRequest: function(data, evt){
			if(data!=null) {
				var xml = dojox.xml.parser.parse(data);			
				var xslt = this._xslCache.getXslDoc("doYouKnow.xsl");
				var isMSEdge = (!!dojo.isEdge);
				var json_data = lconn.core.xslt.transform(xml,xslt,null,null,!isMSEdge);
				if(json_data!=null && json_data!="") {
					try {
						if (isMSEdge) {
							json_data = json_data.childNodes[0].wholeText;
							this.currentData = dojo.fromJson(json_data);
						} else {
							this.currentData=eval('('+json_data+')');
						}
							
						if(this.currentData!=null) {
							dojo.style(this.welcomeNode,"display", "none");
							dojo.style(this.DYKLoading,"display", "none");
							this._translateEvidence();
							this._setContent();
							this.DYKContainer.style.display="";
							dojo.style(this.DYKContainer,"display", "");
							dojo.style(this.DYKNode,"display", "");
						}
					} catch(jsonException){ 
						dojo.style(this.DYKLoading,"display", "none");
						dojo.style(this.welcomeNode,"display", "");
					}
				} else {
					dojo.style(this.DYKLoading,"display", "none");
					dojo.style(this.welcomeNode,"display", "");
				}
			}
		},
		
		_fetchPeople: function() {
			dojo.style(this.DYKLoading,"display", "");
			dojo.style(this.welcomeNode,"display", "none");
			dojo.style(this.DYKContainer,"display", "none");
			
			var reqArgs = {
				url: com.ibm.oneui.util.proxy(this.remoteUrl),
				handleAs: "text",
				timeout: 30000,
				content: {
					lastMod: this.lastMod,
					pageSize: "15", 
					uid: this.currentUserId
				}
			};
			var req = dojo.xhrGet(reqArgs);
			req.addCallback(dojo.hitch(this, "_handleAsyncRequest"));
			req.addErrback(dojo.hitch(this, "_handleError"));
		},
		
		_setContent: function(){
			
			if (this.imageStream instanceof lconn.sand.ImageStream){
				this.imageStream.data = this.currentData;
				this.imageStream.postCreate();
			} else {
				this.imageStream = new lconn.sand.ImageStream({
					data: this.currentData,
					onNext: dojo.hitch(this,"_nextDYK"),
					onPrevious: dojo.hitch(this,"_previousDYK")
				}, this.imageStream);
			}
			
			this._updateEvidenceAndActions();
		},
		
		_updateEvidenceAndActions: function(){
			var person = this.imageStream.getCurrentItem();
			
			this._updateEvidence(person);
			this._updateActions(person);
			
		},
		
		_updateActions: function(person){
			var connectPersonTitle = dojo.string.substitute(this._resourceBundle.CONNECT_TO_PERSON,{personName: bidiUtil.enforceTextDirection(person.name)});
			var removePersonLabel = dojo.string.substitute(this._resourceBundle.DYKRemovePerson,{personName: bidiUtil.enforceTextDirection(person.name)});
			dojo.attr(this.DYKMainInvitePerson,"aria-label",connectPersonTitle);
			dojo.attr(this.DYKMainInvitePerson,"title",connectPersonTitle);
			dojo.attr(this.DYKMainRemovePerson,"aria-label", removePersonLabel);
			dojo.attr(this.DYKMainRemovePerson,"title", removePersonLabel);
		},
		
		_updateEvidence: function(person){
			if(person.evidence.length>0) {
				var ul = dojo.create("ul",{
					"style": "margin-left: 0px; padding-left: 15px;"
				}, this.DYKEvidence, "only");
				for(var i=0;i<person.evidence.length;i++) {
					dojo.create("li",{
						"style": "margin-left: 0px; padding-left: 0px;",
						"innerHTML": "<span tabindex='0'>" + person.evidence[i].ename + "</span>"
					}, ul);
				}
			} else {
				this.DYKEvidence.innerHTML="";
			}
			bidiUtil.enforceTextDirectionOnPage(this.DYKContainer);
		},

		_translateEvidence: function() {
			for(var i = 0; i < this.currentData.length; i++) {
				if(this.currentData[i].evidence!=null && this.currentData[i].evidence.length>0) {
					for(var j = 0; j < this.currentData[i].evidence.length; j++) {
						this.currentData[i].evidence[j].ename = this._resourceBundle[this.currentData[i].evidence[j].ename];
					}
				}
			}
		},
						
		_handleError: function(data, evt){
			this._displayError(data);
		},
		
		_displayError: function(data){
			dojo.style(this.DYKLoading,"display","none");
			dojo.style(this.DYKContainer,"display","none");

			if (data && data.status === 503){
				dojo.create("span", {
						"class": "lotusMeta",
						"innerHTML": this._resourceBundle.dykUnavailable
				}, this.welcomeNode, "only");
			}
			
			dojo.style(this.welcomeNode,"display","");
		},
		
		_previousDYK: function() {
			dojo.style(this.welcomeNode,"display","none");
			// this is not completeing before the onclick thread exits when
			// replacing the image on ie6. setTimeout pulls the execution out
			// of that onclick thread allowing it to complete on it's own time.			
			setTimeout(dojo.hitch(this, this._updateEvidenceAndActions),0);
		},
		
		_nextDYK:function() {
			dojo.style(this.welcomeNode,"display","none");
			// this is not completeing before the onclick thread exits when
			// replacing the image on ie6. setTimeout pulls the execution out
			// of that onclick thread allowing it to complete on it's own time.
			setTimeout(dojo.hitch(this, this._updateEvidenceAndActions),0);
		},
		
		_profileQueryAsyncRequest: function(data, evt){
			var visitorInfoNode = data.getElementsByTagName("isExternal")[0];
			if (!visitorInfoNode)
			{
				//try with namespace name
				visitorInfoNode = data.getElementsByTagName("snx:isExternal")[0];
			}
			
			//if (startPos >= 0)
			if (visitorInfoNode)
			{   
				var isVisitor = visitorInfoNode.firstChild.nodeValue;
				if (isVisitor == "true")
				{
					//display error since we can't show invite for external Users
					dojo.create("span", {
						"class": "lotusMeta",
						"innerHTML": this._resourceBundle.ticUnavailable
					}, this.welcomeNode, "only");
					dojo.style(this.welcomeNode,"display","");
				}
				else
				{
					this.inviteDialog();
				}
				
			}
			else
			{
				//can't determine visitor val
				this.inviteDialog();
			}
		},
		
		invite: function() {
			dojo.style(this.welcomeNode,"display","none");
			var person = this.imageStream.getCurrentItem();
			
			//before showDialog try to see if User is external User
			var reqArgs = {
					url: com.ibm.oneui.util.proxy(this.profilesQueryUrl),
					handleAs: "xml",
					timeout: 30000,
					content: {
							userid: person.uid
						}
				};
				var req = dojo.xhrGet(reqArgs);
				req.addCallback(dojo.hitch(this, "_profileQueryAsyncRequest"));
				req.addErrback(dojo.hitch(this, "_handleError"));
		},
		
		inviteDialog: function() {
			var person = this.imageStream.getCurrentItem();
			
			lconn.profiles.invite.Invite.showDialog(
					this.profilesRoot, 
					false,
					person.name,
					person.uid,
					this.currentUserId,
					this.root.id,
					this.inviteXHRErrorHandler,
					this.inviteErrorHandler,
					null, /* xhrDoneCallback - Optional */
					dojo.hitch(this,this.sendInvite),
					dojo.hitch(this,this.cancelInvite));
		},
		
		sendInvite: function() {
			this.removePerson();
		},
		
		cancelInvite: function() {
			//
		},
		
		removePerson:function() {
			var person = this.imageStream.getCurrentItem();
			var userID = person.uid;
			this._feedbackRequest(userID);
		},

		_feedbackRequest:function(itemID) {
			var updatedData = [];
			for(var i=0;i<this.currentData.length;i++) {
				if(this.currentData[i].uid !== itemID) {
					updatedData.push(this.currentData[i]);
				}
			}
			this.currentData = updatedData;
			if(this.currentData.length === 0) {
				dojo.style(this.DYKLoading,"display", "none");
				dojo.style(this.DYKContainer,"display", "none");
				dojo.style(this.welcomeNode,"display", "");
			} else {
				this._setContent();	
			}
			var reqArgs = {
				url: com.ibm.oneui.util.proxy(this.feedbackUrl),
				handleAs: "text",
				timeout: 30000,
				content: {
						client: "lconn.sand.DYKProfiles",
						itemid: itemID,
						action: "remove"
					}
			};
			var req = dojo.xhrGet(reqArgs); 
			this.lastMod = new Date().getTime();
			dojo.cookie("lconn.sand.lastmod",this.lastMod, {expires: 7, secure: !!window.location.protocol.match("https"), samesite: 'None'});
			
			if (this.currentData.length === 0){
				this._fetchPeople();
			}
		},
		DEFAULT_AMOUNT: 5
	}	
);
