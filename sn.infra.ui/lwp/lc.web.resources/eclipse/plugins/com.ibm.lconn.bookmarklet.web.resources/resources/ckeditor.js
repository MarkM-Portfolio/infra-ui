/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	dojo.provide("lconn.bookmarklet.ckeditor");
	dojo.require("lconn.core.ckeditor");

	lconn.core.ckeditor.addCustomConfig(function() {
		dojo.mixin(CKEDITOR.config, {
			toolbar_BookmarkletDescription:
		        [
					['Bold','Italic','Underline'],
					['Strike','TextColor', 'BulletedList'],				
					['UrlLink', 'Smiley', 'BidiLtr', 'BidiRtl']
		        ],
		    toolbar_BookmarkletDiscussion:
		    	[
		    	 	['Bold','Italic','Underline'],
		    	 	['Strike','TextColor', 'BulletedList'],
		    	 	['Image', 'UrlLink', 'Smiley']
		    	],
		    language: djConfig.locale,
			toolbar: 'BookmarkletDescription',		
			height: 100
		});
	});
})();
