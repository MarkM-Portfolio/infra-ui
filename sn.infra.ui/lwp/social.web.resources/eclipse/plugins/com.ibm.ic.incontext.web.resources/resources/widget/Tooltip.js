/* Copyright IBM Corp. 2009, 2015  All Rights Reserved.              */

define([
	"dijit/Tooltip", "dojo/dom-attr", "dojo/domReady!"
], function (Tooltip, domAttr) {
	
	var ICTooltip = declare("com.ibm.social.incontext.widget.Tooltip", Tooltip, {
		postCreate: function(){
			this.inherited(arguments);
		},
		
		_setStateAttr: function(val){
			this.inherited(arguments);
			
			// tooltip role attribute should not be 'alert' 
			this._initMaster();
		},
		
		/**
		 * All dijit Tooltip instances share a master tooltip singleton.
		 * The singleton is only added to the DOM when the first tooltip is shown. 
		 * We have to remove the role attribute from the master when this happens.
		 * We then mark the class static _inited flag so we are not always checking the DOM.
		 */
		_initMaster: function(){
			
			// if we already removed, return
			if(ICTooltip._inited){
				return;
			}
			
			// dijit master tooltip
			var masterTooltip = Tooltip._masterTT;
			
			if(masterTooltip){
				var node = masterTooltip.containerNode;
				if(node){
					domAttr.remove(node, "role");	
					// mark inited on the class var
					ICTooltip._inited = true;
				}
			}
		}
	});
	
	return ICTooltip;
});