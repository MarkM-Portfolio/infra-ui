define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ic-ui/Feeds",
	"../util/html"
], function (declare, lang, Feeds, html) {

	/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */
	
	var Feeds = declare("lconn.core.widget.Feeds", Feeds, {
	   
	   /* Implementors MUST provide these strings */
	   _strings: { /*
	      feedreader_warning: "Warning displayed in a browser without feed reader capabilities. See lconn.core.strings.rs_feedreader_warning.",
	       */
	   },
	   
	   decorate: function(a, l) {
	      this.connect(a, "onclick", null, lang.partial(html.checkFeedSubscription, this._strings.feedreader_warning, a.href));
	   }
	});
	
	return Feeds;
});
