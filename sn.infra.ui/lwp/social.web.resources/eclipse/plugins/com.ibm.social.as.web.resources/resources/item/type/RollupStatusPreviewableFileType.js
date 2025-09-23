/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.RollupStatusPreviewableFileType");

dojo.require("com.ibm.social.as.item.type.RollupStatusFileType");
dojo.require("com.ibm.social.as.item.type.StatusPreviewableFileType");

/**
 * Rollup status previewable file news item type.
 *
 * @author Marco Vicente
 */

dojo.declare("com.ibm.social.as.item.type.RollupStatusPreviewableFileType",
    [com.ibm.social.as.item.type.RollupStatusFileType,
        com.ibm.social.as.item.type.StatusPreviewableFileType],
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
