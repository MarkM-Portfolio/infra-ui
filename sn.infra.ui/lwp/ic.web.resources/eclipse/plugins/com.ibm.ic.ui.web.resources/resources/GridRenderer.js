/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
   "dojo/_base/array",
   "dojo/_base/declare",
   "dojo/_base/lang",
   "dojo/dom-class",
   "dojo/dom-construct",
   "dijit/_Widget"
], function (array, declare, lang, domClass, domConstruct, _Widget) {

   return declare("com.ibm.oneui.controls.GridRenderer", null, /** @lends ic-ui.GridRenderer.prototype */ {
      /** String resources */
      nls : null,
      /** Class marker for empty grids */
      emptyClass : null,
      /** Class marker for error conditions */
      errorClass : null,
      /** Class marker for grids in a loading state */
      loadingClass : null,
      /** Class marker for image nodes grids */
      loadingImgClass : null,
      /**
       * A widget that renders the contents of a OneUI grid control. This
       * snippet shows a common use case for this class:
       * 
       * <pre>
       * var gridRenderer = new GridRenderer({
       *    emptyClass : &quot;lconnEmpty&quot;,
       *    nls : {
       *       summary : &quot;List of items&quot;,
       *       empty : &quot;No items&quot;,
       *       loading : &quot;Loading...&quot;
       *    }
       * });
       * var grid = new Grid({
       *    renderer : gridRenderer
       * });
       * </pre>
       * 
       * @param {Object}
       *           opts Options to mixin
       * @constructs
       * @see {@link ic-ui.Grid}
       * @author Claudio Procida <procidac@ie.ibm.com>
       */
      constructor : function(opts) {
         lang.mixin(this, opts);
      },
      /**
       * Renders the sort options of the grid calling {@link #renderSorting},
       * and the contents of the grid iterating over the <code>data.items</code>
       * elements, calling {@link #renderItem}. When the grid is empty, calls
       * {@link #renderEmpty}.
       * 
       * @param {coreui.Grid}
       *           grid The grid owning this renderer
       * @param {Node}
       *           el The container element
       * @param {Object}
       *           data Data displayed by the grid
       */
      render : function(grid, el, data) {
         var items = data.json;
         // TODO: handle Atom
         var size = items.length;
         if (size === 0) {
            this.renderEmpty(grid, el, data);
         }
         else {
            while (el.childNodes[0]) {
               domConstruct.destroy(el.childNodes[0]);
            }
            var tbl = domConstruct.create("table", {
               "class" : "lotusTable",
               border : "0",
               cellspacing : "0",
               cellpadding : "0",
               summary : this.nls.summary
            }, el);
            var tbody = domConstruct.create("tbody", null, tbl);
            this.renderSorting(grid, tbody, data);
            array.forEach(items, lang.hitch(this, this.renderItem, grid, tbody,
                  data));
         }
      },
      /**
       * Renders the loading indicator of the grid while background processing
       * occurs, e.g. XHR.
       * 
       * @param {coreui.Grid}
       *           grid The grid owning this renderer
       * @param {Node}
       *           el The container element
       */
      renderLoading : function(grid, el) {
         var div = domConstruct.create("div", {
            "class" : this.loadingClass,
            innerHTML : this.nls.loading
         }, el, "only");
         domConstruct.create("img", {
            "class" : this.loadingImgClass,
            src : _Widget.prototype._blankGif,
            role : "presentation",
            alt : ""
         }, div, "first");
      },
      /**
       * Renders a message when the grid is empty.
       * 
       * @param {coreui.Grid}
       *           grid The grid owning this renderer
       * @param {Node}
       *           el The container element
       */
      renderEmpty : function(grid, el) {
         var ediv = domConstruct.create("div", {
            "class" : this.emptyClass,
            innerHTML : this.nls.empty,
            role : "document",
            tabIndex : 0
         }, el, "only");
         dijit.setWaiState(ediv, "label", this.nls.empty);
      },
      /**
       * Renders an error occurred while rendering the grid.
       * 
       * @param {coreui.Grid}
       *           grid The grid owning this renderer
       * @param {Node}
       *           el The container element
       * @param {Object}
       *           data Data displayed by the grid
       * @param {Error}
       *           error The error
       */
      renderError : function(grid, el, data, error) {
         domConstruct.create("div", {
            "class" : this.errorClass,
            innerHTML : error.message,
            role : "alert",
            tabIndex : 0
         }, el, "only");
      },

      /**
       * Returns sort options for this grid renderer. Subclassers who want to
       * render sort options must implement this method.
       * 
       * @abstract
       */
      getSortInfo : function() {
         return;
      },
      /**
       * Renders sort options for the grid. Sort options are introspected by
       * calling {@link #getSortInfo}.
       * 
       * @param {coreui.Grid}
       *           grid The grid owning this renderer
       * @param {Node}
       *           el The container element
       * @param {Object}
       *           data Data displayed by the grid
       */
      renderSorting : function(grid, el, data) {
         var sortInfo = this.getSortInfo();
         if (sortInfo) {
            var tr = domConstruct.create("tr", {
               "class" : "lotusFirst lotusSort"
            }, el);
            var sorts = sortInfo.list;
            array.forEach(sorts, lang.hitch(this, this.renderSort, tr));
         }
      },
      /**
       * Renders a sort option for the grid.
       * 
       * @param {Node}
       *           el The container element
       * @param {Object}
       *           sort The current sort option
       * @param {Number}
       *           i Index of current sort option
       * @param {Array.<Object>}
       *           sorts All sort options
       */
      renderSort : function(el, sort, i, sorts) {
         domConstruct.create("th", {
            "class" : (i === 0 ? "lotusFirstCell" : ""),
            innerHTML : (!sort.sortable ? sort.title : null)
         }, el);
         if (sort.sortable) {
            // TODO: implement
            return;
         }
      },
      /** @deprecated Unused */
      renderItems : function() {
         array.forEach(this.items, lang.hitch(this, this.renderItem));
      },
      /**
       * Renders an item in the grid.
       * 
       * @param {coreui.Grid}
       *           grid The grid owning this renderer
       * @param {Node}
       *           el The container element
       * @param {Object}
       *           item The current item
       * @param {Number}
       *           i Index of current sort option
       * @param {Array.<Object>}
       *           items All items
       */
      renderItem : function(grid, el, data, item, i, items) {
         var tr = domConstruct.create("tr", {
            "class" : (i === 0 ? "lotusFirst" : (i % 2 === 1 ? "lotusAltRow"
                  : ""))
         }, el);

         var p, j = 0, td;
         for (p in item) {
            if (item.hasOwnProperty(p)) {
               td = domConstruct.create("td", {
                  "class" : (j++ === 0 ? "lotusFirstCell" : ""),
                  innerHTML : item[p]
               }, tr);
            }
         }
         if (td) {
            domClass.add(td, "lotusLastCell");
         }
         if (i === items.length - 1) {
            domClass.add(tr, "lotusLast");
         }
      }
   });
});
