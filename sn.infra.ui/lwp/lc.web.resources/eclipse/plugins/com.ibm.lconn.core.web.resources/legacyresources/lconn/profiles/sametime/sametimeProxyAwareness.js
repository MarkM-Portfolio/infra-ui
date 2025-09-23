/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2001, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */
dojo.provide("lconn.profiles.sametime.sametimeProxyAwareness");

dojo.require("lconn.core.utilities");
dojo.require("lconn.core.config.services");
dojo.require("lconn.core.auth");
dojo.require("com.ibm.oneui.util.Url");

dojo.require("lconn.core.util.html");


dojo.requireLocalization("lconn.profiles.sametime", "awareness");

(function() {
	
	if (!dojo.exists("lconn.core.config.services.sametimeProxy")) return;
	
	var sametimeProxy = lconn.core.config.services.sametimeProxy;
	var webresources = lconn.core.config.services.webresources;
	var isConnectClient = sametimeProxy.isConnectClient;
	var scriptInitialized;

	if (dojo.config.isDebug) {
		console.log("Initialize sametime proxy");
	}

	var COOKIE_NAME_STATUS = "lconn.profiles.sametime.currentStatus";
	var COOKIE_NAME_LOGOUT = "lconn.profiles.sametime.userloggedOut";
	var blankGif = dojo.config.blankGif;
	var stServerUrl = '';
	var stProxyLogoutTimeOut = "2000";  //timeout to allow the stproxy to complete logout
	var STATUS, STATES, ICONS;

	var strings = dojo.i18n.getLocalization("lconn.profiles.sametime", "awareness");

	//check to see if there is a stproxy already loaded
	var initialized = (typeof window.stproxy == "object");
	var usesOutsideProxy = (typeof window.stproxy == "object");
	var	menuInitialized, scanCompleted;	
	
	var _availableUsers = [];
	var _initLoadCount = 0;
	
	//#89423 - IE not working well with setting window.stproxyConfig. Please leave 'stproxyConfig' as a global var that is not set on window scope. 
	stproxyConfig = window.stproxyConfig || {};
	
	/* PMR 32927,070,724 - According to sametime team, this should not be modifying these parameters.
	stproxyConfig.tokenLogin = true;
	*/
	//PMR 47042,211,788 - If isConnectClient not set already by sametime, we can set it.
	if (typeof stproxyConfig.isConnectClient === "undefined") {
		stproxyConfig.isConnectClient = isConnectClient;
	}
	
	
	lconn.profiles.sametime.sametimeProxyAwareness.isEnabled = function() {
		return dojo.exists("lconn.core.config.services.sametimeProxy");
	};
	
	
	lconn.profiles.sametime.sametimeProxyAwareness.isAvailable = function(username) {
		var ret = (this.isEnabled() && typeof stproxy == "object");
		
		if (ret && username) {
			ret = !!(_availableUsers[username]);
		}
		
		return ret;		
	};
	
	
	lconn.profiles.sametime.sametimeProxyAwareness.openChat = function(target) {
		if (this.isAvailable(target)) {
			stproxy.openChat(target);
		}	
	};
	
	lconn.profiles.sametime.sametimeProxyAwareness.init = function() {
		if (initialized) {
			onScriptLoad();
			return;
		}
			
		var hasUsername = lconn.core.auth.isAuthenticated();
		var currUser = lconn.core.auth.getUser();
		
		// If hasUsername is true but currUser object is not found, that means the object used by 
		// lconn.core.auth.getUser hasn't yet rendered in the DOM.  We need to wait for it to get
		// rendered before we can proceed so that we can determine whether the current user is external.
		if (hasUsername && currUser == null && _initLoadCount++ <= 10) {
			setTimeout(lconn.profiles.sametime.sametimeProxyAwareness.init, 500);
			return;
		}
		
		initialized = true;
		
		if (hasUsername && currUser && currUser.isExternal === false) {
		   lconn.core.auth.addLogoutHandler(lconn.profiles.sametime.onLogout);		  
			var hostName = window.location.hostname;
			var index = hostName.indexOf(".");
			stproxyConfig.domain = index != -1 ? (hostName.substring(index + 1))
					: "";

			stServerUrl = stproxyConfig.server = com.ibm.oneui.util.Url.secure ? sametimeProxy.secureUrl
					: sametimeProxy.url;
			var tunnerURI = stproxyConfig.tunnelURI = com.ibm.oneui.util.Url.secure ? webresources.secureUrl
					+ '/web/lconn/core/sametime/tunnel.html'
					: webresources.url + '/web/lconn/core/sametime/tunnel.html';

			if(stServerUrl)
				stServerUrl = ensureTrailingSlash(stServerUrl);

			if (dojo.config.isDebug) {
				console.debug("Connecting to Sametime proxy server: "
						+ stServerUrl);
			}

			if (dojo.exists("lconn.core.bizCard.bizCardUtils.loadCss")) {
				lconn.core.bizCard.bizCardUtils.loadCss(stServerUrl	+ "stwebclient/dojo.blue/sametime/themes/WebClientAll.css");
			}
			
			//#81666 
			if (dojo.exists("com.ibm.lconn.gadget.container.iContainer2") && dojo.config.proxy){ /*remarked out for external bizcard*/
				//#75480 - Wait for the commonContainer to finish loading before loading ST OAH
				com.ibm.lconn.gadget.container.iContainer2.getCommonContainer().then(function(commonContainer){
				   commonContainer.setupNonGadgetRpcEndpoint();
				   
				   // save our constructor
				   var originalFunc = OpenAjax.hub.IframeContainer;
				   
				   // save our object properties
				   var originalObj = {};
				   for (var prop in OpenAjax.hub.IframeContainer) {
				      if(OpenAjax.hub.IframeContainer.hasOwnProperty(prop)) {
				         originalObj[prop] = OpenAjax.hub.IframeContainer[prop];
				      }
				   }
				   // replace our constructor
				   OpenAjax.hub.IframeContainer = function( hub, clientID, params){
					   if( clientID == "stiframeproxy"){
						   params.nonGadget = "true";
					   }
					   originalFunc.apply(this, [hub, clientID, params]);
		           };
				   
				   // return our object properties to their original home.
				   for (var prop in originalObj) {
					   if(originalObj.hasOwnProperty(prop)) {
						   OpenAjax.hub.IframeContainer[prop] = originalObj[prop];
					   }
				   }			   
				   if(dojo.config.isDebug)
				      console.log('Initialize ST proxy loading');
				   //#76174
				   //For LC environment, set 'noHub=true' to force stproxy to not load top level OAH
				   //instead always rely on connection preloaded OAH
				   lconn.core.utilities.loadScript(stServerUrl  + "stbaseapi/baseComps.js?noHub=true");
				});
			}else{
			    // load OAH from ST proxy
				lconn.core.utilities.loadScript(stServerUrl  + "stbaseapi/baseComps.js");
			}
			lconn.core.utilities.processUntilAvailable(onScriptLoad, "window.stproxy != null && stproxy.awareness != null",	null, false /* do not throw if test clause not found */);
			
			//Insert timeout to allow ST scripts to load. If none loaded, display error. 
			setTimeout(function(){
				if(!scriptInitialized && window.proxy == null){					
					renderErrorBar();
				}
			}, 20000);
		}else{
	      lconn.core.auth.addLoginHandler(lconn.profiles.sametime.onLogin);
		}
	};

	function onScriptLoad() {
		if (scriptInitialized)
			return;
		scriptInitialized = true;

		//Load remaining scripts after baseBundle has finished loading. 
		if (!usesOutsideProxy) {
			lconn.core.utilities.loadScript(stServerUrl
					+ "stwebclient/livenameLight.js");
			lconn.core.utilities.loadScript(stServerUrl
					+ 'stwebclient/apps/connections.js');
		}
		
		//FIXME: Temporarily expose a flag that indicates awareness is available
		window.sametimeAwarenessEnabled = true;

		if (dojo.config.isDebug) {
			console.debug("Sametime library available");
		}

		if (dojo.isIE) {
			stproxy.addUnloadHandler(function() {
			});
			dojo.addOnWindowUnload(stproxy.login.logout);
		}

		var iconPaths = stproxy.uiControl.iconPaths;
		ICONS = iconPaths;
		STATUS = stproxy.awareness;
		// add a disconnect and loading status 
		STATUS.DISCONNECT = '-1';
		STATUS.LOADING = '-2';

		STATES = {};
		STATES[STATUS.AVAILABLE] = [ iconPaths.iconAvailable,strings.stStatusAvailable ];
		STATES[STATUS.AVAILABLE_MOBILE] = [ iconPaths.iconAvailableMobile,strings.stStatusAvailable ];
		STATES[STATUS.AWAY] = [ iconPaths.iconAway, strings.stStatusAway ];
		STATES[STATUS.AWAY_MOBILE] = [ iconPaths.iconAwayMobile, strings.stStatusAway ];
		STATES[STATUS.DND] = [ iconPaths.iconDnd, strings.stStatusdnt ];
		STATES[STATUS.DND_MOBILE] = [ iconPaths.iconDndMobile, strings.stStatusdnt ];
		STATES[STATUS.IN_MEETING] = [ iconPaths.iconInMeeting,strings.stStatusMeeting ];
		STATES[STATUS.IN_MEETING_MOBILE] = [ iconPaths.iconInMeetingMobile,strings.stStatusMeeting ];
		STATES[STATUS.OFFLINE] = [ blankGif, strings.stUserOffline ];
		STATES[STATUS.DISCONNECT] = [ blankGif, strings.stUserOffline ];
		STATES[STATUS.LOADING] = [ blankGif, strings.stLoadingSTStatus ];
		

		var isStatusCookie = dojo.cookie(COOKIE_NAME_STATUS);
		var currentStatus = getStatus();

		renderTaskBar(STATUS.LOADING); //add a loading status by default
		if (currentStatus == STATUS.DISCONNECT) {
			if (dojo.config.isDebug)
				console.log('lc.st.onScriptload Existing page refresh with disconnect');
			return;
		} else {
			if (dojo.config.isDebug)
				console.log('lc.st.onScriptload Full Login');
			login();
		}

	}
	
	function _destroyActionBar() {
		try {
			var barNode = dojo.byId("lconnSTActionBarContainer");
			if (barNode) {
				barNode.parentNode.removeChild(barNode);
			}
		} catch (e) {}
	}
	
	function renderErrorBar(){
		if (window.lconnAwaressHideActionBar) return;
		_destroyActionBar();	
		var docBody = document.body;
		var htmlContent3 = '';
		var newParentNode = document.createElement("span");
		htmlContent3 = '<div id="lconnSTActionBarContainer" class="lconnSTActionBarContainer" style="z-index: 1">'
					+ '<div class="lconnSTActionBar" role="region" aria-label="'+ strings.stActionBar + '">'
					+ '<span class="lconnSTErrorBtn">'
					+ '<img src="' + blankGif + '" alt="" class="lotusIcon lotusIconMsgWarning lconnSTErrorIcon">&nbsp;&nbsp;'					
					+ strings.stErrorSTServer
					+ '</span>' + '</div>' + '</div>';	
		newParentNode.innerHTML = htmlContent3;
		docBody.appendChild(newParentNode.firstChild);
				
		setTimeout(function() {
			var footerNode = dojo.byId("lotusFooter");
			if (footerNode != null) {
				footerNode.appendChild(document.createElement("br"));
				footerNode.appendChild(document.createElement("br"));
			}
		}, dojo.byId("lotusFooter") ? 1000 : 1);
		
		if (dojo.config.isDebug) {
			console.debug("renderErrorBar: Error bar rendered (unable to reach ST server");
		}
		
		return;	
	}
	

	function renderTaskBar(currentStatus) {
		if (window.lconnAwaressHideActionBar) return;
		_destroyActionBar();
		var docBody = document.body;
		var htmlContent3 = '';
		var newParentNode = document.createElement("span");
		var textContent = STATES[currentStatus][1];
		var iconURL = STATES[currentStatus][0];

		htmlContent3 = '<div id="lconnSTActionBarContainer" class="lconnSTActionBarContainer" style="z-index: 1">'
				+ '<div class="lconnSTActionBar" role="region" aria-label="' + strings.stActionBar + '">'
				+ '<button id="stStatusArea" class="lconnSTBtn" onclick="lconn.profiles.sametime.sametimeProxyAwareness.openMenu(event);" aria-label="'
				+ textContent
				+ '" aria-describedby="STDescriptionID">'
				+ '<img alt="" src="'
				+ iconURL
				+ '" class="lotusStatus"/>&nbsp;'
				+ textContent
				+ '&nbsp;<img alt="" src="'
				+ blankGif
				+ '" class="lotusArrow lotusDropDownSprite" />'
				+ '<span class="lotusAltText">&#9660;</span>'
				+ '<span class="lotusAccess" id="STDescriptionID">'
				+ strings.stViewSTActions
				+ '</span>'
				+ '</button>'
				+ '<button class="lconnSTBtn" onclick="lconn.profiles.sametime.sametimeProxyAwareness.viewbuddylist();" aria-label="'
				+ strings.stViewClient
				+ '" aria-describedby="STchatDescriptionID">'
				+ '<img aria-label="'
				+ strings.stViewClient
				+ '" alt="" src="'
				+ dojo.moduleUrl("com.ibm.lconn.core.styles",
						"images/footerChat.gif")
				+ '" />'
				+ '<span class="lotusAltText">'
				+ strings.stViewClient
				+ '</span>'
				+ '<span class="lotusAccess" id="STchatDescriptionID">'
				+ strings.stChatList
				+ '</span>'
				+ '</button>' + '</div>' + '</div>';

		newParentNode.innerHTML = htmlContent3;
		docBody.appendChild(newParentNode.firstChild);

		setTimeout(function() {
			var footerNode = dojo.byId("lotusFooter");
			if (footerNode != null) {
				footerNode.appendChild(document.createElement("br"));
				footerNode.appendChild(document.createElement("br"));
			}
		}, dojo.byId("lotusFooter") ? 1000 : 1);
		if (dojo.config.isDebug) {
			console.debug("lc.st.sametimeProxyInit logged in user menu link added");
		}
	}
	// FIXME: remove
	lconn.profiles.sametime.sametimeProxyAwareness.renderTaskBar = renderTaskBar;

	function isLoggedOut() {
		var userLoggedOut = dojo.cookie(COOKIE_NAME_LOGOUT) == "true";

		if (dojo.config.isDebug)
			console.log("lc.st.isLoggedOut set to " + userLoggedOut);

		return userLoggedOut;
	}

	function saveLogoutCookie() {
		dojo.cookie(COOKIE_NAME_LOGOUT, "true", {
			expires : 2,
			domain : stproxyConfig.domain,
			path : "/"
		});

		if (dojo.config.isDebug)
			console.log("lc.st.saveLogoutCookie saved logout cookie");

	}

	function removeLogoutCookie() {
		dojo.cookie(COOKIE_NAME_LOGOUT, null, {
			expires : -1,
			domain : stproxyConfig.domain,
			path : "/"
		});

		if (dojo.config.isDebug)
			console.log("lc.st.removeLogoutCookie removed user.logggedOut cookie");
	}

	function saveStatusCookie(stStatus) {
		dojo.cookie(COOKIE_NAME_STATUS, stStatus, {
			expires : 2,
			domain : stproxyConfig.domain,
			path : "/"
		});

		if (dojo.config.isDebug)
			console.log("lc.st.saveStatusCookie saved: " + stStatus
					+ " in currentStatus cookie");
	}

	function removeStatusCookie() {
		dojo.cookie(COOKIE_NAME_STATUS, null, {
			expires : -1,
			domain : stproxyConfig.domain,
			path : "/"
		});

		if (dojo.config.isDebug)
			console.log("lc.st.removeStatusCookie removed current status cookie");
	}

	function getStatus() {
		var currentStatus = parseInt(dojo.cookie(COOKIE_NAME_STATUS));
		if (!(currentStatus in STATES))
			currentStatus = STATUS.AVAILABLE;
		return currentStatus;
	}

	function login() {
		if (dojo.config.isDebug)
			console.log("lc.st.login called");

		if (!stproxy.login) { //wait one second
			console.error("login called before login method available");
			setTimeout(login, 1000);
			return;
		}

		removeLogoutCookie();

		//get the login id of the user from the page
		if (!stproxy.isLoggedIn) {
			var currentStatus = getStatus();

			if (dojo.config.isDebug)
				console.log("lc.st.loginSametimeUser logging in lc user to st with st status: " + currentStatus);

			if (currentStatus == STATUS.OFFLINE || currentStatus == STATUS.DISCONNECT) {
				renderTaskBar(STATUS.OFFLINE);
				return;
			}

			stproxy.login.loginByToken(null, null, null, onUserLogin, onUserLoginError);
		}
	}

	function onUserLoginError(errorMsg) {
		if (dojo.config.isDebug)
			console.log("lc.st.loginUserError: An error has occured. Sametime error code: "	+ errorMsg);
			
		renderTaskBar(STATUS.OFFLINE);
	}

	function onUserLogin(loggedInUserInfo) {
		if (dojo.config.isDebug)
			console.log("lc.st.loginUserSuccess lc user logged into st");

		var loggedInUserDN = loggedInUserInfo.id;

		var model = stproxy.getLiveNameModel(loggedInUserDN);
		dojo.connect(model, "onUpdate", updateActiveUser);

		var menuItem = dijit.byId("ST_LOGIN");
		if (menuItem == null)
			menuItem = dijit.byId("ST_LOGOUT");
		if (menuItem != null)
			dojo.attr(menuItem, "label", strings.stDisconnect);

		if (!scanCompleted){
			//lconn.core.utilities.show('awarenessArea');
			lconn.profiles.sametime.sametimeProxyAwareness.scanPage();
		}
	}

	function buildActionsMenu() {
	   if (dojo.config.isDebug)
	      console.log("lc.st.buildActionsMenu called");

		try {
			var tempMenu = dijit.byId("STLoggedUserMenu");
			if (tempMenu != null)
				tempMenu.destroyRecursive();
		} catch (exception1) {
			console.log(exception1);
		}

		var actionsMenu = new dijit.Menu({
			id : "STLoggedUserMenu"
		});
		if (stproxy.isLoggedIn)
			actionsMenu.addChild(buildActionsMenuItem(strings.stDisconnect,	"LOGOUT"));
		else
			actionsMenu.addChild(buildActionsMenuItem(strings.stConnect, "LOGIN"));

		actionsMenu.addChild(new dijit.MenuSeparator());
		actionsMenu.addChild(buildActionsMenuItem(strings.stStatusAvailable,
				"stStatusAvailable", "stproxy_statusIconAvailable"));
		actionsMenu.addChild(buildActionsMenuItem(strings.stStatusAway,
				"stStatusAway", "stproxy_statusIconAway"));
		actionsMenu.addChild(buildActionsMenuItem(strings.stStatusMeeting,
				"stStatusMeeting", "stproxy_statusIconMeeting"));
		actionsMenu.addChild(buildActionsMenuItem(strings.stStatusdnt,
				"stStatusdnt", "stproxy_statusIconDisturb"));
		
		if (dojo.config.isDebug)
		   console.log("lc.st.buildActionsMenu menu options added");

		var temp = function(item) {
			if (item != null) {

				if (dojo.config.isDebug)
					console.log("lc.st.buildActionsMenu menu action invoke: "
							+ item.action);

				lconn.core.utilities.hide('STLoggedUserMenu', false, true);

				if (item.action == "LOGOUT") {
					saveStatusCookie(STATUS.DISCONNECT);
					//handling disconnect vs. handling connection logout
					return disconnect();
				} else if (item.action == "LOGIN") {
					saveStatusCookie(STATUS.AVAILABLE);
					return login();
				} else if (item.action == "stStatusAvailable") {
					saveStatusCookie(STATUS.AVAILABLE);
					if (stproxy.isLoggedIn)
						stproxy.status.set(STATUS.AVAILABLE,strings.stStatusAvailable);
					else
						login();
				} else if (item.action == "stStatusAway") {

					saveStatusCookie(STATUS.AWAY);

					if (stproxy.isLoggedIn)
						stproxy.status.set(STATUS.AWAY, strings.stStatusAway);
					else
						login();
				} else if (item.action == "stStatusMeeting") {
					saveStatusCookie(STATUS.IN_MEETING);
					if (stproxy.isLoggedIn)
						stproxy.status.set(STATUS.IN_MEETING,strings.stStatusMeeting);
					else
						login();
				} else if (item.action == "stStatusdnt") {
					saveStatusCookie(STATUS.DND);
					if (stproxy.isLoggedIn)
						stproxy.status.set(STATUS.DND, strings.stStatusdnt);
					else
						login();
				}

				dojo.byId("stStatusArea").focus();
			}
			return;
		};
		dojo.connect(actionsMenu, "onItemClick", temp);

		dojo.attr(actionsMenu, {
			href : 'javascript:;'
		});

		return actionsMenu;
	}

	function buildActionsMenuItem(label, action, iconClass) {
		var tempId = "ST_" + action;
		var temp2 = {
			label : label,
			id : tempId
		};

		if (iconClass != null)
			temp2.iconClass = iconClass;

		var item = new dijit.MenuItem(temp2);
		item.action = action;
		dojo.addClass(item.domNode, "lconnStMenuItem");
		
		return item;
	}

	//add the livename
	lconn.profiles.sametime.sametimeProxyAwareness.scanPage = function() {
		if (window.stproxy == null) {//wait one second
			console.error("lc.st.sametimeProxyAddLiveName called but st library not load. waiting 1 sec");
			setTimeout(lconn.profiles.sametime.sametimeProxyAwareness.scanPage, 1000);
			return;
		}

		var nodes = dojo.query(".IMAwarenessDisplayedUser");
		for ( var i = 0; i < nodes.length; i++) {
			if (dojo.config.isDebug)
				console.log("lc.st.sametimeProxyAddLiveName looking for IMAwarenessDisplayedUser");

			var node = nodes[i];
			if (!dojo.hasClass(node, "hasSTStatus")) {
				if (dojo.config.isDebug)
					console.log("lc.st.sametimeProxyAddLiveName found an IMAwarenessDisplayedUser without st awareness set");

				if (!stproxy.isLoggedIn) {
					if (dojo.config.isDebug)
						console.log("lc.st.sametimeProxyAddLiveName lc/st user not logged in. removing any loading msg");

					var renderType = dojo.query(".renderType", node)[0].innerHTML;
					if (renderType == "Icon") {
						var IMContentNode = dojo.query(".IMContent", node)[0];
						IMContentNode.innerHTML = "";
					}
				} else {
					var dnValue = dojo.query(".dn", node)[0].innerHTML;
					var renderType = dojo.query(".renderType", node)[0].innerHTML;
					var IMContentNode = dojo.query(".IMContent", node)[0];
					var livename = null;
					
					if (dojo.config.isDebug){
						console.log("lc.st.sametimeProxyAddLiveName dn: " + dnValue);
						console.log("lc.st.sametimeProxyAddLiveName renderType: " + renderType);
					}
					
					if (renderType == "StatusMsg") {
						livename = new sametime.LiveName({
							"userId" : dnValue
						});
						livename.disableHoverBizCard = true;
					} else if (renderType == "Icon") {
						var userId = dojo.query(".uid", node)[0].innerHTML;
						livename = new sametime.LiveName({
							"userId" : dnValue,
							"uid" : userId
						});
						livename.disableHoverBizCard = true;
					} else if (renderType == "Name") {
						var displayName = dojo.query(".fn", node)[0].innerHTML;
						var userId = dojo.query(".uid", node)[0].innerHTML;
						livename = new sametime.LiveName({
							"userId" : dnValue,
							"displayName" : displayName,
							"uid" : userId
						});
						livename.disableClicks = true;
						livename.disableHoverBizCard = true;
					}

					dojo.connect(livename.model,"onUpdate",	livename, function() {
						if (dojo.config.isDebug)
							console.log("lc.st.sametimeProxyAddLiveName st onUpdate called for: " + dnValue);

						//var foo = stproxy.getLiveNameModel(userId, false, true);
						//var statusmessage = foo.statusMessage
						if (renderType == "StatusMsg")
							createSTStatusMsgLinkAction(
									livename, dnValue,
									IMContentNode);
						if (renderType == "Icon")
							createSTIconLinkAction(livename,
									dnValue, IMContentNode);
						else if (renderType == "Name") {
							if (livename.domNode
									|| livename.domNode != "") {
								IMContentNode.innerHTML = "";
								IMContentNode
								.appendChild(livename.domNode);
							}
						}
					});

					if (livename.model != null) {
						if (dojo.config.isDebug)
							console.log("lc.st.sametimeProxyAddLiveName setting initial st awanareness for: " + dnValue);

						if (renderType == "StatusMsg")
							createSTStatusMsgLinkAction(livename, dnValue,
									IMContentNode);
						else if (renderType == "Icon")
							createSTIconLinkAction(livename, dnValue,
									IMContentNode);

						bizcardSpecial(livename, node, dnValue);
					}
					dojo.addClass(node, "hasSTStatus");
					scanCompleted = true;
				}
			}
		}
		if (dojo.config.isDebug)
		   console.log("lc.st.sametimeProxyAddLiveName ended");
	}

	function bizcardSpecial(livename, node, dnValue) {
		if (dojo.config.isDebug)
			console.log("lc.st.bizcardSpecial setting initial st awanareness for: "	+ dnValue);

		var userId = dojo.query(".uid", node)[0].innerHTML;
		
		if (dojo.config.isDebug)
		   console.log("lc.st.bizcardSpecial uid: " + userId);

		var statusTxt = dojo.byId(userId + "vcardStStatusElem");
		dojo.connect(livename.model, "onUpdate", livename, function() {
			if (dojo.config.isDebug)
				console.log("lc.st.bizcardSpecial st onUpdate called for: "	+ userId);

			this.disableHoverBizCard = true;
			this.disableClicks = true;
			var userId = this.params.uid;
			if (statusTxt && this.model.statusMessage != null
					&& this.model.statusMessage != "") {
				statusTxt.innerHTML = "&nbsp;" + lconn.core.util.html.encodeHtml(this.model.statusMessage);
				dojo.byId(userId + "vcardCommentElem").style.display = "block";
			}
			if (livename.model.status != 0) {
				sametimeProxyChatAction(livename, userId, "ChatAction", dnValue);
				sametimeProxyChatAction(livename, userId, "ChatActionMore", dnValue);
			}
		});

		if (statusTxt != null && livename.model != null
				&& livename.model.statusMessage != null
				&& livename.model.statusMessage != "") {
			statusTxt.innerHTML = "&nbsp;" + lconn.core.util.html.encodeHtml(livename.model.statusMessage);
			dojo.byId(userId + "vcardCommentElem").style.display = "block";
		}
		if (livename.model != null && livename.model.status != 0) //dont show chat for offline users
		{
			//show chat action
			sametimeProxyChatAction(livename, userId, "ChatAction", dnValue);
			sametimeProxyChatAction(livename, userId, "ChatActionMore", dnValue);
		}
	}
	
	// Holder for setTimeout when the status is set to offline.
	// If the status is set to offline, we'll delay it because
	// sometimes it's just a quick disruption or we'll get an offline
	// status from the service when initially loading.
	var offlineTimeoutHolder_ = null;
	
	function updateActiveUser(model) {
		if (dojo.config.isDebug)
			console.log("lc.st.updateLoggedUserArea called");

		var hasUsername = lconn.core.auth.isAuthenticated();
		if (hasUsername && model != null && model.status != null) {
			if (model.status != STATUS.OFFLINE) {
				saveStatusCookie(model.status);
				if (offlineTimeoutHolder_) clearTimeout(offlineTimeoutHolder_);
			}
			if (dojo.config.isDebug)
				console.log("lc.st.updateLoggedUserArea setting up the logged in user header");

			try {
				// internal function to update the status area UI at the bottom of the screen
				var loadStatus_ = function(currentStatus) {
					var stStatusArea = dojo.byId("stStatusArea");

					if (stStatusArea) {
						var textContent = "";
						var iconURL = ICONS.iconAvailable;
						
						if (dojo.config.isDebug)
							console.log("lc.st.updateLoggedUserArea current status : " + currentStatus);

						if (currentStatus == STATUS.AVAILABLE)
							textContent = strings.stStatusAvailable;
						else if (currentStatus == STATUS.AWAY || currentStatus == STATUS.NOT_USING) {
							textContent = strings.stStatusAway;
							iconURL = ICONS.iconAway;
						} else if (currentStatus == STATUS.IN_MEETING) {
							textContent = strings.stStatusMeeting;
							iconURL = ICONS.iconInMeeting;
						} else if (currentStatus == STATUS.DND) {
							textContent = strings.stStatusdnt;
							iconURL = ICONS.iconDnd;
						} else if (currentStatus == STATUS.AVAILABLE_MOBILE) {
						   textContent = strings.stStatusAvailable;
						   iconURL = ICONS.iconAvailableMobile;
						} else if (currentStatus == STATUS.AWAY_MOBILE) {
						   textContent = strings.stStatusAway;
				         iconURL = ICONS.iconAwayMobile;
						} else if (currentStatus == STATUS.IN_MEETING_MOBILE) {
						   textContent = strings.stStatusMeeting;
				         iconURL = ICONS.iconInMeetingMobile;
						} else if (currentStatus == STATUS.DND_MOBILE) {
						   textContent = strings.stStatusdnt;
                     iconURL = ICONS.iconDndMobile;
                  } else if (currentStatus == STATUS.OFFLINE || STATUS.DISCONNECT) {
							iconURL = blankGif;
							textContent = strings.stUserOffline;
						}

						stStatusArea.innerHTML = '<img aria-label="'
								+ textContent
								+ '" alt="" src="'
								+ iconURL
								+ '" '
								+ (dojo.isChrome ? 'style="padding-bottom:3px"' : '')
								+ '/> '
								+ textContent
								+ '&nbsp;<img aria-label="'
								+ strings.stViewSTActions
								+ '" alt="" src="'
								+ blankGif
								+ '" class="lotusArrow lotusDropDownSprite" /><span class="lotusAltText">&#9660;</span>'
								+ '<span class="lotusAccess" id="STDescriptionID">'
								+ strings.stViewSTActions + '</span>';
						stStatusArea.setAttribute("aria-label", textContent);
					}
				
				};
				
				
				var currentStatus = getStatus();
				if (currentStatus == STATUS.OFFLINE) {
					// If we've already got an offline status from the st proxy and this is the first one, 
					// go ahead and setup the function to run.
					if (!offlineTimeoutHolder_) {
						offlineTimeoutHolder_ = setTimeout(function() {
							loadStatus_(currentStatus);
							offlineTimeoutHolder_ = null;
						}, 1000);
					}
				} else {
					// If there is a pending offline status update to render, cancel that and
					// let's just get to the real status update.
					if (offlineTimeoutHolder_) {
						clearTimeout(offlineTimeoutHolder_);
						offlineTimeoutHolder_ = null;
					}
					loadStatus_(currentStatus);
				}
				
			} catch (exception1) {
				console.error("lc.st.updateLoggedUserArea error: "	+ exception1);
			}

			if (dojo.config.isDebug)
				console.log("lc.st.updateLoggedUserArea setting up the logged in user header complete");
		}
	}
	
	function preventFocusWhenChatIsOpen(stid) {
		//if this is opened from the bizcard, then we don't want it pulling the focus away
		if (dojo.exists("LCSemTagMenu") && !dojo.exists("LCSemTagMenu._chatModelConnect")) {
			try {
				LCSemTagMenu.preventFocus_prev = LCSemTagMenu.preventFocus;
				LCSemTagMenu.preventFocus = true;
				LCSemTagMenu._chatModelConnect = dojo.connect(stproxy.getChatModel(stid), "onClose", function() {
					LCSemTagMenu.preventFocus = LCSemTagMenu.preventFocus_prev;
					delete LCSemTagMenu.preventFocus_prev;
					setTimeout(function() {
						dojo.disconnect(LCSemTagMenu._chatModelConnect);
						delete LCSemTagMenu._chatModelConnect;
					}, 100)
				});
			} catch (e) {
				if (window.console) {
					console.error("Unabled to get stproxy chat model.");
					console.error(e);
				}
			}
		}	
	}

	function createSTStatusMsgLinkAction(livename, dnValue, IMContentNode) {
	   if (dojo.config.isDebug)
	      console.log("lc.st.createSTStatusMsgLinkAction called");

		var className = stproxy.uiControl.status[livename.model.status].iconClass;
		if (livename.model.status == STATUS.OFFLINE) {
			if (dojo.config.isDebug)
				console.log("lc.st.createSTStatusMsgLinkAction displayed user not logged in. removing the loading msg");

			var span = document.createElement('span');
			span.innerHTML = "&nbsp;" + strings.stNoStatuAvailable;
			dojo.addClass(span, className);
			IMContentNode.innerHTML = "";
			IMContentNode.appendChild(span);
			_availableUsers[dnValue] = false;
		} else {
			if (dojo.config.isDebug)
				console.log("lc.st.createSTStatusMsgLinkAction setting up the status link for" + dnValue);

			var a = document.createElement('a');
			//might have to use #. IE has issue with using javascript in href
			dojo.attr(a, {
				href : 'javascript:;',//stproxy.openChat(\'' + livename.model.id + '\'); return false;','class':'awareness',           
				title : livename.model.statusMessage,
				'aria-label' : livename.model.statusMessage,
				'aria-describedby' : "STIConDescriptionID",
				innerHTML : getHTMLContent(livename, true)
			});

			
			var temp = function(evt) {
				if (dojo.config.isDebug)
					console.log("lc.st.createSTStatusMsgLinkAction openChat called for"	+ livename.model.id);

				preventFocusWhenChatIsOpen(livename.model.id);
				stproxy.openChat(livename.model.id);
				dojo.stopEvent(evt);
				return false;
			};
			dojo.connect(a, "onclick", temp);

			IMContentNode.innerHTML = "";
			IMContentNode.appendChild(a);
			_availableUsers[dnValue] = true;
		}
	}

	function createSTIconLinkAction(livename, dnValue, IMContentNode) {
		if (livename.model.status == STATUS.OFFLINE) {
			if (dojo.config.isDebug)
				console.log("lc.st.createSTIconLinkAction displayed user not logged in. removing the loading msg");
			IMContentNode.innerHTML = "";
			_availableUsers[dnValue] = false;
		} else {
			if (dojo.config.isDebug)
				console.log("lc.st.createSTIconLinkAction setting up the status link for" + dnValue);

			var a = document.createElement('a');
			//var className =stproxy.uiControl.status[livename.model.status].iconClass;

			//might have to use #. st proxy has issue with using javascript in href
			dojo.attr(a, {
				href : 'javascript:;',//javascript:stproxy.openChat(\'' + dnValue + '\'); return false;', 'class':'awareness',          
				title : livename.model.statusMessage,
				'aria-label' : livename.model.statusMessage,
				style : "text-decoration: none !important; float: left",
				'aria-describedby' : "STIConDescriptionID",
				innerHTML : getHTMLContent(livename, false)
			});
			var temp = function(evt) {
			   if (dojo.config.isDebug)
			      console.log("lc.st.createSTIconLinkAction openChat called for" + dnValue);
				
				preventFocusWhenChatIsOpen(dnValue);
				stproxy.openChat(dnValue);
				dojo.stopEvent(evt);
				return false;
			};

			dojo.connect(a, "onclick", temp);

			IMContentNode.innerHTML = "";
			IMContentNode.appendChild(a);
			_availableUsers[dnValue] = true;
		}
	}

	function getHTMLContent(livename, includeStatusTxt) {

		var currentStatus = livename.model.status;
		var imagePath = "";
		if (currentStatus == STATUS.AVAILABLE)
			imagePath = ICONS.iconAvailable;
		else if (currentStatus == STATUS.AWAY
				|| currentStatus == STATUS.NOT_USING)
			imagePath = ICONS.iconAway;
		else if (currentStatus == STATUS.IN_MEETING)
			imagePath = ICONS.iconInMeeting;
		else if (currentStatus == STATUS.DND)
			imagePath = ICONS.iconDnd;
		else if (currentStatus == STATUS.AVAILABLE_MOBILE)
			imagePath = ICONS.iconAvailableMobile;
		else if (currentStatus == STATUS.AWAY_MOBILE)
			imagePath = ICONS.iconAwayMobile;
		else if (currentStatus == STATUS.IN_MEETING_MOBILE)
			imagePath = ICONS.iconInMeetingMobile;
		else if (currentStatus == STATUS.DND)
         imagePath = ICONS.iconDndMobile;
		

		var htmlContent = "";
		if (imagePath != "") {
			htmlContent = '<img src="'
					+ imagePath
					+ '" alt=""  aria-label="'
					+ lconn.core.util.html.encodeHtmlAttribute(livename.model.statusMessage)
					+ '">'
					+ '<span class="lotusAltText">'
					+ lconn.core.util.html.encodeHtml(livename.model.statusMessage)
					+ '</span>'
					+ '<span class="lotusAccess" id="STIConDescriptionID">'
					+ strings.stStartChat
					+ '</span>';
		}
		if (includeStatusTxt) {
			if (!dojo.isIE)
				htmlContent = "&nbsp;" + htmlContent;

			htmlContent += "&nbsp;" + lconn.core.util.html.encodeHtml(livename.model.statusMessage);
		} else
			htmlContent += "&nbsp;";

		return htmlContent;
	}

	//sametime proxy chat action
	function sametimeProxyChatAction(livename, userId, chatDiv, dnValue) {
		var chatSection = dojo.byId(userId + chatDiv);
		if (chatSection) {
			var chatLink = chatSection.childNodes[0]; //the first element
			chatLink.onclick = function() {
				stproxy.openChat(livename.model.id);
			};
			chatSection.style.display = "";
		}
	}
	function disconnect() {
	   if (dojo.config.isDebug)
	      console.log("lc.st.disconnect called");
		stproxy.login.logout(true, disconnectCallBack, disconnectErrorHandler);
	}
	function disconnectErrorHandler() {
		console.log("lc.st.disconnectErrorHandler: An Error has occured. Sametime error code: "	+ errorMsg);
	}
	function disconnectCallBack() {
	   if (dojo.config.isDebug)
	      console.log("lc.st.disconnectCallBack called");

		var menuItem = dijit.byId("ST_LOGOUT");
		if (menuItem == null)
			menuItem = dijit.byId("ST_LOGIN");
		if (menuItem != null)
			dojo.attr(menuItem, "label", strings.stConnect);
	}

	lconn.profiles.sametime.onLogout = function(){
	   var dfd = new dojo.Deferred();
	   if(window.stproxy && window.stproxy.isLoggedIn)
	      lconn.profiles.sametime.logout(true);
	      
	   // Allow for the st proxy logout to finish
	   setTimeout(function(){dfd.callback();},1000);
	   return dfd;
	};
	lconn.profiles.sametime.onLogin = function(){
	   // clean cookies on login	   
	   removeStatusCookie();
      saveLogoutCookie();
      
	};
	/**
	 * The next three function exposed globally
	 */
	lconn.profiles.sametime.logout = function(isRealLogout) {
	   if (dojo.config.isDebug)
	      console.log("lc.st.logout called");
		stproxy.login.logout(isRealLogout,
				lconn.profiles.sametime.logoutCallBack,
				lconn.profiles.sametime.logoutErrorHandler);
	};

	lconn.profiles.sametime.logoutErrorHandler = function(errorMsg) {
		console.log("lc.st.logoutErrorHandler: An Error has occured. Sametime error code: " + errorMsg);
	};

	lconn.profiles.sametime.logoutCallBack = function() {
	   if (dojo.config.isDebug)
	      console.log("lc.st.logoutCallBack called");
		
		removeStatusCookie();
		saveLogoutCookie();

		var menuItem = dijit.byId("ST_LOGOUT");
		if (menuItem == null)
			menuItem = dijit.byId("ST_LOGIN");
		if (menuItem != null)
			dojo.attr(menuItem, "label", strings.stConnect);
	};

	function ensureTrailingSlash(s) {		
		var lastIndex = s.length - 1;
		if (s.charAt(lastIndex) == "/")
			return s;
		return s + "/";
	}

	//FIXME: Exposed globally for the markup
	lconn.profiles.sametime.sametimeProxyAwareness.viewbuddylist = function() {
	   if (dojo.config.isDebug)
	      console.log("lc.st.viewbuddylist called");

		var stChatWindow = window
				.open(ensureTrailingSlash(stproxyConfig.server)
						+ "stwebclient/popup.jsp#{%27disableXDomain%27:true}",
						"stChatWindow",
						"status=0,toolbar=0,location=0, menubar=0,width=350,height=550");
		stChatWindow.focus();

		return false;
	};

	//FIXME: Exposed globally for the markup
	lconn.profiles.sametime.sametimeProxyAwareness.openMenu = function(evt) {
	   if (dojo.config.isDebug)
	      console.log("lc.st.openMenu called");

		try {
			var actionsMenu = buildActionsMenu();
			menuUtility.openMenu(evt, actionsMenu.id);
			dojo.stopEvent(evt);
		} catch (e) {
			console.log(e);
		}
	};

	dojo.addOnLoad(lconn.profiles.sametime.sametimeProxyAwareness.init);

})();
