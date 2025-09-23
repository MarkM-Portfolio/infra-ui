/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.RollupPreviewableFileType");

dojo.require("com.ibm.social.as.item.type.PreviewableFileType");
dojo.require("com.ibm.social.as.item.type.RollupFileType");

/**
 * Rollup previewable file news item type.
 *
 * @author Marco Vicente
 */

dojo.declare("com.ibm.social.as.item.type.RollupPreviewableFileType",
    [com.ibm.social.as.item.type.RollupFileType,
        com.ibm.social.as.item.type.PreviewableFileType],
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
