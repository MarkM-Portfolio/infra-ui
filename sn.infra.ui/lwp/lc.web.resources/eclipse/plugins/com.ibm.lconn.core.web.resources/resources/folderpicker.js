/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("lconn.core.folderpicker");

(function(picker) {
/**
 *lconn.core.folderpicker.open
 *
 *Opens a dialog with a list of folders stored in Connections Files, allowing consumers
 *  to select folders or create folders, and interact with them via a consumer-defined callback function.
 *  
 *  This interface uses (__link lconn.files.picker.folders#open}
 *    
 *  @param args A hash object with the following properties:
 *  - Required:
 *    - filesService: the config object representing the files, retrieved via
 *      <code>dojo.getObject("lconn.core.config.services.files");</code>
 *    - title: the title of the dialog
 *    - onSave: the callback function. Accepts an array of (@link lconn.share.bean.Collection} objects.
 *      if the callback returns false (exactly false, not a false-ish value, like 0, null, or undefined)
 *      then the dialog will remain open. If it returns no value or any non-false value, the dialog will close. 
 *
 *  - Optional:
 *    - scope: The object that will be considered the <code>this</code> scope when the callback is called.
 *    - publicOnly: If <code>true</code>, the picker will only let the user choose public folders. Defaults to <code>false</code>.
 *    - externalOnly: If <code>true</code>, the picker will only let the user choose externally available folders. Defaults to <code>false</code>.
 *    - onClose: The callback function with signature of <code>function();</code>. It will be invoked when folder picker closed.
 *    - oneuiVersion: The number to indicate the version of oneui package used on the picker. Defaults to <code>3</code>.
 *    - multi: If <code>true</code>, the picker will let the user choose multiple folders. Defaults to <code>true</code>.
 *    - okButtonText: Text for Ok|Submit button
 *    - okButtonTitle: Title for the Ok|Submit button
 *    - useCompact: Boolean. If <code>true</code>, the picker will be rendered with the compact way. Defaults to <code>false</code>.
 *    - following optional properties are only relevant, if <code>useCompact == true</code>
 *    -- showRoot: If <code>true</code>, then the folder picker will show an additional root item for folders of Files. Defaults to <code>false</code>.
 *    -- rootName [for <code>showRoot == true</code>]: name of root item
 *    -- showRootInBreadcrumb [for <code>showRoot == true</code>]: If <code>true</code>, then the root item will be shown as the breadcrumb root, 
 *                             else the root item will be shown as the first element in the folder list.
 *                             Defaults to <code>false</code>.
 *    -- hideCheckbox: Boolean. If <code>true</code>, check box/radio button is not displayed before file or folder. Defaults to <code>false</code>.
 *    -- hideBreadcrumbWithRootOnly: Boolean. Specify whether to hide breadcrumb if it only has root node. Defaults to <code>false</code>.
 *    -- breadcrumbPrefix: Specify a prefix to decorate breadcrumb in picker.
 */
   
picker.open = function(args) {
net.jazz.ajax.xdloader.load_async("lconn.files.picker.FolderPickerAssy", function() {
   args.mode = "dialog";
   lconn.files.picker.folders.open(args);
});
};

/**
 * lconn.core.folderpicker.openInline
 *
 * Opens a combo widget which will allow consumer select items from a list of folders stored in Connections Files, or create
 *  folder by themselves.
 *  
 *  This interface uses (__link lconn.files.picker.folders#openInline}
 *    
 *  @param args A hash object with the following properties:
 *    - Required:
 *       - filesService: the config object representing the files, retrieved via
 *          <code>dojo.getObject("lconn.core.config.services.files");</code>
 *       - onSave: the callback function. Accepts an array of (@link lconn.share.bean.Collection} objects.
 *          if the callback returns false (exactly false, not a false-ish value, like 0, null, or undefined)
 *          then the dialog will remain open. If it returns no value or any non-false value, the dialog will close. 
 *
 *    - Optional:
 *       - scope: The object that will be considered the <code>this</code> scope when the callback is called.
 *       - publicOnly: If <code>true</code>, the picker will only let the user choose public folders. Defaults to <code>false</code>.
 *       - externalOnly: If <code>true</code>, the picker will only let the user choose externally available folders. Defaults to <code>false</code>.
 *       - onClose: The callback function with signature of <code>function();</code>. It will be invoked when folder picker closed.
 *       - oneuiVersion: The number to indicate the version of oneui package used on the picker. Defaults to <code>3</code>.
 *       - multi: If <code>true</code>, the picker will let the user choose multiple folders. Defaults to <code>true</code>.
 *       - okButtonText: Text for Ok|Submit button
 *       - okButtonTitle: Title for the Ok|Submit button
 *       - useCompact: Boolean. If <code>true</code>, the picker will be rendered with the compact way. Defaults to <code>false</code>.
 *       - following optional properties are only relevant, if <code>useCompact == true</code>
 *       -- showRoot: If <code>true</code>, then the folder picker will show an additional root item for folders of Files. Defaults to <code>false</code>.
 *       -- rootName [for <code>showRoot == true</code>]: name of root item
 *       -- showRootInBreadcrumb [for <code>showRoot == true</code>]: If <code>true</code>, then the root item will be shown as the breadcrumb root, 
 *                                else the root item will be shown as the first element in the folder list.
 *                                Defaults to <code>false</code>.
 *       -- hideCheckbox: Boolean. If <code>true</code>, check box/radio button is not displayed before file or folder. Defaults to <code>false</code>.
 *       -- hideBreadcrumbWithRootOnly: Boolean. Specify whether to hide breadcrumb if it only has root node. Defaults to <code>false</code>.
 *       -- breadcrumbPrefix: Specify a prefix to decorate breadcrumb in picker.
*/
picker.openInline = function(args) {
   net.jazz.ajax.xdloader.load_async("lconn.files.picker.FolderPickerAssy", function() {
      args.mode = "inline";
      lconn.files.picker.folders.open(args);
      });
   };
}(lconn.core.folderpicker));

