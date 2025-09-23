/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */
dojo.provide("com.ibm.social.as.filter.SharkFinHandler");

(function(){
dojo.declare("com.ibm.social.as.filter.SharkFinHandler", null,
{
	templatePath: dojo.moduleUrl("com.ibm.social.as", "filter/templates/filterList.html"),
	
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
		var posParent = dojo.position(this.sharkFinNode.parentNode);
		var pos = dojo.position(node);
		
		if (!(dojo._isBodyLtr())) {
			var rightEnd = posParent.x + posParent.w;
			dojo.style(this.sharkFinNode, "left", ( 1000 - (rightEnd - pos.x) + (pos.w / 2) + 10 )+ "px" );
		}else{
			dojo.style(this.sharkFinNode, "left", (-1000 + (pos.x - posParent.x) +  (pos.w / 2) - 10 )+ "px" );	
		}
		
	}
	
});

com.ibm.social.as.filter.SharkFinHandler.getInstance = function(opts) {
	   if(!com.ibm.social.as.filter.SharkFinHandler._instance)
		   com.ibm.social.as.filter.SharkFinHandler._instance = new com.ibm.social.as.filter.SharkFinHandler();
	   return com.ibm.social.as.filter.SharkFinHandler._instance;
	}

})();
