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

   var picker = lang.getObject("lconn.core.folderpicker", true);
   /**
    * lconn.core.folderpicker.open Opens a dialog with a list of folders stored
    * in Connections Files, allowing consumers to select folders or create
    * folders, and interact with them via a consumer-defined callback function.
    * This interface uses (__link lconn.files.picker.folders#open}
    * 
    * @param args
    *           A hash object with the following properties: - Required: -
    *           filesService: the config object representing the files,
    *           retrieved via
    *           <code>dojo.getObject("lconn.core.config.services.files");</code> -
    *           title: the title of the dialog - onSave: the callback function.
    *           Accepts an array of (@link lconn.share.bean.Collection} objects.
    *           if the callback returns false (exactly false, not a false-ish
    *           value, like 0, null, or undefined) then the dialog will remain
    *           open. If it returns no value or any non-false value, the dialog
    *           will close. - Optional: - scope: The object that will be
    *           considered the <code>this</code> scope when the callback is
    *           called. - publicOnly: If <code>true</code>, the picker will
    *           only let the user choose public folders. Defaults to
    *           <code>false</code>. - externalOnly: If <code>true</code>,
    *           the picker will only let the user choose externally available
    *           folders. Defaults to <code>false</code>. - onClose: The
    *           callback function with signature of <code>function();</code>.
    *           It will be invoked when folder picker closed. - oneuiVersion:
    *           The number to indicate the version of oneui package used on the
    *           picker. Defaults to <code>3</code>. - useCompact: Boolean. If
    *           <code>true</code>, the picker will be rendered with the
    *           compact way. Defaults to <code>false</code>.
    */

   picker.open = function(args) {
      xdloader.load_async("lconn.files.picker.FolderPickerAssy", function() {
         args.mode = "dialog";
         lconn.files.picker.folders.open(args);
      });
   };

   /**
    * lconn.core.folderpicker.openInline Opens a combo widget which will allow
    * consumer select items from a list of folders stored in Connections Files,
    * or create folder by themselves. This interface uses (__link
    * lconn.files.picker.folders#openInline}
    * 
    * @param args
    *           A hash object with the following properties: - Required: -
    *           filesService: the config object representing the files,
    *           retrieved via
    *           <code>dojo.getObject("lconn.core.config.services.files");</code> -
    *           onSave: the callback function. Accepts an array of (@link
    *           lconn.share.bean.Collection} objects. if the callback returns
    *           false (exactly false, not a false-ish value, like 0, null, or
    *           undefined) then the dialog will remain open. If it returns no
    *           value or any non-false value, the dialog will close. - Optional: -
    *           scope: The object that will be considered the <code>this</code>
    *           scope when the callback is called. - publicOnly: If
    *           <code>true</code>, the picker will only let the user choose
    *           public folders. Defaults to <code>false</code>. -
    *           externalOnly: If <code>true</code>, the picker will only let
    *           the user choose externally available folders. Defaults to
    *           <code>false</code>. - onClose: The callback function with
    *           signature of <code>function();</code>. It will be invoked
    *           when folder picker closed. - oneuiVersion: The number to
    *           indicate the version of oneui package used on the picker.
    *           Defaults to <code>3</code>. - useCompact: Boolean. If
    *           <code>true</code>, the picker will be rendered with the
    *           compact way. Defaults to <code>false</code>.
    */
   picker.openInline = function(args) {
      net.jazz.ajax.xdloader.load_async("lconn.files.picker.FolderPickerAssy", function() {
         args.mode = "inline";
         lconn.files.picker.folders.open(args);
      });
   };

   return picker;
});
