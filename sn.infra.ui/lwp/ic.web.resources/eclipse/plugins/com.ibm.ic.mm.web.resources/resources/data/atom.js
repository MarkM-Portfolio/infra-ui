/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "dojox/data/AtomReadStore"
], function(declare, AtomReadStore) {

   /**
    * @author <a href="mailto:litong01@us.ibm.com">Tong Li</a>
    * @class com.ibm.mm.data.xml
    * @name com.ibm.mm.data.xml
    */
   var atom = declare("com.ibm.mm.data.xml", AtomReadStore, {

      getValueType : function( /* Object */item, /* String */attribute) {
      // not implemented yet.
      },

      serialize : function() {
         // not implemented yet.
         return "";
      }
   });

   return atom;
});
