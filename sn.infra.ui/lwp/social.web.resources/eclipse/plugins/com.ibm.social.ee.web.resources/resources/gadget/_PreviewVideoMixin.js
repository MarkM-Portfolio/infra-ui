/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.gadget._PreviewVideoMixin");

dojo.require("com.ibm.social.incontext.videoPreview.VideoPreviewNode");

dojo.declare("com.ibm.social.ee.gadget._PreviewVideoMixin", null, {

    getPreviewVideoNode: function () {},
    onSizeChange: function () {},
    onDisplayChange: function () {},

    videoPreview: "",

    // Initialize preview image
   initPreviewVideo: function(previewNode, fileName, fileUrl, filePageUrl, authorInfo) {

          var previewLink = this.getPreviewImageLink();

          var onSizeChange = dojo.hitch(this, function(){
              this.onSizeChange();
          });

          this.videoPreview = new com.ibm.social.incontext.videoPreview.VideoPreviewNode({
              data:{
                  title : fileName,
                  fileUrl : fileUrl,
                  filePageUrl: filePageUrl,
                  tagsTextNode: null,
                  authorInfo: authorInfo,
                  fileDetailsContainer: null,
                  image : previewLink,
                  imageHeight: 0,
                  imageWidth: 350,
                  maxHeight: 175,
                  prevId: null,
                  nextId: this.prefix + "_downloadLink",
                  context: this.context
              },
              onSizeChange: onSizeChange
          });
          this.videoPreview.placeAt(previewNode);
  
          if(this.context.onCloseDeferred && this.context.onCloseDeferred.fired === -1){
        	  this.context.onCloseDeferred.addCallback(this , "onClose");
          }

   },

    onClose: function(){
        if (this.videoPreview){
            this.videoPreview.destroy();
        }
    }

});