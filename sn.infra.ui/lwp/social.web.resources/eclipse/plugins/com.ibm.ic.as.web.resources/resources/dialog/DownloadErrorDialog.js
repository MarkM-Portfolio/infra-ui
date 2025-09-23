/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/text!ic-as/dialog/templates/downloadErrorDialog.html",
		"dijit/Dialog",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/util/Localizer"
	], function (declare, template, Dialog, _Templated, _Widget, Localizer) {
	
		var DownloadErrorDialog = declare("com.ibm.social.as.dialog.DownloadErrorDialog",
			[_Widget, _Templated,
			 Localizer],
			{	 
			   
			    templateString: template,
			    
			    // Popup dialog hosting the preview
			    popup: null,
			
			    blankGif: djConfig.blankGif,
			    
			    postMixInProperties : function(){
			    	this.inherited(arguments);
		
			    	// Initialize the popup
			    	this.popup = new Dialog({});
			    },
			    
			    postCreate : function(){
					// Copy the contents of this template into the dialog
		    		this.popup.set("content", this.domNode);
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
		
		return DownloadErrorDialog;
	});
