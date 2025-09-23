/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
   'dojo/_base/declare',
   'dojo/_base/window',
   'dojo/dom-construct',
   'dojo/dom-style',
   'dojo/i18n!../../nls/strings',
   'dojo/topic',
   '../configs',
   '../../dnd/Source'
], function (declare, windowModule, domConstruct, domStyle, i18nstrings, topic,
   wpConfig, Source) {

   var win = windowModule.global;
   var coreMessages = i18nstrings;
   
   var WpSource = declare(
      'lconn.core.widgetPlacement.dnd.Source',
   	Source, 
   	{
         _emptyIndicator : null,

         _showEmptyIndicator : function(/* Boolean */doShowAnyway, /* Boolean */isDragSource) {
            if (wpConfig('limitedDND'))
               return;
            if ('undefined' === typeof doShowAnyway)
               doShowAnyway = false;
            if ('undefined' === typeof isDragSource)
               isDragSource = false;

            if (!this._emptyIndicator) {
               var message = coreMessages['rs_empty_column_placeholder'];
               this._emptyIndicator = domConstruct.create('div', {
                  'class' : 'lotusWidget2 lotusEmptyColWarn',
                  innerHTML : message,
                  style : 'display: none;'
               }, this.node);
            }

            var nodes = this.getAllNodes(true);
            var isColumnEmpty = (0 === nodes.length) || (isDragSource && 1 === nodes.length);
            if (doShowAnyway || isColumnEmpty) {
               var isEmptyIndicatorHide = ('none' === domStyle.get(this._emptyIndicator, 'display'));
               if (isEmptyIndicatorHide) {
                  domStyle.set(this._emptyIndicator, 'display', 'block');
               }
            }
         },

         _hideEmptyIndicator : function(/* Boolean */doHideAnyway) {
            if (wpConfig('limitedDND') || !this._emptyIndicator)
               return;
            if ('undefined' === typeof doHideAnyway)
               doHideAnyway = true;

            var nodes = this.getAllNodes(true);
            var isColumnEmpty = (0 === nodes.length);
            if (doHideAnyway || !isColumnEmpty) {
               var isEmptyIndicatorShow = ('block' === domStyle.get(this._emptyIndicator, 'display'));
               if (isEmptyIndicatorShow) {
                  domStyle.set(this._emptyIndicator, 'display', 'none');
               }
            }
         },

         constructor : function() {
            this._showEmptyIndicator();
         },

         onDndStart : function(/* Source */source, /* DOM Node array */nodes, /* Boolean */copy) {
            WpSource.superclass.onDndStart.apply(this, arguments);
            if (source == this) {
               this._showEmptyIndicator(false, true);
            } else {
               this._showEmptyIndicator();
            }
         },

         onDndCancel : function() {
            WpSource.superclass.onDndCancel.apply(this, arguments);
            var that = this;
            win.setTimeout(function() {
               that._hideEmptyIndicator(false);
            }, 0);
         },

         onDndDrop : function(/* Source */source, /* DOM Node array */nodes, /* Boolean */copy) {
            WpSource.superclass.onDndDrop.apply(this, arguments);
            if (source == this) {
               var that = this;
               win.setTimeout(function() {
                  that._showEmptyIndicator();
               }, 0);
            }
         },

         onMouseOver : function(/* Event */e) {
            WpSource.superclass.onMouseOver.apply(this, arguments);
            if (this.isDragging) {
               this._hideEmptyIndicator();
            }
         },

         onMouseOut : function(/* Event */e) {
            WpSource.superclass.onMouseOut.apply(this, arguments);
            if (this.isDragging) {
               this._showEmptyIndicator(false, true);
            }
         },

         showEmptyIndicator : function(/* Boolean */doShowAnyway) {
            this._showEmptyIndicator(doShowAnyway);
         },

         hideEmptyIndicator : function(/* Boolean */doHideAnyway) {
            this._hideEmptyIndicator(doHideAnyway);
         },

         getAllNodes : function(/* Boolean */includeFixedNodes) {
            if (includeFixedNodes) {
            	var column = this.parent;
               return this._getColumnWidgetNodes(column, this.allowNested);
            } else {
               return WpSource.superclass.getAllNodes.apply(this, arguments);
            }
         }
   	});

   return WpSource;
});