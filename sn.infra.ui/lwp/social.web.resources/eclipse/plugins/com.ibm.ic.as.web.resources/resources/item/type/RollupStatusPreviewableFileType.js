/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/RollupStatusFileType",
		"ic-as/item/type/StatusPreviewableFileType"
	], function (declare, RollupStatusFileType, StatusPreviewableFileType) {
	
		/**
		 * Rollup status previewable file news item type.
		 *
		 * @author Marco Vicente
		 */
		
		var RollupStatusPreviewableFileType = declare("com.ibm.social.as.item.type.RollupStatusPreviewableFileType",
		    [RollupStatusFileType,
		        StatusPreviewableFileType],
		    {
		        // {String} the type of news item this represents
		        type: "RollupStatusPreviewableFile",
		
		        /**
		         * Is the news data passed in eligible to be of type 'type'?
		         * @param newsData {Object} see NewsDataAccessor.
		         * @returns {Boolean} true if it is, false otherwise.
		         */
		        isOfType: function(newsData){
		            if(this.isRollupStatusFile(newsData)){
		                this.transform(newsData);
		
		                if(this.isPreviewable(newsData)){
		                    return true;
		                }
		            }
		
		            return false;
		        }
		    });
		
		return RollupStatusPreviewableFileType;
	});
