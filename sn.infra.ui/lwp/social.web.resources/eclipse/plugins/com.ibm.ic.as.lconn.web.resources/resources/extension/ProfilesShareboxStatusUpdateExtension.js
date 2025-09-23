/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/topic",
	"com/ibm/lconn/layout/people",
	"ic-as/constants/events",
	"ic-as/extension/interfaces/IExtension",
	"ic-as/listener/Subscriber",
	"ic-as/util/ItemUtil",
	"ic-as/util/LinkTarget"
], function (declare, lang, topic, people, events, IExtension, Subscriber, ItemUtil, LinkTarget) {

	/**
	 * TODO: Temporary class whilst we wait on the API to support both involved and
	 * objectId filters at the same time. Can be replaced with 'ShareboxStatusUpdateExtension'
	 * eventually.
	 */
	
	var ProfilesShareboxStatusUpdateExtension = declare("com.ibm.social.as.lconn.extension.ProfilesShareboxStatusUpdateExtension", 
	[IExtension,
	 Subscriber,
	 LinkTarget,
	 ItemUtil],
	{
		// Subscribed events.
		subscribedEventHandle: null,
		
		_postMessageEventName: events.ADDACTIVITYENTRY,
		_populateActivityStreamEventName: events.POPULATE,
		
		/**
		 * Called when the Action Required view loads on the page.
		 */
		onLoad: function(){
			// Subscribe to the postMessage event. Hitch so we get the right context.
			this.subscribe(this._postMessageEventName, 
									  lang.hitch(this,"_respondToStatusPost"));
		},
		
		_respondToStatusPost: function(data) {
			var newsItem = data.entry;
			
			var commonUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.webresources);
			var profileUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles);
			var homepageUrl = lconn.core.url.getServiceUrl(lconn.core.config.services.homepage);
			
			//call to core person api for profiles url
			var personObj = {userid: newsItem.author.id}		
			people.getProfileUrl(personObj);
	
			var originalContent = newsItem.summary;
			
			newsItem = lang.mixin(newsItem, {
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
			lang.mixin(newsItem.object, {
				author: newsItem.author
			});
			
			newsItem.content = newsItem.summary;
			
			var newsItemForPublish = {entry: [newsItem]};
	
			topic.publish(this._populateActivityStreamEventName, newsItemForPublish, true);
		},
		
		/**
		 * Called when the Action Required view is moved away from.
		 */
		onUnload: function(){
			this.destroy();
		}
	});
	
	return ProfilesShareboxStatusUpdateExtension;
});
