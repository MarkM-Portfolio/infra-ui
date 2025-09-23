/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._UrlPreviewMixin");
dojo.require("com.ibm.social.incontext.widget.MessageContainer");
dojo.require("lconn.core.widget.urlPreview.URLPreviewNode");
dojo.require("com.ibm.social.incontext.util.url");

/* globals com, lconn */

dojo.declare("com.ibm.social.ee.gadget._UrlPreviewMixin", null, {
    messageContainer: null,
    // Must be implemented


    // Initialize url preview
    createUrlPreviewNode: function (previewNode) {

        var urlThumbnails = [];
        var playbackEnabled = false;
        var urlVideo = "";
        var provider_url = "";

        if (this.data.ref.imageUrl) {
            urlThumbnails = [
                { src: this.data.ref.imageUrl, alt: this.data.ref.displayName}
            ];
        }

        if (this.data.ref.video && this.data.ref.video[0]) {

            urlVideo = [
                {
                    "type": this.data.ref.video[0].type,
                    "width": this.data.ref.video[0].width,
                    "height": this.data.ref.video[0].height,
                    "url": this.data.ref.video[0].url
                }
            ];
            playbackEnabled = true;
        }

        provider_url = com.ibm.social.incontext.util.url.removeRelativePathFromHost(this.data.ref.url);

        var videoControlsFocusCallbackFn = function () {
            if (dojo.getObject("com.ibm.connections.ee")) {
                com.ibm.connections.ee.preventCloseOnEscape();
            }
        };

        var videoControlsBlurCallbackFn = function () {
            if (dojo.getObject("com.ibm.connections.ee")) {
                com.ibm.connections.ee.allowCloseOnEscape(true);
            }
        };

        var urlPreview = new lconn.core.widget.urlPreview.URLPreviewNode({
            url: this.data.ref.url,
            data: {
                url: this.data.ref.url,
                provider_url: provider_url,
                title: this.data.ref.displayName,
                description: this.data.ref.description,
                thumbnails: urlThumbnails,
                video: urlVideo,
                enablePlayback: playbackEnabled
            },
            videoControlsFocusCallback: videoControlsFocusCallbackFn,
            videoControlsBlurCallback: videoControlsBlurCallbackFn
        });

        urlPreview.placeAt(previewNode, "first");

        previewNode.style.display = "";

        dojo.connect(urlPreview.thumbnailContainer, "onclick", this, this.onSizeChange);
    }

});