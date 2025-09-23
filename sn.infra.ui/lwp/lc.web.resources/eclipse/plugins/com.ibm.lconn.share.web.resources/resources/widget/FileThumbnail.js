/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
(function() {

   dojo.provide("lconn.share.widget.FileThumbnail");
   dojo.require("lconn.share.widget.AbstractThumbnail");
   dojo.require("lconn.share.util.configUtil");
   dojo.require("dojo.string");

   /**
    * CSS class required to update the sync status
    * 
    * @private
    */
   var _syncClass = "sync";
   var _virusClass = "virus";

   /**
    * Sprite mappings for the images of the actions (generated programmatically)
    * 
    * @private
    */
   var spriteDetails = "iconsOther16 iconsOther16-thumbnail-details16";
   var spriteDownload = "iconsOther16 iconsOther16-thumbnail-download16";
   var spriteEdit = "iconsOther16 iconsOther16-thumbnail-edit16";
   var spriteView = "iconsOther16 iconsOther16-thumbnail-view16";

   var AbstractThumbnail = lconn.share.widget.AbstractThumbnail;

   /**
    * Thumbnail Widget that allows the display of a card with front and back
    * sides. Anchors and other clickable elements are available only on the back
    * side, which will flip automatically when the use focus any of its elements
    * (see _FocusMixin in AbstractThumbnail).
    * 
    * @author Davide Riso <davide.riso@ie.ibm.com>
    * @namespace lconn.share.widget.FileThumbnail
    */
   dojo.declare("lconn.share.widget.FileThumbnail", [ lconn.share.widget.AbstractThumbnail
   ], {

      /** draft label to pass to the FilePreview widget */
      draftLabel : null,

      /** array - an handle for each dojo.connect */
      handleItems : null,

      /**
       * i18n - make native language support messages available on "this" and
       * "this.nlsProfileDateFormatter"
       */
      postMixInProperties : function() {
         this.inherited(arguments);

         // set the a11y alternative text for the thumbnail image (front-side)
         // JAWS - navigation via DOWN-ARROW
         this.altThumbnail = dojo.string.substitute(this.ft_mainThumbnail, [this.value.index]);
         
         // set the Draft label (front-side)
         if (this.value.fileDraft) {
            this.draftLabel = this["ft_" + this.value.fileDraft];
         }
      },

      /** Set-up */
      postCreate : function() {
         this.inherited(arguments);

         // reset
         this.handleItems = [];

         // manage the Sync icon
         if(!lconn.share.util.configUtil.isFolderSyncable(this.authenticatedUser)) {
            this.manageSyncIcon();
         }

         // manage the virus icon
         if(lconn.share.util.configUtil.isFilesAsyncVirusScan(this.authenticatedUser)){
           this.manageVirusIcon();
         }
         
         // manage the Actions
         this.manageActions();

         // set a11y aria-label attribute
         // JAWS - navigation via TAB (skip the front-side of the card)
         dojo.setAttr(this.domNode, "aria-label", dojo.string.substitute(this.ft_mainControls, [this.value.index, this.value.fileName]));
      },

      /**
       * Manage the Sync icon (if available)
       */
      manageSyncIcon : function() {
         if (this.value.fileSync) {
            // set more padding to the span element (file name)
            dojo.addClass(this.frontFileName, _syncClass);
            // create and place the new Icon for the Sync flag
            var syncIcon = new lconn.share.widget.Icon({
               type : "sync",
               alt : this.ft_sync,
               domNodeType : "span"
            });
            dojo.addClass(syncIcon.domNode, _syncClass);
            dojo.addClass(syncIcon.domNode, this.hcClass);
            dojo.addClass(syncIcon.domNode, "icon");
            dojo.place(syncIcon.domNode, this.frontFileName, "after");
         }
      },

      /**
       * Manage the Virus icon (if available)
       */
      manageVirusIcon : function() {
         if (this.value.isVirusFile) {
            // set more padding to the span element (file name)
            dojo.addClass(this.frontFileName, _virusClass);
            // create and place the new Icon for the Virus flag
            var virusIcon = new lconn.share.widget.Icon({
               type : "virus",
               alt : this.ft_virus,
               domNodeType : "span"
            });
            dojo.addClass(virusIcon.domNode, _virusClass);
            dojo.addClass(virusIcon.domNode, this.hcClass);
            dojo.addClass(virusIcon.domNode, "icon");
            dojo.place(virusIcon.domNode, this.frontFileName, "after");
         }
      },
      
      /**
       * Manage the actions to display on the back-side of the card
       */
      manageActions : function() {
         dojo.forEach(this.value.actionListValue, dojo.hitch(this, function(actionItem) {
            this.createActionUI(actionItem);
         }));
      },

      /**
       * Create the action DOM elements (anchor and image)
       */
      createActionUI : function(actionItem) {
         // there's always one of them:
         // View, Preview, CreateFile
         // the one available is used for the onclick on the back-side, so we
         // need to set the "backSideAction"
         var className, title, actionCallback, isButton;
         if (actionItem.name === "Download") {
            className = spriteDownload;
            title = this.ft_download;
            actionCallback = actionItem.callback;
            isButton = true;
         }
         else if (actionItem.name === "Preview" || actionItem.name === "View") {
            if (actionItem.name === "Preview") {
               title = this.ft_preview;
               isButton = true;
            }
            else { // View
               title = this.ft_view;
               isButton = false;
            }
            actionCallback = actionItem.callback;
            className = spriteView;
            // action called when the end-user click on the back-side of the
            // card
            this.backSideAction = actionItem.callback;
         }
         else if (actionItem.name === "Edit" || actionItem.name === "CreateTemplate") {
            if (actionItem.name === "Edit") {
               title = this.ft_edit;
            }
            else if (actionItem.name === "CreateTemplate") {
               title = this.ft_createFile;
               // action called when the end-user click on the back-side of the
               // card
               this.backSideAction = actionItem.callback;
            }
            actionCallback = actionItem.callback;
            isButton = false;
            className = spriteEdit;
         }
         else if (actionItem.name === "Summary") {
            className = spriteDetails;
            title = this.ft_summary;
            isButton = false;
            this.summaryAction = actionCallback = actionItem.callback;
         }
         if (actionItem.hideButton) {
            return;
         }
         var optionsAnchor = {
            href : actionItem.href || "javascript:;",
            title : title,
            "class" : className + ' ' + this.hcClass
         };
         if (isButton) {
            optionsAnchor.role = "button";
         }
         var anchor = dojo.create("a", optionsAnchor, this.backActions);
         dojo.place(dojo.doc.createTextNode(title), anchor, "only");
         this.handleItems.push(dojo.connect(anchor, "onclick", actionCallback));
      },

      /**
       * Action called when the end-user click on the link of the file on the
       * back-side of the card
       */
      summary : function() {
         this.summaryAction();
      },

      /**
       * function called to apply a base64 image as "src" attribute of the IMG
       * DOM element.
       */
      applyImageBase64 : function(fileImageBase64) {
         this.imageThumb.applyImageBase64(fileImageBase64);
      },

      /** Clean-up */
      destroy : function() {
         for (var handle = null; handle = (this.handleItems || []).pop();) {
            dojo.disconnect(handle);
         }
      }
   });

   lconn.share.widget.FileThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE = AbstractThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE;

})();
