/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojo/text!./templates/Grid.html",
      "dijit/_Templated",
      "dijit/_Widget"
], function(declare, template, _Templated, _Widget) {

   /**
    * A widget that renders a OneUI grid control. Rendering of the rows is
    * delegated to the {@link Grid#renderer|renderer} member.
    * 
    * @class ic-ui.Grid
    * @extends dijit._Widget
    * @extends dijit._Templated
    * @see {@link ic-ui.GridRenderer}
    * @author Claudio Procida <procidac@ie.ibm.com>
    */
   return declare("com.ibm.oneui.controls.Grid", [
         _Widget,
         _Templated
   ], /** @lends ic-ui.Grid.prototype */
   {
      /**
       * The template
       * 
       * @type {String}
       */
      templateString : template,
      /**
       * Strings used by this grid
       * 
       * @type {Object}
       */
      strings : {},
      /**
       * Data displayed by this grid
       * 
       * @type {Object}
       */
      data : null,
      /**
       * Grid renderer
       * 
       * @type {coreui.GridRenderer}
       */
      renderer : null,

      postCreate : function() {
         this.msgNoData = this.msgNoData || this.strings.empty;
         this.inherited(arguments);
         if (this.renderer) {
            this.renderer.renderLoading(this, this.gridNode);
         }
      },

      /**
       * Refreshes the grid
       */
      refresh : function() {
         if (this.data) {
            if (this.data.fromUrl) {
               this.update(null);
            }
            else {
               this.update();
            }
         }
      },

      /**
       * Updates the grid. If data is mixed in, it is rendered immediately by
       * delegating control to the {@link Grid#renderer|renderer}. If not, data
       * is fetched invoking the {@link Grid#_loadFromUrl} method. This
       * implementation currently supports only JSON data.
       * 
       * @param {Object}
       *           [data] Data displayed by this grid
       */
      update : function(data) {
         if (arguments.length > 0) {
            this.data = data;
         }

         if (!this.data) {
            this._loadFromUrl(this.url);
         }
         else if (this.data.json || this.data.xml) {
            this.renderer.render(this, this.gridNode, this.data);
            this.onUpdate(this.data);
         }
         else {
            this.renderer.renderEmpty(this, this.gridNode, this.data);
            this.onUpdate(this.data);
         }
      },

      /**
       * Updates the widget after an error
       * 
       * @param {Error}
       *           e The error
       * @private
       */
      _updateWithError : function(e) {
         this.data = {
            error : e
         };
         if (this.renderer) {
            this.renderer.renderError(this, this.gridNode, this.data, e);
         }
      },

      /**
       * Loads data from URL
       * 
       * @param {String}
       *           url The URL
       * @private
       * @abstract
       */
      _loadFromUrl : function(url) {
         return;
      },

      /**
       * Called to notify listeners that the grid was updated. Contains data as
       * argument
       * 
       * @param {Object}
       *           data
       */
      onUpdate : function(data) {
         return;
      }
   });
});
