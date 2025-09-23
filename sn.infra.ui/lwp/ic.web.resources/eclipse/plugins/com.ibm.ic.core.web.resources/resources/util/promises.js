/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

define([
   "dojo/_base/declare",
   "dojo/_base/lang",
   "ic-core/util/LCDeferred",
   "ic-core/util/LCDeferredList"
], function (declare, lang, LCDeferred, LCDeferredList) {

   /**
    * @class ic-core.util.promises
    */
   var promises = {};

   /**
    * An interface that represents the promise interface contract
    *
    */
   promises.iFaceClass = declare('', null, {
      then : function(){},
      cancel : function(){}
   });

   /**
    * Method to test if a particular object abides to the promises interface.
    *
    * @memberof ic-core.util.promises
    * @name isPromiseLike
    * @function
    * @public
    * @param {Object} The object to check.
    * @returns {Boolean}
    */
   promises.isPromiseLike = function(obj) {
      if (obj && (obj.then && lang.isFunction(obj.then)) /*&& (obj.cancel && d.isFunction(obj.cancel))*/) {
         return true;
      } else {
         return false
      }
   };

   /**
    * Helper method to upgrade a 1.4 dojo.Deferred to an LCCeferred (the backport of 1.6 dojo.Deferred)
    *
    * @memberof ic-core.util.promises
    * @name deferredToPromise
    * @function
    * @public
    * @param {Object} The deferred object to upgrade to a promise.
    * @returns {Object} A promise object.
    */
   promises.deferredToPromise = function(deferred) {
      if (promises.isPromiseLike(deferred)) {
         return deferred;
      } else {
         var p = new LCDeferred();

         deferred.addCallback(p, "callback");
         deferred.addErrback(p, "errback");

         return p;
      }
   };

   return promises;
});
