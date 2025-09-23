/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([ "dojo/_base/lang"
], function(lang) {

   var picker = lang.getObject("lconn.core.filepicker", true);

   /**
    * lconn.core.filepicker.open Opens a dialog with a list of files stored in
    * Connections Files, allowing consumers to select files and interact with
    * them via a consumer-defined callback function. This interface uses (__link
    * lconn.files.picker.files#open}
    * 
    * @param args
    *           A hash object with the following properties: - Required: -
    *           filesService: the config object representing the files,
    *           retrieved via
    *           <code>dojo.getObject("lconn.core.config.services.files");</code> -
    *           title: the title of the dialog - onSave: the callback function.
    *           Accepts an array of (__link lconn.share.bean.File} objects. if
    *           the callback returns false (exactly false, not a false-ish
    *           value, like 0, null, or undefined) then the dialog will remain
    *           open. If it returns no value or any non-false value, the dialog
    *           will close. - Optional: - scope: The object that will be
    *           considered the <code>this</code> scope when the callback is
    *           called. - sourceSet: An array that decides which sources will be
    *           shown in the picker. The item value in the array could be
    *           "myfiles", "mycomputer". By default the value will be
    *           ["myfiles", "mycomputer"]. - publicOnly: If <code>true</code>,
    *           the picker will only show the files which current user can make
    *           to public. Defaults to <code>false</code>. -
    *           showOnlyPublicFiles: If <code>true</code>, the picker will
    *           only show public files. Defaults to <code>false</code>. -
    *           externalOnly: If <code>true</code>, the picker will only let
    *           the user choose externally available files. Defaults to
    *           <code>false</code>. - shareableOnly: If <code>true</code>,
    *           the picker will only let the user choose files that they can
    *           share. Defaults to <code>false</code>. - multi: If
    *           <code>true</code>, the picker will let the user choose
    *           multiple files. Defaults to <code>true</code>. - disabledCss:
    *           An array that defines the css files been prohibited from loading
    *           in Picker widget. Currently there is only one option:
    *           <code>sprites</code>. If <code>true</code>, the picker
    *           will NOT load Connections css files. Default to
    *           <code>false</code>. - community: If it is a valid community
    *           id, there will be one "Community Files" section in left sidebar
    *           of FilePicker, when it is selected, the files in this community
    *           will be displayed for user to select. - uploadToCommunity: If
    *           <code>true</code>, the upload file will check community
    *           library, and will eventually upload selected file to community
    *           library.
    *           <code>community<code> parameter must be set to make this parameter take effect. 
    *        - syncableItems: Indicate how to handle the synchronizable files in the picker, the value should be one of "display | display-decorated | disabled | none". Default value is "display".
    *                         If <code>display</code>, the synchronizable files will be shown in the picker without decorated icon;
    *                         If <code>display-decorated</code>, the synchronizable files will be shown in the picker with decorated icon;
    *                         If <code>disabled</code>, the synchronizable files will be shown in the picker, but unable to be selected;
    *                         If <code>none</code>, the synchronizable files will NOT be shown in the picker.
    *        - onOpen: The callback function with signature of <code>function(dialog);</code>. It will be invoked when FilePicker opened. 
    *                 The parameter, dialog, is FilePicker dialog object.
    *                 To set message when FilePicker dialog is opened, caller can use <code>dialog.setDialogMessage(contents, level);</code>.
    *                    <code>contents</code>: message contents. It can be string, node, or Array of nodes. 
    *                    <code>level</code>: String represents message level, which should be one of "info", "warning", "error". Defaults to "info".
    *       - onClose: The callback function with signature of <code>function();</code>. It will be invoked when FilePicker closed. 
    *       - onSelected: The callback function with signature of <code>function(dialog, fileBeans)</code>. It will be invoked when one file is selected.
    *                     The first parameter, dialog, is FilePicker dialog object; the second parameter, fileBeans, is an array of (__link lconn.share.bean.File} objects.
    *                     To set message when one file is selected, caller can use <code>dialog.setDialogMessage(contents, level);</code>.
    *                        <code>contents</code>: String, Node, or Array of nodes. It contains the content which will be shown;
    *                        <code>level</code>: String. It represents the message level. Should be one of "info", "warning", "error". Defaults to "info".
    * @undocumented
    */
   picker.open = function(args) {
      xdloader.load_async("lconn.files.picker.FilePickerAssy", function() {
         lconn.files.picker.files.open(args);
      });
   };

   /**
    * lconn.core.filepicker.openInline Opens a Embedded widget with a list of
    * files stored in Connections Files, allowing consumers to select files or
    * upload local files, and interact with them via a consumer-defined callback
    * function. This interface uses (__link lconn.files.picker.files#openInline}
    * 
    * @param args
    *           A hash object with the following properties: - Required: -
    *           filesService: the config object representing the files,
    *           retrieved via
    *           <code>dojo.getObject("lconn.core.config.services.files");</code> -
    *           onSave: the callback function. Accepts an array of (__link
    *           lconn.share.bean.File} objects. if the callback returns false
    *           (exactly false, not a false-ish value, like 0, null, or
    *           undefined) then the dialog will remain open. If it returns no
    *           value or any non-false value, the dialog will close. - Optional: -
    *           scope: The object that will be considered the <code>this</code>
    *           scope when the callback is called. - publicOnly: If
    *           <code>true</code>, the picker will only show the files which
    *           current user can make to public. Defaults to <code>false</code>. -
    *           showOnlyPublicFiles: If <code>true</code>, the picker will
    *           only show public files. Defaults to <code>false</code>. -
    *           externalOnly: If <code>true</code>, the picker will only let
    *           the user choose externally available files. Defaults to
    *           <code>false</code>. - shareableOnly: If <code>true</code>,
    *           the picker will only let the user choose files that they can
    *           share. Defaults to <code>false</code>. - multi: If
    *           <code>true</code>, the picker will let the user choose
    *           multiple files. Defaults to <code>true</code>. - community:
    *           If it is a valid community id, there will be one "Community
    *           Files" section in left sidebar of FilePicker, when it is
    *           selected, the files in this community will be displayed for user
    *           to select. - uploadToCommunity: If <code>true</code>, the
    *           upload file will check community library, and will eventually
    *           upload selected file to community library.
    *           <code>community<code> parameter must be set to make this parameter take effect. 
    *       - onOpen: The callback function with signature of <code>function(dialog);</code>. It will be invoked when FilePicker opened. 
    *                 The parameter, dialog, is FilePicker dialog object.
    *                 To set message when FilePicker dialog is opened, caller can use <code>dialog.setDialogMessage(contents, level);</code>.
    *                    <code>contents</code>: message contents. It can be string, node, or Array of nodes. 
    *                    <code>level</code>: String represents message level, which should be one of "info", "warning", "error". Defaults to "info".
    *       - onClose: The callback function with signature of <code>function();</code>. It will be invoked when FilePicker closed. 
    *       - onSelected: The callback function with signature of <code>function(dialog, fileBeans)</code>. It will be invoked when one file is selected.
    *                     The first parameter, dialog, is FilePicker dialog object; the second parameter, fileBeans, is an array of (__link lconn.share.bean.File} objects.
    *                     To set message when one file is selected, caller can use <code>dialog.setDialogMessage(contents, level);</code>.
    *                        <code>contents</code>: String, Node, or Array of nodes. It contains the content which will be shown;
    *                        <code>level</code>: String. It represents the message level. Should be one of "info", "warning", "error". Defaults to "info".
    * @undocumented
    */
   picker.openInline = function(args) {
      net.jazz.ajax.xdloader.load_async("lconn.files.picker.EmbededFilePickerAssy", function() {
         lconn.files.picker.fileswidget.create(args);
      });
   };

   return picker;
});
