/* Copyright IBM Corp. 2015  All Rights Reserved.                    */
define([], function () {

	var com = com || {};
	com.ibm = com.ibm || {};
	com.ibm.test = com.ibm.test || {};
	
	com.ibm.test.TestProxy = 
	(function () {
		
		var url_ = "http://docs.opensocial.org/download/attachments/425986/global.logo",
			logf_ = console && console.log || function() {};
		
		function TestProxy() {}
		
		TestProxy.prototype.onLoad = function() {
			var iContext = this.iContext;
			var imgUrl = iContext.io.rewriteURI(url_);
			var widgetId = iContext.widgetId; 
			var placementId = "_" + widgetId + "_placement";
			
			var node = document.getElementById(placementId);
			
			if (!node) {
				alert("Can't find node");
			} else {
				node.innerHTML = "<img src='" + imgUrl + "' alt='Could not load file via proxy'/>"; 
			} 
		};
		
		return TestProxy;
		
	})();
});
