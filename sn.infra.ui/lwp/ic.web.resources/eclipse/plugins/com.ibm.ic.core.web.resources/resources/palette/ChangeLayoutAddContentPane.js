/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
      'dojo/_base/declare',
      '../paletteOneUI/AddContentPane',
      '../paletteOneUI/PaletteDataStoreBuilder',
      './ChangeLayoutContentPanel'
], function(declare, AddContentPane, PaletteDataStoreBuilder, ChangeLayoutContentPanel) {

   var ChangeLayoutAddContentPane = declare(

   // widget name and class
   'lconn.core.palette.ChangeLayoutAddContentPane',

   // superclass
   [ AddContentPane
   ],

   // properties and methods
   {
      postCreate : function() {
         this._createLoadingNode();
         this._setLoading();

         // init and display info panel
         var imageRoot = this.imageContextRoot;

         // Change is here
         this._contentArea = new ChangeLayoutContentPanel({
            imageContextRoot : imageRoot
         });

         this.contentAreaNode.appendChild(this._contentArea.domNode);

         // utility to create datastore for the tree
         this._storeBuilder = new PaletteDataStoreBuilder();

         this._registerDefaultCanAddWidgetFct();
         this._registerDefaultIsVisibleWidgetFct();
      }
   });

   return ChangeLayoutAddContentPane;
});
