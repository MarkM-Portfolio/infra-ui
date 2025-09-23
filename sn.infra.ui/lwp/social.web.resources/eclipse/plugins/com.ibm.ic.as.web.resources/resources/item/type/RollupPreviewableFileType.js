/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/PreviewableFileType",
		"ic-as/item/type/RollupFileType"
	], function (declare, PreviewableFileType, RollupFileType) {
	
		/**
		 * Rollup previewable file news item type.
		 *
		 * @author Marco Vicente
		 */
		
		var RollupPreviewableFileType = declare("com.ibm.social.as.item.type.RollupPreviewableFileType",
		    [RollupFileType,
		        PreviewableFileType],
		    {
		        // {String} the type of news item this represents
		        type: "RollupPreviewableFile",
		
		        /**
		         * Is the news data passed in eligible to be of type 'type'?
		         * @param newsData {Object} see NewsDataAccessor.
		         * @returns {Boolean} true if it is, false otherwise.
		         */
		        isOfType: function(newsData){
		            return this.isRollupPreviewableFile(newsData);
		        },
		
		        isRollupPreviewableFile: function(newsData){
		            return (this.isRollupFile(newsData) && this.isPreviewable(newsData));
		        }
		    });
		
		return RollupPreviewableFileType;
	});
