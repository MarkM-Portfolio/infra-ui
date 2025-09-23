define([
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/string",
	"ic-ee/config",
	"ic-incontext/util/text"
], function (array, declare, windowModule, domConstruct, string, config, text) {

	/* ***************************************************************** */
	/*                                                                   */
	/* IBM Confidential                                                  */
	/*                                                                   */
	/* OCO Source Materials                                              */
	/*                                                                   */
	/* Copyright IBM Corp. 2011, 2013                                    */
	/*                                                                   */
	/* The source code for this program is not published or otherwise    */
	/* divested of its trade secrets, irrespective of what has been      */
	/* deposited with the U.S. Copyright Office.                         */
	/*                                                                   */
	/* ***************************************************************** */
	
	var _TagsMixin = declare("com.ibm.social.ee.gadget._TagsMixin", null, {
	   // Must be implemented by subclass
	   getTags: function() {},
	   getTagsContainer: function() { return this.getTagsNode(); },
	   getTagsNode: function() {},
	
	   initializeTags: function () {
	      var tags = this.getTags(), d = windowModule.doc, scope = this, span, 
	          ctnr = this.getTagsContainer(),
	          node = this.getTagsNode(),
	          maxNum = config.gadgetParams.maxTags;
	      if(tags.length > 0) {
	         var self = this;
	         array.every(tags, function(tag, i){
	            if (i < maxNum) {
	               span = domConstruct.create("span", {"role": "listitem", className: "bidiAware", tabindex: "0"}, node);
	               text.breakString(tag, d, span);
	               if((i != (tags.length - 1)) && (i + 1 != maxNum)) {
	                  span = domConstruct.create("span", {"aria-hidden": "true"}, node);
	                  span.appendChild(d.createTextNode(", "));
	               }
	               return true;
	            }
	            else {
	               span = domConstruct.create("span", {}, node);
	               span.appendChild(d.createTextNode(" "));
	               span.appendChild(d.createTextNode(string.substitute(self.nls.common.tags_more, [tags.length - maxNum])));
	               return false;
	            }
	         });
	         ctnr.style.display = "";
	      }      
	   }
	});
	return _TagsMixin;
});