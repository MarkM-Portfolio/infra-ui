/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.loading.Loader");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("com.ibm.social.as.util.Localizer");

/**
 * Dijit for displaying the Loading indicator for Activity Stream
 * 
 * @author scrawford
 */

dojo.declare("com.ibm.social.as.loading.Loader", 
[dijit._Widget, dijit._Templated,
 com.ibm.social.as.util.Localizer], {
	
	//style class for loader paging section
	styleLoaderPaging: "loaderPaging",
	
	//style class for loader main section
	styleLoaderMain: "loaderMain",
	
	// Path to the template HTML
	templatePath: dojo.moduleUrl("com.ibm.social.as", "loading/templates/loader.html"),
	
	recycling: false,
	
	//loading text
	loading: "",
		
	localizeStrings: function(){
		this.loading = this.getLocalizedString("loadingText");
	},
	
	postMixInProperties: function(){
    	this.inherited(arguments);
		this.loadingImageSrc =  this._blankGif;
	},
		
	postCreate: function(){		
		if(this.loaderAttachNode){		
			dojo.place(this.domNode, this.loaderAttachNode);
		}
	},
	
	/**
	 * Add the loader to view, toggle the correct class for the loader depending on what
	 * is passed in.
	 * Dont display if we are currently recycling
	 */
	displayLoader: function(isPaging){	
		if(!this.recycling){
			if(isPaging){
				dojo.addClass(this.asLoadingNode, this.styleLoaderPaging);	
			}
			else{
				dojo.removeClass(this.asLoadingNode, this.styleLoaderPaging);
			}
			dojo.removeClass(this.asLoadingNode, "lotusHidden");
		}
	},

	/**
	 * Remove the loader from view - if called while in recycle timeout
	 * add short timeout so that it picks up after recycle finishes.
	 */
	removeLoader: function(){
		if(this.recycling){
			window.setTimeout(dojo.hitch(this, function() {
				dojo.addClass(this.asLoadingNode, "lotusHidden");
			}), 10);				
		}			
		else{
			dojo.addClass(this.asLoadingNode, "lotusHidden");
		}
	},
	
	/**
	 * Recycle the loader, remove and re-add after a short timeout
	 * Ensure that we can recycle when in timeout
	 */
	recycleLoader: function(isMain){
		if(!this.recycling){
			this.removeLoader();	
			this.recycling = true;
			//timeout very shortly to allow indication of change of filters while loader is still in view.
			window.setTimeout(dojo.hitch(this, function() {
				this.recycling = false;		
				this.displayLoader(isMain);			
			}), 10);					
		}
	}
});
