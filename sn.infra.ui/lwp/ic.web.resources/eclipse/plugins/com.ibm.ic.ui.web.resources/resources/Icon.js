/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dojo/_base/array",
   "dojo/_base/window",
   "dojo/dom-attr",
   "dojo/dom-class",
   "dojo/dom-construct",
   "dojox/lang/functional"
], function(declare, _WidgetBase, darray, win, domAttr, domClass, domConstruct, functional) {

   /**
    * Dijit representing an icon. Supports enumerated icon types. Fully accessible.
    * 
    * <h2>Usage</h2>
    * 
    * Provide the following properties:
    * <dl>
    * <dt>type</dt>
    * <dd>the type of the icon</dd>
    * <dt>alt</dt>
    * <dd>the alternative text of the icon (optional)</dd>
    * </dl>
    * 
    * <h2>Examples</h2>
    * <pre>
    * &lt;img data-dojo-type="ic-ui/Icon" data-dojo-props="type: 'shared'"
    * /&gt;
    * 
    * &lt;span data-dojo-type="ic-ui/Icon" data-dojo-props="type: 'shared',
    * alt: 'myAlt'"&gt;&lt;/span&gt;
    * 
    * &lt;svg data-dojo-type="ic-ui/Icon" data-dojo-props="svgHref: '#data',
    * alt: 'myAlt'"&gt;&lt;/svg&gt;
    * </pre>
    * 
    * <h2>Notes</h2>
    * Some notes about the "alt" property: in case the element is an IMG, we set
    * it as alternative text (alt DOM attribute). Otherwise we add it to the DOM
    * element as inner text and then we can conditionally show it.
    * <p>
    * According to OneUI guidelines, Connections adds the "lotusImagesOff" class to the
    * body when the page is displayed in HC mode
    * 
    * @author Davide Riso <davide.riso@ie.ibm.com>
    * @class ic-ui.Icon
    */
   return declare([_WidgetBase], /** @lends ic-ui.Icon.prototype */ {

      // TODO: make constants, document
      /** CSS classes required to display the visibility/locking status icon */
      spriteImages: { // TODO - not yet completed
            locked: 'iconsStates16 iconsStates16-CheckedOut',
            lockedByMe: 'iconsStates16 iconsStates16-CheckedOutMe',
            'private': 'iconsStates16 iconsStates16-Private',
            'public': 'iconsStates16 iconsStates16-Public',
            shared: 'iconsStates16 iconsStates16-Shared',
            sharedExternally: 'iconsMessages16 iconsMessages16-msgExternal16',
            sharedCommunity: 'iconsComponentsGray16 iconsComponentsGray16-CommunitiesGray16',
            sync: 'iconsMessages16 iconsMessages16-myFileSync-16'
      },
      
      /** used in case it's instantiated programmatically and it's required to override the default type (IMG) */
      domNodeType: 'img',
      
      /** the type of the icon */
      type: null,
      
      /** the alternative text of the icon (optional) */
      alt: '',
      
      /** the svg href to display, in case it's an svg (optional) */
      svgHref: null,
      
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
               this.domNode = domConstruct.create(this.domNodeType);
            }
            if (this.domNode.tagName.toLowerCase() === 'svg' && this.svgHref) {
               domConstruct.create('use', {'xlink:href': this.svgHref}, this.domNode);
            }
         }
         this.inherited(arguments);
      },
      
      /** Set-up */
      postCreate: function() {
         if (this.domNode.tagName.toLowerCase() !== 'svg') {
            // no specific CSS class is mapped in the spriteImages in case of an SVG file
            // Moreover "domClass.add" set the CSS via "node[className]" which in case of a SVG file is SVGAnimatedString { baseVal="hc", animVal="hc"}
            this.applyImage();
         }
         this.applyAlternativeText();
      },
      
      /**
       * apply the image background and CSS to the DOM element
       * @return true if the class rule is added
       */
      applyImage: function() {
         if (this._contains(functional.keys(this.spriteImages), this.type)) {
            domClass.add(this.domNode, this.spriteImages[this.type]);
            return true;
         }
         return false;
      },
      
      /**
       * apply the alternative text to the DOM element
       */
      applyAlternativeText: function() {
         if (this.domNode.tagName.toLowerCase() === 'img') {
            // it's always set for a11y, in case it's not passed, an empty string is set
            domAttr.set(this.domNode, 'alt', this.alt);
         }
         else if (this.alt) {
            // if it's not empty, I add it as content of the element to high contrast mode support
            domConstruct.place(win.doc.createTextNode(this.alt), this.domNode);
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
         return darray.indexOf(keys, key) != -1;
      }

   });
});
