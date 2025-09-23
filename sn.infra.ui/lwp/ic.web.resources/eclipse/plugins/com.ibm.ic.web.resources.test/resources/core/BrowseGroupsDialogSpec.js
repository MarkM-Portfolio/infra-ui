/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/_base/array",
      "dojo/keys",
      "dijit/Dialog",
      "ic-core/BrowseGroupsDialog"
], function(array, keys, Dialog, BrowseGroupsDialog) {

   /**
    * Jasmine spec for BrowseGroupsDialog widget
    * 
    * @module ic-test.core.BrowseGroupsDialogSpec
    */

   describe('the BrowseGroupsDialog widget', function() {
      var widget;
      beforeEach(function() {
         widget = new BrowseGroupsDialog();
      });

      it('implements the expected methods', function() {
         var METHODS = [
               'popupDialog',
               'dialogKeyListener',
               'cleanupDialog'
         ];
         array.forEach(METHODS, function(method) {
            expect(widget[method]).toEqual(jasmine.any(Function));
         });

      });

      it('the method cleanupDialog() destroys the top dialog in the stack', function() {
         var DIALOGS = array.map([
               0,
               1,
               2,
               3
         ], function(i) {
            return jasmine.createSpyObj('dialog_' + i, [ 'destroyRecursive'
            ]);
         });
         widget._dialogs = DIALOGS;
         var first = DIALOGS[DIALOGS.length - 1];
         widget.cleanupDialog();
         expect(first.destroyRecursive).toHaveBeenCalled();
         array.forEach(DIALOGS, function(dlg) {
            expect(dlg.destroyRecursive).not.toHaveBeenCalled();
         });
      });

      it('the method dialogKeyListener() calls onCancel() when the key event is a SPACE', function() {
         var evt = jasmine.createSpyObj('event', [ 'preventDefault'
         ]);
         evt.keyCode = keys.SPACE;

         /**
          * FIXME: this function is always executed in the context of the
          * dijit.Dialog. It should not be a method of BrowseGroupsDialog
          */
         widget.onCancel = jasmine.createSpy('onCancel');
         widget.dialogKeyListener(evt);

         expect(evt.preventDefault).toHaveBeenCalled();
         expect(widget.onCancel).toHaveBeenCalled();
      });

      describe('the method popupDialog()', function() {
         var _show;
         beforeEach(function() {
            _show = Dialog.prototype.show;
         });
         afterEach(function() {
            Dialog.prototype.show = _show;
         });

         it('shows a dialog - no arguments', function() {
            Dialog.prototype.show = jasmine.createSpy('show');
            var handle = widget.popupDialog();
            var dialog = handle.get();
            // Verify it was displayed
            expect(dialog.show).toHaveBeenCalled();
         });

         it('shows a dialog - with arguments', function() {
            Dialog.prototype.show = jasmine.createSpy('show');
            var TITLE = "__dialog__", SUBMIT = "__submit__", CANCEL = "__cancel__";
            var handle = widget.popupDialog(TITLE, undefined, SUBMIT, CANCEL);
            var dialog = handle.get();
            // Verify it's got the right labels
            expect(dialog.lotusTitleNode.innerHTML).toBe(TITLE);
            expect(dialog.lotusSubmitNode.value).toBe(SUBMIT);
            expect(dialog.lotusCancelNode.value).toBe(CANCEL);
            expect(dialog.show).toHaveBeenCalled();
         });

         it('is not vulnerable to XSS attacks', function() {
            Dialog.prototype.show = jasmine.createSpy('show');
            spyOn(window, 'alert');
            widget.popupDialog("<iframe src=\"about:blank\" srcdoc=\"<script>alert('XSS');</script>\"></iframe>");
            widget.popupDialog("<iframe onload=alert('XSS')></iframe>");
            expect(window.alert).not.toHaveBeenCalled();
         });
      });
   });

});
