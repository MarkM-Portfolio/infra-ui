/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.StatusStandaloneFileNewsItem");

dojo.require("com.ibm.social.as.item.StatusStandaloneNewsItem");
dojo.require("com.ibm.social.as.item.FileNewsItem");


/**
 * Provide a class for standalone status update file - use object summary instead of title
 * @author Stephen Crawford
 */

dojo.declare(
"com.ibm.social.as.item.StatusStandaloneFileNewsItem", 
[com.ibm.social.as.item.StatusStandaloneNewsItem,
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

dojo.declare("com.ibm.social.as.item.DummyStatusStandaloneFileNewsItem",null,
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "item/templates/statusUpdateFileNewsItem.html")
});

