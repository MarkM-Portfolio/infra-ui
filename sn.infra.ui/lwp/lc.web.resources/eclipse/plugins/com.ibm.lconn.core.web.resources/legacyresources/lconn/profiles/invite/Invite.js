/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2001, 2022                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */ 
dojo.provide("lconn.profiles.invite.Invite");

dojo.require("dijit.dijit");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.CheckBox");

dojo.require("dojo.parser");
dojo.require("lconn.core.xpath");
dojo.require("lconn.core.CommonTags.CommonTagsTypeAhead");
dojo.require("lconn.core.TypeAheadDataStore");
dojo.require("lconn.core.i18nOverrider");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.globalization.bidiUtil");
dojo.require("lconn.core.util.html");

dojo.requireLocalization("lconn.profiles.bizCard", "ui");

lconn.profiles.invite.Invite = {
	_isDebug: false,
	
	_status: { // status flag to indicate what functionality was attempted, error'ed, and succeeded as follows: -1 = not attempted, 0 = error, 1 = successful
		general: -1,
		invite: -1, // friend request
		follow: -1, // follow request
		tag: -1 // tag request
	 },
	
	messages: dojo.i18n.getLocalization("lconn.profiles.bizCard", "ui"),
	
	// param names object for atoms
	LONG_PARAM_NAMES: {
		sourceKey: 'sourceKey',
		targetKey: 'targetKey',
		sourceUserid: 'sourceUserid',
		targetUserid: 'targetUserid'
	},
	
	// param names object for ajax and actions
	SHORT_PARAM_NAMES: {
		sourceKey: '',
		targetKey: 'key',
		sourceUserid: '',
		targetUserid: 'userid'
	},
	
	// generate the params names prototype object to mixin with others arguments values
	_getUrlParamsProto: function(args, paramNames) {
		var params = {};
		if(args.byKey) {
			params.sourceParam = paramNames.sourceKey;
			params.sourceValue = args.loggedInUserKey;
			params.targetParam = paramNames.targetKey;
			params.targetValue = args.targetKey;
		} else {
			params.sourceParam = paramNames.sourceUserid;
			params.sourceValue = args.loggedInUserid;
			params.targetParam = paramNames.targetUserid;
			params.targetValue = args.targetUserid;
		}
		return params;
	},
	
	// url getter, to check connection between current user and target person
	_getHaveConnectionUrl:function(args) {
		var url = "${applicationContext}/atom/connection.do?connectionType=colleague&${sourceParam}=${sourceValue}&${targetParam}=${targetValue}&returnNoContent=true";
		return dojo.string.substitute(url, dojo.mixin(this._getUrlParamsProto(args, this.LONG_PARAM_NAMES), args));
	},
	
	// url getter, to check "can current user follow target person" flag 
	_getAccessCheckUrl:function(args) {
		var url = "${applicationContext}/ajax/invitationAccess.do?${targetParam}=${targetValue}";
		return dojo.string.substitute(url, dojo.mixin(this._getUrlParamsProto(args, this.SHORT_PARAM_NAMES), args));
	},

	// url getter, to add to friends list 
	_getFriendRequestUrl:function(args) {
		var url = "${applicationContext}/atom2/forms/friendrequest?${targetParam}=${targetValue}&lastMod=${lastMod}";
		return dojo.string.substitute(url, dojo.mixin(this._getUrlParamsProto(args, this.LONG_PARAM_NAMES), args));
	},

	// url getter, to add to follow list 
	_getFollowRequestUrl:function(args) {
		if(args && !args.action) 
			args.action = "follow";
		var url = "${applicationContext}/html/following.do?${targetParam}=${targetValue}&${sourceParam}=${sourceValue}&action=${action}&lastMod=${lastMod}";
		return dojo.string.substitute(url, dojo.mixin(this._getUrlParamsProto(args, this.LONG_PARAM_NAMES), args));
	},

	// url getter, to get all tags list 
	_getProfileTagsGetterUrl:function(args) {
		var url = "${applicationContext}/atom/forms/profileTags.do?${targetParam}=${targetValue}&${sourceParam}=${sourceValue}&format=full&lastMod=${lastMod}";
		return dojo.string.substitute(url, dojo.mixin(this._getUrlParamsProto(args, this.LONG_PARAM_NAMES), args));
	},

	// url getter, to put all tags list 
	_getProfileTagsSetterUrl:function(args) {
		var url = "${applicationContext}/atom/forms/profileTags.do?${targetParam}=${targetValue}&${sourceParam}=${sourceValue}&lastMod=${lastMod}";
		return dojo.string.substitute(url, dojo.mixin(this._getUrlParamsProto(args, this.LONG_PARAM_NAMES), args));
	},

	// url getter, for TypeAhead dijit on panel
	_getPanelTypeaheadUrl:function(args) {
		var url = "${applicationContext}/html/tagTypeahead.do?useJson=true";
		return dojo.string.substitute(url, dojo.mixin({}, args));
	},

	// url getter, for photo image IMG element on panel  
	_getPanelPhotoUrl:function(args) {
		var url = "${applicationContext}/photo.do?${targetParam}=${targetValue}";
		return dojo.string.substitute(url, dojo.mixin(this._getUrlParamsProto(args, this.SHORT_PARAM_NAMES), args));
	},
	
	inviteDialog: null,
	inviteDialogLinked: false,
	invitePanelIsReady: false,
	inviteDialogIsReady: false,

	// destroy previous panel object    
	_destroyOldPanel: function() {
		if(this._isDebug) console.debug("in Invite._destroyOldPanel");
		if(this.inviteDialog && this.inviteDialog.containerNode && this.inviteDialog.containerNode.firstChild) {
			var oldPanel = dijit.byNode(this.inviteDialog.containerNode.firstChild);
			if(oldPanel) {
				oldPanel.destroyRecursive();
			}
		} 
	},

	// create panel object, we does not perform request in this method   
	_createPanel: function(args) {
		if(this._isDebug) console.debug("in Invite._createPanel");
		if(this.inviteDialog && !this.inviteDialogIsReady) {
			var panel = new lconn.profiles.invite.InvitePanel(this._prepareArgs(args));
			this.inviteDialog.titleNode.innerHTML = panel.friendsInviteTitle;
			dojo.addClass(this.inviteDialog.titleNode, "lotusAltText");			
			if(!this.inviteDialogIsLinked) {
				dojo.body().appendChild(this.inviteDialog.domNode);
				this.inviteDialogIsLinked = true;
			}
			if(this.inviteDialog.containerNode) {
				this.inviteDialog.containerNode.appendChild(panel.domNode);					
			}
			this.inviteDialog.startup();
			this.invitePanelIsReady = true;
			this.inviteDialogIsReady = true;
			dojo.connect(this.inviteDialog, "hide", dojo.hitch(this, function() {
				this.invitePanelIsReady = false;
				this.inviteDialogIsReady = false;
			}));
		}
	},

	_getString: function(key)
	{
	   var temp = null;
	   temp = this.messages[key];
	   return temp;   
	},
	
	// init pre-panel (pre-dialog) data object, it make server request to check some issues before we show the dialog  
	_initializeData: function(args) {
		if(this._isDebug) console.debug("in Invite._initializeData");
		this._status.general = this._status.invite = this._status.follow = this._status.tag = -1;
		
		args = args || {};
		args.lastMod = args.lastMod || ((new Date().getTime())+"");

		args.xhrErrorHandlerCallback = args.xhrErrorHandlerCallback || function(){};
		args.errorHandlerCallback = args.errorHandlerCallback || function(){};
		args.xhrDoneCallback = args.xhrDoneCallback || function(){};
		
		if(!args.loggedInUserKey && !args.loggedInUserid) {
			//USER NOT LOGGED
			alert(lconn.profiles.invite.Invite._getString('friendsPleaseLogIn'));
			this._status.general = 0;
			
		} else if((args.loggedInUserKey && args.loggedInUserKey == args.targetKey) || (args.loggedInUserUserid && args.loggedInUserUserid == args.targetUserid)){
			alert(lconn.profiles.invite.Invite._getString('friendsCannotAddYourself'));
			this._status.invite = 0;

		} else {
			this._sendCanFriendRequest(args, dojo.hitch(this, function(){
				if(args.canTag === null || args.canTag === undefined ||
				   args.canFollow === null || args.canFollow === undefined ) {
					// canFollow or canTag is undefined, ask server API
				    this._sendAccessCheckRequest(args, dojo.hitch(this, function(resp){
						args.canTag = resp.canTag;
						args.canFollow = resp.canFollow
						args.isFollowed = resp.isFollowed;
						args.canFriend = resp.canFriend;
						this._createPanel(args);
					}));
				} else {
					// predefined canFollow value, use it
					this._createPanel(args);
				}
			}));
		}
	},

	// init panel object  
	_initializePanel: function(args) {
		if( this.inviteDialog && this.inviteDialog.containerNode ) {
			this._destroyOldPanel();
			this._initializeData(args);
		}
	},

	// init dialog object  
	_initializeDialog: function(args) {
		if( !this.inviteDialog) {
			this.inviteDialog = new dijit.Dialog({
			      content: "",
			      style: ""
			});
			this._initializePanel(args);
		}
	},
	
	// prepare arguments object for panel  
	_prepareArgs: function(args) {
		args = args || {};
		args.sendInviteCallback = args.sendInviteCallback || function(){};
		args._xhrDoneCallback = dojo.hitch(this, function() { // callback wrapper in order to hide on xhr complete
			if(this._isDebug) console.debug("in Invite._xhrDoneCallback");
			this.hide();
			args.xhrDoneCallback();
		});

		var filteredArgs = {
			onClose: 
				dojo.hitch(this, function(){
					this.hide();
			})
		};
		
		filteredArgs.cancelInviteCallback = args.cancelInviteCallback || function(){};
		filteredArgs.displayName = args.displayName || '';
		filteredArgs.canFriend = args.canFriend;
		filteredArgs.canTag = args.canTag;
		filteredArgs.canFollow = args.canFollow;
		filteredArgs.isFollowed = args.isFollowed;
		filteredArgs.tagTypeaheadUrl = this._getPanelTypeaheadUrl(args); 
		filteredArgs.profilePhotoSrc = this._getPanelPhotoUrl(args); 

		filteredArgs.sendInviteCallback = dojo.hitch(this, function(msg, followFlag, tags){
			if(this._isDebug) console.debug("in Invite.sendInviteCallback");
			this._status.general = this._status.invite = this._status.follow = this._status.tag = -1; // reset here since once the panel is init'ed, it gets reused and not init'ed again
			
			if((args.loggedInUserKey && args.loggedInUserKey == args.targetKey) || (args.loggedInUserUserid && args.loggedInUserUserid == args.targetUserid)) {
				alert(lconn.profiles.invite.Invite._getString('friendsCannotAddYourself'));				
				this._status.invite = 0;
			} else {
				// xhr callback chain is: invite -> follow -> gettags -> puttags -> xhrDoneCallback
				
				// try to send tags replacement request
				var getTagsDoneCallback = dojo.hitch(this, function(resp, ioArgs, tagsArray){
					if(this._isDebug) console.debug("in Invite.getTagsDoneCallback");
					var sendChanges = false;
					dojo.forEach(tags, function(tag){						
						if(dojo.indexOf(tagsArray, tag)<0) {
							sendChanges = true;
							tagsArray.push(tag);
						}						
					});
					if(sendChanges) {
						this._sendTagsReplaceRequest(tagsArray, args, args._xhrDoneCallback);
					} else {
						args._xhrDoneCallback();
					}
				});

				// try to send getting tags request
				var followDoneCallback = dojo.hitch(this, function(){
					if(this._isDebug) console.debug("in Invite.followDoneCallback");
					if(tags && tags.length > 0) {
						this._sendGetTagsRequest(args, getTagsDoneCallback);
					} else {
						args._xhrDoneCallback();
					}
				});

				// try to send follow request
				var friendingDoneCallback = dojo.hitch(this, function(){
					if(this._isDebug) console.debug("in Invite.friendingDoneCallback");
					if(followFlag) {
						this._sendFollowRequest(args, followDoneCallback);
						// for updating the left panel count of following
						if(document.getElementById("liFollowing") && window.ui && typeof window.ui._check_ui_enabled === 'function' && window.ui._check_ui_enabled()) {
							document.getElementById("liFollowing").getElementsByTagName("label")[0].innerHTML = '(' + (parseInt(document.getElementById("liFollowing").getElementsByTagName("label")[0].innerHTML.replace(/[()\ \s-]+/g, '')) + 1) + ')';
						}
					} else {
						followDoneCallback();
					}
				});

				//send friend request
				this._sendFriendRequest(msg, args, friendingDoneCallback);
			}
			
			args.sendInviteCallback();
		});
				
		return filteredArgs;
	},
	
	// user friendly method to show invitation dialog, other components should use it  
	showDialog: function( 
			applicationContext, 
			byKey, 
			displayName, 
			targetKeyOrUserid, 
			loggedInUserKeyOrUserid, 
			errorNodeId, 
			xhrErrorHandlerCallback, 
			errorHandlerCallback, 
			xhrDoneCallback /* Optional */, 
			sendInviteCallback /* Optional */, 
			cancelInviteCallback /* Optional */, 
			canFollow /* Optional - TODO: clean up this arg as the lack of canTag will force a check anyways; see _sendAccessCheckRequest */) {
		if(this._isDebug) console.debug("in Invite.showDialog");
		if (this.inviteDialogIsReady) return;
		var args = {
			byKey: byKey,
			displayName: lconn.core.globalization.bidiUtil.enforceTextDirection(lconn.core.util.html.encodeHtml(displayName)),
			canFriend: null,
			canTag: null,
			canFollow: canFollow,
			isFollowed: null,
			applicationContext: applicationContext,
			errorNodeId: errorNodeId,
			xhrErrorHandlerCallback: xhrErrorHandlerCallback,
			errorHandlerCallback: errorHandlerCallback,
			xhrDoneCallback: xhrDoneCallback,
			sendInviteCallback: sendInviteCallback,
			cancelInviteCallback: cancelInviteCallback
		};

		if(byKey) {
			args.targetKey = targetKeyOrUserid;
			args.loggedInUserKey = loggedInUserKeyOrUserid;
		} else {
			args.targetUserid = targetKeyOrUserid;
			args.loggedInUserid = loggedInUserKeyOrUserid;
		}

		this.show(args);
	},

	// show dialog by timeout, because Panel can be not ready (server requests should complete before dialog will be showed) 
	_delayedDialog: function() {
		if(this._isDebug) console.debug("in Invite._delayedDialog");
		if( this.inviteDialog )	{
			if(this._delayedDialogTimeout) {
				clearTimeout(this._delayedDialogTimeout);
				this._delayedDialogTimeout = null;
			}
			if(this.invitePanelIsReady) {
				this.inviteDialog.show();
				lconn.core.globalization.bidiUtil.enforceTextDirectionOnPage(this.inviteDialog.containerNode);
			} else {
				this._delayedDialogTimeout = setTimeout(dojo.hitch(this, this._delayedDialog), 1000);
			}
		}		
	},
	
	// show the dialog with predefined arguments
	show: function(args) {
		if(this._delayedDialogTimeout) {
			clearTimeout(this._delayedDialogTimeout);
			this._delayedDialogTimeout = null;
		}
		if(!this.inviteDialog) {
			this._initializeDialog(args);
		} else if(args != null) {			
			this._initializePanel(args);
		}
		this._delayedDialog();
	},

	// hide last dialog
	hide: function() {
		if(this._isDebug) console.debug("in Invite.hide");
		if(this._delayedDialogTimeout) {
			clearTimeout(this._delayedDialogTimeout);
			this._delayedDialogTimeout = null;
		}
		this.invitePanelIsReady = false;
		this.inviteDialogIsReady = false;
		if( this.inviteDialog ) {
			this.inviteDialog.hide();
		}
	},

	// send can friend checking request
	_sendAccessCheckRequest: function(args, resultCallback) {
		if(this._isDebug) console.debug("in Invite.Invite._sendAccessCheckRequest");
		resultCallback = resultCallback || function(resp){};
		var url = this._getAccessCheckUrl(args);
		this._sendRequestArgs("GET", "json", url, args, dojo.hitch(this, function(resp){
			if(this._isDebug) console.debug("in Invite.Invite._sendAccessCheckRequest's callback");
			if(resp) {
			        resultCallback(resp);
			} else {
				alert(lconn.profiles.invite.Invite._getString('errorDefaultMsg2'));
				this._status.invite = 0;
				args.xhrErrorHandlerCallback(resp, ioArgs);
			}
		}));
	},

	// send can friend checking request
	_sendCanFriendRequest: function(args, resultCallback) {
		if(this._isDebug) console.debug("in Invite._sendCanFriendRequest");
		resultCallback = resultCallback || function(canFriend){};
		var url = this._getHaveConnectionUrl(args);

		//NOTE: may be we need replace this method to "GET", because we have no XML body for error handler.
		this._sendRequestArgs("GET", "xml", url, args, dojo.hitch(this, function(resp, ioArgs){
			if(this._isDebug) console.debug("in Invite._sendCanFriendRequest's callback");

		    // We are now using '204' to indicate the connection doesn't exist
			if(this._isDebug) console.debug("_sendCanFriendRequest: xhr.status = " +ioArgs.xhr.status );
		    
			// IE thinks it owns the world and decides to return its own status codes, thus, normalize 1223's into 204's.  
		    // Unfortunatelly cannot change the ioArgs.xhr.status to 204 higher on the stack because IE croaks...
		    if ( ioArgs && ioArgs.xhr && ( ioArgs.xhr.status == 204 || (dojo.isIE && ioArgs.xhr.status == 1223))) {
		    	resultCallback();
		    }
		    else {
				//ALREADY FRIEND!
				var str = lconn.profiles.invite.Invite._getString('friendsPersonAlreadyInYourNetwork');
				if(ioArgs && ioArgs.xhr && ioArgs.xhr.getResponseHeader('X-Profiles-Connection-Status') != 'accepted') {
					// request sent, but it's not accepted
					str = lconn.profiles.invite.Invite._getString('friendsInvSent');
				}
					
				if(str) {
					str = lconn.core.i18nOverrider.replaceParams(str, [args.displayName]);
				}

				alert(str);
				this._status.invite = 0;
		   }
		}), { 
			error: dojo.hitch(this, function(resp, ioArgs, ex){
				if(this._isDebug) console.debug("in Invite._sendCanFriendRequest's error handler");
				if(resp.status+'' == '404') { // although we error'ed out, 404 means we did not find a denial to friend, thus assume we can friend
					resultCallback();
				} else {
					this._status.invite = 0;
					//NOTE: may be we need replace this method to "GET", because we have no XML body for following error handler.
					args.xhrErrorHandlerCallback.apply(null, arguments);
				}				
			})
		});		
	},
	
	// send tags getting request
	_sendGetTagsRequest: function(args, xhrDoneCallback) {
		if(this._isDebug) console.debug("in Invite._sendGetTagsRequest");
		var url = this._getProfileTagsGetterUrl(args);
		this._sendRequestArgs("GET", "xml", url, args, function(resp, ioArgs){ 
			if(this._isDebug) console.debug("in Invite._sendGetTagsRequest callback");
			var tags = [];
			dojo.forEach(lconn.core.xpath.selectNodes("//atom:category", resp), function(node){
				var tag = node.getAttribute('term');
				if(tag) {
					tags.push(tag);
				}
			});
			xhrDoneCallback(resp, ioArgs, tags);
		}, {
			error: dojo.hitch(this, function(resp, ioArgs){
				if(this._isDebug) console.debug("in Invite._sendGetTagsRequest's error handler");
				this._status.tag = 0;
				var str = lconn.profiles.invite.Invite._getString('friendsInviteTagError');
				if(str) {
					str = lconn.core.i18nOverrider.replaceParams(str, [args.displayName]);
				}
				alert(str);
				this._status.tag = 0;
				args.xhrErrorHandlerCallback(resp, ioArgs);
			})
		}
		
		
		);
	},

	// send tags replacing request
	_sendTagsReplaceRequest: function(tags, args, xhrDoneCallback) {
		if(this._isDebug) console.debug("in Invite._sendTagsReplaceRequest");
		this._status.tag = 1;
		var xmlContent = "<app:categories xmlns:atom='http://www.w3.org/2005/Atom'";
		xmlContent += " xmlns:app='http://www.w3.org/2007/app'";
		xmlContent += " xmlns:snx='http://www.ibm.com/xmlns/prod/sn'>";
		for(var i=0; i<tags.length; ++i){
			if(tags[i] != null && tags[i] != ""){
	 			xmlContent += "<atom:category term=\""+tags[i]+"\"/>";
	 			}
	 		}
		xmlContent += "</app:categories>";			

		var url = this._getProfileTagsSetterUrl(args);
		this._sendRequestArgs("PUT", "text", url, args, xhrDoneCallback, {
			putData: xmlContent, 
			checkAuthHeader: true,
			error: dojo.hitch(this, function(resp, ioArgs){
				if(this._isDebug) console.debug("in Invite._sendTagsReplaceRequest's error handler");
				this._status.tag = 0;
				var str = lconn.profiles.invite.Invite._getString('friendsInviteTagError');
				if(str) {
					str = lconn.core.i18nOverrider.replaceParams(str, [args.displayName]);
				}
				alert(str);
				this._status.tag = 0;
				args.xhrErrorHandlerCallback(resp, ioArgs);
			})
		});
	},

	// TODO: looks like this function is not used anywhere
	followUser: function(applicationContext, targetUser, sourceUser, ele) {
		if(this._isDebug) console.debug("in Invite.followUser");
		var person = lconn.profiles.bizCard.bizCard.currentPerson;
		targetUser = targetUser || person.key;
		sourceUser = sourceUser || person.X_loggedInUserKey;
		if(person.X_loggedInUserKey && sourceUser == person.X_loggedInUserKey){
			var args = {
				byKey: true,
				targetValue : targetUser,
				sourceValue : sourceUser,
				applicationContext : applicationContext,
				lastMod: ((new Date().getTime()) + ""),
				action: person.X_isFollowed != "false"? "unfollow": "follow"
			};
			var messages = this.messages;
			var onSuccess = dojo.hitch(
				this,
				function() {
					var nls = messages;
					var person = lconn.profiles.bizCard.bizCard.currentPerson;
					person.X_isFollowed = person.X_isFollowed != "false" ? "false" : "true";
					var label = person.X_isFollowed != "false" ? nls.personCardUnfollow : nls.personCardFollow;
					ele.innerHTML = label;
				});
			this._sendFollowRequest(args, onSuccess);
		}else{
			//TODO Go to login form
		}
	},
	
	// send following request
	_sendFollowRequest: function(args, xhrDoneCallback) {
		if(this._isDebug) console.debug("in Invite._sendFollowRequest");
		this._status.follow = 1;
		var followUrl = this._getFollowRequestUrl(args);
		this._sendRequestArgs("POST", "text", followUrl, args, xhrDoneCallback, {
			error: dojo.hitch(this, function(resp, ioArgs){
				if(this._isDebug) console.debug("in Invite._sendFollowRequest's error handler");
				var str = lconn.profiles.invite.Invite._getString('friendsInviteFollowError');
				if(str) {
					str = lconn.core.i18nOverrider.replaceParams(str, [args.displayName]);
				}
				alert(str);
				this._status.follow = 0;
				args.xhrErrorHandlerCallback(resp, ioArgs);
			})
		});
	},
	
	// send friend setting request
	_sendFriendRequest: function(msg, args, xhrDoneCallback) {
		if(this._isDebug) console.debug("in Invite._sendFriendRequest");
		this._status.invite = 1;
		var url = this._getFriendRequestUrl(args);

		if(msg != null && msg != "") {
			// we generically limit the characters to 500, which is 1/4 what the database field limit is
			// so that international characters are covered properly
			if(msg.length > 500) {		
				var temp = lconn.profiles.invite.Invite._getString('friendsYouExceedTextLimit');
				if(temp) {
					temp = temp.replace(/\'\'/g, "'");
					temp = lconn.core.i18nOverrider.replaceParams(temp , [msg.length, '500']);
				}
				alert(temp);
				this._status.invite = 0;
				return false;
			}
			msg = msg.replace(new RegExp( "\\n", "g" ), "<br/>");
			// dataUrl += "&msg=" + encodeURIComponent(msg);
		}	

		this._sendRequestArgs("PUT", "xml", url, args, 
			dojo.hitch(this, function(resp, ioArgs){ /* xhr done callback */
				if(this._isDebug) console.debug("in Invite._sendFriendRequest's callback");
				if(resp.documentElement.nodeName == "error" && resp.documentElement.getAttribute("code") == "connection-exist") {
					this._status.invite = 0;
					alert(lconn.profiles.invite.Invite._getString('friendsInvSent'));
				} else if(resp.documentElement.nodeName == "error" && resp.documentElement.getAttribute("code") == "notification-error") {
					this._status.invite = 0;
					alert(lconn.profiles.invite.Invite._getString('errorDefaultMsg2'));
				} else if(resp.documentElement.nodeName == "error" || resp.documentElement.nodeName == "parsererror") {
					this._status.invite = 0;
					args.xhrErrorHandlerCallback(resp, ioArgs);
				} else {
					this._status.invite = 1;
					xhrDoneCallback(resp, ioArgs);
				}
			}),
			{putData: msg} /* args mixin */);
	},
	
	// send custom request with ARGS parameters, simplified method
	_sendRequestArgs: function(request, handleAs, url, args, xhrDoneCallback, reqArgsMixin) {
		this._sendRequest(request, handleAs, url, args.errorNodeId, xhrDoneCallback, args.xhrErrorHandlerCallback, args.errorHandlerCallback, reqArgsMixin);
	},

	// send custom request, simplified method
	_sendRequest: function(request, handleAs, url, errorNodeId, xhrDoneCallback, xhrErrorHandlerCallback, errorHandlerCallback, reqArgsMixin) {
		reqArgsMixin = reqArgsMixin || {};

		// Only go through the proxy when the url is a full URL
		if((url.indexOf("http:") == 0 || url.indexOf("https:") == 0) && window.SemTagSvcConfig != null && SemTagSvcConfig.proxyURL != null) {
			var ph = new lconn.core.url.ProxyUrlHelper(SemTagSvcConfig.proxyURL);
			url = ph.getProxifiedURL(url);
		}
      
		var reqArgs = {
			url: url,
			handleAs: handleAs,
			htmlContainerElemId: errorNodeId,
			error: xhrErrorHandlerCallback,
			load: dojo.hitch(this, function(response, ioArgs) {
				try{
					xhrDoneCallback(response, ioArgs);
				}
				catch(exception) {
					this._status.general = 0;
					console.warn('Invite->_sendRequest', exception);
					errorHandlerCallback("lconn.profiles.invite.Invite._sendRequest", exception, {htmlContainerElemId: errorNodeId});
				}
			})
		};	
		dojo.mixin(reqArgs, reqArgsMixin);

		var hasBody = true;
		if(request == "GET" || request == "DELETE") {
			hasBody = false;
		}
		dojo.xhr(request, reqArgs, hasBody);
	},
	
	openHelpWindow: function( url, width, height, newWindow, windowName) {
		if (dojo.exists("lconn.profiles.profiles_help")) return lconn.profiles.profiles_help.open(url);
		if( typeof(url) == "undefined") return;
		svcHrefHelp = lconn.core.url.getServiceUrl(lconn.core.config.services.help).toString();
		
	   	width = (width? width : Math.max( window.screen.width/2, 950));
	   	height = (height? height : Math.max( window.screen.height/2, 650));
	    var left = (window.screen.width - width)/2;
	    var top = (window.screen.height - height)/2;
	    var options = 'height=' + height + ',width=' + width + ',left=' + left + ',top=' + top + ',status=yes,toolbar=yes,menubar=no,location=yes,scrollbars=yes,resizable=yes';
	   	
	    if (typeof(newWindow) != "undefined" && newWindow != true && typeof(helpWindow) != "undefined") helpWindow.close();
		var helpWindow = window.open( svcHrefHelp+url, (typeof(windowName) != 'undefined')?windowName:'help', options);
		if (helpWindow && window.focus) helpWindow.focus();
	}
};

dojo.declare("lconn.profiles.invite.InvitePanel", [dijit._Widget, dijit._Templated, dijit._Container], {      

		widgetsInTemplate: true,

		templatePath: dojo.moduleUrl("lconn.profiles.invite", "templates/Invite.html"),
		blankGif: djConfig.blankGif,
		
		defaultInvitationMessageColor: "#666666",
		
		//optional param
		appLang: null,
		
		//parameters
		profilePhotoSrc: "/PROFILE_PHOTO_URL",
		tagTypeaheadUrl: "/TAG_TYPEAHEAD_URL",
		displayName: null, //"=Display Name=",
		canFollow: true,
		closeOnXhrDone: true,

		//template strings
		friendsInviteTitle: "friendsInvite",
		friendsColleaguesInviteMessage: "friendsColleaguesInvite",
		invitationMessageLabel: "friendsIncludeMsgForInv",
		invitationMessage: "friendsInitialMsgForInv",
		friendsSendInvActionMessage: "friendsSendInvAction",
		friendsCancelInvActionMessage: "friendsCancelInvAction",
		
		invitationTagsLabel: "invitationTagsLabel",
		invitationFollowLabel: "invitationFollowLabel",
		invitationFollowExtLabel: "invitationFollowExtLabel",
		invitationFollowDescription: "invitationFollowDescription",
		invitationFollowHelp: "invitationFollowHelp",
		_langPatch: function(appLang) {
			var rtlPatch = "&rlm;";
			var ltrPatch = "&lrm;";

			var lang = appLang && appLang.substr(0,2).toUpperCase();
			var isRTL = (lang && (lang == "AR" || lang == "HE" || lang == "IW"));
			var dirPatch = (isRTL ? rtlPatch : ltrPatch);
			return dirPatch;
		},
		
		postMixInProperties: function() {
			if(ui._check_ui_enabled()) {
				this.templatePath = dojo.moduleUrl("lconn.profiles.invite", "templates/cnx8Invite.html");
			}
			this.appLang = this.appLang || dojo.getObject('appLang');

			this.friendsInviteTitle = lconn.profiles.invite.Invite._getString("friendsInvite"); 
			this.friendsColleaguesInviteMessage = lconn.profiles.invite.Invite._getString("friendsColleaguesInvite");
			if(this.friendsColleaguesInviteMessage) {
				this.friendsColleaguesInviteMessage = lconn.core.i18nOverrider.replaceParams(this.friendsColleaguesInviteMessage, [this.displayName]);
			}
			this.invitationMessageLabel = lconn.profiles.invite.Invite._getString("friendsIncludeMsgForInv"); 
			this.invitationMessage = lconn.profiles.invite.Invite._getString("friendsInitialMsgForInv"); 
			this.friendsSendInvActionMessage = lconn.profiles.invite.Invite._getString("friendsSendInvAction"); 
			this.friendsCancelInvActionMessage = lconn.profiles.invite.Invite._getString("friendsCancelInvAction");
			
			this.invitationTagsLabel = lconn.profiles.invite.Invite._getString("friendsInviteAddTagsFor");
			if(this.invitationTagsLabel) {
				this.invitationTagsLabel = lconn.core.i18nOverrider.replaceParams(this.invitationTagsLabel, [this.displayName]);
			}
			this.invitationFollowLabel = lconn.profiles.invite.Invite._getString("friendsInviteAlsoFollow");
			var dirPatch = this._langPatch(this.appLang);
			this.invitationFollowExtLabel = dirPatch + lconn.profiles.invite.Invite._getString("friendsInviteReceiveUpdates");
			this.invitationFollowDescription = lconn.profiles.invite.Invite._getString("friendsInviteUpdatesDescription");
			this.invitationFollowHelp = lconn.profiles.invite.Invite._getString("friendsInviteFollowHelp");
		},

		postCreate: function() {
			
			if(this.displayName == null || this.displayName == "") {
				dojo.style(this.friendsColleaguesInviteMessageControl, "display", "none");
				dojo.style(this.invitationTagsLabelControl, "display", "none");				
			}
			
			if(this.invitationFollowControl) {
				this.invitationFollowControl.disabled = ( !this.canFollow || this.isFollowed ); // disable the control if either canFollow is not allowed or already following
				this.invitationFollowControl.checked = ( this.isFollowed || this.canFollow ); // always checked, unless canFollow not allowed
			}

			if(this.invitationFollowHelp && this.invitationFollowHelpDiv) {
				this.invitationFollowHelpDiv.innerHTML = lconn.core.i18nOverrider.replaceParams(this.invitationFollowHelp, ["<a href=javascript:lconn.profiles.invite.Invite.openHelpWindow('/topic/com.ibm.lotus.connections.profiles.help/t_pers_follow.html');>","</a>"]);
			}

			/*
			// RTC 61844: First launch of Invite to My Network automatically resize in Safari
			// commenting out temporarily because originator of this fix does not recall why it was added
			// additionally there is no explanation nor SPR in clearcase.  
			// TODO: after we release 4.0 and there is no safari bug, this width rewriter can be removed
			if(dojo.isSafari) {
				var w = dojo.style(this.domNode, "width");
				dojo.style(this.domNode, "width", "");
				dojo.style(this.domNode, "minWidth", w + "px");
			}
			*/

			this._invitationTagsDataStore = new lconn.core.TypeAheadDataStore({
				queryParam:"tag", 
				url:this.tagTypeaheadUrl
				});
			
			if(this.invitationTagsControl) {
				this.invitationTagsControl.store = this._invitationTagsDataStore;

				if ( !this.canTag && this.invitationTagsControlDiv ) { 
				    dojo.style(this.invitationTagsControlDiv, "display", "none");	
				}
			}
			
			if(this.invitationMessageControl) {
				dojo.style(this.invitationMessageControl, "color", this.defaultInvitationMessageColor);
			}
		},
		
		_invitationMessageControlFocus: function() {
			dojo.style(this.invitationMessageControl, "color", "");
		},
		
		_invitationMessageControlBlur: function() {
			if(this.invitationMessageControl.value == this.invitationMessage || this.invitationMessageControl.value == '') {				
				dojo.style(this.invitationMessageControl, "color", this.defaultInvitationMessageColor);
				this.invitationMessageControl.value = this.invitationMessage;
			}
		},

		onClose: function() {
			//DO NOTHING - CALLBACK - CLOSE DIALOG/PANEL
		},

		sendInviteCallback: function() {
			//DO NOTHING - CALLBACK
		},

		cancelInviteCallback: function() {
			//DO NOTHING - CALLBACK
		},

		_getTagsArray: function(str) {
			var arr = [];
			// get array
			if(str) {
				arr = str.match(/[^\s,]+/g);
				arr = arr || [];
			}
			// cleanup tags array
			for(var i=0; i<arr.length; ++i) {
				var retTag = arr[i];
				retTag = retTag.replace(/&/g,"&amp;"); // replace &	
				retTag = retTag.replace(/"/g,"&quot;"); // replace double quotes 
				retTag = retTag.replace(/'/g,"&apos;"); // replace single quotes 
				retTag = retTag.replace(/</g,"&lt;"); // replace less than braces
				retTag = retTag.replace(/>/g,"&gt;"); // replace greater than braces
				arr[i] = retTag;
			}
			return arr;
		},

		_getTagsString: function() {
			//skip hint text in invitationTagsControl's value
			if(this.invitationTagsControl && this.invitationTagsControl.focusNode && this.invitationTagsControl.focusNode.hasInput) {
				return this.invitationTagsControl.getValue();
			}
			return "";
		},

		friendsSendInvAction: function() {
			var tags = this._getTagsArray(this._getTagsString());
			if(this.invitationMessageControl && this.invitationFollowControl) {
				this.sendInviteCallback(this.invitationMessageControl.value, (this.invitationFollowControl.checked && !this.invitationFollowControl.disabled), tags);
			}
			if( !this.closeOnXhrDone) // since there can be errors that display messages, some integrators may prefer to close the invite dialog only when xhr is done, or user clicks cancel
				this.onClose();
			return false;
		},

		friendsCancelInvAction: function() {
			this.cancelInviteCallback();
			this.onClose();
			return false;
		},
		
		formSubmitted: function(evt){
			this.friendsSendInvAction();
			dojo.stopEvent(evt);
			return false;
		}
});
