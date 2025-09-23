/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("lconn.oauth.widget.ApplicationListGridRenderer");

dojo.require("com.ibm.oneui.controls.GridRenderer");
dojo.require("lconn.core.DateUtil");

/**
 * OAuth widgets
 * @namespace lconn.oauth.widget
 */

/**
 * Application List Grid renderer delegate
 * @author Claudio Procida <procidac@ie.ibm.com>
 * @class
 * @name lconn.oauth.widget.ApplicationListGridRenderer
 * @extends com.ibm.oneui.controls.GridRenderer
 */
dojo.declare("lconn.oauth.widget.ApplicationListGridRenderer", com.ibm.oneui.controls.GridRenderer, /** @lends lconn.oauth.widget.ApplicationListGridRenderer.prototype */ {
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
      var tr = dojo.create("tr", {
        "class": (i === 0 ? "lotusFirst" : (i % 2 === 1 ? "lotusAltRow" : null))
      }, el);
      if (i === items.length - 1) {
         dojo.addClass(tr, "lotusLast");
      }
         // Application name
         var td = dojo.create("td", {
            "class": "lotusFirstCell",
            width: "50%",
            innerHTML: item.clientDisplayName
         }, tr);
         // Creation date
         td = dojo.create("td", {
            "class": "lotusMeta lotusNoWrap",
            innerHTML: lconn.core.DateUtil.toStringForTimeinMs(item.createdAt, /*dontshowtime*/ false, /*showFullYear*/ true)
         }, tr);
         // Expiration date
         td = dojo.create("td", {
            "class": "lotusMeta lotusNoWrap",
            // expiresAt is a synthesized property
            innerHTML: lconn.core.DateUtil.toStringForTimeinMs(item.expiresAt, /*dontshowtime*/ false, /*showFullYear*/ true)
         }, tr);
         // Action node
         td = dojo.create("td", {
            "class": "lotusLastCell"
         }, tr);
            // TODO: make it extensible
            var a = dojo.create("a", {
                "class": "lotusAction",
                href: "#",
                innerHTML: this.revokeAction.getName(item),
                title: this.revokeAction.getTooltip(item)
            }, td);
            dijit.setWaiRole(a, "button");
            dijit.setWaiState(a, "label", this.revokeAction.getTooltip(item));
            dojo.connect(a, "onclick", dojo.hitch(this.revokeAction, this.revokeAction.execute, item, {}));
   } 
});
