/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-class",
   "dojo/dom-construct",
   "dojo/on",
   "ic-ui/GridRenderer",
   "ic-core/DateUtil"
], function (declare, lang, domClass, domConstruct, on, GridRenderer, DateUtil) {

   /**
    * OAuth widgets
    * @namespace ic-oauth.widget
    */
   
   /**
    * Application List Grid renderer delegate
    * @author Claudio Procida <procidac@ie.ibm.com>
    * @class
    * @name ic-oauth.widget.ApplicationListGridRenderer
    * @extends com.ibm.oneui.controls.GridRenderer
    */
   var ApplicationListGridRenderer = declare("lconn.oauth.widget.ApplicationListGridRenderer", GridRenderer, /** @lends ic-oauth.widget.ApplicationListGridRenderer.prototype */ {
      /** Revoke action */
      revokeAction: null,
      /** HTML class for an empty grid */
      emptyClass: "lconnEmpty",
      /** HTML class for an error condition */
      errorClass: "lconnEmpty",
      /** HTML class for the loading indicator */
      loadingClass: "",
      /** HTML class for the loading indicator sprite */
      loadingImgClass: "lotusLoading",
      /**
       * Renders a row in the grid
       * @param {Object} grid The grid object
       * @param {Node} el The table body
       * @param {Object} item Current item to render
       * @param {Number} i Index of the current item
       * @param {Array} items All items
       */
      renderItem: function(grid, el, data, item, i, items) {
         var tr = domConstruct.create("tr", {
           "class": (i === 0 ? "lotusFirst" : (i % 2 === 1 ? "lotusAltRow" : null))
         }, el);
         if (items && i === items.length - 1) {
            domClass.add(tr, "lotusLast");
         }
            // Application name
            var td = domConstruct.create("td", {
               "class": "lotusFirstCell",
               width: "50%",
               innerHTML: (item && item.clientDisplayName) || ""
            }, tr);
            // Creation date
            td = domConstruct.create("td", {
               "class": "lotusMeta lotusNoWrap",
               innerHTML: DateUtil.toStringForTimeinMs((item && item.createdAt) || new Date().getTime(), /*dontshowtime*/ false, /*showFullYear*/ true)
            }, tr);
            // Expiration date
            td = domConstruct.create("td", {
               "class": "lotusMeta lotusNoWrap",
               // expiresAt is a synthesized property
               innerHTML: DateUtil.toStringForTimeinMs((item && item.expiresAt) || new Date().getTime(), /*dontshowtime*/ false, /*showFullYear*/ true)
            }, tr);
            // Action node
            td = domConstruct.create("td", {
               "class": "lotusLastCell"
            }, tr);
            if (this.revokeAction) {
               // TODO: make it extensible
               var a = domConstruct.create("a", {
                   "class": "lotusAction",
                   href: "#",
                   title: this.revokeAction.getTooltip(item)
               }, td);
               a.appendChild(document.createTextNode(this.revokeAction.getName(item)));
               dijit.setWaiRole(a, "button");
               dijit.setWaiState(a, "label", this.revokeAction.getTooltip(item));
               on(a, "click", lang.hitch(this.revokeAction, this.revokeAction.execute, item, {}));
            }
      } 
   });
   return ApplicationListGridRenderer;
});
