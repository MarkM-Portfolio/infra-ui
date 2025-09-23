/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
      "dojo",
      "dojo/_base/lang"
], function(dojo, lang) {

   return lang.mixin(lang.getObject("com.ibm.lconn.layout.community", true), {
      get : function(community) {
         var dfd = new dojo.Deferred();
         setTimeout(lang.hitch(dfd, "callback", lang.mixin({
            name : "Deferred name"
         }, community)), 1000);
         dfd.addCallback(function(value) {
            com.ibm.lconn.layout.page.data.community = value;
         });
         return dfd;
      },
      updateLocation : function(node) {
         var community = com.ibm.lconn.layout.page.data.community;
         node.label = community.name;
         return node;
      }
   });
});
