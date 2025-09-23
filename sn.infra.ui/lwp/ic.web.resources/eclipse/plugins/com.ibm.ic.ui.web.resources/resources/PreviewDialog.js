/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "dojo",
   "dojo/_base/declare",
   "dojo/dom-construct",
   "dojo/focus",
   "dojo/i18n",
   "dojo/i18n!./nls/PreviewDialog",
   "dojo/text!./templates/PreviewDialog.html",
   "dojo/topic",
   "dijit/_Templated",
   "dijit/_Widget",
   "./HoverDialog",
   "./PreviewDialogPresentation"
], function (dojo, declare, domConstruct, focusUtil, i18n, i18nPreviewDialog, template, topic, _Templated, _Widget, HoverDialog, PreviewDialogPresentation) {
   
   /**
    * @class ic-ui.PreviewDialog
    * @author Clayton Coleman <claycole@us.ibm.com>
    */
   var PreviewDialog = declare("com.ibm.oneui.PreviewDialog", HoverDialog, /** @lends ic-ui.PreviewDialog.prototype */ {
      /**
       * If true, expand to fill as much of the page as possible. 
       * 
       * @experimental API interface may change
       * @notyetimplemented
       */
      fullHeight: false,
      
      /**
       * Preview dialogs support the concept of an iterator - an interface that returns
       * information about whether there are more items available.  An iterator should 
       * support the methods described in the public interface of ItemIterator.  Iterators
       * may have deferred behavior for when information must be returned from a server.
       * 
       * The iterator MUST return an object with a member "around" that contains the
       * DOMElement corresponding to this item on the page, which is used for positioning. 
       */
      iterator: null,
      
      /**
       * Implement this method to render the contents of the preview dialog to match
       * the currently selected item.
       * 
       *       function(item, PreviewDialog instance, DOMElement for contents) {
       *          // item is optional, and is the object returned by the iterator
       *          //    interface
       *       }
       */
      updateDialogContents: null,

      // Internal only
      _clickAround: "_targetClickAround",
      
      createContents: function(widget) {
         var presentation = this._presentation; 
         if (!presentation) {
            presentation = this._presentation = this.initPresentation();
            domConstruct.place(presentation.domNode, widget.domNode);
         }
         return presentation.domNode;
      },
      
      /**
       * Subclassers may override this method to provide a more complex preview
       * dialog presentation.  The base implementation depends on the "parent"
       * attribute, but the updateContents override is only provided for ease of
       * extension.
       */
      initPresentation: function() {
         return new PreviewDialogPresentation({
            parent: this,
            updateContents: this.updateDialogContents
         });
      },
      
      onOpen: function() {
         this.inherited(arguments);
         var iterator = this.iterator;
         if (iterator) {
            this._update(true, iterator.find(this._target), iterator.hasNext(), iterator.hasPrevious());
         }
      },
      
      next: function() {
         var iterator = this.iterator;
         if (!iterator.hasNext() || this._updating) {
            return;
         }
         this._update(false, iterator.next(), iterator.hasNext(), true, true);
      },
      previous: function() {
         var iterator = this.iterator;
         if (!iterator.hasPrevious() || this._updating) {
            return;
         }
         this._update(false, iterator.previous(), true, iterator.hasPrevious(), false);
      },
      
      _update: function(onOpen, item, hasNext, hasPrevious, forward) {
         if (this._updating) {
            return;
         }

         this._updating = true;
         var presentation = this._presentation;
         
         if (item instanceof dojo.Deferred) {
            presentation.loading(true);
            item.addBoth(this, function(item) {
               this._updating = false;
               this._update(onOpen, item, hasNext, hasPrevious, forward);
            });
            return;
         }
            
         var hadFocus, around = item.around;
         
         presentation.setPaging(hasNext, hasPrevious);
         presentation.updateContents(item, this, presentation.contentNode);
         
         if (!onOpen) {
            hadFocus = this._hasF;
            this._hasF = false;
            this.close();
         }
         if (!onOpen) {
            this.open(around);
            if (hadFocus) {
               var target;
               if (forward) {
                  target = hasNext ? presentation.nextNode : presentation.prevNode;
               }
               else if (!forward) {
                  target = hasPrevious ? presentation.prevNode : presentation.nextNode;
               }
               if (!target) {
                  this._getFocusItems(this._getDomNode());
                  target = this._firstFocusItem;
               }
                  
               focusUtil.focus(target);
               this._hasF = true;
            }
         }
         
         this._updating = false;
      }
   });

   return PreviewDialog;
});
