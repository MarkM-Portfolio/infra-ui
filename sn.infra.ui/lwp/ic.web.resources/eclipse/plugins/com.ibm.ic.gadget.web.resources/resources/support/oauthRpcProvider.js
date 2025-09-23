/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([
	"ic-core/config",
	"ic-core/config/services",
	"ic-core/util/LCDeferred",
	"ic-core/util/amdLoader"
], function (config, services, LCDeferred, amdLoader) {

	
	com.ibm.lconn.gadget.support.oauthRpcProvider = function(){
		var scriptUrl = services['opensocial']["secureUrl"] + 
				"/gadgets/js/core:opensocial:rpc:shindig.uri:cre.services.oauth.provider.js?container=default&nocache=0&debug=1&c=0&_ic_versionStamp=" + 
				config.versionStamp;
		var providerAPI = new LCDeferred();
		
		amdLoader.require(
		  [scriptUrl],
		  function() {
		    gadgets.config.init({'container':{'relayPath':'/FIX_ME/connections/opensocial/gadgets/files/container/rpc_relay.html',
				'enableRpcArbitration':false},'rpc':{'passReferrer':'c2p:query','rpcDelay':1,'useLegacyProtocol':false,'parentRelayUrl':
				'*'},'opensocial':{'invalidatePath':'https://%host%/connections/opensocial/rpc',
				'domain':'shindig','path':'https://%host%/connections/opensocial/rpc','supportedFields':{},'enableCaja':false}});
		  	providerAPI.resolve();
		  },
		  function(error) {
		  	providerAPI.errback(error);
		  }
		);
		
		return providerAPI;
	};
	return com.ibm.lconn.gadget.support.oauthRpcProvider;
});
