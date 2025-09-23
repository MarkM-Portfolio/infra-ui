/* ***************************************************************** */
/*                                                                   */
/* HCL Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright HCL Technologies Limited. 2008, 2022                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.BrowseGroupsDialog");

dojo.require("dijit.Dialog");
dojo.require("dojo.i18n");
dojo.require("dojo.string");
dojo.require("dojox.uuid.generateTimeBasedUuid");

dojo.requireLocalization("lconn.core", "strings");

/**
 * Dialog widget used by {@link lconn.core.BrowseGroups}
 * 
 * @class lconn.core.BrowseGroupsDialog
 */
dojo
      .declare("lconn.core.BrowseGroupsDialog",
         null,
         /** @lends lconn.core.BrowseGroupsDialog.prototype */
         {
            _dialogs : [],

            _dialogTemplate : [
                  '<div class="lotusDialogBorder">',
                  '<div class="lotusDialog" style="zoom:1" role="application" aria-labelledby="${titleID}" waistate="${titleID}">',
                  '<div class="lotusDialogHeader" style="cursor:move">',
                  '<h1 class="lotusHeading"><span id="${titleID}" class="title"></span></h1>',
                  '<a class="lotusDialogClose" role="button" href="javascript:;" title="${rs_close}">',
                  '<img src="${blankGif}" alt="${rs_close}" aria-label="${rs_close}" />',
                  '<span class="lotusAltText">X</span>',
                  '</a>',
                  '</div>',
                  '<div id="${contentID}" class="lotusDialogContent" role="presentation"></div>',
                  '<div class="lotusDialogFooter" role="presentation"> <input type="button" class="lotusFormButton submit" /> <input type="button" class="lotusFormButton cancel" /> </div>',
                  '</div>',
                  '</div>'
            ].join(''),
            
            _dialogTemplateV8 : [
                               '<div class="lotusDialogBorder">',
                               '<div class="lotusDialog" style="zoom:1" role="application" aria-labelledby="${titleID}" waistate="${titleID}">',
                               '<div class="lotusDialogHeader" style="cursor:move">',
                               '<h1 class="lotusHeading"><span id="${titleID}" class="title"></span></h1>',
                               '<a class="lotusDialogClose" role="button" href="javascript:;" title="${rs_close}">',
                               '<img src="${blankGif}" alt="${rs_close}" aria-label="${rs_close}" />',
                               '<span class="lotusAltText">X</span>',
                               '</a>',
                               '</div>',
                               '<div id="${contentID}" class="lotusDialogContent" role="presentation"></div>',
                               '<div class="lotusDialogFooter" role="presentation"> <input type="button" class="lotusFormButton cancel" /> <input type="button" class="lotusFormButton submit" /> </div>',
                               '</div>',
                               '</div>'
                         ].join(''),

            /**
             * Pop up a dialog with more advanced functionality, usually
             * required when the dialog contains a form.
             * 
             * @param title
             *           The string to show in the title of the dialog
             * @param node
             *           The dom node to put in the dialog
             * @param submit
             *           The string to use for the submit or "yes" button
             * @param cancel
             *           The string to use for the cancel or "no" button
             * @param onSubmit
             *           A function to be called when the user presses the
             *           submit button.
             * @param onCancel
             *           A function to be called when the user presses the
             *           cancel button (optional).
             * @return an object containing utility functions for the dialog,
             *         including: hide(): hide the dialog show(): show the
             *         dialog disableSubmit(): Disable and gray out the submit
             *         button, and change the text to "loading". Use this when
             *         the form is in the process of being submitted.
             *         enableSubmit(): Enable and activate the submit button,
             *         and change the text back from "loading". Use this if the
             *         submit encountered an error.
             */
            popupDialog : function(title, node, submit, cancel, onSubmit, onCancel) {
               var dlg = this._getDialog(title);
               var bundle = dojo.i18n.getLocalization('lconn.core', 'strings');

               dojo.place(document.createTextNode(title), dlg.lotusTitleNode, "only");
               dijit.setWaiState(dlg.titleBar, "label", title);

               if (node && node.nodeType) {
                  dlg.lotusContentNode.innerHTML = '';
                  dlg.lotusContentNode.appendChild(node);
               }

               dlg.lotusSubmitNode.value = submit;
               dlg.lotusCancelNode.value = cancel;
               dlg.lotusCancelNode.style.display = '';

               dlg.lotusSubmitNode.onclick = function() {
                  onSubmit();
               };
               if (onCancel) {
                  dlg.lotusCancelNode.onclick = function() {
                     onCancel();
                  };
                  dlg.closeBtn.onclick = function() {
                     onCancel();
                  };
               }

               dlg.show();

               /**
                * Dialog handle
                * 
                * @namespace lconn.core.BrowseGroupsDialog.Handle
                */
               return /** @lends lconn.core.BrowseGroupsDialog.Handle */ {
                  /**
                   * Returns the dialog
                   * 
                   * @returns the dialog
                   */
                  get : function() {
                     return dlg;
                  },
                  /**
                   * Hides the dialog
                   */
                  hide : function() {
                     dlg.hide();
                  },
                  /**
                   * Shows the dialog
                   */
                  show : function() {
                     dlg.show();
                  },
                  /**
                   * Disables the dialog's submit button
                   */
                  disableSubmit : function() {
                     dojo.addClass(dlg.lotusSubmitNode, "lotusBtnDisabled");
                     dlg.lotusSubmitNode.disabled = "disabled";
                  },
                  /**
                   * Enables the dialog's submit button
                   */
                  enableSubmit : function() {
                     dojo.removeClass(dlg.lotusSubmitNode, "lotusBtnDisabled");
                     dlg.lotusSubmitNode.disabled = "";
                  }
               };
            },

            dialogKeyListener : function(evt) {
               // Handles keyboard events
               var key = evt.keyCode || evt.charCode;
               var dk = dojo.keys;
               switch (key) {
                  case dk.SPACE:
                     evt.preventDefault();
                     this.onCancel();
                  default:

               }
            },

            /**
             * Clean up a dialog
             */
            cleanupDialog : function() {
               var _dlg = this._dialogs;

               // Destroy the dialog
               if (_dlg.length > 0) {
                  var dlg = _dlg.pop();
                  dlg.destroyRecursive();
               }

            },

            /**
             * Utility used by the public dialog functions to return a dialog
             * object. Maintains one dialog object for re-use unless there is
             * one open, in which case it will create another one and add it to
             * the array. Cleans up closed dialogs at the top of the stack which
             * are closed.
             */
            _getDialog : function() {
               var _dlg = this._dialogs;

               var dlg = null;

               var blankGif = (dojo.config.blankGif || dojo.moduleUrl("dojo", "resources/blank.gif"));
               var html = dojo.string.substitute(window.ui && window.ui._check_ui_enabled()?this._dialogTemplateV8 : this._dialogTemplate, dojo.mixin(dojo.i18n.getLocalization('lconn.core', 'strings'), {
                  blankGif : blankGif,
                  titleID : dojox.uuid.generateTimeBasedUuid(),
                  contentID : dojox.uuid.generateTimeBasedUuid()
               }));

               // if dialog exists, reuse it
               if (_dlg.length > 0 && !_dlg[_dlg.length - 1].open) {
                  dlg = _dlg.pop();
               }
               else {
                  // Create a new dialog
                  dlg = new dijit.Dialog();
               }

               dlg.containerNode.innerHTML = html;

               dlg.titleBar.style.display = 'none';
               dlg.titleBar = dojo.query("h1", dlg.containerNode)[0];

               dlg.closeBtn = dojo.query(".lotusDialogClose", dlg.containerNode)[0];
               dlg.lotusTitleNode = dojo.query("h1 .title", dlg.containerNode)[0];
               dlg.lotusContentNode = dojo.query(".lotusDialogContent", dlg.containerNode)[0];
               dlg.lotusFooterNode = dojo.query(".lotusDialogFooter", dlg.containerNode)[0];
               dlg.lotusSubmitNode = dojo.query(".lotusDialogFooter .submit", dlg.containerNode)[0];
               dlg.lotusCancelNode = dojo.query(".lotusDialogFooter .cancel", dlg.containerNode)[0];
               dlg.lotusDialogBorder = dojo.query(".lotusDialogBorder", dlg.containerNode)[0];

               // Make sure IE is limited in width
               if (dojo.isIE) {
                  // FIXME: hardcoded style
                  dlg.lotusDialogBorder.style.width = "500px";
               }

               dlg.connect(dlg.closeBtn, 'onclick', 'onCancel');
               dlg.connect(dlg.closeBtn, 'onkeypress', this.dialogKeyListener);
               dlg.connect(dlg.lotusCancelNode, 'onclick', 'onCancel');

               _dlg.push(dlg);

               // Return the top of the stack
               return _dlg[_dlg.length - 1];
            }
         });
