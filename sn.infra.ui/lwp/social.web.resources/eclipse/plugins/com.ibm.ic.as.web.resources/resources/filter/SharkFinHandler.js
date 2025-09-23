/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

	define([
		"dojo",
		"dojo/_base/declare",
		"dojo/dom-geometry",
		"dojo/dom-style",
		"dojo/text!ic-as/filter/templates/filterList.html"
	], function (dojo, declare, domGeometry, domStyle, template) {
	
		(function(){
		var SharkFinHandler = declare("com.ibm.social.as.filter.SharkFinHandler", null,
		{
			templateString: template,
			
			// The currently selected node
			selectedNode: null,
			
			sharkFinNode: null,
			
			setSelectedNode: function(node){
				this.selectedNode = node;
			},
			
			getSelectedNode: function(){
				return this.selectedNode;
			},
			
			setSharkFinNode: function(node){
				this.sharkFinNode = node;
			},
			
			updateSharkFin: function(node){		
				var posParent = domGeometry.position(this.sharkFinNode.parentNode);
				var pos = domGeometry.position(node);
				
				if (!(domGeometry._isBodyLtr())) {
					var rightEnd = posParent.x + posParent.w;
					domStyle.set(this.sharkFinNode, "left", ( 1000 - (rightEnd - pos.x) + (pos.w / 2) + 10 )+ "px");
				}else{
					domStyle.set(this.sharkFinNode, "left", (-1000 + (pos.x - posParent.x) +  (pos.w / 2) - 10 )+ "px");	
				}
				
			}
			
		});
		
		com.ibm.social.as.filter.SharkFinHandler.getInstance = function(opts) {
			   if(!com.ibm.social.as.filter.SharkFinHandler._instance)
				   com.ibm.social.as.filter.SharkFinHandler._instance = new com.ibm.social.as.filter.SharkFinHandler();
			   return com.ibm.social.as.filter.SharkFinHandler._instance;
			}
		
		})();
		return SharkFinHandler;
	});
