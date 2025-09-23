define([
	"dojo/_base/array",
	"dojo/_base/lang"
], function (array, lang) {

	(function () {
	   var registry = { };
	   var defaultClass = "";
	   lang.mixin(com.ibm.social.ee.EventRegistry, { 
	      setDefault: function (className) {
	          defaultClass = className;
	      },
	      register: function(event, className) {
	         if (lang.isArray(event))
	            array.forEach(event, function(e) { registry[e] = className; });
	         else 
	            registry[event] = className;
	      },
	      getClass: function (eventName) {
	         return registry[eventName] || defaultClass;
	      }
	   });   
	})();
	return com.ibm.social.ee.EventRegistry;
});