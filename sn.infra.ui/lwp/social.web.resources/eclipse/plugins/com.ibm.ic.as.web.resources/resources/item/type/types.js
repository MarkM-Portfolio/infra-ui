/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"ic-as/item/type/RollupStatusType",
		"ic-as/item/type/FileType",
		"ic-as/item/type/ImageFileType",
		"ic-as/item/type/PreviewableFileType",
		"ic-as/item/type/RollupFileType",
		"ic-as/item/type/RollupStatusFileType",
		"ic-as/item/type/RollupType",
		"ic-as/item/type/StatusFileType",
		"ic-as/item/type/StatusImageFileType",
		"ic-as/item/type/StatusPreviewableFileType",
		"ic-as/item/type/StatusType"
	], function (RollupStatusType, FileType, ImageFileType, PreviewableFileType, RollupFileType, RollupStatusFileType, RollupType, StatusFileType, StatusImageFileType, StatusPreviewableFileType, StatusType) {
	
		/* globals com */
		
		/**
		 * List the classes below in the order you wish them to be processed.
		 * Classes will be processed top down. 
		 */
		
		com.ibm.social.as.item.type.types = [
			"com.ibm.social.as.item.type.RollupStatusImageFileType",
		    "com.ibm.social.as.item.type.RollupStatusPreviewableFileType",
			"com.ibm.social.as.item.type.RollupStatusFileType",
			"com.ibm.social.as.item.type.RollupImageFileType",
		    "com.ibm.social.as.item.type.RollupPreviewableFileType",
			"com.ibm.social.as.item.type.RollupFileType",
			"com.ibm.social.as.item.type.RollupStatusType",
			"com.ibm.social.as.item.type.RollupType",
			"com.ibm.social.as.item.type.ImageFileType",
		    "com.ibm.social.as.item.type.PreviewableFileType",
			"com.ibm.social.as.item.type.FolderFileType",
			"com.ibm.social.as.item.type.FileType",
			"com.ibm.social.as.item.type.StatusImageFileType",
		    "com.ibm.social.as.item.type.StatusPreviewableFileType",
			"com.ibm.social.as.item.type.StatusFileType",
			"com.ibm.social.as.item.type.StatusType",
			"com.ibm.social.as.item.type.ContentType",
			"com.ibm.social.as.item.type.NormalType"
		];
		return com.ibm.social.as.item.type.types;
	});
