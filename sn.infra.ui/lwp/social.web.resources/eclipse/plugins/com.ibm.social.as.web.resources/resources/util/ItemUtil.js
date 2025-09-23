/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.ItemUtil");

dojo.require("com.ibm.social.as.util.Localizer");
dojo.require("com.ibm.social.as.util.LinkTarget");
dojo.require("lconn.core.url");
dojo.require("lconn.core.config.services");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.lconn.layout.people");

dojo.require("com.ibm.social.incontext.util.DateFormat");

dojo.require("dojox.html.entities");

/**
 * Utility helper for building News Items
 * 
 * While inconsistent feeds are returned for author elements
 * we will handle an author with id, displayname and generate the
 * profile link ourselves.
 * 
 * @author scrawford
 */

dojo.declare("com.ibm.social.as.util.ItemUtil", 
		 [com.ibm.social.as.util.Localizer,
		  com.ibm.social.as.util.LinkTarget],
{
	
	itemSubscriptions: null,
	
	constructor: function(){ 	
		this.itemSubscriptions = [];		
	},
	
	/**
	 * Pass in a userid and user display name and build the 
	 * user html for inclusion in the News Item.
	 * This function generates the profiles link.
	 */
	createNewsUser: function(userId, userDisplayName){
		
		
		
		var connUserId = this.getConnectionsUserId(userId);		
		var person = {userid: connUserId, name: userDisplayName, uid: connUserId};
		var a = com.ibm.lconn.layout.people.createLink(person);
		var wrapperNode = dojo.create("span");
		//Has a link been returned, if not create a span tag with plain text user
		//People JS API has stopped supplying this when profiles is disabled

		if(!a){
			var plainTextUser = dojo.create("span", {className: "lotusBold"}, wrapperNode);
			plainTextUser.innerHTML = userDisplayName;
		}
		else{	
			//required to remove lotusPerson as it emboldens the user link making it different
			//to the news feed generated links
			dojo.removeClass(a, "lotusPerson");
			dojo.addClass(a, "url");
			a.target=this.linkTarget;
			var vcard = dojo.create("span", {className: "vcard"},wrapperNode);
			
			// If the body is rtl we need to ensure the vcard span is treated as rtl by applying the dir attribute.
			if (!(dojo._isBodyLtr())) {
				dojo.attr(vcard,"dir","rtl");
			}
			
			vcard.appendChild(a);
		}		
		
		var returnVal = wrapperNode.innerHTML;
		dojo.destroy(wrapperNode);
		return returnVal;
	},
	
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
	 * Pass in a Connections User ID to retrieve the OpenSocial user ID
	 * This will add on the OpenSocial prefix to the ID
	 */
	getOpenSocialUserId: function(connUserId) {
		var ret = "urn:lsid:lconn.ibm.com:profiles.person:"+connUserId;
		return ret;
	},
	
	/**
	 * Utility function for creating a community url based on an opensocial
	 * commId passed in
	 */
	getConnectionsCommunityUrl: function(openSocialCommId){
		var communityUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.communities).uri;
		var communityRelUrl = "/service/html/communityview?communityUuid=" + 
			this.getConnectionsCommunityId(openSocialCommId);											
		communityUrl += communityRelUrl;
		return communityUrl;
	},
	
	/**
	 * Pass in a OpenSocial Community ID to retrieve the Connections community ID
	 * This will strip off the OpenSocial prefix on the ID
	 * Note: Just routes to getConnectionsUserId for now, logic will work
	 */
	getConnectionsCommunityId: function(openSocialCommId) {
		return this.getConnectionsUserId(openSocialCommId);
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
	
		profilesUrl = (profilesImageUrl) ? profilesImageUrl : activityStreamAbstractHelper.getProfilesRoutes().getUserPhotoUrl(profilesId);			
		
		if(!profilesUrl){
			profilesUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources).uri;
			 profilesUrl += "/web/com.ibm.oneui.styles/css/images/profileNoPhoto.gif";
		}
		
		return profilesUrl;		
	},
	
	/**
	 * This function attempts once off to get the standard line height of text
	 * in the activity stream - placing a div with one line of text and computing
	 * the clientHeight. If we cannot determine this we will return 18 which is
	 * the standard default
	 */
	getLineHeight: function(element){
		if(window.standardLineHeightContent) {
			return window.standardLineHeightContent;
		}
		else {
			var temp = dojo.create("div");
			temp.innerHTML = "test";
			temp.setAttribute("style","margin:0px;padding:0px;");			
			dojo.place(temp, element.parentNode);
			var ret = temp.clientHeight;
			if(ret == 0){
				ret = 18; //represents a default value in pixels of a line of text, in case above fails
			}
			dojo.destroy(temp);
			window.standardLineHeightContent = ret;
			return ret;
		}
	},
	
	/**
	 * call this if the content node will have images that may take extra time to load
	 * if an image is detected connect to the onload so that we call resize again.
	 * Otherwise potentially the content will not collapse if the original resize
	 * occurs before fully loaded in.
	 */
	addImageOnloadResizeSupport: function(activityNode, itemId){
		dojo.query("img",activityNode).forEach(dojo.hitch(this, function(img, index){
			this.connect(img, "onload", dojo.hitch(this, function(){
					dojo.publish(com.ibm.social.as.constants.events.RESIZEHEIGHT, ["comment", itemId]);
			}));
		}));
	},
	
	/**
	 * If the content's height exceeds 7 lines, resize to max-height 6 lines and add a 'Show more' link
	 */
	setContentHeight: function(activityNode, showMoreLink, showLessLink, itemId) {
		var textLineHeight = this.getLineHeight(activityNode);
		dojo.style(activityNode, {maxHeight : (textLineHeight*7) + "px"});
		this.itemSubscriptions.push(dojo.subscribe(com.ibm.social.as.constants.events.RESIZEHEIGHT, dojo.hitch(this,function(type,id,forceMore) {
			var doIt = false;
			if ( type == "all" || type =="comment" && !!itemId && id == itemId ) {
				doIt = true;
			} else if ( type == "allcomments" && this instanceof com.ibm.social.as.item.comment.InlineComment &&
					this.newsItem.newsData.getActivityId() == id ) {
				// catch case where we are adding a bunch of new comments to a news item (expand comment)
				// and need to process all of them
				doIt = true;
			} else if ( type == "expandAllComments" && dojo.hasClass(activityNode, "commentLessShow") &&
					this instanceof com.ibm.social.as.item.comment.InlineComment &&
					this.newsItem.newsData.getActivityId() == id ) {
				// this case is for expanding all existing comments on an item (when we are expanding new comments)
				// if we are collapsed, need to expand
				this.handleShowMoreLessClicked(null, this.commentContent, this.showMoreText, this.showLessText); 
			} 
			
			if ( doIt ) {
				//IE throws exception during call to contentBox, let this pass
				//it will represent a node that is empty and will be skipped over
				try {
					var contentBoxHeight = dojo.contentBox(activityNode).h;
				
					// if height greater than max AND "Show Less" not already displayed, then collapse
					 if( activityNode && contentBoxHeight && (contentBoxHeight > ((textLineHeight*7)-1))) {
						 this.updateContentNodeShowLess(activityNode);
						 //Make sure that showMoreLink or  showLessLink  is  not displayed before
						 if(dojo.hasClass(showMoreLink,"lotusHidden")) {
							dojo.addClass(activityNode,"commentLessShow");
							dojo.removeClass(showMoreLink, "lotusHidden");
							
							// Remove lotusHidden from the parent container
							dojo.removeClass(showMoreLink.parentNode, "lotusHidden");
						 }
						 
						 if ( forceMore && !dojo.hasClass(this.showMoreText, "lotusHidden") ) { // default to "Show More" clicked
							 this.handleShowMoreLessClicked(null, this.commentContent, this.showMoreText, this.showLessText);
						 }
					 }
				}
				catch(e){}
			} 
		})));
	},
	
	updateContentNodeShowLess: function(activityNode){		
		var heightString = (this.getLineHeight(activityNode) * 6);
		if(window.ICS_UI_ISCNX8UXENABLED) heightString += 10;
		 dojo.style(activityNode, {maxHeight: heightString + "px" });
	},
	
	handleShowMoreLessClicked : function(e, node, showMore, showLess){
		if ( e ) {
			dojo.stopEvent(e);
		}
		
		if(dojo.hasClass(node, "commentLessShow")){
			dojo.style(node, {maxHeight: "none" });
		}
		else{
			this.updateContentNodeShowLess(node);
		}
		dojo.toggleClass(node,"commentLessShow");
		dojo.toggleClass(showMore, "lotusHidden");
		if(showLess) {
			dojo.toggleClass(showLess, "lotusHidden");
		}
	},
	
	/**
	 * Get a formatted string for a date.
	 * @param strings {Object} string properties
	 * @param time {String} ISO date
	 * @returns {String} formatted date
	 */
	getDateString: function(strings, time, dateParameters){

        dateParameters = dateParameters || {};
		var date = dojo.date.stamp.fromISOString(time);
		var df = new com.ibm.social.incontext.util.DateFormat(date, dateParameters);
		return df.formatByAge({
			DAY: strings.timeDay,
			MONTH: strings.timeMonth,
			TODAY: strings.timeToday,
			YEAR: strings.timeYear,
			YESTERDAY: strings.timeYesterday,
			TOMORROW: strings.timeTomorrow
		});
	},
	
	/**
	 * Get a seconds for a date.
	 * @param time {String} ISO date
	 * @returns {String} time with seconds
	 */
	getTimeWithSeconds: function(time){
		var date = dojo.date.stamp.fromISOString(time);
		var df = new com.ibm.social.incontext.util.DateFormat(date);
		return df.time_long();
	},
	
	destroyItemUtil: function(){
		dojo.forEach(this.itemSubscriptions, function(sub){
			dojo.unsubscribe(sub);
		});
	}
});
