/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
(function() {
   
dojo.provide('lconn.share.widget.FolderThumbnail');
dojo.require("lconn.share.widget.AbstractThumbnail");
dojo.require("lconn.core.svg.svgHelper");

var AbstractThumbnail = lconn.share.widget.AbstractThumbnail;

/**
 * Thumbnail Widget that allows the display of a card with front and back sides.
 * Anchors and other clickable elements are available only on the back side, which will flip automatically when the use focus any of its elements (see _FocusMixin in AbstractThumbnail).
 * @author Davide Riso <davide.riso@ie.ibm.com> 
 * @namespace lconn.share.widget.FolderThumbnail
 */
dojo.declare("lconn.share.widget.FolderThumbnail", [lconn.share.widget.AbstractThumbnail], {
   
   /** i18n - make native language support messages available on "this" and "this.nlsProfileDateFormatter" */ 
   postMixInProperties: function() {
      this.inherited(arguments);
      // set the a11y alternative text for the folder icon (front-side)
      this.altThumbnail = this.ft_mainThumbnailFolder.replace("%0", this.value.index); // JAWS - navigation via DOWN-ARROW
      // force the type value to dir (directory)
      this.value.fileType = 'dir';
      this.ft_summary = this.ft_folder_summary;
   },
   
   /** Set-up */
   postCreate: function() {
      this.inherited(arguments);

      // set the callback of the "Open" action when the end-user clicks anywhere, just the "Open" callback is expected in this case
      if (this.value.actionListValue.length === 1 && this.value.actionListValue[0].name === 'Open') {
         this.backSideAction = this.value.actionListValue[0].callback;
      }
      
      // set a11y aria-label attribute
      dojo.setAttr(this.domNode, 'aria-label', this.ft_mainControlsFolder.replace("%0", this.value.index).replace("%1", this.value.fileName)); // JAWS - navigation via TAB (skip the front-side of the card)
      
      if (this.imageThumb && this.imageThumb.widgetData.useNewIcon) {
        var visibility = this.imageThumb.widgetData.visibility;
        var type = this.imageThumb.widgetData.folderType;
        var parentNode = this.imageThumb.domNode.parentNode;
        dojo.addClass(parentNode, "ic-thumb-folder");
        parentNode.removeChild(this.imageThumb.domNode);
        
        if(type == "personal" && visibility == "private") 
          lconn.core.svg.svgHelper.loadIcon(parentNode, "privateFolder");
        if(type == "personal" && visibility == "shared")
          lconn.core.svg.svgHelper.loadIcon(parentNode, "sharedFolder");
        if(type == "personal" && visibility == "public")
          lconn.core.svg.svgHelper.loadIcon(parentNode, "publicFolder"); 
        if(type == "community")
          lconn.core.svg.svgHelper.loadIcon(parentNode, "communityFolder");
      }
   },
   
   /**
    * Action called when the end-user click on the link of the folder on the back-side of the card
    */      
   summary: function() {
      this.backSideAction();
   }
});

lconn.share.widget.FolderThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE = AbstractThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE;

})();
