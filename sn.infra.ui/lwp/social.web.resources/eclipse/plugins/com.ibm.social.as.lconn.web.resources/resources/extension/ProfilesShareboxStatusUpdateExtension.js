/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.ProfilesShareboxStatusUpdateExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.listener.Subscriber");
dojo.require("com.ibm.social.as.util.LinkTarget");
dojo.require("com.ibm.social.as.util.ItemUtil");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.lconn.layout.people");

/**
 * TODO: Temporary class whilst we wait on the API to support both involved and
 * objectId filters at the same time. Can be replaced with 'ShareboxStatusUpdateExtension'
 * eventually.
 */

dojo.declare("com.ibm.social.as.lconn.extension.ProfilesShareboxStatusUpdateExtension", 
[com.ibm.social.as.extension.interfaces.IExtension,
 com.ibm.social.as.listener.Subscriber,
 com.ibm.social.as.util.LinkTarget,
 com.ibm.social.as.util.ItemUtil],
{
	// Subscribed events.
	subscribedEventHandle: null,
	
	_postMessageEventName: com.ibm.social.as.constants.events.ADDACTIVITYENTRY,
	_populateActivityStreamEventName: com.ibm.social.as.constants.events.POPULATE,
	
	/**
	 * Called when the Action Required view loads on the page.
	 */
	onLoad: function(){
		// Subscribe to the postMessage event. Hitch so we get the right context.
		this.subscribe(this._postMessageEventName, 
								  dojo.hitch(this,"_respondToStatusPost"));
	},
	
	_respondToStatusPost: function(data) {
		var newsItem = data.entry;
		
		var commonUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources);
		var profileUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles);
		var homepageUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.homepage);
		
		//call to core person api for profiles url
		var personObj = {userid: newsItem.author.id}		
		com.ibm.lconn.layout.people.getProfileUrl(personObj);

		var originalContent = newsItem.summary;
		
		newsItem = dojo.mixin(newsItem, {
			generator: {
				image: {url: commonUrl + "/web/com.ibm.oneui3.styles/imageLibrary/icons/ComponentsGray/ProfilesGray16.png"},
				id: "profiles",
				url: profileUrl
			},
			connections: {
				broadcast: "true"
			},
			openSocial: {
				embed: {
					context: {
						actor: newsItem.author,
						eventTitle: originalContent,
						eventType: "profiles.status.updated",
						summary: originalContent,
						connectionsContentUrl: profileUserUrl,
						published: newsItem.published,
						iconUrl: commonUrl + "/web/com.ibm.oneui3.styles/imageLibrary/icons/ComponentsGray/ProfilesGray16.png",
						title: newsItem.author.displayName,
						id: newsItem.id
					},
					gadget: commonUrl + "/web/com.ibm.social.ee/StatusUpdate.xml"
				}
			},
			actor: newsItem.author
		});
		
		// Mix in the embed object so EE can be opened for the new item.
		dojo.mixin(newsItem.object, {
			author: newsItem.author
		});
		
		newsItem.content = newsItem.summary;
		
		var newsItemForPublish = {entry: [newsItem]};

		dojo.publish(this._populateActivityStreamEventName,
 						[newsItemForPublish, true]);
	},
	
	/**
	 * Called when the Action Required view is moved away from.
	 */
	onUnload: function(){
		this.destroy();
	}
});
