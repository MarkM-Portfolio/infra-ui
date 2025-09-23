/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide('com.ibm.lconn.gadget.services.set_title');

dojo.require('com.ibm.lconn.gadget.container.Topics');
dojo.require('com.ibm.lconn.gadget.util.trace');

com.ibm.lconn.gadget.services.set_title = 
	(function(trace_) {
		/* API to export */
		var api_ = {};


		api_.registerService = function(container) {		
			container.rpcRegister("set_title", function(rpcArgs, title){
				var titleElement, ifrElement;

				// for inline gadgets, this will fail. shindig gadget setTitle function needs to use something like
				// gadgets.rpc.call("", "set_title", null, {"mid":__MODULE_ID__})
				// still, __MODULE_ID__ seems to always be 0 in current builds, which does not work
				if(rpcArgs.gs && rpcArgs.gs.id_) {
					var topic = com.ibm.lconn.gadget.container.Topics.getSiteTopic(rpcArgs.gs.id_, com.ibm.lconn.gadget.container.Topics.GadgetWindow.SITE_TOPIC_SET_TITLE);
					dojo.publish(topic, [title]);
					ifrElement = document.getElementById(rpcArgs.gs.id_);
					if(ifrElement.title) {
						ifrElement.title = title;
					}
				}
				else {
					trace_.log("looks like you're trying to set the title on an inline gadget, you need to use a better rpc call");
					trace_.log("try gadgets.rpc.call('', 'set_title', null, {'mid':__MODULE_ID__})");
				}
				// we cannot change the iframe>html>head>title element due to XSS, the gadget side function should perform this action.
			});

		};

		return api_;

	})(com.ibm.lconn.gadget.util.trace);
