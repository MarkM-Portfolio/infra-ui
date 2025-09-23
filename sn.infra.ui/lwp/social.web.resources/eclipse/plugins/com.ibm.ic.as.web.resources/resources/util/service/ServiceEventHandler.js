/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

	define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"ic-as/util/GadgetHelper",
		"ic-as/util/service/DojoServiceEventHandler",
		"ic-as/util/service/OSServiceEventHandler"
	], function (declare, lang, GadgetHelper, DojoServiceEventHandler, OSServiceEventHandler) {
	
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
		
		var ServiceEventHandler = declare("com.ibm.social.as.util.service.ServiceEventHandler", 
		GadgetHelper,
		{
			// The id of the gadget you want to target with calls.
			gadgetTargetId: "",
			
			constructor: function(){
				// If the gadgets.rpc API is available
				if(this.isGadgetRpcAvailable()){
					// Use the OpenSocial service handler
					lang.mixin(this, OSServiceEventHandler);
				}else{
					// Just use Dojo's event handler
					lang.mixin(this, DojoServiceEventHandler);
				}
			}
		});
		return ServiceEventHandler;
	});
