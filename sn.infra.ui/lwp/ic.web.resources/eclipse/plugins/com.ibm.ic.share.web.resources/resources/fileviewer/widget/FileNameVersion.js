/* Copyright IBM Corp. 2015  All Rights Reserved.              */

define([
   "dojo/_base/declare",
   "dojo/text!./templates/FileNameVersion.html",
   "../sbw/StatefulBackedTemplatedWidget"
], function (declare, template, StatefulBackedTemplatedWidget) {
   "use strict";
   
   return declare([ StatefulBackedTemplatedWidget ], {
     templateString: template,
     
     postMixInProperties: function () {
        this.model = this.file;
     }
   });
});