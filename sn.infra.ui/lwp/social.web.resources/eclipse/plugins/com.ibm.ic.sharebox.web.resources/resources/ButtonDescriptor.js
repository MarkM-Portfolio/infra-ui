/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

define([
	"dojo/_base/declare"
], function (declare) {

	var ButtonDescriptor = declare("com.ibm.social.sharebox.ButtonDescriptor", null, {
	   
	   constructor: function(opts) {
	     // var nls = nls.SHAREBOX;
	      this.id = opts.id || null;
	      this.label = opts.label || null;
	      this.a11y = opts.a11y || null;
	      this.tooltip = opts.tooltip || null;
	      this.handle = opts.handle || null;
	   },
	   getButton: function() {
	      return {
	         id: this.id,
	         label: this.label,
	         a11y: this.a11y,
	         tooltip: this.tooltip,
	         handle: this.handle
	      };
	   }
	   
	
	});
	
	return ButtonDescriptor;
});
