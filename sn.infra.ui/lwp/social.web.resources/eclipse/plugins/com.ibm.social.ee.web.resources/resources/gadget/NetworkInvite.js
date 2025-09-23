/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget.NetworkInvite");

dojo.require("com.ibm.social.ee.gadget._SimpleEEGadget");

dojo.require("com.ibm.social.ee.data.NetworkInviteDataStore");
dojo.require("com.ibm.social.ee.data.CommonConnectionsDataStore");
dojo.require("com.ibm.social.ee.data.ProfilesRoutes");
dojo.require("com.ibm.social.ee.data.DomBuilder");
dojo.require("dojo.NodeList-manipulate");
dojo.require("com.ibm.social.incontext.util.text");
dojo.require("com.ibm.social.incontext.util.DateFormat");
dojo.require("com.ibm.social.incontext.util.html");
dojo.require("dojo.string");


/* Class expects a the invite url, and Network to be passed in */
dojo.declare("com.ibm.social.ee.gadget.NetworkInvite", [com.ibm.social.ee.gadget._SimpleEEGadget], {
	uuid: null,
	loadEntry: function (action, isAccept) {
	   var scope = this;
	   scope._disableBtns();
		this.makeRequest({ postFunc: action, dontClear: true, error: function() { scope._displayMessage(isAccept, false, false);}});
	},
	initializeUI: function(networkInviteData, prefix) {
	   this.prefix = prefix;
		if(networkInviteData) {
			this.connectionExists = networkInviteData.connectionExists;
			if(this.connectionExists) {
				this.uuid = networkInviteData.uuid;
				this.status = networkInviteData.status;
				this.fixupRequestMessage(networkInviteData.msg);
				this.targetName = networkInviteData.targetName;				
            this.targetId = networkInviteData.targetId;
			}
			this.fixupInactive(networkInviteData);
			this.setUrls(this.routes, networkInviteData.url, networkInviteData.commFriendUrl, networkInviteData.followUrl);
			this.connectButtons();
			var personDetails = dojo.byId(this.prefix +"_personDetails");
			com.ibm.social.incontext.util.text.breakStringHTML(personDetails);
			//AVT: remove link from profile picture
			var personHeader = dojo.byId(this.prefix + "_personHeader");
			if(personHeader){
				var flyOutDivList = dojo.query(".lotusFlyoutImage", personHeader);
				if(flyOutDivList && flyOutDivList.length>0){
					var flyOutDiv = flyOutDivList[0];
					var linkList = dojo.query("a", flyOutDiv);
					if(linkList && linkList.length>0){
						var link = linkList[0];
						var imgList = dojo.query("img", link);
						if(imgList && imgList.length>0){
							var img = imgList[0];
							if(img)
								dojo.place(img, link, "replace");
						}
					}
				}
					
			}
		}
	},
	fixupInactive: function(data) {
		var substitute = com.ibm.social.incontext.util.html.substitute;
		if (data && !data.active) {
			dojo.addClass(dojo.byId(this.prefix + "_personHeader"), "lotusDim");
         var userLink = dojo.query("a", dojo.byId(this.prefix + "_personVcard"))[0];
         // Detach userlink from its parent
         userLink.parentNode.removeChild(userLink);
         // Add inactive marker
         substitute(dojo.doc, dojo.byId(this.prefix + "_personVcard"), this.nlsCommon.inactiveUser, {
            user: function() { return userLink; }  
         });			
		}
		var inactiveFriendLinks = [];
		dojo.query("div.lotusDim a.lotusPerson", dojo.byId(this.prefix + "_commonFriends")).forEach(function(link) { inactiveFriendLinks.push(link); });		
		var self = this;
		dojo.forEach(inactiveFriendLinks, function(link) {
			// Detach from its parent
			var parentNode = link.parentNode; 
			parentNode.removeChild(link);
			substitute(dojo.doc, parentNode, self.nlsCommon.inactiveUser, {
				user: function() { return link; }
			});
		});		
	},	
	fixupRequestMessage: function(msg) {
		if(msg.length > 0) {
			//wrap string
			com.ibm.social.incontext.util.text.breakString(msg, dojo.doc, dojo.byId(this.prefix + "_msg"), 15, true);
		}
	},
	setUrls:function(routes, url, commFriendUrl, followUrl) {
		this.routes = routes || new com.ibm.social.ee.data.ProfilesRoutes();
		if(url)
			this.url = this.routes.getServiceUrl() + url;
		else
			this.url = null;
		if(commFriendUrl)
			this.commFriendUrl = this.routes.getServiceUrl() + commFriendUrl;
		else
			this.commFriendUrl = null;
		if(followUrl)
			this.followUrl = this.routes.getServiceUrl() + followUrl;
		else
			this.followUrl = null;
	},
	connectButtons: function() {
		if(this.prefix) {
			if(this.connectionExists) {
				dojo.global[this.prefix + "_accept"] =  dojo.hitch(this, this.acceptInvite);
				dojo.global[this.prefix + "_ignore"] = dojo.hitch(this, this.ignoreInvite);
			}
			dojo.global[this.prefix + "_showAll"] = dojo.hitch(this, this.showAllCommon);
		}
	},

	_disableBtns: function() {
		dojo.query(".ee_ni_button", this.prefix).forEach(function(btn){
			dojo.addClass(btn, "lotusBtnDisabled");
			btn.setAttribute("disabled", "true");
			btn.setAttribute("aria-disabled", "true");
		});
	},
	ignoreInvite: function() {
		var followCheckbox = dojo.byId(this.prefix +"_following");
		this.loadEntry(dojo.hitch(this, this._ignoreInvite, followCheckbox ? followCheckbox.checked : null), false);
	},
	_ignoreInvite: function(checkboxState) {
		if(this.status == 1 || !this.connectionExists) return; //already accepted or doesn't exist.
		var followCheckbox = dojo.byId(this.prefix +"_following");
		if(checkboxState !== null && followCheckbox !== null)
			followCheckbox.checked = checkboxState;
		var ds = new com.ibm.social.ee.data.NetworkInviteDataStore({
			network: this.network,
			url: this.url
		});
		this._disableBtns();
		this._getItem(ds, {
			onItem: dojo.hitch(this, function(item, args) {
				if (item && !(item instanceof Error)){
					ds.deleteItem(item);
					ds.save({
						onComplete: dojo.hitch(this, function() {
							this.followInvitingUser(false, true);}),
						onError: dojo.hitch(this, function() {
							this.followInvitingUser(false, false);})
					});
				}
			})
		});
	},
	acceptInvite: function() {
		var followCheckbox = dojo.byId(this.prefix +"_following");
		this.loadEntry(dojo.hitch(this, this._acceptInvite, followCheckbox ? followCheckbox.checked : null), true);
	},
	_acceptInvite: function(checkboxState) {
		var followCheckbox = dojo.byId(this.prefix +"_following");
		if(checkboxState !== null && followCheckbox !== null)
			followCheckbox.checked = checkboxState;
		//if connection does not exist (ignored) or already accepted return
		if(!this.connectionExists || this.status != 2) return;
		var ds = new com.ibm.social.ee.data.NetworkInviteDataStore({
			network: this.network,
			url: this.url
		});
		this._disableBtns();
		this._getItem(ds, {
			onItem: dojo.hitch(this, function(item, args) {
				if (item && !(item instanceof Error)){
					ds.setValue(item, "status", "accepted");
					ds.save({
						onComplete: dojo.hitch(this, function() {
							this.followInvitingUser(true, true);}),
						onError: dojo.hitch(this, function() {
							this.followInvitingUser(true, false);})
					});
				}
			})
		});
	},
	followInvitingUser: function(isAccept, isSuccess) {
		//If the following url exists and the follow checkbox is checked
		var followCheckbox = dojo.byId(this.prefix +"_following");
		if(!this.followUrl || !followCheckbox.checked) {
			this._displayMessage(isAccept, isSuccess, false);
			return;
		}
		this.network.postXml({
			url: this.followUrl,
			preventCache: true,
			postData: this._getFollowBody(),
			headers: {"Content-Type":"application/atom+xml;charset=\"UTF-8\""},
			load: dojo.hitch(this, this._displayMessage, isAccept, isSuccess, true),
			error: dojo.hitch(this, this._displayMessage, isAccept, isSuccess, false)
		});
	},
	_getFollowBody: function () {
	   return (new com.ibm.social.ee.data.DomBuilder()).getFollowUserPostBody(this.targetId);	
	},	
	_getItem: function(ds, opt) {
		ds.fetch({
			query: {uuid: this.uuid},
			onItem: opt.onItem,
			scope: null
		});
	},
	_displayMessage: function(isAccept, isSuccess, isFollowSuccessful) {
		var txt, txtQuery, parentQuery, nls;
		nls = this.nls.messages;
		if(isSuccess) {
			txtQuery = ".ee_ni_successMsg";
			parentQuery = ".ee_ni_successMsgContainer";
			if(isFollowSuccessful)
				txt = isAccept ? nls.success.accept.follow : nls.success.ignore.follow;
			else
			    txt = isAccept ? nls.success.accept.nofollow : nls.success.ignore.nofollow;
		}
		else {
			txtQuery = ".ee_ni_errorMsg";
			parentQuery = ".ee_ni_errorMsgContainer";
			txt = isAccept ? nls.error.accept : nls.error.ignore;
		}
		txt = dojo.string.substitute(txt, {user: this.targetName});
		dojo.byId(this.prefix + "_btnCtnr").style.display = "none";
		dojo.query(parentQuery, this.prefix).style("display", "");
		dojo.query(txtQuery, this.prefix).text(txt);
		dojo.byId(this.prefix + "_following_div").style.display = "none";
		dojo.publish("com/ibm/social/ee/event/scrollTop");
		this.adjustSize();
	},
	showAllCommon: function () {
		var ds = new com.ibm.social.ee.data.CommonConnectionsDataStore({
			net: this.network,
			url: this.commFriendUrl
		});
		ds.fetch ({
			scope: this,
			onComplete: function (items, req) {
				var commonFriendsNode = dojo.byId(this.prefix + "_commonFriends");
				if (commonFriendsNode) {
					dojo.empty(commonFriendsNode);
					for (var i = 0; i < items.length; i++) {
						var friend = ds.getValue(items[i], "targetUser");
						var inactiveDiv = null;
						if (friend.inactive)
							inactiveDiv = dojo.create("div", { className: "lotusDim", style: { display: "inline" } }, commonFriendsNode);
					   var div = dojo.create("div", {className: "lotusLeft lotusNetworkPerson" }, inactiveDiv || commonFriendsNode);
						var a = dojo.create("a", {href: this.routes.getUserProfileUrl(friend.id), target: "_blank"}, div);
						var friendName = (friend.inactive) ? dojo.string.substitute(this.nlsCommon.inactiveUser, { user: friend.name }) : friend.name;
						a.title = dojo.string.substitute(this.nls.profile_title, {user: friendName});
						a.setAttribute("aria-label", dojo.string.substitute(this.nls.profile_a11y, {user: friendName}));
						var img = dojo.create("img", { src: this.routes.getUserPhotoUrl(friend.id), width: "35", height: "35", alt: friendName, className: "fn lotusPerson" }, a);
					}
					dojo.create("div", { className: "lotusClear" }, commonFriendsNode);
               dojo.publish("com/ibm/social/ee/data/loaded");
               this.adjustSize();
				}
			}
		});
	},
	adjustSize: function () {
	   window.setTimeout(dojo.hitch(this, function() { this.onSizeChange(); }), 0);
	},
   getProfilesRoutes: function () { return this.routes; }
});