/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/text!ic-as/loading/templates/loader.html",
		"dijit/_Templated",
		"dijit/_Widget",
		"ic-as/util/Localizer"
	], function (declare, lang, domClass, domConstruct, template, _Templated, _Widget, Localizer) {
	
		/**
		 * Dijit for displaying the Loading indicator for Activity Stream
		 * 
		 * @author scrawford
		 */
		
		var Loader = declare("com.ibm.social.as.loading.Loader", 
		[_Widget, _Templated,
		 Localizer], {
			
			//style class for loader paging section
			styleLoaderPaging: "loaderPaging",
			
			//style class for loader main section
			styleLoaderMain: "loaderMain",
			
			// Path to the template HTML
			templateString: template,
			
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
					domConstruct.place(this.domNode, this.loaderAttachNode);
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
						domClass.add(this.asLoadingNode, this.styleLoaderPaging);	
					}
					else{
						domClass.remove(this.asLoadingNode, this.styleLoaderPaging);
					}
					domClass.remove(this.asLoadingNode, "lotusHidden");
				}
			},
		
			/**
			 * Remove the loader from view - if called while in recycle timeout
			 * add short timeout so that it picks up after recycle finishes.
			 */
			removeLoader: function(){
				if(this.recycling){
					window.setTimeout(lang.hitch(this, function() {
						domClass.add(this.asLoadingNode, "lotusHidden");
					}), 10);				
				}			
				else{
					domClass.add(this.asLoadingNode, "lotusHidden");
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
					window.setTimeout(lang.hitch(this, function() {
						this.recycling = false;		
						this.displayLoader(isMain);			
					}), 10);					
				}
			}
		});
		
		return Loader;
	});
