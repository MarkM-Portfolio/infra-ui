/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.GadgetHelper");

/**
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.util.GadgetHelper", null,
{
	// Is the gadget API available on this page.
	isGadget: false,
	
	// Are the gadget IO APIs available
	isGadgetIO: false,
	
	// Is gadget RPC available
	isGadgetRpc: false,
	
	constructor: function(options){
		// If that gadgets object is available
		this.isGadget = (window.gadgets && options && options.isGadget) ? true : false;
		
		if(this.isGadget){
			this.isGadgetIO = (window.gadgets.io) ? true : false;
			//this.isGadgetRpc = (window.gadgets.rpc) ? true : false;
		}
	},
	
	/**
	 * Is the gadget API with rpc features available.
	 * @returns {Boolean} true if they are, else false.
	 */
	isGadgetRpcAvailable: function(){
		return this.isGadgetRpc;
	},
	
	/**
	 * Is the gadget API with io features available.
	 * @returns {Boolean} true if they are, else false.
	 */
	isGadgetIOAvailable: function(){
		return this.isGadgetIO;
	}
});
