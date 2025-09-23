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
		"ic-ui/layout/people",
		"ic-as/constants/events",
		"ic-as/item/comment/InlineComment",
		"ic-as/util/LinkTarget",
		"ic-as/util/Localizer",
		"ic-core/config/services",
		"ic-core/url",
		"ic-incontext/util/DateFormat",
		"./BaseItemUtil",
		"dojox/html/entities"
	], function (dojo, stamp, declare, array, lang, domAttr, domClass, domConstruct, domStyle, query, topic, domGeometry, people, events, InlineComment, LinkTarget, Localizer, services, url, DateFormat, BaseItemUtil, entities) {
	
		/**
		 * Utility helper for building News Items
		 * 
		 * While inconsistent feeds are returned for author elements
		 * we will handle an author with id, displayname and generate the
		 * profile link ourselves.
		 * 
		 * @author scrawford
		 */
		
		var ItemUtil = declare("com.ibm.social.as.util.ItemUtil", 
				 [Localizer,
				  LinkTarget,
				  BaseItemUtil],
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
				var wrapperNode = domConstruct.create("span");
				//Has a link been returned, if not create a span tag with plain text user
				//People JS API has stopped supplying this when profiles is disabled
		
				if(!a){
					var plainTextUser = domConstruct.create("span", {className: "lotusBold"}, wrapperNode);
					plainTextUser.innerHTML = userDisplayName;
				}
				else{	
					//required to remove lotusPerson as it emboldens the user link making it different
					//to the news feed generated links
					domClass.remove(a, "lotusPerson");
					domClass.add(a, "url");
					a.target=this.linkTarget;
					var vcard = domConstruct.create("span", {className: "vcard"},wrapperNode);
					
					// If the body is rtl we need to ensure the vcard span is treated as rtl by applying the dir attribute.
					if (!(domGeometry._isBodyLtr())) {
						domAttr.set(vcard, "dir", "rtl");
					}
					
					vcard.appendChild(a);
				}		
				
				var returnVal = wrapperNode.innerHTML;
				domConstruct.destroy(wrapperNode);
				return returnVal;
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
				var communityUrl = url.getServiceUrl(services.communities).uri;
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
					var temp = domConstruct.create("div");
					temp.innerHTML = "test";
					temp.setAttribute("style","margin:0px;padding:0px;");			
					domConstruct.place(temp, element.parentNode);
					var ret = temp.clientHeight;
					if(ret == 0){
						ret = 18; //represents a default value in pixels of a line of text, in case above fails
					}
					domConstruct.destroy(temp);
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
				query("img",activityNode).forEach(lang.hitch(this, function(img, index){
					this.connect(img, "onload", lang.hitch(this, function(){
							topic.publish(events.RESIZEHEIGHT, "comment", itemId);
					}));
				}));
			},
			
			/**
			 * If the content's height exceeds 7 lines, resize to max-height 6 lines and add a 'Show more' link
			 */
			setContentHeight: function(activityNode, showMoreLink, showLessLink, itemId) {
				var textLineHeight = this.getLineHeight(activityNode);
				domStyle.set(activityNode, {maxHeight : (textLineHeight*7) + "px"});
				this.itemSubscriptions.push(topic.subscribe(events.RESIZEHEIGHT, lang.hitch(this,function(type,id,forceMore) {
					var doIt = false;
					if ( type == "all" || type =="comment" && !!itemId && id == itemId ) {
						doIt = true;
					} else if ( type == "allcomments" && this instanceof InlineComment &&
							this.newsItem.newsData.getActivityId() == id ) {
						// catch case where we are adding a bunch of new comments to a news item (expand comment)
						// and need to process all of them
						doIt = true;
					} else if ( type == "expandAllComments" && domClass.contains(activityNode, "commentLessShow") &&
							this instanceof InlineComment &&
							this.newsItem.newsData.getActivityId() == id ) {
						// this case is for expanding all existing comments on an item (when we are expanding new comments)
						// if we are collapsed, need to expand
						this.handleShowMoreLessClicked(null, this.commentContent, this.showMoreText, this.showLessText); 
					} 
					
					if ( doIt ) {
						//IE throws exception during call to contentBox, let this pass
						//it will represent a node that is empty and will be skipped over
						try {
							var contentBoxHeight = domGeometry.contentBox(activityNode).h;
						
							// if height greater than max AND "Show Less" not already displayed, then collapse
							 if( activityNode && contentBoxHeight && (contentBoxHeight > ((textLineHeight*7)-1))) {
								 this.updateContentNodeShowLess(activityNode);
								 //Make sure that showMoreLink or  showLessLink  is  not displayed before
								 if(domClass.contains(showMoreLink,"lotusHidden")) {
									domClass.add(activityNode,"commentLessShow");
									domClass.remove(showMoreLink, "lotusHidden");
									
									// Remove lotusHidden from the parent container
									domClass.remove(showMoreLink.parentNode, "lotusHidden");
								 }
								 
								 if ( forceMore && !domClass.contains(this.showMoreText, "lotusHidden") ) { // default to "Show More" clicked
									 this.handleShowMoreLessClicked(null, this.commentContent, this.showMoreText, this.showLessText);
								 }
							 }
						}
						catch(e){}
					} 
				})));
			},
			
			updateContentNodeShowLess: function(activityNode){		
				 var heightString = (this.getLineHeight(activityNode)*6);
				 domStyle.set(activityNode, {maxHeight: heightString + "px" });
			},
			
			handleShowMoreLessClicked : function(e, node, showMore, showLess){
				if ( e ) {
					e.preventDefault(), e.stopPropagation();
				}
				
				if(domClass.contains(node, "commentLessShow")){
					domStyle.set(node, {maxHeight: "none" });
				}
				else{
					this.updateContentNodeShowLess(node);
				}
				domClass.toggle(node,"commentLessShow");
				domClass.toggle(showMore, "lotusHidden");
				if(showLess) {
					domClass.toggle(showLess, "lotusHidden");
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
				var date = stamp.fromISOString(time);
				var df = new DateFormat(date, dateParameters);
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
				var date = stamp.fromISOString(time);
				var df = new DateFormat(date);
				return df.time_long();
			},
			
			destroyItemUtil: function(){
				array.forEach(this.itemSubscriptions, function(sub){
					sub.remove();
				});
			}
		});
		
		return ItemUtil;
	});
