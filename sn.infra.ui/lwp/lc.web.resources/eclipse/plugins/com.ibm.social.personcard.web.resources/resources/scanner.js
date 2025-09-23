/* Copyright IBM Corp. 2011, 2015  All Rights Reserved.              */

(function() {
	/**
	 * Simple scanner class to ensure that people links are enabled for live names.  Requires
	 * that the link references an OSLC provider, or that a provider has been registered with
	 * com.ibm.oneui.controls.ResourceLink that will initialize the link.
	 * 
	 * Provided as an example of a drop in replacement for the Lotus Connections 3.0 person card.
	 * May require additional functionality in more complicated integration scenarios.
	 */
	dojo.provide("com.ibm.social.personcard.scanner");
	dojo.require("com.ibm.oneui.controls.ResourceLink");
	
	var testableNodes = {
		a: 1,
		A: 1,
		img: 1,
		IMG: 1
		/*span: 1,
		SPAN: 1*/
	}
	
	dojo.addOnLoad(function() {
		dojo.connect(document.body, "onmouseover", function(e) {
			var target = e.target;
			if (!testableNodes[target.nodeName] || target._scanned)
				return;
			target._scanned = true;
			if (dojo.hasClass(target, "lotusPerson")) {
				var w = add(target);
				w.popup._hover(e);
				return;
			}
			var parent = target.parentNode;
			if (parent && dojo.hasClass(parent, "lotusPerson")) {
				parent._scanned = true;
				var w = add(parent);
				w.popup._hover(e);
			}
		});
	});
	
	function scan(target, e) {	
	}
	
	function add(el) {
		return new com.ibm.oneui.controls.ResourceLink({}, el);
	}
	
	window["SemTagSvc"] = {
		onTagChanged: add
	}
})();
