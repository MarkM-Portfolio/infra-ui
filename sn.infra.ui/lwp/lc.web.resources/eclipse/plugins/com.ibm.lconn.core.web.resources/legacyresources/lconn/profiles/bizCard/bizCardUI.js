/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2009, 2022                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */
dojo.provide("lconn.profiles.bizCard.bizCardUI");

dojo.require("lconn.core.bizCard.bizCardUtils");
dojo.require("lconn.core.util.html");
dojo.require("lconn.profiles.invite.Invite");
dojo.require("dojo.cookie");
(function() {

//Our encapsulated reference to dojo.  
//On init, this is set from lconn.core.bizCard.bizCardUtils.getDojoObject in case that has been set to a scoped dojo.
var _d = dojo;
var friendsInviteTitle = lconn.profiles.invite.Invite._getString('personInNetwork'); 
var emailIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 32 32" aria-hidden="true" role="presentation" data-mui-test="emailIcon" style="font-size: 1.7em; padding-top:18px; width: 21px; color: #3D5466; height: 19.5px;"><path d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-2.2 2L16 14.78 6.2 8zM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24z"></path></svg>';
var chatIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 32 32" aria-hidden="true" role="presentation" data-mui-test="chatIcon" style="font-size: 1.7em; padding-top:20px;  width: 21px; height: 19.5px;">\n' +
	'    <path d="M17.74 30L16 29l4-7h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4.84z"></path>\n' +
	'    <path d="M8 10h16v2H8zm0 6h10v2H8z"></path></svg>';
var ellipsisIcon = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 32 32" aria-hidden="true" role="presentation" data-mui-test="overflow-menu--verticalIcon" style="font-size: 3em; color:#3D5466;height:20px; width:20px;float:right;"><circle cx="16" cy="6" r="2"></circle><circle cx="16" cy="16" r="2"></circle><circle cx="16" cy="26" r="2"></circle></svg>';
var disableToAddNetwork = '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 32 32" aria-hidden="true" role="presentation" data-mui-test="user--adminIcon" style="font-size: 1.8em; color:#999999; margin: 4px 3px;"><title>'+ friendsInviteTitle +'</title><path d="M12 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm3-13.82l-2.59-2.59L21 15l4 4 7-7-1.41-1.41L25 16.18z"></path></svg>';
var uiEnabled = false;
var statusIcon = '';
var inviteState = '';
var connectionStatus = '';
lconn.profiles.bizCard.bizCardUI = {
	messages: {},
	isDebug: false,
	isSlim: false,
	isExpandable: true,
	isEmailEnabled: true,
	wndh_vCard: null, // window handle to the download vcard window 
	initited: false,
	
	mainNodeId: "bc_document_node",
	
	init: function() {
		if(this.initited == false)
		{
			_d = lconn.core.bizCard.bizCardUtils.getDojoObject();
			dojo.requireLocalization("lconn.profiles.bizCard", "ui");

			dojo.ready(function() {
				var ui = window["ui"];
				if (ui && typeof ui["_check_ui_enabled"] === "function") {
					uiEnabled = ui["_check_ui_enabled"]();
				}
			});

			this.messages = _d.i18n.getLocalization("lconn.profiles.bizCard", "ui");
			window.SemTagPerson = window.SemTagPerson || {};
			SemTagPerson.services = SemTagPerson.services || [];
		}
	},
	
	followUser: function(key, loginUser, ele){
		if (!dojo.exists("lconn.profiles.invite.Invite")) {
			try {
				net.jazz.ajax.xdloader.load_async("lconn.profiles.invite.Invite", dojo.hitch(this, function() {
					this.followUser(key, loginUser, ele);
				}));
			} catch (e) {
				if (window.console) console.error("Unable to load invite module");
			}
			return;
		}
		lconn.profiles.invite.Invite.followUser(lconn.core.bizCard.bizCardUtils.getBaseURL("hcard"), key, loginUser, dojo.byId('bizFollowBtn'));
	},

	fetchAppRegistryExtensions: function() {
		console.log("Entering fetchAppRegistryMethod");
		var query = {};

		if (dojo.locale) {
			query['locale'] = dojo.locale;
		}
		var sQuery = dojo.objectToQuery(query);
		if (sQuery.length > 0) sQuery = "&" + sQuery;
		
		var APPREGISTRY_QUERY_SERVICES = "Connections"; // use 'Connections' as the service for appreg v3 extensions
		var APPREGISTRY_QUERY_APPS_URL = "/appregistry/api/v3/services/" + APPREGISTRY_QUERY_SERVICES + "/extensions?limit=199" + sQuery;
		if (this.isDebug) console.log("The appreg url: ", APPREGISTRY_QUERY_APPS_URL);

		var startTime = new Date().getTime();
		console.log("Getting the registered applications from AppRegistry, startTime : " + startTime);
		
	    var appregExtensions = dojo.xhrGet({
	    	url: APPREGISTRY_QUERY_APPS_URL,
	    	handleAs: "json"
		});

	    console.log("Exiting fetchAppRegistryMethod");
		return appregExtensions;
	},

	getExtensionPayload: function(appRegExtensions) {
		var extensionPayloads = {};

		if (!appRegExtensions) return null; // if no applications, done.
		if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Going to loop extensions, extensions.length=" + appRegExtensions.length);

		// loop through applications
		for (var i=0; i < appRegExtensions.length; i++) {			
			var extension = appRegExtensions[i];
			if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("application.extension: " + JSON.stringify(extension));
			if (!(extension && extension.type)) continue; // if extension doesn't have type, invalid (continue to next extension).
			switch (extension.type) {
				case "com.ibm.action.delete" :
					// handle delete
					if (extension.path == ".chat" ) {
						if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Going to disable connection chat");
						this.isDisableConnChatExt = true; 
					}
					if (extension.path == ".stmeetings" ) {
						if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("Going to disable connection meetings");
						this.isDisableConnMeetingsExt = true;
					}
					if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("scbizcard appregextensions: deleted item '" +extension.path +"'");
					break;
				case "com.hcl.appreg.ext.templatedLink" :
					if(extension.payload.locator && extension.object === "com.hcl.appreg.object.person"){
						extensionPayloads[extension.payload.locator] = extension.payload;
					}
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.log("scbizcard appregextensions: add item '" +extension.ext_id +"'");
				break;
			default:
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.info("scbizcard appregextensions: unrecognized extension type: " +extension.type);
				break;
			}  // switch
		}
		return extensionPayloads; // for i
	},

    /**
     * Substitute placeholders in the provided 'url' template string by values defined in the provided 'map' key-value pair object.
     * Placeholders should be in format of '${key}', in which 'key' should be defined in the 'map' object for value lookup.
     * 
     * Supports 2 forms of placeholders for flexibility:
     * 1). ${key} (without exclamation mark) - values will be substituted with encodeURIComponent() value.
     * 2). ${!key} (with exclamation mark) - values will be substituted with the original value, without encodeURIComponent().
     * 
     * If 'key' is not found in the 'map' object, the placeholder will leave unchanged in the returned 'url' string.
     * 
     * @param {String} url - original url
     * @param {Map<String name, String value>} - key-value pair object
     * @return {String} the processed url. If 'key' not found in the 'map' object, or the 'url'/'map' is empty,
     *   return the original 'url'.
     */
    replaceUrl: function(url, map) {
		if( !url || !map ) {
		  return url;
		}
		Object.keys(map).forEach(function(key) {
		  if(key) {
			var value = map[key] ? map[key] : '';
			if(url.indexOf('${'+key+'}') !== -1) {
			  url = url.replace('${'+key+'}', encodeURIComponent(value));
			}
			if(url.indexOf('${!'+key+'}') !== -1) {
			  url = url.replace('${!'+key+'}', value);
			}
		  }
		});

		return url;	
	  },
	
	//Popup biz card
	getMenuData: function(person, bidi, menuItems, selector, header, footer, bIsSlim, bIsExpandable, extensionPayloads)
	{
		try {
			var slimCookieState = (dojo.cookie)?dojo.cookie("card.popup.slim"):null;
			
			//if there are no service links, nothing to expand
			var needsHeader = true;
			if (!person.X_bizCardServiceLinks || person.X_bizCardServiceLinks.length == 0) {
				needsHeader = false;
				this.isExpandable = false;
			}
			
			// Slim or Full Size?
			if( typeof(bIsSlim) != "undefined" && bIsSlim != null ) // override default full/slim card if parameter is supplied 
				this.isSlim = bIsSlim;  
				
			else if ( slimCookieState != null) // check for full/slim state as saved in cookie
				this.isSlim = ( slimCookieState == 1 );
			
			// Expandable?
			if( typeof(bIsExpandable) != "undefined" ) 
				this.isExpandable = bIsExpandable; // default is expandable 
			
			// email enablement
			if(person != null){
				this.isEmailEnabled = ( person.email != null && person.email.internet != null ); 
			}else{
				this.isEmailEnabled = false;
			}
			
			if (this.isDebug) {
				console.log("slim? " + this.isSlim );
				console.log("expandable? " + this.isExpandable );
				console.log("email? " + this.isEmailEnabled );
			}
			
			var baseURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
	
			if(lconn.core.header == null && dojo.isIE){
				header.write('<div id="b' + this.mainNodeId + '" role="document" aria-live="polite" class="lotusui30 lotusui30_ie">');
			}else{
				header.write('<div id="' + this.mainNodeId + '" role="document" aria-live="polite" class="lotusui30">');
			}
			
			header.write('<div id="cardDiv" class="lotusVCard" style="width: 360px; height:146px; position: static; opacity: 1;">');
			if(!uiEnabled){
			  header.write('<div id="A11YReader" role="alert" style="position:absolute; display:none; line-height:0; max-height:0; font-size:0; outline:0;">' + this.messages["label.bizcard.dismiss"] + '</div>'); 
			}
			header.write('<div id="A11Yblank" tabindex="0" onfocus="LCSemTagMenu.focusA11Y();" style="line-height:0; max-height:0; font-size:0; outline:0;"></div>'); 
			
			header.write('<table id="cardTable" class="lotusContainer" cellspacing="0">');
			header.write('<tbody>');
			
			//Display top action links only for old UI
			if (person != null && person.X_inDirectory != null && person.X_inDirectory == "true"){
				header.write('<tr id="cardHeader" ' + ((uiEnabled || this.isSlim || !needsHeader) ? 'style="display:none"' : '') + '><td><table role="list" aria-label="application links" cellspacing="0" width="100%">');			
				this.writeHeaderUIContent(header, person, false);
				header.write('</table></td></tr>');			
			}
	
			header.write('<tr id="cardBody"><td class="lotusDetails"' + ((person != null && person.X_inDirectory != null && person.X_inDirectory == "true") ? '' : 'style="padding-bottom: 0px;"') + 'colSpan="6">');
			this.writeBodyUIContent(person, bidi, menuItems, selector, header, footer, baseURL);
			header.write('</td></tr>');
	
			if(person != null && person.X_inDirectory != null && person.X_inDirectory == "true" && person.X_isActiveUser && person.X_isActiveUser == "true"){
				lconn.profiles.bizCard.bizCardUI.writeFooterUIContent(person, bidi, menuItems, selector, header, footer, baseURL, extensionPayloads);				
			}
			
			header.write('</tbody></table>');
	
			header.write('<div id="A11YLast" onfocus="LCSemTagMenu.focusA11Y();" style="line-height:0px; max-height: 0px; font-size:0px; outline:0;" tabindex="0">&nbsp;</div>'); // A11Y
			header.write('</div></div>');
			this.isSlim = false; //set back to default
		}
		catch(ex) {
			alert(ex.message);
		}
	},

	writeHeaderUIContent: function(buffer, person, isInline)
	{
		this.writeLinks(buffer, person, isInline);
	},

	writeBodyUIContent: function(person, bidi, menuItems, selector, header, footer, baseURL)
	{
		this.getSubUIContent(person, bidi, menuItems, selector, header, footer, baseURL);
	},

	extractProfileAttribute: function(rawUrl,patten1) {
        var p = patten1.exec(rawUrl);
        if (p != null && p.length > 0) {
          return p[0].substring(2, p[0].length - 1).trim();
        }
        return null;
    },

	generateWebmeetingUrl: function (data, url) { 
		data = JSON.parse(JSON.stringify(data));
		data.email = data.email.internet;
		var rawUrl = url;
		var patten1 = /\$\{\s*[A-z]*\s*\}/g;
		var profileAttr = this.extractProfileAttribute(rawUrl, patten1);
		if (profileAttr != null) {
			var result;
			dojo.xhrGet({
				url:"/profiles/atom/profileExtension.do?extensionId="+ profileAttr + "&key=" + data.key,
				handleAs: "text",
				sync: true,
				load: function(data,response){
					if (response.xhr.status === 200) {		
						result = data;
					}
					else if (response.xhr.status === 204) {
						console.error("No content available for profile extension attribute "+ data);
						return false;
					}
				},
				error:function(err){
					console.error("Error while retreiving profile extension attribute "+ data);
					console.error(err);
					return false;
				}
			});
			return result;
		}
	},

	generateChatUrl: function (data, url) {
		data = JSON.parse(JSON.stringify(data));
		data.email = data.email.internet;
		var pattern1 = /\$\{\s*[A-z]*\s*\}/g, resolvedUrl;

		if (pattern1.test(url)) {
			resolvedUrl = url.replace(pattern1, function (para) {
				var key = para.substring(2, para.length - 1).trim();
				if (data[key]) {
					return data[key];
				}
				else { 
					var result;
					dojo.xhrGet({
						url:"/profiles/atom/profileExtension.do?extensionId="+ key + "&key=" + data.key,
						handleAs: "text",
						sync: true,
					   	load: function(data,response){
							if (response.xhr.status === 200) {		
								result = data;
							}
						   	else if (response.xhr.status === 204) {
								console.error("No content available for profile extension attribute "+ data);                               
							   	return false;							  
						  }
						},
						error:function(err){
							console.error("Error while retreiving profile extension attribute "+ data);
							console.error(err);
							return false;
						}
					}); 
					return result;
				}				
			});
		}
		else { 
			if(uiEnabled){
				resolvedUrl = url.replace('${!emails}', data.email);
			} else {
				resolvedUrl = url;
			}
		}
		return resolvedUrl;
	},

	writeFooterUIContent: function( person, bidi, menuItems, selector, header, footer, baseURL, extensionPayloads)
	{
		var messages = this.messages;
		header.write('<tr id="cardFooter"'+((this.isSlim)?'style="display:none"':'') + '>');
		header.write('<td colSpan="' + (uiEnabled ? '2' : '6') + '">');

		if (person.X_inDirectory) {
			header.write('<div class="lotusPersonActions">');
			header.write('<ul class="lotusInlinelist" style="'+ (uiEnabled ? 'display: flex; margin-top: 8px;' : 'display: flex; margin: 34px 47px 0px 0px; float: right;') + '">');

			var isBidi = (typeof (SemTagSvcConfig) != "undefined" && SemTagSvcConfig.isBidiRTL);
			var personIdentifier = (person.X_bizCardSTInputType == "uid" ? person.uid : person.email.internet);
			var userLoggedIn = (person.X_loggedInUserKey != null && person.X_loggedInUserKey != "");
			//var personEmail = person.email.internet;

			// if chat or webmeeting extension
			if (extensionPayloads && userLoggedIn && extensionPayloads['chat'] || extensionPayloads && userLoggedIn && extensionPayloads['webmeeting'] && person.X_lconn_userid!==person.X_loggedInUserId) {
				var chatExtension = extensionPayloads['chat'];
				if (chatExtension) {
					var url = this.generateChatUrl(person, chatExtension.href);
					if (lconn.core.bizCard.bizCardUtils.isDebug) console.log('the chatExtension: ', chatExtension);
					try {
						if (uiEnabled) {
							var chatLink = '<a id="javlinFooterActionChat" role="button" aria-disabled="false" aria-label="' + chatExtension.text + '" href="' + url + '" target="' + chatExtension.target + '"title="' + chatExtension.text + '">' + chatIcon + '</a>';
						} else {
							var chatLink = '<a id="javlinFooterActionChat" role="button" aria-disabled="false" aria-label="' + chatExtension.text + '" href="' + url + '" target="' + chatExtension.target + '">' + chatExtension.text + '</a>';
						}
						header.write('<li id="' + personIdentifier + 'ChatAction" ' + (isBidi && !extensionPayloads['chat'] ? 'class=""' : 'class="lotusFirst"') + ' >' + chatLink + '</li>');
					} catch (err) {
						console.log('write chat extension failed: ', err);
					}
				}
				var webmeetingExtension = extensionPayloads['webmeeting'];
				if (webmeetingExtension) {
					var meetingUrl = this.generateWebmeetingUrl(person, webmeetingExtension.href);
					if (lconn.core.bizCard.bizCardUtils.isDebug) console.log('the webmeetingExtension: ', webmeetingExtension);
					try {
						header.write('<li id="' + personIdentifier + 'WebmeetingAction" ' + (extensionPayloads['chat'] ? 'class=""' : 'class="lotusFirst"') + 'style="display:block;">' +
							'<a id="javlinFooterActionChat" role="button" aria-disabled="false" aria-label="' + webmeetingExtension.text + '" href="' + meetingUrl + '" target="' + webmeetingExtension.target + '">' + webmeetingExtension.text + '</a>' +
							'</li>');
					} catch (err) {
						console.log('write webmeeting extension failed: ', err);
					}
				}
				if (typeof (SemTagSvcConfig) != "undefined" && SemTagSvcConfig.isBidiRTL)
					header.write('<li class="lotusFirst"></li>');

				header.write('<li ' + (isBidi ? 'class="lotusFirst"' : '') + '>' + this.getEmailActionLink(person, 0, true) + '</li>');

				if (isBidi)
					header.write('<li class="lotusFirst"></li>');
			} else if (person.X_bizCardActions.length > 0 && !uiEnabled) {
				header.write('<li ' + (isBidi ? 'class=""' : 'class="lotusFirst"') + '>' + this.getEmailActionLink(person, 0, true) + '</li>');

				if (isBidi)
					header.write('<li class="lotusFirst"></li>');
			}

			// if awareness
			if (person.X_bizCardSTAwareness || person.X_bizCardSecureSTAwareness || (window.sametimeAwarenessEnabled && userLoggedIn)) {
				if (person.X_STChatAction) {
					/*'<img class="iconsComponents16 iconsComponents16-Chat16" src="' + dojo.config.blankGif + '" alt="" /> '+ */
					header.write('<li id="' + personIdentifier + 'ChatAction" ' + (isBidi ? 'class="lotusFirst"' : '') + ' style="display:none;">' +
						'<a href="javascript:void(0);" onclick="lconn.profiles.bizCard.bizCard.sametimeStart(\'chat\', \'' + personIdentifier + '\');return false;">' +
						messages.personCardChat +
						'</a>' +
						'</li>');
				}

				if (typeof (SemTagSvcConfig) != "undefined" && SemTagSvcConfig.isBidiRTL)
					header.write('<li class="lotusFirst"></li>');
			}

			// has more actions
			if (person.X_bizCardActions.length > 1) {
				if(!uiEnabled) {
					var dropDownIcon = '<img class="otherFramework16 otherFramework16-TriangleMediumGrayDown12" src="' + dojo.config.blankGif + '" title="' + messages.personCardMoreActionsAltText + '">';
					var moreActionLink = '<a role="button" href="javascript:void(0);" onclick="lconn.profiles.bizCard.bizCardUI.displayMore(\'' + person.key + 'MoreActionMenu\',this.parentNode.parentNode);event.cancelBubble=true;return false;">' +
						messages.personCardMoreActions + dropDownIcon + '</a>';
					header.write('<li ' + (personIdentifier == "" || isBidi ? 'class="lotusFirst"' : '') + '>' + moreActionLink + '</li>');
				}
			}

			header.write('</ul>' + '</div>');

			// has more actions
			if (person.X_bizCardActions.length > 1 || (extensionPayloads && extensionPayloads['chat']) || (personIdentifier != "" && (person.X_bizCardSTAwareness || person.X_bizCardSecureSTAwareness))) {
				var chatExtension;
				var webmeetingExtension;
				if (extensionPayloads && extensionPayloads['chat']) {
					chatExtension = extensionPayloads['chat'];
				}
				if (extensionPayloads && extensionPayloads['webmeeting']) {
					webmeetingExtension = extensionPayloads['webmeeting'];
				}
				this.writeMoreActionsMenu(header, person, baseURL, false, null, chatExtension, webmeetingExtension);
			}

			if (uiEnabled) {
				header.write('</td>');
				header.write('<td colspan="3">');

				header.write('</td>');
				header.write('<td>');
				header.write('<div class="lotusPersonActions">');

				// header.write('<div class="dropdown"> <button onclick="lconn.profiles.bizCard.bizCardUI.displayNewActions()" class="dropbtn">Dropdown</button>');

				header.write('<div class="dropdown"> <a class="dropbtn" role="button" href="javascript:void(0);" onclick="lconn.profiles.bizCard.bizCardUI.displayNewActions();event.cancelBubble=true;return false;">' +
					ellipsisIcon + '</a>');
				header.write('<div id="myDropdown" class="dropdown-content"></div>');
				this.getActionLink(person, 0, false, messages, function (data) {
					if (dojo.byId('myDropdown') && data) {
						dojo.byId('myDropdown').innerHTML = data;
					}
				});
				header.write('</div>');	
				}
			}
		header.write('</td></tr>');
	},
	
	getActionLink: function (person, index, inclIcon, message, actionCallback) {
		var iconAction = person.X_bizCardActions[index];
		var icon = "";
		if (uiEnabled) {
			if (!inclIcon) {
				var menuAction = person.X_bizCardServiceLinks;
				var newAction = {};
				var result = dojo.xhr(
					"GET",
					{
						url: window.location.origin + "/profiles/json/semanticTagProfileView.do?userid=" + person.X_lconn_userid + "&auth=true",
						cache: 'no-cache',
					}
				);
				result.then(function (response) {
					data = result.ioArgs.xhr;
					newAction = JSON.parse(data.response);
					var newObj = newAction.X_bizCardActions;
					var finalList = '';
					for (var i = 0; i < newObj.length; i++) {
						if (!newObj[i].hasOwnProperty('icon')) {
							if ((person.X_lconn_userid === person.X_loggedInUserId) && (newObj[i].label !== lconn.profiles.invite.Invite._getString("friendsInvite"))) {
								finalList += '<a href="' + newObj[i].urlPattern + '" title="' + newObj[i].label + '">' + newObj[i].label + '</a>';
							}
							if (person.X_lconn_userid !== person.X_loggedInUserId) {
								if ((connectionStatus === 'unconfirmed' || connectionStatus === 'accepted') && newObj[i].label !== lconn.profiles.invite.Invite._getString("friendsInvite")) {
									finalList += '<a href="' + newObj[i].urlPattern + '" title="' + newObj[i].label + '">' + newObj[i].label + '</a>';
								} else {
									finalList += '<a href="' + newObj[i].urlPattern + '" title="' + newObj[i].label + '">' + newObj[i].label + '</a>';
								}
							}
						}
					}
					var resultList = finalList + ((person.X_isExternal === 'true') ? '<a href="' + menuAction[0].href + '" style="border-bottom: 1px solid #c4c4c4;" title="' + menuAction[0].name + '"> ' + message['label.bizcard.fullProfile'] + '</a>' : '<a href="' + menuAction[0].href + '" style="border-bottom: 1px solid #c4c4c4;" title="' + menuAction[0].name + '"> ' + message['label.bizcard.fullProfile'] + '</a><a href="' + menuAction[4].href + '" title="' + menuAction[4].name + '">' + message['label.bizcard.activities'] + '</a><a href="' + menuAction[1].href + '" title="' + menuAction[1].name + '">' + message['label.bizcard.communities'] + '</a><a href="' + menuAction[5].href + '" title="' + menuAction[5].name + '">' + message['label.bizcard.files'] + '</a><a href="' + menuAction[2].href + '" title="' + menuAction[2].name + '">' + message['label.bizcard.forums'] + '</a><a href="' + menuAction[6].href + '" title="' + menuAction[6].name + '">' + message['label.bizcard.bookmarks'] + '</a><a href="' + menuAction[3].href + '" title="' + menuAction[3].name + '">' + message['label.bizcard.blogs'] + '</a><a href="' + menuAction[7].href + '" title="' + menuAction[7].name + '">' + message['label.bizcard.wikis'] + '</a>');
					return actionCallback(resultList);
				}, function (err) {
					console.error('An error occured:', err);
				});
			}
		} else {
			if (inclIcon && typeof(iconAction.icon) != "undefined") {
			icon = '<img src="'+iconAction.icon.href+'"/> ';
			}
			var id = '';
			if(iconAction.urlPattern.indexOf('followUser')!=-1){  //This is a hack just for 3.0, need to be refined in next release
				iconAction.label = this.getFollowActionLabel(person, iconAction);
				id = ' id="bizFollowBtn"';
			}
			return '<a class="email" ' + id + ' href="' + iconAction.urlPattern + '">' + icon + iconAction.label + '</a>';
		}	
	},

	getEmailActionLink: function(person, index, inclIcon)
	{
		var action = person.X_bizCardActions[index];
		var icon = "";

		if (inclIcon && typeof(action.icon) != "undefined") {
			icon = '<img src="'+action.icon.href+'"/> ';
		}

		var id = '';
		if(action.urlPattern.indexOf('followUser')!=-1){  //This is a hack just for 3.0, need to be refined in next release
			action.label = this.getFollowActionLabel(person, action);
			id = ' id="bizFollowBtn"';
		}
		
		if(action.label)
			if (uiEnabled) {
				icon = emailIcon;
				return '<a class="email" '+id+' href="' + action.urlPattern + '" title="'+action.label+'">' + icon + '</a>';
			} else {
				return '<a class="email" '+id+' href="' + action.urlPattern + '">' + icon + action.label + '</a>';
			}
		else
			return '';
	},

	getFollowActionLabel: function(person, action) {
	        var curUser = window.X_loggedInUserKey;
		if(curUser && curUser != person.key && person.X_isFollowedEnabled){
			var nls = this.messages;
			return person.X_isFollowed != "false" ? nls.personCardUnfollow: nls.personCardFollow;
		}
		return null;
	},
	
	getSubUIContent: function(person, bidi, menuItems, selector, header, footer, baseURL)
	{
		var messages = this.messages;
		var userLoggedIn = (person.X_loggedInUserKey != null && person.X_loggedInUserKey != "");
		if (window.sametimeAwarenessEnabled && userLoggedIn) {
			statusIcon = '<span class="IMAwarenessDisplayedUser">' +
				'<span style="display: none;" class="renderType">Icon</span>' +
				'<span style="display: none;" class="dn">' + person.dn + '</span>' +
				'<span style="display: none;" class="uid">' + person.uid + '</span>' +
				'<span id="IMcontent" class="IMContent"><img alt="' + messages['loadingSTStatus'] + '" src="' + baseURL + '/nav/common/styles/images/loading.gif">&nbsp;</span>' +
				'</span>';
		}
		// Profile found
		if( person != null && person.X_lconn_userid ) {
			
			// Active user
			if( person.X_isActiveUser != "false" ) { 
				if( this.isExpandable && person.X_inDirectory == "true" ) this.writeExpandoUIContent( header, baseURL );
				if (person.X_bizCardShowPhoto) {
					if (uiEnabled) {
						if (person.X_inDirectory == "true")
							header.write('<div class="lotusPhoto photo" style="position: relative;"><img src="' + person.photo + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" style="border-radius:51px;width:80px;height: 80px;">' +
								'<div class="status-circle">'+ statusIcon +'</div></div>');
						else
							header.write('<div class="lotusPhoto photo" style="position: relative;"><img class="otherPeople64 otherPeople64-NoPhotoPerson64" src="' + dojo.config.blankGif + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" style="width:80px;height: 80px;border-radius:51px;">' +
								'<div class="status-circle">'+ statusIcon +'</div></div>');
					} else {
						if (person.X_inDirectory == "true")
							header.write('<div class="lotusPhoto photo"><img src="' + person.photo + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" height="59" width="59"></div>');
						else
							header.write('<div class="lotusPhoto photo"><img class="otherPeople64 otherPeople64-NoPhotoPerson64" src="' + dojo.config.blankGif + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" height="64" width="64" style="height:64px; width:64px;"></div>');
					}
				}
			
				if (uiEnabled) {
					header.write('<div id="inviteToNetworkIcon" class="user-icon"></div>');
					lconn.profiles.bizCard.bizCardUI.getConnectionUserData(person.key, person.X_loggedInUserKey, function (data) {
						if(dojo.byId('inviteToNetworkIcon') && data){
							dojo.byId('inviteToNetworkIcon').innerHTML = data;
						}
					});
				}		
	
				header.write('<div class="lotusPersonInfo">');
				// RTC#89353 - hide email node if card is not accessible via keyboard; see templates/businessCardInfo.ftl
				// do not show email for slim non-expandable cards, such as popup card from a type-ahead (see renderMiniBizCard())
				// since it is not A11Y compliant as the user cannot navigate into the card to press email link
				var massaged_X_bizCardMainHtml = person.X_bizCardMainHtml;
				if (this.isSlim && !this.isExpandable && person.X_bizCardMainHtml.indexOf("<a href=\"mailto:") > 0) {
					massaged_X_bizCardMainHtml = person.X_bizCardMainHtml.substring(0, person.X_bizCardMainHtml.indexOf("<a href=\"mailto:"));
					massaged_X_bizCardMainHtml += "<a class=\"lotusHidden\" href=\"mailto:";
					massaged_X_bizCardMainHtml += person.X_bizCardMainHtml.substring(person.X_bizCardMainHtml.indexOf("<a href=\"mailto:") + "<a href='mailto:".length);
				}

				if (person.X_inDirectory != null && person.X_inDirectory == "true") {
					header.write(massaged_X_bizCardMainHtml);
				} else {
					if (person.X_bizCardMainHtml != "") {
						header.write(massaged_X_bizCardMainHtml);
					} else {
						header.write("<h3 id='noProfileMsg'>" + messages['label.personcard.cardnomarkup'] + "</h3>");
					}
				}

				header.write('</div>');

				//---------------------------------------------------------------------------------
				// SAMETIME AWARENESS
				var personIdentifier = (person.X_bizCardSTInputType == "uid"? person.uid : person.email.internet);
				var out = 	'<div id="'+personIdentifier+'vcardCommentElem" class="lotusComment" style=display:'+ (uiEnabled ? 'none': 'block') +'>'+
								'<div class="lotusCommentHeader">&nbsp;</div>'+
								'<div class="lotusCommentBody">'+
									(personIdentifier != "" && person.X_bizCardSTStatusMsg ? '<span id="'+personIdentifier+'vcardStStatusElem"></span>' : '')+
								'</div>'+
							'</div>';
				header.write(out);
			}
			
			// Inactive user
			else if( person.X_isActiveUser == "false") {
				var inactiveUser = messages['label.inactive.user.msg'];
				var accInformation = messages['label.message.information'];

				if (uiEnabled) {
					if (person.X_inDirectory == "true")
						header.write('<div class="lotusPhoto photo" style="position: relative;"><img src="' + person.photo + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" style="opacity: 0.5; border-radius:51px;width:80px;height: 80px;">' +
							'<div class="status-circle">'+ statusIcon +'</div></div>');
					else
						header.write('<div class="lotusPhoto photo" style="position: relative;"><img "otherPeople64 otherPeople64-NoPhotoPerson64" src="' + dojo.config.blankGif + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" style="opacity: 0.5; border-radius:51px;width:80px;height: 80px;">' +
							'<div class="status-circle">'+ statusIcon +'</div></div>');
				}else {
					if (person.X_inDirectory == "true")
						header.write('<div class="lotusPhoto photo"><img src="' + person.photo + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" height="59" width="59" style="opacity: 0.5"></div>');
					else
						header.write('<div class="lotusPhoto photo"><img "otherPeople64 otherPeople64-NoPhotoPerson64" src="' + dojo.config.blankGif + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" height="59" width="59" style="opacity: 0.5></div>');
				}

				header.write(
						'<div class="lotusPersonInfo">'+
							'<h2>'+'<span class="fn">'+lconn.core.util.html.encodeHtml(person.fn)+'</span></h2>'+
							'<p class="title">'+lconn.core.util.html.encodeHtml(person.title)+'</p>'+
							'<div class="lotusMessage lotusInfo" role="status"><img alt="'+accInformation+'" src="' + dojo.config.blankGif + '" class="lconnSprite lconnSprite-iconAttention16">'+
								'<span class="lotusAltText">'+accInformation+'</span>'+			
								'<span>'+ inactiveUser + '</span>'+
							'</div><!--end lotusMessage-->'+
						'</div><!--end lotusInfo-->'
				);
			}
			
			// Found profile, but something is wrong with biz card json
			else {
				header.write( "<h3 id='noProfileMsg'>"+ messages['label.personcard.cardnomarkup'] + "</h3>");
			}
			
		// Profile not found
		}else{
				var noProfile = messages['label.personcard.noprofilemsg'];
				header.write( "<h3 id='noProfileMsg'>"+ noProfile + "</h3>");
		}
	},

	getConnectionUserData: function (key, loggedInUserKey, getDataCallback) {
		var baseURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
		dojo.xhr("HEAD",
			{
				url: baseURL + "/atom/connection.do?connectionType=colleague&targetKey=" + key + "&sourceKey=" + loggedInUserKey,
				cache: 'no-cache',
				handle: function (error, ioargs) {
					connectionStatus = ioargs.xhr.getResponseHeader("x-profiles-connection-status");
					if (connectionStatus === "accepted") {
						inviteState = '<a role="button" href="javascript:void(0);">' + disableToAddNetwork + '</a>';
					}
					return getDataCallback(inviteState);
				},
				error: function (error, ioargs) {
					console.error('An error occured:', error);
					if(error.status === 404){
						return getDataCallback(null);
					}
				}
			});
	},

	writeExpandoUIContent: function( header, baseURL )
	{
		var lbl = this.messages['label.bizcard.applinks.' + ((this.isSlim)?'more':'less')];
		header.write('<div id="slimTwistyDiv" class="lotusRight">');
		header.write('<a role="button" onclick="lconn.profiles.bizCard.bizCardUI.toggleSlimCard(this,\''+baseURL+'\');'+
									 'event.cancelBubble=true;return false;"' +
									 'href="javascript:void(0);">');
		if(this.isSlim) {
			header.write(' <img id="slimTwisty" class="otherFramework16 otherFramework16-ShowMore12" src="' + dojo.config.blankGif + '" alt="' + lbl + '" title="' + lbl + '"/>');
		} else {
			header.write(' <img id="slimTwisty" class="otherFramework16 otherFramework16-HideMore12" src="' + dojo.config.blankGif + '" alt="' + lbl + '" title="' + lbl + '"/>');
		}
		header.write('<span class="lotusAltText">'+lbl+'</span>');
		header.write('</a>');
		header.write('</div>');
	}, 
	
	//inline biz card
	getInlineMarkup: function (person, bidi, buffer) 
	{
		var messages = this.messages;
		var baseURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
		var header = buffer;	
		if(person != null){
			//we want to make sure the key is unique.  So if there is more than one
			//inline card on the page for the same person, it all still works
			var pivotKey = person.key;
			var pivotIdx = 0;
			while (dojo.byId(pivotKey) && pivotIdx++ < 100) {
				pivotKey = person.key + Math.random().toString().replace("0.","_");
			}
			var personIdentifier = (person.X_bizCardSTInputType == "uid"? person.uid : person.email.internet);
			
			header.write('<div class="lotusui lotusui30dojo lotusui30_body lotusui30_fonts lotusui30 lotusSpritesOn">');
			header.write('<div id="'+person.key+'" class="vcard lotusVCard lotusInlineVCard" style="position:static;margin:10px">');
			header.write('  <div class="lotusContainer">');
			header.write('    <div id="'+pivotKey+'_Pivot" class="lotusPivotNav">');
			header.write('      <div class="lotusPivotNavToggle">');
			header.write('        <a role="button" title="" href="javascript:;" onclick="lconn.core.bizCard.bizCardUtils.toggleInlineCard(\''+pivotKey+'\'); return false;">'+'&nbsp;'+'</a>');
			header.write('      </div>');
			if (person.X_bizCardShowPhoto) {
				header.write('      <div class="lotusPhoto photo">');
				if(person.X_isActiveUser && person.X_isActiveUser != "true"){
					if (uiEnabled) {
						header.write('        <img id="photo" class="otherPeople32 otherPeople32-NoPhotoPerson32" src="' + dojo.config.blankGif + '" alt="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" style="border-radius:51px; opacity: 0.5; width:80px;height: 80px;" />' +
							'<div class="status-circle">'+ statusIcon +'</div>');
					} else {
						header.write('        <img id="photo" class="otherPeople32 otherPeople32-NoPhotoPerson32" src="' + dojo.config.blankGif + '" alt="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" height="35" width="35" />');
					}
				}else{
					if (uiEnabled) {
						header.write('        <img id="photo" src="' + person.photo + '" alt="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" height="35" width="35" style="border-radius:51px; opacity: 0.5;" />' +
							'<div class="status-circle">'+ statusIcon +'</div>');
					}
					else {
						header.write('        <img id="photo" src="' + person.photo + '" alt="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" title="' + lconn.core.util.html.encodeHtmlAttribute(person.fn) + '" height="35" width="35"/>');
					}
				}
				header.write('      </div>');
			}
			header.write('      <div class="lotusPersonInfo">');
			header.write('      <h2>');
			var userLoggedIn = (person.X_loggedInUserKey != null && person.X_loggedInUserKey != "");
			if (window.sametimeAwarenessEnabled && userLoggedIn && !uiEnabled) {
				header.write('<span class="IMAwarenessDisplayedUser">');
				header.write('<span style="display: none;" class="renderType">Icon</span>');
				header.write('<span style="display: none;" class="dn">' + person.dn + '</span>');
				header.write('<span style="display: none;" class="uid">' + person.uid + '</span>');
				header.write('<span id="IMcontent" class="IMContent"><img alt="' + messages['loadingSTStatus'] + '" src="' + baseURL + '/nav/common/styles/images/loading.gif">&nbsp;</span>');
				header.write('</span>');				
			}
			header.write('<span class="fn" id="'+personIdentifier+'vcardNameElem" class="fn"  userid="'+personIdentifier+'">'+lconn.core.util.html.encodeHtml(person.fn)+'</span>');
			header.write('       </h2>');
			if(person.X_isActiveUser && person.X_isActiveUser != "true"){
				var inactiveUser = messages['label.inactive.user.msg'];
				var accInformation = messages['label.message.information'];
				header.write('<div class="lotusMessage lotusInfo" role="status"><img alt="'+accInformation+'" src="' + dojo.config.blankGif + '" class="lconnSprite lconnSprite-iconAttention16">');
				header.write('<span class="lotusAltText">'+accInformation+'</span>');			
				header.write('<span>'+ inactiveUser + '</span>');
				header.write('</div><!--end lotusMessage-->');
			}
			header.write('      </div>');
			header.write('    </div>');
			header.write('    <div id="'+pivotKey+'_Details" class="lotusInlineVCardDetails">');
			
			if (person.X_bizCardActions.length > 0) {
				header.write('<div class="lotusEmail">');
				header.write(this.getEmailActionLink(person,0,true));
				header.write('</div>');
			}
			
			this.writeLinks(header, person, true /* isInline */);
			
			if (person.X_bizCardActions.length > 1) {
				var moreActionLink= '<a role="button" id="'+pivotKey+'_MoreActions" href="javascript:;" onclick="lconn.profiles.bizCard.bizCardUI.displayMore(\''+pivotKey+'InlineMoreActionMenu\',dojo.byId(\''+pivotKey+'_MoreActions\').parentNode.parentNode);return false;">';
				if (uiEnabled) {
					moreActionLink += ellipsisIcon + '</a>';
				}else{
					var dropDownIcon = '<img class="otherFramework16 otherFramework16-TriangleMediumGrayDown12" src="' + dojo.config.blankGif + '" alt="'+messages.personCardMoreActionsAltText+'" title="'+messages.personCardMoreActionsAltText+'" />';
					moreActionLink += messages.personCardMoreActions + dropDownIcon + '</a>';
				}

				header.write('<div class="lotusPersonActions">');
				header.write('  <ul class="lotusInlinelist" style="float:right;">');
				header.write('    <li class="lotusFirst">');
				header.write(moreActionLink);
				header.write('    </li>');
				header.write('  </ul>');
				header.write('</div>');
				
				this.writeMoreActionsMenu(header, person, baseURL, true, pivotKey);
			}
		
				
			header.write('    </div>');
			header.write('  </div>');
			header.write('</div>');
			header.write('</div>');
		
		}else{
				header.write('<div class="lotusui30">');
				header.write('<div class="vcard lotusVCard lotusInlineVCard" style="position:static;margin:10px">');
				header.write('  <div class="lotusContainer">');
				header.write('    </div>');
				header.write('    </div>');
				header.write('    </div>');
			}
	},
	
	writeLinks: function(buffer, person, isInline)
	{
      if(person.X_loggedInUserKey != null)
         window.X_loggedInUserKey = person.X_loggedInUserKey;
      
		try{
			var baseURL = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
			
			if(!person.X_bizCardServiceLinks) {
				person.X_bizCardServiceLinks = [];
			}
			
			if (!person.X_concatSemPersonSvc && dojo.exists("SemTagPerson.services") && SemTagPerson.services.length > 0) {
				person.X_bizCardServiceLinks = person.X_bizCardServiceLinks.concat(SemTagPerson.services);
				person.X_concatSemPersonSvc = true;
			}
		
			if(person.X_bizCardServiceLinks && person.X_bizCardServiceLinks.length > 0)
			{
				var numberOnRow = 4;
					
				if(isInline)
				buffer.write('<ul id="appLinks1" class="lotusAppLinks" role="list" aria-label="application links">');
				
				var firstRow = new Array();
				
					for(var i=0; i < numberOnRow; i++){
					firstRow[i] = person.X_bizCardServiceLinks[i];
					}
					
				 var remainingRows = new Array();
				
					for(var i=numberOnRow; i < person.X_bizCardServiceLinks.length; i++){
					var j = i - numberOnRow;
					remainingRows[j] = person.X_bizCardServiceLinks[i];
					}
				
				//write first line
				this.writeSubLinksMenu(buffer, firstRow, isInline, true, numberOnRow, person);
				
				//write remaining lines
				this.writeSubLinksMenu(buffer, remainingRows, isInline, false, numberOnRow, person);
				
				if(isInline)
					buffer.write('</ul>');
				
			}
			
		}
		catch(exception2) { alert(exception2.message); }
	},
	
	writeSubLinksMenu: function(buffer, services, isInline, firstRow, numberOnRow, person)
	{
		var messages = this.messages;
		var beginNewRow = true;
		var columnsLeft = 0;
		
		var colWidth = 100 / numberOnRow - 1;

		for (var k = 0; k < services.length; k++)
		{
			
			var service = services[k];
			if(service == null || service.name == null || service.name == "")
				continue;
			
			var tempUrl = "";
			var doSub = false;
			
			if (typeof(service.href) != "undefined" && service.href != null) {
				tempUrl = service.href;
			}
			else if (typeof(service.url_pattern) != "undefined" && service.url_pattern != null && service.url_pattern != "") {
				tempUrl = service.url_pattern;
				
				if (tempUrl.indexOf("{email}") != -1 && (person.email != null && person.email.internet != null))
					tempUrl = tempUrl.replace(/{email}/g,person.email.internet);
				if (tempUrl.indexOf("{uid}") != -1  && (person.uid != null))
			    	tempUrl = tempUrl.replace(/{uid}/g,person.uid);
		    	if (tempUrl.indexOf("{key}") != -1  && (person.key != null))
		    		tempUrl = tempUrl.replace(/{key}/g,person.key);
				if (tempUrl.indexOf("{fn}") != -1    && (person.fn != null))
		    		tempUrl = tempUrl.replace(/{fn}/g,lconn.core.util.html.encodeHtmlAttribute(person.fn));
				if (tempUrl.indexOf("{displayName}") != -1  && (person.fn != null))
		    		tempUrl = tempUrl.replace(/{displayName}/g,lconn.core.util.html.encodeHtmlAttribute(person.fn));
				if (tempUrl.indexOf("{workPhoneNumber}") != -1  && (person.adr != null && person.adr.work != null))
		    		tempUrl = tempUrl.replace(/{workPhoneNumber}/g,person.adr.work);
		    	if (tempUrl.indexOf("{userid}") != -1  && (person.X_lconn_userid != null))
		    		tempUrl = tempUrl.replace(/{userid}/g,person.X_lconn_userid);
		    		
		    	if (typeof(service.location) != "undefined" && service.location != null)
		    		tempUrl = service.location + tempUrl;
			} else {
				continue;
			}
			
			
			//begin next row
			if( !isInline && beginNewRow == true) //add new row
				buffer.write('<tr class="lotusAppLinks' + (!firstRow?' appLinksNext':'') + '">');		 
		
			buffer.write((isInline)?'<li ':'<td ' + (firstRow?'style="width: ' + colWidth + '%;" ':''));
			buffer.write(' role="listitem" ');
			columnsLeft++; 
			
			if( !isInline && beginNewRow == true)
				buffer.write('class="lotusFirst"');
				
			beginNewRow = false;			    		
	    	
	    	var label = "";
	    	if (typeof(service.js_eval) != "undefined" 
	    		&& service.js_eval != null 
	    		&& service.js_eval.indexOf("generalrs.") == 0) 
	    	{
	    		var key = service.js_eval.substr("generalrs.".length);
	    		if (typeof(messages[key]) == "undefined")
	    			key = key.replace(/\_/g,'.');
	    		label = messages[key];
	    	} 
	    	else{
				if (service.js_eval) {
					try {
						if (person.X_allowEvalLabel) {
							label = dojo.eval(service.js_eval);
						} else {
							label = new String(service.js_eval);
						}
					} catch(exception2){
						label = "!error.eval!";
					}
				} else if (service.label) {
				 	label = new String(service.label);
				} else {
					label= "???";
				}
			}			    	
	    		
	    	if(service.name == "blogs" && person.X_blogUrl != null && person.X_blogUrl != "")
		    	buffer.write('><a class="url" href="'+person.X_blogUrl+'">'+label+'</a>');
	    	else
				buffer.write('><a class="url" href="'+tempUrl.replace(/\"/g, "&quot;")+'">'+label+'</a>');
			
			buffer.write((isInline)?'</li>':'</td>');
					
			if( !isInline && firstRow && ( k == (services.length - 1))) { // end first row
				buffer.write('</tr>');
				beginNewRow = true;
				columnsLeft = 0;
					
			}else if(!isInline && ((( k + 1) % numberOnRow) == 0)){ /// end a row with four elements
				buffer.write('</tr>');
				beginNewRow = true;
				columnsLeft = 0;

			}else if(!isInline && (( k + 1) == services.length) ){ // end a row with less elements
				buffer.write('<td colSpan="'+(numberOnRow - columnsLeft)+'">&nbsp;</td>'); //get extra columns to fill
				buffer.write('</tr>');
				beginNewRow = true;
				columnsLeft = 0;
			}
	
		}//end for
	},
	
	writeMoreActionsMenu: function(header, person, baseURL, isInline, pivotKey, chatExtension, webmeetingExtension)
	{	
		var messages = this.messages;
		if (!pivotKey) pivotKey = person.key;
		try{
			header.write('<ul class="lotusActionMenu lotusPlain" id="'+pivotKey);
			
			if(isInline) header.write('Inline');
			
			header.write('MoreActionMenu">');
		
			var personIdentifier = (person.X_bizCardSTInputType == "uid"? person.uid : person.email.internet);
			var personEmail = person.email.internet;

			if(webmeetingExtension)
			{		 		
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.log('more actions webmeetingExtension: ', webmeetingExtension);
				var meetingUrl = this.generateWebmeetingUrl(person, webmeetingExtension.href);
				try {
					header.write('<li id="'+personIdentifier+'ChatActionMore" class="lotusMenuSeparator" style="display:block; border-bottom: 1px solid #ccc;">'+
					'<a id="javlinFooterActionChat" role="button" aria-disabled="false" aria-label="' + webmeetingExtension.text + '" href="'+  meetingUrl +'" target="'+ webmeetingExtension.target +'">' +  webmeetingExtension.text + '</a>'+
					'</li>');
				} catch (err) {
					console.log('write webmeeting extension failed: ', err);
				}
			}

			if(chatExtension)
			{		 		
				if (lconn.core.bizCard.bizCardUtils.isDebug) console.log('more actions chatExtension: ', chatExtension);
				try {
					if (uiEnabled) {
						var chatLink = '<a id="javlinFooterActionChat" role="button" aria-disabled="false" aria-label="' + chatExtension.text + '" href="'+  this.replaceUrl(chatExtension.href, {email: personEmail}) +'" target="'+ chatExtension.target +'" title="'+chatExtension.text+'">' + chatIcon + '</a>';
					} else {
						var chatLink = '<a id="javlinFooterActionChat" role="button" aria-disabled="false" aria-label="' + chatExtension.text + '" href="'+  this.replaceUrl(chatExtension.href, {email: personEmail}) +'" target="'+ chatExtension.target +'">' +  chatExtension.text + '</a>';
					}
					header.write('<li id="'+personIdentifier+'ChatActionMore" class="lotusMenuSeparator" style="display:block; border-bottom: 1px solid #ccc;">'+ chatLink +'</li>');
				} catch (err) {
					console.log('write chat extension failed: ', err);
				}
			}

			if (person.X_bizCardActions.length > 0 && !isInline)
			{
				header.write('<li class="' + person.X_bizCardActions[0].liClass + '">'+ this.getEmailActionLink(person,0,false) +'</li>');
			}
			
			var userLoggedIn = (person.X_loggedInUserKey != null && person.X_loggedInUserKey != "");
			if(person.X_bizCardSTAwareness || person.X_bizCardSecureSTAwareness || (window.sametimeAwarenessEnabled && userLoggedIn) )
			{		 		
				if (person.X_STChatAction) {
					header.write('<li id="'+personIdentifier+'ChatActionMore" class="lotusMenuSeparator" style="display:none;">'+
									'<a href="javascript:void(0);" onclick="lconn.profiles.bizCard.bizCard.sametimeStart(\'chat\', \''+personIdentifier+'\');return false;"> '+messages.personCardChat+' </a>'+
								'</li>');
				}
				if (person.X_STCallAction) {
					header.write('<li id="'+personIdentifier+'CallActionMore" class="lotusMenuSeparator" style="display:none;">'+
									'<a href="javascript:void(0);" onclick="lconn.profiles.bizCard.bizCard.sametimeStart(\'call\', \''+personIdentifier+'\');return false;"> '+messages.personCardCall+' </a>'+
								'</li>');
				}
			}
			
			if (person.X_bizCardActions.length > 1) 
			{
				 for (var i = 1; i < person.X_bizCardActions.length; i++) {
					header.write('<li class="' + person.X_bizCardActions[i].liClass + '">' + this.getEmailActionLink(person,i,false) + '</li>');
				}
			}
		
			header.write('</ul>');
		
		}catch(exception2){alert(exception2.message);}
	},
	
	displayMore: function (pMenu, pMoreControl)
	{
		try {
			// find the more actions node and show it.
			var moreNode = dojo.byId(pMenu);
			dojo.style(moreNode, "display", "block");
			
			// get any links of tabbable nodes and set the focus to the first one.
			var nodes = dojo.query("a,[tabindex=\"0\"]", moreNode);
			if (nodes.length > 0) nodes[0].focus();
			
			// hide the original moreActions link
			dojo.style(pMoreControl, "display", "none");
			
		} catch (e) {
			if (window.console) console.log("displayMore exception: " + e);
		}
	},

	displayNewActions: function ()
	{
		document.getElementById("myDropdown").classList.toggle("show");
	},

	
	convertQuickrEmail: function (email)
	{
	    email = email.replace(/@/g,'_at_');
	    email = email.replace(/\./g,'_');
		return email;
	},
	
	toggleSlimCard: function( aTwisty, baseURL )
	{
		var twistyImg = document.getElementById("slimTwisty");
		if ( twistyImg.className.indexOf("HideMore")!=-1){
			if( this.slimCard( baseURL ))
				if (dojo.cookie) dojo.cookie( "card.popup.slim", 1 /* slim */);
	 	}else{
			if( this.expandCard( baseURL ))
				if (dojo.cookie) dojo.cookie( "card.popup.slim", 0 /* not slim */);
	 	}
	},
	
	slimCard: function( baseURL )
	{
		var twistyImg = dojo.byId("slimTwisty");
	 	if (twistyImg) {
			var lbl = this.messages['label.bizcard.applinks.more']
	 		twistyImg.className = "otherFramework16 otherFramework16-ShowMore12";
			twistyImg.src = dojo.config.blankGif;
	 		twistyImg.alt = twistyImg.title = lbl;

			//a11y for when images are not shown.
	 		try {
				dojo.query(".lotusAltText", dojo.byId("slimTwistyDiv")).forEach(function(node){
					node.innerHTML = lbl;
				});
			} catch (AltSetExc) {}
	 			
			var cardHeader = dojo.byId("cardHeader");
		 	if(cardHeader) cardHeader.style.display="none";
	
		 	var cardFooter = dojo.byId("cardFooter");
		 	if(cardFooter) cardFooter.style.display="none";
		 	
		 	return true;
		}
	 	
	 	return false;
	},
	
	expandCard: function( baseURL )
	{
		var twistyImg = dojo.byId("slimTwisty");
		if (twistyImg) {
			var lbl = this.messages['label.bizcard.applinks.less'];
			twistyImg.className = "otherFramework16 otherFramework16-HideMore12";
			twistyImg.src = dojo.config.blankGif;
	 		twistyImg.alt = twistyImg.title = lbl;
	 		
			//a11y for when images are not shown.
	 		try {
				dojo.query(".lotusAltText", dojo.byId("slimTwistyDiv")).forEach(function(node){
					node.innerHTML = lbl;
				});
			} catch (AltSetExc) {}

	 		var cardHeader = dojo.byId("cardHeader");
			if(cardHeader) cardHeader.style.display="";

			var cardFooter = dojo.byId("cardFooter");
		 	if(cardFooter) cardFooter.style.display="";
		 	
		 	return true;
		}
		return false;
	},
	
	resizeObj: function(obj, resize, amount) {
		// resize: 0=reset to original size, 1=resize
		// amount: +/- percentage height to resize 
		if(typeof(obj.style.height)=="undefined" || obj.style.height <= 0) obj.style.height = obj.height; // record original height if not previously set
		if(typeof(obj.style.width )=="undefined" || obj.style.width  <= 0) obj.style.width  = obj.width;  // record original width if not previously set
		obj.style.height = (resize) ? obj.style.height = amount+"%" : obj.style.height;
		obj.style.width  = (resize) ? obj.style.width  = amount+"%" : obj.style.width;
	},
	
	openVCardDialog: function(key, lastMod) {
		/* this.closeVCardIFrame(); // first dispose of old iframe - unusable doe to XSS + breaking certain apps */
		this._createVCardDialog(key, lastMod);
	},

	_createVCardDialog : function(key, lastMod) {
		this.wndh_vCard = window.open(this._getVCardDownloadUrl(key,lastMod),"vcarddl","status=0,toolbar=0,scrollbars=0,resizable=0,height=350,width=550"); 
	},
	
	_getVCardDownloadUrl: function(key, lastMod) {
		var base = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
		return base + "/html/exportVCardDialog.do?key=" + key + "&lastMod=" + lastMod;
	},
	//TODO Just method for LC3.0, refine this error handling with more detail message in LC next. 
	networkInviteDefaultErrorHandler: function(){
	    if (!dojo.exists("lconn.profiles.invite.Invite")) return;
	    dojo['require']("dijit.Dialog");
		var msg = this.messages;
		function _getString(key){
		    return msg[key];
		}
		var i = lconn.profiles.invite.Invite;
		var inviteDialog = i.inviteDialog;
		if(inviteDialog) inviteDialog.hide();
		if(i.errorDialog) i.errorDialog.hide();
		i.errorDialog = new dijit.Dialog({
		    content:"",
		    style: ""
		});
		dojo.addClass(i.errorDialog.domNode, "lotusDialogBorder lotusDialog");
		i.errorDialog.titleBar.innerHTML = "<h1>{title}</h1>".replace("{title}", lconn.profiles.invite.Invite._getString("friendsInvite"));
		var blankGifUrl = dijit._Widget.prototype._blankGif;
		i.errorDialog.containerNode.innerHTML='<div class="lotusMessage lotusError" role="alert"><img title="" alt="" class="lconnSprite lconnSprite-iconError16" src="{blankGif}">{errorMsg}</div><div class="lotusDialogFooter"><input type="submit" onclick="lconn.profiles.invite.Invite.errorDialog.hide(); return true;" class="lotusFormButton" value="Close"></div>'.replace('{blankGif}', blankGifUrl).replace('{errorMsg}', lconn.profiles.invite.Invite._getString("errorDefaultMsg2"));
		i.errorDialog.show();
	},
	
	// network invite dialog
	openNetworkInviteDialog: function(key, loggedInUserKey, errorHtmlContainerElemId) {
       var xhrErrorHandler = errorHandler = lconn.profiles.bizCard.bizCardUI.networkInviteDefaultErrorHandler;
	   if(lconn.core.header == null) 
	   {
	      var base = lconn.core.bizCard.bizCardUtils.getBaseURL("hcard");
	      var url = base + "/html/profileView.do?key=" + key + "&invite=true";
	      window.open(url);
	      return;
	   } 
		if (!dojo.exists("lconn.profiles.invite.Invite")) {
			try {
				net.jazz.ajax.xdloader.load_async("lconn.profiles.invite.Invite", dojo.hitch(this, function() {
					this.openNetworkInviteDialog(key, loggedInUserKey, errorHtmlContainerElemId);
				}));
			} catch (e) {
				if (window.console) console.error("Unable to load invite module");
			}			
			return;
		}
		var displayName = null;
		var canFollow = null;
		if(lconn.profiles.bizCard.bizCard.currentPerson) {			
			if(lconn.profiles.bizCard.bizCard.currentPerson.fn) {
				displayName = lconn.profiles.bizCard.bizCard.currentPerson.fn;
			}
			if(lconn.profiles.bizCard.bizCard.currentPerson.X_isFollowed && lconn.profiles.bizCard.bizCard.currentPerson.X_isFollowedEnabled) {
				canFollow = dojo.fromJson(lconn.profiles.bizCard.bizCard.currentPerson.X_isFollowedEnabled);
				if(canFollow) {
					canFollow = ! dojo.fromJson(lconn.profiles.bizCard.bizCard.currentPerson.X_isFollowed);
				}
			}
		}
		
		
		// hide the bizcard because the invite dialog (by being a dialog) has a lower z-index than the bizcard (by being a popup) - see RTC#66892
		LCSemTagMenu.hide(LCSemTagMenu.id);
		 
		lconn.profiles.invite.Invite.showDialog(
			lconn.core.bizCard.bizCardUtils.getBaseURL("hcard"),
			true,
			displayName,
			key,
			loggedInUserKey,
			errorHtmlContainerElemId,
			xhrErrorHandler,
			errorHandler,
			null, /* xhrDoneCallback - Optional */
			null, /* sendInviteCallback - Optional */
			null, /* cancelInviteCallback - Optional */
			canFollow
		);
	},
}

// Ensure the current script finishes executing prior to calling init
setTimeout(function() {
	lconn.profiles.bizCard.bizCardUI.init();
},1);

})();
