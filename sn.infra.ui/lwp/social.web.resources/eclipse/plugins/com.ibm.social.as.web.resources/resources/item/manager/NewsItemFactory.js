/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.manager.NewsItemFactory");

dojo.require("com.ibm.social.as.item.manager.interfaces.INewsItemFactory");
dojo.require("com.ibm.social.as.item.NewsItem");
dojo.require("com.ibm.social.as.item.ContentNewsItem");
dojo.require("com.ibm.social.as.item.FileNewsItem");
dojo.require("com.ibm.social.as.item.FolderFileNewsItem");
dojo.require("com.ibm.social.as.item.PreviewableFileNewsItem");
dojo.require("com.ibm.social.as.item.ImageFileNewsItem");
dojo.require("com.ibm.social.as.item.NoContentItem");
dojo.require("com.ibm.social.as.item.NewsFeedError");
dojo.require("com.ibm.social.as.item.RollupFileNewsItem");
dojo.require("com.ibm.social.as.item.RollupPreviewableFileNewsItem");
dojo.require("com.ibm.social.as.item.RollupImageFileNewsItem");
dojo.require("com.ibm.social.as.item.RollupNewsItem");
dojo.require("com.ibm.social.as.item.RollupStatusFileNewsItem");
dojo.require("com.ibm.social.as.item.RollupStatusPreviewableFileNewsItem");
dojo.require("com.ibm.social.as.item.RollupStatusImageFileNewsItem");
dojo.require("com.ibm.social.as.item.RollupStatusNewsItem");
dojo.require("com.ibm.social.as.item.StatusStandaloneFileNewsItem");
dojo.require("com.ibm.social.as.item.StatusStandalonePreviewableFileNewsItem");
dojo.require("com.ibm.social.as.item.StatusStandaloneImageFileNewsItem");
dojo.require("com.ibm.social.as.item.StatusNewsItem");
dojo.require("com.ibm.social.as.item.StatusStandaloneNewsItem");

/**
 * Factory tasked with creating different news item types.
 */

dojo.declare("com.ibm.social.as.item.manager.NewsItemFactory", 
[com.ibm.social.as.item.manager.interfaces.INewsItemFactory],
{
	createNormalNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.NewsItem(props, domNode);
	},
	
	createFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.FileNewsItem(props, domNode);
	},
	
	createFolderFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.FolderFileNewsItem(props, domNode);
	},

    createPreviewableFileNewsItem: function(props, domNode){
        return new com.ibm.social.as.item.PreviewableFileNewsItem(props, domNode);
    },

	createImageFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.ImageFileNewsItem(props, domNode);
	},
	
	createStatusNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.StatusStandaloneNewsItem(props, domNode);
	},
	
	createRollupFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.RollupFileNewsItem(props, domNode);
	},

    createRollupPreviewableFileNewsItem: function(props, domNode){
        return new com.ibm.social.as.item.RollupPreviewableFileNewsItem(props, domNode);
    },

	createRollupImageFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.RollupImageFileNewsItem(props, domNode);
	},
	
	createRollupStatusNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.RollupStatusNewsItem(props, domNode);
	},
	
	createRollupStatusFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.RollupStatusFileNewsItem(props, domNode);
	},

    createRollupStatusPreviewableFileNewsItem: function(props, domNode){
        return new com.ibm.social.as.item.RollupStatusPreviewableFileNewsItem(props, domNode);
    },

	createRollupStatusImageFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.RollupStatusImageFileNewsItem(props, domNode);
	},

	createStatusFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.StatusStandaloneFileNewsItem(props, domNode);
	},

    createStatusPreviewableFileNewsItem: function(props, domNode){
        return new com.ibm.social.as.item.StatusStandalonePreviewableFileNewsItem(props, domNode);
    },

	createStatusImageFileNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.StatusStandaloneImageFileNewsItem(props, domNode);
	},
	
	createRollupNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.RollupNewsItem(props, domNode);
	},

	createNoContentNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.NoContentItem(props, domNode);
	},
	
	createNewsFeedErrorNewsItem: function(props, domNode){
		return new com.ibm.social.as.item.NewsFeedError(props, domNode);
	},
	
	createContentNewsItem: function(props, domNode) {
		return new com.ibm.social.as.item.ContentNewsItem(props, domNode);
	}
});
