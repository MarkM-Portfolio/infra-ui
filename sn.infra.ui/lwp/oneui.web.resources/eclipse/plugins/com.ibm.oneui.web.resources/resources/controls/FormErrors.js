/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	dojo.provide("com.ibm.oneui.controls.FormErrors");
	
	/**
	 * Augments the mixed-in class with a {@link #setErrors} method that knows how to render OneUI form errors.
	 * @mixin com.ibm.oneui.controls.FormErrors
	 * @author Clayton Coleman <claycole@us.ibm.com>
	 */
	dojo.declare("com.ibm.oneui.controls.FormErrors", null, /** @lends com.ibm.oneui.controls.FormErrors.prototype */ {
		setErrors: function(errors) {
			var node = this.errorsNode;
			if (!node)
				node = this.errorsNode = dojo.place("<div class=\"lotusFormErrorSummary\" style=\"display:none;\"><div class=\"lotusFormError\"></div></div>", this.domNode, "first");
			else
				dojo.empty(node.firstChild);
			if (!errors) {
				node.style.display = "none";
				return;
			}
			if (errors.length > 1)
				throw "Not yet implemented";
			var error = errors[0];
			node.firstChild.appendChild(dojo.doc.createTextNode(error.message));
			node.style.display = "";
		}
	});
})();
