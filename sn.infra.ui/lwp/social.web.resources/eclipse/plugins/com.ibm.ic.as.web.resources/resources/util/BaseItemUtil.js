/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo",
		"dojo/date/stamp",
		"dojo/_base/declare",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/dom-style",
		"dojo/query",
		"dojo/topic",
		"dojo/dom-geometry",
		"ic-as/util/RouteHelper",
		"ic-core/url",
		"ic-core/config/services"
	], function (dojo, stamp, declare, array, lang, domAttr, domClass, domConstruct, domStyle, query, topic, domGeometry, RouteHelper, url, services) {
		
		var BaseItemUtil = declare("com.ibm.social.as.util.BaseItemUtil", null, {
			
			/**
			 * Pass in a OpenSocial User ID to retrieve the Connections user ID
			 * This will strip off the OpenSocial prefix on the ID
			 */
			getConnectionsUserId: function(openSocialUserId) {
				var ret = openSocialUserId;
				if (ret && ret.indexOf('urn:lsid:lconn.ibm.com:') != -1) {
					var endPrefix = ret.lastIndexOf(':');
					if ( endPrefix != -1 ) {
						ret = ret.substr(endPrefix+1);
					}
				}
				return ret;
			},
			
			/**
			 * Pass off to the people js api to get the image url.
			 * Will return null if profiles is disabled
			 * profiles{id:xxxx, image:{url:xxxxx}}
			 */
			getPhotoUrl: function(profiles) {
				var profilesUrl = "";
				var profilesId = "";
				var profilesImageUrl = "";
				if(profiles){
					profilesId = this.getConnectionsUserId(profiles.id);
					profilesImageUrl = (profiles.image)? profiles.image.url : undefined;
				}
			
				profilesUrl = (profilesImageUrl) ? profilesImageUrl : RouteHelper.getInstance().getProfilesRoutes().getUserPhotoUrl(profilesId);			
				
				if(!profilesUrl){
					profilesUrl = url.getServiceUrl(services.webresources).uri;
					 profilesUrl += "/web/com.ibm.oneui.styles/css/images/profileNoPhoto.gif";
				}
				
				return profilesUrl;		
			}
		
		});
		
		return BaseItemUtil;
	});
