/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
(function() {
   
dojo.provide('lconn.share.widget.AbstractThumbnail');

dojo.require('dijit._WidgetBase');
dojo.require('dijit._TemplatedMixin');
dojo.require('dijit._WidgetsInTemplateMixin');
dojo.require('dijit._FocusMixin');
dojo.require('dijit._OnDijitClickMixin');
dojo.require("lconn.core.util.text");
dojo.require("lconn.core.svg.svgHelper");
dojo.require("lconn.share.scenehelper");
dojo.require("lconn.share.util.IBMDocs.ThumbnailConstants");
dojo.require("lconn.share.widget.FileDateFormatter");
dojo.require("lconn.share.widget.Icon");
dojo.require("lconn.share.widget.FilePreview");
dojo.require("lconn.core.config.features");
dojo.requireLocalization("lconn.share","FileThumbnail");
dojo.require("lconn.core.globalization.bidiUtil");

/** CSS class required to force the focus (a11y)
 * @private
*/
var _forceFocusClass = "ic-thumb-widget-flip-card-a11y-h";

/** CSS class required to update the checkbox status
 * @private
*/
var _isCheckedClass = "ic-thumb-widget-flip-card-is-checked";

/** CSS class required to update the pin status
 * @private
*/
var _isPinnedClass = "ic-thumb-widget-flip-card-is-pinned";

/** Used to set the default values
 * @private
*/ 
var _defaultValues = null;

var ThumbnailConstants = lconn.share.util.IBMDocs.ThumbnailConstants;

/**
 * Thumbnail Widget that allows the display of a card with front and back sides. See implementations like FileThumbnail and FolderThumbnail.
 * Anchors and other clickable elements are available only on the back side, which will flip automatically when the use focus any of its elements (see _FocusMixin).
 * @author Davide Riso <davide.riso@ie.ibm.com> 
 * @namespace lconn.share.widget.AbstractThumbnail
 */
dojo.declare("lconn.share.widget.AbstractThumbnail", [dijit._WidgetBase, dijit._TemplatedMixin, dijit._WidgetsInTemplateMixin, dijit._FocusMixin], {

   /** html template of the widget */ 
   templatePath: dojo.moduleUrl("lconn.share", "widget/templates/AbstractThumbnail.html"),

   /** the value with the data */
   value: null,  
   
   /** selected flag (checkbox checked), this field is not saved server side */
   selected: false,
   
   /** native language support strings that are passed to the FileDateFormatter Widget */
   nlsProfileDateFormatter: null,

   /** alternative text for the thumbnail image (front-side) */
   altThumbnail: null,
   
   /** set the a11y alternative text for the visibility/locking image (front-side) */
   altStatusImage: null,
   
   /** it's the action called when the end-user click on the back-side of the card */
   backSideAction: null,

   showBizCard: true,
   suppressUserLink: false,
   
   /** sprite mappings used in the template (must be part of the object) */
   spritePinOn: 'lconnSprite lconnSprite-iconPinned16-on',
   spritePinOff: 'lconnSprite lconnSprite-iconPinned16-off',
   spriteCheckOn: 'iconsOther16 iconsOther16-thumbnail-checkbox-sel16',
   spriteCheckOff: 'iconsOther16 iconsOther16-thumbnail-checkbox16',
   pinTriangleClass: 'iconsOther48-thumbnail-pinTriangle',
   
   /** CSS class required by the elements which display a text in high contrast mode */
   hcClass: 'hc',
   
   /** i18n - make native language support messages available on "this" and "this.nlsProfileDateFormatter" */ 
   postMixInProperties: function() {
      this.inherited(arguments);
      dojo.mixin(this, dojo.i18n.getLocalization("lconn.share","FileThumbnail"));
      this.nlsProfileDateFormatter = {
            nls_profile: this.ft_backAuthor,
            nls_dateFormatFileCreated: {MONTH: this.ft_dateFormatFileCreatedMonth, TODAY: this.ft_dateFormatFileCreatedToday, YESTERDAY: this.ft_dateFormatFileCreatedYesterday, YEAR: this.ft_dateFormatFileCreatedYear, DAY: this.ft_dateFormatFileCreatedDay,FULL: this.ft_dateFormatFileCreatedFull},
            nls_dateFormatFileModified: {MONTH: this.ft_dateFormatFileModifiedMonth, TODAY: this.ft_dateFormatFileModifiedToday, YESTERDAY: this.ft_dateFormatFileModifiedYesterday, YEAR: this.ft_dateFormatFileModifiedYear, DAY: this.ft_dateFormatFileModifiedDay,FULL: this.ft_dateFormatFileModifiedFull}
      };

      // set the a11y alternative text for the visibility/locking image (front-side)
      if (!this.value.isFolder) {
         this.altStatusImage = this['ft_' + this.value.fileVisibilityLocking];
      }
      
      // in case of RTL the "-rtl" suffix should be added at the end
      if (!dojo._isBodyLtr()) {
         this.pinTriangleClass += '-rtl';
      }

      if (lconn.core.config.features("fileviewer-detailspage")) {
         this.showBizCard = false;
         this.suppressUserLink = true;
      }
      
      this.ft_href = this.value.filePath;
   },
   
   /** Set-up */
   postCreate: function() {
      this.inherited(arguments);
      
      if (this.value.isFolder) {
         this.cardFront.style.backgroundColor = "transparent";
      }
      
      // resetting the default values (they're mixed with the incoming data)
      // in case this reset is not done and some fields are missing, the data of the previous thumbnail would be displayed
      // TODO verify if it should stay empty or default data should be used (ie. filePinned: false)
      _defaultValues = {};
      
      // force to false (at the beginning the widget is not selected)
      this.set('selected', false);

      // update the UI
      this.pinToggleUpdateUI();
      
      if (this.value.context === 'communityFiles') {
         // no pin/unpin option for Community Files
         dojo.setStyle(this.backPin, 'display', 'none');
         // no triangle pin/unpin option for Community Files
         dojo.setStyle(this.backTriangle, 'display', 'none');
      }
      else if (this.value.context === 'library') {
         // no selection option for Library
         dojo.setStyle(this.backCheck, 'display', 'none');
         // no pin/unpin option for Library
         dojo.setStyle(this.backPin, 'display', 'none');
         // no triangle pin/unpin option for Library
         dojo.setStyle(this.backTriangle, 'display', 'none');
      }
      
      // update the UI with the widget with the file name
      this.manageFileName();

      // set a11y role attribute (if available)
      if (this.value.role) {
         dojo.setAttr(this.domNode, 'role', this.value.role);
      }
   },
   
   /**
    * _FocusMixin onFocus
    * It's called when an element of the back-side of the card get the focus.
    */      
   onFocus: function() {
      dojo.addClass(this.domNode, _forceFocusClass);
   },
   
   /**
    * _FocusMixin onBlur
    * It's called when an element of the back-side of the card lose the focus.
    */     
   onBlur: function() {
      dojo.removeClass(this.domNode, _forceFocusClass);
   },

   /**
    * Toggle method for the selection (checkbox in the UI) 
    */
   checkToggle: function() {
      this.set('selected', !this.selected);
   },

   /**
    * Updates the UI of the "pin" DOM element
    */
   pinToggleUpdateUI: function() {
	  if (lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
		 if (this.backPin.childElementCount === 0) {
		    lconn.core.svg.svgHelper.loadIcon(this.backPin, "pinnedIcon");
		 }
		 if (this.frontPin.childElementCount === 0) {
			lconn.core.svg.svgHelper.loadIcon(this.frontPin, "pinnedIcon");
   		 }
	  }
      if (this.value.filePinned) {
         // pin must be set as selected
         dojo.addClass(this.domNode, _isPinnedClass);
         if (!lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
            dojo.place(dojo.doc.createTextNode(this.ft_pinned), this.backPin, "only");
         }
         dojo.removeClass(this.backPin, this.spritePinOff);
         dojo.addClass(this.backPin, this.spritePinOn);
         dojo.setAttr(this.backPin, 'aria-pressed', 'true');
         if("dir"==this.value.fileType){
             dojo.setAttr(this.backPin, 'aria-label', this.ft_folder_pressToChange1);
             dojo.setAttr(this.backPin, 'title', this.ft_folder_changeToUnpinned); 
         }else{
             dojo.setAttr(this.backPin, 'aria-label', this.ft_pressToChange1);
             dojo.setAttr(this.backPin, 'title', this.ft_changeToUnpinned);
         }
         // update the front-side
         if (!lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
            dojo.place(dojo.doc.createTextNode(this.ft_pinned), this.frontPin, "only");
         }
      }
      else {
         // pin must be set as unselected
         dojo.removeClass(this.domNode, _isPinnedClass);
         if (!lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
            dojo.place(dojo.doc.createTextNode(this.ft_unpinned), this.backPin, "only");
         }
         dojo.removeClass(this.backPin, this.spritePinOn);
         dojo.addClass(this.backPin, this.spritePinOff);
         dojo.setAttr(this.backPin, 'aria-pressed', 'false');
         if("dir"==this.value.fileType){
             dojo.setAttr(this.backPin, 'aria-label', this.ft_folder_pressToChange2);
             dojo.setAttr(this.backPin, 'title', this.ft_folder_changeToPinned);
         }else{
             dojo.setAttr(this.backPin, 'aria-label', this.ft_pressToChange2);
             dojo.setAttr(this.backPin, 'title', this.ft_changeToPinned);
         }
         // update the front-side
         if (!lconn.share.util.configUtil.isFilesEnableNewPinIcon(this.user)) {
            dojo.place(dojo.doc.createTextNode(this.ft_unpinned), this.frontPin, "only");         
         }
      }
   },

   /**
    * Toggle: persists the new status and updates the UI of the "pin" DOM element
    * Note that the callback is called only if any area of the right half of the triangle is clicked
    * @param {Object} e - the event object
    */
   pinToggleTriangle: function(e) {
      if ((typeof(e.offsetX) === 'undefined') ? (e.layerX > e.layerY) : (e.offsetX > e.offsetY)) {
         this.pinToggle();
      }
      else {
         this.backSideAction();
      }
      dojo.stopEvent(e);
   },
   
   /**
    * Toggle: persists the new status and updates the UI of the "pin" DOM element
    * Note that the method is called by pinToggleTriangle or in case the pin is selected (click, space, etc)
    */
   pinToggle: function() {
      /*
      Zhuang Yu's team code (yuzcdl@cn.ibm.com)
      calls "com.ibm.lconn.files.web.resources/resources/util/FavoriteFiles", method "gridOnToggle".
      in case of success (_onToggleSuccess) the Zhuang's code update the UI.
      The original idea was to provide him the following callback function.
      dojo.hitch(this, function(){
         // change the value
         this.value.filePinned = !this.value.filePinned;
         // update of the UI
         this.pinToggleUpdateUI();
      })
      */
      this.value.pinnedAction.callback(this);
   },

   /**
    * Handler for calls to set("value", value). 
    * @private
    * @param {Object} value - the object containing a map <key, value> with the strings to display in the UI or to use with REST APIs 
    */
   _setValueAttr: function(value) {
      this._set('value', dojo.mixin(_defaultValues,value));
   },

   applyBidiToFileName: function(str) {
      if (this.value.fileType === "dir") {
         return lconn.core.globalization.bidiUtil.enforceTextDirectionEx(str);
         } else {
         return lconn.core.globalization.bidiUtil.createSttDisplayString(str, "FILE_PATH");
      }
   },

   /**
    * Populate the widget UI with the file name
    */
   manageFileName: function() {
      // set the name of the file on both the sides
      if (this.value.fileName) {
         // On the front side we have the text-overflow: ellipsis; and white-space: nowrap;
         // so there's always one line, in some cases '...' appears
         var bidiFileName = this.applyBidiToFileName(this.value.fileName);
         dojo.place(dojo.doc.createTextNode(bidiFileName), this.frontFileName, "only");
         // On the back side we need to manage more lines (so NO nowrap)
         // In case the ellipsis applies (there's one word too long), we need to truncate the rest of the file name
         setTimeout(dojo.hitch(this,function(){
            var arrayFileName = this.value.fileName.split(" ");
            var wordConstr = '';
            for (var i1 = 0; i1 < arrayFileName.length; i1++) {
               var word = arrayFileName[i1];
               word = this.applyBidiToFileName(word);
               wordConstr += (word + ' ');
               dojo.place(dojo.doc.createTextNode(wordConstr), this.backFileName, "only");
               if (this.backFileName.offsetWidth < this.backFileName.scrollWidth) {
                  break;
               }
            }
            // In case the file name is too long we need to truncate it
            if (wordConstr.length > 40) {
               bidiFileName = lconn.core.util.text.trimToLength(wordConstr, 40);
               bidiFileName = this.applyBidiToFileName(bidiFileName);
               dojo.place(dojo.doc.createTextNode(bidiFileName), this.backFileName, "only");
            }
         }), 0);
      }
   },
   
   /**
    * Action to preview the file of the current thumbnail (lightbox) when the end-used click anywhere on the back side of the card
    * In case the end-user click an anchor or an image, nothing happens.
    * @param {Object} e - the event object
    */      
   previewCardBack: function(e) {
      if(dojo.dnd.manager().mouseDrag)
         return;
      var originalTargetTagName = ((e.originalTarget) ? e.originalTarget : e.srcElement).tagName;
      if (originalTargetTagName !== 'A' && originalTargetTagName !== 'svg' && originalTargetTagName !== 'path') {
         var action = this.backSideAction || this.summaryAction;
         action();
      }
   },

   /**
    * Handler for calls to set("select", flag). 
    * @private
    * @param {Object} flag - the flag (true/false) to update the selection checkbox
    */
   _setSelectedAttr: function(flag) {
      if (!flag) {
         // checkbox must be set as unselected
         dojo.removeClass(this.domNode, _isCheckedClass);
         dojo.place(dojo.doc.createTextNode(this.ft_unchecked), this.backCheck, "only");
         dojo.removeClass(this.backCheck, this.spriteCheckOn);
         dojo.addClass(this.backCheck, this.spriteCheckOff);
         dojo.setAttr(this.backCheck, 'aria-pressed', 'false');
         if("dir"==this.value.fileType){
             dojo.setAttr(this.backCheck, 'aria-label', this.ft_folder_pressToChange3);
             dojo.setAttr(this.backCheck, 'title', this.ft_folder_changeToChecked); 
         }else{
             dojo.setAttr(this.backCheck, 'aria-label', this.ft_pressToChange3);
             dojo.setAttr(this.backCheck, 'title', this.ft_changeToChecked);
         }
         this._set('selected', false);
         // update the front-side
         dojo.place(dojo.doc.createTextNode(this.ft_unchecked), this.frontCheck, "only");
      }
      else {
         // checkbox must be set as selected
         dojo.addClass(this.domNode, _isCheckedClass);
         dojo.place(dojo.doc.createTextNode(this.ft_checked), this.backCheck, "only");
         dojo.removeClass(this.backCheck, this.spriteCheckOff);
         dojo.addClass(this.backCheck, this.spriteCheckOn);
         dojo.setAttr(this.backCheck, 'aria-pressed', 'true');
         if("dir"==this.value.fileType){
             dojo.setAttr(this.backCheck, 'aria-label', this.ft_folder_pressToChange4);
             dojo.setAttr(this.backCheck, 'title', this.ft_folder_changeToUnchecked); 
         }else{
             dojo.setAttr(this.backCheck, 'aria-label', this.ft_pressToChange4);
             dojo.setAttr(this.backCheck, 'title', this.ft_changeToUnchecked);
         }
         this._set('selected', true);
         // update the front-side
         dojo.place(dojo.doc.createTextNode(this.ft_checked), this.frontCheck, "only");
      }
   }

});

lconn.share.widget.AbstractThumbnail.DEFAULT_EXPECTED_THUMBNAIL_SIZE = ThumbnailConstants.thumbnailSizes.medium;

})();
