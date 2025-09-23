/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/lang",
		"dojo/cookie",
		"ic-core/config/properties"
	], function (dojo, lang, cookie, properties) {
	
		/**
		 * Simple singleton object to store information about features being switched
		 * on or off. Pattern is to define a feature via createFeature and a helper
		 * function to determine it's setting via cookie or LCC.xml
		 * 
		 * LCC.xml generic property matching 'featureName' must be set to true
		 * Existence of a cookie is sufficient to enable feature.
		 * 
		 * 
		 * @author scrawford
		 */
		(function(){
			/**stream
			 * name - feature name usually starting com.ibm.social.as.<featureName>
			 * offByDefault - true|false, is this feature switched off by default or not.
			 */
			function createFeature(name, offByDefault){
				return {"featureName": name, "offByDefault": offByDefault};
			};
			
			lang.setObject("com.ibm.social.as.config.enablement", 
			{		
				AS_HASHTAG_SEARCH: createFeature("com.ibm.social.as.hashtagSearchEnabled", true),
				AS_COMMENT_FILE_ATTACH: createFeature("com.ibm.social.as.attachmentCommentEnabled", true),
				AS_COMMENT_FILE_ATTACH_ATT: createFeature("com.ibm.connections.ublog.attachmentCommentEnabled", true),
				AS_SHARED_EXTERNALLY: createFeature("com.ibm.social.as.sharedExternallyEnabled", false),
		        AS_VIDEO_PREVIEW: createFeature("com.ibm.social.as.videoPreviewEnabled", false),
				
				checkEnablement: function(feature){
					var enabled = true;
					if(feature.offByDefault){
						enabled = (properties[feature.featureName]==="true"
							|| properties[feature.featureName]==="enabled"
							|| !!cookie(feature.featureName));			
					}
					return enabled;
				}				
			}
			);
		})();
		return com.ibm.social.as.config.enablement;
	});
