/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"ic-as/item/type/interfaces/IType"
	], function (declare, IType) {
	
		/**
		 * Transform interface that all transforms should subclass.
		 * 
		 * @author Robert Campion
		 */
		
		var ITransform = declare("com.ibm.social.as.item.type.interfaces.ITransform", 
		IType,
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
		
		return ITransform;
	});
