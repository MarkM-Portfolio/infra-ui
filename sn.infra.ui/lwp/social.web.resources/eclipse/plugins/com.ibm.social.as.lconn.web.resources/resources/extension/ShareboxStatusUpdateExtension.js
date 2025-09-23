/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.listener.Subscriber");
dojo.require("com.ibm.social.as.util.ItemUtil");
dojo.require("com.ibm.social.as.constants.events");

/**
 * Extension builds a news item client for rendering the AS immediately
 * after a MB post is successful. The news item rendered will initially
 * be restricted in the amount of actions it can perform. For example, 
 * users will not be able to Save these news items. Subsequent to showing
 * the news item client side, we call the DynamicLoadController (via the
 * ADDACTIVITYENTRY event) and if the news item is created on the server,
 * it will replace the one displayed in the Activity Stream.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.lconn.extension.ShareboxStatusUpdateExtension", 
[com.ibm.social.as.extension.interfaces.IExtension,
 com.ibm.social.as.listener.Subscriber,
 com.ibm.social.as.util.ItemUtil],
{
	addActivityEntryEvent: com.ibm.social.as.constants.events.ADDACTIVITYENTRY,
	postMessageEvent: com.ibm.social.as.constants.events.STATUSUPDATEPOST,
	populateActivityStreamEvent: com.ibm.social.as.constants.events.POPULATE,
	streamFilteredEvent: com.ibm.social.as.constants.events.ASSTREAMFILTERED,
	allowFakeStatus: true,
	
	onLoad: function(){
		// Subscribe to the postMessage event. Hitch so we get the right context.
		this.subscribe(this.postMessageEvent, dojo.hitch(this,"statusUpdatePosted"));
		this.subscribe(this.streamFilteredEvent, dojo.hitch(this,"setAllowFakeStatus"));
	},
	
	/**
	 * Allow a publisher to block status update faking if the stream is filtered in some way
	 */
	setAllowFakeStatus: function(allowed){
		this.allowFakeStatus = !allowed;
	},
	
	/**
	 * Return profiles generator
	 */
	getGenerator: function(){
		var generator = {id: "profiles"}
		
		if (lconn.core.config.services.profiles) {
			generator.url = lconn.core.url.getServiceUrl(lconn.core.config.services.profiles).uri;
		}
		
		return generator;
	},
	
	/**
	 * Status update has been posted from the MB sharebox. Add it to the AS client side
	 * and then check the server to see if it has been created.
	 */
	statusUpdatePosted: function(data) {
		var newsItem = data.entry;

		// Build the news data object from the MB response
		var newsData = {
			published: newsItem.published,
			generator: this.getGenerator(),
			connections: {
				broadcast: "true"
			},
			object: {
				attachments: newsItem.attachments,
				author: newsItem.author,
				id: newsItem.id,
				objectType: newsItem.objectType,
				tags: newsItem.tags,
				url: newsItem.url
			},
			actor: newsItem.author,
			verb: "post"
		};
		
		// Append person card and content together
		newsData.object.summary = newsItem.summary;
		
		// Publish the news item for rendering in the AS
		var newsItemForPublish = {entry: newsData};
		if(this.allowFakeStatus){
		// Fire addactivityentry after showing the news item. May not be successful.
			dojo.publish(this.populateActivityStreamEvent, [newsItemForPublish, false, true]);
			dojo.publish(this.addActivityEntryEvent, [newsItem.id]);
		}
	},
	
	onUnload: function(){
		// Will automatically unsubscribe to all events
		this.destroy();
	}
});
