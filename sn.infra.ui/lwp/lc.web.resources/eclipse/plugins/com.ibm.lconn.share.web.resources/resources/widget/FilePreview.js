/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
   
dojo.provide('lconn.share.widget.FilePreview');
dojo.require('lconn.share.widget.Icon');
dojo.require("lconn.core.utilities");
dojo.require("lconn.core.util.imagechecker");

(function () {
/**
 * <p>
 * Provide the thumbnail image based on the objectTypeName or the extension of the file name (field "type" inherited from "lconn.share.widget.Icon").
 * It could be a standard icon (ie. zip) or an image returned by IBM Docs APIs
 * IMPORTANT: the parent node (an anchor, a div or any other element type) must contain always this widget.
 * At the beginning of the "postCreate" following CSS is applied to the parent node
 * - display: block;
 * - position: relative;
 * - width: the max width based on the "size" field
 * - height: the max height based on the "size" field
 * 
 * Usage (see "lconn.share.widget.FileThumbnail" for an example):
 * 
 * provide the following properties:
 *  - type: the type of the icon
 *  - size: the size of the image, which determine max-width and max-height CSS properties
 *  - alt: OPTIONAL - the alternative text of the icon
 *  - imagePath: OPTIONAL - the image source path, used in case of file types with a preview image (ie. jpg, png, etc..)
 *  - iconPath: OPTIONAL - the image/icon source path, in case of files with a specific icon (ie. files marked as IBM Docs)
 *  - iconClass OPTIONAL - the image/icon CSS class, in case of files with a specific icon (ie. files marked as IBM Docs)
 *  - hcModeText: OPTIONAL - used only in case of an IMG element. true if we need to manage the high contrast mode (default: true)
 *  - draftLabel: OPTIONAL - the draft label
 *  - fileImageBinary: OPTIONAL - the URL to get the binary version of the image, used during the execution of applyImageBase64
 *  
 * Example:
 * <img data-dojo-type="lconn.share.widget.FilePreview"
 *       data-dojo-props="
 *          type: 'zip',
 *          size: 'medium',
 *          alt: '...',
 *          imagePath: '...'" />
 * </p>
 *
 * @author Davide Riso <davide.riso@ie.ibm.com> 
 * @namespace lconn.share.widget.FilePreview
 * 
 */
dojo.declare("lconn.share.widget.FilePreview", [lconn.share.widget.Icon], {
   
   /** no CSS classes static mapping */
   spriteImages: {},

   /** the natural language "size", which determine max-width and max-height CSS properties
    * currently supports: small, medium, large
    *  */
   size: null,
   
   /** CSS class used for the parent node (see filePreview.css)
    *  */
   filePreviewParentNode: 'filePreviewParentNode',
   
   /** the image source path, used in case of file types with a preview image (ie. jpg, png, etc..) */
   imagePath: null,
   
   /** the image/icon source path, in case of files with a specific icon (ie. files marked as IBM Docs) */
   iconPath: null,
   
   /** the image/icon CSS class, in case of files with a specific icon (ie. files marked as IBM Docs) */
   iconClass: null,

   /** flag updated at the beginning, see checkImagePath */
   imageAvailable: false,
   
   /** high contrast mode text */
   hcModeText: true,

   /** the draft label */
   draftLabel: null,
   
   /** the URL to get the binary version of the image, used during the execution of applyImageBase64  */
   fileImageBinary: null,

   /** the image size for:
    *  - gallery (small)
    *  - thumbnail (medium)
    *  - preview-lightbox (large) 
    * @private
    * */
   _maxSize: {
      small: {maxWidth: '73px', maxHeight: '73px'},
      medium: {maxWidth: '200px', maxHeight: '132px'},
      large: {maxWidth: '450px', maxHeight: '450px'}
   },

   /** Set-up */
   postCreate: function() {
      this.checkImagePath();
   },
   
   /** this is the "real" postCreate, after the check of the image path */
   handlePreview: function() {
      if (this.size) {
         // the parent node must have display: block and position: relative
         dojo.addClass(this.domNode.parentNode, this.filePreviewParentNode);
         // force the size of the parent node
         dojo.setStyle(this.domNode.parentNode, 'width', this._maxSize[this.size].maxWidth);
         dojo.setStyle(this.domNode.parentNode, 'height', this._maxSize[this.size].maxHeight);
         // using position absolute, as we may need to add the play icon in overlay
         if (this.imageAvailable) {
            dojo.removeAttr(this.domNode, 'src');
            dojo.setAttr(this.domNode, 'src', this.imagePath);
            dojo.setStyle(this.domNode, 'maxWidth', this._maxSize[this.size].maxWidth);
            dojo.setStyle(this.domNode, 'maxHeight', this._maxSize[this.size].maxHeight);
         }
         if (!this.isVideo() && !this.imageAvailable) {
            var folderIconClass = _getFolderIconClass(this.widgetData);

            if (folderIconClass) {
               this.iconClass = folderIconClass;
            }

            if (this.iconPath) {
               // a specific icon is available, like in the IBM Docs icon use case
               dojo.setAttr(this.domNode, 'src', this.iconPath);
            }
            else if (this.iconClass) {
               dojo.addClass(this.domNode, this.iconClass);
            }
            else {
               // use one of the sprite icons available
               dojo.addClass(this.domNode, lconn.core.utilities.getFileIconClassName('.'+this.type, 64));
            }
         }
         if (this.draftLabel && this.size === 'medium') {
            // add the draft label for the medium size
            dojo.create("span", { role: 'note', innerHTML: this.draftLabel}, this.domNode, "after");
         }
      }
      this.applyAlternativeText();
      
      /* high contrast mode */
      if (this.hcModeText) {
         var hcTxt = dojo.create("span", {'class': 'hcModeText'}, this.domNode.parentNode, "last");
         dojo.place(dojo.doc.createTextNode(this.alt), hcTxt, "only");
      }
   },
   
   /** display the "play" icon in case of file type extensions .mp4 .mov .flv and set a black background if the preview image is not available */
   isVideo: function() {
      if (!this.disableVideoPreviewIcon && this._contains(['mp4','mov','flv'], this.type)) {
         if (!this.imageAvailable) {
            // no preview image available
            dojo.setStyle(this.domNode, 'width', '64px');
            dojo.setStyle(this.domNode, 'height', '64px');
            dojo.setStyle(this.domNode.parentNode, 'backgroundColor', '#000');
            dojo.setStyle(this.domNode, 'color', '#fff');
         }
         // using position absolute for the play icon in overlay
         dojo.create("img", {src: this._blankGif, 'class': 'otherHTML5Player16 otherHTML5Player16-play-overlay-sm', alt: ''}, this.domNode, "after");
         return true;
      }
      return false;
   },
   
   /** check if the image is available at the URL specified in this.imagePath */
   checkImagePath: function() {
      if (this.imagePath) {
         lconn.core.util.imagechecker.checkExist(this.imagePath).then(dojo.hitch(this, function() {
            this.imageAvailable = true;
            this.handlePreview();
         }), dojo.hitch(this, function() {
            this.imageAvailable = false;
            this.handlePreview();
         }));
      }
      else {
         this.handlePreview();
      }
   },
   
   /**
    * function called to apply a base64 image as "src" attribute of the IMG DOM element.
    */      
   applyImageBase64: function(fileImageBase64) {
      dojo.removeClass(this.domNode); // empty the "class" attribute
      dojo.removeAttr(this.domNode, 'src');
      // be sure to apply the binary image in case something goes wrong
      this.connect(this.domNode, 'onerror', function() {
         setTimeout(dojo.hitch(this, function(){
            dojo.removeAttr(this.domNode, 'src');
            dojo.setAttr(this.domNode, 'src', this.fileImageBinary);
         }, 0));
      });
      dojo.setAttr(this.domNode, 'src', fileImageBase64);
      dojo.setStyle(this.domNode, 'maxWidth', this._maxSize[this.size].maxWidth);
      dojo.setStyle(this.domNode, 'maxHeight', this._maxSize[this.size].maxHeight);
   }
});

function _getFolderIconClass(widgetData) {
   if (!widgetData || !widgetData.isFolder || !widgetData.folderType || !widgetData.visibility) {
      return;
   }

   var iconClass = "ic-thumb-folder";

   if (widgetData.folderType === "community") {
      iconClass += " ic-thumb-folder-community";
   } else {
      switch(widgetData.visibility) {
         case "shared":
            iconClass += " ic-thumb-folder-shared";
            break;
            
         case "public":
            iconClass += " ic-thumb-folder-public";
            break;
      }
   }

   return iconClass;
}

lconn.share.widget.FilePreview._getFolderIconClass = _getFolderIconClass; // For unit test

}());