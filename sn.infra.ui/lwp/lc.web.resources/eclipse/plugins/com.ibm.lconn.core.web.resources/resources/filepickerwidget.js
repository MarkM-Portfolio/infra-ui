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

dojo.provide("lconn.core.filepickerwidget");
dojo.require("net.jazz.ajax.xdloader");

(function(pickerwidget) {
	/**
	 * @deprecated
	 * 
	 * please use lconn.core.filepicker.openInline() instead
	 * 
	 *	lconn.core.filepicker.open
	 *
	 *	Open a dialog with a list of files stored in Connections Files, allowing consumers
	 *  to select files and interact with them via a consumer-defined callback function.
	 *  
	 *  This interface uses {@link lconn.files.picker.files#open}
	 *    
	 *  @param args A hash object with the following properties:
	 *  	- Required:
	 *  		- filesService: the config object representing the files, retrieved via
	 *  			<code>dojo.getObject("lconn.core.config.services.files");</code>
	 *  	
	 *  	- Optional:
	 *  		- publicOnly: If <code>true</code>, the picker will only show the files which current user can make to public. Defaults to <code>false</code>.
	 *       - showOnlyPublicFiles: If <code>true</code>, the picker will only show public files. Defaults to <code>false</code>.
	 *  		- externalOnly: If <code>true</code>, the picker will only let the user choose externally available files. Defaults to <code>false</code>.
	 *  		- shareableOnly: If <code>true</code>, the picker will only let the user choose files that they can share. Defaults to <code>false</code>.
	 *       - multi: If <code>true</code>, the picker will let the user choose multiple files. Defaults to <code>true</code>.
	 *       - community: If it is a valid community id, there will be one "Community Files" section in left sidebar of FilePicker, when it is selected,
    *                     the files in this community will be displayed for user to select.
    *       - postCreate: after the creation of the widget, we will call postCreate(widget)
	 */	
   pickerwidget.create = function(args) {
	   net.jazz.ajax.xdloader.load_async("lconn.files.picker.EmbededFilePickerAssy", function() {
	      lconn.files.picker.fileswidget.create(args);
		});
	};
}(lconn.core.filepickerwidget));

