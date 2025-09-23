/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.configNormalizer");


/**
 * smooths over some formatting changes made to the config object in July 2014
 * should be removed once all sources and consumers of config use config.filters
 * instead of config.views
 */
dojo.declare("com.ibm.social.as.util.configNormalizer", [], {

	// using a constructor because detecting when the config has been set
	// is tricky. running multiple times will do no harm.
	constructor: function(args){
		// sometimes we're normalizing the global obj, sometimes fixing one passed to the constructor
		var activityStreamConfig = (args && args.configObject) || window.activityStreamConfig;
		
		if(activityStreamConfig.views && !activityStreamConfig.filters) {
			activityStreamConfig.filters = {"options":activityStreamConfig.views};
			

			// =(  we need to recurse into the config and find/set selected things
			function findSelected(holder) {
				var things = holder.options, thing;
				for(var key in things) {
					thing = things[key];
					if(thing.selected) {
						holder.defaultItem = key;
						holder.selectedItem = holder.selectedItem || key; // do no harm
					}
					if(thing.filters) {
						findSelected(thing.filters);
					}
				}
			}
			
			findSelected(activityStreamConfig.filters);
			
		} else if(activityStreamConfig.filters && !activityStreamConfig.views) {
			activityStreamConfig.views = activityStreamConfig.filters.options;
		}
	}
});
