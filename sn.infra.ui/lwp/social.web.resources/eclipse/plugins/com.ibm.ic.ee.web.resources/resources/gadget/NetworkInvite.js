/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/_base/kernel",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/query",
	"dojo/string",
	"dojo/topic",
	"ic-ee/data/DomBuilder",
	"ic-ee/data/CommonConnectionsDataStore",
	"ic-ee/data/NetworkInviteDataStore",
	"ic-ee/data/ProfilesRoutes",
	"ic-ee/gadget/_SimpleEEGadget",
	"ic-incontext/util/DateFormat",
	"ic-incontext/util/html",
	"ic-incontext/util/text"
], function (dojo, lang, array, declare, windowModule, kernel, dom, domClass, domConstruct, query, string, topic, DomBuilder, CommonConnectionsDataStore, NetworkInviteDataStore, ProfilesRoutes, _SimpleEEGadget, DateFormat, html, text) {

	/* Class expects a the invite url, and Network to be passed in */
	var NetworkInvite = declare("com.ibm.social.ee.gadget.NetworkInvite", _SimpleEEGadget, {
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
				var personDetails = dom.byId(this.prefix +"_personDetails");
				text.breakStringHTML(personDetails);
				//AVT: remove link from profile picture
				var personHeader = dom.byId(this.prefix + "_personHeader");
				if(personHeader){
					var flyOutDivList = query(".lotusFlyoutImage", personHeader);
					if(flyOutDivList && flyOutDivList.length>0){
						var flyOutDiv = flyOutDivList[0];
						var linkList = query("a", flyOutDiv);
						if(linkList && linkList.length>0){
							var link = linkList[0];
							var imgList = query("img", link);
							if(imgList && imgList.length>0){
								var img = imgList[0];
								if(img)
									domConstruct.place(img, link, "replace");
							}
						}
					}
						
				}
			}
		},
		fixupInactive: function(data) {
			var substitute = html.substitute;
			if (data && !data.active) {
				domClass.add(dom.byId(this.prefix + "_personHeader"), "lotusDim");
	         var userLink = query("a", dom.byId(this.prefix + "_personVcard"))[0];
	         // Detach userlink from its parent
	         userLink.parentNode.removeChild(userLink);
	         // Add inactive marker
	         substitute(windowModule.doc, dom.byId(this.prefix + "_personVcard"), this.nlsCommon.inactiveUser, {
	            user: function() { return userLink; }  
	         });			
			}
			var inactiveFriendLinks = [];
			query("div.lotusDim a.lotusPerson", dom.byId(this.prefix + "_commonFriends")).forEach(function(link) { inactiveFriendLinks.push(link); });		
			var self = this;
			array.forEach(inactiveFriendLinks, function(link) {
				// Detach from its parent
				var parentNode = link.parentNode; 
				parentNode.removeChild(link);
				substitute(windowModule.doc, parentNode, self.nlsCommon.inactiveUser, {
					user: function() { return link; }
				});
			});		
		},	
		fixupRequestMessage: function(msg) {
			if(msg.length > 0) {
				//wrap string
				text.breakString(msg, windowModule.doc, dom.byId(this.prefix + "_msg"), 15, true);
			}
		},
		setUrls:function(routes, url, commFriendUrl, followUrl) {
			this.routes = routes || new ProfilesRoutes();
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
					kernel.global[this.prefix + "_accept"] =  lang.hitch(this, this.acceptInvite);
					kernel.global[this.prefix + "_ignore"] = lang.hitch(this, this.ignoreInvite);
				}
				kernel.global[this.prefix + "_showAll"] = lang.hitch(this, this.showAllCommon);
			}
		},
	
		_disableBtns: function() {
			query(".ee_ni_button", this.prefix).forEach(function(btn){
				domClass.add(btn, "lotusBtnDisabled");
				btn.setAttribute("disabled", "true");
				btn.setAttribute("aria-disabled", "true");
			});
		},
		ignoreInvite: function() {
			var followCheckbox = dom.byId(this.prefix +"_following");
			this.loadEntry(lang.hitch(this, this._ignoreInvite, followCheckbox ? followCheckbox.checked : null), false);
		},
		_ignoreInvite: function(checkboxState) {
			if(this.status == 1 || !this.connectionExists) return; //already accepted or doesn't exist.
			var followCheckbox = dom.byId(this.prefix +"_following");
			if(checkboxState !== null && followCheckbox !== null)
				followCheckbox.checked = checkboxState;
			var ds = new NetworkInviteDataStore({
				network: this.network,
				url: this.url
			});
			this._disableBtns();
			this._getItem(ds, {
				onItem: lang.hitch(this, function(item, args) {
					if (item && !(item instanceof Error)){
						ds.deleteItem(item);
						ds.save({
							onComplete: lang.hitch(this, function() {
								this.followInvitingUser(false, true);}),
							onError: lang.hitch(this, function() {
								this.followInvitingUser(false, false);})
						});
					}
				})
			});
		},
		acceptInvite: function() {
			var followCheckbox = dom.byId(this.prefix +"_following");
			this.loadEntry(lang.hitch(this, this._acceptInvite, followCheckbox ? followCheckbox.checked : null), true);
		},
		_acceptInvite: function(checkboxState) {
			var followCheckbox = dom.byId(this.prefix +"_following");
			if(checkboxState !== null && followCheckbox !== null)
				followCheckbox.checked = checkboxState;
			//if connection does not exist (ignored) or already accepted return
			if(!this.connectionExists || this.status != 2) return;
			var ds = new NetworkInviteDataStore({
				network: this.network,
				url: this.url
			});
			this._disableBtns();
			this._getItem(ds, {
				onItem: lang.hitch(this, function(item, args) {
					if (item && !(item instanceof Error)){
						ds.setValue(item, "status", "accepted");
						ds.save({
							onComplete: lang.hitch(this, function() {
								this.followInvitingUser(true, true);}),
							onError: lang.hitch(this, function() {
								this.followInvitingUser(true, false);})
						});
					}
				})
			});
		},
		followInvitingUser: function(isAccept, isSuccess) {
			//If the following url exists and the follow checkbox is checked
			var followCheckbox = dom.byId(this.prefix +"_following");
			if(!this.followUrl || !followCheckbox.checked) {
				this._displayMessage(isAccept, isSuccess, false);
				return;
			}
			this.network.postXml({
				url: this.followUrl,
				preventCache: true,
				postData: this._getFollowBody(),
				headers: {"Content-Type":"application/atom+xml;charset=\"UTF-8\""},
				load: lang.hitch(this, this._displayMessage, isAccept, isSuccess, true),
				error: lang.hitch(this, this._displayMessage, isAccept, isSuccess, false)
			});
		},
		_getFollowBody: function () {
		   return (new DomBuilder()).getFollowUserPostBody(this.targetId);	
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
			txt = string.substitute(txt, {user: this.targetName});
			dom.byId(this.prefix + "_btnCtnr").style.display = "none";
			query(parentQuery, this.prefix).style("display", "");
			query(txtQuery, this.prefix).text(txt);
			dom.byId(this.prefix + "_following_div").style.display = "none";
			topic.publish("com/ibm/social/ee/event/scrollTop");
			this.adjustSize();
		},
		showAllCommon: function () {
			var ds = new CommonConnectionsDataStore({
				net: this.network,
				url: this.commFriendUrl
			});
			ds.fetch ({
				scope: this,
				onComplete: function (items, req) {
					var commonFriendsNode = dom.byId(this.prefix + "_commonFriends");
					if (commonFriendsNode) {
						domConstruct.empty(commonFriendsNode);
						for (var i = 0; i < items.length; i++) {
							var friend = ds.getValue(items[i], "targetUser");
							var inactiveDiv = null;
							if (friend.inactive)
								inactiveDiv = domConstruct.create("div", { className: "lotusDim", style: { display: "inline" } }, commonFriendsNode);
						   var div = domConstruct.create("div", {className: "lotusLeft lotusNetworkPerson" }, inactiveDiv || commonFriendsNode);
							var a = domConstruct.create("a", {href: this.routes.getUserProfileUrl(friend.id), target: "_blank"}, div);
							var friendName = (friend.inactive) ? string.substitute(this.nlsCommon.inactiveUser, { user: friend.name }) : friend.name;
							a.title = string.substitute(this.nls.profile_title, {user: friendName});
							a.setAttribute("aria-label", string.substitute(this.nls.profile_a11y, {user: friendName}));
							var img = domConstruct.create("img", { src: this.routes.getUserPhotoUrl(friend.id), width: "35", height: "35", alt: friendName, className: "fn lotusPerson" }, a);
						}
						domConstruct.create("div", { className: "lotusClear" }, commonFriendsNode);
	               topic.publish("com/ibm/social/ee/data/loaded");
	               this.adjustSize();
					}
				}
			});
		},
		adjustSize: function () {
		   window.setTimeout(lang.hitch(this, function() { this.onSizeChange(); }), 0);
		},
	   getProfilesRoutes: function () { return this.routes; }
	});
	return NetworkInvite;
});
