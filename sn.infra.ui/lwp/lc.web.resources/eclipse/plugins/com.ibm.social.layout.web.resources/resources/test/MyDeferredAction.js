/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.test.MyDeferredAction");

dojo.require("com.ibm.social.layout.test.MyAction");

dojo.declare("com.ibm.social.layout.test.MyDeferredAction", [com.ibm.social.layout.test.MyAction], {
   name: "Example (loaded)",
   msg: "Executing deferred action!"
});


dojo.declare("com.ibm.social.layout.test.MyDeferredActionWithError", [com.ibm.social.layout.test.MyAction], {
   name: "Error (loaded)",
   execute: function(){
      throw "I threw an error!";
   }
});
dojo.declare("com.ibm.social.layout.test.MyDeferredActionEnabledForOne", [com.ibm.social.layout.test.MyAction], {
   enabledFor: [1,1],
   name: "EnabledForOne (loaded)"
});
dojo.declare("com.ibm.social.layout.test.MyDeferredActionEnabledForMany", [com.ibm.social.layout.test.MyAction], {
   enabledFor: [1,"*"],
   name: "EnabledForMany (loaded)"
});
dojo.declare("com.ibm.social.layout.test.MyDeferredActionVisibleForOne", [com.ibm.social.layout.test.MyAction], {
   visibleFor: [1,1],
   name: "VisibleForOne (loaded)"
});
dojo.declare("com.ibm.social.layout.test.MyDeferredActionVisibleForMany", [com.ibm.social.layout.test.MyAction], {
   visibleFor: [1,"*"],
   name: "VisibleForMany (loaded)"
});
