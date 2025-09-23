/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/ee/AbstractEEManager",
		"ic-core/util/LCDeferred",
		"net/jazz/ajax/xdloader"
	], function (declare, lang, AbstractEEManager, LCDeferred, xdloader) {
	
		var EEManagerPortlet = declare("com.ibm.social.as.ee.EEManagerPortlet", AbstractEEManager, {
			getEEPreviewPromise: function() {
		       var promise = new LCDeferred();
			   xdloader.load_async("com.ibm.social.ee.gadget.EEPreviewPortlet",lang.hitch(this, function() {
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
					promise.then(lang.hitch(this, function(preview){
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
				this.subscribe(this.feedDestroyEvent, lang.hitch(this, function(item, e) {
					this.tempNewsItem = null;
					this.newsItem = null;
					this.preview.destroy();
					this.preview = this._getEEPreview();
					this.setupEEPreviewSubscribes();
				}));		
			}
		});
		return EEManagerPortlet;
	});
