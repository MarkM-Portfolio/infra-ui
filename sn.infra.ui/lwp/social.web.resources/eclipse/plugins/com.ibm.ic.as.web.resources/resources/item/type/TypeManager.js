/* Copyright IBM Corp. 2012, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/item/type/types"
	], function (declare, lang, types) {
	
		/**
		 * Manages the types and exposes function that let you retrieve appropriate
		 * news item types.
		 * 
		 * @author Robert Campion
		 */
		
		var TypeManager = declare("com.ibm.social.as.item.type.TypeManager", null,
		{
			// Array definition of all the IType class names. Using both an
			// array and an object because arrays give us ordering, while
			// objects allow us to store classes for later.
			typesArr: types,
			
			// Object associate array of the syntax:
			// 	{
			// 		"className": objectCreated
			//  }
			typesObj: null,
			
			/**
			 * Build up the typesObj with real reusable objects.
			 */
			constructor: function(){
				this.typesObj = {};
				var typesArr = this.typesArr;
				
				// Populate the typesObj with concrete type objects
				for(var t = 0; t < typesArr.length; t++){
					var type = typesArr[t];
					
					try{
						// Create the type object based on the type class
						var typeCls = lang.getObject(type);
						// Define a property on the typesObj referencing the new type object.
						this.typesObj[type] = new typeCls();
					}catch(e){
						console.error("TypeManager - Error found creating class " + type + ": %o", e);
					}
				}
			},
			
			/**
			 * Get the type of news item that should be used to display newsData.
			 * @param newsData
			 * @returns {String}
			 */
			getType: function(newsData){
				var typesArr = this.typesArr;
				
				for(var t = 0; t < typesArr.length; t++){
					var typeObj = this.typesObj[typesArr[t]];
					
					// Run the news data through the isOfType function.
					// This will read the properties of the data and return true
					// if it represents an object of its type.
					if(typeObj && typeObj.isOfType && typeObj.isOfType(newsData)){
						return typeObj.getType();
					}
				}
				
				return null;
			}
		});
		
		return TypeManager;
	});
