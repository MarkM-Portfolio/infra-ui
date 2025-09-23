define([
	"dojo",
	"dojo/_base/declare",
	"dojo/_base/window",
	"dojo/dom-construct"
], function (dojo, declare, windowModule, domConstruct) {

	/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */
	
	(function() {
			
		/**
		 * Augments the mixed-in class with a {@link #setErrors} method that knows how to render OneUI form errors.
		 * @mixin ic-ui.FormErrors
		 * @author Clayton Coleman <claycole@us.ibm.com>
		 */
		var FormErrors = declare("com.ibm.oneui.FormErrors", null, /** @lends ic-ui.FormErrors.prototype */ {
			setErrors: function(errors) {
				var node = this.errorsNode;
				if (!node)
					node = this.errorsNode = domConstruct.place("<div class=\"lotusFormErrorSummary\" style=\"display:none;\"><div class=\"lotusFormError\"></div></div>", this.domNode, "first");
				else
					domConstruct.empty(node.firstChild);
				if (!errors) {
					node.style.display = "none";
					return;
				}
				if (errors.length > 1)
					throw "Not yet implemented";
				var error = errors[0];
				node.firstChild.appendChild(windowModule.doc.createTextNode(error.message));
				node.style.display = "";
			}
		});
	})();
	return FormErrors;
});
