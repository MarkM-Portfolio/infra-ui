/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/text!../templates/personNode.html",
   "dijit/_Templated",
   "../_base"
], function (declare, template, _Templated, _base) {

   return declare("com.ibm.oneui.recommend.internal.PersonNode", [_base, _Templated], {
      templateString : template,
      mail : null,
      cn : null,
      dn : null,
      displayName : null
   });
});
   
