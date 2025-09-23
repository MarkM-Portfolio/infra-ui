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

/*
 * @namespace lconn.core.DialogUtil
 * @see {@link http://w3.ibm.com/connections/wikis/home?lang=en#/wiki/W0d8f31412d14_4f33_8531_f59d53eac6ff/page/Dialog%20Utility%20Functions}
 */
dojo.provide("lconn.core.DialogUtil");

dojo.require("dijit.Dialog");
dojo.require("dojo.query");
dojo.require("dojo.i18n");
dojo.require("dojo.string");
dojo.require("dojox.uuid");
dojo.require("dojox.uuid.generateTimeBasedUuid");
dojo.requireLocalization("lconn.core", "strings");

(function() {
   var strings = dojo.i18n.getLocalization('lconn.core', 'strings');

   /**
    * Shows an alert dialog similar to window.alert() with an OK button.
    * 
    * @function alert
    * @memberof lconn.core.DialogUtil
    * @param title
    *           The string to show in the title of the dialog
    * @param message
    *           The string to show in the content of the dialog. Must be HTML
    *           safe -- it's added as innerHTML!
    * @param [callback]
    *           Method to call when dialog is dismissed
    */
   lconn.core.DialogUtil.alert = function(title, message, callback) {
      var d = getDialog();
      d.lotusTitleNode.innerHTML = title;
      d.lotusContentNode.innerHTML = message;
      d.lotusCancelNode.style.display = 'none';
      d.titleBar.style.display = 'none';
      d.lotusSubmitNode.value = dojo.i18n.getLocalization('lconn.core',
            'strings').rs_ok;
      d.lotusSubmitNode.onclick = function() {
         d.hide();
         if (dojo.isFunction(callback))
            callback();
      };
      d.show();
   };

   /**
    * Shows a prompt dialog with OK and Cancel buttons. Similar to
    * window.confirm().
    * 
    * @function prompt
    * @memberof lconn.core.DialogUtil
    * @param title
    *           The string to show in the title of the dialog
    * @param message
    *           The string to show in the content of the dialog. Must be HTML
    *           safe -- it's added as innerHTML!
    * @param submit
    *           The string to use for the submit or "yes" button
    * @param cancel
    *           The string to use for the cancel or "no" button
    * @param [callback]
    *           The function to call with the results of the dialog. Passes a
    *           boolean indicating which button
    * @param [dialogCss]
    *           The class name for invoker to customize the dialog the user
    *           pressed.
    */
   lconn.core.DialogUtil.prompt = function(title, message, submit, cancel, callback, dialogCss) {
      var d = getDialog(title);

      d.lotusTitleNode.innerHTML = title;

      d.lotusContentNode.innerHTML = message;
      d.lotusSubmitNode.value = submit;
      d.lotusCancelNode.value = cancel;
      d.lotusCancelNode.style.display = '';

      d.lotusSubmitNode.onclick = function() {
         d.hide();
         if (dojo.isFunction(callback))
            callback(true);
      };

      dojo.connect(d, "onCancel", null, function() {
         if (dojo.isFunction(callback))
            callback(false);
      });

      d.titleBar.style.display = 'none';

      if (dialogCss)
         dojo.addClass(d.lotusBorderNode, dialogCss);

      d.show();
   };

   /**
    * Pop up a dialog with more advanced functionality, usually required when
    * the dialog contains a form. Note that the dialog is not closed when the user
    * presses the submit button; this is delegated to the onSubmit callback, in order
    * to allow the caller to perform validation on the form.
    * 
    * @function popupForm
    * @memberof lconn.core.DialogUtil
    * @param title
    *           The string to show in the title of the dialog
    * @param node
    *           The dom node to put in the dialog
    * @param submit
    *           The string to use for the submit or "yes" button
    * @param cancel
    *           The string to use for the cancel or "no" button
    * @param onSubmit
    *           A function to be called when the user presses the submit button.
    * @param [onCancel]
    *           A function to be called when the user presses the cancel button
    * @returns an object containing utility functions for the dialog, including:
    *          <dl>
    *          <dt>_dialog:</dt>
    *          <dd>the itself dialog</dd>
    *          <dt>hide():</dt>
    *          <dd>hide the dialog
    *          <dt>disableSubmit():</dt>
    *          <dd>Disable and gray out the submit button, and change the text
    *          to "loading". Use this when the form is in the process of being
    *          submitted.</dd>
    *          <dt>enableSubmit():</dt>
    *          <dd>Enable and activate the submit button, and change the text
    *          back from "loading". Use this if the submit encountered an error.</dd>
    *          </dl>
    */
   lconn.core.DialogUtil.popupForm = function(title, node, submit, cancel, onSubmit, onCancel) {
      var d = getDialog(title);

      d.lotusTitleNode.innerHTML = title;

      d.lotusContentNode.innerHTML = '';
      d.lotusContentNode.appendChild(node);

      d.lotusSubmitNode.value = submit;
      d.lotusCancelNode.value = cancel;
      d.lotusCancelNode.style.display = '';

      d.lotusSubmitNode.onclick = function() {
         onSubmit();
      };
      if (onCancel) {
         d.connect(d, "onCancel", dojo.hitch(null, onCancel));
      }
      d.titleBar.style.display = 'none';
      d.show();
      
      dojo.publish("lconn/core/DialogUtil/popupFormDialogShown", d);

      return {
         _dialog : d,
         hide : function() {
            d.hide();
         },
         disableSubmit : function() {
            dojo.addClass(d.lotusSubmitNode, "lotusBtnDisabled");
            d.lotusSubmitNode.disabled = "disabled";
            d.lotusSubmitNode.value = strings.rs_loading;
         },
         enableSubmit : function() {
            dojo.removeClass(d.lotusSubmitNode, "lotusBtnDisabled");
            d.lotusSubmitNode.disabled = "";
            d.lotusSubmitNode.value = submit;
         }
      };
   };
   /*
    * Setting a width on lotusDialogBorder here helps IE dialog rendering bugs
    * but not needed for Firefox Forums has a dialog which contains a file
    * field; FF doesn't let you set fixed width on file fields but IE does. FF
    * lets you use "size" but that's relative to the size of a character so the
    * dialog should not be fixed width in FF since it doesn't have an issue in
    * the first place. So you should set a css rule for IE like .dj_ie
    * .lotusDialogBorder { width: 500px; }.
    */
   var dialogTemplate = {
         templatePath : dojo.moduleUrl("lconn.core", "templates/DialogUtil.html")
   };

   /*
    * Stack of dialogs
    */
   var dialogs = [];

   /*
    * Utility used by the public dialog functions to return a dialog object.
    * Maintains one dialog object for re-use unless there is one open, in which
    * case it will create another one and add it to the array. Cleans up closed
    * dialogs at the top of the stack which are closed.
    */
   function getDialog() {
      // Clean up the top of the stack by destroying all which are closed
      while (dialogs.length > 0 && !dialogs[dialogs.length - 1].open) {
         var top = dialogs.pop();
         top.destroyRecursive();
         top = null;
      }

      // Create a new dialog
      var blankGif = (dojo.config.blankGif || dojo.moduleUrl("dojo",
            "resources/blank.gif"));
      var html = dojo.string.substitute(dojo.cache("lconn.core", "templates/DialogUtil.html"), dojo.mixin(dojo.clone(strings), {
         blankGif : blankGif,
         titleID : dojox.uuid.generateTimeBasedUuid(),
         contentID : dojox.uuid.generateTimeBasedUuid()
      }));
      var d = new dijit.Dialog();

      d.containerNode.innerHTML = html;

      d.closeBtn = dojo.query(".lotusDialogClose", d.containerNode)[0];
      d.lotusTitleNode = dojo.query("h1 .title", d.containerNode)[0];
      d.lotusContentNode = dojo.query(".lotusDialogContent", d.containerNode)[0];
      d.lotusFooterNode = dojo.query(".lotusDialogFooter", d.containerNode)[0];
      d.lotusSubmitNode = dojo.query(".lotusDialogFooter .submit",
            d.containerNode)[0];
      d.lotusCancelNode = dojo.query(".lotusDialogFooter .cancel",
            d.containerNode)[0];
      d.lotusBorderNode = dojo.query(".lotusDialogBorder", d.containerNode)[0];

      d.connect(d.closeBtn, 'onclick', 'onCancel');
      d.connect(d.lotusCancelNode, 'onclick', 'onCancel');

      dialogs.push(d);

      // Return the top of the stack
      return dialogs[dialogs.length - 1];
   }
   ;

})();
