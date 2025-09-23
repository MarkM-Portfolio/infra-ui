/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.lconn.extension.GadgetPreloaderExtension");

dojo.require("com.ibm.social.as.extension.interfaces.IExtension");
dojo.require("com.ibm.social.as.listener.Subscriber");
dojo.require("com.ibm.social.as.constants.events");
dojo.require("com.ibm.lconn.gadget.container.iContainer2");

/**
 * Extension for preloading any gadgets returned in the Activity Stream
 * feed. Essentially, it listens out for the AS populate event and, when
 * fired, it reads the AS API response object from it. Any gadget URLs
 * found within the response are built into a gadget object and preloaded.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.lconn.extension.GadgetPreloaderExtension", 
[com.ibm.social.as.extension.interfaces.IExtension,
 com.ibm.social.as.listener.Subscriber],
{
	gadgetContainer: null,
	
	// Event to indicate end of populating the news feed
	populateEventName: com.ibm.social.as.constants.events.POPULATE,
	
	/**
	 * Called on extension load.
	 */
	onLoad: function(){
		// Subscribe to the postMessage event. Hitch so we get the right context.
		this.subscribe(this.populateEventName, dojo.hitch(this,"preloadGadgets"));
	},
	
	/**
	 * Called on extension unload.
	 */
	onUnload: function(){
		// This will unsubscribe to the listener
		this.destroy();
	},
	
	/**
	 * Preload any gadgets that may have be returned in the AS feed.
	 */
	preloadGadgets: function(response){
		var entries = response.entry;
		var container = this.getGadgetContainer();
		var preloadGadgetObjs = this.buildGadgetObjects(this.getGadgetUrls(entries));
		
		if (preloadGadgetObjs.length > 0) {
			setTimeout(function() {
				if(preloadGadgetObjs && container && container.preloadWidgets){
					container.preloadWidgets(preloadGadgetObjs);
				}
			}, 5000);
		}
	},
	
	/**
	 * Build suitable gadget objects for the container preloader.
	 * @param gadgetUrls {String Array} gadget string URLs
	 * @returns {Object Array} of the format:
	 * 
	 * 		[
	 * 			{
	 * 				definitionUrl: gadgetUrl1,
	 *				componentType: "gadget"
	 * 			},
	 * 			{
	 * 				definitionUrl: gadgetUrl2,
	 *			componentType: "gadget"
	 * 			},
	 * 			...
	 * 		]
	 * 
	 */
	buildGadgetObjects: function(gadgetUrls){
		var gadgetObjects = [];
		
		for(var g = gadgetUrls.length-1; g >= 0; g--){
			var gadgetUrl = gadgetUrls[g];
			
			gadgetObjects.push({
				definitionUrl: gadgetUrl,
				componentType: "gadget"
			});
		}
		
		return gadgetObjects;
	},
	
	/**
	 * Get the gadget URLs from the passed entries.
	 * @param entries {Array} response from the AS API in the
	 * activity stream JSON format
	 * @returns {String Array} URLs of any gadgets found
	 */
	getGadgetUrls: function(entries){
		var gadgetUrls = [];
		
		if(entries){
			// Convert to an array if not one
			entries = dojo.isArray(entries) ? entries : [entries];
			
			// Iterate through each of the entries
			for(var i = entries.length-1; i >= 0; i--){
				var entry = entries[i];
				
				// If an entry holds a gadget URL
				if(entry.openSocial && entry.openSocial.embed 
						&& entry.openSocial.embed.gadget){
					var gadgetUrl = entry.openSocial.embed.gadget;
					
					// If not already loaded in our gadgetUrls
					if(dojo.indexOf(gadgetUrls, gadgetUrl) < 0){
						// Push that URL onto our preload gadget URLs list
						gadgetUrls.push(gadgetUrl);
					}
				}
			}
		}
		
		return gadgetUrls;
	},
	
	/**
	 * Get the gadget container. May reuse stored one.
	 * @returns {Object} gadget container itself.
	 */
	getGadgetContainer: function(){
		if(!this.gadgetContainer){
			this.gadgetContainer = com.ibm.lconn.gadget.container.iContainer2;
		}
		
		return this.gadgetContainer;
	}
});
