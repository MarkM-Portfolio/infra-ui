/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.StatusFileNewsItem");

dojo.require("com.ibm.social.as.item.StatusNewsItem");
dojo.require("com.ibm.social.as.item.FileNewsItem");


/**
 * @author Robert Campion
 */

dojo.declare(
"com.ibm.social.as.item.StatusFileNewsItem", 
[com.ibm.social.as.item.StatusNewsItem,
 com.ibm.social.as.item.FileNewsItem],
{
	templateExtension: dojo.cache("com.ibm.social.as", "item/templates/statusUpdateFileNewsItem.html"),
	/**
	 * Mix in data 
	 */
	mixInData: function(){
		this.inherited(arguments);
		if(this.isVideoPlayable()) 
			this.templateExtension = dojo.cache("com.ibm.social.as", "item/templates/fileNewsItem.html");
	}
	
});
dojo.declare("com.ibm.social.as.item.DummyStatusFileNewsItem",null,
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/statusUpdateFileNewsItem.html")
});
