/* Copyright IBM Corp. 2008, 2015  All Rights Reserved.              */

define([
      "dojo/_base/declare",
      "../enabler/debug"
], function(declare, debug) {

   var widgets = declare("tagservices.widgets", null, {
      processTag : function(tag) {
         debug.entry("tagservices.widgets.processTag", "Tag:" + tag);
         debug.log("tagservices.widgets.processTag", "widgets:process IWidget");
         var iWidget = iWidgetContainer.createWidget(tag);
         if (iWidget)
            iWidgetContainer.renderWidget(iWidget);
      }
   });

   return widgets;
});
