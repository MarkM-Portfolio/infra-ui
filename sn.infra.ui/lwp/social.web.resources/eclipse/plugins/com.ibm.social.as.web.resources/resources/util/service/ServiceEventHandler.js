/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.as.util.service.ServiceEventHandler");

dojo.require("com.ibm.social.as.util.GadgetHelper");
dojo.require("com.ibm.social.as.util.service.DojoServiceEventHandler");
dojo.require("com.ibm.social.as.util.service.OSServiceEventHandler");

/**
 * Class that handles all service/event communication from external objects to
 * the Activity Stream dijit. We use OpenSocial's gadget RPC object when it is
 * available. Otherwise we use dojo events. RPC is needed because it allows
 * communication between iFrame and main window. In this case it's used for
 * container -> gadget talk. The register, call and unregister functions each
 * take a param called 'isService'. This should be true when you want to 
 * communicate from gadget to container or vice versa.
 * @author Robert Campion
 */

dojo.declare("com.ibm.social.as.util.service.ServiceEventHandler", 
[com.ibm.social.as.util.GadgetHelper],
{
	// The id of the gadget you want to target with calls.
	gadgetTargetId: "",
	
	constructor: function(){
		// If the gadgets.rpc API is available
		if(this.isGadgetRpcAvailable()){
			// Use the OpenSocial service handler
			dojo.mixin(this, com.ibm.social.as.util.service.OSServiceEventHandler);
		}else{
			// Just use Dojo's event handler
			dojo.mixin(this, com.ibm.social.as.util.service.DojoServiceEventHandler);
		}
	}
});
