/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/lang",
		"ic-as/constants/events"
	], function (lang, events) {
	
		/**
		 * Utility helper for working with the configuration object.
		 * @author Robert Campion
		 */
		
		lang.setObject("com.ibm.social.as.util.ConfigObjectUtil", 
		{
			/**
			 * Get an option from a associative array object (options)
			 * based on the id of that object.
			 * @param options
			 * @param optionId
			 * @returns
			 */
			getOptionById: function(options, optionId){
				return {
					item: options[optionId],
					id: optionId
				};
			},
			
			getNumRealOptions: function(options){
				var num = 0;
				this.forEachRealOptionKey(options, function(){
					num++;
					});
				return num;
			},
			forEachRealOptionKey: function(options, func, optThis){
				for(var key in options) {
					if(key !== "all" ) {
						func.call(optThis, key);
					}
				}
			},
			
			
			/**
			 * Get an option that is selected in the associative array
			 * of objects (filters.options).
			 * @param filters
			 * @returns
			 */
			getSelectedOption: function(filters){
				if(filters.selectedItem && filters.options[filters.selectedItem]) {
					return filters.selectedItem;
				} else {
					if(filters.selectedItem) {
						this.triggerRefreshInNextTick();
					}
					return false;
				}
			},
			
			triggerRefreshInNextTick: function(){
				// there was previously an item selected, or set as default but it was somehow removed
				// trigger a refresh after this call stack is cleared
				window.setTimeout(lang.hitch(dojo, "publish", events.UPDATESTATE, [[]]), 0);
			},
			
			/**
			 * Gets the default option of an object.
			 * if a default option has been set *and* is present, return that
			 * otherwise find the first option, set that to default, and return it.
			 * will trigger a refresh if a default was set, but is no longer present.
			 * @param options
			 * @returns - object within options.
			 */
			getDefaultOption: function(filters){
				if(filters.defaultItem && filters.options[filters.defaultItem]) {
					return filters.defaultItem;
				} else {
					for(var o in filters.options){
						if(filters.defaultItem) {
							this.triggerRefreshInNextTick();
						}
						filters.defaultItem = o;
						return o;
					}
				}
			},
			
			/**
			 * Tries to get the selected option, but if that fails
			 * it gets the first option available.
			 * @param options
			 * @returns
			 */
			getSelectedOrDefaultOptionKey: function(filters){
				var option = this.getSelectedOption(filters);
				 
				// If there is no selected option
				if(!option){
					// Just get the first option
					option = this.getDefaultOption(filters);
					// and select it for later
					filters.selectedItem = option;
				}
				
				return option;
			},
			
			/**
			 * Tries to get the selected option, but if that fails
			 * it gets the first option available.
			 * @param options
			 * @returns
			 */
			getSelectedOrDefaultOptionObj: function(filters){
				return filters.options[this.getSelectedOrDefaultOptionKey(filters)];
			}
		});
		return com.ibm.social.as.util.ConfigObjectUtil;
	});
