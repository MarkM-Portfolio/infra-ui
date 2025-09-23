/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"ic-as/item/RollupImageFileNewsItem",
		"ic-as/item/ContentNewsItem",
		"ic-as/item/FileNewsItem",
		"ic-as/item/FolderFileNewsItem",
		"ic-as/item/PreviewableFileNewsItem",
		"ic-as/item/ImageFileNewsItem",
		"ic-as/item/NoContentItem",
		"ic-as/item/NewsFeedError",
		"ic-as/item/RollupFileNewsItem",
		"ic-as/item/NewsItem",
		"ic-as/item/StatusStandaloneFileNewsItem",
		"ic-as/item/RollupPreviewableFileNewsItem",
		"ic-as/item/RollupNewsItem",
		"ic-as/item/RollupStatusFileNewsItem",
		"ic-as/item/RollupStatusImageFileNewsItem",
		"ic-as/item/RollupStatusNewsItem",
		"ic-as/item/RollupStatusPreviewableFileNewsItem",
		"ic-as/item/StatusNewsItem",
		"ic-as/item/StatusStandaloneImageFileNewsItem",
		"ic-as/item/StatusStandaloneNewsItem",
		"ic-as/item/StatusStandalonePreviewableFileNewsItem",
		"ic-as/item/manager/interfaces/INewsItemFactory"
	], function (declare, RollupImageFileNewsItem, ContentNewsItem, FileNewsItem, FolderFileNewsItem, PreviewableFileNewsItem, ImageFileNewsItem, NoContentItem, NewsFeedError, RollupFileNewsItem, NewsItem, StatusStandaloneFileNewsItem, RollupPreviewableFileNewsItem, RollupNewsItem, RollupStatusFileNewsItem, RollupStatusImageFileNewsItem, RollupStatusNewsItem, RollupStatusPreviewableFileNewsItem, StatusNewsItem, StatusStandaloneImageFileNewsItem, StatusStandaloneNewsItem, StatusStandalonePreviewableFileNewsItem, INewsItemFactory) {
	
		/**
		 * Factory tasked with creating different news item types.
		 */
		
		var NewsItemFactory = declare("com.ibm.social.as.item.manager.NewsItemFactory", 
		INewsItemFactory,
		{
			createNormalNewsItem: function(props, domNode){
				return new NewsItem(props, domNode);
			},
			
			createFileNewsItem: function(props, domNode){
				return new FileNewsItem(props, domNode);
			},
			
			createFolderFileNewsItem: function(props, domNode){
				return new FolderFileNewsItem(props, domNode);
			},
		
		    createPreviewableFileNewsItem: function(props, domNode){
		        return new PreviewableFileNewsItem(props, domNode);
		    },
		
			createImageFileNewsItem: function(props, domNode){
				return new ImageFileNewsItem(props, domNode);
			},
			
			createStatusNewsItem: function(props, domNode){
				return new StatusStandaloneNewsItem(props, domNode);
			},
			
			createRollupFileNewsItem: function(props, domNode){
				return new RollupFileNewsItem(props, domNode);
			},
		
		    createRollupPreviewableFileNewsItem: function(props, domNode){
		        return new RollupPreviewableFileNewsItem(props, domNode);
		    },
		
			createRollupImageFileNewsItem: function(props, domNode){
				return new RollupImageFileNewsItem(props, domNode);
			},
			
			createRollupStatusNewsItem: function(props, domNode){
				return new RollupStatusNewsItem(props, domNode);
			},
			
			createRollupStatusFileNewsItem: function(props, domNode){
				return new RollupStatusFileNewsItem(props, domNode);
			},
		
		    createRollupStatusPreviewableFileNewsItem: function(props, domNode){
		        return new RollupStatusPreviewableFileNewsItem(props, domNode);
		    },
		
			createRollupStatusImageFileNewsItem: function(props, domNode){
				return new RollupStatusImageFileNewsItem(props, domNode);
			},
		
			createStatusFileNewsItem: function(props, domNode){
				return new StatusStandaloneFileNewsItem(props, domNode);
			},
		
		    createStatusPreviewableFileNewsItem: function(props, domNode){
		        return new StatusStandalonePreviewableFileNewsItem(props, domNode);
		    },
		
			createStatusImageFileNewsItem: function(props, domNode){
				return new StatusStandaloneImageFileNewsItem(props, domNode);
			},
			
			createRollupNewsItem: function(props, domNode){
				return new RollupNewsItem(props, domNode);
			},
		
			createNoContentNewsItem: function(props, domNode){
				return new NoContentItem(props, domNode);
			},
			
			createNewsFeedErrorNewsItem: function(props, domNode){
				return new NewsFeedError(props, domNode);
			},
			
			createContentNewsItem: function(props, domNode) {
				return new ContentNewsItem(props, domNode);
			}
		});
		
		return NewsItemFactory;
	});
