/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
      "dojo",
      "dojo/query",
      "dojo/_base/declare",
      "dojo/dom-class",
      "dojo/dom-construct",
      "dojo/has",
      "dojo/i18n",
      "dojo/_base/lang",
      "dojo/i18n!ic-core/nls/strings",
      "dojo/string",
      "dijit/Dialog",
      "dojox/uuid/generateTimeBasedUuid"
],
   function(dojo, query, declare, domClass, domConstruct, has, i18n, lang, i18nstrings, string, Dialog, generateTimeBasedUuid) {

      /**
       * Dialog widget used by {@link lconn.core.BrowseGroups}
       * 
       * @class ic-core.BrowseGroupsDialog
       */
      var BrowseGroupsDialog = declare("lconn.core.BrowseGroupsDialog",
         null,
         /** @lends ic-core.BrowseGroupsDialog.prototype */
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
                  '<div class="lotusDialogFooter" role="presentation"><input type="button" class="lotusFormButton submit" /> <input type="button" class="lotusFormButton cancel" /> </div>',
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
               var bundle = i18nstrings;

               domConstruct.place(document.createTextNode(title), dlg.lotusTitleNode, "only");
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
                * @namespace ic-core.BrowseGroupsDialog.Handle
                */
               return /** @lends ic-core.BrowseGroupsDialog.Handle */ {
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
                     domClass.add(dlg.lotusSubmitNode, "lotusBtnDisabled");
                     dlg.lotusSubmitNode.disabled = "disabled";
                  },
                  /**
                   * Enables the dialog's submit button
                   */
                  enableSubmit : function() {
                     domClass.remove(dlg.lotusSubmitNode, "lotusBtnDisabled");
                     dlg.lotusSubmitNode.disabled = "";
                  }
               };
            },

            /**
             * FIXME: this function is always executed in the context of the
             * dijit.Dialog. It should not be a method of BrowseGroupsDialog
             */
            dialogKeyListener : function(evt) {
               // Handles keyboard events
               var key = evt.keyCode || evt.charCode;
               var dk = dojo.keys;
               switch (key) {
                  case dk.SPACE:
                     evt.preventDefault();
                     // FIXME: 'this' is an instance of dijit.Dialog
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

               var blankGif = (dojo.config.blankGif || require.toUrl("dojo/resources/blank.gif"));
               var html = string.substitute(this._dialogTemplate, lang.mixin(i18nstrings, {
                  blankGif : blankGif,
                  titleID : generateTimeBasedUuid(),
                  contentID : generateTimeBasedUuid()
               }));

               // if dialog exists, reuse it
               if (_dlg.length > 0 && !_dlg[_dlg.length - 1].open) {
                  dlg = _dlg.pop();
               }
               else {
                  // Create a new dialog
                  dlg = new Dialog();
               }

               dlg.containerNode.innerHTML = html;

               dlg.titleBar.style.display = 'none';
               dlg.titleBar = query("h1", dlg.containerNode)[0];

               dlg.closeBtn = query(".lotusDialogClose", dlg.containerNode)[0];
               dlg.lotusTitleNode = query("h1 .title", dlg.containerNode)[0];
               dlg.lotusContentNode = query(".lotusDialogContent", dlg.containerNode)[0];
               dlg.lotusFooterNode = query(".lotusDialogFooter", dlg.containerNode)[0];
               dlg.lotusSubmitNode = query(".lotusDialogFooter .submit", dlg.containerNode)[0];
               dlg.lotusCancelNode = query(".lotusDialogFooter .cancel", dlg.containerNode)[0];
               dlg.lotusDialogBorder = query(".lotusDialogBorder", dlg.containerNode)[0];

               // Make sure IE is limited in width
               if (has("ie"))
                  // FIXME: hardcoded style
                  dlg.lotusDialogBorder.style.width = "500px";

               dlg.connect(dlg.closeBtn, 'onclick', 'onCancel');
               dlg.connect(dlg.closeBtn, 'onkeypress', this.dialogKeyListener);
               dlg.connect(dlg.lotusCancelNode, 'onclick', 'onCancel');

               _dlg.push(dlg);

               // Return the top of the stack
               return _dlg[_dlg.length - 1];
            }
         });

      return BrowseGroupsDialog;
   });
