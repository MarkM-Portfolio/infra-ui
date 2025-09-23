/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.dialog.DownloadErrorDialog");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.Dialog");
dojo.require("com.ibm.social.as.util.Localizer");

dojo.declare("com.ibm.social.as.dialog.DownloadErrorDialog",
	[dijit._Widget, dijit._Templated,
	 com.ibm.social.as.util.Localizer],
	{	 
	   
	    templatePath: dojo.moduleUrl("com.ibm.social.as", "dialog/templates/downloadErrorDialog.html"),
	    
	    // Popup dialog hosting the preview
	    popup: null,
	
	    blankGif: djConfig.blankGif,
	    
	    postMixInProperties : function(){
	    	this.inherited(arguments);

	    	// Initialize the popup
	    	this.popup = new dijit.Dialog({});
	    },
	    
	    postCreate : function(){
			// Copy the contents of this template into the dialog
    		this.popup.attr("content", this.domNode);
	    },
	    
	    show : function(){
	    	this.popup.show();
	    },
	    
	    hide : function(){
	    	this.popup.hide();
	    },
	    
	    /** Called when X clicked */
	    closeClicked : function(){
	    	// Close the popup
	    	this.hide();
	    }
	}
);
