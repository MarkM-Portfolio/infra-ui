/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/ee/AbstractEEManager",
		"ic-ee/gadget/EEPreview"
	], function (declare, lang, AbstractEEManager, EEPreview) {
	
		/**
		 * Embedded experience manager that looks after the creation
		 * and control of the EE popup and artifacts.
		 * @author Robert Campion
		 */
		
		var EEManager = declare(
		"com.ibm.social.as.ee.EEManager", 
		AbstractEEManager,
		{
			constructor: function() {
			   //Setup EE Preview
		       this.preview = this.getEEPreview();
		       this.setupEEPreviewSubscribes();
		    },
		
			setupFeedDestroySubscribes: function() {
				this.subscribe(this.feedDestroyEvent, lang.hitch(this, function(item, e) {
					this.tempNewsItem = null;
					this.newsItem = null;
					this.preview.destroy();
					this.preview = this.getEEPreview();
					this.setupEEPreviewSubscribes();
				}));
			},
			getEEPreview: function() {
				return new EEPreview(null, this.iterator);
			}
		});
		
		return EEManager;
	});
