/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.ee.EEManager");

dojo.require("com.ibm.social.ee.gadget.EEPreview");
dojo.require("com.ibm.social.as.ee.AbstractEEManager");

/**
 * Embedded experience manager that looks after the creation
 * and control of the EE popup and artifacts.
 * @author Robert Campion
 */

dojo.declare(
"com.ibm.social.as.ee.EEManager", 
[com.ibm.social.as.ee.AbstractEEManager],
{
	constructor: function() {
	   //Setup EE Preview
       this.preview = this.getEEPreview();
       this.setupEEPreviewSubscribes();
    },

	setupFeedDestroySubscribes: function() {
		this.subscribe(this.feedDestroyEvent, dojo.hitch(this, function(item, e) {
			this.tempNewsItem = null;
			this.newsItem = null;
			this.preview.destroy();
			this.preview = this.getEEPreview();
			this.setupEEPreviewSubscribes();
		}));
	},
	getEEPreview: function() {
		return new com.ibm.social.ee.gadget.EEPreview(null, this.iterator);
	}
});
