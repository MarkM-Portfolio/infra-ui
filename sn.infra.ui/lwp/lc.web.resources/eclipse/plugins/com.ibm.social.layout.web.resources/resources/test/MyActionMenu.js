/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

dojo.provide("com.ibm.social.layout.test.MyActionMenu");

dojo.require("com.ibm.social.layout.Action");

dojo.declare("com.ibm.social.layout.test.MyActionMenu", [com.ibm.social.layout.Action], {
   name: "Menu",
   hasChildren: true,
   tooltip: "I am an example menu",
   msg: "Executing menu!",
   execute: function(selection, context) {
      alert(this.msg);
   }
});
