/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.StatusPreviewableFileType");

dojo.require("com.ibm.social.as.item.type.StatusFileType");
dojo.require("com.ibm.social.as.item.type.PreviewableFileType");

/**
 * Status update with image file attachment type.
 *
 * @author Marco Vicente
 */

dojo.declare("com.ibm.social.as.item.type.StatusPreviewableFileType",
    [com.ibm.social.as.item.type.StatusFileType,
        com.ibm.social.as.item.type.PreviewableFileType],
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
