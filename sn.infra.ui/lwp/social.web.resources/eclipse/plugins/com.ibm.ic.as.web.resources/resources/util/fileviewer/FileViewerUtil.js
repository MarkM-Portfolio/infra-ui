/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/has",
], function(declare, lang, has) {
		
	var FileViewerUtil = declare(null, {
	
		fileViewer: undefined,
		
		constructor: function() {	
		},

		/**
		 * Utility method to launch the fileViewer
		 */
		launchFileViewer: function(url) {
			this.fileViewer = lang.getObject("lconn.share.fileviewer.ConnectionsFileViewer");
			if(this.fileViewer && url){
				this.fileViewer.openFromUrl(url);
			} else {
				throw err('FileViewer not available');
			}			
		},
		
		/**
	     * Determine if the FileViewer should be displayed instead of EE
	     * Note the following
	     * 1) Gatekeeper switch
	     * 2) Not gadget scenario (where EE must be launched for OpenSocial)
	     * 3) check for generator - status updates with files attached share this hierarchy
	     * for now they retain the StatusUpdate EE with file attachement (keeping inline commenting, liking etc as Microblogging)
	     */
		isFileOverlayEnabled: function(generatorId){
			if(typeof activityStreamAbstractHelper !== 'undefined' && activityStreamAbstractHelper.isGadget) {
				return false;
			}

			if (generatorId === "profiles"){
				return false;
			}

			if(has("fileviewer-everywhere") && has("fileviewer-everywhere-activitystream")) {
				return true;
			}

			return false;
		},
		
		/**
	     * Determine if the FileViewer should be displayed instead on NotificationCenter
	     */
		isFileOverlayEnabledNC: function(generatorId){
			return (this.isFileOverlayEnabled(generatorId) && has("fileviewer-everywhere-nc"));
		}
	});
	
	FileViewerUtil._Instance = null;
	  
	FileViewerUtil.getInstance = function(){
		if(FileViewerUtil._Instance == null){
			FileViewerUtil._Instance = new FileViewerUtil();
	  	}
	  	return FileViewerUtil._Instance;
	}
	
	return FileViewerUtil.getInstance();
});
