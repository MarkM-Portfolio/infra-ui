define([
	"dojo",
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/ready",
	"net/jazz/ajax/xdloader"
], function (dojo, lang, dom, domStyle, ready, xdloader) {

	/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */
	
	/**
	 *	Stub to prefetch Sharebox dialog and control it through a proxy object
	 */
	(function() {
	// 8 seconds but could be configurable
	var TIMEOUT = 8000;
	
	var loaded = false;
	function _dialogLoaded(cb) {
		loaded = true;
		if (typeof cb === 'function') cb();
	}
	
	function _loadSharebox(cb) {
		xdloader.load_async("com.ibm.social.sharebox.dialog", lang.partial(_dialogLoaded, cb));
	}
	function _initSharebox() {
		com.ibm.social.sharebox.init();
	}
	function _showSharebox() {
		com.ibm.social.sharebox.show();
	}
	
	com.ibm.social.sharebox.dialogProxy = {
		show: function() {
			if (loaded) {
				_showSharebox();
			} else {
				_loadSharebox(_showSharebox);
			}
		}
	};
	
	ready(function() {
		//Check if share button is displayed - If no share button (aka anonymous use case, do NOT load
		var shareNode = dom.byId("headerSharebox");
		if(shareNode && (domStyle.get(shareNode, "display") != "none")) {
			setTimeout(function() {
				_loadSharebox(_initSharebox);
			}, TIMEOUT);
		}
	});
	
	})();
	return com.ibm.social.sharebox.dialogProxy;
});
