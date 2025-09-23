/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo/_base/lang",
      "dojo/topic",
      "../container/Topics",
      "../util/trace"
], function(lang, topic, Topics, trace) {

   /* API to export */
   var api_ = lang.getObject("com.ibm.lconn.gadget.services.set_title", true);

   api_.registerService = function(container) {
      container.rpcRegister("set_title", function(rpcArgs, title) {
         var titleElement, ifrElement;

         // for inline gadgets, this will fail. shindig gadget setTitle
         // function needs to use something like
         // gadgets.rpc.call("", "set_title", null, {"mid":__MODULE_ID__})
         // still, __MODULE_ID__ seems to always be 0 in current builds,
         // which does not work
         if (rpcArgs.gs && rpcArgs.gs.id_) {
            var siteTopic = Topics.getSiteTopic(rpcArgs.gs.id_, Topics.GadgetWindow.SITE_TOPIC_SET_TITLE);
            topic.publish(siteTopic, title);
            ifrElement = document.getElementById(rpcArgs.gs.id_);
            if (ifrElement.title) {
               ifrElement.title = title;
            }
         }
         else {
            trace.log("looks like you're trying to set the title on an inline gadget, you need to use a better rpc call");
            trace.log("try gadgets.rpc.call('', 'set_title', null, {'mid':__MODULE_ID__})");
         }
         // we cannot change the iframe>html>head>title element due to XSS,
         // the gadget side function should perform this action.
      });

   };

   return api_;
});
