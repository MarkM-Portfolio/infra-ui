/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.config.ActivityStreamConfigProcessor");

/**
 * Skeleton class that can be overridden by customers to process/modify
 * the ActivityStream config before it is used
 * @author Brian O'Gorman
 */

com.ibm.social.as.config.ActivityStreamConfigProcessor = {
	processConfig: function(cfg) {
		// do nothing in skeleton implementation
		return cfg;
	}
};
