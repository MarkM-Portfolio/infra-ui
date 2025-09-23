/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.StatusStandalonePreviewableFileNewsItem");

dojo.require("com.ibm.social.as.item.StatusStandaloneFileNewsItem");
dojo.require("com.ibm.social.as.item.PreviewableFileNewsItem");

/**
 * Provide a class for standalone status update image file - use object summary instead of title
 * @author Marco Vicente
 */

dojo.declare(
    "com.ibm.social.as.item.StatusStandalonePreviewableFileNewsItem",
    [com.ibm.social.as.item.StatusStandaloneFileNewsItem,
        com.ibm.social.as.item.PreviewableFileNewsItem],
    {
    });
