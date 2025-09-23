/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.NoContentItem");

dojo.require("com.ibm.social.as.item.interfaces.INewsItem");

dojo.requireLocalization("com.ibm.social.as", "activitystream");

dojo.declare("com.ibm.social.as.item.NoContentItem", 
[com.ibm.social.as.item.interfaces.INewsItem],
{
	// Resource bundle
	strings: null,
	
	noContentInnerHtml: "",

	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/noContentItem.html"),
	
	// TODO: May need a different message depending on the feed we wish to display
	// TODO: Talk to Karl and see if we can spice this up a little bit.
	
	postMixInProperties: function(){
		this.strings = dojo.i18n.getLocalization("com.ibm.social.as", "activitystream");
		this.noContentInnerHtml = (this.noContentInnerHtml) ? this.noContentInnerHtml : this.strings.noContentText;
	}
});
