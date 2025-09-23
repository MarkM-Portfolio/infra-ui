/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.ee.EEManagerPortlet");
dojo.require("com.ibm.social.as.ee.AbstractEEManager");
dojo.require("lconn.core.util.LCDeferred");
dojo.require("net.jazz.ajax.xdloader");

dojo.declare("com.ibm.social.as.ee.EEManagerPortlet", com.ibm.social.as.ee.AbstractEEManager, {
	getEEPreviewPromise: function() {
       var promise = new lconn.core.util.LCDeferred();
	   net.jazz.ajax.xdloader.load_async("com.ibm.social.ee.gadget.EEPreviewPortlet",dojo.hitch(this, function() {
		   promise.resolve(this._getEEPreview());
	   }));
       return promise;
	},
	_getEEPreview: function() {
		return new com.ibm.social.ee.gadget.EEPreviewPortlet(null, this.iterator, com.ibm.social.as.configManager.getEEConfig(),
				   com.ibm.social.as.configManager.getUrlUpdater(),
				   com.ibm.social.as.configManager.getConfigObject().portletUrlSettings);
	},
	openPreviewDialog: function(domNode) {
		// Open the preview dialog, passing this item's domNode
		if(!this.preview) {
			var promise = this.getEEPreviewPromise();
			promise.then(dojo.hitch(this, function(preview){
				this.preview = preview;
				this.setupEEPreviewSubscribes();
				this.setupDelayedFeedDestroySubscribes();
				this.preview.dialog.open(domNode);
			}));
		} else {
			this.inherited(arguments);
		}
	},
	setupDelayedFeedDestroySubscribes: function(initialLoad) {
	    //Same logic as setupFeedDestroySubscribes in EEManager
		this.subscribe(this.feedDestroyEvent, dojo.hitch(this, function(item, e) {
			this.tempNewsItem = null;
			this.newsItem = null;
			this.preview.destroy();
			this.preview = this._getEEPreview();
			this.setupEEPreviewSubscribes();
		}));		
	}
});
