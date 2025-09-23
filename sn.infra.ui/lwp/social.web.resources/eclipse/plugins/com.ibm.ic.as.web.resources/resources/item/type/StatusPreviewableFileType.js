/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"ic-as/item/type/PreviewableFileType",
		"ic-as/item/type/StatusFileType"
	], function (declare, PreviewableFileType, StatusFileType) {
	
		/**
		 * Status update with image file attachment type.
		 *
		 * @author Marco Vicente
		 */
		
		var StatusPreviewableFileType = declare("com.ibm.social.as.item.type.StatusPreviewableFileType",
		    [StatusFileType,
		        PreviewableFileType],
		    {
		        // {String} the type of news item this represents
		        type: "StatusPreviewableFile",
		
		        /**
		         * Is the news data passed in eligible to be of type 'type'?
		         * @param newsData {Object} see NewsDataAccessor.
		         * @returns {Boolean} true if it is, false otherwise.
		         */
		        isOfType: function(newsData){
		            if(this.isStatusFile(newsData)){
		                // Do the transform here, will set image properties
		                this.transform(newsData);
		
		                return this.isStatusPreviewableFile(newsData);
		            }
		        },
		
		        /**
		         * Is this a StatusPreviewableFile type
		         */
		        isStatusPreviewableFile: function(newsData){
		            
		            return this.isPreviewable(newsData);
		        }
		    });
		
		return StatusPreviewableFileType;
	});
