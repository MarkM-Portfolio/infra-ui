/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.StatusStandaloneImageFileNewsItem");

dojo.require("com.ibm.social.as.item.StatusStandaloneFileNewsItem");
dojo.require("com.ibm.social.as.item.ImageFileNewsItem");

/**
 * Provide a class for standalone status update image file - use object summary instead of title
 * @author Stephen Crawford
 */

dojo.declare(
"com.ibm.social.as.item.StatusStandaloneImageFileNewsItem", 
[com.ibm.social.as.item.StatusStandaloneFileNewsItem,
 com.ibm.social.as.item.ImageFileNewsItem],
{
});
