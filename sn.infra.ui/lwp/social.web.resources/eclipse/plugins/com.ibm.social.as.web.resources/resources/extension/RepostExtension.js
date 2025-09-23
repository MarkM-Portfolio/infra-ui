/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.extension.RepostExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.item.NewsItem");
dojo.require("com.ibm.oneui.controls.MessageBox");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.extension.RepostExtension", 
[com.ibm.social.as.extension.interfaces.IExtension],
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
		this.newsItemClass = com.ibm.social.as.item.NewsItem;
		this.newsItemPrototype = this.newsItemClass.prototype;
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
	},
	
	/**
	 * Called when the AS loads on the page.
	 */
	onLoad: function(){
		// Extend the news item class, adding an unfollow function
		as_console_debug("com.ibm.social.as.extension.RepostExtension - onLoad");
		
		dojo.extend(this.newsItemClass, {
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
				isActionDisplayed: dojo.hitch(this, function(newsData) { return this.isRepostable(newsData) && newsData.id && newsData.id != ""; }),
				ordinal: 150
			});
		}
	},
	
	/**
	 * Called when the view is moved away from.
	 */
	onUnload: function(){	
		this.newsItemPrototype.removeAction("repost");
		dojo.extend(this.newsItemClass, {
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
            var postBody = dojo.toJson(repostObj);
            activityStreamAbstractHelper.xhrPost({
                url : activityStreamAbstractHelper.getRepostUrl(),
                postData: postBody,
                handleAs: "json",
                requireData: true,
                headers: {"Content-Type":"application/json; charset=utf-8"},
                handle: dojo.hitch(scope, function(response){

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
		return (this.isStatusUpdateNewsItem(newsData) && (newsData.getActivityIsPublic() || newsData.isRepost()));
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
