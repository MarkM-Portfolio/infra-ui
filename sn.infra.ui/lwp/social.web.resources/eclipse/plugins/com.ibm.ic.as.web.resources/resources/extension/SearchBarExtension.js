/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/constants/events",
		"ic-as/extension/interfaces/IExtension",
		"ic-as/filter/FilterContainer"
	], function (declare, events, IExtension, FilterContainer) {
	
		/**
		 * @author scrawford
		 * 
		 * Simple extension to allow search bar to be switched on/off on a view
		 */
		var SearchBarExtension = declare("com.ibm.social.as.extension.SearchBarExtension", 
		
		IExtension,
		{
			// Reference to the news item class function
			filterContainerClass: null,
			
			// Reference to the NewsItem class's prototype
			filterContainerPrototype: null,
			
			constructor: function(){
				this.filterContainerClass = FilterContainer;
				this.filterContainerPrototype = this.filterContainerClass.prototype;
			},
			
			/**
			 * Called when the AS loads on the page.
			 */
			onLoad: function(){
				as_console_debug("com.ibm.social.as.extension.SearchBarExtension - onLoad");
				this.filterContainerPrototype.setSearchBarEnabled(true);
				topic.publish(events.ENABLESEARCH, true);
			},
			
			/**
			 * Called when the view is moved away from.
			 */
			onUnload: function(){	
				as_console_debug("com.ibm.social.as.extension.SearchBarExtension - onLoad");
				this.filterContainerPrototype.setSearchBarEnabled(false);
				topic.publish(events.ENABLESEARCH, false);
			}	
		});
		return SearchBarExtension;
	});
