/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.types");

dojo.require("com.ibm.social.as.item.type.ContentType");
dojo.require("com.ibm.social.as.item.type.FileType");
dojo.require("com.ibm.social.as.item.type.FolderFileType");
dojo.require("com.ibm.social.as.item.type.PreviewableFileType");
dojo.require("com.ibm.social.as.item.type.ImageFileType");
dojo.require("com.ibm.social.as.item.type.NormalType");
dojo.require("com.ibm.social.as.item.type.RollupFileType");
dojo.require("com.ibm.social.as.item.type.RollupPreviewableFileType");
dojo.require("com.ibm.social.as.item.type.RollupImageFileType");
dojo.require("com.ibm.social.as.item.type.RollupStatusFileType");
dojo.require("com.ibm.social.as.item.type.RollupStatusPreviewableFileType");
dojo.require("com.ibm.social.as.item.type.RollupStatusImageFileType");
dojo.require("com.ibm.social.as.item.type.RollupStatusType");
dojo.require("com.ibm.social.as.item.type.RollupType");
dojo.require("com.ibm.social.as.item.type.StatusFileType");
dojo.require("com.ibm.social.as.item.type.StatusPreviewableFileType");
dojo.require("com.ibm.social.as.item.type.StatusImageFileType");
dojo.require("com.ibm.social.as.item.type.StatusType");

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
