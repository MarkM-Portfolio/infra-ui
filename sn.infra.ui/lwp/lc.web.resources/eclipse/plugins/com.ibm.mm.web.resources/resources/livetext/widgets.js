/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.mm.livetext.widgets");
dojo.provide("tagservices.widgets");

dojo.require("com.ibm.mm.enabler.debug");

dojo.declare("tagservices.widgets", null, {
	processTag: function(tag) {
    	com.ibm.mm.enabler.debug.entry("tagservices.widgets.processTag","Tag:"+tag);
        com.ibm.mm.enabler.debug.log("tagservices.widgets.processTag","widgets:process IWidget");
        var iWidget = iWidgetContainer.createWidget(tag);
        if(iWidget) iWidgetContainer.renderWidget(iWidget);
	}
});
