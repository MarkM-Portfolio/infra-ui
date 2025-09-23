/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/string"
	], function (declare, string) {
	
		/**
		 * Factory Interface. Extend this interface to create a news item factory
		 * for your Activity Stream. Do not initialize on its own.
		 */
		
		// NOTE: Had to use 'interfaces' instead of 'interface' because the latter is 
		// a reserved word in JavaScript and was causing problems
		var INewsItemFactory = declare("com.ibm.social.as.item.manager.interfaces.INewsItemFactory", null,
		{
			createTypeNewsItem: "create${0}NewsItem",
			
			/**
			 * Create and return a news item based on the type.
			 * @param type (String) - the type of news item that should be created.
			 * @param props (Object) - properties with which to create the news item.
			 * @param domNode (Node) - node to attach the news item to. 
			 * @return a news item
			 */
			createNewsItem: function(type, props, domNode){
				// Get the function name
				var functionName = string.substitute(this.createTypeNewsItem, [type]);
				
				// Will call into a different function based on the type of news item
				if(this[functionName]){
					return new this[functionName](props, domNode);
				}else{
					throw new Error("A create function does not exist for this type: " + type);
				}
			}
			
			/**
			 * Example create news item function.
			 * @param props (Object) - properties to create news item with 
			 * @param domNode (Node) - Node that the news item will attach to.
			 * @returns a news item
			 
			createNormalNewsItem: function(props, domNode){
				return new com.ibm.social.as.item.NewsItem(props, domNode);
			}
			
			 */
		});
		
		return INewsItemFactory;
	});
