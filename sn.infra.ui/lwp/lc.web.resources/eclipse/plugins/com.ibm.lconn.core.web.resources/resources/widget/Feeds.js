/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.core.widget.Feeds");
dojo.require("com.ibm.oneui.controls.Feeds");
dojo.require("lconn.core.util.html");

dojo.declare("lconn.core.widget.Feeds", com.ibm.oneui.controls.Feeds, {
   
   /* Implementors MUST provide these strings */
   _strings: { /*
      feedreader_warning: "Warning displayed in a browser without feed reader capabilities. See lconn.core.strings.rs_feedreader_warning.",
       */
   },
   
   decorate: function(a, l) {
      this.connect(a, "onclick", null, dojo.partial(lconn.core.util.html.checkFeedSubscription, this._strings.feedreader_warning, a.href));
   }
});
