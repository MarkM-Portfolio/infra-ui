/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2015                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

dojo.provide("com.ibm.social.ee.EventRegistry");

(function () {
   var registry = { };
   var defaultClass = "";
   dojo.mixin(com.ibm.social.ee.EventRegistry, { 
      setDefault: function (className) {
          defaultClass = className;
      },
      register: function(event, className) {
         if (dojo.isArray(event))
            dojo.forEach(event, function(e) { registry[e] = className; });
         else 
            registry[event] = className;
      },
      getClass: function (eventName) {
         return registry[eventName] || defaultClass;
      }
   });   
})();