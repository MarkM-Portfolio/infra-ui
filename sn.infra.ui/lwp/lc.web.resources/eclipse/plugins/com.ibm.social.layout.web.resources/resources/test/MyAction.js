/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.test.MyAction");

dojo.require("com.ibm.social.layout.Action");

dojo.declare("com.ibm.social.layout.test.MyAction", [com.ibm.social.layout.Action], {
   name: "Example",
   tooltip: "I am an example action",
   msg: "Executing!",
   
   constructor: function(opts) {
      dojo.mixin(this, opts);
   },
   execute: function(selection, context) {
      alert(this.msg);
   }
});

dojo.declare("com.ibm.social.layout.test.MyActionWithError", [com.ibm.social.layout.test.MyAction], {
   name: "Error",
   execute: function(){
      throw "I threw an error!";
   }
});
dojo.declare("com.ibm.social.layout.test.MyActionEnabledForOne", [com.ibm.social.layout.test.MyAction], {
   enabledFor: [1,1],
   name: "EnabledForOne"
});
dojo.declare("com.ibm.social.layout.test.MyActionEnabledForMany", [com.ibm.social.layout.test.MyAction], {
   enabledFor: [1,"*"],
   name: "EnabledForMany"
});
dojo.declare("com.ibm.social.layout.test.MyActionVisibleForOne", [com.ibm.social.layout.test.MyAction], {
   visibleFor: [1,1],
   name: "VisibleForOne"
});
dojo.declare("com.ibm.social.layout.test.MyActionVisibleForMany", [com.ibm.social.layout.test.MyAction], {
   visibleFor: [1,"*"],
   name: "VisibleForMany"
});
