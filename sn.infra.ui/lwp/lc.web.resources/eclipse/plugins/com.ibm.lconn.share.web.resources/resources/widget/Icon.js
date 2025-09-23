/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
   
dojo.provide('lconn.share.widget.Icon');
dojo.require('dijit._WidgetBase');
dojo.require('dojox.lang.functional');

/**
 * Provide the icon (based on the type) and an alternative text (set it as empty if not available).
 * 
 * <p>
 * Usage (see "lconn.share.widget.FileThumbnail" for an example):
 * 
 * provide the following properties:
 *  - type: the type of the icon
 *  - alt: the alternative text of the icon (optional)
 *  
 * Examples:
 * <img data-dojo-type="lconn.share.widget.Icon"
 *       data-dojo-props="type: 'shared'" />
 *       
 * <span data-dojo-type="lconn.share.widget.Icon"
 *       data-dojo-props="type: 'shared', alt: 'myAlt'"></span>
 * 
 * </p>
 *
 * @author Davide Riso <davide.riso@ie.ibm.com> 
 * @namespace lconn.share.widget.Icon
 */
dojo.declare("lconn.share.widget.Icon", [dijit._WidgetBase], {
   
   /** CSS classes required to display the visibility/locking status icon */
   spriteImages: { // TODO - not yet completed
         locked: 'iconsStates16 iconsStates16-CheckedOut',
         lockedByMe: 'iconsStates16 iconsStates16-CheckedOutMe',
         'private': 'lotusHidden', // We don't want to show an icon for private folders.  Previous classes: 'iconsStates16 iconsStates16-Private'
         'public': 'iconsStates16 iconsStates16-Public',
         shared: 'iconsStates16 iconsStates16-Shared',
         sharedExternally: 'iconsMessages16 iconsMessages16-msgExternal16',
         sharedCommunity: 'iconsComponentsGray16 iconsComponentsGray16-CommunitiesGray16',
         sync: 'iconsMessages16 iconsMessages16-myFileSync-16',
         virus: 'iconsMessages16-myFileVirus iconsMessages16-myFileVirus-16'
   },
   
   /** used in case it's instantiated programmatically and it's required to override the default type (IMG) */
   domNodeType: 'img',
   
   /** the type of the icon */
   type: null,
   
   /** the alternative text of the icon (optional) */
   alt: '',
   
   /** check the DOM element */
   buildRendering: function() {
      if(!this.domNode) {
         // Create root node if it wasn't created by _TemplatedMixin
         if (this.srcNodeRef) {
            // set in the template
            this.domNode = this.srcNodeRef;
         }
         else {
            // set programmatically
            this.domNode = dojo.create(this.domNodeType);
         }
      }
      this.inherited(arguments);
   },
   
   /** Set-up */
   postCreate: function() {
      this.applyImage();
      this.applyAlternativeText();
   },
   
   /**
    * apply the image background and CSS to the DOM element
    * @return true if the class rule is added
    */
   applyImage: function() {
      if (this._contains(dojox.lang.functional.keys(this.spriteImages), this.type)) {
         dojo.addClass(this.domNode, this.spriteImages[this.type]);
         return true;
      }
      return false;
   },
   
   /**
    * apply the alternative text to the DOM element
    */
   applyAlternativeText: function() {
      if (this.domNode.tagName === 'IMG') {
         // it's always set for a11y, in case it's not passed, an empty string is set
         dojo.setAttr(this.domNode, "alt", this.alt);
      }
      else if (this.alt) {
         // if it's not empty, I add it as content of the element
         dojo.place(dojo.doc.createTextNode(this.alt), this.domNode, "only");
      }
   },   
   
   /**
    * check if an array contains an item
    * @private
    * @param {Object} keys - the keys array
    * @param {String} key - the key element to find
    * @return true if the key is found in the keys array
    */
   _contains: function(keys, key) {
      return dojo.indexOf(keys, key) != -1;
   }
});
