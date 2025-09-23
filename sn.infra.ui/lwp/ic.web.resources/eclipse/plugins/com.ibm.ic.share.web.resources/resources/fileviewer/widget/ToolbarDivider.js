/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dijit/_WidgetBase",
   "dijit/_TemplatedMixin",
   "dojo/text!./templates/ToolbarDivider.html",
   "../config/globals"
], function (declare, _WidgetBase, _TemplatedMixin, template, globals) {

   var ToolbarDivider = declare([_WidgetBase, _TemplatedMixin], {
     templateString: template,

     set: function (key) {
        if (key !== "parentNode") {
           this.inherited(arguments);
        }
     }
   });

   return {
     isSubItem: false,
     isSticky: true,
     realAction: false,

     create: function (args) {
       return new ToolbarDivider(args);
     },

     isValid: function (file) {
        if (globals.isPanels(file)) {
           return true;
        } else {
           return false;
        }
     },

     getClassName: function () {
       return "divider";
     }
   };
});
