/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.item.type.interfaces.ITransform");

dojo.require("com.ibm.social.as.item.type.interfaces.IType");

/**
 * Transform interface that all transforms should subclass.
 * 
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.item.type.interfaces.ITransform", 
[com.ibm.social.as.item.type.interfaces.IType],
{
	/**
	 * Override so that the transform function is always called.
	 * @param newsData {Object} see NewsDataAccessor.
	 * @returns {Boolean} false, always.
	 */
	isOfType: function(newsData){
		this.transform(newsData);
		return false;
	}
});
