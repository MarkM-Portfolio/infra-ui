/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin"
], function (declare, _WidgetBase, _TemplatedMixin) {
  "use strict";

  return declare([_WidgetBase, _TemplatedMixin], {
    
    templateString: "<div></div>",
    
    constructor: function (args){
      this.templateString = args.template || this.templateString;
    },
    
    showError: function () {},
    
    clickLink: function (e) {}
    
  });
});
