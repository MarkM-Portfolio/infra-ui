/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */


	define([
		"dojo/_base/declare",
		"ic-as/item/type/FileType",
		"ic-incontext/util/text"
	], function (declare, FileType, text) {
	
		/**
		 * Previewable file upload type.
		 *
		 * @author Marco Vicente
		 */
		
		var PreviewableFileType = declare("com.ibm.social.as.item.type.PreviewableFileType",
		    FileType,
		    {
		        // {String} the type of news item this represents
		        type: "PreviewableFile",
		
		        /**
		         * Is the news data passed in eligible to be of type 'type'?
		         * @param newsData {Object} see NewsDataAccessor.
		         * @returns {Boolean} true if it is, false otherwise.
		         */
		        isOfType: function(newsData){
		            var isFile = this.isFile(newsData);
		
		            // If it's a file and and image type, return true
		            if(isFile && this.isPreviewable(newsData)){
		                return true;
		            }
		
		            return false;
		        },
		
		        /**
		         * Determines whether this item has a preview image.
		         * @param newsData {Object} see NewsDataAccessor.
		         * @returns {Boolean} true if has preview, false otherwise
		         */
		        isPreviewable: function(newsData){
		
		            var fileName = newsData.getActivityDisplayName() || "";
		            // TODO: File type will have to be derived from media type once available
		            var fileType = text.getExtension(fileName);
		
		            return (newsData.getActivityImageUrl() && fileType !== "mp4" && fileType !== "mov");
		        }
		    });
		
		return PreviewableFileType;
	});
