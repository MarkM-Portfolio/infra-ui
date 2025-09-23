/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/dom-class",
		"dojo/i18n!ic-as/nls/activitystream",
		"dojo/query",
		"dojo/text!ic-as/item/comment/templates/sharedExternallyComments.html",
		"dijit/_Templated",
		"dijit/_Widget"
	], function (dojo, declare, lang, domClass, i18nactivitystream, query, template, _Templated, _Widget) {
	
		/**
		 * Widget to show the Shared Externally message block in Comments
		 * 
		 * @author Marco Vicente
		 */
		
		var SharedExternallyComments = declare("com.ibm.social.as.item.comment.SharedExternallyComments", 
				[_Widget, _Templated], {
			
			// show
			toShow:false,
			
			// Resource bundle
			strings: null,
		
		    // default timeout to wait before firing the ARIA alerts
		    DEFAULT_TIMEOUT: 3500,
		
		    // use a timeout to wait before firing the ARIA alerts
		    useTimeout: false,
		
		    // timeout to wait before firing the ARIA alerts
		    timeout: null,
		
		    // warning message
		    warningMessage: null,
		
			// Path to the template HTML
			templateString: template,
			
			postMixInProperties: function(){
				this.inherited(arguments);
				
				// Get the strings bundle
				this.strings = i18nactivitystream;
		
		        // set the warning message
		        this.warningMessage = this.strings.externalUsersCommentsMsg;
		
		        // set default timeout
		        if (this.useTimeout && !this.timeout) {
		            this.timeout = this.DEFAULT_TIMEOUT;
		        }
			},
		
			postCreate: function(){
				
				this.inherited(arguments);
				
				if(this.toShow) {
		            this.show();
		        }
			},
		
			toggleVisibility: function(show){
				
				var alertInnerDiv = query(".lotusWarning", this.domNode)[0]; 
				
				if(show){
					domClass.remove(this.domNode, "lotusHidden");
		
		            // kick aria events a little bit later
		            var fireAriaEvts = lang.hitch(this, function(){
		                alertInnerDiv.setAttribute("role", "alert");
		                alertInnerDiv.setAttribute("live", "polite");
		            });
		
		            if(this.useTimeout) {
		                setTimeout(fireAriaEvts, this.timeout);
		            }
		            else {
		                fireAriaEvts();
		            }
				}
				else {					
					alertInnerDiv.removeAtrribute("role");
		            domClass.add(this.domNode, "lotusHidden");
		            alertInnerDiv.removeAtrribute("live");
				}
		
		
			},
			
			show: function(){
				
				this.toggleVisibility(true);
			},
			
			hide: function(){
				
				this.toggleVisibility(false);
			}
		});
		return SharedExternallyComments;
	});
