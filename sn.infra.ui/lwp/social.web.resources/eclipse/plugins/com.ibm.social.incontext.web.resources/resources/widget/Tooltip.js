/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2009, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide('com.ibm.social.incontext.widget.Tooltip');
dojo.require("dijit.Tooltip");

/**
 * A tooltip for Connections, it extends the dojo Tooltip, but we can use this class to customize it and lock common properties as we wish.
 * All Connections tooltips should use this class for reuse and modularity.
 * 
 * @author Marco Vicente
 */
dojo.declare("com.ibm.social.incontext.widget.Tooltip", [dijit.Tooltip], {

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
		if(com.ibm.social.incontext.widget.Tooltip._inited){
			return;
		}
		
		// dijit master tooltip
		var masterTooltip = dijit.Tooltip._masterTT;
		
		if(masterTooltip){
			var node = masterTooltip.containerNode;
			if(node){
				dojo.removeAttr(node, "role");	
				// mark inited on the class var
				com.ibm.social.incontext.widget.Tooltip._inited = true;
			}
		}
	}
 
});