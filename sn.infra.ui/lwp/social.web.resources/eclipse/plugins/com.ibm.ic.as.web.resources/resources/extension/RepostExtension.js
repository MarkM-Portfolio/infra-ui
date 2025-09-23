/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/json",
		"ic-as/extension/interfaces/IExtension",
		"ic-as/item/NewsItem"
	], function (dojo, declare, lang, i18nactivitystream, JSON, IExtension, NewsItem) {
	
		var RepostExtension = declare("com.ibm.social.as.extension.RepostExtension", 
		IExtension,
		{
			// String object used to override the default news item strings
			strings: null,
			
			// Reference to the news item class function
			newsItemClass: null,
			
			// Reference to the NewsItem class's prototype
			newsItemPrototype: null,
			
			// Message container
			messageContainer: null,
			
			messageNode: null,
			
			constructor: function(){
				// Make local references to these objects
				this.newsItemClass = NewsItem;
				this.newsItemPrototype = this.newsItemClass.prototype;
				this.strings = i18nactivitystream;
			},
			
			/**
			 * Called when the AS loads on the page.
			 */
			onLoad: function(){
				// Extend the news item class, adding an unfollow function
				as_console_debug("com.ibm.social.as.extension.RepostExtension - onLoad");
				
				lang.extend(this.newsItemClass, {
					onRepostClicked: this.onRepostClicked
				});
			
				var cfg = com.ibm.social.as.configManager.getConfigObject();
				var userInfo = cfg && cfg.userInfo;
				
				if(userInfo && userInfo.displayName){
					// Add a repost action to status updates items
					this.newsItemPrototype.addAction({
						name: "repost",
						text: this.strings.repostText,
						callback: "onRepostClicked",
						isActionDisplayed: lang.hitch(this, function(newsData) { return this.isRepostable(newsData) && newsData.id && newsData.id != ""; }),
						ordinal: 150
					});
				}
			},
			
			/**
			 * Called when the view is moved away from.
			 */
			onUnload: function(){	
				this.newsItemPrototype.removeAction("repost");
				lang.extend(this.newsItemClass, {
					onRepostClicked: undefined
				});
			},
			
			/**
			 * The 'Repost' link was clicked.
			 */
			onRepostClicked: function() {
				as_console_debug("com.ibm.social.as.extension.RepostExtension - onRepostClicked");

                var params = (this.configManager) ? this.configManager.mbConfigParams : undefined;
                var profilesPolicy = lconn.news.microblogging.sharebox.constants.UNAUTHORIZED_REASON.PROFILES_POLICY;
                var communityId = this.newsData.getCommunityId();

                if ((params) && (params.unauthorizedReason) && (params.unauthorizedReason === profilesPolicy)&&(!communityId))
                {
                    var message = this.strings.repostMsgErrorResGeneric;
                    this.displayRepostMessage(false,message,null);
                } else
				{
                    var id = this.newsData.id;
                    var scope = this;
                    var repostObj = {
                        verb: "bump",
                        id: id
                    };
                    var postBody = JSON.stringify(repostObj);
                    activityStreamAbstractHelper.xhrPost({
                        url : activityStreamAbstractHelper.getRepostUrl(),
                        postData: postBody,
                        handleAs: "json",
                        requireData: true,
                        headers: {"Content-Type":"application/json; charset=utf-8"},
                        handle: lang.hitch(scope, function(response){

                            var msgMore = null;
                            var success = null;
                            if(response instanceof Error) {
                                success = false;
                                var msg;
                                msgMore = response;
                                if ( response.status === 403 ) {
                                    msg = this.strings.repostMsgErrorResGeneric;
                                } else {
									/* If the error is not a 403, give a "generic" (translatable) error message */
                                    msg = this.strings.repostMsgFail;
                                }

                            }else {
                                success = true;
                                msg = this.strings.repostMsgSuccess;

                            }
                            this.displayRepostMessage(success,msg,msgMore);

                        })
                    });
                }


				
			},
			
			/**
			 * Check if the status update can be reposted
			 */
			isRepostable: function(newsData) {	
				return ((this.isStatusUpdateNewsItem(newsData) || newsData.isRepost()) && (newsData.getActivityIsPublic()));
			},
			
			/**
			 * Check to see if the news item is a status update
			 * @param newsData {object} new item data
			 */
			isStatusUpdateNewsItem: function(newsData) {
				var generatorId = newsData.getGeneratorId();
				
				// Make sure the generator is either profies or communities
				// and that the news data itself belongs to a status update
				return ((generatorId == "profiles" || generatorId == "communities") 
							&& newsData.isStatusUpdate());
			}
			
		});
		return RepostExtension;
	});
